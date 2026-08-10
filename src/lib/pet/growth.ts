/**
 * 宠物成长系统 — Togthr AI 宠物引擎
 *
 * 5 阶段：egg → baby → teen → adult → mature
 * 触发：经验值累积（喂食/互动/陪伴天数）
 * 状态快照：饱腹度/快乐值/体力/亲密度（0-100，驱动 prompt 与动画）
 */

export type PetStage = 'egg' | 'baby' | 'teen' | 'adult' | 'mature'

export const PET_STAGES: PetStage[] = ['egg', 'baby', 'teen', 'adult', 'mature']

export interface PetStageConfig {
  stage: PetStage
  /** 进入该阶段所需经验 */
  expRequired: number
  labelZh: string
  labelEn: string
}

export const STAGE_CONFIG: PetStageConfig[] = [
  { stage: 'egg', expRequired: 0, labelZh: '蛋', labelEn: 'Egg' },
  { stage: 'baby', expRequired: 20, labelZh: '婴儿', labelEn: 'Baby' },
  { stage: 'teen', expRequired: 60, labelZh: '少年', labelEn: 'Teen' },
  { stage: 'adult', expRequired: 140, labelZh: '成年', labelEn: 'Adult' },
  { stage: 'mature', expRequired: 300, labelZh: '成熟', labelEn: 'Mature' },
]

/** 宠物状态快照（0-100） */
export interface PetStateSnapshot {
  hunger: number    // 饱腹度
  happiness: number // 快乐值
  energy: number    // 体力
  intimacy: number  // 亲密度
}

export interface PetGrowthRecord {
  exp: number
  stage: PetStage
  /** 陪伴天数（连续打卡计数） */
  daysTogether: number
  lastFedAt: number | null
  state: PetStateSnapshot
}

const clamp = (v: number) => Math.max(0, Math.min(100, Math.round(v)))

/** 由经验值求阶段 */
export function stageFromExp(exp: number): PetStage {
  let current: PetStage = 'egg'
  for (const cfg of STAGE_CONFIG) {
    if (exp >= cfg.expRequired) current = cfg.stage
    else break
  }
  return current
}

/** 阶段进度（0-1，用于 UI 进度条） */
export function stageProgress(exp: number): number {
  const cur = stageFromExp(exp)
  const curIdx = STAGE_CONFIG.findIndex((c) => c.stage === cur)
  const next = STAGE_CONFIG[curIdx + 1]
  if (!next) return 1
  const curReq = STAGE_CONFIG[curIdx].expRequired
  return Math.min(1, (exp - curReq) / (next.expRequired - curReq))
}

/** 喂食：+15 饱腹度、+8 快乐、+12 经验 */
export function applyFeed(rec: PetGrowthRecord): PetGrowthRecord {
  return {
    ...rec,
    exp: rec.exp + 12,
    state: {
      hunger: clamp(rec.state.hunger + 15),
      happiness: clamp(rec.state.happiness + 8),
      energy: clamp(rec.state.energy + 4),
      intimacy: clamp(rec.state.intimacy + 3),
    },
    lastFedAt: Date.now(),
  }
}

/** 互动（对话/抚摸）：+5 快乐、+6 亲密、+8 经验，-3 饱腹 */
export function applyInteraction(rec: PetGrowthRecord): PetGrowthRecord {
  return {
    ...rec,
    exp: rec.exp + 8,
    state: {
      hunger: clamp(rec.state.hunger - 3),
      happiness: clamp(rec.state.happiness + 5),
      energy: clamp(rec.state.energy - 2),
      intimacy: clamp(rec.state.intimacy + 6),
    },
  }
}

/** 每日衰减（模拟 48h 想念：超过 48h 未喂食时快乐大幅下降） */
export function applyDecay(rec: PetGrowthRecord, now: number = Date.now()): PetGrowthRecord {
  const hoursSinceFeed = rec.lastFedAt ? (now - rec.lastFedAt) / 3_600_000 : 999
  let happiness = rec.state.happiness
  if (hoursSinceFeed > 48) happiness -= 30
  else if (hoursSinceFeed > 24) happiness -= 12
  else happiness -= 2

  return {
    ...rec,
    state: {
      hunger: clamp(rec.state.hunger - (hoursSinceFeed > 24 ? 20 : 5)),
      happiness: clamp(happiness),
      energy: clamp(rec.state.energy - 3),
      intimacy: clamp(rec.state.intimacy - (hoursSinceFeed > 48 ? 8 : 1)),
    },
  }
}

/** 新宠物初始记录 */
export function createPetRecord(daysTogether = 0): PetGrowthRecord {
  return {
    exp: 0,
    stage: 'egg',
    daysTogether,
    lastFedAt: null,
    state: { hunger: 70, happiness: 60, energy: 80, intimacy: 10 },
  }
}
