const fs = require('fs');
const locales = ['en','zh-cn','zh-tw','ja','ko','de','fr','es'];
const base = '/mnt/f/CloudDreamerApp/togthr/messages/';
for (const l of locales) {
  const d = JSON.parse(fs.readFileSync(base + l + '.json', 'utf-8'));
  const seo = d.seo || {};
  const desc = seo.description || '';
  const kw = seo.keywords || '';
  const tag = seo.tagline || '';
  console.log('=== ' + l + ' ===');
  console.log('description:', JSON.stringify(desc));
  console.log('desc_len:', desc.length);
  console.log('keywords:', JSON.stringify(kw));
  console.log('tagline:', JSON.stringify(tag));
  console.log('keywords_len:', kw.length);
}
