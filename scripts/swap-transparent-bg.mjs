// scripts/swap-transparent-bg.mjs
//
// Move review-passed transparent PNGs from
// `.openclaw-attachments/pet-transparent/` → `public/pets/`,
// with originals backup to `.openclaw-attachments/pet-original-bg/`.
//
// Pre-req
// ───────
// Run `scripts/remove-white-bg.mjs` first and visually review the output
// (e.g. opening 3-4 representative samples — robot, scene, holiday, sticker).
//
// Rollback
// ────────
// Originals live in `.openclaw-attachments/pet-original-bg/` until you
// `mavis-trash` them. To restore: copy back.

import fs from 'node:fs/promises';
import path from 'node:path';
import { existsSync } from 'node:fs';

const ROOT = process.cwd();
const TMP_DIR = path.join(ROOT, '.openclaw-attachments', 'pet-transparent');
const BACKUP_DIR = path.join(ROOT, '.openclaw-attachments', 'pet-original-bg');
const DST_DIR = path.join(ROOT, 'public', 'pets');

if (!existsSync(TMP_DIR)) {
  console.error(`[err] ${TMP_DIR} not found — run scripts/remove-white-bg.mjs first`);
  process.exit(1);
}

await fs.mkdir(BACKUP_DIR, { recursive: true });

const files = (await fs.readdir(TMP_DIR)).filter(f => f.toLowerCase().endsWith('.png'));

let swapped = 0;
let skipped = 0;
for (const f of files) {
  const dstPath = path.join(DST_DIR, f);
  const backupPath = path.join(BACKUP_DIR, f);
  const tmpPath = path.join(TMP_DIR, f);

  // Skip if no matching original in public/pets/ (extra files in tmp)
  if (!existsSync(dstPath)) {
    console.error(`[skip-no-original] ${f}`);
    skipped++;
    continue;
  }

  // Backup original (only first time)
  if (!existsSync(backupPath)) {
    await fs.copyFile(dstPath, backupPath);
  }

  // Overwrite with transparent
  await fs.copyFile(tmpPath, dstPath);
  swapped++;
}

console.log('');
console.log(`[swap]  ${swapped} files overwritten in public/pets/`);
console.log(`[skip]  ${skipped} files`);
console.log(`[backup] ${path.relative(ROOT, BACKUP_DIR)}`);
console.log('');
console.log('[rollback]');
console.log(`  foreach ($f in ${path.relative(ROOT, BACKUP_DIR)}/*.png) {`);
console.log(`    Copy-Item $f ${path.relative(ROOT, DST_DIR)}/$f -Force`);
console.log(`  }`);
