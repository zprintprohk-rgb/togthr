// src/app/[locale]/blog/cute-desktop-buddy-for-students/page.tsx
//
// Job 1 daily blog 2026-08-07
// Topic: cute-desktop-buddy-for-students + study-companion + cuteness +
//        library-sessions + student-life. Group 2 (lonely-companion)
//        keyword: "cute desktop buddy for students."
//
// Hook: The library at 11pm does not need another productivity app.
//       It needs a tiny pixel friend sitting next to your laptop.

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `cute-desktop-buddy-for-students`
const POST_DATE = `2026-08-07`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  en: {
    intro: `There is a specific hour in every student's life: the library at 11pm, a week before exams. The desk lamp is on, the notes are open, the third coffee is going cold, and the only thing between you and finishing is a wall of pages you still have to read. Nobody is there with you. That hour is not about intelligence. It is about endurance. And endurance is easier when there is a small, stupidly cute creature sitting at the corner of your screen — not telling you to focus, not tracking your streaks, just being there while you keep going. That is what a cute desktop buddy is for. Not to make you study. To make the studying feel less alone.`,
    sections: [
      { h: `Why "cute" is not a gimmick — it is the actual mechanism`, p: `Cuteness research is real. When humans look at something with big eyes, a round shape, and small size, our brains release a caregiving response — the same system that makes us want to protect puppies. Psychologists call it "cute aggression" territory: we are so overwhelmed by the feeling that we want to squeeze something. What matters for a student is not the squeezing. It is the brain chemistry. Looking at a cute pixel pet lowers stress markers, and stress is the main thing that makes study sessions collapse. A cute buddy is not decoration on top of a study tool. It is a small, repeatable dose of calm that sits at the edge of your vision, doing its idle animation, reminding your nervous system that not everything in this room is a deadline.` },
      { h: `A buddy, not another productivity app`, p: `Your phone already has a hundred apps that want to optimize you. Forest trees, Pomodoro timers, habit trackers, focus playlists, screen-time reports. They all share one assumption: you are the problem, and the app is the fix. A desktop buddy makes a different offer. It does not measure your study hours. It does not shame you for closing the app at 9pm. It does not give you a "focus score" that makes you feel bad about your Tuesday. It just sits there — cute, round, pixelated — and its presence says: I am not here to grade you. I am here to keep you company. For a student who has spent the whole day being graded, tested, and ranked, that distinction is not small. It is the whole point.` },
      { h: `What it actually does during a study session`, p: `Concretely: you open Togthr in a browser tab, and a small pixel robot with a pastel purple body lives in the corner of your screen. While you type, it looks like it is working too — its state changes from idle to working, matching your rhythm. If you stay deep in a task, Focus Mode keeps it quiet and still: no animations demanding your attention, no notifications, no pop-ups. When you finish a chunk of work and pause, it shifts to a thinking pose, then a small success celebration when you resume or complete. None of this requires you to click, feed, or talk to it. The whole interaction is passive. You study; it coexists. The value is not in anything it says — it never says anything. The value is that at 11pm in a silent library, there is one more warm presence in the room, and it is on your side.` },
      { h: `The line between a cute pet and a cute distraction`, p: `This is the design question every virtual pet faces: when does the charm become a trap? A desktop buddy that bounces across the screen every ten seconds is not a companion, it is a notification. Togthr solves this with restraint. The pet is small, lives at the screen edge, animates in a gentle 8-frame loop, and respects a strict Focus Mode that suppresses motion entirely. There is no gamified feed loop — you cannot "play" with it in a way that drags you out of your notes. You can feed it or change its skin when you take a real break, but the pet never initiates. It waits. The discipline is in the waiting. A cute desktop buddy is only useful if it knows when to be invisible, and Togthr's pet treats your study time as sacred.` },
      { h: `For the student who studies alone`, p: `Some students love group study. Others are alone by choice or by circumstance — the commuter who studies on a night train, the exchange student whose flatmates sleep early, the library regular who has watched the same people for a semester without ever saying hello. For that student, solitude is not a problem to fix. It is a preference, or a season, or simply how the schedule works out. What they still want is the feeling of someone nearby. Not someone who talks. Someone who exists. A cute desktop buddy is the smallest version of that: a creature that asks nothing, judges nothing, and is visibly happy to be next to you. It does not replace friendship or community. It fills the tiny gap between study sessions — the moment you look up from the notes and the room is silent, and something small on the screen looks back, blinking, and the silence feels a little less empty.` },
    ],
    cta: `A tiny buddy for your study desk. Open the tab.`,
    faqs: [
      { q: `Will a desktop buddy distract me during exams?`, a: `No. Togthr's Focus Mode suppresses the pet's animations entirely during deep work, and the pet never sends notifications or pop-ups. It is designed to be invisible when you need to concentrate. The pet does not initiate interaction — it only responds when you choose to interact during a break.` },
      { q: `Do I need to feed it every day like a tamagotchi?`, a: `No. Togthr is a low-pressure companion: no hunger, no sickness, no death mechanic, no guilt notifications. If you do not open it for two weeks, the pet is exactly where you left it, happy to see you. Growth happens through interaction over time, but nothing decays.` },
      { q: `Is this just a virtual pet game in a browser tab?`, a: `It is a virtual pet, yes — but built for companionship rather than collection. It has five growth stages, six skins, and a shared mode for couples and friends, and it is designed to coexist with real work instead of competing for attention. There is no score, no rare-drop grinding, and no obligation to check in.` },
      { q: `Can I use it on a laptop in a quiet library?`, a: `Yes — Togthr is a pure web app with no sound by default and no bright animations. The pet renders in subtle pixel art that fits a dim screen, and Focus Mode keeps it still. Many students keep it in a small pinned window beside their notes.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/features`, label: `Togthr features — what the pet can do` },
      { href: `/en/focus`, label: `Focus Mode — study quietly with your pet` },
      { href: `/en/blog/pixel-buddy-for-study-sessions`, label: `A pixel buddy for study sessions` },
      { href: `/en/blog/quiet-companion-app-no-chat`, label: `Quiet companion app: no chat, just presence` },
    ],
  },

  'zh-cn': {
    intro: `每个学生的生活里都有那么一个小时：考试前一周的深夜图书馆。台灯开着，笔记摊着，第三杯咖啡已经凉了，你和"读完这些"之间隔着一堵墙。没有人和你在一起。那一刻跟智力无关。跟耐力有关。而耐力，当屏幕角落坐着一只小得有点蠢萌的生物时，会容易一些——它不叫你专注，不追踪你的打卡，只是在你继续的时候待在那里。这就是可爱桌面伙伴存在的意义。不是让你学习。是让学习这件事，不那么孤独。`,
    sections: [
      { h: `为什么"可爱"不是噱头——它就是机制本身`, p: `可爱研究是真实的。当人类看到大眼睛、圆滚滚、小体型的东西时，大脑会触发照料反应——就是让我们想保护小狗的那套系统。心理学家管这叫"萌到想捏"区间：情绪太满，以至于想揉点什么。对学生来说，重要的不是揉，是大脑化学。看一只可爱的像素宠物会降低压力指标，而压力正是让学习崩溃的头号原因。一只可爱的伙伴不是学习工具上叠的装饰。它是一小剂可重复的平静，坐在你视野边缘，做它的待机动画，提醒你的神经系统：这个房间里不是所有东西都是死线。` },
      { h: `是伙伴，不是又一个效率 App`, p: `你的手机里已经有一百个想"优化"你的 App 了。森林种树、番茄钟、习惯追踪、专注歌单、屏幕时间报告。它们共享一个假设：你有问题，App 是解药。桌面伙伴提出了不同的邀约。它不测量你的学习时长。它不因为你晚上九点关掉它而羞辱你。它不给你一个让你为周二感到难过的"专注评分"。它只是坐在那里——可爱、圆润、像素风——它的存在在说：我不是来给你打分的。我是来陪你的。对于一个整天被考试、测验、排名评分的学生的来说，这个区别不小。这就是全部重点。` },
      { h: `学习时它到底在做什么`, p: `具体来说：你在浏览器标签页打开 Togthr，一只粉紫配色的圆头小机器人住在你屏幕角落。你打字的时候，它看起来也在工作——状态从 idle 切到 working，跟着你的节奏。如果你深入一项任务，Focus Mode 会让它保持安静静止：没有抢注意力的动画，没有通知，没有弹窗。你完成一段工作停下来时，它会切换到思考姿势；你重新开始时，它会做一个小小的成功庆祝。所有这些都不需要你点击、喂食或跟它说话。整个交互是被动的。你学习，它共存。价值不在于它说了什么——它什么也不说。价值在于：深夜图书馆里，这个房间多了一个温暖的存在，而它在你这一边。` },
      { h: `可爱宠物和可爱干扰之间的一线之隔`, p: `这是每个虚拟宠物都要面对的设问：魅力什么时候变成陷阱？一只每十秒在屏幕上蹦来蹦去的桌面伙伴不是陪伴，是通知。Togthr 用克制解决这个问题。宠物很小，住在屏幕边缘，用温柔的 8 帧循环动画，并且有一个严格的 Focus Mode 完全抑制动作。没有游戏化投喂循环——你没法用一种把你从笔记里拽出去的方式"玩"它。你可以在真正休息时喂它或换皮肤，但宠物从不主动发起。它等待。纪律就在等待里。一只可爱的桌面伙伴只有知道什么时候该隐形才有用，而 Togthr 的宠物把你的学习时间视为神圣。` },
      { h: `给独自学习的学生`, p: `有些学生喜欢小组学习。另一些人独自学习是出于选择或处境——在夜班火车上学习的通勤生、室友睡得早的交换生、一个学期看着同一批人却从没打过招呼的图书馆常客。对那个学生来说，独处不是要解决的问题。它是一种偏好，或一个季节，或者只是时间表凑巧。但他们仍然想要"有人在附近"的感觉。不是有人说话。是有人存在。一只可爱的桌面伙伴就是那个感觉的最小版本：一个什么都不要求、什么都不评判、明显很高兴待在你旁边的小生物。它不替代友谊或社群。它填补学习间隙里那个小小的空当——你从笔记上抬起头，房间里一片安静，屏幕上有个小东西回望你，眨眨眼，于是安静显得没那么空了。` },
    ],
    cta: `你书桌上的一只小伙伴。打开标签页就好。`,
    faqs: [
      { q: `考试期间桌面伙伴会让我分心吗？`, a: `不会。Togthr 的 Focus Mode 会在深度工作时完全抑制宠物动画，宠物也从不发通知或弹窗。它设计成在你需要集中时隐形。宠物不主动发起互动——只在你休息时选择互动才回应。` },
      { q: `我需要像拓麻歌子一样每天喂它吗？`, a: `不需要。Togthr 是低压陪伴：没有饥饿、没有生病、没有死亡机制、没有内疚通知。两周不开它，宠物也停在原地，开心见到你。成长靠长期互动，但什么都不会倒退。` },
      { q: `这不就是个浏览器标签页里的虚拟宠物游戏吗？`, a: `是虚拟宠物，没错——但它是为陪伴而非收集设计的。它有五个成长阶段、六款皮肤、情侣和好友共享模式，并且设计成与现实工作共存而不是争夺注意力。没有分数、没有稀有掉落刷取、没有签到义务。` },
      { q: `能在安静的图书馆用笔记本用吗？`, a: `可以——Togthr 是纯 Web 应用，默认无声音、无刺眼动画。宠物用细腻的像素画风，适合昏暗屏幕，Focus Mode 会让它保持静止。很多学生把它放在笔记旁的小固定窗口里。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/features`, label: `Togthr 功能 — 宠物能做什么` },
      { href: `/zh-cn/focus`, label: `Focus Mode — 安静地跟宠物一起学习` },
      { href: `/zh-cn/blog/pixel-buddy-for-study-sessions`, label: `学习专用的像素伙伴` },
      { href: `/zh-cn/blog/quiet-companion-app-no-chat`, label: `安静陪伴 App：不聊天，只有存在` },
    ],
  },

  'zh-tw': {
    intro: `每個學生的生活裡都有那麼一個小時：考試前一週的深夜圖書館。檯燈開著，筆記攤著，第三杯咖啡已經涼了，你和「讀完這些」之間隔著一堵牆。沒有人和你在一起。那一刻跟智力無關。跟耐力有關。而耐力，當螢幕角落坐著一隻小得有點蠢萌的生物時，會容易一些——牠不叫你專注，不追蹤你的打卡，只是在你繼續的時候待在那裡。這就是可愛桌面夥伴存在的意義。不是讓你學習。是讓學習這件事，不那麼孤獨。`,
    sections: [
      { h: `為什麼「可愛」不是噱頭——它就是機制本身`, p: `可愛研究是真實的。當人類看到大眼睛、圓滾滾、小體型的東西時，大腦會觸發照料反應——就是讓我們想保護小狗的那套系統。心理學家管這叫「萌到想捏」區間：情緒太滿，以至於想揉點什麼。對學生來說，重要的不是揉，是大腦化學。看一隻可愛的像素寵物會降低壓力指標，而壓力正是讓學習崩潰的頭號原因。一隻可愛的夥伴不是學習工具上疊的裝飾。它是一小劑可重複的平靜，坐在你視野邊緣，做牠的待機動畫，提醒你的神經系統：這個房間裡不是所有東西都是死線。` },
      { h: `是夥伴，不是又一個效率 App`, p: `你的手機裡已經有一百個想「優化」你的 App 了。森林種樹、番茄鐘、習慣追蹤、專注歌單、螢幕時間報告。它們共享一個假設：你有問題，App 是解藥。桌面夥伴提出了不同的邀約。它不測量你的學習時長。它不因為你晚上九點關掉它而羞辱你。它不給你一個讓你為週二感到難過的「專注評分」。它只是坐在那裡——可愛、圓潤、像素風——牠的存在在說：我不是來給你打分的。我是來陪你的。對於一個整天被考試、測驗、排名評分的學生來說，這個區別不小。這就是全部重點。` },
      { h: `學習時牠到底在做什麼`, p: `具體來說：你在瀏覽器分頁打開 Togthr，一隻粉紫配色的圓頭小機器人住在你螢幕角落。你打字的時候，牠看起來也在工作——狀態從 idle 切到 working，跟著你的節奏。如果你深入一項任務，Focus Mode 會讓牠保持安靜靜止：沒有搶注意力的動畫，沒有通知，沒有彈窗。你完成一段工作停下來時，牠會切換到思考姿勢；你重新開始時，牠會做一個小小的成功慶祝。所有這些都不需要你點擊、餵食或跟牠說話。整個互動是被動的。你學習，牠共存。價值不在於牠說了什麼——牠什麼也不說。價值在於：深夜圖書館裡，這個房間多了一個溫暖的存在，而牠在你這一邊。` },
      { h: `可愛寵物和可愛干擾之間的一線之隔`, p: `這是每個虛擬寵物都要面對的設問：魅力什麼時候變成陷阱？一隻每十秒在螢幕上蹦來蹦去的桌面夥伴不是陪伴，是通知。Togthr 用克制解決這個問題。寵物很小，住在螢幕邊緣，用溫柔的 8 幀循環動畫，並且有一個嚴格的 Focus Mode 完全抑制動作。沒有遊戲化投餵循環——你沒法用一種把你從筆記裡拽出去的方式「玩」牠。你可以在真正休息時餵牠或換皮膚，但寵物從不主動發起。牠等待。紀律就在等待裡。一隻可愛的桌面夥伴只有知道什麼時候該隱形才有用，而 Togthr 的寵物把你的學習時間視為神聖。` },
      { h: `給獨自學習的學生`, p: `有些學生喜歡小組學習。另一些人獨自學習是出於選擇或處境——在夜班火車上學習的通勤生、室友睡得早的交換生、一個學期看著同一批人卻從沒打過招呼的圖書館常客。對那個學生來說，獨處不是要解決的問題。牠是一種偏好，或一個季節，或者只是時間表湊巧。但他們仍然想要「有人在附近」的感覺。不是有人說話。是有人存在。一隻可愛的桌面夥伴就是那個感覺的最小版本：一個什麼都不要求、什麼都不評判、明顯很高興待在你旁邊的小生物。它不替代友誼或社群。它填補學習間隙裡那個小小的空當——你從筆記上抬起頭，房間裡一片安靜，螢幕上有個小東西回望你，眨眨眼，於是安靜顯得沒那麼空了。` },
    ],
    cta: `你書桌上的一隻小夥伴。打開分頁就好。`,
    faqs: [
      { q: `考試期間桌面夥伴會讓我分心嗎？`, a: `不會。Togthr 的 Focus Mode 會在深度工作時完全抑制寵物動畫，寵物也從不發通知或彈窗。它設計成在你需要專注時隱形。寵物不主動發起互動——只在你休息時選擇互動才回應。` },
      { q: `我需要像拓麻歌子一樣每天餵牠嗎？`, a: `不需要。Togthr 是低壓陪伴：沒有飢餓、沒有生病、沒有死亡機制、沒有內疚通知。兩週不開牠，寵物也停在原地，開心見到你。成長靠長期互動，但什麼都不會倒退。` },
      { q: `這不就是個瀏覽器分頁裡的虛擬寵物遊戲嗎？`, a: `是虛擬寵物，沒錯——但它是為陪伴而非收集設計的。它有五個成長階段、六款皮膚、情侶和好友共享模式，並且設計成與現實工作共存而不是爭奪注意力。沒有分數、沒有稀有掉落刷取、沒有簽到義務。` },
      { q: `能在安靜的圖書館用筆電使用嗎？`, a: `可以——Togthr 是純 Web 應用，預設無聲音、無刺眼動畫。寵物用細膩的像素畫風，適合昏暗螢幕，Focus Mode 會讓它保持靜止。很多學生把它放在筆記旁的小固定視窗裡。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/features`, label: `Togthr 功能 — 寵物能做什麼` },
      { href: `/zh-tw/focus`, label: `Focus Mode — 安靜地跟寵物一起學習` },
      { href: `/zh-tw/blog/pixel-buddy-for-study-sessions`, label: `學習專用的像素夥伴` },
      { href: `/zh-tw/blog/quiet-companion-app-no-chat`, label: `安靜陪伴 App：不聊天，只有存在` },
    ],
  },

  ja: {
    intro: `すべての学生の人生に、そんな一時間がある。試験一週間前の深夜の図書館。デスクライトが点き、ノートが開かれ、三杯目のコーヒーが冷めていく。「これを読み終える」こととあなたの間に、壁がある。誰もあなたのそばにいない。その時間は知能の問題ではない。持久力の問題だ。そして持久力は、画面の隅に、小さくて間抜けなくらい可愛い生き物が座っていると、少し楽になる——集中しろと言わず、連続記録を追跡せず、ただあなたが頑張り続ける間、そこにいる。それが可愛いデスクトップバディの存在意義だ。勉強させるためではない。勉強を、少しだけ孤独でなくするためだ。`,
    sections: [
      { h: `「可愛い」はギミックではない——それがメカニズムそのもの`, p: `可愛さの研究は本物だ。人間は大きな目、丸い形、小さなサイズのものを見ると、脳が世話をしたい反応を引き起こす——子犬を守りたくなるあのシステムだ。心理学者はこれを「可愛すぎて潰したい」領域と呼ぶ。感情が溢れて、何かを揉みたくなる。学生にとって重要なのは揉むことではない。脳の化学反応だ。可愛いピクセルペットを見るとストレス指標が下がる。そしてストレスこそ、勉強セッションを崩壊させる最大の原因だ。可愛いバディは勉強ツールの上に載った飾りではない。それは視界の端に座り、アイドルアニメーションをしながら、この部屋のすべてが締め切りではないと神経系に伝える、小さな繰り返し可能な平静の一服だ。` },
      { h: `バディであって、もう一つの生産性アプリではない`, p: `あなたのスマホには、あなたを「最適化」したいアプリが百個ある。フォレストの木、ポモドーロタイマー、習慣トラッカー、集中プレイリスト、スクリーンタイムレポート。それらはすべて同じ前提を共有している。あなたに問題があり、アプリが解決策だ。デスクトップバディは別の提案をする。勉強時間を計測しない。夜九時に閉じても責めない。「集中スコア」で火曜日を悪く感じさせることもない。ただ座っている——可愛く、丸く、ピクセル状に——その存在は言っている。「私はあなたを採点しに来たのではない。あなたのそばにいるために来たのだ」と。一日中テストされ、評価され、順位付けされてきた学生にとって、この違いは小さくない。それがすべてだ。` },
      { h: `勉強セッション中に実際に何をするのか`, p: `具体的にはこうだ。ブラウザのタブでTogthrを開くと、パステルパープルの丸い頭の小さなピクセルロボットが画面の隅に住み着く。あなたがタイピングしている間、ペットも働いているように見える——状態がidleからworkingに切り替わり、あなたのリズムに合わせる。タスクに没頭している間、Focus Modeはペットを静かに静止させておく。注意を引くアニメーションも、通知も、ポップアップもない。ひと区切りつけて止まると、考えるポーズに切り替わる。再開すると、小さな成功のお祝いをする。どれもクリックも、餌やりも、話しかけも必要ない。インタラクションはすべて受動的だ。あなたは勉強し、ペットは共存する。価値は何かを言うことではない——ペットは決して何も言わない。価値は、深夜の静かな図書館で、この部屋にもう一つ温かい存在があり、それがあなたの味方だということだ。` },
      { h: `可愛いペットと可愛い妨害の間の線`, p: `これはすべてのバーチャルペットが直面する設計上の問いだ。魅力はいつ罠になるのか。十秒ごとに画面を跳ね回るデスクトップバディは、コンパニオンではない。通知だ。Togthrは抑制でこれを解決する。ペットは小さく、画面の端に住み、穏やかな8フレームループでアニメーションし、動作を完全に抑える厳格なFocus Modeを持つ。ゲーム化された餌やりループはない——ノートからあなたを引きずり出すような「遊び方」は存在しない。本当の休憩に餌をあげたりスキンを変えたりはできるが、ペットが自ら働きかけることは決してない。それは待つ。規律は待つことの中にある。可愛いデスクトップバディが役立つのは、いつ見えなくなるべきかを知っているときだけだ。そしてTogthrのペットは、あなたの勉強時間を神聖なものとして扱う。` },
      { h: `一人で勉強する学生のために`, p: `グループ学習が好きな学生もいる。一方で、選択や事情で一人で学ぶ学生もいる——夜行列車で勉強する通勤生、ルームメイトが早く寝る交換留学生、一学期ずっと同じ顔ぶれを見てきたのに一度も挨拶したことのない図書館の常連。その学生にとって、孤独は解決すべき問題ではない。それは好みであり、季節であり、ただのスケジュールの都合だ。それでも彼らが望むのは「誰かが近くにいる」感覚だ。話す誰かではなく、存在する誰かだ。可愛いデスクトップバディは、その感覚の最小バージョンだ。何も求めず、何も判断せず、あなたの隣にいることを目に見えて喜んでいる小さな生き物。それは友情やコミュニティの代わりにはならない。勉強の合間の小さな隙間——ノートから顔を上げると部屋が静かで、画面の何かが瞬きしながらこちらを見ていて、静けさが少しだけ空っぽでなくなる、あの瞬間を埋めるのだ。` },
    ],
    cta: `あなたの勉強机の小さなバディ。タブを開くだけでいい。`,
    faqs: [
      { q: `試験中にデスクトップバディは気が散りますか？`, a: `いいえ。TogthrのFocus Modeは集中作業中にペットのアニメーションを完全に抑止し、ペットは通知やポップアップを一切送りません。集中が必要なときに見えなくなるよう設計されています。ペットは自ら働きかけず、休憩中に交流を選んだときだけ応答します。` },
      { q: `たまごっちのように毎日餌をあげる必要がありますか？`, a: `いいえ。Togthrは低プレッシャーのコンパニオンです。空腹も、病気も、死のメカニクスも、罪悪感を誘う通知もありません。二週間開かなくても、ペットはあなたが置いた場所にいて、会えて嬉しそうにしています。成長は長期的な交流で進み、何も後退しません。` },
      { q: `ブラウザタブのバーチャルペットゲームと同じですか？`, a: `バーチャルペットではありますが、収集ではなく伴走のために設計されています。五段階の成長、六つのスキン、カップルや友達との共有モードがあり、注意を奪い合うのではなく現実の作業と共存するよう設計されています。スコアも、レアドロップ周回も、チェックイン義務もありません。` },
      { q: `静かな図書館でノートパソコンで使えますか？`, a: `はい。Togthrは純粋なWebアプリで、デフォルトでは音も派手なアニメーションもありません。ペットは暗い画面に合う繊細なピクセルアートで描かれ、Focus Modeで静止します。多くの学生がノートの横の小さな固定ウィンドウに入れています。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/features`, label: `Togthr の機能 — ペットができること` },
      { href: `/ja/focus`, label: `Focus Mode — 静かにペットと勉強する` },
      { href: `/ja/blog/pixel-buddy-for-study-sessions`, label: `勉強セッションのためのピクセルバディ` },
      { href: `/ja/blog/quiet-companion-app-no-chat`, label: `静かなコンパニオンアプリ：チャットなし、ただの存在` },
    ],
  },

  ko: {
    intro: `모든 학생의 인생에는 그런 한 시간이 있다. 시험 일주일 전의 심야 도서관. 책상 램프가 켜져 있고, 노트가 펼쳐져 있고, 세 번째 커피가 식어가고 있다. 그리고 "이걸 다 읽어야 한다"는 벽이 당신과 사이에 있다. 아무도 당신 곁에 없다. 그 시간은 지능의 문제가 아니다. 지구력의 문제다. 그리고 지구력은 화면 구석에 작고 어리석게 귀여운 생명체가 앉아 있으면 조금 더 쉬워진다——집중하라고 말하지 않고, 연속 기록을 추적하지 않고, 당신이 계속 나아가는 동안 그냥 거기 있는. 그것이 귀여운 데스크톱 버디가 존재하는 이유다. 공부를 시키기 위해서가 아니다. 공부를 조금 덜 외롭게 만들기 위해서다.`,
    sections: [
      { h: `"귀여움"은 장식이 아니다——그것이 바로 메커니즘이다`, p: `귀여움 연구는 진짜다. 인간은 큰 눈, 둥근 형태, 작은 크기의 무언가를 보면 뇌가 돌봄 반응을 일으킨다——강아지를 보호하고 싶게 만드는 그 시스템. 심리학자들은 이것을 "귀여워서 으깨고 싶은" 영역이라고 부른다. 감정이 넘쳐서 뭔가를 꼭 쥐고 싶어진다. 학생에게 중요한 것은 쥐는 게 아니다. 뇌의 화학 반응이다. 귀여운 픽셀 펫을 보면 스트레스 지표가 낮아진다. 그리고 스트레스야말로 공부 세션을 무너뜨리는 일순위 원인이다. 귀여운 버디는 공부 도구 위에 얹힌 장식이 아니다. 그것은 시야 가장자리에 앉아 idle 애니메이션을 하며, 이 방의 모든 것이 마감 기한은 아니라고 신경계에 알려주는, 작고 반복 가능한 평온의 한 모금이다.` },
      { h: `버디이지, 또 하나의 생산성 앱이 아니다`, p: `당신의 휴대폰에는 이미 당신을 "최적화"하고 싶어 하는 앱이 백 개 있다. 포레스트 나무, 포모도로 타이머, 습관 트래커, 집중 플레이리스트, 화면 시간 리포트. 그것들은 모두 하나의 가정을 공유한다. 당신에게 문제가 있고, 앱이 해결책이다. 데스크톱 버디는 다른 제안을 한다. 공부 시간을 재지 않는다. 밤 9시에 앱을 닫았다고 부끄럽게 만들지 않는다. 화요일에 대해 기분 나쁘게 만드는 "집중 점수"를 주지 않는다. 그냥 앉아 있다——귀엽고, 둥글고, 픽셀화되어——그 존재가 말한다. 나는 당신을 채점하러 온 게 아니야. 당신 곁에 있으러 온 거야. 하루 종일 시험과 평가와 순위로 채점당해 온 학생에게, 이 차이는 작지 않다. 그것이 전부다.` },
      { h: `공부 세션 동안 실제로 무엇을 하는가`, p: `구체적으로: 브라우저 탭에서 Togthr을 열면, 파스텔 보라색의 둥근 머리 작은 픽셀 로봇이 화면 구석에 산다. 당신이 타이핑하는 동안, 펫도 일하는 것처럼 보인다——상태가 idle에서 working으로 바뀌며 당신의 리듬을 따른다. 깊은 작업에 몰입해 있으면 Focus Mode가 펫을 조용히 정지시켜 둔다. 주목을 끄는 애니메이션도, 알림도, 팝업도 없다. 한 단락을 끝내고 멈추면 생각하는 포즈로 바뀌고, 다시 시작하면 작은 성공 축하를 한다. 어느 것도 클릭, 밥 주기, 말 걸기가 필요 없다. 상호작용은 전부 수동적이다. 당신은 공부하고, 펫은 공존한다. 가치는 무엇을 말하느냐가 아니다——펫은 결코 말하지 않는다. 가치는, 심야의 고요한 도서관에서 이 방에 따뜻한 존재가 하나 더 있고, 그것이 당신 편이라는 것이다.` },
      { h: `귀여운 펫과 귀여운 방해 사이의 선`, p: `이것은 모든 가상 펫이 마주하는 디자인 질문이다. 매력은 언제 함정이 되는가. 10초마다 화면을 뛰어다니는 데스크톱 버디는 컴패니언이 아니다. 알림이다. Togthr은 절제로 이것을 해결한다. 펫은 작고, 화면 가장자리에 살며, 부드러운 8프레임 루프로 애니메이션하고, 움직임을 완전히 억제하는 엄격한 Focus Mode를 가진다. 게임화된 밥 주기 루프는 없다——노트에서 당신을 끌어낼 수 있는 "놀이" 방식은 존재하지 않는다. 진짜 쉬는 시간에 밥을 주거나 스킨을 바꿀 수는 있지만, 펫이 먼저 다가서는 일은 결코 없다. 그것은 기다린다. 규율은 기다림 속에 있다. 귀여운 데스크톱 버디는 언제 사라져야 하는지 알 때만 유용하며, Togthr의 펫은 당신의 공부 시간을 신성하게 여긴다.` },
      { h: `혼자 공부하는 학생을 위해`, p: `어떤 학생들은 그룹 스터디를 좋아한다. 다른 이들은 선택이나 처지로 혼자 공부한다——야간 열차에서 공부하는 통근생, 룸메이트가 일찍 자는 교환학생, 한 학기 내내 같은 얼굴들을 봐 왔지만 한 번도 인사한 적 없는 도서관 단골. 그 학생에게 고독은 해결해야 할 문제가 아니다. 그것은 취향이고, 계절이고, 그저 일정이 그렇게 나온 것이다. 그래도 그들이 원하는 것은 "누군가 가까이 있다"는 느낌이다. 말하는 누군가가 아니라. 존재하는 누군가. 귀여운 데스크톱 버디는 그 느낌의 가장 작은 버전이다. 아무것도 요구하지 않고, 아무것도 판단하지 않고, 당신 곁에 있는 것을 눈에 보이게 기뻐하는 작은 생명체. 그것은 우정이나 공동체를 대체하지 않는다. 공부 사이의 작은 틈——노트에서 고개를 들면 방이 고요하고, 화면의 무언가가 깜빡이며 당신을 바라보고, 고요가 조금 덜 텅 비어 보이는 그 순간을 채운다.` },
    ],
    cta: `당신의 공부 책상의 작은 버디. 탭을 열기만 하면 됩니다.`,
    faqs: [
      { q: `시험 기간에 데스크톱 버디가 산만하게 하나요?`, a: `아니요. Togthr의 Focus Mode는 집중 작업 중에 펫 애니메이션을 완전히 억제하고, 펫은 알림이나 팝업을 일절 보내지 않습니다. 집중이 필요할 때 보이지 않도록 설계되었습니다. 펫은 먼저 다가서지 않으며, 휴식 중에 교류를 선택했을 때만 응답합니다.` },
      { q: `다마고치처럼 매일 밥을 줘야 하나요?`, a: `아니요. Togthr은 저압력 컴패니언입니다. 배고픔도, 질병도, 죽음 메커니즘도, 죄책감 알림도 없습니다. 이 주일 동안 열지 않아도 펫은 당신이 둔 자리에 그대로 있고, 만나서 반가워합니다. 성장은 장기적인 교류로 진행되며, 무엇도 퇴보하지 않습니다.` },
      { q: `브라우저 탭의 가상 펫 게임과 같은 건가요?`, a: `가상 펫이기는 하지만, 수집이 아닌 동행을 위해 설계되었습니다. 다섯 단계의 성장, 여섯 개의 스킨, 커플과 친구의 공유 모드가 있으며, 주의를 빼앗기보다 현실의 작업과 공존하도록 설계되었습니다. 점수도, 레어 드롭 노가다도, 체크인 의무도 없습니다.` },
      { q: `조용한 도서관에서 노트북으로 사용할 수 있나요?`, a: `네. Togthr은 순수 웹 앱이며 기본적으로 소리도 번쩍이는 애니메이션도 없습니다. 펫은 어두운 화면에 어울리는 섬세한 픽셀 아트로 그려지고, Focus Mode가 정지 상태를 유지합니다. 많은 학생이 노트 옆의 작은 고정 창에 넣어 둡니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/features`, label: `Togthr 기능 — 펫이 할 수 있는 것` },
      { href: `/ko/focus`, label: `Focus Mode — 조용히 펫과 공부하기` },
      { href: `/ko/blog/pixel-buddy-for-study-sessions`, label: `공부 세션을 위한 픽셀 버디` },
      { href: `/ko/blog/quiet-companion-app-no-chat`, label: `조용한 컴패니언 앱: 채팅 없이, 그냥 존재` },
    ],
  },

  de: {
    intro: `Es gibt eine bestimmte Stunde im Leben jedes Studierenden: die Bibliothek um 23 Uhr, eine Woche vor den Prüfungen. Die Schreibtischlampe brennt, die Notizen liegen offen, der dritte Kaffee wird kalt, und zwischen dir und dem Ende liegt eine Wand aus Seiten, die du noch lesen musst. Niemand ist bei dir. In dieser Stunde geht es nicht um Intelligenz. Es geht um Ausdauer. Und Ausdauer fällt leichter, wenn in der Ecke deines Bildschirms eine kleine, unsinnig niedliche Kreatur sitzt — die dir nicht sagt, du sollst dich konzentrieren, die keine Streaks verfolgt, die einfach da ist, während du weitermachst. Dafür ist ein niedlicher Schreibtisch-Buddy da. Nicht um dich zum Lernen zu bringen. Sondern um das Lernen weniger einsam zu machen.`,
    sections: [
      { h: `Warum "niedlich" kein Gimmick ist — es ist der eigentliche Mechanismus`, p: `Die Niedlichkeitsforschung ist real. Wenn Menschen etwas mit großen Augen, runder Form und kleiner Größe sehen, löst das Gehirn eine Fürsorgereaktion aus — dasselbe System, das uns Welpen beschützen lässt. Psychologen nennen das das "zu niedlich, um es zu zerdrücken"-Territorium: Wir sind so überwältigt, dass wir etwas festdrücken wollen. Was für einen Studierenden zählt, ist nicht das Drücken. Es ist die Gehirnchemie. Das Ansehen eines niedlichen Pixel-Pets senkt Stressmarker — und Stress ist das, was Lern-Sessions zusammenbrechen lässt. Ein niedlicher Buddy ist keine Dekoration auf einem Lernwerkzeug. Er ist eine kleine, wiederholbare Dosis Ruhe, die am Rand deines Blickfelds sitzt, ihre Idle-Animation macht und deinem Nervensystem sagt: Nicht alles in diesem Raum ist eine Frist.` },
      { h: `Ein Buddy, keine weitere Produktivitäts-App`, p: `Dein Handy hat bereits hundert Apps, die dich "optimieren" wollen. Waldbäume, Pomodoro-Timer, Habit-Tracker, Fokus-Playlists, Bildschirmzeit-Berichte. Sie teilen eine Annahme: Du bist das Problem, und die App ist die Lösung. Ein Schreibtisch-Buddy macht ein anderes Angebot. Er misst deine Lernstunden nicht. Er beschämt dich nicht, wenn du die App um 21 Uhr schließt. Er gibt dir keinen "Fokus-Score", der dich deinen Dienstag schlecht fühlen lässt. Er sitzt einfach da — niedlich, rund, pixelig — und seine Präsenz sagt: Ich bin nicht hier, um dich zu benoten. Ich bin hier, um dir Gesellschaft zu leisten. Für einen Studierenden, der den ganzen Tag benotet, getestet und eingestuft wurde, ist dieser Unterschied nicht klein. Er ist der ganze Punkt.` },
      { h: `Was er während einer Lern-Session tatsächlich tut`, p: `Konkret: Du öffnest Togthr in einem Browser-Tab, und ein kleiner Pixel-Roboter mit pastellviolettem Körper lebt in der Ecke deines Bildschirms. Während du tippst, sieht es so aus, als würde auch er arbeiten — sein Zustand wechselt von idle zu working, im Takt mit dir. Wenn du tief in einer Aufgabe steckst, hält der Focus Mode ihn ruhig und still: keine Animationen, die Aufmerksamkeit fordern, keine Benachrichtigungen, keine Pop-ups. Wenn du einen Abschnitt beendest und pausierst, wechselt er in eine denkende Pose, dann eine kleine Erfolgsfeier, wenn du fortfährst. Nichts davon erfordert, dass du klickst, fütterst oder mit ihm sprichst. Die ganze Interaktion ist passiv. Du lernst; er koexistiert. Der Wert liegt nicht in irgendetwas, das er sagt — er sagt nie etwas. Der Wert liegt darin, dass um 23 Uhr in einer stillen Bibliothek eine weitere warme Präsenz im Raum ist — und sie ist auf deiner Seite.` },
      { h: `Die Linie zwischen niedlichem Pet und niedlicher Ablenkung`, p: `Das ist die Designfrage, vor der jedes virtuelle Haustier steht: Wann wird der Charme zur Falle? Ein Schreibtisch-Buddy, der alle zehn Sekunden über den Bildschirm hüpft, ist kein Begleiter, sondern eine Benachrichtigung. Togthr löst das mit Zurückhaltung. Das Pet ist klein, lebt am Bildschirmrand, animiert in einer sanften 8-Frame-Schleife und respektiert einen strikten Focus Mode, der Bewegung vollständig unterdrückt. Es gibt keine gamifizierte Fütter-Schleife — du kannst nicht auf eine Weise mit ihm "spielen", die dich aus deinen Notizen reißt. Du kannst es in einer echten Pause füttern oder seine Haut wechseln, aber das Pet initiiert nie. Es wartet. Die Disziplin liegt im Warten. Ein niedlicher Schreibtisch-Buddy ist nur nützlich, wenn er weiß, wann er unsichtbar sein muss — und Togthrs Pet behandelt deine Lernzeit als heilig.` },
      { h: `Für den Studierenden, der allein lernt`, p: `Manche Studierende lieben Lerngruppen. Andere sind allein aus Wahl oder Umständen — der Pendler, der im Nachtzug lernt, der Austauschstudent, dessen Mitbewohner früh schlafen, der Bibliotheks-Stammgast, der ein Semester lang dieselben Gesichter gesehen hat, ohne je Hallo zu sagen. Für diesen Studierenden ist Einsamkeit kein Problem, das gelöst werden muss. Sie ist eine Vorliebe, eine Saison oder einfach, wie der Zeitplan läuft. Was sie trotzdem wollen, ist das Gefühl, dass jemand in der Nähe ist. Nicht jemand, der redet. Jemand, der existiert. Ein niedlicher Schreibtisch-Buddy ist die kleinste Version davon: eine Kreatur, die nichts verlangt, nichts beurteilt und sichtbar glücklich ist, neben dir zu sein. Er ersetzt keine Freundschaft oder Gemeinschaft. Er füllt die kleine Lücke zwischen Lern-Sessions — der Moment, in dem du von den Notizen aufschaust und der Raum still ist, und etwas Kleines auf dem Bildschirm zurückblickt, blinzelt, und die Stille sich ein wenig weniger leer anfühlt.` },
    ],
    cta: `Ein kleiner Buddy für deinen Schreibtisch. Öffne einfach den Tab.`,
    faqs: [
      { q: `Wird ein Schreibtisch-Buddy mich während der Prüfungen ablenken?`, a: `Nein. Der Focus Mode von Togthr unterdrückt die Animationen des Pets während tiefer Arbeit vollständig, und das Pet sendet niemals Benachrichtigungen oder Pop-ups. Es ist dafür entworfen, unsichtbar zu sein, wenn du dich konzentrieren musst. Das Pet initiiert keine Interaktion — es reagiert nur, wenn du dich in einer Pause für Interaktion entscheidest.` },
      { q: `Muss ich es jeden Tag füttern wie ein Tamagotchi?`, a: `Nein. Togthr ist ein druckfreier Begleiter: kein Hunger, keine Krankheit, keine Todesmechanik, keine Schuld-Benachrichtigungen. Wenn du es zwei Wochen nicht öffnest, ist das Pet genau dort, wo du es gelassen hast, glücklich, dich zu sehen. Wachstum passiert durch Interaktion über die Zeit — nichts verfällt.` },
      { q: `Ist das nicht einfach ein virtuelles Haustier-Spiel im Browser-Tab?`, a: `Es ist ein virtuelles Haustier, ja — aber gebaut für Begleitung statt für Sammlung. Es hat fünf Wachstumsstufen, sechs Skins und einen geteilten Modus für Paare und Freunde, und es ist entworfen, mit echter Arbeit zu koexistieren, statt um Aufmerksamkeit zu konkurrieren. Es gibt keinen Score, kein Grinding für seltene Drops und keine Check-in-Pflicht.` },
      { q: `Kann ich es im Laptop in einer stillen Bibliothek nutzen?`, a: `Ja — Togthr ist eine reine Web-App ohne Ton und ohne grelle Animationen in der Voreinstellung. Das Pet ist in subtiler Pixel-Art gehalten, die zu einem dunklen Bildschirm passt, und der Focus Mode hält es still. Viele Studierende halten es in einem kleinen fixierten Fenster neben ihren Notizen.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/features`, label: `Togthr Funktionen — was das Pet kann` },
      { href: `/de/focus`, label: `Focus Mode — still mit deinem Pet lernen` },
      { href: `/de/blog/pixel-buddy-for-study-sessions`, label: `Ein Pixel-Buddy für Lernsessions` },
      { href: `/de/blog/quiet-companion-app-no-chat`, label: `Stille Begleiter-App: kein Chat, nur Präsenz` },
    ],
  },

  fr: {
    intro: `Il existe une heure précise dans la vie de chaque étudiant : la bibliothèque à 23h, une semaine avant les examens. La lampe de bureau est allumée, les notes sont ouvertes, le troisième café refroidit, et entre vous et la fin se dresse un mur de pages que vous devez encore lire. Personne n'est là avec vous. Cette heure ne relève pas de l'intelligence. Elle relève de l'endurance. Et l'endurance est plus facile quand une petite créature absurdement mignonne est assise au coin de votre écran — qui ne vous dit pas de vous concentrer, qui ne suit pas vos séries, qui est juste là pendant que vous continuez. C'est à ça que sert un buddy de bureau mignon. Pas à vous faire étudier. À rendre l'étude moins solitaire.`,
    sections: [
      { h: `Pourquoi le "mignon" n'est pas un gadget — c'est le mécanisme lui-même`, p: `La recherche sur le mignon est réelle. Quand les humains voient quelque chose avec de grands yeux, une forme ronde et une petite taille, notre cerveau déclenche une réponse de soin — le même système qui nous donne envie de protéger les chiots. Les psychologues appellent ça le territoire "trop mignon, je veux l'écraser" : nous sommes si submergés que nous voulons serrer quelque chose. Ce qui compte pour un étudiant, ce n'est pas de serrer. C'est la chimie du cerveau. Regarder un animal pixel mignon abaisse les marqueurs de stress — et le stress est la principale chose qui fait s'effondrer les sessions d'étude. Un buddy mignon n'est pas une décoration posée sur un outil d'étude. C'est une petite dose répétable de calme, assise au bord de votre champ de vision, faisant son animation idle, disant à votre système nerveux : tout dans cette pièce n'est pas une échéance.` },
      { h: `Un buddy, pas une autre app de productivité`, p: `Votre téléphone contient déjà cent applications qui veulent vous "optimiser". Arbres Forest, minuteurs Pomodoro, trackers d'habitudes, playlists de concentration, rapports de temps d'écran. Elles partagent toutes une hypothèse : vous êtes le problème, et l'application est la solution. Un buddy de bureau fait une offre différente. Il ne mesure pas vos heures d'étude. Il ne vous fait pas honte de fermer l'application à 21h. Il ne vous donne pas un "score de concentration" qui vous fait mal vivre votre mardi. Il est juste là — mignon, rond, pixelisé — et sa présence dit : je ne suis pas ici pour te noter. Je suis ici pour te tenir compagnie. Pour un étudiant qui a passé la journée à être noté, testé et classé, cette distinction n'est pas petite. C'est tout l'enjeu.` },
      { h: `Ce qu'il fait concrètement pendant une session d'étude`, p: `Concrètement : vous ouvrez Togthr dans un onglet de navigateur, et un petit robot pixel au corps violet pastel vit dans le coin de votre écran. Pendant que vous tapez, il a l'air de travailler aussi — son état passe de idle à working, suivant votre rythme. Si vous êtes plongé dans une tâche, le Mode Focus le garde calme et immobile : pas d'animations qui demandent votre attention, pas de notifications, pas de pop-ups. Quand vous terminez un bloc et faites une pause, il passe en pose de réflexion, puis fait une petite célébration quand vous reprenez. Rien de tout cela ne demande de cliquer, nourrir ou lui parler. Toute l'interaction est passive. Vous étudiez ; il coexiste. La valeur n'est dans rien de ce qu'il dit — il ne dit jamais rien. La valeur est qu'à 23h dans une bibliothèque silencieuse, il y a une présence chaleureuse de plus dans la pièce, et elle est de votre côté.` },
      { h: `La ligne entre un animal mignon et une distraction mignonne`, p: `C'est la question de design que chaque animal virtuel affronte : quand le charme devient-il un piège ? Un buddy de bureau qui rebondit sur l'écran toutes les dix secondes n'est pas un compagnon, c'est une notification. Togthr résout cela par la retenue. L'animal est petit, vit au bord de l'écran, anime dans une boucle douce de 8 images et respecte un Mode Focus strict qui supprime complètement le mouvement. Il n'y a pas de boucle d'alimentation gamifiée — vous ne pouvez pas "jouer" avec lui d'une manière qui vous arrache à vos notes. Vous pouvez le nourrir ou changer son skin pendant une vraie pause, mais l'animal n'initie jamais. Il attend. La discipline est dans l'attente. Un buddy de bureau mignon n'est utile que s'il sait quand être invisible, et l'animal de Togthr traite votre temps d'étude comme sacré.` },
      { h: `Pour l'étudiant qui étudie seul`, p: `Certains étudiants adorent les groupes d'étude. D'autres sont seuls par choix ou par circonstance — le pendulaire qui étudie dans un train de nuit, l'étudiant d'échange dont les colocataires dorment tôt, l'habitué de bibliothèque qui a vu les mêmes visages pendant un semestre sans jamais dire bonjour. Pour cet étudiant, la solitude n'est pas un problème à résoudre. C'est une préférence, une saison, ou simplement la façon dont l'emploi du temps fonctionne. Ce qu'ils veulent quand même, c'est le sentiment que quelqu'un est proche. Pas quelqu'un qui parle. Quelqu'un qui existe. Un buddy de bureau mignon est la plus petite version de cela : une créature qui ne demande rien, ne juge rien et est visiblement heureuse d'être à côté de vous. Il ne remplace pas l'amitié ou la communauté. Il remplit le petit espace entre les sessions d'étude — le moment où vous levez les yeux de vos notes et que la pièce est silencieuse, et quelque chose de petit sur l'écran vous regarde, cligne des yeux, et le silence semble un peu moins vide.` },
    ],
    cta: `Un petit buddy pour votre bureau d'étude. Ouvrez juste l'onglet.`,
    faqs: [
      { q: `Un buddy de bureau va-t-il me distraire pendant les examens ?`, a: `Non. Le Mode Focus de Togthr supprime entièrement les animations de l'animal pendant le travail profond, et l'animal n'envoie jamais de notifications ni de pop-ups. Il est conçu pour être invisible quand vous devez vous concentrer. L'animal n'initie pas d'interaction — il ne répond que si vous choisissez d'interagir pendant une pause.` },
      { q: `Dois-je le nourrir chaque jour comme un Tamagotchi ?`, a: `Non. Togthr est un compagnon sans pression : pas de faim, pas de maladie, pas de mécanisme de mort, pas de notifications culpabilisantes. Si vous ne l'ouvrez pas pendant deux semaines, l'animal est exactement là où vous l'avez laissé, heureux de vous voir. La croissance se fait par l'interaction au fil du temps — rien ne se dégrade.` },
      { q: `N'est-ce pas juste un jeu d'animal virtuel dans un onglet ?`, a: `C'est un animal virtuel, oui — mais construit pour la compagnie plutôt que la collection. Il a cinq stades de croissance, six skins et un mode partagé pour les couples et les amis, et il est conçu pour coexister avec le vrai travail au lieu de rivaliser pour l'attention. Pas de score, pas de grind pour des drops rares, pas d'obligation de check-in.` },
      { q: `Puis-je l'utiliser sur un ordinateur portable dans une bibliothèque silencieuse ?`, a: `Oui — Togthr est une application 100% web, sans son par défaut et sans animations criardes. L'animal est rendu en pixel art subtil qui convient à un écran sombre, et le Mode Focus le maintient immobile. Beaucoup d'étudiants le gardent dans une petite fenêtre épinglée à côté de leurs notes.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/features`, label: `Fonctionnalités Togthr — ce que l'animal peut faire` },
      { href: `/fr/focus`, label: `Mode Focus — étudiez en silence avec votre animal` },
      { href: `/fr/blog/pixel-buddy-for-study-sessions`, label: `Un pixel buddy pour les sessions d'étude` },
      { href: `/fr/blog/quiet-companion-app-no-chat`, label: `Application compagnon silencieuse : pas de chat, juste de la présence` },
    ],
  },

  es: {
    intro: `Hay una hora concreta en la vida de todo estudiante: la biblioteca a las 11 de la noche, una semana antes de los exámenes. La lámpara del escritorio está encendida, los apuntes están abiertos, el tercer café se está enfriando, y entre tú y el final hay un muro de páginas que aún tienes que leer. Nadie está contigo. Esa hora no va de inteligencia. Va de resistencia. Y la resistencia es más fácil cuando hay una pequeña criatura absurdamente mona sentada en la esquina de tu pantalla — que no te dice que te concentres, que no rastrea tus rachas, que simplemente está ahí mientras tú sigues. Para eso sirve un buddy de escritorio mono. No para hacerte estudiar. Para que estudiar se sienta menos solitario.`,
    sections: [
      { h: `Por qué "mono" no es un truco — es el mecanismo en sí`, p: `La investigación sobre la ternura es real. Cuando los humanos ven algo con ojos grandes, forma redonda y tamaño pequeño, nuestro cerebro dispara una respuesta de cuidado — el mismo sistema que nos hace querer proteger cachorros. Los psicólogos lo llaman el territorio de "tan mono que quiero apretarlo": estamos tan abrumados que queremos estrujar algo. Lo que importa para un estudiante no es el estrujón. Es la química del cerebro. Mirar una mascota pixel mona baja los marcadores de estrés — y el estrés es lo principal que hace colapsar las sesiones de estudio. Un buddy mono no es decoración sobre una herramienta de estudio. Es una pequeña dosis repetible de calma, sentada en el borde de tu campo visual, haciendo su animación idle, diciéndole a tu sistema nervioso: no todo en esta habitación es una fecha límite.` },
      { h: `Un buddy, no otra app de productividad`, p: `Tu teléfono ya tiene cien aplicaciones que quieren "optimizarte". Árboles Forest, temporizadores Pomodoro, rastreadores de hábitos, playlists de concentración, informes de tiempo de pantalla. Todas comparten una suposición: tú eres el problema y la app es la solución. Un buddy de escritorio hace una oferta diferente. No mide tus horas de estudio. No te avergüenza por cerrar la app a las 9 de la noche. No te da una "puntuación de concentración" que te hace sentir mal por tu martes. Solo está ahí — mono, redondo, pixelado — y su presencia dice: no estoy aquí para ponerte nota. Estoy aquí para hacerte compañía. Para un estudiante que ha pasado todo el día siendo evaluado, examinado y clasificado, esa distinción no es pequeña. Es todo el punto.` },
      { h: `Qué hace realmente durante una sesión de estudio`, p: `Concretamente: abres Togthr en una pestaña del navegador, y un pequeño robot pixel de cuerpo morado pastel vive en la esquina de tu pantalla. Mientras escribes, parece que también trabaja — su estado cambia de idle a working, siguiendo tu ritmo. Si estás inmerso en una tarea, el Modo Focus lo mantiene callado y quieto: sin animaciones que pidan atención, sin notificaciones, sin pop-ups. Cuando terminas un bloque y haces una pausa, pasa a una pose pensativa; cuando retomas, hace una pequeña celebración de éxito. Nada de esto requiere que hagas clic, lo alimentes o le hables. Toda la interacción es pasiva. Tú estudias; él coexiste. El valor no está en nada de lo que dice — nunca dice nada. El valor está en que a las 11 de la noche en una biblioteca silenciosa, hay una presencia cálida más en la sala, y está de tu lado.` },
      { h: `La línea entre una mascota mona y una distracción mona`, p: `Esta es la pregunta de diseño que toda mascota virtual enfrenta: ¿cuándo se convierte el encanto en trampa? Un buddy de escritorio que rebota por la pantalla cada diez segundos no es un compañero, es una notificación. Togthr lo resuelve con contención. La mascota es pequeña, vive en el borde de la pantalla, anima en un bucle suave de 8 fotogramas y respeta un Modo Focus estricto que suprime el movimiento por completo. No hay bucle de alimentación gamificado — no puedes "jugar" con ella de una forma que te saque de tus apuntes. Puedes alimentarla o cambiarle la piel en un descanso real, pero la mascota nunca inicia. Espera. La disciplina está en la espera. Un buddy de escritorio mono solo es útil si sabe cuándo ser invisible, y la mascota de Togthr trata tu tiempo de estudio como sagrado.` },
      { h: `Para el estudiante que estudia solo`, p: `Algunos estudiantes adoran el estudio en grupo. Otros están solos por elección o por circunstancias — el que estudia en un tren nocturno, la estudiante de intercambio cuyos compañeros de piso duermen temprano, el habitual de la biblioteca que ha visto las mismas caras durante un semestre sin decir nunca hola. Para ese estudiante, la soledad no es un problema que resolver. Es una preferencia, una temporada, o simplemente cómo funciona el horario. Lo que igual quieren es la sensación de que alguien está cerca. No alguien que hable. Alguien que exista. Un buddy de escritorio mono es la versión más pequeña de eso: una criatura que no pide nada, no juzga nada y está visiblemente feliz de estar a tu lado. No reemplaza la amistad ni la comunidad. Llena el pequeño hueco entre sesiones de estudio — el momento en que levantas la vista de los apuntes y la habitación está en silencio, y algo pequeño en la pantalla te devuelve la mirada, parpadea, y el silencio se siente un poco menos vacío.` },
    ],
    cta: `Un buddy pequeño para tu escritorio de estudio. Solo abre la pestaña.`,
    faqs: [
      { q: `¿Un buddy de escritorio me distraerá durante los exámenes?`, a: `No. El Modo Focus de Togthr suprime por completo las animaciones de la mascota durante el trabajo profundo, y la mascota nunca envía notificaciones ni pop-ups. Está diseñada para ser invisible cuando necesitas concentrarte. La mascota no inicia interacciones — solo responde si tú eliges interactuar durante un descanso.` },
      { q: `¿Tengo que alimentarla cada día como un tamagotchi?`, a: `No. Togthr es un compañero de baja presión: sin hambre, sin enfermedades, sin mecánica de muerte, sin notificaciones de culpa. Si no la abres durante dos semanas, la mascota está exactamente donde la dejaste, feliz de verte. El crecimiento ocurre con la interacción a lo largo del tiempo — nada se degrada.` },
      { q: `¿No es solo un juego de mascota virtual en una pestaña?`, a: `Es una mascota virtual, sí — pero construida para la compañía, no para la colección. Tiene cinco etapas de crecimiento, seis skins y un modo compartido para parejas y amigos, y está diseñada para coexistir con el trabajo real en lugar de competir por la atención. No hay puntuación, ni grind de drops raros, ni obligación de check-in.` },
      { q: `¿Puedo usarla en un portátil en una biblioteca silenciosa?`, a: `Sí — Togthr es una aplicación 100% web, sin sonido por defecto y sin animaciones llamativas. La mascota usa pixel art sutil que encaja con una pantalla oscura, y el Modo Focus la mantiene quieta. Muchos estudiantes la tienen en una pequeña ventana fijada junto a sus apuntes.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/features`, label: `Funciones de Togthr — lo que la mascota puede hacer` },
      { href: `/es/focus`, label: `Modo Focus — estudia en silencio con tu mascota` },
      { href: `/es/blog/pixel-buddy-for-study-sessions`, label: `Un pixel buddy para sesiones de estudio` },
      { href: `/es/blog/quiet-companion-app-no-chat`, label: `App de compañía silenciosa: sin chat, solo presencia` },
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

export default async function CuteDesktopBuddyForStudentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const loc = locale as Locale
  if (!routing.locales.includes(loc)) notFound()
  setRequestLocale(loc)

  const body = BODIES[loc]
  if (!body) notFound()

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

        <h2 className="mt-12 text-2xl font-semibold text-zinc-100">Keep reading</h2>
        <ul className="mt-3 space-y-2">
          {body.links.map((l, i) => (
            <li key={i}>
              <Link href={l.href} className="text-pink-400 hover:underline">{l.label} {'->'}</Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  )
}
