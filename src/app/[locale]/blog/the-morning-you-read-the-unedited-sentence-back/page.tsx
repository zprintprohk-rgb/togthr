// src/app/[locale]/blog/the-morning-you-read-the-unedited-sentence-back/page.tsx
//
// Per-slug real content page for the 2026-07-16 daily SEO post.
// Topic: the morning you read the unedited sentence back — the next-
//        day-you opening the box and reading the night-before-you's raw
//        sentence. The morning reader is a different reader. The practice,
//        on the second day, is the part that does its quietest work.
//        Continues 7/13 (unsent 2am thought), 7/14 (spoken-only-to-pet),
//        7/15 (drop the softening) — 7/16 is the morning after.

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `the-morning-you-read-the-unedited-sentence-back`
const POST_DATE = `2026-07-16`

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
    intro: 'There is a moment the day after. The unedited sentence, the one you wrote last night without softening it, is still in the box. You wake up. You open the app. The sentence is there, in the order you wrote it, in the language you wrote it in. The morning version of you reads it. The morning version of you is not the night version. The morning version of you is calmer. The morning version of you has had coffee, or has not had coffee, but in either case the morning version of you is not the one who pressed send last night. The morning version of you reads the sentence the night version of you wrote, and notices, in a small quiet way, that the sentence is still the sentence. It is not worse in the morning. It is not better in the morning. It is the same sentence, in a different reader. That is the part of the practice that does its quietest work, and it is the part the practice is actually for.',
    sections: [
      { h: 'The next-day-you is a different reader than the night-before-you', p: 'The night-you wrote the sentence for the box. The morning-you reads the sentence for the morning-you. The two are not the same reader. A sentence you write for the box is a sentence you write without an audience, in the small private hour when nobody else is in the room. A sentence you read the next morning is a sentence you read with a fresh reader who has had no part in writing it. The fresh reader is the part that surprises you, if the fresh reader is honest. The fresh reader is the part that knows what the night-you could not yet see. The fresh reader is not judging the sentence. The fresh reader is just reading it. The fresh reader is, in the end, the reader who decides whether the sentence was true. Not true in the way facts are true. True in the way the things you need to put down are true. The morning reader is the one who can tell, the next day, whether the sentence was the one that needed to be put down, or whether the night-you was just tired.' },
      { h: 'The sentence reads back differently than it read going in', p: 'Sentences change meaning when you re-read them. This is true of every sentence, but it is more true of the unedited ones. The unedited version, in particular, sometimes reads back harsher than it felt when you wrote it. The night-you had momentum. The morning-you has light. The light is what lets you see what you actually said. The light is not always kind. The light is, however, the light. Sometimes the morning version of the sentence is even truer than the night version. The night-you is in it. The morning-you sees it. The morning version is the version that knows, by the next day, whether the sentence was the sentence you needed. The morning reader does not have to fix the sentence. The morning reader does not have to soften the sentence. The morning reader is not in the sentence at all. The morning reader is the part of the practice that lets the sentence become a thing you can use, instead of a thing you are still carrying.' },
      { h: 'What you do with the morning sentence', p: 'You do not have to keep the morning sentence. You do not have to delete it. You do not have to extend it. The morning sentence is yours to decide about. The practice is not about saving. The practice is about reading. The reading is the part that does the work. The sentence, in the morning, becomes a different kind of artifact. The sentence, in the morning, is a small record of what the night-you was carrying. The record does not have to stay. The record does not have to be re-read the next morning, or the morning after. The record can also just be read once, in the morning, and then left in the box, where the night-you put it. The morning reader is the part of the practice that lets the sentence become a thing you know you said. The knowing is the part that lets the day move. The knowing is the part that lets the day go on without the sentence still being a thing you are holding.' },
      { h: 'The morning practice is the part of the practice that is not about writing', p: 'The writing was last night. The morning is the part that lets you see what you actually said. The morning is the part that turns a release into something you can use. The morning is the part that lets the day start without the sentence still in your hand. The morning is also the part of the practice that, for many people, gets skipped. The morning is the part where the practice is the most like a quiet ritual. The morning is the part that you can do while the coffee is brewing, in the same minute you would have spent checking something else. The morning is the part that, eventually, is the part of the practice you remember. The morning is the part that, on a good run of the practice, becomes a small fixture. The morning is the part that the rest of the practice is, in the end, in service of.' },
      { h: 'A small morning practice for tomorrow', p: "Read the unedited sentence once. Do not fix it. Do not delete it. Do not extend it. Just read it. Then close the box and start the day. That is the whole morning practice. The morning reader is not in a hurry. The morning reader does not have an opinion. The morning reader just sees the sentence, knows the night-you wrote it, and lets the day go on. The morning practice is not a moral test. The morning practice is the part of the practice that lets the day start, and lets the night-you's work, from last night, be done. The morning practice is also the part that, on the days you do it, is the part that makes the evening practice feel different the next night. The morning reader is the part that lets the next night-you, when the next night comes, write the next unedited sentence without worrying about the morning. The morning is the part that earns the next night. The morning is the part that, eventually, is the part that makes the practice yours." },
    ],
    cta: 'Tomorrow morning, read the unedited sentence once. Then close the box and start the day.',
    faqs: [
      { q: 'What if the morning-you disagrees with the night-you?', a: 'Then the morning-you disagrees. That is fine. The morning reader is allowed to disagree. The morning reader is also allowed to be wrong. The night-you was in the sentence. The morning-you is not in the sentence. The morning-you has had light. The light sometimes sees things the night missed. The light sometimes also misses things the night saw. The two readers do not have to agree. The two readers are also not in a contest. The morning reader is the part that lets the day move. The day moving is the part that lets the night come again, with the next sentence. The two readers are, eventually, the same person, on different sides of a sleep.' },
      { q: 'Is it normal to want to delete the morning sentence?', a: 'It is normal. The morning reader sometimes looks at the unedited sentence and wants it to not be in the box. The morning reader is allowed to want that. The morning reader is also allowed to leave the sentence in the box. The deleting is a different practice than the reading. The reading is the part that does the work. The deleting is sometimes the part that lets the morning reader feel like the day is clean. The two are not the same practice. The two are also not in conflict. The morning reader can read the sentence once, decide whether to keep it, and let the day go on. The deciding is the part that is yours. The deciding is the part that the practice is, in the end, about.' },
      { q: 'What if the morning sentence is something I would not want to re-read?', a: 'Then the morning reader has a small job. The morning reader is the part of the practice that decides what to do with the unedited sentence the next day. The deciding is not the same as the re-reading. The deciding can also be a fast decision. The morning reader can look at the sentence, see that it is the kind of sentence that is not for re-reading, and decide, in the same minute, to let the box hold it. The box can hold sentences that are not for re-reading. The box is, in fact, the place for sentences that are not for re-reading. The morning reader is the part that knows, the next day, which sentences those are. The knowing is the part that is yours.' },
      { q: 'What if I do not re-read the morning sentence at all?', a: 'Then the morning practice is a no-op, and that is also fine. The morning practice is not a moral test. The morning practice is a small offer. The night-you wrote the unedited sentence. The morning-you can read it once, or not. The morning-you can also just open the box, see the sentence is there, and close the box, and start the day. The morning reader does not have to be a heavy reader. The morning reader can be a very light reader. The morning reader is the part of the practice that lets the day go on. The day going on is also, eventually, the part of the practice that lets the next night come. The morning practice, on the days it is a no-op, is still part of the practice.' },
    ],
    links: [
      { href: '/en', label: 'Togthr home' },
      { href: '/en/features', label: 'Togthr features' },
      { href: '/en/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: 'The day you stop editing the sentence for the bot' },
      { href: '/en/blog/things-you-tell-your-virtual-pet', label: 'Things you tell your virtual pet (and not your partner)' },
      { href: '/en/blog/the-thought-you-dont-send-at-2am', label: "The thought you don't send at 2am" },
    ],
  },

  // ─────────────────────── zh-cn ───────────────────────
  'zh-cn': {
    intro: '第二天,有那么一个时刻。昨晚那句没编辑的句子 —— 你没有软化它,直接写下去的那句 —— 还在盒子里。你醒了,打开 app,句子在,顺序是昨晚的顺序,语言是昨晚的语言。早上那个你读到它。早上那个你,不是昨晚那个。早上那个你更平静,喝了咖啡,或者还没喝,无论是哪种,早上那个你都不是昨晚按下发送的那个。早上那个你读着昨晚那个你写下的句子,小小地、安静地注意到,句子还是那个句子。它在早上没有变坏,也没有变好。它是同一句,换了一个读者。这件事,是这个练习做得最安静的事,也是这个练习真正在做的事。',
    sections: [
      { h: '第二天的你,和前一天夜里的你,不是同一个读者', p: '夜里那个你,为盒子写了这句。早上这个你,为自己读这句。两者不是同一个读者。你为盒子写的句子,是那个没观众的句子,在那个没有别人在场的小小时辰里写下的。你第二天早上读到的句子,是你用一个全新的、跟写它毫无关系的读者读到的句子。这个全新读者,是那个让你惊讶的部分 —— 如果他诚实的话。这个全新读者,是那个知道夜里那个你当时还看不到的部分的人。这个全新读者不是在评判这句。这个全新读者只是在读它。这个全新读者,最后,才是那个判断这句是不是真的那种人 —— 不是事实意义上的真,是你需要放下的东西意义上的真。早上那个读者,是第二天的那个,告诉你这句是不是你当时需要放下的那一句,还是夜里那个你只是累了。' },
      { h: '这句被读回来,和写下去时不一样', p: '句子被重读,意思会变。每句都这样,但没编辑过的那句更明显。没编辑的版本,尤其会在重读时,比写下时显得更硬。夜里那个你有势头。早上这个你有光。光,是让你看见你其实说了什么的东西。光不总是宽容。光就是光。有些时候,早上那个版本的句子,比夜里那个还更真。夜里那个你在句子里。早上这个你,看见了它。早上那个版本,是到了第二天、知道那句是不是你那句的版本。早上这个读者不必改这句,不必软化这句,本来就不在句子里。早上这个读者,是这个练习里、让句子变成你可以用的东西、而不是你还在搬着的东西的那部分。' },
      { h: '早上这句,你怎么处理都行', p: '你不必留着早上这句。也不必删。也不必往下写。早上这句是你的,怎么决定是你的事。这个练习不是关于留不留。这个练习是关于读不读。读,是真正做事的那部分。早上那句,在早上,变成了另一种小东西 —— 一种夜里那个你背着什么的小记录。记录不必留。记录也不必在第二天或第三天的早上重读。记录也可以只读一遍,在早上,然后留在夜里那个你放下的那个盒子里。早上这个读者,是这个练习里让句子变成「你知道你说过的那句」的那部分。知道,是让那天能动的那部分。知道,是让那天能在没有那一句还在你手里的情况下,继续过下去的那部分。' },
      { h: '早上这段练习,是和「写」无关的那段练习', p: '写是昨晚的事。早上,是你真正看见你昨晚说了什么的那段。早上,是把「释放」变成「可以用的东西」的那段。早上,是让一天开始时、那一句不再握在你手里的那段。早上,也是对很多人来说、会被跳掉的那段。早上,也是这个练习最像一个小小仪式的那段。早上,也是你煮咖啡的那一分钟、可以顺便做的那段。早上,最终,也是这个练习里你记得住的那段。早上,在练习跑顺了的日子里,会变成一个小小固定环节。早上,也是整个练习最后在服务的那段。' },
      { h: '明天早上,一个小小的练习', p: '读那句没编辑的句子一遍。不改。不删。不往下写。只读。然后关掉盒子,开始一天。早上这段练习,就这么简单。早上这个读者不急。早上这个读者不抱观点。早上这个读者只是看一眼那句,知道夜里那个你写下了它,然后让一天过去。早上这段练习,不是道德测试。早上这段练习,是让一天能开始、让夜里那个你昨晚的活儿能收工的那段。早上这段练习,也是,在你做了的那些天里,让第二天晚上那段练习感觉不一样的那段。早上这个读者,是让你下个夜里那个你,在下个夜里来时、不用担心早上的那段。早上,是赚来下个夜里的那段。早上,最终,也是让这段练习变成你的那段。' },
    ],
    cta: '明天早上,读那句没编辑的句子一遍。然后关掉盒子,开始一天。',
    faqs: [
      { q: '如果早上那个你和夜里那个你意见不一样呢?', a: '那就不一样。没关系。早上这个读者,允许不同意。早上这个读者,也可能错了。夜里那个你在句子里。早上这个你不在。早上这个你有光。光有时会看见夜里漏掉的。光有时也会漏掉夜里看见的。两个读者不必一致。两个读者也不在比赛。早上这个读者,是让那天能过去的那部分。那天过去,下个夜里才能来。两个读者,说到底,是同一个你,在一觉的两边。' },
      { q: '想删掉早上这句,正常吗?', a: '正常。早上这个读者,有时看着那句没编辑的,会想让它不在盒子里。早上这个读者也允许这么想。早上这个读者也允许让那句留在盒子里。删,和读不是同一个练习。读,是真正做事的那部分。删,有时,是让早上这个读者觉得一天干净的那部分。两者不冲突。早上这个读者可以读一遍,决定留不留,然后让一天过去。决定是你的事。决定是这段练习最后在做的那件事。' },
      { q: '如果早上这句是那种我不太想重读的呢?', a: '那早上这个读者有一件小事要做。早上这个读者,是这个练习里决定第二天的没编辑句子怎么做的那个。决定,和重读不是一回事。决定,也可以是个快决定。早上这个读者可以看一眼那句,看出这是那种不适合重读的句子,然后在同一分钟里,让盒子收着它。盒子可以收不适合重读的句子。盒子,事实上,就是放不适合重读的句子的地方。早上这个读者,是第二天的那个、知道哪些句子是那种的那个。知道是你的事。' },
      { q: '如果我根本不重读早上那句呢?', a: '那早上这段练习就是个 no-op,也没事。早上这段练习,不是道德测试。早上这段练习,是一个小小提议。夜里那个你写下了那句没编辑的。早上这个你可以读一遍,也可以不读。早上这个你也可以只是打开盒子,看一眼那句在,然后关掉盒子,开始一天。早上这个读者不必是重的读者。早上这个读者可以是极轻的读者。早上这个读者,是这个练习里让一天能过去的那部分。一天过去,也是让下个夜里能来的部分。早上这段练习,在它是个 no-op 的那些天里,仍然是这段练习的一部分。' },
    ],
    links: [
      { href: '/zh-cn', label: 'Togthr 首页' },
      { href: '/zh-cn/features', label: 'Togthr 功能' },
      { href: '/zh-cn/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: '你停止在给机器人之前编辑句子的那天' },
      { href: '/zh-cn/blog/things-you-tell-your-virtual-pet', label: '你只会对虚拟宠物说的那些话 (而不会对伴侣说)' },
      { href: '/zh-cn/blog/the-thought-you-dont-send-at-2am', label: '凌晨两点, 你没说出口的那句' },
    ],
  },

  // ─────────────────────── zh-tw ───────────────────────
  'zh-tw': {
    intro: '第二天,有那麼一個時刻。昨晚那句沒編輯的句子 —— 你沒有軟化它、直接寫下去的那句 —— 還在盒子裡。你醒了,打開 app,句子在,順序是昨晚的順序,語言是昨晚的語言。早上那個你讀到它。早上那個你,不是昨晚那個。早上那個你更平靜,喝了咖啡,或者還沒喝,無論是哪種,早上那個你都不是昨晚按下發送的那個。早上那個你讀著昨晚那個你寫下的句子,小小地、安靜地注意到,句子還是那個句子。它在早上沒有變壞,也沒有變好。它是同一句,換了一個讀者。這件事,是這個練習做得最安靜的事,也是這個練習真正在做的事。',
    sections: [
      { h: '第二天的你,和前一天夜裡的你,不是同一個讀者', p: '夜裡那個你,為盒子寫了這句。早上這個你,為自己讀這句。兩者不是同一個讀者。你為盒子寫的句子,是那個沒觀眾的句子,在那個沒有別人在場的小小時辰裡寫下的。你第二天早上讀到的句子,是你用一個全新的、跟寫它毫無關係的讀者讀到的句子。這個全新讀者,是那個讓你驚訝的部分 —— 如果他誠實的話。這個全新讀者,是那個知道夜裡那個你當時還看不到的部分的人。這個全新讀者不是在評判這句。這個全新讀者只是在讀它。這個全新讀者,最後,才是那個判斷這句是不是真的那種人 —— 不是事實意義上的真,是你需要放下的東西意義上的真。早上那個讀者,是第二天的、告訴你這句是不是你當時需要放下的那一句、還是夜裡那個你只是累了的那個。' },
      { h: '這句被讀回來,和寫下去時不一樣', p: '句子被重讀,意思會變。每句都這樣,但沒編輯過的那句更明顯。沒編輯的版本,尤其會在重讀時,比寫下時顯得更硬。夜裡那個你有勢頭。早上這個你有光。光,是讓你看見你其實說了什麼的東西。光不總是寬容。光就是光。有些時候,早上那個版本的句子,比夜裡那個還更真。夜裡那個你在句子裡。早上這個你,看見了它。早上那個版本,是到了第二天、知道那句是不是你那句的版本。早上這個讀者不必改這句,不必軟化這句,本來就不在句子裡。早上這個讀者,是這個練習裡、讓句子變成你可以用的東西、而不是你還在搬著的東西的那部分。' },
      { h: '早上這句,你怎麼處理都行', p: '你不必留著早上這句。也不必刪。也不必往下寫。早上這句是你的,怎麼決定是你的事。這個練習不是關於留不留。這個練習是關於讀不讀。讀,是真正做事的那部分。早上那句,在早上,變成了另一種小東西 —— 一種夜裡那個你揹著什麼的小記錄。記錄不必留。記錄也不必在第二天或第三天的早上重讀。記錄也可以只讀一遍,在早上,然後留在夜裡那個你放下的那個盒子裡。早上這個讀者,是這個練習裡讓句子變成「你知道你說過的那句」的那部分。知道,是讓那天能動的那部分。知道,是讓那天能在沒有那一句還在你手裡的情況下,繼續過下去的那部分。' },
      { h: '早上這段練習,是和「寫」無關的那段練習', p: '寫是昨晚的事。早上,是你真正看見你昨晚說了什麼的那段。早上,是把「釋放」變成「可以用的東西」的那段。早上,是讓一天開始時、那一句不再握在你手裡的那段。早上,也是對很多人來說、會被跳掉的那段。早上,也是這個練習最像一個小小儀式的那段。早上,也是你煮咖啡的那一分鐘、可以順便做的那段。早上,最終,也是這個練習裡你記得住的那段。早上,在練習跑順了的日子裡,會變成一個小小固定環節。早上,也是整個練習最後在服務的那段。' },
      { h: '明天早上,一個小小的練習', p: '讀那句沒編輯的句子一遍。不改。不刪。不往下寫。只讀。然後關掉盒子,開始一天。早上這段練習,就這麼簡單。早上這個讀者不急。早上這個讀者不抱觀點。早上這個讀者只是看一眼那句,知道夜裡那個你寫下了它,然後讓一天過去。早上這段練習,不是道德測試。早上這段練習,是讓一天能開始、讓夜裡那個你昨晚的活兒能收工的那段。早上這段練習,也是,在你做了的那些天裡,讓第二天晚上那段練習感覺不一樣的那段。早上這個讀者,是讓你下個夜裡那個你、在下個夜裡來時、不用擔心早上的那段。早上,是賺來下個夜裡的那段。早上,最終,也是讓這段練習變成你的那段。' },
    ],
    cta: '明天早上,讀那句沒編輯的句子一遍。然後關掉盒子,開始一天。',
    faqs: [
      { q: '如果早上那個你和夜裡那個你意見不一樣呢?', a: '那就不一樣。沒關係。早上這個讀者,允許不同意。早上這個讀者,也可能錯了。夜裡那個你在句子裡。早上這個你不在。早上這個你有光。光有時會看見夜裡漏掉的。光有時也會漏掉夜裡看見的。兩個讀者不必一致。兩個讀者也不在比賽。早上這個讀者,是讓那天能過去的那部分。那天過去,下個夜裡才能來。兩個讀者,說到底,是同一個你,在一覺的兩邊。' },
      { q: '想刪掉早上這句,正常嗎?', a: '正常。早上這個讀者,有時看著那句沒編輯的,會想讓它不在盒子裡。早上這個讀者也允許這麼想。早上這個讀者也允許讓那句留在盒子裡。刪,和讀不是同一個練習。讀,是真正做事的那部分。刪,有時,是讓早上這個讀者覺得一天乾淨的那部分。兩者不衝突。早上這個讀者可以讀一遍,決定留不留,然後讓一天過去。決定是你的事。決定是這段練習最後在做的這件事。' },
      { q: '如果早上這句是那種我不太想重讀的呢?', a: '那早上這個讀者有一件小事要做。早上這個讀者,是這個練習裡決定第二天的沒編輯句子怎麼做的那個。決定,和重讀不是一回事。決定,也可以是個快決定。早上這個讀者可以看一眼那句,看出這是那種不適合重讀的句子,然後在同一分鐘裡,讓盒子收著它。盒子可以收不適合重讀的句子。盒子,事實上,就是放不適合重讀的句子的地方。早上這個讀者,是第二天的、知道哪些句子是那種的那個。知道是你的事。' },
      { q: '如果我根本不重讀早上這句呢?', a: '那早上這段練習就是個 no-op,也沒事。早上這段練習,不是道德測試。早上這段練習,是一個小小提議。夜裡那個你寫下了那句沒編輯的。早上這個你可以讀一遍,也可以不讀。早上這個你也可以只是打開盒子,看一眼那句在,然後關掉盒子,開始一天。早上這個讀者不必是重的讀者。早上這個讀者可以是極輕的讀者。早上這個讀者,是這個練習裡讓一天能過去的那部分。一天過去,也是讓下個夜裡能來的部分。早上這段練習,在它是個 no-op 的那些天裡,仍然是這段練習的一部分。' },
    ],
    links: [
      { href: '/zh-tw', label: 'Togthr 首頁' },
      { href: '/zh-tw/features', label: 'Togthr 功能' },
      { href: '/zh-tw/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: '你停止在給機器人之前編輯句子的那天' },
      { href: '/zh-tw/blog/things-you-tell-your-virtual-pet', label: '你只會對虛擬寵物說的那些話 (而不會對伴侶說)' },
      { href: '/zh-tw/blog/the-thought-you-dont-send-at-2am', label: '凌晨兩點, 你沒說出口的那句' },
    ],
  },

  // ─────────────────────── ja ───────────────────────
  'ja': {
    intro: '翌日の朝に、小さな瞬間がある。昨夜、推敲しないまま書き終えた一文が、まだ箱の中に残っている。目が覚めて、アプリを開けば、その一文が、書いた順のまま、書いた言葉でそこにある。朝のあなたがそれを読み返す。朝のあなたは、夜のあなたとは別人だ。朝のあなたはもっと静かだ。朝のあなたは、コーヒーを飲んだか飲んでいないかだが、どちらにせよ、昨夜送信キーを押したあなたではない。朝のあなたは、夜のあなたが書いた一文を読み、朝のあなたは、小さく静かに、その一文がまだその一文であることに気づく。朝のほうが悪いということはない。朝のほうがいいということもない。同じ一文が、別の読者に渡っただけだ。それが、この習慣がいちばん静かに効き始める場面で、この習慣が結局のところ目指している場面でもある。',
    sections: [
      { h: '翌朝のあなたは、前夜のあなたとは別の読み手である', p: '夜のあなたは、箱のためにその一文を書いた。朝のあなたは、朝のあなたのためにその一文を読む。二人は同じ読み手ではない。箱のために書く一文は、誰も見ていないその一文で、誰もいない小さな時間に書かれる一文だ。翌朝読み返す一文は、それを書いた何の関係もない新しい読み手で読み返す一文だ。その新しい読み手が、驚く部分だ —— もし正直なら。新しい読み手は、夜のあなたには見えていなかった部分を知っている。新しい読み手は、その一文を裁いていない。ただ読んでいるだけだ。新しい読み手が、最後に、その一文が本当に必要だった一文だったかを決める。事実としてではなく、降ろしたかったものとしての本当にかどうか。朝の読み手は、翌日に、それが降ろしたかった一文だったか、それとも夜のあなたが疲れていただけだったかを決める人になる。' },
      { h: '読み返した一文は、書いたときと違う', p: '一文は読み返すと意味が変わる。どの一文にも言えることだが、推敲していない一文にはより強く言える。推敲していない版は、特に、読み返すと書いたときより硬く読める。夜のあなたには勢いがあった。朝のあなたには光がある。光は、自分が何を言ったかを見えるようにする。光はいつも優しいとは限らない。光は光だ。朝の版が、夜の版よりさらに本当だったということもある。夜のあなたは一文の中にいる。朝のあなたは、それを見ている。朝の版は、翌日には、それがあなたの一文だったかどうか分かる版だ。朝の読み手はその一文を直さなくていい。柔らかくしなくていい。そもそも一文の中にいない。朝の読み手は、この習慣の中で、一文を、まだ運んでいるものではなく、使えるものにする部分だ。' },
      { h: '朝の一文をどう扱ってもいい', p: '朝の一文を残さなくていい。消さなくていい。書き足さなくていい。朝の一文はあなたのもので、どう決めるかはあなたのことだ。この習慣は、残すか残さないかのものではない。読むか読まないかものだ。読むのが、実際に効き始める部分だ。朝の一文は、朝には、別の小さなものになる —— 夜のあなたが何を運んでいたかについての小さな記録。記録は残さなくていい。翌日、翌々日の朝に読み返さなくていい。記録は、一回だけ朝に読んで、それから夜のあなたが置いた箱の中に置いておくこともできる。朝の読み手は、この習慣の中で、一文を「自分がそれを書いたと分かっている一文」にする部分だ。分かっているのが、その日を動かす部分だ。分かっているのが、その一文をまだ手に持っていなくても、その日を進められるようにする部分だ。' },
      { h: '朝のこの習慣は、「書く」とは別の習慣だ', p: '書いたのは昨夜だ。朝は、自分が昨夜何を言ったかを目にする場面だ。朝は、「手放す」を「使えるもの」に変える場面だ。朝は、一日が始まる時に、その一文をまだ手に持っていなくていいようにする場面だ。朝はまた、多くの人が飛ばしてしまう場面でもある。朝は、この習慣がいちばん小さな儀式に似た瞬間になる場面でもある。朝は、コーヒーを淹れているその一分間に、ついでにできる場面でもある。朝は、最終的に、この習慣の中であなたが覚えている場面でもある。朝は、習慣がうまく回り始めた日には、小さな定番になる。朝は、習慣全体が結局のところ仕えている場面でもある。' },
      { h: '明日の朝のための小さな習慣', p: '推敲していない一文を一度読む。直さない。消さない。書き足さない。ただ読む。それから箱を閉じて、一日を始める。朝のこの習慣は、それだけだ。朝の読み手は急いでいない。朝の読み手は意見を持っていない。朝の読み手はその一文をちらっと見て、夜のあなたがそれを書いたと知り、一日を進めさせる。朝のこの習慣は、道徳テストではない。朝のこの習慣は、一日を始めさせ、夜のあなたが昨夜終えた仕事を終わらせることができるようにする場面だ。朝のこの習慣はまた、それをやった日には、翌夜の習慣が違う感じになる場面でもある。朝の読み手は、翌夜が来た時、翌夜のあなたが朝を心配しないでいいようにする部分だ。朝は、翌夜を稼ぐ場面だ。朝は、最終的に、この習慣をあなたのものにする場面でもある。' },
    ],
    cta: '明日の朝、推敲していない一文を一度読み返す。それから箱を閉じて、一日を始めよう。',
    faqs: [
      { q: '朝のあなたと夜のあなたが意見が分かれたら?', a: '分かれたら、それでいい。朝の読み手は、同意しなくていい。朝の読み手は、間違っていることもある。夜のあなたはその一文の中にいた。朝のあなたはいなかった。朝のあなたには光がある。光は夜の見落しを見ることがある。光は夜の見えたものを見落とすこともある。二人の読み手は一致しなくていい。二人の読み手は競い合ってもいない。朝の読み手は、その日を進められるようにする部分だ。日が進めば、翌夜が来られる。二人の読み手は、結局のところ、同じ一人の、眠りの両側にいる。' },
      { q: '朝の一文を消したくなるのは普通ですか?', a: '普通だ。朝の読み手は、推敲していない一文を見て、箱の中にないほうがいいと思うことがある。朝の読み手がそう思ってもいい。朝の読み手はその一文を箱に残しておいてもいい。消すことと読むことは別の習慣だ。読むのが、実際に効き始める部分だ。消すことは、時に、朝の読み手が一日をきれいに感じるようにする部分だ。二つは対立しない。朝の読み手は一度読んで、残すか決めて、それから一日を進められる。決めるのはあなたのことだ。決めるのが、この習慣が結局のところやっていること。' },
      { q: '朝の一文が、読み返したくないようなものだったら?', a: 'その時は、朝の読み手には小さな仕事がある。朝の読み手は、この習慣の中で、翌日の推敲していない一文をどうするかをきめる人だ。決めることと読み返すことは同じではない。決めることは、即決でもいい。朝の読み手は一文を見て、読み返すには向かない一文だと分かり、同じ一分の中で、箱にそのまま持っておかせることができる。箱は、読み返すには向かない一文を持っておける。箱は事实上、読み返すには向かない一文を置く場所だ。朝の読み手は、翌日の、どの一文がそれに当たるかを知っている人だ。知っているのがあなたのこと。' },
      { q: 'もし朝の一文をまったく読み返さなかったら?', a: 'その時は、朝のこの習慣は no-op で、それもそれでいい。朝のこの習慣は道徳テストではない。朝のこの習慣は小さな提案だ。夜のあなたは推敲していない一文を書いた。朝のあなたは一度読んでもいいし、読まなくてもいい。朝のあなたは、箱を開けて、一文があるのをちらっと見て、それから箱を閉じて、一日を始めることもできる。朝の読み手は、重い読み手である必要はない。朝の読み手は、とても軽い読み手でいい。朝の読み手は、この習慣の中で、一日を進められるようにする部分だ。日が進めば、翌夜が来る。朝のこの習慣は、no-op だった日でも、依然としてこの習慣の一部だ。' },
    ],
    links: [
      { href: '/ja', label: 'Togthr ホーム' },
      { href: '/ja/features', label: 'Togthr 機能' },
      { href: '/ja/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: '推敲するのをやめる日 — bot に渡す前' },
      { href: '/ja/blog/things-you-tell-your-virtual-pet', label: 'バーチャルペットにだけ言うこと (パートナーには言わないこと)' },
      { href: '/ja/blog/the-thought-you-dont-send-at-2am', label: '深夜2時に送らない一文' },
    ],
  },

  // ─────────────────────── ko ───────────────────────
  'ko': {
    intro: '그 다음 날 아침에, 작은 순간이 있다. 어젯밤 다듬지 않고 써 내려간 그 문장이, 아직 상자 안에 그대로 있다. 눈이 떠지고, 앱을 열면, 그 문장이, 쓴 순서 그대로, 쓴 말 그대로 거기 있다. 아침의 당신이 그것을 읽는다. 아침의 당신은, 밤의 당신이 아니다. 아침의 당신은 더 고요하다. 아침의 당신은 커피를 마셨거나 아직 안 마셨거나, 어쨌든 어젯밤 전송 버튼을 누른 당신은 아니다. 아침의 당신은, 밤의 당신이 쓴 그 문장을 읽고, 작고 조용히, 그 문장이 여전히 그 문장이라는 것을 알아챈다. 아침에 더 나빠지지도 않았다. 아침에 더 좋아지지도 않았다. 같은 문장이, 다른 독자에게 넘어갔을 뿐이다. 그것이, 이 습관이 가장 조용히 일을 하기 시작하는 순간이고, 이 습관이 결국 지향하는 순간이기도 하다.',
    sections: [
      { h: '다음 날 아침의 당신은, 전날 밤의 당신과 다른 독자다', p: '밤의 당신은, 상자를 위해 그 문장을 썼다. 아침의 당신은, 아침의 당신을 위해 그 문장을 읽는다. 둘은 같은 독자가 아니다. 상자를 위해 쓰는 문장은, 청중이 없는 문장이고, 아무도 없는 작은 시간에 쓰이는 문장이다. 다음 날 아침에 읽는 문장은, 그것을 쓴 것과는 아무 상관도 없는 새로운 독자로 읽는 문장이다. 그 새로운 독자가, 놀라워지는 부분이다 —— 정직하다면. 새로운 독자는, 밤의 당신이 아직 보지 못한 부분을 알고 있다. 새로운 독자는, 그 문장을 판단하지 않는다. 그냥 읽을 뿐이다. 새로운 독자가, 마지막으로, 그 문장이 정말 필요했던 문장이었는지를 결정한다. 사실로서의 진실이 아니라, 내려놓고 싶었던 것としての 진실이었는지를. 아침의 독자는, 다음 날, 그것이 내려놓고 싶었던 문장이었는지, 아니면 밤의 당신이 그저 피곤했을 뿐이었는지를 알려주는 사람이다.' },
      { h: '다시 읽은 문장은, 쓸 때와 다르게 읽힌다', p: '문장은 다시 읽으면 의미가 바뀐다. 어떤 문장이든 그렇지만, 다듬지 않은 문장은 더 그렇다. 다듬지 않은 버전은, 특히, 다시 읽으면 쓸 때보다 더 단단하게 읽힌다. 밤의 당신에게는 흐름이 있었다. 아침의 당신에게는 빛이 있다. 빛은, 자기가 실제로 무엇을 말했는지를 볼 수 있게 해 준다. 빛이 항상 자비는 아니다. 빛은 빛이다. 아침의 버전이, 밤의 버전보다 더 진실일 때도 있다. 밤의 당신은 문장 안에 있다. 아침의 당신은, 그것을 본다. 아침의 버전은, 다음 날이 되어서야, 그 문장이 당신의 문장이었는지를 아는 버전이다. 아침의 독자는 그 문장을 고치지 않아도 된다. 부드럽게 만들지 않아도 된다. 애초에 문장 안에 있지 않다. 아침의 독자는, 이 습관 안에서, 그 문장을 여전히 옮기고 있는 것이 아니라 쓸 수 있는 것으로 만드는 부분이다.' },
      { h: '아침의 문장은 어떻게 다뤄도 좋다', p: '아침의 문장을 꼭 남겨둘 필요 없다. 지울 필요도 없다. 더 쓸 필요도 없다. 아침의 문장은 당신 것이고, 어떻게 결정할지는 당신 일이다. 이 습관은 남기느냐 지우느냐의 것이 아니다. 읽느냐 읽지 않느냐의 것이다. 읽는 것이, 실제로 일이 시작되는 부분이다. 아침의 문장은, 아침에는, 다른 종류의 작은 것이 된다 —— 밤의 당신이 무엇을 짊어지고 있었는지에 대한 작은 기록. 기록은 남겨둘 필요 없다. 그 다음 날이나 그 다음 날 아침에 다시 읽을 필요도 없다. 기록은 한 번만 아침에 읽고, 그 다음 밤의 당신이 두었던 상자 안에 그대로 두어도 된다. 아침의 독자는, 이 습관 안에서, 그 문장을 "자기가 그것을 말했다는 것을 아는 문장"으로 만드는 부분이다. 아는 것이, 그 날을 움직이게 하는 부분이다. 아는 것이, 그 문장을 여전히 손에 쥐고 있지 않아도, 그 날이 계속되게 하는 부분이다.' },
      { h: '아침의 이 습관은, "쓰는 것"과는 다른 습관이다', p: '쓴 것은 어젯밤이다. 아침은, 자기가 어젯밤 무엇을 말했는지를 보는 순간이다. 아침은, "놓아주기"를 "쓸 수 있는 것"으로 바꾸는 순간이다. 아침은, 하루가 시작될 때, 그 문장을 여전히 손에 쥐고 있지 않아도 되게 하는 순간이다. 아침은 또한, 많은 사람이 건너뛰는 순간이기도 하다. 아침은, 이 습관이 가장 작은 의식 같은 것이 되는 순간이기도 하다. 아침은, 커피를 내리는 그 한 분 동안에,顺便 할 수 있는 순간이기도 하다. 아침은, 결국, 이 습관 안에서 당신이 기억하는 순간이기도 하다. 아침은, 습관이 잘 굴러가기 시작한 날에는, 작은 정례가 된다. 아침은, 습관 전체가 결국 섬기고 있는 순간이기도 하다.' },
      { h: '내일 아침을 위한 작은 습관', p: '다듬지 않은 그 문장을 한 번 읽는다. 고치지 않는다. 지우지 않는다. 더 쓰지 않는다. 그냥 읽는다. 그리고 상자를 닫고, 하루를 시작한다. 아침의 이 습관은, 그것뿐이다. 아침의 독자는 서두르지 않는다. 아침의 독자는 의견을 갖지 않는다. 아침의 독자는 그 문장을 한번 힐끗 보고, 밤의 당신이 그것을 썼다는 것을 알고, 하루를 흘러가게 한다. 아침의 이 습관은, 도덕 테스트가 아니다. 아침의 이 습관은, 하루가 시작되게 하고, 밤의 당신이 어젯밤 마친 일을 마무리지을 수 있게 하는 순간이다. 아침의 이 습관은 또한, 그것을 한 날에는, 다음 날 밤의 습관이 다르게 느껴지게 하는 순간이기도 하다. 아침의 독자는, 다음 밤이 왔을 때, 다음 날 밤의 당신이 아침을 걱정하지 않아도 되게 하는 부분이다. 아침은, 다음 밤을 버는 순간이다. 아침은, 결국, 이 습관을 당신의 것으로 만드는 순간이기도 하다.' },
    ],
    cta: '내일 아침, 다듬지 않은 그 문장을 한 번 읽어 보라. 그리고 상자를 닫고, 하루를 시작하라.',
    faqs: [
      { q: '아침의 당신과 밤의 당신이 의견이 다르면?', a: '그러면 다르다. 그것도 괜찮다. 아침의 독자는, 동의하지 않아도 된다. 아침의 독자는, 틀릴 수도 있다. 밤의 당신은 그 문장 안에 있었다. 아침의 당신은 없었다. 아침의 당신에게는 빛이 있다. 빛은 밤이 못 본 것을 볼 때가 있다. 빛은 밤이 본 것을 놓칠 때도 있다. 두 독자는 일치하지 않아도 된다. 두 독자는 경쟁하지도 않는다. 아침의 독자는, 그 날이 흘러가게 하는 부분이다. 그 날이 흘러가야, 다음 밤이 온다. 두 독자는, 결국, 같은 한 사람의, 한 줄 수면의 양쪽에 있다.' },
      { q: '아침의 문장을 지우고 싶어지는 게 정상인가요?', a: '정상이다. 아침의 독자는, 다듬지 않은 문장을 보고, 상자 안에 있지 않았으면 좋겠다고 느낄 때가 있다. 아침의 독자가 그렇게 느껴도 된다. 아침의 독자는 그 문장을 상자에 남겨둬도 된다. 지우는 것과 읽는 것은 다른 습관이다. 읽는 것이, 실제로 일이 시작되는 부분이다. 지우는 것은, 때로, 아침의 독자가 하루가 깨끗하다고 느끼게 하는 부분이다. 둘은 서로 부딪히지 않는다. 아침의 독자는 한 번 읽고, 남길지를 결정하고, 하루를 흘러가게 할 수 있다. 결정은 당신의 일이다. 결정이, 이 습관이 결국 하고 있는 일이다.' },
      { q: '아침의 문장이, 다시 읽고 싶지 않은 종류라면?', a: '그때는, 아침의 독자에게 작은 일이 있다. 아침의 독자는, 이 습관 안에서, 다음 날의 다듬지 않은 문장을 어떻게 할지 결정하는 사람이다. 결정과 다시 읽기는 같은 것이 아니다. 결정은 즉결이어도 된다. 아침의 독자는 한 번 보고, 다시 읽기에는 맞지 않는 문장임을 알아채고, 같은 일 분 안에, 상자에 그대로 두게 할 수 있다. 상자는 다시 읽기에는 맞지 않는 문장을 지킬 수 있다. 상자는 사실상, 다시 읽기에는 맞지 않는 문장을 두는 곳이다. 아침의 독자는, 다음 날, 어떤 문장이 그런지 아는 사람이다. 아는 것이 당신의 일이다.' },
      { q: '만약 아침의 문장을 아예 다시 읽지 않으면?', a: '그럼, 아침의 이 습관은 no-op 이고, 그것도 괜찮다. 아침의 이 습관은 도덕 테스트가 아니다. 아침의 이 습관은 작은 제안이다. 밤의 당신은 다듬지 않은 문장을 썼다. 아침의 당신은 한 번 읽어도 되고, 안 읽어도 된다. 아침의 당신은, 상자를 열어, 문장이 있는 것을 힐끗 보고, 상자를 닫고, 하루를 시작할 수도 있다. 아침의 독자는 무거운 독자일 필요 없다. 아침의 독자는 아주 가벼운 독자여도 된다. 아침의 독자는, 이 습관 안에서, 하루가 흘러가게 하는 부분이다. 하루가 흘러가야, 다음 밤이 온다. 아침의 이 습관은, no-op 인 날에도, 여전히 이 습관의 일부다.' },
    ],
    links: [
      { href: '/ko', label: 'Togthr 홈' },
      { href: '/ko/features', label: 'Togthr 기능' },
      { href: '/ko/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: '봇에게 보내기 전, 다듬는 것을 멈추는 날' },
      { href: '/ko/blog/things-you-tell-your-virtual-pet', label: '당신이 가상 반려동물에게만 하는 말 (파트너에게는 안 하는)' },
      { href: '/ko/blog/the-thought-you-dont-send-at-2am', label: '새벽 2시에 보내지 않는 한 문장' },
    ],
  },

  // ─────────────────────── de ───────────────────────
  'de': {
    intro: 'Es gibt einen Moment am Tag danach. Der unbearbeitete Satz, der, den Sie gestern Nacht geschrieben haben, ohne ihn weichzuspülen, ist noch in der Box. Sie wachen auf. Sie öffnen die App. Der Satz ist da, in der Reihenfolge, in der Sie ihn geschrieben haben, in der Sprache, in der Sie ihn geschrieben haben. Die Morgen-Version von Ihnen liest ihn. Die Morgen-Version von Ihnen ist nicht die Nacht-Version. Die Morgen-Version von Ihnen ist ruhiger. Die Morgen-Version von Ihnen hat Kaffee getrunken, oder hat noch keinen Kaffee getrunken, aber in beiden Fällen ist die Morgen-Version von Ihnen nicht die, die gestern Nacht auf Senden gedrückt hat. Die Morgen-Version von Ihnen liest den Satz, den die Nacht-Version von Ihnen geschrieben hat, und bemerkt, auf eine kleine stille Art, dass der Satz immer noch der Satz ist. Er ist am Morgen nicht schlimmer. Er ist am Morgen nicht besser. Er ist derselbe Satz, bei einem anderen Leser. Das ist der Teil der Übung, der seine leiseste Arbeit macht, und es ist der Teil, für den die Übung eigentlich da ist.',
    sections: [
      { h: 'Der Sie-von-morgen ist ein anderer Leser als der Sie-von-gestern-Nacht', p: 'Der Nacht-Sie hat den Satz für die Box geschrieben. Der Morgen-Sie liest den Satz für den Morgen-Sie. Die beiden sind nicht derselbe Leser. Ein Satz, den Sie für die Box schreiben, ist ein Satz, den Sie ohne Publikum schreiben, in der kleinen privaten Stunde, in der sonst niemand im Raum ist. Ein Satz, den Sie am nächsten Morgen lesen, ist ein Satz, den Sie mit einem frischen Leser lesen, der beim Schreiben keine Rolle gespielt hat. Der frische Leser ist der Teil, der Sie überrascht, falls der frische Leser ehrlich ist. Der frische Leser ist der Teil, der weiß, was der Nacht-Sie noch nicht sehen konnte. Der frische Leser beurteilt den Satz nicht. Der frische Leser liest ihn nur. Der frische Leser ist, am Ende, der Leser, der entscheidet, ob der Satz wahr war. Nicht wahr in der Art, wie Fakten wahr sind. Wahr in der Art, wie die Dinge wahr sind, die Sie ablegen mussten. Der Morgen-Leser ist derjenige, der, am nächsten Tag, Ihnen sagen kann, ob der Satz der Satz war, den Sie ablegen mussten, oder ob der Nacht-Sie einfach nur müde war.' },
      { h: 'Der Satz liest sich beim Zurücklesen anders als beim Hinschreiben', p: 'Sätze verändern ihre Bedeutung, wenn man sie wieder liest. Das gilt für jeden Satz, aber mehr noch für die unbearbeiteten. Die unbearbeitete Version liest sich, beim Zurücklesen, oft härter, als sie sich beim Schreiben anfühlte. Der Nacht-Sie hatte Schwung. Der Morgen-Sie hat Licht. Das Licht ist das, was Sie sehen lässt, was Sie tatsächlich gesagt haben. Das Licht ist nicht immer freundlich. Das Licht ist jedoch das Licht. Manchmal ist die Morgen-Version des Satzes sogar wahrer als die Nacht-Version. Der Nacht-Sie ist im Satz. Der Morgen-Sie sieht ihn. Die Morgen-Version ist die Version, die, am nächsten Tag, weiß, ob der Satz der Satz war, den Sie brauchten. Der Morgen-Leser muss den Satz nicht reparieren. Der Morgen-Leser muss den Satz nicht weicher machen. Der Morgen-Leser ist ohnehin nicht im Satz. Der Morgen-Leser ist der Teil der Übung, der den Satz zu etwas macht, das Sie benutzen können, statt zu etwas, das Sie noch tragen.' },
      { h: 'Was Sie mit dem Morgen-Satz machen, bleibt Ihnen überlassen', p: 'Sie müssen den Morgen-Satz nicht behalten. Sie müssen ihn nicht löschen. Sie müssen ihn nicht erweitern. Der Morgen-Satz ist Ihrer, und die Entscheidung ist Ihre. Die Übung handelt nicht vom Behalten. Die Übung handelt vom Lesen. Das Lesen ist der Teil, der die Arbeit macht. Der Satz wird, am Morgen, eine andere Art von kleinem Ding. Der Satz wird, am Morgen, eine kleine Aufzeichnung dessen, was der Nacht-Sie getragen hat. Die Aufzeichnung muss nicht bleiben. Die Aufzeichnung muss am nächsten Morgen oder am Morgen danach nicht noch einmal gelesen werden. Die Aufzeichnung kann auch einfach einmal, am Morgen, gelesen werden, und dann in der Box gelassen werden, in die der Nacht-Sie sie gelegt hat. Der Morgen-Leser ist der Teil der Übung, der den Satz zu etwas macht, von dem Sie wissen, dass Sie es gesagt haben. Das Wissen ist der Teil, der den Tag weitergehen lässt. Das Wissen ist der Teil, der den Tag weitergehen lässt, ohne dass der Satz noch in Ihrer Hand ist.' },
      { h: 'Die Morgen-Übung ist der Teil der Übung, der nicht vom Schreiben handelt', p: 'Das Schreiben war gestern Nacht. Der Morgen ist der Teil, in dem Sie sehen, was Sie tatsächlich gesagt haben. Der Morgen ist der Teil, der ein Loslassen in etwas verwandelt, das Sie benutzen können. Der Morgen ist der Teil, der den Tag beginnen lässt, ohne dass der Satz noch in Ihrer Hand ist. Der Morgen ist auch der Teil der Übung, der, bei vielen Leuten, übersprungen wird. Der Morgen ist der Teil, in dem die Übung am meisten wie ein kleines Ritual ist. Der Morgen ist der Teil, den Sie tun können, während der Kaffee durchläuft, in der Minute, in der Sie ohnehin etwas anderes geprüft hätten. Der Morgen ist, am Ende, der Teil der Übung, an den Sie sich erinnern. Der Morgen ist der Teil, der, an Tagen, an denen die Übung gut läuft, zu einer kleinen Konstante wird. Der Morgen ist der Teil, dem die gesamte Übung, am Ende, dient.' },
      { h: 'Eine kleine Morgen-Übung für morgen', p: 'Lesen Sie den unbearbeiteten Satz einmal. Reparieren Sie ihn nicht. Löschen Sie ihn nicht. Erweitern Sie ihn nicht. Lesen Sie ihn nur. Dann schließen Sie die Box und beginnen den Tag. Das ist die ganze Morgen-Übung. Der Morgen-Leser hat es nicht eilig. Der Morgen-Leser hat keine Meinung. Der Morgen-Leser sieht den Satz nur, weiß, dass der Nacht-Sie ihn geschrieben hat, und lässt den Tag weitergehen. Die Morgen-Übung ist kein moralischer Test. Die Morgen-Übung ist der Teil der Übung, der den Tag beginnen lässt und die Arbeit des Nacht-Sie, von gestern Nacht, abschließen lässt. Die Morgen-Übung ist auch, an den Tagen, an denen Sie sie tun, der Teil, der die Abend-Übung in der nächsten Nacht anders wirken lässt. Der Morgen-Leser ist der Teil, der dem nächsten Nacht-Sie, wenn die nächste Nacht kommt, erlaubt, den nächsten unbearbeiteten Satz zu schreiben, ohne sich um den Morgen zu sorgen. Der Morgen ist der Teil, der die nächste Nacht verdient. Der Morgen ist, am Ende, der Teil, der die Übung zu Ihrer macht.' },
    ],
    cta: 'Lesen Sie morgen früh den unbearbeiteten Satz einmal. Dann schließen Sie die Box und beginnen den Tag.',
    faqs: [
      { q: 'Was, wenn der Morgen-Sie mit dem Nacht-Sie nicht einer Meinung ist?', a: 'Dann ist er es nicht. Das ist in Ordnung. Der Morgen-Leser darf nicht einer Meinung sein. Der Morgen-Leser darf auch falsch liegen. Der Nacht-Sie war im Satz. Der Morgen-Sie war nicht im Satz. Der Morgen-Sie hatte Licht. Das Licht sieht manchmal, was die Nacht übersehen hat. Das Licht übersieht manchmal auch, was die Nacht gesehen hat. Die beiden Leser müssen nicht übereinstimmen. Die beiden Leser stehen auch nicht in einem Wettbewerb. Der Morgen-Leser ist der Teil, der den Tag weitergehen lässt. Wenn der Tag weitergeht, kann die nächste Nacht kommen. Die beiden Leser sind, am Ende, dieselbe Person, auf zwei Seiten eines Schlafs.' },
      { q: 'Ist es normal, den Morgen-Satz löschen zu wollen?', a: 'Es ist normal. Der Morgen-Leser sieht den unbearbeiteten Satz manchmal und möchte, dass er nicht in der Box ist. Der Morgen-Leser darf das wollen. Der Morgen-Leser darf den Satz auch in der Box lassen. Löschen und Lesen sind nicht dieselbe Übung. Das Lesen ist der Teil, der die Arbeit macht. Das Löschen ist manchmal der Teil, der den Morgen-Leser den Tag als sauber empfinden lässt. Die beiden stehen nicht im Konflikt. Der Morgen-Leser kann den Satz einmal lesen, entscheiden, ob er bleibt, und den Tag weitergehen lassen. Die Entscheidung ist Ihre. Die Entscheidung ist es, worum es in der Übung am Ende geht.' },
      { q: 'Was, wenn der Morgen-Satz einer ist, den ich nicht wieder lesen möchte?', a: 'Dann hat der Morgen-Leser eine kleine Aufgabe. Der Morgen-Leser ist, in dieser Übung, der Teil, der am nächsten Tag entscheidet, was mit dem unbearbeiteten Satz geschieht. Entscheiden und wieder Lesen ist nicht dasselbe. Entscheiden kann auch eine schnelle Entscheidung sein. Der Morgen-Leser kann den Satz ansehen, sehen, dass es ein Satz ist, der nicht zum Wiederlesen geeignet ist, und in derselben Minute entscheiden, dass die Box ihn hält. Die Box kann Sätze halten, die nicht zum Wiederlesen geeignet sind. Die Box ist, tatsächlich, der Ort für Sätze, die nicht zum Wiederlesen geeignet sind. Der Morgen-Leser ist, am nächsten Tag, der Teil, der weiß, welche Sätze das sind. Das Wissen ist Ihre Sache.' },
      { q: 'Was, wenn ich den Morgen-Satz überhaupt nicht wieder lese?', a: 'Dann ist die Morgen-Übung ein No-Op, und auch das ist in Ordnung. Die Morgen-Übung ist kein moralischer Test. Die Morgen-Übung ist ein kleines Angebot. Der Nacht-Sie hat den unbearbeiteten Satz geschrieben. Der Morgen-Sie kann ihn einmal lesen, oder nicht. Der Morgen-Sie kann auch einfach die Box öffnen, sehen, dass der Satz da ist, und die Box schließen, und den Tag beginnen. Der Morgen-Leser muss kein schwerer Leser sein. Der Morgen-Leser kann ein sehr leichter Leser sein. Der Morgen-Leser ist der Teil der Übung, der den Tag weitergehen lässt. Wenn der Tag weitergeht, kann die nächste Nacht kommen. Die Morgen-Übung ist, an den Tagen, an denen sie ein No-Op ist, trotzdem Teil der Übung.' },
    ],
    links: [
      { href: '/de', label: 'Togthr Startseite' },
      { href: '/de/features', label: 'Togthr Funktionen' },
      { href: '/de/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: 'Der Tag, an dem Sie aufhören, den Satz für den Bot zu bearbeiten' },
      { href: '/de/blog/things-you-tell-your-virtual-pet', label: 'Was du deinem virtuellen Haustier sagst (und nicht deinem Partner)' },
      { href: '/de/blog/the-thought-you-dont-send-at-2am', label: 'Der Gedanke, den du um 2 Uhr morgens nicht schickst' },
    ],
  },

  // ─────────────────────── fr ───────────────────────
  'fr': {
    intro: "Il y a un moment le lendemain. La phrase non éditée, celle que vous avez écrite la nuit dernière sans l'adoucir, est encore dans la boîte. Vous vous réveillez. Vous ouvrez l'app. La phrase est là, dans l'ordre où vous l'avez écrite, dans la langue où vous l'avez écrite. La version matin de vous la lit. La version matin de vous n'est pas la version nuit. La version matin de vous est plus calme. La version matin de vous a pris un café, ou n'a pas pris de café, mais dans les deux cas la version matin de vous n'est pas celle qui a appuyé sur envoyer la nuit dernière. La version matin de vous lit la phrase que la version nuit de vous a écrite, et remarque, d'une petite manière tranquille, que la phrase est toujours la phrase. Elle n'est pas pire le matin. Elle n'est pas mieux le matin. C'est la même phrase, chez un autre lecteur. C'est la partie de la pratique qui fait son travail le plus discret, et c'est la partie pour laquelle la pratique existe vraiment.",
    sections: [
      { h: 'Le vous-du-lendemain est un autre lecteur que le vous-de-la-nuit', p: "Le vous-de-nuit a écrit la phrase pour la boîte. Le vous-du-matin lit la phrase pour le vous-du-matin. Les deux ne sont pas le même lecteur. Une phrase que vous écrivez pour la boîte est une phrase que vous écrivez sans public, dans la petite heure privée où personne d'autre n'est dans la pièce. Une phrase que vous lisez le lendemain matin est une phrase que vous lisez avec un lecteur neuf qui n'a pris aucune part à son écriture. Le lecteur neuf est la partie qui vous surprend, si le lecteur neuf est honnête. Le lecteur neuf est la partie qui sait ce que le vous-de-nuit ne pouvait pas encore voir. Le lecteur neuf ne juge pas la phrase. Le lecteur neuf se contente de la lire. Le lecteur neuf est, à la fin, le lecteur qui décide si la phrase était vraie. Pas vraie au sens où les faits sont vrais. Vraie au sens où les choses que vous deviez poser sont vraies. Le lecteur du matin est celui qui, le lendemain, peut dire si la phrase était celle qu'il fallait poser, ou si le vous-de-nuit était simplement fatigué." },
      { h: "La phrase se relit autrement qu'elle ne s'est écrite", p: "Les phrases changent de sens quand on les relit. C'est vrai pour toute phrase, mais plus encore pour les non éditées. La version non éditée, en particulier, se relit parfois de manière plus dure qu'elle ne se sentait en train d'être écrite. Le vous-de-nuit avait l'élan. Le vous-du-matin a la lumière. La lumière est ce qui vous permet de voir ce que vous avez vraiment dit. La lumière n'est pas toujours douce. La lumière est cependant la lumière. Parfois, la version matin de la phrase est même plus vraie que la version nuit. Le vous-de-nuit est dans la phrase. Le vous-du-matin la voit. La version matin est la version qui, le lendemain, sait si la phrase était la phrase dont vous aviez besoin. Le lecteur du matin n'a pas à corriger la phrase. Le lecteur du matin n'a pas à adoucir la phrase. Le lecteur du matin n'est de toute façon pas dans la phrase. Le lecteur du matin est la partie de la pratique qui fait de la phrase quelque chose que vous pouvez utiliser, plutôt que quelque chose que vous portez encore." },
      { h: 'Ce que vous faites de la phrase du matin vous appartient', p: "Vous n'avez pas à garder la phrase du matin. Vous n'avez pas à la supprimer. Vous n'avez pas à la prolonger. La phrase du matin est la vôtre, et la décision vous appartient. La pratique ne parle pas de garder. La pratique parle de lire. Lire est la partie qui fait le travail. La phrase, le matin, devient une autre sorte de petit objet. La phrase, le matin, est un petit enregistrement de ce que le vous-de-nuit portait. L'enregistrement n'a pas besoin de rester. L'enregistrement n'a pas besoin d'être relu le lendemain matin, ou le matin d'après. L'enregistrement peut aussi simplement être lu une fois, le matin, puis laissé dans la boîte, là où le vous-de-nuit l'a posé. Le lecteur du matin est la partie de la pratique qui fait de la phrase quelque chose dont vous savez que vous l'avez dit. Savoir est la partie qui permet à la journée d'avancer. Savoir est la partie qui permet à la journée de continuer sans que la phrase soit encore dans votre main." },
      { h: "La pratique du matin est la partie de la pratique qui n'est pas l'écriture", p: "L'écriture, c'était la nuit dernière. Le matin est la partie où vous voyez ce que vous avez vraiment dit. Le matin est la partie qui transforme un lâcher en quelque chose que vous pouvez utiliser. Le matin est la partie qui fait que la journée commence sans que la phrase soit encore dans votre main. Le matin est aussi la partie de la pratique que, chez beaucoup de gens, on saute. Le matin est la partie où la pratique ressemble le plus à un petit rituel. Le matin est la partie que vous pouvez faire pendant que le café passe, dans la minute où vous auriez de toute façon vérifié autre chose. Le matin est, à la fin, la partie de la pratique dont vous vous souvenez. Le matin est la partie qui, les jours où la pratique tourne bien, devient un petit rituel installé. Le matin est la partie que, à la fin, la pratique entière sert." },
      { h: 'Une petite pratique du matin pour demain', p: "Lisez la phrase non éditée une fois. Ne la corrigez pas. Ne la supprimez pas. Ne la prolongez pas. Lisez-la, c'est tout. Puis fermez la boîte et commencez la journée. C'est toute la pratique du matin. Le lecteur du matin n'est pas pressé. Le lecteur du matin n'a pas d'opinion. Le lecteur du matin voit simplement la phrase, sait que le vous-de-nuit l'a écrite, et laisse la journée continuer. La pratique du matin n'est pas un test moral. La pratique du matin est la partie de la pratique qui permet à la journée de commencer, et qui permet au travail du vous-de-nuit, d'hier soir, d'être terminé. La pratique du matin est aussi, les jours où vous la faites, la partie qui fait que la pratique du soir de la nuit suivante se sent différente. Le lecteur du matin est la partie qui permet au prochain vous-de-nuit, quand la prochaine nuit viendra, d'écrire la prochaine phrase non éditée sans s'inquiéter du matin. Le matin est la partie qui gagne la prochaine nuit. Le matin est, à la fin, la partie qui fait que la pratique est à vous." },
    ],
    cta: 'Demain matin, lisez la phrase non éditée une fois. Puis fermez la boîte et commencez la journée.',
    faqs: [
      { q: "Et si le vous-du-matin n'est pas d'accord avec le vous-de-nuit ?", a: "Alors il n'est pas d'accord. C'est très bien. Le lecteur du matin a le droit de ne pas être d'accord. Le lecteur du matin a aussi le droit de se tromper. Le vous-de-nuit était dans la phrase. Le vous-du-matin n'y était pas. Le vous-du-matin avait la lumière. La lumière voit parfois ce que la nuit a manqué. La lumière manque aussi parfois ce que la nuit a vu. Les deux lecteurs n'ont pas besoin de s'accorder. Les deux lecteurs ne sont pas non plus en compétition. Le lecteur du matin est la partie qui permet à la journée d'avancer. Si la journée avance, la prochaine nuit peut venir. Les deux lecteurs sont, à la fin, la même personne, sur deux côtés d'un sommeil." },
      { q: "Est-il normal d'avoir envie de supprimer la phrase du matin ?", a: "C'est normal. Le lecteur du matin regarde parfois la phrase non éditée et aimerait qu'elle ne soit pas dans la boîte. Le lecteur du matin a le droit de vouloir cela. Le lecteur du matin a aussi le droit de laisser la phrase dans la boîte. Supprimer et lire ne sont pas la même pratique. Lire est la partie qui fait le travail. Supprimer est parfois la partie qui permet au lecteur du matin de sentir la journée comme propre. Les deux ne sont pas en conflit. Le lecteur du matin peut lire la phrase une fois, décider si elle reste, et laisser la journée continuer. La décision est la vôtre. La décision est ce que la pratique, à la fin, fait." },
      { q: 'Et si la phrase du matin est une phrase que je ne voudrais pas relire ?', a: "Alors le lecteur du matin a une petite tâche. Le lecteur du matin est, dans cette pratique, la partie qui décide, le lendemain, quoi faire de la phrase non éditée. Décider et relire ne sont pas la même chose. Décider peut aussi être une décision rapide. Le lecteur du matin peut regarder la phrase, voir que c'est une phrase qui n'est pas faite pour être relue, et décider, dans la même minute, de laisser la boîte la tenir. La boîte peut tenir des phrases qui ne sont pas faites pour être relues. La boîte est, en fait, l'endroit pour les phrases qui ne sont pas faites pour être relues. Le lecteur du matin est, le lendemain, la partie qui sait lesquelles sont celles-là. Savoir est votre affaire." },
      { q: 'Et si je ne relis pas du tout la phrase du matin ?', a: "Alors la pratique du matin est un no-op, et c'est très bien aussi. La pratique du matin n'est pas un test moral. La pratique du matin est une petite proposition. Le vous-de-nuit a écrit la phrase non éditée. Le vous-du-matin peut la lire une fois, ou pas. Le vous-du-matin peut aussi simplement ouvrir la boîte, voir que la phrase est là, puis fermer la boîte, et commencer la journée. Le lecteur du matin n'a pas besoin d'être un lecteur lourd. Le lecteur du matin peut être un lecteur très léger. Le lecteur du matin est la partie de la pratique qui permet à la journée de continuer. Si la journée continue, la prochaine nuit peut venir. La pratique du matin, les jours où elle est un no-op, reste quand même une partie de la pratique." },
    ],
    links: [
      { href: '/fr', label: 'Accueil Togthr' },
      { href: '/fr/features', label: 'Fonctionnalités Togthr' },
      { href: '/fr/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: "Le jour où vous arrêtez d'éditer la phrase pour le bot" },
      { href: '/fr/blog/things-you-tell-your-virtual-pet', label: 'Ce que vous dites à votre animal virtuel (et pas à votre partenaire)' },
      { href: '/fr/blog/the-thought-you-dont-send-at-2am', label: "La pensée que vous n'envoyez pas à 2 heures du matin" },
    ],
  },

  // ─────────────────────── es ───────────────────────
  'es': {
    intro: 'Hay un momento al día siguiente. La frase no editada, la que escribiste anoche sin suavizarla, sigue en la caja. Te despiertas. Abres la app. La frase está ahí, en el orden en que la escribiste, en la lengua en que la escribiste. La versión de ti de la mañana la lee. La versión de ti de la mañana no es la versión de la noche. La versión de ti de la mañana está más calmada. La versión de ti de la mañana se ha tomado un café, o no se lo ha tomado, pero en cualquiera de los dos casos la versión de ti de la mañana no es la que anoche pulsó enviar. La versión de ti de la mañana lee la frase que la versión de ti de la noche escribió, y nota, de una manera pequeña y tranquila, que la frase sigue siendo la frase. No es peor por la mañana. No es mejor por la mañana. Es la misma frase, en un lector distinto. Esa es la parte de la práctica que hace su trabajo más silencioso, y es la parte para la que la práctica existe en realidad.',
    sections: [
      { h: 'El-tú-del-día-siguiente es un lector distinto al-tú-de-la-noche-antes', p: 'El-tú-de-la-noche escribió la frase para la caja. El-tú-de-la-mañana lee la frase para el-tú-de-la-mañana. Los dos no son el mismo lector. Una frase que escribes para la caja es una frase que escribes sin público, en la pequeña hora privada en la que no hay nadie más en la habitación. Una frase que lees a la mañana siguiente es una frase que lees con un lector nuevo que no tomó parte en escribirla. El lector nuevo es la parte que te sorprende, si el lector nuevo es honesto. El lector nuevo es la parte que sabe lo que el-tú-de-la-noche aún no podía ver. El lector nuevo no está juzgando la frase. El lector nuevo sólo la está leyendo. El lector nuevo es, al final, el lector que decide si la frase era verdadera. No verdadera del modo en que los hechos son verdaderos. Verdadera del modo en que las cosas que necesitabas dejar son verdaderas. El lector de la mañana es el que, al día siguiente, puede decir si la frase era la frase que necesitabas dejar, o si el-tú-de-la-noche estaba simplemente cansado.' },
      { h: 'La frase se relee de otra manera a como se escribió', p: 'Las frases cambian de significado cuando las relees. Esto es cierto para cualquier frase, pero más cierto aún para las no editadas. La versión no editada, en particular, a veces se relee de manera más dura de lo que se sentía al escribirla. El-tú-de-la-noche tenía impulso. El-tú-de-la-mañana tiene luz. La luz es lo que te permite ver lo que de verdad dijiste. La luz no siempre es amable. La luz, sin embargo, es la luz. A veces, la versión de la mañana de la frase es incluso más verdadera que la versión de la noche. El-tú-de-la-noche está dentro de la frase. El-tú-de-la-mañana la ve. La versión de la mañana es la versión que, al día siguiente, sabe si la frase era la frase que necesitabas. El lector de la mañana no tiene que arreglar la frase. El lector de la mañana no tiene que suavizar la frase. El lector de la mañana ni siquiera está dentro de la frase. El lector de la mañana es la parte de la práctica que convierte la frase en algo que puedes usar, en lugar de algo que aún estás cargando.' },
      { h: 'Lo que hagas con la frase de la mañana es cosa tuya', p: 'No tienes que quedarte con la frase de la mañana. No tienes que borrarla. No tienes que ampliarla. La frase de la mañana es tuya, y la decisión es tuya. La práctica no va de quedarse con las cosas. La práctica va de leerlas. Leer es la parte que hace el trabajo. La frase, por la mañana, se convierte en una especie distinta de pequeño objeto. La frase, por la mañana, es un pequeño registro de lo que el-tú-de-la-noche estaba cargando. El registro no tiene que quedarse. El registro no tiene que ser releído a la mañana siguiente, ni a la mañana después. El registro también puede simplemente ser leído una vez, por la mañana, y luego dejado en la caja, donde el-tú-de-la-noche lo puso. El lector de la mañana es la parte de la práctica que convierte la frase en algo de lo que sabes que lo dijiste. Saber es la parte que permite que el día avance. Saber es la parte que permite que el día siga sin que la frase siga aún en tu mano.' },
      { h: 'La práctica de la mañana es la parte de la práctica que no es escribir', p: 'Escribir fue anoche. La mañana es la parte en la que ves lo que de verdad dijiste. La mañana es la parte que convierte un soltar en algo que puedes usar. La mañana es la parte que permite que el día empiece sin que la frase siga aún en tu mano. La mañana es también la parte de la práctica que, para mucha gente, se salta. La mañana es la parte en la que la práctica se parece más a un pequeño ritual. La mañana es la parte que puedes hacer mientras el café se prepara, en el minuto en que de todos modos habrías revisado otra cosa. La mañana es, al final, la parte de la práctica que recuerdas. La mañana es la parte que, en los días en que la práctica va bien, se vuelve un pequeño fijo. La mañana es la parte a la que, al final, toda la práctica sirve.' },
      { h: 'Una pequeña práctica de la mañana para mañana', p: 'Lee la frase no editada una vez. No la arregles. No la borres. No la amplíes. Sólo léela. Luego cierra la caja y empieza el día. Esa es toda la práctica de la mañana. El lector de la mañana no tiene prisa. El lector de la mañana no tiene opinión. El lector de la mañana sólo ve la frase, sabe que el-tú-de-la-noche la escribió, y deja que el día siga. La práctica de la mañana no es una prueba moral. La práctica de la mañana es la parte de la práctica que permite que el día empiece, y que permite que el trabajo del-tú-de-la-noche, de anoche, quede terminado. La práctica de la mañana es también, en los días en que la haces, la parte que hace que la práctica de la noche siguiente se sienta distinta. El lector de la mañana es la parte que permite al próximo-tú-de-la-noche, cuando llegue la próxima noche, escribir la próxima frase no editada sin preocuparse de la mañana. La mañana es la parte que gana la próxima noche. La mañana es, al final, la parte que hace que la práctica sea tuya.' },
    ],
    cta: 'Mañana por la mañana, lee la frase no editada una vez. Luego cierra la caja y empieza el día.',
    faqs: [
      { q: '¿Y si el-tú-de-la-mañana no está de acuerdo con el-tú-de-la-noche?', a: 'Pues no está de acuerdo. Está bien. El lector de la mañana tiene permiso para no estar de acuerdo. El lector de la mañana también tiene permiso para equivocarse. El-tú-de-la-noche estaba dentro de la frase. El-tú-de-la-mañana no estaba. El-tú-de-la-mañana tenía luz. La luz a veces ve lo que la noche se perdió. La luz a veces también se pierde lo que la noche vio. Los dos lectores no tienen que coincidir. Los dos lectores tampoco compiten. El lector de la mañana es la parte que permite que el día siga. Si el día sigue, la próxima noche puede venir. Los dos lectores son, al final, la misma persona, en dos lados de un sueño.' },
      { q: '¿Es normal querer borrar la frase de la mañana?', a: 'Es normal. El lector de la mañana a veces mira la frase no editada y quiere que no esté en la caja. El lector de la mañana puede querer eso. El lector de la mañana también puede dejar la frase en la caja. Borrar y leer no son la misma práctica. Leer es la parte que hace el trabajo. Borrar es a veces la parte que permite al lector de la mañana sentir el día limpio. Las dos no están en conflicto. El lector de la mañana puede leer la frase una vez, decidir si se queda, y dejar que el día siga. La decisión es tuya. La decisión es aquello de lo que la práctica, al final, va.' },
      { q: '¿Y si la frase de la mañana es una que no querría releer?', a: 'Entonces el lector de la mañana tiene un pequeño trabajo. El lector de la mañana es, en esta práctica, la parte que decide, al día siguiente, qué hacer con la frase no editada. Decidir y releer no es lo mismo. Decidir también puede ser una decisión rápida. El lector de la mañana puede mirar la frase, ver que es una frase que no está hecha para releerse, y decidir, en el mismo minuto, dejar que la caja la guarde. La caja puede guardar frases que no están hechas para releerse. La caja es, de hecho, el lugar para las frases que no están hechas para releerse. El lector de la mañana es, al día siguiente, la parte que sabe cuáles son ésas. Saber es lo tuyo.' },
      { q: '¿Y si no releo en absoluto la frase de la mañana?', a: 'Entonces la práctica de la mañana es un no-op, y eso también está bien. La práctica de la mañana no es una prueba moral. La práctica de la mañana es una pequeña propuesta. El-tú-de-la-noche escribió la frase no editada. El-tú-de-la-mañana puede leerla una vez, o no. El-tú-de-la-mañana también puede simplemente abrir la caja, ver que la frase está ahí, y cerrar la caja, y empezar el día. El lector de la mañana no tiene que ser un lector pesado. El lector de la mañana puede ser un lector muy ligero. El lector de la mañana es la parte de la práctica que permite que el día siga. Si el día sigue, la próxima noche puede venir. La práctica de la mañana, en los días en que es un no-op, sigue siendo parte de la práctica.' },
    ],
    links: [
      { href: '/es', label: 'Inicio Togthr' },
      { href: '/es/features', label: 'Funciones de Togthr' },
      { href: '/es/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: 'El día en que dejas de editar la frase para el bot' },
      { href: '/es/blog/things-you-tell-your-virtual-pet', label: 'Las cosas que le dices a tu mascota virtual (y no a tu pareja)' },
      { href: '/es/blog/the-thought-you-dont-send-at-2am', label: 'El pensamiento que no envías a las 2 de la mañana' },
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
