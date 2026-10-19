const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Hexaground";
const APP_ENV = process.env.NEXT_PUBLIC_APP_ENV ?? process.env.NODE_ENV ?? "development";
const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
const STORAGE_PREFIX = process.env.NEXT_PUBLIC_STORAGE_PREFIX ?? "hexaground";
const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";
const ENABLE_DEBUG = process.env.NEXT_PUBLIC_ENABLE_DEBUG === "true";

const FIREBASE_CONFIG = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ?? "",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? "",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ?? "",
} as const;

export const env = {
  appName: APP_NAME,
  appEnv: APP_ENV,
  appUrl: APP_URL,
  storagePrefix: STORAGE_PREFIX,
  contactEmail: CONTACT_EMAIL,
  enableDebug: ENABLE_DEBUG,
  firebase: FIREBASE_CONFIG,
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
} as const;

export function getStorageKey(suffix: "recent" | "favorites" | "color-store" | "settings" | "session") {
  return `${env.storagePrefix}-${suffix}`;
}
