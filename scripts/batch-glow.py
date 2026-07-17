# -*- coding: utf-8 -*-
"""Batch glow processor for Togthr pet assets.
Large images: 1px stroke + 50px soft glow. Sprite: no stroke + 2px glow.
Enclosed transparent holes get white underlay (no dark holes on dark bg).
"""
import sys, os
from PIL import Image, ImageFilter
import numpy as np
from collections import deque

def fill_enclosed(mask):
    h, w = mask.shape
    seen = np.zeros_like(mask, dtype=bool)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if not mask[y, x] and not seen[y, x]:
                seen[y, x] = True; q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if not mask[y, x] and not seen[y, x]:
                seen[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            ny, nx = y + dy, x + dx
            if 0 <= ny < h and 0 <= nx < w and not mask[ny, nx] and not seen[ny, nx]:
                seen[ny, nx] = True; q.append((ny, nx))
    return mask | (~seen)

def add_glow(path, stroke, glow, boost):
    im = Image.open(path).convert('RGBA')
    a = np.array(im)
    mask = a[:, :, 3] > 10
    filled = fill_enclosed(mask)
    base = Image.fromarray((filled * 255).astype(np.uint8), 'L')
    stroke_mask = base.filter(ImageFilter.MaxFilter(stroke * 2 + 1)) if stroke > 0 else base
    glow_mask = stroke_mask.filter(ImageFilter.GaussianBlur(max(glow / 2, 0.5)))
    gm = np.clip(np.array(glow_mask).astype(np.float32) * boost, 0, 255).astype(np.uint8)
    white = Image.new('RGBA', im.size, (255, 255, 255, 255))
    out = Image.new('RGBA', im.size, (0, 0, 0, 0))
    out.paste(white, (0, 0), Image.fromarray(gm, 'L'))
    out.paste(white, (0, 0), stroke_mask)
    out.alpha_composite(im)
    out.save(path)
    return os.path.basename(path)

if __name__ == '__main__':
    start, end = int(sys.argv[1]), int(sys.argv[2])
    d = 'F:/CloudDreamerApp/togthr/public/pets'
    files = sorted(f for f in os.listdir(d) if f.endswith('.png'))
    batch = files[start:end]
    for f in batch:
        print(add_glow(os.path.join(d, f), stroke=1, glow=50, boost=1.3), flush=True)
    print('BATCH_DONE', len(batch))
