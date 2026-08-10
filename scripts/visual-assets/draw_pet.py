# -*- coding: utf-8 -*-
"""
Togthr 视觉资产量产 · 核心绘制器
依据：Togthr 整合资产规范 v9.0 第四章（1024 画布 / 840 主体 / 3 物种 / 6 主题 / 11 状态 / 硬边像素）
绘制：Python PIL，全部原生硬边（零抗锯齿 / 零渐变 / 平涂 / 调色板 ≤16 色）
输出：pet-{species}-{state}-{frame}-1024.png
"""
import os
import sys
from PIL import Image, ImageDraw

sys.stdout.reconfigure(encoding='utf-8')

# ─────────────── v9.0 4.5 配色系统（6 主题 × 3 物种） ───────────────
# 每主题：cat/dog/fantasy 身体色 + 点缀色 + 高光/暗部（由身体色派生）
THEMES = {
    'lavender': {
        'body': {'cat': (200, 184, 216), 'dog': (184, 168, 216), 'fantasy': (232, 196, 212)},
        'accent': (255, 142, 114),
        'highlight': (224, 216, 240), 'shadow': (160, 152, 184),
    },
    'mint': {
        'body': {'cat': (110, 231, 183), 'dog': (94, 215, 167), 'fantasy': (142, 247, 199)},
        'accent': (78, 199, 151),
        'highlight': (170, 245, 210), 'shadow': (70, 160, 125),
    },
    'sakura': {
        'body': {'cat': (249, 168, 212), 'dog': (224, 152, 196), 'fantasy': (255, 183, 197)},
        'accent': (208, 120, 180),
        'highlight': (255, 205, 230), 'shadow': (200, 125, 170),
    },
    'moonlight': {
        'body': {'cat': (147, 197, 253), 'dog': (131, 181, 237), 'fantasy': (163, 213, 255)},
        'accent': (99, 149, 205),
        'highlight': (190, 220, 255), 'shadow': (105, 150, 205),
    },
    'warmorange': {
        'body': {'cat': (253, 186, 116), 'dog': (237, 170, 100), 'fantasy': (255, 202, 132)},
        'accent': (221, 138, 68),
        'highlight': (255, 215, 165), 'shadow': (210, 145, 85),
    },
    'charcoal': {
        'body': {'cat': (107, 114, 128), 'dog': (91, 98, 112), 'fantasy': (123, 130, 144)},
        'accent': (75, 82, 80),
        'highlight': (140, 148, 162), 'shadow': (75, 82, 96),
    },
}

# 眼睛/线条/鼻/舌等通用色（v9.0 4.2.2）
INK = (30, 41, 59)        # #1E293B 眼/嘴/胡须
PINK = (255, 183, 197)    # #FFB7C5 鼻/舌/内耳/腮红
WHITE = (255, 255, 255)
GOLD = (255, 215, 0)      # #FFD700 光环
ZZZ_BLUE = (147, 197, 253)

CANVAS = 1024
CX, CY = 512, 512

# 帧数（v9.0 4.3.1；breath 为叠加态不单独成文件）
FRAME_COUNT = {'idle': 2, 'blink': 3, 'greet': 4, 'success': 2, 'miss': 2,
               'sleep': 2, 'sign': 3, 'squeezed': 3, 'talking': 3, 'thinking': 2}


def new_canvas():
    return Image.new('RGBA', (CANVAS, CANVAS), (0, 0, 0, 0))


def rot(img, angle):
    """NEAREST 旋转保持硬边"""
    if angle == 0:
        return img
    return img.rotate(angle, resample=Image.NEAREST, center=(CX, 540))


def draw_pet(species, theme_name, state, frame):
    """绘制单帧。返回 PIL Image"""
    t = THEMES[theme_name]
    body = t['body'][species]
    hl, sh = t['highlight'], t['shadow']
    accent = t['accent']

    # ── 身体（840 圆体，中心 512,540；v9.0 4.2.2）──
    body_bbox = (92, 120, 932, 960)  # 直径 840

    # idle 帧 2：呼吸微缩（v9.0 §4.3.1 idle scale 1.00/1.02 → 视觉为微动）
    idle_shrink = (state == 'idle' and frame == 2)
    if idle_shrink:
        body_bbox = (110, 138, 914, 942)      # 整体缩小 2%（0.98）
    # squeezed 状态：压扁/回弹（帧3 回弹中，非原位）
    if state == 'squeezed':
        if frame == 1:
            body_bbox = (92, 220, 932, 900)   # 高度 680（压扁 20%）
        elif frame == 2:
            body_bbox = (92, 96, 932, 960)    # 过冲回弹
        else:
            body_bbox = (92, 150, 932, 940)   # 回弹中（高度 790）

    # success 状态：帧2 上移 40px
    dy = 0
    if state == 'success' and frame == 2:
        dy = -40
    if dy:
        body_bbox = tuple(v + dy for v in body_bbox)

    img = new_canvas()
    d = ImageDraw.Draw(img)

    # 尾巴（画在身体前）
    draw_tail(d, species, body, accent, state, frame)

    # 身体圆体
    d.ellipse(body_bbox, fill=body)
    # 高光（平涂纯色块）
    hl_bbox = (body_bbox[0] + 138, body_bbox[1] + 200, body_bbox[0] + 438, body_bbox[1] + 400)
    d.ellipse(hl_bbox, fill=hl)
    # 暗部
    sh_bbox = (body_bbox[0] + 398, body_bbox[1] + 440, body_bbox[0] + 698, body_bbox[1] + 640)
    d.ellipse(sh_bbox, fill=sh)

    # 耳朵（身体后层）
    draw_ears(d, species, body, PINK, state, frame)

    # 脚
    foot_w, foot_h = 80, 40
    for fx in (440, 584):
        d.ellipse((fx - foot_w // 2, 940, fx + foot_w // 2, 980), fill=body)

    # 面部（随状态变化）
    draw_face(d, species, INK, PINK, accent, state, frame)

    # 状态特效（ZZZ/音符/问号/牌子/挥手）
    draw_fx_full(d, species, state, frame, body, accent)

    # 幻想生物：光环（v9.0 4.4.4，高100 宽40 弯曲 #FFD700）
    if species == 'fantasy':
        d.ellipse((CX - 60, 60, CX + 60, 160), outline=GOLD, width=10)
        d.ellipse((CX - 30, 130, CX + 30, 190), outline=GOLD, width=6)

    # 旋转（greet 歪头 15° / miss 低头 15° / thinking 歪头 10°）
    angle = 0
    if state == 'greet':
        angle = -15
    elif state == 'miss':
        angle = 15 if frame == 1 else 20
    elif state == 'thinking' and frame == 1:
        angle = -10
    elif state == 'thinking' and frame == 2:
        angle = -5
    if angle:
        img = rot(img, angle)

    return img


def draw_tail(d, species, body, accent, state, frame):
    if species == 'cat':
        # 长而弯曲（200×40，阶梯像素）
        pts = [(720, 690), (860, 690), (880, 710), (880, 750), (860, 770), (780, 770), (760, 750)]
        d.polygon(pts, fill=body)
        d.ellipse((760, 730, 880, 780), fill=body)
    elif species == 'dog':
        # 短而上翘（120×50），末端心形
        d.polygon([(700, 700), (820, 660), (820, 710), (700, 750)], fill=body)
        # 心形末端（两个圆 + 三角）
        d.ellipse((800, 640, 840, 680), fill=accent)
        d.ellipse((830, 640, 870, 680), fill=accent)
        d.polygon([(795, 660), (875, 660), (835, 700)], fill=accent)
    else:
        # 发光长尾（180×50）
        d.polygon([(700, 700), (880, 720), (880, 760), (700, 750)], fill=body)
        d.ellipse((860, 700, 900, 780), fill=GOLD)


def draw_ears(d, species, body, pink, state, frame):
    if species == 'cat':
        # 三角耳 120×100（中心 y≈380 符合 v9.0 4.2.2，底边 450 不与眼睛 440+ 重叠）
        for ex in (360, 664):
            d.polygon([(ex - 60, 450), (ex + 60, 450), (ex + 40, 350), (ex - 40, 350)], fill=body)
            d.polygon([(ex - 30, 440), (ex + 30, 440), (ex + 15, 380), (ex - 15, 380)], fill=pink)
    elif species == 'dog':
        # 下垂圆润耳 100×80（中心 y≈410，底边 470，不与眼睛 440+ 重叠）
        for ex in (360, 664):
            d.ellipse((ex - 50, 360, ex + 50, 470), fill=body)
            d.ellipse((ex - 30, 380, ex + 30, 455), fill=pink)
    else:
        # 精灵耳 140×60 尖顶
        for ex in (340, 684):
            d.polygon([(ex - 70, 450), (ex + 70, 450), (ex + 20, 330), (ex - 20, 330)], fill=body)


def draw_face(d, species, ink, pink, accent, state, frame):
    """眼睛/鼻子/嘴巴/腮红/胡须"""
    eye_d = 80
    if species == 'fantasy':
        eye_d = 96
    eye_y = 480
    # 闭眼状态（blink 帧2 / sleep / miss 眼睛半圆）
    closed = (state == 'blink' and frame == 2) or state == 'sleep'
    half = state == 'miss'

    for ex in (420, 604):
        # 眼睛
        if closed:
            d.arc((ex - eye_d // 2, eye_y - 20, ex + eye_d // 2, eye_y + 40), 200, 340, fill=ink, width=8)
        elif half:
            d.arc((ex - eye_d // 2, eye_y - 10, ex + eye_d // 2, eye_y + 30), 180, 360, fill=ink, width=8)
        else:
            d.ellipse((ex - eye_d // 2, eye_y - eye_d // 2, ex + eye_d // 2, eye_y + eye_d // 2), fill=ink)
            # 高光 20px（星星高光 for fantasy）
            hx, hy = ex - eye_d // 4, eye_y - eye_d // 4
            if species == 'fantasy':
                d.polygon([(hx, hy - 10), (hx + 4, hy - 3), (hx + 12, hy - 3), (hx + 6, hy + 3),
                           (hx + 8, hy + 12), (hx, hy + 7), (hx - 8, hy + 12), (hx - 6, hy + 3),
                           (hx - 12, hy - 3), (hx - 4, hy - 3)], fill=WHITE)
            else:
                d.ellipse((hx - 10, hy - 10, hx + 10, hy + 10), fill=WHITE)
        # 猫竖线瞳孔
        if species == 'cat' and not closed and not half:
            d.rectangle((ex - 10, eye_y - 30, ex + 10, eye_y + 30), fill=ink)

    # 鼻子
    d.ellipse((492, 545, 532, 575), fill=pink)
    # 嘴巴
    if state == 'talking':
        if frame in (1, 3):
            d.ellipse((492, 585, 532, 625), fill=ink)  # o 形开口
        else:
            d.arc((482, 580, 542, 610), 20, 160, fill=ink, width=6)
    elif species == 'dog':
        # 大弧线微笑 + 舌头
        d.arc((472, 580, 552, 620), 20, 160, fill=ink, width=6)
        d.ellipse((502, 600, 522, 630), fill=pink)
    else:
        d.arc((482, 585, 542, 615), 20, 160, fill=ink, width=6)

    # 腮红（alpha 0.6 平涂）
    blush = pink + (153,)  # 0.6 * 255
    for bx in (360, 664):
        d.ellipse((bx - 30, 530, bx + 30, 590), fill=blush)

    # 猫胡须
    if species == 'cat':
        for i, off in enumerate((-20, 0, 20)):
            d.line((300, 540 + off, 360, 555 + off), fill=ink, width=3)
            d.line((724, 540 + off, 664, 555 + off), fill=ink, width=3)


def draw_fx(d, species, state, frame):
    """状态特效：ZZZ / 音符 / 问号 / 牌子 / 挥手（body 由调用方透传）"""
    pass


def draw_fx_full(d, species, state, frame, body, accent):
    if state == 'sleep':
        # ZZZ 气泡（帧2 上移）
        zy = 200 - (12 if frame == 2 else 0)
        for i, zs in enumerate((30, 22, 14)):
            zx = 700 + i * 36
            draw_pixel_z(d, zx, zy - i * 34, zs)
    elif state == 'talking' and frame in (1, 3):
        # 音符 ♪（圆 + 尾线），帧3 上移 10px
        ny = 400 - (20 if frame == 3 else 0)
        d.ellipse((548, ny, 576, ny + 28), fill=PINK)
        d.rectangle((572, ny - 30, 580, ny + 10), fill=PINK)
        d.rectangle((568, ny - 38, 580, ny - 26), fill=PINK)
    elif state == 'thinking':
        # 问号 60px
        qx, qy = 512, 280
        d.ellipse((qx - 8, qy + 26, qx + 8, qy + 42), fill=PINK)
        d.rectangle((qx - 30, qy - 40, qx + 30, qy + 20), fill=PINK)
        d.ellipse((qx - 30, qy - 44, qx + 14, qy), fill=PINK)
    elif state == 'sign':
        # 举牌 300×200（帧2-3 上举）
        sy = 700 - (10 if frame == 2 else 20 if frame == 3 else 0)
        d.rectangle((362, sy, 662, sy + 200), fill=WHITE, outline=INK, width=8)
        # 小心形
        d.ellipse((482, sy + 70, 522, sy + 110), fill=PINK)
        d.ellipse((512, sy + 70, 552, sy + 110), fill=PINK)
        d.polygon([(477, sy + 96), (557, sy + 96), (517, sy + 136)], fill=PINK)
    elif state == 'greet' and frame in (2, 3):
        # 挥手（右爪抬起摆动：帧3 手臂更高，形成挥动）
        arm_y = 352 if frame == 2 else 330
        d.ellipse((856, arm_y, 936, arm_y + 80), fill=accent)
        d.rectangle((900, arm_y + 48, 924, arm_y + 118), fill=accent)


def draw_pixel_z(d, x, y, size):
    """像素 Z 字"""
    s = size // 3
    d.rectangle((x, y, x + size, y + s), fill=ZZZ_BLUE)
    d.rectangle((x + size - s, y + s, x + size, y + s * 2), fill=ZZZ_BLUE)
    d.rectangle((x, y + s * 2, x + size, y + s * 3), fill=ZZZ_BLUE)


def quantize(img):
    """调色板 ≤16 色量化（硬边保留 + 文件瘦身）"""
    q = img.convert('P', palette=Image.ADAPTIVE, colors=16)
    return q.convert('RGBA')


def generate_all(out_dir):
    os.makedirs(out_dir, exist_ok=True)
    total = 0
    for species in ('cat', 'dog', 'fantasy'):
        for theme in THEMES:
            theme_dir = os.path.join(out_dir, theme)
            os.makedirs(theme_dir, exist_ok=True)
            for state, frames in FRAME_COUNT.items():
                for f in range(1, frames + 1):
                    img = draw_pet(species, theme, state, f)
                    img = quantize(img)
                    # v9.0 4.8 命名：pet-{species}-{state}-{frame}-1024.png（主题为目录层级）
                    name = f'pet-{species}-{state}-{f}-1024.png'
                    img.save(os.path.join(theme_dir, name))
                    total += 1
    print(f'[OK] 生成 {total} 张 → {out_dir}')


if __name__ == '__main__':
    out = sys.argv[1] if len(sys.argv) > 1 else r'F:\CloudDreamerApp\togthr\public\visual-assets\pets'
    generate_all(out)
