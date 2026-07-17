'use client'

/**
 * AuthEventTracker — fires `login_success` after a successful password login.
 *
 * The signIn server action (src/lib/auth-actions.ts) redirects to
 * `/{locale}/dashboard?login=success` on success. Server-action redirects
 * give the submitting form no success signal, so this mounted-once tracker
 * (rendered from the locale layout) detects the marker, identifies the
 * Supabase user, fires the event, and removes the marker from the URL so
 * refreshes / back-navigation don't double-fire.
 *
 * Renders nothing.
 */

import { useEffect } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import { identifyUser, track } from '@/lib/analytics'

export function AuthEventTracker() {
  useEffect(() => {
    let marked = false
    try {
      marked = new URLSearchParams(window.location.search).get('login') === 'success'
    } catch {
      return
    }
    if (!marked) return

    // Clean the marker immediately so it can only fire once.
    try {
      const url = new URL(window.location.href)
      url.searchParams.delete('login')
      window.history.replaceState(null, '', url.pathname + url.search + url.hash)
    } catch {
      // noop
    }

    ;(async () => {
      // Identify first so the event is attributed to the user.
      // NOTE: uses @supabase/ssr directly — @/lib/supabase imports
      // next/headers and therefore cannot be pulled into a client bundle.
      try {
        const supabase = createBrowserClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        )
        const { data } = await supabase.auth.getUser()
        if (data.user?.id) identifyUser(data.user.id)
      } catch {
        // session lookup unavailable — still record the login
      }
      track('login_success')
    })()
  }, [])

  return null
}
