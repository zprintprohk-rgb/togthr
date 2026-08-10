// src/components/RelatedLinks.tsx
//
// CONTENT-03 internal-link network (K3 Batch B W2):
//   Every pSEO page gets a "Related" block with ≥6 internal links:
//     - same-group pSEO siblings  ≥3
//     - cross-group pSEO pages    ≥2
//     - related blog posts        ≥1
//   Shared component so all 26 pages render identically (one source of truth).
//
// Usage: <RelatedLinks slug={SLUG} locale={locale} />

import Link from 'next/link'
import { getLandingEntries, getLandingGroup } from '@/lib/landing-pages'
import { getBlogPostsBySlug } from '@/lib/blog-posts'
import type { Locale } from '@/i18n/routing'

// Blog post slugs relevant per landing group (hand-curated topic match).
// (S3 cleanup: couple/rituals groups removed 2026-08-11)
const BLOG_MAP: Record<string, string[]> = {
  self: [
    'quiet-companion-app-no-chat',
    'two-minute-daily-check-in-ai-companion',
    'the-smallest-ritual-you-will-actually-keep',
  ],
  bff: [
    'things-you-tell-your-virtual-pet',
    'the-smallest-ritual-you-will-actually-keep',
  ],
  tmg: [
    'tamagotchi-30th-anniversary-from-pocket-to-desktop',
    'tamagotchi-alternative-for-adults',
    'pixel-pet-like-tamagotchi',
    'best-virtual-pet-apps-2026',
  ],
  discovery: [
    'digital-pet-nostalgia-2026',
    'desktop-tamagotchi-windows',
    'tamagotchi-app-2026',
  ],
}

const FALLBACK_BLOG = 'why-we-built-a-pet-that-grows-with-you'

type RelatedItem = { href: string; label: string }

export default function RelatedLinks({ slug, locale }: { slug: string; locale: Locale }) {
  const entries = getLandingEntries()

  // 1. Same-group siblings (≥3, exclude self)
  const group = getLandingGroup(slug)
  const siblings = entries
    .filter((e) => e.group === group && e.slug !== slug)
    .slice(0, 3)

  // 2. Cross-group pages (≥2) — take one from each of two other groups
  const otherGroups = [...new Set(entries.map((e) => e.group))].filter((g) => g !== group)
  const cross: { href: string; label: string }[] = []
  for (const g of otherGroups) {
    if (cross.length >= 2) break
    const pick = entries.find((e) => e.group === g)
    if (pick) cross.push({ href: `/${locale}/p/${pick.slug}`, label: pick.title })
  }

  // 3. Related blog posts (≥1)
  const blogCandidates = BLOG_MAP[group] ?? [FALLBACK_BLOG]
  const blogItems: RelatedItem[] = []
  for (const b of blogCandidates) {
    if (blogItems.length >= 2) break
    const post = getBlogPostsBySlug(b)[0]
    if (post) blogItems.push({ href: `/${locale}/blog/${b}`, label: post.title })
  }
  if (blogItems.length === 0) {
    const fb = getBlogPostsBySlug(FALLBACK_BLOG)[0]
    if (fb) blogItems.push({ href: `/${locale}/blog/${FALLBACK_BLOG}`, label: fb.title })
  }

  const items: RelatedItem[] = [
    ...siblings.map((e) => ({ href: `/${locale}/p/${e.slug}`, label: e.title })),
    ...cross,
    ...blogItems,
  ]

  return (
    <section className="mt-12 rounded-2xl border border-zinc-700/40 bg-zinc-900/40 p-6" aria-label="Related">
      <h2 className="text-xl font-semibold text-zinc-50">Related</h2>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((it) => (
          <li key={it.href}>
            <Link
              href={it.href}
              className="text-pink-400/90 underline-offset-4 hover:text-pink-300 hover:underline"
            >
              {it.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
