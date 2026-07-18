# Focus Mode（专注模式）产品方案 v1

> 2026-07-18 · 定位：Togthr 海外增长的第一引流型功能
> 一句话：**番茄钟 + 公仔陪你学习/工作，专注成功它开心，玩手机它难过。**
> 验证依据：Focus Friend（美区 App Store #1）、Finch（1000 万下载）已证明该模式付费成立

---

## 1. 用户故事

- 作为学生，我打开 Focus Mode 定 25 分钟，公仔坐在我屏幕角落陪我一起"工作"（working 态 sprite），期间我切走刷手机，回来看到它趴着难过 → 愧疚感让我继续学习
- 专注完成后，公仔放烟花（success 态），我"喂"它一颗能量豆，它开心转圈 → 即时正反馈
- 连续 7 天完成专注，解锁"学者皮肤"→ 付费墙钩子

## 2. 交互流程（MVP，单设备网页版）

```
进入 /[locale]/focus
  │
  ├─ 选择时长：15 / 25 / 45 / 60 min（免费档最多 25min，Plus 解锁 45/60 + 自定义）
  │
  ├─ 开始 → 全屏极简深色界面：
  │     · 中央：公仔 working 帧动画（带呼吸光环）
  │     · 上方：剩余时间（大字号等宽数字）
  │     · 下方：一句轮换陪伴文案（8 语言）
  │     · 背景：极淡星尘粒子（复用 EmotionParticles intensity=0.2）
  │
  ├─ 干扰检测（网页版能做到的）：
  │     · document.visibilitychange → 切走超过 30 秒 → 公仔变 sleeping/难过表情 + 文案"我等你回来…"
  │     · 回来后 → 恢复 working，文案"欢迎回来，继续加油"
  │     · 切走超过 5 分钟 → 本次专注标记为"中断"，不计 streak（不给惩罚性失败，永远温柔）
  │
  ├─ 完成 →
  │     · success 动画 + 彩带粒子（复用 burst 效果）
  │     · +1 能量豆（喂给公仔，播放 eating 动画位）
  │     · streak +1，显示"连续专注 N 天"
  │     · 分享卡片（生成图：今日专注时长 + 公仔 + streak）→ 社媒传播钩子
  │
  └─ 数据落库 → focus_sessions 表
```

**设计红线**（符合品牌"永远温柔"）：中断不惩罚、不批评，只有"我等你回来"。

## 3. 数据结构（Drizzle / PostgreSQL）

```sql
create table focus_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null,               -- auth.users
  planned_minutes int not null,        -- 15/25/45/60/custom
  actual_seconds int not null default 0,
  status text not null default 'active',  -- active | completed | interrupted
  interruptions int not null default 0,   -- 切走次数（仅统计，不展示为负面）
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  created_at timestamptz not null default now()
);

create table focus_streaks (            -- 每个用户一行，cron 每日结算
  user_id uuid primary key,
  current_streak int not null default 0,
  longest_streak int not null default 0,
  last_completed_date date,             -- 用户本地日
  total_minutes int not null default 0,
  total_beans int not null default 0    -- 能量豆余额（喂食消耗）
);
```

- RLS：用户只能读写自己的行（service_role 全权）
- 结算逻辑：完成一次 ≥15min 专注 → streak+1；跨天 cron `check-subscriptions` 同款模式检测断签 → current_streak 归零（但公仔文案是"我们重新开始"）

## 4. UI 稿（文字版，开发直接照做）

### 4.1 入口
- 主导航加 `🎯 Focus`（MobileNav 同步）
- 首页 Bento 区第 8 张卡替换/新增："专注模式 / 公仔陪你学习"（i18n key: home.companions.cards.focus）

### 4.2 /focus 页（核心）
```
┌─────────────────────────────────┐
│  [导航栏-极简]                    │
│                                 │
│        24:37  ← 等宽数字 72px    │
│                                 │
│      ╭─────────╮                │
│      │  (公仔)  │ ← 256px,      │
│      │ working │   呼吸光环      │
│      ╰─────────╯                │
│                                 │
│   "我在陪你，一起加油。"          │
│                                 │
│   [放弃本次]（小字、不显眼）       │
└─────────────────────────────────┘
```
- 深色 `#0B0B1A` 底，玻璃拟态计时器
- 移动端全屏沉浸式；桌面端居中卡片
- 倒计时用 `document.title` 同步显示（切标签也能看到时间）

### 4.3 完成态
- 公仔 success 帧 + 彩带 burst
- 卡片：本次时长 / streak 天数 / [喂它一颗豆] [分享] [再来一轮]

### 4.4 付费墙位置
- 选 45/60 分钟时：锁图标 + "Plus 解锁更长专注" → /pricing
- 连续 7 天解锁学者皮肤提示："Plus 会员立即解锁全部 50+ 皮肤"

## 5. i18n key 规划（8 语言，各 ~15 条）

`focus.title / focus.subtitle / focus.durations / focus.start / focus.giveUp / focus.awayNotice / focus.welcomeBack / focus.complete.title / focus.complete.feed / focus.complete.share / focus.streak / focus.lockedPlus / ...`

## 6. SEO/GEO 配套（功能即流量）

- 落地页 `/en/features/focus-mode` 静态页（ssg），攻关键词：
  pomodoro pet / study with me app / focus timer with pet / virtual study companion
- 博客 2 篇：
  1. "A Pomodoro Timer With a Pixel Pet That Keeps You Honest"
  2. "Study With Me: Why a Tiny Robot on Your Screen Beats Willpower"
- llms.txt 功能清单加入 Focus Mode
- FAQ 增加问答对（GEO 引用格式）

## 7. 技术实现要点

- 纯前端计时器（setInterval + timestamp 校正，防后台漂移）+ 完成时 POST `/api/focus/complete`
- 复用资产：DesktopPet sprite（working/success/sleeping 态已有）、EmotionParticles、burst 彩带、玻璃卡片样式
- 新组件：`src/app/[locale]/focus/page.tsx` + `FocusClient.tsx` + `src/components/focus/FocusTimer.tsx`
- 分享卡片：Canvas 绘制 → PNG 下载（或 `navigator.share`）
- 埋点：focus_start / focus_complete / focus_interrupted / focus_plus_click

## 8. MVP 范围（2 天内可上线）

✅ 计时器 + 公仔陪伴 + 切走检测 + 完成奖励 + streak + 落库 + i18n
❌ 不做：双人一起专注（二期）、白噪音（二期）、手机小组件（三期）、成就皮肤发放（先手动）

## 9. 成功指标

- 周专注完成次数（北极星辅助指标）
- focus_start → focus_complete 完成率（目标 ≥60%）
- Focus 页 → pricing 点击率（目标 ≥3%）
- "pomodoro pet" 等词 GSC 曝光（M2 起观测）
