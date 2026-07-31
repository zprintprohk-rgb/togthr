// scripts/export-blog-titles.ts
// Auto-exports blog titles from blog-posts.ts → .openclaw/tmp/blog-titles.json
// Called by generate-blog-covers.py to avoid manual TITLE_MAP maintenance.
import { getAllSlugs, getBlogPostsBySlug } from '../src/lib/blog-posts';
import * as fs from 'fs';
import * as path from 'path';

const outDir = path.resolve('.openclaw/tmp');
fs.mkdirSync(outDir, { recursive: true });

const slugs = getAllSlugs();
const titles: Record<string, Record<string, string>> = {};

for (const slug of slugs) {
  titles[slug] = {};
  for (const post of getBlogPostsBySlug(slug)) {
    titles[slug][post.locale] = post.title;
  }
}

const outPath = path.join(outDir, 'blog-titles.json');
fs.writeFileSync(outPath, JSON.stringify(titles, null, 2), 'utf-8');
console.log(`Exported ${slugs.length} slugs to ${outPath}`);
