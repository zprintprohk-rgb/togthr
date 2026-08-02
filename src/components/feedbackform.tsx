// src/components/feedbackform.tsx
//
// Feedback form, pricing page footer (K3 8/3).
// v2: i18n (8 locales) + Turnstile + DB-backed API.
// POSTs to /api/feedback — route handles Supabase INSERT + Resend send.

'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import Turnstile from 'react-turnstile'

const TYPES = ['bug', 'feature', 'billing', 'general'] as const
type FeedbackType = (typeof TYPES)[number]

export default function FeedbackForm() {
  const t = useTranslations('feedback')
  const [type, setType] = useState<FeedbackType>('general')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    if (!token) return
    setStatus('sending')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message, email: email || undefined, turnstileToken: token }),
      })
      if (res.ok) setStatus('sent')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <section className="rounded-2xl border border-zinc-700/40 bg-zinc-900/40 p-6" aria-label="Feedback submitted">
        <p className="text-zinc-200">{t('sentTitle')}</p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-zinc-700/40 bg-zinc-900/40 p-6" aria-label="Send feedback">
      <h3 className="text-lg font-semibold text-zinc-100">{t('title')}</h3>
      <form onSubmit={handleSubmit} className="mt-3 space-y-4">
        {/* Type */}
        <div>
          <label htmlFor="fb-type" className="block text-sm text-zinc-400">{t('typeLabel')}</label>
          <select
            id="fb-type"
            value={type}
            onChange={(e) => setType(e.target.value as FeedbackType)}
            className="mt-1 w-full rounded-lg border border-zinc-700/40 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 focus:border-pink-400/60 focus:outline-none"
          >
            {TYPES.map((k) => (
              <option key={k} value={k}>{t(`types.${k}`)}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="fb-message" className="block text-sm text-zinc-400">{t('messageLabel')}</label>
          <textarea
            id="fb-message"
            required
            rows={3}
            maxLength={2000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('messagePlaceholder')}
            className="mt-1 w-full rounded-lg border border-zinc-700/40 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-pink-400/60 focus:outline-none"
          />
        </div>

        {/* Email (optional) */}
        <div>
          <label htmlFor="fb-email" className="block text-sm text-zinc-400">{t('emailLabel')}</label>
          <input
            id="fb-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('emailPlaceholder')}
            className="mt-1 w-full rounded-lg border border-zinc-700/40 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-pink-400/60 focus:outline-none"
          />
        </div>

        {/* Turnstile */}
        <Turnstile
          sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? '1x00000000000000000000AA'}
          onVerify={setToken}
          theme="dark"
        />

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'sending' || !message.trim() || !token}
          className="rounded-lg bg-pink-500/90 px-4 py-2 text-sm font-medium text-white hover:bg-pink-500 disabled:opacity-40"
        >
          {status === 'sending' ? t('sending') : t('send')}
        </button>

        {status === 'error' && (
          <p className="text-sm text-red-400">{t('error')}</p>
        )}
      </form>
    </section>
  )
}
