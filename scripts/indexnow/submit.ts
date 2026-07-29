// scripts/indexnow/submit.ts
// IndexNow 提交入口 —— 开头加 smoke 门禁，不绿不发
// 执行: npx tsx scripts/indexnow/submit.ts
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

async function main() {
  // ─── 门禁检查 ───
  const gatePath = resolve(import.meta.dirname ?? __dirname, "../../.smoke-gate.json");
  let gateFile;
  try {
    gateFile = JSON.parse(readFileSync(gatePath, "utf8"));
  } catch {
    console.warn("[indexnow] BLOCKED: no .smoke-gate.json found");
    process.exit(0);
  }

  const MAX_AGE_MS = 12 * 3600 * 1000; // 门禁文件超过 12h 视为过期
  const gateAge = Date.now() - new Date(gateFile.ts).getTime();
  const fresh = gateAge < MAX_AGE_MS;

  if (!gateFile.gateOpen || !fresh) {
    console.warn(
      `[indexnow] BLOCKED by smoke gate (open=${gateFile.gateOpen}, age=${Math.round(gateAge / 1000 / 60)}m, fresh=${fresh})`
    );
    process.exit(0);
  }

  console.log(`[indexnow] Smoke gate PASSED — proceeding with IndexNow submit...`);

  // ─── 以下是原来的 IndexNow 提交逻辑 ───
  // TODO: 接入你现有的 indexnow:new 流程
  // 例如: execSync("python scripts/indexnow-submit.py", { stdio: "inherit" });
  // 或者直接调用 indexnow-submit.py 的 Python 逻辑
}

main();
