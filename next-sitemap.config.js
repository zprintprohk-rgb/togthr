/** @type {import('next-sitemap').IConfig} */
const SITE_URL = 'https://www.togthr.life'

module.exports = {
  siteUrl: SITE_URL,
  generateRobotsTxt: false,
  exclude: [
    '/api/*',
    '/server-sitemap.xml',
    '/robots.txt',
    '/sitemap.xml',
    '/sitemap-0.xml',
    '/manifest.webmanifest',
    '/icon.png',
    '/favicon.ico',
    '/*/payment/*',
    '/*/dev/*', // 内部 QA 页面（buddy showcase 等），不进入 sitemap
  ],
  // ⚠️ No alternateRefs — the locale layout already generates `<link rel="alternate">`
  // hreflang tags via Next.js metadata.out.alternates. Adding alternateRefs here
  // causes doubled locale prefixes (e.g., /zh-cn/de/faq) because next-sitemap
  // prepends the locale to already-locale-prefixed URLs.
  //
  // ⚠️ No additionalPaths — the build generates all 8 locale variants via
  // generateStaticParams. additionalPaths is redundant AND broke hreflang
  // by doubling locale prefixes in auto-generated alternates.
}
