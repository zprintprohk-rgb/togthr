# Togthr.life — PM 全局增强审计报告
**日期**: 2026-07-07
**审计员**: GLM-5.2 Subagent (dark-mode-C-polish-worker)
**范围**: 全站 UI/UX, 不含 i18n 翻译正确性 (B 任务独立于 Mavis)

---

## D-1 🔴 高: BentoCard 硬编码中文, 所有 8 locales 显示相同

**问题**: `HomeClient.tsx` 中 7 张 BentoCard 的 title/description 全部为中文硬编码字符串（"喂食时间"、"时光胶囊·挖宝"、"共生形态"、"筑巢"、"灵魂伴侣 AI"、"树洞"、"6+1 盲盒"），而非 i18n key。Google Translate 弹窗弹出但无效，证明这些不是被翻译的 key，而是写死的中文。

**影响**: /en, /ja, /ko, /de, /fr, /es 非中文用户看到的是中文卡片，体验完全断裂。用户截图已证实此问题。

**ROI**: ★★★★★ (阻塞非中文用户转化)
**文件**: `src/app/[locale]/HomeClient.tsx` L470-540
**改动量**: ~40 行 (7 张卡 × 2 字段 = 14 个 i18n key, 加 messages 定义)
**建议**: 将 7 张卡的 title/description 迁移到 `messages/*/home.json`，添加 `home.companions.card1.title` 等 key。

---

## D-2 🔴 高: dark mode 依赖单一 inline script, 无降级路径

**问题**: 本次补丁 #3 将 `<html>` className 完全从 React 移交给 inline script。如果 inline script 执行失败（CSP 拒绝、ad blocker 拦截、JS disabled），整个站点将回退到白底。虽然加了 try/catch + DOMContentLoaded fallback，但 `document.currentScript` 在某些环境不可靠。

**影响**: 极低概率但影响 100% 用户。当前方案将 "深色模式" 绑定到 JavaScript 执行而不是 CSS。

**ROI**: ★★★★ (风险缓解，现在不需要立即修复，但值得追踪)
**文件**: `src/app/layout.tsx` L39-50
**改动量**: ~5 行
**建议**: 在 `<html>` 上保留 `style="background:#0B0B1A;color-scheme:dark"` 作为 no-JS baseline。CSS 层面的 `@layer base { html { background: var(--bg-cosmic); } }` 已存在，但如果 JS 失败 className=`dark` 未设置，`dark:` variant 全部不生效。

---

## D-3 🟡 中: HomeClient 首屏访问状态 loading 闪烁

**问题**: `visitStatus` 初始值为 `'loading'`，在 CSR mount + localStorage 读取前持续约 200-500ms。期间 pet status 和 subtitle 都显示 fallback 文本（`heroSubtitle`），与最终文本可能不一致。

**影响**: 回访用户首屏看到 "You came back" → 200ms 后文本切换，产生轻微闪烁。UX 评分 -0.5。

**ROI**: ★★★ (微小提升，抛光项)
**文件**: `src/app/[locale]/HomeClient.tsx` L165-175
**改动量**: ~8 行
**建议**: 利用 Next.js cookies/headers 在 SSR 阶段判断 `togthr.lastVisit` cookie 是否存在，避免完全依赖 CSR。或者给 loading 状态一个与 final 值一致的初始值（如默认 `heroWelcomeBack` 而非 `heroSubtitle`）。

---

## D-4 🟡 中: Pricing 页 TierCard free 档缺少视觉引导

**问题**: 本次 C-2 已将 Free 档改为深底，与 plus/eternal 视觉对齐。但 Free 档的 CTA button 仍使用 `border border-white/15 bg-white/5` + Lock icon，视觉上给人 "不可用/锁住" 的印象，而非 "从这里开始"。

**影响**: 免费用户可能误以为 Free 档不可用，直接离开页面。转化漏斗第一步就损失用户。

**ROI**: ★★★★ (直接影响免费->付费转化 pipeline)
**文件**: `src/app/[locale]/pricing/TierCard.tsx` L225-240
**改动量**: ~5 行
**建议**: 将 Free CTA 改为 `bg-zinc-800 hover:bg-zinc-700 text-zinc-100`，去除 Lock icon 改用 `ChevronRight`，文案改为 "Get Started" 或当前 locale 的等价词。Lock icon 移到 features 中 "No credit card required" 旁。

---

## D-5 🟡 中: Pet 页 mood 按钮缺少触觉反馈（移动端）

**问题**: 4 个 mood 按钮在移动端无 `:active` 状态增强。当前仅 hover 时 `scale-105`，但在触摸设备上 hover 不可靠。

**影响**: 移动端用户点击 mood 切换无即时视觉反馈，感知延迟 ~300ms（等 AnimatePresence 完成）。

**ROI**: ★★★ (移动端体验提升)
**文件**: `src/app/[locale]/pet/PetDetailClient.tsx` L196-210
**改动量**: ~3 行
**建议**: 添加 `active:scale-95` 和 `transition-all duration-100` 到 mood 按钮。同时考虑添加 `aria-live="polite"` 到 moodCfg.bubbleEn 的展示区域以支持屏幕阅读器。

---

## D-6 🟡 中: 全局缺少 loading skeleton / suspense boundary

**问题**: 多个页面（pricing, pet, features/[slug]）是 SSG/SSR，首屏加载时间约 180kB JS。但无 suspense fallback，用户看到的是空白直到 JS hydrate 完成。

**影响**: LCP (Largest Contentful Paint) 可能 > 2.5s，影响 Core Web Vitals 和 SEO 排名。

**ROI**: ★★★★★ (SEO + UX 双赢)
**文件**: `src/app/[locale]/layout.tsx`, `src/app/[locale]/pricing/page.tsx`, `src/app/[locale]/pet/page.tsx`
**改动量**: ~30 行 (loading.tsx × 3 页面 + 1 suspense wrapper)
**建议**: 为每个动态路由添加 `loading.tsx`，展示玻璃拟态骨架屏（skeleton card with `animate-pulse`）。Pricing 和 Pet 页面已有完整 SSG 输出，可优先加在最慢的页面。

---

## D-7 🟢 低: DesktopPet 全站悬浮可能遮挡交互元素

**问题**: `DesktopPet` 组件在 `[locale]/layout.tsx` 中全站渲染，position 为 fixed/absolute。在移动端小屏上可能遮挡 footer 链接或 CTA 按钮。

**影响**: 移动端小屏 (~320px 宽) 上可能无法点击被遮挡的元素。

**ROI**: ★★ (边缘场景，但影响可用性)
**文件**: `src/components/DesktopPet/`
**改动量**: ~10 行
**建议**: 给 DesktopPet 容器添加 `pointer-events: none`（容器层）但保留内部交互元素的 pointer-events。或在移动端 `max-sm:hidden`。添加 `z-index: 40` 确保不遮挡 header（z-50）。

---

## D-8 🟢 低: `<meta name="theme-color">` 与 viewport export 重复声明

**问题**: 本次补丁 #3 在 `<head>` 中添加了硬编码 `<meta name="theme-color" content="#0B0B1A">`，同时 `viewport` export 中也设置了 `themeColor: '#0B0B1A'`。Next.js 15 的 Metadata API 也会注入一个 meta theme-color，导致页面上出现两个相同的 meta 标签。

**影响**: HTML 规范允许重复，但浏览器可能取第一个。实际无功能影响，但 HTML 不够干净。

**ROI**: ★ (纯整洁度)
**文件**: `src/app/layout.tsx` L50
**改动量**: 1 行（删除手动 `<meta name="theme-color">`，保留 viewport export）
**建议**: 删掉 `<head>` 内的手动 `<meta name="theme-color">`，Next.js 已经通过 viewport export 自动生成。同时检查 `meta name="color-scheme"` 是否也被自动生成。

---

## 总结

| 优先级 | 数量 | 建议处理时间 |
|--------|------|------------|
| 🔴 高 | 2 (D-1, D-2) | 本周内 |
| 🟡 中 | 4 (D-3, D-4, D-5, D-6) | 两周内 |
| 🟢 低 | 2 (D-7, D-8) | 本月内 |

**最关键单项**: **D-1** — BentoCard 硬编码中文是整个多语言站点的最大 UX 缺陷，直接阻塞 7/8 非中文用户群的内容体验。
