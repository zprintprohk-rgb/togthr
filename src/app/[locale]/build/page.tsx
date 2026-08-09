// src/app/[locale]/build/page.tsx
//
// Togthr Buddy Module 2 — /build 建造仪式（K3 规范 v1.0 + 千问 v1.1）
//
// 3 步流程：① 外形选择（6 色 × 8 配饰）→ ② 身份赋予（名字 + 小事）→ ③ 揭晓
// 关键约束（千问 v1.1）：
//   - 'use client'（SSR 下禁读 localStorage）
//   - 所有 localStorage 操作在 useEffect 中
//   - 揭晓后 500ms 延迟确保 GA4 build_complete 发送
//   - 数据存 localStorage key='togthr_buddy'
// GA4: build_start（进入）/ build_complete（揭晓）

'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import BuddyAvatar, { type BuddyAccessory, type BuddyState } from '@/components/buddy/BuddyAvatar'
import type { BuddyTheme } from '@/lib/image-utils'
import { trackBuildStart, trackBuildComplete } from '@/lib/analytics'

const THEMES: BuddyTheme[] = ['lavender', 'mint', 'sakura', 'moonlight', 'warm', 'charcoal']
const ACCESSORIES: (BuddyAccessory | 'none')[] = ['none', 'scarf', 'bell', 'star', 'moon', 'leaf', 'note', 'heart']
const ACC_KEY: Record<string, string> = {
  none: 'noAccessory',
  scarf: 'accessoryScarf',
  bell: 'accessoryBell',
  star: 'accessoryStar',
  moon: 'accessoryMoon',
  leaf: 'accessoryLeaf',
  note: 'accessoryNote',
  heart: 'accessoryHeart',
}
const MEMORY_PRESETS = [
  '🌧️ 雨天听爵士', '🍵 抹茶拿铁', '🚶 深夜散步', '🌅 海边日落', '📚 旧书店', '🐱 猫',
  '☕ 热可可', '🌟 星空', '🍂 落叶', '🏃 晨跑', '🧩 拼图', '✉️ 写信',
  '🧁 烘焙', '🌵 种多肉', '☁️ 看云', '🧹 整理房间', '☀️ 晒太阳',
]

export default function BuildPage() {
  const t = useTranslations('build')
  const router = useRouter()
  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [theme, setTheme] = useState<BuddyTheme>('lavender')
  const [accessory, setAccessory] = useState<BuddyAccessory>(null)
  const [name, setName] = useState('')
  const [memory, setMemory] = useState('')
  const [previewState, setPreviewState] = useState<BuddyState>('idle')
  const [revealed, setRevealed] = useState(false)

  // GA4: build_start（进入页面）
  useEffect(() => {
    trackBuildStart(document.documentElement.lang ?? 'en')
  }, [])

  // Step 2 名字输入时 greet 动画
  useEffect(() => {
    if (step === 2 && name.length > 0) {
      setPreviewState('greet')
      const tmr = setTimeout(() => setPreviewState('idle'), 1200)
      return () => clearTimeout(tmr)
    }
  }, [name, step])

  // Step 2 选小事时 success 动画
  useEffect(() => {
    if (step === 2 && memory) {
      setPreviewState('success')
      const tmr = setTimeout(() => setPreviewState('idle'), 1200)
      return () => clearTimeout(tmr)
    }
  }, [memory, step])

  // Step 3 揭晓动画
  useEffect(() => {
    if (step === 3 && !revealed) {
      const t1 = setTimeout(() => setRevealed(true), 400)
      // 数据持久化（localStorage 仅客户端）
      const buddyData = {
        name: name || 'Buddy',
        theme,
        accessory,
        memory: memory || null,
        createdAt: Date.now(),
        day: 1,
      }
      try {
        localStorage.setItem('togthr_buddy', JSON.stringify(buddyData))
      } catch { /* noop */ }
      // 500ms 延迟确保 GA4 事件发送（千问 v1.1）
      const t2 = setTimeout(() => {
        trackBuildComplete(document.documentElement.lang ?? 'en', 3)
      }, 500)
      return () => { clearTimeout(t1); clearTimeout(t2) }
    }
  }, [step, revealed, name, theme, accessory, memory])

  const canNext = step === 1 ? true : step === 2 ? name.trim().length > 0 : true

  return (
    <div data-dark-root className="min-h-screen bg-[#0B0B1A] text-zinc-100">
      <div className="mx-auto max-w-4xl px-4 py-12">
        {/* 进度条 */}
        <div className="mb-10 flex items-center justify-center gap-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`h-2 w-12 rounded-full transition-colors ${
                  step >= s ? 'bg-pink-500' : 'bg-zinc-700'
                }`}
              />
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="grid gap-10 md:grid-cols-2"
            >
              <div>
                <h1 className="text-2xl font-semibold">{t('step1Title')}</h1>
                {/* 颜色选择 */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  {THEMES.map((th) => (
                    <button
                      key={th}
                      onClick={() => setTheme(th)}
                      className={`h-20 rounded-2xl border transition-all ${
                        theme === th
                          ? 'scale-105 border-white/50 ring-2 ring-white/30'
                          : 'border-white/10 hover:scale-105'
                      }`}
                      style={{ backgroundColor: th === 'lavender' ? '#C4B5FD' : th === 'mint' ? '#6EE7B7' : th === 'sakura' ? '#F9A8D4' : th === 'moonlight' ? '#93C5FD' : th === 'warm' ? '#FDBA74' : '#6B7280' }}
                      aria-label={`theme-${th}`}
                    />
                  ))}
                </div>
                {/* 配饰选择 */}
                <div className="mt-6 grid grid-cols-4 gap-2">
                  {ACCESSORIES.map((acc) => (
                    <button
                      key={acc ?? 'none'}
                      onClick={() => setAccessory(acc === 'none' ? null : (acc as BuddyAccessory))}
                      className={`rounded-xl border px-2 py-3 text-xs transition-all ${
                        (acc === 'none' ? accessory === null : accessory === acc)
                          ? 'border-pink-400/60 bg-pink-500/10 text-pink-200'
                          : 'border-white/10 text-zinc-400 opacity-60 hover:opacity-100'
                      }`}
                    >
                      {t(ACC_KEY[acc ?? 'none'])}
                    </button>
                  ))}
                </div>
              </div>
              {/* 实时预览 */}
              <div className="flex flex-col items-center justify-center rounded-3xl border border-white/10 bg-zinc-900/40 p-8">
                <BuddyAvatar state="breath" theme={theme} accessory={accessory} size={160} isGlowing />
                <p className="mt-6 text-sm text-zinc-400">{t('step1Hint')}</p>
              </div>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="flex flex-col items-center"
            >
              <BuddyAvatar state={previewState} theme={theme} accessory={accessory} size={120} isGlowing />
              <h1 className="mt-6 text-2xl font-semibold">{t('step2Title')}</h1>
              <input
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, 12))}
                placeholder={t('namePlaceholder')}
                maxLength={12}
                className="mt-6 w-full max-w-md rounded-xl border border-white/10 bg-zinc-800/50 px-4 py-3 text-center text-lg outline-none focus:border-pink-400/60"
              />
              <p className="mt-2 text-xs text-zinc-500">{name.length}/12</p>
              <p className="mt-8 text-sm text-zinc-400">{t('nameLabel')}</p>
              <div className="mt-4 grid w-full max-w-md grid-cols-3 gap-2">
                {MEMORY_PRESETS.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMemory(memory === m ? '' : m)}
                    className={`rounded-full border px-3 py-2 text-xs transition-all ${
                      memory === m ? 'border-pink-400/60 bg-pink-500/15 text-pink-100' : 'border-white/10 text-zinc-400 hover:border-white/30'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center py-12"
            >
              {/* 揭晓动画 */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={revealed ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.8, ease: 'backOut' }}
              >
                <BuddyAvatar
                  state={revealed ? 'greet' : 'sleep'}
                  theme={theme}
                  accessory={accessory}
                  name={name || 'Buddy'}
                  size={200}
                  isGlowing
                />
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={revealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-8 text-3xl font-bold"
              >
                {name || 'Buddy'}
              </motion.h1>
              {memory && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={revealed ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="mt-3 rounded-full border border-pink-400/40 bg-pink-500/10 px-4 py-1 text-sm text-pink-200"
                >
                  {memory}
                </motion.p>
              )}
              <motion.p
                initial={{ opacity: 0 }}
                animate={revealed ? { opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="mt-2 text-sm text-zinc-500"
              >
                {t('step3Day1')}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={revealed ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.0 }}
                className="mt-10 flex gap-4"
              >
                <button
                  onClick={() => router.push(`/${document.documentElement.lang || 'en'}/companion`)}
                  className="rounded-xl bg-pink-500 px-8 py-3 text-sm font-semibold text-white hover:bg-pink-400"
                >
                  {t('startCaring')}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 底部导航按钮 */}
        {step < 3 && (
          <div className="fixed inset-x-0 bottom-0 border-t border-white/10 bg-[#0B0B1A]/90 p-4 backdrop-blur">
            <div className="mx-auto flex max-w-4xl justify-end">
              {step > 1 && (
                <button
                  onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                  className="mr-3 rounded-xl border border-white/15 px-6 py-3 text-sm text-zinc-300 hover:bg-white/5"
                >
                  ←
                </button>
              )}
              <button
                onClick={() => setStep((s) => (s + 1) as 1 | 2 | 3)}
                disabled={!canNext}
                className="rounded-xl bg-pink-500 px-8 py-3 text-sm font-semibold text-white hover:bg-pink-400 disabled:opacity-40"
              >
                {step === 1 ? t('next') : t('reveal')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
