"use client";

import { HueSlider } from "./HueSlider";
import { OpacitySlider } from "./OpacitySlider";
import { SaturationPicker } from "./SaturationPicker";

export function ColorPicker() {
  return (
    <section
      aria-label="Interactive color picker"
      className="grid min-h-0 flex-1 grid-rows-[minmax(72px,1fr)_auto_auto] gap-3 md:grid-rows-[minmax(90px,1fr)_auto_auto]"
    >
      <SaturationPicker />
      <HueSlider />
      <OpacitySlider />
    </section>
  );
}
