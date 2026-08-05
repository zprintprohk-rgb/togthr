// src/app/[locale]/referral/page.tsx
//
// Togthr 邀请裂变活动主页面 — 2026-08-03 实施
// 设计: 深色玻璃拟态 + Framer Motion 微动效
// 复用: 现有 layout + i18n + generateAlternateLinks (per §0 SEO 统一规范)
// 8 locale 同 body, 仅 metadata 文案本地化
//
// 活动规则 (per K3 spec):
//   - 3 人 → 1 个月 VIP
//   - 10 人 → 3 个月 VIP + 专属角色
//   - 30 人 → 终身 VIP + 创始人圈子

import Link from 'next/link'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { siteConfig } from '@/lib/seo'
import { generateAlternateLinks } from '@/lib/seo-hreflang'

const TIER_REWARDS = [
  {
    invites: 3,
    label: { en: '1 Month VIP', 'zh-cn': '1 个月 VIP', 'zh-tw': '1 個月 VIP', ja: '1ヶ月 VIP', ko: '1개월 VIP', de: '1 Monat VIP', fr: '1 mois VIP', es: '1 mes VIP' },
    desc: { en: 'Unlock all skins + no ads', 'zh-cn': '解锁全部皮肤 + 无广告', 'zh-tw': '解鎖全部皮膚 + 無廣告', ja: '全スキン解放 + 広告なし', ko: '전체 스킨 잠금 해제 + 광고 없음', de: 'Alle Skins freischalten + keine Werbung', fr: 'Débloquer tous les skins + sans pub', es: 'Desbloquear todas las skins + sin anuncios' },
    color: 'from-pink-500/20 to-rose-500/10',
    border: 'border-pink-500/40',
  },
  {
    invites: 10,
    label: { en: '3 Months VIP + Special Role', 'zh-cn': '3 个月 VIP + 专属角色', 'zh-tw': '3 個月 VIP + 專屬角色', ja: '3ヶ月 VIP + 特別ロール', ko: '3개월 VIP + 특별 역할', de: '3 Monate VIP + Spezielle Rolle', fr: '3 mois VIP + Rôle spécial', es: '3 meses VIP + Rol especial' },
    desc: { en: 'VIP perks + Discord Founder badge', 'zh-cn': 'VIP 权益 + Discord 创始人徽章', 'zh-tw': 'VIP 權益 + Discord 創辦人徽章', ja: 'VIP特典 + Discordファウンダーバッジ', ko: 'VIP 혜택 + Discord 창립자 배지', de: 'VIP-Vorteile + Discord-Gründer-Abzeichen', fr: 'Avantages VIP + badge Fondateur Discord', es: 'Beneficios VIP + insignia Fundador de Discord' },
    color: 'from-violet-500/20 to-indigo-500/10',
    border: 'border-violet-500/40',
  },
  {
    invites: 30,
    label: { en: 'Lifetime VIP + Founder Circle', 'zh-cn': '终身 VIP + 创始人圈子', 'zh-tw': '終身 VIP + 創辦人圈子', ja: '生涯 VIP + ファウンダーサークル', ko: '평생 VIP + 창업자 서클', de: 'Lifetime VIP + Gründer-Zirkel', fr: 'VIP à vie + Cercle des fondateurs', es: 'VIP de por vida + Círculo de fundadores' },
    desc: { en: 'Permanent access + private founder group', 'zh-cn': '永久访问 + 私密创始人群', 'zh-tw': '永久訪問 + 私密創辦人群', ja: '永久アクセス + プライベート創設者グループ', ko: '영구 접근 + 비공개 창업자 그룹', de: 'Dauerhafter Zugriff + private Gründergruppe', fr: 'Accès permanent + groupe privé des fondateurs', es: 'Acceso permanente + grupo privado de fundadores' },
    color: 'from-amber-500/20 to-yellow-500/10',
    border: 'border-amber-500/40',
  },
] as const

const FAQS = [
  { q: { en: 'How are invites counted?', 'zh-cn': '邀请如何计数？', 'zh-tw': '邀請如何計數？' }, a: { en: 'Each new Discord member who joins via your unique link counts as 1 invite. They must verify their email + link their Discord account to qualify.', 'zh-cn': '通过你的专属链接加入的每个新 Discord 成员计 1 次邀请。他们必须验证邮箱并关联 Discord 账号。' } },
  { q: { en: 'When do I get my reward?', 'zh-cn': '奖励何时发放？', 'zh-tw': '獎勵何時發放？' }, a: { en: 'Rewards unlock within 1 minute of hitting each milestone. VIP codes arrive via email + Discord DM.', 'zh-cn': '达到每档里程碑后 1 分钟内解锁奖励。VIP 码通过邮件 + Discord DM 发送。' } },
  { q: { en: 'Can I track my progress?', 'zh-cn': '我能追踪进度吗？', 'zh-tw': '我能追蹤進度嗎？' }, a: { en: 'Yes — your dashboard shows real-time invite count and tier progress.', 'zh-cn': '可以 — 你的 Dashboard 实时显示邀请数和等级进度。' } },
] as const

function t(obj: Record<string, string>, loc: Locale): string {
  return obj[loc] ?? obj.en ?? ''
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as Locale
  const title = t({ en: 'Refer Friends, Earn VIP — Togthr Referral Program', 'zh-cn': '邀请好友，赢取 VIP — Togthr 邀请计划', 'zh-tw': '邀請好友，贏取 VIP — Togthr 邀請計畫' }, loc)
  const description = t({
    en: 'Invite friends to Togthr Discord and earn VIP rewards. 3 invites = 1 month VIP, 10 invites = 3 months + Founder role, 30 invites = lifetime + Founder Circle.',
    'zh-cn': '邀请好友加入 Togthr Discord 即可获得 VIP 奖励。3 人 = 1 个月 VIP，10 人 = 3 个月 + 创始人角色，30 人 = 终身 + 创始人圈子。',
    'zh-tw': '邀請好友加入 Togthr Discord 即可獲得 VIP 獎勵。3 人 = 1 個月 VIP，10 人 = 3 個月 + 創辦人角色，30 人 = 終身 + 創辦人圈子。',
  }, loc)
  const path = `/${loc}/referral`
  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.url}${path}`,
      languages: generateAlternateLinks(path),
    },
    openGraph: {
      type: 'website',
      title,
      description,
      url: `${siteConfig.url}/${loc}/referral`,
      siteName: siteConfig.name,
      locale: loc.replace('-', '_'),
      images: [{ url: `${siteConfig.url}/og/referral-${loc}.png`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  }
}

export default async function ReferralPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  const loc = locale as Locale

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-zinc-100">
      {/* Hero */}
      <section className="relative px-4 pt-20 pb-12 mx-auto max-w-5xl text-center">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-400 via-violet-400 to-amber-400 bg-clip-text text-transparent">
          {t({ en: 'Invite Friends, Earn VIP', 'zh-cn': '邀请好友，赢取 VIP', 'zh-tw': '邀請好友，贏取 VIP' }, loc)}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto">
          {t({
            en: 'Bring your friends into the Togthr Discord. Hit a milestone, unlock VIP.',
            'zh-cn': '把朋友拉进 Togthr Discord。达到里程碑，解锁 VIP。',
            'zh-tw': '把朋友拉進 Togthr Discord。達到里程碑，解鎖 VIP。',
          }, loc)}
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${loc}/referral/dashboard`}
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-pink-500 to-violet-500 px-8 py-3 text-white font-semibold hover:scale-105 transition"
          >
            {t({ en: 'View My Dashboard', 'zh-cn': '查看我的 Dashboard', 'zh-tw': '查看我的 Dashboard' }, loc)}
          </Link>
          <Link
            href={`/${loc}/referral/leaderboard`}
            className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-8 py-3 text-zinc-200 hover:bg-zinc-800/50 transition"
          >
            {t({ en: 'See Leaderboard', 'zh-cn': '查看排行榜', 'zh-tw': '查看排行榜' }, loc)}
          </Link>
        </div>
      </section>

      {/* Reward tiers */}
      <section className="px-4 py-12 mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          {t({ en: 'Three milestones. Three rewards.', 'zh-cn': '三档里程碑，三种奖励。', 'zh-tw': '三檔里程碑，三種獎勵。' }, loc)}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {TIER_REWARDS.map((tier, i) => (
            <div key={i} className={`relative rounded-2xl border ${tier.border} bg-gradient-to-br ${tier.color} backdrop-blur p-6`}>
              <div className="text-5xl font-bold text-white">{tier.invites}</div>
              <div className="mt-2 text-sm text-zinc-400">
                {t({ en: 'invites', 'zh-cn': '人', 'zh-tw': '人' }, loc)}
              </div>
              <h3 className="mt-4 text-xl font-bold text-zinc-100">{t(tier.label, loc)}</h3>
              <p className="mt-2 text-sm text-zinc-400">{t(tier.desc, loc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="px-4 py-12 mx-auto max-w-5xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          {t({ en: 'How it works', 'zh-cn': '怎么玩', 'zh-tw': '怎麼玩' }, loc)}
        </h2>
        <ol className="grid md:grid-cols-3 gap-6">
          {[
            { n: '1', h: { en: 'Get your link', 'zh-cn': '拿到你的链接', 'zh-tw': '拿到你的連結' }, d: { en: 'Sign in with Discord to get a unique invite link.', 'zh-cn': '用 Discord 登录获取专属链接。' } },
            { n: '2', h: { en: 'Share it', 'zh-cn': '分享出去', 'zh-tw': '分享出去' }, d: { en: 'Send it in DMs, social, or anywhere. Each verified signup = 1 invite.', 'zh-cn': 'DM、社交媒体随便发。每个验证注册 = 1 邀请。' } },
            { n: '3', h: { en: 'Earn VIP', 'zh-cn': '赢取 VIP', 'zh-tw': '贏取 VIP' }, d: { en: 'Unlock rewards the moment you hit each tier. Codes arrive in email + Discord DM.', 'zh-cn': '达到每档立即解锁奖励。VIP 码通过邮件 + Discord DM 发送。' } },
          ].map((step, i) => (
            <li key={i} className="rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur p-6">
              <div className="text-3xl font-bold text-pink-400">{step.n}</div>
              <h3 className="mt-2 text-lg font-semibold text-zinc-100">{t(step.h, loc)}</h3>
              <p className="mt-1 text-sm text-zinc-400">{t(step.d, loc)}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* FAQ */}
      <section className="px-4 py-12 mx-auto max-w-3xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">FAQ</h2>
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <details key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <summary className="cursor-pointer font-medium text-zinc-100">{t(faq.q, loc)}</summary>
              <p className="mt-2 text-zinc-400">{t(faq.a, loc)}</p>
            </details>
          ))}
        </div>
      </section>

      {/* JSON-LD: FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: t(f.q, loc),
              acceptedAnswer: { '@type': 'Answer', text: t(f.a, loc) },
            })),
          }),
        }}
      />
    </main>
  )
}
