// cf-versions.cjs - 用本地 token 直查 CF API 当前 worker 版本
const https = require('https');
dns = require('dns'); dns.setDefaultResultOrder('ipv4first');

const TOKEN = process.env.CLOUDFLARE_API_TOKEN || process.env.CF_TOKEN;

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
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('timeout', () => req.destroy(new Error('timeout')));
    req.on('error', reject);
    req.end();
  });
}

(async () => {
  try {
    console.log('=== /accounts ===');
    const accts = await get('https://api.cloudflare.com/client/v4/accounts?per_page=5');
    console.log('STATUS:', accts.status);
    const data = JSON.parse(accts.body);
    if (!data.success) { console.log('FAIL:', JSON.stringify(data.errors)); return; }
    console.log('Accounts:');
    for (const a of data.result || []) {
      console.log(`  - id=${a.id} name=${a.name}`);
    }
    const acctId = data.result[0]?.id;
    if (!acctId) { console.log('No account'); return; }

    console.log(`\n=== /accounts/${acctId}/workers/scripts/togthr-life ===`);
    const script = await get(`https://api.cloudflare.com/client/v4/accounts/${acctId}/workers/scripts/togthr-life`);
    console.log('STATUS:', script.status);
    console.log('body first 200:', script.body.slice(0, 200));

    // Settings endpoint gives deployment metadata
    console.log(`\n=== /accounts/${acctId}/workers/scripts/togthr-life/settings ===`);
    const settings = await get(`https://api.cloudflare.com/client/v4/accounts/${acctId}/workers/scripts/togthr-life/settings`);
    console.log('STATUS:', settings.status);
    try {
      const sd = JSON.parse(settings.body);
      console.log(JSON.stringify(sd, null, 2).slice(0, 1500));
    } catch (e) {
      console.log('body first 300:', settings.body.slice(0, 300));
    }

    console.log(`\n=== /accounts/${acctId}/workers/scripts/togthr-life/versions?per_page=5 ===`);
    const vers = await get(`https://api.cloudflare.com/client/v4/accounts/${acctId}/workers/scripts/togthr-life/versions?per_page=5`);
    console.log('STATUS:', vers.status);
    const vd = JSON.parse(vers.body);
    console.log('versions body first 3000:', vers.body.slice(0, 3000));
    if (vd.success && vd.result) {
      console.log('Recent versions (newest first):');
      const list = Array.isArray(vd.result) ? vd.result : [vd.result];
      for (const v of list) {
        console.log(`  - id=${v.id} created=${v.created_on} percentage=${v.percentage} event=${v.annotations?.['workers/triggered_by'] || ''}`);
      }
    } else if (vd.errors) {
      console.log('errors:', JSON.stringify(vd.errors));
    }
  } catch (e) {
    console.log('ERR:', e.message, e.stack);
  }
})();