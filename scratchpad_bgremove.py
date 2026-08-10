import numpy as np
from PIL import Image
from collections import deque

src = "/Users/sappington/Developer/my-react-app/public/product.png"
out = "/Users/sappington/Developer/my-react-app/public/product_nobg.png"

im = Image.open(src).convert("RGBA")
arr = np.array(im)
h, w = arr.shape[:2]
rgb = arr[:, :, :3].astype(np.int16)

# "Whiteness": how close a pixel is to pure white (low = white)
dist = 255 - rgb.min(axis=2)          # 0 for white, larger for colored/dark
near_white = dist < 28                 # candidate background pixels

# Flood fill from the border through near-white pixels only, so white
# regions INSIDE the bottle (label gaps, gummies highlights) are preserved.
bg = np.zeros((h, w), dtype=bool)
visited = np.zeros((h, w), dtype=bool)
dq = deque()
for x in range(w):
    for y in (0, h - 1):
        if near_white[y, x] and not visited[y, x]:
            visited[y, x] = True; dq.append((y, x))
for y in range(h):
    for x in (0, w - 1):
        if near_white[y, x] and not visited[y, x]:
            visited[y, x] = True; dq.append((y, x))
while dq:
    y, x = dq.popleft()
    bg[y, x] = True
    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
        ny, nx = y+dy, x+dx
        if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and near_white[ny, nx]:
            visited[ny, nx] = True; dq.append((ny, nx))

# Soft alpha near the edge to avoid a hard cut / white halo
alpha = np.where(bg, 0, 255).astype(np.float32)
# feather: pixels that are background-flooded but slightly colored get partial
soft = np.clip((dist - 10) / 22.0, 0, 1)   # 0..1 ramp
edge_bg = bg & (dist >= 10)
alpha[edge_bg] = (soft[edge_bg] * 255)
arr[:, :, 3] = alpha.astype(np.uint8)

# Auto-crop to opaque bounding box with small padding
ys, xs = np.where(arr[:, :, 3] > 12)
pad = 24
y0, y1 = max(ys.min()-pad, 0), min(ys.max()+pad, h)
x0, x1 = max(xs.min()-pad, 0), min(xs.max()+pad, w)
cropped = Image.fromarray(arr[y0:y1, x0:x1])
cropped.save(out)
print("saved", out, cropped.size, "| removed frac:", round(bg.mean(), 3))
