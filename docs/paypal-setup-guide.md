# PayPal 收款开通 + Sandbox 凭证获取指南（唐总专用）

> **更新（2026-07-17）**：彩龙公司 PayPal 企业账户已存在（doolen@126.com），无需新办——直接跳到【三、拿 Sandbox 凭证】，用该账户登录 developer.paypal.com 即可。提现请绑定 Airwallex 的 USD 香港账户（DBS HK，账号信息在 F:\CloudDreamerApp 的 docx 里），避开 $35/笔电汇费与 PayPal 换汇损耗。

> 目标：拿到 4 个值，配进 Cloudflare  secrets，让收银台通电。
> 全程约 20-30 分钟。**红线：密钥永远不贴到聊天里、不提交 git。**

## 一、需要的 4 个值（项目代码已读它们）

| 环境变量 | 用途 | 在哪拿 |
|---|---|---|
| `PAYPAL_CLIENT_ID`（Sandbox） | 沙盒测试 | developer.paypal.com |
| `PAYPAL_CLIENT_SECRET`（Sandbox） | 沙盒测试 | 同上 |
| `PAYPAL_CLIENT_ID`（Live） | 正式收款 | 同上切换 Live |
| `PAYPAL_CLIENT_SECRET`（Live） | 正式收款 | 同上 |
| `PAYPAL_MODE` | `sandbox` 或 `live` | 手动设置 |

## 二、开通 PayPal Business（10 分钟）

1. 打开 https://www.paypal.com/c2/home （或 paypal.com 切换中文）
2. 注册/登录 → 账户设置 → **升级为企业账户**（个人账户也可先测试，但 Live 收款建议 Business；个体身份即可，无需公司）
3. 实名认证：身份证 + 银行卡（用于后续提现）
4. 提现提示：提现到国内银行卡 **$35/笔**，建议攒到 $1000+ 再提；或用万里汇（WorldFirst）/Payoneer 结汇更划算

## 三、拿 Sandbox 凭证（5 分钟）

1. 打开 https://developer.paypal.com/dashboard/
2. 用 PayPal 账号登录 → 左侧 **Apps & Credentials**
3. 确认右上角切换在 **Sandbox**
4. **Create App** → 名字随意（如 `togthr-sandbox`）→ Merchant → Create
5. 得到 **Client ID** 和 **Secret**（点 Show 显示）→ 先存在本地密码管理器

## 四、拿沙盒测试买家账号（3 分钟）

1. 同一 Dashboard → 左侧 **Sandbox** → **Accounts**
2. 系统已预生成 Business（卖家）和 Personal（买家）两个沙盒账号
3. 记下 **Personal 买家账号**的邮箱和密码（测试付款时登录用）

## 五、配置到项目（5 分钟）

**本地开发**（`.env.local`，此文件已被 gitignore）：
```
PAYPAL_CLIENT_ID=沙盒ClientID
PAYPAL_CLIENT_SECRET=沙盒Secret
PAYPAL_MODE=sandbox
```

**生产环境**（Cloudflare Workers secrets，二选一）：
```bash
# 方式 A：命令行（在项目目录）
npx wrangler secret put PAYPAL_CLIENT_ID
npx wrangler secret put PAYPAL_CLIENT_SECRET
npx wrangler secret put PAYPAL_MODE   # 输入 live 前先完成沙盒验证

# 方式 B：网页 → Cloudflare Dashboard → Workers & Pages
#   → togthr-life → Settings → Variables and Secrets → Add (类型选 Secret)
```

## 六、验证流程（我来做，你只需说"已配置"）

1. 你配好 Sandbox 后告诉我"沙盒已配置"
2. 我触发晨间巡检/对账任务：支付接口从 503 `awaiting_paypal_config` 变为正常参数错误 = **通电确认**
3. 我下一笔沙盒测试单：定价页 → 登录 → PayPal 沙盒买家付款 → 回调 → 检查 `orders` 表状态 + `memberships` 表开通
4. 沙盒全通后，你把 Live 凭证换上 + `PAYPAL_MODE=live`，我复测一笔 $1 真实单（可退款）

## 七、Alipay（可后置，不阻塞收美元）

- 需要：**个体工商户营业执照**（免费，3-7 天）→ 企业支付宝 → 支付宝开放平台签约"电脑网站支付"
- 拿到：`ALIPAY_APP_ID` / `ALIPAY_PRIVATE_KEY` / `ALIPAY_PUBLIC_KEY`（同样配 secrets）
- 注意：togthr.life 无 ICP 备案，签约审核如要求补充网站材料，如实填写即可；被卡再议
- **建议节奏**：先用 PayPal 收海外用户（LTD $39.99 本就美元定价），Alipay 等执照办好再接

## 八、常见问题

| 问题 | 答案 |
|---|---|
| 个人账号能收款吗 | Sandbox 测试可以；Live 建议升级 Business（免费） |
| 手续费 | 跨境收款约 4.4% + 固定费；提现 $35/笔 |
| 密钥泄露了怎么办 | Dashboard → 对应 App → Rotate Secret，然后重新配 secrets |
| 需要信用卡吗 | 不需要，储蓄卡即可实名 |
