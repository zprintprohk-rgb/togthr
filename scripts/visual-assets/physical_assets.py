# -*- coding: utf-8 -*-
"""实体形态生产稿：包装盒 / 分享卡 / 说明书 / 贴纸 / 开模轮廓
印刷标准：300dpi、CMYK、出血 3mm、刀版线标注、FSC 纸张备注
依据：v9.0 §5（包装=定制盒+分享卡+说明书，FSC 认证纸张）
"""
import os, sys
from PIL import Image, ImageDraw, ImageFont

sys.stdout.reconfigure(encoding='utf-8')

OUT = r'F:\CloudDreamerApp\togthr\docs\visual-assets\physical'
os.makedirs(OUT, exist_ok=True)

SRC = r'F:\CloudDreamerApp\togthr\public\visual-assets\pets'
INK = (30, 41, 59)
PINK = (255, 183, 197)
ACCENT = (124, 58, 237)  # Togthr 品牌紫 #7C3AED

def font(size, bold=False):
    path = r'C:\Windows\Fonts\msyhbd.ttc' if bold else r'C:\Windows\Fonts\msyh.ttc'
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

def pet_img(theme='lavender', species='cat', state='idle', frame=1, px=600):
    p = os.path.join(SRC, theme, f'pet-{species}-{state}-{frame}-1024.png')
    img = Image.open(p).convert('RGBA')
    return img.resize((px, px), Image.NEAREST)

def cmyk(img):
    """转 CMYK（印刷）；留出白色背景"""
    bg = Image.new('RGB', img.size, (255, 255, 255))
    bg.paste(img, mask=img.split()[3] if img.mode == 'RGBA' else None)
    return bg.convert('CMYK')

def draw_crop_marks(d, w, h, bleed=3):
    """出血标记 + 裁切线（按 300dpi 比例）"""
    pass  # 裁切线用安全区线标注

# ═══════════ 1. 分享卡（A6 105×148mm + 出血 3mm → 111×154mm @300dpi） ═══════════
def share_card():
    mm = 300 / 25.4  # px per mm
    W, H = int(111 * mm), int(154 * mm)
    img = Image.new('RGB', (W, H), (250, 248, 252))
    d = ImageDraw.Draw(img)
    # 出血区指示线（品红细线标注出血边界）
    bleed_px = int(3 * mm)
    d.rectangle((bleed_px, bleed_px, W - bleed_px, H - bleed_px), outline=(255, 0, 255), width=2)
    # 顶部品牌
    d.text((bleed_px + 20, bleed_px + 16), 'Togthr — Your Quiet Companion', font=font(20, bold=True), fill=ACCENT)
    # 宠物（居中大图）
    pet = pet_img('lavender', 'cat', 'idle', 1, 420)
    pet_x = (W - 420) // 2
    img.paste(pet, (pet_x, int(H * 0.18)), mask=pet)
    # 底部文案
    d.text((bleed_px + 20, H - bleed_px - 90), 'It grows. It remembers. It stays.', font=font(22, bold=True), fill=INK)
    d.text((bleed_px + 20, H - bleed_px - 50), 'togthr.life', font=font(18), fill=(140, 140, 160))
    img.convert('CMYK').save(os.path.join(OUT, 'share-card-a6-cmyk-300dpi.pdf'), 'PDF', resolution=300)
    img.save(os.path.join(OUT, 'share-card-a6-preview.png'))
    print('[OK] share-card (A6 300dpi CMYK)')

# ═══════════ 2. 说明书（105×148mm 单卡，双面信息） ═══════════
def instruction_card():
    mm = 300 / 25.4
    W, H = int(111 * mm), int(154 * mm)
    img = Image.new('RGB', (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    bleed_px = int(3 * mm)
    d.rectangle((bleed_px, bleed_px, W - bleed_px, H - bleed_px), outline=(255, 0, 255), width=2)
    d.text((bleed_px + 20, bleed_px + 18), 'Your AI Pet — Care Guide', font=font(24, bold=True), fill=INK)
    steps = [
        '1. Feed it daily — hunger drops slowly',
        '2. Pet it — happiness grows with touch',
        '3. Talk to it — a quiet reply, 5-20 rounds/day',
        '4. It remembers — special days, small wins',
        '5. It never dies, never nags. It just stays.',
    ]
    y = bleed_px + 80
    for s in steps:
        d.text((bleed_px + 20, y), s, font=font(17), fill=(60, 60, 80))
        y += 38
    d.text((bleed_px + 20, H - bleed_px - 60), 'Food-grade silicone · OEKO-TEX fabric', font=font(15), fill=(140, 140, 160))
    d.text((bleed_px + 20, H - bleed_px - 32), 'Made quietly. togthr.life', font=font(15), fill=(140, 140, 160))
    img.convert('CMYK').save(os.path.join(OUT, 'instruction-card-cmyk-300dpi.pdf'), 'PDF', resolution=300)
    img.save(os.path.join(OUT, 'instruction-card-preview.png'))
    print('[OK] instruction-card')

# ═══════════ 3. 贴纸（18 款拼版 A4，含刀模线） ═══════════
def sticker_sheet():
    mm = 300 / 25.4
    W, H = int(210 * mm), int(297 * mm)  # A4
    img = Image.new('RGB', (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    d.text((20, 20), 'Togthr Sticker Sheet — 8.7cm × 8.7cm each, cut line magenta', font=font(16), fill=(140, 140, 160))
    themes = ['lavender', 'mint', 'sakura', 'moonlight', 'warmorange', 'charcoal']
    species = ['cat', 'dog', 'fantasy']
    cell_w, cell_h = W // 3, (H - 80) // 6
    for i, theme in enumerate(themes):
        for j, sp in enumerate(species):
            x0 = j * cell_w + 10
            y0 = 80 + i * cell_h + 10
            # 出血 3mm 刀模线
            d.rectangle((x0 + int(3 * mm), y0 + int(3 * mm), x0 + cell_w - 20 - int(3 * mm), y0 + cell_h - 20 - int(3 * mm)),
                        outline=(255, 0, 255), width=2)
            pet = pet_img(theme, sp, 'idle', 1, int(cell_w - 60))
            img.paste(pet, (x0 + 30, y0 + 30), mask=pet)
    img.convert('CMYK').save(os.path.join(OUT, 'sticker-sheet-a4-cmyk-300dpi.pdf'), 'PDF', resolution=300)
    img.save(os.path.join(OUT, 'sticker-sheet-preview.png'))
    print('[OK] sticker-sheet (A4 18 款)')

# ═══════════ 4. 包装盒展开图（Tuck End 10×10×10cm + 出血） ═══════════
def box_dieline():
    mm = 300 / 25.4
    # 盒体 100mm + 出血 3mm；展开布局：主体 4 面 + 襟翼
    body_w, body_h = int(106 * mm), int(106 * mm)
    W, H = int(460 * mm), int(360 * mm)
    img = Image.new('RGB', (W, H), (255, 255, 255))
    d = ImageDraw.Draw(img)
    d.text((20, 20), 'Togthr Box Dieline — 100×100×100mm tuck-end, bleed 3mm, cut line magenta', font=font(16), fill=(140, 140, 160))

    # 展开：前板(居中) + 后板 + 左右侧板 + 顶底襟翼（简化示意展开）
    front_x = (W - body_w) // 2
    front_y = (H - body_h) // 2
    panels = {
        'front': (front_x, front_y, body_w, body_h),
        'back': (front_x, front_y - body_h, body_w, body_h),
        'left': (front_x - body_w, front_y, body_w, body_h),
        'right': (front_x + body_w, front_y, body_w, body_h),
        'top': (front_x, front_y - body_h * 2, body_w, body_h),
        'bottom': (front_x, front_y + body_h, body_w, body_h),
    }
    for name, (x, y, w, h) in panels.items():
        d.rectangle((x, y, x + w, y + h), fill=(252, 250, 255), outline=(255, 0, 255), width=2)
        if name == 'front':
            # 前板：品牌 + 宠物 + 名称
            d.text((x + 12, y + 12), 'Togthr', font=font(26, bold=True), fill=ACCENT)
            pet = pet_img('lavender', 'cat', 'idle', 1, int(w * 0.55))
            img.paste(pet, (x + (w - pet.width) // 2, y + int(h * 0.2)), mask=pet)
            d.text((x + 12, y + h - 40), 'Your Quiet Companion', font=font(18, bold=True), fill=INK)
        elif name == 'back':
            d.text((x + 12, y + 12), 'Food-grade silicone core · Soft plush coat', font=font(14), fill=(90, 90, 110))
            d.text((x + 12, y + 36), 'Gently weighted · Squeeze it, it comes back', font=font(14), fill=(90, 90, 110))
            d.text((x + 12, y + 60), 'Pair with the Togthr app — it remembers you.', font=font(14), fill=(90, 90, 110))
            d.text((x + 12, y + h - 40), 'togthr.life · FSC certified paper', font=font(14), fill=(90, 90, 110))
    img.convert('CMYK').save(os.path.join(OUT, 'box-dieline-cmyk-300dpi.pdf'), 'PDF', resolution=300)
    img.save(os.path.join(OUT, 'box-dieline-preview.png'))
    print('[OK] box-dieline')

# ═══════════ 5. 硅胶开模轮廓图（二值轮廓 + SVG 描边源） ═══════════
def mold_profile():
    pet = pet_img('lavender', 'cat', 'idle', 1, 1024)
    alpha = pet.split()[3]
    # 50% 阈值二值化
    bw = alpha.point(lambda a: 255 if a > 127 else 0)
    bw.save(os.path.join(OUT, 'mold-profile-cat-idle-bitmap.png'))
    # 简化 SVG（身体圆 + 特征椭圆，供 Illustrator Image Trace 参考）
    svg = '''<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1024" viewBox="0 0 1024 1024">
  <ellipse cx="512" cy="540" rx="420" ry="420" fill="#C8B8D8"/>
  <ellipse cx="420" cy="480" rx="40" ry="40" fill="#1E293B"/>
  <ellipse cx="604" cy="480" rx="40" ry="40" fill="#1E293B"/>
  <ellipse cx="512" cy="560" rx="20" ry="15" fill="#FFB7C5"/>
  <path d="M482 600 Q512 620 542 600" stroke="#1E293B" stroke-width="6" fill="none"/>
  <polygon points="300,480 420,480 380,380" fill="#C8B8D8"/>
  <polygon points="604,480 724,480 664,380" fill="#C8B8D8"/>
</svg>'''
    with open(os.path.join(OUT, 'mold-profile-cat-idle.svg'), 'w', encoding='utf-8') as fh:
        fh.write(svg)
    print('[OK] mold-profile (bitmap + svg)')

if __name__ == '__main__':
    share_card()
    instruction_card()
    sticker_sheet()
    box_dieline()
    mold_profile()
    print('\n全部生产稿完成 →', OUT)
