'use client'

/**
 * FocusClient — Focus Mode（番茄钟 + 像素公仔陪伴）
 *
 * 交互（docs/focus-mode-spec.md §2 MVP）:
 *   1. 选时长：15/25 免费；45/60 🔒 Plus → /[locale]/pricing
 *      （MVP 简化：membership 查询未接入前，45/60 一律锁定）
 *   2. 计时器：endAt timestamp 校正（防后台漂移），
 *      document.title 同步倒计时，切标签也能看到时间
 *   3. document.visibilitychange 干扰检测：
 *        · 切走 >30s  → 公仔换 sleeping 表情 + "我等你回来…"
 *        · 切走 >5min → 本次标记 interrupted（不计 streak）
 *        · 回来       → 恢复 working + "欢迎回来"
 *      永远温柔：中断不惩罚、不批评。
 *   4. 完成：success 帧动画 + 彩带 + streak 显示 + "再来一轮"
 *   5. streak：localStorage（togthr.focus.*）为主，
 *      POST /api/focus/complete 落库为增强 — 失败静默降级，不阻塞 UI
 */

import { useEffect, useMemo, useRef, useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { Lock, RotateCcw } from 'lucide-react'
import { EmotionParticles } from '@/components/shared/EmotionParticles'
import { SafeImage } from '@/components/shared/SafeImage'
import styles from './focus.module.css'

type Phase = 'select' | 'running' | 'complete'

const FREE_MINUTES = [15, 25]
const PLUS_MINUTES = [45, 60]
/** 切走超过 30s → 公仔"我等你回来…" */
const AWAY_NOTICE_MS = 30_000
/** 切走超过 5min → 本次标记 interrupted（不计 streak，不惩罚） */
const INTERRUPT_MS = 5 * 60_000
const PHRASE_COUNT = 4

const LS_KEYS = {
  streak: 'togthr.focus.streak',
  lastDate: 'togthr.focus.lastDate',
  totalMinutes: 'togthr.focus.totalMinutes',
  totalSessions: 'togthr.focus.totalSessions',
} as const

/** 用户本地日 YYYY-MM-DD（streak 按本地日结算） */
function localDateString(d = new Date()): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function readLocalStreak(): { streak: number; lastDate: string | null } {
  try {
    const streak =
      Number.parseInt(window.localStorage.getItem(LS_KEYS.streak) ?? '0', 10) || 0
    const lastDate = window.localStorage.getItem(LS_KEYS.lastDate)
    return { streak, lastDate }
  } catch {
    // localStorage 不可用（隐私模式）— 视为 0
    return { streak: 0, lastDate: null }
  }
}

/** 完成一次 ≥15min 专注 → streak +1；同日重复完成不加，跨天断签归零重来 */
function bumpLocalStreak(minutes: number): number {
  try {
    const today = localDateString()
    const yesterday = localDateString(new Date(Date.now() - 86_400_000))
    const { streak, lastDate } = readLocalStreak()
    const next =
      lastDate === today ? streak : lastDate === yesterday ? streak + 1 : 1
    window.localStorage.setItem(LS_KEYS.streak, String(next))
    window.localStorage.setItem(LS_KEYS.lastDate, today)
    const prevMin =
      Number.parseInt(window.localStorage.getItem(LS_KEYS.totalMinutes) ?? '0', 10) || 0
    const prevSessions =
      Number.parseInt(window.localStorage.getItem(LS_KEYS.totalSessions) ?? '0', 10) || 0
    window.localStorage.setItem(LS_KEYS.totalMinutes, String(prevMin + minutes))
    window.localStorage.setItem(LS_KEYS.totalSessions, String(prevSessions + 1))
    return next
  } catch {
    return 0
  }
}

/** 完成态彩带 — 纯 CSS 动画的彩色纸屑 */
function Confetti() {
  const pieces = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        left: Math.random() * 100,
        delay: Math.random() * 0.8,
        dur: 1.8 + Math.random() * 1.6,
        size: 6 + Math.random() * 6,
        color: ['#f472b6', '#a78bfa', '#fbbf24', '#34d399', '#60a5fa'][i % 5],
      })),
    [],
  )
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((p, i) => (
        <span
          key={i}
          className={styles.confetti}
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              background: p.color,
              '--delay': `${p.delay}s`,
              '--dur': `${p.dur}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  )
}

export default function FocusClient({ locale }: { locale: string }) {
  const t = useTranslations('focus')
  const prefersReduced = useReducedMotion()

  const [phase, setPhase] = useState<Phase>('select')
  const [selected, setSelected] = useState(25)
  const [minutes, setMinutes] = useState(25)
  const [remaining, setRemaining] = useState(0)
  const [away, setAway] = useState(false)
  const [welcomeBack, setWelcomeBack] = useState(false)
  const [interrupted, setInterrupted] = useState(false)
  const [interruptions, setInterruptions] = useState(0)
  const [streak, setStreak] = useState(0)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [mounted, setMounted] = useState(false)

  const endAtRef = useRef(0)
  const awaySinceRef = useRef<number | null>(null)
  const awayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const welcomeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const originalTitleRef = useRef('')
  const minutesRef = useRef(minutes)
  const interruptedRef = useRef(interrupted)
  const interruptionsRef = useRef(interruptions)
  minutesRef.current = minutes
  interruptedRef.current = interrupted
  interruptionsRef.current = interruptions

  /* ── mount：读取 localStorage streak + 记住原始 title ── */
  useEffect(() => {
    originalTitleRef.current = document.title
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount 时同步 localStorage 状态
    setStreak(readLocalStreak().streak)
    setMounted(true)
    return () => {
      document.title = originalTitleRef.current
    }
  }, [])

  /* ── 完成处理：streak + 落库（失败静默降级） ── */
  const handleCompleteRef = useRef<() => void>(() => {})
  handleCompleteRef.current = () => {
    const m = minutesRef.current
    const wasInterrupted = interruptedRef.current
    // 永远温柔：中断的session不计 streak，但也不清零
    const nextStreak = wasInterrupted ? readLocalStreak().streak : bumpLocalStreak(m)
    setStreak(nextStreak)
    setAway(false)
    setWelcomeBack(false)
    setPhase('complete')
    document.title = originalTitleRef.current

    // 落库为增强 — API 失败 / 未登录 / 表不存在都静默降级到 localStorage
    fetch('/api/focus/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        plannedMinutes: m,
        actualSeconds: m * 60,
        status: wasInterrupted ? 'interrupted' : 'completed',
        interruptions: interruptionsRef.current,
        clientDate: localDateString(),
      }),
    }).catch(() => {
      // 静默降级 — localStorage 已是真值，不阻塞 UI
    })
  }

  /* ── 计时器：timestamp 校正防后台漂移 + document.title 同步 ── */
  useEffect(() => {
    if (phase !== 'running') return
    const tick = () => {
      const rem = Math.max(0, Math.round((endAtRef.current - Date.now()) / 1000))
      setRemaining(rem)
      const mm = String(Math.floor(rem / 60)).padStart(2, '0')
      const ss = String(rem % 60).padStart(2, '0')
      document.title = `${mm}:${ss} · ${t('title')}`
      if (rem <= 0) handleCompleteRef.current()
    }
    tick()
    const id = setInterval(tick, 250)
    return () => clearInterval(id)
  }, [phase, t])

  /* ── 干扰检测：切走 >30s 公仔"我等你回来"，>5min 标记 interrupted ── */
  useEffect(() => {
    if (phase !== 'running') return
    const onVisibility = () => {
      if (document.hidden) {
        awaySinceRef.current = Date.now()
        return
      }
      const since = awaySinceRef.current
      awaySinceRef.current = null
      if (!since) return
      const awayMs = Date.now() - since
      if (awayMs < AWAY_NOTICE_MS) return

      setInterruptions((n) => n + 1)
      if (awayMs >= INTERRUPT_MS) setInterrupted(true)

      // 先趴着"我等你回来…"，3s 后恢复 working + 欢迎回来（永远温柔）
      setAway(true)
      if (awayTimerRef.current) clearTimeout(awayTimerRef.current)
      awayTimerRef.current = setTimeout(() => {
        setAway(false)
        setWelcomeBack(true)
        if (welcomeTimerRef.current) clearTimeout(welcomeTimerRef.current)
        welcomeTimerRef.current = setTimeout(() => setWelcomeBack(false), 4000)
      }, 3000)
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [phase])

  /* ── 陪伴文案轮换（12s 一句） ── */
  useEffect(() => {
    if (phase !== 'running' || away) return
    const id = setInterval(() => setPhraseIndex((i) => (i + 1) % PHRASE_COUNT), 12_000)
    return () => clearInterval(id)
  }, [phase, away])

  const start = (m: number) => {
    setMinutes(m)
    endAtRef.current = Date.now() + m * 60_000
    setRemaining(m * 60)
    setInterrupted(false)
    setInterruptions(0)
    setPhraseIndex(0)
    setAway(false)
    setWelcomeBack(false)
    setPhase('running')
  }

  const giveUp = () => {
    setPhase('select')
    document.title = originalTitleRef.current
  }

  const mm = String(Math.floor(remaining / 60)).padStart(2, '0')
  const ss = String(remaining % 60).padStart(2, '0')
  const companionText = away
    ? t('awayNotice')
    : welcomeBack
      ? t('welcomeBack')
      : t(`phrase${phraseIndex + 1}`)

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0B0B1A] px-4 py-16 text-zinc-100">
      {/* 背景：极淡星尘粒子（intensity 0.2，不抢戏） */}
      <EmotionParticles
        kinds={['star', 'dust']}
        intensity={0.2}
        interactive={false}
        className="pointer-events-none absolute inset-0 z-[1]"
      />

      {phase === 'select' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-[2] flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
        >
          {/* 公仔 idle 态迎接 */}
          <div className="flex h-40 items-center justify-center">
            <div className={`${styles.sprite} ${styles.idle}`} aria-hidden="true" />
          </div>

          <div className="text-center">
            <h1 className="bg-linear-to-r from-amber-200 via-rose-200 to-purple-200 bg-clip-text text-3xl font-bold text-transparent">
              {t('title')}
            </h1>
            <p className="mt-2 text-sm text-zinc-400">{t('subtitle')}</p>
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-zinc-500">
            {t('chooseDuration')}
          </p>

          {/* 时长选择：15/25 免费，45/60 🔒 Plus */}
          <div className="grid w-full grid-cols-4 gap-2">
            {FREE_MINUTES.map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => setSelected(m)}
                className={`rounded-2xl border px-3 py-3 text-sm font-semibold transition-colors ${
                  selected === m
                    ? 'border-purple-400/60 bg-purple-500/20 text-purple-200'
                    : 'border-zinc-700/50 bg-zinc-800/50 text-zinc-300 hover:border-zinc-500'
                }`}
              >
                {t('minutes', { minutes: m })}
              </button>
            ))}
            {PLUS_MINUTES.map((m) => (
              <Link
                key={m}
                href={`/${locale}/pricing`}
                className="flex flex-col items-center justify-center gap-1 rounded-2xl border border-amber-500/20 bg-zinc-800/30 px-3 py-3 text-sm font-semibold text-zinc-500 transition-colors hover:border-amber-400/40 hover:text-amber-300"
              >
                <span className="flex items-center gap-1">
                  <Lock className="h-3 w-3" aria-hidden="true" />
                  {t('minutes', { minutes: m })}
                </span>
              </Link>
            ))}
          </div>
          <p className="-mt-3 text-center text-[11px] text-zinc-500">{t('lockedPlus')}</p>

          <motion.span
            whileHover={prefersReduced ? undefined : { scale: 1.04 }}
            whileTap={prefersReduced ? undefined : { scale: 0.96 }}
          >
            <button
              type="button"
              onClick={() => start(selected)}
              className="inline-flex h-12 items-center rounded-full bg-linear-to-r from-rose-500 via-purple-500 to-indigo-500 px-8 text-sm font-semibold text-white shadow-[0_0_36px_rgba(168,85,247,0.4)] transition-shadow hover:shadow-[0_0_52px_rgba(168,85,247,0.6)]"
            >
              {t('start')}
            </button>
          </motion.span>

          {mounted && streak > 0 && (
            <p className="text-xs text-amber-300/80">🔥 {t('streak', { days: streak })}</p>
          )}
        </motion.div>
      )}

      {phase === 'running' && (
        <div className="relative z-[2] flex flex-col items-center gap-8">
          {/* 剩余时间 — 大字号等宽数字 */}
          <p
            className="font-mono text-7xl font-bold tabular-nums tracking-tight text-zinc-100 sm:text-8xl"
            role="timer"
            aria-live="off"
          >
            {mm}:{ss}
          </p>

          {/* 公仔：working 帧 + 呼吸光环；切走时换 sleeping 表情 */}
          <div className="relative flex h-64 w-64 items-center justify-center">
            <div
              aria-hidden="true"
              className={`absolute h-56 w-56 rounded-full bg-purple-500/25 blur-3xl ${prefersReduced ? '' : styles.glow}`}
            />
            {away ? (
              <SafeImage
                src="/pets/expression-sleeping.png"
                alt=""
                fallback="😴"
                className="h-40 w-40 object-contain"
                fallbackClassName="flex h-40 w-40 items-center justify-center text-8xl"
              />
            ) : (
              <div className={`${styles.sprite} ${styles.working}`} aria-hidden="true" />
            )}
          </div>

          {/* 陪伴文案（轮换 / 等你回来 / 欢迎回来） */}
          <motion.p
            key={companionText}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-xs text-center text-sm text-zinc-300/90"
          >
            {companionText}
          </motion.p>

          {/* 放弃本次（小字、不显眼） */}
          <button
            type="button"
            onClick={giveUp}
            className="text-xs text-zinc-600 underline-offset-4 transition-colors hover:text-zinc-400 hover:underline"
          >
            {t('giveUp')}
          </button>
        </div>
      )}

      {phase === 'complete' && (
        <div className="absolute inset-0 z-[2] flex items-center justify-center">
          <Confetti />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
            className="relative flex w-full max-w-md flex-col items-center gap-6 rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-xl"
          >
            {/* 公仔 success 帧 */}
            <div className="flex h-40 items-center justify-center">
              <div className={`${styles.sprite} ${styles.success}`} aria-hidden="true" />
            </div>

            <div className="text-center">
              <h2 className="bg-linear-to-r from-amber-200 via-rose-200 to-purple-200 bg-clip-text text-3xl font-bold text-transparent">
                {t('completeTitle')}
              </h2>
              <p className="mt-2 text-sm text-zinc-300">
                {t('completeDesc', { minutes })}
              </p>
              {interrupted && (
                <p className="mt-2 text-xs text-zinc-500">{t('interruptedNote')}</p>
              )}
            </div>

            {streak > 0 && (
              <p className="rounded-full border border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-sm font-semibold text-amber-300">
                🔥 {t('streak', { days: streak })}
              </p>
            )}

            <motion.span
              whileHover={prefersReduced ? undefined : { scale: 1.04 }}
              whileTap={prefersReduced ? undefined : { scale: 0.96 }}
            >
              <button
                type="button"
                onClick={giveUp}
                className="inline-flex h-12 items-center gap-2 rounded-full bg-linear-to-r from-rose-500 via-purple-500 to-indigo-500 px-8 text-sm font-semibold text-white shadow-[0_0_36px_rgba(168,85,247,0.4)] transition-shadow hover:shadow-[0_0_52px_rgba(168,85,247,0.6)]"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                {t('again')}
              </button>
            </motion.span>
          </motion.div>
        </div>
      )}
    </div>
  )
}
