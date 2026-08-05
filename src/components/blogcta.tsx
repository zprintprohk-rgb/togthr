'use client'

// src/components/BlogCta.tsx
//
// Shared CTA tracker for blog post pages.
// Wraps the final CTA text and fires GA4 cta_click event on click.
// Usage: <BlogCta slug={SLUG}>{body.cta}</BlogCta>

import { useCallback } from 'react'
import { trackCtaClick } from '@/lib/ga4-events'

export default function BlogCta({
  slug,
  children,
}: {
  slug: string
  children: React.ReactNode
}) {
  const handleClick = useCallback(() => {
    trackCtaClick('blog-cta', slug)
  }, [slug])

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  )
}
