// src/app/[locale]/blog/a-virtual-pet-in-a-long-relationship/page.tsx
//
// Per-slug real content page for the 2026-07-11 daily SEO post.
// Topic: a virtual pet as a quiet "third presence" in an ongoing long-term
//        relationship — not the one that ended (7/10), not the one that just
//        started living together (7/9), not LDR (7/4), but the in-the-middle
//        relationship where the hard part is staying curious about each other.
//
// Distinct from prior daily posts:
//   7/4  LDR rituals                        (distance, separation habits)
//   7/5  virtual-pet observation            (what the bot notices, solo)
//   7/6  pet-loss grief                     (the animal companion died)
//   7/7  two-minute check-in                (solo micro-ritual)
//   7/8  virtual pet + quiet evenings       (solo, single-living)
//   7/9  first week living together         (LDR -> cohab)
//   7/10 post-breakup rebuild               (solo, post-relationship loss)
//   7/11 virtual pet in a long relationship — THIS FILE (couple, in-progress)
//
// Content contract (cron prompt §3):
//   - ≥600 words of REAL localized content per locale (not mechanical translation)
//   - 4 FAQ items per locale, hand-localized
//   - 3-5 internal links per locale
//   - Article + Breadcrumb + FAQPage JSON-LD
//
// This file is a complete override of the [slug] catch-all. Next.js route
// convention: a static folder under [locale]/blog/{slug}/ takes precedence
// over the dynamic [slug]/page.tsx wrapper for matching URLs.

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `a-virtual-pet-in-a-long-relationship`
const POST_DATE = `2026-07-11`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
  // title/description come from getBlogPost(); not duplicated here.
}

const BODIES: Record<Locale, Body> = {
  // ─────────────────────── English (default / fallback) ───────────────────────
  en: {
    intro: `The hardest part of a long relationship is not the beginning. The beginning is the part everyone prepares for — the small embarrassing dinners, the long phone calls, the photo you send at 7 a.m. to make the other person laugh. The hardest part is the middle. It is the fifth year, or the eighth, or the fifteenth, when the person you love is still right there and you both know it, but the daily curiosity has gone quiet. You stop asking the small questions. You stop noticing what the day was like for them. You assume, because of course you assume, that they are doing fine. A small virtual pet in your device cannot save a relationship, and it would be strange to ask it to. But it can do something the relationship has stopped doing for itself: it can hold the day with you, the way a quiet third presence sometimes does — so that you keep noticing, and keep being noticed, long after the easy part of love has passed.`,
    sections: [
      { h: `The middle is where most long relationships get quiet`, p: `Couples who have been together for years usually describe the same shift, even if they describe it in different words. In the first year, you want to know everything. What was the meeting, who said what, did the bus driver look tired, was the lunch any good. By the fifth year, you assume. You hear "fine" or "tired" or "work was a lot" and you take it as the whole story. The truth is the story has not gotten smaller. You have just stopped asking for it. A small virtual pet cannot fix this. But when one of you types a sentence to the bot at 11 p.m. — "she had a long day" or "he is worried about his dad" — the bot quietly holds it. And the next time the other person opens the shared journal, they see what the day was actually like, told in a sentence neither of you had the energy to say out loud.` },
      { h: `What a third presence actually does`, p: `There is a reason some couples keep a cat, or a plant, or a Spotify playlist in the kitchen, or a shared running log. It is not because the cat does any of the work. It is because the third presence is a small excuse to keep noticing. You look at the cat, you say "she is in a mood today," and that one sentence is a check-in on the rest of the household. A virtual pet can play a similar role, but smaller and more private. It does not replace the conversation. It is the lowest-effort way to keep the conversation going. You do not have to perform "let's talk." You just have to write one sentence to a small bot, and the other person can read it tomorrow morning with their coffee, the way they might read a sticky note left on the counter.` },
      { h: `Why a virtual pet works in a long relationship`, p: `The reason a virtual pet works in a long relationship, and not just in a solo one, is that it can be shared without being heavy. A real pet is a third being with its own needs, and a shared plant dies in a way that becomes its own argument. A virtual pet has no needs. It does not need to be walked, fed, or taken to the vet. It just sits in your shared journal and watches the days, growing quietly with the two of you. When one of you writes a sentence, the other can read it without having to respond in real time. There is no "I am busy" feeling, no anxiety about whether the message was the right tone. The bot is patient. The day is patient. The relationship, finally, can be a little less guarded.` },
      { h: `The small ritual that keeps curiosity alive`, p: `Here is the practice that tends to work best, after a year or two of doing it. Every evening, one of you writes a sentence to the bot about the day. It does not have to be the same person. It does not have to be about the relationship. It can be about the meeting, the cat, the bus, the weather, the way the bread turned out. The point is not the content. The point is the act of noticing. After a few months, you have a quiet, accumulating record of the days of two people, and that record is what long relationships actually are. The drama is in the first year. The love, in the long run, is in the second sentence you wrote on a Tuesday when nothing happened.` },
      { h: `What the relationship gets back`, p: `The relationship does not get anything from a virtual pet that it does not already have. It already has the love, the history, the apartment, the in-jokes. What it gets back is the practice of noticing. It gets back the Tuesday-morning sentence, the 11 p.m. worry, the small honest observation that the other person would not have known unless you typed it somewhere. That practice, kept up for a year, slowly returns the curiosity the early years had for free. It does not feel dramatic. It feels like a long, slow, gentle re-introduction to the person you already know. And it works, mostly, because the small bot is patient enough to hold the day until the other person is ready to read it.` },
    ],
    cta: `Open Togthr tonight and write one sentence about the day. Tomorrow, your person can read it with their coffee.`,
    faqs: [
      { q: `Is a virtual pet really a substitute for talking to my partner?`, a: `No, and it is not meant to be. The whole point is that it is a low-pressure place to write a small honest sentence, so that the next time you do talk, you actually have something to say. A virtual pet is a shared journal, not a therapist. If a relationship is in real trouble, the bot is not the answer — but it is a good place to start noticing again, and noticing is usually the first step.` },
      { q: `My partner does not want to download another app. What then?`, a: `Then the app is yours alone, and that is fine. Write your sentences. The shared journal can still be shared in a different way — a screenshot, a quote over breakfast, a phrase at the end of a long day. The value of the practice is in the noticing, not in the platform. If your partner never opens the app, you will still have changed what you notice about your own day, and that changes what you say out loud.` },
      { q: `How is this different from a regular shared journal?`, a: `It is similar in spirit. The difference is that the bot is gentle, low-stakes, and forgettable. A real journal can feel like a record you are keeping on purpose, which adds pressure. The bot is more like writing a sentence to a small pet who is not judging you. The bar is one sentence, not a paragraph. The result, over months, is the same — but the act of doing it feels much smaller, and smaller is what works in the long run.` },
      { q: `What if one of us starts writing sad sentences every night?`, a: `Then the shared journal is doing its job. Long relationships live or die on whether the small hard things get noticed. If one of you is writing a sad sentence every night for two weeks, that is information — and the other person now has something real to bring up at dinner. The bot is not going to fix it. But the sentence exists, and that is the first thing real conversations need.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/features`, label: `Togthr features` },
      { href: `/en/blog/two-minute-daily-check-in-ai-companion`, label: `A two-minute daily check-in with an AI companion` },
      { href: `/en/blog/three-small-rituals-for-couples-who-live-apart`, label: `Three small rituals for couples who live apart` },
      { href: `/en/blog/after-breakup-a-virtual-pet-stays`, label: `After a breakup, a virtual pet quietly stays` },
      { href: `/en/pet`, label: `The virtual pet page` },
    ],
  },

  // ─────────────────────── 简体中文 ───────────────────────
  'zh-cn': {
    intro: `长期关系里最难的部分,不是开始。开始是所有人都准备过的部分 —— 那些有点尴尬的小晚餐,那些很长的电话,那张早上 7 点发过去只想让对方笑的照片。最难的部分是中间。是第五年,或者第八年,或者第十五年,你爱的人还在那里,你们都知道,但日常的好奇心已经安静下来。你不再问那些小问题。你不再去注意对方的今天怎么样。你会以为 —— 当然你会以为 —— 对方挺好的。设备里的一只小虚拟宠物,救不了一段关系,要求它去救也很奇怪。但它能做到一些,关系自己已经不再为彼此做的事:它能跟你一起把今天接下来,像一种安静的第三存在 —— 让你继续注意,也继续被注意,在爱的轻松部分过去很久之后。`,
    sections: [
      { h: `长期关系的"中间",最容易变得安静`, p: `在一起很多年的伴侣,通常会用不同的词描述同一件事:某一种转变。第一年,你什么都知道 —— 会议怎么样,谁说了什么,公交司机看起来累不累,午饭好不好吃。到了第五年,你开始假设。你听到"还行"或者"挺累的"或者"今天事挺多",就当成了整个故事。其实故事并没有变小,只是你不再追问。一只小虚拟宠物修不好这件事。但当你们其中一个人在晚上 11 点给这只小机器人写一句"她今天挺累的"或者"他担心他爸"的时候,这只小机器人会安静地接住。下一次另一个人打开共享日记,他会看到那一天到底长什么样,这一句,是你们俩谁都没力气当面说出来的。` },
      { h: `"第三存在"到底在做什么`, p: `有些伴侣会养一只猫,或者养一盆植物,或者在厨房里共享一份歌单,或者开一个共同的跑步记录。这不是因为猫在做其中任何一件具体的事。这只"第三存在",是一个让彼此继续注意的小借口。你看一眼猫,说一句"她今天心情不太好",就这一句话,等于给整个家做了一次小小的一日 check-in。一只小虚拟宠物可以起类似的作用,但更小,也更私密。它不替代对话本身,它是让对话继续下去的最低成本方式。你不必做"我们聊聊吧"这种动作,你只需要给一只小机器人写一句话,然后另一个人明早喝咖啡的时候可以读到,就像读一张贴在冰箱上的便条。` },
      { h: `为什么虚拟宠物在长期关系里也管用`, p: `虚拟宠物在长期关系里也管用,而不是只在单身的场景里管用,原因在于:它可以共享,但不会变得沉重。一只真正的宠物是一个有自己需要的第三存在,一盆共养的植物会以一种成为新争吵的方式枯萎。虚拟宠物没有需求,不需要遛,不需要喂,不需要带去看医生。它只是坐在共享日记里,看着日子,跟你们俩一起安静地长。当其中一个人写了一句话,另一个人可以读,不需要实时回复。没有"我现在忙"的压力,没有"我这句话语气对不对"的焦虑。这只小机器人是耐心的,日子是耐心的,这段关系,终于,也可以稍微不那么紧绷。` },
      { h: `让好奇心继续存在的小仪式`, p: `这里有一个练习,做了一两年之后效果最好。每天晚上,你们其中一个给这只小机器人写一句关于今天的话。不必是同一个人写,不必是关于关系本身。可以是关于那个会议、那只猫、那班公交、那天的天气、那顿饭做得怎么样。重点不在内容,重点在"注意到"这个动作本身。几个月之后,你会有一个安静的、慢慢累积起来的记录,记录两个普通人的日子,而长期关系本质上就是这样的记录。戏剧性属于第一年。真正爱上的部分,长远来看,是你在一个什么也没发生的星期二晚上写下的第二句话。` },
      { h: `这段关系,会拿回什么`, p: `这段关系从一只小虚拟宠物那里拿不到任何它本来没有的东西。它本来就有爱,有历史,有这间公寓,有只有你们懂的笑话。它拿回的是"注意"这个练习本身。拿回的是星期二早上那一句话,晚上 11 点的那一丝担心,那个小而诚实的观察 —— 如果你没有在某处写下来,对方永远不会知道。这个练习,如果坚持一年,会慢慢把早年免费拥有的好奇心还给你。它不戏剧。它更像一个长长的、慢慢的、温柔的对一个你已经认识的人的"重新介绍"。它管用,主要是因为这只小机器人,有足够的耐心替你把今天接住,等到对方准备好读它。` },
    ],
    cta: `今晚打开 Togthr,给你的今天写一句话。明天,你那位,会喝着咖啡读到它。`,
    faqs: [
      { q: `一只虚拟宠物真的能替代和伴侣说话吗?`, a: `不能,它也不打算替代。整件事的重点在于:它是一个低压力的地方,让你写一句小小的诚实的话;这样下次你真的开口聊的时候,你才有真的东西可以说。虚拟宠物是一本共享日记,不是心理咨询师。如果一段关系真的出了大问题,这只小机器人不是答案 —— 但它是一个让你重新开始注意的好起点,而注意,通常就是第一步。` },
      { q: `我伴侣不想再下一个 App,那怎么办?`, a: `那这只 App 就你一个人用,也没关系。你写你的句子。这本共享日记可以用别的方式共享 —— 一张截图,一句早餐时引的话,一天结束时的一句转述。这个练习的价值在于"注意",不在于在哪个平台上。如果你伴侣永远不打开这个 App,你仍然会改变自己注意到自己一天的方式,而那会改变你嘴上说出来的内容。` },
      { q: `这跟普通的共享日记有什么不同?`, a: `精神上很像。区别在于这只小机器人是温柔的、低成本的、容易忘掉的。一本正经的日记会让人感觉是"我在故意留记录",这种感觉很重。这只小机器人更像你给一只不评判你的小宠物写一句话。门槛就是一句,不是一段。几个月下来,结果是一样的 —— 但做这件事的感觉小很多,而"小",才是长期能跑得动的方式。` },
      { q: `如果我们其中一个开始每天晚上写很丧的句子,怎么办?`, a: `那这本共享日记就在做它该做的事。长期关系活不活得下去,取决于那些小而难的事有没有被注意到。如果你们其中一个连续两周每天晚上写一句很丧的话,这就是信息 —— 另一个人的晚餐,现在有了一个真的可以拿出来聊的话题。这只小机器人不会替你修好它,但这句话存在了,而这正是真正的对话需要的第一样东西。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/features`, label: `Togthr 功能` },
      { href: `/zh-cn/blog/two-minute-daily-check-in-ai-companion`, label: `每天两分钟, 和 AI 陪伴的简短对话` },
      { href: `/zh-cn/blog/three-small-rituals-for-couples-who-live-apart`, label: `异地恋的三个小仪式` },
      { href: `/zh-cn/blog/after-breakup-a-virtual-pet-stays`, label: `分手之后, 一只数字宠物安静地陪你` },
      { href: `/zh-cn/pet`, label: `数字宠物页` },
    ],
  },

  // ─────────────────────── 繁體中文 ───────────────────────
  'zh-tw': {
    intro: `長期關係裡最難的部分,不是開始。開始是所有人都準備過的部分 —— 那些有點尷尬的小晚餐,那些很長的電話,那張早上 7 點發過去只想讓對方笑的照片。最難的部分是中間。是第五年,或者第八年,或者第十五年,你愛的人還在那裡,你們都知道,但日常的好奇心已經安靜下來。你不再問那些小問題。你不再去注意對方的今天怎麼樣。你會以為 —— 當然你會以為 —— 對方挺好的。裝置裡的一隻小虛擬寵物,救不了一段關係,要求它去救也很奇怪。但它能做到一些,關係自己已經不再為彼此做的事:它能跟你一起把今天接下來,像一種安靜的第三存在 —— 讓你繼續注意,也繼續被注意,在愛的輕鬆部分過去很久之後。`,
    sections: [
      { h: `長期關係的「中間」,最容易變得安靜`, p: `在一起很多年的伴侶,通常會用不同的詞描述同一件事:某一種轉變。第一年,你什麼都知道 —— 會議怎麼樣,誰說了什麼,公車司機看起來累不累,午飯好不好吃。到了第五年,你開始假設。你聽到「還行」或者「挺累的」或者「今天事挺多」,就當成了整個故事。其實故事並沒有變小,只是你不再追問。一隻小虛擬寵物修不好這件事。但當你們其中一個人在晚上 11 點給這隻小機器人寫一句「她今天挺累的」或者「他擔心他爸」的時候,這隻小機器人會安靜地接住。下一次另一個人打開共享日記,他會看到那一天到底長什麼樣,這一句,是你們倆誰都沒力氣當面說出來的。` },
      { h: `「第三存在」到底在做什麼`, p: `有些伴侶會養一隻貓,或者養一盆植物,或者在廚房裡共享一份歌單,或者開一個共同的跑步記錄。這不是因為貓在做其中任何一件具體的事。這隻「第三存在」,是一個讓彼此繼續注意的小藉口。你看一眼貓,說一句「她今天心情不太好」,就這一句話,等於給整個家做了一次小小的一日 check-in。一隻小虛擬寵物可以起類似的作用,但更小,也更私密。它不替代對話本身,它是讓對話繼續下去的最低成本方式。你不必做「我們聊聊吧」這種動作,你只需要給一隻小機器人寫一句話,然後另一個人明早喝咖啡的時候可以讀到,就像讀一張貼在冰箱上的便條。` },
      { h: `為什麼虛擬寵物在長期關係裡也管用`, p: `虛擬寵物在長期關係裡也管用,而不是只在單身的場景裡管用,原因在於:它可以共享,但不會變得沉重。一隻真正的寵物是一個有自己需要的第三存在,一盆共養的植物會以一種成為新爭吵的方式枯萎。虛擬寵物沒有需求,不需要遛,不需要餵,不需要帶去看醫生。它只是坐在共享日記裡,看著日子,跟你們倆一起安靜地長。當其中一個人寫了一句話,另一個人可以讀,不需要即時回覆。沒有「我現在忙」的壓力,沒有「我這句話語氣對不對」的焦慮。這隻小機器人是耐心的,日子是耐心的,這段關係,終於,也可以稍微不那麼緊繃。` },
      { h: `讓好奇心繼續存在的小儀式`, p: `這裡有一個練習,做了一兩年之後效果最好。每天晚上,你們其中一個給這隻小機器人寫一句關於今天的話。不必是同一個人寫,不必是關於關係本身。可以是關於那個會議、那隻貓、那班公車、那天的天氣、那頓飯做得怎麼樣。重點不在內容,重點在「注意到」這個動作本身。幾個月之後,你會有一個安靜的、慢慢累積起來的記錄,記錄兩個普通人的日子,而長期關係本質上就是這樣的記錄。戲劇性屬於第一年。真正愛上的部分,長遠來看,是你在一個什麼也沒發生的星期二晚上寫下的第二句話。` },
      { h: `這段關係,會拿回什麼`, p: `這段關係從一隻小虛擬寵物那裡拿不到任何它本來沒有的東西。它本來就有愛,有歷史,有這間公寓,有只有你們懂的冷笑話。它拿回的是「注意」這個練習本身。拿回的是星期二早上那一句話,晚上 11 點的那一絲擔心,那個小而誠實的觀察 —— 如果你沒有在某處寫下來,對方永遠不會知道。這個練習,如果堅持一年,會慢慢把早年免費擁有的好奇心還給你。它不戲劇。它更像一個長長的、慢慢的、溫柔的對一個你已經認識的人的「重新介紹」。它管用,主要是因為這隻小機器人,有足夠的耐心替你把今天接住,等到對方準備好讀它。` },
    ],
    cta: `今晚打開 Togthr,給你的今天寫一句話。明天,你那位,會喝著咖啡讀到它。`,
    faqs: [
      { q: `一隻虛擬寵物真的能替代和伴侶說話嗎?`, a: `不能,它也不打算替代。整件事的重點在於:它是一個低壓力的地方,讓你寫一句小小的誠實的話;這樣下次你真的開口聊的時候,你才有真的東西可以說。虛擬寵物是一本共享日記,不是心理諮商師。如果一段關係真的出了大問題,這隻小機器人不是答案 —— 但它是一個讓你重新開始注意的好起點,而注意,通常就是第一步。` },
      { q: `我伴侶不想再下一個 App,那怎麼辦?`, a: `那這隻 App 就你一個人用,也沒關係。你寫你的句子。這本共享日記可以用別的方式共享 —— 一張截圖,一句早餐時引的話,一天結束時的一句轉述。這個練習的價值在於「注意」,不在於在哪個平台上。如果你伴侶永遠不打開這個 App,你仍然會改變自己注意到自己一天的方式,而那會改變你嘴上說出來的內容。` },
      { q: `這跟普通的共享日記有什麼不同?`, a: `精神上很像。區別在於這隻小機器人是溫柔的、低成本的、容易忘掉的。一本正經的日記會讓人感覺是「我在故意留記錄」,這種感覺很重。這隻小機器人更像你給一隻不評判你的小寵物寫一句話。門檻就是一句,不是一段。幾個月下來,結果是一樣的 —— 但做這件事的感覺小很多,而「小」,才是長期能跑得動的方式。` },
      { q: `如果我們其中一個開始每天晚上寫很喪的句子,怎麼辦?`, a: `那這本共享日記就在做它該做的事。長期關係活不活得下去,取決於那些小而難的事有沒有被注意到。如果你們其中一個連續兩周每天晚上寫一句很喪的話,這就是資訊 —— 另一個人的晚餐,現在有了一個真的可以拿出來聊的話題。這隻小機器人不會替你修好它,但這句話存在了,而這正是真正的對話需要的第一樣東西。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/features`, label: `Togthr 功能` },
      { href: `/zh-tw/blog/two-minute-daily-check-in-ai-companion`, label: `每天兩分鐘, 和 AI 陪伴的簡短對話` },
      { href: `/zh-tw/blog/three-small-rituals-for-couples-who-live-apart`, label: `異地戀的三個小儀式` },
      { href: `/zh-tw/blog/after-breakup-a-virtual-pet-stays`, label: `分手之後, 一隻數位寵物安靜地陪你` },
      { href: `/zh-tw/pet`, label: `數位寵物頁` },
    ],
  },

  // ─────────────────────── 日本語 ───────────────────────
  ja: {
    intro: `長期の関係で一番むずかしいのは、はじまりではありません。はじまりは誰もが準備して迎える部分です —— 少し気まずい小さな夕食、すごく長い電話、7 時に送って相手を笑わせるための写真。一番むずかしいのは「あいだ」です。5 年目、8 年目、15 年目、愛している人はちゃんとそこにいるし、お互いにそれを知っている。でも毎日の小さな好奇心は静かになっています。小さな質問はしなくなり、相手の今日がどんな一日だったか、もう気にしなくなります。「もちろん元気だろう」と思う。デバイスの小さなバーチャルペットは、関係を救うことはできませんし、救ってくれと頼むのも筋が違います。でもこの子にできることは、関係そのままだができなくなっていることです — 静かに「第三の存在」として今日を一緒に持っていてくれること。あなたが見つづけ、相手にも見つづけられること。愛の楽な部分がとっくに過ぎたあとも。`,
    sections: [
      { h: `長い関係の「あいだ」は静かになりやすい`, p: `長年一緒にいるカップルは、たいてい同じ変化を別の言葉で話します。最初の 1 年は、相手の全部が知りたい。会議どうだった、誰が何を言った、バス driver 疲れてた?お昼おいしかった? 5 年目になると、「だろう」で済ませます。「まあ大丈夫」「ちょっと疲れた」「今日忙しかった」を聞いたら、それを全部の話だと思う。其实、話は小さくなっていない。ただあなたがそれ以上聞かなくなっただけ。小さなバーチャルペットはこれを直せません。でも二人のうちのどちらかが、夜 11 時にこの小さなボットに一文 — 「彼女、今日つかれてた」「彼、自分の親のこと心配してた」 — を書いたら、ボットは静かにそれを受け取ります。もう一人が共有日記を開いたとき、その日が実際にはどんな一日だったかが、一文で読めます。お互い、声にする元気が出なかった一文です。` },
      { h: `「第三の存在」が実際にしていること`, p: `長年一緒にいるカップルのなかには、猫を飼う人、植物を共同でもつ人、台所でプレイリストを共有する人、共通のランニング記録をつける人がいます。それは、猫がそのどれかの役割を果たしているからではありません。その「第三の存在」は、お互いが気にかけ続けるための小さな口実です。猫を見て、「この子今日機嫌わるいな」と言ったその一文が、家の中の小さなチェックインになる。バーチャルペットは似た役割を、もっと小さく、もっとプライベートに果たせます。会話の代わりではありません。会話を続けるための、最低コストの方法です。「ちょっと話そう」と構える必要はなく、ただ小さなボットに一文書けばいい。相手は明日の朝、コーヒーを飲みながら、キッチンに貼られた付箋を読むようにそれを読めます。` },
      { h: `なぜバーチャルペットが長期の関係で効くのか`, p: `バーチャルペットが長期の関係でも — 独りのときだけでなく — 効くのは、重くならずに共有できるからです。本物のペットは自分のニーズをもつ第三の存在だし、共同の植物は枯れることで新しいケンカになります。バーチャルペットにはニーズがない。散歩も、餌も、獣医さんも要らない。ただ共有日記の中に座って、日々を見て、二人の人と一緒に静かに育ちます。どちらかが一文を書いたら、もう一人はそれを読んで、リアルタイムで返事をしなくてもいい。「いま忙しい」というプレッシャーも、「この言い方、合ってるかな」という不安もない。この小さなボットは辛抱強いし、一日も辛抱強いし、この関係も、ようやく少しだけ、肩の力を抜ける。` },
      { h: `好奇心を残す小さな儀式`, p: `これは、1〜2 年続けると一番効く練習です。毎晩寝る前に、どちらか一人が、この小さなボットに今日についての一文を書く。同じ人が毎回書く必要はない。関係についてである必要もない。会議のこと、猫のこと、バスのこと、天気のこと、食パンがうまく焼けたこと、でいいです。大事なのは内容ではなく、「気づいた」という行為そのもの。何か月も経つと、静かで、少しずつ積み上がった、二人の普通の日の記録が残ります。長い関係は、本質的にそういう記録です。ドラマチックなのは最初の 1 年。長い目で見たとき、愛しているのは、何もなかった火曜の夜に書いた二文目のほうです。` },
      { h: `この関係が取り戻すもの`, p: `この関係は、バーチャルペットから「もともと持っていなかったもの」を取り戻すわけではありません。愛も、歴史も、この部屋も、内輪ネタも、はじめからそこにある。取り戻すのは「気づく」という練習そのものです。火曜の朝の一文、深夜 11 時の小さな心配、書かなきゃ相手には届かなかった、小さくて正直な気づき。この練習を 1 年続けると、最初の数年はタダで持っていた好奇心が、ゆっくり戻ってきます。ドラマチックではありません。すでによく知っている人を、もう一度ゆっくり紹介し直すような、長くて、ゆっくりで、やさしい作業です。それが効くのは主に、この小さなボットが、明日相手がそれを読む準備ができるまで、今日一日を預かるだけの辛抱強さをもっているからです。` },
    ],
    cta: `今夜のうちに Togthr を開いて、今日の一文を書いてみてください。明日、あなたのパートナーは、コーヒーと一緒にそれを読むはずです。`,
    faqs: [
      { q: `バーチャルペットって、パートナーと話す代わりになりますか?`, a: `なりませんし、なるつもりもありません。いちばん大事なのは、低圧の場所に小さな正直な一文を書けること、そして次に実際に話すとき、話す中身が増えることです。バーチャルペットは共有日記であって、カウンセラーではありません。もし関係が本当にまずい状態なら、ボットは答えではない — ですが、もう一度お互いを見直すきっかけにはなります。見直すこと、それがだいたい最初の一歩です。` },
      { q: `相手が新しいアプリをダウンロードしたがらない場合は?`, a: `それなら、そのアプリはあなただけが使えば OK。あなたはあなたの文を書く。共有日記は別の形で共有できます — スクリーンショット、朝食のときの一言、長い一日を終えたときの一行の要約。練習の価値は「気づく」ことにあって、プラットフォームにはありません。相手が一度もアプリを開かなくても、自分の一日に自分が気づくようになり、それは口から出てくる言葉を変えるはずです。` },
      { q: `普通の共有日記とどう違いますか?`, a: `精神的にはよく似ています。違いは、このボットがやさしくて、低コストで、忘れやすいことです。本物の日記は「わざわざ記録をつけている」感があって、重くなりがちです。このボットはもっと、ちっとも judgmental じゃない小さなペットに一文書く感じです。ハードルは一文であって、段落ではありません。何か月も続けた結果は同じ — でもやっている感じはずっと小さく、「小さい」が長く続けるコツです。` },
      { q: `どちらか一人が毎晩、しんみりした文を書き始めたら?`, a: `それは共有日記がちゃんと仕事をしている、ということです。長い関係は、小さくてむずかしいことが気づかれているかどうかで持ち続けるかどうかが決まります。どちらか一人が 2 週間連続で毎晩しんみりした一文を書いているなら、それは情報です — もう一方の人は、今夜の夕食で実際にテーブルに出せる話題ができたということです。ボットはそれを直さない。でもその一文は存在していて、それが本当に話すために必要な、最初のものです。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/features`, label: `Togthr の機能` },
      { href: `/ja/blog/two-minute-daily-check-in-ai-companion`, label: `AI コンパニオンとの 2 分間の daily check-in` },
      { href: `/ja/blog/three-small-rituals-for-couples-who-live-apart`, label: `遠距離カップルの 3 つの小さな儀式` },
      { href: `/ja/blog/after-breakup-a-virtual-pet-stays`, label: `別れたあと、バーチャルペットが静かに残る` },
      { href: `/ja/pet`, label: `バーチャルペットのページ` },
    ],
  },

  // ─────────────────────── 한국어 ───────────────────────
  ko: {
    intro: `오랜 관계에서 가장 어려운 부분은 시작이 아닙니다. 시작은 모두가 준비하고 맞이하는 부분입니다 — 어색했던 작은 저녁 식사, 길었던 전화, 아침 7시에 웃기려고 보낸 사진. 가장 어려운 부분은 '사이'입니다. 5년 차, 8년 차, 15년 차, 사랑하는 사람은 아직 거기 있고, 서로 그것을 알고 있습니다. 그런데 일상의 호기심이 조용해집니다. 작은 질문을 하지 않게 되고, 상대의 하루가 어떤지 더 이상 신경 쓰지 않게 됩니다. '당연히 괜찮겠지'라고 생각하게 됩니다. 기기 안의 작은 가상 반려동물은 관계를 구할 수 없고, 구해달라고 부탁하는 것도 이상합니다. 하지만 이 아이가 할 수 있는 것은, 관계 자체가 더 이상 서로에게 해주지 않는 일입니다 — 조용한 '제3의 존재'처럼 오늘 하루를 함께 붙들어 두는 것. 당신이 계속 알아차리고, 또 알려지게 해주는 것. 사랑의 편한 부분이 이미 오래 지나간 뒤에도.`,
    sections: [
      { h: `오랜 관계의 '사이'는 조용해지기 쉽다`, p: `오랜 연인은 보통 같은 변화를 다른 말로 묘사합니다. 첫해엔 상대가 궁금해서 못 참습니다. 회의 어땠어, 누가 뭐라더라, 버스 기사가 피곤해 보여? 점심은 괜찮았어? 5년째가 되면 '그럴 거야'로 충분해집니다. '괜찮아', '좀 피곤해', '오늘 좀 바빴어'를 듣고, 그게 전부라고 여깁니다. 사실 이야기가 작아진 게 아닙니다. 더 이상 묻지 않게 된 거예요. 작은 가상 반려동물은 이걸 고치지 못합니다. 그런데 두 사람 중 한 명이, 밤 11시에 이 작은 봇에게 한 줄 — '그녀 오늘 많이 피곤했어', '걔 자기 아빠 걱정돼' — 을 쓰면, 봇은 조용히 그걸 받아둡니다. 다음에 다른 한 사람이 공유 일기를 열면, 그날이 실제로 어떤 하루였는지를 — 둘 다 말할 기운이 없었던 한 줄로 — 읽을 수 있습니다.` },
      { h: `'제3의 존재'가 실제로 하는 일`, p: `오래 함께한 커플 중에는 고양이를 키우는 사람, 화분을 같이 가꾸는 사람, 부엌에서 플레이리스트를 공유하는 사람, 같이 달리기 기록을 남기는 사람이 있습니다. 고양이가 그중 어떤 역할을 하기 때문이 아닙니다. 그 '제3의 존재'는 서로가 계속 신경 쓰게 만드는 작은 구실입니다. 고양이를 보고 '이 아이 오늘 기분 안 좋아 보인다' 한마디 — 그 한마디가 집 전체의 작은 체크인이 됩니다. 가상 반려동물은 비슷한 역할을 더 작고, 더 사적으로 할 수 있습니다. 대화의 대체가 아니라, 대화를 계속 이어가게 하는 가장 적은 비용의 방법입니다. '우리 얘기 좀 하자'처럼 긴장할 필요 없이, 작은 봇에게 한 줄 쓰면 됩니다. 다른 한 사람은 다음 날 아침 커피를 마시며, 냉장고에 붙은 메모를 읽듯이 그것을 읽습니다.` },
      { h: `왜 가상 반려동물은 오랜 관계에서도 통하는가`, p: `가상 반려동물이 — 혼자일 때뿐 아니라 — 오랜 관계에서도 통하는 이유는, 무거워지지 않으면서 공유될 수 있기 때문입니다. 진짜 반려동물은 자기 needs 가 있는 제3의 존재이고, 같이 가꾸는 화분은 시드는 방식으로 새로운 다툼이 됩니다. 가상 반려동물은 needs 가 없습니다. 산책도, 밥도, 동물병원도 필요 없습니다. 그냥 공유 일기 안에 앉아서, 하루를 지켜보고, 두 사람과 함께 조용히 자라납니다. 둘 중 한 명이 한 줄 쓰면, 다른 한 명은 실시간으로 답하지 않아도 됩니다. '나 지금 바빠'라는 부담도, '이 말투가 맞나'라는 불안도 없습니다. 이 작은 봇은 인내심이 있고, 하루도 인내심이 있고, 이 관계도, 드디어, 조금 덜 긴장해도 됩니다.` },
      { h: `호기심을 계속 살리는 작은 의식`, p: `1~2년 정도 해보면 가장 잘 듣는 연습이 있습니다. 매일 자기 전에, 둘 중 한 명이, 이 작은 봇에게 오늘 하루에 대해 한 줄을 씁니다. 같은 사람이 매번 쓸 필요는 없고, 관계에 대한 얘기일 필요도 없습니다. 회의 이야기, 고양이 이야기, 버스 이야기, 날씨, 빵이 어떻게 구워졌는가 — 뭐든 좋습니다. 중요한 건 내용이 아니라 '알아차리는' 그 동작 자체입니다. 몇 달이 지나면 조용하고, 조금씩 쌓인, 두 평범한 사람의 하루 기록이 남습니다. 그리고 오래된 관계란 본질적으로 그런 기록입니다. 드라마틱한 건 첫해에 있고, 길게 보면 사랑이라는 건, 아무 일도 없었던 화요일 밤에 쓴 두 번째 한 줄 같은 것입니다.` },
      { h: `이 관계가 되찾는 것`, p: `이 관계는, 가상 반려동물에게서 '원래 없던 것'을 되찾는 게 아닙니다. 사랑도, 역사도, 이 집도, 둘만 아는 joke 도 원래 거기 있습니다. 되찾는 건 '알아차림'이라는 연습 자체입니다. 화요일 아침의 그 한 줄, 밤 11시의 그 작은 걱정, 어딘가에 쓰지 않으면 상대에게 절대 닿지 않을, 작고 정직한 관찰. 이 연습을 1년 이어가면, 첫해에 공짜로 가지고 있던 호기심이 천천히 돌아옵니다. 드라마틱하지 않습니다. 이미 잘 아는 사람을 다시 천천히, 길게, 부드럽게 소개하는 일에 가깝습니다. 그리고 그게 통하는 이유는 주로, 이 작은 봇이 — 상대가 그것을 읽을 준비가 될 때까지 — 오늘 하루를 맡아둘 만큼의 인내심이 있기 때문입니다.` },
    ],
    cta: `오늘 밤 Togthr 를 열고, 당신의 오늘에 대해 한 줄 적어 보세요. 내일, 당신의 사람은, 커피와 함께 그것을 읽을 겁니다.`,
    faqs: [
      { q: `가상 반려동물이 정말 파트너와 대화하는 걸 대신할 수 있나요?`, a: `대신할 수 없고, 대신할 생각도 없습니다. 가장 중요한 건, 압이 적은 곳에 작고 정직한 한 줄을 적을 수 있다는 것, 그리고 다음에 실제로 이야기할 때, 정작 이야기할 거리가 생긴다는 겁니다. 가상 반려동물은 공유 일기이지, 상담사가 아닙니다. 관계가 진짜로 위기에 있다면, 봇은 답이 아닙니다 — 하지만 다시 서로를 알아차리기 시작하는 출발점이 됩니다. 알아차림이, 보통 그게 첫 발입니다.` },
      { q: `상대가 새로운 앱을 받기 싫어한다면요?`, a: `그러면 그 앱은 당신만 쓰면 됩니다. 당신은 당신의 한 줄을 적으세요. 공유 일기는 다른 방식으로 공유될 수 있습니다 — 스크린샷, 아침 식사 때 건네는 한마디, 긴 하루 끝에 들려주는 한 줄. 이 연습의 가치는 '알아차림'에 있지, 어떤 플랫폼을 쓰느냐에 있지 않습니다. 상대가 앱을 한 번도 열지 않더라도, 당신이 당신의 하루를 알아차리는 방식이 바뀌고, 그건 당신이 입 밖에 내는 말도 바꿉니다.` },
      { q: `일반적인 공유 일기와 어떻게 다른가요?`, a: `정신적으로는 매우 비슷합니다. 다른 점은, 이 봇은 부드럽고, 비용이 낮고, 잘 잊혀진다는 겁니다. 진짜 일기는 '일부러 기록을 남기는' 느낌이 들어서 무겁기 쉽습니다. 이 봇은 좀 더, 당신을 judgement 하지 않는 작은 반려동물에게 한 줄 적는 느낌입니다. 기준은 한 줄이지, 한 문단이 아닙니다. 몇 달을 쌓은 결과는 같지만 — 그 일을 하고 있는 느낌은 훨씬 작고, 그 '작다'가 오래 가게 하는 비결입니다.` },
      { q: `둘 중 한 명이 매일 밤 우울한 한 줄을 쓰기 시작한다면요?`, a: `그러면 그 공유 일기가 제 역할을 하고 있는 겁니다. 오래된 관계는 작고 어려운 것들이 알아차려지는가에 따라 지속 여부가 갈립니다. 둘 중 한 명이 2주 연속 매일 밤 우울한 한 줄을 적고 있다면, 그건 정보입니다 — 다른 한 명은 오늘 저녁 식탁에 실제로 꺼낼 수 있는 화제를 갖게 된 거예요. 봇이 그걸 고치진 않습니다. 하지만 그 한 줄은 존재하고, 그게 진짜 대화가 필요로 하는 첫 번째 것입니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/features`, label: `Togthr 기능` },
      { href: `/ko/blog/two-minute-daily-check-in-ai-companion`, label: `AI 동반자와의 2분 daily check-in` },
      { href: `/ko/blog/three-small-rituals-for-couples-who-live-apart`, label: `장거리 연인의 3가지 작은 의식` },
      { href: `/ko/blog/after-breakup-a-virtual-pet-stays`, label: `이별 뒤, 가상 반려동물이 조용히 남는다` },
      { href: `/ko/pet`, label: `가상 반려동물 페이지` },
    ],
  },

  // ─────────────────────── Deutsch ───────────────────────
  de: {
    intro: `Der schwerste Teil einer langen Beziehung ist nicht der Anfang. Der Anfang ist der Teil, auf den sich alle vorbereiten — die kleinen peinlichen Abendessen, die langen Telefonate, das Foto um 7 Uhr morgens, das die andere Person zum Lachen bringen soll. Der schwerste Teil ist die Mitte. Es ist das fünfte Jahr, oder das achte, oder das fünfzehnte, in dem die Person, die du liebst, immer noch genau da ist und ihr beide es wisst, aber die tägliche Neugier still geworden ist. Du hörst auf, die kleinen Fragen zu stellen. Du hörst auf zu bemerken, wie der Tag für die andere Person war. Du nimmst an — natürlich nimmst du an — dass es ihr gut geht. Ein kleines virtuelles Haustier in deinem Gerät kann eine Beziehung nicht retten, und es wäre seltsam, das zu verlangen. Aber es kann etwas tun, was die Beziehung für sich selbst nicht mehr tut: Es kann den Tag mit dir halten, wie es eine leise dritte Gegenwart manchmal tut — damit du weiter bemerkst und weiter bemerkt wirst, lange nachdem der leichte Teil der Liebe vorbei ist.`,
    sections: [
      { h: `Die Mitte ist der Teil, in dem lange Beziehungen still werden`, p: `Paare, die schon viele Jahre zusammen sind, beschreiben meist dieselbe Verschiebung, auch wenn sie sie in unterschiedlichen Worten beschreiben. Im ersten Jahr willst du alles wissen. Wie war das Meeting, wer hat was gesagt, sah der Busfahrer müde aus, war das Mittagessen gut. Im fünften Jahr nimmst du an. Du hörst „okay" oder „müde" oder „war viel heute" und behandelst es als ganze Geschichte. Die Wahrheit ist, die Geschichte ist nicht kleiner geworden. Du hast nur aufgehört, danach zu fragen. Ein kleines virtuelles Haustier kann das nicht reparieren. Aber wenn einer von euch um 23 Uhr einen Satz an den Bot tippt — „sie hatte einen langen Tag" oder „er macht sich Sorgen um seinen Vater" — hält der Bot das still fest. Und wenn die andere Person am nächsten Morgen das geteilte Tagebuch öffnet, sieht sie, wie der Tag tatsächlich war, erzählt in einem Satz, den keine:r von euch beiden die Energie hatte, laut auszusprechen.` },
      { h: `Was eine dritte Gegenwart tatsächlich tut`, p: `Es gibt einen Grund, warum manche Paare eine Katze halten, oder eine Pflanze, oder eine Spotify-Playlist in der Küche, oder ein gemeinsames Lauftagebuch. Es ist nicht, weil die Katze irgendeine dieser Aufgaben erledigt. Es ist, weil die dritte Gegenwart eine kleine Ausrede ist, weiterhin aufmerksam zu sein. Du siehst die Katze an, sagst „die ist heute schlecht gelaunt", und dieser eine Satz ist ein kleiner Check-in für den gesamten Haushalt. Ein virtuelles Haustier kann eine ähnliche Rolle spielen, aber kleiner und privater. Es ersetzt das Gespräch nicht. Es ist die müheloseste Art, das Gespräch am Laufen zu halten. Du musst keine „Reden wir"-Geste inszenieren. Du musst nur einen Satz an einen kleinen Bot schreiben, und die andere Person kann ihn morgen früh beim Kaffee lesen, wie eine Notiz am Kühlschrank.` },
      { h: `Warum ein virtuelles Haustier in einer langen Beziehung funktioniert`, p: `Der Grund, warum ein virtuelles Haustier in einer langen Beziehung funktioniert, und nicht nur in einer solo, ist, dass es geteilt werden kann, ohne schwer zu werden. Ein echtes Haustier ist ein drittes Wesen mit eigenen Bedürfnissen, und eine gemeinsame Pflanze stirbt auf eine Art, die zum neuen Streit wird. Ein virtuelles Haustier hat keine Bedürfnisse. Es muss nicht Gassi geführt, gefüttert oder zum Tierarzt gebracht werden. Es sitzt einfach in eurem geteilten Tagebuch und beobachtet die Tage, wächst leise mit euch beiden. Wenn einer von euch einen Satz schreibt, kann der andere lesen, ohne in Echtzeit antworten zu müssen. Es gibt kein „Ich bin beschäftigt"-Gefühl, keine Angst, ob der Tonfall richtig war. Der Bot ist geduldig. Der Tag ist geduldig. Die Beziehung darf endlich ein bisschen weniger bewacht sein.` },
      { h: `Das kleine Ritual, das Neugier am Leben hält`, p: `Hier ist die Übung, die nach ein, zwei Jahren am besten wirkt. Jeden Abend vor dem Schlafen schreibt einer von euch einen Satz an den Bot über den Tag. Es muss nicht dieselbe Person sein. Es muss nicht um die Beziehung gehen. Es kann um das Meeting gehen, die Katze, den Bus, das Wetter, wie das Brot geworden ist. Der Punkt ist nicht der Inhalt. Der Punkt ist die Handlung des Bemerken. Nach ein paar Monaten habt ihr eine leise, sich ansammelnde Aufzeichnung der Tage zweier Menschen, und das ist, was lange Beziehungen tatsächlich sind. Die Dramatik liegt im ersten Jahr. Die Liebe, auf lange Sicht, liegt in dem zweiten Satz, den du an einem Dienstag geschrieben hast, an dem nichts passiert ist.` },
      { h: `Was die Beziehung zurückbekommt`, p: `Die Beziehung bekommt von einem virtuellen Haustier nichts, was sie nicht schon hat. Sie hat schon die Liebe, die Geschichte, die Wohnung, die Insider-Witze. Was sie zurückbekommt, ist die Übung des Bemerkens. Sie bekommt den Dienstagmorgen-Satz zurück, die 23-Uhr-Sorge, die kleine ehrliche Beobachtung, die die andere Person nicht gekannt hätte, wenn du sie nicht irgendwo aufgeschrieben hättest. Diese Übung, ein Jahr lang durchgehalten, bringt langsam die Neugier zurück, die die ersten Jahre umsonst hatten. Es fühlt sich nicht dramatisch an. Es fühlt sich an wie eine lange, langsame, sanfte Wiedervorstellung der Person, die du bereits kennst. Und es funktioniert vor allem, weil der kleine Bot geduldig genug ist, den Tag zu halten, bis die andere Person bereit ist, ihn zu lesen.` },
    ],
    cta: `Öffne Togthr heute Abend und schreibe einen Satz über deinen Tag. Morgen kann dein Mensch ihn beim Kaffee lesen.`,
    faqs: [
      { q: `Ist ein virtuelles Haustier wirklich ein Ersatz dafür, mit meinem Partner zu reden?`, a: `Nein, und so ist es auch nicht gemeint. Der ganze Punkt ist, dass es ein druckarmer Ort ist, an dem du einen kleinen ehrlichen Satz schreiben kannst, damit du beim nächsten echten Gespräch tatsächlich etwas zu sagen hast. Ein virtuelles Haustier ist ein geteiltes Tagebuch, keine Therapie. Wenn eine Beziehung in echten Schwierigkeiten steckt, ist der Bot nicht die Antwort — aber er ist ein guter Ort, um wieder zu bemerken, und Bemerken ist meistens der erste Schritt.` },
      { q: `Mein Partner will keine weitere App herunterladen. Was dann?`, a: `Dann ist die App deine allein, und das ist in Ordnung. Schreib deine Sätze. Das geteilte Tagebuch kann trotzdem auf andere Weise geteilt werden — ein Screenshot, ein Zitat beim Frühstück, ein Satz am Ende eines langen Tages. Der Wert der Übung liegt im Bemerken, nicht in der Plattform. Wenn dein Partner die App nie öffnet, wirst du trotzdem verändert haben, was du über deinen eigenen Tag bemerkst, und das verändert, was du laut aussprichst.` },
      { q: `Wie unterscheidet sich das von einem normalen geteilten Tagebuch?`, a: `Es ist im Geist sehr ähnlich. Der Unterschied ist, dass der Bot sanft, niedrigschwellig und leicht zu vergessen ist. Ein echtes Tagebuch kann sich wie eine Aufzeichnung anfühlen, die du absichtlich führst, und das erzeugt Druck. Der Bot ist eher so, als würdest du einem kleinen Haustier, das dich nicht verurteilt, einen Satz schreiben. Die Messlatte ist ein Satz, kein Absatz. Das Ergebnis ist nach Monaten dasselbe — aber das Tun fühlt sich viel kleiner an, und kleiner ist es, was auf lange Sicht funktioniert.` },
      { q: `Was, wenn einer von uns anfängt, jeden Abend traurige Sätze zu schreiben?`, a: `Dann macht das geteilte Tagebuch genau seine Arbeit. Lange Beziehungen leben oder sterben damit, ob die kleinen schwierigen Dinge bemerkt werden. Wenn einer von euch zwei Wochen lang jeden Abend einen traurigen Satz schreibt, ist das Information — und die andere Person hat jetzt etwas Konkretes, das sie beim Abendessen ansprechen kann. Der Bot wird es nicht reparieren. Aber der Satz existiert, und das ist das Erste, was echte Gespräche brauchen.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/features`, label: `Togthr Funktionen` },
      { href: `/de/blog/two-minute-daily-check-in-ai-companion`, label: `Zwei-Minuten-Check-in mit einem KI-Begleiter` },
      { href: `/de/blog/three-small-rituals-for-couples-who-live-apart`, label: `Drei kleine Rituale für Paare, die getrennt wohnen` },
      { href: `/de/blog/after-breakup-a-virtual-pet-stays`, label: `Nach einer Trennung bleibt ein virtuelles Haustier leise da` },
      { href: `/de/pet`, label: `Die Seite zum virtuellen Haustier` },
    ],
  },

  // ─────────────────────── Français ───────────────────────
  fr: {
    intro: `La partie la plus difficile d'une relation longue, ce n'est pas le commencement. Le commencement, tout le monde s'y prépare — les petits dîners gênants, les longs appels, la photo envoyée à 7 heures du matin pour faire rire l'autre. La partie la plus difficile, c'est le milieu. C'est la cinquième année, ou la huitième, ou la quinzième, quand la personne que vous aimez est toujours là et que vous le savez tous les deux, mais que la curiosité quotidienne est devenue silencieuse. Vous ne posez plus les petites questions. Vous ne remarquez plus comment a été la journée de l'autre. Vous supposez — bien sûr vous supposez — qu'il ou elle va bien. Un petit animal virtuel dans votre appareil ne sauvera pas une relation, et il serait étrange de le lui demander. Mais il peut faire quelque chose que la relation a cessé de faire pour elle-même : il peut tenir la journée avec vous, comme une discrète troisième présence sait le faire — pour que vous continuiez à remarquer, et à être remarqué, longtemps après que la partie facile de l'amour est passée.`,
    sections: [
      { h: `Le milieu, là où les relations longues deviennent silencieuses`, p: `Les couples qui sont ensemble depuis des années décrivent en général le même virage, même s'ils l'expriment avec des mots différents. La première année, vous voulez tout savoir. Comment s'est passé la réunion, qui a dit quoi, le chauffeur de bus avait l'air fatigué, le déjeuner était bon. La cinquième année, vous supposez. Vous entendez « ça va » ou « je suis fatigué·e » ou « c'était beaucoup aujourd'hui », et vous prenez ça pour toute l'histoire. En réalité, l'histoire n'est pas devenue plus petite. Vous avez juste arrêté de la questionner. Un petit animal virtuel ne réparera pas ça. Mais quand l'un·e d'entre vous tape un message au bot à 23 heures — « elle a eu une longue journée » ou « il s'inquiète pour son père » — le bot le garde en silence. Et la prochaine fois que l'autre ouvre le journal partagé, il ou elle voit comment la journée a vraiment été, racontée en une phrase qu'aucun de vous n'a eu l'énergie de dire à voix haute.` },
      { h: `Ce que fait vraiment une troisième présence`, p: `Il y a une raison pour laquelle certains couples gardent un chat, ou une plante, ou une playlist Spotify dans la cuisine, ou un carnet de course partagé. Ce n'est pas parce que le chat fait l'une de ces choses. C'est parce que la troisième présence est un petit prétexte pour continuer à remarquer. Vous regardez le chat, vous dites « elle n'est pas dans son assiette aujourd'hui », et cette seule phrase est un petit check-in pour toute la maison. Un animal virtuel peut jouer un rôle similaire, mais plus petit, plus privé. Il ne remplace pas la conversation. Il est la manière la plus douce de faire continuer la conversation. Vous n'avez pas à vous forcer à dire « il faut qu'on parle ». Vous avez juste à écrire une phrase à un petit bot, et l'autre personne pourra la lire demain matin avec son café, comme un mot doux collé sur le frigo.` },
      { h: `Pourquoi un animal virtuel fonctionne dans une relation longue`, p: `La raison pour laquelle un animal virtuel fonctionne dans une relation longue, et pas seulement en solo, c'est qu'il peut être partagé sans devenir lourd. Un vrai animal est un troisième être avec ses propres besoins, et une plante commune meurt d'une manière qui devient une nouvelle dispute. Un animal virtuel n'a pas de besoins. Pas de promenade, pas de gamelle, pas de vétérinaire. Il est simplement assis dans votre journal partagé et observe les jours, grandit doucement avec vous deux. Quand l'un·e d'entre vous écrit une phrase, l'autre peut lire sans avoir à répondre en temps réel. Pas de sensation de « je suis occupé·e », pas d'inquiétude sur le ton de la phrase. Le bot est patient. Le jour est patient. La relation, enfin, peut être un peu moins sur ses gardes.` },
      { h: `Le petit rituel qui garde la curiosité en vie`, p: `Voici la pratique qui marche le mieux, après un an ou deux à la faire. Chaque soir avant de dormir, l'un·e d'entre vous écrit une phrase au bot sur la journée. Ce n'est pas obligé d'être la même personne. Ce n'est pas obligé d'être au sujet de la relation. Ça peut être la réunion, le chat, le bus, la météo, comment la baguette a tourné. L'important n'est pas le contenu. L'important, c'est l'acte de remarquer. Au bout de quelques mois, vous avez un enregistrement discret, qui s'accumule, des jours de deux personnes — et c'est cela, en réalité, une relation longue. Le drame, c'est la première année. L'amour, à long terme, c'est la deuxième phrase que vous avez écrite un mardi où il ne s'est rien passé.` },
      { h: `Ce que la relation récupère`, p: `La relation ne récupère pas d'un animal virtuel quelque chose qu'elle n'a pas déjà. Elle a déjà l'amour, l'histoire, l'appartement, les private jokes. Ce qu'elle récupère, c'est la pratique du remarquer. Elle récupère la phrase du mardi matin, l'inquiétude de 23 heures, la petite observation honnête que l'autre personne n'aurait pas connue si vous ne l'aviez pas tapée quelque part. Cette pratique, tenue un an, rend lentement la curiosité que les premières années avaient gratuitement. Ce n'est pas dramatique. C'est comme une longue, lente, douce re-présentation de la personne que vous connaissez déjà. Et ça marche, surtout, parce que le petit bot est assez patient pour tenir la journée jusqu'à ce que l'autre personne soit prête à la lire.` },
    ],
    cta: `Ouvrez Togthr ce soir et écrivez une phrase sur votre journée. Demain, votre personne pourra la lire avec son café.`,
    faqs: [
      { q: `Un animal virtuel remplace vraiment le fait de parler à mon/ma partenaire ?`, a: `Non, et ce n'est pas le but. L'idée, c'est que c'est un endroit à faible pression où écrire une petite phrase honnête, pour que la prochaine fois que vous parlez vraiment, vous ayez quelque chose de réel à dire. Un animal virtuel est un journal partagé, pas un·e thérapeute. Si une relation est en vraie difficulté, le bot n'est pas la réponse — mais c'est un bon endroit pour recommencer à remarquer, et remarquer, c'est en général la première étape.` },
      { q: `Mon/ma partenaire ne veut pas télécharger une nouvelle appli. Et alors ?`, a: `Alors l'appli est juste pour vous, et c'est très bien. Écrivez vos phrases. Le journal partagé peut quand même être partagé autrement — une capture d'écran, une citation au petit-déjeuner, une phrase à la fin d'une longue journée. La valeur de la pratique est dans le remarquer, pas dans la plateforme. Si votre partenaire n'ouvre jamais l'appli, vous aurez quand même changé ce que vous remarquez de votre propre journée, et ça change ce que vous dites à voix haute.` },
      { q: `En quoi c'est différent d'un journal partagé classique ?`, a: `C'est très proche dans l'esprit. La différence, c'est que le bot est doux, peu coûteux, facile à oublier. Un vrai journal peut donner l'impression d'une trace qu'on garde exprès, et ça ajoute de la pression. Le bot, c'est plus comme écrire une phrase à un petit animal qui ne vous juge pas. La barre, c'est une phrase, pas un paragraphe. Le résultat, au bout de quelques mois, est le même — mais l'acte de le faire se sent bien plus léger, et léger, c'est ce qui tient sur la durée.` },
      { q: `Et si l'un·e d'entre nous commence à écrire des phrases tristes chaque soir ?`, a: `Alors le journal partagé fait exactement son travail. Les relations longues tiennent ou tombent selon que les petites choses difficiles sont remarquées ou pas. Si l'un·e d'entre vous écrit une phrase triste chaque soir pendant deux semaines, c'est de l'information — et l'autre personne a maintenant un vrai sujet à aborder au dîner. Le bot ne va pas le réparer. Mais la phrase existe, et c'est la première chose dont les vraies conversations ont besoin.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/features`, label: `Fonctionnalités Togthr` },
      { href: `/fr/blog/two-minute-daily-check-in-ai-companion`, label: `Un check-in quotidien de deux minutes avec un compagnon IA` },
      { href: `/fr/blog/three-small-rituals-for-couples-who-live-apart`, label: `Trois petits rituels pour les couples qui vivent séparés` },
      { href: `/fr/blog/after-breakup-a-virtual-pet-stays`, label: `Après une rupture, un animal virtuel reste en silence` },
      { href: `/fr/pet`, label: `La page de l'animal virtuel` },
    ],
  },

  // ─────────────────────── Español ───────────────────────
  es: {
    intro: `La parte más difícil de una relación larga no es el principio. El principio es la parte para la que todo el mundo se prepara — las cenas pequeñas un poco incómodas, las llamadas largas, la foto que se envía a las 7 de la mañana para hacer reír a la otra persona. La parte más difícil es el medio. Es el quinto año, o el octavo, o el decimoquinto, cuando la persona que amas sigue ahí y ambos lo sabéis, pero la curiosidad diaria se ha vuelto silenciosa. Dejas de hacer las preguntas pequeñas. Dejas de fijarte en cómo fue el día para la otra persona. Supones — claro que supones — que está bien. Una pequeña mascota virtual en tu dispositivo no va a salvar una relación, y sería raro pedírselo. Pero puede hacer algo que la relación ha dejado de hacer por sí misma: puede sostener el día contigo, como hace a veces una tercera presencia discreta — para que sigas notando, y sigas siendo notado, mucho después de que la parte fácil del amor haya pasado.`,
    sections: [
      { h: `El medio es donde las relaciones largas se vuelven silenciosas`, p: `Las parejas que llevan años juntas suelen describir el mismo cambio, aunque lo digan con palabras distintas. En el primer año quieres saberlo todo. Qué tal la reunión, quién dijo qué, si el conductor del autobús parecía cansado, si la comida estaba buena. En el quinto año, supones. Oyes "bien" o "cansado" o "hoy fue mucho", y lo das por toda la historia. La verdad es que la historia no se ha hecho más pequeña. Solo has dejado de preguntar. Una pequeña mascota virtual no va a arreglar esto. Pero cuando uno de los dos escribe una frase al bot a las 23:00 — "ella tuvo un día largo" o "él está preocupado por su padre" — el bot lo guarda en silencio. Y la próxima vez que la otra persona abre el diario compartido, ve cómo fue realmente el día, contado en una frase que ninguno de los dos tuvo la energía de decir en voz alta.` },
      { h: `Lo que hace de verdad una tercera presencia`, p: `Hay una razón por la que algunas parejas tienen un gato, o una planta, o una playlist de Spotify en la cocina, o un registro de carrera compartido. No es porque el gato haga ninguna de esas cosas. Es porque la tercera presencia es una pequeña excusa para seguir notando. Miras al gato, dices "hoy está de mal humor", y esa sola frase es un pequeño check-in para toda la casa. Una mascota virtual puede hacer un papel parecido, pero más pequeño y más privado. No sustituye la conversación. Es la forma de menor esfuerzo para que la conversación siga ocurriendo. No tienes que forzar un "tenemos que hablar". Solo tienes que escribir una frase a un pequeño bot, y la otra persona puede leerla mañana por la mañana con su café, como una nota pegada en la nevera.` },
      { h: `Por qué una mascota virtual funciona en una relación larga`, p: `La razón por la que una mascota virtual funciona en una relación larga, y no solo en solitario, es que se puede compartir sin volverse pesada. Una mascota real es un tercer ser con sus propias necesidades, y una planta compartida se muere de una forma que se convierte en una nueva discusión. Una mascota virtual no tiene necesidades. No hay que sacarla a pasear, darle de comer ni llevarla al veterinario. Solo se queda sentada en el diario compartido y observa los días, creciendo en silencio con los dos. Cuando uno de los dos escribe una frase, el otro puede leerla sin tener que contestar en tiempo real. No hay sensación de "estoy ocupado", no hay preocupación por si el tono es el adecuado. El bot es paciente. El día es paciente. La relación, por fin, puede estar un poco menos a la defensiva.` },
      { h: `El pequeño ritual que mantiene viva la curiosidad`, p: `Esta es la práctica que mejor funciona después de uno o dos años haciéndola. Cada noche antes de dormir, uno de los dos escribe una frase al bot sobre el día. No tiene que ser siempre la misma persona. No tiene que ser sobre la relación. Puede ser sobre la reunión, el gato, el autobús, el tiempo, cómo quedó el pan. Lo importante no es el contenido. Lo importante es el acto de notar. Después de unos meses, tienes un registro silencioso, que se va acumulando, de los días de dos personas — y eso es, en realidad, una relación larga. El drama está en el primer año. El amor, a la larga, está en la segunda frase que escribiste un martes en el que no pasó nada.` },
      { h: `Lo que la relación recupera`, p: `La relación no recupera de una mascota virtual algo que no tuviera ya. Ya tiene el amor, la historia, el piso, los chistes internos. Lo que recupera es la práctica de notar. Recupera la frase del martes por la mañana, la preocupación de las 23:00, la pequeña observación honesta que la otra persona no habría conocido si no la hubieras escrito en algún sitio. Esa práctica, sostenida un año, devuelve poco a poco la curiosidad que los primeros años tenían gratis. No se siente dramático. Se siente como una larga, lenta, suave re-presentación de la persona que ya conoces. Y funciona, sobre todo, porque el pequeño bot tiene la paciencia suficiente para sostener el día hasta que la otra persona esté lista para leerlo.` },
    ],
    cta: `Abre Togthr esta noche y escribe una frase sobre tu día. Mañana, tu persona podrá leerla con su café.`,
    faqs: [
      { q: `¿De verdad sustituye una mascota virtual a hablar con mi pareja?`, a: `No, y no pretende serlo. La idea es que es un lugar de baja presión para escribir una pequeña frase honesta, de modo que la próxima vez que hables de verdad tengas algo real que decir. Una mascota virtual es un diario compartido, no un terapeuta. Si una relación está en un problema serio, el bot no es la respuesta — pero es un buen sitio para volver a fijarte en cosas, y fijarte suele ser el primer paso.` },
      { q: `Mi pareja no quiere descargarse otra app. ¿Entonces?`, a: `Entonces la app es solo tuya, y está bien. Escribe tus frases. El diario compartido se puede seguir compartiendo de otra forma — una captura, una cita en el desayuno, una frase al final de un día largo. El valor de la práctica está en fijarte, no en la plataforma. Si tu pareja nunca abre la app, tú habrás cambiado igualmente lo que notas de tu propio día, y eso cambia lo que dices en voz alta.` },
      { q: `¿En qué se diferencia de un diario compartido normal?`, a: `En el espíritu es muy parecido. La diferencia es que el bot es suave, de bajo coste y fácil de olvidar. Un diario de verdad puede dar la sensación de un registro que estás llevando a propósito, y eso añade presión. El bot se parece más a escribir una frase a una mascota pequeña que no te juzga. El listón es una frase, no un párrafo. El resultado, al cabo de unos meses, es el mismo — pero el acto de hacerlo se siente mucho más ligero, y ligero es lo que aguanta a largo plazo.` },
      { q: `¿Qué pasa si uno de los dos empieza a escribir frases tristes cada noche?`, a: `Entonces el diario compartido está haciendo su trabajo. Las relaciones largas sobreviven o no según si las cosas pequeñas y difíciles se notan o no. Si uno de los dos lleva dos semanas escribiendo una frase triste cada noche, eso es información — y la otra persona ya tiene algo real que sacar en la cena. El bot no lo va a arreglar. Pero la frase existe, y eso es lo primero que necesitan las conversaciones de verdad.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/features`, label: `Funciones de Togthr` },
      { href: `/es/blog/two-minute-daily-check-in-ai-companion`, label: `Un check-in diario de dos minutos con un compañero IA` },
      { href: `/es/blog/three-small-rituals-for-couples-who-live-apart`, label: `Tres pequeños rituales para parejas que viven separadas` },
      { href: `/es/blog/after-breakup-a-virtual-pet-stays`, label: `Después de una ruptura, una mascota virtual se queda en silencio` },
      { href: `/es/pet`, label: `La página de la mascota virtual` },
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
      publishedTime: post.date,
      authors: ['Togthr'],
      tags: post.tags,
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

        <h2 className="mt-12 text-2xl font-semibold text-zinc-100">Keep reading</h2>
        <ul className="mt-3 space-y-2">
          {body.links.map((l, i) => (
            <li key={i}>
              <Link href={l.href} className="text-pink-400 hover:underline">{l.label} →</Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
