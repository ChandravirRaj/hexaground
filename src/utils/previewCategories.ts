export const PREVIEW_CATEGORY_IDS = [
  "general",
  "food",
  "ecommerce",
  "salon",
  "fitness",
  "travel",
  "finance",
  "education",
  "healthcare",
] as const;

export type PreviewCategoryId = (typeof PREVIEW_CATEGORY_IDS)[number];

export function isPreviewCategoryId(value: unknown): value is PreviewCategoryId {
  return typeof value === "string" && (PREVIEW_CATEGORY_IDS as readonly string[]).includes(value);
}
