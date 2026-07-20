from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import ssl
import sys
from pathlib import Path
from typing import Iterable
from urllib import error, request
import xml.etree.ElementTree as ET

HOST = "togthr.life"
INDEXNOW_URL = "http://api.indexnow.org/indexnow"
BASE_DIR = Path(__file__).resolve().parents[1]
PUBLIC_DIR = BASE_DIR / "public"
SITEMAP_PATH = PUBLIC_DIR / "sitemap-0.xml"
BLOG_POSTS_PATH = BASE_DIR / "src/lib/blog-posts.ts"
KEY_FILE = PUBLIC_DIR / "f1cdc8fa87d9aca90c4bfa3eee2ebe1d.txt"
LOCALES = ["en", "zh-cn", "zh-tw", "ja", "ko", "de", "fr", "es"]


def load_key() -> str:
    if not KEY_FILE.exists():
        raise FileNotFoundError(f"IndexNow key file not found: {KEY_FILE}")
    return KEY_FILE.read_text(encoding="utf-8").strip()


def parse_sitemap_urls() -> list[str]:
    if not SITEMAP_PATH.exists():
        raise FileNotFoundError(f"Sitemap not found: {SITEMAP_PATH}")

    tree = ET.parse(SITEMAP_PATH)
    root = tree.getroot()
    ns = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls: list[str] = []
    for node in root.findall("sm:url", ns):
        loc = node.findtext("sm:loc", default="", namespaces=ns)
        if loc:
            urls.append(loc.strip())
    return urls


def _parse_blog_consts(text: str) -> dict[str, str]:
    """Extract all `const FOO = 'bar'` assignments from blog-posts.ts."""
    return dict(re.findall(r"^\s*const\s+([A-Z][A-Z0-9_]*)\s*=\s*'([^']*)'", text, re.M))


def _within_object(text: str, pos: int, obj_start: int, obj_end: int) -> bool:
    """Return True if pos is within [obj_start, obj_end]."""
    return obj_start <= pos <= obj_end


def parse_recent_blog_urls() -> list[str]:
    if not BLOG_POSTS_PATH.exists():
        raise FileNotFoundError(f"Blog posts file not found: {BLOG_POSTS_PATH}")

    raw = BLOG_POSTS_PATH.read_text(encoding="utf-8")
    consts = _parse_blog_consts(raw)

    # Find each blog post object by scanning for "slug:" fields, then walk to the
    # nearest enclosing {...} block. Extract slug + date from that block.
    slug_date_pairs: list[tuple[str, str]] = []

    slug_positions = [m.start() for m in re.finditer(r"^\s*slug:\s*", raw, re.M)]
    for slug_pos in slug_positions:
        # Walk backward to find the opening {
        brace_count = 0
        obj_start = slug_pos
        for i in range(slug_pos, -1, -1):
            if raw[i] == '}':
                brace_count += 1
            elif raw[i] == '{':
                if brace_count == 0:
                    obj_start = i
                    break
                brace_count -= 1

        # Walk forward to find the closing } at same depth
        brace_count = 0
        obj_end = len(raw)
        for i in range(obj_start, len(raw)):
            if raw[i] == '{':
                brace_count += 1
            elif raw[i] == '}':
                brace_count -= 1
                if brace_count == 0:
                    obj_end = i
                    break

        block = raw[obj_start:obj_end]

        # Extract slug value — handles both 'literal' and CONST_REF (no quotes)
        # e.g. "slug: M1_SLUG_A," or "slug: 'tamagotchi-app-2026',"
        slug_m = re.search(r"slug:\s*(?:'([^']*)'|([A-Z][A-Z0-9_]*))", block)
        date_m = re.search(r"date:\s*(?:'([^']*)'|([A-Z][A-Z0-9_]*))", block)

        if not slug_m or not date_m:
            continue

        # group(1)=quoted value, group(2)=const ref
        raw_slug = (slug_m.group(1) or slug_m.group(2) or "").strip()
        raw_date = (date_m.group(1) or date_m.group(2) or "").strip()
        if not raw_slug or not raw_date:
            continue

        # Resolve const references; if quoted literal, use as-is
        slug_val = consts.get(raw_slug, slug_m.group(1) or raw_slug)
        date_val = consts.get(raw_date, date_m.group(1) or raw_date)

        slug_date_pairs.append((slug_val, date_val))
    recent_slugs: set[str] = set()
    today = dt.date.today()
    seven_days_ago = today - dt.timedelta(days=7)

    for slug, date_str in slug_date_pairs:
        try:
            post_date = dt.date.fromisoformat(date_str)
        except ValueError:
            continue
        if post_date >= seven_days_ago and post_date <= today:
            recent_slugs.add(slug)

    urls: list[str] = []
    for slug in sorted(recent_slugs):
        for locale in LOCALES:
            urls.append(f"https://{HOST}/{locale}/blog/{slug}")
    return urls


def submit_urls(urls: list[str], key: str) -> tuple[int, str]:
    if not urls:
        return 0, ""

    payload = json.dumps({
        "host": HOST,
        "key": key,
        "keyLocation": f"https://{HOST}/{key}.txt",
        "urlList": urls[:10000],
    }).encode("utf-8")

    req = request.Request(
        INDEXNOW_URL,
        data=payload,
        method="POST",
        headers={
            "Content-Type": "application/json; charset=utf-8",
            "Content-Length": str(len(payload)),
        },
    )

    # Try default SSL first, fall back to unverified for servers with TLS config issues
    ssl_ctx = ssl.create_default_context()
    ctx2 = ssl._create_unverified_context()  # type: ignore[attr-defined]

    for attempt, ctx in enumerate([ssl_ctx, ctx2], 1):
        try:
            with request.urlopen(req, timeout=20, context=ctx) as resp:
                body = resp.read().decode("utf-8", errors="replace")
                return resp.status, body
        except error.HTTPError as exc:
            body = exc.read().decode("utf-8", errors="replace")
            return exc.code, body
        except Exception as exc:
            err_str = str(exc)
            if attempt == 1 and ("SSL" in err_str or "UNEXPECTED_EOF" in err_str or "ConnectionReset" in err_str):
                continue  # try unverified context
            return 0, err_str
    return 0, "unreachable"


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Submit site URLs to IndexNow")
    parser.add_argument("--new-only", action="store_true", help="Only submit blog URLs changed in the last 7 days")
    parser.add_argument("--urls", nargs="*", help="Explicit URL list to submit")
    return parser


def main() -> int:
    parser = build_parser()
    args = parser.parse_args()

    key = load_key()
    if args.urls:
        urls = args.urls
    elif args.new_only:
        urls = parse_recent_blog_urls()
    else:
        urls = parse_sitemap_urls()

    if not urls:
        print("No URLs to submit.")
        return 0

    status, body = submit_urls(urls, key)
    print(f"IndexNow status: {status}")
    print(f"Submitted URL count: {len(urls[:10000])}")

    if status in (200, 202):
        if body:
            print(body)
        return 0

    print("IndexNow response body:")
    print(body or "(empty)")
    return 1


if __name__ == "__main__":
    raise SystemExit(main())
