import { createBrowserClient as createBrowser } from "@supabase/ssr"
import { createServerClient as createServer } from "@supabase/ssr"
import { createClient as createEdge } from "@supabase/supabase-js"
import { cookies } from "next/headers"

/**
 * Lazy env reads — avoids throwing at module load time when
 * NEXT_PUBLIC_SUPABASE_URL is empty (which happens in worker env
 * when [vars] in wrangler.toml is blank). Instead we throw a clear
 * error the moment a client is actually requested.
 */

function getSupabaseEnv() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  const missing: string[] = []
  if (!url) missing.push('NEXT_PUBLIC_SUPABASE_URL')
  if (!anonKey) missing.push('NEXT_PUBLIC_SUPABASE_ANON_KEY')
  if (!serviceKey) missing.push('SUPABASE_SERVICE_ROLE_KEY')
  if (missing.length) {
    throw new Error(
      `[supabase] missing env: ${missing.join(', ')}. ` +
        `Set via wrangler.toml [vars] (public) or wrangler secret put (private).`,
    )
  }
  return { url: url!, anonKey: anonKey!, serviceKey: serviceKey! }
}

// ─── 浏览器客户端（Client Components） ───
export function createBrowserClient() {
  const { url, anonKey } = getSupabaseEnv()
  return createBrowser(url, anonKey)
}

// ─── 服务器客户端（Server Components / Server Actions） ───
export async function createServerClient() {
  const { url, anonKey } = getSupabaseEnv()
  const cookieStore = await cookies()
  return createServer(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          )
        } catch {
          // 在 Server Component 中调用 setAll 可能抛出，忽略即可
        }
      },
    },
  })
}

// ─── Edge API 客户端（使用 Service Role Key，绕过 RLS） ───
export function createEdgeClient() {
  const { url, serviceKey } = getSupabaseEnv()
  return createEdge(url, serviceKey, {
    auth: { persistSession: false },
    global: { fetch },
  })
}