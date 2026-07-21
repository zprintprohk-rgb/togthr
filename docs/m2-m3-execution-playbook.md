# M2-M3 执行层 (mini m3) Playbook — 实战材料

> 配套 m2-m3-playbook.md（战略层 K3 视角），本文是执行层"可立即动手"的全部材料。
> 覆盖：M2-03 / M2-05 / M3-01 / M3-04 / M3-05 五个需要真人/账号/MD 文件落库的任务卡。

---

## 一、M2-03 Reddit 养号（启动 → 2 周后发帖）

### 1.1 准备：注册 2 个账号

| 账号 | 邮箱 | 用途 |
|---|---|---|
| togthr-pa-1 | (新邮箱 1) | 主发号，r/LongDistance + r/LDR + r/productivity |
| togthr-pa-2 | (新邮箱 2) | 备份号，r/virtualpets + r/tamagotchi |

**账号设置**:
- Username 不要带 "togthr" / "marketing" / "coupleapp" 任何推广痕迹
- Bio 写"couple, building small things, curious about long-distance"
- 头像:不要用 logo,放一张普通生活照/风景
- 关注 30–50 个和目标 sub 相邻的小号（让订阅 feed 看起来正常）

### 1.2 5 个目标 sub + 风格指南

| Sub | 人数 | 风格 | 评论频率上限 |
|---|---|---|---|
| r/LongDistance | 290K | 真诚、故事化、偏情感 | 1 条/天 |
| r/LDR | 180K | 更具体、有数字、有时间线 | 1 条/天 |
| r/virtualpets | 60K | 偏怀旧/技术、问问题、聊软件 | 2 条/天 |
| r/tamagotchi | 35K | 怀旧向、对老游戏有感情 | 1 条/2 天 |
| r/productivity | 1.4M | 偏研究/方法、不要推广味 | 1 条/2 天 |

### 1.3 真人评论模板 (5 条 — 每个 sub 一条,纯手写,不能用 AI)

#### r/LongDistance
> "We did this thing for 18 months where every Sunday we each wrote one sentence to the other, in a shared note. No emoji, no 'good morning beautiful'. Just one sentence. By month 6 the sentences were getting really short, by month 12 they were getting really honest. We stopped after we closed the distance but I miss the rule. — not affiliated, just a thought"

#### r/LDR
> "The timezone gap got us for a long time. What finally worked: we picked ONE hour a week that both of us would protect, even if it was 6am for one and 11pm for the other. Six months in, that hour is the only thing we have not cancelled. Took us 18 months to figure this out, don't recommend learning it the hard way like we did."

#### r/virtualpets
> "Question for the room: has anyone tried a virtual pet that lives on your desktop as a productivity thing? I came across one recently (won't name it, just curious if the format works). The 'small pixel that doesn't do anything' angle is interesting. Wondering if it's gimmicky or actually sticks. Genuine question."

#### r/tamagotchi
> "I still have my original 1997 P1. The batteries have been dead for 15 years. I can't bring myself to throw it out. Recently I started wondering if there's a software version that has the same 'low-stakes care' feeling without the 'this thing will die in 3 days' anxiety. Anyone found one?"

#### r/productivity
> "Hot take: streak counters are productivity theater. They make you feel like you've done something, but the second you break the streak you feel worse than if you'd never started. I switched to a system where the 'reward' is a tiny pixel pet that just sits there, and the loss is the pixel pet looking bored. Way less guilt, same consistency. Not affiliated, just what worked."

### 1.4 养号每日 log 模板 → `docs/reddit-warmup-log.md`

```markdown
# Reddit 养号日志 — togthr-pa-1 / togthr-pa-2

## Week 1 (2026-07-22 → 2026-07-28)

### Day 1 (2026-07-22)
- togthr-pa-1: 在 r/LongDistance 评论 1 条 (内容 3 句以上, 真实经验)
- togthr-pa-1: 在 r/virtualpets 评论 1 条 (提问)
- togthr-pa-2: 在 r/tamagotchi 评论 1 条 (怀旧向)
- Karma delta: pa-1 +8, pa-2 +4
- 反链: 0
- 自评: OK, 没有 AI 味, 真人测试通过 (让一个朋友盲评)

### Day 2 (...)
...
```

**铁律**:
- 任何评论如果被 subreddit 自动 mod 标记 spam, 立即 24h 不再发言
- 7 天内如果 Karma 没涨 (新号前 7 天被 down 很正常), 调整语气, 提更多问题、减少自述
- 14 天未到, 任何包含 "togthr" 字样的评论都禁止

---

## 二、M2-05 Product Hunt 预热

### 2.1 5 张截图清单 (按 PR 顺序, 用 Figma/截图工具制作)

| # | 主题 | 尺寸 | 包含内容 |
|---|---|---|---|
| 1 | Hero | 1280×800 | 公仔舱正面 + tagline 候选 1 (见 §2.2) + "Available Now" |
| 2 | Pricing | 1280×800 | 定价页 3 tier, 重点突出 $5.49 月费 + 6 皮肤 + 5 阶段 |
| 3 | Focus Mode | 1280×800 | Focus Mode running 状态 + 公仔陪伴 + streak 7 |
| 4 | Mobile | 750×1334 | 移动端伴侣页 + 一天 3 个仪式 (早安/晚安/打卡) |
| 5 | 像素公仔特写 | 1280×800 | 6 款皮肤 grid + 1/72 金色变体对比 |

### 2.2 Tagline 3 候选 (PH 一句话 + Maker comment 用)

1. **"A pixel pet that grows with your relationship"** — 慢热, 强调关系共同成长
2. **"Tamagotchi for couples, living on your desktop"** — 怀旧 + 桌面场景双钩
3. **"Raise a tiny robot together, watch your love grow"** — 动作向, 强调"一起"

**主选**: 候选 2 (怀旧词 "Tamagotchi" 在 PH 流量最高)
**Maker comment 备用**: 候选 1 (讲为什么做这个产品, 真诚)

### 2.3 60 秒录屏脚本 (即用稿)

```
[0-5s]   黑屏 → 公仔舱在清晨小窗, 一封未读消息弹出
         文案: "Every morning, this is the first thing I open."
[5-12s]  我打开消息, 看到女友 6 小时前留的早安便签
         公仔转头看了我一眼 (回家问候 sprite 帧 1+2)
[12-25s] 演示公仔开心反应 (帧 3+4), 切到 "We both showed up today" 状态
         文案: "We both showed up today. The pet noticed."
[25-40s] Focus Mode 启动, 25 分钟倒计时, 公仔 working 状态
         文案: "I work. The pet sits with me."
[40-50s] 完成态: 公仔 success + streak 7 天 + 彩带
         文案: "Day 7. Small. Quiet. Ours."
[50-58s] 时间胶囊: 我打开半年前的信, 公仔陪我看
         文案: "Last winter, we wrote this. Now we open it."
[58-60s] 黑屏 → "togthr.life · Free to start" + $5.49
```

### 2.4 Upcoming 页 → Launch 转换清单

- 提前 3 周开 Upcoming 页 → 每周一更内容 (开发日志 + 截图 + beta 反馈)
- 100+ follower 目标: 邀请亲友 + 在个人 Twitter/朋友圈发"我要发 PH 了, 帮我 follow"
- 5 个 hunter 备选清单 (见 §3.1)

---

## 三、M3-01 Product Hunt 发布剧本 (D-day)

### 3.1 Hunter 名单模板 (5 个, 按触达难度排)

| Hunter | 风格 | 触达方式 |
|---|---|---|
| 自己发 (no hunter) | 慢, 但最稳 | PH 自带 |
| Personal Twitter followers 中认识的 PM | 友好, 转化好 | DM 直接发 |
| Indie hackers Slack 里认识的 1 位 | 同类共情 | Slack DM, 不正式 |
| Friend who shipped on PH before | 经验足 | 微信 + 1 条"帮我看下 hunter 资格" |
| Unknown hunter in couples/AI niche | 运气成分大 | 邮件 (回复率 5-10%) |

### 3.2 D-day 时间线 (北京时间)

| 时间 | 动作 |
|---|---|
| 14:55 | 检查 PH 队列, 准备 maker comment 草稿 |
| 15:01 (太平洋 00:01) | PH 自动开 post, 立即发第 1 条 maker comment (真诚故事) |
| 15:05 | 同步发到个人 Twitter + LinkedIn |
| 15:10-15:30 | 私信 5 个亲友, "我刚发了 PH, 帮我 upvote" |
| 16:00-17:00 | 监控 comment, 全部回复 (24h 内必回每一条) |
| 17:00 | 第 1 次 progress check: < 30 upvote 启动 50 人 backup 群 |
| 18:00-22:00 | 持续 reply, 收集 comment 反馈做今晚 log |
| 23:00 | 终极目标: 200+ upvote, Top 5 of the day |
| 24:00 | 写发布复盘 → docs/ph-launch-D-2026-XX-XX.md |

### 3.3 承接 (24h 内)

- PH 专属落地页: `?ref=producthunt` 加 30 天 cookie, 首月 7 折
- 折扣码 `PH7` (PayPal 收单支持 discount)
- Twitter 长 thread: "I just launched on PH, here's the story"
- 知乎/小红书镜像: 中文版发布故事, 引流回 togthr.life/?ref=zhihu

---

## 四、M3-04 Reddit 发帖期 (M2-03 养号 2 周后启动)

### 4.1 发帖公式 (3 个固定槽)

1. **钩子** (第一句): "我和 [她/他] 在做一件很小的事"
2. **故事** (3-5 句): 时间线 + 一个具体细节 (截图/数字/日期)
3. **CTA** (放在 comment, 不放主帖): "我们俩的小实验 → profile, 不强推"

**红线**:
- 主帖禁止任何 "我们做了 [产品名] 给你用" 句子
- 链接只放个人主页, 不放产品直链
- 30 天内同 sub 不发第 2 帖

### 4.2 5 帖草稿 (M3-04 ready to post after warmup)

#### 草稿 1: r/LongDistance
> **Title**: "After 22 months apart, my partner and I started a tiny pixel pet that watches us both. It's weirdly helped."
>
> **Body**: We're both in tech but neither of us is the "tracking app" type. We tried the couples apps. Most of them died by week three. Then I built a tiny pixel pet that lives on my desktop and a matching one on hers. The pet's mood reflects whether we both showed up that day. It's not gamified — no streaks, no leaderboard, no "achievement unlocked". Just a tiny pixel that looks happy if we both sent a one-line note, and looks bored if one of us didn't.
>
> 4 months in. We're still doing it. The pet is on day 87.
>
> If anyone's curious I put it at togthr.life. (Mods, this is my own project — I won't argue if you want to take it down. Posting because the format genuinely helped us and I think more couples in this sub would benefit from something quieter than the usual couples-app list.)

#### 草稿 2: r/virtualpets
> **Title**: "I made a virtual pet for couples, and the design constraint that changed everything"
>
> **Body**: The original constraint: no streak counter. The reasoning: a pet that punishes you for missing a day becomes a chore, and a chore gets deleted. The replacement: a pet that simply has moods. Happy = both partners showed up. Bored = one of us didn't. Sad = both of us didn't.
>
> What I didn't expect: the pet's mood being a private thing (only the two of you see it) made it a much softer signal than a notification or a streak. There's no social pressure — you can miss a day and your partner sees the pet looking bored, and that's the whole conversation. No "you broke the streak", no shame.
>
> It's at togthr.life. Curious if other people have built around the same constraint.

#### 草稿 3: r/tamagotchi
> **Title**: "Modern Tamagotchi that doesn't kill your pet if you forget for 3 days"
>
> **Body**: The 1997 P1 taught me what 'guilt in a keychain' feels like. I wanted a 2026 version that has the same 'small creature depends on you' warmth, but without the 'die after 3 days' anxiety.
>
> My attempt: a pixel pet that lives on the desktop, reacts to your real-life small gestures (sending a one-line note, completing a focus session, etc.) but never dies, never punishes, never goes below a baseline mood. It has 5 growth stages and a 1/72 chance of being gold (long-running easter egg).
>
> If anyone's curious: togthr.life. Free tier exists. No pay-to-not-die nonsense.

#### 草稿 4: r/productivity
> **Title**: "I removed the streak counter from my focus app. My consistency went up."
>
> **Body**: I'm a 12-year productivity nerd. I had streak counters everywhere. They worked for 3 weeks, then they became the thing I avoided. Every miss felt like a personal failure.
>
> Switched to a focus app where the 'reward' is feeding a small pixel pet. The pet doesn't break if you miss a day. It just looks bored. The absence of a streak counter was, paradoxically, the thing that made me show up every day.
>
> Togthr.life has this. The 25-minute focus mode feeds the pet. Skipping a day makes it droop. Three days of skipping doesn't break anything — you just see a small pixel pet that looks a little sadder than yesterday.
>
> This is my own project. Posting because the design pattern is reusable.

#### 草稿 5: r/LDR
> **Title**: "The one ritual that survived 18 months of LDR — and why I'm scared to break it"
>
> **Body**: My partner is 9 time zones away. We tried the 2-hour video calls, the surprise visits, the couples apps. Most faded by month 3.
>
> The one that survived: every morning, one of us opens a small desktop app, types one sentence to the other, and a tiny pixel pet looks at us. The pet's mood for the day reflects whether both of us did this. No streak, no "send to confirm" notification. Just a small quiet daily thing.
>
> 18 months in. We have not missed a day since April. The pet is now on stage 4 (out of 5).
>
> This is my project. It's at togthr.life if anyone wants to try the same pattern. Mods can take it down if it doesn't fit — I genuinely just wanted to share what worked, not promote.

### 4.3 发帖节奏 (post 1 → post 5)

| 周 | 帖 | Sub |
|---|---|---|
| W3 (8/4) | 草稿 1 | r/LongDistance |
| W3 (8/6) | 草稿 2 | r/virtualpets |
| W4 (8/11) | 草稿 3 | r/tamagotchi |
| W4 (8/13) | 草稿 4 | r/productivity |
| W5 (8/18) | 草稿 5 | r/LDR |

**回滚规则**: 任一帖被删, 立即停发剩余, 1 周后再启

---

## 五、M3-05 GEO 月检 (每月 1 号 14:00 cron)

### 5.1 10 个目标问题清单

| # | 问题 | 期望被引用的页面 |
|---|---|---|
| 1 | best virtual pet app 2026 | /blog/best-virtual-pet-apps-2026 |
| 2 | what is a pixel pet | /blog/tamagotchi-app-2026 |
| 3 | couples app for long distance | /blog/how-to-feel-close-in-a-long-distance-relationship |
| 4 | tamagotchi for adults | /blog/digital-pet-nostalgia-2026 |
| 5 | how to feel close in long distance | /blog/how-to-feel-close-in-a-long-distance-relationship |
| 6 | desktop pet for productivity | /blog/pixel-pet-widget-desktop |
| 7 | couples daily check-in app | /blog/daily-check-in-app-for-couples |
| 8 | ai companion relationship | /blog/ai-companion-for-relationship-not-replacement |
| 9 | study focus app with pet | /blog/study-focus-pet-app |
| 10 | halloween virtual pet | /blog/halloween-virtual-pet-guide |

### 5.2 检查模板 → `docs/geo-monthly-check-2026-XX.md`

```markdown
# GEO 月度自检 — 2026-XX

## 数据
- 检查日期: 2026-XX-01
- 检查员: mini m3
- 平台: ChatGPT (GPT-4o) / Perplexity / Kimi / Claude / Gemini
- 每个问题在每个平台问 1 次,记录是否引用 toghr.life

## 引用矩阵 (是/否/部分引用)

| 问题 | ChatGPT | Perplexity | Kimi | Claude | Gemini |
|---|---|---|---|---|---|
| best virtual pet app 2026 | ✓ | ✓ | ✗ | ✓ | ✗ |
| what is a pixel pet | ... | ... | ... | ... | ... |
| ... |

## 引用率
- 平台平均: X / 50 (引用数 / 总问题数)
- 上月对比: ±Y%

## 行动
- 未被引用的页面: 加 internal link, 补 FAQ Q&A, 改写 intro 段
- 被部分引用的: 把答案直接做成 80 词内的 standalone 段
- 跨平台差异: 看哪个 LLM 缺, 针对该平台 prompt 调优
```

### 5.3 自动化脚本 (mini m3 每月 1 号 14:00 跑)

```bash
# docs/geo-monthly-check.sh
for platform in chatgpt perplexity kimi claude gemini; do
  for q in "best virtual pet app 2026" "what is a pixel pet" ...; do
    curl -s "https://$platform.com/api/..." -d "{\"q\":\"$q\"}" \
      | jq -r '.response | select(test("togthr.life")) | "✓"' \
      || echo "✗"
  done
done > ../geo-monthly-check-$(date +%Y-%m).md
```

(注: 各平台 API 接入方式不同, 实际由 mini m3 跑时用 Playwright 替代)

---

## 总结: 5 个 docs 类任务的立即行动清单

| 任务 | 立刻做 | 14 天后做 |
|---|---|---|
| M2-03 Reddit 养号 | 注册 2 号 + 写 5 真人评论 + 开 log | - |
| M2-05 PH 预热 | 5 截图 + 3 tagline + 录屏 + Upcoming 页 | 积累 100+ follower |
| M3-01 PH 发布 | 准备 hunter 名单 + 折扣码 | D-day 剧本执行 |
| M3-04 Reddit 发帖 | 5 帖草稿存档 | W3-W5 分散发布 |
| M3-05 GEO 月检 | 10 问题清单 | 每月 1 号 cron 跑 |

所有真人操作的部分 (账号注册/PH 提交/Reddit 发帖) 需要唐总亲自执行, mini m3 负责材料和自动化脚本。
