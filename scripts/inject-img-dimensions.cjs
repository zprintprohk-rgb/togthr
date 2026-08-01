// scripts/inject-img-dimensions.cjs
// CWV quick-win: add width/height attributes to every <img> that lacks them,
// using the real file dimensions when the src is a local path. Idempotent.
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SRC = path.join(ROOT, 'src');

// Minimal PNG/JPEG dimension reader (no deps).
function dimsOf(absPath) {
  try {
    const buf = fs.readFileSync(absPath);
    if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      // PNG: IHDR at offset 16 (width: 16-19 BE, height: 20-23 BE)
      return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
    }
    if (buf[0] === 0xff && buf[1] === 0xd8) {
      // JPEG: scan segments for SOF0/SOF2 (0xC0/0xC2)
      let i = 2;
      while (i < buf.length - 9) {
        if (buf[i] !== 0xff) { i++; continue; }
        const marker = buf[i + 1];
        if (marker === 0xd8 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
        const len = buf.readUInt16BE(i + 2);
        if ((marker === 0xc0 || marker === 0xc2) && len >= 7) {
          const h = buf.readUInt16BE(i + 5);
          const w = buf.readUInt16BE(i + 7);
          return { w, h };
        }
        i += 2 + len;
      }
    }
  } catch (_) { /* ignore */ }
  return null;
}

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.tsx') || e.name.endsWith('.ts') || e.name.endsWith('.jsx')) out.push(p);
  }
  return out;
}

const files = walk(SRC);
let patchedFiles = 0;
let patchedImgs = 0;

for (const file of files) {
  let src = fs.readFileSync(file, 'utf-8');
  let changed = false;

  // Match <img ... /> (self-closing or with children) — capture src attr.
  const imgRe = /<img\b([^>]*?)\/?>/gs;
  let m;
  const segments = [];
  let last = 0;

  while ((m = imgRe.exec(src)) !== null) {
    const attrs = m[1];
    const start = m.index;
    const end = m.index + m[0].length;

    if (/width\s*=/.test(attrs) || /height\s*=/.test(attrs)) continue; // already has dims

    const srcMatch = attrs.match(/src\s*=\s*["']([^"']+)["']/);
    if (!srcMatch) continue;

    let url = srcMatch[1];
    if (url.startsWith('data:') || url.startsWith('http')) continue; // remote/data — skip

    // Resolve public path → absolute
    let abs = null;
    if (url.startsWith('/')) abs = path.join(ROOT, 'public', url.replace(/^\//, ''));
    else {
      const baseDir = path.dirname(file);
      const cand = path.resolve(baseDir, url);
      if (fs.existsSync(cand)) abs = cand;
    }
    if (!abs || !fs.existsSync(abs)) continue;

    const d = dimsOf(abs);
    if (!d) continue;

    const newImg = `<img${attrs} width="${d.w}" height="${d.h}" />`;
    segments.push({ start, end, newImg });
    patchedImgs++;
    changed = true;
  }

  if (changed) {
    let out = '';
    let cursor = 0;
    for (const seg of segments) {
      out += src.slice(cursor, seg.start) + seg.newImg;
      cursor = seg.end;
    }
    out += src.slice(cursor);
    fs.writeFileSync(file, out, 'utf-8');
    patchedFiles++;
    console.log(`[OK] ${path.relative(ROOT, file)}`);
  }
}

console.log(`\nDone. files=${patchedFiles}, imgs=${patchedImgs}`);
