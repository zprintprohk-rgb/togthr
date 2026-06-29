// verify-live.cjs - 强制 IPv4 验证 CF Worker 线上状态
const https = require('https');
const dns = require('dns');
const { URL } = require('url');

// 强制 IPv4
dns.setDefaultResultOrder('ipv4first');

const urls = [
  'https://togthr-life.zprintprohk.workers.dev/',
  'https://togthr-life.zprintprohk.workers.dev/en',
];

(async () => {
  for (const url of urls) {
    console.log(`\n=== ${url} ===`);
    try {
      const html = await new Promise((resolve, reject) => {
        const req = https.get(url, {
          family: 4,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 MavisVerify',
            'Cache-Control': 'no-cache',
            'Pragma': 'no-cache',
          },
          timeout: 30000,
        }, (res) => {
          let data = '';
          res.on('data', (c) => (data += c));
          res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
        });
        req.on('timeout', () => req.destroy(new Error('timeout')));
        req.on('error', reject);
      });
      console.log(`STATUS=${html.status} LEN=${html.body.length}`);
      const checks = [
        /globals\.css/i,
        /_next\/static\/css\/([a-f0-9]+)/i,
        /bg-linear-to-/i,
        /#0B0B1A/i,
        /#110A20/i,
        /#06030F/i,
        /Always Here/i,
        /hero-gradient/i,
        /relationship/i,
        /bento/i,
        /BG_BG_/i,
        /pet-sprite/i,
        /couple|bff|bros|self/i,
      ];
      for (const rx of checks) {
        const m = html.body.match(rx);
        console.log(`  ${rx}: ${m ? 'FOUND ' + JSON.stringify(m[0]) : 'MISS'}`);
      }
      const cssMatch = html.body.match(/_next\/static\/css\/[a-f0-9]+\.css/g);
      if (cssMatch) console.log(`  CSS LINKS: ${cssMatch.join(', ')}`);
      // show title
      const titleMatch = html.body.match(/<title[^>]*>(.*?)<\/title>/i);
      if (titleMatch) console.log(`  TITLE: ${titleMatch[1]}`);
      // show first hero text
      const h1Match = html.body.match(/<h1[^>]*>(.*?)<\/h1>/is);
      if (h1Match) console.log(`  H1: ${h1Match[1].replace(/\s+/g, ' ').slice(0, 200)}`);
    } catch (e) {
      console.log(`ERR: ${e.message}`);
    }
  }
})();