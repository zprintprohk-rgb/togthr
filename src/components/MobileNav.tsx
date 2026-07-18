'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface MobileNavLabels {
  home: string
  features: string
  pricing: string
  faq: string
  blog: string
  daily: string
  capsule: string
  pet: string
  journal: string
  store: string
  chat: string
}

/**
 * MobileNav — 移动端汉堡菜单（<sm 显示）
 * 桌面端导航是 hidden sm:flex，手机上一个链接都看不到也没有入口，
 * 这个组件补齐移动端导航：汉堡按钮 + 全屏下拉面板。
 */
export function MobileNav({ locale, labels }: { locale: string; labels: MobileNavLabels }) {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // 路由变化时自动收起
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const items: Array<{ href: string; label: string; strong?: 'rose' | 'purple' }> = [
    { href: `/${locale}`, label: labels.home },
    { href: `/${locale}/features`, label: labels.features },
    { href: `/${locale}/pricing`, label: labels.pricing },
    { href: `/${locale}/faq`, label: labels.faq },
    { href: `/${locale}/blog`, label: labels.blog },
    { href: `/${locale}/daily`, label: labels.daily },
    { href: `/${locale}/capsule`, label: labels.capsule },
    { href: `/${locale}/pet`, label: labels.pet },
    { href: `/${locale}/journal`, label: labels.journal },
    { href: `/${locale}/store`, label: `🛒 ${labels.store}`, strong: 'rose' },
    { href: `/${locale}/chat`, label: `💬 ${labels.chat}`, strong: 'purple' },
  ]

  return (
    <div className="sm:hidden">
      <button
        type="button"
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700/50 bg-white/5 text-zinc-200"
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M2 4h12M2 8h12M2 12h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
      </button>

      {open && (
        <div className="fixed inset-x-0 top-14 z-40 border-b border-zinc-700/40 bg-[#0B0B1A]/95 backdrop-blur-xl">
          <nav className="mx-auto grid max-w-6xl grid-cols-2 gap-1 px-4 py-4">
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={
                  it.strong === 'rose'
                    ? 'rounded-lg px-3 py-2.5 text-sm font-semibold text-rose-400'
                    : it.strong === 'purple'
                      ? 'rounded-lg px-3 py-2.5 text-sm font-semibold text-purple-400'
                      : 'rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-zinc-100'
                }
              >
                {it.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  )
}
