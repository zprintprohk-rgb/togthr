import { NextRequest, NextResponse } from 'next/server'

/**
 * Edge cache control middleware.
 *
 * Without this, Cloudflare caches HTML responses with s-maxage=31536000
 * (1 year), which means after a deploy the OLD HTML keeps being served
 * from edge until expiry — even though wrangler pushed a new Worker
 * version. This is what was making Home/Pricing/Pet/Chat show the OLD
 * "white" layout while Daily/Capsule occasionally refreshed.
 *
 * Strategy:
 *   - HTML pages (_next/data, /, no extension, .html, etc.) → no-store
 *     so every request re-renders and edge never serves a stale page.
 *   - Static assets under /_next/static/* → keep CF's immutable cache
 *     (1 year) — these are content-hashed so safe to cache forever.
 *   - /assets/* (R2 / pet sprites / OpenNext assets) → 1 day cache, OK
 *     because they're content-versioned by the build.
 *
 * Note: this does NOT purge existing edge cache for URLs already cached
 * with s-maxage=31536000. The first deploy that ships this middleware
 * MUST also call Cloudflare's /purge_cache API (added to deploy.yml
 * at the same time) to evict the existing long-lived HTML cache.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') ?? ''

  // P1 — 308 permanent redirect: 裸域 → www（与 canonical / sitemap / GSC 统一）
  if (host === 'togthr.life') {
    const url = new URL(request.url)
    url.hostname = 'www.togthr.life'
    return NextResponse.redirect(url.toString(), 308)
  }

  // Static assets — keep immutable, pass through.
  if (
    pathname.startsWith('/_next/static/') ||
    pathname.startsWith('/assets/') ||
    /\.(ico|png|jpg|jpeg|webp|avif|svg|woff2?|ttf|otf|css|js|map|json)$/i.test(
      pathname
    )
  ) {
    return NextResponse.next()
  }

  // Everything else (HTML, RSC, server actions, /api/* that survived
  // to the edge) → no-store so the new Worker version always re-renders.
  const response = NextResponse.next()
  response.headers.set('Cache-Control', 'no-store, must-revalidate')
  response.headers.set('Pragma', 'no-cache')
  response.headers.set('Expires', '0')
  return response
}

export const config = {
  // Match all routes except Next internals and static files; the
  // per-request early-return above handles the precise allow/deny.
  matcher: ['/((?!_next/static|_next/image|favicon.ico|assets/).*)'],
}
