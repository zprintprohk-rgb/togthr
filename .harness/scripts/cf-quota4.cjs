// cf-quota4.cjs - 查 sum 数据
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
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const until = now.toISOString();

  const queries = [
    // Q1: 一段时间聚合（带 scriptName 过滤）
    `query { viewer { accounts(filter: {accountTag: "${ACCT}"}) { workersInvocationsAdaptive(limit: 1000, filter: {datetime_geq: "${since}", datetime_lt: "${until}"}) { sum { requests errors subrequests } dimensions { datetime scriptName } } } } }`,
    // Q2: 总数（不带 scriptName）
    `query { viewer { accounts(filter: {accountTag: "${ACCT}"}) { workersInvocationsAdaptive(limit: 100, filter: {datetime_geq: "${since}", datetime_lt: "${until}"}) { sum { requests errors } } } } }`,
  ];
  for (let i = 0; i < queries.length; i++) {
    const r = await post('https://api.cloudflare.com/client/v4/graphql', { query: queries[i] });
    console.log(`\n=== Query ${i + 1} STATUS=${r.status} ===`);
    const j = JSON.parse(r.body);
    if (j.errors) {
      console.log('ERRORS:', JSON.stringify(j.errors));
    } else if (j.data) {
      console.log(JSON.stringify(j.data, null, 2).slice(0, 5000));
    }
  }
})();