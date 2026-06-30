#!/usr/bin/env node
/**
 * Categorize dark mode regressions:
 *  - Look at className BEFORE and AFTER c33a3d7 to see what was added
 *  - Print clear (before) -> (after) so we can decide what to revert
 */
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const baseDir = 'F:/CloudDreamerApp/togthr/src'

function gitShow(file, line) {
  // Get the line at the file BEFORE commit c33a3d7
  try {
    const out = execSync(
      `git show c33a3d7^:${file.replace(/\\/g, '/')}`,
      { cwd: 'F:/CloudDreamerApp/togthr', encoding: 'utf-8' }
    )
    const lines = out.split('\n')
    return lines[line - 1] || ''
  } catch (e) {
    return `<git show failed: ${e.message}>`
  }
}

function walk(dir) {
  const files = []
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name)
    if (item.isDirectory()) files.push(...walk(full))
    else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts')) files.push(full)
  }
  return files
}

const findings = []
for (const file of walk(baseDir)) {
  const content = fs.readFileSync(file, 'utf-8')
  const re = /className=(["'`])([^"'`\n]*)\1/g
  let m
  while ((m = re.exec(content))) {
    const cls = m[2]
    const darkBg = (cls.match(/\bdark:bg-[a-z0-9\/\[\]\.\-]+/g) || [])
    const darkText = (cls.match(/\bdark:text-[a-z0-9\/\[\]\.\-]+/g) || [])
    const darkBorder = (cls.match(/\bdark:border-[a-z0-9\/\[\]\.\-]+/g) || [])
    const darkHoverBg = (cls.match(/\bdark:hover:bg-[a-z0-9\/\[\]\.\-]+/g) || [])

    if (darkBg.length <= 1 && darkText.length <= 1 && darkBorder.length <= 1 && darkHoverBg.length <= 1) continue

    const line = content.slice(0, m.index).split('\n').length
    const before = gitShow(file, line)
    // Extract className from before
    const beforeMatch = before.match(/className=(["'`])([^"'`\n]*)\1/)
    const beforeCls = beforeMatch ? beforeMatch[2] : '<parse failed>'

    findings.push({
      file: file.replace(/.*togthr\\src\\/, 'src/').replace(/\\/g, '/'),
      line,
      before: beforeCls,
      after: cls,
      conflicts: { darkBg, darkText, darkBorder, darkHoverBg },
    })
  }
}

console.log(`Found ${findings.length} classNames with multiple dark:* of same property:\n`)
for (const f of findings) {
  console.log(`=== ${f.file}:${f.line} ===`)
  console.log(`BEFORE: ${f.before}`)
  console.log(`AFTER:  ${f.after}`)
  console.log(`CONFLICTS: bg=${f.conflicts.darkBg.length} text=${f.conflicts.darkText.length} border=${f.conflicts.darkBorder.length} hover:bg=${f.conflicts.darkHoverBg.length}`)
  console.log(``)
}