import chroma from "chroma-js";

// chroma-js ships the CSS named colors at runtime, but not in its typings.
const NAMED = (chroma as unknown as { colors: Record<string, string> }).colors;

const ENTRIES = Object.entries(NAMED)
  .filter(([name]) => !name.includes("grey")) // keep "gray" spellings
  .map(([name, hex]) => ({ name, color: chroma(hex) }));

const PREFIXES = ["dark", "light", "medium", "pale", "deep", "dim"];
const SUFFIXES = [
  "blue", "green", "red", "gray", "yellow", "pink", "orange", "violet",
  "purple", "brown", "white", "black", "cyan", "gold", "rod", "turquoise",
  "salmon", "coral", "magenta", "olive", "orchid", "sea", "slate",
];

function prettify(name: string): string {
  const parts: string[] = [];
  let rest = name;

  const prefix = PREFIXES.find((p) => rest.startsWith(p) && rest.length > p.length);
  if (prefix) {
    parts.push(prefix);
    rest = rest.slice(prefix.length);
  }

  const suffix = SUFFIXES.find((s) => rest.endsWith(s) && rest.length > s.length);
  if (suffix) {
    parts.push(rest.slice(0, -suffix.length), suffix);
  } else {
    parts.push(rest);
  }

  return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(" ");
}

export function getColorName(hex: string): string {
  const target = chroma(hex);
  let best = ENTRIES[0];
  let bestDistance = Infinity;

  for (const entry of ENTRIES) {
    const distance = chroma.deltaE(target, entry.color);
    if (distance < bestDistance) {
      bestDistance = distance;
      best = entry;
    }
  }
  return prettify(best.name);
}
