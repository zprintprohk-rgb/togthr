// scripts/upload-ssg-to-r2.cjs
//
// R2 外置方案（2026-08-07）：
// 构建后把 .next/server/app 下所有 SSG 页面 HTML 批量上传到 R2 bucket，
// key = URL 路径（如 /en/pet/index.html、/en/blog/xxx/index.html）。
// Worker 运行时优先 CONTENT.get(key) 直出，bundle 与内容增长解耦。
//
// 用法：node scripts/upload-ssg-to-r2.cjs [--dry-run]
// 前置：wrangler.toml 已声明 [[r2_buckets]] binding="CONTENT" bucket_name="togthr-content"
//       已执行 npx @opennextjs/cloudflare build（生成 .next/server/app 预渲染产物）

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
    if (entry.isDirectory()) {
      out.push(...collectHtml(full, path.join(prefix, entry.name)));
    } else if (entry.name.endsWith('.html') && !entry.name.endsWith('.meta')) {
      // Next 15 flat output: /en/blog/xxx.html → key /en/blog/xxx/index.html
      // But careful: some dirs produce "index.html" at dir root (e.g. /en/pet/page.html?)
      const rel = path.join(prefix, entry.name);
      const relPosix = rel.replace(/\\/g, '/');
      const key = '/' + relPosix.replace(/\.html$/, '') + '/index.html';
      out.push({ file: full, key });
    }
  }
  return out;
}

async function main() {
  if (!fs.existsSync(APP_DIR)) {
    console.error('❌ .next/server/app not found. Run `npm run build` first.');
    process.exit(1);
  }

  const pages = collectHtml(APP_DIR);
  // Dedupe: prefer explicit index.html over flattened duplicates
  const seen = new Set();
  const unique = pages.filter((p) => {
    if (seen.has(p.key)) return false;
    seen.add(p.key);
    return true;
  });

  console.log(`Found ${pages.length} HTML files → ${unique.length} unique R2 keys`);

  if (DRY) {
    console.log('DRY-RUN: sample keys:');
    unique.slice(0, 12).forEach((p) => console.log('  ' + p.key + '  ←  ' + path.relative(ROOT, p.file)));
    console.log(`Total would upload: ${unique.length} objects`);
    return;
  }

  console.log(`Uploading ${unique.length} objects to r2://${BUCKET} ...`);
  let ok = 0, fail = 0;
  for (const p of unique) {
    try {
      execSync(`npx wrangler r2 object put ${BUCKET}${p.key} --file="${p.file}" --content-type="text/html; charset=utf-8"`, {
        cwd: ROOT, stdio: 'pipe', timeout: 30000, shell: 'cmd.exe'
      });
      ok++;
    } catch (e) {
      fail++;
      console.error(`  FAIL ${p.key}: ${String(e.message).slice(0, 100)}`);
    }
    if ((ok + fail) % 100 === 0) console.log(`  progress: ${ok + fail}/${unique.length}`);
  }
  console.log(`\nDone. uploaded=${ok}, failed=${fail}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
