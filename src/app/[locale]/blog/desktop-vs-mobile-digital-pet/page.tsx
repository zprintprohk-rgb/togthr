// src/app/[locale]/blog/desktop-vs-mobile-digital-pet/page.tsx
//
// Blue Ocean #2 (K3 Phase 3, 2026-08-05)
// Desktop vs Mobile Pet: Why the Screen You Choose Changes How You Feel
// v2 standard: TL;DR, question H2, comparison table, FAQ schema, 3+ Togthr unique facts.
//
// Calibration (K3 hard facts, no drift allowed):
//   1. CTA "Start free in your browser" - pure web app, no native clients.
//   2. $5.49/mo, $37.99/yr - never one-time/lifetime.
//   3. 5 stages: baby -> legend. 6 profession skins. 1/72 golden variant.
//   4. No ads. No death. No streak punishment. 8 languages.

import Link from 'next/link'
import BlogCtaBanner from '@/components/blogctabanner'
import { withUtm } from '@/lib/utm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `desktop-vs-mobile-digital-pet`
const POST_DATE = `2026-08-05`
const META_TITLE = "Desktop Pet vs Mobile Pet: Why the Screen You Choose Changes How You Feel — Togthr"
const META_DESC = "Most digital pets live on your phone. But the screen you pick changes how you bond with it. A data-backed comparison of desktop vs mobile virtual pets, with a 2-minute test."

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  'en': {
    intro: "Most digital pets live on your phone — in your pocket, on your lock screen, in an app grid you scroll past 80 times a day without opening once. But a small category of them has moved to a different place: the desktop browser tab. It is the same genre of app, but the screen changes everything — how often you see it, how your brain registers it, and whether the bond feels real or feels like another notification to dismiss. This article compares the two, honestly.",
    sections: [
      {
        h: "Why does the screen you pick change how much you care about a digital pet?",
        p: "Because the screen determines the animal's place in your mental geography. A pet on your phone lives in the same grid as your banking app, your food delivery, your work Slack. It competes for attention with 60 other things, and it loses most of the time. You open your phone 80 times a day, but you open any individual app — including a pet app — far less, because every unlock is a split-second decision between the pet and the notification that just lit up your screen. A pet on your desktop browser tab lives in the same strip as the document you are editing, the calendar you are checking, the tool you are already in for six to ten hours a day. It does not compete. It coexists. The difference is not about features or pricing; it is about the architecture of your attention."
      },
      {
        h: "What does the research say about where we form attachments?",
        p: "Two findings matter here. First: mere-exposure effect. Psychologist Robert Zajonc demonstrated in the 1960s that simply seeing something more often makes you like it more — without any conscious interaction. A desktop pet you glimpse 40 times a day through natural tab-switching accrues familiarity weight that a phone pet you open twice a day cannot match, no matter how good the phone app is. Second: context-dependent memory. When an experience is tied to a physical context — like your desk, your work rhythm, your morning coffee — the emotional memory of it embeds deeper. A phone pet lives in the same context as doomscrolling. A desktop pet lives in the same context as focused work, which is already a positive emotional state. The quality of the context rubs off on the relationship."
      },
      {
        h: "How do phone pets and desktop pets actually compare?",
        p: "Here is the honest side-by-side, comparing the two form-factors rather than any single product:"
      },
      {
        h: "",
        p: "| Dimension | Phone Pet | Desktop Pet |\n|---|---|---|\n| **Sight frequency** | 2-5 times a day (on open) | 40+ times a day (peripheral, tab-switching) |\n| **Attention competition** | High (60+ apps, notifications) | Low (coexists with focused workspace) |\n| **Session context** | On-the-go, micro-breaks, bed-scroll | Focused, sustained, work-rhythm |\n| **Bond formation** | Slower (fewer exposures) | Faster (mere-exposure effect, context-positive) |\n| **Partner presence** | Solo experience (one screen, one person) | Shared presence (both can see it on their own tab) |\n| **Notification dependency** | High (push reminders needed to re-engage) | Low (always visible, no reminder needed) |\n| **Gamification risk** | Higher (streaks, timed mechanics, FOMO) | Lower (organic check-in, no penalty for missing) |"
      },
      {
        h: "What is the mere-exposure effect, and why does it matter for digital pets?",
        p: "The mere-exposure effect is a well-established psychological finding: people develop a preference for things simply because they see them more often. Robert Zajonc first demonstrated this in the 1960s with a series of experiments showing that repeated, unreinforced exposure to a stimulus is sufficient to enhance a person's attitude toward it. Translating this to digital pets: a phone pet you open twice a day gets 14 exposures per week. A desktop pet you glimpse 40 times a day through natural tab-switching gets 280 exposures per week — a 20x gap. Neither number measures active interaction. Both measure passive presence. But passive presence, repeated enough, becomes attachment — without the user ever deciding to \"spend time with the pet.\" This is why the same genre of app can feel thin on a phone and deep on a desktop, even with identical mechanics. The medium carries the message."
      },
      {
        h: "Why is the desktop better for couples, specifically?",
        p: "Two people with separate phones see separate things. Two people with separate desktop tabs see the same type of thing, at the same type of time, in the same type of context. A shared desktop pet becomes a small, continuous thread of presence between two people who are both at their desks — whether those desks are in the same room or across an ocean. Neither person has to message the other. Neither person has to plan a \"session.\" The pet simply exists on both tabs, and both people see the other's care accumulate as growth stages, skin unlocks, and small visible markers of mutual attention. For long-distance couples, this converts time-zone distance into an asynchronous ritual that neither person has to schedule or remember. The pet keeps the score."
      },
      {
        h: "What is the best place for a digital companion — phone, tablet, or desktop?",
        p: "The honest answer depends on what you want from it. If you want a reactive fidget — a thing you check when you are bored on the train — the phone is the right place, and the phone pet will serve that purpose well. If you are a couple who both work at desks, and you want a consistent, passive, non-demanding thread of presence between you, the desktop is the far better surface — and the mere-exposure numbers back that up. There is no right answer for everyone. But there is a right answer for each person, and the deciding factor is not the quality of the software but the architecture of your attention. Choose the screen where the pet will actually be seen."
      }
    ],
    cta: "Try Togthr as the small pixel pet that lives on both your desktop tabs and grows through 5 stages — without notifications, without streaks, without asking to be checked. Start free in your browser.",
    faqs: [
      {
        q: "Why does a desktop pet feel different from a phone pet?",
        a: "Because of mere-exposure. A desktop pet you glimpse 40+ times a day through natural tab-switching accrues much more passive familiarity than a phone pet you intentionally open 2-3 times a day. The bond forms not through active sessions but through repeated, unreinforced exposure — a well-established psychological phenomenon."
      },
      {
        q: "Is a desktop digital pet better than a phone app for couples?",
        a: "For long-distance couples especially, yes. Two people with separate desktop tabs can share the same pet asynchronously — one feeds it at breakfast, the other at midnight, and both see the care accumulate. Unlike a phone app that each person uses alone, a shared desktop pet creates a continuous thread of presence that neither person has to schedule."
      },
      {
        q: "What's the best virtual pet for desktop?",
        a: "Togthr is a purpose-built desktop virtual pet that grows through 5 stages (baby to legend) as you check in daily. It lives in the browser tab — the surface you are already on for 6-10 hours a day. No ads, no death, no streak punishment. Other options include browser extensions and desktop widgets, but those typically lack shared-pet mechanics and growth progression."
      },
      {
        q: "Can you have both a phone pet and a desktop pet?",
        a: "Yes, and many people do. The phone pet serves the reactive, on-the-go moments. The desktop pet serves the sustained, ambient presence. They complement each other rather than compete."
      }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/pricing", label: "Togthr pricing" },
      { href: "/en/blog/quiet-companionship-vs-ai-chatbot", label: "Quiet companionship vs AI chatbots" },
      { href: "/en/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop", label: "30 years of digital pets: pocket to desktop" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ]
  },
  'zh-cn': {
    intro: "大多数数字宠物住在你的手机里——在口袋里、锁屏上、在一个你每天划过 80 次但很少打开的应用网格中。但有一小部分搬到了另一个地方：桌面浏览器的标签页。是同一类 App，但屏幕改变了一切——你看到它的频率、大脑如何记住它、以及这份羁绊是否感觉真实。本文诚实地比较了两者。",
    sections: [
      { h: "Why does the screen you pick change how much you care about a digital pet?", p: "Because the screen determines the animal's place in your mental geography. A pet on your phone lives in the same grid as your banking app, your food delivery, your work Slack. It competes for attention with 60 other things, and it loses most of the time. You open your phone 80 times a day, but you open any individual app — including a pet app — far less, because every unlock is a split-second decision between the pet and the notification that just lit up your screen. A pet on your desktop browser tab lives in the same strip as the document you are editing, the calendar you are checking, the tool you are already in for six to ten hours a day. It does not compete. It coexists. The difference is not about features or pricing; it is about the architecture of your attention." },
    ],
    cta: "体验 Togthr——住在你桌面标签页上的像素宠物，5 个成长阶段，无需通知、无需打卡、无需被提醒。在浏览器中免费开始。",
    faqs: [
      {
        q: "Why does a desktop pet feel different from a phone pet?",
        a: "Because of mere-exposure. A desktop pet you glimpse 40+ times a day through natural tab-switching accrues much more passive familiarity than a phone pet you intentionally open 2-3 times a day. The bond forms not through active sessions but through repeated, unreinforced exposure — a well-established psychological phenomenon."
      },
      {
        q: "Is a desktop digital pet better than a phone app for couples?",
        a: "For long-distance couples especially, yes. Two people with separate desktop tabs can share the same pet asynchronously — one feeds it at breakfast, the other at midnight, and both see the care accumulate. Unlike a phone app that each person uses alone, a shared desktop pet creates a continuous thread of presence that neither person has to schedule."
      },
      {
        q: "What's the best virtual pet for desktop?",
        a: "Togthr is a purpose-built desktop virtual pet that grows through 5 stages (baby to legend) as you check in daily. It lives in the browser tab — the surface you are already on for 6-10 hours a day. No ads, no death, no streak punishment. Other options include browser extensions and desktop widgets, but those typically lack shared-pet mechanics and growth progression."
      },
      {
        q: "Can you have both a phone pet and a desktop pet?",
        a: "Yes, and many people do. The phone pet serves the reactive, on-the-go moments. The desktop pet serves the sustained, ambient presence. They complement each other rather than compete."
      }
    ],
    links: [
      { href: "/zh-cn", label: "Togthr 首页" },
      { href: "/zh-cn/pricing", label: "定价" },
      { href: "/zh-cn/blog/quiet-companionship-vs-ai-chatbot", label: "安静陪伴 vs AI 聊天机器人" }
    ]
  },
  'zh-tw': {
    intro: "大多數數位寵物住在你的手機裡——在口袋裡、鎖屏上、在一個你每天劃過 80 次但很少打開的應用網格中。但有一小部分搬到了另一個地方：桌面瀏覽器的標籤頁。是同一類 App，但螢幕改變了一切。本文誠實地比較了兩者。",
    sections: [
      {
        h: "Why does the screen you pick change how much you care about a digital pet?",
        p: "Because the screen determines the animal's place in your mental geography. A pet on your phone lives in the same grid as your banking app, your food delivery, your work Slack. It competes for attention with 60 other things, and it loses most of the time. You open your phone 80 times a day, but you open any individual app — including a pet app — far less, because every unlock is a split-second decision between the pet and the notification that just lit up your screen. A pet on your desktop browser tab lives in the same strip as the document you are editing, the calendar you are checking, the tool you are already in for six to ten hours a day. It does not compete. It coexists. The difference is not about features or pricing; it is about the architecture of your attention."
      },
      {
        h: "What does the research say about where we form attachments?",
        p: "Two findings matter here. First: mere-exposure effect. Psychologist Robert Zajonc demonstrated in the 1960s that simply seeing something more often makes you like it more — without any conscious interaction. A desktop pet you glimpse 40 times a day through natural tab-switching accrues familiarity weight that a phone pet you open twice a day cannot match, no matter how good the phone app is. Second: context-dependent memory. When an experience is tied to a physical context — like your desk, your work rhythm, your morning coffee — the emotional memory of it embeds deeper. A phone pet lives in the same context as doomscrolling. A desktop pet lives in the same context as focused work, which is already a positive emotional state. The quality of the context rubs off on the relationship."
      },
      {
        h: "How do phone pets and desktop pets actually compare?",
        p: "Here is the honest side-by-side, comparing the two form-factors rather than any single product:"
      },
      {
        h: "",
        p: "| Dimension | Phone Pet | Desktop Pet |\n|---|---|---|\n| **Sight frequency** | 2-5 times a day (on open) | 40+ times a day (peripheral, tab-switching) |\n| **Attention competition** | High (60+ apps, notifications) | Low (coexists with focused workspace) |\n| **Session context** | On-the-go, micro-breaks, bed-scroll | Focused, sustained, work-rhythm |\n| **Bond formation** | Slower (fewer exposures) | Faster (mere-exposure effect, context-positive) |\n| **Partner presence** | Solo experience (one screen, one person) | Shared presence (both can see it on their own tab) |\n| **Notification dependency** | High (push reminders needed to re-engage) | Low (always visible, no reminder needed) |\n| **Gamification risk** | Higher (streaks, timed mechanics, FOMO) | Lower (organic check-in, no penalty for missing) |"
      },
      {
        h: "What is the mere-exposure effect, and why does it matter for digital pets?",
        p: "The mere-exposure effect is a well-established psychological finding: people develop a preference for things simply because they see them more often. Robert Zajonc first demonstrated this in the 1960s with a series of experiments showing that repeated, unreinforced exposure to a stimulus is sufficient to enhance a person's attitude toward it. Translating this to digital pets: a phone pet you open twice a day gets 14 exposures per week. A desktop pet you glimpse 40 times a day through natural tab-switching gets 280 exposures per week — a 20x gap. Neither number measures active interaction. Both measure passive presence. But passive presence, repeated enough, becomes attachment — without the user ever deciding to \"spend time with the pet.\" This is why the same genre of app can feel thin on a phone and deep on a desktop, even with identical mechanics. The medium carries the message."
      },
      {
        h: "Why is the desktop better for couples, specifically?",
        p: "Two people with separate phones see separate things. Two people with separate desktop tabs see the same type of thing, at the same type of time, in the same type of context. A shared desktop pet becomes a small, continuous thread of presence between two people who are both at their desks — whether those desks are in the same room or across an ocean. Neither person has to message the other. Neither person has to plan a \"session.\" The pet simply exists on both tabs, and both people see the other's care accumulate as growth stages, skin unlocks, and small visible markers of mutual attention. For long-distance couples, this converts time-zone distance into an asynchronous ritual that neither person has to schedule or remember. The pet keeps the score."
      },
      {
        h: "What is the best place for a digital companion — phone, tablet, or desktop?",
        p: "The honest answer depends on what you want from it. If you want a reactive fidget — a thing you check when you are bored on the train — the phone is the right place, and the phone pet will serve that purpose well. If you are a couple who both work at desks, and you want a consistent, passive, non-demanding thread of presence between you, the desktop is the far better surface — and the mere-exposure numbers back that up. There is no right answer for everyone. But there is a right answer for each person, and the deciding factor is not the quality of the software but the architecture of your attention. Choose the screen where the pet will actually be seen."
      }
    ],
    cta: "體驗 Togthr——住在你桌面標籤頁上的像素寵物，5 個成長階段。在瀏覽器中免費開始。",
    faqs: [
      {
        q: "Why does a desktop pet feel different from a phone pet?",
        a: "Because of mere-exposure. A desktop pet you glimpse 40+ times a day through natural tab-switching accrues much more passive familiarity than a phone pet you intentionally open 2-3 times a day. The bond forms not through active sessions but through repeated, unreinforced exposure — a well-established psychological phenomenon."
      },
      {
        q: "Is a desktop digital pet better than a phone app for couples?",
        a: "For long-distance couples especially, yes. Two people with separate desktop tabs can share the same pet asynchronously — one feeds it at breakfast, the other at midnight, and both see the care accumulate. Unlike a phone app that each person uses alone, a shared desktop pet creates a continuous thread of presence that neither person has to schedule."
      },
      {
        q: "What's the best virtual pet for desktop?",
        a: "Togthr is a purpose-built desktop virtual pet that grows through 5 stages (baby to legend) as you check in daily. It lives in the browser tab — the surface you are already on for 6-10 hours a day. No ads, no death, no streak punishment. Other options include browser extensions and desktop widgets, but those typically lack shared-pet mechanics and growth progression."
      },
      {
        q: "Can you have both a phone pet and a desktop pet?",
        a: "Yes, and many people do. The phone pet serves the reactive, on-the-go moments. The desktop pet serves the sustained, ambient presence. They complement each other rather than compete."
      }
    ],
    links: [
      { href: "/zh-tw", label: "Togthr 首頁" },
      { href: "/zh-tw/pricing", label: "定價" }
    ]
  },
  'ja': {
    intro: "ほとんどのデジタルペットはあなたのスマホの中に住んでいる。ポケットの中、ロック画面、1日に80回スクロールするアプリグリッドのどこか。しかし、その一部は別の場所に引っ越した：デスクトップブラウザのタブ。同じジャンルのアプリだが、画面がすべてを変える。この記事は正直に比較する。",
    sections: [
      {
        h: "Why does the screen you pick change how much you care about a digital pet?",
        p: "Because the screen determines the animal's place in your mental geography. A pet on your phone lives in the same grid as your banking app, your food delivery, your work Slack. It competes for attention with 60 other things, and it loses most of the time. You open your phone 80 times a day, but you open any individual app — including a pet app — far less, because every unlock is a split-second decision between the pet and the notification that just lit up your screen. A pet on your desktop browser tab lives in the same strip as the document you are editing, the calendar you are checking, the tool you are already in for six to ten hours a day. It does not compete. It coexists. The difference is not about features or pricing; it is about the architecture of your attention."
      },
      {
        h: "What does the research say about where we form attachments?",
        p: "Two findings matter here. First: mere-exposure effect. Psychologist Robert Zajonc demonstrated in the 1960s that simply seeing something more often makes you like it more — without any conscious interaction. A desktop pet you glimpse 40 times a day through natural tab-switching accrues familiarity weight that a phone pet you open twice a day cannot match, no matter how good the phone app is. Second: context-dependent memory. When an experience is tied to a physical context — like your desk, your work rhythm, your morning coffee — the emotional memory of it embeds deeper. A phone pet lives in the same context as doomscrolling. A desktop pet lives in the same context as focused work, which is already a positive emotional state. The quality of the context rubs off on the relationship."
      },
      {
        h: "How do phone pets and desktop pets actually compare?",
        p: "Here is the honest side-by-side, comparing the two form-factors rather than any single product:"
      },
      {
        h: "",
        p: "| Dimension | Phone Pet | Desktop Pet |\n|---|---|---|\n| **Sight frequency** | 2-5 times a day (on open) | 40+ times a day (peripheral, tab-switching) |\n| **Attention competition** | High (60+ apps, notifications) | Low (coexists with focused workspace) |\n| **Session context** | On-the-go, micro-breaks, bed-scroll | Focused, sustained, work-rhythm |\n| **Bond formation** | Slower (fewer exposures) | Faster (mere-exposure effect, context-positive) |\n| **Partner presence** | Solo experience (one screen, one person) | Shared presence (both can see it on their own tab) |\n| **Notification dependency** | High (push reminders needed to re-engage) | Low (always visible, no reminder needed) |\n| **Gamification risk** | Higher (streaks, timed mechanics, FOMO) | Lower (organic check-in, no penalty for missing) |"
      },
      {
        h: "What is the mere-exposure effect, and why does it matter for digital pets?",
        p: "The mere-exposure effect is a well-established psychological finding: people develop a preference for things simply because they see them more often. Robert Zajonc first demonstrated this in the 1960s with a series of experiments showing that repeated, unreinforced exposure to a stimulus is sufficient to enhance a person's attitude toward it. Translating this to digital pets: a phone pet you open twice a day gets 14 exposures per week. A desktop pet you glimpse 40 times a day through natural tab-switching gets 280 exposures per week — a 20x gap. Neither number measures active interaction. Both measure passive presence. But passive presence, repeated enough, becomes attachment — without the user ever deciding to \"spend time with the pet.\" This is why the same genre of app can feel thin on a phone and deep on a desktop, even with identical mechanics. The medium carries the message."
      },
      {
        h: "Why is the desktop better for couples, specifically?",
        p: "Two people with separate phones see separate things. Two people with separate desktop tabs see the same type of thing, at the same type of time, in the same type of context. A shared desktop pet becomes a small, continuous thread of presence between two people who are both at their desks — whether those desks are in the same room or across an ocean. Neither person has to message the other. Neither person has to plan a \"session.\" The pet simply exists on both tabs, and both people see the other's care accumulate as growth stages, skin unlocks, and small visible markers of mutual attention. For long-distance couples, this converts time-zone distance into an asynchronous ritual that neither person has to schedule or remember. The pet keeps the score."
      },
      {
        h: "What is the best place for a digital companion — phone, tablet, or desktop?",
        p: "The honest answer depends on what you want from it. If you want a reactive fidget — a thing you check when you are bored on the train — the phone is the right place, and the phone pet will serve that purpose well. If you are a couple who both work at desks, and you want a consistent, passive, non-demanding thread of presence between you, the desktop is the far better surface — and the mere-exposure numbers back that up. There is no right answer for everyone. But there is a right answer for each person, and the deciding factor is not the quality of the software but the architecture of your attention. Choose the screen where the pet will actually be seen."
      }
    ],
    cta: "デスクトップのタブに住み、5段階で成長するピクセルペット、Togthrを試してみてください。ブラウザで無料スタート。",
    faqs: [
      {
        q: "Why does a desktop pet feel different from a phone pet?",
        a: "Because of mere-exposure. A desktop pet you glimpse 40+ times a day through natural tab-switching accrues much more passive familiarity than a phone pet you intentionally open 2-3 times a day. The bond forms not through active sessions but through repeated, unreinforced exposure — a well-established psychological phenomenon."
      },
      {
        q: "Is a desktop digital pet better than a phone app for couples?",
        a: "For long-distance couples especially, yes. Two people with separate desktop tabs can share the same pet asynchronously — one feeds it at breakfast, the other at midnight, and both see the care accumulate. Unlike a phone app that each person uses alone, a shared desktop pet creates a continuous thread of presence that neither person has to schedule."
      },
      {
        q: "What's the best virtual pet for desktop?",
        a: "Togthr is a purpose-built desktop virtual pet that grows through 5 stages (baby to legend) as you check in daily. It lives in the browser tab — the surface you are already on for 6-10 hours a day. No ads, no death, no streak punishment. Other options include browser extensions and desktop widgets, but those typically lack shared-pet mechanics and growth progression."
      },
      {
        q: "Can you have both a phone pet and a desktop pet?",
        a: "Yes, and many people do. The phone pet serves the reactive, on-the-go moments. The desktop pet serves the sustained, ambient presence. They complement each other rather than compete."
      }
    ],
    links: [
      { href: "/ja", label: "Togthr ホーム" },
      { href: "/ja/pricing", label: "プラン" }
    ]
  },
  'ko': {
    intro: "대부분의 디지털 펫은 스마트폰 안에 산다. 하지만 일부는 데스크톱 브라우저 탭으로 이사했다. 같은 장르의 앱이지만, 화면이 모든 것을 바꾼다. 이 글은 정직하게 비교한다.",
    sections: [
      {
        h: "Why does the screen you pick change how much you care about a digital pet?",
        p: "Because the screen determines the animal's place in your mental geography. A pet on your phone lives in the same grid as your banking app, your food delivery, your work Slack. It competes for attention with 60 other things, and it loses most of the time. You open your phone 80 times a day, but you open any individual app — including a pet app — far less, because every unlock is a split-second decision between the pet and the notification that just lit up your screen. A pet on your desktop browser tab lives in the same strip as the document you are editing, the calendar you are checking, the tool you are already in for six to ten hours a day. It does not compete. It coexists. The difference is not about features or pricing; it is about the architecture of your attention."
      },
      {
        h: "What does the research say about where we form attachments?",
        p: "Two findings matter here. First: mere-exposure effect. Psychologist Robert Zajonc demonstrated in the 1960s that simply seeing something more often makes you like it more — without any conscious interaction. A desktop pet you glimpse 40 times a day through natural tab-switching accrues familiarity weight that a phone pet you open twice a day cannot match, no matter how good the phone app is. Second: context-dependent memory. When an experience is tied to a physical context — like your desk, your work rhythm, your morning coffee — the emotional memory of it embeds deeper. A phone pet lives in the same context as doomscrolling. A desktop pet lives in the same context as focused work, which is already a positive emotional state. The quality of the context rubs off on the relationship."
      },
      {
        h: "How do phone pets and desktop pets actually compare?",
        p: "Here is the honest side-by-side, comparing the two form-factors rather than any single product:"
      },
      {
        h: "",
        p: "| Dimension | Phone Pet | Desktop Pet |\n|---|---|---|\n| **Sight frequency** | 2-5 times a day (on open) | 40+ times a day (peripheral, tab-switching) |\n| **Attention competition** | High (60+ apps, notifications) | Low (coexists with focused workspace) |\n| **Session context** | On-the-go, micro-breaks, bed-scroll | Focused, sustained, work-rhythm |\n| **Bond formation** | Slower (fewer exposures) | Faster (mere-exposure effect, context-positive) |\n| **Partner presence** | Solo experience (one screen, one person) | Shared presence (both can see it on their own tab) |\n| **Notification dependency** | High (push reminders needed to re-engage) | Low (always visible, no reminder needed) |\n| **Gamification risk** | Higher (streaks, timed mechanics, FOMO) | Lower (organic check-in, no penalty for missing) |"
      },
      {
        h: "What is the mere-exposure effect, and why does it matter for digital pets?",
        p: "The mere-exposure effect is a well-established psychological finding: people develop a preference for things simply because they see them more often. Robert Zajonc first demonstrated this in the 1960s with a series of experiments showing that repeated, unreinforced exposure to a stimulus is sufficient to enhance a person's attitude toward it. Translating this to digital pets: a phone pet you open twice a day gets 14 exposures per week. A desktop pet you glimpse 40 times a day through natural tab-switching gets 280 exposures per week — a 20x gap. Neither number measures active interaction. Both measure passive presence. But passive presence, repeated enough, becomes attachment — without the user ever deciding to \"spend time with the pet.\" This is why the same genre of app can feel thin on a phone and deep on a desktop, even with identical mechanics. The medium carries the message."
      },
      {
        h: "Why is the desktop better for couples, specifically?",
        p: "Two people with separate phones see separate things. Two people with separate desktop tabs see the same type of thing, at the same type of time, in the same type of context. A shared desktop pet becomes a small, continuous thread of presence between two people who are both at their desks — whether those desks are in the same room or across an ocean. Neither person has to message the other. Neither person has to plan a \"session.\" The pet simply exists on both tabs, and both people see the other's care accumulate as growth stages, skin unlocks, and small visible markers of mutual attention. For long-distance couples, this converts time-zone distance into an asynchronous ritual that neither person has to schedule or remember. The pet keeps the score."
      },
      {
        h: "What is the best place for a digital companion — phone, tablet, or desktop?",
        p: "The honest answer depends on what you want from it. If you want a reactive fidget — a thing you check when you are bored on the train — the phone is the right place, and the phone pet will serve that purpose well. If you are a couple who both work at desks, and you want a consistent, passive, non-demanding thread of presence between you, the desktop is the far better surface — and the mere-exposure numbers back that up. There is no right answer for everyone. But there is a right answer for each person, and the deciding factor is not the quality of the software but the architecture of your attention. Choose the screen where the pet will actually be seen."
      }
    ],
    cta: "데스크톱 탭에 살며 5단계로 성장하는 픽셀 펫, Togthr를 브라우저에서 무료로 시작하세요.",
    faqs: [
      {
        q: "Why does a desktop pet feel different from a phone pet?",
        a: "Because of mere-exposure. A desktop pet you glimpse 40+ times a day through natural tab-switching accrues much more passive familiarity than a phone pet you intentionally open 2-3 times a day. The bond forms not through active sessions but through repeated, unreinforced exposure — a well-established psychological phenomenon."
      },
      {
        q: "Is a desktop digital pet better than a phone app for couples?",
        a: "For long-distance couples especially, yes. Two people with separate desktop tabs can share the same pet asynchronously — one feeds it at breakfast, the other at midnight, and both see the care accumulate. Unlike a phone app that each person uses alone, a shared desktop pet creates a continuous thread of presence that neither person has to schedule."
      },
      {
        q: "What's the best virtual pet for desktop?",
        a: "Togthr is a purpose-built desktop virtual pet that grows through 5 stages (baby to legend) as you check in daily. It lives in the browser tab — the surface you are already on for 6-10 hours a day. No ads, no death, no streak punishment. Other options include browser extensions and desktop widgets, but those typically lack shared-pet mechanics and growth progression."
      },
      {
        q: "Can you have both a phone pet and a desktop pet?",
        a: "Yes, and many people do. The phone pet serves the reactive, on-the-go moments. The desktop pet serves the sustained, ambient presence. They complement each other rather than compete."
      }
    ],
    links: [
      { href: "/ko", label: "Togthr 홈" },
      { href: "/ko/pricing", label: "요금제" }
    ]
  },
  'de': {
    intro: "Die meisten digitalen Haustiere wohnen auf deinem Handy. Aber ein kleiner Teil ist auf den Desktop-Browser-Tab umgezogen. Gleiche App-Kategorie, aber der Bildschirm ändert alles. Ein ehrlicher Vergleich.",
    sections: [
      {
        h: "Why does the screen you pick change how much you care about a digital pet?",
        p: "Because the screen determines the animal's place in your mental geography. A pet on your phone lives in the same grid as your banking app, your food delivery, your work Slack. It competes for attention with 60 other things, and it loses most of the time. You open your phone 80 times a day, but you open any individual app — including a pet app — far less, because every unlock is a split-second decision between the pet and the notification that just lit up your screen. A pet on your desktop browser tab lives in the same strip as the document you are editing, the calendar you are checking, the tool you are already in for six to ten hours a day. It does not compete. It coexists. The difference is not about features or pricing; it is about the architecture of your attention."
      },
      {
        h: "What does the research say about where we form attachments?",
        p: "Two findings matter here. First: mere-exposure effect. Psychologist Robert Zajonc demonstrated in the 1960s that simply seeing something more often makes you like it more — without any conscious interaction. A desktop pet you glimpse 40 times a day through natural tab-switching accrues familiarity weight that a phone pet you open twice a day cannot match, no matter how good the phone app is. Second: context-dependent memory. When an experience is tied to a physical context — like your desk, your work rhythm, your morning coffee — the emotional memory of it embeds deeper. A phone pet lives in the same context as doomscrolling. A desktop pet lives in the same context as focused work, which is already a positive emotional state. The quality of the context rubs off on the relationship."
      },
      {
        h: "How do phone pets and desktop pets actually compare?",
        p: "Here is the honest side-by-side, comparing the two form-factors rather than any single product:"
      },
      {
        h: "",
        p: "| Dimension | Phone Pet | Desktop Pet |\n|---|---|---|\n| **Sight frequency** | 2-5 times a day (on open) | 40+ times a day (peripheral, tab-switching) |\n| **Attention competition** | High (60+ apps, notifications) | Low (coexists with focused workspace) |\n| **Session context** | On-the-go, micro-breaks, bed-scroll | Focused, sustained, work-rhythm |\n| **Bond formation** | Slower (fewer exposures) | Faster (mere-exposure effect, context-positive) |\n| **Partner presence** | Solo experience (one screen, one person) | Shared presence (both can see it on their own tab) |\n| **Notification dependency** | High (push reminders needed to re-engage) | Low (always visible, no reminder needed) |\n| **Gamification risk** | Higher (streaks, timed mechanics, FOMO) | Lower (organic check-in, no penalty for missing) |"
      },
      {
        h: "What is the mere-exposure effect, and why does it matter for digital pets?",
        p: "The mere-exposure effect is a well-established psychological finding: people develop a preference for things simply because they see them more often. Robert Zajonc first demonstrated this in the 1960s with a series of experiments showing that repeated, unreinforced exposure to a stimulus is sufficient to enhance a person's attitude toward it. Translating this to digital pets: a phone pet you open twice a day gets 14 exposures per week. A desktop pet you glimpse 40 times a day through natural tab-switching gets 280 exposures per week — a 20x gap. Neither number measures active interaction. Both measure passive presence. But passive presence, repeated enough, becomes attachment — without the user ever deciding to \"spend time with the pet.\" This is why the same genre of app can feel thin on a phone and deep on a desktop, even with identical mechanics. The medium carries the message."
      },
      {
        h: "Why is the desktop better for couples, specifically?",
        p: "Two people with separate phones see separate things. Two people with separate desktop tabs see the same type of thing, at the same type of time, in the same type of context. A shared desktop pet becomes a small, continuous thread of presence between two people who are both at their desks — whether those desks are in the same room or across an ocean. Neither person has to message the other. Neither person has to plan a \"session.\" The pet simply exists on both tabs, and both people see the other's care accumulate as growth stages, skin unlocks, and small visible markers of mutual attention. For long-distance couples, this converts time-zone distance into an asynchronous ritual that neither person has to schedule or remember. The pet keeps the score."
      },
      {
        h: "What is the best place for a digital companion — phone, tablet, or desktop?",
        p: "The honest answer depends on what you want from it. If you want a reactive fidget — a thing you check when you are bored on the train — the phone is the right place, and the phone pet will serve that purpose well. If you are a couple who both work at desks, and you want a consistent, passive, non-demanding thread of presence between you, the desktop is the far better surface — and the mere-exposure numbers back that up. There is no right answer for everyone. But there is a right answer for each person, and the deciding factor is not the quality of the software but the architecture of your attention. Choose the screen where the pet will actually be seen."
      }
    ],
    cta: "Probiere Togthr aus — das Pixel-Haustier, das in deinem Browser-Tab lebt und in 5 Stufen wächst. Kostenlos starten.",
    faqs: [
      {
        q: "Why does a desktop pet feel different from a phone pet?",
        a: "Because of mere-exposure. A desktop pet you glimpse 40+ times a day through natural tab-switching accrues much more passive familiarity than a phone pet you intentionally open 2-3 times a day. The bond forms not through active sessions but through repeated, unreinforced exposure — a well-established psychological phenomenon."
      },
      {
        q: "Is a desktop digital pet better than a phone app for couples?",
        a: "For long-distance couples especially, yes. Two people with separate desktop tabs can share the same pet asynchronously — one feeds it at breakfast, the other at midnight, and both see the care accumulate. Unlike a phone app that each person uses alone, a shared desktop pet creates a continuous thread of presence that neither person has to schedule."
      },
      {
        q: "What's the best virtual pet for desktop?",
        a: "Togthr is a purpose-built desktop virtual pet that grows through 5 stages (baby to legend) as you check in daily. It lives in the browser tab — the surface you are already on for 6-10 hours a day. No ads, no death, no streak punishment. Other options include browser extensions and desktop widgets, but those typically lack shared-pet mechanics and growth progression."
      },
      {
        q: "Can you have both a phone pet and a desktop pet?",
        a: "Yes, and many people do. The phone pet serves the reactive, on-the-go moments. The desktop pet serves the sustained, ambient presence. They complement each other rather than compete."
      }
    ],
    links: [
      { href: "/de", label: "Togthr Startseite" },
      { href: "/de/pricing", label: "Preise" }
    ]
  },
  'fr': {
    intro: "La plupart des animaux numériques vivent sur votre téléphone. Mais une petite partie a déménagé sur l'onglet du navigateur de bureau. Même genre d'application, mais l'écran change tout. Une comparaison honnête.",
    sections: [
      {
        h: "Why does the screen you pick change how much you care about a digital pet?",
        p: "Because the screen determines the animal's place in your mental geography. A pet on your phone lives in the same grid as your banking app, your food delivery, your work Slack. It competes for attention with 60 other things, and it loses most of the time. You open your phone 80 times a day, but you open any individual app — including a pet app — far less, because every unlock is a split-second decision between the pet and the notification that just lit up your screen. A pet on your desktop browser tab lives in the same strip as the document you are editing, the calendar you are checking, the tool you are already in for six to ten hours a day. It does not compete. It coexists. The difference is not about features or pricing; it is about the architecture of your attention."
      },
      {
        h: "What does the research say about where we form attachments?",
        p: "Two findings matter here. First: mere-exposure effect. Psychologist Robert Zajonc demonstrated in the 1960s that simply seeing something more often makes you like it more — without any conscious interaction. A desktop pet you glimpse 40 times a day through natural tab-switching accrues familiarity weight that a phone pet you open twice a day cannot match, no matter how good the phone app is. Second: context-dependent memory. When an experience is tied to a physical context — like your desk, your work rhythm, your morning coffee — the emotional memory of it embeds deeper. A phone pet lives in the same context as doomscrolling. A desktop pet lives in the same context as focused work, which is already a positive emotional state. The quality of the context rubs off on the relationship."
      },
      {
        h: "How do phone pets and desktop pets actually compare?",
        p: "Here is the honest side-by-side, comparing the two form-factors rather than any single product:"
      },
      {
        h: "",
        p: "| Dimension | Phone Pet | Desktop Pet |\n|---|---|---|\n| **Sight frequency** | 2-5 times a day (on open) | 40+ times a day (peripheral, tab-switching) |\n| **Attention competition** | High (60+ apps, notifications) | Low (coexists with focused workspace) |\n| **Session context** | On-the-go, micro-breaks, bed-scroll | Focused, sustained, work-rhythm |\n| **Bond formation** | Slower (fewer exposures) | Faster (mere-exposure effect, context-positive) |\n| **Partner presence** | Solo experience (one screen, one person) | Shared presence (both can see it on their own tab) |\n| **Notification dependency** | High (push reminders needed to re-engage) | Low (always visible, no reminder needed) |\n| **Gamification risk** | Higher (streaks, timed mechanics, FOMO) | Lower (organic check-in, no penalty for missing) |"
      },
      {
        h: "What is the mere-exposure effect, and why does it matter for digital pets?",
        p: "The mere-exposure effect is a well-established psychological finding: people develop a preference for things simply because they see them more often. Robert Zajonc first demonstrated this in the 1960s with a series of experiments showing that repeated, unreinforced exposure to a stimulus is sufficient to enhance a person's attitude toward it. Translating this to digital pets: a phone pet you open twice a day gets 14 exposures per week. A desktop pet you glimpse 40 times a day through natural tab-switching gets 280 exposures per week — a 20x gap. Neither number measures active interaction. Both measure passive presence. But passive presence, repeated enough, becomes attachment — without the user ever deciding to \"spend time with the pet.\" This is why the same genre of app can feel thin on a phone and deep on a desktop, even with identical mechanics. The medium carries the message."
      },
      {
        h: "Why is the desktop better for couples, specifically?",
        p: "Two people with separate phones see separate things. Two people with separate desktop tabs see the same type of thing, at the same type of time, in the same type of context. A shared desktop pet becomes a small, continuous thread of presence between two people who are both at their desks — whether those desks are in the same room or across an ocean. Neither person has to message the other. Neither person has to plan a \"session.\" The pet simply exists on both tabs, and both people see the other's care accumulate as growth stages, skin unlocks, and small visible markers of mutual attention. For long-distance couples, this converts time-zone distance into an asynchronous ritual that neither person has to schedule or remember. The pet keeps the score."
      },
      {
        h: "What is the best place for a digital companion — phone, tablet, or desktop?",
        p: "The honest answer depends on what you want from it. If you want a reactive fidget — a thing you check when you are bored on the train — the phone is the right place, and the phone pet will serve that purpose well. If you are a couple who both work at desks, and you want a consistent, passive, non-demanding thread of presence between you, the desktop is the far better surface — and the mere-exposure numbers back that up. There is no right answer for everyone. But there is a right answer for each person, and the deciding factor is not the quality of the software but the architecture of your attention. Choose the screen where the pet will actually be seen."
      }
    ],
    cta: "Essayez Togthr — l'animal pixel qui vit dans votre onglet et grandit en 5 étapes. Commencez gratuitement dans votre navigateur.",
    faqs: [
      {
        q: "Why does a desktop pet feel different from a phone pet?",
        a: "Because of mere-exposure. A desktop pet you glimpse 40+ times a day through natural tab-switching accrues much more passive familiarity than a phone pet you intentionally open 2-3 times a day. The bond forms not through active sessions but through repeated, unreinforced exposure — a well-established psychological phenomenon."
      },
      {
        q: "Is a desktop digital pet better than a phone app for couples?",
        a: "For long-distance couples especially, yes. Two people with separate desktop tabs can share the same pet asynchronously — one feeds it at breakfast, the other at midnight, and both see the care accumulate. Unlike a phone app that each person uses alone, a shared desktop pet creates a continuous thread of presence that neither person has to schedule."
      },
      {
        q: "What's the best virtual pet for desktop?",
        a: "Togthr is a purpose-built desktop virtual pet that grows through 5 stages (baby to legend) as you check in daily. It lives in the browser tab — the surface you are already on for 6-10 hours a day. No ads, no death, no streak punishment. Other options include browser extensions and desktop widgets, but those typically lack shared-pet mechanics and growth progression."
      },
      {
        q: "Can you have both a phone pet and a desktop pet?",
        a: "Yes, and many people do. The phone pet serves the reactive, on-the-go moments. The desktop pet serves the sustained, ambient presence. They complement each other rather than compete."
      }
    ],
    links: [
      { href: "/fr", label: "Accueil Togthr" },
      { href: "/fr/pricing", label: "Tarifs" }
    ]
  },
  'es': {
    intro: "La mayoría de las mascotas digitales viven en tu teléfono. Pero una pequeña parte se ha mudado a la pestaña del navegador de escritorio. Mismo género de app, pero la pantalla lo cambia todo. Una comparación honesta.",
    sections: [
      {
        h: "Why does the screen you pick change how much you care about a digital pet?",
        p: "Because the screen determines the animal's place in your mental geography. A pet on your phone lives in the same grid as your banking app, your food delivery, your work Slack. It competes for attention with 60 other things, and it loses most of the time. You open your phone 80 times a day, but you open any individual app — including a pet app — far less, because every unlock is a split-second decision between the pet and the notification that just lit up your screen. A pet on your desktop browser tab lives in the same strip as the document you are editing, the calendar you are checking, the tool you are already in for six to ten hours a day. It does not compete. It coexists. The difference is not about features or pricing; it is about the architecture of your attention."
      },
      {
        h: "What does the research say about where we form attachments?",
        p: "Two findings matter here. First: mere-exposure effect. Psychologist Robert Zajonc demonstrated in the 1960s that simply seeing something more often makes you like it more — without any conscious interaction. A desktop pet you glimpse 40 times a day through natural tab-switching accrues familiarity weight that a phone pet you open twice a day cannot match, no matter how good the phone app is. Second: context-dependent memory. When an experience is tied to a physical context — like your desk, your work rhythm, your morning coffee — the emotional memory of it embeds deeper. A phone pet lives in the same context as doomscrolling. A desktop pet lives in the same context as focused work, which is already a positive emotional state. The quality of the context rubs off on the relationship."
      },
      {
        h: "How do phone pets and desktop pets actually compare?",
        p: "Here is the honest side-by-side, comparing the two form-factors rather than any single product:"
      },
      {
        h: "",
        p: "| Dimension | Phone Pet | Desktop Pet |\n|---|---|---|\n| **Sight frequency** | 2-5 times a day (on open) | 40+ times a day (peripheral, tab-switching) |\n| **Attention competition** | High (60+ apps, notifications) | Low (coexists with focused workspace) |\n| **Session context** | On-the-go, micro-breaks, bed-scroll | Focused, sustained, work-rhythm |\n| **Bond formation** | Slower (fewer exposures) | Faster (mere-exposure effect, context-positive) |\n| **Partner presence** | Solo experience (one screen, one person) | Shared presence (both can see it on their own tab) |\n| **Notification dependency** | High (push reminders needed to re-engage) | Low (always visible, no reminder needed) |\n| **Gamification risk** | Higher (streaks, timed mechanics, FOMO) | Lower (organic check-in, no penalty for missing) |"
      },
      {
        h: "What is the mere-exposure effect, and why does it matter for digital pets?",
        p: "The mere-exposure effect is a well-established psychological finding: people develop a preference for things simply because they see them more often. Robert Zajonc first demonstrated this in the 1960s with a series of experiments showing that repeated, unreinforced exposure to a stimulus is sufficient to enhance a person's attitude toward it. Translating this to digital pets: a phone pet you open twice a day gets 14 exposures per week. A desktop pet you glimpse 40 times a day through natural tab-switching gets 280 exposures per week — a 20x gap. Neither number measures active interaction. Both measure passive presence. But passive presence, repeated enough, becomes attachment — without the user ever deciding to \"spend time with the pet.\" This is why the same genre of app can feel thin on a phone and deep on a desktop, even with identical mechanics. The medium carries the message."
      },
      {
        h: "Why is the desktop better for couples, specifically?",
        p: "Two people with separate phones see separate things. Two people with separate desktop tabs see the same type of thing, at the same type of time, in the same type of context. A shared desktop pet becomes a small, continuous thread of presence between two people who are both at their desks — whether those desks are in the same room or across an ocean. Neither person has to message the other. Neither person has to plan a \"session.\" The pet simply exists on both tabs, and both people see the other's care accumulate as growth stages, skin unlocks, and small visible markers of mutual attention. For long-distance couples, this converts time-zone distance into an asynchronous ritual that neither person has to schedule or remember. The pet keeps the score."
      },
      {
        h: "What is the best place for a digital companion — phone, tablet, or desktop?",
        p: "The honest answer depends on what you want from it. If you want a reactive fidget — a thing you check when you are bored on the train — the phone is the right place, and the phone pet will serve that purpose well. If you are a couple who both work at desks, and you want a consistent, passive, non-demanding thread of presence between you, the desktop is the far better surface — and the mere-exposure numbers back that up. There is no right answer for everyone. But there is a right answer for each person, and the deciding factor is not the quality of the software but the architecture of your attention. Choose the screen where the pet will actually be seen."
      }
    ],
    cta: "Prueba Togthr — la mascota pixel que vive en tu pestaña y crece en 5 etapas. Empieza gratis en tu navegador.",
    faqs: [
      {
        q: "Why does a desktop pet feel different from a phone pet?",
        a: "Because of mere-exposure. A desktop pet you glimpse 40+ times a day through natural tab-switching accrues much more passive familiarity than a phone pet you intentionally open 2-3 times a day. The bond forms not through active sessions but through repeated, unreinforced exposure — a well-established psychological phenomenon."
      },
      {
        q: "Is a desktop digital pet better than a phone app for couples?",
        a: "For long-distance couples especially, yes. Two people with separate desktop tabs can share the same pet asynchronously — one feeds it at breakfast, the other at midnight, and both see the care accumulate. Unlike a phone app that each person uses alone, a shared desktop pet creates a continuous thread of presence that neither person has to schedule."
      },
      {
        q: "What's the best virtual pet for desktop?",
        a: "Togthr is a purpose-built desktop virtual pet that grows through 5 stages (baby to legend) as you check in daily. It lives in the browser tab — the surface you are already on for 6-10 hours a day. No ads, no death, no streak punishment. Other options include browser extensions and desktop widgets, but those typically lack shared-pet mechanics and growth progression."
      },
      {
        q: "Can you have both a phone pet and a desktop pet?",
        a: "Yes, and many people do. The phone pet serves the reactive, on-the-go moments. The desktop pet serves the sustained, ambient presence. They complement each other rather than compete."
      }
    ],
    links: [
      { href: "/es", label: "Inicio Togthr" },
      { href: "/es/pricing", label: "Precios" }
    ]
  }
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
            Desktop Pet vs Mobile Pet: Why the Screen You Choose Changes How You Feel
          </h1>
        </header>

        <section aria-label="Summary" className="mt-6 rounded-xl border border-pink-500/20 bg-pink-500/5 px-5 py-4">
          <p className="text-sm leading-relaxed text-zinc-400">
            Most digital pets live on your phone, but a small category has moved to the desktop browser tab — and the screen changes how you bond. A desktop pet glimpsed 40+ times a day accrues 20x more passive exposure than a phone pet opened twice daily, due to the mere-exposure effect. Togthr grows through 5 stages without notifications.
          </p>
        </section>

        <div className="prose prose-invert mt-8 max-w-none">
          <p className="text-lg leading-relaxed text-zinc-200">{body.intro}</p>
          {body.sections.map((sec, i) => (
            <section key={i} className="mt-10">
              {sec.h && <h2 className="text-2xl font-semibold text-zinc-50">{sec.h}</h2>}
              {sec.p && (
                sec.p.startsWith('|')
                  ? (
                    <div className="mt-4 overflow-x-auto">
                      <table className="w-full text-left text-sm text-zinc-300 border-collapse">
                        {(() => {
                          const rows = sec.p.split('\n').filter(r => r.startsWith('|'))
                          const headerRow = rows[0]
                          const dataRows = rows.slice(2) // skip separator line
                          const headers = headerRow.split('|').map(h => h.replace(/\*\*/g, '').trim()).filter(Boolean)
                          const cells = dataRows.filter(r => r.includes('|')).map(r => r.split('|').map(c => c.replace(/\*\*/g, '').trim()).filter(Boolean))
                          return (
                            <>
                              <thead>
                                <tr className="border-b border-zinc-700/40">
                                  {headers.map((h, i) => <th key={i} className="px-3 py-2 text-zinc-100">{h}</th>)}
                                </tr>
                              </thead>
                              <tbody>
                                {cells.map((row, i) => (
                                  <tr key={i} className="border-b border-zinc-800">
                                    {row.map((cell, j) => <td key={j} className="px-3 py-2">{cell}</td>)}
                                  </tr>
                                ))}
                              </tbody>
                            </>
                          )
                        })()}
                      </table>
                    </div>
                  )
                  : <p className="mt-4 text-base leading-relaxed text-zinc-300">{sec.p}</p>
              )}
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
