# Togthr 转型 Sprint 执行计划（情侣 → AI 宠物·安静陪伴）

> 来源：《Togthr 全量代码审计报告 2026-08-10》（docs/audit-transformation-report-2026-08-10.md）
> 依据：《12 周执行方案》| 总工时 ~39h | 已执行：T1-01（3 处导航链接）

---

## Sprint 1 — DELETE 止血（2h，本周）

| 任务 | 文件 | 验收标准 | 工时 |
|---|---|---|---|
| S1-01 | 删 `src/app/[locale]/chat/`（12 文件） | chat 路由 404，无 import 残留 | 0.5h |
| S1-02 | 删 `tracestream.tsx` + `signalbuttons.tsx` | PetDetailClient 同步移除引用（L31-32, 336-337） | 0.5h |
| S1-03 | 删 `RelationModeSelector.tsx` | HomeClient L39,403 同步移除 | 0.5h |
| S1-04 | 删 `couples/page.tsx` + 301 → 首页 | /couples 301 到 /，CTA 全指向 /companion | 0.5h |
| S1-05 | 删 `src/app/api/og/route.tsx` | og 路由 404（og-generator 已替代） | 0.1h |
| S1-06 | 删破损目录 `src/app/[locale`（无 ]） | 目录消失 | 0.1h |

> ⚠️ 删除操作需安全护栏批准（文件删除高风险），逐项执行。

## Sprint 2 — 核心页语义改造（10h，第 2-3 周）

| 任务 | 文件 | 验收标准 | 工时 |
|---|---|---|---|
| S2-01 | 首页 HomeClient 宠物陪伴叙事 | 无 RelationModeSelector，H1=quiet companion 一致 | 3h |
| S2-02 | daily 纯宠物喂食 | 无 "Is the other one with you today?" | 2h |
| S2-03 | journal 对宠物说的话 | 无 shared/情侣语义 | 3h |
| S2-04 | pet 页文案 + 引用清理 | 无"召唤另一个TA"，无 tracestream/signalbuttons | 2h |

## Sprint 3 — 内容层清理（4h，第 4-5 周）

| 任务 | 文件 | 验收标准 | 工时 |
|---|---|---|---|
| S3-01 | pricing 移除 soulmate tier | pricing-impl + TierCard + PetMatrix 同步 | 1.5h |
| S3-02 | blog 删情侣/soulmate ~15 篇 | 相关 slug 404 | 1h |
| S3-03 | p/ 删情侣条目 ~20 | landing-pages.ts 同步 | 1h |
| S3-04 | features/for/onboarding 语义 | 无情侣模式/Demo | 1.5h |

## Sprint 4 — 残留清理（2h，第 5 周）

| 任务 | 文件 | 验收标准 | 工时 |
|---|---|---|---|
| S4-01 | couples 表单人化 | schema 迁移 SQL | 3h |
| S4-02 | community metadata | "Couples Community" → 通用 | 0.5h |
| S4-03 | capsule 去 couple | 个人记忆宝箱 | 2h |
| S4-04 | 全站残留扫描 | 组件层 0 命中 couples/soulmate | 0.5h |

---

## 已完成（T1 低风险改造）

| 任务 | 文件 | 状态 |
|---|---|---|
| T1-01 导航链接 | layout.tsx / MobileNav.tsx / blogctabanner.tsx：`/couples` → `/companion` | ✅ commit 待推 |

## 执行纪律

- 每个 Sprint 完成后：`tsc --noEmit` 0 错误 + `node scripts/check-locale-syntax.js` 全绿
- 删除操作逐项走安全批准；先删 chat（最大块）再删组件引用
- 删除后全站扫描：组件层 0 命中 `soulmate|/couples|tracestream|signalbuttons`
- 每个任务独立 commit：`refactor(ai-pet): <module> — <change>`
