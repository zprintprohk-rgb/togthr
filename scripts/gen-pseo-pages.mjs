// scripts/gen-pseo-pages.mjs
//
// One-shot generator: creates 32 page.tsx files under
// src/app/[locale]/p/{slug}/page.tsx using the bodies in
// src/lib/landing-pages-bodies.ts and the meta in src/lib/landing-pages.ts.
//
// Run: node scripts/gen-pseo-pages.mjs

import { writeFileSync, mkdirSync, existsSync, readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const REPO = join(__dirname, '..')

const landingSrc = readFileSync(join(REPO, 'src/lib/landing-pages.ts'), 'utf8')

function arr(name) {
  const re = new RegExp(`const ${name} = \\[([^\\]]+)\\]`, 'm')
  const m = landingSrc.match(re)
  if (!m) throw new Error(`could not locate ${name} in landing-pages.ts`)
  return m[1]
    .split(',')
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ''))
    .filter(Boolean)
}
function obj(name) {
  const re = new RegExp(`const ${name}: Record<string, string> = ({[\\s\\S]*?\\n})`)
  const m = landingSrc.match(re)
  if (!m) throw new Error(`could not locate ${name}`)
  return m[1]
}

const coupleSlugs = arr('coupleSlugs')
const selfSlugs = arr('selfSlugs')
const bffSlugs = arr('bffSlugs')
const tmgSlugs = arr('tmgSlugs')

function parseMap(block) {
  const m = {}
  const re = /'([a-z0-9-]+)':\s*'((?:\\'|[^'])*)'/g
  let mm
  while ((mm = re.exec(block)) !== null) {
    m[mm[1]] = mm[2].replace(/\\'/g, "'")
  }
  return m
}
const titlesBlock = obj('TITLES')
const descsBlock = obj('DESCRIPTIONS')
const TITLES = parseMap(titlesBlock)
const DESCS = parseMap(descsBlock)

const ALL_SLUGS = [
  ...coupleSlugs,
  ...selfSlugs,
  ...bffSlugs,
  ...tmgSlugs,
]

const GROUP_HERO = {
  couple: '/pets/scene-progress.png',
  self: '/pets/scene-rainy.png',
  bff: '/pets/scene-birthday.png',
  tmg: '/pets/anim-idle-1.png',
}
function heroFor(slug) {
  if (coupleSlugs.includes(slug)) return GROUP_HERO.couple
  if (selfSlugs.includes(slug)) return GROUP_HERO.self
  if (bffSlugs.includes(slug)) return GROUP_HERO.bff
  return GROUP_HERO.tmg
}

function escapeForTemplate(s) {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
}

function buildPage(slug) {
  const title = TITLES[slug] ?? slug
  const desc = DESCS[slug] ?? ''
  const hero = heroFor(slug)

  return `// src/app/[locale]/p/${slug}/page.tsx
//
// Phase 1 pSEO — programmatic landing page.
// Single-file 8-locale page (single Body used for all locales per task brief:
// "本批只做 EN 正文, 其余 7 locale 复用 EN 内容").
// CTA: "Start free in your browser" — Togthr is a pure web app, no native clients.

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getLandingBody } from '@/lib/landing-pages-bodies'
import { getLandingEntry, getLandingGroup, getLandingHero, getLandingUrl, SITE_URL } from '@/lib/landing-pages'
import { siteConfig } from '@/lib/seo'

const SLUG = \`${slug}\`
const HERO_IMG = \`${hero}\`
const META_TITLE = \`${escapeForTemplate(title)}\`
const META_DESC = \`${escapeForTemplate(desc)}\`

// Reused for all 8 locales (EN content only this batch). hreflang points
// each locale at itself.
const EN_BODY = getLandingBody(SLUG)
if (!EN_BODY) throw new Error(\`missing body for \${SLUG}\`)

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as Locale
  const url = getLandingUrl(SLUG, loc)
  const languages: Record<string, string> = {}
  for (const l of routing.locales) {
    languages[l] = getLandingUrl(SLUG, l)
  }
  languages['x-default'] = getLandingUrl(SLUG, 'en')
  return {
    title: META_TITLE,
    description: META_DESC,
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      type: 'article',
      title: META_TITLE,
      description: META_DESC,
      url,
      siteName: siteConfig.name,
      locale: loc.replace('-', '_'),
      images: [
        {
          url: \`\${siteConfig.url}\${siteConfig.ogImage}\`,
          width: 1200,
          height: 630,
          alt: META_TITLE,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: META_TITLE,
      description: META_DESC,
      images: [\`\${siteConfig.url}\${siteConfig.ogImage}\`],
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const loc = locale as Locale
  setRequestLocale(loc)

  const body = EN_BODY!
  const url = getLandingUrl(SLUG, loc)
  const homeHref = loc === 'en' ? \`/\` : \`/\${loc}/\`

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: body.h1,
    description: META_DESC,
    image: \`\${siteConfig.url}\${siteConfig.ogImage}\`,
    inLanguage: loc.replace('-', '_'),
    author: { '@type': 'Organization', name: siteConfig.name, url: siteConfig.url },
    publisher: { '@type': 'Organization', name: siteConfig.name, logo: { '@type': 'ImageObject', url: \`\${siteConfig.url}/logo.png\` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished: '2026-07-22',
    dateModified: '2026-07-22',
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: loc === 'en' ? siteConfig.url : \`\${siteConfig.url}/\${loc}\` },
      { '@type': 'ListItem', position: 2, name: META_TITLE, item: url },
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

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="mb-6 text-sm text-zinc-500">
        <Link href={homeHref} className="hover:text-pink-400">Home</Link>
      </nav>

      <header className="mb-10">
        <h1 className="text-4xl font-bold md:text-5xl">{body.h1}</h1>
        <p className="mt-4 text-lg text-zinc-300">{body.intro}</p>
      </header>

      <figure className="mb-10 overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/40">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={HERO_IMG} alt={META_TITLE} className="w-full" loading="lazy" decoding="async" />
        <figcaption className="px-4 py-3 text-sm text-zinc-400">{body.heroCopy}</figcaption>
      </figure>

      <section className="prose prose-invert max-w-none text-zinc-200">
        {body.sections.map((s, i) => (
          <div key={i}>
            <h2 className="mt-8 text-2xl font-semibold text-zinc-100">{s.h}</h2>
            <p className="mt-3">{s.p}</p>
          </div>
        ))}

        <h2 className="mt-12 text-2xl font-semibold text-zinc-100">FAQ</h2>
        {body.faqs.map((f, i) => (
          <div key={i} className="mt-4">
            <h3 className="text-lg font-semibold text-zinc-100">{f.q}</h3>
            <p className="mt-2 text-zinc-300">{f.a}</p>
          </div>
        ))}

        <p className="mt-10 text-pink-400">
          {body.cta}{' '}
          <Link href={homeHref} className="underline">
            Start free in your browser →
          </Link>
        </p>
      </section>
    </article>
  )
}
`
}

let written = 0
for (const slug of ALL_SLUGS) {
  const dir = join(REPO, 'src/app/[locale]/p', slug)
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  writeFileSync(join(dir, 'page.tsx'), buildPage(slug), 'utf8')
  written++
}
console.log(`Wrote ${written} page.tsx files under src/app/[locale]/p/`)
