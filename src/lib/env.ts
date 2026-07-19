const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Hexelly";
const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? "development";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const STORAGE_PREFIX = process.env.NEXT_PUBLIC_STORAGE_PREFIX ?? "hexelly";
const ENABLE_DEBUG = process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true";

export const env = {
  appName: APP_NAME,
  appEnv: APP_ENV,
  appUrl: APP_URL,
  storagePrefix: STORAGE_PREFIX,
  enableDebug: ENABLE_DEBUG,
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;

export function getStorageKey(suffix: "recent" | "favorites" | "color-store") {
  return `${env.storagePrefix}-${suffix}`;
}
