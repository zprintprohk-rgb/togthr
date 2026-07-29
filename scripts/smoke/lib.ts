// scripts/smoke/lib.ts — 公共探针 + 结果类型 (Check 8-11 全部复用)
// 执行: npx tsx scripts/smoke/run.ts

const BASE = "https://www.togthr.life";
const EXPECTED_LOCALES = ["en", "zh-cn", "zh-tw", "ja", "ko", "de", "fr", "es"]; // 8，无 pt
const TIMEOUT_MS = 10_000;

export type Sub = { name: string; ok: boolean; detail?: unknown };
export type Check = { id: number; title: string; pass: boolean; subs: Sub[] };

// ─── 带超时 + 1 次重试的 GET ───
export async function probe(path: string, retries = 1) {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const ctrl = new AbortController();
      const t = setTimeout(() => ctrl.abort(), TIMEOUT_MS);
      const res = await fetch(BASE + path, {
        signal: ctrl.signal,
        headers: { "user-agent": "togthr-smoke/1.0 (+monitor)" },
      });
      clearTimeout(t);
      const body = await res.text();
      return { status: res.status, body, headers: res.headers, path };
    } catch (e) {
      if (attempt === retries) throw e;
    }
  }
  throw new Error("unreachable");
}

// ─── 收拢子断言为 check ───
export function makeCheck(id: number, title: string, subs: Sub[]): Check {
  return { id, title, pass: subs.every((s) => s.ok), subs };
}

// ─── IANA 语言列表 ───
export const LOCALES = EXPECTED_LOCALES;

// ─── 从 landing-pages.ts 动态读取 slug 池 ───
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export function loadPseoSlugs(): string[] {
  const src = readFileSync(
    resolve(import.meta.dirname ?? __dirname, "../../src/lib/landing-pages.ts"),
    "utf8"
  );
  // 匹配数组里 'slug-name' 格式的字面量
  const slugs = [
    ...new Set(
      [...src.matchAll(/'([a-z][a-z0-9-]{10,})'/g)].map((m) => m[1])
    ),
  ];
  return slugs.sort();
}

// ─── 辅助 ───
export function countOf(xml: string, tag: string): number {
  return (xml.match(new RegExp(`<${tag}>`, "g")) || []).length;
}

// ─── 从 blog-posts.ts 动态读取 slug 池 ───
export function loadBlogSlugs(): string[] {
  const src = readFileSync(
    resolve(import.meta.dirname ?? __dirname, "../../src/lib/blog-posts.ts"),
    "utf8"
  );
  // Pattern 1: const XXX_SLUG = 'slug-name' (covers all variable-based slugs)
  const slugConsts = [
    ...new Set(
      [...src.matchAll(/const\s+\w*_SLUG\w*\s*=\s*'([^']+)'/g)].map((m) => m[1])
    ),
  ];
  // Pattern 2: inline slug: 'slug-name' in array entries (fallback for hand-written slugs)
  const slugInlines = [
    ...new Set(
      [...src.matchAll(/slug:\s*'([a-z][a-z0-9-]{10,})'/g)].map((m) => m[1])
    ),
  ];
  return [...new Set([...slugConsts, ...slugInlines])].sort();
}
