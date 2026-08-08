// scripts/upload-ssg-to-r2.cjs — spawn 版（cmd.exe 包装 + 强超时，防卡死）
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const APP_DIR = path.join(ROOT, '.next', 'server', 'app');
const BUCKET = process.env.R2_BUCKET || 'togthr-content';
const DRY = process.argv.includes('--dry-run');

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

function putOne(p) {
  return new Promise((resolve) => {
    const cmd = `npx wrangler r2 object put ${BUCKET}${p.key} --file="${p.file}" --content-type="text/html; charset=utf-8"`;
    const child = spawn('cmd.exe', ['/c', cmd], { cwd: ROOT, stdio: 'ignore', windowsHide: true });
    const timer = setTimeout(() => { try { child.kill(); } catch {} resolve('timeout'); }, 20000);
    child.on('exit', (code) => { clearTimeout(timer); resolve(code === 0 ? 'ok' : 'fail'); });
    child.on('error', () => { clearTimeout(timer); resolve('fail'); });
  });
}

async function main() {
  const pages = collectHtml(APP_DIR);
  console.log(`Found ${pages.length} HTML files`);
  if (DRY) { console.log('DRY-RUN first 5:', pages.slice(0, 5).map(p => p.key)); return; }

  let ok = 0, fail = 0, timeout = 0;
  for (let i = 0; i < pages.length; i++) {
    const r = await putOne(pages[i]);
    if (r === 'ok') ok++;
    else if (r === 'timeout') { timeout++; fail++; }
    else fail++;
    if ((ok + fail) % 100 === 0) console.log(`  progress: ${ok + fail}/${pages.length} (fail=${fail}, timeout=${timeout})`);
  }
  console.log(`\nDone. uploaded=${ok}, failed=${fail}, timeout=${timeout}, total=${pages.length}`);
}

main().catch(e => { console.error(e); process.exit(1); });
