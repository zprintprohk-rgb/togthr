// src/lib/memory-engine.ts
//
// Togthr Buddy P3 — 记忆引擎 v0（温度核心）
// localStorage 存储（MVP 免后端），后续迁移 Supabase。
//
// Memory 类型：schedule（日程）/ preference（偏好）/ care（照顾）/ absence（缺席）/ anniversary（纪念日）

export type MemoryType = 'schedule' | 'preference' | 'care' | 'absence' | 'anniversary'

export interface Memory {
  id: string
  type: MemoryType
  content: string      // 用户输入
  buddyReaction: string // 手写体反应（非 AI 生成，预设池）
  triggerDate: string  // YYYY-MM-DD
  createdAt: number
  triggered: boolean
}

const STORAGE_KEY = 'togthr_memories'

const REACTION_POOL: Record<MemoryType, string[]> = {
  schedule: ['i will be right here.', 'noted. quietly.', 'a small promise kept.'],
  preference: ['i remember that.', 'the little things stay.'],
  care: ['that day mattered. i felt it.'],
  absence: ["i waited. it's okay. i'm here."],
  anniversary: ['this day is ours.'],
}

export function createMemory(content: string, date: string, type: MemoryType = 'schedule'): Memory {
  const pool = REACTION_POOL[type] ?? REACTION_POOL.schedule
  const memory: Memory = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    type,
    content,
    buddyReaction: pool[Math.floor(Math.random() * pool.length)],
    triggerDate: date,
    createdAt: Date.now(),
    triggered: false,
  }
  const all = getAllMemories()
  all.push(memory)
  persist(all)
  return memory
}

export function getAllMemories(): Memory[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Memory[]) : []
  } catch {
    return []
  }
}

export function getPendingMemories(): Memory[] {
  const today = new Date().toISOString().slice(0, 10) // YYYY-MM-DD (UTC)
  return getAllMemories().filter((m) => !m.triggered && m.triggerDate <= today)
}

export function markTriggered(id: string): void {
  const all = getAllMemories().map((m) => (m.id === id ? { ...m, triggered: true } : m))
  persist(all)
}

export function deleteMemory(id: string): void {
  persist(getAllMemories().filter((m) => m.id !== id))
}

export function updateMemory(id: string, patch: Partial<Memory>): void {
  persist(getAllMemories().map((m) => (m.id === id ? { ...m, ...patch } : m)))
}

function persist(all: Memory[]): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
  } catch {
    /* noop */
  }
}
