const fs = require('fs');
const path = require('path');

/**
 * Replace V3 home commit's hardcoded colors with globals.css design tokens.
 * Source: src/app/globals.css `:root` block
 *   --bg-cosmic:       #0B0B1A
 *   --bg-cosmic-soft:  #110A20
 *   --bg-cosmic-deep:  #06030F
 *
 * Holiday skins (christmas / valentine / halloween) keep their V3 hardcoded
 * values because globals.css has no holiday-specific tokens — that's a
 * design decision left to GLM 5.2 / designer.
 */

const replacements = [
  // V3 hero gradient → globals.css cosmic palette
  [/from-\[#1a0b2e\]/g, 'from-[#0B0B1A]'],
  [/via-\[#0f0524\]/g, 'via-[#110A20]'],
  [/to-\[#0a0118\]/g, 'to-[#06030F]'],
  // Status-dot border (decorative, kept consistent with cosmic-deep)
  [/border-\[#0a0118\]/g, 'border-[#06030F]'],
  // Any remaining bg-[#0a0118] / text-[#0a0118] (none found, but safe)
];

let totalChanges = 0;
const touchedFiles = [];

function walk(dir) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) {
      if (f.name === 'node_modules' || f.name === '.next' || f.name === '.open-next' || f.name === '.git') continue;
      walk(p);
    } else if (/\.(tsx|ts|css)$/.test(f.name) && !p.includes('node_modules')) {
      let s = fs.readFileSync(p, 'utf8');
      let fileChanges = 0;
      for (const [pattern, replacement] of replacements) {
        const matches = s.match(pattern);
        if (matches) {
          fileChanges += matches.length;
          s = s.replace(pattern, replacement);
        }
      }
      if (fileChanges > 0) {
        fs.writeFileSync(p, s, 'utf8');
        touchedFiles.push(`${p} (${fileChanges})`);
        totalChanges += fileChanges;
      }
    }
  }
}

walk('src');
console.log(`Total V3-color → tokens replaced: ${totalChanges}`);
console.log(`Files touched: ${touchedFiles.length}`);
touchedFiles.forEach((f) => console.log('  ' + f));