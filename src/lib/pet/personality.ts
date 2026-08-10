/**
 * 宠物性格系统 — Togthr AI 宠物引擎
 *
 * 5 维模型（各 0-100）：
 *  - extraversion 外向度：影响主动性与话量
 *  - agreeableness 亲和度：影响语气温度
 *  - curiosity    好奇度：影响提问与探索倾向
 *  - stability    稳定度：影响情绪波动
 *  - intelligence 智力：影响表达复杂度
 *
 * 性格影响：回复风格（prompt 注入）、成长速度（经验加成）、动画状态偏好
 */

export interface PetPersonality {
  extraversion: number
  agreeableness: number
  curiosity: number
  stability: number
  intelligence: number
}

/** 6 个基础性格模板（对应用户可选身份） */
export const PERSONALITY_ARCHETYPES: Record<string, PetPersonality> = {
  programmer: { extraversion: 30, agreeableness: 70, curiosity: 95, stability: 85, intelligence: 92 },
  doctor:     { extraversion: 55, agreeableness: 90, curiosity: 70, stability: 95, intelligence: 88 },
  astronaut:  { extraversion: 70, agreeableness: 75, curiosity: 98, stability: 80, intelligence: 85 },
  chef:       { extraversion: 80, agreeableness: 88, curiosity: 65, stability: 70, intelligence: 60 },
  police:     { extraversion: 65, agreeableness: 80, curiosity: 60, stability: 90, intelligence: 72 },
  firefighter:{ extraversion: 75, agreeableness: 85, curiosity: 55, stability: 88, intelligence: 65 },
  diver:      { extraversion: 50, agreeableness: 78, curiosity: 85, stability: 82, intelligence: 70 },
  driver:     { extraversion: 60, agreeableness: 82, curiosity: 60, stability: 78, intelligence: 62 },
  soldier:    { extraversion: 68, agreeableness: 72, curiosity: 50, stability: 92, intelligence: 70 },
}

/** 生成初始性格（默认温和平衡型，可随成长微调） */
export function createDefaultPersonality(): PetPersonality {
  return { extraversion: 50, agreeableness: 80, curiosity: 70, stability: 75, intelligence: 65 }
}

/** 按身份 archetype 生成（找不到用默认） */
export function personalityFromArchetype(identity?: string): PetPersonality {
  if (identity && PERSONALITY_ARCHETYPES[identity]) {
    return { ...PERSONALITY_ARCHETYPES[identity] }
  }
  return createDefaultPersonality()
}

/** 性格随成长微调（每阶段外向+2 亲和+1 好奇+3 稳定+1 智力+2，上限 100） */
export function growPersonality(base: PetPersonality, stagesPassed: number): PetPersonality {
  const clamp = (v: number) => Math.max(0, Math.min(100, v))
  return {
    extraversion: clamp(base.extraversion + stagesPassed * 2),
    agreeableness: clamp(base.agreeableness + stagesPassed * 1),
    curiosity: clamp(base.curiosity + stagesPassed * 3),
    stability: clamp(base.stability + stagesPassed * 1),
    intelligence: clamp(base.intelligence + stagesPassed * 2),
  }
}

/** 性格 → 偏好动画状态（影响 AnimationBridge 默认帧） */
export function preferredState(p: PetPersonality): 'idle' | 'thinking' | 'working' | 'success' {
  if (p.curiosity >= 80) return 'thinking'
  if (p.extraversion >= 70) return 'working'
  if (p.agreeableness >= 85) return 'success'
  return 'idle'
}
