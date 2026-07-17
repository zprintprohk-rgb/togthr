/**
 * /payment/success — subscription payment return page.
 *
 * Where /api/payments/paypal/return (and the Alipay return_url) land the
 * user after a completed subscription payment. Fulfillment has already
 * happened server-side (order row + membership upsert) before the redirect,
 * so this page is purely celebratory + wayfinding.
 *
 * Copy uses the 'paymentSuccess' message namespace via the safe-t wrapper:
 * messages/* are intentionally NOT edited, so every string falls back to
 * the English defaults below until translations are added.
 */

import { getTranslations } from 'next-intl/server'
import { Link } from '@/i18n/routing'
import type { Metadata } from 'next'
import { routing, type Locale } from '@/i18n/routing'
import { generateAlternateLinks, getCanonicalUrl } from '@/lib/seo'
import { ts } from '@/lib/safe-t'
import { PurchaseSuccessTracker } from '@/components/shared/PurchaseSuccessTracker'

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  return {
    title: 'Payment successful',
    robots: { index: false }, // don't index thank-you pages
    alternates: {
      canonical: getCanonicalUrl(locale as Locale, '/payment/success'),
      languages: generateAlternateLinks('/payment/success'),
    },
  }
}

export default async function PaymentSuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  // safe-t: graceful English fallbacks until messages/* gains the namespace
  const title = ts(t, 'paymentSuccess.title', 'Payment successful 🎉')
  const subtitle = ts(
    t,
    'paymentSuccess.subtitle',
    'Your companion felt that. Membership is now active.',
  )
  const note = ts(
    t,
    'paymentSuccess.noteTitle',
    'What happens next',
  )
  const noteBody = ts(
    t,
    'paymentSuccess.noteBody',
    'Your new pets, skins and member perks unlock within a few seconds — no restart needed.',
  )
  const hint = ts(
    t,
    'paymentSuccess.hint',
    'If anything looks missing, give it a moment and refresh the pet page.',
  )
  const ctaPet = ts(t, 'paymentSuccess.ctaPet', '🐾 Meet your pet')
  const ctaPricing = ts(t, 'paymentSuccess.ctaPricing', '← Back to pricing')

  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-16 text-center">
      {/* Analytics: subscription purchase completed (tier/period via URL params) */}
      <PurchaseSuccessTracker provider="paypal" />

      {/* Confetti animation */}
      <div className="text-8xl mb-6 animate-bounce">🎉</div>

      <h1 className="text-3xl font-bold tracking-tight bg-linear-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent sm:text-4xl">
        {title}
      </h1>

      <p className="mt-3 text-base text-zinc-600 dark:text-zinc-300">
        {subtitle}
      </p>

      <div className="mt-8 rounded-2xl border-2 border-amber-200 bg-amber-50/50 p-5 text-left dark:border-amber-800 dark:bg-amber-950/30">
        <p className="text-sm font-medium text-amber-900 dark:text-amber-200">
          ✨ {note}
        </p>
        <p className="mt-2 text-xs text-amber-800/80 dark:text-amber-300/80">
          {noteBody}
        </p>
        <p className="mt-2 text-xs text-amber-800/80 dark:text-amber-300/80">
          {hint}
        </p>
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={`/${locale}/pricing`}
          className="rounded-full border border-zinc-300 bg-white px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
        >
          {ctaPricing}
        </Link>
        <Link
          href={`/${locale}/pet`}
          className="rounded-full bg-linear-to-r from-rose-500 to-purple-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:shadow-purple-500/50"
        >
          {ctaPet}
        </Link>
      </div>

      <p className="mt-12 text-[10px] text-zinc-400">
        🔒 {ts(t, 'paymentSuccess.secureNotice', 'Payments processed securely.')}
      </p>
    </div>
  )
}
