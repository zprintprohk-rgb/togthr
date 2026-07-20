/**
 * /api/focus/complete — Focus Mode 完成落库
 *
 * MVP 定位：streak 的真值在 localStorage（togthr.focus.*），
 * 本 API 是"增强"——登录用户写 focus_sessions + 更新 focus_streaks。
 *
 * 容错策略（永远温柔，绝不阻塞前端）:
 *   - 未登录            → 401 { persisted: false }
 *   - 表不存在 / 写库失败 → 200 { ok: true, persisted: false }（前端静默降级）
 */

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient, createEdgeClient } from '@/lib/supabase'

export const runtime = 'nodejs'

interface CompleteBody {
  plannedMinutes?: number
  actualSeconds?: number
  status?: 'completed' | 'interrupted'
  interruptions?: number
  /** 用户本地日 YYYY-MM-DD（streak 按本地日结算，避免 UTC 跨天误判） */
  clientDate?: string
}

function clampInt(v: unknown, min: number, max: number, fallback: number): number {
  const n = typeof v === 'number' && Number.isFinite(v) ? Math.floor(v) : fallback
  return Math.min(max, Math.max(min, n))
}

/** dateStr(YYYY-MM-DD) 的前一天 */
function prevDateString(dateStr: string): string {
  const d = new Date(`${dateStr}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() - 1)
  return d.toISOString().slice(0, 10)
}

export async function POST(req: NextRequest) {
  // 1) 登录校验（复用 server client cookie 模式）
  let userId: string
  try {
    const supabase = await createServerClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json(
        { ok: false, persisted: false, error: 'unauthorized' },
        { status: 401 },
      )
    }
    userId = user.id
  } catch (err) {
    console.error('[focus/complete] auth failed:', err)
    return NextResponse.json(
      { ok: false, persisted: false, error: 'unauthorized' },
      { status: 401 },
    )
  }

  // 2) 参数解析（全部容错 + clamp）
  let body: CompleteBody = {}
  try {
    body = (await req.json()) as CompleteBody
  } catch {
    // 空 body 也能落一条默认 25min 完成记录
  }
  const plannedMinutes = clampInt(body.plannedMinutes, 1, 240, 25)
  const actualSeconds = clampInt(body.actualSeconds, 0, 240 * 60, plannedMinutes * 60)
  const status = body.status === 'interrupted' ? 'interrupted' : 'completed'
  const interruptions = clampInt(body.interruptions, 0, 999, 0)
  const clientDate =
    typeof body.clientDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.clientDate)
      ? body.clientDate
      : new Date().toISOString().slice(0, 10)

  // 3) 落库（service role；表不存在时 try/catch 静默降级为 persisted:false）
  try {
    const supabase = createEdgeClient()

    const { error: sessionError } = await supabase.from('focus_sessions').insert({
      user_id: userId,
      planned_minutes: plannedMinutes,
      actual_seconds: actualSeconds,
      status,
      interruptions,
      ended_at: new Date().toISOString(),
    })
    if (sessionError) throw sessionError

    // 完成（非中断）才结算 streak — 永远温柔，中断不清零
    if (status === 'completed') {
      const { data: existing, error: readError } = await supabase
        .from('focus_streaks')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle()
      if (readError) throw readError

      const prevStreak = (existing?.current_streak as number | undefined) ?? 0
      const longest = (existing?.longest_streak as number | undefined) ?? 0
      const lastDate = existing?.last_completed_date as string | undefined
      const nextStreak =
        lastDate === clientDate
          ? prevStreak
          : lastDate === prevDateString(clientDate)
            ? prevStreak + 1
            : 1

      const { error: upsertError } = await supabase.from('focus_streaks').upsert(
        {
          user_id: userId,
          current_streak: nextStreak,
          longest_streak: Math.max(longest, nextStreak),
          last_completed_date: clientDate,
          total_minutes:
            ((existing?.total_minutes as number | undefined) ?? 0) +
            Math.round(actualSeconds / 60),
          total_beans: ((existing?.total_beans as number | undefined) ?? 0) + 1,
        },
        { onConflict: 'user_id' },
      )
      if (upsertError) throw upsertError
    }

    // 4) Best-effort: 喂食宠物 (Focus ≥15min completed = 喂 +5 幸福, 中断不计)
    //    失败完全静默 — 不影响 focus 主落库
    if (status === 'completed' && plannedMinutes >= 15) {
      try {
        const feedSb = createEdgeClient()
        const { data: couple } = await feedSb
          .from('couples')
          .select('id')
          .or(`user1_id.eq.${userId},user2_id.eq.${userId}`)
          .limit(1)
          .maybeSingle()
        if (couple?.id) {
          const { data: pet } = await feedSb
            .from('pets')
            .select('id, happiness')
            .eq('couple_id', couple.id)
            .limit(1)
            .maybeSingle()
          if (pet?.id) {
            const newHappiness = Math.min(100, (pet.happiness ?? 70) + 5)
            await feedSb
              .from('pets')
              .update({ happiness: newHappiness })
              .eq('id', pet.id)
          }
        }
      } catch (feedErr) {
        // 静默 — pet 表可能还没建 / 用户无 couple
        console.warn('[focus/complete] pet feed skipped:', feedErr)
      }
    }

    return NextResponse.json({ ok: true, persisted: true }, { status: 200 })
  } catch (err) {
    // 表还没建 / RLS / 网络问题 — 返回 200 + persisted:false，前端继续用 localStorage
    console.warn('[focus/complete] persistence skipped:', err)
    return NextResponse.json({ ok: true, persisted: false }, { status: 200 })
  }
}

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: 'focus/complete',
      method: 'POST only',
      note: 'localStorage 为 streak 真值；本 API 为登录用户的落库增强，失败静默降级。',
    },
    { status: 200 },
  )
}
