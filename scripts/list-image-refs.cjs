const fs = require('fs');
const path = require('path');

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const codeFiles = walk('src');
const refs = new Set();
const re = /\/pets\/([a-z0-9-]+\.(?:png|jpg|webp))/gi;
for (const f of codeFiles) {
  if (!/\.(ts|tsx|js|jsx)$/.test(f)) continue;
  const txt = fs.readFileSync(f, 'utf8');
  let m;
  while ((m = re.exec(txt)) !== null) refs.add(m[1]);
}

const referenced = [...refs].sort();
console.log('=== Referenced in code:', referenced.length, 'images ===');
referenced.forEach(r => console.log('  ' + r));

const bgDir = '.openclaw-attachments/pet-original-bg';
const bgFiles = fs.readdirSync(bgDir);

const missingInBg = referenced.filter(r => !bgFiles.includes(r));
const extraInBg = bgFiles.filter(f => !referenced.includes(f) && f.endsWith('.png'));

console.log('\n=== REFERENCED BUT MISSING in pet-original-bg/', missingInBg.length, '===');
missingInBg.forEach(r => console.log('  ' + r));

console.log('\n=== pet-original-bg/ PNGs not referenced:', extraInBg.length, '===');
extraInBg.forEach(r => console.log('  ' + r));

console.log('\n=== Summary ===');
console.log('  referenced:       ' + referenced.length);
console.log('  available in bg:  ' + (referenced.length - missingInBg.length));
console.log('  missing in bg:    ' + missingInBg.length);
console.log('  extra in bg:      ' + extraInBg.length);
