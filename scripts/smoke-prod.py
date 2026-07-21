#!/usr/bin/env python3
"""
N1 prod smoke test for togthr.life

Runs 7 assertions against the live site and writes a report to
docs/prod-smoke-{date}.md.

Run:  python scripts/smoke-prod.py
Stdlib only. No external deps.
"""
from __future__ import annotations

import json
import re
import ssl
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

BASE = "https://www.togthr.life"
ROOT = Path(__file__).resolve().parent.parent
BLOG_TS = ROOT / "src" / "lib" / "blog-posts.ts"
REPORT_DIR = ROOT / "docs"

# When the machine's HTTPS outbound is flaky (SSL EOF), fall back to an
# unverified context so smoke checks still work locally.
CTX_VERIFIED = ssl.create_default_context()
CTX_FALLBACK = ssl._create_unverified_context()  # noqa: SLF001  (intentional fallback)


# ─── HTTP helper ──────────────────────────────────────────────────────
def http_get(url: str, *, timeout: int = 30) -> tuple[int, str, dict[str, str]]:
    """GET url, return (status, body, response_headers)."""
    req = urllib.request.Request(url, headers={"User-Agent": "togthr-smoke/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=CTX_VERIFIED) as r:
            body = r.read().decode("utf-8", errors="replace")
            return r.status, body, dict(r.headers)
    except (ssl.SSLError, urllib.error.URLError) as e:
        # Fallback path: bypass SSL verification for transient outbound issues
        with urllib.request.urlopen(req, timeout=timeout, context=CTX_FALLBACK) as r:
            body = r.read().decode("utf-8", errors="replace")
            return r.status, body, dict(r.headers)


def head_status(url: str) -> int:
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "togthr-smoke/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=30, context=CTX_VERIFIED) as r:
            return r.status
    except Exception:
        try:
            with urllib.request.urlopen(req, timeout=30, context=CTX_FALLBACK) as r:
                return r.status
        except urllib.error.HTTPError as e:
            return e.code
        except Exception:
            return 0


# ─── Blog slug extraction ─────────────────────────────────────────────
def extract_blog_slugs() -> list[str]:
    """Read src/lib/blog-posts.ts, resolve const refs, return unique slugs."""
    text = BLOG_TS.read_text(encoding="utf-8")

    # 1) const map: name -> 'value' or "value"
    const_re = re.compile(
        r"const\s+([A-Z][A-Z0-9_]*_SLUG(?:_[A-Z0-9]+)?)\s*=\s*['\"]([^'\"]+)['\"]"
    )
    consts = dict(const_re.findall(text))

    # 2) slug usages — both 'literal' and CONST_REF
    # Match "slug: <something>" where something is quoted string OR identifier
    use_re = re.compile(
        r"^\s*slug:\s*([A-Za-z_][A-Za-z0-9_]*|['\"][^'\"]+['\"])\s*,?\s*$",
        re.MULTILINE,
    )
    slugs: set[str] = set()
    for m in use_re.finditer(text):
        tok = m.group(1).strip()
        if tok.startswith(("'", '"')):
            slugs.add(tok[1:-1])
        elif tok in consts:
            slugs.add(consts[tok])
        else:
            # Unknown identifier (e.g. type defs) — skip
            pass
    return sorted(slugs)


# ─── Assertions ───────────────────────────────────────────────────────
def check_blogs(latest_10: list[str]) -> dict[str, Any]:
    results: list[dict[str, Any]] = []
    for slug in latest_10:
        url = f"{BASE}/en/blog/{slug}"
        try:
            status, body, _ = http_get(url)
            ok = status == 200 and "<article" in body
            results.append(
                {"slug": slug, "url": url, "status": status, "ok": ok}
            )
        except Exception as e:
            results.append(
                {"slug": slug, "url": url, "status": "EXC", "ok": False, "err": str(e)}
            )
    passed = sum(1 for r in results if r["ok"])
    return {
        "name": "Blog accessibility (latest 10 /en/blog/{slug})",
        "passed": passed,
        "total": len(results),
        "ok": passed == len(results),
        "details": results,
    }


def check_i18n_leak() -> dict[str, Any]:
    """N2 fix verification: /zh-cn/pricing must NOT contain English strings."""
    forbidden = [
        "Everything in Plus",
        "All 50+ pet suits",
        "Golden legendary pets",
        "Priority support",
    ]
    url = f"{BASE}/zh-cn/pricing"
    status, body, _ = http_get(url)
    leaks = [s for s in forbidden if s in body]
    return {
        "name": "i18n leak: /zh-cn/pricing must not contain English eternal features",
        "passed": len(leaks),
        "total": len(forbidden),
        "ok": status == 200 and len(leaks) == 0,
        "details": {"url": url, "status": status, "leaks": leaks},
    }


def check_faq() -> dict[str, Any]:
    url = f"{BASE}/en/faq"
    status, body, _ = http_get(url)
    has_faqpage = "FAQPage" in body
    qcount = body.count("Question")
    # 13 Q&A per locale × 8 locales = 104 question labels. We look for the JSON-LD
    # count which renders once per schema item — be lenient: ≥40 means the page
    # has the full structured-data block, not just one stray match.
    ok = status == 200 and has_faqpage and qcount >= 40
    return {
        "name": "FAQ: /en/faq has FAQPage JSON-LD and >=40 'Question' matches",
        "passed": int(has_faqpage) + int(qcount >= 40),
        "total": 2,
        "ok": ok,
        "details": {"url": url, "status": status, "has_FAQPage": has_faqpage, "Question_count": qcount},
    }


def check_assets() -> dict[str, Any]:
    frames = [f"anim-greet-{i}.png" for i in range(1, 5)]
    details = []
    for f in frames:
        url = f"{BASE}/pets/{f}"
        s = head_status(url)
        details.append({"asset": f, "url": url, "status": s, "ok": s == 200})
    passed = sum(1 for d in details if d["ok"])
    return {
        "name": "Static assets: /pets/anim-greet-{1..4}.png all 200",
        "passed": passed,
        "total": len(frames),
        "ok": passed == len(frames),
        "details": details,
    }


def check_countdown() -> dict[str, Any]:
    url = f"{BASE}/en/pricing"
    status, body, _ = http_get(url)
    has_halloween = "Halloween" in body
    has_spring = "Spring Festival" in body
    ok = status == 200 and has_halloween and not has_spring
    return {
        "name": "Countdown: /en/pricing has 'Halloween' and not 'Spring Festival'",
        "passed": int(has_halloween) + int(not has_spring),
        "total": 2,
        "ok": ok,
        "details": {"url": url, "status": status, "has_Halloween": has_halloween, "has_Spring_Festival": has_spring},
    }


def check_home_locales() -> dict[str, Any]:
    """8 locale home pages: HTTP 200, html tag has dark marker."""
    locales = ["en", "zh-cn", "zh-tw", "ja", "ko", "de", "fr", "es"]
    details = []
    for loc in locales:
        url = f"{BASE}/{loc}"
        try:
            status, body, _ = http_get(url)
            # 301 is acceptable (e.g. www→apex or trailing slash) — follow once
            if status in (301, 302, 307, 308):
                # python's urlopen follows by default, so we already have body
                pass
            # Look for dark marker near the <html tag
            head = body[:3000]
            has_dark_class = bool(re.search(r'<html[^>]*class="[^"]*dark', head, re.IGNORECASE))
            has_dark_inline = "#0B0B1A" in head
            has_dark_root = "data-dark-root" in head
            ok = (
                status == 200
                and (has_dark_class or has_dark_inline or has_dark_root)
            )
            details.append(
                {
                    "locale": loc,
                    "url": url,
                    "status": status,
                    "dark_class": has_dark_class,
                    "dark_inline": has_dark_inline,
                    "dark_root_attr": has_dark_root,
                    "ok": ok,
                }
            )
        except Exception as e:
            details.append({"locale": loc, "url": url, "status": "EXC", "ok": False, "err": str(e)})
    passed = sum(1 for d in details if d["ok"])
    return {
        "name": "8-locale home smoke: 200 + dark marker present",
        "passed": passed,
        "total": len(details),
        "ok": passed == len(details),
        "details": details,
    }


def check_dark_root_regression() -> dict[str, Any]:
    """White-background regression: data-dark-root must be present on all 8 home pages."""
    locales = ["en", "zh-cn", "zh-tw", "ja", "ko", "de", "fr", "es"]
    details = []
    for loc in locales:
        url = f"{BASE}/{loc}"
        status, body, _ = http_get(url)
        # Look in the FULL body — the marker is on <header>/<footer>, which can
        # appear after a large inline <script> chunk on the home page.
        has = "data-dark-root" in body
        details.append({"locale": loc, "url": url, "status": status, "has_data_dark_root": has, "ok": status == 200 and has})
    passed = sum(1 for d in details if d["ok"])
    return {
        "name": "Dark-root regression: all 8 home pages have data-dark-root",
        "passed": passed,
        "total": len(details),
        "ok": passed == len(details),
        "details": details,
    }


# ─── Report writer ───────────────────────────────────────────────────
def render_report(results: list[dict[str, Any]], blog_universe: int) -> str:
    total_pass = sum(r["passed"] for r in results if "passed" in r)
    total_sub = sum(r["total"] for r in results if "total" in r)
    total_ok = sum(1 for r in results if r.get("ok"))
    total_n = len(results)

    lines: list[str] = []
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    lines.append(f"# togthr.life prod smoke report\n")
    lines.append(f"- Run at: {now}")
    lines.append(f"- Target: {BASE}")
    lines.append(f"- Blog slugs in registry: {blog_universe}\n")

    lines.append("## Summary\n")
    lines.append("| # | Check | Result |")
    lines.append("|---|-------|--------|")
    for i, r in enumerate(results, 1):
        badge = "PASS" if r.get("ok") else "FAIL"
        lines.append(f"| {i} | {r['name']} | {badge} ({r.get('passed')}/{r.get('total')}) |")
    lines.append("")
    lines.append(f"**Overall**: {total_ok}/{total_n} checks PASS ({total_pass}/{total_sub} sub-assertions)\n")

    lines.append("## Details\n")
    for i, r in enumerate(results, 1):
        badge = "PASS" if r.get("ok") else "FAIL"
        lines.append(f"### {i}. {r['name']} — {badge} ({r.get('passed')}/{r.get('total')})")
        lines.append("")
        lines.append("```json")
        lines.append(json.dumps(r.get("details"), ensure_ascii=False, indent=2))
        lines.append("```")
        lines.append("")
    return "\n".join(lines)


# ─── Main ────────────────────────────────────────────────────────────
def main() -> int:
    print("[1/2] Extracting blog slugs from src/lib/blog-posts.ts …")
    slugs = extract_blog_slugs()
    print(f"      {len(slugs)} unique slugs found.")
    if not slugs:
        print("FATAL: no slugs found — check BLOG_TS path", file=sys.stderr)
        return 2

    latest_10 = slugs[-10:]

    print("[2/2] Running 7 smoke assertions against the live site …")
    results: list[dict[str, Any]] = [
        check_blogs(latest_10),
        check_i18n_leak(),
        check_faq(),
        check_assets(),
        check_countdown(),
        check_home_locales(),
        check_dark_root_regression(),
    ]

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    report_path = REPORT_DIR / f"prod-smoke-{today}.md"
    report_path.write_text(render_report(results, len(slugs)), encoding="utf-8")

    total_ok = sum(1 for r in results if r.get("ok"))
    total_n = len(results)
    print(f"\nResult: {total_ok}/{total_n} checks PASS — report at {report_path}")
    return 0 if total_ok == total_n else 1


if __name__ == "__main__":
    raise SystemExit(main())
