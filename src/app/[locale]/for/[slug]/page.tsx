// src/app/[locale]/for/[slug]/page.tsx
//
// Phase 1 programmatic SEO — dynamic route for 4 relationship modes.
// /:locale/for/for-couples | for-besties | for-family | for-self
// All copy, FAQs, and links come from src/data/for-pages.ts (32 entries:
// 4 modes × 8 locales). All entries ship ≥600 words of real localized content.
//
// Renders:
//   - <article> root (defense marker data-dark-root inherited from <html>)
//   - JSON-LD: Article + BreadcrumbList + FAQPage (3 blocks per page)
//   - H1 with the relationship-mode wedge
//   - Full meta: title (50-60c), description (150-160c), og:*, canonical,
//     hreflang alternates for all 8 locales
//   - 4 FAQ items
//   - 3-5 internal links per page
//   - Locale-prefixed URLs only (every locale lives under /[locale]/for/...)

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { routing, type Locale } from '@/i18n/routing'
import { getCanonicalUrl, siteConfig } from '@/lib/seo'
import { FOR_PAGES, FOR_SLUGS, FOR_LABELS, type ForSlug } from '@/data/for-pages'
import { ForPageClient } from './ForPageClient'

// ─── Static params: 4 slugs × 8 locales = 32 pages ───────────────────
export function generateStaticParams() {
  const out: { locale: Locale; slug: ForSlug }[] = []
  for (const slug of FOR_SLUGS) {
    for (const locale of routing.locales) {
      out.push({ locale, slug })
    }
  }
  return out
}

// ─── Metadata: full SEO + OG + Twitter + hreflang ─────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const loc = locale as Locale

  if (!FOR_SLUGS.includes(slug as ForSlug)) {
    return {}
  }
  const s = slug as ForSlug
  const entry = FOR_PAGES[s][loc] ?? FOR_PAGES[s].en

  const canonical = getCanonicalUrl(loc, `/for/${s}`)
  const ogLocale = loc.replace('-', '_')

  // Per-page language map — every locale has its own URL under /[locale]/for/[slug]
  const languages: Record<string, string> = {}
  for (const l of routing.locales) {
    languages[l] = `${siteConfig.url}/${l}/for/${s}`
  }
  languages['x-default'] = `${siteConfig.url}/en/for/${s}`

  return {
    title: entry.title,
    description: entry.description,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      type: 'article',
      title: entry.title,
      description: entry.description,
      url: canonical,
      siteName: siteConfig.name,
      locale: ogLocale,
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: entry.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: entry.title,
      description: entry.description,
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
    },
  }
}

// ─── Page: render full content with JSON-LD ────────────────────────────
export default async function ForPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const loc = locale as Locale

  if (!FOR_SLUGS.includes(slug as ForSlug)) {
    notFound()
  }
  const s = slug as ForSlug
  const entry = FOR_PAGES[s][loc] ?? FOR_PAGES[s].en
  const label = FOR_LABELS[s][loc] ?? FOR_LABELS[s].en

  const url = `${siteConfig.url}/${loc}/for/${s}`
  const homeUrl = loc === 'en' ? siteConfig.url : `${siteConfig.url}/${loc}`

  // JSON-LD: Article
  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: entry.h1,
    description: entry.description,
    image: `${siteConfig.url}${siteConfig.ogImage}`,
    inLanguage: loc.replace('-', '_'),
    author: {
      '@type': 'Organization',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: '2026-07-22',
    dateModified: '2026-07-22',
  }

  // JSON-LD: BreadcrumbList
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: homeUrl },
      { '@type': 'ListItem', position: 2, name: label, item: url },
    ],
  }

  // JSON-LD: FAQPage
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: entry.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  return (
    <ForPageClient
      locale={loc}
      slug={s}
      entry={entry}
      label={label}
      url={url}
      articleLd={articleLd}
      breadcrumbLd={breadcrumbLd}
      faqLd={faqLd}
    />
  )
}
