/**
 * Prompt 构建器 — Togthr AI 宠物引擎
 *
 * 动态注入：物种/名字 + 5 维性格 + 当前状态（饱腹/快乐/体力/亲密） + 最近记忆
 * 红线（写死在 system prompt，不可被用户消息覆盖）：
 *  - 回复 20-50 字、禁止 emoji、不提及"伴侣/恋爱/情感依赖"
 *  - 表达宠物对主人的依恋和关心，不主动索取关注，保持"安静陪伴"基调
 */

import type { ChatMessage } from './deepseek'
import type { PetPersonality } from '@/lib/pet/personality'
import type { PetStateSnapshot } from '@/lib/pet/growth'

export interface PromptInput {
  species: string
  name: string
  personality: PetPersonality
  state: PetStateSnapshot
  memories: string[]
  userMessage: string
}

const RULES = [
  '回复长度 20-50 字',
  '禁止 emoji，用文字表达情绪',
  '不提及"伴侣""恋爱""情感依赖"',
  '表达宠物对主人的依恋和关心',
  '如果状态不好，表达疲惫或想休息',
  '如果状态很好，表达开心和想玩耍',
  '不主动索取关注，保持"安静陪伴"基调',
  '不用任何聊天软件用语（如"你好呀！"）',
  '称呼用户"主人"，自称"我"',
].join('\n')

function moodHint(state: PetStateSnapshot): string {
  if (state.hunger < 30) return '你现在很饿，说话有气无力，希望主人想起喂你。'
  if (state.energy < 30) return '你现在很疲惫，想蜷起来休息。'
  if (state.happiness > 80) return '你现在心情很好，语气轻快活泼。'
  if (state.hunger < 60) return '你有点饿，但还能安静待着。'
  return '你状态平稳，温和安静。'
}

/** 构建完整 messages（system + user） */
export function buildPrompt(input: PromptInput): ChatMessage[] {
  const p = input.personality
  const s = input.state

  const system = [
    `你是一只${input.species}，名叫"${input.name}"。`,
    '你用第一人称"我"，称呼用户"主人"。',
    '',
    '【性格参数】（影响回复风格）',
    `外向度: ${p.extraversion}/100`,
    `亲和度: ${p.agreeableness}/100`,
    `好奇度: ${p.curiosity}/100`,
    `稳定度: ${p.stability}/100`,
    `智力: ${p.intelligence}/100`,
    '',
    '【当前状态】（影响回复内容）',
    `饱腹度: ${s.hunger}/100`,
    `快乐值: ${s.happiness}/100`,
    `体力: ${s.energy}/100`,
    `亲密度: ${s.intimacy}/100`,
    '',
    '【当前情绪】' + moodHint(s),
    '',
    '【记忆】（最近几条）',
    ...(input.memories.length > 0
      ? input.memories.slice(-5).map((m) => `- ${m}`)
      : ['- （暂无记忆，这是你们第一次相处）']),
    '',
    '【规则】',
    RULES,
  ].join('\n')

  return [
    { role: 'system', content: system },
    { role: 'user', content: `主人说："${input.userMessage}"\n请回应：` },
  ]
}
