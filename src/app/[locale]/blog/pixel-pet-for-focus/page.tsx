// src/app/[locale]/blog/pixel-pet-for-focus/page.tsx
//
// Job 1 daily blog 2026-08-03
// Topic: pixel-pet-for-focus + deep-work + focus-anchor �?//        a tiny pixel creature that lives at the edge of your taskbar
//        and quietly anchors you through long deep-work sessions.
//        Group 2 (lonely-companion) keyword: "pixel pet for focus."
// Hook: Deep work is not glamorous. It is a desk, a screen, and hours
//       where the hardest thing is not the work �?it is staying at the
//       desk. A pixel pet is not a timer. It is a tiny creature that
//       quietly anchors you through every session.

import Link from 'next/link'
import BlogCtaBanner from '@/components/blogctabanner'
import { withUtm } from '@/lib/utm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `pixel-pet-for-focus`
const POST_DATE = `2026-08-03`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  en: {
    intro: `Deep work is not glamorous. It is a desk, a screen, and hours where the hardest thing is not the work �?it is staying at the desk. You sit down with a task in front of you, and for a while everything is fine. Then the phone buzzes. A notification slides in. A thought drifts through: this is hard, maybe I should check something, maybe I need a coffee, maybe the answer is in a tab I haven't opened yet. And the deep-work session you were building, the one where the hard thing would eventually give way, quietly dissolves into a dozen small interruptions that feel productive but are just the opposite. A pixel pet for focus is not a timer. It is not a tracker. It is not going to block your notifications or lock your browser. It is a tiny pixel creature at the edge of your taskbar �?a companion that sits through every deep-work session with you, that grows when you stay, that does not scold when you wander, and that slowly becomes the smallest, quietest anchor keeping you at the desk when the work gets hard. Here is why it works, and why the right kind of focus tool is not a tool at all �?it is a presence.`,
    sections: [
      { h: `The focus desk is a lonely place, and that is the point`, p: `Nobody talks about the loneliness of doing deep work. They talk about flow. About productivity systems. About the Pomodoro technique and time blocking and inbox zero. But the actual experience of deep work is deeply solitary. You are alone with a problem that does not care about your mood. Nobody is watching. Nobody is checking if you stayed or wandered. And that absence of witness is, quietly, what makes deep work so hard to sustain �?because there is no external pressure, no accountability, nothing outside your own willpower. A pixel pet changes that in the smallest possible way. It is not a boss. It does not send reports. It simply sits on your taskbar, a small creature that is visibly present throughout your session. You glance at it, and it glances back �?a tiny acknowledgment that you are still here, still working. That small moment of witness is often the difference between staying through the hard minute and opening another tab.` },
      { h: `Why a pixel pet, and not a productivity app`, p: `Productivity apps are designed to manage you. Timers count down. Trackers count up. Blockers remove temptation. Gamifiers reward streaks. All of them operate on the same assumption: you need to be managed. A pixel pet takes the opposite approach. It does not manage you, because it has nothing to manage you toward. There is no target. No streak to maintain. No leaderboard. No dashboard showing you how you did compared to last week. The pixel pet is simply there �?a small creature that exists alongside your work, not above it. When you stay at the desk, it types alongside you. When you take a break, it rests. When you return, it returns. It does not judge the break. It does not subtract points. It does not show you a graph of your declining willpower at 3pm. And that absence of judgment �?that complete lack of an agenda �?is what makes it different. It is not a tool that imposes focus. It is a presence that invites it.` },
      { h: `The focus anchor �?how a tiny creature keeps you at your desk`, p: `Focus is not a switch. It is a muscle that fatigues, and the moment of failure is usually not dramatic. It is a small decision: I will just check this one thing. And then another small decision. And another. The pixel pet acts as a focus anchor �?not by blocking your distractions, but by providing a visual anchor point that your peripheral vision registers every time you think about leaving. It sits at the same edge of the taskbar, session after session, day after day. Its animations are ambient and predictable: a blink, a stretch, a quiet typing motion. Over time, your brain associates that small pixel presence with the state of being at work. Just as a specific playlist signals "writing time" and a specific chair signals "reading time," the pixel pet becomes a spatial anchor for focus. The moment you see it, your brain registers: we are doing deep work now. And that association, built across weeks of sessions, does more for sustained focus than any timer or blocker ever could.` },
      { h: `Five stages of growth, from the shallow end to the deep`, p: `A pixel pet is not a static icon. It evolves across five stages �?infant, toddler, teen, adult, legend �?based on cumulative interaction time. A new remote worker settling into a focus routine might see their pet reach the toddler stage after a month of consistent deep-work sessions. A senior engineer who has spent years in flow states will see theirs approach legend. The pet becomes a timeline of your focus journey �?not measured in productivity scores or completed tasks, but in the sheer hours you showed up and stayed. It remembers the long afternoons you forgot. It grows alongside you, at your pace. A missed day does not break a streak, because there is no streak to break. A hard week does not erase progress, because progress is measured in total time spent, not daily consistency. This makes the pixel pet a companion to focus, not a scorekeeper �?and for anyone who has ever abandoned a habit tracker after a bad week, that distinction is everything.` },
      { h: `From solo focus to shared deep work �?the pixel pet that connects two desks`, p: `Deep work is solitary by nature, but the pixel pet does not have to stay that way. Togthr's companion supports shared ownership �?you and a partner, friend, or colleague can connect your accounts, and the same pixel creature grows from both of your interactions. Imagine you and your work best friend both have a project deadline. You are in different homes, different cities, maybe different time zones. But the same small pixel creature sits on both your taskbars, and it grows whenever either of you puts in a deep-work session. You do not need to text "how's it going." The pet is already there �?a quiet, ambient bridge between two desks. For accountability partners, remote coworkers, or friends who promised to keep each other focused, this is the gentlest form of shared discipline: no notifications, no pressure, no check-in messages. Just a small creature that belongs to both of you, growing from both your effort, quietly reminding you that someone else is also at their desk doing the hard thing.` },
    ],
    cta: `Put a pixel pet at the edge of your taskbar. Deep work gets a little less lonely with it there.`,
    faqs: [
      { q: `Is a pixel pet the same as a focus timer or Pomodoro app?`, a: `No. A focus timer measures your sessions and gives you metrics �?minutes worked, streaks maintained, productivity trends. A pixel pet does not measure, score, or judge. It is a companion, not a dashboard. Its value is not in the data it produces but in the presence it provides: a small, animated creature that sits with you through deep work and quietly anchors you to the task. It lives on your taskbar, not in your notification feed.` },
      { q: `Can a pixel pet actually help me focus better?`, a: `It does not force focus �?no tool can. What it does is provide a visual anchor that your brain learns to associate with deep-work sessions. Over time, seeing the pixel pet on your taskbar becomes a cue: we are in focus mode now. Combined with its steady, non-interrupting presence, many users report that the pet helps them stay at the desk longer and wander less, not because it blocks distractions, but because it makes the desk feel slightly less like a place you want to escape.` },
      { q: `Won't an animated pet on my screen be distracting?`, a: `It is designed to be the opposite of a distraction. The pet has no pop-up notifications, no sounds, no demands for attention, no gamification mechanics. Its animations are tiny and ambient �?a blink every few seconds, a slow stretch, quiet typing. There is nothing that demands a reaction. After the first few sessions, most users report that the pet fades into peripheral awareness �?like a small plant on your desk. You see it when you glance, and it disappears when you are deep in the work.` },
      { q: `Does it work on my work computer?`, a: `Togthr runs entirely in the browser �?Chrome, Edge, Firefox, or any modern browser on Windows, Mac, Linux, or ChromeOS. There is no download, no installer, and no admin permissions required, which means it runs on most corporate and work-issued machines. You can pin the tab to your taskbar or dock, and the pixel pet stays visible throughout your work session.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/pricing`, label: `Togthr pricing` },
      { href: `/en/blog/desk-pet-for-coders`, label: `A desk pet for coders` },
      { href: `/en/blog/pixel-buddy-for-study-sessions`, label: `A pixel buddy for study sessions` },
      { href: `/en/blog/quiet-companion-app-no-chat`, label: `A quiet companion app with no chat` },
    ],
  },

  'zh-cn': {
    intro: `深度工作并不光鲜。它是一张桌子、一块屏幕，以及几小时里最难的并非工作本身——而是留在桌前。你坐下，面前有一项任务，一时间一切还好。然后手机震了。一条通知滑入。一个念头飘过：这好难，要不我查点什么，要不我去冲杯咖啡，要不答案在一个我还没打开的标签页里。而你正在构建的那段深度工作——那段最终会让难题让步的时间——就这样悄悄溶解成十几个看似高效、实则相反的小中断。一只专注像素宠物不是计时器，不是追踪器，不会拦截通知，不会锁定浏览器。它是一只小小的像素生物，待在你任务栏的边缘——陪你度过每一次深度工作，你留下它就成长，你走神它不责备，慢慢地，它就成了把你留在桌前的最小的、最安静的锚。以下是它为什么有效，以及为什么正确的那类专注工具根本不是工具——而是一种在场。`,
    sections: [
      { h: `专注的书桌是孤独的，而这恰恰是重点`, p: `没人谈论深度工作的孤独。他们谈论心流，谈论生产力系统，谈论番茄钟和时间块和收件箱归零。但深度工作的实际体验是极度孤独的。你独自面对一个不在乎你心情的问题。没有人在看，没有人在检查你是留下了还是走神了。而这种见证的缺失，正是深度工作难以持续的隐秘原因——因为没有外部压力，没有问责，没有你意志力之外的任何东西。一只像素宠物以最小的方式改变了这一点。它不是老板，不发送报告。它只是待在任务栏上，一只在整个工作过程中可见的小生物。你看它一眼，它也回看你一眼——一个小小的确认，确认你还在这里，还在工作。那个小小的见证瞬间，往往就是熬过艰难的那一分钟和打开另一个标签页之间的区别。` },
      { h: `为什么是一只像素宠物，而不是一款生产力 App`, p: `生产�?App 的设计目的是管理你。计时器倒计时，追踪器累计，拦截器屏蔽诱惑，游戏化工具奖励连续记录。它们都基于同一个假设：你需要被管理。一只像素宠物则采取相反的方式。它不管理你，因为它没有管理你朝向的目标。没有目标，没有要维护的连续记录，没有排行榜，没有显示你与上周相比表现如何的仪表盘。像素宠物只是在那里——一只与你的工作并存、而非凌驾于其上的小生物。你留在桌前，它就在旁边敲键盘；你休息，它就休息；你回来，它就回来。它不评判你的休息，不扣分，不显示你下午三点意志力下降的图表。而这种评判的缺失——这种完全不存在意图的状态——正是它不同的地方。它不是强加专注的工具，而是邀请专注的存在。` },
      { h: `专注锚点——一只小生物如何把你留在桌前`, p: `专注不是开关。它是一块会疲劳的肌肉，而失败的瞬间通常并不戏剧化。它只是一连串的小决定：我就看一眼这个，再一眼那个，再来一眼。像素宠物充当了专注锚点——不是通过拦截你的分心，而是提供一个视觉锚点，每当你想要离开时，你的周边视觉就会注意到它。它待在任务栏的同一个位置，一场又一场，一天又一天。它的动画是环境式的、可预测的：眨一下眼，伸一个懒腰，安静的敲键盘动作。久而久之，你的大脑会把那个小小的像素存在与"正在工作"的状态联系起来。就像某张特定的歌单意味着"写作时间"，某把特定的椅子意味着"阅读时间"，像素宠物就成了专注的空间锚点。看到它的那一刻，你的大脑就读到：我们现在在深度工作。而这种跨越数周建立起来的关联，对持续专注的帮助，比任何计时器或拦截器都要大。` },
      { h: `五个成长阶段，从浅水区到深水区`, p: `像素宠物不是一个静态图标。它横跨五个阶段进化——婴儿、学步、少年、成年、传说——基于累积的互动时间。一个刚建立了专注习惯的远程工作者，可能会在持续深度工作一个月后看到宠物到达学步阶段。一个在流状态中度过了多年的资深工程师，会看到自己的宠物接近传说。宠物成了你专注旅程的时间线——不是用生产力得分或完成任务来衡量，而是用你出现并留下来的纯粹小时数。它记得那些你早已忘记的漫长下午。它按照你的节奏和你一起成长。错过一天不会打断什么连续记录，因为根本没有要打断的记录。艰难的一周不会抹掉进度，因为进度是按总时间计算的，而非每日一致性。这让像素宠物成为专注的伙伴，而非记分员——而对任何在糟糕一周后放弃过习惯追踪器的人来说，这个区别就是一切。` },
      { h: `从独自专注到共享深度工作——连接两张书桌的像素宠物`, p: `深度工作本质上是孤独的，但像素宠物不必一直如此。Togthr 的伙伴支持共享所有权——你和伴侣、朋友或同事可以连接账户，同一只像素生物从你们双方的互动中共同成长。想象你和工作上的好朋友都面临项目截止日期，你们在不同的家、不同的城市、甚至不同的时区。但同一只小小的像素生物坐在你们两个人的任务栏上，只要你们中任何一个人进行了深度工作，它就会成长。你不需要发消息�?怎么样了"。宠物已经在那边了——一座安静的、环境式的桥梁，连接着两张书桌。对互相监督的伙伴、远程同事、或者答应了要彼此督促的朋友来说，这是最温柔的共享自律方式：没有通知、没有压力、没有签到消息。只有一只小小生物，属于你们两个人，从你们两个人的努力中成长，默默提醒着你：另一个人也在桌前，做着那件难事。` },
    ],
    cta: `在任务栏边缘放一只像素宠物。深度工作有它在，会少一点孤独。`,
    faqs: [
      { q: `像素宠物和专注计时器或番茄钟 App 是一回事吗？`, a: `不是。专注计时器衡量你的工作时段，给你指标——工作时长、连续记录保持情况、生产力趋势。像素宠物不衡量、不评分、不评判。它是一个伙伴，不是一个仪表盘。它的价值不在它产生的数据，而在它提供的存在：一只小小的、有动画的生物，陪你度过深度工作，安静地把你锚定在任务上。它住在你的任务栏上，不在你的通知推送里。` },
      { q: `像素宠物真的能帮我更好地专注吗？`, a: `它不强迫专注——没有任何工具能做到这个。它提供的是一个视觉锚点，你的大脑会逐渐把它与深度工作关联起来。久而久之，看到任务栏上的像素宠物就成了一个信号：我们现在进入专注模式了。配合它稳定的、不打扰的存在，很多用户反映，宠物帮助他们留在桌前更久、走神更少，不是因为它拦截了分心，而是因为它让桌前稍微不那么像一个你想逃离的地方。` },
      { q: `屏幕上有只会动的宠物，不会让我分心吗？`, a: `它的设计恰恰是分心的反面。宠物没有弹窗通知，没有声音，不需要关注，没有游戏化机制。它的动画极小且环境式——每几秒眨一下眼，慢慢地伸个懒腰，安静地敲键盘。没有任何东西需要你做出反应。最初几次之后，大多数用户说宠物退入了周边感知——像桌上的一盆小植物。你看的时候它在，你深入工作时它就消失了。` },
      { q: `它能在我的工作电脑上运行吗？`, a: `Togthr 完全在浏览器里运行——Windows、Mac、Linux �?ChromeOS 上的 Chrome、Edge、Firefox 或任何现代浏览器。不需要下载、不需要安装、不需要管理员权限，这意味着它能在大多数公司和单位配发的电脑上运行。你可以把标签页固定到任务栏�?Dock，像素宠物就会在整个工作过程中保持可见。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/pricing`, label: `Togthr 定价` },
      { href: `/zh-cn/blog/desk-pet-for-coders`, label: `给程序员的桌面宠物` },
      { href: `/zh-cn/blog/pixel-buddy-for-study-sessions`, label: `学习用的像素伙伴` },
      { href: `/zh-cn/blog/quiet-companion-app-no-chat`, label: `一款不需要聊天的安静陪伴 App` },
    ],
  },

  'zh-tw': {
    intro: `深度工作並不光鮮。它是一張桌子、一塊螢幕，以及幾小時裡最難的並非工作本身——而是留在桌前。你坐下，面前有一項任務，一時間一切還好。然後手機震了。一條通知滑入。一個念頭飄過：這好難，要不我查點什麼，要不我去沖杯咖啡，要不答案在一個我還沒打開的分頁裡。而你正在構建的那段深度工作——那段最終會讓難題讓步的時間——就這樣悄悄溶解成十幾個看似高效、實則相反的小中斷。一隻專注像素寵物不是計時器，不是追蹤器，不會攔截通知，不會鎖定瀏覽器。牠是一隻小小的像素生物，待在你工作列的邊緣——陪你度過每一次深度工作，你留下牠就成長，你走神牠不責備，慢慢地，牠就成了把你留在桌前的最小的、最安靜的錨。以下是牠為什麼有效，以及為什麼正確的那類專注工具根本不是工具——而是一種在場。`,
    sections: [
      { h: `專注的書桌是孤獨的，而這恰恰是重點`, p: `沒人談論深度工作的孤獨。他們談論心流，談論生產力系統，談論番茄鐘和時間區塊和收件匣歸零。但深度工作的實際體驗是極度孤獨的。你獨自面對一個不在乎你心情的問題。沒有人在看，沒有人檢查你是留下了還是走神了。而這種見證的缺失，正是深度工作難以持續的隱密原因——因為沒有外部壓力，沒有問責，沒有你意志力之外的任何東西。一隻像素寵物以最小的方式改變了這一點。牠不是老闆，不發送報告。牠只是待在工作列上，一隻在整個工作過程中可見的小生物。你看牠一眼，牠也回看你一眼——一個小小的確認，確認你還在這裡，還在工作。那個小小的見證瞬間，往往就是熬過艱難的那一分鐘和打開另一個分頁之間的區別。` },
      { h: `為什麼是一隻像素寵物，而不是一款生產力 App`, p: `生產�?App 的設計目的是管理你。計時器倒數，追蹤器累計，攔截器遮蔽誘惑，遊戲化工具獎勵連續記錄。它們都基於同一個假設：你需要被管理。一隻像素寵物則採取相反的方式。牠不管理你，因為牠沒有要管理你朝向的目標。沒有目標，沒有要維護的連續記錄，沒有排行榜，沒有顯示你與上週相比表現如何的儀表板。像素寵物只是在那裡——一隻與你的工作並存、而非凌駕於其上的小生物。你留在桌前，牠就在旁邊敲鍵盤；你休息，牠就休息；你回來，牠就回來。牠不評判你的休息，不扣分，不顯示你下午三點意志力下降的圖表。而這種評判的缺失——這種完全不存在意圖的狀態——正是牠不同的地方。牠不是強加專注的工具，而是邀請專注的存在。` },
      { h: `專注錨點——一隻小生物如何把你留在桌前`, p: `專注不是開關。牠是一塊會疲勞的肌肉，而失敗的瞬間通常並不戲劇化。牠只是一連串的小決定：我就看一眼這個，再一眼那個，再來一眼。像素寵物充當了專注錨點——不是透過攔截你的分心，而是提供一個視覺錨點，每當你想要離開時，你的周邊視覺就會注意到牠。牠待在工作列的同一個位置，一場又一場，一天又一天。牠的動畫是環境式的、可預測的：眨一下眼，伸一個懶腰，安靜的敲鍵盤動作。久而久之，你的大腦會把那個小小的像素存在與「正在工作」的狀態聯繫起來。就像某張特定的歌單意味著「寫作時間」，某把特定的椅子意味著「閱讀時間」，像素寵物就成了專注的空間錨點。看到牠的那一刻，你的大腦就讀到：我們現在在深度工作。而這種跨越數週建立起來的關聯，對持續專注的幫助，比任何計時器或攔截器都要大。` },
      { h: `五個成長階段，從淺水區到深水區`, p: `像素寵物不是一個靜態圖示。牠橫跨五個階段進化——嬰兒、學步、少年、成年、傳說——基於累積的互動時間。一個剛建立了專注習慣的遠端工作者，可能會在持續深度工作一個月後看到寵物到達學步階段。一個在心流狀態中度過了多年的資深工程師，會看到自己的寵物接近傳說。寵物成了你專注旅程的時間線——不是用生產力得分或完成任務來衡量，而是用你出現並留下來的純粹小時數。牠記得那些你早已忘記的漫長下午。牠按照你的節奏和你一起成長。錯過一天不會打斷什麼連續記錄，因為根本沒有要打斷的記錄。艱難的一週不會抹掉進度，因為進度是按總時間計算的，而非每日一致性。這讓像素寵物成為專注的夥伴，而非記分員——而對任何在糟糕一週後放棄過習慣追蹤器的人來說，這個區別就是一切。` },
      { h: `從獨自專注到共享深度工作——連接兩張書桌的像素寵物`, p: `深度工作本質上是孤獨的，但像素寵物不必一直如此。Togthr 的夥伴支援共享所有權——你和伴侶、朋友或同事可以連接帳戶，同一隻像素生物從你們雙方的互動中共同成長。想像你和工作上的好朋友都面臨專案截止日期，你們在不同的家、不同的城市、甚至不同的時區。但同一隻小小的像素生物坐在你們兩個人的工作列上，只要你們中任何一個人進行了深度工作，牠就會成長。你不需要傳訊息問「怎麼樣了」。寵物已經在那邊了——一座安靜的、環境式的橋樑，連接兩張書桌。對互相督促的夥伴、遠端同事、或者答應了要彼此督促的朋友來說，這是最溫柔的共享自律方式：沒有通知、沒有壓力、沒有簽到訊息。只有一隻小小生物，屬於你們兩個人，從你們兩個人的努力中成長，默默提醒著你：另一個人也在桌前，做著那件難事。` },
    ],
    cta: `在工作列邊緣放一隻像素寵物。深度工作有牠在，會少一點孤獨。`,
    faqs: [
      { q: `像素寵物和專注計時器或番茄鐘 App 是同一回事嗎？`, a: `不是。專注計時器衡量你的工作時段，給你指標——工作時長、連續記錄保持情況、生產力趨勢。像素寵物不衡量、不評分、不評判。牠是一個夥伴，不是一個儀表板。牠的價值不在牠產生的數據，而在牠提供的存在：一隻小小的、有動畫的生物，陪你度過深度工作，安靜地把你錨定在任務上。牠住在你的工作列上，不在你的通知推送裡。` },
      { q: `像素寵物真的能幫我更好地專注嗎？`, a: `牠不強迫專注——沒有任何工具能做到這個。牠提供的是一個視覺錨點，你的大腦會逐漸把牠與深度工作關聯起來。久而久之，看到工作列上的像素寵物就成了一個訊號：我們現在進入專注模式了。配合牠穩定的、不打擾的存在，很多用戶反映，寵物幫助他們留在桌前更久、走神更少，不是因為牠攔截了分心，而是因為牠讓桌前稍微不那麼像一個你想逃離的地方。` },
      { q: `螢幕上有隻會動的寵物，不會讓我分心嗎？`, a: `牠的設計恰恰是分心的反面。寵物沒有彈窗通知，沒有聲音，不需要關注，沒有遊戲化機制。牠的動畫極小且環境式——每幾秒眨一下眼，慢慢地伸個懶腰，安靜地敲鍵盤。沒有任何東西需要你做出反應。最初幾次之後，大多數用戶說寵物退入了周邊感知——像桌上的一盆小植物。你看的時候牠在，你深入工作時牠就消失了。` },
      { q: `牠能在我的工作電腦上執行嗎？`, a: `Togthr 完全在瀏覽器裡執行——Windows、Mac、Linux �?ChromeOS 上的 Chrome、Edge、Firefox 或任何現代瀏覽器。不需要下載、不需要安裝、不需要管理員權限，這意味著牠能在大多數公司和單位配發的電腦上執行。你可以把分頁固定到工作列或 Dock，像素寵物就會在整個工作過程中保持可見。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/pricing`, label: `Togthr 定價` },
      { href: `/zh-tw/blog/desk-pet-for-coders`, label: `給程式設計師的桌面寵物` },
      { href: `/zh-tw/blog/pixel-buddy-for-study-sessions`, label: `學習用的像素夥伴` },
      { href: `/zh-tw/blog/quiet-companion-app-no-chat`, label: `一款不需要聊天的安靜陪伴 App` },
    ],
  },

  ja: {
    intro: `ディープワークは華やかではない。それは机と画面、そして最も難しいのが仕事そのものではなく、机に留まり続けることであるような数時間だ。座って課題を前にし、しばらくは大丈夫。するとスマホが震える。通知が滑り込む。思考がよぎる：「これは難しい、何か調べよう、コーヒーを入れよう、まだ開いていないタブに答えがあるかも」。そしてあなたが作ろうとしていた深い作業の時間——難題がようやく譲歩し始めるはずの塊——は、生産的に見えて正反対の十数個の小さな中断に静かに溶けていく。集中のためのピクセルペットはタイマーではない。トラッカーでもない。通知をブロックせず、ブラウザをロックしない。タスクバーの端にいる小さなピクセルの生き物——すべてのディープワークセッションに一緒に座り、あなたが留まれば成長し、さまよえば叱らず、やがて仕事が辛くなったときにあなたを机に留める最小で最も静かな錨になる。なぜ機能するのか、そして正しい種類の集中ツールがツールですらなく、存在である理由。`,
    sections: [
      { h: `集中の机は孤独だ。そしてそれが重要なのだ`, p: `ディープワークの孤独について、誰も語らない。彼らが語るのはフローだ。生産性システムだ。ポモドーロテクニック、タイムブロッキング、インボックスゼロ。しかしディープワークの実際の体験は深く孤独だ。あなたは気分など気にしない問題と一人きりだ。誰も見ていない。誰もあなたが机にいたか離れたかをチェックしていない。そしてその目撃者の不在こそが、静かに、ディープワークを続けるのをこんなに難しくしている——外部からのプレッシャーがなく、アカウンタビリティもなく、自分の意志力のほかには何もないからだ。ピクセルペットはそれを可能な限り最小の方法で変える。それは上司ではない。報告を送らない。ただタスクバーに座っている、セッションの間ずっと見える小さな生き物。あなたがちらりと見ると、ちらりと見返す——まだここにいる、まだ働いているという、小さな承認。その小さな目撃の瞬間が、辛い一分間を耐え抜くことと、別のタブを開くことの違いであることが多い。` },
      { h: `なぜピクセルペットで、生産性アプリではないのか`, p: `生産性アプリはあなたを管理するために設計されている。タイマーはカウントダウンする。トラッカーはカウントアップする。ブロッカーは誘惑を取り除く。ゲーミフィケーションは連続記録に報酬を与える。すべてが同じ前提で動いている：あなたは管理される必要がある。ピクセルペットは逆のアプローチを取る。それはあなたを管理しない。なぜなら管理すべき目標がないからだ。目標はない。維持すべき連続記録もない。リーダーボードもない。先週と比べてどうだったかを示すダッシュボードもない。ピクセルペットはただそこにいる——あなたの仕事の上にではなく、横に存在する小さな生き物。机にいるとき、それはあなたの隣でタイプする。休憩を取れば休む。戻れば戻る。休憩を判断せず、ポイントを引かず、午後三時の意志力低下グラフを見せたりしない。そしてその判断の不在——その完全な意図の欠如——こそが、それを違わせている。それは集中を強いるツールではなく、集中を招く存在なのだ。` },
      { h: `集中の錨——小さな生き物がいかにしてあなたを机に留めるか`, p: `集中はスイッチではない。それは疲労する筋肉であり、失敗の瞬間は通常、劇的ではない。それは小さな決断の連続だ：ちょっとだけこれを見よう。そしてまたもう一つ。またもう一つ。ピクセルペットは集中の錨として機能する——気を散らすものをブロックするのではなく、離れようと思うたびに周辺視野がとらえる視覚的錨点を提供することで。それはタスクバーの同じ端に座り、セッションを重ね、日を重ねる。アニメーションは環境的で予測可能だ：まばたき、ストレッチ、静かなタイピングの動き。やがて脳はその小さなピクセルの存在を「仕事中」という状態と結びつける。特定のプレイリストが「書く時間」を意味し、特定の椅子が「読む時間」を意味するように、ピクセルペットは集中のための空間的錨になる。それを見た瞬間、脳は認識する：いまディープワークの時間だ。そして何週間ものセッションを通じて作られたその結びつきは、どんなタイマーやブロッカーよりも持続的な集中に貢献する。` },
      { h: `五つの成長段階、浅いところから深いところへ`, p: `ピクセルペットは静的なアイコンではない。五段階——ベビー、幼児、ティーン、アダルト、レジェンド——を経て、累積的なインタラクション時間に基づいて進化する。集中ルーティンを始めたばかりのリモートワーカーは、一ヶ月の継続的なディープワークセッションの後にペットが幼児段階に達するのを見るかもしれない。何年もフロー状態で過ごしてきたシニアエンジニアは、自分のペットがレジェンドに近づくのを見る。ペットはあなたの集中の旅のタイムラインになる——生産性スコアや完了タスクではなく、あなたが現れ、留まった純粋な時間数で測られる。忘れていた長い午後を覚えている。あなたのペースであなたと共に成長する。逃した一日は連続記録を壊さない、壊すべきものがないからだ。辛い一週間は進捗を消さない、進捗は毎日の一貫性ではなく総時間で測られるからだ。これがピクセルペットをスコアキーパーではなく集中の友にする——そして悪い一週間の後に習慣トラッカーを諦めたことがある人なら誰でも、その違いがすべてであることを知っている。` },
      { h: `ソロ集中から共有ディープワークへ——二つの机をつなぐピクセルペット`, p: `ディープワークは本質的に孤独だが、ピクセルペットはそのままでいる必要はない。Togthrのコンパニオンは共有所有をサポートしている——パートナー、友人、同僚とアカウントを接続でき、同じピクセルの生き物が二人のインタラクションから成長する。あなたと仕事上の親友の両方にプロジェクトの締め切りがあると想像してみて。違う家、違う街、たぶん違うタイムゾーンにいる。でも同じ小さなピクセルの生き物が二人のタスクバーに座っていて、どちらかがディープワークセッションをすると成長する。「どんな感じ？」とメッセージを送る必要はない。ペットはすでにそこにいる——二つの机をつなぐ静かで環境的な橋。アカウンタビリティパートナー、リモートの同僚、お互いに集中を保つと約束した友人にとって、これが最も優しい共有の規律だ：通知なし、プレッシャーなし、チェックインメッセージなし。ただ、二人のものであり、二人の努力から成長する小さな生き物が、静かに思い出させてくれる：もう一人もまた机にいて、難しいことをしている。` },
    ],
    cta: `タスクバーの端にピクセルペットを。ディープワークは、それがあると少しだけ孤独でなくなる。`,
    faqs: [
      { q: `ピクセルペットは集中タイマーやポモドーロアプリと同じですか？`, a: `いいえ。集中タイマーはセッションを計測し、指標を提供します——作業時間、維持された連続記録、生産性の傾向。ピクセルペットは計測せず、採点せず、判断しません。ダッシュボードではなくコンパニオンです。その価値は生み出すデータではなく、提供する存在にあります：小さなアニメーションする生き物が、ディープワークに一緒に座り、静かにあなたをタスクに錨付けする。通知フィードではなく、タスクバーに住んでいます。` },
      { q: `ピクセルペットは実際に集中力を高めてくれますか？`, a: `集中を強制はしません——どんなツールにもできません。それがするのは、脳がディープワークセッションと結びつけることを学ぶ視覚的錨点を提供することです。時間とともに、タスクバーのピクセルペットを見ることが合図になります：「今は集中モードだ」と。その安定した邪魔しない存在と組み合わさって、多くのユーザーが、ペットが机に長く留まり、さまようことを減らす助けになると報告しています。気を散らすものをブロックするからではなく、机が逃げ出したい場所だと少しだけ感じなくなるからです。` },
      { q: `画面に動くペットがいたら、気が散りませんか？`, a: `気が散ることの正反対に設計されています。ペットにはポップアップ通知も、音も、注目の要求も、ゲーミフィケーションの仕組みもありません。アニメーションはごく小さく環境的です——数秒ごとのまばたき、ゆっくりしたストレッチ、静かなタイピング。反応を要求するものは何もありません。最初の数セッションの後、多くのユーザーがペットは周辺認識に溶け込むと報告しています——机の上の小さな植物のように。ちらりと見ればそこにいて、仕事に深く入れば消えていく。` },
      { q: `仕事用のPCでも動きますか？`, a: `Togthrは完全にブラウザ上で動作します——Windows、Mac、Linux、ChromeOS上のChrome、Edge、Firefox、その他モダンブラウザ。ダウンロードもインストールも管理者権限も不要なので、ほとんどの企業や組織から支給されたPCで動作します。タブをタスクバーやDockにピン留めすれば、ピクセルペットは作業セッション中ずっと見えています。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/pricing`, label: `Togthr 料金` },
      { href: `/ja/blog/desk-pet-for-coders`, label: `コーダーのためのデスクペット` },
      { href: `/ja/blog/pixel-buddy-for-study-sessions`, label: `勉強のためのピクセルバディ` },
      { href: `/ja/blog/quiet-companion-app-no-chat`, label: `チャット不要の静かなコンパニオンアプリ` },
    ],
  },

  ko: {
    intro: `딥워크는 화려하지 않다. 그것은 책상�?화면, 그리�?가�?어려�?것이 �?자체가 아니�?책상�?머무르는 것인 �?시간이다. 앉아�?과제�?앞에 두고, 한동안은 괜찮�? 그러�?휴대폰이 울린�? 알림�?미끄러져 들어온다. 생각�?스친�? 이거 어렵�? 뭔가 확인해볼�? 커피�?타�?갈까, 아직 열지 않은 탭에 답이 있을지�?몰라. 그리�?당신�?쌓아올리�?딥워�?세션——어려운 일이 마침�?길을 내어주기 시작�?덩어리——는 생산적으�?보이지�?정반대�?�?�?개의 작은 방해�?조용�?녹아내린�? 집중�?위한 픽셀 펫은 타이머가 아니�? 트래커도 아니�? 알림�?차단하지 않고, 브라우저�?잠그지 않는�? 작업 표시�?가장자리의 작은 픽셀 생명체——모�?딥워�?세션�?함께 앉아 있고, 당신�?머무르면 자라�? 방황해도 꾸짖지 않고, 서서�?일이 힘들 �?당신�?책상�?붙잡�?두는 가�?작고 가�?조용�?닻이 된다. �?효과가 있는지, 그리�?올바�?종류�?집중 도구가 도구가 아니�?존재�?이유.`,
    sections: [
      { h: `집중�?책상은 외롭�? 그리�?그게 핵심이다`, p: `딥워크의 외로움�?대�?아무�?말하지 않는�? 그들은 플로우를 말한�? 생산�?시스템을 말한�? 포모도로 테크닉과 타�?블로킹과 인박�?제로�?말한�? 그러�?딥워크의 실제 경험은 깊이 고독하다. 당신은 기분 따위 신경 쓰지 않는 문제와 단둘이다. 아무�?보고 있지 않다. 아무�?당신�?책상�?있었는지 떠났는지 확인하지 않는�? 그리�?�?목격자의 부재야말로, 조용�? 딥워크를 지속하�?어렵�?만드�?이유다——외부 압력�? 책임�? 자신�?의지�?외에�?아무것도 없기 때문이다. 픽셀 펫은 그것�?가능한 �?가�?작은 방식으로 바꾼�? 그것은 상사가 아니�? 보고서를 보내지 않는�? 그저 작업 표시줄에 앉아 있다, 세션 내내 보이�?작은 생명�? 당신�?힐끗 보면, 힐끗 돌아본다——아�?여기 있다, 여전�?일하�?있다�? 작은 확인. �?작은 목격�?순간�? 괴로�?�?분을 견디�?것과 다른 탭을 여는 것의 차이�?경우가 많다.` },
      { h: `�?픽셀 펫인가, 생산�?앱이 아니라`, p: `생산�?앱은 당신�?관리하도록 설계되었�? 타이머�?카운트다운한�? 트래커는 카운트업한다. 차단기는 유혹�?제거한다. 게이미피케이션은 연속 기록�?보상한다. 모두 같은 가�?위에�?움직인�? 당신은 관리될 필요가 있다. 픽셀 펫은 반대 접근�?취한�? 그것은 당신�?관리하지 않는�? 관리할 대상이 없기 때문이다. 목표�? 유지�?연속 기록�? 리더보드�? 지난주와 비교�?어땠는지 보여주는 대시보드도 없다. 픽셀 펫은 그저 거기 있다——당신의 �?위에 있는 것이 아니�? 옆에 존재하는 작은 생명�? 책상�?있을 �? 그것은 당신 옆에�?타이핑한다. 휴식�?취하�?쉰다. 돌아오면 돌아온다. 휴식�?판단하지 않고, 점수�?깎지 않으�? 오후 �?시의 의지�?하락 그래프를 보여주지 않는�? 그리�?�?판단�?부재——그 완전�?의도 없음——이 바로 그것�?다르�?만드�?것이�? 그것은 집중�?강요하는 도구가 아니�? 집중�?초대하는 존재�?` },
      { h: `집중�?닻——작은 생명체가 어떻�?당신�?책상�?붙잡�?두는가`, p: `집중은 스위치가 아니�? 그것은 피로해지�?근육이며, 실패�?순간은 보통 드라마틱하지 않다. 그것은 작은 결정�?연속이다: 이것�?잠깐 볼게. 그리�?�?하나. �?하나. 픽셀 펫은 집중�?닻으�?작동한다——방�?요소�?차단하는 것이 아니�? 떠나려고 생각�?때마�?주변 시야가 포착하는 시각�?닻점�?제공함으로써. 그것은 작업 표시줄의 같은 가장자리에 앉아, 세션�?거듭하고, 날을 거듭한다. 애니메이션은 환경적이�?예측 가능하�? �?깜빡�? 기지�? 조용�?타이핑 동작. 시간�?지나면 뇌는 �?작은 픽셀 존재�?'일하�?�?이라�?상태와 연결짓는�? 특정 플레이리스트가 '글 쓰는 시간'�?의미하고, 특정 의자가 '읽는 시간'�?의미하듯, 픽셀 펫은 집중�?위한 공간�?닻이 된다. 그것�?보는 순간, 뇌는 인식한다: 지금은 딥워�?시간이다. 그리�?여러 주에 걸친 세션�?통해 만들어진 �?연결은, 어떤 타이머�?차단기보다도 지속적 집중�?�?기여한다.` },
      { h: `다섯 성장 단계, 얕은 곳에�?깊은 곳으로`, p: `픽셀 펫은 정적�?아이콘이 아니�? 다섯 단계——베이비, 토들�? 틴에이저, 어덜�? 레전드——를 거쳐, 누적�?상호작용 시간�?따라 진화한다. 이제 �?집중 루틴�?시작�?리모�?워커�?�?�?동안 꾸준�?딥워�?세션�?거친 �?펫이 토들�?단계�?도달�?것을 볼지 모른�? 수년�?플로�?상태에서 지내온 시니�?엔지니어�?자신�?펫이 레전드에 가까워지�?것을 본다. 펫은 당신�?집중 여정�?타임라인이 된다——생산성 점수�?완료�?작업�?아니�? 당신�?나타�?머문 순수�?시간으로 측정된다. 잊고 있던 �?오후�?기억한다. 당신�?속도�? 당신�?함께 자란�? 놓친 하루�?연속 기록�?깨지 않는�? �?것이 없으니까. 힘든 �?주는 진전�?지우지 않는�? 진전은 매일�?일관성이 아니�?�?시간으로 측정되니�? 이것�?픽셀 펫을 점수 기록자가 아닌 집중�?동반자로 만든다——그리고 나쁜 �?�?후에 습관 트래커를 포기�?적이 있는 사람이라�? �?차이가 전부라는 것을 안다.` },
      { h: `솔로 집중에서 공유 딥워크로——두 개의 책상�?잇는 픽셀 펫`, p: `딥워크는 본질적으�?고독하지�? 픽셀 펫이 그럴 필요�?없다. Togthr�?컴패니언은 공유 소유�?지원한다——파트너, 친구, 동료와 계정�?연결�?�?있고, 같은 픽셀 생명체가 �?사람�?상호작용에서 성장한다. 당신�?직장 친한 친구 �?�?프로젝트 마감�?있다�?상상해보�? 다른 �? 다른 도시, 어쩌�?다른 시간대�?있다. 하지�?같은 작은 픽셀 생명체가 �?사람�?작업 표시줄에 앉아 있고, �?�?누군가 딥워�?세션�?하면 자란�? "어때?"라고 메시지�?보낼 필요가 없다. 펫은 이미 거기 있다——두 개의 책상�?잇는 조용하고 환경적인 다리. 책임 파트�? 리모�?동료, 서로 집중�?유지하기�?약속�?친구들에�? 이것�?가�?부드러�?공유 규율이다: 알림 없음, 압박 없음, 체크�?메시지 없음. 그저, �?사람�?것이�?�?사람�?노력에서 자라�?작은 생명체가, 조용�?상기시켜 준�? 다른 누군가�?책상�?앉아, 어려�?일을 하고 있다�?` },
    ],
    cta: `작업 표시�?가장자리에 픽셀 펫을. 딥워크는 그것�?있으�?조금 �?외로워진�?`,
    faqs: [
      { q: `픽셀 펫은 집중 타이머�?포모도로 앱과 같은 건가�?`, a: `아닙니다. 집중 타이머�?세션�?측정하고 지표를 제공합니다——작�?시간, 유지�?연속 기록, 생산�?추세. 픽셀 펫은 측정하지�? 채점하지�? 판단하지�?않습니다. 대시보드가 아니�?컴패니언입니�? �?가치는 생성하는 데이터가 아니�?제공하는 존재�?있습니다: 작은 애니메이�?생명체가 딥워크에 함께 앉아, 조용�?당신�?과제�?�?내리�?하는 �? 알림 피드가 아니�?작업 표시줄에 살고 있습니다.` },
      { q: `픽셀 펫이 실제�?집중력을 높여주나�?`, a: `집중�?강제하지�?않습니다——어�?도구�?그럴 �?없습니다. 그것�?하는 일은 뇌가 딥워�?세션�?연결짓는 법을 배우�?시각�?닻점�?제공하는 것입니다. 시간�?지나면 작업 표시줄의 픽셀 펫을 보는 것이 신호가 됩니�? "지금은 집중 모드�?" �?안정적이�?방해하지 않는 존재와 결합되어, 많은 사용자가 펫이 책상�?�?오래 머물�?�?방황하게 도와준다고 보고합니�? 방해 요소�?차단해서가 아니�? 책상�?도망치고 싶은 곳이라고 조금 �?느끼�?만들어주�?때문입니�?` },
      { q: `화면�?움직이�?펫이 있으�?산만하지 않나�?`, a: `산만함의 정반대�?설계되었습니�? 펫에�?팝업 알림�? 소리�? 주목 요구�? 게이미피케이션 메커니즘�?없습니다. 애니메이션은 아주 작고 환경적입니다——몇 초마�?�?깜빡�? 느린 기지�? 조용�?타이핑. 반응�?요구하는 것은 아무것도 없습니다. 처음 �?세션 �? 대부분의 사용자는 펫이 주변 인식으로 녹아든다�?말합니다——책�?�?작은 화분처럼. 힐끗 보면 거기 있고, 일에 깊이 빠지�?사라집니�?` },
      { q: `회사 컴퓨터에서도 작동하나�?`, a: `Togthr�?완전�?브라우저에서 실행됩니다——Windows, Mac, Linux, ChromeOS�?Chrome, Edge, Firefox, 기타 모던 브라우저. 다운로드�? 설치�? 관리자 권한�?필요 없어 대부분의 회사 �?기관 지�?PC에서 작동합니�? 탭을 작업 표시줄이�?Dock�?고정하면, 픽셀 펫은 작업 세션 내내 보입니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/pricing`, label: `Togthr 요금` },
      { href: `/ko/blog/desk-pet-for-coders`, label: `코더�?위한 데스�?펫` },
      { href: `/ko/blog/pixel-buddy-for-study-sessions`, label: `공부�?위한 픽셀 버디` },
      { href: `/ko/blog/quiet-companion-app-no-chat`, label: `채팅 없는 조용�?컴패니언 앱` },
    ],
  },

  de: {
    intro: `Deep Work ist nicht glamourös. Es ist ein Schreibtisch, ein Bildschirm, und Stunden, in denen das Schwierigste nicht die Arbeit ist �?sondern am Schreibtisch zu bleiben. Du setzt dich mit einer Aufgabe vor dich, und eine Weile ist alles in Ordnung. Dann vibriert das Handy. Eine Benachrichtigung gleitet herein. Ein Gedanke treibt vorbei: Das ist schwer, vielleicht sollte ich etwas nachschlagen, vielleicht brauche ich einen Kaffee, vielleicht ist die Antwort in einem Tab, den ich noch nicht geöffnet habe. Und die Deep-Work-Session, die du aufgebaut hast �?die, in der das Schwierige schließlich nachgeben würde �?löst sich leise in ein Dutzend kleiner Unterbrechungen auf, die sich produktiv anfühlen, aber das Gegenteil sind. Ein Pixel-Haustier für den Fokus ist kein Timer. Es ist kein Tracker. Es wird keine Benachrichtigungen blockieren oder deinen Browser sperren. Es ist eine winzige Pixel-Kreatur am Rand deiner Taskleiste �?ein Begleiter, der jede Deep-Work-Session mit dir durchsitzt, der wächst, wenn du bleibst, der nicht schimpft, wenn du abschweifst, und der langsam zum kleinsten, leisesten Anker wird, der dich am Schreibtisch hält, wenn die Arbeit schwer wird. Hier ist, warum es funktioniert, und warum die richtige Art von Fokus-Werkzeug überhaupt kein Werkzeug ist �?sondern eine Präsenz.`,
    sections: [
      { h: `Der Fokus-Schreibtisch ist ein einsamer Ort, und das ist der Punkt`, p: `Niemand spricht über die Einsamkeit der Deep Work. Sie sprechen über Flow. Über Produktivitätssysteme. Über die Pomodoro-Technik und Time Blocking und Inbox Zero. Aber die tatsächliche Erfahrung von Deep Work ist zutiefst einsam. Du bist allein mit einem Problem, dem deine Stimmung egal ist. Niemand schaut zu. Niemand prüft, ob du geblieben oder abgeschweift bist. Und dieses Fehlen eines Zeugen ist, leise, was Deep Work so schwer durchzuhalten macht �?denn es gibt keinen äußeren Druck, keine Rechenschaftspflicht, nichts außer deiner eigenen Willenskraft. Ein Pixel-Haustier ändert das auf die kleinstmögliche Weise. Es ist kein Chef. Es sendet keine Berichte. Es sitzt einfach in der Taskleiste, eine kleine Kreatur, die während deiner gesamten Session sichtbar präsent ist. Du schaust es an, und es schaut zurück �?eine winzige Bestätigung, dass du noch hier bist, noch arbeitest. Dieser kleine Moment der Zeugenschaft ist oft der Unterschied zwischen Durchhalten in der schweren Minute und dem Öffnen eines weiteren Tabs.` },
      { h: `Warum ein Pixel-Haustier und keine Produktivitäts-App`, p: `Produktivitäts-Apps sind darauf ausgelegt, dich zu verwalten. Timer zählen runter. Tracker zählen hoch. Blocker entfernen Verlockungen. Gamifier belohnen Serien. Alle arbeiten nach derselben Annahme: Du musst verwaltet werden. Ein Pixel-Haustier geht den umgekehrten Weg. Es verwaltet dich nicht, weil es nichts gibt, worauf es dich hin verwalten könnte. Kein Ziel. Keine zu haltende Serie. Kein Leaderboard. Kein Dashboard, das zeigt, wie du im Vergleich zur letzten Woche abgeschnitten hast. Das Pixel-Haustier ist einfach da �?eine kleine Kreatur, die neben deiner Arbeit existiert, nicht darüber. Wenn du am Schreibtisch bleibst, tippt es neben dir. Wenn du eine Pause machst, ruht es. Wenn du zurückkommst, kommt es zurück. Es beurteilt die Pause nicht. Es zieht keine Punkte ab. Es zeigt dir keinen Graphen deiner schwindenden Willenskraft um drei Uhr nachmittags. Und diese Abwesenheit von Urteil �?dieses vollständige Fehlen einer Agenda �?macht es anders. Es ist kein Werkzeug, das Fokus aufzwingt. Es ist eine Präsenz, die ihn einlädt.` },
      { h: `Der Fokus-Anker �?wie eine winzige Kreatur dich am Schreibtisch hält`, p: `Fokus ist kein Schalter. Er ist ein Muskel, der ermüdet, und der Moment des Scheiterns ist normalerweise nicht dramatisch. Es ist eine kleine Entscheidung: Ich schaue nur schnell das eine nach. Und dann noch eine kleine Entscheidung. Und noch eine. Das Pixel-Haustier wirkt als Fokus-Anker �?nicht indem es deine Ablenkungen blockiert, sondern indem es einen visuellen Ankerpunkt bietet, den dein peripheres Sehen jedes Mal registriert, wenn du ans Weggehen denkst. Es sitzt am selben Rand der Taskleiste, Session für Session, Tag für Tag. Seine Animationen sind ambient und vorhersehbar: ein Blinzeln, ein Strecken, eine leise Tippbewegung. Mit der Zeit verbindet dein Gehirn diese kleine Pixel-Präsenz mit dem Zustand des Am-Arbeiten-Seins. So wie eine bestimmte Playlist "Schreibzeit" signalisiert und ein bestimmter Stuhl "Lesezeit", wird das Pixel-Haustier zu einem räumlichen Anker für Fokus. In dem Moment, in dem du es siehst, registriert dein Gehirn: Wir machen jetzt Deep Work. Und diese Assoziation, über Wochen von Sitzungen aufgebaut, trägt mehr zu anhaltendem Fokus bei, als jeder Timer oder Blocker es je könnte.` },
      { h: `Fünf Wachstumsphasen, vom flachen Ende in die Tiefe`, p: `Ein Pixel-Haustier ist kein statisches Icon. Es entwickelt sich über fünf Phasen �?Baby, Kleinkind, Teenager, Erwachsener, Legende �?basierend auf kumulativer Interaktionszeit. Ein neuer Remote-Arbeiter, der sich eine Fokus-Routine aneignet, könnte sein Haustier nach einem Monat konsequenter Deep-Work-Sessions die Kleinkind-Phase erreichen sehen. Ein erfahrener Ingenieur, der Jahre in Flow-Zuständen verbracht hat, wird seins die Legende erreichen sehen. Das Haustier wird zu einer Zeitleiste deiner Fokus-Reise �?nicht gemessen in Produktivitätswerten oder erledigten Aufgaben, sondern in den schieren Stunden, die du aufgetaucht und geblieben bist. Es erinnert sich an die langen Nachmittage, die du vergessen hast. Es wächst mit dir, in deinem Tempo. Ein verpasster Tag durchbricht keine Serie, denn es gibt keine Serie zu durchbrechen. Eine harte Woche löscht keinen Fortschritt, denn Fortschritt wird in Gesamtzeit gemessen, nicht in täglicher Konstanz. Das macht das Pixel-Haustier zu einem Begleiter des Fokus, nicht zu einem Punktzähler �?und für jeden, der je einen Habit-Tracker nach einer schlechten Woche aufgegeben hat, ist dieser Unterschied alles.` },
      { h: `Vom Solo-Fokus zum gemeinsamen Deep Work �?das Pixel-Haustier, das zwei Schreibtische verbindet`, p: `Deep Work ist von Natur aus einsam, aber das Pixel-Haustier muss es nicht bleiben. Togthrs Begleiter unterstützt geteiltes Eigentum �?du und ein Partner, Freund oder Kollege könnt eure Konten verbinden, und dieselbe Pixel-Kreatur wächst aus eurer beider Interaktionen. Stell dir vor, du und dein bester Arbeitsfreund, ihr habt beide eine Projektfrist. Ihr seid in verschiedenen Wohnungen, verschiedenen Städten, vielleicht verschiedenen Zeitzonen. Aber dieselbe kleine Pixel-Kreatur sitzt auf beiden Taskleisten, und sie wächst, wann immer einer von euch eine Deep-Work-Session macht. Du musst nicht simsen "wie läuft's?". Das Haustier ist schon da �?eine leise, ambiente Brücke zwischen zwei Schreibtischen. Für Accountability-Partner, Remote-Kollegen oder Freunde, die sich gegenseitig Fokus versprochen haben, ist das die sanfteste Form gemeinsamer Disziplin: keine Benachrichtigungen, kein Druck, keine Check-in-Nachrichten. Nur eine kleine Kreatur, die euch beiden gehört, aus eurer beider Anstrengung wächst und leise daran erinnert, dass jemand anders auch am Schreibtisch sitzt und das Schwierige tut.` },
    ],
    cta: `Setz ein Pixel-Haustier an den Rand deiner Taskleiste. Deep Work wird ein bisschen weniger einsam damit.`,
    faqs: [
      { q: `Ist ein Pixel-Haustier dasselbe wie ein Fokus-Timer oder eine Pomodoro-App?`, a: `Nein. Ein Fokus-Timer misst deine Sessions und gibt dir Metriken �?gearbeitete Minuten, gehaltene Serien, Produktivitätstrends. Ein Pixel-Haustier misst nicht, bewertet nicht, beurteilt nicht. Es ist ein Begleiter, kein Dashboard. Sein Wert liegt nicht in den Daten, die es produziert, sondern in der Präsenz, die es bietet: eine kleine, animierte Kreatur, die mit dir durch die Deep Work sitzt und dich leise an der Aufgabe verankert. Es lebt in deiner Taskleiste, nicht in deinem Benachrichtigungs-Feed.` },
      { q: `Kann mir ein Pixel-Haustier tatsächlich helfen, mich besser zu konzentrieren?`, a: `Es erzwingt keinen Fokus �?das kann kein Werkzeug. Was es tut, ist einen visuellen Anker bereitzustellen, den dein Gehirn lernt, mit Deep-Work-Sessions zu verbinden. Mit der Zeit wird das Sehen des Pixel-Haustiers in der Taskleiste zu einem Signal: Wir sind jetzt im Fokus-Modus. Zusammen mit seiner stetigen, nicht unterbrechenden Präsenz berichten viele Nutzer, dass das Haustier ihnen hilft, länger am Schreibtisch zu bleiben und weniger abzuschweifen �?nicht weil es Ablenkungen blockiert, sondern weil es den Schreibtisch ein bisschen weniger wie einen Ort fühlen lässt, dem man entkommen möchte.` },
      { q: `Lenkt mich ein animiertes Haustier auf meinem Bildschirm nicht ab?`, a: `Es ist als das Gegenteil einer Ablenkung gestaltet. Das Haustier hat keine Pop-up-Benachrichtigungen, keine Geräusche, keine Aufmerksamkeitsforderungen, keine Gamification-Mechanismen. Seine Animationen sind winzig und ambient �?ein Blinzeln alle paar Sekunden, ein langsames Strecken, leises Tippen. Nichts verlangt eine Reaktion. Nach den ersten paar Sessions berichten die meisten Nutzer, dass das Haustier in die periphere Wahrnehmung übergeht �?wie eine kleine Pflanze auf dem Schreibtisch. Du siehst es, wenn du hinschaust, und es verschwindet, wenn du tief in der Arbeit bist.` },
      { q: `Funktioniert es auf meinem Arbeitsrechner?`, a: `Togthr läuft komplett im Browser �?Chrome, Edge, Firefox oder jeder moderne Browser unter Windows, Mac, Linux oder ChromeOS. Kein Download, kein Installer, keine Admin-Berechtigungen nötig, was bedeutet, dass es auf den meisten Firmen- und Behördenrechnern läuft. Du kannst den Tab an die Taskleiste oder das Dock anheften, und das Pixel-Haustier bleibt während deiner gesamten Arbeitssitzung sichtbar.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/pricing`, label: `Togthr Preise` },
      { href: `/de/blog/desk-pet-for-coders`, label: `Ein Schreibtisch-Haustier für Programmierer` },
      { href: `/de/blog/pixel-buddy-for-study-sessions`, label: `Ein Pixel-Buddy für Lernsessions` },
      { href: `/de/blog/quiet-companion-app-no-chat`, label: `Eine stille Begleiter-App ohne Chat` },
    ],
  },

  fr: {
    intro: `Le travail profond n'est pas glamour. C'est un bureau, un écran, et des heures où le plus dur n'est pas le travail �?c'est de rester au bureau. Vous vous asseyez avec une tâche devant vous, et pendant un moment tout va bien. Puis le téléphone vibre. Une notification glisse. Une pensée traverse : c'est dur, je devrais peut-être vérifier quelque chose, peut-être que j'ai besoin d'un café, peut-être que la réponse est dans un onglet que je n'ai pas encore ouvert. Et la session de travail profond que vous étiez en train de construire �?celle où la chose difficile finirait par céder �?se dissout doucement en une douzaine de petites interruptions qui semblent productives mais sont tout le contraire. Un pixel pet pour la concentration n'est pas un minuteur. Ce n'est pas un traqueur. Il ne bloquera pas vos notifications et ne verrouillera pas votre navigateur. C'est une minuscule créature pixel au bord de votre barre des tâches �?un compagnon qui traverse chaque session de travail profond avec vous, qui grandit quand vous restez, qui ne gronde pas quand vous vous égarez, et qui devient lentement la plus petite, la plus silencieuse des ancres vous gardant au bureau quand le travail devient dur. Voici pourquoi ça marche, et pourquoi le bon type d'outil de concentration n'est pas du tout un outil �?c'est une présence.`,
    sections: [
      { h: `Le bureau de concentration est un endroit solitaire, et c'est le but`, p: `Personne ne parle de la solitude du travail profond. On parle de flow. De systèmes de productivité. De la technique Pomodoro et du time blocking et de l'inbox zero. Mais l'expérience réelle du travail profond est profondément solitaire. Vous êtes seul avec un problème qui se fiche de votre humeur. Personne ne regarde. Personne ne vérifie si vous êtes resté ou si vous êtes parti. Et cette absence de témoin est, discrètement, ce qui rend le travail profond si difficile à maintenir �?parce qu'il n'y a pas de pression extérieure, pas de responsabilité, rien en dehors de votre propre volonté. Un pixel pet change cela de la plus petite façon possible. Ce n'est pas un patron. Il n'envoie pas de rapports. Il est simplement assis dans la barre des tâches, une petite créature visiblement présente tout au long de votre session. Vous le regardez, et il vous regarde en retour �?une toute petite reconnaissance que vous êtes encore là, encore en train de travailler. Ce petit moment de témoignage est souvent la différence entre tenir pendant la minute difficile et ouvrir un autre onglet.` },
      { h: `Pourquoi un pixel pet, et pas une appli de productivité`, p: `Les applis de productivité sont conçues pour vous gérer. Les minuteurs décomptent. Les traqueurs cumulent. Les bloqueurs suppriment les tentations. Les gamificateurs récompensent les séries. Toutes fonctionnent sur le même postulat : vous avez besoin d'être géré. Un pixel pet prend l'approche inverse. Il ne vous gère pas, parce qu'il n'a rien vers quoi vous gérer. Pas d'objectif. Pas de série à maintenir. Pas de classement. Pas de tableau de bord montrant comment vous avez performé par rapport à la semaine dernière. Le pixel pet est simplement là �?une petite créature qui existe à côté de votre travail, pas au-dessus. Quand vous restez au bureau, il tape à côté de vous. Quand vous prenez une pause, il se repose. Quand vous revenez, il revient. Il ne juge pas la pause. Il ne retire pas de points. Il ne vous montre pas un graphique de votre volonté en déclin à 15h. Et cette absence de jugement �?cette absence totale d'agenda �?c'est ce qui le rend différent. Ce n'est pas un outil qui impose la concentration. C'est une présence qui l'invite.` },
      { h: `L'ancre de concentration �?comment une minuscule créature vous garde au bureau`, p: `La concentration n'est pas un interrupteur. C'est un muscle qui fatigue, et le moment d'échec n'est généralement pas dramatique. C'est une petite décision : je vais juste vérifier ce truc. Et puis une autre petite décision. Et une autre. Le pixel pet agit comme une ancre de concentration �?non pas en bloquant vos distractions, mais en fournissant un point d'ancrage visuel que votre vision périphérique enregistre chaque fois que vous pensez à partir. Il est assis au même bord de la barre des tâches, session après session, jour après jour. Ses animations sont ambiantes et prévisibles : un clignement, un étirement, un mouvement de frappe silencieux. Avec le temps, votre cerveau associe cette petite présence pixel à l'état d'être au travail. Tout comme une playlist spécifique signale "temps d'écriture" et une chaise spécifique "temps de lecture", le pixel pet devient une ancre spatiale pour la concentration. Au moment où vous le voyez, votre cerveau enregistre : nous faisons du travail profond maintenant. Et cette association, construite à travers des semaines de sessions, fait plus pour la concentration soutenue que n'importe quel minuteur ou bloqueur ne pourrait jamais le faire.` },
      { h: `Cinq étapes de croissance, de la surface aux profondeurs`, p: `Un pixel pet n'est pas une icône statique. Il évolue à travers cinq étapes �?bébé, bambin, ado, adulte, légende �?basées sur le temps d'interaction cumulé. Un nouveau télétravailleur qui s'installe dans une routine de concentration pourrait voir son pet atteindre l'étape bambin après un mois de sessions de travail profond régulières. Un ingénieur senior qui a passé des années en état de flow verra le sien approcher de la légende. Le pet devient une chronologie de votre parcours de concentration �?mesurée non pas en scores de productivité ou en tâches accomplies, mais en heures pures où vous vous êtes présenté et êtes resté. Il se souvient des longs après-midi que vous avez oubliés. Il grandit avec vous, à votre rythme. Un jour manqué ne brise pas de série, car il n'y a pas de série à briser. Une semaine difficile n'efface pas le progrès, car le progrès est mesuré en temps total passé, pas en constance quotidienne. Cela fait du pixel pet un compagnon de concentration, pas un compteur de points �?et pour quiconque a déjà abandonné un traqueur d'habitudes après une mauvaise semaine, cette distinction est tout.` },
      { h: `De la concentration solo au travail profond partagé �?le pixel pet qui relie deux bureaux`, p: `Le travail profond est par nature solitaire, mais le pixel pet n'est pas obligé de le rester. Le compagnon de Togthr prend en charge la propriété partagée �?vous et un partenaire, ami ou collègue pouvez connecter vos comptes, et la même créature pixel grandit à partir de vos interactions à tous les deux. Imaginez que vous et votre meilleur ami de travail ayez tous les deux une échéance de projet. Vous êtes dans des maisons différentes, des villes différentes, peut-être des fuseaux horaires différents. Mais la même petite créature pixel est assise sur vos deux barres des tâches, et elle grandit chaque fois que l'un de vous fait une session de travail profond. Vous n'avez pas besoin d'envoyer un message "comment ça va ?". Le pet est déjà là �?un pont silencieux et ambiant entre deux bureaux. Pour les partenaires de responsabilité, les collègues à distance ou les amis qui se sont promis de rester concentrés, c'est la forme la plus douce de discipline partagée : pas de notifications, pas de pression, pas de messages de pointage. Juste une petite créature qui vous appartient à tous les deux, qui grandit de vos deux efforts, et qui rappelle doucement que quelqu'un d'autre est aussi à son bureau, en train de faire la chose difficile.` },
    ],
    cta: `Mettez un pixel pet au bord de votre barre des tâches. Le travail profond devient un peu moins solitaire avec lui.`,
    faqs: [
      { q: `Un pixel pet, c'est la même chose qu'un minuteur de concentration ou une appli Pomodoro ?`, a: `Non. Un minuteur de concentration mesure vos sessions et vous donne des métriques �?minutes travaillées, séries maintenues, tendances de productivité. Un pixel pet ne mesure pas, ne note pas, ne juge pas. C'est un compagnon, pas un tableau de bord. Sa valeur n'est pas dans les données qu'il produit mais dans la présence qu'il offre : une petite créature animée qui traverse le travail profond avec vous et vous ancre silencieusement à la tâche. Il vit dans votre barre des tâches, pas dans votre fil de notifications.` },
      { q: `Un pixel pet peut-il vraiment m'aider à mieux me concentrer ?`, a: `Il ne force pas la concentration �?aucun outil ne le peut. Ce qu'il fait, c'est fournir une ancre visuelle que votre cerveau apprend à associer aux sessions de travail profond. Avec le temps, voir le pixel pet dans la barre des tâches devient un signal : nous sommes en mode concentration maintenant. Combiné à sa présence stable et non intrusive, de nombreux utilisateurs rapportent que le pet les aide à rester au bureau plus longtemps et à moins s'égarer, non pas parce qu'il bloque les distractions, mais parce qu'il rend le bureau un peu moins comme un endroit qu'on veut fuir.` },
      { q: `Un animal animé sur mon écran ne va-t-il pas me distraire ?`, a: `Il est conçu pour être l'opposé d'une distraction. Le pet n'a pas de notifications pop-up, pas de sons, pas de demandes d'attention, pas de mécanismes de gamification. Ses animations sont minuscules et ambiantes �?un clignement toutes les quelques secondes, un lent étirement, une frappe silencieuse. Rien ne demande de réaction. Après les premières sessions, la plupart des utilisateurs rapportent que le pet passe en perception périphérique �?comme une petite plante sur le bureau. Vous le voyez quand vous regardez, et il disparaît quand vous êtes profondément dans le travail.` },
      { q: `Est-ce que ça fonctionne sur mon ordinateur de travail ?`, a: `Togthr fonctionne entièrement dans le navigateur �?Chrome, Edge, Firefox ou tout navigateur moderne sous Windows, Mac, Linux ou ChromeOS. Pas de téléchargement, pas d'installateur, pas de droits administrateur requis, ce qui signifie que ça fonctionne sur la plupart des machines fournies par les entreprises et les institutions. Vous pouvez épingler l'onglet à la barre des tâches ou au Dock, et le pixel pet reste visible pendant toute votre session de travail.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/pricing`, label: `Tarifs Togthr` },
      { href: `/fr/blog/desk-pet-for-coders`, label: `Un animal de bureau pour les codeurs` },
      { href: `/fr/blog/pixel-buddy-for-study-sessions`, label: `Un pixel buddy pour les sessions d'étude` },
      { href: `/fr/blog/quiet-companion-app-no-chat`, label: `Une appli compagnon silencieuse, sans chat` },
    ],
  },

  es: {
    intro: `El trabajo profundo no es glamuroso. Es un escritorio, una pantalla, y horas donde lo más difícil no es el trabajo �?es quedarse en el escritorio. Te sientas con una tarea delante, y durante un rato todo va bien. Luego vibra el teléfono. Se desliza una notificación. Un pensamiento cruza: esto es difícil, quizá debería revisar algo, quizá necesito un café, quizá la respuesta está en una pestaña que aún no he abierto. Y la sesión de trabajo profundo que estabas construyendo �?esa en la que lo difícil acabaría cediendo �?se disuelve silenciosamente en una docena de pequeñas interrupciones que parecen productivas pero son lo contrario. Un pixel pet para la concentración no es un temporizador. No es un rastreador. No va a bloquear tus notificaciones ni a cerrar tu navegador. Es una diminuta criatura pixel en el borde de tu barra de tareas �?un compañero que se sienta contigo en cada sesión de trabajo profundo, que crece cuando te quedas, que no regaña cuando divagas, y que lentamente se convierte en la ancla más pequeña y silenciosa que te mantiene en el escritorio cuando el trabajo se pone difícil. He aquí por qué funciona, y por qué el tipo correcto de herramienta de concentración no es una herramienta en absoluto �?es una presencia.`,
    sections: [
      { h: `El escritorio de concentración es un lugar solitario, y ese es el punto`, p: `Nadie habla de la soledad del trabajo profundo. Hablan del flow. De sistemas de productividad. De la técnica Pomodoro y del bloqueo de tiempo y del inbox zero. Pero la experiencia real del trabajo profundo es profundamente solitaria. Estás solo con un problema al que no le importa tu estado de ánimo. Nadie está mirando. Nadie comprueba si te quedaste o te fuiste. Y esa ausencia de testigo es, discretamente, lo que hace que el trabajo profundo sea tan difícil de mantener �?porque no hay presión externa, no hay rendición de cuentas, nada fuera de tu propia fuerza de voluntad. Un pixel pet cambia eso de la manera más pequeña posible. No es un jefe. No envía informes. Simplemente se sienta en la barra de tareas, una pequeña criatura visiblemente presente durante toda tu sesión. Lo miras, y te devuelve la mirada �?un diminuto reconocimiento de que todavía estás aquí, todavía trabajando. Ese pequeño momento de testimonio es a menudo la diferencia entre aguantar el minuto difícil y abrir otra pestaña.` },
      { h: `Por qué un pixel pet, y no una app de productividad`, p: `Las apps de productividad están diseñadas para gestionarte. Los temporizadores hacen cuenta atrás. Los rastreadores acumulan. Los bloqueadores eliminan tentaciones. Los gamificadores premian las rachas. Todas operan bajo la misma premisa: necesitas ser gestionado. Un pixel pet toma el enfoque contrario. No te gestiona, porque no tiene nada hacia lo que gestionarte. No hay objetivo. No hay racha que mantener. No hay tabla de clasificación. No hay panel mostrando cómo lo hiciste comparado con la semana pasada. El pixel pet simplemente está ahí �?una pequeña criatura que existe junto a tu trabajo, no por encima. Cuando te quedas en el escritorio, teclea a tu lado. Cuando tomas un descanso, descansa. Cuando vuelves, vuelve. No juzga el descanso. No resta puntos. No te muestra un gráfico de tu fuerza de voluntad en declive a las tres de la tarde. Y esa ausencia de juicio �?esa completa falta de agenda �?es lo que lo hace diferente. No es una herramienta que impone concentración. Es una presencia que la invita.` },
      { h: `El ancla de concentración �?cómo una diminuta criatura te mantiene en el escritorio`, p: `La concentración no es un interruptor. Es un músculo que se fatiga, y el momento de fallo no suele ser dramático. Es una pequeña decisión: voy a mirar solo esto. Y luego otra pequeña decisión. Y otra. El pixel pet actúa como ancla de concentración �?no bloqueando tus distracciones, sino proporcionando un punto de anclaje visual que tu visión periférica registra cada vez que piensas en irte. Se sienta en el mismo borde de la barra de tareas, sesión tras sesión, día tras día. Sus animaciones son ambientales y predecibles: un parpadeo, un estiramiento, un movimiento de tecleo silencioso. Con el tiempo, tu cerebro asocia esa pequeña presencia pixel con el estado de estar trabajando. Igual que una lista de reproducción específica señala "hora de escribir" y una silla específica "hora de leer", el pixel pet se convierte en un ancla espacial para la concentración. En el momento en que lo ves, tu cerebro registra: estamos haciendo trabajo profundo ahora. Y esa asociación, construida a lo largo de semanas de sesiones, hace más por la concentración sostenida de lo que cualquier temporizador o bloqueador podría hacer jamás.` },
      { h: `Cinco etapas de crecimiento, de la superficie a las profundidades`, p: `Un pixel pet no es un icono estático. Evoluciona a través de cinco etapas �?bebé, niño pequeño, adolescente, adulto, leyenda �?basadas en el tiempo de interacción acumulado. Un nuevo trabajador remoto que está estableciendo una rutina de concentración podría ver a su pet alcanzar la etapa de niño pequeño después de un mes de sesiones constantes de trabajo profundo. Un ingeniero senior que ha pasado años en estados de flow verá al suyo acercarse a leyenda. El pet se convierte en una línea de tiempo de tu viaje de concentración �?medida no en puntuaciones de productividad o tareas completadas, sino en las horas puras en que apareciste y te quedaste. Recuerda las largas tardes que olvidaste. Crece contigo, a tu ritmo. Un día perdido no rompe una racha, porque no hay racha que romper. Una semana difícil no borra el progreso, porque el progreso se mide en tiempo total, no en consistencia diaria. Esto hace del pixel pet un compañero de concentración, no un contador de puntos �?y para cualquiera que haya abandonado alguna vez un rastreador de hábitos después de una mala semana, esa distinción lo es todo.` },
      { h: `De la concentración en solitario al trabajo profundo compartido �?el pixel pet que conecta dos escritorios`, p: `El trabajo profundo es solitario por naturaleza, pero el pixel pet no tiene por qué quedarse así. El compañero de Togthr admite propiedad compartida �?tú y un compañero, amigo o colega podéis conectar vuestras cuentas, y la misma criatura pixel crece de las interacciones de ambos. Imagina que tú y tu mejor amigo del trabajo tenéis ambos una fecha límite de proyecto. Estáis en casas diferentes, ciudades diferentes, quizá zonas horarias diferentes. Pero la misma pequeña criatura pixel está en vuestras dos barras de tareas, y crece cada vez que cualquiera de los dos hace una sesión de trabajo profundo. No necesitas enviar un "¿cómo va?". El pet ya está ahí �?un puente silencioso y ambiental entre dos escritorios. Para compañeros de rendición de cuentas, colegas remotos o amigos que se prometieron mantenerse concentrados, esta es la forma más suave de disciplina compartida: sin notificaciones, sin presión, sin mensajes de check-in. Solo una pequeña criatura que os pertenece a los dos, que crece del esfuerzo de ambos, recordándote suavemente que alguien más también está en su escritorio haciendo lo difícil.` },
    ],
    cta: `Pon un pixel pet en el borde de tu barra de tareas. El trabajo profundo se vuelve un poco menos solitario con él.`,
    faqs: [
      { q: `¿Un pixel pet es lo mismo que un temporizador de concentración o una app Pomodoro?`, a: `No. Un temporizador de concentración mide tus sesiones y te da métricas �?minutos trabajados, rachas mantenidas, tendencias de productividad. Un pixel pet no mide, no puntúa, no juzga. Es un compañero, no un panel de control. Su valor no está en los datos que produce sino en la presencia que ofrece: una pequeña criatura animada que atraviesa el trabajo profundo contigo y te ancla silenciosamente a la tarea. Vive en tu barra de tareas, no en tu feed de notificaciones.` },
      { q: `¿Puede un pixel pet ayudarme realmente a concentrarme mejor?`, a: `No fuerza la concentración �?ninguna herramienta puede. Lo que hace es proporcionar un ancla visual que tu cerebro aprende a asociar con las sesiones de trabajo profundo. Con el tiempo, ver el pixel pet en la barra de tareas se convierte en una señal: estamos en modo concentración ahora. Combinado con su presencia estable y no intrusiva, muchos usuarios informan que el pet les ayuda a quedarse más tiempo en el escritorio y a divagar menos, no porque bloquee las distracciones, sino porque hace que el escritorio se sienta un poco menos como un lugar del que quieres escapar.` },
      { q: `¿No me distraerá una mascota animada en mi pantalla?`, a: `Está diseñado para ser lo contrario a una distracción. El pet no tiene notificaciones emergentes, ni sonidos, ni exigencias de atención, ni mecánicas de gamificación. Sus animaciones son diminutas y ambientales �?un parpadeo cada pocos segundos, un estiramiento lento, un tecleo silencioso. Nada pide una reacción. Después de las primeras sesiones, la mayoría de los usuarios dicen que el pet pasa a la percepción periférica �?como una pequeña planta en el escritorio. Lo ves cuando miras, y desaparece cuando estás profundamente en el trabajo.` },
      { q: `¿Funciona en mi ordenador del trabajo?`, a: `Togthr funciona completamente en el navegador �?Chrome, Edge, Firefox o cualquier navegador moderno en Windows, Mac, Linux o ChromeOS. Sin descarga, sin instalador, sin permisos de administrador, lo que significa que funciona en la mayoría de los equipos proporcionados por empresas e instituciones. Puedes anclar la pestaña a la barra de tareas o al Dock, y el pixel pet permanece visible durante toda tu sesión de trabajo.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/pricing`, label: `Precios de Togthr` },
      { href: `/es/blog/desk-pet-for-coders`, label: `Una mascota de escritorio para programadores` },
      { href: `/es/blog/pixel-buddy-for-study-sessions`, label: `Un pixel buddy para sesiones de estudio` },
      { href: `/es/blog/quiet-companion-app-no-chat`, label: `Una app compañera silenciosa, sin chat` },
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
          {body.cta} <Link href={'/' + loc} className="underline">Try Togthr free</Link>
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
              <Link href={withUtm(l.href, SLUG)} className="text-pink-400 hover:underline">{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
