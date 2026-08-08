'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export interface MobileNavLabels {
  companion: string
  couples: string
  solo: string
  ethics: string
  login: string
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

  const items: Array<{ href: string; label: string }> = [
    { href: `/${locale}`, label: labels.companion },
    { href: `/${locale}/couples`, label: labels.couples },
    { href: `/${locale}/solo`, label: labels.solo },
    { href: `/${locale}/ethics`, label: labels.ethics },
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
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-300 hover:bg-white/5 hover:text-zinc-100"
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
