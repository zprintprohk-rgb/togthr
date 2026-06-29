/**
 * deploy-worker.cjs — run `wrangler deploy` with token scoped to process,
 * write stdout/stderr to a log file, return exit code.
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const TOKEN = process.argv[2];
if (!TOKEN || (!TOKEN.startsWith('cf_') && !TOKEN.startsWith('cfut_'))) {
  console.error('Usage: node deploy-worker.cjs <CF_TOKEN>');
  process.exit(2);
}

const CWD = path.resolve(__dirname, '..', '..');
const LOG = path.resolve(__dirname, '..', 'diag-deploy.log');

console.log(`[deploy-worker] cwd: ${CWD}`);
console.log(`[deploy-worker] token length: ${TOKEN.length} chars (prefix: ${TOKEN.slice(0, 6)}...)`);
console.log(`[deploy-worker] log: ${LOG}`);
console.log(`[deploy-worker] running: npx wrangler deploy 2>&1 | tee log`);

let out = '';
try {
  out = execSync('npx wrangler deploy 2>&1', {
    cwd: CWD,
    env: { ...process.env, CLOUDFLARE_API_TOKEN: TOKEN },
    encoding: 'utf8',
    maxBuffer: 50 * 1024 * 1024, // 50MB headroom
  });
  fs.writeFileSync(LOG, out);
  console.log('[deploy-worker] --- SUCCESS ---');
  console.log('[deploy-worker] exit code: 0');
  console.log('[deploy-worker] log size:', out.length, 'chars');
  console.log('[deploy-worker] last 800 chars of log:');
  console.log('---');
  console.log(out.slice(-800));
  console.log('---');
  process.exit(0);
} catch (e) {
  const stdout = e.stdout || '';
  const stderr = e.stderr || '';
  const combined = stdout + stderr;
  fs.writeFileSync(LOG, combined);
  console.error('[deploy-worker] --- FAILED ---');
  console.error('[deploy-worker] exit code:', e.status);
  console.error('[deploy-worker] stdout:', stdout.length, 'chars');
  console.error('[deploy-worker] stderr:', stderr.length, 'chars');
  console.error('[deploy-worker] last 1500 chars of combined output:');
  console.error('---');
  console.error(combined.slice(-1500));
  console.error('---');
  process.exit(e.status || 1);
}