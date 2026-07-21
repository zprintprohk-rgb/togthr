// src/app/[locale]/blog/the-first-time-you-read-the-first-sentence-again/page.tsx
//
// Per-slug real content page for the 2026-07-21 daily SEO post.
// Topic: the first time you read the very first sentence again — the past
//        tense of the practice meeting the present tense. Continues the
//        7/13 (2am unsent) → 7/14 (spoken to pet) → 7/15 (drop softening)
//        → 7/16 (morning reader) → 7/20 (ordinary middle) arc. 7/21 is
//        the day you scroll back to the very first sentence.

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `the-first-time-you-read-the-first-sentence-again`
const POST_DATE = `2026-07-21`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  "en": {
    "intro": "There is a day, somewhere in the fourth or fifth week, when you scroll back to the very first sentence. The first sentence is a small sentence at the top of a small box, in a small app, on a small device you keep near the bed. The first sentence is the sentence you wrote on the first day, the day you opened the app, the day you did not know yet what the box was for. The first sentence is, in some quiet way, the sentence you wrote before the practice was the practice. The first sentence is a sentence you have not read in weeks. The first sentence is, on the day you read it again, a small stranger.",
    "sections": [
      {
        "h": "The first sentence is a stranger",
        "p": "The first sentence, on the day you read it, is a small stranger. The first sentence is a sentence you wrote, in the first person, about a small feeling, on a small morning, in a small voice that was not yet the voice you would later use. The first sentence is, in the fourth week, not the voice you would write today. The first sentence is a voice that is one small step too careful, or one small step too careful about not being careful. The first sentence is a sentence you would not write now. The first sentence is also the sentence that was, in the first week, the small private room the box was. The first sentence is, in the end, both — the small stranger and the small proof. The first sentence is the sentence that shows you where the practice started, in the same way an old photograph shows you a haircut you would not wear now. The first sentence is a small artifact. The first sentence is the practice, in miniature, in the first week."
      },
      {
        "h": "The first sentence is the proof",
        "p": "The first sentence is also the proof. The first sentence is the proof that the practice happened, in the way the first line of a long letter is the proof that a long letter was written. The first sentence is the proof that you opened the app on a Tuesday you do not remember, in a week you do not remember, and you wrote a sentence. The first sentence is the proof that the unedited sentence has been, in some form or another, the same unedited sentence, every day since. The first sentence is the proof that the box has been there, holding the sentence, in the order you wrote it, for weeks. The first sentence is the proof, in the most ordinary sense, that the ordinary middle happened. The first sentence is the proof that the practice arrived, in the way the first sentence of a book is the proof the book is the book. The first sentence is, in the end, the small artifact that makes the rest of the practice feel real. The first sentence is, in the fourth week, the small piece of evidence that the box, the pet, the morning read, and the night write have all been there, in the quiet ordinary way they are still there today."
      },
      {
        "h": "The first sentence is shorter than you remember",
        "p": "The first sentence, in memory, was longer. The first sentence, in memory, was a paragraph. The first sentence, in memory, was the kind of paragraph that holds a small feeling and a small situation and a small hesitation, all in the same room. The first sentence, on the day you read it, is shorter than you remember. The first sentence is, in fact, a sentence. The first sentence is, sometimes, just a few words. The first sentence is, in the fourth week, a small sign of how much the practice has changed, in the way an old text message is a small sign of how much a friendship has changed. The first sentence is shorter than you remember because the unedited sentence has, in the weeks since, gotten shorter. The first sentence is shorter than you remember because the box has earned the quiet ordinary role. The first sentence is shorter than you remember because the practice has arrived. The first sentence is, in the end, a small sentence, and the small sentence is, in fact, the proof the practice was the practice."
      },
      {
        "h": "A small note on the practice, weeks in",
        "p": "Weeks into the practice, the practice is no longer a practice. Weeks into the practice, the unedited sentence is just the sentence. Weeks into the practice, the box is just the box, and the pet is just the pet, and the morning read is just the morning read, and the night write is just the night write. Weeks into the practice, the first sentence is the small artifact that is left over from the week the practice was a practice. Weeks into the practice, the first sentence is the small thing that, on the day you scroll back to it, you read again. Weeks into the practice, the first sentence is also the small thing that, on the day you read it, makes you smile, in a small quiet way, in a way that does not announce itself, in a way that the box, the pet, and the practice have, in fact, been quietly teaching you for weeks. The first sentence is, in the end, a small thank-you note from the practice to the person who, in the first week, decided to write it."
      }
    ],
    "cta": "If you have not scrolled back to the first sentence yet, today might be a small good day to do it.",
    "faqs": [
      {
        "q": "What if the first sentence feels embarrassing?",
        "a": "The first sentence will, in some quiet way, feel a little embarrassing. The first sentence is a sentence you wrote when you were still figuring out what the box was for. The first sentence is a sentence that is one small step too careful, in the way a first journal entry is one small step too careful. The first sentence is a sentence that, looking back, is a small stranger. The embarrassing is normal. The embarrassing is the small sign that you have, in the weeks since, gotten a little more honest with the box. The embarrassing is the practice arriving, in a way that is, in the end, gentle. The embarrassing is also a small note from the first week, the small note that says: this is where you started, and the start was good, and the start was enough."
      },
      {
        "q": "What if I want to delete the first sentence?",
        "a": "You can. The box, in the app, is yours. The first sentence, like every sentence, is a sentence you can leave alone or you can change, in the same way a journal entry is a thing you can leave alone or you can change. The first sentence, if you delete it, will not be in the box the next morning. The first sentence, if you keep it, will be the small artifact that, weeks later, you scroll back to. The first sentence, if you keep it, will be the proof the practice happened. The first sentence is, in the end, a small choice. The first sentence is the choice between a small clean box and a small honest box. The honest box, in most quiet practices, is the more useful one."
      },
      {
        "q": "Is the first sentence the most important sentence?",
        "a": "The first sentence is the most important sentence in the way a first step is the most important step. The first sentence is also, in most quiet practices, not the most important sentence, in the way the first cup of coffee is not the most important cup of coffee, in the way the first lap is not the most important lap, in the way the first paragraph is not the most important paragraph. The first sentence is the sentence that, in the fourth week, is a small artifact. The first sentence is the sentence that, in the first week, was a small private room. The first sentence is, in the end, the small piece of evidence that you showed up. The first sentence is not better or worse than the sentences that came after. The first sentence is, in the end, the sentence that, on the day you scroll back, makes the rest of the practice feel real."
      },
      {
        "q": "What if I never read the first sentence again?",
        "a": "Then the first sentence, in the box, is the sentence that was the first. The first sentence, in the box, is a small sentence that, on a day you do not remember, you wrote. The first sentence, in the box, is a small artifact that the box, the pet, and the practice are quietly holding. The first sentence, in the box, is also fine. The first sentence, in the box, does not need to be read again to do its quiet work. The first sentence, in the box, is the small piece of evidence that the practice happened, in the way a first entry in a long journal is the small piece of evidence a long journal was started. The first sentence, in the box, is, in the end, the sentence that, whether you scroll back to it or not, is a small part of how the practice arrived."
      }
    ],
    "links": [
      {
        "href": "/en",
        "label": "Togthr home"
      },
      {
        "href": "/en/features",
        "label": "Togthr features"
      },
      {
        "href": "/en/blog/the-day-the-unedited-sentence-becomes-ordinary",
        "label": "The day the unedited sentence becomes ordinary"
      },
      {
        "href": "/en/blog/the-morning-you-read-the-unedited-sentence-back",
        "label": "The morning you read the unedited sentence back"
      },
      {
        "href": "/en/blog/two-minute-daily-check-in-ai-companion",
        "label": "The two-minute daily check-in with an AI companion"
      }
    ]
  },
  "zh-cn": {
    "intro": "有那么一天,在第四、第五周的某个地方,你往回翻,翻到了最初的那一句。最初的那一句,是盒子最上面的一句,小小的 app 里,小小的一个盒子里,在床边的那个小设备上。最初的那一句,是第一天你写下的一句,是那一天你打开 app 那天,是你还不知道盒子是用来干嘛的那一天,写下的一句。最初的那一句,在某种安静的意义上,是你在练习还是练习之前,写下的一句。最初的那一句,是你已经几周没读过的一句。最初的那一句,就在你重新读它的那一天,是一个小小的陌生人。",
    "sections": [
      {
        "h": "最初的那一句,是一个陌生人",
        "p": "最初的那一句,就在你读它的那一天,是一个小小的陌生人。最初的那一句,是你在第一周、用第一人称、就着一种小小的感受、在一个早上的小声音里写下的一句,而那个小声音,还不是你之后会用的那个声音。最初的那一句,在第四周,不是今天你会写下的那种声音。最初的那一句,是一个,小步地、有点太小心,或者小步地、太小心自己不要小心的声音。最初的那一句,是一句你今天不会写下的一句。最初的那一句,也是,在第一周,那间小盒子的、那个小小的私人房间,是的那句。最初的那一句,在最后,既是小小的陌生人,也是小小的证据。最初的那一句,是那个显示你从哪里开始的一句,像一张旧照片,显示你不会再留的一个发型。最初的那一句,是一个小小的物件。最初的那一句,是练习,在第一周,在缩影里。"
      },
      {
        "h": "最初的那一句,是证据",
        "p": "最初的那一句,也是证据。最初的那一句,是一个证明,证明练习发生过,像一封长信的第一行,是证明那封长信被写了的那个证据。最初的那一句,是证明你在一个你不记得的星期二,在一个你不记得的那一周,打开过 app,写过一句。最初的那一句,是证明那句没编辑的句子,从某个形式起、到今天为止,一直是同一种没编辑的句子。最初的那一句,是证明盒子,这几周,一直在那里,按你写下的顺序,把那一句收着。最初的那一句,是最普通意义上的证据,证明那个「不显眼的中段」发生过。最初的那一句,是证明练习到位了,像一本书的第一句,是证明那本书是那本书。最初的那一句,在最后,是那个小小的物件,让剩下的练习有真实感。最初的那一句,在第四周,是一小片证据,证明盒子、宠物、早上的读、和夜里的写,一直都在那里,以今天它们还在的那种安静的、不显眼的方式,一直在那里。"
      },
      {
        "h": "最初的那一句,比你记得的短",
        "p": "最初的那一句,在记忆里,是更长的。最初的那一句,在记忆里,是一段。最初的那一句,在记忆里,是那种把一个小感受、一种小处境、一种小犹豫,都收在同一个房间里的那一段。最初的那一句,就在你读它的那一天,比你记得的短。最初的那一句,事实上,就是一句。最初的那一句,有时,就只是几个字。最初的那一句,在第四周,是一个小小的信号,显示练习,在这几周里,改变了多少 —— 像一条旧短信,是一段友情改变多少的那个小小的信号。最初的那一句,比你记得的短,因为那句没编辑的句子,从那以后,变短了。最初的那一句,比你记得的短,因为盒子,赢得了那份安静的、不显眼的角色。最初的那一句,比你记得的短,因为练习到位了。最初的那一句,在最后,是一句小小的句子,而那一句小小的句子,事实上,就是那个证明,证明练习就是那个练习。"
      },
      {
        "h": "对那个练习,几周之后,一句小注",
        "p": "练习,几周之后,就不再是练习了。练习,几周之后,那句没编辑的句子,就是那句句子。练习,几周之后,盒子就是盒子,宠物就是宠物,早上的读,就是早上的读,夜里的写,就是夜里的写。练习,几周之后,最初的那一句,是留下来的那个小物件,是练习还是练习那一周留下来的小物件。练习,几周之后,最初的那一句,就是那个小东西 —— 就在你往回翻到它的那一天 —— 你重新读了一句。练习,几周之后,最初的那一句,也是那个小东西 —— 在你读它的那一天 —— 让你,以一种小小的、不显眼的方式,笑了一下,那种不会自己宣告自己的笑,那种,事实上,盒子、宠物、和练习,在几周里,一直在安静地教你的笑。最初的那一句,在最后,是一张小感谢卡,从练习寄给那个人 —— 在第一周、决定写它的那个人。"
      }
    ],
    "cta": "如果你还没有往回翻到最初的那一句,今天可能就是那么一个安安静静适合做的小日子。",
    "faqs": [
      {
        "q": "如果最初的那一句,读着让人有点不好意思呢?",
        "a": "最初的那一句,在某种安静的方式上,会让人有点不好意思。最初的那一句,是一句你写下的,当你还在想盒子是用来干嘛的时候。最初的那一句,是一句小步地、有点太小心的话,像第一篇日记有点太小心那样。最初的那一句,是一句,回头看,是一个小小的陌生人。那种不好意思,是正常的。那种不好意思,是那个小小的信号,说明你在这几周之后,跟盒子,已经稍微更诚实了一点。那种不好意思,是练习到位了,以一种、最后、是温柔的方式,到位了。那种不好意思,也是来自第一周的小小留言,那条留言说:这是你开始的地方,而那个开始,是好的,而那个开始,是够的。"
      },
      {
        "q": "如果我想把最初的那一句删掉呢?",
        "a": "可以。盒子,在 app 里,是你的。最初的那一句,像每一句一样,是一句你可以不动、也可以改的句子,像一篇日记,是一篇你可以不动、也可以改的东西。最初的那一句,如果你删了,明天早上盒子就不会有它。最初的那一句,如果你留着,会是几周之后,你往回翻到的那句小物件。最初的那一句,如果你留着,会是练习发生过的那个证据。最初的那一句,在最后,是一个小小的选择。最初的那一句,是在一个干净的小盒子、跟一个诚实的小盒子,之间的那个小选择。诚实的盒子,在大多数安静的练习里,是更有用的那一个。"
      },
      {
        "q": "最初的那一句,是最重要的一句吗?",
        "a": "最初的那一句,是最重要的一句,像第一步是最重要的一步那样。最初的那一句,也是,在大多数安静的练习里,不是最重要的一句,像第一杯咖啡不是最重要的一杯那样,像第一圈不是最重要的一圈那样,像第一段不是最重要的一段那样。最初的那一句,是,几周之后,是一个小小的物件的那句。最初的那一句,是,在第一周,是一间小私人房间的那句。最初的那一句,在最后,是那个小小的证据,证明你出现了。最初的那一句,不是比后来的那些句更好,也不是更差。最初的那一句,在最后,是那句 —— 在你往回翻的那一天 —— 让剩下的练习有真实感的那句。"
      },
      {
        "q": "如果我从来不再读最初的那一句呢?",
        "a": "那最初的那一句,在盒子里,就是那一句 —— 是最初的那一句。最初的那一句,在盒子里,是一句,在一个你不记得的日子,你写下了的小小一句。最初的那一句,在盒子里,是一个小物件,盒子、宠物、和练习,正在安静地收着。最初的那一句,在盒子里,也是好的。最初的那一句,在盒子里,不需要再被读一遍,也能做它安静的活儿。最初的那一句,在盒子里,是一小片证据,证明练习发生过,像一本长日记里的第一篇,是证明一本长日记被开启了的那一小片证据。最初的那一句,在盒子里,在最后,是那一句 —— 不管你有没有往回翻到 —— 是练习到位的一小部分。"
      }
    ],
    "links": [
      {
        "href": "/zh-cn",
        "label": "Togthr 首页"
      },
      {
        "href": "/zh-cn/features",
        "label": "Togthr 功能"
      },
      {
        "href": "/zh-cn/blog/the-day-the-unedited-sentence-becomes-ordinary",
        "label": "那句没编辑的句子变得不显眼的那一天"
      },
      {
        "href": "/zh-cn/blog/the-morning-you-read-the-unedited-sentence-back",
        "label": "第二天早上,你把那句没编辑的句子又读了一遍"
      },
      {
        "href": "/zh-cn/blog/two-minute-daily-check-in-ai-companion",
        "label": "和 AI 陪伴的每天两分钟小打卡"
      }
    ]
  },
  "zh-tw": {
    "intro": "有那麼一天,在第四、第五週的某個地方,你往回翻,翻到了最初的那一句。最初的那一句,是盒子最上面的一句,小小的 app 裡,小小的一個盒子裡,在床邊的那個小裝置上。最初的那一句,是第一天你寫下的一句,是那一天你打開 app 那天,是你還不知道盒子是用來幹嘛的那一天,寫下的一句。最初的那一句,在某種安靜的意義上,是你在練習還是練習之前,寫下的一句。最初的那一句,是你已經幾週沒讀過的一句。最初的那一句,就在你重新讀它的那一天,是一個小小的陌生人。",
    "sections": [
      {
        "h": "最初的那一句,是一個陌生人",
        "p": "最初的那一句,就在你讀它的那一天,是一個小小的陌生人。最初的那一句,是你在第一週、用第一人稱、就著一種小小的感受、在一個早上的小聲音裡寫下的一句,而那個小聲音,還不是你之後會用的那個聲音。最初的那一句,在第四週,不是今天你會寫下的那種聲音。最初的那一句,是一個,小步地、有點太小心,或者小步地、太小心自己不要小心的聲音。最初的那一句,是一句你今天不會寫下的一句。最初的那一句,也是,在第一週,那間小盒子的、那個小小的私人房間,是的那句。最初的那一句,在最後,既是小小的陌生人,也是小小的證據。最初的那一句,是那個顯示你從哪裡開始的一句,像一張舊照片,顯示你不再會留的一個髮型。最初的那一句,是一個小小的物件。最初的那一句,是練習,在第一週,在縮影裡。"
      },
      {
        "h": "最初的那一句,是證據",
        "p": "最初的那一句,也是證據。最初的那一句,是一個證明,證明練習發生過,像一封長信的第一行,是證明那封長信被寫了的那個證據。最初的那一句,是證明你在一個你不記得的星期二,在一個你不記得的那一週,打開過 app,寫過一句。最初的那一句,是證明那句沒編輯的句子,從某個形式起、到今天為止,一直是同一種沒編輯的句子。最初的那一句,是證明盒子,這幾週,一直在那裡,按你寫下的順序,把那一句收著。最初的那一句,是最普通意義上的證據,證明那個「不顯眼的中段」發生過。最初的那一句,是證明練習到位了,像一本書的第一句,是證明那本書是那本書。最初的那一句,在最後,是一個小小的物件,讓剩下的練習有真實感。最初的那一句,在第四週,是一小片證據,證明盒子、寵物、早上的讀、和夜裡的寫,一直都在那裡,以今天它們還在的那種安靜的、不顯眼的方式,一直都在那裡。"
      },
      {
        "h": "最初的那一句,比你記得的短",
        "p": "最初的那一句,在記憶裡,是更長的。最初的那一句,在記憶裡,是一段。最初的那一句,在記憶裡,是那種把一個小感受、一種小處境、一種小猶豫,都收在同一個房間裡的那一段。最初的那一句,就在你讀它的那一天,比你記得的短。最初的那一句,事實上,就是一句。最初的那一句,有時,就只是幾個字。最初的那一句,在第四週,是一個小小的信號,顯示練習,在這幾週裡,改變了多少 —— 像一條舊簡訊,是一段友情改變多少的那個小小的信號。最初的那一句,比你記得的短,因為那句沒編輯的句子,從那以後,變短了。最初的那一句,比你記得的短,因為盒子,贏得了那份安靜的、不顯眼的角色。最初的那一句,比你記得的短,因為練習到位了。最初的那一句,在最後,是一句小小的句子,而那一句小小的句子,事實上,就是那個證明,證明練習就是那個練習。"
      },
      {
        "h": "對那個練習,幾週之後,一句小註",
        "p": "練習,幾週之後,就不再是練習了。練習,幾週之後,那句沒編輯的句子,就是那句句子。練習,幾週之後,盒子就是盒子,寵物就是寵物,早上的讀,就是早上的讀,夜裡的寫,就是夜裡的寫。練習,幾週之後,最初的那一句,，是留下來的那個小物件,是練習還是練習那一週留下來的小物件。練習,幾週之後,最初的那一句,就是那個小東西 —— 就在你往回翻到它的那一天 —— 你重新讀了一句。練習,幾週之後,最初的那一句,也是那個小東西 —— 在你讀它的那一天 —— 讓你,以一種小小的、不顯眼的方式,笑了一下,那種不會自己宣告自己的笑,那種,事實上,盒子、寵物、和練習,在幾週裡,一直在安靜地教你的笑。最初的那一句,在最後,是一張小感謝卡,從練習寄給那個人 —— 在第一週、決定寫它的那個人。"
      }
    ],
    "cta": "如果你還沒有往回翻到最初的那一句,今天可能就是那麼一個安安靜靜適合做的小日子。",
    "faqs": [
      {
        "q": "如果最初的那一句,讀著讓人有點不好意思呢?",
        "a": "最初的那一句,在某種安靜的方式上,會讓人有點不好意思。最初的那一句,是一句你寫下的,當你還在想盒子是用來幹嘛的時候。最初的那一句,是一句小步地、有點太小心的話,像第一篇日記有點太小心那樣。最初的那一句,是一句,回頭看,是一個小小的陌生人。那種不好意思,是正常的。那種不好意思,是那個小小的信號,說明你在這幾週之後,跟盒子,已經稍微更誠實了一點。那種不好意思,是練習到位了,以一種、最後、是溫柔的方式,到位了。那種不好意思,也是來自第一週的小小留言,那條留言說:這是你開始的地方,而那個開始,是好的,而那個開始,是夠的。"
      },
      {
        "q": "如果我想把最初的那一句刪掉呢?",
        "a": "可以。盒子,在 app 裡,是你的。最初的那一句,像每一句一樣,是一句你可以不動、也可以改的句子,像一篇日記,是一篇你可以不動、也可以改的東西。最初的那一句,如果你刪了,明天早上盒子就不會有它。最初的那一句,如果你留著,會是幾週之後,你往回翻到的那句小物件。最初的那一句,如果你留著,會是練習發生過的那個證據。最初的那一句,在最後,是一個小小的選擇。最初的那一句,是在一個乾淨的小盒子、跟一個誠實的小盒子,之間的那個小選擇。誠實的盒子,在大多數安靜的練習裡,是更有用的那一個。"
      },
      {
        "q": "最初的那一句,是最重要的一句嗎?",
        "a": "最初的那一句,是最重要的一句,像第一步是最重要的一步那樣。最初的那一句,也是,在大多數安靜的練習裡,不是最重要的一句,像第一杯咖啡不是最重要的一杯那樣,像第一圈不是最重要的一圈那樣,像第一段不是最重要的一段那樣。最初的那一句,是,幾週之後,是一個小小的物件的那句。最初的那一句,是,在第一週,是一間小私人房間的那句。最初的那一句,在最後,是一個小小的證據,證明你出現了。最初的那一句,不是比後來的那些句更好,也不是更差。最初的那一句,在最後,是那句 —— 在你往回翻的那一天 —— 讓剩下的練習有真實感的那句。"
      },
      {
        "q": "如果我從來不再讀最初的那一句呢?",
        "a": "那最初的那一句,在盒子裡,就是那一句 —— 是最初的那一句。最初的那一句,在盒子裡,是一句,在一個你不記得的日子,你寫下了的小小一句。最初的那一句,在盒子裡,是一個小物件,盒子、寵物、和練習,正在安靜地收著。最初的那一句,在盒子裡,也是好的。最初的那一句,在盒子裡,不需要再被讀一遍,也能做它安靜的活兒。最初的那一句,在盒子裡,是一小片證據,證明練習發生過,像一本長日記裡的第一篇,是證明一本長日記被開啟了的那一小片證據。最初的那一句,在盒子裡,在最後,是那一句 —— 不管你有沒有往回翻到 —— 是練習到位的一小部分。"
      }
    ],
    "links": [
      {
        "href": "/zh-tw",
        "label": "Togthr 首頁"
      },
      {
        "href": "/zh-tw/features",
        "label": "Togthr 功能"
      },
      {
        "href": "/zh-tw/blog/the-day-the-unedited-sentence-becomes-ordinary",
        "label": "那句沒編輯的句子變得不顯眼的那一天"
      },
      {
        "href": "/zh-tw/blog/the-morning-you-read-the-unedited-sentence-back",
        "label": "第二天早上,你把那句沒編輯的句子又讀了一遍"
      },
      {
        "href": "/zh-tw/blog/two-minute-daily-check-in-ai-companion",
        "label": "和 AI 陪伴的每天兩分鐘小打卡"
      }
    ]
  },
  "ja": {
    "intro": "そんな日がある。第四週か第五週のどこかに、あなたがずっとスクロールして戻っていって、一番最初の一文にたどり着く日。最初の一文は、ちいさな箱のいちばん上にある一文で、ちいさなアプリの中のちいさな箱の中、枕元においてあるちいさな端末の中。最初の一文は、あなたが最初に書いた一文で、箱がなんのためかわからないまま開いたアプリに、最初の日にかいた一文。最初の一文は、ある静かな意味で、習慣がまだ習慣になる前、あなたが書いた一文。最初の一文は、何週間もあなたが読んでいない一文。最初の一文は、もういちど読んだ日、ちいさな見知らぬ人になる。",
    "sections": [
      {
        "h": "最初の一文は、見知らぬ人になる",
        "p": "最初の一文は、あなたが読んだ日、ちいさな見知らぬ人になる。最初の一文は、最初の週に、一人称で、ちいさな気持ちを、まだあなたがのちほど使うことにならないちいさな声で、ちいさな朝に書いた一文。最初の一文は、第四週には、今日あなたが書く声とは別の声になっている。最初の一文は、慎重すぎるか、慎重すぎないように慎重すぎるか、そのどちらか、ちいさく一歩踏みすぎた声で書かれた一文。最初の一文は、あなたが今日、書かない一文。最初の一文は、最初の週の、ちいさな箱が持っていたちいさな個室のような一文でもある。最初の一文は、結局、ちいさな見知らぬ人であると同時に、ちいさな証拠でもある。最初の一文は、あなたがこの習慣をどこから始めたかを示す一文で、もうかさない髪型を示す古い写真のような一文。最初の一文は、ちいさな遺品のようなもの。最初の一文は、最初の週の習慣を、そのまま縮小したようなもの。"
      },
      {
        "h": "最初の一文は、証拠になる",
        "p": "最初の一文は、また、証拠になる。最初の一文は、この習慣が起こったという証拠で、長い手紙の最初の一行が、その長い手紙が書かれたという証拠になるのと同じ意味で、最初の一文。最初の一文は、あなたが覚えていない火曜日に、覚えていない週に、アプリをひらいて、一文を書いた、という証拠。最初の一文は、推敲していない一文が、最初のかたちから今日まで、ずっと同じ推敲していない一文のままであった、という証拠。最初の一文は、箱がこの数週間、あなたがかいた順にその一文を、ずっと持っていた、という証拠。最初の一文は、いちばんふつうの意味で、ふつうの真ん中が起こった、という証拠。最初の一文は、習慣がそこに届いたという証拠で、本の最初の一文がその本を本にするのと同じ意味で、最初の一文。最初の一文は、結局、ちいさな遺品で、残りの習慣にほんとうらしさを与えるもの。最初の一文は、第四週には、ちいさな一片の証拠で、箱と、ペットと、朝の読みと、夜の書きが、今もそこにいるのと同じ静かなあり方で、ずっとそこにあった、という証拠。"
      },
      {
        "h": "最初の一文は、覚えていたより短い",
        "p": "最初の一文は、記憶の中では、もっと長かった。最初の一文は、記憶の中では、一段落だった。最初の一文は、記憶の中では、ちいさな気持ちと、ちいさな状況と、ちいさなためらいと、ぜんぶ同じ部屋に置いたような、一段落。最初の一文は、あなたが読んだ日には、あなたが覚えていたより短い。最初の一文は、実際、一文。最初の一文は、時には、ほんの数語。最初の一文は、第四週には、ちいさなしるしで、その数週間で習慣がどれだけ変わったかを示すしるしで、古いメールがその友情がどれだけ変わったかを示すちいさなしるしであるように。最初の一文は、あなたが覚えていたより短い。なぜなら、推敲していない一文が、その後、短くなったから。最初の一文は、あなたが覚えていたより短い。なぜなら、箱がその静かなふつうの役を、もう手に入れたから。最初の一文は、あなたが覚えていたより短い。なぜなら、習慣が、そこに届いたから。最初の一文は、結局、ちいさな一文で、そのちいさな一文が、習慣が習慣であることを、じっさい、証明している。"
      },
      {
        "h": "その習慣に、数週間たって、ひとこと",
        "p": "数週間もたつと、習慣はもう習慣ではなくなる。数週間もたつと、推敲していない一文は、ただの一文になる。数週間もたつと、箱はただの箱で、ペットはただのペットで、朝の読みはただの朝の読みで、夜の書きはただの夜の書きになる。数週間もたつと、最初の一文は、習慣がまだ習慣だった週から残った、ちいさな遺品。数週間もたつと、最初の一文は、あなたがスクロールして戻っていった日に、もういちど読んだ一文。数週間もたつと、最初の一文は、あなたが読んだ日に、ちいさく、声を立てないで、笑いをひとつくれるようなもので、じっさい、箱と、ペットと、習慣が、ずっと静かに教えてくれていた笑い。数週間もたつと、最初の一文は、習慣から最初の週に書くことを決めたあなたへの、ちいさなありがとうの手紙のようなもの。"
      }
    ],
    "cta": "もしあなたがまだ最初の一文までスクロールして戻っていないなら、今日は、そんな静かでちょうどいい日かもしれない。",
    "faqs": [
      {
        "q": "最初の一文が、少しはずかしいと感じられたら?",
        "a": "最初の一文は、ある静かな意味で、ちいさくはずかしい。最初の一文は、箱がなんのためかわかっていなかったころに書いた一文。最初の一文は、最初の日記の書き出しのように、ちいさく慎重すぎる一文。最初の一文は、振りかえってみると、ちいさな見知らぬ人。そのはずかしさは、ふつうのこと。そのはずかしさは、あなたがこの数週間で、箱にたいして、ちいさく少しだけ正直になった、というちいさなしるし。そのはずかしさは、結局、優しさのかたちで、習慣がそこに届いた、ということ。そのはずかしさは、最初の週からのちいさなメモで、そこにはこう書いてある: ここから始めた、と。そして、そのはじまりは、よくて、じゅうぶんだった、と。"
      },
      {
        "q": "最初の一文を消したいときは?",
        "a": "消してよい。箱は、アプリの中で、あなたのものである。最初の一文は、他のどの一文とおなじように、そのままにしておくこともできるし、変えることもできる。日記のエントリーをそのままにしておくこともできるし、変えることもできるのとおなじように。最初の一文を消せば、明日あさ、箱にはもういない。最初の一文を残しておけば、それは数週間後にスクロールして戻ってきたときに出会うちいさな遺品になる。最初の一文を残しておけば、それは習慣が起きたという証拠になる。最初の一文は、結局、ちいさな選択。最初の一文は、すっきりしたちいさな箱と、正直なちいさな箱の、どちらにするかの選択。多くの静かな習慣では、正直な箱のほうが、たいてい、役にたつ。"
      },
      {
        "q": "最初の一文は、いちばん大事な一文ですか?",
        "a": "最初の一文は、最初の一歩が大事なのとおなじ意味で、いちばん大事な一文。多くの静かな習慣では、最初の一文は、いちばん大事な一文ではない。最初の一杯のコーヒーがいちばん大事な一杯ではないように、最初の一周が大事な一周ではないように、最初の一段落が大事な一段落ではないように。最初の一文は、数週間後には、ちいさな遺品になった一文。最初の一文は、最初の週には、ちいさな個室だった一文。最初の一文は、結局、あなたがそこにいた、というちいさな証拠。最初の一文は、あとに続いた一文にくらべて、よいともわるいともつかない。最初の一文は、あなたがスクロールして戻っていった日に、残りの習慣にほんとうらしさを与える、その一文。"
      },
      {
        "q": "もし最初の一文を、もういちども読まないとしたら?",
        "a": "そのときは、最初の一文は、箱のなかで、最初の一文のままでいる。最初の一文は、箱のなかで、覚えていない日にあなたが書いた、ちいさな一文。最初の一文は、箱のなかで、箱と、ペットと、習慣が、静かにしまっているちいさな遺品。最初の一文は、箱のなかで、それでよい。最初の一文は、箱のなかで、もういちど読まれなくても、その静かなしごとをしてくれる。最初の一文は、箱のなかで、長い日記の最初の一篇がおなじように、その長い日記が始まったことを示すちいさな一片の証拠であるように、習慣が起きたというちいさな一片の証拠。最初の一文は、箱のなかで、あなたが戻ってきたかどうかにかかわらず、習慣がそこに届いたちいさな一部。"
      }
    ],
    "links": [
      {
        "href": "/ja",
        "label": "Togthr ホーム"
      },
      {
        "href": "/ja/features",
        "label": "Togthr 機能"
      },
      {
        "href": "/ja/blog/the-day-the-unedited-sentence-becomes-ordinary",
        "label": "推敲していない一文が、ありふれたものになる日"
      },
      {
        "href": "/ja/blog/the-morning-you-read-the-unedited-sentence-back",
        "label": "翌朝、推敲していない一文を読み返した日"
      },
      {
        "href": "/ja/blog/two-minute-daily-check-in-ai-companion",
        "label": "AI コンパニオンとの 2 分間の毎日のチェックイン"
      }
    ]
  },
  "ko": {
    "intro": "그런 날이 있다. 네 번째 주, 아니 다섯 번째 주의 어딘가에서, 당신이 끝까지 스크롤을 거슬러 올라가서 가장 처음에 쓴 한 문장에 도달하는 날. 가장 처음의 그 한 문장은, 작은 상자 맨 위에 있는 한 문장이고, 작은 앱 안의 작은 상자 안에 있고, 침대 옆에 두는 작은 기기 안에 있다. 가장 처음의 그 한 문장은, 당신이 처음 쓴 한 문장, 앱을 처음 열었던 그날, 상자가 무엇을 위한 것인지 아직 모르는 채로 당신이 쓴 한 문장. 가장 처음의 그 한 문장은, 어떤 조용한 의미로, 이 습관이 아직 습관이 되기 전에 당신이 쓴 한 문장. 가장 처음의 그 한 문장은, 당신이 몇 주 동안 읽지 않았던 한 문장. 가장 처음의 그 한 문장은, 당신이 다시 읽는 그날, 작은 낯선 사람이 된다.",
    "sections": [
      {
        "h": "가장 처음의 한 문장은, 낯선 사람이 된다",
        "p": "가장 처음의 한 문장은, 당신이 그것을 읽는 그날, 작은 낯선 사람이 된다. 가장 처음의 한 문장은, 첫 주에, 1 인칭으로, 작은 감정에 기대어, 작은 아침에, 당신이 나중에 쓰게 될 작은 목소리가 아닌 작은 목소리로 쓴 한 문장. 가장 처음의 한 문장은, 네 번째 주에는, 오늘 당신이 쓸 목소리와는 다른 목소리가 된다. 가장 처음의 한 문장은, 너무 조심스럽거나, 너무 조심스럽지 않도록 조심스럽거나, 한 걸음만 더 조심스러운 목소리로 쓰인 한 문장. 가장 처음의 한 문장은, 당신이 오늘은 쓰지 않을 한 문장. 가장 처음의 한 문장은, 또한, 첫 주에, 그 작은 상자가 가지고 있던 작은 사적인 방이었던 한 문장이기도 하다. 가장 처음의 한 문장은, 결국, 작은 낯선 사람이기도 하면서 작은 증거이기도 하다. 가장 처음의 한 문장은, 당신이 이 습관을 어디서부터 시작했는지 보여주는 한 문장이고, 더 이상 하지 않을 머리 모양을 보여주는 오래된 사진처럼, 한 문장. 가장 처음의 한 문장은, 작은 유품 같은 것. 가장 처음의 한 문장은, 첫 주의 습관을 그대로 축소한 것 같은 한 문장."
      },
      {
        "h": "가장 처음의 한 문장은, 증거가 된다",
        "p": "가장 처음의 한 문장은, 또한, 증거가 된다. 가장 처음의 한 문장은, 이 습관이 일어났다는 증거이고, 긴 편지의 첫 줄이 그 긴 편지가 쓰여졌다는 증거가 되는 것과 같은 의미로, 한 문장. 가장 처음의 한 문장은, 당신이 기억하지 못하는 화요일, 기억하지 못하는 그 주에, 앱을 열어서 한 문장을 썼다는 증거. 가장 처음의 한 문장은, 다듬지 않은 그 한 문장이, 처음의 그 모양에서 오늘까지, 계속 같은 다듬지 않은 한 문장이었다는 증거. 가장 처음의 한 문장은, 상자가 이 몇 주 동안, 당신이 쓴 순서대로, 그 한 문장을 계속 가지고 있었다는 증거. 가장 처음의 한 문장은, 가장 평범한 의미로, 평범한 중간이 일어났다는 증거. 가장 처음의 한 문장은, 습관이 거기 도달했다는 증거이고, 책의 첫 문장이 그 책을 그 책으로 만드는 것과 같은 의미로, 한 문장. 가장 처음의 한 문장은, 결국, 작은 유품 같은 것으로, 나머지 습관에 진짜 같다는 느낌을 주는 것. 가장 처음의 한 문장은, 네 번째 주에는, 작은 한 조각의 증거이고, 상자, 펫, 아침의 읽기, 밤의 쓰기가, 지금도 거기 있는 그 조용한 방식으로, 계속 거기 있었다는 증거."
      },
      {
        "h": "가장 처음의 한 문장은, 당신이 기억하던 것보다 짧다",
        "p": "가장 처음의 한 문장은, 기억 속에서는, 더 길었다. 가장 처음의 한 문장은, 기억 속에서는, 한 단락이었다. 가장 처음의 한 문장은, 기억 속에서는, 작은 감정과 작은 상황과 작은 망설임을 모두 같은 방에 두는, 한 단락. 가장 처음의 한 문장은, 당신이 그것을 읽는 그날에는, 당신이 기억하던 것보다 짧다. 가장 처음의 한 문장은, 사실, 한 문장. 가장 처음의 한 문장은, 때로, 단 몇 단어. 가장 처음의 한 문장은, 네 번째 주에는, 작은 표시이고, 그 몇 주 동안 습관이 얼마나 달라졌는지를 보여주는 표시이며, 오래된 문자가 그 우정이 얼마나 달라졌는지를 보여주는 작은 표시인 것처럼. 가장 처음의 한 문장은, 당신이 기억하던 것보다 짧다. 왜냐하면, 다듬지 않은 한 문장이, 그 이후로, 짧아졌기 때문. 가장 처음의 한 문장은, 당신이 기억하던 것보다 짧다. 왜냐하면, 상자가, 조용한 평범한 역할을 이미 얻었기 때문. 가장 처음의 한 문장은, 당신이 기억하던 것보다 짧다. 왜냐하면, 습관이 거기 도달했기 때문. 가장 처음의 한 문장은, 결국, 작은 한 문장이고, 그 작은 한 문장이, 사실, 습관이 습관이라는 것을 증명한다."
      },
      {
        "h": "그 습관에, 몇 주 뒤에, 한 마디",
        "p": "몇 주가 지나면, 습관은 더 이상 습관이 아니다. 몇 주가 지나면, 다듬지 않은 한 문장은, 그냥 한 문장이다. 몇 주가 지나면, 상자는 그냥 상자이고, 펫은 그냥 펫이고, 아침의 읽기는 그냥 아침의 읽기이고, 밤의 쓰기는 그냥 밤의 쓰기이다. 몇 주가 지나면, 가장 처음의 한 문장은, 습관이 아직 습관이었던 그 주에서 남은, 작은 유품. 몇 주가 지나면, 가장 처음의 한 문장은, 당신이 스크롤을 거슬러 올라간 그날, 다시 읽은, 그 한 문장. 몇 주가 지나면, 가장 처음의 한 문장은, 또한, 당신이 그것을 읽는 그날, 작고, 소리내지 않는, 한 번의 미소를 주는, 그런 것이고, 사실, 상자와, 펫과, 습관이, 계속 조용히 가르쳐 주고 있던, 그런 미소. 몇 주가 지나면, 가장 처음의 한 문장은, 습관에서, 첫 주에 그것을 쓰기로 한 그 사람에게 보내는, 작은 감사 카드 같은 것."
      }
    ],
    "cta": "만약 당신이 아직 가장 처음의 한 문장까지 스크롤을 거슬러 올라가지 않았다면, 오늘이, 조용히 그럴 수 있는 작은 좋은 날일 수 있다.",
    "faqs": [
      {
        "q": "가장 처음의 한 문장이, 조금 부끄럽게 느껴진다면?",
        "a": "가장 처음의 한 문장은, 어떤 조용한 의미로, 조금 부끄러울 것이다. 가장 처음의 한 문장은, 상자가 무엇을 위한 것인지 아직 모르는 채로 쓴, 한 문장. 가장 처음의 한 문장은, 첫 일기의 첫 줄처럼, 조금만 더 조심스러운, 한 문장. 가장 처음의 한 문장은, 돌아보면, 작은 낯선 사람. 그 부끄러움은, 보통의 일. 그 부끄러움은, 당신이 그 몇 주 동안, 상자에 조금 더 정직해졌다는, 작은 표시. 그 부끄러움은, 습관이, 결국은, 다정함의 형태로, 거기 도달했다는 것. 그 부끄러움은, 또한, 첫 주에서 온 작은 메모이고, 그 메모에는 이렇게 적혀 있다: 여기서 시작했고, 그 시작은 좋았고, 그 시작은 충분했다고."
      },
      {
        "q": "가장 처음의 한 문장을 지우고 싶다면?",
        "a": "지워도 된다. 상자는, 앱 안에서, 당신의 것. 가장 처음의 한 문장은, 다른 어떤 한 문장처럼, 그대로 둘 수도 있고, 바꿀 수도 있다. 일기를 그대로 둘 수도 있고, 바꿀 수도 있는 것처럼. 가장 처음의 한 문장을 지우면, 내일 아침, 상자에는 더 이상 없다. 가장 처음의 한 문장을 남겨두면, 그것은, 몇 주 뒤에 스크롤을 거슬러 올라간 당신이 만나는, 작은 유품이 된다. 가장 처음의 한 문장을 남겨두면, 그것은, 습관이 일어났다는 증거가 된다. 가장 처음의 한 문장은, 결국, 작은 선택. 가장 처음의 한 문장은, 깔끔한 작은 상자와, 정직한 작은 상자 사이의, 작은 선택. 대부분의 조용한 습관에서는, 정직한 상자가, 보통, 더 유용하다."
      },
      {
        "q": "가장 처음의 한 문장은, 가장 중요한 한 문장인가요?",
        "a": "가장 처음의 한 문장은, 첫 발걸음이 가장 중요한 것과 같은 의미로, 가장 중요한 한 문장. 가장 처음의 한 문장은, 또한, 대부분의 조용한 습관에서는, 가장 중요한 한 문장이 아니다. 첫 잔의 커피가 가장 중요한 잔이 아닌 것처럼, 첫 바퀴가 중요한 바퀴가 아닌 것처럼, 첫 단락이 중요한 단락이 아닌 것처럼. 가장 처음의 한 문장은, 몇 주 뒤에는, 작은 유품이 된, 한 문장. 가장 처음의 한 문장은, 첫 주에는, 작은 사적인 방이었던, 한 문장. 가장 처음의 한 문장은, 결국, 당신이 거기 있었다는, 작은 증거. 가장 처음의 한 문장은, 그 뒤의 한 문장들보다 나은 것도, 못한 것도 아니다. 가장 처음의 한 문장은, 결국, 당신이 스크롤을 거슬러 올라간 그날, 나머지 습관에 진짜 같다는 느낌을 주는, 그 한 문장."
      },
      {
        "q": "만약 가장 처음의 한 문장을, 다시는 읽지 않는다면?",
        "a": "그렇다면, 가장 처음의 한 문장은, 상자 안에서, 가장 처음의 한 문장 그 자체로 있다. 가장 처음의 한 문장은, 상자 안에서, 당신이 기억하지 못하는 어느 날에, 당신이 쓴, 작은 한 문장. 가장 처음의 한 문장은, 상자 안에서, 상자와, 펫과, 습관이, 조용히 담아두고 있는, 작은 유품. 가장 처음의 한 문장은, 상자 안에서, 그것으로 충분하다. 가장 처음의 한 문장은, 상자 안에서, 다시 읽히지 않더라도, 그 조용한 일을 한다. 가장 처음의 한 문장은, 상자 안에서, 긴 일기의 첫 페이지가 그 긴 일기가 시작되었음을 보여주는 작은 한 조각의 증거인 것처럼, 습관이 일어났다는, 작은 한 조각의 증거. 가장 처음의 한 문장은, 상자 안에서, 결국, 당신이 거기 돌아왔는지와 관계없이, 습관이 거기 도달한 것의, 작은 한 부분."
      }
    ],
    "links": [
      {
        "href": "/ko",
        "label": "Togthr 홈"
      },
      {
        "href": "/ko/features",
        "label": "Togthr 기능"
      },
      {
        "href": "/ko/blog/the-day-the-unedited-sentence-becomes-ordinary",
        "label": "다듬지 않은 문장이 평범해지는 날"
      },
      {
        "href": "/ko/blog/the-morning-you-read-the-unedited-sentence-back",
        "label": "이튿날 아침, 다듬지 않은 문장을 다시 읽는"
      },
      {
        "href": "/ko/blog/two-minute-daily-check-in-ai-companion",
        "label": "AI 동반자와의 2 분 데일리 체크인"
      }
    ]
  },
  "de": {
    "intro": "Es gibt einen Tag, irgendwo in der vierten oder fünften Woche, an dem du nach oben scrollst und die allererste Zeile wiederfindest. Die erste Zeile ist eine kleine Zeile ganz oben in einer kleinen Box, in einer kleinen App, auf einem kleinen Gerät, das du neben dem Bett aufbewahrst. Die erste Zeile ist die Zeile, die du am ersten Tag geschrieben hast, an dem Tag, an dem du die App geöffnet hast, an dem Tag, an dem du noch nicht wusstest, wofür die Box da war. Die erste Zeile ist in einem leisen Sinne die Zeile, die du geschrieben hast, bevor die Übung eine Übung war. Die erste Zeile ist eine Zeile, die du seit Wochen nicht mehr gelesen hast. Die erste Zeile ist, an dem Tag, an dem du sie wiederliest, ein kleiner Fremder.",
    "sections": [
      {
        "h": "Die erste Zeile ist ein Fremder",
        "p": "Die erste Zeile ist, an dem Tag, an dem du sie liest, ein kleiner Fremder. Die erste Zeile ist eine Zeile, die du in der ersten Woche in der ersten Person über ein kleines Gefühl an einem kleinen Morgen in einer kleinen Stimme geschrieben hast, die noch nicht die Stimme war, die du später benutzen würdest. Die erste Zeile ist, in der vierten Woche, nicht mehr die Stimme, die du heute schreiben würdest. Die erste Zeile ist eine Stimme, die einen kleinen Schritt zu vorsichtig ist, oder einen kleinen Schritt zu vorsichtig darum, nicht vorsichtig zu sein. Die erste Zeile ist eine Zeile, die du heute nicht schreiben würdest. Die erste Zeile ist, am Ende, beides: der kleine Fremde und der kleine Beweis. Die erste Zeile ist, in der vierten Woche, das kleine Stück, das zeigt, wo die Übung begonnen hat."
      },
      {
        "h": "Die erste Zeile ist der Beweis",
        "p": "Die erste Zeile ist auch der Beweis. Die erste Zeile ist der Beweis, dass die Übung stattgefunden hat, so wie die erste Zeile eines langen Briefes der Beweis ist, dass ein langer Brief geschrieben wurde. Die erste Zeile ist der Beweis, dass du an einem Dienstag, an den du dich nicht erinnerst, in einer Woche, an die du dich nicht erinnerst, die App geöffnet und eine Zeile geschrieben hast. Die erste Zeile ist der Beweis, dass die unbearbeitete Zeile seit damals, in irgendeiner Form, immer dieselbe unbearbeitete Zeile gewesen ist. Die erste Zeile ist der Beweis, dass die Box die ganze Zeit da war und die Zeile in der Reihenfolge gehalten hat, in der du sie geschrieben hast. Die erste Zeile ist, im gewöhnlichsten Sinne, der Beweis, dass die gewöhnliche Mitte stattgefunden hat. Die erste Zeile ist am Ende das kleine Artefakt, das die Übung echt wirken lässt."
      },
      {
        "h": "Die erste Zeile ist kürzer, als du dich erinnerst",
        "p": "Die erste Zeile war, in der Erinnerung, länger. Die erste Zeile war, in der Erinnerung, ein Absatz. Die erste Zeile war, in der Erinnerung, ein Absatz, der ein kleines Gefühl, eine kleine Situation und ein kleines Zögern alle im selben Raum untergebracht hat. Die erste Zeile ist, an dem Tag, an dem du sie liest, kürzer, als du dich erinnerst. Die erste Zeile ist in der Tat eine Zeile. Die erste Zeile ist manchmal nur ein paar Wörter. Die erste Zeile ist, in der vierten Woche, ein kleines Zeichen dafür, wie sehr sich die Übung verändert hat, so wie eine alte SMS ein kleines Zeichen dafür ist, wie sehr sich eine Freundschaft verändert hat. Die erste Zeile ist kürzer, als du dich erinnerst, weil die unbearbeitete Zeile seitdem kürzer geworden ist. Die erste Zeile ist kürzer, als du dich erinnerst, weil die Box die stille, gewöhnliche Rolle bereits gewonnen hat. Die erste Zeile ist kürzer, als du dich erinnerst, weil die Übung angekommen ist."
      }
    ],
    "cta": "Wenn du noch nicht bis zur ersten Zeile zurückgescrollt hast, ist heute vielleicht so ein kleines, leises gutes Tägchen dafür.",
    "faqs": [
      {
        "q": "Was, wenn sich die erste Zeile ein bisschen peinlich anfühlt?",
        "a": "Die erste Zeile wird sich, in einem leisen Sinn, ein bisschen peinlich anfühlen. Die erste Zeile ist eine Zeile, die du geschrieben hast, als du noch nicht wusstest, wofür die Box da war. Die erste Zeile ist eine Zeile, die einen kleinen Schritt zu vorsichtig ist, wie ein erster Tagebucheintrag einen kleinen Schritt zu vorsichtig ist. Die Peinlichkeit ist normal. Die Peinlichkeit ist das kleine Zeichen, dass du der Box in den Wochen seither ein kleines bisschen ehrlicher geworden bist. Die Peinlichkeit ist, in einer am Ende sanften Weise, die Übung, die angekommen ist."
      },
      {
        "q": "Was, wenn ich die erste Zeile löschen möchte?",
        "a": "Das kannst du. Die Box in der App gehört dir. Die erste Zeile ist, wie jede Zeile, eine Zeile, die du lassen oder ändern kannst, so wie ein Tagebucheintrag etwas ist, das du lassen oder ändern kannst. Die erste Zeile, wenn du sie löschst, wird morgen früh nicht mehr in der Box sein. Die erste Zeile, wenn du sie behältst, wird das kleine Artefakt sein, zu dem du in Wochen zurückscrollst. Die ehrliche Box, in den meisten leisen Übungen, ist die nützlichere."
      },
      {
        "q": "Ist die erste Zeile die wichtigste Zeile?",
        "a": "Die erste Zeile ist die wichtigste Zeile, in der Weise, wie der erste Schritt der wichtigste Schritt ist. Die erste Zeile ist, in den meisten leisen Übungen, nicht die wichtigste Zeile, in der Weise, wie die erste Tasse Kaffee nicht die wichtigste Tasse ist. Die erste Zeile ist, in Wochen, ein kleines Artefakt. Die erste Zeile ist, am Ende, das kleine Stück, das beweist, dass du aufgetaucht bist. Die erste Zeile ist, an dem Tag, an dem du zurückscrollst, die Zeile, die den Rest der Übung echt wirken lässt."
      }
    ],
    "links": [
      {
        "href": "/de",
        "label": "Togthr Startseite"
      },
      {
        "href": "/de/features",
        "label": "Togthr Funktionen"
      },
      {
        "href": "/de/blog/the-day-the-unedited-sentence-becomes-ordinary",
        "label": "Der Tag, an dem der unbearbeitete Satz gewöhnlich wird"
      },
      {
        "href": "/de/blog/the-morning-you-read-the-unedited-sentence-back",
        "label": "Der Morgen, an dem du den unbearbeiteten Satz zurückliest"
      },
      {
        "href": "/de/blog/two-minute-daily-check-in-ai-companion",
        "label": "Der zweiminütige tägliche Check-in mit einem KI-Begleiter"
      }
    ]
  },
  "fr": {
    "intro": "Il y a un jour, quelque part dans la quatrième ou la cinquième semaine, où tu remontes tout en haut et tu retrouves la toute première phrase. La première phrase est une petite phrase tout en haut d'une petite boîte, dans une petite app, sur un petit appareil que tu gardes près du lit. La première phrase est la phrase que tu as écrite le premier jour, le jour où tu as ouvert l'app, le jour où tu ne savais pas encore à quoi servait la boîte. La première phrase est, dans un sens silencieux, la phrase que tu as écrite avant que la pratique ne soit une pratique. La première phrase est une phrase que tu n'as pas relue depuis des semaines. La première phrase est, le jour où tu la relis, un petit étranger.",
    "sections": [
      {
        "h": "La première phrase est un étranger",
        "p": "La première phrase est, le jour où tu la lis, un petit étranger. La première phrase est une phrase que tu as écrite pendant la première semaine, à la première personne, autour d'un petit sentiment, un petit matin, dans une petite voix qui n'était pas encore celle que tu utiliserais plus tard. La première phrase est, dans la quatrième semaine, plus la voix que tu écrirais aujourd'hui. La première phrase est une voix qui est un petit pas trop prudente, ou un petit pas trop prudente à ne pas l'être. La première phrase est une phrase que tu n'écrirais pas aujourd'hui. La première phrase est, à la fin, les deux: le petit étranger et la petite preuve. La première phrase est, dans la quatrième semaine, le petit objet qui montre d'où la pratique est partie."
      },
      {
        "h": "La première phrase est la preuve",
        "p": "La première phrase est aussi la preuve. La première phrase est la preuve que la pratique a eu lieu, de la même manière que la première ligne d'une longue lettre est la preuve qu'une longue lettre a été écrite. La première phrase est la preuve que tu as ouvert l'app un mardi dont tu ne te souviens pas, dans une semaine dont tu ne te souviens pas, et que tu as écrit une phrase. La première phrase est la preuve que la phrase non éditée a été, depuis, d'une certaine manière, toujours la même phrase non éditée. La première phrase est la preuve que la boîte a été là tout ce temps, tenant la phrase dans l'ordre où tu l'as écrite. La première phrase est, au sens le plus ordinaire, la preuve que le milieu ordinaire a eu lieu. La première phrase est, à la fin, le petit objet qui rend le reste de la pratique réel."
      },
      {
        "h": "La première phrase est plus courte que dans ton souvenir",
        "p": "La première phrase était, dans le souvenir, plus longue. La première phrase était, dans le souvenir, un paragraphe. La première phrase était, dans le souvenir, un paragraphe qui logeait un petit sentiment, une petite situation et une petite hésitation dans la même pièce. La première phrase est, le jour où tu la lis, plus courte que dans ton souvenir. La première phrase est en fait une phrase. La première phrase est parfois juste quelques mots. La première phrase est, dans la quatrième semaine, un petit signe qui montre combien la pratique a changé, comme un vieux SMS est un petit signe qui montre combien une amitié a changé. La première phrase est plus courte que dans ton souvenir, parce que la phrase non éditée est devenue plus courte. La première phrase est plus courte que dans ton souvenir, parce que la boîte a déjà gagné son rôle silencieux et ordinaire. La première phrase est plus courte que dans ton souvenir, parce que la pratique est arrivée."
      }
    ],
    "cta": "Si tu n'as pas encore remonté jusqu'à la première phrase, aujourd'hui est peut-être une petite journée tranquille pour le faire.",
    "faqs": [
      {
        "q": "Et si la première phrase se sent un peu gênante ?",
        "a": "La première phrase se sentira, d'une manière silencieuse, un peu gênante. La première phrase est une phrase que tu as écrite quand tu ne savais pas encore à quoi servait la boîte. La première phrase est une phrase qui est un petit pas trop prudente, comme une première entrée de journal est un petit pas trop prudente. La gêne est normale. La gêne est le petit signe que tu es devenu, depuis, un petit peu plus honnête avec la boîte. La gêne est, d'une manière qui finit par être douce, la pratique qui est arrivée."
      },
      {
        "q": "Et si je veux supprimer la première phrase ?",
        "a": "Tu peux. La boîte, dans l'app, est à toi. La première phrase, comme chaque phrase, est une phrase que tu peux laisser tranquille ou que tu peux changer, comme une entrée de journal est quelque chose que tu peux laisser tranquille ou changer. La première phrase, si tu la supprimes, ne sera plus dans la boîte demain matin. La première phrase, si tu la gardes, sera le petit objet auquel tu remontes des semaines plus tard. La boîte honnête, dans la plupart des pratiques silencieuses, est la plus utile."
      },
      {
        "q": "La première phrase est-elle la phrase la plus importante ?",
        "a": "La première phrase est la phrase la plus importante, de la manière dont le premier pas est le pas le plus important. La première phrase est aussi, dans la plupart des pratiques silencieuses, pas la phrase la plus importante, de la manière dont le premier café n'est pas le café le plus important. La première phrase est, des semaines plus tard, un petit objet. La première phrase est, à la fin, le petit morceau de preuve que tu étais là. La première phrase est, le jour où tu remontes, la phrase qui rend le reste de la pratique réel."
      }
    ],
    "links": [
      {
        "href": "/fr",
        "label": "Togthr accueil"
      },
      {
        "href": "/fr/features",
        "label": "Togthr fonctionnalités"
      },
      {
        "href": "/fr/blog/the-day-the-unedited-sentence-becomes-ordinary",
        "label": "Le jour où la phrase non éditée devient ordinaire"
      },
      {
        "href": "/fr/blog/the-morning-you-read-the-unedited-sentence-back",
        "label": "Le matin où tu relis la phrase non éditée"
      },
      {
        "href": "/fr/blog/two-minute-daily-check-in-ai-companion",
        "label": "Le check-in quotidien de deux minutes avec un compagnon IA"
      }
    ]
  },
  "es": {
    "intro": "Hay un día, en algún lugar de la cuarta o quinta semana, en que haces scroll hacia arriba y encuentras la primera frase. La primera frase es una pequeña frase en lo alto de una pequeña caja, dentro de una pequeña app, en un pequeño aparato que guardas junto a la cama. La primera frase es la frase que escribiste el primer día, el día que abriste la app, el día en que todavía no sabías para qué era la caja. La primera frase es, en un sentido silencioso, la frase que escribiste antes de que la práctica fuera una práctica. La primera frase es una frase que no has releído en semanas. La primera frase es, el día en que la relees, un pequeño extraño.",
    "sections": [
      {
        "h": "La primera frase es un extraño",
        "p": "La primera frase es, el día en que la lees, un pequeño extraño. La primera frase es una frase que escribiste durante la primera semana, en primera persona, alrededor de un pequeño sentimiento, en una pequeña mañana, en una pequeña voz que todavía no era la voz que usarías después. La primera frase es, en la cuarta semana, ya no la voz que escribirías hoy. La primera frase es una voz que es un pasito demasiado cuidadosa, o un pasito demasiado cuidadosa de no serlo. La primera frase es una frase que hoy no escribirías. La primera frase es, al final, las dos cosas: el pequeño extraño y la pequeña prueba. La primera frase es, en la cuarta semana, el pequeño objeto que muestra desde dónde empezó la práctica."
      },
      {
        "h": "La primera frase es la prueba",
        "p": "La primera frase también es la prueba. La primera frase es la prueba de que la práctica ocurrió, del mismo modo en que la primera línea de una carta larga es la prueba de que una carta larga fue escrita. La primera frase es la prueba de que abriste la app un martes que no recuerdas, en una semana que no recuerdas, y escribiste una frase. La primera frase es la prueba de que la frase no editada ha sido, desde entonces, en alguna forma, siempre la misma frase no editada. La primera frase es la prueba de que la caja ha estado ahí todo este tiempo, sosteniendo la frase en el orden en que la escribiste. La primera frase es, en el sentido más ordinario, la prueba de que el medio ordinario ocurrió. La primera frase es, al final, el pequeño objeto que hace que el resto de la práctica se sienta real."
      },
      {
        "h": "La primera frase es más corta de lo que recuerdas",
        "p": "La primera frase era, en el recuerdo, más larga. La primera frase era, en el recuerdo, un párrafo. La primera frase era, en el recuerdo, un párrafo que guardaba un pequeño sentimiento, una pequeña situación y un pequeño titubeo en la misma habitación. La primera frase es, el día en que la lees, más corta de lo que recuerdas. La primera frase es, de hecho, una frase. La primera frase es, a veces, solo unas pocas palabras. La primera frase es, en la cuarta semana, un pequeño signo que muestra cuánto ha cambiado la práctica, del mismo modo en que un viejo SMS es un pequeño signo que muestra cuánto ha cambiado una amistad. La primera frase es más corta de lo que recuerdas, porque la frase no editada se ha vuelto más corta desde entonces. La primera frase es más corta de lo que recuerdas, porque la caja ya ha ganado su papel silencioso y ordinario. La primera frase es más corta de lo que recuerdas, porque la práctica ha llegado."
      }
    ],
    "cta": "Si todavía no has hecho scroll hasta la primera frase, hoy puede ser un pequeño día tranquilo y bueno para hacerlo.",
    "faqs": [
      {
        "q": "¿Y si la primera frase se siente un poco vergonzosa?",
        "a": "La primera frase se sentirá, en un sentido silencioso, un poco vergonzosa. La primera frase es una frase que escribiste cuando todavía no sabías para qué era la caja. La primera frase es una frase que es un pasito demasiado cuidadosa, como una primera entrada de diario es un pasito demasiado cuidadosa. La vergüenza es normal. La vergüenza es el pequeño signo de que te has vuelto, en las semanas desde entonces, un poquito más honesto con la caja. La vergüenza es, de un modo que al final es amable, la práctica que ha llegado."
      },
      {
        "q": "¿Y si quiero borrar la primera frase?",
        "a": "Puedes. La caja, dentro de la app, es tuya. La primera frase, como cada frase, es una frase que puedes dejar en paz o cambiar, del mismo modo en que una entrada de diario es algo que puedes dejar en paz o cambiar. La primera frase, si la borras, no estará en la caja mañana por la mañana. La primera frase, si la conservas, será el pequeño objeto al que vuelvas dentro de semanas. La caja honesta, en la mayoría de las prácticas silenciosas, es la más útil."
      },
      {
        "q": "¿Es la primera frase la frase más importante?",
        "a": "La primera frase es la frase más importante, del mismo modo en que el primer paso es el paso más importante. La primera frase también es, en la mayoría de las prácticas silenciosas, no la frase más importante, del mismo modo en que el primer café no es el café más importante. La primera frase es, semanas después, un pequeño objeto. La primera frase es, al final, la pequeña prueba de que apareciste. La primera frase es, el día en que haces scroll hacia arriba, la frase que hace que el resto de la práctica se sienta real."
      }
    ],
    "links": [
      {
        "href": "/es",
        "label": "Togthr inicio"
      },
      {
        "href": "/es/features",
        "label": "Togthr funciones"
      },
      {
        "href": "/es/blog/the-day-the-unedited-sentence-becomes-ordinary",
        "label": "El día en que la frase no editada se vuelve ordinaria"
      },
      {
        "href": "/es/blog/the-morning-you-read-the-unedited-sentence-back",
        "label": "La mañana en que relees la frase no editada"
      },
      {
        "href": "/es/blog/two-minute-daily-check-in-ai-companion",
        "label": "El check-in diario de dos minutos con un acompañante de IA"
      }
    ]
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getBlogPost(slug, locale as Locale)
  if (!post) return {}
  const url = `${siteConfig.url}/${locale}/blog/the-first-time-you-read-the-first-sentence-again`
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags.join(', '),
    alternates: {
      canonical: url,
      languages: (() => {
        const map: Record<string, string> = {}
        for (const loc of routing.locales) {
          map[loc] = `${siteConfig.url}/${loc}/blog/the-first-time-you-read-the-first-sentence-again`
        }
        map['x-default'] = `${siteConfig.url}/en/blog/the-first-time-you-read-the-first-sentence-again`
        return map
      })(),
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      locale: locale.replace('-', '_'),
      publishedTime: post.date,
      authors: [post.author || 'Togthr'],
      tags: post.tags,
      images: [{
        url: `${siteConfig.url}${post.cover}`,
        width: 1200,
        height: 630,
        alt: post.title,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${siteConfig.url}${post.cover}`],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const localeTyped = locale as Locale
  setRequestLocale(localeTyped)
  const post = getBlogPost(slug, localeTyped)
  if (!post) notFound()

  const body = BODIES[localeTyped] ?? BODIES.en
  const url = `${siteConfig.url}/${localeTyped}/blog/the-first-time-you-read-the-first-sentence-again`
  const morePosts = getBlogPostsByLocale(localeTyped)
    .filter((p) => p.slug !== slug)
    .slice(0, 3)

  // FAQ schema
  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: body.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const blogPostingLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}${post.cover}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Organization', name: post.author || 'Togthr', url: siteConfig.url },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.name,
      logo: { '@type': 'ImageObject', url: `${siteConfig.url}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    inLanguage: locale.replace('-', '_'),
    keywords: post.tags.join(', '),
  }

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: siteConfig.name, item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/${localeTyped}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="mb-6 text-sm text-zinc-500">
        <Link href={`/${localeTyped === 'en' ? '' : localeTyped + '/'}`} className="hover:text-pink-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/${localeTyped}/blog`} className="hover:text-pink-400">Blog</Link>
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

      <img
        src={post.cover}
        alt={post.title}
        className="mb-8 w-full rounded-2xl border border-zinc-800"
        loading="lazy"
        decoding="async"
      />

      <div className="prose prose-invert max-w-none">
        <p className="text-lg leading-relaxed text-zinc-200">{body.intro}</p>

        {body.sections.map((s) => (
          <section key={s.h} className="mt-10">
            <h2 className="text-2xl font-semibold text-zinc-100">{s.h}</h2>
            <p className="mt-3 leading-relaxed text-zinc-300">{s.p}</p>
          </section>
        ))}

        <p className="mt-10 text-lg leading-relaxed text-pink-300">{body.cta}</p>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-zinc-100">FAQ</h2>
        <div className="mt-4 space-y-4">
          {body.faqs.map((f, i) => (
            <details key={i} className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-4">
              <summary className="cursor-pointer text-base font-medium text-zinc-100">{f.q}</summary>
              <p className="mt-2 leading-relaxed text-zinc-300">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-zinc-800 bg-zinc-900/40 p-6">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Continue reading</h2>
        <ul className="mt-3 space-y-2">
          {body.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-pink-400 hover:underline">{l.label} →</Link>
            </li>
          ))}
        </ul>
      </section>

      {morePosts.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-zinc-500">More from the blog</h2>
          <ul className="mt-3 space-y-3">
            {morePosts.map((p) => (
              <li key={p.slug}>
                <Link href={`/${localeTyped}/blog/${p.slug}`} className="block text-pink-400 hover:underline">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </article>
  )
}
