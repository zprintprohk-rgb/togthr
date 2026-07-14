# Evolution Proposal: User repeatedly demands complete, self-contained deliverables (prompts, docs) that can be pasted and run directly — no fragmentation, no "see above version" references. Capturing this as a durable workflow rule.

- Proposal-ID: evo-2026-07-07-complete-deliverables-no-fragmentation
- Status: approved
- Signature: complete-deliverables-no-fragmentation
- Created-At: 2026-07-07 20:10
- Last-Seen-At: 2026-07-07 20:10
- Target-File: MEMORY.md
- Trigger-Type: preference
- Confidence: medium

## Why This Matters
- User repeatedly demands complete, self-contained deliverables (prompts, docs) that can be pasted and run directly — no fragmentation, no "see above version" references. Capturing this as a durable workflow rule.

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

## Apply Plan
1. Keep this reconstructed draft as the approval artifact.
2. Record the proposal content exactly as shown in the interactive card.
3. Append an audit note after approval or rejection.

## User Approval
- Approve: 批准 evo-2026-07-07-complete-deliverables-no-fragmentation
- Reject: 拒绝 evo-2026-07-07-complete-deliverables-no-fragmentation