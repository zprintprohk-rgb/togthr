// Check if the latest deployed version has the dark mode fixes
fetch('https://togthr.life')
  .then(r => {
    console.log('Status:', r.status)
    return r.text()
  })
  .then(t => {
    // Check for FORCE_DARK_SCRIPT
    const hasForceScript = t.includes('classList.add') && t.includes('dark')
    const htmlTag = t.match(/<html[^>]*>/)?.[0] || 'not found'
    const hasColorScheme = t.includes('color-scheme') || t.includes('colorScheme')
    
    // Check CSS for main { background
    const cssLinks = t.match(/href="(\/_next\/static\/css\/[^"]+)"/g) || []
    
    console.log('HTML tag:', htmlTag.substring(0, 200))
    console.log('Has FORCE_DARK_SCRIPT:', hasForceScript)
    console.log('Has colorScheme meta:', hasColorScheme)
    console.log('CSS files:', cssLinks.length)
    
    // Fetch main CSS and check for main { background
    return Promise.all(
      cssLinks.map(l => {
        const url = l.match(/href="([^"]+)"/)[1]
        return fetch('https://togthr.life' + url).then(r => r.text()).then(css => {
          const hasMainBg = css.includes('main') && css.includes('background') && css.includes('0B0B1A')
          const hasHtmlBg = css.includes('html') && css.includes('background')
          const darkPatterns = (css.match(/\.dark/g) || []).length
          console.log(`  ${url.split('/').pop()}: main-bg=${hasMainBg} html-bg=${hasHtmlBg} .dark-patterns=${darkPatterns} size=${css.length}`)
        })
      })
    )
  })
  .then(() => console.log('Done'))
  .catch(e => console.log('Error:', e.message))
