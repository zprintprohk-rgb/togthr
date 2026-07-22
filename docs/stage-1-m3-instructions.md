# 阶段 1 启动指令包（K3 校准版 → mini m3 执行）

> 2026-07-22 · 阶段 0 ✅ 完成（竞品垄断度报告：无预警）→ 阶段 1 正式启动
> 校准说明：本包基于千问框架，已由 K3 按 togthr 代码事实修正 4 处失真（见末尾附注）

---

## 任务 A：Programmatic SEO — 32 个长尾落地页

**目标**：解决"有机可见度≈0"，用长尾词包围核心词。

**技术路线（按项目既有模式，不要发明新架构）**：
- 路由：`src/app/[locale]/p/{slug}/page.tsx`，仿照博客的"单文件 8 locale 静态覆盖页"模式（参考 `src/app/[locale]/blog/a-virtual-pet-in-a-long-relationship/page.tsx`）
- **范围控制：本批只做 EN 正文 + 其余 7 locale 复用 EN 内容**（hreflang 指向自身即可）。不做 8 语言全翻译——32×8=256 篇翻译会烧光 token 帽且质量必塌。pSEO 第一波验证有效后再补语言。
- 注册表：新建 `src/lib/landing-pages.ts`（仿 blog-posts.ts 结构），sitemap 自动接入
- 上线后跑 `npm run indexnow:new`（AGENTS.md §13 固定流程）

**32 词清单（4 组场景，对应产品真实模式 couple/bff/bros/self）**：

组1 couple/LDR（8 词）：couple desktop pet app, long distance relationship widget, virtual pet for couples, shared pet app for two, desktop companion for long distance couples, couple check in app with pet, pixel pet for couples, relationship pet that grows

组2 self/孤独陪伴（8 词）：lonely desk companion, pixel pet for focus, cute desktop buddy for students, desktop pet for work from home, quiet companion app no chat, desk pet for coders, pixel buddy for study sessions, low pressure companion app

组3 bff/友情（8 词）：virtual pet to share with best friend, bff desktop buddy app, friendship check in app, long distance friendship app, shared pixel pet with friends, best friend daily ritual app, desktop pet for besties, stay in touch app for friends

组4 tamagotchi/怀旧（8 词）：tamagotchi for desktop, modern tamagotchi app 2026, tamagotchi alternative for adults, pixel pet like tamagotchi, desktop tamagotchi windows, tamagotchi 30th anniversary app, virtual pet that grows up like tamagotchi, tamagotchi for work computer

**页面模板（场景解决方案页，不是通用介绍页）**：
- H1 = 关键词 + 情绪钩子
- Hero：对应场景描述（文案即可，公仔图统一用 `/pets/` 现有素材，每组指定 1 张）
- "为什么有效" 3 段：桌面常驻（区别于纯移动 widget）、5 阶段成长（区别于静态宠物）、无广告无社交压力（区别于 Widgetable/Replika）
- 2 个 FAQ（Q&A 格式，GEO 用）
- CTA：免费注册（`/en` 首页 / `/en/pricing`），**文案用 "Start free in your browser"——我们是纯 Web 应用，禁止写 "Download for Windows/Mac"（没有原生客户端，写了就是虚假宣传）**
- 合规：全部 `readyForPublish=false` 等效处理——先存草稿路由，K3 抽查 3 页后才注册进 sitemap

## 任务 B：Tamagotchi 30 周年借势文（2 篇，沿用博客模式）

1. `tamagotchi-30th-anniversary-from-pocket-to-desktop` — 从钥匙扣到桌面：30 年电子宠物进化史。痛点切入（实体易丢、单人、无记忆）→ Togthr 自然引出
2. `tamagotchi-alternative-for-adults` — 给成年人的 Tamagotchi 替代方案（组4词的内容承接页）
模式：复用博客单文件 8 locale 静态覆盖页（博客是内容资产，值得全语言）；发文后跑 IndexNow。
分发素材：每篇产出 1 条 Reddit 草稿存 `docs/reddit-drafts/`（r/tamagotchi 用，怀旧语气，不发链接只讲故事，链接放个人主页）。

## 任务 C：对比评测文（2 篇，沿用博客模式）

1. `togthr-vs-widgetable` — 切入点："锁屏壁纸 vs 会成长的生命"。维度：广告（它有/我们无）、成长（静态/5 阶段）、平台（纯移动/桌面+Web）、关系记忆（无/日记+时间胶囊）。**只用我方竞品报告里实锤的事实**（`docs/competitor-monopoly-report.md` 第四节），不编竞品功能
2. `togthr-vs-replika` — 切入点："厌倦 endless chatting？试试安静陪伴"。维度：交互（纯文本聊天/桌面可视化养成）、社交压力、定价（$4.99 vs $5.49 事实对比）
红线：我方功能只写已上线的（5 阶段/6 皮肤/1/72 金款/Focus Mode/日记/胶囊/8 语言），**未上线的一律不得提及（没有"飞升"，没有买断制，没有原生客户端）**

## 验收标准（报 Success 时必须附带）
- 4 道 i18n 闸门全过（check-locale-syntax / locale-placeholders / translation-completeness / translation-regression）
- 本地 `next build --no-lint` 通过（教训：brace 事故让 CI 连跪 3 次，push 前必须本地构建）
- 攒批 push：任务 A+B+C 最多 2 次 push
- 自检数据：页面数、闸门结果、build 结果、commit hash

## 附：K3 对千问原指令的 4 处校准记录
1. ~~"Download for Windows/Mac"~~ → "Start free in your browser"（纯 Web 应用）
2. ~~"买断/轻订阅"~~ → 只有订阅制（$5.49/月 $37.99/年）
3. ~~"飞升阶段 Coming Soon"~~ → 无此功能，5 阶段（婴儿→传说）已全部在线
4. ~~"严禁出现微信/支付宝二维码"~~ → 修正为：pSEO 落地页（/p/）面向海外，CTA 只走 PayPal；定价页保留 Alipay 属正常业务（CN 区合规收款），不删
