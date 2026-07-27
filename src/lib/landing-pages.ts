// src/lib/landing-pages.ts
//
// Phase 1 programmatic SEO — 32 long-tail landing pages
// 4 scenario groups × 8 keywords = 32 pages × 8 locales = 256 routable URLs.
//
// Layout:
//   - /[locale]/p/{slug}  →  32 per-slug folders, each with a self-contained
//     page.tsx that ships EN body content and reuses it for the 7 other locales
//     (locales' <html lang> + meta title/description + hreflang still vary).
//   - This registry provides metadata used by the sitemap + a centralised
//     "all slugs" helper for any consumer that needs the full list.
//
// Scenario groups (one pet-image per group, used on the hero):
//   - couple  :  for two people in a relationship, long-distance or close
//   - self    :  solo, lonely desk, work-from-home, students
//   - bff     :  best friend / friendship rituals
//   - tmg     :  tamagotchi / nostalgia
//
// IMPORTANT (5 hard facts from K3 calibration, do NOT drift):
//   1. CTA must be "Start free in your browser" — Togthr is a pure web app,
//      no native clients (Windows / Mac / iOS / Android).
//   2. Subscription only: $5.49 / month, $37.99 / year. Never one-time/lifetime.
//   3. Five growth stages, baby → legend. Never "ascension" or "coming soon".
//   4. CTA on /p/ goes to /en (Togthr sign-up, PayPal-backed, no WeChat/Alipay QR).
//   5. /pricing page keeps Alipay — that's a CN-region normal, not in scope here.

import type { Locale } from '@/i18n/routing'

export type LandingGroup = 'couple' | 'self' | 'bff' | 'tmg' | 'rituals' | 'discovery'

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

// ─── All 48 slugs (Phase 1 32 + Round 2 16), in shipping order ────────────
// Group 1 — couple / long-distance
const coupleSlugs = [
  'couple-desktop-pet-app',
  'long-distance-relationship-widget',
  'virtual-pet-for-couples',
  'shared-pet-app-for-two',
  'desktop-companion-for-long-distance-couples',
  'couple-check-in-app-with-pet',
  'pixel-pet-for-couples',
  'relationship-pet-that-grows',
]

// Group 2 — self / lonely desk / focus
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

// Group 5 — rituals / relationship tooling (Round 2)
const ritualsSlugs = [
  'shared-journal-app-for-couples',
  'time-capsule-app-for-two',
  'couple-mood-tracker-app',
  'anniversary-countdown-app-couples',
  'daily-questions-for-couples-app',
  'couple-goals-tracker-app',
  'private-journal-for-couples-app',
  'couple-bedtime-routine-app',
]

// Group 6 — discovery / comparison (Round 2)
const discoverySlugs = [
  'best-app-for-couples-in-long-distance',
  'best-virtual-pet-app-for-couples-2026',
  'free-couple-app-with-ai-companion',
  'the-quietest-couple-app',
  'virtual-pet-for-emotional-support',
  'a-pixel-pet-that-notices-you',
  'couple-app-without-social-pressure',
  'small-daily-ritual-app-for-two',
]

// Hero image per group. We deliberately pick from /public/pets so no new assets.
const GROUP_HERO: Record<LandingGroup, string> = {
  couple: '/pets/scene-progress.png',
  self: '/pets/scene-rainy.png',
  bff: '/pets/scene-birthday.png',
  tmg: '/pets/anim-idle-1.png',
  rituals: '/pets/scene-rainy.png',
  discovery: '/pets/character-sheet.png',
}

// ─── Title / description per slug (EN — other locales reuse) ───────────────
// Titles: 50–60 chars. Descriptions: 150–160 chars. Optimised for the
// long-tail keyword the slug represents. No claims outside the product.

const TITLES: Record<string, string> = {
  // couple
  'couple-desktop-pet-app': 'Couple Desktop Pet App — Togthr',
  'long-distance-relationship-widget': 'Long-Distance Relationship Widget — Togthr',
  'virtual-pet-for-couples': 'A Virtual Pet for Couples — Togthr',
  'shared-pet-app-for-two': 'A Shared Pet App for Two — Togthr',
  'desktop-companion-for-long-distance-couples': 'A Desktop Companion for Long-Distance Couples',
  'couple-check-in-app-with-pet': 'A Couple Check-in App With a Pet — Togthr',
  'pixel-pet-for-couples': 'A Pixel Pet for Couples — Togthr',
  'relationship-pet-that-grows': 'A Relationship Pet That Grows With You — Togthr',
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
  // rituals (Round 2)
  'shared-journal-app-for-couples': 'A Shared Journal App for Couples — Togthr',
  'time-capsule-app-for-two': 'A Time Capsule App for Two — Togthr',
  'couple-mood-tracker-app': 'A Couple Mood Tracker App — Togthr',
  'anniversary-countdown-app-couples': 'An Anniversary Countdown App for Couples',
  'daily-questions-for-couples-app': 'Daily Questions for Couples — A Gentle App',
  'couple-goals-tracker-app': 'A Couple Goals Tracker App — Togthr',
  'private-journal-for-couples-app': 'A Private Journal for Couples — Togthr',
  'couple-bedtime-routine-app': 'A Couple Bedtime Routine App — Togthr',
  // discovery (Round 2)
  'best-app-for-couples-in-long-distance': 'Best App for Couples in Long Distance',
  'best-virtual-pet-app-for-couples-2026': 'Best Virtual Pet App for Couples 2026',
  'free-couple-app-with-ai-companion': 'A Free Couple App With an AI Companion',
  'the-quietest-couple-app': 'The Quietest Couple App on the Internet',
  'virtual-pet-for-emotional-support': 'A Virtual Pet for Emotional Support — Togthr',
  'a-pixel-pet-that-notices-you': 'A Pixel Pet That Notices You — Togthr',
  'couple-app-without-social-pressure': 'A Couple App Without Social Pressure',
  'small-daily-ritual-app-for-two': 'A Small Daily Ritual App for Two — Togthr',
}

const DESCRIPTIONS: Record<string, string> = {
  // couple
  'couple-desktop-pet-app': 'Togthr is a small pixel pet that lives in your browser and grows with your relationship. No ads, no streak pressure, no chat. Subscription: $5.49/mo.',
  'long-distance-relationship-widget': 'A long-distance relationship widget that is more than a wallpaper: a shared pixel pet that grows as both of you keep showing up. Free to start.',
  'virtual-pet-for-couples': 'A virtual pet for couples that lives in your browser, not your lock screen. It grows through 5 stages and remembers your relationship. Try it free.',
  'shared-pet-app-for-two': 'A shared pet app for two people, not a chat app. You each write one sentence; the pet grows. No ads, no streaks. Subscription: $5.49/mo.',
  'desktop-companion-for-long-distance-couples': 'A desktop companion for long-distance couples. Togthr sits on your screen, grows with your relationship, and keeps a shared journal for you.',
  'couple-check-in-app-with-pet': 'A couple check-in app with a pet at the centre: one sentence each, then the pet grows. The quiet ritual that keeps curiosity alive.',
  'pixel-pet-for-couples': 'A pixel pet for couples that runs in your browser, grows in 5 stages, and unlocks 6 hidden career skins. No native app to install, no ads.',
  'relationship-pet-that-grows': 'A relationship pet that grows through 5 stages, baby to legend, only while both of you keep showing up. The quietest check-in we know.',
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
  // rituals (Round 2)
  'shared-journal-app-for-couples': 'A shared journal app for couples built around a pixel pet that grows as you write. No ads, no feed, no streaks. Free to start in your browser.',
  'time-capsule-app-for-two': 'A time capsule app for two: write a sentence today, lock it, and open it together on a future date. The pet guards the capsule until then.',
  'couple-mood-tracker-app': 'A couple mood tracker app with a pixel pet that changes its mood alongside yours. No typing required — just tap how you feel.',
  'anniversary-countdown-app-couples': 'An anniversary countdown app for couples with a pet that grows toward the date alongside you. The countdown is the ritual, the pet is the reward.',
  'daily-questions-for-couples-app': 'Daily questions for couples, answered in one sentence each, held by a small pixel pet that grows with every answer. No chat, no feed.',
  'couple-goals-tracker-app': 'A couple goals tracker app where a small pet grows with each shared goal you reach. The pet remembers the wins, including the small ones.',
  'private-journal-for-couples-app': 'A private journal for couples that lives in your browser. One sentence a day each, a pet that grows, and no-one else reading.',
  'couple-bedtime-routine-app': 'A couple bedtime routine app: one quiet sentence before sleep, one pixel pet that grows, one small ritual that keeps the distance from growing.',
  // discovery (Round 2)
  'best-app-for-couples-in-long-distance': 'Looking for the best app for couples in long distance? Togthr is a pixel pet that grows as you two keep showing up, with no pressure.',
  'best-virtual-pet-app-for-couples-2026': 'The best virtual pet app for couples in 2026. A small pixel pet, shared between two, growing through 5 stages. No ads, free to start.',
  'free-couple-app-with-ai-companion': 'A free couple app with an AI companion that does not chat. A small pixel pet that grows, remembers, and keeps the relationship visible.',
  'the-quietest-couple-app': 'The quietest couple app on the internet: a small pixel pet, one sentence a day, no chat, no feed, no streaks. Try it free in your browser.',
  'virtual-pet-for-emotional-support': 'A virtual pet for emotional support that asks nothing of you. Lives in your browser, grows through 5 stages, waits when you are tired.',
  'a-pixel-pet-that-notices-you': 'A pixel pet that notices you: it grows when you show up, pauses when you rest, and the small creature in the corner remembers the month you just had.',
  'couple-app-without-social-pressure': 'A couple app without social pressure: a small pixel pet, one sentence a day, no friends list, no like count, no feed. Just two people and a pet.',
  'small-daily-ritual-app-for-two': 'A small daily ritual app for two: one sentence each, one growing pixel pet, one quiet thread that keeps the friendship from drifting.',
}

// ─── Slug → group map (derived) ─────────────────────────────────────────────

const GROUP_OF: Record<string, LandingGroup> = (() => {
  const m: Record<string, LandingGroup> = {}
  for (const s of coupleSlugs) m[s] = 'couple'
  for (const s of selfSlugs) m[s] = 'self'
  for (const s of bffSlugs) m[s] = 'bff'
  for (const s of tmgSlugs) m[s] = 'tmg'
  for (const s of ritualsSlugs) m[s] = 'rituals'
  for (const s of discoverySlugs) m[s] = 'discovery'
  return m
})()

// ─── Public lookup helpers ──────────────────────────────────────────────────

export const ALL_SLUGS: string[] = [...coupleSlugs, ...selfSlugs, ...bffSlugs, ...tmgSlugs, ...ritualsSlugs, ...discoverySlugs]

export const SITE_URL = 'https://togthr.life'

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

// Always include the locale prefix (including EN) so the canonical + hreflang
// URLs match the actual route that CF Pages' OpenNext dispatch serves. The
// as-needed EN URL (e.g. /p/{slug} without /en/) is not currently dispatched
// on the OpenNext worker, so we route everything through /{locale}/p/{slug}.
export function getLandingUrl(slug: string, locale: Locale): string {
  return `${SITE_URL}/${locale}/p/${slug}`
}
