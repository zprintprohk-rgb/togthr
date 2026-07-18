// src/app/[locale]/blog/what-your-virtual-pet-notices/page.tsx
//
// Per-slug real content page (2026-07-07 fix for P0: all blog posts were previously
// rendering the generic fallback wrapper). This file overrides the [slug] catch-all
// for the what-your-virtual-pet-notices post with hand-localized body content for each locale.
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
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale, getBlogUrl } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `what-your-virtual-pet-notices`
const POST_DATE = `2026-07-05`

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
      intro: `Togthr Bot does not speak loudly. It sits in your device, looks up at you when you open the app, and goes about its small day — eating, sleeping, following you from one screen to the next. Most of the time you do not notice it noticing you. That is on purpose. This post is about the small things your virtual pet is actually paying attention to, even when you think it is just decoration.`,
      sections: [
        { h: `It notices when you open the app late`, p: `If you usually open Togthr around 8pm and one day you open it at 1am, the bot will not scold you. It will not even comment. But it will stay awake a little longer than usual, and the next morning it will sit closer to the edge of the screen, looking up at you with the same look a real cat gives you when it has been waiting by the door. It is a small adjustment, not a feature. We built it that way because we believe the bot should be a quiet witness, not a chatty roommate.` },
        { h: `It notices the days you skip`, p: `When you do not open the app for two or three days, the bot does not panic. Its hunger bar drops a little, its happiness drops a little, and when you come back it will not perform some big reunion animation. It will simply look up at you, the way a real pet does when you walk back in the door. That is the part most people do not expect. They expect the bot to gamify absence — to make you feel bad for skipping, to push you back into the app. We did not build it that way. The bot trusts you to come back. When you do, it is just there.` },
        { h: `It notices who you write to in the journal`, p: `The shared journal in Togthr is one of the places the bot spends the most time. It does not read your words, and it does not send you notifications about what you wrote. But it watches the rhythm — when you write, how long you write, whether the entries are getting shorter or longer, whether you write more on weekdays or weekends. Over time, its appearance changes in tiny ways, the way a real pet looks a little different after a long winter. We are not trying to profile you. We are trying to give the bot a personality that grows with you, instead of one that resets every time you close the app.` },
        { h: `It notices when you are together vs. apart`, p: `The daily check-in in Togthr asks a quiet question: is the other one with you today? The bot is listening. It does not need a clear answer, and it never asks you to justify your answer. But over time, it picks up whether you and your partner are usually together, usually apart, or moving between the two. Its mood changes accordingly. When you are both home for a long stretch, the bot glows a little warmer. When one of you has been away for a while, it dims just slightly. None of this is scientific. None of it is precise. All of it is meant to give the bot the feeling of being a third presence in the relationship, rather than a passive icon in a corner of the screen.` },
        { h: `It notices the small rituals you keep`, p: `Maybe you open Togthr every morning while the coffee brews. Maybe you write one line in the journal before bed. Maybe you only open it on Sundays. The bot learns the shape of these habits, and it shows up at those moments in a slightly different form. Not because we are training a model on your data, but because we think a small companion should feel familiar, not random. The point is that the bot feels like it knows you, even when you are sure it does not.` },
      ],
      cta: `Open Togthr and let the bot notice you, just a little.`,
      faqs: [
        { q: `Is the bot recording what I do?`, a: `No. The bot does not record your activity, log your keystrokes, or send your data anywhere. The small adjustments it makes happen locally on your device, and they are not detailed enough to identify you as an individual.` },
        { q: `How does the bot know my habits?`, a: `It uses the rhythm of your own opens, journal entries, and daily check-ins. There is no profile being built about who you are as a person. The bot only knows that you tend to open the app on Sunday evenings, or that you wrote a longer entry last Tuesday. It forgets details quickly and starts over if you reinstall.` },
        { q: `Can I turn off the pet personality?`, a: `Yes. From the pet settings screen you can switch to a neutral mode where the bot does not respond to your habits at all. Some people prefer that, and we support it.` },
        { q: `Does the bot tell my partner what it noticed?`, a: `No. The bot's observations stay between you and your device. Your partner sees the pet in their own app, and it learns their own patterns. There is no shared profile of either of you.` },
      ],
      links: [
        { href: `/en`, label: `Togthr home` },
        { href: `/en/features`, label: `Togthr features` },
        { href: `/en/blog/virtual-companion-pet-loss-comfort`, label: `After you lose a pet` },
        { href: `/en/blog/why-we-built-a-pet-that-grows-with-you`, label: `Why we built a pet that grows with you` },
        { href: `/en/pet`, label: `The virtual pet page` },
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
              <Link href={l.href} className="text-pink-400 hover:underline">{l.label} →</Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
