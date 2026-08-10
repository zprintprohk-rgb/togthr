# Togthr 全量代码审计报告 — 情侣记录 → AI 宠物（安静陪伴）转型

> 审计日期：2026-08-10 | 审计范围：全代码库（路由/API/组件/数据/依赖/部署）
> 审计方式：2 路并行 Agent（模块分类 + 技术栈/部署）+ 人工复核
> 依据：《Togthr → AI宠物转型 · 12周执行方案》

---

## 一、技术栈识别

### 1.1 依赖包（18 dependencies + 12 devDependencies）

| 包 | 版本 | 方向判断 | 说明 |
|---|---|---|---|
| next | 15.5.7 | ✅ KEEP | App Router 框架核心 |
| react / react-dom | 19.2.4 | ✅ KEEP | 框架核心 |
| next-intl | 4.12.0 | ✅ KEEP | 8 locale i18n |
| @supabase/ssr | 0.10.3 | ✅ KEEP | 浏览器/服务端认证 |
| @supabase/supabase-js | 2.106.1 | ✅ KEEP | 数据库客户端 |
| framer-motion | 12.40.0 | ✅ KEEP | 动画（宠物交互核心） |
| tailwind-merge | 3.6.0 | ✅ KEEP | 样式工具 |
| @radix-ui/react-accordion | 1.2.12 | ✅ KEEP | 通用 UI |
| lucide-react | 1.16.0 | ✅ KEEP | 图标库 |
| react-turnstile | 1.1.5 | ✅ KEEP | 表单安全 |
| **@vercel/og** | — | ✅ 已移除 | bundle 罪魁已删（og-generator 替代） |
| **satori** | — | ✅ 已移除 | 同上 |

> 结论：18 个依赖全部保留或已清理，**无 AI 宠物方向不需要的依赖**。

### 1.2 架构识别

| 维度 | 技术 | 说明 |
|---|---|---|
| 前端 | Next.js 15 App Router + React 19 + Tailwind CSS 4 | CSS-first 无 tailwind.config |
| 后端 | Cloudflare Workers（@opennextjs/cloudflare, Node.js runtime） | edge 渲染 |
| 数据库 | Supabase PostgreSQL（Drizzle ORM） | 14 张表 |
| 存储 | Cloudflare R2（binding: R2 → my-we2-images + CONTENT → togthr-content） | 皮肤/图片/SSG HTML |
| 认证 | Supabase Auth（OAuth callback + SSR cookie） | 登录/注册/重置密码 |
| 支付 | PayPal（SDK 完整）+ Alipay（CN）+ 网关抽象层 | 13 国定价 |
| 分析 | GA4（G-TNKXQ7V351）+ PostHog（analytics.ts 双轨） | 12+6 事件 |
| 部署 | GitHub Actions（deploy.yml）+ wrangler/opennextjs | CI 自动部署 |
| 安全 | Cloudflare Turnstile + CSP + hreflang 8 locale | |

---

## 二、可复用模块清单（KEEP — 零改造直接可用）

### 2.1 用户系统 / 认证

| 模块 | 文件路径 | 说明 |
|---|---|---|
| 登录/注册/重置 | `src/app/[locale]/login|register|reset-password/` | 完整保留 |
| OAuth 回调 | `src/app/api/auth/callback/route.ts` | 直接可用 |
| 用户表 | `src/db/schema.ts → profiles` | 直接可用 |
| 认证埋点 | `src/components/shared/AuthEventTracker.tsx` | 直接可用 |

### 2.2 数据库 Schema（14 张表全保留）

| 表 | 说明 | 判断 |
|---|---|---|
| profiles | 用户系统核心 | ✅ KEEP |
| couples | 情侣关系（转型后改宠物陪伴关系，见改造清单） | 🔧 REFACTOR |
| subscriptions | 订阅管理 | ✅ KEEP |
| focus_sessions / focus_streaks | 专注功能 | ✅ KEEP |
| memory_* | 记忆引擎（AI 宠物核心） | ✅ KEEP |
| 其余 7 张（events/streaks/payments/…） | 功能支撑 | ✅ KEEP |

### 2.3 订阅 / 支付

| 模块 | 文件路径 | 说明 |
|---|---|---|
| PayPal 完整 SDK | `src/app/api/paypal/create-order|capture-order|webhook/` | 直接可用 |
| 网关抽象层 | `src/app/api/payments/[gateway]/create/` | 直接可用 |
| Alipay | `src/app/api/alipay/create-order|notify/` | CN 结算核心 |
| 订阅 cron | `src/app/api/cron/check-subscriptions/` | 直接可用 |
| 定价数据 | `src/lib/pricing-impl.ts` | 13 国实价（改造见下） |
| 支付成功页 | `src/app/[locale]/payment/success/` | 直接可用 |
| 商店结算 | `src/app/api/store/checkout/` | 皮肤商店 |
| 商店页 | `src/app/[locale]/store/` | 数字限定路径 1 |

### 2.4 部署 / CI/CD

| 模块 | 文件路径 | 说明 |
|---|---|---|
| GitHub Actions | `.github/workflows/deploy.yml` | build + wrangler deploy + 缓存 purge |
| Workers 配置 | `wrangler.toml` | R2 双 bucket + env vars |
| OpenNext 配置 | `open-next.config.ts` | Cold Start / Asset |
| 健康检查 | `src/app/api/health/route.ts` | 探活 |

### 2.5 SEO 配置

| 模块 | 文件路径 | 说明 |
|---|---|---|
| 站点元数据 | `src/lib/seo.ts` | siteConfig 全字段（url/og/name） |
| 结构化数据 | `src/components/StructuredData.tsx` | FAQ JSON-LD |
| 内链网络 | `src/components/relatedlinks.tsx` | 48 pSEO 页互链 |
| llms.txt | `public/llms.txt` | AI 检索入口（quiet companion 定位已更新） |
| OG 图 | `public/og-quiet-companion.png` | 1200×630 |
| OG 生成器 | `src/lib/og-generator.ts` | 客户端 Canvas 分享卡 |

### 2.6 通用 UI 组件

| 组件 | 路径 | 说明 |
|---|---|---|
| DesktopPet | `src/components/DesktopPet/index.tsx` | ⭐ 核心 IP（512×64 sprite，不可动） |
| BuddyAvatar | `src/components/buddy/BuddyAvatar.tsx` | 8 状态×6 主题像素公仔 |
| IdentitySelector | `src/components/buddy/identityselector.tsx` | 6 职业皮肤 |
| MemoryCard | `src/components/buddy/memorycard.tsx` | 记忆卡片 |
| EmotionParticles | `src/components/shared/EmotionParticles.tsx` | 5 情绪粒子 |
| FeedingModal | `src/components/shared/feedingmodal.tsx` | 喂食 |
| PetCapsule | `src/components/shared/PetCapsule.tsx` | 休眠舱 |
| PetLoader | `src/components/shared/petloader.tsx` | 品牌加载 |
| SafeImage / Accordion / LanguageSwitcher / MobileNav | `src/components/shared|ui/` | 通用 UI |
| 宠物主页 | `src/app/[locale]/pet/` | 核心宠物页（改造见下） |
| companion / build / focus / dev/buddy / memory 页 | `src/app/[locale]/` | 宠物陪伴核心页，直接可用 |
| blog / p / referral / privacy/terms/cookies/help/contact/faq/ethics/guide | `src/app/[locale]/` | 内容/增长/合规页 |

---

## 三、需改造模块清单（REFACTOR — 核心逻辑保留，改语义）

### 3.1 核心玩法（宠物中心化）

| 模块 | 当前问题 | 改造建议 | 工时(h) |
|---|---|---|---|
| 首页 HomeClient | `RelationModeSelector`（4 种关系模式=情侣私密叙事）| 移除关系模式，换宠物陪伴叙事 | 3 |
| daily 喂养 | "Is the other one with you today?" 情侣二元 | 改纯宠物喂食时刻 | 2 |
| journal 筑巢 | "shared journal" 情侣私密 | 改"今天对宠物说的话"个人日记+筑巢成长 | 3 |
| memory 记忆殿堂 | anniversary 类型 + "伴侣缺席" | 删 anniversary、改"宠物想你了"语义 | 2 |
| capsule 挖宝 | 去 couple 语义 | 改个人记忆宝箱（或并入 memory） | 2 |
| pet 宠物主页 | 文案"灵魂伴侣/召唤另一个TA" + 引用 TraceStream/SignalButtons | 改文案 + 移除被删组件引用 | 2 |
| community 树洞 | layout metadata "Couples Community" | 改文案 | 0.5 |
| onboarding | "with someone" 模式 + /chat 链接 | 移除模式选项 + chat 链接 | 1.5 |
| features 详情 | shared-journal / dream-wall Demo | 删 2 个 Demo，改 2 个语义 | 4 |
| for/ 分群页 | for-couples 条目 | 删 couples，保留 besties/family/self | 2 |
| p/ 程序化落地页 | ~20 个情侣条目（couple-desktop-pet-app 等）| 删情侣条目，保留宠物/tamagotchi/陪伴类 | 2 |
| blog | soulmate-chat 主题 5 篇 + 情侣主题 ~10 篇 | 删除，保留宠物主题 25 篇 | 2 |
| pricing | soulmate tier（AI 功能档）| 移除 tier + PetMatrix 同步 | 1.5 |
| MobileNav | /couples 导航项 | 替换为 /pet 或 /companion | 0.5 |
| blogctabanner | 链接指向 /couples | 改 /pet | 0.5 |
| couples 落地页 | 情侣定位与新方向冲突 | 删除后 301 → 首页（需清理 CTA 引用） | 1 |
| solo 落地页 | "与 couples 对立" 叙事 | 改"宠物陪伴"叙事 | 2 |
| couples 表 | 情侣关系 schema | 改宠物陪伴关系（owner 单人语义） | 3 |
| pricing-impl | soulmate tier 数据 | 移除 AI 功能档 | 1 |

### 3.2 对话引擎相关

| 模块 | 当前问题 | 改造建议 | 工时(h) |
|---|---|---|---|
| chat 目录（12 文件） | AI 聊天 + soulmate | ❌ 整目录 DELETE（见删除清单） | 0 |
| moodDetector.ts | 情绪检测（聊天用） | 删除（chat 目录内） | 0 |

> 注：项目无独立对话引擎，chat 目录即全部"对话"代码——全部删除后无需改造。

### 3.3 UI 主题

| 模块 | 当前问题 | 改造建议 | 工时(h) |
|---|---|---|---|
| 深色宇宙主题 | 已实现（#0B0B1A + cosmic-glow） | ✅ 保留，Buddy 光晕已同源 | 0 |
| 像素风 16-bit | 已实现（pixelated + crispEdges） | ✅ 保留 | 0 |
| 三色光晕 | 已实现（紫粉青） | ✅ 保留（buddy-aura 头部） | 0 |

---

## 四、需删除模块清单（DELETE — 与 AI 宠物方向冲突）

| 模块 | 文件/目录 | 删除原因 |
|---|---|---|
| Soulmate Chat | `src/app/[locale]/chat/`（12 文件）| 核心被砍功能（AI 聊天+soulmate 定位） |
| 伴侣信号流 F1 | `src/components/pet/tracestream.tsx` | 情侣私密功能 |
| 一键信号 F2 | `src/components/pet/signalbuttons.tsx` | 情侣私密功能 |
| 关系模式选择器 | `src/components/shared/RelationModeSelector.tsx` | 情侣私密叙事（HomeClient 引用同步删） |
| couples 落地页 | `src/app/[locale]/couples/page.tsx` | 情侣定位（301 → 首页） |
| OG API route | `src/app/api/og/route.tsx` | bundle 罪魁（og-generator 已替代） |
| 破损目录 | `src/app/[locale`（无 `]` 空目录）| Windows 路径残留 |
| 情侣主题博客 | blog 中 long-distance-boyfriend / love-streak-science / couples-app-dark-patterns-audit 等 ~10 篇 | 主题冲突 |
| soulmate 主题博客 | blog 中 the-day-* 4 篇、the-thought-you-dont-send-at-2am | 主题冲突 |
| 情侣 pSEO 条目 | p/ 中 ~20 个 couple-* slug | 主题冲突 |
| features Demo | shared-journal / dream-wall | 情侣私密功能 |

---

## 五、工作量汇总

| 分类 | 模块数 | 工时 |
|---|---|---|
| KEEP（零改造） | 45+ | 0h |
| REFACTOR（改语义） | 20 | **~37h** |
| DELETE | 12 组 | ~2h（删除+清理引用） |
| **合计** | | **~39h（约 5 个工作日）** |

---

## 六、依赖关系图

```
认证模块（profiles ← supabase ← middleware ← layout）
   └── 登录/注册/重置页 ← AuthEventTracker
支付模块（subscriptions ← paypal/alipay ← pricing-impl）
   └── pricing 页 ← TierCard/PetMatrix ← store 商店
宠物核心（DesktopPet/BuddyAvatar ← pets 资产 ← R2）
   ├── companion 照顾循环 ← memory-engine ← localStorage
   ├── build 建造仪式 ← buddy-asset-map ← IdentitySelector
   └── daily/journal/capsule ← EmotionParticles/FeedingModal
SEO 层（seo.ts ← layout generateMetadata ← llms.txt ← sitemap）
   └── blog/p 内容页 ← relatedlinks ← BlogCtaBanner
分析层（analytics.ts ← GA4 ← ViewTracker ← 各页面）
删除线：chat(12) ← PetDetailClient ← tracestream/signalbuttons
          ← RelationModeSelector ← HomeClient
```

---

## 七、结论与建议

1. **复用率极高**：45+ 模块零改造直接可用（用户系统/支付/SEO/部署/宠物核心全保留），转型成本集中在**语义改造（37h）而非重写**。
2. **改造优先级**（按 12 周方案）：第 1 周先 DELETE chat/couples/tracestream/signalbuttons（2h 止血）→ 第 2-3 周 REFACTOR 首页/daily/journal/onboarding（10h）→ 第 4-5 周清理 p/blog 情侣内容（4h）。
3. **风险点**：PetDetailClient 引用将被删组件（tracestream/signalbuttons）——删除时需同步改；blogctabanner 指向 /couples——需同步改 /pet；MobileNav 有 /couples 导航项。
4. **依赖全兼容**：18 个 npm 依赖无一需要移除（@vercel/og 已清理），无新技术引入。
