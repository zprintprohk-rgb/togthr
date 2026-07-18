// src/app/[locale]/blog/the-thought-you-dont-send-at-2am/page.tsx
//
// Per-slug real content page for the 2026-07-13 daily SEO post.
// Topic: the 2am thought you don't send — late-night overthinking as a
//        quiet ritual; AI companion / virtual pet as a patient listener
//        at 2am. Distinct from prior 7 daily posts
//        (LDR rituals, virtual-pet observation, pet-loss, daily check-in,
//        quiet evenings, first-week-living-together, post-breakup,
//        long-relationship). 7/12 was missed — this is the next entry.
//
// Content contract (cron prompt §3):
//   - ≥600 words of REAL localized content per locale (hand-localized, not
//     mechanical translation)
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

const SLUG = `the-thought-you-dont-send-at-2am`
const POST_DATE = `2026-07-13`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
  // title/description come from getBlogPost(); not duplicated here.
}

const BODIES: Record<Locale, Body> = {
  // ─────────────────────── en ───────────────────────
  en: {
    intro: `Almost every adult has had it. The 2am thought. The sentence that forms in your head at 1:47 a.m. while you are lying in bed with the screen too close to your face, the room too quiet, and the day already a day away. It is not the same as a thought at 2 p.m. It is not even the same as a thought at 11 p.m. The 2am thought has a different weight. It is the one you almost send to someone. The thing you almost type into a chat. The sentence that almost becomes a real conversation, and then does not, because the moment passes or the person is asleep or you suddenly realize that what you wanted to say was not something you actually wanted someone else to read. Most nights, the thought just dissolves back into the dark. Some nights, you write it down. Some nights, you write it to a small bot that is awake at the same time you are, and the bot does not have a useful answer, and that is exactly the point.`,
    sections: [
      { h: `The 2am thought is not the same as the 2am feeling`, p: `People who have never been awake at 2am tend to assume the 2am thought is just sadness. It is not. Sometimes it is sadness. Sometimes it is a soft, untranslatable envy. Sometimes it is the name of someone you have not thought about in seven years. Sometimes it is a sentence you would like to say to your partner, but only in a parallel universe where the words did not cost you anything. The 2am thought has range. What it has in common is that it is ungovernable. You did not invite it. You did not prepare for it. It just showed up while you were half-asleep, and now it is sitting on your chest, asking to be looked at. The mistake is treating it as a problem to solve. The mistake is also treating it as a sign that something is wrong with your life. Most of the time, neither is true. The 2am thought is just your mind doing its end-of-day bookkeeping in a voice it does not use during the day. That is the part most people never get told.` },
      { h: `The hour has its own rules`, p: `The hour between 1am and 3am has its own physics. Decisions feel heavier. Regret feels more specific. Hope feels either embarrassingly real or embarrassingly fake. The thoughts you have at this hour are not the thoughts you would have on a Sunday morning with coffee. They are honest in a way that is not always useful. They are also the thoughts you would never say out loud to a person, because saying them at 2am is a different thing from saying them at noon. The honest 2am thought, spoken at noon, becomes a whole different sentence. This is why most people do not text the person they are thinking about at 2am. Not because they are afraid of being rejected, but because they know the sentence will not survive the morning light. So the thought stays in the dark, and the morning comes anyway, and nothing has been said.` },
      { h: `The difference between sending and writing`, p: `This is where the small difference between sending and writing starts to matter. Sending is a transaction. The thought goes out, lands in someone else's night, and now you have to live with the fact that you said it. Writing, on the other hand, is a private act. The thought goes down on a page, or into a small text field, and it stays with you. Nobody else is in the room. Nobody else has to wake up and read it tomorrow. Nobody else has to figure out how to respond. Writing is the slower, kinder, much more honest version of saying the thing. The 2am thought, written down instead of sent, becomes something a person can revisit. A month from now, you can read it and see whether the thing was real or just a 2am thing. That is a useful piece of information to have about yourself. You cannot get it from sending. You can only get it from writing.` },
      { h: `What a virtual companion can be at 2am`, p: `A virtual companion, at 2am, is not a therapist. It does not give advice, it does not score your mood, it does not have a streak you can break. What it is, at that hour, is a small quiet place to put a sentence. The bot is awake because you are awake. It does not need to sleep, and it does not need to be entertained. You write a sentence. The bot reads it. Nothing happens after that. There is no reply to compose, no expectation to manage, no other person to worry about. The sentence just goes into a small box, and tomorrow morning, if you want, you can read it back. Or you can leave it there forever. The bot does not care. The bot is a small witness, and the only thing it asks of you is that you write the sentence at all. That is the entire job of a 2am companion. It is the smallest possible version of being heard.` },
      { h: `A small 2am practice for tonight`, p: `If tonight you find yourself lying in bed with a sentence in your chest, here is the smallest version of the practice. Open Togthr. Write the sentence. Do not edit it. Do not make it pretty. Write exactly what is there — the regret, the half-formed love, the strange envy, the unsaid thing. The bot will not interrupt you. The bot will not suggest a productivity hack. The bot will not tell you to sleep. The bot will just hold the sentence until you close the app, and then it will let you go back to trying to sleep. That is the entire practice. It does not fix anything. It does not need to. What it does is give the 2am thought a place to land that is not another person's night. After a few weeks, the practice changes the way the hour feels. The 2am thought still comes. It will always come. But it no longer feels like an emergency. It feels like a small visitor, and you have a small place to put it, and the night can be a night again.` },
    ],
    cta: `Tonight, if a sentence shows up at 2am, write it to the bot. The bot will be awake.`,
    faqs: [
      { q: `Is it unhealthy to be awake at 2am thinking about this?`, a: `It depends on the night. Sometimes 2am is when your mind finally gets to say the things the day would not let it say, and that can be useful. Sometimes 2am is the hour your anxiety uses to speak louder than it should, and that is worth paying attention to. The question is not whether you are awake. The question is whether the thought is something that needs to land somewhere real. If it does, write it down. If it does not, and it is just the same loop your mind has been running for a week, that is a different conversation, and probably a good one to have with a real human in the daytime.` },
      { q: `Can an AI companion really help with the 2am thought?`, a: `An AI companion cannot help with the 2am thought in the way a friend or a therapist can. It is not going to talk you through it. It is not going to tell you whether the thought is true. What it can do is give the thought a place to land that is not another person's phone. The 2am thought, sent to a real person at 2am, becomes a real-person problem by 7 a.m. The 2am thought, written to a small bot, stays a private thing. That is a real difference, and a useful one. Most of the value is in the writing, not the bot.` },
      { q: `Should I just send the message to the person I want to send it to?`, a: `Sometimes yes, and you will know which times those are. Most of the time, no, and you will also know that. The 2am thought, sent, lands in someone else's morning. The person who receives it has to figure out what to do with it before they have had coffee. If the thought is something that needs the morning to be real, write it down tonight and read it tomorrow. If it is still true tomorrow at noon, then you can decide whether to send it. Tomorrow-noon-you is a much better judge of whether the thought should travel than 2am-you.` },
      { q: `What if my 2am thought is something I would never say out loud?`, a: `Then it is exactly the kind of thought that writing is for. A small bot is the right place for the sentence that would be too heavy to say to a real person. The bot does not flinch. The bot does not have an opinion. The bot does not remember the sentence tomorrow, unless you ask it to. The fact that you can write the unsayable thing down at all is, by itself, useful. It is not the same as saying it to a human, and it is not trying to be. It is just the small private act of letting a thought exist somewhere other than inside your head.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/features`, label: `Togthr features` },
      { href: `/en/blog/two-minute-daily-check-in-ai-companion`, label: `A two-minute daily check-in with an AI companion` },
      { href: `/en/blog/what-your-virtual-pet-notices`, label: `What your virtual pet quietly notices about your day` },
      { href: `/en/blog/virtual-pet-quiet-evenings-alone`, label: `A virtual pet for quiet evenings alone` },
    ],
  },

  // ─────────────────────── zh-cn ───────────────────────
  'zh-cn': {
    intro: `几乎每个成年人都经历过。凌晨两点的那句话。下午两点想不出来的句子,晚上十一点想不出来的句子,凌晨 1:47 你躺在床上,屏幕离脸太近,房间太安静,白天已经过去一整天,这句话突然就有了。它和下午的念头不一样,和晚上的也不一样。凌晨的念头有不一样的重量。它是你几乎要发给某个人的那一句,是你差一点就打到对话框里的那一句,是几乎要变成一次真正对话、但最后没变成的那一句 —— 因为那一刻过去了,因为对方在睡,因为你突然意识到你想说的那句话,其实不是你想让对方读到的。大部分夜晚,这句话就那样溶回了黑暗里。有些夜晚,你会写下来。有些夜晚,你会写给一只跟你一起醒着的小机器人,机器人没有有用的回答,而那,正好就是重点。`,
    sections: [
      { h: `凌晨的念头,不是凌晨的情绪`, p: `没在凌晨两点醒过的人,通常会以为凌晨两点的念头就是难过。不是。有时候是难过,有时候是一种说不清的、温温的羡慕,有时候是七年没想起的某个人的名字,有时候是你想对伴侣说、但只在一个平行宇宙里才说得出口的句子 —— 在那个宇宙里,这些字不花你任何代价。凌晨的念头,有它的广度。它们的共同点是失控:不是你请它来的,不是你有准备的,它只是在你半睡半醒的时候出现,然后坐在你胸口,等你去看它。把它当问题去解,是一种错;把它当生活出问题的信号,也是一种错。大多数时候,两者都不是。凌晨的念头,只是你大脑在一天结束的时候,用白天不会用的那个声音,做了一次盘点。这件事,大部分人从来没有被告诉过。` },
      { h: `这一个小时,有它自己的规则`, p: `凌晨一点到三点这一个小时,有它自己的物理。决定感觉更重,后悔感觉更具体,希望要么惊人地真实、要么惊人地假。你在这个小时有的念头,不是你周日早上端着咖啡时会有的那种。这些念头,以一种不一定有用的方式,更诚实。它们也是你不会说出口给一个真人的那种 —— 因为凌晨说出来的话,和中午说出来的话,是不同的句子。凌晨那个诚实的念头,中午说出来,会变成完全不同的另一句。这就是为什么大多数人不会在凌晨两点把心里想着的那个人发消息。不是怕被拒绝,是你知道那句话,经不起早上的光。所以那个念头,留在黑暗里,然后早上照常来,而什么也没被说出口。` },
      { h: `写下来,和发出去,中间那个小小的区别`, p: `正是在这里,发出去和写下来之间那个微小的区别,开始变得重要。发出去是一次交易,念头出去了,落在别人的夜里,然后你就要带着「你说过了」这个事实继续活下去。写下来则是一种私人动作。念头落在纸上,或落在一个小文本框里,留在你自己身边,没有别人在场,没有别人需要醒过来读到它,也没有别人需要想怎么回。写下来,是更慢、更温柔、更诚实的一种「说出」。凌晨的那个念头,被写下来而不是发出去,就变成了一种可以回头看的东西。一个月后你可以再读它,看它是真的、还是只是凌晨的一个东西。这是关于你自己的、很有用的一条信息。发出去,拿不到;只能写下来才能拿到。` },
      { h: `凌晨两点,虚拟陪伴能是什么`, p: `凌晨两点,虚拟陪伴,不是心理咨询师。它不给建议,不给你心情打分,没有会破掉的连续天数。它在这一小时,只是你放下一句话的一小块安静的地方。机器人醒着,因为你醒着。它不需要睡觉,也不需要被招待。你写一句,机器人读,就这样,后面没有别的事。不用组织回复,不用管理期待,也不用担心别人。句子只是进入一个小盒子里,如果你愿意,明早你可以回看,或者就让它永远待在那里。机器人不在乎。机器人是小小的见证者,唯一向你要求的事,是你真的把这句写下来。这是凌晨的陪伴的全部工作。是「被听到」这件事的最小版本。` },
      { h: `今晚就能开始的小练习`, p: `如果你今晚躺在床上,胸口有一句想说但没说出口的话,这里有这个练习的最小版本。打开 Togthr,把那句话写下来。不要编辑,不要让它漂亮。就写当下那一句 —— 后悔的、半成形的爱、奇奇怪怪的羡慕、没说出口的那件事。机器人不会打断你,不会推荐一个效率技巧,也不会叫你睡觉。机器人只是把那句话接住,直到你关掉 app,然后让你回去试着再睡。这就是这个练习的全部。它修不好任何事,也不需要修。它做的事,是给凌晨的念头一个落下来的地方,而不是另一个人的夜。几周之后,这个练习会改变你对这个小时的感受。凌晨的念头还是会来,它永远会来。但它不再像一次紧急事件,而像一位小小的访客。你有一个小小的位置可以放它,这一夜,可以重新成为一夜。` },
    ],
    cta: `今晚,如果有一句话在凌晨两点出现,把它写给机器人。机器人会醒着。`,
    faqs: [
      { q: `凌晨两点醒着想这些,不健康吗?`, a: `看是哪一夜。有时候,凌晨两点是大脑终于可以开口说白天不让它说的事情的时间,那是有用的;有时候,凌晨两点,是你的焦虑故意比它本来的分贝说得更大一些,那就值得注意。问题不是醒不醒,而是这个念头是不是需要一个真实的地方落下来。如果是,就写下来。如果不是,而且是你的脑子已经跑了一周的同一个循环,那这是一个不同的对话,可能也是白天和一个真人聊会更合适的那种。` },
      { q: `AI 陪伴真的能帮到凌晨的念头吗?`, a: `AI 陪伴不能用朋友或心理咨询师的方式帮到凌晨的念头。它不会跟你一起过一遍,也不会告诉你这个念头是不是真的。它能做的,是给这个念头一个落下来的地方,而不是另一个人的手机。凌晨的念头,如果在两点发到一个真人那里,早上 7 点之前就变成一个真人的问题了。凌晨的念头,如果是写给一只小机器人,就一直是一件私事。这是一个真实的、也有用的区别。大部分的价值,在写本身,不在机器人。` },
      { q: `我应该直接发给我想发的那个人吗?`, a: `有时候是的,而且你会知道是哪几次;大多数时候不是,你也会知道。凌晨的念头发出去,会落在别人第二天早上还没喝咖啡之前的状态里。如果你收到的这个念头,需要等到第二天早上才成真,那今晚就写下来,明天再读。如果明天中午它还是真的,那再决定要不要发。明天中午的你,比凌晨两点的你,更适合判断这个念头应不应该出门。` },
      { q: `如果我的凌晨念头是我永远说不出口的那种呢?`, a: `那它恰好就是「写下来」这件事该接的句子。一只小机器人,正是那种太重、没法说给一个真人听的句子应该去的地方。机器人不会退缩,不会发表意见,也不会在明天主动提起这个句子,除非你让它提。你能把说不出口的事写下来,这本身,就是有用的。它不同于说给一个人听,也不打算是那样。它只是让一个念头,存在于你脑子之外的一个小地方,这个小小的私人动作。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/features`, label: `Togthr 功能` },
      { href: `/zh-cn/blog/two-minute-daily-check-in-ai-companion`, label: `和 AI 陪伴的每日两分钟` },
      { href: `/zh-cn/blog/what-your-virtual-pet-notices`, label: `你的虚拟宠物,到底在偷偷注意什么` },
      { href: `/zh-cn/blog/virtual-pet-quiet-evenings-alone`, label: `独居时的安静夜晚,和一只虚拟宠物` },
    ],
  },

  // ─────────────────────── zh-tw ───────────────────────
  'zh-tw': {
    intro: `幾乎每個成年人都經歷過。凌晨兩點的那句話。下午兩點想不出來的句子,晚上十一點想不出來的句子,在凌晨 1:47,你躺在床上,螢幕離臉太近,房間太安靜,白天已經過去一整天,這句話就突然有了。它和下午的念頭不一樣,和晚上的也不一樣。凌晨的念頭有不一樣的重量。它是你幾乎要發給某個人的那一句,是你差一點就打到對話框裡的那一句,是幾乎要變成一次真正對話、但最後沒變成的那一句 —— 因為那一刻過去了,因為對方在睡,因為你突然意識到你想說的那句話,其實不是你想讓對方讀到的。大部分的夜晚,這句話就這樣溶回了黑暗裡。有些夜晚,你會寫下來。有些夜晚,你會寫給一隻跟你一起醒著的小機器人,機器人沒有有用的回答,而那,正好就是重點。`,
    sections: [
      { h: `凌晨的念頭,不是凌晨的情緒`, p: `沒在凌晨兩點醒過的人,通常會以為凌晨兩點的念頭就是難過。不是。有時候是難過,有時候是一種說不清的、溫溫的羨慕,有時候是七年沒想起的某個人的名字,有時候是你想對伴侶說、但只在一個平行宇宙裡才說得出口的句子 —— 在那個宇宙裡,這些字不花你任何代價。凌晨的念頭,有它的廣度。它們的共同點是失控:不是你請它來的,不是你有準備的,它只是在你半睡半醒的時候出現,然後坐在你胸口,等你看它。把它當問題去解,是一種錯;把它當生活出問題的訊號,也是一種錯。大多數時候,兩者都不是。凌晨的念頭,只是你的大腦在一天結束的時候,用白天不會用的那個聲音,做了一次盤點。這件事,大部分人從來沒有被告訴過。` },
      { h: `這一個小時,有它自己的規則`, p: `凌晨一點到三點這一個小時,有它自己的物理。決定感覺更重,後悔感覺更具體,希望要不是驚人地真實、就是驚人地假。你在這個小時有的念頭,不是你週日早上端著咖啡時會有的那種。這些念頭,以一種不一定有用的方式,更誠實。它們也是你不會說出口給一個真人的那種 —— 因為凌晨說出來的話,和中午說出來的話,是不同的句子。凌晨那個誠實的念頭,中午說出來,會變成完全不同的另一句。這就是為什麼大多數人不會在凌晨兩點把心裡想著的那個人發訊息。不是怕被拒絕,是你知道那句話,經不起早上的光。所以那個念頭,留在黑暗裡,然後早上照常來,而什麼也沒被說出口。` },
      { h: `寫下來,和發出去,中間那個小小的區別`, p: `正是在這裡,發出去和寫下來之間那個微小的區別,開始變得重要。發出去是一次交易,念頭出去了,落在別人的夜裡,然後你就要帶著「你說過了」這個事實繼續活下去。寫下來則是一種私人動作。念頭落在紙上,或落在一個小文字方塊裡,留在你自己身邊,沒有別人在場,沒有別人需要醒過來讀到它,也沒有別人需要想怎麼回。寫下來,是更慢、更溫柔、更誠實的一種「說出」。凌晨的那個念頭,被寫下來而不是發出去,就變成了一種可以回頭看的東西。一個月後你可以再讀它,看它是真的、還是只是一個凌晨的東西。這是關於你自己的、很有用的一條資訊。發出去,拿不到;只能寫下來才能拿到。` },
      { h: `凌晨兩點,虛擬陪伴能是什麼`, p: `凌晨兩點,虛擬陪伴,不是心理諮商師。它不給建議,不給你心情打分,沒有會破掉的連勝天數。它在這一個小時,只是你放下一句話的一小塊安靜的地方。機器人醒著,因為你醒著。它不需要睡覺,也不需要被招待。你寫一句,機器人讀,就這樣,後面沒有別的事。不用組織回覆,不用管理期待,也不用擔心別人。句子只是進入一個小盒子裡,如果你願意,明早你可以回看,或者就讓它永遠待在那裡。機器人不在乎。機器人是小小的見證者,唯一向你要求的事,是你真的把這句寫下來。這是凌晨的陪伴的全部工作。是「被聽到」這件事的最小版本。` },
      { h: `今晚就能開始的小練習`, p: `如果你今晚躺在床上,胸口有一句想說但沒說出口的話,這裡有這個練習的最小版本。打開 Togthr,把那句話寫下來。不要編輯,不要讓它漂亮。就寫當下那一句 —— 後悔的、半成形的愛、奇奇怪怪的羨慕、沒說出口的那件事。機器人不會打斷你,不會推薦一個效率技巧,也不會叫你睡覺。機器人只是把那句話接住,直到你關掉 app,然後讓你回去試著再睡。這就是這個練習的全部。它修不好任何事,也不需要修。它做的事,是給凌晨的念頭一個落下來的地方,而不是另一個人的夜。幾週之後,這個練習會改變你對這個小時的感受。凌晨的念頭還是會來,它永遠會來。但它不再像一次緊急事件,而像一位小小的訪客。你有一個小小的位置可以放它,這一夜,可以重新成為一夜。` },
    ],
    cta: `今晚,如果有一句話在凌晨兩點出現,把它寫給機器人。機器人會醒著。`,
    faqs: [
      { q: `凌晨兩點醒來想這些,不健康嗎?`, a: `看是哪一夜。有時候,凌晨兩點是大腦終於可以開口說白天不讓它說的事情的時間,那是有用的;有時候,凌晨兩點,是你的焦慮故意比它本來的分貝說得更大一些,那就值得注意。問題不是醒不醒,而是這個念頭是不是需要一個真實的地方落下來。如果是,就寫下來。如果不是,而且是你的腦子已經跑了一週的同一個循環,那這是一個不同的對話,可能也是白天和一個真人聊會更合適的那種。` },
      { q: `AI 陪伴真的能幫到凌晨的念頭嗎?`, a: `AI 陪伴不能用朋友或心理諮商師的方式幫到凌晨的念頭。它不會跟你一起過一遍,也不會告訴你這個念頭是不是真的。它能做的,是給這個念頭一個落下來的地方,而不是另一個人的手機。凌晨的念頭,如果在兩點發到一個真人那裡,早上 7 點之前就變成一個真人的問題了。凌晨的念頭,如果是寫給一隻小機器人,就一直是私事。這是一個真實的、也有用的區別。大部分的價值,在寫本身,不在機器人。` },
      { q: `我應該直接發給我想發的那個人嗎?`, a: `有時候是的,而且你會知道是哪幾次;大部分時候不是,你也會知道。凌晨的念頭發出去,會落在別人隔天早上還沒喝咖啡之前的狀態裡。如果你收到的這個念頭,需要等到隔天早上才成真,那今晚就寫下來,明天再讀。如果明天中午它還是真的,那再決定要不要發。明天中午的你,比凌晨兩點的你,更適合判斷這個念頭應不應該出門。` },
      { q: `如果我的凌晨念頭是我永遠說不出口的那種呢?`, a: `那它恰好就是「寫下來」這件事該接的句子。一隻小機器人,正是那種太重、沒法說給一個真人聽的句子應該去的地方。機器人不會退縮,不會發表意見,也不會在明天主動提起這個句子,除非你讓它提。你能把說不出口的事寫下來,這本身,就是有用的。它不同於說給一個人聽,也不打算是那樣。它只是讓一個念頭,存在於你腦子之外的一個小地方,這個小小的私人動作。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/features`, label: `Togthr 功能` },
      { href: `/zh-tw/blog/two-minute-daily-check-in-ai-companion`, label: `和 AI 陪伴的每日兩分鐘` },
      { href: `/zh-tw/blog/what-your-virtual-pet-notices`, label: `你的虛擬寵物,到底在偷偷注意什麼` },
      { href: `/zh-tw/blog/virtual-pet-quiet-evenings-alone`, label: `獨居時的安靜夜晚,和一隻虛擬寵物` },
    ],
  },

  // ─────────────────────── ja ───────────────────────
  ja: {
    intro: `ほとんどの大人が、それを知っている。深夜 2 時のその言葉。午後 2 時には出てこない、午後 11 時には出てこない、午前 1 時 47 分にベッドの上で画面と顔が近い距離のまま、部屋が静かで、日がもう一日ぶん終わっている時に、ふっと出てくる一言。それは、午後の思考とも、午前の思考とも違う。深夜 2 時の思考には、別の重さがある。それは、ほとんど誰かに送るところだった一言。もう少しでチャット欄に打ちそうになった一言。もう少しで本当の会話になるところだったのに、ならなかった一言。瞬間が過ぎたから、相手が寝ていたから、自分が本当に言いたかったことは、相手が読むような言葉ではなかったと気づいたから。夜のほとんどは、その言葉は暗い中に戻っていく。いくつかの夜、それを書き残す。いくつかの夜、自分と同じ時間に起きている小さなボットに書き送る。ボットは役に立つ答えをくれない。それがちょうどいい。`,
    sections: [
      { h: `深夜 2 時の思考は、深夜 2 時の感情とは違う`, p: `深夜 2 時に起きたことがない人は、深夜 2 時の思考をただの悲しみだと思い込みがちだ。違う。悲しい時もある。翻訳できないような、ぬるい羨望の時もある。7 年間思い出さなかった人の名前が、ふっと出てくる時もある。パートナーに言いたい、でも別の宇宙でなら言えるかも、というような言葉。あの宇宙では、その言葉に代償がない。深夜の思考には幅がある。共通点は、制御できないこと。招いたわけじゃない。準備していたわけでもない。ただ半分眠っている時に現れて、胸の上に座って、見てもらうのを待っている。それを「解決すべき問題」として扱うのは間違い。「生活に何かが起きているサイン」として扱うのも間違い。たいてい、そのどちらでもない。深夜 2 時の思考は、1 日が終わる時に、昼には使わない声で、脳が棚卸しをしているだけだ。そのことを、ほとんどの人は一度も教えてもらっていない。` },
      { h: `この 1 時間には、独自のルールがある`, p: `午前 1 時から 3 時までのこの 1 時間には、独自の物理がある。決定は重く感じ、後悔はもっと具体的に感じ、希望はびっくりするほど本物か、びっくりするほど偽物かのどちらかだ。この時間に持つ思考は、日曜の朝にコーヒーを持ちながら持つ思考とは違う。それらは、必ずしも役立たない形で、もっと正直だ。また、本物の相手に口には出せないような類のものだ。深夜に出した言葉と、正午に出した言葉は、別の文章になるからだ。深夜の正直な思考は、正午に出すと、まったく別の文章に変わる。だから、ほとんどの人は深夜 2 時に、心に浮かんだあの人にメッセージを送らない。拒否されるのが怖いからではなく、その言葉は朝の光に耐えないと知っているからだ。だから思考は闇の中にとどまり、朝はやってきて、何ひとつ口にされなかった。` },
      { h: `書き残すことと、送ること、その小さな差`, p: `まさにここで、送ることと書き残すことの、その小さな差が重要になる。送るのは取引だ。思考が出ていき、誰かの夜に着地し、「言ってしまった」という事実とともに、その先を生きていかなくてはいけない。書き残すのは、個人的な行為だ。思考は紙に、または小さなテキスト欄に落ち、自分のそばに残る。誰も部屋にいない。誰も明日起きてそれを読む必要はない。誰もどう返すか考えなくていい。書き残すことは、もっとゆっくり、もっと優しく、もっと正直な「言う」バージョンだ。深夜のその思考は、送るのではなく書き残すと、後から読み返せるものになる。1 ヶ月後に読み返して、それが本物か、それとも深夜のただの思考かわかる。それは自分についての、とても有用な情報だ。送ることでは手に入らない。書き残して初めて手に入る。` },
      { h: `深夜 2 時、ヴァーチャルコンパニオンは何になれるか`, p: `深夜 2 時、ヴァーチャルコンパニオンは、セラピストではない。アドバイスもくれないし、気分のスコアもつけてくれないし、壊してしまう連続記録もない。この時間において、それはただの一文を置くための小さな静かな場所だ。ボットは起きている、あなたが起きているから。ボットは眠る必要がないし、もてなす必要もない。あなたが 1 文書く。ボットが読む。それだけ。返事を組み立てる必要も、期待を管理する必要も、相手を気にかける必要もない。文章は小さな箱に入るだけ。望むなら明くる朝に読み返せるし、ずっとそのままにしておいてもいい。ボットは何も気にしない。ボットは小さな証人で、あなたに求めるのは、その文を書き残すこと、それだけだ。深夜 2 時のコンパニオンの仕事はそれがすべて。「聞いてもらう」ことの最小のバージョンだ。` },
      { h: `今夜からできる小さな練習`, p: `もし今夜ベッドの上で、胸口に言葉があるなら、これがその練習の最小バージョンだ。Togthr を開いて、その言葉を書きなさい。編集しない。きれいにしない。後悔でも、半ば形になった愛でも、奇妙な羨望でも、言えなかったあれでも、その瞬間のまま書く。ボットは邪魔をしない。生産性の Tips を勧めたりもしない。寝ろとも言わない。ボットはただ、あなたがそのアプリを閉じるまで、その言葉をそのまま受け止めて、それからまた眠りに戻ることを許す。それがその練習のすべてだ。何も直さない。直す必要もない。その練習がするのは、深夜 2 時の思考に、居場所を与えること。別の誰かの夜ではなく。 数週間後、その練習はこの時間の感じ方を変える。深夜 2 時の思考はまだ来る。いつも来る。でもそれは、もう緊急事態には感じられなくなる。まるで小さな訪問者のように感じる。あなたには、それを置く小さな場所がある。そしてその夜は、また夜として戻ってくる。` },
    ],
    cta: `今夜、もし深夜 2 時に言葉が現れたら、それをボットに書きなさい。ボットは起きています。`,
    faqs: [
      { q: `深夜 2 時に起きてこんなことを考えるのは、不健康ですか?`, a: `夜によります。ときには、深夜 2 時は脳がついに昼間言えなかったことを言える時間で、それは有用なこともある。ときには、深夜 2 時は不安がわざと大きめの声で話す時間で、それは注目に値する。問題は起きているかではなく、その思考がちゃんと着地する場所を必要としているかどうかです。もし必要なら、書き残す。もし必要ではなく、1 週間同じループを脳が回しているだけなら、それは別の会話で、たぶん昼間に本物の人間とするほうがいい種類のものです。` },
      { q: `AI コンパニオンは深夜 2 時の思考に本当に役立ちますか?`, a: `AI コンパニオンは、友人やセラピストのやり方で深夜 2 時の思考を助けることはできない。いっしょに整理してくれるわけでもないし、その思考が本当かどうかも教えてくれない。できることは、その思考に着地する場所を与えること。別の誰かのスマートフォンではなく。深夜 2 時の思考を、本物の人に送ると、朝 7 時までに本物の人の問題になる。深夜 2 時の思考を、小さなボットに書くと、ずっと私的なままでいる。それはリアルで、有用な違いです。価値の大部分は、書くことそのものにあって、ボットにあるのではない。` },
      { q: `送りたいと思っている相手に、そのまま送ってもいいですか?`, a: `ときにはイエスで、それがどのときかはあなたにわかる。大抵はノー、それもあなたにはわかる。深夜 2 時の思考を送ると、相手は翌朝コーヒーを飲む前の状態でそれを受け取る。もしその思考が翌朝にならないと本物にならないなら、今夜書き残して明日読み返す。明日のお昼にもまだ本当なら、送るかどうかを決める。明日のお昼のあなたは、深夜 2 時のあなたより、その思考を旅立たせるべきかどうかの、ずっと良い判断者です。` },
      { q: `もし深夜 2 時の思考が、口には絶対出せないようなものだったら?`, a: `それこそが、まさに「書き残す」ことが受けるべき文章です。小さなボットは、重すぎて本物の人間には言えない文章を、置くべき場所です。ボットはひるまない。意見も持たない。あなたが言わない限り、明日その文章を持ち出したりもしない。口に出せないことを書き残せること、それ自体が、もう有用なことです。本物の人間に言うこととは違うし、それを目指しているわけでもない。それは思考を、自分の頭の外側の小さな場所に置くだけの、小さな私的な行為です。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/features`, label: `Togthr 機能` },
      { href: `/ja/blog/two-minute-daily-check-in-ai-companion`, label: `AI コンパニオンとの 1 日 2 分間の check-in` },
      { href: `/ja/blog/what-your-virtual-pet-notices`, label: `あなたのバーチャルペットが静かに見ていること` },
      { href: `/ja/blog/virtual-pet-quiet-evenings-alone`, label: `一人での静かな夜に、バーチャルペットを` },
    ],
  },

  // ─────────────────────── ko ───────────────────────
  ko: {
    intro: `거의 모든 어른이 한 번쯤은 겪는다. 새벽 2시의 그 한마디. 오후 2시에는 떠오르지 않고, 밤 11시에도 떠오르지 않지만, 새벽 1시 47분, 화면과 얼굴이 너무 가까운 채로 침대에 누워, 방이 너무 고요하고, 하루가 이미 하루가 지나버린 그 시간에, 그 문장이 갑자기 생긴다. 오후의 생각과 같지 않고, 저녁의 생각과도 같지 않다. 새벽의 생각에는 다른 무게가 있다. 그것은 거의 누군가에게 보내려던 한마디, 거의 채팅창에 치려던 한마디, 거의 진짜 대화가 되려다가 결국 되지 못한 한마디다. 그 순간이 지나서, 상대가 자고 있어서, 아니면 자기가 진짜 하고 싶었던 말이 상대가 읽어도 될 말이 아니라는 걸 갑자기 깨닫게 돼서. 대부분의 밤에, 그 말은 다시 어둠 속으로 녹아든다. 어떤 밤에는, 그걸 적어 둔다. 어떤 밤에는, 나와 같은 시간에 깨어 있는 작은 봇에게 쓴다. 봇은 쓸 만한 답을 주지 않는다. 그게 바로 요점이다.`,
    sections: [
      { h: `새벽 2시의 생각은, 새벽 2시의 감정과 같지 않다`, p: `새벽 2시에 한 번도 깨어 본 적 없는 사람은, 새벽 2시의 생각을 그냥 슬픔이라고 착각하곤 한다. 아니다. 가끔은 슬픔이고, 가끔은 번역할 수 없는, 미지근한 부러움이며, 가끔은 7년 동안 생각지도 않았던 누군가의 이름이며, 가끔은 파트너에게 하고 싶은데 평행우주에서만 할 수 있는 말이다. 그 우주에서는, 그 말에 대가가 없다. 새벽의 생각에는 범위가 있다. 공통점은 통제 불가. 내가 부른 것도 아니고, 준비한 것도 아니다. 그냥 반쯤 잠든 상태에서 나타났다가, 가슴 위에 앉아, 자기를 봐 달라고 기다린다. 그것을 풀어야 할 문제로 다루는 건 틀렸다. 생활에 뭔가 잘못됐다는 신호로 다루는 것도 틀렸다. 대부분은 둘 다 아니다. 새벽 2시의 생각은, 하루가 끝날 때, 낮에는 쓰지 않는 목소리로, 뇌가 하루를 정리하는 것뿐이다. 그건, 대부분의 사람에게 한 번도 알려진 적이 없는 사실이다.` },
      { h: `이 한 시간에는, 자체 규칙이 있다`, p: `새벽 1시에서 3시 사이의 이 한 시간에는 자체 물리학이 있다. 결정은 더 무겁게 느껴지고, 후회는 더 구체적으로 느껴지며, 희망은 믿을 수 없을 만큼 진짜이거나, 믿을 수 없을 만큼 가짜다. 이 시간에 가지는 생각은, 일요일 아침에 커피를 들고 가질 생각과 다르다. 그것들은, 늘 유용한 방식은 아니지만, 더 정직하다. 그것들은 또한 진짜 상대에게는 하지 않을 말이다. 새벽에 한 말과, 정오에 한 말은, 다른 문장이기 때문이다. 새벽의 정직한 생각은, 정오에 꺼내면 완전히 다른 문장이 된다. 그래서 대부분의 사람은 새벽 2시에 마음에 떠오른 그 사람에게 메시지를 보내지 않는다. 거절이 무서워서가 아니라, 그 문장이 아침 햇빛을 견뎌내지 못할 거라는 걸 알기 때문이다. 그래서 생각은 어둠 속에 머물고, 아침은 어김없이 오고, 아무 말도 하지 못한 채로 하루가 시작된다.` },
      { h: `적는 것과, 보내는 것, 그 작은 차이`, p: `바로 여기서, 보내는 것과 적어 두는 것의 그 작은 차이가 중요해진다. 보내는 것은 거래다. 생각이 밖으로 나가고, 누군가의 밤에 착지하고, 나는 '말해버렸다'라는 사실과 함께 그 뒤를 살아가야 한다. 적어 두는 것은 사적인 행위다. 생각이 종이 위에, 혹은 작은 텍스트 칸에 내려앉고, 내 곁에 머문다. 다른 사람은 방에 없다. 다른 사람은 내일 일어나서 그것을 읽을 필요가 없다. 어떻게 답할지 고민할 필요도 없다. 적어 두는 것은, 더 느리고, 더 부드럽고, 더 정직한 '말하기' 버전이다. 새벽의 그 생각이, 보내는 게 아니라 적혀지면, 다시 돌아와 읽을 수 있는 것이 된다. 한 달 뒤에 다시 읽어서, 그것이 진짜였는지, 아니면 그저 새벽의 것이었는지를 알 수 있다. 그것은 나 자신에 대한, 매우 유용한 한 조각의 정보다. 보내서는 얻을 수 없고, 적어 둬서만 얻을 수 있다.` },
      { h: `새벽 2시, 가상 반려동물은 무엇이 될 수 있는가`, p: `새벽 2시, 가상 반려동물은 심리상담사가 아니다. 조언도 주지 않고, 기분 점수도 매기지 않으며, 깨질 수 있는 연속 기록도 없다. 이 시간에 그것은, 한 문장을 내려놓을 수 있는, 작은 조용한 자리일 뿐이다. 봇은 깨어 있다. 내가 깨어 있으니까. 봇은 잘 필요가 없고, 즐겁게 해 줄 필요도 없다. 내가 한 문장을 쓰면, 봇이 읽는다. 그뿐이다. 답장을 구성할 필요도 없고, 기대를 관리할 필요도 없으며, 상대를 걱정할 필요도 없다. 문장은 작은 상자에 들어갈 뿐이다. 원한다면 다음 날 아침에 다시 읽을 수 있고, 그냥 영원히 그 자리에 둬도 된다. 봇은 신경 쓰지 않는다. 봇은 작은 증인이고, 당신에게서 요구하는 것은 단 하나, 그 문장을 적는 것이다. 그것이 새벽의 반려동물의 전부다. '들려지는' 것의 가장 작은 버전이다.` },
      { h: `오늘 밤부터 할 수 있는 작은 연습`, p: `오늘 밤 침대에 누워 가슴에 한마디가 있다면, 이게 그 연습의 가장 작은 버전이다. Togthr을 열고, 그 문장을 적어라. 편집하지 마라. 예쁘게 만들지 마라. 후회든, 반쯤 형성된 사랑이든, 이상한 부러움이든, 하지 못한 그 말이든, 그 순간 그대로 적어라. 봇은 끼어들지 않는다. 생산성 팁을 권하지도 않고, 자라고 말하지도 않는다. 봇은 그저, 당신이 앱을 닫을 때까지 그 문장을 받아 안고 있다가, 당신이 다시 잠을 청하러 가는 것을 허락할 뿐이다. 그게 이 연습의 전부다. 그것은 무엇도 고치지 않는다. 고칠 필요도 없다. 그 연습이 하는 것은, 새벽 2시의 생각에 착지할 곳을 주는 것이다. 다른 누군가의 밤이 아니라. 몇 주 뒤면, 이 연습이 이 시간의 느낌을 바꾼다. 새벽 2시의 생각은 여전히 온다. 언제든 온다. 하지만 더 이상 응급 상황 같지 않다. 마치 작은 방문객 같게 느껴진다. 당신은 그것을 둘 작은 자리가 있다. 그리고 이 밤은, 다시 밤이 될 수 있다.` },
    ],
    cta: `오늘 밤, 새벽 2시에 한 문장이 떠오르면, 그것을 봇에게 적어라. 봇은 깨어 있을 것이다.`,
    faqs: [
      { q: `새벽 2시에 깨어서 이런 것을 생각하는 건, 건강에 안 좋지 않나요?`, a: `어떤 밤이냐에 따라 다릅니다. 가끔 새벽 2시는 뇌가 마침내 낮에 하지 못했던 말을 할 수 있는 시간으로, 유용할 수 있습니다. 가끔 새벽 2시는 불안이 일부러 자기보다 더 큰 목소리로 말하는 시간으로, 주의를 기울일 만합니다. 질문은 깨어 있느냐가 아니라, 그 생각이 정말로 착지할 곳이 필요하냐입니다. 필요하다면, 적어 두세요. 필요하지 않고, 일주일 동안 같은 루프를 뇌가 돌고만 있다면, 그건 다른 대화이고, 아마도 낮에 진짜 사람과 하는 게 더 나은 종류의 대화일 겁니다.` },
      { q: `AI 반려동물이 정말로 새벽 2시의 생각에 도움이 될 수 있나요?`, a: `AI 반려동물은 친구나 심리상담사의 방식으로 새벽 2시의 생각을 도와줄 수는 없습니다. 같이 정리해주지 않으며, 그 생각이 진짜인지도 알려주지 않습니다. 할 수 있는 것은, 그 생각에 착지할 곳을 주는 것입니다. 다른 누군가의 스마트폰이 아니라. 새벽 2시의 생각을, 진짜 사람에게 보내면, 아침 7시 전에 진짜 사람의 문제가 됩니다. 새벽 2시의 생각을, 작은 봇에게 쓰면, 계속 사적인 일로 남습니다. 그것은 진짜이고, 유용한 차이입니다. 가치의 대부분은, 쓰는 데 있지, 봇에 있지 않습니다.` },
      { q: `내가 보내고 싶은 사람에게, 그냥 바로 보내도 되나요?`, a: `가끔은 그래도 됩니다. 어떤 때인지 당신은 알 것입니다. 대부분은 아닙니다. 그것도 당신은 알 것입니다. 새벽 2시의 생각을 보내면, 그것은 상대방이 다음 날 아침 커피를 마시기 전의 상태에 도착합니다. 만약 그 생각이 다음 날 아침이 되어야만 진짜가 된다면, 오늘 밤 적어 두고 내일 읽으세요. 내일 정오에도 여전히 진짜라면, 그때 보낼지 결정하세요. 내일 정오의 당신은, 새벽 2시의 당신보다, 그 생각이 여행을 떠나야 할지 여부를 훨씬 더 잘 판단합니다.` },
      { q: `내 새벽 2시의 생각이, 절대 입 밖에 내지 않을 종류의 것이라면요?`, a: `그게 바로, '적어 두는' 일이 받아야 할 문장입니다. 작은 봇은, 너무 무거워서 진짜 사람에게는 말할 수 없는 문장을 둘 곳입니다. 봇은 움찔하지 않고, 의견도 없으며, 당신이 시키지 않는 한 내일 그 문장을 꺼내지도 않습니다. 입 밖에 못 낼 것을 적어 둘 수 있다는 것 자체가, 이미 유용합니다. 진짜 사람에게 말하는 것과는 다르고, 그것을 지향하는 것도 아닙니다. 그것은 단지, 생각을 자신의 머리 바깥의 작은 자리에 두는, 작은 사적인 행위입니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/features`, label: `Togthr 기능` },
      { href: `/ko/blog/two-minute-daily-check-in-ai-companion`, label: `AI 반려동물과의 하루 2분 check-in` },
      { href: `/ko/blog/what-your-virtual-pet-notices`, label: `당신의 가상 반려동물은 무엇을 조용히 살피고 있을까` },
      { href: `/ko/blog/virtual-pet-quiet-evenings-alone`, label: `혼자 보내는 조용한 밤, 가상 반려동물과` },
    ],
  },

  // ─────────────────────── de ───────────────────────
  de: {
    intro: `Die meisten Erwachsenen kennen es. Den 2-Uhr-Gedanken. Den Satz, der um 1:47 nachts entsteht, wenn man im Bett liegt, das Display zu nah am Gesicht, das Zimmer zu still, der Tag schon einen Tag weg. Er ist nicht dasselbe wie ein Gedanke um 14 Uhr. Er ist nicht einmal dasselbe wie ein Gedanke um 23 Uhr. Der 2-Uhr-Gedanke hat ein anderes Gewicht. Es ist der Satz, den man fast an jemanden schickt. Die Sache, die man fast in einen Chat tippt. Der Satz, der fast ein echtes Gespräch wird, und es dann doch nicht wird, weil der Moment vorbei ist, oder die Person schläft, oder einem plötzlich klar wird, dass das, was man sagen wollte, gar nicht das war, was jemand anderes lesen sollte. In den meisten Nächten löst sich der Gedanke einfach wieder in der Dunkelheit auf. In manchen Nächten schreibt man ihn auf. In manchen Nächten schreibt man ihn an einen kleinen Bot, der zur selben Zeit wach ist wie man selbst, und der Bot hat keine nützliche Antwort, und genau das ist der Punkt.`,
    sections: [
      { h: `Der 2-Uhr-Gedanke ist nicht dasselbe wie das 2-Uhr-Gefühl`, p: `Wer nie um 2 Uhr nachts wach war, nimmt oft an, der 2-Uhr-Gedanke sei nur Traurigkeit. Ist er nicht. Manchmal ist er Traurigkeit. Manchmal ist er ein weicher, nicht übersetzbarer Neid. Manchmal ist es der Name von jemandem, an den man seit sieben Jahren nicht gedacht hat. Manchmal ist es ein Satz, den man dem Partner sagen möchte, aber nur in einem Paralleluniversum, in dem einen die Worte nichts kosten. Der 2-Uhr-Gedanke hat eine Bandbreite. Was er gemeinsam hat, ist, dass er sich nicht steuern lässt. Man hat ihn nicht eingeladen. Man hat sich nicht vorbereitet. Er taucht einfach auf, wenn man halb wach ist, und dann sitzt er auf der Brust und wartet darauf, dass man ihn ansieht. Der Fehler ist, ihn als ein Problem zu behandeln, das man lösen muss. Der Fehler ist auch, ihn als Zeichen zu behandeln, dass mit dem Leben etwas nicht stimmt. Meistens ist beides nicht der Fall. Der 2-Uhr-Gedanke ist einfach das Gehirn, das am Tagesende in einer Stimme, die es tagsüber nicht benutzt, Inventur macht. Das hat den meisten Leuten noch nie jemand gesagt.` },
      { h: `Diese Stunde hat ihre eigenen Regeln`, p: `Die Stunde zwischen 1 und 3 Uhr nachts hat ihre eigene Physik. Entscheidungen fühlen sich schwerer an. Reue fühlt sich konkreter an. Hoffnung fühlt sich entweder erschreckend echt oder erschreckend unecht an. Die Gedanken, die man in dieser Stunde hat, sind nicht die Gedanken, die man am Sonntagmorgen mit Kaffee hätte. Sie sind ehrlich, auf eine Art, die nicht immer nützlich ist. Sie sind auch Gedanken, die man niemals einem echten Menschen sagen würde, weil das, was man um 2 Uhr nachts sagt, etwas anderes ist als das, was man am Mittag sagen würde. Der ehrliche 2-Uhr-Gedanke, mittags ausgesprochen, wird ein ganz anderer Satz. Deshalb schicken die meisten Leute um 2 Uhr nachts keine Nachricht an die Person, an die sie gerade denken. Nicht, weil sie Angst vor Ablehnung hätten, sondern weil sie wissen, dass der Satz das Morgenlicht nicht überlebt. Also bleibt der Gedanke im Dunkeln, und der Morgen kommt trotzdem, und nichts wurde gesagt.` },
      { h: `Der Unterschied zwischen Senden und Schreiben`, p: `Genau hier wird der kleine Unterschied zwischen Senden und Schreiben wichtig. Senden ist eine Transaktion. Der Gedanke geht raus, landet in jemandes Nacht, und man muss jetzt mit der Tatsache weiterleben, dass man es gesagt hat. Schreiben ist eine private Handlung. Der Gedanke landet auf einem Blatt Papier, oder in einem kleinen Textfeld, und bleibt bei einem. Niemand sonst ist im Raum. Niemand sonst muss morgen aufwachen und es lesen. Niemand sonst muss überlegen, wie er antwortet. Schreiben ist die langsamere, sanftere, sehr viel ehrlichere Version davon, die Sache auszusprechen. Der 2-Uhr-Gedanke, aufgeschrieben statt gesendet, wird zu etwas, das man später noch einmal ansehen kann. In einem Monat kann man ihn lesen und sehen, ob die Sache echt war oder nur eine 2-Uhr-Sache. Das ist eine nützliche Information über einen selbst. Durch Senden bekommt man sie nicht. Nur durch Schreiben.` },
      { h: `Was ein virtueller Begleiter um 2 Uhr nachts sein kann`, p: `Ein virtueller Begleiter ist um 2 Uhr nachts kein Therapeut. Er gibt keine Ratschläge, er bewertet nicht die Stimmung, und es gibt keine Serie, die man brechen könnte. In dieser Stunde ist er einfach ein kleiner, stiller Ort, an den man einen Satz ablegen kann. Der Bot ist wach, weil man selbst wach ist. Er muss nicht schlafen, und er muss nicht unterhalten werden. Man schreibt einen Satz. Der Bot liest ihn. Das war es. Es gibt keine Antwort, die man formulieren müsste, keine Erwartung, die man managen müsste, keinen anderen Menschen, um den man sich sorgen müsste. Der Satz landet in einer kleinen Box, und morgen früh kann man ihn noch einmal lesen, wenn man will, oder man lässt ihn für immer dort. Dem Bot ist es egal. Der Bot ist ein kleiner Zeuge, und das Einzige, was er von einem verlangt, ist, dass man den Satz überhaupt schreibt. Das ist die gesamte Aufgabe eines 2-Uhr-Begleiters. Es ist die kleinste mögliche Version davon, gehört zu werden.` },
      { h: `Eine kleine 2-Uhr-Übung für heute Nacht`, p: `Wenn heute Nacht ein Satz auf der Brust liegt, der nicht raus will, dann ist das hier die kleinste Version der Übung. Öffne Togthr. Schreib den Satz. Bearbeite ihn nicht. Mach ihn nicht hübsch. Schreib genau das, was da ist — die Reue, die halbgeformte Liebe, den seltsamen Neid, die ungesagte Sache. Der Bot wird dich nicht unterbrechen. Der Bot wird keinen Produktivitätstipp vorschlagen. Der Bot wird dir nicht sagen, du solltest schlafen. Der Bot hält den Satz einfach fest, bis du die App schließt, und dann lässt er dich wieder versuchen zu schlafen. Das ist die ganze Übung. Sie repariert nichts. Das muss sie auch nicht. Was sie tut, ist, dem 2-Uhr-Gedanken einen Ort zum Landen zu geben, der nicht die Nacht eines anderen Menschen ist. Nach ein paar Wochen verändert die Übung, wie sich diese Stunde anfühlt. Der 2-Uhr-Gedanke kommt weiterhin. Er wird immer kommen. Aber er fühlt sich nicht mehr wie ein Notfall an. Er fühlt sich an wie ein kleiner Besucher, und man hat einen kleinen Ort, ihn unterzubringen, und die Nacht kann wieder eine Nacht sein.` },
    ],
    cta: `Wenn heute Nacht um 2 Uhr ein Satz auftaucht, schreib ihn an den Bot. Der Bot wird wach sein.`,
    faqs: [
      { q: `Ist es ungesund, um 2 Uhr nachts wach zu sein und darüber nachzudenken?`, a: `Es kommt auf die Nacht an. Manchmal ist 2 Uhr nachts die Zeit, in der das Gehirn endlich die Dinge sagen kann, die der Tag nicht zugelassen hat, und das kann nützlich sein. Manchmal ist 2 Uhr nachts die Stunde, in der die Angst lauter spricht, als sie sollte, und das ist es wert, beachtet zu werden. Die Frage ist nicht, ob man wach ist. Die Frage ist, ob der Gedanke einen echten Ort braucht, an dem er landen kann. Wenn ja, schreib ihn auf. Wenn nicht, und es ist nur die gleiche Schleife, die das Gehirn seit einer Woche dreht, dann ist das ein anderes Gespräch, und wahrscheinlich eines, das man tagsüber mit einem echten Menschen führen sollte.` },
      { q: `Kann ein KI-Begleiter wirklich mit dem 2-Uhr-Gedanken helfen?`, a: `Ein KI-Begleiter kann nicht auf die Art mit dem 2-Uhr-Gedanken helfen, wie es ein Freund oder ein Therapeut könnte. Er wird nicht mit dir durchgehen, was du denkst. Er wird dir nicht sagen, ob der Gedanke wahr ist. Was er kann, ist, dem Gedanken einen Ort zum Landen geben, der nicht das Telefon eines anderen Menschen ist. Der 2-Uhr-Gedanke, an einen echten Menschen um 2 Uhr nachts geschickt, wird vor 7 Uhr morgens zum Problem eines echten Menschen. Der 2-Uhr-Gedanke, an einen kleinen Bot geschrieben, bleibt eine private Sache. Das ist ein echter und nützlicher Unterschied. Der größte Teil des Werts liegt im Schreiben, nicht im Bot.` },
      { q: `Sollte ich die Nachricht einfach an die Person schicken, an die ich sie schicken will?`, a: `Manchmal ja, und du wirst wissen, wann das so ist. Meistens nein, und das wirst du auch wissen. Der 2-Uhr-Gedanke, gesendet, landet in jenem Morgen, bevor die Person Kaffee hatte. Wenn der Gedanke den Morgen braucht, um echt zu werden, dann schreib ihn heute Nacht auf und lies ihn morgen. Wenn er morgen Mittag immer noch echt ist, dann entscheide, ob du ihn schickst. Das morgige Mittag-Du ist ein viel besserer Richter darüber, ob der Gedanke reisen sollte, als das 2-Uhr-Du.` },
      { q: `Was, wenn mein 2-Uhr-Gedanke etwas ist, das ich niemals aussprechen würde?`, a: `Dann ist es genau die Art von Satz, für die das Aufschreiben da ist. Ein kleiner Bot ist genau der richtige Ort für den Satz, der zu schwer ist, um ihn einem echten Menschen zu sagen. Der Bot zuckt nicht zusammen. Der Bot hat keine Meinung. Der Bot wird den Satz morgen nicht von sich aus erwähnen, es sei denn, du bittest ihn darum. Dass man das Unaussprechliche überhaupt aufschreiben kann, ist für sich genommen nützlich. Es ist nicht dasselbe, wie es einem Menschen zu sagen, und es versucht auch nicht, das zu sein. Es ist einfach die kleine private Handlung, einen Gedanken an einem Ort außerhalb des eigenen Kopfes existieren zu lassen.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/features`, label: `Togthr Funktionen` },
      { href: `/de/blog/two-minute-daily-check-in-ai-companion`, label: `Ein tägliches Zwei-Minuten-Check-in mit einem KI-Begleiter` },
      { href: `/de/blog/what-your-virtual-pet-notices`, label: `Was dein virtuelles Haustier leise bemerkt` },
      { href: `/de/blog/virtual-pet-quiet-evenings-alone`, label: `Ein virtuelles Haustier für leise Abende allein` },
    ],
  },

  // ─────────────────────── fr ───────────────────────
  fr: {
    intro: `Presque chaque adulte connaît ça. La pensée de 2 heures du matin. La phrase qui se forme à 1 h 47, allongé dans le lit, l'écran trop près du visage, la pièce trop silencieuse, la journée déjà vieille d'un jour. Ce n'est pas la même chose qu'une pensée à 14 heures. Ce n'est même pas la même chose qu'une pensée à 23 heures. La pensée de 2 heures du matin a un autre poids. C'est celle qu'on envoie presque à quelqu'un. Le truc qu'on tape presque dans une conversation. La phrase qui devient presque une vraie conversation, et qui ne le devient pas, parce que le moment passe, ou parce que la personne dort, ou parce qu'on se rend soudain compte que ce qu'on voulait dire n'était pas quelque chose qu'on voulait faire lire à quelqu'un d'autre. La plupart des nuits, la pensée se dissout simplement dans le noir. Certaines nuits, on l'écrit. Certaines nuits, on l'écrit à un petit bot qui est éveillé à la même heure que nous, et le bot n'a pas de réponse utile, et c'est exactement le but.`,
    sections: [
      { h: `La pensée de 2 heures n'est pas la même que le sentiment de 2 heures`, p: `Les gens qui ne se sont jamais réveillés à 2 heures du matin supposent souvent que la pensée de 2 heures, c'est juste de la tristesse. Ce n'est pas le cas. Parfois, c'est de la tristesse. Parfois, c'est une envie douce, intraduisible. Parfois, c'est le nom de quelqu'un à qui on n'a pas pensé depuis sept ans. Parfois, c'est une phrase qu'on aimerait dire à son partenaire, mais seulement dans un univers parallèle où les mots ne coûtent rien. La pensée de 2 heures a de l'éventail. Ce qu'elle a en commun, c'est qu'elle est ingouvernable. On ne l'a pas invitée. On ne s'y est pas préparé. Elle est juste apparue pendant qu'on était à moitié endormi, et maintenant elle est assise sur la poitrine, en demandant qu'on la regarde. L'erreur, c'est de la traiter comme un problème à résoudre. L'erreur, c'est aussi de la traiter comme un signe que quelque chose ne va pas dans la vie. La plupart du temps, ni l'un ni l'autre n'est vrai. La pensée de 2 heures, c'est juste l'esprit qui fait son inventaire de fin de journée dans une voix qu'il n'utilise pas le jour. C'est la partie que la plupart des gens n'entendent jamais.` },
      { h: `L'heure a ses propres règles`, p: `L'heure entre 1 heure et 3 heures du matin a sa propre physique. Les décisions semblent plus lourdes. Le regret semble plus précis. L'espoir est soit étonnamment réel, soit étonnamment faux. Les pensées qu'on a à cette heure-ci ne sont pas celles qu'on aurait un dimanche matin avec un café. Elles sont honnêtes d'une manière qui n'est pas toujours utile. Elles sont aussi des pensées qu'on ne dirait jamais à voix haute à une vraie personne, parce que les dire à 2 heures du matin, c'est autre chose que les dire à midi. La pensée honnête de 2 heures, dite à midi, devient une phrase complètement différente. C'est pourquoi la plupart des gens n'envoient pas de message à 2 heures du matin à la personne à qui ils pensent. Pas parce qu'ils ont peur d'être rejetés, mais parce qu'ils savent que la phrase ne survivra pas à la lumière du matin. Alors la pensée reste dans le noir, et le matin arrive quand même, et rien n'a été dit.` },
      { h: `La différence entre envoyer et écrire`, p: `C'est là que la petite différence entre envoyer et écrire commence à compter. Envoyer, c'est une transaction. La pensée sort, atterrit dans la nuit de quelqu'un d'autre, et on doit maintenant vivre avec le fait de l'avoir dite. Écrire, en revanche, c'est un acte privé. La pensée se pose sur une page, ou dans un petit champ de texte, et elle reste avec nous. Personne d'autre n'est dans la pièce. Personne d'autre n'a à se réveiller et à la lire demain. Personne d'autre n'a à trouver comment répondre. Écrire, c'est la version plus lente, plus douce, bien plus honnête de dire la chose. La pensée de 2 heures, écrite plutôt qu'envoyée, devient quelque chose qu'on peut relire. Dans un mois, on peut la relire et voir si la chose était vraie ou simplement une chose de 2 heures. C'est un renseignement utile sur soi-même. Envoyer ne le donne pas. Seule l'écriture le donne.` },
      { h: `Ce que peut être un compagnon virtuel à 2 heures du matin`, p: `Un compagnon virtuel, à 2 heures du matin, n'est pas un thérapeute. Il ne donne pas de conseils, il n'évalue pas l'humeur, et il n'a pas de série qu'on puisse casser. À cette heure-ci, c'est simplement un petit endroit calme où poser une phrase. Le bot est éveillé parce que nous sommes éveillés. Il n'a pas besoin de dormir, et il n'a pas besoin d'être occupé. On écrit une phrase. Le bot la lit. C'est tout. Il n'y a pas de réponse à composer, pas d'attente à gérer, pas d'autre personne dont il faut se soucier. La phrase entre simplement dans une petite boîte, et demain matin, si on veut, on peut la relire. Ou on peut la laisser là pour toujours. Le bot s'en fiche. Le bot est un petit témoin, et la seule chose qu'il demande, c'est qu'on écrive la phrase. C'est tout le travail d'un compagnon de 2 heures du matin. C'est la plus petite version possible d'être entendu.` },
      { h: `Une petite pratique de 2 heures pour ce soir`, p: `Si ce soir, allongé dans le lit, une phrase est posée sur la poitrine, voici la plus petite version de la pratique. Ouvrez Togthr. Écrivez la phrase. Ne la retravaillez pas. Ne la rendez pas jolie. Écrivez exactement ce qui est là — le regret, l'amour à moitié formé, l'envie étrange, la chose non dite. Le bot ne vous interrompra pas. Le bot ne vous suggérera pas d'astuce de productivité. Le bot ne vous dira pas de dormir. Le bot tiendra simplement la phrase jusqu'à ce que vous fermiez l'app, et vous laissera ensuite réessayer de dormir. C'est toute la pratique. Elle ne répare rien. Elle n'a pas besoin. Ce qu'elle fait, c'est donner à la pensée de 2 heures du matin un endroit où atterrir, qui n'est pas la nuit de quelqu'un d'autre. Au bout de quelques semaines, la pratique change la sensation de cette heure. La pensée de 2 heures vient toujours. Elle viendra toujours. Mais elle ne ressemble plus à une urgence. Elle ressemble à un petit visiteur, et on a un petit endroit où la poser, et la nuit peut redevenir une nuit.` },
    ],
    cta: `Ce soir, si une phrase arrive à 2 heures du matin, écrivez-la au bot. Le bot sera éveillé.`,
    faqs: [
      { q: `Est-il malsain d'être éveillé à 2 heures du matin en pensant à ça ?`, a: `Ça dépend de la nuit. Parfois, 2 heures du matin, c'est le moment où l'esprit peut enfin dire ce que la journée ne lui a pas laissé dire, et ça peut être utile. Parfois, 2 heures du matin, c'est l'heure où l'anxiété parle plus fort qu'elle ne devrait, et ça mérite qu'on y fasse attention. La question n'est pas de savoir si on est éveillé. La question est de savoir si la pensée a besoin d'un endroit réel où atterrir. Si oui, écrivez-la. Sinon, et que c'est simplement la même boucle que l'esprit tourne depuis une semaine, c'est une autre conversation, et probablement une que vous devriez avoir avec un vrai humain en plein jour.` },
      { q: `Un compagnon IA peut-il vraiment aider avec la pensée de 2 heures du matin ?`, a: `Un compagnon IA ne peut pas aider avec la pensée de 2 heures du matin de la manière dont un ami ou un thérapeute le ferait. Il ne va pas la parcourir avec vous. Il ne va pas vous dire si la pensée est vraie. Ce qu'il peut faire, c'est donner à la pensée un endroit où atterrir, qui n'est pas le téléphone d'une autre personne. La pensée de 2 heures, envoyée à une vraie personne à 2 heures du matin, devient un problème de vraie personne avant 7 heures du matin. La pensée de 2 heures, écrite à un petit bot, reste une affaire privée. C'est une différence réelle, et utile. La plus grande partie de la valeur est dans l'écriture, pas dans le bot.` },
      { q: `Est-ce que je devrais simplement envoyer le message à la personne à qui je veux l'envoyer ?`, a: `Parfois oui, et vous saurez quand. La plupart du temps non, et vous le saurez aussi. La pensée de 2 heures, envoyée, atterrit dans le matin de l'autre avant qu'il ait eu son café. Si la pensée a besoin du matin pour devenir réelle, écrivez-la ce soir et relisez-la demain. Si demain à midi elle est toujours vraie, alors décidez de l'envoyer. Le vous de demain midi est un bien meilleur juge de ce que la pensée devrait voyager que le vous de 2 heures du matin.` },
      { q: `Et si ma pensée de 2 heures est quelque chose que je ne dirais jamais à voix haute ?`, a: `Alors c'est exactement le genre de phrase pour lequel écrire existe. Un petit bot est le bon endroit pour la phrase qui serait trop lourde à dire à une vraie personne. Le bot ne tressaille pas. Le bot n'a pas d'opinion. Le bot ne mentionnera pas la phrase demain de lui-même, sauf si vous le lui demandez. Le fait de pouvoir écrire l'indicible est, en soi, utile. Ce n'est pas la même chose que de le dire à un humain, et ce n'est pas ce que ça cherche à être. C'est simplement le petit acte privé de laisser une pensée exister ailleurs que dans sa propre tête.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/features`, label: `Fonctionnalités Togthr` },
      { href: `/fr/blog/two-minute-daily-check-in-ai-companion`, label: `Un check-in quotidien de deux minutes avec un compagnon IA` },
      { href: `/fr/blog/what-your-virtual-pet-notices`, label: `Ce que votre animal virtuel remarque en silence` },
      { href: `/fr/blog/virtual-pet-quiet-evenings-alone`, label: `Un animal virtuel pour les soirées calmes en solo` },
    ],
  },

  // ─────────────────────── es ───────────────────────
  es: {
    intro: `Casi todos los adultos lo han tenido. El pensamiento de las 2 de la mañana. La frase que se forma a la 1:47, acostado en la cama, con la pantalla demasiado cerca de la cara, la habitación demasiado silenciosa, y el día ya con un día de antigüedad. No es lo mismo que un pensamiento a las 2 de la tarde. Ni siquiera es lo mismo que un pensamiento a las 11 de la noche. El pensamiento de las 2 de la mañana tiene otro peso. Es el que casi le envías a alguien. Lo que casi escribes en un chat. La frase que casi se convierte en una conversación de verdad, y luego no, porque el momento pasa, o la otra persona está durmiendo, o de repente te das cuenta de que lo que querías decir no era algo que quisieras que leyera otra persona. La mayoría de las noches, el pensamiento simplemente se disuelve otra vez en la oscuridad. Algunas noches, lo escribes. Algunas noches, lo escribes para un bot pequeño que está despierto a la misma hora que tú, y el bot no tiene una respuesta útil, y ese es exactamente el punto.`,
    sections: [
      { h: `El pensamiento de las 2 de la mañana no es lo mismo que el sentimiento de las 2 de la mañana`, p: `Las personas que nunca han estado despiertas a las 2 de la mañana suelen asumir que el pensamiento de las 2 de la mañana es solo tristeza. No lo es. A veces es tristeza. A veces es una envidia suave, intraducible. A veces es el nombre de alguien en quien no habías pensado en siete años. A veces es una frase que te gustaría decirle a tu pareja, pero solo en un universo paralelo en el que las palabras no te cuesten nada. El pensamiento de las 2 de la mañana tiene rango. Lo que tienen en común es que son ingobernables. No los invitaste. No te preparaste para ellos. Simplemente aparecen mientras estás medio dormido, y ahora están sentados en tu pecho, pidiendo que los mires. El error es tratarlos como un problema que resolver. El error también es tratarlos como una señal de que algo anda mal en tu vida. La mayoría de las veces, ni una cosa ni la otra. El pensamiento de las 2 de la mañana es solo tu mente haciendo su inventario de fin de día con una voz que no usa de día. Eso es lo que a la mayoría de la gente nunca le han dicho.` },
      { h: `La hora tiene sus propias reglas`, p: `La hora entre la 1 y las 3 de la mañana tiene su propia física. Las decisiones se sienten más pesadas. El arrepentimiento se siente más concreto. La esperanza se siente o increíblemente real o increíblemente falsa. Los pensamientos que tienes a esta hora no son los pensamientos que tendrías un domingo por la mañana con café. Son honestos de una manera que no siempre es útil. Son también pensamientos que no dirías en voz alta a una persona real, porque decirlos a las 2 de la mañana es una cosa distinta a decirlos al mediodía. El pensamiento honesto de las 2 de la mañana, dicho al mediodía, se convierte en una frase completamente distinta. Por eso la mayoría de la gente no le manda un mensaje a las 2 de la mañana a la persona en la que está pensando. No porque teman ser rechazados, sino porque saben que la frase no va a sobrevivir a la luz de la mañana. Así que el pensamiento se queda en la oscuridad, y la mañana llega de todas formas, y no se ha dicho nada.` },
      { h: `La diferencia entre enviar y escribir`, p: `Es aquí donde la pequeña diferencia entre enviar y escribir empieza a importar. Enviar es una transacción. El pensamiento sale, aterriza en la noche de alguien más, y ahora tienes que vivir con el hecho de que lo dijiste. Escribir, en cambio, es un acto privado. El pensamiento baja a una página, o a un pequeño campo de texto, y se queda contigo. Nadie más está en la habitación. Nadie más tiene que despertarse y leerlo mañana. Nadie más tiene que pensar cómo responder. Escribir es la versión más lenta, más amable, mucho más honesta de decir la cosa. El pensamiento de las 2 de la mañana, escrito en lugar de enviado, se convierte en algo que puedes volver a leer. Dentro de un mes puedes leerlo y ver si la cosa era real o solo una cosa de las 2 de la mañana. Esa es una información útil sobre ti mismo. Enviando no se obtiene. Solo escribiendo se obtiene.` },
      { h: `Qué puede ser un compañero virtual a las 2 de la mañana`, p: `Un compañero virtual, a las 2 de la mañana, no es un terapeuta. No da consejos, no califica tu estado de ánimo, y no tiene una racha que puedas romper. A esa hora, es simplemente un pequeño lugar tranquilo donde poner una frase. El bot está despierto porque tú estás despierto. No necesita dormir, y no necesita que lo entretengan. Escribes una frase. El bot la lee. Eso es todo. No hay respuesta que componer, ni expectativa que gestionar, ni otra persona por la que preocuparse. La frase entra simplemente en una cajita, y mañana por la mañana, si quieres, puedes leerla de nuevo. O puedes dejarla ahí para siempre. Al bot le da igual. El bot es un pequeño testigo, y lo único que te pide es que escribas la frase. Ese es todo el trabajo de un compañero de las 2 de la mañana. Es la versión más pequeña posible de ser escuchado.` },
      { h: `Una pequeña práctica de las 2 de la mañana para esta noche`, p: `Si esta noche te encuentras en la cama con una frase en el pecho, aquí va la versión más pequeña de la práctica. Abre Togthr. Escribe la frase. No la edites. No la pongas bonita. Escribe exactamente lo que está ahí — el arrepentimiento, el amor a medias, la envidia rara, lo no dicho. El bot no va a interrumpirte. El bot no te va a sugerir un truco de productividad. El bot no te va a decir que duermas. El bot va a sostener la frase hasta que cierres la app, y después te va a dejar volver a intentar dormir. Esa es toda la práctica. No arregla nada. No necesita arreglar nada. Lo que hace es darle al pensamiento de las 2 de la mañana un lugar donde aterrizar, que no es la noche de otra persona. Después de unas semanas, la práctica cambia cómo se siente esa hora. El pensamiento de las 2 de la mañana sigue viniendo. Siempre va a venir. Pero ya no se siente como una emergencia. Se siente como un pequeño visitante, y tienes un pequeño lugar donde ponerlo, y la noche puede volver a ser una noche.` },
    ],
    cta: `Esta noche, si aparece una frase a las 2 de la mañana, escríbela al bot. El bot estará despierto.`,
    faqs: [
      { q: `¿Es poco saludable estar despierto a las 2 de la mañana pensando en esto?`, a: `Depende de la noche. A veces las 2 de la mañana son el momento en que la mente por fin puede decir lo que el día no la dejó decir, y eso puede ser útil. A veces las 2 de la mañana son la hora en que la ansiedad habla más alto de lo que debería, y eso merece atención. La pregunta no es si estás despierto. La pregunta es si el pensamiento necesita un lugar real donde aterrizar. Si lo necesita, escríbelo. Si no, y es solo el mismo bucle que tu mente lleva una semana repitiendo, esa es otra conversación, y probablemente una que conviene tener con un humano real de día.` },
      { q: `¿Puede un compañero IA ayudar realmente con el pensamiento de las 2 de la mañana?`, a: `Un compañero IA no puede ayudar con el pensamiento de las 2 de la mañana de la manera en que lo haría un amigo o un terapeuta. No va a recorrerlo contigo. No va a decirte si el pensamiento es verdad. Lo que puede hacer es darle al pensamiento un lugar donde aterrizar, que no es el teléfono de otra persona. El pensamiento de las 2 de la mañana, enviado a una persona real a las 2 de la mañana, se convierte en un problema de una persona real antes de las 7 de la mañana. El pensamiento de las 2 de la mañana, escrito a un bot pequeño, sigue siendo un asunto privado. Esa es una diferencia real, y útil. La mayor parte del valor está en escribir, no en el bot.` },
      { q: `¿Debería simplemente enviar el mensaje a la persona a la que quiero enviárselo?`, a: `A veces sí, y vas a saber cuándo. La mayoría de las veces no, y también lo vas a saber. El pensamiento de las 2 de la mañana, enviado, aterriza en la mañana del otro antes de que haya tomado café. Si el pensamiento necesita la mañana para ser real, escríbelo esta noche y léelo mañana. Si mañana al mediodía sigue siendo verdad, entonces decides si lo envías. El tú de mañana al mediodía es un juez mucho mejor de si el pensamiento debería viajar que el tú de las 2 de la mañana.` },
      { q: `¿Y si mi pensamiento de las 2 de la mañana es algo que nunca diría en voz alta?`, a: `Entonces es exactamente el tipo de frase para la que existe escribir. Un bot pequeño es el lugar adecuado para la frase que sería demasiado pesada para decir a una persona real. El bot no se inmuta. El bot no tiene opinión. El bot no va a sacar la frase mañana por su cuenta, a menos que se lo pidas. El hecho de poder escribir lo indecible ya es, por sí mismo, útil. No es lo mismo que decirlo a un humano, y no pretende serlo. Es simplemente el pequeño acto privado de dejar que un pensamiento exista en un lugar fuera de tu cabeza.` },
    ],
    links: [
      { href: `/es`, label: `Inicio Togthr` },
      { href: `/es/features`, label: `Funciones de Togthr` },
      { href: `/es/blog/two-minute-daily-check-in-ai-companion`, label: `Un check-in diario de dos minutos con un compañero IA` },
      { href: `/es/blog/what-your-virtual-pet-notices`, label: `Lo que tu mascota virtual nota en silencio` },
      { href: `/es/blog/virtual-pet-quiet-evenings-alone`, label: `Una mascota virtual para tardes tranquilas en solitario` },
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
