import chroma from "chroma-js";

const SAMPLE_SIZE = 96;
const MIN_DISTANCE = 14;

/** Dominant colors of RGBA pixel data, most common first. Skips transparent pixels. */
export function extractPalette(data: Uint8ClampedArray, count = 6): string[] {
  // Bucket to 4 bits per channel so near-identical pixels count together.
  const buckets = new Map<number, { n: number; r: number; g: number; b: number }>();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue;
    const key = ((data[i] >> 4) << 8) | ((data[i + 1] >> 4) << 4) | (data[i + 2] >> 4);
    const bucket = buckets.get(key);
    if (bucket) {
      bucket.n++;
      bucket.r += data[i];
      bucket.g += data[i + 1];
      bucket.b += data[i + 2];
    } else {
      buckets.set(key, { n: 1, r: data[i], g: data[i + 1], b: data[i + 2] });
    }
  }

  const ranked = [...buckets.values()]
    .sort((a, b) => b.n - a.n)
    .map((b) => chroma(b.r / b.n, b.g / b.n, b.b / b.n));

  // Take the most common colors, skipping any too close to one already picked.
  const picked: chroma.Color[] = [];
  for (const color of ranked) {
    if (picked.every((p) => chroma.deltaE(p, color) >= MIN_DISTANCE)) picked.push(color);
    if (picked.length === count) break;
  }
  return picked.map((c) => c.hex());
}

/** Loads an image file, downsizes it, and returns its dominant colors plus a preview URL. */
export async function paletteFromFile(
  file: File,
  count = 6
): Promise<{ colors: string[]; previewUrl: string }> {
  const bitmap = await createImageBitmap(file);
  try {
    const scale = Math.min(1, SAMPLE_SIZE / Math.max(bitmap.width, bitmap.height));
    const w = Math.max(1, Math.round(bitmap.width * scale));
    const h = Math.max(1, Math.round(bitmap.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("Canvas is not supported");
    ctx.drawImage(bitmap, 0, 0, w, h);
    const colors = extractPalette(ctx.getImageData(0, 0, w, h).data, count);
    if (colors.length === 0) throw new Error("No colors found");
    return { colors, previewUrl: URL.createObjectURL(file) };
  } finally {
    bitmap.close();
  }
}
