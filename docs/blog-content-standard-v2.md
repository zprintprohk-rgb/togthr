# Togthr 双引擎文章规范 v2 (2026-08)

> 升级自 v1（"2000 字纪律"）→ v2（SEO + GEO 双引擎同源内容标准）
> 适用范围：所有 blog 文章（EN 原文 + 8 locale 覆盖页）
> 生效日期：2026-08-05

---

## 一、长度与深度（分型定标）

| 文章类型 | 词数（EN） | 理由 |
|---|---|---|
| 支柱/数据驱动 | 2200-2800 | 撑起 E-E-A-T + AI 权威源引用 |
| 清单/对比 | 1800-2200 | N 条目 × 每条目 150 词+ |
| 借势/历史 | 1500-2000 | 叙事为主，不灌水 |
| **硬下限** | **≥1500** | 低于此 GEO 几乎不引用 |
| **硬上限** | **≤3000** | 超了稀释信息密度，AI 摘要截取率下降 |

**唯一事实密度**：每篇 ≥3 个 Togthr 专属事实（"5 阶段成长""6 隐藏职业皮肤""1/72 隐藏金款""宠物不死""无广告""不聊天的陪伴"）+ ≥2 个外部可验证数字。

---

## 二、结构标准（爬虫 & AI 双解析）

```
1. TL;DR 区块（≤60 词，首屏，独立 <section aria-label="Summary">） ← AI 摘要直接截取
2. H1 = 主关键词 + 情绪钩子
3. 首个 H2 必须是问句形式 + 40-80 词直接回答 ← 命中 PAA/精选摘要/GEO
4. H2/H3 层级 ≤3 层，每 H2 下首段给结论（倒金字塔）
5. 每篇 ≥1 个 Markdown 表格或数据对比表 ← AI 提取率最高格式
6. FAQ 区块（3-5 问，问句=集群关键词自然语言变体）+ FAQPage schema
7. 文末：软 CTA + RelatedLinks 内链 ≥3
8. Article schema（datePublished/dateModified/author=Organization）
```

---

## 三、GEO 专项标准

| 标准 | 说明 |
|---|---|
| llms.txt 联动 | 支柱文章 URL 手动加入 llms.txt "Key pages"（支柱文即更） |
| 可引用句密度 | 每 400 词 ≥1 句"独立可引用断言"（自带主语+数字+结论） |
| 实体一致性 | "5-stage growth" 不写成 "five stages"，全文统一 |
| 8 locale 真翻译 | 保持 per-slug 真内容（0 fallback） |
| 禁 AI 腔 | 不用 "delve/landscape/tapestry" 等 LLM 高频词 |

---

## 四、选题纪律

- 每篇只回答 1 个核心问题 + 3 个 PAA 子问题
- 标题=核心问题关键词化
- 蓝海话题（竞品 0% 覆盖）优先排期

---

## 五、发布自检清单

| 检查项 | 通过标准 |
|---|---|
| 语法闸门 | `check-locale-syntax.js` + `check-no-locale-prefix.js` 全绿 |
| 占位符闸门 | `check-locale-placeholders.js` 通过 |
| brace 检查 | 生成文件不含 `import {{` 或 `type {{` |
| TL;DR 段 | `aria-label="Summary"` 存在且 ≤60 词 |
| 首个 H2 问句 | 以 Why/How/What 开头 |
| 数据表 | ≥1 个 Markdown 表格 |
| FAQ 区块 | 3-5 问句 + FAQPage schema |
| 唯一事实 | ≥3 个 Togthr 机制名/数字（写入时 grep 数） |
| Article schema | datePublished/dateModified/author 完整 |
| 内链 | 文末 RelatedLinks ≥3 |
| 软 CTA | 存在且不硬广（"Start free in your browser"） |
