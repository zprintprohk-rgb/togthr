// src/app/[locale]/blog/page.tsx
//
// Blog index — lists all published posts for the current locale.
// Driven by getBlogPostsByLocale() so adding posts in src/lib/blog-posts.ts
// automatically flows here + into the sitemap on next deploy.
//
// Why this exists (added 2026-07-05):
//   7/3 launch post + 7/4 + 7/5 daily posts were in src/lib/blog-posts.ts
//   and indexed by sitemap, but no UI surface exposed them. Users landed on
//   blog URLs only via direct link or search engine — invisible in nav.

import Link from 'next/link'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPostsByLocale, getBlogUrl } from '@/lib/blog-posts'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as Locale
  const isEn = loc === 'en'
  const titles: Record<Locale, string> = {
    en: 'Blog — Togthr',
    'zh-cn': '博客 — Togthr',
    'zh-tw': '博客 — Togthr',
    ja: 'ブログ — Togthr',
    ko: '블로그 — Togthr',
    de: 'Blog — Togthr',
    fr: 'Blog — Togthr',
    es: 'Blog — Togthr',
  }
  const descriptions: Record<Locale, string> = {
    en: 'Stories, rituals, and quiet ideas from the Togthr team — about long-distance love, virtual pets, AI companions, and the small habits that keep relationships growing.',
    'zh-cn': 'Togthr 团队的故事、仪式和小想法 — 关于异地恋、数字宠物、AI 陪伴,以及让关系持续生长的小习惯。',
    'zh-tw': 'Togthr 團隊的故事、儀式和小想法 — 關於遠距離戀愛、數位寵物、AI 陪伴,以及讓關係持續生長的小習慣。',
    ja: 'Togthr チームからの物語、儀式、静かなアイデア — 遠距離恋愛、バーチャルペット、AI コンパニオン、そして関係を育てる小さな習慣について。',
    ko: 'Togthr 팀의 이야기, 의식, 조용한 아이디어 — 장거리 연애, 가상 반려동물, AI 동반자, 그리고 관계를 키우는 작은 습관에 관하여.',
    de: 'Geschichten, Rituale und leise Ideen vom Togthr-Team — über Fernbeziehungen, virtuelle Haustiere, KI-Begleiter und die kleinen Gewohnheiten, die Beziehungen wachsen lassen.',
    fr: 'Histoires, rituels et idées silencieuses de l\u2019équipe Togthr — sur l\u2019amour à distance, les animaux virtuels, les compagnons IA et les petites habitudes qui font grandir les relations.',
    es: 'Historias, rituales e ideas silenciosas del equipo Togthr — sobre el amor a distancia, las mascotas virtuales, los acompañantes de IA y los pequeños hábitos que hacen crecer las relaciones.',
  }
  return {
    title: titles[loc] ?? titles.en,
    description: descriptions[loc] ?? descriptions.en,
    alternates: {
      canonical: isEn
        ? 'https://togthr.life/blog'
        : `https://togthr.life/${loc}/blog`,
    },
  }
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const loc = locale as Locale
  setRequestLocale(loc)

  const posts = getBlogPostsByLocale(loc)
  const isEn = loc === 'en'
  const homeHref = isEn ? '/' : `/${loc}`

  const eyebrow: Record<Locale, string> = {
    en: 'Stories & Rituals',
    'zh-cn': '故事与小仪式',
    'zh-tw': '故事與小儀式',
    ja: '物語と儀式',
    ko: '이야기와 의식',
    de: 'Geschichten & Rituale',
    fr: 'Histoires et rituels',
    es: 'Historias y rituales',
  }
  const pageTitle: Record<Locale, string> = {
    en: 'From the Togthr blog',
    'zh-cn': '来自 Togthr 博客',
    'zh-tw': '來自 Togthr 博客',
    ja: 'Togthr ブログより',
    ko: 'Togthr 블로그에서',
    de: 'Aus dem Togthr-Blog',
    fr: 'Depuis le blog Togthr',
    es: 'Desde el blog de Togthr',
  }
  const pageIntro: Record<Locale, string> = {
    en: 'Quiet ideas about long-distance love, virtual pets, AI companions, and the small habits that keep a relationship growing. New posts almost every day.',
    'zh-cn': '关于异地恋、数字宠物、AI 陪伴的安静想法,以及让关系持续生长的小习惯。几乎每天都有新内容。',
    'zh-tw': '關於遠距離戀愛、數位寵物、AI 陪伴的安靜想法,以及讓關係持續生長的小習慣。幾乎每天都有新內容。',
    ja: '遠距離恋愛、バーチャルペット、AI コンパニオン、そして関係を育てる小さな習慣についての静かなアイデア。ほぼ毎日新しい投稿を公開しています。',
    ko: '장거리 연애, 가상 반려동물, AI 동반자, 그리고 관계를 키우는 작은 습관에 대한 조용한 아이디어. 거의 매일 새로운 글을 올립니다.',
    de: 'Leise Ideen über Fernbeziehungen, virtuelle Haustiere, KI-Begleiter und die kleinen Gewohnheiten, die eine Beziehung wachsen lassen. Fast täglich neue Beiträge.',
    fr: 'Idées silencieuses sur l\u2019amour à distance, les animaux virtuels, les compagnons IA et les petites habitudes qui font grandir une relation. De nouveaux articles presque tous les jours.',
    es: 'Ideas silenciosas sobre el amor a distancia, las mascotas virtuales, los acompañantes de IA y los pequeños hábitos que hacen crecer una relación. Nuevas publicaciones casi a diario.',
  }
  const readMore: Record<Locale, string> = {
    en: 'Read post',
    'zh-cn': '阅读全文',
    'zh-tw': '閱讀全文',
    ja: '記事を読む',
    ko: '글 읽기',
    de: 'Beitrag lesen',
    fr: 'Lire l\u2019article',
    es: 'Leer artículo',
  }
  const minRead: Record<Locale, string> = {
    en: 'min read',
    'zh-cn': '分钟阅读',
    'zh-tw': '分鐘閱讀',
    ja: '分で読了',
    ko: '분 소요',
    de: 'Min. Lesedauer',
    fr: 'min de lecture',
    es: 'min de lectura',
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 text-zinc-100">
      {/* Breadcrumb JSON-LD for SEO consistency */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'Togthr Blog',
            url: isEn ? 'https://togthr.life/blog' : `https://togthr.life/${loc}/blog`,
            inLanguage: loc.replace('-', '_'),
            blogPost: posts.map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              url: getBlogUrl(p),
              datePublished: p.date,
              inLanguage: loc.replace('-', '_'),
            })),
          }),
        }}
      />

      <nav className="mb-6 text-sm text-zinc-500">
        <Link href={homeHref} className="hover:text-pink-400">
          Home
        </Link>
        <span className="mx-2">/</span>
        <span className="text-zinc-300">Blog</span>
      </nav>

      <header className="mb-12">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-400">
          ✦ {eyebrow[loc] ?? eyebrow.en} ✦
        </p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">{pageTitle[loc] ?? pageTitle.en}</h1>
        <p className="mt-4 max-w-2xl text-lg text-zinc-400">{pageIntro[loc] ?? pageIntro.en}</p>
      </header>

      <ul className="space-y-6">
        {posts.length === 0 ? (
          <li className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 text-zinc-400">
            No posts yet for this locale. Check back soon.
          </li>
        ) : (
          posts.map((p) => (
            <li key={p.slug}>
              <Link
                href={
                  isEn
                    ? `/blog/${p.slug}`
                    : `/${loc}/blog/${p.slug}`
                }
                className="group block rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6 transition hover:border-pink-500/60 hover:bg-zinc-900/70"
              >
                <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                  <time dateTime={p.date}>{p.date}</time>
                  {p.readingMinutes ? (
                    <>
                      <span>·</span>
                      <span>
                        {p.readingMinutes} {minRead[loc] ?? minRead.en}
                      </span>
                    </>
                  ) : null}
                </div>
                <h2 className="mt-2 text-2xl font-semibold text-zinc-100 group-hover:text-pink-300">
                  {p.title}
                </h2>
                <p className="mt-2 text-zinc-400">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <p className="mt-4 text-sm font-medium text-pink-400">
                  {readMore[loc] ?? readMore.en} →
                </p>
              </Link>
            </li>
          ))
        )}
      </ul>
    </article>
  )
}

// Pre-render this page for every locale at build time.
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}