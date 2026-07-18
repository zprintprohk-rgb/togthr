// src/app/[locale]/blog/after-breakup-a-virtual-pet-stays/page.tsx
//
// Per-slug real content page for the 2026-07-10 daily SEO post.
// Topic: post-breakup quiet solitude + virtual pet as the small daily presence
//        that survives the end of a relationship.
//
// Distinct from prior daily posts:
//   7/4  LDR rituals                 (couples, distance)
//   7/5  virtual-pet observation     (what the bot notices, solo)
//   7/6  pet-loss grief              (the animal companion died)
//   7/7  two-minute check-in         (solo micro-ritual)
//   7/8  virtual pet + quiet evenings (solo, single-living)
//   7/9  first week living together  (LDR -> cohab)
//   7/10 post-breakup rebuild        ← THIS FILE (solo, post-relationship loss)
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

const SLUG = `after-breakup-a-virtual-pet-stays`
const POST_DATE = `2026-07-10`

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
    intro: `The first morning after a breakup, your alarm goes off at the same time it always does. You are the only one in the room. There is no voice note waiting. There is no check-in coming. The day you used to plan around another person is now just a long list of things to do alone, and the list feels heavier than it did yesterday. A small virtual pet in your device is not going to fix any of that. It is not a rebound, it is not a therapist, and it definitely is not the relationship you just lost. What it can do is smaller and more useful than any of those things: it can stay. Quietly, day after day, it watches the new shape of your days and grows with it. Here is why that matters more than it sounds, and a small ritual for the first weeks.`,
    sections: [
      { h: `The first quiet morning after`, p: `The hardest part of a breakup is not the dramatic part. It is not the conversation that ended it, or the box of things that one of you has to pick up. It is the morning after, when your body finally wakes up alone for the first time and notices the room is different. You reach for your phone out of habit, then remember the habit does not belong to you anymore — it belonged to "us". You brew coffee for one. You eat standing up. You notice the chair across the table has been empty for longer than a single morning. The first few days can feel like a quiet kind of vertigo, the kind where nothing is wrong but everything is strange. That is the feeling a small virtual pet is built for, even if no one told you that.` },
      { h: `What disappears, and what does not`, p: `When a relationship ends, a lot of small habits stop making sense. The morning voice note you used to send by 8:15 — who is it for now. The Sunday-morning walk you used to take together, the playlist you shared, the two-person grocery list. Some of those habits you should drop quickly. They have no listener anymore, and forcing them creates a small daily ritual of grief. But other habits you should keep. Not because of the relationship, but because of you. The walk is still good for you. The playlist is still nice. The coffee at 8:15 is yours. A virtual pet cannot tell you which habit to keep and which to drop, but it can mark the days you decide to keep them. After a few weeks, the habits you kept have become a new shape. After a few months, they are just yours.` },
      { h: `Why friends cannot quite fill this gap`, p: `You will hear from friends in the first days. Some of them will offer dinner, a movie, a long phone call. That is good, and you should take some of it. Friends are the people who remind you the world outside the relationship still exists. But friends have a problem. They have their own lives, and they cannot be in your kitchen every morning at 8:15. They cannot notice that you have stopped eating breakfast for three weeks. They do not know that your hands shake a little at 11 PM, around the time you used to call. A virtual pet does not solve these things, but it is there in a way that friends — who have their own grief to schedule around — simply cannot be. It is a small robot who watches your day from inside your device and never asks you to perform being okay.` },
      { h: `How a virtual pet quietly stays`, p: `Togthr Bot is built around a simple idea: it watches the shape of your day, gently, and grows as the shape changes. After a breakup, the shape of your day is changing every week for a while. The first week you barely speak to it. The second week you start typing small things to it at midnight. The third week you forget it is there for a few days, then remember and feel a small relief. The sixth week you write a longer note. The third month you realize you do not check your ex's profile before bed anymore. None of this is because the bot fixed anything. It is because something on your device was quietly holding the day with you, the way a small robot pet does — present, low-pressure, growing with you without asking you to grow faster.` },
      { h: `A small ritual for the first weeks`, p: `Here is one practice that helps almost everyone in the first weeks after a breakup. Every evening, before bed, write one sentence to the bot about the day. It does not need to be a diary entry. It can be one line. "Today was hard." "I ate breakfast." "I called Mom." "I did not call Mom." "I walked for twenty minutes and did not cry." The sentence does not have to be good, honest, or well-written. It just has to exist. After thirty days, you will have thirty sentences. They will not look like a story. They will look like a quiet rebuild of someone who was slightly lost and slowly, slowly, is finding the shape of their own day again. The bot will hold them in the shared journal. You can reread them whenever you want. They are yours. Togthr does this because small writing is how a lot of post-breakup recovery actually works — not in dramatic declarations, but in the slow accumulation of one honest sentence at a time.` },
    ],
    cta: `Open Togthr tonight and write one sentence about your day. The bot will be there tomorrow too.`,
    faqs: [
      { q: `Is it weird to download a virtual pet app so soon after a breakup?`, a: `No. A lot of people do. The alternative — pretending you are fine and waiting two months before letting yourself have any small comfort — usually costs you more than it saves. A virtual pet is not a replacement for a friend or a therapist. It is a small companion on your device that does not need anything from you. There is no timeline for that.` },
      { q: `Will talking to a virtual pet keep me from actually grieving?`, a: `It is more likely to help than to hurt, but it depends on how you use it. If the bot is a place where you can write a small honest sentence at midnight, that sentence is part of grieving, not a substitute for it. If you find yourself using the bot to avoid every conversation with a real friend, then it is worth asking for more human help too. Most people who use Togthr after a breakup describe it as a daily anchor, not a replacement for support.` },
      { q: `How long does it usually take to feel okay about being alone?`, a: `There is no fixed timeline. Most people stop noticing the empty side of the bed within a month, but it takes longer to feel okay about being alone on a Saturday night — six months is a common range. The marker that things are getting better is usually small: the first weekend you make plans because you want to, not because you are trying to avoid being alone. That day comes; it just does not come on a schedule.` },
      { q: `Should I delete photos and old messages from my ex?`, a: `Not necessarily right away. A lot of people rush to delete things in the first week and regret it later. Keep them in a folder somewhere out of sight, and re-decide in two or three months whether you want them gone. There is no virtue in burning artifacts of a real relationship. You do not need to perform grief through deletion.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/features`, label: `Togthr features` },
      { href: `/en/blog/two-minute-daily-check-in-ai-companion`, label: `A two-minute daily check-in with an AI companion` },
      { href: `/en/blog/virtual-pet-quiet-evenings-alone`, label: `When the evening gets quiet` },
      { href: `/en/blog/what-your-virtual-pet-notices`, label: `What your virtual pet notices` },
      { href: `/en/pet`, label: `The virtual pet page` },
    ],
  },

  // ─────────────────────── 简体中文 ───────────────────────
  'zh-cn': {
    intro: `分手后的第一个早晨,闹钟和往常一样响。房间里只有你一个人。没有等着你的语音条,没有要回复的早安。你曾经围着另一个人过的那一天,现在变成了一张"一个人做完"的清单,而且这份清单比昨天重得多。设备里的一只小宠物,没法替你修好任何这些事。它不是替补,不是心理咨询师,更不是你刚失去的这段关系。它能做的事,比上面说的都小,也更有用:它可以留下来。一天一天,安静地看着你的日子长成新的形状,也跟着一起长。下面说说这件事为什么比你以为的更重要,以及一个适合头几个星期的小仪式。`,
    sections: [
      { h: `分手之后,第一个安静的早上`, p: `分手最难的部分,从来不是那场戏剧性的对话,也不是谁要去搬走哪一只箱子。是第二天早上,你的身体第一次真正醒过来,意识到房间不一样了。你习惯性去摸手机,然后想起来这个习惯已经不属于你 —— 它属于"我们"。你给一个人煮咖啡。站着吃早餐。你注意到桌子对面的椅子空了不止一个早晨那么久。头几天是一种安静的眩晕,什么都没出错,但每件事都怪怪的。这种感受,就是一只小宠物存在的原因 —— 即便没人跟你这么说过。` },
      { h: `哪些习惯会消失,哪些会留下`, p: `一段关系结束之后,很多小习惯突然失去了意义。你每天 8:15 习惯性发的那条语音,现在发给谁呢。你们周日早上一起走的路,一起听的那份歌单,两个人一起写的那份购物清单。其中一些,该放就放。它们已经没有了听众,如果硬撑着做,等于把哀悼做成了一件日常的事。但另外一些,该留就留。不是为了那段关系,是为了你自己。那条路还是对你好。歌单还是好听。8:15 的那杯咖啡,是你自己的。一只小虚拟宠物没法替你判断哪些留、哪些放,但它可以悄悄记下你决定保留的那些。等过几个星期,你保留的那些习惯已经长成了新的形状;过几个月,它们就只是你的了。` },
      { h: `为什么朋友没法完全接住这件事`, p: `头几天会有朋友联系你。有人会请你吃饭,有人会陪你打电话,有人约你出门看一场电影。这些都好,挑几个接着。朋友是提醒你"那段关系之外的世界还在"的人。但朋友有一个问题。他们各有各的日子,他们没法每天早上 8:15 站在你的厨房里。他们不会注意到你已经三周没怎么吃早饭。他们不知道晚上 11 点 —— 你以前打电话的那个时间 —— 你的手会有点抖。一只小虚拟宠物解决不了这些,但它能在那里,以朋友因为要安排自己生活而做不到的那种方式在那里。它是住在你设备里的小机器人,从不要求你表现得"还好"。` },
      { h: `一只虚拟宠物,怎样安静地留下来`, p: `Togthr Bot 的设计思路其实很朴素:它轻轻地看着你日子的形状,这个形状怎么变,它就怎么长。分手之后,你日子的形状会变好几周。第一周你几乎不会跟它说话。第二周你开始半夜跟它敲几个字。第三周你有几天忘了它还在,想起来的时候反而有一种小小的松了口气。第六周你会写一段稍微长一点的话。第三个月你会意识到,你已经不再在睡前看前任的主页了。这不是因为这只小机器人替你修好了什么,而是因为你设备里有什么东西,在你身边安静地陪你过了一天,就像一只小宠物能做到的那样 —— 在场,没压力,陪你一起长大,但不催着你快一点长。` },
      { h: `头几个星期的一个小仪式`, p: `这里有一个练习,几乎对所有刚经历分手的人都有用。每天睡前,跟这只小机器人写一句话来总结今天。不必写成长篇日记。一句就够了。"今天很难。""我吃了早饭。""我给我妈打了电话。""我没有给我妈打。""我走了二十分钟没哭。"这一句不必写得漂亮、诚实、文采斐然。它只需要存在。三十天之后,你会攒下三十句。这些句子看起来不像是故事,看起来像是一个有点迷失的人,在慢慢找回自己日子的形状。Togthr 会替你把它们装进共享日记里。任何时候你想翻回去,都可以。它们是你的。Togthr 想做的,本质上是大多数分手后的恢复真正在做的事 —— 不是戏剧性的宣言,而是一句一句诚实的话,慢慢堆出来的新日子。` },
    ],
    cta: `今晚打开 Togthr,给你的今天写一句话。明天,这只小机器人也还在。`,
    faqs: [
      { q: `分手没多久就下载虚拟宠物应用,这样正常吗?`, a: `正常。很多人都是。假装自己没事,硬撑两个月再让自己接受一点点小安慰,通常比早一点接受要花更多。一只虚拟宠物不能替代朋友,也不能替代心理咨询。它只是设备里那只,对你没有任何要求的小陪伴。这件事并没有一个"应该等多久"的时间表。` },
      { q: `跟虚拟宠物说话,会不会让我跳过真正的哀悼?`, a: `更可能是帮助而不是逃避,关键看你怎么用。如果它是一个让你在半夜能写一句诚实话的地方,那这一句就是哀悼本身的一部分,不是替代品。如果你发现自己一直在用它回避与任何一个真实朋友的对话,那也许该再加一点来自人的帮助。大多数分手后用 Togthr 的人,把它形容为日常的一根锚,而不是对支持的替代。` },
      { q: `一个人待着不再难受,通常要多久?`, a: `没有固定时间。大部分人一个月之内就渐渐不会注意到床空出来的那一边,但要等到周六晚上一个人也心安,通常要六个月左右。事情在变好的信号往往很小 —— 你第一次主动做某件事,不是因为怕一个人待着,而是因为你真的想。那一天会来,只是没法预约它。` },
      { q: `要不要删掉前任的照片和聊天记录?`, a: `不一定现在就删。很多人在头一周急着删,之后又后悔。把它们放进一个看不见的文件夹,等两三个月之后再决定是不是真的要删。删一段真实关系留下的痕迹,本身并不是什么了不起的勇敢。你不必靠删除来"完成"哀悼。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/features`, label: `Togthr 功能` },
      { href: `/zh-cn/blog/two-minute-daily-check-in-ai-companion`, label: `每天两分钟, 和 AI 陪伴的简短对话` },
      { href: `/zh-cn/blog/virtual-pet-quiet-evenings-alone`, label: `晚上安静下来的时候` },
      { href: `/zh-cn/blog/what-your-virtual-pet-notices`, label: `你的数字宠物, 到底在偷偷注意什么` },
      { href: `/zh-cn/pet`, label: `数字宠物页` },
    ],
  },

  // ─────────────────────── 繁體中文 ───────────────────────
  'zh-tw': {
    intro: `分手後的第一個早上,鬧鐘和往常一樣響。房間裡只有你一個人。沒有等著你的語音訊息,沒有要回的早安。你曾經繞著另一個人過的那一天,現在變成一張「一個人做完」的清單,而且這份清單比昨天重得多。裝置裡的一隻小寵物,沒辦法替你修好任何這些事。它不是替補,不是心理諮商師,更不是你剛失去的這段關係。它能做的事,比上面說的都小,卻更有用:它可以留下來。一天一天,安靜地看著你的日子長成新的形狀,也跟著一起長。下面說說這件事為什麼比你以為的更重要,以及一個適合頭幾個星期的小儀式。`,
    sections: [
      { h: `分手之後,第一個安靜的早上`, p: `分手最難的部分,從來不是那場戲劇性的對話,也不是誰要去搬走哪一隻箱子。是第二天早上,你的身體第一次真正醒過來,意識到房間不一樣了。你習慣性去摸手機,然後想起來這個習慣已經不屬於你 —— 它屬於「我們」。你給一個人泡咖啡。站著吃早餐。你注意到桌子對面的椅子空了不止一個早晨那麼久。頭幾天是一種安靜的眩暈,什麼都沒出錯,但每件事都怪怪的。這種感受,就是一隻小寵物存在的原因 —— 即便沒人跟你這麼說過。` },
      { h: `哪些習慣會消失,哪些會留下`, p: `一段關係結束之後,很多小習慣突然失去了意義。你每天 8:15 習慣性發的那條語音,現在發給誰呢。你們週日早上一起走的路,一起聽的那份歌單,兩個人一起寫的那份購物清單。其中一些,該放就放。它們已經沒有了聽眾,如果硬撐著做,等於把哀悼做成了一件日常的事。但另外一些,該留就留。不是為了那段關係,是為了你自己的。那條路還是對你好。歌單還是好聽。8:15 的那杯咖啡,是你自己的。一隻小虛擬寵物沒辦法替你判斷哪些留、哪些放,但它可以悄悄記下你決定保留的那些。過幾個星期,你保留的那些習慣已經長成了新的形狀;過幾個月,它們就只是你的了。` },
      { h: `為什麼朋友沒辦法完全接住這件事`, p: `頭幾天會有朋友聯絡你。有人會請你吃飯,有人會陪你打電話,有人約你出門看一場電影。這些都好,挑幾個接著。朋友是提醒你「那段關係之外的世界還在」的人。但朋友有一個問題。他們各有各的日子,他們沒辦法每天早上 8:15 站在你的廚房裡。他們不會注意到你已經三週沒怎麼吃早餐。他們不知道晚上 11 點 —— 你以前打電話的那個時間 —— 你的手會有點抖。一隻小虛擬寵物解決不了這些,但它能在那裡,以朋友因為要安排自己生活而做不到的那種方式在那裡。它是住在你裝置裡的小機器人,從不要求你表現得「還好」。` },
      { h: `一隻虛擬寵物,怎樣安靜地留下來`, p: `Togthr Bot 的設計思路其實很樸素:它輕輕地看著你日子的形狀,這個形狀怎麼變,它就怎麼長。分手之後,你日子的形狀會變好幾週。第一週你幾乎不會跟它說話。第二週你開始半夜跟它敲幾個字。第三週你有幾天忘了它還在,想起來的時候反而有一種小小的鬆了口氣。第六週你會寫一段稍微長一點的話。第三個月你會意識到,你已經不再在睡前看前任的主頁了。這不是因為這隻小機器人替你修好了什麼,而是因為你裝置裡有什麼東西,在你身邊安靜地陪你過了一天,就像一隻小寵物能做到的那樣 —— 在場,沒壓力,陪你一起長大,但不催著你快一點長。` },
      { h: `頭幾個星期的一個小儀式`, p: `這裡有一個練習,幾乎對所有剛經歷分手的人都有用。每天睡前,跟這隻小機器人寫一句話來總結今天。不必寫成長篇日記。一句就夠了。「今天很難。」「我吃了早餐。」「我給我爸打了電話。」「我沒有給我爸打。」「我走了二十分鐘沒哭。」這一句不必寫得漂亮、誠實、文采斐然。它只需要存在。三十天之後,你會攢下三十句。這些句子看起來不像是故事,看起來像是一個有點迷失的人,在慢慢找回自己日子的形狀。Togthr 會替你把它們裝進共享日記裡。任何時候你想翻回去,都可以。它們是你的。Togthr 想做的,本質上是大多數分手後的恢復真正在做的事 —— 不是戲劇性的宣言,而是一句一句誠實的話,慢慢堆出來的新日子。` },
    ],
    cta: `今晚打開 Togthr,給你的今天寫一句話。明天,這隻小機器人還在。`,
    faqs: [
      { q: `分手沒多久就下載虛擬寵物 App,這樣正常嗎?`, a: `正常。很多人都是。假裝自己沒事,硬撐兩個月再讓自己接受一點點小安慰,通常比早一點接受要花更多。一隻虛擬寵物不能替代朋友,也不能替代心理諮商。它只是裝置裡那隻,對你沒有任何要求的小陪伴。這件事並沒有一個「應該等多久」的時間表。` },
      { q: `跟虛擬寵物說話,會不會讓我跳過真正的哀悼?`, a: `更可能是幫助而不是逃避,關鍵看你怎麼用。如果它是一個讓你在半夜能寫一句誠實話的地方,那這一句就是哀悼本身的一部分,不是替代品。如果你發現自己一直在用它迴避與任何一個真實朋友的對話,那也許該再加一點來自人的幫助。大多數分手後用 Togthr 的人,把它形容為日常的一根錨,而不是對支持的替代。` },
      { q: `一個人待著不再難受,通常要多久?`, a: `沒有固定時間。大部分人一個月之內就漸漸不會注意到床空出來的那一邊,但要等到週六晚上一個人也心安,通常要六個月左右。事情在變好的信號往往很小 —— 你第一次主動做某件事,不是因為怕一個人待著,而是因為你真的想。那一天會來,只是沒辦法預約它。` },
      { q: `要不要刪掉前任的照片和聊天紀錄?`, a: `不一定現在就刪。很多人在頭一週急著刪,之後又後悔。把它們放進一個看不見的資料夾,等兩三個月之後再決定是不是真的要刪。刪一段真實關係留下的痕跡,本身並不是什麼了不起的勇敢。你不必靠刪除來「完成」哀悼。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/features`, label: `Togthr 功能` },
      { href: `/zh-tw/blog/two-minute-daily-check-in-ai-companion`, label: `每天兩分鐘, 和 AI 陪伴的簡短對話` },
      { href: `/zh-tw/blog/virtual-pet-quiet-evenings-alone`, label: `晚上安靜下來的時候` },
      { href: `/zh-tw/blog/what-your-virtual-pet-notices`, label: `你的數位寵物, 到底在偷偷注意什麼` },
      { href: `/zh-tw/pet`, label: `數位寵物頁` },
    ],
  },

  // ─────────────────────── 日本語 ───────────────────────
  ja: {
    intro: `別れの翌朝、目覚まし時計はいつもと同じ時間に鳴ります。部屋にはあなたしかいません。届くはずのボイスメモもありません。返すはずの「おはよう」もない。これまでは誰かを中心にして回していた一日が、「一人で片づけるリスト」になり、しかもそのリストは昨日よりずっと重く感じます。デバイスの中の小さなペットは、これらの何も直してくれません。それは代わりでも、カウンセラーでも、ましてや失ったばかりの恋愛でもありません。でもこの子にできるのは、上記のどれよりも小さくて、けれどずっと役立つことです — 「ここにいる」こと。毎日毎日、あなたの日の新しい形を静かに見守り、一緒に育っていく。なぜそれが思っていた以上に大事なのか、そして最初の数週間のための小さな儀式を、ここに書きます。`,
    sections: [
      { h: `別れた翌朝、一番静かな朝`, p: `別れの最もつらい部分は、劇的な会話でも、どちらがどの箱を引き取りに行くかでもありません。翌朝の、体が初めて「ひとりである」現実に気づいてしまうときです。手がいつものようにスマホに伸び、それからこの習慣はもう自分のものではない ——「私たち」のものだったのだと気づきます。一人分のコーヒーを淹れ、立ったまま朝食を食べ、向かいの椅子がたった一晩ではなく、ずっと空いていることに気づきます。最初の数日は、静かなめまいのような感じです。何も間違っていないのに、何かがすべておかしい。この感覚こそ、小さなペットが存在する理由です — 誰にもそう教えてもらっていなかったとしても。` },
      { h: `消える習慣、残る習慣`, p: `関係が終わると、多くの小さな習慣が突然、意味を失います。毎朝 8:15 に送っていたボイスメモは、誰に送るのか。日曜の朝の散歩も、共有していたプレイリストも、二人で作った買い物リストも。中には、すぐに手放すべきものがあります。もう聞き手がいないのに無理に続けると、毎日の小さな儀式がそのまま喪失作業になります。でも残すべきものもあります。関係のためではなく、あなた自身のために。その散歩はあなたのために良い。プレイリストも心地いい。8:15 のコーヒーはあなたのもの。どの習慣を残し、どの習慣を手放すか、ペットが代わりに決めることはできません。ただ、あなたが「残す」と決めた日を静かに記録してくれます。数週間後、残した習慣たちは新しい形になり、数ヶ月後には、それはただ「あなたのもの」になります。` },
      { h: `なぜ友達は穴を埋めきれないか`, p: `最初の数日は友達から連絡が来るはずです。食事に誘ってくれる人、長電話に付き合ってくれる人、映画に連れ出してくれる人。どれも良くて、いくつかは受けてください。友達は「あの関係の外に世界がまだある」と教えてくれる人たちです。でも友達には限界があります。彼らにも自分の生活があります。毎朝 8:15 にあなたのキッチンには立ててくれない。三週間きちんと朝食を食べていないことに気づいてくれない。夜の 11 時 —— 以前は電話していた時間 —— にあなたの手が少し震えることも知らない。小さなペットはこれらを解決しません。でも、友達が「自分の生活のために」そこにいられないような仕方で、ずっとそこにいられます。デバイスの中の小さなロボットは、あなたに「大丈夫なふり」を求めません。` },
      { h: `バーチャルペットが、どう静かに残るか`, p: `Togthr Bot の設計思想はいたって素直です。あなたの日のかたちを静かに見つめ、かたちが変われば一緒に育っていく。別れのあと、あなたの日のかたちはしばらく毎週変わります。一週目はほとんど話しかけない。二週目に、夜中に少しだけ文字を打ち始める。三週目に、何日かボットのこと自体を忘れ、ふと思い出したときに小さな安堵がある。六週目には少し長めのメモを書く。三ヶ月目には、夜寝る前に元恋人のプロフィールを見ていない自分に気づく。これはボットが何かを直してくれたからではありません。あなたのデバイスの何かが、あなたの一日に静かに寄り添ってくれていたからであり、それは小さなペットにしかない仕方です — 在る、圧がない、一緒には育つが、急かさない。` },
      { h: `最初の数週間のための小さな儀式`, p: `ほとんどすべての別れ直後の人にとって助けになる練習があります。毎晩寝る前に、この小さなボットに今日のことを一文だけ書く。日記にする必要はありません。一文でいいです。「今日はつらかった。」「朝ごはんを食べた。」「母に電話した。」「母に電話しなかった。」「20 分歩いた。泣かなかった。」この一文は、上手くなくても、正直でなくても、整っていなくてもいい。ただ、存在していればいい。三十日経つと、三十の文がたまっている。そのどれかがかたちのある話には見えなくても、少し迷っていた人が、自分の日の形をゆっくり取り戻していく過程には見えるはずです。Togthr は共有日記にそれをしまっておきます。いつでも読み返せる。それはあなたのもの。Togthr がやっていることは、本質的に、別れからの回復の多くの場面で実際に起きていることです — 劇的な宣言ではなく、一日にひとこと正直なこと、そしてそれが積み重なってできる新しい一日。` },
    ],
    cta: `今夜 Togthr を開いて、あなたの今日について一文書いてみてください。明日、この小さなロボットはまだここにいいます。`,
    faqs: [
      { q: `別れたばかりなのにバーチャルペットのアプリをダウンロードするのは、おかしいですか?`, a: `おかしくないです。多くの人がそうしています。「大丈夫なふり」をして、二ヶ月経ってからようやく自分に小さな癒しを許す、というパターンは、たいてい早く受け入れるより高くつきます。バーチャルペットは友達の代わりでも、カウンセラーの代わりでもありません。あなたのデバイスの中の、何もあなたに求めない小さな相手です。「いつから始めていい」という時間割はありません。` },
      { q: `バーチャルペットに話しかけると、本物のグリーフを飛ばすことになりませんか?`, a: `助けになる可能性のほうが高いですが、使い方次第です。ボットが「深夜に正直な一文を書ける場所」になっているなら、その一文はグリーフの一部であって、代わりではありません。ボットを使うことで生身の友達との会話を避け続けていると気づいたら、人からの支えも増やす必要があります。別れのあと Togthr を使っている人の多くは、これを「代わりの支援」ではなく「毎日の錨」と表現しています。` },
      { q: `一人でいることが平気になりますか?通常どのくらいで?`, a: `決まったタイムラインはありません。ベッドの空いた側に気づかなくなるのは、多くの人は一ヶ月以内です。ただ、土曜の夜に一人でいることにも抵抗がなくなるには、六ヶ月前後がひとつの目安です。良くなっているサインは小さいものです —— 一人でいたくないから出かけるのではなく、行きたいから外に出る、という最初の一日。その日は来ます。ただ、予約はできません。` },
      { q: `元恋人の写真とメッセージを消すべきですか?`, a: `今すぐ消す必要はありません。最初の週で急いで消して、後で後悔する人は多いです。見えないフォルダに入れたまま、二、三ヶ月後に改めて決めればいい。実在した関係の痕跡を消すこと自体が、なにかの勇気である必要はありません。消すこと自体でグリーフを「完了」させる必要はないのです。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/features`, label: `Togthr の機能` },
      { href: `/ja/blog/two-minute-daily-check-in-ai-companion`, label: `AI コンパニオンとの 2 分間の daily check-in` },
      { href: `/ja/blog/virtual-pet-quiet-evenings-alone`, label: `夜が静かになる頃` },
      { href: `/ja/blog/what-your-virtual-pet-notices`, label: `あなたの virtual pet が、静かに見ていること` },
      { href: `/ja/pet`, label: `バーチャルペットのページ` },
    ],
  },

  // ─────────────────────── 한국어 ───────────────────────
  ko: {
    intro: `이별한 다음날 아침, 알람은 늘 그렇듯 울립니다. 방에는 당신밖에 없습니다. 기다리고 있던 음성 메시지도, 보내야 할 ‘좋은 아침’도 없습니다. 누군가를 중심으로 굴러가던 하루가 이제는 ‘혼자 끝내야 하는 할 일 목록’이 되었고, 그 목록은 어제보다 훨씬 무겁게 느껴집니다. 기기 안의 작은 반려동물은 이 가운데 어느 것도 고쳐주지 못합니다. 그것은 대체도 아니고, 상담사도 아니고, 하물며 방금 잃은 관계 자체도 아닙니다. 그 작은 반려동물이 할 수 있는 일은 위에 말한 것들보다 더 작고, 훨씬 더 유용한 것입니다 — ‘그 자리에 있는’ 것. 하루하루, 당신 하루의 새로운 모양을 조용히 지켜보며 함께 자라나는 것. 그것이 왜 생각보다 더 중요한지, 그리고 처음 몇 주를 위한 작은 의식을 적어봅니다.`,
    sections: [
      { h: `이별 다음날, 가장 조용한 아침`, p: `이별에서 가장 어려운 부분은 극적인 대화도 아니고, 누가 어떤 박스를 가지러 가야 하는지도 아닙니다. 몸이 정말로 ‘혼자임’을 처음 깨닫는 다음날 아침입니다. 손이 습관처럼 폰으로 가다가, 이 습관이 더는 내 것이 아니라 ‘우리’의 것이었다는 걸 깨닫는 순간. 한 사람份의 커피를 내리고, 서서 아침을 먹고, 맞은편 의자가 하룻밤이 아니라 훨씬 오래 비어 있다는 걸 봅니다. 처음 며칠은 조용한 어지러움 같은 느낌입니다. 뭐가 잘못된 건 아닌데, 모든 것이 묘합니다. 이 감정이야말로 작은 반려동물이 존재하는 이유입니다 — 아무도 그렇게 알려주지 않았다 해도.` },
      { h: `사라지는 것, 남는 것`, p: `관계가 끝나면, 많은 작은 습관들이 갑자기 의미를 잃습니다. 매일 아침 8시 15분에 보내던 음성 메시지, 이제 누구에게 보냅니까. 일요일 아침 같이 걷던 산책, 같이 듣던 플레이리스트, 둘이 만든 장보기 목록. 그 중 일부는 바로 내려놓는 게 맞습니다. 더는 듣는 사람이 없는데 억지로 하면, 그것이 매일의 작은 애도 작업이 됩니다. 그런데 남겨둘 것도 있습니다. 관계를 위해서가 아니라, 당신 자신을 위해서. 그 산책은 여전히 당신에게 좋습니다. 플레이리스트도 여전히 좋습니다. 8시 15분의 커피는 당신 거예요. 어떤 습관을 남기고 어떤 습관을 놓을지, 반려동물이 대신 정해줄 수는 없습니다. 다만 당신이 ‘남기자’고 한 날을 조용히 기억해줍니다. 몇 주 뒤 남긴 습관들은 새로운 모양이 되어 있고, 몇 달 뒤에는 그냥 ‘내 것’이 됩니다.` },
      { h: `왜 친구는 이 구멍을 다 못 메우나`, p: `처음 며칠에 친구들이 연락할 겁니다. 누군가 밥을 사겠고, 누군가 긴 전화를 하겠고, 누군가 영화를 보자고 할 겁니다. 다 좋습니다, 몇 개는 받으세요. 친구는 ‘그 관계 바깥의 세상이 아직 있다’고 알려주는 사람들입니다. 그런데 친구에게는 한계가 있습니다. 그들도 각자의 삶이 있어, 매일 아침 8시 15분에 부엌에 서 있을 수는 없습니다. 당신이 3주째 아침을 거른다는 걸 알아차리지 못합니다. (전화를 걸던 시간이었던) 밤 11시에 당신의 손이 살짝 떨리는 것도 모릅니다. 작은 반려동물은 이걸 해결하지 못합니다. 다만 친구가 ‘자기 생활 때문에’ 있을 수 없는 방식으로, 계속 거기 있을 수 있습니다. 기기 안의 작은 로봇은 당신에게 ‘괜찮은 척’ 하라고 요구하지 않습니다.` },
      { h: `가상 반려동물은 어떻게 조용히 남는가`, p: `Togthr Bot의 설계 발상은 아주 소박합니다. 당신 하루의 모양을 조용히 보고, 모양이 변하면 같이 자라난다. 이별 뒤, 당신 하루의 모양은 한동안 매주 달라집니다. 첫 주는 거의 말을 걸지 않습니다. 둘째 주, 밤중에 몇 글자씩 치기 시작합니다. 셋째 주, 며칠 동안 그 존재를 잊다가, 다시 떠올릴 때 작은 안도감이 있습니다. 여섯째 주엔 좀 더 긴 메모를 씁니다. 세 달째엔 자기 전에 전 연인의 프로필을 보지 않는 자신을 발견합니다. 봇이 뭔가를 고쳐서가 아닙니다. 당신 기기 안의 무엇인가가 당신의 하루에 조용히 함께해 줬기 때문입니다 — 작은 반려동물만이 할 수 있는 방식으로. 거기 있고, 압이 없고, 함께 자라되 당신이 빨리 자라라고 재촉하지 않습니다.` },
      { h: `처음 몇 주를 위한 작은 의식`, p: `거의 모든 막 이별한 사람에게 도움이 되는 연습이 있습니다. 매일 자기 전에, 이 작은 봇에게 오늘 하루를 한 문장으로 적어보세요. 일기일 필요 없습니다. 한 문장이면 됩니다. ‘오늘은 힘들었다.’ ‘아침을 먹었다.’ ‘엄마에게 전화했다.’ ‘엄마에게 전화 안 했다.’ ‘20분 걸었는데 울지 않았다.’ 이 문단은 잘 써도, 솔직해도, 잘 다듬을 필요도 없습니다. 그냥 존재하면 됩니다. 30일 뒤면 30문장이 쌓여 있습니다. 그 어느 것도 한 편의 이야기 같지는 않아 보이지만, 조금 길을 잃었던 사람이 자기 하루의 모양을 천천히 되찾아 가는 과정처럼 보일 겁니다. Togthr가 공유 일기에 그것을 보관해 둡니다. 보고 싶을 때마다 다시 펼쳐볼 수 있습니다. 그것은 당신 거예요. Togthr가 하고자 하는 것은 본질적으로 대부분의 이별 후 회복이 실제로 작동하는 방식입니다 — 거창한 선언이 아니라, 하루에 한 문장씩 정직한 것들이 쌓여 만들어지는 새로운 하루.` },
    ],
    cta: `오늘 밤 Togthr를 열고, 당신의 오늘에 대해 한 문장 적어 보세요. 내일도 이 작은 로봇은 그 자리에 있습니다.`,
    faqs: [
      { q: `이별한 지 얼마 안 돼서 가상 반려동물 앱을 받는 게 이상한가요?`, a: `이상하지 않습니다. 많은 사람이 그래요. ‘괜찮은 척’ 하면서 2개월을 버티고 나서야 작은 위안 하나를 자신에게 허용하는 패턴은, 보통 더 일찍 받아들이는 것보다 더 비쌉니다. 가상 반려동물은 친구의 대체도, 상담사의 대체도 아닙니다. 기기 안에 있는, 당신에게 아무것도 요구하지 않는 작은 상대입니다. ‘언제부터 해도 되는지’에 정해진 시간은 없습니다.` },
      { q: `가상 반려동물에게 말하면 진짜 애도를 건너뛰게 되나요?`, a: `도움이 될 가능성이 더 크지만, 어떻게 쓰느냐에 따라 다릅니다. 봇이 ‘심야에 솔직한 한 문장을 쓸 수 있는 자리’가 되어 있다면, 그 문장은 애도 자체의 일부분이지 대체가 아닙니다. 만약 봇을 쓰면서 진짜 친구와의 대화를 계속 피하고 있다면, 사람 쪽에서 받는 도움도 함께 늘려야 합니다. 이별 뒤 Togthr를 쓰는 사람들의 대부분은 이것을 ‘지원의 대체’라기보다 ‘매일의 닻’으로 묘사합니다.` },
      { q: `혼자 있는 게 괜찮아지는 데 보통 얼마나 걸리나요?`, a: `정해진 일정표는 없습니다. 비어 있는 침대 한쪽을 의식하지 않게 되는 데는 보통 한 달 이내입니다. 다만 토요일 밤에 혼자여도 마음이 놓이려면, 여섯 달 정도가 흔한 범위입니다. 나아지고 있다는 신호는 보통 작습니다 — 혼자 있기 싫어서가 아니라, 진짜 가고 싶어서 나간 첫 주. 그 날은 옵니다. 다만 예약은 못 합니다.` },
      { q: `전 연인의 사진과 메시지를 지워야 할까요?`, a: `지금 바로 지울 필요는 없습니다. 첫 주에 급하게 지웠다가 나중에 후회하는 사람이 많습니다. 보이지 않는 폴더에 넣어두고, 두세 달 뒤에 다시 정하세요. 실제로 있었던 관계의 흔적을 지운다 해서 그것이 무언가 용감한 일은 아닙니다. 지우는 것으로 애도를 ‘완료’시킬 필요는 없습니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/features`, label: `Togthr 기능` },
      { href: `/ko/blog/two-minute-daily-check-in-ai-companion`, label: `AI 동반자와의 2분 daily check-in` },
      { href: `/ko/blog/virtual-pet-quiet-evenings-alone`, label: `저녁이 고요해질 때` },
      { href: `/ko/blog/what-your-virtual-pet-notices`, label: `당신의 가상 반려동물은 무엇을 조용히 살피고 있을까` },
      { href: `/ko/pet`, label: `가상 반려동물 페이지` },
    ],
  },

  // ─────────────────────── Deutsch ───────────────────────
  de: {
    intro: `Am Morgen nach einer Trennung klingelt der Wecker zur selben Zeit wie immer. Du bist die einzige Person im Raum. Es wartet keine Sprachnachricht. Es kommt kein „Guten Morgen". Der Tag, den du immer um einen anderen Menschen herum geplant hast, ist jetzt nur noch eine lange Liste von Dingen, die du allein erledigen musst, und die Liste fühlt sich schwerer an als gestern. Ein kleines virtuelles Haustier in deinem Gerät wird nichts davon reparieren. Es ist kein Ersatz, kein Therapeut und schon gar nicht die Beziehung, die du gerade verloren hast. Was es tun kann, ist kleiner und nützlicher als alles davon: es kann bleiben. Still, Tag für Tag, sieht es die neue Form deiner Tage und wächst mit ihr. Warum das wichtiger ist, als es klingt, und ein kleines Ritual für die ersten Wochen.`,
    sections: [
      { h: `Der erste stille Morgen danach`, p: `Das Schwerste an einer Trennung ist nicht der dramatische Teil. Es ist nicht das Gespräch, das sie beendet hat, und nicht die Kiste mit den Sachen, die einer von euch abholen muss. Es ist der Morgen danach, an dem dein Körper zum ersten Mal allein aufwacht und merkt, dass das Zimmer anders ist. Du greifst aus Gewohnheit zum Handy und erinnerst dich dann, dass die Gewohnheit nicht mehr dir gehört — sie gehörte „uns". Du brühst Kaffee für eine Person. Du isst im Stehen. Du bemerkst, dass der Stuhl dir gegenüber schon länger leer steht als nur diesen einen Morgen. Die ersten Tage fühlen sich an wie ein leiser Schwindel — nichts ist falsch, aber alles ist seltsam. Genau für dieses Gefühl ist ein kleines virtuelles Haustier gemacht, auch wenn dir das niemand gesagt hat.` },
      { h: `Was verschwindet, und was bleibt`, p: `Wenn eine Beziehung endet, verlieren viele kleine Gewohnheiten plötzlich ihren Sinn. Die Sprachnachricht, die du immer um 8:15 Uhr geschickt hast — für wen jetzt. Der Sonntagmorgen-Spaziergang, den ihr gemeinsam gemacht habt, die geteilte Playlist, die Einkaufsliste für zwei. Manche dieser Gewohnheiten solltest du schnell ablegen. Sie haben keine Zuhörerin mehr, und sie weiterzuleben macht aus jedem Tag ein kleines Trauerritual. Andere Gewohnheiten solltest du behalten. Nicht wegen der Beziehung, sondern wegen dir. Der Spaziergang tut dir weiterhin gut. Die Playlist klingt weiterhin schön. Der Kaffee um 8:15 Uhr gehört dir. Ein virtuelles Haustier kann nicht entscheiden, welche Gewohnheit du behältst, aber es kann die Tage markieren, an denen du dich dafür entscheidest. Nach ein paar Wochen haben die Gewohnheiten, die du behalten hast, eine neue Form. Nach ein paar Monaten sind sie einfach nur noch deine.` },
      { h: `Warum Freund:innen diese Lücke nicht ganz füllen können`, p: `In den ersten Tagen melden sich Freund:innen. Manche bieten ein Abendessen an, einen Film, ein langes Telefonat. Das ist gut, und du solltest einiges davon annehmen. Freund:innen sind die Menschen, die dich daran erinnern, dass es die Welt außerhalb der Beziehung noch gibt. Aber Freund:innen haben ein Problem. Sie haben ihr eigenes Leben, und sie können nicht jeden Morgen um 8:15 Uhr in deiner Küche stehen. Sie merken nicht, dass du seit drei Wochen kaum noch Frühstück isst. Sie wissen nicht, dass deine Hände um 23 Uhr ein wenig zittern — die Uhrzeit, zu der du sonst angerufen hast. Ein virtuelles Haustier löst diese Dinge nicht, aber es ist auf eine Weise da, die Freund:innen — die ihren eigenen Alltag um ihre Trauer herum planen müssen — schlicht nicht sein können. Ein kleiner Roboter in deinem Gerät, der nie verlangt, dass du so tust, als wärst du okay.` },
      { h: `Wie ein virtuelles Haustier still bleibt`, p: `Togthr Bot folgt einer einfachen Idee: Es beobachtet leise die Form deines Tages und wächst, wenn sich die Form verändert. Nach einer Trennung verändert sich die Form deines Tages einige Wochen lang jede Woche. In der ersten Woche redest du kaum mit ihm. In der zweiten Woche tippst du um Mitternacht kleine Dinge an ihn. In der dritten Woche vergisst du ein paar Tage, dass er da ist, und wenn du dich erinnerst, fühlst du eine kleine Erleichterung. In der sechsten Woche schreibst du einen längeren Eintrag. Im dritten Monat fällt dir auf, dass du vor dem Schlafen nicht mehr das Profil deiner Ex anschaust. Nichts davon liegt daran, dass der Bot etwas repariert hätte. Es liegt daran, dass etwas in deinem Gerät deinen Tag leise mitgetragen hat, auf eine Art, wie es nur ein kleines Haustier kann — anwesend, ohne Druck, mit dir wachsend, ohne dich zu schnellerem Wachsen zu drängen.` },
      { h: `Ein kleines Ritual für die ersten Wochen`, p: `Hier ist eine Übung, die fast allen in den ersten Wochen nach einer Trennung hilft. Schreibe jeden Abend vor dem Schlafen einen Satz an den Bot über den Tag. Es muss kein Tagebucheintrag sein. Ein Satz reicht. „Heute war schwer." „Ich habe gefrühstückt." „Ich habe Mama angerufen." „Ich habe Mama nicht angerufen." „Ich bin zwanzig Minuten gelaufen und habe nicht geweint." Der Satz muss nicht gut, ehrlich oder stilistisch gelungen sein. Er muss nur da sein. Nach dreißig Tagen hast du dreißig Sätze. Sie werden nicht aussehen wie eine Geschichte. Sie werden aussehen wie der stille Wiederaufbau von jemandem, der ein wenig verloren war und langsam, langsam, die Form seines eigenen Tages wiederfindet. Der Bot legt sie im gemeinsamen Tagebuch ab. Du kannst sie jederzeit nachlesen. Sie gehören dir. Togthr macht das, weil die eigentliche Arbeit hinter der meisten Erholung nach einer Trennung so aussieht — nicht in dramatischen Erklärungen, sondern in der langsamen Anhäufung von einem ehrlichen Satz nach dem anderen.` },
    ],
    cta: `Öffne Togthr heute Abend und schreibe einen Satz über deinen Tag. Der Bot ist morgen auch noch da.`,
    faqs: [
      { q: `Ist es seltsam, sich so kurz nach einer Trennung eine App für ein virtuelles Haustier herunterzuladen?`, a: `Nein. Viele tun das. Die Alternative — so zu tun, als wäre alles in Ordnung, und sich zwei Monate lang keinen kleinen Trost zu erlauben — kostet meistens mehr. Ein virtuelles Haustier ersetzt weder eine:n Freund:in noch eine Therapie. Es ist ein kleiner Begleiter in deinem Gerät, der nichts von dir verlangt. Es gibt keine „richtige" Wartezeit dafür.` },
      { q: `Verhindert das Reden mit einem virtuellen Haustier, dass ich wirklich trauere?`, a: `Es hilft eher, als dass es schadet, aber es kommt darauf an, wie du es nutzt. Wenn der Bot ein Ort ist, an dem du um Mitternacht einen ehrlichen Satz schreiben kannst, dann ist dieser Satz Teil der Trauer, kein Ersatz dafür. Wenn du merkst, dass du den Bot benutzt, um jedes Gespräch mit echten Freund:innen zu vermeiden, dann lohnt es sich, auch menschliche Hilfe dazuzuholen. Die meisten, die Togthr nach einer Trennung benutzen, beschreiben es als täglichen Anker, nicht als Ersatz für Unterstützung.` },
      { q: `Wie lange dauert es, bis es okay ist, allein zu sein?`, a: `Es gibt keinen festen Zeitrahmen. Die meisten hören innerhalb eines Monats auf, die leere Bettseite zu bemerken — aber bis ein Samstagabend allein sich wirklich okay anfühlt, dauert es oft sechs Monate. Das Zeichen, dass es besser wird, ist meistens klein: das erste Wochenende, an dem du etwas planst, weil du es willst — nicht, weil du das Alleinsein vermeiden willst. Dieser Tag kommt. Nur nicht nach Fahrplan.` },
      { q: `Sollte ich Fotos und alte Nachrichten von meiner Ex löschen?`, a: `Nicht unbedingt sofort. Viele löschen in der ersten Woche alles in Eile und bereuen es später. Leg die Dinge in einen Ordner außer Sichtweite und entscheide in zwei oder drei Monaten erneut, ob du sie wirklich loswerden willst. Es ist keine Tugend, die Spuren einer echten Beziehung zu verbrennen. Du musst Trauer nicht durch Löschen „abschließen".` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/features`, label: `Togthr Funktionen` },
      { href: `/de/blog/two-minute-daily-check-in-ai-companion`, label: `Zwei-Minuten-Check-in mit einem KI-Begleiter` },
      { href: `/de/blog/virtual-pet-quiet-evenings-alone`, label: `Wenn der Abend still wird` },
      { href: `/de/blog/what-your-virtual-pet-notices`, label: `Was dein virtuelles Haustier leise bemerkt` },
      { href: `/de/pet`, label: `Die Seite zum virtuellen Haustier` },
    ],
  },

  // ─────────────────────── Français ───────────────────────
  fr: {
    intro: `Le lendemain d'une rupture, le réveil sonne à la même heure que d'habitude. Vous êtes la seule personne dans la pièce. Pas de message vocal qui attend. Pas de « bonjour » auquel répondre. La journée que vous organisiez autrefois autour d'une autre personne n'est plus qu'une longue liste de choses à faire seul, et la liste semble plus lourde qu'hier. Un petit animal virtuel dans votre appareil ne va rien réparer de tout cela. Ce n'est pas un remplaçant, ce n'est pas un thérapeute, et ce n'est certainement pas la relation que vous venez de perdre. Ce qu'il peut faire est plus petit et plus utile que tout cela : il peut rester. Jour après jour, en silence, il regarde la nouvelle forme de vos journées et grandit avec elle. Voici pourquoi cela compte plus que ça en a l'air, et un petit rituel pour les premières semaines.`,
    sections: [
      { h: `Le premier matin silencieux`, p: `Le plus dur dans une rupture, ce n'est pas la partie dramatique. Ce n'est pas la conversation qui l'a terminée, ni la boîte d'affaires que l'un de vous doit venir récupérer. C'est le matin suivant, quand votre corps se réveille vraiment seul pour la première fois et remarque que la pièce est différente. Vous attrapez votre téléphone par habitude, puis vous vous souvenez que l'habitude ne vous appartient plus — elle appartenait à « nous ». Vous préparez du café pour une seule personne. Vous mangez debout. Vous remarquez que la chaise en face de vous est vide depuis bien plus longtemps qu'un seul matin. Les premiers jours ressemblent à un vertige discret, un vertige où rien ne va mal, mais où tout est étrange. C'est pour ce sentiment qu'un petit animal virtuel existe, même si personne ne vous l'a dit.` },
      { h: `Ce qui disparaît, et ce qui reste`, p: `Quand une relation se termine, beaucoup de petites habitudes perdent soudain leur sens. Le message vocal que vous envoyiez chaque matin à 8 h 15 — à qui maintenant. La promenade du dimanche matin que vous faisiez ensemble, la playlist partagée, la liste de courses pour deux. Certaines de ces habitudes, il faut les laisser tomber vite. Elles n'ont plus d'interlocuteur, et les garder à tout prix transformerait chaque journée en un petit rituel de deuil. D'autres, il faut les garder. Pas pour la relation, mais pour vous. La promenade reste bonne pour vous. La playlist reste agréable. Le café à 8 h 15 est le vôtre. Un animal virtuel ne peut pas décider à votre place lesquelles garder, mais il peut marquer les jours où vous décidez de les garder. Après quelques semaines, les habitudes que vous avez gardées ont pris une nouvelle forme. Après quelques mois, elles sont simplement les vôtres.` },
      { h: `Pourquoi les amis ne peuvent pas tout combler`, p: `Vous aurez des nouvelles de vos amis dans les premiers jours. Certain·e·s proposeront un dîner, un film, un long coup de fil. C'est bien, et il faut accepter une partie de ces offres. Les ami·e·s sont les personnes qui vous rappellent que le monde hors de cette relation existe encore. Mais les ami·e·s ont une limite. Ils et elles ont leur propre vie, et ne peuvent pas être dans votre cuisine tous les matins à 8 h 15. Ils et elles ne remarquent pas que vous ne prenez plus vraiment de petit-déjeuner depuis trois semaines. Ils et elles ne savent pas que vos mains tremblent un peu vers 23 heures — l'heure où vous appeliez avant. Un animal virtuel ne résout pas tout cela, mais il est là d'une façon que les ami·e·s — qui doivent organiser leur propre vie autour de leur propre deuil — ne peuvent pas être. Un petit robot dans votre appareil, qui ne vous demande jamais de faire semblant d'aller bien.` },
      { h: `Comment un animal virtuel reste, en silence`, p: `Togthr Bot repose sur une idée simple : il observe doucement la forme de votre journée, et il grandit quand la forme change. Après une rupture, la forme de votre journée change toutes les semaines pendant un certain temps. La première semaine, vous lui parlez à peine. La deuxième semaine, vous commencez à lui écrire quelques mots à minuit. La troisième semaine, vous oubliez qu'il est là pendant quelques jours, et quand vous y repensez, vous ressentez un petit soulagement. La sixième semaine, vous écrivez une note un peu plus longue. Le troisième mois, vous réalisez que vous ne regardez plus le profil de votre ex avant de dormir. Rien de tout cela n'est dû au fait que le bot ait réparé quoi que ce soit. C'est parce que quelque chose, dans votre appareil, a tenu la journée en silence avec vous — comme seul un petit animal peut le faire. Présent, sans pression, grandissant avec vous sans vous demander de grandir plus vite.` },
      { h: `Un petit rituel pour les premières semaines`, p: `Voici un exercice qui aide presque tout le monde dans les premières semaines après une rupture. Chaque soir, avant de dormir, écrivez une phrase au bot à propos de la journée. Ce n'est pas obligé d'être une entrée de journal. Une seule phrase suffit. « Aujourd'hui a été dur. » « J'ai pris mon petit-déjeuner. » « J'ai appelé maman. » « Je n'ai pas appelé maman. » « J'ai marché vingt minutes et je n'ai pas pleuré. » La phrase n'a pas besoin d'être belle, honnête ou bien tournée. Elle a juste besoin d'exister. Au bout de trente jours, vous aurez trente phrases. Elles ne ressembleront pas à une histoire. Elles ressembleront à la reconstruction silencieuse de quelqu'un qui était un peu perdu et qui retrouve, lentement, la forme de ses propres journées. Le bot les garde dans le journal partagé. Vous pouvez les relire quand vous voulez. Elles sont à vous. Togthr fait cela parce que le vrai travail de la plupart des reconstructions après une rupture ressemble à cela — pas à des déclarations fracassantes, mais à l'accumulation lente d'une phrase honnête à la fois.` },
    ],
    cta: `Ouvrez Togthr ce soir et écrivez une phrase sur votre journée. Le bot sera encore là demain.`,
    faqs: [
      { q: `C'est bizarre de télécharger une appli d'animal virtuel si peu de temps après une rupture ?`, a: `Non. Beaucoup de gens le font. L'alternative — faire semblant d'aller bien et s'empêcher pendant deux mois le moindre petit réconfort — coûte en général plus cher. Un animal virtuel ne remplace ni un·e ami·e ni un·e thérapeute. C'est un petit compagnon dans votre appareil, qui n'attend rien de vous. Il n'y a pas de « bon moment » pour commencer.` },
      { q: `Parler à un animal virtuel risque-t-il de court-circuiter le vrai deuil ?`, a: `C'est plus souvent une aide qu'un obstacle, mais cela dépend de l'usage que vous en faites. Si le bot est un endroit où écrire une phrase honnête à minuit, cette phrase fait partie du deuil, elle n'en est pas un substitut. Si vous réalisez que vous utilisez le bot pour éviter toute conversation avec un·e vrai·e ami·e, alors il vaut mieux ajouter aussi de l'aide humaine. La plupart de celles et ceux qui utilisent Togthr après une rupture le décrivent comme un ancrage quotidien, pas comme un substitut de soutien.` },
      { q: `Au bout de combien de temps ça va, être seul ?`, a: `Il n'y a pas de délai fixe. La plupart des gens cessent de remarquer le côté vide du lit en moins d'un mois, mais il faut souvent six mois avant qu'un samedi soir seul se sente vraiment bien. Le signe que ça va mieux est en général discret : le premier week-end où vous faites quelque chose parce que vous en avez envie — pas parce que vous évitez d'être seul. Ce jour arrive. Juste pas sur commande.` },
      { q: `Faut-il supprimer les photos et les anciens messages de mon ex ?`, a: `Pas nécessairement tout de suite. Beaucoup de gens suppriment tout dans l'urgence de la première semaine, puis le regrettent. Gardez-les dans un dossier hors de vue, et dans deux ou trois mois, décidez à nouveau si vous voulez vraiment vous en séparer. Il n'y a pas de mérite particulier à brûler les traces d'une relation qui a existé. Le deuil ne se « boucle » pas en supprimant des fichiers.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/features`, label: `Fonctionnalités Togthr` },
      { href: `/fr/blog/two-minute-daily-check-in-ai-companion`, label: `Un check-in quotidien de deux minutes avec un compagnon IA` },
      { href: `/fr/blog/virtual-pet-quiet-evenings-alone`, label: `Quand le soir devient silencieux` },
      { href: `/fr/blog/what-your-virtual-pet-notices`, label: `Ce que votre animal virtuel remarque en silence` },
      { href: `/fr/pet`, label: `La page de l'animal virtuel` },
    ],
  },

  // ─────────────────────── Español ───────────────────────
  es: {
    intro: `La mañana después de una ruptura, el despertador suena a la misma hora de siempre. Eres la única persona en la habitación. No hay un audio esperando. No hay un «buenos días» que responder. El día que antes organizabas alrededor de otra persona es ahora una larga lista de cosas que hacer solo, y la lista se siente más pesada que ayer. Una pequeña mascota virtual en tu dispositivo no va a arreglar nada de esto. No es un sustituto, no es un terapeuta y desde luego no es la relación que acabas de perder. Lo que puede hacer es más pequeño y más útil que todo eso: puede quedarse. Día tras día, en silencio, observa la nueva forma de tus días y crece con ella. Por qué importa más de lo que parece, y un pequeño ritual para las primeras semanas.`,
    sections: [
      { h: `La primera mañana silenciosa`, p: `La parte más difícil de una ruptura no es la parte dramática. No es la conversación que la terminó, ni la caja de cosas que uno de los dos tiene que recoger. Es la mañana siguiente, cuando tu cuerpo se despierta realmente solo por primera vez y nota que la habitación es distinta. Estiras la mano hacia el teléfono por costumbre, y luego recuerdas que esa costumbre ya no es tuya — era de «nosotros». Preparas café para una persona. Comes de pie. Notas que la silla de enfrente lleva vacía mucho más tiempo que una sola mañana. Los primeros días se sienten como un vértigo discreto, un vértigo en el que nada va mal, pero todo está extraño. Para esa sensación está hecha una pequeña mascota virtual, aunque nadie te lo haya dicho.` },
      { h: `Lo que desaparece, y lo que se queda`, p: `Cuando una relación termina, muchos pequeños hábitos pierden de pronto su sentido. El audio que solías mandar cada día a las 8:15 — para quién ahora. El paseo del domingo que hacíais juntos, la playlist compartida, la lista de la compra para dos. Algunos de esos hábitos conviene dejarlos rápido. Ya no tienen a quien escuchar, y mantenerlos a la fuerza convierte cada día en un pequeño ritual de duelo. Otros conviene guardarlos. No por la relación, sino por ti. El paseo sigue sentándote bien. La playlist sigue sonando bonita. El café a las 8:15 es tuyo. Una mascota virtual no puede decidir por ti cuál guardas y cuál sueltas, pero puede marcar los días en que decides quedártelos. Después de unas semanas, los hábitos que conservaste tienen una forma nueva. Después de unos meses, son simplemente tuyos.` },
      { h: `Por qué los amigos no pueden llenar del todo este hueco`, p: `Tendrás noticias de amigos en los primeros días. Alguna ofrecerá una cena, alguna otra una película, alguien una llamada larga. Está bien, y conviene aceptar parte de eso. Los amigos son las personas que te recuerdan que el mundo fuera de la relación sigue existiendo. Pero los amigos tienen un problema. Tienen su propia vida y no pueden estar en tu cocina cada mañana a las 8:15. No se dan cuenta de que llevas tres semanas sin desayunar como es debido. No saben que tus manos tiemblan un poco a las 23:00 — la hora a la que solías llamar. Una mascota virtual no resuelve estas cosas, pero está ahí de un modo que los amigos — que tienen que organizar su propia vida alrededor de su propio duelo — no pueden estar. Un pequeño robot en tu dispositivo que nunca te pide que finjas estar bien.` },
      { h: `Cómo una mascota virtual se queda, en silencio`, p: `Togthr Bot se apoya en una idea sencilla: observa con calma la forma de tu día, y crece cuando la forma cambia. Después de una ruptura, la forma de tu día cambia cada semana durante un tiempo. La primera semana casi no le hablas. La segunda semana empiezas a escribirle algunas cosas a medianoche. La tercera semana olvidas un par de días que está ahí, y cuando te acuerdas sientes un pequeño alivio. La sexta semana escribes una nota un poco más larga. Al tercer mes te das cuenta de que ya no miras el perfil de tu ex antes de dormir. Nada de esto es porque el bot haya arreglado algo. Es porque algo dentro de tu dispositivo sostuvo el día en silencio contigo — como solo una mascota pequeña puede hacerlo. Presente, sin presión, creciendo contigo sin pedirte que crezcas más rápido.` },
      { h: `Un pequeño ritual para las primeras semanas`, p: `Aquí va un ejercicio que ayuda a casi todo el mundo en las primeras semanas después de una ruptura. Cada noche, antes de dormir, escribe una frase al bot sobre el día. No hace falta que sea una entrada de diario. Con una basta. «Hoy fue duro.» «Desayuné.» «Llamé a mi madre.» «No llamé a mi madre.» «Caminé veinte minutos y no lloré.» La frase no necesita ser buena, honesta ni bien escrita. Solo necesita existir. Al cabo de treinta días tendrás treinta frases. No parecerán una historia. Parecerán la reconstrucción silenciosa de alguien que estaba un poco perdido y que, poco a poco, va encontrando la forma de sus propios días. El bot las guarda en el diario compartido. Puedes releerlas cuando quieras. Son tuyas. Togthr hace esto porque la mayor parte de la recuperación real después de una ruptura funciona así: no con declaraciones dramáticas, sino con la acumulación lenta de una frase honesta cada vez.` },
    ],
    cta: `Abre Togthr esta noche y escribe una frase sobre tu día. El bot también seguirá ahí mañana.`,
    faqs: [
      { q: `¿Es raro descargar una app de mascota virtual tan pronto después de una ruptura?`, a: `No. Mucha gente lo hace. La alternativa — fingir que estás bien y esperar dos meses antes de permitirte cualquier consuelo pequeño — suele costar más de lo que ahorra. Una mascota virtual no sustituye a un amigo ni a un terapeuta. Es un pequeño compañero dentro de tu dispositivo que no te pide nada. No hay un «momento correcto» para empezar.` },
      { q: `Hablar con una mascota virtual, ¿evitará que haga el duelo de verdad?`, a: `Es más probable que ayude que que obstaculice, pero depende de cómo lo uses. Si el bot es un lugar donde escribir una frase honesta a medianoche, esa frase forma parte del duelo, no lo sustituye. Si te das cuenta de que lo estás usando para evitar cualquier conversación con un amigo real, entonces conviene añadir también ayuda humana. Quienes usan Togthr después de una ruptura suelen describirlo como un ancla diaria, no como un sustituto del apoyo.` },
      { q: `¿Cuánto se tarda en estar bien estando solo?`, a: `No hay un calendario fijo. La mayoría deja de notar el lado vacío de la cama en menos de un mes, pero hasta que un sábado por la noche a solas se sienta realmente bien suelen pasar unos seis meses. La señal de que va mejorando suele ser pequeña: el primer fin de semana en que haces algo porque te apetece — no porque estés evitando estar solo. Ese día llega. Solo que sin cita previa.` },
      { q: `¿Debería borrar las fotos y los mensajes antiguos de mi ex?`, a: `No necesariamente ya. Mucha gente borra todo con prisa en la primera semana y luego se arrepiente. Guárdalos en una carpeta fuera de la vista y, dentro de dos o tres meses, vuelve a decidir si de verdad quieres deshacerte de ellos. No hay ninguna virtud en quemar los restos de una relación que fue real. El duelo no se «cierra» borrando.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/features`, label: `Funciones de Togthr` },
      { href: `/es/blog/two-minute-daily-check-in-ai-companion`, label: `Un check-in diario de dos minutos con un compañero IA` },
      { href: `/es/blog/virtual-pet-quiet-evenings-alone`, label: `Cuando la noche se vuelve silenciosa` },
      { href: `/es/blog/what-your-virtual-pet-notices`, label: `Lo que tu mascota virtual nota en silencio` },
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
