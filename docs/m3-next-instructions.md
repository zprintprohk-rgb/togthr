# M3 下一阶段指令包（K3 战略层 → mini m3 执行层）

> 2026-07-21 · 前提：M2-M3 已交付上线、白底顽疾已根治、CI 全绿
> 用法：每张卡可单独粘贴给 mini m3 / Cline 执行

---

## 卡 N1【P0】上线质量回归（先行，防"自报完成"水分）
对以下做 200 状态 + 关键内容断言（curl 脚本存 scripts/smoke-prod.py）：
- 32 个博客 slug × /en 路径（抽样 10 个 + 最新 6 篇全量）
- /zh-cn/pricing 无英文泄漏（当前残留 4 条：Everything in Plus / All 50+ pet suits unlocked / Golden legendary pets / Priority support —— 修复 messages/zh-cn.json 的 pricing.eternalFeatures）
- /en/faq 含 FAQPage JSON-LD 且问答数 ≥40
- /pets/anim-greet-1..4.png 全部 200
- 定价页倒计时标签含 "Halloween" 且不含 "Spring Festival"
输出：docs/prod-smoke-2026-07-22.md 验收报告

## 卡 N2【P0】zh-cn 定价页英文泄漏修复
messages/zh-cn.json 中 pricing.eternalFeatures 4 条英文翻译为中文，
其他 7 语言自查同类泄漏。验收：4 道闸门全过 + 线上 zh-cn 定价页无英文特性串。

## 卡 N3【P1】双人共养（Co-raising）技术设计文档 —— M4-M5 病毒核心提前启动
写 docs/co-raising-design.md：
- 数据模型：pet 表加 owner_pair（user_a, user_b），invite_links 表（token, expires）
- 交互流：A 生成邀请链接 → B 打开 → 双方共养同一只宠物（喂食/成长双方可见）
- 病毒系数设计：B 打开链接时落地页 = "TA 邀请你一起养大这只小机器人" + 宠物当前状态截图
- 与现有 supabase schema 的兼容性、迁移 SQL
- 只出设计文档，不写实现代码

## 卡 N4【P1】TikTok/小红书素材包（为 M4 短视频放量备弹）
docs/short-video-kit.md：
- 5 条 15-30s 视频脚本（像素宠物成长延时、回家问候 4 帧动画、情侣共养场景、Focus Mode 陪伴、开箱隐藏金款 1/72）
- 每条含：分镜、文案、hashtag 组合（#pixelpet #desktoppet #tamagotchi #studytok）
- 录屏清单：需要唐总真人录的 5 个画面（手机竖屏 9:16）
- 小红书图文 3 篇草稿（像素风截图 + 温柔文案，不提价格不硬广）

## 卡 N5【P1】M3-05 GEO 月检（8/1 执行，可提前写好工具）
scripts/geo-check.md：10 个目标问题清单（best virtual pet app 2026 / tamagotchi app 2026 /
desktop pet for couples / AI companion for long distance relationship 等 × ChatGPT/Perplexity/Kimi），
结果记录模板 docs/geo-monthly-check.md。8/1 由唐总真人问 10 分钟，结果发我复盘。

## 卡 N6【P2】数据复盘基础设施
- PostHog 漏斗：visit → register → pricing_view → checkout_start → paid（确认每个事件已埋点，缺的补）
- docs/weekly-report-template.md：UV/注册/付费/Top5 页面/GSC 曝光词 周报模板

## 卡 N7【P2】年付促销落地页（M6 预热，低成本先做）
/pricing 增加年付省钱动效（已有 Save 38% 徽章，强化为对比条：月付 ×12 vs 年付），
博客 1 篇 "why yearly plans are an act of commitment"（集群 C 情感词）。
