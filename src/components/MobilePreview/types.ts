import type { LucideIcon } from "lucide-react";

export interface NotificationItem {
  icon: LucideIcon;
  title: string;
  sub: string;
  time: string;
  unread: boolean;
  /** Tailwind classes for the icon bubble. */
  tone: string;
}

/** Text and icons that the shared screens swap per app category. */
export interface CategoryCopy {
  walkthrough: { icon: LucideIcon; title: string; text: string };
  login: { title: string; text: string };
  profile: {
    name: string;
    email: string;
    initials: string;
    stats: [string, string][];
    rows: { label: string; icon: LucideIcon }[];
  };
  notifications: NotificationItem[];
}

export interface ScreenProps {
  copy: CategoryCopy;
}
