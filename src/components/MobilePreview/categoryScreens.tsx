import {
  Bell,
  Bike,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Coffee,
  Dumbbell,
  Flame,
  Footprints,
  Heart,
  Home,
  MapPin,
  Minus,
  Phone,
  Pizza,
  Plus,
  Salad,
  Scissors,
  Search,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Star,
  Timer,
  Trophy,
  User,
  Utensils,
  Wallet,
} from "lucide-react";

import { TabBar } from "@/components/MobilePreview/screens";
import { cn } from "@/lib/cn";

export function Chip({ active, children }: { active?: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-full px-3 py-1 text-[11px] font-medium",
        active ? "bg-m-primary text-m-on-primary" : "bg-m-surface text-m-muted ring-1 ring-m-border"
      )}
    >
      {children}
    </span>
  );
}

export function SearchField({ placeholder }: { placeholder: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-m-surface px-3 py-2 ring-1 ring-m-border">
      <Search className="h-3.5 w-3.5 text-m-muted" aria-hidden="true" />
      <span className="text-xs text-m-muted">{placeholder}</span>
    </div>
  );
}

export function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      tabIndex={-1}
      className="w-full rounded-2xl bg-m-primary py-3 text-sm font-semibold text-m-on-primary"
    >
      {children}
    </button>
  );
}

/* ------------------------------ Food order ------------------------------ */

export function FoodHomeScreen() {
  const categories = [
    { label: "Pizza", icon: Pizza },
    { label: "Salad", icon: Salad },
    { label: "Coffee", icon: Coffee },
    { label: "Mains", icon: Utensils },
  ];
  const places = [
    { name: "Napoli Slice", meta: "Italian · 20 min", rating: "4.8" },
    { name: "Green Bowl", meta: "Healthy · 15 min", rating: "4.6" },
  ];

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-m-muted">Deliver to</p>
            <p className="flex items-center gap-1 text-sm font-bold">
              <MapPin className="h-3.5 w-3.5 text-m-ink" aria-hidden="true" />
              Home <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
            </p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-m-surface ring-1 ring-m-border">
            <Bell className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <SearchField placeholder="Search food or restaurants" />

        <div className="relative overflow-hidden rounded-2xl bg-m-primary p-4 text-m-on-primary">
          <span className="absolute -right-5 -top-5 h-20 w-20 rounded-full bg-m-accent opacity-70" />
          <p className="relative text-[10px] opacity-80">Free delivery</p>
          <p className="relative mt-0.5 text-lg font-bold leading-tight">Hungry?<br />Get 30% off</p>
          <span className="relative mt-2 inline-block rounded-full bg-m-on-primary px-3 py-1 text-[10px] font-semibold text-m-primary">
            Order now
          </span>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {categories.map(({ label, icon: Icon }, i) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  "flex h-11 w-11 items-center justify-center rounded-2xl",
                  i === 0 ? "bg-m-primary text-m-on-primary" : "bg-m-container text-m-on-container"
                )}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[10px] text-m-muted">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs font-bold">Popular near you</p>
        <div className="grid grid-cols-2 gap-2.5">
          {places.map((p, i) => (
            <div key={p.name} className="overflow-hidden rounded-xl bg-m-surface ring-1 ring-m-border">
              <div className={cn("flex h-16 items-center justify-center", i ? "bg-m-accent text-m-on-accent" : "bg-m-container text-m-on-container")}>
                {i ? <Salad className="h-7 w-7" aria-hidden="true" /> : <Pizza className="h-7 w-7" aria-hidden="true" />}
              </div>
              <div className="p-2">
                <p className="truncate text-[11px] font-semibold">{p.name}</p>
                <p className="flex items-center gap-1 text-[9px] text-m-muted">
                  <Star className="h-2.5 w-2.5 fill-m-warning text-m-warning" aria-hidden="true" />
                  {p.rating} · {p.meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active={0} icons={[Home, Utensils, ShoppingBag, User]} />
    </>
  );
}

export function FoodDetailScreen() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <div className="relative flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-m-container">
          <span className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-m-accent opacity-60" />
          <span className="absolute -bottom-8 -right-4 h-24 w-24 rounded-full bg-m-primary opacity-40" />
          <Pizza className="relative h-16 w-16 text-m-on-container" aria-hidden="true" />
          <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-m-surface">
            <Heart className="h-4 w-4 text-m-danger" aria-hidden="true" />
          </span>
        </div>

        <div className="flex items-start justify-between">
          <div>
            <p className="text-base font-bold leading-tight">Margherita Pizza</p>
            <p className="mt-0.5 flex items-center gap-2 text-[10px] text-m-muted">
              <span className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-m-warning text-m-warning" aria-hidden="true" /> 4.8
              </span>
              <span className="flex items-center gap-0.5">
                <Clock className="h-3 w-3" aria-hidden="true" /> 20 min
              </span>
              <span className="flex items-center gap-0.5">
                <Flame className="h-3 w-3" aria-hidden="true" /> 620 kcal
              </span>
            </p>
          </div>
          <p className="text-base font-bold text-m-ink">$14</p>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold">Size</p>
          <div className="flex gap-2">
            {["Small", "Medium", "Large"].map((s, i) => (
              <Chip key={s} active={i === 1}>{s}</Chip>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold">Add-ons</p>
          <ul className="flex flex-col gap-1.5">
            {[["Extra cheese", "+$1.5", true], ["Basil leaves", "+$0.5", false]].map(([label, price, on]) => (
              <li key={String(label)} className="flex items-center gap-2 rounded-lg bg-m-surface px-3 py-2 ring-1 ring-m-border">
                <span
                  className={cn(
                    "flex h-4 w-4 items-center justify-center rounded",
                    on ? "bg-m-primary text-m-on-primary" : "ring-1 ring-m-border"
                  )}
                >
                  {on && <Check className="h-3 w-3" aria-hidden="true" />}
                </span>
                <span className="flex-1 text-xs">{label}</span>
                <span className="text-[11px] text-m-muted">{price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 border-t border-m-border bg-m-surface px-4 py-3">
        <div className="flex items-center gap-2 rounded-xl bg-m-bg px-2 py-1.5 ring-1 ring-m-border">
          <Minus className="h-4 w-4 text-m-muted" aria-hidden="true" />
          <span className="w-4 text-center text-xs font-semibold">2</span>
          <Plus className="h-4 w-4 text-m-ink" aria-hidden="true" />
        </div>
        <button type="button" tabIndex={-1} className="flex-1 rounded-xl bg-m-primary py-3 text-sm font-semibold text-m-on-primary">
          Add to cart · $31
        </button>
      </div>
    </>
  );
}

export function FoodOrderScreen() {
  const steps = [
    { label: "Order confirmed", sub: "12:02", done: true },
    { label: "Preparing your food", sub: "12:08", done: true },
    { label: "On the way", sub: "Arriving in 12 min", current: true },
    { label: "Delivered", sub: "" },
  ];

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-2">
        <div>
          <p className="text-[10px] text-m-muted">Order #1024</p>
          <p className="text-base font-bold">Arriving in 18 min</p>
        </div>

        <div className="relative flex h-24 items-center justify-center overflow-hidden rounded-2xl bg-m-container">
          <span className="absolute left-5 h-3 w-3 rounded-full bg-m-primary" />
          <span className="absolute left-5 right-9 top-1/2 border-t-2 border-dashed border-m-primary opacity-50" />
          <span className="absolute right-4 flex h-8 w-8 items-center justify-center rounded-full bg-m-primary text-m-on-primary">
            <Home className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="absolute left-1/2 flex h-9 w-9 -translate-x-1/2 items-center justify-center rounded-full bg-m-accent text-m-on-accent shadow-lg">
            <Bike className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <ol className="flex flex-col">
          {steps.map((step, i) => (
            <li key={step.label} className="flex gap-3">
              <div className="flex flex-col items-center">
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
                    step.done
                      ? "bg-m-primary text-m-on-primary"
                      : step.current
                        ? "bg-m-accent text-m-on-accent ring-4 ring-m-container"
                        : "bg-m-surface text-m-muted ring-1 ring-m-border"
                  )}
                >
                  {step.done ? <Check className="h-3 w-3" aria-hidden="true" /> : i + 1}
                </span>
                {i < steps.length - 1 && (
                  <span className={cn("h-6 w-0.5", step.done ? "bg-m-primary" : "bg-m-border")} />
                )}
              </div>
              <div className="pb-2">
                <p className={cn("text-xs font-semibold", !step.done && !step.current && "text-m-muted")}>
                  {step.label}
                </p>
                {step.sub && <p className="text-[10px] text-m-muted">{step.sub}</p>}
              </div>
            </li>
          ))}
        </ol>

        <div className="flex items-center gap-3 rounded-xl bg-m-surface p-3 ring-1 ring-m-border">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-m-container text-xs font-bold text-m-on-container">
            RK
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold">Ravi Kumar</p>
            <p className="text-[10px] text-m-muted">Your courier</p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-m-primary text-m-on-primary">
            <Phone className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
      </div>
      <TabBar active={2} icons={[Home, Utensils, ShoppingBag, User]} />
    </>
  );
}

/* ------------------------------- E-commerce ------------------------------ */

export function ShopHomeScreen() {
  const products = [
    { name: "Canvas Sneakers", price: "$64", tone: "bg-m-container text-m-on-container" },
    { name: "Wool Jacket", price: "$129", tone: "bg-m-accent text-m-on-accent" },
    { name: "Daypack", price: "$89", tone: "bg-m-accent text-m-on-accent" },
    { name: "Sun Hat", price: "$24", tone: "bg-m-container text-m-on-container" },
  ];

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <SearchField placeholder="Search products" />
          </div>
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-m-surface ring-1 ring-m-border">
            <ShoppingCart className="h-4 w-4" aria-hidden="true" />
            <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-m-danger text-[9px] font-bold text-white">
              2
            </span>
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-m-primary p-4 text-m-on-primary">
          <span className="absolute -bottom-6 -right-4 h-24 w-24 rounded-full bg-m-accent opacity-70" />
          <p className="relative text-[10px] opacity-80">Summer sale</p>
          <p className="relative text-xl font-bold">Up to 40% off</p>
          <span className="relative mt-2 inline-block rounded-full bg-m-on-primary px-3 py-1 text-[10px] font-semibold text-m-primary">
            Shop now
          </span>
        </div>

        <div className="flex gap-2 overflow-hidden">
          {["All", "Shoes", "Clothes", "Bags", "Hats"].map((c, i) => (
            <Chip key={c} active={i === 0}>{c}</Chip>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {products.map((p) => (
            <div key={p.name} className="overflow-hidden rounded-xl bg-m-surface ring-1 ring-m-border">
              <div className={cn("relative flex h-20 items-center justify-center", p.tone)}>
                <ShoppingBag className="h-7 w-7" aria-hidden="true" />
                <Heart className="absolute right-2 top-2 h-3.5 w-3.5" aria-hidden="true" />
              </div>
              <div className="p-2">
                <p className="truncate text-[11px] font-semibold">{p.name}</p>
                <p className="text-xs font-bold text-m-ink">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active={0} icons={[Home, Heart, ShoppingCart, User]} />
    </>
  );
}

export function CartScreen() {
  const items = [
    { name: "Canvas Sneakers", meta: "Size 42 · White", price: "$64", qty: 1 },
    { name: "Everyday Backpack", meta: "Navy", price: "$89", qty: 2 },
  ];

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-2">
        <p className="text-base font-bold">My cart</p>

        <ul className="flex flex-col gap-2">
          {items.map((item, i) => (
            <li key={item.name} className="flex items-center gap-3 rounded-xl bg-m-surface p-2.5 ring-1 ring-m-border">
              <span
                className={cn(
                  "flex h-14 w-14 shrink-0 items-center justify-center rounded-lg",
                  i ? "bg-m-accent text-m-on-accent" : "bg-m-container text-m-on-container"
                )}
              >
                <ShoppingBag className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{item.name}</p>
                <p className="text-[10px] text-m-muted">{item.meta}</p>
                <p className="mt-1 text-xs font-bold text-m-ink">{item.price}</p>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-m-bg px-1.5 py-1 ring-1 ring-m-border">
                <Minus className="h-3 w-3 text-m-muted" aria-hidden="true" />
                <span className="w-3 text-center text-[11px] font-semibold">{item.qty}</span>
                <Plus className="h-3 w-3 text-m-ink" aria-hidden="true" />
              </div>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 rounded-xl border border-dashed border-m-primary bg-m-container px-3 py-2">
          <Sparkles className="h-4 w-4 text-m-on-container" aria-hidden="true" />
          <span className="flex-1 text-xs text-m-on-container">SUMMER40</span>
          <span className="text-[11px] font-semibold text-m-ink">Applied</span>
        </div>

        <dl className="flex flex-col gap-1.5 text-xs">
          {[["Subtotal", "$242"], ["Shipping", "Free"], ["Discount", "-$24"]].map(([k, v]) => (
            <div key={k} className="flex justify-between">
              <dt className="text-m-muted">{k}</dt>
              <dd className="font-medium">{v}</dd>
            </div>
          ))}
          <div className="flex justify-between border-t border-m-border pt-2 text-sm font-bold">
            <dt>Total</dt>
            <dd className="text-m-ink">$218</dd>
          </div>
        </dl>
      </div>
      <div className="shrink-0 border-t border-m-border bg-m-surface px-4 py-3">
        <PrimaryButton>Checkout</PrimaryButton>
      </div>
    </>
  );
}

/* ------------------------------ Salon booking ----------------------------- */

export function SalonHomeScreen() {
  const stylists = ["Mia", "Zoe", "Liam", "Ava"];
  const services = [
    { name: "Haircut & style", meta: "45 min", price: "$40", icon: Scissors },
    { name: "Gel manicure", meta: "60 min", price: "$35", icon: Sparkles },
    { name: "Facial glow", meta: "50 min", price: "$55", icon: Heart },
  ];

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-m-muted">Hello, Sofia</p>
            <p className="text-sm font-bold">Book your glow-up</p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-m-surface ring-1 ring-m-border">
            <Bell className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <SearchField placeholder="Search services or stylists" />

        <div className="flex gap-2 overflow-hidden">
          {["All", "Hair", "Nails", "Spa", "Makeup"].map((c, i) => (
            <Chip key={c} active={i === 0}>{c}</Chip>
          ))}
        </div>

        <div>
          <p className="mb-2 text-xs font-bold">Top stylists</p>
          <div className="flex gap-3">
            {stylists.map((name, i) => (
              <div key={name} className="flex flex-col items-center gap-1">
                <span
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold",
                    i % 2 ? "bg-m-accent text-m-on-accent" : "bg-m-container text-m-on-container",
                    i === 0 && "ring-2 ring-m-primary ring-offset-2 ring-offset-m-bg"
                  )}
                >
                  {name.charAt(0)}
                </span>
                <span className="text-[10px] text-m-muted">{name}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs font-bold">Popular services</p>
        <ul className="flex flex-col gap-2">
          {services.map(({ name, meta, price, icon: Icon }) => (
            <li key={name} className="flex items-center gap-3 rounded-xl bg-m-surface p-2.5 ring-1 ring-m-border">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-m-container text-m-on-container">
                <Icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{name}</p>
                <p className="text-[10px] text-m-muted">{meta} · {price}</p>
              </div>
              <span className="rounded-full bg-m-primary px-3 py-1 text-[10px] font-semibold text-m-on-primary">
                Book
              </span>
            </li>
          ))}
        </ul>
      </div>
      <TabBar active={0} icons={[Home, Calendar, Heart, User]} />
    </>
  );
}

export function BookingScreen() {
  const days = [["Mon", 12], ["Tue", 13], ["Wed", 14], ["Thu", 15], ["Fri", 16]] as const;
  const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-2">
        <p className="text-base font-bold">Select date & time</p>

        <div className="flex items-center gap-3 rounded-xl bg-m-surface p-2.5 ring-1 ring-m-border">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-m-accent text-xs font-bold text-m-on-accent">
            M
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-semibold">Mia · Senior stylist</p>
            <p className="text-[10px] text-m-muted">Haircut & style · 45 min</p>
          </div>
          <span className="text-xs font-bold text-m-ink">$40</span>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold">October 2026</p>
          <div className="grid grid-cols-5 gap-1.5">
            {days.map(([d, n], i) => (
              <div
                key={d}
                className={cn(
                  "flex flex-col items-center rounded-xl py-2",
                  i === 2
                    ? "bg-m-primary text-m-on-primary"
                    : "bg-m-surface text-m-muted ring-1 ring-m-border"
                )}
              >
                <span className="text-[9px]">{d}</span>
                <span className={cn("text-sm font-bold", i !== 2 && "text-m-text")}>{n}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-1.5 text-xs font-semibold">Available times</p>
          <div className="grid grid-cols-3 gap-1.5">
            {slots.map((t, i) => (
              <span
                key={t}
                className={cn(
                  "rounded-lg py-2 text-center text-[11px] font-medium",
                  i === 3
                    ? "bg-m-primary text-m-on-primary"
                    : i === 1
                      ? "bg-m-container text-m-muted line-through"
                      : "bg-m-surface ring-1 ring-m-border"
                )}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="shrink-0 border-t border-m-border bg-m-surface px-4 py-3">
        <PrimaryButton>Confirm booking</PrimaryButton>
      </div>
    </>
  );
}

export function AppointmentsScreen() {
  const past = [
    ["Gel manicure", "Sep 28 · Zoe"],
    ["Facial glow", "Sep 12 · Ava"],
  ];

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-2">
        <p className="text-base font-bold">My bookings</p>

        <div className="flex gap-2">
          <Chip active>Upcoming</Chip>
          <Chip>Past</Chip>
        </div>

        <div className="rounded-2xl bg-m-primary p-4 text-m-on-primary">
          <p className="text-[10px] opacity-80">Next appointment</p>
          <p className="mt-0.5 text-base font-bold">Haircut & style</p>
          <div className="mt-3 flex flex-col gap-1.5 text-xs">
            <span className="flex items-center gap-2">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" /> Wed, Oct 14 · 14:00
            </span>
            <span className="flex items-center gap-2">
              <User className="h-3.5 w-3.5" aria-hidden="true" /> Mia · Senior stylist
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Glow Studio, 5th Ave
            </span>
          </div>
          <div className="mt-3 flex gap-2">
            <span className="flex-1 rounded-xl bg-m-on-primary py-2 text-center text-[11px] font-semibold text-m-primary">
              Reschedule
            </span>
            <span className="flex-1 rounded-xl py-2 text-center text-[11px] font-semibold ring-1 ring-m-on-primary">
              Cancel
            </span>
          </div>
        </div>

        <p className="text-xs font-bold">Past visits</p>
        <ul className="flex flex-col gap-2">
          {past.map(([name, meta]) => (
            <li key={name} className="flex items-center gap-3 rounded-xl bg-m-surface p-2.5 ring-1 ring-m-border">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-m-success text-white">
                <Check className="h-4 w-4" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{name}</p>
                <p className="text-[10px] text-m-muted">{meta}</p>
              </div>
              <span className="text-[11px] font-semibold text-m-ink">Rebook</span>
            </li>
          ))}
        </ul>
      </div>
      <TabBar active={1} icons={[Home, Calendar, Heart, User]} />
    </>
  );
}

/* --------------------------------- Fitness -------------------------------- */

function Ring({ percent, color, size, stroke }: { percent: number; color: string; size: number; stroke: number }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <circle
      cx={size / 2}
      cy={size / 2}
      r={r}
      fill="none"
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeDasharray={`${(c * percent) / 100} ${c}`}
      transform={`rotate(-90 ${size / 2} ${size / 2})`}
      style={{ stroke: color }}
    />
  );
}

export function FitnessHomeScreen() {
  const size = 130;
  const stats = [
    { icon: Footprints, label: "Steps", value: "7,420" },
    { icon: Flame, label: "Calories", value: "412" },
    { icon: Timer, label: "Active", value: "48 min" },
  ];

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-m-muted">Good morning</p>
            <p className="text-sm font-bold">Let&apos;s move, Sam</p>
          </div>
          <span className="flex items-center gap-1 rounded-full bg-m-container px-2.5 py-1 text-[10px] font-semibold text-m-on-container">
            <Flame className="h-3 w-3" aria-hidden="true" /> 12 day streak
          </span>
        </div>

        <div className="flex items-center justify-center rounded-2xl bg-m-surface py-4 ring-1 ring-m-border">
          <div className="relative">
            <svg width={size} height={size} role="img" aria-label="Activity rings">
              <circle cx={size / 2} cy={size / 2} r={(size - 12) / 2} fill="none" strokeWidth={12} style={{ stroke: "var(--m-border)" }} />
              <Ring percent={74} color="var(--m-primary)" size={size} stroke={12} />
              <circle cx={size / 2} cy={size / 2} r={(size - 40) / 2} fill="none" strokeWidth={10} style={{ stroke: "var(--m-border)" }} />
              <Ring percent={52} color="var(--m-accent)" size={size - 28} stroke={10} />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-lg font-bold">74%</span>
              <span className="text-[9px] text-m-muted">of daily goal</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {stats.map(({ icon: Icon, label, value }) => (
            <div key={label} className="rounded-xl bg-m-surface p-2.5 text-center ring-1 ring-m-border">
              <Icon className="mx-auto h-4 w-4 text-m-ink" aria-hidden="true" />
              <p className="mt-1 text-xs font-bold">{value}</p>
              <p className="text-[9px] text-m-muted">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-m-container p-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-m-primary text-m-on-primary">
            <Dumbbell className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] text-m-on-container opacity-80">Today&apos;s plan</p>
            <p className="truncate text-xs font-bold text-m-on-container">Full body HIIT · 30 min</p>
          </div>
          <span className="rounded-full bg-m-primary px-3 py-1 text-[10px] font-semibold text-m-on-primary">Start</span>
        </div>
      </div>
      <TabBar active={0} icons={[Home, Dumbbell, Trophy, User]} />
    </>
  );
}

export function WorkoutScreen() {
  const exercises = [
    ["Jump squats", "3 × 15", true],
    ["Push-ups", "3 × 12", true],
    ["Mountain climbers", "3 × 30s", false],
    ["Plank", "3 × 45s", false],
  ] as const;

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <div className="relative overflow-hidden rounded-2xl bg-m-primary p-4 text-m-on-primary">
          <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-m-accent opacity-70" />
          <Dumbbell className="relative h-6 w-6" aria-hidden="true" />
          <p className="relative mt-2 text-lg font-bold">Full body HIIT</p>
          <div className="relative mt-1 flex gap-3 text-[10px] opacity-90">
            <span className="flex items-center gap-1"><Timer className="h-3 w-3" aria-hidden="true" /> 30 min</span>
            <span className="flex items-center gap-1"><Flame className="h-3 w-3" aria-hidden="true" /> 320 kcal</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs font-bold">Exercises</p>
          <p className="text-[10px] text-m-muted">2 of 4 done</p>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-m-border">
          <span className="block h-full w-1/2 rounded-full bg-m-primary" />
        </div>

        <ul className="flex flex-col gap-2">
          {exercises.map(([name, reps, done]) => (
            <li key={name} className="flex items-center gap-3 rounded-xl bg-m-surface p-2.5 ring-1 ring-m-border">
              <span
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full",
                  done ? "bg-m-success text-white" : "bg-m-container text-m-on-container"
                )}
              >
                {done ? <Check className="h-4 w-4" aria-hidden="true" /> : <Dumbbell className="h-3.5 w-3.5" aria-hidden="true" />}
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block truncate text-xs font-semibold", done && "text-m-muted line-through")}>{name}</span>
                <span className="block text-[10px] text-m-muted">{reps}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
      <div className="shrink-0 border-t border-m-border bg-m-surface px-4 py-3">
        <PrimaryButton>Resume workout</PrimaryButton>
      </div>
    </>
  );
}

export function ProgressScreen() {
  const days = [["M", 55], ["T", 80], ["W", 40], ["T", 90], ["F", 65], ["S", 100], ["S", 30]] as const;

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-2">
        <p className="text-base font-bold">Your progress</p>

        <div className="flex gap-2">
          <Chip>Day</Chip>
          <Chip active>Week</Chip>
          <Chip>Month</Chip>
        </div>

        <div className="rounded-2xl bg-m-surface p-4 ring-1 ring-m-border">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] text-m-muted">Active minutes</p>
              <p className="text-xl font-bold">312 <span className="text-xs font-medium text-m-success">+12%</span></p>
            </div>
          </div>
          <div className="mt-3 flex h-24 items-end gap-2">
            {days.map(([d, h], i) => (
              <div key={`${d}-${i}`} className="flex flex-1 flex-col items-center gap-1">
                <span
                  className={cn("w-full rounded-md", i === 5 ? "bg-m-primary" : "bg-m-container")}
                  style={{ height: `${h}%` }}
                />
                <span className="text-[9px] text-m-muted">{d}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-m-surface p-3 ring-1 ring-m-border">
            <Wallet className="h-4 w-4 text-m-ink" aria-hidden="true" />
            <p className="mt-1.5 text-base font-bold">68.4 kg</p>
            <p className="text-[10px] text-m-muted">Weight · -1.2 kg</p>
          </div>
          <div className="rounded-xl bg-m-surface p-3 ring-1 ring-m-border">
            <Flame className="h-4 w-4 text-m-warning" aria-hidden="true" />
            <p className="mt-1.5 text-base font-bold">12 days</p>
            <p className="text-[10px] text-m-muted">Current streak</p>
          </div>
        </div>

        <div className="flex gap-3">
          {[Trophy, Star, Flame].map((Icon, i) => (
            <span
              key={i}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-2xl",
                i === 0 ? "bg-m-primary text-m-on-primary" : "bg-m-container text-m-on-container"
              )}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
          ))}
          <span className="self-center text-[11px] text-m-muted">3 new badges</span>
        </div>
      </div>
      <TabBar active={2} icons={[Home, Dumbbell, Trophy, User]} />
    </>
  );
}
