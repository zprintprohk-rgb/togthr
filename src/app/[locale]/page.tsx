import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import { StructuredData } from '@/components/StructuredData'
import {
  siteConfig,
  getCanonicalUrl,
  generateAlternateLinks,
} from '@/lib/seo'
import { routing, type Locale } from '@/i18n/routing'
import { HomeClient } from './HomeClient'

// ---------- Static params ----------
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

// ---------- Metadata (head) ----------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: `${t('seo.siteName')} — ${t('seo.tagline')}`,
    description: t('seo.description'),
    keywords: t('seo.keywords'),
    alternates: {
      canonical: getCanonicalUrl(locale as Locale),
      languages: generateAlternateLinks(),
    },
    openGraph: {
      title: `${t('seo.siteName')} — ${t('seo.tagline')}`,
      description: t('seo.description'),
      url: getCanonicalUrl(locale as Locale),
      siteName: t('seo.siteName'),
      locale: locale.replace('-', '_'),
      type: 'website',
      images: [
        {
          url: `${siteConfig.url}${siteConfig.ogImage}`,
          width: 1200,
          height: 630,
          alt: t('seo.siteName'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${t('seo.siteName')} — ${t('seo.tagline')}`,
      description: t('seo.description'),
      images: [`${siteConfig.url}${siteConfig.ogImage}`],
    },
  }
}

// ---------- Page component (server) ----------
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  const features = [
    { key: 'sharedJournal', icon: '💌' },
    { key: 'moodTracker', icon: '🌡️' },
    { key: 'dreamWall', icon: '🌠' },
    { key: 'dailyGratitude', icon: '🪴' },
    { key: 'petAdoption', icon: '🐥' },
    { key: 'timeCapsule', icon: '⏰' },
  ].map(({ key, icon }) => ({
    key,
    icon,
    title: t(`home.features.${key}.title`),
    desc: t(`home.features.${key}.desc`),
  }))

  return (
    <>
      <StructuredData
        website={{
          name: t('seo.siteName'),
          url: siteConfig.url,
          description: t('seo.description'),
          inLanguage: routing.locales.map((l) => l.replace('-', '_')),
        }}
        organization={{
          name: t('seo.siteName'),
          url: siteConfig.url,
          logo: `${siteConfig.url}/logo.png`,
          sameAs: [
            'https://twitter.com/Togthrapp',
            'https://github.com/Togthrapp',
          ],
        }}
        software={{
          name: 'Togthr',
          url: 'https://togthr.life',
          description:
            'A pixel-art desktop companion pet that lives in your browser, grows through 5 stages (baby to legend), and supports 8 languages. No ads, no chat, no streak pressure.',
          operatingSystem: 'Web',
          offers: {
            price: '5.49',
            priceCurrency: 'USD',
            description: 'Monthly subscription',
          },
          author: {
            '@type': 'Organization',
            name: 'CloudDreamer',
            url: 'https://togthr.life',
          },
        }}
      />

      <HomeClient
        locale={locale}
        heroTitle={t('home.hero.title')}
        heroSubtitle={t('home.hero.subtitle')}
        heroWelcomeFirst={t('home.hero.welcomeFirst')}
        heroWelcomeBack={t('home.hero.welcomeBack')}
        heroSleepyGreeting={t('home.hero.sleepyGreeting')}
        heroCta={t('home.hero.cta')}
        heroSecondary={t('home.hero.secondary')}
        heroSocialProof={t('home.hero.socialProof')}
        heroEyebrow={t('home.hero.eyebrow')}
        heroStatusHello={t('home.hero.statusHello')}
        heroStatusMiss={t('home.hero.statusMiss')}
        heroStatusSleepy={t('home.hero.statusSleepy')}
                        features={features}
      />
    </>
  )
}
