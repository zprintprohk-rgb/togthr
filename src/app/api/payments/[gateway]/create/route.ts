import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { createServerClient } from "@/lib/supabase"
import { getCountryFromRequest, getPricing } from "@/lib/pricing"
import { createPayPalOrder } from "@/lib/paypal"
import { routing } from "@/i18n/routing"

/**
 * GET /api/payments/[gateway]/create?country=..&tier=..&period=..&locale=..
 *
 * Unified subscription-checkout entry used by the pricing page CTA.
 *
 * Flow (paypal): auth → server-side pricing → createPayPalOrder → insert
 * pending `orders` row (id = PayPal order id) → 303 to the approve link.
 * Capture + fulfillment happens in /api/payments/paypal/return.
 *
 * Flow (alipay): auth → internal POST to /api/alipay/create-order (which
 * resolves pricing + writes its own pending row) → 303 to its payUrl.
 * Fulfillment happens via /api/alipay/notify.
 *
 * Amount/currency are ALWAYS resolved server-side from CF-IPCountry via
 * getCountryFromRequest + getPricing — client-supplied amounts are never
 * trusted. All failures 303 back to the pricing page with an error flag.
 */

/* ─── env ─── */
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!
const PAYPAL_MODE: "sandbox" | "production" =
  process.env.PAYPAL_MODE === "live" ? "production" : "sandbox"
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

/* ─── whitelists ─── */
const TIERS = new Set(["plus", "soulmate"])
const PERIODS = new Set(["monthly", "quarterly", "yearly"])
const GATEWAYS = new Set(["paypal", "alipay"])
const LOCALES = new Set<string>(routing.locales)

type Period = "monthly" | "quarterly" | "yearly"

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ gateway: string }> },
) {
  const { gateway: rawGateway } = await params
  const origin = req.nextUrl.origin
  const q = req.nextUrl.searchParams

  // locale is whitelisted first — every redirect below (incl. errors) needs it
  const rawLocale = q.get("locale") ?? "en"
  const locale = LOCALES.has(rawLocale) ? rawLocale : "en"

  const sanitize = (s: string) =>
    s.replace(/[^a-zA-Z0-9_.:-]+/g, "_").slice(0, 80)
  const checkoutFailed = (reason = "unknown", detail = "") =>
    NextResponse.redirect(
      `${origin}/${locale}/pricing?error=checkout_failed&reason=${reason}${
        detail ? `&detail=${sanitize(detail)}` : ""
      }`,
      303,
    )

  try {
    /* 0. whitelist validation */
    const gateway = rawGateway ?? ""
    const tier = q.get("tier") ?? ""
    const period = q.get("period") ?? ""
    if (!GATEWAYS.has(gateway) || !TIERS.has(tier) || !PERIODS.has(period)) {
      return checkoutFailed("whitelist")
    }

    /* 1. auth — checkout requires a logged-in user */
    const supabase = await createServerClient()
    const {
      data: { user },
      error: authErr,
    } = await supabase.auth.getUser()
    if (authErr || !user) {
      const next = encodeURIComponent(req.nextUrl.pathname + req.nextUrl.search)
      return NextResponse.redirect(`${origin}/${locale}/login?next=${next}`, 303)
    }

    if (gateway === "paypal") {
      /* 2a. amount / currency — server-side only, never from the client */
      const country = getCountryFromRequest(req)
      const pricing = getPricing(country)
      const tiers = pricing.tiers as Record<
        string,
        { monthly: number; quarterly: number; yearly: number }
      >
      const plan = tiers[tier]
      const amount = plan?.[period as Period]
      if (!plan || !amount || amount <= 0) {
        return checkoutFailed("pricing")
      }
      const currency = pricing.currency

      /* 3a. create the PayPal order */
      let order: Awaited<ReturnType<typeof createPayPalOrder>>
      try {
        order = await createPayPalOrder(
          PAYPAL_CLIENT_ID,
          PAYPAL_CLIENT_SECRET,
          PAYPAL_MODE,
          {
            amount: amount.toFixed(2),
            currency,
            description: `CloudDreamer ${tier} (${period})`,
            customId: user.id,
            returnUrl: `${origin}/api/payments/paypal/return?locale=${locale}`,
            cancelUrl: `${origin}/${locale}/pricing?cancelled=1`,
          },
        )
      } catch (e) {
        console.error("[payments/create] createPayPalOrder failed:", (e as Error).message)
        return checkoutFailed("paypal_create", (e as Error).message)
      }

      /* 4a. pending order row (mirrors alipay create-order insert shape) */
      const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
      const { error: dbErr } = await service.from("orders").insert({
        id: order.id,
        user_id: user.id,
        user_email: user.email ?? null,
        amount,
        currency,
        status: "pending",
        gateway: "paypal",
        tier,
        period,
        gateway_raw: order,
        created_at: new Date().toISOString(),
      })
      if (dbErr) {
        console.error("[payments/create] pending order insert failed:", dbErr.message)
        return checkoutFailed("db_insert", `${dbErr.code ?? ""}:${dbErr.message}`)
      }

      /* 5a. send the user to PayPal approval */
      const approveUrl = order.links?.find((l) => l.rel === "approve")?.href
      if (!approveUrl) {
        console.error("[payments/create] PayPal order missing approve link")
        return checkoutFailed("no_approve_link")
      }
      return NextResponse.redirect(approveUrl, 303)
    }

    /* 2b/3b. alipay — delegate to the existing route (resolves its own
       pricing + writes its own pending row). CF-IPCountry is forwarded
       best-effort so its server-side pricing matches the user's country. */
    const alipayRes = await fetch(`${origin}/api/alipay/create-order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CF-IPCountry": req.headers.get("CF-IPCountry") ?? "",
      },
      body: JSON.stringify({
        tier,
        period,
        userId: user.id,
        userEmail: user.email ?? undefined,
        locale,
      }),
    })
    if (!alipayRes.ok) {
      console.error("[payments/create] alipay create-order status:", alipayRes.status)
      return checkoutFailed("alipay_http", String(alipayRes.status))
    }
    const alipayData = (await alipayRes.json()) as { payUrl?: string }
    if (!alipayData.payUrl) {
      console.error("[payments/create] alipay create-order returned no payUrl")
      return checkoutFailed("alipay_no_url")
    }
    return NextResponse.redirect(alipayData.payUrl, 303)
  } catch (err) {
    // never log env/secrets — message only
    console.error("[payments/create]", err instanceof Error ? err.message : "unknown")
    return checkoutFailed(
      "exception",
      err instanceof Error ? err.message : "unknown",
    )
  }
}
