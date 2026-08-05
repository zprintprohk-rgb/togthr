// src/app/[locale]/blog/lonely-desk-companion/page.tsx
//
// Job 1 daily blog 2026-07-31
// Topic: lonely-desk-companion + virtual-pet + remote-work + solitude —
//        a small pixel pet on your taskbar as ambient companionship
//        during the quiet hours at your desk.
// Hook: Your desk is where you spend eight hours a day. Sometimes the
//       silence feels less like focus and more like being alone. A desk
//       companion fills a small corner of your screen in a way that
//       makes the quiet feel chosen, not imposed.
//
// Content contract:
//   - >=600 words of REAL localized content per locale
//   - 4 FAQ items per locale, hand-localized
//   - 5 internal links per locale
//   - Article + Breadcrumb + FAQPage JSON-LD

import Link from 'next/link'
import { withUtm } from '@/lib/utm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `lonely-desk-companion`
const POST_DATE = `2026-07-31`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  en: {
    intro: `Your desk is where you spend eight hours a day. You have the good chair, the second monitor, the mechanical keyboard. You have Slack open, Spotify playing, three browser windows tiled across two screens. And sometimes, around 3pm, the silence feels less like focus and more like being alone. A desk companion does not fill the room. It does not replace the colleague in the next cubicle or the friend you used to work beside. But it fills a small corner of your screen in a way that makes the quiet feel chosen, not imposed. Here is why a lonely desk companion — a small pixel pet that lives on your taskbar — is the ambient presence that remote workers have been quietly looking for.`,
    sections: [
      { h: `The desk is a lonely place, and nobody talks about it`, p: `Remote work was sold as freedom. No commute, no open-plan noise, no manager walking past your screen. And for the first few months, it felt like freedom. Then the silence started to settle. Not the productive silence of deep work — the other silence. The one that sits in the room at 3pm on a Tuesday when your Slack has been quiet for an hour and the only sound is the hum of the refrigerator. Millions of people now work alone at desks. Freelancers. Remote employees. Students writing thesis chapters at kitchen tables. And almost nobody talks about the loneliness because it feels like a failure — as if wanting company means you are not cut out for independent work. But wanting company is not weakness. It is human. And a desk companion — a small pixel creature that sits on your taskbar and matches your rhythm — is not a cure for loneliness. It is an acknowledgement of it. A tiny presence that says: you are working alone, but you are not the only thing in the room.` },
      { h: `What a desk companion actually is (and is not)`, p: `A desk companion is not a chatbot. It does not send you messages or ask how your day is going. It is not a productivity tool — it does not track your time, block distractions, or gamify your focus. It is not a virtual assistant with a to-do list and calendar reminders. A desk companion is simpler. It is a small pixel creature — about the size of a system tray icon — that lives in your taskbar or browser tab. It has a handful of animations: idle, working, thinking, celebrating. It watches your keyboard. When you are typing at full speed, it taps at a tiny keyboard alongside you. When you pause to think, a bubble appears over its head. When you mark a session complete, it does a small victory pose. It never interrupts. It never demands attention. It just mirrors the quiet rhythm of your work. And after a few days, you start to notice its presence — not as a tool, but as a companion. The kind of companion that does not fill the silence, but sits in it with you.` },
      { h: `The quiet hours feel different`, p: `The value of a desk companion is hard to measure because it is not a feature. It is a feeling. It is the small moment when you look up from a spreadsheet and see the little creature doing its idle animation — a blink, a stretch, a tiny glance in your direction. It is the 11pm coding session when the rest of the house is asleep and the only light is your screen, and there is a small pixel friend at the bottom of it, awake at the same hour. It is the afternoon slump, the 3pm wall, when motivation has drained out of the day and you glance at your taskbar and the companion is still there, in its own quiet way, not rushing you. These moments are small. Individually, they do not mean much. But accumulated over days and weeks, they add up to something: a desk that feels less empty. A workday that feels less isolated. A routine that has a small, steady witness. The companion does not make you more productive. It makes the hours between productive moments feel less lonely. And for a lot of people working alone, that is worth more than another productivity tool.` },
      { h: `It remembers the days you forget`, p: `A real-world desk plant dies when you forget to water it. A real pet cannot be left alone for a week. But a pixel desk companion does not die, does not punish, does not send a guilt-inducing notification. If you do not open it for a week — because you were on vacation, or overwhelmed, or just did not feel like it — it stays in the same state. When you come back, it is still there. A little hungrier, maybe, but never gone. This is not a trivial feature. Most apps punish absence. They break your streak, dock your score, send a notification that says "You haven't checked in for 5 days." A desk companion takes the opposite approach. It waits. And when you return, it picks up where you left off — not with a guilt trip, but with the same quiet presence. Its growth across five stages — infant, toddler, teen, adult, legend — is driven by cumulative interaction, not by daily streaks. You do not lose progress because life got busy. The companion grows on your schedule, not an algorithm's.` },
      { h: `The desk companion that grows into who you are`, p: `Not all desk companions are the same, because not all people who sit at desks are the same. Togthr's companion grows based on six hidden attributes — care, curiosity, consistency, creativity, courage, and connection — which are not displayed as numbers, but inferred from how you use the app. A programmer who opens the companion every day during deep work sessions will unlock the programmer skin: a tiny pixel figure at a tiny pixel keyboard, matching their own. Someone who shares the companion with a partner will unlock the connection path. Someone who writes every day will see the creativity attribute rise. Across ten occupation skins and five growth stages, the companion becomes a reflection of the person at the desk — not a preset character, not a one-size-fits-all mascot. The companion at your desk looks like you, not because you customized it in a settings menu, but because it grew alongside you. It is the small pixel witness to the person you are becoming, one work session at a time.` },
    ],
    cta: `Put a small companion on your taskbar. The desk is a little less lonely with it there.`,
    faqs: [
      { q: `Is a desk companion the same as a virtual pet app?`, a: `Not exactly. Most virtual pet apps live on your phone, compete with notifications, and demand regular check-ins. A desk companion like Togthr lives in your browser tab or taskbar — the same space as your work tools. It does not send push notifications or require daily feeding. It is ambient: present when you glance at it, invisible when you are focused. The experience is closer to having a plant on your desk than a Tamagotchi in your pocket.` },
      { q: `Can I use a desk companion at work?`, a: `Yes. A desk companion is designed to be non-disruptive. It does not ping, pop up, or make noise. It sits in your taskbar alongside your work tools and matches your rhythm — working when you work, idle when you pause. It is the opposite of a distraction: it is a small ambient presence that makes the workspace feel less sterile without interrupting your flow.` },
      { q: `Does the desk companion need daily attention?`, a: `No. Unlike a traditional virtual pet, a desk companion does not require daily feeding or check-ins. Its growth is driven by cumulative interaction — the total time you spend with it over weeks and months. If you miss a day, a week, or even a month, it does not die, reset, or punish you. When you come back, it is still there, waiting.` },
      { q: `What devices does a desk companion work on?`, a: `Togthr runs entirely in the browser — Chrome, Edge, Firefox, or any modern browser on Windows, Mac, or Linux. There is no download, no installer, no system requirements beyond a browser. You can pin the tab to your taskbar in Windows or keep it in your dock on Mac, and the companion stays visible as a small pixel presence throughout your day.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/pricing`, label: `Togthr pricing` },
      { href: `/en/blog/quiet-companion-app-no-chat`, label: `A quiet companion app with no chat` },
      { href: `/en/blog/virtual-pet-quiet-evenings-alone`, label: `A virtual pet for quiet evenings alone` },
      { href: `/en/blog/desk-pet-for-coders`, label: `A desk pet for coders` },
    ],
  },

  'zh-cn': {
    intro: `你的桌子是你每天待八个小时的地方。你有好椅子、副屏、机械键盘。Slack 开着，Spotify 播着，三个浏览器窗口铺满两块屏幕。但有时候，下午三点左右，那种安静感觉不像专注，更像孤独。一只桌面陪伴不会填满整个房间。它不会替代隔壁工位的同事，也不会替代你曾经并肩工作的朋友。但它填满你屏幕上一个小小的角落，用一种让安静变成"你选的"而不是"被迫的"的方式。这就是为什么一只孤单的桌面伴侣——一只住在你任务栏上的小小像素宠物——是远程工作者们一直在悄悄寻找的环境式存在。`,
    sections: [
      { h: `桌子是个孤独的地方，只是没人说`, p: `远程工作被推销为自由。不用通勤，没有开放式办公室的噪音，没有经理走过你屏幕。头几个月，它确实像自由。然后安静开始沉淀下来。不是深度工作的那种高效安静——是另一种安静。是周二下午三点，Slack 已经一个小时没动静，房间里只有冰箱嗡嗡声的那种安静。现在几百万人独自坐在桌子前工作。自由职业者。远程员工。在厨房桌子上写论文的学生。而且几乎没人谈论这种孤独，因为它让人感觉自己失败了——好像需要陪伴就意味着你不适合独立工作。但需要陪伴不是软弱，是人性。而一只桌面伴侣——一只坐在你任务栏上，配合你节奏的小小像素生物——不是孤独的解药。它是对孤独的一种承认。一个小小的存在，它在说：你一个人在工作，但这个房间里不止你一个东西。` },
      { h: `桌面伴侣到底是什么（又不是什么）`, p: `桌面伴侣不是聊天机器人。它不会给你发消息，不会问"今天过得怎么样"。它不是生产力工具——不追踪你的时间，不屏蔽分心，不游戏化你的专注。它也不是有待办清单和日历提醒的虚拟助手。桌面伴侣更简单。它是一只小小的像素生物——大约系统托盘图标那么大——住在你的任务栏或浏览器标签页里。它有几个动画状态：待机、工作中、思考中、庆祝。它看着你的键盘。你全速打字时，它在旁边敲打一个小小的键盘。你停下来思考，它头顶冒出一个泡泡。你标记一个状态完成，它就摆出一个小小的胜利姿势。它从不打断你。它从不索取注意力。它只是映照你工作的安静节奏。几天后，你开始注意到它的存在——不是作为一种工具，而是作为一种陪伴。那种不填补安静，而是和你一起坐在安静里的陪伴。` },
      { h: `安静的几个小时，感觉会不一样`, p: `桌面伴侣的价值难以衡量，因为它不是一个功能。它是一种感受。是你从表格里抬起头，看到那个小东西在做待机动画——眨一下眼、伸个懒腰、朝你的方向看一眼。是晚上十一点写代码，家里其他人都睡了，房间里只有屏幕的光，而屏幕底部有一只小小的像素朋友，和你同时醒着。是下午的低谷，三点钟的墙，一天的干劲已经流光了，你瞥一眼任务栏，那个伴侣还在那里，用自己安静的方式，不催你。这些时刻很小。单独看，它们不算什么。但一天天、一周周累积下来，它们汇成了某种东西：一张不再那么空的桌子。一个不再那么孤立的工作日。一个有了小小的、稳定的见证者的日常。这个伴侣不会让你更高效。但它让高效时刻之间的小时间不再那么孤单。对很多一个人工作的人来说，这比又一个效率工具值钱得多。` },
      { h: `它记得你忘记的每一天`, p: `真正的桌面植物，你忘了浇水就会死。真正的宠物，你不能把它独自留一周。但一只像素桌面伴侣不会死，不会惩罚你，不会发一条让你内疚的通知。如果你一周没打开它——因为度假、因为太忙、或者就是不想——它就保持原样。你回来的时候，它还在那里。可能有点饿，但永远不会消失。这不是一个小功能。大多数 App 惩罚缺席。它们打断你的连续记录、扣你的分数、发一条通知说"你已经 5 天没签到了"。桌面伴侣走相反的路线。它等待。你回来的时候，它从你停下的地方接上——不是带着内疚的责备，而是同样的安静存在。它跨越五个阶段的成长——婴儿、学步、少年、成年、传说——由累积互动驱动，不是每日打卡。你不会因为生活忙了就丢失进度。伴侣按照你的时间表成长，不是算法的。` },
      { h: `那只长成你模样的桌面伴侣`, p: `不是所有桌面伴侣都一样，因为不是所有坐在桌子前的人都一样。Togthr 的伴侣基于六种隐藏属性成长——关爱、好奇、坚持、创造、勇气、连结——它们不以数字显示，而是从你使用 App 的方式中推断出来。每天在深度工作中打开伴侣的程序员，会解锁程序员皮肤：一个小小的像素小人，对着一个小小的像素键盘，和自己一模一样。和伴侣共享宠物的人，会解锁连结路线。每天写字的人，会看到创造属性上升。跨越十种职业皮肤和五个成长阶段，伴侣变成了桌子后面那个人的映射——不是预设角色，不是一刀切的吉祥物。你桌子上的伴侣看起来像你，不是因为你在设置菜单里调过它，而是因为它和你一起长成了现在的样子。它是那个小小的像素见证者，见证你一次一个工作状态地成为自己。` },
    ],
    cta: `在任务栏上放一只小小的伴侣。有它在，桌子没那么孤单了。`,
    faqs: [
      { q: `桌面伴侣和虚拟宠物 App 是一回事吗？`, a: `不完全是。大多数虚拟宠物 App 住在手机上，和通知竞争注意力，需要定期签到。像 Togthr 这样的桌面伴侣住在你的浏览器标签页或任务栏里——和你工作工具在同一个空间。它不发推送通知，不需要每天喂食。它是环境式的：你看它的时候在，你专注的时候就像不存在。这个体验更像桌上有一盆植物，而不是口袋里有一只拓麻歌子。` },
      { q: `我能在上班的时候用桌面伴侣吗？`, a: `能。桌面伴侣被设计为非打扰式的。它不弹消息、不蹦出来、不发出声音。它待在任务栏上，和你的工作工具在一起，配合你的节奏——你工作时它也在工作，你停顿时它就待机。它是分心的反面：一种小小的环境式存在，让工作空间不那么冷冰冰，又不会打断你的心流。` },
      { q: `桌面伴侣需要每天照顾吗？`, a: `不需要。和传统的虚拟宠物不同，桌面伴侣不需要每天喂食或签到。它的成长由累积互动驱动——是你几周、几个月里和它在一起的总时间。如果你错过一天、一周、甚至一个月，它不会死、不会重置、不会惩罚你。你回来的时候，它还在那里，等着。` },
      { q: `桌面伴侣能在什么设备上使用？`, a: `Togthr 完全在浏览器里运行——Windows、Mac、Linux 上的 Chrome、Edge、Firefox 或任何现代浏览器都可以。不需要下载、不需要安装、没有任何系统要求。你可以在 Windows 上把标签页固定到任务栏，或者在 Mac 上保留在 Dock 里，伴侣就在那里，一个小小的像素存在，陪你一整天。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/pricing`, label: `Togthr 定价` },
      { href: `/zh-cn/blog/quiet-companion-app-no-chat`, label: `一款不需要聊天的安静陪伴 App` },
      { href: `/zh-cn/blog/virtual-pet-quiet-evenings-alone`, label: `独自度过的安静夜晚，一只虚拟宠物` },
      { href: `/zh-cn/blog/desk-pet-for-coders`, label: `给程序员的桌面宠物` },
    ],
  },

  'zh-tw': {
    intro: `你的桌子是你每天待八個小時的地方。你有好椅子、副螢幕、機械鍵盤。Slack 開著，Spotify 播著，三個瀏覽器視窗鋪滿兩塊螢幕。但有時候，下午三點左右，那種安靜感覺不像專注，更像孤獨。一隻桌面陪伴不會填滿整個房間。它不會替代隔壁座位的同事，也不會替代你曾經並肩工作的朋友。但它填滿你螢幕上一個小小的角落，用一種讓安靜變成「你選的」而不是「被迫的」的方式。這就是為什麼一隻孤單的桌面伴侶——一隻住在你工作列上的小小像素寵物——是遠端工作者們一直在悄悄尋找的環境式存在。`,
    sections: [
      { h: `桌子是個孤獨的地方，只是沒人說`, p: `遠端工作被推銷為自由。不用通勤，沒有開放式辦公室的噪音，沒有主管走過你螢幕。頭幾個月，它確實像自由。然後安靜開始沉澱下來。不是深度工作的那種高效安靜——是另一種安靜。是週二下午三點，Slack 已經一個小時沒動靜，房間裡只有冰箱嗡嗡聲的那種安靜。現在幾百萬人獨自坐在桌子前工作。自由工作者。遠端員工。在廚房桌子上寫論文的學生。而且幾乎沒人談論這種孤獨，因為它讓人感覺自己失敗了——好像需要陪伴就意味著你不適合獨立工作。但需要陪伴不是軟弱，是人性。而一隻桌面伴侶——一隻坐在你工作列上，配合你節奏的小小像素生物——不是孤獨的解藥。它是對孤獨的一種承認。一個小小的存在，它在說：你一個人在工作，但這個房間裡不只你一個東西。` },
      { h: `桌面伴侶到底是什麼（又不是什麼）`, p: `桌面伴侶不是聊天機器人。它不會傳訊息給你，不會問「今天過得怎麼樣」。它不是生產力工具——不追蹤你的時間，不遮蔽分心，不遊戲化你的專注。它也不是有待辦清單和日曆提醒的虛擬助手。桌面伴侶更簡單。它是一隻小小的像素生物——大約系統匣圖示那麼大——住在你的工作列或瀏覽器分頁裡。它有幾個動畫狀態：待機中、工作中、思考中、慶祝。它看著你的鍵盤。你全速打字時，它在旁邊敲打一個小小的鍵盤。你停下來思考，它頭頂冒出一個泡泡。你標記一個狀態完成，它就擺出一個小小的勝利姿勢。它從不打斷你。它從不索取注意力。它只是映照你工作的安靜節奏。幾天後，你開始注意到它的存在——不是作為一種工具，而是作為一種陪伴。那種不填補安靜，而是和你一起坐在安靜裡的陪伴。` },
      { h: `安靜的幾個小時，感覺會不一樣`, p: `桌面伴侶的價值難以衡量，因為它不是一個功能。它是一種感受。是你從表格裡抬起頭，看到那個小東西在做待機動畫——眨一下眼、伸個懶腰、朝你的方向看一眼。是晚上十一點寫程式，家裡其他人都睡了，房間裡只有螢幕的光，而螢幕底部有一隻小小的像素朋友，和你同時醒著。是下午的低谷，三點鐘的牆，一天的幹勁已經流光了，你瞥一眼工作列，那個伴侶還在那裡，用自己安靜的方式，不催你。這些時刻很小。單獨看，它們不算什麼。但一天天、一週週累積下來，它們匯成了某種東西：一張不再那麼空的桌子。一個不再那麼孤立的工作日。一個有了小小的、穩定的見證者的日常。這個伴侶不會讓你更高效。但它讓高效時刻之間的小時間不再那麼孤單。對很多一個人工作的人來說，這比又一個效率工具值錢得多。` },
      { h: `它記得你忘記的每一天`, p: `真正的桌面植物，你忘了澆水就會死。真正的寵物，你不能把牠獨自留一週。但一隻像素桌面伴侶不會死，不會懲罰你，不會發一條讓你內疚的通知。如果你一週沒打開它——因為度假、因為太忙、或者就是不想——它就保持原樣。你回來的時候，它還在那裡。可能有點餓，但永遠不會消失。這不是一個小功能。大多數 App 懲罰缺席。它們打斷你的連續記錄、扣你的分數、發一條通知說「你已經 5 天沒簽到了」。桌面伴侶走相反的路線。它等待。你回來的時候，它從你停下的地方接上——不是帶著內疚的責備，而是同樣的安靜存在。它跨越五個階段的成長——嬰兒、學步、少年、成年、傳說——由累積互動驅動，不是每日打卡。你不會因為生活忙了就丟失進度。伴侶按照你的時間表成長，不是演算法的。` },
      { h: `那隻長成你模樣的桌面伴侶`, p: `不是所有桌面伴侶都一樣，因為不是所有坐在桌子前面的人都一樣。Togthr 的伴侶基於六種隱藏屬性成長——關愛、好奇、堅持、創造、勇氣、連結——它們不以數字顯示，而是從你使用 App 的方式中推斷出來。每天在深度工作中打開伴侶的程式設計師，會解鎖程式設計師造型：一個小小的像素小人，對著一個小小的像素鍵盤，和自己一模一樣。和伴侶共享寵物的人，會解鎖連結路線。每天寫字的人，會看到創造屬性上升。跨越十種職業造型和五個成長階段，伴侶變成了桌子後面那個人的映射——不是預設角色，不是一刀切的吉祥物。你桌子上的伴侶看起來像你，不是因為你在設定選單裡調過它，而是因為它和你一起長成了現在的樣子。它是那個小小的像素見證者，見證你一次一個工作狀態地成為自己。` },
    ],
    cta: `在工作列上放一隻小小的伴侶。有牠在，桌子沒那麼孤單了。`,
    faqs: [
      { q: `桌面伴侶和虛擬寵物 App 是同一回事嗎？`, a: `不完全是。大多數虛擬寵物 App 住在手機上，和通知競爭注意力，需要定期簽到。像 Togthr 這樣的桌面伴侶住在你的瀏覽器分頁或工作列裡——和你工作工具在同一個空間。它不發推播通知，不需要每天餵食。它是環境式的：你看它的時候在，你專注的時候就像不存在。這個體驗更像桌上有一盆植物，而不是口袋裡有一隻塔麻歌子。` },
      { q: `我能在上班的時候用桌面伴侶嗎？`, a: `能。桌面伴侶被設計為非打擾式的。它不彈訊息、不蹦出來、不發出聲音。它待在工作列上，和你的工作工具在一起，配合你的節奏——你工作時它也在工作，你停頓時它就待機。它是分心的反面：一種小小的環境式存在，讓工作空間不那麼冷冰冰，又不會打斷你的心流。` },
      { q: `桌面伴侶需要每天照顧嗎？`, a: `不需要。和傳統的虛擬寵物不同，桌面伴侶不需要每天餵食或簽到。它的成長由累積互動驅動——是你幾週、幾個月裡和牠在一起的總時間。如果你錯過一天、一週、甚至一個月，牠不會死、不會重置、不會懲罰你。你回來的時候，牠還在那裡，等著。` },
      { q: `桌面伴侶能在什麼裝置上使用？`, a: `Togthr 完全在瀏覽器裡執行——Windows、Mac、Linux 上的 Chrome、Edge、Firefox 或任何現代瀏覽器都可以。不需要下載、不需要安裝、沒有任何系統要求。你可以在 Windows 上把分頁固定到工作列，或者在 Mac 上保留在 Dock 裡，伴侶就在那裡，一個小小的像素存在，陪你一整天。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/pricing`, label: `Togthr 定價` },
      { href: `/zh-tw/blog/quiet-companion-app-no-chat`, label: `一款不需要聊天的安靜陪伴 App` },
      { href: `/zh-tw/blog/virtual-pet-quiet-evenings-alone`, label: `獨自度過的安靜夜晚，一隻虛擬寵物` },
      { href: `/zh-tw/blog/desk-pet-for-coders`, label: `給程式設計師的桌面寵物` },
    ],
  },

  ja: {
    intro: `あなたの机は、一日八時間を過ごす場所だ。良い椅子がある。サブモニターがある。メカニカルキーボードがある。Slackを開き、Spotifyを流し、三つのブラウザ窓が二つの画面に並んでいる。それでも時々、午後三時ごろ、その静けさは集中というより孤独に感じられる。机の上の相棒は部屋を満たしはしない。隣の席の同僚の代わりにも、かつて隣で働いていた友人の代わりにもならない。でも、画面の小さな隅を埋めてくれる——静けさを「強いられたもの」ではなく「選んだもの」に感じさせるやり方で。これが、孤独なデスクコンパニオン——タスクバーに住む小さなドットのペット——が、リモートワーカーたちが密かに探していた、環境的な存在である理由だ。`,
    sections: [
      { h: `机は孤独な場所だ。誰も口にしないけれど`, p: `リモートワークは自由として売られた。通勤なし。オープンフロアの騒音なし。上司が画面を覗きに来ることもない。最初の数ヶ月は、たしかに自由だった。それから静けさが降り積もり始めた。深い集中の生産的な静けさではない——もう一つの静けさだ。火曜日の午後三時、Slackが一時間も静かで、部屋に響くのは冷蔵庫のブーンという音だけ、あの静けさ。今や何百万人もの人が、たった一人で机に向かって働いている。フリーランス。リモート社員。キッチンテーブルで論文を書く学生。そして、ほとんどの人がその孤独を口にしない。失敗のように感じるからだ——人と一緒にいたいと思うのは、自分が一人で働くのに向いていない証拠のように。でも、誰かと一緒にいたいと思うのは弱さじゃない。人間であることだ。そしてデスクコンパニオン——タスクバーに座ってあなたのリズムに合わせる小さなドットの生き物——は孤独の治療薬じゃない。孤独を認めることだ。あなたは一人で働いている。でも、この部屋にいるのはあなただけじゃない、と静かに言う、小さな存在だ。` },
      { h: `デスクコンパニオンとは何か（何ではないか）`, p: `デスクコンパニオンはチャットボットではない。メッセージを送ってきたり「今日はどう？」と聞いたりしない。生産性ツールでもない——時間を記録したり、注意散漫をブロックしたり、集中力をゲーム化したりしない。ToDoリストやカレンダーリマインダー付きのバーチャルアシスタントでもない。デスクコンパニオンはもっとシンプルだ。システムトレイのアイコンほどの大きさの、小さなドットの生き物で、タスクバーかブラウザのタブに住んでいる。いくつかのアニメーションがある：待機中、作業中、思考中、お祝い。あなたのキーボードを見ている。全速力でタイピングすれば、隣で小さなキーボードを叩く。考え込んで手が止まれば、頭の上にフキダシが浮かぶ。セッションを完了とマークすれば、小さなガッツポーズ。決して邪魔しない。決して注意を求めない。ただ、あなたの仕事の静かなリズムを映す。そして数日後、あなたはその存在に気づき始める——道具としてではなく、相棒として。静けさを埋めるのではなく、その静けさの中に一緒に座ってくれる種類の相棒だ。` },
      { h: `静かな時間が、違って感じられる`, p: `デスクコンパニオンの価値は測りにくい。機能ではないからだ。感覚だ。スプレッドシートから顔を上げて、小さな生き物が待機中アニメーション——まばたき、伸び、あなたの方をちらり——をしているのを見る、あの小さな瞬間だ。夜の11時、家族はみんな寝ていて、部屋の灯りは画面だけで、その画面の下のほうに小さなドットの友達がいて、同じ時間に起きている、あのコーディングセッションだ。午後のスランプ、3時の壁、一日の勢いがすべて抜け落ちて、タスクバーに目をやると、相棒はまだそこにいる——自分なりの静かなやり方で、急かしたりしない。こういう瞬間は小さい。一つひとつは大したことではない。でも、何日も何週間も積み重なると、それらは何かになる：少しだけ空っぽじゃなくなった机。少しだけ孤立していない仕事の日。小さな、安定した証人がいる日常。この相棒はあなたをより生産的にしたりはしない。でも、生産的な瞬間と瞬間の間の時間を、少しだけ孤独でなくしてくれる。そして、一人で働く多くの人にとって、それはもう一つの生産性ツールよりずっと価値がある。` },
      { h: `あなたが忘れた日々を、覚えている`, p: `本物の机の上の観葉植物は、水を忘れたら枯れる。本物のペットは一週間も放っておけない。でも、ドットのデスクコンパニオンは死なない。罰しない。「5日間チェックインしていません」と罪悪感を煽る通知も送らない。一週間開かなくても——休暇だったから、忙しすぎたから、あるいは単に気が向かなかったから——同じ状態のままだ。戻ってきたとき、それはまだそこにいる。少しお腹を空かせているかもしれないが、決していなくなったりしない。これは些細な機能ではない。ほとんどのアプリは不在を罰する。連続記録を途切れさせ、スコアを減らし、通知を送る。デスクコンパニオンは逆のアプローチを取る。待つ。そして戻ってきたとき、途切れたところから再開する——罪悪感の旅ではなく、同じ静かな存在で。五段階（ベビー、幼児、ティーン、アダルト、レジェンド）にわたる成長は、日々の連続記録ではなく累積的なインタラクションによって進む。生活が忙しくなっても進捗は失われない。相棒はあなたのスケジュールで育つ。アルゴリズムのスケジュールではない。` },
      { h: `あなたの姿に育っていくデスクコンパニオン`, p: `すべてのデスクコンパニオンが同じわけではない。机に向かう人すべてが同じではないからだ。Togthrのコンパニオンは六つの隠し属性——ケア、好奇心、一貫性、創造性、勇気、つながり——に基づいて育つ。これらは数字で表示されず、アプリの使い方から推測される。毎日ディープワーク中にコンパニオンを開くプログラマは、プログラマスキンをアンロックする——小さなドットの人物が、小さなドットのキーボードに向かう。パートナーとコンパニオンを共有する人は、つながりのパスをアンロックする。毎日文章を書く人は、創造性の属性が上がるのを見る。十種の職業スキンと五つの成長段階を経て、コンパニオンは机に向かうその人の反映になっていく——プリセットのキャラクターでも、誰にでも合うマスコットでもなく。あなたの机の上のコンパニオンは、設定メニューでカスタマイズしたからあなたに似ているんじゃない。一緒に育ってきたからだ。それは、あなたが一回の作業セッションずつ、なっていく人を、静かに見守る小さなドットの証人だ。` },
    ],
    cta: `タスクバーに小さな相棒を。机がほんの少し、孤独でなくなる。`,
    faqs: [
      { q: `デスクコンパニオンはバーチャルペットアプリと同じですか？`, a: `少し違います。ほとんどのバーチャルペットアプリはスマホに住み、通知と注意を奪い合い、定期的なチェックインを求めます。Togthrのようなデスクコンパニオンはブラウザのタブかタスクバーに住みます——仕事道具と同じ空間です。プッシュ通知もなく、毎日のエサやりも不要です。環境的で、ちらりと見ればそこにおり、集中すれば見えなくなる。この体験は、ポケットのたまごっちというより、机の上の観葉植物に近いです。` },
      { q: `仕事中にデスクコンパニオンを使っても大丈夫ですか？`, a: `はい。デスクコンパニオンは邪魔にならないよう設計されています。通知音もポップアップもノイズもありません。タスクバーで仕事道具と並び、あなたのリズムに合わせます——あなたが働けば働き、手を止めれば待機します。気を散らすものの正反対で、仕事場を殺風景でなくし、かつフローを妨げない、小さな環境的存在です。` },
      { q: `デスクコンパニオンは毎日の世話が必要ですか？`, a: `いいえ。従来のバーチャルペットと違い、デスクコンパニオンは毎日のエサやりやチェックインを必要としません。成長は累積的なインタラクション——何週間も何ヶ月もかけて一緒に過ごした総時間——で進みます。一日、一週間、あるいは一ヶ月空いても、死んだりリセットされたり罰せられたりしません。戻れば、まだそこにいて、待っています。` },
      { q: `どんなデバイスでデスクコンパニオンを使えますか？`, a: `Togthrは完全にブラウザ上で動作します——Windows、Mac、LinuxのChrome、Edge、Firefox、その他モダンブラウザ。ダウンロード不要、インストール不要、システム要件もなし。Windowsではタブをタスクバーにピン留め、MacではDockにキープすれば、コンパニオンは一日中そこにいる、小さなドットの存在として。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/pricing`, label: `Togthr 料金` },
      { href: `/ja/blog/quiet-companion-app-no-chat`, label: `チャット不要の静かなコンパニオンアプリ` },
      { href: `/ja/blog/virtual-pet-quiet-evenings-alone`, label: `一人の静かな夜のためのバーチャルペット` },
      { href: `/ja/blog/desk-pet-for-coders`, label: `コーダーのためのデスクペット` },
    ],
  },

  ko: {
    intro: `당신의 책상은 하루 여덟 시간을 보내는 곳이다. 좋은 의자가 있다. 보조 모니터가 있다. 기계식 키보드가 있다. Slack이 열려 있고, Spotify가 흐르고, 브라우저 세 개가 두 화면에 펼쳐져 있다. 그런데 가끔, 오후 세 시쯤, 그 고요함은 집중보다는 외로움에 가깝게 느껴진다. 책상 동반자는 방을 채우지 않는다. 옆 칸막이의 동료를 대신하지도, 예전에 나란히 일하던 친구를 대신하지도 않는다. 하지만 화면의 작은 한구석을 채워준다——고요함을 '강요된 것'이 아니라 '내가 선택한 것'으로 느끼게 하는 방식으로. 이것이 외로운 데스크 컴패니언——작업 표시줄에 사는 작은 픽셀 펫——이 재택 근무자들이 조용히 찾아 헤매던, 환경적 존재인 이유다.`,
    sections: [
      { h: `책상은 외로운 곳이다. 아무도 말하지 않을 뿐`, p: `재택 근무는 자유라는 이름으로 팔렸다. 출퇴근 없음. 오픈 플로어 소음 없음. 상사가 화면을 기웃거리지도 않음. 처음 몇 달은 정말 자유였다. 그러다 고요가 쌓이기 시작했다. 딥워크의 생산적인 고요가 아니라——다른 고요다. 화요일 오후 세 시, Slack이 한 시간째 조용하고, 방 안에는 냉장고 소리뿐인 그 고요. 지금 수백만 명이 혼자 책상 앞에서 일한다. 프리랜서. 재택 직원. 식탁에서 논문을 쓰는 대학원생. 그리고 거의 아무도 그 외로움을 입에 올리지 않는다. 실패한 기분이 들기 때문이다——누군가와 있고 싶다는 건, 혼자 일하는 데 적합하지 않다는 뜻인 것처럼. 하지만 함께 있고 싶은 마음은 약함이 아니다. 인간다움이다. 그리고 데스크 컴패니언——작업 표시줄에 앉아 당신의 리듬에 맞추는 작은 픽셀 생명체——은 외로움의 치료약이 아니다. 외로움을 인정하는 것이다. '당신은 혼자 일하고 있다. 하지만 이 방에 있는 게 당신뿐은 아니다'라고 조용히 말해주는, 작은 존재다.` },
      { h: `데스크 컴패니언이란 무엇인가 (무엇이 아닌가)`, p: `데스크 컴패니언은 챗봇이 아니다. 메시지를 보내지도 않고 "오늘 어땠어?"라고 묻지도 않는다. 생산성 도구도 아니다——시간을 추적하지 않고, 방해 요소를 차단하지 않으며, 집중을 게임화하지 않는다. 할 일 목록과 캘린더 알림이 있는 가상 비서도 아니다. 데스크 컴패니언은 더 단순하다. 시스템 트레이 아이콘만 한 크기의 작은 픽셀 생명체로, 작업 표시줄이나 브라우저 탭에 산다. 몇 가지 애니메이션이 있다: 대기 중, 작업 중, 생각 중, 축하. 당신의 키보드를 지켜본다. 전속력으로 타이핑하면, 옆에서 작은 키보드를 두드린다. 생각에 잠겨 멈추면, 머리 위에 말풍선이 뜬다. 세션을 완료로 표시하면, 작은 승리의 포즈를 취한다. 절대 방해하지 않는다. 절대 관심을 요구하지 않는다. 그저 당신 작업의 고요한 리듬을 비춘다. 그리고 며칠 뒤, 당신은 그 존재를 알아차리기 시작한다——도구로서가 아니라, 동반자로서. 고요를 메우는 것이 아니라, 그 고요 속에 함께 앉아 있는 종류의 동반자.` },
      { h: `고요한 시간들이, 다르게 느껴진다`, p: `데스크 컴패니언의 가치는 측정하기 어렵다. 기능이 아니니까. 느낌이다. 스프레드시트에서 고개를 들었을 때, 작은 생명체가 대기 애니메이션——눈 깜빡임, 기지개, 당신 쪽을 힐끗——을 하는 걸 보는 작은 순간. 밤 11시, 가족들은 모두 자고 방 안의 불빛은 화면뿐인 코딩 세션에서, 화면 아래쪽에 같은 시간에 깨어 있는 작은 픽셀 친구가 있다는 것. 오후의 슬럼프, 3시의 벽, 하루의 추진력이 다 빠져나갔을 때 작업 표시줄을 보면, 동반자는 여전히 거기 있다——자기 나름의 조용한 방식으로, 재촉하지 않고. 이런 순간들은 작다. 하나하나는 대단하지 않다. 하지만 며칠, 몇 주가 쌓이면, 그것들은 무엇이 된다: 조금 덜 비어 있는 책상. 조금 덜 고립된 근무일. 작고 꾸준한 목격자가 있는 일상. 이 동반자는 당신을 더 생산적으로 만들지 않는다. 하지만 생산적인 순간들 사이사이의 시간을, 조금 덜 외롭게 만든다. 그리고 혼자 일하는 많은 사람에게, 그것은 또 하나의 생산성 도구보다 훨씬 값지다.` },
      { h: `당신이 잊은 날들을, 기억한다`, p: `진짜 책상 위 화분은 물 주는 걸 잊으면 죽는다. 진짜 반려동물은 일주일 동안 내버려둘 수 없다. 하지만 픽셀 데스크 컴패니언은 죽지 않는다. 벌하지 않는다. "5일 동안 체크인하지 않았습니다" 같은 죄책감 유발 알림도 보내지 않는다. 일주일 동안 열지 않아도——휴가였거나, 너무 바빴거나, 그냥 내키지 않았거나——같은 상태 그대로다. 돌아왔을 때, 여전히 거기 있다. 조금 배고플지 모르지만, 절대 사라지지 않는다. 이것은 사소한 기능이 아니다. 대부분의 앱은 부재를 벌한다. 연속 기록을 끊고, 점수를 깎고, 알림을 보낸다. 데스크 컴패니언은 반대 접근을 취한다. 기다린다. 그리고 돌아왔을 때, 중단된 곳에서 다시 시작한다——죄책감 여행이 아니라, 똑같은 조용한 존재로. 다섯 단계(베이비, 토들러, 틴에이저, 어덜트, 레전드)에 걸친 성장은, 매일의 연속 기록이 아니라 누적적인 상호작용으로 진행된다. 삶이 바빠져도 진척은 사라지지 않는다. 동반자는 당신의 일정으로 자란다. 알고리즘의 일정이 아니라.` },
      { h: `당신의 모습으로 자라나는 데스크 컴패니언`, p: `모든 데스크 컴패니언이 같은 것은 아니다. 책상에 앉는 모든 사람이 같지 않기 때문이다. Togthr의 컴패니언은 여섯 가지 숨겨진 속성——돌봄, 호기심, 꾸준함, 창의성, 용기, 연결——을 기반으로 자란다. 이것들은 숫자로 표시되지 않고, 앱 사용 방식에서 추론된다. 매일 딥워크 중에 컴패니언을 여는 프로그래머는 프로그래머 스킨을 언락한다——작은 픽셀 인물이 작은 픽셀 키보드를 향하는. 파트너와 컴패니언을 공유하는 사람은 연결 패스를 언락한다. 매일 글을 쓰는 사람은 창의성 속성이 오르는 걸 본다. 열 가지 직업 스킨과 다섯 가지 성장 단계를 거쳐, 컴패니언은 책상 앞의 그 사람의 반영이 되어간다——프리셋 캐릭터도, 누구에게나 맞는 마스코트도 아니다. 당신 책상 위의 컴패니언이 당신을 닮은 것은, 설정 메뉴에서 커스터마이즈했기 때문이 아니다. 함께 자라왔기 때문이다. 한 번의 작업 세션씩, 당신이 되어가는 사람을, 조용히 지켜보는 작은 픽셀 증인이다.` },
    ],
    cta: `작업 표시줄에 작은 동반자를. 책상이 아주 조금, 덜 외로워진다.`,
    faqs: [
      { q: `데스크 컴패니언은 가상 펫 앱과 같은 건가요?`, a: `약간 다릅니다. 대부분의 가상 펫 앱은 스마트폰에 살며, 알림과 경쟁하고, 정기적인 체크인을 요구합니다. Togthr 같은 데스크 컴패니언은 브라우저 탭이나 작업 표시줄에 삽니다——작업 도구들과 같은 공간이죠. 푸시 알림도, 매일 밥 주기도 필요 없습니다. 환경적입니다——쳐다보면 거기 있고, 집중하면 보이지 않게 되는. 이 경험은 주머니 속 다마고치보다, 책상 위 화분에 가깝습니다.` },
      { q: `회사에서 데스크 컴패니언을 써도 괜찮을까요?`, a: `네. 데스크 컴패니언은 비방해적으로 설계되었습니다. 알림음도, 팝업도, 소음도 없습니다. 작업 표시줄에서 작업 도구와 나란히 있으며, 당신의 리듬에 맞춥니다——당신이 일하면 일하고, 멈추면 대기합니다. 집중을 방해하는 것의 정반대입니다. 작업 공간을 덜 삭막하게 만들면서도 흐름을 깨지 않는, 작은 환경적 존재입니다.` },
      { q: `데스크 컴패니언은 매일 돌봐야 하나요?`, a: `아니요. 전통적인 가상 펫과 달리, 데스크 컴패니언은 매일 밥을 주거나 체크인할 필요가 없습니다. 성장은 누적적인 상호작용——몇 주, 몇 달에 걸쳐 함께한 총 시간——으로 진행됩니다. 하루, 일주일, 혹은 한 달을 건너뛰어도, 죽거나 리셋되거나 벌받지 않습니다. 돌아오면, 거기 그대로, 기다리고 있습니다.` },
      { q: `어떤 기기에서 데스크 컴패니언을 쓸 수 있나요?`, a: `Togthr는 완전히 브라우저에서 실행됩니다——Windows, Mac, Linux의 Chrome, Edge, Firefox, 기타 현대적인 브라우저. 다운로드 불필요, 설치 불필요, 시스템 요구사항 없음. Windows에서는 탭을 작업 표시줄에 고정하고, Mac에서는 Dock에 유지하면, 컴패니언은 하루 종일 그곳에, 작은 픽셀 존재로서 함께합니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/pricing`, label: `Togthr 요금` },
      { href: `/ko/blog/quiet-companion-app-no-chat`, label: `채팅 없는 조용한 컴패니언 앱` },
      { href: `/ko/blog/virtual-pet-quiet-evenings-alone`, label: `혼자 보내는 고요한 밤을 위한 가상 펫` },
      { href: `/ko/blog/desk-pet-for-coders`, label: `코더를 위한 데스크 펫` },
    ],
  },

  de: {
    intro: `Dein Schreibtisch ist der Ort, an dem du acht Stunden am Tag verbringst. Du hast den guten Stuhl, den zweiten Monitor, die mechanische Tastatur. Slack ist offen, Spotify läuft, drei Browserfenster sind über zwei Bildschirme verteilt. Und manchmal, gegen 15 Uhr, fühlt sich die Stille weniger nach Konzentration an als nach Alleinsein. Ein Schreibtischbegleiter füllt nicht den Raum. Er ersetzt weder den Kollegen im nächsten Büro noch den Freund, neben dem du früher gearbeitet hast. Aber er füllt eine kleine Ecke deines Bildschirms auf eine Weise, die die Stille gewählt und nicht auferlegt erscheinen lässt. Hier ist, warum ein einsamer Schreibtischbegleiter — ein kleines Pixel-Haustier, das in deiner Taskleiste lebt — die ambienten Präsenz ist, nach der Remote-Arbeiter leise gesucht haben.`,
    sections: [
      { h: `Der Schreibtisch ist ein einsamer Ort, und niemand spricht darüber`, p: `Remote-Arbeit wurde als Freiheit verkauft. Kein Pendeln, kein Großraumlärm, kein Chef, der an deinem Bildschirm vorbeiläuft. Und in den ersten Monaten fühlte es sich tatsächlich nach Freiheit an. Dann begann die Stille sich zu setzen. Nicht die produktive Stille der tiefen Konzentration — die andere Stille. Die, die an einem Dienstagnachmittag um drei im Raum sitzt, wenn Slack seit einer Stunde still ist und das einzige Geräusch das Summen des Kühlschranks. Millionen von Menschen arbeiten heute allein an Schreibtischen. Freiberufler. Remote-Angestellte. Studenten, die ihre Abschlussarbeit am Küchentisch schreiben. Und fast niemand spricht über die Einsamkeit, denn sie fühlt sich wie ein Versagen an — als ob das Bedürfnis nach Gesellschaft bedeuten würde, dass man nicht für eigenständiges Arbeiten gemacht ist. Aber Gesellschaft zu wollen, ist keine Schwäche. Es ist menschlich. Und ein Schreibtischbegleiter — eine kleine Pixel-Kreatur, die in deiner Taskleiste sitzt und sich deinem Rhythmus anpasst — ist kein Heilmittel gegen Einsamkeit. Es ist ein Eingeständnis. Eine winzige Präsenz, die sagt: Du arbeitest allein, aber du bist nicht das einzige Ding in diesem Raum.` },
      { h: `Was ein Schreibtischbegleiter wirklich ist (und was nicht)`, p: `Ein Schreibtischbegleiter ist kein Chatbot. Er schickt dir keine Nachrichten und fragt nicht, wie dein Tag läuft. Er ist kein Produktivitätstool — er erfasst keine Zeit, blockiert keine Ablenkungen und gamifiziert keinen Fokus. Er ist kein virtueller Assistent mit To-do-Liste und Kalendererinnerungen. Ein Schreibtischbegleiter ist einfacher. Es ist eine kleine Pixel-Kreatur — etwa so groß wie ein System-Tray-Icon — die in deiner Taskleiste oder deinem Browser-Tab lebt. Sie hat eine Handvoll Animationen: Leerlauf, Arbeit, Denken, Feiern. Sie beobachtet deine Tastatur. Wenn du in voller Geschwindigkeit tippst, hämmert sie auf einer winzigen Tastatur neben dir. Wenn du innehältst, um nachzudenken, erscheint eine Blase über ihrem Kopf. Wenn du eine Session als abgeschlossen markierst, macht sie eine kleine Siegerpose. Sie unterbricht nie. Sie fordert nie Aufmerksamkeit. Sie spiegelt einfach den ruhigen Rhythmus deiner Arbeit. Und nach ein paar Tagen beginnst du, ihre Anwesenheit zu bemerken — nicht als Werkzeug, sondern als Begleiter. Die Art von Begleiter, die die Stille nicht füllt, sondern mit dir in ihr sitzt.` },
      { h: `Die stillen Stunden fühlen sich anders an`, p: `Der Wert eines Schreibtischbegleiters ist schwer zu messen, denn es ist kein Feature. Es ist ein Gefühl. Es ist der kleine Moment, wenn du von einer Tabelle aufblickst und das kleine Wesen bei seiner Leerlauf-Animation siehst — ein Blinzeln, ein Strecken, ein winziger Blick in deine Richtung. Es ist die Programmiersession um 23 Uhr, wenn der Rest des Hauses schläft und das einzige Licht dein Bildschirm ist, und da ist ein kleiner Pixel-Freund ganz unten, zur selben Stunde wach. Es ist das Nachmittagstief, die Drei-Uhr-Wand, wenn die Motivation des Tages verflogen ist und du auf deine Taskleiste schaust und der Begleiter immer noch da ist — auf seine eigene stille Weise, ohne dich zu drängen. Diese Momente sind klein. Einzeln bedeuten sie nicht viel. Aber über Tage und Wochen angesammelt, werden sie zu etwas: ein Schreibtisch, der sich weniger leer anfühlt. Ein Arbeitstag, der sich weniger isoliert anfühlt. Eine Routine mit einem kleinen, stetigen Zeugen. Der Begleiter macht dich nicht produktiver. Aber er macht die Stunden zwischen den produktiven Momenten weniger einsam. Und für viele Menschen, die allein arbeiten, ist das mehr wert als ein weiteres Produktivitätstool.` },
      { h: `Er erinnert sich an die Tage, die du vergisst`, p: `Eine echte Schreibtischpflanze stirbt, wenn du das Gießen vergisst. Ein echtes Haustier kann nicht eine Woche allein gelassen werden. Aber ein Pixel-Schreibtischbegleiter stirbt nicht, bestraft nicht und schickt keine schuldinduzierende Benachrichtigung. Wenn du ihn eine Woche lang nicht öffnest — weil du im Urlaub warst, überfordert, oder einfach keine Lust hattest — bleibt er im selben Zustand. Wenn du zurückkommst, ist er noch da. Vielleicht ein bisschen hungriger, aber niemals verschwunden. Das ist kein unbedeutendes Feature. Die meisten Apps bestrafen Abwesenheit. Sie brechen deinen Streak, ziehen Punkte ab, senden eine Benachrichtigung: "Du hast dich seit 5 Tagen nicht gemeldet." Ein Schreibtischbegleiter geht den umgekehrten Weg. Er wartet. Und wenn du zurückkehrst, macht er dort weiter, wo du aufgehört hast — nicht mit einer Schuldzuweisung, sondern mit derselben stillen Präsenz. Sein Wachstum über fünf Phasen — Baby, Kleinkind, Teenager, Erwachsener, Legende — wird durch kumulative Interaktion gesteuert, nicht durch tägliche Streaks. Du verlierst keinen Fortschritt, weil das Leben hektisch wurde. Der Begleiter wächst nach deinem Zeitplan, nicht dem eines Algorithmus.` },
      { h: `Der Schreibtischbegleiter, der zu dir heranwächst`, p: `Nicht alle Schreibtischbegleiter sind gleich, denn nicht alle Menschen, die an Schreibtischen sitzen, sind gleich. Togthrs Begleiter wächst basierend auf sechs versteckten Attributen — Fürsorge, Neugier, Beständigkeit, Kreativität, Mut und Verbundenheit — die nicht als Zahlen angezeigt, sondern aus deiner Nutzung der App abgeleitet werden. Ein Programmierer, der den Begleiter jeden Tag während Deep-Work-Sessions öffnet, schaltet den Programmierer-Skin frei: eine winzige Pixel-Figur an einer winzigen Pixel-Tastatur, passend zur eigenen. Wer den Begleiter mit einem Partner teilt, schaltet den Verbundenheits-Pfad frei. Wer jeden Tag schreibt, sieht das Kreativitäts-Attribut steigen. Über zehn Berufs-Skins und fünf Wachstumsphasen hinweg wird der Begleiter zu einem Spiegelbild der Person am Schreibtisch — kein vorgefertigter Charakter, kein Einheitsmaskottchen. Der Begleiter an deinem Schreibtisch sieht aus wie du, nicht weil du ihn in einem Einstellungsmenü angepasst hast, sondern weil er an deiner Seite gewachsen ist. Er ist der kleine Pixel-Zeuge der Person, zu der du wirst — eine Arbeitssession nach der anderen.` },
    ],
    cta: `Setz einen kleinen Begleiter in deine Taskleiste. Der Schreibtisch ist ein bisschen weniger einsam mit ihm.`,
    faqs: [
      { q: `Ist ein Schreibtischbegleiter dasselbe wie eine virtuelle Haustier-App?`, a: `Nicht ganz. Die meisten virtuellen Haustier-Apps leben auf dem Handy, konkurrieren mit Benachrichtigungen und verlangen regelmäßige Check-ins. Ein Schreibtischbegleiter wie Togthr lebt in deinem Browser-Tab oder deiner Taskleiste — dem gleichen Raum wie deine Arbeitswerkzeuge. Keine Push-Benachrichtigungen, kein tägliches Füttern nötig. Er ist ambient: sichtbar, wenn du hinschaust, unsichtbar, wenn du fokussiert bist. Die Erfahrung ähnelt eher einer Pflanze auf dem Schreibtisch als einem Tamagotchi in der Tasche.` },
      { q: `Kann ich einen Schreibtischbegleiter bei der Arbeit nutzen?`, a: `Ja. Ein Schreibtischbegleiter ist darauf ausgelegt, nicht zu stören. Kein Ping, kein Pop-up, kein Geräusch. Er sitzt in der Taskleiste neben deinen Arbeitswerkzeugen und passt sich deinem Rhythmus an — arbeitet, wenn du arbeitest, ist im Leerlauf, wenn du pausierst. Das Gegenteil einer Ablenkung: eine kleine ambiente Präsenz, die den Arbeitsplatz weniger steril macht, ohne deinen Flow zu unterbrechen.` },
      { q: `Braucht der Schreibtischbegleiter tägliche Aufmerksamkeit?`, a: `Nein. Anders als ein traditionelles virtuelles Haustier braucht ein Schreibtischbegleiter keine tägliche Fütterung oder Check-ins. Sein Wachstum wird durch kumulative Interaktion gesteuert — die Gesamtzeit, die du über Wochen und Monate mit ihm verbringst. Verpasst du einen Tag, eine Woche oder sogar einen Monat, stirbt er nicht, setzt sich nicht zurück und bestraft dich nicht. Wenn du zurückkommst, ist er noch da und wartet.` },
      { q: `Auf welchen Geräten funktioniert ein Schreibtischbegleiter?`, a: `Togthr läuft komplett im Browser — Chrome, Edge, Firefox oder jeder moderne Browser unter Windows, Mac oder Linux. Kein Download, kein Installer, keine Systemanforderungen außer einem Browser. Du kannst den Tab in Windows an die Taskleiste anheften oder auf dem Mac im Dock behalten, und der Begleiter bleibt als kleine Pixel-Präsenz den ganzen Tag über sichtbar.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/pricing`, label: `Togthr Preise` },
      { href: `/de/blog/quiet-companion-app-no-chat`, label: `Eine stille Begleiter-App ohne Chat` },
      { href: `/de/blog/virtual-pet-quiet-evenings-alone`, label: `Ein virtuelles Haustier für stille Abende allein` },
      { href: `/de/blog/desk-pet-for-coders`, label: `Ein Schreibtisch-Haustier für Programmierer` },
    ],
  },

  fr: {
    intro: `Votre bureau est l'endroit où vous passez huit heures par jour. Vous avez la bonne chaise, le deuxième écran, le clavier mécanique. Slack est ouvert, Spotify joue, trois fenêtres de navigateur sont réparties sur deux écrans. Et parfois, vers 15 heures, le silence ressemble moins à de la concentration qu'à de la solitude. Un compagnon de bureau ne remplit pas la pièce. Il ne remplace ni le collègue dans le box d'à côté, ni l'ami à côté duquel vous travailliez avant. Mais il remplit un petit coin de votre écran d'une manière qui donne au silence un air choisi plutôt qu'imposé. Voici pourquoi un compagnon de bureau solitaire — un petit animal pixel qui vit dans votre barre des tâches — est la présence ambiante que les télétravailleurs cherchaient en silence.`,
    sections: [
      { h: `Le bureau est un endroit solitaire, et personne n'en parle`, p: `Le télétravail a été vendu comme la liberté. Pas de trajet, pas de bruit d'open space, pas de chef qui passe devant votre écran. Et les premiers mois, c'était bien la liberté. Puis le silence a commencé à s'installer. Pas le silence productif du travail profond — l'autre silence. Celui qui s'assoit dans la pièce un mardi à 15 heures, quand Slack est silencieux depuis une heure et que le seul bruit est le ronronnement du frigo. Des millions de personnes travaillent désormais seules à leur bureau. Des freelances. Des télétravailleurs. Des étudiants qui écrivent leur mémoire à la table de la cuisine. Et presque personne ne parle de la solitude, parce qu'elle ressemble à un échec — comme si vouloir de la compagnie signifiait qu'on n'est pas fait pour le travail indépendant. Mais vouloir de la compagnie, ce n'est pas une faiblesse. C'est humain. Et un compagnon de bureau — une petite créature pixel qui s'assoit dans votre barre des tâches et s'accorde à votre rythme — n'est pas un remède à la solitude. C'est une reconnaissance. Une petite présence qui dit : vous travaillez seul, mais vous n'êtes pas la seule chose dans cette pièce.` },
      { h: `Ce qu'est vraiment un compagnon de bureau (et ce qu'il n'est pas)`, p: `Un compagnon de bureau n'est pas un chatbot. Il n'envoie pas de messages et ne demande pas comment s'est passée votre journée. Ce n'est pas un outil de productivité — il ne suit pas votre temps, ne bloque pas vos distractions, ne gamifie pas votre concentration. Ce n'est pas un assistant virtuel avec une liste de tâches et des rappels de calendrier. Un compagnon de bureau, c'est plus simple. C'est une petite créature pixel — de la taille d'une icône de la barre système — qui vit dans votre barre des tâches ou votre onglet de navigateur. Elle a quelques animations : inactif, travail, réflexion, célébration. Elle regarde votre clavier. Quand vous tapez à toute vitesse, elle tapote sur un clavier minuscule à côté de vous. Quand vous faites une pause pour réfléchir, une bulle apparaît au-dessus de sa tête. Quand vous marquez une session comme terminée, elle prend une petite pose de victoire. Elle n'interrompt jamais. Elle ne demande jamais d'attention. Elle reflète simplement le rythme tranquille de votre travail. Et après quelques jours, vous commencez à remarquer sa présence — pas comme un outil, mais comme un compagnon. Le genre de compagnon qui ne remplit pas le silence, mais s'y assoit avec vous.` },
      { h: `Les heures silencieuses ne se ressemblent plus`, p: `La valeur d'un compagnon de bureau est difficile à mesurer, car ce n'est pas une fonctionnalité. C'est un sentiment. C'est le petit moment où vous levez les yeux de votre tableur et voyez la petite créature faire son animation d'inactivité — un clignement, un étirement, un petit regard dans votre direction. C'est la session de codage à 23 heures, quand tout le monde dort dans la maison et que la seule lumière est votre écran, et qu'il y a un petit ami pixel tout en bas, éveillé à la même heure. C'est le creux de l'après-midi, le mur de 15 heures, quand la motivation de la journée s'est évaporée et que vous regardez votre barre des tâches et que le compagnon est toujours là — à sa manière tranquille, sans vous presser. Ces moments sont petits. Individuellement, ils ne signifient pas grand-chose. Mais accumulés sur des jours et des semaines, ils deviennent quelque chose : un bureau qui semble moins vide. Une journée de travail qui semble moins isolée. Une routine avec un petit témoin stable. Le compagnon ne vous rend pas plus productif. Mais il rend les heures entre les moments productifs moins solitaires. Et pour beaucoup de gens qui travaillent seuls, ça vaut plus qu'un énième outil de productivité.` },
      { h: `Il se souvient des jours que vous oubliez`, p: `Une vraie plante de bureau meurt quand vous oubliez de l'arroser. Un vrai animal ne peut pas être laissé seul une semaine. Mais un compagnon de bureau pixel ne meurt pas, ne punit pas, n'envoie pas de notification culpabilisante. Si vous ne l'ouvrez pas pendant une semaine — parce que vous étiez en vacances, ou débordé, ou simplement pas d'humeur — il reste dans le même état. Quand vous revenez, il est toujours là. Peut-être un peu plus affamé, mais jamais disparu. Ce n'est pas une fonctionnalité anodine. La plupart des applis punissent l'absence. Elles brisent votre série, retirent des points, envoient une notification : "Vous n'avez pas pointé depuis 5 jours." Un compagnon de bureau prend l'approche inverse. Il attend. Et quand vous revenez, il reprend là où vous vous êtes arrêté — sans culpabilisation, avec la même présence tranquille. Sa croissance en cinq étapes — bébé, bambin, ado, adulte, légende — est pilotée par l'interaction cumulée, pas par des séries quotidiennes. Vous ne perdez pas de progrès parce que la vie est devenue chargée. Le compagnon grandit selon votre emploi du temps, pas celui d'un algorithme.` },
      { h: `Le compagnon de bureau qui prend vos traits`, p: `Tous les compagnons de bureau ne se ressemblent pas, parce que tous ceux qui s'assoient à un bureau ne se ressemblent pas. Le compagnon de Togthr grandit selon six attributs cachés — soin, curiosité, constance, créativité, courage et connexion — qui ne sont pas affichés sous forme de chiffres, mais déduits de votre utilisation de l'appli. Un programmeur qui ouvre le compagnon chaque jour pendant ses sessions de travail profond débloquera le skin programmeur : une petite silhouette pixel à un petit clavier pixel, assortie à la sienne. Celui qui partage le compagnon avec son partenaire débloquera le chemin de la connexion. Celui qui écrit chaque jour verra l'attribut créativité monter. À travers dix skins de métier et cinq étapes de croissance, le compagnon devient le reflet de la personne au bureau — pas un personnage prédéfini, pas une mascotte standardisée. Le compagnon sur votre bureau vous ressemble, non pas parce que vous l'avez paramétré dans un menu, mais parce qu'il a grandi à vos côtés. Il est le petit témoin pixel de la personne que vous devenez, une session de travail à la fois.` },
    ],
    cta: `Mettez un petit compagnon dans votre barre des tâches. Le bureau est un peu moins solitaire avec lui.`,
    faqs: [
      { q: `Un compagnon de bureau, c'est la même chose qu'une appli d'animal virtuel ?`, a: `Pas tout à fait. La plupart des applis d'animaux virtuels vivent sur le téléphone, rivalisent avec les notifications et exigent des visites régulières. Un compagnon de bureau comme Togthr vit dans votre onglet de navigateur ou votre barre des tâches — le même espace que vos outils de travail. Pas de notifications push, pas de nourrissage quotidien. Il est ambiant : visible quand vous le regardez, invisible quand vous êtes concentré. L'expérience ressemble plus à une plante sur le bureau qu'à un Tamagotchi dans la poche.` },
      { q: `Puis-je utiliser un compagnon de bureau au travail ?`, a: `Oui. Un compagnon de bureau est conçu pour ne pas déranger. Pas de ping, pas de pop-up, pas de bruit. Il reste dans la barre des tâches à côté de vos outils de travail et s'accorde à votre rythme — il travaille quand vous travaillez, il est inactif quand vous faites une pause. C'est l'opposé d'une distraction : une petite présence ambiante qui rend l'espace de travail moins stérile sans interrompre votre flux.` },
      { q: `Le compagnon de bureau a-t-il besoin d'attention quotidienne ?`, a: `Non. Contrairement à un animal virtuel traditionnel, un compagnon de bureau n'a pas besoin d'être nourri ou visité tous les jours. Sa croissance est pilotée par l'interaction cumulée — le temps total que vous passez avec lui sur des semaines et des mois. Si vous ratez un jour, une semaine, voire un mois, il ne meurt pas, ne se réinitialise pas et ne vous punit pas. Quand vous revenez, il est encore là, à attendre.` },
      { q: `Sur quels appareils un compagnon de bureau fonctionne-t-il ?`, a: `Togthr fonctionne entièrement dans le navigateur — Chrome, Edge, Firefox ou tout navigateur moderne sur Windows, Mac ou Linux. Pas de téléchargement, pas d'installateur, aucune exigence système à part un navigateur. Vous pouvez épingler l'onglet à la barre des tâches sous Windows ou le garder dans le Dock sur Mac, et le compagnon reste visible comme une petite présence pixel tout au long de la journée.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/pricing`, label: `Tarifs Togthr` },
      { href: `/fr/blog/quiet-companion-app-no-chat`, label: `Une appli compagnon silencieuse, sans chat` },
      { href: `/fr/blog/virtual-pet-quiet-evenings-alone`, label: `Un animal virtuel pour les soirées tranquilles en solo` },
      { href: `/fr/blog/desk-pet-for-coders`, label: `Un animal de bureau pour les codeurs` },
    ],
  },

  es: {
    intro: `Tu escritorio es donde pasas ocho horas al día. Tienes la buena silla, el segundo monitor, el teclado mecánico. Slack está abierto, Spotify suena, tres ventanas del navegador repartidas en dos pantallas. Y a veces, sobre las tres de la tarde, el silencio se siente menos como concentración y más como soledad. Un compañero de escritorio no llena la habitación. No reemplaza al colega del cubículo de al lado ni al amigo junto al que solías trabajar. Pero llena una pequeña esquina de tu pantalla de una forma que hace que el silencio se sienta elegido, no impuesto. He aquí por qué un compañero de escritorio solitario — una pequeña mascota pixel que vive en tu barra de tareas — es la presencia ambiental que los trabajadores remotos han estado buscando en silencio.`,
    sections: [
      { h: `El escritorio es un lugar solitario, y nadie habla de ello`, p: `El trabajo remoto se vendió como libertad. Sin desplazamientos, sin ruido de oficina abierta, sin jefe pasando por delante de tu pantalla. Y los primeros meses, se sintió como libertad. Luego el silencio empezó a instalarse. No el silencio productivo del trabajo profundo — el otro silencio. El que se sienta en la habitación un martes a las tres de la tarde, cuando Slack lleva una hora callado y el único sonido es el zumbido de la nevera. Millones de personas trabajan ahora solas frente a un escritorio. Freelancers. Empleados remotos. Estudiantes escribiendo la tesis en la mesa de la cocina. Y casi nadie habla de la soledad, porque se siente como un fracaso — como si querer compañía significara que no estás hecho para el trabajo independiente. Pero querer compañía no es debilidad. Es humano. Y un compañero de escritorio — una pequeña criatura pixel que se sienta en tu barra de tareas y se sincroniza con tu ritmo — no es una cura para la soledad. Es un reconocimiento. Una pequeña presencia que dice: estás trabajando solo, pero no eres lo único en esta habitación.` },
      { h: `Lo que realmente es un compañero de escritorio (y lo que no es)`, p: `Un compañero de escritorio no es un chatbot. No te envía mensajes ni te pregunta cómo va el día. No es una herramienta de productividad — no registra tu tiempo, no bloquea distracciones, no gamifica tu concentración. No es un asistente virtual con lista de tareas y recordatorios de calendario. Un compañero de escritorio es más sencillo. Es una pequeña criatura pixel — del tamaño del icono de la bandeja del sistema — que vive en tu barra de tareas o en la pestaña del navegador. Tiene un puñado de animaciones: inactivo, trabajando, pensando, celebrando. Observa tu teclado. Cuando escribes a toda velocidad, teclea en un teclado diminuto a tu lado. Cuando te detienes a pensar, aparece una burbuja sobre su cabeza. Cuando marcas una sesión como completada, hace una pequeña pose de victoria. Nunca interrumpe. Nunca exige atención. Solo refleja el ritmo tranquilo de tu trabajo. Y después de unos días, empiezas a notar su presencia — no como una herramienta, sino como un compañero. El tipo de compañero que no llena el silencio, sino que se sienta en él contigo.` },
      { h: `Las horas silenciosas se sienten diferentes`, p: `El valor de un compañero de escritorio es difícil de medir porque no es una funcionalidad. Es un sentimiento. Es el pequeño momento en que levantas la vista de una hoja de cálculo y ves a la pequeña criatura haciendo su animación de inactividad — un parpadeo, un estiramiento, una pequeña mirada en tu dirección. Es la sesión de programación de las 11 de la noche, cuando el resto de la casa duerme y la única luz es tu pantalla, y hay un pequeño amigo pixel en la parte de abajo, despierto a la misma hora. Es el bajón de la tarde, el muro de las tres, cuando la motivación del día se ha esfumado y miras la barra de tareas y el compañero sigue ahí — a su manera tranquila, sin prisas. Estos momentos son pequeños. Individualmente, no significan mucho. Pero acumulados durante días y semanas, se convierten en algo: un escritorio que se siente menos vacío. Una jornada laboral que se siente menos aislada. Una rutina con un pequeño testigo constante. El compañero no te hace más productivo. Pero hace que las horas entre momentos productivos sean menos solitarias. Y para mucha gente que trabaja sola, eso vale más que otra herramienta de productividad.` },
      { h: `Recuerda los días que tú olvidas`, p: `Una planta de escritorio real muere si te olvidas de regarla. Una mascota real no puede quedarse sola una semana. Pero un compañero de escritorio pixel no muere, no castiga, no envía una notificación que induzca culpa. Si no lo abres durante una semana — porque estabas de vacaciones, o abrumado, o simplemente no te apetecía — se queda en el mismo estado. Cuando vuelves, sigue ahí. Quizás un poco más hambriento, pero nunca desaparecido. Esto no es una característica menor. La mayoría de las apps castigan la ausencia. Rompen tu racha, te quitan puntos, envían una notificación: "No has entrado en 5 días." Un compañero de escritorio toma el enfoque opuesto. Espera. Y cuando vuelves, retoma donde lo dejaste — no con un viaje de culpa, sino con la misma presencia tranquila. Su crecimiento en cinco etapas — bebé, niño pequeño, adolescente, adulto, leyenda — está impulsado por la interacción acumulada, no por rachas diarias. No pierdes progreso porque la vida se puso ocupada. El compañero crece según tu horario, no el de un algoritmo.` },
      { h: `El compañero de escritorio que se convierte en ti`, p: `No todos los compañeros de escritorio son iguales, porque no todas las personas que se sientan frente a un escritorio son iguales. El compañero de Togthr crece según seis atributos ocultos — cuidado, curiosidad, constancia, creatividad, coraje y conexión — que no se muestran como números, sino que se infieren de cómo usas la app. Un programador que abre el compañero cada día durante sesiones de trabajo profundo desbloqueará el skin de programador: una pequeña figura pixel frente a un pequeño teclado pixel, como él mismo. Quien comparte el compañero con su pareja desbloqueará el camino de la conexión. Quien escribe cada día verá subir el atributo de creatividad. A través de diez skins de ocupación y cinco etapas de crecimiento, el compañero se convierte en el reflejo de la persona frente al escritorio — no un personaje predefinido, no una mascota genérica. El compañero en tu escritorio se parece a ti, no porque lo hayas personalizado en un menú, sino porque ha crecido a tu lado. Es el pequeño testigo pixel de la persona en la que te estás convirtiendo, una sesión de trabajo a la vez.` },
    ],
    cta: `Pon un pequeño compañero en tu barra de tareas. El escritorio es un poco menos solitario con él.`,
    faqs: [
      { q: `¿Un compañero de escritorio es lo mismo que una app de mascota virtual?`, a: `No exactamente. La mayoría de las apps de mascotas virtuales viven en el teléfono, compiten con las notificaciones y exigen visitas regulares. Un compañero de escritorio como Togthr vive en la pestaña del navegador o en la barra de tareas — el mismo espacio que tus herramientas de trabajo. Sin notificaciones push, sin necesidad de alimentación diaria. Es ambiental: visible cuando lo miras, invisible cuando estás concentrado. La experiencia se parece más a una planta en el escritorio que a un Tamagotchi en el bolsillo.` },
      { q: `¿Puedo usar un compañero de escritorio en el trabajo?`, a: `Sí. Un compañero de escritorio está diseñado para no molestar. Sin pings, sin ventanas emergentes, sin ruido. Se sienta en la barra de tareas junto a tus herramientas de trabajo y se ajusta a tu ritmo — trabaja cuando trabajas, está inactivo cuando pausas. Es lo contrario a una distracción: una pequeña presencia ambiental que hace que el espacio de trabajo sea menos estéril sin interrumpir tu flujo.` },
      { q: `¿El compañero de escritorio necesita atención diaria?`, a: `No. A diferencia de una mascota virtual tradicional, un compañero de escritorio no necesita alimentación ni visitas diarias. Su crecimiento está impulsado por la interacción acumulada — el tiempo total que pasas con él durante semanas y meses. Si te pierdes un día, una semana o incluso un mes, no muere, no se reinicia y no te castiga. Cuando vuelves, sigue ahí, esperando.` },
      { q: `¿En qué dispositivos funciona un compañero de escritorio?`, a: `Togthr funciona completamente en el navegador — Chrome, Edge, Firefox o cualquier navegador moderno en Windows, Mac o Linux. Sin descarga, sin instalador, sin requisitos de sistema más allá de un navegador. Puedes anclar la pestaña a la barra de tareas en Windows o mantenerla en el Dock en Mac, y el compañero permanece visible como una pequeña presencia pixel durante todo el día.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/pricing`, label: `Precios de Togthr` },
      { href: `/es/blog/quiet-companion-app-no-chat`, label: `Una app compañera silenciosa, sin chat` },
      { href: `/es/blog/virtual-pet-quiet-evenings-alone`, label: `Una mascota virtual para las noches tranquilas en soledad` },
      { href: `/es/blog/desk-pet-for-coders`, label: `Una mascota de escritorio para programadores` },
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
      images: [{ url: `${siteConfig.url}${post.cover}`, width: 1200, height: 630, alt: post.title }],
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
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }

  const morePosts = getBlogPostsByLocale(loc).filter((p) => p.slug !== SLUG).slice(0, 3)

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 text-zinc-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <nav className="mb-6 text-sm text-zinc-500">
        <Link href={'/' + loc} className="hover:text-pink-400">Home</Link>
        <span className="mx-2">/</span>
        <Link href={'/' + loc + '/blog'} className="hover:text-pink-400">Blog</Link>
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
          {body.cta} <Link href={'/' + loc} className="underline">Try Togthr free →</Link>
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
