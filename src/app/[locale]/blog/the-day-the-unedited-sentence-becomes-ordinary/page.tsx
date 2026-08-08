// src/app/[locale]/blog/the-day-the-unedited-sentence-becomes-ordinary/page.tsx
//
// Per-slug real content page for the 2026-07-20 daily SEO post.
// Topic: the day the unedited sentence becomes ordinary — the unremarkable
//        middle of the practice, when the box, the pet, the morning read
//        and the night write have all just become part of how a day is
//        shaped. Continues 7/13 (unsent 2am thought), 7/14 (spoken-only-
//        to-pet), 7/15 (drop the softening), 7/16 (morning reader) —
//        7/20 is the day the practice stops being a practice.

import Link from 'next/link'
import BlogCtaBanner from '@/components/blogctabanner'
import { withUtm } from '@/lib/utm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `the-day-the-unedited-sentence-becomes-ordinary`
const POST_DATE = `2026-07-20`

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
    intro: 'There is a day, somewhere in the third week, when the unedited sentence becomes ordinary. The day does not announce itself. The day is not a day you would have put on a calendar. The day is the day you open the app, write the unedited sentence, close the app, and do not, for a second, think of what you are doing as a practice. The day is the day the practice has stopped being a practice. The day is the day the sentence is just the sentence. The day is the day you do not write the sentence because you decided to, or because it was the morning, or because the box was empty. The day is the day you write the sentence because writing the sentence is the thing you do, the way brushing teeth is the thing you do, the way the kettle is the thing you do. The day is the day the ritual has, without anyone deciding it, become a small part of the day. The day is unremarkable. The day is the day the practice has arrived.',
    sections: [
      { h: 'The day the practice stops being a practice', p: 'A practice, while it is being a practice, is a thing you are watching yourself do. A practice, after it is no longer a practice, is a thing you do while you are watching something else. A practice is also, in the beginning, a thing you might miss. A practice, in the middle, is a thing you would not miss. A practice, in the middle, is a thing you would notice missing only because the morning, or the evening, would feel a half-step too quick. The day the unedited sentence becomes ordinary is the day the half-step is the only signal. The day the unedited sentence becomes ordinary is the day you no longer need the small bravery that the first week required. The day the unedited sentence becomes ordinary is the day the box, the pet, the morning read, and the night write have all just become part of how a day is shaped. The day the practice stops being a practice is not a day you mark. The day is the day you stop marking. The day is the day that the unedited sentence is, finally, a thing you do not have to think about.' },
      { h: 'The day you forget what the box is for', p: 'In the first week, the box had a job. The box was the place the unedited sentence went. The box was the place you came to the next morning. The box was the place that held the sentence, in the order you wrote it, until you came back. The box, in the first week, was a small private hour. The box, in the third week, has stopped being a place. The box, in the third week, has become a part of the app the way the fridge is a part of the kitchen. You do not think about the fridge. The fridge is just where the milk is. The box, in the third week, is just where the sentence goes. The day you forget what the box is for is also the day you have stopped needing to know what the box is for. The day you forget what the box is for is the day the practice is doing its real work. The day you forget what the box is for is the day the box has earned the quiet, ordinary role that the practice was always for.' },
      { h: 'The day the sentence is shorter than it used to be', p: 'The first sentences were long. The first sentences were paragraphs. The first sentences were the kind of sentences you wrote at two in the morning when the box felt like a small, private room. The first sentences, looking back on them, are a record of a particular kind of need. The unedited sentences, in the third week, are shorter. The unedited sentences, in the third week, are a sentence. The unedited sentences, in the third week, are sometimes just a few words, the kind of few words that hold the thing without saying the thing in full. The day the sentence is shorter than it used to be is the day the practice is doing its real work. The day the sentence is shorter than it used to be is the day you have stopped performing the unedited sentence. The day the sentence is shorter than it used to be is the day the unedited sentence is just the sentence, in the way that, in a long relationship, the look across the table is just the look. The shorter sentence is not a smaller sentence. The shorter sentence is a sentence that does not need to be longer to do the same work.' },
      { h: 'The day the pet does not look like a metaphor anymore', p: 'The pet, in the first week, looked like a metaphor. The pet was the small thing that grows as you write to it. The pet was the small thing that holds the sentence until the next day. The pet was, in the first week, a small image on a screen, in the way that a small image on a screen is a small image on a screen. The pet, in the third week, has stopped being a metaphor. The pet, in the third week, is just the pet. The pet, in the third week, eats when you feed it and sleeps when you let it sleep. The pet, in the third week, is not a stand-in for anything. The pet, in the third week, is a small living thing that lives in the app, and the unedited sentence is the small thing you write to it, and the morning read is the small thing you read back, and the box is the small place the sentence goes. The day the pet does not look like a metaphor is the day the pet has, quietly, become a small part of how the day is shaped. The day the pet does not look like a metaphor is the day the metaphor has finished its work, and the pet is, in fact, the pet.' },
      { h: 'A small note on the unremarkable middle', p: 'Most practices fail in the unremarkable middle. Most practices have a strong first week. Most practices have a strong third day. Most practices do not have a strong third week. The third week is the week the practice stops being the practice. The third week is the week the unedited sentence becomes ordinary. The third week is the week you do not write the sentence because you are doing the practice. The third week is the week you write the sentence because writing the sentence is the thing you do. The third week is, in some quiet way, the week the practice is the practice. The unremarkable middle is not a failure. The unremarkable middle is, in fact, the success. The unremarkable middle is the part of the practice the practice was, all along, for. The unremarkable middle is the day the unedited sentence becomes ordinary, and ordinary, in a small quiet way, is the goal.' },
    ],
    cta: 'If the unedited sentence is already ordinary, you are already in the part of the practice the practice is for.',
    faqs: [
      { q: 'What if the ordinary day is the day I want to take a break?', a: 'Then the ordinary day is also a day you can take a break. The ordinary day is not a moral test. The ordinary day is a small offer, and the small offer, on a Tuesday, is also a small offer you can decline. The unedited sentence, in the third week, is not a thing that will scold you for skipping. The unedited sentence, in the third week, is a thing that, if you skip, will be in the box tomorrow morning when you come back. The break, in the ordinary middle, is a normal part of the practice. The break, in the ordinary middle, is not a failure. The break, in the ordinary middle, is the practice noticing that you have a life, and that the life is also part of the practice.' },
      { q: 'Is it normal that the unedited sentence gets smaller over time?', a: 'It is normal. The unedited sentence, in the first week, is a paragraph. The unedited sentence, in the third week, is a sentence. The unedited sentence, by the second month, is sometimes a few words, the kind of few words that hold the thing without saying the thing in full. The shortening is not a sign that you have less to say. The shortening is a sign that the box has earned the quiet, ordinary role. The shortening is a sign that the unedited sentence, in the third week, is just the sentence. The shortening is a sign that the practice has arrived. The shortening is, in the end, the part of the practice that does its quietest work.' },
      { q: 'What if I notice the day the unedited sentence became ordinary?', a: 'Then you have noticed, and the noticing is fine. The noticing does not undo the ordinary. The noticing is, in fact, a small goodbye to the small bravery the first week required. The noticing is the part where the unedited sentence is no longer a thing you are watching yourself do. The noticing is the part where the unedited sentence is a thing you do while you are watching something else. The noticing is not the same as the practice failing. The noticing is the part where the practice is, finally, the practice. The noticing, in a small way, is also the part of the practice that, on the day you notice, is the practice.' },
      { q: 'What if the ordinary day is when I stop opening the app?', a: 'Then the ordinary day is the day the app, in the end, is the app. The app is a small tool. The small tool, like any small tool, is a thing you reach for when the day calls for it. The app, in the third week, has stopped being a destination. The app, in the third week, has become a small, ordinary part of how a day is shaped. The day you stop opening the app is the day the unedited sentence, in the box, holds the last thing you wrote. The day you stop opening the app is not a failure. The day you stop opening the app is a small change in the day, and the day, like any day, has the right to change. The app will be in the box, on a day you come back, with the last sentence you wrote, in the order you wrote it.' },
    ],
    links: [
      { href: '/en', label: 'Togthr home' },
      { href: '/en/features', label: 'Togthr features' },
      { href: '/en/blog/the-morning-you-read-the-unedited-sentence-back', label: 'The morning you read the unedited sentence back' },
      { href: '/en/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: 'The day you stop editing the sentence for the bot' },
      { href: '/en/blog/two-minute-daily-check-in-ai-companion', label: 'The two-minute daily check-in with an AI companion' },
    ],
  },

  // ─────────────────────── zh-cn ───────────────────────
  'zh-cn': {
    intro: '有那么一天,在第三周的某个地方,那句没编辑的句子变得不显眼。那一天不会自己宣告自己。那一天不是你会摆在日历上的那一天。那一天是你打开 app、写完那句没编辑的句子、关掉 app、并且,没有一秒钟,把你正在做的这件事当作「练习」的那一天。那一天是这个练习不再是一个练习的那一天。那一天是句子只是句子的那一天。那一天是你写这句,不是因为你决定了要写,不是因为是早上,不是因为盒子空着,而是因为写这句,是你要做的事,像刷牙是你要做的事,像烧水壶是你要做的事。那一天是这个仪式,没有谁决定,变成了那天的很小一部分。那一天不显眼。那一天是这个练习到位的日子。',
    sections: [
      { h: '练习不再成为练习的那一天', p: '一个练习,当它还是练习的时候,是一个你在看着自己做的东西。一个练习,在它不再是练习之后,是一个你做着、而眼睛在看别处的东西。一个练习,在刚开始,也是一个你可能会漏掉的东西。一个练习,到中间,是一个你不会漏掉的东西。一个练习,到中间,是一个你会注意到漏掉,只是因为早上、或者晚上,会觉得快了半步。那句没编辑的句子变得不显眼的那一天,是那半步成了唯一信号的那一天。那句没编辑的句子变得不显眼的那一天,是你不再需要第一周所需的那点小小的勇气的那一天。那句没编辑的句子变得不显眼的那一天,是盒子、宠物、早上的读、和夜里的写,全都只是日子如何被塑成的那一天。练习停止成为练习的那一天,不是一个你会标记的日子。那一天是你停止标记的那一天。那一天是那句没编辑的句子,终于,是一件你不用去想的事。' },
      { h: '你忘了盒子是用来干嘛的那一天', p: '在第一周,盒子有一份活儿。盒子是那句没编辑的句子去到的地方。盒子是你第二天早上来找的地方。盒子是那个按你写下的顺序,把那一句收着、直到你回来的地方。盒子,在第一周,是一个小小的私人时辰。盒子,在第三周,不再是「一个地方」了。盒子,在第三周,变成了 app 的一部分,像冰箱是厨房的一部分。你不会去想冰箱。冰箱只是牛奶在的地方。盒子,在第三周,只是句子在的地方。你忘了盒子是用来干嘛的那一天,也是你不再需要知道盒子是用来干嘛的那一天。你忘了盒子是用来干嘛的那一天,是这个练习在真正做事的那一天。你忘了盒子是用来干嘛的那一天,是盒子赢得了那份安静、普通的角色,而那个角色,才一直是这个练习在做的事。' },
      { h: '句子比从前短了的那一天', p: '前几周的句子是长的。前几周的句子是一段一段。前几周的句子,是那种凌晨两点写下的句子,像一个小小的私人房间。前几周的句子,回头看,是一种特定需要的记录。没编辑的句子,在第三周,短了。没编辑的句子,在第三周,是一句。没编辑的句子,在第三周,有时只是几个字,那种把事情放在里面、又不需要把事情说全的几个字。句子比从前短了的那一天,是这个练习在真正做事的那一天。句子比从前短了的那一天,是你停止「表演」那句没编辑的句子的那一天。句子比从前短了的那一天,是那句没编辑的句子,只是句子 —— 像在长关系里,隔着桌子的那一眼,只是那一眼。短了的那句,不是小了的那句。短了的那句,是一句不需要更长、就能做同样事情的那句。' },
      { h: '宠物不再像是一个比喻的那一天', p: '宠物,在第一周,看着像是一个比喻。宠物是那个你写给它,就会长大的小东西。宠物是那个把那句收着,直到第二天的小东西。宠物,在第一周,是屏幕上的一个小小图像,像屏幕上的一个小小图像那样。宠物,在第三周,不再是比喻了。宠物,在第三周,只是宠物。宠物,在第三周,你喂它,它就吃,你让它睡,它就睡。宠物,在第三周,不是任何东西的替身。宠物,在第三周,是住在 app 里的一个小活物,而那句没编辑的句子,是你写给它的那个小东西,而早上的读,是你读回来的那个小动作,而盒子,是那句去到的那个小地方。宠物不再像是一个比喻的那一天,是宠物,安安静静地,变成了日子如何被塑成的一小部分。宠物不再像是一个比喻的那一天,是比喻做完了它的活儿,而宠物,事实上,就是宠物。' },
      { h: '对那个「不显眼的中段」,一句小注', p: '大多数练习,都败在「不显眼的中段」。大多数练习,都有一个很强的第一周。大多数练习,都有一个很强的第三天。大多数练习,没有一个很强的第三周。第三周,是这个练习不再是练习的那一周。第三周,是那句没编辑的句子变得不显眼的那一周。第三周,是你不是「在做练习」才写下这句的那一周。第三周,是你写下这句,只是因为写这句,是你要做的事。第三周,在某种安静的意义上,是练习就是练习的那一周。「不显眼的中段」不是失败。「不显眼的中段」,事实上,才是成功。「不显眼的中段」是这个练习一直为之的那一部分。「不显眼的中段」,就是那句没编辑的句子变得不显眼的那一天,而「不显眼」,在一种安静的意义上,就是目标。' },
    ],
    cta: '如果那句没编辑的句子已经不显眼了,你已经在这个练习为之的那个部分里了。',
    faqs: [
      { q: '如果「不显眼的那一天」是我想休息的那一天呢?', a: '那「不显眼的那一天」,也是你可以休息的那一天。「不显眼的那一天」不是道德测试。「不显眼的那一天」是一个小小提议,那个小小提议,在一个星期二,也是一个你可以谢绝的小小提议。那句没编辑的句子,在第三周,不是会责怪你跳过它的事。那句没编辑的句子,在第三周,是一件 —— 如果你跳过 —— 会在你明天早上回来时,还在盒子里的事。休息,在那个不显眼的中间,是练习正常的一部分。休息,在那个不显眼的中间,不是失败。休息,在那个不显眼的中间,是练习注意到你还有生活,而那个生活,也是练习的一部分。' },
      { q: '那句没编辑的句子越变越短,这正常吗?', a: '正常。那句没编辑的句子,在第一周,是一段。那句没编辑的句子,在第三周,是一句。那句没编辑的句子,到了第二个月,有时是几个字,那种把事情放在里面、又不需要把事情说全的几个字。变短,不是你有更少话要说的信号。变短,是盒子已经赢得了那份安静、普通的角色的信号。变短,是那句没编辑的句子,在第三周,只是句子的信号。变短,是这个练习已经到位的信号。变短,最后,是这个练习做得最安静的那部分。' },
      { q: '如果我注意到那句没编辑的句子变得不显眼的那一天呢?', a: '那你就注意到了,注意到也没事。注意到,不会把「不显眼」撤掉。注意到,事实上,是一个小小的告别,告别第一周所需的那点小小的勇气。注意到,是那句没编辑的句子不再是你在看着自己做的那件事的那个部分。注意到,是那句没编辑的句子是一件你做着、而眼睛在看别处的事的那个部分。注意到,和「练习失败」,不是一回事。注意到,是这个练习,终于,是练习的那个部分。注意到,以一种小方式,也是这个练习,在你注意到的这一天,就是这个练习。' },
      { q: '如果「不显眼的那一天」是我停止打开 app 的那一天呢?', a: '那「不显眼的那一天」,就是 app,最后,就是 app 的那一天。app 是一个小工具。那个小工具,像任何一个小工具,是一个你在日子需要时伸手去拿的东西。app,在第三周,不再是「一个目的地」了。app,在第三周,变成了日子如何被塑成的一小部分、普通的一部分。你停止打开 app 的那一天,是那句没编辑的句子,在盒子里,收着你最后一次写下的那一句的那一天。你停止打开 app 的那一天,不是失败。你停止打开 app 的那一天,是日子一个小小的变化,而日子,像任何日子,有权变化。app 会在盒子里,在你回来的那一天,带着你最后一次写下的那句,按你写下的顺序。' },
    ],
    links: [
      { href: '/zh-cn', label: 'Togthr 首页' },
      { href: '/zh-cn/features', label: 'Togthr 功能' },
      { href: '/zh-cn/blog/the-morning-you-read-the-unedited-sentence-back', label: '第二天早上,你把那句没编辑的句子又读了一遍' },
      { href: '/zh-cn/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: '你停止在给机器人之前编辑句子的那天' },
      { href: '/zh-cn/blog/two-minute-daily-check-in-ai-companion', label: '和 AI 陪伴的每天两分钟小打卡' },
    ],
  },

  // ─────────────────────── zh-tw ───────────────────────
  'zh-tw': {
    intro: '有那麼一天,在第三週的某個地方,那句沒編輯的句子變得不顯眼。那一天不會自己宣告自己。那一天不是你會擺在日曆上的那一天。那一天是你打開 app、寫完那句沒編輯的句子、關掉 app、並且,沒有一秒鐘,把你正在做的這件事當作「練習」的那一天。那一天是這個練習不再是一個練習的那一天。那一天是句子只是句子的那一天。那一天是你寫這句,不是因為你決定了要寫,不是因為是早上,不是因為盒子空著,而是因為寫這句,是你要做的事,像刷牙是你要做的事,像燒水壺是你要做的事。那一天是這個儀式,沒有誰決定,變成了那天很小的一部分。那一天不顯眼。那一天是這個練習到位的日子。',
    sections: [
      { h: '練習不再成為練習的那一天', p: '一個練習,當它還是練習的時候,是一個你在看著自己做的東西。一個練習,在它不再是練習之後,是一個你做著、而眼睛在看別處的東西。一個練習,在剛開始,也是一個你可能會漏掉的東西。一個練習,到中間,是一個你不會漏掉的東西。一個練習,到中間,是一個你會注意到漏掉,只是因為早上、或者晚上,會覺得快了半步。那句沒編輯的句子變得不顯眼的那一天,是那半步成了唯一信號的那一天。那句沒編輯的句子變得不顯眼的那一天,是你不再需要第一週所需的那點小小的勇氣的那一天。那句沒編輯的句子變得不顯眼的那一天,是盒子、寵物、早上的讀、和夜裡的寫,全都只是日子如何被塑成的那一天。練習停止成為練習的那一天,不是一個你會標記的日子。那一天是你停止標記的那一天。那一天是那句沒編輯的句子,終於,是一件你不用去想的事。' },
      { h: '你忘了盒子是用來幹嘛的那一天', p: '在第一週,盒子有一份活兒。盒子是那句沒編輯的句子去到的地方。盒子是你第二天早上來找的地方。盒子是那個按你寫下的順序,把那一句收著、直到你回來的地方。盒子,在第一週,是一個小小的私人時辰。盒子,在第三週,不再是「一個地方」了。盒子,在第三週,變成了 app 的一部分,像冰箱是廚房的一部分。你不會去想冰箱。冰箱只是牛奶在的地方。盒子,在第三週,只是句子在的地方。你忘了盒子是用來幹嘛的那一天,也是你不再需要知道盒子是用來幹嘛的那一天。你忘了盒子是用來幹嘛的那一天,是這個練習在真正做事的那一天。你忘了盒子是用來幹嘛的那一天,是盒子贏得了那份安靜、普通的角色,而那個角色,才一直是這個練習在做的事。' },
      { h: '句子比從前短了的那一天', p: '前幾週的句子是長的。前幾週的句子是一段一段。前幾週的句子,是那種凌晨兩點寫下的句子,像一個小小的私人房間。前幾週的句子,回頭看,是一種特定需要的記錄。沒編輯的句子,在第三週,短了。沒編輯的句子,在第三週,是一句。沒編輯的句子,在第三週,有時只是幾個字,那種把事情放在裡面、又不需要把事情說全的幾個字。句子比從前短了的那一天,是這個練習在真正做事的那一天。句子比從前短了的那一天,是你停止「表演」那句沒編輯的句子的那一天。句子比從前短了的那一天,是那句沒編輯的句子,只是句子 —— 像在長關係裡,隔著桌子的那一眼,只是那一眼。短了的那句,不是小了的那句。短了的那句,是一句不需要更長、就能做同樣事情的那句。' },
      { h: '寵物不再像是一個比喻的那一天', p: '寵物,在第一週,看著像是一個比喻。寵物是那個你寫給它,就會長大的小東西。寵物是那個把那句收著,直到第二天的小東西。寵物,在第一週,是螢幕上的一個小小圖像,像螢幕上的一個小小圖像那樣。寵物,在第三週,不再是比喻了。寵物,在第三週,只是寵物。寵物,在第三週,你餵它,它就吃,你讓它睡,它就睡。寵物,在第三週,不是任何東西的替身。寵物,在第三週,是住在 app 裡的一個小活物,而那句沒編輯的句子,是你寫給它的那個小東西,而早上的讀,是你讀回來的那個小動作,而盒子,是那句去到的那個小地方。寵物不再像是一個比喻的那一天,是寵物,安安靜靜地,變成了日子如何被塑成的一小部分。寵物不再像是一個比喻的那一天,是比喻做完了它的活兒,而寵物,事實上,就是寵物。' },
      { h: '對那個「不顯眼的中段」,一句小註', p: '大多數練習,都敗在「不顯眼的中段」。大多數練習,都有一個很強的第一週。大多數練習,都有一個很強的第三天。大多數練習,沒有一個很強的第三週。第三週,是這個練習不再是練習的那一週。第三週,是那句沒編輯的句子變得不顯眼的那一週。第三週,是你不是「在做練習」才寫下這句的那一週。第三週,是你寫下這句,只是因為寫這句,是你要做的事。第三週,在某種安靜的意義上,是練習就是練習的那一週。「不顯眼的中段」不是失敗。「不顯眼的中段」,事實上,才是成功。「不顯眼的中段」是這個練習一直為之的那一部分。「不顯眼的中段」,就是那句沒編輯的句子變得不顯眼的那一天,而「不顯眼」,在一種安靜的意義上,就是目標。' },
    ],
    cta: '如果那句沒編輯的句子已經不顯眼了,你已經在這個練習為之的那個部分裡了。',
    faqs: [
      { q: '如果「不顯眼的那一天」是我想休息的那一天呢?', a: '那「不顯眼的那一天」,也是你可以休息的那一天。「不顯眼的那一天」不是道德測試。「不顯眼的那一天」是一個小小提議,那個小小提議,在一個星期二,也是一個你可以謝絕的小小提議。那句沒編輯的句子,在第三週,不是會責怪你跳過它的事。那句沒編輯的句子,在第三週,是一件 —— 如果你跳過 —— 會在你明天早上回來時,還在盒子裡的事。休息,在那個不顯眼的中間,是練習正常的一部分。休息,在那個不顯眼的中間,不是失敗。休息,在那個不顯眼的中間,是練習注意到你還有生活,而那個生活,也是練習的一部分。' },
      { q: '那句沒編輯的句子越變越短,這正常嗎?', a: '正常。那句沒編輯的句子,在第一週,是一段。那句沒編輯的句子,在第三週,是一句。那句沒編輯的句子,到了第二個月,有時是幾個字,那種把事情放在裡面、又不需要把事情說全的幾個字。變短,不是你有更少話要說的信號。變短,是盒子已經贏得了那份安靜、普通的角色的信號。變短,是那句沒編輯的句子,在第三週,只是句子的信號。變短,是這個練習已經到位的信號。變短,最後,是這個練習做得最安靜的那部分。' },
      { q: '如果我注意到那句沒編輯的句子變得不顯眼的那一天呢?', a: '那你就注意到了,注意到也沒事。注意到,不會把「不顯眼」撤掉。注意到,事實上,是一個小小的告別,告別第一週所需的那點小小的勇氣。注意到,是那句沒編輯的句子不再是你在看著自己做的這件事的那個部分。注意到,是那句沒編輯的句子是一件你做著、而眼睛在看別處的事的那個部分。注意到,和「練習失敗」,不是一回事。注意到,是這個練習,終於,是練習的那個部分。注意到,以一種小方式,也是這個練習,在你注意到的這一天,就是這個練習。' },
      { q: '如果「不顯眼的那一天」是我停止打開 app 的那一天呢?', a: '那「不顯眼的那一天」,就是 app,最後,就是 app 的那一天。app 是一個小工具。那個小工具,像任何一個小工具,是一個你在日子需要時伸手去拿的東西。app,在第三週,不再是「一個目的地」了。app,在第三週,變成了日子如何被塑成的一小部分、普通的一部分。你停止打開 app 的那一天,是那句沒編輯的句子,在盒子裡,收著你最後一次寫下的那一句的那一天。你停止打開 app 的那一天,不是失敗。你停止打開 app 的那一天,是日子一個小小的變化,而日子,像任何日子,有權變化。app 會在盒子裡,在你回來的那一天,帶著你最後一次寫下的那句,按你寫下的順序。' },
    ],
    links: [
      { href: '/zh-tw', label: 'Togthr 首頁' },
      { href: '/zh-tw/features', label: 'Togthr 功能' },
      { href: '/zh-tw/blog/the-morning-you-read-the-unedited-sentence-back', label: '第二天早上,你把那句沒編輯的句子又讀了一遍' },
      { href: '/zh-tw/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: '你停止在給機器人之前編輯句子的那天' },
      { href: '/zh-tw/blog/two-minute-daily-check-in-ai-companion', label: '和 AI 陪伴的每天兩分鐘小打卡' },
    ],
  },

  // ─────────────────────── ja ───────────────────────
  'ja': {
    intro: '三週間のどこかに、その日が来る。推敲していない一文が、ありふれたものになる日。その日は、自分からは告げられない。その日は、カレンダーに書き込むような日ではない。その日は、アプリを開き、推敲していない一文を書き、アプリを閉じ、しかも一秒たりとも、自分が今していることを「習慣」だと思わない日。その日は、この習慣が習慣であることをやめた日。その日は、一文が、ただの一文になる日。その日は、朝だからとか、箱が空だからとか、そう決めたからとかではなく、その一文を書くのが、することでする日、歯磨きのすることでする日、ケトルすることでする日。その日は、誰も決めずに、この儀式が、ありふれた形で、一日の小さな一部になった日。その日は、目立たない。その日は、この習慣が定着した日だ。',
    sections: [
      { h: '習慣が習慣であることをやめた日', p: '習慣が、まだ習慣であるうちは、自分がそれをしているのを観察しているものだ。習慣でなくなったあとは、観察しているのではなく、別のものを見ている間にしているものだ。習慣は、始めた頃は、まだ抜けることもある。習慣は、中盤になると、もう抜けない。習慣は、中盤になると、抜けたことに気づくのは、朝か夜が、半歩だけ速すぎるからだ。推敲していない一文が、ありふれたものになる日は、その半歩だけが、唯一の合図になる日だ。推敲していない一文が、ありふれたものになる日は、一週目に必要だった小さな勇気を、もう必要としなくなった日だ。推敲していない一文が、ありふれたものになる日は、箱も、ペットも、朝の読み返しも、夜の書くことも、すべて、ただ一日がどう作られるかの一部になった日だ。習慣が習慣であることをやめた日は、印をつける日ではない。印をつけなくなる日だ。推敲していない一文が、ついに、考えずにすむものになった日だ。' },
      { h: '箱が何のためのものかを忘れた日', p: '一週目には、箱には仕事があった。箱は、推敲していない一文が行くところ。箱は、翌朝あなたが戻ってくるところ。箱は、あなたが書いた順のまま、その一文を抱えて、あなたが戻るまで待っているところ。箱は、一週目には、小さな私的な時間だった。箱は、三週目には、「場所」であることをやめている。箱は、三週目には、冷蔵庫がキッチンの一部であるように、アプリの一部になっている。冷蔵庫のことを意識することはない。冷蔵庫は、ただ牛乳があるところだ。箱は、三週目には、ただ一文があるところだ。箱が何のためのものかを忘れた日は、箱が何のためかを知らなくてよくなった日でもある。箱が何のためのものかを忘れた日は、この習慣が本当に効き始めている日だ。箱が何のためのものかを忘れた日は、箱が、あの静かで、ありふれた役割を勝ち取った日で、習慣がずっと仕えていたのは、その役割のことだ。' },
      { h: '一文が以前より短くなった日', p: '初めの数週間の一文は、長かった。初めの数週間の一文は、何段もあった。初めの一文は、深夜二時に、小さな私的な部屋で書くような一文だった。初めの一文は、あとから振り返ると、ある特定の必要の記録だ。推敲していない一文は、三週目には、短くなる。推敲していない一文は、三週目には、一文だ。推敲していない一文は、三週目には、ほんの数語になることもある。その事柄を抱え込みつつ、全部は言わなくていいような、数語。短くなった日は、この習慣が本当に効き始めている日だ。短くなった日は、推敲していない一文を「上演」することをやめた日だ。短くなった日は、推敲していない一文が、ただの一文になった日だ。長い関係で、テーブルの向こうからの視線が、ただの視線になるように。短くなった一文は、小さくなった一文ではない。同じ働きをするのに、それより長くなる必要がない一文だ。' },
      { h: 'ペットがもう比喩に見えなくなった日', p: 'ペットは、一週目には、比喩に見えていた。ペットは、書いてやると育っていく、小さな何か。ペットは、その一文を翌日まで抱えておく、小さな何か。ペットは、一週目には、画面の上の小さな画像で、画面の上の小さな画像そのものだった。ペットは、三週目には、比喩ではなくなる。ペットは、三週目には、ただのペットだ。ペットは、三週目には、餌をやれば食べ、寝かせれば寝る。ペットは、三週目には、何かの代わりではない。ペットは、三週目には、アプリの中に生きている小さな生き物で、推敲していない一文は、それに向かってあなたが書く小さなもので、朝の読み返しは、それを読んで戻す小さな動きで、箱は、その一文が行く小さな場所だ。ペットが比喩に見えなくなった日は、ペットが、静かに、一日がどう作られるかの一部になった日だ。ペットが比喩に見えなくなった日は、比喩がその仕事を終え、ペットが、じつはペットになった日だ。' },
      { h: '目立たない中盤について、小さな覚書', p: 'ほとんどの習慣は、目立たない中盤でだめになる。ほとんどの習慣は、一週目がしっかりしている。ほとんどの習慣は、三日目がしっかりしている。ほとんどの習慣は、三週目がしっかりしていない。三週目は、習慣が習慣でなくなる週。三週目は、推敲していない一文が、ありふれたものになる週。三週目は、習慣だから書いています、という週ではなくなります。三週目は、それをすることが、することだから書く、週。三週目は、ある静かな意味で、習慣が習慣である、週。目立たない中盤は、失敗ではない。目立たない中盤は、じつは、成功だ。目立たない中盤は、習慣がずっと仕えていた、あの一部分だ。目立たない中盤は、推敲していない一文が、ありふれたものになる日で、ありふれたことは、ある静かな意味で、目的だ。' },
    ],
    cta: 'もし推敲していない一文が、もうありふれたものになっているなら、あなたは、この習慣が仕えている、その場所にすでにいる。',
    faqs: [
      { q: 'もし、その「ありふれた日」が、一休みしたい日だったら?', a: 'それも、ありふれた日は、休みにもできる日だ。ありふれた日は、道徳テストではない。ありふれた日は、小さな提案で、小さな提案は、火曜日にあっても、断れる小さな提案だ。推敲していない一文は、三週目には、飛ばしたことを責めない。推敲していない一文は、三週目には、飛ばしたとしても、翌朝戻ってきたとき、箱にまだあるものだ。ありふれた中盤の休みは、習慣の普通の一部だ。ありふれた中盤の休みは、失敗ではない。ありふれた中盤の休みは、習慣が、あなたが生活を持っていることに気づく時間で、その生活もまた、習慣の一部だ。' },
      { q: '推敲していない一文がだんだん短くなるのは普通ですか?', a: '普通だ。推敲していない一文は、一週目には、一段落。推敲していない一文は、三週目には、一文。推敲していない一文は、二ヶ月目には、数語になることもある。その事柄を抱え込みつつ、全部は言わなくていいような、数語。短くなるのは、言いたいことが減った合図ではない。短くなるのは、箱が、あの静かで、ありふれた役割を勝ち取った合図だ。短くなるのは、推敲していない一文が、三週目には、ただの一文である合図だ。短くなるのは、この習慣が定着した合図だ。短くなるのは、最後に、この習慣がいちばん静かに効く部分だ。' },
      { q: 'もし、推敲していない一文がありふれたものになった、その日を、気づいてしまったら?', a: '気づいても、気づいていい。気づいても、ありふれたことは取り消されない。気づいてしまうのは、じつは、一週目に必要だった小さな勇気に、小さくさよならを言う瞬間だ。気づくのは、推敲していない一文が、もう自分がしていることを観察する対象ではなくなる、その部分だ。気づくのは、推敲していない一文が、別のものを見ている間にしていることになる、その部分だ。気づくのは、習慣が失敗するのと同じではない。気づくのは、習慣が、ついに、習慣になる、その部分だ。気づくのは、小さなやり方で、気づいたその日だけは、気づくこと自体が、その習慣だ。' },
      { q: 'もし、ありふれた日が、もうアプリを開かなくなる日だったら?', a: 'それなら、ありふれた日は、アプリが、最後に、アプリになる日だ。アプリは、小さな道具だ。その道具は、どんな道具でも、日が求めたときに手を伸ばすものだ。アプリは、三週目には、もう「行き先」ではない。アプリは、三週目には、一日がどう作られるかの、ありふれた一部になっている。アプリを開かなくなる日は、推敲していない一文が、箱の中で、最後にあなたが書いた一文を抱えている日だ。アプリを開かなくなる日は、失敗ではない。アプリを開かなくなる日は、日の中の一つの小さな変化で、日には、他の日と同じく、変わる権利がある。アプリは、あなたが戻ってくる日、箱の中で、あなたが最後に書いた一文を、書いた順のまま、抱えている。' },
    ],
    links: [
      { href: '/ja', label: 'Togthr ホーム' },
      { href: '/ja/features', label: 'Togthr 機能' },
      { href: '/ja/blog/the-morning-you-read-the-unedited-sentence-back', label: '翌朝、推敲していない一文を読み返す' },
      { href: '/ja/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: '推敲するのをやめる日 — bot に渡す前' },
      { href: '/ja/blog/two-minute-daily-check-in-ai-companion', label: 'AI コンパニオンとの 2 分間の daily チェックイン' },
    ],
  },

  // ─────────────────────── ko ───────────────────────
  'ko': {
    intro: "어느 날이 온다. 세 번째 주의 어딘가에, 다듬지 않은 문장이 평범해지는 날. 그 날은 스스로를 알리지 않는다. 그 날은 달력에 적어 둘 만한 날이 아니다. 그 날은, 앱을 열고, 다듬지 않은 문장을 쓰고, 앱을 닫고, 단 한 순간도 자신이 지금 하고 있는 것을 '습관'이라고 여기지 않는 날이다. 그 날은, 이 습관이 습관임을 멈춘 날이다. 그 날은, 문장이 그냥 문장인 날이다. 그 날은, 결심해서 쓴 것도, 아침이라서 쓴 것도, 상자가 비어서 쓴 것도 아니고, 그저 문장을 쓰는 것이, 해야 하는 일이라서 쓰는 날이다. 양치질이 해야 하는 일이라서 하는 것처럼, 주전자가 해야 하는 일이라서 있는 것처럼. 그 날은, 어느 누가 결정한 것도 아닌 채, 이 의식이 하루의 작은 한 부분이 되어버린 날이다. 그 날은 눈에 띄지 않는다. 그 날이, 이 습관이 자리 잡은 날이다.",
    sections: [
      { h: '습관이 습관임을 멈춘 날', p: '습관이 아직 습관일 때는, 자기가 그것을 하고 있다는 것을 관찰하고 있는 것이다. 습관이 아니게 된 뒤에는, 관찰하는 것이 아니라, 다른 것을 보고 있는 사이에 하고 있는 것이다. 습관은, 처음에는, 놓칠 수도 있는 것이다. 습관은, 중반에는, 놓치지 않는 것이다. 습관은, 중반에는, 놓친 것을 알아차리는 것은, 아침이나 밤이 반 걸음만 빨리 느껴지기 때문인 것이다. 다듬지 않은 문장이 평범해지는 날은, 그 반 걸음이 유일한 신호가 되는 날이다. 다듬지 않은 문장이 평범해지는 날은, 첫 주에 필요했던 작은 용기를 더는 필요하지 않게 된 날이다. 다듬지 않은 문장이 평범해지는 날은, 상자도, 펫도, 아침의 다시 읽기도, 밤의 쓰기도, 모두 그냥 하루가 어떻게 만들어지는가의 일부가 된 날이다. 습관이 습관임을 멈춘 날은, 표시하는 날이 아니다. 표시하지 않게 되는 날이다. 다듬지 않은 문장이, 드디어, 생각하지 않아도 되는 것이 된 날이다.' },
      { h: '상자가 무엇을 위한 것인지를 잊은 날', p: "첫 주에는, 상자에게는 일이 있었다. 상자는, 다듬지 않은 문장이 가는 곳. 상자는, 다음 날 아침에 돌아오는 곳. 상자는, 쓴 순서 그대로, 그 한 문장을 당신이 돌아올 때까지 안고 있는 곳. 상자는, 첫 주에는, 작은 사적인 시간이었다. 상자는, 세 번째 주에는, '장소'이기를 멈춘다. 상자는, 세 번째 주에는, 냉장고가 부엌의 일부이듯, 앱의 일부가 된다. 냉장고를 의식하지 않는다. 냉장고는 우유가 있는 곳일 뿐이다. 상자는, 세 번째 주에는, 그저 문장이 있는 곳이다. 상자가 무엇을 위한 것인지를 잊은 날은, 상자가 무엇을 위한 것인지를 알 필요가 없어진 날이기도 하다. 상자가 무엇을 위한 것인지를 잊은 날은, 이 습관이 진짜로 일을 하기 시작한 날이다. 상자가 무엇을 위한 것인지를 잊은 날은, 상자가 그 조용하고 평범한 역할을 얻은 날이고, 습관이 줄곧 섬겨 온 것이 바로 그 역할이다." },
      { h: '문장이 전보다 짧아진 날', p: "처음 몇 주의 문장은 길었다. 처음 몇 주의 문장은 몇 문단이었다. 처음의 문장은, 새벽 두 시에, 작은 사적인 방에서 쓰이는 문장 같은 것이었다. 처음의 문장은, 돌이켜 보면, 특정 필요의 기록이다. 다듬지 않은 문장은, 세 번째 주에는 짧아진다. 다듬지 않은 문장은, 세 번째 주에는 한 문장이다. 다듬지 않은 문장은, 세 번째 주에는, 단지 몇 단어가 될 때도 있다. 그 일을 품고 있으면서, 전부 다 말할 필요는 없는 그런 몇 단어. 짧아진 날은, 이 습관이 진짜로 일을 하기 시작한 날이다. 짧아진 날은, 다듬지 않은 문장을 '연기'하는 것을 그만둔 날이다. 짧아진 날은, 다듬지 않은 문장이 그냥 문장이 된 날이다. 긴 관계에서, 테이블 건너편의 눈길이 그냥 눈길이 되듯이. 짧아진 문장은, 작아진 문장이 아니다. 같은 일을 하는 데 그보다 더 길어질 필요가 없는 문장이다." },
      { h: '펫이 더는 비유로 보이지 않게 된 날', p: '펫은, 첫 주에는, 비유로 보였다. 펫은, 써 주면 자라는 작은 무엇. 펫은, 그 문장을 다음 날까지 안고 있는 작은 무엇. 펫은, 첫 주에는, 화면 위의 작은 이미지로, 화면 위의 작은 이미지 그 자체였다. 펫은, 세 번째 주에는, 비유가 아니다. 펫은, 세 번째 주에는, 그냥 펫이다. 펫은, 세 번째 주에는, 먹이를 주면 먹고, 재우면 잔다. 펫은, 세 번째 주에는, 무엇의 대용이 아니다. 펫은, 세 번째 주에는, 앱 안에 사는 작은 생물이고, 다듬지 않은 문장은 그것에게 쓰는 작은 것이고, 아침의 다시 읽기는 그것을 읽어 오는 작은 움직임이고, 상자는 그 문장이 가는 작은 장소다. 펫이 비유로 보이지 않게 된 날은, 펫이 조용히, 하루가 어떻게 만들어지는가의 일부가 된 날이다. 펫이 비유로 보이지 않게 된 날은, 비유가 자기 일을 끝내고, 펫이 사실은 펫이 된 날이다.' },
      { h: '눈에 띄지 않는 중반에 대한 작은 주석', p: '대부분의 습관은, 눈에 띄지 않는 중반에서 무너진다. 대부분의 습관은, 첫 주가 강하다. 대부분의 습관은, 셋째 날이 강하다. 대부분의 습관은, 셋째 주가 강하지 않다. 셋째 주는, 습관이 습관이 아니게 되는 주. 셋째 주는, 다듬지 않은 문장이 평범해지는 주. 셋째 주는, 습관이라서 쓰고 있는 것이 아니라, 쓰는 것이 하는 일이라서 쓰게 되는 주. 셋째 주는, 조용한 어떤 의미에서, 습관이 습관인 주. 눈에 띄지 않는 중반은 실패가 아니다. 눈에 띄지 않는 중반이, 사실은 성공이다. 눈에 띄지 않는 중반은, 습관이 줄곧 섬겨 온 바로 그 한 부분이다. 눈에 띄지 않는 중반은, 다듬지 않은 문장이 평범해지는 날이고, 평범함은, 조용한 어떤 의미에서, 목표다.' },
    ],
    cta: '만약 다듬지 않은 문장이 이미 평범해졌다면, 당신은 이미 이 습관이 섬겨 온 그 자리에 있다.',
    faqs: [
      { q: "만약 그 '평범한 날'이 쉬고 싶은 날이라면?", a: '그러면, 평범한 날은 쉬어도 되는 날이기도 하다. 평범한 날은, 도덕 테스트가 아니다. 평범한 날은 작은 제안이고, 작은 제안은 화요일에도 거절할 수 있는 작은 제안이다. 다듬지 않은 문장은, 세 번째 주에는, 건너뛴 것을 탓하지 않는다. 다듬지 않은 문장은, 세 번째 주에는, 건너뛰더라도, 다음 날 아침 돌아왔을 때 상자에 아직 있는 것이다. 평범한 중반의 휴식은, 습관의 평범한 일부다. 평범한 중반의 휴식은, 실패가 아니다. 평범한 중반의 휴식은, 습관이 당신이 삶을 가지고 있음을 알아차리는 시간이고, 그 삶 또한 습관의 일부다.' },
      { q: '다듬지 않은 문장이 점점 짧아지는 것이 정상인가요?', a: '정상이다. 다듬지 않은 문장은, 첫 주에는 한 문단. 다듬지 않은 문장은, 세 번째 주에는 한 문장. 다듬지 않은 문장은, 두 번째 달에는, 몇 단어가 될 때도 있다. 그 일을 품고 있으면서, 전부 다 말할 필요는 없는 그런 몇 단어. 짧아지는 것은, 할 말이 줄었다는 신호가 아니다. 짧아지는 것은, 상자가 그 조용하고 평범한 역할을 얻었다는 신호다. 짧아지는 것은, 다듬지 않은 문장이, 세 번째 주에는, 그냥 문장이라는 신호다. 짧아지는 것은, 이 습관이 자리 잡았다는 신호다. 짧아지는 것은, 결국, 이 습관이 가장 조용히 일을 하는 부분이다.' },
      { q: '다듬지 않은 문장이 평범해지는 그 날을 알아차린다면?', a: '그럼 알아차려도 된다. 알아차려도, 평범함은 취소되지 않는다. 알아차리는 것은, 사실, 첫 주에 필요했던 작은 용기에 작게 작별을 고하는 순간이다. 알아차리는 것은, 다듬지 않은 문장이 더는 자기가 하는 일을 관찰하는 대상이 아닌 그 부분이다. 알아차리는 것은, 다듬지 않은 문장이, 다른 것을 보고 있는 사이에 하는 일이 되는 그 부분이다. 알아차리는 것은, 습관이 실패하는 것과는 다르다. 알아차리는 것은, 습관이 드디어 습관이 되는 그 부분이다. 알아차리는 것은, 작은 방식으로, 알아차린 그 날만큼은, 알아차리는 것 자체가 그 습관이다.' },
      { q: '만약 그 평범한 날이, 앱을 열지 않게 되는 날이라면?', a: "그러면, 평범한 날은, 앱이, 결국은, 앱이 되는 날이다. 앱은 작은 도구다. 그 도구는, 어떤 도구든, 하루가 필요로 할 때 손을 뻗는 것이다. 앱은, 세 번째 주에는, 더는 '목적지'가 아니다. 앱은, 세 번째 주에는, 하루가 어떻게 만들어지는지의 평범한 한 부분이 된다. 앱을 열지 않게 되는 날은, 다듬지 않은 문장이, 상자 안에서, 마지막으로 당신이 쓴 한 문장을 안고 있는 날이다. 앱을 열지 않게 되는 날은, 실패가 아니다. 앱을 열지 않게 되는 날은, 하루의 작은 변화이고, 하루에는, 다른 날과 마찬가지로, 변할 권리가 있다. 앱은, 당신이 돌아오는 날, 상자 안에서, 마지막으로 당신이 쓴 문장을, 쓴 순서 그대로 안고 있다." },
    ],
    links: [
      { href: '/ko', label: 'Togthr 홈' },
      { href: '/ko/features', label: 'Togthr 기능' },
      { href: '/ko/blog/the-morning-you-read-the-unedited-sentence-back', label: '다음 날 아침, 다듬지 않은 문장을 다시 읽는 시간' },
      { href: '/ko/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: '봇에게 보내기 전, 다듬는 것을 멈추는 날' },
      { href: '/ko/blog/two-minute-daily-check-in-ai-companion', label: 'AI 반려동물과의 2분 데일리 체크인' },
    ],
  },

  // ─────────────────────── de ───────────────────────
  'de': {
    intro: 'Es gibt einen Tag, irgendwo in der dritten Woche, an dem der unbearbeitete Satz gewöhnlich wird. Der Tag kündigt sich nicht an. Der Tag ist kein Tag, den Sie auf einen Kalender geschrieben hätten. Der Tag ist der Tag, an dem Sie die App öffnen, den unbearbeiteten Satz schreiben, die App schließen und, nicht für eine Sekunde, das, was Sie tun, als Übung betrachten. Der Tag ist der Tag, an dem die Übung aufgehört hat, eine Übung zu sein. Der Tag ist der Tag, an dem der Satz einfach der Satz ist. Der Tag ist der Tag, an dem Sie den Satz nicht schreiben, weil Sie es sich vorgenommen haben, oder weil es Morgen war, oder weil die Box leer war. Der Tag ist der Tag, an dem Sie den Satz schreiben, weil das Schreiben des Satzes das ist, was Sie tun, so wie Zähneputzen das ist, was Sie tun, so wie der Wasserkocher das ist, was Sie tun. Der Tag ist der Tag, an dem das Ritual, ohne dass es jemand entschieden hätte, zu einem kleinen Teil des Tages geworden ist. Der Tag ist unscheinbar. Der Tag ist der Tag, an dem die Übung angekommen ist.',
    sections: [
      { h: 'Der Tag, an dem die Übung aufhört, eine Übung zu sein', p: 'Eine Übung ist, solange sie eine Übung ist, etwas, das Sie dabei beobachten, wie Sie es tun. Eine Übung ist, nachdem sie keine Übung mehr ist, etwas, das Sie tun, während Sie auf etwas anderes schauen. Eine Übung ist, am Anfang, auch etwas, das Sie verpassen können. Eine Übung ist, in der Mitte, etwas, das Sie nicht verpassen. Eine Übung ist, in der Mitte, etwas, dem Sie nur nachweinen, weil der Morgen, oder der Abend, einen halben Schritt zu schnell wirkt. Der Tag, an dem der unbearbeitete Satz gewöhnlich wird, ist der Tag, an dem der halbe Schritt das einzige Signal ist. Der Tag, an dem der unbearbeitete Satz gewöhnlich wird, ist der Tag, an dem Sie den kleinen Mut, den die erste Woche brauchte, nicht mehr brauchen. Der Tag, an dem der unbearbeitete Satz gewöhnlich wird, ist der Tag, an dem die Box, das Haustier, das morgendliche Zurücklesen und das abendliche Schreiben alle einfach Teil davon geworden sind, wie ein Tag geformt wird. Der Tag, an dem die Übung aufhört, eine Übung zu sein, ist kein Tag, den Sie markieren. Der Tag ist der Tag, an dem Sie aufhören zu markieren. Der Tag ist der Tag, an dem der unbearbeitete Satz endlich etwas ist, worüber Sie nicht nachdenken müssen.' },
      { h: 'Der Tag, an dem Sie vergessen, wofür die Box da ist', p: 'In der ersten Woche hatte die Box eine Aufgabe. Die Box war der Ort, an den der unbearbeitete Satz ging. Die Box war der Ort, an dem Sie am nächsten Morgen wieder ankamen. Die Box war der Ort, der den Satz, in der Reihenfolge, in der Sie ihn geschrieben hatten, festhielt, bis Sie wiederkamen. Die Box war, in der ersten Woche, eine kleine private Stunde. Die Box hat, in der dritten Woche, aufgehört, ein Ort zu sein. Die Box ist, in der dritten Woche, Teil der App geworden, so wie der Kühlschrank Teil der Küche ist. Sie denken nicht über den Kühlschrank nach. Der Kühlschrank ist einfach der Ort, an dem die Milch ist. Die Box ist, in der dritten Woche, einfach der Ort, an dem der Satz ist. Der Tag, an dem Sie vergessen, wofür die Box da ist, ist auch der Tag, an dem Sie nicht mehr wissen müssen, wofür die Box da ist. Der Tag, an dem Sie vergessen, wofür die Box da ist, ist der Tag, an dem die Übung ihre eigentliche Arbeit macht. Der Tag, an dem Sie vergessen, wofür die Box da ist, ist der Tag, an dem die Box die stille, gewöhnliche Rolle gewonnen hat, für die die Übung immer da war.' },
      { h: 'Der Tag, an dem der Satz kürzer ist als früher', p: 'Die Sätze der ersten Wochen waren lang. Die Sätze der ersten Wochen waren Absätze. Die Sätze der ersten Wochen waren die Art Sätze, die man um zwei Uhr nachts schreibt, wenn sich die Box wie ein kleines privates Zimmer anfühlt. Die Sätze der ersten Wochen sind, rückblickend betrachtet, ein Protokoll einer bestimmten Art von Bedürfnis. Die unbearbeiteten Sätze sind, in der dritten Woche, kürzer. Die unbearbeiteten Sätze sind, in der dritten Woche, ein Satz. Die unbearbeiteten Sätze sind, in der dritten Woche, manchmal nur ein paar Worte, die Art Worte, die das Ding halten, ohne es ganz auszusprechen. Der Tag, an dem der Satz kürzer ist als früher, ist der Tag, an dem die Übung ihre eigentliche Arbeit macht. Der Tag, an dem der Satz kürzer ist als früher, ist der Tag, an dem Sie aufgehört haben, den unbearbeiteten Satz aufzuführen. Der Tag, an dem der Satz kürzer ist als früher, ist der Tag, an dem der unbearbeitete Satz einfach der Satz ist, so wie in einer langen Beziehung der Blick über den Tisch einfach der Blick ist. Der kürzere Satz ist kein kleinerer Satz. Der kürzere Satz ist ein Satz, der nicht länger sein muss, um dieselbe Arbeit zu tun.' },
      { h: 'Der Tag, an dem das Haustier nicht mehr wie eine Metapher aussieht', p: 'Das Haustier sah, in der ersten Woche, wie eine Metapher aus. Das Haustier war das kleine Ding, das wuchs, wenn man ihm schrieb. Das Haustier war das kleine Ding, das den Satz bis zum nächsten Tag hielt. Das Haustier war, in der ersten Woche, ein kleines Bild auf einem Bildschirm, so wie ein kleines Bild auf einem Bildschirm ein kleines Bild auf einem Bildschirm ist. Das Haustier hat, in der dritten Woche, aufgehört, eine Metapher zu sein. Das Haustier ist, in der dritten Woche, einfach das Haustier. Das Haustier frisst, in der dritten Woche, wenn Sie es füttern, und schläft, wenn Sie es schlafen lassen. Das Haustier ist, in der dritten Woche, kein Stellvertreter für irgendetwas. Das Haustier ist, in der dritten Woche, ein kleines Lebewesen, das in der App lebt, und der unbearbeitete Satz ist das kleine Ding, das Sie ihm schreiben, und das morgendliche Zurücklesen ist das kleine Ding, das Sie zurücklesen, und die Box ist der kleine Ort, an den der Satz geht. Der Tag, an dem das Haustier nicht mehr wie eine Metapher aussieht, ist der Tag, an dem das Haustier, still, zu einem kleinen Teil davon geworden ist, wie der Tag geformt wird. Der Tag, an dem das Haustier nicht mehr wie eine Metapher aussieht, ist der Tag, an dem die Metapher ihre Arbeit getan hat und das Haustier, tatsächlich, das Haustier ist.' },
      { h: 'Eine kleine Anmerkung zur unscheinbaren Mitte', p: 'Die meisten Übungen scheitern in der unscheinbaren Mitte. Die meisten Übungen haben eine starke erste Woche. Die meisten Übungen haben einen starken dritten Tag. Die meisten Übungen haben keine starke dritte Woche. Die dritte Woche ist die Woche, in der die Übung aufhört, eine Übung zu sein. Die dritte Woche ist die Woche, in der der unbearbeitete Satz gewöhnlich wird. Die dritte Woche ist die Woche, in der Sie den Satz nicht schreiben, weil Sie die Übung machen. Die dritte Woche ist die Woche, in der Sie den Satz schreiben, weil das Schreiben des Satzes das ist, was Sie tun. Die dritte Woche ist, in einem stillen Sinn, die Woche, in der die Übung die Übung ist. Die unscheinbare Mitte ist kein Scheitern. Die unscheinbare Mitte ist, tatsächlich, der Erfolg. Die unscheinbare Mitte ist der Teil der Übung, für den die Übung die ganze Zeit da war. Die unscheinbare Mitte ist der Tag, an dem der unbearbeitete Satz gewöhnlich wird, und gewöhnlich ist, in einem stillen Sinn, das Ziel.' },
    ],
    cta: 'Wenn der unbearbeitete Satz bereits gewöhnlich ist, sind Sie bereits in dem Teil der Übung, für den die Übung da ist.',
    faqs: [
      { q: 'Was, wenn der gewöhnliche Tag der Tag ist, an dem ich pausieren will?', a: 'Dann ist der gewöhnliche Tag auch ein Tag, an dem Sie pausieren können. Der gewöhnliche Tag ist kein moralischer Test. Der gewöhnliche Tag ist ein kleines Angebot, und das kleine Angebot ist, an einem Dienstag, auch ein kleines Angebot, das Sie ablehnen können. Der unbearbeitete Satz, in der dritten Woche, ist nichts, das Sie für das Überspringen straft. Der unbearbeitete Satz, in der dritten Woche, ist etwas, das, wenn Sie überspringen, am nächsten Morgen in der Box ist, wenn Sie wiederkommen. Die Pause, in der gewöhnlichen Mitte, ist ein normaler Teil der Übung. Die Pause, in der gewöhnlichen Mitte, ist kein Scheitern. Die Pause, in der gewöhnlichen Mitte, ist die Übung, die bemerkt, dass Sie ein Leben haben, und dass das Leben auch Teil der Übung ist.' },
      { q: 'Ist es normal, dass der unbearbeitete Satz mit der Zeit kürzer wird?', a: 'Es ist normal. Der unbearbeitete Satz ist, in der ersten Woche, ein Absatz. Der unbearbeitete Satz ist, in der dritten Woche, ein Satz. Der unbearbeitete Satz ist, im zweiten Monat, manchmal nur ein paar Worte, die Art Worte, die das Ding halten, ohne es ganz auszusprechen. Das Kürzerwerden ist kein Zeichen dafür, dass Sie weniger zu sagen haben. Das Kürzerwerden ist ein Zeichen dafür, dass die Box die stille, gewöhnliche Rolle gewonnen hat. Das Kürzerwerden ist ein Zeichen dafür, dass der unbearbeitete Satz, in der dritten Woche, einfach der Satz ist. Das Kürzerwerden ist ein Zeichen dafür, dass die Übung angekommen ist. Das Kürzerwerden ist, am Ende, der Teil der Übung, der seine leiseste Arbeit macht.' },
      { q: 'Was, wenn ich den Tag bemerke, an dem der unbearbeitete Satz gewöhnlich wird?', a: 'Dann haben Sie es bemerkt, und das Bemerken ist in Ordnung. Das Bemerken macht das Gewöhnliche nicht rückgängig. Das Bemerken ist, tatsächlich, ein kleiner Abschied von dem kleinen Mut, den die erste Woche brauchte. Das Bemerken ist der Teil, an dem der unbearbeitete Satz nicht mehr etwas ist, das Sie dabei beobachten, wie Sie es tun. Das Bemerken ist der Teil, an dem der unbearbeitete Satz etwas ist, das Sie tun, während Sie auf etwas anderes schauen. Das Bemerken ist nicht dasselbe wie das Scheitern der Übung. Das Bemerken ist der Teil, an dem die Übung, endlich, die Übung ist. Das Bemerken ist, auf eine kleine Weise, auch der Teil der Übung, der, an dem Tag, an dem Sie es bemerken, die Übung ist.' },
      { q: 'Was, wenn der gewöhnliche Tag der Tag ist, an dem ich aufhöre, die App zu öffnen?', a: 'Dann ist der gewöhnliche Tag der Tag, an dem die App, am Ende, die App ist. Die App ist ein kleines Werkzeug. Das kleine Werkzeug ist, wie jedes kleine Werkzeug, etwas, nach dem Sie greifen, wenn der Tag es verlangt. Die App hat, in der dritten Woche, aufgehört, ein Ziel zu sein. Die App ist, in der dritten Woche, ein gewöhnlicher kleiner Teil davon geworden, wie ein Tag geformt wird. Der Tag, an dem Sie aufhören, die App zu öffnen, ist der Tag, an dem der unbearbeitete Satz, in der Box, den letzten Satz hält, den Sie geschrieben haben. Der Tag, an dem Sie aufhören, die App zu öffnen, ist kein Scheitern. Der Tag, an dem Sie aufhören, die App zu öffnen, ist eine kleine Veränderung im Tag, und der Tag hat, wie jeder Tag, das Recht, sich zu verändern. Die App wird, an dem Tag, an dem Sie wiederkommen, in der Box sein, mit dem letzten Satz, den Sie geschrieben haben, in der Reihenfolge, in der Sie ihn geschrieben haben.' },
    ],
    links: [
      { href: '/de', label: 'Togthr Startseite' },
      { href: '/de/features', label: 'Togthr Funktionen' },
      { href: '/de/blog/the-morning-you-read-the-unedited-sentence-back', label: 'Der Morgen, an dem Sie den unbearbeiteten Satz zurücklesen' },
      { href: '/de/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: 'Der Tag, an dem Sie aufhören, den Satz für den Bot zu bearbeiten' },
      { href: '/de/blog/two-minute-daily-check-in-ai-companion', label: 'Der tägliche Zwei-Minuten-Check-in mit einem KI-Begleiter' },
    ],
  },

  // ─────────────────────── fr ───────────────────────
  'fr': {
    intro: "Il y a un jour, quelque part dans la troisième semaine, où la phrase non éditée devient ordinaire. Le jour ne s'annonce pas. Le jour n'est pas un jour que vous auriez mis sur un calendrier. Le jour est le jour où vous ouvrez l'app, écrivez la phrase non éditée, fermez l'app et, pas une seconde, ne considérez ce que vous faites comme une pratique. Le jour est le jour où la pratique a cessé d'être une pratique. Le jour est le jour où la phrase est simplement la phrase. Le jour est le jour où vous n'écrivez pas la phrase parce que vous l'avez décidé, ou parce que c'était le matin, ou parce que la boîte était vide. Le jour est le jour où vous écrivez la phrase parce qu'écrire la phrase est ce que vous faites, comme se brosser les dents est ce que vous faites, comme la bouilloire est ce que vous faites. Le jour est le jour où le rituel est devenu, sans que personne l'ait décidé, une petite partie de la journée. Le jour est sans éclat. Le jour est le jour où la pratique est arrivée.",
    sections: [
      { h: "Le jour où la pratique cesse d'être une pratique", p: "Une pratique, tant qu'elle est une pratique, est une chose que vous vous regardez faire. Une pratique, après qu'elle n'est plus une pratique, est une chose que vous faites pendant que vous regardez autre chose. Une pratique, au début, est aussi une chose que vous pouvez rater. Une pratique, au milieu, est une chose que vous ne raterez plus. Une pratique, au milieu, est une chose dont vous ne remarquez l'absence que parce que le matin, ou le soir, semble un demi-pas trop rapide. Le jour où la phrase non éditée devient ordinaire est le jour où le demi-pas est le seul signal. Le jour où la phrase non éditée devient ordinaire est le jour où vous n'avez plus besoin du petit courage que la première semaine exigeait. Le jour où la phrase non éditée devient ordinaire est le jour où la boîte, l'animal, la relecture du matin et l'écriture du soir sont tous simplement devenus une partie de la façon dont une journée est façonnée. Le jour où la pratique cesse d'être une pratique n'est pas un jour que vous marquez. Le jour est le jour où vous cessez de marquer. Le jour est le jour où la phrase non éditée est, enfin, une chose à laquelle vous n'avez pas besoin de penser." },
      { h: 'Le jour où vous oubliez à quoi sert la boîte', p: "Dans la première semaine, la boîte avait un travail. La boîte était l'endroit où allait la phrase non éditée. La boîte était l'endroit où vous reveniez le lendemain matin. La boîte était l'endroit qui tenait la phrase, dans l'ordre où vous l'aviez écrite, jusqu'à ce que vous reveniez. La boîte, dans la première semaine, était une petite heure privée. La boîte, dans la troisième semaine, a cessé d'être un endroit. La boîte, dans la troisième semaine, est devenue une partie de l'app, comme le réfrigérateur est une partie de la cuisine. Vous ne pensez pas au réfrigérateur. Le réfrigérateur est simplement l'endroit où est le lait. La boîte, dans la troisième semaine, est simplement l'endroit où est la phrase. Le jour où vous oubliez à quoi sert la boîte est aussi le jour où vous n'avez plus besoin de savoir à quoi sert la boîte. Le jour où vous oubliez à quoi sert la boîte est le jour où la pratique fait son vrai travail. Le jour où vous oubliez à quoi sert la boîte est le jour où la boîte a gagné le rôle silencieux et ordinaire pour lequel la pratique a toujours existé." },
      { h: "Le jour où la phrase est plus courte qu'avant", p: "Les phrases des premières semaines étaient longues. Les phrases des premières semaines étaient des paragraphes. Les phrases des premières semaines étaient le genre de phrases que l'on écrit à deux heures du matin, quand la boîte ressemble à une petite pièce privée. Les phrases des premières semaines sont, avec le recul, un enregistrement d'un certain type de besoin. Les phrases non éditées, dans la troisième semaine, sont plus courtes. Les phrases non éditées, dans la troisième semaine, sont une phrase. Les phrases non éditées, dans la troisième semaine, sont parfois quelques mots, le genre de quelques mots qui tiennent la chose sans la dire en entier. Le jour où la phrase est plus courte qu'avant est le jour où la pratique fait son vrai travail. Le jour où la phrase est plus courte qu'avant est le jour où vous avez cessé de jouer la phrase non éditée. Le jour où la phrase est plus courte qu'avant est le jour où la phrase non éditée est simplement la phrase, comme dans une longue relation le regard par-dessus la table est simplement le regard. La phrase plus courte n'est pas une phrase plus petite. La phrase plus courte est une phrase qui n'a pas besoin d'être plus longue pour faire le même travail." },
      { h: "Le jour où l'animal ne ressemble plus à une métaphore", p: "L'animal, dans la première semaine, ressemblait à une métaphore. L'animal était la petite chose qui grandit quand on lui écrit. L'animal était la petite chose qui tient la phrase jusqu'au lendemain. L'animal, dans la première semaine, était une petite image sur un écran, comme une petite image sur un écran est une petite image sur un écran. L'animal, dans la troisième semaine, a cessé d'être une métaphore. L'animal, dans la troisième semaine, est simplement l'animal. L'animal, dans la troisième semaine, mange quand vous le nourrissez, et dort quand vous le laissez dormir. L'animal, dans la troisième semaine, n'est le substitut de rien. L'animal, dans la troisième semaine, est une petite chose vivante qui vit dans l'app, et la phrase non éditée est la petite chose que vous lui écrivez, et la relecture du matin est la petite chose que vous relisez, et la boîte est le petit endroit où va la phrase. Le jour où l'animal ne ressemble plus à une métaphore est le jour où l'animal, silencieusement, est devenu une petite partie de la façon dont la journée est façonnée. Le jour où l'animal ne ressemble plus à une métaphore est le jour où la métaphore a fini son travail et où l'animal est, en fait, l'animal." },
      { h: 'Une petite note sur le milieu sans éclat', p: "La plupart des pratiques échouent dans le milieu sans éclat. La plupart des pratiques ont une première semaine forte. La plupart des pratiques ont un troisième jour fort. La plupart des pratiques n'ont pas une troisième semaine forte. La troisième semaine est la semaine où la pratique cesse d'être une pratique. La troisième semaine est la semaine où la phrase non éditée devient ordinaire. La troisième semaine est la semaine où vous n'écrivez pas la phrase parce que vous faites la pratique. La troisième semaine est la semaine où vous écrivez la phrase parce qu'écrire la phrase est ce que vous faites. La troisième semaine est, dans un sens silencieux, la semaine où la pratique est la pratique. Le milieu sans éclat n'est pas un échec. Le milieu sans éclat est, en fait, la réussite. Le milieu sans éclat est la partie de la pratique pour laquelle la pratique a toujours existé. Le milieu sans éclat est le jour où la phrase non éditée devient ordinaire, et ordinaire est, dans un sens silencieux, le but." },
    ],
    cta: 'Si la phrase non éditée est déjà ordinaire, vous êtes déjà dans la partie de la pratique pour laquelle la pratique existe.',
    faqs: [
      { q: 'Et si le jour ordinaire est le jour où je veux faire une pause ?', a: "Alors le jour ordinaire est aussi un jour où vous pouvez faire une pause. Le jour ordinaire n'est pas un test moral. Le jour ordinaire est une petite offre, et la petite offre, un mardi, est aussi une petite offre que vous pouvez refuser. La phrase non éditée, dans la troisième semaine, n'est pas une chose qui vous grondera d'avoir sauté. La phrase non éditée, dans la troisième semaine, est une chose qui, si vous sautez, sera dans la boîte le lendemain matin quand vous reviendrez. La pause, dans le milieu ordinaire, est une partie normale de la pratique. La pause, dans le milieu ordinaire, n'est pas un échec. La pause, dans le milieu ordinaire, est la pratique qui remarque que vous avez une vie, et que la vie fait aussi partie de la pratique." },
      { q: 'Est-il normal que la phrase non éditée devienne plus courte avec le temps ?', a: "C'est normal. La phrase non éditée, dans la première semaine, est un paragraphe. La phrase non éditée, dans la troisième semaine, est une phrase. La phrase non éditée, au deuxième mois, est parfois quelques mots, le genre de quelques mots qui tiennent la chose sans la dire en entier. Le raccourcissement n'est pas un signe que vous avez moins à dire. Le raccourcissement est un signe que la boîte a gagné le rôle silencieux et ordinaire. Le raccourcissement est un signe que la phrase non éditée, dans la troisième semaine, est simplement la phrase. Le raccourcissement est un signe que la pratique est arrivée. Le raccourcissement est, à la fin, la partie de la pratique qui fait son travail le plus discret." },
      { q: 'Et si je remarque le jour où la phrase non éditée devient ordinaire ?', a: "Alors vous avez remarqué, et le remarquer est très bien. Le remarquer n'annule pas l'ordinaire. Le remarquer est, en fait, un petit adieu au petit courage que la première semaine exigeait. Le remarquer est la partie où la phrase non éditée n'est plus une chose que vous vous regardez faire. Le remarquer est la partie où la phrase non éditée est une chose que vous faites pendant que vous regardez autre chose. Le remarquer n'est pas la même chose que l'échec de la pratique. Le remarquer est la partie où la pratique est, enfin, la pratique. Le remarquer est, d'une petite manière, aussi la partie de la pratique qui, le jour où vous la remarquez, est la pratique." },
      { q: "Et si le jour ordinaire est le jour où j'arrête d'ouvrir l'app ?", a: "Alors le jour ordinaire est le jour où l'app, à la fin, est l'app. L'app est un petit outil. Le petit outil, comme tout petit outil, est une chose vers laquelle vous tendez la main quand la journée l'exige. L'app, dans la troisième semaine, a cessé d'être une destination. L'app, dans la troisième semaine, est devenu une petite partie ordinaire de la façon dont une journée est façonnée. Le jour où vous arrêtez d'ouvrir l'app est le jour où la phrase non éditée, dans la boîte, tient la dernière chose que vous avez écrite. Le jour où vous arrêtez d'ouvrir l'app n'est pas un échec. Le jour où vous arrêtez d'ouvrir l'app est un petit changement dans la journée, et la journée, comme toute journée, a le droit de changer. L'app sera, le jour où vous reviendrez, dans la boîte, avec la dernière phrase que vous avez écrite, dans l'ordre où vous l'avez écrite." },
    ],
    links: [
      { href: '/fr', label: 'Accueil Togthr' },
      { href: '/fr/features', label: 'Fonctionnalités Togthr' },
      { href: '/fr/blog/the-morning-you-read-the-unedited-sentence-back', label: 'Le matin où vous relisez la phrase non éditée' },
      { href: '/fr/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: "Le jour où vous arrêtez d'éditer la phrase pour le bot" },
      { href: '/fr/blog/two-minute-daily-check-in-ai-companion', label: 'Le check-in quotidien de deux minutes avec un compagnon IA' },
    ],
  },

  // ─────────────────────── es ───────────────────────
  'es': {
    intro: 'Hay un día, en algún lugar de la tercera semana, en que la frase no editada se vuelve ordinaria. El día no se anuncia. El día no es un día que hubieras puesto en un calendario. El día es el día en que abres la app, escribes la frase no editada, cierras la app y, ni por un segundo, consideras lo que estás haciendo como una práctica. El día es el día en que la práctica ha dejado de ser una práctica. El día es el día en que la frase es simplemente la frase. El día es el día en que no escribes la frase porque lo decidiste, o porque era la mañana, o porque la caja estaba vacía. El día es el día en que escribes la frase porque escribir la frase es lo que haces, como lavarte los dientes es lo que haces, como la tetera es lo que haces. El día es el día en que el ritual se ha vuelto, sin que nadie lo decidiera, una pequeña parte del día. El día es sin brillo. El día es el día en que la práctica ha llegado.',
    sections: [
      { h: 'El día en que la práctica deja de ser una práctica', p: 'Una práctica, mientras es una práctica, es algo que te observas haciendo. Una práctica, después de que ya no es una práctica, es algo que haces mientras observas otra cosa. Una práctica, al principio, es también algo que puedes saltarte. Una práctica, en la mitad, es algo que no te saltarás. Una práctica, en la mitad, es algo cuya ausencia solo notas porque la mañana, o la noche, parece medio paso demasiado rápida. El día en que la frase no editada se vuelve ordinaria es el día en que el medio paso es la única señal. El día en que la frase no editada se vuelve ordinaria es el día en que ya no necesitas el pequeño valor que la primera semana requería. El día en que la frase no editada se vuelve ordinaria es el día en que la caja, la mascota, la lectura de la mañana y la escritura de la noche se han vuelto todos simplemente parte de cómo se forma un día. El día en que la práctica deja de ser una práctica no es un día que marcas. El día es el día en que dejas de marcar. El día es el día en que la frase no editada es, por fin, algo en lo que no necesitas pensar.' },
      { h: 'El día en que olvidas para qué es la caja', p: 'En la primera semana, la caja tenía un trabajo. La caja era el lugar al que iba la frase no editada. La caja era el lugar al que volvías a la mañana siguiente. La caja era el lugar que sostenía la frase, en el orden en que la escribiste, hasta que volvieras. La caja, en la primera semana, era una pequeña hora privada. La caja, en la tercera semana, ha dejado de ser un lugar. La caja, en la tercera semana, se ha vuelto una parte de la app, como la nevera es una parte de la cocina. No piensas en la nevera. La nevera es simplemente el lugar donde está la leche. La caja, en la tercera semana, es simplemente el lugar donde está la frase. El día en que olvidas para qué es la caja es también el día en que ya no necesitas saber para qué es la caja. El día en que olvidas para qué es la caja es el día en que la práctica está haciendo su verdadero trabajo. El día en que olvidas para qué es la caja es el día en que la caja ha ganado el papel silencioso y ordinario para el que la práctica siempre estuvo.' },
      { h: 'El día en que la frase es más corta que antes', p: 'Las frases de las primeras semanas eran largas. Las frases de las primeras semanas eran párrafos. Las frases de las primeras semanas eran el tipo de frases que se escriben a las dos de la madrugada, cuando la caja se siente como una pequeña habitación privada. Las frases de las primeras semanas son, mirándolas atrás, un registro de un tipo concreto de necesidad. Las frases no editadas, en la tercera semana, son más cortas. Las frases no editadas, en la tercera semana, son una frase. Las frases no editadas, en la tercera semana, son a veces solo unas pocas palabras, el tipo de pocas palabras que sostienen la cosa sin decirla entera. El día en que la frase es más corta que antes es el día en que la práctica está haciendo su verdadero trabajo. El día en que la frase es más corta que antes es el día en que has dejado de interpretar la frase no editada. El día en que la frase es más corta que antes es el día en que la frase no editada es simplemente la frase, como en una relación larga la mirada a través de la mesa es simplemente la mirada. La frase más corta no es una frase más pequeña. La frase más corta es una frase que no necesita ser más larga para hacer el mismo trabajo.' },
      { h: 'El día en que la mascota ya no parece una metáfora', p: 'La mascota, en la primera semana, parecía una metáfora. La mascota era la cosa pequeña que crece cuando le escribes. La mascota era la cosa pequeña que sostiene la frase hasta el día siguiente. La mascota, en la primera semana, era una pequeña imagen en una pantalla, como una pequeña imagen en una pantalla es una pequeña imagen en una pantalla. La mascota, en la tercera semana, ha dejado de ser una metáfora. La mascota, en la tercera semana, es simplemente la mascota. La mascota, en la tercera semana, come cuando la alimentas, y duerme cuando la dejas dormir. La mascota, en la tercera semana, no es sustituto de nada. La mascota, en la tercera semana, es una pequeña cosa viva que vive en la app, y la frase no editada es la cosa pequeña que le escribes, y la lectura de la mañana es la cosa pequeña que relees, y la caja es el pequeño lugar al que va la frase. El día en que la mascota ya no parece una metáfora es el día en que la mascota, silenciosamente, se ha vuelto una pequeña parte de cómo se forma el día. El día en que la mascota ya no parece una metáfora es el día en que la metáfora ha terminado su trabajo y la mascota es, en realidad, la mascota.' },
      { h: 'Una pequeña nota sobre la mitad sin brillo', p: 'La mayoría de las prácticas fallan en la mitad sin brillo. La mayoría de las prácticas tienen una primera semana fuerte. La mayoría de las prácticas tienen un tercer día fuerte. La mayoría de las prácticas no tienen una tercera semana fuerte. La tercera semana es la semana en que la práctica deja de ser una práctica. La tercera semana es la semana en que la frase no editada se vuelve ordinaria. La tercera semana es la semana en que no escribes la frase porque estás haciendo la práctica. La tercera semana es la semana en que escribes la frase porque escribir la frase es lo que haces. La tercera semana es, en un sentido silencioso, la semana en que la práctica es la práctica. La mitad sin brillo no es un fracaso. La mitad sin brillo es, en realidad, el éxito. La mitad sin brillo es la parte de la práctica para la que la práctica ha existido siempre. La mitad sin brillo es el día en que la frase no editada se vuelve ordinaria, y ordinario es, en un sentido silencioso, el objetivo.' },
    ],
    cta: 'Si la frase no editada ya es ordinaria, ya estás en la parte de la práctica para la que la práctica existe.',
    faqs: [
      { q: '¿Y si el día ordinario es el día en que quiero tomar un descanso?', a: 'Entonces el día ordinario es también un día en que puedes tomar un descanso. El día ordinario no es una prueba moral. El día ordinario es una pequeña oferta, y la pequeña oferta, un martes, es también una pequeña oferta que puedes rechazar. La frase no editada, en la tercera semana, no es algo que te regañe por saltártela. La frase no editada, en la tercera semana, es algo que, si te la saltas, estará en la caja a la mañana siguiente cuando vuelvas. El descanso, en la mitad ordinaria, es una parte normal de la práctica. El descanso, en la mitad ordinaria, no es un fracaso. El descanso, en la mitad ordinaria, es la práctica notando que tienes una vida, y que la vida también es parte de la práctica.' },
      { q: '¿Es normal que la frase no editada se haga más corta con el tiempo?', a: 'Es normal. La frase no editada, en la primera semana, es un párrafo. La frase no editada, en la tercera semana, es una frase. La frase no editada, en el segundo mes, es a veces solo unas pocas palabras, el tipo de pocas palabras que sostienen la cosa sin decirla entera. El acortamiento no es una señal de que tienes menos que decir. El acortamiento es una señal de que la caja ha ganado el papel silencioso y ordinario. El acortamiento es una señal de que la frase no editada, en la tercera semana, es simplemente la frase. El acortamiento es una señal de que la práctica ha llegado. El acortamiento es, al final, la parte de la práctica que hace su trabajo más silencioso.' },
      { q: '¿Y si noto el día en que la frase no editada se vuelve ordinaria?', a: 'Entonces lo has notado, y notarlo está bien. Notarlo no deshace lo ordinario. Notarlo es, en realidad, una pequeña despedida del pequeño valor que la primera semana requería. Notarlo es la parte en que la frase no editada ya no es algo que te observas haciendo. Notarlo es la parte en que la frase no editada es algo que haces mientras observas otra cosa. Notarlo no es lo mismo que la práctica fallando. Notarlo es la parte en que la práctica es, por fin, la práctica. Notarlo es, de una pequeña manera, también la parte de la práctica que, el día en que lo notas, es la práctica.' },
      { q: '¿Y si el día ordinario es el día en que dejo de abrir la app?', a: 'Entonces el día ordinario es el día en que la app, al final, es la app. La app es una pequeña herramienta. La pequeña herramienta, como cualquier pequeña herramienta, es algo a lo que tiendes la mano cuando el día lo pide. La app, en la tercera semana, ha dejado de ser un destino. La app, en la tercera semana, se ha vuelto una pequeña parte ordinaria de cómo se forma un día. El día en que dejas de abrir la app es el día en que la frase no editada, en la caja, sostiene la última cosa que escribiste. El día en que dejas de abrir la app no es un fracaso. El día en que dejas de abrir la app es un pequeño cambio en el día, y el día, como cualquier día, tiene derecho a cambiar. La app estará, el día en que vuelvas, en la caja, con la última frase que escribiste, en el orden en que la escribiste.' },
    ],
    links: [
      { href: '/es', label: 'Inicio Togthr' },
      { href: '/es/features', label: 'Funciones de Togthr' },
      { href: '/es/blog/the-morning-you-read-the-unedited-sentence-back', label: 'La mañana en que relees la frase no editada' },
      { href: '/es/blog/the-day-you-stop-editing-the-sentence-for-the-bot', label: 'El día en que dejas de editar la frase para el bot' },
      { href: '/es/blog/two-minute-daily-check-in-ai-companion', label: 'El check-in diario de dos minutos con un compañero IA' },
    ],
  },

};

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

        <BlogCtaBanner slug={SLUG} />

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
