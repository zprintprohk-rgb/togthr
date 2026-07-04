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
    title: 'Ce que votre animal virtuel remarque en silence',
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

export const blogPosts: BlogPost[] = [...launchPosts, ...dailyPosts, ...dailyPosts2];

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