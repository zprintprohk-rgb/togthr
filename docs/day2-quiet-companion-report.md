# Day 2 执行报告 — 全站定位切换（quiet companion）

> 日期：2026-08-09 | Commit: `71afe9c` | Tag: `day2-complete`
> 指令来源：《Togthr项目 AutoClaw 逐日投喂指令集》Prompt 2-A + 2-B

## 一、2-A 执行结果

### 2-A-1 首页 H1 + 副标题（8 locale 精确匹配）

| locale | H1 | 副标题 |
|---|---|---|
| en | the quiet companion | He doesn't chat. He stays. |
| zh-cn | 安静的陪伴者 | 他不聊天。他只是在。 |
| zh-tw | 安靜的陪伴者 | 他不聊天。他只是在。 |
| ja | 静かな寄り添い | チャットしない。ただ、ここにいる。 |
| ko | 조용한 동반자 | 채팅하지 않아요. 그냥 곁에 있어요. |
| es | El Compañero Silencioso | No chatea. Solo está aquí. |
| fr | Le Compagnon Discret | Il ne chatte pas. Il reste. |
| de | Der Stille Begleiter | Er chattet nicht. Er bleibt. |

> 注：指令集提到 pt，项目实际为 8 locale（无 pt），按项目实际执行。

### 2-A-2 根布局 Metadata

- title 模板：`%s | Togthr — The Quiet Companion`（默认同）
- description：`A small presence on your screen that remembers you. No chat. No AI. Just stays.`
- og/twitter 经 `siteConfig.ogImage` 同步
- llms.txt 首行已验证：`Togthr is a quiet companion. No chat. No AI conversation.`（Day 1 已更新）

### 2-A-3 OG 图（OPC Day 2 新增项）

- 生成 `public/og-quiet-companion.png`（1200×630）
- 设计：背景 #1a1a2e 像素网格 + 粉色像素机器人居中 + "Togthr" 标题 + "He doesn't chat. He stays." + togthr.life
- `src/lib/seo.ts` ogImage：`/pets/character-sheet.png` → `/og-quiet-companion.png`
- 部署后用 Facebook Sharing Debugger 验证（待 CF Paid 部署后）

### 2-A-4 导航栏清理（严格 4 项）

桌面导航 + MobileNav 同步：

| 项 | href |
|---|---|
| Companion | `/` |
| For Couples | `/couples` |
| For Me | `/solo` |
| Ethics | `/ethics` |

- 移除：Home/Features/Pricing/FAQ/Blog/Daily/Capsule/Pet/Nest/Store/Focus/Chat（全部旧导航项）
- MobileNavLabels 类型重构为 companion/couples/solo/ethics/login
- 新增占位页防死链：`/couples`、`/solo`、`/ethics`（Day 4-5 升级为完整落地页）

### 2-A-5 Footer 更新

- i18n key `footer.notChatbot`（8 locale）：
  - en: "Togthr is not a chatbot. It doesn't talk. It remembers you."
  - zh-cn: "Togthr 不是聊天机器人。它不说话。它记得你。"
  - 其余 6 locale 对应翻译
- 样式：`text-xs opacity-60 text-zinc-400`
- `/privacy` `/terms` 链接完整保留

## 二、2-B 验证结果

| 检查 | 结果 |
|---|---|
| 2-B-1 全站文本扫描 | ✅ 产品功能层 0 残留（命中项分类：middleware 合规规则 / 支付内部 tier 标识符 `TIERS = Set(["plus","soulmate"])` / 博客内容文章——指令集允许的正当品类讨论，保留为 SEO 资产） |
| 2-B-2 i18n 闸门 | ✅ 4 道全绿：syntax 25/25、no-locale-prefix、placeholders（0 错误 0 警告，untranslated 为既有基线）、translation-regression |
| 2-B-3 tsc | ✅ 0 错误（修复：导航替换多余 `</div>`、MobileNav strong 字段残留） |
| 2-B-4 OG 图 | ✅ 1200×630 已生成，ogImage 引用已更新 |
| 2-B-5 CF 部署 | ⏳ 待 CF Paid 升级后执行 |

## 三、Day 2 完成标准（11 项）

| # | 检查项 | 状态 |
|---|---|---|
| 1 | CF Paid 已升级 | ⏳ 用户操作中 |
| 2 | 首页 H1 = "the quiet companion" | ✅ |
| 3 | 副标题 = "He doesn't chat. He stays." | ✅ |
| 4 | 全站 metadata 统一 | ✅ |
| 5 | OG 图已更新并验证 | ✅ 已生成（线上验证待部署） |
| 6 | 导航栏仅 4 项 | ✅ |
| 7 | Footer 声明已添加 | ✅ |
| 8 | 全站文本扫描 0 残留 | ✅ |
| 9 | tsc 0 error + i18n 全绿 | ✅ |
| 10 | CF 部署成功 + 线上验证 | ⏳ 待 CF Paid |
| 11 | git tag day2-complete | ✅ |

**9/11 达成，2 项依赖 CF Paid 升级。**

## 四、Day 3 预告（文档交叉校准）

| 任务 | 来源 | 优先级 |
|---|---|---|
| GA4 事件埋点注入（6 个自定义事件） | 指令集 Prompt 3 | P0 |
| Web Analytics 开启 | OPC Day 3 | P0 |
| Baseline 数据记录 | OPC Day 3 | P0 |
| Supabase 免费层引入（替代 localStorage） | 战略评估 P1 | P1（Week 1 必做，影响 L3 付费转化验证） |
