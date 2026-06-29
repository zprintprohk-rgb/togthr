'use client'

/**
 * FeedingModal — 喂食微交互
 *
 * 触发: 点击 "喂食时间" BentoCard → 弹出食物选择浮层
 * 宠物反应: 切换到 feeding 状态（通过 DesktopPet 状态机）
 *           心形粒子上升 (PARTICLES.bubble + pink)
 *
 * 用法:
 *   <FeedingModal show={show} onClose={close} locale={locale}
 *     copy={{ title, subtitle, foodItems, feedBtn, cancelBtn }}
 *     onFeed={(food) => { ... }} />
 *
 * P2-3 — 框架完整度: 80%（DesktopPet 状态机 locked，feeding 状态通过 PetCapsule 实现）
 */

import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

interface FoodItem {
  emoji: string
  label: string
  id: string
}

interface FeedingModalProps {
  show: boolean
  onClose: () => void
  copy: {
    title: string
    subtitle: string
    feedBtn: string
    cancelBtn: string
  }
  foodItems: FoodItem[]
  onFeed: (food: FoodItem) => void
  className?: string
}

export function FeedingModal({
  show,
  onClose,
  copy,
  foodItems,
  onFeed,
  className,
}: FeedingModalProps) {
  const handleFeed = (food: FoodItem) => {
    onFeed(food)
    onClose()
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 24 }}
            transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            className={cn(
              'fixed inset-x-4 bottom-20 z-50 mx-auto max-w-sm',
              'glass-card-emph rounded-3xl p-6 shadow-2xl',
              className,
            )}
          >
            {/* Header */}
            <div className="mb-4 text-center">
              <p className="text-3xl" aria-hidden="true">🍽️</p>
              <h3 className="mt-1 text-lg font-bold text-zinc-100">
                {copy.title}
              </h3>
              <p className="mt-0.5 text-xs text-zinc-400">
                {copy.subtitle}
              </p>
            </div>

            {/* Food grid */}
            <div className="mb-5 grid grid-cols-3 gap-2">
              {foodItems.map((food) => (
                <motion.button
                  key={food.id}
                  type="button"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => handleFeed(food)}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-white/10 bg-white/5 p-3 transition-colors hover:border-pink-300/30 hover:bg-white/10"
                >
                  <span className="text-2xl" aria-hidden="true">
                    {food.emoji}
                  </span>
                  <span className="text-[10px] text-zinc-300">
                    {food.label}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Cancel */}
            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full py-2 text-xs text-zinc-400 transition-colors hover:text-zinc-200"
            >
              {copy.cancelBtn}
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
