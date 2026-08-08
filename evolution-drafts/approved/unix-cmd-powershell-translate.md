# Evolution Proposal: 用户手册中的 Unix 命令（tmux/tail）在 Windows PowerShell 下直接执行导致本轮多次报错，沉淀转译规则以避免未来重复踩坑

- Proposal-ID: evo-2026-08-08-unix-cmd-powershell-translate
- Status: approved
- Signature: unix-cmd-powershell-translate
- Created-At: 2026-08-08 20:08
- Last-Seen-At: 2026-08-08 20:08
- Target-File: MEMORY.md
- Trigger-Type: preference
- Confidence: medium

## Why This Matters
- 用户手册中的 Unix 命令（tmux/tail）在 Windows PowerShell 下直接执行导致本轮多次报错，沉淀转译规则以避免未来重复踩坑

## Evidence
- Interactive proposal card was present in the session UI.
- The original pending draft file was unavailable at approval time.
- AutoClaw reconstructed this draft from the proposal payload so the review result can still be recorded.

## Duplicate Check
- Checked: pending draft path + signature/proposal fallback
- Result: original draft file missing
- Decision: create surrogate draft from proposal payload

## Proposed Change
### MEMORY.md：Unix 命令转译规则

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

## 定时任务调度偏好（成本优化）

- **定时任务放在智谱算力低谷段**：7 个 cron 任务（日更博客 18:17 / pSEO 周一、四 18:43 / IndexNow 周二 19:11 / 线上 smoke 周三 19:37 / 竞品监控 周五 20:07 / 周报 周一 20:23 / GEO 自检）全部排在约 18:00-20:30（Asia/Shanghai）的算力低谷窗口以降低成本。以后新增或调整定时任务，同样优先排在该时段。

## 部署验证（生产状态不允许"不明"）

- **部署后必须确认生产状态，不得留"状态不明"收工**：CI 阻断、wrangler Windows 崩溃或本地绕过部署后，必须立即用 `curl -I https://www.togthr.life/en/pet`（期望 200）+ 线上 smoke 验证；验证不了就明确报告"生产状态未知"并列为 P0 继续排查，绝不默认部署成功或中断离开。
- **Windows 标准部署命令**：`npx opennextjs-cloudflare deploy`（绕过 wrangler Windows SIGKILL 已知问题）；部署后验证 `curl -I https://www.togthr.life/en/pet` 应 200，且浏览器检查 F1/F2 组件渲染。

## Windows PowerShell 命令转译（Unix 手册命令不可直接执行）

- **环境是 Windows PowerShell**：用户手册 / 文档里给的 Unix 风格命令（`tmux ls`、`tail -n 5 <file>`、`bash` 等）在本机不能原样执行，直接跑会报错。执行前必须先转译：后台进程是否退出用 `process` 工具 / 后台会话状态确认（替代 `tmux ls`）；看日志尾部用 `Get-Content <file> -Tail 5`（替代 `tail -n 5`）；`curl` 用 `curl.exe`（PowerShell 的 `curl` 是 Invoke-WebRequest 别名，参数不兼容）。收到含 Unix 命令的操作手册时，先整体转译再执行，不要逐条硬跑。

## Apply Plan
1. Keep this reconstructed draft as the approval artifact.
2. Record the proposal content exactly as shown in the interactive card.
3. Append an audit note after approval or rejection.

## User Approval
- Approve: 批准 evo-2026-08-08-unix-cmd-powershell-translate
- Reject: 拒绝 evo-2026-08-08-unix-cmd-powershell-translate