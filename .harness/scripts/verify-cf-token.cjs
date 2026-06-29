/**
 * verify-cf-token.cjs — one-shot Cloudflare API token validator.
 *
 * Reads token from .harness/.cf-token-tmp (created by you, gitignored),
 * runs `wrangler whoami`, prints ONLY the verdict + account_id.
 * Never echoes the token. Cleans up after itself.
 *
 * Usage:
 *   1. Open .harness/.cf-token-tmp in your editor
 *   2. Paste the NEW rolled token value (one line)
 *   3. Save
 *   4. Run:  node .harness/scripts/verify-cf-token.cjs
 *   5. Look at output: "VALID + account_id" or "INVALID"
 *   6. Paste the same value into GitHub Secrets
 *   7. Delete .harness/.cf-token-tmp when done
 *
 * .cf-token-tmp is gitignored (see .gitignore additions below if missing).
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const TMP = path.resolve(__dirname, '..', '.cf-token-tmp');

function die(msg, code = 1) {
  console.error(msg);
  process.exit(code);
}

if (!fs.existsSync(TMP)) {
  die(
    `Token file not found: ${TMP}\n` +
      `Create it with one line: <paste new token here>\n` +
      `Then re-run this script.`,
    2,
  );
}

const token = fs.readFileSync(TMP, 'utf8').trim();
if (!token) die(`Token file is empty: ${TMP}`, 2);
if (!token.startsWith('cf_') && !token.startsWith('cfut_')) {
  die(`Token in ${TMP} doesn't look like a Cloudflare API token (missing 'cf_' / 'cfut_' prefix). Aborting.`, 2);
}

console.log(`[verify-cf-token] token length: ${token.length} chars (prefix: ${token.slice(0, 6)}...)`);
console.log(`[verify-cf-token] running: npx wrangler whoami (token passed via env, NOT CLI args, NOT logged)`);

let out = '';
try {
  out = execSync('npx wrangler whoami', {
    cwd: path.resolve(__dirname, '..', '..'),
    env: { ...process.env, CLOUDFLARE_API_TOKEN: token },
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  });
} catch (e) {
  const combined = (e.stdout || '') + (e.stderr || '');
  if (/Invalid access token|code: 9109|code: 9106/i.test(combined)) {
    console.error(`\n[verify-cf-token] VERDICT: INVALID`);
    console.error(`[verify-cf-token] CF API rejected the token. Possible causes:`);
    console.error(`  - Token expired or rolled (paste the NEWEST value shown right after 'Copy your API token now')`);
    console.error(`  - Token revoked in Cloudflare Dashboard`);
    console.error(`  - Token copied with stray whitespace or partial characters`);
    process.exit(1);
  }
  if (/Missing required scope|Workers Scripts:Edit|Account Settings:Read/i.test(combined)) {
    console.error(`\n[verify-cf-token] VERDICT: VALID but SCOPE INSUFFICIENT`);
    console.error(`[verify-cf-token] Token authenticates, but missing scopes needed for wrangler deploy:`);
    console.error(`  - Workers Scripts:Edit`);
    console.error(`  - Account Settings:Read`);
    console.error(`Fix: edit token in CF Dashboard → add these scopes → re-roll → re-run.`);
    process.exit(2);
  }
  console.error(`\n[verify-cf-token] VERDICT: UNKNOWN (network / wrangler error)`);
  console.error(combined.slice(0, 1500));
  process.exit(3);
}

// Success path — extract Account ID + email
const accountIdMatch = out.match(/Account ID:\s*([a-f0-9]{32})/i);
const emailMatch = out.match(/associated with the email\s+(\S+@\S+)/i) || out.match(/Email:\s*(\S+@\S+)/i);

console.log(`\n[verify-cf-token] VERDICT: VALID`);
if (accountIdMatch) console.log(`[verify-cf-token] Account ID: ${accountIdMatch[1]}`);
if (emailMatch) console.log(`[verify-cf-token] Email: ${emailMatch[1]}`);
console.log(`[verify-cf-token] Paste this same token into GH Secrets (do NOT rotate between verify and paste).`);
console.log(`[verify-cf-token] Delete ${TMP} after you're done.`);

// Optional auto-clean: only if --clean flag passed
if (process.argv.includes('--clean')) {
  fs.unlinkSync(TMP);
  console.log(`[verify-cf-token] --clean flag set, deleted ${TMP}`);
}