// scripts/smoke/checks/09-machine-entries.ts
// Check 9 · 机器入口三件套 — robots + llms（含"无 pt"边界正则）
// 实测 ground truth: llms.txt 里语言以 /en/ /zh-cn 等路径片段出现
import { probe, makeCheck, Sub, LOCALES } from "../lib";

// 匹配"作为语言代码出现的 pt"——行首/斜杠/连字符/空格/引号后跟 pt 再跟斜杠/连字符/行尾
// 排除 https、script、accept、output、prompt、concept 等子串误报
const PT_AS_LANG = /(^|[\/\-\s"'])(en-)?pt([\/\-\s"'$])/mi;

export async function check09() {
  const subs: Sub[] = [];

  // ─── robots.txt ───
  try {
    const robots = await probe("/robots.txt");
    subs.push({ name: "robots.txt 200", ok: robots.status === 200 });
    subs.push({
      name: "robots has Sitemap: line",
      ok: /Sitemap:\s*\S+/i.test(robots.body),
      detail: { has_sitemap: /Sitemap:\s*\S+/i.test(robots.body) },
    });
  } catch {
    subs.push({ name: "robots.txt 200", ok: false, detail: { error: "fetch failed" } });
    subs.push({ name: "robots has Sitemap: line", ok: false });
  }

  // ─── llms.txt ───
  try {
    const llms = await probe("/llms.txt");
    subs.push({ name: "llms.txt 200", ok: llms.status === 200 });

    // 8 语言标记检测：llms.txt 内语言代码出现在路径片段如 /en/、/zh-cn 或标注 "Languages: ..."
    const missing = LOCALES.filter(
      (loc) =>
        !llms.body.includes(`/${loc}/`) &&
        !llms.body.includes(`/${loc}"`) &&
        !new RegExp(`\\b${loc.replace(/-/g, "\\-")}\\b`, "i").test(llms.body)
    );
    subs.push({
      name: "llms has all 8 locales",
      ok: missing.length === 0,
      detail: { missing },
    });

    // 不含 pt locale（边界正则，不误报 https/script 等）
    subs.push({
      name: "llms has NO pt locale",
      ok: !PT_AS_LANG.test(llms.body),
    });
  } catch {
    subs.push({ name: "llms.txt 200", ok: false, detail: { error: "fetch failed" } });
    subs.push({ name: "llms has all 8 locales", ok: false });
    subs.push({ name: "llms has NO pt locale", ok: false });
  }

  return makeCheck(9, "machine entries (robots + llms, no-pt)", subs);
}
