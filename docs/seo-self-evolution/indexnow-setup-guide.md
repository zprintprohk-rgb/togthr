# IndexNow 注册与配置指南

> **目的**: 让 togthr.life 的新内容/页面 24 小时内被 Bing / Yandex / DuckDuckGo / Seznam / Naver 收录。
>
> **当前状态**: ✅ 代码已就绪 (`scripts/ping-indexnow.cjs` + `package.json` postbuild hook), 需要的就是这一份 key。

---

## 1 分钟注册流程

### Step 1: 注册 key

打开 **https://www.bing.com/indexnow** 或 **https://yandex.com/webmaster/** (任选一家)。

填:
- **Host**: `togthr.life`
- **Key**: 点 "Generate" (系统会给一个 UUID) 或自己写 8-128 字符 hex 字符串

记下这个 key (例如 `a1b2c3d4-e5f6-7890-abcd-123456789012`)。

### Step 2: 把 key 放到域名根目录

把 key 内容存为**纯文本文件**到:

```
public/a1b2c3d4-e5f6-7890-abcd-123456789012.txt
```

文件内容只有一行, 就是 key 字符串本身。

访问 https://togthr.life/a1b2c3d4-e5f6-7890-abcd-123456789012.txt 应该返回纯文本 key。

> ⚠️ 这个文件**必须**存在, 不然 IndexNow API 会报 403。

### Step 3: 配 GitHub Secret

打开 GitHub repo: `zprintprohk-rgb/togthr` → Settings → Secrets and variables → Actions → New repository secret

- Name: `INDEXNOW_KEY`
- Value: 刚才那个 key 字符串

### Step 4: 验证 (可选, 本地)

```bash
# 在本地 .env.local 里设:
echo "INDEXNOW_KEY=a1b2c3d4-e5f6-7890-abcd-123456789012" >> .env.local

# 跑 build 试一次
npm run build

# 应该看到:
# [INDEXNOW ...] [INFO] submitting N URLs (total in sitemap: M)
# [INDEXNOW ...] [OK] batch 1/1: N URLs, HTTP 200
```

---

## 覆盖范围

| 搜索引擎 | 是否支持 IndexNow | 覆盖 |
|---|---|---|
| **Bing** | ✅ | 美国 / 欧洲 桌面搜索大头 (美国 desktop 30%+ 来自 Bing) |
| **Yandex** | ✅ | 俄罗斯 (如果未来要做 RU 市场) |
| **DuckDuckGo** | ✅ | 隐私搜索 |
| **Seznam** | ✅ | 捷克搜索 |
| **Naver** | ✅ | 韩国搜索 (KO locale 主战场!) |
| **Google** | ❌ | Google 用自己的 Search Console + sitemap, 不接 IndexNow |

**所以**: IndexNow 是 Bing 生态 + 韩国 Naver 的关键, Google 还得靠 GSC + sitemap。

---

## 配套要做的事 (跟 IndexNow 一起)

| 平台 | 用途 | 怎么接 |
|---|---|---|
| **Google Search Console** | Google 索引 + 流量分析 | https://search.google.com/search-console → 加 `togthr.life` → DNS TXT 验证 |
| **Bing Webmaster Tools** | Bing 索引 + 提交 sitemap | https://www.bing.com/webmasters → 加 `togthr.life` → DNS TXT 验证 |

两个 GSC 都建议**今天**注册, 5 分钟搞定。

---

## 失败模式

| 现象 | 原因 | 修复 |
|---|---|---|
| `[INDEXNOW] ERROR: INDEXNOW_KEY length must be 8-128 chars` | key 长度不对 | 检查 key 字符串长度 |
| `[INDEXNOW] HTTP 403` | key 文件没放到域名根目录 | 创建 `public/{KEY}.txt` |
| `[INDEXNOW] HTTP 429` | 当日配额用完 (IndexNow 限制) | 等明天, 或减少 postbuild 频率 |
| `[INDEXNOW] HTTP 400` | URL 格式错 (含中文/特殊字符) | 检查 sitemap-0.xml 里的 `<loc>` 编码 |

---

## 文件位置

- **提交脚本**: `F:\CloudDreamerApp\togthr\scripts\ping-indexnow.cjs`
- **postbuild hook**: `F:\CloudDreamerApp\togthr\package.json` → `"postbuild": "node scripts/ping-indexnow.cjs"`
- **key 验证文件**: `F:\CloudDreamerApp\togthr\public\{KEY}.txt` (创建文件后 commit + push)
- **环境变量**: `.env.production` (本地) / GitHub Actions Secret (CI)