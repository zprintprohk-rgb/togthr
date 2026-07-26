# Evolution Proposal: 记录定时任务调度规则：使用智谱 API 的 cron job 统一安排在算力低谷段（18:00-21:00 Asia/Shanghai）

- Proposal-ID: evo-2026-07-24-zhipu-offpeak-cron
- Status: approved
- Signature: zhipu-offpeak-cron
- Created-At: 2026-07-24 18:28
- Last-Seen-At: 2026-07-24 18:28
- Target-File: MEMORY.md
- Trigger-Type: preference
- Confidence: medium

## Why This Matters
- 记录定时任务调度规则：使用智谱 API 的 cron job 统一安排在算力低谷段（18:00-21:00 Asia/Shanghai）

## Evidence
- Interactive proposal card was present in the session UI.
- The original pending draft file was unavailable at approval time.
- AutoClaw reconstructed this draft from the proposal payload so the review result can still be recorded.

## Duplicate Check
- Checked: pending draft path + signature/proposal fallback
- Result: original draft file missing
- Decision: create surrogate draft from proposal payload

## Proposed Change
### MEMORY.md — 新增定时任务调度规则

# MEMORY.md — Durable Preferences & Lessons

## 交付物规则

- **完整自包含交付**：交付 prompt、文档、方案时，必须是一次性可直接 paste 使用的完整版本——不分段、不引用"见上版"、不依赖上下文才能理解。收到交付物的人应该能直接用，不需要翻聊天记录。

## 定时任务调度规则

- **智谱算力低谷优先**：所有依赖智谱 AI API 的定时任务（cron jobs），调度时间统一安排在智谱 GPU 算力低谷时段（Asia/Shanghai ~18:00-21:00）。当前 7 个任务均已落在此窗口内（18:17-20:23）。非智谱依赖的任务（如 IndexNow 提交）不受此约束，但仍以错峰为原则。

## Apply Plan
1. Keep this reconstructed draft as the approval artifact.
2. Record the proposal content exactly as shown in the interactive card.
3. Append an audit note after approval or rejection.

## User Approval
- Approve: 批准 evo-2026-07-24-zhipu-offpeak-cron
- Reject: 拒绝 evo-2026-07-24-zhipu-offpeak-cron