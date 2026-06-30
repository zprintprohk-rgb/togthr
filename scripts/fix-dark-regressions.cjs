#!/usr/bin/env node
/**
 * Fix the 17 dark-mode regressions from c33a3d7:
 *  - Category A (4 instances): main buttons where script added redundant
 *    `dark:bg-zinc-900` that overrode the intentional `dark:bg-zinc-100`
 *    theme-inverted design
 *  - Category B (11 instances): secondary buttons where script added
 *    `dark:hover:bg-zinc-900` that overrode intentional `dark:hover:bg-zinc-700/800`
 *
 * Each fix is an exact substring replacement — minimal surface area.
 *
 * Run from project root: node scripts/fix-dark-regressions.cjs
 */
const fs = require('fs')
const path = require('path')

// [filePath, find, replace]
const FIXES = [
  // ===== Category A: 4 main buttons =====
  // Pattern: dark:bg-zinc-100 dark:bg-zinc-900 → dark:bg-zinc-100
  [
    'src/app/[locale]/layout.tsx',
    'dark:bg-zinc-100 dark:bg-zinc-900',
    'dark:bg-zinc-100',
  ],
  [
    'src/app/[locale]/login/LoginForm.tsx',
    'dark:bg-zinc-100 dark:bg-zinc-900',
    'dark:bg-zinc-100',
  ],
  [
    'src/app/[locale]/register/RegisterForm.tsx',
    'dark:bg-zinc-100 dark:bg-zinc-900',
    'dark:bg-zinc-100',
  ],
  [
    'src/app/[locale]/reset-password/ResetPasswordForm.tsx',
    'dark:bg-zinc-100 dark:bg-zinc-900',
    'dark:bg-zinc-100',
  ],

  // ===== Category B: 11 secondary buttons =====
  // Pattern: hover:bg-zinc-50 dark:hover:bg-zinc-900 → hover:bg-zinc-50
  //         (removes the inserted redundant dark:hover:bg-zinc-900)
  [
    'src/app/[locale]/login/LoginForm.tsx',
    'hover:bg-zinc-50 dark:hover:bg-zinc-900',
    'hover:bg-zinc-50',
  ],
  [
    'src/app/[locale]/register/RegisterForm.tsx',
    'hover:bg-zinc-50 dark:hover:bg-zinc-900',
    'hover:bg-zinc-50',
  ],
  [
    'src/app/[locale]/pricing/error.tsx',
    'hover:bg-zinc-50 dark:hover:bg-zinc-900',
    'hover:bg-zinc-50',
  ],
  [
    'src/app/[locale]/not-found.tsx',
    'hover:bg-zinc-50 dark:hover:bg-zinc-900',
    'hover:bg-zinc-50',
  ],
  [
    'src/app/[locale]/error.tsx',
    'hover:bg-zinc-50 dark:hover:bg-zinc-900',
    'hover:bg-zinc-50',
  ],
  [
    'src/app/[locale]/store/success/page.tsx',
    'hover:bg-zinc-50 dark:hover:bg-zinc-900',
    'hover:bg-zinc-50',
  ],
  [
    'src/app/[locale]/daily/page.tsx',
    'hover:bg-zinc-50 dark:hover:bg-zinc-900',
    'hover:bg-zinc-50',
  ],
  // LanguageSwitcher uses hover:bg-zinc-100 (not 50)
  [
    'src/components/LanguageSwitcher.tsx',
    'hover:bg-zinc-100 dark:hover:bg-zinc-900',
    'hover:bg-zinc-100',
  ],
]

const root = 'F:/CloudDreamerApp/togthr'
let totalChanged = 0
let fileCount = 0

for (const [relPath, find, replace] of FIXES) {
  const fullPath = path.join(root, relPath)
  if (!fs.existsSync(fullPath)) {
    console.log(`SKIP (not found): ${relPath}`)
    continue
  }
  let content = fs.readFileSync(fullPath, 'utf-8')
  const occurrences = content.split(find).length - 1
  if (occurrences === 0) {
    console.log(`WARN (no match): ${relPath}  looking for: ${find}`)
    continue
  }
  if (occurrences > 1) {
    console.log(`WARN (${occurrences} matches, will replace all): ${relPath}`)
  }
  const newContent = content.split(find).join(replace)
  fs.writeFileSync(fullPath, newContent, 'utf-8')
  totalChanged += occurrences
  fileCount++
  console.log(`FIXED (${occurrences}x): ${relPath}`)
}

console.log(`\n=== Summary: ${totalChanged} replacements across ${fileCount} files ===`)