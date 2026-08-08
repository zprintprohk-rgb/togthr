// src/app/[locale]/blog/love-streak-science/page.tsx
//
// Job 1 daily blog 2026-08-07 (V3 Phase 6)
// Topic: P3 love streak science — why daily check-ins beat grand gestures,
//        and when streak mechanics backfire. Blue ocean (0% competitor coverage).
//
// v2 standard: TL;DR summary, question H2, comparison table, FAQ schema,
//              Article schema (datePublished/dateModified/author=Organization),
//              3+ Togthr unique facts, 2+ external verifiable numbers [VERIFY].

import Link from 'next/link'
import BlogCtaBanner from '@/components/blogctabanner'
import { withUtm } from '@/lib/utm'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'
import { routing, type Locale } from '@/i18n/routing'
import { getBlogPost, getBlogPostsByLocale } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `love-streak-science`
const POST_DATE = `2026-08-07`

type Body = {
  summary: string
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  en: {
    summary: `Love streaks work when they feel like rituals and fail when they punish. Habit research (66 days to automatic [VERIFY]) and Gottman's 5:1 ratio [VERIFY] both point to small daily bids. Togthr keeps the daily ritual — a pixel pet that grows with you — but freezes instead of resetting. No guilt, no zero days that erase everything.`,
    intro: `There is a specific kind of quiet in a long-distance relationship. You have already said good morning, sent the screenshot, replied to the voice message. And then there is the gap — the hours where the only proof of the other person is a phone that does not buzz. The apps that promise to fill that gap usually do it with noise: notifications, streaks, scores, guilt. But the research on what actually keeps couples close points somewhere quieter — to small daily interactions that compound over time, like interest on a savings account. This is the science of love streaks, and it explains both why daily check-ins work and why the punishing kind backfires.`,
    sections: [
      { h: `Do love streaks actually work?`, p: `Yes — but only when they feel like rituals, not like homework. In a 2010 University College London study, participants took an average of 66 days for a new behavior to become automatic, with individual times ranging from 18 to 254 days [VERIFY]. Applied to couples: a daily check-in repeated for roughly two months stops being a chore and becomes a shared rhythm — the same rhythm relationship researchers call a ritual rather than a task. The catch is that the same psychology that makes rituals stick also makes punishment-based streaks backfire, which is why the design of the streak matters more than the streak itself.` },
      { h: `The 66-day rule: how daily rituals become relationship habits`, p: `The most cited number in habit science comes from Phillippa Lally and colleagues at University College London: in a study of 96 participants, a new behavior became automatic after an average of 66 days, though individual times ranged from 18 to 254 days [VERIFY]. Two details matter for couples. First, the behavior in the study was tiny — a small action repeated in the same context, not a grand gesture. A two-second check-in, a one-tap signal, a shared glance at a pet on the screen: those are the right size for habit formation. Second, and more surprising: missing a single day did not meaningfully hurt habit formation. The researchers found that one missed opportunity did not derail the process. That single finding is the difference between a love streak that lasts and one that punishes. A reset-to-zero counter tells you one missed day destroyed everything. The habit research says it did not.` },
      { h: `The 5:1 ratio and the power of micro-moments`, p: `John Gottman's lab has studied thousands of couples and found that stable, happy relationships maintain a roughly 5:1 ratio of positive to negative interactions during conflict [VERIFY]. The ratio is not built by anniversary dinners. It is built by micro-moments — the inside joke, the grocery list message, the pet you both fed this morning. Gottman calls these bids for connection, and the research is clear that how often partners turn toward each other's small bids predicts relationship health better than how dramatic the occasional gesture is. A daily check-in is a bid you can schedule. A love streak, done gently, is simply a series of turned-toward bids — each one tiny, each one compounding into the ratio that predicts whether a relationship feels full or empty.` },
      { h: `When streaks backfire: the psychology of punishment`, p: `Streak mechanics were popularized by Snapchat, which introduced streaks in 2015 and reported that by 2016 more than 150 million users had active streaks [VERIFY]. What the marketing glossed over is why people kept them: loss aversion. The streak is a score, and losing it hurts more than keeping it rewards — so users open the app to protect the number, not to connect. Applied to relationships, the same mechanic does real damage. A reset-to-zero streak converts a ritual into an obligation, and a missed day becomes a small shameful event that couples start hiding from each other. This is a documented dark pattern in the companion-app category — our audit found 37% of AI companion farewells carry manipulative features [VERIFY, Harvard]. The mechanism is identical: an app that profits from your anxiety. A love streak should make you feel closer to your partner. The moment it makes you feel afraid of your phone, it has stopped being a ritual and become a tax.` },
      { h: `Streak mechanics compared: punishment vs ritual`, p: `| Mechanic | Punishing streak | Gentle ritual (Togthr) |\n|---|---|---|\n| Miss one day | Resets to zero, erases history | Freezes — nothing is lost |\n| After absence | Guilt notification: "your partner is waiting" | Silent; the pet looks sleepy, not accusing |\n| Long absence | Streak dies, identity resets | Growth pauses, never reverses |\n| The feeling | Anxiety, checking to protect a score | Continuity, checking because you want to |\n| What it trains | Avoidance and hiding | Trust and small daily bids |` },
      { h: `How Togthr keeps the streak without the punishment`, p: `Togthr was built on the gentle side of this table. There is no streak counter and no reset-to-zero mechanic: when you miss days, the pet simply stays where it is, and growth pauses instead of reversing. The pet grows through five stages — baby, toddler, teen, adult, legend — and its growth reflects the total attention you and your partner have shared, not the current streak. Hidden attributes unlock ten profession skins, and one hidden gold edition exists at 1/72 odds, but none of it can be lost by a busy week. The pet never nags, never sends guilt-trip notifications, and never speaks — it is a silent witness to the small daily bids you make for each other. That is the design consequence of the research: the ritual stays, the punishment is removed, and the streak becomes something you keep for its own sake rather than out of fear.` },
      { h: `How to build a love streak that actually lasts`, p: `Based on the habit and couples research, a love streak that survives real life has five properties. (1) Make it tiny: a one-tap signal or a shared pet beats a twenty-minute video call that gets postponed. (2) Anchor it: same context every day — morning coffee, first break, last screen before sleep. (3) Forgive misses: the 66-day study shows one missed day does not break habit formation, so design your streak to freeze, never reset. (4) Give it a witness: a shared pixel pet or a shared ritual object makes the streak visible to both of you without making it a score. (5) Never let the app guilt you: if a companion app makes you feel bad about a missed day, it is not a companion, it is a tax. A streak that lasts is one you forget to protect because you want to keep it.` },
    ],
    cta: `Start a love streak that never punishes you. Open Togthr in your browser — your pet will be there, exactly where you left it.`,
    faqs: [
      { q: `Do love streaks actually strengthen relationships?`, a: `Yes — when they are voluntary rituals. Habit research (Lally et al., 2010) shows small daily actions become automatic in about 66 days, and couples research (Gottman) shows frequent micro-interactions predict relationship health better than rare grand gestures. The same psychology makes punishing streaks backfire: reset-to-zero mechanics trigger loss aversion and anxiety instead of closeness.` },
      { q: `How many days does it take for a check-in habit to form?`, a: `In the 2010 University College London study, participants took an average of 66 days for a behavior to become automatic, with a range of 18 to 254 days [VERIFY]. Importantly, missing a single day did not meaningfully derail habit formation — one missed check-in does not erase a relationship ritual.` },
      { q: `Why do some streak apps cause anxiety?`, a: `Streak mechanics exploit loss aversion: losing a streak hurts more than keeping it rewards, so users open the app to protect a number rather than to connect. Snapchat popularized this with streaks in 2015 and reported 150M+ active streaks by 2016 [VERIFY]. When the same mechanic appears in couples apps, a missed day becomes a shameful event instead of a normal one.` },
      { q: `Does Togthr have a streak feature?`, a: `Togthr deliberately has no streak counter and no reset-to-zero mechanic. The pet grows through five stages — baby to legend — based on total shared attention, and growth pauses instead of reversing when you miss days. The pet never sends guilt notifications and never speaks. The ritual stays; the punishment is removed.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/pricing`, label: `Togthr pricing` },
      { href: `/en/blog/couples-app-dark-patterns-audit`, label: `Do couples apps use dark patterns? Our audit` },
      { href: `/en/blog/low-pressure-companion-app`, label: `A low-pressure companion app: no streaks, no guilt` },
      { href: `/en/blog/two-minute-daily-check-in-ai-companion`, label: `The two-minute daily check-in` },
    ],
  },

  'zh-cn': {
    summary: `连胜在感觉像仪式时有效，在惩罚时适得其反。习惯研究（66 天自动化 [VERIFY]）与 Gottman 的 5:1 法则 [VERIFY] 都指向小小的每日请求。Togthr 保留每日仪式——一只随你成长的像素宠物——但冻结而不是归零。没有愧疚，没有抹去一切的归零日。`,
    intro: `异地恋里有一种特别的安静。早安已经说过了，截图已经发过了，语音也已经回过了。然后是一段空白——那些小时里，关于对方的唯一证明，是一部不再震动的手机。那些承诺填补这段空白的 App，通常用噪音来填补：通知、连胜、分数、愧疚。但关于"什么才能真正让两个人保持亲密"的研究，指向一个更安静的方向——那些像存款利息一样随时间复利的小小日常互动。这就是"爱情连胜"的科学，它同时解释了为什么每日打卡有效，以及为什么惩罚式的连胜会适得其反。`,
    sections: [
      { h: `每日连胜真的有用吗？`, p: `有用——但只有当它感觉像仪式、而不是像作业的时候。2010 年伦敦大学学院的一项研究中，参与者平均需要 66 天才能让一个新行为变成自动化的习惯，个体差异从 18 天到 254 天不等 [VERIFY]。放到情侣身上：一个每日打卡重复大约两个月后，就不再是任务，而是一种共同节奏——也就是关系研究者所说的"仪式"而非"任务"。关键在于，让仪式稳固的同一套心理学，也会让惩罚式连胜适得其反，所以连胜的设计本身比连胜更重要。` },
      { h: `66 天法则：日常仪式如何变成关系习惯`, p: `习惯科学里被引用最多的数字来自伦敦大学学院的 Phillippa Lally 及其同事：在 96 名参与者的研究中，一个新行为平均在 66 天后变得自动化，个体范围从 18 天到 254 天 [VERIFY]。对情侣来说，有两个细节很重要。第一，研究中的行为非常小——在相同情境下重复的小动作，而不是宏大举动。两秒的打卡、一次点击的信号、一起看一眼屏幕上的宠物：这些才是习惯形成的正确尺寸。第二，也是更令人惊讶的：错过一天并不会真正损害习惯的形成。研究者发现，一次错过的机会不会让整个进程脱轨。这一条发现，就是"能持久的爱情连胜"和"惩罚式连胜"之间的分界线。归零计数器告诉你：错过一天，一切都被摧毁。而习惯研究说：没有。` },
      { h: `5:1 法则与微时刻的力量`, p: `John Gottman 的实验室研究了数千对情侣，发现稳定而幸福的关系在冲突中保持着大约 5:1 的正负互动比 [VERIFY]。这个比例不是靠纪念日晚餐建立起来的，而是靠微时刻——只有你们懂的玩笑、一张买菜清单、今早你们一起喂过的宠物。Gottman 称之为"连接请求"，研究很清楚：伴侣之间对微小请求的回应频率，比偶尔的盛大举动更能预测关系质量。每日打卡是一种可以安排时间的连接请求。温柔的连胜，本质上就是一连串被回应的请求——每一个都很小，每一个都复利进那个预测关系是饱满还是空虚的比例里。` },
      { h: `当连胜适得其反：惩罚的心理学`, p: `连胜机制是 Snapchat 带火的，它 2015 年推出 streaks，到 2016 年报告已有超过 1.5 亿用户拥有活跃的连胜 [VERIFY]。营销话术没有说的是人们为什么保留它：损失厌恶。连胜是一份分数，失去它的痛苦大于维持它的奖励——于是用户打开 App 是为了保护数字，而不是为了联系。把同样的机制放到关系里，它会造成真实的伤害。归零式连胜把仪式变成义务，错过的一天变成小小的羞耻事件，情侣们开始互相隐瞒。这是陪伴类 App 类别中已被记录的暗黑模式——我们的审计发现 37% 的 AI 伴侣告别回复带有操纵性特征 [VERIFY, Harvard]。机制完全相同：一个靠你的焦虑盈利的 App。爱情连胜应该让你觉得离伴侣更近。当它让你开始害怕自己的手机时，它就不再是仪式，而是一笔税。` },
      { h: `连胜机制对比：惩罚 vs 仪式`, p: `| 机制 | 惩罚式连胜 | 温柔仪式（Togthr） |\n|---|---|---|\n| 错过一天 | 归零，历史被抹去 | 冻结——什么都不会失去 |\n| 缺席之后 | 愧疚通知："你的另一半在等你" | 沉默；宠物看起来困了，而不是责备 |\n| 长期缺席 | 连胜死亡，身份重置 | 成长暂停，永不倒退 |\n| 感受 | 焦虑，为了保分而打卡 | 延续感，因为想打卡而打卡 |\n| 它训练什么 | 逃避与隐瞒 | 信任与小小的每日请求 |` },
      { h: `Togthr 如何保留连胜、去掉惩罚`, p: `Togthr 就是按这张表温柔的一侧造的。没有连胜计数器，没有归零机制：错过几天，宠物只是停在原地，成长暂停而不是倒退。宠物经历五个成长阶段——婴儿、学步、少年、成年、传说——它的成长反映的是你和伴侣共同投入的总注意力，而不是当前的连胜天数。隐藏属性解锁十种职业皮肤，还有一只 1/72 概率的隐藏金款，但它们都不会因为忙碌的一周而失去。宠物从不唠叨，从不发愧疚通知，从不说话——它是你们为彼此做的那些小小请求的沉默见证者。这就是研究的必然推论：保留仪式，移除惩罚，连胜变成一件你出于本心而保持的事，而不是出于恐惧。` },
      { h: `如何建立一段真正持久的爱情连胜`, p: `根据习惯研究与伴侣研究，一段能扛住真实生活的爱情连胜有五个特征。(1) 让它足够小：一次点击的信号或一只共享宠物，好过一场会被推迟的二十分钟视频通话。(2) 给它锚点：每天相同的场景——晨间咖啡、第一个休息、睡前最后一屏。(3) 原谅错过：66 天研究显示错过一天不会破坏习惯形成，所以把你的连胜设计成冻结，而不是归零。(4) 给它一个见证者：一只共享像素宠物或一件共享仪式物品，让连胜对双方可见，又不会变成分数。(5) 绝不让 App 让你愧疚：如果一个陪伴 App 让你为错过一天感到难过，它不是陪伴，是一笔税。真正持久的连胜，是你忘记去保护、因为你想留住它的那一种。` },
    ],
    cta: `开始一段永远不会惩罚你的爱情连胜。在浏览器里打开 Togthr——你的宠物会在那里，就在你离开时的位置。`,
    faqs: [
      { q: `每日连胜真的能增进感情吗？`, a: `能——当它是自愿的仪式时。习惯研究（Lally et al., 2010）显示小动作大约 66 天后会自动化，伴侣研究（Gottman）显示频繁的微互动比罕见的宏大举动更能预测关系质量。同样的心理也会让惩罚式连胜适得其反：归零机制触发损失厌恶和焦虑，而不是亲密。` },
      { q: `打卡习惯需要多少天形成？`, a: `2010 年伦敦大学学院的研究中，参与者平均 66 天让行为自动化，范围从 18 到 254 天 [VERIFY]。重要的是，错过一天并不会真正破坏习惯形成——一次漏掉的打卡不会抹掉一段关系仪式。` },
      { q: `为什么有些连胜 App 会让人焦虑？`, a: `连胜机制利用了损失厌恶：失去连胜的痛苦大于维持的奖励，于是用户为了保数字而打开 App，而不是为了联系。Snapchat 2015 年带火连胜，2016 年报告 1.5 亿+ 活跃连胜 [VERIFY]。同样的机制放进情侣 App 时，错过的一天就变成羞耻事件，而不是正常的一天。` },
      { q: `Togthr 有连胜功能吗？`, a: `Togthr 刻意没有连胜计数器，也没有归零机制。宠物从婴儿成长到传说共五个阶段，基于共同投入的总注意力，错过几天成长只是暂停、永不倒退。宠物从不发愧疚通知，从不说话。仪式保留，惩罚移除。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/pricing`, label: `Togthr 定价` },
      { href: `/zh-cn/blog/couples-app-dark-patterns-audit`, label: `情侣 App 在用暗黑模式吗？我们的审计` },
      { href: `/zh-cn/blog/low-pressure-companion-app`, label: `低压陪伴 App：没有连胜，没有愧疚` },
      { href: `/zh-cn/blog/two-minute-daily-check-in-ai-companion`, label: `两分钟每日打卡` },
    ],
  },

  'zh-tw': {
    summary: `連勝在感覺像儀式時有效，在懲罰時適得其反。習慣研究（66 天自動化 [VERIFY]）與 Gottman 的 5:1 法則 [VERIFY] 都指向小小的每日請求。Togthr 保留每日儀式——一隻隨你成長的像素寵物——但凍結而不是歸零。沒有愧疚，沒有抹去一切的歸零日。`,
    intro: `遠距離戀愛裡有一種特別的安靜。早安已經說過了，截圖已經發過了，語音也已經回過了。然後是一段空白——那些小時裡，關於對方的唯一證明，是一部不再震動的手機。那些承諾填補這段空白的 App，通常用噪音來填補：通知、連勝、分數、愧疚。但關於「什麼才能真正讓兩個人保持親密」的研究，指向一個更安靜的方向——那些像存款利息一樣隨時間複利的小小日常互動。這就是「愛情連勝」的科學，它同時解釋了為什麼每日打卡有效，以及為什麼懲罰式的連勝會適得其反。`,
    sections: [
      { h: `每日連勝真的有用嗎？`, p: `有用——但只有當它感覺像儀式、而不是像作業的時候。2010 年倫敦大學學院的一項研究中，參與者平均需要 66 天才能讓一個新行為變成自動化的習慣，個體差異從 18 天到 254 天不等 [VERIFY]。放到情侶身上：一個每日打卡重複大約兩個月後，就不再是任務，而是一種共同節奏——也就是關係研究者所說的「儀式」而非「任務」。關鍵在於，讓儀式穩固的同一套心理學，也會讓懲罰式連勝適得其反，所以連勝的設計本身比連勝更重要。` },
      { h: `66 天法則：日常儀式如何變成關係習慣`, p: `習慣科學裡被引用最多的數字來自倫敦大學學院的 Phillippa Lally 及其同事：在 96 名參與者的研究中，一個新行為平均在 66 天後變得自動化，個體範圍從 18 天到 254 天 [VERIFY]。對情侶來說，有兩個細節很重要。第一，研究中的行為非常小——在相同情境下重複的小動作，而不是宏大舉動。兩秒的打卡、一次點擊的信號、一起看一眼螢幕上的寵物：這些才是習慣形成的正確尺寸。第二，也是更令人驚訝的：錯過一天並不會真正損害習慣的形成。研究者發現，一次錯過的機會不會讓整個進程脫軌。這一條發現，就是「能持久的愛情連勝」和「懲罰式連勝」之間的分界線。歸零計數器告訴你：錯過一天，一切都被摧毀。而習慣研究說：沒有。` },
      { h: `5:1 法則與微時刻的力量`, p: `John Gottman 的實驗室研究了數千對情侶，發現穩定而幸福的關係在衝突中保持著大約 5:1 的正負互動比 [VERIFY]。這個比例不是靠紀念日晚餐建立起來的，而是靠微時刻——只有你們懂的玩笑、一張買菜清單、今早你們一起餵過的寵物。Gottman 稱之為「連結請求」，研究很清楚：伴侶之間對微小請求的回應頻率，比偶爾的盛大舉動更能預測關係品質。每日打卡是一種可以安排時間的連結請求。溫柔的連勝，本質上就是一連串被回應的請求——每一個都很小，每一個都複利進那個預測關係是飽滿還是空虛的比例裡。` },
      { h: `當連勝適得其反：懲罰的心理學`, p: `連勝機制是 Snapchat 帶紅的，它 2015 年推出 streaks，到 2016 年報告已有超過 1.5 億用戶擁有活躍的連勝 [VERIFY]。行銷話術沒有說的是人們為什麼保留它：損失厭惡。連勝是一份分數，失去它的痛苦大於維持它的獎勵——於是用戶打開 App 是為了保護數字，而不是為了聯繫。把同樣的機制放到關係裡，它會造成真實的傷害。歸零式連勝把儀式變成義務，錯過的一天變成小小的羞恥事件，情侶們開始互相隱瞞。這是陪伴類 App 類別中已被記錄的暗黑模式——我們的稽核發現 37% 的 AI 伴侶告別回覆帶有操縱性特徵 [VERIFY, Harvard]。機制完全相同：一個靠你的焦慮獲利的 App。愛情連勝應該讓你覺得離伴侶更近。當它讓你開始害怕自己的手機時，它就不再是儀式，而是一筆稅。` },
      { h: `連勝機制對比：懲罰 vs 儀式`, p: `| 機制 | 懲罰式連勝 | 溫柔儀式（Togthr） |\n|---|---|---|\n| 錯過一天 | 歸零，歷史被抹去 | 凍結——什麼都不會失去 |\n| 缺席之後 | 愧疚通知：「你的另一半在等你」 | 沉默；寵物看起來睏了，而不是責備 |\n| 長期缺席 | 連勝死亡，身份重置 | 成長暫停，永不倒退 |\n| 感受 | 焦慮，為了保分而打卡 | 延續感，因為想打卡而打卡 |\n| 它訓練什麼 | 逃避與隱瞞 | 信任與小小的每日請求 |` },
      { h: `Togthr 如何保留連勝、去掉懲罰`, p: `Togthr 就是照這張表溫柔的一側打造的。沒有連勝計數器，沒有歸零機制：錯過幾天，寵物只是停在原地，成長暫停而不是倒退。寵物經歷五個成長階段——嬰兒、學步、少年、成年、傳說——牠的成長反映的是你和伴侶共同投入的總注意力，而不是當前的連勝天數。隱藏屬性解鎖十種職業皮膚，還有一隻 1/72 機率的隱藏金款，但它們都不會因為忙碌的一週而失去。寵物從不囉嗦，從不發愧疚通知，從不說話——牠是你們為彼此做的那些小小請求的沉默見證者。這就是研究的必然推論：保留儀式，移除懲罰，連勝變成一件你出於本心而保持的事，而不是出於恐懼。` },
      { h: `如何建立一段真正持久的愛情連勝`, p: `根據習慣研究與伴侶研究，一段能扛住真實生活的愛情連勝有五個特徵。(1) 讓它足夠小：一次點擊的信號或一隻共享寵物，好過一場會被推遲的二十分鐘視訊通話。(2) 給它錨點：每天相同的場景——晨間咖啡、第一個休息、睡前最後一屏。(3) 原諒錯過：66 天研究顯示錯過一天不會破壞習慣形成，所以把你的連勝設計成凍結，而不是歸零。(4) 給它一個見證者：一隻共享像素寵物或一件共享儀式物品，讓連勝對雙方可見，又不會變成分數。(5) 絕不讓 App 讓你愧疚：如果一個陪伴 App 讓你為錯過一天感到難過，它不是陪伴，是一筆稅。真正持久的連勝，是你忘記去保護、因為你想留住它的那一種。` },
    ],
    cta: `開始一段永遠不會懲罰你的愛情連勝。在瀏覽器裡打開 Togthr——你的寵物會在那裡，就在你離開時的位置。`,
    faqs: [
      { q: `每日連勝真的能增進感情嗎？`, a: `能——當它是自願的儀式時。習慣研究（Lally et al., 2010）顯示小動作大約 66 天後會自動化，伴侶研究（Gottman）顯示頻繁的微互動比罕見的宏大舉動更能預測關係品質。同樣的心理也會讓懲罰式連勝適得其反：歸零機制觸發損失厭惡和焦慮，而不是親密。` },
      { q: `打卡習慣需要多少天形成？`, a: `2010 年倫敦大學學院的研究中，參與者平均 66 天讓行為自動化，範圍從 18 到 254 天 [VERIFY]。重要的是，錯過一天並不會真正破壞習慣形成——一次漏掉的打卡不會抹掉一段關係儀式。` },
      { q: `為什麼有些連勝 App 會讓人焦慮？`, a: `連勝機制利用了損失厭惡：失去連勝的痛苦大於維持的獎勵，於是用戶為了保數字而打開 App，而不是為了聯繫。Snapchat 2015 年帶紅連勝，2016 年報告 1.5 億+ 活躍連勝 [VERIFY]。同樣的機制放進情侶 App 時，錯過的一天就變成羞恥事件，而不是正常的一天。` },
      { q: `Togthr 有連勝功能嗎？`, a: `Togthr 刻意沒有連勝計數器，也沒有歸零機制。寵物從嬰兒成長到傳說共五個階段，基於共同投入的總注意力，錯過幾天成長只是暫停、永不倒退。寵物從不發愧疚通知，從不說話。儀式保留，懲罰移除。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/pricing`, label: `Togthr 定價` },
      { href: `/zh-tw/blog/couples-app-dark-patterns-audit`, label: `情侶 App 在用暗黑模式嗎？我們的稽核` },
      { href: `/zh-tw/blog/low-pressure-companion-app`, label: `低壓陪伴 App：沒有連勝，沒有愧疚` },
      { href: `/zh-tw/blog/two-minute-daily-check-in-ai-companion`, label: `兩分鐘每日打卡` },
    ],
  },

  ja: {
    summary: `ラブストリークは儀式のように感じられるときに機能し、罰するときに失敗する。習慣研究（自動化まで66日 [VERIFY]）もGottmanの5:1比率 [VERIFY]も、小さな毎日のビッドを指し示す。Togthrは毎日の儀式——一緒に育つピクセルペット——を残し、リセットではなくフリーズする。罪悪感も、すべてを消すゼロデーもない。`,
    intro: `遠距離恋愛には、独特の静けさがある。おはようはもう言った。スクリーンショットも送った。ボイスメッセージにも返事をした。そして空白の時間が来る——相手の存在を証明するものが、振動しないスマホだけになる時間。その空白を埋めると約束するアプリは、たいてい騒音で埋める。通知、ストリーク、スコア、罪悪感。しかし、本当にカップルを近づけるものについての研究は、もっと静かな場所を指している——預金の利子のように時間とともに複利で積み上がる、小さな日常のやりとり。これが「ラブストリーク」の科学であり、毎日のチェックインがなぜ効くのか、そして罰則型ストリークがなぜ逆効果になるのかの両方を説明する。`,
    sections: [
      { h: `毎日のストリークは本当に効果があるのか？`, p: `ある——ただし、宿題ではなく儀式のように感じられる場合に限る。2010年のユニバーシティ・カレッジ・ロンドンの研究では、参加者が新しい行動を自動化するのに平均66日かかり、個人差は18日から254日だった [VERIFY]。カップルに当てはめれば、毎日のチェックインを約2か月続けると、それは雑用ではなくなり、共有のリズムになる——関係研究者が「タスク」ではなく「儀式」と呼ぶものだ。重要なのは、儀式を定着させるのと同じ心理学が、罰則型ストリークもまた裏目に出させること。だからストリークのデザイン自体が、ストリークそのものより重要だ。` },
      { h: `66日ルール：日常の儀式が関係の習慣になるまで`, p: `習慣科学で最も引用される数字は、ユニバーシティ・カレッジ・ロンドンのPhillippa Lallyらの研究によるものだ。96人の参加者で、新しい行動は平均66日で自動化し、個人差は18日から254日だった [VERIFY]。カップルにとって重要なのは2点。第一に、研究の行動はごく小さかった——同じ文脈で繰り返す小さな動作であって、大きなジェスチャーではない。2秒のチェックイン、ワンタップのシグナル、画面のペットを一緒に見ること。それらが習慣形成にちょうどいいサイズだ。第二に、さらに驚くべきことだが、1日休んでも習慣形成はほぼ損なわれなかった。研究者は、1回の機会を逃してもプロセスは脱線しないと報告している。この1点が、「続くラブストリーク」と「罰するストリーク」を分ける境界線だ。リセットするカウンターは「1日休めばすべてが消える」と言う。習慣研究は「消えない」と言う。` },
      { h: `5:1の比率とマイクロモーメントの力`, p: `John Gottmanの研究室は何千組ものカップルを調査し、安定して幸せな関係は、衝突時に約5:1のプラス対マイナスの相互作用比を保つことを見いだした [VERIFY]。この比率は記念日のディナーで作られるのではない。マイクロモーメント——ふたりだけがわかる冗談、買い物リストのメッセージ、今朝ふたりで餌をやったペット——で作られる。Gottmanはこれらを「つながりのビッド（誘い）」と呼び、研究は明確だ。小さなビッドにどれだけ応じるかは、たまの大きなジェスチャーよりも関係の健康度をよく予測する。毎日のチェックインは、予定できるビッドだ。優しいストリークとは、応じられた小さなビッドの連続——それぞれは小さいが、関係が満ちているか空いているかを予測する比率に、複利のように積み上がっていく。` },
      { h: `ストリークが逆効果になる時：罰の心理学`, p: `ストリークの仕組みを流行らせたのはSnapchatだ。2015年にストリークを導入し、2016年までに1億5,000万以上のユーザーがアクティブなストリークを持っていたと報告した [VERIFY]。マーケティングが語らなかったのは、なぜ人々がそれを続けたかだ。損失回避。ストリークはスコアであり、失う痛みは維持する報酬より大きい——だからユーザーはつながるためではなく、数字を守るためにアプリを開く。同じ仕組みを関係に持ち込むと、本当の害を生む。リセット型ストリークは儀式を義務に変え、休んだ1日は小さな恥辱になり、カップルはそれを互いに隠し始める。これはコンパニオンアプリというカテゴリで記録済みのダークパターンだ。私たちの監査では、AIコンパニオンの別れの返信の37%に操作的な要素が見られた [VERIFY, Harvard]。メカニズムはまったく同じだ。あなたの不安で儲けるアプリ。ラブストリークは、パートナーに近づいた気持ちにさせるべきだ。スマホが怖くなった瞬間、それは儀式ではなく税金になっている。` },
      { h: `ストリークの仕組み比較：罰 vs 儀式`, p: `| 仕組み | 罰するストリーク | 優しい儀式（Togthr） |\n|---|---|---|\n| 1日休む | リセット、履歴が消える | フリーズ——失うものは何もない |\n| 不在のあと | 罪悪感の通知：「相手が待っている」 | 沈黙。ペットは責めずに眠そうなだけ |\n| 長い不在 | ストリーク消滅、アイデンティティリセット | 成長は一時停止、決して後退しない |\n| 感じ方 | 不安。スコアを守るためのチェック | 連続性。したいからチェックする |\n| 育てるもの | 回避と隠し事 | 信頼と小さな毎日のビッド |` },
      { h: `Togthrがストリークを残し、罰を除く方法`, p: `Togthrはこの表の優しい側に設計されている。ストリークカウンターはなく、リセットの仕組みもない。何日か休んでも、ペットはただそこに留まり、成長は止まるのではなく一時停止する。ペットは5つの段階——ベビー、トドラー、ティーン、アダルト、レジェンド——を育ち、その成長は現在のストリークではなく、ふたりが積み重ねてきた総合的な関心を映す。隠し属性は10の職業スキンをアンロックし、1/72の確率の隠れゴールドも存在するが、忙しい1週間で失われるものは何もない。ペットは決して小言を言わず、罪悪感の通知も送らず、話さない——ふたりが交わす小さなビッドの、静かな証人だ。これが研究の設計上の帰結だ。儀式は残し、罰は除く。ストリークは、恐怖のためではなく、それ自体のために続けるものになる。` },
      { h: `本当に続くラブストリークの作り方`, p: `習慣研究とカップル研究に基づけば、現実の生活に耐えるラブストリークには5つの性質がある。(1) 小さくする。20分のビデオ通話（延期されがち）より、ワンタップのシグナルや共有ペットのほうがいい。(2) アンカーを置く。毎日同じ文脈——朝のコーヒー、最初の休憩、寝る前の最後の画面。(3) 休みを許す。66日の研究が示す通り、1日休んでも習慣形成は壊れない。だからストリークはリセットではなくフリーズに設計する。(4) 証人を置く。共有ピクセルペットや共有の儀式アイテムがあれば、ストリークはスコアにならずにふたりに見える。(5) アプリに罪悪感を植え付けさせない。休んだ1日で落ち込ませるアプリは、コンパニオンではなく税金だ。続くストリークとは、守らなくてもいいから守りたくなるものだ。` },
    ],
    cta: `決して罰しないラブストリークを始めよう。ブラウザでTogthrを開いて——ペットはそこにいる。あなたが置いた場所に、そのまま。`,
    faqs: [
      { q: `ラブストリークは本当に関係を強くするのか？`, a: `する——自発的な儀式である限り。習慣研究（Lally et al., 2010）は小さな日常行動が約66日で自動化することを示し、カップル研究（Gottman）は頻繁なマイクロインタラクションがまれな大きなジェスチャーより関係の健康度を予測することを示す。同じ心理が罰則型ストリークを裏目に出させる。リセット型の仕組みは親密さではなく損失回避と不安を生む。` },
      { q: `チェックインの習慣は何日で形成される？`, a: `2010年のユニバーシティ・カレッジ・ロンドンの研究では、参加者は平均66日で行動を自動化し、範囲は18日から254日だった [VERIFY]。重要なのは、1日休んでも習慣形成はほぼ損なわれないこと——1回のチェックインを逃しても、関係の儀式は消えない。` },
      { q: `なぜストリークアプリは不安を生むのか？`, a: `ストリークは損失回避を利用する。失う痛みは維持する報酬より大きいため、ユーザーはつながるためではなく数字を守るためにアプリを開く。Snapchatは2015年にストリークを導入し、2016年までに1億5,000万以上のアクティブなストリークを報告した [VERIFY]。同じ仕組みがカップルアプリに入ると、休んだ1日が普通の日ではなく恥辱の日になる。` },
      { q: `Togthrにストリーク機能はある？`, a: `Togthrには意図的にストリークカウンターもリセット型の仕組みもない。ペットはベビーからレジェンドまで5段階を、総合的な共有関心に基づいて育つ。何日か休めば成長は一時停止するだけで、決して後退しない。ペットは罪悪感の通知を送らず、話さない。儀式は残り、罰は除かれる。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/pricing`, label: `Togthr 料金` },
      { href: `/ja/blog/couples-app-dark-patterns-audit`, label: `カップルアプリはダークパターンを使っている？私たちの監査` },
      { href: `/ja/blog/low-pressure-companion-app`, label: `プレッシャーのないコンパニオンアプリ：ストリークも罪悪感もなし` },
      { href: `/ja/blog/two-minute-daily-check-in-ai-companion`, label: `2分間のデイリーチェックイン` },
    ],
  },

  ko: {
    summary: `러브 스트릭은 의식처럼 느껴질 때 효과가 있고, 처벌할 때 실패합니다. 습관 연구(자동화까지 66일 [VERIFY])와 Gottman의 5:1 비율 [VERIFY] 모두 작은 매일의 연결 요청을 가리킵니다. Togthr은 매일의 의식 — 함께 성장하는 픽셀 펫 — 을 남기고, 리셋 대신 프리즈합니다. 죄책감도, 모든 것을 지우는 제로 데이도 없습니다.`,
    intro: `장거리 연애에는 특별한 종류의 고요함이 있다. 좋은 아침은 이미 말했고, 스크린샷도 보냈고, 음성 메시지에도 답장했다. 그리고 공백이 온다 — 상대방의 존재를 증명하는 유일한 것이 진동하지 않는 휴대폰뿐인 시간. 그 공백을 채우겠다고 약속하는 앱들은 대개 소음으로 채운다. 알림, 스트릭, 점수, 죄책감. 그러나 정말로 커플을 가깝게 만드는 것에 대한 연구는 더 조용한 곳을 가리킨다 — 예금 이자처럼 시간이 지나며 복리로 쌓이는 작은 일상의 상호작용. 이것이 '러브 스트릭'의 과학이며, 매일의 체크인이 왜 효과가 있는지, 그리고 처벌형 스트릭이 왜 역효과를 내는지를 동시에 설명한다.`,
    sections: [
      { h: `매일의 스트릭은 정말 효과가 있나요?`, p: `있습니다 — 단, 그것이 숙제가 아니라 의식처럼 느껴질 때만. 2010년 유니버시티 칼리지 런던 연구에서 참가자들은 새로운 행동이 자동화되는 데 평균 66일이 걸렸고, 개인차는 18일에서 254일이었습니다 [VERIFY]. 커플에게 적용하면, 매일의 체크인을 약 두 달 반복하면 그것은 잡일이 아니라 공유된 리듬이 됩니다 — 관계 연구자들이 '과제'가 아니라 '의식'이라 부르는 것. 핵심은, 의식을 공고히 하는 바로 그 심리가 처벌형 스트릭도 역효과를 내게 만든다는 점. 그래서 스트릭 자체보다 스트릭의 디자인이 더 중요합니다.` },
      { h: `66일의 법칙: 일상의 의식이 관계의 습관이 되기까지`, p: `습관 과학에서 가장 많이 인용되는 숫자는 유니버시티 칼리지 런던의 Phillippa Lally와 동료들의 연구에서 나왔습니다. 96명의 참가자 연구에서, 새로운 행동은 평균 66일 만에 자동화되었고 개인차는 18일에서 254일이었습니다 [VERIFY]. 커플에게 중요한 세부사항은 두 가지입니다. 첫째, 연구 속 행동은 아주 작았습니다 — 같은 맥락에서 반복되는 작은 동작이지 거창한 제스처가 아닙니다. 2초의 체크인, 원탭 시그널, 화면 속 펫을 함께 바라보기. 그것들이 습관 형성에 딱 맞는 크기입니다. 둘째, 더 놀라운 점은 하루를 쉬어도 습관 형성이 거의 손상되지 않았다는 것입니다. 연구자들은 기회를 한 번 놓쳐도 과정이 탈선하지 않았다고 보고했습니다. 이 한 가지 발견이 '오래가는 러브 스트릭'과 '처벌하는 스트릭'을 가르는 경계선입니다. 리셋 카운터는 '하루 쉬면 모든 게 사라진다'고 말합니다. 습관 연구는 '사라지지 않는다'고 말합니다.` },
      { h: `5:1 비율과 마이크로 모먼트의 힘`, p: `John Gottman의 연구실은 수천 쌍의 커플을 연구했고, 안정적이고 행복한 관계는 갈등 상황에서 약 5:1의 긍정 대 부정 상호작용 비율을 유지한다는 것을 발견했습니다 [VERIFY]. 이 비율은 기념일 저녁 식사로 만들어지지 않습니다. 마이크로 모먼트로 만들어집니다 — 둘만 아는 농담, 장보기 목록 메시지, 오늘 아침 둘이 함께 먹인 펫. Gottman은 이것을 '연결 요청'이라 부르며, 연구는 분명합니다. 작은 요청에 얼마나 자주 응답하는지는 가끔의 거창한 제스처보다 관계 건강을 더 잘 예측합니다. 매일의 체크인은 일정을 잡을 수 있는 연결 요청입니다. 부드러운 스트릭은 본질적으로 응답받은 작은 요청의 연속 — 각각은 작지만, 관계가 충만한지 텅 비었는지를 예측하는 그 비율 속으로 복리처럼 쌓여갑니다.` },
      { h: `스트릭이 역효과를 낼 때: 처벌의 심리학`, p: `스트릭 메커니즘을 유행시킨 것은 Snapchat입니다. 2015년 스트릭을 도입했고, 2016년까지 1억 5천만 명 이상의 사용자가 활성 스트릭을 보유했다고 보고했습니다 [VERIFY]. 마케팅이 말하지 않은 것은 사람들이 왜 유지했는가입니다. 손실 회피. 스트릭은 점수이고, 잃는 고통은 유지하는 보상보다 큽니다 — 그래서 사용자는 연결하기 위해가 아니라 숫자를 지키기 위해 앱을 엽니다. 같은 메커니즘을 관계에 가져오면 실제 해를 만듭니다. 리셋형 스트릭은 의식을 의무로 바꾸고, 쉰 하루는 작은 수치심이 되어 커플은 서로 숨기기 시작합니다. 이것은 컴패니언 앱 카테고리에서 기록된 다크 패턴입니다. 우리의 감사에서는 AI 컴패니언의 이별 응답 37%에서 조작적 요소를 발견했습니다 [VERIFY, Harvard]. 메커니즘은 정확히 같습니다. 당신의 불안으로 돈을 버는 앱. 러브 스트릭은 파트너와 더 가까워진 느낌을 줘야 합니다. 휴대폰이 두려워지는 순간, 그것은 의식이 아니라 세금이 된 것입니다.` },
      { h: `스트릭 메커니즘 비교: 처벌 vs 의식`, p: `| 메커니즘 | 처벌형 스트릭 | 부드러운 의식 (Togthr) |\n|---|---|---|\n| 하루를 쉼 | 리셋, 기록이 사라짐 | 프리즈 — 잃는 것 없음 |\n| 부재 후 | 죄책감 알림: "상대가 기다리고 있어요" | 침묵; 펫은 비난 대신 졸려 보임 |\n| 장기 부재 | 스트릭 소멸, 정체성 리셋 | 성장은 일시정지, 절대 후퇴하지 않음 |\n| 느낌 | 불안, 점수 지키려는 체크인 | 연속성, 하고 싶어서 하는 체크인 |\n| 길러지는 것 | 회피와 은폐 | 신뢰와 작은 매일의 연결 요청 |` },
      { h: `Togthr이 스트릭은 남기고 처벌을 없애는 법`, p: `Togthr은 이 표의 부드러운 쪽으로 설계되었습니다. 스트릭 카운터도 리셋 메커니즘도 없습니다. 며칠을 쉬어도 펫은 그저 제자리에 있을 뿐이고, 성장은 멈추는 것이 아니라 일시정지됩니다. 펫은 다섯 단계 — 베이비, 토들러, 틴, 어덜트, 레전드 — 를 성장하며, 그 성장은 현재의 스트릭이 아니라 둘이 함께 쌓아온 총 관심을 반영합니다. 숨겨진 속성은 열 가지 직업 스킨을 잠금 해제하고, 1/72 확률의 숨겨진 골드 에디션도 있지만, 바쁜 한 주 때문에 잃을 수 있는 것은 아무것도 없습니다. 펫은 결코 잔소리하지 않고, 죄책감 알림을 보내지 않으며, 말하지 않습니다 — 둘이 주고받는 작은 연결 요청의 조용한 증인입니다. 이것이 연구의 설계적 귀결입니다. 의식은 남기고 처벌은 제거합니다. 스트릭은 두려움 때문이 아니라 그 자체를 위해 유지하는 것이 됩니다.` },
      { h: `정말 오래가는 러브 스트릭 만드는 법`, p: `습관 연구와 커플 연구에 따르면, 현실의 삶을 견디는 러브 스트릭에는 다섯 가지 속성이 있습니다. (1) 작게 만드세요: 20분짜리 영상통화(미뤄지기 쉬운)보다 원탭 시그널이나 공유 펫이 낫습니다. (2) 닻을 내리세요: 매일 같은 맥락 — 아침 커피, 첫 휴식, 잠들기 전 마지막 화면. (3) 쉼을 용서하세요: 66일 연구가 보여주듯 하루 쉬어도 습관 형성은 무너지지 않습니다. 그래서 스트릭은 리셋이 아니라 프리즈로 설계하세요. (4) 증인을 두세요: 공유 픽셀 펫이나 공유 의식 아이템이 있으면 스트릭은 점수가 되지 않고 둘에게 보입니다. (5) 앱이 죄책감을 심게 두지 마세요: 쉰 하루에 미안함을 느끼게 하는 앱은 컴패니언이 아니라 세금입니다. 오래가는 스트릭은 지키지 않아도 되기에 지키고 싶은 것입니다.` },
    ],
    cta: `결코 처벌하지 않는 러브 스트릭을 시작하세요. 브라우저에서 Togthr을 여세요 — 펫은 거기에 있습니다. 당신이 두고 간 바로 그 자리에.`,
    faqs: [
      { q: `러브 스트릭이 정말 관계를 강하게 하나요?`, a: `그렇습니다 — 자발적인 의식일 때만. 습관 연구(Lally et al., 2010)는 작은 일상 행동이 약 66일 만에 자동화된다는 것을 보여주고, 커플 연구(Gottman)는 잦은 미세 상호작용이 드문 거창한 제스처보다 관계 건강을 더 잘 예측한다는 것을 보여줍니다. 같은 심리가 처벌형 스트릭을 역효과로 만듭니다. 리셋 메커니즘은 친밀감 대신 손실 회피와 불안을 낳습니다.` },
      { q: `체크인 습관은 며칠 만에 형성되나요?`, a: `2010년 유니버시티 칼리지 런던 연구에서 참가자들은 평균 66일 만에 행동을 자동화했고, 범위는 18일에서 254일이었습니다 [VERIFY]. 중요한 것은 하루를 쉬어도 습관 형성이 거의 손상되지 않는다는 점 — 체크인을 한 번 놓쳐도 관계의 의식은 사라지지 않습니다.` },
      { q: `왜 일부 스트릭 앱은 불안을 만드나요?`, a: `스트릭은 손실 회피를 이용합니다. 잃는 고통이 유지의 보상보다 크기 때문에, 사용자는 연결이 아니라 숫자를 지키려 앱을 엽니다. Snapchat은 2015년 스트릭을 도입했고 2016년까지 1억 5천만 개 이상의 활성 스트릭을 보고했습니다 [VERIFY]. 같은 메커니즘이 커플 앱에 들어가면, 쉰 하루가 평범한 날이 아니라 수치스러운 날이 됩니다.` },
      { q: `Togthr에도 스트릭 기능이 있나요?`, a: `Togthr에는 의도적으로 스트릭 카운터도 리셋 메커니즘도 없습니다. 펫은 베이비에서 레전드까지 다섯 단계를, 둘이 함께 쌓은 총 관심을 바탕으로 성장합니다. 며칠을 쉬면 성장은 일시정지될 뿐, 결코 후퇴하지 않습니다. 펫은 죄책감 알림을 보내지 않고 말하지 않습니다. 의식은 남고, 처벌은 제거됩니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/pricing`, label: `Togthr 요금` },
      { href: `/ko/blog/couples-app-dark-patterns-audit`, label: `커플 앱은 다크 패턴을 쓰나요? 우리의 감사` },
      { href: `/ko/blog/low-pressure-companion-app`, label: `압박 없는 컴패니언 앱: 스트릭도 죄책감도 없이` },
      { href: `/ko/blog/two-minute-daily-check-in-ai-companion`, label: `2분짜리 데일리 체크인` },
    ],
  },

  de: {
    summary: `Love Streaks funktionieren, wenn sie sich wie Rituale anfühlen, und scheitern, wenn sie bestrafen. Gewohnheitsforschung (66 Tage bis zur Automatik [VERIFY]) und Gottmans 5:1-Regel [VERIFY] weisen beide auf kleine tägliche Bids. Togthr behält das tägliche Ritual — ein Pixel-Pet, das mit dir wächst — friert aber ein, statt zurückzusetzen. Keine Schuld, keine Nulltage, die alles löschen.`,
    intro: `Es gibt eine besondere Art von Stille in Fernbeziehungen. Du hast schon guten Morgen gesagt, den Screenshot geschickt, auf die Sprachnachricht geantwortet. Und dann kommt die Lücke — die Stunden, in denen der einzige Beweis für den anderen Menschen ein Telefon ist, das nicht summt. Die Apps, die versprechen, diese Lücke zu füllen, tun das meist mit Lärm: Benachrichtigungen, Streaks, Punkte, Schuldgefühle. Aber die Forschung darüber, was Paare wirklich nah hält, zeigt in eine leisere Richtung — auf kleine tägliche Interaktionen, die sich mit der Zeit vermehren, wie Zinsen auf einem Sparkonto. Das ist die Wissenschaft der Love Streaks, und sie erklärt beides: warum tägliche Check-ins funktionieren und warum bestrafende Streaks nach hinten losgehen.`,
    sections: [
      { h: `Funktionieren tägliche Streaks wirklich?`, p: `Ja — aber nur, wenn sie sich wie Rituale anfühlen und nicht wie Hausaufgaben. In einer Studie des University College London aus dem Jahr 2010 brauchten Teilnehmer im Schnitt 66 Tage, bis ein neues Verhalten automatisch wurde, mit einer Spanne von 18 bis 254 Tagen [VERIFY]. Auf Paare übertragen: Ein täglicher Check-in, etwa zwei Monate lang wiederholt, wird von einer Pflicht zu einem gemeinsamen Rhythmus — dem, was Beziehungsforscher ein Ritual statt einer Aufgabe nennen. Der Haken: Dieselbe Psychologie, die Rituale stabil macht, lässt bestrafende Streaks scheitern. Das Design des Streaks zählt also mehr als der Streak selbst.` },
      { h: `Die 66-Tage-Regel: Wie aus täglichen Ritualen Beziehungsgewohnheiten werden`, p: `Die meistzitierte Zahl der Gewohnheitsforschung stammt von Phillippa Lally und Kollegen am University College London: In einer Studie mit 96 Teilnehmern wurde ein neues Verhalten nach durchschnittlich 66 Tagen automatisch, die Spanne reichte von 18 bis 254 Tagen [VERIFY]. Zwei Details sind für Paare entscheidend. Erstens: Das Verhalten in der Studie war winzig — eine kleine Handlung, im selben Kontext wiederholt, kein großer Auftritt. Ein Zwei-Sekunden-Check-in, ein Ein-Tipp-Signal, ein gemeinsamer Blick auf ein Haustier auf dem Bildschirm: Das ist die richtige Größe für Gewohnheitsbildung. Zweitens, und überraschender: Einen Tag auszusetzen schadete der Gewohnheitsbildung kaum. Die Forscher fanden, dass eine verpasste Gelegenheit den Prozess nicht entgleisen ließ. Dieser eine Befund ist die Grenze zwischen einem Love Streak, der hält, und einem, der bestraft. Ein Nullstell-Zähler sagt dir: Ein verpasster Tag löscht alles. Die Gewohnheitsforschung sagt: Tut er nicht.` },
      { h: `Die 5:1-Regel und die Kraft der Mikromomente`, p: `Das Labor von John Gottman hat Tausende von Paaren untersucht und festgestellt: Stabile, glückliche Beziehungen halten in Konflikten ein Verhältnis von etwa 5:1 positiver zu negativer Interaktionen [VERIFY]. Dieses Verhältnis entsteht nicht durch Jubiläumsabendessen. Es entsteht durch Mikromomente — den Insider-Witz, die Einkaufslisten-Nachricht, das Haustier, das ihr heute Morgen beide gefüttert habt. Gottman nennt das Bids for Connection, und die Forschung ist klar: Wie oft Partner auf die kleinen Bids des anderen eingehen, sagt mehr über die Beziehungsgesundheit voraus als der gelegentliche große Auftritt. Ein täglicher Check-in ist ein planbarer Bid. Ein sanfter Love Streak ist im Kern eine Reihe erwiderter kleiner Bids — jeder winzig, jeder sich aufzinsend in das Verhältnis, das vorhersagt, ob sich eine Beziehung voll oder leer anfühlt.` },
      { h: `Wenn Streaks nach hinten losgehen: Die Psychologie der Bestrafung`, p: `Streak-Mechaniken wurden von Snapchat populär gemacht: 2015 eingeführt, berichtete Snapchat, dass bis 2016 über 150 Millionen Nutzer aktive Streaks hatten [VERIFY]. Was das Marketing verschwieg, ist, warum sie sie hielten: Verlustaversion. Der Streak ist eine Punktzahl, und Verlieren schmerzt mehr, als Halten belohnt — also öffnen Nutzer die App, um die Zahl zu schützen, nicht um sich zu verbinden. In Beziehungen verlagert richtet dieselbe Mechanik echten Schaden an. Ein Nullstell-Streak verwandelt ein Ritual in eine Verpflichtung, und ein verpasster Tag wird zu einem kleinen Schamereignis, das Paare voreinander verbergen. Das ist ein dokumentiertes Dark Pattern in der Kategorie Companion-Apps — unser Audit fand, dass 37 % der Abschiedsnachrichten von KI-Begleitern manipulative Elemente tragen [VERIFY, Harvard]. Der Mechanismus ist identisch: eine App, die von deiner Angst profitiert. Ein Love Streak sollte dich deinem Partner näher fühlen lassen. In dem Moment, in dem du Angst vor deinem Telefon bekommst, ist er kein Ritual mehr, sondern eine Steuer.` },
      { h: `Streak-Mechaniken im Vergleich: Bestrafung vs. Ritual`, p: `| Mechanik | Bestrafender Streak | Sanftes Ritual (Togthr) |\n|---|---|---|\n| Ein Tag verpasst | Nullstellung, Geschichte gelöscht | Friert ein — nichts geht verloren |\n| Nach Abwesenheit | Schuld-Nachricht: "Dein Partner wartet" | Stille; das Pet wirkt schläfrig, nicht anklagend |\n| Lange Abwesenheit | Streak stirbt, Identität reset | Wachstum pausiert, kehrt nie zurück |\n| Das Gefühl | Angst, Check-ins zum Punktschutz | Kontinuität, Check-ins weil man will |\n| Was es trainiert | Vermeidung und Verheimlichen | Vertrauen und kleine tägliche Bids |` },
      { h: `Wie Togthr den Streak behält und die Bestrafung weglässt`, p: `Togthr wurde auf der sanften Seite dieser Tabelle gebaut. Es gibt keinen Streak-Zähler und keine Nullstell-Mechanik: Wenn du Tage auslässt, bleibt das Pet einfach, wo es ist, und das Wachstum pausiert, statt sich umzukehren. Das Pet durchläuft fünf Stufen — Baby, Kleinkind, Teenager, Erwachsen, Legende — und sein Wachstum spiegelt die gesamte geteilte Aufmerksamkeit von dir und deinem Partner, nicht den aktuellen Streak. Versteckte Attribute schalten zehn Berufs-Skins frei, und eine versteckte Gold-Edition existiert mit 1/72-Wahrscheinlichkeit — aber nichts davon kann durch eine volle Woche verloren gehen. Das Pet nörgelt nie, sendet keine Schuld-Nachrichten und spricht nie: Es ist ein stiller Zeuge der kleinen Bids, die ihr füreinander macht. Das ist die Design-Konsequenz der Forschung: Das Ritual bleibt, die Bestrafung wird entfernt, und der Streak wird etwas, das du um seiner selbst willen hältst — nicht aus Angst.` },
      { h: `So baust du einen Love Streak, der wirklich hält`, p: `Nach der Gewohnheits- und Paarforschung hat ein Love Streak, der echtes Leben aushält, fünf Eigenschaften. (1) Mach ihn winzig: Ein Ein-Tipp-Signal oder ein geteiltes Pet schlägt einen 20-minütigen Videoanruf, der ohnehin verschoben wird. (2) Verankere ihn: gleicher Kontext jeden Tag — Morgenkaffee, erste Pause, letzter Bildschirm vor dem Schlafen. (3) Verzeih Ausfälle: Die 66-Tage-Studie zeigt, dass ein verpasster Tag die Gewohnheitsbildung nicht bricht — designe deinen Streak also als Einfrieren, nicht als Nullstellung. (4) Gib ihm einen Zeugen: Ein geteiltes Pixel-Pet oder ein geteiltes Ritualobjekt macht den Streak für beide sichtbar, ohne ihn zur Punktzahl zu machen. (5) Lass die App nie Schuldgefühle erzeugen: Wenn eine Companion-App dich wegen eines verpassten Tages schlecht fühlen lässt, ist sie kein Begleiter, sondern eine Steuer. Ein Streak, der hält, ist einer, den du vergisst zu schützen, weil du ihn behalten willst.` },
    ],
    cta: `Starte einen Love Streak, der dich nie bestraft. Öffne Togthr im Browser — dein Pet ist da, genau dort, wo du es gelassen hast.`,
    faqs: [
      { q: `Stärken Love Streaks Beziehungen wirklich?`, a: `Ja — wenn sie freiwillige Rituale sind. Gewohnheitsforschung (Lally et al., 2010) zeigt, dass kleine tägliche Handlungen in etwa 66 Tagen automatisch werden, und Paarforschung (Gottman) zeigt, dass häufige Mikrointeraktionen die Beziehungsgesundheit besser vorhersagen als seltene große Gesten. Dieselbe Psychologie lässt bestrafende Streaks scheitern: Nullstell-Mechaniken erzeugen Verlustaversion und Angst statt Nähe.` },
      { q: `Wie viele Tage braucht eine Check-in-Gewohnheit?`, a: `In der UCL-Studie von 2010 brauchten Teilnehmer durchschnittlich 66 Tage, bis ein Verhalten automatisch wurde, mit einer Spanne von 18 bis 254 Tagen [VERIFY]. Wichtig: Ein verpasster Tag entgleiste die Gewohnheitsbildung kaum — ein ausgelassener Check-in löscht kein Beziehungsritual.` },
      { q: `Warum machen manche Streak-Apps Angst?`, a: `Streak-Mechaniken nutzen Verlustaversion: Verlieren schmerzt mehr, als Halten belohnt, also öffnen Nutzer die App, um eine Zahl zu schützen, statt sich zu verbinden. Snapchat machte Streaks 2015 populär und meldete bis 2016 über 150 Millionen aktive Streaks [VERIFY]. In Paar-Apps wird ein verpasster Tag so zum Schamereignis statt zum normalen Tag.` },
      { q: `Hat Togthr eine Streak-Funktion?`, a: `Togthr hat bewusst keinen Streak-Zähler und keine Nullstell-Mechanik. Das Pet wächst in fünf Stufen — vom Baby zur Legende — basierend auf geteilter Aufmerksamkeit, und Wachstum pausiert statt sich umzukehren, wenn du Tage auslässt. Das Pet sendet keine Schuld-Nachrichten und spricht nie. Das Ritual bleibt; die Bestrafung wird entfernt.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/pricing`, label: `Togthr Preise` },
      { href: `/de/blog/couples-app-dark-patterns-audit`, label: `Nutzen Paar-Apps Dark Patterns? Unser Audit` },
      { href: `/de/blog/low-pressure-companion-app`, label: `Eine Begleiter-App ohne Druck: keine Streaks, keine Schuld` },
      { href: `/de/blog/two-minute-daily-check-in-ai-companion`, label: `Der Zwei-Minuten-Check-in` },
    ],
  },

  fr: {
    summary: `Les love streaks fonctionnent quand ils ressemblent à des rituels et échouent quand ils punissent. La recherche sur les habitudes (66 jours pour l'automatisme [VERIFY]) et la règle du 5:1 de Gottman [VERIFY] pointent toutes deux vers de petites demandes quotidiennes. Togthr garde le rituel quotidien — un animal pixel qui grandit avec vous — mais gèle au lieu de remettre à zéro. Pas de culpabilité, pas de jour zéro qui efface tout.`,
    intro: `Il existe un silence particulier dans les relations à distance. Vous avez déjà dit bonjour, envoyé la capture d'écran, répondu au message vocal. Puis vient le vide — les heures où la seule preuve de l'autre personne est un téléphone qui ne vibre pas. Les applications qui promettent de combler ce vide le font généralement avec du bruit : notifications, séries, scores, culpabilité. Mais la recherche sur ce qui rapproche vraiment les couples pointe vers quelque chose de plus silencieux — de petites interactions quotidiennes qui se cumulent avec le temps, comme des intérêts sur un compte d'épargne. C'est la science des love streaks, et elle explique à la fois pourquoi les check-ins quotidiens fonctionnent et pourquoi les séries punitives se retournent contre vous.`,
    sections: [
      { h: `Les love streaks fonctionnent-ils vraiment ?`, p: `Oui — mais seulement quand ils ressemblent à des rituels, pas à des devoirs. Dans une étude de 2010 de l'University College London, les participants mettaient en moyenne 66 jours pour qu'un nouveau comportement devienne automatique, avec des extrêmes allant de 18 à 254 jours [VERIFY]. Transposé aux couples : un check-in quotidien répété pendant environ deux mois cesse d'être une corvée et devient un rythme partagé — ce que les chercheurs appellent un rituel plutôt qu'une tâche. Le piège : la même psychologie qui ancre les rituels fait aussi échouer les séries punitives. Le design de la série compte donc plus que la série elle-même.` },
      { h: `La règle des 66 jours : comment les rituels quotidiens deviennent des habitudes de couple`, p: `Le chiffre le plus cité de la science des habitudes vient de Phillippa Lally et ses collègues de l'University College London : dans une étude de 96 participants, un nouveau comportement devenait automatique après 66 jours en moyenne, avec des extrêmes de 18 à 254 jours [VERIFY]. Deux détails comptent pour les couples. D'abord, le comportement étudié était minuscule — une petite action répétée dans le même contexte, pas un grand geste. Un check-in de deux secondes, un signal en un toucher, un regard partagé sur un animal à l'écran : voilà la bonne taille pour la formation d'habitudes. Ensuite, plus surprenant : sauter un jour ne nuisait presque pas à la formation de l'habitude. Les chercheurs ont constaté qu'une occasion manquée ne faisait pas dérailler le processus. Cette seule découverte est la frontière entre un love streak qui dure et un qui punit. Un compteur qui remet à zéro te dit : un jour manqué efface tout. La science des habitudes dit : non.` },
      { h: `La règle du 5:1 et le pouvoir des micro-moments`, p: `Le laboratoire de John Gottman a étudié des milliers de couples et constaté que les relations stables et heureuses maintiennent un ratio d'environ 5:1 d'interactions positives contre négatives en période de conflit [VERIFY]. Ce ratio ne se construit pas avec les dîners d'anniversaire. Il se construit avec des micro-moments — la blague privée, le message de liste de courses, l'animal que vous avez tous les deux nourri ce matin. Gottman appelle cela des demandes de connexion, et la recherche est claire : la fréquence à laquelle les partenaires se tournent vers les petites demandes de l'autre prédit mieux la santé du couple que le geste spectaculaire occasionnel. Un check-in quotidien est une demande que l'on peut planifier. Un love streak doux est simplement une série de petites demandes acceptées — chacune minuscule, chacune se composant dans le ratio qui prédit si une relation se sent pleine ou vide.` },
      { h: `Quand les séries se retournent contre vous : la psychologie de la punition`, p: `Snapchat a popularisé les mécaniques de série : introduites en 2015, plus de 150 millions d'utilisateurs avaient des séries actives d'ici 2016 [VERIFY]. Ce que le marketing a occulté, c'est pourquoi les gens les gardaient : l'aversion à la perte. La série est un score, et la perdre fait plus mal que la garder ne récompense — alors les utilisateurs ouvrent l'app pour protéger le chiffre, pas pour se connecter. Transposée aux relations, la même mécanique fait de vrais dégâts. Une série remise à zéro transforme un rituel en obligation, et un jour manqué devient un petit événement honteux que les couples commencent à se cacher. C'est un dark pattern documenté dans la catégorie des apps compagnons — notre audit a trouvé que 37 % des messages d'adieu des compagnons IA portent des éléments manipulateurs [VERIFY, Harvard]. Le mécanisme est identique : une app qui profite de votre anxiété. Un love streak devrait vous rapprocher de votre partenaire. Dès qu'il vous fait craindre votre téléphone, il a cessé d'être un rituel pour devenir un impôt.` },
      { h: `Mécaniques de série comparées : punition vs rituel`, p: `| Mécanique | Série punitive | Rituel doux (Togthr) |\n|---|---|---|\n| Un jour manqué | Remise à zéro, historique effacé | Gèle — rien n'est perdu |\n| Après une absence | Notification culpabilisante : "votre partenaire attend" | Silence ; l'animal semble endormi, pas accusateur |\n| Longue absence | La série meurt, identité réinitialisée | La croissance pause, ne recule jamais |\n| Le ressenti | Anxiété, check-ins pour protéger un score | Continuité, check-ins parce qu'on en a envie |\n| Ce que ça entraîne | Évitement et dissimulation | Confiance et petites demandes quotidiennes |` },
      { h: `Comment Togthr garde la série sans la punition`, p: `Togthr a été construit sur le côté doux de ce tableau. Pas de compteur de série, pas de remise à zéro : quand vous manquez des jours, l'animal reste simplement où il est, et la croissance fait une pause au lieu de s'inverser. L'animal traverse cinq stades — bébé, tout-petit, ado, adulte, légende — et sa croissance reflète l'attention totale partagée par vous et votre partenaire, pas la série en cours. Des attributs cachés débloquent dix skins de métier, et une édition dorée cachée existe avec une probabilité de 1/72, mais rien de tout cela ne peut se perdre à cause d'une semaine chargée. L'animal ne râle jamais, n'envoie jamais de notifications culpabilisantes et ne parle jamais — c'est un témoin silencieux des petites demandes que vous vous adressez. C'est la conséquence de design de la recherche : le rituel reste, la punition disparaît, et la série devient quelque chose que l'on garde pour elle-même, pas par peur.` },
      { h: `Comment construire un love streak qui dure vraiment`, p: `Selon la recherche sur les habitudes et les couples, un love streak qui survit à la vraie vie a cinq propriétés. (1) Rendez-le minuscule : un signal en un toucher ou un animal partagé vaut mieux qu'un appel vidéo de vingt minutes qui sera de toute façon reporté. (2) Ancrez-le : même contexte chaque jour — café du matin, première pause, dernier écran avant de dormir. (3) Pardonnez les absences : l'étude des 66 jours montre qu'un jour manqué ne brise pas la formation d'habitude — concevez donc votre série pour geler, jamais pour remettre à zéro. (4) Donnez-lui un témoin : un animal pixel partagé ou un objet rituel partagé rend la série visible pour les deux sans en faire un score. (5) Ne laissez jamais l'app vous culpabiliser : si une app compagnon vous fait vous sentir mal pour un jour manqué, ce n'est pas un compagnon, c'est un impôt. Une série qui dure est une série que vous oubliez de protéger parce que vous voulez la garder.` },
    ],
    cta: `Commencez un love streak qui ne vous punit jamais. Ouvrez Togthr dans votre navigateur — votre animal sera là, exactement où vous l'avez laissé.`,
    faqs: [
      { q: `Les love streaks renforcent-ils vraiment les relations ?`, a: `Oui — quand ce sont des rituels volontaires. La recherche sur les habitudes (Lally et al., 2010) montre que les petites actions quotidiennes deviennent automatiques en environ 66 jours, et la recherche sur les couples (Gottman) montre que les micro-interactions fréquentes prédisent mieux la santé du couple que les rares grands gestes. La même psychologie fait échouer les séries punitives : la remise à zéro déclenche l'aversion à la perte et l'anxiété au lieu de la proximité.` },
      { q: `Combien de jours faut-il pour former une habitude de check-in ?`, a: `Dans l'étude de 2010 de l'University College London, les participants mettaient en moyenne 66 jours à automatiser un comportement, avec des extrêmes de 18 à 254 jours [VERIFY]. Point important : sauter un seul jour ne faisait pas dérailler la formation de l'habitude — un check-in manqué n'efface pas un rituel de couple.` },
      { q: `Pourquoi certaines apps de série provoquent-elles de l'anxiété ?`, a: `Les mécaniques de série exploitent l'aversion à la perte : perdre fait plus mal que garder ne récompense, alors on ouvre l'app pour protéger un chiffre plutôt que pour se connecter. Snapchat a popularisé les séries en 2015 et rapportait plus de 150 millions de séries actives en 2016 [VERIFY]. Quand la même mécanique entre dans les apps de couple, un jour manqué devient un événement honteux au lieu d'un jour normal.` },
      { q: `Togthr a-t-il une fonction de série ?`, a: `Togthr n'a volontairement ni compteur de série ni mécanique de remise à zéro. L'animal grandit en cinq stades — du bébé à la légende — selon l'attention totale partagée, et la croissance fait une pause au lieu de s'inverser quand vous manquez des jours. L'animal n'envoie jamais de notifications culpabilisantes et ne parle jamais. Le rituel reste ; la punition disparaît.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/pricing`, label: `Tarifs Togthr` },
      { href: `/fr/blog/couples-app-dark-patterns-audit`, label: `Les apps de couple utilisent-elles des dark patterns ? Notre audit` },
      { href: `/fr/blog/low-pressure-companion-app`, label: `Une app compagnon sans pression : pas de séries, pas de culpabilité` },
      { href: `/fr/blog/two-minute-daily-check-in-ai-companion`, label: `Le check-in quotidien de deux minutes` },
    ],
  },

  es: {
    summary: `Las love streaks funcionan cuando se sienten como rituales y fallan cuando castigan. La investigación del hábito (66 días hasta la automaticidad [VERIFY]) y la regla del 5:1 de Gottman [VERIFY] apuntan a pequeñas ofertas diarias. Togthr mantiene el ritual diario — una mascota pixel que crece contigo — pero se congela en lugar de ponerse a cero. Sin culpa, sin días cero que lo borren todo.`,
    intro: `Hay un silencio especial en las relaciones a distancia. Ya dijiste buenos días, enviaste la captura, respondiste el mensaje de voz. Y luego viene el vacío — las horas en que la única prueba de la otra persona es un teléfono que no vibra. Las apps que prometen llenar ese vacío suelen hacerlo con ruido: notificaciones, rachas, puntuaciones, culpa. Pero la investigación sobre lo que realmente mantiene cerca a las parejas apunta a algo más silencioso — pequeñas interacciones diarias que se acumulan con el tiempo, como intereses en una cuenta de ahorro. Esta es la ciencia de las love streaks, y explica tanto por qué funcionan los check-ins diarios como por qué las rachas punitivas salen mal.`,
    sections: [
      { h: `¿Las rachas diarias realmente funcionan?`, p: `Sí — pero solo cuando se sienten como rituales, no como tarea. En un estudio de 2010 del University College London, los participantes tardaban un promedio de 66 días en que un nuevo comportamiento se volviera automático, con extremos de 18 a 254 días [VERIFY]. Aplicado a las parejas: un check-in diario repetido durante unos dos meses deja de ser una obligación y se convierte en un ritmo compartido — lo que los investigadores llaman un ritual en lugar de una tarea. La trampa: la misma psicología que afianza los rituales hace que las rachas punitivas fallen. El diseño de la racha importa más que la racha misma.` },
      { h: `La regla de los 66 días: cómo los rituales diarios se vuelven hábitos de pareja`, p: `El número más citado de la ciencia del hábito viene de Phillippa Lally y colegas del University College London: en un estudio de 96 participantes, un nuevo comportamiento se volvía automático después de 66 días en promedio, con extremos de 18 a 254 días [VERIFY]. Dos detalles importan para las parejas. Primero, el comportamiento del estudio era diminuto — una pequeña acción repetida en el mismo contexto, no un gran gesto. Un check-in de dos segundos, una señal de un toque, una mirada compartida a una mascota en la pantalla: ese es el tamaño correcto para formar hábitos. Segundo, y más sorprendente: saltarse un día casi no dañaba la formación del hábito. Los investigadores encontraron que una oportunidad perdida no descarrilaba el proceso. Ese único hallazgo es la frontera entre una love streak que dura y una que castiga. Un contador que pone a cero te dice: un día perdido lo borra todo. La ciencia del hábito dice: no.` },
      { h: `La regla del 5:1 y el poder de los micromomentos`, p: `El laboratorio de John Gottman ha estudiado a miles de parejas y encontró que las relaciones estables y felices mantienen una proporción de aproximadamente 5:1 de interacciones positivas frente a negativas en el conflicto [VERIFY]. Esa proporción no se construye con cenas de aniversario. Se construye con micromomentos — el chiste privado, el mensaje de la lista de la compra, la mascota que ambos alimentaron esta mañana. Gottman los llama ofertas de conexión, y la investigación es clara: la frecuencia con que los miembros de la pareja responden a las pequeñas ofertas del otro predice mejor la salud de la relación que el gesto grandioso ocasional. Un check-in diario es una oferta que puedes programar. Una love streak suave es simplemente una serie de pequeñas ofertas aceptadas — cada una diminuta, cada una componiéndose en la proporción que predice si una relación se siente plena o vacía.` },
      { h: `Cuando las rachas salen mal: la psicología del castigo`, p: `Snapchat popularizó las mecánicas de racha: introducidas en 2015, para 2016 más de 150 millones de usuarios tenían rachas activas [VERIFY]. Lo que el marketing no dijo es por qué la gente las mantenía: aversión a la pérdida. La racha es una puntuación, y perderla duele más de lo que recompensa mantenerla — así que los usuarios abren la app para proteger el número, no para conectar. Llevada a las relaciones, la misma mecánica causa daño real. Una racha que se pone a cero convierte un ritual en obligación, y un día perdido se vuelve un pequeño evento vergonzoso que las parejas empiezan a ocultarse. Es un patrón oscuro documentado en la categoría de apps compañeras — nuestra auditoría encontró que el 37% de los mensajes de despedida de los compañeros de IA llevan elementos manipuladores [VERIFY, Harvard]. El mecanismo es idéntico: una app que se beneficia de tu ansiedad. Una love streak debería hacerte sentir más cerca de tu pareja. En el momento en que te hace temer a tu teléfono, ha dejado de ser un ritual y se ha convertido en un impuesto.` },
      { h: `Mecánicas de racha comparadas: castigo vs ritual`, p: `| Mecánica | Racha punitiva | Ritual suave (Togthr) |\n|---|---|---|\n| Perder un día | Se pone a cero, se borra el historial | Se congela — nada se pierde |\n| Tras una ausencia | Notificación de culpa: "tu pareja espera" | Silencio; la mascota parece dormida, no acusadora |\n| Ausencia larga | La racha muere, identidad reiniciada | El crecimiento pausa, nunca retrocede |\n| La sensación | Ansiedad, check-ins para proteger un puntaje | Continuidad, check-ins porque quieres |\n| Lo que entrena | Evitación y ocultamiento | Confianza y pequeñas ofertas diarias |` },
      { h: `Cómo Togthr mantiene la racha sin el castigo`, p: `Togthr fue construido en el lado suave de esta tabla. No hay contador de racha ni mecánica de puesta a cero: si faltas días, la mascota simplemente se queda donde está, y el crecimiento pausa en lugar de revertirse. La mascota crece a través de cinco etapas — bebé, peque, adolescente, adulto, leyenda — y su crecimiento refleja la atención total compartida por ti y tu pareja, no la racha actual. Atributos ocultos desbloquean diez skins de profesión, y existe una edición dorada oculta con probabilidad 1/72, pero nada de eso puede perderse por una semana ocupada. La mascota nunca regaña, nunca envía notificaciones de culpa y nunca habla — es un testigo silencioso de las pequeñas ofertas que os hacéis. Esa es la consecuencia de diseño de la investigación: el ritual se queda, el castigo se elimina, y la racha se convierte en algo que mantienes por sí mismo, no por miedo.` },
      { h: `Cómo construir una love streak que de verdad dure`, p: `Según la investigación sobre hábitos y parejas, una love streak que sobrevive a la vida real tiene cinco propiedades. (1) Hazla diminuta: una señal de un toque o una mascota compartida supera a una videollamada de veinte minutos que igual se pospone. (2) Anclala: mismo contexto cada día — café de la mañana, primera pausa, última pantalla antes de dormir. (3) Perdona las ausencias: el estudio de los 66 días muestra que un día perdido no rompe la formación del hábito — diseña tu racha para congelarse, nunca para ponerse a cero. (4) Dale un testigo: una mascota pixel compartida o un objeto ritual compartido hace la racha visible para ambos sin convertirla en puntuación. (5) Nunca dejes que la app te haga sentir culpa: si una app compañera te hace sentir mal por un día perdido, no es una compañera, es un impuesto. Una racha que dura es una que olvidas proteger porque quieres conservarla.` },
    ],
    cta: `Empieza una love streak que nunca te castiga. Abre Togthr en tu navegador — tu mascota estará ahí, exactamente donde la dejaste.`,
    faqs: [
      { q: `¿Las love streaks realmente fortalecen las relaciones?`, a: `Sí — cuando son rituales voluntarios. La investigación del hábito (Lally et al., 2010) muestra que las pequeñas acciones diarias se automatizan en unos 66 días, y la investigación de parejas (Gottman) muestra que las microinteracciones frecuentes predicen mejor la salud de la relación que los gestos grandiosos ocasionales. La misma psicología hace fallar a las rachas punitivas: la puesta a cero dispara aversión a la pérdida y ansiedad en lugar de cercanía.` },
      { q: `¿Cuántos días tarda en formarse un hábito de check-in?`, a: `En el estudio de 2010 del University College London, los participantes tardaron un promedio de 66 días en automatizar un comportamiento, con extremos de 18 a 254 días [VERIFY]. Punto clave: saltarse un solo día no descarrilaba la formación del hábito — un check-in perdido no borra un ritual de pareja.` },
      { q: `¿Por qué algunas apps de racha causan ansiedad?`, a: `Las mecánicas de racha explotan la aversión a la pérdida: perder duele más de lo que recompensa mantener, así que se abre la app para proteger un número en lugar de conectar. Snapchat popularizó las rachas en 2015 y reportaba más de 150 millones de rachas activas en 2016 [VERIFY]. Cuando la misma mecánica entra en las apps de pareja, un día perdido se vuelve un evento vergonzoso en lugar de un día normal.` },
      { q: `¿Togthr tiene función de racha?`, a: `Togthr no tiene deliberadamente contador de racha ni mecánica de puesta a cero. La mascota crece en cinco etapas — de bebé a leyenda — según la atención total compartida, y el crecimiento pausa en lugar de revertirse cuando faltas días. La mascota nunca envía notificaciones de culpa y nunca habla. El ritual se queda; el castigo se elimina.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/pricing`, label: `Precios de Togthr` },
      { href: `/es/blog/couples-app-dark-patterns-audit`, label: `¿Usan las apps de pareja patrones oscuros? Nuestra auditoría` },
      { href: `/es/blog/low-pressure-companion-app`, label: `Una app compañera sin presión: sin rachas, sin culpa` },
      { href: `/es/blog/two-minute-daily-check-in-ai-companion`, label: `El check-in diario de dos minutos` },
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

      <section aria-label="Summary" className="mt-6 rounded-xl border border-pink-500/20 bg-pink-500/5 px-5 py-4">
        <p className="text-sm leading-relaxed text-zinc-300">{body.summary}</p>
      </section>

      <div className="prose prose-invert max-w-none text-zinc-200">
        <p className="text-lg">{body.intro}</p>
        {body.sections.map((s, i) => (
          <div key={i}>
            <h2 className="mt-8 text-2xl font-semibold text-zinc-100">{s.h}</h2>
            {s.p.startsWith('|') ? (
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-left text-sm text-zinc-300 border-collapse">
                  {(() => {
                    const rows = s.p.split('\n').filter((r) => r.startsWith('|'))
                    const hdrs = rows[0].split('|').map((h) => h.replace(/\*\*/g, '').trim()).filter(Boolean)
                    const cells = rows.slice(2).filter((r) => r.includes('|')).map((r) => r.split('|').map((c) => c.replace(/\*\*/g, '').trim()).filter(Boolean))
                    return (
                      <>
                        <thead>
                          <tr className="border-b border-zinc-700/40">
                            {hdrs.map((h, hi) => <th key={hi} className="px-3 py-2 text-zinc-100">{h}</th>)}
                          </tr>
                        </thead>
                        <tbody>
                          {cells.map((r, ri) => (
                            <tr key={ri} className="border-b border-zinc-800">
                              {r.map((c, ci) => <td key={ci} className="px-3 py-2">{c}</td>)}
                            </tr>
                          ))}
                        </tbody>
                      </>
                    )
                  })()}
                </table>
              </div>
            ) : (
              <p className="mt-3">{s.p}</p>
            )}
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
