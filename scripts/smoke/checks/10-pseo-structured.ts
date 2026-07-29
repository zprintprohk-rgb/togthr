// scripts/smoke/checks/10-pseo-structured.ts
// Check 10 · pSEO 结构化数据轮换 — hreflang / canonical / JSON-LD
// 轮换: 用 epoch 小时取模，每轮 en + 1 个其他 locale，8 轮覆盖全语言
import { probe, makeCheck, Sub, LOCALES, loadPseoSlugs } from "../lib";

// ─── 轮换逻辑 ───
const round = Math.floor(Date.now() / 1000 / 3600);

// ─── 解析工具 ───
// 大小写不敏感：React 19 可能渲染成 hrefLang（驼峰），HTML 规范接受两种形式
function parseHreflangLinks(html: string): { lang: string; href: string }[] {
  return [
    ...html.matchAll(/<link[^>]+rel="alternate"[^>]+href[lL]ang="([^"]+)"[^>]+href="([^"]+)"/gi),
  ].map((m) => ({ lang: m[1], href: m[2] }));
}

function parseHreflangs(html: string): string[] {
  return parseHreflangLinks(html)
    .map((h) => h.lang)
    .filter((h) => h !== "x-default");
}

const WWW_BASE = "https://www.togthr.life";

function parseCanonical(html: string): string | null {
  const m = html.match(
    /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i
  );
  return m ? m[1] : null;
}

function jsonLdValid(html: string): {
  ok: boolean;
  count: number;
  err?: string;
} {
  const blocks = [
    ...html.matchAll(
      /<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
    ),
  ];
  if (blocks.length === 0)
    return { ok: false, count: 0, err: "no ld+json block" };
  for (const b of blocks) {
    try {
      JSON.parse(b[1]);
    } catch (e) {
      return { ok: false, count: blocks.length, err: String(e).slice(0, 100) };
    }
  }
  return { ok: true, count: blocks.length };
}

export async function check10() {
  const subs: Sub[] = [];

  // 从注册表动态读 slug 池（48 个）
  const slugs = loadPseoSlugs();
  if (slugs.length === 0) {
    return makeCheck(10, "pSEO structured", [
      { name: "load pSEO slugs", ok: false, detail: { error: "landing-pages.ts returned 0 slugs" } },
    ]);
  }

  // 本轮抽 1 个 slug × 2 个 locale
  const slug = slugs[round % slugs.length];
  const localeIdx = 1 + (round % (LOCALES.length - 1));
  const localesThisRound = ["en", LOCALES[localeIdx]];

  for (const loc of localesThisRound) {
    const path = `/${loc}/p/${slug}`;
    const tag = `[${loc}] /p/${slug}`;

    try {
      const r = await probe(path);
      subs.push({ name: `${tag} 200`, ok: r.status === 200, detail: { status: r.status } });

      // hreflang 检查（大小写不敏感 + 解析 full href）
      const links = parseHreflangLinks(r.body);
      const langs = links.map((h) => h.lang).filter((h) => h !== "x-default");
      const setOk =
        langs.length === 8 &&
        LOCALES.every((l) => langs.includes(l)) &&
        !langs.includes("pt");
      subs.push({
        name: `${tag} hreflang ==8 & no pt`,
        ok: setOk,
        detail: { found: langs.length, expected: 8, langs },
      });

      // hreflang href 必须含 www.togthr.life（不能是裸域）
      const allHaveWww = links.every((hl) => hl.href.startsWith(WWW_BASE));
      const bareUrls = links.filter((hl) => !hl.href.startsWith(WWW_BASE)).map((hl) => hl.href);
      subs.push({
        name: `${tag} hreflang href starts with www.togthr.life`,
        ok: allHaveWww,
        detail: { bareUrls: bareUrls.length > 0 ? bareUrls : undefined },
      });

      // hreflang href 必须含对应 locale 路径段（x-default 除外，它走 en）
      const localeHrefsOk = links
        .filter((hl) => hl.lang !== "x-default")
        .every((hl) => hl.href.includes(`/${hl.lang}/`));
      const wrongLocaleUrls = links
        .filter((hl) => hl.lang !== "x-default" && !hl.href.includes(`/${hl.lang}/`))
        .map((hl) => ({ lang: hl.lang, href: hl.href }));
      subs.push({
        name: `${tag} hreflang href contains /{locale}/ path`,
        ok: localeHrefsOk,
        detail: { wrongLocaleUrls: wrongLocaleUrls.length > 0 ? wrongLocaleUrls : undefined },
      });

      // 自指检查
      subs.push({
        name: `${tag} hreflang self-ref (${loc})`,
        ok: langs.includes(loc),
        detail: { self_ref_present: langs.includes(loc) },
      });

      // canonical 检查
      const canon = parseCanonical(r.body);
      const canonOk = !!canon &&
        canon.startsWith(WWW_BASE) &&
        canon.includes(`/${loc}/`);
      subs.push({
        name: `${tag} canonical self-locale + www`,
        ok: canonOk,
        detail: { canon },
      });

      // JSON-LD 检查
      const ld = jsonLdValid(r.body);
      subs.push({
        name: `${tag} JSON-LD parseable`,
        ok: ld.ok,
        detail: ld,
      });
    } catch {
      subs.push({ name: `${tag} 200`, ok: false, detail: { error: "fetch failed" } });
    }
  }

  return makeCheck(
    10,
    `pSEO structured (round ${round}: slug=${slug}, locales=${localesThisRound.join("+")})`,
    subs
  );
}
