// src/app/[locale]/blog/first-week-living-together-after-long-distance/page.tsx
//
// Per-slug real content page for the 2026-07-09 daily SEO post.
// Topic: moving-in / first-week-of-cohabitation after long distance.
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
import { withUtm } from '@/lib/utm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `first-week-living-together-after-long-distance`
const POST_DATE = `2026-07-09`

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
    intro: `If you spent any time in a long-distance relationship, the day you finally move into the same apartment is supposed to feel like the end of something. After months or years of time zones, voice notes, and Sunday-night check-ins, you are finally on the same clock. You can hand them coffee. You can hear them in the next room. The waiting is over. What nobody tells you is that the first week of actually living together is mostly small frictions and quiet joys, and that the relationship does not snap into a new shape. It just keeps going, only closer.`,
    sections: [
      { h: `The first week is not what you imagined`, p: `Most couples have a fantasy of move-in day. There is a montage of boxes, a happy playlist, maybe a friend helping carry a mattress up the stairs. The fantasy ends with the door closing and the two of you standing in an empty living room, finally in the same room. The reality is closer to a checklist. There is the question of which side of the bed. There is the moment you realize the bathroom is one bathroom, and one of you takes long showers. There is the moment one of you sleeps through the alarm and the other one pretends to be patient. Sleep schedules that sounded flexible on video turn out to be very different in person. None of these are crises. They are just the first time your day-to-day lives have to actually share a wall.` },
      { h: `Some things change immediately`, p: `The good changes happen fast. You stop texting "good morning" because you can just say it across the kitchen. You put the phone down at dinner because the person you were texting is sitting across from you. You can hand them coffee, fix their collar, leave a note on the counter — small things that used to require a phone and now require a step. But there is a flip side. You cannot hide from a bad mood anymore. When one of you is tired, the other one feels it within an hour. When one of you has a hard day at work, there is no buffer of a time zone to soften the news. The relationship gets louder, faster, and more honest. That is mostly a good thing. It is also a thing you have to get used to.` },
      { h: `Some things change slower than you think`, p: `The rituals you built during long distance do not disappear in the first week. They just get awkward. You still want to send the morning voice note, but your partner is in the next room and you feel silly talking into your phone. You still want the Sunday check-in, but now it is competing with grocery shopping and a call from your mother. The shared journal you kept during LDR is still there, but the entries get smaller, then sporadic. None of this means you have lost the rituals. It means they need to be re-invented for the new chapter. The morning voice note can become a five-minute coffee ritual at the kitchen counter. The Sunday check-in can become a Sunday-evening walk. The shared journal can hold small things again, the way it did before — only now the small things are not about distance, they are about living together.` },
      { h: `Togthr in this new chapter`, p: `A lot of couples wonder whether they still need an AI companion once they are in the same room. The honest answer is: yes, but for different reasons. Togthr Bot is no longer carrying the weight of distance. It is not the bridge across time zones anymore. In the first week of living together, the bot is something smaller and more useful: it is a daily check-in that keeps both of you honest about how the new chapter is going. Not "I miss you" honest. "Did we have a hard night last night and we have not talked about it" honest. The shared journal inside Togthr can hold the awkward first-week things — a small fight about dishes, a sweet moment that felt too small to mention out loud. After a few weeks, looking back at the first-week entries, you will be glad you wrote them.` },
      { h: `A small ritual for the first week`, p: `Here is one practice that helps almost every couple who has just moved in together. Every evening of the first week, take a fifteen-minute walk around the block together. No phones. No agenda. Just walk. You do not have to talk the whole time. Some evenings you will. Some evenings you will walk in silence, and the silence will feel different than it did before you lived together — softer, less anxious, more like a thing you have earned. The walk gives you a daily checkpoint. It is short enough that even on a hard day, you can do it. It is long enough that something real tends to come up. After the first week, the walk becomes optional. Most couples keep doing it. Togthr can mark the streak quietly, or you can ignore the streak and just walk. The streak is not the point. The walk is.` },
    ],
    cta: `Open Togthr together and write the first entry of your new chapter tonight.`,
    faqs: [
      { q: `Is it normal to feel a bit off the first week of living together?`, a: `Yes. Almost every couple feels a small friction in the first week, even couples who dated in person for years before moving in. The novelty of physical closeness is real, and so is the awkwardness of sharing small daily habits. Give it two weeks before you draw any conclusions about the move.` },
      { q: `How long does it take to feel like home?`, a: `There is no fixed answer. Some couples feel settled in a week. Most take about a month. The marker is usually a small thing — the first time you instinctively put a mug down on "your" side of the sink, or the first time you walk to the kitchen in socks and your partner does not even look up. Home is built in small repeated gestures.` },
      { q: `Should we keep using Togthr after we move in?`, a: `If you want to. Togthr is most useful in the first few weeks of any new chapter, including the move-in one. The daily check-in becomes a soft place to write down the small things you would not say out loud yet — a small fight about dishes, a sweet moment that felt too small to mention. After a month, most couples either settle into a lighter use or pause the app. Both are fine.` },
      { q: `What if our sleep schedules are completely different?`, a: `This is one of the most common first-week surprises. The fix is usually some version of: one person gets up earlier, the other sleeps with earplugs, and you agree that the early-morning person does not need to be silent. A small shared ritual — a morning coffee, a short text at lunch — bridges the schedule gap without either of you having to change who you are.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/features`, label: `Togthr features` },
      { href: `/en/blog/three-small-rituals-for-couples-who-live-apart`, label: `Three small rituals for couples who live apart` },
      { href: `/en/blog/two-minute-daily-check-in-ai-companion`, label: `A two-minute daily check-in with an AI companion` },
      { href: `/en/pet`, label: `The virtual pet page` },
    ],
  },

  // ─────────────────────── 简体中文 ───────────────────────
  'zh-cn': {
    intro: `如果你们谈过异地,真正住进同一个家的那天,本来应该像是某个阶段的结束。熬过了几个月甚至几年的时差、语音条、和周日晚上的长对话,你终于和对方在同一个时区了。你可以把咖啡递过去。你能在隔壁房间听见对方的动静。等的过程结束了。没人告诉你的是:真正住到一起的第一周,大部分时候只是些小摩擦,以及一些安静的小确幸 — 而这段关系不会自己咔嚓一声变成新的样子,它只是更近了一点,然后继续往前走。`,
    sections: [
      { h: `第一周,不是你想象的那样`, p: `大多数情侣对"搬进来"这一天有一个想象。镜头里有纸箱,有开心的播放列表,也许还有朋友帮你把床垫扛上楼。想象里的最后是门关上,你和他/她站在空空的客厅里,终于在同一个房间。现实更像是一张清单。先是床的哪一边的问题。然后是某个时刻你意识到洗手间只有一个,而你们其中一个洗澡洗得很慢。再是某个时刻你们其中一个睡过了闹钟,另一个假装耐心。视频通话里听起来挺灵活的作息,住到一起才发现完全不是那么回事。这些都不是危机。只是你们的日常,第一次真的共用一堵墙。` },
      { h: `有些事,马上就变了`, p: `好的变化来得很快。你不再发"早安"消息,因为你可以走到厨房说一句。你在晚饭时放下手机,因为你发消息的那个人正坐在你对面。你可以把咖啡递过去,顺手理一理他的衣领,在台面上留一张小纸条 — 这些事以前要靠手机才能做,现在只要走几步。但硬币也有另一面。你没法再把坏情绪藏起来。当你们其中一个累了,另一个在一小时之内就能感觉到。当其中一个工作不顺,中间再也没有时差来缓冲消息的重量。关系变得更响、更快、更诚实。这大体上是好事。这也是你们得习惯的事。` },
      { h: `有些事,比你以为的慢`, p: `异地时建立的那些仪式,在第一周并不会消失。它们只是变得有点尴尬。你还是想发那条早安语音,但你的另一半就在隔壁,你对着手机说话觉得自己傻。你还是想要那个周日的复盘,但现在它要和买菜、你妈打来的电话抢时间。你们异地时一起写的那个共享日记还在,但记录越来越短,然后断断续续。这不意味着你们丢了仪式。意味着它们需要为新的一章重新发明。早安语音可以变成厨房台面上五分钟的咖啡时间。周日复盘可以变成周日晚的一次散步。共享日记可以重新装下那些小事情 — 只不过现在的小事情,不再是关于距离,而是关于一起住。` },
      { h: `新一章里的 Togthr`, p: `很多情侣在搬到一起后会想:我们还需要 AI 陪伴吗?诚实的回答是:需要,但理由不一样了。Togthr Bot 不再承担异地时的那份重量。它不再是跨时区的桥。在你们住到一起的第一周,这只小机器人变成了另一种更小、更常用的小东西:它是一个每日的打卡,让你们对新的一章保持诚实。不是"我想你"的那种诚实。是"我们昨晚有个小别扭,我们还没聊过"的那种诚实。Togthr 里的共享日记,刚好可以装下第一周那些不好意思开口的小事 — 关于洗碗的小别扭,或者某个小到不好意思当面提起的甜。几周之后,翻回来看第一周的记录,你会很高兴自己写了下来。` },
      { h: `一个适合第一周的小仪式`, p: `这里有一个练习,几乎对所有刚搬到一起的情侣都有用。第一周的每一个晚上,绕着街区走十五分钟。不带手机,没有议程,就是走。你不必一直说话。有些晚上你们会。有些晚上你们沉默着走,而那种沉默,会和你搬进来之前的不一样 — 更轻、更不焦虑,更像是一件你们一起挣来的事。这段散步给你们一个每日的"检查站"。它足够短,即使在不顺的一天也能走完。它又足够长,常常会自然冒出一些真正想说的话。第一周之后,散步就变成可选的了。大部分情侣会继续走。Togthr 可以安静地帮你记连续天数,你也可以忽略连续天数,只管走。连续天数不是重点。散步才是。` },
    ],
    cta: `今晚和另一半一起打开 Togthr,写下新一章的第一条记录。`,
    faqs: [
      { q: `第一周住到一起觉得有点别扭,这正常吗?`, a: `正常。几乎每一对情侣在第一周都会有小摩擦,哪怕是之前在同一座城市约会了好几年的情侣。物理上的亲近本身就是个新鲜事,共用日常习惯的尴尬也是真的。先给自己两周时间,再对"搬进来"这件事下结论。` },
      { q: `多久会有"到家了"的感觉?`, a: `没有固定答案。有些情侣一周就觉得稳了。大部分需要一个月左右。标志通常是一件小事 — 你第一次顺手把杯子放在"你这一边"的水槽,或者你光着脚走到厨房而你的另一半头都没抬。"家"是由很多重复的小动作堆出来的。` },
      { q: `搬到一起之后还要不要继续用 Togthr?`, a: `看你自己想。Togthr 在任何新章节的头几周都最有用,搬到一起也算。每日打卡变成一个软一点的地方,写下那些你还不好意思当面说的小事 — 洗碗的小别扭,小到不好意思当面提起的甜。一个月之后,大多数情侣要么用得更轻,要么暂时停掉。都没问题。` },
      { q: `两个人的作息完全不同怎么办?`, a: `这是第一周最常见的意外之一。解决办法通常是:一个人早起,另一个人戴耳塞睡觉,然后你们约定早起的那个人不需要刻意保持安静。一个共享的小仪式 — 一杯早上的咖啡,午间一条短消息 — 就能把作息差异接上,而不必让任何一个人去改自己的节奏。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/features`, label: `Togthr 功能` },
      { href: `/zh-cn/blog/three-small-rituals-for-couples-who-live-apart`, label: `异地恋的三件小事` },
      { href: `/zh-cn/blog/two-minute-daily-check-in-ai-companion`, label: `每天两分钟, 和 AI 陪伴的简短对话` },
      { href: `/zh-cn/pet`, label: `数字宠物页` },
    ],
  },

  // ─────────────────────── 繁體中文 ───────────────────────
  'zh-tw': {
    intro: `如果你們談過遠距離,真正住進同一個家的那一天,本來應該像是某個階段的結束。熬過了幾個月甚至幾年的時差、語音訊息、和週日晚上長長的對話,你終於和對方在同一個時區了。你可以把咖啡遞過去。你能在隔壁房間聽見對方的動靜。等待的過程結束了。沒人告訴你的是:真正住在一起的第一週,大部分時候只是些小摩擦,以及一些安靜的小確幸 — 而這段關係不會自己咔嚓一聲變成新的樣子,它只是更近了一點,然後繼續往前走。`,
    sections: [
      { h: `第一週,不是你想的那樣`, p: `大多數情侶對「搬進來」這一天有一個想像。鏡頭裡有紙箱、有開心的播放清單,也許還有朋友幫你把床墊扛上樓。想像裡的最後是門關上,你和他/她站在空空的客廳裡,終於在同一個房間。現實更像是一張清單。先是床的哪一邊的問題。然後是某個時刻你意識到浴室只有一個,而你們其中一個洗澡洗得很慢。再是某個時刻你們其中一個睡過了鬧鐘,另一個假裝耐心。視訊裡聽起來挺有彈性的作息,住在一起才發現完全不是那麼回事。這些都不是危機。只是你們的日常,第一次真的共用一面牆。` },
      { h: `有些事,馬上就變了`, p: `好的變化來得很快。你不再傳「早安」訊息,因為你可以走到廚房說一句。你在晚餐時放下手機,因為你傳訊息的那個人正坐在你對面。你可以把咖啡遞過去,順手理一理他的衣領,在流理台上留一張小紙條 — 這些事以前要靠手機才能做到,現在只要走幾步。但硬幣也有另一面。你沒辦法再把壞情緒藏起來。當你們其中一個累了,另一個在一小時之內就能感覺到。當其中一個工作不順,中間再也沒有時差來緩衝消息的重量。關係變得更響、更快、更誠實。這大體上是好事。這也是你們得習慣的事。` },
      { h: `有些事,比你想的慢`, p: `遠距離時建立的那些儀式,在第一週並不會消失。它們只是變得有點尷尬。你還是想傳那條早安語音,但你的另一半就在隔壁,你對著手機說話覺得自己傻。你還想要那個週日的覆盤,但現在它要和買菜、你媽打來的電話搶時間。你們遠距離時一起寫的那個共享日記還在,但記錄越來越短,然後斷斷續續。這不意味著你們丟了儀式。意味著它們需要為新的一章重新發明。早安語音可以變成流理台上五分鐘的咖啡時間。週日覆盤可以變成週日晚上的一次散步。共享日記可以重新裝下那些小事情 — 只不過現在的小事情,不再是關於距離,而是關於一起住。` },
      { h: `新一章裡的 Togthr`, p: `很多情侶在搬到一起之後會想:我們還需要 AI 陪伴嗎?誠實的回答是:需要,但理由不一樣了。Togthr Bot 不再承擔遠距離時的那份重量。它不再是跨時區的橋。在你們住在一起的第一週,這隻小機器人變成了另一種更小、更常用的小東西:它是一個每日的打卡,讓你們對新的一章保持誠實。不是「我想你」的那種誠實。是「我們昨晚有個小別扭,我們還沒聊過」的那種誠實。Togthr 裡的共享日記,剛好可以裝下第一週那些不好意思開口的小事 — 關於洗碗的小別扭,或者某個小到不好意思當面提起的甜。幾週之後,翻回來看第一週的記錄,你會很慶幸自己寫了下來。` },
      { h: `一個適合第一週的小儀式`, p: `這裡有一個練習,幾乎對所有剛搬到一起的情侶都有用。第一週的每一個晚上,繞著街區走十五分鐘。不帶手機,沒有議程,就是走。你不必一直說話。有些晚上你們會。有些晚上你們沉默著走,而那種沉默,會和你搬進來之前的不一樣 — 更輕、更不焦慮,更像是一件你們一起掙來的事。這段散步給你們一個每日的「檢查站」。它夠短,即使在很不順的一天也能走完。它又夠長,常常會自然冒出一些真正想說的話。第一週之後,散步就變成選用的了。大部分情侶會繼續走。Togthr 可以安靜地幫你記連續天數,你也可以忽略連續天數,只管走。連續天數不是重點。散步才是。` },
    ],
    cta: `今晚和另一半一起打開 Togthr,寫下新一章的第一條記錄。`,
    faqs: [
      { q: `第一週住在一起覺得有點別扭,這正常嗎?`, a: `正常。幾乎每一對情侶在第一週都會有小摩擦,哪怕是之前在同一座城市約會了好幾年的情侶。物理上的親近本身就是個新鮮事,共用日常習慣的尷尬也是真的。先給自己兩週時間,再對「搬進來」這件事下結論。` },
      { q: `多久會有「到家了」的感覺?`, a: `沒有固定答案。有些情侶一週就覺得穩了。大部分需要一個月左右。標誌通常是一件小事 — 你第一次順手把杯子放在「你這一邊」的水槽,或者你光著腳走到廚房而你的另一半頭都沒抬。「家」是由很多重複的小動作堆出來的。` },
      { q: `搬到一起之後還要不要繼續用 Togthr?`, a: `看你自己想。Togthr 在任何新章節的頭幾週都最有用,搬到一起也算。每日打卡變成一個軟一點的地方,寫下那些你還不好意思當面說的小事 — 洗碗的小別扭,小到不好意思當面提起的甜。一個月之後,大多數情侶會選擇用得更輕,或者暫時停掉。都沒問題。` },
      { q: `兩個人的作息完全不同怎麼辦?`, a: `這是第一週最常見的意外之一。解決辦法通常是:一個人早起,另一個人戴耳塞睡覺,然後你們約定早起的那個人不需要刻意保持安靜。一個共享的小儀式 — 一杯早上的咖啡,午間一條短訊息 — 就能把作息差異接上,而不必讓任何一個人去改自己的節奏。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/features`, label: `Togthr 功能` },
      { href: `/zh-tw/blog/three-small-rituals-for-couples-who-live-apart`, label: `遠距離戀愛的三件小事` },
      { href: `/zh-tw/blog/two-minute-daily-check-in-ai-companion`, label: `每天兩分鐘, 和 AI 陪伴的簡短對話` },
      { href: `/zh-tw/pet`, label: `數位寵物頁` },
    ],
  },

  // ─────────────────────── 日本語 ───────────────────────
  ja: {
    intro: `遠距離恋愛をしていたカップルにとって、ついに同じ部屋に住み始める日は、何かの「終わり」に見えるはずです。何ヶ月、何年もの時差、ボイスメモ、日曜夜の長いやり取りを経て、ようやく同じ時計で暮らせるようになります。コーヒーを手渡せるようになります。隣の部屋の気配を感じられるようになります。待つ日々は終わります。でも、誰も教えてくれないのは — 実際に暮らし始めてからの最初の 1 週間は、たいてい「小さな摩擦」と「静かな喜び」でできていて、関係はパチッと新しい形に切り替わるわけではなく、ただ少し近づいて、そのまま続いていく、ということです。`,
    sections: [
      { h: `最初の 1 週間は、思い描いていたものと違う`, p: `多くのカップルが「引っ越す日」を理想化しています。段ボールの山、明るいプレイリスト、友人がマットレスを階段に運んでくれる助け。理想は最後こうです — ドアが閉まり、二人で空っぽのリビングに立って、ようやく同じ部屋に立つ。現実はもっとチェックリストに近い。ベッドの左右の問題。バスルームが一つで、そのうち一人は長いシャワーを浴びる、という現実を目にする瞬間。アラームを寝過ごす人と、もう一方がそれを耐えてくれている瞬間。ビデオ通話では柔軟そうだった生活リズムが、実際に隣にいると全然違うということ。どれも危機ではありません。ただ、二人の日常が初めて同じ壁を共有する、というだけのことです。` },
      { h: `すぐ変わること`, p: `いい変化は早く訪れます。「おはよう」をテキストで送らなくなる — 台所で声で言えるから。夕食時にスマホを置く — メッセージを送っていた相手が目の前にいるから。コーヒーを手渡せる。襟を直せる。カウンターに小さなメモを残せる — 以前はスマホがなければできなかったことが、数歩で済むようになる。でも裏返しもあります。もう機嫌の悪さを隠せません。どちらかが疲れたら、もう一方は 1 時間以内にそれを感じます。どちらかの仕事がうまくいかない日、時差という緩衝がないのでニュースはすぐに届きます。関係はもっと大きく、速く、正直になります。おおむね良いことです。ただ、慣れる必要のあることでもあります。` },
      { h: `思ったよりゆっくり変わること`, p: `遠距離のときに作った儀式は、最初の 1 週間で消えません。むしろぎこちなくなります。朝のボイスメモを送りたくても、相手が隣の部屋にいて、スマホに向かって話す自分が滑稽に感じます。日曜のチェックインも欲しい。でも今は groceries の買い物や、母からの電話と時間を奪い合います。遠距離でつけていた共有日記も残っています。でも記録は短くなり、途切れがちになります。これは儀式を失ったという意味ではありません。新しい章に合わせて発明し直す必要がある、という意味です。朝のボイスメモは、台所カウンターでの 5 分間のコーヒーに。日曜のチェックインは、日曜の夜の散歩に。共有日記はまた小さなことを受け止められる — ただし今度は「距離」ではなく「一緒に住んでいること」に関する小さなことを。` },
      { h: `新しい章の Togthr`, p: `同じ部屋に住むようになったとき、AI コンパニオンはまだ必要かと疑問に思うカップルは多いです。正直な答えは:必要、ただし理由は変わります。Togthr Bot はもう距離の重さを担いません。時差の橋でもありません。一緒に住み始めた最初の 1 週間で、この小さなボットはもっと小さく、もっと日常的なものになります — 新しい章について正直でいられる、毎日のチェックインです。「会いたい」という正直さではなく、「昨夜ちょっと気まずいことがあった、まだ話していない」という正直さ。Togthr の中の共有日記は、最初の 1 週間に面と向かって言いづらい小さなこと — 皿洗いの小さな言い合い、口に出せないほど小さな甘い瞬間 — をちょうど受け止めてくれます。数週間経って最初の 1 週間の記録を読み返すと、書いておいてよかったと思うはずです。` },
      { h: `最初の 1 週間に合う小さな儀式`, p: `これは、引っ越してきたばかりのカップルほぼ全員に役立つ練習です。最初の 1 週間の毎晩、ブロックの周りを 15 分歩きます。スマホなし、アジェンダなし、ただ歩く。ずっと話す必要はありません。話す夜もあるでしょう。黙って歩く夜もあるでしょう。そしてその沈黙は、引っ越してくる前のものとは違うはずです — より軽く、より穏やかで、一緒に手に入れたものに近い。その散歩が毎日の「チェックポイント」になります。短すぎて、調子の悪い日でも歩ける。けれど長すぎて、自然に本音が出る。1 週間が過ぎたら、散歩は任意になります。多くのカップルは続けます。Togthr は静かにストリークを記録しますが、ストリークを無視してただ歩くこともできます。ストリークが目的ではなく、散歩が目的です。` },
    ],
    cta: `今夜、二人で Togthr を開いて、新しい章の最初の一行を書きましょう。`,
    faqs: [
      { q: `一緒に住み始めて最初の 1 週間、少し落ち着かないのは普通ですか?`, a: `普通です。ほとんどすべてのカップルが最初の 1 週間に小さな摩擦を感じます。同じ街で何年もデートしてから引っ越したカップルでも同じです。物理的な近さの新鮮さもあれば、日常習慣を共有するぎこちなさもあります。「引っ越し」について結論を出すのは、2 週間待ってからにしてください。` },
      { q: `「家に帰ってきた」と感じるまでどのくらいかかりますか?`, a: `決まった答えはありません。1 週間で馴染むカップルもいます。多くは 1 か月ほど。兆しは大抵小さなことです — 無意識にカップを「自分の側」のシンクに置く瞬間、素足のまま台所に行っても相手が顔を上げない瞬間。家は繰り返しの小さな所作でできていきます。` },
      { q: `一緒に住んだ後も Togthr を使い続けるべきですか?`, a: `お好みで。Togthr は新しい章の最初の数週間、最も力を発揮します。引っ越しの章も含めて。毎日のチェックインは、面と向かってはまだ言いづらい小さなことを書く、やわらかい場所になります — 皿洗いの小さな言い合い、面に出せないほど小さな甘い瞬間。1 か月後、多くのカップルはもっと軽いかたちで使い続けるか、いったん止めます。どちらも大丈夫です。` },
      { q: `二人の生活リズムがまったく違う場合は?`, a: `これは最初の 1 週間で最もよくある驚きの一つです。解決策は大抵こうです — 一方が早起き、もう一方は耳栓で寝る、早起きする方は静かに振る舞わなくてよいと決めておく。小さな共有の儀式 — 朝の一杯のコーヒー、昼に一本の短いメッセージ — が、生活リズムの差を、どちらかを変えずに橋渡ししてくれます。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/features`, label: `Togthr の機能` },
      { href: `/ja/blog/three-small-rituals-for-couples-who-live-apart`, label: `遠距離恋愛の小さな儀式 3 つ` },
      { href: `/ja/blog/two-minute-daily-check-in-ai-companion`, label: `AI コンパニオンとの 2 分間の daily check-in` },
      { href: `/ja/pet`, label: `バーチャルペットのページ` },
    ],
  },

  // ─────────────────────── 한국어 ───────────────────────
  ko: {
    intro: `장거리 연애를 했던 커플에게, 드디어 같은 집으로 이사하는 날은 어떤 것의 ‘끝’처럼 느껴져야 합니다. 몇 달, 혹은 몇 년의 시차와 음성 메시지, 일요일 밤의 긴 대화 끝에, 마침 같은 시계를 쓰게 됩니다. 커피를 건네줄 수 있습니다. 옆방에서 상대방의 기척을 들을 수 있습니다. 기다림은 끝났습니다. 아무도 말해주지 않는 것은 — 진짜로 함께 살기 시작한 첫 주는 대부분 ‘작은 마찰’과 ‘조용한 기쁨’으로 이루어져 있고, 관계는 척 하고 새로운 모양으로 바뀌지 않는다는 겁니다. 조금 더 가까워진 채로, 그냥 계속 간다는 겁니다.`,
    sections: [
      { h: `첫 주는 상상한 것과 다르다`, p: `대부분의 커플은 ‘이사하는 날’에 대한 이상이 있습니다. 박스가 있고, 신나는 플레이리스트가 있고, 어쩌면 친구가 매트리스 계단을 같이 올라줍니다. 이상의 끝은 — 문이 닫히고, 둘이 빈 거실에 서서, 마침 같은 방에 서게 됩니다. 현실은 더 체크리스트에 가깝습니다. 침대의 어느 쪽 문제. 화장실이 하나인데 둘 중 하나는 긴 샤워를 한다는 걸 깨닫는 순간. 둘 중 하나가 알람을 넘기고, 다른 한 사람이 인내심을 연기하는 순간. 영상 통화에서는 유연해 보이던 수면 패턴이 실제로는 옆에 있으니 전혀 다르다는 것. 이건 어떤 위기도 아닙니다. 두 사람의 일상이 처음으로 진짜로 같은 벽을 공유하는 것일 뿐입니다.` },
      { h: `바로 변하는 것들`, p: `좋은 변화는 빨리 옵니다. ‘좋은 아침’ 문자를 보내지 않습니다 — 부엌에서 말로 할 수 있으니까. 저녁에 폰을 내려놓습니다 — 문자를 보내던 사람이 맞은편에 있으니까. 커피를 건네주고, 옷깃을 다듬어주고, 카운터에 쪽지를 남길 수 있습니다 — 예전에는 폰이 있어야 했던 일을 몇 걸음이면 됩니다. 하지만 반대쪽 면도 있습니다. 더 이상 기분을 숨길 수 없습니다. 둘 중 하나가 피곤하면, 다른 한 사람은 한 시간 안에 느낍니다. 둘 중 하나가 회사에서 힘든 하루를 보냈다면, 시차라는 완충이 없어서 뉴스는 바로 도착합니다. 관계는 더 크고, 더 빠르고, 더 솔직해집니다. 대체로 좋은 일입니다. 하지만 익숙해져야 할 일이기도 합니다.` },
      { h: `생각보다 천천히 변하는 것들`, p: `장거리 때 만든 의식은 첫 주에 사라지지 않습니다. 오히려 어색해질 뿐입니다. 아침 음성 메시지를 보내고 싶지만, 상대가 옆방에 있고, 폰에게 말하는 자신이 우스워집니다. 일요일 체크인도 여전히 갖고 싶지만, 이제 장 보기와 엄마의 전화와 시간을 다투게 됩니다. 장거리 때 함께 쓰던 공유 일기도 그대로 있습니다. 하지만 기록은 짧아졌다가 듬성듬성해집니다. 이건 의식을 잃었다는 뜻이 아닙니다. 새로운 장에 맞게 다시 발명해야 한다는 뜻입니다. 아침 음성 메시지는 부엌 카운터의 5분 커피로 바뀔 수 있습니다. 일요일 체크인은 일요일 저녁 산책으로 바뀔 수 있습니다. 공유 일기는 다시 작은 것들을 받아들일 수 있습니다 — 다만 이번에는 ‘거리’가 아니라 ‘같이 사는 것’에 대한 작은 것들을.` },
      { h: `새 장의 Togthr`, p: `같은 방에 살게 되었을 때, AI 동반자가 여전히 필요한지 궁금해하는 커플이 많습니다. 정직한 답은: 필요합니다, 다만 이유가 달라집니다. Togthr Bot은 더 이상 거리의 무게를 지지하지 않습니다. 시차의 다리도 아닙니다. 함께 살기 시작한 첫 주에, 이 작은 봇은 더 작고 더 일상적인 무엇이 됩니다 — 새로운 장에 대해 솔직할 수 있게 해주는 매일의 체크인. ‘보고 싶다’는 솔직함이 아니라, ‘어제 밤에 작은 마찰이 있었는데 아직 이야기 안 했다’는 솔직함. Togthr 안의 공유 일기는 첫 주에 입 밖으로 꺼내기 어려운 작은 것들 — 설거지에 대한 작은 말다툼, 입 밖에 꺼내기엔 너무 작은 다정한 순간 — 을 그대로 받아줍니다. 몇 주가 지나서 첫 주의 기록을 다시 보면, 써 두길 잘했다고 생각할 겁니다.` },
      { h: `첫 주에 어울리는 작은 의식`, p: `거의 모든 커플에게 도움이 되는 연습이 있습니다. 첫 주 동안 매일 저녁, 블록 한 바퀴를 15분 걸으세요. 휴대폰 없이, 안건 없이, 그냥 걸으면 됩니다. 계속 말할 필요는 없습니다. 말하는 저녁도 있을 겁니다. 말없이 걷는 저녁도 있을 것이고, 그 침묵은 이사 오기 전의 것과는 다를 겁니다 — 더 가볍고, 더 덜 불안하고, 함께 얻은 무언가에 가깝습니다. 그 산책이 매일의 ‘체크포인트’가 됩니다. 짧아서 힘든 날에도 완주할 수 있습니다. 그런데 길어서 자연스럽게 진심이 나옵니다. 첫 주가 끝나면 산책은 선택이 됩니다. 대부분의 커플은 계속 합니다. Togthr는 조용하게 연속 일수를 기록해줄 수 있지만, 연속 일수를 무시하고 그냥 걸을 수도 있습니다. 연속 일수가 목적이 아니라 산책이 목적입니다.` },
    ],
    cta: `오늘 밤, 둘이서 Togthr을 열고 새 장의 첫 줄을 써 보세요.`,
    faqs: [
      { q: `같이 살기 시작한 첫 주에 조금 어색한 게 정상인가요?`, a: `정상입니다. 거의 모든 커플이 첫 주에 작은 마찰을 겪습니다. 같은 도시에서 몇 년 데이트하고서 이사를 온 커플도 마찬가지입니다. 물리적 가까움의 새로움도 있고, 일상 습관을 공유하는 어색함도 있습니다. ‘이사’에 대한 결론은 2주 후에 내리세요.` },
      { q: `‘집에 왔다’는 느낌은 언제쯤 드나요?`, a: `정해진 답은 없습니다. 일주일 만에 안정감을 느끼는 커플도 있습니다. 대부분은 한 달쯤이 필요합니다. 표식은 보통 작은 일입니다 — 무심코 컵을 ‘자기 쪽’ 싱크대에 내려놓는 순간, 맨발로 부엌에 나갔는데 상대가 고개를 들지 않는 순간. 집은 반복되는 작은 동작으로 쌓입니다.` },
      { q: `같이 살기 시작한 뒤에도 Togthr을 계속 써야 할까요?`, a: `하고 싶으면 하세요. Togthr은 새로운 장의 첫 몇 주에 가장 유용합니다. 이사 장도 포함해서요. 매일 체크인은 아직 입 밖에 꺼내기 어려운 작은 것을 쓰는 부드러운 자리가 됩니다 — 설거지에 대한 작은 말다툼, 입 밖에 꺼내기엔 너무 작은 다정한 순간. 한 달 뒤에는 대부분의 커플이 더 가볍게 쓰거나 잠시 멈춥니다. 둘 다 괜찮습니다.` },
      { q: `둘의 생활 리듬이 완전히 다르면요?`, a: `이것은 첫 주에 가장 흔한 놀라움 중 하나입니다. 해결책은 보통 이렇습니다 — 한 사람이 일찍 일어나고, 다른 사람은 귀마개로 자고, 일찍 일어나는 사람은 조용히 할 필요가 없다고 정합니다. 작은 공유 의식 — 아침 커피 한 잔, 점심에 짧은 메시지 하나 — 가 생활 리듬의 차이를, 어느 쪽도 자신을 바꾸지 않고 잇습니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/features`, label: `Togthr 기능` },
      { href: `/ko/blog/three-small-rituals-for-couples-who-live-apart`, label: `장거리 연애를 지키는 작은 의식 세 가지` },
      { href: `/ko/blog/two-minute-daily-check-in-ai-companion`, label: `AI 동반자와의 2분 daily check-in` },
      { href: `/ko/pet`, label: `가상 반려동물 페이지` },
    ],
  },

  // ─────────────────────── Deutsch ───────────────────────
  de: {
    intro: `Wer eine Fernbeziehung geführt hat, stellt sich den Tag, an dem man endlich in dieselbe Wohnung zieht, meistens wie ein Ende vor. Nach Monaten oder Jahren mit Zeitzonen, Sprachnachrichten und langen Sonntagsgesprächen lebt man endlich im selben Takt. Man kann ihr den Kaffee in die Hand drücken. Man hört sie im Nebenzimmer. Das Warten ist vorbei. Was einem niemand sagt: Die erste Woche des echten Zusammenwohnens besteht vor allem aus kleinen Reibungen und leisen Freuden, und die Beziehung springt nicht in eine neue Form. Sie geht einfach weiter — nur näher.`,
    sections: [
      { h: `Die erste Woche ist nicht das, was du dir vorgestellt hast`, p: `Die meisten Paare haben eine Fantasie vom Einzugstag. Es gibt eine Montage aus Umzugskartons, eine fröhliche Playlist, vielleicht einen Freund, der eine Matratze die Treppe hochträgt. Am Ende der Fantasie steht: die Tür geht zu, ihr zwei steht im leeren Wohnzimmer, endlich im selben Raum. Die Realität ist eher eine Checkliste. Da ist die Frage, welche Seite des Bettes. Da ist der Moment, in dem dir auffällt, dass es nur ein Badezimmer gibt und einer von euch duscht ewig. Da ist der Moment, in dem einer den Wecker verschläft und der andere so tut, als wäre das in Ordnung. Schlafrhythmen, die per Video flexibel klangen, sind live sehr verschieden. Nichts davon ist eine Krise. Es ist nur das erste Mal, dass eure Tage wirklich eine Wand teilen.` },
      { h: `Manches ändert sich sofort`, p: `Die guten Veränderungen passieren schnell. Du schreibst keine „Guten Morgen"-Nachrichten mehr, weil du es in der Küche sagen kannst. Du legst das Handy beim Abendessen weg, weil die Person, der du gerade geschrieben hast, dir gegenüber sitzt. Du kannst ihr den Kaffee reichen, den Kragen richten, einen Zettel auf die Theke legen — kleine Dinge, die früher ein Telefon brauchten und jetzt nur einen Schritt. Aber es gibt eine Kehrseite. Du kannst dich nicht mehr vor einer schlechten Laune verstecken. Wenn einer von euch erschöpft ist, spürt der andere es innerhalb einer Stunde. Wenn einer einen harten Arbeitstag hatte, federt keine Zeitzone mehr die Nachricht ab. Die Beziehung wird lauter, schneller, ehrlicher. Meistens ist das gut. Man muss sich aber erst daran gewöhnen.` },
      { h: `Manches ändert sich langsamer, als du denkst`, p: `Die Rituale, die ihr euch in der Fernbeziehung aufgebaut habt, verschwinden in der ersten Woche nicht. Sie werden nur ungeschickt. Du willst immer noch die morgendliche Sprachnachricht schicken, aber dein Partner ist im Nebenzimmer und du fühlst dich albern, in dein Handy zu sprechen. Du willst immer noch den Sonntags-Check-in, aber jetzt konkurriert er mit dem Einkauf und dem Anruf deiner Mutter. Das gemeinsame Tagebuch aus der Fernzeit existiert noch, aber die Einträge werden kürzer, dann sporadischer. Das heißt nicht, dass ihr die Rituale verloren habt. Es heißt, dass sie für das neue Kapitel neu erfunden werden müssen. Die morgendliche Sprachnachricht kann zu einem fünfminütigen Kaffee an der Theke werden. Der Sonntags-Check-in kann ein Sonntagabend-Spaziergang werden. Das gemeinsame Tagebuch kann wieder kleine Dinge aufnehmen — nur sind die kleinen Dinge jetzt nicht mehr die Entfernung, sondern das Zusammenwohnen.` },
      { h: `Togthr in diesem neuen Kapitel`, p: `Viele Paare fragen sich, ob sie einen KI-Begleiter noch brauchen, wenn sie im selben Raum wohnen. Ehrliche Antwort: ja, aber aus anderen Gründen. Togthr Bot trägt nicht mehr das Gewicht der Entfernung. Es ist nicht mehr die Brücke über die Zeitzonen. In der ersten Woche des Zusammenwohnens ist der Bot etwas Kleineres und Nützlicheres: ein täglicher Check-in, der euch beiden hilft, dem neuen Kapitel gegenüber ehrlich zu bleiben. Nicht „Ich vermisse dich"-ehrlich. „Wir hatten gestern Abend eine kleine Reibung und haben noch nicht darüber geredet"-ehrlich. Das gemeinsame Tagebuch in Togthr kann genau diese Dinge der ersten Woche aufnehmen — einen kleinen Streit über das Geschirr, einen süßen Moment, der zu klein wirkte, um ihn laut auszusprechen. Wenn ihr nach ein paar Wochen die Einträge der ersten Woche noch einmal lest, werdet ihr froh sein, sie geschrieben zu haben.` },
      { h: `Ein kleines Ritual für die erste Woche`, p: `Hier ist eine Übung, die fast jedem Paar hilft, das gerade zusammengezogen ist. Geht jeden Abend der ersten Woche fünfzehn Minuten um den Block. Kein Handy. Keine Agenda. Einfach gehen. Ihr müsst nicht die ganze Zeit reden. Manche Abende werdet ihr es. Manche Abende werdet ihr schweigend gehen, und das Schweigen fühlt sich anders an als vor dem Einzug — weicher, weniger unruhig, mehr wie etwas, das ihr euch zusammen verdient habt. Der Spaziergang gibt euch einen täglichen Anker. Er ist kurz genug, dass er auch an einem schlechten Tag machbar ist. Er ist lang genug, dass oft etwas Echtes hochkommt. Nach der ersten Woche wird der Spaziergang optional. Die meisten Paare machen weiter. Togthr kann die Streak still mitzählen, oder ihr ignoriert die Streak und geht einfach. Nicht die Streek ist der Punkt. Der Spaziergang ist es.` },
    ],
    cta: `Öffnet Togthr heute Abend zusammen und schreibt den ersten Eintrag eures neuen Kapitels.`,
    faqs: [
      { q: `Ist es normal, dass sich die erste Woche des Zusammenwohnens etwas komisch anfühlt?`, a: `Ja. Fast jedes Paar spürt in der ersten Woche kleine Reibungen — auch Paare, die jahrelang in derselben Stadt miteinander gedatet haben, bevor sie zusammengezogen sind. Die Neuheit der physischen Nähe ist real, und die Peinlichkeit, kleine Alltagsgewohnheiten zu teilen, auch. Gib euch zwei Wochen, bevor ihr ein Urteil über den Umzug fällt.` },
      { q: `Wie lange dauert es, bis es sich wie zu Hause anfühlt?`, a: `Es gibt keine feste Antwort. Manche Paare fühlen sich nach einer Woche angekommen. Die meisten brauchen etwa einen Monat. Das Zeichen ist meistens eine kleine Sache — der erste Moment, in dem du instinktiv eine Tasse auf „deiner" Seite des Spülbeckens abstellst, oder das erste Mal, dass du barfuß in die Küche gehst und dein Partner nicht mal aufblickt. Zuhause wird aus vielen kleinen wiederholten Gesten gebaut.` },
      { q: `Sollten wir Togthr nach dem Einzug weiter benutzen?`, a: `Wenn ihr wollt. Togthr ist in den ersten Wochen jedes neuen Kapitels am nützlichsten, auch beim Einzug. Der tägliche Check-in wird zu einem weichen Ort, um die kleinen Dinge zu schreiben, die ihr noch nicht laut aussprechen wollt — einen kleinen Streit über das Geschirr, einen süßen Moment, der zu klein wirkt. Nach einem Monat nutzen die meisten Paare die App entweder leichter oder pausieren sie. Beides ist in Ordnung.` },
      { q: `Was, wenn unsere Schlafrhythmen völlig verschieden sind?`, a: `Das ist eine der häufigsten Überraschungen der ersten Woche. Die Lösung ist meistens irgendeine Version davon: Eine Person steht früher auf, die andere schläft mit Ohrstöpseln, und ihr einigt euch darauf, dass die früh aufstehende Person nicht leise sein muss. Ein kleines gemeinsames Ritual — ein Morgenkaffee, eine kurze Mittagsnachricht — überbrückt den Rhythmus-Unterschied, ohne dass jemand sich selbst verändern muss.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/features`, label: `Togthr Funktionen` },
      { href: `/de/blog/three-small-rituals-for-couples-who-live-apart`, label: `Drei kleine Rituale für Paare, die getrennt wohnen` },
      { href: `/de/blog/two-minute-daily-check-in-ai-companion`, label: `Zwei-Minuten-Check-in mit einem KI-Begleiter` },
      { href: `/de/pet`, label: `Die Seite zum virtuellen Haustier` },
    ],
  },

  // ─────────────────────── Français ───────────────────────
  fr: {
    intro: `Quand on a vécu une relation à distance, le jour où l'on emménage enfin dans le même appartement est censé ressembler à une fin. Après des mois ou des années de fuseaux horaires, de messages vocaux et de longues conversations du dimanche soir, on est enfin sur la même horloge. On peut lui tendre son café. On peut l'entendre dans la pièce d'à côté. L'attente est finie. Ce que personne ne vous dit : la première semaine de vie commune est surtout faite de petits frottements et de joies discrètes, et la relation ne saute pas dans une forme nouvelle. Elle continue, tout simplement — un peu plus près.`,
    sections: [
      { h: `La première semaine n'est pas ce que vous imaginiez`, p: `La plupart des couples ont une image mentale du jour de l'emménagement. Un montage de cartons, une playlist joyeuse, peut-être un ami qui monte un matelas dans l'escalier. À la fin de l'image : la porte se ferme, vous vous tenez dans un salon vide, enfin dans la même pièce. La réalité ressemble davantage à une liste de choses à faire. Le côté du lit. Le moment où l'on se rend compte qu'il n'y a qu'une seule salle de bain et que l'un de vous prend des douches interminables. Le moment où l'un des deux rate son réveil et où l'autre fait semblant d'être patient. Les rythmes de sommeil qui semblaient souples en visio sont tout autres quand on est côte à côte. Rien de tout cela n'est une crise. C'est simplement la première fois que vos journées partagent vraiment un mur.` },
      { h: `Certaines choses changent tout de suite`, p: `Les bons changements arrivent vite. Vous n'envoyez plus de « bonjour » par message, parce que vous pouvez le dire dans la cuisine. Vous posez le téléphone au dîner, parce que la personne à qui vous écriviez est en face de vous. Vous pouvez lui tendre son café, rectifier son col, laisser un petit mot sur le comptoir — de petites choses qui demandaient un téléphone et qui ne demandent plus qu'un pas. Mais il y a un revers. Vous ne pouvez plus cacher une mauvaise humeur. Quand l'un de vous est fatigué, l'autre le sent en une heure. Quand l'un des deux a eu une journée difficile au travail, il n'y a plus de fuseau horaire pour amortir la nouvelle. La relation devient plus forte, plus rapide, plus honnête. C'est plutôt une bonne chose. C'est aussi quelque chose auquel il faut s'habituer.` },
      { h: `Certaines choses changent plus lentement que vous ne croyez`, p: `Les rituels que vous aviez construits à distance ne disparaissent pas la première semaine. Ils deviennent juste maladroits. Vous voulez toujours envoyer le message vocal du matin, mais votre partenaire est dans la pièce d'à côté et vous vous sentez ridicule de parler à votre téléphone. Vous voulez toujours le check-in du dimanche, mais il est désormais en concurrence avec les courses et l'appel de votre mère. Le journal partagé de la période à distance existe toujours, mais les entrées deviennent plus courtes, puis sporadiques. Cela ne veut pas dire que vous avez perdu les rituels. Cela veut dire qu'il faut les réinventer pour le nouveau chapitre. Le message vocal du matin peut devenir un café de cinq minutes au comptoir. Le check-in du dimanche peut devenir une promenade du dimanche soir. Le journal partagé peut accueillir à nouveau de petites choses — sauf que les petites choses ne parlent plus de distance, elles parlent de vie commune.` },
      { h: `Togthr dans ce nouveau chapitre`, p: `Beaucoup de couples se demandent s'ils ont encore besoin d'un compagnon IA une fois dans la même pièce. La réponse honnête : oui, mais pour d'autres raisons. Togthr Bot ne porte plus le poids de la distance. Il n'est plus le pont entre deux fuseaux horaires. Pendant la première semaine de vie commune, le bot devient quelque chose de plus petit et de plus utile : un check-in quotidien qui vous aide à rester honnêtes sur la manière dont se passe le nouveau chapitre. Pas honnêtes « tu me manques ». Honnêtes « on a eu un petit frottement hier soir et on n'en a pas reparlé ». Le journal partagé dans Togthr peut recueillir exactement les petites choses de la première semaine qu'on n'ose pas dire à voix haute — une petite dispute sur la vaisselle, un moment tendre trop petit pour être formulé. Quelques semaines plus tard, en relisant les entrées de la première semaine, vous serez contents de les avoir écrites.` },
      { h: `Un petit rituel pour la première semaine`, p: `Voici un exercice qui aide presque tous les couples qui viennent d'emménager ensemble. Chaque soir de la première semaine, faites le tour du pâté de maisons en quinze minutes. Pas de téléphone. Pas d'agenda. Juste marcher. Vous n'êtes pas obligés de parler tout le temps. Certains soirs, vous le ferez. Certains soirs, vous marcherez en silence, et ce silence-là sera différent de celui d'avant — plus doux, moins nerveux, plus proche d'une chose que vous aurez gagnée ensemble. La promenade vous donne un point de contrôle quotidien. Elle est assez courte pour qu'on la fasse même une mauvaise journée. Elle est assez longue pour que quelque chose de vrai remonte souvent. Après la première semaine, la promenade devient facultative. La plupart des couples continuent. Togthr peut compter la série en silence, ou vous pouvez ignorer la série et simplement marcher. Ce n'est pas la série qui compte. C'est la promenade.` },
    ],
    cta: `Ouvrez Togthr ce soir ensemble et écrivez la première entrée de votre nouveau chapitre.`,
    faqs: [
      { q: `Est-ce normal de se sentir un peu décalé la première semaine de vie commune ?`, a: `Oui. Presque tous les couples ressentent de petits frottements la première semaine — même les couples qui se sont fréquentés pendant des années dans la même ville avant d'emménager. La nouveauté de la proximité physique est réelle, et la gêne à partager de petites habitudes quotidiennes aussi. Donnez-vous deux semaines avant de tirer des conclusions sur l'emménagement.` },
      { q: `Combien de temps faut-il pour se sentir chez soi ?`, a: `Il n'y a pas de réponse fixe. Certains couples se sentent installés en une semaine. La plupart ont besoin d'un mois environ. Le marqueur est en général une petite chose — la première fois où vous posez instinctivement une tasse du « bon » côté de l'évier, ou la première fois où vous allez pieds nus dans la cuisine et où votre partenaire ne lève même pas la tête. La maison se construit avec plein de petits gestes répétés.` },
      { q: `Faut-il continuer à utiliser Togthr après avoir emménagé ensemble ?`, a: `Si vous le souhaitez. Togthr est surtout utile pendant les premières semaines d'un nouveau chapitre, y compris l'emménagement. Le check-in quotidien devient un endroit doux pour écrire les petites choses que vous n'osez pas encore dire à voix haute — une petite dispute sur la vaisselle, un moment trop petit pour être formulé. Au bout d'un mois, la plupart des couples utilisent l'app plus légèrement ou la mettent en pause. Les deux conviennent.` },
      { q: `Que faire si nos rythmes de sommeil sont complètement différents ?`, a: `C'est l'une des surprises les plus fréquentes de la première semaine. La solution est en général une version de ceci : l'un se lève tôt, l'autre dort avec des bouchons d'oreilles, et vous convenez que la personne matinale n'a pas besoin de rester silencieuse. Un petit rituel partagé — un café le matin, un court message à midi — comble l'écart de rythme sans que personne ait à changer qui il est.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/features`, label: `Fonctionnalités Togthr` },
      { href: `/fr/blog/three-small-rituals-for-couples-who-live-apart`, label: `Trois petits rituels pour les couples qui vivent séparés` },
      { href: `/fr/blog/two-minute-daily-check-in-ai-companion`, label: `Un check-in quotidien de deux minutes avec un compagnon IA` },
      { href: `/fr/pet`, label: `La page de l'animal virtuel` },
    ],
  },

  // ─────────────────────── Español ───────────────────────
  es: {
    intro: `Si has vivido una relación a distancia, el día en que por fin os mudáis al mismo apartamento se supone que es un final. Después de meses o años de husos horarios, audios y largas conversaciones del domingo, por fin estáis en el mismo reloj. Puedes pasarle el café. Puedes oírla en la habitación de al lado. La espera termina. Lo que nadie te dice es que la primera semana de vida real juntos es, sobre todo, pequeñas fricciones y alegrías silenciosas, y que la relación no salta a una forma nueva. Simplemente sigue — un poco más cerca.`,
    sections: [
      { h: `La primera semana no es lo que imaginabas`, p: `La mayoría de las parejas tienen una fantasía del día de la mudanza. Hay un montaje de cajas, una lista de reproducción alegre, quizá un amigo subiendo un colchón por las escaleras. La fantasía termina así: la puerta se cierra, los dos de pie en un salón vacío, por fin en la misma habitación. La realidad se parece más a una lista de tareas. Está el lado de la cama. Está el momento en que te das cuenta de que solo hay un baño y uno de los dos se ducha durante siglos. Está el momento en que uno se queda dormido y pierde la alarma y el otro finge tener paciencia. Los ritmos de sueño que parecían flexibles por videollamada son muy distintos en persona. Nada de esto es una crisis. Es solo la primera vez que vuestros días comparten una pared de verdad.` },
      { h: `Algunas cosas cambian de inmediato`, p: `Los cambios buenos llegan rápido. Dejas de enviar «buenos días» por mensaje, porque puedes decirlo en la cocina. Sueltas el teléfono en la cena, porque la persona a quien escribías está enfrente. Puedes pasarle el café, arreglarle el cuello, dejar una nota en la encimera — pequeñas cosas que antes requerían un teléfono y ahora solo un paso. Pero hay una cara opuesta. Ya no puedes esconder un mal humor. Cuando uno de los dos está cansado, el otro lo nota en una hora. Cuando uno tiene un día difícil en el trabajo, no hay un huso horario que amortigüe la noticia. La relación se vuelve más ruidosa, más rápida, más honesta. En general es algo bueno. También es algo a lo que hay que acostumbrarse.` },
      { h: `Algunas cosas cambian más despacio de lo que crees`, p: `Los rituales que construisteis a distancia no desaparecen en la primera semana. Solo se vuelven torpes. Sigues queriendo mandar el audio de la mañana, pero tu pareja está en la habitación de al lado y te sientes ridículo hablándole al móvil. Sigues queriendo el check-in del domingo, pero ahora compite con la compra y con la llamada de tu madre. El diario compartido de la época a distancia sigue ahí, pero las entradas se acortan, luego se vuelven esporádicas. Eso no significa que hayáis perdido los rituales. Significa que hay que reinventarlos para el nuevo capítulo. El audio de la mañana puede convertirse en un café de cinco minutos en la encimera. El check-in del domingo puede convertirse en un paseo del domingo por la noche. El diario compartido puede volver a acoger pequeñas cosas — solo que ahora las pequeñas cosas no hablan de distancia, hablan de vida juntos.` },
      { h: `Togthr en este nuevo capítulo`, p: `Muchas parejas se preguntan si todavía necesitan un compañero IA una vez que están en la misma habitación. La respuesta honesta: sí, pero por razones distintas. Togthr Bot ya no carga con el peso de la distancia. Ya no es el puente entre husos horarios. En la primera semana de vida juntos, el bot se convierte en algo más pequeño y más útil: un check-in diario que os ayuda a ser honestos sobre cómo va el nuevo capítulo. No honestos «te echo de menos». Honestos «anoche tuvimos una pequeña fricción y no hemos hablado de ello». El diario compartido dentro de Togthr puede容纳 exactamente esas cosas de la primera semana que no te atreves a decir en voz alta — una pequeña pelea por los platos, un momento tierno demasiado pequeño para mencionarlo. Unas semanas después, al releer las entradas de la primera semana, os alegraréis de haberlas escrito.` },
      { h: `Un pequeño ritual para la primera semana`, p: `Aquí va un ejercicio que ayuda a casi todas las parejas que acaban de mudarse juntas. Cada noche de la primera semana, dad una vuelta a la manzana de quince minutos. Sin teléfonos. Sin agenda. Solo caminar. No tenéis que hablar todo el tiempo. Algunas noches lo haréis. Algunas noches caminaréis en silencio, y ese silencio se sentirá distinto al de antes — más suave, menos ansioso, más como algo que habéis ganado juntos. El paseo os da un punto de control diario. Es lo bastante corto para hacerlo incluso en un mal día. Es lo bastante largo para que algo真实 suba a la superficie. Después de la primera semana, el paseo se vuelve opcional. La mayoría de las parejas siguen. Togthr puede llevar la racha en silencio, o puedes ignorar la racha y simplemente caminar. No es la racha lo que importa. Es el paseo.` },
    ],
    cta: `Abre Togthr esta noche juntos y escribid la primera entrada de vuestro nuevo capítulo.`,
    faqs: [
      { q: `¿Es normal sentirse un poco raro la primera semana de vida juntos?`, a: `Sí. Casi todas las parejas sienten pequeñas fricciones la primera semana — incluso las parejas que han salido juntas durante años en la misma ciudad antes de mudarse. La novedad de la cercanía física es real, y la incomodidad de compartir pequeñas costumbres diarias también. Daos dos semanas antes de sacar conclusiones sobre la mudanza.` },
      { q: `¿Cuánto se tarda en sentir que es casa?`, a: `No hay una respuesta fija. Algunas parejas se sienten instaladas en una semana. La mayoría necesitan cerca de un mes. La señal suele ser una cosa pequeña — la primera vez que dejas instintivamente una taza en «tu» lado del fregadero, o la primera vez que vas descalzo a la cocina y tu pareja ni siquiera levanta la vista. La casa se construye con muchos pequeños gestos repetidos.` },
      { q: `¿Deberíamos seguir usando Togthr después de mudarnos juntos?`, a: `Si queréis. Togthr es más útil durante las primeras semanas de cualquier capítulo nuevo, incluida la mudanza. El check-in diario se convierte en un lugar suave para escribir las pequeñas cosas que todavía no quieres decir en voz alta — una pequeña pelea por los platos, un momento tierno demasiado pequeño para mencionar. Al cabo de un mes, la mayoría de las parejas usa la app más a la ligera o la pausa. Ambas opciones están bien.` },
      { q: `¿Qué pasa si nuestros horarios de sueño son completamente distintos?`, a: `Es una de las sorpresas más comunes de la primera semana. La solución suele ser una versión de esto: uno se levanta antes, el otro duerme con tapones, y acordáis que la persona madrugadora no necesita estar en silencio. Un pequeño ritual compartido — un café por la mañana, un mensaje corto al mediodía — salva la diferencia de horario sin que ninguno tenga que cambiar quién es.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/features`, label: `Funciones de Togthr` },
      { href: `/es/blog/three-small-rituals-for-couples-who-live-apart`, label: `Tres pequeños rituales para parejas que viven lejos` },
      { href: `/es/blog/two-minute-daily-check-in-ai-companion`, label: `Un check-in diario de dos minutos con un compañero IA` },
      { href: `/es/pet`, label: `La página de la mascota virtual` },
    ],
  },
}

// ──────────────────────────────────────────────────────────────────────
// Next.js static-params: only the locale varies (slug is fixed in this file).
// ──────────────────────────────────────────────────────────────────────

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
    '@context': 'schema.org'.replace('schema.org', 'schema.org'),
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
              <Link href={withUtm(l.href, SLUG)} className="text-pink-400 hover:underline">{l.label} →</Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}