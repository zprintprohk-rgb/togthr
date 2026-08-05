# Evolution Proposal: 记录 PM 修正的产品定位与正确的 VoC 参考系，防止未来竞品分析走偏方向

- Proposal-ID: evo-2026-08-06-togthr-voc-reference-framework
- Status: approved
- Signature: togthr-voc-reference-framework
- Created-At: 2026-08-06 01:52
- Last-Seen-At: 2026-08-06 01:52
- Target-File: MEMORY.md
- Trigger-Type: preference
- Confidence: medium

## Why This Matters
- 记录 PM 修正的产品定位与正确的 VoC 参考系，防止未来竞品分析走偏方向

## Evidence
- Interactive proposal card was present in the session UI.
- The original pending draft file was unavailable at approval time.
- AutoClaw reconstructed this draft from the proposal payload so the review result can still be recorded.

## Duplicate Check
- Checked: pending draft path + signature/proposal fallback
- Result: original draft file missing
- Decision: create surrogate draft from proposal payload

## Proposed Change
### MEMORY.md

# MEMORY.md — Durable Preferences & Lessons

## 交付物规则

- **完整自包含交付**：交付 prompt、文档、方案时，必须是一次性可直接 paste 使用的完整版本——不分段、不引用"见上版"、不依赖上下文才能理解。收到交付物的人应该能直接用，不需要翻聊天记录。

## 烟雾检查 / 字符串匹配陷阱

- **检查"无某 locale"禁用 includes()**：在 llms.txt、hreflang 标签等 HTML/文本内容中判断"不包含 pt 等 locale 代码"时，**绝对不能用 `includes('pt')`**。短 locale 代码会误匹配 `https`、`script`、`accept`、`description`、`javascript`、`prompt` 等常见字符串。正确做法是用正则词边界 `\bpt\b` 或 `(?:^|\s|,)pt(?:$|\s|,)` 做精确匹配。

## Togthr SEO URL 规范

- **Canonical 域名是 `www.togthr.life`**：所有 SEO 相关 URL（canonical、hreflang、og:url、sitemap）必须使用 `https://www.togthr.life`（带 www），不是 `https://togthr.life`（裸域）。裸域会 301 跳转到 www，Google 会把两者当不同站点导致 hreflang 完全失效。
- **Hreflang href 必须包含 locale 路径段**：例如 `https://www.togthr.life/en/blog/xxx`，不能是 `https://www.togthr.life/blog/xxx`。缺 locale 段会导致 Google 无法正确匹配语言版本，hreflang 标签形同虚设。

## Togthr 产品定位与 VoC 参考系

- **核心定位修正**：Togthr 解决的是"守住人"，不是"找到人"。交友/约会 App（Tinder/Bumble 等）解决的是"找到人"，与 Togthr 痛点完全不同，不应作为 VoC 参考系。
- **正确 VoC 参考系四类**：
  1. **情侣 App**：Paired / Coral / Couple+ / Between / Agape 等
  2. **异地恋社区**：r/longdistance 等 Reddit 社区
  3. **AI 陪伴类产品**：Replika / Character.AI 等
  4. **关系维护/记录工具**：日记类、共享相册、纪念日提醒等
- **竞品分析时先确认**：分析任何竞品前，先判断它属于"找到人"还是"守住人"赛道——只有后者才是 Togthr 的真正参照。

## Apply Plan
1. Keep this reconstructed draft as the approval artifact.
2. Record the proposal content exactly as shown in the interactive card.
3. Append an audit note after approval or rejection.

## User Approval
- Approve: 批准 evo-2026-08-06-togthr-voc-reference-framework
- Reject: 拒绝 evo-2026-08-06-togthr-voc-reference-framework