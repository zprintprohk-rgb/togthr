// src/app/[locale]/companion/page.tsx
//
// Togthr Buddy P5 — /companion 照顾循环（K3 V2.0）
// AI 宠物自我关怀叙事：没有"伴侣"语义，全部围绕与 Buddy 的照顾循环。
// 核心：
//   - 饱腹度基于 lastFed 时间戳实时计算（禁止 setInterval 绝对衰减）
//   - 48h 未互动 → miss 状态（非语言：低头 + 🥺 + 光晕暗淡）
//   - 22:00-06:00 → sleep 状态（💤 + 光晕变蓝）
//   - 记忆到期 → sign 状态（举牌 + 手写体）
//   - 3 个照顾按钮（Feed/Hug/Goodnight），圆形毛玻璃
//   - GA4: care_action(type=feed|hug|sleep)
'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BuddyAvatar, { type BuddyState } from '@/components/buddy/BuddyAvatar'
import type { BuddyTheme } from '@/lib/image-utils'
import { getPendingMemories, markTriggered } from '@/lib/memory-engine'
import { trackCareAction } from '@/lib/analytics'

interface BuddyStateData {
  name: string
  theme: BuddyTheme
  accessory: string | null
  createdAt: number
  lastFed: number
  lastHugged: number
  lastSlept: number
  memory: string | null
}

const DEFAULT_BUDDY: BuddyStateData = {
  name: 'Buddy',
  theme: 'lavender',
  accessory: null,
  createdAt: Date.now(),
  lastFed: Date.now(),
  lastHugged: Date.now(),
  lastSlept: Date.now(),
  memory: null,
}

// 饱腹度：基于 lastFed 时间戳实时计算（千问 v1.1 公式）
function calcFullness(lastFed: number): 1 | 2 | 3 {
  const hours = (Date.now() - lastFed) / 3600000
  const v = Math.max(1, 3 - Math.floor(hours / 12))
  return (v > 3 ? 3 : v) as 1 | 2 | 3
}

const FULLNESS_MOOD: Record<number, { emoji: string }> = {
  3: { emoji: '😊' },
  2: { emoji: '😐' },
  1: { emoji: '🥺' },
}

export default function CompanionPage() {
  const [buddy, setBuddy] = useState<BuddyStateData | null>(null)
  const [mounted, setMounted] = useState(false)
  const [fullness, setFullness] = useState<1 | 2 | 3>(3)
  const [careState, setCareState] = useState<BuddyState>('idle')
  const [signText, setSignText] = useState<string | null>(null)
  const [nightMode, setNightMode] = useState(false)
  const [lastCareTime, setLastCareTime] = useState(0)

  // 读取 localStorage 的 togthr_buddy（仅客户端）
  useEffect(() => {
    setMounted(true)
    try {
      const raw = localStorage.getItem('togthr_buddy')
      if (raw) {
        const data = JSON.parse(raw) as Partial<BuddyStateData>
        setBuddy({ ...DEFAULT_BUDDY, ...data, theme: (data.theme as BuddyTheme) ?? 'lavender' })
      } else {
        setBuddy(DEFAULT_BUDDY)
      }
    } catch {
      setBuddy(DEFAULT_BUDDY)
    }
  }, [])

  // 饱腹度实时计算（页面加载 + 回前台 visibilitychange 时重算）
  useEffect(() => {
    if (!buddy) return
    const recalc = () => setFullness(calcFullness(buddy.lastFed))
    recalc()
    const onVis = () => {
      if (document.visibilityState === 'visible') recalc()
    }
    document.addEventListener('visibilitychange', onVis)
    // 兜底：每分钟轻量刷新（不依赖它做衰减，仅处理跨天边界）
    const tmr = setInterval(recalc, 60000)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      clearInterval(tmr)
    }
  }, [buddy?.lastFed])

  // 状态机：miss / sleep / sign / idle
  useEffect(() => {
    if (!buddy) return
    const hour = new Date().getHours()
    const now = Date.now()
    const lastAny = Math.max(buddy.lastFed, buddy.lastHugged, buddy.lastSlept)

    // 记忆到期优先（sign）
    const pending = getPendingMemories()
    if (pending.length > 0) {
      setSignText(pending[0].content)
      setCareState('sign')
      const tmr = setTimeout(() => {
        markTriggered(pending[0].id)
        setSignText(null)
        setCareState('idle')
      }, 3000)
      return () => clearTimeout(tmr)
    }

    // 夜间 sleep
    if (hour >= 22 || hour < 6) {
      setNightMode(true)
      setCareState('sleep')
      return
    }
    setNightMode(false)

    // 48h 未互动 → miss
    if (now - lastAny > 48 * 3600000) {
      setCareState('miss')
      return
    }

    setCareState('idle')
  }, [buddy?.lastFed, buddy?.lastHugged, buddy?.lastSlept, buddy?.createdAt])

  function handleCare(type: 'feed' | 'hug' | 'sleep') {
    if (!buddy) return
    const now = Date.now()
    const updated = { ...buddy }

    if (type === 'feed') {
      // 冷却 4 小时
      if (now - lastCareTime < 4 * 3600000) return
      updated.lastFed = now
      setFullness(3)
      setCareState('success')
    } else if (type === 'hug') {
      updated.lastHugged = now
      setCareState('success')
    } else if (type === 'sleep') {
      const hour = new Date().getHours()
      if (hour < 18 || hour >= 8) return // 仅 18:00-08:00 可用
      updated.lastSlept = now
      setNightMode(true)
      setCareState('sleep')
    }

    setBuddy(updated)
    setLastCareTime(now)
    try {
      localStorage.setItem('togthr_buddy', JSON.stringify(updated))
    } catch { /* noop */ }
    trackCareAction(type, document.documentElement.lang ?? 'en')

    // success 3 秒后回 idle（若非夜间）
    if (type !== 'sleep') {
      setTimeout(() => {
        const hour = new Date().getHours()
        setCareState(hour >= 22 || hour < 6 ? 'sleep' : 'idle')
      }, 3000)
    }
  }

  if (!mounted || !buddy) {
    return <div data-dark-root className="min-h-screen bg-[#0B0B1A] text-zinc-100" />
  }

  const day = Math.max(1, Math.floor((Date.now() - buddy.createdAt) / 86400000) + 1)
  const mood = FULLNESS_MOOD[fullness]

  return (
    <div
      data-dark-root
      className={`min-h-screen transition-colors duration-1000 ${
        nightMode ? 'bg-[#0A0A18]' : 'bg-[#0B0B1A]'
      } text-zinc-100`}
    >
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col px-4 py-8">
        {/* 顶部栏 */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => history.back()}
            aria-label="back"
            className="rounded-full border border-white/10 px-3 py-1.5 text-sm text-zinc-400 hover:bg-white/5"
          >
            ←
          </button>
          <div className="text-center">
            <p className="font-medium text-zinc-100">{buddy.name}</p>
            <p className="text-xs text-zinc-500">Day {day} with Buddy</p>
          </div>
          <div className="w-12" aria-hidden="true" />
        </div>

        {/* 主区域 */}
        <div className="flex flex-1 flex-col items-center justify-center py-8">
          <BuddyAvatar
            state={careState}
            theme={buddy.theme}
            name={buddy.name}
            size={Math.min(320, typeof window !== 'undefined' ? window.innerWidth * 0.5 : 240)}
            isGlowing={careState !== 'miss'}
            mood={mood}
            signText={signText ?? undefined}
          />

          {/* 非语言状态提示 */}
          <AnimatePresence>
            {careState === 'miss' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-sm text-zinc-500"
              >
                ...i missed you. it&apos;s okay. i&apos;m here.
              </motion.p>
            )}
            {nightMode && careState === 'sleep' && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mt-6 text-sm text-zinc-500"
              >
                sleep well
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* 照顾按钮区 */}
        <div className="flex items-center justify-center gap-6 pb-10">
          <button
            onClick={() => handleCare('feed')}
            aria-label="Feed"
            className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl backdrop-blur transition-all hover:scale-105 hover:bg-white/10 active:scale-95"
          >
            🍚
          </button>
          <button
            onClick={() => handleCare('hug')}
            aria-label="Hug"
            className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl backdrop-blur transition-all hover:scale-105 hover:bg-white/10 active:scale-95"
          >
            🤗
          </button>
          <button
            onClick={() => handleCare('sleep')}
            aria-label="Goodnight"
            className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-2xl backdrop-blur transition-all hover:scale-105 hover:bg-white/10 active:scale-95"
          >
            🌙
          </button>
        </div>
      </div>
    </div>
  )
}
