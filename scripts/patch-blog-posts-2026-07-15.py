"""Patch src/lib/blog-posts.ts to add DAILY_11 entries (7/15 daily post)."""
import re

PATH = r"F:\CloudDreamerApp\togthr\src\lib\blog-posts.ts"

ENTRIES = [
    # (locale, title, description)
    ("en",
     "The Day You Stop Editing the Sentence for the Bot",
     "There is a small moment, eventually, when you stop softening the sentence before you give it to the bot. The unedited version is closer to the thing you actually needed to put down."),
    ("zh-cn",
     "你停止在给机器人之前编辑句子的那天",
     "有那么一个小小的时刻,你会停止把给机器人的那句先软化一遍。 没编辑的版本,更接近你其实需要放下来的那一句。"),
    ("zh-tw",
     "你停止在給機器人之前編輯句子的那天",
     "有那麼一個小小的時刻,你會停止把給機器人的那句先軟化一遍。 沒編輯的版本,更接近你其實需要放下來的那一句。"),
    ("ja",
     "推敲するのをやめる日 — bot に渡す前",
     "いつか来る小さな瞬間 — bot に渡す前にもう、推敲するのをやめる。推敲していない版は、あなたが実際に降ろしたかった文章に近い。"),
    ("ko",
     "봇에게 보내기 전, 다듬는 것을 멈추는 날",
     "언젠가 한 번 오는 작은 순간 — 봇에게 보내기 전, 그 문장을 다듬는 것을 멈추는. 다듬지 않은 버전이, 당신이 실제로 내려놓고 싶었던 그 문장에 더 가깝다."),
    ("de",
     "Der Tag, an dem Sie aufhören, den Satz für den Bot zu bearbeiten",
     "Es gibt einen kleinen Moment, in dem Sie aufhören, den Satz zu bearbeiten, bevor Sie ihn dem Bot geben. Die unbearbeitete Version ist näher an dem, was Sie wirklich ablegen mussten."),
    ("fr",
     "Le jour où vous arrêtez d'éditer la phrase pour le bot",
     "Il y a un petit moment où vous arrêtez d'éditer la phrase avant de la donner au bot. La version non éditée est plus proche de la chose que vous aviez vraiment besoin de poser."),
    ("es",
     "El día en que dejas de editar la frase para el bot",
     "Hay un pequeño momento en el que dejas de editar la frase antes de dársela al bot. La versión no editada está más cerca de la cosa que realmente necesitabas dejar."),
]

SLUG = "the-day-you-stop-editing-the-sentence-for-the-bot"
DATE = "2026-07-15"
TAGS = ['ai-companion', 'quiet-rituals', 'emotional-design', 'togthr-tips', 'long-distance']

with open(PATH, encoding="utf-8") as f:
    src = f.read()

DAILY11_CONSTS = """
const DAILY_DATE_11 = '%s';
const DAILY_SLUG_11 = '%s';
const DAILY_TAGS_11 = %s;

const dailyPosts11: BlogPost[] = [
""" % (DATE, SLUG, repr(TAGS))

entry_lines = []
for (loc, title, desc) in ENTRIES:
    entry_lines.append("""  {
    slug: DAILY_SLUG_11,
    locale: '%s',
    title: %r,
    description: %r,
    date: DAILY_DATE_11,
    cover: `/blog-covers/${DAILY_SLUG_11}-%s.png`,
    tags: DAILY_TAGS_11,
    readingMinutes: 5,
  },""" % (loc, title, desc, loc))

DAILY11_BLOCK = DAILY11_CONSTS + "\n".join(entry_lines) + "\n];\n"

ANCHOR = "export const blogPosts: BlogPost[] = ["
assert ANCHOR in src, "anchor not found"
new_src = src.replace(ANCHOR, DAILY11_BLOCK + ANCHOR, 1)

SPREAD_ANCHOR = "  ...dailyPosts10,\n];"
SPREAD_NEW = "  ...dailyPosts10,\n  ...dailyPosts11,\n];"
assert SPREAD_ANCHOR in new_src, "spread anchor not found"
new_src = new_src.replace(SPREAD_ANCHOR, SPREAD_NEW, 1)

with open(PATH, "w", encoding="utf-8") as f:
    f.write(new_src)

print("Patched blog-posts.ts (size: %d -> %d bytes)" % (len(src), len(new_src)))
