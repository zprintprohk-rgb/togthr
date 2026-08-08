// src/app/[locale]/ethics/page.tsx
// Day 2 占位页（Day 4-5 升级为完整伦理页）
import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { siteConfig } from '@/lib/seo'

const SLUG = 'ethics'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as Locale
  const url = `${siteConfig.url}/${loc}/${SLUG}`
  return {
    title: 'Ethics — Togthr',
    description: 'Togthr is not a chatbot. It does not chat, does not manipulate, and does not replace human connection. Our ethical design principles.',
    alternates: { canonical: url },
  }
}

export default async function EthicsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale
  if (!routing.locales.includes(loc)) return null
  setRequestLocale(loc)
  const t = await getTranslations({ locale: loc })

  return (
    <div data-dark-root className="min-h-screen bg-[#0B0B1A] text-zinc-100">
      <div className="mx-auto max-w-2xl px-4 py-24">
        <p className="text-sm uppercase tracking-widest text-zinc-500">{t('nav.ethics')}</p>
        <h1 className="mt-4 text-3xl font-semibold text-zinc-50">Togthr is not a chatbot</h1>
        <div className="mt-8 space-y-4 text-zinc-400">
          <p><span className="text-pink-400">It doesn&apos;t talk.</span> No chat. No AI conversation. A small presence that remembers you.</p>
          <p><span className="text-pink-400">It doesn&apos;t manipulate.</span> No guilt-trip notifications, no dark patterns, no streak punishment.</p>
          <p><span className="text-pink-400">It doesn&apos;t replace.</span> It points you back to real people — your partner, your friends, yourself.</p>
        </div>
      </div>
    </div>
  )
}
