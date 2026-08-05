// src/components/pet/SignalButtons.tsx
// F2: One-Tap Signals (PRD approved 2026-08-06).
'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { useTranslations } from 'next-intl'
import { trackGa4Event } from '@/lib/ga4-events'

type SignalType = 'thinking_of_you' | 'hug' | 'tired'
const SIGNALS: { type: SignalType; emoji: string; labelKey: string }[] = [
  { type: 'thinking_of_you', emoji: '❤️', labelKey: 'signalThinking' },
  { type: 'hug', emoji: '🤗', labelKey: 'signalHug' },
  { type: 'tired', emoji: '😴', labelKey: 'signalTired' },
]

export default function SignalButtons({ coupleId, userId, locale }: { coupleId: string; userId: string; locale: string }) {
  const t = useTranslations('pet')
  const [sent, setSent] = useState<SignalType | null>(null)

  async function sendSignal(type: SignalType) {
    const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
    const { error } = await supabase.from('events').insert({ couple_id: coupleId, actor_id: userId, event_type: 'signal', metadata: { signal_type: type } })
    if (!error) { setSent(type); trackGa4Event('signal_send', { signal_type: type, locale }); setTimeout(() => setSent(null), 2000) }
  }

  return (
    <div className="mt-4 flex gap-2">
      {SIGNALS.map(({ type, emoji, labelKey }) => (
        <button key={type} onClick={() => sendSignal(type)} disabled={!!sent}
          className="flex items-center gap-1 rounded-lg border border-zinc-700/40 bg-zinc-800 px-3 py-2 text-sm text-zinc-200 hover:border-pink-400/60 disabled:opacity-40"
          aria-label={t(labelKey)}>
          <span>{emoji}</span>{sent === type && <span className="text-xs text-pink-400">✓</span>}
        </button>
      ))}
    </div>
  )
}
