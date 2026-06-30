const https = require('https');

function get(url, headers = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers }, (res) => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: d }));
    }).on('error', reject);
  });
}

(async () => {
  const r1 = await get('https://www.togthr.life/en', {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  });

  // extract html opening tag
  const m = r1.body.match(/<html[^>]*>/);
  console.log('=== plain curl HTML opener ===');
  console.log(m ? m[0] : '(not found)');

  // extract html element className for variant
  const m2 = r1.body.match(/<html class="([^"]+)"/);
  console.log('html class attribute:', m2 ? m2[1] : '(not found)');

  // check total response headers
  console.log('\n=== response headers ===');
  for (const k of Object.keys(r1.headers)) {
    if (k.toLowerCase().includes('cache') || k.toLowerCase().includes('content') || k.toLowerCase().includes('cdn')) {
      console.log(' ', k + ':', r1.headers[k]);
    }
  }

  // find all <body> and <html> tags
  const allHtml = r1.body.match(/<html[^>]*>|<!DOCTYPE[^>]*>/gi);
  console.log('\nall html/doctype:', allHtml);
})();
