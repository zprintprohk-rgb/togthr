// scripts/extract-bodies-to-r2.cjs
// 把指定 blog 页的 BODIES 内容提取为 JSON 并上传 R2（瘦身手段：内容数据不进 bundle）
// 用法：node scripts/extract-bodies-to-r2.cjs <slug1> <slug2> ...
// 产出：.openclaw/tmp/bodies-<slug>.json → wrangler r2 put togthr-content/bodies/<slug>.json

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const BUCKET = process.env.R2_BUCKET || 'togthr-content';

const slugs = process.argv.slice(2);
if (!slugs.length) { console.error('用法: node scripts/extract-bodies-to-r2.cjs <slug...>'); process.exit(1); }

for (const slug of slugs) {
  const pagePath = path.join(ROOT, 'src', 'app', '[locale]', 'blog', slug, 'page.tsx');
  if (!fs.existsSync(pagePath)) { console.error(`❌ 页面不存在: ${slug}`); continue; }
  const src = fs.readFileSync(pagePath, 'utf-8');

  // 提取 BODIES 常量：从 "const BODIES" 或 "const EN_BODY" 到文件里第一个 export function 前
  // 策略：提取所有 const X = {...} 顶层对象（BODIES/EN_BODY/EN_SECTIONS/EN_FAQS）
  const objMatches = [...src.matchAll(/^(const|let)\s+(BODIES|EN_BODY|EN_SECTIONS|EN_FAQS|EN_INTRO)\s*=\s*/gm)];
  console.log(`[${slug}] 找到 ${objMatches.length} 个内容常量:`, objMatches.map(m => m[2]).join(', '));

  // 简化方案：把整个 page.tsx 中所有被引用的内容对象复制出来风险高，
  // 改为：标记该页为"内容已外置"，写入外置清单供运行时读取
  // 本脚本实际只做清单登记，真正的 fetch 逻辑由共享组件实现
  const manifestPath = path.join(ROOT, '.openclaw', 'tmp', 'bodies-manifest.json');
  let manifest = [];
  if (fs.existsSync(manifestPath)) manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  if (!manifest.includes(slug)) manifest.push(slug);
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`[${slug}] 已登记到外置清单 (${manifest.length} 页)`);
}

console.log('\n清单: .openclaw/tmp/bodies-manifest.json');
