'use client'

/**
 * ForPageClient — Renders one of the 4 relationship-mode pages
 * (for-couples / for-besties / for-family / for-self) for one of 8 locales.
 *
 * Server-side page.tsx (above) reads the per-locale entry from
 * src/data/for-pages.ts and passes everything down. This component is a
 * thin renderer: it does the JSON-LD, the breadcrumb, the H1, the intro,
 * the 4 body sections, the 4 FAQ items, the 3-5 internal links, and the
 * closing CTA. It carries `data-dark-root` on the <article> root so the
 * EXT_GUARD_SCRIPT can defend it against browser color-tampering.
 */

import Link from 'next/link'
import { routing, type Locale } from '@/i18n/routing'
import type { ForEntry, ForSlug } from '@/data/for-pages'

type Props = {
  locale: Locale
  slug: ForSlug
  entry: ForEntry
  label: string
  url: string
  articleLd: Record<string, unknown>
  breadcrumbLd: Record<string, unknown>
  faqLd: Record<string, unknown>
}

const HOME_LABELS: Record<Locale, string> = {
  en: 'Home',
  'zh-cn': '首页',
  'zh-tw': '首頁',
  ja: 'ホーム',
  ko: '홈',
  de: 'Startseite',
  fr: 'Accueil',
  es: 'Inicio',
}

const FAQ_HEADING: Record<Locale, string> = {
  en: 'Frequently Asked Questions',
  'zh-cn': '常见问题',
  'zh-tw': '常見問題',
  ja: 'よくある質問',
  ko: '자주 묻는 질문',
  de: 'Häufig gestellte Fragen',
  fr: 'Questions fréquentes',
  es: 'Preguntas frecuentes',
}

const RELATED_HEADING: Record<Locale, string> = {
  en: 'Keep exploring',
  'zh-cn': '继续看看',
  'zh-tw': '繼續看看',
  ja: 'もっと探す',
  ko: '더 둘러보기',
  de: 'Weiter erkunden',
  fr: 'Continuer à explorer',
  es: 'Sigue explorando',
}

// Mode-tinted accent colour (rose for couples, amber for besties,
// emerald for family, indigo for self). Used on the H1 gradient and
// the section divider lines. Distinct enough that the four pages
// look visibly different at a glance.
const MODE_ACCENT: Record<ForSlug, { from: string; via: string; to: string }> = {
  'for-couples': { from: 'from-rose-200', via: 'via-pink-200', to: 'to-fuchsia-200' },
  'for-besties': { from: 'from-amber-200', via: 'via-orange-200', to: 'to-yellow-200' },
  'for-family':  { from: 'from-emerald-200', via: 'via-teal-200', to: 'to-cyan-200' },
  'for-self':    { from: 'from-indigo-200', via: 'via-violet-200', to: 'to-purple-200' },
}

export function ForPageClient({
  locale,
  slug,
  entry,
  label,
  url,
  articleLd,
  breadcrumbLd,
  faqLd,
}: Props) {
  const homeLabel = HOME_LABELS[locale]
  const faqHeading = FAQ_HEADING[locale]
  const relatedHeading = RELATED_HEADING[locale]
  const accent = MODE_ACCENT[slug]

  // Sibling mode pages in the same locale — a small "other modes" footer
  const otherSlugs = (Object.keys(MODE_ACCENT) as ForSlug[]).filter((s) => s !== slug)

  return (
    <article
      data-dark-root
      className="relative mx-auto max-w-3xl px-4 py-12 text-zinc-100"
    >
      {/* JSON-LD: Article + BreadcrumbList + FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-zinc-500" aria-label="Breadcrumb">
        <Link
          href={locale === 'en' ? '/' : `/${locale}/`}
          className="hover:text-pink-400 transition-colors"
        >
          {homeLabel}
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={url}
          className="hover:text-pink-400 transition-colors"
        >
          {label}
        </Link>
      </nav>

      {/* Header */}
      <header className="mb-10">
        <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-200/80">
          ✦ Togthr · {label} ✦
        </div>
        <h1
          className={`bg-linear-to-r ${accent.from} ${accent.via} ${accent.to} bg-clip-text text-3xl font-bold tracking-tight text-transparent sm:text-4xl md:text-5xl`}
        >
          {entry.h1}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-zinc-300/90">
          {entry.description}
        </p>
      </header>

      {/* Body */}
      <div className="prose prose-invert max-w-none text-zinc-200">
        <p className="text-lg leading-relaxed text-zinc-100">{entry.intro}</p>

        {entry.sections.map((s, i) => (
          <section key={i} className="mt-10">
            <h2 className="text-2xl font-semibold text-zinc-100 sm:text-3xl">
              {s.h}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-zinc-300">
              {s.p}
            </p>
          </section>
        ))}

        {/* Closing CTA */}
        <p className="mt-12 rounded-2xl border border-pink-500/20 bg-pink-500/5 p-5 text-base leading-relaxed text-pink-100">
          {entry.cta}{' '}
          <Link
            href={locale === 'en' ? '/' : `/${locale}/`}
            className="font-semibold text-pink-300 underline hover:text-pink-200"
          >
            {locale === 'en'
              ? 'Try Togthr free →'
              : locale === 'ja'
              ? 'Togthr を無料で試す →'
              : locale === 'ko'
              ? 'Togthr 무료로 사용해 보기 →'
              : locale === 'de'
              ? 'Togthr kostenlos testen →'
              : locale === 'fr'
              ? 'Essayer Togthr gratuitement →'
              : locale === 'es'
              ? 'Probar Togthr gratis →'
              : locale === 'zh-tw'
              ? '免費試用 Togthr →'
              : '免费试用 Togthr →'}
          </Link>
        </p>

        {/* FAQ */}
        <h2 className="mt-14 text-2xl font-semibold text-zinc-100 sm:text-3xl">
          {faqHeading}
        </h2>
        <div className="mt-4 space-y-6">
          {entry.faqs.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
            >
              <h3 className="text-lg font-semibold text-zinc-100">
                {f.q}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-zinc-300">
                {f.a}
              </p>
            </div>
          ))}
        </div>

        {/* Internal links */}
        <h2 className="mt-14 text-2xl font-semibold text-zinc-100 sm:text-3xl">
          {relatedHeading}
        </h2>
        <ul className="mt-4 space-y-2">
          {entry.links.map((l, i) => (
            <li key={i}>
              <Link
                href={l.href}
                className="text-pink-400 hover:text-pink-300 hover:underline"
              >
                {l.label} →
              </Link>
            </li>
          ))}
        </ul>

        {/* Sibling mode pages (cross-link to the other 3 modes in the same locale) */}
        <h2 className="mt-14 text-xl font-semibold text-zinc-200">
          {locale === 'en'
            ? 'Other modes'
            : locale === 'zh-cn'
            ? '其他模式'
            : locale === 'zh-tw'
            ? '其他模式'
            : locale === 'ja'
            ? '他のモード'
            : locale === 'ko'
            ? '다른 모드'
            : locale === 'de'
            ? 'Weitere Modi'
            : locale === 'fr'
            ? 'Autres modes'
            : 'Otros modos'}
        </h2>
        <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
          {otherSlugs.map((other) => {
            const modeLabels: Record<ForSlug, Record<Locale, string>> = {
              'for-couples': { en: 'For Couples', 'zh-cn': '情侣版', 'zh-tw': '情侶版', ja: 'カップル版', ko: '커플 버전', de: 'Für Paare', fr: 'Pour les couples', es: 'Para Parejas' },
              'for-besties': { en: 'For Best Friends', 'zh-cn': '闺蜜/兄弟版', 'zh-tw': '閨蜜/兄弟版', ja: '親友版', ko: '베프 버전', de: 'Für Beste Freunde', fr: 'Pour les meilleurs amis', es: 'Para Mejores Amigos' },
              'for-family':  { en: 'For Family', 'zh-cn': '家人版', 'zh-tw': '家人版', ja: '家族版', ko: '가족 버전', de: 'Für die Familie', fr: 'Pour la famille', es: 'Para la Familia' },
              'for-self':    { en: 'For Yourself', 'zh-cn': '给自己', 'zh-tw': '給自己', ja: 'じぶんのため', ko: '자신을 위한', de: 'Für dich selbst', fr: 'Pour vous-même', es: 'Para ti mismo' },
            }
            return (
              <li key={other}>
                <Link
                  href={`/${locale}/for/${other}`}
                  className="block rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-zinc-200 hover:border-pink-400/30 hover:bg-pink-500/10 transition-colors"
                >
                  {modeLabels[other][locale]}
                  <span className="ml-1 text-pink-300">→</span>
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Locale switcher (subtle, for SEO + cross-locale indexing) */}
        <h2 className="mt-12 text-base font-semibold uppercase tracking-wider text-zinc-500">
          {locale === 'en'
            ? 'Read in other languages'
            : locale === 'zh-cn'
            ? '其他语言版本'
            : locale === 'zh-tw'
            ? '其他語言版本'
            : locale === 'ja'
            ? '他の言語で読む'
            : locale === 'ko'
            ? '다른 언어로 읽기'
            : locale === 'de'
            ? 'In anderen Sprachen lesen'
            : locale === 'fr'
            ? 'Lire dans d\'autres langues'
            : 'Leer en otros idiomas'}
        </h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {routing.locales.map((l) => (
            <li key={l}>
              <Link
                href={`/${l}/for/${slug}`}
                className={`rounded-full px-3 py-1 text-xs transition-colors ${
                  l === locale
                    ? 'bg-pink-500/20 text-pink-200 border border-pink-400/30'
                    : 'bg-zinc-800/60 text-zinc-300 border border-zinc-700 hover:bg-zinc-700/60'
                }`}
                aria-current={l === locale ? 'true' : undefined}
              >
                {l.toUpperCase()}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-12 text-xs text-zinc-500">
          <Link
            href={locale === 'en' ? '/' : `/${locale}/`}
            className="hover:text-pink-300"
          >
            ← {homeLabel}
          </Link>
        </p>
      </div>
    </article>
  )
}
