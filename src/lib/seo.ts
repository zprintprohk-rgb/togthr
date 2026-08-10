import { routing, type Locale } from '@/i18n/routing'

// --- Site-wide config -------------------------------------------------------
export const siteConfig = {
  name: 'Togthr',
  taglineKey: 'seo.tagline',
  url: 'https://www.togthr.life',
  ogImage: '/og-quiet-companion.png',
  twitterHandle: '@Togthrapp',
} as const

// --- Canonical & alternate links --------------------------------------------
// hreflang + canonical 统一用 www.togthr.life；en 也带 /en/ 前缀避免 redirect chain
export function generateAlternateLinks(path: string = ''): Record<string, string> {
  const links: Record<string, string> = {}
  for (const locale of routing.locales) {
    links[locale] = `${siteConfig.url}/${locale}${path}`
  }
  links['x-default'] = `${siteConfig.url}/en${path}`
  return links
}

export function getCanonicalUrl(locale: Locale, path: string = ''): string {
  return `${siteConfig.url}/${locale}${path}`
}

// --- Structured data (JSON-LD) ----------------------------------------------
// WebSite schema
export function websiteSchema(): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: siteConfig.name,
    url: siteConfig.url,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'All',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'A quiet AI pet for self-care — a pixel virtual pet that grows as you show up for yourself. No chat, no pressure.',
    inLanguage: routing.locales.map((l) => l.replace('-', '_')),
  }
}

// FAQ schema
export function faqSchema(items: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

// SoftwareApplication schema (per locale descriptions)
// (S3 content cleanup 2026-08-11: couple → AI pet / self-care positioning)
const softwareDescriptions: Partial<Record<Locale, string>> = {
  en: 'A quiet AI pet for self-care — a pixel virtual pet that grows as you show up for yourself. No chat, no streaks, no pressure.',
  'zh-cn': '安静的 AI 宠物自我关怀伴侣——像素虚拟宠物，在你为自己出现的每一天慢慢成长。不聊天、无压力。',
  'zh-tw': '安靜的 AI 寵物自我關懷伴侶——像素虛擬寵物，在你為自己出現的每一天慢慢成長。不聊天、無壓力。',
  ja: '静かな AI ペット・セルフケアコンパニオン——毎日少しずつ育つピクセル仮想ペット。チャットなし、プレッシャーなし。',
  ko: '조용한 AI 펫 셀프케어 컴패니언 — 매일 조금씩 자라는 픽셀 가상 펫. 채팅 없음, 압박 없음.',
  de: 'Ein leiser AI-Pet-Begleiter für Self-Care — ein Pixel-Virtual-Pet, das mit dir wächst. Kein Chat, kein Druck.',
  fr: 'Un compagnon IA silencieux pour le self-care — un animal virtuel en pixels qui grandit avec vous. Pas de chat, pas de pression.',
  es: 'Un compañero IA silencioso para el autocuidado — una mascota virtual de píxeles que crece contigo. Sin chat, sin presión.',
}

export function generateSoftwareSchema(locale: Locale): Record<string, unknown> {
  const url = locale === routing.defaultLocale
    ? siteConfig.url
    : `${siteConfig.url}/${locale}`
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Togthr',
    url,
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'Any',
    description: softwareDescriptions[locale] ?? softwareDescriptions.en,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '10000',
    },
    inLanguage: locale.replace('-', '_'),
  }
}

// Organization schema
export function organizationSchema(locale: Locale): Record<string, unknown> {
  const url = locale === routing.defaultLocale
    ? siteConfig.url
    : `${siteConfig.url}/${locale}`
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Togthr',
    url,
    logo: `${siteConfig.url}/logo.png`,
    sameAs: [
      'https://twitter.com/Togthrapp',
      'https://github.com/Togthrapp',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer support',
      email: 'support@togthr.life',
      availableLanguage: routing.locales,
    },
  }
}

// BreadcrumbList schema
export function breadcrumbSchema(
  items: { name: string; url: string }[],
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// --- GEO helpers for hreflang + alternate -----------------------------------
export const geoMarketMap: Record<string, Locale> = {
  HK: 'zh-tw',
  TW: 'zh-tw',
  CN: 'zh-cn',
  JP: 'ja',
  KR: 'ko',
  DE: 'de',
  FR: 'fr',
  ES: 'es',
}

export function geoCountryToLocale(country: string): Locale {
  return geoMarketMap[country] ?? routing.defaultLocale
}

// --- Per-locale market metadata ---------------------------------------------
export const marketMeta: Record<Locale, { region: string; currency: string; ogLocale: string }> = {
  en: { region: 'US', currency: 'USD', ogLocale: 'en_US' },
  'zh-cn': { region: 'CN', currency: 'CNY', ogLocale: 'zh_CN' },
  'zh-tw': { region: 'TW', currency: 'TWD', ogLocale: 'zh_TW' },
  ja: { region: 'JP', currency: 'JPY', ogLocale: 'ja_JP' },
  ko: { region: 'KR', currency: 'KRW', ogLocale: 'ko_KR' },
  de: { region: 'DE', currency: 'EUR', ogLocale: 'de_DE' },
  fr: { region: 'FR', currency: 'EUR', ogLocale: 'fr_FR' },
  es: { region: 'ES', currency: 'EUR', ogLocale: 'es_ES' },
}