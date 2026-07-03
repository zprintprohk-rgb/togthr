const fs = require('fs');
const path = require('path');
const locales = ['en','zh-cn','zh-tw','ja','ko','de','fr','es'];
const base = path.join(__dirname, '..', 'messages');
for (const l of locales) {
  const file = path.join(base, l + '.json');
  const d = JSON.parse(fs.readFileSync(file, 'utf-8'));
  const s = d.seo || {};
  const desc = s.description || '';
  const kw = s.keywords || '';
  console.log(l + ': desc_len=' + desc.length + ' | kw_len=' + kw.length);
  console.log('  desc: ' + desc.substring(0, 120));
  console.log('');
}
