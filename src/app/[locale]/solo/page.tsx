// src/app/[locale]/solo/page.tsx
// Day 2 占位页（Day 4-5 升级为完整落地页）
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { siteConfig } from '@/lib/seo'

const SLUG = 'solo'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as Locale
  const url = `${siteConfig.url}/${loc}/${SLUG}`
  return {
    title: 'For Me — Togthr',
    description: 'A quiet companion for one. A small pixel presence that remembers you — no chat, no pressure, just company.',
    alternates: { canonical: url },
  }
}

export default async function SoloPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale
  if (!routing.locales.includes(loc)) return null
  setRequestLocale(loc)
  const t = await getTranslations({ locale: loc })

  return (
    <div data-dark-root className="min-h-screen bg-[#0B0B1A] text-zinc-100">
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <p className="text-sm uppercase tracking-widest text-zinc-500">{t('nav.solo')}</p>
        <h1 className="mt-4 text-3xl font-semibold text-zinc-50">A quiet companion for one</h1>
        <p className="mt-6 text-zinc-400">
          A small pixel presence that remembers you.
          <br />
          <span className="text-zinc-500">No chat. No pressure. Just company.</span>
        </p>
      </div>
    </div>
  )
}
