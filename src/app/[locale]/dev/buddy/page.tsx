'use client'

// src/app/[locale]/dev/buddy/page.tsx
//
// Togthr Buddy Module 0.5 — 内部视觉 QA 验收页
//
// 目的：
//   1. 手动切换 8 state × 6 theme × 8 accessory × 2 背景，肉眼检查 BuddyAvatar
//   2. 一次性渲染 76 张 public/pets/ PNG（K3 拍板全审计），分类打标
//   3. 深色 / 纯白双背景对比，验证去白底工具是否在两种背景下都干净
//
// 不可见性：layout.tsx 已设 noindex/nofollow + next-sitemap 已 exclude

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import BuddyAvatar from '@/components/buddy/BuddyAvatar'
import {
  ASSET_AUDIT,
  ASSET_CATEGORIES,
  BUDDY_STATES,
  BUDDY_THEMES,
  BUDDY_ACCESSORIES,
  type BuddyState,
  type BuddyAccessory,
  type AssetEntry,
} from '@/lib/buddy-asset-map'
import type { BuddyTheme } from '@/lib/image-utils'

type StageBg = 'cosmic' | 'white'

export default function DevBuddyPage() {
  const t = useTranslations('dev.buddy')

  // 控制面板状态
  const [state, setState] = useState<BuddyState>('idle')
  const [theme, setTheme] = useState<BuddyTheme>('lavender')
  const [accessory, setAccessory] = useState<BuddyAccessory>(null)
  const [isGlowing, setIsGlowing] = useState(false)
  const [speech, setSpeech] = useState('Hello!')
  const [signText, setSignText] = useState('Hi')
  const [stageBg, setStageBg] = useState<StageBg>('cosmic')

  // 风险标签 i18n 读取
  const riskText = (entry: AssetEntry): string => {
    switch (entry.i18nKey) {
      case 'frameUsed':     return t('risk.used')
      case 'frameAnomaly':  return t('risk.anomaly')
      case 'spriteTable':   return t('risk.spriteTable')
      case 'safe':          return t('risk.safe')
    }
  }

  const riskColor = (entry: AssetEntry): string => {
    switch (entry.risk) {
      case 'used':         return 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300'
      case 'anomaly':      return 'border-rose-500/60 bg-rose-500/10 text-rose-300'
      case 'sprite-table': return 'border-amber-500/60 bg-amber-500/10 text-amber-300'
      case 'safe':         return 'border-zinc-700 bg-zinc-800/30 text-zinc-400'
    }
  }

  // 状态按钮高亮
  const btnBase = 'rounded-md border px-3 py-1.5 text-xs font-medium transition-colors'
  const btnIdle = 'border-zinc-700 bg-zinc-800/40 text-zinc-300 hover:border-zinc-500'
  const btnOn   = 'border-pink-500/60 bg-pink-500/15 text-pink-200'

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 sm:py-10">
      {/* ── 头部 ── */}
      <div className="mb-6 flex flex-col gap-1">
        <h1 className="text-2xl sm:text-3xl font-bold text-zinc-100">
          🐣 {t('title')}
        </h1>
        <p className="text-sm text-zinc-400">{t('subtitle')}</p>
        <p className="text-xs text-amber-400/80 mt-1">
          ⚠️ {t('qaNote')}
        </p>
      </div>

      {/* ── 控制面板 ── */}
      <section
        aria-label="Buddy controls"
        className="glass-card rounded-2xl p-4 sm:p-6 mb-6 space-y-4"
      >
        {/* state 排 */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            {t('stateLabel')}
          </div>
          <div className="flex flex-wrap gap-2">
            {BUDDY_STATES.map((s) => (
              <button
                key={s.id}
                onClick={() => setState(s.id)}
                className={`${btnBase} ${state === s.id ? btnOn : btnIdle}`}
                aria-pressed={state === s.id}
              >
                {s.emoji} {t(`state.${s.id}`)}
              </button>
            ))}
          </div>
        </div>

        {/* theme 排 */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            {t('themeLabel')}
          </div>
          <div className="flex flex-wrap gap-2">
            {BUDDY_THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => setTheme(th.id)}
                className={`${btnBase} flex items-center gap-2 ${theme === th.id ? btnOn : btnIdle}`}
                aria-pressed={theme === th.id}
              >
                <span
                  className="inline-block h-3 w-3 rounded-full border border-white/20"
                  style={{ backgroundColor: th.hex }}
                />
                {t(`theme.${th.id}`)}
              </button>
            ))}
          </div>
        </div>

        {/* accessory 排 */}
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
            {t('accessoryLabel')}
          </div>
          <div className="flex flex-wrap gap-2">
            {BUDDY_ACCESSORIES.map((a) => (
              <button
                key={a.id ?? 'none'}
                onClick={() => setAccessory(a.id)}
                className={`${btnBase} ${accessory === a.id ? btnOn : btnIdle}`}
                aria-pressed={accessory === a.id}
              >
                {a.emoji} {a.id === null ? t('accessory.none') : t(`accessory.${a.id}`)}
              </button>
            ))}
          </div>
        </div>

        {/* 开关 + 输入框 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
          {/* isGlowing */}
          <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={isGlowing}
              onChange={(e) => setIsGlowing(e.target.checked)}
              className="h-4 w-4 accent-pink-500"
            />
            {t('glowing')}
          </label>

          {/* speech */}
          <div className="flex gap-2">
            <input
              type="text"
              value={speech}
              onChange={(e) => setSpeech(e.target.value)}
              placeholder={t('speechPlaceholder')}
              className="flex-1 rounded-md border border-zinc-700 bg-zinc-900/60 px-2 py-1 text-sm text-zinc-200 placeholder:text-zinc-600"
            />
          </div>

          {/* sign */}
          <input
            type="text"
            value={signText}
            onChange={(e) => setSignText(e.target.value)}
            placeholder={t('signPlaceholder')}
            className="rounded-md border border-zinc-700 bg-zinc-900/60 px-2 py-1 text-sm text-zinc-200 placeholder:text-zinc-600"
          />
        </div>
      </section>

      {/* ── 舞台 ── */}
      <section
        aria-label="Buddy stage"
        className={`rounded-2xl mb-6 p-6 sm:p-10 flex flex-col items-center justify-center min-h-[300px] sm:min-h-[400px] transition-colors ${
          stageBg === 'cosmic' ? 'cosmic-glow' : 'bg-white'
        }`}
      >
        {/* 背景切换按钮（K3 修正 2） */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setStageBg('cosmic')}
            className={`${btnBase} ${stageBg === 'cosmic' ? btnOn : btnIdle}`}
            aria-pressed={stageBg === 'cosmic'}
          >
            🌌 {t('stageCosmic')}
          </button>
          <button
            onClick={() => setStageBg('white')}
            className={`${btnBase} ${stageBg === 'white' ? btnOn : btnIdle}`}
            aria-pressed={stageBg === 'white'}
          >
            ⬜ {t('stageWhite')}
          </button>
        </div>

        <BuddyAvatar
          state={state}
          theme={theme}
          accessory={accessory}
          isGlowing={isGlowing}
          mood={{ emoji: '💬', speech }}
          signText={signText}
          size={220}
        />
      </section>

      {/* ── 资产墙 ── */}
      <section aria-label="Asset audit" className="glass-card rounded-2xl p-4 sm:p-6">
        <div className="flex items-baseline justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-lg sm:text-xl font-bold text-zinc-100">
            🖼️ {t('assetWallTitle')}
          </h2>
          <span className="text-xs text-zinc-500">
            {t('assetWallCount', { count: ASSET_AUDIT.length })}
          </span>
        </div>

        {ASSET_CATEGORIES.map((cat) => {
          const items = ASSET_AUDIT.filter((a) => a.category === cat.id)
          if (items.length === 0) return null
          return (
            <div key={cat.id} className="mb-6 last:mb-0">
              <h3 className="text-sm font-semibold text-zinc-300 mb-2 flex items-center gap-2">
                <span aria-hidden="true">{cat.emoji}</span>
                {t(`category.${cat.i18nKey}`)}
                <span className="text-xs font-normal text-zinc-500">({items.length})</span>
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {items.map((entry) => (
                  <figure
                    key={entry.file}
                    className="flex flex-col items-center gap-1 p-2 rounded-md border border-zinc-800/60 bg-zinc-900/40"
                  >
                    <div className="relative h-16 w-16 flex items-center justify-center">
                      <img
                        src={`/pets/${entry.file}`}
                        alt={entry.file}
                        width={64}
                        height={64}
                        loading="lazy"
                        decoding="async"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                    <figcaption className="text-[10px] text-zinc-500 text-center truncate w-full" title={entry.file}>
                      {entry.file}
                    </figcaption>
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded border ${riskColor(entry)}`}
                    >
                      {riskText(entry)}
                    </span>
                  </figure>
                ))}
              </div>
            </div>
          )
        })}
      </section>
    </div>
  )
}
