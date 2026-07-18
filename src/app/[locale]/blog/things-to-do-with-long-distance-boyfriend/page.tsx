// src/app/[locale]/blog/things-to-do-with-long-distance-boyfriend/page.tsx
//
// M1 batch 1 — SEO cluster B: "things to do with long distance boyfriend".
// Highest-traffic cluster. 15 small things that are NOT the usual
// "watch a movie together" list — including the unique one: raising a
// pixel pet together that grows with the relationship.
//
// Content contract:
//   - ≥600 words of REAL localized content per locale (EN 900-1200)
//   - 4 FAQ items per locale, hand-localized
//   - 3-5 internal links per locale
//   - Article + Breadcrumb + FAQPage JSON-LD

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `things-to-do-with-long-distance-boyfriend`
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
    intro: `Every list of things to do with your long-distance boyfriend starts the same way: watch a movie together, play an online game, have a video-call dinner. Those are fine. They are also the things every couple already tried in month one, and they all share a flaw — they require both of you to be free at the same time, performing "quality time" while one of you is secretly tired. Real long-distance life is mostly Tuesdays: asynchronous, unglamorous, quiet. So here is a different list. Fifteen small things, most of them doable across time zones without scheduling anything, built for the part of the relationship that actually needs feeding. Including one unusual one — raising a small pixel pet together that grows as your relationship does — that has quietly become the favorite ritual of more couples than we expected.`,
    sections: [
      { h: `1. Send the boring photo, not the good one`, p: `Not the sunset. The desk. The half-eaten lunch. The weird dog on your street. The curated photos say "look at my life"; the boring ones say "be in my life." Long-distance relationships run on the second kind. One unremarkable photo a day, no caption required, does more than a weekly photo dump ever will.` },
      { h: `2. Write the wishlist you'd be embarrassed to say out loud`, p: `Open a shared note and each add five things you want to do together someday — small and big, silly and serious. A specific ramen shop. A lazy Sunday with no plans. Where you'd live if money didn't matter. It costs ten minutes, works fully asynchronously, and gives you a shared future to point at when the present feels long.` },
      { h: `3. Raise a pixel pet together`, p: `This is the one that surprises people. Instead of another app to schedule calls in, you adopt a small shared creature that lives inside your relationship. In Togthr, the two of you raise a little round-headed robot — Togthr Bot, a pastel purple-and-pink pixel character with an 8-frame sprite animation — by writing small honest sentences about your days. It doesn't die if you forget a weekend. It grows: through 5 growth stages, from baby to legend, only as long as both of you keep showing up. Over time it unlocks 6 hidden career skins (programmer, doctor, astronaut, chef, police, firefighter), and there's a 1-in-72 hidden golden edition. A year in, you haven't just chatted — you've raised something together, and it remembers the boring Tuesdays too.` },
      { h: `4. Leave voice notes instead of essays`, p: `Typing "how was your day" produces "fine lol." A thirty-second voice note produces the actual day — the sigh, the laugh, the part where they trail off. Voice carries what text edits out. One rule makes it work: no response deadline. A voice note is a gift, not a task.` },
      { h: `5. Watch the same show — one episode behind each other`, p: `The trick isn't syncing playback; it's the one-episode gap. One of you stays an episode ahead and gets to watch the other catch up, react, and guess wrong. It turns a solo activity into a slow two-person conversation that stretches across a whole week.` },
      { h: `6. Send a song with one sentence about why`, p: `Not a playlist — those die after week two. One song, one sentence: "this played in the store and I thought of you." Music plus context is a postcard. Build the shared playlist out of those postcards, slowly, and it becomes an archive of specific days.` },
      { h: `7. Play the question game badly`, p: `Take turns asking one question a day, and ban the good questions. No "what's your love language." Ask the dumb ones: "what's the worst sandwich you ever ate," "what would your autobiography's worst chapter title be." The dumb questions get the real answers, because nobody performs for them.` },
      { h: `8. Cook the same meal, separately, and rate each other`, p: `Pick a recipe neither of you has made. Cook it on the same weekend, in your own kitchens, and send photos of the result — including the failures. Judging each other's burnt rice is oddly intimate. It is a shared memory of a meal you technically never ate together, which is exactly the kind of memory long-distance couples are made of.` },
      { h: `9. Read each other's day in one sentence`, p: `Every night, one sentence about your day, sent to the same place — a shared journal, or to a shared pet like Togthr Bot who holds it until the morning. The sentence is not for starting a conversation. It's for keeping the record. Months later, scrolling back through two people's one-sentence days is strangely moving. That record is what a shared life looks like from a distance.` },
      { h: `10. Mail something stupid`, p: `Physical objects hit different when everything else is pixels. A postcard. A snack from your city that doesn't exist in theirs. A terrible souvenir. It costs a few dollars and lands like an event. Do it rarely enough that it stays an event.` },
      { h: `11. Have a standing date that survives bad weeks`, p: `Pick one small recurring thing — Sunday coffee call, Friday voice note, a shared check-in with your pet before bed — and agree it happens even when the week was terrible. Especially then. The point of a ritual is that you don't renegotiate it when you're tired. Tired is when it matters.` },
      { h: `12. Learn each other's tiny vocabularies`, p: `Every person has private words — the name they call their tired mood, the phrase from their hometown. Ask for them. Use them back. There is no faster way to make "goodnight" feel like it came from inside the relationship instead of from a script.` },
      { h: `13. Plan the next visit before this one ends`, p: `The cruelest part of a visit is the airport. The antidote is leaving with the next date already on the calendar — or at least the month. The distance is much easier to carry when it has an end date, even a soft one.` },
      { h: `14. Do nothing together on purpose`, p: `Call, and then don't entertain each other. One of you folds laundry, the other scrolls recipes, the call just stays open. It mimics the thing couples in the same city take for granted: existing near each other without performing. It feels weird for five minutes and then like the most natural thing in the world.` },
      { h: `15. Let the pet be the excuse on days you have nothing to say`, p: `Some days there is no news. On those days, don't force a conversation — go feed the shared robot. Type one flat sentence: "long day, nothing happened." That's enough. Togthr Bot doesn't need you to be interesting. It just holds the day, and tomorrow your person reads it with their coffee and knows the shape of your Tuesday. Staying gently in touch on the empty days is the whole game. Everything else on this list is a bonus.` },
    ],
    cta: `Start with #3 tonight: adopt your shared Togthr Bot together, write your first sentence each, and watch it take its first baby steps. Free to start — monthly is $5.49, yearly $37.99 when you're ready.`,
    faqs: [
      { q: `What do you do with a long-distance boyfriend when you've run out of things to talk about?`, a: `Stop trying to generate conversation and switch to co-existing rituals. Shared objects — a show you're both watching, a shared journal, a pet you're raising together — create topics naturally because you're both living inside the same small thing. The empty days are exactly when a low-pressure ritual like feeding a shared pet matters most: one flat sentence is enough, and it keeps the thread unbroken.` },
      { q: `Are virtual pet apps actually good for long-distance couples?`, a: `The shared ones are, yes — because they give the relationship a third small presence that accumulates history. In Togthr, the bot grows through 5 stages (baby to legend) only while both of you keep checking in, so it becomes a living record of the relationship's consistency. It's not a replacement for calls or visits; it's the Tuesday-sized thing that fills the gaps between them.` },
      { q: `How often should long-distance couples talk?`, a: `There's no correct frequency — there's only a correct texture. Daily tiny touches (a photo, a sentence, a song) plus a few longer calls per week works better for most couples than one huge scheduled call, because it matches how closeness actually works in person: lots of small contact, occasional deep dives. Whatever rhythm you pick, protect one standing ritual that survives bad weeks.` },
      { q: `What are good apps for long-distance couples in 2026?`, a: `Look for three things: async-first design (works across time zones without scheduling), a shared persistent space (not just a chat log), and low daily effort. Togthr covers all three — it's a shared pixel pet plus journal that works across 8 languages, free to start, $5.49/month or $37.99/year in USD regions with local pricing in 13 countries. Pair it with whatever calling app you already use and you're set.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/pricing`, label: `Pricing in 13 countries` },
      { href: `/en/blog/three-small-rituals-for-couples-who-live-apart`, label: `Three small rituals for couples who live apart` },
      { href: `/en/blog/first-week-living-together-after-long-distance`, label: `The first week of living together after long distance` },
      { href: `/en/blog/best-virtual-pet-apps-2026`, label: `The best virtual pet apps of 2026` },
    ],
  },

  // ─────────────────────── 简体中文 ───────────────────────
  'zh-cn': {
    intro: `每一份"异地恋可以一起做的事"清单,开头都一样:一起看电影、一起玩网游、视频吃饭。这些都行,但这些也是每对情侣第一个月就试过的东西,而且它们有个共同的毛病 —— 要求你们俩同时有空,在其中一个人其实很困的时候表演"高质量相处"。真实的异地恋,大部分是星期二:异步、不浪漫、安静。所以这是一份不一样的清单。十五件小事,大部分都能跨时区完成,不用约时间,是为关系里真正需要被喂的那部分准备的。其中包括一件不太寻常的 —— 一起养一只会跟着你们关系长大的像素宠物 —— 它悄悄成了比我们预想多得多的情侣最喜欢的仪式。`,
    sections: [
      { h: `1. 发无聊的照片,不发好看的那张`, p: `不是日落。是工位。是吃了一半的午饭。是你们街上那只奇怪的狗。精修过的照片在说"看我的生活";无聊的照片在说"进我的生活"。异地恋靠的是后一种。每天一张平平无奇的照片,连配文都不用,比每周一次的九宫格管用得多。` },
      { h: `2. 写下那份说出口会不好意思的愿望清单`, p: `开一个共享备忘录,各自写五件想一起做的事 —— 小的大的,傻的认真的。某家具体的拉面店。一个没有计划的懒星期天。钱不是问题的话想住在哪。十分钟就写完,完全异步,还能在你们觉得"现在"太漫长的时候,有一个共同的未来可以指。` },
      { h: `3. 一起养一只像素宠物`, p: `这是最让人意外的一件。不再是多一个要约电话的 App,而是领养一只住在你们关系里的小生物。在 Togthr 里,你们俩一起养一只圆头的小机器人 —— Togthr Bot,pastel 紫粉配色的像素角色,8 帧动画 —— 方式是各自写下关于自己一天的小小真话。你忘了一个周末它不会死。它会长:走过 5 个成长阶段,从婴儿到传说,只要你们俩都持续出现。慢慢它还会解锁 6 款隐藏职业皮肤(程序员、医生、太空人、厨师、警察、消防员),还有 1/72 概率的隐藏金款。一年之后,你们不只是聊过天 —— 你们一起养大了一个东西,而那些无聊的星期二,它也记得。` },
      { h: `4. 留语音,别写小作文`, p: `打字问"今天怎么样",得到的永远是"还行哈哈"。一条三十秒的语音,才会装下真实的一天 —— 那声叹气,那个笑,说到一半停住的那一下。声音带着文字会编辑掉的东西。让它成立的规则只有一条:不规定回复时限。语音是礼物,不是任务。` },
      { h: `5. 追同一部剧 —— 故意差一集`, p: `诀窍不是同步播放,而是故意错开一集。一个人领先一集,就可以看着另一个人追上来、给反应、猜错剧情。它把一个人的活动,变成一场拖长一整周的慢速双人对话。` },
      { h: `6. 发一首歌,配一句为什么`, p: `不是歌单 —— 歌单两周就死了。一首歌,一句话:"店里放到这首,想到你了。"音乐加上下文,就是一张明信片。用这些明信片慢慢攒出一份共享歌单,它就会变成一本"具体某天"的档案。` },
      { h: `7. 把问答游戏玩得烂一点`, p: `轮流,每天问一个问题,禁用好问题。不许问"你的爱的语言是什么"。问蠢的:"你吃过最难吃的三明治是什么""如果你的自传有最烂一章,标题是什么"。蠢问题才能得到真答案,因为没有人为蠢问题表演。` },
      { h: `8. 各自做同一道菜,然后互相打分`, p: `挑一道你们俩都没做过的菜。同一个周末,在各自的厨房里做,互相发成品照片 —— 翻车的也要发。点评对方烧焦的饭,有一种奇怪的亲密感。这是一顿严格来说你们没有一起吃过、却共同拥有的饭的记忆 —— 而异地恋情侣,恰恰就是由这种记忆构成的。` },
      { h: `9. 用一句话读彼此的今天`, p: `每晚一句关于今天的话,发到同一个地方 —— 一本共享日记,或者发给一只像 Togthr Bot 这样的共享宠物,让它替你保管到早上。这句话不是为了开启对话,是为了留下记录。几个月后往回翻,两个人的"一天一句话",会有一种奇怪的动人。这份记录,就是一段共同生活隔着距离时的样子。` },
      { h: `10. 寄点蠢东西`, p: `当其他一切都是像素的时候,实体物件的份量不一样。一张明信片。你的城市有、对方的城市没有的一种零食。一个烂纪念品。花不了几块钱,落到对方手里却像一个事件。别寄太勤,让它一直是个事件。` },
      { h: `11. 定一个烂周也照常的小固定节目`, p: `挑一件小小的循环事项 —— 周日咖啡电话、周五语音、睡前一起喂一次你们的小宠物 —— 说好了,这周过得再烂也照做。尤其是烂的时候。仪式的意义就在于:累的时候不重新谈判。而累,恰恰是它最管用的时刻。` },
      { h: `12. 学会彼此的迷你词汇表`, p: `每个人都有私人词汇 —— 他们叫自己累瘫状态的词,老家带过来的说法。问来,然后拿来用回去。没有比这更快的方式,让一句"晚安"听起来像是从你们关系内部说出来的,而不是从剧本里抄的。` },
      { h: `13. 这次见面结束前,就定好下一次`, p: `见面最狠的部分是机场。解药是:走的时候,下一次的日期已经在日历上了 —— 哪怕只有月份。当距离有一个终点日期,哪怕是个模糊的,背起来都轻得多。` },
      { h: `14. 故意一起无所事事`, p: `打过来,然后不互相娱乐。你叠衣服,他刷菜谱,通话就那么开着。它模拟的是同城情侣习以为常的东西:待在彼此附近,不表演。前五分钟有点怪,然后就像世界上最自然的事。` },
      { h: `15. 没话说的日子,让宠物当借口`, p: `有些日子就是没有新闻。这种日子别硬找话题 —— 去喂你们共享的小机器人。打一句平平的话:"今天挺长,啥也没发生。"就够了。Togthr Bot 不需要你有趣。它只是替你保管今天,明天你那位配着咖啡读到,就知道你的星期二长什么样。在空无一物的日子里保持轻轻的联系,这就是全部的游戏。清单上其他的,都是加分项。` },
    ],
    cta: `今晚就从第 3 件开始:一起领养你们的 Togthr Bot,各写第一句话,看它迈出婴儿期的第一步。免费开始 —— 准备好了再付费,月付 $5.49,年付 $37.99。`,
    faqs: [
      { q: `和异地恋男友没话聊了怎么办?`, a: `别硬造话题,切换到"共存式"仪式。共享的对象 —— 一部一起追的剧、一本共享日记、一只一起养的宠物 —— 会自然产生话题,因为你们俩活在同一个小小的东西里。没话说的日子,恰恰是"喂共享宠物"这种低压力仪式最重要的时刻:一句平平的话就够了,线就还没断。` },
      { q: `虚拟宠物 App 对异地恋情侣真的有用吗?`, a: `共享型的有用,真的 —— 因为它给关系提供了一个会累积历史的、小小的第三存在。在 Togthr 里,小机器人只有你们俩持续打卡才会走过 5 个阶段(婴儿到传说)地长大,所以它成了这段关系"稳定度"的活记录。它不替代电话和见面,它是填补它们之间空隙的、星期二尺寸的东西。` },
      { q: `异地恋情侣应该多久聊一次?`, a: `没有正确的频率,只有正确的质感。对大多数情侣来说,每天小小的触碰(一张照片、一句话、一首歌)加每周几次长聊,比一次巨大的"预约通话"更管用 —— 因为这才符合亲密感真实的运作方式:大量小接触,偶尔深聊。不管选什么节奏,守住一个烂周也照常的固定仪式。` },
      { q: `2026 年有什么好用的异地恋 App?`, a: `看三点:异步优先(跨时区不用约时间)、有一个共享的持久空间(不只是聊天记录)、每天成本低。Togthr 三点都占 —— 共享像素宠物 + 日记,支持 8 种语言,免费开始,美元区月付 $5.49、年付 $37.99,13 个国家有本地定价。再配上你已经在用的通话 App,就够了。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/pricing`, label: `13 国定价` },
      { href: `/zh-cn/blog/three-small-rituals-for-couples-who-live-apart`, label: `异地恋的三个小仪式` },
      { href: `/zh-cn/blog/first-week-living-together-after-long-distance`, label: `异地之后住到一起的第一周` },
      { href: `/zh-cn/blog/best-virtual-pet-apps-2026`, label: `2026 虚拟宠物 App 诚实横评` },
    ],
  },

  // ─────────────────────── 繁體中文 ───────────────────────
  'zh-tw': {
    intro: `每一份「遠距離可以一起做的事」清單,開頭都一樣:一起看電影、一起玩網遊、視訊吃飯。這些都行,但這些也是每對情侶第一個月就試過的東西,而且它們有個共同的毛病 —— 要求你們倆同時有空,在其中一個人其實很睏的時候表演「高品質相處」。真實的遠距離,大部分是星期二:非同步、不浪漫、安靜。所以這是一份不一樣的清單。十五件小事,大部分都能跨時區完成,不用約時間,是為關係裡真正需要被餵的那部分準備的。其中包括一件不太尋常的 —— 一起養一隻會跟著你們關係長大的像素寵物 —— 牠悄悄成了比我們預想多得多的情侶最喜歡的儀式。`,
    sections: [
      { h: `1. 發無聊的照片,不發好看的那張`, p: `不是日落。是座位。是吃了一半的午飯。是你們街上那隻奇怪的狗。精修過的照片在說「看我的生活」;無聊的照片在說「進我的生活」。遠距離靠的是後一種。每天一張平平無奇的照片,連配文都不用,比每週一次的九宮格管用得多。` },
      { h: `2. 寫下那份說出口會不好意思的願望清單`, p: `開一個共享備忘錄,各自寫五件想一起做的事 —— 小的大的,傻的認真的。某家具體的拉麵店。一個沒有計畫的懶星期天。錢不是問題的話想住在哪。十分鐘就寫完,完全非同步,還能在你們覺得「現在」太漫長的時候,有一個共同的未來可以指。` },
      { h: `3. 一起養一隻像素寵物`, p: `這是最讓人意外的一件。不再是多一個要約電話的 App,而是領養一隻住在你們關係裡的小生物。在 Togthr 裡,你們倆一起養一隻圓頭的小機器人 —— Togthr Bot,pastel 紫粉配色的像素角色,8 幀動畫 —— 方式是各自寫下關於自己一天的小小真話。你忘了一個週末牠不會死。牠會長:走過 5 個成長階段,從嬰兒到傳說,只要你們倆都持續出現。慢慢牠還會解鎖 6 款隱藏職業外觀(工程師、醫生、太空人、廚師、警察、消防員),還有 1/72 機率的隱藏金款。一年之後,你們不只是聊過天 —— 你們一起養大了一個東西,而那些無聊的星期二,牠也記得。` },
      { h: `4. 留語音,別寫小作文`, p: `打字問「今天怎麼樣」,得到的永遠是「還行哈哈」。一條三十秒的語音,才會裝下真實的一天 —— 那聲嘆氣,那個笑,說到一半停住的那一下。聲音帶著文字會編輯掉的東西。讓它成立的規則只有一條:不規定回覆時限。語音是禮物,不是任務。` },
      { h: `5. 追同一部劇 —— 故意差一集`, p: `訣竅不是同步播放,而是故意錯開一集。一個人領先一集,就可以看著另一個人追上來、給反應、猜錯劇情。它把一個人的活動,變成一場拖長一整週的慢速雙人對話。` },
      { h: `6. 發一首歌,配一句為什麼`, p: `不是歌單 —— 歌單兩週就死了。一首歌,一句話:「店裡放到這首,想到你了。」音樂加上下文,就是一張明信片。用這些明信片慢慢攢出一份共享歌單,它就會變成一本「具體某天」的檔案。` },
      { h: `7. 把問答遊戲玩得爛一點`, p: `輪流,每天問一個問題,禁用好問題。不許問「你的愛的語言是什麼」。問蠢的:「你吃過最難吃的三明治是什麼」「如果你的自傳有最爛一章,標題是什麼」。蠢問題才能得到真答案,因為沒有人為蠢問題表演。` },
      { h: `8. 各自做同一道菜,然後互相打分`, p: `挑一道你們倆都沒做過的菜。同一個週末,在各自的廚房裡做,互相發成品照片 —— 翻車的也要發。點評對方燒焦的飯,有一種奇怪的親密感。這是一頓嚴格來說你們沒有一起吃過、卻共同擁有的飯的記憶 —— 而遠距離情侶,恰恰就是由這種記憶構成的。` },
      { h: `9. 用一句話讀彼此的今天`, p: `每晚一句關於今天的話,發到同一個地方 —— 一本共享日記,或者發給一隻像 Togthr Bot 這樣的共享寵物,讓牠替你保管到早上。這句話不是為了開啟對話,是為了留下記錄。幾個月後往回翻,兩個人的「一天一句話」,會有一種奇怪的動人。這份記錄,就是一段共同生活隔著距離時的樣子。` },
      { h: `10. 寄點蠢東西`, p: `當其他一切都是像素的時候,實體物件的份量不一樣。一張明信片。你的城市有、對方的城市沒有的一種零食。一個爛紀念品。花不了幾塊錢,落到對方手裡卻像一個事件。別寄太勤,讓牠一直是個事件。` },
      { h: `11. 定一個爛週也照常的小固定節目`, p: `挑一件小小的循環事項 —— 週日咖啡電話、週五語音、睡前一起餵一次你們的小寵物 —— 說好了,這週過得再爛也照做。尤其是爛的時候。儀式的意義就在於:累的時候不重新談判。而累,恰恰是它最管用的時刻。` },
      { h: `12. 學會彼此的迷你詞彙表`, p: `每個人都有私人詞彙 —— 他們叫自己累癱狀態的詞,老家帶過來的說法。問來,然後拿來用回去。沒有比這更快的方式,讓一句「晚安」聽起來像是從你們關係內部說出來的,而不是從劇本裡抄的。` },
      { h: `13. 這次見面結束前,就定好下一次`, p: `見面最狠的部分是機場。解藥是:走的時候,下一次的日期已經在日曆上了 —— 哪怕只有月份。當距離有一個終點日期,哪怕是個模糊的,背起來都輕得多。` },
      { h: `14. 故意一起無所事事`, p: `打過來,然後不互相娛樂。你摺衣服,他刷食譜,通話就那麼開著。它模擬的是同城情侶習以為常的東西:待在彼此附近,不表演。前五分鐘有點怪,然後就像世界上最自然的事。` },
      { h: `15. 沒話說的日子,讓寵物當藉口`, p: `有些日子就是沒有新聞。這種日子別硬找話題 —— 去餵你們共享的小機器人。打一句平平的話:「今天挺長,啥也沒發生。」就夠了。Togthr Bot 不需要你有趣。牠只是替你保管今天,明天你那位配著咖啡讀到,就知道你的星期二長什麼樣。在空無一物子裡保持輕輕的聯繫,這就是全部的遊戲。清單上其他的,都是加分項。` },
    ],
    cta: `今晚就從第 3 件開始:一起領養你們的 Togthr Bot,各寫第一句話,看牠跨出嬰兒期的第一步。免費開始 —— 準備好了再付費,月付 $5.49,年付 $37.99。`,
    faqs: [
      { q: `和遠距離男友沒話聊了怎麼辦?`, a: `別硬造話題,切換到「共存式」儀式。共享的對象 —— 一部一起追的劇、一本共享日記、一隻一起養的寵物 —— 會自然產生話題,因為你們倆活在同一個小小的東西裡。沒話說的日子,恰恰是「餵共享寵物」這種低壓力儀式最重要的時刻:一句平平的話就夠了,線就還沒斷。` },
      { q: `虛擬寵物 App 對遠距離情侶真的有用嗎?`, a: `共享型的有用,真的 —— 因為它給關係提供了一個會累積歷史的、小小的第三存在。在 Togthr 裡,小機器人只有你們倆持續打卡才會走過 5 個階段(嬰兒到傳說)地長大,所以它成了這段關係「穩定度」的活記錄。牠不替代電話和見面,牠是填補它們之間空隙的、星期二尺寸的東西。` },
      { q: `遠距離情侶應該多久聊一次?`, a: `沒有正確的頻率,只有正確的質感。對大多數情侶來說,每天小小的觸碰(一張照片、一句話、一首歌)加每週幾次長聊,比一次巨大的「預約通話」更管用 —— 因為這才符合親密感真實的運作方式:大量小接觸,偶爾深聊。不管選什麼節奏,守住一個爛週也照常的固定儀式。` },
      { q: `2026 年有什麼好用的遠距離 App?`, a: `看三點:非同步優先(跨時區不用約時間)、有一個共享的持久空間(不只是聊天記錄)、每天成本低。Togthr 三點都占 —— 共享像素寵物 + 日記,支援 8 種語言,免費開始,美元區月付 $5.49、年付 $37.99,13 個國家有本地定價。再配上你已經在用的通話 App,就夠了。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/pricing`, label: `13 國定價` },
      { href: `/zh-tw/blog/three-small-rituals-for-couples-who-live-apart`, label: `遠距離戀愛的三個小儀式` },
      { href: `/zh-tw/blog/first-week-living-together-after-long-distance`, label: `遠距離之後住在一起的第一週` },
      { href: `/zh-tw/blog/best-virtual-pet-apps-2026`, label: `2026 虛擬寵物 App 誠實橫評` },
    ],
  },

  // ─────────────────────── 日本語 ───────────────────────
  ja: {
    intro: `「遠距離の彼氏とすること」リストは、どれも同じ始まり方をします。一緒に映画を観る、オンラインゲーム、ビデオ通話ディナー。それも悪くない。でもそれはどのカップルも最初の 1 か月で試したもので、共通の欠点があります — 二人が同時に空いている必要があり、どちらかが本当は眠いのに「充実した時間」を演じることになる。実際の遠距離は、ほとんどが火曜日です。非同期で、地味で、静か。だからこれは違うリストです。15 の小さなこと。そのほとんどは時差を越えて、予定を立てずにできます。関係のなかで本当に餌が必要な部分のために。そのなかに一つ、珍しいものがあります — 関係と一緒に育つドットのペットを二人で育てること。それは、私たちが予想したよりずっと多くのカップルの、いちばんのお気に入りの儀式になりました。`,
    sections: [
      { h: `1. いい写真ではなく、つまらない写真を送る`, p: `夕日ではなく。デスク。食べかけの昼ごはん。近所の変な犬。整えられた写真は「私の人生を見て」と言う。つまらない写真は「私の人生にいて」と言う。遠距離が回るのは後者です。1 日 1 枚、なんでもない写真、キャプション不要。週 1 の写真まとめより、ずっと効きます。` },
      { h: `2. 口に出すと恥ずかしいウィッシュリストを書く`, p: `共有メモを開いて、いつか一緒にやりたいことを 5 つずつ書く — 小さいのも大きいのも、バカっぽいのも本気のも。あのラーメン屋。予定ゼロのだらだら日曜。お金を気にしないなら住みたい場所。10 分で終わるし、完全に非同期。そして「今」が長く感じるときに、指をさせる未来ができます。` },
      { h: `3. ドットのペットを二人で育てる`, p: `これがいちばん意外なやつです。通話を予定するためのもう一つのアプリではなく、関係のなかに住む小さな生き物を迎える。Togthr では、二人でちいさな丸頭のロボット — Togthr Bot、パステル紫とピンクのドットキャラで、8 フレームのスプライトアニメーション — を、お互いの一日についての小さな正直な一文で育てます。週末に忘れても死にません。育ちます — 5 つの成長ステージ、ベビーからレジェンドまで、二人が現れ続ける限り。やがて 6 つの隠し職業スキン(プログラマー、医者、宇宙飛行士、シェフ、警察官、消防士)がアンロックされ、1/72 の隠しゴールデンエディションもあります。1 年後、あなたたちは話しただけではありません — 何かを一緒に育てた。そしてその子は、何もない火曜日のことも覚えています。` },
      { h: `4. 長文の代わりにボイスメモを残す`, p: `「今日どうだった」と打つと「まあ普通笑」が返ってきます。30 秒のボイスメモには、本当の一日が入ります — ため息、笑い、言葉が途切れるところ。声は、テキストが編集で消してしまうものを運びます。うまくいかせるルールは一つ。返事の期限を設けないこと。ボイスメモはギフトであって、タスクではありません。` },
      { h: `5. 同じドラマを、1 話ずらして観る`, p: `コツは同時再生ではなく、1 話のズレです。先に 1 話進んだ側が、追いついてくる相手の反応や外れた予想を楽しめる。一人の娯楽が、1 週間かけて伸びていくゆっくりした二人の会話に変わります。` },
      { h: `6. 曲を 1 曲、「なぜか」の一言と一緒に送る`, p: `プレイリストではありません — あれは 2 週間で死にます。1 曲と、一言。「店でこれが流れて、あなたを思い出した」。音楽に文脈を足すと、それは絵はがきです。その絵はがきでゆっくり共有プレイリストを作っていくと、それは「具体的な日々」の記録になります。` },
      { h: `7. 質問ゲームを、あえてへたくそにやる`, p: `1 日 1 問ずつ交代で聞いて、「いい質問」を禁止にする。「あなたの愛の言語は」は禁止。バカなのを聞く — 「人生でいちばんまずかったサンドイッチは」「あなたの自伝の最悪の章のタイトルは」。バカな質問には本当の答えが返ってきます。誰もバカな質問のために演技をしないから。` },
      { h: `8. 同じ料理を別々に作って、採点し合う`, p: `二人とも作ったことのないレシピを選ぶ。同じ週末に、それぞれのキッチンで作って、完成写真を送り合う — 失敗作も含めて。相手の焦げたごはんを採点するのは、不思議と親密です。厳密には一緒に食べていない食事の共有の記憶 — 遠距離カップルは、まさにそういう記憶でできています。` },
      { h: `9. 一日を一文で読み合う`, p: `毎晩、その日についての一文を、同じ場所に送る — 共有日記、あるいは Togthr Bot のような共有ペットに。朝まで預かってくれます。その文は会話を始めるためではなく、記録のため。数か月後に読み返す二人の「一日一文」は、不思議なほど心にきます。その記録こそが、距離のある共有の人生の姿です。` },
      { h: `10. バカなものを郵送する`, p: `すべてがドットの世界では、実物の重みは別格です。絵はがき。あなたの街にしかないお菓子。ひどいお土産。数百円で、届いたほうには「イベント」として着弾します。イベント性が薄れないくらいの頻度で。` },
      { h: `11. 最悪の週にも生き残る定例を決める`, p: `小さな繰り返しを一つ — 日曜のコーヒー通話、金曜のボイスメモ、寝る前にペットへ一言 — 決めて、どんなにひどい週でもやることにする。ひどい週にこそ。儀式の意味は、疲れているときに再交渉しないこと。疲れているときこそ、それが効くのです。` },
      { h: `12. お互いの小さな語彙を覚える`, p: `誰にでもプライベートな言葉があります — 疲れた自分を呼ぶ名前、地元の言い回し。聞いて、使って返す。「おやすみ」が台本ではなく関係の内側から出てくる感じにする、いちばん速い方法です。` },
      { h: `13. 今回の会う予定が終わる前に、次を決める`, p: `会うことのいちばんつらい部分は空港です。解毒剤は、別れるときに次の日付がカレンダーに入っていること — 少なくとも月だけでも。距離は、終わりの日付があると、たとえ曖昧でもずっと軽く運べます。` },
      { h: `14. あえて一緒に何もしない`, p: `電話をつないで、お互いを楽しませない。洗濯物を畳む人、レシピを眺める人、通話はそのまま。同じ街のカップルが当たり前にしていること — 演じずに、ただ近くにいること — の模倣です。最初の 5 分は変ですが、そのあとは世界でいちばん自然な感じになります。` },
      { h: `15. 話すことがない日は、ペットを口実にする`, p: `ニュースがない日もあります。そういう日は会話を無理に作らず、共有のロボットに餌をあげにいく。平坦な一文でいい — 「長い一日、なにもなかった」。それで十分です。Togthr Bot は、あなたが面白いことを求めていません。今日を預かるだけ。明日、あなたの相手はコーヒーと一緒にそれを読んで、あなたの火曜日のかたちを知ります。空っぽの日に静かにつながり続けること — それが全部の勝負です。リストの残りはすべて、おまけです。` },
    ],
    cta: `今夜、#3 から始めてください。二人で Togthr Bot を迎え、最初の一文をひとつずつ書いて、ベビーの第一歩を見守る。無料で始められます — 準備ができたら月額 $5.49、年額 $37.99。`,
    faqs: [
      { q: `遠距離の彼氏と話すことがなくなったら、何をすればいい?`, a: `会話を無理に生み出すのをやめて、「共存型」の儀式に切り替えてください。共有の対象 — 一緒に観ているドラマ、共有日記、一緒に育てるペット — は、二人が同じ小さなものの中で生きているので、自然に話題を生みます。空っぽの日こそ、共有ペットに餌をあげるような低プレッシャーの儀式が大事です。平坦な一文で十分、そして糸は切れません。` },
      { q: `バーチャルペットアプリは遠距離カップルに本当に効果があるの?`, a: `共有型のものは、本当にあります — 関係に、歴史を積み上げる小さな第三の存在を与えてくれるからです。Togthr では、ボットは二人がチェックインし続ける間だけ、5 つのステージ(ベビーからレジェンド)を育つので、関係の「継続性」の生きた記録になります。通話や訪問の代わりではありません。その隙間を埋める、火曜日サイズのものです。` },
      { q: `遠距離カップルはどのくらいの頻度で話すべき?`, a: `正しい頻度はありません。正しい質感があるだけです。毎日の小さなタッチ(写真、一文、一曲)に加えて週に数回の長めの通話 — これが、週 1 の巨大な予定通話より多くのカップルに合います。近さの実際の働き方(たくさんの小さな接触と、ときどきの深い話)に合うからです。どんなリズムでも、最悪の週にも生き残る定例を一つ守ってください。` },
      { q: `2026 年、遠距離カップルにおすすめのアプリは?`, a: `3 つ見てください。非同期ファースト(時差を越えて予定なしで使える)、共有の永続スペース(チャット履歴だけではない)、1 日のコストが低いこと。Togthr は 3 つとも満たします — 共有ドットペット + 日記で、8 か国語対応、無料で開始、USD 地域で月額 $5.49 / 年額 $37.99、13 か国の現地価格あり。いつもの通話アプリと組み合わせれば十分です。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/pricing`, label: `13 か国の料金` },
      { href: `/ja/blog/three-small-rituals-for-couples-who-live-apart`, label: `離れて暮らすカップルの 3 つの小さな儀式` },
      { href: `/ja/blog/first-week-living-together-after-long-distance`, label: `遠距離のあと、一緒に住み始めた最初の 1 週間` },
      { href: `/ja/blog/best-virtual-pet-apps-2026`, label: `2026 年バーチャルペットアプリ、正直な比較` },
    ],
  },

  // ─────────────────────── 한국어 ───────────────────────
  ko: {
    intro: `'장거리 남자친구와 할 것' 리스트는 전부 같은 방식으로 시작합니다. 같이 영화 보기, 온라인 게임, 화상 저녁. 그것들도 괜찮습니다. 하지만 그것들은 모든 커플이 첫 달에 이미 해 본 것들이고, 공통의 결함이 있습니다 — 두 사람이 동시에 시간이 나야 하고, 한 사람이 사실 졸린데 '질 좋은 시간'을 연기해야 한다는 것. 실제 장거리 생활은 대부분 화요일입니다. 비동기적이고, 화려하지 않고, 조용합니다. 그래서 이건 다른 리스트입니다. 작은 것 열다섯 개. 대부분 시간대를 넘어, 아무 약속 없이 할 수 있는 것들. 관계에서 정말로 먹이가 필요한 부분을 위해 만들었습니다. 그중 하나는 좀 특별합니다 — 관계와 함께 자라는 픽셀 펫을 함께 키우는 것. 그것은 우리가 예상한 것보다 훨씬 많은 커플의 가장 좋아하는 의식이 되었습니다.`,
    sections: [
      { h: `1. 잘 나온 사진 말고, 지루한 사진을 본낸다`, p: `노을 말고. 책상. 반쯤 먹은 점심. 동네의 이상한 개. 다듬은 사진은 '내 삶을 봐'라고 말하고, 지루한 사진은 '내 삶 안에 있어'라고 말합니다. 장거리는 후자로 굴어갑니다. 하루 한 장, 아묠것도 아닌 사진, 캡션 불필요. 주 1회 사진 폭탄보다 훨씬 강력합니다.` },
      { h: `2. 말로 하면 부끄러운 위시리스트를 쓴다`, p: `공유 메모를 열고 언젠가 같이 하고 싶은 것을 다섯 개씩 적는다 — 작은 것, 큰 것, 바보 같은 것, 진지한 것. 어떤 라멘집. 계획 없는 게으른 일요일. 돈이 문제가 아니라면 살고 싶은 곳. 10분이면 되고, 완전히 비동기적이며, '지금'이 길게 느껴질 때 가리킬 수 있는 공동의 미래를 만들어 줍니다.` },
      { h: `3. 픽셀 펫을 함께 키운다`, p: `이게 가장 의외인 항목입니다. 통화를 잡기 위한 또 하나의 앱 대신, 관계 안에 사는 작은 생명체를 입양하는 것. Togthr에서 두 사람은 작은 둥근 머리 로봇 — Togthr Bot, 파스텔 보라와 핑크의 픽셀 캐릭터, 8프레임 스프라이트 애니메이션 — 을 서로의 하루에 대한 작고 솔직한 문장으로 키웁니다. 주말에 잊어도 죽지 않습니다. 자랍니다 — 5단계 성장, 아기부터 전설까지, 두 사람이 계속 나타나는 동안만. 시간이 지나면 6가지 숨겨진 직업 스킨(프로그래머, 의사, 우주비행사, 셰프, 경찰, 소방관)이 열리고, 1/72의 숨겨진 골든 에디션도 있습니다. 1년 뒤, 두 사람은 대화만 한 것이 아닙니다 — 함께 무언가를 키웠고, 그 아이는 아무 일 없던 화요일도 기억합니다.` },
      { h: `4. 긴 글 대신 음성 메모를 남긴다`, p: `'오늘 어땠어'라고 치면 '그냥 그랬어 ㅋㅋ'가 돌아옵니다. 30초 음성 메모에는 진짜 하루가 담깁니다 — 한숨, 웃음, 말하다 멎는 부분. 목소리는 텍스트가 편집해 버리는 것을 실어 나릅니다. 잘 되게 하는 규칙은 하나: 답장 기한을 두지 않을 것. 음성 메모는 선물이지, 과제가 아닙니다.` },
      { h: `5. 같은 드라마를, 한 화 어긋나게 본다`, p: `요령은 동시 재생이 아니라 한 화 차이입니다. 한 화 앞선 사람이, 따라오는 상대의 반응과 빗나간 추측을 즐길 수 있죠. 혼자 하는 활동이 일주일 남짝 이어지는 느린 두 사람의 대화로 바뀝니다.` },
      { h: `6. 노래 한 곡을, 이유 한 줄과 함께 본낸다`, p: `플레이리스트는 아닙니다 — 그건 2주면 죽습니다. 노래 한 곡, 한 줄: '가게에서 이게 나와서 네 생각이 났어.' 음악에 맥락을 얹으면 그것은 엽서입니다. 그 엽서들로 천천히 공유 플레이리스트를 만들면, 그것은 '구체적인 날들'의 아카이브가 됩니다.` },
      { h: `7. 질문 게임을 일부러 못 한다`, p: `하루에 질문 하나씩 번갈아 하고, 좋은 질문은 금지. '너의 사랑의 언어는' 금지. 바보 같은 것을 물어라 — '인생 최악의 샌드위치는', '네 자서전의 최악의 챕터 제목은'. 바보 같은 질문이 진짜 답을 얻습니다. 아무도 바보 같은 질문을 위해 연기하지 않으니까요.` },
      { h: `8. 같은 요리를 각자 만들고, 서로 채점한다`, p: `둘 다 만들어 본 적 없는 레시피를 고른다. 같은 주말에 각자의 부엌에서 만들고, 결과 사진을 본낸다 — 실패작 포함. 상대의 탄 밥을 평가하는 것은 이상하게 친밀합니다. 엄밀히는 함께 먹지 않은 식사의 공유된 기억 — 장거리 커플은 정확히 그런 기억으로 만들어집니다.` },
      { h: `9. 하루를 한 문장으로 서로 읽는다`, p: `매일 밤, 그날에 대한 한 문장을 같은 곳에 본낸다 — 공유 저널, 혹은 Togthr Bot 같은 공유 펫에게. 아침까지 맡아줍니다. 그 문장은 대화를 시작하기 위한 것이 아니라 기록을 위한 것. 몇 달 뒤 두 사람의 '하루 한 문장'을 거슬러 읽는 것은 이상할 만큼 뭉클합니다. 그 기록이 바로 거리를 둔 공유된 삶의 모습입니다.` },
      { h: `10. 바보 같은 물건을 우편으로 본낸다`, p: `모든 것이 픽셀일 때, 실물은 다르게 닿습니다. 엽서. 내 도시에만 있는 과자. 끔찍한 기념품. 몇천 원이면 되지만 받는 쪽에는 이벤트처럼 도착합니다. 이벤트로 남을 만큼 드물게.` },
      { h: `11. 최악의 주에도 살아남는 고정 일정을 둔다`, p: `작고 반복되는 것 하나 — 일요일 커피 통화, 금요일 음성 메모, 자기 전 펫에게 한 마디 — 를 정하고, 그 주가 아무리 최악이어도 하기로 한다. 최악일 때 특히. 의식의 요점은 피곤할 때 재협상하지 않는 것입니다. 피곤할 때가 바로 그것이 중요한 때입니다.` },
      { h: `12. 서로의 작은 어휘를 배운다`, p: `모든 사람에게는 사적인 단어가 있습니다 — 지친 기분을 부르는 이름, 고향의 표현. 물어보고, 되돌려 쓰세요. '잘 자'가 대본이 아니라 관계 안쪽에서 나온 것처럼 느껴지게 하는 가장 빠른 방법입니다.` },
      { h: `13. 이번 만남이 끝나기 전에 다음을 정한다`, p: `만남의 가장 잔인한 부분은 공항입니다. 해독제는 헤어질 때 다음 날짜가 이미 달력에 있는 것 — 최소한 월이라도. 거리는 끝 날짜가 있으면, 흐릿하더라도 훨씬 가볍게 짊어질 수 있습니다.` },
      { h: `14. 일부러 함께 아무것도 하지 않는다`, p: `전화를 걸고, 서로를 즐겁게 하지 않는다. 한 사람은 빨래를 개고, 다른 사람은 레시피를 훑고, 통화는 그냥 열어 둔다. 같은 도시의 커플이 당연하게 여기는 것 — 연기하지 않고 그냥 서로 곁에 있는 것 — 을 흉내 냅니다. 처음 5분은 이상하고, 그다음에는 세상에서 가장 자연스러운 느낌이 됩니다.` },
      { h: `15. 할 말이 없는 날에는 펫을 핑계로 삼는다`, p: `뉴스가 없는 날도 있습니다. 그런 날은 대화를 억지로 만들지 말고, 공유 로봇에게 밥을 주러 가세요. 담담한 한 문장이면 됩니다: '긴 하루, 아무 일도 없었어.' 그걸로 충분합니다. Togthr Bot은 당신이 재미있기를 요구하지 않습니다. 그저 하루를 맡아둘 뿐. 내일, 당신의 사람이 커피와 함께 그것을 읽고 당신의 화요일의 모양을 압니다. 텅 빈 날에 다정하게 연결되어 있는 것 — 그게 전부의 게임입니다. 리스트의 나머지는 전부 본어스입니다.` },
    ],
    cta: `오늘 밤 #3부터 시작해 보세요. 함께 Togthr Bot을 입양하고, 각자 첫 문장을 쓰고, 아기의 첫걸음을 지켜보는 것. 무료로 시작 — 준비되면 월 $5.49, 연 $37.99입니다.`,
    faqs: [
      { q: `장거리 남자친구와 할 말이 떨어지면 뭘 해야 하나요?`, a: `대화를 억지로 만들지 말고 '공존형' 의식으로 바꾸세요. 공유되는 대상 — 함께 보는 드라마, 공유 저널, 함께 키우는 펫 — 은 두 사람이 같은 작은 것 안에서 살고 있기 때문에 자연스럽게 화제를 만듭니다. 텅 빈 날이야말로 공유 펫에게 밥을 주는 것 같은 낮은 압력의 의식이 가장 중요합니다. 담담한 한 문장이면 충분하고, 실은 끊기지 않습니다.` },
      { q: `가상 펫 앱이 장거리 커플에게 정말 효과가 있나요?`, a: `공유형이라면, 네, 정말로요 — 관계에 역사를 쌓아가는 작은 세 번째 존재를 주기 때문입니다. Togthr에서 봇은 두 사람이 계속 체크인하는 동안만 5단계(아기에서 전설까지)로 자라므로, 관계의 '꾸준함'의 살아있는 기록이 됩니다. 통화나 방문을 대체하지 않습니다. 그 사이의 틈을 채우는, 화요일 크기의 것입니다.` },
      { q: `장거리 커플은 얼마나 자주 이야기해야 하나요?`, a: `정답인 빈도는 없고, 정답인 질감만 있습니다. 매일의 작은 터치(사진, 한 문장, 노래 한 곡)에 주 몇 회의 긴 통화 — 이것이 주 1회의 거대한 예약 통화보다 대부분의 커플에게 잘 맞습니다. 가까움이 실제로 작동하는 방식(많은 작은 접촉, 가끔의 깊은 대화)과 일치하니까요. 어떤 리듬이든, 최악의 주에도 살아남는 고정 의식 하나를 지키세요.` },
      { q: `2026년 장거리 커플에게 좋은 앱은?`, a: `세 가지를 보세요: 비동기 우선 설계(시간대를 넘어 예약 없이 작동), 공유된 지속 공간(채팅 로그만이 아닌), 낮은 일일 노력. Togthr는 셋 다 충족합니다 — 공유 픽셀 펫 + 저널, 8개 언어 지원, 무료 시작, USD 지역 월 $5.49 / 연 $37.99, 13개국 현지 가격. 이미 쓰는 통화 앱과 조합하면 충분합니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/pricing`, label: `13개국 요금` },
      { href: `/ko/blog/three-small-rituals-for-couples-who-live-apart`, label: `떨어져 사는 커플을 위한 세 가지 작은 의식` },
      { href: `/ko/blog/first-week-living-together-after-long-distance`, label: `장거리 연애 끝, 처음 같이 살게 된 첫 주` },
      { href: `/ko/blog/best-virtual-pet-apps-2026`, label: `2026년 가상 펫 앱, 솔직한 비교` },
    ],
  },

  // ─────────────────────── Deutsch ───────────────────────
  de: {
    intro: `Jede Liste von Dingen, die man mit seinem Fernbeziehungs-Freund tun kann, beginnt gleich: zusammen einen Film schauen, ein Online-Game spielen, per Videoanruf essen. Das ist okay. Es ist auch das, was jedes Paar schon im ersten Monat ausprobiert hat, und alle haben denselben Fehler — sie verlangen, dass ihr beide gleichzeitig frei habt und "Quality Time" spielt, während einer insgeheim müde ist. Das echte Fernbeziehungsleben besteht hauptsächlich aus Dienstagen: asynchron, unglamourös, leise. Also hier eine andere Liste. Fünfzehn kleine Dinge, die meisten davon über Zeitzonen hinweg machbar, ohne irgendetwas zu verabreden, gebaut für den Teil der Beziehung, der tatsächlich gefüttert werden muss. Darunter ein ungewöhnlicher — gemeinsam ein Pixel-Haustier aufziehen, das mit eurer Beziehung wächst — der still zum Lieblingsritual von mehr Paaren geworden ist, als wir erwartet hatten.`,
    sections: [
      { h: `1. Schick das langweilige Foto, nicht das gute`, p: `Nicht den Sonnenuntergang. Den Schreibtisch. Das halb gegessene Mittagessen. Den komischen Hund in deiner Straße. Kuratierte Fotos sagen "schau mein Leben"; langweilige sagen "sei in meinem Leben". Fernbeziehungen laufen mit der zweiten Sorte. Ein unscheinbares Foto pro Tag, ohne Bildunterschrift, bewirkt mehr als jede wöchentliche Fotoflut.` },
      { h: `2. Schreibt die Wunschliste, die ihr laut sagen nicht wagen würdet`, p: `Öffnet eine gemeinsame Notiz und tragt je fünf Dinge ein, die ihr eines Tages zusammen tun wollt — klein und groß, albern und ernst. Ein bestimmter Ramen-Laden. Ein fauler Sonntag ohne Pläne. Wo ihr wohnen würdet, wenn Geld keine Rolle spielte. Kostet zehn Minuten, funktioniert völlig asynchron, und gibt euch eine gemeinsame Zukunft, auf die ihr zeigen könnt, wenn sich die Gegenwart lang anfühlt.` },
      { h: `3. Zieht gemeinsam ein Pixel-Haustier groß`, p: `Das ist der Punkt, der die Leute überrascht. Statt einer weiteren App, in der man Anrufe plant, adoptiert ihr eine kleine gemeinsame Kreatur, die in eurer Beziehung wohnt. Bei Togthr zieht ihr einen kleinen rundköpfigen Roboter groß — Togthr Bot, eine Pixel-Figur in Pastell-Lila und Rosa mit 8-Frame-Sprite-Animation — indem ihr kleine ehrliche Sätze über eure Tage schreibt. Er stirbt nicht, wenn ihr ein Wochenende vergesst. Er wächst: durch 5 Wachstumsstufen, vom Baby bis zur Legende, nur solange ihr beide weiter auftaucht. Mit der Zeit schaltet er 6 versteckte Berufs-Skins frei (Programmierer, Arzt, Astronaut, Koch, Polizist, Feuerwehrmann), und es gibt eine versteckte goldene Edition mit 1-zu-72-Chance. Nach einem Jahr habt ihr nicht nur gechattet — ihr habt zusammen etwas großgezogen, und es erinnert sich auch an die langweiligen Dienstage.` },
      { h: `4. Schick Sprachnachrichten statt Aufsätze`, p: `Getipptes "wie war dein Tag" produziert "gut lol". Eine dreißigsekündige Sprachnachricht produziert den echten Tag — den Seufzer, das Lachen, die Stelle, an der jemand abbricht. Stimme trägt, was Text herauseditiert. Eine Regel macht es möglich: keine Antwort-Frist. Eine Sprachnachricht ist ein Geschenk, keine Aufgabe.` },
      { h: `5. Schaut dieselbe Serie — eine Folge versetzt`, p: `Der Trick ist nicht das synchrone Abspielen, sondern die Lücke von einer Folge. Einer bleibt eine Folge voraus und darf zusehen, wie der andere aufholt, reagiert und falsch rät. So wird eine Solo-Aktivität zu einem langsamen Gespräch zu zweit, das sich über eine ganze Woche zieht.` },
      { h: `6. Schick einen Song mit einem Satz, warum`, p: `Keine Playlist — die stirbt nach Woche zwei. Ein Song, ein Satz: "das lief im Laden und ich musste an dich denken." Musik plus Kontext ist eine Postkarte. Baut die gemeinsame Playlist aus diesen Postkarten, langsam, und sie wird ein Archiv konkreter Tage.` },
      { h: `7. Spielt das Fragespiel absichtlich schlecht`, p: `Stellt euch abwechselnd eine Frage pro Tag, und verbannt die guten Fragen. Kein "was ist deine Liebessprache". Fragt die dummen: "Was war das schlimmste Sandwich deines Lebens?", "Wie hieße das schlechteste Kapitel deiner Autobiografie?" Die dummen Fragen bekommen die echten Antworten, weil niemand für sie performt.` },
      { h: `8. Kocht dasselbe Gericht, getrennt, und bewertet euch gegenseitig`, p: `Sucht ein Rezept, das keiner von euch je gemacht hat. Kocht es am selben Wochenende, jeder in der eigenen Küche, und schickt Fotos vom Ergebnis — inklusive der Misserfolge. Das angebrannte Reisgericht des anderen zu bewerten ist seltsam intim. Es ist die gemeinsame Erinnerung an ein Essen, das ihr technisch nie zusammen gegessen habt — genau die Art Erinnerung, aus der Fernpaare gemacht sind.` },
      { h: `9. Lest eure Tage gegenseitig in einem Satz`, p: `Jeden Abend ein Satz über den Tag, an denselben Ort — ein gemeinsames Tagebuch oder ein geteiltes Haustier wie Togthr Bot, das ihn bis zum Morgen aufbewahrt. Der Satz ist nicht dazu da, ein Gespräch zu beginnen. Er ist für die Aufzeichnung. Monate später ist das Zurückscrollen durch die Ein-Satz-Tage zweier Menschen seltsam bewegend. Diese Aufzeichnung ist, wie ein geteiltes Leben aus der Distanz aussieht.` },
      { h: `10. Schickt euch etwas Bescheuertes per Post`, p: `Physische Objekte treffen anders, wenn alles andere Pixel ist. Eine Postkarte. Ein Snack aus deiner Stadt, den es in ihrer nicht gibt. Ein furchtbares Souvenir. Kostet ein paar Euro und kommt wie ein Ereignis an. Selten genug, dass es ein Ereignis bleibt.` },
      { h: `11. Habt einen festen Termin, der schlechte Wochen überlebt`, p: `Wählt eine kleine wiederkehrende Sache — Sonntags-Kaffee-Anruf, Freitags-Sprachnachricht, das gemeinsame Füttern eures Haustiers vor dem Schlafen — und vereinbart, dass sie auch stattfindet, wenn die Woche furchtbar war. Gerade dann. Der Sinn eines Rituals ist, dass man es nicht neu verhandelt, wenn man müde ist. Müde ist, wenn es zählt.` },
      { h: `12. Lernt eure winzigen Wortschatze`, p: `Jeder Mensch hat private Wörter — den Namen für seine müde Stimmung, die Redewendung aus der Heimat. Fragt danach. Benutzt sie zurück. Es gibt keinen schnelleren Weg, damit sich "Gute Nacht" anfühlt, als käme sie aus dem Inneren der Beziehung statt aus einem Drehbuch.` },
      { h: `13. Plant den nächsten Besuch, bevor dieser endet`, p: `Der grausamste Teil eines Besuchs ist der Flughafen. Das Gegenmittel: Ihr geht mit dem nächsten Datum bereits im Kalender — oder wenigstens dem Monat. Die Distanz lässt sich viel leichter tragen, wenn sie ein Enddatum hat, selbst ein weiches.` },
      { h: `14. Tut absichtlich nichts zusammen`, p: `Ruft an, und unterhaltet euch dann nicht. Einer faltet Wäsche, der andere scrollt Rezepte, der Anruf bleibt einfach offen. Es ahmt nach, was Paare in derselben Stadt für selbstverständlich halten: nebeneinander zu existieren, ohne zu performen. Fühlt sich fünf Minuten komisch an und dann wie das Natürlichste der Welt.` },
      { h: `15. Lasst das Haustier der Vorwand sein an Tagen, an denen ihr nichts zu sagen habt`, p: `Manche Tage haben keine Neuigkeiten. An diesen Tagen erzwingt kein Gespräch — geht und füttert den gemeinsamen Roboter. Tippt einen flachen Satz: "langer Tag, nichts passiert." Das reicht. Togthr Bot verlangt nicht, dass ihr interessant seid. Er hält einfach den Tag, und morgen liest euer Mensch ihn beim Kaffee und kennt die Form eures Dienstags. An den leeren Tagen sanft in Kontakt zu bleiben ist das ganze Spiel. Alles andere auf dieser Liste ist Bonus.` },
    ],
    cta: `Fangt heute Abend mit #3 an: Adoptiert euren gemeinsamen Togthr Bot, schreibt jeder euren ersten Satz, und seht ihm bei den ersten Baby-Schritten zu. Kostenlos starten — monatlich $5.49, jährlich $37.99, wenn ihr bereit seid.`,
    faqs: [
      { q: `Was tun, wenn man mit dem Fernbeziehungs-Freund keine Gesprächsthemen mehr hat?`, a: `Hört auf, Gespräche zu erzeugen, und wechselt zu Koexistenz-Ritualen. Geteilte Objekte — eine Serie, die ihr beide schaut, ein gemeinsames Tagebuch, ein Haustier, das ihr zusammen aufzieht — erzeugen Themen von selbst, weil ihr beide in derselben kleinen Sache lebt. Die leeren Tage sind genau die, an denen ein druckarmes Ritual wie das Füttern eines geteilten Haustiers am wichtigsten ist: Ein flacher Satz reicht, und der Faden reißt nicht.` },
      { q: `Sind virtuelle Haustier-Apps wirklich gut für Fernpaare?`, a: `Die geteilten sind es, ja — weil sie der Beziehung eine dritte kleine Präsenz geben, die Geschichte ansammelt. Bei Togthr wächst der Bot durch 5 Stufen (Baby bis Legende) nur, solange ihr beide eincheckt, und wird so zu einer lebendigen Aufzeichnung der Beständigkeit der Beziehung. Er ersetzt weder Anrufe noch Besuche; er ist das dienstaggroße Ding, das die Lücken dazwischen füllt.` },
      { q: `Wie oft sollten Fernpaare reden?`, a: `Es gibt keine richtige Frequenz — nur eine richtige Textur. Tägliche kleine Berührungen (ein Foto, ein Satz, ein Song) plus ein paar längere Anrufe pro Woche funktionieren für die meisten Paare besser als ein riesiger Terminanruf, weil das entspricht, wie Nähe im echten Leben funktioniert: viele kleine Kontakte, gelegentlich Tiefgang. Welchen Rhythmus ihr auch wählt, schützt ein festes Ritual, das schlechte Wochen überlebt.` },
      { q: `Was sind gute Apps für Fernpaare 2026?`, a: `Achtet auf drei Dinge: Async-first-Design (funktioniert über Zeitzonen ohne Verabredung), einen geteilten dauerhaften Raum (nicht nur ein Chatlog) und geringen täglichen Aufwand. Togthr erfüllt alle drei — geteiltes Pixel-Haustier plus Tagebuch, funktioniert in 8 Sprachen, kostenloser Start, $5.49/Monat oder $37.99/Jahr in USD-Regionen mit lokalen Preisen in 13 Ländern. Kombiniert es mit eurer üblichen Anruf-App, und ihr seid startklar.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/pricing`, label: `Preise in 13 Ländern` },
      { href: `/de/blog/three-small-rituals-for-couples-who-live-apart`, label: `Drei kleine Rituale für Paare, die getrennt wohnen` },
      { href: `/de/blog/first-week-living-together-after-long-distance`, label: `Die erste Woche des Zusammenwohnens nach der Fernbeziehung` },
      { href: `/de/blog/best-virtual-pet-apps-2026`, label: `Die besten virtuellen Haustier-Apps 2026` },
    ],
  },

  // ─────────────────────── Français ───────────────────────
  fr: {
    intro: `Toutes les listes de choses à faire avec son copain à distance commencent pareil : regarder un film ensemble, jouer à un jeu en ligne, dîner en visio. C'est bien. C'est aussi ce que tous les couples ont déjà essayé le premier mois, et tout ça partage un défaut — il faut que vous soyez libres en même temps, en train de jouer la "quality time" pendant que l'un de vous est secrètement crevé. La vraie vie à distance, c'est surtout des mardis : asynchrone, pas glamour, silencieuse. Alors voici une autre liste. Quinze petites choses, faisables pour la plupart à travers les fuseaux horaires sans rien planifier, construites pour la partie de la relation qui a vraiment besoin d'être nourrie. Dont une inhabituelle — élever ensemble un petit animal pixel qui grandit avec votre relation — devenue discrètement le rituel préféré de bien plus de couples que prévu.`,
    sections: [
      { h: `1. Envoyez la photo banale, pas la belle`, p: `Pas le coucher de soleil. Le bureau. Le déjeuner à moitié mangé. Le chien bizarre de votre rue. Les photos léchées disent "regarde ma vie" ; les banales disent "sois dans ma vie". Les relations à distance tournent avec la deuxième sorte. Une photo quelconque par jour, sans légende, fait plus que n'importe quel dump hebdomadaire.` },
      { h: `2. Écrivez la wishlist que vous auriez honte de dire à voix haute`, p: `Ouvrez une note partagée et ajoutez chacun cinq choses à faire ensemble un jour — petites et grandes, bêtes et sérieuses. Un resto de ramen précis. Un dimanche paresseux sans plans. Où vous vivriez si l'argent ne comptait pas. Dix minutes, totalement asynchrone, et cela vous donne un futur commun à montrer du doigt quand le présent paraît long.` },
      { h: `3. Élevez un animal pixel ensemble`, p: `C'est celui qui surprend. Au lieu d'une énième app pour planifier des appels, vous adoptez une petite créature partagée qui vit dans votre relation. Dans Togthr, vous élevez tous les deux un petit robot à tête ronde — Togthr Bot, un personnage pixel violet et rose pastel avec une animation sprite de 8 images — en écrivant de petites phrases honnêtes sur vos journées. Il ne meurt pas si vous oubliez un week-end. Il grandit : à travers 5 étapes de croissance, de bébé à légende, tant que vous continuez tous les deux à être là. Avec le temps, il débloque 6 skins de métiers cachés (programmeur, médecin, astronaute, chef, policier, pompier), et il y a une édition dorée cachée à 1 chance sur 72. Au bout d'un an, vous n'avez pas seulement discuté — vous avez élevé quelque chose ensemble, et il se souvient aussi des mardis ennuyeux.` },
      { h: `4. Laissez des vocaux au lieu de dissertations`, p: `Un "c'était comment ta journée" tapé produit "bien mdr". Un vocal de trente secondes produit la vraie journée — le soupir, le rire, le moment où la phrase s'interrompt. La voix porte ce que le texte édite. Une règle pour que ça marche : pas de délai de réponse. Un vocal est un cadeau, pas une tâche.` },
      { h: `5. Regardez la même série — avec un épisode de décalage`, p: `L'astuce n'est pas la lecture synchronisée ; c'est l'écart d'un épisode. L'un reste un épisode en avance et peut regarder l'autre rattraper, réagir et se tromper de théorie. Ça transforme une activité solo en conversation lente à deux qui s'étire sur toute une semaine.` },
      { h: `6. Envoyez une chanson avec une phrase expliquant pourquoi`, p: `Pas une playlist — ça meurt après deux semaines. Une chanson, une phrase : "elle passait au magasin et j'ai pensé à toi." La musique plus le contexte, c'est une carte postale. Construisez la playlist partagée avec ces cartes postales, lentement, et elle devient une archive de jours précis.` },
      { h: `7. Jouez mal au jeu des questions`, p: `Posez-vous une question par jour à tour de rôle, et interdisez les bonnes questions. Pas de "c'est quoi ton langage de l'amour". Posez les nulles : "quel est le pire sandwich que tu aies jamais mangé", "quel serait le titre du pire chapitre de ton autobiographie". Les questions nulles obtiennent les vraies réponses, parce que personne ne joue pour elles.` },
      { h: `8. Cuisinez le même plat, séparément, et notez-vous`, p: `Choisissez une recette qu'aucun de vous n'a jamais faite. Cuisinez-la le même week-end, chacun dans sa cuisine, et envoyez des photos du résultat — échecs inclus. Noter le riz brûlé de l'autre est étrangement intime. C'est un souvenir partagé d'un repas que vous n'avez techniquement jamais mangé ensemble — exactement le genre de souvenir dont sont faits les couples à distance.` },
      { h: `9. Lisez vos journées l'un l'autre en une phrase`, p: `Chaque soir, une phrase sur votre journée, envoyée au même endroit — un journal partagé, ou à un animal partagé comme Togthr Bot qui la garde jusqu'au matin. La phrase n'est pas là pour lancer une conversation. Elle est pour les archives. Des mois plus tard, remonter le fil des journées en une phrase de deux personnes est étrangement émouvant. Cette archive, c'est à ça que ressemble une vie commune à distance.` },
      { h: `10. Postez un truc débile`, p: `Les objets physiques font un effet différent quand tout le reste est en pixels. Une carte postale. Un snack de votre ville qui n'existe pas dans la sienne. Un souvenir horrible. Ça coûte quelques euros et ça arrive comme un événement. Faites-le assez rarement pour que ça reste un événement.` },
      { h: `11. Ayez un rendez-vous fixe qui survit aux mauvaises semaines`, p: `Choisissez une petite chose récurrente — l'appel café du dimanche, le vocal du vendredi, nourrir votre animal ensemble avant de dormir — et convenez qu'elle a lieu même quand la semaine a été horrible. Surtout dans ce cas. Le sens d'un rituel, c'est qu'on ne le renégocie pas quand on est fatigué. C'est là qu'il compte.` },
      { h: `12. Apprenez vos petits vocabulaires`, p: `Chaque personne a des mots privés — le nom qu'elle donne à sa fatigue, l'expression de sa région. Demandez-les. Renvoyez-les. Il n'y a pas de moyen plus rapide pour qu'un "bonne nuit" semble venir de l'intérieur de la relation plutôt que d'un script.` },
      { h: `13. Planifiez la prochaine visite avant la fin de celle-ci`, p: `La partie la plus cruelle d'une visite, c'est l'aéroport. L'antidote : repartir avec la prochaine date déjà au calendrier — ou au moins le mois. La distance est bien plus facile à porter quand elle a une date de fin, même floue.` },
      { h: `14. Ne faites rien ensemble, exprès`, p: `Appelez, puis ne vous divertissez pas. L'un plie le linge, l'autre scrolle des recettes, l'appel reste juste ouvert. Ça imite ce que les couples de la même ville tiennent pour acquis : exister l'un près de l'autre sans performer. Ça fait bizarre cinq minutes, puis c'est la chose la plus naturelle du monde.` },
      { h: `15. Laissez l'animal être l'excuse les jours où vous n'avez rien à dire`, p: `Certains jours, il n'y a pas de nouvelles. Ces jours-là, ne forcez pas la conversation — allez nourrir le robot partagé. Tapez une phrase plate : "longue journée, rien de spécial." C'est assez. Togthr Bot n'a pas besoin que vous soyez intéressant. Il garde juste la journée, et demain votre personne la lit avec son café et connaît la forme de votre mardi. Rester doucement en contact les jours vides, c'est tout le jeu. Tout le reste de cette liste est un bonus.` },
    ],
    cta: `Commencez par le n°3 ce soir : adoptez votre Togthr Bot partagé, écrivez chacun votre première phrase, et regardez ses premiers pas de bébé. Gratuit pour commencer — $5.49 par mois, $37.99 par an quand vous serez prêts.`,
    faqs: [
      { q: `Que faire quand on n'a plus rien à se dire avec son copain à distance ?`, a: `Arrêtez de générer de la conversation et passez à des rituels de coexistence. Les objets partagés — une série que vous regardez tous les deux, un journal commun, un animal que vous élevez ensemble — créent des sujets naturellement, parce que vous vivez tous les deux dans la même petite chose. Les jours vides sont exactement ceux où un rituel sans pression comme nourrir un animal partagé compte le plus : une phrase plate suffit, et le fil ne se rompt pas.` },
      { q: `Les applications d'animaux virtuels sont-elles vraiment utiles pour les couples à distance ?`, a: `Les partagées, oui, vraiment — parce qu'elles donnent à la relation une troisième petite présence qui accumule de l'histoire. Dans Togthr, le bot ne grandit à travers les 5 étapes (bébé à légende) que si vous continuez tous les deux à pointer, devenant ainsi un enregistrement vivant de la constance de la relation. Il ne remplace ni les appels ni les visites ; c'est la chose taille mardi qui remplit les espaces entre les deux.` },
      { q: `À quelle fréquence les couples à distance devraient-ils parler ?`, a: `Il n'y a pas de bonne fréquence — il n'y a qu'une bonne texture. Des petites touches quotidiennes (une photo, une phrase, une chanson) plus quelques appels longs par semaine marchent mieux pour la plupart des couples qu'un seul énorme appel planifié, parce que ça correspond à la façon dont la proximité fonctionne vraiment : beaucoup de petits contacts, des plongées profondes occasionnelles. Quel que soit votre rythme, protégez un rituel fixe qui survit aux mauvaises semaines.` },
      { q: `Quelles sont les bonnes applications pour les couples à distance en 2026 ?`, a: `Cherchez trois choses : un design async-first (fonctionne à travers les fuseaux sans planification), un espace partagé persistant (pas juste un historique de chat), et un faible effort quotidien. Togthr coche les trois — animal pixel partagé plus journal, fonctionne dans 8 langues, gratuit pour commencer, $5.49/mois ou $37.99/an dans les régions USD avec des prix locaux dans 13 pays. Ajoutez votre app d'appels habituelle et c'est parti.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/pricing`, label: `Prix dans 13 pays` },
      { href: `/fr/blog/three-small-rituals-for-couples-who-live-apart`, label: `Trois petits rituels pour les couples qui vivent séparés` },
      { href: `/fr/blog/first-week-living-together-after-long-distance`, label: `La première semaine de vie commune après la relation à distance` },
      { href: `/fr/blog/best-virtual-pet-apps-2026`, label: `Les meilleures applications d'animaux virtuels 2026` },
    ],
  },

  // ─────────────────────── Español ───────────────────────
  es: {
    intro: `Toda lista de cosas para hacer con tu novio a distancia empieza igual: ver una película juntos, jugar online, cenar por videollamada. Está bien. También es lo que todas las parejas ya probaron el primer mes, y todas comparten un defecto — requieren que los dos estén libres a la vez, actuando "tiempo de calidad" mientras uno está secretamente cansado. La vida real a distancia son sobre todo martes: asincrónica, poco glamurosa, silenciosa. Así que aquí va una lista distinta. Quince cosas pequeñas, la mayoría factibles entre zonas horarias sin agendar nada, hechas para la parte de la relación que de verdad necesita ser alimentada. Incluyendo una inusual — criar juntos una pequeña mascota pixel que crece con la relación — que se ha vuelto discretamente el ritual favorito de más parejas de las que esperábamos.`,
    sections: [
      { h: `1. Manda la foto aburrida, no la buena`, p: `No el atardecer. El escritorio. El almuerzo a medias. El perro raro de tu calle. Las fotos curadas dicen "mira mi vida"; las aburridas dicen "está en mi vida". Las relaciones a distancia funcionan con el segundo tipo. Una foto intrascendente al día, sin pie de foto, hace más que cualquier volcado semanal de fotos.` },
      { h: `2. Escriban la lista de deseos que les daría vergüenza decir en voz alta`, p: `Abran una nota compartida y añadan cada uno cinco cosas que quieren hacer juntos algún día — pequeñas y grandes, tontas y serias. Un local de ramen concreto. Un domingo flojo sin planes. Dónde vivirían si el dinero no importara. Cuesta diez minutos, funciona totalmente en asíncrono, y les da un futuro compartido al que señalar cuando el presente se hace largo.` },
      { h: `3. Críen una mascota pixel juntos`, p: `Esta es la que sorprende. En lugar de otra app para agendar llamadas, adoptan una pequeña criatura compartida que vive dentro de su relación. En Togthr, los dos crían un pequeño robot de cabeza redonda — Togthr Bot, un personaje pixel en púrpura y rosa pastel con una animación sprite de 8 fotogramas — escribiendo pequeñas frases honestas sobre sus días. No muere si lo olvidan un fin de semana. Crece: a través de 5 etapas de crecimiento, de bebé a leyenda, solo mientras los dos sigan apareciendo. Con el tiempo desbloquea 6 skins de profesiones ocultas (programador, médico, astronauta, chef, policía, bombero), y hay una edición dorada oculta con probabilidad de 1 en 72. Un año después, no solo han charlado — han criado algo juntos, y también recuerda los martes aburridos.` },
      { h: `4. Deja notas de voz en lugar de ensayos`, p: `Escribir "¿qué tal tu día?" produce "bien jaja". Una nota de voz de treinta segundos produce el día de verdad — el suspiro, la risa, la parte donde se queda a medias. La voz carga lo que el texto edita. Una regla lo hace funcionar: sin fecha límite de respuesta. Una nota de voz es un regalo, no una tarea.` },
      { h: `5. Vean la misma serie — con un episodio de desfase`, p: `El truco no es sincronizar la reproducción; es el hueco de un episodio. Uno va un episodio por delante y puede ver al otro ponerse al día, reaccionar y equivocarse de teoría. Convierte una actividad en solitario en una conversación lenta de dos que se estira toda una semana.` },
      { h: `6. Manda una canción con una frase explicando por qué`, p: `No una playlist — esas mueren a las dos semanas. Una canción, una frase: "sonó en la tienda y pensé en ti." Música más contexto es una postal. Construyan la playlist compartida con esas postales, despacio, y se convierte en un archivo de días concretos.` },
      { h: `7. Jueguen mal al juego de las preguntas`, p: `Túrnense una pregunta al día, y prohíban las buenas preguntas. Nada de "¿cuál es tu lenguaje del amor?". Pregunten las tontas: "¿cuál es el peor sándwich que comiste?", "¿cómo se llamaría el peor capítulo de tu autobiografía?". Las preguntas tontas obtienen las respuestas reales, porque nadie actúa para ellas.` },
      { h: `8. Cocinen el mismo plato, por separado, y pónganse nota`, p: `Elijan una receta que ninguno haya hecho. Cocínenla el mismo fin de semana, cada uno en su cocina, y mándense fotos del resultado — incluidos los fracasos. Juzgar el arroz quemado del otro es extrañamente íntimo. Es un recuerdo compartido de una comida que técnicamente nunca comieron juntos — exactamente el tipo de recuerdo del que están hechas las parejas a distancia.` },
      { h: `9. Lean sus días mutuamente en una frase`, p: `Cada noche, una frase sobre tu día, enviada al mismo lugar — un diario compartido, o a una mascota compartida como Togthr Bot que la guarda hasta la mañana. La frase no es para empezar una conversación. Es para el registro. Meses después, volver a leer los días de una frase de dos personas es extrañamente conmovedor. Ese registro es cómo se ve una vida compartida desde la distancia.` },
      { h: `10. Envía algo tonto por correo`, p: `Los objetos físicos pegan distinto cuando todo lo demás son píxeles. Una postal. Un snack de tu ciudad que no existe en la suya. Un souvenir horrible. Cuesta unos pocos euros y llega como un evento. Hazlo lo bastante raramente para que siga siendo un evento.` },
      { h: `11. Tengan una cita fija que sobreviva a las malas semanas`, p: `Elijan una pequeña cosa recurrente — la llamada-café del domingo, la nota de voz del viernes, alimentar a su mascota juntos antes de dormir — y acuerden que ocurre incluso cuando la semana fue horrible. Sobre todo entonces. El sentido de un ritual es que no se renegocia cuando estás cansado. Cansado es cuando importa.` },
      { h: `12. Aprendan sus vocabularios diminutos`, p: `Toda persona tiene palabras privadas — el nombre que le pone a su cansancio, la frase de su tierra. Pregunten por ellas. Devuélvanlas. No hay forma más rápida de que un "buenas noches" suene como si viniera de dentro de la relación en lugar de un guion.` },
      { h: `13. Planifiquen la próxima visita antes de que termine esta`, p: `La parte más cruel de una visita es el aeropuerto. El antídoto es irse con la próxima fecha ya en el calendario — o al menos el mes. La distancia es mucho más fácil de cargar cuando tiene fecha de fin, aunque sea difusa.` },
      { h: `14. No hagan nada juntos a propósito`, p: `Llamen, y luego no se entretengan. Uno dobla la ropa, el otro mira recetas, la llamada simplemente queda abierta. Imita lo que las parejas de la misma ciudad dan por sentado: existir cerca el uno del otro sin actuar. Se siente raro cinco minutos y luego como lo más natural del mundo.` },
      { h: `15. Dejen que la mascota sea la excusa los días que no tienen nada que decir`, p: `Algunos días no hay noticias. Esos días, no fuercen la conversación — vayan a alimentar al robot compartido. Escriban una frase plana: "día largo, no pasó nada." Es suficiente. Togthr Bot no necesita que seas interesante. Solo guarda el día, y mañana tu persona lo lee con su café y conoce la forma de tu martes. Mantenerse suavemente en contacto en los días vacíos es todo el juego. Todo lo demás de esta lista es un bonus.` },
    ],
    cta: `Empiecen con el nº3 esta noche: adopten su Togthr Bot compartido, escriban cada uno su primera frase, y miren sus primeros pasos de bebé. Gratis para empezar — $5.49 al mes, $37.99 al año cuando estén listos.`,
    faqs: [
      { q: `¿Qué hacer cuando ya no tienes temas de conversación con tu novio a distancia?`, a: `Deja de intentar generar conversación y cambia a rituales de coexistencia. Los objetos compartidos — una serie que ambos ven, un diario común, una mascota que crían juntos — crean temas naturalmente, porque los dos viven dentro de la misma cosa pequeña. Los días vacíos son exactamente cuando un ritual de baja presión como alimentar una mascota compartida importa más: una frase plana basta, y el hilo no se rompe.` },
      { q: `¿Las apps de mascotas virtuales son realmente buenas para parejas a distancia?`, a: `Las compartidas sí, de verdad — porque le dan a la relación una tercera pequeña presencia que acumula historia. En Togthr, el bot solo crece a través de las 5 etapas (bebé a leyenda) mientras los dos siguen haciendo check-in, así que se convierte en un registro vivo de la constancia de la relación. No reemplaza llamadas ni visitas; es la cosa tamaño martes que llena los huecos entre ellas.` },
      { q: `¿Con qué frecuencia deberían hablar las parejas a distancia?`, a: `No hay una frecuencia correcta — solo una textura correcta. Toques pequeños diarios (una foto, una frase, una canción) más unas pocas llamadas largas por semana funciona mejor para la mayoría de las parejas que una sola llamada gigante programada, porque coincide con cómo funciona la cercanía en persona: mucho contacto pequeño, inmersiones profundas ocasionales. Sea cual sea tu ritmo, protege un ritual fijo que sobreviva a las malas semanas.` },
      { q: `¿Cuáles son buenas apps para parejas a distancia en 2026?`, a: `Busca tres cosas: diseño async-first (funciona entre zonas horarias sin agendar), un espacio compartido persistente (no solo un historial de chat) y bajo esfuerzo diario. Togthr cumple las tres — mascota pixel compartida más diario, funciona en 8 idiomas, gratis para empezar, $5.49/mes o $37.99/año en regiones USD con precios locales en 13 países. Combínala con la app de llamadas que ya uses y listo.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/pricing`, label: `Precios en 13 países` },
      { href: `/es/blog/three-small-rituals-for-couples-who-live-apart`, label: `Tres pequeños rituales para parejas que viven lejos` },
      { href: `/es/blog/first-week-living-together-after-long-distance`, label: `La primera semana viviendo juntos después de la distancia` },
      { href: `/es/blog/best-virtual-pet-apps-2026`, label: `Las mejores apps de mascotas virtuales de 2026` },
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
