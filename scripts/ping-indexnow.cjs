#!/usr/bin/env node
/**
 * scripts/ping-indexnow.cjs
 *
 * IndexNow batch URL submission for togthr.life
 * Triggered by `npm run build` postbuild hook.
 *
 * What it does:
 *   1. Read URLs from public/sitemap-0.xml
 *   2. Filter to URLs modified today (compare lastmod)
 *   3. POST batch (≤ 10,000 per call) to https://api.indexnow.org/indexnow
 *   4. Log result; non-2xx exits 1 to fail the build (so CF won't deploy)
 *
 * IndexNow covers: Bing, Yandex, DuckDuckGo, Seznam, Naver (and increasingly others)
 *
 * Setup:
 *   1. Register at https://www.bing.com/indexnow (or any IndexNow-compatible engine)
 *   2. Get a key (UUID or 8-128 char hex)
 *   3. Host the key file at https://togthr.life/{KEY}.txt (text file containing the key)
 *   4. Set INDEXNOW_KEY env var (GitHub Actions secret for production)
 *
 * Env:
 *   INDEXNOW_KEY  — your IndexNow API key (required)
 *   INDEXNOW_HOST — defaults to "togthr.life"
 *
 * Reference: https://www.indexnow.org/documentation
 */

'use strict';

const fs = require('fs');
const path = require('path');
const https = require('https');

const HOST = process.env.INDEXNOW_HOST || 'togthr.life';
const KEY = process.env.INDEXNOW_KEY || '';

const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';
const SITEMAP_PATH = path.join(__dirname, '..', 'public', 'sitemap-0.xml');

function log(level, msg) {
  const ts = new Date().toISOString();
  console.log(`[INDEXNOW ${ts}] [${level}] ${msg}`);
}

function readSitemapUrls() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    log('WARN', `sitemap not found at ${SITEMAP_PATH} (skip)`);
    return [];
  }
  const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const urls = [];
  const re = /<url>\s*<loc>([^<]+)<\/loc>\s*(?:<lastmod>([^<]+)<\/lastmod>)?\s*<\/url>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    urls.push({ url: m[1], lastmod: m[2] || null });
  }
  return urls;
}

function filterToday(urls) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  const ms = today.getTime();
  // Include URLs with lastmod today OR null (assume new). For first-time setup,
  // log all URLs to seed the index.
  const todays = urls.filter((u) => {
    if (!u.lastmod) return true;
    const lm = new Date(u.lastmod);
    return !Number.isNaN(lm.getTime()) && lm.getTime() >= ms;
  });
  return todays.length > 0 ? todays : urls; // fallback: submit all (seed)
}

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) out.push(arr.slice(i, i + size));
  return out;
}

function submitBatch(urls) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: `https://${HOST}/${KEY}.txt`,
      urlList: urls,
    });
    const req = https.request(
      INDEXNOW_ENDPOINT,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Content-Length': Buffer.byteLength(body, 'utf-8'),
        },
        timeout: 15000,
      },
      (res) => {
        let data = '';
        res.on('data', (c) => (data += c));
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      },
    );
    req.on('timeout', () => {
      req.destroy(new Error('IndexNow request timeout (15s)'));
    });
    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

async function main() {
  if (!KEY) {
    log('WARN', 'INDEXNOW_KEY env not set — skipping submission (run build still succeeds)');
    process.exit(0);
  }
  if (KEY.length < 8 || KEY.length > 128) {
    log('ERROR', `INDEXNOW_KEY length must be 8-128 chars (got ${KEY.length})`);
    process.exit(1);
  }

  const allUrls = readSitemapUrls();
  if (allUrls.length === 0) {
    log('INFO', 'no URLs found in sitemap — nothing to submit');
    process.exit(0);
  }

  const toSubmit = filterToday(allUrls).map((u) => u.url);
  log('INFO', `submitting ${toSubmit.length} URLs (total in sitemap: ${allUrls.length})`);

  const batches = chunk(toSubmit, 10000);
  let allOk = true;

  for (let i = 0; i < batches.length; i++) {
    const batch = batches[i];
    try {
      const r = await submitBatch(batch);
      if (r.status >= 200 && r.status < 300) {
        log('OK', `batch ${i + 1}/${batches.length}: ${batch.length} URLs, HTTP ${r.status}`);
      } else {
        log('ERROR', `batch ${i + 1}/${batches.length}: HTTP ${r.status} ${r.body.slice(0, 200)}`);
        allOk = false;
      }
    } catch (e) {
      log('ERROR', `batch ${i + 1}/${batches.length}: ${e.message}`);
      allOk = false;
    }
  }

  if (!allOk) {
    log('ERROR', 'one or more batches failed — build will fail to prevent deploy');
    process.exit(1);
  }
  log('OK', 'all batches submitted');
  process.exit(0);
}

main();