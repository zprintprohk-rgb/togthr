// scripts/prebundle-worker.cjs — v8: 全部 external 模块 stub
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const zlib = require('zlib');

const ROOT = path.resolve(__dirname, '..');
const DEPLOY = process.argv.includes('--deploy');

async function main() {
  const esbuild = require('esbuild');
  const builtinModules = require('node:module').builtinModules;
  const bareBuiltins = new Set(builtinModules.filter((m) => !m.startsWith('node:')));

  const stubDir = path.join(ROOT, '.openclaw', 'tmp', 'stubs');
  fs.mkdirSync(stubDir, { recursive: true });

  // 各 external 模块 stub
  const stubs = {
    'ws': `export default class WsStub { constructor(){ this.CONNECTING=0; this.OPEN=1; this.CLOSING=2; this.CLOSED=3; } }`,
    '@emotion/is-prop-valid': `export default function isPropValid(){ return false }`,
    '@builder.io/partytown/integration': `export const partytownSnippet = ''; export const partytownForward = [];`,
    '@opentelemetry/api': `
      const noop = () => {};
      export const trace = { getTracer: () => ({ startSpan: () => ({ end: noop, setAttribute: noop, recordException: noop }), startActiveSpan: noop }) };
      export const context = { active: () => ({ getValue: () => undefined }), with: (_c, fn) => fn() };
      export const propagation = { inject: noop, extract: () => ({ getValue: () => undefined }) };
      export const metrics = { getMeter: () => ({ createCounter: () => ({ add: noop }), createHistogram: () => ({ record: noop }) }) };
      export const diag = { setLogger: noop, debug: noop, info: noop, warn: noop, error: noop };
      export const ROOT_CONTEXT = { getValue: () => undefined };
      export const SpanStatusCode = { ERROR: 2, OK: 1, UNSET: 0 };
      export const SpanKind = { INTERNAL: 0, SERVER: 1, CLIENT: 2, PRODUCER: 3, CONSUMER: 4 };
      export default { trace, context, propagation, metrics, diag, ROOT_CONTEXT, SpanStatusCode, SpanKind };
    `,
  };
  const stubFiles = {};
  for (const [mod, code] of Object.entries(stubs)) {
    const file = path.join(stubDir, mod.replace(/[@/]/g, '_') + '.mjs');
    fs.writeFileSync(file, code, 'utf-8');
    stubFiles[mod] = file;
  }

  const plugin = {
    name: 'node-prefix-stub-all',
    setup(build) {
      build.onResolve({ filter: /.*/ }, (args) => {
        const p = args.path;
        // stub 映射（含 dynamic import / require call）
        if (stubs[p]) {
          return { path: stubFiles[p] };
        }
        if (p.startsWith('node:') || p.startsWith('cloudflare:')) {
          return { path: p, external: true };
        }
        if (bareBuiltins.has(p) && !p.startsWith('.') && !p.startsWith('/')) {
          return { path: 'node:' + p, external: true };
        }
        return null;
      });
    },
  };

  console.log('> esbuild 预打包 v8（全 external stub）...');
  const result = await esbuild.build({
    entryPoints: [path.join(ROOT, '.open-next', 'worker.js')],
    bundle: true,
    format: 'esm',
    platform: 'neutral',
    target: 'esnext',
    minify: true,
    plugins: [plugin],
    outfile: path.join(ROOT, '.open-next', 'worker-prebuilt.mjs'),
    allowOverwrite: true,
    logLevel: 'warning',
    metafile: true,
  });

  // metafile 检查残留 external
  const externals = new Set();
  for (const meta of Object.values(result.metafile.inputs)) {
    for (const imp of meta.imports || []) {
      if (imp.external) externals.add(imp.path);
    }
  }
  const nonNode = [...externals].filter((e) => !e.startsWith('node:') && !e.startsWith('cloudflare:') && e !== '<runtime>');
  console.log(`残留非 node: external: ${nonNode.length > 0 ? nonNode.join(', ') : '无 ✅'}`);

  const d = fs.readFileSync(path.join(ROOT, '.open-next', 'worker-prebuilt.mjs'));
  const gz = zlib.gzipSync(d, { level: 9 }).length;
  const gzMiB = gz / 1024 / 1024;
  console.log(`prebuilt: ${(d.length / 1024).toFixed(0)} KiB raw / ${(gz / 1024).toFixed(0)} KiB gzip (${gzMiB.toFixed(2)} MiB)`);

  if (gzMiB > 2.9) { console.error('❌ 超限'); process.exit(1); }
  if (nonNode.length > 0) { console.error('❌ 仍有残留 external'); process.exit(1); }
  console.log(`✅ 自包含且 ${gzMiB.toFixed(2)} MiB < 3 MiB（余量 ${(3 - gzMiB).toFixed(2)} MiB）`);

  if (DEPLOY) {
    console.log('\n> 部署中...');
    execSync('npx wrangler deploy --no-bundle', { cwd: ROOT, stdio: 'inherit', shell: 'cmd.exe', timeout: 600000 });
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
