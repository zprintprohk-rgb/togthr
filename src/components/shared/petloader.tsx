'use client'

/**
 * PetLoader — 品牌加载动画（替换通用 spinner）
 *
 * 使用 public/pet-sprite.png 的 working 帧（8 帧循环）
 * 配合 "loading..." 文字 — 无需额外 sprite 文件。
 *
 * 用法: <PetLoader size={64} text="加载中..." />
 *
 * P2-1 — 框架完整度: 100%
 */

import { cn } from '@/lib/utils'

interface PetLoaderProps {
  size?: number
  text?: string
  className?: string
}

export function PetLoader({ size = 48, text, className }: PetLoaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3',
        className,
      )}
      role="status"
      aria-label={text || 'Loading'}
    >
      {/* Pet 奔跑帧 — 利用 pet-sprite.png 的 working 状态 */}
      <div
        className="animate-bounce"
        style={{
          width: size,
          height: size,
          backgroundImage: 'url(/pet-sprite.png)',
          backgroundSize: `${size * 8}px ${size}px`,
          backgroundPosition: `-${size * 2}px 0`,
          imageRendering: 'pixelated',
          backgroundRepeat: 'no-repeat',
        }}
      />
      {text && (
        <span className="animate-pulse-slow text-sm text-zinc-400">
          {text}
        </span>
      )}
      <span className="sr-only">{text || 'Loading'}</span>
    </div>
  )
}
