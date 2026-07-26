
## 2026-07-22 K3 v2 §7 阶段 1 升级

### 触发
- 竞品抓取报告 competitor-research-2026-07-22.md 完成
- 8 关键词平均垄断度 = 99.6% ≥ 80 阈值 → K3 §7 阶段 0 → 阶段 1 升级触发

### 决策
- K3 v2 §7 阶段 1 铁律: **仅 Hermes 静态页验证, M3 禁用**
- 所有 togthr M3 内容生产 cron 必须 disable (M3 = 批量内容生成, 阶段 1 禁)
- toghr 验证基础设施 (smoke) 和月度战略保持
- 阶段 1 工作 (32 静态页 + 2 对比 + Tamagotchi 30 周年) 全部走 general agent (Hermes 等价)

### 执行 (本批次)
**DISABLED 5 M3 内容 cron**:
- togthr-daily-content (82ed4bda) — M3 每日 SEO 内容
- togthr-daily-content-auto (5b1c224a) — M3 auto-trigger
- togthr-daily-content-retry-1 (6940293f) — M3 retry
- togthr-daily-content-retry-2 (0cb00b76) — M3 retry
- togthr-daily-verify (3bcdfc66) — M3 验证 (验证 M3 工作, 阶段 1 无 M3 工作)

**KEEP ENABLED 1 验证 cron**:
- togthr-weekly-smoke-N1-2026-07 (4f527bf5) — N1 回归, 阶段 1 验证基础设施

**KEEP ENABLED 1 战略 cron** (暂不动):
- togthr-monthly-strategy (aa450d49) — 月度战略回顾, 跨阶段通用

**KEEP DISABLED 1**:
- togthr-weekly-review (5b1c2cc2) — 已 disabled, 不动

### 阶段 1 工作 (待执行)
- 32 programmatic SEO 页面 (4 关系模式 × 8 locale)
- 2 篇对比文 (Togthr vs Widgetable / Togthr vs Replika)
- 1 篇 Tamagotchi 30 周年蹭流量文

### 阶段 2 触发条件
- 32 页全部署 + IndexNow 提交完成
- 48h 数据窗口 (GSC 收录 + 自然流量)
- 不达标 (任何 1 项 < 阈值) → 阶段 1 → 冻结
- 达标 → 阶段 3 (M3 启用) + 重新 enable M3 cron

### 上下文
- K3 宪法 v2 文档: F:\CloudDreamerApp\togthr\k3-ops-constitution-v2.md
- 阶段 0 报告: F:\CloudDreamerApp\togthr\docs\competitor-research-2026-07-22.md (99.6% 垄断度)
- user 拍板: 2026-07-22 15:53 CST 派发, user 授权升级 + 重新分配 crons
