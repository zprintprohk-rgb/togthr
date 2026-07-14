const https = require('https');
function get(u) { return new Promise((res, rej) => { https.get(u, r => { let d=[]; r.on('data', c => d.push(c)); r.on('end', () => res({ s: r.statusCode, b: Buffer.concat(d).toString('utf8') })); }).on('error', rej); }); }
(async () => {
  const r = await get('https://www.togthr.life/en');
  console.log('STATUS', r.s);
  const css = [...new Set([...r.b.matchAll(/\/_next\/static\/css\/[a-zA-Z0-9_.-]+\.css/g)].map(m => m[0]))];
  console.log('CSS files:', css);
  for (const u of css) {
    const c = await get('https://www.togthr.life' + u);
    console.log('======', u, c.b.length, 'B ======');
    console.log('  #0B0B1A count  :', (c.b.match(/#0B0B1A/g) || []).length);
    console.log('  html !imp     :', (c.b.match(/html[^{]*\{[^}]*background[^}]*!important/gs) || []).length);
    console.log('  body !imp     :', (c.b.match(/body[^{]*\{[^}]*background[^}]*!important/gs) || []).length);
  }
  const headM = r.b.match(/<head>([\s\S]*?)<\/head>/);
  if (headM) {
    const h = headM[1];
    console.log('\n<head> inline <style> count:', (h.match(/<style[^>]*>/g) || []).length);
    const styles = h.match(/<style[^>]*>[\s\S]*?<\/style>/g) || [];
    styles.forEach((x, i) => console.log('  style[' + i + '] (' + x.length + 'b):', x.slice(0, 300).replace(/\n/g, ' ')));
    console.log('inline <script> count:', (h.match(/<script(?![^>]*src=)/g) || []).length);
  }
  const bodyM = r.b.match(/<body[^>]*>/);
  console.log('\n<body>:', bodyM ? bodyM[0] : 'NONE');
})().catch(e => console.error('ERR', e.message));
