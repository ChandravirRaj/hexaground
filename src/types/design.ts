import type { PreviewCategoryId } from "@/utils/previewCategories";
import type { ThemeMode, ThemeScheme } from "@/utils/mobileTheme";

export type PreviewDevice = "mobile" | "web";

/** An App Preview setup the user chose to keep. */
export interface SavedDesign {
  id: string;
  name: string;
  hex: string;
  opacity: number;
  category: PreviewCategoryId;
  device: PreviewDevice;
  scheme: ThemeScheme;
  mode: ThemeMode;
  createdAt: number;
}
