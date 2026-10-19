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

export interface PaletteColor {
  hex: string;
  opacity: number;
}

export interface Palette {
  id: string;
  name: string;
  colors: PaletteColor[];
  createdAt: number;
  updatedAt: number;
  favorite?: boolean;
  /** Manual position within the favorite / non-favorite group (lower first). */
  order?: number;
}

/** #287D8A */
export const DEFAULT_COLOR: ColorState = {
  hue: 188,
  saturation: 55,
  lightness: 35,
  opacity: 1,
};
