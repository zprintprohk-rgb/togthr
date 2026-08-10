# Togthr 视觉资产交接使用指南

> 版本：v1.0 | 日期：2026-08-11 | 依据：Togthr 整合资产规范 v9.0

## 一、目录结构

```
public/visual-assets/                  # 数字资产（生产可用）
├── pets/                              # 宠物帧资产 468 张（1024×1024 PNG-24 透明底）
│   ├── lavender/                      # 主题目录 ×6（色板见 theme-palette.json）
│   │   ├── pet-cat-idle-1-1024.png    # v9.0 §4.8 命名：pet-{物种}-{状态}-{帧}-1024.png
│   │   ├── pet-cat-blink-2-1024.png
│   │   └── ...                        # 每主题 78 帧 = 3 物种 × 10 状态 × 帧序列
│   ├── mint/ sakura/ moonlight/ warmorange/ charcoal/
├── preview-128/                       # 128px 缩略图预览（Widget 8:1 显示测试）
├── icons/                             # 16×16 像素图标 56 枚（8 图标 × 6 主题 + 黑白）
└── theme-palette.json                 # v9.0 §4.5 主题色板（程序唯一真源）

docs/visual-assets/                    # 文档与实体生产稿
├── blueprint.md                       # 执行蓝图（附件解析/任务/排期/风险）
├── visual-assets-ledger.csv           # 资产台账 553 条（可追溯）
├── compliance-report.md               # 合规校验报告（v9.0 逐项对照）
├── handoff-guide.md                   # 本文档
└── physical/                          # 实体生产稿（300dpi CMYK）
    ├── share-card-a6-cmyk-300dpi.pdf        # 分享卡 A6
    ├── instruction-card-cmyk-300dpi.pdf     # 说明书
    ├── sticker-sheet-a4-cmyk-300dpi.pdf     # 贴纸拼版 A4（18 款）
    ├── box-dieline-cmyk-300dpi.pdf          # 包装盒展开图（100³mm）
    ├── mold-profile-cat-idle-bitmap.png     # 硅胶开模二值轮廓
    ├── mold-profile-cat-idle.svg            # 开模矢量轮廓（Illustrator 可编辑）
    └── *-preview.png                        # 各稿 RGB 预览
```

## 二、命名规则（强制）

| 资产 | 规则 | 示例 |
|---|---|---|
| 宠物帧 | `pet-{species}-{state}-{frame}-1024.png`，全小写连字符，主题为目录层级 | `pet-dog-greet-3-1024.png` |
| 预览 | 同命名 + 尺寸后缀 | `lavender-pet-cat-idle-1-128.png` |
| 图标 | `icon-{name}.png` / `icon-{name}-{theme}.png` | `icon-heart-sakura.png` |
| 生产稿 | `{用途}-{规格}-cmyk-300dpi.pdf` | `box-dieline-cmyk-300dpi.pdf` |

## 三、显示端映射（v9.0 §4.6）

| 场景 | 源文件 | 显示尺寸 | CSS |
|---|---|---|---|
| Widget | 1024 → 128px | 128×128 | `image-rendering: pixelated` |
| App 主界面 | → 256px | 256×256 | 同上 |
| 建造预览 | → 320px | 320×320 | 同上 |
| 分享卡 | → 512px | 512×512 | 同上 |
| 官网 Hero | 原尺寸 | 1024×1024 | 原图 |

## 四、更新与维护

1. **改色**：只改 `draw_pet.py` 的 `THEMES` → 重跑 `python scripts/visual-assets/draw_pet.py` → 全量重生成 → 重跑 `verify_assets.py` 校验
2. **加状态**：`FRAME_COUNT` 加条目 + `draw_face/draw_fx` 加分支 → 重生成
3. **加物种**：`THEMES` 每主题加 body 色 + `draw_ears/draw_tail/draw_face` 加分支
4. **任何变更后**：`gen_ledger.py` 重生成台账（版本号递增 v1.0 → v1.1），修改 compliance-report.md 的修正记录
5. **实体生产稿**：改印刷参数（出血/尺寸）在 `physical_assets.py` 顶部常量

## 五、后续可延续方向

- 路线 B（3D 卡通渲染）：方案文档建议 MiniMax Image-01 参考链工作流，需 API Key；切换时保留本像素资产为"经典款"
- 动画帧接入：idle/blink/greet 等帧序列已按帧数生成，可直接接入 BuddyAvatar 的 STATE_FRAME_MAP（替换现有 512×64 sprite）
- 更多实体形态：马克杯/帆布袋等，复用 `pets/` 源文件 300dpi 导出即可
