// /verify-buddy-v2.mjs
// 验证 V2.0 SVG 在 6 种背景下无黑洞 (眼睛高光始终为白点)
// 输出: /public/buddy-v2/_verify-mochi.png (6 背景测试图)
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SVG_PATH = join(__dirname, 'public', 'buddy-v2', 'buddy-mochi.svg');
const OUT_PNG  = join(__dirname, 'public', 'buddy-v2', '_verify-mochi.png');
const OUT_DIR  = join(__dirname, 'public', 'buddy-v2');

mkdirSync(OUT_DIR, { recursive: true });

// 6 背景 (覆盖 8 locale + 深色模式 + 浅色模式 + 节日/品牌渐变)
const BACKGROUNDS = [
  { name: 'dark-base',  hex: '#0F0E17', label: 'Togthr Dark Base' },
  { name: 'dark-deep',  hex: '#1A1530', label: 'Purple Deep' },
  { name: 'light-warm', hex: '#F5F0E8', label: 'Warm Cream' },
  { name: 'pure-white', hex: '#FFFFFF', label: 'Pure White' },
  { name: 'pure-black', hex: '#000000', label: 'Pure Black' },
  { name: 'gradient',   hex: 'linear:135:#FFB7C5:#A8C8D8', label: 'Pink→Blue Gradient' },
];

// 单元格尺寸
const CELL_W = 220, CELL_H = 240;
const PADDING = 16;
const LABEL_H = 24;
const COLS = 3;

// 字体 (用系统 sans-serif, resvg 不解析 @font-face)
const FONT = { fontFiles: [], fontDirs: [], defaultFontFamily: 'sans-serif' };

// 加载 SVG
const svgText = readFileSync(SVG_PATH, 'utf8');

// 1) 单独渲染 SVG (透明背景) → 检测是否有黑洞
const baseResvg = new Resvg(svgText, {
  ...FONT,
  fitTo: { mode: 'width', value: 160 },
  background: 'rgba(0,0,0,0)',
});
const transparentPng = baseResvg.render().asPng();
writeFileSync(join(OUT_DIR, '_verify-mochi-transparent.png'), transparentPng);

// 2) 渲染 6 背景测试图 (resvg 不支持 linear-gradient on <rect>, 用渐变需用 <linearGradient>)
function renderCell(bg, x, y) {
  // 把背景色 / 渐变包成 SVG 片段
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

  // 把 buddy svg 嵌入, 居中
  const cellSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="${CELL_W}" height="${CELL_H}" viewBox="0 0 ${CELL_W} ${CELL_H}">
    ${bgRect}
    <!-- buddy 居中 -->
    <svg x="${(CELL_W - 160) / 2}" y="${(CELL_H - 160 - LABEL_H) / 2}" width="160" height="160" viewBox="0 0 128 128">
      ${svgText.replace(/<\?xml.*?\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
    </svg>
    <!-- 标签 -->
    <text x="${CELL_W / 2}" y="${CELL_H - 8}" font-family="sans-serif" font-size="13" fill="${
      bg.hex === '#FFFFFF' || bg.hex === '#F5F0E8' ? '#333' : '#FFF'
    }" text-anchor="middle">${bg.label}</text>
  </svg>`;

  return new Resvg(cellSvg, {
    ...FONT,
    fitTo: { mode: 'width', value: CELL_W },
  }).render().asPng();
}

const rows = Math.ceil(BACKGROUNDS.length / COLS);
const totalW = COLS * CELL_W;
const totalH = rows * CELL_H;

// 合成大图: 用 sharp 拼图 (项目已有 sharp)
const sharp = (await import('sharp')).default;

const cellBuffers = [];
for (const bg of BACKGROUNDS) {
  const r = new Resvg(
    (() => {
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
      const labelColor = (bg.hex === '#FFFFFF' || bg.hex === '#F5F0E8') ? '#333' : '#FFF';
      return `<svg xmlns="http://www.w3.org/2000/svg" width="${CELL_W}" height="${CELL_H}" viewBox="0 0 ${CELL_W} ${CELL_H}">
        ${bgRect}
        <svg x="${(CELL_W - 160) / 2}" y="${LABEL_H / 2}" width="160" height="160" viewBox="0 0 128 128">
          ${svgText.replace(/<\?xml.*?\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '')}
        </svg>
        <text x="${CELL_W / 2}" y="${CELL_H - 8}" font-family="sans-serif" font-size="13" fill="${labelColor}" text-anchor="middle">${bg.label}</text>
      </svg>`;
    })(),
    { ...FONT, fitTo: { mode: 'width', value: CELL_W } }
  );
  cellBuffers.push({ name: bg.name, png: r.render().asPng() });
}

// sharp 拼图
const composite = sharp({
  create: {
    width: totalW,
    height: totalH,
    channels: 4,
    background: { r: 245, g: 240, b: 232, alpha: 1 },
  },
});

let left = 0, top = 0;
const compositeOps = cellBuffers.map((c, i) => ({
  input: c.png,
  left: (i % COLS) * CELL_W,
  top: Math.floor(i / COLS) * CELL_H,
}));

const finalBuf = await composite.composite(compositeOps).png().toBuffer();
writeFileSync(OUT_PNG, finalBuf);

// 3) 黑洞检测: 用 sharp 解析 transparent PNG 的像素, 找"白点 = 眼睛高光"
const sharpMod = await import('sharp');
const sharpLib = sharpMod.default;

const { data, info } = await sharpLib(transparentPng)
  .raw()
  .toBuffer({ resolveWithObject: true });

const { width, height, channels } = info;
let whitePixels = 0;
let alphaZeroPixels = 0;
for (let i = 0; i < data.length; i += channels) {
  const r = data[i], g = data[i + 1], b = data[i + 2], a = channels === 4 ? data[i + 3] : 255;
  if (a < 30) alphaZeroPixels++;
  if (a > 200 && r > 240 && g > 240 && b > 240) whitePixels++;
}

// 期望: 眼睛高光约 2 个小团 (1.6px radius × AA = 几十像素)
const verdict = whitePixels >= 10 && whitePixels <= 300
  ? `✅ PASS — ${whitePixels} 白像素 (眼睛高光在, 无黑洞)`
  : whitePixels < 10
  ? `❌ FAIL — 仅 ${whitePixels} 白像素 (眼睛高光被吃 → 黑洞!)`
  : `⚠️ WARN — ${whitePixels} 白像素过多 (可能大块白底未去)`;

console.log('━'.repeat(60));
console.log('V2.0 Buddy Mochi 验证报告');
console.log('━'.repeat(60));
console.log(`SVG 文件       : ${SVG_PATH}`);
console.log(`透明背景 PNG   : ${transparentPng.length} bytes, ${width}×${height} (${channels}ch)`);
console.log(`6 背景测试图   : ${OUT_PNG}`);
console.log(`白色像素 (高光): ${whitePixels}`);
console.log(`透明像素 (画布外): ${alphaZeroPixels} (期望非零, 证明去底正确)`);
console.log(`判定           : ${verdict}`);
console.log('━'.repeat(60));
