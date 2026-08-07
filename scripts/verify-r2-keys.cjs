// scripts/verify-r2-keys.cjs — key 存在性 diff（P0 缺口 1）
// 本地 .next/server/app 970 个 HTML 路径清单 vs R2 桶内存在性（HEAD 探测）
// 输出 missing 列表；missing = 0 才算上传完成。
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(ROOT, '.next', 'server', 'app');
const BUCKET = process.env.R2_BUCKET || 'togthr-content';

function collectHtml(dir, prefix = '') {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...collectHtml(full, path.join(prefix, entry.name)));
    else if (entry.name.endsWith('.html')) {
      const rel = path.join(prefix, entry.name).replace(/\\/g, '/');
      out.push({ file: full, key: '/' + rel.replace(/\.html$/, '') + '/index.html' });
    }
  }
  return out;
}

function keyExists(key) {
  try {
    const cmd = `npx wrangler r2 object get ${BUCKET}${key} --pipe`;
    execFileSync('cmd.exe', ['/c', cmd], { cwd: ROOT, stdio: 'pipe', timeout: 20000, windowsHide: true });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const pages = collectHtml(APP_DIR);
  console.log(`Local HTML files: ${pages.length}`);

  const missing = [];
  let checked = 0;
  for (const p of pages) {
    if (!keyExists(p.key)) missing.push(p.key);
    checked++;
    if (checked % 200 === 0) console.log(`  checked ${checked}/${pages.length}, missing=${missing.length}`);
  }

  console.log(`\nChecked ${checked} keys.`);
  if (missing.length === 0) {
    console.log('✅ ALL KEYS PRESENT — R2 上传完成 (missing=0)');
  } else {
    console.log(`❌ MISSING ${missing.length} keys:`);
    missing.slice(0, 30).forEach((k) => console.log('  ' + k));
    if (missing.length > 30) console.log(`  ... and ${missing.length - 30} more`);
  }
  process.exit(missing.length === 0 ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(1); });
