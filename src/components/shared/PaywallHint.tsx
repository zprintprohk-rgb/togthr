'use client'

/**
 * PaywallHint — 被动付费提示（非 pushy 气泡）
 *
 * 触发: 用户点击 locked 皮肤 → 显示气泡
 *    "你的小伙伴想换上新衣服啦 ✨"
 *    [去看看] [继续用免费的]
 *
 * 约束:
 *   - 每日最多触发 2 次 (localStorage 计数)
 *   - 不使用全屏弹窗
 *   - 不催促、不焦虑
 */

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { track } from '@/lib/analytics'
import Link from 'next/link'

interface PaywallHintProps {
  /** 是否显示 */
  show: boolean
  /** 关闭回调 */
  onClose: () => void
  /** i18n 文案 */
  copy: {
    title: string
    cta: string
    dismiss: string
  }
  /** 跳转链接 */
  href: string
  className?: string
  /** 稳定宠物标识（analytics 用，可选） */
  petId?: string
}

const DAILY_LIMIT = 2

function getDailyCount(): number {
  try {
    const raw = localStorage.getItem('togthr.paywallHint.count')
    if (!raw) return 0
    const { date, count } = JSON.parse(raw)
    const today = new Date().toDateString()
    if (date !== today) return 0
    return count as number
  } catch {
    return 0
  }
}

function incrementDailyCount(): number {
  const today = new Date().toDateString()
  const count = getDailyCount() + 1
  try {
    localStorage.setItem(
      'togthr.paywallHint.count',
      JSON.stringify({ date: today, count }),
    )
  } catch { /* noop */ }
  return count
}

export function PaywallHint({
  show,
  onClose,
  copy,
  href,
  className,
  petId,
}: PaywallHintProps) {
  const [canShow, setCanShow] = useState(true)

  useEffect(() => {
    if (show) {
      const count = incrementDailyCount()
      if (count > DAILY_LIMIT) {
        setCanShow(false)
      } else {
        // Funnel: hint is actually displayed (within daily limit)
        track('paywall_hint_shown', { pet_id: petId ?? 'unknown' })
      }
    }
  }, [show, petId])

  if (!canShow) return null

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 12, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className={cn(
            'relative z-30 flex flex-col gap-3 rounded-2xl border border-amber-300/30',
            'bg-linear-to-br from-[#1a0b1f] via-[#0f0820] to-[#0a0418]',
            'p-4 shadow-2xl backdrop-blur-xl',
            'max-w-[280px]',
            className,
          )}
          role="dialog"
          aria-label={copy.title}
        >
          {/* 箭头指向 */}
          <div className="absolute -top-2 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-amber-300/30 bg-[#1a0b1f]" />

          {/* 表情 */}
          <p className="text-center text-3xl" aria-hidden="true">
            ✨
          </p>

          {/* 标题 */}
          <p className="text-center text-sm font-medium text-zinc-200">
            {copy.title}
          </p>

          {/* 按钮组 */}
          <div className="flex flex-col gap-2">
            <Link
              href={href}
              onClick={onClose}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-linear-to-r from-fuchsia-500 via-purple-500 to-indigo-500 px-4 py-2 text-xs font-semibold text-white shadow-lg transition-shadow hover:shadow-fuchsia-500/40"
            >
              <span>✨</span>
              {copy.cta}
              <span>→</span>
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-200"
            >
              {copy.dismiss}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
