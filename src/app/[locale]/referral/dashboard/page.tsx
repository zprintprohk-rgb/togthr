// src/app/[locale]/referral/dashboard/page.tsx
//
// 个人邀请 Dashboard — 2026-08-03
// 数据源: /api/referral/stats?userId=xxx
// 当前用 mock 数据（Supabase referrals 表创建后切换到真实 API）

import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getCanonicalUrl, siteConfig } from '@/lib/seo'
import { generateAlternateLinks } from '@/lib/seo-hreflang'

function t(obj: Record<string, string>, loc: Locale): string {
  return obj[loc] ?? obj.en ?? ''
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as Locale
  const path = `/${loc}/referral/dashboard`
  return {
    title: t({ en: 'My Referral Dashboard', 'zh-cn': '我的邀请 Dashboard', 'zh-tw': '我的邀請 Dashboard' }, loc) || 'My Referral Dashboard',
    description: t({ en: 'Track your invites and unlock VIP rewards.', 'zh-cn': '追踪你的邀请数，解锁 VIP 奖励。' }, loc),
    alternates: {
      canonical: `${siteConfig.url}${path}`,
      languages: generateAlternateLinks(path),
    },
    robots: { index: false, follow: true },
  }
}

// Mock data — replace with real API call once Supabase table is created
async function fetchStats(userId: string | null) {
  if (!userId) return null
  // TODO: real API call to /api/referral/stats
  // const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/referral/stats?userId=${userId}`)
  // return res.json()
  return {
    userId,
    count: 7,
    tier: 'tier-1' as const, // current tier unlocked
    nextTierAt: 10,
    invites: [
      { id: '1', name: 'Alex K.', joinedAt: '2026-07-28' },
      { id: '2', name: 'Sam T.', joinedAt: '2026-07-29' },
      { id: '3', name: 'Jordan L.', joinedAt: '2026-07-30' },
      { id: '4', name: 'Casey M.', joinedAt: '2026-08-01' },
      { id: '5', name: 'Riley P.', joinedAt: '2026-08-01' },
      { id: '6', name: 'Morgan B.', joinedAt: '2026-08-02' },
      { id: '7', name: 'Quinn D.', joinedAt: '2026-08-02' },
    ],
  }
}

export default async function DashboardPage({ params, searchParams }: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ userId?: string; ref?: string }>
}) {
  const { locale } = await params
  const sp = await searchParams
  setRequestLocale(locale)
  const loc = locale as Locale
  const userId = sp.userId ?? sp.ref ?? null
  const stats = await fetchStats(userId)

  if (!stats) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-zinc-950 text-zinc-100 px-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold">{t({ en: 'Sign in to see your dashboard', 'zh-cn': '登录查看 Dashboard', 'zh-tw': '登入查看 Dashboard' }, loc)}</h1>
          <p className="text-zinc-400">{t({ en: 'You need to be signed in to track your invites.', 'zh-cn': '需要登录才能追踪邀请。', 'zh-tw': '需要登入才能追蹤邀請。' }, loc)}</p>
          <Link href={`/${loc}/referral`} className="inline-block rounded-full bg-pink-500 px-6 py-2 text-white">← {t({ en: 'Back', 'zh-cn': '返回', 'zh-tw': '返回' }, loc)}</Link>
        </div>
      </main>
    )
  }

  const progressPct = Math.min(100, (stats.count / stats.nextTierAt) * 100)
  const inviteLink = `https://discord.gg/togthr?ref=${stats.userId}`
  // NOTE: discord.gg/togthr is a placeholder — real Discord server +
  // invite link will be created in Task 10 (Hermes). Until then, this
  // link will 404. The TODO in fetchStats() tracks this.

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100 px-4 py-12">
      <div className="mx-auto max-w-3xl space-y-8">
        <h1 className="text-3xl font-bold">{t({ en: 'Your Dashboard', 'zh-cn': '你的 Dashboard', 'zh-tw': '你的 Dashboard' }, loc)}</h1>

        {/* Invite link */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <label className="text-sm text-zinc-400">{t({ en: 'Your unique invite link', 'zh-cn': '你的专属邀请链接', 'zh-tw': '你的專屬邀請連結' }, loc)}</label>
          <div className="mt-2 flex gap-2">
            <input
              readOnly
              value={inviteLink}
              className="flex-1 rounded-lg border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm font-mono text-zinc-200"
              onClick={(e) => (e.target as HTMLInputElement).select()}
            />
            <button
              onClick={() => navigator.clipboard?.writeText(inviteLink)}
              className="rounded-lg bg-pink-500 px-4 py-2 text-sm text-white hover:bg-pink-400"
            >
              {t({ en: 'Copy', 'zh-cn': '复制', 'zh-tw': '複製' }, loc)}
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="text-sm text-zinc-400">{t({ en: 'Invites', 'zh-cn': '邀请数', 'zh-tw': '邀請數' }, loc)}</div>
            <div className="mt-1 text-4xl font-bold text-pink-400">{stats.count}</div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="text-sm text-zinc-400">{t({ en: 'Current tier', 'zh-cn': '当前等级', 'zh-tw': '當前等級' }, loc)}</div>
            <div className="mt-1 text-2xl font-bold text-violet-400">{t({ en: '1 Month VIP', 'zh-cn': '1 个月 VIP', 'zh-tw': '1 個月 VIP' }, loc)}</div>
          </div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
            <div className="text-sm text-zinc-400">{t({ en: 'Next tier at', 'zh-cn': '下一档', 'zh-tw': '下一檔' }, loc)}</div>
            <div className="mt-1 text-2xl font-bold text-amber-400">{stats.nextTierAt}</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <div className="flex justify-between text-sm text-zinc-400 mb-2">
            <span>{t({ en: 'Progress to next tier', 'zh-cn': '下一档进度', 'zh-tw': '下一檔進度' }, loc)}</span>
            <span>{stats.count} / {stats.nextTierAt}</span>
          </div>
          <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 to-violet-500 transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Invitees list */}
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="text-lg font-semibold mb-4">{t({ en: 'Recent invitees', 'zh-cn': '最近邀请', 'zh-tw': '最近邀請' }, loc)}</h2>
          <ul className="divide-y divide-zinc-800">
            {stats.invites.map((inv) => (
              <li key={inv.id} className="flex justify-between py-2 text-sm">
                <span className="text-zinc-200">{inv.name}</span>
                <span className="text-zinc-500">{inv.joinedAt}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </main>
  )
}
