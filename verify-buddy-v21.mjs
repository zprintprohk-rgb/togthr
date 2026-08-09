// /verify-buddy-v21.mjs
// V2.1 像素风 Buddy 验证:
//   1) 6 背景无黑洞测试 (Lavender 主题, 32×32 SVG → 256×256 放大 8x)
//   2) K2.6 anim-idle-1.png vs V2.1 Lavender 并排对比
//   3) 像素级白色 (眼睛高光) 检测
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const V21_DIR  = join(__dirname, 'public', 'buddy-v2');
const K26_PNG  = join(__dirname, 'public', 'pets', 'anim-idle-1.png');

const OUT_DIR = V21_DIR;
mkdirSync(OUT_DIR, { recursive: true });

const LAVENDER_SVG = readFileSync(join(V21_DIR, 'buddy-v21-lavender.svg'), 'utf8');
const FONT = { fontFiles: [], fontDirs: [], defaultFontFamily: 'sans-serif' };

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1) 透明背景渲染 → 像素级黑洞检测
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const SCALE = 8;  // 32×32 → 256×256
// SVG 里 width="32" height="32" 会覆盖 fitTo, 所以我们去掉 width/height 重新嵌入
const svgStripped = LAVENDER_SVG
  .replace(/<\?xml.*?\?>/, '')
  .replace(/<svg[^>]*>/, '')
  .replace(/<\/svg>/, '');
const transparentPng = new Resvg(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="${32*SCALE}" height="${32*SCALE}">${svgStripped}</svg>`,
  { ...FONT, fitTo: { mode: 'width', value: 32 * SCALE }, background: 'rgba(0,0,0,0)' }
).render().asPng();
writeFileSync(join(OUT_DIR, '_verify-v21-lavender-transparent.png'), transparentPng);

const sharp = (await import('sharp')).default;
const { data, info } = await sharp(transparentPng).raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
let whitePixels = 0;
let alphaZeroPixels = 0;
let glowPixels = 0;  // 暖橙光晕像素
for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2], a = channels === 4 ? data[i + 3] : 255;
  if (a < 30) alphaZeroPixels++;
  if (a > 200 && r > 240 && g > 240 && b > 240) whitePixels++;
  // 暖橙 #FF8E72 ≈ R=255, G=142, B=114; 允许 8x 放大的抗锯齿
  if (r > 220 && g > 100 && g < 180 && b > 80 && b < 150) glowPixels++;
}

console.log('━'.repeat(60));
console.log('V2.1 Lavender 像素级检测');
console.log('━'.repeat(60));
console.log(`SVG 渲染: ${width}x${height} (${SCALE}x 放大)`);
console.log(`白色像素 (眼睛高光): ${whitePixels}  ${whitePixels >= 20 ? '[OK]' : '[FAIL - 黑洞]'}`);
console.log(`暖橙光晕像素:         ${glowPixels}  ${glowPixels >= 30 ? '[OK]' : '[FAIL - 光晕未渲染]'}`);
console.log(`透明背景像素:         ${alphaZeroPixels}  ${alphaZeroPixels > 1000 ? '[OK 去底]' : '[WARN]'}`);
console.log('━'.repeat(60));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2) 6 背景可见性测试
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const BACKGROUNDS = [
  { name: 'dark-base',  hex: '#0F0E17', label: 'Togthr Dark Base' },
  { name: 'dark-deep',  hex: '#1A1530', label: 'Purple Deep' },
  { name: 'light-warm', hex: '#F5F0E8', label: 'Warm Cream' },
  { name: 'pure-white', hex: '#FFFFFF', label: 'Pure White' },
  { name: 'pure-black', hex: '#000000', label: 'Pure Black' },
  { name: 'gradient',   hex: 'linear:135:#FFB7C5:#A8C8D8', label: 'Pink→Blue Gradient' },
];

const CELL_W = 220, CELL_H = 240, COLS = 3;
const labelColor = (hex) => (hex === '#FFFFFF' || hex === '#F5F0E8') ? '#333' : '#FFF';

const cellSvgs = BACKGROUNDS.map((bg) => {
  let bgRect;
  if (bg.hex.startsWith('linear:')) {
    const [, angle, c1, c2] = bg.hex.match(/linear:(\d+):(#[0-9A-Fa-f]+):(#[0-9A-Fa-f]+)/);
    const rad = (parseInt(angle, 10) * Math.PI) / 180;
    const x1 = 50 - Math.cos(rad) * 60, y1 = 50 - Math.sin(rad) * 60;
    const x2 = 50 + Math.cos(rad) * 60, y2 = 50 + Math.sin(rad) * 60;
    bgRect = `
      <defs>
        <linearGradient id="g" x1="${x1}%" y1="${y1}%" x2="${x2}%" y2="${y2}%">
          <stop offset="0%" stop-color="${c1}"/>
          <stop offset="100%" stop-color="${c2}"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="${CELL_W}" height="${CELL_H}" fill="url(#g)"/>
    `;
  } else {
    bgRect = `<rect x="0" y="0" width="${CELL_W}" height="${CELL_H}" fill="${bg.hex}"/>`;
  }

  // 把 buddy svg 嵌到 cell, 居中
  const buddyInner = LAVENDER_SVG
    .replace(/<\?xml.*?\?>/, '')
    .replace(/<svg[^>]*>/, '')
    .replace(/<\/svg>/, '');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CELL_W}" height="${CELL_H}" viewBox="0 0 ${CELL_W} ${CELL_H}">
    ${bgRect}
    <svg x="${(CELL_W - 160) / 2}" y="${(CELL_H - 160 - 24) / 2}" width="160" height="160" viewBox="0 0 32 32">
      ${buddyInner}
    </svg>
    <text x="${CELL_W / 2}" y="${CELL_H - 8}" font-family="sans-serif" font-size="13" fill="${labelColor(bg.hex)}" text-anchor="middle">${bg.label}</text>
  </svg>`;
});

const cellPngs = cellSvgs.map((svg) => new Resvg(svg, { ...FONT, fitTo: { mode: 'width', value: CELL_W } }).render().asPng());

const totalW = COLS * CELL_W;
const totalH = Math.ceil(BACKGROUNDS.length / COLS) * CELL_H;
const compositeOps = cellPngs.map((png, i) => ({
  input: png,
  left: (i % COLS) * CELL_W,
  top: Math.floor(i / COLS) * CELL_H,
}));

const bg6Png = await sharp({
  create: { width: totalW, height: totalH, channels: 4, background: { r: 245, g: 240, b: 232, alpha: 1 } },
}).composite(compositeOps).png().toBuffer();
writeFileSync(join(OUT_DIR, '_verify-v21-lavender-6bg.png'), bg6Png);
console.log(`6 背景测试图: ${join(OUT_DIR, '_verify-v21-lavender-6bg.png')}`);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3) K2.6 vs V2.1 并排对比
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const k26PngBuf = readFileSync(K26_PNG);
const k26Meta = await sharp(k26PngBuf).metadata();

// 把 K2.6 缩放到 256x256, V2.1 也 256x256
const k26Resized = await sharp(k26PngBuf).resize(256, 256, { kernel: 'nearest' }).png().toBuffer();
const v21Inner = LAVENDER_SVG.replace(/<\?xml.*?\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
const v21Big = new Resvg(
  `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 32 32">${v21Inner}</svg>`,
  { ...FONT, background: 'rgba(0,0,0,0)' }
).render().asPng();

const COMP_W = 600, COMP_H = 360;
const compBg = (hex, label) => {
  const col = labelColor(hex);
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${COMP_W}" height="${COMP_H}" viewBox="0 0 ${COMP_W} ${COMP_H}">
    <rect x="0" y="0" width="${COMP_W}" height="${COMP_H}" fill="${hex}"/>
    <text x="${COMP_W/2}" y="28" font-family="sans-serif" font-size="16" font-weight="bold" fill="${col}" text-anchor="middle">${label}</text>
  </svg>`;
};

// K2.6 (左) — V2.1 (右) 放在深底对比
const k26Side = `<svg xmlns="http://www.w3.org/2000/svg" width="${COMP_W/2}" height="${COMP_H}" viewBox="0 0 ${COMP_W/2} ${COMP_H}">
  <image x="${(COMP_W/2 - 240)/2}" y="50" width="240" height="240" href="data:image/png;base64,${k26Resized.toString('base64')}"/>
  <text x="${COMP_W/4}" y="${COMP_H - 14}" font-family="sans-serif" font-size="12" fill="#AAA" text-anchor="middle">K2.6 (PNG, 白身+天线+白底)</text>
</svg>`;
const v21Side = `<svg xmlns="http://www.w3.org/2000/svg" width="${COMP_W/2}" height="${COMP_H}" viewBox="0 0 ${COMP_W/2} ${COMP_H}">
  <image x="${(COMP_W/2 - 240)/2}" y="50" width="240" height="240" href="data:image/png;base64,${v21Big.toString('base64')}"/>
  <text x="${COMP_W/4}" y="${COMP_H - 14}" font-family="sans-serif" font-size="12" fill="#AAA" text-anchor="middle">V2.1 Lavender (SVG, 彩色身+像素光晕)</text>
</svg>`;

const compSvg = compBg('#0F0E17', 'K2.6 (像素风, 白身+天线)  vs  V2.1 (像素风, 彩色身+光晕)').replace(
  /<rect x="0" y="0" width="\d+" height="\d+" fill="#0F0E17"\/>/,
  `<rect x="0" y="0" width="${COMP_W}" height="${COMP_H}" fill="#0F0E17"/>
   <g transform="translate(0, 40)">${k26Side}</g>
   <g transform="translate(${COMP_W/2}, 40)">${v21Side}</g>`
);

const compPng = new Resvg(compSvg, { ...FONT, fitTo: { mode: 'width', value: COMP_W } }).render().asPng();
writeFileSync(join(OUT_DIR, '_verify-v21-vs-k26.png'), compPng);
console.log(`K2.6 vs V2.1 对比图: ${join(OUT_DIR, '_verify-v21-vs-k26.png')}`);

console.log('━'.repeat(60));
console.log('所有验证图:');
console.log(`  1. 透明背景: ${join(OUT_DIR, '_verify-v21-lavender-transparent.png')}`);
console.log(`  2. 6 背景:   ${join(OUT_DIR, '_verify-v21-lavender-6bg.png')}`);
console.log(`  3. K2.6 对比: ${join(OUT_DIR, '_verify-v21-vs-k26.png')}`);
console.log('━'.repeat(60));
