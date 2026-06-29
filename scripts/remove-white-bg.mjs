// scripts/remove-white-bg.mjs
//
// Batch-convert pure-white (and near-white) background pixels in
// `public/pets/*.png` to fully-transparent alpha=0.
//
// Strategy
// ────────
// 1. Output goes to `.openclaw-attachments/pet-transparent/` (NOT overwriting original yet)
// 2. Threshold: R,G,B all >= 248 → alpha=0 (covers pure white + AI antialiasing rim)
// 3. Originals stay in place — user reviews samples, then runs `scripts/swap-transparent-bg.mjs`
//
// Why this design
// ───────────────
// - All 69 AI-generated sprites have explicit "white background" baked into prompt
// - Togthr UI is dark + glassmorphism → white squares look "烂图"
// - AI cannot reliably generate transparent PNGs (always renders white)
// - sharp is a transitive dep (via Next.js chain) so we don't add devDep
//
// Usage
// ─────
//   node scripts/remove-white-bg.mjs
//   # → outputs samples + per-file stats
//   # review `.openclaw-attachments/pet-transparent/*.png`
//   node scripts/swap-transparent-bg.mjs
//   # → backup originals + atomic overwrite

import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const SRC_DIR = path.join(ROOT, 'public', 'pets');
const OUT_DIR = path.join(ROOT, '.openclaw-attachments', 'pet-transparent');
const THRESHOLD = 248; // R,G,B all >= THRESHOLD → alpha = 0

const FILES = (await fs.readdir(SRC_DIR)).filter(f => f.toLowerCase().endsWith('.png'));
if (FILES.length === 0) {
  console.error(`[err] no PNGs in ${SRC_DIR}`);
  process.exit(1);
}

await fs.mkdir(OUT_DIR, { recursive: true });

let count = 0;
let pureWhitePixelsTotal = 0;
const stats = [];

for (const f of FILES) {
  const inPath = path.join(SRC_DIR, f);
  const outPath = path.join(OUT_DIR, f);

  const inStat = await fs.stat(inPath);

  const { data, info } = await sharp(inPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const ch = info.channels;
  if (ch < 4) {
    console.error(`[skip] ${f}: not RGBA (channels=${ch})`);
    continue;
  }

  let pureWhitePixels = 0;
  for (let i = 0; i < data.length; i += ch) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    if (r >= THRESHOLD && g >= THRESHOLD && b >= THRESHOLD) {
      data[i + 3] = 0;
      pureWhitePixels++;
    }
  }

  await sharp(data, { raw: info })
    .png({ compressionLevel: 9, adaptiveFiltering: true, force: true })
    .toFile(outPath);

  const outStat = await fs.stat(outPath);
  count++;
  pureWhitePixelsTotal += pureWhitePixels;
  stats.push({
    file: f,
    pixels_killed: pureWhitePixels,
    in_size_kb: Math.round(inStat.size / 1024),
    out_size_kb: Math.round(outStat.size / 1024),
  });

  process.stdout.write(
    `[${String(count).padStart(2)}/${FILES.length}] ${f.padEnd(34)} killed=${String(pureWhitePixels).padStart(7)}  ${inStat.size}→${outStat.size} bytes\n`,
  );
}

console.log('');
console.log(`[done]  ${count} files processed`);
console.log(`[total] ${pureWhitePixelsTotal.toLocaleString()} pixels turned transparent`);
console.log(`[out]   ${path.relative(ROOT, OUT_DIR)}`);
console.log('');
console.log('[next]');
console.log('  1. review:  ls .openclaw-attachments/pet-transparent/ | head');
console.log('  2. swap:    node scripts/swap-transparent-bg.mjs');
