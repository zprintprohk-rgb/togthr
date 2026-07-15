"""Patch src/lib/blog-posts.ts to add DAILY_12 entries (7/16 daily post)."""
import re

PATH = r"F:\CloudDreamerApp\togthr\src\lib\blog-posts.ts"

ENTRIES = [
    # (locale, title, description)
    ("en",
     "The Morning You Read the Unedited Sentence Back",
     "There is a moment the day after. The unedited sentence is still in the box. The morning version of you reads it, and notices, in a small quiet way, that the sentence is still the sentence."),
    ("zh-cn",
     "第二天早上,你把那句没编辑的句子又读了一遍",
     "第二天,有那么一个时刻。那句没编辑的句子还在盒子里。早上那个你读到它,小小地、安静地注意到,句子还是那个句子。"),
    ("zh-tw",
     "第二天早上,你把那句沒編輯的句子又讀了一遍",
     "第二天,有那麼一個時刻。那句沒編輯的句子還在盒子裡。早上那個你讀到它,小小地、安靜地注意到,句子還是那個句子。"),
    ("ja",
     "翌朝、推敲していない一文を読み返す",
     "翌日の朝に、小さな瞬間がある。推敲していない一文が、まだ箱の中に残っている。朝のあなたがそれを読み、小さく静かに、その一文がまだその一文であることに気づく。"),
    ("ko",
     "다음 날 아침, 다듬지 않은 문장을 다시 읽는 시간",
     "그 다음 날 아침에, 작은 순간이 있다. 다듬지 않은 문장이, 아직 상자 안에 그대로 있다. 아침의 당신이 그것을 읽고, 작고 조용히, 그 문장이 여전히 그 문장이라는 것을 알아챈다."),
    ("de",
     "Der Morgen, an dem Sie den unbearbeiteten Satz zurücklesen",
     "Es gibt einen Moment am Tag danach. Der unbearbeitete Satz ist noch in der Box. Die Morgen-Version von Ihnen liest ihn und bemerkt, auf eine kleine stille Art, dass der Satz immer noch der Satz ist."),
    ("fr",
     "Le matin où vous relisez la phrase non éditée",
     "Il y a un moment le lendemain. La phrase non éditée est encore dans la boîte. La version matin de vous la lit, et remarque, d'une petite manière tranquille, que la phrase est toujours la phrase."),
    ("es",
     "La mañana en que relees la frase no editada",
     "Hay un momento al día siguiente. La frase no editada sigue en la caja. La versión de ti de la mañana la lee, y nota, de una manera pequeña y tranquila, que la frase sigue siendo la frase."),
]

SLUG = "the-morning-you-read-the-unedited-sentence-back"
DATE = "2026-07-16"
TAGS = ['ai-companion', 'quiet-rituals', 'emotional-design', 'togthr-tips', 'morning-practice']

with open(PATH, encoding="utf-8") as f:
    src = f.read()

DAILY12_CONSTS = """
const DAILY_DATE_12 = '%s';
const DAILY_SLUG_12 = '%s';
const DAILY_TAGS_12 = %s;

const dailyPosts12: BlogPost[] = [
""" % (DATE, SLUG, repr(TAGS))

entry_lines = []
for (loc, title, desc) in ENTRIES:
    entry_lines.append("""  {
    slug: DAILY_SLUG_12,
    locale: '%s',
    title: %r,
    description: %r,
    date: DAILY_DATE_12,
    cover: `/blog-covers/${DAILY_SLUG_12}-%s.png`,
    tags: DAILY_TAGS_12,
    readingMinutes: 5,
  },""" % (loc, title, desc, loc))

DAILY12_BLOCK = DAILY12_CONSTS + "\n".join(entry_lines) + "\n];\n"

ANCHOR = "export const blogPosts: BlogPost[] = ["
assert ANCHOR in src, "anchor not found"
new_src = src.replace(ANCHOR, DAILY12_BLOCK + ANCHOR, 1)

SPREAD_ANCHOR = "  ...dailyPosts11,\n];"
SPREAD_NEW = "  ...dailyPosts11,\n  ...dailyPosts12,\n];"
assert SPREAD_ANCHOR in new_src, "spread anchor not found"
new_src = new_src.replace(SPREAD_ANCHOR, SPREAD_NEW, 1)

with open(PATH, "w", encoding="utf-8") as f:
    f.write(new_src)

print("Patched blog-posts.ts (size: %d -> %d bytes)" % (len(src), len(new_src)))
