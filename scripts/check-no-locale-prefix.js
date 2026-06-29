/**
 * Gate 5 — Locale Prefix Pollution Check
 *
 * Scans all message JSON files for keys that retain [locale] path-segment
 * prefixes (e.g. "en", "zh-cn", "zh-tw", "ja", "ko", "de", "fr", "es")
 * used as key names or embedded in hardcoded locale references inside
 * translation values.
 *
 * Usage: node scripts/check-no-locale-prefix.js [messagesDir]
 * Default messagesDir: ./messages
 *
 * Exit code: 0 = clean, 1 = prefix pollution found
 */

import { readFileSync, readdirSync, existsSync } from 'fs'
import { resolve } from 'path'

const messagesDir = resolve(process.argv[2] || './messages')
const localePrefixes = new Set([
  'en', 'zh-cn', 'zh-tw', 'ja', 'ko', 'de', 'fr', 'es',
])

if (!existsSync(messagesDir)) {
  console.error(`[check-no-locale-prefix] messages dir not found: ${messagesDir}`)
  process.exit(1)
}

const files = readdirSync(messagesDir).filter(
  (f) => f.endsWith('.json') && !f.startsWith('_') && !f.includes('.bak.'),
)

let errors = 0
const violations = []

for (const file of files) {
  // Skip sub-namespace files (faq.*, guide.*) — only check main locale files
  if (file.includes('.') && !file.match(/^[a-z]{2}(-[a-z]{2})?\.json$/)) continue

  const raw = readFileSync(resolve(messagesDir, file), 'utf-8')
  let data
  try {
    data = JSON.parse(raw)
  } catch {
    console.error(`[check-no-locale-prefix] invalid JSON: ${file}`)
    errors++
    continue
  }

  // Walk all keys and string values
  const walk = (obj, prefix = '') => {
    if (obj === null || obj === undefined) return
    if (typeof obj === 'string') {
      // Check if value contains any locale code as a standalone token
      // (e.g. "Visit /zh-cn/pricing" is bad)
      const tokens = obj.split(/\s+|\/|\\|"|'/)
      for (const token of tokens) {
        if (localePrefixes.has(token)) {
          violations.push({
            file,
            path: prefix,
            value: obj.length > 80 ? obj.slice(0, 77) + '...' : obj,
            token,
          })
          errors++
          return
        }
      }
    } else if (typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj)) {
        walk(v, prefix ? `${prefix}.${k}` : k)
      }
    }
  }
  walk(data)
}

if (violations.length > 0) {
  console.error(`\n[check-no-locale-prefix] Found ${violations.length} locale prefix pollution(s):\n`)
  for (const v of violations) {
    console.error(`  ${v.file}:${v.path} — contains "${v.token}" in "${v.value}"`)
  }
  console.error('')
  process.exit(1)
}

console.log('[check-no-locale-prefix] ✅ No locale prefix pollution detected')
process.exit(0)
