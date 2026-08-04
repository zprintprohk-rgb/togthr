# Referral System — Togthr

> **Status**: 2026-08-03 实施 / Task 11 v2 落地
> **Owner**: M3 (Mavis) for code/UI, Hermes/autoClaw for Discord bot (Task 10)

## Project Identity (verified)

- **Site name**: Togthr
- **Domain**: https://www.togthr.life
- **Support email**: support@togthr.life
- **Discord bot username (forward-looking)**: Togthr Bot
- **Discord server invite link**: PENDING — real invite created in Task 10 (Hermes)

## Architecture

```
[User clicks ?ref=xxx] → [landing page] → [Discord OAuth] → [Discord server]
                                                                    ↓
[Dashboard polls] ← [Supabase referrals] ← [Bot webhook] ← [guildMemberAdd event]
```

- **Storage**: Supabase (already integrated, same instance as auth)
- **Auth for Dashboard**: Discord OAuth (bot-driven, uses same Supabase user)
- **Bot**: Cloudflare Worker with discord.js v14 (Task 10, Hermes)

## API contracts (Task 11)

### POST /api/referral/track
- Auth: `x-bot-secret` header (shared secret with bot)
- Body: `{ inviterId, inviteeId, inviteeEmail }`
- Idempotent on `invitee_id` (upsert)
- Returns: `{ ok: true, referral }` or 4xx/5xx

### GET /api/referral/stats?userId=xxx
- Auth: none (public — invitee_id is non-PII)
- Returns: `{ userId, count, tier, nextTierAt, invites[] }`

### GET /api/referral/leaderboard?period=week|month|all
- Auth: none
- Returns: `{ period, leaders: [{ userId, rank, count, name, avatar }] }`

## Supabase schema

```sql
create table if not exists public.referrals (
  inviter_id text not null,
  invitee_id text primary key,
  invitee_email text not null,
  joined_at timestamptz not null default now()
);
create index if not exists referrals_inviter_idx on public.referrals (inviter_id, joined_at desc);
```

RLS: bot writes via service role key (server-only). Public reads via anon key
(scoped to count-only views — to be added when v2 lands).

## Anti-cheat (Task 10 dependency)

- Each invitee must verify email + link Discord account (enforced in bot)
- Self-invite blocked at API layer (`inviterId === inviteeId` → 400)
- Idempotency: same invitee_id can only be counted once (DB unique constraint)
- Bot-side rate limit: 1 track per invitee per 24h (per Hermes discretion)

## Reward tiers (mirrored from Task 11 spec)

| Invites | Reward |
|---|---|
| 3 | 1 month VIP |
| 10 | 3 months VIP + Founder role |
| 30 | Lifetime VIP + Founder Circle |

## Handoff to Hermes (Task 10 — Discord bot)

The bot MUST:
1. On `guildMemberAdd`: parse `?ref=xxx` from the invite URL the user used,
   POST to `/api/referral/track` with the same `REFERRAL_BOT_SECRET` env
   var (set via `npx wrangler secret put REFERRAL_BOT_SECRET` on main site).
2. On milestone hit (3/10/30): DM the user with VIP code + assign Discord role.
3. Read latest blog RSS from `https://www.togthr.life/rss.xml` (or fallback
   to the JSON in `.hermes/blog-fallback.json` if RSS missing) and post
   daily to `#daily-blog` channel at 09:00 CST via CF Cron Trigger.

## Files written by gen-referral.py

- `src/app/[locale]/referral/page.tsx`
- `src/app/[locale]/referral/dashboard/page.tsx`
- `src/app/[locale]/referral/leaderboard/page.tsx`
- `src/app/api/referral/track/route.ts`
- `src/app/api/referral/stats/route.ts`
- `src/app/api/referral/leaderboard/route.ts`
- `docs/referral-system.md` (this file)

## TODO (deferred until Task 10 lands)

- [ ] Wire Discord OAuth into dashboard (auth flow needs Discord app)
- [ ] Replace mock data in dashboard with real `/api/referral/stats` call
- [ ] Replace mock leaderboard with real `/api/referral/leaderboard` call
- [ ] Set `REFERRAL_BOT_SECRET` as wrangler secret
- [ ] Run Supabase migration (schema above)
- [ ] Get real Discord invite link from Hermes, replace `discord.gg/togthr` placeholder
