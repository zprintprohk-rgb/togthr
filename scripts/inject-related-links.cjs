// scripts/inject-related-links.cjs
// CONTENT-03: inject <RelatedLinks /> into all 48 pSEO page.tsx files.
//   - adds import line after the last @/lib or @/components import
//   - inserts <RelatedLinks slug={SLUG} locale={locale} /> right before the
//     `<p className="mt-10 text-pink-400">` CTA block
// Idempotent: skips files that already contain 'RelatedLinks'.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const P_DIR = path.join(ROOT, 'src', 'app', '[locale]', 'p');

const IMPORT_LINE = `import RelatedLinks from '@/components/RelatedLinks'`;
const INSERT_MARKER = `<p className="mt-10 text-pink-400">`;
const INJECT = `      <RelatedLinks slug={SLUG} locale={locale} />\n\n`;

const dirs = fs
  .readdirSync(P_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory());

let modified = 0;
let skipped = 0;

for (const d of dirs) {
  const file = path.join(P_DIR, d.name, 'page.tsx');
  if (!fs.existsSync(file)) {
    console.log(`[SKIP] no page.tsx in ${d.name}`);
    skipped++;
    continue;
  }
  let src = fs.readFileSync(file, 'utf-8');

  if (src.includes('RelatedLinks')) {
    console.log(`[SKIP] already injected: ${d.name}`);
    skipped++;
    continue;
  }

  // 1. Add import after the last `@/lib` or `@/components` import line
  const importRe = /^import .* from '@\/(?:lib|components)\/[^']+'\n/gm;
  let lastImport = null;
  let m;
  while ((m = importRe.exec(src)) !== null) lastImport = m;
  if (!lastImport) {
    console.log(`[WARN] no @/lib or @/components import found in ${d.name}`);
    skipped++;
    continue;
  }
  const importEnd = lastImport.index + lastImport[0].length;
  src = src.slice(0, importEnd) + IMPORT_LINE + '\n' + src.slice(importEnd);

  // 2. Insert component before CTA paragraph
  if (!src.includes(INSERT_MARKER)) {
    console.log(`[WARN] CTA marker not found in ${d.name}`);
    skipped++;
    continue;
  }
  src = src.replace(INSERT_MARKER, INJECT + INSERT_MARKER);

  fs.writeFileSync(file, src, 'utf-8');
  modified++;
  console.log(`[OK] injected: ${d.name}`);
}

console.log(`\nDone. modified=${modified}, skipped=${skipped}, total=${dirs.length}`);
