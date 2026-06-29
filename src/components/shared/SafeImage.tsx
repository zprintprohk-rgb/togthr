'use client'

/**
 * SafeImage — 带 404 fallback + 透明背景兜底的图片组件
 *
 * 用法:
 *   <SafeImage src="/pets/sticker-loveyou.png" alt="😍" fallback="🐣" className="..." />
 *
 * 行为:
 *   - 图片加载失败 → 显示 fallback 占位符（emoji / 文字 / 纯色）
 *   - 正常加载 → 标准 <img> 行为
 *   - a11y: 保留 alt，fallback 加 aria-label
 *
 * P-1 改进 (背景兜底):
 *   - 新增 `bgStyle` prop：传入 CSS 背景,套在 <img> 所在容器下
 *   - 默认 = radial-gradient 浅紫 spotlight,适配深色玻璃 UI
 *   - 解决: 新上传 / 未处理的 AI 白底图在 UI 中突兀,以及未来
 *           non-transparent PNG 仍能在深色 UI 温柔存在
 *   - 不影响现有调用方,默认行为温和
 */

import { useState } from 'react'
import { cn } from '@/lib/utils'

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  /** 加载失败时的占位内容: emoji / 文字 */
  fallback?: string
  /** fallback 容器 className */
  fallbackClassName?: string
  /**
   * <img> 所在容器的 CSS background.
   * 默认 = 浅紫 radial-gradient spotlight (适配深色玻璃 UI).
   * 传 'none' 则不加背景.
   * 配合透明 PNG 时不影响外观;非透明 PNG 提供柔和衬托.
   */
  bgStyle?: React.CSSProperties | 'none'
}

const DEFAULT_BG: React.CSSProperties = {
  backgroundImage:
    'radial-gradient(circle at 50% 45%, rgba(196, 181, 253, 0.12) 0%, rgba(167, 139, 250, 0.04) 35%, transparent 70%)',
}

export function SafeImage({
  src,
  alt = '',
  fallback = '🐣',
  fallbackClassName,
  className,
  bgStyle = DEFAULT_BG,
  ...imgProps
}: SafeImageProps) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div
        className={cn(
          'flex items-center justify-center text-2xl',
          fallbackClassName ?? className,
        )}
        style={bgStyle === 'none' ? undefined : (bgStyle ?? DEFAULT_BG)}
        role="img"
        aria-label={typeof alt === 'string' ? alt : 'Image placeholder'}
      >
        {fallback}
      </div>
    )
  }

  // 正常渲染:把 <img> 包一层有 bgStyle 的 div (透明 PNG 视觉零差, 白底图柔和化)
  return (
    <div
      className={cn('relative inline-block h-full w-full', className)}
      style={bgStyle === 'none' ? undefined : (bgStyle ?? DEFAULT_BG)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="relative h-full w-full"
        onError={() => setError(true)}
        {...imgProps}
      />
    </div>
  )
}
