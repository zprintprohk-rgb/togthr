// src/app/[locale]/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop/page.tsx
//
// Phase 1 (Task B) - programmatic blog post for the
// togthr.life /Togthr "small pixel pet" wedge. Single-file 8-locale
// static overlay page (pSEO pattern, EN body reused across all 8
// locales to respect the Phase 1 token cap; per-locale translation
// deferred to the next wave after this batch validates).
//
// Calibration (K3 hard facts, no drift allowed):
//   1. CTA "Start free in your browser" - pure web app, no native clients.
//   2. Subscription only $5.49/mo, $37.99/yr - never one-time/lifetime.
//   3. 5 stages: baby -> legend - never "ascension" or "coming soon".
//   4. /p/ CTA -> /en (PayPal, no WeChat/Alipay QR on overseas pages).
//   5. /pricing keeps Alipay (CN region, in scope elsewhere).

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `tamagotchi-30th-anniversary-from-pocket-to-desktop`
const POST_DATE = `2026-07-22`
const META_TITLE = "From Pocket to Desktop: 30 Years of Electronic Pets, and Where They Live Now" + ` - Togthr`
const META_DESC = "Tamagotchi turns 30 in 2026. The keychain creature that taught a generation to care has grown up, moved out of the keychain, and onto the browser tab. Here is t"

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

// EN content reused for all 8 locales this batch.
const BODIES: Record<Locale, Body> = {
    'en': {
    intro: "Tamagotchi turns 30 in 2026. The keychain creature that taught a generation to care has grown up, moved out of the keychain, and onto the browser tab. Here is the short history of the small pixel pet, and where it lives now.",
    sections: [
      { h: "The keychain years, 1996 to 2010", p: "The original Tamagotchi shipped in November 1996, and for most of its first decade it lived on a keychain. The keychain was a small, on-purpose place to forget a creature, and then to come back to it. It was also, by design, a place where a child could feel the small anxiety of forgetting to feed something that depended on them, and the small pride of remembering. The keychain version of this loop was loud in a way that mattered. You either took care of the creature, or it died. There was no middle ground. A generation learned to care by failing to care, over and over, on a plastic keychain." },
      { h: "The phone-app years, 2010 to 2020", p: "Around 2010 the keychain form factor faded and the creatures moved into the phone. Apps like Pou and the early Neko Atsume did very well, but the loop changed. Phones have notifications, and notifications became the cue to feed the pet. The pet became, in practice, a small gamified chore: you got a buzz, you tapped a button, the pet stayed alive. The original anxiety was gone. So was most of the pride. The pet had become a thing you managed, not a thing you remembered." },
      { h: "The desktop-tab years, 2020 to now", p: "The current generation of small electronic pets lives where the actual hours of the day are: the desktop tab. Not the lock screen (the lock screen is for checking the time), and not the app grid (the app grid is a chore). The desktop tab is the screen most adults are already on for six to ten hours a day, and the pet that lives there is the one they will actually see. Togthr Bot is the clearest example: a small pixel pet that lives in your browser, never nags you, never punishes you for a quiet week, and grows through 5 stages (baby, toddler, teen, adult, legend) as you keep showing up. The form factor changed the loop back to what it was on the keychain. You forget, and you come back. The pet is patient, and so is the day." },
      { h: "What stayed the same, and what did not", p: "What stayed the same across 30 years is the basic idea: a small creature that grows only as long as you keep showing up for it. What did not stay the same is the punishment. The keychain punished forgetfulness. The phone-app era punished nothing, but the pet also did not really grow. The desktop-tab era is the first in 30 years where the pet can be patient and the loop can be quiet, and the growth is real. The Tamagotchi at 30 looks less like a keychain toy and more like a small browser companion that is happy to sit with you for a year, and a little less happy if you forget, but not angry." }
    ],
    cta: "Open Togthr in your browser and adopt the small pixel pet that has been waiting for 30 years to move out of the keychain. Start free in your browser.",
    faqs: [
      { q: "Is the Tamagotchi still a real product in 2026?", a: "Yes. Bandai ships new Tamagotchi devices every year, and the 30th-anniversary edition is one of the strongest years the line has had. The keychain form factor is not coming back to dominance, but the brand is healthy. The interesting 2026 question is not whether the original Tamagotchi is alive; it is whether the loop it invented is being done better on a screen you actually look at for eight hours a day." },
      { q: "Why is a desktop pet a better fit for adults than a keychain?", a: "Adults do not carry keychains the way they did in 1996, and the small high-stakes loop of a keychain Tamagotchi is not built for someone with a job, a child, or a long relationship. A desktop pet lowers the stakes, but not the satisfaction. You still get the feeling of a small creature that has visibly grown over a year. You just do not get the panic when you forget to feed it." },
      { q: "Can I have a keychain Tamagotchi and a Togthr pet at the same time?", a: "Yes, and many people do. The keychain version is the small high-stakes loop that lives on a physical object. The Togthr pet is the long low-stakes loop that lives in the browser. The two complement each other: the keychain is the daily fidget, the browser is the multi-month companion." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/tamagotchi-alternative-for-adults", label: "A Tamagotchi alternative for adults" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" },
      { href: "/en/blog/digital-pet-nostalgia-2026", label: "Why millennials are quietly returning to digital pets" }
    ],
    },
    'zh-cn': {
    intro: "Tamagotchi turns 30 in 2026. The keychain creature that taught a generation to care has grown up, moved out of the keychain, and onto the browser tab. Here is the short history of the small pixel pet, and where it lives now.",
    sections: [
      { h: "The keychain years, 1996 to 2010", p: "The original Tamagotchi shipped in November 1996, and for most of its first decade it lived on a keychain. The keychain was a small, on-purpose place to forget a creature, and then to come back to it. It was also, by design, a place where a child could feel the small anxiety of forgetting to feed something that depended on them, and the small pride of remembering. The keychain version of this loop was loud in a way that mattered. You either took care of the creature, or it died. There was no middle ground. A generation learned to care by failing to care, over and over, on a plastic keychain." },
      { h: "The phone-app years, 2010 to 2020", p: "Around 2010 the keychain form factor faded and the creatures moved into the phone. Apps like Pou and the early Neko Atsume did very well, but the loop changed. Phones have notifications, and notifications became the cue to feed the pet. The pet became, in practice, a small gamified chore: you got a buzz, you tapped a button, the pet stayed alive. The original anxiety was gone. So was most of the pride. The pet had become a thing you managed, not a thing you remembered." },
      { h: "The desktop-tab years, 2020 to now", p: "The current generation of small electronic pets lives where the actual hours of the day are: the desktop tab. Not the lock screen (the lock screen is for checking the time), and not the app grid (the app grid is a chore). The desktop tab is the screen most adults are already on for six to ten hours a day, and the pet that lives there is the one they will actually see. Togthr Bot is the clearest example: a small pixel pet that lives in your browser, never nags you, never punishes you for a quiet week, and grows through 5 stages (baby, toddler, teen, adult, legend) as you keep showing up. The form factor changed the loop back to what it was on the keychain. You forget, and you come back. The pet is patient, and so is the day." },
      { h: "What stayed the same, and what did not", p: "What stayed the same across 30 years is the basic idea: a small creature that grows only as long as you keep showing up for it. What did not stay the same is the punishment. The keychain punished forgetfulness. The phone-app era punished nothing, but the pet also did not really grow. The desktop-tab era is the first in 30 years where the pet can be patient and the loop can be quiet, and the growth is real. The Tamagotchi at 30 looks less like a keychain toy and more like a small browser companion that is happy to sit with you for a year, and a little less happy if you forget, but not angry." }
    ],
    cta: "Open Togthr in your browser and adopt the small pixel pet that has been waiting for 30 years to move out of the keychain. Start free in your browser.",
    faqs: [
      { q: "Is the Tamagotchi still a real product in 2026?", a: "Yes. Bandai ships new Tamagotchi devices every year, and the 30th-anniversary edition is one of the strongest years the line has had. The keychain form factor is not coming back to dominance, but the brand is healthy. The interesting 2026 question is not whether the original Tamagotchi is alive; it is whether the loop it invented is being done better on a screen you actually look at for eight hours a day." },
      { q: "Why is a desktop pet a better fit for adults than a keychain?", a: "Adults do not carry keychains the way they did in 1996, and the small high-stakes loop of a keychain Tamagotchi is not built for someone with a job, a child, or a long relationship. A desktop pet lowers the stakes, but not the satisfaction. You still get the feeling of a small creature that has visibly grown over a year. You just do not get the panic when you forget to feed it." },
      { q: "Can I have a keychain Tamagotchi and a Togthr pet at the same time?", a: "Yes, and many people do. The keychain version is the small high-stakes loop that lives on a physical object. The Togthr pet is the long low-stakes loop that lives in the browser. The two complement each other: the keychain is the daily fidget, the browser is the multi-month companion." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/tamagotchi-alternative-for-adults", label: "A Tamagotchi alternative for adults" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" },
      { href: "/en/blog/digital-pet-nostalgia-2026", label: "Why millennials are quietly returning to digital pets" }
    ],
    },
    'zh-tw': {
    intro: "Tamagotchi turns 30 in 2026. The keychain creature that taught a generation to care has grown up, moved out of the keychain, and onto the browser tab. Here is the short history of the small pixel pet, and where it lives now.",
    sections: [
      { h: "The keychain years, 1996 to 2010", p: "The original Tamagotchi shipped in November 1996, and for most of its first decade it lived on a keychain. The keychain was a small, on-purpose place to forget a creature, and then to come back to it. It was also, by design, a place where a child could feel the small anxiety of forgetting to feed something that depended on them, and the small pride of remembering. The keychain version of this loop was loud in a way that mattered. You either took care of the creature, or it died. There was no middle ground. A generation learned to care by failing to care, over and over, on a plastic keychain." },
      { h: "The phone-app years, 2010 to 2020", p: "Around 2010 the keychain form factor faded and the creatures moved into the phone. Apps like Pou and the early Neko Atsume did very well, but the loop changed. Phones have notifications, and notifications became the cue to feed the pet. The pet became, in practice, a small gamified chore: you got a buzz, you tapped a button, the pet stayed alive. The original anxiety was gone. So was most of the pride. The pet had become a thing you managed, not a thing you remembered." },
      { h: "The desktop-tab years, 2020 to now", p: "The current generation of small electronic pets lives where the actual hours of the day are: the desktop tab. Not the lock screen (the lock screen is for checking the time), and not the app grid (the app grid is a chore). The desktop tab is the screen most adults are already on for six to ten hours a day, and the pet that lives there is the one they will actually see. Togthr Bot is the clearest example: a small pixel pet that lives in your browser, never nags you, never punishes you for a quiet week, and grows through 5 stages (baby, toddler, teen, adult, legend) as you keep showing up. The form factor changed the loop back to what it was on the keychain. You forget, and you come back. The pet is patient, and so is the day." },
      { h: "What stayed the same, and what did not", p: "What stayed the same across 30 years is the basic idea: a small creature that grows only as long as you keep showing up for it. What did not stay the same is the punishment. The keychain punished forgetfulness. The phone-app era punished nothing, but the pet also did not really grow. The desktop-tab era is the first in 30 years where the pet can be patient and the loop can be quiet, and the growth is real. The Tamagotchi at 30 looks less like a keychain toy and more like a small browser companion that is happy to sit with you for a year, and a little less happy if you forget, but not angry." }
    ],
    cta: "Open Togthr in your browser and adopt the small pixel pet that has been waiting for 30 years to move out of the keychain. Start free in your browser.",
    faqs: [
      { q: "Is the Tamagotchi still a real product in 2026?", a: "Yes. Bandai ships new Tamagotchi devices every year, and the 30th-anniversary edition is one of the strongest years the line has had. The keychain form factor is not coming back to dominance, but the brand is healthy. The interesting 2026 question is not whether the original Tamagotchi is alive; it is whether the loop it invented is being done better on a screen you actually look at for eight hours a day." },
      { q: "Why is a desktop pet a better fit for adults than a keychain?", a: "Adults do not carry keychains the way they did in 1996, and the small high-stakes loop of a keychain Tamagotchi is not built for someone with a job, a child, or a long relationship. A desktop pet lowers the stakes, but not the satisfaction. You still get the feeling of a small creature that has visibly grown over a year. You just do not get the panic when you forget to feed it." },
      { q: "Can I have a keychain Tamagotchi and a Togthr pet at the same time?", a: "Yes, and many people do. The keychain version is the small high-stakes loop that lives on a physical object. The Togthr pet is the long low-stakes loop that lives in the browser. The two complement each other: the keychain is the daily fidget, the browser is the multi-month companion." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/tamagotchi-alternative-for-adults", label: "A Tamagotchi alternative for adults" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" },
      { href: "/en/blog/digital-pet-nostalgia-2026", label: "Why millennials are quietly returning to digital pets" }
    ],
    },
    'ja': {
    intro: "Tamagotchi turns 30 in 2026. The keychain creature that taught a generation to care has grown up, moved out of the keychain, and onto the browser tab. Here is the short history of the small pixel pet, and where it lives now.",
    sections: [
      { h: "The keychain years, 1996 to 2010", p: "The original Tamagotchi shipped in November 1996, and for most of its first decade it lived on a keychain. The keychain was a small, on-purpose place to forget a creature, and then to come back to it. It was also, by design, a place where a child could feel the small anxiety of forgetting to feed something that depended on them, and the small pride of remembering. The keychain version of this loop was loud in a way that mattered. You either took care of the creature, or it died. There was no middle ground. A generation learned to care by failing to care, over and over, on a plastic keychain." },
      { h: "The phone-app years, 2010 to 2020", p: "Around 2010 the keychain form factor faded and the creatures moved into the phone. Apps like Pou and the early Neko Atsume did very well, but the loop changed. Phones have notifications, and notifications became the cue to feed the pet. The pet became, in practice, a small gamified chore: you got a buzz, you tapped a button, the pet stayed alive. The original anxiety was gone. So was most of the pride. The pet had become a thing you managed, not a thing you remembered." },
      { h: "The desktop-tab years, 2020 to now", p: "The current generation of small electronic pets lives where the actual hours of the day are: the desktop tab. Not the lock screen (the lock screen is for checking the time), and not the app grid (the app grid is a chore). The desktop tab is the screen most adults are already on for six to ten hours a day, and the pet that lives there is the one they will actually see. Togthr Bot is the clearest example: a small pixel pet that lives in your browser, never nags you, never punishes you for a quiet week, and grows through 5 stages (baby, toddler, teen, adult, legend) as you keep showing up. The form factor changed the loop back to what it was on the keychain. You forget, and you come back. The pet is patient, and so is the day." },
      { h: "What stayed the same, and what did not", p: "What stayed the same across 30 years is the basic idea: a small creature that grows only as long as you keep showing up for it. What did not stay the same is the punishment. The keychain punished forgetfulness. The phone-app era punished nothing, but the pet also did not really grow. The desktop-tab era is the first in 30 years where the pet can be patient and the loop can be quiet, and the growth is real. The Tamagotchi at 30 looks less like a keychain toy and more like a small browser companion that is happy to sit with you for a year, and a little less happy if you forget, but not angry." }
    ],
    cta: "Open Togthr in your browser and adopt the small pixel pet that has been waiting for 30 years to move out of the keychain. Start free in your browser.",
    faqs: [
      { q: "Is the Tamagotchi still a real product in 2026?", a: "Yes. Bandai ships new Tamagotchi devices every year, and the 30th-anniversary edition is one of the strongest years the line has had. The keychain form factor is not coming back to dominance, but the brand is healthy. The interesting 2026 question is not whether the original Tamagotchi is alive; it is whether the loop it invented is being done better on a screen you actually look at for eight hours a day." },
      { q: "Why is a desktop pet a better fit for adults than a keychain?", a: "Adults do not carry keychains the way they did in 1996, and the small high-stakes loop of a keychain Tamagotchi is not built for someone with a job, a child, or a long relationship. A desktop pet lowers the stakes, but not the satisfaction. You still get the feeling of a small creature that has visibly grown over a year. You just do not get the panic when you forget to feed it." },
      { q: "Can I have a keychain Tamagotchi and a Togthr pet at the same time?", a: "Yes, and many people do. The keychain version is the small high-stakes loop that lives on a physical object. The Togthr pet is the long low-stakes loop that lives in the browser. The two complement each other: the keychain is the daily fidget, the browser is the multi-month companion." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/tamagotchi-alternative-for-adults", label: "A Tamagotchi alternative for adults" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" },
      { href: "/en/blog/digital-pet-nostalgia-2026", label: "Why millennials are quietly returning to digital pets" }
    ],
    },
    'ko': {
    intro: "Tamagotchi turns 30 in 2026. The keychain creature that taught a generation to care has grown up, moved out of the keychain, and onto the browser tab. Here is the short history of the small pixel pet, and where it lives now.",
    sections: [
      { h: "The keychain years, 1996 to 2010", p: "The original Tamagotchi shipped in November 1996, and for most of its first decade it lived on a keychain. The keychain was a small, on-purpose place to forget a creature, and then to come back to it. It was also, by design, a place where a child could feel the small anxiety of forgetting to feed something that depended on them, and the small pride of remembering. The keychain version of this loop was loud in a way that mattered. You either took care of the creature, or it died. There was no middle ground. A generation learned to care by failing to care, over and over, on a plastic keychain." },
      { h: "The phone-app years, 2010 to 2020", p: "Around 2010 the keychain form factor faded and the creatures moved into the phone. Apps like Pou and the early Neko Atsume did very well, but the loop changed. Phones have notifications, and notifications became the cue to feed the pet. The pet became, in practice, a small gamified chore: you got a buzz, you tapped a button, the pet stayed alive. The original anxiety was gone. So was most of the pride. The pet had become a thing you managed, not a thing you remembered." },
      { h: "The desktop-tab years, 2020 to now", p: "The current generation of small electronic pets lives where the actual hours of the day are: the desktop tab. Not the lock screen (the lock screen is for checking the time), and not the app grid (the app grid is a chore). The desktop tab is the screen most adults are already on for six to ten hours a day, and the pet that lives there is the one they will actually see. Togthr Bot is the clearest example: a small pixel pet that lives in your browser, never nags you, never punishes you for a quiet week, and grows through 5 stages (baby, toddler, teen, adult, legend) as you keep showing up. The form factor changed the loop back to what it was on the keychain. You forget, and you come back. The pet is patient, and so is the day." },
      { h: "What stayed the same, and what did not", p: "What stayed the same across 30 years is the basic idea: a small creature that grows only as long as you keep showing up for it. What did not stay the same is the punishment. The keychain punished forgetfulness. The phone-app era punished nothing, but the pet also did not really grow. The desktop-tab era is the first in 30 years where the pet can be patient and the loop can be quiet, and the growth is real. The Tamagotchi at 30 looks less like a keychain toy and more like a small browser companion that is happy to sit with you for a year, and a little less happy if you forget, but not angry." }
    ],
    cta: "Open Togthr in your browser and adopt the small pixel pet that has been waiting for 30 years to move out of the keychain. Start free in your browser.",
    faqs: [
      { q: "Is the Tamagotchi still a real product in 2026?", a: "Yes. Bandai ships new Tamagotchi devices every year, and the 30th-anniversary edition is one of the strongest years the line has had. The keychain form factor is not coming back to dominance, but the brand is healthy. The interesting 2026 question is not whether the original Tamagotchi is alive; it is whether the loop it invented is being done better on a screen you actually look at for eight hours a day." },
      { q: "Why is a desktop pet a better fit for adults than a keychain?", a: "Adults do not carry keychains the way they did in 1996, and the small high-stakes loop of a keychain Tamagotchi is not built for someone with a job, a child, or a long relationship. A desktop pet lowers the stakes, but not the satisfaction. You still get the feeling of a small creature that has visibly grown over a year. You just do not get the panic when you forget to feed it." },
      { q: "Can I have a keychain Tamagotchi and a Togthr pet at the same time?", a: "Yes, and many people do. The keychain version is the small high-stakes loop that lives on a physical object. The Togthr pet is the long low-stakes loop that lives in the browser. The two complement each other: the keychain is the daily fidget, the browser is the multi-month companion." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/tamagotchi-alternative-for-adults", label: "A Tamagotchi alternative for adults" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" },
      { href: "/en/blog/digital-pet-nostalgia-2026", label: "Why millennials are quietly returning to digital pets" }
    ],
    },
    'de': {
    intro: "Tamagotchi turns 30 in 2026. The keychain creature that taught a generation to care has grown up, moved out of the keychain, and onto the browser tab. Here is the short history of the small pixel pet, and where it lives now.",
    sections: [
      { h: "The keychain years, 1996 to 2010", p: "The original Tamagotchi shipped in November 1996, and for most of its first decade it lived on a keychain. The keychain was a small, on-purpose place to forget a creature, and then to come back to it. It was also, by design, a place where a child could feel the small anxiety of forgetting to feed something that depended on them, and the small pride of remembering. The keychain version of this loop was loud in a way that mattered. You either took care of the creature, or it died. There was no middle ground. A generation learned to care by failing to care, over and over, on a plastic keychain." },
      { h: "The phone-app years, 2010 to 2020", p: "Around 2010 the keychain form factor faded and the creatures moved into the phone. Apps like Pou and the early Neko Atsume did very well, but the loop changed. Phones have notifications, and notifications became the cue to feed the pet. The pet became, in practice, a small gamified chore: you got a buzz, you tapped a button, the pet stayed alive. The original anxiety was gone. So was most of the pride. The pet had become a thing you managed, not a thing you remembered." },
      { h: "The desktop-tab years, 2020 to now", p: "The current generation of small electronic pets lives where the actual hours of the day are: the desktop tab. Not the lock screen (the lock screen is for checking the time), and not the app grid (the app grid is a chore). The desktop tab is the screen most adults are already on for six to ten hours a day, and the pet that lives there is the one they will actually see. Togthr Bot is the clearest example: a small pixel pet that lives in your browser, never nags you, never punishes you for a quiet week, and grows through 5 stages (baby, toddler, teen, adult, legend) as you keep showing up. The form factor changed the loop back to what it was on the keychain. You forget, and you come back. The pet is patient, and so is the day." },
      { h: "What stayed the same, and what did not", p: "What stayed the same across 30 years is the basic idea: a small creature that grows only as long as you keep showing up for it. What did not stay the same is the punishment. The keychain punished forgetfulness. The phone-app era punished nothing, but the pet also did not really grow. The desktop-tab era is the first in 30 years where the pet can be patient and the loop can be quiet, and the growth is real. The Tamagotchi at 30 looks less like a keychain toy and more like a small browser companion that is happy to sit with you for a year, and a little less happy if you forget, but not angry." }
    ],
    cta: "Open Togthr in your browser and adopt the small pixel pet that has been waiting for 30 years to move out of the keychain. Start free in your browser.",
    faqs: [
      { q: "Is the Tamagotchi still a real product in 2026?", a: "Yes. Bandai ships new Tamagotchi devices every year, and the 30th-anniversary edition is one of the strongest years the line has had. The keychain form factor is not coming back to dominance, but the brand is healthy. The interesting 2026 question is not whether the original Tamagotchi is alive; it is whether the loop it invented is being done better on a screen you actually look at for eight hours a day." },
      { q: "Why is a desktop pet a better fit for adults than a keychain?", a: "Adults do not carry keychains the way they did in 1996, and the small high-stakes loop of a keychain Tamagotchi is not built for someone with a job, a child, or a long relationship. A desktop pet lowers the stakes, but not the satisfaction. You still get the feeling of a small creature that has visibly grown over a year. You just do not get the panic when you forget to feed it." },
      { q: "Can I have a keychain Tamagotchi and a Togthr pet at the same time?", a: "Yes, and many people do. The keychain version is the small high-stakes loop that lives on a physical object. The Togthr pet is the long low-stakes loop that lives in the browser. The two complement each other: the keychain is the daily fidget, the browser is the multi-month companion." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/tamagotchi-alternative-for-adults", label: "A Tamagotchi alternative for adults" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" },
      { href: "/en/blog/digital-pet-nostalgia-2026", label: "Why millennials are quietly returning to digital pets" }
    ],
    },
    'fr': {
    intro: "Tamagotchi turns 30 in 2026. The keychain creature that taught a generation to care has grown up, moved out of the keychain, and onto the browser tab. Here is the short history of the small pixel pet, and where it lives now.",
    sections: [
      { h: "The keychain years, 1996 to 2010", p: "The original Tamagotchi shipped in November 1996, and for most of its first decade it lived on a keychain. The keychain was a small, on-purpose place to forget a creature, and then to come back to it. It was also, by design, a place where a child could feel the small anxiety of forgetting to feed something that depended on them, and the small pride of remembering. The keychain version of this loop was loud in a way that mattered. You either took care of the creature, or it died. There was no middle ground. A generation learned to care by failing to care, over and over, on a plastic keychain." },
      { h: "The phone-app years, 2010 to 2020", p: "Around 2010 the keychain form factor faded and the creatures moved into the phone. Apps like Pou and the early Neko Atsume did very well, but the loop changed. Phones have notifications, and notifications became the cue to feed the pet. The pet became, in practice, a small gamified chore: you got a buzz, you tapped a button, the pet stayed alive. The original anxiety was gone. So was most of the pride. The pet had become a thing you managed, not a thing you remembered." },
      { h: "The desktop-tab years, 2020 to now", p: "The current generation of small electronic pets lives where the actual hours of the day are: the desktop tab. Not the lock screen (the lock screen is for checking the time), and not the app grid (the app grid is a chore). The desktop tab is the screen most adults are already on for six to ten hours a day, and the pet that lives there is the one they will actually see. Togthr Bot is the clearest example: a small pixel pet that lives in your browser, never nags you, never punishes you for a quiet week, and grows through 5 stages (baby, toddler, teen, adult, legend) as you keep showing up. The form factor changed the loop back to what it was on the keychain. You forget, and you come back. The pet is patient, and so is the day." },
      { h: "What stayed the same, and what did not", p: "What stayed the same across 30 years is the basic idea: a small creature that grows only as long as you keep showing up for it. What did not stay the same is the punishment. The keychain punished forgetfulness. The phone-app era punished nothing, but the pet also did not really grow. The desktop-tab era is the first in 30 years where the pet can be patient and the loop can be quiet, and the growth is real. The Tamagotchi at 30 looks less like a keychain toy and more like a small browser companion that is happy to sit with you for a year, and a little less happy if you forget, but not angry." }
    ],
    cta: "Open Togthr in your browser and adopt the small pixel pet that has been waiting for 30 years to move out of the keychain. Start free in your browser.",
    faqs: [
      { q: "Is the Tamagotchi still a real product in 2026?", a: "Yes. Bandai ships new Tamagotchi devices every year, and the 30th-anniversary edition is one of the strongest years the line has had. The keychain form factor is not coming back to dominance, but the brand is healthy. The interesting 2026 question is not whether the original Tamagotchi is alive; it is whether the loop it invented is being done better on a screen you actually look at for eight hours a day." },
      { q: "Why is a desktop pet a better fit for adults than a keychain?", a: "Adults do not carry keychains the way they did in 1996, and the small high-stakes loop of a keychain Tamagotchi is not built for someone with a job, a child, or a long relationship. A desktop pet lowers the stakes, but not the satisfaction. You still get the feeling of a small creature that has visibly grown over a year. You just do not get the panic when you forget to feed it." },
      { q: "Can I have a keychain Tamagotchi and a Togthr pet at the same time?", a: "Yes, and many people do. The keychain version is the small high-stakes loop that lives on a physical object. The Togthr pet is the long low-stakes loop that lives in the browser. The two complement each other: the keychain is the daily fidget, the browser is the multi-month companion." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/tamagotchi-alternative-for-adults", label: "A Tamagotchi alternative for adults" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" },
      { href: "/en/blog/digital-pet-nostalgia-2026", label: "Why millennials are quietly returning to digital pets" }
    ],
    },
    'es': {
    intro: "Tamagotchi turns 30 in 2026. The keychain creature that taught a generation to care has grown up, moved out of the keychain, and onto the browser tab. Here is the short history of the small pixel pet, and where it lives now.",
    sections: [
      { h: "The keychain years, 1996 to 2010", p: "The original Tamagotchi shipped in November 1996, and for most of its first decade it lived on a keychain. The keychain was a small, on-purpose place to forget a creature, and then to come back to it. It was also, by design, a place where a child could feel the small anxiety of forgetting to feed something that depended on them, and the small pride of remembering. The keychain version of this loop was loud in a way that mattered. You either took care of the creature, or it died. There was no middle ground. A generation learned to care by failing to care, over and over, on a plastic keychain." },
      { h: "The phone-app years, 2010 to 2020", p: "Around 2010 the keychain form factor faded and the creatures moved into the phone. Apps like Pou and the early Neko Atsume did very well, but the loop changed. Phones have notifications, and notifications became the cue to feed the pet. The pet became, in practice, a small gamified chore: you got a buzz, you tapped a button, the pet stayed alive. The original anxiety was gone. So was most of the pride. The pet had become a thing you managed, not a thing you remembered." },
      { h: "The desktop-tab years, 2020 to now", p: "The current generation of small electronic pets lives where the actual hours of the day are: the desktop tab. Not the lock screen (the lock screen is for checking the time), and not the app grid (the app grid is a chore). The desktop tab is the screen most adults are already on for six to ten hours a day, and the pet that lives there is the one they will actually see. Togthr Bot is the clearest example: a small pixel pet that lives in your browser, never nags you, never punishes you for a quiet week, and grows through 5 stages (baby, toddler, teen, adult, legend) as you keep showing up. The form factor changed the loop back to what it was on the keychain. You forget, and you come back. The pet is patient, and so is the day." },
      { h: "What stayed the same, and what did not", p: "What stayed the same across 30 years is the basic idea: a small creature that grows only as long as you keep showing up for it. What did not stay the same is the punishment. The keychain punished forgetfulness. The phone-app era punished nothing, but the pet also did not really grow. The desktop-tab era is the first in 30 years where the pet can be patient and the loop can be quiet, and the growth is real. The Tamagotchi at 30 looks less like a keychain toy and more like a small browser companion that is happy to sit with you for a year, and a little less happy if you forget, but not angry." }
    ],
    cta: "Open Togthr in your browser and adopt the small pixel pet that has been waiting for 30 years to move out of the keychain. Start free in your browser.",
    faqs: [
      { q: "Is the Tamagotchi still a real product in 2026?", a: "Yes. Bandai ships new Tamagotchi devices every year, and the 30th-anniversary edition is one of the strongest years the line has had. The keychain form factor is not coming back to dominance, but the brand is healthy. The interesting 2026 question is not whether the original Tamagotchi is alive; it is whether the loop it invented is being done better on a screen you actually look at for eight hours a day." },
      { q: "Why is a desktop pet a better fit for adults than a keychain?", a: "Adults do not carry keychains the way they did in 1996, and the small high-stakes loop of a keychain Tamagotchi is not built for someone with a job, a child, or a long relationship. A desktop pet lowers the stakes, but not the satisfaction. You still get the feeling of a small creature that has visibly grown over a year. You just do not get the panic when you forget to feed it." },
      { q: "Can I have a keychain Tamagotchi and a Togthr pet at the same time?", a: "Yes, and many people do. The keychain version is the small high-stakes loop that lives on a physical object. The Togthr pet is the long low-stakes loop that lives in the browser. The two complement each other: the keychain is the daily fidget, the browser is the multi-month companion." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/tamagotchi-alternative-for-adults", label: "A Tamagotchi alternative for adults" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" },
      { href: "/en/blog/digital-pet-nostalgia-2026", label: "Why millennials are quietly returning to digital pets" }
    ],
    },
    }

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as Locale
  const post = getBlogPost(SLUG, loc)
  const url = `${siteConfig.url}/${loc}/blog/${SLUG}`
  const languages: Record<string, string> = {}
  for (const l of routing.locales) {
    languages[l] = `${siteConfig.url}/${l}/blog/${SLUG}`
  }
  languages['x-default'] = `${siteConfig.url}/en/blog/${SLUG}`
  return {
    title: post?.title ?? META_TITLE,
    description: post?.description ?? META_DESC,
    alternates: { canonical: url, languages },
    openGraph: {
      type: 'article',
      title: post?.title ?? META_TITLE,
      description: post?.description ?? META_DESC,
      url,
      siteName: siteConfig.name,
      locale: loc.replace('-', '_'),
      images: [{
        url: `${siteConfig.url}${siteConfig.ogImage}`,
        width: 1200,
        height: 630,
        alt: post?.title ?? META_TITLE,
      }],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const loc = locale as Locale
  if (!routing.locales.includes(loc)) notFound()
  setRequestLocale(loc)
  const body = BODIES[loc] ?? BODIES.en
  return (
    <article data-dark-root className="min-h-screen bg-[#0B0B1A] text-zinc-100">
      <div className="mx-auto max-w-3xl px-4 py-16">
        <header>
          <h1 className="text-3xl md:text-4xl font-semibold leading-tight tracking-tight text-zinc-50">
            From Pocket to Desktop: 30 Years of Electronic Pets, and Where They Live Now
          </h1>
        </header>
        <div className="prose prose-invert mt-8 max-w-none">
          <p className="text-lg leading-relaxed text-zinc-200">{body.intro}</p>
          {body.sections.map((sec) => (
            <section key={sec.h} className="mt-10">
              <h2 className="text-2xl font-semibold text-zinc-50">{sec.h}</h2>
              <p className="mt-4 text-base leading-relaxed text-zinc-300">{sec.p}</p>
            </section>
          ))}
        </div>
        <div className="mt-12 rounded-2xl border border-zinc-700/40 bg-zinc-900/40 p-6">
          <h2 className="text-xl font-semibold text-zinc-50">FAQ</h2>
          <dl className="mt-4 space-y-4">
            {body.faqs.map((f) => (
              <div key={f.q}>
                <dt className="font-medium text-zinc-100">{f.q}</dt>
                <dd className="mt-1 text-zinc-300">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="mt-10 text-base leading-relaxed text-zinc-300">{body.cta}</p>
        <nav className="mt-10 flex flex-wrap gap-3 text-sm">
          {body.links.map((l) => (
            <Link key={l.href} href={l.href} className="rounded-full border border-zinc-700/40 px-4 py-2 text-zinc-200 hover:border-zinc-500">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </article>
  )
}
