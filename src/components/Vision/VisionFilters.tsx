import { filterMatrix, VISION_MODES } from "@/utils/colorBlindness";

/** SVG filters referenced by `visionFilter()`. Rendered once, off-screen. */
export function VisionFilters() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="pointer-events-none absolute">
      <defs>
        {VISION_MODES.filter((m) => m.id !== "normal").map((m) => (
          <filter key={m.id} id={`vision-${m.id}`} colorInterpolationFilters="linearRGB">
            <feColorMatrix type="matrix" values={filterMatrix(m.id as Exclude<typeof m.id, "normal">)} />
          </filter>
        ))}
      </defs>
    </svg>
  );
}
