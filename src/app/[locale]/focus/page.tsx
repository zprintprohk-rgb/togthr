/**
 * /focus — Focus Mode（番茄钟 + 像素公仔陪伴）
 *
 * Server entry：generateStaticParams + SEO metadata，
 * 实际交互（计时器 / 干扰检测 / 完成奖励）由 FocusClient 渲染。
 *
 * 战略：docs/focus-mode-spec.md — 海外增长的第一引流型功能。
 * 永远温柔：中断不惩罚，只有"我等你回来"。
 *
 * 文件边界：src/app/[locale]/focus/**
 */

import { getTranslations, setRequestLocale } from 'next-intl/server'
import { hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { routing, type Locale } from '@/i18n/routing'
import { generateAlternateLinks, getCanonicalUrl } from '@/lib/seo'
import type { Metadata } from 'next'
import FocusClient from './FocusClient'

type Props = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    return {}
  }
  setRequestLocale(locale)
  try {
    const t = await getTranslations({ locale, namespace: 'focus' })
    return {
      title: t('title'),
      description: t('subtitle'),
      alternates: {
        canonical: getCanonicalUrl(locale as Locale, '/focus'),
        languages: generateAlternateLinks('/focus'),
      },
      openGraph: {
        title: t('title'),
        description: t('subtitle'),
      },
    }
  } catch {
    return {
      title: 'Focus Mode',
      description: 'A tiny robot keeps you company while you work.',
    }
  }
}

export default async function FocusPage({ params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)
  return <FocusClient locale={locale} />
}
