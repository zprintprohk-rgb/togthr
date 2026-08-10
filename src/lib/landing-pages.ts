// src/lib/landing-pages.ts
//
// Programmatic SEO landing pages — 26 long-tail landing pages
// (S3 content cleanup 2026-08-11: removed 22 couple-themed slugs;
//  self 8 + bff 8 + tmg 8 + discovery 2 = 26 × 8 locales = 208 routable URLs).
//
// Layout:
//   - /[locale]/p/{slug}  →  26 per-slug folders, each with a self-contained
//     page.tsx that ships EN body content and reuses it for the 7 other locales
//     (locales' <html lang> + meta title/description + hreflang still vary).
//   - This registry provides metadata used by the sitemap + a centralised
//     "all slugs" helper for any consumer that needs the full list.
//
// Scenario groups (one pet-image per group, used on the hero):
//   - self      :  solo, lonely desk, work-from-home, students
//   - bff       :  best friend / friendship rituals
//   - tmg       :  tamagotchi / nostalgia
//   - discovery :  comparison / emotional support
//
// IMPORTANT (5 hard facts from K3 calibration, do NOT drift):
//   1. CTA must be "Start free in your browser" — Togthr is a pure web app,
//      no native clients (Windows / Mac / iOS / Android).
//   2. Subscription only: $5.49 / month, $37.99 / year. Never one-time/lifetime.
//   3. Five growth stages, baby → legend. Never "ascension" or "coming soon".
//   4. CTA on /p/ goes to /en (Togthr sign-up, PayPal-backed, no WeChat/Alipay QR).
//   5. /pricing page keeps Alipay — that's a CN-region normal, not in scope here.

import type { Locale } from '@/i18n/routing'

export type LandingGroup = 'self' | 'bff' | 'tmg' | 'discovery'

export type LandingEntry = {
  slug: string
  group: LandingGroup
  /** Pet image used on the hero. Path under /public/pets. */
  hero: string
  /** Locale-specific meta title (≤ 60 chars). EN provided; other locales reuse EN. */
  title: string
  /** Locale-specific meta description (≤ 160 chars). EN provided; others reuse EN. */
  description: string
}

// ─── All 26 slugs (post-S3 cleanup), in shipping order ──────────────────────
// Group 1 — self / lonely desk / focus
const selfSlugs = [
  'lonely-desk-companion',
  'pixel-pet-for-focus',
  'cute-desktop-buddy-for-students',
  'desktop-pet-for-work-from-home',
  'quiet-companion-app-no-chat',
  'desk-pet-for-coders',
  'pixel-buddy-for-study-sessions',
  'low-pressure-companion-app',
]

// Group 3 — bff / friendship
const bffSlugs = [
  'virtual-pet-to-share-with-best-friend',
  'bff-desktop-buddy-app',
  'friendship-check-in-app',
  'long-distance-friendship-app',
  'shared-pixel-pet-with-friends',
  'best-friend-daily-ritual-app',
  'desktop-pet-for-besties',
  'stay-in-touch-app-for-friends',
]

// Group 4 — tamagotchi / nostalgia
const tmgSlugs = [
  'tamagotchi-for-desktop',
  'modern-tamagotchi-app-2026',
  'tamagotchi-alternative-for-adults',
  'pixel-pet-like-tamagotchi',
  'desktop-tamagotchi-windows',
  'tamagotchi-30th-anniversary-app',
  'virtual-pet-that-grows-up-like-tamagotchi',
  'tamagotchi-for-work-computer',
]

// Group 5 — discovery / emotional support (was: rituals + discovery)
const discoverySlugs = [
  'virtual-pet-for-emotional-support',
  'a-pixel-pet-that-notices-you',
]

// Hero image per group. We deliberately pick from /public/pets so no new assets.
const GROUP_HERO: Record<LandingGroup, string> = {
  self: '/pets/scene-rainy.png',
  bff: '/pets/scene-birthday.png',
  tmg: '/pets/anim-idle-1.png',
  discovery: '/pets/character-sheet.png',
}

// ─── Title / description per slug (EN — other locales reuse) ───────────────
// Titles: 50–60 chars. Descriptions: 150–160 chars. Optimised for the
// long-tail keyword the slug represents. No claims outside the product.

const TITLES: Record<string, string> = {
  // self
  'lonely-desk-companion': 'A Lonely Desk Companion That Actually Stays — Togthr',
  'pixel-pet-for-focus': 'A Pixel Pet That Helps You Focus — Togthr',
  'cute-desktop-buddy-for-students': 'A Cute Desktop Buddy for Students — Togthr',
  'desktop-pet-for-work-from-home': 'A Desktop Pet for Working From Home — Togthr',
  'quiet-companion-app-no-chat': 'A Quiet Companion App With No Chat — Togthr',
  'desk-pet-for-coders': 'A Desk Pet for Coders — Togthr',
  'pixel-buddy-for-study-sessions': 'A Pixel Buddy for Study Sessions — Togthr',
  'low-pressure-companion-app': 'A Low-Pressure Companion App — Togthr',
  // bff
  'virtual-pet-to-share-with-best-friend': 'A Virtual Pet to Share With Your Best Friend',
  'bff-desktop-buddy-app': 'A BFF Desktop Buddy App — Togthr',
  'friendship-check-in-app': 'A Friendship Check-in App — Togthr',
  'long-distance-friendship-app': 'A Long-Distance Friendship App — Togthr',
  'shared-pixel-pet-with-friends': 'A Shared Pixel Pet With Friends — Togthr',
  'best-friend-daily-ritual-app': 'A Best-Friend Daily Ritual App — Togthr',
  'desktop-pet-for-besties': 'A Desktop Pet for Besties — Togthr',
  'stay-in-touch-app-for-friends': 'A Stay-in-Touch App for Friends — Togthr',
  // tmg
  'tamagotchi-for-desktop': 'Tamagotchi for Your Desktop — Togthr',
  'modern-tamagotchi-app-2026': 'A Modern Tamagotchi App for 2026 — Togthr',
  'tamagotchi-alternative-for-adults': 'A Tamagotchi Alternative for Adults — Togthr',
  'pixel-pet-like-tamagotchi': 'A Pixel Pet Like Tamagotchi, but Quieter — Togthr',
  'desktop-tamagotchi-windows': 'A Desktop Tamagotchi for Your Browser — Togthr',
  'tamagotchi-30th-anniversary-app': 'A Tamagotchi 30th-Anniversary Companion — Togthr',
  'virtual-pet-that-grows-up-like-tamagotchi': 'A Virtual Pet That Grows Up Like Tamagotchi',
  'tamagotchi-for-work-computer': 'A Tamagotchi for Your Work Computer — Togthr',
  // discovery
  'virtual-pet-for-emotional-support': 'A Virtual Pet for Emotional Support — Togthr',
  'a-pixel-pet-that-notices-you': 'A Pixel Pet That Notices You — Togthr',
}

const DESCRIPTIONS: Record<string, string> = {
  // self
  'lonely-desk-companion': 'A lonely desk companion that does not ask for a conversation. A small pixel pet that just sits with you while you work. Free to start in browser.',
  'pixel-pet-for-focus': 'A pixel pet for focus: it works alongside you, cheers when you finish, and never nags. Lives in your browser, no install, no notifications storm.',
  'cute-desktop-buddy-for-students': 'A cute desktop buddy for students. Sits on your screen during study sessions, grows as your streak does, never makes you feel guilty.',
  'desktop-pet-for-work-from-home': 'A desktop pet for working from home. Quiet, present, and grown by your own check-ins. The 8 a.m. to 6 p.m. companion you did not know you needed.',
  'quiet-companion-app-no-chat': 'A quiet companion app with no chat. No endless DMs, no reply anxiety. Just a small pixel pet that grows as you keep showing up.',
  'desk-pet-for-coders': 'A desk pet for coders. Togthr Bot reacts to your focus sessions, cheers you on, and grows over months. Free to start in your browser.',
  'pixel-buddy-for-study-sessions': 'A pixel buddy for study sessions that lives in the corner of your screen. Visible growth, zero streak shame. Start free, $5.49/mo if you stay.',
  'low-pressure-companion-app': 'A low-pressure companion app for anyone tired of social. A small pet that grows, no friends list, no feed, no notifications unless you want them.',
  // bff
  'virtual-pet-to-share-with-best-friend': 'A virtual pet to share with your best friend, even across time zones. Both of you write a sentence, the pet grows. Free to start.',
  'bff-desktop-buddy-app': 'A BFF desktop buddy app: a shared pixel pet that lives in your browser and grows as you two keep showing up. The quietest way to stay close.',
  'friendship-check-in-app': 'A friendship check-in app built around a small shared pet, not a feed. One sentence a day each, the pet grows. No ads, no streaks.',
  'long-distance-friendship-app': 'A long-distance friendship app for grown-ups. A shared pixel pet that lives in your browser, grows as you keep in touch, free to start.',
  'shared-pixel-pet-with-friends': 'A shared pixel pet with friends: you and a friend write a sentence each day, the pet grows through 5 stages. The simplest ritual we know.',
  'best-friend-daily-ritual-app': 'A best-friend daily ritual app that is not a social network. A small pet, a shared sentence, no streaks. Try it free, $5.49/mo to keep it.',
  'desktop-pet-for-besties': 'A desktop pet for besties. Lives in your browser, grows with the friendship, and remembers the boring Tuesdays as well as the big news.',
  'stay-in-touch-app-for-friends': 'A stay-in-touch app for friends who keep meaning to text more. A small pet that nudges no one, just grows as you both show up.',
  // tmg
  'tamagotchi-for-desktop': 'A Tamagotchi for your desktop, but it never dies and never punishes you. 5 growth stages, lives in your browser, free to start.',
  'modern-tamagotchi-app-2026': 'A modern Tamagotchi app for 2026. Pixel art, 5 growth stages, 6 hidden skins, and a 1-in-72 chance of a golden edition. Subscription: $5.49/mo.',
  'tamagotchi-alternative-for-adults': 'A Tamagotchi alternative for adults: the same care-and-grow loop, but no death anxiety, no keychain, lives in your browser, and remembers your days.',
  'pixel-pet-like-tamagotchi': 'A pixel pet like Tamagotchi, but quieter and gentler. Lives in your browser, grows through 5 stages, and never dies if you forget for a weekend.',
  'desktop-tamagotchi-windows': 'A desktop Tamagotchi that runs in your browser on Windows, Mac, or any laptop. No install, no keychain, just a small pixel friend on your screen.',
  'tamagotchi-30th-anniversary-app': 'A Tamagotchi 30th-anniversary companion: the care-and-grow loop, but in your browser, with 5 growth stages and a 1-in-72 golden edition.',
  'virtual-pet-that-grows-up-like-tamagotchi': 'A virtual pet that grows up like Tamagotchi, baby to legend, in 5 stages. Lives in your browser, never punishes, never dies. Free to start.',
  'tamagotchi-for-work-computer': 'A Tamagotchi for your work computer: a small pixel pet that sits beside you through the day and grows as you keep showing up. No install required.',
  // discovery
  'virtual-pet-for-emotional-support': 'A virtual pet for emotional support that asks nothing of you. Lives in your browser, grows through 5 stages, waits when you are tired.',
  'a-pixel-pet-that-notices-you': 'A pixel pet that notices you: it grows when you show up, pauses when you rest, and the small creature in the corner remembers the month you just had.',
}

// ─── Slug → group map (derived) ─────────────────────────────────────────────

const GROUP_OF: Record<string, LandingGroup> = (() => {
  const m: Record<string, LandingGroup> = {}
  for (const s of selfSlugs) m[s] = 'self'
  for (const s of bffSlugs) m[s] = 'bff'
  for (const s of tmgSlugs) m[s] = 'tmg'
  for (const s of discoverySlugs) m[s] = 'discovery'
  return m
})()

// ─── Public lookup helpers ──────────────────────────────────────────────────

export const ALL_SLUGS: string[] = [...selfSlugs, ...bffSlugs, ...tmgSlugs, ...discoverySlugs]

export const SITE_URL = 'https://www.togthr.life'

export function getLandingGroup(slug: string): LandingGroup {
  return GROUP_OF[slug] ?? 'self'
}

export function getLandingHero(slug: string): string {
  return GROUP_HERO[getLandingGroup(slug)]
}

/** The full landing entry for one slug. EN-only meta; consumers render the
 *  same body for every locale. */
export function getLandingEntry(slug: string): LandingEntry | undefined {
  if (!ALL_SLUGS.includes(slug)) return undefined
  return {
    slug,
    group: getLandingGroup(slug),
    hero: getLandingHero(slug),
    title: TITLES[slug],
    description: DESCRIPTIONS[slug],
  }
}

export function getLandingEntries(): LandingEntry[] {
  return ALL_SLUGS.map((slug) => getLandingEntry(slug)!).filter(Boolean)
}

export function getLandingUrl(slug: string, locale: Locale): string {
  return `${SITE_URL}/${locale}/p/${slug}`
}
