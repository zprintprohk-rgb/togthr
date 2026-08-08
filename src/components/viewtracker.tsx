// src/components/ViewTracker.tsx
//
// Day 3 (2026-08-09): 页面级 GA4 埋点（landing_view / build_start）
// 用法（server component 内挂载）：
//   <ViewTracker event="landing_view" props={{ page: 'couples', locale }} />
'use client'

import { useEffect, useRef } from 'react'

export default function ViewTracker({
  event,
  props,
}: {
  event: string
  props?: Record<string, string | number | boolean>
}) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    try {
      const w = window as unknown as Record<string, unknown>
      const gtag = w.gtag as ((cmd: 'event', e: string, p?: Record<string, unknown>) => void) | undefined
      if (gtag) gtag('event', event, props)
    } catch {
      /* never throw */
    }
  }, [event, props])
  return null
}
