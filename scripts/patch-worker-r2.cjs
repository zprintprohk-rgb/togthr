// scripts/patch-worker-r2.cjs
//
// R2 直出注入：修改 .open-next/worker.js，在 middlewareHandler 之前
// 优先查 CONTENT bucket（SSG HTML），命中直接返回（带 CDN 缓存头）。
// 每次 opennext build 后运行：npm run build && node scripts/patch-worker-r2.cjs && npx opennextjs-cloudflare deploy
// 幂等：重复运行安全。

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const WORKER = path.join(ROOT, '.open-next', 'worker.js');

if (!fs.existsSync(WORKER)) {
  console.error('❌ .open-next/worker.js not found. Run build first.');
  process.exit(1);
}

let src = fs.readFileSync(WORKER, 'utf-8');

if (src.includes('R2_SSG_DIRECT')) {
  console.log('[SKIP] R2 direct-serve already patched.');
  process.exit(0);
}

const INJECT = `
// ═══════════════════════════════════════════════════════════════
// R2 SSG 直出（2026-08-07 注入，scripts/patch-worker-r2.cjs）
// SSG HTML 已外置到 R2 bucket (CONTENT binding)，key = URL 路径 + /index.html。
// 命中即返回，走边缘 CDN 缓存；未命中 fallback 到 OpenNext 运行时。
// ═══════════════════════════════════════════════════════════════
async function tryR2DirectServe(request, env) {
  try {
    if (!env || !env.CONTENT) return null;
    const url = new URL(request.url);
    const method = request.method || 'GET';
    if (method !== 'GET' && method !== 'HEAD') return null;

    // 只处理页面路径，跳过 API / _next / 静态资产
    const p = url.pathname;
    if (p.startsWith('/api/') || p.startsWith('/_next/') || p.startsWith('/cdn-cgi/')) return null;

    // 路径 → R2 key：/en/pet → /en/pet/index.html；/en/pet/ → /en/pet/index.html
    let key = p.endsWith('/') ? p + 'index.html' : p + '/index.html';
    // 根路径 / 或 /en → /en/index.html
    if (key === '//index.html') key = '/index.html';

    const obj = await env.CONTENT.get(key, { type: 'text' });
    if (!obj) return null;

    return new Response(obj, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, s-maxage=600, stale-while-revalidate=86400',
        'X-R2-Direct': '1',
      },
    });
  } catch {
    return null; // 任何异常都 fallback，绝不因 R2 挂了白屏
  }
}
`;

// Insert helper after imports, before `export default`
const marker = 'export default {';
if (!src.includes(marker)) {
  console.error('❌ Cannot find `export default {` in worker.js — template changed.');
  process.exit(1);
}
src = src.replace(marker, INJECT + '\n' + marker);

// Wrap fetch to try R2 first
const fetchStart = '    async fetch(request, env, ctx) {\n';
const fetchInjection = '    async fetch(request, env, ctx) {\n        // R2 SSG 直出优先\n        const r2Resp = await tryR2DirectServe(request, env);\n        if (r2Resp) return r2Resp;\n';
if (!src.includes(fetchInjection)) {
  src = src.replace(fetchStart, fetchInjection);
}

fs.writeFileSync(WORKER, src, 'utf-8');
console.log('[OK] R2 direct-serve injected into .open-next/worker.js');
