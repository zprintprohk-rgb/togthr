// cf-quota5.cjs - 看最近 5 分钟的请求
const https = require('https');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_TOKEN;
const ACCT = '32c174efaa22353f357c0fdff9d61b86';

function post(url, body) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname, path: u.pathname, method: 'POST', family: 4,
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
      timeout: 30000,
    }, (res) => {
      let d = ''; res.on('data', c => d += c); res.on('end', () => resolve({ status: res.statusCode, body: d }));
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
    req.write(JSON.stringify(body));
    req.end();
  });
}

(async () => {
  const now = new Date();
  // 取过去 5 分钟和过去 1 小时数据
  const since5m = new Date(now.getTime() - 5 * 60 * 1000).toISOString();
  const since1h = new Date(now.getTime() - 60 * 60 * 1000).toISOString();

  // 1) 5 分钟聚合
  const q1 = `query { viewer { accounts(filter: {accountTag: "${ACCT}"}) { workersInvocationsAdaptive(limit: 1000, filter: {datetime_geq: "${since5m}"}) { sum { requests errors subrequests } dimensions { datetime scriptName } } } } }`;
  // 2) 1 小时聚合 + CPU time
  const q2 = `query { viewer { accounts(filter: {accountTag: "${ACCT}"}) { workersInvocationsAdaptive(limit: 1000, filter: {datetime_geq: "${since1h}"}) { sum { requests errors subrequests cpuTime } } } } }`;

  for (const [label, q] of [['5min', q1], ['1h', q2]]) {
    const r = await post('https://api.cloudflare.com/client/v4/graphql', { query: q });
    const j = JSON.parse(r.body);
    console.log(`\n=== ${label} ===`);
    console.log(JSON.stringify(j.data || j.errors).slice(0, 4000));
  }
})();