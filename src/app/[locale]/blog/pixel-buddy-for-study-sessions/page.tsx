// src/app/[locale]/blog/pixel-buddy-for-study-sessions/page.tsx
//
// Job 1 daily blog 2026-08-01
// Topic: pixel-buddy-for-study-sessions + study-companion + student-life —
//        a small pixel companion that sits on your taskbar during long study
//        sessions, making the late-night library hours feel a little less
//        solitary. Group 2 (lonely-companion) keyword: "pixel buddy for
//        study sessions."
// Hook: Studying is lonely work. A pixel buddy does not do your reading
//       for you, but it sits through the hours with you — and sometimes
//       that is exactly enough.

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `pixel-buddy-for-study-sessions`
const POST_DATE = `2026-08-01`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  en: {
    intro: `Studying is lonely work. You sit at a desk or a library carrel, surrounded by people doing the same thing, and you are essentially alone. The person next to you is cramming for a different exam. The group three tables over is laughing about something unrelated to your textbook. And you are seven pages into a thirty-page chapter, with a highlighter in one hand and a dwindling sense of momentum in the other. A pixel buddy does not do your reading for you. It does not quiz you on flashcards or summarize your notes. But it sits on your taskbar through the long hours — the 10pm library session, the 2am thesis sprint, the Sunday afternoon you gave up to finish a problem set — and that small, steady presence is sometimes exactly enough to make the silence feel less like isolation and more like a chosen quiet. Here is why a pixel buddy for study sessions is the study tool nobody talks about, and why it works.`,
    sections: [
      { h: `The study desk is a lonely place, and it does not have to be`, p: `Nobody warns you about the loneliness of studying. They warn you about the workload. The deadlines. The all-nighters. But not the part where you are surrounded by people and still feel entirely on your own. Libraries are social spaces designed to feel anti-social. You are supposed to be quiet. You are supposed to be focused. And there is a strange tension in that — the feeling that you cannot reach out, cannot say "this is hard," because everyone else seems to be managing just fine. A pixel buddy cuts through that tension in a small way. It is not a person. It does not require a conversation. You do not have to explain why you are still on page seven at 11pm, or why this chapter makes no sense. It just sits there — a small pixel creature at the edge of your taskbar — being present. And presence, as it turns out, is half of what makes studying bearable. The other half is caffeine.` },
      { h: `Why a pixel buddy, and not a study group`, p: `Study groups are great in theory. In practice, they often become social hours, or they fall apart because nobody's schedule matches, or one person ends up doing all the work while everyone else nods along. A pixel buddy is the opposite of a study group. It will never talk over you. It will never show up late. It will never ask to borrow your notes and never return them. What it does instead is mirror your rhythm. When you are typing furiously — notes, essay, problem set — it taps at a tiny keyboard alongside you. When you pause to think, it pauses too. When you mark a study session as complete, it does a small celebration. It does not replace human connection. It just fills the study desk with one small, reliable presence — and for students who spend hours alone in libraries and dorm rooms, that is often exactly what is missing.` },
      { h: `The Pomodoro partner that does not judge you`, p: `Every student knows the Pomodoro technique: 25 minutes of focus, 5-minute break, repeat. And every student knows the feeling of ignoring the timer. Of saying "one more episode" and suddenly it is 11pm and the textbook has not moved. A pixel buddy is a Pomodoro partner with zero judgment. It does not count your skipped sessions. It does not show you a streak you broke. It does not have a graph of your declining productivity. It simply sits there — working when you work, idle when you rest — and its animations reflect the session, not the score. If you study for six hours straight, the buddy is there for all six. If you skip a day because you needed it, the buddy does not guilt you. It just waits. This absence of punishment is quietly revolutionary for students who already carry enough pressure. The buddy grows with cumulative interaction — not daily streaks — so a bad week does not erase weeks of progress. It grows on your schedule, and that makes it a companion, not a tracker.` },
      { h: `Five stages of growth, from cramming to commencement`, p: `A pixel buddy is not a static icon. Across five growth stages — infant, toddler, teen, adult, legend — it evolves based on the time and care you put in. A first-year undergrad pulling late nights for midterms might see their buddy reach the toddler stage by the end of the semester. A PhD candidate who has spent years writing a dissertation will see theirs hit legend. The buddy becomes a timeline of your academic life — not measured in grades, but in the sheer hours you showed up. It remembers the 3am sessions you forgot. It grows alongside you, not ahead of you, and never behind you. And that is a different kind of motivation than a grade: it is the quiet evidence that you have been here, doing the work, one session at a time.` },
      { h: `From solo study to shared focus — the pixel buddy that connects`, p: `The pixel buddy starts as a solo companion, but it does not have to stay that way. Togthr's companion can be shared with a partner, a friend, or a classmate — turning it from a solitary desk presence into a small, ambient bridge between two people. Imagine you and your best friend both have finals week. You are in different libraries, different cities, maybe different time zones. But there is a small pixel creature on both your taskbars that grows when either of you checks in. You do not need to text "good luck." The buddy is already there, silently reflecting the fact that someone else is also grinding through the same week. For study partners, long-distance classmates, or friends who promised to keep each other accountable, this is the gentlest form of shared focus — no app notifications, no pressure, just a small creature that belongs to both of you and grows from both your effort.` },
    ],
    cta: `Put a pixel buddy on your taskbar. The library gets a little warmer with it there.`,
    faqs: [
      { q: `Is a pixel buddy the same as a study timer app?`, a: `No. A study timer app tracks your sessions and gives you stats — minutes studied, streaks maintained, productivity scores. A pixel buddy does not track, score, or judge. It is a companion, not a dashboard. Its value is not in the data it gives you but in the presence it provides: a small, animated creature that sits with you through the work and quietly reflects your effort back at you. It lives on your taskbar, not in a notification feed.` },
      { q: `Can I share my pixel buddy with a classmate?`, a: `Yes. Togthr's companion supports shared ownership — you and one other person can link your accounts and the same pixel buddy grows from both of your interactions. It is designed for partners, friends, or anyone who wants a small, ambient shared presence. For study partners in different locations, it provides a gentle sense of studying-together without needing to coordinate schedules or send check-in messages.` },
      { q: `Does the pixel buddy distract me from studying?`, a: `It is designed to be the opposite of a distraction. The buddy has no pop-up notifications, no sounds, no demands for attention. It sits in your taskbar alongside your work tools. Its animations are small and ambient — a blink, a stretch, a typing motion — and they match your rhythm rather than interrupting it. Most students report that after the first few study sessions, the buddy fades into the background like a desk plant — there when you glance at it, invisible when you are focused.` },
      { q: `Does the pixel buddy work on my school laptop?`, a: `Togthr runs entirely in the browser — Chrome, Edge, Firefox, or any modern browser on Windows, Mac, Linux, or ChromeOS. There is no download, no installer, and no admin permissions required, which means it works on most school-issued laptops. You can pin the tab to your taskbar or dock, and the companion stays visible throughout your study session.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/pricing`, label: `Togthr pricing` },
      { href: `/en/blog/desk-pet-for-coders`, label: `A desk pet for coders` },
      { href: `/en/blog/lonely-desk-companion`, label: `The lonely desk companion` },
      { href: `/en/blog/quiet-companion-app-no-chat`, label: `A quiet companion app with no chat` },
    ],
  },

  'zh-cn': {
    intro: `学习是孤独的事。你坐在书桌前或图书馆的小隔间里，周围都是做同样事情的人，而你本质上是独自一人。旁边的人正在为另一门考试抱佛脚，三桌以外的小组在为和你的课本完全无关的事笑着。而你正翻到三十页章节的第七页，一手拿着荧光笔，另一只手握着逐渐流失的干劲。一只像素伙伴不会替你读书，不会用抽认卡考你，也不会帮你总结笔记。但它会在漫长的学习时间里坐在你的任务栏上——晚上十点的图书馆、凌晨两点的论文冲刺、你放弃整个周日下午就为了做完一套习题——而这种小小的、稳定的存在，有时候刚好足够让安静不再像孤立，而更像你选择了一种宁静。以下是为什么一只学习用的像素伙伴是没有人谈论的学习工具——以及它为何有效。`,
    sections: [
      { h: `书桌是个孤独的地方，但它不必如此`, p: `没人提醒你学习的孤独。他们提醒你课业负担。截止日期。通宵。但不是那种你被一群人包围、却仍然感到完全独自一人的那部分。图书馆是被设计成反社交的社交空间。你应该安静。你应该专注。而这里面有一种奇怪的张力——那种你不能伸手求助、不能说"这个好难"的感觉，因为其他人看起来都应付自如。一只像素伙伴以一种小小的方式切开了这种张力。它不是人。它不需要对话。你不需要解释为什么晚上十一点了你还在第七页，为什么这章完全看不懂。它只是待在那里——一只小小的像素生物，在你任务栏的边缘——存在着。而陪伴本身，恰好就是让学习变得可以忍受的一半。另一半是咖啡因。` },
      { h: `为什么是一只像素伙伴，而不是学习小组`, p: `学习小组在理论上很好。实际操作中，它们常常变成社交时间，或者因为谁的日程都对不上而散伙，或者一个人做完了所有工作而其他人只是点头。一只像素伙伴是学习小组的反面。它永远不会打断你，永远不会迟到，永远不会借你的笔记然后不还。它做的事是映射你的节奏。当你疯狂敲键盘——笔记、论文、习题——它在旁边敲着一只小小的键盘。你停下来思考，它也停下来。你标记一个学习任务完成，它就做出一个小小的庆祝动作。它不替代人的连接。它只是在书桌上填满一个小小的、可靠的存在——而对那些在图书馆和宿舍里独自度过数小时的学生来说，这往往就是缺失的那一块。` },
      { h: `不评判你的番茄钟搭档`, p: `每个学生都知道番茄钟技法：25分钟专注，5分钟休息，重复。每个学生也都知道无视计时器的感觉。说着"再看一集"，然后突然就晚上十一点了，而课本纹丝未动。一只像素伙伴是一个零评判的番茄钟搭档。它不计你跳过的次数，不显示你中断了的连续记录，不画你生产力下降的图表。它只是待在那里——你工作它就工作，你休息它就待机——它的动画反映的是状态，不是分数。如果你连续学了六小时，伙伴全程都在。如果你因为需要而跳过一天，伙伴不会给你压力，只是等着。这种没有惩罚的设计，对于已经背负足够压力的学生来说，是悄悄的革命性的。伙伴的成长靠累积互动——不是每日打卡——所以糟糕的一周不会抹掉几周的进度。它按照你的节奏成长，这让它是伙伴，而不是追踪器。` },
      { h: `五个成长阶段，从抱佛脚到毕业`, p: `一只像素伙伴不是一个静态图标。跨越五个成长阶段——婴儿、学步、少年、成年、传说——它根据你投入的时间和关爱进化。一个大一本科生为期中考试熬夜，可能在学期末看到伙伴到达学步阶段。一个花了数年写论文的博士生，会看到自己的伙伴达到传说。伙伴变成了你学术生涯的时间线——不是用成绩衡量的，而是用你出现的纯粹小时数。它记得你忘记的那些凌晨三点。它和你一起成长，不是在你前面，也从不在你后面。而这是一种与分数不同的动力：它安静地证明你在这里，做着这件事，一次学习一段。` },
      { h: `从独自学习到共享专注——会连接的像素伙伴`, p: `像素伙伴最初是一个单独的伴侣，但它不必一直是。Togthr 的伙伴可以和伴侣、朋友或同学共享——把它从一个独自的桌面存在，变成一个在两个人之间小小的环境桥梁。想象你和好朋友都有期末考试周。你们在不同的图书馆，不同的城市，甚至不同的时区。但有一个小小的像素生物在你们两个的任务栏上，当你们任何一个人签到的时候它就会成长。你不需要发"加油"。伙伴已经在那边了，无声地反映着另一个人也在同一周拼命的事实。对学习搭子、异地同学、或者答应互相督促的朋友来说，这是最温柔的共享专注方式——没有 App 通知，没有压力，只有一只小小的生物，属于你们两个人，从你们两个人的努力中成长。` },
    ],
    cta: `在任务栏上放一只像素伙伴。图书馆有它在，会暖和一点。`,
    faqs: [
      { q: `像素伙伴和学习计时器 App 是一回事吗？`, a: `不是。学习计时器 App 追踪你的学习时段，给你数据——学了多久、连续记录保持得怎么样、生产力分数。像素伙伴不追踪、不评分、不评判。它是一个伙伴，不是一个仪表盘。它的价值不在它给你的数据，而在它提供的存在：一个小小的、有动画的生物，陪你做功课，安静地把你的努力映照回来。它住在你的任务栏上，不在通知推送里。` },
      { q: `我可以和同学分享像素伙伴吗？`, a: `可以。Togthr 的伙伴支持共享所有权——你和另一个人可以关联账户，同一只像素伙伴从你们两个人的互动中共同成长。它专为伴侣、朋友或任何想要一种小小的环境式共享存在的人设计。对异地学习搭子来说，它提供了一种温柔的一起学习的感觉，不需要协调时间或发签到消息。` },
      { q: `像素伙伴会让我分心吗？`, a: `它的设计方向就是分心的反面。伙伴没有弹窗通知、没有声音、不需要注意力。它住在任务栏上，和你的学习工具在一起。它的动画是小而环境式的——眨眼、拉伸、打字动作——它们配合你的节奏，而不是打断。大部分学生反映，前几次学习之后，伙伴就像桌上的一盆植物一样退入了背景——你看的时候它在，你专注的时候就看不见了。` },
      { q: `像素伙伴能在我的学校电脑上运行吗？`, a: `Togthr 完全在浏览器里运行——Windows、Mac、Linux 或 ChromeOS 上的 Chrome、Edge、Firefox 或任何现代浏览器。不需要下载、不需要安装、不需要管理员权限，这意味着它能在大多数学校发的笔记本电脑上运行。你可以把标签页固定到任务栏或 Dock，伙伴就会在整个学习过程中保持可见。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/pricing`, label: `Togthr 定价` },
      { href: `/zh-cn/blog/desk-pet-for-coders`, label: `给程序员的桌面宠物` },
      { href: `/zh-cn/blog/lonely-desk-companion`, label: `那只孤独的桌面伴侣` },
      { href: `/zh-cn/blog/quiet-companion-app-no-chat`, label: `一款不需要聊天的安静陪伴 App` },
    ],
  },

  'zh-tw': {
    intro: `學習是孤獨的事。你坐在書桌前或圖書館的小隔間裡，周圍都是做同樣事情的人，而你本質上是獨自一人。旁邊的人正在為另一門考試抱佛腳，三桌以外的小組在為和你的課本完全無關的事笑著。而你正翻到三十頁章節的第七頁，一手拿著螢光筆，另一手握著逐漸流失的幹勁。一隻像素夥伴不會替你讀書，不會用抽認卡考你，也不會幫你總結筆記。但它會在漫長的學習時間裡坐在你的工作列上——晚上十點的圖書館、凌晨兩點的論文衝刺、你放棄整個週日下午就為了做完一套習題——而這種小小的、穩定的存在，有時候剛好足夠讓安靜不再像孤立，而更像你選擇了一種寧靜。以下是為什麼一隻學習用的像素夥伴是沒有人談論的學習工具——以及它為何有效。`,
    sections: [
      { h: `書桌是個孤獨的地方，但它不必如此`, p: `沒人提醒你學習的孤獨。他們提醒你課業負擔。截止日期。通宵。但不是那種你被一群人包圍、卻仍然感到完全獨自一人的那部分。圖書館是被設計成反社交的社交空間。你應該安靜。你應該專注。而這裡面有一種奇怪的張力——那種你不能伸手求助、不能說「這個好難」的感覺，因為其他人看起來都應付自如。一隻像素夥伴以一種小小的方式切開了這種張力。它不是人。它不需要對話。你不需要解釋為什麼晚上十一點了你還在第七頁，為什麼這章完全看不懂。它只是待在那裡——一隻小小的像素生物，在你工作列的邊緣——存在著。而陪伴本身，恰好就是讓學習變得可以忍受的一半。另一半是咖啡因。` },
      { h: `為什麼是一隻像素夥伴，而不是學習小組`, p: `學習小組在理論上很好。實際操作中，它們常常變成社交時間，或者因為誰的日程都對不上而散夥，或者一個人做完了所有工作而其他人只是點頭。一隻像素夥伴是學習小組的反面。它永遠不會打斷你，永遠不會遲到，永遠不會借你的筆記然後不還。它做的事是映射你的節奏。當你瘋狂敲鍵盤——筆記、論文、習題——它在旁邊敲著一隻小小的鍵盤。你停下來思考，它也停下來。你標記一個學習任務完成，它就做出一個小小的慶祝動作。它不替代人的連結。它只是在書桌上填滿一個小小的、可靠的存在——而對那些在圖書館和宿舍裡獨自度過數小時的學生來說，這往往就是缺失的那一塊。` },
      { h: `不評判你的番茄鐘搭檔`, p: `每個學生都知道番茄鐘技法：25分鐘專注，5分鐘休息，重複。每個學生也都知道無視計時器的感覺。說著「再看一集」，然後突然就晚上十一點了，而課本紋絲未動。一隻像素夥伴是一個零評判的番茄鐘搭檔。它不計你跳過的次數，不顯示你中斷了的連續記錄，不畫你生產力下降的圖表。它只是待在那裡——你工作它就工作，你休息它就待機——它的動畫反映的是狀態，不是分數。如果你連續學了六小時，夥伴全程都在。如果你因為需要而跳過一天，夥伴不會給你壓力，只是等著。這種沒有懲罰的設計，對於已經背負足夠壓力的學生來說，是悄悄的革命性的。夥伴的成長靠累積互動——不是每日打卡——所以糟糕的一週不會抹掉幾週的進度。它按照你的節奏成長，這讓它是夥伴，而不是追蹤器。` },
      { h: `五個成長階段，從抱佛腳到畢業`, p: `一隻像素夥伴不是一個靜態圖示。跨越五個成長階段——嬰兒、學步、少年、成年、傳說——它根據你投入的時間和關愛進化。一個大一本科生為期中考試熬夜，可能在學期末看到夥伴到達學步階段。一個花了數年寫論文的博士生，會看到自己的夥伴達到傳說。夥伴變成了你學術生涯的時間線——不是用成績衡量的，而是用你出現的純粹小時數。它記得你忘記的那些凌晨三點。它和你一起成長，不是在你前面，也從不在你後面。而這是一種與分數不同的動力：它安靜地證明你在這裡，做著這件事，一次學習一段。` },
      { h: `從獨自學習到共享專注——會連結的像素夥伴`, p: `像素夥伴最初是一個單獨的伴侶，但它不必一直是。Togthr 的夥伴可以和伴侶、朋友或同學共享——把它從一個獨自的桌面存在，變成一個在兩個人之間小小的環境橋樑。想像你和好朋友都有期末考試週。你們在不同的圖書館，不同的城市，甚至不同的時區。但有一個小小的像素生物在你們兩個的工作列上，當你們任何一個人簽到的時候它就會成長。你不需要傳「加油」。夥伴已經在那邊了，無聲地反映著另一個人也在同一週拼命的事實。對學習搭子、異地同學、或者答應互相督促的朋友來說，這是最溫柔的共享專注方式——沒有 App 通知，沒有壓力，只有一隻小小的生物，屬於你們兩個人，從你們兩個人的努力中成長。` },
    ],
    cta: `在工作列上放一隻像素夥伴。圖書館有牠在，會暖和一點。`,
    faqs: [
      { q: `像素夥伴和學習計時器 App 是同一回事嗎？`, a: `不是。學習計時器 App 追蹤你的學習時段，給你數據——學了多久、連續記錄保持得怎麼樣、生產力分數。像素夥伴不追蹤、不評分、不評判。它是一個夥伴，不是一個儀表板。它的價值不在它給你的數據，而在它提供的存在：一個小小的、有動畫的生物，陪你做功課，安靜地把你的努力映照回來。它住在你的工作列上，不在通知推送裡。` },
      { q: `我可以和同學分享像素夥伴嗎？`, a: `可以。Togthr 的夥伴支援共享所有權——你和另一個人可以關聯帳戶，同一隻像素夥伴從你們兩個人的互動中共同成長。它專為伴侶、朋友或任何想要一種小小的環境式共享存在的人設計。對異地學習搭子來說，它提供了一種溫柔的一起學習的感覺，不需要協調時間或傳簽到訊息。` },
      { q: `像素夥伴會讓我分心嗎？`, a: `它的設計方向就是分心的反面。夥伴沒有彈窗通知、沒有聲音、不需要注意力。它住在工作列上，和你的學習工具在一起。它的動畫是小而環境式的——眨眼、拉伸、打字動作——它們配合你的節奏，而不是打斷。大部分學生反映，前幾次學習之後，夥伴就像桌上的一盆植物一樣退入了背景——你看的時候牠在，你專注的時候就看不見了。` },
      { q: `像素夥伴能在我的學校電腦上執行嗎？`, a: `Togthr 完全在瀏覽器裡執行——Windows、Mac、Linux 或 ChromeOS 上的 Chrome、Edge、Firefox 或任何現代瀏覽器。不需要下載、不需要安裝、不需要管理員權限，這意味著它能在大多數學校發的筆記型電腦上執行。你可以把分頁固定到工作列或 Dock，夥伴就會在整個學習過程中保持可見。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/pricing`, label: `Togthr 定價` },
      { href: `/zh-tw/blog/desk-pet-for-coders`, label: `給程式設計師的桌面寵物` },
      { href: `/zh-tw/blog/lonely-desk-companion`, label: `那隻孤獨的桌面伴侶` },
      { href: `/zh-tw/blog/quiet-companion-app-no-chat`, label: `一款不需要聊天的安靜陪伴 App` },
    ],
  },

  ja: {
    intro: `勉強は孤独な仕事だ。机や図書館のキャレルに座り、同じことをしている人々に囲まれているのに、本質的には一人だ。隣の人は別の試験のために詰め込み中。三つ向こうのテーブルのグループは、あなたの教科書とは関係ないことで笑っている。そしてあなたは、全三十ページある章の七ページ目にいて、片手に蛍光ペン、もう片方の手に薄れゆく勢いを握っている。ピクセルバディはあなたの代わりに読書をしない。フラッシュカードでクイズを出さず、ノートを要約もしない。しかし長い時間——夜十時の図書館、深夜二時の論文スプリント、問題集を終えるために犠牲にした日曜の午後——タスクバーに座り続け、その小さく安定した存在が、沈黙を孤立ではなく選ばれた静けさのように感じさせるのに、ちょうど十分なことがある。勉強のためのピクセルバディが、誰も語らない学習ツールである理由、そしてなぜ機能するのか。`,
    sections: [
      { h: `勉強机は孤独な場所だ。でも、そうである必要はない`, p: `勉強の孤独について、誰も警告してくれない。警告されるのは作業量。締め切り。徹夜。でも、人に囲まれていながら完全に一人だと感じる、その部分ではない。図書館は反社交的にデザインされた社交空間だ。静かにすべき。集中すべき。そしてそこには奇妙な緊張がある——手を伸ばせない、「これ難しい」と言えない、他の人はみんなうまくやっているように見えるから。ピクセルバディはその緊張を小さく切り裂く。それは人ではない。会話を必要としない。なぜ夜十一時にまだ七ページ目にいるのか、なぜこの章がまったく理解できないのか、説明する必要はない。ただそこに座っている——タスクバーの端にある小さなドットの生き物——存在している。そして存在こそが、実は勉強を耐えられるものにする半分だ。残りの半分はカフェイン。` },
      { h: `なぜピクセルバディで、勉強会ではないのか`, p: `勉強会は理論上は素晴らしい。実際には社交の時間になるか、誰のスケジュールも合わずに解散するか、一人がすべての作業をして他の人はうなずいているだけか。ピクセルバディは勉強会の正反対だ。決して話を遮らず、決して遅刻せず、決してノートを借りて返さないこともない。代わりにあなたのリズムを映す。猛烈にタイピングしているとき——ノート、エッセイ、問題集——隣で小さなキーボードを叩く。考え込んで止まれば、それも止まる。勉強セッションを完了とマークすれば、小さなお祝いをする。人間のつながりを置き換えない。ただ勉強机に一つの小さく信頼できる存在を満たす——そして図書館や寮の部屋で何時間も一人で過ごす学生にとって、それはまさに欠けていたものだ。` },
      { h: `あなたをジャッジしないポモドーロパートナー`, p: `どの学生もポモドーロテクニックを知っている：25分集中、5分休憩、繰り返し。そしてどの学生もタイマーを無視する感覚を知っている。「あと一話」と言って、気づけば夜十一時、教科書は動いていない。ピクセルバディはゼロ判定のポモドーロパートナーだ。スキップしたセッションを数えず、途切れた連続記録を表示せず、生産性低下のグラフを見せない。ただそこに座っている——あなたが働けば働き、休めば待機する——そのアニメーションはスコアではなくセッションを映す。六時間ぶっ通しで勉強すれば、バディは六時間すべてそこにいる。必要があって一日スキップすれば、バディは罪悪感を与えず、ただ待つ。この罰の不在は、すでに十分なプレッシャーを背負う学生にとって、静かに革命的なことだ。バディの成長は累積的なインタラクション——日々の連続記録ではない——で進むので、悪い一週間が数週間の進歩を消し去ることはない。あなたのスケジュールで成長する。それこそが、バディをトラッカーではなくコンパニオンにする。` },
      { h: `五つの成長段階、一夜漬けから卒業まで`, p: `ピクセルバディは静的なアイコンではない。五つの成長段階——ベビー、幼児、ティーン、アダルト、レジェンド——を経て、あなたが注いだ時間とケアに基づいて進化する。中間試験のために夜遅くまで勉強する大学一年生は、学期末にバディが幼児段階に達するのを見るかもしれない。何年も論文を書いてきた博士課程の学生は、自分のバディがレジェンドに達するのを見る。バディはあなたの学業生活のタイムラインになる——成績ではなく、あなたが現れた純粋な時間数で測られる。それはあなたが忘れた午前三時のセッションを覚えている。それはあなたと一緒に成長し、あなたの前でも後ろでもない。そしてそれは成績とは違う種類のモチベーションだ：あなたがここにいて、一セッションずつ、その仕事をしてきたことの静かな証拠。` },
      { h: `ソロ勉強から共有集中へ——つながるピクセルバディ`, p: `ピクセルバディはソロのコンパニオンとして始まるが、そのままでいる必要はない。Togthrのコンパニオンはパートナーや友人、クラスメートと共有できる——孤独なデスクトップの存在から、二人の間の小さな環境的架け橋へと変わる。あなたと親友の両方が期末試験週間だと想像してみて。違う図書館、違う街、もしかしたら違うタイムゾーンにいる。でも二人のタスクバーには、どちらかがチェックインするたびに成長する小さなドットの生き物がいる。「がんばって」とテキストする必要はない。バディはもうそこにいて、他の誰かも同じ週を必死に過ごしているという事実を静かに反映している。勉強パートナー、遠距離のクラスメート、お互いにアカウンタビリティを約束した友人にとって、これが最も優しい共有集中の形——アプリ通知なし、プレッシャーなし、ただ二人のものであり、二人の努力から成長する小さな生き物がいるだけ。` },
    ],
    cta: `タスクバーにピクセルバディを。図書館が少しだけ暖かくなる。`,
    faqs: [
      { q: `ピクセルバディは勉強タイマーアプリと同じですか？`, a: `いいえ。勉強タイマーアプリはセッションを追跡し、統計を表示します——勉強時間、継続記録、生産性スコア。ピクセルバディは追跡も採点も判定もしません。ダッシュボードではなくコンパニオンです。その価値は与えるデータではなく、提供する存在にあります：小さなアニメーションする生き物が、あなたと一緒に作業に座り、静かにあなたの努力を映し返すこと。通知フィードではなく、タスクバーに住んでいます。` },
      { q: `ピクセルバディをクラスメートと共有できますか？`, a: `はい。Togthrのコンパニオンは共有所有をサポートしています——あなたともう一人がアカウントをリンクすると、同じピクセルバディが二人のインタラクションから成長します。パートナーや友人、小さな環境的共有存在を望む誰のためにも設計されています。異なる場所にいる勉強パートナーにとっては、スケジュールを調整したりチェックインメッセージを送ったりする必要なしに、一緒に勉強しているという優しい感覚を提供します。` },
      { q: `ピクセルバディは勉強の邪魔になりますか？`, a: `邪魔の正反対に設計されています。バディにはポップアップ通知も、音も、注意を引く仕掛けもありません。勉強ツールと並んでタスクバーに座っています。アニメーションは小さく環境的で——まばたき、伸び、タイピングの動き——あなたのリズムに合わせ、中断するのではありません。多くの学生が、最初の数回の勉強セッションの後、バディは机の上の観葉植物のように背景に溶け込むと報告しています——ちらりと見ればそこにいて、集中していれば見えなくなる。` },
      { q: `学校のノートPCでピクセルバディは使えますか？`, a: `Togthrは完全にブラウザ上で動作します——Windows、Mac、Linux、ChromeOSのChrome、Edge、Firefox、その他モダンブラウザ。ダウンロードもインストールも管理者権限も不要で、ほとんどの学校支給ノートPCで動作します。タブをタスクバーやDockにピン留めすれば、コンパニオンは勉強セッション中ずっと見えています。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/pricing`, label: `Togthr 料金` },
      { href: `/ja/blog/desk-pet-for-coders`, label: `コーダーのためのデスクペット` },
      { href: `/ja/blog/lonely-desk-companion`, label: `孤独なデスクコンパニオン` },
      { href: `/ja/blog/quiet-companion-app-no-chat`, label: `チャット不要の静かなコンパニオンアプリ` },
    ],
  },

  ko: {
    intro: `공부는 외로운 일이다. 책상이나 도서관 칸막이에 앉아, 같은 일을 하는 사람들에 둘러싸여 있지만, 본질적으로는 혼자다. 옆 사람은 다른 시험을 위해 벼락치기 중이다. 세 테이블 건너 그룹은 당신 교과서와 상관없는 이야기로 웃고 있다. 그리고 당신은 삼십 페이지 챕터의 일곱 번째 페이지에 있고, 한 손에는 형광펜, 다른 손에는 점점 사라져가는 의욕을 쥐고 있다. 픽셀 버디는 당신을 대신해 책을 읽지 않는다. 플래시카드로 퀴즈를 내지 않고, 노트를 요약하지도 않는다. 하지만 긴 시간 동안——밤 열 시의 도서관, 새벽 두 시의 논문 스프린트, 문제집을 끝내기 위해 희생한 일요일 오후——작업 표시줄에 앉아 있고, 그 작고 꾸준한 존재가 침묵을 고립이 아니라 선택된 고요로 느껴지게 하기에, 때로는 딱 충분하다. 공부를 위한 픽셀 버디가 아무도 말하지 않는 학습 도구인 이유, 그리고 왜 효과가 있는지.`,
    sections: [
      { h: `공부 책상은 외로운 곳이다. 그럴 필요가 없는데도`, p: `공부의 외로움에 대해 아무도 경고하지 않는다. 경고하는 것은 작업량. 마감일. 밤샘. 그러나 사람들에 둘러싸여 있으면서도 완전히 혼자라고 느끼는 그 부분이 아니다. 도서관은 반사회적으로 디자인된 사교 공간이다. 조용해야 한다. 집중해야 한다. 그리고 거기에는 이상한 긴장이 있다——손을 뻗을 수 없다는 느낌, "이거 어려워"라고 말할 수 없다는 느낌, 모두가 잘 해내고 있는 것처럼 보이니까. 픽셀 버디는 그 긴장을 작게 가른다. 사람이 아니다. 대화가 필요하지 않다. 왜 밤 열한 시에 아직 일곱 페이지째인지, 왜 이 챕터가 전혀 이해되지 않는지 설명할 필요가 없다. 그냥 거기 앉아 있다——작업 표시줄 가장자리의 작은 픽셀 생명체——존재하고 있다. 그리고 존재야말로, 실은 공부를 견딜 수 있게 만드는 절반이다. 나머지 절반은 카페인.` },
      { h: `왜 픽셀 버디인가, 스터디 그룹이 아니라`, p: `스터디 그룹은 이론상 훌륭하다. 실제로는 사교 시간이 되거나, 누구의 일정도 맞지 않아 흩어지거나, 한 사람이 모든 일을 하고 나머지는 고개만 끄덕인다. 픽셀 버디는 스터디 그룹의 정반대다. 결코 당신의 말을 끊지 않고, 결코 늦지 않으며, 결코 당신의 노트를 빌려가서 돌려주지 않는 일도 없다. 대신 당신의 리듬을 비춘다. 미친 듯이 타자를 칠 때——노트, 에세이, 문제집——옆에서 작은 키보드를 두드린다. 생각에 잠겨 멈추면, 함께 멈춘다. 공부 세션을 완료로 표시하면, 작은 축하를 한다. 인간적 연결을 대체하지 않는다. 그저 공부 책상에 하나의 작고 믿을 수 있는 존재를 채운다——그리고 도서관과 기숙사 방에서 몇 시간씩 혼자 보내는 학생들에게, 그게 바로 없었던 것이다.` },
      { h: `당신을 판단하지 않는 포모도로 파트너`, p: `모든 학생이 포모도로 기법을 안다: 25분 집중, 5분 휴식, 반복. 그리고 모든 학생이 타이머를 무시하는 기분을 안다. "한 편만 더"라고 말하고, 어느새 밤 열한 시, 교과서는 움직이지 않았다. 픽셀 버디는 제로 판단의 포모도로 파트너다. 건너뛴 세션을 세지 않고, 깨진 연속 기록을 보여주지 않으며, 생산성 하락 그래프도 보여주지 않는다. 그냥 거기 앉아 있다——당신이 일하면 일하고, 쉬면 대기한다——그 애니메이션은 점수가 아니라 세션을 비춘다. 여섯 시간을 연속으로 공부하면, 버디는 여섯 시간 내내 거기 있다. 필요해서 하루를 건너뛰면, 버디는 죄책감 없이 그냥 기다린다. 이런 처벌의 부재는 이미 충분한 압박을 짊어진 학생들에게 조용히 혁명적이다. 버디의 성장은 누적적인 상호작용으로 진행된다——매일 연속 기록이 아니다——나쁜 한 주가 몇 주의 진전을 지우지 않는다. 당신의 일정에 맞춰 자란다. 그게 버디를 트래커가 아닌 컴패니언으로 만든다.` },
      { h: `다섯 성장 단계, 벼락치기부터 졸업까지`, p: `픽셀 버디는 정적인 아이콘이 아니다. 다섯 성장 단계——베이비, 토들러, 틴에이저, 어덜트, 레전드——를 거쳐, 당신이 쏟은 시간과 보살핌에 따라 진화한다. 중간고사를 위해 밤늦게까지 공부하는 대학 1학년은 학기 말에 버디가 토들러 단계에 도달하는 걸 볼지 모른다. 몇 년 동안 논문을 써온 박사 과정생은 자신의 버디가 레전드에 도달하는 걸 본다. 버디는 당신의 학업 생활의 타임라인이 된다——성적이 아니라, 당신이 출석한 순수한 시간으로 측정되는. 당신이 잊은 새벽 세 시의 세션을 기억한다. 당신과 함께 자라며, 당신보다 앞서지도 뒤처지지도 않는다. 그리고 그것은 성적과는 다른 종류의 동기부여다: 당신이 여기 있었다는, 한 세션씩, 그 일을 해왔다는 조용한 증거.` },
      { h: `혼공에서 공유 집중으로——연결되는 픽셀 버디`, p: `픽셀 버디는 솔로 컴패니언으로 시작하지만, 그대로일 필요는 없다. Togthr의 컴패니언은 파트너, 친구, 또는 동급생과 공유할 수 있다——고독한 데스크톱 존재에서, 두 사람 사이의 작은 환경적 다리로 변한다. 당신과 가장 친한 친구 모두 기말고사 주간이라고 상상해보라. 다른 도서관, 다른 도시, 어쩌면 다른 시간대에 있다. 하지만 두 사람의 작업 표시줄에는, 누군가 체크인할 때마다 자라는 작은 픽셀 생명체가 있다. "힘내"라고 문자할 필요가 없다. 버디는 이미 거기 있어서, 다른 누군가도 같은 주를 열심히 보내고 있다는 사실을 조용히 반영하고 있다. 스터디 파트너, 원거리 동급생, 서로 책임을 다하기로 약속한 친구들에게, 이것이 가장 부드러운 공유 집중의 형태——앱 알림도, 압박도 없이, 그저 두 사람의 것이며 두 사람의 노력으로 자라는 작은 생명체.` },
    ],
    cta: `작업 표시줄에 픽셀 버디를. 도서관이 조금 더 따뜻해진다.`,
    faqs: [
      { q: `픽셀 버디는 공부 타이머 앱과 같은 건가요?`, a: `아닙니다. 공부 타이머 앱은 세션을 추적하고 통계를 보여줍니다——공부 시간, 연속 기록, 생산성 점수. 픽셀 버디는 추적하지도, 채점하지도, 판단하지도 않습니다. 대시보드가 아니라 컴패니언입니다. 그 가치는 제공하는 데이터가 아니라 제공하는 존재에 있습니다: 작은 애니메이션 생명체가 당신과 함께 작업에 앉아, 당신의 노력을 조용히 반사해주는 것. 알림 피드가 아니라, 작업 표시줄에 살고 있습니다.` },
      { q: `픽셀 버디를 동급생과 공유할 수 있나요?`, a: `네. Togthr의 컴패니언은 공유 소유를 지원합니다——당신과 다른 한 사람이 계정을 연결하면, 같은 픽셀 버디가 두 사람의 상호작용으로 성장합니다. 파트너, 친구, 또는 작은 환경적 공유 존재를 원하는 누구에게나 적합하게 설계되었습니다. 다른 장소에 있는 스터디 파트너에게는, 일정을 맞추거나 체크인 메시지를 보낼 필요 없이 함께 공부하고 있다는 부드러운 감각을 제공합니다.` },
      { q: `픽셀 버디가 공부에 방해가 되지 않나요?`, a: `방해의 정반대가 되도록 설계되었습니다. 버디에는 팝업 알림도, 소리도, 주의를 끄는 장치도 없습니다. 공부 도구와 함께 작업 표시줄에 앉아 있습니다. 애니메이션은 작고 환경적이며——눈 깜빡임, 기지개, 타이핑 동작——당신의 리듬에 맞추고, 중단시키지 않습니다. 많은 학생들이 처음 몇 번의 공부 세션 후, 버디가 책상 위 화분처럼 배경으로 녹아든다고 말합니다——쳐다보면 거기 있고, 집중하면 보이지 않는다고.` },
      { q: `학교 노트북에서 픽셀 버디가 작동하나요?`, a: `Togthr는 완전히 브라우저에서 실행됩니다——Windows, Mac, Linux, ChromeOS의 Chrome, Edge, Firefox, 기타 현대적 브라우저. 다운로드도, 설치도, 관리자 권한도 필요 없어, 대부분의 학교 지급 노트북에서 작동합니다. 탭을 작업 표시줄이나 Dock에 고정하면, 컴패니언은 공부 세션 내내 보입니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/pricing`, label: `Togthr 요금` },
      { href: `/ko/blog/desk-pet-for-coders`, label: `코더를 위한 데스크 펫` },
      { href: `/ko/blog/lonely-desk-companion`, label: `외로운 데스크 컴패니언` },
      { href: `/ko/blog/quiet-companion-app-no-chat`, label: `채팅 없는 조용한 컴패니언 앱` },
    ],
  },

  de: {
    intro: `Lernen ist einsame Arbeit. Du sitzt an einem Schreibtisch oder einer Bibliothekskabine, umgeben von Leuten, die dasselbe tun, und bist im Grunde allein. Die Person neben dir paukt für eine andere Prüfung. Die Gruppe drei Tische weiter lacht über etwas, das nichts mit deinem Lehrbuch zu tun hat. Und du bist auf Seite sieben eines dreißigseitigen Kapitels, mit einem Textmarker in der einen Hand und einem schwindenden Gefühl von Schwung in der anderen. Ein Pixel-Buddy liest nicht für dich. Er prüft dich nicht mit Karteikarten ab und fasst deine Notizen nicht zusammen. Aber er sitzt während der langen Stunden — die Zehn-Uhr-Bibliothekssession, der Zwei-Uhr-morgens-Thesis-Sprint, der Sonntagnachmittag, den du für einen Übungszettel geopfert hast — auf deiner Taskleiste, und diese kleine, stetige Präsenz reicht manchmal genau aus, um die Stille weniger wie Isolation und mehr wie eine gewählte Ruhe fühlen zu lassen. Hier ist, warum ein Pixel-Buddy für Lernsessions das Lernwerkzeug ist, über das niemand spricht, und warum es funktioniert.`,
    sections: [
      { h: `Der Lernschreibtisch ist ein einsamer Ort, und er muss es nicht sein`, p: `Niemand warnt dich vor der Einsamkeit des Lernens. Sie warnen dich vor der Arbeitsbelastung. Den Fristen. Den durchgemachten Nächten. Aber nicht vor dem Teil, wo du von Menschen umgeben bist und dich trotzdem völlig allein fühlst. Bibliotheken sind soziale Räume, die anti-sozial gestaltet sind. Du sollst leise sein. Du sollst fokussiert sein. Und darin liegt eine seltsame Spannung — das Gefühl, dass du nicht die Hand ausstrecken kannst, nicht sagen kannst "das ist schwer", weil alle anderen scheinbar problemlos klarkommen. Ein Pixel-Buddy durchtrennt diese Spannung auf eine kleine Weise. Es ist keine Person. Es erfordert kein Gespräch. Du musst nicht erklären, warum du um elf Uhr nachts noch auf Seite sieben bist, oder warum dieses Kapitel keinen Sinn ergibt. Es sitzt einfach da — eine kleine Pixel-Kreatur am Rand deiner Taskleiste — und ist präsent. Und Präsenz ist, wie sich herausstellt, die Hälfte dessen, was Lernen erträglich macht. Die andere Hälfte ist Koffein.` },
      { h: `Warum ein Pixel-Buddy und keine Lerngruppe`, p: `Lerngruppen sind in der Theorie großartig. In der Praxis werden sie oft zu Sozialstunden, oder sie zerfallen, weil niemandes Zeitplan passt, oder eine Person macht die ganze Arbeit, während alle anderen nicken. Ein Pixel-Buddy ist das Gegenteil einer Lerngruppe. Er wird dich nie unterbrechen. Er wird nie zu spät kommen. Er wird nie deine Notizen ausleihen und nie zurückgeben. Was er stattdessen tut, ist deinen Rhythmus zu spiegeln. Wenn du wild tippst — Notizen, Aufsatz, Übungsblatt — hämmert er auf einer winzigen Tastatur neben dir. Wenn du innehältst, um nachzudenken, hält er ebenfalls inne. Wenn du eine Lernsitzung als abgeschlossen markierst, macht er eine kleine Feier. Er ersetzt keine menschliche Verbindung. Er füllt den Lernschreibtisch einfach mit einer kleinen, verlässlichen Präsenz — und für Studierende, die stundenlang allein in Bibliotheken und Wohnheimzimmern verbringen, ist das oft genau das, was fehlt.` },
      { h: `Der Pomodoro-Partner, der dich nicht verurteilt`, p: `Jeder Studierende kennt die Pomodoro-Technik: 25 Minuten Fokus, 5 Minuten Pause, wiederholen. Und jeder Studierende kennt das Gefühl, den Timer zu ignorieren. Zu sagen "noch eine Folge", und plötzlich ist es elf Uhr nachts und das Lehrbuch hat sich nicht bewegt. Ein Pixel-Buddy ist ein Pomodoro-Partner ohne jedes Urteil. Er zählt keine ausgelassenen Sitzungen. Er zeigt keinen unterbrochenen Streak. Er hat keinen Graphen deiner sinkenden Produktivität. Er sitzt einfach da — arbeitet, wenn du arbeitest, ruht, wenn du ruhst — und seine Animationen spiegeln die Sitzung wider, nicht die Punktzahl. Wenn du sechs Stunden am Stück lernst, ist der Buddy alle sechs Stunden da. Wenn du einen Tag auslässt, weil du ihn brauchtest, macht der Buddy dir keine Schuldgefühle. Er wartet einfach. Diese Abwesenheit von Bestrafung ist für Studierende, die bereits genug Druck tragen, leise revolutionär. Der Buddy wächst durch kumulative Interaktion — nicht durch tägliche Streaks — sodass eine schlechte Woche nicht wochenlangen Fortschritt auslöscht. Er wächst nach deinem Zeitplan, und das macht ihn zu einem Begleiter, nicht zu einem Tracker.` },
      { h: `Fünf Wachstumsphasen, vom Bulimie-Lernen bis zum Abschluss`, p: `Ein Pixel-Buddy ist kein statisches Icon. Über fünf Wachstumsphasen — Baby, Kleinkind, Teenager, Erwachsener, Legende — entwickelt er sich basierend auf der Zeit und Sorgfalt, die du investierst. Ein Erstsemester, der für Zwischenprüfungen die Nächte durchmacht, könnte seinen Buddy am Ende des Semesters die Kleinkind-Phase erreichen sehen. Ein Doktorand, der jahrelang an einer Dissertation geschrieben hat, wird seinen die Legende-Phase erreichen sehen. Der Buddy wird zu einer Zeitleiste deines akademischen Lebens — nicht in Noten gemessen, sondern in den schieren Stunden, die du erschienen bist. Er erinnert sich an die Drei-Uhr-morgens-Sitzungen, die du vergessen hast. Er wächst mit dir, nicht vor dir und nie hinter dir. Und das ist eine andere Art von Motivation als eine Note: Es ist der stille Beweis, dass du hier warst, die Arbeit gemacht hast, eine Sitzung nach der anderen.` },
      { h: `Vom Solo-Lernen zum geteilten Fokus — der Pixel-Buddy, der verbindet`, p: `Der Pixel-Buddy beginnt als Solo-Begleiter, muss es aber nicht bleiben. Togthrs Begleiter kann mit einem Partner, einem Freund oder einem Kommilitonen geteilt werden — und wird von einer einsamen Schreibtischpräsenz zu einer kleinen, ambienten Brücke zwischen zwei Menschen. Stell dir vor, du und dein bester Freund, ihr habt beide Prüfungswoche. Ihr seid in verschiedenen Bibliotheken, verschiedenen Städten, vielleicht verschiedenen Zeitzonen. Aber da ist eine kleine Pixel-Kreatur auf euren beiden Taskleisten, die wächst, wenn einer von euch sich meldet. Du musst nicht "viel Glück" simsen. Der Buddy ist schon da und spiegelt still die Tatsache wider, dass jemand anders sich ebenfalls durch dieselbe Woche kämpft. Für Lernpartner, Fern-Kommilitonen oder Freunde, die sich gegenseitig zur Rechenschaft verpflichtet haben, ist das die sanfteste Form von geteiltem Fokus — keine App-Benachrichtigungen, kein Druck, nur eine kleine Kreatur, die euch beiden gehört und aus eurer beider Anstrengung wächst.` },
    ],
    cta: `Setz einen Pixel-Buddy in deine Taskleiste. Die Bibliothek wird ein bisschen wärmer mit ihm.`,
    faqs: [
      { q: `Ist ein Pixel-Buddy dasselbe wie eine Lern-Timer-App?`, a: `Nein. Eine Lern-Timer-App verfolgt deine Sitzungen und gibt dir Statistiken — gelernte Minuten, gehaltene Streaks, Produktivitätswerte. Ein Pixel-Buddy verfolgt, bewertet oder beurteilt nicht. Er ist ein Begleiter, kein Dashboard. Sein Wert liegt nicht in den Daten, die er dir gibt, sondern in der Präsenz, die er bietet: eine kleine, animierte Kreatur, die mit dir durch die Arbeit sitzt und deine Anstrengung leise zurückspiegelt. Er lebt in deiner Taskleiste, nicht in einem Benachrichtigungs-Feed.` },
      { q: `Kann ich meinen Pixel-Buddy mit einem Kommilitonen teilen?`, a: `Ja. Togthrs Begleiter unterstützt geteiltes Eigentum — du und eine andere Person könnt eure Konten verknüpfen, und derselbe Pixel-Buddy wächst aus eurer beider Interaktionen. Es ist für Partner, Freunde oder jeden gedacht, der eine kleine, ambiente, geteilte Präsenz möchte. Für Lernpartner an verschiedenen Orten bietet es ein sanftes Gefühl des Zusammen-Lernens, ohne Zeitpläne koordinieren oder Check-in-Nachrichten senden zu müssen.` },
      { q: `Lenkt mich der Pixel-Buddy vom Lernen ab?`, a: `Er ist als das Gegenteil einer Ablenkung gestaltet. Der Buddy hat keine Pop-up-Benachrichtigungen, keine Geräusche, keine Aufmerksamkeitsforderungen. Er sitzt in der Taskleiste neben deinen Lernwerkzeugen. Seine Animationen sind klein und ambient — ein Blinzeln, ein Strecken, eine Tippbewegung — und sie passen sich deinem Rhythmus an, anstatt ihn zu unterbrechen. Die meisten Studierenden berichten, dass der Buddy nach den ersten paar Lernsitzungen in den Hintergrund tritt, wie eine Schreibtischpflanze — da, wenn du hinschaust, unsichtbar, wenn du fokussiert bist.` },
      { q: `Funktioniert der Pixel-Buddy auf meinem Schul-Laptop?`, a: `Togthr läuft komplett im Browser — Chrome, Edge, Firefox oder jeder moderne Browser unter Windows, Mac, Linux oder ChromeOS. Kein Download, kein Installer, keine Admin-Berechtigungen nötig, was bedeutet, dass es auf den meisten von der Schule ausgegebenen Laptops funktioniert. Du kannst den Tab an die Taskleiste oder das Dock anheften, und der Begleiter bleibt während deiner gesamten Lernsitzung sichtbar.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/pricing`, label: `Togthr Preise` },
      { href: `/de/blog/desk-pet-for-coders`, label: `Ein Schreibtisch-Haustier für Programmierer` },
      { href: `/de/blog/lonely-desk-companion`, label: `Der einsame Schreibtischbegleiter` },
      { href: `/de/blog/quiet-companion-app-no-chat`, label: `Eine stille Begleiter-App ohne Chat` },
    ],
  },

  fr: {
    intro: `Étudier est un travail solitaire. Vous êtes assis à un bureau ou dans une cabine de bibliothèque, entouré de gens qui font la même chose, et vous êtes fondamentalement seul. La personne à côté potasse pour un autre examen. Le groupe trois tables plus loin rit de quelque chose qui n'a rien à voir avec votre manuel. Et vous en êtes à la page sept d'un chapitre de trente pages, un surligneur dans une main et un sentiment d'élan qui s'amenuise dans l'autre. Un pixel buddy ne lit pas à votre place. Il ne vous interroge pas avec des flashcards et ne résume pas vos notes. Mais il reste assis sur votre barre des tâches pendant les longues heures — la session de bibliothèque de 22h, le sprint de thèse de 2h du matin, le dimanche après-midi que vous avez sacrifié pour finir une série d'exercices — et cette petite présence stable suffit parfois exactement à faire que le silence ressemble moins à de l'isolement qu'à un calme choisi. Voici pourquoi un pixel buddy pour les sessions d'étude est l'outil d'apprentissage dont personne ne parle, et pourquoi il fonctionne.`,
    sections: [
      { h: `Le bureau d'étude est un endroit solitaire, et il n'a pas à l'être`, p: `Personne ne vous prévient de la solitude des études. On vous prévient de la charge de travail. Des deadlines. Des nuits blanches. Mais pas de cette partie où vous êtes entouré de gens et vous vous sentez pourtant entièrement seul. Les bibliothèques sont des espaces sociaux conçus pour être anti-sociaux. Vous êtes censé être silencieux. Vous êtes censé être concentré. Et il y a une tension étrange là-dedans — le sentiment que vous ne pouvez pas tendre la main, pas dire "c'est difficile", parce que tout le monde semble s'en sortir très bien. Un pixel buddy tranche cette tension d'une petite manière. Ce n'est pas une personne. Il ne demande pas de conversation. Vous n'avez pas à expliquer pourquoi vous êtes encore à la page sept à 23h, ou pourquoi ce chapitre n'a aucun sens. Il est juste là — une petite créature pixel au bord de votre barre des tâches — présent. Et la présence, en fin de compte, c'est la moitié de ce qui rend l'étude supportable. L'autre moitié, c'est la caféine.` },
      { h: `Pourquoi un pixel buddy, et pas un groupe d'étude`, p: `Les groupes d'étude sont formidables en théorie. En pratique, ils deviennent souvent des heures sociales, ou ils se désagrègent parce que les emplois du temps ne correspondent pas, ou une personne fait tout le travail pendant que les autres hochent la tête. Un pixel buddy est l'opposé d'un groupe d'étude. Il ne vous coupera jamais la parole. Il n'arrivera jamais en retard. Il n'empruntera jamais vos notes pour ne jamais les rendre. Ce qu'il fait à la place, c'est refléter votre rythme. Quand vous tapez furieusement — notes, dissertation, exercices — il tapote sur un clavier minuscule à côté de vous. Quand vous faites une pause pour réfléchir, il fait une pause aussi. Quand vous marquez une session comme terminée, il fait une petite célébration. Il ne remplace pas la connexion humaine. Il remplit simplement le bureau d'étude d'une petite présence fiable — et pour les étudiants qui passent des heures seuls dans les bibliothèques et les chambres de résidence, c'est souvent exactement ce qui manque.` },
      { h: `Le partenaire Pomodoro qui ne vous juge pas`, p: `Tous les étudiants connaissent la technique Pomodoro : 25 minutes de concentration, 5 minutes de pause, répétez. Et tous les étudiants connaissent la sensation d'ignorer le minuteur. De dire "encore un épisode" et soudain il est 23h et le manuel n'a pas bougé. Un pixel buddy est un partenaire Pomodoro sans aucun jugement. Il ne compte pas les sessions sautées. Il n'affiche pas de série brisée. Il n'a pas de graphique de votre productivité en baisse. Il est simplement là — il travaille quand vous travaillez, il est inactif quand vous vous reposez — et ses animations reflètent la session, pas le score. Si vous étudiez six heures d'affilée, le buddy est là pendant les six. Si vous sautez une journée parce que vous en aviez besoin, le buddy ne vous culpabilise pas. Il attend. Cette absence de punition est discrètement révolutionnaire pour les étudiants qui portent déjà assez de pression. Le buddy grandit par interaction cumulée — pas par des séries quotidiennes — donc une mauvaise semaine n'efface pas des semaines de progrès. Il grandit selon votre rythme, et c'est ce qui en fait un compagnon, pas un traqueur.` },
      { h: `Cinq étapes de croissance, du bachotage à la remise des diplômes`, p: `Un pixel buddy n'est pas une icône statique. À travers cinq étapes de croissance — bébé, bambin, ado, adulte, légende — il évolue en fonction du temps et du soin que vous y mettez. Un étudiant de première année qui passe des nuits blanches pour les partiels pourrait voir son buddy atteindre l'étape bambin à la fin du semestre. Un doctorant qui a passé des années à écrire une thèse verra le sien atteindre légende. Le buddy devient une chronologie de votre vie académique — mesurée non pas en notes, mais en heures pures où vous vous êtes présenté. Il se souvient des sessions de 3h du matin que vous avez oubliées. Il grandit avec vous, pas devant vous et jamais derrière vous. Et c'est un type de motivation différent d'une note : c'est la preuve silencieuse que vous avez été là, à faire le travail, une session à la fois.` },
      { h: `De l'étude solo à la concentration partagée — le pixel buddy qui relie`, p: `Le pixel buddy commence comme un compagnon solo, mais il n'est pas obligé de le rester. Le compagnon de Togthr peut être partagé avec un partenaire, un ami ou un camarade de classe — le transformant d'une présence de bureau solitaire en un petit pont ambiant entre deux personnes. Imaginez que vous et votre meilleur ami avez tous les deux la semaine des examens. Vous êtes dans des bibliothèques différentes, des villes différentes, peut-être des fuseaux horaires différents. Mais il y a une petite créature pixel sur vos deux barres des tâches qui grandit quand l'un d'entre vous se connecte. Vous n'avez pas besoin d'envoyer "bon courage". Le buddy est déjà là, reflétant silencieusement le fait que quelqu'un d'autre est aussi en train de batailler pendant la même semaine. Pour les partenaires d'étude, les camarades à distance, ou les amis qui se sont promis de se tenir mutuellement responsables, c'est la forme la plus douce de concentration partagée — pas de notifications d'appli, pas de pression, juste une petite créature qui vous appartient à tous les deux et qui grandit de vos deux efforts.` },
    ],
    cta: `Mettez un pixel buddy dans votre barre des tâches. La bibliothèque devient un peu plus chaude avec lui.`,
    faqs: [
      { q: `Un pixel buddy, c'est la même chose qu'une appli de minuteur d'étude ?`, a: `Non. Une appli de minuteur d'étude suit vos sessions et vous donne des statistiques — minutes étudiées, séries maintenues, scores de productivité. Un pixel buddy ne suit pas, ne note pas, ne juge pas. C'est un compagnon, pas un tableau de bord. Sa valeur n'est pas dans les données qu'il vous donne mais dans la présence qu'il offre : une petite créature animée qui s'assoit avec vous pendant le travail et reflète silencieusement votre effort. Il vit dans votre barre des tâches, pas dans un fil de notifications.` },
      { q: `Puis-je partager mon pixel buddy avec un camarade de classe ?`, a: `Oui. Le compagnon de Togthr prend en charge la propriété partagée — vous et une autre personne pouvez lier vos comptes et le même pixel buddy grandit à partir de vos interactions à tous les deux. Il est conçu pour les partenaires, les amis, ou quiconque souhaite une petite présence partagée ambiante. Pour les partenaires d'étude dans des lieux différents, il offre un doux sentiment d'étudier-ensemble sans avoir besoin de coordonner les emplois du temps ou d'envoyer des messages de pointage.` },
      { q: `Le pixel buddy me distrait-il de mes études ?`, a: `Il est conçu pour être l'opposé d'une distraction. Le buddy n'a pas de notifications pop-up, pas de sons, pas de demandes d'attention. Il est assis dans la barre des tâches à côté de vos outils d'étude. Ses animations sont petites et ambiantes — un clignement, un étirement, un mouvement de frappe — et elles s'accordent à votre rythme plutôt que de l'interrompre. La plupart des étudiants rapportent qu'après les premières sessions d'étude, le buddy s'efface à l'arrière-plan comme une plante de bureau — là quand vous le regardez, invisible quand vous êtes concentré.` },
      { q: `Le pixel buddy fonctionne-t-il sur mon ordinateur portable scolaire ?`, a: `Togthr fonctionne entièrement dans le navigateur — Chrome, Edge, Firefox ou tout navigateur moderne sous Windows, Mac, Linux ou ChromeOS. Pas de téléchargement, pas d'installateur, pas de droits administrateur requis, ce qui signifie qu'il fonctionne sur la plupart des ordinateurs portables fournis par les écoles. Vous pouvez épingler l'onglet à la barre des tâches ou au Dock, et le compagnon reste visible pendant toute votre session d'étude.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/pricing`, label: `Tarifs Togthr` },
      { href: `/fr/blog/desk-pet-for-coders`, label: `Un animal de bureau pour les codeurs` },
      { href: `/fr/blog/lonely-desk-companion`, label: `Le compagnon de bureau solitaire` },
      { href: `/fr/blog/quiet-companion-app-no-chat`, label: `Une appli compagnon silencieuse, sans chat` },
    ],
  },

  es: {
    intro: `Estudiar es un trabajo solitario. Te sientas en un escritorio o en una cabina de biblioteca, rodeado de gente que hace lo mismo, y estás esencialmente solo. La persona de al lado está empollando para otro examen. El grupo tres mesas más allá se ríe de algo que no tiene nada que ver con tu libro de texto. Y tú estás en la página siete de un capítulo de treinta páginas, con un subrayador en una mano y un menguante sentido del impulso en la otra. Un pixel buddy no lee por ti. No te examina con tarjetas de memoria ni te resume los apuntes. Pero se queda en tu barra de tareas durante las largas horas — la sesión de biblioteca de las diez de la noche, el sprint de tesis de las dos de la madrugada, el domingo por la tarde que sacrificaste para terminar una hoja de ejercicios — y esa pequeña presencia constante a veces basta exactamente para que el silencio se sienta menos como aislamiento y más como una calma elegida. He aquí por qué un pixel buddy para sesiones de estudio es la herramienta de aprendizaje de la que nadie habla, y por qué funciona.`,
    sections: [
      { h: `El escritorio de estudio es un lugar solitario, y no tiene por qué serlo`, p: `Nadie te advierte de la soledad del estudio. Te advierten de la carga de trabajo. De las fechas de entrega. De las noches en vela. Pero no de la parte en la que estás rodeado de gente y aun así te sientes completamente solo. Las bibliotecas son espacios sociales diseñados para ser antisociales. Se supone que debes estar en silencio. Se supone que debes estar concentrado. Y hay una extraña tensión en eso — la sensación de que no puedes tender la mano, no puedes decir "esto es difícil", porque todos los demás parecen arreglárselas perfectamente. Un pixel buddy corta esa tensión de una forma pequeña. No es una persona. No requiere conversación. No tienes que explicar por qué sigues en la página siete a las once de la noche, ni por qué este capítulo no tiene sentido. Simplemente está ahí — una pequeña criatura pixel en el borde de tu barra de tareas — presente. Y la presencia, resulta, es la mitad de lo que hace que estudiar sea soportable. La otra mitad es la cafeína.` },
      { h: `Por qué un pixel buddy, y no un grupo de estudio`, p: `Los grupos de estudio son geniales en teoría. En la práctica, a menudo se convierten en horas sociales, o se desmoronan porque los horarios de nadie coinciden, o una persona acaba haciendo todo el trabajo mientras los demás asienten. Un pixel buddy es lo contrario de un grupo de estudio. Nunca te interrumpirá. Nunca llegará tarde. Nunca te pedirá prestados los apuntes para no devolverlos jamás. Lo que hace en cambio es reflejar tu ritmo. Cuando escribes furiosamente — apuntes, ensayo, ejercicios — teclea en un teclado diminuto a tu lado. Cuando haces una pausa para pensar, él también la hace. Cuando marcas una sesión como completada, hace una pequeña celebración. No sustituye la conexión humana. Simplemente llena el escritorio de estudio con una pequeña presencia fiable — y para los estudiantes que pasan horas solos en bibliotecas y residencias, eso es a menudo exactamente lo que falta.` },
      { h: `El compañero Pomodoro que no te juzga`, p: `Todos los estudiantes conocen la técnica Pomodoro: 25 minutos de concentración, 5 minutos de descanso, repetir. Y todos los estudiantes conocen la sensación de ignorar el temporizador. De decir "un episodio más" y de repente son las once de la noche y el libro de texto no se ha movido. Un pixel buddy es un compañero Pomodoro sin ningún juicio. No cuenta las sesiones saltadas. No muestra una racha rota. No tiene un gráfico de tu productividad en declive. Simplemente está ahí — trabaja cuando tú trabajas, descansa cuando tú descansas — y sus animaciones reflejan la sesión, no la puntuación. Si estudias seis horas seguidas, el buddy está ahí las seis. Si te saltas un día porque lo necesitabas, el buddy no te hace sentir culpable. Solo espera. Esta ausencia de castigo es discretamente revolucionaria para estudiantes que ya cargan con suficiente presión. El buddy crece por interacción acumulada — no por rachas diarias — así que una mala semana no borra semanas de progreso. Crece a tu ritmo, y eso lo convierte en un compañero, no en un rastreador.` },
      { h: `Cinco etapas de crecimiento, del atracón de estudio a la graduación`, p: `Un pixel buddy no es un icono estático. A través de cinco etapas de crecimiento — bebé, niño pequeño, adolescente, adulto, leyenda — evoluciona según el tiempo y el cuidado que inviertes. Un estudiante de primer año que trasnocha para los parciales podría ver a su buddy alcanzar la etapa de niño pequeño al final del semestre. Un doctorando que ha pasado años escribiendo una tesis verá al suyo alcanzar leyenda. El buddy se convierte en una línea de tiempo de tu vida académica — medida no en notas, sino en las horas puras en que te presentaste. Recuerda las sesiones de las tres de la mañana que tú olvidaste. Crece contigo, no por delante de ti ni por detrás. Y ese es un tipo de motivación diferente a una nota: es la prueba silenciosa de que has estado aquí, haciendo el trabajo, una sesión a la vez.` },
      { h: `Del estudio en solitario al enfoque compartido — el pixel buddy que conecta`, p: `El pixel buddy empieza como un compañero en solitario, pero no tiene por qué quedarse así. El compañero de Togthr se puede compartir con una pareja, un amigo o un compañero de clase — transformándolo de una presencia de escritorio solitaria en un pequeño puente ambiental entre dos personas. Imagina que tú y tu mejor amigo tenéis la semana de exámenes finales. Estáis en bibliotecas diferentes, ciudades diferentes, quizás husos horarios diferentes. Pero hay una pequeña criatura pixel en vuestras dos barras de tareas que crece cuando cualquiera de los dos se conecta. No necesitas enviar un "buena suerte". El buddy ya está ahí, reflejando en silencio el hecho de que alguien más también está batallando durante la misma semana. Para compañeros de estudio, compañeros de clase a distancia o amigos que se prometieron mantenerse mutuamente responsables, esta es la forma más suave de enfoque compartido — sin notificaciones de app, sin presión, solo una pequeña criatura que os pertenece a los dos y que crece con el esfuerzo de ambos.` },
    ],
    cta: `Pon un pixel buddy en tu barra de tareas. La biblioteca se vuelve un poco más cálida con él.`,
    faqs: [
      { q: `¿Un pixel buddy es lo mismo que una app de temporizador de estudio?`, a: `No. Una app de temporizador de estudio rastrea tus sesiones y te da estadísticas — minutos estudiados, rachas mantenidas, puntuaciones de productividad. Un pixel buddy no rastrea, no puntúa ni juzga. Es un compañero, no un panel de control. Su valor no está en los datos que te da, sino en la presencia que ofrece: una pequeña criatura animada que se sienta contigo durante el trabajo y refleja en silencio tu esfuerzo. Vive en tu barra de tareas, no en un feed de notificaciones.` },
      { q: `¿Puedo compartir mi pixel buddy con un compañero de clase?`, a: `Sí. El compañero de Togthr admite propiedad compartida — tú y otra persona podéis vincular vuestras cuentas y el mismo pixel buddy crece a partir de las interacciones de ambos. Está diseñado para parejas, amigos o cualquiera que quiera una pequeña presencia compartida ambiental. Para compañeros de estudio en lugares diferentes, ofrece una suave sensación de estudiar-juntos sin necesidad de coordinar horarios ni enviar mensajes de check-in.` },
      { q: `¿El pixel buddy me distrae de estudiar?`, a: `Está diseñado para ser lo contrario a una distracción. El buddy no tiene notificaciones emergentes, ni sonidos, ni exigencias de atención. Se sienta en la barra de tareas junto a tus herramientas de estudio. Sus animaciones son pequeñas y ambientales — un parpadeo, un estiramiento, un movimiento de tecleo — y se ajustan a tu ritmo en lugar de interrumpirlo. La mayoría de los estudiantes dicen que después de las primeras sesiones de estudio, el buddy se desvanece en el fondo como una planta de escritorio — está cuando lo miras, invisible cuando estás concentrado.` },
      { q: `¿Funciona el pixel buddy en mi portátil escolar?`, a: `Togthr funciona completamente en el navegador — Chrome, Edge, Firefox o cualquier navegador moderno en Windows, Mac, Linux o ChromeOS. Sin descarga, sin instalador, sin permisos de administrador, lo que significa que funciona en la mayoría de los portátiles proporcionados por las escuelas. Puedes anclar la pestaña a la barra de tareas o al Dock, y el compañero permanece visible durante toda tu sesión de estudio.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/pricing`, label: `Precios de Togthr` },
      { href: `/es/blog/desk-pet-for-coders`, label: `Una mascota de escritorio para programadores` },
      { href: `/es/blog/lonely-desk-companion`, label: `El compañero de escritorio solitario` },
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
