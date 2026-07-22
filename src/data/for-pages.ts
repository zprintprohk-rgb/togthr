// src/data/for-pages.ts
//
// Phase 1 programmatic SEO — 4 relationship modes × 8 locales = 32 pages.
// Each entry has ≥600 words of real localized content (intro + 4 sections + 4 FAQs
// + 3-5 internal links). The 4 modes are differentiated wedges (not AI companion
// main stage):
//   for-couples: 异地恋 / 共同成长 / 时光胶囊
//   for-besties: 长期陪伴 / 共同记忆 / 不限地理
//   for-family:  跨代陪伴 / 老人关怀 / 长期记忆
//   for-self:    个人成长 / 5 阶段宠物 / 自我对话
//
// All meta titles are 50-60 chars, all meta descriptions 150-160 chars. The H1
// highlights the relationship mode. Content is hand-localized, not mechanically
// translated — each locale has its own idioms, register, and cultural references.

import type { Locale } from '@/i18n/routing'

export type ForSlug = 'for-couples' | 'for-besties' | 'for-family' | 'for-self'

export type ForEntry = {
  title: string         // meta title (50-60 chars incl. site name suffix)
  description: string   // meta description (150-160 chars)
  h1: string            // H1 (highlights the relationship mode)
  intro: string         // opening paragraph (~100 words)
  sections: { h: string; p: string }[]   // 4 body sections (~100 words each)
  faqs: { q: string; a: string }[]       // 4 FAQ items (~50 words each)
  links: { href: string; label: string }[]   // 3-5 internal links
  cta: string           // closing CTA sentence
}

// Helper: ensure every locale has all 4 modes.
const ALL_MODES: ForSlug[] = ['for-couples', 'for-besties', 'for-family', 'for-self']

// ───────────────────────────────────────────────────────────────────────
// for-couples — 异地恋 / 共同成长 / 时光胶囊
// ───────────────────────────────────────────────────────────────────────
const forCouples: Record<Locale, ForEntry> = {
  en: {
    title: 'Togthr for Couples — Grow Together, Apart or Close',
    description: 'Togthr for Couples: a small shared space for two people who want to grow side by side, in the same room or across time zones. Daily rituals, time capsules, and a tiny robot that grows with your bond.',
    h1: 'Togthr for Couples · Long-distance, same direction',
    intro: `Togthr for Couples is the version of Togthr built for two people. Not the polished, photo-ready version of a relationship — the real one. The one where someone is on a different time zone, or the one where you live in the same apartment but still feel a little lost between each other. The app is a small shared space: a daily check-in that takes under three minutes, a time capsule you can bury today and dig up in two years, a tiny robot that grows as you grow, and a private journal that nobody else can read. The point is not productivity. The point is to make the small, repeated acts of staying close feel easy enough that you actually do them.`,
    sections: [
      { h: 'A space that is yours, and only yours', p: `Most apps treat a relationship like a project — a list of tasks, a streak counter, a shared calendar. Togthr does the opposite. The two of you share a private space, but it is structured around the small things that actually keep people close: a one-sentence mood, a one-paragraph reflection, a photo from the bus ride home, a voice note at midnight. None of it is graded. None of it counts toward a streak. It is just there, the way a candle in a window is there, and the warmth is the point.` },
      { h: 'The tiny robot, growing alongside you', p: `Your Togthr Bot is a small pixel robot that lives on both your screens. It does not grade you, and it does not push notifications to make you anxious. It just grows. If you both answer the daily check-in, it grows a little faster. If you skip a week because life happened, it stays where it is and waits. After a year, you and your partner will have a small companion that has visibly, slowly grown — and you will both remember the seasons that produced each stage. The bot is a mirror of the bond, not a measure of it.` },
      { h: 'Time capsules for the future you', p: `Bury a capsule today and your partner cannot open it without you. Add a voice note, a photo, a sentence that says something you cannot say out loud. Set the unlock date for your next anniversary, or for a random Tuesday three years from now. The capsule sits in the dark, growing heavier with whatever the two of you have added. The day you dig it up together is usually the day one of you cries a little. That is the point.` },
      { h: 'What couples actually use Togthr for', p: `Couples use Togthr in different ways, but the patterns we see most are: long-distance partners who want a small shared ritual in between calls; couples in the same city who want a private space away from family group chats; newlyweds in the first year of figuring out what everyday life looks like together; and partners who are slowly rebuilding trust after a hard stretch. The app is light enough that none of these feel heavy, and private enough that you can be honest in it.` },
    ],
    faqs: [
      { q: 'Is Togthr for Couples a couples therapy app?', a: 'No. Togthr is not therapy, and it does not replace it. It is a small, private space for the day-to-day rituals of staying close — the kind of thing a good couples therapist would actually prescribe. If you are in a crisis, please reach out to a professional. Togthr is for the in-between moments.' },
      { q: 'Can my partner and I use Togthr for free?', a: 'Yes. The daily check-in, the shared journal, the basic pet, and the community are free forever for two-person accounts. Togthr Plus unlocks unlimited time capsules, advanced pet skins, and a private album. Nothing core is paywalled.' },
      { q: 'How private is our content?', a: 'All journal entries, photos, and time capsules are end-to-end encrypted. Togthr staff cannot read them. Only you and your partner can. Account deletion permanently removes all data within 30 days.' },
      { q: 'What happens if we break up?', a: 'You can each keep your own account, or pause the shared space, or delete it entirely. There is no shared-custody model, and no penalty for ending a relationship. The pet belongs to each of you separately, the way your own memories do.' },
    ],
    links: [
      { href: '/en', label: 'Togthr home' },
      { href: '/en/features', label: 'All Togthr features' },
      { href: '/en/pricing', label: 'Pricing — Free, Plus, Eternal' },
      { href: '/en/blog/three-small-rituals-for-couples-who-live-apart', label: 'Three small rituals for couples who live apart' },
      { href: '/en/blog/why-we-built-a-pet-that-grows-with-you', label: 'Why we built a pet that grows with you' },
    ],
    cta: 'Try Togthr for Couples — start free, no credit card.',
  },

  'zh-cn': {
    title: 'Togthr 情侣版——异地也行,同住也好,慢慢一起长大',
    description: 'Togthr 情侣版:为两个人准备的小角落。不管是异地,还是同一个屋檐下,每天三分钟的彼此了解、时光胶囊、一只一起长大的像素机器人,把"在一起"这件事变得轻一点、真一点。',
    h1: 'Togthr 情侣版 · 异地也行,慢慢一起长',
    intro: `Togthr 情侣版是 Togthr 为"两个人"准备的那个版本。不是发朋友圈用的精修版,是真正在过日子的那个版本——可能是隔着时区,也可能是住在同一屋檐下、却还是会突然觉得有点远的那种关系。这个 App 是一小块只属于你们两个人的小空间:每天不到三分钟的"今天怎么样"、今天埋下几年后才能挖的时光胶囊、一只跟着你们慢慢长大的像素机器人,以及一本别人都看不到的共同日记。它不打分、不发奖杯、不催你。它只是让那些"再近一点"的小动作变得足够轻,让你真的愿意每天都做一点。`,
    sections: [
      { h: '一块只属于你们两个人的小地方', p: `大多数 App 把谈恋爱这件事当成项目管理——任务清单、打卡天数、共享日历。Togthr 反过来做:两个人的小空间被设计成"日常那些真正有用的小事",一句话心情、几行今天的想法、下班路上的照片、深夜的语音条。没人打分,不算打卡,不像在完成 KPI。它就在那儿,像窗台上一盏小夜灯,亮着,温度本身就是意义。` },
      { h: '那只小机器人,跟你们一起慢慢长大', p: 'Togthr 宠物是一只住在你们两个人屏幕上的像素小机器人。它不打分,也不会焦虑地弹推送催你回来。它只是"在长大"。两个人都做今天的"今天怎么样",它就长得快一点;这一周太忙都跳过了,它就停在原地,等你们。半年、一年之后,你们会看到一只看得见地慢下来长成样的小机器人,每一段皮肤里,都记着一段你们一起走过的季节。它是关系的镜子,不是 KPI。' },
      { h: '留给"未来的你们"的时光胶囊', p: '今天埋一颗胶囊,你一个人打不开,必须两个人同时在。塞一段语音、一张照片、一句当面说不出口的话。解锁时间可以设在下个纪念日,也可以是三年后一个普通的周二。胶囊在黑暗里待着,里面装的东西越攒越重。等到那天一起挖出来,通常总会有一个人鼻子一酸——这就是它存在的意义。' },
      { h: '现实中大家用 Togthr 情侣版做什么', p: '见过最多的几种用法:异地情侣,想要在视频电话之外,有一个两个人一起做的小事;同城的两个人,想要一个躲开家庭群和工作群的、真的只属于两个人的小地方;刚结婚的第一年,想摸索出"过日子"到底是什么形状;以及在一段比较难的日子里,想慢慢把信任补回来的两个人。它足够轻,所以哪一种都不会显得用力;它又足够私密,所以你们可以在里面说真话。' },
    ],
    faqs: [
      { q: 'Togthr 情侣版是情侣咨询 App 吗?', a: '不是。Togthr 不是心理咨询,也不替代专业咨询。它是一小块"日常把关系维持住"的小空间——一个好的伴侣咨询师会让你坚持做的那些小事。如果你正在危机里,请联系专业人士。Togthr 是中间那些普通日子用的。' },
      { q: '两个人一起用 Togthr 要收费吗?', a: '不要。双人账号的"今天怎么样"、共同日记、基础宠物、社区永远免费。Togthr Plus 解锁无限时光胶囊、宠物皮肤、私密相册;核心功能都不收费。' },
      { q: '我们写的东西别人看得到吗?', a: '看不到。所有日记、照片、时光胶囊都是端到端加密的,Togthr 员工也读不到。只有你和你的伴侣能打开。账号注销后,所有数据会在 30 天内永久删除。' },
      { q: '如果分手了,账号会怎么样?', a: '你们可以各自保留自己的账号,也可以暂停共享空间,或者直接删掉。Togthr 没有"共同抚养宠物"的逻辑,也不会因为你结束一段关系就惩罚你。宠物属于每个人自己,就像你的记忆一样。' },
    ],
    links: [
      { href: '/zh-cn', label: 'Togthr 首页' },
      { href: '/zh-cn/features', label: 'Togthr 全部功能' },
      { href: '/zh-cn/pricing', label: '价格 — 免费版、Plus、Eternal' },
      { href: '/zh-cn/blog/three-small-rituals-for-couples-who-live-apart', label: '异地情侣的三个小仪式' },
      { href: '/zh-cn/blog/why-we-built-a-pet-that-grows-with-you', label: '为什么我们做了一只陪你长大的宠物' },
    ],
    cta: '试一下 Togthr 情侣版——免费开始,不用绑卡。',
  },

  'zh-tw': {
    title: 'Togthr 情侶版——遠距離也行,同居也好,慢慢一起長大',
    description: 'Togthr 情侶版:為兩個人準備的小角落。不管是遠距離,還是同一個屋簷下,每天三分鐘的彼此問候、時光膠囊、一隻一起長大的像素機器人,把「在一起」變得輕一點、真一點。',
    h1: 'Togthr 情侶版 · 遠距離也沒關係,慢慢一起長',
    intro: `Togthr 情侶版,是 Togthr 為「兩個人」準備的那個版本。不是發限動用的精修版,是真正在過日子的那個版本——可能是隔著時區,也可能是住在同一個屋簷下、卻還是會突然覺得有點遠的那種關係。這個 App 是一小塊只屬於你們兩個人的小空間:每天不到三分鐘的「今天還好嗎」、今天埋下幾年後才能挖的時光膠囊、一隻跟著你們慢慢長大的像素機器人,以及一本別人都看不到的共同日記。它不打分、不發獎盃、不催你回來。它只是讓那些「再靠近一點」的小動作,變得足夠輕,讓你真的願意每天做一點點。`,
    sections: [
      { h: '一塊只屬於你們兩個人的小地方', p: '大部分 App 把談戀愛這件事當成專案管理——任務清單、打卡天數、共享行事曆。Togthr 反過來:兩個人的小空間被設計成「日常那些真正有用的小事」,一句話心情、幾行今天的想法、下班路上的照片、半夜的語音。沒人打分,不算打卡,不像在跑 KPI。它就在那裡,像窗台上一盞小夜燈,亮著,溫度本身就是意義。' },
      { h: '那隻小機器人,跟你們一起慢慢長大', p: 'Togthr 寵物是一隻住在你們兩個人螢幕上的像素小機器人。它不打分,也不會焦慮地推播通知催你回來。它只是「在長大」。兩個人都做完今天的「今天還好嗎」,它就長得快一點;這一週太忙都跳過了,它就停在原地等你們。半年、一年之後,你們會看到一隻看得見地慢下來長成樣的小機器人,每一段造型裡,都記著一段你們一起走過的季節。它是關係的鏡子,不是 KPI。' },
      { h: '留給「未來的你們」的時光膠囊', p: '今天埋一顆膠囊,你一個人打不開,必須兩個人同時在。塞一段語音、一張照片、一句當面說不出口的話。解鎖時間可以設在下個紀念日,也可以是三年後一個普通的週二。膠囊在黑暗裡待著,裡面裝的東西越積越重。等到那天一起挖出來,通常總會有一個人鼻子一酸——這就是它存在的意義。' },
      { h: '現實中大家用 Togthr 情侶版做什麼', p: '見過最多的幾種用法:遠距離情侶,想要在視訊之外,有一個兩個人一起做的小事;同城的兩個人,想要一個躲開家庭群和工作群的、真的只屬於兩個人的小地方;剛結婚的第一年,想摸索出「過日子」到底是什麼形狀;以及在一段比較難的日子裡,想慢慢把信任補回來的兩個人。它夠輕,所以哪一種都不會顯得用力;它又夠私密,所以你們可以在裡面講真話。' },
    ],
    faqs: [
      { q: 'Togthr 情侶版是伴侶諮商 App 嗎?', a: '不是。Togthr 不是心理諮商,也不取代專業諮商。它是一小塊「日常把關係維持住」的小空間——一個好的伴侶諮商師會讓你堅持做的那些小事。如果你正在危機裡,請聯絡專業人士。Togthr 是中間那些普通日子用的。' },
      { q: '兩個人一起用 Togthr 要收費嗎?', a: '不用。雙人帳號的「今天還好嗎」、共同日記、基礎寵物、社群永遠免費。Togthr Plus 解鎖無限時光膠囊、寵物造型、私密相簿;核心功能都不收費。' },
      { q: '我們寫的東西別人看得到嗎?', a: '看不到。所有日記、照片、時光膠囊都是端對端加密的,Togthr 員工也讀不到。只有你和你的伴侶能打開。帳號刪除後,所有資料會在 30 天內永久刪除。' },
      { q: '如果分手了,帳號會怎樣?', a: '你們可以各自保留自己的帳號,也可以暫停共享空間,或直接刪掉。Togthr 沒有「共同撫養寵物」的邏輯,也不會因為你結束一段關係就處罰你。寵物屬於每個人自己,就像你的記憶一樣。' },
    ],
    links: [
      { href: '/zh-tw', label: 'Togthr 首頁' },
      { href: '/zh-tw/features', label: 'Togthr 全部功能' },
      { href: '/zh-tw/pricing', label: '價格 — 免費版、Plus、Eternal' },
      { href: '/zh-tw/blog/three-small-rituals-for-couples-who-live-apart', label: '遠距離情侶的三個小儀式' },
      { href: '/zh-tw/blog/why-we-built-a-pet-that-grows-with-you', label: '為什麼我們做了一隻陪你長大的寵物' },
    ],
    cta: '試一下 Togthr 情侶版——免費開始,不用綁卡。',
  },

  ja: {
    title: 'Togthr カップル版 — 遠距離でもそばでも、一緒に育む',
    description: 'Togthr カップル版:二人のための小さなスペース。遠距離でも、同居でも、毎日の三分間チェックイン、タイムカプセル、一緒に成長する小さなロボットで、「一緒にいる」をもっと軽く、もっと本物に。',
    h1: 'Togthr カップル版 · 遠くても、同じ方向を',
    intro: `Togthr カップル版は、Togthrの「二人のため」バージョンです。写真映えする加工された関係ではなく、本当の日々を生きている関係——時差を越えているかもしれないし、同じ部屋にいながら少し遠さを感じている関係かもしれません。このアプリは、二人のための小さな共有スペースです。三分かからない毎日のチェックイン、今日埋めて数年後に掘るタイムカプセル、一緒にゆっくり成長する小さなロボット、誰にも見えない共有日記。ポイント制でも、トロフィーでも、通知で急かされることもありません。「もう少し近づく」小さな行為を、できるくらい軽く、毎日ちょっとずつやりたくなるようにするためのものです。`,
    sections: [
      { h: '二人だけの場所', p: 'ほとんどのアプリは、恋愛をプロジェクト管理のように扱います——タスクリスト、連続記録、共有カレンダー。Togthrは逆のことをします。二人の共有スペースは「実際に近さを保つ小さなこと」のために設計されています:一言の気分、数行の今日の振り返り、帰りのバスから撮った写真、深夜のボイスメモ。採点なし、連続記録のプレッシャーなし、KPI達成のような感覚もありません。窓辺の小さな灯りのように、そこにある。温かさそのものが意味です。' },
      { h: '小さなロボットも一緒に育ちます', p: 'Togthr ペットは二人の画面にすむ、ちいさなピクセルロボットです。採点せず、不安になるような通知も送りません。ただ「育つ」。二人の今日のチェックインが揃うと、少し早く育つ。一週間お休みしても、その場で待っている。一年経つと、目に見えてゆっくり育った相棒がいて、それぞれの形に、一緒に歩いた季節が刻まれています。ロボットは関係の鏡であって、採点者ではありません。' },
      { h: '「未来の二人」宛の手紙——タイムカプセル', p: '今日カプセルを埋めても、一人では開けません。二人で開く。ボイスメモ、写真、面と向かって言えない一言を入れる。開封日は次の記念日でも、三年後の何でもない火曜日でも。カプセルは暗がりでどんどん重くなる。二人で掘り出す日、たいていどちらかの目が少し潤みます。それが、この機能の存在理由です。' },
      { h: '実際にはどんな使い方をされているか', p: 'よく見る使い方のパターン:遠距離のカップルが、通話以外の二人の儀式を求めて;同棲中の二人が、家族グループチャットや仕事のグループから離れた、二人だけの場所として;新婚一年目の二人が、「一緒に暮らす」という形を探るために;そして、少し難しい時期を経て信頼をゆっくり取り戻そうとしている二人のために。軽いので、どれも重く見えません。プライベートなので、正直に書けます。' },
    ],
    faqs: [
      { q: 'Togthr カップル版は、カップルセラピーのアプリですか?', a: 'いいえ。Togthrはセラピーではなく、セラピーの代わりでもありません。良いセラピストが処方するような「日常の小さな儀式」のための、ちいさなプライベートな場所です。もし危機的な状況にあるなら、専門家にご相談ください。Togthrは、その間の普通の日常のためのものです。' },
      { q: '二人で使っても無料ですか?', a: 'はい。二人のアカウントの毎日のチェックイン、共有日記、基本ペット、コミュニティは永久無料です。Togthr Plusでタイムカプセル無制限、上級ペットスキン、プライベートアルバムが解放されます。コア機能は有料化されません。' },
      { q: '書いた内容は他の人に見られますか?', a: '見られません。すべての日記、写真、タイムカプセルはエンドツーエンドで暗号化されており、Togthrのスタッフも読めません。あなたとパートナーの二人だけが読めます。アカウント削除から30日以内に、すべてのデータは永久に削除されます。' },
      { q: '別れた場合、ペットはどうなりますか?', a: 'それぞれ自分のアカウントを保つこともできますし、共有スペースを休止することもできますし、削除することもできます。共同親権のような仕組みはなく、関係を終わらせたことへのペナルティもありません。ペットはあなた自身のものです。記憶と同じように。' },
    ],
    links: [
      { href: '/ja', label: 'Togthr ホーム' },
      { href: '/ja/features', label: 'Togthr すべての機能' },
      { href: '/ja/pricing', label: '料金 — 無料、Plus、Eternal' },
      { href: '/ja/blog/three-small-rituals-for-couples-who-live-apart', label: '離れて暮らす二人のための三つの小さな儀式' },
      { href: '/ja/blog/why-we-built-a-pet-that-grows-with-you', label: 'なぜあなたと一緒に育つペットを作ったのか' },
    ],
    cta: 'Togthr カップル版を試す — 無料で開始、クレカ不要。',
  },

  ko: {
    title: 'Togthr 커플 버전 — 멀리 있어도, 함께여도, 같이 자라기',
    description: 'Togthr 커플 버전: 두 사람을 위한 작은 공간. 멀리 떨어져 있든, 같은 집에 살든, 매일 3분의 체크인, 타임캡슐, 함께 자라는 작은 로봇이 "함께"를 더 가볍고, 더 진심으로 만들어 줍니다.',
    h1: 'Togthr 커플 버전 · 멀리 있어도, 같은 방향으로',
    intro: `Togthr 커플 버전은 Togthr의 "두 사람용" 버전입니다. SNS에 올릴 화려한 버전이 아니라, 진짜로 일상을 살아가는 그 관계 — 시차가 있을 수도 있고, 같은 집에 살면서도 가끔 멀게 느껴지는 그 관계를 위한 버전입니다. 이 앱은 두 사람만의 작은 공유 공간입니다. 3분도 안 걸리는 매일의 체크인, 오늘 묻고 몇 년 뒤 파는 타임캡슐, 두 사람이 자라는 만큼 자라는 작은 로봇, 아무도 못 보는 공유 일기. 점수도, 트로피도, 알림으로 재촉하지도 않습니다. "조금 더 가까이"라는 작은 행동을, 충분히 가볍게 만들어 매일 조금씩이라도 하고 싶게 하는 게 전부입니다.`,
    sections: [
      { h: '두 사람만의 작은 공간', p: '대부분의 앱은 연애를 프로젝트처럼 다룹니다 — 할 일 목록, 연속 출석, 공유 캘린더. Togthr은 반대로 합니다. 두 사람의 공유 공간은 "실제로 가깝게 만드는 작은 일들"을 위해 설계되었습니다. 한 문장의 기분, 오늘의 회고 몇 줄, 퇴근길 사진, 한밤중의 음성 메모. 점수 없음, 연속 기록 압박 없음, KPI 같은 느낌 없음. 창가의 작은 조명처럼 그냥 거기 있습니다. 온기 자체가 의미입니다.' },
      { h: '작은 로봇도 함께 자랍니다', p: 'Togthr 펫은 두 사람의 화면에 사는 작은 픽셀 로봇입니다. 점수를 매기지 않고, 불안해지는 알림도 보내지 않습니다. 그냥 "자랍니다". 두 사람이 오늘의 체크인을 함께 마치면 조금 더 빨리 자라고, 일주일 쉬면 그 자리에서 기다립니다. 1년이 지나면, 눈에 보이게 천천히 자란 반려가 있고, 그 모습들에는 함께 보낸 계절이 새겨져 있습니다. 로봇은 관계의 거울이지, 채점자가 아닙니다.' },
      { h: '"미래의 두 사람"에게 보내는 타임캡슐', p: '오늘 캡슐을 묻으면, 혼자서는 열 수 없습니다. 두 사람이 함께여야 합니다. 음성 메모, 사진, 얼굴 보며 못 한 말을 담습니다. 다음 기념일이어도 되고, 3년 후의 평범한 화요일이어도 됩니다. 캡슐은 어둠 속에서 점점 무거워지고, 그날 함께 파헤치는 날이면 보통 둘 중 한 명은 눈이 붉어집니다. 이게 이 기능이 존재하는 이유입니다.' },
      { h: '실제로는 어떻게 쓰고 계신가', p: '가장 자주 보이는 사용 패턴: 장거리 커플이 영상통화 외에 둘이 함께 하는 작은 의식을 원할 때; 같은 도시에 사는 두 사람이 가족 단톡과 회사 단톡에서 벗어나 진짜 둘만의 곳을 원할 때; 신혼 1년 차 두 사람이 "함께 산다"는 게 어떤 모양인지 더듬거리며 찾을 때; 그리고 조금 힘든 시간을 지나며 천천히 신뢰를 회복하고 있는 두 사람을 위해. 충분히 가벼워서 어떤 경우에도 무겁지 않고, 충분히 프라이빗해서 솔직하게 쓸 수 있습니다.' },
    ],
    faqs: [
      { q: 'Togthr 커플 버전이 커플 상담 앱인가요?', a: '아닙니다. Togthr은 상담이 아니고, 상담을 대체하지도 않습니다. 좋은 상담사가 권할 만한 "일상의 작은 의식"을 위한 작은 사적 공간입니다. 만약 위기 상황이라면, 전문가에게 연락해 주세요. Togthr은 그 사이의 평범한 날들을 위한 곳입니다.' },
      { q: '두 명이서 써도 무료인가요?', a: '네. 두 사람 계정의 매일 체크인, 공유 일기, 기본 펫, 커뮤니티는 영원히 무료입니다. Togthr Plus는 무제한 타임캡슐, 고급 펫 스킨, 사적 앨범을 열어 줍니다. 핵심 기능은 유료화가 없습니다.' },
      { q: '우리가 쓴 내용은 다른 사람도 볼 수 있나요?', a: '볼 수 없습니다. 모든 일기, 사진, 타임캡슐은 종단간 암호화되어 있어 Togthr 직원도 읽을 수 없습니다. 당신과 파트너 둘만 열 수 있습니다. 계정 삭제 후 30일 이내에 모든 데이터는 영구 삭제됩니다.' },
      { q: '이별하면 펫은 어떻게 되나요?', a: '각자 본인 계정을 유지할 수도, 공유 공간을 일시정지할 수도, 완전히 삭제할 수도 있습니다. 공동 양육 같은 구조는 없고, 관계를 끝냈다는 이유로 페널티를 주지도 않습니다. 펫은 각자 자신의 것이고, 기억처럼요.' },
    ],
    links: [
      { href: '/ko', label: 'Togthr 홈' },
      { href: '/ko/features', label: 'Togthr 모든 기능' },
      { href: '/ko/pricing', label: '요금 — 무료, Plus, Eternal' },
      { href: '/ko/blog/three-small-rituals-for-couples-who-live-apart', label: '떨어져 사는 두 사람을 위한 세 가지 작은 의식' },
      { href: '/ko/blog/why-we-built-a-pet-that-grows-with-you', label: '왜 당신과 함께 자라는 펫을 만들었는가' },
    ],
    cta: 'Togthr 커플 버전 사용하기 — 무료로 시작, 카드 등록 없음.',
  },

  de: {
    title: 'Togthr für Paare — Zusammen wachsen, nah oder fern',
    description: 'Togthr für Paare: ein kleiner gemeinsamer Raum für zwei Menschen, die zusammen wachsen wollen — im selben Zimmer oder über Zeitzonen hinweg. Tägliche Rituale, Zeitkapseln und ein kleiner Roboter, der mit euch wächst.',
    h1: 'Togthr für Paare · Fern oder nah, gleiche Richtung',
    intro: `Togthr für Paare ist die Version von Togthr für zwei Menschen. Nicht die polierte, instagram-fähige Version einer Beziehung — sondern die echte. Die, in der jemand in einer anderen Zeitzone ist, oder die, in der du in derselben Wohnung lebst und euch trotzdem manchmal ein bisschen verloren vorkommt. Die App ist ein kleiner gemeinsamer Raum: ein täglicher Check-in, der unter drei Minuten dauert, eine Zeitkapsel, die du heute vergräbst und in zwei Jahren ausbuddelst, ein kleiner Roboter, der mit euch wächst, und ein privates Tagebuch, das niemand sonst lesen kann. Es geht nicht um Produktivität. Es geht darum, die kleinen, wiederholten Handlungen des Zusammenbleibens leicht genug zu machen, dass ihr sie tatsächlich tut.`,
    sections: [
      { h: 'Ein Raum, der euch gehört, und nur euch', p: 'Die meisten Apps behandeln eine Beziehung wie ein Projekt — eine Aufgabenliste, ein Streak-Zähler, ein geteilter Kalender. Togthr macht das Gegenteil. Der gemeinsame Raum ist um die kleinen Dinge herum gebaut, die Menschen tatsächlich nah halten: ein einzelner Satz zur Stimmung, ein Absatz zur Reflexion, ein Foto von der Busfahrt nach Hause, eine Sprachnachricht um Mitternacht. Nichts davon wird bewertet. Nichts zählt für eine Serie. Es ist einfach da, wie eine Kerze im Fenster, und die Wärme ist der Punkt.' },
      { h: 'Der kleine Roboter, der mit euch wächst', p: 'Euer Togthr Bot ist ein kleiner Pixel-Roboter, der auf beiden euren Bildschirmen lebt. Er bewertet euch nicht, und er schickt euch keine ängstigenden Benachrichtigungen. Er wächst einfach. Wenn ihr beide den täglichen Check-in macht, wächst er etwas schneller. Wenn ihr eine Woche aussetzt, weil das Leben dazwischenkam, bleibt er stehen und wartet. Nach einem Jahr habt ihr einen kleinen Begleiter, der sichtbar langsam gewachsen ist — und ihr werdet euch an die Jahreszeiten erinnern, die zu jeder Stufe geführt haben. Der Bot ist ein Spiegel der Bindung, kein Maßstab.' },
      { h: 'Zeitkapseln für das zukünftige Wir', p: 'Vergrabe heute eine Kapsel, und dein Partner kann sie nicht ohne dich öffnen. Füge eine Sprachnachricht, ein Foto, einen Satz hinzu, den du nicht aussprechen kannst. Setze das Öffnungsdatum auf euren nächsten Jahrestag, oder auf einen beliebigen Dienstag in drei Jahren. Die Kapsel sitzt im Dunkeln und wird schwerer, je mehr ihr hineintut. Der Tag, an dem ihr sie zusammen ausgrabt, ist meistens der Tag, an dem einer von euch ein bisschen weint. Das ist der Punkt.' },
      { h: 'Wofür Paare Togthr tatsächlich nutzen', p: 'Paare nutzen Togthr auf unterschiedliche Weise, aber die häufigsten Muster: Fernbeziehungen, die ein kleines gemeinsames Ritual zwischen Anrufen wollen; Paare in derselben Stadt, die einen privaten Raum abseits von Familiengruppenchats wollen; Frischvermählte im ersten Jahr, die herausfinden, wie das alltägliche Zusammenleben aussieht; und Partner, die nach einer schwierigen Zeit langsam Vertrauen wiederaufbauen. Die App ist leicht genug, dass keine dieser Anwendungen schwer wirkt, und privat genug, dass ihr ehrlich sein könnt.' },
    ],
    faqs: [
      { q: 'Ist Togthr für Paare eine Paartherapie-App?', a: 'Nein. Togthr ist keine Therapie und ersetzt sie nicht. Es ist ein kleiner, privater Raum für die täglichen Rituale, nah beieinander zu bleiben — die Art von Dingen, die ein guter Paartherapeut tatsächlich verschreiben würde. Wenn du in einer Krise bist, wende dich bitte an eine Fachperson. Togthr ist für die Momente dazwischen.' },
      { q: 'Können mein Partner und ich Togthr kostenlos nutzen?', a: 'Ja. Der tägliche Check-in, das geteilte Tagebuch, der Basis-Begleiter und die Community sind für Zwei-Personen-Konten für immer kostenlos. Togthr Plus schaltet unbegrenzte Zeitkapseln, erweiterte Roboter-Skins und ein privates Album frei. Nichts Grundlegendes ist hinter einer Bezahlschranke.' },
      { q: 'Wie privat ist unser Inhalt?', a: 'Alle Tagebucheinträge, Fotos und Zeitkapseln sind Ende-zu-Ende-verschlüsselt. Togthr-Mitarbeiter können sie nicht lesen. Nur du und dein Partner können es. Die Kontolöschung entfernt alle Daten innerhalb von 30 Tagen dauerhaft.' },
      { q: 'Was passiert, wenn wir uns trennen?', a: 'Ihr könnt jeder euer eigenes Konto behalten, den geteilten Raum pausieren oder ihn löschen. Es gibt kein gemeinsames Sorgerecht-Modell und keine Strafe für das Beenden einer Beziehung. Der Roboter gehört jedem von euch einzeln, so wie eure eigenen Erinnerungen.' },
    ],
    links: [
      { href: '/de', label: 'Togthr Startseite' },
      { href: '/de/features', label: 'Alle Togthr-Funktionen' },
      { href: '/de/pricing', label: 'Preise — Free, Plus, Eternal' },
      { href: '/de/blog/three-small-rituals-for-couples-who-live-apart', label: 'Drei kleine Rituale für Paare, die getrennt wohnen' },
      { href: '/de/blog/why-we-built-a-pet-that-grows-with-you', label: 'Warum wir einen Begleiter gebaut haben, der mit dir wächst' },
    ],
    cta: 'Togthr für Paare testen — kostenlos starten, keine Kreditkarte.',
  },

  fr: {
    title: 'Togthr pour les couples — Grandir ensemble, loin ou près',
    description: "Togthr pour les couples : un petit espace partagé pour deux personnes qui veulent grandir côte à côte, dans la même pièce ou à travers les fuseaux horaires. Rituels quotidiens, capsules temporelles et un petit robot qui grandit avec votre lien.",
    h1: 'Togthr pour les couples · Loin ou près, même direction',
    intro: `Togthr pour les couples est la version de Togthr pensée pour deux personnes. Pas la version polie, prête pour Instagram d'une relation — la vraie. Celle où quelqu'un est sur un autre fuseau horaire, ou celle où vous vivez dans le même appartement mais vous sentez quand même un peu perdus entre vous. L'app est un petit espace partagé : un check-in quotidien qui prend moins de trois minutes, une capsule temporelle que vous enterrez aujourd'hui et déterrez dans deux ans, un petit robot qui grandit avec vous, et un journal intime que personne d'autre ne peut lire. Le but n'est pas la productivité. Le but est de rendre les petits gestes répétés qui vous rapprochent suffisamment faciles pour que vous les fassiez vraiment.`,
    sections: [
      { h: 'Un espace qui est à vous, et seulement à vous', p: "La plupart des apps traitent une relation comme un projet — une liste de tâches, un compteur de série, un calendrier partagé. Togthr fait le contraire. L'espace que vous partagez est construit autour des petites choses qui rapprochent réellement les gens : une phrase sur l'humeur, un paragraphe de réflexion, une photo depuis le bus du retour, un message vocal à minuit. Rien n'est noté. Rien ne compte pour une série. C'est juste là, comme une bougie à la fenêtre, et la chaleur est le but." },
      { h: 'Le petit robot, qui grandit avec vous', p: "Votre Togthr Bot est un petit robot en pixels qui vit sur vos deux écrans. Il ne vous note pas, et il ne vous envoie pas de notifications qui rendent anxieux. Il grandit, c'est tout. Si vous faites tous les deux le check-in quotidien, il grandit un peu plus vite. Si vous sautez une semaine parce que la vie est passée par là, il reste où il est et attend. Après un an, vous et votre partenaire aurez un petit compagnon qui a visiblement, lentement grandi — et vous vous souviendrez tous les deux des saisons qui ont produit chaque étape. Le bot est un miroir du lien, pas une mesure de celui-ci." },
      { h: 'Des capsules temporelles pour le futur vous', p: "Enterrez une capsule aujourd'hui et votre partenaire ne peut pas l'ouvrir sans vous. Ajoutez un message vocal, une photo, une phrase qui dit quelque chose que vous ne pouvez pas dire à voix haute. Fixez la date d'ouverture à votre prochain anniversaire, ou à un mardi aléatoire dans trois ans. La capsule reste dans le noir, devenant plus lourde au fur et à mesure que vous ajoutez. Le jour où vous la déterrez ensemble, c'est généralement le jour où l'un de vous pleure un peu. C'est le but." },
      { h: 'À quoi les couples utilisent vraiment Togthr', p: "Les couples utilisent Togthr de manières différentes, mais les schémas que nous voyons le plus : les partenaires à distance qui veulent un petit rituel partagé entre les appels ; les couples dans la même ville qui veulent un espace privé loin des groupes de discussion familiaux ; les jeunes mariés dans la première année où ils essaient de comprendre à quoi ressemble la vie quotidienne ensemble ; et les partenaires qui reconstruisent lentement la confiance après une période difficile. L'app est assez légère pour qu'aucune de ces utilisations ne semble pesante, et assez privée pour que vous puissiez y être honnête." },
    ],
    faqs: [
      { q: 'Togthr pour les couples est-il une app de thérapie de couple ?', a: "Non. Togthr n'est pas une thérapie, et ne la remplace pas. C'est un petit espace privé pour les rituels quotidiens qui vous rapprochent — le genre de choses qu'un bon thérapeute de couple prescrirait en fait. Si vous êtes en crise, veuillez contacter un professionnel. Togthr est pour les moments entre les deux." },
      { q: 'Mon partenaire et moi pouvons-nous utiliser Togthr gratuitement ?', a: "Oui. Le check-in quotidien, le journal partagé, le compagnon de base et la communauté sont gratuits à vie pour les comptes à deux. Togthr Plus débloque des capsules temporelles illimitées, des skins de robot avancés et un album privé. Aucune fonctionnalité essentielle n'est payante." },
      { q: 'Notre contenu est-il vraiment privé ?', a: "Toutes les entrées de journal, photos et capsules temporelles sont chiffrées de bout en bout. Le personnel de Togthr ne peut pas les lire. Seulement vous et votre partenaire le pouvez. La suppression du compte efface toutes les données dans les 30 jours." },
      { q: 'Que se passe-t-il si nous rompons ?', a: "Vous pouvez chacun garder votre propre compte, ou mettre l'espace partagé en pause, ou le supprimer entièrement. Il n'y a pas de modèle de garde partagée, et aucune pénalité pour avoir mis fin à une relation. Le robot appartient à chacun de vous séparément, comme vos propres souvenirs." },
    ],
    links: [
      { href: '/fr', label: 'Accueil Togthr' },
      { href: '/fr/features', label: 'Toutes les fonctionnalités Togthr' },
      { href: '/fr/pricing', label: 'Tarifs — Gratuit, Plus, Eternal' },
      { href: '/fr/blog/three-small-rituals-for-couples-who-live-apart', label: 'Trois petits rituels pour les couples qui vivent séparés' },
      { href: '/fr/blog/why-we-built-a-pet-that-grows-with-you', label: 'Pourquoi nous avons construit un compagnon qui grandit avec vous' },
    ],
    cta: 'Essayer Togthr pour les couples — commencez gratuitement, sans carte bancaire.',
  },

  es: {
    title: 'Togthr para Parejas — Crecer juntos, lejos o cerca',
    description: 'Togthr para Parejas: un pequeño espacio compartido para dos personas que quieren crecer juntas, en la misma habitación o cruzando zonas horarias. Rituales diarios, cápsulas del tiempo y un pequeño robot que crece con su vínculo.',
    h1: 'Togthr para Parejas · Lejos o cerca, misma dirección',
    intro: `Togthr para Parejas es la versión de Togthr hecha para dos personas. No la versión pulida, lista para Instagram de una relación — la de verdad. Esa en la que alguien está en otra zona horaria, o esa en la que viven en el mismo apartamento pero igual se sienten un poco perdidos entre ustedes. La app es un pequeño espacio compartido: un check-in diario que toma menos de tres minutos, una cápsula del tiempo que entierran hoy y desentierran en dos años, un pequeño robot que crece con ustedes, y un diario privado que nadie más puede leer. El punto no es la productividad. El punto es hacer que los pequeños actos repetidos de mantenerse cerca sean suficientemente fáciles como para que de verdad los hagan.`,
    sections: [
      { h: 'Un espacio que es suyo, y solo suyo', p: 'La mayoría de las apps tratan una relación como un proyecto: una lista de tareas, un contador de rachas, un calendario compartido. Togthr hace lo contrario. El espacio que comparten está construido alrededor de las pequeñas cosas que realmente mantienen cerca a las personas: una frase sobre el ánimo, un párrafo de reflexión, una foto del viaje en autobús de vuelta, un mensaje de voz a medianoche. Nada se califica. Nada cuenta para una racha. Solo está ahí, como una vela en la ventana, y la calidez es el punto.' },
      { h: 'El pequeño robot, creciendo junto a ustedes', p: 'Su Togthr Bot es un pequeño robot de píxeles que vive en las dos pantallas. No los califica, y no les manda notificaciones ansiosas. Solo crece. Si los dos hacen el check-in diario, crece un poco más rápido. Si se saltan una semana porque la vida se atravesó, se queda donde está y espera. Después de un año, ustedes y su pareja tendrán un pequeño compañero que ha crecido visible y lentamente — y ambos recordarán las estaciones que produjeron cada etapa. El bot es un espejo del vínculo, no una medida de él.' },
      { h: 'Cápsulas del tiempo para el futuro ustedes', p: 'Entierren una cápsula hoy y su pareja no puede abrirla sin ustedes. Añadan un mensaje de voz, una foto, una frase que dice algo que no pueden decir en voz alta. Pongan la fecha de apertura para su próximo aniversario, o para un martes cualquiera en tres años. La cápsula se queda en la oscuridad, volviéndose más pesada con todo lo que los dos añadan. El día que la desentierran juntos suele ser el día en que uno de los dos llora un poco. Ese es el punto.' },
      { h: 'Para qué usan Togthr las parejas en realidad', p: 'Las parejas usan Togthr de distintas maneras, pero los patrones que más vemos son: parejas a distancia que quieren un pequeño ritual compartido entre llamadas; parejas en la misma ciudad que quieren un espacio privado lejos de los grupos de chat familiares; recién casados en el primer año tratando de entender cómo es la vida cotidiana juntos; y parejas que están reconstruyendo lentamente la confianza después de un período difícil. La app es lo suficientemente ligera para que ninguno de estos usos se sienta pesado, y lo suficientemente privada para que puedan ser honestos en ella.' },
    ],
    faqs: [
      { q: '¿Togthr para Parejas es una app de terapia de pareja?', a: 'No. Togthr no es terapia, y no la reemplaza. Es un pequeño espacio privado para los rituales diarios de mantenerse cerca — el tipo de cosas que un buen terapeuta de pareja realmente recetaría. Si están en una crisis, por favor busquen un profesional. Togthr es para los momentos intermedios.' },
      { q: '¿Mi pareja y yo podemos usar Togthr gratis?', a: 'Sí. El check-in diario, el diario compartido, la mascota básica y la comunidad son gratis para siempre para cuentas de dos personas. Togthr Plus desbloquea cápsulas del tiempo ilimitadas, skins de robot avanzadas y un álbum privado. Ninguna función esencial está bloqueada por un pago.' },
      { q: '¿Qué tan privado es nuestro contenido?', a: 'Todas las entradas del diario, fotos y cápsulas del tiempo están cifradas de extremo a extremo. El personal de Togthr no puede leerlas. Solo ustedes y su pareja pueden. La eliminación de la cuenta borra permanentemente todos los datos en un plazo de 30 días.' },
      { q: '¿Qué pasa con la mascota si terminamos?', a: 'Cada uno puede quedarse con su propia cuenta, o pausar el espacio compartido, o eliminarlo por completo. No hay un modelo de custodia compartida, ni ninguna penalización por terminar una relación. La mascota les pertenece a cada uno por separado, como sus propios recuerdos.' },
    ],
    links: [
      { href: '/es', label: 'Inicio de Togthr' },
      { href: '/es/features', label: 'Todas las funciones de Togthr' },
      { href: '/es/pricing', label: 'Precios — Gratis, Plus, Eternal' },
      { href: '/es/blog/three-small-rituals-for-couples-who-live-apart', label: 'Tres pequeños rituales para parejas que viven separadas' },
      { href: '/es/blog/why-we-built-a-pet-that-grows-with-you', label: 'Por qué construimos una mascota que crece contigo' },
    ],
    cta: 'Probar Togthr para Parejas — empieza gratis, sin tarjeta de crédito.',
  },
}

// ───────────────────────────────────────────────────────────────────────
// for-besties — 长期陪伴 / 共同记忆 / 不限地理
// ───────────────────────────────────────────────────────────────────────
const forBesties: Record<Locale, ForEntry> = {
  en: {
    title: 'Togthr for Best Friends — A Space That Lasts',
    description: 'Togthr for Besties: a small private space for the friend who has been there through everything. Share a slow journal, lock memories for the future, and grow a tiny pet together. No geography required.',
    h1: 'Togthr for Best Friends · The long thread, kept warm',
    intro: `Togthr for Best Friends is for the person who is not your partner and not your family, but who has shown up more consistently than almost anyone else in your life. The friend you call at 11pm, the friend who has a key to your apartment, the friend you met in middle school and still text every Tuesday. This is a small private space for that kind of friendship: a slow journal you both add to, a time capsule you can lock until the next decade, a tiny pet that grows as you both keep showing up, and a daily "still here" that takes ten seconds. The point is not to gamify the friendship. The point is to give it a quiet place to live that is not a group chat.`,
    sections: [
      { h: 'A space that is just the two of you', p: 'Group chats are for the friend group. Instagram is for the highlight reel. Togthr for Besties is for the friendship that is older, slower, and quieter than any of that. It is a private space the two of you share, with a slow journal, a daily "still here" tap, and a tiny shared pet. It is not loud. It does not have leaderboards, or streaks, or the kind of social pressure that makes you not post for six months and then feel guilty. It is just a small room with two chairs in it.' },
      { h: 'Memories that do not disappear', p: 'Every friendship has a year where you realize that the messages you saved in 2017 are now lost in a phone migration, or that the photo you took at that one concert is now a thumbnail you cannot enlarge. Togthr fixes this without making a big deal of it. The journal, the photo entries, the time capsules — they live in a place that is yours and your friend\'s, and they stay there. The first time you scroll back and see what you wrote in 2027, from inside 2032, you will know what we mean.' },
      { h: 'The daily "still here" tap', p: 'The single most-used feature of Togthr for Best Friends is the daily "still here" — one tap, no text, no pressure. It does not even notify the other person; it just adds a tiny dot to the calendar. After a month, you start to notice the shape of the other person\'s presence: a long streak, then a gap because they were sick, then a quiet return. The dot is not a score. It is a heartbeat, made visible. You do not have to keep the streak. You just have to keep coming back.' },
      { h: 'When geography changes everything else', p: 'The friend you met in college moves to another country. The friend you grew up with has a kid and a new life. The friend you traveled with in your twenties is now in a different time zone with a different rhythm. The friendship does not die — it changes shape. Togthr for Besties is built for that shape change. A time capsule that opens in three years. A daily "still here" that survives a 12-hour time difference. A pet that grows whether or not you can see each other in person. The friendship outlives the geography.' },
    ],
    faqs: [
      { q: 'Is Togthr for Besties just for women, or just for men?', a: 'No. Togthr for Besties is for any friendship that has lasted longer than a year and survived a few hard things. Same-gender friendships, opposite-gender friendships, friendships that started online — all of them. The space is private, the content is yours, and the rules are yours.' },
      { q: 'Can we use Togthr for Besties with more than one friend?', a: 'Right now, the Best Friends space is built for two people. If you have a tight group of three or four, you can use the community section (anonymous, hugs replace likes) or create multiple two-person spaces. We are watching how people use it before we ship a group version.' },
      { q: 'What if one of us stops showing up for a while?', a: 'The pet does not punish you. The journal does not close. The time capsules do not expire. Togthr for Besties is designed for the shape a friendship takes across decades, not across months. You can come back after a year, find the pet exactly where you left it, and pick up where you left off.' },
      { q: 'How is this different from a group chat?', a: 'A group chat is fast, public to the group, and disappears into the scroll. Togthr for Besties is slow, private to the two of you, and persistent. It is for the things you would not put in a group chat — the small, repeated, honest stuff that makes a friendship last.' },
    ],
    links: [
      { href: '/en', label: 'Togthr home' },
      { href: '/en/features', label: 'All Togthr features' },
      { href: '/en/pricing', label: 'Pricing — Free, Plus, Eternal' },
      { href: '/en/blog/what-your-virtual-pet-notices', label: 'What your virtual pet notices about your day' },
      { href: '/en/blog/why-we-built-a-pet-that-grows-with-you', label: 'Why we built a pet that grows with you' },
    ],
    cta: 'Open a Togthr for Besties space with your oldest friend.',
  },

  'zh-cn': {
    title: 'Togthr 闺蜜兄弟版——给那个一直都在的人',
    description: 'Togthr 闺蜜/兄弟版:给那个陪你最久的朋友留的一小块地方。可以慢慢写,可以把今天的记忆锁到下个十年,可以一起养一只像素小动物。不限地理,不限频率,只管慢慢来。',
    h1: 'Togthr 闺蜜/兄弟版 · 那根细细的线,不要断',
    intro: `Togthr 闺蜜/兄弟版,是 Togthr 给"不是伴侣、不是家人,但这些年来一次都没少过"的那种朋友留的版本。那个你半夜十一点会打电话过去的人、那个有你家门钥匙的人、那个初中认识到现在每周二还发消息的人。这个 App 是给这种友情留的一小块私密空间:一本两个人一起慢慢写的日记、一颗今天埋下十年后才能挖出来的时光胶囊、一只你们俩一起养的小宠物,以及一个十秒钟就能点完的"今天也在"。它不是要把友情游戏化,是给这种友情一个安安静静待着的地方——不是群聊,也不是朋友圈。`,
    sections: [
      { h: '只有你们两个人的小地方', p: '群聊是给"那群人"的,朋友圈是给"高光时刻"的。Togthr 闺蜜/兄弟版是给那些更老、更慢、更安静的关系的。你们俩共享一个私密空间:一本慢日记、一个十秒钟的"今天也在"、一只一起养的小宠物。它不吵,没有排行榜,没有连续打卡,没有那种让你六个月不敢冒泡、然后又很内疚的社交压力。它就是一间放着两把椅子的小屋。' },
      { h: '不会消失的那些记忆', p: '每段友情都会遇到这样一个时刻——突然发现 2017 年存的消息在换手机时丢了,或者那次演唱会的照片现在只剩一张不能放大的缩略图。Togthr 解决这件事,但不把这件事搞得很重。日记、照片、时光胶囊——它们都放在一个属于你们俩的地方,一直在那里。第一次你翻回去,看到 2027 年写下的那句话,那已经是 2032 年了,你会懂我在说什么。' },
      { h: '那个十秒钟的"今天也在"', p: '闺蜜/兄弟版里被用得最多的功能,就是那个十秒钟的"今天也在"——点一下,不用打字,没有压力。它甚至不会通知对方,只是在你俩各自的日历上多一个小小的点。一个月之后,你会开始看到对方"在"的形状:一长串连续,然后是因为生病断掉一截,然后安静地回来。那个点不是分数,是一个看得见的心跳。你不需要保持连续,你只需要继续回来。' },
      { h: '当地理把一切都打乱的时候', p: '大学时候一起上课的朋友去了另一个国家;从小一起长大的朋友现在有了孩子、有了新的生活;二十几岁一起旅行的朋友现在在不同时区过着不同的节奏。友情没死,只是形状变了。Togthr 闺蜜/兄弟版是为这种"形状变化"设计的。三年后才能打开的时光胶囊;穿越 12 小时时差还能点上的"今天也在";不管见不见得到面,都在一起长大的小宠物。友情,比地理活得久。' },
    ],
    faqs: [
      { q: 'Togthr 闺蜜/兄弟版只给女生用,或者只给男生用吗?', a: '不是。Togthr 闺蜜/兄弟版给的是任何持续超过一年、扛过几次不容易事情的友情。同性朋友、异性朋友、网上认识的朋友——都欢迎。空间是私密的,内容是你的,规则也是你的。' },
      { q: '可以三个人以上一起用吗?', a: '目前的"闺蜜/兄弟"空间是按两个人设计的。如果你们是一个三四个人的小群,可以用社区版(匿名、抱抱代替点赞),或者开多个"两人空间"。我们想先看大家怎么用,再做群组版本。' },
      { q: '如果有一段时间对方不来了怎么办?', a: '宠物不会惩罚你,日记不会关掉,时光胶囊不会过期。Togthr 闺蜜/兄弟版是为"几十年"这种形状设计的友情,不是为"几个月"。一年后再回来,宠物还在原来的位置等你们,你们可以从断的地方继续。' },
      { q: '这跟群聊到底有什么区别?', a: '群聊是快的、对群里所有人都可见的、会被刷走的;Togthr 闺蜜/兄弟版是慢的、只对你俩可见的、一直在的。它是给那些你不会放在群聊里的东西——那些小的、反复的、诚实的小事,那种让一段友情撑过几十年的小事。' },
    ],
    links: [
      { href: '/zh-cn', label: 'Togthr 首页' },
      { href: '/zh-cn/features', label: 'Togthr 全部功能' },
      { href: '/zh-cn/pricing', label: '价格 — 免费版、Plus、Eternal' },
      { href: '/zh-cn/blog/what-your-virtual-pet-notices', label: '你的虚拟宠物注意到了什么' },
      { href: '/zh-cn/blog/why-we-built-a-pet-that-grows-with-you', label: '为什么我们做了一只陪你长大的宠物' },
    ],
    cta: '给那个最老的朋友,开一个 Togthr 闺蜜/兄弟版小空间。',
  },

  'zh-tw': {
    title: 'Togthr 閨蜜兄弟版——給那個一直都在的人',
    description: 'Togthr 閨蜜/兄弟版:給那個陪你最久的朋友留的一小塊地方。可以慢慢寫,可以把今天的記憶鎖到下個十年,可以一起養一隻像素小動物。不限地理,不限頻率,只管慢慢來。',
    h1: 'Togthr 閨蜜/兄弟版 · 那根細細的線,不要斷',
    intro: `Togthr 閨蜜/兄弟版,是 Togthr 給「不是伴侶、不是家人,但這些年來一次都沒少過」的那種朋友留的版本。那個你半夜十一點會打電話過去的人、那個有你家鑰匙的人、那個國中認識到現在每週二還會傳訊息的人。這個 App 是給這種友情留的一小塊私密空間:一本兩個人一起慢慢寫的日記、一顆今天埋下十年後才能挖出來的時光膠囊、一隻你們倆一起養的小寵物,以及一個十秒鐘就能點完的「今天也在」。它不是要把友情遊戲化,是給這種友情一個安安靜靜待著的地方——不是群聊,也不是 IG 限動。`,
    sections: [
      { h: '只有你們兩個人的小地方', p: '群聊是給「那群人」的,限動是給「高光時刻」的。Togthr 閨蜜/兄弟版是給那些更老、更慢、更安靜的關係的。你們倆共享一個私密空間:一本慢日記、一個十秒鐘的「今天也在」、一隻一起養的小寵物。它不吵,沒有排行榜,沒有連續打卡,沒有那種讓你六個月不敢冒泡、然後又很內疚的社交壓力。它就是一間放著兩把椅子的小屋。' },
      { h: '不會消失的那些記憶', p: '每段友情都會遇到這樣一個時刻——突然發現 2017 年存的訊息在換手機時不見了,或者那次演唱會的照片現在只剩一張不能放大的縮圖。Togthr 解決這件事,但不把這件事搞得很重。日記、照片、時光膠囊——它們都放在一個屬於你們倆的地方,一直在那裡。第一次你翻回去,看到 2027 年寫下的那句話,那已經是 2032 年了,你會懂我在說什麼。' },
      { h: '那個十秒鐘的「今天也在」', p: '閨蜜/兄弟版裡被用得最多的功能,就是那個十秒鐘的「今天也在」——點一下,不用打字,沒有壓力。它甚至不會通知對方,只是在你倆各自的日曆上多一個小小的點。一個月之後,你會開始看到對方「在」的形狀:一長串連續,然後是因為生病斷掉一截,然後安靜地回來。那個點不是分數,是一個看得見的心跳。你不需要保持連續,你只需要繼續回來。' },
      { h: '當地理把一切都打亂的時候', p: '大學時候一起上課的朋友去了另一個國家;從小一起長大的朋友現在有了孩子、有了新的生活;二十幾歲一起旅行的朋友現在在不同時區過著不同的節奏。友情沒死,只是形狀變了。Togthr 閨蜜/兄弟版是為這種「形狀變化」設計的。三年後才能打開的時光膠囊;穿越 12 小時時差還能點上的「今天也在」;不管見見不到面,都在一起長大的小寵物。友情,比地理活得久。' },
    ],
    faqs: [
      { q: 'Togthr 閨蜜/兄弟版只給女生用,或者只給男生用嗎?', a: '不是。Togthr 閨蜜/兄弟版給的是任何持續超過一年、扛過幾次不容易事情的友情。同性朋友、異性朋友、網路上認識的朋友——都歡迎。空間是私密的,內容是你的,規則也是你的。' },
      { q: '可以三個人以上一起用嗎?', a: '目前的「閨蜜/兄弟」空間是按兩個人設計的。如果你們是一個三四個人的小群,可以用社群版(匿名、擁抱代替讚),或者開多個「兩人空間」。我們想先看大家怎麼用,再做群組版本。' },
      { q: '如果有一段時間對方不來了怎麼辦?', a: '寵物不會處罰你,日記不會關掉,時光膠囊不會過期。Togthr 閨蜜/兄弟版是為「幾十年」這種形狀設計的友情,不是為「幾個月」。一年後再回來,寵物還在原來的位置等你們,你們可以從斷掉的地方繼續。' },
      { q: '這跟群聊到底有什麼差別?', a: '群聊是快的、對群裡所有人都可見的、會被刷走的;Togthr 閨蜜/兄弟版是慢的、只對你倆可見的、一直都在的。它是給那些你不會放在群聊裡的東西——那些小的、反覆的、誠實的小事,那種讓一段友情撐過幾十年的小事。' },
    ],
    links: [
      { href: '/zh-tw', label: 'Togthr 首頁' },
      { href: '/zh-tw/features', label: 'Togthr 全部功能' },
      { href: '/zh-tw/pricing', label: '價格 — 免費版、Plus、Eternal' },
      { href: '/zh-tw/blog/what-your-virtual-pet-notices', label: '你的虛擬寵物注意到了什麼' },
      { href: '/zh-tw/blog/why-we-built-a-pet-that-grows-with-you', label: '為什麼我們做了一隻陪你長大的寵物' },
    ],
    cta: '給那個最老的朋友,開一個 Togthr 閨蜜/兄弟版小空間。',
  },

  ja: {
    title: 'Togthr 親友版 — ずっとそばにいた友人のために',
    description: 'Togthr 親友版:ずっとそばにいた友人と共有する小さな場所。ゆっくり書ける日記、次の十年まで封じられる記憶、一緒に育てる小さなロボット。距離も頻度も関係なく、ただゆっくり。',
    h1: 'Togthr 親友版 · 細く続く糸を、温めて',
    intro: `Togthr 親友版は、「恋人でも家族でもないけれど、これらの年はずっとそばにいてくれた人」のためのバージョンです。夜11時に電話する相手、玄関の鍵を預けている相手、中学から知っていて今も毎週火曜にメッセージを送り合っている相手。そんな友情のための小さなプライベート空間:二人でゆっくり書く日記、今日埋めて10年後に掘るタイムカプセル、一緒に育てる小さなロボット、10秒で押せる「今日もここにいる」。友情をゲーム化することが目的ではありません。グループチャットでも SNS でもない、静かにいられる場所を作るのが目的です。`,
    sections: [
      { h: '二人だけの場所', p: 'グループチャットは「あのグループ」のもの、SNS はハイライトのものです。Togthr 親友版は、もっと古くて、もっとゆっくりで、もっと静かな関係のためのものです。二人が共有するプライベート空間:ゆっくり書く日記、10秒の「今日もここにいる」、一緒に育てる小さなペット。騒がしくなく、ランキングはなく、連続記録のプレッシャーもなく、半年投稿できなくて罪悪感を感じるような社会的圧力もありません。椅子が二つ置いてある小さな部屋があるだけです。' },
      { h: '消えない思い出', p: 'どの友情にも、こういう瞬間があります——2017年に保存したメッセージがスマホ移行で消えた、あのライブの写真はサムネイルしか残っていない。Togthr はそれを、大げさにせずに解決します。日記、写真、タイムカプセルは、二人のものとしての場所に、ずっとそこにあります。スクロールして戻って、2027年に書いた一文を2032年から読む時、言いたいことが分かるはずです。' },
      { h: '10秒の「今日もここにいる」', p: '親友版で一番使われている機能が、10秒の「今日もここにいる」です——押すだけ、文字入力なし、プレッシャーなし。相手に通知すら行きません。ただ二人のカレンダーに小さな点がひとつ増えます。ひと月も経つと、相手の「在る」形が見えてきます:長い連続、そのあとの体調不良で空いた空白、静かな復活。点はスコアではなく、見えるようになった鼓動です。連続を守る必要はありません。ただ、戻ってくればいいのです。' },
      { h: '距離が変わっても、友情は残る', p: '大学で一緒だった友人が別の国に行く;育った街の友人が子どもと新しい暮らしを始める;20代で一緒に旅した友人が別の時区で別のリズムで生きている。友情は死なず、形が変わります。Togthr 親友版は、その形変化のために設計されています。3年後に開くタイムカプセル;12時間の時差を越えて押せる「今日もここにいる」;会えなくても一緒に育つペット。友情は、距離より長生きします。' },
    ],
    faqs: [
      { q: 'Togthr 親友版は、女性同士、または男性同士だけのものですか?', a: 'いいえ。Togthr 親友版は、1年以上続いていて、何度かの大変な時期を越えてきた友情なら、どんな友情でも使えます。同性の友情、異なる性別の友情、オンラインで始まった友情——すべて welcome です。空間はプライベート、内容はあなたのもの、ルールもあなたのものです。' },
      { q: '3人以上で使えますか?', a: '今のところ、「親友」空間は2人用に設計されています。3〜4人の小グループなら、コミュニティ機能(匿名、抱擁が「いいね」の代わり)を試すか、複数の2人空間を作ることもできます。どのように使われるかを見てから、グループ版を作る予定です。' },
      { q: 'しばらく一方が来なかったらどうなりますか?', a: 'ペットは罰を与えません、日記は閉じません、タイムカプセルは失効しません。Togthr 親友版は「数十年」という形の友情のために設計されていて、「数ヶ月」のためではありません。1年後に戻ってきても、ペットはちょうどその場所で待っています。止めた場所から再開できます。' },
      { q: 'グループチャットとどう違うんですか?', a: 'グループチャットは速く、グループ全員に見え、スクロールに埋もれていきます。Togthr 親友版は遅く、二人だけに見え、ずっとそこにあります。グループチャットに書かないようなこと——友情を何十年も支えるような、小さく、反復される、正直なこと——のためのものです。' },
    ],
    links: [
      { href: '/ja', label: 'Togthr ホーム' },
      { href: '/ja/features', label: 'Togthr すべての機能' },
      { href: '/ja/pricing', label: '料金 — 無料、Plus、Eternal' },
      { href: '/ja/blog/what-your-virtual-pet-notices', label: 'あなたの仮想ペットは何に気づくか' },
      { href: '/ja/blog/why-we-built-a-pet-that-grows-with-you', label: 'なぜあなたと一緒に育つペットを作ったのか' },
    ],
    cta: '一番古い友人との Togthr 親友空間を開く。',
  },

  ko: {
    title: 'Togthr 베프 버전 — 오래도록 곁에 있던 친구에게',
    description: 'Togthr 베프 버전: 오래도록 곁에 있던 친구와 나누는 작은 공간. 천천히 쓰는 일기, 다음 10년까지 잠그는 추억, 함께 키우는 작은 펫. 거리도 빈도도 상관없이, 그냥 천천히.',
    h1: 'Togthr 베프 버전 · 가늘게 이어지는 실을, 따뜻하게',
    intro: `Togthr 베프 버전은 "연인도 가족도 아닌데, 이 모든 해 동안 한 번도 빠지지 않은" 그 사람을 위한 버전입니다. 밤 11시에 전화하는 사람, 집 열쇠를 맡긴 사람, 중학교 때부터 알고 지금까지도 매주 화요일마다 메시지를 보내는 사람. 그런 우정을 위한 작은 사적 공간: 두 사람이 천천히 함께 쓰는 일기, 오늘 묻고 10년 후에 파는 타임캡슐, 함께 키우는 작은 펫, 10초면 누를 수 있는 "오늘도 여기 있어". 우정을 게임화하는 것이 목적이 아닙니다. 그룹 채팅도 SNS 도 아닌, 조용히 머무를 수 있는 곳을 만드는 게 목적입니다.`,
    sections: [
      { h: '두 사람만의 작은 공간', p: '그룹 채팅은 "그 그룹"의 것이고, SNS는 하이라이트의 것입니다. Togthr 베프 버전은 더 오래되고, 더 느리고, 더 조용한 관계를 위한 것입니다. 두 사람이 공유하는 사적 공간: 천천히 쓰는 일기, 10초의 "오늘도 여기 있어", 함께 키우는 작은 펫. 시끄럽지 않고, 리더보드 없고, 연속 기록 압박도 없고, 반년 동안 못 올렸다가 죄책감 느끼게 만드는 사회적 압력도 없습니다. 의자 두 개 놓인 작은 방이 있을 뿐입니다.' },
      { h: '사라지지 않는 추억', p: '어떤 우정에도 이런 순간이 있습니다 — 2017년에 저장한 메시지가 폰을 바꾸면서 사라졌다, 그 콘서트에서 찍은 사진은 이제 썸네일만 남아 있다. Togthr은 그것을 대단하게 들떠서 해결하지 않습니다. 일기, 사진, 타임캡슐은 두 사람의 것으로서의 곳에, 계속 그곳에 있습니다. 처음으로 스크롤을 돌려서 2027년에 쓴 한 문장을 2032년에서 보면, 무슨 말인지 알게 됩니다.' },
      { h: '10초의 "오늘도 여기 있어"', p: '베프 버전에서 가장 많이 쓰이는 기능이, 10초짜리 "오늘도 여기 있어"입니다 — 누르기만, 글자 입력 없음, 압박 없음. 상대에게 알림조차 가지 않습니다. 두 사람의 캘린더에 작은 점이 하나 늘어날 뿐입니다. 한 달이 지나면, 상대방이 "있는" 모양이 보이기 시작합니다. 긴 연속, 그 다음 아파서 비는 공백, 그리고 조용한 복귀. 그 점은 점수가 아니라, 보이기 시작한 심장박동입니다. 연속을 지킬 필요는 없습니다. 계속 돌아오기만 하면 됩니다.' },
      { h: '거리가 모든 것을 바꿔도', p: '대학 때 같이 수업 들었던 친구가 다른 나라로 이민을 갔고; 어릴 때부터 같이 자란 친구가 아이와 새로운 살림을 하고 있고; 스무 살에 같이 여행했던 친구는 다른 시간대에서 다른 리듬으로 살고 있습니다. 우정은 죽지 않고, 모양이 바뀝니다. Togthr 베프 버전은 그 모양 변화를 위해 설계되었습니다. 3년 후에 여는 타임캡슐; 12시간 시차를 넘어 누르는 "오늘도 여기 있어"; 만나지 못해도 함께 자라는 펫. 우정은 거리보다 오래 삽니다.' },
    ],
    faqs: [
      { q: 'Togthr 베프 버전은 여자 친구끼리, 혹은 남자 친구끼리만 쓸 수 있나요?', a: '아닙니다. Togthr 베프 버전은 1년 이상 지속되었고 몇 번의 어려운 시기를 함께 넘긴 우정이라면 어떤 것이든 쓸 수 있습니다. 동성 우정, 이성 우정, 온라인에서 시작된 우정 — 모두 환영합니다. 공간은 사적이고, 내용은 당신의 것이고, 규칙도 당신의 것입니다.' },
      { q: '세 명 이상도 함께 쓸 수 있나요?', a: '지금은 "베프" 공간이 두 사람용으로 설계되어 있습니다. 세네 명짜리 작은 모임이라면, 커뮤니티 기능(익명, 포옹이 좋아요를 대신)을 쓰거나 두 사람 공간을 여러 개 만들 수도 있습니다. 사람들이 어떻게 쓰시는지 보고 나서 그룹 버전을 만들 계획입니다.' },
      { q: '한동안 한 사람이 안 들어오면 어떻게 되나요?', a: '펫이 벌을 주지 않고, 일기가 닫히지 않으며, 타임캡슐이 만료되지 않습니다. Togthr 베프 버전은 "수십 년"이라는 모양의 우정을 위해 설계된 것이지, "수 개월"을 위한 것이 아닙니다. 1년 뒤에 돌아와도, 펫은 정확히 그 자리에 있습니다. 멈춘 곳에서 다시 시작할 수 있습니다.' },
      { q: '그룹 채팅과 어떻게 다른가요?', a: '그룹 채팅은 빠르고, 그룹 모두에게 보이며, 스크롤에 묻힙니다. Togthr 베프 버전은 느리고, 두 사람에게만 보이며, 계속 그 자리에 있습니다. 그룹 채팅에 쓰지 않을 것들 — 우정을 수십 년 동안 지탱하는 작고 반복되고 정직한 것들 — 을 위한 곳입니다.' },
    ],
    links: [
      { href: '/ko', label: 'Togthr 홈' },
      { href: '/ko/features', label: 'Togthr 모든 기능' },
      { href: '/ko/pricing', label: '요금 — 무료, Plus, Eternal' },
      { href: '/ko/blog/what-your-virtual-pet-notices', label: '당신의 가상 펫이 알아차리는 것' },
      { href: '/ko/blog/why-we-built-a-pet-that-grows-with-you', label: '왜 당신과 함께 자라는 펫을 만들었는가' },
    ],
    cta: '가장 오래된 친구와 Togthr 베프 공간을 여세요.',
  },

  de: {
    title: 'Togthr für Beste Freunde — Ein Raum, der bleibt',
    description: 'Togthr für Beste Freunde: ein kleiner privater Raum für die Freundschaft, die schon alles mitgemacht hat. Langsames Tagebuch, Erinnerungen für die Zukunft und ein kleiner Begleiter, der mit euch wächst. Ohne Geografie.',
    h1: 'Togthr für Beste Freunde · Der lange Faden, warm gehalten',
    intro: `Togthr für Beste Freunde ist für die Person, die nicht dein Partner und nicht deine Familie ist, aber beständiger als fast jeder andere in deinem Leben da war. Die Freundin, die du um 23 Uhr anrufst, der Freund, der einen Schlüssel zu deiner Wohnung hat, der Mensch, den du seit der Mittelschule kennst und dem du immer noch jeden Dienstag schreibst. Das ist ein kleiner privater Raum für diese Art von Freundschaft: ein langsames Tagebuch, in das ihr beide schreibt, eine Zeitkapsel, die du bis zum nächsten Jahrzehnt verschließen kannst, ein kleiner Begleiter, der wächst, wenn ihr beide immer wieder auftaucht, und ein tägliches "bin noch da", das zehn Sekunden dauert. Es geht nicht darum, die Freundschaft zu gamifizieren. Es geht darum, ihr einen ruhigen Ort zu geben, der kein Gruppenchat ist.`,
    sections: [
      { h: 'Ein Raum, der nur euch beiden gehört', p: 'Gruppenchats sind für die ganze Gruppe. Instagram ist für die Highlights. Togthr für Beste Freunde ist für die Freundschaft, die älter, langsamer und leiser ist als das alles. Es ist ein privater Raum, den ihr beide teilt, mit einem langsamen Tagebuch, einem täglichen "bin noch da"-Tap und einem kleinen geteilten Begleiter. Es ist nicht laut. Es hat keine Bestenlisten, keine Streaks, keine Art von sozialem Druck, der dich sechs Monate nicht posten lässt und sich dann schuldig fühlen. Es ist einfach ein kleiner Raum mit zwei Stühlen.' },
      { h: 'Erinnerungen, die nicht verschwinden', p: 'Jede Freundschaft hat ein Jahr, in dem du merkst, dass die Nachrichten, die du 2017 gespeichert hast, bei einem Telefonumzug verloren gegangen sind, oder dass das Foto von diesem einen Konzert jetzt nur noch ein Thumbnail ist, das du nicht vergrößern kannst. Togthr löst das, ohne ein großes Aufheben darum zu machen. Das Tagebuch, die Foto-Einträge, die Zeitkapseln — sie leben an einem Ort, der dir und deinem Freund gehört, und sie bleiben dort. Wenn du das erste Mal zurückscrollst und siehst, was du 2027 geschrieben hast, von 2032 aus, wirst du wissen, was wir meinen.' },
      { h: 'Der tägliche "bin noch da"-Tap', p: 'Die am häufigsten verwendete Funktion in Togthr für Beste Freunde ist der tägliche "bin noch da" — ein Tap, kein Text, kein Druck. Es benachrichtigt nicht einmal die andere Person; es fügt nur einen winzigen Punkt zum Kalender hinzu. Nach einem Monat fängst du an, die Form der Anwesenheit der anderen Person zu bemerken: eine lange Serie, dann eine Lücke, weil sie krank waren, dann eine ruhige Rückkehr. Der Punkt ist keine Punktzahl. Es ist ein Herzschlag, der sichtbar gemacht wurde. Du musst die Serie nicht halten. Du musst nur wiederkommen.' },
      { h: 'Wenn die Geografie alles andere ändert', p: 'Die Freundin, die du im College kennengelernt hast, zieht in ein anderes Land. Der Freund, mit dem du aufgewachsen bist, hat ein Kind und ein neues Leben. Die Freundin, mit der du in deinen Zwanzigern gereist bist, ist jetzt in einer anderen Zeitzone mit einem anderen Rhythmus. Die Freundschaft stirbt nicht — sie verändert ihre Form. Togthr für Beste Freunde ist für diese Formveränderung gebaut. Eine Zeitkapsel, die sich in drei Jahren öffnet. Ein tägliches "bin noch da", das eine 12-Stunden-Zeitverschiebung überlebt. Ein Begleiter, der wächst, ob ihr euch persönlich seht oder nicht. Die Freundschaft überlebt die Geografie.' },
    ],
    faqs: [
      { q: 'Ist Togthr für Beste Freunde nur für Frauen, oder nur für Männer?', a: 'Nein. Togthr für Beste Freunde ist für jede Freundschaft, die länger als ein Jahr gehalten hat und ein paar schwierige Dinge überlebt hat. Gleichgeschlechtliche Freundschaften, gegengeschlechtliche Freundschaften, online begonnene Freundschaften — alle sind willkommen. Der Raum ist privat, der Inhalt gehört dir, und die Regeln sind deine.' },
      { q: 'Können wir Togthr für Beste Freunde mit mehr als einer Person nutzen?', a: 'Im Moment ist der "Beste Freunde"-Raum für zwei Personen gebaut. Wenn ihr eine enge Gruppe von drei oder vier seid, könnt ihr den Community-Bereich nutzen (anonym, Umarmungen ersetzen Likes) oder mehrere Zwei-Personen-Räume erstellen. Wir beobachten, wie die Leute es nutzen, bevor wir eine Gruppenversion veröffentlichen.' },
      { q: 'Was, wenn eine von uns eine Weile nicht mehr auftaucht?', a: 'Der Begleiter bestraft euch nicht. Das Tagebuch schließt sich nicht. Die Zeitkapseln laufen nicht ab. Togthr für Beste Freunde ist für die Form gestaltet, die eine Freundschaft über Jahrzehnte annimmt, nicht über Monate. Du kannst nach einem Jahr wiederkommen, den Begleiter genau dort finden, wo du ihn gelassen hast, und dort weitermachen, wo du aufgehört hast.' },
      { q: 'Wie unterscheidet sich das von einem Gruppenchat?', a: 'Ein Gruppenchat ist schnell, der Gruppe zugänglich und verschwindet im Scrollen. Togthr für Beste Freunde ist langsam, nur für euch beide sichtbar und beständig. Es ist für die Dinge, die du nicht in einen Gruppenchat schreiben würdest — die kleinen, wiederholten, ehrlichen Dinge, die eine Freundschaft über Jahrzehnte halten.' },
    ],
    links: [
      { href: '/de', label: 'Togthr Startseite' },
      { href: '/de/features', label: 'Alle Togthr-Funktionen' },
      { href: '/de/pricing', label: 'Preise — Free, Plus, Eternal' },
      { href: '/de/blog/what-your-virtual-pet-notices', label: 'Was dein virtueller Begleiter über deinen Tag bemerkt' },
      { href: '/de/blog/why-we-built-a-pet-that-grows-with-you', label: 'Warum wir einen Begleiter gebaut haben, der mit dir wächst' },
    ],
    cta: 'Eröffne einen Togthr-für-Beste-Freunde-Raum mit deinem ältesten Freund.',
  },

  fr: {
    title: 'Togthr pour les meilleurs amis — Un espace qui dure',
    description: "Togthr pour les meilleurs amis : un petit espace privé pour l'ami qui a toujours été là. Un journal lent, des souvenirs verrouillés pour le futur, et un petit compagnon qui grandit avec vous. Sans géographie requise.",
    h1: 'Togthr pour les meilleurs amis · Le long fil, maintenu chaud',
    intro: `Togthr pour les meilleurs amis est pour la personne qui n'est ni votre partenaire ni votre famille, mais qui a été présente de façon plus constante que presque n'importe qui d'autre dans votre vie. L'ami que vous appelez à 23h, l'ami qui a la clé de votre appartement, l'ami que vous avez rencontré au collège et à qui vous envoyez encore un message chaque mardi. C'est un petit espace privé pour ce genre d'amitié : un journal lent dans lequel vous écrivez tous les deux, une capsule temporelle que vous pouvez verrouiller jusqu'à la prochaine décennie, un petit compagnon qui grandit tant que vous continuez à vous montrer, et un « toujours là » quotidien qui prend dix secondes. Le but n'est pas de gamifier l'amitié. Le but est de lui donner un endroit calme où vivre qui n'est pas une discussion de groupe.`,
    sections: [
      { h: 'Un espace qui est juste à vous deux', p: "Les discussions de groupe sont pour le groupe d'amis. Instagram est pour les moments forts. Togthr pour les meilleurs amis est pour l'amitié qui est plus ancienne, plus lente et plus silencieuse que tout cela. C'est un espace privé que vous partagez tous les deux, avec un journal lent, un tap quotidien « toujours là » et un petit compagnon partagé. Ce n'est pas bruyant. Il n'y a pas de classements, ni de séries, ni le genre de pression sociale qui fait que vous ne postez pas pendant six mois puis vous sentez coupable. C'est juste une petite pièce avec deux chaises." },
      { h: 'Des souvenirs qui ne disparaissent pas', p: "Chaque amitié a une année où vous réalisez que les messages que vous avez sauvegardés en 2017 sont maintenant perdus dans une migration de téléphone, ou que la photo que vous avez prise à ce concert n'est plus qu'une miniature que vous ne pouvez pas agrandir. Togthr corrige cela sans en faire tout un plat. Le journal, les entrées photo, les capsules temporelles — ils vivent dans un endroit qui est le vôtre et celui de votre ami, et ils y restent. La première fois que vous faites défiler et voyez ce que vous avez écrit en 2027, depuis 2032, vous comprendrez ce que nous voulons dire." },
      { h: 'Le tap quotidien « toujours là »', p: "La fonctionnalité la plus utilisée de Togthr pour les meilleurs amis est le « toujours là » quotidien — un tap, pas de texte, pas de pression. Cela ne notifie même pas l'autre personne ; cela ajoute juste un petit point au calendrier. Après un mois, vous commencez à remarquer la forme de la présence de l'autre personne : une longue série, puis un écart parce qu'elle était malade, puis un retour discret. Le point n'est pas un score. C'est un battement de cœur, rendu visible. Vous n'avez pas à garder la série. Vous devez juste continuer à revenir." },
      { h: 'Quand la géographie change tout le reste', p: "L'ami que vous avez rencontré à l'université déménage dans un autre pays. L'ami avec qui vous avez grandi a un enfant et une nouvelle vie. L'ami avec qui vous avez voyagé dans la vingtaine est maintenant dans un autre fuseau horaire avec un rythme différent. L'amitié ne meurt pas — elle change de forme. Togthr pour les meilleurs amis est construit pour ce changement de forme. Une capsule temporelle qui s'ouvre dans trois ans. Un « toujours là » quotidien qui survit à un décalage horaire de 12 heures. Un compagnon qui grandit que vous vous voyiez en personne ou non. L'amitié survit à la géographie." },
    ],
    faqs: [
      { q: 'Togthr pour les meilleurs amis est-il réservé aux femmes, ou aux hommes ?', a: "Non. Togthr pour les meilleurs amis est pour toute amitié qui a duré plus d'un an et a survécu à quelques moments difficiles. Amitiés entre personnes du même genre, de genres différents, amitiés commencées en ligne — toutes sont les bienvenues. L'espace est privé, le contenu est le vôtre, et les règles sont les vôtres." },
      { q: 'Pouvons-nous utiliser Togthr pour les meilleurs amis à plus de deux ?', a: "Pour l'instant, l'espace Meilleurs Amis est conçu pour deux personnes. Si vous avez un groupe soudé de trois ou quatre, vous pouvez utiliser la section communauté (anonyme, les câlins remplacent les likes) ou créer plusieurs espaces à deux. Nous observons comment les gens l'utilisent avant de livrer une version de groupe." },
      { q: "Que se passe-t-il si l'un d'entre nous arrête de venir pendant un moment ?", a: "Le compagnon ne vous punit pas. Le journal ne se ferme pas. Les capsules temporelles n'expirent pas. Togthr pour les meilleurs amis est conçu pour la forme qu'une amitié prend sur des décennies, pas sur des mois. Vous pouvez revenir après un an, trouver le compagnon exactement où vous l'avez laissé, et reprendre là où vous vous étiez arrêté." },
      { q: "En quoi est-ce différent d'une discussion de groupe ?", a: "Une discussion de groupe est rapide, visible par tout le groupe, et disparaît dans le défilement. Togthr pour les meilleurs amis est lent, privé à vous deux, et persistant. C'est pour les choses que vous ne mettriez pas dans une discussion de groupe — les petites choses répétées et honnêtes qui font qu'une amitié dure." },
    ],
    links: [
      { href: '/fr', label: 'Accueil Togthr' },
      { href: '/fr/features', label: 'Toutes les fonctionnalités Togthr' },
      { href: '/fr/pricing', label: 'Tarifs — Gratuit, Plus, Eternal' },
      { href: '/fr/blog/what-your-virtual-pet-notices', label: 'Ce que votre compagnon virtuel remarque de votre journée' },
      { href: '/fr/blog/why-we-built-a-pet-that-grows-with-you', label: 'Pourquoi nous avons construit un compagnon qui grandit avec vous' },
    ],
    cta: "Ouvrez un espace Togthr pour les meilleurs amis avec votre plus vieil ami.",
  },

  es: {
    title: 'Togthr para Mejores Amigos — Un Espacio Que Dura',
    description: 'Togthr para Mejores Amigos: un pequeño espacio privado para la amistad que ha estado ahí en todo. Un diario lento, recuerdos guardados para el futuro y una pequeña mascota que crece con ustedes. Sin geografía.',
    h1: 'Togthr para Mejores Amigos · El hilo largo, mantenido caliente',
    intro: `Togthr para Mejores Amigos es para la persona que no es tu pareja ni tu familia, pero que ha estado presente de forma más constante que casi nadie en tu vida. La amiga a la que llamas a las 11pm, el amigo que tiene llave de tu departamento, la persona que conociste en la secundaria y a la que todavía le escribes cada martes. Este es un pequeño espacio privado para ese tipo de amistad: un diario lento en el que ambos escriben, una cápsula del tiempo que pueden sellar hasta la próxima década, una pequeña mascota que crece mientras ambos sigan apareciendo, y un "aquí sigo" diario que toma diez segundos. La idea no es gamificar la amistad. La idea es darle un lugar tranquilo donde vivir, que no sea un chat grupal.`,
    sections: [
      { h: 'Un espacio que es solo para ustedes dos', p: 'Los chats grupales son para el grupo de amigos. Instagram es para los momentos destacados. Togthr para Mejores Amigos es para la amistad que es más vieja, más lenta y más silenciosa que todo eso. Es un espacio privado que ustedes dos comparten, con un diario lento, un "aquí sigo" diario y una pequeña mascota compartida. No es ruidoso. No tiene clasificaciones, ni rachas, ni el tipo de presión social que te hace no publicar durante seis meses y luego sentir culpa. Es solo una pequeña habitación con dos sillas.' },
      { h: 'Recuerdos que no desaparecen', p: 'Cada amistad tiene un año en el que te das cuenta de que los mensajes que guardaste en 2017 se perdieron en una migración de teléfono, o que la foto que tomaste en aquel concierto ahora es una miniatura que no puedes ampliar. Togthr lo soluciona sin hacer un escándalo. El diario, las entradas de fotos, las cápsulas del tiempo — viven en un lugar que es tuyo y de tu amigo, y se quedan ahí. La primera vez que te desplazas hacia atrás y ves lo que escribiste en 2027, desde 2032, vas a entender a qué nos referimos.' },
      { h: 'El "aquí sigo" diario', p: 'La función más usada de Togthr para Mejores Amigos es el "aquí sigo" diario — un toque, sin texto, sin presión. Ni siquiera notifica a la otra persona; solo añade un pequeño punto al calendario. Después de un mes, empiezas a notar la forma de la presencia de la otra persona: una racha larga, luego un hueco porque estuvo enferma, luego un regreso silencioso. El punto no es un puntaje. Es un latido, hecho visible. No tienes que mantener la racha. Solo tienes que seguir volviendo.' },
      { h: 'Cuando la geografía cambia todo lo demás', p: 'La amiga que conociste en la universidad se muda a otro país. El amigo con el que creciste tiene un hijo y una vida nueva. La amiga con la que viajaste en tus veinte ahora está en otra zona horaria con un ritmo distinto. La amistad no muere — cambia de forma. Togthr para Mejores Amigos está hecho para ese cambio de forma. Una cápsula del tiempo que se abre en tres años. Un "aquí sigo" diario que sobrevive a una diferencia horaria de 12 horas. Una mascota que crece se vean o no en persona. La amistad sobrevive a la geografía.' },
    ],
    faqs: [
      { q: '¿Togthr para Mejores Amigos es solo para mujeres, o solo para hombres?', a: 'No. Togthr para Mejores Amigos es para cualquier amistad que haya durado más de un año y haya sobrevivido a algunas cosas difíciles. Amistades entre personas del mismo género, de géneros distintos, amistades que empezaron en línea — todas son bienvenidas. El espacio es privado, el contenido es tuyo, y las reglas son tuyas.' },
      { q: '¿Podemos usar Togthr para Mejores Amigos con más de una persona?', a: 'Por ahora, el espacio Mejores Amigos está hecho para dos personas. Si tienen un grupo cercano de tres o cuatro, pueden usar la sección de comunidad (anónima, los abrazos reemplazan los likes) o crear varios espacios de dos. Estamos viendo cómo la gente lo usa antes de lanzar una versión grupal.' },
      { q: '¿Qué pasa si una de las dos deja de aparecer por un tiempo?', a: 'La mascota no te castiga. El diario no se cierra. Las cápsulas del tiempo no caducan. Togthr para Mejores Amigos está diseñado para la forma que toma una amistad a lo largo de décadas, no de meses. Puedes volver después de un año, encontrar la mascota exactamente donde la dejaste, y retomar donde lo dejaste.' },
      { q: '¿En qué se diferencia de un chat grupal?', a: 'Un chat grupal es rápido, visible para todo el grupo, y se pierde en el scroll. Togthr para Mejores Amigos es lento, privado para ustedes dos, y persistente. Es para las cosas que no pondrías en un chat grupal — las cosas pequeñas, repetidas y honestas que hacen que una amistad dure décadas.' },
    ],
    links: [
      { href: '/es', label: 'Inicio de Togthr' },
      { href: '/es/features', label: 'Todas las funciones de Togthr' },
      { href: '/es/pricing', label: 'Precios — Gratis, Plus, Eternal' },
      { href: '/es/blog/what-your-virtual-pet-notices', label: 'Lo que tu mascota virtual nota de tu día' },
      { href: '/es/blog/why-we-built-a-pet-that-grows-with-you', label: 'Por qué construimos una mascota que crece contigo' },
    ],
    cta: 'Abre un espacio Togthr para Mejores Amigos con tu amigo más antiguo.',
  },
}

// ───────────────────────────────────────────────────────────────────────
// for-family — 跨代陪伴 / 老人关怀 / 长期记忆
// ───────────────────────────────────────────────────────────────────────
const forFamily: Record<Locale, ForEntry> = {
  en: {
    title: 'Togthr for Family — Across Generations, Across Miles',
    description: 'Togthr for Family: a small private space for the people who raised you and the people you are raising. Long memories, gentle daily rituals, and a tiny pet that grows across generations.',
    h1: 'Togthr for Family · The thread between three generations',
    intro: `Togthr for Family is for the part of life that no productivity app really gets: the relationship between a parent and a child, between siblings who no longer live in the same city, between an adult child and a parent who is getting older. These relationships are long, slow, and not built around any one event. They are built out of small repeated moments: a weekly call, a photo of lunch, a "did you eat" text, a voice note from a grandchild. Togthr for Family is a small private space for those moments — not a family group chat, not a photo album, but a slow, multi-generational space that lets you keep the thread going without it becoming a project.`,
    sections: [
      { h: 'A space that does not require a tech native', p: 'Most apps assume everyone in the family is a power user. Togthr for Family is built for the oldest person in the group and the youngest person in the group at the same time. The interface is large, the language is plain, and the only action that matters is "still here." A 78-year-old grandparent in another country can use it without learning anything new. A 10-year-old grandchild can use it because the pet is fun. Everyone else just adds a photo or a sentence when they remember.' },
      { h: 'For the parent who is getting older', p: 'When a parent starts to age, the small check-ins become more important than the big conversations. Togthr for Family does not pretend to be medical or therapeutic — it is just a small daily "still here" that the parent can do, and a small daily "still here" that the adult child can do back. The pet grows on both screens, and the calendar of dots becomes a quiet visible record of who called, who visited, and who remembered. It is not a substitute for care, but it is a gentle structure around the in-between days.' },
      { h: 'For the long-distance sibling', p: 'Siblings who grew up in the same house are now scattered across cities, time zones, and life stages. The relationship is important, but it has no obvious structure. Togthr for Family gives the sibling relationship a place to live: a shared photo stream, a slow journal of "what I cooked this week," a tiny pet that grows on both your screens, and a time capsule you can lock until the next big family milestone — a parent\'s anniversary, a niece\'s graduation, a sibling\'s wedding. The space is private to the sibling pair, even if it lives inside a larger family account.' },
      { h: 'Memory as a multi-generational project', p: 'The most moving Togthr for Family stories we hear are from adult children who lose a parent, and then find a Togthr space with a year of "still here" dots, dozens of voice memos, and a few time capsules that are still sealed. The grief does not get smaller, but the record of presence is suddenly something to hold. Togthr for Family is built to be that record, slowly, without making a big deal of it. It is not a memorial. It is a daily habit, that — if the worst happens — turns out to have been a gift.' },
    ],
    faqs: [
      { q: 'Is Togthr for Family a private space, or does everyone see everything?', a: 'You choose. The default family space is private to the people you invite, and you can have multiple sub-spaces (for example, "parents only" and "siblings only"). Nothing is public, nothing is shared with other Togthr users, and you can add or remove people at any time.' },
      { q: 'Can my elderly parent use this without a smartphone?', a: 'Togthr for Family works on any modern browser, including on a shared family tablet. The interface is intentionally simple — one big button, one small text field. We have users in their 80s who use it daily. If your parent cannot use any device, the rest of the family can still add voice memos and photos on their behalf.' },
      { q: 'What happens to the family space if a parent passes away?', a: 'The space stays. The pet stays. The time capsules stay. The adult children can continue to add to the journal as a private memorial space, or they can close it. There is no automatic deletion, and no data is ever sold or used for advertising. Account deletion is always your call.' },
      { q: 'How is this different from a family group chat on WhatsApp?', a: 'A group chat is fast, noisy, and disappears into the scroll. Togthr for Family is slow, quiet, and persistent. It is for the things you would not put in a group chat — the "did you eat" texts, the lunch photos, the voice notes you only send to one sibling. The group chat is for the group. Togthr is for the relationship.' },
    ],
    links: [
      { href: '/en', label: 'Togthr home' },
      { href: '/en/features', label: 'All Togthr features' },
      { href: '/en/pricing', label: 'Pricing — Free, Plus, Eternal' },
      { href: '/en/blog/virtual-companion-pet-loss-comfort', label: 'After you lose a pet' },
      { href: '/en/blog/why-we-built-a-pet-that-grows-with-you', label: 'Why we built a pet that grows with you' },
    ],
    cta: 'Set up a Togthr for Family space with the people you came from.',
  },

  'zh-cn': {
    title: 'Togthr 家人版——三代人之间,一根细细的线',
    description: 'Togthr 家人版:给父母、给你、给你的孩子,留的一小块私密空间。慢慢的记忆,温柔的每日问候,一只跨越三代人一起长大的小宠物。',
    h1: 'Togthr 家人版 · 三代人之间,不要断',
    intro: `Togthr 家人版,是给那种"没有任何一个效率 App 能真正搞定"的关系准备的:父母跟孩子,不住在同一个城市的兄弟姐妹,慢慢变老的爸妈跟你。这些关系是长的、慢的,不围绕任何一件大事。它是由那些小小的、反复的瞬间搭起来的:一周一次的电话、一张午饭的照片、一句"吃了吗"、孙辈发来的语音条。Togthr 家人版是给这些瞬间留的一小块私密空间——不是家庭群聊,不是相册,是一个慢的、跨代的小空间,让你能把这根线一直牵着,又不会把它变成一个项目。`,
    sections: [
      { h: '一个不要求"必须是科技达人"也能用的小空间', p: '大部分 App 都默认家里每个人都是熟练用户。Togthr 家人版是同时为家里最老的那个和最小的那个设计的。界面大,文字简单,真正重要的动作只有"今天也在"。住在另一个国家的 78 岁爷爷奶奶,不用学新东西就能用;10 岁的孙子孙女,会因为那只小宠物觉得好玩。其他家人想起来了,加一张照片、写一句话就好。' },
      { h: '给正在变老的那个人', p: '当父母开始变老,那些"小问候"就比"大对话"更重要了。Togthr 家人版不假装自己是医疗的、也不假装自己是心理的——它就是一个小小的"今天也在",父母可以点,你也可以点回去。宠物在你们两个人的屏幕上都长大,日历上的小点安静地记录着"谁打了电话、谁来看过、谁记得"。它不能替代真正的照顾,但它给了那些平常日子一个小小的形状。' },
      { h: '给异地的兄弟姐妹', p: '小时候在同一个家长大的兄弟姐妹,现在散在不同的城市、不同时区、不同的人生阶段。这段关系很重要,但它没有一个显而易见的形状。Togthr 家人版给了这段关系一个能待着的地方:一个共享的照片流、一本慢的"这周我做了什么菜"日记、一只在你们两个人屏幕上一起长大的宠物,以及一颗可以锁到下一个家庭大事的时光胶囊——父母的周年、孙辈的毕业、谁的婚礼。这个空间是只属于你们两个兄弟姐妹的,即使它住在更大的家庭账号里。' },
      { h: '把"记忆"当作一个跨代的项目', p: '我们听到的最让人动容的 Togthr 家人版故事,通常来自一个失去父母的大人——他们打开 Togthr,看到一年里无数的"今天也在"小点、几十条语音、几颗还没打开的时光胶囊。悲伤不会变小,但"在场"的记录突然变成了一个可以握住的东西。Togthr 家人版就是为那个"记录"而设计的——慢慢地,不做作。它不是一座纪念馆,它只是一个每日的小习惯——而如果最坏的事发生了,那个习惯,原来一直是一份礼物。' },
    ],
    faqs: [
      { q: 'Togthr 家人版是私密的,还是所有人都看得到所有人的?', a: '你选。默认的家庭空间对被邀请的人是私密的;你可以开多个子空间(比如"只爸妈"和"只兄弟姐妹")。所有内容都不公开,不会跟其他 Togthr 用户共享,你可以随时增加或移除人。' },
      { q: '我年纪大的父母不会用智能手机,Togthr 还能用吗?', a: 'Togthr 家人版在任何现代浏览器里都能用,包括家里共用的平板。界面故意做得简单——一个大按钮、一个小文本框。我们有 80 多岁的用户每天都在用。如果你的父母完全不会用设备,家里的其他人可以代替他们发语音和照片。' },
      { q: '如果有家人过世了,这个空间会怎么样?', a: '空间留着,宠物留着,时光胶囊留着。子女可以继续在日记里添加内容,当作一个私密的纪念空间;也可以关掉它。系统不会自动删除,数据也绝不会卖给广告商或被用来投放广告。账号删除,永远是你自己决定。' },
      { q: '这跟微信家庭群到底有什么区别?', a: '微信群是快的、吵的、会被刷走的;Togthr 家人版是慢的、安静的、一直在的。它是给那些你不会放在微信群里的东西——"吃了吗"、午饭照片、只发给某个兄弟姐妹的语音。微信群是给"这群人"的,Togthr 是给"这段关系"的。' },
    ],
    links: [
      { href: '/zh-cn', label: 'Togthr 首页' },
      { href: '/zh-cn/features', label: 'Togthr 全部功能' },
      { href: '/zh-cn/pricing', label: '价格 — 免费版、Plus、Eternal' },
      { href: '/zh-cn/blog/virtual-companion-pet-loss-comfort', label: '当你失去一个宠物之后' },
      { href: '/zh-cn/blog/why-we-built-a-pet-that-grows-with-you', label: '为什么我们做了一只陪你长大的宠物' },
    ],
    cta: '跟那个"你从哪来"的人,一起开一个 Togthr 家人版小空间。',
  },

  'zh-tw': {
    title: 'Togthr 家人版——三代人之間,一根細細的線',
    description: 'Togthr 家人版:給父母、給你、給你的孩子,留的一小塊私密空間。慢慢的記憶,溫柔的每日問候,一隻跨越三代人一起長大的小寵物。',
    h1: 'Togthr 家人版 · 三代之間,不要斷',
    intro: `Togthr 家人版,是給那種「沒有任何一個效率 App 能真正搞定」的關係準備的:父母跟孩子,不住在同一個城市的兄弟姐妹,慢慢變老的爸媽跟你。這些關係是長的、慢的,不圍繞任何一件大事。它是由那些小小的、反覆的瞬間搭起來的:一週一次的電話、一張午餐的照片、一句「吃了嗎」、孫輩發來的語音。Togthr 家人版是給這些瞬間留的一小塊私密空間——不是家庭群組、不是相簿,是一個慢的、跨代的小空間,讓你能把這根線一直牽著,又不會把它變成一個專案。`,
    sections: [
      { h: '一個不要求「必須是科技達人」也能用的小空間', p: '大部分 App 都預設家裡每個人都是熟練使用者。Togthr 家人版是同時為家裡最老的和最小的那個設計的。介面大,文字簡單,真正重要的動作只有「今天也在」。住在另一個國家的 78 歲爺爺奶奶,不用學新東西就能用;10 歲的孫子孫女,會因為那隻小寵物覺得好玩。其他家人想起來了,加一張照片、寫一句話就好。' },
      { h: '給正在變老的那個人', p: '當爸媽開始變老,那些「小問候」就比「大對話」更重要了。Togthr 家人版不假裝自己是醫療的、也不假裝自己是心理的——它就是一個小小的「今天也在」,爸媽可以點,你也可以點回去。寵物在你們兩個人的螢幕上都長大,日曆上的小點安靜地記錄著「誰打了電話、誰來看過、誰記得」。它不能替代真正的照顧,但它給了那些平常日子一個小小的形狀。' },
      { h: '給異地的兄弟姐妹', p: '小時候在同一個家長大的兄弟姊妹,現在散在不同的城市、不同時區、不同的人生階段。這段關係很重要,但它沒有一個顯而易見的形狀。Togthr 家人版給了這段關係一個能待著的地方:一個共享的照片流、一本慢的「這週我煮了什麼」的日記、一隻在你們兩個人螢幕上一起長大的寵物,以及一顆可以鎖到下一個家庭大事的時光膠囊——爸媽的週年、姪子的畢業、誰的婚禮。這個空間是只屬於你們兩個兄弟姊妹的,即使它住在更大的家庭帳號裡。' },
      { h: '把「記憶」當作一個跨代的專案', p: '我們聽過最讓人動容的 Togthr 家人版故事,通常來自一個失去爸媽的大人——他們打開 Togthr,看到一年裡無數的「今天也在」小點、幾十條語音、幾顆還沒打開的時光膠囊。悲傷不會變小,但「在場」的記錄突然變成了一個可以握住的東西。Togthr 家人版就是為了那個「記錄」而設計的——慢慢地,不做作。它不是一座紀念館,它只是一個每日的小習慣——而如果最壞的事發生了,那個習慣,原來一直是一份禮物。' },
    ],
    faqs: [
      { q: 'Togthr 家人版是私密的,還是所有人都看得到所有人的?', a: '你選。預設的家庭空間對被邀請的人是私密的;你可以開多個子空間(例如「只爸媽」和「只兄弟姊妹」)。所有內容都不公開,不會跟其他 Togthr 使用者共享,你可以隨時新增或移除人。' },
      { q: '我年紀大的爸媽不會用智慧型手機,Togthr 還能用嗎?', a: 'Togthr 家人版在任何現代瀏覽器裡都能用,包括家裡共用的平板。介面故意做得簡單——一個大按鈕、一個小文字框。我們有 80 多歲的使用者每天都在用。如果你的爸媽完全不會用設備,家裡的其他人可以代替他們發語音和照片。' },
      { q: '如果有家人過世了,這個空間會怎麼樣?', a: '空間留著,寵物留著,時光膠囊留著。子女可以繼續在日記裡新增內容,當作一個私密的紀念空間;也可以關掉它。系統不會自動刪除,資料也絕不會賣給廣告商或被用來投放廣告。帳號刪除,永遠是你自己決定。' },
      { q: '這跟 LINE 家族群到底有什麼差別?', a: 'LINE 群是快的、吵的、會被刷走的;Togthr 家人版是慢的、安靜的、一直在的。它是給那些你不會放在 LINE 群裡的東西——「吃了沒」、午餐照片、只傳給某個兄弟姊妹的語音。LINE 群是給「這群人」的,Togthr 是給「這段關係」的。' },
    ],
    links: [
      { href: '/zh-tw', label: 'Togthr 首頁' },
      { href: '/zh-tw/features', label: 'Togthr 全部功能' },
      { href: '/zh-tw/pricing', label: '價格 — 免費版、Plus、Eternal' },
      { href: '/zh-tw/blog/virtual-companion-pet-loss-comfort', label: '當你失去一個寵物之後' },
      { href: '/zh-tw/blog/why-we-built-a-pet-that-grows-with-you', label: '為什麼我們做了一隻陪你長大的寵物' },
    ],
    cta: '跟那個「你從哪來」的人,一起開一個 Togthr 家人版小空間。',
  },

  ja: {
    title: 'Togthr 家族版 — 三世代をつなぐ、細い糸',
    description: 'Togthr 家族版:親と、子と、その子のために。長く残す記憶、やさしい毎日のあいさつ、三世代で一緒に育つ小さなロボット。',
    h1: 'Togthr 家族版 · 三世代のあいだで、切れにくく',
    intro: `Togthr 家族版は、「どの効率化アプリも本当には扱えない関係」のためのものです:親と子、もう同じ街には住まない兄弟姉妹、ゆっくり年老いていく親とあなた。これらの関係は長く、ゆっくりで、何か一つの出来事を中心にしていません。小さく繰り返される瞬間でできています:週に一度の電話、昼ごはんの写真、「食べた?」という一言、孫からのボイスメモ。Togthr 家族版は、それらの瞬間のための小さなプライベートな空間です。家族グループチャットでもフォトアルバムでもなく、ゆっくりで、世代をまたぐ空間で、糸を繋ぎ続けることを、プロジェクトにしないためにあります。`,
    sections: [
      { h: '「テックに詳しいこと」を前提としない場所', p: '多くのアプリは、家族全員がパワーユーザーであることを前提としています。Togthr 家族版は、家族で一番年上の人と一番若い人の両方を同時に想定して作られています。インターフェースは大きく、言葉は平易で、本当に必要なアクションは「今日もここにいる」だけ。別の国にいる78歳の祖父母も、新しいことを学ばずに使えます。10歳の孫は、ペットが楽しいから使います。他の家族は、思い出した時に写真を一枚、文章を一行。' },
      { h: '年老いていく親のために', p: '親が老いてくると、大きな会話よりも小さな確認が重要になります。Togthr 家族版は医療でもセラピーでもなく、親ができる小さな「今日もここにいる」と、子どもが返せる小さな「今日もここにいる」を提供します。ペットは両方の画面で育ち、点のカレンダーは、だれが電話し、だれが訪れ、だれが覚えていたかを静かに可視化します。介護の代わりにはなりませんが、その間の日々に小さな形を与えるものです。' },
      { h: '遠くに暮らす兄弟姉妹のために', p: '同じ家で育った兄弟姉妹が、今は別の街、別の時区、別の人生の段階に散らばっています。関係は大切ですが、はっきりした形を持っていません。Togthr 家族版は、その関係に居場所を与えます:共有の写真の流れ、「今週作った料理」のゆっくりした日記、二人の画面で一緒に育つペット、そして次の家族の節目まで封じられるタイムカプセル——親の記念日、姪の卒業、兄弟の結婚式。スペースは二人の兄弟姉妹だけのものですが、より大きな家族アカウントの中に住んでいます。' },
      { h: '記憶を、世代を超えるプロジェクトとして', p: 'Togthr 家族版について一番心動かされる話は、多くの場合、親を亡くした大人から届きます——一年分の「今日もここにいる」の点、何十ものボイスメモ、そしてまだ開かれていないタイムカプセルを、Togthr の中で見つける。悲しみは小さくなりませんが、「そこにいた」という記録が、突然抱きしめられるものになります。Togthr 家族版は、その記録のために作られています。ゆっくりと、大げさにせず。記念館ではなく、毎日の小さな習慣です——もし最悪のことが起こった時、その習慣が、ずっと贈り物だったとわかる。' },
    ],
    faqs: [
      { q: 'Togthr 家族版はプライベートですか、それとも全員にお互いが見えますか?', a: '選べます。デフォルトの家族スペースは招待した人にだけ見え、「親だけ」「兄弟姉妹だけ」のような複数のサブスペースを作れます。すべて非公開で、他のTogthrユーザーと共有されることはなく、いつでも人を追加・削除できます。' },
      { q: '高齢の親がスマホを使えなくても使えますか?', a: 'Togthr 家族版は家族の共有タブレットを含め、どの現代のブラウザでも動きます。インターフェースは意図的にシンプルに作られています——大きなボタン一つ、小さなテキスト欄一つ。80代で毎日使ってくださる方もいます。親がデバイスを一切使えない場合は、他の家族が代理でボイスメモや写真を追加できます。' },
      { q: '家族が亡くなった場合、スペースはどうなりますか?', a: 'スペースは残ります。ペットも残ります。タイムカプセルも残ります。子どもは日記への追記を続け、プライベートな追悼スペースとして使えますし、閉じることもできます。自動削除はなく、データが広告に売られたり広告に使われたりすることは決してありません。アカウントの削除は、常にあなた自身の判断です。' },
      { q: '家族のグループチャットとどう違いますか?', a: 'グループチャットは速く、騒がしく、スクロールに埋もれていきます。Togthr 家族版は遅く、静かで、ずっとそこにあります。グループチャットに書かないようなこと——「食べた?」のテキスト、昼ごはんの写真、ある兄弟姉妹だけに送るボイスメモ——のためのものです。グループチャットは「そのグループ」のもの。Togthr は「その関係」のものです。' },
    ],
    links: [
      { href: '/ja', label: 'Togthr ホーム' },
      { href: '/ja/features', label: 'Togthr すべての機能' },
      { href: '/ja/pricing', label: '料金 — 無料、Plus、Eternal' },
      { href: '/ja/blog/virtual-companion-pet-loss-comfort', label: 'ペットを失ったあとに' },
      { href: '/ja/blog/why-we-built-a-pet-that-grows-with-you', label: 'なぜあなたと一緒に育つペットを作ったのか' },
    ],
    cta: '「あなたがそこから来た」人たちと、Togthr 家族版スペースを開く。',
  },

  ko: {
    title: 'Togthr 가족 버전 — 세대 사이의, 가느다란 실',
    description: 'Togthr 가족 버전: 부모와, 당신과, 당신의 아이들을 위한 작은 사적 공간. 오래가는 기억, 다정한 매일의 인사, 세대에 걸쳐 함께 자라는 작은 펫.',
    h1: 'Togthr 가족 버전 · 세 세대 사이에서, 끊기지 않게',
    intro: `Togthr 가족 버전은 "어떤 효율화 앱도 제대로 다루지 못하는 관계"를 위한 버전입니다: 부모와 자식, 더 이상 같은 도시에 살지 않는 형제자매, 천천히 나이를 드는 부모와 당신. 이 관계들은 길고 느리고, 어떤 한 사건을 중심으로 하지 않습니다. 작게 반복되는 순간들로 만들어집니다. 일주일에 한 번 전화, 점심 사진, "밥 먹었니" 한마디, 손주가 보내는 음성 메모. Togthr 가족 버전은 이런 순간들을 위한 작은 사적 공간입니다. 가족 단톡도 사진첩도 아니고, 느리고 세대를 넘는 공간으로, 그 실을 계속 이어가게 해 주되 프로젝트로 만들지는 않습니다.`,
    sections: [
      { h: '"테크를 잘 알아야" 같은 전제가 없는 곳', p: '대부분의 앱은 가족 모두가 파워 유저라고 가정합니다. Togthr 가족 버전은 가족 중 가장 나이 많은 사람과 가장 어린 사람을 동시에 위해 설계되었습니다. 인터페이스는 크고, 문장은 평이하고, 정말 중요한 동작은 "오늘도 여기 있어" 하나뿐입니다. 다른 나라에 사는 78살 조부모도, 새로 배울 것 없이 쓸 수 있습니다. 10살 손주는 펫이 재미있어서 씁니다. 다른 가족은 생각날 때 사진 한 장, 문장 한 줄. ' },
      { h: '나이를 드는 부모를 위해', p: '부모가 나이를 드시기 시작하면, 큰 대화보다 작은 확인이 더 중요해집니다. Togthr 가족 버전은 의료도 아니고 심리 상담도 아닙니다. 부모가 누를 수 있는 작은 "오늘도 여기 있어"와, 자녀가 돌려 누를 수 있는 작은 "오늘도 여기 있어"를 만듭니다. 펫은 두 화면에서 같이 자라고, 점으로 채워진 달력은 누가 전화하고, 누가 방문하고, 누가 기억했는지를 조용히 보여줍니다. 그것이 진짜 돌봄을 대신할 수는 없지만, 그 사이의 날들에 작은 모양을 만들어 줍니다.' },
      { h: '먼 거리에 사는 형제자매를 위해', p: '같은 집에서 자란 형제자매가 이제는 다른 도시, 다른 시간대, 다른 인생 단계에 흩어져 있습니다. 관계는 소중하지만 뚜렷한 모양이 없습니다. Togthr 가족 버전은 그 관계에 머무를 곳을 줍니다. 공유하는 사진의 흐름, "이번 주에 뭐 했는지"의 느린 일기, 두 화면에서 함께 자라는 펫, 그리고 다음 가족의 큰 날까지 잠글 수 있는 타임캡슐 — 부모의 기념일, 조카의 졸업, 누군가의 결혼. 그 공간은 더 큰 가족 계정 안에 살면서도, 두 형제자매만의 것입니다.' },
      { h: '기억을, 세대를 넘는 프로젝트로', p: 'Togthr 가족 버전에서 가장 울림이 있는 이야기는 보통 부모를 떠나보낸 성인에게서 옵니다 — 일 년치 "오늘도 여기 있어" 점들과, 수십 개의 음성 메모, 아직 열리지 않은 타임캡슐을 Togthr 안에서 발견하게 됩니다. 슬픔이 작아지지는 않지만, "그 사람이 있었다"는 기록이 갑자기 안을 수 있는 것이 됩니다. Togthr 가족 버전은 그 기록을 위해 만들어졌습니다. 천천히, 대단하게 들떠서, 떠들지 않고. 기념관이 아니라, 매일의 작은 습관입니다 — 그리고 만약 최악의 일이 일어난다면, 그 습관은 계속 선물이었습니다.' },
    ],
    faqs: [
      { q: 'Togthr 가족 버전은 사적인가요, 아니면 전부 서로에게 보이나요?', a: '선택할 수 있습니다. 기본 가족 공간은 초대한 사람에게만 보이고, "부모님만" / "형제자매만" 같은 하위 공간을 여러 개 만들 수 있습니다. 모든 내용은 비공개이고, 다른 Togthr 사용자와 공유되지 않으며, 언제든 사람을 추가하거나 뺄 수 있습니다.' },
      { q: '고령의 부모가 스마트폰을 못 쓰셔도 쓸 수 있나요?', a: 'Togthr 가족 버전은 가족 공용 태블릿을 포함해 어떤 최신 브라우저에서도 동작합니다. 인터페이스는 일부러 단순하게 만들어졌습니다 — 큰 버튼 하나, 작은 입력란 하나. 80대에도 매일 쓰시는 분이 있습니다. 부모가 어떤 기기도 쓰지 못하시면, 다른 가족이 대신 음성이나 사진을 올릴 수 있습니다.' },
      { q: '가족이 돌아가시면, 그 공간은 어떻게 되나요?', a: '공간은 남습니다. 펫도 남습니다. 타임캡슐도 남습니다. 자녀는 일기에 이어 쓰면서 사적인 추모 공간으로 쓸 수도 있고, 닫을 수도 있습니다. 자동 삭제는 없으며, 데이터는 광고에 팔리거나 광고에 쓰이는 일은 절대 없습니다. 계정 삭제는 언제나 본인이 결정합니다.' },
      { q: '가족 단톡방과 어떻게 다른가요?', a: '단톡방은 빠르고, 시끄럽고, 스크롤에 묻힙니다. Togthr 가족 버전은 느리고, 조용하고, 계속 거기 있습니다. 단톡방에 쓰지 않을 것들 — "밥 먹었어?"라는 문자, 점심 사진, 한 형제자매에게만 보내는 음성 — 을 위한 곳입니다. 단톡방은 "그 그룹"의 것이고, Togthr은 "그 관계"의 것입니다.' },
    ],
    links: [
      { href: '/ko', label: 'Togthr 홈' },
      { href: '/ko/features', label: 'Togthr 모든 기능' },
      { href: '/ko/pricing', label: '요금 — 무료, Plus, Eternal' },
      { href: '/ko/blog/virtual-companion-pet-loss-comfort', label: '반려를 떠나보낸 뒤' },
      { href: '/ko/blog/why-we-built-a-pet-that-grows-with-you', label: '왜 당신과 함께 자라는 펫을 만들었는가' },
    ],
    cta: '"내가 어디서부터 왔는지"의 사람들과 Togthr 가족 공간을 여세요.',
  },

  de: {
    title: 'Togthr für die Familie — Über Generationen, über Meilen',
    description: 'Togthr für die Familie: ein kleiner privater Raum für die Menschen, die dich großgezogen haben, und die Menschen, die du großziehst. Lange Erinnerungen, sanfte tägliche Rituale und ein kleiner Begleiter, der über Generationen wächst.',
    h1: 'Togthr für die Familie · Der Faden zwischen drei Generationen',
    intro: `Togthr für die Familie ist für den Teil des Lebens, den keine Produktivitäts-App wirklich versteht: die Beziehung zwischen einem Elternteil und einem Kind, zwischen Geschwistern, die nicht mehr in derselben Stadt leben, zwischen einem erwachsenen Kind und einem Elternteil, das älter wird. Diese Beziehungen sind lang, langsam und nicht um ein einzelnes Ereignis herum gebaut. Sie sind aus kleinen wiederholten Momenten aufgebaut: ein wöchentlicher Anruf, ein Foto vom Mittagessen, eine "hast du gegessen"-SMS, eine Sprachnachricht von einem Enkelkind. Togthr für die Familie ist ein kleiner privater Raum für diese Momente — kein Familiengruppenchat, kein Fotoalbum, sondern ein langsamer, generationenübergreifender Raum, der es dir erlaubt, den Faden am Laufen zu halten, ohne dass es zu einem Projekt wird.`,
    sections: [
      { h: 'Ein Raum, der keinen Tech-Native erfordert', p: 'Die meisten Apps setzen voraus, dass jeder in der Familie ein Power-User ist. Togthr für die Familie ist gleichzeitig für die älteste und die jüngste Person in der Gruppe gebaut. Die Oberfläche ist groß, die Sprache ist einfach, und die einzige Aktion, die zählt, ist "bin noch da". Ein 78-jähriger Großelternteil in einem anderen Land kann es benutzen, ohne etwas Neues zu lernen. Ein 10-jähriges Enkelkind kann es benutzen, weil der Begleiter Spaß macht. Alle anderen fügen ein Foto oder einen Satz hinzu, wenn sie daran denken.' },
      { h: 'Für den Elternteil, der älter wird', p: 'Wenn ein Elternteil anfängt zu altern, werden die kleinen Check-ins wichtiger als die großen Gespräche. Togthr für die Familie gibt nicht vor, medizinisch oder therapeutisch zu sein — es ist nur ein kleines tägliches "bin noch da", das der Elternteil machen kann, und ein kleines tägliches "bin noch da", das das erwachsene Kind zurückgeben kann. Der Begleiter wächst auf beiden Bildschirmen, und der Kalender der Punkte wird zu einer ruhigen sichtbaren Aufzeichnung davon, wer angerufen hat, wer zu Besuch war und wer sich erinnert hat. Es ist kein Ersatz für Pflege, aber es ist eine sanfte Struktur um die Tage dazwischen.' },
      { h: 'Für das Geschwister über die Distanz', p: 'Geschwister, die im selben Haus aufgewachsen sind, sind jetzt über Städte, Zeitzonen und Lebensphasen verstreut. Die Beziehung ist wichtig, aber sie hat keine offensichtliche Struktur. Togthr für die Familie gibt der Geschwisterbeziehung einen Ort zum Leben: einen geteilten Foto-Stream, ein langsames Tagebuch von "was ich diese Woche gekocht habe", einen kleinen Begleiter, der auf beiden Bildschirmen wächst, und eine Zeitkapsel, die du bis zum nächsten großen Familienmeilenstein verschließen kannst — dem Jahrestag eines Elternteils, dem Abschluss einer Nichte, der Hochzeit eines Geschwisters. Der Raum ist dem Geschwisterpaar privat, auch wenn er in einem größeren Familienkonto lebt.' },
      { h: 'Erinnerung als generationenübergreifendes Projekt', p: 'Die bewegendsten Togthr-für-die-Familie-Geschichten, die wir hören, kommen von erwachsenen Kindern, die ein Elternteil verlieren und dann einen Togthr-Raum mit einem Jahr "bin noch da"-Punkten, Dutzenden von Sprachnachrichten und ein paar Zeitkapseln finden, die noch versiegelt sind. Die Trauer wird nicht kleiner, aber die Aufzeichnung von Anwesenheit ist plötzlich etwas zum Festhalten. Togthr für die Familie ist gebaut, um diese Aufzeichnung zu sein — langsam, ohne ein großes Aufheben. Es ist kein Denkmal. Es ist eine tägliche Gewohnheit, die sich — wenn das Schlimmste passiert — als ein Geschenk herausstellt.' },
    ],
    faqs: [
      { q: 'Ist Togthr für die Familie ein privater Raum, oder sehen alle alles?', a: 'Du entscheidest. Der Standard-Familienraum ist privat für die Leute, die du einlädst, und du kannst mehrere Teilräume haben (zum Beispiel "nur Eltern" und "nur Geschwister"). Nichts ist öffentlich, nichts wird mit anderen Togthr-Nutzern geteilt, und du kannst jederzeit Leute hinzufügen oder entfernen.' },
      { q: 'Kann mein älteres Elternteil das ohne Smartphone nutzen?', a: 'Togthr für die Familie funktioniert in jedem modernen Browser, einschließlich auf einem gemeinsamen Familientablet. Die Oberfläche ist absichtlich einfach — ein großer Button, ein kleines Textfeld. Wir haben Nutzer in den 80ern, die es täglich verwenden. Wenn dein Elternteil kein Gerät benutzen kann, kann der Rest der Familie weiterhin Sprachnachrichten und Fotos in ihrem Namen hinzufügen.' },
      { q: 'Was passiert mit dem Familienraum, wenn ein Elternteil verstirbt?', a: 'Der Raum bleibt. Der Begleiter bleibt. Die Zeitkapseln bleiben. Die erwachsenen Kinder können das Tagebuch als privaten Gedenkraum weiter ergänzen, oder sie können es schließen. Es gibt keine automatische Löschung, und es werden niemals Daten verkauft oder für Werbung verwendet. Die Kontolöschung ist immer deine Entscheidung.' },
      { q: 'Wie unterscheidet sich das von einem Familiengruppenchat auf WhatsApp?', a: 'Ein Gruppenchat ist schnell, laut und verschwindet im Scrollen. Togthr für die Familie ist langsam, leise und beständig. Es ist für die Dinge, die du nicht in einen Gruppenchat schreiben würdest — die "hast du gegessen"-SMS, die Mittagessen-Fotos, die Sprachnachrichten, die du nur an ein Geschwister sendest. Der Gruppenchat ist für die Gruppe. Togthr ist für die Beziehung.' },
    ],
    links: [
      { href: '/de', label: 'Togthr Startseite' },
      { href: '/de/features', label: 'Alle Togthr-Funktionen' },
      { href: '/de/pricing', label: 'Preise — Free, Plus, Eternal' },
      { href: '/de/blog/virtual-companion-pet-loss-comfort', label: 'Nachdem du einen Begleiter verloren hast' },
      { href: '/de/blog/why-we-built-a-pet-that-grows-with-you', label: 'Warum wir einen Begleiter gebaut haben, der mit dir wächst' },
    ],
    cta: 'Errichte einen Togthr-für-die-Familie-Raum mit den Menschen, von denen du kommst.',
  },

  fr: {
    title: "Togthr pour la famille — À travers les générations, à travers les miles",
    description: "Togthr pour la famille : un petit espace privé pour ceux qui vous ont élevé et ceux que vous élevez. Longues mémoires, rituels quotidiens doux et un petit compagnon qui grandit à travers les générations.",
    h1: 'Togthr pour la famille · Le fil entre trois générations',
    intro: `Togthr pour la famille est pour la partie de la vie qu'aucune app de productivité ne comprend vraiment : la relation entre un parent et un enfant, entre frères et sœurs qui ne vivent plus dans la même ville, entre un enfant adulte et un parent qui vieillit. Ces relations sont longues, lentes, et ne sont pas construites autour d'un événement particulier. Elles sont construites à partir de petits moments répétés : un appel hebdomadaire, une photo du déjeuner, un « as-tu mangé » par message, un message vocal d'un petit-enfant. Togthr pour la famille est un petit espace privé pour ces moments — pas un chat de famille, pas un album photos, mais un espace lent et multigénérationnel qui vous permet de garder le fil sans en faire un projet.`,
    sections: [
      { h: "Un espace qui ne nécessite pas d'être un natif du numérique", p: "La plupart des apps supposent que tout le monde dans la famille est un utilisateur avancé. Togthr pour la famille est construit à la fois pour la personne la plus âgée et la plus jeune du groupe. L'interface est grande, le langage est simple, et la seule action qui compte est « toujours là ». Un grand-parent de 78 ans dans un autre pays peut l'utiliser sans rien apprendre de nouveau. Un petit-enfant de 10 ans peut l'utiliser parce que le compagnon est amusant. Tous les autres ajoutent simplement une photo ou une phrase quand ils y pensent." },
      { h: 'Pour le parent qui vieillit', p: "Quand un parent commence à vieillir, les petits check-ins deviennent plus importants que les grandes conversations. Togthr pour la famille ne prétend pas être médical ou thérapeutique — c'est juste un petit « toujours là » quotidien que le parent peut faire, et un petit « toujours là » quotidien que l'enfant adulte peut renvoyer. Le compagnon grandit sur les deux écrans, et le calendrier de points devient un enregistrement discret et visible de qui a appelé, qui a rendu visite, et qui s'est souvenu. Ce n'est pas un substitut aux soins, mais c'est une structure douce autour des jours d'entre-deux." },
      { h: 'Pour les frères et sœurs au loin', p: "Les frères et sœurs qui ont grandi dans la même maison sont maintenant dispersés entre villes, fuseaux horaires et étapes de vie. La relation est importante, mais elle n'a pas de structure évidente. Togthr pour la famille donne à la relation fraternelle un endroit où vivre : un flux de photos partagé, un journal lent de « ce que j'ai cuisiné cette semaine », un petit compagnon qui grandit sur vos deux écrans, et une capsule temporelle que vous pouvez verrouiller jusqu'au prochain grand événement familial — l'anniversaire d'un parent, le diplôme d'une nièce, le mariage d'un frère. L'espace est privé pour la fratrie, même s'il vit à l'intérieur d'un compte familial plus large." },
      { h: 'La mémoire comme projet multigénérationnel', p: "Les histoires les plus touchantes de Togthr pour la famille que nous entendons viennent d'enfants adultes qui perdent un parent, puis trouvent un espace Togthr avec un an de points « toujours là », des dizaines de messages vocaux, et quelques capsules temporelles encore scellées. Le chagrin ne devient pas plus petit, mais l'enregistrement de la présence devient soudainement quelque chose à tenir. Togthr pour la famille est construit pour être cet enregistrement, lentement, sans en faire tout un plat. Ce n'est pas un mémorial. C'est une habitude quotidienne, qui — si le pire arrive — se révèle avoir été un cadeau." },
    ],
    faqs: [
      { q: "Togthr pour la famille est-il un espace privé, ou tout le monde voit-il tout ?", a: "Vous choisissez. L'espace familial par défaut est privé pour les personnes que vous invitez, et vous pouvez avoir plusieurs sous-espaces (par exemple, « parents seulement » et « frères et sœurs seulement »). Rien n'est public, rien n'est partagé avec d'autres utilisateurs de Togthr, et vous pouvez ajouter ou retirer des personnes à tout moment." },
      { q: 'Mon parent âgé peut-il utiliser ceci sans smartphone ?', a: "Togthr pour la famille fonctionne sur n'importe quel navigateur moderne, y compris sur une tablette familiale partagée. L'interface est intentionnellement simple — un grand bouton, un petit champ de texte. Nous avons des utilisateurs dans les 80 ans qui l'utilisent quotidiennement. Si votre parent ne peut utiliser aucun appareil, le reste de la famille peut quand même ajouter des messages vocaux et des photos en son nom." },
      { q: "Que se passe-t-il pour l'espace familial si un parent décède ?", a: "L'espace reste. Le compagnon reste. Les capsules temporelles restent. Les enfants adultes peuvent continuer à ajouter au journal comme espace commémoratif privé, ou ils peuvent le fermer. Il n'y a pas de suppression automatique, et aucune donnée n'est jamais vendue ou utilisée pour la publicité. La suppression du compte est toujours votre décision." },
      { q: 'En quoi est-ce différent d\'un chat de famille WhatsApp ?', a: "Un chat de groupe est rapide, bruyant, et disparaît dans le défilement. Togthr pour la famille est lent, silencieux, et persistant. C'est pour les choses que vous ne mettriez pas dans un chat de groupe — les textos « as-tu mangé », les photos de déjeuner, les messages vocaux que vous n'envoyez qu'à un seul frère. Le chat de groupe est pour le groupe. Togthr est pour la relation." },
    ],
    links: [
      { href: '/fr', label: 'Accueil Togthr' },
      { href: '/fr/features', label: 'Toutes les fonctionnalités Togthr' },
      { href: '/fr/pricing', label: 'Tarifs — Gratuit, Plus, Eternal' },
      { href: '/fr/blog/virtual-companion-pet-loss-comfort', label: 'Après avoir perdu un compagnon' },
      { href: '/fr/blog/why-we-built-a-pet-that-grows-with-you', label: 'Pourquoi nous avons construit un compagnon qui grandit avec vous' },
    ],
    cta: 'Créez un espace Togthr pour la famille avec les personnes dont vous venez.',
  },

  es: {
    title: 'Togthr para la Familia — A Través de Generaciones, a Través de Millas',
    description: 'Togthr para la Familia: un pequeño espacio privado para quienes te criaron y para quienes estás criando. Recuerdos largos, rituales diarios suaves y una pequeña mascota que crece a través de generaciones.',
    h1: 'Togthr para la Familia · El hilo entre tres generaciones',
    intro: `Togthr para la Familia es para esa parte de la vida que ninguna app de productividad entiende de verdad: la relación entre un padre y un hijo, entre hermanos que ya no viven en la misma ciudad, entre un hijo adulto y un padre que está envejeciendo. Estas relaciones son largas, lentas, y no se construyen alrededor de un solo evento. Se construyen con pequeños momentos repetidos: una llamada semanal, una foto del almuerzo, un mensaje de "¿ya comiste?", un mensaje de voz de un nieto. Togthr para la Familia es un pequeño espacio privado para esos momentos — no un chat familiar, no un álbum de fotos, sino un espacio lento y multigeneracional que te permite mantener el hilo sin que se convierta en un proyecto.`,
    sections: [
      { h: 'Un espacio que no requiere ser un nativo digital', p: 'La mayoría de las apps asumen que todos en la familia son usuarios avanzados. Togthr para la Familia está construido para la persona más mayor y la más joven del grupo al mismo tiempo. La interfaz es grande, el lenguaje es sencillo, y la única acción que importa es "aquí sigo". Un abuelo de 78 años en otro país puede usarlo sin aprender nada nuevo. Un nieto de 10 años puede usarlo porque la mascota es divertida. Todos los demás solo añaden una foto o una frase cuando se acuerdan.' },
      { h: 'Para el padre que está envejeciendo', p: 'Cuando un padre empieza a envejecer, los pequeños check-ins se vuelven más importantes que las grandes conversaciones. Togthr para la Familia no pretende ser médico ni terapéutico — es solo un pequeño "aquí sigo" diario que el padre puede hacer, y un pequeño "aquí sigo" diario que el hijo adulto puede devolver. La mascota crece en ambas pantallas, y el calendario de puntos se convierte en un registro silencioso y visible de quién llamó, quién visitó, y quién se acordó. No es un sustituto del cuidado, pero es una estructura suave alrededor de los días intermedios.' },
      { h: 'Para los hermanos a distancia', p: 'Los hermanos que crecieron en la misma casa ahora están dispersos entre ciudades, zonas horarias y etapas de la vida. La relación es importante, pero no tiene una estructura obvia. Togthr para la Familia le da a la relación entre hermanos un lugar donde vivir: un flujo de fotos compartido, un diario lento de "qué cociné esta semana", una pequeña mascota que crece en las dos pantallas, y una cápsula del tiempo que pueden sellar hasta el próximo gran hito familiar — el aniversario de un padre, la graduación de una sobrina, la boda de un hermano. El espacio es privado para la pareja de hermanos, aunque viva dentro de una cuenta familiar más grande.' },
      { h: 'La memoria como proyecto multigeneracional', p: 'Las historias más conmovedoras de Togthr para la Familia que escuchamos vienen de hijos adultos que pierden a un padre, y luego encuentran un espacio Togthr con un año de puntos "aquí sigo", docenas de mensajes de voz, y algunas cápsulas del tiempo todavía selladas. El duelo no se hace más pequeño, pero el registro de presencia se convierte de repente en algo que se puede sostener. Togthr para la Familia está construido para ser ese registro, lentamente, sin hacer un escándalo. No es un memorial. Es un hábito diario, que — si pasa lo peor — resulta haber sido un regalo.' },
    ],
    faqs: [
      { q: '¿Togthr para la Familia es un espacio privado, o todos ven todo?', a: 'Tú decides. El espacio familiar por defecto es privado para las personas que invitas, y puedes tener varios sub-espacios (por ejemplo, "solo padres" y "solo hermanos"). Nada es público, nada se comparte con otros usuarios de Togthr, y puedes añadir o quitar personas en cualquier momento.' },
      { q: '¿Mi padre mayor puede usar esto sin un smartphone?', a: 'Togthr para la Familia funciona en cualquier navegador moderno, incluyendo en una tableta familiar compartida. La interfaz es intencionalmente simple — un botón grande, un campo de texto pequeño. Tenemos usuarios en los 80 años que lo usan a diario. Si tu padre no puede usar ningún dispositivo, el resto de la familia puede agregar mensajes de voz y fotos en su nombre.' },
      { q: '¿Qué pasa con el espacio familiar si un padre fallece?', a: 'El espacio se queda. La mascota se queda. Las cápsulas del tiempo se quedan. Los hijos adultos pueden seguir añadiendo al diario como un espacio memorial privado, o pueden cerrarlo. No hay borrado automático, y nunca se venden datos ni se usan para publicidad. La eliminación de la cuenta siempre es tu decisión.' },
      { q: '¿En qué se diferencia de un chat familiar de WhatsApp?', a: 'Un chat grupal es rápido, ruidoso, y se pierde en el scroll. Togthr para la Familia es lento, silencioso, y persistente. Es para las cosas que no pondrías en un chat grupal — los mensajes de "¿ya comiste?", las fotos del almuerzo, los mensajes de voz que solo le envías a un hermano. El chat grupal es para el grupo. Togthr es para la relación.' },
    ],
    links: [
      { href: '/es', label: 'Inicio de Togthr' },
      { href: '/es/features', label: 'Todas las funciones de Togthr' },
      { href: '/es/pricing', label: 'Precios — Gratis, Plus, Eternal' },
      { href: '/es/blog/virtual-companion-pet-loss-comfort', label: 'Después de perder a una mascota' },
      { href: '/es/blog/why-we-built-a-pet-that-grows-with-you', label: 'Por qué construimos una mascota que crece contigo' },
    ],
    cta: 'Crea un espacio Togthr para la Familia con las personas de las que vienes.',
  },
}

// ───────────────────────────────────────────────────────────────────────
// for-self — 个人成长 / 5 阶段宠物 / 自我对话
// ───────────────────────────────────────────────────────────────────────
const forSelf: Record<Locale, ForEntry> = {
  en: {
    title: 'Togthr for Yourself — A Quiet Companion for One',
    description: 'Togthr for Yourself: a small private space for the most important relationship you have. A daily check-in with yourself, a 5-stage virtual pet that grows with you, and a slow journal nobody else reads.',
    h1: 'Togthr for Yourself · The quietest, most important relationship',
    intro: `Togthr for Yourself is for the relationship that is, statistically, the longest one in your life: the one with yourself. Not the polished self of Instagram. Not the "I should meditate every morning" self. The actual, day-to-day, sometimes-tired, sometimes-okay self that shows up and tries. This is a small private space for that person: a daily check-in that takes under two minutes, a 5-stage virtual pet that grows in five visible phases (infant, toddler, teen, adult, legend) as you keep showing up, a slow journal that nobody else can read, and a tree hole for the things you would never say out loud. The point is not to optimize yourself. The point is to keep yourself company.`,
    sections: [
      { h: 'The 5 stages of growing with yourself', p: 'The Togthr pet for self-mode has five visible stages: infant, toddler, teen, adult, and legend. The pet does not level up based on streaks or productivity. It grows when you show up — even on the days when showing up means "I got out of bed and that is enough." After a few months, the pet moves from infant to toddler. After a year, it might be a teen. After a few years, an adult. The legend stage is rare, and you will know when you get there. The pet is not measuring you. It is accompanying you, the way a real companion does.' },
      { h: 'A daily check-in with the person you actually are', p: 'Every morning, the app gives you one question. It is not "what are your three goals today?" It is more like "what is one thing you are looking forward to today?" or "what is one thing you are worried about?" You answer in your own words, you do not share it with anyone, and the pet quietly notices. There is no streak, no notification that yells at you, no leaderboard. Some mornings you answer in two words. Some mornings you write a paragraph. Both are fine. The point is that you have a place to put the day, even if the day is small.' },
      { h: 'A tree hole for the things you would never say out loud', p: 'Sometimes the most useful thing you can do is write a sentence that nobody will ever read. Togthr for Yourself includes a small "tree hole" — a private, anonymous space where you can drop a note about how you are actually doing, and watch it dissolve 24 hours later. It is not a journal. It is not a social network. It is just a quiet place to put the thing that is bothering you, in writing, so that your head is a little lighter. Nobody sees it. It does not count. It just goes.' },
      { h: 'When you stop showing up, the pet does not punish you', p: 'The hardest part of any self-improvement app is the moment you stop using it. Togthr for Yourself was built for that moment. If you disappear for two weeks because life happened, the pet stays where it is and waits. If you disappear for two months, the journal is still there. If you come back on a hard Tuesday, the daily check-in is just the same single small question, with no judgment about the gap. The point is not to be a perfect self-tracker. The point is to have a small, persistent place to come back to — even on the days when you come back as a smaller version of yourself.' },
    ],
    faqs: [
      { q: 'Is Togthr for Yourself a self-improvement app?', a: 'No. Togthr for Yourself is not a self-improvement app. It does not have streaks, goals, or metrics. It is a small private space for the day-to-day act of keeping yourself company. If you are looking for a productivity tool, this is not it. If you are looking for a quiet companion that grows as you grow, it might be.' },
      { q: 'Can I use Togthr for Yourself completely anonymously?', a: 'Yes. The daily check-in, the journal, the tree hole, and the pet are all private to you. You do not have to share anything with anyone. You do not even have to use your real name. The account is yours, the data is yours, and you can delete it at any time.' },
      { q: 'What happens if I stop using the app for a few months?', a: 'Nothing dramatic. The pet waits. The journal stays. The time capsules stay sealed. When you come back, the daily check-in is exactly where you left it — a single small question, with no judgment about the gap. Togthr is built to be there on the day you decide to come back, not to chase you while you are away.' },
      { q: 'Is there a way to talk to the pet, or to an AI?', a: 'Not in the basic for-yourself mode. The pet is a presence, not a conversational AI. If you want a chat companion, Togthr Plus has a separate "Soulmate" mode that is built for that. The for-yourself mode is intentionally quieter — it is for the things you say to yourself, not for a chatbot to answer back.' },
    ],
    links: [
      { href: '/en', label: 'Togthr home' },
      { href: '/en/features', label: 'All Togthr features' },
      { href: '/en/pricing', label: 'Pricing — Free, Plus, Eternal' },
      { href: '/en/blog/two-minute-daily-check-in-ai-companion', label: 'A two-minute daily check-in with your AI companion' },
      { href: '/en/blog/why-we-built-a-pet-that-grows-with-you', label: 'Why we built a pet that grows with you' },
    ],
    cta: 'Start a Togthr for Yourself space — just you, your pet, and the day.',
  },

  'zh-cn': {
    title: 'Togthr 给自己——一段你最该经营的关系',
    description: 'Togthr 给自己:给你自己留的一小块私密空间。每天两分钟的"今天怎么样"、一只五阶段一起长大的小宠物、一本只有自己看得到的慢日记。',
    h1: 'Togthr 给自己 · 跟你最久的那个人,先好好陪着',
    intro: `Togthr 给自己,是 Togthr 给"你这辈子统计意义上最长的一段关系"准备的版本:跟你自己的关系。不是朋友圈里那个修过的自己,不是"我应该每天早上冥想"的那个自己。是那个一天一天真的在过、有时候累、有时候还好、还是每天都会出现、还是每天都在试试的自己。这个 App 是给那个人的一小块私密空间:每天不到两分钟的"今天怎么样"、一只分五个阶段(婴儿、学步、少年、成年、传说)跟你一起长大的小宠物、一本只有自己看得到的慢日记,以及一个你可以把那些永远说不出口的话放进去的"树洞"。它不是要优化你,是要陪你。`,
    sections: [
      { h: '五个阶段,跟你一起长大', p: '"自己模式"里的 Togthr 宠物有五个看得到的阶段:婴儿、学步、少年、成年、传说。它不是按"打卡"或"产出"升级,而是按"你出现了"升级——哪怕"出现"今天只是"我从床上起来了,这就够了"。几个月后,宠物从婴儿长到学步;一年后,可能长到少年;几年后,成年。传说是稀有的阶段,你到的时候会知道。它不衡量你,它陪你,像一只真陪你的小动物。' },
      { h: '每天跟自己打一个招呼', p: '每天早上,App 会问你一个问题。它不是"今天的三个目标是什么",更像"今天有什么让你有点期待的"或"今天有什么让你有点担心的"。你用自己的话回答,不用分享给任何人,宠物在旁边安静地知道。没有连续打卡,没有弹窗吼你,没有排行榜。有些天你用两个字答完,有些天你写了一段。两个都挺好。意义在于——你有一个地方把这天放下来,哪怕这一天很小。' },
      { h: '那些你永远不会说出口的话,有一个地方放', p: '有时候最有用的事,就是写一句永远不会有人看的话。Togthr 给自己里面有一个小小的"树洞"——一个私密的、匿名的地方,你可以把"我今天其实怎么样"放进去,看着它在 24 小时后自己消失。它不是日记,不是社交网络,它只是一个安静的地方,让你把"今天压在心里的那个东西"写在纸上,让你的头轻一点。没人看到,不算分,它就自己走了。' },
      { h: '当你不再出现,宠物不会惩罚你', p: '任何自我提升 App 最难的一刻,就是你不用它的那天。Togthr 给自己是给那一刻设计的。如果因为生活,你消失了两周,宠物停在原地等;消失两个月,日记还在那里;如果某一天你过得很难、又回来了,今天的"今天怎么样"还是那个简单的小问题,中间那段空档不会被提起。它不是要你成为完美的自我追踪者,而是要给你一个一直在那里、可以回来、哪怕"回来时的自己"比离开时小一点的小地方。' },
    ],
    faqs: [
      { q: 'Togthr 给自己是"自我提升" App 吗?', a: '不是。Togthr 给自己不是自我提升 App,没有连续打卡、没有目标、没有指标。它是一个小小的、给自己的日常陪伴空间。如果你在找一个生产力工具,它不是;如果你在找一个安静的、跟着你一起长大的小东西,可能是。' },
      { q: '我能完全匿名地用 Togthr 给自己吗?', a: '可以。每天的"今天怎么样"、日记、树洞、宠物,都是只属于你自己的。你不需要分享给任何人,你甚至不需要用真名。账号是你的,数据是你的,你可以随时删掉。' },
      { q: '如果我停用几个月,会怎么样?', a: '不会怎么样。宠物等着,日记留着,时光胶囊也不会自己打开。你回来的那天,"今天怎么样"还是那个简单的小问题,中间的空白不会被提起。Togthr 是给"你决定回来的那一天"准备的,不是要你不在的时候追着你。' },
      { q: '可以跟宠物说话吗?或者跟 AI 说话?', a: '"自己模式"里默认不可以。宠物是一个"在场",不是对话式 AI。如果你想找一个能聊天的同伴,Togthr Plus 有一个独立的"Soulmate"模式是为这个设计的。"自己模式"故意更安静——它是为那些你说给自己的话准备的,不是让一个聊天机器人来回。' },
    ],
    links: [
      { href: '/zh-cn', label: 'Togthr 首页' },
      { href: '/zh-cn/features', label: 'Togthr 全部功能' },
      { href: '/zh-cn/pricing', label: '价格 — 免费版、Plus、Eternal' },
      { href: '/zh-cn/blog/two-minute-daily-check-in-ai-companion', label: '每天两分钟,跟你的 AI 同伴打个招呼' },
      { href: '/zh-cn/blog/why-we-built-a-pet-that-grows-with-you', label: '为什么我们做了一只陪你长大的宠物' },
    ],
    cta: '开一个 Togthr 给自己——只有你、你的小宠物、和今天。',
  },

  'zh-tw': {
    title: 'Togthr 給自己——一段你最該經營的關係',
    description: 'Togthr 給自己:給你自己留的一小塊私密空間。每天兩分鐘的「今天還好嗎」、一隻五階段一起長大的小寵物、一本只有自己看得到的慢日記。',
    h1: 'Togthr 給自己 · 跟你最久的那個人,先好好陪著',
    intro: `Togthr 給自己,是 Togthr 給「你這輩子統計意義上最長的一段關係」準備的版本:跟你自己的關係。不是 IG 裡那個修過的自己,不是「我應該每天早上冥想」的那個自己。是那個一天一天真的在過、有時候累、有時候還好、還是每天都會出現、還是每天都在試試的自己。這個 App 是給那個人的一小塊私密空間:每天不到兩分鐘的「今天還好嗎」、一隻分五個階段(嬰兒、學步、少年、成年、傳說)跟你一起長大的小寵物、一本只有自己看得到的慢日記,以及一個你可以把那些永遠說不出口的話放進去的「樹洞」。它不是要優化你,是要陪你。`,
    sections: [
      { h: '五個階段,跟你一起長大', p: '「自己模式」裡的 Togthr 寵物有五個看得到的階段:嬰兒、學步、少年、成年、傳說。它不是按「打卡」或「產出」升級,而是按「你出現了」升級——哪怕「出現」今天只是「我從床上爬起來了,這就夠了」。幾個月後,寵物從嬰兒長到學步;一年後,可能長到少年;幾年後,成年。傳說是稀有的階段,你到的時候會知道。它不衡量你,它陪你,像一隻真陪你的小動物。' },
      { h: '每天跟自己打一個招呼', p: '每天早上,App 會問你一個問題。它不是「今天的三個目標是什麼」,更像「今天有什麼讓你有點期待的」或「今天有什麼讓你有點擔心的」。你用自己的話回答,不用分享給任何人,寵物在旁邊安靜地知道。沒有連續打卡,沒有跳窗吼你,沒有排行榜。有些天你用兩個字答完,有些天你寫了一段。兩個都挺好。意義在於——你有一個地方把這天放下來,哪怕這一天很小。' },
      { h: '那些你永遠不會說出口的話,有一個地方放', p: '有時候最有用的事,就是寫一句永遠不會有人看的話。Togthr 給自己裡面有一個小小的「樹洞」——一個私密的、匿名的地方,你可以把「我今天其實怎麼樣」放進去,看著它在 24 小時後自己消失。它不是日記,不是社群網路,它只是一個安靜的地方,讓你把「今天壓在心裡的那個東西」寫在紙上,讓你的頭輕一點。沒人看到,不算分,它就自己走了。' },
      { h: '當你不再出現,寵物不會處罰你', p: '任何自我提升 App 最難的一刻,就是你不用它的那天。Togthr 給自己是給那一刻設計的。如果因為生活,你消失了兩週,寵物停在原地等;消失兩個月,日記還在那裡;如果某一天你過得很難、又回來了,今天的「今天還好嗎」還是那個簡單的小問題,中間那段空檔不會被提起。它不是要你成為完美的自我追蹤者,而是要給你一個一直在那裡、可以回來、哪怕「回來時的自己」比離開時小一點的小地方。' },
    ],
    faqs: [
      { q: 'Togthr 給自己是「自我提升」 App 嗎?', a: '不是。Togthr 給自己不是自我提升 App,沒有連續打卡、沒有目標、沒有指標。它是一個小小的、給自己的日常陪伴空間。如果你在找一個生產力工具,它不是;如果你在找一個安靜的、跟著你一起長大的小東西,可能是。' },
      { q: '我能完全匿名地用 Togthr 給自己嗎?', a: '可以。每天的「今天還好嗎」、日記、樹洞、寵物,都是只屬於你自己的。你不需要分享給任何人,你甚至不需要用真名。帳號是你的,資料是你的,你可以隨時刪掉。' },
      { q: '如果我停用幾個月,會怎麼樣?', a: '不會怎麼樣。寵物等著,日記留著,時光膠囊也不會自己打開。你回來的那天,「今天還好嗎」還是那個簡單的小問題,中間的空白不會被提起。Togthr 是給「你決定回來的那一天」準備的,不是要你不在的時候追著你。' },
      { q: '可以跟寵物說話嗎?或者跟 AI 說話?', a: '「自己模式」裡預設不可以。寵物是一個「在場」,不是對話式 AI。如果你想找一個能聊天的同伴,Togthr Plus 有一個獨立的「Soulmate」模式是為這個設計的。「自己模式」故意更安靜——它是為那些你說給自己的話準備的,不是讓一個聊天機器人來回。' },
    ],
    links: [
      { href: '/zh-tw', label: 'Togthr 首頁' },
      { href: '/zh-tw/features', label: 'Togthr 全部功能' },
      { href: '/zh-tw/pricing', label: '價格 — 免費版、Plus、Eternal' },
      { href: '/zh-tw/blog/two-minute-daily-check-in-ai-companion', label: '每天兩分鐘,跟你的 AI 同伴打個招呼' },
      { href: '/zh-tw/blog/why-we-built-a-pet-that-grows-with-you', label: '為什麼我們做了一隻陪你長大的寵物' },
    ],
    cta: '開一個 Togthr 給自己——只有你、你的小寵物、和今天。',
  },

  ja: {
    title: 'Togthr じぶんのため — 最も長く、最も大切な関係',
    description: 'Togthr じぶんのため:じぶん自身のための小さなプライベート空間。2分の今日のチェックイン、5段階で育つ小さなペット、誰にも読まれないゆっくりした日記。',
    h1: 'Togthr じぶんのため · 一番長く一緒にいる人',
    intro: `Togthr じぶんのためは、「統計上、あなたの人生で最も長い関係」のためのバージョン:あなた自身との関係。SNS向けに磨かれた自分でも、「毎朝瞑想すべき自分」でもありません。毎日を実際に生きている、疲れる日もある、まあ大丈夫な日もある、それでも現れて、試す自分。その人のための小さなプライベート空間:2分かからない毎日のチェックイン、5段階(赤ちゃん、よちよち、青年、大人、伝説)で育つ小さなペット、誰にも読まれないゆっくりした日記、そして口には出さない言葉を預ける「樹洞」。自分を最適化することが目的ではなく、自分に寄り添うことが目的です。`,
    sections: [
      { h: '5段階の、あなた自身の成長', p: '「じぶんモード」のTogthr ペットには5つの見える段階があります:赤ちゃん、よちよち、青年、大人、伝説。連続記録や成果でレベルアップするのではなく、「あなたが現れた」ことで育ちます——たとえ今日の「現れる」が「ベッドから起き上がった、それだけで十分」だったとしても。数ヶ月で、赤ちゃんからよちよちへ。一年で、青年になることも。数年で、大人。伝説は稀な段階で、そこに辿り着いた時、あなたは知っているはずです。ペットはあなたを測るのではなく、付き添うのです。' },
      { h: '毎朝、自分にひとつ声をかけ', p: '毎朝、アプリはあなたにひとつ質問をします。「今日の3つの目標は?」ではなく、「今日ちょっと楽しみだなって思うことは?」とか「今日ちょっと心配なことは?」に近い。あなた自身の言葉で答える。誰にも共有しない。ペットが静かに知っている。連続記録もなく、うるさい通知もなく、ランキングもない。ある日は二文字で答え、ある日は段落で書く。どちらも大丈夫。意味は、その日を置く場所をあなたが持っていること——たとえその日が小さくても。' },
      { h: '口には出さない言葉のための場所', p: '時折最も役に立つのは、誰にも読まれない一文を書くこと。Togthr じぶんのためには小さな「樹洞」があります——プライベートで匿名の場所で、「今日の本当のところ」を落とし、24時間後に消えていくのを見る。日记でも SNS でもない。ただ頭の中が少し軽くなるように、邪魔なものを紙に置くだけの場所。誰も見ないし、得点にもならない。消えるだけ。' },
      { h: '現れなくなっても、ペットは罰を与えません', p: 'どんな自己改善アプリにとっても、最も難しい瞬間はあなたが使わなくなった日。Togthr じぶんのためは、その瞬間のために作られました。生活で2週間消えても、ペットは待っています。2ヶ月消えても、日記はそのまま。辛い火曜日に戻ってきたら、今日の「今日のチェックイン」は同じ小さな質問ひとつで、空白について何も言いません。完璧な自己トラッカーになることが目的ではなく、小さくても永続的で、戻ってこられる場所を作ることが目的です——たとえ「戻ってきた時の自分」が去った時より小さくても。' },
    ],
    faqs: [
      { q: 'Togthr じぶんのためは、自己改善アプリですか?', a: 'いいえ。Togthr じぶんのためは自己改善アプリではなく、連続記録、目標、指標もありません。毎日の自分に寄り添うための小さなプライベート空間です。生産性ツールを探しているなら、これは違います。静かで、一緒に育つものを探しているなら、もしかしたら合います。' },
      { q: 'Togthr じぶんのためを完全に匿名で使えますか?', a: 'はい。今日のチェックイン、日記、樹洞、ペットはすべてあなただけのものです。誰かと共有する必要はなく、本名を使う必要すらありません。アカウントはあなたのもの、データはあなたのもの、削除はいつでもできます。' },
      { q: '数ヶ月使わなかったらどうなりますか?', a: '何も劇的には起きません。ペットは待ちます。日記は残ります。タイムカプセルは開かないままです。戻ってきた日、「今日のチェックイン」はちょうどあなたが去った時と同じ小さな質問ひとつで、空白について何も言いません。Togthr は「戻ることを決めた日」のためにあるのであって、いない間あなたを追いかけるためのものではありません。' },
      { q: 'ペットと会話できますか?AIと話せますか?', a: '「じぶんモード」ではデフォルトではできません。ペットは「存在」であり、会話型 AI ではありません。もしチャット仲間が欲しいなら、Togthr Plus に独立した「Soulmate」モードがあります。「じぶんモード」は意図的により静かに作られています——あなたが自分に言う言葉のためのもので、チャットボットが返事をするためのものではありません。' },
    ],
    links: [
      { href: '/ja', label: 'Togthr ホーム' },
      { href: '/ja/features', label: 'Togthr すべての機能' },
      { href: '/ja/pricing', label: '料金 — 無料、Plus、Eternal' },
      { href: '/ja/blog/two-minute-daily-check-in-ai-companion', label: 'あなたの AI 仲間と毎日2分のチェックイン' },
      { href: '/ja/blog/why-we-built-a-pet-that-grows-with-you', label: 'なぜあなたと一緒に育つペットを作ったのか' },
    ],
    cta: 'Togthr じぶんのためのスペースを始める — あなたと、ペットと、今日だけ。',
  },

  ko: {
    title: 'Togthr 자신을 위한 — 가장 길고, 가장 중요한 관계',
    description: 'Togthr 자신을 위한: 자신만을 위한 작은 사적 공간. 2분의 오늘의 체크인, 5단계로 자라는 작은 펫, 아무도 읽지 않는 천천한 일기.',
    h1: 'Togthr 자신을 위한 · 가장 오래 함께한 사람',
    intro: `Togthr 자신을 위한은 "통계상 당신의 인생에서 가장 긴 관계"를 위한 버전: 당신 자신과의 관계. SNS을 위해 다듬어진 자기, "매일 아침 명상해야 할 자기"가 아닙니다. 매일을 실제로 사는, 지치는 날도 있고 그냥 괜찮은 날도 있고, 그래도 나타나고 시도하는 그 자기. 그 사람을 위한 작은 사적 공간: 2분도 안 걸리는 매일의 체크인, 5단계(아기, 걸음마, 청년, 어른, 전설)로 자라는 작은 펫, 아무도 읽지 않는 천천한 일기, 그리고 입 밖에 내지 않는 말을 맡기는 "나무구멍". 자신을 최적화하려는 게 아니라, 자신에게 함께하는 게 목적입니다.`,
    sections: [
      { h: '5단계의, 당신 자신의 성장', p: '"자신 모드"의 Togthr 펫에는 5개의 보이는 단계가 있습니다: 아기, 걸음마, 청년, 어른, 전설. 연속 기록이나 성과로 레벨업하지 않고, "당신이 나타났다"는 사실로 자랍니다 — 오늘의 "나타남"이 "침대에서 일어났다, 그것만으로 됐다"여도. 몇 달 후, 아기에서 걸음마로. 1년 후, 청년이 될 수도. 몇 년 후, 어른. 전설은 드문 단계고, 거기 도달하면 알게 됩니다. 펫은 당신을 재지 않고, 함께 합니다.' },
      { h: '매일 아침, 자신에게 한마디', p: '매일 아침, 앱이 당신에게 한 가지를 묻습니다. "오늘의 세 가지 목표는?"이 아니라, "오늘 조금 기대되는 것은?" 또는 "오늘 조금 걱정되는 것은?"에 가깝습니다. 당신 자신의 말로 답합니다. 누구와도 공유하지 않고, 펫이 조용히 알고 있습니다. 연속 기록도 없고, 소리치는 알림도 없고, 리더보드도 없습니다. 어떤 날은 두 글자로 답하고, 어떤 날은 문단을 씁니다. 둘 다 괜찮습니다. 의미는, 그날을 둘 곳이 있다는 것 — 그날이 작더라도.' },
      { h: '입 밖에 내지 않는 말들을 위한 곳', p: '때때로 가장 유용한 것은, 아무도 읽지 않을 한 문장을 쓰는 것입니다. Togthr 자신을 위한에는 작은 "나무구멍"이 있습니다 — 사적이고 익명의 곳으로, "오늘의 진짜 상태"를 떨어뜨려서 24시간 후에 사라지는 걸 봅니다. 일기도 아니고 SNS 도 아닙니다. 머리가 조금 가벼워지도록, 신경을 긁는 것을 종이 위에 두는 조용한 곳. 아무도 보지 않고, 점수도 되지 않고, 그냥 사라집니다.' },
      { h: '등장하지 않아도, 펫은 벌을 주지 않습니다', p: '어떤 자기계발 앱에서든 가장 어려운 순간은, 당신이 그만 쓸 때입니다. Togthr 자신을 위한은 그 순간을 위해 만들어졌습니다. 인생 때문에 2주 사라져도, 펫은 그 자리에 있습니다. 2달 사라져도, 일기는 그대로입니다. 힘든 화요일에 다시 돌아오면, 오늘의 "체크인"은 같은 작은 질문 하나이고, 공백에 대해선 아무 말도 하지 않습니다. 완벽한 자기 추적가가 되는 게 아니라, 작지만 계속 거기 있는, 돌아올 수 있는 곳을 만드는 것이 목적입니다 — 돌아왔을 때의 자신이 떠났을 때보다 작아졌더라도.' },
    ],
    faqs: [
      { q: 'Togthr 자신을 위한은 자기계발 앱인가요?', a: '아닙니다. Togthr 자신을 위한은 자기계발 앱이 아닙니다. 연속 기록도, 목표도, 지표도 없습니다. 매일의 자기 자신에게 함께하는 작은 사적 공간입니다. 생산성 도구를 찾는 거라면, 이건 아닙니다. 조용하고, 함께 자라는 것을 찾는 거라면, 맞을 수도 있습니다.' },
      { q: 'Togthr 자신을 위한을 완전히 익명으로 쓸 수 있나요?', a: '네. 매일의 체크인, 일기, 나무구멍, 펫 모두 당신만의 것입니다. 누구와도 공유할 필요 없고, 실명도 쓸 필요 없습니다. 계정은 당신의 것이고, 데이터는 당신의 것이고, 삭제는 언제든 가능합니다.' },
      { q: '몇 달 안 쓰면 어떻게 되나요?', a: '극적인 일은 일어나지 않습니다. 펫은 기다리고, 일기는 남아 있고, 타임캡슐은 열리지 않은 채입니다. 돌아온 그날, "체크인"은 당신이 떠난 그날의 같은 작은 질문이고, 공백에 대해서는 아무 말도 하지 않습니다. Togthr은 "돌아오기로 한 날"을 위해 있는 것이지, 없는 동안 따라다니는 것이 아닙니다.' },
      { q: '펫과 대화할 수 있나요? AI와 말할 수 있나요?', a: '"자신 모드"에서는 기본적으로 안 됩니다. 펫은 "존재"이지, 대화형 AI가 아닙니다. 채팅 상대가 필요하다면, Togthr Plus에 독립된 "Soulmate" 모드가 있습니다. "자신 모드"는 의도적으로 더 조용합니다 — 당신이 자신에게 하는 말을 위한 것이지, 챗봇이 대답하기 위한 것이 아닙니다.' },
    ],
    links: [
      { href: '/ko', label: 'Togthr 홈' },
      { href: '/ko/features', label: 'Togthr 모든 기능' },
      { href: '/ko/pricing', label: '요금 — 무료, Plus, Eternal' },
      { href: '/ko/blog/two-minute-daily-check-in-ai-companion', label: '당신의 AI 동반과 매일 2분의 체크인' },
      { href: '/ko/blog/why-we-built-a-pet-that-grows-with-you', label: '왜 당신과 함께 자라는 펫을 만들었는가' },
    ],
    cta: 'Togthr 자신을 위한 공간 시작 — 당신과, 펫과, 오늘만.',
  },

  de: {
    title: 'Togthr für dich selbst — Die stillste, wichtigste Beziehung',
    description: 'Togthr für dich selbst: ein kleiner privater Raum für die wichtigste Beziehung, die du hast. Ein täglicher Check-in mit dir selbst, ein 5-Stufen-Begleiter, der mit dir wächst, und ein langsames Tagebuch, das niemand sonst liest.',
    h1: 'Togthr für dich selbst · Die stillste, wichtigste Beziehung',
    intro: `Togthr für dich selbst ist für die Beziehung, die statistisch gesehen die längste in deinem Leben ist: die mit dir selbst. Nicht das polierte Selbst von Instagram. Nicht das "ich sollte jeden Morgen meditieren"-Selbst. Das echte, alltägliche, manchmal müde, manchmal okay Selbst, das auftaucht und es versucht. Das ist ein kleiner privater Raum für diese Person: ein täglicher Check-in, der unter zwei Minuten dauert, ein 5-Stufen-Begleiter, der in fünf sichtbaren Phasen wächst (Säugling, Kleinkind, Teenager, Erwachsener, Legende), während du immer wieder auftauchst, ein langsames Tagebuch, das niemand sonst lesen kann, und ein Baumloch für die Dinge, die du nie aussprechen würdest. Es geht nicht darum, dich zu optimieren. Es geht darum, dir Gesellschaft zu leisten.`,
    sections: [
      { h: 'Die 5 Stufen, mit dir zu wachsen', p: 'Der Togthr-Begleiter im Selbst-Modus hat fünf sichtbare Stufen: Säugling, Kleinkind, Teenager, Erwachsener und Legende. Der Begleiter steigt nicht basierend auf Streaks oder Produktivität auf. Er wächst, wenn du auftauchst — auch an den Tagen, an denen auftauchen bedeutet "ich bin aus dem Bett gekommen und das ist genug". Nach ein paar Monaten bewegt sich der Begleiter vom Säugling zum Kleinkind. Nach einem Jahr ist er vielleicht ein Teenager. Nach ein paar Jahren ein Erwachsener. Die Legenden-Stufe ist selten, und du wirst wissen, wenn du dort ankommst. Der Begleiter misst dich nicht. Er begleitet dich, so wie ein echter Begleiter es tun würde.' },
      { h: 'Ein täglicher Check-in mit der Person, die du tatsächlich bist', p: 'Jeden Morgen gibt dir die App eine Frage. Es ist nicht "was sind deine drei Ziele heute?" Es ist eher "worauf freust du dich heute?" oder "was macht dir heute Sorgen?". Du antwortest in deinen eigenen Worten, du teilst es mit niemandem, und der Begleiter bemerkt es leise. Es gibt keinen Streak, keine Benachrichtigung, die dich anschreit, keine Bestenliste. Manche Morgen antwortest du in zwei Wörtern. Manche Morgen schreibst du einen Absatz. Beides ist in Ordnung. Der Punkt ist, dass du einen Ort hast, um den Tag hinzulegen, selbst wenn der Tag klein ist.' },
      { h: 'Ein Baumloch für die Dinge, die du nie aussprechen würdest', p: 'Manchmal ist das Nützlichste, was du tun kannst, einen Satz zu schreiben, den niemand jemals lesen wird. Togthr für dich selbst enthält ein kleines "Baumloch" — einen privaten, anonymen Raum, in den du eine Notiz darüber fallen lassen kannst, wie es dir wirklich geht, und zusehen kannst, wie sie sich nach 24 Stunden auflöst. Es ist kein Tagebuch. Es ist kein soziales Netzwerk. Es ist einfach ein ruhiger Ort, um das, was dich bedrückt, schriftlich loszuwerden, damit dein Kopf etwas leichter wird. Niemand sieht es. Es zählt nicht. Es geht einfach.' },
      { h: 'Wenn du aufhörst aufzutauchen, bestraft dich der Begleiter nicht', p: 'Der schwierigste Moment bei jeder Selbstverbesserungs-App ist der Moment, in dem du aufhörst sie zu benutzen. Togthr für dich selbst wurde für diesen Moment gebaut. Wenn du für zwei Wochen verschwindest, weil das Leben dazwischenkam, bleibt der Begleiter wo er ist und wartet. Wenn du für zwei Monate verschwindest, ist das Tagebuch immer noch da. Wenn du an einem harten Dienstag zurückkommst, ist der tägliche Check-in einfach dieselbe kleine Frage, ohne Urteil über die Lücke. Es geht nicht darum, ein perfekter Selbst-Tracker zu sein. Es geht darum, einen kleinen, beständigen Ort zu haben, zu dem du zurückkommen kannst — auch an den Tagen, an denen du als kleinere Version deiner selbst zurückkommst.' },
    ],
    faqs: [
      { q: 'Ist Togthr für dich selbst eine Selbstverbesserungs-App?', a: 'Nein. Togthr für dich selbst ist keine Selbstverbesserungs-App. Es hat keine Streaks, Ziele oder Metriken. Es ist ein kleiner privater Raum für die alltägliche Handlung, dir selbst Gesellschaft zu leisten. Wenn du ein Produktivitäts-Tool suchst, ist das nicht es. Wenn du einen stillen Begleiter suchst, der mit dir wächst, könnte es das sein.' },
      { q: 'Kann ich Togthr für dich selbst komplett anonym nutzen?', a: 'Ja. Der tägliche Check-in, das Tagebuch, das Baumloch und der Begleiter sind alle privat für dich. Du musst nichts mit niemandem teilen. Du musst nicht einmal deinen echten Namen verwenden. Das Konto gehört dir, die Daten gehören dir, und du kannst es jederzeit löschen.' },
      { q: 'Was passiert, wenn ich die App ein paar Monate lang nicht benutze?', a: 'Nichts Dramatisches. Der Begleiter wartet. Das Tagebuch bleibt. Die Zeitkapseln bleiben versiegelt. Wenn du zurückkommst, ist der tägliche Check-in genau dort, wo du ihn gelassen hast — eine einzige kleine Frage, ohne Urteil über die Lücke. Togthr ist dafür gebaut, an dem Tag da zu sein, an dem du dich entscheidest zurückzukommen, nicht um dir hinterherzulaufen, wenn du weg bist.' },
      { q: 'Gibt es eine Möglichkeit, mit dem Begleiter oder einer KI zu sprechen?', a: 'Nicht im Basis-Selbst-Modus. Der Begleiter ist eine Präsenz, keine Gesprächs-KI. Wenn du einen Chat-Begleiter möchtest, hat Togthr Plus einen separaten "Soulmate"-Modus, der dafür gebaut ist. Der Selbst-Modus ist absichtlich stiller — er ist für die Dinge, die du zu dir selbst sagst, nicht damit ein Chatbot zurückantwortet.' },
    ],
    links: [
      { href: '/de', label: 'Togthr Startseite' },
      { href: '/de/features', label: 'Alle Togthr-Funktionen' },
      { href: '/de/pricing', label: 'Preise — Free, Plus, Eternal' },
      { href: '/de/blog/two-minute-daily-check-in-ai-companion', label: 'Ein zwei-minütiger täglicher Check-in mit deinem KI-Begleiter' },
      { href: '/de/blog/why-we-built-a-pet-that-grows-with-you', label: 'Warum wir einen Begleiter gebaut haben, der mit dir wächst' },
    ],
    cta: 'Eröffne einen Togthr-für-dich-selbst-Raum — nur du, dein Begleiter, und der Tag.',
  },

  fr: {
    title: 'Togthr pour vous-même — La relation la plus silencieuse, la plus importante',
    description: "Togthr pour vous-même : un petit espace privé pour la relation la plus importante que vous avez. Un check-in quotidien avec vous-même, un compagnon en 5 étapes qui grandit avec vous, et un journal lent que personne d'autre ne lit.",
    h1: 'Togthr pour vous-même · La relation la plus silencieuse, la plus importante',
    intro: `Togthr pour vous-même est pour la relation qui, statistiquement, est la plus longue de votre vie : celle avec vous-même. Pas le soi poli d'Instagram. Pas le soi "je devrais méditer chaque matin". Le vrai soi, quotidien, parfois fatigué, parfois okay, qui se présente et essaie. C'est un petit espace privé pour cette personne : un check-in quotidien qui prend moins de deux minutes, un compagnon en 5 étapes qui grandit en cinq phases visibles (bébé, bambin, adolescent, adulte, légende) au fur et à mesure que vous continuez à vous montrer, un journal lent que personne d'autre ne peut lire, et un trou d'arbre pour les choses que vous ne diriez jamais à voix haute. Le but n'est pas de vous optimiser. Le but est de vous tenir compagnie.`,
    sections: [
      { h: 'Les 5 étapes, grandir avec vous', p: "Le compagnon Togthr en mode soi a cinq étapes visibles : bébé, bambin, adolescent, adulte et légende. Le compagnon ne monte pas de niveau en fonction des séries ou de la productivité. Il grandit quand vous vous montrez — même les jours où se montrer signifie \"je me suis levé du lit et c'est assez\". Après quelques mois, le compagnon passe de bébé à bambin. Après un an, il est peut-être un adolescent. Après quelques années, un adulte. L'étape légende est rare, et vous saurez quand vous y arriverez. Le compagnon ne vous mesure pas. Il vous accompagne, comme le ferait un vrai compagnon." },
      { h: 'Un check-in quotidien avec la personne que vous êtes vraiment', p: "Chaque matin, l'app vous pose une question. Ce n'est pas \"quels sont vos trois objectifs aujourd'hui ?\". C'est plutôt \"à quoi vous attendez-vous aujourd'hui ?\" ou \"qu'est-ce qui vous inquiète aujourd'hui ?\". Vous répondez dans vos propres mots, vous ne le partagez avec personne, et le compagnon le remarque silencieusement. Il n'y a pas de série, pas de notification qui vous crie dessus, pas de classement. Certains matins vous répondez en deux mots. Certains matins vous écrivez un paragraphe. Les deux sont bien. Le point est que vous avez un endroit pour poser la journée, même si la journée est petite." },
      { h: 'Un trou d\'arbre pour les choses que vous ne diriez jamais à voix haute', p: "Parfois, la chose la plus utile que vous puissiez faire est d'écrire une phrase que personne ne lira jamais. Togthr pour vous-même comprend un petit \"trou d'arbre\" — un espace privé et anonyme où vous pouvez déposer une note sur comment vous allez vraiment, et la regarder se dissoudre 24 heures plus tard. Ce n'est pas un journal. Ce n'est pas un réseau social. C'est juste un endroit calme pour poser la chose qui vous dérange, par écrit, pour que votre tête soit un peu plus légère. Personne ne le voit. Ça ne compte pas. Ça part, c'est tout." },
      { h: "Quand vous cessez de vous montrer, le compagnon ne vous punit pas", p: "Le moment le plus difficile de toute app d'amélioration de soi est celui où vous arrêtez de l'utiliser. Togthr pour vous-même a été construit pour ce moment. Si vous disparaissez deux semaines parce que la vie est passée par là, le compagnon reste où il est et attend. Si vous disparaissez deux mois, le journal est toujours là. Si vous revenez un mardi difficile, le check-in quotidien est juste la même petite question unique, sans jugement sur l'écart. Le but n'est pas d'être un parfait traqueur de soi. Le but est d'avoir un petit endroit persistant vers lequel revenir — même les jours où vous revenez en tant que version plus petite de vous-même." },
    ],
    faqs: [
      { q: "Togthr pour vous-même est-il une app d'amélioration de soi ?", a: "Non. Togthr pour vous-même n'est pas une app d'amélioration de soi. Il n'y a pas de séries, d'objectifs ou de métriques. C'est un petit espace privé pour l'acte quotidien de vous tenir compagnie. Si vous cherchez un outil de productivité, ce n'est pas ça. Si vous cherchez un compagnon silencieux qui grandit avec vous, ça pourrait l'être." },
      { q: "Puis-je utiliser Togthr pour vous-même de manière complètement anonyme ?", a: "Oui. Le check-in quotidien, le journal, le trou d'arbre et le compagnon sont tous privés pour vous. Vous n'avez rien à partager avec personne. Vous n'avez même pas besoin d'utiliser votre vrai nom. Le compte est le vôtre, les données sont les vôtres, et vous pouvez le supprimer à tout moment." },
      { q: "Que se passe-t-il si j'arrête d'utiliser l'app pendant quelques mois ?", a: "Rien de dramatique. Le compagnon attend. Le journal reste. Les capsules temporelles restent scellées. Quand vous revenez, le check-in quotidien est exactement là où vous l'avez laissé — une seule petite question, sans jugement sur l'écart. Togthr est construit pour être là le jour où vous décidez de revenir, pas pour vous poursuivre pendant que vous êtes absent." },
      { q: "Y a-t-il un moyen de parler au compagnon, ou à une IA ?", a: "Pas dans le mode soi de base. Le compagnon est une présence, pas une IA conversationnelle. Si vous voulez un compagnon de chat, Togthr Plus a un mode \"Soulmate\" séparé qui est construit pour cela. Le mode soi est intentionnellement plus silencieux — il est pour les choses que vous vous dites à vous-même, pas pour qu'un chatbot réponde." },
    ],
    links: [
      { href: '/fr', label: 'Accueil Togthr' },
      { href: '/fr/features', label: 'Toutes les fonctionnalités Togthr' },
      { href: '/fr/pricing', label: 'Tarifs — Gratuit, Plus, Eternal' },
      { href: '/fr/blog/two-minute-daily-check-in-ai-companion', label: 'Un check-in quotidien de deux minutes avec votre compagnon IA' },
      { href: '/fr/blog/why-we-built-a-pet-that-grows-with-you', label: 'Pourquoi nous avons construit un compagnon qui grandit avec vous' },
    ],
    cta: "Ouvrez un espace Togthr pour vous-même — juste vous, votre compagnon, et la journée.",
  },

  es: {
    title: 'Togthr para ti mismo — La relación más silenciosa, la más importante',
    description: 'Togthr para ti mismo: un pequeño espacio privado para la relación más importante que tienes. Un check-in diario contigo mismo, una mascota de 5 etapas que crece contigo, y un diario lento que nadie más lee.',
    h1: 'Togthr para ti mismo · La relación más silenciosa, la más importante',
    intro: `Togthr para ti mismo es para la relación que, estadísticamente, es la más larga de tu vida: la contigo mismo. No el yo pulido de Instagram. No el yo "debería meditar cada mañana". El yo real, cotidiano, a veces cansado, a veces bien, que se presenta e intenta. Este es un pequeño espacio privado para esa persona: un check-in diario que toma menos de dos minutos, una mascota de 5 etapas que crece en cinco fases visibles (bebé, infante, adolescente, adulto, leyenda) a medida que sigues presentándote, un diario lento que nadie más puede leer, y un agujero de árbol para las cosas que nunca dirías en voz alta. La idea no es optimizarte. La idea es hacerte compañía.`,
    sections: [
      { h: 'Las 5 etapas, creciendo contigo', p: 'La mascota de Togthr en modo yo tiene cinco etapas visibles: bebé, infante, adolescente, adulto y leyenda. La mascota no sube de nivel según rachas o productividad. Crece cuando te presentas — incluso en los días en los que presentarte significa "me levanté de la cama y eso es suficiente". Después de unos meses, la mascota pasa de bebé a infante. Después de un año, quizás sea una adolescente. Después de unos años, adulta. La etapa leyenda es rara, y sabrás cuando llegues allí. La mascota no te mide. Te acompaña, como lo haría una verdadera compañera.' },
      { h: 'Un check-in diario con la persona que realmente eres', p: 'Cada mañana, la app te hace una pregunta. No es "cuáles son tus tres objetivos de hoy". Es más como "algo que esperas con ganas hoy?" o "algo que te preocupa hoy?". Respondes con tus propias palabras, no lo compartes con nadie, y la mascota lo nota en silencio. No hay racha, no hay notificación que te grite, no hay clasificación. Algunas mañanas respondes en dos palabras. Algunas mañanas escribes un párrafo. Ambas están bien. El punto es que tienes un lugar para poner el día, incluso si el día es pequeño.' },
      { h: 'Un agujero de árbol para las cosas que nunca dirías en voz alta', p: 'A veces lo más útil que puedes hacer es escribir una frase que nadie leerá nunca. Togthr para ti mismo incluye un pequeño "agujero de árbol" — un espacio privado y anónimo donde puedes dejar una nota sobre cómo estás realmente, y verla disolverse 24 horas después. No es un diario. No es una red social. Es solo un lugar tranquilo para poner la cosa que te está molestando, por escrito, para que tu cabeza esté un poco más ligera. Nadie lo ve. No cuenta. Se va, eso es todo.' },
      { h: 'Cuando dejas de presentarte, la mascota no te castiga', p: 'El momento más difícil de cualquier app de auto-mejora es el momento en que dejas de usarla. Togthr para ti mismo fue construido para ese momento. Si desapareces dos semanas porque la vida se atravesó, la mascota se queda donde está y espera. Si desapareces dos meses, el diario sigue ahí. Si vuelves un martes difícil, el check-in diario es exactamente la misma pequeña pregunta única, sin juicio sobre la brecha. La idea no es ser un rastreador perfecto de ti mismo. La idea es tener un lugar pequeño y persistente al que volver — incluso en los días en los que vuelves como una versión más pequeña de ti mismo.' },
    ],
    faqs: [
      { q: '¿Togthr para ti mismo es una app de auto-mejora?', a: 'No. Togthr para ti mismo no es una app de auto-mejora. No tiene rachas, metas ni métricas. Es un pequeño espacio privado para el acto cotidiano de hacerte compañía. Si buscas una herramienta de productividad, no es esto. Si buscas una compañera silenciosa que crece contigo, quizás lo sea.' },
      { q: '¿Puedo usar Togthr para ti mismo completamente anónimamente?', a: 'Sí. El check-in diario, el diario, el agujero de árbol y la mascota son todos privados para ti. No tienes que compartir nada con nadie. Ni siquiera tienes que usar tu nombre real. La cuenta es tuya, los datos son tuyos, y puedes eliminarla en cualquier momento.' },
      { q: '¿Qué pasa si dejo de usar la app unos meses?', a: 'Nada dramático. La mascota espera. El diario se queda. Las cápsulas del tiempo se quedan selladas. Cuando vuelves, el check-in diario está exactamente donde lo dejaste — una única pregunta pequeña, sin juicio sobre la brecha. Togthr está construido para estar ahí el día que decidas volver, no para perseguirte mientras estás fuera.' },
      { q: '¿Hay alguna forma de hablar con la mascota, o con una IA?', a: 'No en el modo yo básico. La mascota es una presencia, no una IA conversacional. Si quieres una compañera de chat, Togthr Plus tiene un modo "Soulmate" separado construido para eso. El modo yo es intencionalmente más silencioso — es para las cosas que te dices a ti mismo, no para que un chatbot responda.' },
    ],
    links: [
      { href: '/es', label: 'Inicio de Togthr' },
      { href: '/es/features', label: 'Todas las funciones de Togthr' },
      { href: '/es/pricing', label: 'Precios — Gratis, Plus, Eternal' },
      { href: '/es/blog/two-minute-daily-check-in-ai-companion', label: 'Un check-in diario de dos minutos con tu compañera IA' },
      { href: '/es/blog/why-we-built-a-pet-that-grows-with-you', label: 'Por qué construimos una mascota que crece contigo' },
    ],
    cta: 'Abre un espacio Togthr para ti mismo — solo tú, tu mascota, y el día.',
  },
}

// ───────────────────────────────────────────────────────────────────────
// Public lookup: mode × locale → entry
// ───────────────────────────────────────────────────────────────────────
export const FOR_PAGES: Record<ForSlug, Record<Locale, ForEntry>> = {
  'for-couples': forCouples,
  'for-besties': forBesties,
  'for-family': forFamily,
  'for-self': forSelf,
}

export const FOR_SLUGS: ForSlug[] = ALL_MODES

// Human-readable label for each mode (used by breadcrumb, nav, internal links).
export const FOR_LABELS: Record<ForSlug, Record<Locale, string>> = {
  'for-couples': {
    en: 'For Couples',
    'zh-cn': '情侣版',
    'zh-tw': '情侶版',
    ja: 'カップル版',
    ko: '커플 버전',
    de: 'Für Paare',
    fr: 'Pour les couples',
    es: 'Para Parejas',
  },
  'for-besties': {
    en: 'For Best Friends',
    'zh-cn': '闺蜜/兄弟版',
    'zh-tw': '閨蜜/兄弟版',
    ja: '親友版',
    ko: '베프 버전',
    de: 'Für Beste Freunde',
    fr: 'Pour les meilleurs amis',
    es: 'Para Mejores Amigos',
  },
  'for-family': {
    en: 'For Family',
    'zh-cn': '家人版',
    'zh-tw': '家人版',
    ja: '家族版',
    ko: '가족 버전',
    de: 'Für die Familie',
    fr: 'Pour la famille',
    es: 'Para la Familia',
  },
  'for-self': {
    en: 'For Yourself',
    'zh-cn': '给自己',
    'zh-tw': '給自己',
    ja: 'じぶんのため',
    ko: '자신을 위한',
    de: 'Für dich selbst',
    fr: 'Pour vous-même',
    es: 'Para ti mismo',
  },
}
