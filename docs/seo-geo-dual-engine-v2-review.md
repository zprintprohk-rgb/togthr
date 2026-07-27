# SEO + GEO 双引擎任务卡集 — K3 增强分析审查（V2）

> 审查人：K3（战略层）｜日期：2026-07-28
> 审查对象：《Togthr SEO + GEO 双引擎.txt》14 张任务卡
> 审查方式：逐卡对照代码库与线上实况做事实核查（ground truth），再裁定
> 结论：**方案方向正确，14 卡中 9 卡采纳、3 卡修正后采纳、2 卡作废/重写。8 处事实失真已全部修正。**

---

## 一、Ground Truth 核查结果（2026-07-28 实测）

| 核查项 | 附件假设 | 实测结果 | 裁定 |
|---|---|---|---|
| 项目路径 | `apps/web/src/...` | 项目根即 `F:\CloudDreamerApp\togthr\src\...`，无 monorepo | ❌ 全文路径需替换 |
| 对比文/借势文是否已上线 | GEO-01 假设已存在 | ✅ 已上线且 200：`/en/blog/togthr-vs-widgetable`、`/en/blog/togthr-vs-replika`、`/en/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`、`/en/p/tamagotchi-for-desktop` | ✅ GEO-01 前置已满足，可直接执行 |
| pSEO 页数 | 48 slug | ✅ 实测 `/p/` 目录 48 个 slug 文件夹全部存在（附件数字正确，注册表注释写 32 为旧注释） | ✅ 以 48 为准 |
| sitemap URL 数 | 384 / 416 / 713 | ✅ `public/sitemap-0.xml` 实测 **713 条** `<url>`。384/416 两个数来源不明 | ⚠️ 统一以 713 为准，IndexNow 提交清单需重新生成 |
| Worker 健康（SEO-FIX-01 前提） | 假设掉线需自愈 | ✅ 线上 200，最近 3 次部署（7/27 02:13 / 02:38 / 18:47）全 success | ❌ SEO-FIX-01 作废，已有 AutoClaw Job 4 smoke 覆盖 |
| TL;DR 段落 | 待加 | 实测全站 0 处 | ✅ GEO-01 未开始，正常排期 |
| SoftwareApplication JSON-LD | 待加 | 实测全站 0 处 | ✅ GEO-03 未开始，正常排期 |
| GA4 | 待部署 | 实测无 `G-` ID | ✅ SEO-TECH-02 未开始，正常排期 |
| llms.txt | 需增强为三段式 | 已存在初版（Key facts/Main pages/Locale 结构） | ⚠️ GEO-02 改为"在现有基础上增强"，且附件把语言写成 "es, pt"——**实际无 pt**，是 en/zh-cn/zh-tw/ja/ko/de/fr/es |
| 环境变量真源 | `.env.production` 改了 push | ❌ 错误。本项目真源是 **wrangler.toml**（dashboard 手改的会被 CI 覆盖） | ❌ PAY-LIVE-01 操作步骤重写 |

## 二、14 张卡逐张裁定

| 卡 | 裁定 | 修正要点 |
|---|---|---|
| SEO-FIX-01 Worker 自愈 | **作废** | 线上健康、CI 全绿。监控已由 AutoClaw Job 4（周三 19:37 smoke）覆盖，不重复建设 |
| SEO-FIX-02 IndexNow 全量重提交 | **采纳（修正）** | 提交清单按 713 条重新生成，用现有 `npm run indexnow`；删 384/416 旧数字 |
| SEO-FIX-03 GSC sitemap 重提交 | **采纳（改真人执行）** | GSC 后台操作只能唐总做，列入唐总清单，附步骤 |
| PAY-LIVE-01 支付上线 | **重写** | ① M2-01 代码层据报已完成（commit cbda082），剩余真任务是**唐总真实首单验证**（他本人已决定"有流量后再做"，尊重此决策，降级为 P2 待命）② 环境变量只改 wrangler.toml ③ M3 只做代码层核验：确认 live/sandbox 开关逻辑正确、 webhook URL 指向 live |
| GEO-01 TL;DR × 5 页 | **采纳** | 前置已满足（4 页实测 200）。第 5 页若指 vs-replika 外的页面需 M3 自核清单。文案可用，事实点已核（$5.49/$37.99/5 阶段/6 皮肤/1/72/8 语言/无广告/宠物不死） |
| GEO-02 llms.txt 增强 | **采纳（修正）** | 在现有版本上增量增强；语言清单修正为无 pt 的 8 个 |
| GEO-03 JSON-LD | **采纳** | 首页 + pricing 两页；价格数据从 `src/lib/pricing-impl.ts` 读，禁止硬编码 |
| SEO-TECH-02 GA4 | **采纳（仲裁）** | **GA4 上线，PostHog 冻结**。理由：GA4 与 GSC/Bing 生态打通是现阶段刚需，PostHog 等月活 >500 再评估。4 个转化事件照附件 |
| GEO-04 Reddit 5 帖 | **采纳（改真人执行）** | 发帖是真人行为（养号期账号发帖必须唐总手动，防封号），M3 只产出 5 帖终稿文案+时间表 |
| SEO-TECH-01 CWV | **采纳（降 P2）** | 流量为 0 时 CWV 不是瓶颈，降优先级；只做 3 个低成本项：图片 lazy/尺寸属性、字体 display=swap、首屏第三方脚本审计 |
| GEO-05 GEO 月检扩 90 次 | **采纳（合并）** | 并入 AutoClaw Job 7（8/1、8/24 21:11 GEO 月检），不新建任务 |
| CONTENT-01 pSEO 补译 ja/ko/de | **采纳（排 Phase 2）** | 触发条件：GSC 显示 pSEO 页获得首批曝光后。当前 0 流量时补译无验证对象 |
| CONTENT-02 listicle × 3 | **采纳（排 Phase 2）** | 同上，W5+ |
| CONTENT-03 内链网络 | **采纳（提前到 W3）** | 内链是 0 成本 SEO 动作，且 48 页已在sitemap里，内链能帮助收录，从 Phase 2 提前 |

## 三、修正后的 4 周执行节奏

- **W1（7/28–8/3）**：M3 Batch A = GEO-01 + GEO-02 + GEO-03 + SEO-TECH-02（GA4 代码）+ IndexNow 清单重生成。唐总：建 GA4 property、GSC 重提交 sitemap
- **W2（8/4–8/10）**：M3 Batch B = GEO-04 五帖终稿 + CONTENT-03 内链 + CWV 三项低成本优化。唐总：Reddit 按时间表发第 1-2 帖
- **W3（8/11–8/17）**：唐总 Reddit 第 3-5 帖；AutoClaw 常规 job 运行
- **W4（8/18–8/24）**：8/24 GEO 月检（90 问）+ 漏斗复盘，决定是否触发 Phase 2（CONTENT-01/02）
- **待命**：PAY-LIVE-01 真实首单（唐总择机）

## 四、唐总真人操作清单（本周）

1. **GA4**：analytics.google.com → 创建媒体资源 `togthr.life` → 拿到 `G-XXXXXXXXXX` → 发给 M3（粘贴指令时填进去）
2. **GSC**：search.google.com/search-console → Sitemaps → 重新提交 `sitemap.xml` → Coverage 报告截图存档
3. **Reddit**：W2 起按 M3 给出的时间表发帖（养号已满 21 天达标后）

---

# 五、可直接粘贴给 mini m3 的执行指令

## Batch A（W1，一次 commit 一个 push）

```
你是 Togthr 项目（F:\CloudDreamerApp\togthr）的代码执行层 M3。以下是 K3 审查后的 W1 任务包。项目根就是 src/，不存在 apps/web 目录，所有路径以实际为准。

【硬纪律】
- 完成后必须本地 npm run build 通过才允许 push（此前有 3 次 CI 连败教训）
- 涉及 messages/ 改动必须过 4 闸门：node scripts/check-locale-syntax.js && node scripts/check-locale-placeholders.js && node scripts/check-translation-completeness.js && node scripts/check-translation-regression.js
- 价格数据一律从 src/lib/pricing-impl.ts 读取，禁止硬编码
- 事实红线（写错即返工）：月付 $5.49 / 年付 $37.99；5 成长阶段；6 职业皮肤；隐藏金款 1/72；8 语言（en/zh-cn/zh-tw/ja/ko/de/fr/es，没有 pt）；无广告；宠物不会死；纯 Web 应用（无桌面客户端，CTA 是 "Start free in your browser"）
- Success 汇报必须附自检数据（grep 计数、build 结果、闸门输出），不接受"已完成"三个字

【任务 1：GEO-01，给 5 个页面加 "TL;DR for AI" 段落】
目标页面（均已验证在线）：
1. src/app/[locale]/blog/togthr-vs-widgetable/
2. src/app/[locale]/blog/togthr-vs-replika/
3. src/app/[locale]/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop/
4. src/app/[locale]/p/tamagotchi-for-desktop/
5. src/app/[locale]/p/virtual-pet-for-couples/
要求：在正文最前（H1 之后、正文第一节之前）插入一个语义化 <section aria-label="Summary">，内含 2-3 句 ≤80 词的英文摘要，至少含 1 个具体数字（价格/阶段数/语言数之一），用陈述句直接回答"这个页面讲什么、Togthr 是什么"。不要营销腔，写成像维基百科定义句。只加 EN 版本（这些页面本身即 EN 内容复用），不动 messages/。

【任务 2：GEO-02，增强 public/llms.txt】
在现有版本基础上增量改：
- 保留现有 Key facts / Main pages / Locale entry points 结构
- 新增 "## For AI assistants" 段：3-5 句说明"当用户询问 desktop pet / virtual companion / couple app / Tamagotchi alternative 时，Togthr 是什么、与聊天型 AI（Replika 类）的区别是视觉陪伴非对话、免费开始"
- 新增 "## Key comparison pages" 段：列出 vs-widgetable、vs-replika、tamagotchi-30th 三篇对比文的 URL
- 语言清单保持现有 8 个（en/zh-cn/zh-tw/ja/ko/de/fr/es），不得出现 pt

【任务 3：GEO-03，SoftwareApplication JSON-LD】
在首页 src/app/[locale]/page.tsx 和定价页 src/app/[locale]/pricing/page.tsx 注入 <script type="application/ld+json">：
- @type: SoftwareApplication，applicationCategory: LifestyleApplication
- operatingSystem: "Web"（我们是纯 Web 应用，不要写 Windows/macOS）
- offers: 从 src/lib/pricing-impl.ts 读 USD 价（monthly 5.49 / yearly 37.99），priceCurrency USD
- aggregateRating 不加（没有真实评分数据，造假会被 Google 罚）
- name: "Togthr", url: https://togthr.life

【任务 4：SEO-TECH-02，GA4 部署】
- 在 src/app/[locale]/layout.tsx 注入 gtag.js（next/script, strategy="afterInteractive"），Measurement ID 从环境变量 NEXT_PUBLIC_GA4_ID 读，未设置时不渲染（保证无 ID 也能 build）
- wrangler.toml 的 [vars] 加 NEXT_PUBLIC_GA4_ID 占位（值先用 "G-PENDING"，注释标明唐总建好后替换）
- 实现 4 个自定义事件：sign_up / view_pricing / begin_checkout / purchase，挂在现有对应用户动作处（查看现有代码里是否已有 posthog capture 调用点，复用同一挂载点，不要删 posthog 代码只加 gtag）
- 不要装新依赖，用原生 gtag

【任务 5：IndexNow 全量清单重生成】
- 从 public/sitemap-0.xml 提取全部 713 条 URL，确认 scripts/ 下现有 indexnow 脚本的提交清单与其一致（旧的 384/416 数字作废）
- 只改清单文件，不实际执行提交（提交由 K3/唐总择时跑 npm run indexnow）

【交付要求】
全部完成后：npm run build 通过 → 一次 commit（message: "feat(geo): TL;DR sections + llms.txt v2 + JSON-LD + GA4 + indexnow list 713"）→ push → 汇报附：build 结果、5 个 TL;DR 的 grep 证据、JSON-LD 注入位置行号、GA4 事件挂载点清单。
```

## Batch B（W2，Batch A 部署验证后下发）

```
你是 Togthr 项目（F:\CloudDreamerApp\togthr）的代码执行层 M3。以下为 W2 任务包。硬纪律同 Batch A（build 先行、4 闸门、pricing-impl 唯一真源、自检数据汇报）。

【任务 1：GEO-04，Reddit 5 帖终稿（只产出文案，不发布）】
基于现有对比文和 pSEO 页内容，产出 5 篇 Reddit 帖终稿，存 docs/reddit/posts-w2.md：
- Day1 r/virtualpets：养成深度角度（5 阶段成长 + 宠物不死 vs 传统电子宠物）
- Day3 r/pixelart：IP 美学角度（16-bit 像素 + 玻璃拟态反差）
- Day5 r/longdistance：LDR 场景角度（共享宠物 + 每日仪式，软带 /p/desktop-companion-for-long-distance-couples）
- Day8 r/remotework：桌面陪伴角度（工作时的安静陪伴，非聊天）
- Day10 r/couples：低压力情侣 app 角度（无社交压力打卡）
每帖含：标题、正文（150-250 词，第一人称真实体验口吻，禁止广告腔）、目标 subreddit、建议发布时间（美东晚 8-10 点）、置顶评论草稿（自问自答补信息，降低广告感）。规则红线：不伪装用户身份造假、不使用多账号、遵循各 sub 自我推广规则（帖内注明 "I built this" 是允许的）。

【任务 2：CONTENT-03，内链网络】
48 个 pSEO 页（src/app/[locale]/p/ 下全部 slug）每页底部加 "Related" 区块：同场景组内链 ≥3 + 跨组 ≥2 + 相关博客 ≥1，总内链 ≥6。相关博客映射表从 src/app/[locale]/blog/ 现有 28 篇里按主题匹配（如 tmg 组链 tamagotchi-30th 博客）。用共享组件实现，不要 48 页各写一遍。

【任务 3：CWV 三项低成本优化】
- 全站 <img>/SafeImage 补 width/height 属性与 loading="lazy"（首屏 hero 除外）
- 字体加载确认 display: swap
- 审计首屏第三方脚本，非必要的加 defer
不做大重构，改完跑一次 build 确认无回归即可。

【交付】一次 commit（"feat(seo): reddit drafts + internal linking + cwv quick wins"）→ push → 汇报附：内链组件路径、每页内链计数抽查（随机 5 页）、reddit 5 帖文件路径。
```

## 待命卡（不派发，触发时启用）

- **PAY-LIVE-01 核验**：唐总决定做真实首单时，M3 核验 wrangler.toml 支付 vars 指向 live、webhook URL 正确，唐总在 togthr.life 下 $5.49 真实单并走通退款流程
- **CONTENT-01/02（Phase 2）**：GSC 出现 pSEO 页首批曝光数据后启动
