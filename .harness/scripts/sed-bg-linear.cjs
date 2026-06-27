const fs = require('fs');
const path = require('path');

let count = 0;
const filesTouched = [];

function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name === 'node_modules' || f.name === '.next' || f.name === '.open-next' || f.name === '.git') continue;
      walk(p);
    } else if (/\.(tsx|ts|css|jsx|js)$/.test(f.name) && !p.includes('node_modules')) {
      const s = fs.readFileSync(p, 'utf8');
      const s2 = s.replace(/bg-gradient-to-/g, 'bg-linear-to-');
      if (s !== s2) {
        fs.writeFileSync(p, s2, 'utf8');
        const matches = (s.match(/bg-gradient-to-/g) || []).length;
        count += matches;
        filesTouched.push(`${p} (${matches})`);
      }
    }
  }
}

walk('src');
console.log(`Total bg-gradient-to-* replaced: ${count}`);
console.log(`Files touched: ${filesTouched.length}`);
filesTouched.forEach((f) => console.log('  ' + f));