import type { LucideIcon } from "lucide-react";
import {
  ArrowLeft,
  Bell,
  Bookmark,
  Check,
  ChevronRight,
  CreditCard,
  Eye,
  Gift,
  Heart,
  Home,
  LayoutList,
  Lock,
  Mail,
  MessageCircle,
  Moon,
  Package,
  Plus,
  Search,
  Send,
  Settings,
  ShoppingBag,
  Sparkles,
  Star,
  Tag,
  TrendingUp,
  User,
  Wallet,
} from "lucide-react";

import type { ScreenProps } from "@/components/MobilePreview/types";
import { cn } from "@/lib/cn";

export function TabBar({
  active,
  icons = [Home, LayoutList, Wallet, User],
}: {
  active: number;
  icons?: LucideIcon[];
}) {
  const tabs = icons;
  return (
    <div className="mt-auto flex shrink-0 items-center justify-around border-t border-m-border bg-m-surface px-2 py-3">
      {tabs.map((Icon, i) => (
        <Icon
          key={i}
          className={cn("h-5 w-5", i === active ? "text-m-ink" : "text-m-muted")}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export function WalkthroughScreen({ copy }: ScreenProps) {
  const Icon = copy.walkthrough.icon;
  return (
    <div className="flex flex-1 flex-col px-6 pb-6 pt-4">
      <div className="flex justify-end">
        <span className="text-xs font-medium text-m-muted">Skip</span>
      </div>

      <div className="relative mx-auto mt-6 flex h-44 w-44 items-center justify-center">
        <span className="absolute inset-0 rounded-full bg-m-container" />
        <span className="absolute -right-2 top-4 h-10 w-10 rounded-full bg-m-accent" />
        <span className="absolute -left-1 bottom-6 h-6 w-6 rounded-full bg-m-primary opacity-70" />
        <span className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-m-primary text-m-on-primary shadow-lg">
          <Icon className="h-11 w-11" aria-hidden="true" />
        </span>
      </div>

      <h3 className="mt-8 text-center text-xl font-bold">{copy.walkthrough.title}</h3>
      <p className="mt-2 text-center text-xs leading-relaxed text-m-muted">
        {copy.walkthrough.text}
      </p>

      <div className="mt-auto flex flex-col gap-4">
        <div className="flex justify-center gap-1.5" aria-hidden="true">
          <span className="h-1.5 w-6 rounded-full bg-m-primary" />
          <span className="h-1.5 w-1.5 rounded-full bg-m-border" />
          <span className="h-1.5 w-1.5 rounded-full bg-m-border" />
        </div>
        <button
          type="button"
          tabIndex={-1}
          className="rounded-2xl bg-m-primary py-3 text-sm font-semibold text-m-on-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export function DashboardScreen() {
  const bars = [40, 65, 50, 85, 60, 95, 75];
  const tiles = [
    { label: "Orders", value: "128", icon: ShoppingBag },
    { label: "Growth", value: "+12%", icon: TrendingUp },
    { label: "Saved", value: "34", icon: Bookmark },
    { label: "Offers", value: "6", icon: Sparkles },
  ];

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-m-muted">Good morning</p>
            <p className="text-sm font-bold">Alex Morgan</p>
          </div>
          <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-m-surface ring-1 ring-m-border">
            <Bell className="h-4 w-4" aria-hidden="true" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-m-danger" />
          </span>
        </div>

        <div className="rounded-2xl bg-m-primary p-4 text-m-on-primary">
          <p className="text-[10px] opacity-80">Total balance</p>
          <p className="mt-0.5 text-2xl font-bold">$12,480</p>
          <div className="mt-3 flex h-12 items-end gap-1.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className="flex-1 rounded-sm bg-m-on-primary opacity-60"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {tiles.map(({ label, value, icon: Icon }, i) => (
            <div key={label} className="rounded-xl bg-m-surface p-3 ring-1 ring-m-border">
              <span
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-lg",
                  i % 2 ? "bg-m-accent text-m-on-accent" : "bg-m-container text-m-on-container"
                )}
              >
                <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <p className="mt-2 text-base font-bold">{value}</p>
              <p className="text-[10px] text-m-muted">{label}</p>
            </div>
          ))}
        </div>
      </div>
      <TabBar active={0} />
    </>
  );
}

export function ListScreen() {
  const chips = ["All", "Active", "Done"];
  const items = [
    { title: "Design review", sub: "Today, 10:30", badge: "New", tone: "bg-m-accent text-m-on-accent" },
    { title: "Team lunch", sub: "Today, 13:00", badge: "Done", tone: "bg-m-success text-white" },
    { title: "Client call", sub: "Tomorrow, 09:00", badge: "Soon", tone: "bg-m-warning text-white" },
    { title: "Invoice #204", sub: "Fri, 17:00", badge: "Late", tone: "bg-m-danger text-white" },
    { title: "Sprint planning", sub: "Mon, 11:00", badge: "New", tone: "bg-m-accent text-m-on-accent" },
  ];

  return (
    <>
      <div className="relative flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-2">
        <p className="text-base font-bold">Tasks</p>

        <div className="flex items-center gap-2 rounded-xl bg-m-surface px-3 py-2 ring-1 ring-m-border">
          <Search className="h-3.5 w-3.5 text-m-muted" aria-hidden="true" />
          <span className="text-xs text-m-muted">Search tasks</span>
        </div>

        <div className="flex gap-2">
          {chips.map((chip, i) => (
            <span
              key={chip}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-medium",
                i === 0
                  ? "bg-m-primary text-m-on-primary"
                  : "bg-m-surface text-m-muted ring-1 ring-m-border"
              )}
            >
              {chip}
            </span>
          ))}
        </div>

        <ul className="flex flex-col gap-2">
          {items.map((item, i) => (
            <li
              key={item.title}
              className={cn(
                "flex items-center gap-3 rounded-xl p-2.5 ring-1",
                i === 0 ? "bg-m-container ring-m-primary" : "bg-m-surface ring-m-border"
              )}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-m-bg text-m-ink">
                <LayoutList className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold">{item.title}</span>
                <span className="block text-[10px] text-m-muted">{item.sub}</span>
              </span>
              <span className={cn("rounded-full px-2 py-0.5 text-[9px] font-semibold", item.tone)}>
                {item.badge}
              </span>
            </li>
          ))}
        </ul>

        <span className="absolute bottom-3 right-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-m-primary text-m-on-primary shadow-lg">
          <Plus className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
      <TabBar active={1} />
    </>
  );
}

export function ProfileScreen({ copy }: ScreenProps) {
  const { name, email, initials, stats, rows } = copy.profile;

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-2">
        <div className="flex flex-col items-center gap-1.5">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-m-primary text-xl font-bold text-m-on-primary ring-4 ring-m-container">
            {initials}
          </span>
          <p className="text-sm font-bold">{name}</p>
          <p className="text-[10px] text-m-muted">{email}</p>
        </div>

        <div className="grid grid-cols-3 divide-x divide-m-border rounded-xl bg-m-surface py-2.5 text-center ring-1 ring-m-border">
          {stats.map(([value, label]) => (
            <div key={label}>
              <p className="text-sm font-bold">{value}</p>
              <p className="text-[10px] text-m-muted">{label}</p>
            </div>
          ))}
        </div>

        <ul className="overflow-hidden rounded-xl bg-m-surface ring-1 ring-m-border">
          {rows.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="flex items-center gap-3 border-b border-m-border px-3 py-2.5 last:border-b-0"
            >
              <Icon className="h-4 w-4 text-m-ink" aria-hidden="true" />
              <span className="flex-1 text-xs">{label}</span>
              <ChevronRight className="h-3.5 w-3.5 text-m-muted" aria-hidden="true" />
            </li>
          ))}
          <li className="flex items-center gap-3 px-3 py-2.5">
            <Moon className="h-4 w-4 text-m-ink" aria-hidden="true" />
            <span className="flex-1 text-xs">Dark mode</span>
            <span className="flex h-4 w-7 items-center rounded-full bg-m-primary p-0.5">
              <span className="ml-auto h-3 w-3 rounded-full bg-m-on-primary" />
            </span>
          </li>
        </ul>

        <button
          type="button"
          tabIndex={-1}
          className="rounded-xl bg-m-primary py-2.5 text-xs font-semibold text-m-on-primary"
        >
          Edit profile
        </button>
        <p className="text-center text-xs font-medium text-m-danger">Log out</p>
      </div>
      <TabBar active={3} />
    </>
  );
}

export function LoginScreen({ copy }: ScreenProps) {
  return (
    <div className="flex flex-1 flex-col px-6 pb-6 pt-6">
      <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-m-primary text-m-on-primary shadow-lg">
        <Lock className="h-6 w-6" aria-hidden="true" />
      </span>
      <h3 className="mt-5 text-2xl font-bold">{copy.login.title}</h3>
      <p className="mt-1 text-xs text-m-muted">{copy.login.text}</p>

      <div className="mt-6 flex flex-col gap-3">
        <div className="flex items-center gap-2.5 rounded-xl bg-m-surface px-3 py-3 ring-1 ring-m-primary">
          <Mail className="h-4 w-4 text-m-ink" aria-hidden="true" />
          <span className="text-xs">alex@example.com</span>
        </div>
        <div className="flex items-center gap-2.5 rounded-xl bg-m-surface px-3 py-3 ring-1 ring-m-border">
          <Lock className="h-4 w-4 text-m-muted" aria-hidden="true" />
          <span className="flex-1 text-xs tracking-widest text-m-muted">••••••••</span>
          <Eye className="h-4 w-4 text-m-muted" aria-hidden="true" />
        </div>
        <p className="self-end text-[11px] font-medium text-m-ink">Forgot password?</p>
      </div>

      <button
        type="button"
        tabIndex={-1}
        className="mt-4 rounded-2xl bg-m-primary py-3 text-sm font-semibold text-m-on-primary"
      >
        Sign in
      </button>

      <div className="my-4 flex items-center gap-3 text-[10px] text-m-muted" aria-hidden="true">
        <span className="h-px flex-1 bg-m-border" />
        or
        <span className="h-px flex-1 bg-m-border" />
      </div>

      <button
        type="button"
        tabIndex={-1}
        className="rounded-2xl bg-m-surface py-3 text-sm font-medium ring-1 ring-m-border"
      >
        Continue with Google
      </button>

      <p className="mt-auto text-center text-xs text-m-muted">
        New here? <span className="font-semibold text-m-ink">Create account</span>
      </p>
    </div>
  );
}

export function ProductScreen() {
  const swatches = ["bg-m-primary", "bg-m-accent", "bg-m-text", "bg-m-muted"];
  const sizes = ["S", "M", "L", "XL"];

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <div className="flex items-center justify-between">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-m-surface ring-1 ring-m-border">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-m-surface ring-1 ring-m-border">
            <Heart className="h-4 w-4 text-m-danger" aria-hidden="true" />
          </span>
        </div>

        <div className="relative flex h-40 items-center justify-center overflow-hidden rounded-2xl bg-m-container">
          <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-m-accent opacity-60" />
          <span className="absolute -bottom-8 -left-4 h-24 w-24 rounded-full bg-m-primary opacity-40" />
          <ShoppingBag className="relative h-16 w-16 text-m-on-container" aria-hidden="true" />
        </div>

        <div>
          <div className="flex items-start justify-between gap-2">
            <p className="text-base font-bold leading-tight">Everyday Backpack</p>
            <p className="text-base font-bold text-m-ink">$89</p>
          </div>
          <div className="mt-1 flex items-center gap-1 text-[11px] text-m-muted">
            <Star className="h-3 w-3 fill-m-warning text-m-warning" aria-hidden="true" />
            4.8 · 212 reviews
          </div>
        </div>

        <div className="flex items-center gap-2">
          {swatches.map((c, i) => (
            <span
              key={c}
              className={cn(
                "h-6 w-6 rounded-full",
                c,
                i === 0 && "ring-2 ring-m-primary ring-offset-2 ring-offset-m-bg"
              )}
            />
          ))}
        </div>

        <div className="flex gap-2">
          {sizes.map((size, i) => (
            <span
              key={size}
              className={cn(
                "flex h-8 w-10 items-center justify-center rounded-lg text-xs font-medium",
                i === 1
                  ? "bg-m-primary text-m-on-primary"
                  : "bg-m-surface text-m-muted ring-1 ring-m-border"
              )}
            >
              {size}
            </span>
          ))}
        </div>

        <p className="text-[11px] leading-relaxed text-m-muted">
          Water-resistant fabric with a padded laptop sleeve and plenty of pockets.
        </p>
      </div>

      <div className="flex shrink-0 items-center gap-3 border-t border-m-border bg-m-surface px-4 py-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-m-container text-m-on-container">
          <Bookmark className="h-5 w-5" aria-hidden="true" />
        </span>
        <button
          type="button"
          tabIndex={-1}
          className="flex-1 rounded-xl bg-m-primary py-3 text-sm font-semibold text-m-on-primary"
        >
          Add to cart
        </button>
      </div>
    </>
  );
}

export function ChatScreen() {
  const messages = [
    { mine: false, text: "Hey! Did you see the new colors?" },
    { mine: true, text: "Yes, they look great 🎨" },
    { mine: false, text: "Want to use them for the app?" },
    { mine: true, text: "Definitely. Sending the palette now." },
  ];

  return (
    <>
      <div className="flex shrink-0 items-center gap-3 border-b border-m-border bg-m-surface px-4 py-2.5">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-m-accent text-xs font-bold text-m-on-accent">
          JS
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-m-success ring-2 ring-m-surface" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xs font-semibold">Jamie Smith</p>
          <p className="text-[10px] text-m-success">Online</p>
        </div>
        <MessageCircle className="h-4 w-4 text-m-ink" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 overflow-hidden px-4 py-3">
        <p className="self-center rounded-full bg-m-container px-2.5 py-0.5 text-[10px] text-m-on-container">
          Today
        </p>
        {messages.map((m) => (
          <div key={m.text} className={cn("flex", m.mine ? "justify-end" : "justify-start")}>
            <span
              className={cn(
                "max-w-[80%] rounded-2xl px-3 py-2 text-xs leading-snug",
                m.mine
                  ? "rounded-br-md bg-m-primary text-m-on-primary"
                  : "rounded-bl-md bg-m-surface ring-1 ring-m-border"
              )}
            >
              {m.text}
            </span>
          </div>
        ))}
        <div className="flex justify-end">
          <span className="flex items-center gap-1 rounded-2xl rounded-br-md bg-m-primary px-3 py-2 text-xs text-m-on-primary">
            <Package className="h-3.5 w-3.5" aria-hidden="true" />
            palette.json
          </span>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 border-t border-m-border bg-m-surface px-3 py-2.5">
        <span className="flex-1 rounded-full bg-m-bg px-3.5 py-2 text-xs text-m-muted ring-1 ring-m-border">
          Type a message
        </span>
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-m-primary text-m-on-primary">
          <Send className="h-4 w-4" aria-hidden="true" />
        </span>
      </div>
    </>
  );
}

export function NotificationsScreen({ copy }: ScreenProps) {
  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-2">
        <div className="flex items-center justify-between">
          <p className="text-base font-bold">Notifications</p>
          <span className="text-[11px] font-medium text-m-ink">Mark all read</span>
        </div>

        <div className="flex gap-2">
          {["All", "Unread"].map((chip, i) => (
            <span
              key={chip}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-medium",
                i === 0
                  ? "bg-m-primary text-m-on-primary"
                  : "bg-m-surface text-m-muted ring-1 ring-m-border"
              )}
            >
              {chip}
            </span>
          ))}
        </div>

        <ul className="flex flex-col gap-2">
          {copy.notifications.map(({ icon: Icon, title, sub, time, unread, tone }) => (
            <li
              key={title}
              className={cn(
                "flex items-center gap-3 rounded-xl p-2.5 ring-1",
                unread ? "bg-m-container ring-m-primary" : "bg-m-surface ring-m-border"
              )}
            >
              <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-full", tone)}>
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-semibold">{title}</span>
                <span className="block truncate text-[10px] text-m-muted">{sub}</span>
              </span>
              <span className="flex flex-col items-end gap-1">
                <span className="text-[9px] text-m-muted">{time}</span>
                {unread && <span className="h-1.5 w-1.5 rounded-full bg-m-primary" />}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <TabBar active={2} />
    </>
  );
}
