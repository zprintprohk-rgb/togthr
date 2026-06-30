#!/usr/bin/env node
/**
 * Fix the 2 remaining subtle category-C cases.
 *  - error.tsx:57: redundant dark:bg-zinc-900 added by script, original was dark:bg-zinc-800
 *  - pricing/error.tsx:47: pure duplicate dark:bg-zinc-900
 */
const fs = require('fs')
const path = require('path')

const FIXES = [
  // error.tsx:57: bg-zinc-100 dark:bg-zinc-900 px-3 ... dark:bg-zinc-800
  // Remove the inserted dark:bg-zinc-900 between bg-zinc-100 and px-3
  [
    'src/app/[locale]/error.tsx',
    'bg-zinc-100 dark:bg-zinc-900 px-3',
    'bg-zinc-100 px-3',
  ],
  // pricing/error.tsx:47: bg-zinc-100 dark:bg-zinc-900 p-3 ... dark:bg-zinc-900
  // Remove the inserted dark:bg-zinc-900 between bg-zinc-100 and p-3
  [
    'src/app/[locale]/pricing/error.tsx',
    'bg-zinc-100 dark:bg-zinc-900 p-3',
    'bg-zinc-100 p-3',
  ],
]

const root = 'F:/CloudDreamerApp/togthr'
for (const [relPath, find, replace] of FIXES) {
  const fullPath = path.join(root, relPath)
  const content = fs.readFileSync(fullPath, 'utf-8')
  const occurrences = content.split(find).length - 1
  if (occurrences === 0) {
    console.log(`WARN (no match): ${relPath}`)
    continue
  }
  const newContent = content.split(find).join(replace)
  fs.writeFileSync(fullPath, newContent, 'utf-8')
  console.log(`FIXED (${occurrences}x): ${relPath}`)
}