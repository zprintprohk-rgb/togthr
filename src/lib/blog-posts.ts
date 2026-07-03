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

export const blogPosts: BlogPost[] = launchPosts;

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
  return post.locale === 'en'
    ? `${SITE_URL}/blog/${post.slug}`
    : `${SITE_URL}/${post.locale}/blog/${post.slug}`;
}