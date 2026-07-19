export type ColorFormat = "hex" | "rgb" | "rgba" | "hsl";

export interface ColorState {
  hue: number;
  saturation: number;
  lightness: number;
  opacity: number;
}

export interface RecentColor {
  hex: string;
  opacity: number;
  timestamp: number;
}

export interface FavoriteColor {
  id: string;
  hex: string;
  opacity: number;
  savedAt: number;
}

export const DEFAULT_COLOR: ColorState = {
  hue: 223,
  saturation: 100,
  lightness: 65,
  opacity: 1,
};
