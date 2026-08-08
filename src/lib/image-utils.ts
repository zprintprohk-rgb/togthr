// src/lib/image-utils.ts
//
// Togthr Buddy Module 6 — 去白底工具（K3 规范 v1.0 + 千问优化 v1.1）
//
// 功能：
//   1. removeWhiteBackground: Canvas 去白底（阈值 240）+ 浅灰渐变透明 + 边缘抗锯齿
//   2. getProcessedAsset: 带缓存的处理后 DataURL（Key 含 path，避免重复遍历像素）
//   3. getThemedAsset: 主题色叠加后的变体（Key = path-theme，复用缓存）
//
// 性能约束（千问 v1.1）：
//   - 离屏 Canvas 缓存：同一组合只计算一次，后续直接读缓存
//   - 所有函数 SSR-safe：在服务端（无 window）直接 reject 而非抛错

// ── 缓存 ──
const cache = new Map<string, string>()

const THEME_TINTS: Record<string, [number, number, number]> = {
  lavender: [196, 181, 253],   // #C4B5FD
  mint: [110, 231, 183],       // #6EE7B7
  sakura: [249, 168, 212],     // #F9A8D4
  moonlight: [147, 197, 253],  // #93C5FD
  warm: [253, 186, 116],       // #FDBA74
  charcoal: [107, 114, 128],   // #6B7280
}

export type BuddyTheme = keyof typeof THEME_TINTS

/** 去白底（含边缘抗锯齿：接近白色的半透明像素直接 alpha=0，消除深色背景白边） */
export async function removeWhiteBackground(src: string): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('removeWhiteBackground: browser only')
  }
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('getContext 2d failed'))
          return
        }
        ctx.drawImage(img, 0, 0)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        const data = imageData.data

        // 第一遍：检测每个像素是否为白色/近白背景
        const isWhite = new Uint8Array(canvas.width * canvas.height)
        for (let i = 0, p = 0; i < data.length; i += 4, p++) {
          const r = data[i], g = data[i + 1], b = data[i + 2]
          const brightness = (r + g + b) / 3
          if (brightness > 240) {
            isWhite[p] = 1
          }
        }

        // 第二遍：边缘侵蚀——若某像素被判定为白且其相邻像素非白，
        // 将相邻非白像素 alpha 降低 20% 消除 fringing
        const w = canvas.width, h = canvas.height
        for (let p = 0; p < w * h; p++) {
          if (isWhite[p] === 1) {
            data[p * 4 + 3] = 0
            // 检查上/下/左/右邻域
            const x = p % w, y = Math.floor(p / w)
            const neighbors = [
              x > 0 ? p - 1 : -1,
              x < w - 1 ? p + 1 : -1,
              y > 0 ? p - w : -1,
              y < h - 1 ? p + w : -1,
            ]
            for (const n of neighbors) {
              if (n >= 0 && isWhite[n] === 0) {
                const idx = n * 4
                const cur = data[idx + 3]
                if (cur > 0) data[idx + 3] = Math.max(0, Math.floor(cur * 0.8))
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0)
        resolve(canvas.toDataURL('image/png'))
      } catch (e) {
        reject(e as Error)
      }
    }
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

/** 主题色叠加（source-atop 半透明着色） */
export async function applyThemeTint(src: string, theme: BuddyTheme): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('applyThemeTint: browser only')
  }
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          reject(new Error('getContext 2d failed'))
          return
        }
        ctx.drawImage(img, 0, 0)
        ctx.globalCompositeOperation = 'source-atop'
        const [r, g, b] = THEME_TINTS[theme] ?? THEME_TINTS.lavender
        ctx.fillStyle = `rgba(${r},${g},${b},0.15)`
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/png'))
      } catch (e) {
        reject(e as Error)
      }
    }
    img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
    img.src = src
  })
}

/** 带缓存获取处理后的资产（去白底 + 主题色） */
export async function getProcessedAsset(path: string, theme: BuddyTheme = 'lavender'): Promise<string> {
  const key = `${path}::${theme}`
  if (cache.has(key)) return cache.get(key)!
  const cleaned = await removeWhiteBackground(path)
  const tinted = await applyThemeTint(cleaned, theme)
  cache.set(key, tinted)
  return tinted
}

/** 预加载下一帧（避免动画切换时的网络延迟空白） */
export function preloadAsset(path: string, theme: BuddyTheme = 'lavender'): void {
  if (typeof window === 'undefined') return
  getProcessedAsset(path, theme).catch(() => {
    /* 预加载失败静默 */
  })
}

export { THEME_TINTS }
