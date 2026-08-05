// scripts/inject-utm-blog-links.cjs
// Adds withUtm() to all blog page <Link> hrefs. Idempotent.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOG = path.join(ROOT, 'src', 'app', '[locale]', 'blog');

const dirs = fs.readdirSync(BLOG, { withFileTypes: true }).filter(d => d.isDirectory() && d.name !== '[slug]');

let modified = 0, skipped = 0;

for (const d of dirs) {
  const file = path.join(BLOG, d.name, 'page.tsx');
  if (!fs.existsSync(file)) continue;

  let src = fs.readFileSync(file, 'utf-8');

  // Already has withUtm?
  if (src.includes('withUtm')) { skipped++; continue; }
  // Must have <Link> usage and import
  if (!src.includes('<Link') || !src.includes("from 'next/link'")) { skipped++; continue; }

  // 1. Add import after next/link
  if (!src.includes("from '@/lib/utm'")) {
    src = src.replace(
      /(import Link[^\n]*\n)/,
      "$1import { withUtm } from '@/lib/utm'\n"
    );
  }

  // 2. Wrap all Link hrefs with withUtm(href, SLUG)
  // Pattern: href={l.href} or href={l.href}  (in links.map)
  src = src.replace(/href=\{l\.href\}/g, 'href={withUtm(l.href, SLUG)}');

  fs.writeFileSync(file, src, 'utf-8');
  modified++;
  console.log(`[OK] ${d.name}`);
}

console.log(`\nDone. modified=${modified}, skipped=${skipped}`);
