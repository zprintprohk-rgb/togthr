// src/app/api/feedback/route.ts
//
// POST /api/feedback
// Accepts { type, message, email? } → forwards to support@togthr.life via Resend.
// Uses Resend API (free tier: 100 emails/day) since CF Email Routing only receives.

import { NextRequest, NextResponse } from 'next/server'

const RESEND_API = 'https://api.resend.com/emails'
const FROM = 'Togthr Feedback <feedback@togthr.life>'
const TO = 'support@togthr.life'

interface FeedbackBody {
  type: string
  message: string
  email?: string
}

export async function POST(req: NextRequest) {
  let body: FeedbackBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 })
  }

  const { type, message, email } = body
  if (!message?.trim()) {
    return NextResponse.json({ error: 'message required' }, { status: 400 })
  }

  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) {
    // If Resend not configured yet, log to console and return OK
    // (production will have the key in wrangler.toml [vars])
    console.log('[feedback]', { type, message: message.slice(0, 200), email })
    return NextResponse.json({ ok: true, note: 'logged (Resend not configured)' })
  }

  const subject = `[Feedback] ${type}${email ? ` from ${email}` : ''}`
  const replyTo = email ? [{ email }] : undefined

  try {
    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_KEY}`,
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        subject,
        reply_to: replyTo,
        text: `Type: ${type}\n${email ? `From: ${email}\n` : ''}\n${message}`,
      }),
    })

    if (!res.ok) {
      const err = await res.text().catch(() => '')
      console.error('[feedback] Resend API error', res.status, err)
      return NextResponse.json({ error: 'failed to send' }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('[feedback]', e)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
