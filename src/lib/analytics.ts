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


// ── Day 3 (2026-08-09) GA4 事件埋点（与 PostHog 共存，SSR-safe） ──

type GtagEventProps = Record<string, string | number | boolean>

function getGtag() {
  if (typeof window === 'undefined') return undefined
  const w = window as unknown as Record<string, unknown>
  return w.gtag as ((cmd: 'event', event: string, props?: GtagEventProps) => void) | undefined
}

/** 通用 GA4 事件发送（绝不抛错、绝不阻塞主线程） */
export function trackEvent(event: string, props?: GtagEventProps) {
  try {
    const gtag = getGtag()
    if (!gtag) return
    gtag('event', event, props)
  } catch {
    /* analytics must never throw */
  }
}

/** 邮箱订阅表单提交成功 */
export function trackEmailSignup(source: 'couples' | 'solo' | 'landing' | 'build') {
  trackEvent('email_signup', { source })
}

/** /couples 和 /solo 页面加载 */
export function trackLandingView(page: 'couples' | 'solo', locale: string) {
  trackEvent('landing_view', { page, locale })
}

/** /build 页面加载 */
export function trackBuildStart(locale: string) {
  trackEvent('build_start', { locale })
}

/** /build 完成揭晓 */
export function trackBuildComplete(locale: string, steps: number) {
  trackEvent('build_complete', { locale, steps })
}

/** 喂食/拥抱/晚安按钮点击 */
export function trackCareAction(type: 'feed' | 'hug' | 'sleep', locale: string) {
  trackEvent('care_action', { type, locale })
}

/** 分享卡下载 */
export function trackShareClick(format: 'png' | 'jpeg') {
  trackEvent('share_click', { format })
}
