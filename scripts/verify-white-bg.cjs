const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

function parsePNG(buf) {
  let pos = 8;
  let width = 0, height = 0, colorType = 0, bitDepth = 0;
  const idatChunks = [];
  while (pos < buf.length) {
    const len = buf.readUInt32BE(pos); pos += 4;
    const type = buf.slice(pos, pos + 4).toString('ascii'); pos += 4;
    const data = buf.slice(pos, pos + len); pos += len + 4;
    if (type === 'IHDR') {
      width = data.readUInt32BE(0); height = data.readUInt32BE(4);
      bitDepth = data[8]; colorType = data[9];
    } else if (type === 'IDAT') {
      idatChunks.push(data);
    } else if (type === 'IEND') break;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
  const bpp = colorType === 6 ? 4 : colorType === 2 ? 3 : colorType === 4 ? 2 : 1;
  const rowSize = 1 + width * bpp;
  let alphaZeroCount = 0, whiteCount = 0, opaqueCount = 0;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const px = y * rowSize + 1 + x * bpp;
      const a = bpp >= 4 ? decompressed[px + 3] : 255;
      if (bpp >= 4) {
        if (a === 0) alphaZeroCount++;
        else if (a >= 250) {
          opaqueCount++;
          const r = decompressed[px], g = decompressed[px+1], b = decompressed[px+2];
          if (r >= 248 && g >= 248 && b >= 248) whiteCount++;
        }
      } else {
        opaqueCount++;
        if (decompressed[px] >= 248) whiteCount++;
      }
    }
  }
  return { width, height, colorType, total: width * height, alphaZeroCount, opaqueCount, whiteCount };
}

const samples = ['astronaut.png', 'programmer.png', 'expression-happy.png', 'robot-base.png', 'sticker-loveyou.png'];
for (const f of samples) {
  const buf = fs.readFileSync(path.join('public/pets', f));
  const s = parsePNG(buf);
  const zeroPct = (s.alphaZeroCount / s.total * 100).toFixed(1);
  const whitePct = (s.whiteCount / s.total * 100).toFixed(1);
  const opaquePct = (s.opaqueCount / s.total * 100).toFixed(1);
  console.log(`${f} (${s.width}x${s.height})`);
  console.log(`  alpha=0: ${zeroPct}%   opaque: ${opaquePct}%   white-ish: ${whitePct}%`);
  console.log(`  bg color type: ${s.colorType}`);
}
