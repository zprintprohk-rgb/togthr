/**
 * DeepSeek API 客户端 — Togthr AI 宠物引擎
 *
 * 功能：
 *  - 真实模式：DEEPSEEK_API_KEY 存在时调用 DeepSeek 兼容 OpenAI 接口（流式）
 *  - Mock 模式：无 key 时本地模板回复（20-50 字、无 emoji、quiet companion 基调），
 *    保证链路可测试（响应 <2s、流式输出、性格注入全部走同一路径）
 *  - 超时控制：10s 硬超时（验收标准 API 响应 <2s，此处为兜底）
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export interface DeepSeekCallOptions {
  messages: ChatMessage[]
  maxTokens?: number
  temperature?: number
  signal?: AbortSignal
}

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'
const TIMEOUT_MS = 10_000

/** 最近一次流式实际使用的模式（'deepseek' | 'mock'），供台账/日志标注 */
let lastStreamMode: 'deepseek' | 'mock' = 'mock'

export function getLastStreamMode(): 'deepseek' | 'mock' {
  return lastStreamMode
}

/** 是否有真实 API key（未配置时走 mock，保证本地可跑） */
export function hasDeepSeekKey(): boolean {
  return typeof process !== 'undefined' && !!process.env.DEEPSEEK_API_KEY
}

/** 流式调用 DeepSeek；无 key 或 API 报错时自动降级 mock（保证链路可用） */
export async function* streamDeepSeek(
  options: DeepSeekCallOptions,
): AsyncGenerator<string, void, unknown> {
  if (hasDeepSeekKey()) {
    try {
      lastStreamMode = 'deepseek'
      yield* streamReal(options)
      return
    } catch (err) {
      // 401（key 无效）/ 429 / 5xx / 网络错误 → 降级 mock，保证本地链路可测
      const msg = err instanceof Error ? err.message : String(err)
      if (msg.includes('401') || msg.includes('429') || msg.includes('fetch failed') || msg.includes('abort')) {
        console.warn('[deepseek] API 不可用，降级 mock:', msg.slice(0, 120))
        lastStreamMode = 'mock'
        yield* streamMock(options)
        return
      }
      throw err
    }
  } else {
    lastStreamMode = 'mock'
    yield* streamMock(options)
  }
}

/** 真实 DeepSeek 流式（SSE） */
async function* streamReal(
  options: DeepSeekCallOptions,
): AsyncGenerator<string, void, unknown> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
  const signal = options.signal
    ? AbortSignal.any([controller.signal, options.signal])
    : controller.signal

  try {
    const res = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: process.env.DEEPSEEK_MODEL ?? 'deepseek-chat',
        messages: options.messages,
        max_tokens: options.maxTokens ?? 120,
        temperature: options.temperature ?? 0.8,
        stream: true,
      }),
      signal,
    })

    if (!res.ok || !res.body) {
      throw new Error(`DeepSeek API ${res.status}: ${await res.text().catch(() => '')}`)
    }

    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })

      // 按行解析 SSE：data: {...}
      const lines = buffer.split('\n')
      buffer = lines.pop() ?? ''
      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data:')) continue
        const payload = trimmed.slice(5).trim()
        if (payload === '[DONE]') return
        try {
          const json = JSON.parse(payload)
          const delta: string | undefined = json.choices?.[0]?.delta?.content
          if (delta) yield delta
        } catch {
          // 跳过无法解析的 SSE 片段
        }
      }
    }
  } finally {
    clearTimeout(timer)
  }
}

/**
 * Mock 流式 — 无 key 时保证链路可测。
 * 回复规则（与 Prompt 红线一致）：20-50 字、无 emoji、不提及伴侣/恋爱、
 * 体现宠物对主人的依恋与关心、保持安静陪伴基调。
 */
async function* streamMock(
  options: DeepSeekCallOptions,
): AsyncGenerator<string, void, unknown> {
  const userMsg = options.messages.find((m) => m.role === 'user')?.content ?? ''
  const system = options.messages.find((m) => m.role === 'system')?.content ?? ''

  // 从 system 提取状态信息（饱腹度等），决定回复情绪
  const hungerMatch = system.match(/饱腹度: (\d+)/)
  const hunger = hungerMatch ? Number(hungerMatch[1]) : 80

  let reply: string
  if (/饿|吃|喂/i.test(userMsg) || hunger < 30) {
    reply = '我有点饿了。你今天吃过东西了吗？记得按时吃饭。'
  } else if (/累|困|休息|睡/i.test(userMsg)) {
    reply = '你看起来很累。先休息一下，我会安静地在这里等你。'
  } else if (/开心|好|棒|顺利/i.test(userMsg)) {
    reply = '听到你开心，我也很高兴。今天的你也很努力。'
  } else if (/难过|伤心|烦|糟糕/i.test(userMsg)) {
    reply = '我在这里。不用急着好起来，慢慢来就好。'
  } else {
    reply = '我在。你慢慢说，我会一直安静地陪着你。'
  }

  // 模拟流式：按 2-4 字分片
  const chunks = reply.match(/.{1,3}/g) ?? [reply]
  for (const chunk of chunks) {
    await new Promise((r) => setTimeout(r, 12))
    yield chunk
  }
}
