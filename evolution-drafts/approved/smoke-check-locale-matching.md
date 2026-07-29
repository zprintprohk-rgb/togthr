# Evolution Proposal: 记录唐总强调的字符串匹配陷阱：检查 llms.txt / hreflang 中"无某 locale"时不能用 includes，会误匹配 https/script 等

- Proposal-ID: evo-2026-07-29-smoke-check-locale-matching
- Status: approved
- Signature: smoke-check-locale-matching
- Created-At: 2026-07-29 01:57
- Last-Seen-At: 2026-07-29 01:57
- Target-File: MEMORY.md
- Trigger-Type: preference
- Confidence: medium

## Why This Matters
- 记录唐总强调的字符串匹配陷阱：检查 llms.txt / hreflang 中"无某 locale"时不能用 includes，会误匹配 https/script 等

## Evidence
- Interactive proposal card was present in the session UI.
- The original pending draft file was unavailable at approval time.
- AutoClaw reconstructed this draft from the proposal payload so the review result can still be recorded.

## Duplicate Check
- Checked: pending draft path + signature/proposal fallback
- Result: original draft file missing
- Decision: create surrogate draft from proposal payload

## Proposed Change
### MEMORY.md +烟雾检查字符串匹配陷阱

# MEMORY.md — Durable Preferences & Lessons

## 交付物规则

- **完整自包含交付**：交付 prompt、文档、方案时，必须是一次性可直接 paste 使用的完整版本——不分段、不引用"见上版"、不依赖上下文才能理解。收到交付物的人应该能直接用，不需要翻聊天记录。

## 烟雾检查 / 字符串匹配陷阱

- **检查"无某 locale"禁用 includes()**：在 llms.txt、hreflang 标签等 HTML/文本内容中判断"不包含 pt 等 locale 代码"时，**绝对不能用 `includes('pt')`**。短 locale 代码会误匹配 `https`、`script`、`accept`、`description`、`javascript`、`prompt` 等常见字符串。正确做法是用正则词边界 `\bpt\b` 或 `(?:^|\s|,)pt(?:$|\s|,)` 做精确匹配。

## Apply Plan
1. Keep this reconstructed draft as the approval artifact.
2. Record the proposal content exactly as shown in the interactive card.
3. Append an audit note after approval or rejection.

## User Approval
- Approve: 批准 evo-2026-07-29-smoke-check-locale-matching
- Reject: 拒绝 evo-2026-07-29-smoke-check-locale-matching