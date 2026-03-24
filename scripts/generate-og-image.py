#!/usr/bin/env python3
"""
Generate the OG image for social sharing previews.
Creates a 1200x630 PNG at public/og-image.png with spring theme branding.

Usage:
    pip3 install Pillow
    python3 scripts/generate-og-image.py

If Pillow is not available, falls back to a minimal pure-Python PNG generator
with geometric elements only (no text rendering).
"""
import struct
import zlib
import os
import sys

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
OUTPUT_PATH = os.path.join(PROJECT_ROOT, "public", "og-image.png")

WIDTH, HEIGHT = 1200, 630
BG = (250, 249, 246)       # warm white #faf9f6
SAGE = (107, 143, 113)     # sage green #6b8f71
AMBER = (196, 125, 46)     # amber #c47d2e
DARK = (45, 45, 45)


def generate_with_pillow():
    """Generate a polished OG image using Pillow (preferred)."""
    from PIL import Image, ImageDraw, ImageFont

    img = Image.new("RGB", (WIDTH, HEIGHT), BG)
    draw = ImageDraw.Draw(img)

    # Top and bottom sage green accent bars
    draw.rectangle([0, 0, WIDTH, 8], fill=SAGE)
    draw.rectangle([0, HEIGHT - 8, WIDTH, HEIGHT], fill=SAGE)

    # Left vertical accent line
    draw.rectangle([80, 180, 86, 420], fill=SAGE)

    # Amber decorative bar
    draw.rectangle([110, 290, 200, 296], fill=AMBER)

    # Try system fonts for nice text
    title_font = None
    subtitle_font = None
    for path in [
        "/System/Library/Fonts/Supplemental/Georgia.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
    ]:
        try:
            title_font = ImageFont.truetype(path, 72)
            break
        except (OSError, IOError):
            continue

    for path in [
        "/System/Library/Fonts/Helvetica.ttc",
        "/System/Library/Fonts/Supplemental/Helvetica.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]:
        try:
            subtitle_font = ImageFont.truetype(path, 36)
            break
        except (OSError, IOError):
            continue

    if title_font is None:
        title_font = ImageFont.load_default()
    if subtitle_font is None:
        subtitle_font = ImageFont.load_default()

    # Name
    draw.text((110, 190), "Ravi Both", fill=DARK, font=title_font)

    # Subtitle
    draw.text(
        (110, 320),
        "Full-Stack Engineer & Tech Consultant",
        fill=SAGE,
        font=subtitle_font,
    )

    # Amber dot decorations
    for cx in [116, 140, 164]:
        draw.ellipse([cx - 6, 400, cx + 6, 412], fill=AMBER)

    img.save(OUTPUT_PATH, "PNG", optimize=True)
    return os.path.getsize(OUTPUT_PATH)


def generate_minimal():
    """Generate a minimal PNG using only the standard library (fallback)."""

    def make_chunk(chunk_type, data):
        c = chunk_type + data
        crc = struct.pack(">I", zlib.crc32(c) & 0xFFFFFFFF)
        return struct.pack(">I", len(data)) + c + crc

    # Build raw pixel rows
    rows = bytearray()
    for y in range(HEIGHT):
        rows.append(0)  # no filter
        for x in range(WIDTH):
            # Determine pixel color
            color = BG
            # Top bar
            if y < 8:
                color = SAGE
            # Bottom bar
            elif y >= HEIGHT - 8:
                color = SAGE
            # Left vertical accent
            elif 80 <= x < 86 and 180 <= y < 420:
                color = SAGE
            # Amber bar
            elif 110 <= x < 200 and 290 <= y < 296:
                color = AMBER
            # Amber dots
            else:
                for cx in [116, 140, 164]:
                    if (x - cx) ** 2 + (y - 406) ** 2 <= 36:
                        color = AMBER
                        break
            rows.extend(color)

    ihdr_data = struct.pack(">IIBBBBB", WIDTH, HEIGHT, 8, 2, 0, 0, 0)
    idat_data = zlib.compress(bytes(rows), 9)

    png = b"\x89PNG\r\n\x1a\n"
    png += make_chunk(b"IHDR", ihdr_data)
    png += make_chunk(b"IDAT", idat_data)
    png += make_chunk(b"IEND", b"")

    with open(OUTPUT_PATH, "wb") as f:
        f.write(png)

    return os.path.getsize(OUTPUT_PATH)


if __name__ == "__main__":
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    try:
        size = generate_with_pillow()
        method = "Pillow"
    except ImportError:
        print("Pillow not available, using minimal fallback generator...")
        size = generate_minimal()
        method = "pure Python (minimal)"

    print(f"Generated {OUTPUT_PATH}")
    print(f"  Method: {method}")
    print(f"  Size: {size} bytes ({size / 1024:.1f} KB)")
    print(f"  Dimensions: {WIDTH}x{HEIGHT}")

    if size > 300_000:
        print("  WARNING: File exceeds 300KB target!", file=sys.stderr)
        sys.exit(1)
