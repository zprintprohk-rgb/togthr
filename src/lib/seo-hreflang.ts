// src/lib/seo-hreflang.ts
// Centralized hreflang alternate links generator per SEO convention §0.
// Used by referral pages and any feature page needing full 8-locale alternates.

import { routing } from '@/i18n/routing'

/**
 * Generate alternate language links for hreflang + OpenGraph locale alternates.
 * Example: generateAlternateLinks('/zh-cn/referral') → { en: 'https://.../en/referral', 'zh-cn': '...', ... }
 */
export function generateAlternateLinks(
  currentPath: string,
  baseUrl = 'https://www.togthr.life',
): Record<string, string> {
  // Strip current locale prefix to get the path template
  let pathTemplate = currentPath
  for (const loc of routing.locales) {
    if (currentPath.startsWith(`/${loc}/`) || currentPath === `/${loc}`) {
      pathTemplate = currentPath.slice(loc.length + 1) || '/'
      break
    }
  }

  const links: Record<string, string> = {}
  for (const loc of routing.locales) {
    links[loc] = `${baseUrl}/${loc}${pathTemplate}`
  }
  return links
}
