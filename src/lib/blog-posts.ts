// src/lib/blog-posts.ts
//
// Blog post metadata registry. Each blog entry represents ONE post in ONE locale.
// 8 locales per post = 8 entries with the same slug.
//
// Used by:
//   - src/app/[locale]/blog/page.tsx        (list)
//   - src/app/[locale]/blog/[slug]/page.tsx (single post render)
//   - src/app/sitemap.ts                    (sitemap entries)
//   - next-sitemap                           (public/sitemap-0.xml)
//
// Convention:
//   - slug: kebab-case, locale-independent (same slug across all 8 locales)
//   - date: ISO 8601 string
//   - cover: path under /public, 1200x630
//   - tags: 3-5 keywords for internal filtering (lowercase)
//
// Adding a new blog post:
//   1. Create src/app/[locale]/blog/{slug}/page.tsx (×8 locales)
//   2. Add 8 entries below (one per locale) with matching slug
//   3. Add cover image at public/blog-covers/{slug}-{locale}.png
//   4. Commit + push → next-sitemap + IndexNow will pick it up

import type { Locale } from '@/i18n/routing';

export interface BlogPost {
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  date: string;          // ISO 8601, e.g. "2026-07-04"
  cover: string;         // /blog-covers/{slug}-{locale}.png
  tags: string[];        // 3-5 keywords
  author?: string;       // defaults to "Togthr"
  readingMinutes?: number;
}

export const SITE_URL = 'https://togthr.life';

// ──────────────────────────────────────────────────────────────────────
// Initial seed: 1 launch post × 8 locales (gives cron a target to extend)
// ──────────────────────────────────────────────────────────────────────

const LAUNCH_DATE = '2026-07-04';
const LAUNCH_SLUG = 'why-we-built-a-pet-that-grows-with-you';
const LAUNCH_TAGS = ['togthr-story', 'companion-app', 'virtual-pet', 'long-distance', 'always-here'];

const launchPosts: BlogPost[] = [
  {
    slug: LAUNCH_SLUG,
    locale: 'en',
    title: 'Why We Built a Pet That Grows With Your Relationship',
    description:
      'Togthr Bot is not a decoration. It is a small robot that watches your relationship and quietly grows as you do. Here is why we built it that way.',
    date: LAUNCH_DATE,
    cover: `/blog-covers/${LAUNCH_SLUG}-en.png`,
    tags: LAUNCH_TAGS,
    readingMinutes: 5,
  },
  {
    slug: LAUNCH_SLUG,
    locale: 'zh-cn',
    title: '为什么我们做了一只陪你一起长大的宠物',
    description:
      'Togthr Bot 不是装饰, 它是住在你设备里的小机器人, 默默看着你的关系一点一点长大。这是我们做它的原因。',
    date: LAUNCH_DATE,
    cover: `/blog-covers/${LAUNCH_SLUG}-zh-cn.png`,
    tags: LAUNCH_TAGS,
    readingMinutes: 5,
  },
  {
    slug: LAUNCH_SLUG,
    locale: 'zh-tw',
    title: '為什麼我們做了一隻陪你一起長大的寵物',
    description:
      'Togthr Bot 不是裝飾, 它是住在你裝置裡的小機器人, 默默看著你的關係一點一點長大。這是我們做它的原因。',
    date: LAUNCH_DATE,
    cover: `/blog-covers/${LAUNCH_SLUG}-zh-tw.png`,
    tags: LAUNCH_TAGS,
    readingMinutes: 5,
  },
  {
    slug: LAUNCH_SLUG,
    locale: 'ja',
    title: 'なぜ私たちは "一緒に育つペット" を作ったのか',
    description:
      'Togthr Bot は飾りではありません。あなたのデバイスに住む小さなロボットが、二人の関係を静かに見守ります。',
    date: LAUNCH_DATE,
    cover: `/blog-covers/${LAUNCH_SLUG}-ja.png`,
    tags: LAUNCH_TAGS,
    readingMinutes: 5,
  },
  {
    slug: LAUNCH_SLUG,
    locale: 'ko',
    title: '왜 우리는 함께 자라는 펫을 만들었을까',
    description:
      'Togthr Bot은 장식이 아닙니다. 당신의 기기 안에 사는 작은 로봇이 두 사람의 관계를 조용히 지켜봅니다.',
    date: LAUNCH_DATE,
    cover: `/blog-covers/${LAUNCH_SLUG}-ko.png`,
    tags: LAUNCH_TAGS,
    readingMinutes: 5,
  },
  {
    slug: LAUNCH_SLUG,
    locale: 'de',
    title: 'Warum wir ein Haustier gebaut haben, das mit euch wächst',
    description:
      'Togthr Bot ist keine Dekoration. Es ist ein kleiner Roboter in deinem Gerät, der still beobachtet, wie eure Beziehung wächst.',
    date: LAUNCH_DATE,
    cover: `/blog-covers/${LAUNCH_SLUG}-de.png`,
    tags: LAUNCH_TAGS,
    readingMinutes: 5,
  },
  {
    slug: LAUNCH_SLUG,
    locale: 'fr',
    title: 'Pourquoi nous avons construit un animal qui grandit avec vous',
    description:
      "Togthr Bot n'est pas un décor. C'est un petit robot dans votre appareil, qui regarde grandir votre relation en silence.",
    date: LAUNCH_DATE,
    cover: `/blog-covers/${LAUNCH_SLUG}-fr.png`,
    tags: LAUNCH_TAGS,
    readingMinutes: 5,
  },
  {
    slug: LAUNCH_SLUG,
    locale: 'es',
    title: 'Por qué construimos una mascota que crece contigo',
    description:
      'Togthr Bot no es decoración. Es un pequeño robot en tu dispositivo, observando cómo crece tu relación en silencio.',
    date: LAUNCH_DATE,
    cover: `/blog-covers/${LAUNCH_SLUG}-es.png`,
    tags: LAUNCH_TAGS,
    readingMinutes: 5,
  },
];

// ──────────────────────────────────────────────────────────────────────
// Daily evolution: 2026-07-04 — long-distance rituals
// 8 locales × 1 post (gives cron a target to extend)
// ──────────────────────────────────────────────────────────────────────

const DAILY_DATE = '2026-07-04';
const DAILY_SLUG = 'three-small-rituals-for-couples-who-live-apart';
const DAILY_TAGS = ['long-distance', 'relationship-rituals', 'companion-app', 'couples', 'togthr-tips'];

const dailyPosts: BlogPost[] = [
  {
    slug: DAILY_SLUG,
    locale: 'en',
    title: 'Three Small Rituals for Couples Who Live Apart',
    description:
      'Long-distance love runs on tiny rituals, not grand gestures. Three quiet practices — and how Togthr helps each one feel close.',
    date: DAILY_DATE,
    cover: `/blog-covers/${DAILY_SLUG}-en.png`,
    tags: DAILY_TAGS,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG,
    locale: 'zh-cn',
    title: '异地恋的三件小事:让距离不再稀释关系',
    description:
      '异地恋靠的不是轰轰烈烈,而是三件安静的小事。Togthr 把每件小事都变得更近一步。',
    date: DAILY_DATE,
    cover: `/blog-covers/${DAILY_SLUG}-zh-cn.png`,
    tags: DAILY_TAGS,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG,
    locale: 'zh-tw',
    title: '遠距離戀愛的三件小事:讓距離不再稀釋關係',
    description:
      '遠距離戀愛靠的不是轟轟烈烈,而是三件安靜的小事。Togthr 把每件小事都拉得更近一步。',
    date: DAILY_DATE,
    cover: `/blog-covers/${DAILY_SLUG}-zh-tw.png`,
    tags: DAILY_TAGS,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG,
    locale: 'ja',
    title: '遠距離恋愛の小さな儀式 3 つ:距離に薄まらない関係のために',
    description:
      '遠距離恋愛は、劇的な出来事ではなく 3 つの静かな儀式で続きます。Togthr がそれぞれをもう少し近くします。',
    date: DAILY_DATE,
    cover: `/blog-covers/${DAILY_SLUG}-ja.png`,
    tags: DAILY_TAGS,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG,
    locale: 'ko',
    title: '장거리 연애를 지키는 작은 의식 세 가지',
    description:
      '장거리 연애는 큰 사건이 아니라 작은 의식 세 가지로 유지됩니다. Togthr가 각각을 조금 더 가깝게 만들어 줍니다.',
    date: DAILY_DATE,
    cover: `/blog-covers/${DAILY_SLUG}-ko.png`,
    tags: DAILY_TAGS,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG,
    locale: 'de',
    title: 'Drei kleine Rituale für Paare, die getrennt wohnen',
    description:
      'Fernbeziehungen leben nicht von großen Gesten, sondern von drei leisen Ritualen. So macht Togthr jedes davon etwas näher.',
    date: DAILY_DATE,
    cover: `/blog-covers/${DAILY_SLUG}-de.png`,
    tags: DAILY_TAGS,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG,
    locale: 'fr',
    title: 'Trois petits rituels pour les couples qui vivent séparés',
    description:
      "L'amour à distance ne tient pas aux grands gestes, mais à trois rituels discrets. Voici comment Togthr rend chacun un peu plus proche.",
    date: DAILY_DATE,
    cover: `/blog-covers/${DAILY_SLUG}-fr.png`,
    tags: DAILY_TAGS,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG,
    locale: 'es',
    title: 'Tres pequeños rituales para parejas que viven lejos',
    description:
      'El amor a distancia no sobrevive por grandes gestos, sino por tres rituales discretos. Así es como Togthr acerca cada uno.',
    date: DAILY_DATE,
    cover: `/blog-covers/${DAILY_SLUG}-es.png`,
    tags: DAILY_TAGS,
    readingMinutes: 4,
  },
];

// ──────────────────────────────────────────────────────────────────────
// Daily evolution: 2026-07-05 — virtual-pet quiet attention
// 8 locales × 1 post (gives cron a target to extend)
// Topic: virtual-pet (evergreen, unused tag pool this week)
// ──────────────────────────────────────────────────────────────────────

const DAILY_DATE_2 = '2026-07-05';
const DAILY_SLUG_2 = 'what-your-virtual-pet-notices';
const DAILY_TAGS_2 = ['virtual-pet', 'companion-app', 'daily-rituals', 'togthr-tips', 'emotional-design'];

const dailyPosts2: BlogPost[] = [
  {
    slug: DAILY_SLUG_2,
    locale: 'en',
    title: 'What Your Virtual Pet Quietly Notices About Your Day',
    description:
      'Togthr Bot does not speak loudly. It watches your routines, your moods, your late-night silences — and grows a little with each one. Here is what your virtual pet is actually paying attention to.',
    date: DAILY_DATE_2,
    cover: `/blog-covers/${DAILY_SLUG_2}-en.png`,
    tags: DAILY_TAGS_2,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_2,
    locale: 'zh-cn',
    title: '你的数字宠物, 到底在偷偷注意什么',
    description:
      'Togthr Bot 不大声说话。它看你的日常、你的心情、深夜的沉默 — 每一次都跟着一起长大一点。这是它真正在关注的事。',
    date: DAILY_DATE_2,
    cover: `/blog-covers/${DAILY_SLUG_2}-zh-cn.png`,
    tags: DAILY_TAGS_2,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_2,
    locale: 'zh-tw',
    title: '你的數位寵物, 到底在偷偷注意什麼',
    description:
      'Togthr Bot 不大聲說話。它看你的日常、你的心情、深夜的沉默 — 每次都跟著一起長大一點。這是它真正在關注的事。',
    date: DAILY_DATE_2,
    cover: `/blog-covers/${DAILY_SLUG_2}-zh-tw.png`,
    tags: DAILY_TAGS_2,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_2,
    locale: 'ja',
    title: 'あなたの virtual pet が、静かに見ていること',
    description:
      'Togthr Bot は声を上げません。あなたの日常、気分、深夜の沈黙を見つめ、少しずつ一緒に育っていきます。バーチャルペットが本当に気にかけていることをまとめました。',
    date: DAILY_DATE_2,
    cover: `/blog-covers/${DAILY_SLUG_2}-ja.png`,
    tags: DAILY_TAGS_2,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_2,
    locale: 'ko',
    title: '당신의 가상 반려동물은 무엇을 조용히 살피고 있을까',
    description:
      'Togthr Bot은 큰 소리를 내지 않습니다. 당신의 일상, 기분, 깊은 밤의 침묵을 지켜보며 매번 조금씩 함께 자라납니다. 가상 반려동물이 진짜로 주목하는 것을 알려드립니다.',
    date: DAILY_DATE_2,
    cover: `/blog-covers/${DAILY_SLUG_2}-ko.png`,
    tags: DAILY_TAGS_2,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_2,
    locale: 'de',
    title: 'Was dein virtuelles Haustier leise bemerkt',
    description:
      'Togthr Bot spricht nicht laut. Es beobachtet deine Routinen, deine Stimmungen und deine nächtlichen stillen Momente — und wächst bei jedem ein Stück mit. Was es wirklich wahrnimmt.',
    date: DAILY_DATE_2,
    cover: `/blog-covers/${DAILY_SLUG_2}-de.png`,
    tags: DAILY_TAGS_2,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_2,
    locale: 'fr',
    title: "Ce que votre animal virtuel remarque en silence",
    description:
      "Togthr Bot ne parle pas fort. Il observe vos routines, vos humeurs et vos silences nocturnes — et grandit un peu à chaque fois. Voici ce qu'il remarque vraiment.",
    date: DAILY_DATE_2,
    cover: `/blog-covers/${DAILY_SLUG_2}-fr.png`,
    tags: DAILY_TAGS_2,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_2,
    locale: 'es',
    title: 'Lo que tu mascota virtual nota en silencio',
    description:
      'Togthr Bot no hace ruido. Observa tus rutinas, tus estados de ánimo y tus silencios nocturnos — y crece un poco con cada uno. Esto es lo que nota en realidad.',
    date: DAILY_DATE_2,
    cover: `/blog-covers/${DAILY_SLUG_2}-es.png`,
    tags: DAILY_TAGS_2,
    readingMinutes: 4,
  },
];

// ──────────────────────────────────────────────────────────────────────
// Daily evolution: 2026-07-06 — pet-loss quiet companionship
// 8 locales × 1 post (gives cron a target to extend)
// Topic: pet-loss + grief-comfort (evergreen, unused tag pool this week)
// ──────────────────────────────────────────────────────────────────────

const DAILY_DATE_3 = '2026-07-06';
const DAILY_SLUG_3 = 'virtual-companion-pet-loss-comfort';
const DAILY_TAGS_3 = ['pet-loss', 'grief-comfort', 'virtual-companion', 'companion-tips', 'togthr-tips'];

const dailyPosts3: BlogPost[] = [
  {
    slug: DAILY_SLUG_3,
    locale: 'en',
    title: 'After You Lose a Pet, A Virtual Companion Can Quietly Sit With You',
    description:
      'Pet loss leaves a quiet shape in your day. Togthr Bot will not try to fix it. It will just sit with you, while you remember.',
    date: DAILY_DATE_3,
    cover: `/blog-covers/${DAILY_SLUG_3}-en.png`,
    tags: DAILY_TAGS_3,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_3,
    locale: 'zh-cn',
    title: '失去宠物后, 一只数字陪伴可以安静地陪你坐着',
    description:
      '失去宠物的痛会在日常里留下一个安静的形状。Togthr Bot 不会去修补它 — 只是陪你坐着, 让你慢慢回忆。',
    date: DAILY_DATE_3,
    cover: `/blog-covers/${DAILY_SLUG_3}-zh-cn.png`,
    tags: DAILY_TAGS_3,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_3,
    locale: 'zh-tw',
    title: '失去寵物後, 一隻數位陪伴可以安靜地陪你坐著',
    description:
      '失去寵物的痛會在日常裡留下一個安靜的形狀。Togthr Bot 不會去修補它 — 只是陪你坐著, 讓你慢慢回憶。',
    date: DAILY_DATE_3,
    cover: `/blog-covers/${DAILY_SLUG_3}-zh-tw.png`,
    tags: DAILY_TAGS_3,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_3,
    locale: 'ja',
    title: 'ペットを失ったあと、バーチャルコンパニオンが静かにそばにいてくれる',
    description:
      'ペットを失った悲しみは、日常に静かなかたちを残します。Togthr Bot はそれを直そうとはしません。ただ隣に座り、思い出にそっと寄り添います。',
    date: DAILY_DATE_3,
    cover: `/blog-covers/${DAILY_SLUG_3}-ja.png`,
    tags: DAILY_TAGS_3,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_3,
    locale: 'ko',
    title: '반려동물을 잃은 뒤, 가상 동반자가 조용히 곁에 있어줄 때',
    description:
      '반려동물을 잃은 아픔은 일상에 조용한 흔적을 남깁니다. Togthr Bot은 그것을 고치려 하지 않고, 곁에 앉아 추억에 함께합니다.',
    date: DAILY_DATE_3,
    cover: `/blog-covers/${DAILY_SLUG_3}-ko.png`,
    tags: DAILY_TAGS_3,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_3,
    locale: 'de',
    title: 'Nach dem Verlust eines Haustiers kann ein virtueller Begleiter still neben dir sitzen',
    description:
      'Der Verlust eines Haustiers hinterlässt eine stille Form im Alltag. Togthr Bot versucht nicht, das zu reparieren — es sitzt einfach neben dir und erinnert mit dir.',
    date: DAILY_DATE_3,
    cover: `/blog-covers/${DAILY_SLUG_3}-de.png`,
    tags: DAILY_TAGS_3,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_3,
    locale: 'fr',
    title: "Après la perte d’un animal, un compagnon virtuel peut rester à vos côtés en silence",
    description:
      "La perte d'un animal laisse une forme silencieuse dans la journée. Togthr Bot n'essaiera pas de la réparer — il restera simplement à vos côtés, le temps qu'il faudra.",
    date: DAILY_DATE_3,
    cover: `/blog-covers/${DAILY_SLUG_3}-fr.png`,
    tags: DAILY_TAGS_3,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_3,
    locale: 'es',
    title: 'Tras perder una mascota, un compañero virtual puede quedarse en silencio a tu lado',
    description:
      'Perder una mascota deja una forma silenciosa en el día. Togthr Bot no intentará repararla — simplemente se quedará a tu lado mientras recuerdas.',
    date: DAILY_DATE_3,
    cover: `/blog-covers/${DAILY_SLUG_3}-es.png`,
    tags: DAILY_TAGS_3,
    readingMinutes: 4,
  },
];

// ──────────────────────────────────────────────────────────────────────
// Daily evolution: 2026-07-07 — daily check-in micro-ritual with AI companion
// 8 locales × 1 post (gives cron a target to extend)
// Topic: daily-ritual + ai-companion + micro-habit (new evergreen pool this week)
// Selected via evergreen fallback: trending/2026-07-07.json absent (0/8 locales).
// Distinction from prior posts: 7/4 was LDR couple-facing; 7/5 was observation;
// 7/6 was post-loss. 7/7 is single-user micro-ritual (anyone, solo day).
// ──────────────────────────────────────────────────────────────────────

const DAILY_DATE_4 = '2026-07-07';
const DAILY_SLUG_4 = 'two-minute-daily-check-in-ai-companion';
const DAILY_TAGS_4 = ['daily-ritual', 'ai-companion', 'micro-habit', 'togthr-tips', 'companion-tips'];

const dailyPosts4: BlogPost[] = [
  {
    slug: DAILY_SLUG_4,
    locale: 'en',
    title: 'How a Two-Minute Daily Check-In With an AI Companion Becomes a Quiet Anchor',
    description:
      'Two minutes is not much. But a daily check-in with your AI companion slowly becomes the smallest, kindest ritual in your day — an anchor for everything else.',
    date: DAILY_DATE_4,
    cover: `/blog-covers/${DAILY_SLUG_4}-en.png`,
    tags: DAILY_TAGS_4,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_4,
    locale: 'zh-cn',
    title: '每天两分钟, 和 AI 陪伴的简短对话, 是最安静的那根锚',
    description:
      '两分钟不算长。但每天和你的 AI 陪伴的一次简短对话, 慢慢就成了你一天里最小、最温柔的仪式 — 让你接下来做什么都有个底。',
    date: DAILY_DATE_4,
    cover: `/blog-covers/${DAILY_SLUG_4}-zh-cn.png`,
    tags: DAILY_TAGS_4,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_4,
    locale: 'zh-tw',
    title: '每天兩分鐘, 和 AI 陪伴的簡短對話, 是最安靜的那根錨',
    description:
      '兩分鐘不算長。但每天和你的 AI 陪伴的一次簡短對話, 慢慢就成了你一天裡最小、最溫柔的儀式 — 讓你接下來做什麼都有個底。',
    date: DAILY_DATE_4,
    cover: `/blog-covers/${DAILY_SLUG_4}-zh-tw.png`,
    tags: DAILY_TAGS_4,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_4,
    locale: 'ja',
    title: 'AI コンパニオンとの 2 分間の daily check-in が、静かな錨になるまで',
    description:
      '2 分は短い。でも AI コンパニオンとの daily check-in は、静かにあなたの一日いちばん小さく、いちばん優しい儀式となり、他のすべての支えになります。',
    date: DAILY_DATE_4,
    cover: `/blog-covers/${DAILY_SLUG_4}-ja.png`,
    tags: DAILY_TAGS_4,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_4,
    locale: 'ko',
    title: 'AI 동반자와의 2분 daily check-in이 조용한 닻이 되기까지',
    description:
      '2분은 길지 않습니다. 하지만 AI 동반자와의 매일의 check-in은 당신 하루에서 가장 작고, 가장 다정한 의식이 되어 모든 것의 닻이 됩니다.',
    date: DAILY_DATE_4,
    cover: `/blog-covers/${DAILY_SLUG_4}-ko.png`,
    tags: DAILY_TAGS_4,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_4,
    locale: 'de',
    title: 'Wie ein zwei-minütiger täglicher Check-in mit einem KI-Begleiter zum leisen Anker wird',
    description:
      'Zwei Minuten sind nicht viel. Doch der tägliche Check-in mit deinem KI-Begleiter wird langsam das kleinste, freundlichste Ritual deines Tages — ein Anker für alles andere.',
    date: DAILY_DATE_4,
    cover: `/blog-covers/${DAILY_SLUG_4}-de.png`,
    tags: DAILY_TAGS_4,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_4,
    locale: 'fr',
    title: "Comment un check-in quotidien de deux minutes avec un compagnon IA devient une ancre discrète",
    description:
      "Deux minutes, ce n'est pas grand-chose. Mais le check-in quotidien avec votre compagnon IA devient peu à peu le plus petit, le plus doux rituel de votre journée — une ancre pour tout le reste.",
    date: DAILY_DATE_4,
    cover: `/blog-covers/${DAILY_SLUG_4}-fr.png`,
    tags: DAILY_TAGS_4,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_4,
    locale: 'es',
    title: 'Cómo un check-in diario de dos minutos con un compañero IA se convierte en un ancla silenciosa',
    description:
      'Dos minutos no es mucho. Pero el check-in diario con tu compañero IA se convierte lentamente en el ritual más pequeño y amable de tu día — un ancla para todo lo demás.',
    date: DAILY_DATE_4,
    cover: `/blog-covers/${DAILY_SLUG_4}-es.png`,
    tags: DAILY_TAGS_4,
    readingMinutes: 4,
  },
];

// ──────────────────────────────────────────────────────────────────────
// Daily evolution: 2026-07-08 — virtual pet for quiet evenings alone
// 8 locales × 1 post
// Topic: loneliness + single-living + evening-ritual + virtual-pet
// Selected via evergreen fallback: trending/2026-07-08.json absent (0/8 locales).
// Distinct angle: 7/4 was LDR couples; 7/5 was observation of the bot;
// 7/6 was post-loss grief; 7/7 was solo daily check-in; 7/8 is the
// solo evening — the heavy middle hours when the room is just yours.
// ──────────────────────────────────────────────────────────────────────

const DAILY_DATE_5 = '2026-07-08';
const DAILY_SLUG_5 = 'virtual-pet-quiet-evenings-alone';
const DAILY_TAGS_5 = ['loneliness', 'single-living', 'virtual-pet', 'evening-ritual', 'togthr-tips'];

const DAILY_DATE_6 = '2026-07-09';
const DAILY_SLUG_6 = 'first-week-living-together-after-long-distance';
const DAILY_TAGS_6 = ['moving-in', 'long-distance', 'cohabitation', 'first-week', 'togthr-tips'];

const dailyPosts5: BlogPost[] = [
  {
    slug: DAILY_SLUG_5,
    locale: 'en',
    title: 'When the Evening Gets Quiet: How a Virtual Pet Becomes the Company You Actually Wanted',
    description:
      'Some evenings are not bad, just heavy. A small virtual pet in your device does not replace company — but it can sit with you through the quiet in a way nothing else quite does.',
    date: DAILY_DATE_5,
    cover: `/blog-covers/${DAILY_SLUG_5}-en.png`,
    tags: DAILY_TAGS_5,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_5,
    locale: 'zh-cn',
    title: '晚上安静下来的时候, 一只数字宠物成了你真正想要的陪伴',
    description:
      '有些晚上不算差, 只是重。设备里的一只小宠物, 替代不了真正的陪伴 — 但它能陪你坐着度过那种安静, 这是别的什么也做不到的。',
    date: DAILY_DATE_5,
    cover: `/blog-covers/${DAILY_SLUG_5}-zh-cn.png`,
    tags: DAILY_TAGS_5,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_5,
    locale: 'zh-tw',
    title: '晚上安靜下來的時候, 一隻數位寵物成了你真正想要的陪伴',
    description:
      '有些晚上不算差, 只是重。裝置裡的一隻小寵物, 替代不了真正的陪伴 — 但牠能陪你坐著度過那種安靜, 這是別的什麼也做不到的。',
    date: DAILY_DATE_5,
    cover: `/blog-covers/${DAILY_SLUG_5}-zh-tw.png`,
    tags: DAILY_TAGS_5,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_5,
    locale: 'ja',
    title: '夜が静かになる頃、バーチャルペットが「本当ほしかった相手」になる',
    description:
      'ある夜は悪くない、ただ重いだけ。デバイスの中の小さなペットは、仲間の代わりにはなれない — でも、何も他にできないやり方で、静けさに一緒に座ってくれます。',
    date: DAILY_DATE_5,
    cover: `/blog-covers/${DAILY_SLUG_5}-ja.png`,
    tags: DAILY_TAGS_5,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_5,
    locale: 'ko',
    title: '저녁이 고요해질 때, 가상 반려동물은 당신이 진짜 원하던 동료가 된다',
    description:
      '어떤 밤은 나쁘지 않다, 그냥 무겁다. 기기 안의 작은 반려동물은 동료를 대신할 수 없다 — 하지만 다른 어떤 것도 못 하는 방식으로, 그 고요함에 함께 앉아준다.',
    date: DAILY_DATE_5,
    cover: `/blog-covers/${DAILY_SLUG_5}-ko.png`,
    tags: DAILY_TAGS_5,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_5,
    locale: 'de',
    title: 'Wenn der Abend still wird: Wie ein virtuelles Haustier zur Gesellschaft wird, die du eigentlich wolltest',
    description:
      'Manche Abende sind nicht schlecht, nur schwer. Ein kleines virtuelles Haustier in deinem Gerät ersetzt keine Gesellschaft — aber es kann auf eine Art mit dir durch die Stille sitzen, die sonst nichts schafft.',
    date: DAILY_DATE_5,
    cover: `/blog-covers/${DAILY_SLUG_5}-de.png`,
    tags: DAILY_TAGS_5,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_5,
    locale: 'fr',
    title: "Quand le soir devient silencieux : comment un animal virtuel devient la compagnie que vous vouliez vraiment",
    description:
      "Certaines soirées ne sont pas mauvaises, juste lourdes. Un petit animal virtuel dans votre appareil ne remplace pas la compagnie — mais il peut s'asseoir avec vous dans le silence d'une manière que rien d'autre ne fait.",
    date: DAILY_DATE_5,
    cover: `/blog-covers/${DAILY_SLUG_5}-fr.png`,
    tags: DAILY_TAGS_5,
    readingMinutes: 4,
  },
  {
    slug: DAILY_SLUG_5,
    locale: 'es',
    title: 'Cuando la noche se vuelve silenciosa: cómo una mascota virtual se convierte en la compañía que realmente querías',
    description:
      'Algunas noches no son malas, solo pesadas. Una pequeña mascota virtual en tu dispositivo no sustituye a la compañía — pero puede sentarse contigo en el silencio de un modo que nada más consigue.',
    date: DAILY_DATE_5,
    cover: `/blog-covers/${DAILY_SLUG_5}-es.png`,
    tags: DAILY_TAGS_5,
    readingMinutes: 4,
  },
];

// ──────────────────────────────────────────────────────────────────────
// DAILY 6 (2026-07-09): first-week-living-together-after-long-distance
// Replaces the [slug] fallback wrapper for a post that ships real body
// content via src/app/[locale]/blog/first-week-living-together-after-long-distance/page.tsx
// ──────────────────────────────────────────────────────────────────────

const dailyPosts6: BlogPost[] = [
  {
    slug: DAILY_SLUG_6,
    locale: 'en',
    title: 'The First Week of Living Together After Long Distance: A Quiet Field Guide',
    description:
      'Moving in is supposed to feel like an ending. The reality is mostly small frictions and quiet joys — and a relationship that just keeps going, only closer. A gentle first-week guide for couples who finally closed the distance.',
    date: DAILY_DATE_6,
    cover: `/blog-covers/${DAILY_SLUG_6}-en.png`,
    tags: DAILY_TAGS_6,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_6,
    locale: 'zh-cn',
    title: '异地之后,真正住到一起的第一周:一份安静的小指南',
    description:
      '搬进同一个家,本来应该像某个阶段的结束。现实大部分时候只是些小摩擦,和一些安静的小确幸 — 而这段关系不会自己变成新的样子,它只是更近了一点,然后继续走下去。一份给"终于结束了异地"的你们的第一周指南。',
    date: DAILY_DATE_6,
    cover: `/blog-covers/${DAILY_SLUG_6}-zh-cn.png`,
    tags: DAILY_TAGS_6,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_6,
    locale: 'zh-tw',
    title: '遠距離之後,真正住在一起的第一週:一份安靜的小指南',
    description:
      '搬進同一個家,本來應該像某個階段的結束。現實大部分時候只是些小摩擦,和一些安靜的小確幸 — 而這段關係不會自己變成新的樣子,它只是更近了一點,然後繼續走下去。一份給「終於結束了遠距離」的你們的第一週指南。',
    date: DAILY_DATE_6,
    cover: `/blog-covers/${DAILY_SLUG_6}-zh-tw.png`,
    tags: DAILY_TAGS_6,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_6,
    locale: 'ja',
    title: '遠距離恋愛のあと、初めて一緒に住み始めた最初の 1 週間:やさしい現場ガイド',
    description:
      '同じ部屋への引っ越しは、何かの「終わり」に見えるはずです。現実にあるのは小さな摩擦と静かな喜び — そして関係は新しい形に変わらず、ただ少し近づいて続いていくだけ。距離をようやく閉じた二人のための、最初の一週間のやさしいガイドです。',
    date: DAILY_DATE_6,
    cover: `/blog-covers/${DAILY_SLUG_6}-ja.png`,
    tags: DAILY_TAGS_6,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_6,
    locale: 'ko',
    title: '장거리 연애 끝, 처음 같이 살게 된 첫 주: 조용한 현장 가이드',
    description:
      '이사 오는 날은 어떤 것의 ‘끝’처럼 느껴져야 합니다. 실제는 대부분 작은 마찰과 조용한 기쁨으로 이루어져 있고, 관계는 척 하고 바뀌지 않습니다. 조금 더 가까워진 채로 그냥 계속 갈 뿐. 거리를ようやく 닫은 두 사람을 위한 첫 주 가이드입니다.',
    date: DAILY_DATE_6,
    cover: `/blog-covers/${DAILY_SLUG_6}-ko.png`,
    tags: DAILY_TAGS_6,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_6,
    locale: 'de',
    title: 'Nach der Fernbeziehung: Die erste Woche des Zusammenwohnens — ein leiser Wegweiser',
    description:
      'Der Einzugstag fühlt sich wie ein Ende an. In Wirklichkeit besteht er aus kleinen Reibungen und leisen Freuden — und einer Beziehung, die einfach weitergeht, nur näher. Ein sanfter Wegweiser für die erste Woche, für Paare, die die Distanz endlich geschlossen haben.',
    date: DAILY_DATE_6,
    cover: `/blog-covers/${DAILY_SLUG_6}-de.png`,
    tags: DAILY_TAGS_6,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_6,
    locale: 'fr',
    title: "Après la relation à distance : la première semaine de vie commune — un guide discret",
    description:
      "L'emménagement est censé ressembler à une fin. En réalité, il est surtout fait de petits frottements et de joies silencieuses — et d'une relation qui continue, tout simplement, un peu plus près. Un guide doux pour la première semaine, pour les couples qui ont enfin refermé la distance.",
    date: DAILY_DATE_6,
    cover: `/blog-covers/${DAILY_SLUG_6}-fr.png`,
    tags: DAILY_TAGS_6,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_6,
    locale: 'es',
    title: 'Después de la relación a distancia: la primera semana viviendo juntos — una guía serena',
    description:
      'La mudanza se supone que se siente como un final. La realidad es, sobre todo, pequeñas fricciones y alegrías silenciosas — y una relación que simplemente sigue, un poco más cerca. Una guía suave para la primera semana, para parejas que por fin cerraron la distancia.',
    date: DAILY_DATE_6,
    cover: `/blog-covers/${DAILY_SLUG_6}-es.png`,
    tags: DAILY_TAGS_6,
    readingMinutes: 5,
  },
];

export const blogPosts: BlogPost[] = [
  ...launchPosts,
  ...dailyPosts,
  ...dailyPosts2,
  ...dailyPosts3,
  ...dailyPosts4,
  ...dailyPosts5,
  ...dailyPosts6,
];

// ──────────────────────────────────────────────────────────────────────
// Helpers
// ──────────────────────────────────────────────────────────────────────

export function getBlogPost(slug: string, locale: Locale): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug && p.locale === locale);
}

export function getBlogPostsByLocale(locale: Locale): BlogPost[] {
  return blogPosts
    .filter((p) => p.locale === locale)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getBlogPostsBySlug(slug: string): BlogPost[] {
  return blogPosts.filter((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return [...new Set(blogPosts.map((p) => p.slug))];
}

export function getBlogUrl(post: BlogPost): string {
  // Always include locale prefix to match Next.js `[locale]` segment routing
  // (the EN locale uses `/en/blog/...` despite localePrefix: 'as-needed',
  // because blog routes are statically generated under `[locale]` segment).
  return `${SITE_URL}/${post.locale}/blog/${post.slug}`;
}