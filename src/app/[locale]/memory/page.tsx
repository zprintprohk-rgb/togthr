// src/app/[locale]/memory/page.tsx
//
// Togthr Buddy P3 — 记忆殿堂（温度核心）
// 星光点点布局 + 毛玻璃记忆卡片 + 空状态"first memory soon... ✨"
'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import MemoryCard from '@/components/buddy/memorycard'
import { getAllMemories, createMemory, type Memory, type MemoryType } from '@/lib/memory-engine'

const TYPE_OPTIONS: { value: MemoryType; label: string }[] = [
  { value: 'schedule', label: '🗓️ Schedule' },
  { value: 'preference', label: '💭 Preference' },
  { value: 'care', label: '🤍 Care' },
  { value: 'absence', label: '🌙 Absence' },
  { value: 'anniversary', label: '✨ Anniversary' },
]

export default function MemoryPage() {
  const [memories, setMemories] = useState<Memory[]>([])
  const [content, setContent] = useState('')
  const [date, setDate] = useState('')
  const [type, setType] = useState<MemoryType>('schedule')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setMemories(getAllMemories())
  }, [])

  function handleAdd() {
    if (!content.trim() || !date) return
    createMemory(content.trim(), date, type)
    setMemories(getAllMemories())
    setContent('')
    setDate('')
  }

  // SSR-safe：未挂载时渲染空壳（避免 hydration mismatch）
  if (!mounted) {
    return <div data-dark-root className="min-h-screen bg-[#0B0B1A] text-zinc-100" />
  }

  return (
    <div data-dark-root className="min-h-screen bg-[#0B0B1A] text-zinc-100">
      <div className="mx-auto max-w-2xl px-4 py-12">
        <p className="text-sm uppercase tracking-widest text-zinc-500">Memory Hall</p>
        <h1 className="mt-3 text-3xl font-semibold text-zinc-50">TA 记得</h1>

        {/* 新建记忆 */}
        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md">
          <div className="flex flex-wrap gap-2">
            {TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setType(opt.value)}
                className={`rounded-full border px-3 py-1.5 text-xs transition-all ${
                  type === opt.value
                    ? 'border-pink-400/60 bg-pink-500/15 text-pink-100'
                    : 'border-white/10 text-zinc-400 hover:border-white/30'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="mt-4 w-full rounded-xl border border-white/10 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-200 outline-none focus:border-pink-400/60 [color-scheme:dark]"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={2}
            placeholder="What should they remember?"
            maxLength={200}
            className="mt-3 w-full resize-none rounded-xl border border-white/10 bg-zinc-800/50 px-4 py-2.5 text-sm text-zinc-200 placeholder:text-zinc-500 outline-none focus:border-pink-400/60"
          />
          <button
            onClick={handleAdd}
            disabled={!content.trim() || !date}
            className="mt-3 rounded-xl bg-pink-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-pink-400 disabled:opacity-40"
          >
            Keep this memory
          </button>
        </div>

        {/* 记忆列表（星光点点：绝对定位小点装饰 + 卡片流） */}
        <div className="relative mt-8">
          {/* 装饰星点 */}
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-pink-300/40"
                style={{
                  left: `${(i * 17 + 8) % 92}%`,
                  top: `${(i * 29 + 12) % 88}%`,
                }}
              />
            ))}
          </div>

          {memories.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 py-16 text-center">
              <p className="text-2xl" aria-hidden="true">✨</p>
              <p className="mt-3 text-sm text-zinc-400">first memory soon...</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              <AnimatePresence>
                {memories.map((m) => (
                  <MemoryCard key={m.id} memory={m} onDelete={() => setMemories(getAllMemories())} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
