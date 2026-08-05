// src/lib/utm.ts
//
// UTM auto-append for blog → product page links.
// Every blog post auto-injects ?utm_source=blog&utm_campaign={slug}
// into any link that points to a product page (/, /pricing, /features, /p/, /daily, /pet, /journal).
// This closes the GA4 attribution loop (Phase 6 P0).

const PRODUCT_PATHS = ['/', '/pricing', '/features', '/daily', '/p/', '/pet', '/journal', '/capsule', '/chat']

export function withUtm(href: string, blogSlug: string): string {
  // Only append UTM to product-page links, not external or other blog posts
  const isInternalProduct = PRODUCT_PATHS.some((prefix) => href.startsWith(prefix))
  if (!isInternalProduct) return href

  const separator = href.includes('?') ? '&' : '?'
  return `${href}${separator}utm_source=blog&utm_campaign=${encodeURIComponent(blogSlug)}`
}
