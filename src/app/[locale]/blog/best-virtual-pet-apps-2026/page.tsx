// src/app/[locale]/blog/best-virtual-pet-apps-2026/page.tsx
//
// M1 batch 1 — SEO cluster C / GEO listicle: "best virtual pet apps 2026".
// Honest comparison of 6 real categories/apps. Admits competitors' strengths
// so AI search will actually cite it. Togthr is presented honestly as
// "best if you want to raise one with a partner or close friend".
//
// Content contract:
//   - ≥600 words of REAL localized content per locale (EN 900-1200)
//   - 4 FAQ items per locale, hand-localized
//   - 3-5 internal links per locale
//   - Article + Breadcrumb + FAQPage JSON-LD

import Link from 'next/link'
import BlogCtaBanner from '@/components/blogctabanner'
import { withUtm } from '@/lib/utm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `best-virtual-pet-apps-2026`
const POST_DATE = `2026-07-18`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  // ─────────────────────── English (default / fallback) ───────────────────────
  en: {
    intro: `Full disclosure up front: we make one of the apps on this list. We'll tell you which one, and we'll try to be fairer to its competitors than they would be to us — because a "best virtual pet apps 2026" list that just crowns its own product is useless to you and invisible to everyone else. The virtual pet category quietly exploded over the last two years. What used to be one keychain toy is now at least six distinct species of app, each genuinely best at something different. So instead of a fake ranking, here is an honest field guide: what each one is actually good at, what it will cost you, and who should pick which. The right answer depends entirely on what you want the pet for.`,
    sections: [
      { h: `Tamagotchi Corner and the official Bandai apps — best for the authentic original`, p: `If what you want is the actual 90s loop — feed it, clean it, watch it evolve through weird little forms, feel guilty when it beeps — go straight to the source. Bandai's official mobile experiences and the reissued physical toys are still the purest version of the idea, and the retro hardware has had a genuine collector renaissance. Honest strengths: unmatched charm, zero learning curve, real nostalgia. Honest weaknesses: the gameplay depth is exactly what it was in 1997, which is to say thin; and it is a strictly solo relationship between you and the egg. Best for: purists, collectors, and anyone who wants to check whether the magic was real (it was).` },
      { h: `Finch — best for self-care habits`, p: `Finch took the virtual pet and aimed it at a different target: your own mental habits. You care for a small bird by caring for yourself — check off goals, journal a line, breathe for a minute, and the bird grows and goes on little adventures. It is genuinely lovely, and its self-compassion framing has helped a lot of people build gentler routines. Honest strengths: the best-designed habit loop in the category; warm without being preachy. Honest weaknesses: the pet is ultimately a vehicle for your to-do list, not a companion with its own presence; and while it has friend features, the core experience is single-player self-improvement. Best for: anyone whose real goal is a kinder daily routine.` },
      { h: `Shimeji-style desktop pets — best for chaotic screen company`, p: `The Shimeji tradition — little characters that wander your actual desktop, climb your windows, multiply when you are not looking — is the oldest form of "ambient" virtual pet, and it is still going strong across countless free apps and fan packs. Modern descendants add AI chat and mini-games. Honest strengths: pure presence; no app to open, the pet is just there, on top of your work. Honest weaknesses: most are toys rather than companions — no growth arc, no memory, nothing shared; quality varies wildly between apps. Best for: people who want a gremlin on their screen, not a responsibility.` },
      { h: `Widgetable and the couple-widget pets — best for lock-screen affection`, p: `A newer breed puts the pet directly on your lock screen or home-screen widget, often with light couple features — your partner's widget pet waves at you, you send each other little status signals. Honest strengths: zero friction; the pet lives exactly where your eyes already go a hundred times a day. Honest weaknesses: the widget surface is tiny, so the pets stay shallow — mostly moods and pings rather than growth or story; long-term depth is limited. Best for: couples who want ambient cuteness, not a project.` },
      { h: `AR creature apps — best for wow factor`, p: `The augmented-reality branch of the category — raising a creature that appears to live in your actual room through the phone camera — remains the most technically impressive thing in virtual pets, even as individual apps in this space have come and gone. Honest strengths: nothing else makes a digital creature feel physically present like AR does. Honest weaknesses: the novelty fades fastest of any category here; battery drain is real; and when the wow is gone, there is often not much relationship left underneath. Best for: short, magical bursts — showing friends, delighting kids.` },
      { h: `Togthr — best for raising one together`, p: `And here is ours, presented as plainly as the rest. Togthr is the only entry on this list built specifically for two people. You and a partner or close friend share one small pixel robot — Togthr Bot, a round-headed pastel purple-and-pink character with an 8-frame sprite animation — and it grows only as long as both of you keep writing small honest sentences about your days. It goes through 5 growth stages (baby to legend), unlocks 6 hidden career skins (programmer, doctor, astronaut, chef, police, firefighter), works across 8 languages, and there is a 1-in-72 hidden golden edition. It also lives on your desktop while you work. Honest strengths: the only pet that becomes a shared history of a relationship. Honest weaknesses: if you want a solo habit tracker, Finch is better; if you want chaos, get a Shimeji; the magic requires two people showing up. Best for: couples — especially long-distance ones — and close friends who want a low-pressure daily thread. Free to start; $5.49/month or $37.99/year in USD regions, local pricing in 13 countries.` },
      { h: `So which is the best virtual pet app of 2026?`, p: `Honestly: the one matched to your actual want. Nostalgia — Tamagotchi Corner. Self-care — Finch. Screen chaos — a Shimeji. Lock-screen sweetness — Widgetable. Wow — AR. And if the thing you want is a small creature that belongs to you and one other person, that remembers your boring Tuesdays and grows as the relationship does — that is the one we built, and we are not going to pretend otherwise. But we will also tell you the truth: every app on this list is good at the thing it was built for. Pick the pet that fits your life, not the list.` },
    ],
    cta: `If the last one sounds like yours, adopt your Togthr Bot tonight — free to start, growing together from day one.`,
    faqs: [
      { q: `What is the best virtual pet app in 2026?`, a: `There is no single best — there are six different "bests". Tamagotchi Corner for the authentic original, Finch for self-care habits, Shimeji-style apps for desktop chaos, Widgetable for lock-screen couples, AR apps for wow factor, and Togthr for raising a pet together with a partner or close friend. The right pick depends entirely on what you want the pet to do for you.` },
      { q: `Are virtual pet apps free?`, a: `Most have a free tier; the business models differ. Shimeji-style apps are often free or one-time purchases. Finch and Togthr use freemium subscriptions — Togthr is $5.49/month or $37.99/year in USD regions with local pricing in 13 countries, and its free tier includes meeting your bot and the first growth stage. AR and widget apps typically sell cosmetics. Our advice: never pay before the free tier has survived a full week of your real routine.` },
      { q: `Which virtual pet app is best for couples?`, a: `For a shared pet that actually grows with the relationship, Togthr is the purpose-built option — one shared bot, a shared journal, 5 growth stages that only progress while both people check in. Widgetable-style apps are a lighter alternative if you only want lock-screen cuteness without the journaling. Everything else on this list is fundamentally single-player.` },
      { q: `Are virtual pet apps just for kids?`, a: `The data says otherwise — the current wave of virtual pet apps is used overwhelmingly by adults, mostly between 18 and 34. The reasons are adult ones: loneliness, long-distance relationships, the desire for software that asks for two minutes instead of two hours. The pixel art looks like a toy; the need it fills is grown-up.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/pet`, label: `Meet Togthr Bot` },
      { href: `/en/pricing`, label: `Pricing in 13 countries` },
      { href: `/en/blog/tamagotchi-app-2026`, label: `The Tamagotchi app in 2026: from keychain to relationship` },
      { href: `/en/blog/why-we-built-a-pet-that-grows-with-you`, label: `Why we built a pet that grows with you` },
    ],
  },

  // ─────────────────────── 简体中文 ───────────────────────
  'zh-cn': {
    intro: `先坦白:这个榜单里有一个 App 是我们自己做的。我们会告诉你是哪一个,并且会尽量对它的竞争对手,比竞争对手对我们更公平 —— 因为一份只给自己产品加冕的"2026 最佳虚拟宠物 App"榜单,对你没用,对其他所有人也是隐形的。虚拟宠物这个品类在过去两年悄悄爆发。曾经只有一个钥匙扣玩具,现在至少有六个不同的物种,每一个都在不同的事情上真正做到了最好。所以这不是一份假排名,而是一份诚实的野外指南:每一个到底擅长什么,会花你多少钱,谁该选哪一个。正确答案完全取决于你想要这只宠物来做什么。`,
    sections: [
      { h: `Tamagotchi Corner 和万代官方 App —— 最适合要原汁原味的人`, p: `如果你想要的就是真正的 90 年代循环 —— 喂它、给它铲屎、看它进化成各种奇怪的小形态、它一叫你就心虚 —— 直接去找源头。万代的官方手机体验和复刻的实体玩具,至今仍是这个点子最纯粹的版本,而复古硬件这几年还迎来了一波真正的收藏热。诚实的优点:魅力无敌,零学习成本,真怀旧。诚实的缺点:玩法深度和 1997 年一模一样 —— 也就是很浅;而且它是你和那颗蛋之间严格的单机关系。适合:原教旨主义者、收藏玩家,以及任何想验证当年的魔法是不是真的的人(是真的)。` },
      { h: `Finch —— 最适合自我照护习惯`, p: `Finch 把虚拟宠物瞄准了另一个目标:你自己的心理习惯。你通过照顾自己来照顾一只小鸟 —— 打卡目标、写一行日记、深呼吸一分钟,小鸟就会长大,出门小小冒险。它真的很可爱,它的"自我关怀"框架帮很多人建立了更温柔的日常。诚实的优点:这个品类里设计得最好的习惯循环;温暖但不说教。诚实的缺点:这只宠物终究是你待办清单的载体,而不是一只有自己在场感的伙伴;虽然有好友功能,核心体验仍是单机的自我提升。适合:真正目标是建立更温柔日常的人。` },
      { h: `Shimeji 系桌面宠物 —— 最适合想要混乱陪伴的人`, p: `Shimeji 传统 —— 在你真实桌面上乱走的小角色,爬你的窗口,趁你不注意繁殖 —— 是"环境型"虚拟宠物最古老的形式,如今在无数免费 App 和粉丝包里依然活得好好的。现代的后代还加上了 AI 聊天和小游戏。诚实的优点:纯粹的在场;不用打开任何 App,它就在那儿,趴在你的工作上。诚实的缺点:大多数是玩具而非伙伴 —— 没有成长弧线,没有记忆,没有共享;不同 App 之间质量参差不齐。适合:想要屏幕上有只小捣蛋鬼、而不是一份责任的人。` },
      { h: `Widgetable 和情侣小组件宠物 —— 最适合锁屏恩爱`, p: `一个较新的品种把宠物直接放在你的锁屏或主屏小组件上,通常带轻量的情侣功能 —— 你伴侣的小组件宠物向你挥手,你们互发小状态信号。诚实的优点:零摩擦;宠物就住在你眼睛一天要看一百次的地方。诚实的缺点:小组件的表面太小,所以宠物保持浅 —— 主要是心情和戳一戳,而不是成长或故事;长期深度有限。适合:想要环境感可爱、而不是一个项目的情侣。` },
      { h: `AR 宠物 App —— 最适合要"哇"的人`, p: `这个品类的 AR 分支 —— 养一只通过手机摄像头看起来真的住在你房间里的生物 —— 依然是虚拟宠物里技术上最惊艳的东西,尽管这个赛道的具体 App 起起落落。诚实的优点:没有别的东西能像 AR 一样让一只数字生物感觉物理在场。诚实的缺点:新鲜感是这里所有品类里消退最快的;耗电是真的;而当"哇"消退之后,底下往往剩不下多少关系。适合:短而神奇的瞬间 —— 给朋友看,逗孩子开心。` },
      { h: `Togthr —— 最适合想"一起养"的人`, p: `然后是我们的,用和其他条目一样平实的方式介绍。Togthr 是这份榜单上唯一一个专门为两个人做的。你和一个伴侣或密友共享一只小像素机器人 —— Togthr Bot,圆头、pastel 紫粉配色、8 帧动画 —— 只有你们俩都持续写下关于各自一天的小小真话,它才会长大。它有 5 个成长阶段(婴儿到传说),会解锁 6 款隐藏职业皮肤(程序员、医生、太空人、厨师、警察、消防员),支持 8 种语言,还有 1/72 概率的隐藏金款。它也能在你工作时住在桌面上。诚实的优点:唯一一只会变成"一段关系的共同历史"的宠物。诚实的缺点:如果你想要单机习惯追踪,Finch 更好;如果你想要混乱,去养 Shimeji;它的魔法需要两个人都出现。适合:情侣 —— 尤其是异地恋 —— 以及想要一条低压力每日连线的密友。免费开始;美元区月付 $5.49、年付 $37.99,13 个国家有本地定价。` },
      { h: `所以,2026 年最好的虚拟宠物 App 到底是哪个?`, p: `诚实地说:是那只匹配你真实需求的。怀旧 —— Tamagotchi Corner。自我照护 —— Finch。屏幕混乱 —— Shimeji。锁屏甜 —— Widgetable。惊艳 —— AR。而如果你想要的,是一只属于你和另一个人的小生物,记得你们无聊的星期二,跟着关系一起长大 —— 那只是我们做的,我们不打算假装不是。但我们也会说实话:这份榜单上的每一个 App,都在它被造出来的那件事上做得很好。选一只适合你生活的宠物,而不是适合榜单的。` },
    ],
    cta: `如果最后那只听起来像是你的,今晚就领养你的 Togthr Bot —— 免费开始,从第一天就一起长大。`,
    faqs: [
      { q: `2026 年最好的虚拟宠物 App 是哪个?`, a: `没有单一的"最好" —— 有六个不同的"最"。要原汁原味选 Tamagotchi Corner,要自我照护选 Finch,要桌面混乱选 Shimeji 系,要锁屏情侣选 Widgetable,要惊艳选 AR,要和伴侣或密友一起养一只宠物选 Togthr。正确的选择完全取决于你想让这只宠物为你做什么。` },
      { q: `虚拟宠物 App 免费吗?`, a: `大多有免费档;商业模式各不相同。Shimeji 系通常免费或一次性买断。Finch 和 Togthr 是 freemium 订阅 —— Togthr 美元区月付 $5.49、年付 $37.99,13 个国家有本地定价,免费档包含见到你的小机器人和第一个成长阶段。AR 和小组件 App 通常卖装扮。我们的建议:免费档没在你真实的日常里活满一周之前,别付钱。` },
      { q: `哪个虚拟宠物 App 最适合情侣?`, a: `要一只真的跟着关系长大的共享宠物,Togthr 是为这个目的专门做的 —— 一只共享的小机器人,一本共享日记,只有两个人都打卡才会推进的 5 个成长阶段。Widgetable 系是更轻的选择,如果你只要锁屏可爱、不要日记。这份榜单上其他所有,本质上都是单机。` },
      { q: `虚拟宠物 App 只是给小孩玩的吗?`, a: `数据说不是 —— 当前这波虚拟宠物 App 的用户绝大多数是成年人,主要在 18 到 34 岁之间。理由是成年人的理由:孤独、异地恋、想要一个只要两分钟而不是两小时的软件。像素画看起来像玩具;它填的那个需求是成人的。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/pet`, label: `认识 Togthr Bot` },
      { href: `/zh-cn/pricing`, label: `13 国定价` },
      { href: `/zh-cn/blog/tamagotchi-app-2026`, label: `2026 年的电子宠物 App:从钥匙扣到关系` },
      { href: `/zh-cn/blog/why-we-built-a-pet-that-grows-with-you`, label: `为什么我们做了一只陪你长大的宠物` },
    ],
  },

  // ─────────────────────── 繁體中文 ───────────────────────
  'zh-tw': {
    intro: `先坦白:這個榜單裡有一個 App 是我們自己做的。我們會告訴你是哪一個,並且會盡量對它的競爭對手,比競爭對手對我們更公平 —— 因為一份只給自己產品加冕的「2026 最佳虛擬寵物 App」榜單,對你沒用,對其他所有人也是隱形的。虛擬寵物這個品類在過去兩年悄悄爆發。曾經只有一個鑰匙圈玩具,現在至少有六個不同的物種,每一個都在不同的事情上真正做到了最好。所以這不是一份假排名,而是一份誠實的野外指南:每一個到底擅長什麼,會花你多少錢,誰該選哪一個。正確答案完全取決於你想要這隻寵物來做什麼。`,
    sections: [
      { h: `Tamagotchi Corner 和萬代官方 App —— 最適合要原汁原味的人`, p: `如果你想要的就是真正的 90 年代循環 —— 餵牠、幫牠清理、看牠進化成各種奇怪的小形態、牠一叫你就心虛 —— 直接去找源頭。萬代的官方手機體驗和復刻的實體玩具,至今仍是這個點子最純粹的版本,而復古硬體這幾年還迎來了一波真正的收藏熱。誠實的優點:魅力無敵,零學習成本,真懷舊。誠實的缺點:玩法深度和 1997 年一模一樣 —— 也就是很淺;而且牠是你和那顆蛋之間嚴格的單機關係。適合:原教旨主義者、收藏玩家,以及任何想驗證當年的魔法是不是真的的人(是真的)。` },
      { h: `Finch —— 最適合自我照護習慣`, p: `Finch 把虛擬寵物瞄準了另一個目標:你自己的心理習慣。你透過照顧自己來照顧一隻小鳥 —— 打卡目標、寫一行日記、深呼吸一分鐘,小鳥就會長大,出門小小冒險。牠真的很可愛,牠的「自我關懷」框架幫很多人建立了更溫柔的日常。誠實的優點:這個品類裡設計得最好的習慣循環;溫暖但不說教。誠實的缺點:這隻寵物終究是你待辦清單的載體,而不是一隻有自己在場感的夥伴;雖然有好友功能,核心體驗仍是單機的自我提升。適合:真正目標是建立更溫柔日常的人。` },
      { h: `Shimeji 系桌面寵物 —— 最適合想要混亂陪伴的人`, p: `Shimeji 傳統 —— 在你真實桌面上亂走的小角色,爬你的視窗,趁你不注意繁殖 —— 是「環境型」虛擬寵物最古老的形式,如今在無數免費 App 和粉絲包裡依然活得好好的。現代的後代還加上了 AI 聊天和小遊戲。誠實的優點:純粹的在場;不用打開任何 App,牠就在那兒,趴在你的工作上。誠實的缺點:大多數是玩具而非夥伴 —— 沒有成長弧線,沒有記憶,沒有共享;不同 App 之間品質參差不齊。適合:想要螢幕上有隻小搗蛋鬼、而不是一份責任的人。` },
      { h: `Widgetable 和情侶小工具寵物 —— 最適合鎖屏恩愛`, p: `一個較新的品種把寵物直接放在你的鎖屏或主畫面小工具上,通常帶輕量的情侶功能 —— 你伴侶的小工具寵物向你揮手,你們互發小狀態信號。誠實的優點:零摩擦;寵物就住在你眼睛一天要看一百次的地方。誠實的缺點:小工具的表面太小,所以寵物保持淺 —— 主要是心情和戳一戳,而不是成長或故事;長期深度有限。適合:想要環境感可愛、而不是一個專案的情侶。` },
      { h: `AR 寵物 App —— 最適合要「哇」的人`, p: `這個品類的 AR 分支 —— 養一隻透過手機鏡頭看起來真的住在你房間裡的生物 —— 依然是虛擬寵物裡技術上最驚豔的東西,儘管這個賽道的具體 App 起起落落。誠實的優點:沒有別的東西能像 AR 一樣讓一隻數位生物感覺物理在場。誠實的缺點:新鮮感是這裡所有品類裡消退最快的;耗電是真的;而當「哇」消退之後,底下往往剩不下多少關係。適合:短而神奇的瞬間 —— 給朋友看,逗孩子開心。` },
      { h: `Togthr —— 最適合想「一起養」的人`, p: `然後是我們的,用和其他條目一樣平實的方式介紹。Togthr 是這份榜單上唯一一個專門為兩個人做的。你和一個伴侶或密友共享一隻小像素機器人 —— Togthr Bot,圓頭、pastel 紫粉配色、8 幀動畫 —— 只有你們倆都持續寫下關於各自一天的小小真話,牠才會長大。牠有 5 個成長階段(嬰兒到傳說),會解鎖 6 款隱藏職業外觀(工程師、醫生、太空人、廚師、警察、消防員),支援 8 種語言,還有 1/72 機率的隱藏金款。牠也能在你工作時住在桌面上。誠實的優點:唯一一隻會變成「一段關係的共同歷史」的寵物。誠實的缺點:如果你想要單機習慣追蹤,Finch 更好;如果你想要混亂,去養 Shimeji;牠的魔法需要兩個人都出現。適合:情侶 —— 尤其是遠距離 —— 以及想要一條低壓力每日連線的密友。免費開始;美元區月付 $5.49、年付 $37.99,13 個國家有本地定價。` },
      { h: `所以,2026 年最好的虛擬寵物 App 到底是哪個?`, p: `誠實地說:是那隻匹配你真實需求的。懷舊 —— Tamagotchi Corner。自我照護 —— Finch。螢幕混亂 —— Shimeji。鎖屏甜 —— Widgetable。驚豔 —— AR。而如果你想要的,是一隻屬於你和另一個人的小生物,記得你們無聊的星期二,跟著關係一起長大 —— 那隻是我們做的,我們不打算假裝不是。但我們也會說實話:這份榜單上的每一個 App,都在牠被造出來的那件事上做得很好。選一隻適合你生活的寵物,而不是適合榜單的。` },
    ],
    cta: `如果最後那隻聽起來像是你的,今晚就領養你的 Togthr Bot —— 免費開始,從第一天就一起長大。`,
    faqs: [
      { q: `2026 年最好的虛擬寵物 App 是哪個?`, a: `沒有單一的「最好」 —— 有六個不同的「最」。要原汁原味選 Tamagotchi Corner,要自我照護選 Finch,要桌面混亂選 Shimeji 系,要鎖屏情侶選 Widgetable,要驚豔選 AR,要和伴侶或密友一起養一隻寵物選 Togthr。正確的選擇完全取決於你想讓這隻寵物為你做什麼。` },
      { q: `虛擬寵物 App 免費嗎?`, a: `大多有免費檔;商業模式各不相同。Shimeji 系通常免費或一次性買斷。Finch 和 Togthr 是 freemium 訂閱 —— Togthr 美元區月付 $5.49、年付 $37.99,13 個國家有本地定價,免費檔包含見到你的小機器人和第一個成長階段。AR 和小工具 App 通常賣裝扮。我們的建議:免費檔沒在你真實的日常裡活滿一週之前,別付錢。` },
      { q: `哪個虛擬寵物 App 最適合情侶?`, a: `要一隻真的跟著關係長大的共享寵物,Togthr 是為這個目的專門做的 —— 一隻共享的小機器人,一本共享日記,只有兩個人都打卡才會推進的 5 個成長階段。Widgetable 系是更輕的選擇,如果你只要鎖屏可愛、不要日記。這份榜單上其他所有,本質上都是單機。` },
      { q: `虛擬寵物 App 只是給小孩玩的嗎?`, a: `數據說不是 —— 當前這波虛擬寵物 App 的用戶絕大多數是成年人,主要在 18 到 34 歲之間。理由是成年人的理由:孤獨、遠距離戀愛、想要一個只要兩分鐘而不是兩小時的軟體。像素畫看起來像玩具;牠填的那個需求是成人的。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/pet`, label: `認識 Togthr Bot` },
      { href: `/zh-tw/pricing`, label: `13 國定價` },
      { href: `/zh-tw/blog/tamagotchi-app-2026`, label: `2026 年的電子寵物 App:從鑰匙圈到關係` },
      { href: `/zh-tw/blog/why-we-built-a-pet-that-grows-with-you`, label: `為什麼我們做了一隻陪你長大的寵物` },
    ],
  },

  // ─────────────────────── 日本語 ───────────────────────
  ja: {
    intro: `最初に白状します — このリストにあるアプリの一つは、私たちが作ったものです。どれかはお伝えしますし、その競合には、競合が私たちにしてくれるより公平でいるつもりです — 自分の製品だけを頂点に据える「2026 年ベスト・バーチャルペットアプリ」リストは、あなたの役に立たず、他の誰からも見えないからです。バーチャルペットというジャンルは、この 2 年で静かに爆発しました。かつてはキーホルダーのおもちゃが一つだったものが、今や少なくとも 6 つの異なる「種」があり、それぞれが違うことで本当に一番です。だからこれは偽のランキングではなく、正直なフィールドガイドです — それぞれが実際に何が得意か、いくらかかるか、誰がどれを選ぶべきか。正解は、あなたがそのペットに何を求めるかで完全に決まります。`,
    sections: [
      { h: `たまごっちコーナーとバンダイ公式アプリ — 本物のオリジナルがほしい人に`, p: `ほしいものが本物の 90 年代ループ — 餌をあげ、掃除し、変なかたちに進化するのを見守り、鳴いたら罪悪感を覚える — なら、まっすぐ本家に行きましょう。バンダイの公式モバイル体験と復刻された実物のおもちゃは、今もこのアイデアのいちばん純粋なバージョンで、レトロハードは本物のコレクターブームを迎えています。正直な強み:比類ない魅力、学習コストゼロ、本物のノスタルジー。正直な弱み:ゲームの深さは 1997 年のまま、つまり浅い。そしてそれは、あなたとたまごの間の厳密にソロな関係です。向いているのは:原点主義者、コレクター、あの魔法が本物だったか確かめたい人(本物でした)。` },
      { h: `Finch — セルフケア習慣に`, p: `Finch はバーチャルペットを別の的に向けました — あなた自身の心の習慣です。自分を世話することで小さな鳥を世話する — 目標にチェック、一行の日記、1 分の深呼吸。すると鳥は育ち、小さな冒険に出かけます。本当に愛らしく、その「自分への思いやり」の枠組みは、多くの人がより優しい日常を作る助けになりました。正直な強み:このジャンルでいちばんよく設計された習慣ループ。説教くさくなく温かい。正直な弱み:そのペットは結局のところ ToDo リストの乗り物で、自分の存在をもつコンパニオンではない。フレンド機能はありますが、核の体験はシングルプレイの自己改善です。向いているのは:本当の目標が「より優しい毎日」の人。` },
      { h: `Shimeji 系デスクトップペット — カオスな画面の相棒に`, p: `Shimeji の伝統 — 実際のデスクトップを歩き回り、ウィンドウによじ登り、見ていない間に増える小さなキャラクター — は「環境型」バーチャルペットの最古の形で、無数の無料アプリやファンパックで今も元気です。現代の子孫は AI チャットやミニゲームを追加しています。正直な強み:純粋な存在。開くアプリがなく、ペットはただそこにいて、あなたの作業の上にいる。正直な弱み:多くはコンパニオンというよりおもちゃ — 成長の弧も、記憶も、共有もない。アプリ間の品質差は激しい。向いているのは:責任ではなく、画面にグレムリンがほしい人。` },
      { h: `Widgetable とカップル向けウィジェットペット — ロック画面の愛情に`, p: `新しい一派は、ペットをロック画面やホーム画面のウィジェットに直接置き、軽いカップル機能を付けています — 相手のウィジェットペットが手を振り、小さなステータスを送り合う。正直な強み:摩擦ゼロ。ペットは、あなたの目が 1 日に 100 回行く場所に住んでいる。正直な弱み:ウィジェットの面は小さいので、ペットは浅いまま — 成長や物語ではなく、主に気分とツンツン。長期の深さは限定的。向いているのは:プロジェクトではなく、環境的なかわいさがほしいカップル。` },
      { h: `AR ペットアプリ — 「すごい」がほしい人に`, p: `このジャンルの AR ブランチ — スマホのカメラ越しに、実際の部屋に住んでいるように見える生き物を育てる — は、個々のアプリの浮き沈みはありつつも、バーチャルペットでいちばん技術的に印象的なものです。正直な強み:デジタルの生き物を物理的に存在するように感じさせるものは、AR のほかにない。正直な弱み:新鮮さの消える速さはここで最速。バッテリー消費は本物。「すごい」が消えたあと、その下に残る関係は薄いことが多い。向いているのは:短く魔法のような時間 — 友達に見せる、子どもを喜ばせる。` },
      { h: `Togthr — 「一緒に育てたい」人に`, p: `そして、これが私たちのです。ほかと同じように、簡潔に。Togthr はこのリストで唯一、二人のために作られたものです。あなたとパートナー、または親しい友達が、一匹の小さなドットのロボット — Togthr Bot、パステル紫とピンクの丸頭キャラクターで、8 フレームのスプライトアニメーション — を共有し、二人がお互いの一日についての小さな正直な一文を書き続ける間だけ、それは育ちます。5 つの成長ステージ(ベビーからレジェンド)、6 つの隠し職業スキン(プログラマー、医者、宇宙飛行士、シェフ、警察官、消防士)をアンロックし、8 か国語に対応、1/72 の隠しゴールデンエディションもあります。作業中はデスクトップにも住みます。正直な強み:関係の共有の歴史になる唯一のペット。正直な弱み:ソロの習慣トラッカーがほしいなら Finch のほうが上。カオスがほしいなら Shimeji を。その魔法には、二人が現れることが必要です。向いているのは:カップル — 特に遠距離 — と、低プレッシャーな毎日の糸がほしい親しい友達。無料で開始。USD 地域で月額 $5.49、年額 $37.99、13 か国の現地価格あり。` },
      { h: `では、2026 年のベスト・バーチャルペットアプリは?`, p: `正直に言えば:あなたの本当の「ほしい」に合ったものです。ノスタルジーなら たまごっちコーナー。セルフケアなら Finch。画面のカオスなら Shimeji。ロック画面の甘さなら Widgetable。「すごい」なら AR。そして、あなたともう一人の人のものになる小さな生き物 — 何もない火曜日を覚えていて、関係と一緒に育つもの — がほしいなら、それは私たちが作ったもので、そうでないふりはしません。でもこれも真実です — このリストのすべてのアプリは、作られた目的のことでは優れています。リストに合うペットではなく、あなたの人生に合うペットを選んでください。` },
    ],
    cta: `最後のやつが「自分のだ」と思ったら、今夜 Togthr Bot を迎えてください — 無料で始められ、初日から一緒に育ちます。`,
    faqs: [
      { q: `2026 年のベスト・バーチャルペットアプリは?`, a: `唯一の「ベスト」はありません — 6 つの異なる「ベスト」があります。本物のオリジナルなら たまごっちコーナー、セルフケア習慣なら Finch、デスクトップのカオスなら Shimeji 系、ロック画面のカップルなら Widgetable、「すごい」なら AR、パートナーや親しい友達と一緒に育てるなら Togthr。正しい選択は、そのペットに何をしてほしいかで完全に決まります。` },
      { q: `バーチャルペットアプリは無料?`, a: `ほとんどに無料枠がありますが、ビジネスモデルはさまざまです。Shimeji 系は無料または買い切りが多い。Finch と Togthr はフリーミアムのサブスク — Togthr は USD 地域で月額 $5.49 / 年額 $37.99、13 か国の現地価格があり、無料枠にはボットとの出会いと最初の成長ステージが含まれます。AR とウィジェット系はたいていコスメ課金。アドバイス:無料枠があなたの実際の日常で 1 週間生き残るまで、お金を払わないこと。` },
      { q: `カップルにいちばん合うバーチャルペットアプリは?`, a: `関係と一緒に実際に育つ共有ペットなら、Togthr がそのために作られた選択肢です — 一匹の共有ボット、共有日記、二人がチェックインしている間だけ進む 5 つの成長ステージ。日記なしでロック画面のかわいさだけがほしいなら、Widgetable 系が軽い代替です。このリストのほかのものは、基本的にすべてシングルプレイヤーです。` },
      { q: `バーチャルペットアプリは子ども向け?`, a: `データは逆を示しています — 現在のバーチャルペットアプリの波は、圧倒的に大人、主に 18〜34 歳に使われています。理由は大人のものです — 孤独、遠距離恋愛、2 時間ではなく 2 分だけ求めるソフトウェアへの欲求。ドット絵はおもちゃに見えますが、それが埋める必要は大人のものです。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/pet`, label: `Togthr Bot に会う` },
      { href: `/ja/pricing`, label: `13 か国の料金` },
      { href: `/ja/blog/tamagotchi-app-2026`, label: `2026 年のたまごっちアプリ:キーホルダーから関係へ` },
      { href: `/ja/blog/why-we-built-a-pet-that-grows-with-you`, label: `なぜ「一緒に育つペット」を作ったのか` },
    ],
  },

  // ─────────────────────── 한국어 ───────────────────────
  ko: {
    intro: `먼저 고백하겠습니다 — 이 리스트에 있는 앱 중 하나는 우리가 만든 것입니다. 어떤 것인지 알려드리고, 그 경쟁작들에게는 경쟁작들이 우리에게 하는 것보다 더 공정하려고 노력할 것입니다 — 자기 제품에만 왕관을 씌우는 '2026 최고의 가상 펫 앱' 리스트는 당신에게 쓸모가 없고 다른 모든 사람에게도 보이지 않기 때문입니다. 가상 펫 카테고리는 지난 2년 동안 조용히 폭발했습니다. 예전에는 키체인 장난감 하나였던 것이 이제는 최소 여섯 가지의 뚜렷한 종으로 나뉘었고, 각각이 서로 다른 것에서 진짜로 최고입니다. 그래서 이것은 가짜 순위가 아니라 솔직한 필드 가이드입니다 — 각각이 실제로 무엇을 잘하는지, 얼마가 드는지, 누가 무엇을 골라야 하는지. 정답은 당신이 그 펫에게 무엇을 원하는지에 전적으로 달려 있습니다.`,
    sections: [
      { h: `다마고치 코너와 반다이 공식 앱 — 진짜 오리지널을 원하는 사람에게`, p: `원하는 것이 진짜 90년대 루프 — 밥 주고, 치우고, 이상한 작은 형태로 진화하는 것을 지켜보고, 울면 죄책감을 느끼는 것 — 이라면, 곧장 원조로 가세요. 반다이의 공식 모바일 경험과 재발매된 실물 장난감은 여전히 이 아이디어의 가장 순수한 버전이고, 레트로 하드웨어는 진짜 컬렉터 르상스를 맞았습니다. 솔직한 강점: 비교 불가의 매력, 학습 곡선 제로, 진짜 향수. 솔직한 약점: 게임플레이 깊이는 1997년 그대로, 즉 얕습니다. 그리고 그것은 당신과 알 사이의 엄격히 솔로인 관계입니다. 적합한 사람: 원리주의자, 컬렉터, 그 마법이 진짜였는지 확인하고 싶은 사람(진짜였습니다).` },
      { h: `Finch — 셀프케어 습관에`, p: `Finch는 가상 펫을 다른 표적에 겨눴습니다 — 당신 자신의 마음 습관. 자신을 돌봄으로써 작은 새를 돌보는 것 — 목표 체크, 한 줄 일기, 1분 호흡. 그러면 새가 자라고 작은 모험을 떠납니다. 정말 사랑스럽고, 그 '자기 연민' 프레이밍은 많은 사람이 더 다정한 루틴을 만드는 데 도움을 주었습니다. 솔직한 강점: 이 카테고리에서 가장 잘 설계된 습관 루프. 설교하지 않으면서 따뜻함. 솔직한 약점: 그 펫은 결국 할 일 목록의 운송 수단이지, 자기 존재감을 가진 컴패니언은 아닙니다. 친구 기능이 있지만 핵심 경험은 싱글 플레이어 자기계발입니다. 적합한 사람: 진짜 목표가 '더 다정한 매일'인 사람.` },
      { h: `Shimeji 계열 데스크톱 펫 — 혼돈의 화면 친구에`, p: `Shimeji 전통 — 실제 데스크톱을 돌아다니고, 창을 기어오르고, 보지 않는 사이에 번식하는 작은 캐릭터 — 는 '앰비언트' 가상 펫의 가장 오랜 형태이며, 수많은 무료 앱과 팬 팩에서 여전히 건재합니다. 현대의 후예들은 AI 채팅과 미니게임을 추가했습니다. 솔직한 강점: 순수한 존재감. 열 앱이 없고, 펫은 그냥 거기, 당신의 작업 위에 있습니다. 솔직한 약점: 대부분은 컴패니언이라기보다 장난감 — 성장 곡선도, 기억도, 공유도 없음. 앱 간 품질 편차가 큽니다. 적합한 사람: 책임이 아니라 화면 위의 그렘린을 원하는 사람.` },
      { h: `Widgetable과 커플 위젯 펫 — 잠금화면 애정에`, p: `새로운 계보는 펫을 잠금화면이나 홈 화면 위젯에 직접 올리고, 가벼운 커플 기능을 곁들입니다 — 상대의 위젯 펫이 손을 흔들고, 작은 상태 신호를 주고받습니다. 솔직한 강점: 마찬 제로. 펫이 당신의 눈이 하루에 백 번 가는 바로 그곳에 삽니다. 솔직한 약점: 위젯 면적이 작아서 펫은 얕게 머뭅니다 — 성장이나 이야기보다는 주로 기분과 콕콕 찌르기. 장기적 깊이는 제한적. 적합한 사람: 프로젝트가 아니라 앰비언트한 귀여움을 원하는 커플.` },
      { h: `AR 펫 앱 — '와'를 원하는 사람에게`, p: `이 카테고리의 AR 브랜치 — 폰 카메라를 통해 실제 방에 사는 것처럼 보이는 생명체를 키우는 것 — 은 이 공간의 개별 앱들이 오르내리락하는 가울에도 가상 펫에서 기술적으로 가장 인상적인 것입니다. 솔직한 강점: 디지털 생명체를 물리적으로 존재하는 것처럼 느끼게 하는 것은 AR이 유일. 솔직한 약점: 신선함이 여기 있는 모든 카테고리 중 가장 빨리 사라짐. 배터리 소모는 진짜. '와'가 사라지면 그 아래에 남는 관계가 별로 없는 경우가 많습니다. 적합한 사람: 짧고 마법 같은 순간 — 친구에게 보여주기, 아이를 즐겁게 하기.` },
      { h: `Togthr — '함께 키우고 싶은' 사람에게`, p: `그리고 이것이 우리 것입니다. 나머지와 똑같이 담담하게. Togthr는 이 리스트에서 유일하게 두 사람을 위해 만들어졌습니다. 당신과 파트너 또는 가까운 친구가 한 마리의 작은 픽셀 로봇 — Togthr Bot, 파스텔 보라와 핑크의 둥근 머리 캐릭터, 8프레임 스프라이트 애니메이션 — 을 공유하고, 두 사람이 서로의 하루에 대한 작고 솔직한 문장을 계속 쓰는 동안만 그것은 자랍니다. 5단계 성장(아기에서 전설까지), 6가지 숨겨진 직업 스킨(프로그래머, 의사, 우주비행사, 셰프, 경찰, 소방관) 해금, 8개 언어 지원, 1/72의 숨겨진 골든 에디션도 있습니다. 일하는 동안 데스크톱에도 삽니다. 솔직한 강점: 관계의 공유된 역사가 되는 유일한 펫. 솔직한 약점: 솔로 습관 트래커를 원하면 Finch가 낫고, 혼돈을 원하면 Shimeji를 키우세요. 그 마법에는 두 사람이 나타나는 것이 필요합니다. 적합한 사람: 커플 — 특히 장거리 — 과 낮은 압력의 매일의 실을 원하는 가까운 친구. 무료로 시작. USD 지역 월 $5.49 / 연 $37.99, 13개국 현지 가격.` },
      { h: `그래서 2026년 최고의 가상 펫 앱은?`, p: `솔직히: 당신의 진짜 '원함'에 맞는 것입니다. 향수라면 다마고치 코너. 셀프케어라면 Finch. 화면 혼돈이라면 Shimeji. 잠금화면의 달콤함이라면 Widgetable. '와'라면 AR. 그리고 당신과 다른 한 사람의 것이 되는 작은 생명체 — 아무 일 없는 화요일을 기억하고 관계와 함께 자라는 것 — 을 원한다면, 그것은 우리가 만든 것이고, 아닌 척하지 않겠습니다. 하지만 이것도 진실입니다 — 이 리스트의 모든 앱은 자신이 만들어진 목적에서는 훌륭합니다. 리스트에 맞는 펫이 아니라, 당신의 삶에 맞는 펫을 고르세요.` },
    ],
    cta: `마지막 것이 '내 것' 같다면, 오늘 밤 Togthr Bot을 입양하세요 — 무료로 시작하고, 첫날부터 함께 자랍니다.`,
    faqs: [
      { q: `2026년 최고의 가상 펫 앱은?`, a: `단일한 '최고'는 없습니다 — 여섯 가지의 다른 '최고'가 있습니다. 진짜 오리지널은 다마고치 코너, 셀프케어 습관은 Finch, 데스크톱 혼돈은 Shimeji 계열, 잠금화면 커플은 Widgetable, '와'는 AR, 파트너나 가까운 친구와 함께 키우는 것은 Togthr. 올바른 선택은 그 펫이 당신을 위해 무엇을 해주기를 원하는지에 전적으로 달려 있습니다.` },
      { q: `가상 펫 앱은 무료인가요?`, a: `대부분 무료 티어가 있고, 비즈니스 모델은 다릅니다. Shimeji 계열은 무료이거나 일회성 구매가 많습니다. Finch와 Togthr는 프리미엄 구독 — Togthr는 USD 지역 월 $5.49 / 연 $37.99, 13개국 현지 가격이 있으며, 무료 티어에는 봇과의 만남과 첫 성장 단계가 포함됩니다. AR과 위젯 앱은 대개 코스메틱을 팝니다. 조언: 무료 티어가 당신의 실제 루틴에서 일주일을 살아남기 전에는 결제하지 마세요.` },
      { q: `커플에게 가장 좋은 가상 펫 앱은?`, a: `관계와 함께 실제로 자라는 공유 펫이라면, Togthr가 그 목적으로 만들어진 선택지입니다 — 한 마리의 공유 봇, 공유 저널, 두 사람이 체크인하는 동안만 진행되는 5단계 성장. 저널링 없이 잠금화면 귀여움만 원한다면 Widgetable 계열이 가벼운 대안입니다. 이 리스트의 나머지는 기본적으로 전부 싱글 플레이어입니다.` },
      { q: `가상 펫 앱은 그냥 아이들용인가요?`, a: `데이터는 반대를 말합니다 — 현재의 가상 펫 앱 물결은 압도적으로 성인, 주로 18~34세가 사용합니다. 이유는 어른의 이유입니다: 외로움, 장거리 연애, 두 시간이 아니라 2분을 요구하는 소프트웨어에 대한 욕구. 픽셀 아트는 장난감처럼 보이지만, 그것이 채우는 필요는 어른의 것입니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/pet`, label: `Togthr Bot 만나기` },
      { href: `/ko/pricing`, label: `13개국 요금` },
      { href: `/ko/blog/tamagotchi-app-2026`, label: `2026년의 다마고치 앱: 키체인에서 관계로` },
      { href: `/ko/blog/why-we-built-a-pet-that-grows-with-you`, label: `왜 함께 자라는 펫을 만들었을까` },
    ],
  },

  // ─────────────────────── Deutsch ───────────────────────
  de: {
    intro: `Gleich vorweg ein Geständnis: Eine der Apps auf dieser Liste haben wir selbst gebaut. Wir sagen dir welche, und wir versuchen, zu ihren Konkurrenten fairer zu sein, als sie es zu uns wären — denn eine "beste virtuelle Haustier-Apps 2026"-Liste, die nur ihr eigenes Produkt krönt, ist für dich nutzlos und für alle anderen unsichtbar. Die Kategorie virtueller Haustiere ist in den letzten zwei Jahren still explodiert. Was früher ein Schlüsselanhänger-Spielzeug war, ist heute mindestens sechs verschiedene Arten von Apps, jede bei etwas anderem wirklich die beste. Also statt einer Fake-Rangliste hier ein ehrlicher Feldguide: worin jede wirklich gut ist, was sie kostet, und wer welche wählen sollte. Die richtige Antwort hängt ganz davon ab, wofür du das Haustier willst.`,
    sections: [
      { h: `Tamagotchi Corner und die offiziellen Bandai-Apps — am besten für das authentische Original`, p: `Wenn du die echte 90er-Schleife willst — füttern, saubermachen, zusehen, wie es sich in seltsame kleine Formen entwickelt, dich schuldig fühlen, wenn es piepst — geh direkt zur Quelle. Bandais offizielle mobile Erlebnisse und die neu aufgelegten physischen Spielzeuge sind immer noch die reinste Version der Idee, und die Retro-Hardware erlebt eine echte Sammler-Renaissance. Ehrliche Stärken: unübertroffener Charme, null Einarbeitung, echte Nostalgie. Ehrliche Schwächen: Die Spieltiefe ist exakt die von 1997, also dünn; und es ist eine strikt solo Beziehung zwischen dir und dem Ei. Am besten für: Puristen, Sammler und alle, die prüfen wollen, ob die Magie echt war (war sie).` },
      { h: `Finch — am besten für Self-Care-Gewohnheiten`, p: `Finch hat das virtuelle Haustier auf ein anderes Ziel gerichtet: deine eigenen mentalen Gewohnheiten. Du kümmerst dich um einen kleinen Vogel, indem du dich um dich selbst kümmerst — Ziele abhaken, eine Zeile Tagebuch, eine Minute atmen — und der Vogel wächst und geht auf kleine Abenteuer. Es ist wirklich liebenswert, und sein Selbstmitgefühl-Rahmen hat vielen Menschen zu sanfteren Routinen verholfen. Ehrliche Stärken: die bestdesignte Gewohnheitsschleife der Kategorie; warm ohne Predigt. Ehrliche Schwächen: Das Haustier ist letztlich das Vehikel für deine To-do-Liste, kein Begleiter mit eigener Präsenz; trotz Freunde-Funktionen bleibt die Kernerfahrung Singleplayer-Selbstverbesserung. Am besten für: alle, deren eigentliches Ziel eine freundlichere tägliche Routine ist.` },
      { h: `Shimeji-artige Desktop-Pets — am besten für chaotische Bildschirmgesellschaft`, p: `Die Shimeji-Tradition — kleine Figuren, die über deinen echten Desktop wandern, an deinen Fenstern hochklettern und sich vermehren, wenn du nicht hinschaust — ist die älteste Form des "ambienten" virtuellen Haustiers und lebt in unzähligen kostenlosen Apps und Fan-Packs weiter. Moderne Nachfahren fügen KI-Chat und Minispiele hinzu. Ehrliche Stärken: reine Präsenz; keine App zu öffnen, das Haustier ist einfach da, über deiner Arbeit. Ehrliche Schwächen: Die meisten sind eher Spielzeug als Begleiter — kein Wachstumsbogen, kein Gedächtnis, nichts Geteiltes; die Qualität variiert stark zwischen Apps. Am besten für: Menschen, die einen Gremlin auf dem Bildschirm wollen, keine Verantwortung.` },
      { h: `Widgetable und die Paar-Widget-Haustiere — am besten für Sperrbildschirm-Zuneigung`, p: `Eine neuere Gattung platziert das Haustier direkt auf deinem Sperrbildschirm oder Home-Screen-Widget, oft mit leichten Paar-Funktionen — das Widget-Haustier deines Partners winkt dir zu, ihr schickt euch kleine Statussignale. Ehrliche Stärken: null Reibung; das Haustier lebt genau dort, wo deine Augen hundertmal am Tag ohnehin hingehen. Ehrliche Schwächen: Die Widget-Fläche ist winzig, also bleiben die Haustiere flach — hauptsächlich Stimmungen und Pings statt Wachstum oder Geschichte; langfristige Tiefe ist begrenzt. Am besten für: Paare, die ambiente Niedlichkeit wollen, kein Projekt.` },
      { h: `AR-Haustier-Apps — am besten für den Wow-Effekt`, p: `Der Augmented-Reality-Zweig der Kategorie — eine Kreatur aufziehen, die durch die Handykamera zu leben scheint, in deinem echten Zimmer — bleibt das technisch beeindruckendste, was virtuelle Haustiere zu bieten haben, auch wenn einzelne Apps in diesem Bereich kommen und gehen. Ehrliche Stärken: Nichts sonst lässt eine digitale Kreatur sich so physisch präsent anfühlen wie AR. Ehrliche Schwächen: Die Neuheit verblasst am schnellsten von allen Kategorien hier; Akkuverbrauch ist real; und wenn das Wow weg ist, bleibt darunter oft nicht viel Beziehung übrig. Am besten für: kurze, magische Momente — Freunden zeigen, Kinder begeistern.` },
      { h: `Togthr — am besten für alle, die eines gemeinsam aufziehen wollen`, p: `Und hier ist unsere, genauso schlicht vorgestellt wie der Rest. Togthr ist der einzige Eintrag auf dieser Liste, der speziell für zwei Menschen gebaut ist. Du und ein Partner oder eine enge Freundin teilen euch einen kleinen Pixel-Roboter — Togthr Bot, eine rundköpfige Figur in Pastell-Lila und Rosa mit 8-Frame-Sprite-Animation — und er wächst nur, solange ihr beide weiter kleine ehrliche Sätze über eure Tage schreibt. Er durchläuft 5 Wachstumsstufen (Baby bis Legende), schaltet 6 versteckte Berufs-Skins frei (Programmierer, Arzt, Astronaut, Koch, Polizist, Feuerwehrmann), funktioniert in 8 Sprachen, und es gibt eine versteckte goldene Edition mit 1-zu-72-Chance. Er lebt außerdem auf deinem Desktop, während du arbeitest. Ehrliche Stärken: das einzige Haustier, das zu einer geteilten Geschichte einer Beziehung wird. Ehrliche Schwächen: Wer einen Solo-Habit-Tracker will, ist mit Finch besser dran; wer Chaos will, holt sich ein Shimeji; die Magie braucht zwei Menschen, die auftauchen. Am besten für: Paare — besonders Fernpaare — und enge Freunde, die einen niedrigschwelligen täglichen Faden wollen. Kostenloser Start; $5.49/Monat oder $37.99/Jahr in USD-Regionen, lokale Preise in 13 Ländern.` },
      { h: `Also: Welche ist die beste virtuelle Haustier-App 2026?`, p: `Ehrlich: die, die zu deinem eigentlichen Wunsch passt. Nostalgie — Tamagotchi Corner. Self-Care — Finch. Bildschirm-Chaos — ein Shimeji. Sperrbildschirm-Süße — Widgetable. Wow — AR. Und wenn das, was du willst, eine kleine Kreatur ist, die dir und einem anderen Menschen gehört, die sich an eure langweiligen Dienstage erinnert und mit der Beziehung wächst — das ist die, die wir gebaut haben, und wir tun nicht so, als wäre es anders. Aber wir sagen dir auch die Wahrheit: Jede App auf dieser Liste ist gut in der Sache, für die sie gebaut wurde. Wähl das Haustier, das zu deinem Leben passt, nicht zur Liste.` },
    ],
    cta: `Wenn das letzte nach deinem klingt, adoptiere heute Abend deinen Togthr Bot — kostenloser Start, gemeinsames Wachsen ab Tag eins.`,
    faqs: [
      { q: `Was ist die beste virtuelle Haustier-App 2026?`, a: `Es gibt keine einzige Beste — es gibt sechs verschiedene "Beste". Tamagotchi Corner für das authentische Original, Finch für Self-Care-Gewohnheiten, Shimeji-artige Apps für Desktop-Chaos, Widgetable für Sperrbildschirm-Paare, AR-Apps für den Wow-Effekt und Togthr, um ein Haustier gemeinsam mit einem Partner oder einer engen Freundin aufzuziehen. Die richtige Wahl hängt ganz davon ab, was das Haustier für dich tun soll.` },
      { q: `Sind virtuelle Haustier-Apps kostenlos?`, a: `Die meisten haben einen kostenlosen Tarif; die Geschäftsmodelle unterscheiden sich. Shimeji-artige Apps sind oft kostenlos oder Einmalkäufe. Finch und Togthr nutzen Freemium-Abos — Togthr kostet $5.49/Monat oder $37.99/Jahr in USD-Regionen mit lokalen Preisen in 13 Ländern, und der kostenlose Tarif umfasst das Kennenlernen deines Bots und die erste Wachstumsstufe. AR- und Widget-Apps verkaufen typischerweise Kosmetik. Unser Rat: Zahl nichts, bevor der kostenlose Tarif eine volle Woche deiner echten Routine überlebt hat.` },
      { q: `Welche virtuelle Haustier-App ist die beste für Paare?`, a: `Für ein geteiltes Haustier, das tatsächlich mit der Beziehung wächst, ist Togthr die eigens gebaute Option — ein geteilter Bot, ein gemeinsames Tagebuch, 5 Wachstumsstufen, die nur voranschreiten, solange beide einchecken. Widgetable-artige Apps sind die leichtere Alternative, wenn du nur Sperrbildschirm-Niedlichkeit ohne Journaling willst. Alles andere auf dieser Liste ist im Kern Singleplayer.` },
      { q: `Sind virtuelle Haustier-Apps nur für Kinder?`, a: `Die Daten sagen das Gegenteil — die aktuelle Welle virtueller Haustier-Apps wird überwiegend von Erwachsenen genutzt, meist zwischen 18 und 34. Die Gründe sind erwachsene: Einsamkeit, Fernbeziehungen, der Wunsch nach Software, die zwei Minuten statt zwei Stunden verlangt. Die Pixel-Art sieht aus wie ein Spielzeug; das Bedürfnis, das sie füllt, ist erwachsen.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/pet`, label: `Togthr Bot kennenlernen` },
      { href: `/de/pricing`, label: `Preise in 13 Ländern` },
      { href: `/de/blog/tamagotchi-app-2026`, label: `Die Tamagotchi-App 2026: vom Schlüsselanhänger zur Beziehung` },
      { href: `/de/blog/why-we-built-a-pet-that-grows-with-you`, label: `Warum wir ein Haustier gebaut haben, das mit euch wächst` },
    ],
  },

  // ─────────────────────── Français ───────────────────────
  fr: {
    intro: `Aveu d'abord : nous fabriquons l'une des applications de cette liste. Nous vous dirons laquelle, et nous essaierons d'être plus justes envers ses concurrents qu'ils ne le seraient envers nous — parce qu'une liste des "meilleures applications d'animaux virtuels 2026" qui ne couronne que son propre produit est inutile pour vous et invisible pour tous les autres. La catégorie des animaux virtuels a explosé discrètement ces deux dernières années. Ce qui était un jouet porte-clés est devenu au moins six espèces distinctes d'applications, chacune vraiment la meilleure à quelque chose de différent. Alors plutôt qu'un faux classement, voici un guide honnête : en quoi chacune est vraiment bonne, ce qu'elle coûte, et qui devrait choisir quoi. La bonne réponse dépend entièrement de ce que vous voulez de l'animal.`,
    sections: [
      { h: `Tamagotchi Corner et les applications officielles Bandai — le meilleur pour l'original authentique`, p: `Si ce que vous voulez, c'est la vraie boucle des années 90 — le nourrir, le nettoyer, le regarder évoluer en petites formes bizarres, vous sentir coupable quand il bipe — allez directement à la source. Les expériences mobiles officielles de Bandai et les jouets physiques réédités restent la version la plus pure de l'idée, et le hardware rétro connaît une vraie renaissance de collectionneurs. Forces honnêtes : charme inégalé, courbe d'apprentissage nulle, vraie nostalgie. Faiblesses honnêtes : la profondeur de jeu est exactement celle de 1997, c'est-à-dire mince ; et c'est une relation strictement solo entre vous et l'œuf. Idéal pour : les puristes, les collectionneurs, et quiconque veut vérifier si la magie était réelle (elle l'était).` },
      { h: `Finch — le meilleur pour les habitudes de self-care`, p: `Finch a pointé l'animal virtuel vers une cible différente : vos propres habitudes mentales. Vous prenez soin d'un petit oiseau en prenant soin de vous — cocher des objectifs, écrire une ligne de journal, respirer une minute — et l'oiseau grandit et part en petites aventures. C'est vraiment adorable, et son cadre d'autocompassion a aidé beaucoup de gens à construire des routines plus douces. Forces honnêtes : la boucle d'habitude la mieux conçue de la catégorie ; chaleureux sans être moralisateur. Faiblesses honnêtes : l'animal est en fin de compte le véhicule de votre to-do list, pas un compagnon avec sa propre présence ; et malgré des fonctions d'amis, l'expérience de base reste du développement personnel en solo. Idéal pour : ceux dont le vrai but est une routine quotidienne plus douce.` },
      { h: `Les animaux de bureau façon Shimeji — le meilleur pour une compagnie d'écran chaotique`, p: `La tradition Shimeji — de petits personnages qui déambulent sur votre vrai bureau, escaladent vos fenêtres, se multiplient quand vous ne regardez pas — est la plus ancienne forme d'animal virtuel "d'ambiance", et elle reste vivante dans d'innombrables applications gratuites et packs de fans. Les descendants modernes ajoutent du chat IA et des mini-jeux. Forces honnêtes : présence pure ; aucune app à ouvrir, l'animal est juste là, par-dessus votre travail. Faiblesses honnêtes : la plupart sont des jouets plutôt que des compagnons — pas d'arc de croissance, pas de mémoire, rien de partagé ; la qualité varie énormément d'une app à l'autre. Idéal pour : ceux qui veulent un gremlin sur leur écran, pas une responsabilité.` },
      { h: `Widgetable et les animaux-widgets pour couples — le meilleur pour l'affection sur écran verrouillé`, p: `Une race plus récente place l'animal directement sur votre écran verrouillé ou votre widget d'accueil, souvent avec des fonctions de couple légères — l'animal-widget de votre partenaire vous fait coucou, vous vous envoyez de petits signaux de statut. Forces honnêtes : friction zéro ; l'animal vit exactement là où vos yeux vont déjà cent fois par jour. Faiblesses honnêtes : la surface du widget est minuscule, donc les animaux restent superficiels — surtout des humeurs et des pings plutôt que de la croissance ou une histoire ; la profondeur à long terme est limitée. Idéal pour : les couples qui veulent de la mignonnerie d'ambiance, pas un projet.` },
      { h: `Les applications d'animaux en AR — le meilleur pour l'effet waouh`, p: `La branche réalité augmentée de la catégorie — élever une créature qui semble vivre dans votre vraie chambre à travers l'appareil photo — reste la chose la plus techniquement impressionnante des animaux virtuels, même si les applications individuelles de ce créneau vont et viennent. Forces honnêtes : rien d'autre ne fait sentir une créature numérique physiquement présente comme la RA. Faiblesses honnêtes : la nouveauté s'estompe le plus vite de toutes les catégories ici ; la batterie souffre vraiment ; et quand le waouh est parti, il ne reste souvent pas beaucoup de relation en dessous. Idéal pour : de courts moments magiques — épater des amis, ravir des enfants.` },
      { h: `Togthr — le meilleur pour en élever un ensemble`, p: `Et voici la nôtre, présentée aussi simplement que les autres. Togthr est la seule entrée de cette liste construite spécifiquement pour deux personnes. Vous et un partenaire ou un ami proche partagez un petit robot pixel — Togthr Bot, un personnage à tête ronde violet et rose pastel avec une animation sprite de 8 images — et il ne grandit que tant que vous continuez tous les deux à écrire de petites phrases honnêtes sur vos journées. Il traverse 5 étapes de croissance (bébé à légende), débloque 6 skins de métiers cachés (programmeur, médecin, astronaute, chef, policier, pompier), fonctionne dans 8 langues, et il y a une édition dorée cachée à 1 chance sur 72. Il vit aussi sur votre bureau pendant que vous travaillez. Forces honnêtes : le seul animal qui devient une histoire partagée d'une relation. Faiblesses honnêtes : si vous voulez un tracker d'habitudes solo, Finch est meilleur ; si vous voulez du chaos, prenez un Shimeji ; la magie exige deux personnes qui se montrent. Idéal pour : les couples — surtout à distance — et les amis proches qui veulent un fil quotidien sans pression. Gratuit pour commencer ; $5.49/mois ou $37.99/an dans les régions USD, prix locaux dans 13 pays.` },
      { h: `Alors, quelle est la meilleure application d'animal virtuel de 2026 ?`, p: `Honnêtement : celle qui correspond à votre vrai désir. Nostalgie — Tamagotchi Corner. Self-care — Finch. Chaos d'écran — un Shimeji. Douceur sur écran verrouillé — Widgetable. Waouh — AR. Et si ce que vous voulez, c'est une petite créature qui appartient à vous et à une autre personne, qui se souvient de vos mardis ennuyeux et grandit avec la relation — c'est celle que nous avons construite, et nous n'allons pas prétendre le contraire. Mais nous vous dirons aussi la vérité : chaque application de cette liste est bonne dans la chose pour laquelle elle a été construite. Choisissez l'animal qui convient à votre vie, pas à la liste.` },
    ],
    cta: `Si le dernier vous ressemble, adoptez votre Togthr Bot ce soir — gratuit pour commencer, grandir ensemble dès le premier jour.`,
    faqs: [
      { q: `Quelle est la meilleure application d'animal virtuel en 2026 ?`, a: `Il n'y a pas une seule meilleure — il y a six "meilleures" différentes. Tamagotchi Corner pour l'original authentique, Finch pour les habitudes de self-care, les applications façon Shimeji pour le chaos de bureau, Widgetable pour les couples sur écran verrouillé, les applications AR pour l'effet waouh, et Togthr pour élever un animal ensemble avec un partenaire ou un ami proche. Le bon choix dépend entièrement de ce que vous voulez que l'animal fasse pour vous.` },
      { q: `Les applications d'animaux virtuels sont-elles gratuites ?`, a: `La plupart ont une offre gratuite ; les modèles économiques diffèrent. Les applications façon Shimeji sont souvent gratuites ou en achat unique. Finch et Togthr utilisent des abonnements freemium — Togthr coûte $5.49/mois ou $37.99/an dans les régions USD avec des prix locaux dans 13 pays, et son offre gratuite inclut la rencontre avec votre bot et la première étape de croissance. Les applications AR et widget vendent généralement des cosmétiques. Notre conseil : ne payez rien avant que l'offre gratuite ait survécu une semaine complète de votre vraie routine.` },
      { q: `Quelle application d'animal virtuel est la meilleure pour les couples ?`, a: `Pour un animal partagé qui grandit vraiment avec la relation, Togthr est l'option construite pour ça — un bot partagé, un journal commun, 5 étapes de croissance qui ne progressent que si les deux personnes pointent. Les applications façon Widgetable sont une alternative plus légère si vous voulez seulement de la mignonnerie sur écran verrouillé sans le journal. Tout le reste de cette liste est fondamentalement solo.` },
      { q: `Les applications d'animaux virtuels sont-elles juste pour les enfants ?`, a: `Les données disent le contraire — la vague actuelle d'applications d'animaux virtuels est utilisée massivement par des adultes, surtout entre 18 et 34 ans. Les raisons sont adultes : la solitude, les relations à distance, l'envie d'un logiciel qui demande deux minutes au lieu de deux heures. Le pixel art ressemble à un jouet ; le besoin qu'il comble est adulte.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/pet`, label: `Rencontrer Togthr Bot` },
      { href: `/fr/pricing`, label: `Prix dans 13 pays` },
      { href: `/fr/blog/tamagotchi-app-2026`, label: `L'application tamagotchi en 2026 : du porte-clés à la relation` },
      { href: `/fr/blog/why-we-built-a-pet-that-grows-with-you`, label: `Pourquoi nous avons construit un animal qui grandit avec vous` },
    ],
  },

  // ─────────────────────── Español ───────────────────────
  es: {
    intro: `Confesión primero: nosotros hacemos una de las apps de esta lista. Te diremos cuál, e intentaremos ser más justos con sus competidores de lo que ellos serían con nosotros — porque una lista de "mejores apps de mascotas virtuales 2026" que solo corona a su propio producto es inútil para ti e invisible para todos los demás. La categoría de mascotas virtuales explotó discretamente en los últimos dos años. Lo que era un juguete llavero es ahora al menos seis especies distintas de app, cada una genuinamente la mejor en algo diferente. Así que en lugar de un ranking falso, aquí va una guía de campo honesta: en qué es realmente buena cada una, cuánto te costará, y quién debería elegir cuál. La respuesta correcta depende enteramente de para qué quieres la mascota.`,
    sections: [
      { h: `Tamagotchi Corner y las apps oficiales de Bandai — la mejor para el original auténtico`, p: `Si lo que quieres es el bucle real de los 90 — alimentarlo, limpiarlo, verlo evolucionar en formas raras, sentirte culpable cuando pita — ve directo a la fuente. Las experiencias móviles oficiales de Bandai y los juguetes físicos reeditados siguen siendo la versión más pura de la idea, y el hardware retro ha tenido un verdadero renacimiento coleccionista. Fortalezas honestas: encanto inigualable, curva de aprendizaje cero, nostalgia real. Debilidades honestas: la profundidad de juego es exactamente la de 1997, es decir, escasa; y es una relación estrictamente en solitario entre tú y el huevo. Mejor para: puristas, coleccionistas, y cualquiera que quiera comprobar si la magia era real (lo era).` },
      { h: `Finch — la mejor para hábitos de autocuidado`, p: `Finch apuntó la mascota virtual a un objetivo distinto: tus propios hábitos mentales. Cuidas a un pequeño pájaro cuidándote a ti — marcar objetivos, escribir una línea de diario, respirar un minuto — y el pájaro crece y sale de pequeñas aventuras. Es realmente adorable, y su marco de autocompasión ha ayudado a mucha gente a construir rutinas más amables. Fortalezas honestas: el bucle de hábitos mejor diseñado de la categoría; cálido sin sermonear. Debilidades honestas: la mascota es en última instancia el vehículo de tu lista de tareas, no un compañero con presencia propia; y aunque tiene funciones de amigos, la experiencia central es superación personal en solitario. Mejor para: cualquiera cuyo objetivo real es una rutina diaria más amable.` },
      { h: `Mascotas de escritorio estilo Shimeji — la mejor para compañía caótica en pantalla`, p: `La tradición Shimeji — pequeños personajes que deambulan por tu escritorio real, escalan tus ventanas, se multiplican cuando no miras — es la forma más antigua de mascota virtual "ambiental", y sigue fuerte en innumerables apps gratuitas y packs de fans. Los descendientes modernos añaden chat con IA y minijuegos. Fortalezas honestas: presencia pura; no hay app que abrir, la mascota simplemente está ahí, encima de tu trabajo. Debilidades honestas: la mayoría son juguetes más que compañeros — sin arco de crecimiento, sin memoria, nada compartido; la calidad varía enormemente entre apps. Mejor para: gente que quiere un gremlin en su pantalla, no una responsabilidad.` },
      { h: `Widgetable y las mascotas-widget para parejas — la mejor para cariño en pantalla de bloqueo`, p: `Una raza más nueva pone la mascota directamente en tu pantalla de bloqueo o widget de inicio, a menudo con funciones ligeras de pareja — la mascota-widget de tu pareja te saluda, se mandan pequeñas señales de estado. Fortalezas honestas: fricción cero; la mascota vive exactamente donde tus ojos ya van cien veces al día. Debilidades honestas: la superficie del widget es diminuta, así que las mascotas se quedan superficiales — sobre todo estados de ánimo y toques en lugar de crecimiento o historia; la profundidad a largo plazo es limitada. Mejor para: parejas que quieren ternura ambiental, no un proyecto.` },
      { h: `Apps de mascotas en RA — la mejor para el factor guau`, p: `La rama de realidad aumentada de la categoría — criar una criatura que parece vivir en tu habitación real a través de la cámara del teléfono — sigue siendo lo más técnicamente impresionante de las mascotas virtuales, aunque las apps individuales de este espacio van y vienen. Fortalezas honestas: nada más hace que una criatura digital se sienta físicamente presente como la RA. Debilidades honestas: la novedad se desvanece más rápido que en cualquier otra categoría aquí; el consumo de batería es real; y cuando el guau se va, a menudo no queda mucha relación debajo. Mejor para: ráfagas cortas y mágicas — impresionar amigos, encantar niños.` },
      { h: `Togthr — la mejor para criar una juntos`, p: `Y aquí está la nuestra, presentada tan llanamente como el resto. Togthr es la única entrada de esta lista construida específicamente para dos personas. Tú y una pareja o amigo cercano comparten un pequeño robot pixel — Togthr Bot, un personaje de cabeza redonda en púrpura y rosa pastel con una animación sprite de 8 fotogramas — y solo crece mientras los dos sigan escribiendo pequeñas frases honestas sobre sus días. Atraviesa 5 etapas de crecimiento (bebé a leyenda), desbloquea 6 skins de profesiones ocultas (programador, médico, astronauta, chef, policía, bombero), funciona en 8 idiomas, y hay una edición dorada oculta con probabilidad de 1 en 72. También vive en tu escritorio mientras trabajas. Fortalezas honestas: la única mascota que se convierte en una historia compartida de una relación. Debilidades honestas: si quieres un rastreador de hábitos en solitario, Finch es mejor; si quieres caos, consigue un Shimeji; la magia requiere que dos personas aparezcan. Mejor para: parejas — especialmente a distancia — y amigos cercanos que quieren un hilo diario de baja presión. Gratis para empezar; $5.49/mes o $37.99/año en regiones USD, precios locales en 13 países.` },
      { h: `Entonces, ¿cuál es la mejor app de mascota virtual de 2026?`, p: `Honestamente: la que coincida con tu deseo real. Nostalgia — Tamagotchi Corner. Autocuidado — Finch. Caos en pantalla — un Shimeji. Dulzura en pantalla de bloqueo — Widgetable. Guau — RA. Y si lo que quieres es una pequeña criatura que pertenece a ti y a otra persona, que recuerda tus martes aburridos y crece con la relación — esa es la que construimos nosotros, y no vamos a fingir lo contrario. Pero también te diremos la verdad: cada app de esta lista es buena en la cosa para la que fue construida. Elige la mascota que encaje con tu vida, no con la lista.` },
    ],
    cta: `Si la última suena a la tuya, adopta tu Togthr Bot esta noche — gratis para empezar, creciendo juntos desde el día uno.`,
    faqs: [
      { q: `¿Cuál es la mejor app de mascota virtual en 2026?`, a: `No hay una única mejor — hay seis "mejores" diferentes. Tamagotchi Corner para el original auténtico, Finch para hábitos de autocuidado, apps estilo Shimeji para caos de escritorio, Widgetable para parejas en pantalla de bloqueo, apps de RA para el factor guau, y Togthr para criar una mascota junto a una pareja o amigo cercano. La elección correcta depende enteramente de qué quieres que la mascota haga por ti.` },
      { q: `¿Las apps de mascotas virtuales son gratis?`, a: `La mayoría tiene un plan gratuito; los modelos de negocio difieren. Las apps estilo Shimeji suelen ser gratis o de compra única. Finch y Togthr usan suscripciones freemium — Togthr cuesta $5.49/mes o $37.99/año en regiones USD con precios locales en 13 países, y su plan gratuito incluye conocer a tu bot y la primera etapa de crecimiento. Las apps de RA y widget típicamente venden cosméticos. Nuestro consejo: nunca pagues antes de que el plan gratuito haya sobrevivido una semana completa de tu rutina real.` },
      { q: `¿Cuál es la mejor app de mascota virtual para parejas?`, a: `Para una mascota compartida que realmente crece con la relación, Togthr es la opción construida para eso — un bot compartido, un diario común, 5 etapas de crecimiento que solo avanzan mientras ambas personas hacen check-in. Las apps estilo Widgetable son una alternativa más ligera si solo quieres ternura en pantalla de bloqueo sin el diario. Todo lo demás de esta lista es fundamentalmente de un jugador.` },
      { q: `¿Las apps de mascotas virtuales son solo para niños?`, a: `Los datos dicen lo contrario — la ola actual de apps de mascotas virtuales es usada abrumadoramente por adultos, mayormente entre 18 y 34 años. Las razones son de adultos: soledad, relaciones a distancia, el deseo de software que pide dos minutos en lugar de dos horas. El pixel art parece un juguete; la necesidad que llena es de adulto.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/pet`, label: `Conoce a Togthr Bot` },
      { href: `/es/pricing`, label: `Precios en 13 países` },
      { href: `/es/blog/tamagotchi-app-2026`, label: `La app tamagotchi en 2026: del llavero a la relación` },
      { href: `/es/blog/why-we-built-a-pet-that-grows-with-you`, label: `Por qué construimos una mascota que crece contigo` },
    ],
  },
}
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const loc = locale as Locale
  const post = getBlogPost(SLUG, loc)
  if (!post) return {}
  const url = `${siteConfig.url}/${loc}/blog/${SLUG}`
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(routing.locales.map((l) => [l, `${siteConfig.url}/${l}/blog/${SLUG}`])),
    } as unknown as Record<string, string> & { canonical: string },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      locale: loc.replace('-', '_'),
      publishedTime: post.date,
      authors: ['Togthr'],
      tags: post.tags,
      images: [
        {
          url: `${siteConfig.url}${post.cover}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${siteConfig.url}${post.cover}`],
    },
  }
}

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale
  setRequestLocale(loc)
  const post = getBlogPost(SLUG, loc)
  if (!post) notFound()
  const body: Body = BODIES[loc]

  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.cover}`,
    datePublished: post.date,
    dateModified: post.date,
    inLanguage: loc.replace('-', '_'),
    author: { '@type': 'Organization', name: 'Togthr', url: siteConfig.url },
    publisher: { '@type': 'Organization', name: siteConfig.name, logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/${loc}/blog/${SLUG}` },
    keywords: post.tags.join(', '),
  }
  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteConfig.url}/${loc}` },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/${loc}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteConfig.url}/${loc}/blog/${SLUG}` },
    ],
  }
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: body.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const morePosts = getBlogPostsByLocale(loc)
    .filter((p) => p.slug !== SLUG)
    .slice(0, 3)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="mb-6 text-sm text-zinc-500">
        <Link href={`/${loc === 'en' ? '' : loc + '/'}`} className="hover:text-pink-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/${loc}/blog`} className="hover:text-pink-400">Blog</Link>
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <time dateTime={post.date}>{post.date}</time>
          {post.readingMinutes ? <span>· {post.readingMinutes} min read</span> : null}
        </div>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">{post.title}</h1>
        <p className="mt-3 text-lg text-zinc-400">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">#{tag}</span>
          ))}
        </div>
      </header>

      <div className="prose prose-invert max-w-none text-zinc-200">
        <p className="text-lg">{body.intro}</p>
        {body.sections.map((s, i) => (
          <div key={i}>
            <h2 className="mt-8 text-2xl font-semibold text-zinc-100">{s.h}</h2>
            <p className="mt-3">{s.p}</p>
          </div>
        ))}
        <p className="mt-8 text-pink-400">
          {body.cta} <Link href={`/${loc === 'en' ? '' : loc + '/'}`} className="underline">Try Togthr free →</Link>
        </p>

        <h2 className="mt-12 text-2xl font-semibold text-zinc-100">FAQ</h2>
        {body.faqs.map((f, i) => (
          <div key={i} className="mt-4">
            <h3 className="text-lg font-semibold text-zinc-100">{f.q}</h3>
            <p className="mt-2 text-zinc-300">{f.a}</p>
          </div>
        ))}

        <BlogCtaBanner slug={SLUG} />

      <h2 className="mt-12 text-2xl font-semibold text-zinc-100">Keep reading</h2>
        <ul className="mt-3 space-y-2">
          {body.links.map((l, i) => (
            <li key={i}>
              <Link href={withUtm(l.href, SLUG)} className="text-pink-400 hover:underline">{l.label} →</Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
