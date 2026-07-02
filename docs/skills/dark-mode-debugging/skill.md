# Dark Mode 白底问题调试技能 (Tailwind v4 + Next.js 15)

> **触发条件**: 用户报告页面出现白色背景、深色模式失效、局部白框等问题。
> **适用范围**: Tailwind CSS v4 + Next.js 15 App Router + `dark:` class-based 项目。

## 一、问题诊断框架

当页面出现白底时，按以下 5 层从外到内排查：

```
html (最外层)
 └── body
     └── main / 页面容器
         └── 页面组件背景
             └── 卡片/内容区背景
```

### 排查脚本

```bash
# 1. 线上 HTML 检查
curl -s https://DOMAIN | grep -o '<html[^>]*>' | grep -o 'class="[^"]*"'
# 预期: class="dark ..." — 必须有 dark class

curl -s https://DOMAIN | grep -o '<body[^>]*>' | grep -o 'class="[^"]*"'
# 预期: bg-zinc-950 或 bg-cosmic

# 2. 线上 CSS 检查
curl -s URL/_next/static/css/LARGEST_CSS_FILE.css | grep -c '\.dark'
# 预期: >500 — dark 变体必须被编译

curl -s URL/_next/static/css/LARGEST_CSS_FILE.css | grep -o 'main.*background.*0B0B1A'
# 检查 main 标签背景是否被编译
```

```javascript
// 3. 本地 Node 脚本 — 检查线上 CSS 中关键选择器
const cssUrls = [...]; // 从 HTML 中提取
for (const url of cssUrls) {
  const css = await fetch(url).then(r => r.text());
  console.log({
    hasMainBg: css.includes('main') && css.includes('0B0B1A'),
    hasHtmlBg: css.includes('html') && css.includes('background'),
    darkCount: (css.match(/\.dark/g) || []).length,
  });
}
```

## 二、根因分类与修复

### 根因 A: `@custom-variant dark` 未定义或失效

**症状**: 导航栏 `dark:bg-zinc-950` 不生效，整个页面始终白底。

**检查**:
```css
/* globals.css 或 tailwind entry — 必须有这一行 */
@custom-variant dark (&:where(.dark, .dark *));
```

**修复**: 添加上述 `@custom-variant` 声明，并在 `<html>` 标签上加 `className="dark"`。

### 根因 B: `<html>` 缺少 `dark` class（最常见）

**症状**: `dark:` 变体编译正确（CSS 中有 `.dark\:` 前缀类），但不生效。

**修复**: 在 `src/app/layout.tsx`（根 layout）中:
```tsx
<html className="dark ..." suppressHydrationWarning>
```

**关键**: 必须加 `suppressHydrationWarning`，因为可能有 JS 在客户端修改 `<html>`。

### 根因 C: Tailwind v4 裸标签选择器不被编译

**症状**: 在 `globals.css` 中写了 `main { background: var(--bg-cosmic); }`，但线上 CSS 中没有。

**根因**: Tailwind v4 使用 `@import "tailwindcss"` 后，裸 HTML 标签选择器会被 PostCSS 丢弃，除非包裹在 `@layer base` 中。

**错误写法**:
```css
/* ❌ Tailwind v4 不会编译这个 */
main {
  background: var(--bg-cosmic);
}
```

**正确写法**:
```css
/* ✅ 必须放在 @layer base 中 */
@layer base {
  html {
    background: var(--bg-cosmic);
  }
  body {
    background: var(--bg-cosmic);
  }
  main {
    background: var(--bg-cosmic);
    flex: 1;
  }
}
```

### 根因 D: 阻塞式内联脚本防御 Edge/Chrome 深色强制

**症状**: Edge InPrivate 或 Chrome 的 "Auto Dark Mode" 功能在页面水合前剥离 `class="dark"`，导致白底。

**修复**: 在 `<head>` 中注入同步阻塞脚本:
```tsx
// src/app/layout.tsx
const FORCE_DARK_SCRIPT = `
  (function(){
    try {
      var d = document.documentElement;
      d.classList.add('dark');
      var s = d.style;
      s.colorScheme = 'dark';
      s.backgroundColor = '#0B0B1A';
    } catch(e) {}
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html className="dark ..." suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: FORCE_DARK_SCRIPT }} />
      </head>
      <body className="min-h-full flex flex-col bg-zinc-950 text-zinc-100">
        {children}
      </body>
    </html>
  );
}
```

同时需在 `viewport` export 中声明:
```tsx
export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0B0B1A',
};
```

### 根因 E: 页面组件背景丢失

**症状**: 某些页面正常（如 Daily），某些白底（如 Home、Pricing）。

**根因**: Tailwind v4 的代码分割可能把页面组件的 `bg-linear-to-b from-[#0B0B1A]` 类拆到单独 CSS chunk，加载失败时透出下层背景。

**修复 — 多层兜底策略**:
1. `html` — 全局 CSS（`@layer base`）
2. `body` — 全局 CSS + Tailwind `bg-zinc-950`（双重）
3. `<main>` — 全局 CSS `@layer base` + inline `className="bg-[#0B0B1A]"`（双重）
4. 页面组件 — 自身的渐变深色背景
5. `FORCE_DARK_SCRIPT` — JS 层 `s.backgroundColor = '#0B0B1A'`

### 根因 F: 图片白框是白底次生问题

**症状**: `glass-card`（`background: rgba(255,255,255,0.05)`）在深色背景上是微妙的玻璃态，在白底上变成纯白框。

**修复**: 不需要改 glass-card token，修复页面背景后白框自然消失。可选柔化：将 PetCapsule 内部底色从 `from-white/[0.03]` 改为 `from-purple-900/20`。

## 三、为什么多 AI 模型会修不好

| 陷阱 | 表现 | 避免方法 |
|------|------|---------|
| 只改局部不改全局 | 反复改 HomeClient/PricingTheater 的 className，根因 `main` 没背景 | 按 5 层框架排查，先动全局后动局部 |
| 被 dark mode 误导 | 以为 `dark:` 类没生效，一直加 `dark:` 前缀 | 先检查 `<html>` 是否有 `class="dark"` |
| CSS 特异性覆盖 | 新增类被原有样式覆盖，看起来"加了没效果" | 用浏览器 DevTools > Computed 确认最终生效值 |
| 裸标签选择器不编译 | 在 globals.css 写 `main { }` 但 Tailwind v4 丢弃 | 始终用 `@layer base { }` 包裹 |
| 部署缓存误解 | 代码改了但 CDN 没更新，以为修复无效 | curl 检查线上 CSS 内容是否真的变了 |
| 方向跑偏 | 以为是文字颜色问题，一直在调 text-zinc | 先确认背景色是否正确，再调文字 |

## 四、验证清单

修复后按顺序验证：

```
□ npm run build 无 CSS 相关警告
□ 构建产物 .next/static/css/*.css 中包含 main { background } 选择器
□ 部署后 Cloudflare Dashboard Purge Cache
□ 无痕窗口依次访问: / /pricing /pet /daily /capsule /faq
□ Ctrl+Shift+R 硬刷新确认不是缓存
□ 浏览器 DevTools > Computed > 检查 <html> background-color = #0B0B1A
□ 浏览器 DevTools > Computed > 检查 <main> background-color = #0B0B1A
□ Edge InPrivate 模式确认
□ Chrome Incognito 模式确认
```

## 五、本项目硬编码常量

```
--bg-cosmic: #0B0B1A
--bg-cosmic-soft: #110A20
--bg-cosmic-deep: #06030F
dark class vendor: Tailwind v4 @custom-variant dark (&:where(.dark, .dark *))
font: Geist Sans + Geist Mono
框架: Next.js 15 App Router + React 19
CSS: Tailwind CSS v4 (CSS-first, 无 tailwind.config.js)
域名: togthr.life
部署: Cloudflare Workers (via OpenNext)
```
