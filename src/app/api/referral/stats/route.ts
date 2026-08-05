// src/app/api/referral/stats/route.ts
//
// GET /api/referral/stats?userId=xxx
// Returns: { count, tier, nextTierAt, invites[] }

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

const TIERS = [
  { invites: 0, name: 'tier-0' },
  { invites: 3, name: 'tier-1' },
  { invites: 10, name: 'tier-2' },
  { invites: 30, name: 'tier-3' },
] as const

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')
  if (!userId || !/^[a-zA-Z0-9_-]{3,64}$/.test(userId)) {
    return NextResponse.json({ error: 'invalid userId' }, { status: 400 })
  }

  try {
    const supabase = await createServerClient()
    const { data, error, count } = await supabase
      .from('referrals')
      .select('invitee_id, joined_at', { count: 'exact' })
      .eq('inviter_id', userId)
      .order('joined_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('referral stats failed', error)
      return NextResponse.json({ error: 'db error' }, { status: 500 })
    }

    const inviteCount = count ?? 0
    const currentTier = [...TIERS].reverse().find((t) => inviteCount >= t.invites) ?? TIERS[0]
    const nextTier = TIERS.find((t) => t.invites > inviteCount)

    return NextResponse.json({
      userId,
      count: inviteCount,
      tier: currentTier.name,
      nextTierAt: nextTier?.invites ?? null,
      invites: (data ?? []).map((r) => ({
        id: r.invitee_id,
        joinedAt: r.joined_at,
      })),
    })
  } catch (err) {
    console.error('referral stats exception', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
