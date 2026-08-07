// scripts/count-r2-objects.cjs — R2 对象计数（分页）
const { execFileSync } = require('child_process');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const BUCKET = process.env.R2_BUCKET || 'togthr-content';

function listPage(cursor) {
  let cmd = `npx wrangler r2 object list --bucket ${BUCKET} --json`;
  if (cursor) cmd += ` --cursor ${cursor}`;
  const out = execFileSync('cmd.exe', ['/c', cmd], {
    cwd: ROOT, encoding: 'utf8', timeout: 60000, windowsHide: true,
  });
  return JSON.parse(out);
}

let total = 0, cursor = undefined, pages = 0;
do {
  const data = listPage(cursor);
  const objs = data.objects || [];
  total += objs.length;
  cursor = data.cursor;
  pages++;
  console.log(`  page ${pages}: +${objs.length} → total ${total}${cursor ? ' (more)' : ''}`);
} while (cursor);

console.log(`R2 total objects: ${total}`);
