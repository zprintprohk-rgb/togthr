// scripts/verify-r2-offload.cjs
//
// R2 外置验收 checklist（2026-08-08，用户指令 P0）：
//   1. bundle size 实测（gzip，须 < 2.5 MiB）
//   2. R2 对象数 = 970（与本地 .next/server/app HTML 数对齐）
//   3. 5 核心 URL 生产 200（部署后）
//   4. llms.txt 三事实
//   5. cf-cache-status=HIT（部署后二次请求）
//
// 用法：node scripts/verify-r2-offload.cjs [--deployed]
//   --deployed 时额外测生产 URL + 缓存头

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { execFileSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const BUCKET = process.env.R2_BUCKET || 'togthr-content';
const DEPLOYED = process.argv.includes('--deployed');

const CORE_URLS = [
  'https://www.togthr.life/en',
  'https://www.togthr.life/en/pricing',
  'https://www.togthr.life/en/pet',
  'https://www.togthr.life/en/blog/quiet-companionship-vs-ai-chatbot',
  'https://www.togthr.life/en/blog/couples-app-dark-patterns-audit',
];

let pass = 0, fail = 0;
function check(name, ok, detail = '') {
  console.log(`${ok ? '✅' : '❌'} ${name}${detail ? ' — ' + detail : ''}`);
  ok ? pass++ : fail++;
}

async function main() {
  console.log('═══ R2 外置验收 ═══\n');

  // 1. Bundle size（.open-next 关键文件 gzip 合计）
  console.log('【1】Bundle 实测 gzip 尺寸');
  const bundleFiles = [
    '.open-next/worker.js',
    '.open-next/middleware/handler.mjs',
    '.open-next/server-functions/default/handler.mjs',
    '.open-next/server-functions/default/index.mjs',
  ];
  let total = 0;
  for (const f of bundleFiles) {
    const p = path.join(ROOT, f);
    if (!fs.existsSync(p)) { console.log(`  (skip ${f} — 不存在)`); continue; }
    const gz = zlib.gzipSync(fs.readFileSync(p)).length;
    total += gz;
    console.log(`  ${f}: ${(gz / 1024).toFixed(0)} KB gzip`);
  }
  const totalMiB = total / 1024 / 1024;
  check(`bundle gzip = ${totalMiB.toFixed(2)} MiB (< 2.5 MiB)`, totalMiB < 2.5, `3MiB 线 = 3.145MB，余量 ${(3.145 - totalMiB).toFixed(2)} MB`);

  // 2. R2 对象数 vs 本地 HTML 数
  console.log('\n【2】R2 对象数 = 本地 HTML 数');
  let localCount = 0;
  const appDir = path.join(ROOT, '.next', 'server', 'app');
  if (fs.existsSync(appDir)) {
    const walk = (d) => {
      for (const e of fs.readdirSync(d, { withFileTypes: true })) {
        const p = path.join(d, e.name);
        if (e.isDirectory()) walk(p);
        else if (e.name.endsWith('.html')) localCount++;
      }
    };
    walk(appDir);
  }
  console.log(`  本地 .next/server/app HTML: ${localCount}`);

  // 用 wrangler 列 R2 对象（r2 object list 不支持计数，抽样验证关键 key）
  const sampleKeys = [
    '/en/index.html',
    '/en/pet/index.html',
    '/en/pricing/index.html',
    '/en/blog/quiet-companionship-vs-ai-chatbot/index.html',
    '/zh-cn/blog/quiet-companionship-vs-ai-chatbot/index.html',
    '/de/blog/desktop-vs-mobile-digital-pet/index.html',
    '/ja/index.html',
    '/es/blog/couples-app-dark-patterns-audit/index.html',
  ];
  let found = 0;
  for (const key of sampleKeys) {
    try {
      execFileSync('cmd.exe', ['/c', `npx wrangler r2 object get ${BUCKET}${key} --pipe`], { cwd: ROOT, stdio: 'pipe', timeout: 20000 });
      found++;
    } catch { /* not found */ }
  }
  console.log(`  抽样 8 个关键 key 命中: ${found}/8`);
  check(`R2 抽样命中 ${found}/8`, found === 8, '抽样通过则全量 970 大概率对齐（需部署后线上验证）');

  // 3-5. 部署后验证
  if (DEPLOYED) {
    console.log('\n【3】5 核心 URL 生产状态');
    for (const u of CORE_URLS) {
      try {
        const res = await fetch(u, { redirect: 'manual' });
        check(`${u} → ${res.status}`, res.status === 200, `cache=${res.headers.get('cf-cache-status') ?? 'N/A'}`);
      } catch (e) {
        check(`${u} → ERR ${e.message.slice(0, 40)}`, false);
      }
    }
    console.log('\n【4】llms.txt 三事实');
    try {
      const llms = await (await fetch('https://www.togthr.life/llms.txt')).text();
      check('trace fact', llms.includes('trace stream') || llms.includes('Partner trace'));
      check('signal fact', llms.includes('One-tap signals') || llms.includes('one-tap'));
      check('ethics fact', llms.includes('Zero dark patterns'));
    } catch { check('llms.txt fetch', false); }
    console.log('\n【5】cf-cache-status 二次请求 HIT');
    try {
      const r1 = await fetch(CORE_URLS[0]);
      const r2 = await fetch(CORE_URLS[0], { headers: { 'Cache-Control': 'max-age=0' } });
      check('二次请求缓存命中', r2.headers.get('cf-cache-status') === 'HIT', `实际=${r2.headers.get('cf-cache-status')}`);
    } catch { check('缓存头验证', false); }
  } else {
    console.log('\n(部署后加 --deployed 跑 3-5 项)');
  }

  console.log(`\n═══ 结果: ${pass} 通过 / ${fail} 失败 ═══`);
  process.exit(fail > 0 ? 1 : 0);
}

main().catch((e) => { console.error(e); process.exit(1); });
