import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { hasLocale } from 'next-intl'
import { routing, type Locale } from '@/i18n/routing'
import { generateAlternateLinks, getCanonicalUrl, websiteSchema, marketMeta } from '@/lib/seo'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { MobileNav } from '@/components/MobileNav'
import { DesktopPet } from '@/components/DesktopPet'
import { AuthEventTracker } from '@/components/shared/AuthEventTracker'
import type { Metadata } from 'next'
import Link from 'next/link'
import Script from 'next/script'

// Cloudflare Web Analytics token
// 鐣欑┖琛ㄧず鏆備笉鍚敤 Analytics锛涘悗缁湪 Cloudflare Dashboard 鎷垮埌鐪熷疄 token 鍚庡～鍏?
const CF_BEACON_TOKEN = process.env.NEXT_PUBLIC_CF_BEACON_TOKEN || ''

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

// -------- dynamic metadata ------------------------------------------------
export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const locale = params.locale as Locale
  setRequestLocale(locale)
  try {
    const t = await getTranslations({ locale, namespace: 'seo' })
    const meta = marketMeta[locale]

    return {
      metadataBase: new URL('https://www.togthr.life'),
      title: {
        template: `%s | ${t('siteName') || 'Togthr'} — The Quiet Companion`,
        default: `${t('siteName') || 'Togthr'} — The Quiet Companion`,
      },
      description:
        t('description') ||
        'A small presence on your screen that remembers you. No chat. No AI. Just stays.',
      keywords: t('keywords'),
      alternates: {
        canonical: getCanonicalUrl(locale),
        languages: generateAlternateLinks(''),
      },
      openGraph: {
        siteName: 'Togthr',
        locale: meta.ogLocale,
        type: 'website',
        images: ['/og-image.png'],
      },
      twitter: {
        card: 'summary_large_image',
        site: '@Togthrapp',
      },
    }
  } catch (error) {
    console.error('[layout] generateMetadata failed:', error)
    return {
      metadataBase: new URL('https://www.togthr.life'),
      title: 'Togthr',
      description: 'Togthr - Grow Together, Love Deeper',
    }
  }
}

// -------- layout ----------------------------------------------------------
// NOTE: This is a *nested* layout. The root <html>/<body> tags are owned by
// `src/app/layout.tsx`. Returning <html>/<body> from a child layout would
// produce nested html tags and break Next.js' head/stylesheet injection,
// which is exactly what caused the "no CSS" symptom on /[locale] routes.
export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  setRequestLocale(locale)
  try {
    const messages = await getMessages()
    const t = await getTranslations({ locale })
    const nav = {
      home: t('nav.home'),
      features: t('nav.features'),
      pricing: t('nav.pricing'),
      community: t('nav.community'),
      blog: t('nav.blog'),
      login: t('nav.login'),
      daily: t('nav.daily'),
      capsule: t('nav.capsule'),
      pet: t('nav.pet'),
      journal: t('nav.journal'),
      store: t('nav.store'),
      chat: t('nav.chat'),
      focus: t('nav.focus'),
      companion: t('nav.companion'),
      couples: t('nav.couples'),
      solo: t('nav.solo'),
      ethics: t('nav.ethics'),
      notChatbot: t('footer.notChatbot'),
    }
    const footer = {
      privacy: t('footer.privacy'),
      terms: t('footer.terms'),
      cookie: t('footer.cookie'),
      help: t('footer.help'),
      contact: t('footer.contact'),
    }

    return (
      <NextIntlClientProvider locale={locale} messages={messages}>
        {/* Cloudflare Web Analytics beacon (only when token configured) */}
        {CF_BEACON_TOKEN && (
          <script
            defer
            src="https://static.cloudflareinsights.com/beacon.min.js"
            data-cf-beacon={JSON.stringify({ token: CF_BEACON_TOKEN })}
          />
        )}

        {/* PostHog analytics (TK-002) — self-host or cloud, zero-review */}
        {process.env.NEXT_PUBLIC_POSTHOG_KEY && (
          <>
            <script
              crossOrigin="anonymous"
              src={
                process.env.NEXT_PUBLIC_POSTHOG_HOST
                  ? `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/static/array.js`
                  : 'https://us-assets.i.posthog.com/static/array.js'
              }
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  !function(t,e){var o,n,p,r;e.__SV||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init capture register register_once register_for_session unregister unregister_for_session getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSessionId getSurveys getActiveMatchingSurveys renderSurvey canRenderSurvey identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setAutocaptureProperties setGroupPropertiesForFlags optInCapture optOutCapture hasOptedInCapture hasOptedOutCapture disableCompression debug getPageViewId captureException".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
                  posthog.init('${process.env.NEXT_PUBLIC_POSTHOG_KEY}', {
                    api_host: '${process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'}',
                    person_profiles: 'identified_only',
                    loaded: function(p) { if (p.get_config('api_host') === 'https://us.i.posthog.com') { /* cloud */ } },
                  });
                `,
              }}
            />
          </>
        )}

        {/* Google Analytics 4 (GA4) */}
        {process.env.NEXT_PUBLIC_GA4_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA4_ID}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA4_ID}');`}
            </Script>
          </>
        )}

        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema()) }}
        />

        {/* ---------- Navigation ---------- */}
        <header className="sticky top-0 z-50 border-b border-zinc-700/30 bg-[#0B0B1A]/80 backdrop-blur-xl" style={{ backgroundColor: 'rgba(11,11,26,0.85)' }} data-dark-root>
          <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
            {/* Left: Logo + Links */}
            <div className="flex items-center gap-6">
              <Link
                href={`/${locale}`}
                className="text-xl font-bold tracking-tight bg-linear-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
              >
                Togthr
              </Link>
              <div className="hidden sm:flex items-center gap-4">
                <Link
                  href={`/${locale}`}
                  className="text-sm font-medium text-zinc-400 hover:text-zinc-100"
                >
                  {nav.companion}
                </Link>
                <Link
                  href={`/${locale}/companion`}
                  className="text-sm font-medium text-zinc-400 hover:text-zinc-100"
                >
                  {nav.couples}
                </Link>
                <Link
                  href={`/${locale}/solo`}
                  className="text-sm font-medium text-zinc-400 hover:text-zinc-100"
                >
                  {nav.solo}
                </Link>
                <Link
                  href={`/${locale}/ethics`}
                  className="text-sm font-medium text-zinc-400 hover:text-zinc-100"
                >
                  {nav.ethics}
                </Link>
              </div>
            </div>

            {/* Right: Language Switcher + Login + Mobile menu */}
            <div className="flex items-center gap-3">
              <LanguageSwitcher currentLocale={locale as Locale} />
              <Link
                href={`/${locale}/login`}
                className="inline-flex h-9 items-center rounded-full bg-gradient-to-r from-pink-500 to-purple-500 px-4 text-sm font-medium text-white hover:from-pink-400 hover:to-purple-400"
              >
                {nav.login}
              </Link>
              <MobileNav
                locale={locale}
                labels={{
                  companion: nav.companion,
                  couples: nav.couples,
                  solo: nav.solo,
                  ethics: nav.ethics,
                  login: nav.login,
                }}
              />
            </div>
          </nav>
        </header>

        {/* ---------- Main Content ---------- */}
        <main 
          className="bg-[#0B0B1A]"
          style={{ background: '#0B0B1A', minHeight: '100vh' }}
        >{children}</main>

        {/* 桌面宠物 — 全站悬浮 */}
        <DesktopPet />

        {/* Analytics: detects ?login=success marker → login_success event */}
        <AuthEventTracker />

        {/* ---------- Footer ---------- */}
        <footer className="border-t border-zinc-700/30 bg-[#0B0B1A]/80 backdrop-blur-xl" style={{ backgroundColor: 'rgba(11,11,26,0.85)' }} data-dark-root>
          <div className="mx-auto max-w-6xl px-4 py-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-zinc-400">
                © {new Date().getFullYear()} Togthr. All rights reserved.
              </p>
              <p className="text-xs text-zinc-500">
                Payments processed securely via PayPal.
              </p>
              <p className="text-xs opacity-60 text-zinc-400">
                {nav.notChatbot}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-zinc-400">
                <Link
                  href={`/${locale}/privacy`}
                  className="hover:text-zinc-100"
                >
                  {footer.privacy}
                </Link>
                <Link
                  href={`/${locale}/terms`}
                  className="hover:text-zinc-100"
                >
                  {footer.terms}
                </Link>
                <Link
                  href={`/${locale}/cookies`}
                  className="hover:text-zinc-100"
                >
                  {footer.cookie}
                </Link>
                <Link
                  href={`/${locale}/help`}
                  className="hover:text-zinc-100"
                >
                  {footer.help}
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="hover:text-zinc-100"
                >
                  {footer.contact}
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </NextIntlClientProvider>
    )
  } catch (error) {
    console.error('[layout] render failed:', error)
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 min-h-screen bg-[#0B0B1A] text-zinc-100">
        <h1 className="text-2xl font-bold text-rose-400 mb-4">Layout Error</h1>
        <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-lg p-4 overflow-auto backdrop-blur-xl">
          <pre className="text-sm text-rose-300 whitespace-pre-wrap">
            {JSON.stringify(
              {
                message: (error as Error).message,
                stack: (error as Error).stack,
                name: (error as Error).name,
              },
              null,
              2
            )}
          </pre>
        </div>
        <p className="mt-4 text-sm text-zinc-500">Digest: 521802265 — real error from layout try/catch</p>
      </div>
    )
  }
}
