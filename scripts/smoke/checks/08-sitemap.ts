// scripts/smoke/checks/08-sitemap.ts
// Check 8 · sitemap 健康 — 读 sitemap index 累加，区间 [800,950] 守 857 基准
import { probe, makeCheck, Sub, countOf } from "../lib";

export async function check08() {
  const subs: Sub[] = [];

  // 先读 sitemap index
  const idx = await probe("/sitemap.xml").catch(() => null);
  if (!idx || idx.status !== 200) {
    return makeCheck(8, "sitemap health (count baseline 865)", [
      { name: "sitemap.xml 200", ok: false, detail: { status: idx?.status ?? 0 } },
    ]);
  }

  let total = 0;

  if (/<sitemap>/.test(idx.body)) {
    // 情况 A：sitemap index → 解析分片，逐个累加
    const locs = [...idx.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    subs.push({
      name: "sitemap index 200",
      ok: true,
      detail: { shards: locs.length },
    });

    for (const loc of locs) {
      const path = loc.replace("https://togthr.life", "").replace("https://www.togthr.life", "");
      try {
        const shard = await probe(path);
        const n = countOf(shard.body, "url");
        total += n;
        subs.push({
          name: `shard ${path} 200`,
          ok: shard.status === 200,
          detail: { urls: n },
        });
      } catch {
        subs.push({
          name: `shard ${path} 200`,
          ok: false,
          detail: { error: "fetch failed" },
        });
      }
    }
  } else {
    // 情况 B：没有 index，直接读 /sitemap-0.xml 做全量 fallback
    try {
      const s0 = await probe("/sitemap-0.xml");
      total = countOf(s0.body, "url");
      subs.push({
        name: "sitemap-0.xml 200",
        ok: s0.status === 200,
        detail: { urls: total },
      });
    } catch {
      subs.push({
        name: "sitemap-0.xml 200",
        ok: false,
        detail: { error: "fetch failed" },
      });
    }
  }

  // 核心断言：总数在 [800, 950] 缓冲区间（基准 865，±~10%）
  const inRange = total >= 800 && total <= 950;
  subs.push({
    name: "url count ∈ [800,950] (baseline 865)",
    ok: inRange,
    detail: { total },
  });

  return makeCheck(8, `sitemap health (count baseline 865, got ${total})`, subs);
}
