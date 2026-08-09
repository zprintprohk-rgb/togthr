// src/components/buddy/IdentitySelector.tsx
//
// Togthr Buddy P2 — 身份选择系统（K3 V2.0 去游戏化）
// 原始分类 → 升级分类：
//   基础免费 → 初始形态（默认拥有）
//   职业系列 → 身份系列（连续照顾 7 天解锁）
//   节日系列 → 记忆系列（对应日期自动解锁）
//   表情系列 → 状态系列（累计互动解锁）
//   奇幻系列 → 梦境系列（实体购买解锁）
//   限定盲盒 → 年度限定（年付订阅专属）
//
// 纪律：无"盲盒/概率/金色传说"术语；解锁条件 = 行为驱动

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import BuddyAvatar from '@/components/buddy/BuddyAvatar'
import type { BuddyTheme } from '@/lib/image-utils'

export interface BuddyIdentity {
  slug: string
  name: string
  theme: BuddyTheme
  unlockHint: string
  unlocked: boolean
}

const IDENTITIES: BuddyIdentity[] = [
  { slug: 'initial',  name: '你的第一个 Buddy', theme: 'lavender',  unlockHint: '',                                        unlocked: true },
  { slug: 'identity', name: 'TA 是做什么的',     theme: 'mint',      unlockHint: '连续照顾 7 天解锁',                        unlocked: false },
  { slug: 'memory',   name: '我们一起度过的',     theme: 'sakura',    unlockHint: '在对应的日子回来解锁',                    unlocked: false },
  { slug: 'state',    name: 'TA 今天怎么样',     theme: 'moonlight', unlockHint: '累计互动 30 次解锁',                      unlocked: false },
  { slug: 'dream',    name: 'TA 来自哪里',       theme: 'warm',      unlockHint: '与实体 Buddy 一同解锁',                    unlocked: false },
  { slug: 'annual',   name: '这一年，只有我们一起', theme: 'charcoal', unlockHint: '年付订阅专属',                            unlocked: false },
]

export default function IdentitySelector({
  activeSlug,
  onSelect,
}: {
  activeSlug: string
  onSelect?: (slug: string) => void
}) {
  const [selected, setSelected] = useState<string>(activeSlug)

  function handleClick(id: BuddyIdentity) {
    if (!id.unlocked) return
    setSelected(id.slug)
    onSelect?.(id.slug)
  }

  return (
    <div className="grid grid-cols-2 gap-4 p-4 sm:grid-cols-3">
      {IDENTITIES.map((id) => (
        <motion.div
          key={id.slug}
          whileHover={id.unlocked ? { scale: 1.03 } : undefined}
          onClick={() => handleClick(id)}
          className={`relative cursor-pointer rounded-2xl border p-4 backdrop-blur-sm transition-all duration-300 ${
            selected === id.slug
              ? 'border-pink-400/50 bg-white/10 shadow-[0_0_20px_rgba(139,92,246,0.25)]'
              : 'border-white/5 bg-white/5'
          } ${id.unlocked ? '' : 'opacity-40 grayscale'}`}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleClick(id)
          }}
        >
          <div className="flex justify-center">
            <BuddyAvatar state="breath" theme={id.theme} size={96} isGlowing={selected === id.slug && id.unlocked} />
          </div>

          {!id.unlocked && (
            <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-[#0B0B1A]/80">
              <span className="px-3 text-center text-xs text-zinc-300">{id.unlockHint}</span>
            </div>
          )}

          <p className="mt-3 text-center text-sm text-zinc-200">{id.name}</p>
          {selected === id.slug && id.unlocked && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-1 text-center text-xs text-pink-300"
            >
              ✦
            </motion.p>
          )}
        </motion.div>
      ))}
    </div>
  )
}
