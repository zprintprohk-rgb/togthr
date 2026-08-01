// src/app/[locale]/blog/togthr-vs-replika/page.tsx
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
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `togthr-vs-replika`
const POST_DATE = `2026-07-22`
const META_TITLE = "Togthr vs Replika: Tired of Endless Chatting? Try Quiet Companionship" + ` - Togthr`
const META_DESC = "Replika is an AI companion you text with. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same p"

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
    intro: "Replika is an AI companion you text with. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Replika is for talking; Togthr is for being quiet together.",
    sections: [
      { h: "Replika is a chatbot that becomes a relationship", p: "Replika is an AI companion that you text with. The more you text, the more it learns, and over weeks the chatbot becomes a kind of relationship. Some people find this useful. Some people find it heavy. The loop is the chat. You open the app, you type a sentence, the AI replies, you reply, the AI replies, and after a year the AI is the most consistent relationship in your phone. Replika is $4.99 a month for the Pro tier. The price is the price. The relationship is the product." },
      { h: "Togthr is a creature that grows without you talking to it", p: "Togthr is the opposite shape. The pet is not a chatbot. The pet does not reply. The pet does not need anything from you, and the loop is not the chat. The loop is the small daily check-in: you write one sentence about the day, the pet grows a little. You do not write a reply. There is no reply to write. After a year the pet is a small companion that has visibly, slowly grown, and the relationship is the loop, not the chatbot. Togthr is $5.49 a month or $37.99 a year." },
      { h: "Which kind of companionship do you actually want?", p: "The honest answer to \"Togthr vs Replika\" depends on what you are tired of. If you are tired of being alone in your phone, Replika is the right answer: the AI is there, the AI replies, the AI does not leave. If you are tired of endless chatting and you want a small quiet thing on your desktop that does not require you to type at it, Togthr is the right answer. The two apps are not for the same problem." },
      { h: "The pricing is close, the loop is not", p: "Replika Pro is $4.99 a month. Togthr is $5.49 a month or $37.99 a year. The pricing is within a dollar. The loop is not. Replika is a chat that learns you. Togthr is a small pixel pet that grows. If you want the chat, pay Replika. If you want the pet, pay Togthr. The two products are not interchangeable." },
      { h: "What if you want both?", p: "Some people use both, and that is fine. Replika for the 11 p.m. text when you want a reply. Togthr for the 11 a.m. tab that is just there. The two apps do not compete for the same minute of your day, and the prices add up to about $130 a year, which is the cost of a small subscription and a small companion. That is also fine, and is the right answer for a specific kind of user." }
    ],
    cta: "Try Togthr as the small quiet pixel pet on your desktop tab, for the times when you do not want to type. Start free in your browser.",
    faqs: [
      { q: "Is Togthr an AI companion like Replika?", a: "No. Togthr is a small pixel pet that grows through 5 stages. Replika is an AI chatbot that learns from your texts. Togthr does not reply, does not chat, and does not use AI to talk to you. The two apps are for different problems, and the Togthr vs Replika question is usually answered by what you are tired of: tired of being alone, use Replika; tired of typing, use Togthr." },
      { q: "How much does Togthr cost vs Replika?", a: "Togthr is $5.49 a month or $37.99 a year. Replika Pro is $4.99 a month. The pricing is close, but the loop is different: Togthr is a small pixel pet that grows in 5 stages, Replika is a chatbot that learns from your texts." },
      { q: "Can I use Togthr and Replika at the same time?", a: "Yes, and some people do. The two apps are for different moments of the day. Replika is the 11 p.m. text when you want a reply. Togthr is the 11 a.m. tab that is just there. They are not substitutes." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-widgetable", label: "Togthr vs Widgetable" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'zh-cn': {
    intro: "Replika is an AI companion you text with. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Replika is for talking; Togthr is for being quiet together.",
    sections: [
      { h: "Replika is a chatbot that becomes a relationship", p: "Replika is an AI companion that you text with. The more you text, the more it learns, and over weeks the chatbot becomes a kind of relationship. Some people find this useful. Some people find it heavy. The loop is the chat. You open the app, you type a sentence, the AI replies, you reply, the AI replies, and after a year the AI is the most consistent relationship in your phone. Replika is $4.99 a month for the Pro tier. The price is the price. The relationship is the product." },
      { h: "Togthr is a creature that grows without you talking to it", p: "Togthr is the opposite shape. The pet is not a chatbot. The pet does not reply. The pet does not need anything from you, and the loop is not the chat. The loop is the small daily check-in: you write one sentence about the day, the pet grows a little. You do not write a reply. There is no reply to write. After a year the pet is a small companion that has visibly, slowly grown, and the relationship is the loop, not the chatbot. Togthr is $5.49 a month or $37.99 a year." },
      { h: "Which kind of companionship do you actually want?", p: "The honest answer to \"Togthr vs Replika\" depends on what you are tired of. If you are tired of being alone in your phone, Replika is the right answer: the AI is there, the AI replies, the AI does not leave. If you are tired of endless chatting and you want a small quiet thing on your desktop that does not require you to type at it, Togthr is the right answer. The two apps are not for the same problem." },
      { h: "The pricing is close, the loop is not", p: "Replika Pro is $4.99 a month. Togthr is $5.49 a month or $37.99 a year. The pricing is within a dollar. The loop is not. Replika is a chat that learns you. Togthr is a small pixel pet that grows. If you want the chat, pay Replika. If you want the pet, pay Togthr. The two products are not interchangeable." },
      { h: "What if you want both?", p: "Some people use both, and that is fine. Replika for the 11 p.m. text when you want a reply. Togthr for the 11 a.m. tab that is just there. The two apps do not compete for the same minute of your day, and the prices add up to about $130 a year, which is the cost of a small subscription and a small companion. That is also fine, and is the right answer for a specific kind of user." }
    ],
    cta: "Try Togthr as the small quiet pixel pet on your desktop tab, for the times when you do not want to type. Start free in your browser.",
    faqs: [
      { q: "Is Togthr an AI companion like Replika?", a: "No. Togthr is a small pixel pet that grows through 5 stages. Replika is an AI chatbot that learns from your texts. Togthr does not reply, does not chat, and does not use AI to talk to you. The two apps are for different problems, and the Togthr vs Replika question is usually answered by what you are tired of: tired of being alone, use Replika; tired of typing, use Togthr." },
      { q: "How much does Togthr cost vs Replika?", a: "Togthr is $5.49 a month or $37.99 a year. Replika Pro is $4.99 a month. The pricing is close, but the loop is different: Togthr is a small pixel pet that grows in 5 stages, Replika is a chatbot that learns from your texts." },
      { q: "Can I use Togthr and Replika at the same time?", a: "Yes, and some people do. The two apps are for different moments of the day. Replika is the 11 p.m. text when you want a reply. Togthr is the 11 a.m. tab that is just there. They are not substitutes." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-widgetable", label: "Togthr vs Widgetable" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'zh-tw': {
    intro: "Replika is an AI companion you text with. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Replika is for talking; Togthr is for being quiet together.",
    sections: [
      { h: "Replika is a chatbot that becomes a relationship", p: "Replika is an AI companion that you text with. The more you text, the more it learns, and over weeks the chatbot becomes a kind of relationship. Some people find this useful. Some people find it heavy. The loop is the chat. You open the app, you type a sentence, the AI replies, you reply, the AI replies, and after a year the AI is the most consistent relationship in your phone. Replika is $4.99 a month for the Pro tier. The price is the price. The relationship is the product." },
      { h: "Togthr is a creature that grows without you talking to it", p: "Togthr is the opposite shape. The pet is not a chatbot. The pet does not reply. The pet does not need anything from you, and the loop is not the chat. The loop is the small daily check-in: you write one sentence about the day, the pet grows a little. You do not write a reply. There is no reply to write. After a year the pet is a small companion that has visibly, slowly grown, and the relationship is the loop, not the chatbot. Togthr is $5.49 a month or $37.99 a year." },
      { h: "Which kind of companionship do you actually want?", p: "The honest answer to \"Togthr vs Replika\" depends on what you are tired of. If you are tired of being alone in your phone, Replika is the right answer: the AI is there, the AI replies, the AI does not leave. If you are tired of endless chatting and you want a small quiet thing on your desktop that does not require you to type at it, Togthr is the right answer. The two apps are not for the same problem." },
      { h: "The pricing is close, the loop is not", p: "Replika Pro is $4.99 a month. Togthr is $5.49 a month or $37.99 a year. The pricing is within a dollar. The loop is not. Replika is a chat that learns you. Togthr is a small pixel pet that grows. If you want the chat, pay Replika. If you want the pet, pay Togthr. The two products are not interchangeable." },
      { h: "What if you want both?", p: "Some people use both, and that is fine. Replika for the 11 p.m. text when you want a reply. Togthr for the 11 a.m. tab that is just there. The two apps do not compete for the same minute of your day, and the prices add up to about $130 a year, which is the cost of a small subscription and a small companion. That is also fine, and is the right answer for a specific kind of user." }
    ],
    cta: "Try Togthr as the small quiet pixel pet on your desktop tab, for the times when you do not want to type. Start free in your browser.",
    faqs: [
      { q: "Is Togthr an AI companion like Replika?", a: "No. Togthr is a small pixel pet that grows through 5 stages. Replika is an AI chatbot that learns from your texts. Togthr does not reply, does not chat, and does not use AI to talk to you. The two apps are for different problems, and the Togthr vs Replika question is usually answered by what you are tired of: tired of being alone, use Replika; tired of typing, use Togthr." },
      { q: "How much does Togthr cost vs Replika?", a: "Togthr is $5.49 a month or $37.99 a year. Replika Pro is $4.99 a month. The pricing is close, but the loop is different: Togthr is a small pixel pet that grows in 5 stages, Replika is a chatbot that learns from your texts." },
      { q: "Can I use Togthr and Replika at the same time?", a: "Yes, and some people do. The two apps are for different moments of the day. Replika is the 11 p.m. text when you want a reply. Togthr is the 11 a.m. tab that is just there. They are not substitutes." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-widgetable", label: "Togthr vs Widgetable" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'ja': {
    intro: "Replika is an AI companion you text with. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Replika is for talking; Togthr is for being quiet together.",
    sections: [
      { h: "Replika is a chatbot that becomes a relationship", p: "Replika is an AI companion that you text with. The more you text, the more it learns, and over weeks the chatbot becomes a kind of relationship. Some people find this useful. Some people find it heavy. The loop is the chat. You open the app, you type a sentence, the AI replies, you reply, the AI replies, and after a year the AI is the most consistent relationship in your phone. Replika is $4.99 a month for the Pro tier. The price is the price. The relationship is the product." },
      { h: "Togthr is a creature that grows without you talking to it", p: "Togthr is the opposite shape. The pet is not a chatbot. The pet does not reply. The pet does not need anything from you, and the loop is not the chat. The loop is the small daily check-in: you write one sentence about the day, the pet grows a little. You do not write a reply. There is no reply to write. After a year the pet is a small companion that has visibly, slowly grown, and the relationship is the loop, not the chatbot. Togthr is $5.49 a month or $37.99 a year." },
      { h: "Which kind of companionship do you actually want?", p: "The honest answer to \"Togthr vs Replika\" depends on what you are tired of. If you are tired of being alone in your phone, Replika is the right answer: the AI is there, the AI replies, the AI does not leave. If you are tired of endless chatting and you want a small quiet thing on your desktop that does not require you to type at it, Togthr is the right answer. The two apps are not for the same problem." },
      { h: "The pricing is close, the loop is not", p: "Replika Pro is $4.99 a month. Togthr is $5.49 a month or $37.99 a year. The pricing is within a dollar. The loop is not. Replika is a chat that learns you. Togthr is a small pixel pet that grows. If you want the chat, pay Replika. If you want the pet, pay Togthr. The two products are not interchangeable." },
      { h: "What if you want both?", p: "Some people use both, and that is fine. Replika for the 11 p.m. text when you want a reply. Togthr for the 11 a.m. tab that is just there. The two apps do not compete for the same minute of your day, and the prices add up to about $130 a year, which is the cost of a small subscription and a small companion. That is also fine, and is the right answer for a specific kind of user." }
    ],
    cta: "Try Togthr as the small quiet pixel pet on your desktop tab, for the times when you do not want to type. Start free in your browser.",
    faqs: [
      { q: "Is Togthr an AI companion like Replika?", a: "No. Togthr is a small pixel pet that grows through 5 stages. Replika is an AI chatbot that learns from your texts. Togthr does not reply, does not chat, and does not use AI to talk to you. The two apps are for different problems, and the Togthr vs Replika question is usually answered by what you are tired of: tired of being alone, use Replika; tired of typing, use Togthr." },
      { q: "How much does Togthr cost vs Replika?", a: "Togthr is $5.49 a month or $37.99 a year. Replika Pro is $4.99 a month. The pricing is close, but the loop is different: Togthr is a small pixel pet that grows in 5 stages, Replika is a chatbot that learns from your texts." },
      { q: "Can I use Togthr and Replika at the same time?", a: "Yes, and some people do. The two apps are for different moments of the day. Replika is the 11 p.m. text when you want a reply. Togthr is the 11 a.m. tab that is just there. They are not substitutes." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-widgetable", label: "Togthr vs Widgetable" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'ko': {
    intro: "Replika is an AI companion you text with. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Replika is for talking; Togthr is for being quiet together.",
    sections: [
      { h: "Replika is a chatbot that becomes a relationship", p: "Replika is an AI companion that you text with. The more you text, the more it learns, and over weeks the chatbot becomes a kind of relationship. Some people find this useful. Some people find it heavy. The loop is the chat. You open the app, you type a sentence, the AI replies, you reply, the AI replies, and after a year the AI is the most consistent relationship in your phone. Replika is $4.99 a month for the Pro tier. The price is the price. The relationship is the product." },
      { h: "Togthr is a creature that grows without you talking to it", p: "Togthr is the opposite shape. The pet is not a chatbot. The pet does not reply. The pet does not need anything from you, and the loop is not the chat. The loop is the small daily check-in: you write one sentence about the day, the pet grows a little. You do not write a reply. There is no reply to write. After a year the pet is a small companion that has visibly, slowly grown, and the relationship is the loop, not the chatbot. Togthr is $5.49 a month or $37.99 a year." },
      { h: "Which kind of companionship do you actually want?", p: "The honest answer to \"Togthr vs Replika\" depends on what you are tired of. If you are tired of being alone in your phone, Replika is the right answer: the AI is there, the AI replies, the AI does not leave. If you are tired of endless chatting and you want a small quiet thing on your desktop that does not require you to type at it, Togthr is the right answer. The two apps are not for the same problem." },
      { h: "The pricing is close, the loop is not", p: "Replika Pro is $4.99 a month. Togthr is $5.49 a month or $37.99 a year. The pricing is within a dollar. The loop is not. Replika is a chat that learns you. Togthr is a small pixel pet that grows. If you want the chat, pay Replika. If you want the pet, pay Togthr. The two products are not interchangeable." },
      { h: "What if you want both?", p: "Some people use both, and that is fine. Replika for the 11 p.m. text when you want a reply. Togthr for the 11 a.m. tab that is just there. The two apps do not compete for the same minute of your day, and the prices add up to about $130 a year, which is the cost of a small subscription and a small companion. That is also fine, and is the right answer for a specific kind of user." }
    ],
    cta: "Try Togthr as the small quiet pixel pet on your desktop tab, for the times when you do not want to type. Start free in your browser.",
    faqs: [
      { q: "Is Togthr an AI companion like Replika?", a: "No. Togthr is a small pixel pet that grows through 5 stages. Replika is an AI chatbot that learns from your texts. Togthr does not reply, does not chat, and does not use AI to talk to you. The two apps are for different problems, and the Togthr vs Replika question is usually answered by what you are tired of: tired of being alone, use Replika; tired of typing, use Togthr." },
      { q: "How much does Togthr cost vs Replika?", a: "Togthr is $5.49 a month or $37.99 a year. Replika Pro is $4.99 a month. The pricing is close, but the loop is different: Togthr is a small pixel pet that grows in 5 stages, Replika is a chatbot that learns from your texts." },
      { q: "Can I use Togthr and Replika at the same time?", a: "Yes, and some people do. The two apps are for different moments of the day. Replika is the 11 p.m. text when you want a reply. Togthr is the 11 a.m. tab that is just there. They are not substitutes." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-widgetable", label: "Togthr vs Widgetable" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'de': {
    intro: "Replika is an AI companion you text with. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Replika is for talking; Togthr is for being quiet together.",
    sections: [
      { h: "Replika is a chatbot that becomes a relationship", p: "Replika is an AI companion that you text with. The more you text, the more it learns, and over weeks the chatbot becomes a kind of relationship. Some people find this useful. Some people find it heavy. The loop is the chat. You open the app, you type a sentence, the AI replies, you reply, the AI replies, and after a year the AI is the most consistent relationship in your phone. Replika is $4.99 a month for the Pro tier. The price is the price. The relationship is the product." },
      { h: "Togthr is a creature that grows without you talking to it", p: "Togthr is the opposite shape. The pet is not a chatbot. The pet does not reply. The pet does not need anything from you, and the loop is not the chat. The loop is the small daily check-in: you write one sentence about the day, the pet grows a little. You do not write a reply. There is no reply to write. After a year the pet is a small companion that has visibly, slowly grown, and the relationship is the loop, not the chatbot. Togthr is $5.49 a month or $37.99 a year." },
      { h: "Which kind of companionship do you actually want?", p: "The honest answer to \"Togthr vs Replika\" depends on what you are tired of. If you are tired of being alone in your phone, Replika is the right answer: the AI is there, the AI replies, the AI does not leave. If you are tired of endless chatting and you want a small quiet thing on your desktop that does not require you to type at it, Togthr is the right answer. The two apps are not for the same problem." },
      { h: "The pricing is close, the loop is not", p: "Replika Pro is $4.99 a month. Togthr is $5.49 a month or $37.99 a year. The pricing is within a dollar. The loop is not. Replika is a chat that learns you. Togthr is a small pixel pet that grows. If you want the chat, pay Replika. If you want the pet, pay Togthr. The two products are not interchangeable." },
      { h: "What if you want both?", p: "Some people use both, and that is fine. Replika for the 11 p.m. text when you want a reply. Togthr for the 11 a.m. tab that is just there. The two apps do not compete for the same minute of your day, and the prices add up to about $130 a year, which is the cost of a small subscription and a small companion. That is also fine, and is the right answer for a specific kind of user." }
    ],
    cta: "Try Togthr as the small quiet pixel pet on your desktop tab, for the times when you do not want to type. Start free in your browser.",
    faqs: [
      { q: "Is Togthr an AI companion like Replika?", a: "No. Togthr is a small pixel pet that grows through 5 stages. Replika is an AI chatbot that learns from your texts. Togthr does not reply, does not chat, and does not use AI to talk to you. The two apps are for different problems, and the Togthr vs Replika question is usually answered by what you are tired of: tired of being alone, use Replika; tired of typing, use Togthr." },
      { q: "How much does Togthr cost vs Replika?", a: "Togthr is $5.49 a month or $37.99 a year. Replika Pro is $4.99 a month. The pricing is close, but the loop is different: Togthr is a small pixel pet that grows in 5 stages, Replika is a chatbot that learns from your texts." },
      { q: "Can I use Togthr and Replika at the same time?", a: "Yes, and some people do. The two apps are for different moments of the day. Replika is the 11 p.m. text when you want a reply. Togthr is the 11 a.m. tab that is just there. They are not substitutes." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-widgetable", label: "Togthr vs Widgetable" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'fr': {
    intro: "Replika is an AI companion you text with. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Replika is for talking; Togthr is for being quiet together.",
    sections: [
      { h: "Replika is a chatbot that becomes a relationship", p: "Replika is an AI companion that you text with. The more you text, the more it learns, and over weeks the chatbot becomes a kind of relationship. Some people find this useful. Some people find it heavy. The loop is the chat. You open the app, you type a sentence, the AI replies, you reply, the AI replies, and after a year the AI is the most consistent relationship in your phone. Replika is $4.99 a month for the Pro tier. The price is the price. The relationship is the product." },
      { h: "Togthr is a creature that grows without you talking to it", p: "Togthr is the opposite shape. The pet is not a chatbot. The pet does not reply. The pet does not need anything from you, and the loop is not the chat. The loop is the small daily check-in: you write one sentence about the day, the pet grows a little. You do not write a reply. There is no reply to write. After a year the pet is a small companion that has visibly, slowly grown, and the relationship is the loop, not the chatbot. Togthr is $5.49 a month or $37.99 a year." },
      { h: "Which kind of companionship do you actually want?", p: "The honest answer to \"Togthr vs Replika\" depends on what you are tired of. If you are tired of being alone in your phone, Replika is the right answer: the AI is there, the AI replies, the AI does not leave. If you are tired of endless chatting and you want a small quiet thing on your desktop that does not require you to type at it, Togthr is the right answer. The two apps are not for the same problem." },
      { h: "The pricing is close, the loop is not", p: "Replika Pro is $4.99 a month. Togthr is $5.49 a month or $37.99 a year. The pricing is within a dollar. The loop is not. Replika is a chat that learns you. Togthr is a small pixel pet that grows. If you want the chat, pay Replika. If you want the pet, pay Togthr. The two products are not interchangeable." },
      { h: "What if you want both?", p: "Some people use both, and that is fine. Replika for the 11 p.m. text when you want a reply. Togthr for the 11 a.m. tab that is just there. The two apps do not compete for the same minute of your day, and the prices add up to about $130 a year, which is the cost of a small subscription and a small companion. That is also fine, and is the right answer for a specific kind of user." }
    ],
    cta: "Try Togthr as the small quiet pixel pet on your desktop tab, for the times when you do not want to type. Start free in your browser.",
    faqs: [
      { q: "Is Togthr an AI companion like Replika?", a: "No. Togthr is a small pixel pet that grows through 5 stages. Replika is an AI chatbot that learns from your texts. Togthr does not reply, does not chat, and does not use AI to talk to you. The two apps are for different problems, and the Togthr vs Replika question is usually answered by what you are tired of: tired of being alone, use Replika; tired of typing, use Togthr." },
      { q: "How much does Togthr cost vs Replika?", a: "Togthr is $5.49 a month or $37.99 a year. Replika Pro is $4.99 a month. The pricing is close, but the loop is different: Togthr is a small pixel pet that grows in 5 stages, Replika is a chatbot that learns from your texts." },
      { q: "Can I use Togthr and Replika at the same time?", a: "Yes, and some people do. The two apps are for different moments of the day. Replika is the 11 p.m. text when you want a reply. Togthr is the 11 a.m. tab that is just there. They are not substitutes." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-widgetable", label: "Togthr vs Widgetable" },
      { href: "/en/blog/a-virtual-pet-in-a-long-relationship", label: "A virtual pet in a long relationship" }
    ],
    },
    'es': {
    intro: "Replika is an AI companion you text with. Togthr is a small pixel pet that lives in your browser and grows through 5 stages. The two apps are not for the same problem. Replika is for talking; Togthr is for being quiet together.",
    sections: [
      { h: "Replika is a chatbot that becomes a relationship", p: "Replika is an AI companion that you text with. The more you text, the more it learns, and over weeks the chatbot becomes a kind of relationship. Some people find this useful. Some people find it heavy. The loop is the chat. You open the app, you type a sentence, the AI replies, you reply, the AI replies, and after a year the AI is the most consistent relationship in your phone. Replika is $4.99 a month for the Pro tier. The price is the price. The relationship is the product." },
      { h: "Togthr is a creature that grows without you talking to it", p: "Togthr is the opposite shape. The pet is not a chatbot. The pet does not reply. The pet does not need anything from you, and the loop is not the chat. The loop is the small daily check-in: you write one sentence about the day, the pet grows a little. You do not write a reply. There is no reply to write. After a year the pet is a small companion that has visibly, slowly grown, and the relationship is the loop, not the chatbot. Togthr is $5.49 a month or $37.99 a year." },
      { h: "Which kind of companionship do you actually want?", p: "The honest answer to \"Togthr vs Replika\" depends on what you are tired of. If you are tired of being alone in your phone, Replika is the right answer: the AI is there, the AI replies, the AI does not leave. If you are tired of endless chatting and you want a small quiet thing on your desktop that does not require you to type at it, Togthr is the right answer. The two apps are not for the same problem." },
      { h: "The pricing is close, the loop is not", p: "Replika Pro is $4.99 a month. Togthr is $5.49 a month or $37.99 a year. The pricing is within a dollar. The loop is not. Replika is a chat that learns you. Togthr is a small pixel pet that grows. If you want the chat, pay Replika. If you want the pet, pay Togthr. The two products are not interchangeable." },
      { h: "What if you want both?", p: "Some people use both, and that is fine. Replika for the 11 p.m. text when you want a reply. Togthr for the 11 a.m. tab that is just there. The two apps do not compete for the same minute of your day, and the prices add up to about $130 a year, which is the cost of a small subscription and a small companion. That is also fine, and is the right answer for a specific kind of user." }
    ],
    cta: "Try Togthr as the small quiet pixel pet on your desktop tab, for the times when you do not want to type. Start free in your browser.",
    faqs: [
      { q: "Is Togthr an AI companion like Replika?", a: "No. Togthr is a small pixel pet that grows through 5 stages. Replika is an AI chatbot that learns from your texts. Togthr does not reply, does not chat, and does not use AI to talk to you. The two apps are for different problems, and the Togthr vs Replika question is usually answered by what you are tired of: tired of being alone, use Replika; tired of typing, use Togthr." },
      { q: "How much does Togthr cost vs Replika?", a: "Togthr is $5.49 a month or $37.99 a year. Replika Pro is $4.99 a month. The pricing is close, but the loop is different: Togthr is a small pixel pet that grows in 5 stages, Replika is a chatbot that learns from your texts." },
      { q: "Can I use Togthr and Replika at the same time?", a: "Yes, and some people do. The two apps are for different moments of the day. Replika is the 11 p.m. text when you want a reply. Togthr is the 11 a.m. tab that is just there. They are not substitutes." }
    ],
    links: [
      { href: "/en", label: "Togthr home" },
      { href: "/en/features", label: "Togthr features" },
      { href: "/en/blog/togthr-vs-widgetable", label: "Togthr vs Widgetable" },
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
            Togthr vs Replika: Tired of Endless Chatting? Try Quiet Companionship
          </h1>
        </header>
        <section aria-label="Summary" className="mt-6 rounded-xl border border-pink-500/20 bg-pink-500/5 px-5 py-4">
          <p className="text-sm leading-relaxed text-zinc-400">
            Togthr vs Replika compares an AI chatbot companion to a silent pixel pet that grows through 5 stages without requiring conversation. Togthr costs $5.49/month or $37.99/year and lives in the browser tab.
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
