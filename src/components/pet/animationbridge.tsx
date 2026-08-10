/**
 * AnimationBridge — AI 宠物引擎 → 前端动画联动桥
 *
 * 将引擎状态（talking/thinking/成长阶段/性格偏好）映射为 BuddyAvatar 的 8 种 BuddyState，
 * 支持外部驱动（talking 时切 'greet'/'success'）与空闲自动回退。
 */

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import BuddyAvatar, { type BuddyAvatarProps } from '@/components/buddy/BuddyAvatar'
import type { PetStage } from '@/lib/pet/growth'

export type EngineActivity = 'idle' | 'thinking' | 'talking' | 'sleeping'

export interface AnimationBridgeProps
  extends Omit<BuddyAvatarProps, 'state' | 'isGlowing' | 'signText'> {
  /** 引擎活动状态（由对话 API / 照顾循环驱动） */
  activity?: EngineActivity
  /** 成长阶段（egg→mature）影响基础帧 */
  stage?: PetStage
  /** 性格偏好状态（preferredState 输出） */
  preferred?: 'idle' | 'thinking' | 'working' | 'success'
  /** 当前是否在说话（流式输出中） */
  isTalking?: boolean
  /** 想念提示（>48h 未喂食时外部传入） */
  missMode?: boolean
  size?: number
}

/** 阶段 → BuddyState 基础映射 */
const STAGE_BASE_STATE: Record<PetStage, BuddyAvatarProps['state']> = {
  egg: 'sleep',
  baby: 'idle',
  teen: 'blink',
  adult: 'breath',
  mature: 'sign',
}

export function AnimationBridge({
  activity = 'idle',
  stage = 'baby',
  preferred = 'idle',
  isTalking = false,
  missMode = false,
  size,
  ...rest
}: AnimationBridgeProps) {
  const [showTalking, setShowTalking] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // talking 时短暂展示 'greet'/'success' 帧，结束后回退
  useEffect(() => {
    if (isTalking) {
      setShowTalking(true)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => setShowTalking(false), 1600)
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [isTalking])

  const deriveState = useCallback((): BuddyAvatarProps['state'] => {
    if (missMode) return 'miss'
    if (activity === 'sleeping') return 'sleep'
    if (showTalking) return 'greet'
    if (activity === 'thinking') return 'blink'
    if (activity === 'talking') return 'success'
    return STAGE_BASE_STATE[stage] ?? 'idle'
  }, [missMode, activity, showTalking, stage])

  const glow = activity === 'talking' || activity === 'thinking'
  const signText =
    missMode ? "I've been waiting for you." :
    stage === 'mature' ? 'Thank you for growing with me.' :
    undefined

  return (
    <BuddyAvatar
      {...rest}
      state={deriveState()}
      isGlowing={glow}
      signText={signText}
      size={size}
    />
  )
}
