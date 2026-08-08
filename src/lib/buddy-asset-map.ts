// src/lib/buddy-asset-map.ts
//
// Togthr Buddy Module 0.5 — 资产 & 帧映射源
//
// 职责：
//   1. BuddyState / BuddyAccessory 类型（被 BuddyAvatar 与 QA 页面共用，
//      避免 BuddyAvatar <-> 验收页的循环 import）
//   2. STATE_FRAME_MAP：8 个 state → 帧文件列表（K3 拍板过渡版）
//   3. ASSET_AUDIT：public/pets/ 全部 76 张 PNG 的分类清单，供验收页资产墙
//   4. ASSET_CATEGORIES：分组的展示顺序（标题 + emoji 标签）
//
// 硬规则（K3 拍板 2026-08-09）：
//   - anim-thinking-1.png 是多姿态 sprite 表，禁止进入 STATE_FRAME_MAP
//   - greet 状态用 success-1/2 + idle-1 三帧（语义：举旗→挥手→待机）
//   - miss 用 thinking-2 单帧（语义：低头想）
//   - 其余按 v1 拍板（idle/breath/blink/success 用基准帧，sleep/sign 复用 idle）

import type { BuddyTheme } from './image-utils'

// ── 类型（被 BuddyAvatar 共用） ─────────────────────────────────────────
export type BuddyState =
  | 'idle'
  | 'breath'
  | 'blink'
  | 'greet'
  | 'success'
  | 'miss'
  | 'sleep'
  | 'sign'

export type BuddyAccessory =
  | 'scarf'
  | 'bell'
  | 'star'
  | 'moon'
  | 'leaf'
  | 'note'
  | 'heart'
  | null

// ── 帧映射（K3 拍板过渡版） ─────────────────────────────────────────────
export const STATE_FRAME_MAP: Record<BuddyState, string[]> = {
  idle:    ['anim-idle-1.png', 'anim-idle-2.png'],
  breath:  ['anim-breath.png'],
  blink:   ['anim-blink.png'],
  greet:   ['anim-success-1.png', 'anim-success-2.png', 'anim-idle-1.png'],
  success: ['anim-success-1.png', 'anim-success-2.png'],
  miss:    ['anim-thinking-2.png'],
  sleep:   ['anim-idle-2.png'],
  sign:    ['anim-idle-1.png'],
}

// ── 资产分类（验收页资产墙用） ─────────────────────────────────────────
export type AssetCategory =
  | 'anim-baseline'      // ✅ 基准像素风，FRAME_MAP 可引用
  | 'anim-anomaly'       // ⚠️ 异类（Kimi 重绘前勿直接引用）
  | 'occupation'         // ⚠️ sprite 表，勿直接引用
  | 'holiday-season'     // ⚠️ sprite 表，勿直接引用
  | 'scene'              // ⚠️ sprite 表，勿直接引用
  | 'expression'         // 表情包
  | 'sticker'            // 贴纸
  | 'halloween'          // 万圣节皮肤
  | 'legend'             // 传说款

export type AssetRisk = 'used' | 'anomaly' | 'sprite-table' | 'safe'

export interface AssetEntry {
  file: string
  category: AssetCategory
  risk: AssetRisk
  /** 标签文本（i18n 友好：QA 验收页会本地化） */
  i18nKey:
    | 'frameUsed'
    | 'frameAnomaly'
    | 'spriteTable'
    | 'safe'
}

// ── 76 张 PNG 完整审计（来自 public/pets/） ─────────────────────────────
// 排序：分类聚合内按文件名字母序。来源数据：2026-08-08 摸排
export const ASSET_AUDIT: AssetEntry[] = [
  // ── anim-baseline (10)：K3 拍板可引用 ──
  { file: 'anim-antenna.png',    category: 'anim-baseline', risk: 'safe',  i18nKey: 'safe' },
  { file: 'anim-blink.png',      category: 'anim-baseline', risk: 'safe',  i18nKey: 'safe' },
  { file: 'anim-breath.png',     category: 'anim-baseline', risk: 'safe',  i18nKey: 'safe' },
  { file: 'anim-idle-1.png',     category: 'anim-baseline', risk: 'used',  i18nKey: 'frameUsed' },
  { file: 'anim-idle-2.png',     category: 'anim-baseline', risk: 'used',  i18nKey: 'frameUsed' },
  { file: 'anim-success-1.png',  category: 'anim-baseline', risk: 'used',  i18nKey: 'frameUsed' },
  { file: 'anim-success-2.png',  category: 'anim-baseline', risk: 'used',  i18nKey: 'frameUsed' },
  { file: 'anim-thinking-2.png', category: 'anim-baseline', risk: 'used',  i18nKey: 'frameUsed' },
  { file: 'anim-working-1.png',  category: 'anim-baseline', risk: 'safe',  i18nKey: 'safe' },
  { file: 'anim-working-2.png',  category: 'anim-baseline', risk: 'safe',  i18nKey: 'safe' },

  // ── anim-anomaly (5)：4 张 greet + 1 张 sprite 表 ──
  { file: 'anim-greet-1.png',   category: 'anim-anomaly', risk: 'anomaly', i18nKey: 'frameAnomaly' },
  { file: 'anim-greet-2.png',   category: 'anim-anomaly', risk: 'anomaly', i18nKey: 'frameAnomaly' },
  { file: 'anim-greet-3.png',   category: 'anim-anomaly', risk: 'anomaly', i18nKey: 'frameAnomaly' },
  { file: 'anim-greet-4.png',   category: 'anim-anomaly', risk: 'anomaly', i18nKey: 'frameAnomaly' },
  { file: 'anim-thinking-1.png', category: 'anim-anomaly', risk: 'sprite-table', i18nKey: 'spriteTable' },

  // ── occupation (10)：8 职业 + character-sheet + robot-base ──
  { file: 'astronaut.png',      category: 'occupation', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'character-sheet.png', category: 'occupation', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'chef.png',           category: 'occupation', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'diver.png',          category: 'occupation', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'doctor.png',         category: 'occupation', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'driver.png',         category: 'occupation', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'firefighter.png',    category: 'occupation', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'police.png',         category: 'occupation', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'programmer.png',     category: 'occupation', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'robot-base.png',     category: 'occupation', risk: 'sprite-table', i18nKey: 'spriteTable' },

  // ── expression (4) ──
  { file: 'expression-angry.png',     category: 'expression', risk: 'safe', i18nKey: 'safe' },
  { file: 'expression-charging.png',  category: 'expression', risk: 'safe', i18nKey: 'safe' },
  { file: 'expression-happy.png',     category: 'expression', risk: 'safe', i18nKey: 'safe' },
  { file: 'expression-sleeping.png',  category: 'expression', risk: 'safe', i18nKey: 'safe' },

  // ── sticker (8) ──
  { file: 'sticker-crying.png',     category: 'sticker', risk: 'safe', i18nKey: 'safe' },
  { file: 'sticker-fighting.png',   category: 'sticker', risk: 'safe', i18nKey: 'safe' },
  { file: 'sticker-loveyou.png',    category: 'sticker', risk: 'safe', i18nKey: 'safe' },
  { file: 'sticker-shy.png',        category: 'sticker', risk: 'safe', i18nKey: 'safe' },
  { file: 'sticker-sleepy.png',     category: 'sticker', risk: 'safe', i18nKey: 'safe' },
  { file: 'sticker-surprised.png',  category: 'sticker', risk: 'safe', i18nKey: 'safe' },
  { file: 'sticker-thumbsup.png',   category: 'sticker', risk: 'safe', i18nKey: 'safe' },
  { file: 'sticker-wink.png',       category: 'sticker', risk: 'safe', i18nKey: 'safe' },

  // ── halloween (3) ──
  { file: 'halloween-ghost.png',   category: 'halloween', risk: 'safe', i18nKey: 'safe' },
  { file: 'halloween-pumpkin.png', category: 'halloween', risk: 'safe', i18nKey: 'safe' },
  { file: 'halloween-witch.png',   category: 'halloween', risk: 'safe', i18nKey: 'safe' },

  // ── legend (2)：传说款 + hero ──
  { file: 'golden.png',      category: 'legend', risk: 'safe', i18nKey: 'safe' },
  { file: 'hero-golden.png', category: 'legend', risk: 'safe', i18nKey: 'safe' },

  // ── holiday-season (27) ──
  { file: 'holiday-anniversary.png',  category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-aprilfool.png',    category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-arborday.png',     category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-babyshower.png',   category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-birthday.png',     category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-blackfriday.png',  category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-carnival.png',     category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-chongyang.png',    category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-christmas.png',    category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-cybermonday.png',  category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-diwali.png',       category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-dragonboat.png',   category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-earthday.png',     category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-easter.png',       category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-environment.png',  category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-fathersday.png',   category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-graduation.png',   category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-halloween.png',    category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-lantern.png',      category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-mothersday.png',   category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-newyear.png',      category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-pride.png',        category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-qingming.png',     category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-qixi.png',         category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-thanksgiving.png', category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-valentine.png',    category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'holiday-wedding.png',      category: 'holiday-season', risk: 'sprite-table', i18nKey: 'spriteTable' },

  // ── scene (7) ──
  { file: 'scene-autumn.png',    category: 'scene', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'scene-battery.png',   category: 'scene', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'scene-birthday.png',  category: 'scene', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'scene-megaphone.png', category: 'scene', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'scene-moon.png',      category: 'scene', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'scene-progress.png',  category: 'scene', risk: 'sprite-table', i18nKey: 'spriteTable' },
  { file: 'scene-rainy.png',     category: 'scene', risk: 'sprite-table', i18nKey: 'spriteTable' },
]

// ── 分类展示顺序（验收页资产墙） ──────────────────────────────────────
export interface CategoryMeta {
  id: AssetCategory
  /** i18n key（在 messages 文件里是 dev.buddy.category.<id>） */
  i18nKey: string
  /** emoji 标识（无需 i18n） */
  emoji: string
}

export const ASSET_CATEGORIES: CategoryMeta[] = [
  { id: 'anim-baseline',   i18nKey: 'animBaseline',   emoji: '✅' },
  { id: 'anim-anomaly',    i18nKey: 'animAnomaly',    emoji: '⚠️' },
  { id: 'occupation',      i18nKey: 'occupation',     emoji: '👨‍💻' },
  { id: 'holiday-season',  i18nKey: 'holidaySeason',  emoji: '🎉' },
  { id: 'scene',           i18nKey: 'scene',          emoji: '🌃' },
  { id: 'expression',      i18nKey: 'expression',     emoji: '😀' },
  { id: 'sticker',         i18nKey: 'sticker',        emoji: '✨' },
  { id: 'halloween',       i18nKey: 'halloween',      emoji: '🎃' },
  { id: 'legend',          i18nKey: 'legend',         emoji: '🏆' },
]

// ── 主题列表（6 色，验收页与 BuddyAvatar 共用） ───────────────────────
export const BUDDY_THEMES: { id: BuddyTheme; i18nKey: string; hex: string }[] = [
  { id: 'lavender',  i18nKey: 'themeLavender',  hex: '#C4B5FD' },
  { id: 'mint',      i18nKey: 'themeMint',      hex: '#6EE7B7' },
  { id: 'sakura',    i18nKey: 'themeSakura',    hex: '#F9A8D4' },
  { id: 'moonlight', i18nKey: 'themeMoonlight', hex: '#93C5FD' },
  { id: 'warm',      i18nKey: 'themeWarm',      hex: '#FDBA74' },
  { id: 'charcoal',  i18nKey: 'themeCharcoal',  hex: '#6B7280' },
]

// ── 配饰列表（8 种，验收页与 BuddyAvatar 共用） ───────────────────────
export const BUDDY_ACCESSORIES: { id: BuddyAccessory; i18nKey: string; emoji: string }[] = [
  { id: null,        i18nKey: 'accessoryNone',  emoji: '∅' },
  { id: 'scarf',     i18nKey: 'accessoryScarf', emoji: '🧣' },
  { id: 'bell',      i18nKey: 'accessoryBell',  emoji: '🔔' },
  { id: 'star',      i18nKey: 'accessoryStar',  emoji: '⭐' },
  { id: 'moon',      i18nKey: 'accessoryMoon',  emoji: '🌙' },
  { id: 'leaf',      i18nKey: 'accessoryLeaf',  emoji: '🍃' },
  { id: 'note',      i18nKey: 'accessoryNote',  emoji: '🎵' },
  { id: 'heart',     i18nKey: 'accessoryHeart', emoji: '💗' },
]

// ── 状态列表（8 state，验收页控制面板用） ─────────────────────────────
export const BUDDY_STATES: { id: BuddyState; i18nKey: string; emoji: string }[] = [
  { id: 'idle',    i18nKey: 'stateIdle',    emoji: '😌' },
  { id: 'breath',  i18nKey: 'stateBreath',  emoji: '🌬️' },
  { id: 'blink',   i18nKey: 'stateBlink',   emoji: '👁️' },
  { id: 'greet',   i18nKey: 'stateGreet',   emoji: '👋' },
  { id: 'success', i18nKey: 'stateSuccess', emoji: '✨' },
  { id: 'miss',    i18nKey: 'stateMiss',    emoji: '😢' },
  { id: 'sleep',   i18nKey: 'stateSleep',   emoji: '😴' },
  { id: 'sign',    i18nKey: 'stateSign',    emoji: '🪧' },
]
