/**
 * POST /api/chat — AI 宠物对话路由（流式）
 *
 * 流程：petId+message → 配额检查 → 加载性格/状态/记忆 → 构建 Prompt → DeepSeek 流式返回
 * 红线：quiet companion 基调（由 prompt-builder 强制），每日配额限制
 */

import { NextRequest } from 'next/server'
import { streamDeepSeek, hasDeepSeekKey, getLastStreamMode } from '@/lib/ai/deepseek'
import { buildPrompt } from '@/lib/ai/prompt-builder'
import { consumeQuota, getQuota, quotaExceededMessage } from '@/lib/quota/manager'
import { recentMemories, addMemory } from '@/lib/memory/engine'
import { personalityFromArchetype, growPersonality } from '@/lib/pet/personality'
import { createPetRecord, applyDecay, applyInteraction, stageFromExp } from '@/lib/pet/growth'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

interface ChatRequestBody {
  petId?: string
  message?: string
  /** 身份 archetype（programmer/doctor/...），可选，默认温和平衡 */
  identity?: string
  /** 用户已累计经验（成长系统），可选 */
  exp?: number
  /** 是否付费用户（默认 false），可选 */
  premium?: boolean
}

export async function POST(req: NextRequest) {
  let body: ChatRequestBody
  try {
    body = (await req.json()) as ChatRequestBody
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const petId = body.petId?.trim() ?? 'default'
  const message = body.message?.trim()
  if (!message || message.length > 500) {
    return Response.json({ error: 'message is required (<=500 chars)' }, { status: 400 })
  }

  // 配额检查（免费 5 轮/日，付费 20 轮/日）
  const quota = await consumeQuota(petId)
  if (!quota.ok) {
    return Response.json(
      {
        error: 'quota_exceeded',
        message: quotaExceededMessage(quota.limit),
        quota: { used: quota.used, limit: quota.limit, remaining: 0 },
      },
      { status: 429 },
    )
  }

  // 性格（身份 → 成长微调）
  const base = personalityFromArchetype(body.identity)
  const exp = body.exp ?? 0
  const stage = stageFromExp(exp)
  const stageIdx = ['egg', 'baby', 'teen', 'adult', 'mature'].indexOf(stage)
  const personality = growPersonality(base, Math.max(0, stageIdx))

  // 状态（localStorage 传入的成长记录 → 衰减 → 互动消耗）
  let record = createPetRecord()
  record = applyDecay(record)
  record = applyInteraction(record)

  // 记忆注入
  const memories = await recentMemories(petId, 5)

  const messages = buildPrompt({
    species: body.identity ? `${body.identity} buddy` : 'pixel buddy',
    name: petId === 'default' ? 'Buddy' : petId,
    personality,
    state: record.state,
    memories,
    userMessage: message,
  })

  // 流式返回
  const encoder = new TextEncoder()
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        const started = Date.now()
        let full = ''
        for await (const chunk of streamDeepSeek({ messages, temperature: 0.8 })) {
          full += chunk
          controller.enqueue(encoder.encode(JSON.stringify({ delta: chunk }) + '\n'))
        }
        const latencyMs = Date.now() - started

        // 记录记忆（对话内容入短期记忆）
        await addMemory(petId, message, 'conversation')
        // 注入延迟与配额元信息
        controller.enqueue(
          encoder.encode(
            JSON.stringify({
              meta: { latencyMs, mode: getLastStreamMode(), quota: { used: quota.used, limit: quota.limit, remaining: quota.remaining } },
            }) + '\n',
          ),
        )
        controller.close()
      } catch (err) {
        controller.enqueue(
          encoder.encode(JSON.stringify({ error: err instanceof Error ? err.message : 'stream failed' }) + '\n'),
        )
        controller.close()
      }
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      Connection: 'keep-alive',
      'X-Accel-Buffering': 'no',
    },
  })
}

/** GET — 配额台账查询（调试/运营用） */
export async function GET(req: NextRequest) {
  const petId = req.nextUrl.searchParams.get('petId') ?? 'default'
  const quota = await getQuota(petId)
  return Response.json({ quota })
}
