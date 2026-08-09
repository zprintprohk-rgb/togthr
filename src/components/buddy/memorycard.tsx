// src/components/buddy/MemoryCard.tsx
//
// Togthr Buddy P3 — 记忆卡片（星光点点布局，毛玻璃，手写体）
'use client'

import { motion } from 'framer-motion'
import { deleteMemory, type Memory } from '@/lib/memory-engine'

const TYPE_EMOJI: Record<string, string> = {
  schedule: '🗓️',
  preference: '💭',
  care: '🤍',
  absence: '🌙',
  anniversary: '✨',
}

export default function MemoryCard({
  memory,
  onDelete,
}: {
  memory: Memory
  onDelete?: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
      className="relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-md"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span aria-hidden="true">{TYPE_EMOJI[memory.type] ?? '💭'}</span>
          <span className="font-mono text-xs text-zinc-500">{memory.triggerDate}</span>
        </div>
        <button
          onClick={() => {
            deleteMemory(memory.id)
            onDelete?.()
          }}
          aria-label="delete memory"
          className="rounded-md px-2 py-1 text-xs text-zinc-500 opacity-60 transition-opacity hover:bg-white/10 hover:opacity-100"
        >
          ✕
        </button>
      </div>

      <p className="mt-3 text-base leading-relaxed text-zinc-100">{memory.content}</p>
      <p className="mt-3 text-sm italic text-pink-200/80" style={{ fontFamily: 'Caveat, cursive' }}>
        {memory.buddyReaction}
      </p>
    </motion.div>
  )
}
