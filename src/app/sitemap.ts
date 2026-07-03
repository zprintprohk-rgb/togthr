// src/app/sitemap.ts — Next.js MetadataRoute sitemap
// IMPORTANT: Use siteConfig.url (togthr.life) — do NOT hardcode Togthr.com
// This file is the fallback if next-sitemap is disabled; otherwise
// next-sitemap (postbuild) writes public/sitemap-0.xml which takes precedence.
import type { MetadataRoute } from 'next'
import { routing, type Locale } from '@/i18n/routing'
import { siteConfig } from '@/lib/seo'
import { blogPosts } from '@/lib/blog-posts'

const staticPages = [
  { path: '', changefreq: 'weekly' as const, priority: 1.0 },
  { path: '/pricing', changefreq: 'weekly' as const, priority: 0.9 },
  { path: '/faq', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/features', changefreq: 'monthly' as const, priority: 0.8 },
  { path: '/blog', changefreq: 'daily' as const, priority: 0.7 },
  { path: '/contact', changefreq: 'monthly' as const, priority: 0.6 },
  { path: '/community', changefreq: 'daily' as const, priority: 0.6 },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = []
  const base = siteConfig.url.replace(/\/$/, '')

  // Static pages × 8 locales
  for (const locale of routing.locales) {
    for (const page of staticPages) {
      const url = locale === routing.defaultLocale
        ? `${base}${page.path}`
        : `${base}/${locale}${page.path}`
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: page.changefreq,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              l === routing.defaultLocale
                ? `${base}${page.path}`
                : `${base}/${l}${page.path}`,
            ]),
          ),
        },
      })
    }
  }

  // Blog posts × their locales (dynamic from blog-posts.ts)
  for (const post of blogPosts) {
    const url = post.locale === routing.defaultLocale
      ? `${base}/blog/${post.slug}`
      : `${base}/${post.locale}/blog/${post.slug}`
    entries.push({
      url,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [
            l,
            l === routing.defaultLocale
              ? `${base}/blog/${post.slug}`
              : `${base}/${l}/blog/${post.slug}`,
          ]),
        ),
      },
    })
  }

  return entries
}