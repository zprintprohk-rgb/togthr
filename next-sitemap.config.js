/** @type {import('next-sitemap').IConfig} */
const SITE_URL = 'https://togthr.life'

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: false,
  exclude: ['/api/*', '/server-sitemap.xml'],
  alternateRefs: [
    { href: `${SITE_URL}/`, hreflang: 'en' },
    { href: `${SITE_URL}/zh-cn`, hreflang: 'zh-cn' },
    { href: `${SITE_URL}/zh-tw`, hreflang: 'zh-tw' },
    { href: `${SITE_URL}/ja`, hreflang: 'ja' },
    { href: `${SITE_URL}/ko`, hreflang: 'ko' },
    { href: `${SITE_URL}/de`, hreflang: 'de' },
    { href: `${SITE_URL}/fr`, hreflang: 'fr' },
    { href: `${SITE_URL}/es`, hreflang: 'es' },
    { href: `${SITE_URL}/`, hreflang: 'x-default' },
  ],
  additionalPaths: async (config) => {
    const paths = []
    const nonDefaultLocales = ['zh-cn', 'zh-tw', 'ja', 'ko', 'de', 'fr', 'es']
    const routes = ['', '/faq', '/guide', '/pricing', '/login', '/register']

    // default locale (en) uses root path — no locale prefix
    for (const route of routes) {
      paths.push({
        loc: `${route}`,
        changefreq: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.7,
        lastmod: new Date().toISOString(),
      })
    }

    // non-default locales use prefixed paths
    for (const locale of nonDefaultLocales) {
      for (const route of routes) {
        paths.push({
          loc: `/${locale}${route}`,
          changefreq: route === '' ? 'weekly' : 'monthly',
          priority: route === '' ? 1.0 : 0.7,
          lastmod: new Date().toISOString(),
        })
      }
    }
    return paths
  },
}