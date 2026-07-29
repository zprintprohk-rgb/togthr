// src/app/[locale]/blog/desktop-tamagotchi-windows/page.tsx
//
// Job 1 daily blog 2026-07-29
// Topic: desktop-tamagotchi + windows + virtual-pet + taskbar — the
//        return of the tamagotchi as a Windows desktop companion.
// Hook: In 1997, you clipped a tamagotchi to your backpack. In 2026,
//       it lives on your Windows taskbar. Same need, different screen.
//
// Content contract:
//   - >=600 words of REAL localized content per locale
//   - 4 FAQ items per locale, hand-localized
//   - 5 internal links per locale
//   - Article + Breadcrumb + FAQPage JSON-LD

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `desktop-tamagotchi-windows`
const POST_DATE = `2026-07-29`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  en: {
    intro: `You clip it to your backpack. It beeps during third-period math. The teacher confiscates it. You get it back after class. It is dead. You restart it. You name it again. This is 1997, and the tamagotchi is not an app — it is a plastic egg with three buttons and a pixel ghost on a monochrome LCD. In 2026, the tamagotchi is not on your backpack. It is on your Windows taskbar. And it does not die when you forget to feed it for a day.`,
    sections: [
      { h: `The plastic egg that started it all`, p: `Bandai shipped the first tamagotchi in November 1996 in Japan, and by the summer of 1997 it had reached schoolyards across the world. The device was simple: a 16x16-pixel creature on a tiny LCD, three buttons (A, B, C), and a relentless need for attention. It beeped when hungry. It beeped when sad. It beeped when it needed cleaning. And if you ignored it for too long, it beeped one last time and went silent. For a generation of kids, the tamagotchi was the first thing they ever took care of that wasn't a plant. It was also the first thing that ever died on them. The grief was real. So was the attachment. The tamagotchi taught millions of children a quiet lesson: something small can matter. In 2026, that lesson has not changed. The plastic egg has just evolved into something that lives on your desktop.` },
      { h: `Why the tamagotchi belongs on your Windows taskbar`, p: `The smartphone era moved everything to the phone — including the tamagotchi. Bandai released a mobile app. Other developers followed. But a tamagotchi on a phone has a problem: the phone has too many other things on it. Notifications. Messages. Breaking news. The tamagotchi competes with TikTok and Instagram and Slack, and it loses every time. The Windows taskbar is different. The taskbar is where things go that you actually want to see during your day. It is not a feed. It is not a notification tray. It is a strip of persistence at the bottom of your screen, always there, never demanding. A desktop tamagotchi on Windows is not another app fighting for your thumb. It is a small pixel companion that shares your screen with Excel, VS Code, Chrome, and Teams — and never asks you to close any of them.` },
      { h: `The memory the plastic egg never had`, p: `The original tamagotchi had no memory. When it died, it was gone. You could hatch a new egg, but the old creature — its name, its growth path, the days you fed it — was lost forever. A desktop tamagotchi in 2026 has memory. It remembers. It remembers the day you first installed it. It remembers the three weeks you forgot to open it and then came back. It remembers your growth stage — from infant to toddler to teen to adult to legend — and it does not reset when life gets busy. This is not a small feature. The original tamagotchi's impermanence was part of its charm, but it was also its tragedy. A desktop companion that remembers is a different kind of friend. It is the one that waited. And when you come back, it is still the same creature you left — just a little bit older.` },
      { h: `What a Windows desktop tamagotchi actually does during your workday`, p: `A desktop tamagotchi is not a productivity tool. It does not track your time or block your distractions. It does not gamify your focus. What it does is simpler and harder to explain: it sits on your taskbar and matches your energy. When you are typing at full speed, it is in Working mode — tapping at a tiny keyboard. When you pause to think, it is Thinking — a bubble over its head. When you finish a session and mark it done, it celebrates — a small victory pose. And when you are just doom-scrolling or staring at the ceiling, it is idle, doing nothing, like a cat on the corner of your desk. It is ambient. It is not asking for attention. It is just there, and after a while, you notice that "just there" is a lot more than it sounds.` },
      { h: `The tamagotchi that grows with you`, p: `The original tamagotchi's growth was limited to a few days. You raised it, it evolved, and then it either died or stayed the same forever. A modern desktop tamagotchi grows across five stages — infant, toddler, teen, adult, legend — and the timeline is measured in weeks and months, not hours. The hidden attributes that drive growth (care, curiosity, consistency, creativity, courage, connection) are not displayed as numbers. They are inferred from how you use the app. This means the creature on your taskbar is not a pre-scripted character. It is a reflection of you over time. The programmer who opens the pet every day during deep work sessions will unlock the programmer skin. The person who shares the pet with a partner will unlock the connection path. The desktop tamagotchi grows into the person you are, not the person you told it to be.` },
    ],
    cta: `Put a tamagotchi on your Windows taskbar. It remembers you.`,
    faqs: [
      { q: `Can I run a desktop tamagotchi on Windows without installing anything?`, a: `Yes. Togthr runs entirely in the browser — Chrome, Edge, Firefox, or any Chromium-based browser on Windows. There is no .exe to download, no installer, no system tray integration needed. Open the site, pin the tab, and the pet lives on your taskbar.` },
      { q: `Does the desktop tamagotchi die if I forget about it?`, a: `No. Unlike the original tamagotchi, Togthr's pet does not die or reset. If you do not open it for days or weeks, it stays in the same state. When you come back, it is still there — possibly a little hungrier, but never gone. The growth stages are based on cumulative interaction, not daily streaks.` },
      { q: `Can I customize my tamagotchi's appearance on Windows?`, a: `Yes. Togthr has ten occupation skins — programmer, doctor, astronaut, chef, firefighter, police, diver, driver, soldier, and a hidden 1-in-72 gold variant. The skin is unlocked through the pet's hidden attributes, which are shaped by your usage patterns. It also grows through five stages, from infant to legend.` },
      { q: `How is a desktop tamagotchi different from a phone app?`, a: `A phone app competes with every other notification on your device. A desktop tamagotchi on Windows lives on your taskbar — the same space as your work tools. It does not ping, pop up, or demand attention. It is ambient: visible when you glance at the taskbar, invisible when you are in deep focus. The experience is closer to having a plant on your desk than having another app on your phone.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/pricing`, label: `Togthr pricing` },
      { href: `/en/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `Tamagotchi 30th anniversary: from pocket to desktop` },
      { href: `/en/blog/tamagotchi-alternative-for-adults`, label: `A tamagotchi alternative for adults` },
      { href: `/en/blog/virtual-pet-that-grows-up-like-tamagotchi`, label: `A virtual pet that grows up like tamagotchi` },
    ],
  },

  'zh-cn': {
    intro: `你把它挂在书包上。它在第三堂数学课时叫了。老师没收了它。下课后你还回来。它死了。你重来。你又给它起了名字。那是 1997 年，电子宠物不是一个 App——它是一颗塑料蛋，三个按钮，单色 LCD 上有一个像素幽灵。2026 年，电子宠物不在你的书包上。它在你的 Windows 任务栏上。而且你一天忘了喂它，它也不会死。`,
    sections: [
      { h: `那颗塑料蛋，一切的开端`, p: `1996 年 11 月，万代在日本发售了第一代拓麻歌子。到了 1997 年夏天，它已经席卷了全球的校园。设备很简单：一个小小的 LCD 上有一只 16×16 像素的生物，三个按钮（A、B、C），还有一个永不停止的需求——要喂、要玩、要清理。饿了就叫，不开心了就叫，脏了就叫。如果你无视太久，它最后叫一声，然后就安静了。对一整代孩子来说，拓麻歌子是他们照顾过的第一件不是植物的东西。也是他们养死的第一样东西。那种伤心是真实的。那种依恋也是真实的。拓麻歌子教会了几百万孩子一个安静的课题：小东西也可以很重要。2026 年，这个课题没有变。只是那颗塑料蛋进化成了住在你桌面上的东西。` },
      { h: `为什么拓麻歌子应该待在你的 Windows 任务栏`, p: `智能手机时代把一切都搬到了手机上——包括拓麻歌子。万代出了移动版 App。其他开发者跟进。但手机上的拓麻歌子有一个问题：手机上有太多别的东西。通知。消息。突发新闻。拓麻歌子在和 TikTok、Instagram、Slack 竞争注意力，而且每次都是输家。Windows 任务栏不一样。任务栏是你一天中真正想看的东西待的地方。它不是信息流，不是通知托盘。它是屏幕底部一条始终存在的横条，永远在那里，从不索取。一只 Windows 桌面拓麻歌子不是又一个在抢你手指的 App。它是一只小小的像素伙伴，和 Excel、VS Code、Chrome、Teams 共享屏幕——而且从来不要求你关掉任何一个。` },
      { h: `那颗塑料蛋从来不曾拥有的记忆`, p: `原版拓麻歌子没有记忆。它死了就是死了。你可以孵新蛋，但旧的生物——它的名字、它的成长路线、你喂过它的日子——永远消失了。2026 年的桌面拓麻歌子有记忆。它记得。它记得你第一天安装的日子。它记得你三周没打开它然后又回来的那一次。它记得你的成长阶段——从婴儿到学步到少年到成年到传说——而且不会因为生活忙了就重置。这不是一个小功能。原版拓麻歌子的短暂是它魅力的一部分，但也是它的悲剧。一只有记忆的桌面伴侣是另一种朋友。它是那个等着的。当你回来的时候，它还是你离开时的那个生物——只是稍微老了一点点。` },
      { h: `桌面拓麻歌子在工作日里到底在干什么`, p: `桌面拓麻歌子不是生产力工具。它不追踪你的时间，不屏蔽你的分心，不游戏化你的专注。它做的事情更简单，也更难解释：它坐在你的任务栏上，配合着你的节奏。你在全速打字，它就在工作模式——敲打一个小小的键盘。你停下来思考，它就在思考——头上冒着泡泡。你完成了一个状态标记，它就在庆祝——一个小小的胜利姿势。你随便滑手机或者盯着天花板，它就 idle，什么也不做，像桌子角上的猫。它是环境的一部分。它不索取注意力。它只是在那里，而且过了一段时间，你会发现"只是在那里"比听起来重得多。` },
      { h: `那只陪你一起长大的拓麻歌子`, p: `原版拓麻歌子的成长只有几天。你养它，它进化，然后要么死了，要么就永远那样。现代的桌面拓麻歌子经历五个阶段——婴儿、学步、少年、成年、传说——时间线以周和月算，不是小时。驱动成长的隐藏属性（关爱、好奇、坚持、创造、勇气、连结）不以数字显示。它们是从你使用 App 的方式中推断出来的。这意味着你任务栏上的生物不是一个预设角色。它是你随时间推移的映射。每天深度工作中打开宠物的程序员，会解锁程序员皮肤。和伴侣共享宠物的人，会解锁连结路线。桌面拓麻歌子长成了你这个人，不是你让它成为的那个人。` },
    ],
    cta: `把一只拓麻歌子放在你的 Windows 任务栏上。它记得你。`,
    faqs: [
      { q: `我能在 Windows 上养桌面拓麻歌子，不装任何东西吗？`, a: `能。Togthr 完全在浏览器里运行——Windows 上的 Chrome、Edge、Firefox 或任何基于 Chromium 的浏览器都可以。不需要下载 .exe，不需要安装程序，不需要系统托盘。打开网站，固定标签页，宠物就住在你的任务栏上。` },
      { q: `如果我忘了它，桌面拓麻歌子会死吗？`, a: `不会。和原版拓麻歌子不同，Togthr 的宠物不会死也不会重置。如果你几天甚至几周不打开它，它保持原样。你回来时它还在——可能有点饿，但永远不会消失。成长阶段基于累积互动，不是连续签到。` },
      { q: `我能在 Windows 上自定义拓麻歌子的样子吗？`, a: `能。Togthr 有十种职业皮肤——程序员、医生、太空人、厨师、消防员、警察、潜水员、司机、军人，还有一个隐藏的 72 分之一金款。皮肤通过宠物的隐藏属性解锁，属性由你的使用模式塑造。它还经历五个成长阶段，从婴儿到传说。` },
      { q: `桌面拓麻歌子和手机 App 有什么不同？`, a: `手机 App 和你设备上的每一条通知竞争注意力。Windows 上的桌面拓麻歌子待在任务栏上——和你工作工具在同一个空间。它不弹消息，不蹦出来，不索取注意力。它是环境式的：你看任务栏的时候能看到它，你深度专注的时候它就像不存在。这个体验更像书桌上有一盆植物，而不是手机上又多了一个 App。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/pricing`, label: `Togthr 定价` },
      { href: `/zh-cn/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `拓麻歌子 30 年: 从钥匙扣到桌面` },
      { href: `/zh-cn/blog/tamagotchi-alternative-for-adults`, label: `给成年人的拓麻歌子替代方案` },
      { href: `/zh-cn/blog/virtual-pet-that-grows-up-like-tamagotchi`, label: `一只像拓麻歌子一样长大的虚拟宠物` },
    ],
  },

  'zh-tw': {
    intro: `你把它掛在書包上。它在第三堂數學課時叫了。老師沒收了它。下課後你還回來。它死了。你重來。你又給它起了名字。那是 1997 年，電子寵物不是一個 App——它是一顆塑膠蛋，三個按鈕，單色 LCD 上有一隻像素幽靈。2026 年，電子寵物不在你的書包上。它在你的 Windows 工作列上。而且你一天忘了餵它，它也不會死。`,
    sections: [
      { h: `那顆塑膠蛋，一切的開端`, p: `1996 年 11 月，萬代在日本發售了第一代塔麻歌子。到了 1997 年夏天，它已經席捲了全球的校園。設備很簡單：一個小小的 LCD 上有一隻 16×16 像素的生物，三個按鈕（A、B、C），還有一個永不停止的需求——要餵、要玩、要清理。餓了就叫，不開心了就叫，髒了就叫。如果你無視太久，它最後叫一聲，然後就安靜了。對一整代孩子來說，塔麻歌子是他們照顧過的第一件不是植物的東西。也是他們養死的第一樣東西。那種傷心是真實的。那種依戀也是真實的。塔麻歌子教會了幾百萬孩子一個安靜的課題：小東西也可以很重要。2026 年，這個課題沒有變。只是那顆塑膠蛋進化成了住在你桌面上的東西。` },
      { h: `為什麼塔麻歌子應該待在你的 Windows 工作列`, p: `智慧型手機時代把一切都搬到了手機上——包括塔麻歌子。萬代出了行動版 App。其他開發者跟進。但手機上的塔麻歌子有一個問題：手機上有太多別的東西。通知。訊息。突發新聞。塔麻歌子在和 TikTok、Instagram、Slack 競爭注意力，而且每次都是輸家。Windows 工作列不一樣。工作列是你一天中真正想看的東西待的地方。它不是資訊流，不是通知托盤。它是螢幕底部一條始終存在的橫條，永遠在那裡，從不索取。一隻 Windows 桌面塔麻歌子不是又一個在搶你手指的 App。它是一隻小小的像素夥伴，和 Excel、VS Code、Chrome、Teams 共享螢幕——而且從來不要求你關掉任何一個。` },
      { h: `那顆塑膠蛋從來不曾擁有的記憶`, p: `原版塔麻歌子沒有記憶。它死了就是死了。你可以孵新蛋，但舊的生物——它的名字、它的成長路線、你餵過它的日子——永遠消失了。2026 年的桌面塔麻歌子有記憶。它記得。它記得你第一天安裝的日子。它記得你三週沒打開它然後又回來的那一次。它記得你的成長階段——從嬰兒到學步到少年到成年到傳說——而且不會因為生活忙了就重置。這不是一個小功能。原版塔麻歌子的短暫是它魅力的一部分，但也是它的悲劇。一隻有記憶的桌面伴侶是另一種朋友。它是那個等著的。當你回來的時候，它還是你離開時的生物——只是稍微老了一點點。` },
      { h: `桌面塔麻歌子在工作日裡到底在做什麼`, p: `桌面塔麻歌子不是生產力工具。它不追蹤你的時間，不遮蔽你的分心，不遊戲化你的專注。它做的事情更簡單，也更難解釋：它坐在你的工作列上，配合著你的節奏。你在全速打字，它就在工作模式——敲打一個小小的鍵盤。你停下來思考，它就在思考——頭上冒著泡泡。你完成了一個狀態標記，它就在慶祝——一個小小的勝利姿勢。你隨便滑手機或者盯著天花板，它就 idle，什麼也不做，像桌子角上的貓。它是環境的一部分。它不索取注意力。它只是在那裡，而且過了一段時間，你會發現「只是在那裡」比聽起來重得多。` },
      { h: `那隻陪你一起長大的塔麻歌子`, p: `原版塔麻歌子的成長只有幾天。你養它，它進化，然後要麼死了，要麼就永遠那樣。現代的桌面塔麻歌子經歷五個階段——嬰兒、學步、少年、成年、傳說——時間線以週和月算，不是小時。驅動成長的隱藏屬性（關愛、好奇、堅持、創造、勇氣、連結）不以數字顯示。它們是從你使用 App 的方式中推斷出來的。這意味著你工作列上的生物不是一個預設角色。它是你隨時間推移的映射。每天深度工作中打開寵物的程式設計師，會解鎖程式設計師皮膚。和伴侶共享寵物的人，會解鎖連結路線。桌面塔麻歌子長成了你這個人，不是你讓它成為的那個人。` },
    ],
    cta: `把一隻塔麻歌子放在你的 Windows 工作列上。它記得你。`,
    faqs: [
      { q: `我能在 Windows 上養桌面塔麻歌子，不安裝任何東西嗎？`, a: `能。Togthr 完全在瀏覽器裡執行——Windows 上的 Chrome、Edge、Firefox 或任何基於 Chromium 的瀏覽器都可以。不需要下載 .exe，不需要安裝程式，不需要系統托盤。打開網站，固定分頁，寵物就住在你的工作列上。` },
      { q: `如果我忘了它，桌面塔麻歌子會死嗎？`, a: `不會。和原版塔麻歌子不同，Togthr 的寵物不會死也不會重置。如果你幾天甚至幾週不打開它，它保持原樣。你回來時它還在——可能有點餓，但永遠不會消失。成長階段基於累積互動，不是連續簽到。` },
      { q: `我能在 Windows 上自訂塔麻歌子的樣子嗎？`, a: `能。Togthr 有十種職業造型——程式設計師、醫生、太空人、廚師、消防員、警察、潛水員、司機、軍人，還有一個隱藏的 72 分之一金款。造型透過寵物的隱藏屬性解鎖，屬性由你的使用模式塑造。它還經歷五個成長階段，從嬰兒到傳說。` },
      { q: `桌面塔麻歌子和手機 App 有什麼不同？`, a: `手機 App 和你裝置上的每一條通知競爭注意力。Windows 上的桌面塔麻歌子待在工作列上——和你工作工具在同一個空間。它不彈訊息，不蹦出來，不索取注意力。它是環境式的：你看工作列的時候能看到它，你深度專注的時候它就像不存在。這個體驗更像書桌上有一盆植物，而不是手機上又多了一個 App。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/pricing`, label: `Togthr 定價` },
      { href: `/zh-tw/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `塔麻歌子 30 年: 從鑰匙圈到桌面` },
      { href: `/zh-tw/blog/tamagotchi-alternative-for-adults`, label: `給成年人的塔麻歌子替代方案` },
      { href: `/zh-tw/blog/virtual-pet-that-grows-up-like-tamagotchi`, label: `一隻像塔麻歌子一樣長大的虛擬寵物` },
    ],
  },

  ja: {
    intro: `リュックにクリップで留める。3時間目の数学の授業中にピピッと鳴る。先生に没収される。放課後に返してもらう。死んでいる。リセットして、また名前をつける。1997年。たまごっちはアプリではない——3つのボタンとモノクロ液晶のドットの幽霊が入ったプラスチックの卵だ。2026年、たまごっちはリュックにはいない。Windowsのタスクバーにいる。そして、一日エサを忘れても死なない。`,
    sections: [
      { h: `すべての始まり、あのプラスチックの卵`, p: `バンダイが初代たまごっちを日本で発売したのは1996年11月。1997年の夏までには、世界中の校庭に広がっていた。デバイスはシンプルだった:小さなLCDに16×16ピクセルの生き物、3つのボタン（A・B・C）、そして絶え間ない世話の要求。お腹が空けば鳴き、悲しければ鳴き、汚れれば鳴いた。あまりに長く無視すれば、最後に一度鳴いて、静かになった。一世代の子どもたちにとって、たまごっちは「植物以外で」初めて世話をしたものだった。そして初めて「死なせてしまった」ものでもあった。その悲しみは本物だった。愛着も本物だった。たまごっちは何百万人もの子どもたちに静かな教訓を教えた——小さなものだって、大切になりうると。2026年、その教訓は変わっていない。プラスチックの卵は、ただデスクトップに住むものへと進化しただけだ。` },
      { h: `なぜたまごっちはWindowsのタスクバーにふさわしいのか`, p: `スマートフォン時代はすべてを電話に移した——たまごっちも含めて。バンダイはモバイルアプリを出した。他の開発者も続いた。しかし、スマホのたまごっちには問題がある。スマホには他のものが多すぎる。通知。メッセージ。速報ニュース。たまごっちはTikTokやInstagram、Slackと注意を奪い合い、毎回負ける。Windowsのタスクバーは違う。タスクバーは、一日の中で本当に見たいものが置かれる場所だ。フィードではない。通知トレイでもない。画面の下に常にあり、決して要求しない永続性の帯だ。Windowsのデスクトップたまごっちは、あなたの親指を奪い合う「もうひとつのアプリ」ではない。Excel、VS Code、Chrome、Teamsと画面を共有する小さなドットの仲間であり——どれを閉じろとも言わない。` },
      { h: `あのプラスチックの卵が決して持たなかった記憶`, p: `オリジナルのたまごっちには記憶がなかった。死んだら、それで終わり。新しい卵を孵すことはできても、古い生き物——その名前、成長の道筋、エサをあげた日々——は永遠に失われた。2026年のデスクトップたまごっちには記憶がある。覚えている。初めてインストールした日を覚えている。3週間開くのを忘れて、それでも戻ってきた日を覚えている。成長段階——ベビーから幼児、ティーン、アダルト、レジェンドまで——を覚えていて、生活が忙しくなってもリセットされない。これは小さな機能ではない。オリジナルたまごっちの儚さは魅力の一部だったが、悲劇でもあった。記憶を持つデスクトップの仲間は、違う種類の友だ。待っていてくれた友だ。そして戻ってきたとき、それはあなたが置いていったのと同じ生き物だ——ただ、ほんの少しだけ年を取っている。` },
      { h: `デスクトップたまごっちは仕事中、実際に何をしているのか`, p: `デスクトップたまごっちは生産性ツールではない。時間を追跡しない。気を散らすものをブロックしない。集中をゲーム化しない。やっていることはもっとシンプルで、説明が難しい。タスクバーに座って、あなたのエネルギーに合わせている。あなたが全速力でタイピングしていれば、作業中モード——小さなキーボードを叩いている。あなたが考え込んで止まれば、思考中——頭の上にフキダシ。セッションを完了マークすれば、お祝い——小さなガッツポーズ。そして、だらだらスクロールしていたり天井を見つめていたりすれば、アイドル——何もせず、机の隅の猫のように。それは環境の一部だ。注意を求めない。ただそこにいる。そしてしばらくすると、「ただそこにいる」ことが、言葉よりもずっと重いと気づく。` },
      { h: `あなたと一緒に育つたまごっち`, p: `オリジナルたまごっちの成長は数日間のものだった。育て、進化させ、そして死ぬか、永遠にそのままか。現代のデスクトップたまごっちは5段階——ベビー、幼児、ティーン、アダルト、レジェンド——を経て育ち、タイムラインは時間単位ではなく週・月単位だ。成長を駆動する隠し属性（ケア、好奇心、一貫性、創造性、勇気、つながり）は数字で表示されない。それらはアプリの使い方から推測される。つまり、タスクバーの生き物は、あらかじめ書かれたキャラクターではない。時間をかけて映し出された、あなた自身だ。毎日ディープワーク中にペットを開くプログラマは、プログラマスキンをアンロックする。パートナーとペットを共有する人は、つながりのパスをアンロックする。デスクトップたまごっちは、あなたが「なれ」と言った人ではなく、あなたが実際になっていく人に育つのだ。` },
    ],
    cta: `たまごっちをWindowsのタスクバーに。あなたを覚えている。`,
    faqs: [
      { q: `Windowsでデスクトップたまごっちを、何もインストールせずに使えますか？`, a: `はい。Togthrは完全にブラウザ上で動作します——WindowsのChrome、Edge、Firefox、その他Chromiumベースのブラウザ。.exeのダウンロード不要、インストーラ不要、システムトレイ統合不要。サイトを開き、タブをピン留めすれば、ペットはタスクバーに住みます。` },
      { q: `忘れてしまったら、デスクトップたまごっちは死にますか？`, a: `いいえ。オリジナルのたまごっちと違い、Togthrのペットは死んだりリセットしたりしません。数日または数週間開かなくても、同じ状態のままです。戻ってきたとき、まだそこにいます——少しお腹を空かせているかもしれませんが、決していなくなりません。成長段階は日々の連続記録ではなく、累積的なインタラクションに基づいています。` },
      { q: `Windowsでたまごっちの見た目をカスタマイズできますか？`, a: `はい。Togthrには10種類の職業スキンがあります——プログラマ、医者、宇宙飛行士、シェフ、消防士、警察官、ダイバー、ドライバー、兵士、そして72分の1の確率の隠しゴールドバリアント。スキンはペットの隠し属性でアンロックされ、属性はあなたの使用パターンによって形成されます。また、ベビーからレジェンドまでの5段階で成長します。` },
      { q: `デスクトップたまごっちはスマホアプリとどう違いますか？`, a: `スマホアプリは端末上のすべての通知と注意を奪い合います。Windows上のデスクトップたまごっちはタスクバーにいます——あなたの仕事ツールと同じ空間です。通知もポップアップもなく、注意を要求しません。環境的な存在です——タスクバーに目をやれば見え、深い集中に入れば見えなくなる。この体験は、スマホにアプリをもう一つ入れるというより、机の上に観葉植物を置くのに近いです。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/pricing`, label: `Togthr 料金` },
      { href: `/ja/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `たまごっち30周年: ポケットからデスクトップへ` },
      { href: `/ja/blog/tamagotchi-alternative-for-adults`, label: `大人のためのたまごっち代替案` },
      { href: `/ja/blog/virtual-pet-that-grows-up-like-tamagotchi`, label: `たまごっちのように育つバーチャルペット` },
    ],
  },

  ko: {
    intro: `책가방에 클립으로 달았다. 3교시 수학 시간에 삑삑 울린다. 선생님이 압수한다. 수업 끝나고 돌려받는다. 죽어 있다. 리셋하고, 다시 이름을 짓는다. 1997년. 다마고치는 앱이 아니다——버튼 세 개짜리 플라스틱 알, 흑백 LCD 속 도트 유령. 2026년, 다마고치는 책가방에 있지 않다. Windows 작업 표시줄에 있다. 그리고 하루쯤 밥을 잊어도 죽지 않는다.`,
    sections: [
      { h: `모든 것의 시작, 그 플라스틱 알`, p: `반다이가 첫 다마고치를 일본에서 출시한 건 1996년 11월. 1997년 여름이면 전 세계 학교 운동장에 퍼져 있었다. 기기는 단순했다: 16×16 픽셀의 작은 생명체가 깜빡이는 LCD, 세 개의 버튼(A, B, C), 그리고 끊임없는 관심 요구. 배고프면 울고, 슬프면 울고, 더러우면 울었다. 너무 오래 무시하면 마지막으로 한 번 울고, 조용해졌다. 한 세대의 아이들에게 다마고치는 '식물이 아닌 것' 중 처음으로 돌본 대상이었다. 그리고 처음으로 '죽여 본' 것이기도 했다. 그 슬픔은 진짜였다. 애착도 진짜였다. 다마고치는 수백만 아이들에게 조용한 교훈을 가르쳤다——작은 것도 소중할 수 있다고. 2026년, 그 교훈은 변하지 않았다. 플라스틱 알은 그저 데스크톱에 사는 무언가로 진화했을 뿐이다.` },
      { h: `왜 다마고치는 Windows 작업 표시줄에 있어야 하는가`, p: `스마트폰 시대는 모든 것을 휴대폰으로 옮겼다——다마고치까지. 반다이는 모바일 앱을 냈다. 다른 개발자들도 따랐다. 하지만 휴대폰 속 다마고치에는 문제가 있다. 휴대폰에는 다른 것들이 너무 많다. 알림. 메시지. 속보. 다마고치는 TikTok, Instagram, Slack과 주목을 두고 싸우며, 매번 진다. Windows 작업 표시줄은 다르다. 작업 표시줄은 하루 중 실제로 보고 싶은 것들이 놓이는 곳이다. 피드가 아니다. 알림 트레이가 아니다. 화면 아래쪽에 언제나 있고, 결코 요구하지 않는 지속성의 띠다. Windows 데스크톱 다마고치는 손가락을 두고 싸우는 '또 하나의 앱'이 아니다. Excel, VS Code, Chrome, Teams와 화면을 공유하는 작은 도트 동료이며——어느 것도 닫으라고 하지 않는다.` },
      { h: `그 플라스틱 알이 결코 가지지 못했던 기억`, p: `오리지널 다마고치에는 기억이 없었다. 죽으면 끝이었다. 새 알을 부화시킬 수 있어도, 옛 생명체——그 이름, 성장 경로, 밥을 줬던 날들——은 영원히 사라졌다. 2026년의 데스크톱 다마고치에는 기억이 있다. 기억한다. 처음 설치한 날을 기억한다. 3주 동안 열지 않았다가도 다시 돌아온 날을 기억한다. 성장 단계——베이비에서 토들러, 틴에이저, 어덜트, 레전드까지——를 기억하고, 삶이 바빠져도 리셋되지 않는다. 이것은 작은 기능이 아니다. 오리지널 다마고치의 덧없음은 매력의 일부였지만, 비극이기도 했다. 기억을 가진 데스크톱 동료는 다른 종류의 친구다. 기다려준 친구다. 그리고 돌아왔을 때, 그것은 당신이 두고 간 그 생명체 그대로다——그저 아주 조금 더 나이를 먹었을 뿐.` },
      { h: `데스크톱 다마고치는 근무 시간 동안 실제로 무엇을 하는가`, p: `데스크톱 다마고치는 생산성 도구가 아니다. 시간을 추적하지 않는다. 방해 요소를 차단하지 않는다. 집중을 게임화하지 않는다. 하는 일은 더 단순하고, 설명하기 어렵다: 작업 표시줄에 앉아, 당신의 에너지에 맞춘다. 전속력으로 타이핑하고 있으면 작업 중 모드——작은 키보드를 두드린다. 생각에 잠겨 멈추면 사고 중——머리 위에 말풍선. 세션을 완료 표시하면 축하——작은 승리 포즈. 그리고 그저 스크롤하거나 천장을 바라보고 있으면, 아이들——아무것도 하지 않고, 책상 구석의 고양이처럼. 환경의 일부다. 관심을 요구하지 않는다. 그냥 거기 있다. 그리고 시간이 지나면, '그냥 거기 있는 것'이 말보다 훨씬 무겁다는 걸 깨닫게 된다.` },
      { h: `당신과 함께 자라는 다마고치`, p: `오리지널 다마고치의 성장은 며칠 사이였다. 키우고, 진화시키고, 그리고 죽거나 영원히 그대로였다. 현대의 데스크톱 다마고치는 5단계——베이비, 토들러, 틴에이저, 어덜트, 레전드——를 거쳐 자라며, 타임라인은 시간이 아니라 주와 달로 측정된다. 성장을 이끄는 숨겨진 속성(돌봄, 호기심, 꾸준함, 창의성, 용기, 연결)은 숫자로 표시되지 않는다. 앱 사용 방식에서 추론된다. 즉, 작업 표시줄의 생명체는 미리 쓰인 캐릭터가 아니다. 시간에 걸친 당신 자신의 반영이다. 매일 딥워크 중에 펫을 여는 프로그래머는 프로그래머 스킨을 언락한다. 파트너와 펫을 공유하는 사람은 연결 패스를 언락한다. 데스크톱 다마고치는 당신이 '되라'고 말한 사람이 아니라, 당신이 실제로 되어가는 사람으로 자란다.` },
    ],
    cta: `Windows 작업 표시줄에 다마고치를. 당신을 기억합니다.`,
    faqs: [
      { q: `Windows에서 아무것도 설치하지 않고 데스크톱 다마고치를 키울 수 있나요?`, a: `네. Togthr는 완전히 브라우저에서 실행됩니다——Windows의 Chrome, Edge, Firefox 및 모든 Chromium 기반 브라우저. .exe 다운로드 불필요, 설치 프로그램 불필요, 시스템 트레이 통합 불필요. 사이트를 열고 탭을 고정하면 펫이 작업 표시줄에 살아요.` },
      { q: `잊어버리면 데스크톱 다마고치가 죽나요?`, a: `아니요. 오리지널 다마고치와 달리, Togthr의 펫은 죽거나 리셋되지 않습니다. 며칠 또는 몇 주 동안 열지 않아도 같은 상태로 남아 있어요. 돌아오면 거기 그대로 있습니다——조금 배고플지 모르지만, 절대 사라지지 않아요. 성장 단계는 연속 기록이 아닌 누적 상호작용에 기반합니다.` },
      { q: `Windows에서 다마고치의 모습을 커스터마이즈할 수 있나요?`, a: `네. Togthr에는 10가지 직업 스킨이 있습니다——프로그래머, 의사, 우주비행사, 셰프, 소방관, 경찰, 다이버, 드라이버, 군인, 그리고 72분의 1 확률의 숨겨진 골드 변형. 스킨은 펫의 숨겨진 속성을 통해 언락되며, 속성은 사용 패턴에 의해 형성됩니다. 또한 베이비에서 레전드까지 5단계로 성장합니다.` },
      { q: `데스크톱 다마고치는 스마트폰 앱과 어떻게 다른가요?`, a: `스마트폰 앱은 기기의 모든 알림과 주목을 두고 싸웁니다. Windows의 데스크톱 다마고치는 작업 표시줄에——당신의 작업 도구와 같은 공간에 있습니다. 알림 없음, 팝업 없음, 관심 요구 없음. 환경적인 존재입니다——작업 표시줄을 보면 보이고, 깊은 집중에 들어가면 보이지 않게 되는. 이 경험은 스마트폰에 앱 하나 더 까는 것보다, 책상 위에 화분 하나 두는 것에 가깝습니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/pricing`, label: `Togthr 요금` },
      { href: `/ko/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `다마고치 30주년: 주머니에서 데스크톱으로` },
      { href: `/ko/blog/tamagotchi-alternative-for-adults`, label: `어른을 위한 다마고치 대안` },
      { href: `/ko/blog/virtual-pet-that-grows-up-like-tamagotchi`, label: `다마고치처럼 자라는 가상 펫` },
    ],
  },

  de: {
    intro: `Du klemmst es an den Rucksack. Es piept in Mathe in der dritten Stunde. Der Lehrer kassiert es ein. Nach dem Unterricht bekommst du es zurück. Es ist tot. Du startest neu. Du gibst ihm wieder einen Namen. Es ist 1997, und das Tamagotchi ist keine App — es ist ein Plastik-Ei mit drei Knöpfen und einem Pixel-Geist auf einem monochromen LCD. 2026 ist das Tamagotchi nicht mehr am Rucksack. Es ist in deiner Windows-Taskleiste. Und es stirbt nicht, wenn du einen Tag lang vergisst, es zu füttern.`,
    sections: [
      { h: `Das Plastik-Ei, mit dem alles anfing`, p: `Bandai brachte das erste Tamagotchi im November 1996 in Japan auf den Markt. Im Sommer 1997 hatte es Schulhöfe auf der ganzen Welt erreicht. Das Gerät war simpel: eine 16×16-Pixel-Kreatur auf einem winzigen LCD, drei Knöpfe (A, B, C) und ein unstillbares Bedürfnis nach Aufmerksamkeit. Es piepte bei Hunger. Es piepte bei Traurigkeit. Es piepte, wenn es gesäubert werden musste. Und wenn man es zu lange ignorierte, piepte es ein letztes Mal und verstummte dann. Für eine ganze Generation von Kindern war das Tamagotchi das erste Ding, um das sie sich je gekümmert hatten — außer Pflanzen. Und auch das erste Ding, das ihnen je gestorben ist. Die Trauer war echt. Die Bindung auch. Das Tamagotchi lehrte Millionen Kinder eine stille Lektion: Etwas Kleines kann wichtig sein. 2026 hat sich diese Lektion nicht geändert. Das Plastik-Ei hat sich nur zu etwas weiterentwickelt, das auf deinem Desktop lebt.` },
      { h: `Warum das Tamagotchi in deine Windows-Taskleiste gehört`, p: `Das Smartphone-Zeitalter hat alles aufs Handy verlagert — auch das Tamagotchi. Bandai brachte eine mobile App heraus. Andere Entwickler folgten. Aber ein Tamagotchi auf dem Handy hat ein Problem: Das Handy hat viel zu viele andere Dinge drauf. Benachrichtigungen. Nachrichten. Eilmeldungen. Das Tamagotchi konkurriert mit TikTok, Instagram und Slack — und verliert jedes Mal. Die Windows-Taskleiste ist anders. Die Taskleiste ist der Ort, an den Dinge kommen, die man tagsüber tatsächlich sehen will. Sie ist kein Feed. Sie ist keine Benachrichtigungsleiste. Sie ist ein Streifen der Beständigkeit am unteren Bildschirmrand — immer da, nie fordernd. Ein Desktop-Tamagotchi unter Windows ist keine weitere App, die um deinen Daumen kämpft. Es ist ein kleiner Pixel-Begleiter, der deinen Bildschirm mit Excel, VS Code, Chrome und Teams teilt — und nie verlangt, eines davon zu schließen.` },
      { h: `Die Erinnerung, die das Plastik-Ei nie hatte`, p: `Das originale Tamagotchi hatte kein Gedächtnis. Wenn es starb, war es vorbei. Du konntest ein neues Ei ausbrüten, aber die alte Kreatur — ihr Name, ihr Wachstumspfad, die Tage, an denen du sie gefüttert hattest — war für immer verloren. Ein Desktop-Tamagotchi aus dem Jahr 2026 hat ein Gedächtnis. Es erinnert sich. Es erinnert sich an den Tag, an dem du es installiert hast. Es erinnert sich an die drei Wochen, in denen du es vergessen und dann zurückgekommen bist. Es erinnert sich an deine Wachstumsphase — vom Baby über das Kleinkind, den Teenager, den Erwachsenen bis zur Legende — und setzt sich nicht zurück, wenn das Leben hektisch wird. Das ist kein kleines Feature. Die Vergänglichkeit des originalen Tamagotchi war Teil seines Charmes, aber auch seine Tragödie. Ein Desktop-Begleiter mit Gedächtnis ist eine andere Art Freund. Es ist der, der gewartet hat. Und wenn du zurückkommst, ist es noch dasselbe Wesen, das du verlassen hast — nur ein kleines bisschen älter.` },
      { h: `Was ein Windows-Desktop-Tamagotchi während deines Arbeitstags tatsächlich tut`, p: `Ein Desktop-Tamagotchi ist kein Produktivitätstool. Es erfasst deine Zeit nicht und blockiert deine Ablenkungen nicht. Es gamifiziert deinen Fokus nicht. Was es tut, ist einfacher und schwerer zu erklären: Es sitzt in deiner Taskleiste und passt sich deiner Energie an. Wenn du mit voller Geschwindigkeit tippst, ist es im Arbeitsmodus — es hämmert auf einer winzigen Tastatur. Wenn du innehältst, um nachzudenken, denkt es mit — eine Blase über seinem Kopf. Wenn du eine Session als abgeschlossen markierst, feiert es — eine kleine Siegerpose. Und wenn du einfach nur scrollst oder die Decke anstarrst, ist es im Leerlauf, tut nichts, wie eine Katze in der Ecke deines Schreibtisches. Es ist ambient. Es fordert keine Aufmerksamkeit. Es ist einfach da, und nach einer Weile merkst du, dass „einfach da" viel mehr ist, als es klingt.` },
      { h: `Das Tamagotchi, das mit dir wächst`, p: `Das Wachstum des originalen Tamagotchi war auf wenige Tage begrenzt. Du zogst es auf, es entwickelte sich, und dann starb es entweder oder blieb für immer gleich. Ein modernes Desktop-Tamagotchi wächst über fünf Phasen — Baby, Kleinkind, Teenager, Erwachsener, Legende — und die Zeitspanne wird in Wochen und Monaten gemessen, nicht in Stunden. Die versteckten Attribute, die das Wachstum steuern (Fürsorge, Neugier, Beständigkeit, Kreativität, Mut, Verbundenheit), werden nicht als Zahlen angezeigt. Sie werden aus deiner Nutzung der App abgeleitet. Das bedeutet, die Kreatur in deiner Taskleiste ist kein vorgefertigter Charakter. Sie ist ein Spiegelbild deiner selbst — über die Zeit. Der Programmierer, der das Haustier jeden Tag während Deep-Work-Sessions öffnet, schaltet den Programmierer-Skin frei. Die Person, die das Haustier mit einem Partner teilt, schaltet den Verbundenheits-Pfad frei. Das Desktop-Tamagotchi wächst zu der Person heran, die du bist — nicht zu der, die du ihm gesagt hast zu sein.` },
    ],
    cta: `Setz ein Tamagotchi in deine Windows-Taskleiste. Es erinnert sich an dich.`,
    faqs: [
      { q: `Kann ich ein Desktop-Tamagotchi unter Windows nutzen, ohne etwas zu installieren?`, a: `Ja. Togthr läuft komplett im Browser — Chrome, Edge, Firefox oder jeder Chromium-basierte Browser unter Windows. Kein .exe-Download, kein Installer, keine System-Tray-Integration nötig. Öffne die Seite, pinne den Tab an, und das Haustier lebt in deiner Taskleiste.` },
      { q: `Stirbt das Desktop-Tamagotchi, wenn ich es vergesse?`, a: `Nein. Anders als das originale Tamagotchi stirbt das Togthr-Haustier nicht und setzt sich nicht zurück. Wenn du es tagelang oder wochenlang nicht öffnest, bleibt es im selben Zustand. Wenn du zurückkommst, ist es noch da — vielleicht etwas hungriger, aber niemals verschwunden. Die Wachstumsphasen basieren auf kumulativer Interaktion, nicht auf täglichen Streaks.` },
      { q: `Kann ich das Aussehen meines Tamagotchi unter Windows anpassen?`, a: `Ja. Togthr hat zehn Berufs-Skins — Programmierer, Arzt, Astronaut, Koch, Feuerwehrmann, Polizist, Taucher, Fahrer, Soldat und eine versteckte Gold-Variante (1:72-Chance). Der Skin wird durch die versteckten Attribute des Haustiers freigeschaltet, die durch deine Nutzungsmuster geformt werden. Es wächst außerdem in fünf Phasen, vom Baby zur Legende.` },
      { q: `Wie unterscheidet sich ein Desktop-Tamagotchi von einer Handy-App?`, a: `Eine Handy-App konkurriert mit jeder anderen Benachrichtigung auf deinem Gerät. Ein Desktop-Tamagotchi unter Windows lebt in der Taskleiste — demselben Raum wie deine Arbeitswerkzeuge. Es pingt nicht, poppt nicht auf und fordert keine Aufmerksamkeit. Es ist ambient: sichtbar, wenn du auf die Taskleiste schaust, unsichtbar, wenn du im tiefen Fokus bist. Die Erfahrung ähnelt eher einer Pflanze auf dem Schreibtisch als einer weiteren App auf dem Handy.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/pricing`, label: `Togthr Preise` },
      { href: `/de/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `Tamagotchi 30 Jahre: von der Hosentasche auf den Desktop` },
      { href: `/de/blog/tamagotchi-alternative-for-adults`, label: `Eine Tamagotchi-Alternative für Erwachsene` },
      { href: `/de/blog/virtual-pet-that-grows-up-like-tamagotchi`, label: `Ein virtuelles Haustier, das wie ein Tamagotchi aufwächst` },
    ],
  },

  fr: {
    intro: `Vous l'accrochez à votre sac à dos. Il bipe pendant le cours de maths de 10h. Le professeur le confisque. Vous le récupérez après les cours. Il est mort. Vous recommencez. Vous lui redonnez un nom. C'est 1997, et le tamagotchi n'est pas une appli — c'est un œuf en plastique avec trois boutons et un fantôme pixel sur un écran LCD monochrome. En 2026, le tamagotchi n'est plus sur votre sac à dos. Il est dans votre barre des tâches Windows. Et il ne meurt pas quand vous oubliez de le nourrir une journée.`,
    sections: [
      { h: `L'œuf en plastique qui a tout déclenché`, p: `Bandai a sorti le premier tamagotchi en novembre 1996 au Japon. À l'été 1997, il avait atteint les cours de récréation du monde entier. L'appareil était simple : une créature de 16×16 pixels sur un minuscule écran LCD, trois boutons (A, B, C) et un besoin insatiable d'attention. Il bipait quand il avait faim. Il bipait quand il était triste. Il bipait quand il fallait le nettoyer. Et si vous l'ignoriez trop longtemps, il bipait une dernière fois, puis se taisait. Pour toute une génération d'enfants, le tamagotchi a été la première chose dont ils se sont occupés qui n'était pas une plante. Et aussi la première chose qui leur est morte entre les mains. Le chagrin était réel. L'attachement aussi. Le tamagotchi a enseigné à des millions d'enfants une leçon silencieuse : quelque chose de petit peut compter. En 2026, cette leçon n'a pas changé. L'œuf en plastique a juste évolué en quelque chose qui vit sur votre bureau.` },
      { h: `Pourquoi le tamagotchi appartient à votre barre des tâches Windows`, p: `L'ère du smartphone a tout déplacé vers le téléphone — y compris le tamagotchi. Bandai a sorti une appli mobile. D'autres développeurs ont suivi. Mais un tamagotchi sur téléphone a un problème : le téléphone a trop d'autres choses dessus. Des notifications. Des messages. Des actualités. Le tamagotchi rivalise avec TikTok, Instagram et Slack — et il perd à chaque fois. La barre des tâches Windows, c'est différent. La barre des tâches, c'est l'endroit où vont les choses que vous voulez vraiment voir pendant votre journée. Ce n'est pas un fil d'actualité. Ce n'est pas un centre de notifications. C'est une bande de persistance en bas de l'écran, toujours là, jamais exigeante. Un tamagotchi de bureau sous Windows n'est pas une énième appli qui se bat pour votre pouce. C'est un petit compagnon pixel qui partage votre écran avec Excel, VS Code, Chrome et Teams — et qui ne vous demande jamais d'en fermer aucun.` },
      { h: `La mémoire que l'œuf en plastique n'a jamais eue`, p: `Le tamagotchi original n'avait pas de mémoire. Quand il mourait, c'était fini. Vous pouviez faire éclore un nouvel œuf, mais l'ancienne créature — son nom, son parcours de croissance, les jours où vous l'aviez nourrie — était perdue à jamais. Un tamagotchi de bureau en 2026 a une mémoire. Il se souvient. Il se souvient du jour où vous l'avez installé. Il se souvient des trois semaines où vous avez oublié de l'ouvrir, puis êtes revenu. Il se souvient de votre étape de croissance — du bébé au bambin, à l'ado, à l'adulte, à la légende — et ne se réinitialise pas quand la vie devient chargée. Ce n'est pas une petite fonctionnalité. L'impermanence du tamagotchi original faisait partie de son charme, mais c'était aussi sa tragédie. Un compagnon de bureau qui se souvient est un autre type d'ami. C'est celui qui a attendu. Et quand vous revenez, c'est toujours la même créature que vous avez laissée — juste un tout petit peu plus âgée.` },
      { h: `Ce que fait vraiment un tamagotchi de bureau Windows pendant votre journée de travail`, p: `Un tamagotchi de bureau n'est pas un outil de productivité. Il ne suit pas votre temps et ne bloque pas vos distractions. Il ne gamifie pas votre concentration. Ce qu'il fait est plus simple et plus difficile à expliquer : il reste dans votre barre des tâches et s'accorde à votre énergie. Quand vous tapez à pleine vitesse, il est en mode Travail — tapotant sur un clavier minuscule. Quand vous faites une pause pour réfléchir, il est en mode Réflexion — une bulle au-dessus de sa tête. Quand vous terminez une session et la marquez comme faite, il célèbre — une petite pose de victoire. Et quand vous faites juste défiler des pages ou regardez le plafond, il est inactif, ne fait rien, comme un chat dans le coin du bureau. Il est ambiant. Il ne demande pas d'attention. Il est juste là, et après un moment, vous remarquez que « juste là », c'est bien plus que ce que ça semble être.` },
      { h: `Le tamagotchi qui grandit avec vous`, p: `La croissance du tamagotchi original se limitait à quelques jours. Vous l'éleviez, il évoluait, puis il mourait ou restait le même pour toujours. Un tamagotchi de bureau moderne grandit en cinq étapes — bébé, bambin, ado, adulte, légende — et la chronologie se mesure en semaines et en mois, pas en heures. Les attributs cachés qui pilotent la croissance (soin, curiosité, constance, créativité, courage, connexion) ne sont pas affichés sous forme de chiffres. Ils sont déduits de votre utilisation de l'appli. Cela signifie que la créature dans votre barre des tâches n'est pas un personnage pré-écrit. C'est un reflet de vous-même — dans la durée. Le programmeur qui ouvre l'animal tous les jours pendant ses sessions de travail profond débloquera le skin programmeur. La personne qui partage l'animal avec un partenaire débloquera le chemin de la connexion. Le tamagotchi de bureau grandit pour devenir la personne que vous êtes, pas celle que vous lui avez dit d'être.` },
    ],
    cta: `Mettez un tamagotchi dans votre barre des tâches Windows. Il se souvient de vous.`,
    faqs: [
      { q: `Puis-je utiliser un tamagotchi de bureau sous Windows sans rien installer ?`, a: `Oui. Togthr fonctionne entièrement dans le navigateur — Chrome, Edge, Firefox ou tout navigateur basé sur Chromium sous Windows. Pas de .exe à télécharger, pas d'installateur, pas d'intégration à la barre système nécessaire. Ouvrez le site, épinglez l'onglet, et l'animal vit dans votre barre des tâches.` },
      { q: `Le tamagotchi de bureau meurt-il si je l'oublie ?`, a: `Non. Contrairement au tamagotchi original, l'animal Togthr ne meurt pas et ne se réinitialise pas. Si vous ne l'ouvrez pas pendant des jours ou des semaines, il reste dans le même état. Quand vous revenez, il est toujours là — peut-être un peu plus affamé, mais jamais disparu. Les étapes de croissance sont basées sur l'interaction cumulée, pas sur des séries quotidiennes.` },
      { q: `Puis-je personnaliser l'apparence de mon tamagotchi sous Windows ?`, a: `Oui. Togthr a dix skins de métier — programmeur, médecin, astronaute, chef, pompier, policier, plongeur, conducteur, soldat, et une variante dorée cachée (1 chance sur 72). Le skin se débloque via les attributs cachés de l'animal, façonnés par vos habitudes d'utilisation. Il grandit également en cinq étapes, du bébé à la légende.` },
      { q: `En quoi un tamagotchi de bureau diffère-t-il d'une appli mobile ?`, a: `Une appli mobile rivalise avec toutes les autres notifications sur votre appareil. Un tamagotchi de bureau sous Windows vit dans la barre des tâches — le même espace que vos outils de travail. Pas de notifications, pas de pop-ups, pas de demandes d'attention. Il est ambiant : visible quand vous regardez la barre des tâches, invisible quand vous êtes en concentration profonde. L'expérience ressemble plus à une plante sur votre bureau qu'à une appli supplémentaire sur votre téléphone.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/pricing`, label: `Tarifs Togthr` },
      { href: `/fr/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `Tamagotchi 30 ans : de la poche au bureau` },
      { href: `/fr/blog/tamagotchi-alternative-for-adults`, label: `Une alternative tamagotchi pour adultes` },
      { href: `/fr/blog/virtual-pet-that-grows-up-like-tamagotchi`, label: `Un animal virtuel qui grandit comme un tamagotchi` },
    ],
  },

  es: {
    intro: `Lo enganchas a la mochila. Suena en matemáticas a tercera hora. El profesor lo confisca. Lo recuperas después de clase. Está muerto. Lo reinicias. Le pones nombre otra vez. Es 1997, y el tamagotchi no es una app — es un huevo de plástico con tres botones y un fantasma pixel en una pantalla LCD monocromo. En 2026, el tamagotchi ya no está en tu mochila. Está en tu barra de tareas de Windows. Y no se muere si un día te olvidas de darle de comer.`,
    sections: [
      { h: `El huevo de plástico que lo empezó todo`, p: `Bandai lanzó el primer tamagotchi en noviembre de 1996 en Japón. Para el verano de 1997, había llegado a los patios de colegio de todo el mundo. El dispositivo era sencillo: una criatura de 16×16 píxeles en una minúscula pantalla LCD, tres botones (A, B, C) y una necesidad incansable de atención. Pitaba cuando tenía hambre. Pitaba cuando estaba triste. Pitaba cuando necesitaba limpieza. Y si lo ignorabas demasiado tiempo, pitaba una última vez y se callaba. Para toda una generación de niños, el tamagotchi fue lo primero que cuidaron que no fuera una planta. Y también lo primero que se les murió. El dolor era real. El apego también. El tamagotchi enseñó a millones de niños una lección silenciosa: algo pequeño puede importar. En 2026, esa lección no ha cambiado. El huevo de plástico solo ha evolucionado hasta convertirse en algo que vive en tu escritorio.` },
      { h: `Por qué el tamagotchi pertenece a tu barra de tareas de Windows`, p: `La era del smartphone trasladó todo al teléfono — incluido el tamagotchi. Bandai lanzó una app móvil. Otros desarrolladores siguieron. Pero un tamagotchi en el teléfono tiene un problema: el teléfono tiene demasiadas otras cosas. Notificaciones. Mensajes. Noticias de última hora. El tamagotchi compite con TikTok, Instagram y Slack — y pierde siempre. La barra de tareas de Windows es diferente. La barra de tareas es donde van las cosas que realmente quieres ver durante el día. No es un feed. No es una bandeja de notificaciones. Es una franja de persistencia en la parte inferior de la pantalla, siempre ahí, nunca exigiendo. Un tamagotchi de escritorio en Windows no es otra app más peleando por tu pulgar. Es un pequeño compañero pixel que comparte pantalla con Excel, VS Code, Chrome y Teams — y nunca te pide que cierres ninguno.` },
      { h: `La memoria que el huevo de plástico nunca tuvo`, p: `El tamagotchi original no tenía memoria. Cuando moría, se acababa. Podías incubar un huevo nuevo, pero la vieja criatura — su nombre, su camino de crecimiento, los días que la alimentaste — se perdía para siempre. Un tamagotchi de escritorio en 2026 tiene memoria. Recuerda. Recuerda el día que lo instalaste por primera vez. Recuerda las tres semanas que te olvidaste de abrirlo y luego volviste. Recuerda tu etapa de crecimiento — de bebé a niño pequeño, a adolescente, a adulto, a leyenda — y no se reinicia cuando la vida se pone ajetreada. Esto no es una característica menor. La impermanencia del tamagotchi original era parte de su encanto, pero también era su tragedia. Un compañero de escritorio con memoria es otro tipo de amigo. Es el que esperó. Y cuando vuelves, sigue siendo la misma criatura que dejaste — solo un poquito más mayor.` },
      { h: `Lo que realmente hace un tamagotchi de escritorio durante tu jornada laboral`, p: `Un tamagotchi de escritorio no es una herramienta de productividad. No registra tu tiempo ni bloquea tus distracciones. No gamifica tu concentración. Lo que hace es más simple y más difícil de explicar: se sienta en tu barra de tareas y se sincroniza con tu energía. Cuando escribes a toda velocidad, está en modo Trabajo — tecleando en un teclado diminuto. Cuando te detienes a pensar, está Pensando — una burbuja sobre su cabeza. Cuando terminas una sesión y la marcas como completada, celebra — una pequeña pose de victoria. Y cuando solo estás haciendo scroll o mirando al techo, está inactivo, sin hacer nada, como un gato en la esquina de tu escritorio. Es ambiental. No pide atención. Solo está ahí, y después de un tiempo, te das cuenta de que «solo estar ahí» es mucho más de lo que suena.` },
      { h: `El tamagotchi que crece contigo`, p: `El crecimiento del tamagotchi original se limitaba a unos pocos días. Lo criabas, evolucionaba, y luego moría o se quedaba igual para siempre. Un tamagotchi de escritorio moderno crece en cinco etapas — bebé, niño pequeño, adolescente, adulto, leyenda — y la línea de tiempo se mide en semanas y meses, no en horas. Los atributos ocultos que impulsan el crecimiento (cuidado, curiosidad, constancia, creatividad, coraje, conexión) no se muestran como números. Se infieren de cómo usas la app. Esto significa que la criatura en tu barra de tareas no es un personaje predefinido. Es un reflejo de ti mismo — a lo largo del tiempo. El programador que abre la mascota cada día durante sesiones de trabajo profundo desbloqueará el skin de programador. La persona que comparte la mascota con su pareja desbloqueará el camino de la conexión. El tamagotchi de escritorio se convierte en la persona que eres, no en la que le dijiste que fuera.` },
    ],
    cta: `Pon un tamagotchi en tu barra de tareas de Windows. Te recuerda.`,
    faqs: [
      { q: `¿Puedo usar un tamagotchi de escritorio en Windows sin instalar nada?`, a: `Sí. Togthr funciona completamente en el navegador — Chrome, Edge, Firefox o cualquier navegador basado en Chromium en Windows. No necesitas descargar .exe, ni instalador, ni integración con la bandeja del sistema. Abre el sitio, ancla la pestaña, y la mascota vive en tu barra de tareas.` },
      { q: `¿El tamagotchi de escritorio muere si me olvido de él?`, a: `No. A diferencia del tamagotchi original, la mascota de Togthr no muere ni se reinicia. Si no la abres durante días o semanas, se queda en el mismo estado. Cuando vuelves, sigue ahí — quizás un poco más hambrienta, pero nunca desaparecida. Las etapas de crecimiento se basan en la interacción acumulada, no en rachas diarias.` },
      { q: `¿Puedo personalizar la apariencia de mi tamagotchi en Windows?`, a: `Sí. Togthr tiene diez skins de ocupación — programador, médico, astronauta, chef, bombero, policía, buceador, conductor, soldado, y una variante dorada oculta (1 de cada 72). El skin se desbloquea mediante los atributos ocultos de la mascota, moldeados por tus patrones de uso. También crece en cinco etapas, de bebé a leyenda.` },
      { q: `¿En qué se diferencia un tamagotchi de escritorio de una app de móvil?`, a: `Una app de móvil compite con todas las demás notificaciones de tu dispositivo. Un tamagotchi de escritorio en Windows vive en la barra de tareas — el mismo espacio que tus herramientas de trabajo. No emite notificaciones, no salta, no pide atención. Es ambiental: visible cuando miras la barra de tareas, invisible cuando estás en concentración profunda. La experiencia se parece más a tener una planta en el escritorio que a tener otra app más en el móvil.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/pricing`, label: `Precios de Togthr` },
      { href: `/es/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `Tamagotchi 30 años: del bolsillo al escritorio` },
      { href: `/es/blog/tamagotchi-alternative-for-adults`, label: `Una alternativa tamagotchi para adultos` },
      { href: `/es/blog/virtual-pet-that-grows-up-like-tamagotchi`, label: `Una mascota virtual que crece como un tamagotchi` },
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
              <Link href={l.href} className="text-pink-400 hover:underline">{l.label} →</Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
