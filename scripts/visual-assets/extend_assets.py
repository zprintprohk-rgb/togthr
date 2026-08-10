# -*- coding: utf-8 -*-
"""数字资产扩展：128px 预览集 + 图标集 + 主题色板 JSON（v9.0 规范）"""
import os, sys, json
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

# 从绘制器导入主题色板（v9.0 4.5 单一真源）
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from draw_pet import THEMES

ROOT = r'F:\CloudDreamerApp\togthr\public\visual-assets'
SRC = os.path.join(ROOT, 'pets')
PREVIEW = os.path.join(ROOT, 'preview-128')
ICONS = os.path.join(ROOT, 'icons')

# ── 1. 128px 预览集（缩略图识别度测试用：每主题 × 每物种 idle 帧1） ──
os.makedirs(PREVIEW, exist_ok=True)
count = 0
for theme in os.listdir(SRC):
    td = os.path.join(SRC, theme)
    if not os.path.isdir(td):
        continue
    for f in os.listdir(td):
        if f.endswith('-idle-1-1024.png'):
            img = Image.open(os.path.join(td, f)).resize((128, 128), Image.NEAREST)
            out_name = f.replace('-1024.png', '-128.png')
            img.save(os.path.join(PREVIEW, f'{theme}-{out_name}'))
            count += 1
print(f'[OK] 128px 预览 {count} 张')

# ── 2. 图标集（16×16 像素图标，v9.0 6 主题色板派生，8 枚） ──
os.makedirs(ICONS, exist_ok=True)
INK = (30, 41, 59)
WHITE = (255, 255, 255)
THEME_HEX = {
    'lavender': '#C8B8D8', 'mint': '#6EE7B7', 'sakura': '#F9A8D4',
    'moonlight': '#93C5FD', 'warmorange': '#FDBA74', 'charcoal': '#6B7280',
}

def hex2rgb(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i+2], 16) for i in (0, 2, 4))

def draw_icon(name, draw_fn, color, size=16):
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    d = ImageDraw2(img)
    draw_fn(d, color)
    img.save(os.path.join(ICONS, f'icon-{name}.png'))

def ImageDraw2(img):
    from PIL import ImageDraw
    return ImageDraw.Draw(img)

# 图标绘制函数（硬边像素）
def i_paw(d, c):  # 爪印：大圆+3小圆
    d.ellipse((3, 8, 13, 15), fill=c)
    d.ellipse((2, 2, 6, 8), fill=c)
    d.ellipse((7, 1, 11, 7), fill=c)
    d.ellipse((12, 2, 16, 8), fill=c)

def i_heart(d, c):  # 爱心
    d.ellipse((2, 3, 7, 8), fill=c)
    d.ellipse((7, 3, 12, 8), fill=c)
    d.polygon([(1, 6), (13, 6), (7, 14)], fill=c)

def i_egg(d, c):  # 蛋
    d.ellipse((4, 3, 12, 15), fill=c)
    d.ellipse((6, 2, 10, 6), fill=WHITE)

def i_z(d, c):  # ZZZ 呼吸
    d.rectangle((3, 3, 13, 6), fill=c)
    d.rectangle((8, 6, 13, 9), fill=c)
    d.rectangle((3, 9, 13, 12), fill=c)

def i_sign(d, c):  # 记忆举牌
    d.rectangle((2, 3, 14, 13), fill=WHITE, outline=c, width=1)
    d.ellipse((6, 6, 10, 10), fill=c)

def i_star(d, c):  # 星星（幻想）
    d.polygon([(8, 1), (10, 6), (15, 7), (11, 10), (12, 15), (8, 12), (4, 15), (5, 10), (1, 7), (6, 6)], fill=c)

def i_leaf(d, c):  # 叶子
    d.polygon([(2, 13), (13, 3), (12, 13), (2, 13)], fill=c)
    d.line((4, 12, 11, 6), fill=WHITE, width=1)

def i_moon(d, c):  # 月亮
    d.ellipse((2, 2, 13, 13), fill=c)
    d.ellipse((6, 0, 15, 11), fill=(0, 0, 0, 0))

ICON_FNS = {
    'paw': i_paw, 'heart': i_heart, 'egg': i_egg, 'zzz': i_z,
    'sign': i_sign, 'star': i_star, 'leaf': i_leaf, 'moon': i_moon,
}
for name, fn in ICON_FNS.items():
    draw_icon(name, fn, INK)
    for theme, hexc in THEME_HEX.items():
        draw_icon(f'{name}-{theme}', fn, hex2rgb(hexc))
print(f'[OK] 图标 {(len(ICON_FNS) * 7)} 枚')

# ── 3. 主题色板 JSON（v9.0 4.5 全量，供设计/开发引用） ──
def rgb_hex(c):
    return '#' + ''.join(f'{v:02X}' for v in c)

palette = {
    'themes': {
        theme: {
            'body': {s: rgb_hex(v['body'][s]) for s in ('cat', 'dog', 'fantasy')},
            'accent': rgb_hex(v['accent']),
            'highlight': rgb_hex(v['highlight']),
            'shadow': rgb_hex(v['shadow']),
        }
        for theme, v in THEMES.items()
    },
    'spec': 'v9.0 §4.5',
    'generated': '2026-08-11',
}
with open(os.path.join(ROOT, 'theme-palette.json'), 'w', encoding='utf-8') as fh:
    json.dump(palette, fh, ensure_ascii=False, indent=2)
print('[OK] theme-palette.json')
