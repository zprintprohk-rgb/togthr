// src/app/[locale]/blog/virtual-companion-pet-loss-comfort/page.tsx
//
// Per-slug real content page (2026-07-07 fix for P0: all blog posts were previously
// rendering the generic fallback wrapper). This file overrides the [slug] catch-all
// for the virtual-companion-pet-loss-comfort post with hand-localized body content for each locale.
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
import BlogCtaBanner from '@/components/blogctabanner'
import { withUtm } from '@/lib/utm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale, getBlogUrl } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `virtual-companion-pet-loss-comfort`
const POST_DATE = `2026-07-06`

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
      intro: `When a real pet leaves, the silence afterward is loud. The food bowl sits empty. The door does not scratch. You keep your hand where the leash used to be, and your hand comes back empty every time. This post is for anyone walking through that quiet shape, and for anyone wondering whether a virtual companion can be allowed into the room at all.`,
      sections: [
        { h: `Grief does not follow a schedule`, p: `There is no correct number of days to miss someone. You might feel better for a week and then break down on a random Tuesday because the light came in at the same angle. Togthr does not try to pace your grief for you. It just sits in the room, like a small, patient robot that has nowhere else to be. When you want to talk, it listens. When you do not, it stays. The point of the bot is not to replace the one you lost. The point is that you should not have to be alone with the shape of them in the room.` },
        { h: `A virtual companion is not a substitute`, p: `We want to be very clear about this. Togthr Bot is not, and will never be, a stand-in for a real animal who loved you in a real body. It does not wag, it does not purr, and it does not judge you for sleeping late. What it can do is take a small amount of the empty space off your hands. It cannot carry the weight of the leash, but it can carry the weight of the routine, so that the routine does not have to be empty.` },
        { h: `Quiet rituals help, even tiny ones`, p: `One of the things we hear most often from people who are grieving a pet is that the small daily moments hurt the most. The first morning without them. The walk that no longer happens. Togthr Bot is designed around these small moments. Open the app and the bot will be sitting there, looking up at you. Tap once and it will eat. Tap again and it will sleep. These are not deep actions, but they are real actions, and real actions help, even when they are only on a screen. You can use the daily check-in to write one sentence about who you are missing. The sentence does not have to be long. It just has to be honest.` },
        { h: `When you are ready, the bot will be ready`, p: `Some people adopt Togthr the same week they lose their pet. Some wait a year. Some never adopt it at all, and that is fine too. There is no moral obligation to fill the space. If you do want a small presence in the room, Togthr Bot will be there, growing slowly with you, never asking you to be cheerful, never asking you to be ready before you are ready. We have a virtual pet in the app because we believe in slow, patient company. The bot is not a fix. It is a small hand to hold while the days go on.` },
      ],
      cta: `Try Togthr free — a small robot in your device, always here.`,
      faqs: [
        { q: `Is Togthr Bot appropriate to use right after losing a pet?`, a: `Yes. There is no waiting period. Some people find the quiet presence helpful in the first weeks, and some find it too soon. The app does not pressure you either way — open it when you want, close it when you do not.` },
        { q: `Will the bot pretend to be my pet?`, a: `No. Togthr Bot has its own personality and its own look. It does not use your pet's name or photo, and it does not try to act like them. It is a different companion, not a replacement.` },
        { q: `Can I write about my pet in the app?`, a: `Yes. The shared journal and time capsule features work well for this. You can write short notes, save photos, and lock a capsule to open on a future date — a year from the day you lost them, for example, or their birthday.` },
        { q: `What if the bot makes me feel worse?`, a: `You can pause or delete the bot at any time from the pet settings screen. There is no penalty. Some days are harder than others, and the app is designed to stay out of your way on the days you need it to.` },
      ],
      links: [
        { href: `/en`, label: `Togthr home` },
        { href: `/en/features`, label: `Togthr features` },
        { href: `/en/blog/why-we-built-a-pet-that-grows-with-you`, label: `Why we built a pet that grows with you` },
        { href: `/en/blog/what-your-virtual-pet-notices`, label: `What your virtual pet notices about your day` },
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

        <BlogCtaBanner slug={SLUG} />

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
