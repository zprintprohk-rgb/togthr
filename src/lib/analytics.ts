/**
 * analytics — PostHog conversion-funnel tracking (additive, SSR-safe).
 *
 * PostHog is loaded via a snippet in src/app/[locale]/layout.tsx and exposed
 * as window.posthog. Every helper here is a safe no-op when:
 *   - running on the server (typeof window === 'undefined')
 *   - the PostHog snippet is absent / not yet loaded
 *   - anything throws (analytics must never break the app)
 *
 * Funnel events (snake_case):
 *   onboarding_start                        — onboarding page mount
 *   onboarding_complete  { mode }           — onboarding flow finished ('solo' | 'together')
 *   register_start                          — email/password register submit
 *   register_success                        — register succeeded (?success=check-email)
 *   register_oauth_click { provider }       — OAuth button click ('google' | 'github')
 *   login_success                           — password login succeeded (?login=success marker)
 *   checkout_start       { tier, period, amount, currency, provider }
 *                                           — paid-tier pricing CTA click
 *   store_checkout_start { sku, price, currency }
 *                                           — store buy button click, before /api/store/checkout
 *   purchase_success     { provider?, sku?, tier? }
 *                                           — payment return/success page view
 *   daily_checkin        { streak }         — daily feeding/check-in succeeded
 *   paywall_hint_shown   { pet_id }         — paywall hint bubble displayed
 *
 * PII policy: event properties never contain emails or names; the Supabase
 * user id is only passed to identifyUser(), never as an event property.
 */

type TrackProps = Record<string, string | number | boolean>

/** Fire a PostHog custom event. No-op on the server / without PostHog. */
export function track(event: string, props?: TrackProps): void {
  try {
    if (typeof window === 'undefined') return
    const posthog = (window as any).posthog
    if (!posthog || typeof posthog.capture !== 'function') return
    posthog.capture(event, props)
  } catch {
    // analytics must never throw
  }
}

/** Identify the current user by Supabase user id. Same safety guards as track(). */
export function identifyUser(id: string): void {
  try {
    if (typeof window === 'undefined') return
    if (!id) return
    const posthog = (window as any).posthog
    if (!posthog || typeof posthog.identify !== 'function') return
    posthog.identify(id)
  } catch {
    // analytics must never throw
  }
}
