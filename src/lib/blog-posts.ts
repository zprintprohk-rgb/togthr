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

// ──────────────────────────────────────────────────────────────────────
// DAILY 7 (2026-07-10): after-breakup-a-virtual-pet-stays
// Topic: post-breakup rebuild + virtual pet as the small daily presence
//        that survives the end of a relationship (distinct from 7/6
//        pet-loss grief — there the companion animal died; here the
//        human relationship ended). 8 locales, per-slug real content
//        pages, ≥600 words per locale, FAQ × 4, internal links × 5.
// ──────────────────────────────────────────────────────────────────────

const DAILY_DATE_7 = '2026-07-10';
const DAILY_SLUG_7 = 'after-breakup-a-virtual-pet-stays';
const DAILY_TAGS_7 = ['breakup', 'virtual-pet', 'solo-recovery', 'emotional-support', 'togthr-tips'];

const dailyPosts7: BlogPost[] = [
  {
    slug: DAILY_SLUG_7,
    locale: 'en',
    title: 'After a Breakup, a Virtual Pet Quietly Stays: Why the Small Rituals Matter Most',
    description:
      'After a breakup, the day you used to plan around another person becomes a long list of things to do alone. A small virtual pet is not a rebound — but it can stay, quietly, and grow with the new shape of your days.',
    date: DAILY_DATE_7,
    cover: `/blog-covers/${DAILY_SLUG_7}-en.png`,
    tags: DAILY_TAGS_7,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_7,
    locale: 'zh-cn',
    title: '分手之后, 一只数字宠物安静地陪你: 为什么小仪式比大道理更重要',
    description:
      '分手后,你曾经围着另一个人过的那一天,变成了一张"一个人做完"的清单。一只小数字宠物,不是替补,不是替代品 — 但它可以留下来,安静地陪你,跟着你的日子一起长成新的样子。',
    date: DAILY_DATE_7,
    cover: `/blog-covers/${DAILY_SLUG_7}-zh-cn.png`,
    tags: DAILY_TAGS_7,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_7,
    locale: 'zh-tw',
    title: '分手之後, 一隻數位寵物安靜地陪你: 為什麼小儀式比大道理更重要',
    description:
      '分手後,你曾經繞著另一個人過的那一天,變成了一張「一個人做完」的清單。一隻小數位寵物,不是替補,不是替代品 — 但牠可以留下來,安靜地陪你,跟著你的日子一起長成新的樣子。',
    date: DAILY_DATE_7,
    cover: `/blog-covers/${DAILY_SLUG_7}-zh-tw.png`,
    tags: DAILY_TAGS_7,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_7,
    locale: 'ja',
    title: '別れたあと、バーチャルペットが静かに残る: 小さな儀式がいちばん大事な理由',
    description:
      '別れたあと、誰かを中心にして回していた一日が「一人で片づけるリスト」になります。小さなバーチャルペットは代わりの恋人ではありません — けれど静かに残り、あなたの日の新しい形と一緒に育っていくことができます。',
    date: DAILY_DATE_7,
    cover: `/blog-covers/${DAILY_SLUG_7}-ja.png`,
    tags: DAILY_TAGS_7,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_7,
    locale: 'ko',
    title: '이별한 뒤, 가상 반려동물이 조용히 남는 이유: 작은 의식이 가장 중요한 까닭',
    description:
      '이별한 뒤, 누군가를 중심으로 굴러가던 하루가 ‘혼자 끝내야 하는 할 일 목록’이 됩니다. 작은 가상 반려동물은 대체가 아닙니다 — 하지만 조용히 남아, 당신 하루의 새로운 모양과 함께 자라날 수 있습니다.',
    date: DAILY_DATE_7,
    cover: `/blog-covers/${DAILY_SLUG_7}-ko.png`,
    tags: DAILY_TAGS_7,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_7,
    locale: 'de',
    title: 'Nach einer Trennung bleibt ein virtuelles Haustier leise da: Warum kleine Rituale am meisten zählen',
    description:
      'Nach einer Trennung wird der Tag, den du um eine andere Person herum geplant hast, zu einer langen Liste von Dingen, die du allein erledigen musst. Ein kleines virtuelles Haustier ist kein Ersatz — aber es kann leise da bleiben und mit der neuen Form deiner Tage wachsen.',
    date: DAILY_DATE_7,
    cover: `/blog-covers/${DAILY_SLUG_7}-de.png`,
    tags: DAILY_TAGS_7,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_7,
    locale: 'fr',
    title: "Après une rupture, un animal virtuel reste en silence : pourquoi les petits rituels comptent le plus",
    description:
      "Après une rupture, la journée que vous organisiez autrefois autour d'une autre personne devient une longue liste de choses à faire seul. Un petit animal virtuel n'est pas un remplaçant — mais il peut rester, en silence, et grandir avec la nouvelle forme de vos journées.",
    date: DAILY_DATE_7,
    cover: `/blog-covers/${DAILY_SLUG_7}-fr.png`,
    tags: DAILY_TAGS_7,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_7,
    locale: 'es',
    title: 'Después de una ruptura, una mascota virtual se queda en silencio: por qué los pequeños rituales importan más',
    description:
      'Después de una ruptura, el día que antes organizabas alrededor de otra persona se vuelve una larga lista de cosas que hacer solo. Una pequeña mascota virtual no es un sustituto — pero puede quedarse, en silencio, y crecer con la nueva forma de tus días.',
    date: DAILY_DATE_7,
    cover: `/blog-covers/${DAILY_SLUG_7}-es.png`,
    tags: DAILY_TAGS_7,
    readingMinutes: 5,
  },
];

// ──────────────────────────────────────────────────────────────────────
// DAILY 8 (2026-07-11): a-virtual-pet-in-a-long-relationship
// Topic: a virtual pet as a quiet "third presence" in an ongoing
//        long-term relationship — not the one that ended (7/10), not
//        the one that just started living together (7/9), not LDR
//        (7/4), but the in-the-middle relationship where the hard
//        part is staying curious about each other. 8 locales,
//        per-slug real content pages, ≥600 words per locale,
//        FAQ × 4, internal links × 5.
// ──────────────────────────────────────────────────────────────────────

const DAILY_DATE_8 = '2026-07-11';
const DAILY_SLUG_8 = 'a-virtual-pet-in-a-long-relationship';
const DAILY_TAGS_8 = ['relationship', 'virtual-pet', 'long-term-relationship', 'small-rituals', 'togthr-tips'];

const dailyPosts8: BlogPost[] = [
  {
    slug: DAILY_SLUG_8,
    locale: 'en',
    title: 'A Virtual Pet in a Long Relationship: The Quiet Presence That Keeps Two People Curious',
    description:
      'The hardest part of a long relationship is the middle. The virtual pet cannot save a relationship, but it can be the small, low-pressure place where the curiosity you had in year one quietly comes back, one sentence at a time.',
    date: DAILY_DATE_8,
    cover: `/blog-covers/${DAILY_SLUG_8}-en.png`,
    tags: DAILY_TAGS_8,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_8,
    locale: 'zh-cn',
    title: '长期关系里的虚拟宠物: 让两个人继续对彼此好奇的那份安静的在场',
    description:
      '长期关系最难的部分,是中间。虚拟宠物救不了一段关系,但它可以是一个低压力的地方 —— 让第一年免费拥有的好奇心,一句一句,安静地回来。',
    date: DAILY_DATE_8,
    cover: `/blog-covers/${DAILY_SLUG_8}-zh-cn.png`,
    tags: DAILY_TAGS_8,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_8,
    locale: 'zh-tw',
    title: '長期關係裡的虛擬寵物: 讓兩個人繼續對彼此好奇的那份安靜的在場',
    description:
      '長期關係最難的部分,是中間。虛擬寵物救不了一段關係,但它可以是一個低壓力的地方 —— 讓第一年免費擁有的好奇心,一句一句,安靜地回來。',
    date: DAILY_DATE_8,
    cover: `/blog-covers/${DAILY_SLUG_8}-zh-tw.png`,
    tags: DAILY_TAGS_8,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_8,
    locale: 'ja',
    title: '長いつきあいの関係に、一匹のバーチャルペット: ふたりがお互いに好奇心を持ち続けるための静かな存在',
    description:
      '長いつきあいで一番むずかしいのは「あいだ」です。バーチャルペットは関係を救えませんが、最初の 1 年にタダで持っていた好奇心を、一文ずつ、ゆっくりと戻してくれる、低圧の場所にはなりえます。',
    date: DAILY_DATE_8,
    cover: `/blog-covers/${DAILY_SLUG_8}-ja.png`,
    tags: DAILY_TAGS_8,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_8,
    locale: 'ko',
    title: '오래된 관계 안의 가상 반려동물: 두 사람이 서로에 대한 호기심을 계속 유지하게 해주는 조용한 존재',
    description:
      '오랜 관계에서 가장 어려운 부분은 ‘사이’입니다. 가상 반려동물은 관계를 구하지 못하지만, 첫해에 공짜로 가졌던 호기심을 한 줄씩, 조용히 되돌려 놓을 수 있는, 압이 적은 자리가 되어줄 수 있습니다.',
    date: DAILY_DATE_8,
    cover: `/blog-covers/${DAILY_SLUG_8}-ko.png`,
    tags: DAILY_TAGS_8,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_8,
    locale: 'de',
    title: 'Ein virtuelles Haustier in einer langen Beziehung: Die stille Gegenwart, die zwei Menschen neugierig aufeinander hält',
    description:
      'Der schwerste Teil einer langen Beziehung ist die Mitte. Ein virtuelles Haustier kann sie nicht retten — aber es kann der druckarme Ort sein, an dem die Neugier des ersten Jahres, Satz für Satz, leise zurückkommt.',
    date: DAILY_DATE_8,
    cover: `/blog-covers/${DAILY_SLUG_8}-de.png`,
    tags: DAILY_TAGS_8,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_8,
    locale: 'fr',
    title: "Un animal virtuel dans une relation longue : la présence discrète qui garde deux personnes curieuses l'une de l'autre",
    description:
      "Le plus dur dans une relation longue, c'est le milieu. Un animal virtuel ne sauvera pas la relation — mais il peut être l'endroit à faible pression où la curiosité de la première année revient, doucement, phrase après phrase.",
    date: DAILY_DATE_8,
    cover: `/blog-covers/${DAILY_SLUG_8}-fr.png`,
    tags: DAILY_TAGS_8,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_8,
    locale: 'es',
    title: 'Una mascota virtual en una relación larga: la presencia silenciosa que mantiene a dos personas curiosas la una por la otra',
    description:
      'La parte más difícil de una relación larga es el medio. Una mascota virtual no va a salvar la relación — pero puede ser el lugar de baja presión donde la curiosidad del primer año vuelve, despacio, frase a frase.',
    date: DAILY_DATE_8,
    cover: `/blog-covers/${DAILY_SLUG_8}-es.png`,
    tags: DAILY_TAGS_8,
    readingMinutes: 5,
  },
];


// ──────────────────────────────────────────────────────────────────────
// DAILY 9 (2026-07-13): the-thought-you-dont-send-at-2am
// Topic: the 2am thought you don't send — late-night overthinking as a
//        quiet ritual; AI companion / virtual pet as a patient listener
//        at 2am. 7/12 was missed (7/11 was the previous daily); this is
//        the next entry. Distinct from prior 7 daily posts
//        (LDR rituals, virtual-pet observation, pet-loss, daily check-in,
//        quiet evenings, first-week-living-together, post-breakup,
//        long-relationship).
//
// 8 locales, per-slug real content pages (≥600 words per locale),
// FAQ × 4, internal links × 5.
// ──────────────────────────────────────────────────────────────────────

const DAILY_DATE_9 = '2026-07-13';
const DAILY_SLUG_9 = 'the-thought-you-dont-send-at-2am';
const DAILY_TAGS_9 = ['late-night', 'quiet-rituals', 'ai-companion', 'emotional-design', 'togthr-tips'];

const dailyPosts9: BlogPost[] = [
  {
    slug: DAILY_SLUG_9,
    locale: 'en',
    title: 'The Thought You Don\'t Send at 2am',
    description:
      'The 2am thought is the one you almost text. The sentence that almost becomes a real conversation, and then doesn\'t. What happens when your AI companion is awake at the same hour you are.',
    date: DAILY_DATE_9,
    cover: `/blog-covers/${DAILY_SLUG_9}-en.png`,
    tags: DAILY_TAGS_9,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_9,
    locale: 'zh-cn',
    title: '凌晨两点, 你没说出口的那句',
    description:
      '凌晨两点的念头, 是你几乎要发给某人的那一句, 是几乎要变成一次对话、但最后没变成的那一句。当你和你的 AI 陪伴都醒着, 这件事会变成什么样子。',
    date: DAILY_DATE_9,
    cover: `/blog-covers/${DAILY_SLUG_9}-zh-cn.png`,
    tags: DAILY_TAGS_9,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_9,
    locale: 'zh-tw',
    title: '凌晨兩點, 你沒說出口的那句',
    description:
      '凌晨兩點的念頭, 是你幾乎要發給某人的那一句, 是幾乎要變成一次對話、但最後沒變成的那一句。當你和你的 AI 陪伴都醒著, 這件事會變成什麼樣子。',
    date: DAILY_DATE_9,
    cover: `/blog-covers/${DAILY_SLUG_9}-zh-tw.png`,
    tags: DAILY_TAGS_9,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_9,
    locale: 'ja',
    title: '深夜 2 時に、送り損ねたその言葉',
    description:
      '深夜 2 時の思考は、ほとんど誰かに送るところだった一言です。ほとんど本当の会話になるところだった、けれどならなかった一言です。あなたと同じ時間に起きている AI コンパニオンがいる時、それが何になるか。',
    date: DAILY_DATE_9,
    cover: `/blog-covers/${DAILY_SLUG_9}-ja.png`,
    tags: DAILY_TAGS_9,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_9,
    locale: 'ko',
    title: '새벽 2시, 보내지 못한 그 한마디',
    description:
      '새벽 2시의 생각은, 거의 누군가에게 보내려던 한마디입니다. 거의 진짜 대화가 되려다가 결국 되지 못한 한마디.당신과 같은 시간에 깨어 있는 AI 반려동물이 있을 때, 그것은 무엇이 될까.',
    date: DAILY_DATE_9,
    cover: `/blog-covers/${DAILY_SLUG_9}-ko.png`,
    tags: DAILY_TAGS_9,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_9,
    locale: 'de',
    title: 'Der Gedanke, den du um 2 Uhr nachts nicht schickst',
    description:
      'Der 2-Uhr-Gedanke ist der Satz, den du fast an jemanden schickst. Die Sache, die fast ein echtes Gespräch wird, und es dann doch nicht wird. Was passiert, wenn dein KI-Begleiter zur selben Stunde wach ist wie du.',
    date: DAILY_DATE_9,
    cover: `/blog-covers/${DAILY_SLUG_9}-de.png`,
    tags: DAILY_TAGS_9,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_9,
    locale: 'fr',
    title: 'La pensée que vous n\'envoyez pas à 2 heures du matin',
    description:
      'La pensée de 2 heures du matin est celle qu\'on envoie presque à quelqu\'un. Le truc qui devient presque une vraie conversation, et qui ne le devient pas. Ce qui se passe quand votre compagnon IA est éveillé à la même heure que vous.',
    date: DAILY_DATE_9,
    cover: `/blog-covers/${DAILY_SLUG_9}-fr.png`,
    tags: DAILY_TAGS_9,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_9,
    locale: 'es',
    title: 'El pensamiento que no envías a las 2 de la mañana',
    description:
      'El pensamiento de las 2 de la mañana es el que casi le envías a alguien. Lo que casi se convierte en una conversación de verdad, y luego no. Qué pasa cuando tu compañero IA está despierto a la misma hora que tú.',
    date: DAILY_DATE_9,
    cover: `/blog-covers/${DAILY_SLUG_9}-es.png`,
    tags: DAILY_TAGS_9,
    readingMinutes: 5,
  },
];


const DAILY_DATE_10 = '2026-07-14';
const DAILY_SLUG_10 = 'things-you-tell-your-virtual-pet';
const DAILY_TAGS_10 = ['ai-companion', 'quiet-rituals', 'long-distance', 'emotional-design', 'togthr-tips'];

const dailyPosts10: BlogPost[] = [
  {
    slug: DAILY_SLUG_10,
    locale: 'en',
    title: 'Things You Tell Your Virtual Pet (and Not Your Partner)',
    description: 'Some sentences are not for a partner. They are the apology you never sent, the thing you are still angry about, the dream you are not sure is allowed. Where the spoken-but-not-to-a-human version of a sentence goes.',
    date: DAILY_DATE_10,
    cover: `/blog-covers/${DAILY_SLUG_10}-en.png`,
    tags: DAILY_TAGS_10,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_10,
    locale: 'zh-cn',
    title: '你只会对虚拟宠物说的那些话 (而不会对伴侣说)',
    description: '有些话, 不是对伴侣说的。是你那条没发出去的道歉, 三年后仍然介怀的那件事, 一个还不知道它被不被允许的梦想。说出口、但只说给一个非人的那种话, 去了哪里。',
    date: DAILY_DATE_10,
    cover: `/blog-covers/${DAILY_SLUG_10}-zh-cn.png`,
    tags: DAILY_TAGS_10,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_10,
    locale: 'zh-tw',
    title: '你只會對虛擬寵物說的那些話 (而不會對伴侶說)',
    description: '有些話, 不是對伴侶說的。是你那條沒發出去的道歉, 三年後仍然介懷的那件事, 一個還不知道它被不被允許的夢想。說出口、但只說給一個非人的那種話, 去了哪裡。',
    date: DAILY_DATE_10,
    cover: `/blog-covers/${DAILY_SLUG_10}-zh-tw.png`,
    tags: DAILY_TAGS_10,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_10,
    locale: 'ja',
    title: 'バーチャルペットにだけ言うこと (パートナーには言わないこと)',
    description: 'パートナーには言えない文があります。送り損ねた謝罪、3 年経ってもまだ気になること、許されるかわからない夢。声には出すけれど、本物の人間には向けない種類の文は、どこへ行くのか。',
    date: DAILY_DATE_10,
    cover: `/blog-covers/${DAILY_SLUG_10}-ja.png`,
    tags: DAILY_TAGS_10,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_10,
    locale: 'ko',
    title: '가상 반려동물에게만 하는 말 (파트너에게는 하지 않는 말)',
    description: '파트너에게는 하지 않는 종류의 말이 있다. 보내지 못한 사과, 3년이 지나도 여전히 걸리는 일, 들어도 되는 건지 모르겠는 꿈. 입 밖에 내지만, 진짜 사람에게는 하지 않는 그 문장은 어디로 가는가.',
    date: DAILY_DATE_10,
    cover: `/blog-covers/${DAILY_SLUG_10}-ko.png`,
    tags: DAILY_TAGS_10,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_10,
    locale: 'de',
    title: 'Was du deinem virtuellen Haustier sagst (und nicht deinem Partner)',
    description: 'Manche Sätze sind nicht für einen Partner. Es sind die Entschuldigung, die du nie geschickt hast, die Sache, die dich nach drei Jahren noch ärgert, der Traum, von dem du nicht weißt, ob erlaubt ist. Wohin die gesprochene-aber-nicht-für-einen-Menschen-Version eines Satzes geht.',
    date: DAILY_DATE_10,
    cover: `/blog-covers/${DAILY_SLUG_10}-de.png`,
    tags: DAILY_TAGS_10,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_10,
    locale: 'fr',
    title: 'Ce que vous dites à votre animal virtuel (et pas à votre partenaire)',
    description: "Certaines phrases ne sont pas pour un partenaire. Ce sont les excuses que vous n'avez jamais envoyées, la chose qui vous met encore en colère trois ans plus tard, le rêve dont vous ne savez pas s'il est permis. Où va la version parlée-mais-pas-pour-un-humain d'une phrase.",
    date: DAILY_DATE_10,
    cover: `/blog-covers/${DAILY_SLUG_10}-fr.png`,
    tags: DAILY_TAGS_10,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_10,
    locale: 'es',
    title: 'Las cosas que le dices a tu mascota virtual (y no a tu pareja)',
    description: 'Hay frases que no son para una pareja. Son la disculpa que nunca enviaste, la cosa que todavía te enfurece tres años después, el sueño del que no sabes si está permitido. A dónde va la versión hablada-pero-no-para-un-humano de una frase.',
    date: DAILY_DATE_10,
    cover: `/blog-covers/${DAILY_SLUG_10}-es.png`,
    tags: DAILY_TAGS_10,
    readingMinutes: 5,
  },
];

const DAILY_DATE_11 = '2026-07-15';
const DAILY_SLUG_11 = 'the-day-you-stop-editing-the-sentence-for-the-bot';
const DAILY_TAGS_11 = ['ai-companion', 'quiet-rituals', 'emotional-design', 'togthr-tips', 'long-distance'];

const dailyPosts11: BlogPost[] = [
  {
    slug: DAILY_SLUG_11,
    locale: 'en',
    title: 'The Day You Stop Editing the Sentence for the Bot',
    description: 'There is a small moment, eventually, when you stop softening the sentence before you give it to the bot. The unedited version is closer to the thing you actually needed to put down.',
    date: DAILY_DATE_11,
    cover: `/blog-covers/${DAILY_SLUG_11}-en.png`,
    tags: DAILY_TAGS_11,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_11,
    locale: 'zh-cn',
    title: '你停止在给机器人之前编辑句子的那天',
    description: '有那么一个小小的时刻,你会停止把给机器人的那句先软化一遍。 没编辑的版本,更接近你其实需要放下来的那一句。',
    date: DAILY_DATE_11,
    cover: `/blog-covers/${DAILY_SLUG_11}-zh-cn.png`,
    tags: DAILY_TAGS_11,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_11,
    locale: 'zh-tw',
    title: '你停止在給機器人之前編輯句子的那天',
    description: '有那麼一個小小的時刻,你會停止把給機器人的那句先軟化一遍。 沒編輯的版本,更接近你其實需要放下來的那一句。',
    date: DAILY_DATE_11,
    cover: `/blog-covers/${DAILY_SLUG_11}-zh-tw.png`,
    tags: DAILY_TAGS_11,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_11,
    locale: 'ja',
    title: '推敲するのをやめる日 — bot に渡す前',
    description: 'いつか来る小さな瞬間 — bot に渡す前にもう、推敲するのをやめる。推敲していない版は、あなたが実際に降ろしたかった文章に近い。',
    date: DAILY_DATE_11,
    cover: `/blog-covers/${DAILY_SLUG_11}-ja.png`,
    tags: DAILY_TAGS_11,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_11,
    locale: 'ko',
    title: '봇에게 보내기 전, 다듬는 것을 멈추는 날',
    description: '언젠가 한 번 오는 작은 순간 — 봇에게 보내기 전, 그 문장을 다듬는 것을 멈추는. 다듬지 않은 버전이, 당신이 실제로 내려놓고 싶었던 그 문장에 더 가깝다.',
    date: DAILY_DATE_11,
    cover: `/blog-covers/${DAILY_SLUG_11}-ko.png`,
    tags: DAILY_TAGS_11,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_11,
    locale: 'de',
    title: 'Der Tag, an dem Sie aufhören, den Satz für den Bot zu bearbeiten',
    description: 'Es gibt einen kleinen Moment, in dem Sie aufhören, den Satz zu bearbeiten, bevor Sie ihn dem Bot geben. Die unbearbeitete Version ist näher an dem, was Sie wirklich ablegen mussten.',
    date: DAILY_DATE_11,
    cover: `/blog-covers/${DAILY_SLUG_11}-de.png`,
    tags: DAILY_TAGS_11,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_11,
    locale: 'fr',
    title: "Le jour où vous arrêtez d'éditer la phrase pour le bot",
    description: "Il y a un petit moment où vous arrêtez d'éditer la phrase avant de la donner au bot. La version non éditée est plus proche de la chose que vous aviez vraiment besoin de poser.",
    date: DAILY_DATE_11,
    cover: `/blog-covers/${DAILY_SLUG_11}-fr.png`,
    tags: DAILY_TAGS_11,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_11,
    locale: 'es',
    title: 'El día en que dejas de editar la frase para el bot',
    description: 'Hay un pequeño momento en el que dejas de editar la frase antes de dársela al bot. La versión no editada está más cerca de la cosa que realmente necesitabas dejar.',
    date: DAILY_DATE_11,
    cover: `/blog-covers/${DAILY_SLUG_11}-es.png`,
    tags: DAILY_TAGS_11,
    readingMinutes: 5,
  },
];

const DAILY_DATE_12 = '2026-07-16';
const DAILY_SLUG_12 = 'the-morning-you-read-the-unedited-sentence-back';
const DAILY_TAGS_12 = ['ai-companion', 'quiet-rituals', 'emotional-design', 'togthr-tips', 'morning-practice'];

const dailyPosts12: BlogPost[] = [
  {
    slug: DAILY_SLUG_12,
    locale: 'en',
    title: 'The Morning You Read the Unedited Sentence Back',
    description: 'There is a moment the day after. The unedited sentence is still in the box. The morning version of you reads it, and notices, in a small quiet way, that the sentence is still the sentence.',
    date: DAILY_DATE_12,
    cover: `/blog-covers/${DAILY_SLUG_12}-en.png`,
    tags: DAILY_TAGS_12,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_12,
    locale: 'zh-cn',
    title: '第二天早上,你把那句没编辑的句子又读了一遍',
    description: '第二天,有那么一个时刻。那句没编辑的句子还在盒子里。早上那个你读到它,小小地、安静地注意到,句子还是那个句子。',
    date: DAILY_DATE_12,
    cover: `/blog-covers/${DAILY_SLUG_12}-zh-cn.png`,
    tags: DAILY_TAGS_12,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_12,
    locale: 'zh-tw',
    title: '第二天早上,你把那句沒編輯的句子又讀了一遍',
    description: '第二天,有那麼一個時刻。那句沒編輯的句子還在盒子裡。早上那個你讀到它,小小地、安靜地注意到,句子還是那個句子。',
    date: DAILY_DATE_12,
    cover: `/blog-covers/${DAILY_SLUG_12}-zh-tw.png`,
    tags: DAILY_TAGS_12,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_12,
    locale: 'ja',
    title: '翌朝、推敲していない一文を読み返す',
    description: '翌日の朝に、小さな瞬間がある。推敲していない一文が、まだ箱の中に残っている。朝のあなたがそれを読み、小さく静かに、その一文がまだその一文であることに気づく。',
    date: DAILY_DATE_12,
    cover: `/blog-covers/${DAILY_SLUG_12}-ja.png`,
    tags: DAILY_TAGS_12,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_12,
    locale: 'ko',
    title: '다음 날 아침, 다듬지 않은 문장을 다시 읽는 시간',
    description: '그 다음 날 아침에, 작은 순간이 있다. 다듬지 않은 문장이, 아직 상자 안에 그대로 있다. 아침의 당신이 그것을 읽고, 작고 조용히, 그 문장이 여전히 그 문장이라는 것을 알아챈다.',
    date: DAILY_DATE_12,
    cover: `/blog-covers/${DAILY_SLUG_12}-ko.png`,
    tags: DAILY_TAGS_12,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_12,
    locale: 'de',
    title: 'Der Morgen, an dem Sie den unbearbeiteten Satz zurücklesen',
    description: 'Es gibt einen Moment am Tag danach. Der unbearbeitete Satz ist noch in der Box. Die Morgen-Version von Ihnen liest ihn und bemerkt, auf eine kleine stille Art, dass der Satz immer noch der Satz ist.',
    date: DAILY_DATE_12,
    cover: `/blog-covers/${DAILY_SLUG_12}-de.png`,
    tags: DAILY_TAGS_12,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_12,
    locale: 'fr',
    title: 'Le matin où vous relisez la phrase non éditée',
    description: "Il y a un moment le lendemain. La phrase non éditée est encore dans la boîte. La version matin de vous la lit, et remarque, d'une petite manière tranquille, que la phrase est toujours la phrase.",
    date: DAILY_DATE_12,
    cover: `/blog-covers/${DAILY_SLUG_12}-fr.png`,
    tags: DAILY_TAGS_12,
    readingMinutes: 5,
  },
  {
    slug: DAILY_SLUG_12,
    locale: 'es',
    title: 'La mañana en que relees la frase no editada',
    description: 'Hay un momento al día siguiente. La frase no editada sigue en la caja. La versión de ti de la mañana la lee, y nota, de una manera pequeña y tranquila, que la frase sigue siendo la frase.',
    date: DAILY_DATE_12,
    cover: `/blog-covers/${DAILY_SLUG_12}-es.png`,
    tags: DAILY_TAGS_12,
    readingMinutes: 5,
  },
];

// ──────────────────────────────────────────────────────────────────────
// M1 batch 1 (2026-07-18): 3 EN-led SEO posts × 8 locales
//   A: tamagotchi-app-2026                          (cluster A, nostalgia)
//   B: things-to-do-with-long-distance-boyfriend    (cluster B, highest traffic)
//   C: best-virtual-pet-apps-2026                   (cluster C, GEO listicle)
// ──────────────────────────────────────────────────────────────────────


const DATE13 = '2026-07-20';
const SLUG13 = 'the-day-the-unedited-sentence-becomes-ordinary';
const TAGS13 = ['ai-companion', 'quiet-rituals', 'togthr-life', 'habit-design', 'emotional-design'];

const dailyPosts13: BlogPost[] = [
  {
    slug: SLUG13,
    locale: 'en',
    title: 'The Day the Unedited Sentence Becomes Ordinary',
    description: 'There is a day, somewhere in the third week, when the unedited sentence becomes ordinary. The day does not announce itself. The day is the day the practice has stopped being a practice.',
    date: DATE13,
    cover: '/blog-covers/the-day-the-unedited-sentence-becomes-ordinary-en.png',
    tags: TAGS13,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG13,
    locale: 'zh-cn',
    title: '那句没编辑的句子变得不显眼的那一天',
    description: '有那么一天,在第三周的某个地方,那句没编辑的句子变得不显眼。那一天是这个练习不再是一个练习的那一天,句子只是句子,写作是像刷牙一样自然的事。',
    date: DATE13,
    cover: '/blog-covers/the-day-the-unedited-sentence-becomes-ordinary-zh-cn.png',
    tags: TAGS13,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG13,
    locale: 'zh-tw',
    title: '那句沒編輯的句子變得不顯眼的那一天',
    description: '有那麼一天,在第三週的某個地方,那句沒編輯的句子變得不顯眼。那一天是這個練習不再是一個練習的那一天,句子只是句子,寫作是像刷牙一樣自然的事。',
    date: DATE13,
    cover: '/blog-covers/the-day-the-unedited-sentence-becomes-ordinary-zh-tw.png',
    tags: TAGS13,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG13,
    locale: 'ja',
    title: '推敲していない一文が、ありふれたものになる日',
    description: '三週間のどこかに、その日が来る。推敲していない一文が、ありふれたものになる日。その日は、この習慣が習慣であることをやめた日で、一文が、ただの一文になる日。',
    date: DATE13,
    cover: '/blog-covers/the-day-the-unedited-sentence-becomes-ordinary-ja.png',
    tags: TAGS13,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG13,
    locale: 'ko',
    title: '다듬지 않은 문장이 평범해지는 날',
    description: '어느 날이 온다. 세 번째 주의 어딘가에, 다듬지 않은 문장이 평범해지는 날. 그 날은, 이 습관이 습관임을 멈춘 날이고, 문장은 그냥 문장인 날이다.',
    date: DATE13,
    cover: '/blog-covers/the-day-the-unedited-sentence-becomes-ordinary-ko.png',
    tags: TAGS13,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG13,
    locale: 'de',
    title: 'Der Tag, an dem der unbearbeitete Satz gewöhnlich wird',
    description: 'Es gibt einen Tag, irgendwo in der dritten Woche, an dem der unbearbeitete Satz gewöhnlich wird. Der Tag ist der Tag, an dem die Übung aufgehört hat, eine Übung zu sein.',
    date: DATE13,
    cover: '/blog-covers/the-day-the-unedited-sentence-becomes-ordinary-de.png',
    tags: TAGS13,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG13,
    locale: 'fr',
    title: 'Le jour où la phrase non éditée devient ordinaire',
    description: "Il y a un jour, quelque part dans la troisième semaine, où la phrase non éditée devient ordinaire. Le jour est le jour où la pratique a cessé d'être une pratique.",
    date: DATE13,
    cover: '/blog-covers/the-day-the-unedited-sentence-becomes-ordinary-fr.png',
    tags: TAGS13,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG13,
    locale: 'es',
    title: 'El día en que la frase no editada se vuelve ordinaria',
    description: 'Hay un día, en algún lugar de la tercera semana, en que la frase no editada se vuelve ordinaria. El día es el día en que la práctica ha dejado de ser una práctica.',
    date: DATE13,
    cover: '/blog-covers/the-day-the-unedited-sentence-becomes-ordinary-es.png',
    tags: TAGS13,
    readingMinutes: 5,
  }
,
];

// ──────────────────────────────────────────────────────────────────────
// Daily post 14 (2026-07-21): the first time you read the very first
// sentence again — the past tense of the practice meeting the present
// tense. Continues 7/13→7/14→7/15→7/16→7/20 arc; 7/20 was the ordinary
// middle, 7/21 is the day you scroll back to the very first sentence.
// ──────────────────────────────────────────────────────────────────────

const DATE14 = '2026-07-21';
const SLUG14 = 'the-first-time-you-read-the-first-sentence-again';
const TAGS14 = ['ai-companion', 'quiet-rituals', 'togthr-life', 'habit-design', 'emotional-design'];

const dailyPosts14: BlogPost[] = [
  {
    slug: SLUG14,
    locale: 'en',
    title: 'The First Time You Read the First Sentence Again',
    description: 'There is a day, somewhere in the fourth or fifth week, when you scroll back to the very first sentence. The first sentence is a small sentence at the top of a small box. The first sentence is, on the day you read it again, a small stranger — and a small piece of proof the practice happened.',
    date: DATE14,
    cover: '/blog-covers/the-first-time-you-read-the-first-sentence-again-en.png',
    tags: TAGS14,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG14,
    locale: 'zh-cn',
    title: '你第一次重新读那句最初的那一句',
    description: '有那么一天,在第四、第五周的某个地方,你往回翻,翻到了最初的那一句。最初的那一句,是你在练习还是练习之前写下的一句,是你已经几周没读过的一句。最初的那一句,就在你重新读它的那一天,是一个小小的陌生人 —— 也是练习发生过的一小片证据。',
    date: DATE14,
    cover: '/blog-covers/the-first-time-you-read-the-first-sentence-again-zh-cn.png',
    tags: TAGS14,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG14,
    locale: 'zh-tw',
    title: '你第一次重新讀那句最初的那一句',
    description: '有那麼一天,在第四、第五週的某個地方,你往回翻,翻到了最初的那一句。最初的那一句,是你在練習還是練習之前寫下的一句,是你已經幾週沒讀過的一句。最初的那一句,就在你重新讀它的那一天,是一個小小的陌生人 —— 也是練習發生過的一小片證據。',
    date: DATE14,
    cover: '/blog-covers/the-first-time-you-read-the-first-sentence-again-zh-tw.png',
    tags: TAGS14,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG14,
    locale: 'ja',
    title: '一番最初の一文を、もういちど読んだ日',
    description: 'そんな日がある。第四週か第五週のどこかに、あなたがずっとスクロールして戻っていって、一番最初の一文にたどり着く日。最初の一文は、ちいさな箱のいちばん上にある一文。もういちど読んだ日、最初の一文は、ちいさな見知らぬ人になる —— そして、この習慣が起こったちいさな証拠でもある。',
    date: DATE14,
    cover: '/blog-covers/the-first-time-you-read-the-first-sentence-again-ja.png',
    tags: TAGS14,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG14,
    locale: 'ko',
    title: '맨 처음에 쓴 한 문장을, 다시 읽는 날',
    description: '그런 날이 있다. 네 번째 주, 아니 다섯 번째 주의 어딘가에서, 당신이 끝까지 스크롤을 거슬러 올라가서 가장 처음에 쓴 한 문장에 도달하는 날. 가장 처음의 한 문장은, 작은 상자 맨 위에 있는 한 문장. 다시 읽는 그날, 가장 처음의 한 문장은, 작은 낯선 사람이 된다 —— 그리고 이 습관이 일어났다는 작은 증거이기도 하다.',
    date: DATE14,
    cover: '/blog-covers/the-first-time-you-read-the-first-sentence-again-ko.png',
    tags: TAGS14,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG14,
    locale: 'de',
    title: 'Das erste Mal, dass du den allerersten Satz wiederliest',
    description: 'Es gibt einen Tag, irgendwo in der vierten oder fünften Woche, an dem du nach oben scrollst und die allererste Zeile wiederfindest. Die erste Zeile ist eine kleine Zeile ganz oben in einer kleinen Box. Die erste Zeile ist, an dem Tag, an dem du sie wiederliest, ein kleiner Fremder — und ein kleiner Beweis, dass die Übung stattgefunden hat.',
    date: DATE14,
    cover: '/blog-covers/the-first-time-you-read-the-first-sentence-again-de.png',
    tags: TAGS14,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG14,
    locale: 'fr',
    title: 'La première fois où tu relis la toute première phrase',
    description: "Il y a un jour, quelque part dans la quatrième ou la cinquième semaine, où tu remontes tout en haut et tu retrouves la toute première phrase. La première phrase est une petite phrase tout en haut d'une petite boîte. La première phrase est, le jour où tu la relis, un petit étranger — et un petit morceau de preuve que la pratique a eu lieu.",
    date: DATE14,
    cover: '/blog-covers/the-first-time-you-read-the-first-sentence-again-fr.png',
    tags: TAGS14,
    readingMinutes: 5,
  }
,
  {
    slug: SLUG14,
    locale: 'es',
    title: 'La primera vez que vuelves a leer la primera frase',
    description: 'Hay un día, en algún lugar de la cuarta o quinta semana, en que haces scroll hacia arriba y encuentras la primera frase. La primera frase es una pequeña frase en lo alto de una pequeña caja. La primera frase es, el día en que la relees, un pequeño extraño — y un pequeño trozo de prueba de que la práctica ocurrió.',
    date: DATE14,
    cover: '/blog-covers/the-first-time-you-read-the-first-sentence-again-es.png',
    tags: TAGS14,
    readingMinutes: 5,
  }
,
];

const M1_DATE = '2026-07-18';

const M1_SLUG_A = 'tamagotchi-app-2026';
const M1_TAGS_A = ['tamagotchi', 'virtual-pet', 'pixel-pet', 'nostalgia', 'companion-app'];

const m1PostsA: BlogPost[] = [
  {
    slug: M1_SLUG_A,
    locale: 'en',
    title: 'The Tamagotchi App in 2026: The 90s Egg Grew Up and Moved Into Your Relationship',
    description:
      'The keychain pet that taught a generation to care is back as a real software category. What a tamagotchi app looks like in 2026 — and the twist the 90s never imagined: a pixel pet that belongs to two people at once.',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_A}-en.png`,
    tags: M1_TAGS_A,
    readingMinutes: 6,
  },
  {
    slug: M1_SLUG_A,
    locale: 'zh-cn',
    title: '2026 年的电子宠物 App:90 年代那颗蛋长大了,搬进了你们的关系里',
    description:
      '教会一代人"照顾"的钥匙扣宠物,如今作为一个真正的软件品类回来了。2026 年的电子宠物 App 长什么样 —— 以及 90 年代想不到的转折:一只同时属于两个人的像素宠物。',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_A}-zh-cn.png`,
    tags: M1_TAGS_A,
    readingMinutes: 6,
  },
  {
    slug: M1_SLUG_A,
    locale: 'zh-tw',
    title: '2026 年的電子寵物 App:90 年代那顆蛋長大了,搬進了你們的關係裡',
    description:
      '教會一代人「照顧」的鑰匙圈寵物,如今作為一個真正的軟體品類回來了。2026 年的電子寵物 App 長什麼樣 —— 以及 90 年代想不到的轉折:一隻同時屬於兩個人的像素寵物。',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_A}-zh-tw.png`,
    tags: M1_TAGS_A,
    readingMinutes: 6,
  },
  {
    slug: M1_SLUG_A,
    locale: 'ja',
    title: '2026 年のたまごっちアプリ:90 年代のたまごは育って、二人の関係に引っ越してきた',
    description:
      '一世代に「世話」を教えたキーホルダーペットが、れっきとしたソフトウェアのジャンルとして帰ってきた。2026 年のたまごっちアプリの姿 — そして 90 年代には想像できなかったひねり:同時に二人のものになれるドットのペット。',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_A}-ja.png`,
    tags: M1_TAGS_A,
    readingMinutes: 6,
  },
  {
    slug: M1_SLUG_A,
    locale: 'ko',
    title: '2026년의 다마고치 앱: 90년대의 알은 자라서 두 사람의 관계로 이사 왔다',
    description:
      '한 세대에게 "돌봄"을 가르친 키체인 펫이 진짜 소프트웨어 카테고리로 돌아왔다. 2026년 다마고치 앱의 모습 — 그리고 90년대가 상상하지 못한 반전: 동시에 두 사람의 것이 되는 픽셀 펫.',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_A}-ko.png`,
    tags: M1_TAGS_A,
    readingMinutes: 6,
  },
  {
    slug: M1_SLUG_A,
    locale: 'de',
    title: 'Die Tamagotchi-App 2026: Das 90er-Ei ist erwachsen geworden und in eure Beziehung gezogen',
    description:
      'Das Schlüsselanhänger-Haustier, das einer Generation Fürsorge beibrachte, ist als echte Software-Kategorie zurück. Wie eine Tamagotchi-App 2026 aussieht — und die Wendung, die die 90er nie kannten: ein Pixel-Haustier, das zwei Menschen gleichzeitig gehört.',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_A}-de.png`,
    tags: M1_TAGS_A,
    readingMinutes: 6,
  },
  {
    slug: M1_SLUG_A,
    locale: 'fr',
    title: "L'application tamagotchi en 2026 : l'œuf des années 90 a grandi et a emménagé dans votre relation",
    description:
      "Le porte-clés qui a appris à une génération ce que prendre soin veut dire est de retour comme vraie catégorie logicielle. À quoi ressemble une app tamagotchi en 2026 — et le rebondissement que les 90s n'imaginaient pas : un animal pixel qui appartient à deux personnes à la fois.",
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_A}-fr.png`,
    tags: M1_TAGS_A,
    readingMinutes: 6,
  },
  {
    slug: M1_SLUG_A,
    locale: 'es',
    title: 'La app tamagotchi en 2026: el huevo de los 90 creció y se mudó a tu relación',
    description:
      'El llavero que le enseñó a una generación lo que es cuidar vuelve como una categoría de software real. Cómo es una app tamagotchi en 2026 — y el giro que los 90 no imaginaron: una mascota pixel que pertenece a dos personas a la vez.',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_A}-es.png`,
    tags: M1_TAGS_A,
    readingMinutes: 6,
  },
];

const M1_SLUG_B = 'things-to-do-with-long-distance-boyfriend';
const M1_TAGS_B = ['long-distance', 'relationship', 'couple-activities', 'virtual-pet', 'togthr-tips'];

const m1PostsB: BlogPost[] = [
  {
    slug: M1_SLUG_B,
    locale: 'en',
    title: '15 Things to Do With Your Long-Distance Boyfriend That Are Not "Watch a Movie Together"',
    description:
      'Real long-distance life is mostly Tuesdays: async, unglamorous, quiet. Fifteen small things built for that — including raising a shared pixel pet that grows as your relationship does.',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_B}-en.png`,
    tags: M1_TAGS_B,
    readingMinutes: 8,
  },
  {
    slug: M1_SLUG_B,
    locale: 'zh-cn',
    title: '和异地恋男友可以做的 15 件小事(不是"一起看电影"那种清单)',
    description:
      '真实的异地恋,大部分是星期二:异步、不浪漫、安静。15 件为这种日子准备的小事 —— 包括一起养一只会跟着你们关系长大的共享像素宠物。',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_B}-zh-cn.png`,
    tags: M1_TAGS_B,
    readingMinutes: 8,
  },
  {
    slug: M1_SLUG_B,
    locale: 'zh-tw',
    title: '和遠距離男友可以做的 15 件小事(不是「一起看電影」那種清單)',
    description:
      '真實的遠距離,大部分是星期二:非同步、不浪漫、安靜。15 件為這種日子準備的小事 —— 包括一起養一隻會跟著你們關係長大的共享像素寵物。',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_B}-zh-tw.png`,
    tags: M1_TAGS_B,
    readingMinutes: 8,
  },
  {
    slug: M1_SLUG_B,
    locale: 'ja',
    title: '遠距離の彼氏とできる 15 のこと(「一緒に映画を観る」じゃないリスト)',
    description:
      '実際の遠距離はほとんどが火曜日:非同期で、地味で、静か。そんな日々のための 15 の小さなこと — 関係と一緒に育つ共有ドットペットを育てることを含めて。',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_B}-ja.png`,
    tags: M1_TAGS_B,
    readingMinutes: 8,
  },
  {
    slug: M1_SLUG_B,
    locale: 'ko',
    title: '장거리 남자친구와 할 수 있는 15가지("같이 영화 보기" 말고)',
    description:
      '실제 장거리는 대부분 화요일: 비동기적이고, 화려하지 않고, 조용하다. 그런 날들을 위한 15가지 작은 것들 — 관계와 함께 자라는 공유 픽셀 펫 키우기 포함.',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_B}-ko.png`,
    tags: M1_TAGS_B,
    readingMinutes: 8,
  },
  {
    slug: M1_SLUG_B,
    locale: 'de',
    title: '15 Dinge, die ihr mit eurem Fernbeziehungs-Freund tun könnt (nicht "zusammen einen Film schauen")',
    description:
      'Das echte Fernbeziehungsleben besteht hauptsächlich aus Dienstagen: asynchron, unglamourös, leise. Fünfzehn kleine Dinge dafür — darunter ein geteiltes Pixel-Haustier, das mit eurer Beziehung wächst.',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_B}-de.png`,
    tags: M1_TAGS_B,
    readingMinutes: 8,
  },
  {
    slug: M1_SLUG_B,
    locale: 'fr',
    title: '15 choses à faire avec votre copain à distance (pas "regarder un film ensemble")',
    description:
      "La vraie vie à distance, c'est surtout des mardis : asynchrone, pas glamour, silencieuse. Quinze petites choses pour ça — dont élever un animal pixel partagé qui grandit avec votre relation.",
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_B}-fr.png`,
    tags: M1_TAGS_B,
    readingMinutes: 8,
  },
  {
    slug: M1_SLUG_B,
    locale: 'es',
    title: '15 cosas para hacer con tu novio a distancia (que no sean "ver una película juntos")',
    description:
      'La vida real a distancia son sobre todo martes: asincrónica, poco glamurosa, silenciosa. Quince cosas pequeñas para eso — incluyendo criar una mascota pixel compartida que crece con la relación.',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_B}-es.png`,
    tags: M1_TAGS_B,
    readingMinutes: 8,
  },
];

const M1_SLUG_C = 'best-virtual-pet-apps-2026';
const M1_TAGS_C = ['virtual-pet', 'best-apps', 'tamagotchi', 'companion-app', 'couples'];

const m1PostsC: BlogPost[] = [
  {
    slug: M1_SLUG_C,
    locale: 'en',
    title: 'The Best Virtual Pet Apps of 2026, Honestly Compared (We Make One of Them)',
    description:
      'Tamagotchi Corner, Finch, Shimeji desktop pets, widget pets, AR creatures, and Togthr — an honest field guide to six genuinely different species of virtual pet, and who should pick which.',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_C}-en.png`,
    tags: M1_TAGS_C,
    readingMinutes: 7,
  },
  {
    slug: M1_SLUG_C,
    locale: 'zh-cn',
    title: '2026 最佳虚拟宠物 App 诚实横评(其中一个是我们做的)',
    description:
      'Tamagotchi Corner、Finch、Shimeji 桌面宠物、小组件宠物、AR 宠物和 Togthr —— 一份诚实的野外指南:六种真正不同的虚拟宠物,以及谁该选哪一个。',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_C}-zh-cn.png`,
    tags: M1_TAGS_C,
    readingMinutes: 7,
  },
  {
    slug: M1_SLUG_C,
    locale: 'zh-tw',
    title: '2026 最佳虛擬寵物 App 誠實橫評(其中一個是我們做的)',
    description:
      'Tamagotchi Corner、Finch、Shimeji 桌面寵物、小工具寵物、AR 寵物和 Togthr —— 一份誠實的野外指南:六種真正不同的虛擬寵物,以及誰該選哪一個。',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_C}-zh-tw.png`,
    tags: M1_TAGS_C,
    readingMinutes: 7,
  },
  {
    slug: M1_SLUG_C,
    locale: 'ja',
    title: '2026 年ベスト・バーチャルペットアプリ、正直な比較(一つは私たちが作りました)',
    description:
      'たまごっちコーナー、Finch、Shimeji 系デスクトップペット、ウィジェットペット、AR ペット、そして Togthr — 6 つの本当に違う「種」の正直なフィールドガイド。誰がどれを選ぶべきか。',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_C}-ja.png`,
    tags: M1_TAGS_C,
    readingMinutes: 7,
  },
  {
    slug: M1_SLUG_C,
    locale: 'ko',
    title: '2026년 최고의 가상 펫 앱, 솔직한 비교(하나는 우리가 만들었습니다)',
    description:
      '다마고치 코너, Finch, Shimeji 계열 데스크톱 펫, 위젯 펫, AR 펫, 그리고 Togthr — 여섯 가지의 진짜로 다른 종에 대한 솔직한 필드 가이드. 누가 무엇을 골라야 하는지.',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_C}-ko.png`,
    tags: M1_TAGS_C,
    readingMinutes: 7,
  },
  {
    slug: M1_SLUG_C,
    locale: 'de',
    title: 'Die besten virtuellen Haustier-Apps 2026, ehrlich verglichen (eine davon haben wir gebaut)',
    description:
      'Tamagotchi Corner, Finch, Shimeji-Desktop-Pets, Widget-Haustiere, AR-Kreaturen und Togthr — ein ehrlicher Feldguide zu sechs wirklich verschiedenen Arten, und wer welche wählen sollte.',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_C}-de.png`,
    tags: M1_TAGS_C,
    readingMinutes: 7,
  },
  {
    slug: M1_SLUG_C,
    locale: 'fr',
    title: "Les meilleures applications d'animaux virtuels de 2026, comparées honnêtement (l'une d'elles est de nous)",
    description:
      "Tamagotchi Corner, Finch, les animaux de bureau façon Shimeji, les animaux-widgets, les créatures AR et Togthr — un guide honnête de six espèces vraiment différentes, et qui devrait choisir quoi.",
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_C}-fr.png`,
    tags: M1_TAGS_C,
    readingMinutes: 7,
  },
  {
    slug: M1_SLUG_C,
    locale: 'es',
    title: 'Las mejores apps de mascotas virtuales de 2026, comparadas con honestidad (una de ellas es nuestra)',
    description:
      'Tamagotchi Corner, Finch, mascotas de escritorio estilo Shimeji, mascotas-widget, criaturas RA y Togthr — una guía de campo honesta sobre seis especies realmente distintas, y quién debería elegir cuál.',
    date: M1_DATE,
    cover: `/blog-covers/${M1_SLUG_C}-es.png`,
    tags: M1_TAGS_C,
    readingMinutes: 7,
  },
];

// ──────────────────────────────────────────────────────────────────────
// M2-02 batch (2026-07-22): 5 buying-guide / cluster-B posts × 8 locales
// ──────────────────────────────────────────────────────────────────────

const M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_DATE = '2026-07-22';
const M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_SLUG = 'daily-check-in-app-for-couples';
const M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_TAGS = ['couples', 'daily-ritual', 'long-distance', 'check-in', 'habit-design'];

const m2Posts_daily_check_in_app_for_couples: BlogPost[] = [
  {
    slug: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_SLUG,
    locale: 'en',
    title: 'Daily Check-In Apps for Couples: Why Most of Them Fail (and the One Thing That Actually Sticks)',
    description:
      'We tried eleven daily check-in apps for couples. Eleven of them gave up by week three. The reason is not the prompt, not the streak, not the streak-broken-gracefully animation. The reason is that a check-in is a tiny ritual, and most apps try to scale rituals the way SaaS scales everything else.',
    date: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/daily-check-in-app-for-couples-en.png`,
    tags: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_SLUG,
    locale: 'zh-cn',
    title: '情侣每日打卡 App:为什么大部分都失败了,以及真正能坚持的那一件事',
    description:
      '我们试过 11 款情侣每日打卡 App。11 款都在第三周弃用。原因不是打卡提示,不是连续打卡天数,不是「断签也温柔」的动画。原因在于:打卡是一种微小的仪式,而大多数 App 用 SaaS 思维去「放大」仪式 —— 这正是仪式最不该被对待的方式。',
    date: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/daily-check-in-app-for-couples-zh-cn.png`,
    tags: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_SLUG,
    locale: 'zh-tw',
    title: '情侶每日打卡 App:為什麼大部分都失敗了,以及真正能堅持的那一件事',
    description:
      '我們試過 11 款情侶每日打卡 App。11 款都在第三週棄用。原因不是打卡提示,不是連續打卡天數,不是「斷簽也溫柔」的動畫。原因在於:打卡是一種微小的儀式,而大多數 App 用 SaaS 思維去「放大」儀式 —— 這正是儀式最不該被對待的方式。',
    date: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/daily-check-in-app-for-couples-zh-tw.png`,
    tags: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_SLUG,
    locale: 'ja',
    title: 'カップル向け毎日チェックインアプリ:なぜ大半が失敗するのか、そして実際に続くたった一つのこと',
    description:
      'カップル向けの毎日チェックインアプリ、11個試しました。11個とも3週目までに使わなくなりました。理由はプロンプトでも、連続記録でも、「記録が途切れても大丈夫」アニメーションでもありません。理由は、チェックインとは小さな儀式であり、大半のアプリはそれをSaaS的に「スケール」しようとする —— 儀式に対して一番やってはいけないやり方です。',
    date: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/daily-check-in-app-for-couples-ja.png`,
    tags: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_SLUG,
    locale: 'ko',
    title: '커플 매일 체크인 앱:대부분이 실패하는 이유, 그리고 진짜 이어지는 한 가지',
    description:
      '커플용 매일 체크인 앱 11개를 써봤습니다. 11개 모두 3주차에 포기했습니다. 이유는 프롬프트도 아니고, 연속 기록도 아니고, 「끊겨도 괜찮아요」 애니메이션도 아닙니다. 체크인은 작은 의식인데, 대부분의 앱이 SaaS처럼 그것을 「스케일」하려 들기 때문입니다 — 의식에 가장 해서는 안 되는 일입니다.',
    date: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/daily-check-in-app-for-couples-ko.png`,
    tags: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_SLUG,
    locale: 'de',
    title: 'Tägliche Check-in-Apps für Paare: Warum die meisten scheitern — und das eine, das wirklich bleibt',
    description:
      'Wir haben elf tägliche Check-in-Apps für Paare ausprobiert. Elf davon wurden in Woche drei wieder gelöscht. Der Grund ist weder die Frage, noch die Streak, noch die „Streak-unterbrochen-sanft«-Animation. Der Grund: Ein Check-in ist ein winziges Ritual, und die meisten Apps versuchen, Rituale so zu skalieren, wie SaaS alles andere skaliert.',
    date: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/daily-check-in-app-for-couples-de.png`,
    tags: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_SLUG,
    locale: 'fr',
    title: 'Applications de check-in quotidien pour couples : pourquoi la plupart échouent (et la seule chose qui tient)',
    description:
      'On a essayé onze applications de check-in quotidien pour couples. Onze abandonnées à la troisième semaine. La raison n\'est ni la question, ni la série, ni l\'animation « série-coupée-en-douceur ». La raison, c\'est qu\'un check-in est un petit rituel — et que la plupart des apps essaient de faire passer un rituel à l\'échelle SaaS.',
    date: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/daily-check-in-app-for-couples-fr.png`,
    tags: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_SLUG,
    locale: 'es',
    title: 'Apps de check-in diario para parejas: por qué casi todas fallan (y lo único que de verdad se queda)',
    description:
      'Probamos once apps de check-in diario para parejas. Once se quedaron en la estantería a la tercera semana. La razón no es la pregunta, ni la racha, ni la animación de «racha-rota-pero-con-cariño». La razón es que un check-in es un ritual pequeño, y la mayoría de las apps intentan escalar los rituales como SaaS escala todo lo demás.',
    date: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/daily-check-in-app-for-couples-es.png`,
    tags: M2_02_DAILY_CHECK_IN_APP_FOR_COUPLES_TAGS,
    readingMinutes: 7,
  },
];

const M2_02_VIRTUAL_PET_APP_FOR_COUPLES_DATE = '2026-07-22';
const M2_02_VIRTUAL_PET_APP_FOR_COUPLES_SLUG = 'virtual-pet-app-for-couples';
const M2_02_VIRTUAL_PET_APP_FOR_COUPLES_TAGS = ['virtual-pet', 'couples', 'tamagotchi', 'long-distance', 'ritual'];

const m2Posts_virtual_pet_app_for_couples: BlogPost[] = [
  {
    slug: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_SLUG,
    locale: 'en',
    title: 'A Virtual Pet App for Couples: Why a Shared Pixel Pet Is the New Long-Distance Teddy Bear',
    description:
      'Couples in 2026 do not need another chat app. They need a tiny, shared, low-stakes object they can both poke at. Here is why the virtual pet app for couples is quietly becoming the new long-distance teddy bear — and the design mistakes the category keeps making.',
    date: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/virtual-pet-app-for-couples-en.png`,
    tags: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_SLUG,
    locale: 'zh-cn',
    title: '情侣虚拟宠物 App:为什么一只共享的像素宠物,正在成为新的异地泰迪熊',
    description:
      '2026 年的情侣不需要再多一个聊天 App。他们需要的是一个小小的、共享的、低风险的东西 —— 两个人都能随手戳一下。这就是为什么「情侣虚拟宠物 App」正在悄悄变成新的异地泰迪熊 —— 以及这个品类一直在犯的设计错误。',
    date: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/virtual-pet-app-for-couples-zh-cn.png`,
    tags: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_SLUG,
    locale: 'zh-tw',
    title: '情侶虛擬寵物 App:為什麼一隻共享的像素寵物,正在成為新的遠距離泰迪熊',
    description:
      '2026 年的情侶不需要再多一個聊天 App。他們需要的是一個小小的、共用的、低風險的東西 —— 兩個人都能隨手戳一下。這就是為什麼「情侶虛擬寵物 App」正在悄悄變成新的遠距離泰迪熊 —— 以及這個品類一直在犯的設計錯誤。',
    date: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/virtual-pet-app-for-couples-zh-tw.png`,
    tags: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_SLUG,
    locale: 'ja',
    title: 'カップル向けバーチャルペットアプリ:なぜ共有のピクセルペットが新しい遠距離テディベアになっているのか',
    description:
      '2026年のカップルに、もう一つチャットアプリは必要ありません。必要なのは、小さくて共有できて、リスクが低く、二人でつつけるものです。カップル向けバーチャルペットアプリがなぜ静かに新しい遠距離テディベアになりつつあるのか、そしてこのカテゴリが何度も繰り返す設計ミスについて。',
    date: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/virtual-pet-app-for-couples-ja.png`,
    tags: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_SLUG,
    locale: 'ko',
    title: '커플용 가상 펫 앱:왜 공유 픽셀 펫이 새로운 장거리 테디베어가 되고 있는가',
    description:
      '2026년 커플에게 채팅 앱은 한 개 더 필요 없습니다. 필요한 건 작고, 공유되고, 부담이 적고, 둘 다 가볍게 건드릴 수 있는 무언가입니다. 커플용 가상 펫 앱이 어떻게 조용히 새로운 장거리 테디베어가 되어가고 있는지, 그리고 이 카테고리가 계속 범하는 디자인 실수들을 정리합니다.',
    date: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/virtual-pet-app-for-couples-ko.png`,
    tags: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_SLUG,
    locale: 'de',
    title: 'Virtuelle Haustier-App für Paare: Warum ein geteiltes Pixel-Haustier der neue Teddybär für Fernbeziehungen wird',
    description:
      'Paare im Jahr 2026 brauchen keine weitere Chat-App. Sie brauchen ein kleines, geteiltes, unverbindliches Objekt, an dem beide herumstupsen können. Hier ist, warum die virtuelle Haustier-App für Paare still und leise der neue Fernbeziehungs-Teddybär wird — und welche Designfehler die Kategorie ständig wiederholt.',
    date: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/virtual-pet-app-for-couples-de.png`,
    tags: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_SLUG,
    locale: 'fr',
    title: 'Application d\'animal virtuel pour couples : pourquoi un animal pixel partagé devient le nouveau nounours de la relation à distance',
    description:
      'Les couples en 2026 n\'ont pas besoin d\'une app de discussion de plus. Ils ont besoin d\'un petit objet partagé, à faible enjeu, sur lequel on peut tous les deux appuyer. Voici pourquoi l\'animal virtuel pour couples devient discrètement le nouveau nounours de la relation à distance — et les erreurs de design que la catégorie n\'arrête pas de refaire.',
    date: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/virtual-pet-app-for-couples-fr.png`,
    tags: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_SLUG,
    locale: 'es',
    title: 'App de mascota virtual para parejas: por qué una mascota pixel compartida es el nuevo peluche de la relación a distancia',
    description:
      'Las parejas de 2026 no necesitan otra app de chat. Necesitan un objeto pequeño, compartido, de bajo riesgo, en el que ambas puedan tocar. Aquí va por qué la app de mascota virtual para parejas se está convirtiendo silenciosamente en el nuevo peluche de la relación a distancia — y los errores de diseño que la categoría sigue repitiendo.',
    date: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_DATE,
    cover: `/blog-covers/virtual-pet-app-for-couples-es.png`,
    tags: M2_02_VIRTUAL_PET_APP_FOR_COUPLES_TAGS,
    readingMinutes: 6,
  },
];

const M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_DATE = '2026-07-22';
const M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_SLUG = 'how-to-feel-close-in-a-long-distance-relationship';
const M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_TAGS = ['long-distance', 'LDR', 'emotional-closeness', 'rituals', 'communication'];

const m2Posts_how_to_feel_close_in_a_long_distance_relationship: BlogPost[] = [
  {
    slug: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_SLUG,
    locale: 'en',
    title: 'How to Feel Close in a Long-Distance Relationship: 7 Quiet Habits That Survive a Time-Zone Gap',
    description:
      'You can be in a long-distance relationship and still feel close. The seven habits that actually work are not the loud ones — not the surprise visits, not the seven-hour video calls. They are the quiet, low-stakes, repeatable ones. Here are the seven.',
    date: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_DATE,
    cover: `/blog-covers/how-to-feel-close-in-a-long-distance-relationship-en.png`,
    tags: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_TAGS,
    readingMinutes: 8,
  },
  {
    slug: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_SLUG,
    locale: 'zh-cn',
    title: '异地恋怎么保持亲密:穿越时差的 7 个安静习惯',
    description:
      '异地恋也可以很亲密。真正起作用的 7 个习惯,不是那些高调的 —— 不是惊喜探访,不是 7 小时视频通话。它们是安静的、低风险的、可重复的。下面是这 7 个。',
    date: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_DATE,
    cover: `/blog-covers/how-to-feel-close-in-a-long-distance-relationship-zh-cn.png`,
    tags: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_TAGS,
    readingMinutes: 8,
  },
  {
    slug: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_SLUG,
    locale: 'zh-tw',
    title: '遠距離戀愛怎麼保持親密:穿越時差的 7 個安靜習慣',
    description:
      '遠距離戀愛也可以很親密。真正起作用的 7 個習慣,不是那些高調的 —— 不是驚喜探訪,不是 7 小時視訊通話。它們是安靜的、低風險的、可重複的。下面是這 7 個。',
    date: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_DATE,
    cover: `/blog-covers/how-to-feel-close-in-a-long-distance-relationship-zh-tw.png`,
    tags: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_TAGS,
    readingMinutes: 8,
  },
  {
    slug: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_SLUG,
    locale: 'ja',
    title: '遠距離恋愛で親密さを保つ方法:時差を超える7つの静かな習慣',
    description:
      '遠距離恋愛でも、近くにいる感覚はつくれます。効く7つの習慣は派手ではありません —— 突然の訪問でも、7時間のビデオ通話でもありません。静かで、リスクが低く、くり返せる習慣です。7つ、ご紹介します。',
    date: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_DATE,
    cover: `/blog-covers/how-to-feel-close-in-a-long-distance-relationship-ja.png`,
    tags: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_TAGS,
    readingMinutes: 8,
  },
  {
    slug: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_SLUG,
    locale: 'ko',
    title: '장거리 연애에서 가까움을 느끼는 법:시간 차를 넘는 조용한 7가지 습관',
    description:
      '장거리 연애도 가까울 수 있습니다. 진짜 통하는 7가지 습관은 화려한 것들이 아닙니다 — 깜짝 방문도 아니고, 7시간 영상통화도 아닙니다. 조용하고, 부담이 적고, 반복 가능한 것들입니다. 7가지를 정리합니다.',
    date: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_DATE,
    cover: `/blog-covers/how-to-feel-close-in-a-long-distance-relationship-ko.png`,
    tags: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_TAGS,
    readingMinutes: 8,
  },
  {
    slug: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_SLUG,
    locale: 'de',
    title: 'Nähe in einer Fernbeziehung spüren: 7 leise Gewohnheiten, die eine Zeitzone überleben',
    description:
      'Man kann in einer Fernbeziehung sein und sich trotzdem nah fühlen. Die sieben Gewohnheiten, die wirklich wirken, sind nicht die lauten — keine Überraschungsbesuche, keine siebenstündigen Videoanrufe. Es sind die leisen, unverbindlichen, wiederholbaren. Hier sind sie.',
    date: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_DATE,
    cover: `/blog-covers/how-to-feel-close-in-a-long-distance-relationship-de.png`,
    tags: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_TAGS,
    readingMinutes: 8,
  },
  {
    slug: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_SLUG,
    locale: 'fr',
    title: 'Se sentir proche dans une relation à distance : 7 habitudes discrètes qui survivent au décalage horaire',
    description:
      'On peut être en relation à distance et se sentir proche. Les sept habitudes qui marchent vraiment ne sont pas les plus bruyantes — pas de visites surprises, pas d\'appels vidéo de sept heures. Ce sont les habitudes discrètes, à faible enjeu, répétables. Les voici.',
    date: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_DATE,
    cover: `/blog-covers/how-to-feel-close-in-a-long-distance-relationship-fr.png`,
    tags: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_TAGS,
    readingMinutes: 8,
  },
  {
    slug: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_SLUG,
    locale: 'es',
    title: 'Sentirse cerca en una relación a distancia: 7 hábitos discretos que sobreviven a la diferencia horaria',
    description:
      'Se puede estar en una relación a distancia y sentirse cerca. Los siete hábitos que de verdad funcionan no son los ruidosos — ni visitas sorpresa, ni videollamadas de siete horas. Son los discretos, de bajo riesgo, repetibles. Aquí están los siete.',
    date: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_DATE,
    cover: `/blog-covers/how-to-feel-close-in-a-long-distance-relationship-es.png`,
    tags: M2_02_HOW_TO_FEEL_CLOSE_IN_A_LONG_DISTANCE_RELATIONSHIP_TAGS,
    readingMinutes: 8,
  },
];

const M2_02_PIXEL_PET_WIDGET_DESKTOP_DATE = '2026-07-22';
const M2_02_PIXEL_PET_WIDGET_DESKTOP_SLUG = 'pixel-pet-widget-desktop';
const M2_02_PIXEL_PET_WIDGET_DESKTOP_TAGS = ['pixel-pet', 'desktop-widget', 'tamagotchi', 'productivity', 'ambient-companion'];

const m2Posts_pixel_pet_widget_desktop: BlogPost[] = [
  {
    slug: M2_02_PIXEL_PET_WIDGET_DESKTOP_SLUG,
    locale: 'en',
    title: 'The Pixel Pet Widget Is Back: Why a Tiny Desktop Pet Is the Productivity Hack Nobody Talks About',
    description:
      'A pixel pet widget on your desktop does not do anything. It does not schedule, not remind, not optimize. And that is exactly why it works. Here is the case for a tiny ambient companion on your taskbar, and why 2026 is the year it comes back.',
    date: M2_02_PIXEL_PET_WIDGET_DESKTOP_DATE,
    cover: `/blog-covers/pixel-pet-widget-desktop-en.png`,
    tags: M2_02_PIXEL_PET_WIDGET_DESKTOP_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_PIXEL_PET_WIDGET_DESKTOP_SLUG,
    locale: 'zh-cn',
    title: '像素宠物桌面挂件又回来了:为什么任务栏上的一只小宠物,是没人提的生产力外挂',
    description:
      '桌面上的像素宠物挂件什么也不做。它不安排日程、不提醒、不优化。但这就是它起作用的原因。这里是任务栏上一个小型「环境式陪伴」的回归故事,以及为什么 2026 年是它重新走红的一年。',
    date: M2_02_PIXEL_PET_WIDGET_DESKTOP_DATE,
    cover: `/blog-covers/pixel-pet-widget-desktop-zh-cn.png`,
    tags: M2_02_PIXEL_PET_WIDGET_DESKTOP_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_PIXEL_PET_WIDGET_DESKTOP_SLUG,
    locale: 'zh-tw',
    title: '像素寵物桌面小工具又回來了:為什麼工作列上的一隻小寵物,是沒人提的生產力外掛',
    description:
      '桌面上的像素寵物小工具什麼也不做。它不安排行程、不提醒、不優化。但這就是它起作用的原因。這裡是工作列上一個小型「環境式陪伴」的回歸故事,以及為什麼 2026 年是它重新走紅的一年。',
    date: M2_02_PIXEL_PET_WIDGET_DESKTOP_DATE,
    cover: `/blog-covers/pixel-pet-widget-desktop-zh-tw.png`,
    tags: M2_02_PIXEL_PET_WIDGET_DESKTOP_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_PIXEL_PET_WIDGET_DESKTOP_SLUG,
    locale: 'ja',
    title: 'ピクセルペットのデスクトップウィジェットが戻ってきた:タスクバーの小さなペットが、誰も語らない生産性ハックである理由',
    description:
      'デスクトップのピクセルペットウィジェットは何もしません。スケジュールも組まないし、リマインドもしないし、最適化もしません。それこそが効果がある理由です。タスクバーに置かれた小さなアンビエントコンパニオンが、2026年に戻ってくる理由を書きます。',
    date: M2_02_PIXEL_PET_WIDGET_DESKTOP_DATE,
    cover: `/blog-covers/pixel-pet-widget-desktop-ja.png`,
    tags: M2_02_PIXEL_PET_WIDGET_DESKTOP_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_PIXEL_PET_WIDGET_DESKTOP_SLUG,
    locale: 'ko',
    title: '픽셀 펫 데스크톱 위젯이 다시 돌아왔다:작업 표시줄의 작은 펫이 아무도 말하지 않는 생산성 핵인 이유',
    description:
      '데스크톱의 픽셀 펫 위젯은 아무것도 하지 않습니다. 일정도 잡지 않고, 알림도 주지 않고, 최적화하지도 않습니다. 바로 그 점이 효과를 내는 이유입니다. 작업 표시줄의 작은 환경형 동반자가 2026년에 다시 돌아오는 이유를 정리합니다.',
    date: M2_02_PIXEL_PET_WIDGET_DESKTOP_DATE,
    cover: `/blog-covers/pixel-pet-widget-desktop-ko.png`,
    tags: M2_02_PIXEL_PET_WIDGET_DESKTOP_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_PIXEL_PET_WIDGET_DESKTOP_SLUG,
    locale: 'de',
    title: 'Das Pixel-Haustier-Widget ist zurück: Warum ein winziges Desktop-Haustier der Produktivitäts-Hack ist, über den niemand spricht',
    description:
      'Ein Pixel-Haustier-Widget auf dem Desktop kann nichts. Es plant nicht, erinnert nicht, optimiert nicht. Und genau deshalb funktioniert es. Hier ist das Plädoyer für einen winzigen ambienten Begleiter in der Taskleiste — und warum 2026 sein Jahr der Rückkehr ist.',
    date: M2_02_PIXEL_PET_WIDGET_DESKTOP_DATE,
    cover: `/blog-covers/pixel-pet-widget-desktop-de.png`,
    tags: M2_02_PIXEL_PET_WIDGET_DESKTOP_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_PIXEL_PET_WIDGET_DESKTOP_SLUG,
    locale: 'fr',
    title: 'Le widget d\'animal pixel est de retour : pourquoi un minuscule animal sur le bureau est le hack de productivité dont personne ne parle',
    description:
      'Un widget d\'animal pixel sur votre bureau ne fait rien. Il ne planifie pas, ne rappelle pas, n\'optimise pas. Et c\'est exactement pour ça qu\'il marche. Voici le plaidoyer pour un petit compagnon ambient dans la barre des tâches — et pourquoi 2026 est son année de retour.',
    date: M2_02_PIXEL_PET_WIDGET_DESKTOP_DATE,
    cover: `/blog-covers/pixel-pet-widget-desktop-fr.png`,
    tags: M2_02_PIXEL_PET_WIDGET_DESKTOP_TAGS,
    readingMinutes: 6,
  },
  {
    slug: M2_02_PIXEL_PET_WIDGET_DESKTOP_SLUG,
    locale: 'es',
    title: 'El widget de mascota pixel ha vuelto: por qué una mascota minúscula en el escritorio es el truco de productividad del que nadie habla',
    description:
      'Un widget de mascota pixel en tu escritorio no hace nada. No agenda, no recuerda, no optimiza. Y por eso precisamente funciona. Aquí va el alegato por un pequeño compañero ambient en la barra de tareas — y por qué 2026 es su año de regreso.',
    date: M2_02_PIXEL_PET_WIDGET_DESKTOP_DATE,
    cover: `/blog-covers/pixel-pet-widget-desktop-es.png`,
    tags: M2_02_PIXEL_PET_WIDGET_DESKTOP_TAGS,
    readingMinutes: 6,
  },
];

const M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_DATE = '2026-07-22';
const M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_SLUG = 'ai-companion-for-relationship-not-replacement';
const M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_TAGS = ['ai-companion', 'relationships', 'long-distance', 'emotional-design', 'ethics'];

const m2Posts_ai_companion_for_relationship_not_replacement: BlogPost[] = [
  {
    slug: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_SLUG,
    locale: 'en',
    title: 'An AI Companion for Your Relationship, Not a Replacement for It: Where the Line Should Be',
    description:
      'An AI companion in a relationship is not a stand-in for a partner, a therapist, or a long phone call. Used right, it is the small, reliable thing that holds the daily thread between two people. Used wrong, it quietly makes the relationship skippable. Here is where the line is, and how to stay on the right side of it.',
    date: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_DATE,
    cover: `/blog-covers/ai-companion-for-relationship-not-replacement-en.png`,
    tags: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_SLUG,
    locale: 'zh-cn',
    title: 'AI 陪伴用于关系,而不是替代关系:那条线应该划在哪里',
    description:
      '关系里的 AI 陪伴,不是伴侣的替身、不是心理咨询师、也不是一通长电话的替代品。用对了,它是那个小小的、可靠的东西,撑住两个人之间的日常线索。用错了,它会悄悄让关系变得「可跳过」。那条线在哪里,以及如何站对一边,这里讲。',
    date: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_DATE,
    cover: `/blog-covers/ai-companion-for-relationship-not-replacement-zh-cn.png`,
    tags: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_SLUG,
    locale: 'zh-tw',
    title: 'AI 陪伴用於關係,而不是替代關係:那條線應該劃在哪裡',
    description:
      '關係裡的 AI 陪伴,不是伴侶的替身、不是心理諮商師、也不是一通長電話的替代品。用對了,它是那個小小的、可靠的東西,撐住兩個人之間的日常線索。用錯了,它會悄悄讓關係變得「可跳過」。那條線在哪裡,以及如何站對一邊,這裡講。',
    date: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_DATE,
    cover: `/blog-covers/ai-companion-for-relationship-not-replacement-zh-tw.png`,
    tags: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_SLUG,
    locale: 'ja',
    title: '関係を補うAIコンパニオン、関係を置き換えるものではない:線を引くべき場所',
    description:
      '関係の中のAIコンパニオンは、パートナーの代役でも、カウンセラーでも、長い電話の代用品でもありません。うまく使えば、二人の間の日常の糸をそっと支える小さな存在になります。使い方を誤れば、関係はそっと「スキップ可能」になります。その線はどこか、そして正しい側にいるための話をします。',
    date: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_DATE,
    cover: `/blog-covers/ai-companion-for-relationship-not-replacement-ja.png`,
    tags: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_SLUG,
    locale: 'ko',
    title: '관계를 위한 AI 동반자, 관계를 대체하는 것이 아닌:선은 어디에 있어야 하는가',
    description:
      '관계 안의 AI 동반자는 파트너의 대역도, 상담사도, 긴 전화의 대체품도 아닙니다. 잘 쓰면, 두 사람 사이의 일상을 가만히 잡아주는 작고 안정적인 존재가 됩니다. 잘못 쓰면, 관계를 조용히 「건너뛸 수 있는 것」으로 만듭니다. 그 선은 어디인지, 그리고 어디에 서 있어야 하는지 정리합니다.',
    date: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_DATE,
    cover: `/blog-covers/ai-companion-for-relationship-not-replacement-ko.png`,
    tags: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_SLUG,
    locale: 'de',
    title: 'KI-Begleiter für die Beziehung, nicht als Ersatz: Wo die Linie verlaufen sollte',
    description:
      'Ein KI-Begleiter in einer Beziehung ist kein Ersatz für den Partner, kein Therapeut und kein Ersatz für ein langes Telefonat. Richtig eingesetzt, ist er das kleine, verlässliche Ding, das den Alltagsfaden zwischen zwei Menschen hält. Falsch eingesetzt, macht er die Beziehung stillschweigend überspringbar. Wo die Linie ist — und wie man auf der richtigen Seite bleibt.',
    date: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_DATE,
    cover: `/blog-covers/ai-companion-for-relationship-not-replacement-de.png`,
    tags: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_SLUG,
    locale: 'fr',
    title: 'Compagnon IA pour la relation, et non à sa place : où la ligne doit être tracée',
    description:
      'Un compagnon IA dans une relation n\'est ni un substitut du partenaire, ni un thérapeute, ni un remplacement d\'un long appel. Bien utilisé, c\'est la petite chose fiable qui tient le fil du quotidien entre deux personnes. Mal utilisé, il rend la relation tranquillement contournable. Où se trouve la ligne — et comment rester du bon côté.',
    date: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_DATE,
    cover: `/blog-covers/ai-companion-for-relationship-not-replacement-fr.png`,
    tags: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_TAGS,
    readingMinutes: 7,
  },
  {
    slug: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_SLUG,
    locale: 'es',
    title: 'Compañero IA para la relación, no en lugar de ella: dónde debería estar la línea',
    description:
      'Un compañero IA en una relación no es un sustituto de la pareja, ni un terapeuta, ni el reemplazo de una llamada larga. Bien usado, es la cosa pequeña y fiable que sostiene el hilo del día a día entre dos personas. Mal usado, vuelve la relación silenciosamente saltable. Dónde está la línea — y cómo quedarse en el lado correcto.',
    date: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_DATE,
    cover: `/blog-covers/ai-companion-for-relationship-not-replacement-es.png`,
    tags: M2_02_AI_COMPANION_FOR_RELATIONSHIP_NOT_REPLACEMENT_TAGS,
    readingMinutes: 7,
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
  ...dailyPosts7,
  ...dailyPosts8,
  ...dailyPosts9,
  ...dailyPosts10,
  ...dailyPosts11,
  ...dailyPosts12,
  ...dailyPosts13,
  ...dailyPosts14,
  ...m1PostsA,
  ...m1PostsB,
  ...m1PostsC,
  ...m2Posts_daily_check_in_app_for_couples,
  ...m2Posts_virtual_pet_app_for_couples,
  ...m2Posts_how_to_feel_close_in_a_long_distance_relationship,
  ...m2Posts_pixel_pet_widget_desktop,
  ...m2Posts_ai_companion_for_relationship_not_replacement,
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