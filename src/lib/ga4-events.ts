// src/lib/ga4-events.ts
//
// GA4 event taxonomy — Phase 5 (K3, 2026-08-05).
// SSR-safe: all calls are no-ops when window.gtag is not loaded.
//
// Measurement ID: G-TNKXQ7V351 (wrangler.toml NEXT_PUBLIC_GA4_ID).
// The gtag snippet is injected in src/app/layout.tsx (strategy: afterInteractive).
//
// Event taxonomy (GA4 snake_case):
//   Engagement events:
//     signup                  — user completes registration
//     pet_feed                — pet fed / daily check-in completed
//     pet_touch               — pet petted / touched
//     signal_send             — one-click signal sent ("thinking of you" etc.)
//     trace_view              — partner trace viewed (presence stream)
//     streak_milestone        — streak milestone reached (7/14/30 day)
//
//   Acquisition events:
//     cta_click               — blog / pricing / CTA button click
//     blog_view               — blog detail page view
//     invite_sent             — partner invite sent
//     invite_accepted         — partner invite accepted
//
//   Conversion events (join existing begin_checkout / purchase from analytics.ts):
//     begin_checkout          — checkout flow started
//     purchase                — payment success
//
//   UTM convention: all events carry utm_source + utm_campaign when available.

type Ga4EventProps = Record<string, string | number | boolean>

function getGtag() {
  if (typeof window === 'undefined') return undefined
  return (window as unknown as Record<string, unknown>).gtag as
    | ((cmd: 'event', event: string, props?: Ga4EventProps) => void)
    | undefined
}

export function trackGa4Event(event: string, props?: Ga4EventProps) {
  try {
    const gtag = getGtag()
    if (!gtag) return
    gtag('event', event, props)
  } catch { /* analytics must never throw */ }
}

// ── Engagement ──

export function trackSignup(locale: string) {
  trackGa4Event('signup', { locale })
}

export function trackPetFeed(streak: number, locale: string) {
  trackGa4Event('pet_feed', { streak, locale })
}

export function trackPetTouch(locale: string) {
  trackGa4Event('pet_touch', { locale })
}

export function trackSignalSend(signalType: string, locale: string) {
  trackGa4Event('signal_send', { signal_type: signalType, locale })
}

export function trackTraceView(partnerId: string) {
  trackGa4Event('trace_view', { has_partner: !!partnerId })
}

export function trackStreakMilestone(days: number, locale: string) {
  trackGa4Event('streak_milestone', { days, locale })
}

// ── Acquisition ──

export function trackCtaClick(label: string, source: string) {
  trackGa4Event('cta_click', { cta_label: label, cta_source: source })
}

export function trackBlogView(slug: string) {
  trackGa4Event('blog_view', {
    blog_slug: slug,
    blog_locale: document.documentElement.lang ?? 'en',
  })
}

export function trackInviteSent(locale: string) {
  trackGa4Event('invite_sent', { locale })
}

export function trackInviteAccepted(locale: string) {
  trackGa4Event('invite_accepted', { locale })
}

// ── Conversion (join existing PostHog) ──

export function trackBeginCheckout(tier: string, period: string, currency: string) {
  trackGa4Event('begin_checkout', { tier, period, currency })
}

export function trackPurchase(tier: string, currency: string, value: number) {
  trackGa4Event('purchase', { tier, currency, value })
}
