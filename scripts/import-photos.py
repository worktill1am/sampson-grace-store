"""Turn Albert's product photos into web images in public/products/.

Usage: python3 scripts/import-photos.py <folder with the original photos>
Finds each photo by its file-name prefix (01.jpg .. 20.jpg) and writes <name>.webp (max 1200px) and <name>-sm.webp (max 480px).
"""
import sys
from pathlib import Path
from PIL import Image

OUT = Path(__file__).resolve().parent.parent / "public" / "products"

# (file-name prefix, output name, crop box in source pixels or None). Names match lib/products.ts.
PHOTOS = [
    ("01", "mug-jesus-is-my-saviour", "square"),  # mug lead photo
    ("02", "tee-psalm-23", None),
    # Phone screenshot: crop to just the photo (no status bar, browser bars or bottom Google bar).
    ("03", "tee-faith-looks-good-on-me", (0, 282, 717, 1336)),
    ("04", "tee-faith-over-fear", None),
    ("05", "tee-walk-in-the-spirit", None),
    ("06", "tee-jesus-saves", None),
    ("07", "frame-i-can-do-all-things", None),
    ("08", "frame-the-lord-is-my-shepherd", None),
    ("09", "keychains", None),
    ("10", "cap-navy-jesus-is-my-shepherd", None),
    ("11", "mug-last-supper", None),
    ("12", "mug-ego-is-the-enemy", None),
    ("13", "mug-i-can-do-all-things", None),
    ("14", "mug-i-am-the-way", None),
    ("15", "mug-light-of-the-world", None),
    ("16", "cap-black-jesus-saves-me", None),
    ("17", "cap-black-jesus-is-my-shepherd", None),
    ("18", "cap-red-jesus-is-my-shepherd", "square"),  # cap lead photo
    ("19", "cap-yellow-jesus-is-my-shepherd", None),
    ("20", "cap-white-jesus-saves-me", None),
    # AI-made sample photos for products with no real photo yet. Shown with a "Sample photo" tag.
    ("sample-christmas-gifts", "sample-christmas-gifts", None),
    ("sample-church-gifts", "sample-church-gifts", None),
    ("sample-souvenirs", "sample-souvenirs", None),
    # Free Pexels photo of a faith-printed tee, the T-shirt lead photo (credit in README). "Sample photo" tag.
    ("sample-tee", "sample-tee", (100, 560, 1530, 1990)),
]


def pad_square(im: Image.Image) -> Image.Image:
    """Extend a plain studio background to a square, top and bottom each in its own edge colour, so square tiles show the whole product."""
    w, h = im.size
    if h >= w:
        return im
    edge = lambda y: tuple(sum(c) // w for c in zip(*(im.getpixel((x, y)) for x in range(w))))
    top, bottom = (w - h) // 2, w - h - (w - h) // 2
    out = Image.new("RGB", (w, w), edge(0))
    out.paste(Image.new("RGB", (w, bottom + h // 2), edge(h - 1)), (0, top + h // 2))
    out.paste(im, (0, top))
    return out


def main(src: Path) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for prefix, name, crop in PHOTOS:
        [path] = list(src.glob(prefix + "*"))
        im = Image.open(path).convert("RGB")
        if crop == "square":  # lead photos on a plain studio background: pad to a square so tiles show the whole product
            im = pad_square(im)
        elif crop:
            im = im.crop(crop)
        for suffix, size in (("", 1200), ("-sm", 480)):
            out = im.copy()
            out.thumbnail((size, size), Image.LANCZOS)
            out.save(OUT / f"{name}{suffix}.webp", "WEBP", quality=82, method=6)
        print(f"{name}: {im.size}")


if __name__ == "__main__":
    main(Path(sys.argv[1]))
