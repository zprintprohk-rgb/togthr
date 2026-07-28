# Togthr 一个月战略规划 — V2（K3 审查修订版）

> 制定：2026-07-24（V1）→ 审查修订：2026-07-28（V2，K3 战略层）
> 执行：AutoClaw（定时任务）+ mini m3（代码执行 Batch）
> 周期：2026-07-28 → 2026-08-24 · 阶段 1（pSEO 流量验证期）
> 设计约束（宪章 V2）：每周人工触点 ≤5 次；执行层 Success 免检；任务必带逻辑验证；失败自动熔断不空转
>
> **V2 修订依据**：`docs/seo-geo-dual-engine-v2-review.md`（K3 对 14 张任务卡的 ground truth 核查 + 逐卡裁定）
> **V2 关键修正**：① pSEO 已上线 48 页（非 32）② sitemap 857 URL（Bing WMT 7/27 实测，非 384/416/713）③ SEO-FIX-01 作废 ④ 8 语言无 pt ⑤ 环境变量真源 wrangler.toml ⑥ GEO 月检扩至 90 问 ⑦ Job 2 切换为维护模式 ⑧ IndexNow 权威基准统一为 Bing WMT "URLs discovered"，不再硬编码数字

---

## 〇、北极星与月度验收线（8/24 盘点）

| 指标 | 基线（7/28） | 月度目标 | 验证方式 |
|---|---|---|---|
| pSEO 落地页在线 | **48 页**（EN，已完成） | 48 页全部收录 + Phase 2 触发后补译 ja/ko/de/fr/es | smoke 断言 200 |
| 新增内容页 | ~36 博客（日更 cron 运行中） | +4 篇人工精品（对比文/借势文已上线 4 篇）+ cron 持续日更 | sitemap URL 数（Bing WMT 7/27 实测 857） |
| GSC 自然曝光 | ≈0 | 周曝光 >100（第 4 周） | GSC 截图/API |
| Bing 收录 | 857 URL（Bing WMT 7/27 实测，0 错误） | 全部 URL 收录 | Bing WMT |
| 注册 | 1 | ≥5（自然流量） | Supabase auth |
| 付费 | 0 | 不考核（唐总决定流量起来再验证首单） | — |
| GEO 引用 | TL;DR 段落待部署（W1 Batch A） | ≥3 处 AI 搜索引用 | 8/1 + 8/24 90 问手测 |
| GA4 | ✅ 已部署（G-TNKXQ7V351，7/28 唐总提供，已填入 wrangler.toml） | W1 完成代码部署 + 验证 gtag 事件 | `NEXT_PUBLIC_GA4_ID` = G-TNKXQ7V351 |

**熔断线**：第 2 周末（8/3）GSC 曝光仍 = 0 → 暂停内容增产，K3 复盘渠道假设（不继续无脑堆内容）。

---

## 一、AutoClaw 定时任务矩阵（7 个 cron job，V2 修订）

> 每个 job 给出：触发时间 / 任务 / 输入引用 / 逻辑验证 / 失败熔断。可直接配置进 AutoClaw。
> 时间均为 Asia/Shanghai，全部放在 18:00 后（智谱算力低谷时段，省钱且稳定），分钟数避开整点/半点。

### Job 1｜日更博客 cron（每日 18:17，智谱算力低谷）
- **任务**：按既有日更流程生成 1 篇博客（单文件 8 locale 静态覆盖页模式），选题优先级：① tamagotchi 30 周年相关 ② 组4 怀旧词 ③ 组2 孤独陪伴词（选题池见 `docs/stage-1-m3-instructions.md` 任务 A）
- **逻辑验证**：本地 `next build --no-lint` 通过 + 4 道 i18n 闸门全过 → 才允许 push；brace 检查（生成文件不得含 `import {{` 或 `type {{`）
- **熔断**：连续 2 天 build 失败 → 停止该 job，报告里标注"等 K3 诊断"，禁止第 3 次试错
- **push 纪律**：本 job 每天最多 1 push
- **V2 不变**：日更机制保持，但避让周一/四 18:43 与 M3 Batch 执行窗口撞车

### Job 2｜pSEO 维护模式（每周一/四 18:43，V2 重大修订）

> **V2 修订**：7/28 实测 pSEO 已上线 48 页（EN）。原"铺设至 32 页"目标已超额完成。
> Job 2 从**内容生成模式**切换为**维护+收录推模式**，不再生成新 EN 页。

- **任务**（V2 维护模式）：
  1. 检查 48 页在线状态（smoke 断言 10 页抽样 200）
  2. 检查 `src/lib/landing-pages.ts` 注册表与 `/p/` 目录一致性
  3. 如注册表有新增 slug → 跑 `npm run indexnow:new`
  4. GSC 出现 pSEO 页首批曝光后（Phase 2 触发条件）→ 启动 CONTENT-01：补译 ja/ko/de/fr/es
- **逻辑验证**：smoke 抽样全 200 + 注册表一致性
- **熔断**：连续 2 次 smoke 失败 → 标记异常进周报
- **Phase 2 触发**：GSC 显示 pSEO 页获得首批自然曝光 → 自动激活补译流程

### Job 3｜IndexNow 提交（每周二 19:11，V2 修正）

> **V2 修正**：权威基准统一为 **Bing WMT "URLs discovered"**（7/27 实测 **857 URL**，0 错误）。旧 384/416/713 数字全部作废。此后不再硬编码数字，每次 build 后 Job 3 自动读取 Bing WMT 获取当周基准。

- **任务**：`npm run indexnow:new`
- **逻辑验证**：
  - 增量模式（indexnow:new）：PASS = HTTP 200/202 且提交数 ≥1
  - 全量模式：PASS = 提交数 ≈ 当前 Bing WMT "URLs discovered" ±5%
  - 若 4xx 打印响应体并停止（不重试轰炸）
- **V2 注意**：SEO-FIX-02（Bing 侧）✅ 完成；GSC 侧等唐总截图后判定

### Job 4｜线上健康 smoke（每周三 19:37，不变）
- **任务**：跑 `scripts/smoke-prod.py`（若 M3 未交付则用简易版：首页+定价+3 篇博客 200 断言 + zh-cn 定价无英文泄漏断言 + HTML 含 data-dark-root）
- **逻辑验证**：报告写 `docs/prod-smoke/latest.md`；任一 FAIL → 标记异常进周报，不自动修
- **V2 注**：原 SEO-FIX-01 "Worker 自愈"卡在评审中作废——线上健康、CI 全绿，监控已由此 Job 4 覆盖，不重复建设

### Job 5｜竞品监控（每周五 20:07，V2 微调）
- **任务**：抓 Widgetable/AIdorable 版本号、评分、评论高频抱怨词（App Store RSS/公开页），追加写入 `docs/competitor-watch.md`
- **逻辑验证**：数据行数比上周多才写入；抓不到就记录"本周无更新"，不编造
- **预警**：竞品上线"宠物成长阶段"或"桌面端"功能 → 立即标记高优异常（直接威胁我们楔子）
- **V2 已知问题**：App Store API 抓取在 PowerShell 环境不稳定（7/25 首次运行 fetch→convertTo-Json 失败），若连续 2 周抓取失败则切换到 web_search 手工搜集模式

### Job 6｜周一经营例会自动生成（每周一 20:23，V2 扩展）
- **任务**：复制 `docs/weekly-review/template.md` 为当周文件，自动填入能取到的数据（Supabase 注册数、sitemap URL 数、smoke 结果、IndexNow 状态、GA4 事件数），取不到的标"待人工"
- **逻辑验证**：文件生成即可，**不编造任何数据**；K3 周一人工补 GSC/异常/决策
- **V2 扩展**：周报新增 GA4 转化事件统计字段 + pSEO 页收录进度追踪
- **产出**：@唐总 每周一只有 1 个人工触点（花 5 分钟看周报 + 补 GSC 截图）

### Job 7｜月度 GEO 自检（8/1、8/24 21:11，V2 重大修订）

> **V2 修订**：GEO-05 卡（GEO 月检扩 90 次）已合并入此 Job。问题清单从 10 个扩展至 **90 个**（覆盖 9 大场景 × 10 问），覆盖 EN/ZH-CN/ZH-TW/JA/KO/DE/FR/ES 8 语言的关键词组合。

- **任务**：输出 90 个目标问题清单，按场景分组（pSEO 关键词 / 对比页 / 借势文 / 定价 / 桌面场景 / 情侣场景 / 养成场景 / 美学场景 / TL;DR AI 摘要覆盖），提醒唐总真人去 ChatGPT/Perplexity/Kimi 问一遍
- **产出**：结果填 `docs/geo-monthly-check.md`；8/24 二次检查 + 与 8/1 结果对比 + 对照阶段 2 决策树
- **8/24 附带**：月度盘点报告（含 GSC 曝光/注册/收录/GEO 引用/熔断线评估）
- **V2 注**：AI 搜索引用无法自动测，这是合法人工触点

---

## 二、M3 手工执行 Batch（W1-W2，不在 cron 内）

> 以下为 K3 审查后派发给 mini m3 的一次性任务包，由唐总或 K3 在 AutoClaw 会话中手工粘贴执行。
> **不建 cron**（每个 Batch 完成后 commit+push 即结束）。

### Batch A（W1: 7/28–8/3）— 搜索可见性基建

| 任务 | 说明 | 产出 |
|---|---|---|
| GEO-01 | 给 5 个页面加 "TL;DR for AI" 摘要段落 | 5 个 `<section aria-label="Summary">` 插入 5 个页面 EN 版 |
| GEO-02 | 增强 `public/llms.txt`（三段式） | 新增 "For AI assistants" + "Key comparison pages" 段 |
| GEO-03 | 首页 + 定价页注入 SoftwareApplication JSON-LD | 2 个 `<script type="application/ld+json">` |
| SEO-TECH-02 | GA4 部署（gtag.js） | layout.tsx 注入 + wrangler.toml 已填入 `G-TNKXQ7V351`（7/28 唐总提供）|
| IndexNow 清单 | 从 Bing WMT 获取 "URLs discovered"（7/27 基准 857），对齐 IndexNow 提交清单 | 旧 384/416/713 数字作废；此后以 Bing WMT 为准 |

**执行指令**：见 `docs/seo-geo-dual-engine-v2-review.md` 第五节 "Batch A" 块，可直接粘贴给 M3。

### Batch B（W2: 8/4–8/10）— 分发 + 内链

| 任务 | 说明 | 产出 |
|---|---|---|
| GEO-04 | Reddit 5 帖终稿文案（不发布） | `docs/reddit/posts-w2.md` |
| CONTENT-03 | 48 个 pSEO 页底部加内链网络（共享组件） | 每页 ≥6 内链 |
| CWV 三项 | 图片 lazy+尺寸属性 / 字体 display=swap / 第三方脚本 defer | 3 处代码修改 |

**执行指令**：见 `docs/seo-geo-dual-engine-v2-review.md` 第五节 "Batch B" 块。

---

## 三、唐总真人操作清单（本周必须）

| # | 动作 | 时长 | 产出 |
|---|---|---|---|
| ✅ | GA4 property 已创建（G-TNKXQ7V351，已填入 wrangler.toml） | 完成 | GA4 Measurement ID |
| 2 | search.google.com/search-console → Sitemaps → 重新提交 `sitemap.xml` → Coverage 报告截图存档 | 5 分钟 | GSC 截图 |
| 3 | W2 起按 M3 给出的时间表在 Reddit 发帖（养号已满 21 天达标后） | 15 分钟/周 | 5 帖发布 |
| 4 | 8/1 + 8/24 GEO 90 问手测（ChatGPT/Perplexity/Kimi 各 30 问） | 10 分钟/次 | 结果填 `docs/geo-monthly-check.md` |

---

## 四、人工触点清单（每周 ≤5 次，唐总专属，V2 更新）

| 频次 | 动作 | 时长 |
|---|---|---|
| 每周一晚（或周二早） | 看前一晚自动生成的周报 + 补 GSC 数据 + GA4 事件检查 | 5-10 分钟 |
| 每周三 | 看 smoke 报告（有 FAIL 才需要看） | 2 分钟 |
| W2 起（每 2-3 天） | Reddit 按时间表发帖（5 帖分布在 10 天内） | 每次 2-3 分钟 |
| 8/1 + 8/24 | GEO 90 问手测 | 10 分钟/次 |
| 熔断触发时 | 找 K3 诊断 | 按需 |

---

## 五、逻辑验证总规则（AutoClaw 全局，不变）

1. **三层验证链**：生成本地验证（build+闸门）→ 部署后线上验证（smoke 断言）→ 数据验证（周报指标环比），任何一层 FAIL 只记录不自动修，进周报异常栏
2. **禁止事项**：禁止编造数据填补周报；禁止同一失败任务连续重试 ≥3 次；禁止单日 >2 次 push（攒批）；禁止修改 `src/lib/pricing*`、`wrangler.toml`、支付相关 API（这 4 处改动必须 K3 审批）
3. **Success 判定**：任务完成 = 自检数据齐全（闸门结果/build 结果/HTTP 状态/commit hash），缺数据 = 未完成
4. **冲突仲裁**：Job 之间改动同一文件时，按 Job 编号小的先 push，大的 rebase 后再 push
5. **V2 新增**：所有 IndexNow/收录相关数字必须以 **Bing WMT "URLs discovered"** 为权威基准（7/27 初始基线 857），禁止沿用旧硬编码数字（384/416/713）；Job 3 周报自动读取 Bing WMT 作为当周基准，不再硬编码；所有语言列表必须从源码/配置实测，禁止凭记忆列语言

---

## 六、周历总览（V2 修订）

| 周 | 重点 | 里程碑 |
|---|---|---|
| W1（7/28-8/3） | **M3 Batch A**：GEO-01/02/03 + GA4 + IndexNow 清单 857。唐总：GA4 建 property + GSC 重提交 sitemap。Job 2 切换维护模式。 | 8/1 GEO 90 问首测；8/3 中期数据检查（熔断线评估） |
| W2（8/4-8/10） | **M3 Batch B**：GEO-04 Reddit 5 帖终稿 + CONTENT-03 内链网络 + CWV 三项优化。唐总：Reddit 按时间表发第 1-2 帖。 | Reddit 内容分发启动 |
| W3（8/11-8/17） | AutoClaw 常规 job 运行（Job 1 日更 + Job 3/4/5 周常）。唐总：Reddit 第 3-5 帖。不新增功能。 | 数据爬坡观察 |
| W4（8/18-8/24） | 8/24 GEO 90 问二测 + 月度盘点报告（对照阶段 2 决策树）。AutoClaw Job 6 周报 + Job 7 月检自动执行。 | 决定是否触发 Phase 2（CONTENT-01/02） |

---

## 七、阶段 2 决策树（8/24 用，不变）

- GSC 周曝光 >100 且有注册 → **升阶段 2**：开 M3 深度内容（8 语言补译 pSEO 页）+ PH 发布排期
- 曝光 10-100 → 延长阶段 1 两周，加码长尾词（从 GSC 实际曝光词选）
- 曝光 ≈0 → 执行熔断后路径：砍掉 pSEO 路线，转向纯 Reddit/社区分发验证，K3 出复盘报告

---

## 八、待命卡（不派发，触发时启用）

- **PAY-LIVE-01 核验**（降 P2）：唐总决定做真实首单时，M3 核验 wrangler.toml 支付 vars 指向 live、webhook URL 正确，唐总在 togthr.life 下 $5.49 真实单并走通退款流程
- **CONTENT-01 pSEO 补译 ja/ko/de**（Phase 2）：GSC 出现 pSEO 页首批曝光数据后启动
- **CONTENT-02 listicle × 3**（Phase 2）：W5+，GSC 出现曝光后启动

---

## 九、V2 修订对照表（7/24 V1 → 7/28 V2）

| 变更项 | V1（7/24） | V2（7/28） | 来源 |
|---|---|---|---|
| pSEO 页数 | 32 页目标 | **48 页已完成**，切换维护模式 | Ground truth 实测 |
| sitemap URL 数 | 384/416（来源不明）→ V2 修正为 713 | **V2.1 修正为 857**（Bing WMT 7/27 实测，0 错误） | Ground truth 实测（Bing WMT） |
| Job 2 定位 | 铺设 pSEO 新页（每周 4 页 × 8 次） | **维护+收录推模式**（不再生成新 EN 页） | pSEO 已达 48 页 |
| Job 7 问题数 | 10 个 | **90 个**（9 场景 × 10 问） | GEO-05 卡合并 |
| SEO-FIX-01 | Worker 自愈 cron | **作废**（Job 4 已覆盖） | 线上实测健康 |
| PAY-LIVE-01 | 即时上线 | **降 P2 待命**（唐总决定择机验证） | 尊重用户决策 |
| 语言列表 | 含 "es, pt"（GEO-02 附件错误） | **8 语言：en/zh-cn/zh-tw/ja/ko/de/fr/es，无 pt** | Ground truth 实测 |
| 环境变量 | .env.production | **wrangler.toml（唯一直源）** | 项目实际部署机制 |
| GEO-05 | 独立新任务 | **并入 Job 7**（8/1 + 8/24 90 问） | 评审裁定合并 |
| CONTENT-03 内链 | Phase 2 | **提前到 W2**（0 成本 SEO，帮助 48 页收录） | 评审裁定提前 |
| GA4 部署 | 不在 plan 内 | **W1 Batch A**（SEO-TECH-02） | 新任务 |
| GEO-01/02/03 | 不在 plan 内 | **W1 Batch A**（TL;DR + llms.txt + JSON-LD） | 新任务 |
| Job 5 竞品监控 | 无降级方案 | **连续 2 周抓取失败 → 切换 web_search 手工搜集** | 7/25 执行反馈 |
| IndexNow 基准 | 713（sitemap-0.xml） | **857（Bing WMT 7/27）** — 此后以 Bing WMT 为准 | Ground truth #9 |

---

## 十、执行入口（给 AutoClaw 派活的指令）

> 复制以下指令给 AutoClaw，即完成 V2 全部定时任务配置 + M3 Batch 派发：

```
读 F:\CloudDreamerApp\togthr\docs\autoclaw-month-plan-2026-07-28-v2.md。
按第一节矩阵维护 Job 1-7（Job 2 切换维护模式，Job 7 扩至 90 问），
按第二节派发 M3 Batch A（W1）+ Batch B（W2），
严格遵守第五节逻辑验证总规则和熔断线。
```
