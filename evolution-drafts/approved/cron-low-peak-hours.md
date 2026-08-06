# Evolution Proposal: 记录"定时任务优先安排在智谱算力低谷时段"的长期调度偏好，后续新增/调整 cron 任务时自动沿用，持续降低算力成本。

- Proposal-ID: evo-2026-08-06-cron-low-peak-hours
- Status: approved
- Signature: cron-low-peak-hours
- Created-At: 2026-08-06 19:06
- Last-Seen-At: 2026-08-06 19:06
- Target-File: MEMORY.md
- Trigger-Type: preference
- Confidence: medium

## Why This Matters
- 记录"定时任务优先安排在智谱算力低谷时段"的长期调度偏好，后续新增/调整 cron 任务时自动沿用，持续降低算力成本。

## Evidence
- Interactive proposal card was present in the session UI.
- The original pending draft file was unavailable at approval time.
- AutoClaw reconstructed this draft from the proposal payload so the review result can still be recorded.

## Duplicate Check
- Checked: pending draft path + signature/proposal fallback
- Result: original draft file missing
- Decision: create surrogate draft from proposal payload

## Proposed Change
### MEMORY.md 新增定时任务调度偏好

# MEMORY.md — Durable Preferences & Lessons

## 交付物规则

- **完整自包含交付**：交付 prompt、文档、方案时，必须是一次性可直接 paste 使用的完整版本——不分段、不引用"见上版"、不依赖上下文才能理解。收到交付物的人应该能直接用，不需要翻聊天记录。

## 烟雾检查 / 字符串匹配陷阱

- **检查"无某 locale"禁用 includes()**：在 llms.txt、hreflang 标签等 HTML/文本内容中判断"不包含 pt 等 locale 代码"时，**绝对不能用 `includes('pt')`**。短 locale 代码会误匹配 `https`、`script`、`accept`、`description`、`javascript`、`prompt` 等常见字符串。正确做法是用正则词边界 `\bpt\b` 或 `(?:^|\s|,)pt(?:$|\s|,)` 做精确匹配。

## Togthr SEO URL 规范

- **Canonical 域名是 `www.togthr.life`**：所有 SEO 相关 URL（canonical、hreflang、og:url、sitemap）必须使用 `https://www.togthr.life`（带 www），不是 `https://togthr.life`（裸域）。裸域会 301 跳转到 www，Google 会把两者当不同站点导致 hreflang 完全失效。
- **Hreflang href 必须包含 locale 路径段**：例如 `https://www.togthr.life/en/blog/xxx`，不能是 `https://www.togthr.life/blog/xxx`。缺 locale 段会导致 Google 无法正确匹配语言版本，hreflang 标签形同虚设。

## Togthr 产品定位与 VoC 参考系

- **核心定位**：Togthr 解决的是"守住人"，不是"找到人"。交友/约会 App（Tinder/Bumble/Hinge 等）与 Togthr 痛点完全不同——前者匹配陌生人，后者维护已有关系。竞品分析必须先判断对方属于哪条赛道，只有"守住人"赛道才是真正参照。
- **正确 VoC 信源四类**：① 情侣 App（Paired / Coral / Couple+ / Between / Agape）② 异地恋社区（r/longdistance）③ AI 伴侣舆论场（Replika / Character.AI 研究+评论）④ 电子宠物社区（Tamagotchi / Shimeji / Finch）。去交友网站挖矿会挖错矿。
- **VoC 六问框架**：① 为什么选择这个产品？② 什么让你每天回来？③ 什么时候感觉最依恋？④ 缺什么？⑤ 为什么弃了？⑥ 愿意为什么付钱？——这六问是 Job 5 周报的标准框架。

## 定时任务调度偏好（成本优化）

- **定时任务放在智谱算力低谷段**：7 个 cron 任务（日更博客 18:17 / pSEO 周一、四 18:43 / IndexNow 周二 19:11 / 线上 smoke 周三 19:37 / 竞品监控 周五 20:07 / 周报 周一 20:23 / GEO 自检）全部排在约 18:00-20:30（Asia/Shanghai）的算力低谷窗口以降低成本。以后新增或调整定时任务，同样优先排在该时段。

## Apply Plan
1. Keep this reconstructed draft as the approval artifact.
2. Record the proposal content exactly as shown in the interactive card.
3. Append an audit note after approval or rejection.

## User Approval
- Approve: 批准 evo-2026-08-06-cron-low-peak-hours
- Reject: 拒绝 evo-2026-08-06-cron-low-peak-hours

## Audit Note
- Decision: **APPROVED**（2026-08-06 19:06 Asia/Shanghai，用户明确批准）
- Applied: MEMORY.md 新增「定时任务调度偏好（成本优化）」小节，已写入。
- Post-apply status: 内容已生效；后续新增/调整 cron 任务时自动沿用低谷时段偏好。