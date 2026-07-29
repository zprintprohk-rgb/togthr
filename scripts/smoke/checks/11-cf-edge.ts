// scripts/smoke/checks/11-cf-edge.ts
// Check 11 · CF 边缘缓存 — 只抓"坏状态码被缓存成 HIT"这一致命组合
// 实测: togthr.life 当前无 cf-cache-status 头（未启用），不断言"HIT 正常"只抓致命组合
import { makeCheck, Sub } from "../lib";

const BAD_STATUS = new Set([404, 500, 502, 503, 504]);

export function check11(
  probed: { path: string; status: number; headers: Record<string, string> }[]
) {
  const subs: Sub[] = probed.map((p) => {
    const cf = (p.headers["cf-cache-status"] || "").toUpperCase();
    const cachedBad = BAD_STATUS.has(p.status) && cf === "HIT";
    return {
      name: `${p.path} not caching error (status=${p.status}, cf=${cf || "N/A"})`,
      ok: !cachedBad,
      detail: { status: p.status, cf_cache_status: cf || "absent" },
    };
  });

  // 额外: 探一个确定 404 的路径，断言 CF 没缓存它
  // 这个单独的子断言放在 runner 里做

  return makeCheck(11, "CF edge: no error page cached as HIT", subs);
}
