// scripts/verify-r2-keys.cjs — key 存在性 diff（并发 8 路版）
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(ROOT, '.next', 'server', 'app');
const BUCKET = process.env.R2_BUCKET || 'togthr-content';
const CONCURRENCY = 8;

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
  return new Promise((resolve) => {
    const cmd = `npx wrangler r2 object get ${BUCKET}${key} --pipe`;
    const child = spawn('cmd.exe', ['/c', cmd], { cwd: ROOT, stdio: 'ignore', windowsHide: true });
    const timer = setTimeout(() => { try { child.kill(); } catch {} resolve(false); }, 15000);
    child.on('exit', (code) => { clearTimeout(timer); resolve(code === 0); });
    child.on('error', () => { clearTimeout(timer); resolve(false); });
  });
}

async function main() {
  const pages = collectHtml(APP_DIR);
  console.log(`Local HTML files: ${pages.length}`);
  const missing = [];
  let checked = 0, idx = 0;

  async function worker() {
    while (idx < pages.length) {
      const p = pages[idx++];
      const exists = await keyExists(p.key);
      if (!exists) missing.push(p.key);
      checked++;
      if (checked % 100 === 0) console.log(`  checked ${checked}/${pages.length}, missing=${missing.length}`);
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));

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
