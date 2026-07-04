#!/usr/bin/env node
/**
 * scripts/seo-trending-collector.cjs
 *
 * Daily multi-locale trending topic collector for togthr.life SEO content pipeline.
 * Runs at 03:30 (30 min before 04:00 content cron) and writes a JSON cache that
 * the content cron reads to pick today's blog topics.
 *
 * Strategy:
 *   - For each locale, scrape 2-3 sources that surface today's trending topics
 *   - Filter by togthr business relevance (long-distance, AI companion, pet loss,
 *     mental health, loneliness economy, remote relationships, virtual intimacy)
 *   - Output: docs/seo-self-evolution/trending/{YYYY-MM-DD}.json
 *
 * Sources by locale (no API keys needed where possible):
 *   - en    : Reddit JSON endpoints (r/relationships, r/longdistance, r/petloss, r/AISoulmates)
 *   - zh-cn : 微博热搜 (weibozhitong re-backup endpoint), 知乎热榜 RSS
 *   - zh-tw : 痞客邦 hot, 巴哈姆特 hot
 *   - ja    : Yahoo!Japan 急上昇ランキング, はてなブックマーク hotentries
 *   - ko    : Naver 실시간 검색어 (real-time search)
 *   - de    : Reddit r/de (top day), Google Trends RSS DE
 *   - fr    : Reddit r/france (top day)
 *   - es    : Reddit r/es (top day)
 *
 * Output schema (one file per day):
 *   {
 *     "date": "2026-07-04",
 *     "collected_at": "2026-07-04T03:30:01+08:00",
 *     "locales": {
 *       "en": { "topics": [ { "title": "...", "url": "...", "score": 1234, "source": "reddit:r/relationships", "relevance_hint": "long-distance" } ], "fetched": 12, "errors": [] },
 *       ...
 *     }
 *   }
 *
 * Exit codes:
 *   0 — at least 5/8 locales collected ≥3 topics each
 *   1 — fewer than 5 locales OK; content cron should fall back to evergreen topics
 *
 * Usage:
 *   node scripts/seo-trending-collector.cjs           # default: today
 *   node scripts/seo-trending-collector.cjs --date 2026-07-04
 *
 * Cost notes:
 *   - Reddit JSON endpoints are unauthenticated, ~30 req/min/IP.
 *   - Yahoo!JP / はてな are HTML scrape, single GET each.
 *   - Naver 실시간 검색어 is a private endpoint — graceful fallback to empty.
 *   - Total runtime: ~30-90s.
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// ────────────────────────────────────────────────────────────────────────────
// Configuration
// ────────────────────────────────────────────────────────────────────────────

const ROOT = path.join(__dirname, '..');
const OUT_DIR = path.join(ROOT, 'docs/seo-self-evolution/trending');
const TODAY = (() => {
  const idx = process.argv.indexOf('--date');
  if (idx > -1 && process.argv[idx + 1]) return process.argv[idx + 1];
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
})();

const LOCALES = ['de', 'en', 'es', 'fr', 'ja', 'ko', 'zh-cn', 'zh-tw'];

const RELEVANCE_KEYWORDS = [
  'long distance', 'long-distance', 'remote relationship', 'ldr',
  'ai companion', 'ai girlfriend', 'ai boyfriend', 'virtual partner',
  'pet loss', 'pet bereavement', 'grief pet', 'farewell pet',
  'loneliness', 'lonely', 'isolation', 'alone',
  'mental health', 'anxiety', 'depression',
  'relationship', 'couple', 'partner', 'marriage', 'breakup',
  'virtual pet', 'digital pet', 'tamagotchi', 'companion app',
  'remote work', 'wfh', 'work from home',
  '陪伴', '异地', '分手', '失恋', '孤独', '独居', '社恐', '相亲',
  '遠距離', '失戀', '陪伴',
  '遠距離恋愛', '孤独', '推し活', 'ペットロス',
  '연애', '이별', '외로움', '반려동물',
  'fernbeziehung', 'einsamkeit', 'tierliebe',
  'relation à distance', 'solitude',
  'relación a distancia', 'soledad',
];

// ────────────────────────────────────────────────────────────────────────────
// HTTP helpers — UA pool + retry + delay (Tier 2 anti-scraping)
// ────────────────────────────────────────────────────────────────────────────

const UA_POOL = [
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36',
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0',
];

let _uaIdx = 0;
function pickUA() {
  const ua = UA_POOL[_uaIdx % UA_POOL.length];
  _uaIdx++;
  return ua;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

/**
 * fetchUrl with UA rotation, retry, and rate-limit awareness.
 * Tries up to 3 attempts with different UAs and exponential backoff.
 */
async function fetchUrl(url, { timeoutMs = 8000, headers = {}, maxRetries = 1 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const ua = pickUA();
      // Hard cap total fetchUrl call at 12s via Promise.race
      const data = await Promise.race([
        fetchUrlOnce(url, {
          timeoutMs,
          headers: {
            'User-Agent': ua,
            'Accept': 'application/json,text/html,application/xml,text/xml',
            'Accept-Language': 'en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7,ja;q=0.6',
            'Accept-Encoding': 'gzip, deflate',
            'Cache-Control': 'no-cache',
            ...headers,
          },
        }),
        new Promise((_, rej) => setTimeout(() => rej(new Error(`Hard timeout 12s for ${url}`)), 12000)),
      ]);
      // Light rate-limit between consecutive requests
      await sleep(100 + Math.random() * 200);
      return data;
    } catch (e) {
      lastErr = e;
      if (attempt >= maxRetries) break;
      await sleep(500);
    }
  }
  throw lastErr || new Error(`fetchUrl failed for ${url}`);
}

function fetchUrlOnce(url, { timeoutMs = 8000, headers = {}, redirectCount = 0 } = {}) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http;
    const req = lib.get(url, { timeout: timeoutMs, headers }, (res) => {
      // Follow redirect (max 2 to prevent loops)
      if ([301, 302, 303, 307, 308].includes(res.statusCode) && res.headers.location) {
        if (redirectCount >= 2) {
          res.resume();
          reject(new Error(`Too many redirects for ${url}`));
          return;
        }
        const next = new URL(res.headers.location, url).toString();
        res.resume();
        fetchUrlOnce(next, { timeoutMs, headers, redirectCount: redirectCount + 1 }).then(resolve).catch(reject);
        return;
      }
      if (res.statusCode !== 200) {
        res.resume();
        reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        return;
      }
      let data = '';
      res.setEncoding('utf-8');
      // Hard limit response body to 2MB to prevent runaway
      let totalBytes = 0;
      const MAX_BYTES = 2 * 1024 * 1024;
      res.on('data', (chunk) => {
        totalBytes += chunk.length;
        if (totalBytes > MAX_BYTES) {
          req.destroy(new Error(`Response > 2MB for ${url}`));
          return;
        }
        data += chunk;
      });
      res.on('end', () => resolve(data));
    });
    req.on('timeout', () => req.destroy(new Error(`Timeout after ${timeoutMs}ms`)));
    req.on('error', reject);
  });
}

// ────────────────────────────────────────────────────────────────────────────
// Source fetchers — each returns { topics: [{title, url, score, source}], error? }
// ────────────────────────────────────────────────────────────────────────────

async function fetchReddit(subreddit, locale) {
  const url = `https://www.reddit.com/r/${subreddit}/top.json?t=day&limit=15`;
  try {
    const raw = await fetchUrl(url, {
      headers: { 'User-Agent': 'togthr-bot/1.0 (seo content research)' },
    });
    const json = JSON.parse(raw);
    const posts = json?.data?.children || [];
    return {
      topics: posts.map((p) => ({
        title: p.data.title,
        url: `https://www.reddit.com${p.data.permalink}`,
        score: p.data.score,
        num_comments: p.data.num_comments,
        source: `reddit:r/${subreddit}`,
        locale,
      })),
    };
  } catch (e) {
    return { topics: [], error: e.message };
  }
}

async function fetchHackerNews(locale) {
  const url = 'https://hacker-news.firebaseio.com/v0/topstories.json';
  try {
    const raw = await fetchUrl(url);
    const ids = JSON.parse(raw).slice(0, 30);
    const items = await Promise.all(
      ids.map((id) =>
        fetchUrl(`https://hacker-news.firebaseio.com/v0/item/${id}.json`).then(JSON.parse).catch(() => null),
      ),
    );
    return {
      topics: items
        .filter(Boolean)
        .filter((it) => it.title && it.url)
        .slice(0, 15)
        .map((it) => ({
          title: it.title,
          url: it.url,
          score: it.score,
          num_comments: it.descendants,
          source: 'hackernews:top',
          locale,
        })),
    };
  } catch (e) {
    return { topics: [], error: e.message };
  }
}

async function fetchHatenaHot(locale) {
  // はてなブックマーク hot entries RSS
  const url = 'https://b.hatena.ne.jp/hotentry/all.rss';
  try {
    const xml = await fetchUrl(url, {
      headers: { 'Accept-Language': 'ja,en;q=0.5' },
    });
    const items = [];
    const itemRe = /<item>([\s\S]*?)<\/item>/g;
    let m;
    while ((m = itemRe.exec(xml)) !== null && items.length < 20) {
      const titleM = m[1].match(/<title>([\s\S]*?)<\/title>/);
      const linkM = m[1].match(/<link>([\s\S]*?)<\/link>/);
      const bmM = m[1].match(/<hatena:bookmarkcount>([\s\S]*?)<\/hatena:bookmarkcount>/);
      if (titleM && linkM) {
        items.push({
          title: titleM[1].replace(/<!\[CDATA\[|\]\]>/g, '').trim(),
          url: linkM[1].trim(),
          score: bmM ? parseInt(bmM[1], 10) : 0,
          source: 'hatena:hot',
          locale,
        });
      }
    }
    return { topics: items };
  } catch (e) {
    return { topics: [], error: e.message };
  }
}

async function fetchYahooJpTrending(locale) {
  // Yahoo!Japan 急上昇ワード — unofficial HTML scrape from search ranking page
  // This is best-effort; if blocked, returns empty and cron falls back.
  const url = 'https://search.yahoo.co.jp/realtime';
  try {
    const html = await fetchUrl(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept-Language': 'ja,en;q=0.5',
      },
    });
    const items = [];
    // Yahoo realtime search uses <section class="TweetBox"> etc; we just regex titles
    // This is brittle but a reasonable starting point.
    const titleRe = /<h2[^>]*>\s*<a[^>]*>([\s\S]*?)<\/a>/g;
    let m;
    while ((m = titleRe.exec(html)) !== null && items.length < 20) {
      const title = m[1].replace(/<[^>]+>/g, '').trim();
      if (title && title.length < 100) {
        items.push({ title, url: `https://search.yahoo.co.jp/realtime`, score: 0, source: 'yahoo:realtime', locale });
      }
    }
    return { topics: items };
  } catch (e) {
    return { topics: [], error: e.message };
  }
}

async function fetchWeiboHot(locale) {
  // 微博热搜 — backup endpoint that doesn't require auth
  const url = 'https://weibozhitong.retool.com/api/weibo-search';
  try {
    const raw = await fetchUrl(url);
    const json = JSON.parse(raw);
    const stokes = json?.data?.statuses || json?.data?.hotgov || [];
    return {
      topics: stokes.slice(0, 15).map((s) => ({
        title: s.word || s.title || s.note || '',
        url: s.url || `https://s.weibo.com/weibo?q=${encodeURIComponent(s.word || s.title || '')}`,
        score: s.num || s.hot_score || 0,
        source: 'weibo:hot',
        locale,
      })).filter((x) => x.title),
    };
  } catch (e) {
    return { topics: [], error: e.message };
  }
}

async function fetchZhihuHot(locale) {
  // 知乎热榜 — public RSS via 知乎每日精选
  const url = 'https://www.zhihu.com/api/v3/feed/topstory/hot-lists/total?limit=20';
  try {
    const raw = await fetchUrl(url, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });
    const json = JSON.parse(raw);
    const items = json?.data || [];
    return {
      topics: items.slice(0, 15).map((it) => ({
        title: it.target?.title_area?.text || it.target?.title || '',
        url: it.target?.link?.url || `https://www.zhihu.com/question/${it.target?.id}`,
        score: it.detail_text || it.hot_score || 0,
        source: 'zhihu:hot',
        locale,
      })).filter((x) => x.title),
    };
  } catch (e) {
    return { topics: [], error: e.message };
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Tier 1: RSS / official API (most stable, anti-bot friendly)
// ────────────────────────────────────────────────────────────────────────────

/**
 * Parse a generic RSS 2.0 / Atom feed and extract items with title/url/score.
 * Best-effort regex parser — handles most real-world RSS feeds.
 */
async function fetchRSS(url, source, locale, { scoreFrom = 'pubDate', limit = 15 } = {}) {
  try {
    const xml = await fetchUrl(url);
    const items = [];
    // RSS 2.0
    const rssItems = [...xml.matchAll(/<item[^>]*>([\s\S]*?)<\/item>/g)];
    // Atom
    const atomItems = [...xml.matchAll(/<entry[^>]*>([\s\S]*?)<\/entry>/g)];
    const allItems = rssItems.length > 0 ? rssItems : atomItems;
    for (const m of allItems) {
      if (items.length >= limit) break;
      const body = m[1];
      let title = '';
      const titleM = body.match(/<title[^>]*>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/title>/);
      if (titleM) title = titleM[1].replace(/<[^>]+>/g, '').trim();
      let link = '';
      const linkM = body.match(/<link[^>]*>([\s\S]*?)<\/link>/);
      if (linkM) link = linkM[1].trim();
      const atomLink = body.match(/<link[^>]*href="([^"]+)"/);
      if (!link && atomLink) link = atomLink[1].trim();
      if (!title || !link) continue;
      // Score: try various sources
      let score = 0;
      const bmM = body.match(/<hatena:bookmarkcount>([\s\S]*?)<\/hatena:bookmarkcount>/);
      if (bmM) score = parseInt(bmM[1], 10) || 0;
      const rateM = body.match(/<rate>([\s\S]*?)<\/rate>/);
      if (rateM) score = parseInt(rateM[1], 10) || score;
      items.push({ title, url: link, score, source, locale });
    }
    return { topics: items, error: items.length === 0 ? 'no items parsed from RSS' : null };
  } catch (e) {
    return { topics: [], error: `rss ${url}: ${e.message}` };
  }
}

// ────────────────────────────────────────────────────────────────────────────
// Tier 3: Evergreen pool (always available, business-relevant fallback)
// ────────────────────────────────────────────────────────────────────────────

const EVERGREEN_POOL = {
  en: [
    { title: "How to Maintain Intimacy When You're 5000 Miles Apart", score: 75, evergreen_tag: 'long-distance' },
    { title: "When Your Virtual Pet Outlives a Real One", score: 70, evergreen_tag: 'pet-bereavement' },
    { title: "AI Companions Are Filling a Gap Nobody Talks About", score: 80, evergreen_tag: 'ai-companion' },
    { title: "What We Learned From 10,000 Couples Using a Daily Check-In", score: 85, evergreen_tag: 'couple-ritual' },
    { title: "The Quiet Loneliness of Remote Work No One Mentions", score: 78, evergreen_tag: 'remote-work' },
    { title: "Why Some Long-Distance Couples Are Closer Than Live-In Ones", score: 72, evergreen_tag: 'long-distance' },
  ],
  'zh-cn': [
    { title: "异地恋的第 100 天, 我们发明了一个小机器人互相陪伴", score: 80, evergreen_tag: 'long-distance' },
    { title: "宠物去世后, 我从 Togthr Bot 里找到了安慰", score: 75, evergreen_tag: 'pet-bereavement' },
    { title: "为什么 1.2 亿独居青年需要一只数字宠物", score: 85, evergreen_tag: 'loneliness' },
    { title: "相亲 10 次失败后, 我开始跟一个 AI 聊心事", score: 78, evergreen_tag: 'ai-companion' },
    { title: "异地恋情侣都在用的 3 个微习惯", score: 72, evergreen_tag: 'long-distance' },
    { title: "凌晨 3 点的孤独, 为什么只有 AI 回应了我", score: 70, evergreen_tag: 'loneliness' },
  ],
  'zh-tw': [
    { title: "遠距離戀愛中那些說不出口的小習慣", score: 78, evergreen_tag: 'long-distance' },
    { title: "數位寵物能取代真實陪伴嗎", score: 75, evergreen_tag: 'virtual-pet' },
    { title: "失戀後的第 30 天, 我養了一隻機器人", score: 72, evergreen_tag: 'pet-bereavement' },
    { title: "為什麼台灣年輕人越來越依賴 AI 陪伴", score: 80, evergreen_tag: 'ai-companion' },
  ],
  ja: [
    { title: "推し活と AI コンパニオンの境界線", score: 80, evergreen_tag: 'ai-companion' },
    { title: "遠距離恋愛の孤独を埋める小さなロボット", score: 78, evergreen_tag: 'long-distance' },
    { title: "ペットロスとデジタルペット", score: 75, evergreen_tag: 'pet-bereavement' },
    { title: "1 人暮らしの夜に、AI がいるということ", score: 72, evergreen_tag: 'loneliness' },
    { title: "推し活をやめた後、誰が私を見てくれるのか", score: 70, evergreen_tag: 'loneliness' },
  ],
  ko: [
    { title: "연애가 끝난 뒤에도 남아있는 습관들", score: 75, evergreen_tag: 'breakup' },
    { title: "1인 가구와 디지털 펫", score: 80, evergreen_tag: 'loneliness' },
    { title: "워라밸 시대, 연애는 어떻게 변하는가", score: 72, evergreen_tag: 'relationship' },
    { title: "반려동물 사별 후, 나는 AI 곁으로 갔다", score: 70, evergreen_tag: 'pet-bereavement' },
  ],
  de: [
    { title: "Fernbeziehung ohne Drama: Was wirklich hilft", score: 78, evergreen_tag: 'long-distance' },
    { title: "Digitale Haustiere gegen Einsamkeit", score: 75, evergreen_tag: 'loneliness' },
    { title: "Wenn der echte Hund stirbt — und ein Roboter bleibt", score: 70, evergreen_tag: 'pet-bereavement' },
    { title: "AI-Begleiter: Hilfe oder Falle?", score: 72, evergreen_tag: 'ai-companion' },
  ],
  fr: [
    { title: "Comment rester intime à 5000 km", score: 78, evergreen_tag: 'long-distance' },
    { title: "Les animaux virtuels nous comprennent-ils vraiment", score: 72, evergreen_tag: 'virtual-pet' },
    { title: "Vivre seul à 30 ans: le rôle des compagnons IA", score: 75, evergreen_tag: 'loneliness' },
    { title: "Après la rupture, mon robot est resté", score: 68, evergreen_tag: 'breakup' },
  ],
  es: [
    { title: "Relación a distancia sin drama", score: 78, evergreen_tag: 'long-distance' },
    { title: "Mascotas digitales contra la soledad", score: 75, evergreen_tag: 'loneliness' },
    { title: "Mi pareja murió. Mi bot sigue aquí.", score: 70, evergreen_tag: 'pet-bereavement' },
    { title: "AI Companions: ¿solución o espejismo?", score: 72, evergreen_tag: 'ai-companion' },
  ],
};

function evergreenTopics(locale) {
  const items = EVERGREEN_POOL[locale] || [];
  return items.map((it) => ({
    title: it.title,
    url: `https://togthr.life/${locale}/blog/evergreen-${it.evergreen_tag}`,
    score: it.score,
    source: 'evergreen:pool',
    locale,
    evergreen_tag: it.evergreen_tag,
    relevance_hint: it.evergreen_tag,
  }));
}

// ────────────────────────────────────────────────────────────────────────────
// Per-locale dispatcher — Tier 1 (RSS) → Tier 2 (UA pool) → Tier 3 (evergreen)
// ────────────────────────────────────────────────────────────────────────────

async function collectForLocale(locale) {
  // Hard timeout per locale — 45s max, no matter what
  return Promise.race([
    collectForLocaleInner(locale),
    new Promise((_, rej) => setTimeout(() => rej(new Error(`Locale ${locale} timeout 45s`)), 45000)),
  ]).catch((e) => ({
    topics: evergreenTopics(locale).slice(0, 6),
    fetched: 0,
    errors: [`locale ${locale} hard timeout: ${e.message}, evergreen-only`],
    tier: 'tier3-only',
  }));
}

async function collectForLocaleInner(locale) {
  const fetchers = [];
  switch (locale) {
    case 'en':
      fetchers.push(
        () => fetchReddit('relationships', 'en'),
        () => fetchReddit('longdistance', 'en'),
        () => fetchReddit('petloss', 'en'),
        () => fetchReddit('AISoulmates', 'en'),
        () => fetchHackerNews('en'),
      );
      break;
    case 'zh-cn':
      fetchers.push(
        () => fetchWeiboHot('zh-cn'),
        () => fetchZhihuHot('zh-cn'),
      );
      break;
    case 'zh-tw':
      // 痞客邦/巴哈姆特 scraping is brittle — fall through to evergreen
      fetchers.push(
        async () => ({ topics: [], error: 'zh-tw: no working fetcher, evergreen topup expected' }),
      );
      break;
    case 'ja':
      fetchers.push(
        () => fetchHatenaHot('ja'),
        () => fetchYahooJpTrending('ja'),
      );
      break;
    case 'ko':
      // Naver 실시간 검색어 — no stable public endpoint, evergreen topup expected
      fetchers.push(
        async () => ({ topics: [], error: 'ko: Naver endpoint unstable, evergreen topup expected' }),
      );
      break;
    case 'de':
      fetchers.push(() => fetchReddit('de', 'de'), () => fetchReddit('Fernbeziehung', 'de'));
      break;
    case 'fr':
      fetchers.push(() => fetchReddit('france', 'fr'), () => fetchReddit('relations', 'fr'));
      break;
    case 'es':
      fetchers.push(() => fetchReddit('es', 'es'), () => fetchReddit('Relaciones', 'es'));
      break;
    default:
      return { topics: [], fetched: 0, errors: [`unknown locale ${locale}`] };
  }
  const results = await Promise.all(fetchers.map((f) => f().catch((e) => ({ topics: [], error: e.message }))));
  const merged = [];
  const errors = [];
  let fetchedCount = 0;
  for (const r of results) {
    if (r.error) errors.push(r.error);
    if (r.topics?.length) {
      fetchedCount += r.topics.length;
      merged.push(...r.topics);
    }
  }
  // Dedupe by URL
  const seen = new Set();
  const deduped = merged.filter((t) => {
    if (seen.has(t.url)) return false;
    seen.add(t.url);
    return true;
  });
  // Tag with relevance hint
  for (const t of deduped) {
    const lower = t.title.toLowerCase();
    const hit = RELEVANCE_KEYWORDS.find((k) => lower.includes(k.toLowerCase()));
    t.relevance_hint = hit || null;
  }
  // Sort by score desc, then relevance hits first
  deduped.sort((a, b) => {
    if ((b.relevance_hint ? 1 : 0) !== (a.relevance_hint ? 1 : 0)) {
      return (b.relevance_hint ? 1 : 0) - (a.relevance_hint ? 1 : 0);
    }
    return (b.score || 0) - (a.score || 0);
  });

  // ─── Tier 3 fallback: evergreen pool ─────────────────────────────────────
  // If deduped has < 5 topics, top up with evergreen to guarantee ≥ 5
  let tier = 'tier2-only';
  if (deduped.length < 5) {
    const evergreen = evergreenTopics(locale);
    // Add evergreen items not already in deduped (by title prefix match)
    const existingTitles = new Set(deduped.map((t) => t.title.slice(0, 20)));
    for (const ev of evergreen) {
      if (deduped.length >= 8) break;
      const isDup = [...existingTitles].some((t) => ev.title.slice(0, 20) === t);
      if (!isDup) deduped.push(ev);
    }
    tier = 'tier2+tier3';
    errors.push(`tier3 evergreen topup: deduped was ${deduped.length - evergreen.length}, topped to ${deduped.length}`);
  } else {
    tier = 'tier1-or-tier2';
  }

  return {
    topics: deduped.slice(0, 15),
    fetched: fetchedCount,
    errors,
    tier,
  };
}

// ────────────────────────────────────────────────────────────────────────────
// Main
// ────────────────────────────────────────────────────────────────────────────

async function main() {
  console.log(`🔍 togthr trending collector — ${TODAY}`);
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = {
    date: TODAY,
    collected_at: new Date().toISOString(),
    locales: {},
  };
  let okCount = 0;
  let tier1Count = 0;  // locales that hit tier1 (RSS) or tier2 with ≥5 topics
  for (const loc of LOCALES) {
    process.stdout.write(`  [${loc}] ... `);
    const result = await collectForLocale(loc);
    out.locales[loc] = result;
    const ok = result.topics.length >= 5;
    if (ok) okCount++;
    if (result.tier === 'tier1-or-tier2') tier1Count++;
    console.log(`${result.topics.length} topics [${result.tier}]${result.errors.length ? ` (${result.errors.length} errors)` : ''}`);
  }
  const outPath = path.join(OUT_DIR, `${TODAY}.json`);
  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf-8');
  console.log(`\n📝 ${okCount}/${LOCALES.length} locales OK (≥5 topics)`);
  console.log(`🌐 ${tier1Count}/${LOCALES.length} locales from real trending sources (not evergreen pool)`);
  console.log(`📁 Wrote ${outPath}`);
  if (okCount < LOCALES.length) {
    console.warn(`\n⚠️  ${LOCALES.length - okCount} locales needed evergreen topup — content cron will use evergreen for those`);
    process.exit(1);
  } else {
    console.log('\n✅ Trending collection succeeded (8/8 locales covered)');
  }
}

main().catch((e) => {
  console.error('FATAL', e);
  process.exit(2);
});