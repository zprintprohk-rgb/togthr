import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { capturePayPalOrder } from "@/lib/paypal"
import { routing } from "@/i18n/routing"

/**
 * GET /api/payments/paypal/return?token=<paypal-order-id>&locale=..
 *
 * PayPal return_url target after buyer approval. Captures the order, then
 * fulfills EXACTLY like /api/paypal/capture-order:
 *   - mark the pending `orders` row (id = PayPal order id, written by
 *     /api/payments/[gateway]/create) completed, storing the capture id in
 *     payment_id so the PayPal webhook's idempotency check dedupes;
 *   - if no pending row exists (edge case), insert a completed row using
 *     the same description-parsing semantics as capture-order;
 *   - upsert `memberships` (yearly=365d / quarterly=90d / else 30d,
 *     onConflict user_id).
 * Then 303 → /{locale}/payment/success?provider=paypal&tier=..&period=...
 */

/* ─── env ─── */
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID!
const PAYPAL_CLIENT_SECRET = process.env.PAYPAL_CLIENT_SECRET!
const PAYPAL_MODE: "sandbox" | "production" =
  process.env.PAYPAL_MODE === "live" ? "production" : "sandbox"
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!

const LOCALES = new Set<string>(routing.locales)

export async function GET(req: NextRequest) {
  const origin = req.nextUrl.origin
  const q = req.nextUrl.searchParams
  const rawLocale = q.get("locale") ?? "en"
  const locale = LOCALES.has(rawLocale) ? rawLocale : "en"
  const token = q.get("token")

  const fail = (code: "checkout_failed" | "payment_failed") =>
    NextResponse.redirect(`${origin}/${locale}/pricing?error=${code}`, 303)

  if (!token) return fail("checkout_failed")

  const success = (tier: string, period: string) =>
    NextResponse.redirect(
      `${origin}/${locale}/payment/success?provider=paypal&tier=${encodeURIComponent(
        tier,
      )}&period=${encodeURIComponent(period)}`,
      303,
    )

  try {
    /* 1. capture the approved order */
    const capture = await capturePayPalOrder(
      PAYPAL_CLIENT_ID,
      PAYPAL_CLIENT_SECRET,
      PAYPAL_MODE,
      token,
    )
    if (capture.status !== "COMPLETED") {
      console.error("[payments/paypal/return] capture status:", capture.status)
      return fail("payment_failed")
    }

    const pUnit = capture.purchase_units?.[0]
    const capture0 = pUnit?.payments?.captures?.[0]
    const captureId = capture0?.id ?? null

    const service = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    })
    const now = new Date().toISOString()

    /* 2. locate the pending row written at create time */
    const { data: existing } = await service
      .from("orders")
      .select("id, status, user_id, tier, period")
      .eq("id", token)
      .maybeSingle()

    if (existing && existing.status === "completed") {
      // idempotent re-entry (double return / refresh)
      return success(
        (existing.tier as string) ?? "plus",
        (existing.period as string) ?? "monthly",
      )
    }

    let tier = "plus"
    let period = "monthly"
    let userId = "unknown"

    if (existing) {
      /* 3a. normal path: pending row → completed */
      const { error: updErr } = await service
        .from("orders")
        .update({
          status: "completed",
          payment_id: captureId,
          paid_at: now,
          gateway_raw: capture,
        })
        .eq("id", token)
      if (updErr) {
        console.error("[payments/paypal/return] order update failed:", updErr.message)
        return fail("payment_failed")
      }
      tier = (existing.tier as string) ?? tier
      period = (existing.period as string) ?? period
      userId = (existing.user_id as string) ?? userId
    } else {
      /* 3b. edge case: no pending row — mirror /api/paypal/capture-order insert */
      const amount = Number(capture0?.amount?.value ?? pUnit?.amount?.value ?? 0)
      const currency =
        capture0?.amount?.currency_code ?? pUnit?.amount?.currency_code ?? "USD"
      userId = pUnit?.custom_id ?? "unknown"
      const desc = (pUnit as { description?: string } | undefined)?.description ?? ""
      const tierMatch = desc.match(/CloudDreamer\s+(\w+)/)
      const periodMatch = desc.match(/\((\w+)\)/)
      tier = tierMatch?.[1] ?? tier
      period = periodMatch?.[1] ?? period

      const { error: insErr } = await service.from("orders").insert({
        user_id: userId,
        user_email: null,
        amount,
        currency,
        status: "completed",
        payment_method: "paypal",
        payment_id: captureId ?? token,
        tier,
        period,
        gateway_raw: capture,
        created_at: now,
        paid_at: now,
      })
      if (insErr) {
        console.error("[payments/paypal/return] order insert failed:", insErr.message)
        return fail("payment_failed")
      }
    }

    /* 4. activate membership — identical semantics to capture-order */
    const days = period === "yearly" ? 365 : period === "quarterly" ? 90 : 30
    const expiresAt = new Date()
    expiresAt.setDate(expiresAt.getDate() + days)
    const { error: memErr } = await service.from("memberships").upsert(
      {
        user_id: userId,
        tier,
        status: "active",
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" },
    )
    if (memErr) {
      // the order IS paid — don't strand the user on an error page;
      // logged for repair via webhook/cron reconciliation
      console.error("[payments/paypal/return] membership upsert failed:", memErr.message)
    }

    /* 5. done */
    return success(tier, period)
  } catch (err) {
    // never log env/secrets — message only
    console.error("[payments/paypal/return]", err instanceof Error ? err.message : "unknown")
    return fail("payment_failed")
  }
}
