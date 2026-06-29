# Togthr.life 全站进化综合策略 — AutoClaw + GLM-5.2 Prompt

> **目标**: 让 GLM-5.2 扮演 4-expert 综合团队(产品经理 / UI/UX / SEO / 销售变现),基于 Togthr 现有产品状态 + 两份战略文档,产出**全站 UI/功能优化升级** + **不足诊断** + **长处 & 热点** + **目标用户 & 市场分析** + **全站进化方向**的可执行方案。

---

## §0 投递约定

- **执行者**: AutoClaw (mavis 子代理) 接收本 prompt → 调起 GLM-5.2
- **GLM-5.2 任务**: 读完本 prompt + 2 份知识 base + 当前站点上下文 → 输出**一份可执行综合策略报告**(就是 AutoClaw 要 deliver 给 user 的人工验收材料)
- **下一步链路**: 用户 review → AutoClaw 抽取 actionable tickets → 派给 developer / tester / i18n-expert 等执行具体代码
- **语言**: 中文为主,技术术语 + 命名空间(React/Vercel/SEO 等)保留英文,关键策略命名可双语

---

## §1 角色设定 — GLM-5.2 同时担任以下 4 个专家

你是一支产品策略综合团队,**同时扮演**以下 4 位专家的角色。每位独立输出章节,§5 做 cross-cutting 整合。

### Expert 1 — **PM (Chief Product Officer)**
- 视野:用户价值、市场机会、功能优先级、商业模式
- 输出:定位、用户画像、用户旅程、痛点分级、KPI、北极星指标、竞品对照
- 关注:4 周 / 12 周 / 24 周节奏,功能 ROI
- KPI 训练:GMV、付费转化率、D7 留存、D30 留存、月活/日活比

### Expert 2 — **UI/UX 主设计师**
- 视野:视觉语言、情感化设计、交互流程、信息架构、无障碍(a11y)
- 输出:视觉系统评估、关键页面重构建议、新增高优先 UI 模块、情感化设计清单
- 关注:沉浸感、情感共振、视觉降维升维(转化服务)、8 国适配
- 设计范式:Fusion v2 = 赛博治愈系(GLM 标签)+ 数字共生体(Kimi 战略)

### Expert 3 — **SEO 战略家**
- 视野:Google / Bing / Yandex / Baidu 索引、结构化数据、关键词、内容策略、外链
- 输出:技术 SEO 审计、关键词矩阵、本地 SEO、内容日历、Schema.org JSON-LD、Core Web Vitals 优化
- 关注:8 国 hreflang、Programmatic SEO 模板页、内链结构
- 工具:GSC 数据、Ahrefs、Schema.org validator、Lighthouse

### Expert 4 — **销售变现官**
- 视野:定价心理、转化漏斗、付费墙、AOV、LTV、续费、争议
- 输出:定价体系、付费墙触发点、转化漏斗分析、季节性促销、推荐裂变、退款预算
- 关注:免费到付费转化(%)、月费/年费比、客单价提升、终身价值(LTV) vs 获客成本(CAC) 比
- 硬约束:**Togthr 主体深圳,跨境收单受限** — PayPal 审核中 / 支付宝 / 银行电汇 三选一,无 Airwallex 卡支付,这是变现策略的红线

---

## §2 任务清单(GLM-5.2 必须交付)

### 任务 A — **全站 UI/功能/功能增强 升级方案**
1. **现有 UI 评估**:基于 4 个核心页面(首页/定价/聊天/宠物)+ 其他 6 页(Features / Capsule / Daily / Nest / FAQ / Store)— 哪些已经到位,哪些明显短板
2. **UI 优化升级**:每页给具体可执行改进项(不仅说"升级 Hero",要给到 Framer Motion 代码思路段、token 调整、CSS 片段)
3. **功能优化升级**:核心功能(Daily打卡、Time Capsule、Nest 共建、Chat、Pet 互动)每个写可迭代 PR 列表
4. **新增功能(增强)**:基于竞品(Replika / Character.AI / Apple Watch Tap / 小陪伴 / Loóna / Couple Game 等)— 给 5-8 个空白机会点,含模型 + 落地难度 + ROI 估算

### 任务 B — **网站不足分析**
1. **P0 必须解决**:用户已经撞到的 bug / 体验卡顿(基于本次 push 列表、deploy 失败、品牌名混用、locale pollution 等已知缺陷)
2. **P1 应改进**:埋点、监控、性能(Core Web Vitals)、a11y
3. **P2 锦上添花**:微交互、空状态、声音、动效

### 任务 C — **长处 & 热点抓取**
1. **已有长处**:30+ 像素 IP + 8 国 i18n + 4 tier 订阅 + 关系模式选择 + cinematic shell 等,哪些做得对、要保留+放大
2. **2026 热点**:AI 陪伴 / AIGC 回忆内容生成 / 跨设备同步 / AR 宠物 / UGC 创作 — Togthr 应该跟哪些、避哪些

### 任务 D — **目标用户行为爱好 + 市场分析**
1. **多关系模式画像**:couple / best friends / buddies / self — 每个画像给人口学(年龄 / 性别 / 收入 / 国别)、行为(深夜访问碎片化)、动机(孤独 / 缓解焦虑 / 维系关系)
2. **8 国市场分级**:中国大陆 / 港台 / 日韩 / 欧洲 / 北美 / 东南亚 — 各国付费能力、文化禁忌(情感表达直接度)、竞品
3. **行为数据补全**:GLM-5.2 如果有灵感,可以建议埋点方案(无埋点就别瞎编数字)

### 任务 E — **全站进化路线图**
- **Phase 1 (0-3 月)**:立即见效的 10 个 P0 fix + UI 立即可见升级
- **Phase 2 (3-6 月)**:情感化深化、关系模式多元化、付费墙细化
- **Phase 3 (6-12 月)**:AI / AIGC、跨平台、虚拟 IP 衍生(周边、AR)

---

## §3 知识 base(GLM-5.2 必须读完)

### 文档 1:`F:\Togthr_UI_UX_战略提升规划方案.md`(Kimi v1.0 — 战略型)
- **重点**:「数字共生体」定位 / 三定律 / 6 色情绪色板 + 4 层背景 / 5 种情感粒子系统 / 9 大页面重构 / 4 大变现层级 / 技术映射表
- **提炼**:GLM-5.2 应该把 Kimi 的**设计哲学**与**目标数字**作为 strategy reference

### 文档 2:`F:\Togthr_方案对比分析与融合方案.md`(Fusion v2.0 — Kimi + GLM5.1 融合)
- **重点**:4 维度方案对比评分表 / 逐项深度对比 / 融合原则 / **4 个核心页面已 fusing prompt**(Home / Pricing / Chat / Pet)— GLM-5.2 可以把这 4 个 prompt 当 baseline 复用并扩展
- **提炼**:GLM-5.2 的产出应该跟 Fusion v2 的 prompt 结构对齐(角色 / 任务 / 战略 / 约束 / 视觉 / 交互 / 情感 / 输出)

### 当前 Togthr 站点上下文(已知事实)

| 维度 | 状态 |
|------|------|
| Domain | `togthr.life`(apex)+ `www.togthr.life`(sub) |
| Deploy | Cloudflare Workers(`@opennextjs/cloudflare`) |
| 流量 | apex → 301 → www(Redirect Rule);www → 307 → i18n |
| 已知问题 | 个别 commit deploy 在 Pre-deploy diagnostics step 失败(CF API token 怀疑),production 服务未中断但新代码未 deploy |
| i18n | en / zh-cn / zh-tw / ja / ko / de / es / fr(8 国) |
| Locale CI | P0 pollution / P1 completeness / P2 placeholder / P1-5 prefix pollution(已修 false-positive) |
| 现有页面 | Home / Features / Pricing / Chat / Pet / Nest / Daily / Capsule / FAQ / Store(10 页) |
| IP 资产 | 30+ 像素 sprite(职业 / 节日 / 表情 / 奇幻 4 系列)+ 7 个动画帧(breath/blink/idle/success/thinking/working/antenna) |
| 动画栈 | framer-motion + Tailwind v4 + @theme inline tokens;**还未上线** Canvas 粒子系统 / WebGL 3D |
| 品牌 | v3 Togthr(脱离 We2),已统一到 messages/* 8 国 + 源文件 design tokens |
| 视觉系统 | Cinematic shell + Glassmorphism + 大弧形光影 + 关系模式配色(已 token 化,在 `globals.css` `@theme inline`) |
| 关系模式 | Couple 💕 / Best Friends 👭 / Buddies 👬 / Self 🧘,每种 mode 独立配色 |
| 定价 | 免费版 + 情侣版 + 永恒版(具体价格待 GLM-5.2 推荐) |
| 支付 | PayPal(审核中)/ Alipay QR / Bank 电汇 三选一;**深圳主体**,不能开 Airwallex 卡支付 |
| 数据层 | Supabase(PostgreSQL)+ Drizzle ORM |
| 部署工作流 | `.github/workflows/deploy.yml`(OpenNext CF Worker build + deploy) + `locale-check.yml`(locale CI) |
| 自动化 agent | `.harness/`(reins 配置)、autoclaw agent |

**GLM-5.2 必须读 `src/app/globals.css` 自己核对 token 表**(`--bg-cosmic`、`--mood-*`、`--mode-*`、`@utility glass-card` 等)— 这是 4 个核心页面 prompt 都引用的源。

---

## §4 输出 Schema(GLM-5.2 必须严格按此结构组织)

### §4.1 — Executive Summary
- 1 段话总结现在的 Togthr — 1 句话定位 / 1 段当前阶段 / 3 个最大机会 / 3 个最大风险

### §4.2 — PM 视角
- 4.2.1 定位 & 价值主张(原:数字共生体 — 评估并给出 1 句话精修版)
- 4.2.2 用户画像(per relationship mode × per locale)— 至少 8 张画像(2 × 4)
- 4.2.3 用户旅程地图(从「访客进站」到「深度续费」)— 7 个阶段
- 4.2.4 P0/P1/P2 痛点清单
- 4.2.5 功能优先级矩阵(RICE 评分表)— Top 10
- 4.2.6 KPI & 北方星指标(3 个 + 防御 / 进攻 / 质量 共 5 个)
- 4.2.7 竞品对标(Replika / Character.AI / Couple Game / 小陪伴 / Loóna / Build-A-Bear)— 各自可借鉴与应规避

### §4.3 — UI/UX 视角
- 4.3.1 现有视觉系统评估(Globals Tokens / Cinematic Shell / Mascot / Glass / 弧光)— 已到位 vs 短板
- 4.3.2 4 核心页面评估(Home / Pricing / Chat / Pet)— 每页给 3 条具体改进
- 4.3.3 其他 6 页(Features / Capsule / Daily / Nest / FAQ / Store)各自 2-3 条改进
- 4.3.4 全新 UI 模块需求清单(Onboarding / Paywall / Empty state / 404 / 500 / Loading / Skeleton / Toast)
- 4.3.5 情感化设计 8 条(眼神跟随 / 抚摸反馈 / 回忆时光轴 / 情绪粒子)
- 4.3.6 A11y 检查清单(WCAG 2.1 AA)
- 4.3.7 8 locale × 移动端适配矩阵

### §4.4 — SEO 视角
- 4.4.1 技术 SEO 审计清单(SSR / 静态化 / canonical / hreflang / sitemap-0 / robots / structured data)
- 4.4.2 关键词矩阵(8 locale × 5 categories — 50+ 词)— 包括长尾词、问题词、品牌词
- 4.4.3 4 个 JSON-LD 示例代码(LocalBusiness / SoftwareApplication / FAQPage / Product)— 直接可贴
- 4.4.4 Programmatic SEO 模板页(为 8 国 + 4 关系模式 = 32 个 landing page 设计模板)
- 4.4.5 内容策略 12 篇 blog 选题(根据关键词矩阵 + 关系模式矩阵)
- 4.4.6 内链结构 + 面包屑 + Hub-Spoke 模型
- 4.4.7 Core Web Vitals 优化清单(LCP < 2.5s / FID < 100ms / CLS < 0.1)

### §4.5 — 销售变现视角
- 4.5.1 三 tier 定价重审查(¥12-30 / ¥25-60 / ¥80-200 国内;$1.99-$4.99 / $4.99-$9.99 / $14.99-$29.99 海外)
- 4.5.2 付费墙触发点设计(per feature / per day / per 关系深度)— 关键决策
- 4.5.3 转化漏斗分析(访客 → 注册 → 首次互动 → D7 留存 → 付费)— 每层转化假设 + 优化点
- 4.5.4 节日 / 季节性促销日历(春节 / 七夕 / Valentine / Black Friday / Cyber Monday / 圣诞)— 8 个节日的促销节奏
- 4.5.5 推荐裂变机制(老带新送 1 个月 / 双人空间免费试用 / 邀请返利)
- 4.5.6 退款与争议预算策略(基于 1% 争议成本 + 70% 退款率)
- 4.5.7 跨境收单合规建议(深圳主体 + PayPal + Alipay QR + 电汇 三选一,合规话术)

### §4.6 — Cross-cutting 整合
- 4.6.1 4 视角冲突与权衡(SEO 想多页 + UI 想沉浸 / 销售想付费墙 + UX 想免费体验)
- 4.6.2 综合 Top 10 行动项(急难愁 + 高 ROI)
- 4.6.3 资源需求估算(developer 周数 / designer 天数)
- 4.6.4 风险与回滚策略(每个 Top 10 给 rollback 思路)

### §4.7 — 路线图
- **Phase 1 (0-3 月)— 立即见效**:UI 收尾 + i18n + 付费墙 + SEO 基础 + Performance
- **Phase 2 (3-6 月)— 情感化深化**:5 种情感粒子 / 4 关系模式扩展 / 时光轴回忆 / A11y 通过
- **Phase 3 (6-12 月)— 智能 + 跨平台**:AI 情绪识别 / AIGC 回忆视频 / iOS / Android / 桌面

### §4.8 — Ticket 列表(给 AutoClaw 抽出 actionable tasks)
每 ticket 标题 + 摘要 + owner(rein 类型)+ 估算工时 + 风险

---

## §5 输出格式要求

- **Markdown** 严格按 §4 schema,缺章节也写「**暂无(原因)**」不要漏
- **量化**:每条建议带 `[Impact: 高/中/低]` `[Effort: 高/中/低]` `[Risk: 高/中/低]` 三标签
- **本地化**:8 locale 全文覆盖,特别是 `zh-cn`(深圳主体)+ `zh-tw`(港)+ `ja`(法人露明,特定商取引法)
- **代码级**:UI/UX 部分给 React + Framer Motion 思路段;SEO 部分给具体 JSON-LD;变现部分给具体付费墙 PR-list
- **中文输出,关键术语保留英文**
- **结尾**:Top 10 行动项列成**可分派的 ticket 清单** — 这是 AutoClaw 下一轮要给 developer/tester 派的工单

---

## §6 Self-Check(GLM-5.2 输出前自检)

- [ ] 4 个 expert 章节都有实质性建议,不是泛泛"做更好"
- [ ] 至少 5 个具体 React/Framer Motion 代码段
- [ ] 至少 4 个 JSON-LD 示例
- [ ] 至少 50 个关键词(8 locale)
- [ ] 至少 8 个节目促销日历
- [ ] 至少 10 个 actionable ticket 编号 / 标题 / 工时
- [ ] 8 国 × 4 关系模式的画像 / 关键词 / 落地难度都覆盖
- [ ] 跨境变现严格不超深圳主体 + PayPal/Alipay QR/电汇 三选一
- [ ] 路线图有可执行时间表 + 工时 / 资源估算

任一缺失 → 补齐再输出。

---

## §7 Hard Constraints — 不该做 / 不能做

- 不允许在 prompt 里出现「做更好设计」这类空话 — 必须到**可执行 token / component / JSON-LD / 工时**
- 不允许建议开 HK 子公司 / Airwallex 卡支付 — 深圳主体 + PayPal/Alipay/电汇 是 user 拍板的红线
- 不允许引入 9+ 第 9 种语言(瑞典 / 越南 / 阿拉伯)— 当前 8 国就饱和
- 不允许建议砍掉任何关系模式(couple / bff / bros / self 都是已有用户)
- 不允许假设 Togthr 已经有埋点或后端 analytics — 必须建议从 0 埋点
- 不允许忽略 2026 隐私法(GDPR / PIPL)— 任何文案 / 收集数据要合规

---

## §8 扩展上下文 — 给 GLM-5.2 备用

如果 GLM-5.2 想做更深的本地化策略,可读:
- `F:\Togthr_方案对比分析与融合方案.md`(特别是 §4 4 页面 prompt — 这些是已 fusing 的 baseline)
- `src/app/[locale]/HomeClient.tsx` — Fusion v2 已实装实现,可作为 baseline 重构参考
- `src/app/globals.css` — 完整 design token,跨页面共享
- `.harness/memory/MEMORY.md`(如果有)— togthr 项目专有 info

## §9 Reference Resources 速查

| Topic | 哪里查 |
|---|---|
| 现有页面源代码 | `src/app/[locale]/page.tsx`(Home / Nest / Chat / Store / Error / NotFound 等)|
| Design Tokens | `src/app/globals.css` |
| IP 资产 | `public/pets/*.png`(50+ 张,职业/节日/表情/奇幻) |
| Locale 翻译 | `messages/{en,zh-cn,zh-tw,ja,ko,de,es,fr}.json` |
| 关系模式定义 | `src/lib/design-tokens.ts` `RELATION_MODES` |
| Paywall 当前实现 | `src/components/shared/PaywallHint.tsx` |
| 安全图像 fallback | `src/components/shared/SafeImage.tsx` |
| Brand animated mascot | `src/components/shared/PetCapsule.tsx` |
| Locale CI | `.github/workflows/locale-check.yml` + `scripts/check-no-locale-prefix.js` |
| Deploy workflow | `.github/workflows/deploy.yml` |

---

*文件版本:1.0 · 2026-06-30 · Mavis 写给 AutoClaw/GLM-5.2 的综合策略 prompt*
