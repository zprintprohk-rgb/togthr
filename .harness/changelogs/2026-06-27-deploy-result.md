# 2026-06-27 — GH Actions deploy ffae5f6 FAIL

## Verdict: ❌ FAIL (Pre-deploy diagnostics exit 1)

## Timeline
- `2026-06-27 10:48:10Z` — Run created (after `git push origin main`)
- `2026-06-27 10:48:12Z` — Job started
- `2026-06-27 10:49:22Z` — Step 8 failed, Deploy step 9 skipped
- `2026-06-27 10:49:26Z` — Run completed

## Failed step
- **Step 8** — `Pre-deploy diagnostics (artifact + secret + config check)`
- Exit code 1

## Error message
```
wrangler whoami failed — CLOUDFLARE_API_TOKEN is invalid, expired,
or missing required scopes (needs Workers Scripts:Edit + Account Settings:Read)
```

## Step-by-step result
| # | Step | Result |
|---|---|---|
| 1-7 | checkout / clean / setup-node / verify / npm ci / npm run cf-build | ✅ success |
| **8** | **Pre-deploy diagnostics** | ❌ **failure** |
| 9 | Deploy to Cloudflare Workers | ⏭️ skipped |
| 10 | Post-deploy (CF API verification) | ⚠️ success (false-positive: it only ran because of `if: always()`, but there was no new deployment to verify) |
| 11 | Upload deploy logs | ✅ success |

## What was NOT deployed
- **Worker code never reached Cloudflare.** The CF worker `togthr-life` is still on the previous deployment (`v3a2cf553` from 2026-06-26T19:52:40Z).
- The P0 code fixes (commit `ffae5f6`) are on `main` in git, but **not live** on the worker.

## What the user should see on https://togthr-life.zprintprohk.workers.dev/
Same as before commit `ffae5f6` — because no new deployment happened.

## Root cause
`CLOUDFLARE_API_TOKEN` GitHub Action secret in repo `zprintprohk-rgb/togthr` is either:
1. Not set at all
2. Expired
3. Missing required scope (`Workers Scripts:Edit` + `Account Settings:Read`)

## Fix
1. Go to https://github.com/zprintprohk-rgb/togthr/settings/secrets/actions
2. Edit or create `CLOUDFLARE_API_TOKEN`
3. Token can be regenerated at https://dash.cloudflare.com/profile/api-tokens
4. Required scopes: `Workers Scripts:Edit` + `Account Settings:Read` (+ optionally `Workers KV Storage:Edit` for future KV use)
5. After updating the secret, re-run the failed workflow via `gh run rerun 28276342399 --failed` or click "Re-run failed jobs" in the GitHub Actions UI

## Related
- `.harness/changelogs/2026-06-27.md` — full P0 fix log (code changes succeeded; this failure is deploy-time only)
- memory `cf-pages-deployment` topic — token scope requirements, post-deploy verification gotchas
- Run URL: https://github.com/zprintprohk-rgb/togthr/actions/runs/28276342399
 ⛅️ wrangler 4.94.0 (update available 4.105.0)
──────────────────────────────────────────────
OpenNext project detected, calling `opennextjs-cloudflare deploy`

┌──────────────────────────────�?�?OpenNext �?Cloudflare deploy �?└──────────────────────────────�?
WARN OpenNext is not fully compatible with Windows.
WARN For optimal performance, it is recommended to use Windows Subsystem for Linux (WSL).
WARN While OpenNext may function on Windows, it could encounter unpredictable failures during runtime.
Using secrets defined in .dev.vars
Incremental cache does not need populating
Tag cache does not need populating

 ⛅️ wrangler 4.94.0 (update available 4.105.0)
──────────────────────────────────────────────
🌀 Building list of assets...
�?Read 220 files from the assets directory F:\CloudDreamerApp\togthr\.open-next\assets
🌀 Starting asset upload...
🌀 Found 19 new or modified static assets to upload. Proceeding with upload...
+ /BUILD_ID
+ /_next/static/chunks/app/[locale]/store/page-9bec518b0976f045.js
+ /_next/static/chunks/app/[locale]/daily/page-79b673ea5f40c8a5.js
+ /_next/static/chunks/app/[locale]/journal/page-4bcff4f2a163fa50.js
+ /_next/static/chunks/app/[locale]/page-811d937fffd1c6c2.js
+ /_next/static/chunks/app/[locale]/pricing/page-71ac7cc6049e718e.js
+ /_next/static/css/ffe38d8d265dd422.css
+ /sitemap.xml
+ /_next/static/chunks/app/[locale]/not-found-1963fd676aeafb57.js
+ /_next/static/chunks/7853-9a9bed6be0b34897.js
+ /_next/static/chunks/app/[locale]/capsule/page-ee96dbbc58c779e2.js
+ /_next/static/chunks/app/[locale]/chat/page-3d023a386ec70fab.js
+ /_next/static/chunks/app/[locale]/features/[slug]/page-f25946ba06d1636d.js
+ /_next/static/chunks/app/[locale]/error-ccce50355eba17f1.js
+ /_next/static/chunks/app/[locale]/onboarding/page-a10997496d627299.js
+ /_next/static/chunks/app/[locale]/features/page-bc58a373527b1f10.js
+ /_next/static/chunks/app/[locale]/community/page-882f8305ea132705.js
+ /_next/static/chunks/app/[locale]/pet/page-aeff270bf1d8885f.js
+ /sitemap-0.xml
Uploaded 6 of 19 assets
Uploaded 13 of 19 assets
Uploaded 19 of 19 assets
�?Success! Uploaded 19 files (145 already uploaded) (2.45 sec)

Total Upload: 7865.47 KiB / gzip: 1580.20 KiB
Worker Startup Time: 27 ms
Your Worker has access to the following bindings:
Binding                                                                             Resource                  
env.R2 (togthr-images)                                                              R2 Bucket                 
env.ASSETS                                                                          Assets                    
env.NEXT_PUBLIC_SITE_URL ("https://togthr.life")                                    Environment Variable      
env.NEXTJS_ENV ("production")                                                       Environment Variable      
env.PAYPAL_MODE ("live")                                                            Environment Variable      
env.NEXT_PUBLIC_SUPABASE_URL ("https://pcgwvqpzyqijrvikfawd.supabase...")           Environment Variable      
env.NEXT_PUBLIC_SUPABASE_ANON_KEY ("sb_publishable_aDkUMB90QwGQAlcWAGT5Eg...")      Environment Variable      
env.NEXT_PUBLIC_CDN_URL ("https://we2-storage.r2.dev")                              Environment Variable      
env.PAYPAL_CLIENT_ID ("")                                                           Environment Variable      
env.ALIPAY_APP_ID ("")                                                              Environment Variable      
env.VAPID_PUBLIC_KEY ("")                                                           Environment Variable      
env.CRON_SECRET ("")                                                                Environment Variable      

Uploaded togthr-life (12.19 sec)
Deployed togthr-life triggers (1.51 sec)
  https://togthr-life.zprintprohk.workers.dev
  schedule: 0 0 * * *
Current Version ID: 63e6610a-885e-41c3-8686-3d1e49243ef4
(node:34792) [DEP0190] DeprecationWarning: Passing args to a child process with shell option true can lead to security vulnerabilities, as the arguments are not escaped, only concatenated.
(Use `node --trace-deprecation ...` to show where the warning was created)
