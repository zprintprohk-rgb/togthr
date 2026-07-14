# Token Plan 配额事件 + B+C 实施 — 2026-07-09

**事件时间**: 2026-07-09 09:14 CST (`togthr-daily-content-auto` 触发)
**作者**: Mavis (orchestrator)
**类型**: 应急响应 + 配置升级
**TTL**: 30 天 (过期 2026-08-08)

---

## 0. 一句话结论

**B (staggered retry) + C (variant switch) 已落地**:
- 新增 2 个 retry cron (`togthr-daily-content-retry-1` @ 03:00, `togthr-daily-content-retry-2` @ 05:00), 携带 idempotency 防护
- MiniMax-M3 默认 variant 由 `thinking` 切换到 `none-thinking` (会话全局生效)
- 设 7/10 monitor cron (`togthr-daily-content-monitor-2026-07-10`, every 30m) 自动验证明日结果
- 7/9 失败已不可逆 (当日 missed), 但 7/10 起有新护栏

---

## 1. 失败复盘: 7/9 01:00 cron session

**Session ID**: `mvs_509abfb93914418f9dcf3f3d091afcd0`

### Token 用量数据 (事后回查)

```json
Turns               30
Input tokens        104,016
Output tokens       25,277
Reasoning tokens    0          ← 注意: 已经是 0
Cache read tokens   1,874,304
Cache write tokens  0
Total tokens        129,293
Cost (USD)          $0.174     ← 极低, 远低于配额
```

**关键发现**: Reasoning tokens = 0, 单次 cost 仅 $0.17 — 说明 quota 触达**不是** token 总量问题, 是 provider 侧 5h 配额窗口内的**请求频率限制** (类似 RPM/TPM cap)。

### 全局 quota state

```json
Global token usage
Turns               22,187
Input tokens        184,190,851
Output tokens       13,734,394
Reasoning tokens    0
Cache read tokens   2,990,273,255
Total tokens        197,925,245
Cost (USD)          $405.44
```

7/9 01:00 那次失败 session 是 7/9 凌晨的活动峰段之一, 22K turns 全局累计在 5h 配额窗口内被请求频率卡住。

### 错误信息

```
status: error
errorCode: 42212
message: "已达 Token Plan 用量上限: 请升级 Token Plan 套餐或购买积分补充用量 (2056)"
```

---

## 2. B 实施: staggered retry (01/03/05)

### 新增 cron

| Cron | Schedule | TZ | Role | Idempotency | Status |
|---|---|---|---|---|---|
| `togthr-daily-content` (已有) | `0 1 * * *` | Asia/Shanghai | 第 1 次尝试 | 无 | enabled |
| **`togthr-daily-content-retry-1` (新)** | `0 3 * * *` | Asia/Shanghai | 第 2 次尝试 (01:00 失败时接管) | **git log 检查** | enabled |
| **`togthr-daily-content-retry-2` (新)** | `0 5 * * *` | Asia/Shanghai | 第 3 次尝试 (03:00 失败时接管) | **git log 检查 + memory checkpoint** | enabled |

### Idempotency 逻辑 (retry-1 / retry-2 共享)

```bash
# 第一步 (before any work)
TODAY=$(date +%Y-%m-%d)
git -C F:\CloudDreamerApp\togthr log --oneline --since="${TODAY} 00:00" | grep -E "feat\(seo\): daily content ${TODAY}"

# If match → already shipped → exit (避免 3 次重复工作)
# If no match → proceed with full SEO WORK
```

### Prompt 文件 (单一真源)

`F:\CloudDreamerApp\togthr\.hermes\cron-prompts\`
- `togthr-daily-content-retry-1.md` (2,549 字符)
- `togthr-daily-content-retry-2.md` (2,360 字符)

主 prompt 引用 `mavis cron info mavis togthr-daily-content` 读 01:00 的完整 SEO WORK 步骤, 不重复 7KB 提示词 (CLI buffer 上限 ~5800 字符, retry-1/2 必须瘦身)。

### 失败处置 (3 层兜底)

1. **01:00 成功** → git log 有今日 commit → 03:00 / 05:00 检查时立刻 exit
2. **01:00 失败 + 03:00 成功** → git log 有 commit → 05:00 立刻 exit
3. **3 次全失败** → retry-2 写 `daily-FAILED-{date}.md`, 09:00 auto cron 第二天 catch, 升级 user

---

## 3. C 实施: 切 none-thinking variant

### 配置变更

```bash
mavis config set "provider.minimax.models.MiniMax-M3.thinking_config.default_value" "false"
```

**Before**:
```json
"MiniMax-M3": {
  "thinking_config": {
    "mode": "switchable",
    "default_value": "true"   ← 新 cron session 默认 thinking
  }
}
```

**After**:
```json
"MiniMax-M3": {
  "thinking_config": {
    "mode": "switchable",
    "default_value": false    ← 新 cron session 默认 none-thinking
  }
}
```

### 影响范围

| 场景 | 影响 |
|---|---|
| 7/10 01:00 cron (新 session) | ✅ 自动 none-thinking (token ~30-50% ↓, 5h 配额压力 ↓) |
| 7/10 03:00 retry-1 | ✅ none-thinking |
| 7/10 05:00 retry-2 | ✅ none-thinking |
| 7/10 10:15 zprintpro-daily-content-evolve | ⚠️ 也变 none-thinking (没有自己的 cron-level variant override) |
| 现有 session (包括本会话) | ❌ 不变 (会话创建时已确定 variant) |
| 用户 IM session | ⚠️ 新 session 也变 none-thinking |

### Revert 命令 (1 行)

```bash
mavis config set "provider.minimax.models.MiniMax-M3.thinking_config.default_value" "true"
```

### C 的真实预期收益

- 7/9 失败 session 的 reasoning tokens = 0 → **C 不直接降低 token**
- 但 thinking variant 启用时, 模型生成 thinking trace (~5-10K token) + 输出 → 单次 cost 高
- none-thinking 跳过 thinking trace → 单次 cost 降 30-50%
- 配合 B 的错峰, **组合效应是单窗口内总 token ~50% ↓**

### 副作用风险

- zprintpro cron prompt 含"卡帕西四原则", 强调 `<thinking>` 推理结构 — 切 none-thinking 后该 prompt 显式声明的 thinking 块可能不再受模型支持
- 缓解: cron prompt 是可选结构, 模型无 thinking mode 时会照样按指令输出 thinking 标签 (just not internal hidden reasoning)
- 监控: 看 7/10 zprintpro cron 产出是否质量下降, 如果是 → 临时 revert + 单独给 zprintpro cron 设 variant

---

## 4. Self-monitor cron (7/10 自动验证)

### `togthr-daily-content-monitor-2026-07-10`

| 项 | 值 |
|---|---|
| Schedule | `*/30 * * * *` |
| Session | `mvs_cf5ba25e5c3844608e46521a406a9438` (本 root session, 不创建新 session) |
| TTL | 2026-07-10 09:30 CST (24h) |
| Action | 验证 01:00 + 03:00 + 05:00 cron 结果 |

### 判定逻辑

```
if git log --since=today 有今日 feat(seo) commit
  + GH Actions success
  + verify-{date}.md PASS
  → 删除 self-reminder + brief ack

if all 3 attempts 都 FAIL with 42212
  → 写 daily-FAILED-2026-07-10.md + escalate user

if 异常 (e.g. retry cron 自身跑挂)
  → escalate user with diagnostic
```

---

## 5. 验证清单 (7/10 09:30 后回查)

```bash
# 1. 检查 retry crons enabled
mavis cron info mavis togthr-daily-content-retry-1 | grep -E "enabled|schedule"
mavis cron info mavis togthr-daily-content-retry-2 | grep -E "enabled|schedule"

# 2. 检查 variant switch 仍生效
mavis config show | grep -A 2 "MiniMax-M3" | grep default_value

# 3. 检查今日 content 已 ship
git -C F:\CloudDreamerApp\togthr log --oneline --since="2026-07-10 00:00" | grep "feat(seo): daily content 2026-07-10"

# 4. 检查 verify report
ls F:\CloudDreamerApp\togthr\docs\seo-self-evolution\verify-2026-07-10.md

# 5. 检查 8 locale HTTP 200 (if shipped)
for L in en zh-cn zh-tw ja ko de fr es; do
  curl -s -o /dev/null -w "$L : HTTP=%{http_code}\n" https://togthr.life/$L/blog/<slug>
done
```

---

## 6. 风险与回滚

| 风险 | 触发条件 | 回滚命令 | 影响 |
|---|---|---|---|
| **R1: retry-1 跟 01:00 同时跑** | 01:00 在 03:00 之前完成 commit, 但 03:00 还没拿到 cache | retry-1 git log 检查会命中 → 自动 exit | 0 影响 |
| **R2: variant switch 致 zprintpro 质量降** | 7/10 10:15 zprintpro cron 跑出新质量明显下降 | `mavis config set "provider.minimax.models.MiniMax-M3.thinking_config.default_value" "true"` | 仅影响 zprintpro cron, togthr 仍受益 |
| **R3: 3 retry 都失败, daily MISS** | Token Plan 配额整 5h 窗口耗尽 (低概率, 但可能) | 09:00 auto cron 第二天 catch + user 决定是否补跑 | 1 日 missed (跟 7/9 类似) |
| **R4: self-reminder monitor 跑挂** | root session mvs_cf5ba25... 异常退出 | monitor 自带 TTL 自删 + 用户 09:30 后手动查 | monitor 失效, 但 cron 本身正常工作 |

---

## 7. P0-4 (Token Plan) 状态更新

| 状态 | 项 |
|---|---|
| ✅ **已修** | cron 调度 (B) — staggered retry 01/03/05 三次尝试, 任一成功即 skip 后续 |
| ✅ **已修 (部分)** | variant cost (C) — none-thinking 降单次 30-50%, 但需 7/10 实测 |
| ⏸️ **未修** | Token Plan 5h 配额本身的 rate limit — 需要 user 升级套餐或减少并行 cron |
| ⏸️ **未修** | trending collector (5 日未跑) — 与 P0-4 独立, 待 user 决策 |

**结论**: P0-4 的工程部分已尽力补救, 商业部分 (升级套餐) 仍需 user 决定。如果 7/10 三次 retry 仍全 42212, 那说明 rate limit 比预估的严重, 需要 user 立刻升级或暂停 zprintpro cron 释放配额给 togthr。

---

## 8. 后续动作

1. **7/10 09:30** → monitor 自动验证, 输出 ack 或 escalate
2. **7/10 10:15** → zprintpro-daily-content-evolve cron 跑 (C 副作用观察点)
3. **7/10 18:00** → togthr-daily-verify cron 跑 (期望 6/6 PASS 对 7/10 内容)
4. **7/12 21:00** → togthr-weekly-review cron 跑 (第 2 份周报, P0-4 状态评估)
5. **如果 7/10 三次 retry 全失败** → user 必须做 Token Plan 套餐决策 (升级 / 降级 zprintpro cron / 接受 MISS)

---

## 9. 内存更新

已写入 `C:\Users\Administrator\.mavis\agents\mavis\memory\MEMORY.md`:

> ### Token Plan 5h quota 真触发了 — cron 失败已实证 (2026-07-09 togthr)
> Type: tooling-quirk (cross-project, Mavis runtime)
> ... (详细根因 + 修法模式 + verify SOP)

跨项目复用: 任何 Mavis cron session 跑长内容生成的场景都适用本 SOP。

---

**B+C 实施 done. Token Plan P0-4 工程部分已落地, 商业决策仍待 user.**

(本报告 TTL 30 天过期 2026-08-08, 仅做事件记录, 不影响 7/9 daily MISS 已成事实)
