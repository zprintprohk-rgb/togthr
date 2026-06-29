/**
 * Gate 5 — Locale Prefix Pollution Check (revised 2026-06-30)
 *
 * Detects REAL pollution patterns only:
 *   (a) value starts with `[lang] ` prefix
 *       (e.g. "[en] Hello", "[zh-cn] 你好")
 *   (b) top-level JSON wrapper keys that are bare locale codes
 *       (e.g. { "en": {...}, "de": {...} } — anti-pattern from pre-flatten era)
 *
 * Does NOT match language-words that naturally appear inside translated text
 * (German "es" = "it", Spanish "en" = "in", French "de" = "of" must NOT trigger).
 *
 * Usage: node scripts/check-no-locale-prefix.js [messagesDir]
 * Default messagesDir: ./messages
 * Exit code: 0 = clean, 1 = pollution found
 */

import { readFileSync, readdirSync, existsSync } from 'fs'
import { resolve } from 'path'

const messagesDir = resolve(process.argv[2] || './messages')
const localeCodes = ['en', 'zh-cn', 'zh-tw', 'ja', 'ko', 'de', 'fr', 'es']
const localeAlt = localeCodes.join('|')

// (a) value-prefix pollution:    [lang]  at value start (after optional whitespace)
const VALUE_PREFIX_RE = new RegExp(`^\\s*\\[(${localeAlt})\\]\\s`)

// (b) top-level-key pollution:    bare locale code or [lang] at JSON root
const TOPLOCALE_KEY_RE = new RegExp(`^\\[?(${localeAlt})\\]?$`)

if (!existsSync(messagesDir)) {
  console.error(`[check-no-locale-prefix] messages dir not found: ${messagesDir}`)
  process.exit(1)
}

const files = readdirSync(messagesDir).filter(
  (f) => f.endsWith('.json') && !f.startsWith('_') && !f.includes('.bak.')
)

let errors = 0
const violations = []

for (const file of files) {
  // Skip sub-namespace files (faq.*, guide.*) — only check top-level locale files
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

  const walk = (obj, prefix = '', depth = 0) => {
    if (obj === null || obj === undefined) return

    // (a) string value: only flag if it STARTS with [lang] prefix
    if (typeof obj === 'string') {
      const m = obj.match(VALUE_PREFIX_RE)
      if (m) {
        violations.push({
          file,
          path: prefix,
          value: obj.length > 80 ? obj.slice(0, 77) + '...' : obj,
          match: m[0].trim(),
        })
        errors++
      }
      return
    }

    // (b) object: at depth 0 check for bare-locale top-level keys; then recurse
    if (typeof obj === 'object') {
      if (depth === 0) {
        for (const k of Object.keys(obj)) {
          if (TOPLOCALE_KEY_RE.test(k)) {
            violations.push({
              file,
              path: k,
              value: '<top-level locale wrapper>',
              match: k,
            })
            errors++
          }
        }
      }
      for (const [k, v] of Object.entries(obj)) {
        walk(v, prefix ? `${prefix}.${k}` : k, depth + 1)
      }
    }
  }
  walk(data)
}

if (violations.length > 0) {
  console.error(
    `\n[check-no-locale-prefix] Found ${violations.length} locale prefix pollution(s):\n`
  )
  for (const v of violations) {
    console.error(`  ${v.file}:${v.path} — "${v.match}" in "${v.value}"`)
  }
  console.error('')
  process.exit(1)
}

console.log('[check-no-locale-prefix] ✅ No locale prefix pollution detected')
process.exit(0)
