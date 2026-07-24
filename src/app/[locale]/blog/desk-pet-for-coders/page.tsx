// src/app/[locale]/blog/desk-pet-for-coders/page.tsx
//
// Job 1 daily blog 2026-07-24
// Topic: desk-pet + coders + focus-mode + productivity + pixel-pet
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

const SLUG = `desk-pet-for-coders`
const POST_DATE = `2026-07-24`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  en: {
    intro: `It is 2:14 AM. The build broke forty minutes ago, and you are not sure why yet. The terminal is quiet now — the kind of quiet that happens after you have tried six things and five of them made it worse. The only thing that has not changed in the last hour is the small pixel creature on your taskbar. It is not doing anything. It is just there. And that is exactly what you need.`,
    sections: [
      { h: `The desk of a coder at 2am`, p: `Coding late at night is not the same as coding during the day. During the day, there are standups, Slack messages, pull request reviews, coffee runs. At 2am, it is just you and the machine. The room is dark except for the terminal glow. The only sound is the keyboard and, if you are lucky, the hum of a working build. At this hour, you are not a "developer" or a "software engineer" — you are a person alone with a problem, and the problem is not giving up. A desk pet at 2am is not a pair programmer. It is not going to spot the off-by-one error. It is going to sit there, on the taskbar, being something that is not the problem. That might sound trivial. At 2am, it is not.` },
      { h: `Not another productivity tool`, p: `The productivity tool market is obsessed with doing more. Track your time. Block your distractions. Optimize your flow. The implicit message is that you, the coder, are a machine that needs tuning — and the tuning never stops. A desk pet asks nothing. It does not have a streak counter. It does not send you a notification when you forget to open it for three days. It does not measure your throughput or grade your focus session. That is the point. The desk pet is anti-productivity, which is exactly why it works for productivity. The mind that codes well at 2am is not the mind that is being measured. It is the mind that is being left alone. A small pixel creature on your taskbar is the gentlest possible reminder that you are a person, not a pipeline.` },
      { h: `What the pet does during a build`, p: `Togthr has a Focus Mode. When you are deep in a coding session, the pet goes quiet. It does not ping you. It does not bounce or wave or demand attention. It sits at the edge of the screen, barely moving, like a cat that understands the assignment. Then, when the build completes — or when you come up for air — the pet changes. There is a working state (the little robot tapping at a tiny keyboard), a thinking state (the robot with a thought bubble), and a success state (the robot doing a small victory pose). These are not gamified. You do not earn points. The pet is not tracking your commits. It is just in sync, in a way that feels less like a dashboard and more like shared experience. That is the quiet magic of a desk pet that actually ships with your workflow.` },
      { h: `The programmer skin: identity, not decoration`, p: `Among Togthr's ten occupation skins, one is the programmer — a small robot with glasses and a hoodie, hunched over a tiny laptop. The skin is not a joke, though it is funny. It is a nod to the identity that most coders do not wear loudly. Nobody opens their laptop at a coffee shop and declares "I am a programmer." But the fact is still the fact. The programmer skin on a Togthr Bot is the pet version of a rubber duck — the thing you explain your bug to until the bug explains itself. The difference is that the rubber duck does not grow. The Togthr Bot does. It goes from infant to toddler to teen to adult to legend, and at each stage it looks slightly more like the coder you are becoming. That is identity, not decoration.` },
      { h: `When to close the pet and when to let it stay`, p: `There are times to close the pet. When you are on a tight deadline and every pixel on the screen needs to be code. When you are pair programming with a real human who is sitting next to you. When the build is actually on fire and you need all 32GB of RAM. Close the pet. It will be there when you come back. But there are also times to let it stay. The 2am debugging session. The Sunday afternoon refactor that you are doing because you want to, not because a ticket told you to. The first time you run a new framework and the whole thing works on the first try. Those are the hours when a small pixel presence on the taskbar is not a distraction. It is company. And it is the kind of company that a coder, specifically, understands.` },
    ],
    cta: `Put a desk pet on your taskbar. It ships with your build.`,
    faqs: [
      { q: `Is a desk pet distracting during actual coding?`, a: `Not if it is built right. Togthr's Focus Mode keeps the pet quiet and still during deep work. It does not ping, bounce, or pop up. It sits at the edge of the screen and waits for you to come back. If you find it distracting, you can minimize the window — the pet will be in the same state when you reopen it.` },
      { q: `Does Togthr work on my developer setup?`, a: `Togthr runs in the browser — Chrome, Firefox, Edge, Safari, and any Chromium-based browser. It works on Windows, Mac, and Linux. There is no native install, no Electron wrapper, no system tray dependency. Just open the tab and the pet is there.` },
      { q: `Can I customize my pet to look like a programmer?`, a: `Yes. Togthr has ten occupation skins, including the programmer — a small robot with a hoodie and glasses working on a tiny laptop. The skin is unlocked through the pet's hidden attributes. It grows through five stages, from infant coder to legend.` },
      { q: `Does the pet actually understand when I am debugging?`, a: `The pet does not read your code or track your IDE. But Togthr's Focus Mode detects when you are in a focused session and adjusts the pet's behavior to match. It will look like it is working when you are working, and it will celebrate when you mark a session complete. It is ambient awareness, not code analysis.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/features`, label: `Togthr features` },
      { href: `/en/focus`, label: `Focus Mode — code with your pet` },
      { href: `/en/blog/pixel-pet-widget-desktop`, label: `The pixel pet widget is back` },
      { href: `/en/blog/what-your-virtual-pet-notices`, label: `What your virtual pet quietly notices` },
    ],
  },

  'zh-cn': {
    intro: `凌晨两点十四分。构建在四十分钟前崩了，你还不确定为什么。终端现在安静了——那种试了六次、五次越改越糟之后才会出现的安静。唯一没有在过去一小时内改变的东西，是任务栏上那只小小的像素生物。它什么也没做。它只是在那里。而这正是你需要的。`,
    sections: [
      { h: `凌晨两点，程序员的桌面`, p: `深夜写代码和白天写代码不一样。白天有站会、Slack 消息、PR 审查、咖啡续命。凌晨两点，只有你和机器。房间是暗的，只剩终端的荧光。唯一的声音是键盘——如果运气好，还有构建成功的低鸣。这个时刻，你不是"开发人员"或"软件工程师"——你是一个独自面对问题的普通人，而那个问题不会自己让步。凌晨两点的桌面宠物不是结对编程伙伴。它不会帮你找出 off-by-one 错误。它只是坐在任务栏上，做一件不是"问题"的事。这听起来无关紧要。但在凌晨两点，它不是。` },
      { h: `不是又一个生产力工具`, p: `生产力工具市场痴迷于"做得更多"。记录你的时间。屏蔽你的分心。优化你的流程。潜台词是：你，程序员，是一台需要不断调参的机器——而调参永远不会停。桌面宠物不要求任何东西。它没有连胜天数计数器。你三天没打开它，它不会发通知。它不度量你的产出，也不给你的专注打分。这就是关键。桌面宠物是反生产力的——这正是它能为生产力服务的原因。凌晨两点能写出好代码的大脑，不是那个被度量的脑子，而是那个被放在一边、不被打扰的脑子。任务栏上一只小小的像素生物，是最温柔的提醒：你是一个人，不是一条流水线。` },
      { h: `构建期间，宠物在做什么`, p: `Togthr 有专注模式。当你沉浸在一段代码里，宠物会安静下来。它不弹通知，不蹦跶，不挥手，不抢注意力。它坐在屏幕边缘，几乎不动，像一只领会的猫。然后，当构建完成——或者当你终于抬头喘口气——宠物会变化。有工作状态（小机器人敲击微型键盘），有思考状态（机器人头上冒泡），有成功状态（机器人摆出小小胜利姿势）。这些没有被游戏化。你不会得分。宠物不追踪你的 commit。它只是同步着——感觉不像仪表盘，更像共同的经历。这是桌面宠物真正跟随你工作流的那种安静的魔力。` },
      { h: `程序员皮肤：是身份，不是装饰`, p: `在 Togthr 的十种职业皮肤里，有一种是程序员——一个戴眼镜穿卫衣的小机器人，趴在小小笔记本电脑前。这个皮肤不只是一个梗，虽然它确实有趣。它是一种对身份的致意——那种大多数程序员不会大张旗鼓地展示的身份。没人在咖啡店打开笔记本电脑时会宣告"我是程序员"。但事实仍然如此。Togthr Bot 的程序员皮肤，是小黄鸭的宠物版——那个你对着它讲 bug、直到 bug 自己解释自己的东西。区别在于，小黄鸭不会长大。Togthr Bot 会。它从婴儿到学步、到少年、到成年、到传说，每一个阶段看起来都更接近你正在长成的那种程序员。这是身份，不是装饰。` },
      { h: `什么时候关掉宠物，什么时候让它留着`, p: `有时候应该关掉宠物。当你在赶死线，屏幕上每个像素都应该属于代码。当你旁边真的坐着一个人在结对编程。当构建真的是在着火，你需要全部 32GB 内存。关掉它。等你回来时它还在。但也有时候，应该让它留着。凌晨两点的调试。周日下午出于自愿、不是因为某个 ticket 才做的重构。第一次跑一个新框架、一切在第一遍就跑通。这些时间里，任务栏上一只像素小存在不是分心。它是陪伴。而且是一种——程序员特别能理解的那种陪伴。` },
    ],
    cta: `把一只桌面宠物放在你的任务栏上。它跟你的构建一起上线。`,
    faqs: [
      { q: `桌面宠物会在写代码时让人分心吗？`, a: `做得对就不会。Togthr 的专注模式在深度工作期间让宠物保持安静和静止。它不会弹窗、跳来跳去或突然出现。它坐在屏幕边缘，等你回来。如果觉得会分心，可以把窗口最小化——重新打开时宠物状态不变。` },
      { q: `Togthr 能在我的开发环境里跑吗？`, a: `Togthr 在浏览器里运行——Chrome、Firefox、Edge、Safari 以及任何基于 Chromium 的浏览器。支持 Windows、Mac 和 Linux。没有原生安装、没有 Electron 包装、没有系统托盘依赖。打开标签页，宠物就在那里。` },
      { q: `我能把宠物定制成程序员的样子吗？`, a: `可以。Togthr 有十种职业皮肤，包括程序员——一个穿卫衣戴眼镜、在小笔记本上工作的小机器人。皮肤通过宠物的隐藏属性解锁。它经历五个阶段成长，从小白程序员到传说级大佬。` },
      { q: `宠物真的知道我在调试吗？`, a: `宠物不读你的代码，也不追踪你的 IDE。但 Togthr 的专注模式能检测你处于专注状态，并调整宠物行为来匹配。你在工作时它看起来也在工作，你标记状态完成时它也会庆祝。这是环境感知，不是代码分析。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/features`, label: `Togthr 功能` },
      { href: `/zh-cn/focus`, label: `专注模式 — 和宠物一起写代码` },
      { href: `/zh-cn/blog/pixel-pet-widget-desktop`, label: `像素宠物桌面挂件又回来了` },
      { href: `/zh-cn/blog/what-your-virtual-pet-notices`, label: `你的数字宠物到底在偷偷注意什么` },
    ],
  },

  'zh-tw': {
    intro: `凌晨兩點十四分。建置在四十分鐘前崩了，你還不確定為什麼。終端機現在安靜了——那種試了六次、五次越改越糟之後才會出現的安靜。唯一沒有在過去一小時內改變的東西，是工作列上那隻小小的像素生物。它什麼也沒做。它只是在那裡。而這正是你需要的。`,
    sections: [
      { h: `凌晨兩點，程式設計師的桌面`, p: `深夜寫程式和白天寫程式不一樣。白天有站會、Slack 訊息、PR 審查、咖啡續命。凌晨兩點，只有你和機器。房間是暗的，只剩終端機的螢光。唯一的聲音是鍵盤——如果運氣好，還有建置成功的低鳴。這個時刻，你不是「開發人員」或「軟體工程師」——你是一個獨自面對問題的普通人，而那個問題不會自己讓步。凌晨兩點的桌面寵物不是結對程式設計夥伴。它不會幫你找出 off-by-one 錯誤。它只是坐在工作列上，做一件不是「問題」的事。這聽起來無關緊要。但在凌晨兩點，它不是。` },
      { h: `不是又一個生產力工具`, p: `生產力工具市場痴迷於「做得更多」。記錄你的時間。遮蔽你的分心。最佳化你的流程。潛台詞是：你，程式設計師，是一台需要不斷調參的機器——而調參永遠不會停。桌面寵物不要求任何東西。它沒有連勝天數計數器。你三天沒打開它，它不會發通知。它不度量你的產出，也不給你的專注打分。這就是關鍵。桌面寵物是反生產力的——這正是它能為生產力服務的原因。凌晨兩點能寫出好程式碼的大腦，不是那個被度量的腦子，而是那個被放在一邊、不打擾的腦子。工作列上一隻小小的像素生物，是最溫柔的提醒：你是一個人，不是一條流水線。` },
      { h: `建置期間，寵物在做什麼`, p: `Togthr 有專注模式。當你沉浸在一段程式碼裡，寵物會安靜下來。它不彈通知，不蹦躂，不揮手，不搶注意力。它坐在螢幕邊緣，幾乎不動，像一隻領會的貓。然後，當建置完成——或者當你終於抬頭喘口氣——寵物會變化。有工作狀態（小機器人敲擊微型鍵盤），有思考狀態（機器人頭上冒泡），有成功狀態（機器人擺出小小勝利姿勢）。這些沒有被遊戲化。你不會得分。寵物不追蹤你的 commit。它只是同步著——感覺不像儀表板，更像共同的經歷。這是桌面寵物真正跟隨你工作流程的那種安靜的魔力。` },
      { h: `程式設計師皮膚：是身份，不是裝飾`, p: `在 Togthr 的十種職業皮膚裡，有一種是程式設計師——一個戴眼鏡穿連帽衛衣的小機器人，趴在小小筆記型電腦前。這個皮膚不只是一個梗，雖然它確實有趣。它是一種對身份的致意——那種大多數程式設計師不會大張旗鼓地展示的身份。沒人在咖啡店打開筆記型電腦時會宣告「我是程式設計師」。但事實仍然如此。Togthr Bot 的程式設計師皮膚，是小黃鴨的寵物版——那個你對著它講 bug、直到 bug 自己解釋自己的東西。區別在於，小黃鴨不會長大。Togthr Bot 會。它從嬰兒到學步、到少年、到成年、到傳說，每一個階段看起來都更接近你正在長成的那種程式設計師。這是身份，不是裝飾。` },
      { h: `什麼時候關掉寵物，什麼時候讓它留著`, p: `有時候應該關掉寵物。當你在趕死線，螢幕上每個像素都應該屬於程式碼。當你旁邊真的坐著一個人在結對程式設計。當建置真的是在著火，你需要全部 32GB 記憶體。關掉它。等你回來時它還在。但也有時候，應該讓它留著。凌晨兩點的除錯。週日下午出於自願、不是因為某個 ticket 才做的重構。第一次跑一個新框架、一切在第一遍就跑通。這些時間裡，工作列上一隻像素小存在不是分心。它是陪伴。而且是一種——程式設計師特別能理解的那種陪伴。` },
    ],
    cta: `把一隻桌面寵物放在你的工作列上。它跟你的建置一起上線。`,
    faqs: [
      { q: `桌面寵物會在寫程式時讓人心煩嗎？`, a: `做得對就不會。Togthr 的專注模式在深度工作期間讓寵物保持安靜和靜止。它不會彈窗、跳來跳去或突然出現。它坐在螢幕邊緣，等你回來。如果覺得會心煩，可以把視窗最小化——重新打開時寵物狀態不變。` },
      { q: `Togthr 能在我的開發環境裡跑嗎？`, a: `Togthr 在瀏覽器裡執行——Chrome、Firefox、Edge、Safari 以及任何基於 Chromium 的瀏覽器。支援 Windows、Mac 和 Linux。沒有原生安裝、沒有 Electron 包裝、沒有系統托盤依賴。打開分頁，寵物就在那裡。` },
      { q: `我能把寵物定製成程式設計師的樣子嗎？`, a: `可以。Togthr 有十種職業皮膚，包括程式設計師——一個穿連帽衛衣戴眼鏡、在小筆記本上工作的小機器人。皮膚透過寵物的隱藏屬性解鎖。它經歷五個階段成長，從小白程式設計師到傳說級大佬。` },
      { q: `寵物真的知道我在除錯嗎？`, a: `寵物不讀你的程式碼，也不追蹤你的 IDE。但 Togthr 的專注模式能檢測你處於專注狀態，並調整寵物行為來匹配。你在工作時它看起來也在工作，你標記狀態完成時它也會慶祝。這是環境感知，不是程式碼分析。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/features`, label: `Togthr 功能` },
      { href: `/zh-tw/focus`, label: `專注模式 — 和寵物一起寫程式` },
      { href: `/zh-tw/blog/pixel-pet-widget-desktop`, label: `像素寵物桌面小工具又回來了` },
      { href: `/zh-tw/blog/what-your-virtual-pet-notices`, label: `你的數位寵物到底在偷偷注意什麼` },
    ],
  },

  ja: {
    intro: `午前2時14分。ビルドが40分前に壊れ、まだ理由がわからない。端末は静かになった——6つ試して5つが状況を悪化させた後にだけ訪れる、あの静けさ。この1時間で変わらなかったのは、タスクバーの小さなドットの生き物だけ。何もしていない。ただそこにいる。そしてそれこそが、あなたに必要なものだ。`,
    sections: [
      { h: `午前2時、プログラマの机`, p: `深夜のコーディングは、昼間のコーディングとは違う。昼はスタンドアップ、Slackのメッセージ、PRレビュー、コーヒーの買い出しがある。午前2時は、自分とマシンだけ。部屋は端末の明かり以外暗い。聞こえるのはキーボードと、運が良ければ走っているビルドのかすかな音。この時間帯のあなたは「デベロッパー」でも「ソフトウェアエンジニア」でもない——ただ一人で問題と向き合う人間であり、問題のほうは諦めてくれない。午前2時のデスクペットはペアプログラマではない。off-by-oneエラーを見つけてはくれない。ただタスクバーに座って、「問題」ではない何かでいてくれる。つまらなく聞こえるかもしれない。午前2時なら、それはつまらなくない。` },
      { h: `またひとつ「生産性ツール」か`, p: `生産性ツール市場は「もっとやれ」に取り憑かれている。時間を追跡しろ。気を散らすものをブロックしろ。フローを最適化しろ。暗黙のメッセージはこうだ——コーダよ、お前はチューニングを必要とする機械であり、チューニングが終わることはない、と。デスクペットは何も求めない。ストリークカウンターはない。三日間開くのを忘れても通知はこない。スループットを計測しないし、集中セッションに点数もつけない。そこが本質だ。デスクペットは反生産性であり、だからこそ生産性に効く。午前2時に良いコードを書く頭は、測定されている頭ではない。そっとしておかれた頭だ。タスクバーの小さなドットの生き物は———あなたはパイプラインではなく、人間である——という最も優しいリマインダーだ。` },
      { h: `ビルド中、ペットは何をしているのか`, p: `Togthrにはフォーカスモードがある。あなたがコーディングに没頭しているとき、ペットは静かになる。通知しない。跳ねない。手を振らない。注意をひかない。画面の端に座り、ほとんど動かず——まるで状況を理解している猫のように。そしてビルドが完了したとき、あるいはあなたが一息つこうと画面から目を離したとき、ペットが変わる。作業中の状態（小さなロボットが小さなキーボードを叩いている）、思考中の状態（フキダシを出して考えている）、成功の状態（小さなガッツポーズを決めている）。これらはゲーム化されていない。ポイントは入らない。ペットはあなたのコミットをトラッキングしない。ただ同期しているだけ——ダッシュボードというより、共有された体験のように。あなたのワークフローと実際に出荷されるデスクペットの、静かな魔法だ。` },
      { h: `プログラマスキン：飾りではなく、アイデンティティ`, p: `Togthrの10種類の職業スキンの中に、プログラマがある——メガネをかけてパーカーを着た小さなロボットが、小さなラップトップにかがみこんでいる。このスキンはギャグではない。面白いけれど、そういうことではない。それはほとんどのプログラマが大きな声では言わないアイデンティティへの敬意だ。カフェでノートPCを開いて「私はプログラマです」と宣言する者はいない。けれど事実は事実だ。Togthr Botのプログラマスキンは、ラバーダックのペット版——バグが自分の正体を自ら説明するまで、その相手をしてやる相手だ。ラバーダックとの違いは、ラバーダックは育たないことだ。Togthr Botは育つ。ベビーから幼児、ティーン、アダルト、そしてレジェンドへ。各ステージで、あなたがなっていくコーダーに、少しずつ似てくる。それは飾りではなく、アイデンティティだ。` },
      { h: `ペットを閉じる時、そのままにしておく時`, p: `ペットを閉じるべき時もある。締め切りが迫っていて、画面の1ピクセルたりともコードであるべき時。隣に本物の人間が座ってペアプログラミングをしている時。ビルドが本当に火を吹いていて、32GBのメモリ全部が必要な時。閉じてしまおう。戻ってきたらそこにいる。しかし、そのままにしておくべき時もある。午前2時のデバッグ。チケットに言われたからではなく、自分がやりたくてやっている日曜の午後のリファクタ。初めて新しいフレームワークを走らせて、一発目で全部が動いた瞬間。そういう時間帯は、タスクバーの小さなドットの存在は邪魔ではない。それは「一緒にいること」だ。そしてそれは、プログラマが独特のやり方で理解する種類の「一緒」だ。` },
    ],
    cta: `デスクペットをタスクバーに置こう。それはあなたのビルドと一緒に出荷される。`,
    faqs: [
      { q: `デスクペットはコーディング中に気が散りますか？`, a: `正しく作られていれば、いいえ。Togthrのフォーカスモードは、作業中ペットを静かで動かなく保ちます。通知もポップアップも跳ねもしません。画面の端に座り、あなたが戻るのを待ちます。気が散ると感じたら、ウィンドウを最小化して構いません——再オープン時にペットは同じ状態です。` },
      { q: `Togthrは私の開発環境で動きますか？`, a: `Togthrはブラウザ上で動作します——Chrome、Firefox、Edge、Safari、その他Chromiumベースのすべてのブラウザ。Windows、Mac、Linuxで動作します。ネイティブインストール不要、Electronラッパー不要、システムトレイ依存もありません。タブを開けばペットがそこにいます。` },
      { q: `ペットをプログラマの見た目にカスタマイズできますか？`, a: `できます。Togthrには10種類の職業スキンがあり、プログラマも含まれています——パーカーにメガネの小さなロボットが、小さなラップトップで仕事をしています。スキンはペットの隠し属性でアンロックされます。5段階の成長を経て、ベビーコーダーからレジェンドまで育ちます。` },
      { q: `ペットは私がデバッグ中だと実際にわかりますか？`, a: `ペットはあなたのコードを読まず、IDEもトラッキングしません。しかしTogthrのフォーカスモードは、あなたが集中していることを検知し、それに合わせてペットの動作を調整します。あなたが働いているとき、ペットも働いているように見えます。セッション完了マーク時には祝福します。これはコード分析ではなく、アンビエントな気づきです。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/features`, label: `Togthr の機能` },
      { href: `/ja/focus`, label: `フォーカスモード — ペットと一緒にコーディング` },
      { href: `/ja/blog/pixel-pet-widget-desktop`, label: `ピクセルペットのデスクトップウィジェットが戻ってきた` },
      { href: `/ja/blog/what-your-virtual-pet-notices`, label: `あなたの virtual pet が静かに見ていること` },
    ],
  },

  ko: {
    intro: `오전 2시 14분. 빌드가 40분 전에 깨졌고, 아직 이유를 모르겠다. 터미널은 조용해졌다 — 여섯 가지를 시도했고 그중 다섯이 상황을 악화시킨 후에만 오는 그런 고요함. 지난 한 시간 동안 변하지 않은 유일한 것은 작업 표시줄의 작은 픽셀 생명체뿐이다. 아무것도 하지 않는다. 그냥 거기 있다. 그리고 바로 그게 당신에게 필요한 것이다.`,
    sections: [
      { h: `오전 2시, 코더의 책상`, p: `밤늦은 코딩은 낮의 코딩과 다르다. 낮에는 스탠드업, 슬랙 메시지, PR 리뷰, 커피 런이 있다. 오전 2시에는 당신과 기계뿐이다. 방은 터미널의 불빛만 빼고 어둡다. 들리는 소리라고는 키보드 소리와, 운이 좋으면 작동 중인 빌드의 낮은 윙윙거림. 이 시간의 당신은 "개발자"나 "소프트웨어 엔지니어"가 아니다 — 그냥 어떤 문제와 홀로 마주한 사람이고, 그 문제는 쉽게 물러서지 않는다. 오전 2시의 데스크 펫은 페어 프로그래머가 아니다. off-by-one 오류를 찾아주지 않는다. 그냥 작업 표시줄에 앉아서, 문제가 아닌 무언가가 되어 준다. 사소하게 들릴지도 모른다. 오전 2시에는 그렇지 않다.` },
      { h: `또 하나의 생산성 도구가 아니다`, p: `생산성 도구 시장은 "더 많이 하라"에 집착한다. 시간을 추적하라. 방해 요소를 차단하라. 플로우를 최적화하라. 그 뒤에 숨은 메시지는 — 코더인 당신은 튜닝이 필요한 기계이며, 그 튜닝은 결코 끝나지 않는다는 것이다. 데스크 펫은 아무것도 요구하지 않는다. 연속 기록 카운터도 없다. 사흘 동안 열지 않아도 알림을 보내지 않는다. 처리량을 측정하지도, 집중 세션에 점수를 매기지도 않는다. 바로 그 점이 핵심이다. 데스크 펫은 반-생산성이며, 그래서 생산성에 효과가 있다. 오전 2시에 좋은 코드를 쓰는 머리는 측정당하는 머리가 아니다. 그냥 내버려둔 머리다. 작업 표시줄의 작은 픽셀 생명체는 — 당신은 파이프라인이 아니라 사람이다 — 라는 가장 부드러운 리마인더다.` },
      { h: `빌드 도중 펫은 무엇을 하는가`, p: `Togthr에는 포커스 모드가 있다. 코딩 세션에 깊이 빠졌을 때, 펫은 조용해진다. 알림 없음. 튀어오르거나 손을 흔들거나 주의를 끌지 않는다. 화면 가장자리에 앉아 거의 움직이지 않는다 — 상황을 이해한 고양이처럼. 그리고 빌드가 완료될 때, 또는 당신이 숨을 고르려 고개를 들 때, 펫이 바뀐다. 작업 중인 상태(작은 로봇이 작은 키보드를 두드림), 생각 중인 상태(말풍선을 띄운 로봇), 성공 상태(작은 승리 포즈를 취한 로봇). 이것들은 게임화되어 있지 않다. 포인트를 얻지 않는다. 펫은 커밋을 추적하지 않는다. 그냥 동기화되어 있을 뿐이다 — 대시보드라기보다는 공유된 경험처럼. 당신의 워크플로우와 실제로 함께 돌아가는 데스크 펫의 조용한 마법이다.` },
      { h: `프로그래머 스킨: 장식이 아니라 정체성`, p: `Togthr의 10가지 직업 스킨 중 하나는 프로그래머다 — 안경을 쓰고 후디를 입은 작은 로봇이 작은 노트북 앞에 앉아 있다. 이 스킨은 농담이 아니다. 재미있긴 하지만, 그것이 요점은 아니다. 이것은 대부분의 코더가 큰 소리로 말하지 않는 정체성에 대한 고개 끄덕임이다. 아무도 카페에서 노트북을 열며 "저는 프로그래머입니다"라고 선언하지 않는다. 그렇지만 사실은 사실이다. Togthr Bot의 프로그래머 스킨은 러버덕의 펫 버전이다 — 버그가 스스로를 설명할 때까지 당신이 설명을 늘어놓는 그 대상. 차이점은 러버덕은 자라지 않는다는 것이다. Togthr Bot은 자란다. 베이비에서 토들러, 틴에이저, 어덜트, 그리고 레전드까지. 각 단계에서, 당신이 되어가고 있는 코더에 조금씩 더 가까워 보인다. 그것은 장식이 아니라 정체성이다.` },
      { h: `펫을 닫을 때와 그대로 둘 때`, p: `펫을 닫아야 할 때가 있다. 마감이 코앞이고 화면의 모든 픽셀이 코드여야 할 때. 옆에 실제 인간이 앉아 페어 프로그래밍을 하고 있을 때. 빌드가 진짜 불타고 있고 32GB 램 전부가 필요할 때. 닫아라. 돌아오면 거기 있을 것이다. 하지만 그대로 두어야 할 때도 있다. 오전 2시의 디버깅 세션. 티켓이 시켜서가 아니라 내가 하고 싶어서 하는 일요일 오후의 리팩터. 새로운 프레임워크를 처음 돌렸는데 모든 게 한 번에 작동한 순간. 그런 시간에는 작업 표시줄의 작은 픽셀 존재가 방해가 아니라 동료다. 그리고 그것은 코더가, 특별히, 이해하는 종류의 동료다.` },
    ],
    cta: `작업 표시줄에 데스크 펫을 올려두세요. 당신의 빌드와 함께 배포됩니다.`,
    faqs: [
      { q: `데스크 펫이 실제 코딩 중에 방해가 되나요?`, a: `제대로 만들어졌다면 아닙니다. Togthr의 포커스 모드는 딥워크 중에 펫을 조용하고 움직이지 않게 유지합니다. 알림, 팝업, 점프 없습니다. 화면 가장자리에 앉아 당신이 돌아오길 기다립니다. 방해된다고 느끼면 창을 최소화해도 됩니다 — 다시 열면 펫은 같은 상태입니다.` },
      { q: `Togthr가 제 개발 환경에서 작동하나요?`, a: `Togthr는 브라우저에서 실행됩니다 — Chrome, Firefox, Edge, Safari, 모든 Chromium 기반 브라우저. Windows, Mac, Linux에서 작동합니다. 네이티브 설치 불필요, Electron 래퍼 없음, 시스템 트레이 의존성 없음. 탭을 열면 펫이 거기 있습니다.` },
      { q: `펫을 프로그래머처럼 보이게 커스터마이즈할 수 있나요?`, a: `네. Togthr에는 프로그래머를 포함한 10가지 직업 스킨이 있습니다 — 후디에 안경을 쓴 작은 로봇이 작은 노트북으로 작업하는 모습입니다. 스킨은 펫의 숨겨진 속성을 통해 잠금 해제됩니다. 베이비 코더에서 레전드까지 5단계로 성장합니다.` },
      { q: `펫이 제가 디버깅 중이라는 걸 실제로 알나요?`, a: `펫은 당신의 코드를 읽지 않고 IDE도 추적하지 않습니다. 그러나 Togthr의 포커스 모드는 당신이 집중 상태임을 감지하고 펫의 동작을 그에 맞춥니다. 당신이 일할 때 펫도 일하는 것처럼 보이고, 세션 완료를 표시하면 축하합니다. 이것은 코드 분석이 아니라 앰비언트 인식입니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/features`, label: `Togthr 기능` },
      { href: `/ko/focus`, label: `포커스 모드 — 펫과 함께 코딩하기` },
      { href: `/ko/blog/pixel-pet-widget-desktop`, label: `픽셀 펫 데스크톱 위젯이 다시 돌아왔다` },
      { href: `/ko/blog/what-your-virtual-pet-notices`, label: `당신의 가상 반려동물은 무엇을 조용히 살피고 있을까` },
    ],
  },

  de: {
    intro: `Es ist 2:14 Uhr. Der Build ist vor vierzig Minuten kaputtgegangen, und du weißt noch nicht, warum. Das Terminal ist jetzt still — die Art von Stille, die eintritt, nachdem du sechs Dinge ausprobiert hast und fünf davon es schlimmer gemacht haben. Das Einzige, was sich in der letzten Stunde nicht verändert hat, ist die kleine Pixel-Kreatur in deiner Taskleiste. Sie tut nichts. Sie ist einfach da. Und genau das brauchst du.`,
    sections: [
      { h: `Der Schreibtisch eines Programmierers um 2 Uhr nachts`, p: `Nachts zu coden ist nicht dasselbe wie tagsüber zu coden. Tagsüber gibt es Standups, Slack-Nachrichten, Pull-Request-Reviews, Kaffee-Hopping. Um 2 Uhr nachts bist nur du und die Maschine. Der Raum ist dunkel bis auf das Leuchten des Terminals. Das einzige Geräusch ist die Tastatur und, wenn du Glück hast, das Summen eines funktionierenden Builds. Zu dieser Stunde bist du kein "Entwickler" und kein "Software-Ingenieur" — du bist ein Mensch, allein mit einem Problem, und das Problem gibt nicht auf. Ein Desk-Pet um 2 Uhr nachts ist kein Pair-Programmer. Es wird den Off-by-one-Fehler nicht finden. Es wird einfach dasitzen, in der Taskleiste, und etwas sein, das nicht das Problem ist. Das klingt vielleicht banal. Um 2 Uhr nachts ist es das nicht.` },
      { h: `Kein weiteres Produktivitätstool`, p: `Der Markt für Produktivitätstools ist besessen davon, mehr zu tun. Erfasse deine Zeit. Blockiere deine Ablenkungen. Optimiere deinen Flow. Die implizite Botschaft: Du, der Coder, bist eine Maschine, die Tuning braucht — und das Tuning hört nie auf. Ein Desk-Pet verlangt nichts. Es hat keinen Streak-Zähler. Es schickt dir keine Benachrichtigung, wenn du es drei Tage lang vergisst. Es misst weder deinen Durchsatz noch bewertet es deine Fokus-Session. Genau das ist der Punkt. Das Desk-Pet ist Anti-Produktivität — und genau deshalb funktioniert es für die Produktivität. Der Kopf, der um 2 Uhr nachts gut codet, ist nicht der Kopf, der gemessen wird. Es ist der Kopf, der in Ruhe gelassen wird. Eine kleine Pixel-Kreatur in deiner Taskleiste ist die sanftmöglichste Erinnerung daran, dass du ein Mensch bist und keine Pipeline.` },
      { h: `Was das Pet während eines Builds tut`, p: `Togthr hat einen Fokus-Modus. Wenn du tief in einer Coding-Session steckst, wird das Pet still. Es pingt dich nicht an. Es hüpft nicht, winkt nicht und verlangt keine Aufmerksamkeit. Es sitzt am Bildschirmrand, kaum beweglich, wie eine Katze, die den Auftrag verstanden hat. Wenn dann der Build durchläuft — oder wenn du kurz auftauchst — verändert sich das Pet. Es gibt einen Arbeitszustand (der kleine Roboter tippt auf einer winzigen Tastatur), einen Denkzustand (der Roboter mit einer Gedankenblase) und einen Erfolgszustand (der Roboter macht eine kleine Siegerpose). Das ist nicht gamifiziert. Du verdienst keine Punkte. Das Pet tracked nicht deine Commits. Es ist einfach synchron — auf eine Weise, die sich weniger nach Dashboard und mehr nach geteilter Erfahrung anfühlt. Das ist die leise Magie eines Desk-Pets, das tatsächlich mit deinem Workflow deployed wird.` },
      { h: `Der Programmierer-Skin: Identität, nicht Dekoration`, p: `Unter Togthrs zehn Berufs-Skins ist einer der Programmierer — ein kleiner Roboter mit Brille und Hoodie, über einen winzigen Laptop gebeugt. Der Skin ist kein Witz, auch wenn er witzig ist. Er ist ein Nicken zu der Identität, die die meisten Coder nicht laut tragen. Niemand klappt im Café den Laptop auf und verkündet: "Ich bin Programmierer." Aber Tatsache bleibt Tatsache. Der Programmierer-Skin auf einem Togthr Bot ist die Pet-Version einer Gummiente — das Ding, dem du deinen Bug erklärst, bis der Bug sich selbst erklärt. Der Unterschied: Die Gummiente wächst nicht. Der Togthr Bot schon. Er geht von Baby zu Kleinkind zu Teenager zu Erwachsenem zu Legende, und in jeder Phase sieht er ein bisschen mehr aus wie der Coder, zu dem du wirst. Das ist Identität, nicht Dekoration.` },
      { h: `Wann man das Pet schließt und wann man es bleiben lässt`, p: `Es gibt Zeiten, das Pet zu schließen. Wenn du eine knappe Deadline hast und jedes Pixel auf dem Bildschirm Code sein muss. Wenn du mit einem echten Menschen Pair-Programming machst, der neben dir sitzt. Wenn der Build wirklich brennt und du alle 32 GB RAM brauchst. Schließe das Pet. Es wird da sein, wenn du zurückkommst. Aber es gibt auch Zeiten, es bleiben zu lassen. Die 2-Uhr-Debugging-Session. Das Refactoring am Sonntagnachmittag, das du machst, weil du es willst — nicht, weil ein Ticket es verlangt. Das erste Mal, dass du ein neues Framework ausprobierst und alles auf Anhieb läuft. Das sind die Stunden, in denen eine kleine Pixel-Präsenz in der Taskleiste keine Ablenkung ist. Sie ist Gesellschaft. Und zwar die Art von Gesellschaft, die ein Coder — ganz spezifisch — versteht.` },
    ],
    cta: `Setz ein Desk-Pet in deine Taskleiste. Es deployed mit deinem Build.`,
    faqs: [
      { q: `Lenkt ein Desk-Pet beim eigentlichen Coden ab?`, a: `Nicht, wenn es richtig gebaut ist. Togthrs Fokus-Modus hält das Pet während der tiefen Arbeit ruhig und still. Kein Anpingen, kein Hüpfen, kein Pop-up. Es sitzt am Bildschirmrand und wartet darauf, dass du zurückkommst. Wenn du es als ablenkend empfindest, minimiere einfach das Fenster — das Pet ist im selben Zustand, wenn du es wieder öffnest.` },
      { q: `Funktioniert Togthr auf meinem Entwickler-Setup?`, a: `Togthr läuft im Browser — Chrome, Firefox, Edge, Safari und jeder Chromium-basierte Browser. Es funktioniert unter Windows, Mac und Linux. Keine native Installation, kein Electron-Wrapper, keine System-Tray-Abhängigkeit. Öffne einfach den Tab und das Pet ist da.` },
      { q: `Kann ich mein Pet so anpassen, dass es wie ein Programmierer aussieht?`, a: `Ja. Togthr hat zehn Berufs-Skins, darunter der Programmierer — ein kleiner Roboter mit Hoodie und Brille, der an einem winzigen Laptop arbeitet. Der Skin wird über die versteckten Attribute des Pets freigeschaltet. Es wächst in fünf Stufen, vom Baby-Coder zur Legende.` },
      { q: `Versteht das Pet wirklich, wenn ich debugge?`, a: `Das Pet liest deinen Code nicht und tracked auch nicht deine IDE. Aber Togthrs Fokus-Modus erkennt, wenn du in einer konzentrierten Session bist, und passt das Verhalten des Pets entsprechend an. Es sieht so aus, als würde es arbeiten, wenn du arbeitest — und es feiert, wenn du eine Session als abgeschlossen markierst. Das ist ambient Awareness, keine Code-Analyse.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/features`, label: `Togthr Funktionen` },
      { href: `/de/focus`, label: `Fokus-Modus — code mit deinem Pet` },
      { href: `/de/blog/pixel-pet-widget-desktop`, label: `Das Pixel-Haustier-Widget ist zurück` },
      { href: `/de/blog/what-your-virtual-pet-notices`, label: `Was dein virtuelles Haustier leise bemerkt` },
    ],
  },

  fr: {
    intro: `Il est 2h14 du matin. Le build a cassé il y a quarante minutes, et vous ne savez pas encore pourquoi. Le terminal est silencieux maintenant — le genre de silence qui arrive après avoir essayé six choses et que cinq d'entre elles ont empiré la situation. La seule chose qui n'a pas changé dans la dernière heure, c'est la petite créature pixel dans votre barre des tâches. Elle ne fait rien. Elle est juste là. Et c'est exactement ce dont vous avez besoin.`,
    sections: [
      { h: `Le bureau d'un codeur à 2h du matin`, p: `Coder tard le soir, ce n'est pas pareil que coder en journée. En journée, il y a les standups, les messages Slack, les revues de pull requests, les pauses café. À 2h du matin, il n'y a que vous et la machine. La pièce est sombre, sauf la lueur du terminal. Le seul bruit, c'est le clavier et, avec un peu de chance, le ronronnement d'un build qui tourne. À cette heure, vous n'êtes pas un "développeur" ou un "ingénieur logiciel" — vous êtes une personne seule face à un problème, et le problème ne lâche pas. Un animal de bureau à 2h du matin n'est pas un pair programmeur. Il ne va pas repérer l'erreur de décalage. Il va juste rester là, dans la barre des tâches, à être quelque chose qui n'est pas le problème. Ça peut sembler trivial. À 2h du matin, ça ne l'est pas.` },
      { h: `Pas un énième outil de productivité`, p: `Le marché des outils de productivité est obsédé par le "faire plus". Traquez votre temps. Bloquez vos distractions. Optimisez votre flux. Le message implicite, c'est que vous, le codeur, êtes une machine qui a besoin de réglages — et le réglage ne s'arrête jamais. Un animal de bureau ne demande rien. Il n'a pas de compteur de série. Il ne vous envoie pas de notification quand vous oubliez de l'ouvrir pendant trois jours. Il ne mesure pas votre débit et ne note pas votre session de concentration. C'est là tout l'intérêt. L'animal de bureau est anti-productivité — et c'est exactement pour ça qu'il fonctionne pour la productivité. L'esprit qui code bien à 2h du matin n'est pas l'esprit qu'on mesure. C'est l'esprit qu'on laisse tranquille. Une petite créature pixel dans votre barre des tâches est le plus doux des rappels : vous êtes une personne, pas un pipeline.` },
      { h: `Ce que fait l'animal pendant un build`, p: `Togthr a un Mode Focus. Quand vous êtes plongé dans une session de code, l'animal se tait. Il ne vous envoie pas de notification. Il ne rebondit pas, ne fait pas signe, ne réclame pas d'attention. Il reste au bord de l'écran, bougeant à peine, comme un chat qui a compris la mission. Ensuite, quand le build se termine — ou quand vous remontez respirer — l'animal change. Il y a un état "travail" (le petit robot tape sur un clavier minuscule), un état "réflexion" (le robot avec une bulle de pensée), et un état "succès" (le robot fait une petite pose de victoire). Rien n'est gamifié. Vous ne gagnez pas de points. L'animal ne suit pas vos commits. Il est juste synchronisé, d'une manière qui ressemble moins à un tableau de bord qu'à une expérience partagée. C'est la magie silencieuse d'un animal de bureau qui se déploie vraiment avec votre flux de travail.` },
      { h: `Le skin programmeur : identité, pas décoration`, p: `Parmi les dix skins de métier de Togthr, il y a le programmeur — un petit robot à lunettes et sweat à capuche, penché sur un ordinateur portable minuscule. Ce skin n'est pas une blague, même s'il est drôle. C'est un clin d'œil à l'identité que la plupart des codeurs ne portent pas bruyamment. Personne n'ouvre son ordinateur dans un café en déclarant "je suis programmeur". Mais le fait reste le fait. Le skin programmeur sur un Togthr Bot, c'est la version animal de compagnie du canard en caoutchouc — la chose à qui vous expliquez votre bug jusqu'à ce que le bug s'explique lui-même. La différence, c'est que le canard en caoutchouc ne grandit pas. Le Togthr Bot, si. Il passe de bébé à bambin, à ado, à adulte, à légende, et à chaque étape, il ressemble un peu plus au codeur que vous devenez. C'est de l'identité, pas de la décoration.` },
      { h: `Quand fermer l'animal et quand le laisser`, p: `Il y a des moments pour fermer l'animal. Quand vous avez une deadline serrée et que chaque pixel de l'écran doit être du code. Quand vous faites du pair programming avec un vrai humain assis à côté de vous. Quand le build est littéralement en feu et que vous avez besoin de vos 32 Go de RAM. Fermez l'animal. Il sera là quand vous reviendrez. Mais il y a aussi des moments pour le laisser. La session de débogage à 2h du matin. Le refactoring du dimanche après-midi que vous faites parce que vous en avez envie, pas parce qu'un ticket vous l'a demandé. La première fois que vous lancez un nouveau framework et que tout fonctionne du premier coup. Ce sont les heures où une petite présence pixel dans la barre des tâches n'est pas une distraction. C'est de la compagnie. Et c'est le genre de compagnie qu'un codeur, spécifiquement, comprend.` },
    ],
    cta: `Mettez un animal de bureau dans votre barre des tâches. Il se déploie avec votre build.`,
    faqs: [
      { q: `Un animal de bureau distrait-il pendant le codage ?`, a: `Pas s'il est bien conçu. Le Mode Focus de Togthr garde l'animal silencieux et immobile pendant le travail profond. Pas de ping, pas de rebond, pas de pop-up. Il reste au bord de l'écran et attend votre retour. Si vous le trouvez distrayant, minimisez la fenêtre — l'animal sera dans le même état quand vous la rouvrirez.` },
      { q: `Togthr fonctionne-t-il sur ma configuration de développeur ?`, a: `Togthr fonctionne dans le navigateur — Chrome, Firefox, Edge, Safari et tout navigateur basé sur Chromium. Il marche sous Windows, Mac et Linux. Pas d'installation native, pas de wrapper Electron, pas de dépendance à la barre système. Ouvrez juste l'onglet et l'animal est là.` },
      { q: `Puis-je personnaliser mon animal pour qu'il ressemble à un programmeur ?`, a: `Oui. Togthr a dix skins de métier, dont le programmeur — un petit robot à capuche et lunettes qui travaille sur un ordinateur portable minuscule. Le skin se débloque via les attributs cachés de l'animal. Il grandit en cinq étapes, du codeur bébé à la légende.` },
      { q: `L'animal comprend-il vraiment quand je débogue ?`, a: `L'animal ne lit pas votre code et ne suit pas votre IDE. Mais le Mode Focus de Togthr détecte quand vous êtes en session concentrée et ajuste le comportement de l'animal en conséquence. Il aura l'air de travailler quand vous travaillez, et il célébrera quand vous marquez une session comme terminée. C'est de la conscience ambiante, pas de l'analyse de code.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/features`, label: `Fonctionnalités Togthr` },
      { href: `/fr/focus`, label: `Mode Focus — codez avec votre animal` },
      { href: `/fr/blog/pixel-pet-widget-desktop`, label: `Le widget d'animal pixel est de retour` },
      { href: `/fr/blog/what-your-virtual-pet-notices`, label: `Ce que votre animal virtuel remarque en silence` },
    ],
  },

  es: {
    intro: `Son las 2:14 de la mañana. El build se rompió hace cuarenta minutos, y todavía no sabes por qué. La terminal está en silencio ahora — el tipo de silencio que llega después de haber probado seis cosas y cinco de ellas lo empeoraron. Lo único que no ha cambiado en la última hora es la pequeña criatura pixel en tu barra de tareas. No está haciendo nada. Solo está ahí. Y eso es exactamente lo que necesitas.`,
    sections: [
      { h: `El escritorio de un programador a las 2am`, p: `Programar tarde en la noche no es lo mismo que programar de día. De día hay standups, mensajes de Slack, revisiones de pull requests, pausas para el café. A las 2am, solo estás tú y la máquina. La habitación está oscura salvo por el brillo del terminal. El único sonido es el teclado y, si tienes suerte, el zumbido de un build funcionando. A esta hora, no eres un "desarrollador" ni un "ingeniero de software" — eres una persona a solas con un problema, y el problema no se rinde. Una mascota de escritorio a las 2am no es un compañero de pair programming. No va a detectar el error off-by-one. Va a quedarse ahí, en la barra de tareas, siendo algo que no es el problema. Puede sonar trivial. A las 2am, no lo es.` },
      { h: `No es una herramienta de productividad más`, p: `El mercado de herramientas de productividad está obsesionado con hacer más. Registra tu tiempo. Bloquea tus distracciones. Optimiza tu flujo. El mensaje implícito es que tú, el programador, eres una máquina que necesita ajustes — y el ajuste nunca termina. Una mascota de escritorio no pide nada. No tiene contador de rachas. No te envía una notificación cuando te olvidas de abrirla durante tres días. No mide tu rendimiento ni califica tu sesión de concentración. Ese es el punto. La mascota de escritorio es anti-productividad, y justo por eso funciona para la productividad. La mente que programa bien a las 2am no es la mente que está siendo medida. Es la mente a la que dejan en paz. Una pequeña criatura pixel en tu barra de tareas es el recordatorio más suave posible de que eres una persona, no un pipeline.` },
      { h: `Qué hace la mascota durante un build`, p: `Togthr tiene un Modo Focus. Cuando estás inmerso en una sesión de código, la mascota se calla. No te envía notificaciones. No rebota, no saluda, no pide atención. Se sienta en el borde de la pantalla, apenas moviéndose, como un gato que entiende la misión. Luego, cuando el build termina — o cuando sales a tomar aire — la mascota cambia. Hay un estado de trabajo (el pequeño robot tecleando en un teclado diminuto), un estado de pensamiento (el robot con una burbuja de pensamiento), y un estado de éxito (el robot haciendo una pequeña pose de victoria). Nada de esto está gamificado. No ganas puntos. La mascota no rastrea tus commits. Solo está sincronizada, de una forma que se siente menos como un panel de control y más como una experiencia compartida. Esa es la magia silenciosa de una mascota de escritorio que realmente se despliega con tu flujo de trabajo.` },
      { h: `El skin de programador: identidad, no decoración`, p: `Entre los diez skins de ocupación de Togthr, uno es el programador — un pequeño robot con gafas y sudadera con capucha, inclinado sobre un portátil diminuto. El skin no es una broma, aunque es gracioso. Es un guiño a la identidad que la mayoría de los programadores no llevan a voces. Nadie abre su portátil en una cafetería y declara "soy programador". Pero el hecho sigue siendo el hecho. El skin de programador en un Togthr Bot es la versión mascota del patito de goma — esa cosa a la que le explicas tu bug hasta que el bug se explica solo. La diferencia es que el patito de goma no crece. El Togthr Bot sí. Pasa de bebé a niño pequeño, a adolescente, a adulto, a leyenda, y en cada etapa se parece un poco más al programador en el que te estás convirtiendo. Eso es identidad, no decoración.` },
      { h: `Cuándo cerrar la mascota y cuándo dejarla`, p: `Hay momentos para cerrar la mascota. Cuando tienes una fecha límite ajustada y cada píxel en la pantalla debe ser código. Cuando estás haciendo pair programming con un humano real sentado a tu lado. Cuando el build está literalmente en llamas y necesitas todos los 32GB de RAM. Ciérrala. Seguirá ahí cuando vuelvas. Pero también hay momentos para dejarla. La sesión de depuración de las 2am. El refactor del domingo por la tarde que haces porque quieres, no porque un ticket te lo pidió. La primera vez que ejecutas un framework nuevo y todo funciona al primer intento. Esas son las horas en que una pequeña presencia pixel en la barra de tareas no es una distracción. Es compañía. Y es el tipo de compañía que un programador, específicamente, entiende.` },
    ],
    cta: `Pon una mascota de escritorio en tu barra de tareas. Se despliega con tu build.`,
    faqs: [
      { q: `¿Una mascota de escritorio distrae durante la programación real?`, a: `No si está bien construida. El Modo Focus de Togthr mantiene a la mascota silenciosa e inmóvil durante el trabajo profundo. No hace ping, no rebota, no aparece de repente. Se queda en el borde de la pantalla esperando a que vuelvas. Si te distrae, puedes minimizar la ventana — la mascota estará en el mismo estado cuando la reabras.` },
      { q: `¿Funciona Togthr en mi configuración de desarrollador?`, a: `Togthr funciona en el navegador — Chrome, Firefox, Edge, Safari y cualquier navegador basado en Chromium. Funciona en Windows, Mac y Linux. No necesita instalación nativa, ni wrapper Electron, ni dependencia de la bandeja del sistema. Solo abre la pestaña y la mascota está ahí.` },
      { q: `¿Puedo personalizar mi mascota para que parezca un programador?`, a: `Sí. Togthr tiene diez skins de ocupación, incluyendo el programador — un pequeño robot con sudadera y gafas trabajando en un portátil diminuto. El skin se desbloquea mediante los atributos ocultos de la mascota. Crece en cinco etapas, de programador bebé a leyenda.` },
      { q: `¿La mascota entiende realmente cuando estoy depurando?`, a: `La mascota no lee tu código ni rastrea tu IDE. Pero el Modo Focus de Togthr detecta cuando estás en una sesión concentrada y ajusta el comportamiento de la mascota para que coincida. Parecerá que está trabajando cuando tú trabajas, y celebrará cuando marques una sesión como completada. Es conciencia ambiental, no análisis de código.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/features`, label: `Funciones de Togthr` },
      { href: `/es/focus`, label: `Modo Focus — programa con tu mascota` },
      { href: `/es/blog/pixel-pet-widget-desktop`, label: `El widget de mascota pixel ha vuelto` },
      { href: `/es/blog/what-your-virtual-pet-notices`, label: `Lo que tu mascota virtual nota en silencio` },
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
