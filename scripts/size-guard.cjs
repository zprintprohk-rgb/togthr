// scripts/size-guard.cjs — bundle size 防线（P0 缺口 3）
// 部署前自动测 .open-next 关键文件 gzip 合计：
//   > 2.9 MiB → 阻断（给 3MiB 硬限留 5% 缓冲）
//   > 2.5 MiB → 警告
// 用法：node scripts/size-guard.cjs   （deploy 流程前置步骤）
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const ROOT = path.resolve(__dirname, '..');
const HARD_LIMIT_MIB = 3.0;   // CF 免费档 3MiB
const BLOCK_MIB = 2.9;        // 阻断线（95% of 3MiB）
const WARN_MIB = 2.5;         // 警告线

const bundleFiles = [
  '.open-next/worker.js',
  '.open-next/middleware/handler.mjs',
  '.open-next/server-functions/default/handler.mjs',
  '.open-next/server-functions/default/index.mjs',
];

let total = 0;
for (const f of bundleFiles) {
  const p = path.join(ROOT, f);
  if (!fs.existsSync(p)) { console.log(`(skip ${f} — 不存在)`); continue; }
  const gz = zlib.gzipSync(fs.readFileSync(p)).length;
  total += gz;
  console.log(`  ${f}: ${(gz / 1024).toFixed(0)} KB gzip`);
}

const totalMiB = total / 1024 / 1024;
console.log(`\nBundle gzip total: ${totalMiB.toFixed(2)} MiB (硬限 ${HARD_LIMIT_MIB} MiB)`);

if (totalMiB > BLOCK_MIB) {
  console.log(`❌ BLOCK: bundle ${totalMiB.toFixed(2)} MiB > ${BLOCK_MIB} MiB 阻断线 — 部署被拒绝`);
  process.exit(1);
} else if (totalMiB > WARN_MIB) {
  console.log(`⚠️ WARN: bundle ${totalMiB.toFixed(2)} MiB > ${WARN_MIB} MiB 警告线 — 注意余量 ${(HARD_LIMIT_MIB - totalMiB).toFixed(2)} MiB`);
  process.exit(0);
} else {
  console.log(`✅ PASS: bundle ${totalMiB.toFixed(2)} MiB < ${WARN_MIB} MiB`);
  process.exit(0);
}
