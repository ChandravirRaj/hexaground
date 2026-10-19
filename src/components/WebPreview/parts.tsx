import {
  Bell,
  Check,
  Search,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/cn";

export interface WebCopy {
  brand: string;
  domain: string;
  loginTitle: string;
  loginText: string;
  quote: string;
  quoteBy: string;
}

export interface WebScreenProps {
  copy: WebCopy;
}

export function Btn({
  children,
  variant = "primary",
  className,
}: {
  children: React.ReactNode;
  variant?: "primary" | "outline" | "soft" | "accent";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-semibold",
        variant === "primary" && "bg-m-primary text-m-on-primary",
        variant === "accent" && "bg-m-accent text-m-on-accent",
        variant === "soft" && "bg-m-container text-m-on-container",
        variant === "outline" && "bg-m-surface ring-1 ring-m-border",
        className
      )}
    >
      {children}
    </span>
  );
}

export function WebNav({
  brand,
  links,
  cta,
  active = 0,
  search,
}: {
  brand: string;
  links: string[];
  cta: string;
  active?: number;
  search?: boolean;
}) {
  return (
    <header className="flex items-center gap-10 border-b border-m-border bg-m-surface px-14 py-5">
      <div className="flex items-center gap-2.5">
        <span className="h-9 w-9 rounded-xl bg-m-primary" />
        <span className="text-2xl font-extrabold tracking-tight">{brand}</span>
      </div>
      <nav className="flex gap-8 text-sm font-medium text-m-muted">
        {links.map((l, i) => (
          <span key={l} className={cn(i === active && "text-m-ink")}>
            {l}
          </span>
        ))}
      </nav>
      <div className="ml-auto flex items-center gap-4">
        {search && (
          <span className="flex w-64 items-center gap-2 rounded-xl bg-m-bg px-4 py-2.5 text-sm text-m-muted ring-1 ring-m-border">
            <Search className="h-4 w-4" aria-hidden="true" /> Search
          </span>
        )}
        <span className="text-sm font-medium">Sign in</span>
        <Btn className="py-2.5">{cta}</Btn>
      </div>
    </header>
  );
}

export function Sidebar({
  brand,
  items,
  active = 0,
}: {
  brand: string;
  items: { label: string; icon: LucideIcon }[];
  active?: number;
}) {
  return (
    <aside className="flex w-64 shrink-0 flex-col gap-1 border-r border-m-border bg-m-surface p-5">
      <div className="mb-6 flex items-center gap-2.5 px-2">
        <span className="h-9 w-9 rounded-xl bg-m-primary" />
        <span className="text-xl font-extrabold tracking-tight">{brand}</span>
      </div>
      {items.map(({ label, icon: Icon }, i) => (
        <span
          key={label}
          className={cn(
            "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium",
            i === active ? "bg-m-container text-m-on-container" : "text-m-muted"
          )}
        >
          <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
          {label}
        </span>
      ))}
    </aside>
  );
}

export function TopBar({ title, sub }: { title: string; sub?: string }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {sub && <p className="mt-1 text-sm text-m-muted">{sub}</p>}
      </div>
      <div className="flex items-center gap-4">
        <span className="flex w-60 items-center gap-2 rounded-xl bg-m-surface px-4 py-2.5 text-sm text-m-muted ring-1 ring-m-border">
          <Search className="h-4 w-4" aria-hidden="true" /> Search
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-m-surface ring-1 ring-m-border">
          <Bell className="h-[18px] w-[18px]" aria-hidden="true" />
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-m-accent text-sm font-bold text-m-on-accent">
          AM
        </span>
      </div>
    </div>
  );
}

export function StatCard({
  icon: Icon,
  label,
  value,
  delta,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <div className="rounded-2xl bg-m-surface p-5 ring-1 ring-m-border">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-m-container text-m-on-container">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <p className="mt-4 text-sm text-m-muted">{label}</p>
      <p className="mt-0.5 flex items-baseline gap-2 text-3xl font-bold">
        {value}
        {delta && <span className="text-xs font-semibold text-m-success">{delta}</span>}
      </p>
    </div>
  );
}

export function BarChart({ values, highlight }: { values: number[]; highlight: number }) {
  return (
    <div className="flex h-44 items-end gap-3">
      {values.map((h, i) => (
        <span
          key={i}
          className={cn("flex-1 rounded-lg", i === highlight ? "bg-m-primary" : "bg-m-container")}
          style={{ height: `${h}%` }}
        />
      ))}
    </div>
  );
}

export function CheckItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-3 text-sm">
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-m-container text-m-on-container">
        <Check className="h-3 w-3" aria-hidden="true" />
      </span>
      {children}
    </li>
  );
}

export function WebLoginScreen({ copy }: WebScreenProps) {
  return (
    <div className="flex h-full">
      <div className="relative flex w-1/2 flex-col justify-between overflow-hidden bg-m-primary p-14 text-m-on-primary">
        <span className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-m-accent opacity-50" />
        <span className="absolute -bottom-32 -left-16 h-80 w-80 rounded-full bg-m-on-primary opacity-10" />
        <div className="relative flex items-center gap-2.5">
          <span className="h-9 w-9 rounded-xl bg-m-on-primary opacity-90" />
          <span className="text-2xl font-extrabold">{copy.brand}</span>
        </div>
        <div className="relative">
          <p className="text-3xl font-bold leading-snug">&ldquo;{copy.quote}&rdquo;</p>
          <p className="mt-4 text-sm opacity-80">{copy.quoteBy}</p>
        </div>
      </div>
      <div className="flex w-1/2 items-center justify-center bg-m-bg">
        <div className="w-[380px]">
          <h2 className="text-4xl font-bold tracking-tight">{copy.loginTitle}</h2>
          <p className="mt-2 text-sm text-m-muted">{copy.loginText}</p>
          <div className="mt-8 flex flex-col gap-4">
            <div>
              <p className="mb-1.5 text-xs font-semibold">Email</p>
              <div className="rounded-xl bg-m-surface px-4 py-3.5 text-sm ring-2 ring-m-primary">alex@example.com</div>
            </div>
            <div>
              <p className="mb-1.5 text-xs font-semibold">Password</p>
              <div className="rounded-xl bg-m-surface px-4 py-3.5 text-sm tracking-widest text-m-muted ring-1 ring-m-border">
                ••••••••
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 text-m-muted">
                <span className="flex h-4 w-4 items-center justify-center rounded bg-m-primary text-m-on-primary">
                  <Check className="h-3 w-3" aria-hidden="true" />
                </span>
                Remember me
              </span>
              <span className="font-semibold text-m-ink">Forgot password?</span>
            </div>
            <Btn className="py-3.5">Sign in</Btn>
            <Btn variant="outline" className="py-3.5">Continue with Google</Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
