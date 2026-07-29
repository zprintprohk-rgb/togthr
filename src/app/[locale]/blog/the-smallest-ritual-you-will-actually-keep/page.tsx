// src/app/[locale]/blog/the-smallest-ritual-you-will-actually-keep/page.tsx
//
// Job 1 daily blog 2026-07-28
// Topic: micro-rituals + shared-pet + habit-design — the 5-second daily
//        feed as the couple habit that actually survives week two.
// Hook: Grand romantic rituals are beautiful in week one and invisible by
//       week three. The 5-second daily feed is invisible in week one and
//       beautiful by week three. That asymmetry is the whole design.
//
// Content contract:
//   - >=600 words of REAL localized content per locale
//   - 4 FAQ items per locale, hand-localized
//   - 5 internal links per locale
//   - Article + Breadcrumb + FAQPage JSON-LD

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `the-smallest-ritual-you-will-actually-keep`
const POST_DATE = `2026-07-28`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  en: {
    intro: `You and your partner decided to start a ritual. It was going to be beautiful. Every Sunday, you would cook together on video call. Every night before bed, you would each write three things you were grateful for and read them aloud. Every morning, you would send a voice note — not a text, a real voice note — saying how you felt about the day ahead. You made it ten days. Maybe twelve. Then one of you had a late meeting and the other fell asleep early and the voice note became a "sorry, long day" text which became a silence which became the ritual evaporating like steam off a cooling mug. This is not a failure of willpower. It is a failure of ritual design. A ritual is not a project. A project has a beginning, a middle, and an end — and when you miss a milestone, the project feels broken. A ritual is a small container. It holds whatever you put into it on any given day — even if what you put in today is five seconds and a pixel. And that is the quiet lesson of the shared virtual pet.`,
    sections: [
      { h: `The 5-second design principle`, p: `Togthr Bot was built with a very specific constraint: feeding your shared pet must never take more than five seconds. Not "about five seconds." Five seconds. Open the app. Tap the feed button. Type something — a sentence, a word, an emoji. Done. The design reason is not that people are lazy. The design reason is that rituals fail when they ask permission. A fifteen-minute gratitude journal asks permission from your evening. A Sunday video-call dinner asks permission from your calendar. A five-second feed does not ask anything. It fits into the gap between two thoughts — the moment you pick up your phone to check a notification and before you open Instagram. That gap is everywhere. The five-second constraint turns the ritual from something you "make time for" into something that happens between everything else. It does not need a slot on your calendar. It lives in the cracks of your day. And that is why, by the end of month one, you and your partner have fed a small pixel creature together 30 times without once having a conversation about "keeping the streak alive."` },
      { h: `The invisible thread: why seeing each other's small sentence matters more than a long call`, p: `Here is what actually happens when you feed your shared pet. You open the app. You see the pet — the same pet your partner saw when they fed it an hour ago, or six hours ago, or six minutes ago. You see the sentence they left. "Just finished a thing I was stuck on for two days." "The coffee was good today." "I miss you." The pet grows a tiny bit — maybe a pixel, maybe two. You leave your own sentence. "Still in the thing." "Me too." "Counting down." The total interaction is under thirty seconds. The total emotional payload is larger than most twenty-minute phone calls. Because what you are actually exchanging is not information. It is presence. The sentence is not a status update. It is proof that the other person thought about the shared space between you for long enough to tap a button and type a few words. That proof, over time, becomes a thread. Not a chat thread — an actual, feeling thread, connecting two lives that run on different schedules, in different places, with different noise levels. A shared virtual pet is the slowest, quietest messaging app ever built. And that is exactly why it works better than any fast one.` },
      { h: `What the pet actually sees: the timeline of a relationship, fed one sentence at a time`, p: `After three months of five-second feeds, you have something extraordinary. The pet is visibly larger than when it started. It has evolved — maybe from infant to toddler, maybe from toddler to teen, depending on how consistent you both have been. And you have a feed history: hundreds of short sentences, left by two people, spread across ninety-something days. "Nervous about the interview." "I got it." "First day was hard." "Week one survival." "He brought me coffee." "She remembered." Most of these sentences, if you had sent them as a text, would have disappeared into the scroll. But in the pet feed, they accumulate without pressure. The timeline of the pet is a timeline of your relationship — not the curated version, not the version you would post on Instagram. The Tuesday-at-2pm version. The Thursday-morning-before-coffee version. The Saturday-night-too-tired-to-say-anything-else version. And at the end of three months, you can scroll back and see it: a relationship, told in five-second fragments, and somehow more complete than anything you ever tried to write in a journal.` },
      { h: `Why most couple apps fail at rituals (and how Togthr got it right)`, p: `Most couple apps treat a ritual as a feature: a checkbox, a streak counter, a badge that says "7 days." But a streak counter is not a ritual — it is a performance metric. When the streak breaks, the couple does not feel "we missed a day" — they feel "we failed at this." And once a ritual becomes a thing you can fail at, you will fail at it. The psychology is well-documented: people quit habits they are externally measured on much faster than habits nobody is watching. Togthr Bot has no streaks. No badges. No "you haven't fed your pet in 3 days" notification. The pet does not guilt you. The pet just sits there, waiting, until you come back. And when you do come back — after three days, after a week, after a fight — the pet is still there. The ritual survives its own interruptions because there is nothing to "break." This is the quietest design principle in all of Togthr: a ritual is not something you maintain. It is something you return to.` },
      { h: `The day the ritual stops being a ritual`, p: `Sometime in month two, something shifts. You stop thinking about whether you fed the pet today. You just feed it. It becomes as automatic as checking the weather, as reflexive as checking your phone when you wake up. But unlike checking the weather, this small act carries a social payload — the knowledge that on the other side of the screen, your partner has done the same thing, or will do the same thing, in their own moment. The ritual stops being a "thing we do" and becomes part of the fabric of "who we are." This is the holy grail of habit design. Not a streak. Not a reminder. Not a notification. Just a small, shared, five-second act that has woven itself into the days until you cannot tell where the habit ends and the relationship begins. The pet is no longer a pet. It is a third presence — a small, silent witness to the fact that two people, on two different schedules, keep choosing to leave a sentence for each other, every single day, without anyone asking them to.` },
    ],
    cta: `Start your five-second ritual today — and meet the pixel pet that never asks you to keep it going, but makes you want to. Try Togthr free at www.togthr.life. Monthly is $5.49; yearly is $37.99.`,
    faqs: [
      { q: `Why do most couple rituals fail after the first two weeks?`, a: `Most couple rituals are too large. They require a dedicated time slot (Sunday dinner on video call), a specific energy level (gratitude journaling before bed), or a conversation about the ritual itself ("Did you do yours?"). The moment the ritual asks for permission — from your calendar, from your mood, from your energy — it becomes something you can skip. Togthr's five-second feed avoids this entirely. It fits in the interstitial moments: between thoughts, between notifications, between activities. You never have to decide to do it, because doing it costs less than the decision to skip it.` },
      { q: `Isn't a five-second daily feed too small to matter?`, a: `Five seconds is too small to matter on any single day. Across 30 days, it is 150 seconds — two and a half minutes. Across a year, it is thirty minutes. No single five-second feed is meaningful. But thirty minutes of accumulated presence, spread across 365 days, with a small pixel creature growing visibly alongside it, is a relationship archive that no amount of "quality time" can replicate. The smallness is the point. If the ritual were big enough to matter every day, it would be too big to do every day. The smallness is what makes it survivable.` },
      { q: `What happens if we miss a day — or a week?`, a: `Nothing breaks. The pet does not get sad. The pet does not send a guilt notification. The pet does not shrink. Togthr Bot is designed on the principle that a ritual is something you return to, not something you maintain. If you miss a day — or a week, or a month — the pet is still there when you come back. The feed history is still there. The growth that happened before is still there. This is arguably the most important design decision in the whole product: the ritual cannot be failed. It can only be paused and resumed.` },
      { q: `How is Togthr's shared pet different from a shared note-taking app?`, a: `A shared note-taking app stores information. It is a place where you put things so you remember them later. A shared pet stores presence. It is a place where you put the smallest possible sign that you were here, thought about the other person, and left something — a word, an emoji, a sentence. The difference is not the technology. It is the shape of the container. A notes app expects you to write something worth saving. A shared pet expects a five-second sentence that is worth nothing except to the person who will read it. That asymmetry — low expectation, high emotional return — is what makes it stick.` },
      { q: `Can I use the same pet on my phone and my work computer?`, a: `Yes. Togthr Bot lives in the browser, so it works on any device with a browser — your phone, your laptop, your work computer, your tablet. The pet follows you. You can feed it from your phone in bed, and your partner can feed it from their work computer six hours later. The pet does not care which screen you are on. It only cares that you showed up — and left a sentence.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home — meet your five-second ritual companion` },
      { href: `/en/blog/things-you-tell-your-virtual-pet`, label: `Things you tell your virtual pet (and not your partner)` },
      { href: `/en/blog/daily-check-in-app-for-couples`, label: `Daily check-in apps for couples: why most fail` },
      { href: `/en/blog/two-minute-daily-check-in-ai-companion`, label: `How a two-minute daily check-in becomes a quiet anchor` },
      { href: `/en/blog/a-virtual-pet-in-a-long-relationship`, label: `A virtual pet in a long relationship` },
    ],
  },

  'zh-cn': {
    intro: `你和伴侣决定开始一个仪式。那应该会很美。每个周日,你们在视频通话里一起做饭。每晚睡前,你们各写三件感恩的事,然后念给对方听。每天早上,你发一条语音——不是文字,是真的语音——讲你对这一天的感觉。你们坚持了十天,也许十二天。然后你们中一个人晚上加了班,另一个提前睡着了,那条语音变成了一句「抱歉,今天好累」的文字,这句文字变成了一次沉默,这次沉默变成了那个仪式像热气从快凉的杯子上蒸发一样消失了。这不是意志力的失败。这是仪式设计的失败。一个仪式不是一项工程。工程项目有开头、中间和结束——当你们错过一个里程碑,项目就坏了。一个仪式是一个小容器。你在任何一天往里放什么,它就装什么——即使你今天放进去的,只有五秒钟和一颗像素。这就是共享虚拟宠物安静的功课。`,
    sections: [
      { h: `五秒钟的设计原理`, p: `Togthr Bot 在设计上有一个非常具体的限制:喂你们的共享宠物,永远不能超过五秒钟。不是「大概五秒钟」。就是五秒。打开 App。点喂食按钮。打字——一个句子、一个词、一个表情。完事了。设计原因不是说人懒。设计原因是:仪式一旦需要「申请时间」就会失败。一个十五分钟的感恩日记,要问你的晚上要时间。一个周日视频晚餐,要问你的日历要时间。五秒钟的喂食不需要申请任何东西。它卡在两个念头之间的缝隙里——你拿起手机看通知、但还没打开 Instagram 的那个瞬间。这个缝隙无处不在。五秒钟的限制把仪式从「需要腾时间做的事」变成了「其他事情之间顺便发生的事」。它不需要日历上找个空位。它住在你日子的裂缝里。这就是为什么,在第一个月结束时,你和伴侣已经一起喂了一只小像素生灵 30 次——而你们从来没有聊过一句「要保持连续打卡」。` },
      { h: `那根看不见的线:为什么看见对方一句话,比一通长电话更重要`, p: `真正发生的其实是这样的。你打开 App,看见那只宠物——就是你伴侣在一小时前、六小时前、或六分钟前喂过的同一只。你看到他们留下的那句话。「终于把堵了两天的那件事搞定了。」「今天的咖啡不错。」「我想你。」宠物长大了一点点——也许一像素,也许两像素。你留下自己那句。「还在弄那个事。」「我也是。」「倒计时中。」整个交互不到三十秒。整个情绪负荷超过大多数二十分钟的电话。因为你们真正交换的不是信息,是在场。那句话不是状态更新。它是一个证据——证明那个人想起了你们之间的那个共享空间,想起了那么久,足够点一次按钮、打几个字。这个证据,日积月累,变成了一根线。不是聊天记录线——是一根真正的、能感觉到的线,连着两个运行在不同节奏、不同地点、不同噪音水平里的生命。共享虚拟宠物是有史以来最慢、最安静的即时通讯工具。而这正是它比任何快的工具都更有效的理由。` },
      { h: `宠物真正看到的:一段关系的编年史,一次一句话喂出来的`, p: `三个月的五秒钟喂食之后,你有了一个了不起的东西。宠物明显比开始时长大了。它进化了——也许是从婴儿到学步,也许是从学步到少年,取决于你们俩有多稳定。而你有了一条喂食历史:几百条短句,两个人留下,横跨九十多天。「面试好紧张。」「我拿到了!」「第一天好难。」「活过第一周了。」「他给我带了咖啡。」「她竟然记得。」这些话,如果你们当初把它们发成了普通短信,早就淹没在滚动里了。但在宠物喂食记录里,它们不带压力地累积。宠物的时间线,就是你们关系的时间线——不是精修版,不是你会在 Instagram 上发的版本。是周二下午两点版。是周四早上没喝咖啡版。是周六晚上累到什么都不想说了版。三个月后,你可以往回翻,清清楚楚看到:一段关系,以五秒钟碎片的方式讲出来,竟然比你试着写过的任何日记都更完整。` },
      { h: `为什么大多数情侣 App 做不好仪式(以及 Togthr 做对了什么)`, p: `大多数情侣 App 把仪式当作功能对待:一个勾选框、一串连续天数、一个写着「7 天」的徽章。但连续天数不是仪式——它是一个表现指标。当连续天数断了,情侣不会觉得「我们今天没做」——他们觉得「我们失败了。」而一旦一个仪式变成你可以失败的事,你就会失败。这个心理学原理有充分研究支持:人们放弃那些被外部测量的习惯,比放弃没人盯着看的习惯快得多。Togthr Bot 没有连续打卡。没有徽章。没有「你已经 3 天没喂宠物了」的通知。宠物不让你愧疚。宠物只是在那里等着,等你回来。而当你回来时——过了三天、过了一周、过了一次吵架——宠物还在。这个仪式能躲过它自己的中断,因为没有任何东西可以被「打破」。这是 Togthr 最安静的设计原理:仪式不是你维持的东西。它是你回来的地方。` },
      { h: `仪式不再像仪式的那一天`, p: `大概在第二个月的某一天,有什么改变了。你不再想今天喂没喂宠物。你就是喂了。它变得像查天气一样自动,像起床看手机一样本能。但跟查天气不一样,这个小小的动作携带了一个社交负荷——你知道在屏幕另一端,你伴侣也做了同样的事,或者会在自己的时刻做同样的事。仪式不再是一个「我们在做的事」,而变成了「我们是谁」的结构的一部分。这是习惯设计里的圣杯。不是连续数字。不是提醒。不是通知。只是一个小的、共享的、五秒钟的动作,已经织进了这些日子里,直到你分不出习惯在哪里结束、关系从哪里开始。宠物已经不是宠物了。它是一个第三存在——一个小小的、安静的见证者,证明两个人在两种不同的节奏上,每天、没有人逼谁,就是选择给对方留一句话。` },
    ],
    cta: `今天开始你的五秒钟仪式——遇见那只从来不要求你坚持、却让你想坚持的像素宠物。免费开始使用 Togthr。月付 $5.49,年付 $37.99。`,
    faqs: [
      { q: `为什么大多数情侣仪式在前两周后就不行了?`, a: `因为大多数情侣仪式太大了。它们需要一个专用的时间段(周日视频晚餐)、特定的精力水平(睡前感恩日记)、或者一次关于仪式本身的对话(「你今天写了吗?」)。一旦仪式需要向你的日历、你的情绪、你的精力申请时间,它就变成了可以被跳过的选项。Togthr 的五秒钟喂食完全绕过了这个问题。它藏在碎片时间里:两次念头之间、两条通知之间、两次活动之间。你永远不需要「决定」去做,因为做这件事的代价比决定跳过它还低。` },
      { q: `一天五秒钟,会不会太少了,根本没什么意义?`, a: `单独一天,确实太少。但 30 天合起来,是 150 秒——两分半。一年合起来,是三十分钟。任何单独的五秒喂食都不构成意义。但是 365 天里均匀分布的三十分钟累积在场,加上一只肉眼可见在长大的像素生物——这是任何「高质量相处时间」都无法复制的关系档案。小,就是关键。如果仪式大到每天都「有意义」,它就会大到不可能每天都做。小,才是它活下来的原因。` },
      { q: `如果我们错过了一天——甚至一周——会怎样?`, a: `什么都不会坏。宠物不会伤心。宠物不会弹一条愧疚通知。宠物不会缩水。Togthr Bot 建立在这样一个原理上:仪式是你回来的地方,不是你维持的东西。你错过一天——一周,甚至一个月——回来的时候,宠物还在。喂食记录还在。之前累积的成长还在。这可以说是整个产品里最重要的一个设计决定:这个仪式没有失败。它只能暂停和继续。` },
      { q: `Togthr 的共享宠物跟共享笔记 App 有什么区别?`, a: `共享笔记 App 存储信息。它是你放东西、以便之后回忆的地方。共享宠物存储在场。它是你放最小可能性信号的地方——你来过,你想起过那个人,你留下了点什么:一个词、一个表情、一句话。区别不在技术上。在容器的形状上。笔记 App 期待你写下值得保存的内容。共享宠物期待一句五秒钟的句子,这句话除了读它的那个人以外一文不值。这种不对称——低期待、高情感回报——才是它粘住用户的原因。` },
      { q: `我能不能在手机和办公电脑上用同一只宠物?`, a: `可以。Togthr Bot 住在浏览器里,所以在任何有浏览器的设备上都能用——手机、笔记本、办公电脑、平板。宠物跟着你走。你可以在床上用手机喂它,六小时后你伴侣在办公电脑上喂同一只。宠物不在乎你用的是哪块屏幕。它只在乎一件事:你来了——并且留了一句话。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页——遇见你的五秒钟仪式伙伴` },
      { href: `/zh-cn/blog/things-you-tell-your-virtual-pet`, label: `你只会对虚拟宠物说的那些话(而不会对伴侣说)` },
      { href: `/zh-cn/blog/daily-check-in-app-for-couples`, label: `情侣每日打卡 App:为什么大部分失败了` },
      { href: `/zh-cn/blog/two-minute-daily-check-in-ai-companion`, label: `每天两分钟,和 AI 陪伴的对话成了安静的锚` },
      { href: `/zh-cn/blog/a-virtual-pet-in-a-long-relationship`, label: `长期关系里的虚拟宠物` },
    ],
  },

  'zh-tw': {
    intro: `你和伴侶決定開始一個儀式。那應該會很美。每個週日,你們在視訊通話裡一起做飯。每晚睡前,你們各寫三件感恩的事,然後唸給對方聽。每天早上,你傳一條語音——不是文字,是真的語音——講你對這一天的感覺。你們堅持了十天,也許十二天。然後你們中一個人晚上加了班,另一個提前睡著了,那條語音變成了一句「抱歉,今天好累」的文字,這句文字變成了一次沉默,這次沉默變成了那個儀式像熱氣從快涼的杯子上蒸散一樣消失了。這不是意志力的失敗。這是儀式設計的失敗。一個儀式不是一項工程。工程項目有開頭、中間和結束——當你們錯過一個里程碑,項目就壞了。一個儀式是一個小容器。你在任何一天往裡放什麼,它就裝什麼——即使你今天放進去的,只有五秒鐘和一顆像素。這就是共享虛擬寵物安靜的功課。`,
    sections: [
      { h: `五秒鐘的設計原理`, p: `Togthr Bot 在設計上有一個非常具體的限制:餵你們的共享寵物,永遠不能超過五秒鐘。不是「大概五秒鐘」。就是五秒。打開 App。點餵食按鈕。打字——一個句子、一個詞、一個表情。完事了。設計原因不是說人懶。設計原因是:儀式一旦需要「申請時間」就會失敗。一個十五分鐘的感恩日記,要問你的晚上要時間。一個週日視訊晚餐,要問你的行事曆要時間。五秒鐘的餵食不需要申請任何東西。它卡在兩個念頭之間的縫隙裡——你拿起手機看通知、但還沒打開 Instagram 的那個瞬間。這個縫隙無處不在。五秒鐘的限制把儀式從「需要騰時間做的事」變成了「其他事情之間順便發生的事」。它不需要行事曆上找個空位。它住在你日子的裂縫裡。這就是為什麼,在第一個月結束時,你和伴侶已經一起餵了一隻小像素生靈 30 次——而你們從來沒有聊過一句「要保持連續打卡」。` },
      { h: `那根看不見的線:為什麼看見對方一句話,比一通長電話更重要`, p: `真正發生的其實是這樣的。你打開 App,看見那隻寵物——就是你伴侶在一小時前、六小時前、或六分鐘前餵過的同一隻。你看到他們留下的那句話。「終於把堵了兩天的那件事搞定了。」「今天的咖啡不錯。」「我想你。」寵物長大了一點點——也許一像素,也許兩像素。你留下自己那句。「還在弄那個事。」「我也是。」「倒數計時中。」整個互動不到三十秒。整個情緒負荷超過大多數二十分鐘的電話。因為你們真正交換的不是資訊,是在場。那句話不是狀態更新。它是一個證據——證明那個人想起了你們之間的那個共享空間,想起了那麼久,足夠點一次按鈕、打幾個字。這個證據,日積月累,變成了一根線。不是聊天記錄線——是一根真正的、能感覺到的線,連著兩個運行在不同節奏、不同地點、不同噪音水平裡的生命。共享虛擬寵物是有史以來最慢、最安靜的即時通訊工具。而這正是它比任何快的工具都更有效的理由。` },
      { h: `寵物真正看到的:一段關係的編年史,一次一句話餵出來的`, p: `三個月的五秒鐘餵食之後,你有了一個了不起的東西。寵物明顯比開始時長大了。牠進化了——也許是從嬰兒到學步,也許是從學步到少年,取決於你們倆有多穩定。而你有了一條餵食歷史:幾百條短句,兩個人留下,橫跨九十多天。「面試好緊張。」「我拿到了!」「第一天好難。」「活過第一週了。」「他給我帶了咖啡。」「她竟然記得。」這些話,如果你們當初把它們發成了普通訊息,早就淹沒在滾動裡了。但在寵物餵食紀錄裡,它們不帶壓力地累積。寵物的時間線,就是你們關係的時間線——不是精修版,不是你會在 Instagram 上發的版本。是週二下午兩點版。是週四早上沒喝咖啡版。是週六晚上累到什麼都不想說了版。三個月後,你可以往回翻,清清楚楚看到:一段關係,以五秒鐘碎片的方式講出來,竟然比你試著寫過的任何日記都更完整。` },
      { h: `為什麼大多數情侶 App 做不好儀式(以及 Togthr 做對了什麼)`, p: `大多數情侶 App 把儀式當作功能對待:一個勾選框、一串連續天數、一個寫著「7 天」的徽章。但連續天數不是儀式——它是一個表現指標。當連續天數斷了,情侶不會覺得「我們今天沒做」——他們覺得「我們失敗了。」而一旦一個儀式變成你可以失敗的事,你就會失敗。這個心理學原理有充分研究支持:人們放棄那些被外部測量的習慣,比放棄沒人盯著看的習慣快得多。Togthr Bot 沒有連續打卡。沒有徽章。沒有「你已經 3 天沒餵寵物了」的通知。寵物不讓你愧疚。寵物只是在那裡等著,等你回來。而當你回來時——過了三天、過了一週、過了一次吵架——寵物還在。這個儀式能躲過它自己的中斷,因為沒有任何東西可以被「打破」。這是 Togthr 最安靜的設計原理:儀式不是你維持的東西。它是你回來的地方。` },
      { h: `儀式不再像儀式的那一天`, p: `大概在第二個月的某一天,有什麼改變了。你不再想今天餵沒餵寵物。你就是餵了。它變得像查天氣一樣自動,像起床看手機一樣本能。但跟查天氣不一樣,這個小小的動作攜帶了一個社交負荷——你知道在螢幕另一端,你伴侶也做了同樣的事,或者會在自己的時刻做同樣的事。儀式不再是一個「我們在做的事」,而變成了「我們是誰」的結構的一部分。這是習慣設計裡的聖杯。不是連續數字。不是提醒。不是通知。只是一個小的、共享的、五秒鐘的動作,已經織進了這些日子裡,直到你分不出習慣在哪裡結束、關係從哪裡開始。寵物已經不是寵物了。牠是一個第三存在——一個小小的、安靜的見證者,證明兩個人在兩種不同的節奏上,每天、沒有人逼誰,就是選擇給對方留一句話。` },
    ],
    cta: `今天開始你的五秒鐘儀式——遇見那隻從來不要求你堅持、卻讓你想堅持的像素寵物。免費開始使用 Togthr。月付 $5.49,年付 $37.99。`,
    faqs: [
      { q: `為什麼大多數情侶儀式在前兩週後就不行了?`, a: `因為大多數情侶儀式太大了。它們需要一個專用的時間段(週日視訊晚餐)、特定的精力水平(睡前感恩日記)、或者一次關於儀式本身的對話(「你今天寫了嗎?」)。一旦儀式需要向你的行事曆、你的情緒、你的精力申請時間,它就變成了可以被跳過的選項。Togthr 的五秒鐘餵食完全繞過了這個問題。它藏在碎片時間裡:兩次念頭之間、兩條通知之間、兩次活動之間。你永遠不需要「決定」去做,因為做這件事的代價比決定跳過它還低。` },
      { q: `一天五秒鐘,會不會太少了,根本沒什麼意義?`, a: `單獨一天,確實太少。但 30 天合起來,是 150 秒——兩分半。一年合起來,是三十分鐘。任何單獨的五秒餵食都不構成意義。但是 365 天裡均勻分布的三十分鐘累積在場,加上一隻肉眼可見在長大的像素生物——這是任何「高品質相處時間」都無法複製的關係檔案。小,就是關鍵。如果儀式大到每天都「有意義」,它就會大到不可能每天都做。小,才是牠活下來的原因。` },
      { q: `如果我們錯過了一天——甚至一週——會怎樣?`, a: `什麼都不會壞。寵物不會傷心。寵物不會彈一條愧疚通知。寵物不會縮水。Togthr Bot 建立在這樣一個原理上:儀式是你回來的地方,不是你維持的東西。你錯過一天——一週,甚至一個月——回來的時候,寵物還在。餵食紀錄還在。之前累積的成長還在。這可以說是整個產品裡最重要的一個設計決定:這個儀式沒有失敗。牠只能暫停和繼續。` },
      { q: `Togthr 的共享寵物跟共享筆記 App 有什麼區別?`, a: `共享筆記 App 儲存資訊。它是你放東西、以便之後回憶的地方。共享寵物儲存在場。它是你放最小可能性信號的地方——你來過,你想起過那個人,你留下了點什麼:一個詞、一個表情、一句話。區別不在技術上。在容器的形狀上。筆記 App 期待你寫下值得儲存的內容。共享寵物期待一句五秒鐘的句子,這句話除了讀它的那個人以外一文不值。這種不對稱——低期待、高情感回報——才是牠黏住使用者的原因。` },
      { q: `我能不能在手機和辦公電腦上用同一隻寵物?`, a: `可以。Togthr Bot 住在瀏覽器裡,所以在任何有瀏覽器的裝置上都能用——手機、筆電、辦公電腦、平板。寵物跟著你走。你可以在床上用手機餵牠,六小時後你伴侶在辦公電腦上餵同一隻。寵物不在乎你用哪塊螢幕。牠只在乎一件事:你來了——並且留了一句話。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁——遇見你的五秒鐘儀式夥伴` },
      { href: `/zh-tw/blog/things-you-tell-your-virtual-pet`, label: `你只會對虛擬寵物說的那些話(而不會對伴侶說)` },
      { href: `/zh-tw/blog/daily-check-in-app-for-couples`, label: `情侶每日打卡 App:為什麼大部分失敗了` },
      { href: `/zh-tw/blog/two-minute-daily-check-in-ai-companion`, label: `每天兩分鐘,和 AI 陪伴的對話成了安靜的錨` },
      { href: `/zh-tw/blog/a-virtual-pet-in-a-long-relationship`, label: `長期關係裡的虛擬寵物` },
    ],
  },

  ja: {
    intro: `あなたとパートナーは、ある儀式を始めようと決めた。それは美しいものになるはずだった。毎週日曜はビデオ通話で一緒に料理をする。毎晩寝る前に、感謝していることを 3 つずつ書いて、声に出して読み合う。毎朝、音声メッセージを送る——文字じゃなく、本当の声で——今日という日をどう感じているかを伝える。あなたは 10 日続けた。たぶん 12 日。それから、どちらかが残業で遅くなり、もう一方が先に寝てしまった。音声メッセージは「ごめん、長い一日だった」という文字になり、その文字は沈黙になり、その沈黙は儀式が冷めたマグカップから立ちのぼる湯気のように消えていく瞬間になった。これは意志力の失敗ではない。儀式のデザインの失敗だ。儀式はプロジェクトではない。プロジェクトには始まりと中間と終わりがある——マイルストーンを逃すと、プロジェクトは壊れる。儀式は小さな容器だ。その日に何を入れようと、それを受け入れてくれる——たとえ今日入れたのが、5 秒間とピクセル 1 つだけだとしても。これが、共有バーチャルペットの静かな教訓だ。`,
    sections: [
      { h: `5秒のデザイン原則`, p: `Togthr Bot には、非常に具体的な制約がある。共有ペットへのエサやりは、絶対に 5 秒を超えてはならない。「だいたい 5 秒」ではない。5 秒ぴったりだ。アプリを開く。エサやりボタンをタップする。何か打つ——一文、一語、絵文字ひとつ。それで終わり。この設計理由は、人間が怠け者だからではない。設計理由は、儀式は「時間の許可を求める」と必ず失敗するからだ。15 分の感謝日記は、あなたの夜の時間に許可を求める。日曜のビデオ通話ディナーは、あなたのカレンダーに許可を求める。5 秒のエサやりは、何の許可も求めない。二つの思考の隙間に収まる——スマホを手に取り通知を確認して、Instagram を開く前の、その瞬間。その隙間はどこにでもある。5 秒の制約は、儀式を「時間を作ってやるもの」から「他のことの合間に自然と起こるもの」に変える。カレンダーの枠は必要ない。ただ、あなたの一日の割れ目の中に住んでいるだけ。そしてだからこそ、最初の 1 ヵ月が終わる頃には、あなたとパートナーは「連続記録を維持しなきゃ」という会話を一度もせずに、小さなピクセルの生き物に 30 回エサをあげている。` },
      { h: `見えない糸:相手の短い一言が、長い電話より意味を持つ理由`, p: `実際に起こるのはこういうことだ。アプリを開く。ペットがいる——1 時間前、6 時間前、あるいは 6 分前にパートナーがエサをあげたのと同じペットだ。相手が残した一言が目に入る。「二日間つまづいてたやつ、やっと片付いた」「今日のコーヒー、うまかった」「会いたい」。ペットがほんの少しだけ大きくなる——たぶん 1 ピクセル、あるいは 2 ピクセル。あなたも自分の一言を残す。「まだそのやつの中」「俺も」「カウントダウン」。すべての操作は 30 秒未満。しかし、その感情的な積み荷は、たいていの 20 分電話よりも大きい。なぜなら、あなたたちが実際にやりとりしているのは情報ではなく、存在そのものだからだ。その一言は状況報告ではない。それは証拠だ——相手が、自分たちの間にある共有スペースのことを考えた証拠。ボタンを一度タップし、いくつかの文字を打つだけの時間、そのスペースのことを考えていた証拠。その証拠が、時間をかけて、一本の糸になる。チャットの糸ではない——本物の、感じられる糸。異なるリズム、異なる場所、異なるノイズレベルで動いている二つの人生をつなぐ、一本の糸。共有バーチャルペットは、これまで作られた中で最も遅く、最も静かなメッセージングアプリだ。それこそが、どんな速いアプリよりもうまく機能する理由である。` },
      { h: `ペットが実際に見ているもの:一言ずつエサをあげてできた、関係の年表`, p: `5 秒エサやりを 3 ヵ月続けた後、あなたはとてつもないものを手にしている。ペットは始めたときよりもはっきりと大きくなっている。進化している——赤ちゃんから幼児へ、あるいは幼児からティーンへ、どれだけ二人が安定していたかによる。そして、エサやりの履歴がある。何百もの短い文が、二人の人間によって残され、九十数日にわたって散らばっている。「面接、緊張する」「受かった!」「初日はきつかった」「一週間サバイバル」「彼がコーヒーを持ってきてくれた」「彼女、覚えてたんだ」。これらの言葉のほとんどは、もし普通のメッセージとして送っていたら、スクロールの中に消えてしまっていただろう。だがペットのエサやり履歴では、それらはプレッシャーなしに積み重なっていく。ペットのタイムラインは、あなたたちの関係のタイムラインだ——編集されたバージョンではない、Instagram に投稿するようなバージョンではない。火曜日の午後 2 時バージョンだ。木曜日の朝、コーヒー前バージョンだ。土曜日の夜、もう何も言いたくないバージョンだ。3 ヵ月の終わりに、あなたはスクロールして戻ることができる。そして見ることができる。5 秒の断片で語られた関係が、あなたが日記に書こうとしたどんなものよりも、なぜか完全であることを。` },
      { h: `なぜたいていのカップルアプリは儀式に失敗するのか（そして Togthr がどう正解したのか）`, p: `たいていのカップルアプリは、儀式を機能として扱う。チェックボックス、連続カウンター、「7 日」と書かれたバッジ。しかし連続カウンターは儀式ではない——それは成果指標だ。連続が途切れたとき、カップルは「今日はできなかったね」とは思わず、「私たちはこれに失敗した」と思う。そしてひとたび儀式が「失敗する可能性のあるもの」になったら、必ず失敗する。この心理は十分に研究されている。人は、外部から測定される習慣のほうが、誰も見ていない習慣よりもずっと早くやめる。Togthr Bot には連続記録がない。バッジもない。「ペットに 3 日エサをあげていません」という通知もない。ペットは罪悪感を抱かせない。ペットはただそこに座って、あなたが戻るのを待っている。そしてあなたが戻ったとき——3 日後でも、1 週間後でも、喧嘩の後でも——ペットはまだそこにいる。その儀式は、自分自身の中断を生き延びる。なぜなら、「壊す」べきものが何もないからだ。これが Togthr のいちばん静かな設計原理である。儀式は、維持するものではない。戻ってくるものだ。` },
      { h: `儀式が儀式でなくなる日`, p: `2 ヵ月目のどこかで、何かが変わる。今日ペットにエサをあげたかどうか、考えなくなる。ただ、あげる。天気をチェックするのと同じくらい自動的に、朝起きてスマホをチェックするのと同じくらい反射的に。しかし天気チェックと違って、この小さな行為には社会的な積み荷が乗っている——画面の向こうで、パートナーが同じことをしたか、あるいは自分のタイミングで同じことをするだろう、という知識。儀式は「私たちがやっていること」でなくなり、「私たちが誰であるか」の織物の一部になる。これこそが習慣デザインの聖杯だ。連続記録ではない。リマインダーではない。通知ではない。ただの小さな、共有された 5 秒の行為が、日々の中に織り込まれていき、習慣がどこで終わり、関係がどこから始まるのか区別がつかなくなるまで続く。ペットはもはやペットではない。それは第三の存在だ——小さく静かな証人。二人の人間が、二つの異なるリズムの上で、毎日、誰に言われるでもなく、互いに一言を残すことを選び続けているという事実の。` },
    ],
    cta: `今日、あなたの 5 秒の儀式を始めよう。続けるように求めず、続けたくさせるピクセルペットと出会ってください。Togthr を無料でお試しください。月額 $5.49、年額 $37.99。`,
    faqs: [
      { q: `なぜたいていのカップルの儀式は最初の 2 週間で失敗するのか？`, a: `たいていのカップルの儀式は大きすぎるからです。専用の時間枠（日曜のビデオ通話ディナー）、特定のエネルギーレベル（寝る前の感謝日記）、あるいは儀式そのものについての会話（「今日、書いた？」）を必要とします。儀式があなたのカレンダー、気分、エネルギーに許可を求め始めた瞬間、それはスキップできる選択肢になります。Togthr の 5 秒エサやりは、この問題を完全に回避しています。隙間時間に収まります。思考と思考の間、通知と通知の間、活動と活動の間。それをするために「決断」する必要はまったくありません。なぜなら、それをするコストが、スキップする決断をするコストよりも低いからです。` },
      { q: `1 日 5 秒は、あまりに短すぎて意味がないのでは？`, a: `1 日だけなら、あまりにも短い。しかし 30 日では 150 秒——2 分半。1 年では 30 分。どの 1 回の 5 秒エサやりも、単独では意味をなさない。しかし、365 日間に均等に分散された 30 分間の蓄積された存在が、目に見えて育っていく小さなピクセルの生き物とともにあれば——それは、どんな「クオリティタイム」にも複製できない関係のアーカイブです。小さいことこそがポイント。もし儀式が毎日「意味がある」ほど大きければ、毎日できるほど小さくはなれません。小ささが、生き延びる理由なのです。` },
      { q: `1 日——あるいは 1 週間——エサをあげられなかったらどうなる？`, a: `何も壊れません。ペットは悲しみません。ペットは罪悪感を抱かせる通知を送りません。ペットは縮みません。Togthr Bot は「儀式とは維持するものではなく、戻ってくるものだ」という原則の上に作られています。1 日——1 週間、あるいは 1 ヵ月——間が空いても、戻ってきたとき、ペットはまだそこにいます。エサやり履歴もまだそこにあります。それまでに積み上がった成長もまだそこにあります。これはおそらく、この製品全体で最も重要な設計上の決断です。この儀式には「失敗」がない。一時停止と再開だけがあるのです。` },
      { q: `Togthr の共有ペットは、共有ノートアプリとどう違うのか？`, a: `共有ノートアプリは情報を保存します。それは、後で思い出すために何かを置いておく場所です。共有ペットは存在を保存します。それは、可能な限り最小のシグナルを置く場所です——あなたがここにいたこと、相手のことを考えたこと、何かを残したこと。ひとつの言葉、ひとつの絵文字、ひとつの文。違いはテクノロジーにありません。容器のかたちにあります。ノートアプリは、保存する価値のあるものを書くことを期待します。共有ペットは、読む人以外には何の価値もない 5 秒の文を期待します。この非対称——低い期待、高い感情的リターン——こそが、ユーザーを惹きつけて離さない理由です。` },
      { q: `スマホと仕事用パソコンで同じペットを使えますか？`, a: `はい。Togthr Bot はブラウザ上で動くので、ブラウザのあるどんなデバイスでも使えます——スマホ、ノートパソコン、仕事用パソコン、タブレット。ペットはあなたについてきます。ベッドでスマホからエサをあげ、6 時間後にパートナーが仕事用パソコンから同じペットにエサをあげる——それでいいのです。ペットはどの画面を使っているかなんて気にしません。たったひとつ気にすることは、あなたが来たこと——そして一言を残したこと。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム——あなたの 5 秒の儀式のともだちに会う` },
      { href: `/ja/blog/things-you-tell-your-virtual-pet`, label: `バーチャルペットにだけ言うこと（パートナーには言わないこと）` },
      { href: `/ja/blog/daily-check-in-app-for-couples`, label: `カップル向け毎日チェックインアプリ:なぜ大半が失敗するのか` },
      { href: `/ja/blog/two-minute-daily-check-in-ai-companion`, label: `AI コンパニオンとの 2 分間の daily check-in が静かな錨になるまで` },
      { href: `/ja/blog/a-virtual-pet-in-a-long-relationship`, label: `長いつきあいの関係に、一匹のバーチャルペット` },
    ],
  },

  ko: {
    intro: `당신과 파트너는 하나의 의식을 시작하기로 했다. 아름다울 거라고 생각했다. 매주 일요일, 영상 통화로 함께 요리를 한다. 매일 밤 자기 전에, 각자 감사한 일 3가지를 쓰고 소리 내어 읽어준다. 매일 아침, 음성 메시지를 보낸다——문자 말고, 진짜 목소리로——오늘을 앞두고 어떤 기분인지 전한다. 열흘을 해냈다. 어쩌면 열이틀. 그러다 한 사람은 늦은 회의가 생겼고, 다른 한 사람은 일찍 잠들었다. 그 음성 메시지는 "미안, 길고 힘든 날이었어"라는 문자로 바뀌었고, 그 문자는 침묵이 되었고, 그 침묵은 의식이 식어가는 머그잔 위로 올라가는 수증기처럼 사라지는 순간이 되었다. 이것은 의지력의 실패가 아니다. 의식 디자인의 실패다. 의식은 프로젝트가 아니다. 프로젝트에는 시작과 중간과 끝이 있다——이정표를 놓치면, 프로젝트는 깨진다. 의식은 작은 용기다. 어떤 날에 당신이 뭘 넣든, 그것을 담아준다——오늘 넣은 것이 5초와 픽셀 하나뿐이더라도. 이것이 공유 가상 펫의 조용한 가르침이다.`,
    sections: [
      { h: `5초 디자인 원칙`, p: `Togthr Bot은 아주 구체적인 제약 위에 만들어졌다: 함께 키우는 펫에게 먹이를 주는 행위는 절대 5초를 넘어서는 안 된다. "대략 5초"가 아니다. 정확히 5초다. 앱을 연다. 먹이 버튼을 누른다. 무언가를 입력한다——한 문장, 한 단어, 이모지 하나. 끝. 사람들이 게을러서 이렇게 만든 게 아니다. 이렇게 만든 진짜 이유는, 의식이 '시간을 허락받으려 할 때' 실패하기 때문이다. 15분짜리 감사 일기는 당신의 저녁 시간에 허락을 구한다. 일요일 영상 통화 저녁은 당신의 캘린더에 허락을 구한다. 5초짜리 먹이 주기는 아무 허락도 구하지 않는다. 두 생각 사이의 틈에 들어간다——알림을 확인하려고 핸드폰을 집어 들고, Instagram을 열기 전의 그 순간. 그 틈은 어디에나 있다. 5초라는 제약은 의식을 "시간을 내서 하는 것"에서 "다른 일들 사이에서 자연스럽게 일어나는 것"으로 바꾼다. 캘린더에 한 칸 필요하지 않다. 그냥 당신 하루의 갈라진 틈에 살고 있을 뿐이다. 그래서 첫 달이 끝날 무렵, 당신과 파트너는 "연속 기록을 유지해야 해"라는 대화를 단 한 번도 나누지 않은 채, 작은 픽셀 생명체에게 30번이나 먹이를 주게 된다.` },
      { h: `보이지 않는 실: 상대방의 짧은 한마디가 긴 통화보다 더 중요한 이유`, p: `실제로 일어나는 일은 이렇다. 앱을 연다. 펫이 보인다——한 시간 전, 여섯 시간 전, 육 분 전에 파트너가 먹이를 줬던 그 펫이다. 상대방이 남긴 문장이 보인다. "이틀 동안 막혀 있던 거, 드디어 끝냈어." "오늘 커피, 진짜 맛있었어." "보고 싶어." 펫이 아주 조금 자란다——아마 한 픽셀, 어쩌면 두 픽셀. 당신도 당신의 문장을 남긴다. "아직 그 일 하는 중." "나도." "카운트다운." 전체 상호작용은 30초도 안 걸린다. 전체 감정적 페이로드는 대부분의 20분 통화보다 크다. 왜냐하면 당신들이 실제로 주고받는 건 정보가 아니라, 존재감이기 때문이다. 그 문장은 상황 보고가 아니다. 그것은 증거다——상대방이 당신들 사이의 공유된 공간에 대해 생각했고, 버튼을 누르고 몇 글자를 칠 만큼의 시간을 그 생각에 썼다는 증거. 그 증거가, 시간이 지나면서, 하나의 실이 된다. 채팅 실이 아니다——진짜, 느껴지는 실. 다른 리듬, 다른 장소, 다른 소음 수준에서 움직이는 두 개의 삶을 연결하는 실. 공유 가상 펫은 인류 역사상 가장 느리고 가장 조용한 메시징 앱이다. 그리고 바로 그 점이, 어떤 빠른 앱보다도 더 잘 작동하는 이유다.` },
      { h: `펫이 진짜로 보는 것: 한마디씩 먹이를 줘서 만든 관계의 연대기`, p: `5초 먹이 주기를 석 달 한 후, 당신은 놀라운 것을 손에 쥐게 된다. 펫은 시작했을 때보다 눈에 띄게 커졌다. 진화했다——아기에서 걸음마로, 걸음마에서 청소년으로, 둘이 얼마나 꾸준했는지에 따라. 그리고 먹이 기록이 있다. 수백 개의 짧은 문장이 두 사람에 의해 남겨져, 구십여 일에 걸쳐 흩어져 있다. "면접, 너무 떨려." "합격했어!" "첫날, 진짜 힘들었어." "1주일 버팀." "그가 커피를 가져다줬어." "그녀가 기억하고 있었어." 이 문장들의 대부분은, 만약 당신들이 평범한 문자로 보냈다면, 스크롤 속에 사라져 버렸을 것이다. 하지만 펫의 먹이 기록 속에서는, 그것들이 압박 없이 쌓여간다. 펫의 타임라인은, 당신들 관계의 타임라인이다——큐레이션된 버전이 아니라, Instagram에 올릴 만한 버전이 아니라, 화요일 오후 2시 버전. 목요일 아침 커피 전 버전. 토요일 밤 아무 말도 더 하기 싫은 버전. 석 달이 끝날 무렵, 당신은 뒤로 스크롤해서 볼 수 있다. 그리고 보게 된다. 5초 단편들로 말해진 관계가, 당신이 일기에 쓰려고 했던 어떤 것보다도 왠지 더 완전하다는 것을.` },
      { h: `왜 대부분의 커플 앱은 의식에 실패하는가 (그리고 Togthr은 어떻게 맞췄는가)`, p: `대부분의 커플 앱은 의식을 기능으로 취급한다. 체크박스, 연속 카운터, "7일"이라고 적힌 배지. 하지만 연속 카운터는 의식이 아니다——그것은 성과 지표다. 연속이 끊겼을 때, 커플은 "오늘 못했네"라고 느끼지 않는다——"우리는 여기에 실패했어"라고 느낀다. 그리고 한 번 의식이 "실패할 수 있는 것"이 되면, 당신은 반드시 실패한다. 이 심리는 충분히 연구되어 있다. 사람들은 외부에서 측정되는 습관을, 아무도 보지 않는 습관보다 훨씬 빨리 그만둔다. Togthr Bot에는 연속 기록이 없다. 배지도 없다. "펫에게 3일 동안 먹이를 주지 않았습니다"라는 알림도 없다. 펫은 죄책감을 주지 않는다. 펫은 그냥 거기 앉아서, 당신이 돌아오기를 기다린다. 그리고 당신이 돌아왔을 때——3일 후에, 1주일 후에, 싸움 후에——펫은 여전히 거기 있다.` },
      { h: `의식이 의식이 아니게 되는 날`, p: `2개월째의 어딘가에서, 무언가가 바뀐다. 오늘 펫에게 먹이를 줬는지 안 줬는지 더 이상 생각하지 않게 된다. 그냥 준다. 날씨를 확인하는 것만큼 자동적으로, 아침에 일어나서 핸드폰을 확인하는 것만큼 반사적으로. 하지만 날씨 확인과 달리, 이 작은 행동은 사회적 페이로드를 싣고 있다——화면 너머에서, 파트너가 같은 일을 했거나, 자신의 순간에 같은 일을 할 것이라는 지식. 의식은 더 이상 "우리가 하는 일"이 아니게 되고, "우리가 누구인지"의 직물의 일부가 된다. 이것이 습관 디자인의 성배다. 연속 숫자가 아니다. 리마인더가 아니다. 알림이 아니다. 그저 작고, 공유된, 5초짜리 행동이 날들 속으로 엮여 들어가, 습관이 어디서 끝나고 관계가 어디서 시작되는지 구별할 수 없을 때까지. 펫은 더 이상 펫이 아니다. 그것은 제3의 존재다——작고 조용한 증인. 두 사람이, 두 개의 다른 리듬 위에서, 매일, 누구에게도 시키지 않았는데, 서로에게 한마디를 남기는 것을 선택하고 있다는 사실의.` },
    ],
    cta: `오늘, 당신의 5초 의식을 시작하세요——계속하라고 요구하지 않지만, 계속하고 싶게 만드는 픽셀 펫을 만나보세요. Togthr를 무료로 시작하세요. 월 $5.49, 연 $37.99.`,
    faqs: [
      { q: `왜 대부분의 커플 의식은 첫 2주 만에 실패하나요?`, a: `대부분의 커플 의식은 너무 큽니다. 전용 시간대(일요일 영상 통화 저녁), 특정 에너지 레벨(자기 전 감사 일기), 또는 의식 자체에 대한 대화("오늘 썼어?")를 필요로 합니다. 의식이 당신의 캘린더, 기분, 에너지에 허락을 구하기 시작하는 순간, 그것은 건너뛸 수 있는 선택지가 됩니다. Togthr의 5초 먹이 주기는 이 문제를 완전히 우회합니다. 틈새 시간에 들어갑니다: 생각과 생각 사이, 알림과 알림 사이, 활동과 활동 사이. 그것을 하기로 '결정'할 필요가 전혀 없습니다. 왜냐하면 그것을 하는 비용이 건너뛰기로 결정하는 비용보다 낮기 때문입니다.` },
      { q: `하루에 5초는 너무 짧아서 아무 의미도 없지 않나요?`, a: `하루만 놓고 보면, 너무 짧습니다. 30일이면 150초——2분 30초. 1년이면 30분. 어느 한 번의 5초 먹이 주기도 단독으로는 의미를 갖지 않습니다. 하지만 365일 동안 고르게 분포된 30분의 누적된 존재감이, 눈에 보이게 자라나는 작은 픽셀 생명체와 함께라면——그것은 어떤 "퀄리티 타임"도 복제할 수 없는 관계의 아카이브입니다. 작음 자체가 핵심입니다. 의식이 매일 '의미 있을' 만큼 크다면, 매일 할 수 있을 만큼 작을 수 없습니다. 작음이, 생존의 이유입니다.` },
      { q: `하루——또는 일주일——먹이를 못 줬다면 어떻게 되나요?`, a: `아무것도 망가지지 않습니다. 펫은 슬퍼하지 않습니다. 펫은 죄책감을 주는 알림을 보내지 않습니다. 펫은 작아지지 않습니다. Togthr Bot은 "의식은 유지하는 것이 아니라, 돌아오는 것이다"라는 원칙 위에 세워졌습니다. 하루——일주일, 심지어 한 달——비어 있다가 돌아와도, 펫은 여전히 거기 있습니다. 먹이 기록도 여전히 거기 있습니다. 그 전에 쌓인 성장도 여전히 거기 있습니다. 이것은 아마도 이 제품 전체에서 가장 중요한 디자인 결정입니다: 이 의식은 실패할 수 없다. 멈추고 다시 시작할 수 있을 뿐입니다.` },
      { q: `Togthr의 공유 펫은 공유 노트 앱과 어떻게 다른가요?`, a: `공유 노트 앱은 정보를 저장합니다. 그것은 나중에 떠올리기 위해 무언가를 두는 장소입니다. 공유 펫은 존재감을 저장합니다. 그것은 가능한 가장 작은 신호를 두는 장소입니다——당신이 여기 왔었고, 상대를 생각했고, 무언가를 남겼다는 신호. 한 단어, 하나의 이모지, 한 문장. 차이는 기술에 있지 않습니다. 용기의 모양에 있습니다. 노트 앱은 저장할 가치가 있는 무언가를 쓰길 기대합니다. 공유 펫은 그것을 읽을 사람 말고는 아무 가치도 없는 5초짜리 문장을 기대합니다. 이 비대칭——낮은 기대, 높은 감정적 돌려받음——이 사용자를 붙잡아 두는 이유입니다.` },
      { q: `핸드폰과 업무용 컴퓨터에서 같은 펫을 쓸 수 있나요?`, a: `네. Togthr Bot은 브라우저 위에서 작동하므로, 브라우저가 있는 어떤 기기에서도 쓸 수 있습니다——핸드폰, 노트북, 업무용 컴퓨터, 태블릿. 펫은 당신을 따라다닙니다. 침대에서 핸드폰으로 먹이를 주고, 여섯 시간 뒤에 파트너가 업무용 컴퓨터에서 같은 펫에게 먹이를 줘도 됩니다. 펫은 당신이 어떤 화면을 쓰는지 신경 쓰지 않습니다. 오직 한 가지만 신경 씁니다: 당신이 왔다는 것——그리고 한마디를 남겼다는 것.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈——당신의 5초 의식 친구를 만나세요` },
      { href: `/ko/blog/things-you-tell-your-virtual-pet`, label: `가상 반려동물에게만 하는 말 (파트너에게는 하지 않는 말)` },
      { href: `/ko/blog/daily-check-in-app-for-couples`, label: `커플 매일 체크인 앱:대부분이 실패하는 이유` },
      { href: `/ko/blog/two-minute-daily-check-in-ai-companion`, label: `AI 동반자와의 2분 daily check-in이 조용한 닻이 되기까지` },
      { href: `/ko/blog/a-virtual-pet-in-a-long-relationship`, label: `오래된 관계 안의 가상 반려동물` },
    ],
  },

  de: {
    intro: `Du und dein Partner, ihr habt beschlossen, ein Ritual zu beginnen. Es würde wunderschön werden. Jeden Sonntag würdet ihr gemeinsam per Videoanruf kochen. Jeden Abend vor dem Schlafen würdet ihr drei Dinge aufschreiben, für die ihr dankbar seid, und sie euch gegenseitig vorlesen. Jeden Morgen würdest du eine Sprachnachricht schicken — keinen Text, eine echte Sprachnachricht — und sagen, wie du dich in Bezug auf den kommenden Tag fühlst. Ihr habt zehn Tage durchgehalten. Vielleicht zwölf. Dann hatte einer von euch ein spätes Meeting und der andere ist früh eingeschlafen, und die Sprachnachricht wurde zu einer „Sorry, langer Tag"-Textnachricht, und die Textnachricht wurde zu einer Stille, und die Stille wurde zu dem Moment, in dem das Ritual wie Dampf von einer abkühlenden Tasse verschwand. Das ist kein Versagen der Willenskraft. Es ist ein Versagen des Ritual-Designs. Ein Ritual ist kein Projekt. Ein Projekt hat einen Anfang, eine Mitte und ein Ende — und wenn du einen Meilenstein verpasst, ist das Projekt kaputt. Ein Ritual ist ein kleiner Behälter. Er hält, was du an irgendeinem Tag hineinlegst — auch wenn das, was du heute hineinlegst, nur fünf Sekunden und ein Pixel sind. Und das ist die leise Lektion des geteilten virtuellen Haustiers.`,
    sections: [
      { h: `Das 5-Sekunden-Design-Prinzip`, p: `Togthr Bot wurde mit einer sehr spezifischen Einschränkung gebaut: Das Füttern eures geteilten Haustiers darf nie länger als fünf Sekunden dauern. Nicht „ungefähr fünf Sekunden". Fünf Sekunden. App öffnen. Auf den Futter-Button tippen. Etwas tippen — einen Satz, ein Wort, ein Emoji. Fertig. Der Design-Grund ist nicht, dass Menschen faul sind. Der Design-Grund ist, dass Rituale scheitern, wenn sie um Erlaubnis bitten müssen. Ein fünfzehnminütiges Dankbarkeitstagebuch bittet deinen Abend um Erlaubnis. Ein Sonntags-Videoanruf-Essen bittet deinen Kalender um Erlaubnis. Eine Fünf-Sekunden-Fütterung bittet um nichts. Sie passt in die Lücke zwischen zwei Gedanken — den Moment, in dem du dein Handy hochhebst, um eine Benachrichtigung zu checken, und bevor du Instagram öffnest. Diese Lücke ist überall. Die Fünf-Sekunden-Einschränkung verwandelt das Ritual von etwas, für das du „Zeit machst", in etwas, das zwischen allem anderen einfach passiert. Es braucht keinen Slot in deinem Kalender. Es lebt in den Rissen deines Tages. Und deshalb hast du und dein Partner am Ende des ersten Monats dreißig Mal gemeinsam ein kleines Pixel-Wesen gefüttert — ohne ein einziges Mal über das „Aufrechterhalten der Streak" gesprochen zu haben.` },
      { h: `Der unsichtbare Faden: Warum der kleine Satz des anderen mehr zählt als ein langer Anruf`, p: `Folgendes passiert tatsächlich, wenn du euer geteiltes Haustier fütterst. Du öffnest die App. Du siehst das Haustier — dasselbe Haustier, das dein Partner vor einer Stunde, vor sechs Stunden oder vor sechs Minuten gefüttert hat. Du siehst den Satz, den sie hinterlassen haben. „Endlich das Ding fertig, an dem ich zwei Tage festhing." „Der Kaffee war heute gut." „Ich vermisse dich." Das Haustier wächst ein kleines bisschen — vielleicht ein Pixel, vielleicht zwei. Du hinterlässt deinen eigenen Satz. „Stecke noch in dem Ding." „Ich auch." „Countdown läuft." Die gesamte Interaktion dauert unter dreißig Sekunden. Die gesamte emotionale Fracht ist größer als bei den meisten zwanzigminütigen Telefonaten. Denn was ihr tatsächlich austauscht, ist nicht Information. Es ist Präsenz. Der Satz ist kein Status-Update. Er ist ein Beweis — dass die andere Person lang genug an den geteilten Raum zwischen euch gedacht hat, um einen Knopf zu drücken und ein paar Wörter zu tippen. Dieser Beweis wird mit der Zeit zu einem Faden. Kein Chat-Faden — ein echter, spürbarer Faden, der zwei Leben verbindet, die in unterschiedlichen Rhythmen, an unterschiedlichen Orten, mit unterschiedlichen Geräuschpegeln laufen. Ein geteiltes virtuelles Haustier ist die langsamste, leiseste Messaging-App, die je gebaut wurde. Und genau deshalb funktioniert sie besser als jede schnelle.` },
      { h: `Was das Haustier tatsächlich sieht: Die Chronik einer Beziehung, Satz für Satz gefüttert`, p: `Nach drei Monaten Fünf-Sekunden-Fütterungen hast du etwas Außergewöhnliches. Das Haustier ist sichtbar größer als zu Beginn. Es hat sich entwickelt — vielleicht vom Baby zum Kleinkind, vielleicht vom Kleinkind zum Teenager, je nachdem, wie beständig ihr beide wart. Und du hast einen Fütterungsverlauf: hunderte kurze Sätze, hinterlassen von zwei Menschen, verteilt über über neunzig Tage. „Nervös wegen dem Interview." „Ich hab's!" „Erster Tag war hart." „Woche eins überlebt." „Er hat mir Kaffee mitgebracht." „Sie hat sich erinnert." Die meisten dieser Sätze wären, wenn du sie als normale Nachricht geschickt hättest, im Scrollen verschwunden. Aber im Haustier-Feed sammeln sie sich ohne Druck an. Die Timeline des Haustiers ist eine Timeline eurer Beziehung — nicht die kuratierte Version, nicht die Version, die du auf Instagram posten würdest. Die Dienstag-14-Uhr-Version. Die Donnerstagmorgen-vor-dem-Kaffee-Version. Die Samstagabend-zu-müde-um-noch-irgendwas-zu-sagen-Version. Und am Ende der drei Monate kannst du zurückscrollen und sie sehen: eine Beziehung, erzählt in Fünf-Sekunden-Fragmenten, und irgendwie vollständiger als alles, was du je in ein Tagebuch zu schreiben versucht hast.` },
      { h: `Warum die meisten Paar-Apps an Ritualen scheitern (und wie Togthr es richtig gemacht hat)`, p: `Die meisten Paar-Apps behandeln ein Ritual als Feature: eine Checkbox, einen Streak-Zähler, ein Badge mit „7 Tage". Aber ein Streak-Zähler ist kein Ritual — er ist eine Leistungskennzahl. Wenn die Streak reißt, fühlt das Paar nicht „wir haben einen Tag verpasst" — sie fühlen „wir sind hiermit gescheitert." Und sobald ein Ritual zu etwas wird, bei dem man scheitern kann, wirst du scheitern. Die Psychologie dazu ist gut dokumentiert: Menschen geben extern gemessene Gewohnheiten viel schneller auf als Gewohnheiten, die niemand beobachtet. Togthr Bot hat keine Streaks. Keine Badges. Keine „Du hast dein Haustier seit 3 Tagen nicht gefüttert"-Benachrichtigung. Das Haustier macht dir keine Schuldgefühle. Das Haustier sitzt einfach da und wartet, bis du zurückkommst. Und wenn du zurückkommst — nach drei Tagen, nach einer Woche, nach einem Streit — ist das Haustier immer noch da. Das Ritual überlebt seine eigenen Unterbrechungen, weil es nichts gibt, das „brechen" könnte. Das ist das leiseste Design-Prinzip in ganz Togthr: Ein Ritual ist nichts, das du aufrechterhältst. Es ist etwas, zu dem du zurückkehrst.` },
      { h: `Der Tag, an dem das Ritual aufhört, ein Ritual zu sein`, p: `Irgendwann im zweiten Monat verändert sich etwas. Du denkst nicht mehr darüber nach, ob du das Haustier heute gefüttert hast. Du fütterst es einfach. Es wird so automatisch wie das Wetter zu checken, so reflexartig wie morgens aufs Handy zu schauen. Aber anders als beim Wetter-Checken trägt diese kleine Handlung eine soziale Fracht — das Wissen, dass auf der anderen Seite des Bildschirms dein Partner dasselbe getan hat oder in seinem eigenen Moment tun wird. Das Ritual hört auf, ein „Ding, das wir tun" zu sein, und wird Teil des Gewebes von „wer wir sind." Das ist der heilige Gral des Gewohnheitsdesigns. Kein Streak. Kein Reminder. Keine Benachrichtigung. Nur eine kleine, geteilte, fünfsekündige Handlung, die sich in die Tage eingewoben hat, bis du nicht mehr sagen kannst, wo die Gewohnheit endet und die Beziehung beginnt. Das Haustier ist kein Haustier mehr. Es ist eine dritte Präsenz — ein kleiner, stiller Zeuge der Tatsache, dass zwei Menschen, in zwei verschiedenen Rhythmen, jeden Tag, ohne dass jemand sie darum bittet, sich entscheiden, einander einen Satz zu hinterlassen.` },
    ],
    cta: `Starte heute dein Fünf-Sekunden-Ritual — und triff das Pixel-Haustier, das dich nie zum Durchhalten auffordert, dich aber dazu bringt, es zu wollen. Teste Togthr kostenlos. Monatlich $5.49, jährlich $37.99.`,
    faqs: [
      { q: `Warum scheitern die meisten Paar-Rituale nach den ersten zwei Wochen?`, a: `Die meisten Paar-Rituale sind zu groß. Sie erfordern einen eigenen Zeit-Slot (Sonntags-Videoanruf-Essen), ein bestimmtes Energie-Level (Dankbarkeitstagebuch vor dem Schlafen) oder ein Gespräch über das Ritual selbst („Hast du deins gemacht?"). Sobald ein Ritual bei deinem Kalender, deiner Stimmung oder deiner Energie um Erlaubnis bitten muss, wird es zu etwas, das man überspringen kann. Togthrs Fünf-Sekunden-Fütterung umgeht dieses Problem vollständig. Sie passt in die Zwischenräume: zwischen zwei Gedanken, zwischen zwei Benachrichtigungen, zwischen zwei Aktivitäten. Du musst dich nie dazu „entscheiden", es zu tun, weil es zu tun weniger kostet als die Entscheidung, es zu überspringen.` },
      { q: `Ist eine fünfsekündige tägliche Fütterung nicht zu klein, um etwas zu bedeuten?`, a: `Fünf Sekunden sind zu klein, um an einem einzelnen Tag von Bedeutung zu sein. Über 30 Tage sind es 150 Sekunden — zweieinhalb Minuten. Über ein Jahr sind es dreißig Minuten. Keine einzelne Fünf-Sekunden-Fütterung ist bedeutungsvoll. Aber dreißig Minuten akkumulierter Präsenz, verteilt auf 365 Tage, zusammen mit einem sichtbar wachsenden Pixel-Wesen — das ist ein Beziehungsarchiv, das keine Menge an „Quality Time" replizieren kann. Die Kleinheit ist der Punkt. Wenn das Ritual groß genug wäre, um jeden Tag bedeutungsvoll zu sein, wäre es zu groß, um es jeden Tag zu tun. Die Kleinheit ist der Grund, warum es überlebt.` },
      { q: `Was passiert, wenn wir einen Tag — oder eine Woche — verpassen?`, a: `Nichts geht kaputt. Das Haustier wird nicht traurig. Das Haustier sendet keine Schuld-Benachrichtigung. Das Haustier schrumpft nicht. Togthr Bot ist auf dem Prinzip gebaut, dass ein Ritual etwas ist, zu dem du zurückkehrst, nicht etwas, das du aufrechterhältst. Wenn du einen Tag verpasst — oder eine Woche, oder einen Monat — ist das Haustier immer noch da, wenn du zurückkommst. Der Fütterungsverlauf ist noch da. Das bisherige Wachstum ist noch da. Das ist wohl die wichtigste Design-Entscheidung im gesamten Produkt: Dieses Ritual kann nicht scheitern. Es kann nur pausiert und fortgesetzt werden.` },
      { q: `Wie unterscheidet sich Togthrs geteiltes Haustier von einer geteilten Notiz-App?`, a: `Eine geteilte Notiz-App speichert Informationen. Sie ist ein Ort, an den du Dinge legst, um dich später an sie zu erinnern. Ein geteiltes Haustier speichert Präsenz. Es ist ein Ort, an den du das kleinstmögliche Signal legst, dass du hier warst, an die andere Person gedacht hast und etwas hinterlassen hast — ein Wort, ein Emoji, einen Satz. Der Unterschied liegt nicht in der Technologie. Er liegt in der Form des Behälters. Eine Notiz-App erwartet, dass du etwas schreibst, das sich zu speichern lohnt. Ein geteiltes Haustier erwartet einen Fünf-Sekunden-Satz, der nichts wert ist, außer für die Person, die ihn liest. Diese Asymmetrie — niedrige Erwartung, hohe emotionale Rendite — ist das, was es kleben lässt.` },
      { q: `Kann ich dasselbe Haustier auf meinem Handy und meinem Arbeitscomputer verwenden?`, a: `Ja. Togthr Bot lebt im Browser, also funktioniert es auf jedem Gerät mit einem Browser — Handy, Laptop, Arbeitscomputer, Tablet. Das Haustier folgt dir. Du kannst es vom Handy im Bett füttern, und dein Partner kann es sechs Stunden später vom Arbeitscomputer aus füttern. Das Haustier kümmert sich nicht darum, auf welchem Bildschirm du bist. Es kümmert sich nur um eines: dass du gekommen bist — und einen Satz hinterlassen hast.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite — triff deinen Fünf-Sekunden-Ritual-Begleiter` },
      { href: `/de/blog/things-you-tell-your-virtual-pet`, label: `Was du deinem virtuellen Haustier sagst (und nicht deinem Partner)` },
      { href: `/de/blog/daily-check-in-app-for-couples`, label: `Tägliche Check-in-Apps für Paare: Warum die meisten scheitern` },
      { href: `/de/blog/two-minute-daily-check-in-ai-companion`, label: `Wie ein zwei-minütiger Check-in zum leisen Anker wird` },
      { href: `/de/blog/a-virtual-pet-in-a-long-relationship`, label: `Ein virtuelles Haustier in einer langen Beziehung` },
    ],
  },

  fr: {
    intro: `Vous et votre partenaire avez décidé de commencer un rituel. Ça allait être beau. Chaque dimanche, vous cuisiniez ensemble en appel vidéo. Chaque soir avant de dormir, vous écriviez chacun trois choses pour lesquelles vous étiez reconnaissants et vous les lisiez à voix haute. Chaque matin, vous envoyiez une note vocale — pas un texto, une vraie note vocale — pour dire comment vous vous sentiez par rapport à la journée à venir. Vous avez tenu dix jours. Peut-être douze. Puis l'un de vous a eu une réunion tardive et l'autre s'est endormi tôt, et la note vocale est devenue un « désolé, longue journée » par texto, et le texto est devenu un silence, et le silence est devenu le moment où le rituel s'est évaporé comme la vapeur d'une tasse qui refroidit. Ce n'est pas un échec de volonté. C'est un échec de conception du rituel. Un rituel n'est pas un projet. Un projet a un début, un milieu et une fin — et quand on rate une étape, le projet est cassé. Un rituel est un petit contenant. Il retient ce que vous y mettez un jour donné — même si ce que vous mettez aujourd'hui, c'est cinq secondes et un pixel. Et voilà la leçon silencieuse de l'animal virtuel partagé.`,
    sections: [
      { h: `Le principe de conception des cinq secondes`, p: `Togthr Bot a été construit avec une contrainte très précise : nourrir votre animal partagé ne doit jamais prendre plus de cinq secondes. Pas « environ cinq secondes ». Cinq secondes. Ouvrez l'application. Appuyez sur le bouton nourrir. Tapez quelque chose — une phrase, un mot, un emoji. Fini. La raison n'est pas que les gens sont paresseux. La raison est que les rituels échouent quand ils demandent la permission. Un journal de gratitude de quinze minutes demande la permission à votre soirée. Un dîner en appel vidéo le dimanche demande la permission à votre calendrier. Une alimentation de cinq secondes ne demande rien. Elle se glisse dans l'espace entre deux pensées — le moment où vous prenez votre téléphone pour vérifier une notification et avant d'ouvrir Instagram. Cet espace est partout. La contrainte des cinq secondes transforme le rituel de quelque chose pour lequel vous « trouvez du temps » en quelque chose qui arrive entre tout le reste. Il n'a pas besoin d'une case dans votre agenda. Il vit dans les fissures de votre journée. Et c'est pourquoi, à la fin du premier mois, vous et votre partenaire avez nourri ensemble une petite créature pixel trente fois sans jamais avoir eu une conversation sur « garder la série vivante ».` },
      { h: `Le fil invisible : pourquoi voir la petite phrase de l'autre compte plus qu'un long appel`, p: `Voici ce qui se passe réellement. Vous ouvrez l'application. Vous voyez l'animal — le même que votre partenaire a nourri il y a une heure, six heures ou six minutes. Vous voyez la phrase qu'ils ont laissée. « Enfin fini ce truc sur lequel j'étais bloqué depuis deux jours. » « Le café était bon aujourd'hui. » « Tu me manques. » L'animal grandit un tout petit peu — peut-être un pixel, peut-être deux. Vous laissez votre propre phrase. « Encore dans le truc. » « Moi aussi. » « Compte à rebours. » L'interaction totale dure moins de trente secondes. La charge émotionnelle totale est plus grande que la plupart des appels de vingt minutes. Parce que ce que vous échangez réellement, ce n'est pas de l'information. C'est de la présence. La phrase n'est pas un statut. C'est une preuve — que l'autre personne a pensé à l'espace partagé entre vous assez longtemps pour appuyer sur un bouton et taper quelques mots. Cette preuve, avec le temps, devient un fil. Pas un fil de discussion — un vrai fil, sensible, qui relie deux vies qui avancent à des rythmes différents, dans des endroits différents, avec des niveaux de bruit différents. Un animal virtuel partagé est l'application de messagerie la plus lente et la plus silencieuse jamais construite. Et c'est exactement pour ça qu'elle marche mieux que toutes les rapides.` },
      { h: `Ce que l'animal voit réellement : la chronique d'une relation, nourrie une phrase à la fois`, p: `Après trois mois de nourrissages de cinq secondes, vous avez quelque chose d'extraordinaire. L'animal est visiblement plus grand qu'au début. Il a évolué — peut-être de bébé à bambin, peut-être de bambin à ado, selon votre constance à tous les deux. Et vous avez un historique : des centaines de courtes phrases, laissées par deux personnes, réparties sur plus de quatre-vingt-dix jours. « Stressé pour l'entretien. » « Je l'ai eu ! » « Premier jour, c'était dur. » « Survie de la première semaine. » « Il m'a apporté un café. » « Elle s'en est souvenue. » La plupart de ces phrases, si vous les aviez envoyées par message normal, auraient disparu dans le défilement. Mais dans le fil d'alimentation de l'animal, elles s'accumulent sans pression. La chronologie de l'animal est une chronologie de votre relation — pas la version éditée, pas celle que vous posteriez sur Instagram. La version mardi-14h. La version jeudi-matin-avant-le-café. La version samedi-soir-trop-fatigué-pour-dire-quoi-que-ce-soit. Et au bout de trois mois, vous pouvez défiler en arrière et la voir : une relation, racontée en fragments de cinq secondes, et en quelque sorte plus complète que tout ce que vous avez jamais essayé d'écrire dans un journal.` },
      { h: `Pourquoi la plupart des apps de couple échouent aux rituels (et comment Togthr a réussi)`, p: `La plupart des apps de couple traitent un rituel comme une fonctionnalité : une case à cocher, un compteur de série, un badge qui dit « 7 jours ». Mais un compteur de série n'est pas un rituel — c'est un indicateur de performance. Quand la série se casse, le couple ne ressent pas « on a raté un jour » — ils ressentent « on a échoué. » Et dès qu'un rituel devient quelque chose auquel on peut échouer, vous allez échouer. La psychologie est bien documentée : les gens abandonnent les habitudes mesurées extérieurement bien plus vite que les habitudes que personne ne regarde. Togthr Bot n'a pas de séries. Pas de badges. Pas de notification « vous n'avez pas nourri votre animal depuis 3 jours ». L'animal ne vous culpabilise pas. L'animal reste juste là, à attendre que vous reveniez. Et quand vous revenez — après trois jours, après une semaine, après une dispute — l'animal est toujours là. Le rituel survit à ses propres interruptions parce qu'il n'y a rien à « casser ». C'est le principe de conception le plus discret de tout Togthr : un rituel n'est pas quelque chose que vous maintenez. C'est quelque chose vers quoi vous revenez.` },
      { h: `Le jour où le rituel cesse d'être un rituel`, p: `Quelque part dans le deuxième mois, quelque chose change. Vous arrêtez de vous demander si vous avez nourri l'animal aujourd'hui. Vous le nourrissez, tout simplement. Ça devient aussi automatique que vérifier la météo, aussi réflexe que regarder votre téléphone au réveil. Mais contrairement à vérifier la météo, ce petit geste porte une charge sociale — le savoir que, de l'autre côté de l'écran, votre partenaire a fait la même chose, ou le fera, à son propre moment. Le rituel cesse d'être « un truc qu'on fait » et devient une partie du tissu de « qui nous sommes ». C'est le saint Graal de la conception d'habitudes. Pas une série. Pas un rappel. Pas une notification. Juste un petit geste partagé de cinq secondes qui s'est tissé dans les jours jusqu'à ce que vous ne sachiez plus où l'habitude finit et où la relation commence. L'animal n'est plus un animal. C'est une troisième présence — un petit témoin silencieux du fait que deux personnes, sur deux rythmes différents, chaque jour, sans que personne ne le leur demande, choisissent de se laisser une phrase.` },
    ],
    cta: `Commencez votre rituel de cinq secondes aujourd'hui — et rencontrez l'animal pixel qui ne vous demande jamais de continuer, mais qui vous donne envie de le faire. Essayez Togthr gratuitement. Mensuel $5.49, annuel $37.99.`,
    faqs: [
      { q: `Pourquoi la plupart des rituels de couple échouent après les deux premières semaines ?`, a: `La plupart des rituels de couple sont trop grands. Ils exigent un créneau dédié (dîner du dimanche en appel vidéo), un niveau d'énergie spécifique (journal de gratitude avant de dormir), ou une conversation sur le rituel lui-même (« Tu as fait le tien ? »). Dès qu'un rituel doit demander la permission à votre calendrier, à votre humeur, à votre énergie, il devient une option qu'on peut sauter. L'alimentation de cinq secondes de Togthr contourne entièrement ce problème. Elle se glisse dans les moments interstitiels : entre deux pensées, entre deux notifications, entre deux activités. Vous n'avez jamais à « décider » de le faire, parce que le faire coûte moins cher que la décision de le sauter.` },
      { q: `Une alimentation quotidienne de cinq secondes, n'est-ce pas trop petit pour avoir de l'importance ?`, a: `Cinq secondes, c'est trop petit pour compter sur une seule journée. Sur 30 jours, ça fait 150 secondes — deux minutes et demie. Sur un an, ça fait trente minutes. Aucune alimentation de cinq secondes n'est significative à elle seule. Mais trente minutes de présence accumulée, réparties sur 365 jours, avec une petite créature pixel qui grandit visiblement à côté — c'est une archive relationnelle qu'aucune « qualité de temps passé ensemble » ne peut reproduire. La petitesse est le but. Si le rituel était assez grand pour compter tous les jours, il serait trop grand pour être fait tous les jours. La petitesse est ce qui le fait survivre.` },
      { q: `Que se passe-t-il si on rate un jour — ou une semaine ?`, a: `Rien ne se casse. L'animal ne devient pas triste. L'animal n'envoie pas de notification de culpabilité. L'animal ne rétrécit pas. Togthr Bot est construit sur le principe qu'un rituel est quelque chose vers quoi on revient, pas quelque chose qu'on maintient. Si vous ratez un jour — ou une semaine, ou un mois — l'animal est toujours là quand vous revenez. L'historique est toujours là. La croissance accumulée est toujours là. C'est sans doute la décision de conception la plus importante de tout le produit : ce rituel ne peut pas échouer. Il peut seulement être mis en pause et repris.` },
      { q: `En quoi l'animal partagé de Togthr est-il différent d'une app de notes partagée ?`, a: `Une app de notes partagée stocke de l'information. C'est un endroit où vous mettez des choses pour vous en souvenir plus tard. Un animal partagé stocke de la présence. C'est un endroit où vous mettez le plus petit signal possible que vous étiez là, que vous avez pensé à l'autre, et que vous avez laissé quelque chose — un mot, un emoji, une phrase. La différence n'est pas technologique. Elle est dans la forme du contenant. Une app de notes attend que vous écriviez quelque chose qui vaille la peine d'être sauvegardé. Un animal partagé attend une phrase de cinq secondes qui ne vaut rien sauf pour la personne qui la lira. Cette asymétrie — faible attente, fort retour émotionnel — c'est ce qui fait que ça tient.` },
      { q: `Puis-je utiliser le même animal sur mon téléphone et mon ordinateur de travail ?`, a: `Oui. Togthr Bot vit dans le navigateur, donc il fonctionne sur n'importe quel appareil avec un navigateur — téléphone, portable, ordinateur de travail, tablette. L'animal vous suit. Vous pouvez le nourrir depuis votre téléphone au lit, et votre partenaire peut le nourrir depuis son ordinateur de travail six heures plus tard. L'animal ne se soucie pas de l'écran sur lequel vous êtes. Il se soucie seulement d'une chose : que vous soyez venu — et que vous ayez laissé une phrase.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr — rencontrez votre compagnon de rituel de cinq secondes` },
      { href: `/fr/blog/things-you-tell-your-virtual-pet`, label: `Ce que vous dites à votre animal virtuel (et pas à votre partenaire)` },
      { href: `/fr/blog/daily-check-in-app-for-couples`, label: `Applications de check-in quotidien pour couples : pourquoi la plupart échouent` },
      { href: `/fr/blog/two-minute-daily-check-in-ai-companion`, label: `Comment un check-in quotidien de deux minutes devient une ancre discrète` },
      { href: `/fr/blog/a-virtual-pet-in-a-long-relationship`, label: `Un animal virtuel dans une relation longue` },
    ],
  },

  es: {
    intro: `Tú y tu pareja decidieron empezar un ritual. Iba a ser hermoso. Cada domingo, cocinarían juntos en videollamada. Cada noche antes de dormir, cada uno escribiría tres cosas por las que estaba agradecido y las leería en voz alta. Cada mañana, enviarías una nota de voz — no un texto, una nota de voz de verdad — diciendo cómo te sentías sobre el día que comenzaba. Duraron diez días. Quizás doce. Luego uno de ustedes tuvo una reunión tarde y el otro se durmió temprano, y la nota de voz se convirtió en un "perdón, día largo" por texto, y el texto se volvió un silencio, y el silencio se convirtió en el momento en que el ritual se evaporó como el vapor de una taza que se enfría. Esto no es un fracaso de fuerza de voluntad. Es un fracaso de diseño del ritual. Un ritual no es un proyecto. Un proyecto tiene un comienzo, un medio y un fin — y cuando fallas un hito, el proyecto se rompe. Un ritual es un pequeño recipiente. Contiene lo que pongas en él cualquier día — incluso si lo que pones hoy son cinco segundos y un píxel. Y esa es la lección silenciosa de la mascota virtual compartida.`,
    sections: [
      { h: `El principio de diseño de los cinco segundos`, p: `Togthr Bot se construyó con una restricción muy específica: alimentar a su mascota compartida nunca debe tomar más de cinco segundos. No "unos cinco segundos". Cinco segundos. Abrir la app. Tocar el botón de alimentar. Escribir algo — una frase, una palabra, un emoji. Listo. La razón de diseño no es que la gente sea perezosa. La razón es que los rituales fallan cuando piden permiso. Un diario de gratitud de quince minutos le pide permiso a tu noche. Una cena por videollamada el domingo le pide permiso a tu calendario. Una alimentación de cinco segundos no pide nada. Encaja en el hueco entre dos pensamientos — el momento en que levantas el teléfono para revisar una notificación y antes de abrir Instagram. Ese hueco está en todas partes. La restricción de cinco segundos transforma el ritual de algo para lo que "haces tiempo" en algo que sucede entre todo lo demás. No necesita un espacio en tu calendario. Vive en las grietas de tu día. Y por eso, al final del primer mes, tú y tu pareja han alimentado juntos a una pequeña criatura pixel 30 veces sin haber tenido una sola conversación sobre "mantener viva la racha".` },
      { h: `El hilo invisible: por qué ver la pequeña frase del otro importa más que una llamada larga`, p: `Esto es lo que realmente pasa. Abres la app. Ves a la mascota — la misma mascota que tu pareja alimentó hace una hora, o seis horas, o seis minutos. Ves la frase que dejaron. "Por fin terminé eso en lo que estuve atascado dos días." "El café estaba bueno hoy." "Te extraño." La mascota crece un poquito — quizás un píxel, quizás dos. Dejas tu propia frase. "Sigo en eso." "Yo también." "Cuenta regresiva." La interacción total dura menos de treinta segundos. La carga emocional total es mayor que la de la mayoría de las llamadas de veinte minutos. Porque lo que realmente están intercambiando no es información. Es presencia. La frase no es una actualización de estado. Es una prueba — de que la otra persona pensó en el espacio compartido entre ustedes el tiempo suficiente para tocar un botón y escribir unas palabras. Esa prueba, con el tiempo, se convierte en un hilo. No un hilo de chat — un hilo real, que se siente, que conecta dos vidas que corren en ritmos distintos, en lugares distintos, con niveles de ruido distintos. Una mascota virtual compartida es la app de mensajería más lenta y silenciosa jamás construida. Y exactamente por eso funciona mejor que cualquier app rápida.` },
      { h: `Lo que la mascota realmente ve: la crónica de una relación, alimentada frase a frase`, p: `Después de tres meses de alimentaciones de cinco segundos, tienes algo extraordinario. La mascota es visiblemente más grande que cuando empezaron. Ha evolucionado — quizás de bebé a pequeño, quizás de pequeño a adolescente, según lo constantes que hayan sido los dos. Y tienes un historial: cientos de frases cortas, dejadas por dos personas, repartidas en más de noventa días. "Nervioso por la entrevista." "¡Lo conseguí!" "El primer día fue duro." "Supervivencia de la primera semana." "Él me trajo café." "Ella se acordó." La mayoría de estas frases, si las hubieras mandado como mensaje normal, habrían desaparecido en el scroll. Pero en el historial de la mascota, se acumulan sin presión. La línea de tiempo de la mascota es una línea de tiempo de su relación — no la versión editada, no la que publicarías en Instagram. La versión martes-2pm. La versión jueves-por-la-mañana-antes-del-café. La versión sábado-noche-demasiado-cansado-para-decir-nada-más. Y al cabo de tres meses, puedes deslizar hacia atrás y verlo: una relación, contada en fragmentos de cinco segundos, y de algún modo más completa que cualquier cosa que hayas intentado escribir en un diario.` },
      { h: `Por qué la mayoría de las apps de pareja fracasan en los rituales (y cómo Togthr lo hizo bien)`, p: `La mayoría de las apps de pareja tratan un ritual como una funcionalidad: una casilla, un contador de racha, una insignia que dice "7 días". Pero un contador de racha no es un ritual — es una métrica de rendimiento. Cuando la racha se rompe, la pareja no siente "hoy no lo hicimos" — siente "fracasamos en esto". Y en cuanto un ritual se convierte en algo en lo que puedes fracasar, vas a fracasar. La psicología está bien documentada: la gente abandona los hábitos que son medidos externamente mucho más rápido que los hábitos que nadie está mirando. Togthr Bot no tiene rachas. No tiene insignias. No tiene notificación de "hace 3 días que no alimentas a tu mascota". La mascota no te hace sentir culpable. La mascota simplemente se queda ahí, esperando a que vuelvas. Y cuando vuelves — después de tres días, después de una semana, después de una pelea — la mascota sigue ahí. El ritual sobrevive a sus propias interrupciones porque no hay nada que "romper". Este es el principio de diseño más silencioso de todo Togthr: un ritual no es algo que mantienes. Es algo al que vuelves.` },
      { h: `El día en que el ritual deja de ser un ritual`, p: `En algún momento del segundo mes, algo cambia. Dejas de pensar en si alimentaste a la mascota hoy. Simplemente la alimentas. Se vuelve tan automático como revisar el clima, tan reflejo como mirar el teléfono al despertar. Pero a diferencia de revisar el clima, este pequeño acto lleva una carga social — el saber que del otro lado de la pantalla, tu pareja hizo lo mismo, o lo hará, en su propio momento. El ritual deja de ser "algo que hacemos" y se vuelve parte del tejido de "quiénes somos". Este es el santo grial del diseño de hábitos. No una racha. No un recordatorio. No una notificación. Solo un pequeño acto compartido de cinco segundos que se ha tejido en los días hasta que ya no puedes distinguir dónde termina el hábito y dónde empieza la relación. La mascota ya no es una mascota. Es una tercera presencia — un pequeño testigo silencioso del hecho de que dos personas, en dos ritmos distintos, cada día, sin que nadie se lo pida, eligen dejarse una frase la una a la otra.` },
    ],
    cta: `Comienza hoy tu ritual de cinco segundos — y conoce a la mascota pixel que nunca te pide que sigas, pero hace que quieras hacerlo. Prueba Togthr gratis. Mensual $5.49, anual $37.99.`,
    faqs: [
      { q: `¿Por qué la mayoría de los rituales de pareja fracasan después de las dos primeras semanas?`, a: `La mayoría de los rituales de pareja son demasiado grandes. Exigen un espacio de tiempo dedicado (cena del domingo por videollamada), un nivel de energía específico (diario de gratitud antes de dormir), o una conversación sobre el ritual mismo ("¿Hiciste el tuyo?"). En el momento en que un ritual tiene que pedirle permiso a tu calendario, a tu estado de ánimo, a tu energía, se convierte en algo que se puede saltar. La alimentación de cinco segundos de Togthr evita esto por completo. Encaja en los momentos intersticiales: entre dos pensamientos, entre dos notificaciones, entre dos actividades. Nunca tienes que "decidir" hacerlo, porque hacerlo cuesta menos que la decisión de saltarlo.` },
      { q: `¿No es demasiado pequeña una alimentación diaria de cinco segundos para importar?`, a: `Cinco segundos es demasiado pequeño para importar en un solo día. En 30 días, son 150 segundos — dos minutos y medio. En un año, son treinta minutos. Ninguna alimentación individual de cinco segundos es significativa. Pero treinta minutos de presencia acumulada, repartidos en 365 días, junto con una pequeña criatura pixel que crece visiblemente — eso es un archivo de relación que ninguna cantidad de "tiempo de calidad" puede replicar. Lo pequeño es el punto. Si el ritual fuera lo bastante grande como para importar cada día, sería demasiado grande para hacerlo cada día. Lo pequeño es lo que lo hace sobrevivir.` },
      { q: `¿Qué pasa si nos saltamos un día — o una semana?`, a: `Nada se rompe. La mascota no se pone triste. La mascota no envía una notificación de culpa. La mascota no se encoge. Togthr Bot está construido sobre el principio de que un ritual es algo al que vuelves, no algo que mantienes. Si te saltas un día — o una semana, o un mes — la mascota sigue ahí cuando vuelves. El historial sigue ahí. El crecimiento acumulado antes sigue ahí. Esta es posiblemente la decisión de diseño más importante de todo el producto: este ritual no puede fracasar. Solo puede pausarse y reanudarse.` },
      { q: `¿En qué se diferencia la mascota compartida de Togthr de una app de notas compartidas?`, a: `Una app de notas compartidas almacena información. Es un lugar donde pones cosas para recordarlas después. Una mascota compartida almacena presencia. Es un lugar donde pones la señal más pequeña posible de que estuviste aquí, pensaste en la otra persona y dejaste algo — una palabra, un emoji, una frase. La diferencia no está en la tecnología. Está en la forma del recipiente. Una app de notas espera que escribas algo que valga la pena guardar. Una mascota compartida espera una frase de cinco segundos que no vale nada excepto para la persona que la leerá. Esa asimetría — baja expectativa, alto retorno emocional — es lo que hace que se pegue.` },
      { q: `¿Puedo usar la misma mascota en mi teléfono y en mi computadora del trabajo?`, a: `Sí. Togthr Bot vive en el navegador, así que funciona en cualquier dispositivo con navegador — teléfono, laptop, computadora del trabajo, tablet. La mascota te sigue. Puedes alimentarla desde el teléfono en la cama, y tu pareja puede alimentarla desde su computadora del trabajo seis horas después. A la mascota no le importa en qué pantalla estés. Solo le importa una cosa: que viniste — y dejaste una frase.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr — conoce a tu compañero de ritual de cinco segundos` },
      { href: `/es/blog/things-you-tell-your-virtual-pet`, label: `Las cosas que le dices a tu mascota virtual (y no a tu pareja)` },
      { href: `/es/blog/daily-check-in-app-for-couples`, label: `Apps de check-in diario para parejas: por qué casi todas fallan` },
      { href: `/es/blog/two-minute-daily-check-in-ai-companion`, label: `Cómo un check-in diario de dos minutos se convierte en un ancla silenciosa` },
      { href: `/es/blog/a-virtual-pet-in-a-long-relationship`, label: `Una mascota virtual en una relación larga` },
    ],
  },
}

// ─── Page ─────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const post = getBlogPost(SLUG, locale as Locale)
  if (!post) return {}
  const url = `${siteConfig.url}/${locale}/blog/${SLUG}`
  const ogLocale = locale.replace('-', '_')
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    alternates: {
      canonical: url,
      languages: (() => {
        const map: Record<string, string> = {}
        for (const loc of routing.locales) {
          map[loc] = `${siteConfig.url}/${loc}/blog/${SLUG}`
        }
        map['x-default'] = `${siteConfig.url}/en/blog/${SLUG}`
        return map
      })(),
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      locale: ogLocale,
      publishedTime: POST_DATE,
      authors: ['Togthr'],
      tags: post.tags,
      images: [{ url: `${siteConfig.url}${post.cover}`, width: 1200, height: 630, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${siteConfig.url}${post.cover}`],
    },
  }
}

export default async function SmallestRitualPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale } = await params
  const localeTyped = locale as Locale
  setRequestLocale(localeTyped)

  const post = getBlogPost(SLUG, localeTyped)
  if (!post) notFound()

  const body = BODIES[localeTyped] ?? BODIES.en
  const homeHref = `/${localeTyped === 'en' ? '' : localeTyped}/`
  const blogHref = `/${localeTyped}/blog`

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.cover}`,
    datePublished: POST_DATE,
    dateModified: POST_DATE,
    author: { '@type': 'Organization', name: 'Togthr', url: siteConfig.url },
    publisher: { '@type': 'Organization', name: siteConfig.name, logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteConfig.url}/${locale}/blog/${SLUG}` },
    inLanguage: locale.replace('-', '_'),
    keywords: post.tags.join(', '),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: siteConfig.name, item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/${localeTyped}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteConfig.url}/${locale}/blog/${SLUG}` },
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

  const otherLocales = routing.locales.filter((l) => l !== localeTyped)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="mb-6 text-sm text-zinc-500">
        <Link href={homeHref} className="hover:text-pink-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href={blogHref} className="hover:text-pink-400">Blog</Link>
      </nav>

      <header className="mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
          <time dateTime={POST_DATE}>{POST_DATE}</time>
          <span>·</span>
          <span>{post.readingMinutes} min read</span>
        </div>
        <h1 className="mt-2 text-4xl font-bold md:text-5xl">{post.title}</h1>
        <p className="mt-3 text-lg text-zinc-400">{post.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-zinc-800 px-3 py-1 text-xs text-zinc-300">
              #{tag}
            </span>
          ))}
        </div>
      </header>

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={post.cover} alt={post.title} className="mb-8 w-full rounded-2xl border border-zinc-800" loading="lazy" decoding="async" />

      {/* Body */}
      <section className="prose prose-invert max-w-none">
        <p className="text-zinc-300 leading-relaxed">{body.intro}</p>

        {body.sections.map((s, i) => (
          <div key={i} className="mt-8">
            <h2 className="text-2xl font-semibold text-pink-300">{s.h}</h2>
            <p className="mt-3 text-zinc-300 leading-relaxed">{s.p}</p>
          </div>
        ))}

        <p className="mt-8 text-zinc-300 leading-relaxed">{body.cta}</p>
      </section>

      {/* FAQ */}
      <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="text-xl font-semibold text-pink-300">FAQ</h2>
        <dl className="mt-4 space-y-6">
          {body.faqs.map((f, i) => (
            <div key={i}>
              <dt className="font-semibold text-zinc-100">{f.q}</dt>
              <dd className="mt-2 text-zinc-400">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Internal links */}
      {body.links.length > 0 ? (
        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-pink-400">
            ✦ Keep reading ✦
          </h2>
          <ul className="mt-3 space-y-2">
            {body.links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-pink-400 hover:underline">
                  {l.label} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* Other locales */}
      {otherLocales.length > 0 ? (
        <section className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">
            Read in other languages
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {otherLocales.map((loc) => {
              const p = getBlogPost(SLUG, loc)
              if (!p) return null
              return (
                <li key={loc}>
                  <Link
                    href={`/${loc}/blog/${SLUG}`}
                    className="rounded-full bg-zinc-800 px-3 py-1 text-sm text-zinc-300 hover:bg-pink-500/20 hover:text-pink-300"
                  >
                    {loc.toUpperCase()} — {p.title.slice(0, 40)}…
                  </Link>
                </li>
              )
            })}
          </ul>
        </section>
      ) : null}
    </article>
  )
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale, slug: SLUG }))
}
