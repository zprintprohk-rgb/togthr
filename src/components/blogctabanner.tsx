// src/components/BlogCtaBanner.tsx
//
// Day 1 (2026-08-09) Prompt 1-B: 文章详情页底部转化 CTA
// 虚线边框、圆角、暖色背景；仅文章详情页渲染（不用于首页/列表页）
// 文案与链接按 K3 指令：'Want to build your little one together?' + 'Join the waitlist' → /couples
//
// 2026-08-09 fix: 加 'use client' — onClick 调 GA4 是 client-only 行为,
// 6 个 blog 页 (Server Component) 渲染此组件会触发
// "Event handlers cannot be passed to Client Component props" prerender 错。

'use client'

import Link from 'next/link'
import { trackCtaClick } from '@/lib/ga4-events'

export default function BlogCtaBanner({ slug }: { slug: string }) {
  return (
    <aside
      aria-label="Join the waitlist"
      className="mt-12 rounded-2xl border-2 border-dashed border-amber-300/40 bg-amber-100/10 p-6 text-center"
    >
      <p className="text-lg font-medium text-zinc-100">
        Want to build your little one together?
      </p>
      <Link
        href="/companion"
        onClick={() => trackCtaClick('blog-waitlist', slug)}
        className="mt-4 inline-block rounded-xl bg-amber-400/90 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-amber-300"
      >
        Join the waitlist
      </Link>
    </aside>
  )
}
