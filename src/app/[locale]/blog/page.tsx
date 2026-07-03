// src/app/[locale]/blog/page.tsx
//
// Blog index — lists all posts for the current locale, newest first.
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import Link from 'next/link'
import { routing, type Locale } from '@/i18n/routing'
import { getCanonicalUrl, siteConfig } from '@/lib/seo'
import { getBlogPostsByLocale, getBlogUrl } from '@/lib/blog-posts'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })
  return {
    title: `Blog — ${t('siteName')}`,
    description:
      'Long-distance tips, virtual pet stories, and quiet ideas for couples, families, and anyone who wants a small companion that grows with them.',
    alternates: { canonical: getCanonicalUrl(locale as Locale, '/blog') },
    openGraph: {
      title: `Blog — ${t('siteName')}`,
      description:
        'Long-distance tips, virtual pet stories, and quiet ideas for couples, families, and anyone who wants a small companion that grows with them.',
      url: getCanonicalUrl(locale as Locale, '/blog'),
      siteName: siteConfig.name,
      locale: locale.replace('-', '_'),
      type: 'website',
      images: ['/og-image.png'],
    },
  }
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const localeTyped = locale as Locale
  const posts = getBlogPostsByLocale(localeTyped)
  const t = await getTranslations({ locale })

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 text-zinc-100">
      <header className="mb-10">
        <p className="text-sm font-semibold uppercase tracking-wider text-pink-400">
          Togthr Blog
        </p>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">
          Stories, tips, and small companions
        </h1>
        <p className="mt-3 text-lg text-zinc-400">
          Long-distance ideas, virtual pet moments, and quiet ways to stay connected —
          from the team behind Togthr.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="text-zinc-500">No posts yet. Come back tomorrow — we post daily.</p>
      ) : (
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={`${post.slug}-${post.locale}`}>
              <Link
                href={`/${localeTyped === 'en' ? '' : `${localeTyped}/`}blog/${post.slug}`}
                className="group block rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-pink-500/50 hover:bg-zinc-900/70"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <time dateTime={post.date}>{post.date}</time>
                  {post.readingMinutes ? <span>· {post.readingMinutes} min read</span> : null}
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-800 px-2 py-0.5 text-zinc-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <h2 className="mt-2 text-2xl font-semibold group-hover:text-pink-400">
                  {post.title}
                </h2>
                <p className="mt-2 text-zinc-400">{post.description}</p>
                <p className="mt-3 text-sm text-pink-400 group-hover:underline">
                  Read more →
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}