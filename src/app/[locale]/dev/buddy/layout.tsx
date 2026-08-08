// src/app/[locale]/dev/buddy/layout.tsx
//
// 内部 QA 验收页 — 设置 noindex/nofollow，不进入 sitemap 与搜索引擎
// 跟生产路由隔离，但继承 [locale] 全局 layout（next-intl + header/footer）

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Buddy Showcase (QA)',
  description: 'Internal visual QA page for the Togthr Buddy avatar. Not for production.',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
}

export default function DevBuddyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
