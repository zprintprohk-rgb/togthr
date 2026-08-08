// scripts/inject-blog-cta.cjs — v2: 覆盖两种页面结构（nav / Keep reading）
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BLOG = path.join(ROOT, 'src', 'app', '[locale]', 'blog');

const IMPORT = `import BlogCtaBanner from '@/components/BlogCtaBanner'`;
const MARKERS = [
  `<nav className="mt-10 flex flex-wrap gap-3 text-sm">`,
  `<h2 className="mt-12 text-2xl font-semibold text-zinc-100">Keep reading</h2>`,
];

const dirs = fs.readdirSync(BLOG, { withFileTypes: true }).filter((d) => d.isDirectory() && d.name !== '[slug]');
let modified = 0, skipped = 0, failed = [];

for (const d of dirs) {
  const file = path.join(BLOG, d.name, 'page.tsx');
  if (!fs.existsSync(file)) continue;
  let src = fs.readFileSync(file, 'utf-8');

  if (src.includes('<BlogCtaBanner')) { skipped++; continue; }

  // import
  if (!src.includes(IMPORT)) {
    const m = src.match(/^(import .*?\n)/m);
    if (m) src = src.replace(m[0], m[0] + IMPORT + '\n');
  }

  // 找插入点
  let marker = MARKERS.find((mk) => src.includes(mk));
  if (!marker) { failed.push(d.name); continue; }
  src = src.replace(marker, `<BlogCtaBanner slug={SLUG} />\n\n      ${marker}`);

  fs.writeFileSync(file, src, 'utf-8');
  modified++;
  console.log(`[OK] ${d.name}`);
}

console.log(`\nDone. modified=${modified}, skipped=${skipped}, failed=${failed.length}`);
if (failed.length) console.log('FAILED:', failed.join(', '));
