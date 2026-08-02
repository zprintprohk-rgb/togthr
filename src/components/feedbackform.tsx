// src/components/FeedbackForm.tsx
//
// Simple client-side feedback form (3 fields).
// POSTs to /api/feedback which forwards to support@togthr.life via Resend.
// "4. commit + push 4 改动" — K3 8/3.

'use client'

import { useState } from 'react'

const TYPES = ['Bug report', 'Feature request', 'Billing question', 'General feedback'] as const
type FeedbackType = (typeof TYPES)[number]

export default function FeedbackForm() {
  const [type, setType] = useState<FeedbackType>('General feedback')
  const [message, setMessage] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!message.trim()) return
    setStatus('sending')
    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, message, email: email || undefined }),
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
        <div className="rich-dot rich-dot-blue" />
        <p className="text-zinc-200">
          <span className="rich-icon rich-icon-check" /> Thanks — we got your message and will get back within 48 hours.
        </p>
      </section>
    )
  }

  return (
    <section className="rounded-2xl border border-zinc-700/40 bg-zinc-900/40 p-6" aria-label="Send feedback">
      <h3 className="text-lg font-semibold text-zinc-100">Got feedback?</h3>
      <form onSubmit={handleSubmit} className="mt-3 space-y-4">
        {/* Type */}
        <div>
          <label htmlFor="fb-type" className="block text-sm text-zinc-400">Type</label>
          <select
            id="fb-type"
            value={type}
            onChange={(e) => setType(e.target.value as FeedbackType)}
            className="mt-1 w-full rounded-lg border border-zinc-700/40 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 focus:border-pink-400/60 focus:outline-none"
          >
            {TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Message */}
        <div>
          <label htmlFor="fb-message" className="block text-sm text-zinc-400">What&rsquo;s on your mind?</label>
          <textarea
            id="fb-message"
            required
            rows={3}
            maxLength={2000}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us what you'd like to see, or what broke..."
            className="mt-1 w-full rounded-lg border border-zinc-700/40 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-pink-400/60 focus:outline-none"
          />
        </div>

        {/* Email (optional) */}
        <div>
          <label htmlFor="fb-email" className="block text-sm text-zinc-400">Your email (optional, for follow-up)</label>
          <input
            id="fb-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="mt-1 w-full rounded-lg border border-zinc-700/40 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 placeholder:text-zinc-500 focus:border-pink-400/60 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'sending' || !message.trim()}
          className="rounded-lg bg-pink-500/90 px-4 py-2 text-sm font-medium text-white hover:bg-pink-500 disabled:opacity-40"
        >
          {status === 'sending' ? 'Sending…' : 'Send feedback'}
        </button>

        {status === 'error' && (
          <p className="text-sm text-red-400">Something went wrong. Please try again.</p>
        )}
      </form>
    </section>
  )
}
