#!/usr/bin/env node
/**
 * Scan for dark mode regressions from c33a3d7:
 *  - className strings with multiple `dark:bg-*`, `dark:text-*`, `dark:border-*`
 *    that may conflict (last-wins in CSS source order)
 *
 * We DON'T auto-fix. We just report.
 */
const fs = require('fs')
const path = require('path')

const baseDir = 'F:/CloudDreamerApp/togthr/src'
const findings = []

function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name)
    if (item.isDirectory()) walk(full)
    else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) scan(full)
  }
}

function scan(fullPath) {
  const content = fs.readFileSync(fullPath, 'utf-8')
  // Find className="..." (single line)
  const re = /className=(["'`])([^"'`\n]*)\1/g
  let m
  while ((m = re.exec(content))) {
    const cls = m[2]
    if (!cls.includes('dark:')) continue

    const darkBg = (cls.match(/\bdark:bg-[a-z0-9\/\[\]\.]+/g) || [])
    const darkText = (cls.match(/\bdark:text-[a-z0-9\/\[\]\.]+/g) || [])
    const darkBorder = (cls.match(/\bdark:border-[a-z0-9\/\[\]\.]+/g) || [])
    const darkHoverBg = (cls.match(/\bdark:hover:bg-[a-z0-9\/\[\]\.]+/g) || [])

    const issues = []
    if (darkBg.length > 1) issues.push(`multiple dark:bg → ${darkBg.join(', ')}`)
    if (darkText.length > 1) issues.push(`multiple dark:text → ${darkText.join(', ')}`)
    if (darkBorder.length > 1) issues.push(`multiple dark:border → ${darkBorder.join(', ')}`)
    if (darkHoverBg.length > 1) issues.push(`multiple dark:hover:bg → ${darkHoverBg.join(', ')}`)

    if (issues.length) {
      const line = content.slice(0, m.index).split('\n').length
      findings.push({
        file: fullPath,
        line,
        className: cls,
        issues,
      })
    }
  }
}

walk(baseDir)

console.log(`Found ${findings.length} className strings with multiple dark:* of same property:\n`)
for (const f of findings) {
  console.log(`---\n${f.file}:${f.line}`)
  console.log(`  ${f.issues.join(' | ')}`)
  console.log(`  className: ${f.className.slice(0, 200)}${f.className.length > 200 ? '...' : ''}`)
}