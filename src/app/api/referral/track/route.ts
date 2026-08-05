// src/app/api/referral/track/route.ts
//
// POST /api/referral/track
// Body: { inviterId, inviteeId, inviteeEmail }
// Bot calls this when new Discord member joins via ?ref= link
//
// Storage: Supabase table "referrals" (per docs/referral-system.md)

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase'

interface TrackBody {
  inviterId: string
  inviteeId: string
  inviteeEmail: string
}

export async function POST(req: NextRequest) {
  // 1. Auth: require shared secret (set in wrangler.toml [vars] or as secret)
  const auth = req.headers.get('x-bot-secret')
  const expected = process.env.REFERRAL_BOT_SECRET ?? process.env.CRON_SECRET
  if (!expected || auth !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  // 2. Parse + validate
  let body: TrackBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }
  if (!body.inviterId || !body.inviteeId || !body.inviteeEmail) {
    return NextResponse.json({ error: 'missing fields' }, { status: 400 })
  }
  if (!/^[a-zA-Z0-9_-]{3,64}$/.test(body.inviterId) || !/^[a-zA-Z0-9_-]{3,64}$/.test(body.inviteeId)) {
    return NextResponse.json({ error: 'invalid id format' }, { status: 400 })
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(body.inviteeEmail)) {
    return NextResponse.json({ error: 'invalid email' }, { status: 400 })
  }
  if (body.inviterId === body.inviteeId) {
    return NextResponse.json({ error: 'self-invite' }, { status: 400 })
  }

  // 3. Persist (Supabase)
  try {
    const supabase = await createServerClient()
    const { data, error } = await supabase
      .from('referrals')
      .upsert(
        {
          inviter_id: body.inviterId,
          invitee_id: body.inviteeId,
          invitee_email: body.inviteeEmail,
          joined_at: new Date().toISOString(),
        },
        { onConflict: 'invitee_id' }
      )
      .select('inviter_id, invitee_id, joined_at')
      .single()

    if (error) {
      console.error('referral track failed', error)
      return NextResponse.json({ error: 'db error' }, { status: 500 })
    }

    return NextResponse.json({ ok: true, referral: data })
  } catch (err) {
    console.error('referral track exception', err)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
