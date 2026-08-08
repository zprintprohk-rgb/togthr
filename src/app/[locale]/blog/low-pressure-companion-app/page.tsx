// src/app/[locale]/blog/low-pressure-companion-app/page.tsx
//
// Job 1 daily blog 2026-08-05
// Topic: low-pressure-companion-app + no-streak + no-guilt + gentle-presence
//        A virtual pet that does not punish you for having a life. No
//        streak counters, no guilt notifications, no daily check-in
//        demands — just a small creature that is happy to see you
//        whenever you show up. Group 2 (lonely-companion) keyword:
//        "low pressure companion app."
//
// Hook: Most companion apps keep score. This one does not.

import Link from 'next/link'
import BlogCtaBanner from '@/components/blogctabanner'
import { withUtm } from '@/lib/utm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `low-pressure-companion-app`
const POST_DATE = `2026-08-05`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  en: {
    intro: `There is a quiet trap inside most companion apps. It looks like a streak counter. Or a daily login reward. Or a push notification that says, "Your pet misses you." It is designed to feel like encouragement. What it actually feels like is a to-do item you cannot check off. You skip a day, the streak breaks. You skip a week, the notifications get heavier. The app that was supposed to feel like a friend starts to feel like a manager — tracking your attendance, grading your commitment, quietly suggesting that you are not doing enough. A companion app should not make you feel worse about your life. That is the entire thesis behind low-pressure design. And it is why Togthr does not have a single streak counter anywhere in the product.`,
    sections: [
      { h: `The design cost of keeping score`, p: `Streaks and daily rewards are borrowed from mobile gaming — they are retention mechanics, not care mechanics. The design goal is to keep you opening the app every day, because daily active users (DAU) is a metric investors like. The problem is that real life does not fit inside a 24-hour window. Some days you are sick. Some days you are traveling. Some days you are just tired and the last thing you need is a notification telling you that your virtual pet is sad because you forgot to feed it. When a companion app punishes you for having a life, it stops being a companion. It becomes another source of digital guilt — and most people already have plenty of that from unread emails, missed calls, and group chats they muted months ago.` },
      { h: `What a low-pressure companion actually does differently`, p: `A low-pressure companion does not measure you. It does not count your visits, track your streaks, or send you reminders that you have not opened the app in a while. When you come back after two weeks, it does not guilt you. It is just happy to see you — the same way a real pet wags its tail whether you have been gone five minutes or five hours. Togthr's pet exists in five growth stages, but there is no timer. The stages are not gated by daily check-ins. They are gated by how much you interact with the pet — and interaction means feeding, playing, customizing, exploring. If you do those things in a weekend binge after a busy month, the pet grows just as much as if you had spread it across thirty days. The pet does not know the difference. It is not keeping score.` },
      { h: `Why gentle design wins (and the data backs it up)`, p: `There is a counterintuitive truth in behavioral design: removing pressure often increases engagement. When people do not feel like they are failing, they are more likely to return voluntarily — not because a notification told them to, but because they genuinely want to see their pet. This is the difference between extrinsic motivation (streaks, rewards, fear of loss) and intrinsic motivation (curiosity, affection, belonging). Extrinsic motivation burns out. Intrinsic motivation compounds. A low-pressure companion app bets on the second one. It trusts that if the pet is charming enough, and the experience is gentle enough, people will come back on their own — not because the app demanded it, but because they missed the small creature on their screen. That trust is hard to build, but once it is there, it is far more durable than any streak mechanic.` },
      { h: `The moment that changed how we designed the pet`, p: `Early in Togthr's development, we watched a beta tester use the app for two weeks, then disappear for eleven days. When they came back, they sent us a message: "I was afraid to open the app because I thought my pet would be dead." We had not built any death mechanic. We had never planned to. But that message told us something important: the user had been conditioned by decades of Tamagotchi-style virtual pets to expect punishment for absence. That conditioning is so deep that even when a product does not punish you, users assume it will. That was the moment we decided: no death. No sickness. No degradation. The pet's growth is permanent. Every interaction moves the needle forward, and no absence moves it backward. The worst thing that can happen if you do not open Togthr for a month is... nothing. The pet will be exactly where you left it, doing its idle animation, waiting. And when you come back, it will celebrate.` },
      { h: `Who needs a low-pressure companion`, p: `The person who already tracks enough things — sleep scores, step counts, calorie budgets, screen time limits, inbox-zero targets. The person with ADHD who has enough apps making them feel like they are failing at being a person. The person in a depressive episode who cannot handle another notification telling them they missed something. The busy parent who steals five minutes of quiet at 11pm and does not want an app that says, "You have not fed your pet today." The person recovering from burnout who is slowly rebuilding small joys and needs those joys to stay small. A low-pressure companion is not for people who need more discipline. It is for people who need more grace. It is a tiny creature that never, ever makes you feel like you are not enough.` },
    ],
    cta: `No streaks. No guilt. No pressure. Just open the tab.`,
    faqs: [
      { q: `Does Togthr have a streak counter or daily check-in requirement?`, a: `No. Togthr has no streak counters, no daily login rewards, and no penalties for absence. The pet grows through interaction — feeding, playing, customizing — but there is no timer or deadline. You can interact for two hours on a Sunday after a busy month, and the pet will grow just as much as if you had visited daily. The pet is designed to fit your life, not the other way around.` },
      { q: `What happens to my pet if I do not open the app for a long time?`, a: `Nothing bad. The pet does not get sick, does not die, does not degrade, and does not lose progress. It stays in whatever growth stage you left it in and waits patiently. When you return, it celebrates. There is no guilt mechanics, no sad-face notifications, and no punishment for having a busy life.` },
      { q: `How is Togthr different from other companion apps that send daily reminders?`, a: `Most companion apps use gaming-style retention mechanics — streaks, daily rewards, push notifications — to maximize daily active users. Togthr takes the opposite approach: no streaks, no daily demands, no guilt. The bet is that a gentle, pressure-free experience builds more durable attachment than any notification system. You come back because you want to see your pet, not because an alert told you to.` },
      { q: `Can I still set reminders if I want them?`, a: `Yes — but only if you choose to. Togthr's reminder system is entirely opt-in and customizable. You can set a gentle nudge for evening reflection, a morning check-in, or none at all. The default is silence. The app trusts you to set your own rhythm.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/features`, label: `Togthr features — everything the pet can do` },
      { href: `/en/focus`, label: `Focus Mode — work quietly with your pet` },
      { href: `/en/blog/quiet-companion-app-no-chat`, label: `Quiet companion app: no chat, just presence` },
      { href: `/en/blog/lonely-desk-companion`, label: `Lonely desk companion: a small pixel friend` },
    ],
  },

  'zh-cn': {
    intro: `大多数陪伴 App 里有一个安静的陷阱。它看起来像连续签到计数器。或者每日登录奖励。或者一条推送通知，上面写着"你的宠物想你了"。它的设计意图是鼓励。但实际感受是一个永远勾不掉的任务。你跳过一天，连胜断了。跳过一周，通知变得更重了。那个本该像朋友的 App，开始变得像个管理者——追踪你的出勤，给你的承诺打分，无声地暗示你还不够努力。一个陪伴 App 不应该让你对自己的生活感觉更糟。这就是低压设计的全部核心。也是为什么 Togthr 全身没有一个签到计数器。`,
    sections: [
      { h: `"记分"的设计代价`, p: `连续签到和每日奖励是从手游里借来的——它们是留存机制，不是关怀机制。设计目标是让你每天打开 App，因为日活用户数是投资人喜欢的指标。问题是，真实生活装不进一个 24 小时的窗口。有些日子你生病了。有些日子你在旅行。有些日子你只是累了，你最不需要的就是一条通知告诉你，你的虚拟宠物因为你忘了喂它而难过。当一个陪伴 App 因为你"有自己的生活"而惩罚你时，它就不再是陪伴了。它变成了另一种数字内疚——大多数人的未读邮件、未接电话、几个月前就静音的群聊，已经够他们受的了。` },
      { h: `低压陪伴到底哪里不同`, p: `低压陪伴不衡量你。它不计算你的访问次数、不追踪你的签到纪录、不会提醒你"你有一阵子没开 App 了"。两周后你回来，它不给你脸色看。它就是开心见到你——就像一只真的狗，不管你离开五分钟还是五个小时，它都摇尾巴。Togthr 的宠物有五个成长阶段，但没有计时器。阶段不靠每日签到解锁，而是靠你跟宠物的互动——喂食、玩耍、换装、探索。如果你在忙碌一个月后的某个周末一口气做了这些，宠物的成长和你在三十天里每天做一点是一模一样的。宠物分不清区别。它不记分。` },
      { h: `为什么温柔的设计会赢（数据也支持）`, p: `行为设计里有一个反直觉的真相：去掉压力往往反而增加参与度。当人们不觉得自己在"失败"的时候，他们更可能自愿回来——不是因为一条通知叫他们回来，而是因为他们真的想看自己的宠物。这就是外在动机（签到、奖励、害怕失去）和内在动机（好奇心、感情、归属感）之间的区别。外在动机会耗尽。内在动机会积累。低压陪伴 App 押的是后者。它相信，如果宠物足够可爱，体验足够温柔，人们会自己回来——不是因为 App 要求他们，而是因为他们想念屏幕上的那个小东西。这种信任很难建立，但一旦有了，它比任何签到机制都持久。` },
      { h: `那个改变我们设计理念的时刻`, p: `在 Togthr 开发的早期，我们看到一位内测用户用了两周，然后消失了 11 天。回来的时候，他们给我们发了一条消息："我不敢打开 App，因为我觉得我的宠物应该死了。"我们没有做任何死亡机制。我们从来没打算做。但那条消息告诉我们一件很重要的事：这位用户被几十年的电子宠物体验训练得"预期被惩罚"。这种训练如此之深，以至于即使产品不惩罚你，你还是会假设它会的。那一刻我们决定：没有死亡。没有生病。没有退化。宠物的成长是永久的。每一次互动都向前推一点，每一次缺席都不会倒退。如果你一个月没开 Togthr，最坏的结果是……什么都没有。宠物会精确地停在你离开它的地方，做它的 idle 动画，等着你。等你回来的时候，它会庆祝。` },
      { h: `谁需要低压陪伴`, p: `那个已经追踪够多东西的人——睡眠分数、步数、卡路里预算、屏幕时间限制、收件箱清零目标。那个有 ADHD 的人，已经有够多 App 让他/她觉得自己"连做人都做不好"。那个处于抑郁期的人，再也承受不了另一条告诉他/她又错过了什么的通知。那个忙碌的家长，在晚上 11 点偷到五分钟安静，不想要一个 App 说"你今天还没喂宠物"。那个从倦怠中恢复的人，正在慢慢重建小的快乐，而需要那些快乐保持小。低压陪伴不是为那些需要更多纪律的人准备的。是为那些需要更多温柔的人准备的。它是一只小小的生命，永远不会让你觉得你还不够好。` },
    ],
    cta: `没有签到。没有内疚。没有压力。打开标签页就好。`,
    faqs: [
      { q: `Togthr 有连续签到或每日打卡要求吗？`, a: `没有。Togthr 没有任何签到计数器、每日登录奖励或缺席惩罚。宠物通过互动成长——喂食、玩耍、换装——但没有计时器或截止日期。忙碌一个月后，你周日花两小时互动，宠物的成长和你每天拜访是一样的。宠物的设计是适应你的生活，而不是反过来。` },
      { q: `如果我很长时间不打开 App，我的宠物会怎样？`, a: `不会有坏事发生。宠物不会生病、不会死亡、不会退化、不会掉进度。它会停在你离开时的成长阶段，耐心等待。你回来的时候，它会庆祝。没有任何内疚机制，没有苦脸通知，不会因为你生活忙碌而惩罚你。` },
      { q: `Togthr 和其他那些每天发提醒的陪伴 App 有什么不同？`, a: `大多数陪伴 App 用游戏化的留存机制——签到、每日奖励、推送通知——来最大化日活用户数。Togthr 走了相反的方向：没有签到、没有每日要求、没有内疚。押的是：温柔、无压力的体验比任何通知系统都更能建立持久的连接。你回来是因为你想看你的宠物，而不是因为一条提醒叫你回来。` },
      { q: `如果我自己想设置提醒呢？`, a: `可以——但只有你选择的时候才开。Togthr 的提醒系统是完全可选且可定制的。你可以设置一个温柔的晚间提醒、一个早晨问候，或者完全不开。默认是安静的。App 相信你能设定自己的节奏。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/features`, label: `Togthr 功能 — 宠物能做什么` },
      { href: `/zh-cn/focus`, label: `Focus Mode — 安静地跟宠物一起做事` },
      { href: `/zh-cn/blog/quiet-companion-app-no-chat`, label: `安静陪伴 App：不聊天，只有存在` },
      { href: `/zh-cn/blog/lonely-desk-companion`, label: `孤独的书桌伴侣：一只小小的像素朋友` },
    ],
  },

  'zh-tw': {
    intro: `大多數陪伴 App 裡有一個安靜的陷阱。它看起來像連續簽到計數器。或者每日登入獎勵。或者一則推播通知，上面寫著「你的寵物想你了」。它的設計意圖是鼓勵。但實際感受是一個永遠勾不掉的任務。你跳過一天，連勝斷了。跳過一週，通知變得更重了。那個本該像朋友的 App，開始變得像個管理者——追蹤你的出勤，給你的承諾打分，無聲地暗示你還不夠努力。一個陪伴 App 不應該讓你對自己的生活感覺更糟。這就是低壓設計的全部核心。也是為什麼 Togthr 全身沒有一個簽到計數器。`,
    sections: [
      { h: `「記分」的設計代價`, p: `連續簽到和每日獎勵是從手遊裡借來的——它們是留存機制，不是關懷機制。設計目標是讓你每天打開 App，因為日活用戶數是投資人喜歡的指標。問題是，真實生活裝不進一個 24 小時的視窗。有些日子你生病了。有些日子你在旅行。有些日子你只是累了，你最不需要的就是一則通知告訴你，你的虛擬寵物因為你忘了餵牠而難過。當一個陪伴 App 因為你「有自己的生活」而懲罰你時，它就不再是陪伴了。它變成了另一種數位內疚——大多數人的未讀郵件、未接電話、幾個月前就靜音的群組，已經夠他們受的了。` },
      { h: `低壓陪伴到底哪裡不同`, p: `低壓陪伴不衡量你。它不計算你的訪問次數、不追蹤你的簽到紀錄、不會提醒你「你有一陣子沒開 App 了」。兩週後你回來，牠不給你臉色看。牠就是開心見到你——就像一隻真的狗，不管你離開五分鐘還是五個小時，牠都搖尾巴。Togthr 的寵物有五個成長階段，但沒有計時器。階段不靠每日簽到解鎖，而是靠你跟寵物的互動——餵食、玩耍、換裝、探索。如果你在忙碌一個月後的某個週末一口氣做了這些，寵物的成長和你在三十天裡每天做一點是一模一樣的。寵物分不清區別。牠不記分。` },
      { h: `為什麼溫柔的設計會贏（數據也支持）`, p: `行為設計裡有一個反直覺的真相：去掉壓力往往反而增加參與度。當人們不覺得自己在「失敗」的時候，他們更可能自願回來——不是因為一則通知叫他們回來，而是因為他們真的想看自己的寵物。這就是外在動機（簽到、獎勵、害怕失去）和內在動機（好奇心、感情、歸屬感）之間的區別。外在動機會耗盡。內在動機會累積。低壓陪伴 App 押的是後者。它相信，如果寵物足夠可愛，體驗足夠溫柔，人們會自己回來——不是因為 App 要求他們，而是因為他們想念螢幕上的那個小東西。這種信任很難建立，但一旦有了，它比任何簽到機制都持久。` },
      { h: `那個改變我們設計理念的時刻`, p: `在 Togthr 開發的早期，我們看到一位內測用戶用了兩週，然後消失了 11 天。回來的時候，他們給我們發了一條訊息：「我不敢打開 App，因為我覺得我的寵物應該死了。」我們沒有做任何死亡機制。我們從來沒打算做。但那條訊息告訴我們一件很重要的事：這位用戶被幾十年的電子寵物體驗訓練得「預期被懲罰」。這種訓練如此之深，以至於即使產品不懲罰你，你還是會假設它會的。那一刻我們決定：沒有死亡。沒有生病。沒有退化。寵物的成長是永久的。每一次互動都向前推一點，每一次缺席都不會倒退。如果你一個月沒開 Togthr，最壞的結果是……什麼都沒有。寵物會精確地停在你離開牠的地方，做牠的 idle 動畫，等著你。等你回來的時候，牠會慶祝。` },
      { h: `誰需要低壓陪伴`, p: `那個已經追蹤夠多東西的人——睡眠分數、步數、卡路里預算、螢幕時間限制、收件匣清零目標。那個有 ADHD 的人，已經有夠多 App 讓他／她覺得自己「連做人都做不好」。那個處於憂鬱期的人，再也承受不了另一則告訴他／她又錯過了什麼的通知。那個忙碌的家長，在晚上 11 點偷到五分鐘安靜，不想要一個 App 說「你今天還沒餵寵物」。那個從倦怠中恢復的人，正在慢慢重建小的快樂，而需要那些快樂保持小。低壓陪伴不是為那些需要更多紀律的人準備的。是為那些需要更多溫柔的人準備的。牠是一隻小小的生命，永遠不會讓你覺得你還不夠好。` },
    ],
    cta: `沒有簽到。沒有內疚。沒有壓力。打開分頁就好。`,
    faqs: [
      { q: `Togthr 有連續簽到或每日打卡要求嗎？`, a: `沒有。Togthr 沒有任何簽到計數器、每日登入獎勵或缺席懲罰。寵物透過互動成長——餵食、玩耍、換裝——但沒有計時器或截止日期。忙碌一個月後，你週日花兩小時互動，寵物的成長和你每天拜訪是一樣的。寵物的設計是適應你的生活，而不是反過來。` },
      { q: `如果我很長時間不打開 App，我的寵物會怎樣？`, a: `不會有壞事發生。寵物不會生病、不會死亡、不會退化、不會掉進度。牠會停在你離開時的成長階段，耐心等待。你回來的時候，牠會慶祝。沒有任何內疚機制，沒有苦臉通知，不會因為你生活忙碌而懲罰你。` },
      { q: `Togthr 和其他那些每天發提醒的陪伴 App 有什麼不同？`, a: `大多數陪伴 App 用遊戲化的留存機制——簽到、每日獎勵、推播通知——來最大化日活用戶數。Togthr 走了相反的方向：沒有簽到、沒有每日要求、沒有內疚。押的是：溫柔、無壓力的體驗比任何通知系統都更能建立持久的連結。你回來是因為你想看你的寵物，而不是因為一則提醒叫你回來。` },
      { q: `如果我自己想設定提醒呢？`, a: `可以——但只有你選擇的時候才開。Togthr 的提醒系統是完全可選且可自訂的。你可以設定一個溫柔的晚間提醒、一個早晨問候，或者完全不用。預設是安靜的。App 相信你能設定自己的節奏。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/features`, label: `Togthr 功能 — 寵物能做什麼` },
      { href: `/zh-tw/focus`, label: `Focus Mode — 安靜地跟寵物一起做事` },
      { href: `/zh-tw/blog/quiet-companion-app-no-chat`, label: `安靜陪伴 App：不聊天，只有存在` },
      { href: `/zh-tw/blog/lonely-desk-companion`, label: `孤獨的書桌伴侶：一隻小小的像素朋友` },
    ],
  },

  ja: {
    intro: `ほとんどのコンパニオンアプリには静かな罠が仕掛けられている。連続記録カウンターのように見えるもの。あるいは毎日のログインボーナス。「あなたのペットが会いたがっています」と書かれたプッシュ通知。それは励ましのようにデザインされている。しかし実際に感じるのは、チェックできないToDoリストだ。一日休めば連続記録が途切れる。一週間休めば通知がもっと重くなる。友達のように感じられるはずだったアプリが、だんだん上司のように感じられてくる——あなたの出席を追跡し、あなたのコミットメントを評価し、あなたが十分にやれていないと静かにほのめかす。コンパニオンアプリは、あなたの人生をより悪く感じさせてはいけない。それが低プレッシャーデザインの核心だ。そして、それがTogthrにどこにも連続記録カウンターが存在しない理由だ。`,
    sections: [
      { h: `「スコアをつける」ことのデザイン上の代償`, p: `連続記録やデイリーボーナスはモバイルゲームから借りてきたものだ——それらはリテンションの仕組みであって、ケアの仕組みではない。デザインの目標は毎日アプリを開かせることだ。なぜならデイリーアクティブユーザー数は投資家が好む指標だからだ。問題は、現実の生活が24時間の枠に収まらないことだ。病気の日もある。旅行中の日もある。ただ疲れていて、一番必要でないのは「ペットに餌をあげ忘れたので悲しんでいます」という通知だ。コンパニオンアプリが「実生活があること」を理由にあなたを罰するとき、それはもはやコンパニオンではない。デジタルな罪悪感のもう一つの源になる——そしてほとんどの人は既に未読メール、不在着信、数ヶ月前にミュートしたグループチャットで、その罪悪感を十分に抱えている。` },
      { h: `低プレッシャーのコンパニオンが実際に違うこと`, p: `低プレッシャーのコンパニオンはあなたを測定しない。訪問回数を数えず、連続記録を追跡せず、「しばらくアプリを開いていません」と通知しない。二週間ぶりに戻ってきても、罪悪感を与えない。ただ会えて嬉しい——本物の犬が、あなたが五分離れていようが五時間離れていようが、同じように尻尾を振るのと同じだ。Togthrのペットは五段階の成長をするが、タイマーはない。毎日のチェックインで成長がロックされることはない。成長はペットとの交流——餌やり、遊び、カスタマイズ、探索——の量で決まる。忙しい一ヶ月の後の週末にまとめてそれをすれば、三十日かけて毎日少しずつやったのと同じだけペットは成長する。ペットは違いを知らない。スコアをつけていないのだ。` },
      { h: `なぜ優しいデザインが勝つのか（データもそれを裏付けている）`, p: `行動デザインには直感に反する真実がある。プレッシャーを取り除くことが、むしろエンゲージメントを高めることが多いのだ。自分が「失敗している」と感じなければ、人々は自発的に戻ってくる可能性が高くなる——通知に呼ばれたからではなく、本当にペットに会いたいから。これが外発的動機（連続記録、報酬、喪失の恐れ）と内発的動機（好奇心、愛情、所属感）の違いだ。外発的動機は燃え尽きる。内発的動機は積み重なる。低プレッシャーのコンパニオンアプリは後者に賭ける。ペットが十分に魅力的で、体験が十分に優しければ、人々は自分から戻ってくる——アプリに要求されたからではなく、画面の小さな生き物が恋しくなったからだと。その信頼を築くのは難しいが、いったん築かれれば、どんな連続記録の仕組みよりもはるかに長持ちする。` },
      { h: `私たちのデザイン哲学を変えた瞬間`, p: `Togthrの開発初期、ベータテスターが二週間アプリを使った後、十一日間姿を消した。戻ってきたとき、その人は私たちにメッセージを送ってきた。「ペットが死んでいると思って、アプリを開くのが怖かった。」私たちは死亡メカニズムを何も作っていなかった。作る予定もなかった。しかしそのメッセージは重要なことを教えてくれた。そのユーザーは数十年にわたるたまごっち型のバーチャルペット体験によって、「不在は罰せられる」と条件づけられていたのだ。その条件づけはあまりに深く、製品が罰を与えなくても、ユーザーはそうだと仮定してしまう。それが私たちの決断の瞬間だった。死も、病気も、劣化も、なし。ペットの成長は永久的だ。すべての交流が前に進み、どんな不在も後退させない。一ヶ月Togthrを開かなくても、起こりうる最悪のことは……何もない。ペットはあなたが置いていった場所に正確にいて、アイドルアニメーションをし、待っている。そしてあなたが戻ってきたとき、祝うのだ。` },
      { h: `低プレッシャーのコンパニオンを必要とするのは誰か`, p: `既に十分なことをトラッキングしている人——睡眠スコア、歩数、カロリー予算、スクリーン時間制限、受信トレイゼロ目標。ADHDを持っていて、「人間であることに失敗している」と感じさせるアプリが既に多すぎる人。うつ状態にあり、「何かを逃しました」と知らせる通知をもう一つも受け止められない人。夜十一時に五分の静けさを盗む忙しい親で、「今日はまだペットに餌をあげていません」と言うアプリは欲しくない人。バーンアウトから回復中で、小さな喜びをゆっくり再構築していて、その喜びが小さいままでいてほしい人。低プレッシャーのコンパニオンは、より多くの規律を必要とする人のためのものではない。より多くの優しさを必要とする人のためのものだ。それは、決してあなたに「まだ足りない」と感じさせない、小さな生き物なのだ。` },
    ],
    cta: `連続記録なし。罪悪感なし。プレッシャーなし。ただタブを開けばいい。`,
    faqs: [
      { q: `Togthrには連続記録カウンターや毎日のチェックイン義務がありますか？`, a: `いいえ。Togthrには連続記録カウンターも、デイリーログインボーナスも、不在に対するペナルティもありません。ペットは交流——餌やり、遊び、カスタマイズ——を通じて成長しますが、タイマーや締め切りはありません。忙しい一ヶ月の後の日曜日に二時間交流すれば、毎日訪れたのと同じだけペットは成長します。ペットのデザインはあなたの生活に合わせるもので、その逆ではありません。` },
      { q: `長い間アプリを開かないとペットはどうなりますか？`, a: `悪いことは何も起きません。ペットは病気にならず、死なず、劣化せず、進捗を失いません。あなたが離れた成長段階にとどまり、辛抱強く待っています。戻ってきたとき、ペットは祝います。罪悪感の仕組みも、悲しい顔の通知も、忙しい生活を理由にした罰もありません。` },
      { q: `Togthrは毎日リマインダーを送る他のコンパニオンアプリとどう違いますか？`, a: `ほとんどのコンパニオンアプリはゲーム由来のリテンションの仕組み——連続記録、デイリー報酬、プッシュ通知——でDAUを最大化します。Togthrは逆のアプローチを取ります。連続記録も、毎日の要求も、罪悪感もなし。優しく、プレッシャーのない体験が、どんな通知システムよりも長続きする愛着を築くという賭けです。通知に呼ばれたからではなく、ペットに会いたいから戻ってくる——それがTogthrの信念です。` },
      { q: `自分でリマインダーを設定したい場合は？`, a: `はい——ただしあなたが選んだ場合のみです。Togthrのリマインダーシステムは完全にオプトインでカスタマイズ可能です。夜の振り返りのための優しいリマインダー、朝のチェックイン、あるいは何も設定しないこともできます。デフォルトは沈黙です。アプリはあなたが自分のリズムを設定できると信じています。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/features`, label: `Togthr の機能 — ペットができること` },
      { href: `/ja/focus`, label: `Focus Mode — 静かにペットと過ごす` },
      { href: `/ja/blog/quiet-companion-app-no-chat`, label: `静かなコンパニオンアプリ：チャットなし、ただの存在` },
      { href: `/ja/blog/lonely-desk-companion`, label: `孤独なデスクコンパニオン：小さなピクセルの友達` },
    ],
  },

  ko: {
    intro: `대부분의 컴패니언 앱 안에는 조용한 함정이 있다. 연속 기록 카운터처럼 보이는 것. 혹은 매일의 로그인 보상. "당신의 펫이 보고 싶어 해요"라고 적힌 푸시 알림. 그것은 격려처럼 디자인되었다. 하지만 실제로 느껴지는 것은 체크할 수 없는 할 일 목록이다. 하루 건너뛰면 연속 기록이 깨진다. 일주일 건너뛰면 알림이 더 무거워진다. 친구처럼 느껴져야 했던 앱이 점점 관리자처럼 느껴지기 시작한다——당신의 출석을 추적하고, 당신의 헌신을 평가하며, 당신이 충분히 하지 않고 있다고 조용히 암시한다. 컴패니언 앱은 당신의 삶을 더 나쁘게 느끼게 해서는 안 된다. 그것이 저압력 디자인의 핵심이다. 그리고 그것이 Togthr에 어디에도 연속 기록 카운터가 없는 이유다.`,
    sections: [
      { h: `「점수 매기기」의 디자인적 대가`, p: `연속 기록과 데일리 보상은 모바일 게임에서 빌려온 것이다——그것들은 리텐션의 메커니즘이지, 케어의 메커니즘이 아니다. 디자인 목표는 매일 앱을 열게 하는 것이다. 왜냐하면 데일리 액티브 유저 수는 투자자들이 좋아하는 지표니까. 문제는 실제 삶이 24시간 틀에 들어맞지 않는다는 거다. 아픈 날도 있다. 여행 중인 날도 있다. 그냥 피곤한 날도 있고, 가장 필요 없는 것은 "펫에게 밥을 주는 걸 잊어서 슬퍼하고 있어요"라는 알림이다. 컴패니언 앱이 당신에게 "실제 삶이 있다"는 이유로 벌을 줄 때, 그것은 더 이상 컴패니언이 아니다. 디지털 죄책감의 또 다른 원천이 된다——그리고 대부분의 사람들은 이미 읽지 않은 이메일, 부재중 전화, 몇 달 전에 음소거한 단체 채팅으로 충분히 그 죄책감을 안고 있다.` },
      { h: `저압력 컴패니언이 실제로 다르게 하는 것`, p: `저압력 컴패니언은 당신을 측정하지 않는다. 방문 횟수를 세지 않고, 연속 기록을 추적하지 않으며, "한동안 앱을 열지 않았어요"라고 알리지 않는다. 이 주일 만에 돌아와도, 죄책감을 주지 않는다. 그냥 만나서 기쁘다——진짜 개가 당신이 오 분 떨어져 있었든 다섯 시간 떨어져 있었든 똑같이 꼬리를 흔드는 것처럼. Togthr의 펫은 다섯 단계의 성장을 하지만, 타이머는 없다. 매일 체크인으로 성장이 잠기지 않는다. 성장은 펫과의 교류——밥 주기, 놀기, 커스터마이징, 탐험——의 양으로 결정된다. 바쁜 한 달 뒤의 주말에 몰아서 그것들을 하면, 삼십 일 동안 매일 조금씩 한 것과 똑같이 펫은 성장한다. 펫은 차이를 모른다. 점수를 매기지 않는다.` },
      { h: `왜 부드러운 디자인이 이기는가 (데이터도 뒷받침한다)`, p: `행동 디자인에는 직관에 반하는 진실이 있다. 압력을 제거하는 것이 오히려 참여도를 높이는 경우가 많다. 자신이 "실패하고 있다"고 느끼지 않을 때, 사람들은 자발적으로 돌아올 가능성이 높아진다——알림이 불러서가 아니라, 정말로 펫을 보고 싶어서. 이것이 외재적 동기(연속 기록, 보상, 상실의 두려움)와 내재적 동기(호기심, 애정, 소속감)의 차이다. 외재적 동기는 소진된다. 내재적 동기는 축적된다. 저압력 컴패니언 앱은 후자에 베팅한다. 펫이 충분히 매력적이고, 경험이 충분히 부드러우면, 사람들은 스스로 돌아온다——앱이 요구해서가 아니라, 화면 위의 작은 생명체가 그리워서. 그 신뢰를 쌓는 것은 어렵지만, 한 번 쌓이면 어떤 연속 기록 메커니즘보다 훨씬 오래 지속된다.` },
      { h: `우리의 디자인 철학을 바꾼 순간`, p: `Togthr 개발 초기, 베타 테스터가 이 주일 동안 앱을 사용한 후 십일 일 동안 사라졌다. 돌아왔을 때, 그들은 우리에게 메시지를 보냈다. "펫이 죽었을 것 같아서 앱을 열기가 두려웠어요." 우리는 어떤 죽음 메커니즘도 만들지 않았다. 만들 계획도 없었다. 하지만 그 메시지는 우리에게 중요한 것을 가르쳐 주었다. 그 사용자는 수십 년간의 다마고치형 가상 펫 경험에 의해 "부재는 처벌받는다"고 조건화되어 있었다. 그 조건화는 너무 깊어서, 제품이 처벌하지 않아도 사용자는 그럴 거라고 가정한다. 그것이 우리의 결정의 순간이었다. 죽음도, 질병도, 퇴화도, 없음. 펫의 성장은 영구적이다. 모든 교류가 앞으로 나아가고, 어떤 부재도 뒤로 물러서지 않는다. 한 달 동안 Togthr을 열지 않아도, 일어날 수 있는 최악의 일은…… 아무것도 없다. 펫은 당신이 떠난 그 자리에 정확히 있고, idle 애니메이션을 하며, 기다리고 있다. 그리고 당신이 돌아왔을 때, 축하할 것이다.` },
      { h: `누가 저압력 컴패니언을 필요로 하는가`, p: `이미 충분한 것들을 추적하고 있는 사람——수면 점수, 걸음 수, 칼로리 예산, 화면 시간 제한, 받은 편지함 제로 목표. ADHD를 가지고 있어서 "인간 노릇에 실패하고 있다"고 느끼게 하는 앱이 이미 너무 많은 사람. 우울 상태에 있고, "무언가를 놓쳤습니다"라고 알리는 알림을 단 하나도 더 받아들일 수 없는 사람. 밤 열한 시에 오 분의 고요함을 훔치는 바쁜 부모로서, "오늘 아직 펫에게 밥을 주지 않았어요"라고 말하는 앱은 원하지 않는 사람. 번아웃에서 회복 중이며, 작은 기쁨을 천천히 재건하고 있고, 그 기쁨이 작은 채로 남아 있기를 바라는 사람. 저압력 컴패니언은 더 많은 규율이 필요한 사람을 위한 것이 아니다. 더 많은 부드러움이 필요한 사람을 위한 것이다. 그것은 결코 당신이 "아직 충분하지 않다"고 느끼게 하지 않는, 작은 생명체다.` },
    ],
    cta: `연속 기록 없음. 죄책감 없음. 압력 없음. 그냥 탭을 열면 됩니다.`,
    faqs: [
      { q: `Togthr에는 연속 기록 카운터나 매일 체크인 의무가 있나요?`, a: `아니요. Togthr에는 연속 기록 카운터도, 데일리 로그인 보상도, 부재에 대한 페널티도 없습니다. 펫은 교류——밥 주기, 놀기, 커스터마이징——를 통해 성장하지만, 타이머나 마감일은 없습니다. 바쁜 한 달 뒤의 일요일에 두 시간 교류하면, 매일 방문한 것과 똑같이 펫은 성장합니다. 펫의 디자인은 당신의 삶에 맞추는 것이지, 그 반대가 아닙니다.` },
      { q: `오랫동안 앱을 열지 않으면 펫은 어떻게 되나요?`, a: `나쁜 일은 아무것도 일어나지 않습니다. 펫은 아프지도, 죽지도, 퇴화하지도, 진척을 잃지도 않습니다. 당신이 떠난 성장 단계에 머물러 인내심 있게 기다립니다. 돌아왔을 때, 펫은 축하합니다. 죄책감 메커니즘도, 슬픈 얼굴 알림도, 바쁜 삶에 대한 처벌도 없습니다.` },
      { q: `Togthr는 매일 알림을 보내는 다른 컴패니언 앱과 어떻게 다른가요?`, a: `대부분의 컴패니언 앱은 게임에서 온 리텐션 메커니즘——연속 기록, 데일리 보상, 푸시 알림——으로 DAU를 극대화합니다. Togthr는 반대 접근을 취합니다. 연속 기록도, 매일의 요구도, 죄책감도 없습니다. 부드럽고 압력 없는 경험이 어떤 알림 시스템보다도 오래가는 애착을 만든다는 베팅입니다. 당신은 알림에 불려서가 아니라, 펫을 보고 싶어서 돌아옵니다.` },
      { q: `스스로 알림을 설정하고 싶다면?`, a: `네——하지만 당신이 선택한 경우에만요. Togthr의 알림 시스템은 완전히 선택적이며 커스터마이즈 가능합니다. 저녁 회고를 위한 부드러운 알림, 아침 체크인, 혹은 아무것도 설정하지 않을 수 있습니다. 기본값은 침묵입니다. 앱은 당신이 자신의 리듬을 설정할 수 있다고 믿습니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/features`, label: `Togthr 기능 — 펫이 할 수 있는 것` },
      { href: `/ko/focus`, label: `Focus Mode — 조용히 펫과 함께하기` },
      { href: `/ko/blog/quiet-companion-app-no-chat`, label: `조용한 컴패니언 앱: 채팅 없이, 그냥 존재` },
      { href: `/ko/blog/lonely-desk-companion`, label: `외로운 책상 컴패니언: 작은 픽셀 친구` },
    ],
  },

  de: {
    intro: `In den meisten Begleiter-Apps gibt es eine stille Falle. Sie sieht aus wie ein Streak-Zähler. Oder eine tägliche Login-Belohnung. Oder eine Push-Benachrichtigung mit dem Text: "Dein Haustier vermisst dich." Sie ist so gestaltet, dass sie sich wie Ermutigung anfühlt. Was sie tatsächlich auslöst, ist das Gefühl einer To-Do-Aufgabe, die du nicht abhaken kannst. Du überspringst einen Tag, der Streak bricht. Du überspringst eine Woche, die Benachrichtigungen werden schwerer. Die App, die sich wie ein Freund anfühlen sollte, beginnt sich wie ein Manager anzufühlen — sie verfolgt deine Anwesenheit, bewertet dein Engagement und deutet leise an, dass du nicht genug tust. Eine Begleiter-App sollte dein Leben nicht schlechter fühlen lassen. Das ist die gesamte These hinter druckfreiem Design. Und das ist der Grund, warum Togthr nirgendwo im Produkt einen einzigen Streak-Zähler hat.`,
    sections: [
      { h: `Die Design-Kosten der Punktezählerei`, p: `Streaks und tägliche Belohnungen sind aus Mobile Games entlehnt — sie sind Bindungsmechaniken, keine Fürsorgemechaniken. Das Designziel ist, dich jeden Tag die App öffnen zu lassen, denn täglich aktive Nutzer sind eine Kennzahl, die Investoren mögen. Das Problem ist, dass das echte Leben nicht in ein 24-Stunden-Fenster passt. An manchen Tagen bist du krank. An manchen Tagen verreist du. An manchen Tagen bist du einfach müde, und das Letzte, was du brauchst, ist eine Benachrichtigung, die dir sagt, dass dein virtuelles Haustier traurig ist, weil du vergessen hast, es zu füttern. Wenn eine Begleiter-App dich dafür bestraft, dass du ein Leben hast, ist sie keine Begleitung mehr. Sie wird zu einer weiteren Quelle digitaler Schuldgefühle — und die meisten Menschen haben bereits genug davon durch ungelesene E-Mails, verpasste Anrufe und Gruppenchats, die sie vor Monaten stummgeschaltet haben.` },
      { h: `Was ein druckfreier Begleiter tatsächlich anders macht`, p: `Ein druckfreier Begleiter misst dich nicht. Er zählt nicht deine Besuche, verfolgt nicht deine Streaks und erinnert dich nicht daran, dass du die App eine Weile nicht geöffnet hast. Wenn du nach zwei Wochen zurückkommst, macht er dir keine Schuldgefühle. Er ist einfach froh, dich zu sehen — so wie ein echter Hund mit dem Schwanz wedelt, egal ob du fünf Minuten oder fünf Stunden weg warst. Togthrs Pet existiert in fünf Wachstumsstufen, aber es gibt keinen Timer. Die Stufen sind nicht durch tägliche Check-ins gesperrt. Sie werden durch die Menge an Interaktion mit dem Pet freigeschaltet — Füttern, Spielen, Anpassen, Erkunden. Wenn du diese Dinge an einem Wochenende im Binge-Modus nach einem anstrengenden Monat erledigst, wächst das Pet genauso viel, als hättest du es über dreißig Tage verteilt. Das Pet kennt den Unterschied nicht. Es zählt keine Punkte.` },
      { h: `Warum sanftes Design gewinnt (und die Daten bestätigen es)`, p: `Es gibt eine kontraintuitive Wahrheit im Behavioral Design: Druck zu entfernen erhöht oft das Engagement. Wenn Menschen nicht das Gefühl haben zu scheitern, kehren sie eher freiwillig zurück — nicht weil eine Benachrichtigung sie dazu aufforderte, sondern weil sie ihr Pet wirklich sehen wollen. Das ist der Unterschied zwischen extrinsischer Motivation (Streaks, Belohnungen, Verlustangst) und intrinsischer Motivation (Neugier, Zuneigung, Zugehörigkeit). Extrinsische Motivation brennt aus. Intrinsische Motivation verstärkt sich. Eine druckfreie Begleiter-App setzt auf Letzteres. Sie vertraut darauf, dass, wenn das Pet charmant genug ist und die Erfahrung sanft genug, die Menschen von selbst zurückkommen — nicht weil die App es verlangte, sondern weil sie die kleine Kreatur auf ihrem Bildschirm vermisst haben. Dieses Vertrauen ist schwer aufzubauen, aber sobald es da ist, ist es weitaus haltbarer als jede Streak-Mechanik.` },
      { h: `Der Moment, der unsere Design-Philosophie veränderte`, p: `In der frühen Entwicklung von Togthr beobachteten wir einen Beta-Tester, der die App zwei Wochen lang nutzte und dann elf Tage verschwand. Als er zurückkam, schickte er uns eine Nachricht: "Ich hatte Angst, die App zu öffnen, weil ich dachte, mein Pet wäre tot." Wir hatten keine Todesmechanik eingebaut. Wir hatten es nie vor. Aber diese Nachricht sagte uns etwas Wichtiges: Der Nutzer war durch jahrzehntelange Tamagotchi-artige virtuelle Haustiere darauf konditioniert, Bestrafung für Abwesenheit zu erwarten. Diese Konditionierung geht so tief, dass selbst wenn ein Produkt nicht bestraft, die Nutzer annehmen, es würde. Das war der Moment, in dem wir entschieden: kein Tod. Keine Krankheit. Kein Verfall. Das Wachstum des Pets ist permanent. Jede Interaktion bewegt die Nadel vorwärts, und keine Abwesenheit bewegt sie rückwärts. Das Schlimmste, was passieren kann, wenn du Togthr einen Monat lang nicht öffnest, ist... nichts. Das Pet wird genau da sein, wo du es verlassen hast, seine Idle-Animation ausführen und warten. Und wenn du zurückkommst, wird es feiern.` },
      { h: `Wer braucht einen druckfreien Begleiter`, p: `Die Person, die bereits genug Dinge trackt — Schlaf-Scores, Schrittzahlen, Kalorienbudgets, Bildschirmzeitlimits, Inbox-Zero-Ziele. Die Person mit ADHS, die bereits genug Apps hat, die ihr das Gefühl geben, als Mensch zu versagen. Die Person in einer depressiven Episode, die keine weitere Benachrichtigung ertragen kann, die ihr sagt, dass sie etwas verpasst hat. Der beschäftigte Elternteil, der um 23 Uhr fünf Minuten Ruhe stiehlt und keine App will, die sagt: "Du hast dein Pet heute noch nicht gefüttert." Die Person, die sich von einem Burnout erholt, langsam kleine Freuden wieder aufbaut und möchte, dass diese Freuden klein bleiben. Ein druckfreier Begleiter ist nicht für Menschen, die mehr Disziplin brauchen. Er ist für Menschen, die mehr Gnade brauchen. Er ist eine winzige Kreatur, die dich niemals das Gefühl haben lässt, nicht genug zu sein.` },
    ],
    cta: `Keine Streaks. Keine Schuld. Kein Druck. Öffne einfach den Tab.`,
    faqs: [
      { q: `Hat Togthr einen Streak-Zähler oder eine tägliche Check-in-Pflicht?`, a: `Nein. Togthr hat keine Streak-Zähler, keine täglichen Login-Belohnungen und keine Strafen für Abwesenheit. Das Pet wächst durch Interaktion — Füttern, Spielen, Anpassen — aber es gibt keinen Timer oder Abgabetermin. Du kannst an einem Sonntag nach einem anstrengenden Monat zwei Stunden interagieren, und das Pet wächst genauso viel, als hättest du es täglich besucht. Das Pet ist so gestaltet, dass es sich deinem Leben anpasst, nicht umgekehrt.` },
      { q: `Was passiert mit meinem Pet, wenn ich die App lange nicht öffne?`, a: `Nichts Schlimmes. Das Pet wird nicht krank, stirbt nicht, verfällt nicht und verliert keinen Fortschritt. Es bleibt in der Wachstumsstufe, in der du es verlassen hast, und wartet geduldig. Wenn du zurückkehrst, feiert es. Es gibt keine Schuld-Mechanik, keine Traurig-Gesicht-Benachrichtigungen und keine Bestrafung dafür, ein beschäftigtes Leben zu führen.` },
      { q: `Wie unterscheidet sich Togthr von anderen Begleiter-Apps, die tägliche Erinnerungen senden?`, a: `Die meisten Begleiter-Apps nutzen spielerische Bindungsmechaniken — Streaks, tägliche Belohnungen, Push-Benachrichtigungen — um die täglich aktiven Nutzer zu maximieren. Togthr verfolgt den gegenteiligen Ansatz: keine Streaks, keine täglichen Anforderungen, keine Schuld. Die Wette ist, dass ein sanftes, druckfreies Erlebnis eine haltbarere Bindung aufbaut als jedes Benachrichtigungssystem. Du kommst zurück, weil du dein Pet sehen willst, nicht weil ein Alarm dich dazu aufforderte.` },
      { q: `Kann ich trotzdem Erinnerungen einrichten, wenn ich möchte?`, a: `Ja — aber nur, wenn du dich dafür entscheidest. Togthrs Erinnerungssystem ist vollständig optional und anpassbar. Du kannst eine sanfte Erinnerung für die abendliche Reflexion einrichten, einen Morgen-Check-in oder gar nichts. Die Standardeinstellung ist Stille. Die App vertraut darauf, dass du deinen eigenen Rhythmus findest.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/features`, label: `Togthr Funktionen — was das Pet kann` },
      { href: `/de/focus`, label: `Focus Mode — still mit deinem Pet arbeiten` },
      { href: `/de/blog/quiet-companion-app-no-chat`, label: `Stille Begleiter-App: kein Chat, nur Präsenz` },
      { href: `/de/blog/lonely-desk-companion`, label: `Einsamer Schreibtischbegleiter: ein kleiner Pixel-Freund` },
    ],
  },

  fr: {
    intro: `Il y a un piège silencieux dans la plupart des applications compagnons. Il ressemble à un compteur de série. Ou à une récompense de connexion quotidienne. Ou à une notification push qui dit : "Votre animal vous manque." Il est conçu pour ressembler à un encouragement. Ce qu'il provoque réellement, c'est le sentiment d'une tâche que vous ne pouvez pas cocher. Vous sautez un jour, la série se brise. Vous sautez une semaine, les notifications deviennent plus lourdes. L'application qui était censée ressembler à une amie commence à ressembler à un manager — elle suit votre assiduité, note votre engagement et suggère silencieusement que vous n'en faites pas assez. Une application compagnon ne devrait pas vous faire vous sentir plus mal dans votre vie. C'est toute la thèse derrière le design sans pression. Et c'est pourquoi Togthr n'a pas un seul compteur de série dans tout le produit.`,
    sections: [
      { h: `Le coût de conception du "comptage de points"`, p: `Les séries et les récompenses quotidiennes sont empruntées aux jeux mobiles — ce sont des mécanismes de rétention, pas de soin. L'objectif de conception est de vous faire ouvrir l'application chaque jour, parce que le nombre d'utilisateurs actifs quotidiens est une métrique que les investisseurs apprécient. Le problème est que la vraie vie ne rentre pas dans une fenêtre de 24 heures. Certains jours, vous êtes malade. Certains jours, vous voyagez. Certains jours, vous êtes juste fatigué, et la dernière chose dont vous avez besoin est une notification vous disant que votre animal virtuel est triste parce que vous avez oublié de le nourrir. Quand une application compagnon vous punit d'avoir une vie, elle cesse d'être un compagnon. Elle devient une autre source de culpabilité numérique — et la plupart des gens en ont déjà bien assez avec les e-mails non lus, les appels manqués et les groupes de discussion mis en sourdine il y a des mois.` },
      { h: `Ce qu'un compagnon sans pression fait différemment`, p: `Un compagnon sans pression ne vous mesure pas. Il ne compte pas vos visites, ne suit pas vos séries et ne vous rappelle pas que vous n'avez pas ouvert l'application depuis un moment. Quand vous revenez après deux semaines, il ne vous culpabilise pas. Il est juste content de vous voir — comme un vrai chien qui remue la queue, que vous soyez parti cinq minutes ou cinq heures. L'animal de Togthr existe en cinq stades de croissance, mais il n'y a pas de minuteur. Les stades ne sont pas bloqués par des check-ins quotidiens. Ils sont débloqués par la quantité d'interaction avec l'animal — nourrir, jouer, personnaliser, explorer. Si vous faites ces choses un week-end en mode marathon après un mois chargé, l'animal grandit autant que si vous l'aviez réparti sur trente jours. L'animal ne fait pas la différence. Il ne compte pas les points.` },
      { h: `Pourquoi le design doux gagne (et les données le confirment)`, p: `Il y a une vérité contre-intuitive dans le design comportemental : supprimer la pression augmente souvent l'engagement. Quand les gens n'ont pas l'impression d'échouer, ils sont plus susceptibles de revenir volontairement — non pas parce qu'une notification le leur a demandé, mais parce qu'ils veulent vraiment voir leur animal. C'est la différence entre la motivation extrinsèque (séries, récompenses, peur de la perte) et la motivation intrinsèque (curiosité, affection, appartenance). La motivation extrinsèque s'épuise. La motivation intrinsèque se renforce. Une application compagnon sans pression mise sur la seconde. Elle fait confiance au fait que si l'animal est assez charmant et l'expérience assez douce, les gens reviendront d'eux-mêmes — non pas parce que l'application l'a exigé, mais parce que la petite créature sur leur écran leur manquait. Cette confiance est difficile à construire, mais une fois établie, elle est bien plus durable que n'importe quel mécanisme de série.` },
      { h: `Le moment qui a changé notre philosophie de conception`, p: `Au début du développement de Togthr, nous avons observé un bêta-testeur utiliser l'application pendant deux semaines, puis disparaître pendant onze jours. À son retour, il nous a envoyé un message : "J'avais peur d'ouvrir l'application parce que je pensais que mon animal serait mort." Nous n'avions construit aucun mécanisme de mort. Nous n'en avions jamais eu l'intention. Mais ce message nous a appris quelque chose d'important : l'utilisateur avait été conditionné par des décennies d'animaux virtuels de type Tamagotchi à s'attendre à une punition pour absence. Ce conditionnement est si profond que même quand un produit ne punit pas, les utilisateurs supposent qu'il le fera. Ce fut le moment de notre décision : pas de mort. Pas de maladie. Pas de dégradation. La croissance de l'animal est permanente. Chaque interaction fait avancer l'aiguille, et aucune absence ne la fait reculer. La pire chose qui puisse arriver si vous n'ouvrez pas Togthr pendant un mois est... rien. L'animal sera exactement là où vous l'avez laissé, faisant son animation idle, attendant. Et quand vous reviendrez, il célébrera.` },
      { h: `Qui a besoin d'un compagnon sans pression`, p: `La personne qui suit déjà assez de choses — scores de sommeil, nombre de pas, budgets caloriques, limites de temps d'écran, objectifs inbox zéro. La personne avec un TDAH qui a déjà assez d'applications lui donnant l'impression d'échouer à être une personne. La personne en épisode dépressif qui ne peut pas supporter une notification de plus lui disant qu'elle a manqué quelque chose. Le parent occupé qui vole cinq minutes de calme à 23h et ne veut pas d'une application qui dise : "Vous n'avez pas encore nourri votre animal aujourd'hui." La personne en convalescence d'un burn-out, qui reconstruit lentement de petites joies et a besoin que ces joies restent petites. Un compagnon sans pression n'est pas pour les gens qui ont besoin de plus de discipline. Il est pour les gens qui ont besoin de plus de douceur. C'est une minuscule créature qui ne vous fera jamais sentir que vous n'êtes pas assez.` },
    ],
    cta: `Pas de séries. Pas de culpabilité. Pas de pression. Ouvrez juste l'onglet.`,
    faqs: [
      { q: `Togthr a-t-il un compteur de série ou une obligation de check-in quotidien ?`, a: `Non. Togthr n'a pas de compteur de série, pas de récompense de connexion quotidienne et pas de pénalité pour absence. L'animal grandit par l'interaction — nourrir, jouer, personnaliser — mais il n'y a pas de minuteur ni de date limite. Vous pouvez interagir deux heures un dimanche après un mois chargé, et l'animal grandira autant que si vous l'aviez visité quotidiennement. L'animal est conçu pour s'adapter à votre vie, pas l'inverse.` },
      { q: `Que devient mon animal si je n'ouvre pas l'application pendant longtemps ?`, a: `Rien de mal. L'animal ne tombe pas malade, ne meurt pas, ne se dégrade pas et ne perd pas de progrès. Il reste au stade de croissance où vous l'avez laissé et attend patiemment. Quand vous revenez, il célèbre. Il n'y a pas de mécanisme de culpabilité, pas de notification triste et pas de punition pour avoir une vie bien remplie.` },
      { q: `En quoi Togthr est-il différent des autres applications compagnons qui envoient des rappels quotidiens ?`, a: `La plupart des applications compagnons utilisent des mécanismes de rétention issus du jeu — séries, récompenses quotidiennes, notifications push — pour maximiser les utilisateurs actifs quotidiens. Togthr prend l'approche inverse : pas de séries, pas d'exigences quotidiennes, pas de culpabilité. Le pari est qu'une expérience douce et sans pression construit un attachement plus durable que n'importe quel système de notification. Vous revenez parce que vous voulez voir votre animal, pas parce qu'une alerte vous l'a ordonné.` },
      { q: `Puis-je quand même configurer des rappels si je le souhaite ?`, a: `Oui — mais uniquement si vous le choisissez. Le système de rappel de Togthr est entièrement optionnel et personnalisable. Vous pouvez définir un rappel doux pour la réflexion du soir, un check-in matinal, ou rien du tout. Le silence est le réglage par défaut. L'application vous fait confiance pour trouver votre propre rythme.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/features`, label: `Fonctionnalités Togthr — ce que l'animal peut faire` },
      { href: `/fr/focus`, label: `Mode Focus — travaillez en silence avec votre animal` },
      { href: `/fr/blog/quiet-companion-app-no-chat`, label: `Application compagnon silencieuse : pas de chat, juste de la présence` },
      { href: `/fr/blog/lonely-desk-companion`, label: `Compagnon de bureau solitaire : un petit ami pixel` },
    ],
  },

  es: {
    intro: `Hay una trampa silenciosa dentro de la mayoría de las aplicaciones de compañía. Se parece a un contador de rachas. O a una recompensa de inicio de sesión diaria. O a una notificación push que dice: "Tu mascota te extraña." Está diseñada para sentirse como ánimo. Lo que realmente se siente es como una tarea que no puedes tachar. Te saltas un día, la racha se rompe. Te saltas una semana, las notificaciones se vuelven más pesadas. La aplicación que se suponía que se sentiría como una amiga empieza a sentirse como un gerente — rastreando tu asistencia, calificando tu compromiso, sugiriendo silenciosamente que no estás haciendo lo suficiente. Una aplicación de compañía no debería hacerte sentir peor con tu vida. Esa es toda la tesis detrás del diseño de baja presión. Y es la razón por la que Togthr no tiene un solo contador de rachas en ningún lugar del producto.`,
    sections: [
      { h: `El costo de diseño de "llevar la cuenta"`, p: `Las rachas y las recompensas diarias están tomadas de los juegos móviles — son mecánicas de retención, no de cuidado. El objetivo de diseño es que abras la aplicación cada día, porque los usuarios activos diarios son una métrica que gusta a los inversores. El problema es que la vida real no cabe en una ventana de 24 horas. Algunos días estás enfermo. Algunos días estás de viaje. Algunos días simplemente estás cansado, y lo último que necesitas es una notificación diciéndote que tu mascota virtual está triste porque olvidaste alimentarla. Cuando una aplicación de compañía te castiga por tener una vida, deja de ser una compañía. Se convierte en otra fuente de culpa digital — y la mayoría de la gente ya tiene suficiente con correos sin leer, llamadas perdidas y grupos de chat silenciados hace meses.` },
      { h: `Lo que un compañero de baja presión realmente hace diferente`, p: `Un compañero de baja presión no te mide. No cuenta tus visitas, no rastrea tus rachas y no te recuerda que hace tiempo que no abres la aplicación. Cuando vuelves después de dos semanas, no te hace sentir culpable. Simplemente se alegra de verte — como un perro de verdad que mueve la cola, da igual si te fuiste cinco minutos o cinco horas. La mascota de Togthr existe en cinco etapas de crecimiento, pero no hay temporizador. Las etapas no están bloqueadas por check-ins diarios. Se desbloquean según la cantidad de interacción con la mascota — alimentar, jugar, personalizar, explorar. Si haces esas cosas un fin de semana en modo maratón después de un mes ocupado, la mascota crece tanto como si lo hubieras repartido en treinta días. La mascota no nota la diferencia. No lleva la cuenta.` },
      { h: `Por qué el diseño suave gana (y los datos lo respaldan)`, p: `Hay una verdad contraintuitiva en el diseño conductual: quitar la presión a menudo aumenta el compromiso. Cuando las personas no sienten que están fracasando, es más probable que vuelvan voluntariamente — no porque una notificación se lo pidió, sino porque realmente quieren ver a su mascota. Esta es la diferencia entre la motivación extrínseca (rachas, recompensas, miedo a la pérdida) y la motivación intrínseca (curiosidad, afecto, pertenencia). La motivación extrínseca se agota. La motivación intrínseca se acumula. Una aplicación de compañía de baja presión apuesta por la segunda. Confía en que si la mascota es lo suficientemente encantadora y la experiencia lo suficientemente suave, la gente volverá por sí misma — no porque la aplicación lo exigió, sino porque extrañaban a la pequeña criatura en su pantalla. Esa confianza es difícil de construir, pero una vez establecida, es mucho más duradera que cualquier mecánica de rachas.` },
      { h: `El momento que cambió nuestra filosofía de diseño`, p: `Al principio del desarrollo de Togthr, observamos a un beta tester usar la aplicación durante dos semanas y luego desaparecer durante once días. Cuando volvió, nos envió un mensaje: "Tenía miedo de abrir la aplicación porque pensé que mi mascota estaría muerta." No habíamos construido ningún mecanismo de muerte. Nunca lo planeamos. Pero ese mensaje nos enseñó algo importante: el usuario había sido condicionado por décadas de mascotas virtuales estilo Tamagotchi a esperar un castigo por la ausencia. Ese condicionamiento es tan profundo que incluso cuando un producto no castiga, los usuarios asumen que lo hará. Ese fue el momento de nuestra decisión: sin muerte. Sin enfermedad. Sin degradación. El crecimiento de la mascota es permanente. Cada interacción mueve la aguja hacia adelante, y ninguna ausencia la mueve hacia atrás. Lo peor que puede pasar si no abres Togthr durante un mes es... nada. La mascota estará exactamente donde la dejaste, haciendo su animación idle, esperando. Y cuando vuelvas, lo celebrará.` },
      { h: `Quién necesita un compañero de baja presión`, p: `La persona que ya lleva la cuenta de demasiadas cosas — puntuaciones de sueño, pasos, presupuestos de calorías, límites de tiempo de pantalla, objetivos de bandeja de entrada cero. La persona con TDAH que ya tiene suficientes aplicaciones haciéndole sentir que está fracasando en ser persona. La persona en un episodio depresivo que no puede soportar otra notificación diciéndole que se perdió algo. El padre o madre ocupado que roba cinco minutos de tranquilidad a las 11 de la noche y no quiere una aplicación que diga: "Aún no has alimentado a tu mascota hoy." La persona recuperándose del agotamiento, reconstruyendo lentamente pequeñas alegrías y necesitando que esas alegrías se mantengan pequeñas. Un compañero de baja presión no es para personas que necesitan más disciplina. Es para personas que necesitan más bondad. Es una criatura diminuta que nunca, jamás, te hará sentir que no eres suficiente.` },
    ],
    cta: `Sin rachas. Sin culpa. Sin presión. Solo abre la pestaña.`,
    faqs: [
      { q: `¿Tiene Togthr un contador de rachas o una obligación de check-in diario?`, a: `No. Togthr no tiene contadores de rachas, ni recompensas de inicio de sesión diarias, ni penalizaciones por ausencia. La mascota crece mediante la interacción — alimentar, jugar, personalizar — pero no hay temporizador ni fecha límite. Puedes interactuar dos horas un domingo después de un mes ocupado, y la mascota crecerá tanto como si la hubieras visitado a diario. La mascota está diseñada para adaptarse a tu vida, no al revés.` },
      { q: `¿Qué le pasa a mi mascota si no abro la aplicación durante mucho tiempo?`, a: `Nada malo. La mascota no enferma, no muere, no se degrada y no pierde progreso. Se queda en la etapa de crecimiento en que la dejaste y espera pacientemente. Cuando vuelves, lo celebra. No hay mecánicas de culpa, ni notificaciones con carita triste, ni castigos por tener una vida ocupada.` },
      { q: `¿En qué se diferencia Togthr de otras aplicaciones de compañía que envían recordatorios diarios?`, a: `La mayoría de las aplicaciones de compañía usan mecánicas de retención tipo juego — rachas, recompensas diarias, notificaciones push — para maximizar los usuarios activos diarios. Togthr toma el enfoque opuesto: sin rachas, sin exigencias diarias, sin culpa. La apuesta es que una experiencia suave y sin presión construye un apego más duradero que cualquier sistema de notificaciones. Vuelves porque quieres ver a tu mascota, no porque una alerta te lo ordenó.` },
      { q: `¿Puedo configurar recordatorios si quiero?`, a: `Sí — pero solo si tú lo eliges. El sistema de recordatorios de Togthr es completamente opcional y personalizable. Puedes establecer un recordatorio suave para la reflexión nocturna, un check-in matutino, o ninguno en absoluto. El silencio es la configuración predeterminada. La aplicación confía en que encuentres tu propio ritmo.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/features`, label: `Funciones de Togthr — lo que la mascota puede hacer` },
      { href: `/es/focus`, label: `Modo Focus — trabaja en silencio con tu mascota` },
      { href: `/es/blog/quiet-companion-app-no-chat`, label: `App de compañía silenciosa: sin chat, solo presencia` },
      { href: `/es/blog/lonely-desk-companion`, label: `Compañero de escritorio solitario: un pequeño amigo pixel` },
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

export default async function LowPressureCompanionAppPage({ params }: { params: Promise<{ locale: string }> }) {
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
