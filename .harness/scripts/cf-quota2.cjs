// cf-quota2.cjs - 查 worker 实际请求数（GraphQL Analytics）
const https = require('https');
const dns = require('dns');
dns.setDefaultResultOrder('ipv4first');

const TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_TOKEN;
const ACCT = '32c174efaa22353f357c0fdff9d61b86';

function post(url, body, contentType = 'application/json') {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'POST',
      family: 4,
      headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': contentType },
      timeout: 30000,
    }, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body: data }));
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
    req.write(typeof body === 'string' ? body : JSON.stringify(body));
    req.end();
  });
}

(async () => {
  // GraphQL Analytics — 看今天请求数
  const now = new Date();
  const since = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString();
  const until = now.toISOString();
  const query = `
    query {
      viewer {
        accounts(filter: { accountTag: "${ACCT}" }) {
          workersInvocationsAdaptive(
            limit: 100,
            filter: {
              datetime_geq: "${since}",
              datetime_lt: "${until}",
              scriptName: "togthr-life"
            }
          ) {
            sum {
              requestsAdaptive
              errors
              subrequests
            }
            quantiles {
              sampleInterval { p50 p90 p99 }
            }
          }
        }
      }
    }`;

  try {
    const r = await post('https://api.cloudflare.com/client/v4/graphql', { query });
    console.log('STATUS:', r.status);
    console.log('body:', r.body);
  } catch (e) { console.log('ERR:', e.message); }
})();