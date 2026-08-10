/**
 * 记忆系统 — Togthr AI 宠物引擎
 *
 * 分层：
 *  - 短期记忆：Redis（Upstash REST）或内存队列，上限 50 条/宠物
 *  - 长期记忆：PostgreSQL（Supabase `pet_memories` 表），持久化重要事件
 *  - 每日总结：当天对话结束时生成一句话总结，写入长期记忆
 *
 * 无外部依赖时全部降级内存，保证链路可跑。
 */

export interface PetMemory {
  id: string
  petId: string
  content: string
  kind: 'milestone' | 'daily' | 'conversation' | 'care'
  createdAt: number
}

const SHORT_TERM_LIMIT = 50
const memQueue = new Map<string, PetMemory[]>() // petId → memories

function now(): number {
  return Date.now()
}

function uid(): string {
  return `mem_${now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`
}

// ── 短期记忆（Redis → 内存 fallback） ──

async function shortTermGet(petId: string): Promise<PetMemory[]> {
  if (typeof process !== 'undefined' && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const url = `${process.env.UPSTASH_REDIS_REST_URL}/lrange/togthr:mem:${petId}/0/-1`
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
      })
      const json = (await res.json()) as { result?: string[] }
      if (json.result) {
        return json.result.map((s) => JSON.parse(s) as PetMemory)
      }
    } catch {
      // fallback
    }
  }
  return memQueue.get(petId) ?? []
}

async function shortTermPush(petId: string, mem: PetMemory): Promise<void> {
  const list = await shortTermGet(petId)
  list.push(mem)
  const trimmed = list.slice(-SHORT_TERM_LIMIT)
  if (typeof process !== 'undefined' && process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    try {
      const url = `${process.env.UPSTASH_REDIS_REST_URL}/rpush/togthr:mem:${petId}/${encodeURIComponent(JSON.stringify(mem))}`
      await fetch(url, {
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
      })
      // 限制长度：裁剪到 50 条
      if (trimmed.length > SHORT_TERM_LIMIT) {
        const diff = trimmed.length - SHORT_TERM_LIMIT
        await fetch(`${process.env.UPSTASH_REDIS_REST_URL}/ltrim/togthr:mem:${petId}/${diff}/-1`, {
          headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
        })
      }
      return
    } catch {
      // fallback
    }
  }
  memQueue.set(petId, trimmed)
}

// ── 长期记忆（Supabase pet_memories 表，失败降级内存） ──

const longTermFallback = new Map<string, PetMemory[]>()

async function longTermPush(petId: string, mem: PetMemory): Promise<void> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (url && key) {
    try {
      await fetch(`${url}/rest/v1/pet_memories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: key,
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          pet_id: petId,
          content: mem.content,
          kind: mem.kind,
          created_at: new Date(mem.createdAt).toISOString(),
        }),
      })
      return
    } catch {
      // fallback
    }
  }
  const list = longTermFallback.get(petId) ?? []
  list.push(mem)
  longTermFallback.set(petId, list.slice(-200))
}

async function longTermGet(petId: string): Promise<PetMemory[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (url && key) {
    try {
      const res = await fetch(
        `${url}/rest/v1/pet_memories?pet_id=eq.${petId}&order=created_at.desc&limit=50`,
        { headers: { apikey: key, Authorization: `Bearer ${key}` } },
      )
      const rows = (await res.json()) as Array<{
        pet_id: string
        content: string
        kind: string
        created_at: string
      }>
      if (Array.isArray(rows)) {
        return rows.map((r) => ({
          id: r.pet_id,
          petId,
          content: r.content,
          kind: (r.kind ?? 'conversation') as PetMemory['kind'],
          createdAt: new Date(r.created_at).getTime(),
        }))
      }
    } catch {
      // fallback
    }
  }
  return longTermFallback.get(petId) ?? []
}

// ── 对外 API ──

/** 记录一条记忆（短期 + 长期双写） */
export async function addMemory(petId: string, content: string, kind: PetMemory['kind'] = 'conversation'): Promise<PetMemory> {
  const mem: PetMemory = { id: uid(), petId, content, kind, createdAt: now() }
  await shortTermPush(petId, mem)
  if (kind !== 'conversation') {
    // 里程碑/每日总结进长期记忆；普通对话只在短期（Redis 50 条）
    await longTermPush(petId, mem)
  }
  return mem
}

/** 最近记忆（短期优先，最多 5 条供 prompt 注入） */
export async function recentMemories(petId: string, n = 5): Promise<string[]> {
  const list = await shortTermGet(petId)
  return list.slice(-n).map((m) => m.content)
}

/** 全部短期记忆（台账/调试） */
export async function listShortTerm(petId: string): Promise<PetMemory[]> {
  return shortTermGet(petId)
}

/** 长期记忆（台账/记忆殿堂） */
export async function listLongTerm(petId: string): Promise<PetMemory[]> {
  return longTermGet(petId)
}

/** 生成每日总结并写入长期记忆 */
export async function summarizeDay(petId: string): Promise<string | null> {
  const today = await shortTermGet(petId)
  const todayMems = today.filter(
    (m) => new Date(m.createdAt).toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10),
  )
  if (todayMems.length === 0) return null
  const summary = `今天主人和我说了 ${todayMems.length} 件事，其中让我印象最深的是：${todayMems[todayMems.length - 1].content}`
  await addMemory(petId, summary, 'daily')
  return summary
}

/** 建表 SQL（供 scripts/migrations 使用） */
export const MEMORY_TABLE_SQL = `
create table if not exists pet_memories (
  id uuid primary key default gen_random_uuid(),
  pet_id text not null,
  content text not null,
  kind text not null default 'conversation',
  created_at timestamptz not null default now()
);
create index if not exists pet_memories_pet_idx on pet_memories (pet_id, created_at desc);
`
