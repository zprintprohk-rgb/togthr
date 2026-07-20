import urllib.request, ssl, sys
from concurrent.futures import ThreadPoolExecutor

ctx = ssl.create_default_context()
slugs = ['tamagotchi-app-2026', 'things-to-do-with-long-distance-boyfriend', 'best-virtual-pet-apps-2026']
locales = ['en', 'zh-cn', 'zh-tw', 'ja', 'ko', 'de', 'fr', 'es']
urls = [f'https://togthr.life/{l}/blog/{s}' for s in slugs for l in locales]

def check(u):
    try:
        req = urllib.request.Request(u, headers={'User-Agent': 'mavis/check'})
        with urllib.request.urlopen(req, context=ctx, timeout=15) as r:
            return (u, r.status, len(r.read()))
    except Exception as e:
        return (u, 'ERR', str(e)[:60])

with ThreadPoolExecutor(max_workers=8) as ex:
    results = list(ex.map(check, urls))

ok = sum(1 for _, s, _ in results if s == 200)
print(f'{ok}/{len(results)} URLs returned 200')
for u, s, b in results:
    if s != 200:
        print(f'  FAIL: {u} -> {s} {b}')
