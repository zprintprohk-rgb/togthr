# MEMORY.md — Durable Preferences & Lessons

## 交付物规则

- **完整自包含交付**：交付 prompt、文档、方案时，必须是一次性可直接 paste 使用的完整版本——不分段、不引用"见上版"、不依赖上下文才能理解。收到交付物的人应该能直接用，不需要翻聊天记录。

## 烟雾检查 / 字符串匹配陷阱

- **检查"无某 locale"禁用 includes()**：在 llms.txt、hreflang 标签等 HTML/文本内容中判断"不包含 pt 等 locale 代码"时，**绝对不能用 `includes('pt')`**。短 locale 代码会误匹配 `https`、`script`、`accept`、`description`、`javascript`、`prompt` 等常见字符串。正确做法是用正则词边界 `\bpt\b` 或 `(?:^|\s|,)pt(?:$|\s|,)` 做精确匹配。

## Togthr SEO URL 规范

- **Canonical 域名是 `www.togthr.life`**：所有 SEO 相关 URL（canonical、hreflang、og:url、sitemap）必须使用 `https://www.togthr.life`（带 www），不是 `https://togthr.life`（裸域）。裸域会 301 跳转到 www，Google 会把两者当不同站点导致 hreflang 完全失效。
- **Hreflang href 必须包含 locale 路径段**：例如 `https://www.togthr.life/en/blog/xxx`，不能是 `https://www.togthr.life/blog/xxx`。缺 locale 段会导致 Google 无法正确匹配语言版本，hreflang 标签形同虚设。

## Togthr 产品定位与 VoC 参考系

- **核心定位**：Togthr 解决的是"守住人"，不是"找到人"。交友/约会 App（Tinder/Bumble/Hinge 等）与 Togthr 痛点完全不同——前者匹配陌生人，后者维护已有关系。竞品分析必须先判断对方属于哪条赛道，只有"守住人"赛道才是真正参照。
- **正确 VoC 信源四类**：① 情侣 App（Paired / Coral / Couple+ / Between / Agape）② 异地恋社区（r/longdistance）③ AI 伴侣舆论场（Replika / Character.AI 研究+评论）④ 电子宠物社区（Tamagotchi / Shimeji / Finch）。去交友网站挖矿会挖错矿。
- **VoC 六问框架**：① 为什么选择这个产品？② 什么让你每天回来？③ 什么时候感觉最依恋？④ 缺什么？⑤ 为什么弃了？⑥ 愿意为什么付钱？——这六问是 Job 5 周报的标准框架。
