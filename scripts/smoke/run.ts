// scripts/smoke/run.ts
// 编排 check 8-11 + 门禁文件 .smoke-gate.json
// 执行: npx tsx scripts/smoke/run.ts
import { check08 } from "./checks/08-sitemap";
import { check09 } from "./checks/09-machine-entries";
import { check10 } from "./checks/10-pseo-structured";
import { check11 } from "./checks/11-cf-edge";
import { probe, Check } from "./lib";
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";

async function main() {
  console.log("🚀 togthr.life smoke check 8-11 starting...\n");

  const c8 = await check08();
  console.log(`[${c8.pass ? "✅" : "❌"}] Check 8: ${c8.title}`);
  for (const s of c8.subs) {
    console.log(`    ${s.ok ? "  OK" : "  FAIL"} | ${s.name}`);
  }

  const c9 = await check09();
  console.log(`\n[${c9.pass ? "✅" : "❌"}] Check 9: ${c9.title}`);
  for (const s of c9.subs) {
    console.log(`    ${s.ok ? "  OK" : "  FAIL"} | ${s.name}`);
  }

  const c10 = await check10();
  console.log(`\n[${c10.pass ? "✅" : "❌"}] Check 10: ${c10.title}`);
  for (const s of c10.subs) {
    console.log(`    ${s.ok ? "  OK" : "  FAIL"} | ${s.name}`);
  }

  // check11 复用已有页面 + 额外探几个关键路径 + 已知 404 验证
  const probed = await Promise.all(
    ["/en", "/zh-cn", "/sitemap.xml", "/llms.txt", "/robots.txt"].map(
      async (p) => {
        try {
          const r = await probe(p);
          return {
            path: p,
            status: r.status,
            headers: Object.fromEntries(r.headers.entries()),
          };
        } catch {
          return { path: p, status: 0, headers: {} };
        }
      }
    )
  );

  // 额外: 探一个确定应 404 的路径，断言 CF 没缓存它
  try {
    const r404 = await probe("/__smoke_should_404__").catch(() => null);
    if (r404) {
      probed.push({
        path: "/__smoke_should_404__",
        status: r404.status,
        headers: Object.fromEntries(r404.headers.entries()),
      });
    }
  } catch {
    probed.push({ path: "/__smoke_should_404__", status: 0, headers: {} });
  }

  const c11 = check11(probed);
  console.log(`\n[${c11.pass ? "✅" : "❌"}] Check 11: ${c11.title}`);
  for (const s of c11.subs) {
    console.log(`    ${s.ok ? "  OK" : "  FAIL"} | ${s.name}`);
  }

  const all: Check[] = [c8, c9, c10, c11];
  const gateOpen = all.every((c) => c.pass);

  // 写门禁文件
  const gatePath = resolve(import.meta.dirname ?? __dirname, "../../.smoke-gate.json");
  writeFileSync(
    gatePath,
    JSON.stringify(
      {
        ts: new Date().toISOString(),
        gateOpen,
        failed: all.filter((c) => !c.pass).map((c) => c.id),
        summary: all.map((c) => ({
          id: c.id,
          title: c.title,
          pass: c.pass,
          subPass: c.subs.filter((s) => s.ok).length,
          subTotal: c.subs.length,
        })),
      },
      null,
      2
    )
  );

  const totalSubPass = all.reduce((acc, c) => acc + c.subs.filter((s) => s.ok).length, 0);
  const totalSub = all.reduce((acc, c) => acc + c.subs.length, 0);
  const totalOk = all.filter((c) => c.pass).length;

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`📊 Result: ${totalOk}/${all.length} checks PASS (${totalSubPass}/${totalSub} sub-assertions)`);
  console.log(`🔒 Gate: ${gateOpen ? "OPEN ✅" : "CLOSED ❌"}`);
  console.log(`📄 Gate file: ${gatePath}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

  if (!gateOpen) {
    process.exitCode = 1;
  }
}

main();
