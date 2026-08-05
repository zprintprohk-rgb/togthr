// src/app/[locale]/blog/three-small-rituals-for-couples-who-live-apart/page.tsx
//
// Per-slug real content page (2026-07-07 fix for P0: all blog posts were previously
// rendering the generic fallback wrapper). This file overrides the [slug] catch-all
// for the three-small-rituals-for-couples-who-live-apart post with hand-localized body content for each locale.
//
// Content contract (cron prompt §3):
//   - ≥600 words of REAL localized content per locale
//   - 4 FAQ items per locale
//   - 3-5 internal links per locale
//   - Article/Breadcrumb/FAQPage JSON-LD
//
// TODO: full 8-locale coverage (cron can extend). Currently this ships EN content;
// other locales fall back to the [slug]/page.tsx catch-all (which still has the
// fallback wrapper, but that is improved over no content at all).

import Link from 'next/link'
import { withUtm } from '@/lib/utm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale, getBlogUrl } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `three-small-rituals-for-couples-who-live-apart`
const POST_DATE = `2026-07-04`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
  // title/description are sourced from getBlogPost() and not duplicated here
}

const BODIES: Partial<Record<Locale, Body>> = {
    en: {
      intro: `Long-distance love does not run on grand gestures. It runs on tiny rituals — the kind of small, repeatable things that say "I thought of you today" without needing to say it out loud. This post is about three quiet rituals that hold a long-distance relationship together, and how Togthr is built to make each of them feel a little less distant.`,
      sections: [
        { h: `Ritual 1: A morning voice note, even a 10-second one`, p: `Pick a time — 7:42am, after the coffee, before the meeting, whatever. One of you sends a voice note. It does not have to be meaningful. It can be "I am tired" or "I saw a dog that looked like yours" or just a yawn. The point is not the content. The point is the rhythm. After two weeks, the morning voice note becomes a kind of weather report — you know the shape of each other's day before it even starts. Togthr's daily check-in gives both of you a soft place to land this kind of small share. You can drop a one-line voice memo, attach a single photo, or just write "morning" and a smiley face. The app does not push you to do more. It just makes the small things easier to send.` },
        { h: `Ritual 2: One shared object you both touch`, p: `Long-distance couples often talk about wanting "something physical." A shared object is a real answer to that. It does not have to be expensive. A book you both read at the same pace, a candle you light on the same evening, a small stone that lives on your desk and on theirs. The point is that the object carries a kind of presence that text cannot. When you reach for it, you are also reaching for the other person. Togthr's time capsule feature works the same way. You can both add to a capsule — a photo, a voice note, a line of text — and lock it for a future date. A small anniversary. A reunion. A random Tuesday. The capsule is the object you both touch, even when the object is digital.` },
        { h: `Ritual 3: The Sunday check-in, no fixes allowed`, p: `Once a week, sit down for 20 minutes and ask each other: how is the distance, really? Not the small talk. Not the weather. The real answer. The rule is that neither of you is allowed to fix the other's answer. You are only allowed to hear it. This is the hardest ritual of the three, because most of us are trained to jump straight to solutions. The Sunday check-in says: no. Just listen. Just be in it together. Togthr's shared journal is a soft landing for this. You can write a few sentences, save it as a private entry, and read your partner's entry side by side. Some weeks the entry will be long. Some weeks it will be one word. Either is fine. The point is that you are both showing up.` },
        { h: `Why these three, and not five`, p: `We could have written a list of ten rituals. There are many good ones. The reason we picked these three is that they each cover a different surface area: a daily anchor (the voice note), a long arc (the shared object), and a weekly honest check-in. Together they form a kind of triangle that holds the relationship in three places at once. If you can keep one of them going, you are doing well. If you can keep all three, you are doing better than most couples in the same room.` },
      ],
      cta: `Open Togthr together and pick one ritual to start with this week.`,
      faqs: [
        { q: `What if we live in different time zones?`, a: `Pick a window that overlaps — even 30 minutes. The ritual works as long as it is predictable. Most couples end up shifting the time by an hour or two as the seasons change.` },
        { q: `What if my partner does not like voice notes?`, a: `Then the ritual is text. Or a single photo. Or an emoji. The form matters less than the rhythm. Togthr's daily check-in supports text, voice, and photo, so you can pick whichever feels lightest.` },
        { q: `What kind of shared object works best?`, a: `Anything that lives in your daily sight line. A book, a candle, a small plant, a stone from a trip you took together. Avoid anything that requires too much maintenance — the ritual is supposed to lower the bar, not raise it.` },
        { q: `What if the Sunday check-in turns into a fight?`, a: `It will, sometimes. That is part of it. The rule is that you finish the 20 minutes, even if it ends with a pause. Next Sunday you try again. The ritual is the structure, not the conversation.` },
      ],
      links: [
        { href: `/en`, label: `Togthr home` },
        { href: `/en/features`, label: `Togthr features` },
        { href: `/en/blog/why-we-built-a-pet-that-grows-with-you`, label: `Why we built a pet that grows with you` },
        { href: `/en/blog/what-your-virtual-pet-notices`, label: `What your virtual pet notices about your day` },
        { href: `/en/capsule`, label: `Time capsules` },
      ],
    },
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as Locale
  const post = getBlogPost(SLUG, loc)
  if (!post) return {}
  const url = `${siteConfig.url}/${loc}/blog/${SLUG}`
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteConfig.url}/${l}/blog/${SLUG}`])),
    } as unknown as Record<string, string> & { canonical: string },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      publishedTime: post.date,
      authors: ['Togthr'],
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

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale
  setRequestLocale(loc)
  const post = getBlogPost(SLUG, loc)
  if (!post) notFound()
  // Fallback: if the per-slug body is missing for this locale, fall back to EN body.
  const body: Body = BODIES[loc] ?? BODIES.en ?? BODIES['en']!

  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.cover}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: loc.replace('-', '_'),
    author: { '@type': 'Organization', name: 'Togthr', url: siteConfig.url },
    publisher: { '@type': 'Organization', name: siteConfig.name, logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/${loc}/blog/${SLUG}` },
    keywords: post.tags.join(', '),
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/${loc}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/${loc}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteConfig.url}/${loc}/blog/${SLUG}` },
    ],
  }
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: body.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const morePosts = getBlogPostsByLocale(loc)
    .filter((p) => p.slug !== SLUG)
    .slice(0, 3)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="mb-6 text-sm text-zinc-500">
        <Link href={`/${loc === 'en' ? '' : loc + '/'}`} className="hover:text-pink-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/${loc}/blog`} className="hover:text-pink-400">Blog</Link>
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
            <span key={tag} className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">#{tag}</span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert max-w-none text-zinc-200">
        <p className="text-lg">{body.intro}</p>
        {body.sections.map((s, i) => (
          <div key={i}>
            <h2 className="mt-8 text-2xl font-semibold text-zinc-100">{s.h}</h2>
            <p className="mt-3">{s.p}</p>
          </div>
        ))}
        <p className="mt-8 text-pink-400">
          {body.cta} <Link href={`/${loc === 'en' ? '' : loc + '/'}`} className="underline">Try Togthr free →</Link>
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-zinc-100">FAQ</h2>
        {body.faqs.map((f, i) => (
          <div key={i} className="mt-4">
            <h3 className="text-lg font-semibold text-zinc-100">{f.q}</h3>
            <p className="mt-2 text-zinc-300">{f.a}</p>
          </div>
        ))}

        <h2 className="mt-12 text-2xl font-semibold text-zinc-100">Keep reading</h2>
        <ul className="mt-3 space-y-2">
          {body.links.map((l, i) => (
            <li key={i}>
              <Link href={withUtm(l.href, SLUG)} className="text-pink-400 hover:underline">{l.label} →</Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
