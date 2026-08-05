// src/lib/ga4-events.ts
//
// GA4 event helpers (additive to existing analytics.ts PostHog funnel).
// SSR-safe: all calls are no-ops when window.gtag is not loaded.
//
// Measurement ID: G-TNKXQ7V351 (wranger.toml NEXT_PUBLIC_GA4_ID).
// The gtag snippet is injected in src/app/layout.tsx (strategy: afterInteractive).
//
// Event naming convention (GA4 snake_case):
//   cta_click  — any blog / pricing / CTA link click
//   blog_view  — blog detail page view (tracked via page_view already, plus custom)

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

// Convenience
export function trackCtaClick(label: string, source: string) {
  trackGa4Event('cta_click', {
    cta_label: label,
    cta_source: source,
  })
}

export function trackBlogView(slug: string) {
  trackGa4Event('blog_view', {
    blog_slug: slug,
    blog_locale: document.documentElement.lang ?? 'en',
  })
}
