import re
text = open(r'F:\CloudDreamerApp\togthr\src\lib\blog-posts.ts', encoding='utf-8').read()
# Find all `const X = 'Y'` and `const X = [..]` patterns
consts = re.findall(r"^\s*const\s+([A-Z][A-Z0-9_]*)\s*=\s*'([^']*)'", text, re.M)
print(f'{len(consts)} string consts:')
for k, v in consts[:30]:
    print(f'  {k} = {v!r}')
