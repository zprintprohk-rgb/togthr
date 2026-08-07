// scripts/upload-ssg-to-r2.cjs — execSync 串行版（已验证可用）
// 970 对象，每个 ~1-2s，总 ~20-30 min。带进度显示。
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

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

async function main() {
  const pages = collectHtml(APP_DIR);
  console.log(`Found ${pages.length} HTML files`);
  if (DRY) { console.log('DRY-RUN, first 5:', pages.slice(0, 5).map(p => p.key)); return; }

  let ok = 0, fail = 0;
  for (const p of pages) {
    try {
      execSync(`npx wrangler r2 object put ${BUCKET}${p.key} --file="${p.file}" --content-type="text/html; charset=utf-8"`, {
        cwd: ROOT, stdio: 'pipe', timeout: 30000, shell: 'cmd.exe',
      });
      ok++;
    } catch {
      fail++;
    }
    if ((ok + fail) % 50 === 0) console.log(`  progress: ${ok + fail}/${pages.length} (fail=${fail})`);
  }
  console.log(`\nDone. uploaded=${ok}, failed=${fail}`);
}

main().catch(e => { console.error(e); process.exit(1); });
