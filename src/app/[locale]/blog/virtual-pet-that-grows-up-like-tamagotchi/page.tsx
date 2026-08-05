// src/app/[locale]/blog/virtual-pet-that-grows-up-like-tamagotchi/page.tsx
//
// Job 1 daily blog 2026-07-26
// Topic: virtual pet that grows up + tamagotchi growth mechanic + 5 stages
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

const SLUG = `virtual-pet-that-grows-up-like-tamagotchi`
const POST_DATE = `2026-07-26`

type Body = {
  intro: string
  sections: { h: string; p: string }[]
  cta: string
  faqs: { q: string; a: string }[]
  links: { href: string; label: string }[]
}

const BODIES: Record<Locale, Body> = {
  en: {
    intro: `You fed it at 7am before school. You cleaned its pixel poop at recess. You watched it grow from a blob into a creature with an actual face, and then — inevitably — you forgot it in your backpack for three days and it died. That was Tamagotchi in 1997. Thirty years later, the virtual pet that grows up is back — not on a keychain this time, but on your desktop browser tab. And the part that was always the most compelling — watching something small become something else — is now the entire point.`,
    sections: [
      { h: `The thing Tamagotchi got right in 1996`, p: `When Bandai launched the Tamagotchi in November 1996, nobody called it a "virtual pet." They called it a "nurturing game," which is a terrible name but a perfect description. The core loop was simple: a creature needs you, you respond, the creature changes. Not because you unlocked an achievement. Not because you hit a streak. Because you showed up. That loop — input, wait, consequence — is older than video games. It is the loop of a plant on a windowsill, of a goldfish in a bowl, of any small living thing you are responsible for. Tamagotchi understood something that most apps in 2026 still do not: growth is the hook. Not points. Not badges. Not leaderboards. Watching a creature become something it was not before, because of you — that is the thing that made 82 million units sell. The keychain is gone. The loop is not.` },
      { h: `Three stages of a keychain pet, and what came after`, p: `The original Tamagotchi had a simple growth path: egg → child → adult. Evolution depended on care quality — feed it well, clean it on time, discipline it when it misbehaved, and you got the "good" adult. Neglect and you got the "bad" one. Death was permanent. That was it. Three stages, a handful of branches, and a reset button. In 2026, a virtual pet that grows up can do more — not just more stages, but more meaning per stage. A stage is not just a new sprite. A stage is a new behaviour. A new way the pet interacts with your day. A new reason to check in. The difference between a 1996 Tamagotchi and a 2026 virtual pet is that the 1996 version grew despite you — it ran on a clock. The 2026 version grows with you — it runs on your relationship.` },
      { h: `Five stages, one pet, and the person who shows up every day`, p: `Togthr Bot has five growth stages: infant, toddler, teen, adult, and legend. At each stage, the pet does not just look different — it behaves different. An infant pet is needy and reacts to every interaction. A toddler pet has learned a small set of habits. A teen pet has moods. An adult pet has a settled personality shaped by all the interactions that came before. A legend pet — the rarest stage — has seen months of shared days and wears the evidence of them. This is not a cosmetic unlock tree. This is a quiet mirror. The pet reflects the consistency of your relationship back at you. Not as a score. Not as a grade. As a creature that simply would not look the way it does if you had not been there. That is the thing that Tamagotchi planted the seed for in 1996, and that a desktop virtual pet in 2026 finally gets to grow into.` },
      { h: `What a virtual pet grows into when it grows with two people`, p: `Tamagotchi was a solo experience. One device, one creature, one person. The 2026 version of a virtual pet that grows up adds something the 90s never imagined: a pet that belongs to two people. A shared pet grows differently. It grows in response to two schedules, two moods, two sets of habits. One person feeds it in the morning, the other checks in at night. One person's consistent care keeps the pet alive through the other person's busy week. The pet becomes a small, shared object that both people are responsible for — and that both people watch change. That shared watching is the thing. The pet is not a substitute for communication. It is a reason to communicate. A small, low-stakes reason. Two people who might not have anything to say to each other on a random Tuesday can still say: "Hey, the pet grew a new stage today." And that, as a conversation starter, is worth more than any push notification.` },
      { h: `The grown-up pet and the grown-up person`, p: `There is a specific moment when you look at your virtual pet and realize it has been there for three months. It is no longer the infant blob you started with. It has been through the late nights, the deadlines, the quiet Sunday afternoons. It has been through the week you were too busy to check in, and it was still there when you came back. At that point, the pet is no longer a novelty. It is an artefact. It is evidence that time passed, and that you were present for some of it. This is the most adult version of the Tamagotchi promise: not that the pet needs you, but that the pet remembers you. The Tamagotchi egg taught a generation to care. The desktop pet that grows up teaches something quieter: that care, sustained over time, leaves a mark. And the mark is the pet itself.` },
    ],
    cta: `Start a virtual pet that grows up with you. It remembers every day you show up.`,
    faqs: [
      { q: `How many stages does a virtual pet like Tamagotchi have in Togthr?`, a: `Togthr Bot has five growth stages: infant, toddler, teen, adult, and legend. Each stage changes both the pet's appearance and its behaviour. The pet evolves based on consistent interaction — there is no timer, no forced speed-up, and no in-app purchase to skip stages. The growth is organic and depends on how regularly you and your partner engage with it.` },
      { q: `Does the pet actually die if I forget to check in?`, a: `No. Togthr Bot does not die. This is an intentional design choice. The original Tamagotchi's death mechanic created anxiety. A desktop pet that lives on your taskbar should not add stress to your day. If you miss a day or a week, the pet simply pauses. It will be in the same state when you return. Growth is tied to accumulated care, not to a countdown timer.` },
      { q: `Can two people share one virtual pet and watch it grow together?`, a: `Yes — this is the core idea of Togthr. A single pet is linked to a pair of users. Both people can feed it, interact with it, and watch it grow. The pet's growth reflects the combined care from both people. If one person is busy for a week, the other person's interactions keep the pet going.` },
      { q: `Is the growth random, or does the pet grow based on how I treat it?`, a: `The growth is deterministic but not linear. It depends on the consistency, variety, and frequency of your interactions — not on a hidden points system. The same pet cared for by two different people will grow slightly differently over time, reflecting the unique rhythm of each relationship.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home — start your pet` },
      { href: `/en/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `From pocket to desktop: 30 years of electronic pets` },
      { href: `/en/blog/tamagotchi-alternative-for-adults`, label: `Tamagotchi alternative for adults` },
      { href: `/en/blog/a-virtual-pet-in-a-long-relationship`, label: `A virtual pet in a long relationship` },
      { href: `/en/blog/what-your-virtual-pet-notices`, label: `What your virtual pet quietly notices` },
    ],
  },

  'zh-cn': {
    intro: `1997 年,你早上七点在学校前喂它,课间休息时清理它的像素便便,看着它从一个圆球长成一张有脸的生物,然后——不可避免地——你把它忘在书包里三天,它死了。那是 1997 年的 Tamagotchi。30 年后,那只会长大的虚拟宠物回来了——这次不在钥匙扣上,在你的桌面浏览器标签里。而其中最迷人的部分——看着一个很小的东西变成另一个东西——现在是全部的意义。`,
    sections: [
      { h: `Tamagotchi 在 1996 年做对了什么`, p: `1996 年 11 月万代推出 Tamagotchi 时,没有人叫它"虚拟宠物"。他们叫它"育成游戏"——这名字很糟糕,但描述很精准。核心循环很简单:一个生物需要你,你回应,它改变。不是因为你解锁了成就,不是因为你连续打卡,而是因为你出现了。这个循环——输入、等待、后果——比电子游戏更古老。它是窗台上的一盆植物、碗里的一条金鱼、任何你负责的小生命的循环。Tamagotchi 理解了一件 2026 年大部分 App 仍然不理解的事:成长才是让人上瘾的钩子。不是积分,不是徽章,不是排行榜。看着一个生物因为你而变成它之前不是的样子——这才是卖出 8200 万台的东西。钥匙扣不在了。循环还在。` },
      { h: `钥匙扣宠物的三个阶段,和之后的进化`, p: `初代 Tamagotchi 的成长路径很简单:蛋→幼年→成年。进化取决于照养质量——喂得好、及时清理、在它捣蛋时适度管教,你就得到"好"的成年体。疏于照料,你得到"坏"的。死亡是永久的。就这些。三个阶段,几个分支,一个复位键。到了 2026 年,一只会长大的虚拟宠物可以做更多——不只是更多阶段,而是每个阶段有更多的意义。一个阶段不仅是一张新精灵图。一个阶段是一种新行为,是宠物与你一天互动的新方式,是一个让你再次查看的新理由。1996 年 Tamagotchi 和 2026 年虚拟宠物的区别在于:1996 年的那个,"尽管有你"也在长大——它跑在时钟上。2026 年的这个,"和你一起"长大——它跑在你们的关系上。` },
      { h: `五个阶段,一只宠物,和一个每天都出现的人`, p: `Togthr Bot 有五个成长阶段:婴儿、学步、少年、成年、传说。在每一个阶段,宠物不仅是看起来不一样——它的行为也不一样。婴儿期的宠物很粘人,对每次互动都有反应。学步期的宠物学会了一小组习惯。少年期的宠物有情绪。成年期的宠物有了一种安定的个性——由之前所有互动共同塑造。传说期的宠物——最稀有的一种——见过几个月的共享时光,身上带着这些时光的证据。这不是一个外观解锁树。这是一面安静的镜子。宠物把你关系的连贯性反射给你看。不是以分数,不是以评级。而是一只生物——如果你没有在那里,它就不会长得像现在这样。这就是 Tamagotchi 在 1996 年播下的种子,而一只桌面虚拟宠物在 2026 年终于长成了的东西。` },
      { h: `当虚拟宠物和两个人一起长大,它长成了什么`, p: `Tamagotchi 是一个人的体验。一台设备,一只生物,一个人。2026 年版的、会长大的虚拟宠物,加入了 90 年代从未想过的东西:一只同时属于两个人的宠物。一只共享的宠物,长大方式不一样。它回应的是两份日程、两种情绪、两套习惯。一个人在早上喂它,另一个人在晚上查看。一个人的持续照料,让宠物撑过另一个人忙碌的一周。这只宠物变成了一个小小的、共享的对象——两个人都对它负责,两个人都看着它变化。这种共享观看,才是重点。宠物不是沟通的替代品。它是沟通的理由。一个小小的、低压力的理由。两个在某个随机周二对彼此没什么话好说的人,仍然可以说:"嘿,今天宠物长了一个新阶段。"而这句话,作为开场白,比任何推送通知都值钱。` },
      { h: `长大的宠物,和长大的人`, p: `有那么一个特别的时刻:你看着你的虚拟宠物,突然意识到它已经在那里三个月了。它不再是当初那个婴儿期的圆球。它经历了深夜加班、deadline 冲刺、安静的周日下午。它经历了你太忙而没去查看的那一周——等你回来时它还在。到那个时刻,宠物不再是一个新奇玩意。它是一件文物。它是时间曾流逝过、而你在其中一部分时间里在场过的证据。这是 Tamagotchi 承诺的最成熟版本:不是你多么需要宠物,而是你被宠物记住了。Tamagotchi 的蛋教会了一代人"照顾"。会长大的桌面宠物教会了一些更安静的事情:持续的照顾,会在时间中留下印记。而那个印记,就是宠物本身。` },
    ],
    cta: `开启一只跟你一起长大的虚拟宠物。每一个你在场的日子,它都记得。`,
    faqs: [
      { q: `像 Tamagotchi 那样长大的虚拟宠物,Togthr 有几个阶段？`, a: `Togthr Bot 有五个成长阶段:婴儿、学步、少年、成年、传说。每个阶段都会改变宠物的外观和行为。宠物的进化基于持续的互动——没有计时器、没有强制加速、也没有跳阶段的付费道具。成长是有机的,取决于你和你的伴侣与它互动的规律性。` },
      { q: `如果我忘了查看,宠物会死吗？`, a: `不会。Togthr Bot 不会死。这是一个有意的设计选择。初代 Tamagotchi 的死亡机制制造了焦虑。一只住在你任务栏上的桌面宠物,不应该给你的日子增加压力。如果你错过一天或一周,宠物只是暂停。你回来时它保持原样。成长绑定的是累计的照料,不是倒计时。` },
      { q: `两个人能共享一只虚拟宠物、一起看它长大吗？`, a: `能——这正是 Togthr 的核心设计。一只宠物绑定一对用户。两个人都能喂它、和它互动、看它成长。宠物的成长反映了两个人的共同照料。如果一个人忙了一周,另一个人的互动可以维持宠物状态。` },
      { q: `成长是随机的,还是根据我怎么对待它来决定的？`, a: `成长是确定性的,但不是线性的。它取决于互动的持续性、多样性和频率——背后没有隐藏分数系统。同一只宠物,被两个不同的人照料,会随着时间长出略微不同的样子,反映出每段关系独特的节奏。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页 — 开启你的宠物` },
      { href: `/zh-cn/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `从钥匙扣到桌面:电子宠物的 30 年` },
      { href: `/zh-cn/blog/tamagotchi-alternative-for-adults`, label: `给成年人的 Tamagotchi 替代方案` },
      { href: `/zh-cn/blog/a-virtual-pet-in-a-long-relationship`, label: `长期关系里的虚拟宠物` },
      { href: `/zh-cn/blog/what-your-virtual-pet-notices`, label: `你的数字宠物到底在偷偷注意什么` },
    ],
  },

  'zh-tw': {
    intro: `1997 年,你早上七點在學校前餵牠,課間休息時清理牠的像素便便,看著牠從一個圓球長成一張有臉的生物,然後——不可避免地——你把牠忘在書包裡三天,牠死了。那是 1997 年的 Tamagotchi。30 年後,那隻會長大的虛擬寵物回來了——這次不在鑰匙圈上,在你的桌面瀏覽器分頁裡。而其中最迷人的部分——看著一個很小的東西變成另一個東西——現在是全部的意義。`,
    sections: [
      { h: `Tamagotchi 在 1996 年做對了什麼`, p: `1996 年 11 月萬代推出 Tamagotchi 時,沒有人叫它「虛擬寵物」。他們叫它「育成遊戲」——這名字很糟糕,但描述很精準。核心循環很簡單:一個生物需要你,你回應,它改變。不是因為你解鎖了成就,不是因為你連續打卡,而是因為你出現了。這個循環——輸入、等待、後果——比電子遊戲更古老。它是窗台上的一盆植物、碗裡的一條金魚、任何你負責的小生命的循環。Tamagotchi 理解了一件 2026 年大部分 App 仍然不理解的事:成長才是讓人上癮的鉤子。不是積分,不是徽章,不是排行榜。看著一個生物因為你而變成它之前不是的樣子——這才是賣出 8200 萬台的東西。鑰匙圈不在了。循環還在。` },
      { h: `鑰匙圈寵物的三個階段,和之後的進化`, p: `初代 Tamagotchi 的成長路徑很簡單:蛋→幼年→成年。進化取決於照養品質——餵得好、即時清理、在牠搗蛋時適度管教,你就得到「好」的成年體。疏於照料,你得到「壞」的。死亡是永久的。就這些。三個階段,幾個分支,一個復位鍵。到了 2026 年,一隻會長大的虛擬寵物可以做更多——不只是更多階段,而是每個階段有更多的意義。一個階段不僅是一張新精靈圖。一個階段是一種新行為,是寵物與你一天互動的新方式,是一個讓你再次查看的新理由。1996 年 Tamagotchi 和 2026 年虛擬寵物的區別在於:1996 年的那個,「儘管有你」也在長大——它跑在時鐘上。2026 年的這個,「和你一起」長大——它跑在你們的關係上。` },
      { h: `五個階段,一隻寵物,和一個每天都出現的人`, p: `Togthr Bot 有五個成長階段:嬰兒、學步、少年、成年、傳說。在每一個階段,寵物不僅是看起來不一樣——牠的行為也不一樣。嬰兒期的寵物很黏人,對每次互動都有反應。學步期的寵物學會了一小組習慣。少年期的寵物有情緒。成年期的寵物有了一種安定的個性——由之前所有互動共同塑造。傳說期的寵物——最稀有的一種——見過幾個月的共享時光,身上帶著這些時光的證據。這不是一個外觀解鎖樹。這是一面安靜的鏡子。寵物把你關係的連貫性反射給你看。不是以分數,不是以評級。而是一隻生物——如果你沒有在那裡,牠就不會長得像現在這樣。這就是 Tamagotchi 在 1996 年播下的種子,而一隻桌面虛擬寵物在 2026 年終於長成了的東西。` },
      { h: `當虛擬寵物和兩個人一起長大,牠長成了什麼`, p: `Tamagotchi 是一個人的體驗。一台裝置,一隻生物,一個人。2026 年版的、會長大的虛擬寵物,加入了 90 年代從未想過的東西:一隻同時屬於兩個人的寵物。一隻共享的寵物,長大方式不一樣。牠回應的是兩份日程、兩種情緒、兩套習慣。一個人在早上餵牠,另一個人在晚上查看。一個人的持續照料,讓寵物撐過另一個人忙碌的一週。這隻寵物變成了一個小小的、共享的對象——兩個人都對牠負責,兩個人都看著牠變化。這種共享觀看,才是重點。寵物不是溝通的替代品。牠是溝通的理由。一個小小的、低壓力的理由。兩個在某個隨機週二對彼此沒什麼話好說的人,仍然可以說:「嘿,今天寵物長了一個新階段。」而這句話,作為開場白,比任何推播通知都值錢。` },
      { h: `長大的寵物,和長大的人`, p: `有那麼一個特別的時刻:你看著你的虛擬寵物,突然意識到牠已經在那裡三個月了。牠不再是當初那個嬰兒期的圓球。牠經歷了深夜加班、deadline 衝刺、安靜的週日下午。牠經歷了你太忙而沒去查看的那一週——等你回來時牠還在。到那個時刻,寵物不再是一個新奇玩意。牠是一件文物。牠是時間曾流逝過、而你在其中一部分時間裡在場過的證據。這是 Tamagotchi 承諾的最成熟版本:不是你多麼需要寵物,而是你被寵物記住了。Tamagotchi 的蛋教會了一代人「照顧」。會長大的桌面寵物教會了一些更安靜的事情:持續的照顧,會在時間中留下印記。而那個印記,就是寵物本身。` },
    ],
    cta: `開啟一隻跟你一起長大的虛擬寵物。每一個你在場的日子,牠都記得。`,
    faqs: [
      { q: `像 Tamagotchi 那樣長大的虛擬寵物,Togthr 有幾個階段？`, a: `Togthr Bot 有五個成長階段:嬰兒、學步、少年、成年、傳說。每個階段都會改變寵物的外觀和行為。寵物的進化基於持續的互動——沒有計時器、沒有強制加速、也沒有跳階段的付費道具。成長是有機的,取決於你和你的伴侶與牠互動的規律性。` },
      { q: `如果我忘了查看,寵物會死嗎？`, a: `不會。Togthr Bot 不會死。這是一個有意的設計選擇。初代 Tamagotchi 的死亡機制製造了焦慮。一隻住在你工作列上的桌面寵物,不應該給你的日子增加壓力。如果你錯過一天或一週,寵物只是暫停。你回來時牠保持原樣。成長綁定的是累計的照料,不是倒計時。` },
      { q: `兩個人能共享一隻虛擬寵物、一起看牠長大嗎？`, a: `能——這正是 Togthr 的核心設計。一隻寵物綁定一對用戶。兩個人都能餵牠、和牠互動、看牠成長。寵物的成長反映了兩個人的共同照料。如果一個人忙了一週,另一個人的互動可以維持寵物狀態。` },
      { q: `成長是隨機的,還是根據我怎麼對待牠來決定的？`, a: `成長是確定性的,但不是線性的。它取決於互動的持續性、多樣性和頻率——背後沒有隱藏分數系統。同一隻寵物,被兩個不同的人照料,會隨著時間長出略微不同的樣子,反映出每段關係獨特的節奏。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁 — 開啟你的寵物` },
      { href: `/zh-tw/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `從鑰匙圈到桌面:電子寵物的 30 年` },
      { href: `/zh-tw/blog/tamagotchi-alternative-for-adults`, label: `給成年人的 Tamagotchi 替代方案` },
      { href: `/zh-tw/blog/a-virtual-pet-in-a-long-relationship`, label: `長期關係裡的虛擬寵物` },
      { href: `/zh-tw/blog/what-your-virtual-pet-notices`, label: `你的數位寵物到底在偷偷注意什麼` },
    ],
  },

  ja: {
    intro: `1997年、あなたは朝7時に学校の前に餌をやり、休み時間にピクセルのフンを掃除し、それが小さな丸からちゃんとした顔のある生き物に育つのを見守った——そして、必然的に——カバンに三日間入れっぱなしで死なせてしまった。それが1997年のたまごっちだった。30年後、成長するバーチャルペットが戻ってきた——今度はキーホルダーではなく、デスクトップのブラウザタブに。そしてずっと一番魅力的だった部分——小さなものが別のものに変わっていくのを見ること——が、今やすべての意味になった。`,
    sections: [
      { h: `たまごっちが1996年に正しく掴んだこと`, p: `1996年11月にバンダイがたまごっちを発売したとき、誰もそれを「バーチャルペット」とは呼ばなかった。「育成ゲーム」と呼ばれた——ひどい名前だが、完璧な説明だ。核となるループはシンプルだった:生き物があなたを必要とし、あなたが応え、生き物が変わる。アチーブメントを解除したからではない。連続記録を達成したからでもない。あなたが姿を見せたからだ。このループ——入力、待機、結果——はビデオゲームより古い。窓辺の鉢植え、金魚鉢の金魚、あなたが責任を負うあらゆる小さな命のループだ。たまごっちは、2026年になってもほとんどのアプリがまだ理解していないことを掴んでいた:成長こそがフックだ。ポイントでも、バッジでも、リーダーボードでもない。あなたのせいで、生き物が以前とは違うものになっていくのを見ること——それが8200万台を売ったものだ。キーホルダーは去った。ループは残っている。` },
      { h: `キーホルダーペットの3段階、そしてその後の進化`, p: `初代たまごっちの成長経路は単純だった:たまご→こども→おとな。進化は世話の質にかかっていた——ちゃんと餌をやり、時間通りに掃除し、いたずらしたらしつければ、「良い」おとなになった。世話を怠れば「悪い」おとなに。死は永久だった。それだけ。3段階、いくつかの分岐、リセットボタン。2026年には、成長するバーチャルペットはもっと多くのことができる——ただ段階が多いだけではなく、一段階あたりの意味が増えた。段階とは新しいスプライトだけではない。段階とは新しい振る舞いだ。ペットがあなたの一日と交わる新しい方法。またチェックしたくなる新しい理由。1996年のたまごっちと2026年のバーチャルペットの違い:1996年版は「あなたに関係なく」育った——時計仕掛けで動いていた。2026年版は「あなたと一緒に」育つ——あなたの関係の上を走っている。` },
      { h: `5段階、1匹のペット、そして毎日姿を見せる人`, p: `Togthr Botには5つの成長段階がある:ベビー、トドラー、ティーン、アダルト、レジェンド。各段階で、ペットは見た目が違うだけではない——振る舞いも違う。ベビーのペットは甘えん坊で、あらゆるインタラクションに反応する。トドラーのペットは小さな習慣のセットを学んでいる。ティーンのペットにはムードがある。アダルトのペットには、それまでのすべてのインタラクションによって形作られた、落ち着いた性格がある。レジェンドのペット——最も希少——は何ヶ月もの共有された日々を経験し、その証を身にまとっている。これは見た目のアンロックツリーではない。これは静かな鏡だ。ペットはあなたの関係の一貫性を、あなたに映し返す。スコアとしてではなく。評価としてでもなく。あなたがそこにいなければ今のようには見えなかったであろう、一匹の生き物として。これが、たまごっちが1996年に種を蒔き、そしてデスクトップのバーチャルペットが2026年についに育ちきったものだ。` },
      { h: `バーチャルペットが二人と一緒に育つと、何になるのか`, p: `たまごっちは一人の体験だった。一つのデバイス、一匹の生き物、一人の人。2026年版の、成長するバーチャルペットは、90年代が想像もしなかったものを加えた:同時に二人のものになるペット。共有ペットは違う育ち方をする。二つのスケジュール、二つの気分、二組の習慣に応えて育つ。一人が朝に餌をやり、もう一人が夜にチェックする。一人の継続的な世話が、もう一人の忙しい一週間の間ペットを生かし続ける。ペットは、二人が責任を共有し、二人がその変化を見守る、小さな共有オブジェクトになる。この共有された見守りこそが核心だ。ペットはコミュニケーションの代替ではない。コミュニケーションの理由だ。小さな、プレッシャーの低い理由。ランダムな火曜日に互いに特に話すことがない二人でも、こう言える:「ねえ、今日ペットが新しい段階に育ったよ」。そしてその一言は、会話のきっかけとして、どんなプッシュ通知よりも価値がある。` },
      { h: `育ったペットと、育った人`, p: `特別な瞬間がある。自分のバーチャルペットを見て、それがもう三ヶ月もそこにいることに気づく瞬間。それはもう、最初に始めたときのベビーの塊ではない。深夜の残業、締切の追い込み、静かな日曜の午後を共に過ごしてきた。忙しすぎてチェックできなかった一週間も経験し——あなたが戻ったとき、まだそこにいた。そのとき、ペットは目新しさではない。それは人工物だ。時間が過ぎ、あなたがその一部に立ち会っていた証拠だ。これが、たまごっちの約束の最も大人のバージョンだ:あなたがペットを必要としているのではなく、ペットがあなたを覚えているということ。たまごっちのたまごは、一世代に「世話」を教えた。成長するデスクトップペットは、もっと静かなことを教える:持続された世話は、時間の中に跡を残す。そしてその跡こそが、ペットそのものだ。` },
    ],
    cta: `あなたと一緒に育つバーチャルペットを始めよう。あなたが姿を見せたすべての日を、覚えている。`,
    faqs: [
      { q: `たまごっちのように育つバーチャルペットは、Togthrでは何段階ありますか？`, a: `Togthr Botには5つの成長段階があります:ベビー、トドラー、ティーン、アダルト、レジェンド。各段階でペットの見た目と振る舞いの両方が変わります。進化は継続的なインタラクションに基づきます——タイマーも、強制加速も、段階を飛ばすアプリ内課金もありません。成長は有機的で、あなたとパートナーがどれだけ定期的に関わるかにかかっています。` },
      { q: `チェックを忘れたら、ペットは死にますか？`, a: `いいえ。Togthr Botは死にません。これは意図的なデザインの選択です。初代たまごっちの死亡メカニクスは不安を生みました。タスクバーに住むデスクトップペットが、あなたの一日にストレスを加えるべきではありません。一日や一週間サボっても、ペットはただ一時停止します。戻ったとき、同じ状態のままです。成長は蓄積された世話に紐づいており、カウントダウンタイマーではありません。` },
      { q: `二人で一匹のバーチャルペットを共有し、一緒に育つのを見られますか？`, a: `はい——それがTogthrの核となるアイデアです。一匹のペットが一組のユーザーに紐づきます。二人とも餌をやり、インタラクションし、成長を見守れます。ペットの成長は二人の複合的な世話を反映します。一人が一週間忙しくても、もう一人のインタラクションがペットを維持します。` },
      { q: `成長はランダムですか、それとも扱い方によって決まりますか？`, a: `成長は決定的ですが、線形ではありません。インタラクションの一貫性、多様性、頻度に依存します——背後に隠れたポイントシステムはありません。同じペットが異なる二人に世話されると、時間とともに少しずつ異なる育ち方をし、それぞれの関係のユニークなリズムを反映します。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム — ペットを始める` },
      { href: `/ja/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `キーホルダーからデスクトップへ:電子ペットの30年` },
      { href: `/ja/blog/tamagotchi-alternative-for-adults`, label: `大人のためのたまごっち代替` },
      { href: `/ja/blog/a-virtual-pet-in-a-long-relationship`, label: `長い関係の中のバーチャルペット` },
      { href: `/ja/blog/what-your-virtual-pet-notices`, label: `あなたのバーチャルペットが静かに見ていること` },
    ],
  },

  ko: {
    intro: `1997년, 당신은 학교 가기 전 아침 7시에 밥을 줬고, 쉬는 시간에 픽셀 똥을 치웠고, 그것이 둥근 덩어리에서 진짜 얼굴이 있는 생명체로 자라는 걸 지켜봤다. 그리고——피할 수 없이——가방 속에 사흘 동안 넣어둔 채 잊어버렸고, 죽었다. 그게 1997년의 다마고치였다. 30년 후, 자라는 가상 펫이 돌아왔다——이번에는 열쇠고리가 아니라, 데스크톱 브라우저 탭에서. 그리고 언제나 가장 매력적이었던 부분——작은 무언가가 다른 무언가로 변하는 걸 지켜보는 것——이 이제 모든 의미가 되었다.`,
    sections: [
      { h: `다마고치가 1996년에 옳게 잡은 것`, p: `1996년 11월 반다이가 다마고치를 출시했을 때, 아무도 그것을 "가상 펫"이라고 부르지 않았다. 그들은 "육성 게임"이라고 불렀다——끔찍한 이름이지만 완벽한 설명이다. 핵심 루프는 단순했다: 생명체가 당신을 필요로 하고, 당신이 응답하며, 생명체가 변한다. 업적을 해제해서도, 연속 기록을 달성해서도 아니다. 당신이 나타났기 때문이다. 이 루프——입력, 대기, 결과——는 비디오 게임보다 더 오래되었다. 창턱의 화분, 어항 속 금붕어, 당신이 책임진 모든 작은 생명의 루프다. 다마고치는 2026년에도 대부분의 앱이 여전히 이해하지 못하는 것을 잡아냈다: 성장이 바로 훅이다. 포인트도, 배지도, 리더보드도 아니다. 당신 때문에 생명체가 전에 아니었던 무언가가 되어가는 걸 지켜보는 것——그것이 8200만 대를 판 것이다. 열쇠고리는 사라졌다. 루프는 남아 있다.` },
      { h: `열쇠고리 펫의 세 단계, 그리고 그 후의 진화`, p: `초기 다마고치의 성장 경로는 단순했다: 알→아이→어른. 진화는 돌봄의 질에 달려 있었다——잘 먹이고, 제때 청소하고, 말썽부릴 때 훈육하면 "좋은" 어른이 된다. 방치하면 "나쁜" 어른. 죽음은 영구적이었다. 그게 전부였다. 세 단계, 몇 개의 분기, 리셋 버튼. 2026년에는, 자라는 가상 펫이 더 많은 것을 할 수 있다——단계가 더 많은 것만이 아니라, 단계당 의미가 더 많다. 단계는 단순히 새 스프라이트가 아니다. 단계는 새로운 행동이다. 펫이 당신의 하루와 상호작용하는 새로운 방식. 다시 확인하고 싶게 만드는 새로운 이유. 1996년 다마고치와 2026년 가상 펫의 차이: 1996년 것은 '당신과 관계없이' 자랐다——시계 위에서 돌아갔다. 2026년 것은 '당신과 함께' 자란다——당신의 관계 위에서 돌아간다.` },
      { h: `다섯 단계, 한 마리 펫, 그리고 매일 나타나는 사람`, p: `Togthr Bot에는 다섯 가지 성장 단계가 있다: 베이비, 토들러, 틴에이저, 어덜트, 레전드. 각 단계에서 펫은 다르게 보일 뿐만 아니라——다르게 행동한다. 베이비 펫은 애정을 갈구하고 모든 인터랙션에 반응한다. 토들러 펫은 작은 습관 세트를 배웠다. 틴에이저 펫은 무드를 가진다. 어덜트 펫은 그 이전의 모든 인터랙션에 의해 형성된, 자리잡은 성격을 가진다. 레전드 펫——가장 희귀한——은 몇 달간의 공유된 날들을 겪었고 그 증거를 몸에 지니고 있다. 이것은 외형 언락 트리가 아니다. 이것은 조용한 거울이다. 펫은 당신 관계의 일관성을 당신에게 비춰준다. 점수로도, 등급으로도 아니다. 당신이 거기 있지 않았다면 지금처럼 보이지 않았을 한 마리 생명체로서. 이것이 다마고치가 1996년에 씨앗을 뿌리고, 데스크톱 가상 펫이 2026년에 마침내 자라낸 것이다.` },
      { h: `가상 펫이 두 사람과 함께 자라면, 무엇이 되는가`, p: `다마고치는 혼자 하는 경험이었다. 하나의 기기, 한 마리 생명체, 한 사람. 2026년판, 자라는 가상 펫은 90년대가 상상도 못한 것을 더했다: 동시에 두 사람의 것이 되는 펫. 공유 펫은 다르게 자란다. 두 개의 스케줄, 두 가지 기분, 두 세트의 습관에 응답하며 자란다. 한 사람이 아침에 밥을 주고, 다른 사람이 밤에 확인한다. 한 사람의 지속적 돌봄이 다른 사람의 바쁜 한 주 동안 펫을 살린다. 펫은 두 사람 모두가 책임지고, 두 사람 모두가 변화를 지켜보는, 작고 공유된 대상이 된다. 이 공유된 지켜봄이 바로 핵심이다. 펫은 소통의 대체물이 아니다. 소통의 이유다. 작고, 부담이 적은 이유. 어느 평범한 화요일에 서로 특별히 할 말이 없는 두 사람도 이렇게 말할 수 있다: "야, 오늘 펫이 새 단계로 자랐어." 그리고 그 한마디는, 대화의 시작점으로서, 어떤 푸시 알림보다 가치가 있다.` },
      { h: `자란 펫과, 자란 사람`, p: `특별한 순간이 있다. 당신의 가상 펫을 바라보며, 그것이 벌써 석 달째 거기에 있다는 걸 깨닫는 순간. 그것은 더 이상 처음 시작했을 때의 베이비 덩어리가 아니다. 늦은 밤 야근, 마감의 압박, 조용한 일요일 오후를 함께 겪었다. 당신이 너무 바빠서 확인하지 못한 그 한 주도 겪었고——당신이 돌아왔을 때 여전히 거기 있었다. 그 시점에서, 펫은 더 이상 신기한 장난감이 아니다. 그것은 유물이다. 시간이 흘렀고, 당신이 그 일부에 함께 있었음을 증명하는 증거다. 이것이 다마고치 약속의 가장 어른 버전이다: 당신이 펫을 필요로 한다는 것이 아니라, 펫이 당신을 기억한다는 것. 다마고치의 알은 한 세대에게 "돌봄"을 가르쳤다. 자라는 데스크톱 펫은 더 조용한 것을 가르친다: 지속된 돌봄은 시간 속에 흔적을 남긴다. 그리고 그 흔적이 바로 펫 자신이다.` },
    ],
    cta: `당신과 함께 자라는 가상 펫을 시작하세요. 당신이 나타난 모든 날을, 기억합니다.`,
    faqs: [
      { q: `다마고치처럼 자라는 가상 펫은 Togthr에서 몇 단계인가요?`, a: `Togthr Bot에는 다섯 가지 성장 단계가 있습니다: 베이비, 토들러, 틴에이저, 어덜트, 레전드. 각 단계는 펫의 외형과 행동을 모두 바꿉니다. 진화는 지속적인 인터랙션에 기반합니다——타이머도, 강제 가속도, 단계를 건너뛰는 인앱 구매도 없습니다. 성장은 유기적이며, 당신과 파트너가 얼마나 정기적으로 참여하는지에 달려 있습니다.` },
      { q: `확인을 잊으면 펫이 죽나요?`, a: `아니요. Togthr Bot은 죽지 않습니다. 이것은 의도적인 디자인 선택입니다. 초기 다마고치의 죽음 메커니즘은 불안을 만들었습니다. 작업 표시줄에 사는 데스크톱 펫이 당신의 하루에 스트레스를 더해서는 안 됩니다. 하루나 일주일을 놓쳐도, 펫은 그냥 일시정지합니다. 돌아오면 같은 상태 그대로입니다. 성장은 누적된 돌봄에 묶여 있으며, 카운트다운 타이머가 아닙니다.` },
      { q: `두 사람이 하나의 가상 펫을 공유하며 함께 자라는 걸 볼 수 있나요?`, a: `네——이것이 Togthr의 핵심 아이디어입니다. 하나의 펫이 한 쌍의 사용자에게 연결됩니다. 두 사람 모두 밥을 주고, 인터랙션하고, 성장을 지켜볼 수 있습니다. 펫의 성장은 두 사람의 결합된 돌봄을 반영합니다. 한 사람이 일주일 바빠도, 다른 사람의 인터랙션이 펫을 유지합니다.` },
      { q: `성장은 무작위인가요, 아니면 내가 어떻게 대하는지에 따라 결정되나요?`, a: `성장은 결정적이지만 선형적이지 않습니다. 인터랙션의 일관성, 다양성, 빈도에 의존합니다——뒤에 숨겨진 포인트 시스템은 없습니다. 같은 펫이 다른 두 사람에게 돌봄받으면, 시간이 지나면서 조금씩 다르게 자라며, 각 관계의 고유한 리듬을 반영합니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈 — 펫 시작하기` },
      { href: `/ko/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `열쇠고리에서 데스크톱으로: 전자 펫의 30년` },
      { href: `/ko/blog/tamagotchi-alternative-for-adults`, label: `어른을 위한 다마고치 대안` },
      { href: `/ko/blog/a-virtual-pet-in-a-long-relationship`, label: `오래된 관계 속의 가상 펫` },
      { href: `/ko/blog/what-your-virtual-pet-notices`, label: `당신의 가상 반려동물은 무엇을 조용히 살피고 있을까` },
    ],
  },

  de: {
    intro: `1997 hast du es morgens um sieben vor der Schule gefüttert, in der Pause den Pixel-Kot weggemacht und zugesehen, wie es von einem Klecks zu einer Kreatur mit einem richtigen Gesicht wurde — und dann, unvermeidlich, hast du es drei Tage im Rucksack vergessen und es ist gestorben. So war Tamagotchi 1997. Dreißig Jahre später ist das virtuelle Haustier, das heranwächst, zurück — diesmal nicht am Schlüsselanhänger, sondern im Desktop-Browser-Tab. Und der Teil, der immer am fesselndsten war — zuzusehen, wie etwas Kleines zu etwas anderem wird — ist jetzt der ganze Sinn.`,
    sections: [
      { h: `Was Tamagotchi 1996 richtig gemacht hat`, p: `Als Bandai im November 1996 das Tamagotchi auf den Markt brachte, nannte es niemand ein "virtuelles Haustier". Man nannte es "Erziehungsspiel" — ein schrecklicher Name, aber eine perfekte Beschreibung. Die Kernschleife war einfach: Eine Kreatur braucht dich, du reagierst, die Kreatur verändert sich. Nicht, weil du eine Errungenschaft freigeschaltet hast. Nicht, weil du einen Streak erreicht hast. Sondern weil du aufgetaucht bist. Diese Schleife — Input, Warten, Konsequenz — ist älter als Videospiele. Es ist die Schleife einer Topfpflanze auf dem Fensterbrett, eines Goldfischs im Glas, jedes kleinen Lebewesens, für das du verantwortlich bist. Tamagotchi hat etwas verstanden, was die meisten Apps 2026 immer noch nicht begreifen: Wachstum ist der Haken. Nicht Punkte. Nicht Abzeichen. Nicht Bestenlisten. Zuzusehen, wie eine Kreatur zu etwas wird, das sie vorher nicht war — deinetwegen — das ist es, was 82 Millionen Einheiten verkauft hat. Der Schlüsselanhänger ist weg. Die Schleife ist es nicht.` },
      { h: `Drei Stufen eines Schlüsselanhänger-Haustiers und was danach kam`, p: `Das ursprüngliche Tamagotchi hatte einen einfachen Wachstumspfad: Ei → Kind → Erwachsener. Die Entwicklung hing von der Pflegequalität ab — gut füttern, rechtzeitig säubern, disziplinieren, wenn es sich daneben benahm, und man bekam den "guten" Erwachsenen. Vernachlässigung brachte den "schlechten". Der Tod war endgültig. Das war's. Drei Stufen, ein paar Verzweigungen, ein Reset-Knopf. 2026 kann ein virtuelles Haustier, das heranwächst, mehr — nicht nur mehr Stufen, sondern mehr Bedeutung pro Stufe. Eine Stufe ist nicht nur ein neuer Sprite. Eine Stufe ist ein neues Verhalten. Eine neue Art, wie das Haustier mit deinem Tag interagiert. Ein neuer Grund, nachzuschauen. Der Unterschied zwischen einem Tamagotchi von 1996 und einem virtuellen Haustier von 2026: Die 1996-Version wuchs trotz dir — sie lief auf einer Uhr. Die 2026-Version wächst mit dir — sie läuft auf eurer Beziehung.` },
      { h: `Fünf Stufen, ein Haustier und die Person, die jeden Tag auftaucht`, p: `Togthr Bot hat fünf Wachstumsstufen: Baby, Kleinkind, Teenager, Erwachsener und Legende. Auf jeder Stufe sieht das Haustier nicht nur anders aus — es verhält sich anders. Ein Baby-Haustier ist bedürftig und reagiert auf jede Interaktion. Ein Kleinkind-Haustier hat eine kleine Reihe von Gewohnheiten gelernt. Ein Teenager-Haustier hat Launen. Ein erwachsenes Haustier hat eine gefestigte Persönlichkeit, geformt von all den vorherigen Interaktionen. Ein Legenden-Haustier — die seltenste Stufe — hat Monate gemeinsamer Tage gesehen und trägt die Spuren davon. Das ist kein kosmetischer Freischaltbaum. Das ist ein stiller Spiegel. Das Haustier spiegelt die Beständigkeit eurer Beziehung wider. Nicht als Punktzahl. Nicht als Note. Als eine Kreatur, die einfach nicht so aussehen würde, wenn du nicht da gewesen wärst. Das ist das, wofür Tamagotchi 1996 den Samen gelegt hat, und worin ein Desktop-Virtual-Pet 2026 endlich hineinwachsen darf.` },
      { h: `Wozu ein virtuelles Haustier wird, wenn es mit zwei Menschen wächst`, p: `Tamagotchi war eine Einzelerfahrung. Ein Gerät, eine Kreatur, eine Person. Die 2026-Version eines virtuellen Haustiers, das heranwächst, fügt etwas hinzu, was die 90er nie kannten: ein Haustier, das zwei Menschen gleichzeitig gehört. Ein geteiltes Haustier wächst anders. Es wächst als Antwort auf zwei Terminkalender, zwei Stimmungen, zwei Sets von Gewohnheiten. Eine Person füttert es morgens, die andere schaut abends nach. Die beständige Fürsorge der einen hält das Haustier durch die arbeitsreiche Woche der anderen am Leben. Das Haustier wird zu einem kleinen, geteilten Objekt, für das beide verantwortlich sind — und dessen Veränderung beide beobachten. Dieses gemeinsame Beobachten ist der Punkt. Das Haustier ist kein Ersatz für Kommunikation. Es ist ein Grund zur Kommunikation. Ein kleiner, unverbindlicher Grund. Zwei Menschen, die sich an einem beliebigen Dienstag nichts zu sagen haben, können immer noch sagen: "Hey, das Haustier ist heute eine Stufe gewachsen." Und das ist als Gesprächsöffner mehr wert als jede Push-Benachrichtigung.` },
      { h: `Das erwachsene Haustier und der erwachsene Mensch`, p: `Es gibt einen bestimmten Moment, in dem du dein virtuelles Haustier ansiehst und feststellst, dass es schon drei Monate da ist. Es ist nicht mehr der Baby-Klecks, mit dem du angefangen hast. Es hat die späten Nächte, die Deadlines, die stillen Sonntagnachmittage miterlebt. Es hat die Woche überstanden, in der du zu beschäftigt warst, um nachzusehen — und es war immer noch da, als du zurückkamst. An diesem Punkt ist das Haustier keine Neuheit mehr. Es ist ein Artefakt. Es ist der Beweis, dass Zeit vergangen ist und dass du bei einem Teil davon dabei warst. Das ist die erwachsenste Version des Tamagotchi-Versprechens: nicht dass das Haustier dich braucht, sondern dass das Haustier sich an dich erinnert. Das Tamagotchi-Ei hat einer Generation Fürsorge beigebracht. Das Desktop-Haustier, das heranwächst, lehrt etwas Leiseres: dass anhaltende Fürsorge Spuren in der Zeit hinterlässt. Und die Spur ist das Haustier selbst.` },
    ],
    cta: `Starte ein virtuelles Haustier, das mit dir wächst. Es erinnert sich an jeden Tag, an dem du da warst.`,
    faqs: [
      { q: `Wie viele Stufen hat ein virtuelles Haustier wie Tamagotchi bei Togthr?`, a: `Togthr Bot hat fünf Wachstumsstufen: Baby, Kleinkind, Teenager, Erwachsener und Legende. Jede Stufe verändert sowohl das Aussehen als auch das Verhalten des Haustiers. Die Entwicklung basiert auf kontinuierlicher Interaktion — es gibt keinen Timer, keine erzwungene Beschleunigung und keine In-App-Käufe zum Überspringen von Stufen. Das Wachstum ist organisch und hängt davon ab, wie regelmäßig du und dein Partner damit interagieren.` },
      { q: `Stirbt das Haustier, wenn ich vergesse, nach ihm zu sehen?`, a: `Nein. Togthr Bot stirbt nicht. Das ist eine bewusste Designentscheidung. Die Todesmechanik des ursprünglichen Tamagotchi erzeugte Angst. Ein Desktop-Haustier, das in deiner Taskleiste lebt, sollte deinem Tag keinen Stress hinzufügen. Wenn du einen Tag oder eine Woche verpasst, pausiert das Haustier einfach. Es ist im selben Zustand, wenn du zurückkommst. Wachstum ist an angesammelte Fürsorge gebunden, nicht an einen Countdown-Timer.` },
      { q: `Können zwei Menschen ein virtuelles Haustier teilen und es gemeinsam wachsen sehen?`, a: `Ja — das ist die Kernidee von Togthr. Ein einzelnes Haustier ist mit einem Paar von Nutzern verknüpft. Beide können es füttern, mit ihm interagieren und ihm beim Wachsen zusehen. Das Wachstum des Haustiers spiegelt die kombinierte Fürsorge beider wider. Wenn eine Person eine Woche lang beschäftigt ist, halten die Interaktionen der anderen Person das Haustier am Leben.` },
      { q: `Ist das Wachstum zufällig, oder wächst das Haustier danach, wie ich es behandle?`, a: `Das Wachstum ist deterministisch, aber nicht linear. Es hängt von der Beständigkeit, Vielfalt und Häufigkeit deiner Interaktionen ab — es gibt kein verstecktes Punktesystem. Dasselbe Haustier, von zwei verschiedenen Menschen umsorgt, wird sich mit der Zeit leicht unterschiedlich entwickeln und den einzigartigen Rhythmus jeder Beziehung widerspiegeln.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite — Haustier starten` },
      { href: `/de/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `Vom Schlüsselanhänger zum Desktop: 30 Jahre elektronische Haustiere` },
      { href: `/de/blog/tamagotchi-alternative-for-adults`, label: `Tamagotchi-Alternative für Erwachsene` },
      { href: `/de/blog/a-virtual-pet-in-a-long-relationship`, label: `Ein virtuelles Haustier in einer langen Beziehung` },
      { href: `/de/blog/what-your-virtual-pet-notices`, label: `Was dein virtuelles Haustier leise bemerkt` },
    ],
  },

  fr: {
    intro: `En 1997, vous le nourrissiez à sept heures du matin avant l'école, nettoyiez ses crottes pixel à la récré, le regardiez passer d'une goutte informe à une créature avec un vrai visage — et puis, inévitablement, vous l'oubliiez trois jours dans votre cartable et il mourait. C'était le Tamagotchi de 1997. Trente ans plus tard, l'animal virtuel qui grandit est de retour — pas sur un porte-clés cette fois, mais dans l'onglet de votre navigateur. Et la partie qui a toujours été la plus fascinante — regarder quelque chose de petit devenir autre chose — est maintenant tout l'enjeu.`,
    sections: [
      { h: `Ce que le Tamagotchi a réussi en 1996`, p: `Quand Bandai a lancé le Tamagotchi en novembre 1996, personne ne l'appelait un "animal virtuel". On l'appelait un "jeu d'élevage" — un nom affreux mais une description parfaite. La boucle centrale était simple : une créature a besoin de vous, vous répondez, la créature change. Pas parce que vous avez débloqué un succès. Pas parce que vous avez atteint une série. Parce que vous êtes venu. Cette boucle — entrée, attente, conséquence — est plus vieille que les jeux vidéo. C'est la boucle d'une plante sur un rebord de fenêtre, d'un poisson rouge dans un bocal, de tout petit être vivant dont vous êtes responsable. Le Tamagotchi a compris quelque chose que la plupart des applis en 2026 ne comprennent toujours pas : la croissance est le crochet. Pas les points. Pas les badges. Pas les classements. Regarder une créature devenir quelque chose qu'elle n'était pas avant, à cause de vous — c'est ça qui a vendu 82 millions d'unités. Le porte-clés a disparu. La boucle, non.` },
      { h: `Trois stades d'un animal de porte-clés, et ce qui est venu après`, p: `Le Tamagotchi original avait un chemin de croissance simple : œuf → enfant → adulte. L'évolution dépendait de la qualité des soins — bien nourrir, nettoyer à temps, discipliner quand il se comportait mal, et vous obteniez le "bon" adulte. Négligence et vous aviez le "mauvais". La mort était permanente. C'était tout. Trois stades, quelques branches, un bouton reset. En 2026, un animal virtuel qui grandit peut faire plus — pas seulement plus de stades, mais plus de sens par stade. Un stade n'est pas juste un nouveau sprite. Un stade est un nouveau comportement. Une nouvelle façon dont l'animal interagit avec votre journée. Une nouvelle raison de revenir. La différence entre un Tamagotchi de 1996 et un animal virtuel de 2026 : la version 1996 grandissait malgré vous — elle tournait sur une horloge. La version 2026 grandit avec vous — elle tourne sur votre relation.` },
      { h: `Cinq stades, un animal, et la personne qui vient chaque jour`, p: `Togthr Bot a cinq stades de croissance : bébé, bambin, ado, adulte et légende. À chaque stade, l'animal n'a pas seulement l'air différent — il se comporte différemment. Un animal bébé est dépendant et réagit à chaque interaction. Un animal bambin a appris un petit ensemble d'habitudes. Un animal ado a des humeurs. Un animal adulte a une personnalité établie, façonnée par toutes les interactions passées. Un animal légende — le stade le plus rare — a vu des mois de jours partagés et en porte les traces. Ce n'est pas un arbre de déverrouillage cosmétique. C'est un miroir silencieux. L'animal reflète la constance de votre relation. Pas comme un score. Pas comme une note. Comme une créature qui n'aurait tout simplement pas cette apparence si vous n'aviez pas été là. C'est ce que le Tamagotchi a semé en 1996, et dans quoi un animal virtuel de bureau peut enfin grandir en 2026.` },
      { h: `Ce que devient un animal virtuel quand il grandit avec deux personnes`, p: `Le Tamagotchi était une expérience solo. Un appareil, une créature, une personne. La version 2026 d'un animal virtuel qui grandit ajoute quelque chose que les années 90 n'ont jamais imaginé : un animal qui appartient à deux personnes. Un animal partagé grandit différemment. Il grandit en réponse à deux emplois du temps, deux humeurs, deux ensembles d'habitudes. Une personne le nourrit le matin, l'autre vérifie le soir. Les soins constants de l'une maintiennent l'animal en vie pendant la semaine chargée de l'autre. L'animal devient un petit objet partagé dont les deux sont responsables — et dont les deux regardent le changement. Ce regard partagé est le point. L'animal n'est pas un substitut à la communication. C'est une raison de communiquer. Une petite raison sans pression. Deux personnes qui n'ont rien à se dire un mardi ordinaire peuvent quand même dire : "Hé, l'animal a grandi d'un stade aujourd'hui." Et ça, comme ouverture de conversation, vaut plus que n'importe quelle notification push.` },
      { h: `L'animal adulte et la personne adulte`, p: `Il y a un moment précis où vous regardez votre animal virtuel et réalisez qu'il est là depuis trois mois. Ce n'est plus la goutte informe du début. Il a traversé les nuits tardives, les deadlines, les dimanches après-midi tranquilles. Il a traversé la semaine où vous étiez trop occupé pour vérifier — et il était toujours là quand vous êtes revenu. À ce stade, l'animal n'est plus une nouveauté. C'est un artefact. C'est la preuve que le temps a passé, et que vous étiez présent pour une partie de ce temps. Voilà la version la plus adulte de la promesse Tamagotchi : non pas que l'animal a besoin de vous, mais que l'animal se souvient de vous. L'œuf Tamagotchi a appris à une génération à prendre soin. L'animal de bureau qui grandit enseigne quelque chose de plus discret : que le soin, maintenu dans le temps, laisse une trace. Et la trace, c'est l'animal lui-même.` },
    ],
    cta: `Lancez un animal virtuel qui grandit avec vous. Il se souvient de chaque jour où vous êtes venu.`,
    faqs: [
      { q: `Combien de stades un animal virtuel comme le Tamagotchi a-t-il dans Togthr ?`, a: `Togthr Bot a cinq stades de croissance : bébé, bambin, ado, adulte et légende. Chaque stade modifie à la fois l'apparence et le comportement de l'animal. L'évolution repose sur une interaction continue — il n'y a pas de minuteur, pas d'accélération forcée et pas d'achat intégré pour sauter des stades. La croissance est organique et dépend de la régularité avec laquelle vous et votre partenaire interagissez avec lui.` },
      { q: `L'animal meurt-il si j'oublie de vérifier ?`, a: `Non. Togthr Bot ne meurt pas. C'est un choix de design intentionnel. Le mécanisme de mort du Tamagotchi original créait de l'anxiété. Un animal de bureau qui vit dans votre barre des tâches ne devrait pas ajouter de stress à votre journée. Si vous manquez un jour ou une semaine, l'animal se met simplement en pause. Il sera dans le même état à votre retour. La croissance est liée aux soins accumulés, pas à un compte à rebours.` },
      { q: `Deux personnes peuvent-elles partager un animal virtuel et le regarder grandir ensemble ?`, a: `Oui — c'est l'idée centrale de Togthr. Un seul animal est lié à une paire d'utilisateurs. Les deux peuvent le nourrir, interagir avec lui et le regarder grandir. La croissance de l'animal reflète les soins combinés des deux. Si une personne est occupée une semaine, les interactions de l'autre maintiennent l'animal.` },
      { q: `La croissance est-elle aléatoire, ou l'animal grandit-il selon la façon dont je le traite ?`, a: `La croissance est déterministe mais pas linéaire. Elle dépend de la constance, de la variété et de la fréquence de vos interactions — il n'y a pas de système de points caché. Le même animal, soigné par deux personnes différentes, grandira légèrement différemment au fil du temps, reflétant le rythme unique de chaque relation.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr — lancer votre animal` },
      { href: `/fr/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `Du porte-clés au bureau : 30 ans d'animaux électroniques` },
      { href: `/fr/blog/tamagotchi-alternative-for-adults`, label: `Alternative au Tamagotchi pour adultes` },
      { href: `/fr/blog/a-virtual-pet-in-a-long-relationship`, label: `Un animal virtuel dans une relation longue` },
      { href: `/fr/blog/what-your-virtual-pet-notices`, label: `Ce que votre animal virtuel remarque en silence` },
    ],
  },

  es: {
    intro: `En 1997, lo alimentabas a las siete de la mañana antes del colegio, limpiabas su caca pixel en el recreo, lo veías pasar de una mancha a una criatura con una cara de verdad — y luego, inevitablemente, lo olvidabas tres días en la mochila y se moría. Así era el Tamagotchi de 1997. Treinta años después, la mascota virtual que crece ha vuelto — esta vez no en un llavero, sino en la pestaña del navegador. Y la parte que siempre fue la más fascinante — ver algo pequeño convertirse en otra cosa — es ahora todo el sentido.`,
    sections: [
      { h: `Lo que Tamagotchi hizo bien en 1996`, p: `Cuando Bandai lanzó el Tamagotchi en noviembre de 1996, nadie lo llamaba "mascota virtual". Lo llamaban "juego de crianza" — un nombre horrible pero una descripción perfecta. El bucle central era simple: una criatura te necesita, tú respondes, la criatura cambia. No porque desbloqueaste un logro. No porque alcanzaste una racha. Porque apareciste. Este bucle — entrada, espera, consecuencia — es más antiguo que los videojuegos. Es el bucle de una planta en el alféizar, de un pez dorado en una pecera, de cualquier pequeña cosa viva de la que eres responsable. Tamagotchi entendió algo que la mayoría de las apps en 2026 todavía no entienden: el crecimiento es el gancho. No los puntos. No las medallas. No las tablas de clasificación. Ver a una criatura convertirse en algo que no era antes, por tu culpa — eso es lo que vendió 82 millones de unidades. El llavero se ha ido. El bucle no.` },
      { h: `Tres etapas de una mascota de llavero, y lo que vino después`, p: `El Tamagotchi original tenía un camino de crecimiento simple: huevo → niño → adulto. La evolución dependía de la calidad del cuidado — alimentarlo bien, limpiarlo a tiempo, disciplinarlo cuando se portaba mal, y obtenías el adulto "bueno". Descuido y obtenías el "malo". La muerte era permanente. Eso era todo. Tres etapas, unas cuantas ramas, un botón de reinicio. En 2026, una mascota virtual que crece puede hacer más — no solo más etapas, sino más significado por etapa. Una etapa no es solo un nuevo sprite. Una etapa es un nuevo comportamiento. Una nueva forma en que la mascota interactúa con tu día. Una nueva razón para volver a mirar. La diferencia entre un Tamagotchi de 1996 y una mascota virtual de 2026: la versión de 1996 crecía a pesar de ti — funcionaba con un reloj. La versión de 2026 crece contigo — funciona sobre tu relación.` },
      { h: `Cinco etapas, una mascota, y la persona que aparece cada día`, p: `Togthr Bot tiene cinco etapas de crecimiento: bebé, niño pequeño, adolescente, adulto y leyenda. En cada etapa, la mascota no solo se ve diferente — se comporta diferente. Una mascota bebé es dependiente y reacciona a cada interacción. Una mascota niño pequeño ha aprendido un pequeño conjunto de hábitos. Una mascota adolescente tiene estados de ánimo. Una mascota adulta tiene una personalidad asentada, moldeada por todas las interacciones anteriores. Una mascota leyenda — la etapa más rara — ha visto meses de días compartidos y lleva las marcas de ellos. Esto no es un árbol de desbloqueo cosmético. Esto es un espejo silencioso. La mascota refleja la constancia de tu relación. No como puntuación. No como nota. Como una criatura que simplemente no tendría este aspecto si tú no hubieras estado allí. Eso es lo que Tamagotchi plantó como semilla en 1996, y en lo que una mascota virtual de escritorio por fin puede crecer en 2026.` },
      { h: `En qué se convierte una mascota virtual cuando crece con dos personas`, p: `Tamagotchi era una experiencia individual. Un dispositivo, una criatura, una persona. La versión 2026 de una mascota virtual que crece añade algo que los 90 nunca imaginaron: una mascota que pertenece a dos personas. Una mascota compartida crece de forma diferente. Crece en respuesta a dos horarios, dos estados de ánimo, dos conjuntos de hábitos. Una persona la alimenta por la mañana, la otra la revisa por la noche. El cuidado constante de una mantiene viva a la mascota durante la semana ocupada de la otra. La mascota se convierte en un pequeño objeto compartido del que ambos son responsables — y cuyo cambio ambos observan. Ese observar compartido es el punto. La mascota no sustituye a la comunicación. Es una razón para comunicarse. Una pequeña razón de bajo riesgo. Dos personas que no tienen nada que decirse un martes cualquiera aún pueden decir: "Oye, la mascota creció una etapa hoy." Y eso, como inicio de conversación, vale más que cualquier notificación push.` },
      { h: `La mascota adulta y la persona adulta`, p: `Hay un momento concreto en que miras a tu mascota virtual y te das cuenta de que lleva tres meses allí. Ya no es la mancha bebé con la que empezaste. Ha pasado por las noches largas, las fechas límite, las tardes tranquilas de domingo. Ha pasado por la semana en que estabas demasiado ocupado para mirar — y seguía allí cuando volviste. En ese punto, la mascota ya no es una novedad. Es un artefacto. Es la prueba de que el tiempo ha pasado, y de que tú estuviste presente en una parte de él. Esta es la versión más adulta de la promesa Tamagotchi: no que la mascota te necesite, sino que la mascota te recuerda. El huevo Tamagotchi enseñó a una generación a cuidar. La mascota de escritorio que crece enseña algo más silencioso: que el cuidado, sostenido en el tiempo, deja huella. Y la huella es la mascota misma.` },
    ],
    cta: `Empieza una mascota virtual que crece contigo. Recuerda cada día que apareciste.`,
    faqs: [
      { q: `¿Cuántas etapas tiene una mascota virtual como Tamagotchi en Togthr?`, a: `Togthr Bot tiene cinco etapas de crecimiento: bebé, niño pequeño, adolescente, adulto y leyenda. Cada etapa cambia tanto la apariencia como el comportamiento de la mascota. La evolución se basa en la interacción continua — no hay temporizador, ni aceleración forzada, ni compras dentro de la app para saltar etapas. El crecimiento es orgánico y depende de la regularidad con la que tú y tu pareja interactúen con ella.` },
      { q: `¿La mascota muere si me olvido de revisarla?`, a: `No. Togthr Bot no muere. Es una decisión de diseño intencional. La mecánica de muerte del Tamagotchi original generaba ansiedad. Una mascota de escritorio que vive en tu barra de tareas no debería añadir estrés a tu día. Si te saltas un día o una semana, la mascota simplemente se pausa. Estará en el mismo estado cuando vuelvas. El crecimiento está ligado al cuidado acumulado, no a un temporizador de cuenta atrás.` },
      { q: `¿Dos personas pueden compartir una mascota virtual y verla crecer juntas?`, a: `Sí — esa es la idea central de Togthr. Una sola mascota está vinculada a una pareja de usuarios. Ambos pueden alimentarla, interactuar con ella y verla crecer. El crecimiento de la mascota refleja el cuidado combinado de ambos. Si una persona está ocupada una semana, las interacciones de la otra mantienen a la mascota.` },
      { q: `¿El crecimiento es aleatorio, o la mascota crece según cómo la trato?`, a: `El crecimiento es determinista pero no lineal. Depende de la constancia, variedad y frecuencia de tus interacciones — no hay un sistema oculto de puntos. La misma mascota, cuidada por dos personas diferentes, crecerá de forma ligeramente distinta con el tiempo, reflejando el ritmo único de cada relación.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr — empieza tu mascota` },
      { href: `/es/blog/tamagotchi-30th-anniversary-from-pocket-to-desktop`, label: `Del llavero al escritorio: 30 años de mascotas electrónicas` },
      { href: `/es/blog/tamagotchi-alternative-for-adults`, label: `Alternativa al Tamagotchi para adultos` },
      { href: `/es/blog/a-virtual-pet-in-a-long-relationship`, label: `Una mascota virtual en una relación larga` },
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
              <Link href={withUtm(l.href, SLUG)} className="text-pink-400 hover:underline">{l.label} →</Link>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}
