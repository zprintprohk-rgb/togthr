// src/components/pet/TraceStream.tsx
//
// F1: Partner Trace Stream (PRD approved 2026-08-06).
// Renders reversed chronological list of partner actions on shared pet.
// Data: Supabase events table (feed/touch/signal).
// Privacy: only events for this couple's pet.

'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useTranslations } from 'next-intl'
import { trackGa4Event } from '@/lib/ga4-events'

interface TraceEvent {
  id: string
  event_type: 'feed' | 'touch' | 'signal'
  actor_name: string
  metadata: Record<string, unknown>
  created_at: string
}

const EVENT_EMOJI: Record<string, string> = {
  feed: '🥣',
  touch: '🫳',
  signal: '💕',
}

export default function TraceStream({ coupleId }: { coupleId: string }) {
  const t = useTranslations('pet')
  const [events, setEvents] = useState<TraceEvent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClientComponentClient()
    // Fetch couple's events via secure RLS — only partner events visible
    supabase
      .from('events')
      .select('id, event_type, metadata, created_at, profiles!events_actor_id_fkey(display_name)')
      .eq('couple_id', coupleId)
      .order('created_at', { ascending: false })
      .limit(20)
      .then(({ data }) => {
        if (data) {
          setEvents(
            data.map((e: Record<string, unknown>) => ({
              id: e.id as string,
              event_type: e.event_type as TraceEvent['event_type'],
              actor_name: ((e.profiles as Record<string, string> | null)?.display_name ?? 'Someone'),
              metadata: e.metadata as Record<string, unknown>,
              created_at: e.created_at as string,
            }))
          )
        }
        setLoading(false)
      })

    trackGa4Event('trace_view', { has_partner: !!coupleId })
  }, [coupleId])

  if (loading) return <div className="animate-pulse h-32 rounded-xl bg-zinc-800/40" />

  if (events.length === 0) {
    return (
      <section aria-label="Partner trace" className="mt-6 rounded-2xl border border-zinc-700/40 bg-zinc-900/40 p-5">
        <p className="text-sm text-zinc-400">{t('traceEmpty')}</p>
      </section>
    )
  }

  return (
    <section aria-label="Partner trace" className="mt-6 rounded-2xl border border-zinc-700/40 bg-zinc-900/40 p-5">
      <h3 className="mb-3 text-sm font-semibold text-zinc-300">{t('traceTitle')}</h3>
      <ul className="space-y-2">
        {events.map((e) => (
          <li key={e.id} className="flex items-center gap-2 text-sm text-zinc-400">
            <span aria-hidden="true">{EVENT_EMOJI[e.event_type]}</span>
            <span className="text-zinc-200">{e.actor_name}</span>
            <span>·</span>
            <time dateTime={e.created_at} className="text-zinc-500">
              {new Date(e.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </time>
          </li>
        ))}
      </ul>
    </section>
  )
}
