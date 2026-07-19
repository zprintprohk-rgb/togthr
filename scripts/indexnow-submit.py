from __future__ import annotations

import argparse
import datetime as dt
import json
import re
import sys
from pathlib import Path
from typing import Iterable
from urllib import error, request
import xml.etree.ElementTree as ET

HOST = "togthr.life"
INDEXNOW_URL = "https://api.indexnow.org/indexnow"
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


def parse_recent_blog_urls() -> list[str]:
    if not BLOG_POSTS_PATH.exists():
        raise FileNotFoundError(f"Blog posts file not found: {BLOG_POSTS_PATH}")

    text = BLOG_POSTS_PATH.read_text(encoding="utf-8")
    slug_date_pairs = re.findall(r"slug:\s*'([^']+)'[\s\S]{0,120}?date:\s*'([^']+)'", text)
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

    try:
        with request.urlopen(req, timeout=20) as resp:
            body = resp.read().decode("utf-8", errors="replace")
            return resp.status, body
    except error.HTTPError as exc:
        body = exc.read().decode("utf-8", errors="replace")
        return exc.code, body
    except Exception as exc:
        return 0, str(exc)


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
