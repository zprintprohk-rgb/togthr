const fs = require('fs')
const dir = 'messages/'
const files = ['en.json','zh-cn.json','zh-tw.json','ja.json','ko.json','de.json','fr.json','es.json']

for (const f of files) {
  let raw = fs.readFileSync(dir+f, 'utf-8')
  // Current state: after community's closing '}' on its own line,
  // we have ',\n"errorPage":' at col 0 instead of ',\n  "errorPage":'
  // Fix by replacing the pattern
  const fixed = raw.replace(/\n,\n"errorPage"/, ',\n  "errorPage"')
  fs.writeFileSync(dir+f, fixed, 'utf-8')
  console.log('Fixed: ' + f)
}
