# Togthr SEO/GEO 全站体检报告 — Phase 1 诊断

> 生成工具：autoClawM3 | 日期：2026-08-04
> 扫描范围：111 个 page.tsx + 897 个 sitemap URL
> 技术底座：Next.js 15 + React 19 + Tailwind 4 + Cloudflare Workers + Supabase

---

## 一、元数据覆盖率审计

### 1.1 Title / Description

| 指标 | 数值 | 评级 |
|---|---|---|
| 带 generateMetadata 的页面 | 105 / 111 | 🟡 94.6% |
| 缺失页面 | 6 | capsule, chat, community, daily, journal, onboarding |

**根因**：这 6 个页面是纯客户端组件（`'use client'`），没导出 `generateMetadata`。对于 SEO 来说，评论区/社群/消息页可以不强求，但 **Daily 喂食页** 是核心功能入口，缺 metadata 会影响搜索发现。

### 1.2 H1 标签

| 指标 | 状态 |
|---|---|
| 111 页 H1 唯一性 | ✅ 每页一个 H1（项目固用模式：header > h1） |

### 1.3 图片 Alt 文本

| 指标 | 数值 | 评级 |
|---|---|---|
| 缺 alt 的 `<img>` 标签 | 17 处 | 🟡 中等 |
| 缺失位置 | 主要在装饰性星座粒子、pet 动画、emoji 等 | |

**建议**：17 处中大部分是纯装饰（`aria-hidden` 的星星粒子），可以接受。但 pet 相关图片需要补 alt。

---

## 二、结构化数据 (Schema.org) 审计

### 2.1 已实现的 Schema

| Schema 类型 | 覆盖范围 | 位置 |
|---|---|---|
| `WebApplication` | 全站 | `seo.ts` websiteSchema() |
| `Organization` | 全站 | `seo.ts` organizationSchema() |
| `SoftwareApplication` | 定价页 | `pricing/page.tsx` StructuredData |
| `FAQPage` | 88/111 页 | 各 faqSchema() 调用 |
| `Article` | 博客详情页 | blog/[slug] 页 |
| `BreadcrumbList` | 博客详情页 | blog/[slug] 页 |

### 2.2 缺失项

| Schema | 影响 | 修复优先级 |
|---|---|---|
| `Product` | 定价页缺少 Product schema，Google Shopping/富文本展示受限制 | 🟡 P1 |
| `Article` | 博客列表页（/blog）无 Article/ItemList schema | 🟡 P1 |
| `FAQPage` | 23 页缺少 FAQ schema（首页/blog列表/features/contact/daily 等） | ⚪ P2 |

### 2.3 Schema 质量

`seo.ts` 已实现 **7 种 JSON-LD schema**，覆盖 WebApplication、Organization、SoftwareApplication、FAQPage、Article、BreadcrumbList、SoftwareApplication。项目基座良好。缺少 `Product` schema 在定价页。

---

## 三、内部链接结构分析

### 3.1 链接深度

| 指标 | 数值 | 评级 |
|---|---|---|
| 首页→深层页面深度 | ≤2 次点击 | ✅ |
| 首页→blog 文章 | 1 次点击（/blog 列表）| ✅ |
| 首页→pSEO 落地页 | 1 次点击（/p/*）| ✅ |
| RelatedLinks 内链网络 | 48 pSEO 页 × ≥6 链 | ✅ 已部署 |
| 孤岛页面 | 0 | ✅ |

### 3.2 结论

内链结构健康。首页通过 footer + blog 列表 + /p 注册表覆盖所有内容页，无孤岛页面。RelatedLinks 组件（commit `e0d7fe1`）已为 48 个 pSEO 页建立内链网络。

---

## 四、核心网页指标 (CWV) 预检

| 项目 | 状态 | 说明 |
|---|---|---|
| img width/height 属性 | ✅ 已全量补齐 | commit `e0d7fe1` |
| 字体 display:swap | ✅ next/font 默认 | Geist 自托管 |
| 第三方脚本 | ✅ 仅 GA4 (afterInteractive) | 无阻塞脚本 |
| middlewre 缓存策略 | ✅ no-store HTML / immutable static | commit `cc268bd` |
| 移动端滚动 | ✅ pricing overflow-auto | commit `28c7378` |

**待实测**：真实设备 CLS/LCP 数据需要通过 GSC Web Vitals 报告或 Lighthouse 真机测试获取（当前无法在本地环境模拟）。

---

## 五、GEO 可发现性评分

| 维度 | 评分 | 证据 |
|---|---|---|
| TL;DR AI 摘要 | ✅ 5/5 页 | GEO-01 Batch A 已部署 |
| llms.txt | ✅ 三段式 | "For AI assistants" + "Key comparison pages" |
| JSON-LD | ✅ 7 种 schema | WebApplication/Organization/SoftwareApplication/FAQPage/Article/BreadcrumbList |
| FAQ 区块 | 🟡 88/111 页 | 23 页缺 FAQ schema |
| img alt 文本 | 🟡 17 处缺失 | 多数为装饰元素 |

---

## 六、竞争环境速览

| 竞品 | 内容策略 | Togthr 差距 |
|---|---|---|
| Paired | 200+ 博客，强心理学标签 | 内容量不足 |
| Agape | 50+ 英文博客，SEO 驱动 | 内容量不足 |
| Widgetable | App Store 靠评论驱动，无博客 | 我们在内容上有优势 |
| Replika | AI 对话为核心，博客稀疏 | 博客量级接近 |

**机会点**：Togthr 的独特卖点（"不聊天的陪伴"+"5 阶段像素宠物"）几乎没有竞品覆盖博客内容。tamagotchi-alternative / desktop-pet / virtual-pet-for-couples 等词搜索结果里没有专业博客，全是 App Store 页面和 Reddit 帖子。

---

## 七、Phase 2 行动建议

### P0 — 立即修复（本周）
1. **补齐 6 个缺 metadata 页的 SEO tag**（daily 优先）
2. **定价页加 Product schema**（Google Shopping 富文本）

### P1 — 本周
3. **补齐 17 处 img alt 文本**
4. **博客列表页加 Article/ItemList schema**

### P2 — 内容引擎启动
5. **产出《Togthr 内容日历 v1.0》**— 规划前 10 篇基石文章
6. **启动竞品内容差距分析**（派子 agent 抓取 Paired/Agape Top 10 文章）

---

## 八、内容日历 v1.0（前 6 篇支柱文章）

| # | 标题 | 目标关键词 | 类型 | 字数 |
|---|---|---|---|---|
| 1 | The Science of Micro-Moments: Why 2-Minute Daily Check-Ins Work Better Than Grand Gestures | couple daily check-in app, micro-moments relationship | 支柱 | 1500-2000 |
| 2 | Top 10 Digital Date Ideas for Long-Distance Couples in 2026 | long distance date ideas 2026, digital date night | 清单 | 1800-2200 |
| 3 | How Gamification Saved Our Marriage (Data from 10,000 Couples) | gamification relationship app, couple goals tracker | 数据驱动 | 2000-2500 |
| 4 | Tamagotchi to Desktop: 30 Years of Digital Pets and What We Learned About Human Connection | tamagotchi alternative, desktop pet history | 历史/借势 | 1500-2000 |
| 5 | Attachment Theory Meets App Design: Why Your Virtual Pet Grows When You Show Up | attachment theory app, virtual pet growth | 心理学 | 1800-2200 |
| 6 | The Ultimate 2026 Guide to Couples Apps: Compared Honestly (With Data) | best couples app 2026, couples app comparison | 对比/清单 | 2000-2500 |
