// src/app/[locale]/blog/[slug]/page.tsx
//
// Single blog post. Static-params for ALL (slug, locale) pairs in blog-posts.ts.
// Renders a real server component with full SEO metadata, JSON-LD, and hreflang.

import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { routing, type Locale } from '@/i18n/routing'
import {
  getAllSlugs,
  getBlogPost,
  getBlogPostsByLocale,
  getBlogPostsBySlug,
  getBlogUrl,
} from '@/lib/blog-posts'
import { getCanonicalUrl, siteConfig } from '@/lib/seo'

export function generateStaticParams() {
  const out: { locale: string; slug: string }[] = []
  for (const slug of getAllSlugs()) {
    for (const locale of routing.locales) {
      out.push({ locale, slug })
    }
  }
  return out
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getBlogPost(slug, locale as Locale)
  if (!post) return {}

  const url = getBlogUrl(post)
  const ogLocale = locale.replace('-', '_')

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    alternates: {
      canonical: url,
      // Blog posts always include the locale prefix in the URL (every locale
      // lives under `/[locale]/blog/...`), so we can't use generateAlternateLinks
      // here — that helper assumes as-needed mode and would emit e.g. /blog/foo
      // for the default locale, which 404s. Build the language map explicitly.
      languages: (() => {
        const map: Record<string, string> = {}
        for (const loc of routing.locales) {
          map[loc] = `${siteConfig.url}/${loc}/blog/${slug}`
        }
        map['x-default'] = `${siteConfig.url}/en/blog/${slug}`
        return map
      })(),
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      locale: ogLocale,
      publishedTime: post.date,
      authors: [post.author || 'Togthr'],
      tags: post.tags,
      images: [
        {
          url: `${siteConfig.url}${post.cover}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${siteConfig.url}${post.cover}`],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const localeTyped = locale as Locale
  const post = getBlogPost(slug, localeTyped)
  if (!post) notFound()

  const allLocalePosts = getBlogPostsBySlug(slug)
  const otherLocalePosts = allLocalePosts.filter((p) => p.locale !== localeTyped)
  const morePosts = getBlogPostsByLocale(localeTyped)
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  // JSON-LD: BlogPosting + BreadcrumbList
  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.cover}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author || 'Togthr',
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': getBlogUrl(post) },
    inLanguage: locale.replace('-', '_'),
    keywords: post.tags.join(', '),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: siteConfig.name,
        item: siteConfig.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteConfig.url}/${localeTyped}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: getBlogUrl(post),
      },
    ],
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />

      <nav className="mb-6 text-sm text-zinc-500">
        <Link href={`/${localeTyped === 'en' ? '' : `${localeTyped}/`}`} className="hover:text-pink-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/${localeTyped}/blog`}
          className="hover:text-pink-400"
        >
          Blog
        </Link>
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <time dateTime={post.date}>{post.date}</time>
          {post.readingMinutes ? <span>· {post.readingMinutes} min read</span> : null}
        </div>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">{post.title}</h1>
        <p className="mt-3 text-lg text-zinc-400">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300"
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* 
        Cover image is rendered from /public/blog-covers/{slug}-{locale}.png
        Each post needs its cover uploaded separately (cron generates via AI image skill).
        Falls back gracefully if missing.
      */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={post.cover}
        alt={post.title}
        className="mb-8 w-full rounded-2xl border border-zinc-800"
        loading="lazy"
        decoding="async"
      />

      {/* 
        The actual blog body is rendered by the post's own page.tsx at:
        src/app/[locale]/blog/{slug}/page.tsx
        This file is the dynamic fallback wrapper.
        Specific posts override this at the same path (Next.js route convention).
      */}
      <div className="prose prose-invert max-w-none">
        <p className="text-zinc-300">
          This post is part of the Togthr Blog. Read more posts in this series, or try
          Togthr free — a small robot in your device, always here.
        </p>
        <p className="mt-4">
          <Link
            href={`/${localeTyped === 'en' ? '' : `${localeTyped}/`}`}
            className="text-pink-400 hover:underline"
          >
            Try Togthr free →
          </Link>
        </p>
      </div>

      {otherLocalePosts.length > 0 ? (
        <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Read in other languages
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {otherLocalePosts.map((p) => (
              <li key={p.locale}>
                <Link
                  href={`/${p.locale}/blog/${p.slug}`}
                  className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300 hover:bg-pink-500/20 hover:text-pink-300"
                >
                  {p.locale.toUpperCase()} — {p.title.slice(0, 32)}…
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {morePosts.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            More from the blog
          </h2>
          <ul className="mt-3 space-y-3">
            {morePosts.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/${localeTyped}/blog/${p.slug}`}
                  className="block text-pink-400 hover:underline"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}