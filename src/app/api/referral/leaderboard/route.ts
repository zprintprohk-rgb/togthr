// src/app/api/referral/leaderboard/route.ts
//
// GET /api/referral/leaderboard?period=week|month|all
// Returns: { period, leaders: [{ userId, name, count, avatar }] }

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

const PERIOD_DAYS: Record<string, number> = { week: 7, month: 30, all: 3650 }

export async function GET(req: NextRequest) {
  const period = req.nextUrl.searchParams.get('period') ?? 'week'
  const days = PERIOD_DAYS[period] ?? PERIOD_DAYS.week
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString()

  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('referrals')
      .select('inviter_id')
      .gte('joined_at', since)

    if (error) {
      console.error('referral leaderboard failed', error)
      return NextResponse.json({ error: 'db error' }, { status: 500 })
    }

    // Aggregate inviter counts
    const counts = new Map<string, number>()
    for (const r of data ?? []) {
      counts.set(r.inviter_id, (counts.get(r.inviter_id) ?? 0) + 1)
    }
    const top = Array.from(counts.entries())
      .sort(([, a], [, b]) => b - a)
      .slice(0, 50)
      .map(([userId, count], i) => ({
        userId,
        rank: i + 1,
        count,
        // name + avatar placeholder — join with users table when wired
        name: `User ${userId.slice(0, 6)}`,
        avatar: ['🦊', '🐼', '🐯', '🦁', '🐸', '🐨', '🐵', '🦉', '🐧', '🐺'][i % 10] ?? '🐾',
      }))

    return NextResponse.json({ period, leaders: top })
  } catch (err) {
    console.error('referral leaderboard exception', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
