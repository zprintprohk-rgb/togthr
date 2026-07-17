'use client'

/**
 * PurchaseSuccessTracker — fires `purchase_success` on payment return pages.
 *
 * Server-component success pages render this with whatever static context
 * they know (provider / sku / tier); matching URL params
 * (?provider= / ?sku= / ?tier=) supplement or override it when present.
 *
 * Renders nothing.
 */

import { useEffect } from 'react'
import { track } from '@/lib/analytics'

interface Props {
  provider?: string
  sku?: string
  tier?: string
}

export function PurchaseSuccessTracker({ provider, sku, tier }: Props) {
  useEffect(() => {
    const props: Record<string, string> = {}
    if (provider) props.provider = provider
    if (sku) props.sku = sku
    if (tier) props.tier = tier
    try {
      const params = new URLSearchParams(window.location.search)
      for (const key of ['provider', 'sku', 'tier'] as const) {
        const value = params.get(key)
        if (value) props[key] = value
      }
    } catch {
      // noop
    }
    track('purchase_success', props)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
