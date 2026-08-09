"""
Togthr Buddy V2.1 — 像素风高清 SVG 生成器
==============================================
设计原则:
  - 32×32 像素网格, 每像素 = 1 个 SVG <rect>
  - 保留 K2.6 像素风灵魂 (16-bit 拓麻歌子 DNA, 角色感, 手工感)
  - 修正 K2.6 技术错误 (天线 / 黑洞 / 接缝)
  - 每个 <rect> 对应 3D 打印的 1 个 voxel (实体建模直接可用)
  - 主题切换: 替换调色板即可, 像素地图不变

输入:  THEME = {body, accent, outline, glow, eye, sparkle, mouth, shadow}
       LAYOUT = 多行字符串, 每字符 = 1 像素
输出:  SVG 文件 (32×32 viewBox, 透明背景, 独立 rect 路径)
"""
import sys
import re
from pathlib import Path

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 6 主题调色板 (与 K3 §2.4 V2.1 主题表对应)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
THEMES = {
    'lavender': {  # 继承 K2.6 主色
        'body':    '#C8B8D8',  # 梦境紫
        'accent':  '#A898B8',  # 深紫 (手/耳内侧)
        'outline': '#4A3A5A',  # 暖深紫 (非纯黑, 紫色主题协调)
        'glow':    '#FF8E72',  # 暖橙光晕
        'eye':     '#2D2D3A',  # 眼睛
        'sparkle': '#FFFFFF',  # 眼睛高光 (防黑洞核心)
        'mouth':   '#5A4A42',  # 嘴 (暖棕)
        'blush':   '#E8A4B4',  # 腮红 (柔粉)
        'shadow':  '#4A3A5A',  # 接地阴影
    },
    'mochi': {
        'body':    '#E8D5B8', 'accent':  '#C8A88A', 'outline': '#8B7355',
        'glow':    '#FF8E72', 'eye':     '#2D2D3A', 'sparkle': '#FFFFFF',
        'mouth':   '#5A4A42', 'blush':   '#E8A4A4', 'shadow':  '#8B7355',
    },
    'berry': {
        'body':    '#E8C4C4', 'accent':  '#C89898', 'outline': '#8B6B6B',
        'glow':    '#FF8E72', 'eye':     '#2D2D3A', 'sparkle': '#FFFFFF',
        'mouth':   '#5A4A42', 'blush':   '#D88898', 'shadow':  '#8B6B6B',
    },
    'cocoa': {
        'body':    '#C8B8A8', 'accent':  '#A89080', 'outline': '#6B5B4F',
        'glow':    '#FF8E72', 'eye':     '#2D2D3A', 'sparkle': '#FFFFFF',
        'mouth':   '#5A4A42', 'blush':   '#C89888', 'shadow':  '#6B5B4F',
    },
    'sky': {
        'body':    '#B8D0E0', 'accent':  '#90B8C8', 'outline': '#5A7A8A',
        'glow':    '#FF8E72', 'eye':     '#2D2D3A', 'sparkle': '#FFFFFF',
        'mouth':   '#5A4A42', 'blush':   '#A8C0D0', 'shadow':  '#5A7A8A',
    },
    'forest': {
        'body':    '#B8D4C0', 'accent':  '#90C0A8', 'outline': '#5A8A6A',
        'glow':    '#FF8E72', 'eye':     '#2D2D3A', 'sparkle': '#FFFFFF',
        'mouth':   '#5A4A42', 'blush':   '#A8C0A8', 'shadow':  '#5A8A6A',
    },
}

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 32×32 像素地图
# 字符 → 调色板 key (空 = 透明)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 关键设计点:
#   - 头部: 圆球, 略大 (y=4..14, 11 行)
#   - 身体: 上窄下宽 (y=15..23), 下半身加宽 2 行 (K2.6 没有)
#   - 手: 融进身体轮廓 (行 17-22 用 A 字符标 accent 色, 与身同系统)
#   - 脚: 身体色 + 底部阴影 (y=24-27 = 身体色, y=28 = outline 阴影)
#   - 光晕: 3×3 暖橙 G 字符 (y=1..3, x=14..16)
#   - 眼睛: E 主 + S 高光 (高光独立路径, 防黑洞)
#   - 嘴: M 暖棕弧线 (3 像素)
#   - 腮红: B 柔粉 (行 11, x=8..9 / 22..23)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
LAYOUT = """
................................
............GGG.................
...........GGGGG................
...........GGGGG................
...........PPPPP................
..........PLLLLLLP..............
.........PLLLLLLLLP.............
........PLLEELLLLEELP...........
........PLEEELLLLEEELP..........
........PLEELLLLLEELP...........
........PLLLLLLLLLLLP...........
........PLLBBLLLLBBLLP..........
........PLLLLMMMMLLLLLP.........
........PLLLLLLLLLLLLP..........
........PLLLLLLLLLLLLP..........
.........PLLLLLLLLLLLP..........
..........PLLLLLLLLLP...........
..........AAAAAAAAAA...........
.........ALLLLLLLLLLA..........
........ALLLLLLLLLLLLA.........
.......ALLLLLLLLLLLLLLA.......
......ALLLLLLLLLLLLLLLLA......
.....ALLLLLLLLLLLLLLLLLLA.....
......ALLLLLLLLLLLLLLLLA......
.......ALLLLLLLLLLLLLLA.......
........PPPPPPPPPPPPPPP........
.........PLLLLLLLLLLLP..........
.........PLLLLLLLLLLLP..........
.........PPPPPPPPPPPPPP........
...........OOOOOOOOOO...........
................................
................................
"""

# 字符 → 调色板 key
CHAR_MAP = {
    'L': 'body',      # 身体主色
    'A': 'accent',    # 点缀色 (手/耳内侧)
    'P': 'outline',   # 轮廓
    'G': 'glow',      # 暖橙光晕 (3×3)
    'E': 'eye',       # 眼睛
    'S': 'sparkle',   # 眼睛高光 (防黑洞)
    'M': 'mouth',     # 嘴
    'B': 'blush',     # 腮红
    'O': 'shadow',    # 接地阴影
}

# 优化: 把高光 S 单独嵌入 (LAYOUT 里 S 不在 LAYOUT 内, 脚本根据 E 位置自动加点)
# 实际上, 为了让眼睛高光像 K2.6 一样在眼右上方, 我手动加在 E 的邻居位
# V2.1 优化版 (相对上一版):
#   - 眼睛: 2×2 → 3×3 (3 列 × 3 行) + 1×1 高光 (更萌)
#   - 手: 1 像素宽 → 3 像素宽 (手融身体但凸出)
#   - 下半身: 比上半身宽 2 列 (K3 规范)
#   - 嘴: 3 像素 → 4 像素 (4 像素弧度)
#   - 腮红: 2 像素 → 2×2 块
#   - 光晕: 3×3 保留 (暖橙 #FF8E72)
LAYOUT_WITH_SPARKLES = """
................................
............GGG.................
...........GGGGG................
...........GGGGG................
...........PPPPP................
..........PLLLLLLP..............
.........PLEEESLLEESLLP.........
.........PLEEESLLEESLLP.........
.........PLEEELLLLEELLLP........
.........PLLLMMMMLLLLP.........
.........PLLBBLLBBLLLP.........
..........PLLLLLLLLLP...........
..........PLLLLLLLLLP...........
...........PLLLLLLLP...........
............PLLLLLP............
............PPPPPPPPP...........
...........PLLLLLLLLP..........
..........APLLLLLLLLLPA........
.........AAPLLLLLLLLLPPAA......
........AAAPLLLLLLLLLPPPAAA.....
........AAAPLLLLLLLLLPPPAAA.....
.........AAPLLLLLLLLLPPAA......
..........APLLLLLLLLLPA........
...........PLLLLLLLLLP.........
...........PPPPPPPPPPPP.........
............PLLLLLLLLP.........
............PLLLLLLLLP.........
............PPPPPPPPPP.........
............OOOOOOOOOO.........
................................
................................
"""


def layout_to_pixels(layout_text):
    """多行字符串 → [(x, y, char), ...] 列表 (跳过 '.')"""
    pixels = []
    for y, line in enumerate(layout_text.splitlines()):
        if not line.strip():
            continue
        for x, ch in enumerate(line):
            if ch != '.':
                pixels.append((x, y, ch))
    return pixels


def pixels_to_svg(pixels, theme, viewbox=32):
    """像素列表 → SVG 文件内容 (每个像素 = 1 个 <rect>)"""
    parts = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {viewbox} {viewbox}" '
        f'width="{viewbox}" height="{viewbox}" shape-rendering="crispEdges" '
        f'role="img" aria-label="Togthr Buddy V2.1 pixel art">',
        '  <!-- V2.1 像素风, 32×32 网格, 每像素 = 1 rect, 实体建模 voxel 映射 -->',
        f'  <g class="buddy-v21" data-theme="{theme_name}">',
    ]

    # 独立路径分组 (防黑洞关键: 白色高光独立 group)
    parts.append('    <!-- 身体像素 (主题色) -->')
    parts.append('    <g class="body-pixels">')
    for x, y, ch in pixels:
        if ch == 'L':
            parts.append(f'      <rect x="{x}" y="{y}" width="1" height="1" fill="{palette["body"]}"/>')
    parts.append('    </g>')

    parts.append('    <!-- 像素光晕 (3×3, CSS 动画) -->')
    parts.append('    <g class="glow-pixels">')
    for x, y, ch in pixels:
        if ch == 'G':
            parts.append(f'      <rect x="{x}" y="{y}" width="1" height="1" fill="{palette["glow"]}"/>')
    parts.append('    </g>')

    parts.append('    <!-- 轮廓像素 -->')
    parts.append('    <g class="outline-pixels">')
    for x, y, ch in pixels:
        if ch == 'P':
            parts.append(f'      <rect x="{x}" y="{y}" width="1" height="1" fill="{palette["outline"]}"/>')
    parts.append('    </g>')

    parts.append('    <!-- 点缀色 (手/耳内侧) -->')
    parts.append('    <g class="accent-pixels">')
    for x, y, ch in pixels:
        if ch == 'A':
            parts.append(f'      <rect x="{x}" y="{y}" width="1" height="1" fill="{palette["accent"]}"/>')
    parts.append('    </g>')

    parts.append('    <!-- 眼睛 (深色) -->')
    parts.append('    <g class="eye-pixels">')
    for x, y, ch in pixels:
        if ch == 'E':
            parts.append(f'      <rect x="{x}" y="{y}" width="1" height="1" fill="{palette["eye"]}"/>')
    parts.append('    </g>')

    # 防黑洞核心: 眼睛高光独立 group, 独立 fill, 透明背景物理隔离
    parts.append('    <!-- 眼睛高光 (白色, 独立路径, 透明背景不会吃掉) -->')
    parts.append('    <g class="sparkle-pixels">')
    for x, y, ch in pixels:
        if ch == 'S':
            parts.append(f'      <rect x="{x}" y="{y}" width="1" height="1" fill="{palette["sparkle"]}"/>')
    parts.append('    </g>')

    parts.append('    <!-- 嘴 -->')
    parts.append('    <g class="mouth-pixels">')
    for x, y, ch in pixels:
        if ch == 'M':
            parts.append(f'      <rect x="{x}" y="{y}" width="1" height="1" fill="{palette["mouth"]}"/>')
    parts.append('    </g>')

    parts.append('    <!-- 腮红 -->')
    parts.append('    <g class="blush-pixels">')
    for x, y, ch in pixels:
        if ch == 'B':
            parts.append(f'      <rect x="{x}" y="{y}" width="1" height="1" fill="{palette["blush"]}" opacity="0.7"/>')
    parts.append('    </g>')

    parts.append('    <!-- 接地阴影 -->')
    parts.append('    <g class="shadow-pixels">')
    for x, y, ch in pixels:
        if ch == 'O':
            parts.append(f'      <rect x="{x}" y="{y}" width="1" height="1" fill="{palette["shadow"]}"/>')
    parts.append('    </g>')

    parts.append('  </g>')
    parts.append('</svg>')
    return '\n'.join(parts)


# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 主入口: 生成所有主题
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
if __name__ == '__main__':
    out_dir = Path(__file__).parent / 'public' / 'buddy-v2'
    out_dir.mkdir(parents=True, exist_ok=True)

    pixels = layout_to_pixels(LAYOUT_WITH_SPARKLES)
    print(f'Pixel map: {len(pixels)} 像素 ({(len(pixels) / (32*32) * 100):.1f}% 填充率)')

    for theme_name, palette in THEMES.items():
        svg = pixels_to_svg(pixels, theme_name)
        out_path = out_dir / f'buddy-v21-{theme_name}.svg'
        out_path.write_text(svg, encoding='utf-8')
        size = out_path.stat().st_size
        print(f'  [OK] {theme_name:10s} -> {out_path.name:30s} ({size} bytes)')
