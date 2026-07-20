# Togthr M2–M3 战略与执行战术手册

> 制定：2026-07-20 · 战略层（K3）· 执行层（mini m3 / Cline）
> 目标锚点：6 个月 $3000/月（≈80 个年付或 550 个月付等效）
> 上游文档：`docs/six-month-growth-map.md`（总地图）、AGENTS.md §13（发布流程 SSoT）

---

## 一、战场态势（截至 2026-07-20）

### 已建成的资产（护城河地基）
| 资产 | 状态 | 战略意义 |
|---|---|---|
| 支付端到端（沙盒验收通过） | ✅ | 收钱管道已通，只差切 live |
| GSC 收录 + sitemap + Bing + IndexNow | ✅ | 双搜索引擎即时收录通道 |
| AI 爬虫解封 + llms.txt + 6 组 JSON-LD | ✅ | GEO 基础设施满配 |
| 博客 15 篇（含 M1 新增 3 篇 ×8 语言） | ✅ | 内容弹药库雏形 |
| 69 张发光 IP 素材 + 24 张 OG 封面 | ✅ | 视觉资产可复用到所有渠道 |
| 白底顽疾根治（三层防御） | ✅ | 国内安卓浏览器不再翻车 |
| Focus Mode MVP | ✅ | 第二个留存钩子（待落库 SQL） |

### 关键缺口（按杀伤力排序）
1. **支付还是沙盒** — 流量来了也收不到钱。这是当前唯一的"流血伤口"。
2. **流量 = 0** — GSC 无数据，内容刚上线，沙盒期 4-8 周。
3. **没有外部声量** — Reddit/TikTok/小红书零存在感，纯等 SEO 太慢。
4. **双人共养未上线** — 病毒传播系数 K=0，增长全靠单点拉新。
5. **回家问候 sprite 未生成** — 情绪钩子缺失（网络问题搁置中）。

### 难点堵点预判（M2-M3 会撞上的墙）
| 堵点 | 概率 | 对策 |
|---|---|---|
| Google 沙盒期新站不排名 | 必然 | 不等 Google，M2 主攻 Bing（已收录）+ Reddit 直接引流 + GEO（AI 搜索无沙盒） |
| Reddit 发帖被当广告删/封号 | 高 | 养号 2 周再发；只发"故事+截图"，链接放个人主页；每帖 90% 价值 10% 提及 |
| Product Hunt 发布扑街（<50 upvote） | 中 | 提前 3 周预热（PH upcoming 页 + 亲友团 + hunter 勾兑）；发布日定周二-周四太平洋时间 00:01 |
| 中秋/万圣节皮肤开发挤占内容时间 | 中 | 素材库已有 69 张，皮肤 = 选图 + 配置，不做新功能开发 |
| PayPal 企业户审核卡壳 | 低-中 | M2 第一周就提交，留缓冲；备选 Airwallex 直连 |

---

## 二、战略主线（接下来的仗怎么打）

### 核心判断
**M2-M3 的本质是"用最小成本买到时间"**：Google SEO 的沙盒期是物理约束，无法加速。能加速的只有三件事——
1. **GEO**（AI 搜索无沙盒，榜单文 + FAQ + llms.txt 已布局，M2 加码对比内容）
2. **Reddit/社区直接引流**（不依赖搜索排名，今天发帖明天有流量）
3. **Bing/Copilot**（已收录，竞争比 Google 小一个量级）

### 增长公式（M3 目标倒推）
```
10 个付费 ≈ 400 注册（2.5% 转化）≈ 8000 访问（5% 注册率）≈ 每月 270 UV/天
```
UV 来源配比（M3 目标 1000 UV/月 → 实际要冲 3000）：
- Reddit/社区直接引流：40%（可控，靠执行力）
- Bing + AI 搜索：30%（已铺好管道，靠内容量）
- Google：15%（沙盒期末尾开始放量）
- Product Hunt 脉冲：15%（一次性，但要接住）

### 三条战略纪律
1. **每周发内容前先跑 IndexNow**（AGENTS.md §13 流程），收录速度是复利。
2. **所有内容双向复用**：博客 → Reddit 帖改写 → TikTok 脚本 → 小红书图文，一次生产四次分发。
3. **每月 1 号复盘 GSC/Bing 数据**，有曝光的词加码写，没曝光的砍掉不恋战。

---

## 三、M2 战术指令（7/20–8/15，给执行层的任务卡）

> 每张任务卡可直接交给 mini m3 / Cline 执行。优先级 P0 > P1 > P2。

### 任务卡 M2-01【P0】切 live 支付（本周必做）
- **做什么**：wrangler.toml 改 `PAYPAL_MODE="live"` + 替换 live Client ID/Secret（developer.paypal.com 用 doolen@126.com 登录 → Live → Apps & Credentials → 复制）+ 加 `PAYPAL_INVOICE_PREFIX="TOG"`（区分其他项目的收款）
- **验收**：用真实 PayPal 账号下一单 $5.49，后台订单 completed、memberships plus/active，PayPal 账单描述显示 TOG 前缀
- **堵点提示**：企业户首次收款可能触发 PayPal 风控审核（1-3 天），属于正常，提前做

### 任务卡 M2-02【P0】博客第 2 批 5 篇（集群 B 问题词）
- **选题**（每篇只攻一词，沿用 M1 batch 1 的 8 语言静态覆盖页模式）：
  1. `daily-check-in-app-for-couples` — 情侣每日打卡 App 为什么大多失败了
  2. `virtual-pet-app-for-couples` — 集群 A 核心产品词，落地到 /features/pet
  3. `how-to-feel-close-in-a-long-distance-relationship` — LDR 情感词
  4. `pixel-pet-widget-desktop` — 像素桌宠 widget 词
  5. `ai-companion-for-relationship-not-replacement` — AI 陪伴趋势词（GEO）
- **验收**：tsc 通过、blog-posts.ts +40 条目、跑 `npm run indexnow:new` 提交 40 URL
- **复用**：每篇 en 版改写成 1 条 Reddit 帖草稿（存 `docs/reddit-drafts/`）

### 任务卡 M2-03【P0】Reddit 养号启动
- **做什么**：注册 2 个 Reddit 账号（不同邮箱），加入 r/LongDistance、r/virtualpets、r/tamagotchi、r/LDR、r/productivity
- **前 2 周规则**：只评论不发帖；每条评论 ≥3 句真实经验；每天 ≤5 条；目标每个号 100+ karma
- **禁忌**：不提 Togthr、不放链接、不用 AI 味文案（Reddit 对 AI 文极度敏感）
- **交付**：`docs/reddit-warmup-log.md` 每日记录

### 任务卡 M2-04【P1】FAQ 页关键词问答化改造
- **做什么**：把集群 A/B 的 12 个关键词改写成 Q&A 对（AI 搜索最爱引用），扩写现有 /faq 页，每题答案 ≤80 词、含 1 个具体事实（5 阶段/6 皮肤/1/72 金款/$5.49）
- **验收**：FAQPage JSON-LD 覆盖全部问答，8 语言同步

### 任务卡 M2-05【P1】Product Hunt 预热
- **做什么**：注册 PH 账号 → 创建 upcoming/launch 预告页 → 准备素材包（5 张截图：Hero 宠物舱、定价页、Focus Mode、移动端、像素公仔特写 + 60 秒录屏 + tagline 3 个候选）
- **tagline 候选**："A pixel pet that grows with your relationship" / "Tamagotchi for couples, living on your desktop" / "Raise a tiny robot together, watch your love grow"
- **发布日预排**：M3 内选周二/三，太平洋时间 00:01（北京 15:01/16:01）

### 任务卡 M2-06【P1】Supabase 落库 + Focus Mode 完善
- **做什么**：唐总在 Supabase 跑 `supabase-focus.sql`（5 分钟）；执行层验证 /api/focus/complete 落库成功
- **后续**：Focus 数据接入宠物成长（专注 25 分钟 = 喂食一次）——这是"场景导向"的差异化，写进 M3 PH 发布卖点

### 任务卡 M2-07【P2】回家问候 sprite（网络恢复后）
- 4 帧 512×64 sprite：公仔转头→挥手→跳起→开心冒光，沿用 2px 小光无描边规格

---

## 四、M3 战术指令（8/15–10/15，冲锋期）

### 任务卡 M3-01【P0】Product Hunt 发布（M3 第 3-4 周）
- **前置**：M2-05 素材包 + 50 个亲友/hunter 名单 + upcoming 页 100+ follower
- **发布日剧本**（北京 15:00 起）：0h 发帖+第一条 maker comment（讲为什么做这个产品，真诚故事）→ 2h 亲友团 upvote → 6h Reddit/Twitter 同步 → 24h 内回复每一条评论
- **目标**：200+ upvote，Top 5 of the day 即大胜
- **承接**：PH 专属落地页加 `?ref=producthunt` + 首月 7 折码（PayPal 支持 discount）

### 任务卡 M3-02【P0】万圣节限定皮肤营销（10/1 上线）
- **做什么**：从 69 张素材库选/改 3 张万圣节皮肤（南瓜/幽灵/女巫帽），定价页加"限时"徽章，博客发 1 篇 "halloween virtual pet" 应季文
- **时间窗**：10/1 上线 → 10/31 下架，制造稀缺
- **中秋（9/25 前后）**：素材复用，加一轮，成本几乎为零

### 任务卡 M3-03【P0】博客第 3 批 6 篇 + 节奏维持
- 按 M2 复盘数据选题：GSC/Bing 有曝光的词加码
- 保底选题池：couples app 对比、study focus pet（Focus Mode 引流）、desktop pet for productivity、halloween virtual pet、long distance anniversary ideas、digital pet nostalgia

### 任务卡 M3-04【P1】Reddit 发帖期（养号满 2 周后）
- **发帖公式**：真实故事钩子（"我和异地女友养了一只一起看我们长大的像素宠物"）+ 2-3 张截图 + 评论里自然带链接
- **频率**：每周 ≤2 帖，分散到不同 sub
- **红线**：被删帖立刻停 1 周，不换号硬发

### 任务卡 M3-05【P1】月度 GEO 自检
- 每月 1 号在 ChatGPT/Perplexity/Kimi 问 10 个目标问题（"best virtual pet app 2026"等），记录 Togthr 是否被引用，写进 `docs/geo-monthly-check.md`

### M3 验收线（10/15 盘点）
- 1000 UV/月（冲 3000）
- 首批 10 个付费
- PH 发布完成
- 若 UV <500：战略复盘会，砍低效渠道，M4 资源重配

---

## 五、唐总每周 2-3 小时/天 的节奏表（M2 版）

| 时间 | 动作 |
|---|---|
| 周一 2h | 看数据（GSC+Bing+PostHog），给我一句"哪篇有曝光"，我定下周选题 |
| 周二/四 各 1.5h | 验收执行层交付（博客/FAQ/皮肤），点 deploy |
| 周三 1h | Reddit 养号评论（真人手感，别让 AI 写） |
| 周五 1h | 周复盘：对照本手册任务卡打勾 |
| 随时 | 收款/账号/审核类的真人操作（只有你能做） |
