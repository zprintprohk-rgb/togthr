// src/components/buddy/BuddyAvatar.tsx
//
// Togthr Buddy Module 1 — 核心渲染组件（K3 规范 v1.0 + 千问优化 v1.1）
//
// 功能：渲染 Togthr Buddy 像素公仔
//   - 8 种动画状态（idle/breath/blink/greet/success/miss/sleep/sign）
//   - 6 色主题（Canvas source-atop 叠加）
//   - 8 种配饰（Canvas 2D 程序化绘制，无 PNG 切片）
//   - 情绪气泡（Framer Motion 淡入淡出，3s 自动消失）
//   - 外发光（CSS drop-shadow，颜色随主题）
//
// 性能（千问 v1.1）：
//   - 离屏缓存经 getProcessedAsset（Key = path-theme）
//   - 预加载下一帧，避免动画切换空白

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getProcessedAsset, preloadAsset, type BuddyTheme } from '@/lib/image-utils'

export type BuddyState =
  | 'idle'
  | 'breath'
  | 'blink'
  | 'greet'
  | 'success'
  | 'miss'
  | 'sleep'
  | 'sign'

export type BuddyAccessory = 'scarf' | 'bell' | 'star' | 'moon' | 'leaf' | 'note' | 'heart' | null

export interface BuddyAvatarProps {
  state: BuddyState
  theme: BuddyTheme
  accessory?: BuddyAccessory
  name?: string
  mood?: { emoji: string; speech?: string }
  isGlowing?: boolean
  signText?: string
  size?: number
}

// state → 资产文件映射（无 frame 参数的 state 用单帧）
const STATE_ASSETS: Record<BuddyState, string[]> = {
  idle: ['anim-idle-1.png', 'anim-idle-2.png'],
  breath: ['anim-breath.png'],
  blink: ['anim-blink.png'],
  greet: ['anim-greet-1.png', 'anim-greet-2.png', 'anim-greet-3.png', 'anim-greet-4.png'],
  success: ['anim-success-1.png', 'anim-success-2.png'],
  miss: ['anim-greet-4.png'],
  sleep: ['anim-idle-2.png'],
  sign: ['anim-idle-1.png'],
}

const GLOW_COLORS: Record<BuddyTheme, string> = {
  lavender: 'rgba(139,92,246,0.35)',
  mint: 'rgba(52,211,153,0.35)',
  sakura: 'rgba(244,114,182,0.35)',
  moonlight: 'rgba(96,165,250,0.35)',
  warm: 'rgba(251,146,60,0.35)',
  charcoal: 'rgba(148,163,184,0.35)',
}

const GLOW_STRONG: Record<BuddyTheme, string> = {
  lavender: 'rgba(139,92,246,0.6)',
  mint: 'rgba(52,211,153,0.6)',
  sakura: 'rgba(244,114,182,0.6)',
  moonlight: 'rgba(96,165,250,0.6)',
  warm: 'rgba(251,146,60,0.6)',
  charcoal: 'rgba(148,163,184,0.6)',
}

export default function BuddyAvatar({
  state,
  theme,
  accessory = null,
  name,
  mood,
  isGlowing = false,
  signText,
  size = 128,
}: BuddyAvatarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [assetUrl, setAssetUrl] = useState('')
  const [frameIdx, setFrameIdx] = useState(0)
  const [bubbleVisible, setBubbleVisible] = useState(false)

  // 帧动画循环（idle/breath 双帧，其余按序列）
  useEffect(() => {
    const frames = STATE_ASSETS[state]
    if (frames.length <= 1) {
      setFrameIdx(0)
      return
    }
    // idle/breath: 2 帧 800ms 循环；greet/success: 序列播放
    if (state === 'idle' || state === 'breath') {
      const id = setInterval(() => setFrameIdx((i) => (i + 1) % frames.length), 800)
      return () => clearInterval(id)
    }
    // 序列帧（greet/success）：每帧 300-400ms 循环播放
    const delay = state === 'success' ? 400 : 300
    const id = setInterval(() => setFrameIdx((i) => (i + 1) % frames.length), delay)
    return () => clearInterval(id)
  }, [state])

  // 加载当前帧资产（带缓存 + 主题叠加）
  useEffect(() => {
    const frames = STATE_ASSETS[state]
    const file = frames[Math.min(frameIdx, frames.length - 1)]
    const path = `/pets/${file}`
    // 预加载下一帧
    const nextFile = frames[(Math.min(frameIdx, frames.length - 1) + 1) % frames.length]
    preloadAsset(`/pets/${nextFile}`, theme)
    getProcessedAsset(path, theme)
      .then(setAssetUrl)
      .catch(() => setAssetUrl(path)) // 失败时 fallback 原图
  }, [state, frameIdx, theme])

  // 情绪气泡：mood.speech 存在时显示 3s 后淡出
  useEffect(() => {
    if (mood?.speech) {
      setBubbleVisible(true)
      const t = setTimeout(() => setBubbleVisible(false), 3000)
      return () => clearTimeout(t)
    }
    setBubbleVisible(false)
  }, [mood?.speech])

  // 配饰绘制（Canvas 2D 程序化）
  const drawAccessory = useCallback(
    (ctx: CanvasRenderingContext2D, w: number, h: number) => {
      if (!accessory) return
      const cx = w / 2
      const neckY = h * 0.62
      const themeDarker = 'rgba(0,0,0,0.2)'

      switch (accessory) {
        case 'scarf': {
          ctx.strokeStyle = themeDarker
          ctx.lineWidth = Math.max(2, w * 0.04)
          ctx.beginPath()
          ctx.moveTo(cx - w * 0.18, neckY)
          ctx.quadraticCurveTo(cx, neckY + h * 0.08, cx + w * 0.18, neckY)
          ctx.stroke()
          break
        }
        case 'bell': {
          ctx.fillStyle = '#FCD34D'
          ctx.beginPath()
          ctx.arc(cx, neckY + h * 0.05, w * 0.06, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = '#B45309'
          ctx.beginPath()
          ctx.arc(cx, neckY + h * 0.05, w * 0.015, 0, Math.PI * 2)
          ctx.fill()
          break
        }
        case 'star': {
          ctx.fillStyle = '#FCD34D'
          const r = w * 0.07
          const x = cx + w * 0.2, y = h * 0.25
          ctx.beginPath()
          for (let i = 0; i < 5; i++) {
            const ang = (i * 4 * Math.PI) / 5 - Math.PI / 2
            const px = x + r * Math.cos(ang)
            const py = y + r * Math.sin(ang)
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
          }
          ctx.closePath()
          ctx.fill()
          break
        }
        case 'moon': {
          ctx.fillStyle = '#FDE68A'
          const r = w * 0.07
          const x = cx + w * 0.2, y = h * 0.28
          ctx.beginPath()
          ctx.arc(x, y, r, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillStyle = 'rgba(0,0,0,0.15)'
          ctx.beginPath()
          ctx.arc(x + r * 0.35, y - r * 0.2, r * 0.85, 0, Math.PI * 2)
          ctx.fill()
          break
        }
        case 'leaf': {
          ctx.fillStyle = '#6EE7B7'
          ctx.beginPath()
          ctx.ellipse(cx + w * 0.2, h * 0.28, w * 0.05, w * 0.03, Math.PI / 4, 0, Math.PI * 2)
          ctx.fill()
          break
        }
        case 'note': {
          ctx.fillStyle = '#F472B6'
          const x = cx + w * 0.2, y = h * 0.28
          ctx.beginPath()
          ctx.arc(x, y, w * 0.02, 0, Math.PI * 2)
          ctx.fill()
          ctx.fillRect(x, y, w * 0.005, -h * 0.06)
          ctx.beginPath()
          ctx.arc(x + w * 0.025, y - h * 0.06, w * 0.02, 0, Math.PI * 2)
          ctx.fill()
          break
        }
        case 'heart': {
          ctx.fillStyle = '#F472B6'
          const x = cx + w * 0.2, y = h * 0.3
          const s = w * 0.04
          ctx.beginPath()
          ctx.moveTo(x, y + s)
          ctx.bezierCurveTo(x + s, y - s * 0.6, x + s * 2, y + s * 0.6, x, y + s * 2)
          ctx.bezierCurveTo(x - s * 2, y + s * 0.6, x - s, y - s * 0.6, x, y + s)
          ctx.fill()
          break
        }
      }
    },
    [accessory]
  )

  // 在 canvas 上叠加配饰
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawAccessory(ctx, canvas.width, canvas.height)
  }, [accessory, drawAccessory, assetUrl])

  const glow = isGlowing ? GLOW_STRONG[theme] : GLOW_COLORS[theme]

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      {/* 情绪气泡 */}
      <AnimatePresence>
        {bubbleVisible && mood?.speech && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute -top-14 left-1/2 -translate-x-1/2 rounded-lg border border-white/10 bg-slate-800/90 px-3 py-1.5 font-mono text-xs text-white"
          >
            {mood.speech}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 主图 */}
      <motion.div
        animate={
          state === 'breath' || state === 'idle'
            ? { scale: [1, 1.02, 1] }
            : state === 'success'
              ? { y: [0, -8, 0], scale: [1, 1.05, 1] }
              : state === 'miss'
                ? { y: [0, 4, 0] }
                : { scale: 1 }
        }
        transition={
          state === 'breath' || state === 'idle'
            ? { duration: 0.8, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }
            : { duration: 0.5, ease: 'easeInOut' }
        }
        style={{
          width: size,
          height: size,
          filter: `drop-shadow(0 0 ${isGlowing ? 20 : 12}px ${glow})`,
        }}
      >
        {assetUrl && (
          <img
            src={assetUrl}
            alt={name ? `${name} (Togthr Buddy)` : 'Togthr Buddy'}
            width={size}
            height={size}
            draggable={false}
            className="select-none"
          />
        )}
      </motion.div>

      {/* 配饰叠加层 */}
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      {/* 举牌文字（sign 状态） */}
      {state === 'sign' && signText && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border-2 border-slate-800 bg-white px-3 py-1 font-mono text-xs text-slate-800"
        >
          {signText}
        </motion.div>
      )}
    </div>
  )
}
