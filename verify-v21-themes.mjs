// /verify-v21-themes.mjs
// 6 主题并排展示
import { Resvg } from '@resvg/resvg-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const V21_DIR = join(__dirname, 'public', 'buddy-v2');

const THEMES = ['mochi', 'berry', 'cocoa', 'sky', 'forest', 'lavender'];
const THEME_LABELS = {
  mochi: 'Mochi 黄油奶黄',
  berry: 'Berry 暖心柔粉',
  cocoa: 'Cocoa 焦糖可可',
  sky: 'Sky 冰川晨蓝',
  forest: 'Forest 雾感薄荷',
  lavender: 'Lavender 梦境紫',
};

const FONT = { fontFiles: [], fontDirs: [], defaultFontFamily: 'sans-serif' };
const CELL = 200;
const PADDING = 16;
const LABEL_H = 30;

const svgs = THEMES.map((theme) => {
  const svgText = readFileSync(join(V21_DIR, `buddy-v21-${theme}.svg`), 'utf8')
    .replace(/<\?xml.*?\?>/, '').replace(/<svg[^>]*>/, '').replace(/<\/svg>/, '');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${CELL}" height="${CELL + LABEL_H}" viewBox="0 0 ${CELL} ${CELL + LABEL_H}">
    <rect x="0" y="0" width="${CELL}" height="${CELL + LABEL_H}" fill="#0F0E17"/>
    <svg x="${(CELL - 160) / 2}" y="${(CELL - 160) / 2}" width="160" height="160" viewBox="0 0 32 32">${svgText}</svg>
    <text x="${CELL / 2}" y="${CELL + 22}" font-family="sans-serif" font-size="14" fill="#FFF" text-anchor="middle">${THEME_LABELS[theme]}</text>
  </svg>`;
});

const pngs = await Promise.all(svgs.map(async (svg) => {
  const r = new Resvg(svg, { ...FONT, fitTo: { mode: 'width', value: CELL } });
  return r.render().asPng();
}));

const totalW = THEMES.length * CELL;
const totalH = CELL + LABEL_H;
const composite = sharp({
  create: { width: totalW, height: totalH, channels: 4, background: { r: 15, g: 14, b: 23, alpha: 1 } },
});
const ops = pngs.map((png, i) => ({ input: png, left: i * CELL, top: 0 }));
const buf = await composite.composite(ops).png().toBuffer();
const outPath = join(V21_DIR, '_verify-v21-6-themes.png');
writeFileSync(outPath, buf);
console.log('6 主题并排图:', outPath);
