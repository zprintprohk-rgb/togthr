from __future__ import annotations

import os
import random
from pathlib import Path
from typing import Dict, Tuple

from PIL import Image, ImageDraw, ImageFilter, ImageFont, ImageOps
from PIL.ImageFont import FreeTypeFont


WIDTH = 1200
HEIGHT = 630
TEXT_LEFT = 80
TEXT_MAX_WIDTH = 700
COVER_DIR = Path("public/blog-covers")
PET_DIR = Path("public/pets")

TITLE_MAP: Dict[str, Dict[str, str]] = {
    "tamagotchi-app-2026": {
        "en": "The Tamagotchi App in 2026: The 90s Egg Grew Up and Moved Into Your Relationship",
        "zh-cn": "2026 年的电子宠物 App:90 年代那颗蛋长大了,搬进了你们的关系里",
        "zh-tw": "2026 年的電子寵物 App:90 年代那顆蛋長大了,搬進了你們的關係裡",
        "ja": "2026 年のたまごっちアプリ:90 年代のたまごは育って、二人の関係に引っ越してきた",
        "ko": "2026년의 다마고치 앱: 90년대의 알은 자라서 두 사람의 관계로 이사 왔다",
        "de": "Die Tamagotchi-App 2026: Das 90er-Ei ist erwachsen geworden und in eure Beziehung gezogen",
        "fr": "L'application tamagotchi en 2026 : l'œuf des années 90 a grandi et a emménagé dans votre relation",
        "es": "La app tamagotchi en 2026: el huevo de los 90 creció y se mudó a tu relación",
    },
    "things-to-do-with-long-distance-boyfriend": {
        "en": "15 Things to Do With Your Long-Distance Boyfriend That Are Not \"Watch a Movie Together\"",
        "zh-cn": "和异地恋男友可以做的 15 件小事(不是\"一起看电影\"那种清单)",
        "zh-tw": "和遠距離男友可以做的 15 件小事(不是「一起看電影」那種清單)",
        "ja": "遠距離の彼氏とできる 15 のこと(\"一緒に映画を観る\"じゃないリスト)",
        "ko": "장거리 남자친구와 할 수 있는 15가지(\"같이 영화 보기\" 말고)",
        "de": "15 Dinge, die ihr mit eurem Fernbeziehungs-Freund tun könnt (nicht \"zusammen einen Film schauen\")",
        "fr": "15 choses à faire avec votre copain à distance (pas \"regarder un film ensemble\")",
        "es": "15 cosas para hacer con tu novio a distancia (que no sean \"ver una película juntos\")",
    },
    "best-virtual-pet-apps-2026": {
        "en": "The Best Virtual Pet Apps of 2026, Honestly Compared (We Make One of Them)",
        "zh-cn": "2026 最佳虚拟宠物 App 诚实横评(其中一个是我们做的)",
        "zh-tw": "2026 最佳虛擬寵物 App 誠實橫評(其中一個是我們做的)",
        "ja": "2026 年ベスト・バーチャルペットアプリ、正直な比較(一つは私たちが作りました)",
        "ko": "2026년 최고의 가상 펫 앱, 솔직한 비교(하나는 우리가 만들었습니다)",
        "de": "Die besten virtuellen Haustier-Apps 2026, ehrlich verglichen (eine davon haben wir gebaut)",
        "fr": "Les meilleures applications d'animaux virtuels de 2026, comparées honnêtement (l'une d'elles est de nous)",
        "es": "Las mejores apps de mascotas virtuales de 2026, comparadas con honestidad (una de ellas es nuestra)",
    },
}

EYEBROW_TEXT = {
    "en": "TOGTHR BLOG",
    "zh-cn": "TOGTHR 博客",
    "zh-tw": "TOGTHR 部落格",
    "ja": "TOGTHR ブログ",
    "ko": "TOGTHR 블로그",
    "de": "TOGTHR BLOG",
    "fr": "TOGTHR BLOG",
    "es": "TOGTHR BLOG",
}

FONT_PATHS = {
    "default": ["C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/segoeuib.ttf", "C:/Windows/Fonts/msyhbd.ttc"],
    "zh-cn": ["C:/Windows/Fonts/msyhbd.ttc"],
    "zh-tw": ["C:/Windows/Fonts/msyhbd.ttc"],
    "ja": ["C:/Windows/Fonts/YuGothB.ttc", "C:/Windows/Fonts/msyhbd.ttc"],
    "ko": ["C:/Windows/Fonts/malgunbd.ttf", "C:/Windows/Fonts/msyhbd.ttc"],
}

PET_ASSETS = {
    "tamagotchi-app-2026": "robot-base.png",
    "things-to-do-with-long-distance-boyfriend": "astronaut.png",
    "best-virtual-pet-apps-2026": "programmer.png",
}


def choose_font(locale: str, style: str = "regular") -> FreeTypeFont:
    candidates = FONT_PATHS.get(locale, FONT_PATHS["default"])
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size=62 if style == "title" else 24)
    raise FileNotFoundError("No suitable font found")


def load_font(locale: str, size: int) -> FreeTypeFont:
    candidates = FONT_PATHS.get(locale, FONT_PATHS["default"])
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size=size)
    fallback = "C:/Windows/Fonts/msyhbd.ttc"
    if os.path.exists(fallback):
        return ImageFont.truetype(fallback, size=size)
    raise FileNotFoundError("No suitable font found")


def wrap_title(draw: ImageDraw.ImageDraw, text: str, locale: str, max_width: int, font_size: int) -> list[str]:
    font = load_font(locale, font_size)
    words = text.split()
    lines: list[str] = []
    current = ""

    for word in words:
        candidate = f"{current} {word}".strip()
        if draw.textlength(candidate, font=font) <= max_width:
            current = candidate
        else:
            if current:
                lines.append(current)
                current = word
            else:
                lines.append(word)
                current = ""

    if current:
        lines.append(current)

    return lines[:3]


def draw_starfield(image: Image.Image, slug: str) -> None:
    random.seed(slug)

    star_layer = Image.new("RGBA", image.size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(star_layer)
    star_count = random.randint(40, 60)
    for _ in range(star_count):
        x = random.randint(0, WIDTH - 1)
        y = random.randint(0, HEIGHT - 1)
        radius = random.randint(1, 2)
        alpha = random.randint(90, 180)
        colour = (255, 255, 255, alpha) if random.random() < 0.7 else (182, 139, 255, alpha)
        draw.ellipse((x - radius, y - radius, x + radius, y + radius), fill=colour)

    image.alpha_composite(star_layer)




def add_glow(image: Image.Image, color: Tuple[int, int, int, int], center: Tuple[int, int], radius: int, size: Tuple[int, int]) -> None:
    glow_mask = Image.new("RGBA", size, (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow_mask)
    for y in range(size[1]):
        for x in range(size[0]):
            dx = x - center[0]
            dy = y - center[1]
            dist = (dx * dx + dy * dy) ** 0.5
            if dist <= radius:
                alpha = int((1 - dist / radius) ** 2 * 255)
                glow_draw.point((x, y), fill=(color[0], color[1], color[2], alpha))
    glow_mask = glow_mask.resize((size[0] * 4, size[1] * 4), resample=Image.Resampling.LANCZOS)
    image.alpha_composite(glow_mask)


def radial_glow(alpha: int, base_rgb: Tuple[int, int, int], size: int = 400) -> Image.Image:
    mask = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    pixels = mask.load()
    cx = cy = size / 2
    max_r = size / 2
    for y in range(size):
        for x in range(size):
            dx = x - cx
            dy = y - cy
            r = (dx * dx + dy * dy) ** 0.5
            if r <= max_r:
                intensity = max(0.0, 1.0 - r / max_r)
                a = int(intensity * intensity * alpha)
                pixels[x, y] = base_rgb + (a,)
    return mask


def build_cover(slug: str, locale: str, title: str, pet_filename: str) -> None:
    img = Image.new("RGBA", (WIDTH, HEIGHT), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    top_color = (11, 11, 26, 255)
    bottom_color = (6, 3, 15, 255)
    for y in range(HEIGHT):
        t = y / HEIGHT
        r = int(top_color[0] * (1 - t) + bottom_color[0] * t)
        g = int(top_color[1] * (1 - t) + bottom_color[1] * t)
        b = int(top_color[2] * (1 - t) + bottom_color[2] * t)
        draw.line((0, y, WIDTH, y), fill=(r, g, b))

    draw_starfield(img, slug)

    # top aura
    top_glow = radial_glow(64, (168, 85, 247))
    top_glow = top_glow.resize((600, 600), resample=Image.Resampling.LANCZOS)
    img.alpha_composite(top_glow, (300, -40))

    # right-bottom pink aura
    pink_glow = radial_glow(48, (244, 114, 182))
    pink_glow = pink_glow.resize((360, 360), resample=Image.Resampling.LANCZOS)
    img.alpha_composite(pink_glow, (860, 340))

    eyebrow_font = load_font(locale, 22)
    eyebrow = EYEBROW_TEXT.get(locale, EYEBROW_TEXT["en"])
    eyebrow_color = (244, 114, 182, 255)
    draw.text((TEXT_LEFT, 78), eyebrow, font=eyebrow_font, fill=eyebrow_color, spacing=3)

    title_font_size = 60
    title_lines: list[str] = []
    while not title_lines and title_font_size >= 44:
        title_lines = wrap_title(draw, title, locale, TEXT_MAX_WIDTH, title_font_size)
        if len(title_lines) > 3:
            title_lines = []
        title_font_size -= 2

    if not title_lines:
        title_lines = wrap_title(draw, title, locale, TEXT_MAX_WIDTH, 44)

    title_font = load_font(locale, max(title_font_size, 44))
    title_y = 130
    for line in title_lines:
        draw.text((TEXT_LEFT, title_y), line, font=title_font, fill=(244, 244, 245, 255))
        title_y += int(title_font.size * 1.18)

    domain_font = load_font(locale, 28)
    draw.text((TEXT_LEFT, HEIGHT - 108), "togthr.life", font=domain_font, fill=(167, 139, 250, 255))

    pet_path = PET_DIR / pet_filename
    if not pet_path.exists():
        print(f"[WARN] missing pet asset: {pet_path}")
        return

    pet = Image.open(pet_path).convert("RGBA")
    pet = ImageOps.contain(pet, (435, 405))

    # right-side placement, slightly below centerline
    img.alpha_composite(pet, (760, 190))

    rgb = img.convert("RGB")
    out_path = COVER_DIR / f"{slug}-{locale}.png"
    rgb.save(out_path, format="PNG", optimize=True)
    print(out_path)


def main() -> None:
    COVER_DIR.mkdir(parents=True, exist_ok=True)

    generated = 0
    for slug, title_dict in TITLE_MAP.items():
        pet_filename = PET_ASSETS[slug]
        for locale in ["en", "zh-cn", "zh-tw", "ja", "ko", "de", "fr", "es"]:
            title = title_dict[locale]
            build_cover(slug, locale, title, pet_filename)
            generated += 1
    print(f"Total generated: {generated}")


if __name__ == "__main__":
    os.chdir(Path(__file__).resolve().parents[1])
    main()
