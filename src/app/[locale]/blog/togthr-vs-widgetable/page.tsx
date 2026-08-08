// src/app/[locale]/blog/togthr-vs-widgetable/page.tsx
//
// Phase 1 (Task C) - programmatic blog post for the
// www.togthr.life /Togthr "small pixel pet" wedge. Single-file 8-locale
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
import BlogCtaBanner from '@/components/blogctabanner'
import { withUtm } from '@/lib/utm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `togthr-vs-widgetable`
const POST_DATE = `2026-07-22`
const META_TITLE = "Togthr vs Widgetable: Lock-Screen Wallpaper vs a Creature That Grows" + ` - Togthr`
const META_DESC = "Widgetable is the most popular couples-widget app on Android. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps ar"

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
    intro: "Widgetable is the most popular couples-widget app on Android. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Widgetable is a wallpaper; Togthr is a creature. The difference matters over six months.",
    sections: [
      { h: "Widgetable is a wallpaper with a couples scoreboard", p: "Widgetable is built around the Android lock screen. You pick a couple-themed widget (a clock, a heart-rate, a little counter), you place it on the lock screen, and the two of you watch the number go up. The loop is reactive: you tap, the number moves. The visual is static: today's lock screen looks the same as last week's lock screen, and the same as next week's lock screen. The widget is a wallpaper with a relationship score, and the wallpaper does not change because the wallpaper is the score." },
      { h: "Togthr is a creature that grows through 5 stages", p: "Togthr is the opposite shape. The pet is not a number; it is a small pixel robot that visibly grows. It starts as a baby, and over a few months of small regular check-ins it moves through 5 stages: baby, toddler, teen, adult, legend. The growth is the product. After a year you and your partner have a small companion that has visibly, slowly grown, and you can both remember the seasons that produced each stage. The visual is the diary." },
      { h: "The ad model: Widgetable is full of them, Togthr is not", p: "Widgetable is a free app with ads. There are ads in the wallpaper picker, ads in the partner-invite flow, ads in the lock-screen widget refresh. The ad model is the point: the wallpaper is free, the couple gets a wallpaper, the couple gets a target on the wallpaper, and the wallpaper is full of small targets. Togthr is the opposite. There are no ads anywhere in the product, ever. The pet is yours alone, or yours and one other person's, and the loop is the loop. The product is paid, the price is $5.49 a month or $37.99 a year, and the loop is the product." },
      { h: "The form factor: phone lock screen vs desktop tab", p: "Widgetable is built for the phone lock screen. Togthr is built for the desktop tab. The two are not the same surface. Most adults with a job, a long relationship, a child, or any kind of desk work spend most of their hours on the desktop, not the phone. A pet that lives on the desktop is a pet you will actually see, and a pet you see is a pet that grows. A pet on the lock screen is a pet you will see when you check the time, which is a few times a day, and a few times a day is not enough for 5 stages of growth to feel real." },
      { h: "Which one is right for you?", p: "If you and your partner are phone-first and you want a small free wallpaper with a couple-score on your lock screen, Widgetable is the right answer, and the ads are the price you pay for the wallpaper. If you are desktop-first and you want a small paid creature that visibly grows in 5 stages, that lives in the tab you are already on for six to ten hours a day, and that does not have ads, Togthr is the right answer. The two apps are not for the same problem. Widgetable is a wallpaper. Togthr is a life." }
    ],
    cta: "Try Togthr as the small pixel pet that lives in your browser and grows through 5 stages while you work. Start free in your browser.",
    faqs: [
      { q: "Is Togthr a Widgetable alternative?", a: "Yes, in the sense that both apps are built for two people. No, in the sense that they are not built for the same problem. Widgetable is a wallpaper with a relationship counter on your Android lock screen. Togthr is a small pixel pet that grows in 5 stages on your desktop tab. If the problem you want solved is \"I want a couple-themed lock screen widget,\" Widgetable is the right answer. If the problem is \"I want a small creature that grows with my partner over a year,\" Togthr is the right answer." },
      { q: "Does Togthr have ads?", a: "No. Togthr has no ads anywhere in the product, ever. The product is paid: $5.49 a month or $37.99 a year. The price is the product; the loop is the product. The no-ads design is a feature, not a bug, and it is the reason Togthr feels like a small companion and not a small target on a wallpaper." },
      { q: "Is Widgetable free?", a: "Widgetable is free, and the free version is full of ads. Widgetable also has a paid tier. Togthr is paid-only, with no free tier (you can start the loop for free, and the price only kicks in if you want to keep the pet past the trial)." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-replika", label: "Togthr vs Replika: tired of endless chatting?" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'zh-cn': {
    intro: "Widgetable is the most popular couples-widget app on Android. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Widgetable is a wallpaper; Togthr is a creature. The difference matters over six months.",
    sections: [
      { h: "Widgetable is a wallpaper with a couples scoreboard", p: "Widgetable is built around the Android lock screen. You pick a couple-themed widget (a clock, a heart-rate, a little counter), you place it on the lock screen, and the two of you watch the number go up. The loop is reactive: you tap, the number moves. The visual is static: today's lock screen looks the same as last week's lock screen, and the same as next week's lock screen. The widget is a wallpaper with a relationship score, and the wallpaper does not change because the wallpaper is the score." },
      { h: "Togthr is a creature that grows through 5 stages", p: "Togthr is the opposite shape. The pet is not a number; it is a small pixel robot that visibly grows. It starts as a baby, and over a few months of small regular check-ins it moves through 5 stages: baby, toddler, teen, adult, legend. The growth is the product. After a year you and your partner have a small companion that has visibly, slowly grown, and you can both remember the seasons that produced each stage. The visual is the diary." },
      { h: "The ad model: Widgetable is full of them, Togthr is not", p: "Widgetable is a free app with ads. There are ads in the wallpaper picker, ads in the partner-invite flow, ads in the lock-screen widget refresh. The ad model is the point: the wallpaper is free, the couple gets a wallpaper, the couple gets a target on the wallpaper, and the wallpaper is full of small targets. Togthr is the opposite. There are no ads anywhere in the product, ever. The pet is yours alone, or yours and one other person's, and the loop is the loop. The product is paid, the price is $5.49 a month or $37.99 a year, and the loop is the product." },
      { h: "The form factor: phone lock screen vs desktop tab", p: "Widgetable is built for the phone lock screen. Togthr is built for the desktop tab. The two are not the same surface. Most adults with a job, a long relationship, a child, or any kind of desk work spend most of their hours on the desktop, not the phone. A pet that lives on the desktop is a pet you will actually see, and a pet you see is a pet that grows. A pet on the lock screen is a pet you will see when you check the time, which is a few times a day, and a few times a day is not enough for 5 stages of growth to feel real." },
      { h: "Which one is right for you?", p: "If you and your partner are phone-first and you want a small free wallpaper with a couple-score on your lock screen, Widgetable is the right answer, and the ads are the price you pay for the wallpaper. If you are desktop-first and you want a small paid creature that visibly grows in 5 stages, that lives in the tab you are already on for six to ten hours a day, and that does not have ads, Togthr is the right answer. The two apps are not for the same problem. Widgetable is a wallpaper. Togthr is a life." }
    ],
    cta: "Try Togthr as the small pixel pet that lives in your browser and grows through 5 stages while you work. Start free in your browser.",
    faqs: [
      { q: "Is Togthr a Widgetable alternative?", a: "Yes, in the sense that both apps are built for two people. No, in the sense that they are not built for the same problem. Widgetable is a wallpaper with a relationship counter on your Android lock screen. Togthr is a small pixel pet that grows in 5 stages on your desktop tab. If the problem you want solved is \"I want a couple-themed lock screen widget,\" Widgetable is the right answer. If the problem is \"I want a small creature that grows with my partner over a year,\" Togthr is the right answer." },
      { q: "Does Togthr have ads?", a: "No. Togthr has no ads anywhere in the product, ever. The product is paid: $5.49 a month or $37.99 a year. The price is the product; the loop is the product. The no-ads design is a feature, not a bug, and it is the reason Togthr feels like a small companion and not a small target on a wallpaper." },
      { q: "Is Widgetable free?", a: "Widgetable is free, and the free version is full of ads. Widgetable also has a paid tier. Togthr is paid-only, with no free tier (you can start the loop for free, and the price only kicks in if you want to keep the pet past the trial)." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-replika", label: "Togthr vs Replika: tired of endless chatting?" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'zh-tw': {
    intro: "Widgetable is the most popular couples-widget app on Android. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Widgetable is a wallpaper; Togthr is a creature. The difference matters over six months.",
    sections: [
      { h: "Widgetable is a wallpaper with a couples scoreboard", p: "Widgetable is built around the Android lock screen. You pick a couple-themed widget (a clock, a heart-rate, a little counter), you place it on the lock screen, and the two of you watch the number go up. The loop is reactive: you tap, the number moves. The visual is static: today's lock screen looks the same as last week's lock screen, and the same as next week's lock screen. The widget is a wallpaper with a relationship score, and the wallpaper does not change because the wallpaper is the score." },
      { h: "Togthr is a creature that grows through 5 stages", p: "Togthr is the opposite shape. The pet is not a number; it is a small pixel robot that visibly grows. It starts as a baby, and over a few months of small regular check-ins it moves through 5 stages: baby, toddler, teen, adult, legend. The growth is the product. After a year you and your partner have a small companion that has visibly, slowly grown, and you can both remember the seasons that produced each stage. The visual is the diary." },
      { h: "The ad model: Widgetable is full of them, Togthr is not", p: "Widgetable is a free app with ads. There are ads in the wallpaper picker, ads in the partner-invite flow, ads in the lock-screen widget refresh. The ad model is the point: the wallpaper is free, the couple gets a wallpaper, the couple gets a target on the wallpaper, and the wallpaper is full of small targets. Togthr is the opposite. There are no ads anywhere in the product, ever. The pet is yours alone, or yours and one other person's, and the loop is the loop. The product is paid, the price is $5.49 a month or $37.99 a year, and the loop is the product." },
      { h: "The form factor: phone lock screen vs desktop tab", p: "Widgetable is built for the phone lock screen. Togthr is built for the desktop tab. The two are not the same surface. Most adults with a job, a long relationship, a child, or any kind of desk work spend most of their hours on the desktop, not the phone. A pet that lives on the desktop is a pet you will actually see, and a pet you see is a pet that grows. A pet on the lock screen is a pet you will see when you check the time, which is a few times a day, and a few times a day is not enough for 5 stages of growth to feel real." },
      { h: "Which one is right for you?", p: "If you and your partner are phone-first and you want a small free wallpaper with a couple-score on your lock screen, Widgetable is the right answer, and the ads are the price you pay for the wallpaper. If you are desktop-first and you want a small paid creature that visibly grows in 5 stages, that lives in the tab you are already on for six to ten hours a day, and that does not have ads, Togthr is the right answer. The two apps are not for the same problem. Widgetable is a wallpaper. Togthr is a life." }
    ],
    cta: "Try Togthr as the small pixel pet that lives in your browser and grows through 5 stages while you work. Start free in your browser.",
    faqs: [
      { q: "Is Togthr a Widgetable alternative?", a: "Yes, in the sense that both apps are built for two people. No, in the sense that they are not built for the same problem. Widgetable is a wallpaper with a relationship counter on your Android lock screen. Togthr is a small pixel pet that grows in 5 stages on your desktop tab. If the problem you want solved is \"I want a couple-themed lock screen widget,\" Widgetable is the right answer. If the problem is \"I want a small creature that grows with my partner over a year,\" Togthr is the right answer." },
      { q: "Does Togthr have ads?", a: "No. Togthr has no ads anywhere in the product, ever. The product is paid: $5.49 a month or $37.99 a year. The price is the product; the loop is the product. The no-ads design is a feature, not a bug, and it is the reason Togthr feels like a small companion and not a small target on a wallpaper." },
      { q: "Is Widgetable free?", a: "Widgetable is free, and the free version is full of ads. Widgetable also has a paid tier. Togthr is paid-only, with no free tier (you can start the loop for free, and the price only kicks in if you want to keep the pet past the trial)." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-replika", label: "Togthr vs Replika: tired of endless chatting?" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'ja': {
    intro: "Widgetable is the most popular couples-widget app on Android. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Widgetable is a wallpaper; Togthr is a creature. The difference matters over six months.",
    sections: [
      { h: "Widgetable is a wallpaper with a couples scoreboard", p: "Widgetable is built around the Android lock screen. You pick a couple-themed widget (a clock, a heart-rate, a little counter), you place it on the lock screen, and the two of you watch the number go up. The loop is reactive: you tap, the number moves. The visual is static: today's lock screen looks the same as last week's lock screen, and the same as next week's lock screen. The widget is a wallpaper with a relationship score, and the wallpaper does not change because the wallpaper is the score." },
      { h: "Togthr is a creature that grows through 5 stages", p: "Togthr is the opposite shape. The pet is not a number; it is a small pixel robot that visibly grows. It starts as a baby, and over a few months of small regular check-ins it moves through 5 stages: baby, toddler, teen, adult, legend. The growth is the product. After a year you and your partner have a small companion that has visibly, slowly grown, and you can both remember the seasons that produced each stage. The visual is the diary." },
      { h: "The ad model: Widgetable is full of them, Togthr is not", p: "Widgetable is a free app with ads. There are ads in the wallpaper picker, ads in the partner-invite flow, ads in the lock-screen widget refresh. The ad model is the point: the wallpaper is free, the couple gets a wallpaper, the couple gets a target on the wallpaper, and the wallpaper is full of small targets. Togthr is the opposite. There are no ads anywhere in the product, ever. The pet is yours alone, or yours and one other person's, and the loop is the loop. The product is paid, the price is $5.49 a month or $37.99 a year, and the loop is the product." },
      { h: "The form factor: phone lock screen vs desktop tab", p: "Widgetable is built for the phone lock screen. Togthr is built for the desktop tab. The two are not the same surface. Most adults with a job, a long relationship, a child, or any kind of desk work spend most of their hours on the desktop, not the phone. A pet that lives on the desktop is a pet you will actually see, and a pet you see is a pet that grows. A pet on the lock screen is a pet you will see when you check the time, which is a few times a day, and a few times a day is not enough for 5 stages of growth to feel real." },
      { h: "Which one is right for you?", p: "If you and your partner are phone-first and you want a small free wallpaper with a couple-score on your lock screen, Widgetable is the right answer, and the ads are the price you pay for the wallpaper. If you are desktop-first and you want a small paid creature that visibly grows in 5 stages, that lives in the tab you are already on for six to ten hours a day, and that does not have ads, Togthr is the right answer. The two apps are not for the same problem. Widgetable is a wallpaper. Togthr is a life." }
    ],
    cta: "Try Togthr as the small pixel pet that lives in your browser and grows through 5 stages while you work. Start free in your browser.",
    faqs: [
      { q: "Is Togthr a Widgetable alternative?", a: "Yes, in the sense that both apps are built for two people. No, in the sense that they are not built for the same problem. Widgetable is a wallpaper with a relationship counter on your Android lock screen. Togthr is a small pixel pet that grows in 5 stages on your desktop tab. If the problem you want solved is \"I want a couple-themed lock screen widget,\" Widgetable is the right answer. If the problem is \"I want a small creature that grows with my partner over a year,\" Togthr is the right answer." },
      { q: "Does Togthr have ads?", a: "No. Togthr has no ads anywhere in the product, ever. The product is paid: $5.49 a month or $37.99 a year. The price is the product; the loop is the product. The no-ads design is a feature, not a bug, and it is the reason Togthr feels like a small companion and not a small target on a wallpaper." },
      { q: "Is Widgetable free?", a: "Widgetable is free, and the free version is full of ads. Widgetable also has a paid tier. Togthr is paid-only, with no free tier (you can start the loop for free, and the price only kicks in if you want to keep the pet past the trial)." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-replika", label: "Togthr vs Replika: tired of endless chatting?" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'ko': {
    intro: "Widgetable is the most popular couples-widget app on Android. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Widgetable is a wallpaper; Togthr is a creature. The difference matters over six months.",
    sections: [
      { h: "Widgetable is a wallpaper with a couples scoreboard", p: "Widgetable is built around the Android lock screen. You pick a couple-themed widget (a clock, a heart-rate, a little counter), you place it on the lock screen, and the two of you watch the number go up. The loop is reactive: you tap, the number moves. The visual is static: today's lock screen looks the same as last week's lock screen, and the same as next week's lock screen. The widget is a wallpaper with a relationship score, and the wallpaper does not change because the wallpaper is the score." },
      { h: "Togthr is a creature that grows through 5 stages", p: "Togthr is the opposite shape. The pet is not a number; it is a small pixel robot that visibly grows. It starts as a baby, and over a few months of small regular check-ins it moves through 5 stages: baby, toddler, teen, adult, legend. The growth is the product. After a year you and your partner have a small companion that has visibly, slowly grown, and you can both remember the seasons that produced each stage. The visual is the diary." },
      { h: "The ad model: Widgetable is full of them, Togthr is not", p: "Widgetable is a free app with ads. There are ads in the wallpaper picker, ads in the partner-invite flow, ads in the lock-screen widget refresh. The ad model is the point: the wallpaper is free, the couple gets a wallpaper, the couple gets a target on the wallpaper, and the wallpaper is full of small targets. Togthr is the opposite. There are no ads anywhere in the product, ever. The pet is yours alone, or yours and one other person's, and the loop is the loop. The product is paid, the price is $5.49 a month or $37.99 a year, and the loop is the product." },
      { h: "The form factor: phone lock screen vs desktop tab", p: "Widgetable is built for the phone lock screen. Togthr is built for the desktop tab. The two are not the same surface. Most adults with a job, a long relationship, a child, or any kind of desk work spend most of their hours on the desktop, not the phone. A pet that lives on the desktop is a pet you will actually see, and a pet you see is a pet that grows. A pet on the lock screen is a pet you will see when you check the time, which is a few times a day, and a few times a day is not enough for 5 stages of growth to feel real." },
      { h: "Which one is right for you?", p: "If you and your partner are phone-first and you want a small free wallpaper with a couple-score on your lock screen, Widgetable is the right answer, and the ads are the price you pay for the wallpaper. If you are desktop-first and you want a small paid creature that visibly grows in 5 stages, that lives in the tab you are already on for six to ten hours a day, and that does not have ads, Togthr is the right answer. The two apps are not for the same problem. Widgetable is a wallpaper. Togthr is a life." }
    ],
    cta: "Try Togthr as the small pixel pet that lives in your browser and grows through 5 stages while you work. Start free in your browser.",
    faqs: [
      { q: "Is Togthr a Widgetable alternative?", a: "Yes, in the sense that both apps are built for two people. No, in the sense that they are not built for the same problem. Widgetable is a wallpaper with a relationship counter on your Android lock screen. Togthr is a small pixel pet that grows in 5 stages on your desktop tab. If the problem you want solved is \"I want a couple-themed lock screen widget,\" Widgetable is the right answer. If the problem is \"I want a small creature that grows with my partner over a year,\" Togthr is the right answer." },
      { q: "Does Togthr have ads?", a: "No. Togthr has no ads anywhere in the product, ever. The product is paid: $5.49 a month or $37.99 a year. The price is the product; the loop is the product. The no-ads design is a feature, not a bug, and it is the reason Togthr feels like a small companion and not a small target on a wallpaper." },
      { q: "Is Widgetable free?", a: "Widgetable is free, and the free version is full of ads. Widgetable also has a paid tier. Togthr is paid-only, with no free tier (you can start the loop for free, and the price only kicks in if you want to keep the pet past the trial)." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-replika", label: "Togthr vs Replika: tired of endless chatting?" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'de': {
    intro: "Widgetable is the most popular couples-widget app on Android. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Widgetable is a wallpaper; Togthr is a creature. The difference matters over six months.",
    sections: [
      { h: "Widgetable is a wallpaper with a couples scoreboard", p: "Widgetable is built around the Android lock screen. You pick a couple-themed widget (a clock, a heart-rate, a little counter), you place it on the lock screen, and the two of you watch the number go up. The loop is reactive: you tap, the number moves. The visual is static: today's lock screen looks the same as last week's lock screen, and the same as next week's lock screen. The widget is a wallpaper with a relationship score, and the wallpaper does not change because the wallpaper is the score." },
      { h: "Togthr is a creature that grows through 5 stages", p: "Togthr is the opposite shape. The pet is not a number; it is a small pixel robot that visibly grows. It starts as a baby, and over a few months of small regular check-ins it moves through 5 stages: baby, toddler, teen, adult, legend. The growth is the product. After a year you and your partner have a small companion that has visibly, slowly grown, and you can both remember the seasons that produced each stage. The visual is the diary." },
      { h: "The ad model: Widgetable is full of them, Togthr is not", p: "Widgetable is a free app with ads. There are ads in the wallpaper picker, ads in the partner-invite flow, ads in the lock-screen widget refresh. The ad model is the point: the wallpaper is free, the couple gets a wallpaper, the couple gets a target on the wallpaper, and the wallpaper is full of small targets. Togthr is the opposite. There are no ads anywhere in the product, ever. The pet is yours alone, or yours and one other person's, and the loop is the loop. The product is paid, the price is $5.49 a month or $37.99 a year, and the loop is the product." },
      { h: "The form factor: phone lock screen vs desktop tab", p: "Widgetable is built for the phone lock screen. Togthr is built for the desktop tab. The two are not the same surface. Most adults with a job, a long relationship, a child, or any kind of desk work spend most of their hours on the desktop, not the phone. A pet that lives on the desktop is a pet you will actually see, and a pet you see is a pet that grows. A pet on the lock screen is a pet you will see when you check the time, which is a few times a day, and a few times a day is not enough for 5 stages of growth to feel real." },
      { h: "Which one is right for you?", p: "If you and your partner are phone-first and you want a small free wallpaper with a couple-score on your lock screen, Widgetable is the right answer, and the ads are the price you pay for the wallpaper. If you are desktop-first and you want a small paid creature that visibly grows in 5 stages, that lives in the tab you are already on for six to ten hours a day, and that does not have ads, Togthr is the right answer. The two apps are not for the same problem. Widgetable is a wallpaper. Togthr is a life." }
    ],
    cta: "Try Togthr as the small pixel pet that lives in your browser and grows through 5 stages while you work. Start free in your browser.",
    faqs: [
      { q: "Is Togthr a Widgetable alternative?", a: "Yes, in the sense that both apps are built for two people. No, in the sense that they are not built for the same problem. Widgetable is a wallpaper with a relationship counter on your Android lock screen. Togthr is a small pixel pet that grows in 5 stages on your desktop tab. If the problem you want solved is \"I want a couple-themed lock screen widget,\" Widgetable is the right answer. If the problem is \"I want a small creature that grows with my partner over a year,\" Togthr is the right answer." },
      { q: "Does Togthr have ads?", a: "No. Togthr has no ads anywhere in the product, ever. The product is paid: $5.49 a month or $37.99 a year. The price is the product; the loop is the product. The no-ads design is a feature, not a bug, and it is the reason Togthr feels like a small companion and not a small target on a wallpaper." },
      { q: "Is Widgetable free?", a: "Widgetable is free, and the free version is full of ads. Widgetable also has a paid tier. Togthr is paid-only, with no free tier (you can start the loop for free, and the price only kicks in if you want to keep the pet past the trial)." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-replika", label: "Togthr vs Replika: tired of endless chatting?" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'fr': {
    intro: "Widgetable is the most popular couples-widget app on Android. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Widgetable is a wallpaper; Togthr is a creature. The difference matters over six months.",
    sections: [
      { h: "Widgetable is a wallpaper with a couples scoreboard", p: "Widgetable is built around the Android lock screen. You pick a couple-themed widget (a clock, a heart-rate, a little counter), you place it on the lock screen, and the two of you watch the number go up. The loop is reactive: you tap, the number moves. The visual is static: today's lock screen looks the same as last week's lock screen, and the same as next week's lock screen. The widget is a wallpaper with a relationship score, and the wallpaper does not change because the wallpaper is the score." },
      { h: "Togthr is a creature that grows through 5 stages", p: "Togthr is the opposite shape. The pet is not a number; it is a small pixel robot that visibly grows. It starts as a baby, and over a few months of small regular check-ins it moves through 5 stages: baby, toddler, teen, adult, legend. The growth is the product. After a year you and your partner have a small companion that has visibly, slowly grown, and you can both remember the seasons that produced each stage. The visual is the diary." },
      { h: "The ad model: Widgetable is full of them, Togthr is not", p: "Widgetable is a free app with ads. There are ads in the wallpaper picker, ads in the partner-invite flow, ads in the lock-screen widget refresh. The ad model is the point: the wallpaper is free, the couple gets a wallpaper, the couple gets a target on the wallpaper, and the wallpaper is full of small targets. Togthr is the opposite. There are no ads anywhere in the product, ever. The pet is yours alone, or yours and one other person's, and the loop is the loop. The product is paid, the price is $5.49 a month or $37.99 a year, and the loop is the product." },
      { h: "The form factor: phone lock screen vs desktop tab", p: "Widgetable is built for the phone lock screen. Togthr is built for the desktop tab. The two are not the same surface. Most adults with a job, a long relationship, a child, or any kind of desk work spend most of their hours on the desktop, not the phone. A pet that lives on the desktop is a pet you will actually see, and a pet you see is a pet that grows. A pet on the lock screen is a pet you will see when you check the time, which is a few times a day, and a few times a day is not enough for 5 stages of growth to feel real." },
      { h: "Which one is right for you?", p: "If you and your partner are phone-first and you want a small free wallpaper with a couple-score on your lock screen, Widgetable is the right answer, and the ads are the price you pay for the wallpaper. If you are desktop-first and you want a small paid creature that visibly grows in 5 stages, that lives in the tab you are already on for six to ten hours a day, and that does not have ads, Togthr is the right answer. The two apps are not for the same problem. Widgetable is a wallpaper. Togthr is a life." }
    ],
    cta: "Try Togthr as the small pixel pet that lives in your browser and grows through 5 stages while you work. Start free in your browser.",
    faqs: [
      { q: "Is Togthr a Widgetable alternative?", a: "Yes, in the sense that both apps are built for two people. No, in the sense that they are not built for the same problem. Widgetable is a wallpaper with a relationship counter on your Android lock screen. Togthr is a small pixel pet that grows in 5 stages on your desktop tab. If the problem you want solved is \"I want a couple-themed lock screen widget,\" Widgetable is the right answer. If the problem is \"I want a small creature that grows with my partner over a year,\" Togthr is the right answer." },
      { q: "Does Togthr have ads?", a: "No. Togthr has no ads anywhere in the product, ever. The product is paid: $5.49 a month or $37.99 a year. The price is the product; the loop is the product. The no-ads design is a feature, not a bug, and it is the reason Togthr feels like a small companion and not a small target on a wallpaper." },
      { q: "Is Widgetable free?", a: "Widgetable is free, and the free version is full of ads. Widgetable also has a paid tier. Togthr is paid-only, with no free tier (you can start the loop for free, and the price only kicks in if you want to keep the pet past the trial)." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-replika", label: "Togthr vs Replika: tired of endless chatting?" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'es': {
    intro: "Widgetable is the most popular couples-widget app on Android. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Widgetable is a wallpaper; Togthr is a creature. The difference matters over six months.",
    sections: [
      { h: "Widgetable is a wallpaper with a couples scoreboard", p: "Widgetable is built around the Android lock screen. You pick a couple-themed widget (a clock, a heart-rate, a little counter), you place it on the lock screen, and the two of you watch the number go up. The loop is reactive: you tap, the number moves. The visual is static: today's lock screen looks the same as last week's lock screen, and the same as next week's lock screen. The widget is a wallpaper with a relationship score, and the wallpaper does not change because the wallpaper is the score." },
      { h: "Togthr is a creature that grows through 5 stages", p: "Togthr is the opposite shape. The pet is not a number; it is a small pixel robot that visibly grows. It starts as a baby, and over a few months of small regular check-ins it moves through 5 stages: baby, toddler, teen, adult, legend. The growth is the product. After a year you and your partner have a small companion that has visibly, slowly grown, and you can both remember the seasons that produced each stage. The visual is the diary." },
      { h: "The ad model: Widgetable is full of them, Togthr is not", p: "Widgetable is a free app with ads. There are ads in the wallpaper picker, ads in the partner-invite flow, ads in the lock-screen widget refresh. The ad model is the point: the wallpaper is free, the couple gets a wallpaper, the couple gets a target on the wallpaper, and the wallpaper is full of small targets. Togthr is the opposite. There are no ads anywhere in the product, ever. The pet is yours alone, or yours and one other person's, and the loop is the loop. The product is paid, the price is $5.49 a month or $37.99 a year, and the loop is the product." },
      { h: "The form factor: phone lock screen vs desktop tab", p: "Widgetable is built for the phone lock screen. Togthr is built for the desktop tab. The two are not the same surface. Most adults with a job, a long relationship, a child, or any kind of desk work spend most of their hours on the desktop, not the phone. A pet that lives on the desktop is a pet you will actually see, and a pet you see is a pet that grows. A pet on the lock screen is a pet you will see when you check the time, which is a few times a day, and a few times a day is not enough for 5 stages of growth to feel real." },
      { h: "Which one is right for you?", p: "If you and your partner are phone-first and you want a small free wallpaper with a couple-score on your lock screen, Widgetable is the right answer, and the ads are the price you pay for the wallpaper. If you are desktop-first and you want a small paid creature that visibly grows in 5 stages, that lives in the tab you are already on for six to ten hours a day, and that does not have ads, Togthr is the right answer. The two apps are not for the same problem. Widgetable is a wallpaper. Togthr is a life." }
    ],
    cta: "Try Togthr as the small pixel pet that lives in your browser and grows through 5 stages while you work. Start free in your browser.",
    faqs: [
      { q: "Is Togthr a Widgetable alternative?", a: "Yes, in the sense that both apps are built for two people. No, in the sense that they are not built for the same problem. Widgetable is a wallpaper with a relationship counter on your Android lock screen. Togthr is a small pixel pet that grows in 5 stages on your desktop tab. If the problem you want solved is \"I want a couple-themed lock screen widget,\" Widgetable is the right answer. If the problem is \"I want a small creature that grows with my partner over a year,\" Togthr is the right answer." },
      { q: "Does Togthr have ads?", a: "No. Togthr has no ads anywhere in the product, ever. The product is paid: $5.49 a month or $37.99 a year. The price is the product; the loop is the product. The no-ads design is a feature, not a bug, and it is the reason Togthr feels like a small companion and not a small target on a wallpaper." },
      { q: "Is Widgetable free?", a: "Widgetable is free, and the free version is full of ads. Widgetable also has a paid tier. Togthr is paid-only, with no free tier (you can start the loop for free, and the price only kicks in if you want to keep the pet past the trial)." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-replika", label: "Togthr vs Replika: tired of endless chatting?" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
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
            Togthr vs Widgetable: Lock-Screen Wallpaper vs a Creature That Grows
          </h1>
        </header>
        <section aria-label="Summary" className="mt-6 rounded-xl border border-pink-500/20 bg-pink-500/5 px-5 py-4">
          <p className="text-sm leading-relaxed text-zinc-400">
            Togthr vs Widgetable compares a lock-screen couples widget to a 5-stage pixel robot that grows in your browser. Togthr is a desktop companion, Widgetable is a wallpaper. Togthr costs $5.49/month with no ads.
          </p>
        </section>
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
        <BlogCtaBanner slug={SLUG} />

      <nav className="mt-10 flex flex-wrap gap-3 text-sm">
          {body.links.map((l) => (
            <Link key={l.href} href={withUtm(l.href, SLUG)} className="rounded-full border border-zinc-700/40 px-4 py-2 text-zinc-200 hover:border-zinc-500">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </article>
  )
}
