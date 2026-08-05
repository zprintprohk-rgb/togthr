// src/app/[locale]/referral/leaderboard/page.tsx
//
// 邀请排行榜 — 2026-08-03
// 数据源: /api/referral/leaderboard?period=week|month|all
// 当前用 mock 数据

import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { siteConfig } from '@/lib/seo'
import { generateAlternateLinks } from '@/lib/seo-hreflang'

function t(obj: Record<string, string>, loc: Locale): string {
  return obj[loc] ?? obj.en ?? ''
}

const MOCK_LEADERS = [
  { userId: 'u1', name: 'Alex K.', count: 142, avatar: '🦊' },
  { userId: 'u2', name: 'Sam T.', count: 98, avatar: '🐼' },
  { userId: 'u3', name: 'Jordan L.', count: 76, avatar: '🐯' },
  { userId: 'u4', name: 'Casey M.', count: 54, avatar: '🦁' },
  { userId: 'u5', name: 'Riley P.', count: 41, avatar: '🐸' },
  { userId: 'u6', name: 'Morgan B.', count: 33, avatar: '🐨' },
  { userId: 'u7', name: 'Quinn D.', count: 28, avatar: '🐵' },
  { userId: 'u8', name: 'Avery S.', count: 19, avatar: '🦉' },
  { userId: 'u9', name: 'Reese J.', count: 14, avatar: '🐧' },
  { userId: 'u10', name: 'Sage W.', count: 11, avatar: '🐺' },
]

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as Locale
  const path = `/${loc}/referral/leaderboard`
  return {
    title: t({ en: 'Referral Leaderboard — Togthr', 'zh-cn': '邀请排行榜 — Togthr', 'zh-tw': '邀請排行榜 — Togthr' }, loc) || 'Leaderboard',
    description: t({ en: 'Top inviters. Climb the ranks to earn lifetime VIP.', 'zh-cn': '顶级邀请者。爬到顶部，赢取终身 VIP。' }, loc),
    alternates: {
      canonical: `${siteConfig.url}${path}`,
      languages: generateAlternateLinks(path),
    },
  }
}

export default async function LeaderboardPage({ params, searchParams }: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ period?: string }>
}) {
  const { locale } = await params
  const sp = await searchParams
  setRequestLocale(locale)
  const loc = locale as Locale
  const period = sp.period === 'month' ? 'month' : sp.period === 'all' ? 'all' : 'week'

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100 px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="text-3xl font-bold">{t({ en: 'Top inviters', 'zh-cn': '顶级邀请者', 'zh-tw': '頂級邀請者' }, loc)}</h1>

        {/* Period tabs */}
        <div className="flex gap-2 border-b border-zinc-800">
          {[
            { k: 'week', label: { en: 'This week', 'zh-cn': '本周', 'zh-tw': '本週' } },
            { k: 'month', label: { en: 'This month', 'zh-cn': '本月', 'zh-tw': '本月' } },
            { k: 'all', label: { en: 'All time', 'zh-cn': '历史', 'zh-tw': '歷史' } },
          ].map((tab) => (
            <Link
              key={tab.k}
              href={`/${loc}/referral/leaderboard?period=${tab.k}`}
              className={`px-4 py-2 text-sm border-b-2 ${period === tab.k ? 'border-pink-500 text-zinc-100' : 'border-transparent text-zinc-400 hover:text-zinc-200'}`}
            >
              {t(tab.label, loc)}
            </Link>
          ))}
        </div>

        {/* Leader list */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 divide-y divide-zinc-800">
          {MOCK_LEADERS.map((leader, i) => (
            <div key={leader.userId} className="flex items-center gap-4 px-6 py-3">
              <div className={`w-8 text-center font-bold ${i < 3 ? 'text-amber-400' : 'text-zinc-500'}`}>#{i + 1}</div>
              <div className="text-2xl">{leader.avatar}</div>
              <div className="flex-1 text-zinc-100 font-medium">{leader.name}</div>
              <div className="text-pink-400 font-semibold tabular-nums">{leader.count}</div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-zinc-500">
          {t({ en: 'Top 50 shown. Updates daily.', 'zh-cn': '显示前 50。每日更新。', 'zh-tw': '顯示前 50。每日更新。' }, loc)}
        </p>
      </div>
    </main>
  )
}
