#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Patch blog-posts.ts:
  1. Add `const dailyPosts13` block with 8 locale entries (after dailyPosts12).
  2. Spread `...dailyPosts13` into the `blogPosts` export array.
The 8 entries mirror the per-slug page.tsx BODIES.

Idempotent: skips if `dailyPosts13` is already declared.
"""

import os
import re

PATH = r"F:\CloudDreamerApp\togthr\src\lib\blog-posts.ts"

SLUG = "the-day-the-unedited-sentence-becomes-ordinary"
DATE = "2026-07-20"
TAGS = ["ai-companion", "quiet-rituals", "togthr-life", "habit-design", "emotional-design"]

# Title + description per locale, hand-written to match per-slug body voice.
ENTRIES = [
    ("en", "The Day the Unedited Sentence Becomes Ordinary",
     "There is a day, somewhere in the third week, when the unedited sentence becomes ordinary. The day does not announce itself. The day is the day the practice has stopped being a practice."),
    ("zh-cn", "那句没编辑的句子变得不显眼的那一天",
     "有那么一天,在第三周的某个地方,那句没编辑的句子变得不显眼。那一天是这个练习不再是一个练习的那一天,句子只是句子,写作是像刷牙一样自然的事。"),
    ("zh-tw", "那句沒編輯的句子變得不顯眼的那一天",
     "有那麼一天,在第三週的某個地方,那句沒編輯的句子變得不顯眼。那一天是這個練習不再是一個練習的那一天,句子只是句子,寫作是像刷牙一樣自然的事。"),
    ("ja", "推敲していない一文が、ありふれたものになる日",
     "三週間のどこかに、その日が来る。推敲していない一文が、ありふれたものになる日。その日は、この習慣が習慣であることをやめた日で、一文が、ただの一文になる日。"),
    ("ko", "다듬지 않은 문장이 평범해지는 날",
     "어느 날이 온다. 세 번째 주의 어딘가에, 다듬지 않은 문장이 평범해지는 날. 그 날은, 이 습관이 습관임을 멈춘 날이고, 문장은 그냥 문장인 날이다."),
    ("de", "Der Tag, an dem der unbearbeitete Satz gewöhnlich wird",
     "Es gibt einen Tag, irgendwo in der dritten Woche, an dem der unbearbeitete Satz gewöhnlich wird. Der Tag ist der Tag, an dem die Übung aufgehört hat, eine Übung zu sein."),
    ("fr", "Le jour où la phrase non éditée devient ordinaire",
     "Il y a un jour, quelque part dans la troisième semaine, où la phrase non éditée devient ordinaire. Le jour est le jour où la pratique a cessé d'être une pratique."),
    ("es", "El día en que la frase no editada se vuelve ordinaria",
     "Hay un día, en algún lugar de la tercera semana, en que la frase no editada se vuelve ordinaria. El día es el día en que la práctica ha dejado de ser una práctica."),
]


def render_entry(locale, title, description, reading_minutes):
    cover = f"/blog-covers/{SLUG}-{locale}.png"
    return f"""  {{
    slug: SLUG13,
    locale: '{locale}',
    title: {title!r},
    description: {description!r},
    date: DATE13,
    cover: {cover!r},
    tags: TAGS13,
    readingMinutes: {reading_minutes},
  }}"""


def render_block():
    parts = [
        "",
        f"const DATE13 = '{DATE}';",
        f"const SLUG13 = '{SLUG}';",
        f"const TAGS13 = {TAGS!r};",
        "",
        "const dailyPosts13: BlogPost[] = [",
    ]
    for i, (loc, title, desc) in enumerate(ENTRIES):
        if i > 0:
            parts.append(",")
        parts.append(render_entry(loc, title, desc, 5))
    parts.append(",")
    parts.append("];")
    return "\n".join(parts)


def main():
    with open(PATH, "r", encoding="utf-8") as f:
        src = f.read()

    if "const dailyPosts13" in src:
        print("ALREADY PATCHED: dailyPosts13 already exists. Skipping.")
        return

    # Insert the new block right after the closing `];` of dailyPosts12.
    # We find `];\n\nconst M1_DATE` (the boundary that follows dailyPosts12).
    needle = "const M1_DATE"
    idx = src.find(needle)
    if idx < 0:
        raise SystemExit(f"Could not find boundary needle: {needle!r}")
    block = render_block()
    # Insert just before `const M1_DATE`
    new_src = src[:idx] + block + "\n\n" + src[idx:]

    # Add `...dailyPosts13,` to the blogPosts export spread list.
    # Anchor: `...dailyPosts12,`
    spread_anchor = "...dailyPosts12,"
    spread_idx = new_src.find(spread_anchor)
    if spread_idx < 0:
        raise SystemExit(f"Could not find spread anchor: {spread_anchor!r}")
    # Insert right after that line
    insert_at = new_src.find("\n", spread_idx) + 1
    new_src = new_src[:insert_at] + "  ...dailyPosts13,\n" + new_src[insert_at:]

    with open(PATH, "w", encoding="utf-8") as f:
        f.write(new_src)
    size = os.path.getsize(PATH)
    print(f"PATCHED {PATH} ({size:,} bytes)")
    print(f"  + {len(ENTRIES)} locale entries")
    print(f"  + ...dailyPosts13 spread in blogPosts export")


if __name__ == "__main__":
    main()
