import { useAuthStore } from "@/store/useAuthStore";

/** Set a feature to false to make it available without signing in. */
export const LOGIN_ONLY = {
  tools: true, // shades, harmonies, contrast
  eyedropper: true,
  colorName: true,
  moreFormats: true,
} as const;

export function useFeature(name: keyof typeof LOGIN_ONLY): boolean {
  const signedIn = useAuthStore((s) => s.user !== null);
  return !LOGIN_ONLY[name] || signedIn;
}
