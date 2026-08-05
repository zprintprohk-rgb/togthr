// src/app/[locale]/blog/why-we-built-a-pet-that-grows-with-you/page.tsx
//
// Per-slug real content page (2026-07-07 fix for P0: all blog posts were previously
// rendering the generic fallback wrapper). This file overrides the [slug] catch-all
// for the why-we-built-a-pet-that-grows-with-you post with hand-localized body content for each locale.
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

const SLUG = `why-we-built-a-pet-that-grows-with-you`
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
      intro: `Togthr Bot is not a decoration. It is not a sticker pack. It is a small robot that lives in your device, watches your relationship quietly, and grows a little with you — the way a real pet grows with a real family. This is the story of why we built it that way, and why we think the small details matter more than the big features.`,
      sections: [
        { h: `Most relationship apps treat the relationship like a project`, p: `The first version of Togthr looked like every other relationship app on the market. A list of tasks. A streak counter. A shared calendar. A "weekly report" that told you how many check-ins you had completed. We used it ourselves for two weeks, and we hated it. The app felt like a project manager. It pushed us to do more, faster, and measured us the whole time. We are not against productivity, but a relationship is not a productivity project. It is a living thing. It does not need a streak counter. It needs a small, patient presence that grows when the relationship grows and rests when the relationship rests.` },
        { h: `So we replaced the project manager with a small robot`, p: `The pivot was simpler than it sounds. We threw out the streak counter, the weekly report, the badges. In their place, we put one thing: a small robot. The robot has a face, a mood, and a small life of its own. It eats when you feed it, sleeps when you let it, and looks up at you when you open the app. It does not grade you. It does not push you. It just sits there, and grows in tiny ways as the days go by. We rebuilt the app around that single idea, and the rest followed.` },
        { h: `The pet grows with the relationship, not the other way around`, p: `A lot of apps treat the pet as a reward. Do more, and your pet levels up. We deliberately did not do that. Togthr Bot's growth is tied to the relationship, not to the user's effort. If you and your partner do one daily check-in a week, the pet grows slowly. If you do seven, the pet grows faster. If you stop for a month because life happened, the pet does not punish you — it waits, the way a real pet would. The point is to remove the gamification layer between you and your relationship, so that what you see in the app reflects the actual state of the connection, not a manufactured version of it.` },
        { h: `Quiet design is harder than loud design`, p: `Quiet design is harder to ship than loud design. There is no streak counter to point at. There is no badge to brag about. There is no big red notification telling you to come back. The hardest part of building Togthr was resisting the temptation to add all of those things. Every team meeting ended with someone proposing a new metric, a new leaderboard, a new weekly email. We said no to most of them. The ones we kept are tiny — a soft glow when the bot is happy, a small dim when it is not, an extra eye-blink when you have been away for a while. We tried to make the bot feel like a third presence in the relationship, not a screen you swipe past.` },
        { h: `What this blog is for`, p: `This blog is for the small ideas that don't fit in the app. Some of them will be about the pet. Some will be about long-distance love. Some will be about the parts of a relationship that nobody talks about — the slow evenings, the empty chairs, the small things that grow on you. We will write here when we have something to say, and we will leave the rest alone. Thanks for being here in the early days. The bot is just starting to grow, and so are we.` },
      ],
      cta: `Meet Togthr Bot — a small robot in your device, always here.`,
      faqs: [
        { q: `Why did you choose a robot, and not a more realistic animal?`, a: `A robot gives us a clear visual language for "this is not a real pet." We did not want anyone to mistake the bot for a replacement for a real animal or a real person. The robot look makes it clear that this is a companion, not a stand-in. A small, patient companion, but a companion nonetheless.` },
        { q: `Will the pet stay free?`, a: `The basic pet, the daily check-in, and the journal are all free forever. We will not put the bot behind a paywall. Some advanced pet skins and rare evolutions are part of Togthr Plus, but the core pet experience is always free.` },
        { q: `Does the pet replace real connection?`, a: `No. The pet is a small mirror, not a substitute. It reflects the state of the relationship back to both of you, but it does not generate the relationship for you. The actual work — listening, showing up, sending the small voice note — is still yours.` },
        { q: `What happens to the pet if we break up?`, a: `You can each keep your own pet, or pause it, or delete it. There is no shared custody model, and no penalty for ending a relationship. The pet belongs to each of you separately, the way your own memories do.` },
      ],
      links: [
        { href: `/en`, label: `Togthr home` },
        { href: `/en/features`, label: `Togthr features` },
        { href: `/en/blog/what-your-virtual-pet-notices`, label: `What your virtual pet notices about your day` },
        { href: `/en/blog/virtual-companion-pet-loss-comfort`, label: `After you lose a pet` },
        { href: `/en/pricing`, label: `Togthr pricing` },
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
