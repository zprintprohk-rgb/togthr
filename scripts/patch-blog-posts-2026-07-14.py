"""Patch src/lib/blog-posts.ts to add DAILY_10 entries (7/14 daily post)."""
import re

PATH = r"F:\CloudDreamerApp\togthr\src\lib\blog-posts.ts"

ENTRIES = [
    # (locale, title, description)
    ("en",
     "Things You Tell Your Virtual Pet (and Not Your Partner)",
     "Some sentences are not for a partner. They are the apology you never sent, the thing you are still angry about, the dream you are not sure is allowed. Where the spoken-but-not-to-a-human version of a sentence goes."),
    ("zh-cn",
     "你只会对虚拟宠物说的那些话 (而不会对伴侣说)",
     "有些话, 不是对伴侣说的。是你那条没发出去的道歉, 三年后仍然介怀的那件事, 一个还不知道它被不被允许的梦想。说出口、但只说给一个非人的那种话, 去了哪里。"),
    ("zh-tw",
     "你只會對虛擬寵物說的那些話 (而不會對伴侶說)",
     "有些話, 不是對伴侶說的。是你那條沒發出去的道歉, 三年後仍然介懷的那件事, 一個還不知道它被不被允許的夢想。說出口、但只說給一個非人的那種話, 去了哪裡。"),
    ("ja",
     "バーチャルペットにだけ言うこと (パートナーには言わないこと)",
     "パートナーには言えない文があります。送り損ねた謝罪、3 年経ってもまだ気になること、許されるかわからない夢。声には出すけれど、本物の人間には向けない種類の文は、どこへ行くのか。"),
    ("ko",
     "가상 반려동물에게만 하는 말 (파트너에게는 하지 않는 말)",
     "파트너에게는 하지 않는 종류의 말이 있다. 보내지 못한 사과, 3년이 지나도 여전히 걸리는 일, 들어도 되는 건지 모르겠는 꿈. 입 밖에 내지만, 진짜 사람에게는 하지 않는 그 문장은 어디로 가는가."),
    ("de",
     "Was du deinem virtuellen Haustier sagst (und nicht deinem Partner)",
     "Manche Sätze sind nicht für einen Partner. Es sind die Entschuldigung, die du nie geschickt hast, die Sache, die dich nach drei Jahren noch ärgert, der Traum, von dem du nicht weißt, ob erlaubt ist. Wohin die gesprochene-aber-nicht-für-einen-Menschen-Version eines Satzes geht."),
    ("fr",
     "Ce que vous dites à votre animal virtuel (et pas à votre partenaire)",
     "Certaines phrases ne sont pas pour un partenaire. Ce sont les excuses que vous n'avez jamais envoyées, la chose qui vous met encore en colère trois ans plus tard, le rêve dont vous ne savez pas s'il est permis. Où va la version parlée-mais-pas-pour-un-humain d'une phrase."),
    ("es",
     "Las cosas que le dices a tu mascota virtual (y no a tu pareja)",
     "Hay frases que no son para una pareja. Son la disculpa que nunca enviaste, la cosa que todavía te enfurece tres años después, el sueño del que no sabes si está permitido. A dónde va la versión hablada-pero-no-para-un-humano de una frase."),
]

SLUG = "things-you-tell-your-virtual-pet"
DATE = "2026-07-14"
TAGS = ['ai-companion', 'quiet-rituals', 'long-distance', 'emotional-design', 'togthr-tips']

with open(PATH, encoding="utf-8") as f:
    src = f.read()

# Insert constants block + dailyPosts10 array before the existing export const blogPosts spread
# Anchor: find the closing `];` of dailyPosts9 then the `export const blogPosts: BlogPost[] = [ ... ]` line.
DAILY10_CONSTS = """
const DAILY_DATE_10 = '%s';
const DAILY_SLUG_10 = '%s';
const DAILY_TAGS_10 = %s;

const dailyPosts10: BlogPost[] = [
""" % (DATE, SLUG, repr(TAGS))

# Build the 8 entries
entry_lines = []
for (loc, title, desc) in ENTRIES:
    entry_lines.append("""  {
    slug: DAILY_SLUG_10,
    locale: '%s',
    title: %r,
    description: %r,
    date: DAILY_DATE_10,
    cover: `/blog-covers/${DAILY_SLUG_10}-%s.png`,
    tags: DAILY_TAGS_10,
    readingMinutes: 5,
  },""" % (loc, title, desc, loc))

DAILY10_BLOCK = DAILY10_CONSTS + "\n".join(entry_lines) + "\n];\n"

# Insert before `export const blogPosts: BlogPost[] = [`
ANCHOR = "export const blogPosts: BlogPost[] = ["
assert ANCHOR in src, "anchor not found"
new_src = src.replace(ANCHOR, DAILY10_BLOCK + ANCHOR, 1)

# Append `...dailyPosts10,` after `...dailyPosts9,`
SPREAD_ANCHOR = "  ...dailyPosts9,\n];"
SPREAD_NEW = "  ...dailyPosts9,\n  ...dailyPosts10,\n];"
assert SPREAD_ANCHOR in new_src, "spread anchor not found"
new_src = new_src.replace(SPREAD_ANCHOR, SPREAD_NEW, 1)

with open(PATH, "w", encoding="utf-8") as f:
    f.write(new_src)

print("Patched blog-posts.ts (size: %d → %d bytes)" % (len(src), len(new_src)))
