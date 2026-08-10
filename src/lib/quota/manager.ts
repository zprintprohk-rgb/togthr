/**
 * 配额管理系统 — Togthr AI 宠物引擎
 *
 * 规则：
 *  - 免费用户 5 轮/日，付费用户 20 轮/日
 *  - UTC 每日 00:00 重置
 *  - 存储：Upstash Redis REST（UPSTASH_REDIS_REST_URL/TOKEN 存在时），
 *    否则降级内存 Map（单实例可用），保证无外部依赖可跑
 *  - 台账：usageLog 可查询（getUsageLog / resetUsageLog），满足"配额与使用记录可查询追踪"
 */

export interface QuotaUsage {
  userId: string
  date: string // YYYY-MM-DD (UTC)
  used: number
  limit: number
  isPremium: boolean
}

const FREE_LIMIT = 5
const PREMIUM_LIMIT = 20
const REDIS_TTL_S = 60 * 60 * 24 * 2 // 2 天 TTL

// ── 内存 fallback（单实例） ──
const memStore = new Map<string, number>() // key: userId:date → used
const usageLog: QuotaUsage[] = []
const MAX_LOG = 2000

function hasRedis(): boolean {
  return (
    typeof process !== 'undefined' &&
    !!process.env.UPSTASH_REDIS_REST_URL &&
    !!process.env.UPSTASH_REDIS_REST_TOKEN
  )
}

function redisUrl(key: string, command: string, ...args: string[]): string {
  const base = process.env.UPSTASH_REDIS_REST_URL!
  const enc = args.map((a) => encodeURIComponent(a)).join('/')
  return `${base}/${command}/${key}${enc ? `/${enc}` : ''}`
}

async function redisGet(key: string): Promise<number | null> {
  if (!hasRedis()) return null
  try {
    const res = await fetch(redisUrl(key, 'get'), {
      headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
    })
    const json = (await res.json()) as { result: string | null }
    return json.result == null ? null : Number(json.result)
  } catch {
    return null
  }
}

async function redisIncr(key: string): Promise<number> {
  if (!hasRedis()) return 0
  try {
    const res = await fetch(redisUrl(key, 'incr'), {
      headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
    })
    const json = (await res.json()) as { result: number }
    // 首次创建时设置 TTL
    if (json.result === 1) {
      await fetch(redisUrl(key, 'expire', String(REDIS_TTL_S)), {
        headers: { Authorization: `Bearer ${process.env.UPSTASH_REDIS_REST_TOKEN}` },
      })
    }
    return json.result
  } catch {
    return 0
  }
}

/** UTC 日期字符串 */
export function todayUtc(d: Date = new Date()): string {
  return d.toISOString().slice(0, 10)
}

function memKey(userId: string, date: string): string {
  return `${userId}:${date}`
}

/** 判断用户是否付费（memberships 表由订阅 cron 维护，此处读环境/缓存简化） */
export async function isPremiumUser(userId: string): Promise<boolean> {
  // 可由上游传入或查 Supabase；此处提供注入点
  return (globalThis as { __togthrPremium?: Set<string> }).__togthrPremium?.has?.(userId) ?? false
}

/**
 * 检查并消耗一次配额。
 * @returns { ok, remaining, limit, used } — ok=false 表示超限
 */
export async function consumeQuota(userId: string): Promise<{
  ok: boolean
  used: number
  limit: number
  remaining: number
}> {
  const date = todayUtc()
  const premium = await isPremiumUser(userId)
  const limit = premium ? PREMIUM_LIMIT : FREE_LIMIT

  let used: number
  if (hasRedis()) {
    used = await redisIncr(`togthr:quota:${userId}:${date}`)
    if (used === 0) {
      // Redis 调用失败降级内存
      const k = memKey(userId, date)
      used = (memStore.get(k) ?? 0) + 1
      memStore.set(k, used)
    }
  } else {
    const k = memKey(userId, date)
    used = (memStore.get(k) ?? 0) + 1
    memStore.set(k, used)
  }

  const ok = used <= limit
  usageLog.push({ userId, date, used, limit, isPremium: premium })
  if (usageLog.length > MAX_LOG) usageLog.splice(0, usageLog.length - MAX_LOG)

  return { ok, used, limit, remaining: Math.max(0, limit - used) }
}

/** 查询用户今日用量（不消耗） */
export async function getQuota(userId: string): Promise<QuotaUsage | null> {
  const date = todayUtc()
  const premium = await isPremiumUser(userId)
  const limit = premium ? PREMIUM_LIMIT : FREE_LIMIT
  let used = 0
  if (hasRedis()) {
    used = (await redisGet(`togthr:quota:${userId}:${date}`)) ?? 0
  } else {
    used = memStore.get(memKey(userId, date)) ?? 0
  }
  return { userId, date, used, limit, isPremium: premium }
}

/** 台账查询（最近 N 条配额消耗记录） */
export function getUsageLog(n = 50): QuotaUsage[] {
  return usageLog.slice(-n)
}

/** 清空台账（测试用） */
export function resetUsageLog(): void {
  usageLog.length = 0
}

/** 超限提示文案（i18n 由调用方决定，此处给标准英文） */
export function quotaExceededMessage(limit: number): string {
  return `Daily conversation limit reached (${limit}/day). Come back tomorrow.`
}
