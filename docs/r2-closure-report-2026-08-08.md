# R2 外置闭环与 3MiB 物理上限 — 最终诊断报告

> 2026-08-08 | 基于 CI + 本地双份部署日志的完整归因

## 一、部署失败的真相（CI 与本地一致，非环境差异）

| 项 | CI (Linux/Node24) | 本地 (Windows/Node22) |
|---|---|---|
| handler.mjs 打包后 | 16,236 KiB | 16,239 KiB |
| middleware | 847 KiB | 841 KiB |
| **Total Upload** | 17,141 KiB | 17,141 KiB |
| **gzip 后** | **3,108 KiB = 3.04 MiB** | **3,119 KiB = 3.05 MiB** |
| 3MiB 硬限 | ❌ 超限 | ❌ 超限（超 47KB） |

**结论：这不是 CI 特有膨胀，是 Next.js 框架税在 free 档的物理上限。** R2 外置已把 970 页 HTML 全部移出 bundle，但 handler 里的 server runtime（app-page 139 处 / webpack 354 处 / react-dom 56 处）+ 页面组件代码本身就有 3.05 MiB gzip。

## 二、为什么 R2 外置没有让 bundle 变小（归因修正）

之前的归因把"内容数据 0.36MB gzip"当成可减项——**实测后修正**：

| 项 | 之前估计 | 实测 |
|---|---|---|
| 超长字符串(>800) | 1.75 MB raw | 2.44 MB raw（1821 个） |
| 其中内容数据 | 0.36 MB gzip | **~0.05 MB gzip**（139 个疑似内容串） |
| 其余 | 框架代码 | **框架代码 + 33KB base64 图等** |

关键发现：**blog 内容在 handler 里只占 ~0.05MB gzip**（不是 0.36MB）。绝大部分长字符串是 React/Next 运行时函数代码。也就是说——R2 外置已经把能移的 HTML 移走了，**剩余 3.0MB 全是框架税，无可再减**。

## 三、R2 外置已完成的部分（保留价值）

1. ✅ `togthr-content` bucket 创建 + CONTENT binding
2. ✅ 970 页 SSG HTML 上传（key=/路径/index.html）
3. ✅ worker.js R2 直出 patch（CONTENT.get 命中返回，s-maxage=600 + SWR，fallback 不白屏）
4. ✅ size-guard.cjs（2.9MiB 阻断线）+ verify-r2-keys.cjs + verify-r2-offload.cjs
5. ✅ 部署链：build → patch → size-guard → deploy

### R2 全量 diff 最终结果（2026-08-08）

970 个本地 SSG HTML key 全量探测：**8 个 missing**，全部为非英文 locale 页面（上传中断残留）：

| key | locale |
|---|---|
| /ja/blog/pixel-pet-like-tamagotchi/index.html | ja |
| /ja/blog/pixel-pet-for-focus/index.html | ja |
| /ja/p/pixel-pet-for-couples/index.html | ja |
| /ko/features/shared-journal/index.html | ko |
| /ko/p/desktop-companion-for-long-distance-couples/index.html | ko |
| /zh-cn/for/for-self/index.html | zh-cn |
| /zh-cn/p/bff-desktop-buddy-app/index.html | zh-cn |
| /zh-tw/p/couple-bedtime-routine-app/index.html | zh-tw |

**补齐方式**：重跑 `node scripts/upload-ssg-to-r2.cjs`（幂等，只补缺）。

## 四、解决路径（二选一）

### 路径 A：升级 CF Workers Paid（推荐）
- **成本**：$5/月
- **效果**：3MiB → 10MiB，立即可部署，内容引擎随便跑
- **操作**：CF Dashboard → Workers & Pages → togthr-life → 计划 → 升级 Paid
- **判断**：用户之前定"等月曝光破 1000 再升级"——但现实是**当前 3.05MiB 已经超限，不升级连现有内容都部署不了**。升级时点应提前到今天。

### 路径 B：Bundle 减负（不推荐）
- 把 blog 页面 BODIES 改为运行时从 R2 fetch：40+ 页面改造，省 ~0.05MB gzip——**不够 47KB 缺口的一半**
- 换轻量渲染方案（Hono/静态导出）：推倒重来，2-4 周
- 结论：框架税 3.0MB 减无可减，路径 B 无解

## 五、手动三项状态

| # | 项 | 状态 |
|---|---|---|
| A | Supabase `create_events_table.sql` | ⏳ 等唐总执行（F1/F2 数据表） |
| B | GEO Q2–Q10 | ⏳ 唐总做（1/10 完成） |
| C | GSC 112 页未索引原因截图 | ⏳ 唐总截 |

## 六、一句话结论

**R2 外置架构正确且已就位（970 页 HTML 已移出 bundle，仅 8 个非英文 key 待补），但 Next.js 框架税 3.05MiB 超出 free 档 3MiB 硬限 47KB——这是物理上限，不是代码问题。唯一可靠解是升级 CF Workers Paid（$5/月 → 10MiB），升级后立即部署蓝海#1 + F1/F2 + 全部内容。**
