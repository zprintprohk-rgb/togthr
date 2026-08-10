# Togthr → AI 宠物转型 · 5-Sprint 执行方案（V2，含引擎与发布）

> 基于：审计报告 a056386 → 6d248c5（docs/audit-transformation-report-2026-08-10.md + docs/transformation-sprint-plan.md）
> 制定：2026-08-11 | 执行者：AutoClaw（togthr agent）

---

## 5.1 Sprint 总览

| Sprint | 内容 | 工时 | 周次 | 交付物 | 验收标准 |
|---|---|---|---|---|---|
| S1 DELETE | 删 chat 12 文件 / RelationModeSelector / couples 等 | 2h | W1 | 清理完成 | tsc 0 错误、零情侣残留 |
| S2 REFACTOR | 首页/daily/journal/pet/pricing 去情侣化 | 10h | W2-W4 | 核心页语义改造 | 34 处引用清零 |
| S3 CONTENT | Blog 15 篇 / pSEO 20 条清理 | 4h | W5-W6 | 内容层零情侣残留 | 关键词替换完成 |
| S4 ENGINE | DeepSeek AI 对话 / 性格系统 / 记忆引擎 | 6h | W6-W9 | MVP 可对话宠物 | API<2s，回复 20-50 字 |
| S5 LAUNCH | Widget iOS / 实体原型 50 个 / PH 发布 | 持续 | W8-W12 | 公测上线 | D1>40%，1000 用户 |

## 5.2 S1 DELETE 详细执行清单（最高优先级）

| # | 文件/目录 | 操作 | 风险 | 回滚方案 | 状态 |
|---|---|---|---|---|---|
| 1 | src/app/[locale]/chat/（12 文件） | 删除 | 低 | Git revert | ⏳ |
| 2 | src/components/pet/tracestream.tsx（F1） | 删除 | 中 | 检查 PetDetailClient 引用 | ⏳ |
| 3 | src/components/pet/signalbuttons.tsx（F2） | 删除 | 中 | 检查 HomeClient 引用 | ⏳ |
| 4 | src/components/shared/RelationModeSelector.tsx | 删除 | 高 | 检查首页引用链 | ⏳ |
| 5 | src/app/[locale]/couples/（落地页） | 删除 | 低 | Git revert | ⏳ |
| 6 | src/app/api/og/（OG API route） | 删除 | 低 | 不影响核心功能 | ⏳ |
| 7 | src/app/[locale（破损目录） | 删除 | 低 | 确认无有效路由 | ⏳ |
| 8 | 情侣博客 ~15 篇 | 删除 | 低 | 备份后删除 | ⏳ |
| 9 | 情侣 pSEO ~20 条目 | 删除 | 低 | 备份后删除 | ⏳ |
| 10 | blogctabanner.tsx /couples 链接 | 已改 ✅ | — | — | ✅ |
| 11 | MobileNav.tsx /couples 链接 | 已改 ✅ | — | — | ✅ |
| 12 | layout.tsx 桌面导航 | 已改 ✅ | — | — | ✅ |

**依赖关系图（删除风险链）**：
```
PetDetailClient ← tracestream/signalbuttons ← HomeClient ← RelationModeSelector
删除时必须同步清理引用，否则 tsc 报错。
```

## 5.3 S2 REFACTOR 详细执行清单

| # | 页面 | 改造内容 | 工时 | 负责人 |
|---|---|---|---|---|
| 1 | 首页 (page.tsx) | 删除情侣叙事 Hero；改为"你的 AI 伙伴，安静地陪着你成长" | 2h | AutoClaw+K3 |
| 2 | /daily | 删除双人问题；改为单人自我关怀日记 | 2h | AutoClaw |
| 3 | /journal | 删除 shared 语义；改为个人记忆记录 | 2h | AutoClaw |
| 4 | /pet, /companion | 文案改造：删除"TA"指代；改为"它/Buddy" | 2h | K3 文案+AutoClaw |
| 5 | Onboarding | 删除情侣条目；改为单人宠物孵化仪式 | 1h | AutoClaw |
| 6 | Features/For/P/Blog | 删除情侣相关内容 | 1h | AutoClaw |
| 7 | Pricing | 删除 soulmate tier；改为单人订阅 | 1h | AutoClaw |
| 8 | MobileNav/BlogCTABanner | /couples → /companion（已完成 ✅） | 0h | — |
| 9 | Couples 表单 | 删除或改为单人信息表单 | 1h | AutoClaw |
| 10 | Community metadata | 删除情侣社区相关 | 1h | AutoClaw |

## 5.4 S3 CONTENT 详细执行清单

| # | 内容类型 | 数量 | 操作 | 新主题方向 |
|---|---|---|---|---|
| 1 | 情侣博客 | ~15 篇 | 删除或重写 | AI 宠物养护/自我关怀 |
| 2 | 情侣 pSEO | ~20 条 | 删除或重写 | "虚拟宠物 APP"/"自我关怀工具" |
| 3 | 情侣/soulmate OG 图 | ~5 张 | 删除 | 重新生成宠物主题 OG |
| 4 | 定价页文案 | 1 页 | 重写 | 删除"双人"/"soulmate" |
| 5 | 邮件模板 | ~3 套 | 重写 | 删除情侣纪念日提醒 |

## 5.5 S4 ENGINE 详细执行清单

| # | 模块 | 技术方案 | 工时 | 依赖 |
|---|---|---|---|---|
| 1 | DeepSeek API 接入 | Vercel AI SDK 适配 | 1h | DeepSeek API Key |
| 2 | Prompt 构建器 | 动态注入性格/状态/记忆 | 2h | K3 Prompt v1.0 |
| 3 | 对话 API 路由 | POST /api/chat，流式响应 | 1h | — |
| 4 | 记忆系统 | Redis 短期 + PostgreSQL 长期 | 2h | Supabase |
| 5 | 情感计算 | 规则引擎 + 情绪检测 | 1h | — |
| 6 | 宠物性格系统 | 5 维度模型 + 经验值 | 2h | — |
| 7 | 动画状态联动 | talking/thinking 驱动前端 | 1h | 设计师资产 |
| 8 | 对话限制器 | 每日 10-20 轮限制 | 1h | — |

> ⚠️ 合规提示：S4 引入对话能力需保持 "quiet companion" 红线——产品文案仍禁用 chat/聊天 措辞，用"回应/陪伴"表达；博客内容可讨论 AI companion 品类。

## 5.6 S5 LAUNCH 详细执行清单

| # | 任务 | 时间 | 预算 | 验收标准 |
|---|---|---|---|---|
| 1 | iOS Widget 开发 | W8-W10 | $0 | 锁屏呼吸动画 |
| 2 | 实体原型 50 个下单 | W9 | $1,350 | 工厂确认 MOQ |
| 3 | 用户测试 10 人 | W10 | $0 | NPS>50 |
| 4 | Product Hunt 预热页 | W10 | $0 | 邮箱收集>500 |
| 5 | Product Hunt 发布 | W12 | $0 | Top 10 of the Day |
| 6 | 3 条短视频制作 | W11 | $500 | 单条播放>1万 |
| 7 | KOL 种子 30 人联系 | W9-W12 | $750 | 30% 发布率 |

## 附录：执行检查清单

**每日检查（开发期）**
- [ ] tsc 0 错误
- [ ] 零情侣残留（grep "couple|soulmate|TA|伴侣"）
- [ ] AI 对话红线检查（浪漫/索取/冗长/幻觉）

**每周检查（Sprint Review）**
- [ ] Sprint 目标完成度
- [ ] 代码 Review 通过
- [ ] 用户测试反馈
- [ ] 竞品动态监控

**决策门检查（Go/No-Go）**

| 决策门 | 时间 | 标准 | 通过→ | 失败→ |
|---|---|---|---|---|
| DG1 | W4 | tsc 0 + 零情侣残留 | S3 | 暂停复盘 |
| DG2 | W8 | AI 对话<2s + 符合性格 | S5 | 简化规则引擎 |
| DG3 | W12 | D1>40% + 1000 用户 | 寻求 Seed | Pivot 纯实体 |
