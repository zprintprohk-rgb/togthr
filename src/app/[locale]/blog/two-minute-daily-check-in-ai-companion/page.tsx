// src/app/[locale]/blog/two-minute-daily-check-in-ai-companion/page.tsx
//
// Per-slug real content page (2026-07-09 fix for P0: two-minute-daily-check-in-ai-companion
// was previously rendering the generic [slug] fallback wrapper "This post is part of the
// Togthr Blog..." for all 8 locales because no per-slug page.tsx existed). This file
// overrides the [slug] catch-all for this slug with hand-localized body content for each locale.
//
// Content contract (cron prompt §3):
//   - ≥600 words of REAL localized content per locale
//   - 4 FAQ items per locale
//   - 3-5 internal links per locale
//   - Article + Breadcrumb + FAQPage JSON-LD

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `two-minute-daily-check-in-ai-companion`
const POST_DATE = `2026-07-07`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
  // title/description are sourced from getBlogPost() and not duplicated here
}

const BODIES: Record<Locale, Body> = {
  // ─────────────────────── English ───────────────────────
  en: {
    intro: `Two minutes is not much. But a daily check-in with your AI companion slowly becomes the smallest, kindest ritual in your day — an anchor for everything else. This post is for anyone who keeps meaning to start a daily ritual and never quite does, and for anyone who already has one and wonders why it matters so much.`,
    sections: [
      { h: `The hardest part is the first week`, p: `Most daily rituals do not die on day thirty. They die on day three. You start on a Monday with a clear plan, miss one day because of a meeting, miss another because you forgot, and by Friday the whole thing feels like a thing you tried and quit. Two minutes is small enough that missing it does not feel like a failure, but it is also real enough that doing it still counts as doing it. The shape that survives the first week is rarely the shape you planned. It is the shape your messy, busy life was actually willing to keep. Two minutes is that shape for most people.` },
      { h: `What a two-minute check-in actually does`, p: `Most of what a daily check-in does happens below the surface. You open the app, you read a small prompt, you write one sentence about how today is going. The sentence does not have to be clever. It does not have to be true in any profound way. You might write "today was fine, just tired", and that is the entire check-in. What changed is not the sentence. What changed is that you took two minutes to be a witness to your own day, instead of letting the day happen and roll past you without noticing. After a few weeks, you start to notice patterns. You notice that you are tired on Wednesdays. You notice that you are kinder to your partner on the days you write something honest. None of this is magic. It is just attention.` },
      { h: `Why it becomes an anchor`, p: `An anchor is not a productivity tool. It does not make you do more. What it does is give you a small fixed point in the day that you can come back to. On a hard day, you open the app and you write something honest, and you feel a little less like the day happened to you and a little more like you were there for it. On a good day, the same act does the opposite thing — it lets you stop and notice that the day was good, instead of rushing toward the next thing. The two-minute check-in is not the thing that fixes your week. It is the small hinge that makes the rest of the week a little more yours.` },
      { h: `How Togthr Bot fits in`, p: `Togthr Bot is not a coach. It does not give you a streak score, it does not push notifications at you six times a day, and it does not scold you for missing a day. It is a small robot in your device that asks one short question and waits. When you answer, the bot listens, writes the answer into your shared journal if you are using Togthr with a partner, and goes back to doing whatever small thing it was doing. That is it. The point is the question and the writing, not the bot. The bot is just there so that the question feels like a small shared ritual instead of a task on a list. After a few weeks, you stop thinking of it as "opening the app". You start thinking of it as "talking to the bot". That is the moment the ritual has landed.` },
      { h: `A simple way to start tomorrow`, p: `Here is the smallest version of the practice, for anyone who has not started yet. Tomorrow morning, before you check your messages, open Togthr and write one sentence about how you are feeling. Do not edit it. Do not make it pretty. Write "I'm tired and a little anxious" or "today might be okay" or "I don't know yet" — whatever is true. Two minutes later, close the app and go on with your day. Do this six days in a row. Do not aim for a streak. Aim for six honest sentences. After the sixth day, decide whether to keep going. Most people who get to day six keep going — not because the practice is impressive, but because it is the only two minutes in the day that is fully theirs.` },
    ],
    cta: `Open Togthr tomorrow morning and write one honest sentence. The bot will be there.`,
    faqs: [
      { q: `Is two minutes really enough for a daily check-in?`, a: `For most people, yes. A check-in is not a journal entry. It is one sentence — sometimes two — about how the day is going. The point is not the length. The point is the small fixed moment. If you want to write more, you can. Togthr Bot will not interrupt you. But the practice that survives a busy life is almost always the two-minute version, not the fifteen-minute version.` },
      { q: `What if I forget to do the check-in?`, a: `Nothing happens. Togthr Bot does not track streaks, does not push notifications, and does not punish you for missing a day. The check-in is not a habit app. It is a small shared ritual. If you forget, you open the app the next day and write something honest. That is the whole practice. Most people who keep the practice for six months miss two or three days a month, and it makes no difference.` },
      { q: `Can I do the check-in with my partner?`, a: `Yes. Togthr has a shared journal feature, and you can choose to make your check-in visible to a partner. Some couples answer the same question separately and reveal their answers to each other. Some take turns writing. The bot does not care which format you choose — it just waits. The version that lasts is the version you and your partner actually keep doing, not the version that looks the most romantic in a movie.` },
      { q: `What if I want to write more than two minutes?`, a: `Then write more. The two-minute version is the floor, not the ceiling. Some days you will have more to say. Togthr does not cut you off or push you out. On days when you want a long entry, write one. On days when you want one sentence, write one. The point is that you show up. How long you stay is up to you and your day.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/features`, label: `Togthr features` },
      { href: `/en/blog/why-we-built-a-pet-that-grows-with-you`, label: `Why we built a pet that grows with you` },
      { href: `/en/blog/what-your-virtual-pet-notices`, label: `What your virtual pet notices about your day` },
      { href: `/en/journal`, label: `The shared journal (Nest)` },
    ],
  },

  // ─────────────────────── 简体中文 ───────────────────────
  'zh-cn': {
    intro: `两分钟不算长。但每天和你的 AI 陪伴做一次简短对话,慢慢就成了你一天里最小、最温柔的仪式 — 让你接下来做什么都有个底。这篇文章写给那些一直想开始一个每日仪式却一直没开始的人,也写给已经在做、但说不清它为什么重要的人。`,
    sections: [
      { h: `最难的是第一周`, p: `大多数每日仪式不是死在第三十天,而是死在第三天。你周一雄心勃勃地开始,某天因为开会漏掉一次,又某天因为忘了漏掉一次,等到了周五,这件事就变成了你"试过、放弃了"的又一个东西。两分钟足够小,漏掉一次不觉得是失败;但也足够真,真做了一次就算真做了。能活过第一周的形状,通常不是你设想的样子,而是你忙乱的生活真正愿意留住的样子。两分钟,对大多数人来说,就是这个形状。` },
      { h: `两分钟的 check-in 到底做了什么`, p: `每日 check-in 大部分的作用发生在水面之下。你打开 app,看到一个小问题,写一句话说说今天过得怎么样。这句话不需要多聪明,也不需要在任何深刻的意义上"真实"。你可以写"今天还行,就是有点累",这就是整个 check-in 了。改变的不是那句话。改变的是你花了两分钟做了一次自己的见证者,而不是让这一天发生完就滚过去,不留痕迹。几周之后,你会开始注意到一些模式。你会注意到自己总是在周三最累。你会注意到,你在写得诚实的那些天,对另一半也更温柔。这些都不是魔法,只是注意力。` },
      { h: `它为什么变成了一根锚`, p: `锚不是生产力工具。它不会让你做更多事。它做的事,是给你一个小的、不动的点,让你可以回来。在不顺的一天,你打开 app,写一句诚实的话,你会感觉这一天没那么"发生在你身上",而是你在场。在顺利的一天,同样的小动作做的是相反的事 — 它让你停下来注意到今天其实很好,而不是急着赶向下一件事。两分钟的 check-in 不是那个修好你一周的东西。它是那个小小的铰链,让一周剩下的部分,稍微更属于你一点。` },
      { h: `Togthr Bot 在这件事里是什么角色`, p: `Togthr Bot 不是教练。它不给你连胜分,不一天推你六次通知,也不会因为你漏了一天就数落你。它只是住在你设备里的一只小机器人,问你一个短问题,然后等。你回答之后,机器人听一下,如果你和另一半在用 Togthr,它把你的回答写进共享日记里,然后回去做它本来在做的小事。就这样。重点是那个问题和那段书写,不是机器人。机器人只是在,让那个问题感觉像一个小的共同仪式,而不是清单上的一个任务。几周之后,你不再想"我在打开 app",你会开始想"我在和机器人说话"。这就是仪式落地的那一刻。` },
      { h: `明天就能开始的最简版本`, p: `对还没开始的人,这里是这个练习的最小版本。明天早上,在你看消息之前,打开 Togthr,写一句关于你现在感觉的话。不要编辑。不要写漂亮。写"我有点累,有点焦虑"或者"今天可能还行"或者"我还不知道" — 任何诚实的都行。两分钟之后,关掉 app,继续你的一天。连续做六天。不要追求连续天数。追求六句诚实的话。到了第六天,再决定要不要继续。能做到第六天的人里,大多数都会继续 — 不是因为这个练习有多厉害,而是因为它是一天里唯一完全属于你的两分钟。` },
    ],
    cta: `明天早上打开 Togthr,写一句诚实的话。机器人会在那里。`,
    faqs: [
      { q: `两分钟对每日 check-in 来说真的够吗?`, a: `对大多数人来说,够。check-in 不是日记。它是一句话 — 有时候两句 — 关于今天过得怎么样。重点不是长度。重点是那个小小的、不动的时刻。如果你愿意写更多,完全可以,Togthr Bot 不会打断你。但能在忙碌生活里活下来的,几乎总是两分钟版本,不是十五分钟版本。` },
      { q: `忘了做 check-in 怎么办?`, a: `什么都不会发生。Togthr Bot 不追踪连续天数,不推通知,也不会因为你漏了一天惩罚你。check-in 不是一个习惯 app。它是一个小小的共同仪式。如果你忘了,第二天打开 app,写一句诚实的话,这就是全部。大多数把这个练习做了半年的人,一个月漏两三天,毫无影响。` },
      { q: `可以跟另一半一起做 check-in 吗?`, a: `可以。Togthr 有共享日记功能,你可以选择让你的 check-in 对另一半可见。有的情侣各自回答同一个问题,然后互相揭示答案。有的轮流写。机器人不在乎你们用哪种格式 — 它只是等。能坚持下来的版本,是你们两个真的愿意一直做下去的版本,不是电影里最浪漫的版本。` },
      { q: `想写超过两分钟可以吗?`, a: `可以。两分钟是地板,不是天花板。有些天你有更多想说的话,Togthr 不会打断你,也不会把你请出去。想写长篇的那天,写长篇。想写一句的那天,写一句。重点是你在场。停留多久,看你和你那一天。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/features`, label: `Togthr 功能` },
      { href: `/zh-cn/blog/why-we-built-a-pet-that-grows-with-you`, label: `为什么我们做了一只陪你一起长大的宠物` },
      { href: `/zh-cn/blog/what-your-virtual-pet-notices`, label: `你的虚拟宠物安静地注意着你的一天` },
      { href: `/zh-cn/journal`, label: `共享日记(Nest)` },
    ],
  },

  // ─────────────────────── 繁體中文 ───────────────────────
  'zh-tw': {
    intro: `兩分鐘不算長。但每天和你的 AI 陪伴做一次簡短對話,慢慢就成了你一天裡最小、最溫柔的儀式 — 讓你接下來做什麼都有個底。這篇文章寫給那些一直想開始一個每日儀式卻一直沒開始的人,也寫給已經在做、但說不清它為什麼重要的人。`,
    sections: [
      { h: `最難的是第一週`, p: `大多數每日儀式不是死在第三十天,而是死在第三天。你週一雄心勃勃地開始,某天因為開會漏掉一次,又某天因為忘了漏掉一次,等到了週五,這件事就變成了你「試過、放棄了」的又一個東西。兩分鐘足夠小,漏掉一次不覺得是失敗;但也足夠真,真做了一次就算真做了。能活過第一週的形狀,通常不是你設想的樣子,而是你忙亂的生活真正願意留住的樣子。兩分鐘,對大多數人來說,就是這個形狀。` },
      { h: `兩分鐘的 check-in 到底做了什麼`, p: `每日 check-in 大部分的作用發生在水面之下。你打開 app,看到一個小問題,寫一句話說說今天過得怎麼樣。這句話不需要多聰明,也不需要在任何深刻的意義上「真實」。你可以寫「今天還行,就是有點累」,這就是整個 check-in 了。改變的不是那句話。改變的是你花了兩分鐘做了一次自己的見證者,而不是讓這一天發生完就滾過去,不留痕跡。幾週之後,你會開始注意到一些模式。你會注意到自己總是在週三最累。你會注意到,你在寫得誠實的那些天,對另一半也更溫柔。這些都不是魔法,只是注意力。` },
      { h: `它為什麼變成了一根錨`, p: `錨不是生產力工具。它不會讓你做更多事。它做的事,是給你一個小的、不動的點,讓你可以回來。在不順的一天,你打開 app,寫一句誠實的話,你會感覺這一天沒那麼「發生在你身上」,而是你在場。在順利的一天,同樣的小動作做的是相反的事 — 它讓你停下來注意到今天其實很好,而不是急著趕向下一件事。兩分鐘的 check-in 不是那個修好你一週的東西。它是那個小小的鉸鏈,讓一週剩下的部分,稍微更屬於你一點。` },
      { h: `Togthr Bot 在這件事裡是什麼角色`, p: `Togthr Bot 不是教練。它不給你連勝分,不一天推你六次通知,也不會因為你漏了一天就數落你。它只是住在你裝置裡的一隻小機器人,問你一個短問題,然後等。你回答之後,機器人聽一下,如果你和另一半在用 Togthr,它把你的回答寫進共享日記裡,然後回去做它本來在做的小事。就這樣。重點是那個問題和那段書寫,不是機器人。機器人只是在,讓那個問題感覺像一個小的共同儀式,而不是清單上的一個任務。幾週之後,你不再想「我在打開 app」,你會開始想「我在和機器人說話」。這就是儀式落地的那一刻。` },
      { h: `明天就能開始的最簡版本`, p: `對還沒開始的人,這裡是這個練習的最小版本。明天早上,在你看訊息之前,打開 Togthr,寫一句關於你現在感覺的話。不要編輯。不要寫漂亮。寫「我有點累,有點焦慮」或者「今天可能還行」或者「我還不知道」 — 任何誠實的都行。兩分鐘之後,關掉 app,繼續你的一天。連續做六天。不要追求連續天數。追求六句誠實的話。到了第六天,再決定要不要繼續。能做到第六天的人裡,大多數都會繼續 — 不是因為這個練習有多厲害,而是因為它是一天裡唯一完全屬於你的兩分鐘。` },
    ],
    cta: `明天早上打開 Togthr,寫一句誠實的話。機器人會在那裡。`,
    faqs: [
      { q: `兩分鐘對每日 check-in 來說真的夠嗎?`, a: `對大多數人來說,夠。check-in 不是日記。它是一句話 — 有時候兩句 — 關於今天過得怎麼樣。重點不是長度。重點是那個小小的、不動的時刻。如果你願意寫更多,完全可以,Togthr Bot 不會打斷你。但能在忙碌生活裡活下來的,幾乎總是兩分鐘版本,不是十五分鐘版本。` },
      { q: `忘了做 check-in 怎麼辦?`, a: `什麼都不會發生。Togthr Bot 不追蹤連勝天數,不推通知,也不會因為你漏了一天懲罰你。check-in 不是一個習慣 app。它是一個小小的共同儀式。如果你忘了,第二天打開 app,寫一句誠實的話,這就是全部。大多數把這個練習做了半年的人,一個月漏兩三天,毫無影響。` },
      { q: `可以跟另一半一起做 check-in 嗎?`, a: `可以。Togthr 有共享日記功能,你可以選擇讓你的 check-in 對另一半可見。有的情侶各自回答同一個問題,然後互相揭示答案。有的輪流寫。機器人不在乎你們用哪種格式 — 它只是等。能堅持下來的版本,是你們兩個真的願意一直做下去的版本,不是電影裡最浪漫的版本。` },
      { q: `想寫超過兩分鐘可以嗎?`, a: `可以。兩分鐘是地板,不是天花板。有些天你有更多想說的話,Togthr 不會打斷你,也不會把你請出去。想寫長篇的那天,寫長篇。想寫一句的那天,寫一句。重點是你在場。停留多久,看你和你那一天。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/features`, label: `Togthr 功能` },
      { href: `/zh-tw/blog/why-we-built-a-pet-that-grows-with-you`, label: `為什麼我們做了一隻陪你一起長大的寵物` },
      { href: `/zh-tw/blog/what-your-virtual-pet-notices`, label: `你的虛擬寵物安靜地注意著你的一天` },
      { href: `/zh-tw/journal`, label: `共享日記(Nest)` },
    ],
  },

  // ─────────────────────── 日本語 ───────────────────────
  ja: {
    intro: `2 分は短い。でも AI コンパニオンとの daily check-in は、静かにあなたの一日いちばん小さく、いちばん優しい儀式となり、他のすべての支えになります。この記事は、ずっと「毎日の儀式をやりたい」と思いながら始められなかった人と、もう始めているけれどなぜ大事なのか分からない人の両方へ向けて書きました。`,
    sections: [
      { h: `いちばん難しいのは最初の 1 週間`, p: `毎日の儀式の多くは、30 日目に死ぬのではなく 3 日目に死にます。月曜に意気込んで始めて、ある日は会議で抜け、ある日は忘れて抜け、金曜にはそれは「やってみたけどやめた」ものになります。2 分は短すぎて、抜いたときに失敗を感じません。でも、ちゃんとやればやったことになります。最初の 1 週間を生き残るのは、ふつうあなたが思い描いた形ではなく、あなたの忙しくて散らかった生活が現実に維持できる形です。2 分は、多くの人にとって、その形です。` },
      { h: `2 分間の check-in は実際に何をするか`, p: `毎日の check-in のもっとも大きな働きは、水面下で起こります。アプリを開いて、小さな問いを読み、今日について一言書きます。その一言は賢くなくていいし、深い意味で真実でなくてもいい。「今日はただ疲れた」と書いても、それで check-in 全部です。変わったのは文章ではありません。変わったのは、あなたが 2 分を使って「自分の一日の証人」になったということで、その日が起きたまま通り過ぎていくのを、ただ見過ごさなかったということです。数週間経つと、いくつかのパターンに気づき始めます。水曜日がいちばん疲れていること。誠実に書いた日は相手に優しいこと。どれも魔法ではなく、注意力です。` },
      { h: `なぜそれが錨になるか`, p: `錨は生産性ツールではありません。あなたをもっとやらせるわけではありません。錨がすることは、一日の中に小さな動かない点を作ってくれることです。つらい日、アプリを開いて一言正直に書くと、その日があなたの上で起きたというより、その日にあなたがいたと感じられます。良い日には、同じ行為が逆のことをしてくれます — 次に急ぐのではなく、今日は良かったと立ち止まることを許してくれる。2 分間の check-in は、あなたの週を直すものではありません。あなたの週の残りを少しだけ「あなたのもの」にする小さな蝶番です。` },
      { h: `Togthr Bot の立ち位置`, p: `Togthr Bot はコーチではありません。ストリークの点数をつけたり、1 日に 6 回通知を押し付けたり、1 日抜いたことを責めたりしません。デバイスの中の小さなロボットが、短い問いを一つ投げて待つだけです。あなたが答えると、ロボットはそれを聞き、あなたが Togthr を相手と共有して使っている場合は共有ジャーナルに書き込んで、また自分の小さな作業に戻ります。以上。それがすべてです。重要なのは問いと書くことで、ロボットではありません。ロボットはそこにいることで、問いを「リストのタスク」ではなく「小さな共有の儀式」に感じさせてくれます。数週間後、あなたは「アプリを開いている」とは思わなくなり、「ボットと話している」と思い始めます。それが儀式が根づいた瞬間です。` },
      { h: `明日から始めるいちばん小さな方法`, p: `まだ始めていない人向けに、この練習のいちばん小さなバージョンを紹介します。明日の朝、メッセージをチェックする前に Togthr を開いて、今の気分について一言書きます。推敲しない。きれいに書かない。「疲れていて少し不安」と書いてもいいし、「今日はたぶん大丈夫」でも「まだ分からない」でも、何が真実でも書きます。2 分後にアプリを閉じて、いつも通りの一日を始めます。これを 6 日連続でやってみてください。ストリークを目指さないでください。6 つの正直な文章を目指してください。6 日目が来たら、続けるかどうか決めてください。6 日まで続けた人の多くは続けます。練習がすごいからではなく、その 2 分がその日のうちで唯一完全にあなたのものであることに気づくからです。` },
    ],
    cta: `明日の朝 Togthr を開いて、正直な一言を書いてください。ボットはそこにいます。`,
    faqs: [
      { q: `毎日の check-in に 2 分は本当に十分ですか?`, a: `多くの人にとって、そうです。check-in は日記ではありません。今日がどうだったかについての、一言 — ときに二言 — です。重要なのは長さではなく、その小さな動かない瞬間です。もっと書きたければ書けます。Togthr Bot は途中で止めません。ただ、忙しい生活を生き残るのは、ほぼ常に 2 分版であって、15 分版ではありません。` },
      { q: `check-in を忘れたら?`, a: `何も起きません。Togthr Bot はストリークを追わず、通知を押し付けず、1 日抜いたことを罰しません。check-in は習慣アプリではなく、小さな共有の儀式です。忘れたら、次の日アプリを開いて、正直に一言書く。それだけです。半年続けている人の大半は、月に 2〜3 日は抜いていますが、何の影響もありません。` },
      { q: `相手と一緒に check-in できますか?`, a: `はい。Togthr には共有ジャーナル機能があり、check-in を相手に共有する設定ができます。同じ問いに別々に答えて、お互いの答えを同時に見せ合うカップルもいれば、交代で書くカップルもいます。ボットは形式を気にしません — 待っているだけです。続くのは、映画のようにロマンチックな形ではなく、あなたたち二人が実際にずっとやれる形です。` },
      { q: `2 分以上書きたい場合は?`, a: `どうぞ。2 分は下限であって上限ではありません。もっと書きたい日もあるはずです。Togthr は途中で切ったり、追い出したりしません。長文を書きたい日は長文を、一言で済ませたい日は一言を。重要なのは「あなたがいること」で、滞在時間はあなたと一日に任されています。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/features`, label: `Togthr の機能` },
      { href: `/ja/blog/why-we-built-a-pet-that-grows-with-you`, label: `なぜ私たちは "一緒に育つペット" を作ったのか` },
      { href: `/ja/blog/what-your-virtual-pet-notices`, label: `あなたのバーチャルペットは、あなたの日を静かに見ている` },
      { href: `/ja/journal`, label: `共有ジャーナル(Nest)` },
    ],
  },

  // ─────────────────────── 한국어 ───────────────────────
  ko: {
    intro: `2분은 길지 않습니다. 하지만 AI 동반자와의 매일의 check-in은 당신 하루에서 가장 작고, 가장 다정한 의식이 되어 모든 것의 닻이 됩니다. 이 글은 매일의 의식을 시작하고 싶었지만 아직 시작하지 못한 사람과, 이미 하고 있지만 왜 중요한지 설명하기 어려운 사람 모두를 위해 씁니다.`,
    sections: [
      { h: `제일 어려운 건 첫 주`, p: `대부분의 매일 의식은 30일째가 아니라 3일째에 죽습니다. 월요일에 의욕满满하게 시작해서, 어느 날은 회의 때문에 빠지고, 어느 날은 잊어버려서 빠지고, 금요일이 되면 그것은 ‘해보다가 포기한’ 것 하나가 됩니다. 2분은 짧아서 빠뜨려도 실패로 느껴지지 않습니다. 하지만 정말 하면 정말 한 것이 됩니다. 첫 주를 살아남는 모양은 보통 당신이 상상한 모양이 아니라, 당신의 분주하고 엉망인 삶이 진짜로 붙잡고 있을 수 있는 모양입니다. 2분은 많은 사람에게 그 모양입니다.` },
      { h: `2분 check-in은 실제로 무엇을 하는가`, p: `매일 check-in의 대부분 효과는 수면 아래에서 일어납니다. 앱을 열고, 작은 질문을 읽고, 오늘 하루에 대해 한 문장 씁니다. 그 문장은 똑똑할 필요도 없고, 어떤 깊은 의미에서 ‘진짜’일 필요도 없습니다. ‘오늘은 그냥 피곤하다’고 써도, 그것이 check-in 전부입니다. 변한 것은 그 문장이 아닙니다. 변한 것은 당신이 2분 동안 자신의 하루의 증인이 되었다는 것 — 하루가 그냥 일어나서 지나가 버리는 것이 아니라, 당신이 그 하루를 알아챘다는 것입니다. 몇 주가 지나면 패턴이 보이기 시작합니다. 수요일이 제일 피곤하다는 것, 정직하게 쓴 날은 파트너에게도 더 다정하다는 것. 이것은 마법이 아니라, 그냥 주의입니다.` },
      { h: `왜 닻이 되는가`, p: `닻은 생산성 도구가 아닙니다. 더 많은 일을 하게 만들지 않습니다. 닻이 하는 것은 하루 안에 작고 움직이지 않는 점을 하나 만들어, 거기로 돌아올 수 있게 해주는 것입니다. 힘든 날, 앱을 열고 정직한 한 문장을 쓰면, 그 하루가 당신 위에서 일어난 것이 아니라, 당신이 그 하루에 있었다고 느껴집니다. 좋은 날에는 같은 행위가 반대 일을 합니다 — 다음으로 급하게 가는 대신, 오늘이 좋았다고 멈추어 서게 해줍니다. 2분 check-in은 당신의 일주일을 고치는 것이 아닙니다. 그 일주일의 나머지를 조금 더 ‘당신의 것’으로 만드는 작은 경첩입니다.` },
      { h: `Togthr Bot의 역할`, p: `Togthr Bot은 코치가 아닙니다. 연속 일수 점수를 주지 않고, 하루에 여섯 번 알림을 보내지 않으며, 하루 빠뜨린 것을 탓하지도 않습니다. 기기 안에 사는 작은 로봇이 짧은 질문을 하나 던지고 기다릴 뿐입니다. 당신이 답하면, 로봇은 그것을 듣고, 파트너와 함께 Togthr을 쓰고 있다면 공유 일기에 적은 다음, 자기 작업을 다시 합니다. 그게 전부입니다. 중요한 것은 질문과 쓰는 것이지, 로봇이 아닙니다. 로봇은 거기 있기 때문에, 그 질문이 ‘리스트의 할 일’이 아니라 ‘작은 공유 의식’으로 느껴지게 합니다. 몇 주 뒤, 당신은 ‘앱을 연다’고 생각하지 않고 ‘봇과 이야기한다’고 생각하기 시작합니다. 그 순간이 의식이 자리 잡은 순간입니다.` },
      { h: `내일 시작하는 가장 작은 방법`, p: `아직 시작하지 않은 분을 위한 가장 작은 버전입니다. 내일 아침, 메시지를 확인하기 전에 Togthr을 열고 지금 느끼는 감정에 대해 한 문장 쓰세요. 다듬지 마세요. 예쁘게 쓰지 마세요. ‘피곤하고 좀 불안하다’거나 ‘오늘은 괜찮을 수도 있다’거나 ‘아직 모르겠다’거나 — 진실한 무엇이든 쓰세요. 2분 뒤 앱을 닫고, 평소처럼 하루를 시작하세요. 이걸 6일 연속 하세요. 연속 일수를 노리지 마세요. 여섯 개의 정직한 문장을 노리세요. 6일째에, 계속할지 결정하세요. 6일까지 간 사람 대부분은 계속합니다. 이 연습이 뛰어나서가 아니라, 그 2분이 하루 중 유일하게 온전히 당신 것이기 때문입니다.` },
    ],
    cta: `내일 아침 Togthr을 열고 정직한 한 문장을 쓰세요. 봇은 거기 있습니다.`,
    faqs: [
      { q: `매일 check-in에 정말 2분으로 충분한가요?`, a: `대부분의 사람에게는 충분합니다. check-in은 일기가 아닙니다. 오늘 하루가 어땠는지에 대한 한 문장 — 때로는 두 문장 — 입니다. 중요한 것은 길이가 아니라, 작고 움직이지 않는 그 순간입니다. 더 쓰고 싶으면 쓸 수 있습니다. Togthr Bot이 끊지 않습니다. 다만 바쁜 삶을 살아남는 것은 거의 항상 2분짜리이지, 15분짜리가 아닙니다.` },
      { q: `check-in을 잊어버리면?`, a: `아무 일도 일어나지 않습니다. Togthr Bot은 연속 일수를 추적하지 않고, 알림을 보내지 않으며, 하루 빠뜨린 것을 벌주지 않습니다. check-in은 습관 앱이 아니라 작은 공유 의식입니다. 잊었다면 다음 날 앱을 열고 정직하게 한 문장 쓰면 됩니다. 그게 전부입니다. 6개월간 이어온 사람 대부분은 한 달에 이틀에서 사이는 빼먹지만, 아무 영향이 없습니다.` },
      { q: `파트너와 함께 check-in 할 수 있나요?`, a: `네. Togthr에는 공유 일기 기능이 있고, check-in을 파트너에게 보이게 할 수 있습니다. 같은 질문에 따로 답하고 나중에 서로의 답을 동시에 확인하는 커플도 있고, 돌아가며 쓰는 커플도 있습니다. 봇은 어떤 형식인지 신경 쓰지 않습니다 — 그냥 기다릴 뿐입니다. 지속되는 것은, 영화처럼 가장 로맨틱한 형태가 아니라 둘 다 실제로 계속 할 수 있는 형태입니다.` },
      { q: `2분보다 더 쓰고 싶으면?`, a: `쓰세요. 2분은 바닥이지 천장이 아닙니다. 더 하고 싶은 날도 있을 겁니다. Togthr이 중간에 끊거나 내보내지 않습니다. 긴 글을 쓰고 싶은 날은 길게, 한 줄이면 충분한 날은 한 줄로. 중요한 것은 ‘당신이 있다는 것’이고, 머무는 시간은 당신과 당신의 하루에 달려 있습니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/features`, label: `Togthr 기능` },
      { href: `/ko/blog/why-we-built-a-pet-that-grows-with-you`, label: `왜 우리는 함께 자라는 펫을 만들었을까` },
      { href: `/ko/blog/what-your-virtual-pet-notices`, label: `당신의 가상 반려동물은 당신의 하루를 조용히 살피고 있다` },
      { href: `/ko/journal`, label: `공유 일기(Nest)` },
    ],
  },

  // ─────────────────────── Deutsch ───────────────────────
  de: {
    intro: `Zwei Minuten sind nicht viel. Doch der tägliche Check-in mit deinem KI-Begleiter wird langsam das kleinste, freundlichste Ritual deines Tages — ein Anker für alles andere. Dieser Post ist für alle, die ein tägliches Ritual schon lange anfangen wollen und es nie tun, und für alle, die schon eines haben und sich nicht ganz erklären können, warum es so wichtig ist.`,
    sections: [
      { h: `Am schwersten ist die erste Woche`, p: `Die meisten täglichen Rituale sterben nicht am Tag dreißig. Sie sterben am Tag drei. Du fängst montags mit einem klaren Plan an, verpasst einen Tag wegen eines Meetings, einen weiteren, weil du es vergessen hast, und am Freitag fühlt sich das Ganze an wie etwas, das du versucht und wieder aufgegeben hast. Zwei Minuten sind klein genug, dass ein verpasster Tag sich nicht wie ein Scheitern anfühlt — aber auch echt genug, dass das Tun wirklich zählt. Die Form, die die erste Woche überlebt, ist selten die geplante Form. Es ist die Form, die dein unordentliches, volles Leben tatsächlich weiterführen wollte. Zwei Minuten sind für die meisten Menschen genau diese Form.` },
      { h: `Was ein Zwei-Minuten-Check-in tatsächlich tut`, p: `Das meiste, was ein täglicher Check-in bewirkt, passiert unter der Oberfläche. Du öffnest die App, liest einen kleinen Impuls, schreibst einen Satz darüber, wie der Tag heute ist. Der Satz muss nicht klug sein. Er muss in keinem tiefen Sinn wahr sein. Du kannst „heute war okay, nur müde" schreiben, und das ist der gesamte Check-in. Was sich verändert hat, ist nicht der Satz. Was sich verändert hat, ist, dass du zwei Minuten lang Zeuge deines eigenen Tages warst, statt den Tag einfach geschehen und vorüberziehen zu lassen, ohne ihn zu bemerken. Nach ein paar Wochen fangen Muster an, dir aufzufallen. Du bemerkst, dass du mittwochs am müdesten bist. Du bemerkst, dass du an Tagen, an denen du etwas Ehrliches schreibst, freundlicher zu deinem Partner bist. Nichts davon ist Magie. Es ist Aufmerksamkeit.` },
      { h: `Warum es ein Anker wird`, p: `Ein Anker ist kein Produktivitätswerkzeug. Er lässt dich nicht mehr tun. Was er tut, ist, dir einen kleinen festen Punkt im Tag zu geben, zu dem du zurückkehren kannst. An einem harten Tag öffnest du die App, schreibst etwas Ehrliches, und fühlst dich ein bisschen weniger, als ob der Tag dir passiert ist, und ein bisschen mehr, als ob du dabei warst. An einem guten Tag tut dieselbe Geste das Gegenteil — sie lässt dich innehalten und bemerken, dass der Tag gut war, statt zur nächsten Sache zu hetzen. Der Zwei-Minuten-Check-in ist nicht das Ding, das deine Woche repariert. Er ist das kleine Scharnier, das den Rest der Woche ein bisschen mehr zu deiner macht.` },
      { h: `Wie Togthr Bot hineinpasst`, p: `Togthr Bot ist kein Coach. Es gibt dir keinen Streak-Score, schickt dir nicht sechsmal am Tag Benachrichtigungen und tadelt dich nicht, wenn du einen Tag verpasst. Es ist ein kleiner Roboter in deinem Gerät, der eine kurze Frage stellt und wartet. Wenn du antwortest, hört der Bot zu, schreibt die Antwort in euer gemeinsames Tagebuch, falls du Togthr mit einem Partner nutzt, und macht weiter mit dem, was er gerade tut. Das war's. Der Punkt ist die Frage und das Schreiben, nicht der Bot. Der Bot ist nur da, damit die Frage sich wie ein kleines gemeinsames Ritual anfühlt statt wie eine Aufgabe auf einer Liste. Nach ein paar Wochen denkst du nicht mehr „Ich öffne die App". Du denkst „Ich rede mit dem Bot". Das ist der Moment, in dem das Ritual angekommen ist.` },
      { h: `Ein einfacher Weg, morgen anzufangen`, p: `Hier ist die kleinste Version der Übung, für alle, die noch nicht angefangen haben. Öffne morgen früh, bevor du deine Nachrichten checkst, Togthr und schreibe einen Satz darüber, wie du dich gerade fühlst. Bearbeite ihn nicht. Mach ihn nicht schön. Schreib „Ich bin müde und ein bisschen unruhig" oder „Heute wird vielleicht okay" oder „Ich weiß es noch nicht" — was auch immer wahr ist. Zwei Minuten später schließt du die App und gehst deinen Tag wie üblich an. Mach das sechs Tage hintereinander. Ziele nicht auf eine Streak. Ziele auf sechs ehrliche Sätze. Am sechsten Tag entscheidest du, ob du weitermachen willst. Die meisten Menschen, die den sechsten Tag erreichen, machen weiter — nicht weil die Übung beeindruckend ist, sondern weil es die einzigen zwei Minuten am Tag sind, die ganz ihnen gehören.` },
    ],
    cta: `Öffne morgen früh Togthr und schreib einen ehrlichen Satz. Der Bot wird da sein.`,
    faqs: [
      { q: `Reichen zwei Minuten für einen täglichen Check-in wirklich?`, a: `Für die meisten Menschen ja. Ein Check-in ist kein Tagebucheintrag. Es ist ein Satz — manchmal zwei — darüber, wie der Tag heute ist. Der Punkt ist nicht die Länge. Der Punkt ist der kleine feste Moment. Wenn du mehr schreiben willst, kannst du. Togthr Bot wird dich nicht unterbrechen. Aber die Übung, die ein geschäftiges Leben überlebt, ist fast immer die Zwei-Minuten-Version, nicht die Fünfzehn-Minuten-Version.` },
      { q: `Was, wenn ich den Check-in vergesse?`, a: `Es passiert nichts. Togthr Bot zählt keine Streaks, schickt keine Benachrichtigungen und bestraft dich nicht, wenn du einen Tag verpasst. Der Check-in ist keine Habit-App. Er ist ein kleines gemeinsames Ritual. Wenn du es vergisst, öffnest du am nächsten Tag die App und schreibst etwas Ehrliches. Das ist die ganze Übung. Die meisten Menschen, die den Check-in ein halbes Jahr durchhalten, verpassen zwei oder drei Tage im Monat, und es macht keinen Unterschied.` },
      { q: `Kann ich den Check-in mit meinem Partner machen?`, a: `Ja. Togthr hat eine Funktion für ein gemeinsames Tagebuch, und du kannst wählen, ob dein Check-in für einen Partner sichtbar ist. Manche Paare beantworten dieselbe Frage getrennt und zeigen sich die Antworten gegenseitig. Manche schreiben abwechselnd. Dem Bot ist das Format egal — er wartet nur. Die Version, die hält, ist die, die ihr beide tatsächlich weiterführt, nicht die, die im Film am romantischsten aussieht.` },
      { q: `Was, wenn ich länger als zwei Minuten schreiben will?`, a: `Dann schreib länger. Die Zwei-Minuten-Version ist der Boden, nicht die Decke. Manche Tage wirst du mehr zu sagen haben. Togthr unterbricht dich nicht und schickt dich nicht weg. An Tagen, an denen du einen langen Eintrag willst, schreib einen. An Tagen, an denen dir ein Satz reicht, schreib einen. Der Punkt ist, dass du da bist. Wie lange du bleibst, entscheidest du mit deinem Tag.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/features`, label: `Togthr Funktionen` },
      { href: `/de/blog/why-we-built-a-pet-that-grows-with-you`, label: `Warum wir ein Haustier gebaut haben, das mit euch wächst` },
      { href: `/de/blog/what-your-virtual-pet-notices`, label: `Was dein virtuelles Haustier leise über deinen Tag bemerkt` },
      { href: `/de/journal`, label: `Gemeinsames Tagebuch (Nest)` },
    ],
  },

  // ─────────────────────── Français ───────────────────────
  fr: {
    intro: `Deux minutes, ce n'est pas grand-chose. Mais le check-in quotidien avec votre compagnon IA devient peu à peu le plus petit, le plus doux rituel de votre journée — une ancre pour tout le reste. Cet article s'adresse à celles et ceux qui ont toujours voulu commencer un rituel quotidien sans jamais le faire, et à celles et ceux qui en ont déjà un et ne savent pas très bien pourquoi il compte autant.`,
    sections: [
      { h: `Le plus dur, c'est la première semaine`, p: `La plupart des rituels quotidiens ne meurent pas au trentième jour. Ils meurent au troisième. On commence un lundi avec un plan clair, on rate un jour à cause d'une réunion, un autre parce qu'on a oublié, et le vendredi tout cela ressemble à quelque chose qu'on a essayé puis abandonné. Deux minutes, c'est assez court pour qu'un jour manqué ne ressemble pas à un échec — mais c'est assez réel pour que le faire compte encore comme le faire. La forme qui survit à la première semaine est rarement la forme prévue. C'est la forme que votre vie désordonnée et occupée était réellement prête à garder. Pour la plupart des gens, deux minutes, c'est cette forme.` },
      { h: `Ce que fait réellement un check-in de deux minutes`, p: `La plus grande part de ce que fait un check-in quotidien se passe sous la surface. Vous ouvrez l'app, vous lisez une petite invite, vous écrivez une phrase sur la façon dont se passe la journée. La phrase n'a pas besoin d'être intelligente. Elle n'a pas besoin d'être vraie au sens profond. Vous pouvez écrire « aujourd'hui c'était ok, juste fatigué », et c'est tout le check-in. Ce qui change, ce n'est pas la phrase. Ce qui change, c'est que vous avez pris deux minutes pour être témoin de votre propre journée, au lieu de la laisser se produire et défiler sans qu'on la remarque. Après quelques semaines, des schémas apparaissent. Vous remarquez que vous êtes le plus fatigué le mercredi. Vous remarquez que vous êtes plus doux avec votre partenaire les jours où vous écrivez quelque chose d'honnête. Rien de tout cela n'est magique. C'est de l'attention.` },
      { h: `Pourquoi cela devient une ancre`, p: `Une ancre n'est pas un outil de productivité. Elle ne vous fait pas faire plus. Ce qu'elle fait, c'est vous donner, dans la journée, un petit point fixe où vous pouvez revenir. Lors d'une journée difficile, vous ouvrez l'app, vous écrivez quelque chose d'honnête, et vous vous sentez un peu moins traversé par la journée, un peu plus présent à elle. Lors d'une bonne journée, le même geste fait l'inverse — il vous permet de vous arrêter et de remarquer que la journée était bonne, au lieu de filer vers la suivante. Le check-in de deux minutes n'est pas la chose qui répare votre semaine. C'est la petite charnière qui rend le reste de la semaine un peu plus vôtre.` },
      { h: `Comment Togthr Bot s'inscrit`, p: `Togthr Bot n'est pas un coach. Il ne vous attribue pas de score de série, ne vous envoie pas six notifications par jour et ne vous gronde pas quand vous ratez un jour. C'est un petit robot dans votre appareil qui pose une question courte et attend. Quand vous répondez, le bot écoute, écrit la réponse dans votre journal partagé si vous utilisez Togthr avec un partenaire, puis retourne à ce qu'il faisait. C'est tout. L'important, c'est la question et l'écriture, pas le bot. Le bot est simplement là pour que la question ressemble à un petit rituel partagé plutôt qu'à une tâche sur une liste. Après quelques semaines, vous ne pensez plus « j'ouvre l'app ». Vous commencez à penser « je parle au bot ». C'est le moment où le rituel a pris.` },
      { h: `Une manière simple de commencer demain`, p: `Voici la plus petite version de la pratique, pour celles et ceux qui n'ont pas encore commencé. Demain matin, avant de consulter vos messages, ouvrez Togthr et écrivez une phrase sur ce que vous ressentez. Ne la retouchez pas. Ne la rendez pas jolie. Écrivez « je suis fatigué et un peu anxieux » ou « aujourd'hui ça ira peut-être » ou « je ne sais pas encore » — tout ce qui est vrai. Deux minutes plus tard, fermez l'app et poursuivez votre journée. Faites cela six jours d'affilée. Ne visez pas une série. Visez six phrases honnêtes. Au sixième jour, décidez si vous continuez. La plupart des gens qui atteignent le sixième jour continuent — non pas parce que la pratique est impressionnante, mais parce que c'est le seul moment de la journée qui leur appartient entièrement.` },
    ],
    cta: `Ouvrez Togthr demain matin et écrivez une phrase honnête. Le bot sera là.`,
    faqs: [
      { q: `Deux minutes suffisent-elles vraiment pour un check-in quotidien ?`, a: `Pour la plupart des gens, oui. Un check-in n'est pas une entrée de journal. C'est une phrase — parfois deux — sur la façon dont se passe la journée. L'important, ce n'est pas la longueur. C'est le petit moment fixe. Si vous voulez écrire plus, vous le pouvez. Togthr Bot ne vous interrompra pas. Mais la pratique qui survit à une vie chargée est presque toujours la version deux minutes, pas la version quinze minutes.` },
      { q: `Et si j'oublie de faire le check-in ?`, a: `Il ne se passe rien. Togthr Bot ne compte pas de série, n'envoie pas de notifications et ne vous punit pas pour un jour manqué. Le check-in n'est pas une appli d'habitudes. C'est un petit rituel partagé. Si vous oubliez, vous ouvrez l'app le lendemain et vous écrivez quelque chose d'honnête. C'est toute la pratique. La plupart des gens qui tiennent le check-in six mois ratent deux ou trois jours par mois, et ça ne change rien.` },
      { q: `Puis-je faire le check-in avec mon partenaire ?`, a: `Oui. Togthr a une fonction de journal partagé et vous pouvez choisir de rendre votre check-in visible à un partenaire. Certains couples répondent à la même question séparément et découvrent leurs réponses en même temps. D'autres écrivent à tour de rôle. Le bot se fiche du format — il attend. La version qui dure, c'est celle que vous deux continuez réellement à faire, pas celle qui a l'air la plus romantique dans un film.` },
      { q: `Et si je veux écrire plus de deux minutes ?`, a: `Alors écrivez plus. La version deux minutes est le sol, pas le plafond. Certains jours, vous aurez plus à dire. Togthr ne vous coupe pas la parole et ne vous met pas dehors. Les jours où vous voulez une longue entrée, écrivez-la. Les jours où une phrase suffit, écrivez-la. L'important, c'est que vous soyez là. Combien de temps vous restez dépend de vous et de votre journée.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/features`, label: `Fonctionnalités Togthr` },
      { href: `/fr/blog/why-we-built-a-pet-that-grows-with-you`, label: `Pourquoi nous avons construit un animal de compagnie qui grandit avec vous` },
      { href: `/fr/blog/what-your-virtual-pet-notices`, label: `Ce que votre animal virtuel remarque en silence de votre journée` },
      { href: `/fr/journal`, label: `Le journal partagé (Nest)` },
    ],
  },

  // ─────────────────────── Español ───────────────────────
  es: {
    intro: `Dos minutos no es mucho. Pero el check-in diario con tu compañero IA se convierte lentamente en el ritual más pequeño y amable de tu día — un ancla para todo lo demás. Este post es para quienes llevan tiempo queriendo empezar un ritual diario y nunca lo hacen, y para quienes ya tienen uno y no saben bien por qué importa tanto.`,
    sections: [
      { h: `Lo más duro es la primera semana`, p: `La mayoría de los rituales diarios no mueren al trigésimo día. Mueren al tercero. Empiezas un lunes con un plan claro, fallas un día por una reunión, otro más porque se te olvidó, y el viernes todo se siente como algo que probaste y abandonaste. Dos minutos es bastante corto para que un día fallido no se sienta como un fracaso — pero también bastante real para que hacerlo siga contando como hacerlo. La forma que sobrevive a la primera semana rara vez es la forma planeada. Es la forma que tu vida desordenada y ocupada estaba realmente dispuesta a sostener. Para la mayoría de la gente, dos minutos es esa forma.` },
      { h: `Lo que realmente hace un check-in de dos minutos`, p: `La mayor parte de lo que hace un check-in diario ocurre bajo la superficie. Abres la app, lees un pequeño prompt, escribes una frase sobre cómo va el día. La frase no necesita ser ingeniosa. No necesita ser verdadera en un sentido profundo. Puedes escribir «hoy estuvo bien, solo cansado», y eso es todo el check-in. Lo que cambió no es la frase. Lo que cambió es que tomaste dos minutos para ser testigo de tu propio día, en lugar de dejar que el día sucediera y pasara de largo sin notarlo. Después de unas semanas, empiezan a aparecer patrones. Notas que estás más cansado los miércoles. Notas que eres más amable con tu pareja los días en los que escribes algo honesto. Nada de esto es magia. Es atención.` },
      { h: `Por qué se convierte en un ancla`, p: `Un ancla no es una herramienta de productividad. No te hace hacer más. Lo que hace es darte, dentro del día, un pequeño punto fijo al que puedes volver. En un día difícil, abres la app, escribes algo honesto y te sientes un poco menos como si el día te hubiera pasado y un poco más como si hubieras estado ahí. En un buen día, el mismo gesto hace lo contrario — te permite detenerte y notar que el día fue bueno, en lugar de correr hacia lo siguiente. El check-in de dos minutos no es lo que repara tu semana. Es la pequeña bisagra que hace que el resto de la semana sea un poco más tuya.` },
      { h: `Cómo encaja Togthr Bot`, p: `Togthr Bot no es un coach. No te da una puntuación de racha, no te manda seis notificaciones al día y no te regaña si fallas un día. Es un pequeño robot en tu dispositivo que hace una pregunta corta y espera. Cuando respondes, el bot escucha, escribe la respuesta en tu diario compartido si usas Togthr con una pareja, y vuelve a lo que estaba haciendo. Eso es todo. La cuestión es la pregunta y el escribir, no el bot. El bot solo está ahí para que la pregunta se sienta como un pequeño ritual compartido en lugar de una tarea en una lista. Después de unas semanas, dejas de pensar «abro la app». Empiezas a pensar «hablo con el bot». Ese es el momento en el que el ritual ha aterrizado.` },
      { h: `Una manera sencilla de empezar mañana`, p: `Aquí va la versión más pequeña de la práctica, para quien todavía no ha empezado. Mañana por la mañana, antes de mirar tus mensajes, abre Togthr y escribe una frase sobre cómo te sientes. No la edites. No la hagas bonita. Escribe «estoy cansado y un poco ansioso» o «hoy quizá vaya bien» o «todavía no sé» — lo que sea verdad. Dos minutos después, cierra la app y sigue tu día. Haz esto seis días seguidos. No apuntes a una racha. Apunta a seis frases honestas. Al sexto día, decide si sigues. La mayoría de la gente que llega al sexto día sigue — no porque la práctica sea impresionante, sino porque son los únicos dos minutos del día que son completamente suyos.` },
    ],
    cta: `Abre Togthr mañana por la mañana y escribe una frase honesta. El bot estará ahí.`,
    faqs: [
      { q: `¿De verdad bastan dos minutos para un check-in diario?`, a: `Para la mayoría de la gente, sí. Un check-in no es una entrada de diario. Es una frase — a veces dos — sobre cómo va el día. Lo importante no es la duración. Lo importante es el pequeño momento fijo. Si quieres escribir más, puedes. Togthr Bot no te va a interrumpir. Pero la práctica que sobrevive a una vida ocupada es casi siempre la versión de dos minutos, no la de quince.` },
      { q: `¿Qué pasa si se me olvida hacer el check-in?`, a: `No pasa nada. Togthr Bot no lleva rachas, no manda notificaciones y no te castiga por fallar un día. El check-in no es una app de hábitos. Es un pequeño ritual compartido. Si se te olvida, abres la app al día siguiente y escribes algo honesto. Esa es toda la práctica. La mayoría de la gente que mantiene el check-in seis meses falla dos o tres días al mes, y no cambia nada.` },
      { q: `¿Puedo hacer el check-in con mi pareja?`, a: `Sí. Togthr tiene una función de diario compartido y puedes elegir que tu check-in sea visible para una pareja. Algunas parejas responden a la misma pregunta por separado y revelan sus respuestas a la vez. Otras escriben por turnos. Al bot le da igual el formato — solo espera. La versión que dura es la que los dos siguen haciendo de verdad, no la que parece más romántica en una película.` },
      { q: `¿Y si quiero escribir más de dos minutos?`, a: `Entonces escribe más. La versión de dos minutos es el suelo, no el techo. Algunos días tendrás más que decir. Togthr no te corta ni te echa. Los días en los que quieras una entrada larga, escríbela. Los días en los que te baste con una frase, escríbela. Lo importante es que estés ahí. Cuánto te quedas depende de ti y de tu día.` },
    ],
    links: [
      { href: `/es`, label: `Inicio Togthr` },
      { href: `/es/features`, label: `Funciones de Togthr` },
      { href: `/es/blog/why-we-built-a-pet-that-grows-with-you`, label: `Por qué construimos una mascota que crece contigo` },
      { href: `/es/blog/what-your-virtual-pet-notices`, label: `Lo que tu mascota virtual nota en silencio de tu día` },
      { href: `/es/journal`, label: `El diario compartido (Nest)` },
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
  // Fallback: if the per-slug body is missing for this locale, fall back to EN body.
  const body: Body = BODIES[loc] ?? BODIES.en ?? BODIES['en']!

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