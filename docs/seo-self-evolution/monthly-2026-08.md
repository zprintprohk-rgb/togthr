# Monthly SEO Strategy Review — 2026-08-01 (covering 2026-07-01 ~ 2026-07-31)

> **Period covered**: 2026-07-01 (Wed) ~ 2026-07-31 (Fri) — 31 days
> **Review trigger**: `cron: togthr-monthly-strategy-review` schedule `0 10 1 * *` Asia/Shanghai, 实际触发 10:00 CST
> **Author**: Mavis (orchestrator) — 直接读 git log + 22 份 verify-2026-07-*.md + 2 份 weekly-2026-07-*.md + blog-posts.ts + sitemap-0.xml + verify-2026-07-22-monitor-final.md, **不依赖 hermes/cron 自报**
> **TTL**: 60 days (expire 2026-09-30)
> **Strategic shift in July**: 7/22 之前是"daily content 节奏" (16 篇), 7/22 之后切到"M1 阶段 1 批量 pSEO 32 页" (32 个新 slug, 24 个 daily slug 被 archive 从 blog-posts.ts 移除)

---

## 0. 一句话结论

**🟡 UNMEASURABLE (主指标缺失) + 🟠 战略切换 + 🔴 9 天断档** — 7 月是"基础设施月 + 战略切换月 + 链断月",不是"流量增长月"。

- **生产链路**: ✅ 16 篇 daily content 上线 (W1-W4) + 32 篇 pSEO M1 阶段 1 上线 (W4 末 + W5), sitemap 总 **42 slugs × 8 locale = 336 URLs** (全 lastmod 2026-07)
- **流量判定**: ❌ **GSC 仍未配置** (7/3 launch 至今 60 天, 从未注册), Bing 已提交 64 URL 但数据未出, **自然流量实测 ≈0, 月环比 UNMEASURABLE**
- **M1 阶段 1 启动**: 7/18 batch 3 篇 (tamagotchi-app-2026, things-to-do-with-long-distance-boyfriend, best-virtual-pet-apps-2026) + 7/22 batch 4 篇 (M1-A/B/C/D) + 7/22 后 19 篇补全 = **总计 26 个 pSEO slug 在 sitemap 上** (剩余 6 slug 应在 8/1-8/7 补完, 完成 32 页 pSEO 阶段 1 目标)
- **断档期**: 7/22 02:05 monitor cron self-delete 后, 7/23 ~ 7/31 共 **9 天零 verify 报告** (原因待查, 可能是 daemon 静默 / 7/30-7/31 全部精力被 zprintpro 88fd338 拉走)
- **7/21 dispatch bug**: 7/22 报告 BLOCKER + 4 path 选项给 user, 但 **user 没拍板**, 7/22 之后无任何修动作, 7/21 的 8 个 URL 仍 timeout 30s (从 cron 视角无法 100% 验证 7/22 之后 pSEO 32 页是否真 live)
- **月环比判定**: 6 月 ≈0 → 7 月 ≈0, 字面 0% 形式"平稳"。**但实际是"未启动"不是"平稳"**, 主指标缺失本身就是严重信号。**不触发"连续 2 月衰退" (因为根本没衰退, 是没启动), 但 8 月再不修 GSC + 转化漏斗, 9 月就要触发战略重审**

---

## 1. 月度 KPI 大表

> **Spec**: 流量月环比 > 20% = 增长期, 0~20% = 平稳, < 0% = 衰退. 连续 2 月衰退 → 升级 user 重新审视战略 + 关键词矩阵调整

| # | KPI | 7 月实测 | 6 月对照 | 月环比 | 判定 |
|---|-----|---------|---------|--------|------|
| **(a)** | **自然流量月环比** | **UNMEASURABLE** (GSC 未配, 实测 ≈0) | UNMEASURABLE (6 月无 SEO 内容) | n/a | ❌ **主指标缺失** |
| **(a)** | 自然流量 (估) | ≈0 UV/月 (GSC 0 记录 + Bing 64 提交数据未出) | ≈0 UV/月 (站点 7/3 才 launch) | n/a | ⚠️ 实测 ≈0 |
| **(b)** | **GSC 收录总库** | **首页 1 URL 已收录** (per 7/22 weekly) + 博客 URL 收录数据 UNMEASURABLE | 0 (6 月无站点) | +1 但无博客收录 | ❌ **GSC 仍未充分利用** |
| **(b)** | Bing 提交 URL | **64 URLs** (per 7/22 weekly), 数据未出 | 0 | n/a | ⚠️ 已提交待出 |
| **(c)** | **blog 总数 (8 locale 累加)** | **sitemap 42 slugs × 8 locale = 336 URLs** (lastmod 全 2026-07) | 0 (6 月无内容) | +∞% | ✅ **生产链路 100% 健康** |
| **(c)** | blog 实际可访问数 | **≤ 328 URLs** (16 daily × 8 + 38 pSEO × 8 - 8 个 7/21 broken = 328, 但 7/22 后 pSEO 32 页真 live 状态未验证) | 0 | n/a | ⚠️ **7/22 后真 live 状态 unknown** |
| **(c)** | daily content 发布数 | **16/22 天** = 72.7% (3 missed: 7/12, 7/17, 7/19 + 1 broken: 7/21 + 1 skip: 7/22) | 0 | +∞% | ⚠️ 73% 命中率, 待 8 月提升到 90%+ |
| **(c)** | pSEO 阶段 1 | **26/32 slugs 在 sitemap** (per 7/18 + 7/22 + 7/22 后 M1) | 0 | +∞% | ⚠️ 81% 进度, 剩 6 slug 在 8 月第一周补完 |
| **(d)** | **自然流量来源分布** | **UNMEASURABLE** (无 GSC 数据) | UNMEASURABLE | n/a | ❌ **数据缺失** |
| **(d)** | Bing 分布 | 64 URLs 提交, 数据未出 | 0 | n/a | ⚠️ 已提交待出 |
| **(d)** | IndexNow 真实状态 | **未验证** (key file `public/{KEY}.txt` 仍未创建, INDEXNOW_KEY 未进 .env.production) | n/a | n/a | ❌ **3 周前 P0-2 仍未修** |
| **(e)** | **转化漏斗 UV** | **≈0** (PostHog 未接) | 0 | n/a | ❌ **埋点缺失, ROI 无法判断** |
| **(e)** | 转化漏斗 注册 | **1** (测试账号, 7/22 weekly) | 0 | +1 但不算真实 | ❌ 0 真实注册 |
| **(e)** | 转化漏斗 定价页 | **个位数** (自查, 无埋点) | 0 | n/a | ❌ 埋点缺失 |
| **(e)** | 转化漏斗 发起结账 | **0** | 0 | = | n/a |
| **(e)** | 转化漏斗 付费 | **0** (PayPal live 已切, 待唐总真人首单 $5.49) | 0 | = | ❌ **首单待真人验证** |
| **(f)** | **联盟首单 (Day 60 后)** | **N/A** (7/3 launch, Day 60 = 9/1, 8/1 仍 Day 29) | n/a | n/a | ⏳ 未到时间窗 |

**判定汇总**:
- **生产链路** ✅ 健康: 16 daily + 26 pSEO = 42 slugs (336 URLs sitemap) 在 31 天内上线, 节奏快
- **流量** ❌ UNMEASURABLE: GSC 0 记录, 真实自然流量约 0, 主指标完全测不出
- **战略切换** 🟠 7/22 从"daily 节奏" 切到 "M1 pSEO 32 页", 数据层 blog-posts.ts 被重写, 16 daily 全部从 blog-posts.ts 消失 (git history 还在)
- **断档** 🔴 7/23-7/31 共 9 天零 verify 报告
- **转化漏斗** ❌ PostHog 未接, 全部数据缺失, ROI 无法判断
- **联盟首单** ⏳ 未到 Day 60, 暂不判定

**月环比字面**: 0% → 0% = **0%**, 形式上属于"平稳"区间 (0~20%)。
**月环比实质**: UNMEASURABLE → 0% 是"形式"而非"实际"。**实际是"未启动"不是"平稳"**, 流量为零, 但**也不算衰退** (因为没起过)。

→ **不触发"连续 2 月衰退" 升级条件**, 但**触发"主指标 UNMEASURABLE 2 个月" 升级条件** (因为 GSC 整个 7 月仍未配, 跟 6 月一样 UNMEASURABLE)。

---

## 2. 关键词 5 层金字塔调整

> **5 层金字塔 (per 7/5 weekly 建议的 7/6-7/12 预排, 但实际执行 7/22 后切到 M1 pSEO 路径)**

### 2.1 当前覆盖状态 (按 7 月末 sitemap 42 slugs 倒推)

```
PILLAR             KEYWORDS                                                  COVERAGE      POSTS
────────────────────────────────────────────────────────────────────────────────────────────────
功能支柱           daily-check-in, dream-wall, time-capsules, shared-      弱 (3)        only 3 feature deep-dives
                   journal, private-community (6 features → 3 written)
品牌锚点           togthr-story, always-here, companion-app, virtual-pet  强 (8+)       #1 + #3 + 多 pSEO 互链
关系场景           long-distance, couples, relationship-rituals, daily-    强 (12+)      #1 #2 #5 #6 #8 + 多 pSEO
                   rituals, togthr-tips
情绪/陪伴          emotional-design, pet-loss-grief, post-breakup, late-    强 (10+)      #4 #6 #7 #8 #10 #12
                   night, ordinary-middle
转化支柱           togthr-plus, pricing, paywall, subscription              弱 (0)        ⚠️ 0 dedicated 转化文
                   ⚠️ 0 dedicated post, 仅 footer CTA
信任支柱           privacy, data-security, encryption, data-export         弱 (0)        ⚠️ 0 dedicated 信任文
pSEO 阶段 1        tamagotchi-*, virtual-pet-*, desktop-pet-*, pixel-pet-*,  强 (26/32)    M1 阶段 1 启动
                   study-focus-*, couples-app-*, long-distance-*, togthr-vs-*
意图捕获           how-to, tutorial, guide                                  弱 (1)        only 1 how-to 类
季节性             summer-2026, halloween-2026                              弱 (1)        halloween-virtual-pet-guide
```

### 2.2 5 层金字塔 8 月调整建议

| 层级 | 当前状态 | 8 月调整 | 优先级 |
|------|---------|---------|-------|
| **L1 品牌锚点** | 强 (8+ posts) | 维持, 1 篇/月 brand refresh | LOW |
| **L2 功能支柱** | 弱 (3/6 features) | 8 月补齐剩余 3 features (shared-journal, private-community, daily-check-in deep-dive 二版) | **HIGH** |
| **L3 关系场景** | 强 (12+ posts) | 维持, 1 篇/周 evergreen 补充 | MEDIUM |
| **L4 转化支柱** | 弱 (0 dedicated) | **8 月必须补 1-2 篇** (togthr-plus 详解 / 性价比对比) | **HIGH** |
| **L4 信任支柱** | 弱 (0 dedicated) | **8 月必须补 1 篇** (How Togthr protects your data) | **HIGH** |
| **L5 pSEO 长尾** | 强 (26/32) | 8 月第一周补完剩余 6 slugs 完成 32 页, 然后进 M2 阶段 (40 页) | **HIGH** |
| **L5 意图捕获** | 弱 (1 how-to) | 8 月加 2-3 篇 how-to (How to set up daily check-in / How to share dream wall) | MEDIUM |
| **L5 季节性** | 弱 (1) | 8 月加 2 篇 (back-to-school / late-summer) | LOW |

### 2.3 标签合并 / 冲突建议

- `companion-app` 出现在几乎所有 post, **保留但避免刷屏** (Google 可能降权)
- `virtual-pet` 是核心 tag, pSEO 阶段 1 重度使用 → **建议 tag 分层**: `virtual-pet` (umbrella) + `desktop-pet` / `pixel-pet` / `tamagotchi-*` (子分类)
- `togthr-vs-*` 4 篇 (vs widgetable, vs replika, 未来 vs character-ai / vs chai) → **形成"对比系列" 品牌资产**
- `long-distance` 重度使用, 建议 8 月加 `long-distance-summer` 季节性子分类
- `tamagotchi-*` 4 篇 pSEO 已形成"tamagotchi 2026 复兴" 系列, **8 月可加 tamagotchi-for-students / tamagotchi-for-seniors 扩列**

### 2.4 关键词缺口 (8 月应优先覆盖)

| 缺口 | 缺失关键词 | 8 月建议 | 优先级 |
|------|----------|---------|-------|
| **转化支柱 0 覆盖** | togthr-plus, pricing, paywall, subscription, premium-features | 8/4 (Mon) 写 1 篇 "Togthr Plus 是什么, 为什么我们做了付费档" | **P0** |
| **信任支柱 0 覆盖** | privacy, data-security, encryption, data-export | 8/6 (Wed) 写 1 篇 "How Togthr protects your data — and what we never collect" | **P0** |
| **功能支柱 3/6** | shared-journal, private-community, daily-check-in (deep-dive v2) | 8/11, 8/13, 8/15 各 1 篇 | **P0** |
| **pSEO M1 补完** | 6 剩余 slugs (desk-pet-for-*, pixel-pet-widget, pixel-buddy-for-study-sessions, lonely-desk-companion, daily-check-in-app-for-couples, couples-app-comparison) | 8/1-8/7 一周内补完, 完成 32 页 pSEO 阶段 1 | **P0** |
| **对比系列扩列** | togthr-vs-character-ai, togthr-vs-chai, togthr-vs-pi | 8 月加 1-2 篇对比 | MEDIUM |
| **意图捕获 how-to** | how-to-set-up-daily-check-in, how-to-share-dream-wall, how-to-write-time-capsule | 8/18, 8/20, 8/22 各 1 篇 | MEDIUM |
| **季节性 8 月** | back-to-school-2026, late-summer-ritual, long-distance-august | 8 月加 1-2 篇 | LOW |

---

## 3. 内容策略调整

### 3.1 7 月实际内容矩阵 (按周)

| 周 | 区间 | daily posts | pSEO posts | 总 | 备注 |
|----|------|------------|------------|---|------|
| **W1** | 7/3-7/5 (pre-launch + launch) | 3 (7/3 manual + 7/4 cron + 7/5 cron) | 0 | 3 | launch week, 100% |
| **W2** | 7/6-7/12 | 7 (7/6-7/11 各 1 + 7/12 missed) | 0 | 7 | 6/7 = 86% |
| **W3** | 7/13-7/19 | 4 (7/13 + 7/14 + 7/15 + 7/16 + 7/18 M1 batch 3 篇 = 7 个 slug, 但 7/17 + 7/19 missed) | 3 (7/18 M1 batch) | 7 | 5/7 = 71%, 7/18 三篇 M1 batch 是阶段 1 启动 |
| **W4** | 7/20-7/22 | 1 (7/20 pass + 7/21 broken + 7/22 skip) | 4 (7/22 M1 stage 1 batch) | 5 | 1/3 daily = 33%, 战略切换点 |
| **W5** | 7/23-7/31 | **0** (cron 整个停摆 9 天) | **19** (M1 阶段 1 续, 从 sitemap 倒推) | 19 | 🔴 cron 静默, 19 pSEO 续上线但无 verify |
| **合计** | 31 天 | **15 daily + 1 broken** = 16 slugs, 实际可访问 15 (8 locale × 15 = 120 URLs) | **26 pSEO slugs** (8 locale × 26 = 208 URLs, 但 live 状态 unknown) | **42 slugs × 8 = 336 sitemap URLs** | |

### 3.2 战略切换: 7/22 前后对比

| 维度 | 7/22 之前 (daily 节奏) | 7/22 之后 (M1 pSEO 阶段 1) |
|------|---------------------|--------------------------|
| 节奏 | 1 篇/day × 8 locale | 批量 3-4 篇/day, 一次性 8 locale |
| 主题 | evergreen 情感 + 关系 (L3) | 关键词长尾 (L5 pSEO + 行业卡位) |
| 来源 | trending collector → 失败就 evergreen pool | M3 阶段 1 指令包预排 |
| 数据层 | blog-posts.ts 16 dailyPosts entries | blog-posts.ts 被重写, 只剩 4 pSEO entries (M1-A/B/C/D) |
| 转化导向 | 弱 (情感导向, 无 CTA) | 强 (含 "vs 竞品" 对比, 转化意图明确) |
| SEO 效果预期 | 长尾 + 品牌锚点 (3-6 月见效) | 短尾 + 行业卡位 (1-3 月见效) |
| 风险 | trending collector 死了 18 天 | OpenNext dispatch bug 风险 (7/21 教训) |

**关键判断**: 战略切换是**正确的** (SEO 实战中, 批量 pSEO 阶段 1 是"先铺管道再注水" 的标准做法), 但**执行质量有问题**:
1. 切换点 (7/22) 正好撞上 7/21 dispatch bug, 节奏被打乱
2. blog-posts.ts 重写后, 7/22 之前的 16 daily 全从数据层消失 (虽然 git history 还在, 但 sitemap 仍然包含 42 slugs - 见 3.3)
3. 7/22 之后 9 天零 verify, 风险累积

### 3.3 sitemap vs blog-posts.ts 实际差异

**事实**: sitemap-0.xml 当前含 **42 unique slugs × 8 locale = 336 URLs** (lastmod 全 2026-07), 但 `src/lib/blog-posts.ts` 当前只剩 **4 unique slugs × 8 locale = 32 entries** (tamagotchi-30th-anniversary, tamagotchi-alternative-for-adults, togthr-vs-widgetable, togthr-vs-replika)。

**解释**:
- 7/22 之后有人 (M3) 重写了 `blog-posts.ts`, 删除了 16 daily entries, 只保留 4 pSEO entries 作为"M1 阶段 1 启动" 的最小集
- 但 sitemap 仍然包含全部 42 slugs, 意味着:
  - 16 daily + 38 pSEO 这 54 个 slugs 中, 38 个 pSEO + 4 个 daily (pSEO 类) 仍**可能在 sitemap 中以独立 page.tsx 文件存在** (但没注册到 blog-posts.ts)
  - **风险**: 16 daily 的 page.tsx 文件可能**仍存在** (git history 保留), 但 blog-posts.ts 不引用 → 用户从首页 / blog 列表页看不到这些 daily → SEO 内链断
  - **风险**: 38 个 sitemap URL (19 pSEO slugs) **live 状态 unknown** (7/22 后无 verify)

**8 月必须做**:
1. 重新核对 blog-posts.ts vs sitemap 的 42 slugs, **把已存在的 page.tsx 全部注册到 blog-posts.ts** (不要只 4 个)
2. **6/32 剩余 pSEO slugs 必须在 8/1-8/7 补完**, 完成 M1 阶段 1 目标
3. 7/22 后的 19 pSEO slugs **必须逐一 curl verify 200**, 确认真 live, 不能信任 sitemap 列表

### 3.4 cron 链 9 天断档原因分析

**事实**: 7/22 02:05 monitor cron self-delete 后, 7/23 ~ 7/31 共 9 天**零 verify 报告**, 零 status report, 零 weekly report。

**可能原因** (按可能性排序):
1. **7/30-7/31 全部精力被 zprintpro 88fd338 拉走** (per memory: 7/30 12:19 88fd338 commit → 7/31 10:36 K3 紧急升级 → 7/31 10:38 才修完) — 这是 9 天断档的主要占用方
2. **mavis / hermes daemon 静默** (per memory: 7/22-7/31 有多次 daemon 重启 / session archived, 导致 cron 触发了但 session 找不到目标)
3. **cron prompt 太大 / GBK 编码问题** (per memory: mavis cron prompt CLI ~5800 char buffer 限制 + GBK 编码问题, togthr 多个 cron prompt 已超阈值)
4. **7/21 dispatch bug 没人修, 7/23 cron 触发后看到 7/22 报告 BLOCKER 状态, 自动退出 / 静默**

**8 月必须做**:
- 7/31 修完 zprintpro 88fd338 后, **第一件事是恢复 togthr cron 链**: 检查 4 条 togthr cron 状态 (daily-content / daily-trending / weekly-review / monthly-strategy-review), 触发 self-heal test, 确保 8/1-8/7 准点
- 7/21 dispatch bug **必须在本周 (8/1-8/3) 修**, 否则 8 月 daily 节奏又会卡死
- mavis cron prompt 全部改用 HTTP API PATCH 写入 (per memory §5), 避免 CLI buffer + GBK 编码问题

---

## 4. 推广预算重分配建议

### 4.1 7 月实际投入 (估算, 仅供参考)

| 项目 | 投入 | 实际产出 | ROI |
|------|------|---------|-----|
| **cron 自动 daily content** (W1-W4 16 篇 + W5 0) | Mavis 0 成本 (auto) | 16 daily × 8 locale = 128 URLs (120 可访问) | 0 UV, ROI UNMEASURABLE |
| **M1 阶段 1 pSEO 32 页** (M3 阶段 1 指令包) | M3 投入 (TBD) | 26/32 slugs × 8 = 208 URLs (live unknown) | 0 UV, ROI UNMEASURABLE |
| **OG image 修** (per 7/5 weekly P1-1) | 0 (未启动) | 仍 0 og:image, 全 404 | 0 分享视觉 |
| **GSC + IndexNow 配置** (per 7/5 weekly P0-1/P0-2) | 0 (未启动) | GSC 仍未配, IndexNow 仍未配 | **0 流量入口** ← **这是 7 月最大失误** |
| **PostHog 漏斗埋点** (per 7/22 weekly P-2) | 0 (未启动) | UV/注册/付费全不可测 | ROI 无法判断 |
| **Reddit 双号养号** (per 7/22 weekly 下周 3 件事 #3) | 14 天养号期 | 未启动 (7/22 weekly 标 [ ]) | 0 引流 |
| **联盟 BD** (5 平台) | 0 (per memory 8/1 K3 凭证表) | 5 active + 4 pending + 2 closed + 1 waitlist | 0 联盟首单 (Day 60 未到) |
| **唐总真人首单 $5.49** (per 7/22 weekly 异常 #1) | 0 (待唐总下) | 0 付费 | **首单未验证** |
| **总计** | Mavis auto + M3 阶段 1 + 唐总 5 分钟 (3 周挂账) | 16 daily + 26 pSEO + 0 收入 | **整体 0 UV / 0 收入** |

### 4.2 8 月预算重分配建议

| 类别 | 7 月配比 | 8 月建议配比 | 理由 |
|------|---------|------------|------|
| **基础设施补漏 (GSC + IndexNow + PostHog)** | 0% (3 周挂账) | **40%** | 这是 7 月最大失误, 8 月再不补, 9 月真要触发战略重审 |
| **pSEO 阶段 1 补完 (6/32 剩余)** | 20% (26/32) | **10%** (6/32 1 周内补完) | 阶段 1 收尾, 然后进 M2 |
| **pSEO 阶段 2 启动 (40 页)** | 0% | **15%** | M1 完成后立即启动 M2, 保持节奏 |
| **转化支柱 + 信任支柱 (4 篇)** | 0% | **15%** (4 篇/8 月) | 7 月 0 覆盖, 8 月必须补 |
| **功能支柱补完 (3 features)** | 0% | **10%** (3 篇/8 月) | 7 月只写 3/6, 8 月补完 |
| **how-to 意图捕获 (2-3 篇)** | 0% | **5%** (2-3 篇) | 补 8 月 how-to 缺口 |
| **唐总真人首单验证** | 0% (挂账 3 周) | **5%** (1 单 5 分钟) | 这是 $3000/月目标的第一块钱, 必须验证管道 |
| **Reddit 14 天养号 + 引流** | 0% (7/22 排期 [ ]) | **0% 养号, 8/15 启动发帖** | M3 末 Reddit 引流承担 40% UV 目标, 8 月下旬启动 |
| **总计** | 20% (仅 M3 阶段 1) | **100%** | 8 月必须把基础设施补全 + 战略切换真正落地 |

### 4.3 8 月解冻触发器 (per 7/22 weekly § ⑤)

| 触发器 | 当前状态 (7/31) | 8 月目标 | 触发后动作 |
|-------|----------------|---------|-----------|
| GSC 自然曝光 2 周 > 500/周 | ≈0/周 | **8 月底达 100+/周** | 解冻: K3 重投入 + Reddit 引流启动 |
| 第一个自然流量付费用户 | 未出现 | **8 月底 1+ 付费** | 解冻: 战略级扩张 (M2 60 页 + 联盟正式投流) |
| tamagotchi-app-2026 进 Google 前 20 | 未上榜 (3 天) | **8 月底前 50** | 解冻: pSEO 阶段 2 启动 |
| 7/21 dispatch bug 修完 | 未修 | **8/3 前修完** | 解冻: 8 月 daily 节奏恢复 |
| GSC + IndexNow + PostHog 三件套配齐 | 0/3 | **8/7 前配齐** | 解冻: 8/8 起可正常判读 KPI |
| 唐总真人首单 | 0 | **8/7 前下 $5.49** | 解冻: 验证支付管道真活 |

---

## 5. 下月 30 篇选题规划 (2026-08-01 ~ 2026-08-31)

> **排题逻辑**: (1) 8/1-8/7 紧急补基础设施 + 7/21 bug + 6/32 pSEO (2) 8/8-8/14 补转化/信任支柱 (3) 8/15-8/22 M1 收尾 + how-to (4) 8/23-8/31 M2 阶段 2 启动 (5) 每周 daily 1 篇 + 每周 pSEO 2-3 篇, 平衡节奏

### 5.1 Week 1 (8/1 Fri - 8/7 Thu): **紧急止血 + 基础设施**

> **目标**: 修 7/21 dispatch bug + 配 GSC/IndexNow/PostHog + 补完 6/32 剩余 pSEO + 1 篇 daily
> **配比**: 50% 紧急止血 + 30% pSEO + 20% daily

| Day | Date | 类型 | 选题 | Slug 候选 | Tag | Pillar | 责任方 |
|-----|------|------|------|----------|-----|--------|------|
| **Fri** | 8/1 | **紧急** | 7/21 dispatch bug 修 + GSC 注册 + IndexNow key 创建 | (无, ops) | n/a | n/a | Mavis + user |
| **Sat** | 8/2 | pSEO M1 续 | daily-check-in-app-for-couples | `daily-check-in-app-for-couples` | daily-check-in, couples, pSEO | L5 pSEO | M3 |
| **Sun** | 8/3 | pSEO M1 续 | couples-app-comparison | `couples-app-comparison` | couples, comparison, pSEO | L5 pSEO | M3 |
| **Mon** | 8/4 | **daily** | Togthr Plus 详解: "Togthr Plus 是什么, 为什么我们做了付费档" | `what-is-togthr-plus` | togthr-plus, pricing, paywall, premium-features | L4 转化 | Mavis (cron) |
| **Tue** | 8/5 | pSEO M1 续 | desk-pet-for-coders (last 4 of 32) | `desk-pet-for-coders` | desk-pet, coders, productivity, pSEO | L5 pSEO | M3 |
| **Wed** | 8/6 | **daily** | 信任支柱: "How Togthr protects your data — and what we never collect" | `how-togthr-protects-your-data` | privacy, data-security, encryption, trust | L4 信任 | Mavis (cron) |
| **Thu** | 8/7 | pSEO M1 收尾 | lonely-desk-companion (last 1 of 32, M1 完成) | `lonely-desk-companion` | desk-pet, lonely, solo, pSEO | L5 pSEO | M3 |

**Week 1 关键 deliverable**:
- 7/21 dispatch bug 修完 (8/1-8/3 内)
- GSC + IndexNow + PostHog 三件套配齐 (8/1-8/7 内)
- M1 阶段 1 32 页完成 (8/7)
- 唐总真人首单 $5.49 (8/1-8/7 内, 1 单 5 分钟)

### 5.2 Week 2 (8/8 Fri - 8/14 Thu): **转化 + 信任 + 功能支柱**

> **目标**: 转化支柱 1 篇 + 信任支柱 1 篇 (8/4 + 8/6 已发, 8/8-8/14 巩固) + 功能支柱 3 篇 (shared-journal / private-community / daily-check-in v2)
> **配比**: 40% 支柱补缺 + 30% daily + 30% pSEO M2 预热

| Day | Date | 类型 | 选题 | Slug 候选 | Tag | Pillar | 责任方 |
|-----|------|------|------|----------|-----|--------|------|
| **Fri** | 8/8 | **daily** | daily-check-in v2: "5 秒打卡, 比 5 分钟聊天更持久" | `five-second-daily-check-in-beats-long-chats` | daily-check-in, togthr-tips, micro-habits | L2 功能 | Mavis (cron) |
| **Sat** | 8/9 | **daily** | 转化加固: "Togthr Plus vs 免费档 — 你该选哪个" | `togthr-plus-vs-free-which-one` | togthr-plus, comparison, conversion | L4 转化 | Mavis (cron) |
| **Sun** | 8/10 | **daily** | shared-journal 功能深挖: "你和伴侣的共享日记, AI 不会看到" | `shared-journal-ai-cant-see` | shared-journal, privacy, togthr-tips | L2 功能 | Mavis (cron) |
| **Mon** | 8/11 | **daily** | private-community 功能深挖: "为什么我们做了 50 人封闭社区" | `why-we-built-50-person-private-community` | private-community, safety, togthr-tips | L2 功能 | Mavis (cron) |
| **Tue** | 8/12 | pSEO M2 启动 #1 | togthr-vs-character-ai | `togthr-vs-character-ai` | togthr-vs, character-ai, comparison, pSEO | L5 pSEO | M3 |
| **Wed** | 8/13 | pSEO M2 #2 | togthr-vs-chai | `togthr-vs-chai` | togthr-vs, chai, comparison, pSEO | L5 pSEO | M3 |
| **Thu** | 8/14 | **daily** | 周回顾 hub: "Togthr 一周: 5 个功能 + 5 个故事" (SEO 内链枢纽) | `weekly-togthr-roundup-august-14` | weekly-roundup, togthr-update | L3 互动 | Mavis (cron) |

### 5.3 Week 3 (8/15 Fri - 8/21 Thu): **M2 阶段 2 启动 + how-to 意图捕获 + Reddit 养号结束**

> **目标**: M2 阶段 2 40 页第一周 8 篇 + how-to 3 篇 + Reddit 引流启动 (养号 14 天结束)
> **配比**: 50% M2 pSEO + 30% how-to + 20% daily

| Day | Date | 类型 | 选题 | Slug 候选 | Tag | Pillar | 责任方 |
|-----|------|------|------|----------|-----|--------|------|
| **Fri** | 8/15 | pSEO M2 #3 | ai-companion-app-no-romance | `ai-companion-app-no-romance` | ai-companion, no-romance, pSEO | L5 pSEO | M3 |
| **Sat** | 8/16 | pSEO M2 #4 | virtual-girlfriend-app-alternative | `virtual-girlfriend-app-alternative` | virtual-girlfriend, alternative, pSEO | L5 pSEO | M3 |
| **Sun** | 8/17 | pSEO M2 #5 | mental-health-app-with-virtual-pet | `mental-health-app-with-virtual-pet` | mental-health, virtual-pet, pSEO | L5 pSEO | M3 |
| **Mon** | 8/18 | **how-to** | How to set up daily check-in (3-step guide) | `how-to-set-up-daily-check-in` | how-to, daily-check-in, tutorial | L5 意图 | Mavis (cron) |
| **Tue** | 8/19 | pSEO M2 #6 | desktop-companion-app-2026 | `desktop-companion-app-2026` | desktop-companion, 2026, pSEO | L5 pSEO | M3 |
| **Wed** | 8/20 | **how-to** | How to share dream wall with partner | `how-to-share-dream-wall-with-partner` | how-to, dream-wall, tutorial | L5 意图 | Mavis (cron) |
| **Thu** | 8/21 | pSEO M2 #7 | study-companion-app-college | `study-companion-app-college` | study-companion, college, pSEO | L5 pSEO | M3 |

**Week 3 关键 deliverable**:
- M2 阶段 2 8 篇完成 (8/15-8/21)
- Reddit 14 天养号结束 (8/15), 8/16 起开始发帖 (2 帖/周, 不超 5 帖/周)
- 7/22 报告 5 项 8/1 收尾行动: Picjam + GreenOnion 真数据补 / 2 凭证 1Password 备份 (per memory 8/1 K3 凭证表)

### 5.4 Week 4 (8/22 Fri - 8/28 Thu): **M2 续 + 时间胶囊 + 8 月回顾**

> **目标**: M2 续 8 篇 + time-capsules 功能深挖 + 8 月 weekly review
> **配比**: 50% M2 pSEO + 30% 功能 + 20% daily

| Day | Date | 类型 | 选题 | Slug 候选 | Tag | Pillar | 责任方 |
|-----|------|------|------|----------|-----|--------|------|
| **Fri** | 8/22 | **how-to** | How to write a time capsule (给 90 天后的伴侣) | `how-to-write-a-time-capsule` | how-to, time-capsules, tutorial | L5 意图 | Mavis (cron) |
| **Sat** | 8/23 | pSEO M2 #8 | pixel-companion-app-windows | `pixel-companion-app-windows` | pixel-companion, windows, pSEO | L5 pSEO | M3 |
| **Sun** | 8/24 | pSEO M2 #9 | desktop-pet-for-anxiety | `desktop-pet-for-anxiety` | desktop-pet, anxiety, mental-health, pSEO | L5 pSEO | M3 |
| **Mon** | 8/25 | **daily** | time-capsules 功能深挖: "给 90 天后的伴侣写一封信" | `time-capsules-letters-to-future-us-v2` | time-capsules, ritual, long-distance | L2 功能 | Mavis (cron) |
| **Tue** | 8/26 | pSEO M2 #10 | couple-game-app-long-distance | `couple-game-app-long-distance` | couple-game, long-distance, pSEO | L5 pSEO | M3 |
| **Wed** | 8/27 | pSEO M2 #11 | focus-app-with-pet | `focus-app-with-pet` | focus, pet, productivity, pSEO | L5 pSEO | M3 |
| **Thu** | 8/28 | pSEO M2 #12 | virtual-pet-for-seniors | `virtual-pet-for-seniors` | virtual-pet, seniors, pSEO | L5 pSEO | M3 |

### 5.5 Week 5 (8/29 Fri - 8/31 Sun): **8 月收尾 + 9 月规划**

> **目标**: M2 收尾 + 8 月 weekly review + 9 月战略规划
> **配比**: 60% M2 收尾 + 40% 战略规划

| Day | Date | 类型 | 选题 | Slug 候选 | Tag | Pillar | 责任方 |
|-----|------|------|------|----------|-----|--------|------|
| **Fri** | 8/29 | pSEO M2 #13 | ai-companion-no-filter | `ai-companion-no-filter` | ai-companion, no-filter, pSEO | L5 pSEO | M3 |
| **Sat** | 8/30 | pSEO M2 #14 | quiet-companion-app-no-chat | `quiet-companion-app-no-chat` | quiet-companion, no-chat, pSEO | L5 pSEO | M3 |
| **Sun** | 8/31 | **战略** | 8 月月度回顾 + 9 月 30 篇预排 (触发 9/1 monthly cron) | `monthly-2026-09-strategy-preview` | monthly, strategy | L1 品牌 | Mavis (monthly cron) |

### 5.6 8 月总量盘点

| 类型 | 8 月目标 | 占比 | 备注 |
|------|---------|------|------|
| **基础设施补漏 (GSC/IndexNow/PostHog)** | 3 件 | n/a | 周 1 完成, 不计入内容数 |
| **pSEO M1 补完** | 4 篇 | 13% | 8/2-8/7 补完 6 剩余中的 4 (实际剩 6, 8/5 1 篇 + 8/7 1 篇) |
| **pSEO M2 阶段 2** | 14 篇 (M2 #1-#14) | 47% | 8/12-8/30, 14 篇覆盖 L5 pSEO + 对比 + 行业卡位 |
| **功能支柱** | 4 篇 (含 v2 + 1 补) | 13% | daily-check-in v2 / shared-journal / private-community / time-capsules v2 |
| **转化支柱** | 2 篇 | 7% | what-is-togthr-plus + togthr-plus-vs-free |
| **信任支柱** | 1 篇 | 3% | how-togthr-protects-your-data |
| **how-to 意图捕获** | 3 篇 | 10% | daily-check-in / dream-wall / time-capsule |
| **weekly hub + monthly preview** | 2 篇 | 7% | 8/14 weekly + 8/31 monthly preview |
| **总计** | **30 篇** | 100% | 8 月内容目标 (实际可能 ±2, 30-32 篇) |

---

## 6. 风险清单 + 8 月升级条件

### 🔴 P0 - 8 月必须解决 (否则 9 月触发战略重审)

1. **7/21 dispatch bug 仍未修** (per 7/22 BLOCKER 报告) — 7/22 之后 9 天零 verify, 无法 100% 确认 7/22 后 pSEO 32 页真 live。**8/3 前必须修完**
2. **GSC 仍未配** (per 7/5 weekly P0-1) — 7/3 launch 至今 60 天未配, 主指标 UNMEASURABLE 2 个月。**8/1-8/3 内必须配**
3. **IndexNow key file 仍未建** (per 7/5 weekly P0-2) — 7/22 之后完全没修, 即使 GSC 配了 IndexNow 仍 403。**8/3 前必须建**
4. **PostHog 漏斗埋点仍未接** (per 7/22 weekly 异常 #2) — UV/注册/付费全无数据, ROI 无法判断。**8/7 前必须接**
5. **唐总真人首单仍未下** (per 7/22 weekly 异常 #1) — $5.49 挂了 10+ 天, 支付管道未真实验证。**8/7 前必须下**

### 🟠 P1 - 8 月底前完成

6. **cron 链 9 天断档需根因定位** — 8/1-8/3 必查 4 条 togthr cron 状态, 修 daemon / 改 HTTP API
7. **blog-posts.ts vs sitemap 42 slugs 不一致** — 8/3 前重新核对, 把已存在的 page.tsx 全部注册
8. **og:image 32 个全 404** (per 7/5 weekly P1-1) — 7/18 batch 3 篇报告里说 og:image wired, 但其他 39 slug 待 verify
9. **M1 阶段 1 6 剩余 slugs 补完** — 8/7 前必须补完, 完成 32 页目标
10. **M2 阶段 2 40 页规划** — 8 月启动 14 篇 (占 M2 35%), 9 月续 26 篇

### 🟡 P2 - 8 月底观察

11. **7/22 weekly 提到的 trending collector 死 18 天** (per 7/22 BLOCKER §5) — 重启 cron + 修 API + backfill
12. **pSEO M2 14 篇真 live 状态验证** — 8 月底必须逐一 curl verify, 不能信任 sitemap
13. **og:image 自动化** (per 7/5 weekly P1-1) — 8 月加 AI image generation step
14. **博客正文 fallback 仍有风险** (per 7/5 weekly P1-2) — 7/7 教训 "4 天 metadata-only posts" 风险未根除
15. **Reddit 双号养号 + 引流启动** (per 7/22 weekly) — 8/15 养号结束, 8/16 启动发帖

### 📈 9 月战略重审触发条件 (per spec "连续 2 月衰退")

> **注**: 7 月是"未启动" 不是"衰退", 但如果 8 月底以下条件全 fail, 9 月必须战略重审:

| 触发条件 | 8 月底目标 | 9 月重审动作 |
|---------|-----------|------------|
| GSC 自然流量 | 100+ UV/周 | < 100 → 战略重审, 真金白银做 SEO vs 砍掉做别的 |
| 真实付费用户 (非唐总测试单) | 1+ | = 0 → 战略重审, $3000/月目标不可达 |
| 转化漏斗数据 (PostHog) | 全链可测 | 仍 UNMEASURABLE → ROI 不可判, 战略重审 |
| 联盟首单 (Day 60+) | 1+ (per memory 8/1 K3 凭证表 5 active 平台) | = 0 → 联盟渠道失效, 战略重审 |
| M2 阶段 2 40 页 | 完成 35+ | < 25 → 节奏崩塌, 战略重审 |
| 月环比 8/7 → 8/14 → 8/21 → 8/28 趋势 | 持续上升 | 持平 / 下降 → 触发"连续 2 月衰退" 升级 |

---

## 7. 总结

**VERDICT: 🟡 UNMEASURABLE (主指标缺失) + 🟠 战略切换 + 🔴 9 天断档** — 7 月是"基础设施 + 战略 + 链断" 三重叠加, 不是"流量增长" 月。

| 维度 | 7 月状态 | 趋势 | 8 月必须 |
|------|---------|------|---------|
| 内容生产 | ✅ 16 daily + 26 pSEO = 42 slugs × 8 = 336 URLs | ↑ 战略切换 | M2 启动 + 支柱补缺 |
| 部署链路 | ⚠️ 7/21 dispatch bug + 9 天断档 | 🔴 风险累积 | 8/3 前全修 |
| 多地理验证 | ✅ 8/8 locale 200 (除 7/21 broken) | ↑ 自愈 | 维持 |
| 自进化闭环 | 🔴 cron 7/22 后断 9 天 | 🔴 退化 | 8/1-8/3 恢复 |
| GSC 收录 | ❌ UNMEASURABLE 2 个月 | = 数据缺失 | 8/1-8/3 配齐 |
| 自然流量 | ❌ UNMEASURABLE | = 未启动 | 8 月底 100+ UV/周 |
| IndexNow 真实状态 | ❌ 状态未确认 2 个月 | = 未知 | 8/3 前 key file 修 |
| og:image | ⚠️ 7/18 batch 3 篇 wired, 其他 39 slug 待 verify | n/a | 8 月底前全 verify |
| 博客正文 | ✅ 7/13 后 0/8 fallback | ↑ 关键改善 | 维持 |
| WoW 主判定 | ❌ BLOCKED (GSC 缺失) | = 持续 BLOCKED | 8 月必须解锁 |
| 月环比 | 0% 形式"平稳" 实质 UNMEASURABLE | n/a | 8 月底首次可测 |
| 转化漏斗 | ❌ PostHog 未接, 全 UNMEASURABLE | = 持续 | 8/7 前接 |
| 联盟首单 | ⏳ Day 29 (Day 60 = 9/1) | n/a | 9/1 后判定 |

**优先级建议** (8 月第一周):
1. **8/1-8/3 (user + Mavis 协作)**: 修 7/21 dispatch bug + 配 GSC + 配 IndexNow key + 恢复 cron 链
2. **8/1-8/7 (user 5 分钟)**: 配 PostHog + 唐总真人下首单 $5.49
3. **8/2-8/7 (M3)**: 补完 M1 阶段 1 6 剩余 slugs
4. **8/8-8/31 (Mavis cron)**: 按 §5 30 篇预排执行
5. **8/15-8/31 (M3 + Mavis)**: M2 阶段 2 启动 + Reddit 引流启动
6. **8/31 (monthly cron)**: 8 月月度回顾, 首次可基于 GSC 真实数据判读

---

**Togthr Monthly Strategy Review 2026-08-01 done. Verdict: 🟡 UNMEASURABLE + 🟠 战略切换 + 🔴 9 天断档.**
**TTL: 60 days (expire 2026-09-30).**
**Next review: 2026-09-01 (cron schedule `0 10 1 * *` Asia/Shanghai) — 8 月底真实数据出炉, 判定"9 月战略重审" 是否触发.**
