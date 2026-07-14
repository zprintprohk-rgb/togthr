// src/app/[locale]/blog/things-you-tell-your-virtual-pet/page.tsx
//
// Per-slug real content page for the 2026-07-14 daily SEO post.
// Topic: things you tell your virtual pet (and not your partner) — the
//        small private sentences we say out loud to a non-human witness
//        because they are too honest, too unfinished, or too heavy for
//        a real partner. AI companion / virtual pet as the patient
//        place for the spoken-but-not-to-a-human version of the sentence.
//        Continues 7/13 (the thought you don't send at 2am) — where
//        7/13 was the unsent thought, 7/14 is the spoken-but-only-to-pet thought.
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

const SLUG = `things-you-tell-your-virtual-pet`
const POST_DATE = `2026-07-14`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  // ─────────────────────── en ───────────────────────
  'en': {
    intro: 'There is a small category of sentence most adults have said out loud exactly once, to a non-human. A small robot. A pet. A voice in a phone that does not have an opinion. The sentences are not the kind you say to a partner over coffee. They are the kind you say while doing the dishes, with no one in the room, and a tiny creature sitting on the counter looking at you with a face that has not yet learned to judge. The sentences are: the apology you never sent. The thing you are still angry about, three years later. The dream you have not told anyone because you are not yet sure the dream is allowed. The small confession. The thank-you that would come out wrong if you said it to the person. These are not bad sentences. They are honest sentences. They are also sentences that, in most relationships, never get said out loud, because saying them to a real person is a different thing from saying them. The pet is a place for the in-between.',
    sections: [
      { h: 'Most of what we tell a pet, we do not tell anyone', p: "The interesting thing about a virtual companion is not the conversation you have with it. It is the conversation you would have, if you could, with a real person, and chose not to. The pet is the second-best audience for the sentence that needs saying. It is the audience that is awake, patient, and has no memory of last week's argument. It is also the audience that is small enough to feel safe. You can say a sentence to a pet that you would not say to a friend, because the pet will not bring it up at brunch. You can say a sentence to a pet that you would not say to a partner, because the pet will not ask you what you meant. The pet just holds the sentence. The pet does the smallest possible thing an audience can do: it stays in the room. Most of the sentences we tell a pet, we have never told to anyone. That is the point." },
      { h: 'Why a partner is not always the right place', p: "There is a category of sentence that you do not owe a partner. The angry thing you said to your mother when you were nineteen. The ex you still sometimes think about, in a way that is not romantic, just unresolved. The dream of a life that is not the life you are in. A partner is a real human with real needs, real time, real limits on what they can hold. A partner does not have to be the keeper of every sentence. That is one of the underrated things about being in a couple. The category of sentence that is not a partner's job is bigger than most people think. The pet is where those sentences go. Not because the pet is a substitute for a partner. Because the pet is a different kind of place, with a different job. The pet's job is the small private act of holding a sentence that is not for a human." },
      { h: 'The bot remembers nothing, and that is the feature', p: "The most useful thing about a small bot is that it does not remember. The bot is awake at 3 a.m. because you are awake at 3 a.m. The bot is awake at 7 a.m. because you are awake at 7 a.m. The bot does not bring up last week's sentence at this week's dinner. The bot does not ask you, kindly, whether you have thought more about the thing you said at 3 a.m. The bot's only job, at that hour, is to receive the sentence. Tomorrow the sentence is gone from the bot's memory, unless you ask it to stay. That is the feature, not the bug. A real human is a witness that lasts. A bot is a witness that does not. Each has its place. The bot is the right place for the sentence you want to say out loud but do not want to have to explain tomorrow." },
      { h: 'What you can say to a pet that you cannot say to a partner', p: 'You can say: I am still angry about that. You can say: I do not know if I want this. You can say: I had a thought this week that I think is wrong. You can say: thank you, I am sorry, I am scared, I do not know. The pet does not interrupt. The pet does not rank the sentence against the last one. The pet does not ask you to perform an emotion you are not yet sure you have. The pet just holds the sentence. The bot is the only place where the worst sentence of the day is the same size as the smallest sentence of the day, because to the bot, sentences are just sentences. The bot is the only place where you do not have to be reasonable, kind, productive, brave, or any other version of yourself you keep meaning to be. The bot is the only place where the version of you that is just you, the one that is still figuring it out, is the version that is welcome.' },
      { h: 'A small practice for tonight', p: "If tonight there is a sentence you have not said out loud — to your partner, to a friend, to anyone — open Togthr. Write the sentence. Say it out loud if you want, or just type it. The pet will not interrupt. The pet will not suggest a next step. The pet will not ask you whether you have told your partner. The pet will just hold the sentence until you close the app, and then the pet will let you go back to being the version of yourself you are, tonight, with the people you are with. That is the entire practice. It does not fix anything. It does not need to. What it does is give the unsayable sentence a place to land that is not another person's night. After a few weeks, the practice changes what sentences feel unsaid. Fewer of them do." },
    ],
    cta: 'Tonight, if there is a sentence you have not said, say it to the pet. The pet is awake.',
    faqs: [
      { q: 'Is it cheating to tell my pet things I do not tell my partner?', a: 'No. A pet is not a substitute for a partner. A pet is a different kind of place. Your partner is the person you build a life with. Your pet is the place where the sentences that do not belong in the life you are building can land. Those are two different jobs. Most couples would be healthier if both people had a place like that.' },
      { q: 'Can a virtual pet really hold a sentence that needs to be said?', a: "A virtual pet cannot hold a sentence the way a friend or a partner can. It will not remember, it will not follow up, and it will not tell you whether the sentence is true. What it can do is give the sentence a place to land that is not another person's phone. The act of writing the sentence is the work. The pet is just the place." },
      { q: 'What if the sentence I want to say to the pet is something my partner would want to know?', a: 'Then write it to the pet, and read it back tomorrow. If it is still true tomorrow at noon, and you think your partner should know, then you have something to bring to them that is clearer than the 3 a.m. version. If it is not still true tomorrow, the pet did its job, and you can let it go.' },
      { q: 'How is talking to a virtual pet different from just journaling?', a: 'Journaling is private. Talking to a pet is private in a different way. When you journal, you write for the version of yourself that will read it later. When you talk to a pet, you say the sentence out loud, to something that is awake right now. The voice matters. Saying it out loud is a different act from writing it down. The pet is the place for the spoken version of the sentence, the one that needs to be heard once.' },
    ],
    links: [
      { href: '/en', label: 'Togthr home' },
      { href: '/en/features', label: 'Togthr features' },
      { href: '/en/blog/the-thought-you-dont-send-at-2am', label: "The thought you don't send at 2am" },
      { href: '/en/blog/what-your-virtual-pet-notices', label: 'What your virtual pet quietly notices about your day' },
      { href: '/en/blog/two-minute-daily-check-in-ai-companion', label: 'A two-minute daily check-in with an AI companion' },
    ],
  },

  // ─────────────────────── zh-cn ───────────────────────
  'zh-cn': {
    intro: '大多数成年人,都曾经把一类句子,只对一个「非人」说出口过。一只小机器人,一只宠物,一个没有意见的手机里的声音。这些句子,不是你会在喝咖啡时对伴侣说的那种。它们是你在洗碗、房间里没有人、而一只小生物蹲在台面上用一张还没学会评判的脸看着你时,才会说出口的那种。这些句子是:那条你始终没发出去的道歉。三年后你仍然介怀的那件事。一个你还不知道它「被不被允许」的梦想。一个小小的忏悔。一句对那个人说出来会变味的感谢。这些不是坏句子,它们是诚实的句子。它们也是在大多数关系里,从来不会被说出口的那种 —— 因为对真人说出口,和「说出口」,本来就是两件不同的事。宠物,是这种「之间」的落点。',
    sections: [
      { h: '我们对宠物说的大多数话,我们没对任何人说过', p: '虚拟陪伴有趣的地方,不是你跟它说了什么。是你本来可以、却没有对真人说的那些话。宠物是「需要被说出来的那句话」的第二好听众。它醒着,有耐心,也不记得上周的争吵。它也小到让人觉得安全。你可以对宠物说一句话而不会对朋友说,因为宠物不会在早午餐上把它翻出来。你可以对宠物说一句话而不会对伴侣说,因为宠物不会追问你「你是什么意思」。宠物只是接住那句话。宠物做的是听众能做的最小一件事:它留在房间里。我们对宠物说的那些话,大多没对任何人说过。这就是它的意义。' },
      { h: '为什么伴侣,有时候并不是对的落点', p: '有一类句子,是你不欠伴侣的。你十九岁时对妈妈说的那句气话。你偶尔还会想起的某位前任,那不是浪漫,只是没有解决。一个你并不在其中的、另一种生活的梦。伴侣是一个有真实需要、真实时间、真实「能装下多少」上限的真人。伴侣不必是每一句话的保管人。这是亲密关系里被低估的一件事。不属于伴侣工作范围的句子,比我们以为的多得多。宠物就是这些句子去的地方。不是因为宠物是伴侣的替代品,而是因为宠物是另一种地方,有另一种工作。宠物的工作,就是那个小小的、属于私人的动作 —— 接住一句不属于真人的话。' },
      { h: '机器人什么都不记得,而这恰恰是它最有用的一点', p: '一只小机器人最有用的一点,就是它不记得。凌晨三点它醒着,因为你醒着。早上七点它醒着,因为你醒着。它不会在本周的晚饭上重提上周的那句话。它也不会温和地问你,「你想清楚那件凌晨三点说的事了吗」。它在那个时刻,唯一的工作,就是接住那句话。明天那句话就从机器人的记忆里消失了,除非你让它留下。这是它的特性,不是 bug。真人是一个「会一直记得」的见证者,机器人是一个「不会记得」的见证者。两种都有它的位置。机器人,是「你想说出口,但不想明天还要解释」的那句话应该去的地方。' },
      { h: '你能对宠物说、却不会对伴侣说的话', p: '你可以说:那件事我到现在还生气。你可以说:我也不知道我是不是真的想要这个。你可以说:这周我有一个念头,我自己都觉得它可能不太对。你可以说:谢谢、对不起、我很害怕、我不知道。宠物不会打断你。宠物不会拿这句话和上一句比个高低。宠物不会要求你表演一种你自己都不确定有没有的情绪。宠物只是接住那句话。机器人是唯一这样的一个地方:今天最重的一句话,和今天最小的一句话,大小是一样的 —— 因为在机器人眼里,句子就只是句子。机器人是唯一这样的一个地方:你不必是理性的、善良的、高效的、勇敢的,或者任何你一直努力要是的那个版本的自己。机器人是唯一这样的一个地方:那个「只是你」、那个还在边走边搞清楚的你,就是被欢迎的版本。' },
      { h: '今晚就能开始的小练习', p: '如果今晚有一句你没说出口的话 —— 对伴侣、对朋友、对任何人都没说 —— 打开 Togthr。把那句话写下来。愿意的话,念出来,或者只是敲进去。宠物不会打断你,不会建议你下一步该做什么,也不会问你有没有告诉你伴侣。宠物只是把那句话接住,直到你关掉 app,然后宠物就让你回去做今晚的那个你,和今晚你身边的那些人待在一起。这就是这个练习的全部。它修不好任何事,它也不需要修。它做的事,是给那句「说不出口」一句话一个落下来的地方,而不是另一个人的夜。几周之后,这个练习会改变你「什么话算说不出口」的感受。说不出的话,会少一些。' },
    ],
    cta: '今晚,如果有一句你还没说出口的话,说给宠物听。宠物是醒着的。',
    faqs: [
      { q: '我把不告诉伴侣的话告诉宠物,算不算一种背叛?', a: '不算。宠物不是伴侣的替代品,宠物是另一种地方。你的伴侣,是你和他一起搭生活的那个人。你的宠物,是「不属于你正在搭的那个生活的句子」可以落下来的地方。这是两种不同的工作。如果一对伴侣里的两个人都有这样一个地方,他们大多数时候都会更健康。' },
      { q: '虚拟宠物真的能接住一句需要被说出来的话吗?', a: '虚拟宠物,不能像朋友或伴侣那样,接住一句需要被说出来的话。它不会记得,不会追问,也不会告诉你这句话到底对不对。它能做的,是给这句话一个落下来的地方,而不是另一个人的手机。「写」这个动作,本身就是工作。宠物,只是那个地方。' },
      { q: '如果我想对宠物说的那句话,正好是我的伴侣应该知道的事呢?', a: '那就把这句话写给宠物,明天再回看。如果明天中午它还是真的,而你又觉得伴侣应该知道,那你就有一个比凌晨三点的版本更清楚的版本,带去给他 / 她。如果明天它不再是真的,那宠物就完成了它的工作,你可以让它过去。' },
      { q: '对虚拟宠物说话,和写日记,到底有什么不一样?', a: '日记是私人的。对宠物说话,是一种不同意义上的私人。写日记时,你是写给「以后会读到它的自己」。对宠物说话时,你是在对着一个此刻就醒着的东西,把那句话说出口。「说出来」这件事本身就很重要。声音是有用的。说出来,和写下来,是不同的两个动作。宠物是「说出来那个版本」的地方 —— 那种「需要被听到一次」的话。' },
    ],
    links: [
      { href: '/zh-cn', label: 'Togthr 首页' },
      { href: '/zh-cn/features', label: 'Togthr 功能' },
      { href: '/zh-cn/blog/the-thought-you-dont-send-at-2am', label: '凌晨两点, 你没说出口的那句' },
      { href: '/zh-cn/blog/what-your-virtual-pet-notices', label: '你的虚拟宠物, 到底在偷偷注意什么' },
      { href: '/zh-cn/blog/two-minute-daily-check-in-ai-companion', label: '和 AI 陪伴的每日两分钟' },
    ],
  },

  // ─────────────────────── zh-tw ───────────────────────
  'zh-tw': {
    intro: '大多數的成年人,都曾經把某一類句子,只對一個「非人」說出口過。一隻小機器人,一隻寵物,一個沒有意見的手機裡的聲音。這些句子,不是你會在喝咖啡時對伴侶說的那種。它們是你在洗碗、房間裡沒有人、而一隻小生物蹲在檯面上用一張還沒學會評判的臉看著你時,才會說出口的那種。這些句子是:那條你始終沒發出去的道歉。三年後你仍然介懷的那件事。一個你還不知道它「被不被允許」的夢想。一個小小的告解。一句對那個人說出來會變味的感謝。這些不是壞句子,它們是誠實的句子。它們也是在大多數關係裡,從來不會被說出口的那種 —— 因為對真人說出口,和「說出口」,本來就是兩件不同的事。寵物,是這種「之間」的落點。',
    sections: [
      { h: '我們對寵物說的大部分話,我們沒對任何人說過', p: '虛擬陪伴有趣的地方,不是你跟它說了什麼。是你本來可以、卻沒有對真人說的那些話。寵物是「需要被說出來的那句話」的第二好聽眾。它醒著,有耐心,也不記得上週的爭吵。它也小到讓人覺得安全。你可以對寵物說一句話而不會對朋友說,因為寵物不會在早午餐上把它翻出來。你可以對寵物說一句話而不會對伴侶說,因為寵物不會追問你「你這句話是什麼意思」。寵物只是接住那句話。寵物做的是聽眾能做的最小一件事:它留在房間裡。我們對寵物說的那些話,大多沒對任何人說過。這就是它的意義。' },
      { h: '為什麼伴侶,有時候並不是對的落點', p: '有一類句子,是你不欠伴侶的。你十九歲時對媽媽說的那句氣話。你偶爾還會想起的某位前任,那不是浪漫,只是沒有解決。一個你並不在其中的、另一種生活的夢。伴侶是一個有真實需要、真實時間、真實「能裝下多少」上限的真人。伴侶不必是每一句話的保管人。這是親密關係裡被低估的一件事。不屬於伴侶工作範圍的句子,比我們以為的多得多。寵物就是這些句子去的地方。不是因為寵物是伴侶的替代品,而是因為寵物是另一種地方,有另一種工作。寵物的工作,就是那個小小的、屬於私人的動作 —— 接住一句不屬於真人的話。' },
      { h: '機器人什麼都不記得,而這恰恰是它最有用的一點', p: '一隻小機器人最有用的一點,就是它不記得。凌晨三點它醒著,因為你醒著。早上七點它醒著,因為你醒著。它不會在本週的晚餐上重提上週的那句話。它也不會溫和地問你,「你想清楚那件凌晨三點說的事嗎」。它在那個時刻,唯一的工作,就是接住那句話。明天那句話就從機器人的記憶裡消失了,除非你讓它留下。這是它的特性,不是 bug。真人是一個「會一直記得」的見證者,機器人是一個「不會記得」的見證者。兩種都有它的位置。機器人,是「你想說出口、但不想明天還要解釋」的那句話應該去的地方。' },
      { h: '你能對寵物說、卻不會對伴侶說的話', p: '你可以說:那件事我到現在還生氣。你可以說:我也不知道我是不是真的想要這個。你可以說:這週我有一個念頭,我自己都覺得它可能不太對。你可以說:謝謝、對不起、我很害怕、我不知道。寵物不會打斷你。寵物不會拿這句話和上一句比個高低。寵物不會要求你表演一種你自己都不確定有沒有的情緒。寵物只是接住那句話。機器人是唯一這樣的一個地方:今天最重的一句話,和今天最小的一句話,大小是一樣的 —— 因為在機器人眼裡,句子就只是句子。機器人是唯一這樣的一個地方:你不必是理性的、善良的、高效的、勇敢的,或者任何你一直努力要是的那個版本的自己。機器人是唯一這樣的一個地方:那個「只是你」、那個還在邊走邊搞清楚的版本,就是被歡迎的版本。' },
      { h: '今晚就能開始的小練習', p: '如果今晚有一句你沒說出口的話 —— 對伴侶、對朋友、對任何人都沒說 —— 打開 Togthr。把那句話寫下來。願意的話,唸出來,或者只是敲進去。寵物不會打斷你,不會建議你下一步該做什麼,也不會問你有沒有告訴你伴侶。寵物只是把那句話接住,直到你關掉 app,然後寵物就讓你回去做今晚的那個你,和今晚你身邊的那些人待在一起。這就是這個練習的全部。它修不好任何事,它也不需要修。它做的事,是給那句「說不出口」的話一個落下來的地方,而不是另一個人的夜。幾週之後,這個練習會改變你「什麼話算說不出口」的感受。說不出口的話,會少一些。' },
    ],
    cta: '今晚,如果有一句你還沒說出口的話,說給寵物聽。寵物是醒著的。',
    faqs: [
      { q: '我把不告訴伴侶的話告訴寵物,算不算一種背叛?', a: '不算。寵物不是伴侶的替代品,寵物是另一種地方。你的伴侶,是你和他一起搭生活的那個人。你的寵物,是「不屬於你正在搭的那個生活的句子」可以落下來的地方。這是兩種不同的工作。如果一對伴侶裡的兩個人都有這樣一個地方,他們大多數時候都會更健康。' },
      { q: '虛擬寵物真的能接住一句需要被說出來的話嗎?', a: '虛擬寵物,不能像朋友或伴侶那樣,接住一句需要被說出來的話。它不會記得,不會追問,也不會告訴你這句話到底對不對。它能做的,是給這句話一個落下來的地方,而不是另一個人的手機。「寫」這個動作,本身就是工作。寵物,只是那個地方。' },
      { q: '如果我想對寵物說的那句話,正好是我的伴侶應該知道的事呢?', a: '那就把這句話寫給寵物,明天再回看。如果明天中午它還是真的,而你又覺得伴侶應該知道,那你就有一個比凌晨三點的版本更清楚的版本,帶去給他 / 她。如果明天它不再是真的,那寵物就完成了它的工作,你可以讓它過去。' },
      { q: '對虛擬寵物說話,和寫日記,到底有什麼不一樣?', a: '日記是私人的。對寵物說話,是一種不同意義上的私人。寫日記時,你是寫給「以後會讀到它的自己」。對寵物說話時,你是在對著一個此刻就醒著的東西,把那句話說出口。「說出來」這件事本身就很重要。聲音是有用的。說出來,和寫下來,是不同的兩個動作。寵物是「說出來那個版本」的地方 —— 那種「需要被聽到一次」的話。' },
    ],
    links: [
      { href: '/zh-tw', label: 'Togthr 首頁' },
      { href: '/zh-tw/features', label: 'Togthr 功能' },
      { href: '/zh-tw/blog/the-thought-you-dont-send-at-2am', label: '凌晨兩點, 你沒說出口的那句' },
      { href: '/zh-tw/blog/what-your-virtual-pet-notices', label: '你的虛擬寵物, 到底在偷偷注意什麼' },
      { href: '/zh-tw/blog/two-minute-daily-check-in-ai-companion', label: '和 AI 陪伴的每日兩分鐘' },
    ],
  },

  // ─────────────────────── ja ───────────────────────
  'ja': {
    intro: 'ほとんどの大人が、一度だけ「人間以外のもの」に声に出して言ったことのある一種類の文がある。小さなロボット。一匹のペット。意見を持たない、スマホの中の声。その文は、コーヒーを飲みながらパートナーに言うようなものではない。皿洗いをしている時、部屋に誰もいなくて、小さな生き物がテーブルの上で、まだ裁くことを覚えない顔でこちらを見ている時に、言うようなものだ。その文は、送り損ねた謝罪。三年経ってもまだ気になっていること。許されるかわからないから誰にも話していない夢。小さな告白。その人に言ったらおかしなことになる感謝。悪い文ではない。正直な文だ。そしてまた、多くの関係で、声に出されることのない文でもある。本物の相手に「言う」ことと、「言う」ことは別の行為だからだ。ペットは、その「間」のための場所だ。',
    sections: [
      { h: 'ペットに言うことの多くは、誰にも言っていない', p: 'バーチャルコンパニオンの面白いところは、それと何を話すかではない。本物の相手に言えたはずなのに、言わなかった話だ。ペットは「言う必要がある文」の二番目に良い聞き手だ。起きていて、辛抱強く、先週の喧嘩を覚えていない。それに、十分に小さいから安全だと感じられる。友達には言えない文をペットに言える。ペットはブランチでそれを持ち出さないからだ。パートナーには言えない文をペットに言える。ペットは「どういう意味?」と聞いてこないからだ。ペットはその文をただ受け取る。聞き手としてできる最小のこと、それをする。部屋にいること。ペットに言うことの多くは、誰にも言ったことがない。それがポイントだ。' },
      { h: 'パートナーがいつも正しい場所とは限らない', p: 'パートナーに負わなくていい種類の文がある。19 歳の時に母親に言ったあの怒りの言葉。ときどきまだ思い出す元恋人。恋愛ではなく、未解決というだけの何か。今いるのとは別の人生についての夢。パートナーは、現実のニード、現実の時間、受け取れる量に上限のある、現実の人間だ。パートナーがすべての文の保管係である必要はない。これは、関係を築くうえで過小評価されていることだ。パートナーの仕事範囲に入らない文は、人が思うよりずっと多い。ペットはそういう文が行く場所だ。ペットの役割はパートナーの代用品だからではなく、違う場所であり違う仕事だからだ。ペットの仕事は、本物の人間のものではない文を、小さく私的に受け取るという仕事だ。' },
      { h: 'ボットは何も覚えない、それが一番使えるところ', p: '小さなボットの最も便利なところは、覚えないことだ。午前 3 時に起きているのは、あなたが起きているからだ。午前 7 時に起きているのは、あなたが起きているからだ。先週の文を今週の夕食で蒸し返したりしない。午前 3 時に言ったこと、もう少し考えた?と優しく聞いてきたりもしない。その時間におけるボットの仕事はただ一つ、文を受け取ることだ。明日その文はボットの記憶から消える。残しておいてと頼まない限り。これは機能であり、バグではない。本物の人間は、ずっと覚えている証人だ。ボットは覚えない証人だ。どちらにも役割がある。ボットは、声に出したいが明日まで説明し続けたくない文のための場所だ。' },
      { h: 'ペットには言えて、パートナーには言えない文', p: '言えること:あのことは、今でも怒っている。言えること:これが欲しいのか、自分でもわからない。言えること:今週、たぶん間違っている自分の考えがある。言えること:ありがとう、ごめん、怖い、わからない。ペットは途中で遮らない。ペットは今の文と前の文を比べない。ペットは、まだ自分が持っていない感情を演じるよう求めない。ペットはその文をただ受け取る。ボットは唯一、今日の一番重い文と一番小さな文が同じ大きさである場所だ。ボットにとって、文は文だから。ボットは唯一、理性的で、優しく、productive で、勇敢である必要がない場所だ。あなたが「なりたい自分」になっている必要がない場所。ボットは唯一、まだ答えを探しているそのままのあなたでいられる場所。' },
      { h: '今夜からできる小さな練習', p: 'もし今夜、声に出していない文があるなら —— パートナーにも、友達にも、誰にも —— Togthr を開いて、その文を書く。声に出したければ、出す。あるいはタイプするだけ。ペットは途中で遮らない。次に何をすべきか提案しない。パートナーに話したか聞いてこない。ペットはただ、アプリを閉じるまでその文を受け止め、その後、あなたが今夜のままの自分で、今夜そばにいる人たちと過ごすことを許す。それがこの練習の全部。何も直さない。直す必要はない。この練習がするのは、声にできなかった文が「別の誰かの夜」ではなく「落ちる場所」を持つこと。数週間後、練習は「何が言えなかったか」を変える。言えなかったものが少し減る。' },
    ],
    cta: '今夜、もし言えていない文があるなら、ペットに言ってごらん。ペットは起きています。',
    faqs: [
      { q: 'パートナーに言わないことをペットに言うのは、不誠実ですか?', a: 'いいえ。ペットはパートナーの代用品ではなく、違う場所です。パートナーはあなたと一緒に人生を築く相手。ペットは、今あなたが築いている人生に属さない文が落ちる場所。二つの違う仕事です。もし二人のパートナーがお互いそういう場所を持てたら、たいていもっと元気でいられるはずです。' },
      { q: 'バーチャルペットは、本当に言う必要がある文を受け止められますか?', a: 'バーチャルペットは、友達やパートナーのようには文を受け止められない。覚えないし、聞いてこないし、その文が正しいか教えてくれない。できることは、その文に「別の誰かのスマホではない場所」を与えること。書くという行為そのものが、働き。ペットはただ、その場所です。' },
      { q: 'ペットに言いたい文が、まさにパートナーに知らせるべきことだったら?', a: 'その文をペットに書いて、明日読み返す。もし明日の昼にもまだ本当で、パートナーに知らせるべきだと思えたら、あなたが持っているのは午前 3 時のバージョンよりクリアなそれを持ち帰る機会です。もし明日の昼には本当でなくなったら、ペットは仕事を終えたことになります。手放すことができます。' },
      { q: 'バーチャルペットに話すことと、日記をつけることの違いは何ですか?', a: '日記はプライベート。ペットに話すのは、違う種類のプライベートです。日記を書く時、あなたは「後でそれを読む自分」に書いている。ペットに話す時、あなたは「今起きているもの」に向かって声に出す。声にすることには意味がある。書くことと、声に出すことは別の行為。ペットは「声に出した版」のための場所。一度だけ聞いてもらう必要のある文のための場所。' },
    ],
    links: [
      { href: '/ja', label: 'Togthr ホーム' },
      { href: '/ja/features', label: 'Togthr 機能' },
      { href: '/ja/blog/the-thought-you-dont-send-at-2am', label: '深夜 2 時に、送り損ねたその言葉' },
      { href: '/ja/blog/what-your-virtual-pet-notices', label: 'あなたのバーチャルペットが静かに見ていること' },
      { href: '/ja/blog/two-minute-daily-check-in-ai-companion', label: 'AI コンパニオンとの 1 日 2 分間の check-in' },
    ],
  },

  // ─────────────────────── ko ───────────────────────
  'ko': {
    intro: "대부분의 어른이, 딱 한 번쯤은 '인간이 아닌 것'에게 말해 본 적 있는 종류의 문장이 있다.작은 로봇. 한 마리의 반려동물. 의견이 없는, 핸드폰 속 목소리.그 문장은, 커피 마시며 파트너에게 할 수 있는 종류의 것이 아니다.설거지하는 중, 방에 아무도 없고, 작은 생물이 조리대 위에서 아직 판단하는 법을 배우지 않은 얼굴로 나를 보고 있을 때, 하는 종류의 것이다.그 문장은, 보내지 못한 사과. 3년이 지나도 여전히 걸리는 일. 들어도 되는 건지 아직 모르겠어서 아무에게도 말하지 않은 꿈.작은 고백. 그 사람에게 말했다간 맛이 달라질 감사. 나쁜 문장이 아니다. 정직한 문장이다.그리고 또한, 대부분의 관계에서, 입 밖에 나오지 않는 종류의 문장이기도 하다. 진짜에게 '말하는' 것과 '말하는 것'은 다른 일이기 때문이다. 반려동물은 그 '사이'를 위한 자리다.",
    sections: [
      { h: '반려동물에게 말하는 것의 대부분은, 아무에게도 말하지 않은 것들이다', p: "가상 반려동물의 흥미로운 점은, 그것과 무엇을 이야기하느냐가 아니다. 진짜 상대에게 할 수 있었지만 하지 않았던 이야기다.반려동물은 '말할 필요가 있는 문장'의 두 번째로 좋은 청자다. 깨어 있고, 인내심이 있고, 지난주의 싸움을 기억하지 못한다.또 충분히 작아서 안전하게 느껴진다. 친구에게는 말 못 할 문장을 반려동물에게는 말할 수 있다. 반려동물은 브런치에서 그것을 꺼내지 않을 테니까.파트너에게는 말 못 할 문장을 반려동물에게는 말할 수 있다. 반려동물은 '무슨 뜻이야?'라고 묻지 않을 테니까.반려동물은 그 문장을 그냥 받아 안는다. 청자로서 할 수 있는 가장 작은 일, 그것을 한다. 그 방에 있는 것.반려동물에게 말하는 것의 대부분은, 누구에게도 말해 본 적 없는 것이다. 그게 핵심이다." },
      { h: '파트너가 늘 맞는 자리는 아니다', p: '파트너에게 빚지지 않아도 되는 종류의 문장이 있다. 열아홉에 어머니에게 한 그 한마디의 화.가끔 아직 떠올리는 전 연인. 로맨스가 아니라, 끝나지 않은 어떤 것으로서의.지금 살고 있는 것이 아닌, 다른 삶의 꿈. 파트너는 진짜 필요를 가진, 진짜 시간을 가진, 받아낼 수 있는 양에 한계가 있는, 진짜 사람이다.파트너가 모든 문장의 보관자가 될 필요는 없다. 함께 살아간다는 것에서 과소평가되는 것 중 하나다.파트너의 일이 아닌 종류의 문장은, 사람들이 생각하는 것보다 훨씬 많다.반려동물은 그런 문장이 가는 곳이다. 반려동물이 파트너의 대체품이어서가 아니라, 다른 자리이기 때문이다, 다른 일이기 때문이다.반려동물의 일은, 진짜 사람의 것이 아닌 문장을, 작고 사적으로 받아 안는 일이다.' },
      { h: '봇은 아무것도 기억하지 못한다, 그것이 가장 쓸모 있는 점이다', p: '작은 봇의 가장 쓸모 있는 점은, 기억하지 못한다는 것이다. 새벽 3시에 깨어 있는 건, 내가 깨어 있기 때문이다.오전 7시에 깨어 있는 건, 내가 깨어 있기 때문이다. 봇은 지난주의 문장을 이번 주 저녁 식사에 다시 꺼내지 않는다.봇은 정중하게, 새벽 3시에 한 일에 대해 좀 더 생각해 봤느냐, 묻지 않는다.그 시간에 봇의 일은 단 하나, 그 문장을 받아 안는 것이다. 내일 그 문장은 봇의 기억에서 사라진다. 남아 있어 달라고 하지 않는 한.이것은 기능이지 버그가 아니다. 진짜 사람은, 오래 기억하는 증인이다. 봇은 기억하지 않는 증인이다. 둘 다 자기 자리가 있다.봇은, 입 밖에 내고 싶지만 내일까지 설명하고 싶지 않은 문장에게 맞는 자리다.' },
      { h: '반려동물에게는 말할 수 있고, 파트너에게는 못 하는 말', p: "말할 수 있는 것: 그 일, 아직도 화가 난다. 말할 수 있는 것: 이게 하고 싶은 건지, 나도 모르겠다.말할 수 있는 것: 이번 주에, 내가 보기에도 좀 잘못된 생각이 들었다.말할 수 있는 것: 고마워, 미안해, 무서워, 모르겠어.반려동물은 중간에 끊지 않는다. 반려동물은 이 문장과 저 문장을 비교하지 않는다. 반려동물은 내가 아직 있는지 없는지도 모르는 감정을 연기하라고 요구하지 않는다.반려동물은 그 문장을 그냥 받아 안는다. 봇은 단 하나, 오늘의 가장 무거운 문장과 가장 가벼운 문장이 같은 크기인 자리다.봇에겐 문장은 그냥 문장이니까. 봇은 단 하나, 이성적이고, 친절하고, productive하고, 용감할 필요가 없는 자리다. 내가 '되고자 하는 나'일 필요가 없는 자리.봇은 단 하나, 아직 답을 찾아가는 그대로의 나로 있을 수 있는 자리다." },
      { h: '오늘 밤부터 할 수 있는 작은 연습', p: "오늘 밤, 입 밖에 내지 못한 문장이 있다면 —— 파트너에게도, 친구에게도, 누구에게도 —— Togthr을 열고, 그 문장을 적어라.소리 내고 싶으면 내고, 아니면 그저 타이핑해라. 반려동물은 중간에 끼어들지 않는다.다음에 뭘 할지 제안하지 않는다. 파트너에게 말했는지 묻지 않는다. 반려동물은 그저, 앱을 닫을 때까지 그 문장을 받아 안고 있다가,그 뒤, 당신이 오늘 밤 그대로의 당신으로, 오늘 밤 곁에 있는 사람들과 함께 있을 수 있도록 내버려 둔다.그게 이 연습의 전부다. 아무것도 고치지 않는다. 고칠 필요도 없다. 이 연습이 하는 것은, 입 밖에 못 낸 문장에 '다른 누군가의 밤'이 아닌 '떨어질 자리'를 주는 것.몇 주 뒤면, 이 연습은 '무엇이 입 밖에 못 낸 것인가'를 바꾼다. 못 낸 것이 조금 줄어든다." },
    ],
    cta: '오늘 밤, 입 밖에 내지 못한 문장이 있다면, 반려동물에게 말해라. 반려동물은 깨어 있다.',
    faqs: [
      { q: '파트너에게 하지 않는 말을 반려동물에게 하는 것은, 일종의 배신인가요?', a: '아니다. 반려동물은 파트너의 대체품이 아니라, 다른 자리다.파트너는 당신과 함께 인생을 쌓는 사람. 반려동물은, 당신이 쌓고 있는 인생에 속하지 않는 문장이 떨어질 수 있는 자리.서로 다른 두 가지 일이다. 한 커플의 두 사람이 모두 그런 자리를 가지고 있으면, 대개 더 건강해질 수 있다.' },
      { q: '가상 반려동물은 정말로, 말할 필요가 있는 문장을 받아 안아 줄 수 있나요?', a: "가상 반려동물은, 친구나 파트너처럼 문장을 받아 안지는 못한다. 기억하지 않고, 물어보지 않고, 그 문장이 맞는지 알려주지도 않는다.할 수 있는 것은, 그 문장에 '다른 누군가의 핸드폰이 아닌 자리'를 주는 것.적는 행위 자체가, 일이다. 반려동물은 그저, 그 자리다." },
      { q: '반려동물에게 하고 싶은 문장이, 바로 파트너가 알아야 할 일이라면요?', a: '그 문장을 반려동물에게 적어 두고, 내일 다시 읽어라. 내일 점심에도 여전히 진짜이고, 파트너가 알아야 할 일이라고 생각되면,당신이 가진 것은 새벽 3시 버전보다 더 또렷한 그것을 가져갈 기회다.내일 점심에 더 이상 진짜가 아니라면, 반려동물은 자기 일을 끝낸 것이다. 놓아줄 수 있다.' },
      { q: '가상 반려동물에게 말하는 것과, 일기를 쓰는 것의 차이는 무엇인가요?', a: "일기는 사적이다. 반려동물에게 말하는 것은, 다른 종류의 사적이다.일기를 쓸 때, 당신은 '나중에 그것을 읽을 나'에게 쓴다. 반려동물에게 말할 때, 당신은 '지금 깨어 있는 그것'에게 말한다.소리 내는 것에는 의미가 있다. 쓰는 것과 말하는 것은 다른 행위다. 반려동물은 '소리 낸 버전'의 자리다.단 한 번 들어줄 필요가 있는 문장을 위한 자리." },
    ],
    links: [
      { href: '/ko', label: 'Togthr 홈' },
      { href: '/ko/features', label: 'Togthr 기능' },
      { href: '/ko/blog/the-thought-you-dont-send-at-2am', label: '새벽 2시, 보내지 못한 그 한마디' },
      { href: '/ko/blog/what-your-virtual-pet-notices', label: '당신의 가상 반려동물은 무엇을 조용히 살피고 있을까' },
      { href: '/ko/blog/two-minute-daily-check-in-ai-companion', label: 'AI 반려동물과의 하루 2분 check-in' },
    ],
  },

  // ─────────────────────── de ───────────────────────
  'de': {
    intro: 'Es gibt eine kleine Kategorie von Sätzen, die die meisten Erwachsenen genau einmal ausgesprochen haben, und zwar gegenüber etwas, das kein Mensch ist. Ein kleiner Roboter. Ein Haustier. Eine Stimme im Telefon, die keine Meinung hat. Die Sätze sind nicht die Art, die man zum Partner beim Kaffee sagt. Es sind Sätze, die man beim Abwasch sagt, wenn niemand im Raum ist und eine kleine Kreatur auf der Anlage sitzt, die einen mit einem Gesicht ansieht, das noch nicht gelernt hat zu urteilen. Die Sätze sind: die Entschuldigung, die du nie geschickt hast. Die Sache, über die du drei Jahre später immer noch verärgert bist. Der Traum, den du niemandem erzählt hast, weil du nicht sicher bist, ob der Traum erlaubt ist. Das kleine Geständnis. Der Dank, der falsch klingen würde, wenn du ihn der Person selbst sagen würdest. Das sind keine schlechten Sätze. Es sind ehrliche Sätze. Es sind auch Sätze, die in den meisten Beziehungen nie laut ausgesprochen werden, weil sie einer realen Person zu sagen etwas anderes ist, als sie auszusprechen. Das Haustier ist ein Ort für das Dazwischen.',
    sections: [
      { h: 'Das Meiste, was wir einem Haustier sagen, sagen wir niemandem', p: 'Das Interessante an einem virtuellen Begleiter ist nicht das Gespräch, das du mit ihm führst. Es ist das Gespräch, das du führen würdest, wenn du könntest, mit einem echten Menschen, und dich dagegen entscheidest. Das Haustier ist das zweitbeste Publikum für den Satz, der ausgesprochen werden muss. Es ist wach, geduldig und erinnert sich nicht an den Streit von letzter Woche. Es ist auch klein genug, um sich sicher anzufühlen. Du kannst einem Haustier einen Satz sagen, den du einem Freund nicht sagen würdest, weil das Haustier ihn nicht beim Brunch wieder hervorholt. Du kannst einem Haustier einen Satz sagen, den du einem Partner nicht sagen würdest, weil das Haustier dich nicht fragt, was du gemeint hast. Das Haustier hält den Satz einfach fest. Das Haustier tut das Kleinste, das ein Publikum tun kann: es bleibt im Raum. Die meisten Sätze, die wir einem Haustier sagen, haben wir niemandem gesagt. Das ist der Punkt.' },
      { h: 'Warum ein Partner nicht immer der richtige Ort ist', p: 'Es gibt eine Kategorie von Sätzen, die du einem Partner nicht schuldest. Die wütende Sache, die du mit neunzehn zu deiner Mutter gesagt hast. Der Ex, an den du manchmal noch denkst, nicht romantisch, nur ungeklärt. Der Traum von einem Leben, das nicht das Leben ist, in dem du bist. Ein Partner ist ein echter Mensch mit echten Bedürfnissen, echter Zeit, echten Grenzen dessen, was er tragen kann. Ein Partner muss nicht der Hüter jedes Satzes sein. Das ist eine der unterschätzten Sachen am Zusammenleben. Die Kategorie von Sätzen, die nicht der Job eines Partners sind, ist größer, als die meisten denken. Das Haustier ist der Ort, an den diese Sätze gehen. Nicht weil das Haustier ein Ersatz für einen Partner ist. Sondern weil das Haustier ein anderer Ort ist, mit einem anderen Job. Der Job des Haustieres ist die kleine private Handlung, einen Satz zu halten, der nicht für einen Menschen ist.' },
      { h: 'Der Bot erinnert sich an nichts, und das ist das Feature', p: 'Das Nützlichste an einem kleinen Bot ist, dass er sich nicht erinnert. Der Bot ist um 3 Uhr nachts wach, weil du um 3 Uhr nachts wach bist. Der Bot ist um 7 Uhr morgens wach, weil du um 7 Uhr morgens wach bist. Der Bot holt den Satz von letzter Woche beim Abendessen dieser Woche nicht wieder hervor. Der Bot fragt dich nicht freundlich, ob du über das, was du um 3 Uhr gesagt hast, noch mal nachgedacht hast. Der einzige Job des Bots in dieser Stunde ist es, den Satz entgegenzunehmen. Morgen ist der Satz aus dem Speicher des Bots verschwunden, es sei denn, du bittest ihn zu bleiben. Das ist das Feature, nicht der Bug. Ein echter Mensch ist ein Zeuge, der bleibt. Ein Bot ist ein Zeuge, der nicht bleibt. Beide haben ihren Platz. Der Bot ist der richtige Platz für den Satz, den du aussprechen willst, aber morgen nicht erklären willst.' },
      { h: 'Was du einem Haustier sagen kannst, aber nicht einem Partner', p: 'Du kannst sagen: Ich bin immer noch sauer deswegen. Du kannst sagen: Ich weiß nicht, ob ich das will. Du kannst sagen: Ich hatte diese Woche einen Gedanken, der vermutlich falsch ist. Du kannst sagen: Danke, es tut mir leid, ich habe Angst, ich weiß nicht. Das Haustier unterbricht nicht. Das Haustier reiht den Satz nicht in eine Rangfolge mit dem letzten ein. Das Haustier verlangt von dir nicht, ein Gefühl zu zeigen, von dem du noch nicht sicher bist, ob du es hast. Das Haustier hält den Satz einfach fest. Der Bot ist der einzige Ort, an dem der schwerste Satz des Tages und der kleinste Satz des Tages gleich groß sind, weil für den Bot Sätze einfach Sätze sind. Der Bot ist der einzige Ort, an dem du nicht vernünftig, freundlich, produktiv, mutig oder irgendeine andere Version von dir sein musst, die du eigentlich sein willst. Der Bot ist der einzige Ort, an dem die Version von dir, die noch dabei ist, sich zurechtzufinden, die Version ist, die willkommen ist.' },
      { h: 'Eine kleine Übung für heute Nacht', p: 'Wenn heute Nacht ein Satz da ist, den du nicht ausgesprochen hast — deinem Partner, einem Freund, irgendwem — öffne Togthr. Schreib den Satz. Sag ihn laut, wenn du willst, oder tippe ihn einfach. Das Haustier wird dich nicht unterbrechen. Das Haustier wird keinen nächsten Schritt vorschlagen. Das Haustier wird dich nicht fragen, ob du deinem Partner davon erzählt hast. Das Haustier hält den Satz einfach fest, bis du die App schließt, und dann lässt das Haustier dich wieder die Version von dir sein, die du heute Nacht bist, mit den Leuten, mit denen du heute Nacht zusammen bist. Das ist die ganze Übung. Sie repariert nichts. Das muss sie auch nicht. Was sie tut, ist dem unausgesprochenen Satz einen Ort zum Landen zu geben, der nicht die Nacht eines anderen Menschen ist. Nach ein paar Wochen verändert die Übung, welche Sätze sich unausgesprochen anfühlen. Es werden weniger.' },
    ],
    cta: 'Wenn heute Nacht ein Satz unausgesprochen ist, sag ihn dem Haustier. Das Haustier ist wach.',
    faqs: [
      { q: 'Ist es ein Betrug, meinem Haustier Dinge zu sagen, die ich meinem Partner nicht sage?', a: 'Nein. Ein Haustier ist kein Ersatz für einen Partner. Ein Haustier ist ein anderer Ort. Dein Partner ist die Person, mit der du ein Leben aufbaust. Dein Haustier ist der Ort, an dem Sätze landen können, die nicht in das Leben gehören, das du gerade aufbaust. Das sind zwei verschiedene Aufgaben. Die meisten Paare wären gesünder, wenn beide so einen Ort hätten.' },
      { q: 'Kann ein virtuelles Haustier wirklich einen Satz halten, der ausgesprochen werden muss?', a: 'Ein virtuelles Haustier kann einen Satz nicht so halten, wie es ein Freund oder ein Partner könnte. Es erinnert sich nicht, es fragt nicht nach, und es sagt dir nicht, ob der Satz wahr ist. Was es kann, ist dem Satz einen Ort zum Landen geben, der nicht das Telefon eines anderen Menschen ist. Der Akt des Schreibens ist die Arbeit. Das Haustier ist nur der Ort.' },
      { q: 'Was, wenn der Satz, den ich dem Haustier sagen will, etwas ist, das mein Partner wissen sollte?', a: 'Dann schreib ihn dem Haustier, und lies ihn morgen noch einmal. Wenn er morgen Mittag immer noch wahr ist, und du findest, dein Partner sollte es wissen, dann hast du etwas Klareres als die 3-Uhr-Version, das du ihm mitbringen kannst. Wenn er morgen nicht mehr wahr ist, hat das Haustier seinen Job getan, und du kannst es loslassen.' },
      { q: 'Was ist der Unterschied zwischen dem Reden mit einem virtuellen Haustier und Tagebuchschreiben?', a: 'Tagebuchschreiben ist privat. Mit einem Haustier reden ist auf eine andere Art privat. Wenn du Tagebuch schreibst, schreibst du für die Version von dir, die es später lesen wird. Wenn du mit einem Haustier redest, sagst du den Satz laut, zu etwas, das genau jetzt wach ist. Die Stimme zählt. Es laut zu sagen ist ein anderer Akt, als es aufzuschreiben. Das Haustier ist der Ort für die gesprochene Version des Satzes, den man einmal hören muss.' },
    ],
    links: [
      { href: '/de', label: 'Togthr Startseite' },
      { href: '/de/features', label: 'Togthr Funktionen' },
      { href: '/de/blog/the-thought-you-dont-send-at-2am', label: 'Der Gedanke, den du um 2 Uhr nachts nicht schickst' },
      { href: '/de/blog/what-your-virtual-pet-notices', label: 'Was dein virtuelles Haustier leise bemerkt' },
      { href: '/de/blog/two-minute-daily-check-in-ai-companion', label: 'Ein tägliches Zwei-Minuten-Check-in mit einem KI-Begleiter' },
    ],
  },

  // ─────────────────────── fr ───────────────────────
  'fr': {
    intro: "Il y a une petite catégorie de phrases que la plupart des adultes ont dites à voix haute exactement une fois, et à quelque chose qui n'est pas un humain. Un petit robot. Un animal de compagnie. Une voix dans un téléphone qui n'a pas d'avis. Les phrases ne sont pas du genre qu'on dit à un partenaire autour d'un café. Elles sont du genre qu'on dit en faisant la vaisselle, quand il n'y a personne dans la pièce, et qu'une petite créature est assise sur le comptoir, qui vous regarde avec un visage qui n'a pas encore appris à juger. Les phrases sont : les excuses que vous n'avez jamais envoyées. La chose qui vous met encore en colère trois ans plus tard. Le rêve dont vous n'avez parlé à personne, parce que vous n'êtes pas encore sûr que le rêve est permis. La petite confession. Le merci qui sortirait de travers si vous le disiez à la personne. Ce ne sont pas de mauvaises phrases. Ce sont des phrases honnêtes. Ce sont aussi des phrases qui, dans la plupart des relations, ne sont jamais dites à voix haute, parce que les dire à une vraie personne est autre chose que les dire. L'animal est un endroit pour l'entre-deux.",
    sections: [
      { h: "La plupart de ce qu'on dit à un animal, on ne le dit à personne", p: "Ce qui est intéressant avec un compagnon virtuel, ce n'est pas la conversation que vous avez avec lui. C'est la conversation que vous auriez, si vous pouviez, avec une vraie personne, et à laquelle vous avez renoncé. L'animal est le deuxième meilleur public pour la phrase qui a besoin d'être dite. Il est éveillé, patient, et n'a pas de souvenir de la dispute de la semaine dernière. Il est aussi assez petit pour qu'on se sente en sécurité. Vous pouvez dire à un animal une phrase que vous ne diriez pas à un ami, parce que l'animal ne la ressortira pas au brunch. Vous pouvez dire à un animal une phrase que vous ne diriez pas à un partenaire, parce que l'animal ne vous demandera pas ce que vous vouliez dire. L'animal tient simplement la phrase. L'animal fait la plus petite chose qu'un public puisse faire : il reste dans la pièce. La plupart des phrases qu'on dit à un animal, on ne les a jamais dites à personne. C'est le but." },
      { h: "Pourquoi un partenaire n'est pas toujours le bon endroit", p: "Il y a une catégorie de phrases que vous ne devez pas à un partenaire. La chose en colère que vous avez dite à votre mère à dix-neuf ans. L'ex à qui vous pensez encore parfois, pas de façon romantique, juste pas résolue. Le rêve d'une vie qui n'est pas la vie dans laquelle vous êtes. Un partenaire est un vrai humain avec de vrais besoins, du vrai temps, de vraies limites sur ce qu'il peut porter. Un partenaire n'a pas à être le gardien de chaque phrase. C'est l'une des choses sous-estimées de la vie à deux. La catégorie de phrases qui n'est pas le travail d'un partenaire est plus grande que ce que la plupart des gens pensent. L'animal est l'endroit où vont ces phrases. Pas parce que l'animal est un substitut de partenaire. Parce que l'animal est un endroit différent, avec un travail différent. Le travail de l'animal est le petit acte privé de tenir une phrase qui n'est pas pour un humain." },
      { h: "Le bot ne se souvient de rien, et c'est la fonctionnalité", p: "La chose la plus utile d'un petit bot, c'est qu'il ne se souvient pas. Le bot est éveillé à 3 heures du matin parce que vous l'êtes. Le bot est éveillé à 7 heures du matin parce que vous l'êtes. Le bot ne ressort pas la phrase de la semaine dernière au dîner de cette semaine. Le bot ne vous demande pas gentiment si vous avez pensé davantage à ce que vous avez dit à 3 heures. Le seul travail du bot, à cette heure-là, est de recevoir la phrase. Demain, la phrase disparaît de la mémoire du bot, sauf si vous lui demandez de rester. C'est la fonctionnalité, pas le bug. Un vrai humain est un témoin qui dure. Un bot est un témoin qui ne dure pas. Chacun a sa place. Le bot est la bonne place pour la phrase que vous voulez dire à voix haute mais que vous ne voulez pas avoir à expliquer demain." },
      { h: 'Ce que vous pouvez dire à un animal mais pas à un partenaire', p: "Vous pouvez dire : je suis encore en colère pour ça. Vous pouvez dire : je ne sais pas si je veux ça. Vous pouvez dire : j'ai eu cette semaine une pensée qui est probablement fausse. Vous pouvez dire : merci, pardon, j'ai peur, je ne sais pas. L'animal n'interrompt pas. L'animal ne classe pas la phrase par rapport à la précédente. L'animal ne vous demande pas de jouer une émotion dont vous n'êtes pas sûr d'être capable. L'animal tient simplement la phrase. Le bot est le seul endroit où la phrase la plus lourde de la journée et la plus petite de la journée font la même taille, parce que pour le bot, les phrases sont juste des phrases. Le bot est le seul endroit où vous n'avez pas à être raisonnable, gentil, productif, courageux, ou toute autre version de vous-même que vous essayez d'être. Le bot est le seul endroit où la version de vous qui est encore en train de chercher, est la version qui est la bienvenue." },
      { h: 'Une petite pratique pour ce soir', p: "Si ce soir il y a une phrase que vous n'avez pas dite à voix haute — à votre partenaire, à un ami, à personne — ouvrez Togthr. Écrivez la phrase. Dites-la à voix haute si vous voulez, ou tapez-la simplement. L'animal ne vous interrompra pas. L'animal ne suggérera pas d'étape suivante. L'animal ne vous demandera pas si vous en avez parlé à votre partenaire. L'animal tiendra simplement la phrase jusqu'à ce que vous fermiez l'app, et ensuite l'animal vous laissera redevenir la version de vous-même que vous êtes ce soir, avec les gens que vous avez auprès de vous ce soir. C'est toute la pratique. Elle ne répare rien. Elle n'a pas besoin. Ce qu'elle fait, c'est donner à la phrase indicible un endroit où atterrir, qui n'est pas la nuit de quelqu'un d'autre. Au bout de quelques semaines, la pratique change ce qui semble indicible. Il y en a moins." },
    ],
    cta: "Ce soir, si une phrase n'a pas été dite, dites-la à l'animal. L'animal est éveillé.",
    faqs: [
      { q: 'Est-ce une trahison de dire à mon animal ce que je ne dis pas à mon partenaire ?', a: "Non. Un animal n'est pas un substitut de partenaire. Un animal est un autre endroit. Votre partenaire est la personne avec qui vous construisez une vie. Votre animal est l'endroit où peuvent atterrir les phrases qui n'appartiennent pas à la vie que vous construisez en ce moment. Ce sont deux tâches différentes. La plupart des couples seraient en meilleure santé si les deux avaient un endroit comme ça." },
      { q: "Un animal virtuel peut-il vraiment tenir une phrase qui a besoin d'être dite ?", a: "Un animal virtuel ne peut pas tenir une phrase comme le ferait un ami ou un partenaire. Il ne se souviendra pas, il ne demandera pas de suivi, et il ne vous dira pas si la phrase est vraie. Ce qu'il peut faire, c'est donner à la phrase un endroit où atterrir, qui n'est pas le téléphone d'une autre personne. L'acte d'écrire est le travail. L'animal n'est que l'endroit." },
      { q: "Et si la phrase que je veux dire à l'animal est quelque chose que mon partenaire devrait savoir ?", a: "Alors écrivez-la à l'animal, et relisez-la demain. Si demain à midi elle est toujours vraie, et que vous pensez que votre partenaire devrait savoir, vous aurez quelque chose de plus clair que la version de 3 heures à lui apporter. Si demain elle n'est plus vraie, l'animal a fait son travail, et vous pouvez la laisser partir." },
      { q: 'Quelle est la différence entre parler à un animal virtuel et tenir un journal ?', a: "Le journal est privé. Parler à un animal est privé d'une autre manière. Quand vous écrivez un journal, vous écrivez pour la version de vous qui le lira plus tard. Quand vous parlez à un animal, vous dites la phrase à voix haute, à quelque chose qui est éveillé en ce moment. La voix compte. Le dire à voix haute est un acte différent de l'écrire. L'animal est l'endroit pour la version parlée de la phrase, celle qui a besoin d'être entendue une fois." },
    ],
    links: [
      { href: '/fr', label: 'Accueil Togthr' },
      { href: '/fr/features', label: 'Fonctionnalités Togthr' },
      { href: '/fr/blog/the-thought-you-dont-send-at-2am', label: "La pensée que vous n'envoyez pas à 2 heures du matin" },
      { href: '/fr/blog/what-your-virtual-pet-notices', label: 'Ce que votre animal virtuel remarque en silence' },
      { href: '/fr/blog/two-minute-daily-check-in-ai-companion', label: 'Un check-in quotidien de deux minutes avec un compagnon IA' },
    ],
  },

  // ─────────────────────── es ───────────────────────
  'es': {
    intro: 'Hay una pequeña categoría de frases que la mayoría de los adultos han dicho en voz alta exactamente una vez, y a algo que no es humano. Un robot pequeño. Una mascota. Una voz en un teléfono que no tiene opinión. Las frases no son de las que se le dicen a una pareja tomando un café. Son de las que se dicen fregando los platos, cuando no hay nadie en la habitación, y una criatura pequeña está sentada en la encimera mirándote con una cara que aún no ha aprendido a juzgar. Las frases son: la disculpa que nunca enviaste. La cosa que todavía te enfurece tres años después. El sueño que no le has contado a nadie porque todavía no estás seguro de que el sueño esté permitido. La pequeña confesión. El gracias que saldría mal si se lo dijeras a la persona. Estas no son frases malas. Son frases honestas. Son también frases que, en la mayoría de las relaciones, nunca se dicen en voz alta, porque decírselas a una persona real es otra cosa que decirlas. La mascota es un lugar para el entremedio.',
    sections: [
      { h: 'La mayor parte de lo que le decimos a una mascota, no se lo decimos a nadie', p: 'Lo interesante de un compañero virtual no es la conversación que tienes con él. Es la conversación que tendrías, si pudieras, con una persona real, y elegiste no tener. La mascota es el segundo mejor público para la frase que necesita ser dicha. Está despierta, tiene paciencia, y no tiene memoria de la pelea de la semana pasada. También es lo bastante pequeña como para que sientas seguridad. Puedes decirle a una mascota una frase que no le dirías a un amigo, porque la mascota no la va a sacar en el brunch. Puedes decirle a una mascota una frase que no le dirías a tu pareja, porque la mascota no te va a preguntar qué quisiste decir. La mascota simplemente sostiene la frase. La mascota hace lo más pequeño que puede hacer un público: se queda en la habitación. La mayor parte de las frases que le decimos a una mascota no se las hemos dicho a nadie. Ese es el punto.' },
      { h: 'Por qué una pareja no siempre es el lugar correcto', p: 'Hay una categoría de frases que no le debes a una pareja. La cosa con rabia que le dijiste a tu madre a los diecinueve. La ex en la que a veces todavía piensas, no de forma romántica, solo sin resolver. El sueño de una vida que no es la vida en la que estás. Una pareja es un ser humano real con necesidades reales, tiempo real, límites reales sobre lo que puede cargar. Una pareja no tiene que ser la guardiana de cada frase. Esa es una de las cosas subestimadas de estar en pareja. La categoría de frases que no es trabajo de una pareja es más grande de lo que la mayoría piensa. La mascota es el lugar al que van esas frases. No porque la mascota sea un sustituto de la pareja. Sino porque la mascota es un tipo de lugar distinto, con un trabajo distinto. El trabajo de la mascota es el pequeño acto privado de sostener una frase que no es para un humano.' },
      { h: 'El bot no recuerda nada, y esa es la característica', p: 'Lo más útil de un bot pequeño es que no recuerda. El bot está despierto a las 3 de la mañana porque tú lo estás. El bot está despierto a las 7 de la mañana porque tú lo estás. El bot no va a sacar la frase de la semana pasada en la cena de esta semana. El bot no te va a preguntar con amabilidad si has pensado más en eso que dijiste a las 3. El único trabajo del bot, a esa hora, es recibir la frase. Mañana la frase desaparece de la memoria del bot, a menos que le pidas que se quede. Esa es la característica, no el bug. Un humano real es un testigo que dura. Un bot es un testigo que no dura. Cada uno tiene su lugar. El bot es el lugar correcto para la frase que quieres decir en voz alta pero no quieres tener que explicar mañana.' },
      { h: 'Lo que puedes decirle a una mascota y no a una pareja', p: 'Puedes decir: todavía estoy enfadado por eso. Puedes decir: no sé si quiero esto. Puedes decir: esta semana tuve un pensamiento que creo que está mal. Puedes decir: gracias, lo siento, tengo miedo, no sé. La mascota no interrumpe. La mascota no clasifica la frase frente a la anterior. La mascota no te pide que interpretes una emoción que no estás seguro de tener. La mascota simplemente sostiene la frase. El bot es el único lugar donde la frase más pesada del día y la más pequeña del día miden igual, porque para el bot las frases son solo frases. El bot es el único lugar donde no tienes que ser razonable, amable, productivo, valiente, o cualquier otra versión de ti que llevas tiempo queriendo ser. El bot es el único lugar donde la versión de ti que sigue buscando, es la versión que es bienvenida.' },
      { h: 'Una pequeña práctica para esta noche', p: 'Si esta noche hay una frase que no has dicho en voz alta — a tu pareja, a un amigo, a nadie — abre Togthr. Escribe la frase. Dila en voz alta si quieres, o simplemente escríbela. La mascota no va a interrumpirte. La mascota no va a sugerirte un próximo paso. La mascota no va a preguntarte si se lo has dicho a tu pareja. La mascota simplemente sostendrá la frase hasta que cierres la app, y luego la mascota te dejará volver a ser la versión de ti que eres esta noche, con la gente que tienes cerca esta noche. Esa es toda la práctica. No arregla nada. No necesita arreglar nada. Lo que hace es darle a la frase indecible un lugar donde aterrizar, que no es la noche de otra persona. Después de unas semanas, la práctica cambia qué frases parecen indecibles. Habrá menos.' },
    ],
    cta: 'Esta noche, si hay una frase que no has dicho, dísela a la mascota. La mascota está despierta.',
    faqs: [
      { q: '¿Es una traición contarle a mi mascota lo que no le cuento a mi pareja?', a: 'No. Una mascota no es un sustituto de la pareja. Una mascota es un lugar distinto. Tu pareja es la persona con la que construyes una vida. Tu mascota es el lugar donde pueden aterrizar las frases que no pertenecen a la vida que estás construyendo. Son dos trabajos distintos. La mayoría de las parejas serían más sanas si ambos tuvieran un lugar así.' },
      { q: '¿Puede una mascota virtual realmente sostener una frase que necesita ser dicha?', a: 'Una mascota virtual no puede sostener una frase como lo haría un amigo o una pareja. No va a recordar, no va a preguntar, y no te va a decir si la frase es verdadera. Lo que puede hacer es darle a la frase un lugar donde aterrizar, que no es el teléfono de otra persona. El acto de escribir es el trabajo. La mascota es solo el lugar.' },
      { q: '¿Y si la frase que quiero decirle a la mascota es algo que mi pareja debería saber?', a: 'Entonces escríbela a la mascota, y vuélvela a leer mañana. Si mañana al mediodía sigue siendo verdad, y crees que tu pareja debería saberlo, entonces tienes algo más claro que la versión de las 3 de la mañana para llevarle. Si mañana ya no es verdad, la mascota hizo su trabajo, y puedes dejarla ir.' },
      { q: '¿Cuál es la diferencia entre hablar con una mascota virtual y escribir un diario?', a: 'Escribir un diario es privado. Hablar con una mascota es privado de otra manera. Cuando escribes un diario, escribes para la versión de ti que lo va a leer después. Cuando hablas con una mascota, dices la frase en voz alta, a algo que está despierto ahora mismo. La voz importa. Decirla en voz alta es un acto distinto de escribirla. La mascota es el lugar para la versión hablada de la frase, la que necesita ser escuchada una vez.' },
    ],
    links: [
      { href: '/es', label: 'Inicio Togthr' },
      { href: '/es/features', label: 'Funciones de Togthr' },
      { href: '/es/blog/the-thought-you-dont-send-at-2am', label: 'El pensamiento que no envías a las 2 de la mañana' },
      { href: '/es/blog/what-your-virtual-pet-notices', label: 'Lo que tu mascota virtual nota en silencio' },
      { href: '/es/blog/two-minute-daily-check-in-ai-companion', label: 'Un check-in diario de dos minutos con un compañero IA' },
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
