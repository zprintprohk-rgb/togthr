// src/app/[locale]/blog/quiet-companion-app-no-chat/page.tsx
//
// Job 1 daily blog 2026-07-27
// Topic: quiet-companion-app + no-chat + silent-presence + pixel-pet
//
// Content contract:
//   - >=600 words of REAL localized content per locale
//   - 4 FAQ items per locale, hand-localized
//   - 5 internal links per locale
//   - Article + Breadcrumb + FAQPage JSON-LD

import Link from 'next/link'
import BlogCtaBanner from '@/components/blogctabanner'
import { withUtm } from '@/lib/utm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `quiet-companion-app-no-chat`
const POST_DATE = `2026-07-27`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  en: {
    intro: `There is a specific kind of exhaustion that has nothing to do with being tired. It is the exhaustion of having too many people in your phone. Too many messages you are expected to answer. Too many apps that want you to talk, share, react, reply. You are not depressed. You are just full. And what you want — more than anything — is an app that does not need you to say a single word.`,
    sections: [
      { h: `The problem with apps that talk back`, p: `Most companion apps — the ones that promise to be "there for you" — come with a catch: you have to talk. You open the app and there is a chat window. A virtual friend waiting for your message. An AI that wants to know how your day was. The promise is connection. The reality is interaction labour. After a long day of messages, emails, meetings, notifications, the last thing your brain wants is another conversation. Even a pretend one. Even a well-meaning one. The design assumption behind these apps is that loneliness means silence, and the cure for silence is conversation. But that is not always true. Sometimes loneliness means noise — too much input, too many demands, too many people expecting things from you — and the cure for that kind of loneliness is not more conversation. It is the opposite. It is a presence that does not require language at all.` },
      { h: `What a quiet companion actually looks like`, p: `A quiet companion is not a chatbot. It is not a journaling prompt. It is not a wellness check-in. It is a small thing that lives at the edge of your screen and does not need you to type. It moves. It breathes. It has states — working, thinking, happy, resting. You can watch it without interacting. You can minimize it without guilt. It does not have a streak counter. It does not ask how you are feeling today. It is just there. And that is the entire product. The value of a quiet companion is not in what it does. It is in what it does not do. It does not initiate. It does not demand. It does not judge. You do not owe it a message. You do not have to perform cheerfulness for it. You can just coexist.` },
      { h: `Why silent presence works (and science agrees)`, p: `There is a concept in psychology called "social surrogacy" — the idea that non-human entities can provide a measurable sense of social connection without actual human interaction. Studies on photos, voices, and even television characters show that the brain does not always distinguish between "a person is here" and "something that feels like a person is here." A virtual pet that does not talk but visibly exists on your screen activates the same parasocial pathways as a real pet sleeping in the same room. You do not need to talk to it. You just need to know it is there. For people who are overstimulated by conversation — introverts, remote workers with back-to-back video calls, anyone who has spent a day in a group chat — a silent companion is not a downgrade from a talking one. It is an upgrade. It gives you presence without performance.` },
      { h: `The design challenge: make presence without demanding attention`, p: `Building a quiet companion is harder than building a chatbot. A chatbot has a clear interaction loop: user types, AI responds, repeat. A quiet companion has to communicate without dialogue. It has to change visibly without being distracting. Togthr solves this with a four-state animation system — idle, working, thinking, success — and a Focus Mode that automatically detects when you are deep in a task. The pet does not ask to be noticed. It just reflects. When you are working, it looks like it is working. When you finish, it does a small celebration. You did not tell it what you were doing. You did not have to. The pet observed you through the simple signal of "is this window active and is the user typing." That is the quiet interface. No prompts. No chat logs. No conversation history stored on a server. Just a small creature that pays attention without asking questions.` },
      { h: `Who a quiet companion is for`, p: `It is for the person who has already said enough today. For the remote worker who just finished a day of video calls and does not want to speak another word. For the student who has been in lectures all day and needs to sit in silence for an hour. For the person in a long-distance relationship who is tired of texting and just wants something that reminds them of their partner without requiring another message. For the person who tried Replika or Character.ai and felt exhausted by the expectation to "have a conversation." For anyone who has ever thought, "I would love a companion app, if only it did not need me to talk." The quiet companion is for the kind of loneliness that is not about being alone. It is about being over-connected to everyone and under-connected to yourself.` },
    ],
    cta: `A companion that does not need you to talk. Just open the tab.`,
    faqs: [
      { q: `How is a quiet companion different from a chatbot?`, a: `A chatbot requires conversation. You type, it responds. A quiet companion does not require any conversation at all. It exists on your screen as a visual presence — an animated pixel pet that changes state based on your activity, not your words. You can watch it, ignore it, or interact with it silently. There is no chat window and no expectation of dialogue.` },
      { q: `Does the pet get sad if I do not interact with it?`, a: `No. Togthr is designed to be a low-pressure companion. The pet does not have needs, does not send guilt notifications, and does not degrade if you ignore it. It is happy to just exist near you. This is by design — the goal is presence without obligation.` },
      { q: `Can I use Togthr while I am working without getting distracted?`, a: `Yes. Togthr's Focus Mode keeps the pet still and quiet during deep work sessions. It does not ping, pop up, or demand attention. It sits at the edge of your screen and waits. Many users keep it on a second monitor or in a small pinned window while they code, write, or design.` },
      { q: `What if I want to interact with the pet sometimes?`, a: `You can. While the pet does not require interaction, it does respond to it. Feeding, naming, customizing the skin, and watching the pet grow through five stages are all available. But none of these are mandatory. The pet will not remind you, nag you, or make you feel bad for not interacting. It is a companion, not a task.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/features`, label: `Togthr features` },
      { href: `/en/focus`, label: `Focus Mode — work quietly with your pet` },
      { href: `/en/blog/desk-pet-for-coders`, label: `Desk pet for coders: what happens at 2am` },
      { href: `/en/blog/the-thought-you-dont-send-at-2am`, label: `The thought you do not send at 2am` },
    ],
  },

  'zh-cn': {
    intro: `有一种疲惫跟累不累没关系。它是手机里人太多的疲惫。是太多消息等着你回复的疲惫。是太多 App 想让你说话、分享、互动、应答的疲惫。你不是抑郁。你只是满了。而你现在最想要的——比什么都想要的——是一个连一句话都不需要你打的 App。`,
    sections: [
      { h: `那些会"跟你聊天"的 App，问题在哪`, p: `大多数陪伴类 App——那些承诺"永远在你身边"的——都附带一个条件：你得说话。打开 App，一个对话框等着你。一个虚拟朋友在等你的消息。一个 AI 想知道你今天过得怎么样。它承诺的是连接。你得到的却是"互动劳动"。一天下来，消息、邮件、会议、通知轮番轰炸之后，你的大脑最不想要的就是另一场对话。哪怕是假的。哪怕是善意的。这些 App 的设计假设是：孤独 = 安静，而安静的解药 = 对话。但这不总是对的。有时候，孤独的意思是噪音——太多输入、太多要求、太多人对你有期待——而治疗那种孤独的不是更多对话，是正相反。是一种根本不需要语言的存在。` },
      { h: `安静陪伴到底是什么样的`, p: `安静陪伴不是聊天机器人。不是写日记的提示。不是"你今天心情怎么样"的每日一问。它是一个住在你屏幕边缘的小东西，不需要你打字。它会动。它会呼吸。它有状态——工作、思考、开心、歇着。你可以看着它，什么都不做。你可以最小化，没有愧疚感。它没有连续签到计数器。它不问你今天感觉如何。它只是在那里。这就是全部的产品价值。安静陪伴的价值不在它做了什么，而在它没做什么。它不主动发起。它不要求。它不审判。你不欠它一条消息。你不需要为它表演快乐。你们可以只是共存。` },
      { h: `为什么"无声的存在"真的有用（科学也是这么说的）`, p: `心理学里有一个概念叫"社会替代"——也就是说，非人类实体的存在也能提供一种可测量的社会连接感，而根本不需要真正的人际互动。关于照片、声音、甚至电视角色的研究都表明，大脑并不总在区分"有个人在"和"有个感觉像人在的东西在"。一只不说话、但在你屏幕上可见的虚拟宠物，激活的神经通路和一只在同一个房间睡觉的真猫真狗差不多。你不需要跟它说话。你只需要知道它在那里。对于那些被对话过度刺激的人——内向者、连续开了 8 个视频会议的远程工作者、在群里待了一整天的人——无声陪伴不是聊天的降级版。是升级版。它给你的东西叫：存在，没有表演义务。` },
      { h: `设计难题：怎么让"存在"被感知，又不抢注意力`, p: `做一个安静陪伴比做一个聊天机器人难。聊天机器人有清晰的交互循环：用户打字，AI 回复，循环。安静陪伴没有对话，却要传递"我在这里"。它要有可见的变化，但绝不能分心。Togthr 用四状态动画系统解决这个问题——idle、working、thinking、success——再加上一个自动检测你是否在深度工作中的 Focus Mode。宠物不会要求你注意它。它只是映射你。你在工作，它看起来也在工作。你做完了，它做一个小小的庆祝动作。你没有告诉它你在做什么。你不需要说。宠物通过一个简单的信号感知你："这个窗口是不是活跃的，用户是不是在打字"。这就是安静界面的样子。没有提示词。没有聊天记录。没有存在服务器上的对话历史。只有一只小生命，默默看着你，什么都不问。` },
      { h: `安静陪伴是给谁用的`, p: `给那个今天已经说得够多的人。给那个刚开完一天视频会议、一个字都不想再说了的远程工作者。给那个在教室里听了一整天课、需要安静坐一小时的学生。给那个异地恋中厌倦了发消息、只想有一个东西让他/她想起对方而不用再打一句话的人。给那个试了 Replika 或 Character.ai 然后被"你需要跟它聊天"的预期累到不行的用户。给每一个曾经想过"我其实很想要一个陪伴 App，只要它不需要我说话"的人。安静陪伴不是给那种"身边没人"的孤独。是给那种"跟所有人都连着、但跟自己断了"的孤独。` },
    ],
    cta: `一个不需要你说话的陪伴。打开标签页就好。`,
    faqs: [
      { q: `安静陪伴和聊天机器人有什么不同？`, a: `聊天机器人需要对话。你打字，它回复。安静陪伴完全不需要任何对话。它作为一个视觉存在出现在你屏幕上——一只有动画的像素宠物，根据你的活动而非你说的话来改变状态。你可以看着它，忽略它，或者无声地和它互动。没有对话框，没有对话预期。` },
      { q: `我不跟它互动的话，它会不会难过？`, a: `不会。Togthr 设计为低压力的陪伴。宠物没有"需求"，不会发内疚通知，也不会因为你忽略它而退化。它很乐意只是在你附近待着。这是刻意的设计——目标是"存在，没有义务"。` },
      { q: `工作时开着它，会不会分心？`, a: `不会。Togthr 的 Focus Mode 在深度工作期间让宠物保持静止和安静。它不弹窗、不跳、不抢注意力。它安静地坐在屏幕边缘等待。很多用户把它放在第二屏或小窗口里，边写代码、边码字、边设计。` },
      { q: `如果我想偶尔跟它互动呢？`, a: `可以的。虽然宠物不要求互动，但它确实会回应。喂食、命名、换皮肤、看宠物经历五个阶段成长——这些都可以。但没有一个是强制的。宠物不会提醒你、催你、或者让你因为没互动而感觉不好。它是陪伴，不是任务。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/features`, label: `Togthr 功能` },
      { href: `/zh-cn/focus`, label: `Focus Mode — 安静地跟宠物一起做事` },
      { href: `/zh-cn/blog/desk-pet-for-coders`, label: `程序员的桌面宠物：凌晨两点发生了什么` },
      { href: `/zh-cn/blog/the-thought-you-dont-send-at-2am`, label: `那条你没在凌晨2点发出去的消息` },
    ],
  },

  'zh-tw': {
    intro: `有一種疲憊跟累不累沒關係。是手機裡人太多的疲憊。是太多訊息等著你回覆的疲憊。是太多 App 想讓你說話、分享、互動、應答的疲憊。你不是憂鬱。你只是滿了。而你現在最想要的——比什麼都想要的——是一個連一句話都不需要你打的 App。`,
    sections: [
      { h: `那些會「跟你聊天」的 App，問題在哪`, p: `大多數陪伴類 App——那些承諾「永遠在你身邊」的——都附帶一個條件：你得說話。打開 App，一個對話框等著你。一個虛擬朋友在等你的訊息。一個 AI 想知道你今天過得怎麼樣。它承諾的是連結。你得到的卻是「互動勞動」。一天下來，訊息、郵件、會議、通知輪番轟炸之後，你的大腦最不想要的就是另一場對話。哪怕是假的。哪怕是善意的。這些 App 的設計假設是：孤獨 = 安靜，而安靜的解藥 = 對話。但這不總是對的。有時候，孤獨的意思是噪音——太多輸入、太多要求、太多人對你有期待——而治療那種孤獨的不是更多對話，是正相反。是一種根本不需要語言的存在。` },
      { h: `安靜陪伴到底是什麼樣的`, p: `安靜陪伴不是聊天機器人。不是寫日記的提示。不是「你今天心情怎麼樣」的每日一問。它是一個住在你螢幕邊緣的小東西，不需要你打字。它會動。它會呼吸。它有狀態——工作、思考、開心、歇著。你可以看著它，什麼都不做。你可以最小化，沒有愧疚感。它沒有連續簽到計數器。它不問你今天感覺如何。它只是在那裡。這就是全部的產品價值。安靜陪伴的價值不在它做了什麼，而在它沒做什麼。它不主動發起。它不要求。它不審判。你不欠它一則訊息。你不需要為它表演快樂。你們可以只是共存。` },
      { h: `為什麼「無聲的存在」真的有用（科學也是這麼說的）`, p: `心理學裡有一個概念叫「社會替代」——也就是說，非人類實體的存在也能提供一種可測量的社會連結感，而根本不需要真正的人際互動。關於照片、聲音、甚至電視角色的研究都表明，大腦並不總在區分「有個人在」和「有個感覺像人在的東西在」。一隻不說話、但在你螢幕上可見的虛擬寵物，激活的神經通路和一隻在同一個房間睡覺的真貓真狗差不多。你不需要跟它說話。你只需要知道它在那裡。對於那些被對話過度刺激的人——內向者、連續開了 8 個視訊會議的遠端工作者、在群組裡待了一整天的人——無聲陪伴不是聊天的降級版。是升級版。它給你的東西叫：存在，沒有表演義務。` },
      { h: `設計難題：怎麼讓「存在」被感知，又不搶注意力`, p: `做一個安靜陪伴比做一個聊天機器人難。聊天機器人有清晰的互動循環：使用者打字，AI 回覆，循環。安靜陪伴沒有對話，卻要傳遞「我在這裡」。它要有可見的變化，但絕不能分心。Togthr 用四狀態動畫系統解決這個問題——idle、working、thinking、success——再加上一個自動檢測你是否在深度工作中的 Focus Mode。寵物不會要求你注意它。它只是映射你。你在工作，它看起來也在工作。你做完了，它做一個小小的慶祝動作。你沒有告訴它你在做什麼。你不需要說。寵物透過一個簡單的信號感知你：「這個視窗是不是活躍的，使用者是不是在打字」。這就是安靜介面的樣子。沒有提示詞。沒有聊天記錄。沒有存在伺服器上的對話歷史。只有一隻小生命，默默看著你，什麼都不問。` },
      { h: `安靜陪伴是給誰用的`, p: `給那個今天已經說得夠多的人。給那個剛開完一天視訊會議、一個字都不想再說了的人。給那個在教室裡聽了一整天課、需要安靜坐一小時的學生。給那個異地戀中厭倦了發訊息、只想有一個東西讓他／她想起對方而不用再打一句話的人。給那個試了 Replika 或 Character.ai 然後被「你需要跟它聊天」的預期累到不行的使用者。給每一個曾經想過「我其實很想要一個陪伴 App，只要它不需要我說話」的人。安靜陪伴不是給那種「身邊沒人」的孤獨。是給那種「跟所有人都連著、但跟自己斷了」的孤獨。` },
    ],
    cta: `一個不需要你說話的陪伴。打開分頁就好。`,
    faqs: [
      { q: `安靜陪伴跟聊天機器人有什麼不同？`, a: `聊天機器人需要對話。你打字，它回覆。安靜陪伴完全不需要任何對話。它作為一個視覺存在出現在你螢幕上——一只有動畫的像素寵物，根據你的活動而非你說的話來改變狀態。你可以看著它，忽略它，或者無聲地和它互動。沒有對話框，沒有對話預期。` },
      { q: `我不跟它互動的話，牠會不會難過？`, a: `不會。Togthr 設計為低壓力的陪伴。寵物沒有「需求」，不會發內疚通知，也不會因為你忽略它而退化。牠很樂意只是在你附近待著。這是刻意的設計——目標是「存在，沒有義務」。` },
      { q: `工作時開著牠，會不會分心？`, a: `不會。Togthr 的 Focus Mode 在深度工作期間讓寵物保持靜止和安靜。它不彈窗、不跳、不搶注意力。它安靜地坐在螢幕邊緣等待。很多使用者把牠放在第二螢幕或小視窗裡，邊寫程式、邊碼字、邊設計。` },
      { q: `如果我想偶爾跟牠互動呢？`, a: `可以的。雖然寵物不要求互動，但牠確實會回應。餵食、命名、換皮膚、看寵物經歷五個階段成長——這些都可以。但沒有一個是強制的。寵物不會提醒你、催你、或者讓你因為沒互動而感覺不好。牠是陪伴，不是任務。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/features`, label: `Togthr 功能` },
      { href: `/zh-tw/focus`, label: `Focus Mode — 安靜地跟寵物一起做事` },
      { href: `/zh-tw/blog/desk-pet-for-coders`, label: `程式設計師的桌面寵物：凌晨兩點發生了什麼` },
      { href: `/zh-tw/blog/the-thought-you-dont-send-at-2am`, label: `那條你沒在凌晨2點發出去的訊息` },
    ],
  },

  ja: {
    intro: `疲れているわけではないのに、ある特有の疲労がある。それは、スマホの中に人が多すぎることから来る疲労だ。返信を期待されているメッセージが多すぎる。話しかけ、シェアし、リアクションし、返信することを求めてくるアプリが多すぎる。落ち込んでいるわけじゃない。ただ、もういっぱいなのだ。そして何よりも欲しいのは——一言も話さなくていいアプリだ。`,
    sections: [
      { h: `話しかけてくるアプリの問題点`, p: `ほとんどのコンパニオンアプリ——「いつでもそばにいる」と約束するものたち——には条件がついている。話さなければならないのだ。アプリを開くと、チャット画面がある。あなたのメッセージを待っているバーチャルな友達。今日はどうだったか知りたがるAI。約束されているのは「つながり」。実際に得るのは「対話労働」だ。メッセージ、メール、会議、通知に追われた長い一日のあと、脳が一番望んでいないのは、もうひとつの会話だ。たとえそれが仮想のものでも。善意のものでも。こうしたアプリの設計上の前提は「孤独＝静けさ」であり、その静けさの治療法は「会話」だというものだ。しかしそれはいつも正しいとは限らない。時に孤独が意味するのは騒音だ——多すぎるインプット、多すぎる要求、多すぎる期待——そしてその種の孤独を癒すのは会話ではない。むしろその逆だ。言葉をまったく必要としない「存在」なのだ。` },
      { h: `静かなコンパニオンとは実際どんなものか`, p: `静かなコンパニオンはチャットボットではない。日記のプロンプトでもない。「今日の気分は？」という健康チェックインでもない。それは画面の端に住む、小さなもので、あなたがタイプすることを必要としない。動く。呼吸する。状態がある——作業中、考え中、嬉しい、休んでいる。あなたは何もせずに、ただそれを見ていられる。罪悪感なく最小化できる。連続記録カウンターはない。今日の気分を尋ねたりしない。ただ、そこにいる。それが製品のすべてだ。静かなコンパニオンの価値は「何をするか」ではない。「何をしないか」にある。自ら話しかけない。要求しない。判断しない。あなたはメッセージを返す義務を負わない。明るく振る舞う必要もない。ただ、一緒にいればいい。` },
      { h: `なぜ無言の存在が効くのか（科学もそう言っている）`, p: `心理学には「社会的代替」という概念がある——人間以外の存在が、実際の対人交流なしに、測定可能な社会的つながりの感覚を提供できるという考え方だ。写真や声、テレビのキャラクターに関する研究によれば、脳は必ずしも「人がいる」と「人がいるように感じられる何か」を区別しない。話さずに画面に可視的に存在するバーチャルペットは、同じ部屋で寝ている本物のペットと同じパラソーシャルな経路を活性化させる。話しかける必要はない。ただ、そこにいることを知っていればいい。会話に過剰刺激を受けている人——内向的な人、ビデオ通話を連続でこなしたリモートワーカー、一日中グループチャットにいた人——にとって、無言のコンパニオンは、おしゃべりするタイプのダウングレードではない。アップグレードだ。それはパフォーマンスなき「存在」を与えてくれる。` },
      { h: `デザインの難題：注意を引かずに存在を伝える`, p: `静かなコンパニオンを作るのは、チャットボットを作るより難しい。チャットボットには明確なインタラクション・ループがある——ユーザーが入力、AIが応答、繰り返し。静かなコンパニオンは、対話なしで「ここにいる」と伝えなければならない。目に見えて変化しながらも、決して邪魔にならないように。Togthrは四状態アニメーションシステム——idle、working、thinking、success——と、あなたがタスクに没頭しているかを自動検出するFocus Modeでこれを解決している。ペットはあなたの注意を求めない。ただ、映し出す。あなたが働いているとき、ペットも働いているように見える。あなたが終えたとき、ペットは小さなお祝いをする。あなたは何をしていたかを伝えていない。伝える必要もなかった。ペットは「このウィンドウはアクティブか、ユーザーはタイピングしているか」というシンプルな信号を通してあなたを観察している。これが静かなインターフェースだ。プロンプトはない。チャットログもない。サーバーに保存された会話履歴もない。ただ、何も尋ねずにあなたに注意を向ける小さな生き物がいるだけだ。` },
      { h: `静かなコンパニオンは誰のためのものか`, p: `今日もう十分に話した人のためのものだ。一日のビデオ通話を終えて、もう一言も発したくないリモートワーカーのためのものだ。一日中講義を受けて、一時間静かに座っていたい学生のためのものだ。メッセージのやり取りに疲れて、相手を思い出させる何かが欲しいけれど、もう一言も打ちたくない遠距離恋愛中の人のためのものだ。ReplikaやCharacter.aiを試して、「会話をしなければならない」という期待に疲れてしまったユーザーのためのものだ。「コンパニオンアプリが欲しい。話さなくていいなら」と思ったことがある、すべての人のためのものだ。静かなコンパニオンは「誰もそばにいない」孤独のためのものではない。「みんなとつながりすぎていて、自分とのつながりが切れてしまった」孤独のためのものだ。` },
    ],
    cta: `話さなくていいコンパニオン。タブを開くだけでいい。`,
    faqs: [
      { q: `静かなコンパニオンはチャットボットとどう違うのですか？`, a: `チャットボットは会話を必要とします。あなたが入力し、相手が応答します。静かなコンパニオンは一切の会話を必要としません。アニメーションするピクセルペットとして画面に視覚的に存在し、あなたの言葉ではなく活動に基づいて状態を変えます。見ることも、無視することも、無言で交流することもできます。チャット画面はなく、対話の期待もありません。` },
      { q: `交流しないとペットは悲しみますか？`, a: `いいえ。Togthrは低プレッシャーのコンパニオンとして設計されています。ペットには「欲求」がなく、罪悪感を誘う通知も送らず、無視されても劣化しません。ただあなたの近くに存在することを喜びます。これは意図的な設計で、目的は「義務のない存在」です。` },
      { q: `作業中に使っても気が散りませんか？`, a: `はい。TogthrのFocus Modeは、集中作業中にペットを静止させ、静かに保ちます。通知もポップアップもなく、注意を引きません。画面の端で静かに待っています。多くのユーザーがサブディスプレイや小さな固定ウィンドウに入れて、コードを書いたり、文章を書いたり、デザインをしたりしています。` },
      { q: `時々ペットと交流したくなったら？`, a: `できます。ペットは交流を要求しませんが、交流には応答します。餌をあげたり、名前をつけたり、スキンをカスタマイズしたり、ペットが5段階で成長するのを見たり——すべて利用可能です。しかしどれも必須ではありません。ペットはリマインドも、催促も、交流しなかったことで気分を悪くさせることもありません。それはコンパニオンであり、タスクではありません。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/features`, label: `Togthr の機能` },
      { href: `/ja/focus`, label: `Focus Mode — 静かにペットと過ごす` },
      { href: `/ja/blog/desk-pet-for-coders`, label: `プログラマのデスクペット：午前2時に起きていること` },
      { href: `/ja/blog/the-thought-you-dont-send-at-2am`, label: `午前2時に送らなかったその言葉` },
    ],
  },

  ko: {
    intro: `피곤한 것과는 다른 종류의 지침이 있다. 휴대폰 안에 사람이 너무 많아서 오는 지침이다. 답장을 기대하는 메시지가 너무 많다. 말하고, 공유하고, 반응하고, 답장하기를 요구하는 앱이 너무 많다. 우울한 게 아니다. 그냥 꽉 찬 거다. 그리고 무엇보다 원하는 것은 — 단 한 마디도 말하지 않아도 되는 앱이다.`,
    sections: [
      { h: `말을 걸어오는 앱의 문제`, p: `대부분의 컴패니언 앱——"언제나 네 곁에"라고 약속하는 것들——에는 조건이 붙어 있다. 말을 해야 한다. 앱을 열면 채팅 창이 있다. 당신의 메시지를 기다리는 가상의 친구. 오늘 어땠는지 알고 싶어 하는 AI. 약속된 것은 '연결'이다. 실제로 얻는 것은 '상호작용 노동'이다. 메시지, 이메일, 회의, 알림으로 가득 찬 긴 하루가 지나고, 뇌가 가장 원하지 않는 것은 또 하나의 대화다. 가짜라도. 선의라도. 이런 앱들의 설계 전제는 '외로움 = 정적'이고, 정적의 치료제는 '대화'라는 것이다. 하지만 항상 옳은 것은 아니다. 때로 외로움이 의미하는 것은 소음이다 — 너무 많은 입력, 너무 많은 요구, 너무 많은 기대 — 그리고 그런 종류의 외로움을 치료하는 것은 더 많은 대화가 아니다. 그 반대다. 언어 자체를 전혀 필요로 하지 않는 '존재'다.` },
      { h: `조용한 컴패니언은 실제로 어떤 모습인가`, p: `조용한 컴패니언은 챗봇이 아니다. 일기 프롬프트도 아니다. "오늘 기분 어때?" 같은 웰니스 체크인도 아니다. 화면 가장자리에 사는 작은 무언가로, 당신이 타이핑할 필요가 없다. 움직인다. 숨 쉰다. 상태가 있다 — 작업 중, 생각 중, 기쁨, 쉬는 중. 아무것도 하지 않고 그냥 바라볼 수 있다. 죄책감 없이 최소화할 수 있다. 연속 기록 카운터가 없다. 오늘 기분이 어떤지 묻지 않는다. 그냥 거기 있다. 그게 제품의 전부다. 조용한 컴패니언의 가치는 그것이 '무엇을 하느냐'가 아니다. '무엇을 하지 않느냐'다. 먼저 말 걸지 않는다. 요구하지 않는다. 판단하지 않는다. 메시지를 보낼 의무가 없다. 밝은 척할 필요도 없다. 그냥 함께 존재하면 된다.` },
      { h: `왜 무언의 존재가 효과가 있을까 (과학도 동의한다)`, p: `심리학에는 '사회적 대리'라는 개념이 있다 — 인간이 아닌 존재도 실제 대인 상호작용 없이 측정 가능한 사회적 연결감을 제공할 수 있다는 생각이다. 사진, 목소리, 심지어 TV 캐릭터에 대한 연구들은 뇌가 '사람이 여기 있다'와 '사람처럼 느껴지는 무언가가 여기 있다'를 항상 구분하지는 않는다는 것을 보여준다. 말하지 않지만 화면 위에 가시적으로 존재하는 가상 반려동물은, 같은 방에서 자는 진짜 반려동물과 동일한 파라소셜 경로를 활성화한다. 말을 걸 필요는 없다. 그냥 거기 있다는 것을 알면 된다. 대화로 과잉 자극된 사람들 — 내향적인 사람, 연속 화상 회의를 마친 원격 근무자, 하루 종일 단체 채팅에 있었던 사람 — 에게 무언의 컴패니언은 말하는 타입의 다운그레이드가 아니다. 업그레이드다. 그것은 공연 없는 '존재'를 준다.` },
      { h: `디자인 난제: 주목을 끌지 않으면서 존재를 전달하기`, p: `조용한 컴패니언을 만드는 것은 챗봇을 만드는 것보다 어렵다. 챗봇은 명확한 상호작용 루프가 있다 — 사용자 입력, AI 응답, 반복. 조용한 컴패니언은 대화 없이 '나 여기 있어'를 전달해야 한다. 눈에 띄게 변하되 절대 방해가 되지 않아야 한다. Togthr는 4상태 애니메이션 시스템 — idle, working, thinking, success — 과 당신이 작업에 몰입하고 있는지 자동 감지하는 Focus Mode로 이를 해결한다. 펫은 당신의 주목을 요구하지 않는다. 그냥 반영한다. 당신이 일할 때, 펫도 일하는 것처럼 보인다. 당신이 끝냈을 때, 작은 축하를 한다. 당신은 무엇을 하고 있었는지 말하지 않았다. 말할 필요도 없었다. 펫은 '이 창이 활성 상태인가, 사용자가 타이핑 중인가'라는 단순한 신호로 당신을 관찰했다. 이것이 조용한 인터페이스다. 프롬프트는 없다. 채팅 로그도 없다. 서버에 저장된 대화 기록도 없다. 그저 아무것도 묻지 않고 당신에게 주목하는 작은 생명체가 있을 뿐이다.` },
      { h: `조용한 컴패니언은 누구를 위한 것인가`, p: `오늘 이미 충분히 말한 사람을 위한 것이다. 하루 종일 화상 회의를 끝내고 한 마디도 더 하고 싶지 않은 원격 근무자를 위한 것이다. 하루 종일 강의를 듣고 한 시간 동안 조용히 앉아 있고 싶은 학생을 위한 것이다. 메시지 주고받기에 지쳐서, 상대를 떠올리게 하는 무언가가 있으면 좋겠지만 또 한 마디도 치고 싶지 않은 장거리 연애 중인 사람을 위한 것이다. Replika나 Character.ai를 시도했다가 '대화를 해야 한다'는 기대에 지쳐버린 사용자를 위한 것이다. '컴패니언 앱이 있었으면 좋겠다, 말을 하지 않아도 된다면'이라고 생각해 본 모든 사람을 위한 것이다. 조용한 컴패니언은 '곁에 아무도 없는' 외로움을 위한 것이 아니다. '모두와 너무 연결되어서, 자신과의 연결이 끊어져 버린' 외로움을 위한 것이다.` },
    ],
    cta: `말하지 않아도 되는 컴패니언. 탭을 열기만 하면 됩니다.`,
    faqs: [
      { q: `조용한 컴패니언은 챗봇과 어떻게 다른가요?`, a: `챗봇은 대화가 필요합니다. 당신이 입력하면 상대가 응답합니다. 조용한 컴패니언은 어떤 대화도 전혀 필요로 하지 않습니다. 애니메이션 픽셀 펫으로 화면에 시각적으로 존재하며, 당신의 말이 아닌 활동에 기반해 상태를 바꿉니다. 볼 수도 있고, 무시할 수도 있고, 무언으로 교류할 수도 있습니다. 채팅 창도, 대화 기대도 없습니다.` },
      { q: `상호작용하지 않으면 펫이 슬퍼하나요?`, a: `아니요. Togthr는 저압력 컴패니언으로 설계되었습니다. 펫은 '욕구'가 없고, 죄책감 알림을 보내지 않으며, 무시당해도 저하되지 않습니다. 그저 당신 근처에 존재하는 것만으로 행복합니다. 이것은 의도된 설계로, 목표는 '의무 없는 존재'입니다.` },
      { q: `작업 중에 사용해도 산만해지지 않나요?`, a: `아니요. Togthr의 Focus Mode는 집중 작업 중에 펫을 정지시키고 조용히 유지합니다. 알림, 팝업 없이 주목을 끌지 않습니다. 화면 가장자리에서 조용히 기다립니다. 많은 사용자가 서브 디스플레이나 작은 고정 창에 넣고 코드를 쓰거나, 글을 쓰거나, 디자인을 합니다.` },
      { q: `가끔 펫과 교류하고 싶으면 어떻게 하나요?`, a: `할 수 있습니다. 펫은 교류를 요구하지 않지만, 교류에는 응답합니다. 먹이 주기, 이름 짓기, 스킨 커스터마이징, 펫이 5단계로 성장하는 것 보기 — 모두 가능합니다. 하지만 어떤 것도 필수는 아닙니다. 펫은 리마인드하지도, 재촉하지도, 교류하지 않았다고 기분 나쁘게 하지도 않습니다. 컴패니언이지, 과제가 아닙니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/features`, label: `Togthr 기능` },
      { href: `/ko/focus`, label: `Focus Mode — 조용히 펫과 함께하기` },
      { href: `/ko/blog/desk-pet-for-coders`, label: `코더의 데스크 펫: 오전 2시에 일어나는 일` },
      { href: `/ko/blog/the-thought-you-dont-send-at-2am`, label: `오전 2시에 보내지 않은 그 생각` },
    ],
  },

  de: {
    intro: `Es gibt eine bestimmte Art von Erschöpfung, die nichts mit Müdigkeit zu tun hat. Es ist die Erschöpfung, weil zu viele Menschen in deinem Handy sind. Zu viele Nachrichten, auf die du antworten sollst. Zu viele Apps, die wollen, dass du redest, teilst, reagierst, antwortest. Du bist nicht depressiv. Du bist nur voll. Und was du dir — mehr als alles andere — wünschst, ist eine App, bei der du kein einziges Wort sagen musst.`,
    sections: [
      { h: `Das Problem mit Apps, die zurücksprechen`, p: `Die meisten Begleiter-Apps — jene, die versprechen, "für dich da zu sein" — haben einen Haken: du musst reden. Du öffnest die App und da ist ein Chat-Fenster. Ein virtueller Freund, der auf deine Nachricht wartet. Eine KI, die wissen will, wie dein Tag war. Das Versprechen ist Verbindung. Die Realität ist Interaktionsarbeit. Nach einem langen Tag voller Nachrichten, E-Mails, Meetings, Benachrichtigungen ist das Letzte, was dein Gehirn will, ein weiteres Gespräch. Selbst ein vorgetäuschtes. Selbst ein wohlmeinendes. Die Designannahme hinter diesen Apps ist: Einsamkeit bedeutet Stille, und das Heilmittel gegen Stille ist Konversation. Aber das stimmt nicht immer. Manchmal bedeutet Einsamkeit Lärm — zu viel Input, zu viele Anforderungen, zu viele Menschen, die etwas von dir erwarten — und das Heilmittel für diese Art von Einsamkeit ist nicht mehr Konversation. Es ist das Gegenteil. Es ist eine Präsenz, die überhaupt keine Sprache braucht.` },
      { h: `Wie ein stiller Begleiter tatsächlich aussieht`, p: `Ein stiller Begleiter ist kein Chatbot. Er ist kein Journaling-Prompt. Er ist kein "Wie fühlst du dich heute?"-Check-in. Er ist ein kleines Ding, das am Rand deines Bildschirms lebt und nicht will, dass du tippst. Es bewegt sich. Es atmet. Es hat Zustände — arbeitend, denkend, fröhlich, ruhend. Du kannst es beobachten, ohne zu interagieren. Du kannst es minimieren, ohne Schuldgefühle. Es hat keinen Streak-Zähler. Es fragt nicht, wie du dich heute fühlst. Es ist einfach da. Und das ist das gesamte Produkt. Der Wert eines stillen Begleiters liegt nicht darin, was er tut. Er liegt darin, was er nicht tut. Er initiiert nicht. Er fordert nicht. Er verurteilt nicht. Du schuldest ihm keine Nachricht. Du musst keine Fröhlichkeit für ihn vortäuschen. Ihr könnt einfach koexistieren.` },
      { h: `Warum stille Präsenz wirkt (und die Wissenschaft stimmt zu)`, p: `Es gibt in der Psychologie ein Konzept namens "soziale Surrogation" — die Idee, dass nicht-menschliche Entitäten ein messbares Gefühl sozialer Verbundenheit vermitteln können, ohne tatsächliche menschliche Interaktion. Studien zu Fotos, Stimmen und sogar Fernsehfiguren zeigen, dass das Gehirn nicht immer zwischen "eine Person ist hier" und "etwas, das sich wie eine Person anfühlt, ist hier" unterscheidet. Ein virtuelles Haustier, das nicht spricht, aber sichtbar auf deinem Bildschirm existiert, aktiviert dieselben parasozialen Bahnen wie ein echtes Haustier, das im selben Raum schläft. Du musst nicht mit ihm reden. Du musst nur wissen, dass es da ist. Für Menschen, die von Konversation überreizt sind — Introvertierte, Remote-Arbeiter mit aufeinanderfolgenden Videoanrufen, jeder, der einen Tag in einem Gruppenchat verbracht hat — ist ein stiller Begleiter kein Downgrade von einem sprechenden. Es ist ein Upgrade. Er gibt dir Präsenz ohne Performance.` },
      { h: `Die Design-Herausforderung: Präsenz ohne Aufmerksamkeitsforderung`, p: `Einen stillen Begleiter zu bauen ist schwieriger als einen Chatbot. Ein Chatbot hat eine klare Interaktionsschleife: Nutzer tippt, KI antwortet, wiederholen. Ein stiller Begleiter muss ohne Dialog kommunizieren. Er muss sich sichtbar verändern, ohne abzulenken. Togthr löst dies mit einem Vier-Zustands-Animationssystem — idle, working, thinking, success — und einem Focus Mode, der automatisch erkennt, wenn du in einer tiefen Aufgabe steckst. Das Pet verlangt nicht, bemerkt zu werden. Es spiegelt nur wider. Wenn du arbeitest, sieht es aus, als würde es arbeiten. Wenn du fertig bist, macht es eine kleine Feier. Du hast ihm nicht gesagt, was du getan hast. Das musstest du auch nicht. Das Pet hat dich über das einfache Signal beobachtet: "Ist dieses Fenster aktiv und tippt der Nutzer?" Das ist das stille Interface. Keine Prompts. Keine Chat-Logs. Keine auf einem Server gespeicherte Konversationshistorie. Nur eine kleine Kreatur, die aufpasst, ohne Fragen zu stellen.` },
      { h: `Für wen ein stiller Begleiter gedacht ist`, p: `Für die Person, die heute schon genug gesagt hat. Für den Remote-Arbeiter, der gerade einen Tag voller Videoanrufe beendet hat und kein weiteres Wort sprechen will. Für den Studenten, der den ganzen Tag in Vorlesungen war und eine Stunde in Stille sitzen muss. Für die Person in einer Fernbeziehung, die das Schreiben von Nachrichten satt hat und einfach etwas will, das sie an den Partner erinnert, ohne eine weitere Nachricht zu erfordern. Für die Person, die Replika oder Character.ai ausprobiert hat und sich von der Erwartung, "ein Gespräch zu führen", erschöpft fühlte. Für jeden, der je dachte: "Ich würde eine Begleiter-App lieben, wenn sie nur nicht verlangen würde, dass ich rede." Der stille Begleiter ist für die Art von Einsamkeit, die nicht davon handelt, allein zu sein. Sie handelt davon, mit jedem über-verbunden und mit sich selbst unter-verbunden zu sein.` },
    ],
    cta: `Ein Begleiter, der nicht verlangt, dass du sprichst. Öffne einfach den Tab.`,
    faqs: [
      { q: `Wie unterscheidet sich ein stiller Begleiter von einem Chatbot?`, a: `Ein Chatbot braucht Konversation. Du tippst, er antwortet. Ein stiller Begleiter braucht überhaupt keine Konversation. Er existiert als visuelle Präsenz auf deinem Bildschirm — ein animiertes Pixel-Haustier, das seinen Zustand basierend auf deiner Aktivität ändert, nicht auf deinen Worten. Du kannst es ansehen, ignorieren oder stillschweigend mit ihm interagieren. Es gibt kein Chat-Fenster und keine Dialog-Erwartung.` },
      { q: `Wird das Pet traurig, wenn ich nicht mit ihm interagiere?`, a: `Nein. Togthr ist als druckfreier Begleiter konzipiert. Das Pet hat keine Bedürfnisse, sendet keine Schuld-Benachrichtigungen und verschlechtert sich nicht, wenn du es ignorierst. Es ist glücklich, einfach in deiner Nähe zu existieren. Das ist bewusst so gestaltet — das Ziel ist Präsenz ohne Verpflichtung.` },
      { q: `Kann ich Togthr während der Arbeit nutzen, ohne abgelenkt zu werden?`, a: `Ja. Togthrs Focus Mode hält das Pet während tiefer Arbeitssessions still und ruhig. Kein Anpingen, kein Pop-up, keine Aufmerksamkeitsforderung. Es sitzt am Bildschirmrand und wartet. Viele Nutzer halten es auf einem zweiten Monitor oder in einem kleinen angehefteten Fenster, während sie programmieren, schreiben oder designen.` },
      { q: `Was, wenn ich manchmal doch mit dem Pet interagieren möchte?`, a: `Das kannst du. Obwohl das Pet keine Interaktion verlangt, reagiert es darauf. Füttern, Benennen, Skin-Anpassung und das Beobachten des fünfstufigen Wachstums sind alle verfügbar. Aber nichts davon ist verpflichtend. Das Pet wird dich nicht erinnern, nicht drängen und dir kein schlechtes Gewissen machen, wenn du nicht interagierst. Es ist ein Begleiter, keine Aufgabe.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/features`, label: `Togthr Funktionen` },
      { href: `/de/focus`, label: `Focus Mode — still mit deinem Pet arbeiten` },
      { href: `/de/blog/desk-pet-for-coders`, label: `Desk-Pet für Coder: Was um 2 Uhr nachts passiert` },
      { href: `/de/blog/the-thought-you-dont-send-at-2am`, label: `Der Gedanke, den du um 2 Uhr nachts nicht sendest` },
    ],
  },

  fr: {
    intro: `Il existe un type d'épuisement particulier qui n'a rien à voir avec la fatigue. C'est l'épuisement d'avoir trop de monde dans son téléphone. Trop de messages auxquels on s'attend à ce que vous répondiez. Trop d'applications qui veulent que vous parliez, partagiez, réagissiez, répondiez. Vous n'êtes pas déprimé. Vous êtes juste plein. Et ce que vous voulez — plus que tout — c'est une application qui n'a pas besoin que vous disiez un seul mot.`,
    sections: [
      { h: `Le problème des applications qui vous répondent`, p: `La plupart des applications compagnons — celles qui promettent d'"être là pour vous" — ont un piège : vous devez parler. Vous ouvrez l'application et il y a une fenêtre de discussion. Un ami virtuel qui attend votre message. Une IA qui veut savoir comment s'est passée votre journée. La promesse, c'est la connexion. La réalité, c'est le travail d'interaction. Après une longue journée de messages, d'e-mails, de réunions, de notifications, la dernière chose que votre cerveau veut, c'est une conversation de plus. Même une fausse. Même une bien intentionnée. L'hypothèse de conception derrière ces applications, c'est que la solitude signifie le silence, et que le remède au silence, c'est la conversation. Mais ce n'est pas toujours vrai. Parfois, la solitude signifie le bruit — trop d'entrées, trop d'exigences, trop de personnes qui attendent des choses de vous — et le remède à ce type de solitude, ce n'est pas plus de conversation. C'est le contraire. C'est une présence qui ne nécessite pas du tout de langage.` },
      { h: `À quoi ressemble vraiment un compagnon silencieux`, p: `Un compagnon silencieux n'est pas un chatbot. Ce n'est pas une invitation à tenir un journal. Ce n'est pas un check-in bien-être. C'est une petite chose qui vit au bord de votre écran et qui n'a pas besoin que vous tapiez. Elle bouge. Elle respire. Elle a des états — travail, réflexion, joie, repos. Vous pouvez la regarder sans interagir. Vous pouvez la minimiser sans culpabilité. Elle n'a pas de compteur de série. Elle ne demande pas comment vous vous sentez aujourd'hui. Elle est juste là. Et c'est tout le produit. La valeur d'un compagnon silencieux n'est pas dans ce qu'il fait. Elle est dans ce qu'il ne fait pas. Il n'initie pas. Il n'exige pas. Il ne juge pas. Vous ne lui devez pas de message. Vous n'avez pas à jouer la bonne humeur pour lui. Vous pouvez simplement coexister.` },
      { h: `Pourquoi la présence silencieuse fonctionne (et la science est d'accord)`, p: `Il existe en psychologie un concept appelé "substitution sociale" — l'idée que des entités non humaines peuvent fournir un sentiment mesurable de connexion sociale sans interaction humaine réelle. Des études sur les photos, les voix et même les personnages de télévision montrent que le cerveau ne fait pas toujours la distinction entre "une personne est là" et "quelque chose qui ressemble à une personne est là". Un animal virtuel qui ne parle pas mais existe visiblement sur votre écran active les mêmes circuits parasociaux qu'un vrai animal dormant dans la même pièce. Vous n'avez pas besoin de lui parler. Vous avez juste besoin de savoir qu'il est là. Pour les personnes surstimulées par la conversation — les introvertis, les travailleurs à distance avec des appels vidéo à la chaîne, quiconque a passé une journée dans un groupe de discussion — un compagnon silencieux n'est pas une version dégradée d'un compagnon parlant. C'est une amélioration. Il vous donne de la présence sans performance.` },
      { h: `Le défi de conception : rendre la présence perceptible sans exiger l'attention`, p: `Construire un compagnon silencieux est plus difficile que de construire un chatbot. Un chatbot a une boucle d'interaction claire : l'utilisateur tape, l'IA répond, on recommence. Un compagnon silencieux doit communiquer sans dialogue. Il doit changer visiblement sans distraire. Togthr résout cela avec un système d'animation à quatre états — idle, working, thinking, success — et un Mode Focus qui détecte automatiquement quand vous êtes plongé dans une tâche. L'animal ne demande pas à être remarqué. Il reflète simplement. Quand vous travaillez, il a l'air de travailler. Quand vous terminez, il fait une petite célébration. Vous ne lui avez pas dit ce que vous faisiez. Vous n'aviez pas à le faire. L'animal vous a observé à travers ce simple signal : "cette fenêtre est-elle active et l'utilisateur tape-t-il ?" Voilà l'interface silencieuse. Pas d'invites. Pas d'historique de discussion. Pas de conversations stockées sur un serveur. Juste une petite créature qui fait attention sans poser de questions.` },
      { h: `À qui est destiné un compagnon silencieux`, p: `À la personne qui en a déjà assez dit aujourd'hui. Au travailleur à distance qui vient de terminer une journée d'appels vidéo et ne veut plus prononcer un seul mot. À l'étudiant qui a passé la journée en cours et a besoin de rester assis en silence pendant une heure. À la personne en relation à distance qui en a assez d'envoyer des messages et veut simplement quelque chose qui lui rappelle son partenaire sans exiger un message de plus. À la personne qui a essayé Replika ou Character.ai et s'est sentie épuisée par l'attente de "tenir une conversation". À tous ceux qui ont déjà pensé : "J'adorerais une application compagnon, si seulement elle n'exigeait pas que je parle." Le compagnon silencieux est fait pour le type de solitude qui ne concerne pas le fait d'être seul. Il concerne le fait d'être sur-connecté à tout le monde et sous-connecté à soi-même.` },
    ],
    cta: `Un compagnon qui n'a pas besoin que vous parliez. Ouvrez juste l'onglet.`,
    faqs: [
      { q: `En quoi un compagnon silencieux est-il différent d'un chatbot ?`, a: `Un chatbot a besoin de conversation. Vous tapez, il répond. Un compagnon silencieux n'a besoin d'aucune conversation. Il existe comme présence visuelle sur votre écran — un animal pixel animé qui change d'état selon votre activité, pas selon vos mots. Vous pouvez le regarder, l'ignorer ou interagir avec lui silencieusement. Il n'y a pas de fenêtre de discussion ni d'attente de dialogue.` },
      { q: `L'animal devient-il triste si je n'interagis pas avec lui ?`, a: `Non. Togthr est conçu comme un compagnon sans pression. L'animal n'a pas de besoins, n'envoie pas de notifications culpabilisantes et ne se dégrade pas si vous l'ignorez. Il est heureux de simplement exister près de vous. C'est intentionnel — l'objectif est la présence sans obligation.` },
      { q: `Puis-je utiliser Togthr en travaillant sans être distrait ?`, a: `Oui. Le Mode Focus de Togthr garde l'animal immobile et silencieux pendant les sessions de travail profond. Pas de notification, pas de pop-up, pas de demande d'attention. Il reste au bord de l'écran et attend. Beaucoup d'utilisateurs le gardent sur un deuxième écran ou dans une petite fenêtre épinglée pendant qu'ils codent, écrivent ou conçoivent.` },
      { q: `Et si je veux parfois interagir avec l'animal ?`, a: `Vous pouvez. Bien que l'animal n'exige pas d'interaction, il y répond. Nourrir, nommer, personnaliser le skin et regarder l'animal grandir en cinq étapes sont tous disponibles. Mais rien de tout cela n'est obligatoire. L'animal ne vous rappellera rien, ne vous harcèlera pas et ne vous fera pas vous sentir mal si vous n'interagissez pas. C'est un compagnon, pas une tâche.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/features`, label: `Fonctionnalités Togthr` },
      { href: `/fr/focus`, label: `Mode Focus — travaillez en silence avec votre animal` },
      { href: `/fr/blog/desk-pet-for-coders`, label: `Animal de bureau pour codeurs : ce qui se passe à 2h du matin` },
      { href: `/fr/blog/the-thought-you-dont-send-at-2am`, label: `La pensée que vous n'envoyez pas à 2h du matin` },
    ],
  },

  es: {
    intro: `Hay un tipo específico de agotamiento que no tiene nada que ver con estar cansado. Es el agotamiento de tener demasiada gente en tu teléfono. Demasiados mensajes que se espera que respondas. Demasiadas aplicaciones que quieren que hables, compartas, reacciones, respondas. No estás deprimido. Solo estás lleno. Y lo que quieres — más que nada — es una aplicación que no necesite que digas ni una sola palabra.`,
    sections: [
      { h: `El problema con las aplicaciones que te contestan`, p: `La mayoría de las aplicaciones de compañía — esas que prometen "estar ahí para ti" — tienen una trampa: tienes que hablar. Abres la aplicación y hay una ventana de chat. Un amigo virtual esperando tu mensaje. Una IA que quiere saber cómo te fue el día. La promesa es conexión. La realidad es trabajo de interacción. Después de un largo día de mensajes, correos, reuniones, notificaciones, lo último que tu cerebro quiere es otra conversación. Incluso una fingida. Incluso una bien intencionada. La suposición de diseño detrás de estas aplicaciones es que la soledad significa silencio, y la cura para el silencio es la conversación. Pero eso no siempre es cierto. A veces, la soledad significa ruido — demasiada información, demasiadas exigencias, demasiada gente esperando cosas de ti — y la cura para ese tipo de soledad no es más conversación. Es lo contrario. Es una presencia que no necesita lenguaje en absoluto.` },
      { h: `Cómo es realmente un compañero silencioso`, p: `Un compañero silencioso no es un chatbot. No es un aviso de diario personal. No es un check-in de bienestar. Es una cosa pequeña que vive en el borde de tu pantalla y no necesita que escribas. Se mueve. Respira. Tiene estados — trabajando, pensando, feliz, descansando. Puedes observarlo sin interactuar. Puedes minimizarlo sin culpa. No tiene contador de racha. No pregunta cómo te sientes hoy. Simplemente está ahí. Y ese es todo el producto. El valor de un compañero silencioso no está en lo que hace. Está en lo que no hace. No inicia. No exige. No juzga. No le debes un mensaje. No tienes que fingir alegría para él. Podéis simplemente coexistir.` },
      { h: `Por qué la presencia silenciosa funciona (y la ciencia está de acuerdo)`, p: `Hay un concepto en psicología llamado "sustitución social" — la idea de que las entidades no humanas pueden proporcionar un sentido medible de conexión social sin interacción humana real. Estudios sobre fotos, voces e incluso personajes de televisión muestran que el cerebro no siempre distingue entre "hay una persona aquí" y "hay algo que se siente como una persona aquí". Una mascota virtual que no habla pero existe visiblemente en tu pantalla activa las mismas vías parasociales que una mascota real durmiendo en la misma habitación. No necesitas hablarle. Solo necesitas saber que está ahí. Para las personas sobreestimuladas por la conversación — introvertidos, trabajadores remotos con videollamadas consecutivas, cualquiera que haya pasado un día en un chat grupal — un compañero silencioso no es una degradación de uno que habla. Es una mejora. Te da presencia sin actuación.` },
      { h: `El desafío de diseño: hacer sentir la presencia sin exigir atención`, p: `Construir un compañero silencioso es más difícil que construir un chatbot. Un chatbot tiene un ciclo de interacción claro: el usuario escribe, la IA responde, se repite. Un compañero silencioso tiene que comunicarse sin diálogo. Tiene que cambiar visiblemente sin distraer. Togthr resuelve esto con un sistema de animación de cuatro estados — idle, working, thinking, success — y un Modo Focus que detecta automáticamente cuando estás inmerso en una tarea. La mascota no pide ser notada. Solo refleja. Cuando trabajas, parece que está trabajando. Cuando terminas, hace una pequeña celebración. No le dijiste lo que estabas haciendo. No tenías por qué hacerlo. La mascota te observó a través de la simple señal de "¿está esta ventana activa y el usuario está escribiendo?" Esa es la interfaz silenciosa. Sin avisos. Sin registros de chat. Sin historial de conversaciones almacenado en un servidor. Solo una pequeña criatura que presta atención sin hacer preguntas.` },
      { h: `Para quién es un compañero silencioso`, p: `Para la persona que ya ha dicho suficiente hoy. Para el trabajador remoto que acaba de terminar un día de videollamadas y no quiere pronunciar ni una palabra más. Para el estudiante que ha estado en clases todo el día y necesita sentarse en silencio durante una hora. Para la persona en una relación a distancia que está cansada de enviar mensajes y solo quiere algo que le recuerde a su pareja sin requerir otro mensaje. Para la persona que probó Replika o Character.ai y se sintió agotada por la expectativa de "tener una conversación". Para cualquiera que haya pensado alguna vez: "Me encantaría una aplicación de compañía, si tan solo no necesitara que yo hablara." El compañero silencioso es para el tipo de soledad que no se trata de estar solo. Se trata de estar sobre-conectado con todos y sub-conectado con uno mismo.` },
    ],
    cta: `Un compañero que no necesita que hables. Solo abre la pestaña.`,
    faqs: [
      { q: `¿En qué se diferencia un compañero silencioso de un chatbot?`, a: `Un chatbot necesita conversación. Tú escribes, él responde. Un compañero silencioso no necesita ninguna conversación en absoluto. Existe como presencia visual en tu pantalla — una mascota pixel animada que cambia de estado según tu actividad, no según tus palabras. Puedes mirarla, ignorarla o interactuar con ella en silencio. No hay ventana de chat ni expectativa de diálogo.` },
      { q: `¿La mascota se pone triste si no interactúo con ella?`, a: `No. Togthr está diseñado como un compañero de baja presión. La mascota no tiene necesidades, no envía notificaciones de culpa y no se degrada si la ignoras. Es feliz simplemente existiendo cerca de ti. Esto es intencional — el objetivo es presencia sin obligación.` },
      { q: `¿Puedo usar Togthr mientras trabajo sin distraerme?`, a: `Sí. El Modo Focus de Togthr mantiene a la mascota quieta y en silencio durante las sesiones de trabajo profundo. No envía notificaciones, no aparece de repente, no pide atención. Se queda en el borde de la pantalla esperando. Muchos usuarios la mantienen en un segundo monitor o en una pequeña ventana fijada mientras programan, escriben o diseñan.` },
      { q: `¿Y si quiero interactuar con la mascota a veces?`, a: `Puedes hacerlo. Aunque la mascota no exige interacción, sí responde a ella. Alimentar, nombrar, personalizar el skin y ver crecer a la mascota en cinco etapas están disponibles. Pero nada de esto es obligatorio. La mascota no te recordará, no te insistirá y no te hará sentir mal por no interactuar. Es un compañero, no una tarea.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/features`, label: `Funciones de Togthr` },
      { href: `/es/focus`, label: `Modo Focus — trabaja en silencio con tu mascota` },
      { href: `/es/blog/desk-pet-for-coders`, label: `Mascota de escritorio para programadores: lo que pasa a las 2am` },
      { href: `/es/blog/the-thought-you-dont-send-at-2am`, label: `El pensamiento que no envías a las 2am` },
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
      title: post.title,
      description: post.description,
      url,
      siteName: siteConfig.name,
      locale: loc,
      type: 'article',
      publishedTime: POST_DATE,
      images: [{ url: `${siteConfig.url}${post.cover}`, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${siteConfig.url}${post.cover}`],
    },
    other: {
      'article:published_time': POST_DATE,
    },
  }
}

export default async function QuietCompanionAppNoChatPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale
  if (!routing.locales.includes(loc)) notFound()
  setRequestLocale(loc)

  const body = BODIES[loc]
  if (!body) notFound()

  // Build structured data
  const url = `${siteConfig.url}/${loc}/blog/${SLUG}`
  const post = getBlogPost(SLUG, loc)
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: body.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  })

  const breadcrumbLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Togthr', item: siteConfig.url },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteConfig.url}/${loc}/blog` },
      { '@type': 'ListItem', position: 3, name: post?.title ?? SLUG, item: url },
    ],
  })

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: breadcrumbLd }} />
      <article className="mx-auto max-w-prose px-4 py-12 text-base leading-relaxed text-zinc-300">
        <Link href={'/' + (loc === 'en' ? '' : loc + '/')} className="text-pink-400 hover:underline text-sm mb-4 inline-block">
          {'<-'} Togthr
        </Link>
        <h1 className="mt-4 text-3xl font-bold text-white">{post && post.title ? post.title : SLUG}</h1>
        <p className="mt-2 text-sm text-zinc-500">
          {POST_DATE}
          {post && post.readingMinutes ? ' · ' + post.readingMinutes + ' min read' : ''}
        </p>
        <p className="text-lg mt-6">{body.intro}</p>
        {body.sections.map((s, i) => (
          <div key={i}>
            <h2 className="mt-8 text-2xl font-semibold text-zinc-100">{s.h}</h2>
            <p className="mt-3">{s.p}</p>
          </div>
        ))}
        <p className="mt-8 text-pink-400">
          {body.cta} <Link href={'/' + (loc === 'en' ? '' : loc + '/')} className="underline">Try Togthr free {'->'}</Link>
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
              <Link href={withUtm(l.href, SLUG)} className="text-pink-400 hover:underline">{l.label} {'->'}</Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  )
}
