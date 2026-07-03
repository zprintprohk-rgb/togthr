# Togthr.life SEO + 流量增长整套落地计划
> **生成时间**: 2026-07-03 · **作者**: Mavis
> **目标**: 把 togthr.life 从"上线没流量" → 90 天自然流量 1k+/月, 联盟首单
> **核心哲学**: 内容飞轮 + AI 引用优化 + 用户停留触发器 + 联盟后置

---

## 0. 现状（诊断：6 个关键问题）

| # | 症状 | 根因 |
|---|---|---|
| 1 | **sitemap-0.xml lastmod = 2026-06-30, 不动** | 没有 postbuild 重建 hook, 也没 sitemap ping |
| 2 | **`/blog` 路由 404**, 但 sitemap.ts 列了 `/blog` | sitemap.ts 是手写模板, 引用了不存在的路径 |
| 3 | **Cloudflare Web Analytics 已挂代码, 但 `e3324b3e...9025` 是 CDN 默认 token**（homepage HTML 里发现） | 没真正配置 `CF_BEACON_TOKEN` env |
| 4 | **GSC / Bing / IndexNow 全部没接** | 0 索引数据 = 不知道什么词被搜 |
| 5 | **没有内容 (0 篇 blog)**, 没有社交账号, 没有外链 | 完全靠 onsite SEO 拉不动新站 |
| 6 | **DNS 已经切到 CF 了** (104.21.33.88 / 172.67.160.182) ✅ | 这是好消息, togthr.life 已活 |

**好消息**:
- togthr.life 已通, Workers 200, Dark mode 0B0B1A 已上线
- 8 locale 完整 + hreflang + canonical 正确
- 已有 pricing/faq/features/pet/journal/community 15+ 页面
- AGENTS.md + IDENTITY.md 写得很清晰

---

## 1. SEO 关键词矩阵（5 层金字塔）

### Tier 1 — 核心定位词（高竞争, 高意图, 8 locale 全覆盖）

| Locale | 关键词 | 落地页 | 难度 |
|---|---|---|---|
| en | `couple app`, `virtual pet app`, `AI companion app` | /, /features/virtual-pet | 高 |
| en | `relationship app`, `couple tracker` | /features/shared-journal | 高 |
| zh-cn | `情侣 app`, `虚拟宠物`, `异地恋 app` | /zh-cn, /zh-cn/features/virtual-pet | 中 |
| ja | `カップル アプリ`, `仮想ペット`, `遠距離恋愛 アプリ` | /ja, /ja/features | 中高 |
| ko | `커플 앱`, `가상 펫`, `장거리 연애` | /ko | 中高 |
| de | `Paar App`, `Beziehungs App`, `virtuelles Haustier` | /de | 中 |
| fr | `application couple`, `animal virtuel` | /fr | 中 |
| es | `app parejas`, `mascota virtual` | /es | 中 |

### Tier 2 — 场景痛点长尾（高转化, 8 locale × 20 词 = 160 长尾）

**en 模板**（每个 locale 各产 20 个）:
- `long distance relationship daily questions`
- `how to keep long distance relationship interesting`
- `virtual pet for couples online`
- `time capsule app for couples`
- `shared journal app for two`
- `couple mood tracker app`
- `couples anniversary countdown app`
- `pixel pet desktop companion`
- `cute desktop pet app`
- `tamagotchi alternative app`
- `100 days together gift idea`
- `long distance relationship gift app`
- `best app for couples in long distance`
- `free private journal app couples`
- `daily check in app for couples`
- `couple goals tracker app`
- `AI companion for emotional support`
- `pet that grows with your relationship`
- `anonymous couples community app`
- `couple bedtime routine app`

**zh-cn 模板**:
- `异地恋 怎么维持`
- `异地恋 100 个问题`
- `情侣 互动 app`
- `虚拟宠物 养成`
- `情侣纪念日 创意`
- `情侣 周年纪念 app`
- `异地恋 礼物 app`
- `情侣 桌面宠物`
- `像素 宠物`
- `养成 虚拟宠物`
- `情侣 私密 日记`
- `情侣 打卡`
- `AI 陪伴 app`
- `虚拟 男友 女友`
- `异地恋 时间胶囊`
- `情侣 梦想墙`
- `520 礼物`
- `七夕 礼物`
- `异地恋 app 推荐`
- `情侣 共享相册`

**ja 模板**:
- `遠距離恋愛 続ける方法`
- `カップル 質問`
- `仮想ペット アプリ`
- `記念日 カウントダウン`
- `カップル 日記 アプリ`
- `AI 彼女`
- `遠距離 プレゼント`
- `カップル 共有 アプリ`
- `ペット 育成 アプリ`
- `ピクセル アート ペット`
- `バレンタイン プレゼント`
- `ホワイトデー アプリ`
- `匿名 コミュニティ`
- `カップル ゲーム`
- `恋人 アプリ`
- `在宅 コンパニオン`
- `おやすみ メッセージ`
- `恋人 いない アプリ`
- `推し活 ペット`
- `韓国 旅行 アプリ`

(其他 5 locale 各产 20 词, 共 **160 长尾词**)

### Tier 3 — 节日热点词（每月 4-6 个, 时效性强）

```
1 月:  New Year resolutions for couples
2 月:  Valentine's Day gift idea / 情人节 / バレンタイン
3 月:  White Day / ホワイトデー / ホワイトデー 彼女
4 月:  Easter couple activities / 春 情侣
5 月:  Mother's Day, 520 (CN), 521 (CN)
6 月:  Father's Day, Pride Month
7 月:  Tanabata / 七夕 (CN+JP+KR)
8 月:  Qixi / 七夕 CN
9 月:  Anniversary gifts, Back-to-school
10 月:  Halloween couple costume, World Mental Health Day
11 月:  Singles Day (11.11), Black Friday, Thanksgiving
12 月:  Christmas, 100 days together, New Year's Eve couple
```

### Tier 4 — LLM 引用优化（GEO 2026, 最关键新战场）

LLM (ChatGPT / Perplexity / Claude / Gemini / 豆包) 引用偏好的内容结构:
- Reddit 高赞贴（核心）
- Medium 文章
- 知乎/Quora 长答
- 个人 blog (dev.to, hashnode)
- "best of" 列表文章

**目标长尾提问** (LLM 抓取偏好):
- `best virtual pet app for couples 2026`
- `best long distance relationship app free`
- `cutest desktop pet app`
- `best pixel art pet app`
- `most private couples app`
- `AI companion for loneliness 2026`
- `best anniversary app for long distance couples`
- 8 locale 各 10 个 = **80 个 LLM 引用机会词**

### Tier 5 — 品牌词 + IP 词（防守 + 抢 LLM 引用）

- `Togthr`, `Togthr Bot`, `Togthr Companions`
- `Togthr review`, `Togthr app download`
- 8 locale 全部占位 + 评测文章

---

## 2. 内容自进化机制（每日 1 篇 × 8 locale = 56 篇/周）

### 2.1 选题引擎（每日 03:00 cron 跑）

```yaml
数据源:
  - Google Trends API (按 locale)
  - Reddit: r/longdistance, r/relationship_advice, r/couples,
           r/pixelart, r/pet, r/tamagotchi (新站)
  - X/Twitter trending (按 locale, 用 paid API)
  - Togthr 用户行为 (登录后, 看 FAQ 搜索词 + 高频功能)
  - Togthr 客服邮件主题聚合
  
选题规则:
  1. 长尾词密度 = 0.5-1.5% (TF-IDF)
  2. 必须是 togthr 能"借力"的话题
  3. 100% 原创, 包含 1 个 togthr 案例 / 数据 / 截图
  4. 字数: 800-1500 (en), 600-1000 (CJK)
  5. 包含 1 个原创插画 (像素风)

选题类型 (4 种, 每周各 1 篇):
  A. "How to" 指南 (50%) — 解决问题
     例: "How to Send Surprise Time Capsule to Long Distance Partner"
  B. "Listicle" 列表 (25%)
     例: "7 Best Long Distance Date Ideas This Weekend"
  C. "Story" 故事 (15%) — 情感共鸣
     例: "Why We Built a Pet That Grows With Your Relationship"
  D. "Trendjacking" 热点 (10%)
     例: 节日 / 热点事件 + togthr 角度
```

### 2.2 写作流水线

```
04:00 cron:
  1. 选题引擎 → 1 个今日 topic + 5 个长尾词 + 1 张插图 brief
  2. AI 第一稿 (DeepSeek/GPT-4) → 800-1500 字 + 内链规划
  3. SEO 检查 (rankability.py):
     - 关键词密度 0.5-1.5%
     - H1/H2/H3 层级
     - meta desc 长度
     - 内链 ≥ 2
     - 外链 ≥ 1 (权威源)
  4. Schema 注入 (Article + FAQ + Breadcrumb)
  5. 8 locale 翻译 (DeepSeek 多语言) + 人校对 flag
  6. 写入 src/app/[locale]/blog/[slug]/page.tsx
  7. 更新 blog-posts.ts 元数据
  8. 触发 sitemap 重建
  9. IndexNow 提交 + GSC API
  10. social 矩阵自动发布
```

### 2.3 内容形式深度（重要）

**单篇 blog 结构模板**:

```
H1: 含主关键词 1 次
H2 (导语): 50 字内 hook + 痛点共鸣
H2 (背景): 100-200 字场景化故事
H2 (核心方法 1): 200-300 字 + togthr 截图
H2 (核心方法 2): 200-300 字 + togthr 截图
H2 (核心方法 3): 200-300 字 + togthr 截图
H2 (常见问题 FAQ): 3-5 个 Q&A, JSON-LD 注入
H2 (总结 + CTA): 引导下载 togthr / 注册免费版

视觉资产:
  - 1 个原创像素风插图 (hero)
  - 1 个 Togthr 截图 (mobile 模拟)
  - 1 个信息图 (optional)
```

### 2.4 分发矩阵 (8 渠道自动化)

```yaml
自动同步:
  - togthr.life/[locale]/blog/[slug]            # 主站
  - medium.com/@togthr                           # en (mirror)
  - dev.to/togthr                                # en (mirror)
  - hashnode.com/@togthr                         # en (mirror)

手动重点 (人工触发, 不自动):
  - Reddit 自荐 (特定社区, 不 spam)
  - 小红书 / 知乎 / 抖音 / note.com / Naver (5 国)
  - Hacker News "Show HN" (新品类/技术发布)
  - Product Hunt (新功能发布)
```

### 2.5 索引流水线 (Day 0 必须有)

```yaml
sitemap 自动重建:
  - 每次 blog 部署后, postbuild 跑 next-sitemap
  - 同时 ping: 
    * https://www.google.com/ping?sitemap=...
    * https://www.bing.com/ping?sitemap=...
    * https://indexnow.org/indexnow (批量 URL)

IndexNow 集成:
  - 注册: bing.com/indexnow (一次性, 拿 API key)
  - 写 src/app/api/indexnow/route.ts (POST 提交)
  - cron 每日 23:00 提交"今日新增/修改 URL"
  - 覆盖 Bing + Yandex + DuckDuckGo + Seznam
```

---

## 3. 推广渠道矩阵

### 3.1 Day 0-7 立即做（冷启动基础）

| 渠道 | 动作 | 预期 |
|---|---|---|
| **GSC** | 提交 sitemap, 验证所有权 (DNS TXT) | 收录 base |
| **Bing Webmaster** | 提交 sitemap | Bing 流量 (美国 desktop 30% 来自 Bing) |
| **IndexNow** | 集成, 每日提交 | 24h 收录 |
| **Product Hunt** | 预约 1 个 launch | 上线当天 200-500 UV |
| **Hacker News** | "Show HN: I built a pixel pet companion for couples" | 1000+ UV, 高质量外链 |
| **Reddit** | 5 个种子贴 (不直接广告): <br>  - r/longdistance: "How we use a shared virtual pet to stay connected"<br>  - r/pixelart: "Meet our 16-bit pet Togthr Bot"<br>  - r/relationship_advice: "Tool we built for LDR"<br>  - r/IndieHackers: "Building a couples companion app - month 2"<br>  - r/SaaS: "Cold-start SEO for relationship app" | 真实流量 + 外链 |
| **Medium** | 创 @togthr 账号, 同步 3 篇 blog | LLM 抓取源 |
| **dev.to** | 创 @togthr 账号, 同步 3 篇技术 blog | Dev community + 长期流量 |
| **Twitter/X** | 创 @togthrapp 账号, 每日 1 帖 (pixel art + 故事) | 长期粉丝 |
| **YouTube** | 创 @TogthrOfficial, 上 5 个像素动画短片 | 视频 SEO 长期红利 |

### 3.2 5 国本地化社区（手动, 重要）

| Locale | 平台 | 内容策略 |
|---|---|---|
| zh-cn | **小红书** + **知乎** + **抖音** | "异地恋情侣必备", "520 礼物", 像素宠物开箱视频 |
| ja | **note.com** + **X (JP)** + **Pixiv** | 远距離恋愛话题 + ピクセルアート展示 |
| ko | **Naver Blog** + **Naver Cafe** + **Brunch** | 장거리 연애 + 픽셀 아트 |
| de | **gutefrage.net** + **Xing** | Beziehung App + Pixelkunst |
| fr | **Doctissimo** + **Twitter FR** | application couple + pixel art |

### 3.3 Day 7-30 内容爆发（核心增长期）

- 每周 7 篇 blog × 8 locale = 56 篇/周
- 每周 3 个 Reddit 种子贴
- 每周 2 个短视频 (TikTok/Reels/Shorts)
- 每月 1 个 Product Hunt 级别发布 (新功能/节日活动)
- 每月 1 个 "Show HN" (技术突破时)
- 每月 10 个 KOL/博主 试用联系 (DM)

### 3.4 Day 30-60 付费测试

```
预算分配 (首月总 $2000):
  - Reddit Ads: $400 (subreddit 投放, 按 "long distance", "couples", "pixel art")
  - Google Ads: $600 (长尾词 CPC, "long distance relationship app", "couple app free")
  - TikTok / 小红书 / 抖音: $500 (短视频投流, 像素宠物 hook)
  - Apple Search Ads: $300 (高 LTV 关键词)
  - KOL 试用: $200 (3-5 个 micro-influencer, $30-100/个)
```

### 3.5 Day 60-90 规模化

- 联盟营销启动 (见第 5 节)
- 月预算提到 $5000
- 6 国 KOL 矩阵 (每国 5 个, 试用 + 长期合作)

---

## 4. 用户行为深度分析（让用户停留、依赖、爆光）

### 4.1 用户行为 6 大洞察

**洞察 1: 首屏 0-3 秒必须"情感触发"**

当前 Togthr 首页 hero:
> "A small robot in your device, accompanying you and representing the one you care about."

✅ 已经做对了。这是情感, 不是功能。DesktopPet 在 hero 跳出 = 加分。

**优化建议**:
- 把 DesktopPet 动画首屏可见 (而不是底部)
- 加 1 个动态效果: "Now feeding your Togthr" (状态显示)
- 移动端 hero 必须 1 屏内看完

**洞察 2: 首日 90 秒决定去留**

当前 onboarding 4 步 (welcome → name → mode → done) ✅ 合格。

**优化建议**:
- Onboarding 完成必须立即触发"第一次情感奖励": 宠物首次进化 + 1 个胶囊空位 + 1 张可分享的"我和我的 Togthr"图
- 把这个分享图设计成 **易爆光格式** (1080x1080 IG 比例 + 像素风 + togthr.life 水印)

**洞察 3: 第二天必须回来 (Streak 心理)**

当前 daily page 有 streak 系统 ✅。

**优化建议**:
- Streak 数字显眼 (宠物旁边显示 "🔥 7 day")
- 3 day / 7 day / 30 day / 100 day 四个 milestone 各给奖励 (皮肤解锁)
- 断签时不惩罚, 而是"宠物有点想你" + 1 个 emoji (情感, 不是功能)

**洞察 4: 依赖 = "我挂念的事"**

- 宠物饥饿值 (要喂) — 已有 ✅
- 时间胶囊"明天会解锁" — 已有 ✅
- 每日 1 个新问题 — 已有 daily ✅

**优化建议**:
- 加 **"宠物日记"**: 宠物每天自动生成 1 个状态 (用户上传 1 张图 + 宠物回应)
- 加 **"纪念日倒计时"**: 自动识别 anniversary + 100 day + 1 year, 提前 7 天提醒

**洞察 5: 分享 = 免费流量**

当前已有盲盒购买 (Togthr Companions 6+1) ✅。

**优化建议**:
- 购买后强制 "分享开箱结果" 按钮 (生成 IG/TikTok/小红书 格式图)
- 宠物升级到 rare/epic/legendary 必有可视化分享图
- "我和 Togthr 的 100 天" 纪念页 → 朋友圈/IG 模板

**洞察 6: 曝光 = 桌面宠物 + PWA**

当前有 sw-push.js (PWA) + DesktopPet 全站悬浮 ✅。

**优化建议**:
- DesktopPet 顶部加 1 个 "Get your own" 浮标 (透明小按钮, 不打扰)
- PWA install prompt 在 2 次访问后弹出
- Push notification: 每日 1 次 (09:00 用户时区), 不超限

### 4.2 用户停留触发器 Checklist

```
首屏 (< 3 秒): DesktopPet 动画 + 1 句情感 hook + 1 个 CTA
首日 (< 5 分钟): onboarding + 第一次情感奖励 + 分享图
次日回来: streak 数字 + 宠物状态变化 + 1 个新 daily question
7 日: 第一次皮肤解锁动画 + milestone 庆祝
14 日: 推送 "你的 Togthr 想你了" + 时间胶囊 demo
30 日: 升级套餐优惠 (Togthr Plus)
60 日: 拉新奖励 (推荐 1 个朋友免费 1 个月)
```

### 4.3 让用户"爆光"你的站点

**病毒系数 (K-factor) 设计**:

每个付费用户应该能拉 0.3+ 个新用户 (K = 0.3 算健康)。

```yaml
现有机制 (弱):
  - 邀请 1 个朋友 (无奖励, 无可视化)

加强后 (建议):
  - 邀请 1 个朋友: 双方各得 1 个 capsule (永久)
  - 邀请 3 个朋友: 解锁 "Companion" 宠物
  - 分享开箱图: 解锁限定皮肤
  - "100 天" 纪念页自动分享模板
  - 周年 anniversary 自动生成"我们 + Togthr" 长图

预期 K-factor:
  - 月 1: 0.05 (基线, 0 推广)
  - 月 2: 0.10 (邀请 + 分享机制)
  - 月 3: 0.20 (KOL + 联盟)
  - 月 6: 0.35+ (病毒稳定)
```

---

## 5. 广告联盟评估（先做基础, 后做联盟）

### 5.1 结论：暂缓, 但要预留架构

**为什么现在不做**:
- 联盟营销的前提 = 你有"可被推荐的内容" 和"明显高于平均的转化漏斗"
- togthr 现在 0 流量 = 联盟客群 (博主) 没东西可以推
- 联盟给博主的佣金是 "流量还没来之前 = 亏钱"

**正确的顺序**:
1. Day 0-30: 内容飞轮 + SEO + GSC 数据
2. Day 30-60: 自建 affiliate 程序 (PayPal 直接付款, 30 天 cookie)
3. Day 60-90: 公开招募 affiliate, 7-15% 起步佣金

### 5.2 自建 affiliate 程序（Day 30 启动）

```yaml
实现方式:
  - src/app/affiliate/ 路由 (前端注册)
  - Supabase 表: affiliates (id, code, email, payout_paypal, balance)
  - Cookie: 30 天, 通过 URL ?ref=CODE
  - 订阅支付成功 → 给 affiliate 加 30% 首月 + 5% 续费
  - 月底 PayPal 自动转账 (>$50 阈值)

佣金结构:
  - 免费 → Plus 转化: 30% 首月 (≈ $1.65)
  - Plus → Eternal: 25% 首月
  - 盲盒购买: 10%
  - 续费: 5% (永久)

品牌大使计划 (Day 60 启动):
  - 10 个核心博主 (粉丝 10k-100k)
  - 50% 首月 + 终身 10% 续费
  - 独家皮肤访问
  - 月度反馈渠道
```

### 5.3 外部联盟平台 (Day 90 评估)

**优先级**:
1. **impact.com** (SaaS/订阅最专业, $5000/月最低)
2. **PartnerStack** (B2B SaaS 友好)
3. **ShareASale** (广泛)
4. **CJ Affiliate** (大品牌)
5. **FirstPromoter** (低预算 SaaS, $49/月)

**预算警告**:
- 这些平台最低承诺 $500-5000/月
- 90 天内没必要上, 自建 PayPal affiliate 足够

### 5.4 哪些品类博主最值得拉

| 品类 | 粉丝范围 | 内容角度 | 转化率 |
|---|---|---|---|
| **LDR 情侣博主** | 10k-200k | "我们用 Togthr 维持感情" | 高 |
| **Pixel art 艺术家** | 5k-50k | "为 Togthr Bot 画同人" | 中 |
| **Productivity / Desk setup** | 50k-1M | "桌面 pet Togthr" | 中 |
| **Relationship advice** | 100k+ | "异地恋工具评测" | 高 |
| **AI companion 评测** | 10k-100k | "Togthr AI Soulmate 测评" | 中高 |
| **Pet 博主** | 10k-100k | "我的像素宠物" | 中 |

**前期手动 outreach (Day 30 起, 每周 10 个)**:
- DM 模板: "Hey [博主], 我做了 1 个像素宠物陪伴 app, 想送你 1 个 Eternal 永久会员, 你愿意分享你的体验吗? (不强制)"
- 转化率预期: 10% (10 个联系 → 1 个合作)

---

## 6. 30/60/90 天里程碑

### Day 0-7 (本周) — 基础设施修复

```
代码层:
  [ ] 修复 sitemap.ts (移除 /blog 错误引用 + 用 siteConfig.url)
  [ ] 添加 postbuild script: sitemap 重建 + IndexNow ping
  [ ] 修复 robots.ts (sitemap 引用 togthr.life)
  [ ] 创建 src/app/[locale]/blog/ 路由 + 首篇骨架
  [ ] 创建 src/app/api/indexnow/route.ts (POST 提交)
  [ ] 创建 src/app/api/sitemap-ping/route.ts (postbuild hook)
  [ ] 添加 CF_BEACON_TOKEN env 验证 (dashboard 看是否真 token)
  [ ] og-image 每个 locale 独立生成 + 像素风版本

索引层:
  [ ] GSC 注册 + DNS TXT 验证 + sitemap 提交
  [ ] Bing Webmaster 注册 + sitemap 提交
  [ ] IndexNow 注册 + API key 配置
  [ ] 5 个 Reddit 账号 (lurking 不 spam)

社交层:
  [ ] Twitter/X @togthrapp (en) + @togthr_ja (ja) + 5 国账号
  [ ] Medium @togthr + 创 1 篇 mirror 测试
  [ ] dev.to @togthr
  [ ] YouTube @TogthrOfficial (放 5 个像素动画)
  [ ] 小红书 / 知乎 / note.com / Naver 账号

内容层:
  [ ] 1 篇 high-quality 首发 blog (en + zh + ja): 
      "Why We Built a Pet That Grows With Your Relationship"
```

### Day 7-30 — 内容飞轮 + 联盟种子

```
每日 (周 1-5):
  - 1 篇 blog × 8 locale (选题 → 写 → 翻译 → 发布 → 索引)
  - 1 个 Reddit 种子贴
  - 1 个短视频 (15-30s, 像素宠物)
  - 3 条 Twitter/X 帖

每周:
  - 1 个 Medium / dev.to 同步文章
  - 1 个 Product Hunt 类活动 (新功能 / 节日)
  - 5 个博主 DM 联系

KPI:
  - blog 总数: 21 篇 × 8 locale = 168 URL
  - GSC 收录: 100+
  - IndexNow 提交: 168
  - Reddit 总浏览: 10k
  - Twitter 粉丝: 500
  - Medium 阅读: 5k
  - 自然流量: 200-500/月
```

### Day 30-60 — 付费测试 + 自建联盟

```
代码层:
  [ ] 自建 affiliate 程序 (PayPal 自动付款, 30 天 cookie)
  [ ] Blog 评论系统 (Disqus 或 Utterances, 增加 UGC + 页面活跃度)
  [ ] Email 收集 (Mailchimp / ConvertKit) + 欢迎邮件序列

付费测试:
  [ ] Reddit Ads: $400
  [ ] Google Ads: $600 (长尾词 CPC)
  [ ] TikTok/小红书/抖音: $500
  [ ] Apple Search Ads: $300
  [ ] KOL: 5 个 micro, $30-100/个

联盟:
  [ ] 10 个博主试用 (Eternal 会员 free)
  [ ] 5 个博主签 affiliate 协议

KPI:
  - blog 总数: 50 篇 × 8 locale = 400 URL
  - GSC 收录: 300+
  - 自然流量: 500-1500/月
  - 联盟首单: 5-10 个付费
  - 注册转化: 1-3%
  - 付费转化: 0.5-2%
```

### Day 60-90 — 规模化

```
内容:
  - 月 blog 数: 60+ 篇 × 8 locale = 480 URL
  - 视频: 30+ 短视频 (Reels/TikTok/Shorts)
  - 评测: 5-10 个第三方评测 (YouTube, 博客)

付费:
  - 月预算: $5000
  - 多平台 A/B test

联盟:
  - 50+ 博主签约
  - 1 个 KOL 深度合作 ($1000+, 大博主)

KPI:
  - blog 总数: 100+ 篇 × 8 locale = 800 URL
  - GSC 收录: 500+
  - 自然流量: 1k-3k/月
  - 总 UV (含付费): 10k+/月
  - 付费用户: 50-100
  - MRR: $200-500
```

---

## 7. 当前需要立即修复的 5 个 bug

| # | 文件 | 问题 | 修复 |
|---|---|---|---|
| 1 | `src/app/sitemap.ts` | 用 `Togthr.com` 大写错域名 | 改成 `siteConfig.url` 或删掉让 next-sitemap 接管 |
| 2 | `next.config.ts` | 没有 postbuild hook | 加 `"postbuild": "next-sitemap && node scripts/ping-search-engines.cjs"` |
| 3 | `src/app/robots.ts` | sitemap 引用 `Togthr.com` | 用 siteConfig.url |
| 4 | 没有 `/blog` 路由 | sitemap 列了, 实际 404 | 创建 `src/app/[locale]/blog/[[...slug]]/page.tsx` |
| 5 | `src/app/layout.tsx` | 没有 OG image locale 独立 | 准备 8 张 og-image-{locale}.png |

---

## 8. 每周复盘 checklist (建议加到 AGENTS.md)

```
每周一 09:00:
  - [ ] GSC: 收录数 / 点击 / 展示 / CTR (上周)
  - [ ] IndexNow: 提交数 / 索引成功率
  - [ ] Blog: 本周发布数 / 流量 top 5 文章
  - [ ] Reddit: 5 个种子贴浏览量
  - [ ] 社交: 粉丝增长 / engagement rate
  - [ ] 自然流量: 总 UV / 来源分布
  - [ ] 付费: 各平台 ROAS
  - [ ] 用户: DAU / 注册 / 付费 / 留存 D1/D7/D30

决策点 (根据数据):
  - 流量 < 500/月 → 加内容 + 加外链
  - GSC 收录 < 50% → 检查 sitemap + ping 频率
  - Reddit < 1000 → 调内容方向 / 多 subreddit
  - 付费 ROAS < 1 → 关掉该平台
```

---

## 9. 关键认知（必须记住的 6 条）

1. **没有 GSC 数据 = 蒙眼开车**。Day 1 必须接。
2. **没有内容飞轮 = SEO 没用**。上线就发, 不要等。
3. **togthr 是 IP + 工具**。IP 是流量的钩子 (pixel pet), 工具是变现 (subscription)。内容要围绕 IP 情感, 不是工具功能。
4. **8 locale 不是 8 个翻译**。是 8 个市场, 8 个文化, 8 个社区。zh-cn 是小红书, ja 是 note.com, ko 是 Naver, de 是 gutefrage。
5. **Pixel pet 是黄金钩子**。在 Reddit r/pixelart / Twitter / Instagram 像素艺术圈子里, Togthr Bot 是个有"艺术价值"的 IP, 不是商品。
6. **联盟后置**。先有流量再联盟, 不要反过来。

---

## 10. 资源清单（立即要准备的）

```
账号 (Day 0-7):
  - Google Search Console: properties/togthr.life
  - Bing Webmaster: properties/togthr.life
  - IndexNow: indexnow.org 注册 (拿 key)
  - Twitter/X: @togthrapp + 8 locale 账号
  - Reddit: 主账号 + 5 个子账号 (不同主题)
  - Medium / dev.to / hashnode / Substack: en
  - 小红书 / 知乎 / 抖音: zh-cn
  - note.com / X (ja): ja
  - Naver Blog / Naver Cafe / Brunch: ko
  - YouTube: en + ja (放 5 个像素动画短片)
  - Product Hunt maker account
  - Hacker News account

工具:
  - DeepSeek API key (内容生成)
  - Google Trends API key
  - Twitter API (basic, $100/月) - 监测热点
  - Buffer / Hypefury (社交调度)
  - Cloudflare Analytics (已有)
  - PostHog (可选)
  - 1 个 VPS (Reddit / Twitter 自动监控)

预算 (Day 0-90 总预算 $4000-6000):
  - 内容生成 API: $200
  - 社交监测 API: $300
  - 付费广告测试: $2000 (Day 30 起)
  - KOL 试用: $500
  - 联盟支出: $500-1000
```

---

**下一步**: 我建议先执行第 7 节的 5 个 bug 修复 + Day 0-7 的代码层基础设施。
  这些都是 1-2 小时内能搞定的事, 搞完才有后面内容飞轮的土壤。
  
按用户偏好 "togthr 走 GH Actions 不是本地 deploy", 改完 commit + push 触发 CF 构建。
  我可以立即开始, 要继续吗?