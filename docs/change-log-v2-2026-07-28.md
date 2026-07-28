# Togthr SEO/GEO 双引擎 V2 — 变更日志

> 来源：`docs/seo-geo-dual-engine-v2-review.md`（K3 审查，2026-07-28）
> 变更日期：2026-07-28
> 执行者：AutoClaw (togthr agent)

---

## 变更总览

| 类型 | 数量 | 说明 |
|---|---|---|
| 月计划文档重写 | 1 | V1 → V2，12 处事实修正 + 4 节新增 |
| Cron 任务修改 | 6/8 | Job 2/3/5/6/7×2 共 6 个更新，Job 1/4 引用更新 |
| 作废（评审裁定） | 2 卡 | SEO-FIX-01、旧 PAY-LIVE-01 步骤 |
| 新增 M3 Batch | 8 任务 | Batch A（5 任务 W1）+ Batch B（3 任务 W2）|
| 真人清单更新 | 4 项 | GA4 建 property / GSC 重提交 / Reddit 发帖 / GEO 90 问 |

---

## 逐卡变更明细

### 1. SEO-FIX-01 Worker 自愈 → 作废
- **评审裁定**：线上实测健康、CI 全绿，监控已由 Job 4（周三 19:37 smoke）覆盖，不重复建设
- **影响**：无 cron 新建，Job 4 描述中注明此卡作废原因

### 2. SEO-FIX-02 IndexNow 全量重提交 → ✅ 完成（Bing 侧）
- **ground truth**：Bing WMT 7/27 实测 **857** URL（0 错误），sitemap-0.xml 为 713（子集）。权威基准统一为 **Bing WMT "URLs discovered"**。
- **变更**：
  - Job 3 cron message 更新：提交清单基准 857，验证逻辑：增量 PASS = HTTP 200/202 且 ≥1；全量 PASS = 提交数 ≈ Bing WMT ±5%
  - 新增 M3 Batch A 任务 5：从 Bing WMT 获取最新 "URLs discovered"，对齐 IndexNow 清单
  - 月计划文档中所有 713 改为 857，增加"此后不再硬编码数字，Job 3 周报自动读取 Bing WMT"规则
  - GSC 侧（SEO-FIX-03）等唐总截图后判定
- **状态**：Bing 侧 ✅ 完成

### 3. SEO-FIX-03 GSC sitemap 重提交 → 采纳（改真人执行）
- **评审裁定**：GSC 后台操作只能唐总做
- **影响**：列入唐总真人操作清单第 2 项

### 4. PAY-LIVE-01 支付上线 → 重写
- **ground truth**：
  - 代码层据报已完成（commit cbda082）
  - 环境变量真源是 wrangler.toml，非 .env.production
  - 唐总已决定"有流量后再做"
- **变更**：
  - 降级为 P2 待命卡（不在 cron 中，不派 M3）
  - 操作步骤重写：环境变量只改 wrangler.toml
  - M3 只做代码层核验（触发时）

### 5. GEO-01 TL;DR × 5 页 → 采纳
- **ground truth**：4 页实测在线 200，第 5 页 virtual-pet-for-couples 待 M3 自核
- **变更**：列入 M3 Batch A 任务 1，完整执行指令在评审文档第五节

### 6. GEO-02 llms.txt 增强 → 采纳（修正）
- **事实修正**：附件将语言写成 "es, pt"——实际无 pt，8 语言为 en/zh-cn/zh-tw/ja/ko/de/fr/es
- **变更**：列入 M3 Batch A 任务 2，语言清单已修正

### 7. GEO-03 JSON-LD → 采纳
- **变更**：列入 M3 Batch A 任务 3，价格从 pricing-impl.ts 读取，禁止硬编码

### 8. SEO-TECH-02 GA4 → 采纳（仲裁）
- **仲裁决定**：GA4 上线，PostHog 冻结。GA4 与 GSC/Bing 生态打通是现阶段刚需
- **变更**：
  - 列入 M3 Batch A 任务 4
  - wrangler.toml 加 `NEXT_PUBLIC_GA4_ID` 占位（值 "G-PENDING"）
  - Job 6 周报新增 GA4 转化事件统计字段
  - 唐总真人清单第 1 项：创建 GA4 property

### 9. GEO-04 Reddit 5 帖 → 采纳（改真人执行）
- **评审裁定**：发帖是真人行为（养号期防封号），M3 只产出文案+时间表
- **变更**：列入 M3 Batch B 任务 1 + 唐总真人清单第 3 项

### 10. SEO-TECH-01 CWV → 采纳（降 P2）
- **评审裁定**：流量为 0 时 CWV 不是瓶颈，只做 3 个低成本项
- **变更**：列入 M3 Batch B 任务 3

### 11. GEO-05 GEO 月检扩 90 次 → 采纳（合并）
- **评审裁定**：并入现有 Job 7，不新建任务
- **变更**：
  - Job 7（8/1）从 10 问扩至 90 问（9 场景 × 10 问）
  - Job 7（8/24）从 10 问扩至 90 问 + 月度盘点报告
  - Job 7 两个 cron 均已更新 payload

### 12. CONTENT-01 pSEO 补译 → 采纳（排 Phase 2）
- **触发条件**：GSC 出现 pSEO 页首批曝光后
- **变更**：Job 2 维护模式中内置 Phase 2 触发检查逻辑

### 13. CONTENT-02 listicle × 3 → 采纳（排 Phase 2）
- **变更**：月计划 V2 待命卡记录，W5+ 启动

### 14. CONTENT-03 内链网络 → 采纳（提前到 W3）
- **评审裁定**：内链是 0 成本 SEO 动作，提前到 W3
- **变更**：列入 M3 Batch B 任务 2

---

## Cron 任务变更明细

| Job | V1 名称 | V2 名称 | 变更类型 |
|---|---|---|---|
| Job 1 | 日更博客 | 日更博客(V2) | 引用文档更新 + 避让周一/四 M3 窗口 |
| Job 2 | pSEO 落地页铺设 | pSEO 维护+收录推(V2) | **重大**：从生成模式切换为维护模式 |
| Job 3 | IndexNow 提交 | IndexNow 提交(V2) | 提交基数 384→857（Bing WMT 基准）+ 增量/全量双模式验证 |
| Job 4 | 线上健康 smoke | 线上健康 smoke(V2) | 引用文档更新 + 注明 SEO-FIX-01 作废 |
| Job 5 | 竞品监控 | 竞品监控(V2) | 新增 API 降级链（2 周失败→切换 web_search）|
| Job 6 | 周报自动生成 | 周报自动生成(V2) | 新增 GA4 + pSEO 收录进度字段 |
| Job 7 (8/1) | GEO 月检 10 问 | GEO 月检 90 问(8/1) | **重大**：10→90 问，9 场景 |
| Job 7 (8/24) | GEO 月检 + 盘点 | GEO 月检 90 问(8/24) | **重大**：10→90 问 + 月度盘点报告 |

---

## Ground Truth 事实修正清单（9 处，含 V2.1 追加）

| # | 错误 | 修正 | 影响 |
|---|---|---|---|
| 1 | 项目路径 `apps/web/src/...` | `src/...`（无 monorepo） | 全文路径替换 |
| 2 | pSEO 32 页目标 | **48 页已完成** | Job 2 切换维护模式 |
| 3 | sitemap 384/416 URL | **857 URL**（Bing WMT 7/27 实测，0 错误） | Job 3 + IndexNow 清单 |
| 4 | GEO-02 语言含 "es, pt" | **8 语言无 pt** | GEO-02 指令修正 |
| 5 | 环境变量 .env.production | **wrangler.toml** | PAY-LIVE-01 步骤重写 |
| 6 | Worker 自愈假设掉线 | **线上健康，CI 全绿** | SEO-FIX-01 彻底作废 |
| 7 | 假设 pSEO 等页面待上线 | **对比文/借势文 4 页实测 200** | GEO-01 前置已满足 |
| 8 | 对比文/借势文"已存在"假设 | **确认在线且可访问** | 无修正，假设正确 |
| 9 | sitemap V2 修正为 713 | **857（Bing WMT 7/27 实测，0 错误）** | Job 3 验证逻辑改为 ±5% Bing WMT 基准；此后不再硬编码数字 |

---

## 新增执行指令（M3 Batch A + B）

| Batch | 任务 | 产出路径 |
|---|---|---|
| A (W1) | GEO-01 TL;DR × 5 页 | 5 个 blog/page 文件内联 |
| A (W1) | GEO-02 llms.txt 增强 | `public/llms.txt` |
| A (W1) | GEO-03 JSON-LD | `src/app/[locale]/page.tsx` + `pricing/page.tsx` |
| A (W1) | SEO-TECH-02 GA4 部署 | `layout.tsx` + `wrangler.toml` |
| A (W1) | IndexNow 清单 857（Bing WMT 基准） | `scripts/indexnow-submit.py` |
| B (W2) | GEO-04 Reddit 5 帖文案 | `docs/reddit/posts-w2.md` |
| B (W2) | CONTENT-03 内链网络 | 48 个 `/p/` 页 + 共享组件 |
| B (W2) | CWV 三项优化 | 3 处代码修改 |

---

## 月计划文档结构变更

| 章节 | V1 | V2 |
|---|---|---|
| 北极星验收线 | 7 指标（pSEO 32 页） | 8 指标（pSEO 48 页 + GA4） |
| 定时任务矩阵 | 7 个 cron（含铺设模式） | 7 个 cron（含维护模式） |
| M3 手工执行 Batch | 无 | 新增第二节（Batch A W1 + Batch B W2） |
| 唐总真人清单 | 无 | 新增第三节（4 项本周必须） |
| 人工触点 | 5 项 | 5 项（更新 Reddit 频次 + GEO 90 问） |
| 逻辑验证规则 | 4 条 | 5 条（新增实测数字来源规则） |
| 待命卡 | 无 | 新增第八节（PAY-LIVE-01 / CONTENT-01 / CONTENT-02） |
| V1→V2 修订对照表 | 无 | 新增第九节（12 行对照表） |
| 执行入口指令 | 读 V1 文件 | 读 V2 文件 |

---

## 已知未解决项

| 项 | 状态 | 阻塞原因 |
|---|---|---|
| Job 1/2/5/6 连续 402 billing 错误 | 待唐总处理 | AutoClaw billing 额度耗尽（非本文档范围） |
| GA4 Measurement ID | 待唐总提供 | 需唐总在 analytics.google.com 建 property |
| GSC 曝光数据 | 待唐总填入 | 需唐总登录 GSC 截图 |
| Reddit 5 帖实际发布 | 待唐总 W2 执行 | 真人行为防封号 |
