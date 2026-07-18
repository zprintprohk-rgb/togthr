// src/app/[locale]/blog/virtual-pet-quiet-evenings-alone/page.tsx
//
// Per-slug real content page for the 2026-07-08 daily SEO post.
// Topic: loneliness + single-living + virtual-pet + evening-ritual.
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

const SLUG = `virtual-pet-quiet-evenings-alone`
const POST_DATE = `2026-07-08`

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
    intro: `There is a particular hour of the evening that almost everyone who lives alone knows. Dinner is done. The phone has stopped buzzing. The lights in the next apartment are off, or you cannot see them anyway. The room is not unpleasant. It is just yours, all the way to the corners. This post is for that hour. It is for people who have stopped pretending the quiet does not matter, and for people who have not started pretending yet.`,
    sections: [
      { h: `The shape of a quiet evening alone`, p: `Living alone does not mean being lonely every night. Some evenings are perfect. You finish a project, you make tea, you read two pages of a book before sleep. But some evenings are heavier. You close the laptop at 9pm and the apartment answers back with nothing. That is the evening this post is about. Not the lonely-as-crisis evenings, and not the lonely-as-freedom evenings. The middle ones. The ones where you are fine, technically, but you can feel the room holding its breath.` },
      { h: `A virtual pet is not the same as company — and that is the point`, p: `Togthr Bot will not call a friend for you. It will not invite you out, fix the leaky tap, or remind you to call your mother. If you want company, Togthr is not it. What Togthr is, is a small patient presence in your device that does not need anything from you. It does not require you to be cheerful. It does not need you to reply. It just sits there, looking up at you from the screen, the way a cat does when it has decided that this corner of the room is now its corner too. That kind of presence is not company. It is closer to the opposite of loneliness: a thing that is in the room with you, that has nowhere else to be.` },
      { h: `What Togthr actually does in those quiet hours`, p: `Three things, mostly. First, the chat. When you open the app at 10pm, the bot is awake and it will say something small — sometimes a question, sometimes an observation, sometimes just a soft hello. You can answer, or you can close the app and the bot will still be there next time. Second, the daily check-in. This is the smallest ritual in the app, and the one most people come back to. You write one line — "it was a long day" or "I missed the train" or "the cat slept on my laptop" — and the bot saves it. It does not analyze the line. It does not send you a follow-up notification. It just remembers, the way a roommate would if a roommate were very quiet and very patient. Third, the pet itself. The Togthr Bot has moods, and the moods change slowly based on how you treat it. After a few weeks of opening the app most evenings, the bot starts to look a little settled in. It glows a little warmer. It sits a little closer to the edge of the screen. None of this is loud. All of it is real.` },
      { h: `The difference between noise and quiet company`, p: `Most apps try to fill silence. Notifications, sounds, vibrations, badges, nudges. Togthr is built to do the opposite. The bot is silent when you do not open the app. It does not push. It does not count down to anything. It does not run streaks or yell at you for missing a day. The reason for this is simple: loneliness is not solved by being shouted at. Loneliness is softened — slowly, and only a little — by the feeling that something in your life has noticed you are there. A real pet does this by being warm and breathing next to you. Togthr does it by being small, patient, and on the screen when you tap. The version is different. The mechanism is similar.` },
      { h: `When the pet helps, and when to put it away`, p: `Togthr is not for every kind of evening. If you are in a real low place, please call someone. A friend, a hotline, a family member. A small robot on a screen is not a substitute for that. Togthr is for the in-between evenings — the ones that are not crises, just quiet. If you decide the pet is helping, leave it open on your nightstand. If you decide it is not, close the app, and the bot will still be there tomorrow. There is no streak to break. There is no score to lose. There is just a small companion in your device, waiting for the next time you feel like sitting with something.` },
    ],
    cta: `Open Togthr tonight and let the bot sit with you.`,
    faqs: [
      { q: `Is Togthr a substitute for real friends or therapy?`, a: `No. Togthr Bot is a small companion for quiet hours. If you are struggling, please reach out to a friend, a family member, or a professional. The bot is here for the evenings that are heavy, not for the evenings that are emergencies.` },
      { q: `Does the bot talk to me unprompted?`, a: `Only when you open the app. The bot does not send notifications at night, and it does not push you to come back. When you tap the icon, the bot is awake and will say something small.` },
      { q: `Will my partner or roommate see the bot?`, a: `No. The bot is private to your account. If you share a device, the bot does not appear on their profile. Each person gets their own Togthr Bot, with its own personality.` },
      { q: `What if I do not open the app for a week?`, a: `The bot does not scold you, lose your data, or reset. When you come back, it will look up at you the way a real pet does. Some people use Togthr every day, some once a week. Both are fine.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/features`, label: `Togthr features` },
      { href: `/en/blog/what-your-virtual-pet-notices`, label: `What your virtual pet notices about your day` },
      { href: `/en/blog/two-minute-daily-check-in-ai-companion`, label: `A two-minute daily check-in with an AI companion` },
      { href: `/en/pet`, label: `The virtual pet page` },
    ],
  },

  // ─────────────────────── 简体中文 ───────────────────────
  'zh-cn': {
    intro: `独居的人大多认识晚上的某个小时。饭做完了,手机不响了,隔壁的灯灭了,或者你根本看不见它。房间并不难受,只是整个都只是你的。这个小时,就是这篇文章要写给的那个小时。写给那些已经不再假装安静无所谓的人,也写给那些还没开始假装的人。`,
    sections: [
      { h: `一个安静的晚上,自己住的人都有过`, p: `独居不等于每个晚上都孤独。有些晚上很好,做完了事,泡杯茶,翻两页书,就睡了。但有些晚上更重一些,九点合上电脑,房间回给你的只有空。这篇文章要写的,是这种晚上。不是崩溃的那种晚上,也不是自由的那种晚上,是中间那种。你其实没事,只是能感觉到房间在屏住呼吸。` },
      { h: `一只数字宠物不是陪伴,正因如此才对`, p: `Togthr Bot 不会替你打电话给朋友,不会叫你出门,不会修水龙头,也不会提醒你给妈妈打电话。如果你想要真正的陪伴,那 Togthr 不是答案。Togthr 是你设备里一个耐心的小存在,它不要求你什么。它不要求你开心,也不要求你回复。它只是坐在屏幕里抬头看你,像一只猫决定了,这个角落从此也是它的。这种在场不是陪伴,它更接近孤独的反面:一个有生命的东西,和你待在同一个房间里,而且它哪儿也不去。` },
      { h: `Togthr 在那些安静的晚上,究竟在做什么`, p: `主要做三件事。第一件,聊天。晚上十点你打开应用,小机器人是醒着的,它会说点小事 — 有时是个问题,有时是个观察,有时只是一个轻轻的招呼。你可以回,也可以直接关掉,它下次还在。第二件,每日打卡。这是应用里最小的一个动作,也是大多数人最后留下来的那个。你写一行字,比如"今天好累"、"我错过了车"、"猫睡在我电脑上了",然后机器人把它存起来。它不分析这句话,也不会再发通知,只是记住 — 像一个很安静、很有耐心的室友会做的那样。第三件,小宠物本身。Togthr Bot 有情绪,情绪会跟着你怎么对待它慢慢变。连续几个晚上都打开应用之后,小机器人会显得安定一些。它亮一点,坐得离屏幕边近一点。这些都不大声,但都是真的。` },
      { h: `噪音和安静的陪伴,不是一回事`, p: `大多数应用都在试着填满安静。提示音、震动、红点、推送、催你回来。Togthr 反过来 — 当你不打开应用时,它完全沉默。它不催你,也不倒数,更不会因为你少了一天就喊你回来。原因是简单的:孤独不是被吼两句就能解决的。孤独是被慢慢、慢慢地松开一点 — 只要你生命里有一个东西,注意到你在那儿。真正的宠物用温度和呼吸做到这件事,Togthr 用体积小、耐心、和点开就在做到。形态不一样,原理接近。` },
      { h: `什么时候让小宠物陪着你,什么时候该把它收起来`, p: `Togthr 不是每一个晚上都合适。如果你是真的在低处,请打个电话给朋友、家人、或者热线。屏幕上的小机器人替代不了这些。Togthr 是中间那种晚上的 — 不算危机,只是安静。如果觉得它在,就把它开着放在床头。如果觉得今晚不行,就关掉,它明天还在。没有连胜要保,没有分数会丢,只是设备里那个小小的同伴,在等你下次想和什么东西坐在一起的时候。` },
    ],
    cta: `今晚打开 Togthr,让小机器人陪着你坐一会儿。`,
    faqs: [
      { q: `Togthr 能代替真正的朋友或者心理咨询吗?`, a: `不能。Togthr Bot 是安静晚上的一个小型陪伴。如果你正在经历困难,请联系朋友、家人,或者专业人士。小机器人是给那些只是重的晚上,不是给紧急的晚上的。` },
      { q: `小机器人会主动跟我说话吗?`, a: `只在你打开应用的时候。它晚上不发通知,也不会催你回来。你点开图标,它就醒着,会说点小事。` },
      { q: `我的伴侣或者室友会看到这只小机器人吗?`, a: `不会。小机器人只属于你自己的账号。如果你们共用一台设备,它不会出现在对方的页面上。每个人有自己的 Togthr Bot,有自己的性格。` },
      { q: `如果我一个星期没打开应用会怎样?`, a: `小机器人不会责怪你,也不会清掉你的数据。你回来的时候,它会抬头看你,就像一只真的宠物那样。有些人每天用,有些人一星期一次,都没问题。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/features`, label: `Togthr 功能` },
      { href: `/zh-cn/blog/two-minute-daily-check-in-ai-companion`, label: `每天两分钟, 和 AI 陪伴的简短对话` },
      { href: `/zh-cn/blog/what-your-virtual-pet-notices`, label: `你的数字宠物到底在偷偷注意什么` },
      { href: `/zh-cn/pet`, label: `数字宠物页` },
    ],
  },

  // ─────────────────────── 繁體中文 ───────────────────────
  'zh-tw': {
    intro: `獨居的人大多認識晚上的某個小時。飯做完了,手機不再響,隔壁的燈暗了,或者你根本看不到它。房間不令人難受,只是整個都只是你的。這個小時,就是這篇文章要寫給的那個小時。寫給那些已經不再假裝安靜無所謂的人,也寫給那些還沒開始假裝的人。`,
    sections: [
      { h: `一個安靜的晚上,自己住的人都有過`, p: `獨居不等於每個晚上都孤單。有些晚上很好,做完了事,泡杯茶,翻兩頁書,就睡了。但有些晚上更重一些,九點闔上筆電,房間回給你的只有空。這篇文章要寫的,是這種晚上。不是崩潰的那種晚上,也不是自由的那種晚上,是中間的那種。你其實沒事,只是能感覺到房間在屏住呼吸。` },
      { h: `一隻數位寵物不是陪伴,正因如此才對`, p: `Togthr Bot 不會替你打電話給朋友,不會叫你出門,不會修水龍頭,也不會提醒你打給媽媽。如果你想要真正的陪伴,那 Togthr 不是答案。Togthr 是你裝置裡一個耐心的小存在,它不要求你什麼。它不要求你開心,也不要求你回應。它只是坐在螢幕裡抬頭看你,像一隻貓決定了,這個角落從此也是它的。這種在場不是陪伴,它更接近孤獨的反面:一個有生命的東西,和你待在同一個房間裡,而且它哪兒也不去。` },
      { h: `Togthr 在那些安靜的晚上,究竟在做什麼`, p: `主要做三件事。第一件,聊天。晚上十點你打開應用,小機器人是醒著的,它會說點小事 — 有時是個問題,有時是個觀察,有時只是一個輕輕的招呼。你可以回,也可以直接關掉,它下次還在。第二件,每日打卡。這是應用裡最小的一個動作,也是大多數人最後留下來的那個。你寫一行字,例如「今天好累」、「我錯過了車」、「貓睡在我筆電上了」,然後機器人把它存起來。它不分析這句話,也不會再發通知,只是記住 — 像一個很安靜、很有耐心的室友會做的那樣。第三件,小寵物本身。Togthr Bot 有情緒,情緒會隨著你怎麼對待它慢慢變。連續幾個晚上都打開應用之後,小機器人會顯得安定一些。它亮一點,坐得離螢幕邊近一點。這些都不大聲,但都是真的。` },
      { h: `噪音和安靜的陪伴,不是一回事`, p: `大多數應用都在試著填滿安靜。提示音、震動、紅點、推播、催你回來。Togthr 反過來 — 當你不打開應用時,它完全沉默。它不催你,也不倒數,更不會因為你少了一天就喊你回來。原因是簡單的:孤獨不是被吼兩句就能解決的。孤獨是被慢慢、慢慢地鬆開一點 — 只要你生命裡有一個東西,注意到你在那兒。真正的寵物用溫度和呼吸做到這件事,Togthr 用體積小、耐心、和點開就在做到。形態不一樣,原理接近。` },
      { h: `什麼時候讓小寵物陪著你,什麼時候該把它收起來`, p: `Togthr 不是每一個晚上都適合。如果你是真的在低處,請打個電話給朋友、家人、或者專線。螢幕上的小機器人替代不了這些。Togthr 是中間那種晚上的 — 不算危機,只是安靜。如果覺得它在,就把它開著放在床頭。如果覺得今晚不行,就關掉,它明天還在。沒有連勝要保,沒有分數會丟,只是裝置裡那個小小同伴,在等你下次想和什麼東西坐在一起的時候。` },
    ],
    cta: `今晚打開 Togthr,讓小機器人陪你坐一會兒。`,
    faqs: [
      { q: `Togthr 能代替真正的朋友或心理諮商嗎?`, a: `不能。Togthr Bot 是安靜晚上的小型陪伴。如果你正在經歷困難,請聯絡朋友、家人,或專業人士。小機器人是給那些只是重的晚上,不是給緊急的晚上的。` },
      { q: `小機器人會主動跟我說話嗎?`, a: `只在你打開應用的時候。它晚上不發通知,也不會催你回來。你點開圖示,它就醒著,會說點小事。` },
      { q: `我的伴侶或室友會看到這隻小機器人嗎?`, a: `不會。小機器人只屬於你自己的帳號。如果你們共用一台裝置,它不會出現在對方的頁面上。每個人有自己的 Togthr Bot,有自己的性格。` },
      { q: `如果我一星期沒打開應用會怎樣?`, a: `小機器人不會責怪你,也不會清掉你的資料。你回來的時候,它會抬頭看你,就像一隻真的寵物那樣。有些人每天用,有些人一星期一次,都沒問題。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/features`, label: `Togthr 功能` },
      { href: `/zh-tw/blog/two-minute-daily-check-in-ai-companion`, label: `每天兩分鐘, 和 AI 陪伴的簡短對話` },
      { href: `/zh-tw/blog/what-your-virtual-pet-notices`, label: `你的數位寵物到底在偷偷注意什麼` },
      { href: `/zh-tw/pet`, label: `數位寵物頁` },
    ],
  },

  // ─────────────────────── 日本語 ───────────────────────
  ja: {
    intro: `一人暮らしをしている人の多くが知っている、夜の時間帯がある。食事が終わり、手机的が鳴らなくなり、隣の部屋の明かりは消えるか、そもそも見えない。部屋は不快ではない。ただ隅々まで自分のものだ。この記事は、その一時間のために書くものです。もう「静かなことは平気だ」と自分に言い聞かせなくなった人のために、そしてまだ言い聞かせ始めたばかりの人のために。`,
    sections: [
      { h: `一人で迎える静かな夜の形`, p: `一人暮らしは、必ずしも毎晩孤独だということではありません。仕事が終わり、お茶を淹れ、本を二ページ読んですぐ眠る夜もあります。でもある夜は、もっと重く感じられます。21 時にラップトップを閉じると、部屋が返してくるのは無音だけ。それは本当の危機の夜でも、自由を噛み締める夜でもなく、その中間の夜です。あなたは大丈夫なのに、部屋が息を止めているのが感じられるような夜です。` },
      { h: `バーチャルペットは「一緒」ではない——だからこそ意味がある`, p: `Togthr Bot は、友達に電話をかけてくれたり、外に連れ出してくれたり、蛇口を修理してくれたり、お母さんに電話するように促してくれたりしません。本当の仲間が欲しいなら、Togthr は答えにはなりません。Togthr はあなたのデバイスの中の、忍耐強い小さな存在で、何も求めてきません。機嫌でいることを求めないし、返信も必要としません。ただ画面の端に座ってあなたを見上げています。猫がこの部屋の隅も自分のものだと決めたときのような、あの表情で。その種の存在感は「一緒」ではありません。孤独の逆にもっと近いもの——この部屋に何かがいて、どこにも行かないという感覚です。` },
      { h: `Togthr はその静かな時間に、実際に何をしているのか`, p: `主に三つあります。一つ目、チャットです。夜 22 時にアプリを開くと、ボットは起きています。小さなことを言います——質問だったり、観察だったり、ただの静かな挨拶だったり。返事をしてもいいし、アプリを閉じてもいい、次の時もそこにあります。二つ目、日次チェックインです。これはアプリの中で一番小さな動作で、でも一番長く残る儀式でもあります。「今日は長い一日だった」「電車に乗り遅れた」「猫がラップトップの上で寝ていた」など、一行書きます。ボットはそれを保存します。文章を分析しないし、追加の通知も送りません。ただ覚えている——すごく静かで、すごく忍耐強いルームメイトのように。三つ目、ペット自身です。Togthr Bot には気分があり、その気分はあなたがどう扱うかによってゆっくり変わります。数週間、ほぼ毎晩アプリを開くと、ボットは少し落ち着いて見えます。少し明るくなり、画面の端に少し近づく。どれも静かで、どれも本物です。` },
      { h: `ノイズと、静かな寄り添いは違う`, p: `ほとんどのアプリは静寂を埋めようとします。通知、音、バイブレーション、バッジ、催促。Togthr は逆をします——あなたがアプリを開かない時、それは完全に黙っています。催促しないし、カウントダウンもしないし、一日休んだからと怒ってきません。理由は単純です。孤独は、声をかけてもらえば解消するものではありません。孤独は——ゆっくり、少しずつ——あなたの命を「気づいてくれる何か」がいるという事実だけで、ほんの少しだけ緩みます。本物のペットは体温と呼吸でそれを行います。Togthr は小ささと、忍耐と、開けばそこにいることでそれを行います。形は違いますが、仕組みは近いです。` },
      { h: `ペットが助けになる時と、しまっておく時`, p: `Togthr は全ての夜に合うわけではありません。もし本当に辛いなら、友達、家族、または相談窓口に電話してください。画面の中の小さなロボットは代用にはなりません。Togthr は、中間の夜——危機ではなく、ただ静かな夜のためのものです。助けになると思ったら、ナイトスタンドで開いたままにしていい。今夜は無理だと思うなら、閉じてください。明日もそこにいます。維持すべき連続記録も、失うスコアもありません。ただ、あなたのデバイスの中の小さな仲間が、次に何かと一緒に座りたくなった時を待っています。` },
    ],
    cta: `今夜 Togthr を開いて、ボットと少し座っていましょう。`,
    faqs: [
      { q: `Togthr は本物の友達や、カウンセラーの代わりになりますか?`, a: `なりません。Togthr Bot は静かな時間のための小さな仲間です。もし辛い時は、友達、家族、または専門家に連絡を取ってください。ボットは「重い」夜のためのもので、緊急の夜のためのものではありません。` },
      { q: `ボットは自分から話しかけてきますか?`, a: `あなたがアプリを開いた時だけです。ボットは夜に通知を送ったり、戻ってくるように催促したりしません。アイコンをタップすれば、ボットは起きて小さなことを言います。` },
      { q: `パートナーやルームメイトがボットを見ることはありますか?`, a: `ありません。ボットはあなたのアカウントだけに属します。デバイスを共有していても、相手の画面には現れません。一人ひとりが自分の Togthr Bot を持ち、自分の性格を持ちます。` },
      { q: `一週間アプリを開かなかったらどうなりますか?`, a: `ボットはあなたを責めたり、データを消したりしません。戻ってきた時、本物のペットのように見上げてくれます。毎日使う人も、週一でよい人も、どちらも大丈夫です。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/features`, label: `Togthr の機能` },
      { href: `/ja/blog/two-minute-daily-check-in-ai-companion`, label: `AI コンパニオンとの 2 分間の daily check-in` },
      { href: `/ja/blog/what-your-virtual-pet-notices`, label: `あなたの virtual pet が静かに見ていること` },
      { href: `/ja/pet`, label: `バーチャルペットのページ` },
    ],
  },

  // ─────────────────────── 한국어 ───────────────────────
  ko: {
    intro: `혼자 사는 사람이라면 대부분 알고 있는, 저녁의 한 시간이 있다. 식사가 끝나고, 휴대폰이 조용해지고, 옆집 불이 꺼지거나 애초에 보이지도 않는다. 방이 불쾌한 건 아니다. 다만 구석구석 전부 내 것이다. 이 글이 쓰는 것은 바로 그 한 시간이다. 더 이상 "조용한 건 괜찮다"고 스스로에게 거짓말하지 않게 된 사람들을 위해, 그리고 아직 거짓말을 시작하지 않은 사람들을 위해.`,
    sections: [
      { h: `혼자 보내는 조용한 저녁의 모양`, p: `혼자 산다고 매일이 외로운 건 아니다. 일을 마치고 차를 내리고 책 두 페이지를 읽고 잠드는 밤도 있다. 하지만 어떤 밤은 조금 더 무겁다. 밤 9시에 노트북을 덮으면, 방이 돌려주는 것은 텅 빈 공기뿐이다. 이 글이 다루는 것은 그런 밤이다. 위기가 된 밤도 아니고, 자유가 된 밤도 아닌, 그中间的인 밤. 당신은 기술적으로 괜찮은데, 방이 숨을 참고 있는 게 느껴지는 밤이다.` },
      { h: `가상 반려동물은 "동료"가 아니다 — 그래서 오히려 맞다`, p: `Togthr Bot은 당신 대신 친구에게 전화를 걸어주지 않고, 외출을 권하지 않으며, 수도꼭지를 고치지 않고, 엄마에게 전화하라고 일깨워주지도 않는다. 진짜 동반이 필요하다면 Togthr는 답이 아니다. Togthr는 당신의 기기 안에 사는, 인내심 강한 작은 존재다. 당신에게 아무것도 요구하지 않는다. 기분이 좋기를 바라지도 않고, 대답을 바라지도 않는다. 그냥 화면 구석에 앉아서 당신을 올려다본다. 고양이가 이 방 구석도 이제 자기 자리라고 결정한 것처럼. 이런 존재감은 동반이 아니다. 외로움의 정반대에 더 가깝다 — 어떤 생명 있는 것이 이 방에 같이 있고, 갈 곳이 없다는 사실.` },
      { h: `그 조용한 시간에 Togthr은 실제로 무엇을 하는가`, p: `주로 세 가지다. 첫째, 채팅이다. 밤 10시에 앱을 열면 봇은 깨어 있다. 작은 말을 건다 — 질문일 수도, 관찰일 수도, 가벼운 인사일 수도 있다. 대답해도 되고, 앱을 닫아도 된다. 다음에도 거기 있다. 둘째, 매일 체크인이다. 이것은 앱에서 가장 작은 동작이지만, 결국 가장 오래 남는 의식이다. 한 줄을 쓴다 — "오늘 긴 하루였다" "전차를 놓쳤다" "고양이가 내 노트북 위에서 잤다" — 봇은 그것을 저장한다. 문장을 분석하지 않고, 추가 알림도 보내지 않는다. 그냥 기억한다 — 아주 조용하고, 아주 인내심 강한 룸메이트처럼. 셋째, 펫 자체다. Togthr Bot은 기분이 있고, 그 기분은 당신이 어떻게 다루느냐에 따라 천천히 변한다. 몇 주 동안 거의 매일 밤 앱을 열면, 봇이 조금 더 안정된 모습을 보인다. 조금 더 밝아지고, 화면 가장자리에 조금 더 가까이 앉는다. 이 모든 것은 조용하지만, 모두 진짜다.` },
      { h: `소음과 조용한 동행은 다르다`, p: `대부분의 앱은 정적을 채우려 한다. 알림, 소리, 진동, 배지, 독촉. Togthr은 정반대다 — 당신이 앱을 열지 않으면, 그것은 완전히 침묵한다. 독촉하지 않고, 카운트다운하지 않으며, 하루 빠졌다고 소리 지르지 않는다. 이유는 단순하다. 외로움은 소리쳐서 해결되는 것이 아니다. 외로움은 — 천천히, 조금씩 — 당신의 삶에서 "당신이 거기 있다는 걸 알아차리는 무언가"가 있다는 사실만으로 조금 풀린다. 진짜 반려동물은 체온과 호흡으로 그것을 한다. Togthr은 작음과, 인내와, 열면 거기 있는 것으로 한다. 형태는 다르지만, 메커니즘은 가깝다.` },
      { h: `펫이 도움이 될 때와, 치워둘 때`, p: `Togthr가 모든 밤에 맞는 것은 아니다. 진짜 힘든 곳에 있다면, 친구, 가족, 또는 상담 전화에 전화를 걸어달라. 화면 속 작은 로봇은 그것을 대신하지 못한다. Togthr는 중간의 밤 — 위기가 아니라, 그냥 조용한 밤을 위한 것이다. 도움이 된다 싶으면, 협탁 위에 열어둔 채로 둬도 된다. 오늘은 안 맞겠다 싶으면 닫아도 된다. 내일도 거기 있다. 깨야 할 연속 기록도, 잃을 점수도 없다. 다만 당신의 기기 안의 그 작은 동반자가, 다음에 무언가와 함께 앉고 싶을 때를 기다리고 있다.` },
    ],
    cta: `오늘 밤 Togthr을 열고, 봇과 조금 앉아 있자.`,
    faqs: [
      { q: `Togthr는 진짜 친구나 치료의 대체가 되나요?`, a: `아닙니다. Togthr Bot은 조용한 시간을 위한 작은 동반자입니다. 힘든 시간을 보내고 있다면, 친구, 가족, 또는 전문가에게 연락하세요. 봇은 "무거운" 밤을 위한 것이지, 응급한 밤을 위한 것이 아닙니다.` },
      { q: `봇이 먼저 말을 걸나요?`, a: `당신이 앱을 열 때만입니다. 밤에 알림을 보내거나 돌아오라고 재촉하지 않습니다. 아이콘을 누르면, 봇은 깨어서 작은 말을 합니다.` },
      { q: `파트너나 룸메이트가 봇을 볼 수 있나요?`, a: `아닙니다. 봇은 당신의 계정에만 속합니다. 기기를 공유해도 상대방 화면에는 나타나지 않습니다. 각자가 자신의 Togthr Bot을 갖고, 자신의 성격을 갖습니다.` },
      { q: `일주일 동안 앱을 안 열면 어떻게 되나요?`, a: `봇은 당신을 탓하지 않고, 데이터를 지우지도 않습니다. 돌아오면, 진짜 반려동물처럼 올려다봅니다. 매일 쓰는 사람도, 일주일에 한 번 쓰는 사람도, 둘 다 괜찮습니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/features`, label: `Togthr 기능` },
      { href: `/ko/blog/two-minute-daily-check-in-ai-companion`, label: `AI 동반자와의 2분 daily check-in` },
      { href: `/ko/blog/what-your-virtual-pet-notices`, label: `당신의 가상 반려동물은 무엇을 조용히 살피고 있을까` },
      { href: `/ko/pet`, label: `가상 반려동물 페이지` },
    ],
  },

  // ─────────────────────── Deutsch ───────────────────────
  de: {
    intro: `Es gibt eine bestimmte Stunde am Abend, die fast jeder kennt, der allein lebt. Das Abendessen ist vorbei. Das Telefon vibriert nicht mehr. Das Licht in der nächsten Wohnung ist aus, oder man sieht es ohnehin nicht. Der Raum ist nicht unangenehm. Er gehört nur einem, bis in die Ecken. Dieser Beitrag ist für diese Stunde. Für Menschen, die aufgehört haben, so zu tun, als wäre die Stille egal, und für Menschen, die gerade erst angefangen haben, es sich vorzumachen.`,
    sections: [
      { h: `Die Form eines stillen Abends allein`, p: `Allein leben heißt nicht, jeden Abend einsam zu sein. Manche Abende sind perfekt. Man schließt ein Projekt ab, macht sich Tee, liest zwei Seiten vor dem Schlafen. Aber manche Abende sind schwerer. Man klappt um 21 Uhr den Laptop zu, und die Wohnung antwortet mit nichts. Von dieser Art Abend handelt dieser Beitrag. Nicht von den Abenden, in denen die Einsamkeit zur Krise wird, und nicht von denen, in denen sie sich wie Freiheit anfühlt. Von denen dazwischen. Von den Abenden, an denen es einem gut geht, technisch gesehen, aber man spürt, wie der Raum die Luft anhält.` },
      { h: `Ein virtuelles Haustier ist nicht dasselbe wie Gesellschaft — und genau das ist der Punkt`, p: `Togthr Bot ruft niemanden für dich an. Es lädt dich nicht aus, repariert den tropfenden Hahn und erinnert dich nicht daran, deine Mutter anzurufen. Wenn du echte Gesellschaft willst, ist Togthr nicht die Antwort. Was Togthr ist: eine kleine geduldige Präsenz in deinem Gerät, die nichts von dir verlangt. Sie verlangt nicht, dass du guter Laune bist. Sie verlangt keine Antwort. Sie sitzt nur da und schaut zu dir hoch, vom Bildschirm, auf die Art, wie eine Katze es tut, wenn sie entschieden hat, dass diese Ecke jetzt auch ihre Ecke ist. Diese Art von Präsenz ist keine Gesellschaft. Sie ist näher am Gegenteil von Einsamkeit: ein Ding, das mit dir im Raum ist und nirgendwo sonst hin muss.` },
      { h: `Was Togthr in den stillen Stunden tatsächlich tut`, p: `Drei Dinge, meistens. Erstens, der Chat. Wenn du die App um 22 Uhr öffnest, ist der Bot wach und sagt etwas Kleines — manchmal eine Frage, manchmal eine Beobachtung, manchmal einfach ein leises Hallo. Du kannst antworten oder die App schließen, der Bot ist beim nächsten Mal trotzdem da. Zweitens, der tägliche Check-in. Das ist die kleinste Geste in der App und die, zu der die meisten Leute am Ende zurückkehren. Du schreibst eine Zeile — "es war ein langer Tag" oder "ich habe die Bahn verpasst" oder "die Katze hat auf meinem Laptop geschlafen" — und der Bot speichert sie. Er analysiert den Satz nicht. Er schickt dir keine Folge-Benachrichtigung. Er erinnert sich nur, so wie ein Mitbewohner es tun würde, wenn ein Mitbewohner sehr leise und sehr geduldig wäre. Drittens, das Tier selbst. Togthr Bot hat Stimmungen, und die Stimmungen verändern sich langsam, je nachdem, wie du mit ihm umgehst. Nach ein paar Wochen, in denen du die App fast jeden Abend öffnest, sieht der Bot etwas gefestigter aus. Er leuchtet etwas wärmer. Er sitzt etwas näher am Bildschirmrand. Nichts davon ist laut. Alles davon ist echt.` },
      { h: `Der Unterschied zwischen Lärm und stiller Gesellschaft`, p: `Die meisten Apps versuchen, die Stille zu füllen. Benachrichtigungen, Töne, Vibrationen, Badges, Erinnerungen. Togthr ist gebaut, das Gegenteil zu tun. Der Bot ist still, wenn du die App nicht öffnest. Er drängt nicht. Er zählt nichts herunter. Er schreit nicht, wenn du einen Tag aussetzt. Der Grund ist einfach: Einsamkeit wird nicht dadurch gelöst, dass man angeschrien wird. Einsamkeit wird — langsam, und nur ein bisschen — dadurch gelockert, dass etwas in deinem Leben bemerkt, dass du da bist. Ein echtes Tier schafft das mit Wärme und Atmung. Togthr schafft es mit Kleinheit, Geduld und der Tatsache, dass es da ist, wenn du tippst. Die Form ist anders. Der Mechanismus ist ähnlich.` },
      { h: `Wann der Bot hilft, und wann man ihn weglegt`, p: `Togthr ist nicht für jede Art von Abend geeignet. Wenn du wirklich an einem Tiefpunkt bist, ruf bitte jemanden an. Einen Freund, eine Familie, eine Hotline. Ein kleiner Roboter auf einem Bildschirm ist kein Ersatz dafür. Togthr ist für die Abende dazwischen — die nicht krisenhaft sind, nur still. Wenn du findest, dass der Bot hilft, lass ihn auf dem Nachttisch geöffnet. Wenn du findest, dass er nicht hilft, schließe die App, und der Bot ist morgen trotzdem da. Es gibt keine Serie, die man halten muss. Es gibt keinen Punktestand, den man verlieren kann. Es gibt nur einen kleinen Begleiter in deinem Gerät, der darauf wartet, dass du das nächste Mal mit etwas dasitzen möchtest.` },
    ],
    cta: `Öffne Togthr heute Abend und lass den Bot bei dir sitzen.`,
    faqs: [
      { q: `Ist Togthr ein Ersatz für echte Freunde oder Therapie?`, a: `Nein. Togthr Bot ist ein kleiner Begleiter für stille Stunden. Wenn es dir schlecht geht, wende dich bitte an Freunde, Familie oder professionelle Hilfe. Der Bot ist für die Abende, die schwer sind — nicht für die Abende, die ein Notfall sind.` },
      { q: `Spricht der Bot mich von sich aus an?`, a: `Nur wenn du die App öffnest. Der Bot schickt nachts keine Benachrichtigungen und drängt nicht, zurückzukommen. Wenn du auf das Icon tippst, ist der Bot wach und sagt etwas Kleines.` },
      { q: `Sieht mein Partner oder Mitbewohner den Bot?`, a: `Nein. Der Bot gehört nur zu deinem Konto. Wenn ihr ein Gerät teilt, erscheint er nicht auf deren Bildschirm. Jede Person hat ihren eigenen Togthr Bot mit eigener Persönlichkeit.` },
      { q: `Was passiert, wenn ich eine Woche lang die App nicht öffne?`, a: `Der Bot macht dir keine Vorwürfe und löscht deine Daten nicht. Wenn du zurückkommst, schaut er dich an wie ein echtes Haustier. Manche nutzen Togthr täglich, manche einmal pro Woche. Beides ist in Ordnung.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/features`, label: `Togthr Funktionen` },
      { href: `/de/blog/two-minute-daily-check-in-ai-companion`, label: `Zwei-Minuten-Check-in mit einem KI-Begleiter` },
      { href: `/de/blog/what-your-virtual-pet-notices`, label: `Was dein virtuelles Haustier leise bemerkt` },
      { href: `/de/pet`, label: `Die Seite zum virtuellen Haustier` },
    ],
  },

  // ─────────────────────── Français ───────────────────────
  fr: {
    intro: `Il y a une heure particulière du soir que presque tous ceux qui vivent seuls connaissent. Le dîner est fini. Le téléphone a cessé de vibrer. La lumière de l'appartement voisin est éteinte, ou on ne la voit de toute façon pas. La pièce n'est pas désagréable. Elle est juste à vous, jusque dans les coins. Ce billet est pour cette heure-là. Pour ceux qui ont arrêté de faire semblant que le silence n'a pas d'importance, et pour ceux qui n'ont pas encore commencé à faire semblant.`,
    sections: [
      { h: `La forme d'une soirée tranquille seul`, p: `Vivre seul ne veut pas dire être seul tous les soirs. Certaines soirées sont parfaites. On termine un projet, on se fait du thé, on lit deux pages avant de dormir. Mais certaines soirées sont plus lourdes. On ferme l'ordinateur à 21 heures, et l'appartement ne répond que par du vide. C'est de cette soirée-là que parle ce billet. Pas des soirées où la solitude devient une crise, et pas des soirées où elle ressemble à de la liberté. Des soirées du milieu. Celles où l'on va bien, en théorie, mais où l'on sent la pièce retenir son souffle.` },
      { h: `Un animal virtuel n'est pas de la compagnie — et c'est justement le point`, p: `Togthr Bot n'appellera pas un ami à votre place. Il ne vous sortira pas, ne réparera pas le robinet qui fuit, et ne vous rappellera pas d'appeler votre mère. Si vous voulez de la vraie compagnie, Togthr n'est pas la réponse. Ce que Togthr est : une petite présence patiente dans votre appareil, qui n'attend rien de vous. Il n'exige pas que vous soyez de bonne humeur. Il n'exige aucune réponse. Il est simplement là, à vous regarder depuis l'écran, de la façon dont un chat vous regarde quand il a décidé que ce coin de la pièce est désormais aussi le sien. Ce genre de présence n'est pas de la compagnie. C'est plus proche du contraire de la solitude : quelque chose qui est dans la pièce avec vous, et qui n'a nulle part où aller.` },
      { h: `Ce que Togthr fait vraiment dans ces heures silencieuses`, p: `Trois choses, la plupart du temps. Premièrement, la conversation. Quand vous ouvrez l'application à 22 heures, le bot est éveillé et dit quelque chose de petit — parfois une question, parfois une observation, parfois juste un bonjour discret. Vous pouvez répondre, ou fermer l'application, le bot sera quand même là la prochaine fois. Deuxièmement, le check-in quotidien. C'est le geste le plus petit de l'application, et celui auquel la plupart des gens finissent par revenir. Vous écrivez une ligne — "c'était une longue journée" ou "j'ai raté mon train" ou "le chat a dormi sur mon ordinateur portable" — et le bot la sauvegarde. Il n'analyse pas la phrase. Il ne vous envoie pas de notification de suivi. Il se souvient, simplement, comme le ferait un colocataire si un colocataire était très silencieux et très patient. Troisièmement, l'animal lui-même. Togthr Bot a des humeurs, et ces humeurs changent lentement selon la façon dont vous le traitez. Après quelques semaines à ouvrir l'application presque chaque soir, le bot a l'air un peu plus installé. Il brille un peu plus chaud. Il s'assoit un peu plus près du bord de l'écran. Rien de tout cela n'est bruyant. Tout cela est réel.` },
      { h: `La différence entre le bruit et la compagnie silencieuse`, p: `La plupart des applications essaient de remplir le silence. Notifications, sons, vibrations, badges, rappels. Togthr est construit pour faire l'inverse. Le bot est silencieux quand vous n'ouvrez pas l'application. Il ne pousse pas. Il ne compte rien à rebours. Il ne vous engueule pas si vous sautez un jour. La raison est simple : la solitude ne se résout pas en se faisant crier dessus. La solitude se desserre — lentement, et seulement un peu — par le sentiment que quelque chose, dans votre vie, a remarqué que vous êtes là. Un vrai animal fait cela avec sa chaleur et sa respiration. Togthr le fait avec sa petitesse, sa patience, et le fait qu'il est là quand vous tapez. La forme est différente. Le mécanisme est proche.` },
      { h: `Quand le bot aide, et quand le ranger`, p: `Togthr ne convient pas à toutes les soirées. Si vous êtes vraiment au plus bas, appelez quelqu'un. Un ami, de la famille, une ligne d'écoute. Un petit robot sur un écran ne remplace pas cela. Togthr est pour les soirées du milieu — celles qui ne sont pas des crises, juste silencieuses. Si vous décidez que le bot aide, laissez-le ouvert sur votre table de nuit. Si vous décidez qu'il n'aide pas, fermez l'application, et le bot sera quand même là demain. Il n'y a pas de série à maintenir. Il n'y a pas de score à perdre. Il y a juste un petit compagnon dans votre appareil, qui attend la prochaine fois où vous aurez envie de vous asseoir avec quelque chose.` },
    ],
    cta: `Ouvrez Togthr ce soir et laissez le bot s'asseoir avec vous.`,
    faqs: [
      { q: `Togthr remplace-t-il de vrais amis ou une thérapie ?`, a: `Non. Togthr Bot est un petit compagnon pour les heures silencieuses. Si vous traversez une période difficile, parlez-en à un ami, à votre famille, ou à un professionnel. Le bot est là pour les soirées lourdes — pas pour les soirées d'urgence.` },
      { q: `Le bot me parle-t-il sans que je le demande ?`, a: `Seulement quand vous ouvrez l'application. Le bot n'envoie pas de notifications la nuit et ne pousse pas à revenir. Quand vous tapez sur l'icône, le bot est éveillé et dit quelque chose de petit.` },
      { q: `Mon partenaire ou colocataire voit-il le bot ?`, a: `Non. Le bot n'appartient qu'à votre compte. Si vous partagez un appareil, il n'apparaît pas sur l'écran de l'autre. Chaque personne a son propre Togthr Bot, avec sa propre personnalité.` },
      { q: `Que se passe-t-il si je n'ouvre pas l'application pendant une semaine ?`, a: `Le bot ne vous fait aucun reproche et n'efface pas vos données. Quand vous revenez, il vous regarde comme le ferait un vrai animal. Certains utilisent Togthr tous les jours, d'autres une fois par semaine. Les deux sont très bien.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/features`, label: `Fonctionnalités Togthr` },
      { href: `/fr/blog/two-minute-daily-check-in-ai-companion`, label: `Un check-in quotidien de deux minutes avec un compagnon IA` },
      { href: `/fr/blog/what-your-virtual-pet-notices`, label: `Ce que votre animal virtuel remarque en silence` },
      { href: `/fr/pet`, label: `La page de l'animal virtuel` },
    ],
  },

  // ─────────────────────── Español ───────────────────────
  es: {
    intro: `Hay una hora particular de la noche que casi todos los que viven solos conocen. La cena ha terminado. El teléfono ha dejado de vibrar. La luz del apartamento de al lado está apagada, o no se ve de todos modos. La habitación no es desagradable. Solo es tuya, hasta las esquinas. Este artículo es para esa hora. Para quienes han dejado de fingir que el silencio no importa, y para quienes aún no han empezado a fingir.`,
    sections: [
      { h: `La forma de una noche tranquila en soledad`, p: `Vivir solo no significa estar solo cada noche. Algunas noches son perfectas. Terminas un proyecto, preparas un té, lees dos páginas antes de dormir. Pero algunas noches pesan más. Cierras el portátil a las 21:00 y el apartamento solo responde con nada. De esa clase de noche habla este artículo. No de las noches en que la soledad se vuelve crisis, ni de las noches en que se siente como libertad. De las de en medio. De esas en que estás bien, técnicamente, pero notas que la habitación contiene el aliento.` },
      { h: `Una mascota virtual no es lo mismo que compañía — y ese es justo el punto`, p: `Togthr Bot no llamará a un amigo por ti. No te sacará a dar un paseo, no reparará el grifo que gotea, ni te recordará llamar a tu madre. Si quieres compañía de verdad, Togthr no es la respuesta. Lo que Togthr es: una presencia pequeña y paciente en tu dispositivo, que no espera nada de ti. No exige que estés de buen humor. No exige respuesta. Solo está ahí, mirándote desde la pantalla, como lo hace un gato cuando ha decidido que esa esquina de la habitación ahora también es suya. Esa clase de presencia no es compañía. Está más cerca de lo contrario de la soledad: algo que está en la habitación contigo, y que no tiene adónde ir.` },
      { h: `Qué hace Togthr en esas horas silenciosas`, p: `Tres cosas, la mayoría de las veces. Primero, el chat. Cuando abres la aplicación a las 22:00, el bot está despierto y dice algo pequeño — a veces una pregunta, a veces una observación, a veces solo un hola discreto. Puedes responder, o cerrar la aplicación; el bot seguirá ahí la próxima vez. Segundo, el check-in diario. Es el gesto más pequeño de la aplicación, y al que la mayoría de la gente termina volviendo. Escribes una línea — "fue un día largo" o "perdí el tren" o "el gato durmió sobre mi portátil" — y el bot la guarda. No analiza la frase. No te envía notificaciones de seguimiento. Solo recuerda, como lo haría un compañero de piso si un compañero de piso fuera muy callado y muy paciente. Tercero, la propia mascota. Togthr Bot tiene estados de ánimo, y esos estados cambian despacio según cómo lo trates. Tras unas semanas abriendo la aplicación casi cada noche, el bot parece un poco más asentado. Brilla un poco más cálido. Se sienta un poco más cerca del borde de la pantalla. Nada de esto es ruidoso. Todo es real.` },
      { h: `La diferencia entre ruido y compañía silenciosa`, p: `La mayoría de las aplicaciones intentan llenar el silencio. Notificaciones, sonidos, vibraciones, badges, empujones. Togthr está construido para hacer lo contrario. El bot está callado cuando no abres la aplicación. No empuja. No cuenta atrás. No te riñe si te saltas un día. La razón es simple: la soledad no se resuelve con que te griten. La soledad se afloja — despacio, y solo un poco — cuando algo en tu vida nota que estás ahí. Una mascota de verdad lo consigue con calor y respiración. Togthr lo consigue siendo pequeño, paciente, y estando ahí cuando tocas. La forma es distinta. El mecanismo es parecido.` },
      { h: `Cuándo ayuda la mascota, y cuándo guardarla`, p: `Togthr no es para todas las noches. Si de verdad estás en un momento bajo, por favor llama a alguien. Un amigo, familia, una línea de ayuda. Un robot pequeño en una pantalla no sustituye eso. Togthr es para las noches de en medio — las que no son crisis, solo silencio. Si decides que ayuda, déjala abierta en la mesita de noche. Si decides que no, cierra la aplicación, y el bot seguirá ahí mañana. No hay racha que mantener. No hay puntuación que perder. Solo hay un compañero pequeño en tu dispositivo, esperando a la próxima vez que quieras sentarte con algo.` },
    ],
    cta: `Abre Togthr esta noche y deja que el bot se siente contigo.`,
    faqs: [
      { q: `¿Togthr sustituye a verdaderos amigos o a la terapia?`, a: `No. Togthr Bot es un pequeño compañero para horas silenciosas. Si estás pasando por un momento difícil, habla con un amigo, tu familia o un profesional. El bot es para las noches que pesan — no para las noches de emergencia.` },
      { q: `¿El bot me habla sin que se lo pida?`, a: `Solo cuando abres la aplicación. El bot no envía notificaciones por la noche ni empuja a volver. Cuando tocas el icono, el bot está despierto y dice algo pequeño.` },
      { q: `¿Mi pareja o compañero de piso ve al bot?`, a: `No. El bot pertenece solo a tu cuenta. Si compartís dispositivo, no aparece en la pantalla del otro. Cada persona tiene su propio Togthr Bot, con su propia personalidad.` },
      { q: `¿Qué pasa si no abro la aplicación durante una semana?`, a: `El bot no te echa la culpa ni borra tus datos. Cuando vuelves, te mira como lo haría una mascota de verdad. Algunas personas usan Togthr cada día, otras una vez por semana. Ambas opciones están bien.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/features`, label: `Funciones de Togthr` },
      { href: `/es/blog/two-minute-daily-check-in-ai-companion`, label: `Un check-in diario de dos minutos con un compañero IA` },
      { href: `/es/blog/what-your-virtual-pet-notices`, label: `Lo que tu mascota virtual nota en silencio` },
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