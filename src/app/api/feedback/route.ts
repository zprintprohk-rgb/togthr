// src/app/api/feedback/route.ts
//
// POST /api/feedback
// 1. Validate Turnstile token
// 2. INSERT into Supabase feedback table (status = 'pending')
// 3. Send via Resend → UPDATE status = 'sent' on success, 'failed' on error
//
// DB-backed: even if Resend fails, the record is preserved for later re-delivery.

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const TURNSTILE_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const RESEND_API = 'https://api.resend.com/emails'
const FROM = 'Togthr Feedback <feedback@togthr.life>'
const TO = 'support@togthr.life'

interface FeedbackBody {
  type: string
  message: string
  email?: string
  turnstileToken: string
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY!
  return createClient(url, key)
}

export async function POST(req: NextRequest) {
  let body: FeedbackBody
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid JSON' }, { status: 400 })
  }

  const { type, message, email, turnstileToken } = body
  if (!message?.trim()) {
    return NextResponse.json({ error: 'message required' }, { status: 400 })
  }

  // 1. Validate Turnstile
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
  let turnstileOk = false
  if (turnstileSecret && turnstileToken) {
    try {
      const fd = new FormData()
      fd.append('secret', turnstileSecret)
      fd.append('response', turnstileToken)
      const tsRes = await fetch(TURNSTILE_URL, { method: 'POST', body: fd })
      const tsJson = await tsRes.json() as { success: boolean }
      turnstileOk = !!tsJson.success
    } catch { /* fall through — will still INSERT row with turnstile_verified = false */ }
  }

  // 2. INSERT into Supabase (always — even if Turnstile fails, store for audit)
  const supabase = getSupabaseClient()
  const { data: row, error: dbError } = await supabase
    .from('feedback')
    .insert({
      email: email || null,
      type,
      message,
      status: 'pending',
      turnstile_verified: turnstileOk,
    })
    .select('id')
    .single()

  if (dbError || !row) {
    console.error('[feedback] DB insert failed', dbError)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }

  const rowId = row.id as string

  // 3. Send via Resend (if configured)
  const RESEND_KEY = process.env.RESEND_API_KEY
  if (!RESEND_KEY) {
    console.log('[feedback]', { id: rowId, type, message: message.slice(0, 200), email })
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
        text: `#${rowId}\nType: ${type}\n${email ? `From: ${email}\n` : ''}\nTurnstile: ${turnstileOk ? 'pass' : 'fail'}\n\n${message}`,
      }),
    })

    if (!res.ok) {
      const err = await res.text().catch(() => '')
      console.error('[feedback] Resend API error', res.status, err)
      await supabase.from('feedback').update({ status: 'failed' }).eq('id', rowId)
      return NextResponse.json({ error: 'failed to send' }, { status: 502 })
    }

    const resendJson = await res.json() as { id?: string }
    await supabase.from('feedback').update({
      status: 'sent',
      resend_id: resendJson.id ?? null,
    }).eq('id', rowId)

    return NextResponse.json({ ok: true, id: rowId })
  } catch (e) {
    console.error('[feedback]', e)
    await supabase.from('feedback').update({ status: 'failed' }).eq('id', rowId)
    return NextResponse.json({ error: 'internal' }, { status: 500 })
  }
}
