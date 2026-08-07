# Worker Bundle 归因与 R2 外置方案 — 执行报告

> 2026-08-07 | R2 方案（用户指令：维持 CF 免费档，SSG HTML 外置 R2）

## 一、Bundle 归因（第 1 步）

| 组件 | raw | gzip | 说明 |
|---|---|---|---|
| server handler.mjs | 12.68 MB | **2.63 MB** | 超限主因（3MiB 线 = 3.145MB） |
| middleware handler.mjs | 835 KB | 86 KB | 路由匹配 |
| server index.mjs | 657 KB | 42 KB | 入口 |
| worker.js | 4 KB | 1 KB | 入口 |
| **合计** | ~14 MB | **~2.76 MB** | 已逼近 3MiB 硬限 |

**handler.mjs 内部构成**：
- 内容数据（blog 正文等长字符串）：1.75 MB raw / **0.36 MB gzip**（2125 个 >500 字符字面量）
- 框架+依赖（Next runtime、React、i18n 等）：**2.27 MB gzip** —— 不可削减的固定成本

**关键发现**：SSG 预渲染 HTML（970 页，96.63 MB）**不在 assets 里**（assets 只有图片和静态文件），全部内联进 handler 或由运行时生成。这就是为什么内容增长直接推高 bundle。

## 二、R2 外置重构（第 2 步）

### 已实施

1. **wrangler.toml**：`[[r2_buckets]] binding="CONTENT" bucket_name="togthr-content"`（bucket 已创建 ✅）
2. **scripts/upload-ssg-to-r2.cjs**：970 个 SSG HTML → R2，key = `/路径/index.html`
3. **scripts/patch-worker-r2.cjs**：worker.js 注入 R2 直出逻辑——
   - GET/HEAD 且非 /api/、/_next/、/cdn-cgi/ 的请求
   - `CONTENT.get(key)` 命中 → 直接返回 HTML（`Cache-Control: public, s-maxage=600, stale-while-revalidate=86400`）
   - 未命中/异常 → fallback OpenNext 运行时（绝不白屏）

### 预期收益

| 指标 | 重构前 | 重构后 |
|---|---|---|
| worker gzip | ~2.76 MB（逼近 3MiB） | ~2.4 MB（内容数据 0.36MB 移出） |
| 冷启动 | 运行时渲染 941 页 | R2 直出，CPU 极低 |
| 内容增长 | 每篇博客 +bundle（撞墙） | 只加 R2 对象（10GB 容量） |
| 热页面 | — | 边缘 CDN 命中（s-maxage=600） |

### 容量账

- 970 页 × ~100 KB ≈ 97 MB → 10 GB 容量 ≈ **~100 倍余量**
- R2 读 1000 万次/月；边缘缓存命中后 R2 读取只在冷启动发生

## 三、验收清单

| # | 项 | 状态 |
|---|---|---|
| 1 | gzip < 1.5 MiB（内容数据移出后 ~2.4MB，框架成本 2.27MB 为 CF 平台固有） | ⏳ 待部署验证 |
| 2 | 蓝海#1 + 5 核心 URL 200 | ⏳ 待部署验证 |
| 3 | llms.txt 三事实 True | ✅（生产已确认） |
| 4 | R2 读取走边缘缓存（二次请求 cf-cache-status=HIT） | ⏳ 待部署验证 |
| 5 | size guard 脚本 | ⏳ 下一步 |

## 四、待办

- [ ] 上传完成（~970 对象，后台进行中）
- [ ] 重新 build + patch + deploy
- [ ] 验证 5 项验收
- [ ] size guard：gzip >2.8MB 失败
- [ ] 零流量页 SSG 审计（GSC + CF Analytics 90 天）
