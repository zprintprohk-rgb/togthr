# togthr.life prod smoke report

- Run at: 2026-07-31 08:31:35 UTC
- Target: https://www.togthr.life
- Blog slugs in registry: 37

## Summary

| # | Check | Result |
|---|-------|--------|
| 1 | Blog accessibility (latest 10 /en/blog/{slug}) | PASS (10/10) |
| 2 | i18n leak: /zh-cn/pricing must not contain English eternal features | PASS (0/4) |
| 3 | FAQ: /en/faq has FAQPage JSON-LD and >=40 'Question' matches | PASS (2/2) |
| 4 | Static assets: /pets/anim-greet-{1..4}.png all 200 | PASS (4/4) |
| 5 | Countdown: /en/pricing has 'Halloween' and not 'Spring Festival' | PASS (2/2) |
| 6 | 8-locale home smoke: 200 + dark marker present | PASS (8/8) |
| 7 | Dark-root regression: all 8 home pages have data-dark-root | PASS (8/8) |

**Overall**: 7/7 checks PASS (34/38 sub-assertions)

## Details

### 1. Blog accessibility (latest 10 /en/blog/{slug}) — PASS (10/10)

```json
[
  {
    "slug": "things-you-tell-your-virtual-pet",
    "url": "https://www.togthr.life/en/blog/things-you-tell-your-virtual-pet",
    "status": 200,
    "ok": true
  },
  {
    "slug": "three-small-rituals-for-couples-who-live-apart",
    "url": "https://www.togthr.life/en/blog/three-small-rituals-for-couples-who-live-apart",
    "status": 200,
    "ok": true
  },
  {
    "slug": "togthr-vs-replika",
    "url": "https://www.togthr.life/en/blog/togthr-vs-replika",
    "status": 200,
    "ok": true
  },
  {
    "slug": "togthr-vs-widgetable",
    "url": "https://www.togthr.life/en/blog/togthr-vs-widgetable",
    "status": 200,
    "ok": true
  },
  {
    "slug": "two-minute-daily-check-in-ai-companion",
    "url": "https://www.togthr.life/en/blog/two-minute-daily-check-in-ai-companion",
    "status": 200,
    "ok": true
  },
  {
    "slug": "virtual-companion-pet-loss-comfort",
    "url": "https://www.togthr.life/en/blog/virtual-companion-pet-loss-comfort",
    "status": 200,
    "ok": true
  },
  {
    "slug": "virtual-pet-app-for-couples",
    "url": "https://www.togthr.life/en/blog/virtual-pet-app-for-couples",
    "status": 200,
    "ok": true
  },
  {
    "slug": "virtual-pet-quiet-evenings-alone",
    "url": "https://www.togthr.life/en/blog/virtual-pet-quiet-evenings-alone",
    "status": 200,
    "ok": true
  },
  {
    "slug": "what-your-virtual-pet-notices",
    "url": "https://www.togthr.life/en/blog/what-your-virtual-pet-notices",
    "status": 200,
    "ok": true
  },
  {
    "slug": "why-we-built-a-pet-that-grows-with-you",
    "url": "https://www.togthr.life/en/blog/why-we-built-a-pet-that-grows-with-you",
    "status": 200,
    "ok": true
  }
]
```

### 2. i18n leak: /zh-cn/pricing must not contain English eternal features — PASS (0/4)

```json
{
  "url": "https://www.togthr.life/zh-cn/pricing",
  "status": 200,
  "leaks": []
}
```

### 3. FAQ: /en/faq has FAQPage JSON-LD and >=40 'Question' matches — PASS (2/2)

```json
{
  "url": "https://www.togthr.life/en/faq",
  "status": 200,
  "has_FAQPage": true,
  "Question_count": 40
}
```

### 4. Static assets: /pets/anim-greet-{1..4}.png all 200 — PASS (4/4)

```json
[
  {
    "asset": "anim-greet-1.png",
    "url": "https://www.togthr.life/pets/anim-greet-1.png",
    "status": 200,
    "ok": true
  },
  {
    "asset": "anim-greet-2.png",
    "url": "https://www.togthr.life/pets/anim-greet-2.png",
    "status": 200,
    "ok": true
  },
  {
    "asset": "anim-greet-3.png",
    "url": "https://www.togthr.life/pets/anim-greet-3.png",
    "status": 200,
    "ok": true
  },
  {
    "asset": "anim-greet-4.png",
    "url": "https://www.togthr.life/pets/anim-greet-4.png",
    "status": 200,
    "ok": true
  }
]
```

### 5. Countdown: /en/pricing has 'Halloween' and not 'Spring Festival' — PASS (2/2)

```json
{
  "url": "https://www.togthr.life/en/pricing",
  "status": 200,
  "has_Halloween": true,
  "has_Spring_Festival": false
}
```

### 6. 8-locale home smoke: 200 + dark marker present — PASS (8/8)

```json
[
  {
    "locale": "en",
    "url": "https://www.togthr.life/en",
    "status": 200,
    "dark_class": false,
    "dark_inline": true,
    "dark_root_attr": false,
    "ok": true
  },
  {
    "locale": "zh-cn",
    "url": "https://www.togthr.life/zh-cn",
    "status": 200,
    "dark_class": false,
    "dark_inline": true,
    "dark_root_attr": false,
    "ok": true
  },
  {
    "locale": "zh-tw",
    "url": "https://www.togthr.life/zh-tw",
    "status": 200,
    "dark_class": false,
    "dark_inline": true,
    "dark_root_attr": false,
    "ok": true
  },
  {
    "locale": "ja",
    "url": "https://www.togthr.life/ja",
    "status": 200,
    "dark_class": false,
    "dark_inline": true,
    "dark_root_attr": false,
    "ok": true
  },
  {
    "locale": "ko",
    "url": "https://www.togthr.life/ko",
    "status": 200,
    "dark_class": false,
    "dark_inline": true,
    "dark_root_attr": false,
    "ok": true
  },
  {
    "locale": "de",
    "url": "https://www.togthr.life/de",
    "status": 200,
    "dark_class": false,
    "dark_inline": true,
    "dark_root_attr": false,
    "ok": true
  },
  {
    "locale": "fr",
    "url": "https://www.togthr.life/fr",
    "status": 200,
    "dark_class": false,
    "dark_inline": true,
    "dark_root_attr": false,
    "ok": true
  },
  {
    "locale": "es",
    "url": "https://www.togthr.life/es",
    "status": 200,
    "dark_class": false,
    "dark_inline": true,
    "dark_root_attr": false,
    "ok": true
  }
]
```

### 7. Dark-root regression: all 8 home pages have data-dark-root — PASS (8/8)

```json
[
  {
    "locale": "en",
    "url": "https://www.togthr.life/en",
    "status": 200,
    "has_data_dark_root": true,
    "ok": true
  },
  {
    "locale": "zh-cn",
    "url": "https://www.togthr.life/zh-cn",
    "status": 200,
    "has_data_dark_root": true,
    "ok": true
  },
  {
    "locale": "zh-tw",
    "url": "https://www.togthr.life/zh-tw",
    "status": 200,
    "has_data_dark_root": true,
    "ok": true
  },
  {
    "locale": "ja",
    "url": "https://www.togthr.life/ja",
    "status": 200,
    "has_data_dark_root": true,
    "ok": true
  },
  {
    "locale": "ko",
    "url": "https://www.togthr.life/ko",
    "status": 200,
    "has_data_dark_root": true,
    "ok": true
  },
  {
    "locale": "de",
    "url": "https://www.togthr.life/de",
    "status": 200,
    "has_data_dark_root": true,
    "ok": true
  },
  {
    "locale": "fr",
    "url": "https://www.togthr.life/fr",
    "status": 200,
    "has_data_dark_root": true,
    "ok": true
  },
  {
    "locale": "es",
    "url": "https://www.togthr.life/es",
    "status": 200,
    "has_data_dark_root": true,
    "ok": true
  }
]
```
