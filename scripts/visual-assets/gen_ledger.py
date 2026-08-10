# -*- coding: utf-8 -*-
"""资产台账生成：全量登记 CSV + 规范条目对照（v9.0）"""
import os, csv, sys, json, datetime

sys.stdout.reconfigure(encoding='utf-8')

ROOT = r'F:\CloudDreamerApp\togthr\public\visual-assets'
PHYS = r'F:\CloudDreamerApp\togthr\docs\visual-assets\physical'
OUT_CSV = r'F:\CloudDreamerApp\togthr\docs\visual-assets\visual-assets-ledger.csv'
TODAY = '2026-08-11'

rows = []
# 1. 宠物帧资产（468）
pets_root = os.path.join(ROOT, 'pets')
for theme in sorted(os.listdir(pets_root)):
    td = os.path.join(pets_root, theme)
    if not os.path.isdir(td):
        continue
    for f in sorted(os.listdir(td)):
        p = os.path.join(td, f)
        size_kb = os.path.getsize(p) // 1024
        # 解析命名 pet-{species}-{state}-{frame}-1024.png
        parts = f[:-len('-1024.png')].split('-')
        species, state, frame = parts[1], parts[2], parts[3]
        rows.append([f, 'digital/pet', theme, species, state, frame, '1024×1024', f'{size_kb}KB', 'v1.0', TODAY, 'v9.0 §4.1-4.8', os.path.join('public/visual-assets/pets', theme, f)])

# 2. 128px 预览（18）
pv = os.path.join(ROOT, 'preview-128')
for f in sorted(os.listdir(pv)):
    rows.append([f, 'digital/preview', '-', '-', '-', '-', '128×128', '-', 'v1.0', TODAY, 'v9.0 §4.6.1 (Widget 8:1)', os.path.join('public/visual-assets/preview-128', f)])

# 3. 图标（56）
ic = os.path.join(ROOT, 'icons')
for f in sorted(os.listdir(ic)):
    rows.append([f, 'digital/icon', '-', '-', '-', '-', '16×16', '-', 'v1.0', TODAY, 'v9.0 §4.5 配色派生', os.path.join('public/visual-assets/icons', f)])

# 4. 色板 JSON
rows.append(['theme-palette.json', 'digital/palette', '-', '-', '-', '-', '-', '-', 'v1.0', TODAY, 'v9.0 §4.5', 'public/visual-assets/theme-palette.json'])

# 5. 实体生产稿（5 件 + 预览）
phys_files = [
    ('share-card-a6-cmyk-300dpi.pdf', 'physical/share-card', 'A6 105×148mm+出血3mm', 'v9.0 §5 分享卡', 'docs/visual-assets/physical/share-card-a6-cmyk-300dpi.pdf'),
    ('instruction-card-cmyk-300dpi.pdf', 'physical/instruction', 'A6 105×148mm+出血3mm', 'v9.0 §5 说明书', 'docs/visual-assets/physical/instruction-card-cmyk-300dpi.pdf'),
    ('sticker-sheet-a4-cmyk-300dpi.pdf', 'physical/sticker', 'A4 18款 8.7cm+出血', 'v9.0 §4.7.1 贴纸 300dpi', 'docs/visual-assets/physical/sticker-sheet-a4-cmyk-300dpi.pdf'),
    ('box-dieline-cmyk-300dpi.pdf', 'physical/box', '100³mm tuck-end 展开图', 'v9.0 §5 包装定制盒 FSC', 'docs/visual-assets/physical/box-dieline-cmyk-300dpi.pdf'),
    ('mold-profile-cat-idle-bitmap.png', 'physical/mold', '1024 二值轮廓', 'v9.0 §4.7.2 硅胶开模', 'docs/visual-assets/physical/mold-profile-cat-idle-bitmap.png'),
    ('mold-profile-cat-idle.svg', 'physical/mold', '1024 矢量轮廓', 'v9.0 §4.7.2 开模 SVG', 'docs/visual-assets/physical/mold-profile-cat-idle.svg'),
    ('share-card-a6-preview.png', 'physical/preview', '预览', '—', 'docs/visual-assets/physical/share-card-a6-preview.png'),
    ('instruction-card-preview.png', 'physical/preview', '预览', '—', 'docs/visual-assets/physical/instruction-card-preview.png'),
    ('sticker-sheet-preview.png', 'physical/preview', '预览', '—', 'docs/visual-assets/physical/sticker-sheet-preview.png'),
    ('box-dieline-preview.png', 'physical/preview', '预览', '—', 'docs/visual-assets/physical/box-dieline-preview.png'),
]
for f, cat, spec, ref, path in phys_files:
    p = os.path.join(PHYS, f)
    size_kb = os.path.getsize(p) // 1024 if os.path.exists(p) else 0
    rows.append([f, cat, '-', '-', '-', '-', spec, f'{size_kb}KB', 'v1.0', TODAY, ref, path])

# 写 CSV
with open(OUT_CSV, 'w', newline='', encoding='utf-8-sig') as fh:
    w = csv.writer(fh)
    w.writerow(['文件名', '分类', '主题', '物种', '状态', '帧', '尺寸/规格', '大小', '版本', '生成日期', '规范条目', '路径'])
    w.writerows(rows)

print(f'[OK] 台账 {len(rows)} 条 → {OUT_CSV}')

# 统计摘要
from collections import Counter
cats = Counter(r[1] for r in rows)
for c, n in cats.most_common():
    print(f'  {c}: {n}')
