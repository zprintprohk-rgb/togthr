// src/app/[locale]/blog/celebrating-small-wins-relationship/page.tsx
//
// Job 1 daily blog 2026-08-10 (V4 compliance — quiet companion)
// Topic: celebrating small wins in a relationship — buying guide series,
//        embedding the memory engine concept.
//
// V4 compliance: quiet companion, no chat/AI conversation language.
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
import { getBlogPost } from '@/lib/blog-posts'
import { siteConfig } from '@/lib/seo'

const SLUG = `celebrating-small-wins-relationship`
const POST_DATE = `2026-08-10`

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
    summary: `Big moments get the photographs. Small wins get forgotten — and small wins are the ones that actually predict whether a relationship lasts. Teresa Amabile's progress principle [VERIFY] shows that small, frequent positive events compound more than rare triumphs. Togthr quietly remembers the small things: a pixel pet that grows through 5 stages, witnessing every tiny ritual you would otherwise forget.`,
    intro: `There is a Wednesday in every relationship. It is not an anniversary. It is not the day someone said I love you for the first time. It is the day your partner remembered you had a presentation and sent a single heart emoji at 8:47 a.m. It is the Tuesday evening when you both cooked the same thing for dinner, 300 miles apart, and laughed about it in a three-line text thread. No one takes a photograph of that Wednesday. No one writes it in a journal. And it is exactly this kind of Wednesday — this tiny, unphotographed, easy-to-forget win — that researchers say actually builds the foundation of a long relationship. The big moments are the headlines. The small wins are the paragraphs. This is a guide to noticing them, naming them, and building a relationship that remembers what your brain was never designed to keep.`,
    sections: [
      { h: `Why do small wins matter more than big milestones in a relationship?`, p: `Because small wins happen. A big milestone — an anniversary, a proposal, a move-in day — happens once a year or once a lifetime. A small win happens on a random Wednesday, and then another one on Thursday, and another one quietly the following Monday. Teresa Amabile and Steven Kramer's research on the progress principle, published in the Harvard Business Review, found that of all the events that shape inner work life, the single most powerful is making progress in meaningful work — and that small, frequent wins had a stronger effect on motivation and well-being than large, rare breakthroughs [VERIFY]. The same principle applies to relationships: a relationship is not built on the five biggest days. It is built on the five thousand smallest ones. The problem is that your brain, left to its own devices, will not remember most of them.` },
      { h: `What actually counts as a "small win" in a relationship — and what does not`, p: `A small win is not a solved problem. It is not the conversation that fixed everything. A small win is: someone noticed you were tired and made the tea without asking. You sent a photo of something dumb on your walk and they sent one back. You both fed the shared pixel pet on the same morning without coordinating it. These moments do not announce themselves. They have no ceremony and no hashtag. But in John Gottman's framework, they are exactly the thing that matters: small bids for connection that, when noticed and returned, build the 5:1 positive-to-negative interaction ratio that predicts long-term relationship stability [VERIFY]. A small win is, in the simplest terms, a moment when you felt seen — and then almost immediately forgot. The practice of celebrating small wins is the practice of not forgetting.` },
      { h: `Why your brain forgets the good stuff — and remembers the bad`, p: `The human brain has a negativity bias: negative events are processed more thoroughly and remembered more vividly than positive ones. This is evolutionarily adaptive — you need to remember the predator, not the pleasant afternoon — but it works against relationships. A study by Baumeister and colleagues, published in the Review of General Psychology, found that bad events are stronger and more persistent than good ones across nearly every domain of human experience [VERIFY]. In a relationship, this means the one tense morning stays sharp in memory while the eighty gentle mornings blur together into fog. The forgetting curve does the rest: Hermann Ebbinghaus documented that without active reinforcement, we forget roughly 50% of new information within an hour and about 70% within 24 hours [VERIFY]. The small win you felt at 8:47 a.m. is neurologically dissolving by 9:47. This is not a character flaw. It is a design limitation. And it is exactly why a memory engine — something outside your brain that remembers for you — changes the entire equation.` },
      { h: `Big milestones vs small wins: what actually compounds`, p: `| Attribute | Big milestone | Small win |\n|---|---|---|\n| Frequency | Once a year or less | Several times a week |\n| Memory | Photographed, journaled, remembered | Forgotten within hours without reinforcement |\n| Emotional weight | High — joy, relief, sometimes pressure | Low — a quiet smile, a brief warmth |\n| Compound effect | Low — too rare to compound | High — small frequent positives build trust and ratio |\n| Prediction power | Low for day-to-day happiness | High — Gottman's ratio depends on micro-interactions |\n| What your brain does | Keeps it naturally | Deletes it almost immediately |\n| What Togthr does | Remembers it too | Quietly witnesses and preserves it |` },
      { h: `How a memory engine changes the small-wins equation`, p: `The idea of a memory engine is simple: it is a system that captures the small things your brain was designed to discard. In Togthr, the memory engine is not a database of grand events. It is the quiet accumulation of every small ritual you and your partner perform together — feeding the pet, sending a one-tap signal, checking in, leaving a note. The pet grows through five stages — baby, toddler, teen, adult, legend — and that growth is not a score. It is a record. Every stage represents hundreds of small wins that were individually forgettable but collectively became a creature that did not exist before. Hidden attributes unlock ten profession skins (programmer, doctor, astronaut, chef, firefighter, and more), and one hidden gold edition exists at 1/72 odds — but none of these can be lost. The pet never resets, never punishes, and never speaks. It simply remembers, and by remembering, it makes the small things visible. That is the core proposition: a companion that does the remembering so you can do the living.` },
      { h: `Five practical ways to start catching small wins before they dissolve`, p: `(1) Name the win out loud. Research on emotional labeling suggests that putting a feeling into words reduces its intensity for negative emotions — but for positive ones, naming them makes them stickier in memory [VERIFY]. Say "that was a small win" and it becomes one. (2) Give it a witness. A shared object — a pixel pet, a shared note, a photo in a shared folder — transforms a private moment into a joint one. (3) Anchor the win to a ritual. If you and your partner always feed the pet at the same time each day, the pet's growth becomes a slow visualization of all the small wins that would have otherwise evaporated. (4) Don't rank them. A small win is not a "5 out of 10" moment. The moment you rank wins, you start comparing them, and comparison teaches your brain to dismiss the smaller ones. (5) Let something else remember. The single most effective thing you can do is to externalize memory — to hand the remembering to a system designed for it, so your brain can focus on experiencing instead of archiving.` },
    ],
    cta: `Start capturing the small wins your brain was designed to forget. Open Togthr in your browser — a pixel pet will be there, quietly growing with every small thing you share.`,
    faqs: [
      { q: `What is a "small win" in a relationship?`, a: `A small win is a low-stakes positive moment that happens during an ordinary day — a partner remembering your presentation, a shared laugh about cooking the same dinner, both of you feeding the virtual pet on the same morning. Researchers like John Gottman call these "bids for connection," and the ratio of positive to negative bids predicts long-term relationship health better than big milestone events [VERIFY].` },
      { q: `Why do small positive moments matter more than big celebrations?`, a: `Because frequency beats intensity. Teresa Amabile's research on the progress principle found that small, frequent positive events had a stronger effect on motivation and well-being than rare breakthroughs [VERIFY]. In relationships, Gottman's 5:1 ratio depends on micro-interactions, not anniversary dinners — the five thousand smallest moments build the foundation that the five biggest ones decorate.` },
      { q: `How can I remember more of the good moments in my relationship?`, a: `The most effective approach is externalizing memory. The human brain naturally forgets about 70% of new information within 24 hours (Ebbinghaus forgetting curve [VERIFY]), and it has a negativity bias that prioritizes bad events over good ones. A shared system — a journal, a photo habit, or a virtual pet that grows with your shared rituals — captures the small wins your brain lets go.` },
      { q: `Does Togthr help with celebrating small wins?`, a: `Yes — Togthr was designed as a quiet memory engine. The pixel pet grows through five stages (baby to legend) based on total shared attention, not a streak. Every feed, signal, and check-in becomes part of the pet's growth, turning individually forgettable moments into a visible, cumulative record. The pet never resets, never punishes, and never speaks — it just remembers.` },
    ],
    links: [
      { href: `/en`, label: `Togthr home` },
      { href: `/en/pricing`, label: `Togthr pricing` },
      { href: `/en/blog/love-streak-science`, label: `Love streak science: why daily check-ins beat grand gestures` },
      { href: `/en/blog/a-virtual-pet-in-a-long-relationship`, label: `A virtual pet in a long relationship` },
      { href: `/en/blog/low-pressure-companion-app`, label: `A low-pressure companion app: no streaks, no guilt` },
    ],
  },

  'zh-cn': {
    summary: `大事有照片，小事被忘记 —— 而正是这些小事预示着一段关系能否长久。Teresa Amabile 的进展原则 [VERIFY] 表明：小而频繁的积极事件比罕见的大胜利更有复利效应。Togthr 安静地记住小事：一只像素宠物经历 5 个成长阶段，见证每一个你本来会忘记的小小仪式。`,
    intro: `每段关系里都有一个星期三。不是纪念日，也不是第一次说"我爱你"的那天。是你伴侣记得你今天有汇报、在早上 8:47 发来一颗心的那天。是一个周二晚上，你们相隔 300 公里却做了同一道菜、在三行短信里笑出声的那天。没人给那个星期三拍照。没人把它写进日记。而正是这种星期三 —— 这种微小的、没被拍下来的、容易忘记的胜利 —— 研究者说，才真正构成了一段长期关系的地基。大事是标题，小事是正文。这是一份指南，教你如何注意到它们、命名它们，并建立一段能记住你的大脑本来设计好要忘记的那些东西的关系。`,
    sections: [
      { h: `为什么小胜利比大里程碑对关系更重要？`, p: `因为小胜利经常发生。一个大里程碑 —— 周年纪念、求婚、搬进新家 —— 一年或一辈子才有一次。而一个小胜利发生在一个随机的星期三，周四又发生一个，下周一又悄悄地发生一个。Teresa Amabile 和 Steven Kramer 关于进展原则的研究发表在《哈佛商业评论》上，他们发现：在影响内在工作生活的所有事件中，最强大的是在有意义的工作中取得进展 —— 而且小而频繁的胜利对动力和幸福感的影响，远大于罕见的大突破 [VERIFY]。同样的原则也适用于关系：一段关系不是建在最重要的五天上的，而是建在五千个最微小的日子上的。问题在于：你的大脑，如果放任自流，会忘记其中的大多数。` },
      { h: `什么才算关系中的"小胜利" —— 什么不算`, p: `小胜利不是一个被解决了的问题，不是那场"把一切都说开了"的对话。小胜利是：有人注意到你累了，没问就端来了茶。你散步时拍了一张傻东西发过去，对方也回了一张。你们俩不约而同地在同一个早晨喂了共享的像素宠物。这些时刻不会自己宣告到来，没有仪式，没有话题标签。但在 John Gottman 的框架里，它们恰好是最重要的东西：小小的连接请求，一旦被注意到、被回应，就能建立起预测长期关系稳定性的 5:1 正负互动比 [VERIFY]。一个小胜利，用最简单的话说，就是：一个你感到"被看见"的瞬间 —— 然后几乎立刻就忘了。庆祝小胜利的练习，就是不忘记的练习。` },
      { h: `为什么你的大脑会忘记好事 —— 却记住坏事`, p: `人类大脑有负面偏见：负面事件比正面事件被处理得更彻底，记得更鲜活。这在进化上是适应性的 —— 你需要记住捕食者，而不是那个愉快的下午 —— 但这对于关系是有害的。Baumeister 及其同事的研究发表在《普通心理学评论》上，他们发现：在人类经验的几乎每一个领域，坏事都比好事更强烈、更持久 [VERIFY]。在一段关系中，这意味着那个紧张的一个早晨在记忆中锋利清晰，而那八十个温柔的早晨则模糊地混在了一起。遗忘曲线完成了剩下的工作：Hermann Ebbinghaus 记录到，如果没有主动强化，我们大约在一小时内忘记 50% 的新信息，在 24 小时内忘记约 70% [VERIFY]。你在早上 8:47 感到的那个小胜利，在 9:47 就已经从神经层面开始消融了。这不是性格缺陷，而是一个设计局限。这正是为什么记忆引擎 —— 某种在你大脑之外替你记住的东西 —— 会彻底改变这个等式。` },
      { h: `大里程碑 vs 小胜利：什么才是真正复利的`, p: `| 属性 | 大里程碑 | 小胜利 |\n|---|---|---|\n| 频率 | 一年或更少一次 | 一周多次 |\n| 记忆 | 被拍照、写日记、记住 | 几小时内就忘了 |\n| 情绪重量 | 高 —— 喜悦、释怀，有时也有压力 | 低 —— 安静一笑，片刻暖意 |\n| 复利效应 | 低 —— 太罕见，无法复利 | 高 —— 小而频繁的正面事件建立信任与比例 |\n| 预测力 | 对日常幸福感低 | 高 —— Gottman 的比例依赖于微互动 |\n| 你的大脑 | 自然保留 | 几乎立刻删除 |\n| Togthr 的做法 | 也记住它 | 安静见证并保存它 |` },
      { h: `记忆引擎如何改变小胜利的等式`, p: `记忆引擎的概念很简单：它是一个系统，捕捉你的大脑被设计来丢弃的那些小事。在 Togthr 里，记忆引擎不是一个重大事件数据库，而是你和伴侣共同完成的每一个小仪式的安静积累 —— 喂宠物、发送一键信号、打卡、留便签。宠物经历五个成长阶段 —— 婴儿、学步、少年、成年、传说 —— 这个成长不是一个分数，而是一份记录。每一个阶段代表了几百个单独来看微不足道、但汇聚起来却变成了一只原来没有的生物的小胜利。隐藏属性解锁十种职业皮肤（程序员、医生、太空人、厨师、消防员等），还有一只 1/72 概率的隐藏金款 —— 但没有一样会丢失。宠物从不归零，从不惩罚，从不说话。它只是记住。而通过记住，它让小事变得可见。这就是核心命题：一个替你承担记忆的陪伴，让你可以去好好生活。` },
      { h: `五个实际方法：在小胜利消散之前抓住它们`, p: `(1) 大声说出这个胜利。关于情绪标注的研究表明：把一种感受变成语言，对负面情绪会降低其强度 —— 但对正面情绪，命名它会让它在记忆中更牢固 [VERIFY]。说一句"这是一个小胜利"，它就是了。(2) 给它一个见证者。一个共享对象 —— 一只像素宠物、一条共享笔记、一张放在共享文件夹里的照片 —— 把一个私人时刻变成共同时刻。(3) 把胜利锚定在一个仪式上。如果你和伴侣每天都在同一时间喂宠物，宠物的成长就变成了所有本来会蒸发的小胜利的缓慢可视化。(4) 不要给它们打分。一个小胜利不是一个"8.5 分"的时刻。一旦你开始打分，你就开始比较，而比较会教会你的大脑去忽略较小的那些。(5) 让别的东西来记住。你能做的最有效的事，就是把记忆外包 —— 把"记住"这件事交给一个为此设计的系统，让你的大脑专注于体验而不是存档。` },
    ],
    cta: `开始捕捉那些你的大脑被设计来忘记的小胜利。在浏览器里打开 Togthr —— 一只像素宠物会在那里，随着你分享的每一件小事安静成长。`,
    faqs: [
      { q: `什么是关系中的"小胜利"？`, a: `小胜利是一个发生在普通日子里的低压正面时刻 —— 伴侣记得你的汇报、两人做了同一道菜引发的笑声、你们在同一天早晨不约而同地喂了桌面宠物。研究者如 John Gottman 称这些为"连接请求"，而正面与负面请求的比例，比大里程碑事件更能预测长期关系健康 [VERIFY]。` },
      { q: `为什么小正面时刻比大庆祝活动更重要？`, a: `因为频率胜过强度。Teresa Amabile 关于进展原则的研究发现，小而频繁的正面事件对动力和幸福感的影响，比罕见的大突破更强 [VERIFY]。在关系中，Gottman 的 5:1 比例依赖于微互动，而不是纪念日晚餐 —— 五千个最小的时刻建造地基，五个最大的时刻装饰它。` },
      { q: `怎样才能记住关系中更多的好时刻？`, a: `最有效的方法是把记忆外部化。人类大脑在 24 小时内会自然忘记约 70% 的新信息（Ebbinghaus 遗忘曲线 [VERIFY]），而且有负面偏见，优先记住坏事而非好事。一个共享系统 —— 日记、拍照习惯，或一只随着共享仪式成长的虚拟宠物 —— 能抓住那些你的大脑放手的小胜利。` },
      { q: `Togthr 能帮助庆祝小胜利吗？`, a: `能 —— Togthr 被设计为一个安静的记忆引擎。像素宠物基于共同的关注总量经历五个成长阶段（婴儿到传说），而不是基于连胜。每一次喂食、信号、打卡，都成为宠物成长的一部分，把一个个微不足道的时刻变成可见的累积记录。宠物从不归零，从不惩罚，从不说话 —— 它只是记住。` },
    ],
    links: [
      { href: `/zh-cn`, label: `Togthr 首页` },
      { href: `/zh-cn/pricing`, label: `Togthr 定价` },
      { href: `/zh-cn/blog/love-streak-science`, label: `爱情连胜科学：为什么每日打卡比宏大举动更有效` },
      { href: `/zh-cn/blog/a-virtual-pet-in-a-long-relationship`, label: `长期关系里的虚拟宠物` },
      { href: `/zh-cn/blog/low-pressure-companion-app`, label: `低压陪伴 App：没有连胜，没有愧疚` },
    ],
  },

  'zh-tw': {
    summary: `大事有照片，小事被忘記 —— 而正是這些小事預示著一段關係能否長久。Teresa Amabile 的進展原則 [VERIFY] 表明：小而頻繁的積極事件比罕見的大勝利更有複利效應。Togthr 安靜地記住小事：一隻像素寵物經歷 5 個成長階段，見證每一個你本來會忘記的小小儀式。`,
    intro: `每段關係裡都有一個星期三。不是紀念日，也不是第一次說「我愛你」的那天。是你伴侶記得你今天有匯報、在早上 8:47 發來一顆心的那天。是一個週二晚上，你們相隔 300 公里卻做了同一道菜、在三行簡訊裡笑出聲的那天。沒人給那個星期三拍照。沒人把它寫進日記。而正是這種星期三 —— 這種微小的、沒被拍下來的、容易忘記的勝利 —— 研究者說，才真正構成了一段長期關係的地基。大事是標題，小事是正文。這是一份指南，教你如何注意到它們、命名它們，並建立一段能記住你的大腦本來設計好要忘記的那些東西的關係。`,
    sections: [
      { h: `為什麼小勝利比大里程碑對關係更重要？`, p: `因為小勝利經常發生。一個大里程碑 —— 週年紀念、求婚、搬進新家 —— 一年或一輩子才有一次。而一個小勝利發生在一個隨機的星期三，週四又發生一個，下週一又悄悄地發生一個。Teresa Amabile 和 Steven Kramer 關於進展原則的研究發表在《哈佛商業評論》上，他們發現：在影響內在工作生活的所有事件中，最強大的是在有意義的工作中取得進展 —— 而且小而頻繁的勝利對動力和幸福感的影響，遠大於罕見的大突破 [VERIFY]。同樣的原則也適用於關係：一段關係不是建在最重要的五天上的，而是建在五千個最微小的日子上的。問題在於：你的大腦，如果放任自流，會忘記其中的大多數。` },
      { h: `什麼才算關係中的「小勝利」 —— 什麼不算`, p: `小勝利不是一個被解決了的問題，不是那場「把一切都說開了」的對話。小勝利是：有人注意到你累了，沒問就端來了茶。你散步時拍了一張傻東西傳過去，對方也回了一張。你們倆不約而同地在同一個早晨餵了共享的像素寵物。這些時刻不會自己宣告到來，沒有儀式，沒有話題標籤。但在 John Gottman 的框架裡，它們恰好是最重要的東西：小小的連結請求，一旦被注意到、被回應，就能建立起預測長期關係穩定性的 5:1 正負互動比 [VERIFY]。一個小勝利，用最簡單的話說，就是：一個你感到「被看見」的瞬間 —— 然後幾乎立刻就忘了。慶祝小勝利的練習，就是不忘記的練習。` },
      { h: `為什麼你的大腦會忘記好事 —— 卻記住壞事`, p: `人類大腦有負面偏見：負面事件比正面事件被處理得更徹底，記得更新鮮。這在進化上是適應性的 —— 你需要記住捕食者，而不是那個愉快的下午 —— 但這對於關係是有害的。Baumeister 及其同事的研究發表在《普通心理學評論》上，他們發現：在人類經驗的幾乎每一個領域，壞事都比好事更強烈、更持久 [VERIFY]。在一段關係中，這意味著那個緊張的一個早晨在記憶中鋒利清晰，而那八十個溫柔的早晨則模糊地混在了一起。遺忘曲線完成了剩下的工作：Hermann Ebbinghaus 記錄到，如果沒有主動強化，我們大約在一小時內忘記 50% 的新資訊，在 24 小時內忘記約 70% [VERIFY]。你在早上 8:47 感到的那個小勝利，在 9:47 就已經從神經層面開始消融了。這不是性格缺陷，而是一個設計局限。這正是為什麼記憶引擎 —— 某種在你大腦之外替你記住的東西 —— 會徹底改變這個等式。` },
      { h: `大里程碑 vs 小勝利：什麼才是真正複利的`, p: `| 屬性 | 大里程碑 | 小勝利 |\n|---|---|---|\n| 頻率 | 一年或更少一次 | 一週多次 |\n| 記憶 | 被拍照、寫日記、記住 | 幾小時內就忘了 |\n| 情緒重量 | 高 —— 喜悅、釋懷，有時也有壓力 | 低 —— 安靜一笑，片刻暖意 |\n| 複利效應 | 低 —— 太罕見，無法複利 | 高 —— 小而頻繁的正面事件建立信任與比例 |\n| 預測力 | 對日常幸福感低 | 高 —— Gottman 的比例依賴於微互動 |\n| 你的大腦 | 自然保留 | 幾乎立刻刪除 |\n| Togthr 的做法 | 也記住它 | 安靜見證並保存它 |` },
      { h: `記憶引擎如何改變小勝利的等式`, p: `記憶引擎的概念很簡單：它是一個系統，捕捉你的大腦被設計來丟棄的那些小事。在 Togthr 裡，記憶引擎不是一個重大事件資料庫，而是你和伴侶共同完成的每一個小儀式的安靜積累 —— 餵寵物、發送一鍵訊號、打卡、留便簽。寵物經歷五個成長階段 —— 嬰兒、學步、少年、成年、傳說 —— 這個成長不是一個分數，而是一份記錄。每一個階段代表了幾百個單獨來看微不足道、但匯聚起來卻變成了一隻原來沒有的生物的小勝利。隱藏屬性解鎖十種職業造型（程式設計師、醫生、太空人、廚師、消防員等），還有一隻 1/72 機率的隱藏金款 —— 但沒有一樣會丟失。寵物從不歸零，從不懲罰，從不說話。牠只是記住。而通過記住，牠讓小事變得可見。這就是核心命題：一個替你承擔記憶的陪伴，讓你可以去好好生活。` },
      { h: `五個實際方法：在小勝利消散之前抓住它們`, p: `(1) 大聲說出這個勝利。關於情緒標註的研究表明：把一種感受變成語言，對負面情緒會降低其強度 —— 但對正面情緒，命名它會讓它在記憶中更牢固 [VERIFY]。說一句「這是一個小勝利」，它就是。(2) 給它一個見證者。一個共享對象 —— 一隻像素寵物、一條共享筆記、一張放在共享資料夾裡的照片 —— 把一個私人時刻變成共同時刻。(3) 把勝利錨定在一個儀式上。如果你和伴侶每天都在同一時間餵寵物，寵物的成長就變成了所有本來會蒸發的小勝利的緩慢可視化。(4) 不要給它們打分。一個小勝利不是一個「8.5 分」的時刻。一旦你開始打分，你就開始比較，而比較會教會你的大腦去忽略較小的那些。(5) 讓別的東西來記住。你能做的最有效的事，就是把記憶外包 —— 把「記住」這件事交給一個為此設計的系統，讓你的大腦專注於體驗而不是存檔。` },
    ],
    cta: `開始捕捉那些你的大腦被設計來忘記的小勝利。在瀏覽器裡打開 Togthr —— 一隻像素寵物會在那裡，隨著你分享的每一件小事安靜成長。`,
    faqs: [
      { q: `什麼是關係中的「小勝利」？`, a: `小勝利是一個發生在普通日子裡的關係小正面時刻 —— 伴侶記得你的匯報、兩人做了同一道菜引發的笑聲、你們在同一天早晨不約而同地餵了桌面寵物。研究者如 John Gottman 稱這些為「連結請求」，而正面與負面請求的比例，比大里程碑事件更能預測長期關係健康 [VERIFY]。` },
      { q: `為什麼小正面時刻比大慶祝活動更重要？`, a: `因為頻率勝過強度。Teresa Amabile 關於進展原則的研究發現，小而頻繁的正面事件對動力和幸福感的影響，比罕見的大突破更強 [VERIFY]。在關係中，Gottman 的 5:1 比例依賴於微互動，而不是紀念日晚餐 —— 五千個最小的時刻建造地基，五個最大的時刻裝飾它。` },
      { q: `怎樣才能記住關係中更多的好時刻？`, a: `最有效的方法是把記憶外部化。人類大腦在 24 小時內會自然忘記約 70% 的新資訊（Ebbinghaus 遺忘曲線 [VERIFY]），而且有負面偏見，優先記住壞事而非好事。一個共享系統 —— 日記、拍照習慣，或一隻隨著共享儀式成長的虛擬寵物 —— 能抓住那些你的大腦放手的小勝利。` },
      { q: `Togthr 能幫助慶祝小勝利嗎？`, a: `能 —— Togthr 被設計為一個安靜的記憶引擎。像素寵物基於共同的關注總量經歷五個成長階段（嬰兒到傳說），而不是基於連勝。每一次餵食、訊號、打卡，都成為寵物成長的一部分，把一個個微不足道的時刻變成可見的累積記錄。寵物從不歸零，從不懲罰，從不說話 —— 牠只是記住。` },
    ],
    links: [
      { href: `/zh-tw`, label: `Togthr 首頁` },
      { href: `/zh-tw/pricing`, label: `Togthr 定價` },
      { href: `/zh-tw/blog/love-streak-science`, label: `愛情連勝科學：為什麼每日打卡比宏大舉動更有效` },
      { href: `/zh-tw/blog/a-virtual-pet-in-a-long-relationship`, label: `長期關係裡的虛擬寵物` },
      { href: `/zh-tw/blog/low-pressure-companion-app`, label: `低壓陪伴 App：沒有連勝，沒有愧疚` },
    ],
  },

  ja: {
    summary: `大きな瞬間は写真に残る。小さな勝利は忘れられる —— そして関係が続くかどうかを実際に予測するのは、小さな勝利の方だ。Teresa Amabile の進捗原則 [VERIFY] は、小さく頻繁なポジティブな出来事が、まれな大勝利よりも複利で積み上がることを示す。Togthr は静かに小さなことを覚えている：5段階で成長するピクセルペットが、あなたが忘れてしまうであろうすべての小さな儀式を見守る。`,
    intro: `どんな関係にも、ある水曜日がある。記念日ではない。誰かが初めて「愛してる」と言った日でもない。パートナーがあなたのプレゼンを覚えていて、朝8:47にハートの絵文字をひとつ送ってくれた日だ。300マイル離れて同じ料理を夕食に作り、3行のテキストで笑い合った火曜の夜だ。誰もその水曜日の写真を撮らない。誰も日記に書かない。そして、まさにこの種の水曜日 —— この小さな、写真に撮られない、忘れやすい勝利こそが、研究者によれば、長い関係の基盤を実際に作るものだ。大きな瞬間は見出し。小さな勝利は本文。これは、それらに気づき、名前をつけ、あなたの脳がもともと保持するようにできていないものを覚えている関係を築くためのガイドだ。`,
    sections: [
      { h: `なぜ小さな勝利は、大きな節目よりも関係にとって重要なのか？`, p: `小さな勝利は実際に起こるからだ。大きな節目 —— 記念日、プロポーズ、引っ越しの日 —— は年に一度か、人生に一度だ。小さな勝利は、ランダムな水曜日に起こり、木曜日にもうひとつ、次の月曜日にもうひとつ静かに起こる。Teresa Amabile と Steven Kramer の進捗原則に関する研究（ハーバード・ビジネス・レビュー掲載）は、内的な仕事生活を形作るすべての出来事の中で、最も強力なのは意味のある仕事で進捗することであり、小さく頻繁な勝利が、まれな大突破よりもモチベーションと幸福感に強い効果を持つことを発見した [VERIFY]。同じ原則が関係にも当てはまる。関係は、いちばん大きな5日間で作られるのではない。いちばん小さな5000日で作られるのだ。問題は、あなたの脳は、放っておけばそのほとんどを覚えていないということだ。` },
      { h: `関係における「小さな勝利」とは何か —— そして何が違うか`, p: `小さな勝利は、解決された問題ではない。「すべてを解決した」会話でもない。小さな勝利とは：誰かがあなたの疲れに気づき、頼まれなくてもお茶を入れてくれた。散歩中に撮ったちょっとしたものを送ったら、相手も送り返してくれた。ふたりとも同じ朝、示し合わせずに共有のピクセルペットに餌をやった。これらの瞬間は自分から名乗り出ない。儀式もハッシュタグもない。しかし John Gottman の枠組みでは、それらこそがまさに重要なものだ。気づかれ、返される小さな「つながりのビッド」が、長期的な関係の安定を予測する5:1のポジティブ対ネガティブ比率を築く [VERIFY]。小さな勝利とは、最も簡単に言えば、「見られている」と感じた瞬間 —— そしてほとんどすぐに忘れた瞬間のことだ。小さな勝利を祝う実践とは、忘れない実践のことだ。` },
      { h: `なぜ脳は良いことを忘れ、悪いことを覚えているのか`, p: `人間の脳にはネガティビティ・バイアスがある。ネガティブな出来事はポジティブな出来事よりも徹底的に処理され、より鮮明に記憶される。これは進化的に適応的だ —— 捕食者を覚える必要があり、気持ちの良い午後ではない —— しかし関係には逆効果だ。Baumeister らの研究（Review of General Psychology 掲載）は、人間経験のほぼすべての領域で、悪い出来事は良い出来事よりも強く、より持続することを発見した [VERIFY]。関係において、これは、あの緊張した朝のひとつが記憶の中で鋭く残り、80の優しい朝は霧のように混ざり合ってしまうことを意味する。忘却曲線が残りを仕上げる。Hermann Ebbinghaus は、積極的な強化がなければ、新しい情報の約50%を1時間以内に、約70%を24時間以内に忘れることを記録した [VERIFY]。朝8:47に感じた小さな勝利は、9:47には神経学的に溶け始めている。これは性格の欠陥ではない。設計上の制約だ。そして、これこそが記憶エンジン —— あなたの脳の外で覚えていてくれる何か —— が方程式全体を変える理由だ。` },
      { h: `大きな節目 vs 小さな勝利：実際に複利で積み上がるのはどちらか`, p: `| 属性 | 大きな節目 | 小さな勝利 |\n|---|---|---|\n| 頻度 | 年1回以下 | 週に数回 |\n| 記憶 | 写真、日記、覚えている | 数時間で忘れる |\n| 感情的重量 | 高い —— 喜び、安堵、時にプレッシャー | 低い —— 静かな微笑み、短い温かさ |\n| 複利効果 | 低い —— まれすぎて複利にならない | 高い —— 小さく頻繁なポジティブが信頼と比率を築く |\n| 予測力 | 日常の幸福には低い | 高い —— Gottman の比率はミクロ相互作用に依存 |\n| 脳の反応 | 自然に保持する | ほぼ即座に削除する |\n| Togthr の役割 | それも覚えている | 静かに見守り、保存する |` },
      { h: `記憶エンジンが小さな勝利の方程式をどう変えるか`, p: `記憶エンジンの考え方はシンプルだ。それは、あなたの脳が捨てるようにできている小さなことを捉えるシステムだ。Togthr では、記憶エンジンは大きな出来事のデータベースではない。あなたとパートナーが一緒に行うすべての小さな儀式 —— ペットに餌をやること、ワンタップのシグナルを送ること、チェックイン、メモを残すこと —— の静かな蓄積だ。ペットは5つの段階 —— ベビー、トドラー、ティーン、アダルト、レジェンド —— を経て成長し、その成長はスコアではない。記録だ。各段階は、個別には忘れられても、集合的には以前には存在しなかった生き物になった何百もの小さな勝利を表している。隠し属性が10の職業スキン（プログラマー、医者、宇宙飛行士、シェフ、消防士など）をアンロックし、1/72の確率で隠れゴールドエディションも存在する —— しかし、どれも失われることはない。ペットは決してリセットせず、罰せず、話さない。ただ覚えている。そして覚えることで、小さなことを可視化する。これが核心的な提案だ。記憶を引き受けるコンパニオンがいることで、あなたは生きることに集中できる。` },
      { h: `小さな勝利が消える前に捕まえる5つの実践的な方法`, p: `(1) 勝利を声に出す。感情のラベリングに関する研究は、感情を言葉にすることはネガティブな感情の強度を下げるが、ポジティブな感情にとっては、名付けることで記憶により定着しやすくなることを示唆している [VERIFY]。「これは小さな勝利だ」と言えば、それが小さな勝利になる。(2) 証人を与える。共有された対象 —— ピクセルペット、共有メモ、共有フォルダの写真 —— は、プライベートな瞬間を共同のものに変える。(3) 勝利を儀式に結びつける。あなたとパートナーが毎日同じ時間にペットに餌をやれば、ペットの成長は、そうでなければ蒸発していたすべての小さな勝利のゆっくりとした可視化になる。(4) ランク付けしない。小さな勝利は「10点中5点」の瞬間ではない。ランク付けを始めた瞬間に比較が始まり、比較は脳に小さい方を無視するよう教える。(5) 他の何かに覚えさせておく。あなたができる最も効果的なことは、記憶を外部化すること —— 「覚えること」をそのために設計されたシステムに任せ、あなたの脳がアーカイブではなく体験に集中できるようにすることだ。` },
    ],
    cta: `あなたの脳が忘れるようにできている小さな勝利を捕まえ始めよう。ブラウザで Togthr を開いて —— ピクセルペットがそこにいる。あなたが共有するすべての小さなこととともに、静かに育っている。`,
    faqs: [
      { q: `関係における「小さな勝利」とは？`, a: `小さな勝利とは、普通の日に起こる低プレッシャーのポジティブな瞬間です —— パートナーがあなたのプレゼンを覚えていたこと、同じ料理を作ったことで生まれた笑い、示し合わせずに同じ朝デスクトップペットに餌をやったこと。John Gottman のような研究者はこれらを「つながりのビッド」と呼び、ポジティブ対ネガティブのビッドの比率は、大きな節目のイベントよりも長期的な関係の健康をよく予測します [VERIFY]。` },
      { q: `なぜ小さなポジティブな瞬間の方が大きなお祝いより重要なのか？`, a: `頻度が強度に勝るからです。Teresa Amabile の進捗原則の研究は、小さく頻繁なポジティブな出来事が、まれな大突破よりもモチベーションと幸福感に強い効果を持つことを発見しました [VERIFY]。関係において、Gottman の5:1比率は記念日のディナーではなくミクロ相互作用に依存します —— 5000の最も小さな瞬間が基盤を築き、5つの最も大きな瞬間がそれを飾ります。` },
      { q: `関係の中の良い瞬間をより多く覚えるには？`, a: `最も効果的なアプローチは記憶の外部化です。人間の脳は24時間以内に新しい情報の約70%を自然に忘れ（Ebbinghaus の忘却曲線 [VERIFY]）、悪い出来事を良い出来事より優先するネガティビティ・バイアスを持っています。共有されたシステム —— 日記、写真の習慣、または共有の儀式とともに育つバーチャルペット —— が、あなたの脳が手放す小さな勝利を捉えます。` },
      { q: `Togthr は小さな勝利を祝うのに役立つ？`, a: `はい —— Togthr は静かな記憶エンジンとして設計されました。ピクセルペットは、ストリークではなく、共有された総合的な関心に基づいて5段階（ベビーからレジェンドまで）を成長します。すべての餌やり、シグナル、チェックインがペットの成長の一部となり、個別には取るに足らない瞬間を、目に見える累積的な記録に変えます。ペットは決してリセットせず、罰せず、話しません —— ただ覚えています。` },
    ],
    links: [
      { href: `/ja`, label: `Togthr ホーム` },
      { href: `/ja/pricing`, label: `Togthr 料金` },
      { href: `/ja/blog/love-streak-science`, label: `ラブストリークの科学：毎日のチェックインが大きなジェスチャーを超える理由` },
      { href: `/ja/blog/a-virtual-pet-in-a-long-relationship`, label: `長い関係の中のバーチャルペット` },
      { href: `/ja/blog/low-pressure-companion-app`, label: `プレッシャーのないコンパニオンアプリ：ストリークも罪悪感もなし` },
    ],
  },

  ko: {
    summary: `큰 순간은 사진으로 남습니다. 작은 승리는 잊힙니다 — 그리고 관계가 지속될지를 실제로 예측하는 것은 작은 승리입니다. Teresa Amabile의 진척 원칙 [VERIFY]은 작고 빈번한 긍정적 사건이 드문 대승리보다 더 복리로 쌓인다는 것을 보여줍니다. Togthr는 조용히 작은 것들을 기억합니다: 5단계로 성장하는 픽셀 펫이, 당신이 잊어버릴 모든 작은 의식을 지켜봅니다.`,
    intro: `모든 관계에는 어떤 수요일이 있습니다. 기념일이 아닙니다. 누군가 처음으로 사랑한다고 말한 날도 아닙니다. 파트너가 당신의 발표를 기억하고 아침 8시 47분에 하트 이모지를 하나 보내준 날입니다. 500km 떨어져서 같은 저녁을 만들어 먹고, 세 줄의 문자로 함께 웃은 화요일 밤입니다. 아무도 그 수요일의 사진을 찍지 않습니다. 아무도 일기에 쓰지 않습니다. 그리고 바로 이런 종류의 수요일 — 이 작고, 사진에 담기지 않고, 잊기 쉬운 승리 — 이 연구자들에 따르면 실제로 긴 관계의 기초를 쌓는 것입니다. 큰 순간은 헤드라인입니다. 작은 승리는 본문입니다. 이것은 그것들을 알아차리고, 이름 붙이고, 당신의 뇌가 원래 유지하도록 설계되지 않은 것을 기억하는 관계를 만드는 가이드입니다.`,
    sections: [
      { h: `왜 작은 승리가 큰 이정표보다 관계에 더 중요한가요?`, p: `작은 승리는 실제로 일어나기 때문입니다. 큰 이정표 — 기념일, 프로포즈, 이사 온 날 — 는 일 년에 한 번, 혹은 평생에 한 번입니다. 작은 승리는 무작위 수요일에 일어나고, 목요일에 또 하나, 다음 월요일에 또 하나 조용히 일어납니다. Teresa Amabile과 Steven Kramer의 진척 원칙에 관한 연구(Harvard Business Review 게재)는 내적 직장 생활을 형성하는 모든 사건 중 가장 강력한 것은 의미 있는 일에서의 진척이며, 작고 빈번한 승리가 드문 대돌파보다 동기와 웰빙에 더 강한 효과를 가진다는 것을 발견했습니다 [VERIFY]. 같은 원칙이 관계에도 적용됩니다. 관계는 가장 큰 5일로 만들어지는 것이 아닙니다. 가장 작은 5,000일로 만들어집니다. 문제는, 당신의 뇌는 그냥 두면 대부분을 기억하지 못한다는 것입니다.` },
      { h: `관계에서 "작은 승리"란 무엇인가 — 그리고 무엇이 아닌가`, p: `작은 승리는 해결된 문제가 아닙니다. "모든 것을 해결한" 대화도 아닙니다. 작은 승리란: 누군가 당신의 피로를 알아채고, 묻지도 않고 차를 가져다 준 것. 산책 중 찍은 별것 아닌 사진을 보냈더니 상대도 답장을 보내온 것. 둘 다 같은 아침에, 약속하지도 않고 공유 픽셀 펫에게 먹이를 준 것. 이 순간들은 스스로 알리지 않습니다. 의식도, 해시태그도 없습니다. 그러나 John Gottman의 프레임워크에서, 그것들이야말로 정말로 중요한 것입니다. 알아차려지고 응답되는 작은 연결 요청이, 장기적 관계 안정성을 예측하는 5:1 긍정 대 부정 상호작용 비율을 쌓습니다 [VERIFY]. 작은 승리란, 가장 간단히 말해, "보여졌다"고 느낀 순간 — 그리고 거의 즉시 잊은 순간입니다. 작은 승리를 축하하는 실천은, 잊지 않는 실천입니다.` },
      { h: `왜 뇌는 좋은 것은 잊고 나쁜 것은 기억하는가`, p: `인간의 뇌에는 부정성 편향이 있습니다. 부정적 사건은 긍정적 사건보다 더 철저히 처리되고 더 생생하게 기억됩니다. 이것은 진화적으로 적응적입니다 — 포식자를 기억해야지, 기분 좋은 오후가 아닙니다 — 그러나 관계에는 역효과입니다. Baumeister와 동료들의 연구(Review of General Psychology 게재)는 인간 경험의 거의 모든 영역에서 나쁜 사건이 좋은 사건보다 더 강하고 더 지속적이라는 것을 발견했습니다 [VERIFY]. 관계에서 이것은, 그 긴장된 어느 아침 하나가 기억 속에서 날카롭게 남고, 80개의 부드러운 아침은 안개처럼 섞여 사라진다는 것을 의미합니다. 망각 곡선이 나머지를 마무리합니다. Hermann Ebbinghaus는 적극적 강화 없이는 새로운 정보의 약 50%를 1시간 내에, 약 70%를 24시간 내에 잊는다고 기록했습니다 [VERIFY]. 아침 8시 47분에 느낀 작은 승리는 9시 47분에 신경학적으로 녹기 시작합니다. 이것은 성격 결함이 아닙니다. 설계상의 한계입니다. 바로 이것이 기억 엔진 — 당신의 뇌 바깥에서 기억해주는 무언가 — 이 전체 방정식을 바꾸는 이유입니다.` },
      { h: `큰 이정표 vs 작은 승리: 실제로 복리로 쌓이는 것은`, p: `| 속성 | 큰 이정표 | 작은 승리 |\n|---|---|---|\n| 빈도 | 연 1회 이하 | 주 여러 번 |\n| 기억 | 사진, 일기, 기억됨 | 몇 시간 내에 잊힘 |\n| 감정적 무게 | 높음 — 기쁨, 안도, 때로는 압박 | 낮음 — 조용한 미소, 짧은 온기 |\n| 복리 효과 | 낮음 — 너무 드물어 복리 불가 | 높음 — 작고 빈번한 긍정이 신뢰와 비율을 구축 |\n| 예측력 | 일상 행복에는 낮음 | 높음 — Gottman의 비율은 미세 상호작용에 의존 |\n| 뇌의 반응 | 자연스럽게 유지 | 거의 즉시 삭제 |\n| Togthr의 역할 | 그것도 기억함 | 조용히 지켜보고 보존함 |` },
      { h: `기억 엔진이 작은 승리의 방정식을 어떻게 바꾸는가`, p: `기억 엔진의 아이디어는 간단합니다. 그것은 당신의 뇌가 버리도록 설계된 작은 것들을 포착하는 시스템입니다. Togthr에서 기억 엔진은 큰 사건의 데이터베이스가 아닙니다. 그것은 당신과 파트너가 함께 수행하는 모든 작은 의식 — 펫 먹이기, 원탭 시그널 보내기, 체크인, 메모 남기기 — 의 조용한 축적입니다. 펫은 다섯 단계 — 베이비, 토들러, 틴, 어덜트, 레전드 — 를 거쳐 성장하며, 그 성장은 점수가 아닙니다. 기록입니다. 각 단계는 개별적으로는 잊힐 수 있지만 집합적으로는 이전에 존재하지 않았던 생명체가 된 수백 가지 작은 승리를 나타냅니다. 숨겨진 속성이 열 가지 직업 스킨(프로그래머, 의사, 우주비행사, 셰프, 소방관 등)을 잠금 해제하고, 1/72 확률의 숨겨진 골드 에디션도 존재합니다 — 그러나 어느 것도 잃을 수 없습니다. 펫은 결코 리셋되지 않고, 처벌하지 않으며, 말하지 않습니다. 그냥 기억합니다. 그리고 기억함으로써, 작은 것들을 가시화합니다. 이것이 핵심 제안입니다. 기억을 대신承担하는 컴패니언이 있어, 당신은 살아가는 데 집중할 수 있습니다.` },
      { h: `작은 승리가 사라지기 전에 붙잡는 다섯 가지 실용적 방법`, p: `(1) 승리를 소리 내어 말하세요. 감정 라벨링에 관한 연구는 감정을 말로 표현하는 것이 부정적 감정의 강도는 낮추지만, 긍정적 감정에게는 이름 붙이는 것이 기억에 더 잘 정착하게 한다고 제안합니다 [VERIFY]. "이건 작은 승리야"라고 말하면, 그게 작은 승리가 됩니다. (2) 증인을 주세요. 공유된 대상 — 픽셀 펫, 공유 노트, 공유 폴더의 사진 — 은 사적인 순간을 공동의 것으로 바꿉니다. (3) 승리를 의식에 고정하세요. 당신과 파트너가 매일 같은 시간에 펫에게 먹이를 준다면, 펫의 성장은 그렇지 않았으면 증발했을 모든 작은 승리의 느린 시각화가 됩니다. (4) 순위를 매기지 마세요. 작은 승리는 "10점 만점에 5점" 순간이 아닙니다. 순위를 매기기 시작하는 순간 비교가 시작되고, 비교는 뇌에 작은 것을 무시하라고 가르칩니다. (5) 다른 무언가가 기억하게 하세요. 당신이 할 수 있는 가장 효과적인 일은 기억을 외부화하는 것입니다 — "기억하는 것"을 그 목적으로 설계된 시스템에 맡기고, 당신의 뇌가 아카이빙 대신 경험에 집중할 수 있도록 하세요.` },
    ],
    cta: `당신의 뇌가 잊도록 설계된 작은 승리를 붙잡기 시작하세요. 브라우저에서 Togthr을 여세요 — 픽셀 펫이 거기에 있습니다. 당신이 공유하는 모든 작은 것들과 함께, 조용히 자라고 있습니다.`,
    faqs: [
      { q: `관계에서 "작은 승리"란 무엇인가요?`, a: `작은 승리는 평범한 날에 일어나는 낮은 압박의 긍정적 순간입니다 — 파트너가 당신의 발표를 기억한 것, 같은 저녁을 만들어 먹고 생긴 웃음, 약속하지 않고 같은 아침 데스크톱 펫에게 먹이를 준 것. John Gottman과 같은 연구자들은 이것을 "연결 요청"이라 부르며, 긍정 대 부정 요청의 비율은 큰 이정표 이벤트보다 장기적 관계 건강을 더 잘 예측합니다 [VERIFY].` },
      { q: `왜 작은 긍정적 순간이 큰 축하보다 더 중요한가요?`, a: `빈도가 강도를 이기기 때문입니다. Teresa Amabile의 진척 원칙 연구는 작고 빈번한 긍정적 사건이 드문 대돌파보다 동기와 웰빙에 더 강한 효과를 가진다는 것을 발견했습니다 [VERIFY]. 관계에서 Gottman의 5:1 비율은 기념일 저녁이 아니라 미세 상호작용에 의존합니다 — 가장 작은 5,000개의 순간이 기초를 쌓고, 가장 큰 5개가 그것을 장식합니다.` },
      { q: `관계 속 좋은 순간을 더 많이 기억하려면 어떻게 해야 하나요?`, a: `가장 효과적인 접근은 기억의 외부화입니다. 인간의 뇌는 24시간 내에 새로운 정보의 약 70%를 자연히 잊고(Ebbinghaus 망각 곡선 [VERIFY]), 나쁜 사건을 좋은 사건보다 우선하는 부정성 편향을 가지고 있습니다. 공유된 시스템 — 일기, 사진 습관, 또는 공유 의식과 함께 자라는 버추얼 펫 — 이 당신의 뇌가 놓아주는 작은 승리를 포착합니다.` },
      { q: `Togthr이 작은 승리를 축하하는 데 도움이 되나요?`, a: `네 — Togthr은 조용한 기억 엔진으로 설계되었습니다. 픽셀 펫은 스트릭이 아니라 공유된 총 관심을 바탕으로 다섯 단계(베이비에서 레전드까지)를 성장합니다. 모든 먹이 주기, 시그널, 체크인이 펫 성장의 일부가 되어, 개별적으로는 하찮은 순간들을 눈에 보이는 누적 기록으로 바꿉니다. 펫은 결코 리셋되지 않고, 처벌하지 않으며, 말하지 않습니다 — 그냥 기억합니다.` },
    ],
    links: [
      { href: `/ko`, label: `Togthr 홈` },
      { href: `/ko/pricing`, label: `Togthr 요금` },
      { href: `/ko/blog/love-streak-science`, label: `러브 스트릭 과학: 매일의 체크인이 큰 제스처를 이기는 이유` },
      { href: `/ko/blog/a-virtual-pet-in-a-long-relationship`, label: `오래된 관계 속의 가상 펫` },
      { href: `/ko/blog/low-pressure-companion-app`, label: `압박 없는 컴패니언 앱: 스트릭도 죄책감도 없이` },
    ],
  },

  de: {
    summary: `Große Momente bekommen die Fotos. Kleine Erfolge werden vergessen — und kleine Erfolge sind die, die tatsächlich vorhersagen, ob eine Beziehung hält. Teresa Amabiles Fortschrittsprinzip [VERIFY] zeigt, dass kleine, häufige positive Ereignisse sich stärker summieren als seltene Triumphe. Togthr erinnert sich leise an die kleinen Dinge: ein Pixel-Haustier, das in 5 Stufen wächst und jedes winzige Ritual bezeugt, das du sonst vergessen würdest.`,
    intro: `In jeder Beziehung gibt es einen Mittwoch. Es ist kein Jahrestag. Es ist nicht der Tag, an dem zum ersten Mal "Ich liebe dich" gesagt wurde. Es ist der Tag, an dem dein Partner sich an deine Präsentation erinnerte und um 8:47 Uhr ein einzelnes Herz-Emoji schickte. Es ist der Dienstagabend, an dem ihr beide das Gleiche gekocht habt, 500 Kilometer voneinander entfernt, und in einem Drei-Zeilen-Chat darüber gelacht habt. Niemand macht ein Foto von diesem Mittwoch. Niemand schreibt ihn ins Tagebuch. Und genau diese Art von Mittwoch — dieser winzige, unfotografierte, leicht zu vergessende Erfolg — ist es, der laut Forschung tatsächlich das Fundament einer langen Beziehung bildet. Große Momente sind die Überschriften. Kleine Erfolge sind die Absätze. Dies ist ein Leitfaden, um sie zu bemerken, zu benennen und eine Beziehung aufzubauen, die sich an das erinnert, was dein Gehirn nie behalten sollte.`,
    sections: [
      { h: `Warum sind kleine Erfolge für eine Beziehung wichtiger als große Meilensteine?`, p: `Weil kleine Erfolge tatsächlich passieren. Ein großer Meilenstein — ein Jahrestag, ein Heiratsantrag, ein Einzugstag — passiert einmal im Jahr oder einmal im Leben. Ein kleiner Erfolg passiert an einem zufälligen Mittwoch, und dann noch einer am Donnerstag, und noch einer still am folgenden Montag. Teresa Amabiles und Steven Kramers Forschung zum Fortschrittsprinzip, veröffentlicht im Harvard Business Review, ergab, dass von allen Ereignissen, die das innere Arbeitsleben prägen, das stärkste der Fortschritt in sinnvoller Arbeit ist — und dass kleine, häufige Erfolge eine stärkere Wirkung auf Motivation und Wohlbefinden hatten als große, seltene Durchbrüche [VERIFY]. Dasselbe Prinzip gilt für Beziehungen: Eine Beziehung wird nicht an den fünf größten Tagen gebaut. Sie wird an den fünftausend kleinsten gebaut. Das Problem ist: Dein Gehirn, sich selbst überlassen, wird sich an die meisten davon nicht erinnern.` },
      { h: `Was zählt als "kleiner Erfolg" in einer Beziehung — und was nicht`, p: `Ein kleiner Erfolg ist kein gelöstes Problem. Es ist nicht das Gespräch, das alles geklärt hat. Ein kleiner Erfolg ist: Jemand hat bemerkt, dass du müde warst, und hat ungefragt Tee gemacht. Du hast ein dummes Foto von deinem Spaziergang geschickt und dein Partner hat eins zurückgeschickt. Ihr habt beide am selben Morgen, ohne es abzusprechen, das gemeinsame Pixel-Haustier gefüttert. Diese Momente melden sich nicht von selbst. Sie haben keine Zeremonie und keinen Hashtag. Aber in John Gottmans Rahmenwerk sind sie genau das, was zählt: kleine Verbindungsangebote, die, wenn sie bemerkt und erwidert werden, das 5:1-Verhältnis positiver zu negativen Interaktionen aufbauen, das die langfristige Beziehungsstabilität vorhersagt [VERIFY]. Ein kleiner Erfolg ist, einfach gesagt, ein Moment, in dem du dich gesehen fühltest — und dann fast sofort vergessen hast. Die Praxis des Feierns kleiner Erfolge ist die Praxis des Nicht-Vergessens.` },
      { h: `Warum dein Gehirn das Gute vergisst — und sich an das Schlechte erinnert`, p: `Das menschliche Gehirn hat einen Negativitätsbias: Negative Ereignisse werden gründlicher verarbeitet und lebhafter erinnert als positive. Das ist evolutionär adaptiv — du musst dich an das Raubtier erinnern, nicht an den angenehmen Nachmittag — aber es arbeitet gegen Beziehungen. Eine Studie von Baumeister und Kollegen, veröffentlicht in der Review of General Psychology, ergab, dass schlechte Ereignisse in fast allen Bereichen menschlicher Erfahrung stärker und anhaltender sind als gute [VERIFY]. In einer Beziehung bedeutet das: Der eine angespannte Morgen bleibt scharf in der Erinnerung, während die achtzig sanften Morgen im Nebel verschwimmen. Die Vergessenskurve erledigt den Rest: Hermann Ebbinghaus dokumentierte, dass wir ohne aktive Verstärkung etwa 50 % neuer Informationen innerhalb einer Stunde und etwa 70 % innerhalb von 24 Stunden vergessen [VERIFY]. Der kleine Erfolg, den du um 8:47 Uhr empfunden hast, löst sich um 9:47 neurologisch bereits auf. Das ist kein Charakterfehler. Es ist eine Designbeschränkung. Und genau deshalb verändert eine Erinnerungsmaschine — etwas außerhalb deines Gehirns, das für dich erinnert — die gesamte Gleichung.` },
      { h: `Große Meilensteine vs. kleine Erfolge: Was sich wirklich summiert`, p: `| Eigenschaft | Großer Meilenstein | Kleiner Erfolg |\n|---|---|---|\n| Häufigkeit | Einmal pro Jahr oder weniger | Mehrmals pro Woche |\n| Erinnerung | Fotografiert, ins Tagebuch geschrieben, erinnert | Innerhalb von Stunden vergessen |\n| Emotionales Gewicht | Hoch — Freude, Erleichterung, manchmal Druck | Niedrig — ein stilles Lächeln, kurze Wärme |\n| Kumulativer Effekt | Niedrig — zu selten zum Aufsummieren | Hoch — kleine, häufige Positive bauen Vertrauen und Verhältnis auf |\n| Vorhersagekraft | Niedrig für tägliches Glück | Hoch — Gottmans Verhältnis hängt von Mikrointeraktionen ab |\n| Was dein Gehirn tut | Behält es natürlich | Löscht es fast sofort |\n| Was Togthr tut | Erinnert sich auch daran | Bezeugt und bewahrt es still |` },
      { h: `Wie eine Erinnerungsmaschine die Gleichung der kleinen Erfolge verändert`, p: `Die Idee einer Erinnerungsmaschine ist einfach: Es ist ein System, das die kleinen Dinge einfängt, die dein Gehirn verwerfen soll. In Togthr ist die Erinnerungsmaschine keine Datenbank großer Ereignisse. Es ist die stille Ansammlung jedes kleinen Rituals, das du und dein Partner gemeinsam durchführt — das Haustier füttern, ein Ein-Tipp-Signal senden, einchecken, eine Notiz hinterlassen. Das Haustier durchläuft fünf Stufen — Baby, Kleinkind, Teenager, Erwachsen, Legende — und dieses Wachstum ist keine Punktzahl. Es ist eine Aufzeichnung. Jede Stufe repräsentiert Hunderte kleiner Erfolge, die einzeln vergessenswert, aber kollektiv zu einem Wesen geworden sind, das vorher nicht existierte. Versteckte Attribute schalten zehn Berufs-Skins frei (Programmierer, Arzt, Astronaut, Koch, Feuerwehrmann und mehr), und eine versteckte Gold-Edition existiert mit einer Wahrscheinlichkeit von 1/72 — aber nichts davon kann verloren gehen. Das Haustier setzt sich nie zurück, bestraft nie und spricht nie. Es erinnert sich einfach. Und indem es sich erinnert, macht es die kleinen Dinge sichtbar. Das ist das Kernversprechen: ein Begleiter, der das Erinnern übernimmt, damit du das Leben leben kannst.` },
      { h: `Fünf praktische Wege, kleine Erfolge einzufangen, bevor sie sich auflösen`, p: `(1) Sprich den Erfolg laut aus. Forschung zur Emotionsbenennung legt nahe, dass das In-Worte-Fassen eines Gefühls bei negativen Emotionen die Intensität reduziert — aber positive Emotionen werden durch Benennung besser im Gedächtnis verankert [VERIFY]. Sag "Das war ein kleiner Erfolg", und er wird einer. (2) Gib ihm einen Zeugen. Ein geteiltes Objekt — ein Pixel-Haustier, eine geteilte Notiz, ein Foto in einem geteilten Ordner — verwandelt einen privaten Moment in einen gemeinsamen. (3) Verankere den Erfolg in einem Ritual. Wenn du und dein Partner jeden Tag zur gleichen Zeit das Haustier füttert, wird das Wachstum des Haustiers zur langsamen Visualisierung all der kleinen Erfolge, die sonst verdampft wären. (4) Bewerte sie nicht. Ein kleiner Erfolg ist kein "5 von 10"-Moment. Sobald du Erfolge bewertest, beginnst du zu vergleichen, und Vergleich lehrt dein Gehirn, die kleineren zu ignorieren. (5) Lass etwas anderes erinnern. Das Effektivste, was du tun kannst, ist, das Gedächtnis auszulagern — das Erinnern einem dafür entworfenen System zu übergeben, damit dein Gehirn sich auf das Erleben statt auf das Archivieren konzentrieren kann.` },
    ],
    cta: `Fang an, die kleinen Erfolge einzufangen, die dein Gehirn vergessen soll. Öffne Togthr in deinem Browser — ein Pixel-Haustier wird da sein und leise mit jeder kleinen Sache wachsen, die du teilst.`,
    faqs: [
      { q: `Was ist ein "kleiner Erfolg" in einer Beziehung?`, a: `Ein kleiner Erfolg ist ein unaufgeregter positiver Moment an einem gewöhnlichen Tag — der Partner erinnert sich an deine Präsentation, ein gemeinsames Lachen über das gleiche Abendessen, das zufällig gleichzeitige Füttern des Desktop-Haustiers. Forscher wie John Gottman nennen diese "Verbindungsangebote", und das Verhältnis positiver zu negativen Angeboten sagt die langfristige Beziehungsgesundheit besser voraus als große Meilensteine [VERIFY].` },
      { q: `Warum sind kleine positive Momente wichtiger als große Feiern?`, a: `Weil Häufigkeit Intensität schlägt. Teresa Amabiles Forschung zum Fortschrittsprinzip ergab, dass kleine, häufige positive Ereignisse eine stärkere Wirkung auf Motivation und Wohlbefinden hatten als seltene Durchbrüche [VERIFY]. In Beziehungen hängt Gottmans 5:1-Verhältnis von Mikrointeraktionen ab, nicht von Jubiläumsessen — die fünftausend kleinsten Momente bauen das Fundament, das die fünf größten schmücken.` },
      { q: `Wie kann ich mich an mehr gute Momente in meiner Beziehung erinnern?`, a: `Der effektivste Ansatz ist das Auslagern des Gedächtnisses. Das menschliche Gehirn vergisst auf natürliche Weise etwa 70 % neuer Informationen innerhalb von 24 Stunden (Ebbinghaus-Vergessenskurve [VERIFY]) und hat einen Negativitätsbias, der schlechte Ereignisse priorisiert. Ein geteiltes System — ein Tagebuch, eine Fotogewohnheit oder ein virtuelles Haustier, das mit geteilten Ritualen wächst — fängt die kleinen Erfolge ein, die dein Gehirn loslässt.` },
      { q: `Hilft Togthr beim Feiern kleiner Erfolge?`, a: `Ja — Togthr wurde als stille Erinnerungsmaschine entworfen. Das Pixel-Haustier wächst in fünf Stufen (Baby bis Legende), basierend auf der gesamten geteilten Aufmerksamkeit, nicht auf einem Streak. Jedes Füttern, jedes Signal und jeder Check-in wird Teil des Wachstums und verwandelt einzeln unbedeutende Momente in eine sichtbare, kumulative Aufzeichnung. Das Haustier setzt sich nie zurück, bestraft nie und spricht nie — es erinnert sich einfach.` },
    ],
    links: [
      { href: `/de`, label: `Togthr Startseite` },
      { href: `/de/pricing`, label: `Togthr Preise` },
      { href: `/de/blog/love-streak-science`, label: `Love-Streak-Wissenschaft: Warum tägliche Check-ins große Gesten schlagen` },
      { href: `/de/blog/a-virtual-pet-in-a-long-relationship`, label: `Ein virtuelles Haustier in einer langen Beziehung` },
      { href: `/de/blog/low-pressure-companion-app`, label: `Eine Begleiter-App ohne Druck: keine Streaks, keine Schuld` },
    ],
  },

  fr: {
    summary: `Les grands moments reçoivent les photos. Les petites victoires sont oubliées — et ce sont les petites victoires qui prédisent si une relation dure. Le principe de progression de Teresa Amabile [VERIFY] montre que les petits événements positifs fréquents s'accumulent plus que les triomphes rares. Togthr se souvient doucement des petites choses : un animal pixel qui grandit en 5 étapes, témoin de chaque petit rituel que vous auriez autrement oublié.`,
    intro: `Il y a un mercredi dans chaque relation. Ce n'est pas un anniversaire. Ce n'est pas le jour où quelqu'un a dit je t'aime pour la première fois. C'est le jour où votre partenaire s'est souvenu que vous aviez une présentation et a envoyé un seul émoji cœur à 8h47. C'est le mardi soir où vous avez tous les deux cuisiné la même chose pour le dîner, à 500 kilomètres de distance, et en avez ri dans un fil de trois messages. Personne ne prend de photo de ce mercredi. Personne ne l'écrit dans un journal. Et c'est exactement ce genre de mercredi — cette petite victoire minuscule, non photographiée, facile à oublier — qui, selon les chercheurs, construit réellement les fondations d'une longue relation. Les grands moments sont les titres. Les petites victoires sont les paragraphes. Voici un guide pour les remarquer, les nommer et construire une relation qui se souvient de ce que votre cerveau n'a jamais été conçu pour garder.`,
    sections: [
      { h: `Pourquoi les petites victoires comptent-elles plus que les grandes étapes dans une relation ?`, p: `Parce que les petites victoires arrivent. Une grande étape — un anniversaire, une demande en mariage, un emménagement — arrive une fois par an ou une fois dans une vie. Une petite victoire arrive un mercredi au hasard, puis une autre le jeudi, et une autre doucement le lundi suivant. La recherche de Teresa Amabile et Steven Kramer sur le principe de progression, publiée dans la Harvard Business Review, a montré que de tous les événements qui façonnent la vie professionnelle intérieure, le plus puissant est de progresser dans un travail significatif — et que les petites victoires fréquentes avaient un effet plus fort sur la motivation et le bien-être que les grandes percées rares [VERIFY]. Le même principe s'applique aux relations : une relation ne se construit pas sur les cinq plus grands jours. Elle se construit sur les cinq mille plus petits. Le problème, c'est que votre cerveau, laissé à lui-même, ne se souviendra pas de la plupart d'entre eux.` },
      { h: `Qu'est-ce qui compte comme une "petite victoire" dans une relation — et ce qui ne compte pas`, p: `Une petite victoire n'est pas un problème résolu. Ce n'est pas la conversation qui a tout arrangé. Une petite victoire, c'est : quelqu'un a remarqué que vous étiez fatigué et a fait le thé sans qu'on le lui demande. Vous avez envoyé une photo idiote de votre promenade et votre partenaire en a renvoyé une. Vous avez tous les deux nourri l'animal pixel partagé le même matin sans vous être concertés. Ces moments ne s'annoncent pas. Ils n'ont ni cérémonie ni hashtag. Mais dans le cadre de John Gottman, ils sont exactement ce qui compte : de petites offres de connexion qui, lorsqu'elles sont remarquées et retournées, construisent le ratio 5:1 d'interactions positives à négatives qui prédit la stabilité relationnelle à long terme [VERIFY]. Une petite victoire, en termes simples, c'est un moment où vous vous êtes senti vu — puis presque immédiatement oublié. La pratique de célébrer les petites victoires est la pratique de ne pas oublier.` },
      { h: `Pourquoi votre cerveau oublie le bon — et se souvient du mauvais`, p: `Le cerveau humain a un biais de négativité : les événements négatifs sont traités plus en profondeur et mémorisés plus vivement que les positifs. C'est adaptatif sur le plan évolutif — vous devez vous souvenir du prédateur, pas de l'après-midi agréable — mais cela joue contre les relations. Une étude de Baumeister et ses collègues, publiée dans la Review of General Psychology, a montré que les mauvais événements sont plus forts et plus persistants que les bons dans presque tous les domaines de l'expérience humaine [VERIFY]. Dans une relation, cela signifie que le matin tendu reste net dans la mémoire tandis que les quatre-vingts matins doux se fondent dans le brouillard. La courbe de l'oubli fait le reste : Hermann Ebbinghaus a documenté que sans renforcement actif, nous oublions environ 50 % des nouvelles informations en une heure et environ 70 % en 24 heures [VERIFY]. La petite victoire que vous avez ressentie à 8h47 est déjà en train de se dissoudre neurologiquement à 9h47. Ce n'est pas un défaut de caractère. C'est une limitation de conception. Et c'est exactement pourquoi un moteur de mémoire — quelque chose en dehors de votre cerveau qui se souvient pour vous — change toute l'équation.` },
      { h: `Grandes étapes vs petites victoires : ce qui s'accumule vraiment`, p: `| Attribut | Grande étape | Petite victoire |\n|---|---|---|\n| Fréquence | Une fois par an ou moins | Plusieurs fois par semaine |\n| Mémoire | Photographiée, écrite, mémorisée | Oubliée en quelques heures |\n| Poids émotionnel | Élevé — joie, soulagement, parfois pression | Faible — un sourire discret, une brève chaleur |\n| Effet cumulatif | Faible — trop rare pour s'accumuler | Élevé — les petits positifs fréquents construisent confiance et ratio |\n| Pouvoir prédictif | Faible pour le bonheur quotidien | Élevé — le ratio de Gottman dépend des micro-interactions |\n| Ce que fait votre cerveau | Le garde naturellement | L'efface presque immédiatement |\n| Ce que fait Togthr | S'en souvient aussi | Le témoigne et le préserve doucement |` },
      { h: `Comment un moteur de mémoire change l'équation des petites victoires`, p: `L'idée d'un moteur de mémoire est simple : c'est un système qui capture les petites choses que votre cerveau est conçu pour jeter. Dans Togthr, le moteur de mémoire n'est pas une base de données de grands événements. C'est l'accumulation silencieuse de chaque petit rituel que vous et votre partenaire accomplissez ensemble — nourrir l'animal, envoyer un signal en un tap, faire un check-in, laisser une note. L'animal grandit à travers cinq stades — bébé, bambin, ado, adulte, légende — et cette croissance n'est pas un score. C'est un enregistrement. Chaque stade représente des centaines de petites victoires, individuellement oubliables mais collectivement devenues une créature qui n'existait pas auparavant. Les attributs cachés débloquent dix skins de profession (programmeur, médecin, astronaute, chef, pompier, et plus), et une édition dorée cachée existe avec une probabilité de 1/72 — mais rien de tout cela ne peut être perdu. L'animal ne se réinitialise jamais, ne punit jamais et ne parle jamais. Il se souvient simplement. Et en se souvenant, il rend les petites choses visibles. C'est la proposition centrale : un compagnon qui prend en charge la mémoire pour que vous puissiez vous concentrer sur la vie.` },
      { h: `Cinq façons pratiques de capturer les petites victoires avant qu'elles ne se dissolvent`, p: `(1) Nommez la victoire à voix haute. La recherche sur l'étiquetage émotionnel suggère que mettre un sentiment en mots réduit son intensité pour les émotions négatives — mais pour les positives, les nommer les ancre mieux dans la mémoire [VERIFY]. Dites "c'était une petite victoire" et elle le devient. (2) Donnez-lui un témoin. Un objet partagé — un animal pixel, une note partagée, une photo dans un dossier partagé — transforme un moment privé en moment commun. (3) Ancrez la victoire à un rituel. Si vous et votre partenaire nourrissez toujours l'animal à la même heure chaque jour, la croissance de l'animal devient une lente visualisation de toutes les petites victoires qui se seraient autrement évaporées. (4) Ne les classez pas. Une petite victoire n'est pas un moment "5 sur 10". Dès que vous classez les victoires, vous commencez à comparer, et la comparaison apprend à votre cerveau à ignorer les plus petites. (5) Laissez quelque chose d'autre se souvenir. La chose la plus efficace que vous puissiez faire est d'externaliser la mémoire — confier le "se souvenir" à un système conçu pour cela, pour que votre cerveau puisse se concentrer sur l'expérience plutôt que sur l'archivage.` },
    ],
    cta: `Commencez à capturer les petites victoires que votre cerveau est conçu pour oublier. Ouvrez Togthr dans votre navigateur — un animal pixel sera là, grandissant doucement avec chaque petite chose que vous partagez.`,
    faqs: [
      { q: `Qu'est-ce qu'une "petite victoire" dans une relation ?`, a: `Une petite victoire est un moment positif à faible enjeu qui se produit pendant une journée ordinaire — un partenaire qui se souvient de votre présentation, un rire partagé en cuisinant le même dîner, nourrir tous les deux l'animal de bureau le même matin sans se concerter. Les chercheurs comme John Gottman appellent cela des "offres de connexion", et le ratio d'offres positives à négatives prédit mieux la santé relationnelle à long terme que les grands événements marquants [VERIFY].` },
      { q: `Pourquoi les petits moments positifs comptent-ils plus que les grandes célébrations ?`, a: `Parce que la fréquence bat l'intensité. La recherche de Teresa Amabile sur le principe de progression a montré que les petits événements positifs fréquents avaient un effet plus fort sur la motivation et le bien-être que les percées rares [VERIFY]. Dans les relations, le ratio 5:1 de Gottman dépend des micro-interactions, pas des dîners d'anniversaire — les cinq mille plus petits moments construisent les fondations que les cinq plus grands décorent.` },
      { q: `Comment puis-je me souvenir de plus de bons moments dans ma relation ?`, a: `L'approche la plus efficace est l'externalisation de la mémoire. Le cerveau humain oublie naturellement environ 70 % des nouvelles informations en 24 heures (courbe de l'oubli d'Ebbinghaus [VERIFY]) et a un biais de négativité qui priorise les mauvais événements. Un système partagé — un journal, une habitude photo, ou un animal virtuel qui grandit avec des rituels partagés — capture les petites victoires que votre cerveau laisse filer.` },
      { q: `Togthr aide-t-il à célébrer les petites victoires ?`, a: `Oui — Togthr a été conçu comme un moteur de mémoire silencieux. L'animal pixel grandit en cinq stades (bébé à légende) basés sur l'attention totale partagée, pas sur une série. Chaque nourrissage, signal et check-in devient partie de la croissance de l'animal, transformant des moments individuellement insignifiants en un enregistrement cumulatif visible. L'animal ne se réinitialise jamais, ne punit jamais et ne parle jamais — il se souvient simplement.` },
    ],
    links: [
      { href: `/fr`, label: `Accueil Togthr` },
      { href: `/fr/pricing`, label: `Tarifs Togthr` },
      { href: `/fr/blog/love-streak-science`, label: `La science des love streaks : pourquoi les check-ins quotidiens surpassent les grands gestes` },
      { href: `/fr/blog/a-virtual-pet-in-a-long-relationship`, label: `Un animal virtuel dans une relation longue` },
      { href: `/fr/blog/low-pressure-companion-app`, label: `Une app compagnon sans pression : ni streaks, ni culpabilité` },
    ],
  },

  es: {
    summary: `Los grandes momentos reciben las fotos. Las pequeñas victorias se olvidan — y son las pequeñas victorias las que realmente predicen si una relación dura. El principio de progreso de Teresa Amabile [VERIFY] muestra que los pequeños eventos positivos frecuentes se acumulan más que los triunfos raros. Togthr recuerda en silencio las cosas pequeñas: una mascota pixel que crece en 5 etapas, presenciando cada pequeño ritual que de otro modo olvidarías.`,
    intro: `Hay un miércoles en cada relación. No es un aniversario. No es el día en que alguien dijo te quiero por primera vez. Es el día en que tu pareja recordó que tenías una presentación y envió un solo emoji de corazón a las 8:47 a.m. Es el martes por la noche en que ambos cocinaron lo mismo para cenar, a 500 kilómetros de distancia, y se rieron en un hilo de tres mensajes. Nadie toma una foto de ese miércoles. Nadie lo escribe en un diario. Y es exactamente este tipo de miércoles — esta pequeña victoria diminuta, no fotografiada, fácil de olvidar — lo que, según los investigadores, realmente construye los cimientos de una relación larga. Los grandes momentos son los titulares. Las pequeñas victorias son los párrafos. Esta es una guía para notarlas, nombrarlas y construir una relación que recuerde lo que tu cerebro nunca fue diseñado para guardar.`,
    sections: [
      { h: `¿Por qué importan más las pequeñas victorias que los grandes hitos en una relación?`, p: `Porque las pequeñas victorias ocurren. Un gran hito — un aniversario, una propuesta, una mudanza — ocurre una vez al año o una vez en la vida. Una pequeña victoria ocurre un miércoles cualquiera, y luego otra el jueves, y otra en silencio el lunes siguiente. La investigación de Teresa Amabile y Steven Kramer sobre el principio de progreso, publicada en Harvard Business Review, encontró que de todos los eventos que moldean la vida laboral interna, el más poderoso es progresar en un trabajo significativo — y que las pequeñas victorias frecuentes tenían un efecto más fuerte en la motivación y el bienestar que los grandes avances raros [VERIFY]. El mismo principio se aplica a las relaciones: una relación no se construye sobre los cinco días más grandes. Se construye sobre los cinco mil más pequeños. El problema es que tu cerebro, abandonado a sí mismo, no recordará la mayoría de ellos.` },
      { h: `Qué cuenta como una "pequeña victoria" en una relación — y qué no`, p: `Una pequeña victoria no es un problema resuelto. No es la conversación que lo arregló todo. Una pequeña victoria es: alguien notó que estabas cansado e hizo el té sin que se lo pidieras. Enviaste una foto tonta de tu paseo y tu pareja te devolvió otra. Ambos alimentaron a la mascota pixel compartida la misma mañana sin ponerse de acuerdo. Estos momentos no se anuncian. No tienen ceremonia ni hashtag. Pero en el marco de John Gottman, son exactamente lo que importa: pequeñas ofertas de conexión que, cuando se notan y se devuelven, construyen la proporción 5:1 de interacciones positivas a negativas que predice la estabilidad relacional a largo plazo [VERIFY]. Una pequeña victoria es, en los términos más simples, un momento en que te sentiste visto — y luego casi inmediatamente olvidado. La práctica de celebrar pequeñas victorias es la práctica de no olvidar.` },
      { h: `Por qué tu cerebro olvida lo bueno — y recuerda lo malo`, p: `El cerebro humano tiene un sesgo de negatividad: los eventos negativos se procesan más a fondo y se recuerdan más vívidamente que los positivos. Esto es evolutivamente adaptativo — necesitas recordar al depredador, no la tarde agradable — pero juega en contra de las relaciones. Un estudio de Baumeister y colegas, publicado en la Review of General Psychology, encontró que los eventos malos son más fuertes y más persistentes que los buenos en casi todos los dominios de la experiencia humana [VERIFY]. En una relación, esto significa que esa mañana tensa permanece nítida en la memoria mientras las ochenta mañanas suaves se difuminan juntas. La curva del olvido hace el resto: Hermann Ebbinghaus documentó que sin refuerzo activo, olvidamos aproximadamente el 50% de la información nueva en una hora y alrededor del 70% en 24 horas [VERIFY]. La pequeña victoria que sentiste a las 8:47 a.m. ya se está disolviendo neurológicamente a las 9:47. Esto no es un defecto de carácter. Es una limitación de diseño. Y es exactamente por eso que un motor de memoria — algo fuera de tu cerebro que recuerda por ti — cambia toda la ecuación.` },
      { h: `Grandes hitos vs pequeñas victorias: lo que realmente se acumula`, p: `| Atributo | Gran hito | Pequeña victoria |\n|---|---|---|\n| Frecuencia | Una vez al año o menos | Varias veces por semana |\n| Memoria | Fotografiado, escrito, recordado | Olvidado en horas |\n| Peso emocional | Alto — alegría, alivio, a veces presión | Bajo — una sonrisa tranquila, un breve calor |\n| Efecto acumulativo | Bajo — demasiado raro para acumularse | Alto — pequeños positivos frecuentes construyen confianza y proporción |\n| Poder predictivo | Bajo para la felicidad diaria | Alto — la proporción de Gottman depende de microinteracciones |\n| Lo que hace tu cerebro | Lo conserva naturalmente | Lo borra casi inmediatamente |\n| Lo que hace Togthr | También lo recuerda | Lo presencia y preserva en silencio |` },
      { h: `Cómo un motor de memoria cambia la ecuación de las pequeñas victorias`, p: `La idea de un motor de memoria es simple: es un sistema que captura las cosas pequeñas que tu cerebro fue diseñado para descartar. En Togthr, el motor de memoria no es una base de datos de grandes eventos. Es la acumulación silenciosa de cada pequeño ritual que tú y tu pareja realizan juntos — alimentar a la mascota, enviar una señal de un toque, hacer check-in, dejar una nota. La mascota crece a través de cinco etapas — bebé, pequeño, adolescente, adulto, leyenda — y ese crecimiento no es una puntuación. Es un registro. Cada etapa representa cientos de pequeñas victorias que individualmente eran olvidables pero que colectivamente se convirtieron en una criatura que antes no existía. Los atributos ocultos desbloquean diez skins de profesión (programador, médico, astronauta, chef, bombero y más), y existe una edición dorada oculta con probabilidad 1/72 — pero nada de esto se puede perder. La mascota nunca se reinicia, nunca castiga y nunca habla. Simplemente recuerda. Y al recordar, hace visibles las cosas pequeñas. Esa es la propuesta central: un compañero que se encarga de recordar para que tú puedas dedicarte a vivir.` },
      { h: `Cinco formas prácticas de capturar pequeñas victorias antes de que se disuelvan`, p: `(1) Nombra la victoria en voz alta. La investigación sobre el etiquetado emocional sugiere que poner un sentimiento en palabras reduce su intensidad para las emociones negativas — pero para las positivas, nombrarlas las ancla mejor en la memoria [VERIFY]. Di "eso fue una pequeña victoria" y se convierte en una. (2) Dale un testigo. Un objeto compartido — una mascota pixel, una nota compartida, una foto en una carpeta compartida — transforma un momento privado en uno conjunto. (3) Ancla la victoria a un ritual. Si tú y tu pareja siempre alimentan a la mascota a la misma hora cada día, el crecimiento de la mascota se convierte en una lenta visualización de todas las pequeñas victorias que de otro modo se habrían evaporado. (4) No las clasifiques. Una pequeña victoria no es un momento de "5 sobre 10". En el momento en que clasificas victorias, empiezas a compararlas, y la comparación enseña a tu cerebro a descartar las más pequeñas. (5) Deja que otra cosa recuerde. Lo más efectivo que puedes hacer es externalizar la memoria — entregar el "recordar" a un sistema diseñado para ello, para que tu cerebro pueda centrarse en experimentar en lugar de archivar.` },
    ],
    cta: `Empieza a capturar las pequeñas victorias que tu cerebro fue diseñado para olvidar. Abre Togthr en tu navegador — una mascota pixel estará allí, creciendo en silencio con cada pequeña cosa que compartas.`,
    faqs: [
      { q: `¿Qué es una "pequeña victoria" en una relación?`, a: `Una pequeña victoria es un momento positivo de bajo riesgo que ocurre durante un día normal — tu pareja recordando tu presentación, una risa compartida por cocinar la misma cena, ambos alimentando a la mascota de escritorio la misma mañana sin ponerse de acuerdo. Investigadores como John Gottman llaman a esto "ofertas de conexión", y la proporción de ofertas positivas a negativas predice mejor la salud relacional a largo plazo que los grandes eventos puntuales [VERIFY].` },
      { q: `¿Por qué importan más los pequeños momentos positivos que las grandes celebraciones?`, a: `Porque la frecuencia vence a la intensidad. La investigación de Teresa Amabile sobre el principio de progreso encontró que los pequeños eventos positivos frecuentes tenían un efecto más fuerte en la motivación y el bienestar que los avances raros [VERIFY]. En las relaciones, la proporción 5:1 de Gottman depende de microinteracciones, no de cenas de aniversario — los cinco mil momentos más pequeños construyen los cimientos que los cinco más grandes decoran.` },
      { q: `¿Cómo puedo recordar más momentos buenos en mi relación?`, a: `El enfoque más efectivo es externalizar la memoria. El cerebro humano olvida naturalmente alrededor del 70% de la información nueva en 24 horas (curva del olvido de Ebbinghaus [VERIFY]) y tiene un sesgo de negatividad que prioriza los eventos malos. Un sistema compartido — un diario, un hábito de fotos, o una mascota virtual que crece con rituales compartidos — captura las pequeñas victorias que tu cerebro deja ir.` },
      { q: `¿Ayuda Togthr a celebrar pequeñas victorias?`, a: `Sí — Togthr fue diseñado como un motor de memoria silencioso. La mascota pixel crece en cinco etapas (bebé a leyenda) basadas en la atención total compartida, no en una racha. Cada alimentación, señal y check-in se convierte en parte del crecimiento de la mascota, transformando momentos individualmente insignificantes en un registro acumulativo visible. La mascota nunca se reinicia, nunca castiga y nunca habla — simplemente recuerda.` },
    ],
    links: [
      { href: `/es`, label: `Inicio de Togthr` },
      { href: `/es/pricing`, label: `Precios de Togthr` },
      { href: `/es/blog/love-streak-science`, label: `La ciencia de las love streaks: por qué los check-ins diarios superan a los grandes gestos` },
      { href: `/es/blog/a-virtual-pet-in-a-long-relationship`, label: `Una mascota virtual en una relación larga` },
      { href: `/es/blog/low-pressure-companion-app`, label: `Una app compañera sin presión: sin rachas, sin culpa` },
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
    datePublished: POST_DATE,
    dateModified: POST_DATE,
    author: {
      '@type': 'Organization',
      name: 'Togthr',
    },
    image: `${siteConfig.url}${post.cover}`,
    url: `${siteConfig.url}/${loc}/blog/${SLUG}`,
    inLanguage: loc.replace('-', '_'),
    keywords: post.tags.join(', '),
  }

  const faqLd = {
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
  }

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 text-zinc-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

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
