// src/lib/og-generator.ts
//
// Togthr Buddy P0 Step 2 — 客户端 Canvas OG/分享卡生成器
// K3 V2.0: 替代 @vercel/og 动态路由（零 bundle 成本）
//
// 背景：深底 + 三色微光（与 Buddy 光晕同源 #7C3AED/#F472B6/#2DD4BF）
// Buddy 渲染：像素块（SVG rect 逻辑），分享时生成 → 上传 CDN → metadata 指向静态 URL

export interface OgBuddy {
  name: string
  theme: string        // main 色 hex
  memoryText?: string
  day: number
}

const BRAND_LINE = 'togthr — the quiet companion'

/** 渲染单像素块 */
function px(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fill: string) {
  ctx.fillStyle = fill
  ctx.fillRect(x, y, w, h)
}

/** 在 canvas 上绘制 32×32 像素 Buddy（放大 scale 倍） */
export function renderBuddyToCanvas(
  ctx: CanvasRenderingContext2D,
  buddy: OgBuddy,
  ox: number,
  oy: number,
  scale: number
): void {
  const main = buddy.theme
  const dark = '#2D2D3A'
  const eye = '#FFFFFF'

  // 头部主体（16,5 → 12×12）
  px(ctx, ox + 10 * scale, oy + 5 * scale, 12 * scale, 12 * scale, main)
  // 头底阴影
  px(ctx, ox + 12 * scale, oy + 15 * scale, 8 * scale, 2 * scale, dark)
  // 眼睛：白底 + 瞳孔 + 高光
  px(ctx, ox + 12 * scale, oy + 8 * scale, 3 * scale, 3 * scale, eye)   // 左眼白
  px(ctx, ox + 19 * scale, oy + 8 * scale, 3 * scale, 3 * scale, eye)   // 右眼白
  px(ctx, ox + 13 * scale, oy + 9 * scale, 2 * scale, 2 * scale, dark)  // 左瞳孔
  px(ctx, ox + 20 * scale, oy + 9 * scale, 2 * scale, 2 * scale, dark)  // 右瞳孔
  // 高光
  px(ctx, ox + 12 * scale, oy + 8 * scale, 1 * scale, 1 * scale, '#FFFFFF')
  px(ctx, ox + 19 * scale, oy + 8 * scale, 1 * scale, 1 * scale, '#FFFFFF')
  // 微笑弧（2 像素）
  px(ctx, ox + 14 * scale, oy + 13 * scale, 4 * scale, 1 * scale, dark)
  px(ctx, ox + 15 * scale, oy + 14 * scale, 2 * scale, 1 * scale, dark)
}

/** 生成 1200×630 分享卡 PNG DataURL（客户端，零 bundle 依赖） */
export function generateShareCard(buddy: OgBuddy): string {
  const canvas = document.createElement('canvas')
  canvas.width = 1200
  canvas.height = 630
  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // 背景：深底 + 三色径向微光（与 Buddy 光晕同源）
  const bg = ctx.createRadialGradient(600, 200, 0, 600, 315, 620)
  bg.addColorStop(0, '#1A1A2E')
  bg.addColorStop(1, '#0F0E17')
  ctx.fillStyle = bg
  ctx.fillRect(0, 0, 1200, 630)

  // 三色光晕微光
  const glows: Array<[number, number, number, string]> = [
    [250, 150, 340, 'rgba(124,58,237,0.14)'],
    [900, 420, 300, 'rgba(244,114,182,0.10)'],
    [650, 500, 260, 'rgba(45,212,191,0.08)'],
  ]
  for (const [gx, gy, gr, col] of glows) {
    const g = ctx.createRadialGradient(gx, gy, 0, gx, gy, gr)
    g.addColorStop(0, col)
    g.addColorStop(1, 'transparent')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 1200, 630)
  }

  // Buddy 像素渲染（放大 10 倍，居中偏上）
  renderBuddyToCanvas(ctx, buddy, 520, 90, 10)

  // 名字
  ctx.font = 'italic 56px "Caveat", cursive'
  ctx.fillStyle = '#F4E4BC'
  ctx.textAlign = 'center'
  ctx.fillText(buddy.name, 600, 400)

  // Day N together
  ctx.font = '28px "Inter", sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.6)'
  ctx.fillText(`Day ${buddy.day} together`, 600, 450)

  // 记忆文字（可选）
  if (buddy.memoryText) {
    ctx.font = 'italic 40px "Caveat", cursive'
    ctx.fillStyle = '#E8D5B8'
    ctx.fillText(buddy.memoryText.slice(0, 40), 600, 510)
  }

  // 品牌
  ctx.font = '24px "Inter", sans-serif'
  ctx.fillStyle = 'rgba(255,255,255,0.4)'
  ctx.fillText(BRAND_LINE, 600, 575)

  return canvas.toDataURL('image/png')
}

/** 触发下载 */
export function downloadShareCard(buddy: OgBuddy): void {
  const dataUrl = generateShareCard(buddy)
  if (!dataUrl) return
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = `togthr-buddy-${buddy.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') || 'buddy'}-day${buddy.day}.png`
  a.click()
}
