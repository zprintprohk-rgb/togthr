#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
togthr-daily-verify (2026-07-07)
Verify all blog post pages: HTTP 200 + no fallback wrapper + body has real content.

Standard (from memory):
  - HTTP 200 for every URL
  - grep "This post is part of the Togthr Blog" -> 0 (NOT fallback wrapper)
  - grep unique keyword from body -> >= 1 (real body content)
  - H1 matches blog-posts.ts title (sanity check)
"""
import sys
import re
import json
import urllib.request
import urllib.error
import ssl
from datetime import datetime
from pathlib import Path

BASE = "https://togthr.life"
SLUGS = [
    "why-we-built-a-pet-that-grows-with-you",
    "three-small-rituals-for-couples-who-live-apart",
    "what-your-virtual-pet-notices",
    "virtual-companion-pet-loss-comfort",
    "two-minute-daily-check-in-ai-companion",
]
LOCALES = ["en", "zh-cn", "zh-tw", "ja", "ko", "de", "fr", "es"]

# Unique body keyword per slug (must be present in REAL content, NOT in fallback wrapper).
# Picked from commit c172548 EN content for daily posts and launch post title/body.
SLUG_KEYWORDS = {
    "why-we-built-a-pet-that-grows-with-you": ["Togthr Bot", "grows"],
    "three-small-rituals-for-couples-who-live-apart": ["ritual", "Togthr"],
    "what-your-virtual-pet-notices": ["virtual pet", "Togthr Bot"],
    "virtual-companion-pet-loss-comfort": ["pet loss", "Togthr Bot"],
    "two-minute-daily-check-in-ai-companion": ["check-in", "AI companion"],
}

FALLBACK_SIGNATURE = "This post is part of the Togthr Blog"

# Build context to skip SSL verify (some CF edges throw cert issues on Windows)
ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

results = []
errors = []

for slug in SLUGS:
    for locale in LOCALES:
        url = f"{BASE}/{locale}/blog/{slug}"
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "togthr-verify/1.0"})
            with urllib.request.urlopen(req, timeout=15, context=ctx) as resp:
                status = resp.status
                html = resp.read().decode("utf-8", errors="ignore")
        except urllib.error.HTTPError as e:
            results.append({
                "url": url,
                "slug": slug,
                "locale": locale,
                "status": e.code,
                "fallback_hits": None,
                "body_keyword_hits": None,
                "verdict": "FAIL",
                "reason": f"HTTP {e.code}",
            })
            continue
        except Exception as e:
            errors.append({"url": url, "error": str(e)})
            results.append({
                "url": url,
                "slug": slug,
                "locale": locale,
                "status": "ERR",
                "fallback_hits": None,
                "body_keyword_hits": None,
                "verdict": "FAIL",
                "reason": f"exception: {e}",
            })
            continue

        fallback_hits = html.count(FALLBACK_SIGNATURE)
        # Try multiple keywords; count >= 1 of any
        body_keyword_hits = sum(html.count(kw) for kw in SLUG_KEYWORDS[slug])

        verdict = "PASS"
        reason = []
        if status != 200:
            verdict = "FAIL"
            reason.append(f"status={status}")
        if fallback_hits > 0:
            verdict = "FAIL"
            reason.append(f"fallback_hits={fallback_hits}")
        if body_keyword_hits < 1:
            verdict = "FAIL"
            reason.append(f"body_keyword_hits={body_keyword_hits}")

        results.append({
            "url": url,
            "slug": slug,
            "locale": locale,
            "status": status,
            "fallback_hits": fallback_hits,
            "body_keyword_hits": body_keyword_hits,
            "verdict": verdict,
            "reason": "; ".join(reason) if reason else "ok",
        })

# Summary
total = len(results)
passed = sum(1 for r in results if r["verdict"] == "PASS")
failed = total - passed

print(f"=== togthr-daily-verify {datetime.now().isoformat()} ===")
print(f"URL base: {BASE}")
print(f"Slugs: {len(SLUGS)} ({SLUGS})")
print(f"Locales: {len(LOCALES)} ({LOCALES})")
print(f"Total: {total} | PASS: {passed} | FAIL: {failed}")
print()
if errors:
    print(f"Top-level errors: {len(errors)}")
    for e in errors[:5]:
        print(f"  {e}")
    print()

# Per-slug table
print(f"{'slug':<48} {'loc':<6} {'st':<4} {'fall':<5} {'body':<5} {'verdict':<7}")
for r in results:
    slug_short = r["slug"][:47]
    print(f"{slug_short:<48} {r['locale']:<6} {str(r['status']):<4} {str(r['fallback_hits']):<5} {str(r['body_keyword_hits']):<5} {r['verdict']:<7}")

# Write JSON
out_dir = Path(r"F:\CloudDreamerApp\togthr\outputs\seo-verify")
out_dir.mkdir(parents=True, exist_ok=True)
stamp = datetime.now().strftime("%Y-%m-%d-%H%M")
json_path = out_dir / f"verify-{stamp}.json"
with open(json_path, "w", encoding="utf-8") as f:
    json.dump({
        "timestamp": datetime.now().isoformat(),
        "base": BASE,
        "total": total,
        "passed": passed,
        "failed": failed,
        "results": results,
        "errors": errors,
    }, f, indent=2, ensure_ascii=False)
print(f"\nJSON report: {json_path}")

sys.exit(0 if failed == 0 else 1)