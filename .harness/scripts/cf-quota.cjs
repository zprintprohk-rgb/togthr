// cf-quota.cjs - 用本地 token 查 Worker 配额
const https = require('https');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_TOKEN;
const ACCT = '32c174efaa22353f357c0fdff9d61b86';

function get(url) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'GET',
      family: 4,
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      timeout: 30000,
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  // Worker Analytics 路径
  const urls = [
    `https://api.cloudflare.com/client/v4/accounts/${ACCT}/workers/scripts/togthr-life/usage`,
    `https://api.cloudflare.com/client/v4/accounts/${ACCT}/workers/usage`,
    `https://api.cloudflare.com/client/v4/accounts/${ACCT}/workers/observability/queries`,
  ];
  for (const url of urls) {
    console.log(`\n=== ${url.split('/').slice(-3).join('/')} ===`);
    try {
      const r = await get(url);
      console.log('STATUS:', r.status);
      console.log('body first 1500:', r.body.slice(0, 1500));
    } catch (e) { console.log('ERR:', e.message); }
  }
})();