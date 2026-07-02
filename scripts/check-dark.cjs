const https = require('https');
const fs = require('fs');

https.get('https://www.togthr.life/en', (r) => {
  let d = '';
  r.on('data', c => d += c);
  r.on('end', () => {
    fs.writeFileSync('C:/Users/Administrator/AppData/Local/Temp/home.html', d);
    console.log('HTTP', r.statusCode, 'size', d.length);

    const colorSchemeMeta = /<meta\s+name=["']color-scheme["']\s+content=["']dark["']/i.test(d);
    console.log('color-scheme meta dark:', colorSchemeMeta ? 'YES ✓' : 'NO ✗');

    const themeColorMeta = /<meta\s+name=["']theme-color["']\s+content=["']#0B0B1A["']/i.test(d);
    console.log('theme-color meta #0B0B1A:', themeColorMeta ? 'YES ✓' : 'NO ✗');

    const inlineScript = /classList\.add\(["']dark["']\)/.test(d);
    console.log('inline classList.add(dark):', inlineScript ? 'YES ✓' : 'NO ✗');

    const htmlClass = d.match(/<html[^>]*class=["']([^"']+)["']/);
    console.log('html className:', htmlClass ? htmlClass[1] : '(none)');

    // Find next.js viewport meta tag if generated
    const viewportMeta = d.match(/<meta\s+name=["']viewport["']\s+content=["']([^"']+)["']/i);
    console.log('viewport meta:', viewportMeta ? viewportMeta[1] : '(none)');
  });
});
