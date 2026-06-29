// cf-quota3.cjs - 简化 query 验证 schema
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
  // 简化 query：直接试 fields
  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const until = now.toISOString();

  // 用 workersInvocationsAdaptive 但只取 sum 子字段 schema 探测
  const queries = [
    // Query 1: 只 sum 一个字段试
    `query { viewer { accounts(filter: {accountTag: "${ACCT}"}) { workersInvocationsAdaptive(limit: 1, filter: {datetime_geq: "${since}", datetime_lt: "${until}"}) { sum } } } }`,
    // Query 2: workersInvocations
    `query { viewer { accounts(filter: {accountTag: "${ACCT}"}) { workersInvocations(limit: 5, filter: {datetime_geq: "${since}", datetime_lt: "${until}"}) { sum { requests errors } } } } }`,
    // Query 3: account-level totals
    `query { viewer { accounts(filter: {accountTag: "${ACCT}"}) { workersInvocationsAdaptive(limit: 1, filter: {datetime_geq: "${since}", datetime_lt: "${until}"}) { dimensions { datetime scriptName } } } } }`,
  ];
  for (let i = 0; i < queries.length; i++) {
    const r = await post('https://api.cloudflare.com/client/v4/graphql', { query: queries[i] });
    console.log(`\n=== Query ${i + 1} STATUS=${r.status} ===`);
    const j = JSON.parse(r.body);
    if (j.errors) {
      console.log('ERRORS:', JSON.stringify(j.errors[0]));
    } else if (j.data) {
      console.log('DATA (first 2000):', JSON.stringify(j.data).slice(0, 2000));
    }
  }
})();