import {
  BarChart3,
  Calendar,
  Clock,
  Dumbbell,
  Flame,
  Footprints,
  Heart,
  Home,
  Minus,
  Plus,
  Scissors,
  Settings,
  ShoppingBag,
  Sparkles,
  Star,
  Timer,
  Trophy,
  Users,
} from "lucide-react";

import {
  BarChart,
  Btn,
  Sidebar,
  StatCard,
  TopBar,
  WebNav,
} from "@/components/WebPreview/parts";
import { cn } from "@/lib/cn";

const tone = (i: number) =>
  i % 2 ? "bg-m-accent text-m-on-accent" : "bg-m-container text-m-on-container";

/* -------------------------------- E-commerce ------------------------------- */

const SHOP_LINKS = ["New", "Men", "Women", "Sale"];

export function ShopWebHome() {
  const products = [
    ["Canvas Sneakers", "$64"],
    ["Wool Jacket", "$129"],
    ["Everyday Backpack", "$89"],
    ["Sun Hat", "$24"],
  ];

  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Shoply" links={SHOP_LINKS} cta="Cart (2)" search />
      <div className="relative mx-14 mt-7 flex items-center justify-between overflow-hidden rounded-3xl bg-m-primary p-12 text-m-on-primary">
        <span className="absolute -bottom-16 right-24 h-72 w-72 rounded-full bg-m-accent opacity-60" />
        <div className="relative">
          <p className="text-sm font-semibold opacity-80">Summer sale</p>
          <h1 className="mt-2 text-6xl font-extrabold leading-tight">Up to 40% off</h1>
          <p className="mt-3 max-w-sm opacity-80">Fresh styles for the season. Free shipping over $50.</p>
          <Btn variant="outline" className="mt-6 text-m-text">Shop now</Btn>
        </div>
        <ShoppingBag className="relative mr-16 h-40 w-40 opacity-90" aria-hidden="true" />
      </div>
      <div className="flex gap-3 px-14 py-5">
        {["All", "Shoes", "Clothes", "Bags", "Hats"].map((c, i) => (
          <span key={c} className={cn("rounded-full px-5 py-2 text-sm font-medium", i === 0 ? "bg-m-primary text-m-on-primary" : "bg-m-surface ring-1 ring-m-border")}>{c}</span>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-5 px-14">
        {products.map(([name, price], i) => (
          <div key={name} className="overflow-hidden rounded-2xl bg-m-surface ring-1 ring-m-border">
            <div className={cn("relative flex h-40 items-center justify-center", tone(i))}>
              <ShoppingBag className="h-12 w-12" aria-hidden="true" />
              <Heart className="absolute right-3 top-3 h-5 w-5" aria-hidden="true" />
            </div>
            <div className="p-4">
              <p className="font-bold">{name}</p>
              <p className="mt-1 font-bold text-m-ink">{price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ShopWebProduct() {
  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Shoply" links={SHOP_LINKS} cta="Cart (2)" search />
      <p className="px-14 pt-5 text-xs text-m-muted">Home / Bags / <span className="text-m-text">Everyday Backpack</span></p>
      <div className="grid flex-1 grid-cols-2 gap-14 px-14 py-5">
        <div>
          <div className="relative flex h-[400px] items-center justify-center overflow-hidden rounded-3xl bg-m-container">
            <span className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-m-accent opacity-60" />
            <ShoppingBag className="relative h-40 w-40 text-m-on-container" aria-hidden="true" />
          </div>
          <div className="mt-4 flex gap-3">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className={cn("flex h-20 w-20 items-center justify-center rounded-xl", tone(i), i === 0 && "ring-2 ring-m-primary")}>
                <ShoppingBag className="h-7 w-7" aria-hidden="true" />
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-4xl font-extrabold tracking-tight">Everyday Backpack</h1>
          <p className="mt-2 flex items-center gap-2 text-sm text-m-muted">
            <Star className="h-4 w-4 fill-m-warning text-m-warning" aria-hidden="true" /> 4.8 · 212 reviews
          </p>
          <p className="mt-4 text-4xl font-bold text-m-ink">$89</p>
          <p className="mt-4 text-sm leading-relaxed text-m-muted">
            Water-resistant fabric with a padded laptop sleeve and plenty of pockets for everyday carry.
          </p>
          <p className="mt-6 text-xs font-semibold">Color</p>
          <div className="mt-2 flex gap-3">
            {["bg-m-primary", "bg-m-accent", "bg-m-text", "bg-m-muted"].map((c, i) => (
              <span key={c} className={cn("h-9 w-9 rounded-full", c, i === 0 && "ring-2 ring-m-primary ring-offset-2 ring-offset-m-bg")} />
            ))}
          </div>
          <p className="mt-5 text-xs font-semibold">Size</p>
          <div className="mt-2 flex gap-2">
            {["S", "M", "L", "XL"].map((s, i) => (
              <span key={s} className={cn("flex h-11 w-14 items-center justify-center rounded-xl text-sm font-medium", i === 1 ? "bg-m-primary text-m-on-primary" : "bg-m-surface ring-1 ring-m-border")}>{s}</span>
            ))}
          </div>
          <div className="mt-auto flex gap-3">
            <Btn className="flex-1 py-4 text-base">Add to cart</Btn>
            <Btn variant="soft" className="px-5"><Heart className="h-5 w-5" aria-hidden="true" /></Btn>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ShopWebCart() {
  const items = [
    ["Canvas Sneakers", "Size 42 · White", "$64", 1],
    ["Everyday Backpack", "Navy", "$89", 2],
    ["Sun Hat", "One size", "$24", 1],
  ] as const;

  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Shoply" links={SHOP_LINKS} cta="Cart (4)" search />
      <div className="grid flex-1 grid-cols-[1.6fr_1fr] gap-8 px-14 py-7">
        <div>
          <h2 className="text-3xl font-bold">Shopping cart</h2>
          <ul className="mt-5 flex flex-col gap-3">
            {items.map(([name, meta, price, qty], i) => (
              <li key={name} className="flex items-center gap-5 rounded-2xl bg-m-surface p-4 ring-1 ring-m-border">
                <span className={cn("flex h-20 w-20 shrink-0 items-center justify-center rounded-xl", tone(i))}>
                  <ShoppingBag className="h-8 w-8" aria-hidden="true" />
                </span>
                <div className="flex-1">
                  <p className="font-bold">{name}</p>
                  <p className="text-xs text-m-muted">{meta}</p>
                </div>
                <span className="flex items-center gap-3 rounded-lg bg-m-bg px-3 py-1.5 ring-1 ring-m-border">
                  <Minus className="h-4 w-4 text-m-muted" aria-hidden="true" />
                  <span className="w-3 text-center text-sm font-semibold">{qty}</span>
                  <Plus className="h-4 w-4 text-m-ink" aria-hidden="true" />
                </span>
                <span className="w-16 text-right font-bold text-m-ink">{price}</span>
              </li>
            ))}
          </ul>
        </div>
        <aside className="flex flex-col gap-3 self-start rounded-3xl bg-m-surface p-7 ring-1 ring-m-border">
          <p className="text-lg font-bold">Order summary</p>
          <div className="flex items-center gap-2 rounded-xl border border-dashed border-m-primary bg-m-container px-4 py-3 text-sm text-m-on-container">
            <Sparkles className="h-4 w-4" aria-hidden="true" /> SUMMER40 <span className="ml-auto font-semibold">Applied</span>
          </div>
          {[["Subtotal", "$266"], ["Shipping", "Free"], ["Discount", "-$27"]].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm"><span className="text-m-muted">{k}</span><span>{v}</span></div>
          ))}
          <div className="flex justify-between border-t border-m-border pt-3 text-xl font-bold"><span>Total</span><span className="text-m-ink">$239</span></div>
          <Btn className="mt-2 w-full py-4 text-base">Checkout</Btn>
        </aside>
      </div>
    </div>
  );
}

/* ----------------------------------- Salon --------------------------------- */

const SALON_LINKS = ["Services", "Stylists", "Gallery", "Contact"];

export function SalonWebHome() {
  const services = [
    [Scissors, "Haircut & style", "from $40"],
    [Sparkles, "Gel manicure", "from $35"],
    [Heart, "Facial glow", "from $55"],
  ] as const;

  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Glow Studio" links={SALON_LINKS} cta="Book now" />
      <div className="grid grid-cols-2 items-center gap-12 px-14 pt-10">
        <div>
          <span className="rounded-full bg-m-container px-4 py-1.5 text-xs font-semibold text-m-on-container">Open today · 9am – 7pm</span>
          <h1 className="mt-5 text-6xl font-extrabold leading-[1.05] tracking-tight">Look and feel <span className="text-m-ink">your best</span></h1>
          <p className="mt-4 max-w-md text-lg text-m-muted">Hair, nails and skin care by stylists who listen. Book in under a minute.</p>
          <div className="mt-7 flex gap-3">
            <Btn className="px-8 py-4 text-base">Book appointment</Btn>
            <Btn variant="outline" className="px-8 py-4 text-base">View services</Btn>
          </div>
        </div>
        <div className="relative h-72">
          <span className="absolute right-0 top-0 h-64 w-72 rounded-3xl bg-m-container" />
          <span className="absolute left-6 top-8 flex h-52 w-44 items-center justify-center rounded-3xl bg-m-accent text-m-on-accent shadow-xl">
            <Scissors className="h-16 w-16" aria-hidden="true" />
          </span>
          <div className="absolute bottom-2 right-4 flex items-center gap-3 rounded-2xl bg-m-surface p-4 shadow-xl ring-1 ring-m-border">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-m-primary font-bold text-m-on-primary">M</span>
            <div>
              <p className="text-sm font-bold">Mia · Senior stylist</p>
              <p className="flex items-center gap-1 text-xs text-m-muted"><Star className="h-3 w-3 fill-m-warning text-m-warning" aria-hidden="true" /> 4.9 · 320 reviews</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 px-14 pt-9">
        {services.map(([Icon, name, price], i) => (
          <div key={name} className="flex items-center gap-4 rounded-2xl bg-m-surface p-5 ring-1 ring-m-border">
            <span className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", tone(i))}>
              <Icon className="h-6 w-6" aria-hidden="true" />
            </span>
            <div className="flex-1">
              <p className="font-bold">{name}</p>
              <p className="text-xs text-m-muted">{price}</p>
            </div>
            <span className="text-sm font-semibold text-m-ink">Book</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SalonWebBooking() {
  const days = Array.from({ length: 35 }, (_, i) => i - 3);
  const slots = ["09:00", "10:30", "12:00", "14:00", "15:30", "17:00"];

  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Glow Studio" links={SALON_LINKS} cta="Book now" />
      <div className="px-14 pt-6">
        <div className="flex items-center gap-3 text-sm">
          {["Service", "Date & time", "Confirm"].map((step, i) => (
            <span key={step} className="flex items-center gap-2">
              <span className={cn("flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold", i <= 1 ? "bg-m-primary text-m-on-primary" : "bg-m-surface ring-1 ring-m-border")}>{i + 1}</span>
              <span className={i === 1 ? "font-semibold" : "text-m-muted"}>{step}</span>
              {i < 2 && <span className="mx-2 h-px w-12 bg-m-border" />}
            </span>
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-[1.3fr_1fr_1fr] gap-6 px-14 py-6">
        <div className="rounded-3xl bg-m-surface p-6 ring-1 ring-m-border">
          <p className="font-bold">October 2026</p>
          <div className="mt-4 grid grid-cols-7 gap-1.5 text-center text-xs">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i} className="py-1 text-m-muted">{d}</span>)}
            {days.map((d) => (
              <span
                key={d}
                className={cn(
                  "rounded-lg py-2",
                  d < 1 || d > 31 ? "text-m-border" : d === 14 ? "bg-m-primary font-bold text-m-on-primary" : "hover:bg-m-bg"
                )}
              >
                {d < 1 ? d + 30 : d > 31 ? d - 31 : d}
              </span>
            ))}
          </div>
        </div>
        <div className="rounded-3xl bg-m-surface p-6 ring-1 ring-m-border">
          <p className="font-bold">Available times</p>
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {slots.map((t, i) => (
              <span key={t} className={cn("rounded-xl py-3 text-center text-sm font-medium", i === 3 ? "bg-m-primary text-m-on-primary" : i === 1 ? "bg-m-container text-m-muted line-through" : "bg-m-bg ring-1 ring-m-border")}>{t}</span>
            ))}
          </div>
        </div>
        <aside className="flex flex-col gap-3 rounded-3xl bg-m-container p-6 text-m-on-container">
          <p className="font-bold">Your booking</p>
          <p className="flex items-center gap-2 text-sm"><Scissors className="h-4 w-4" aria-hidden="true" /> Haircut & style</p>
          <p className="flex items-center gap-2 text-sm"><Calendar className="h-4 w-4" aria-hidden="true" /> Wed, Oct 14</p>
          <p className="flex items-center gap-2 text-sm"><Clock className="h-4 w-4" aria-hidden="true" /> 14:00 · 45 min</p>
          <p className="flex items-center gap-2 text-sm"><Users className="h-4 w-4" aria-hidden="true" /> Mia</p>
          <div className="mt-2 flex justify-between border-t border-m-primary pt-3 text-lg font-bold"><span>Total</span><span>$40</span></div>
          <Btn className="mt-auto w-full py-3.5">Confirm booking</Btn>
        </aside>
      </div>
    </div>
  );
}

export function SalonWebAdmin() {
  const appts = [
    ["09:00", "Sofia Reyes", "Haircut & style", "Mia", "Confirmed"],
    ["10:30", "Dana Lee", "Gel manicure", "Zoe", "Confirmed"],
    ["12:00", "Priya Shah", "Facial glow", "Ava", "Pending"],
    ["14:00", "Chris Park", "Beard trim", "Liam", "Confirmed"],
    ["15:30", "Nora Kim", "Hair color", "Mia", "Cancelled"],
  ];
  const status = (s: string) => s === "Confirmed" ? "bg-m-success" : s === "Pending" ? "bg-m-warning" : "bg-m-danger";

  return (
    <div className="flex h-full">
      <Sidebar
        brand="Glow Studio"
        items={[
          { label: "Schedule", icon: Calendar },
          { label: "Clients", icon: Users },
          { label: "Services", icon: Scissors },
          { label: "Reports", icon: BarChart3 },
          { label: "Settings", icon: Settings },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-8">
        <TopBar title="Today's schedule" sub="Wednesday, Oct 14" />
        <div className="grid grid-cols-3 gap-4">
          <StatCard icon={Calendar} label="Appointments" value="12" delta="+2" />
          <StatCard icon={Users} label="New clients" value="4" />
          <StatCard icon={Sparkles} label="Revenue" value="$680" delta="+9%" />
        </div>
        <div className="flex-1 rounded-2xl bg-m-surface p-6 ring-1 ring-m-border">
          <ul className="flex flex-col divide-y divide-m-border">
            {appts.map(([time, client, service, stylist, st]) => (
              <li key={time} className="flex items-center gap-5 py-3.5 text-sm">
                <span className="w-14 font-bold text-m-ink">{time}</span>
                <span className="flex-1 font-semibold">{client}</span>
                <span className="w-40 text-m-muted">{service}</span>
                <span className="w-16 text-m-muted">{stylist}</span>
                <span className="flex w-28 items-center gap-2 text-xs"><span className={cn("h-2 w-2 rounded-full", status(st))} /> {st}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Fitness -------------------------------- */

const FIT_LINKS = ["Workouts", "Plans", "Community", "Pricing"];

export function FitnessWebHome() {
  const plans = [
    ["Strength Builder", "4 weeks · 5 days", Dumbbell],
    ["Fat Burn HIIT", "3 weeks · 4 days", Flame],
    ["Run 5K", "6 weeks · 3 days", Footprints],
  ] as const;

  return (
    <div className="flex h-full flex-col">
      <WebNav brand="FitPulse" links={FIT_LINKS} cta="Join free" />
      <div className="relative mx-14 mt-8 overflow-hidden rounded-3xl bg-m-primary p-14 text-m-on-primary">
        <span className="absolute -right-16 -top-16 h-96 w-96 rounded-full bg-m-accent opacity-60" />
        <Dumbbell className="absolute bottom-8 right-24 h-40 w-40 opacity-80" aria-hidden="true" />
        <h1 className="relative max-w-xl text-6xl font-extrabold leading-[1.05]">Train smarter. Move more.</h1>
        <p className="relative mt-4 max-w-md opacity-85">Personal plans, live progress tracking and streaks that keep you going.</p>
        <div className="relative mt-7 flex gap-3">
          <Btn variant="outline" className="px-8 py-4 text-base text-m-text">Start training</Btn>
          <Btn variant="soft" className="px-8 py-4 text-base">See plans</Btn>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 px-14 py-6">
        {[["2M+", "Members"], ["800+", "Workouts"], ["4.9★", "App rating"], ["120", "Coaches"]].map(([v, l]) => (
          <div key={l} className="rounded-2xl bg-m-surface p-4 text-center ring-1 ring-m-border">
            <p className="text-2xl font-bold text-m-ink">{v}</p>
            <p className="text-xs text-m-muted">{l}</p>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-5 px-14">
        {plans.map(([name, meta, Icon], i) => (
          <div key={name} className="flex items-center gap-4 rounded-2xl bg-m-surface p-5 ring-1 ring-m-border">
            <span className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", tone(i))}><Icon className="h-6 w-6" aria-hidden="true" /></span>
            <div><p className="font-bold">{name}</p><p className="text-xs text-m-muted">{meta}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FitnessWebDashboard() {
  const size = 200;
  const r1 = (size - 20) / 2;
  const r2 = (size - 64) / 2;
  const c1 = 2 * Math.PI * r1;
  const c2 = 2 * Math.PI * r2;

  return (
    <div className="flex h-full">
      <Sidebar
        brand="FitPulse"
        items={[
          { label: "Today", icon: Home },
          { label: "Workouts", icon: Dumbbell },
          { label: "Progress", icon: BarChart3 },
          { label: "Achievements", icon: Trophy },
          { label: "Settings", icon: Settings },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-8">
        <TopBar title="Let's move, Sam" sub="12 day streak 🔥" />
        <div className="grid flex-1 grid-cols-[1fr_1.4fr] gap-5">
          <div className="flex flex-col items-center justify-center rounded-2xl bg-m-surface p-6 ring-1 ring-m-border">
            <div className="relative">
              <svg width={size} height={size} role="img" aria-label="Activity rings">
                <circle cx={size / 2} cy={size / 2} r={r1} fill="none" strokeWidth={20} style={{ stroke: "var(--m-border)" }} />
                <circle cx={size / 2} cy={size / 2} r={r1} fill="none" strokeWidth={20} strokeLinecap="round" strokeDasharray={`${c1 * 0.74} ${c1}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ stroke: "var(--m-primary)" }} />
                <circle cx={size / 2} cy={size / 2} r={r2} fill="none" strokeWidth={16} style={{ stroke: "var(--m-border)" }} />
                <circle cx={size / 2} cy={size / 2} r={r2} fill="none" strokeWidth={16} strokeLinecap="round" strokeDasharray={`${c2 * 0.52} ${c2}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} style={{ stroke: "var(--m-accent)" }} />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">74%</span>
                <span className="text-xs text-m-muted">of daily goal</span>
              </div>
            </div>
            <div className="mt-5 grid w-full grid-cols-3 gap-3 text-center">
              {[[Footprints, "7,420"], [Flame, "412"], [Timer, "48m"]].map(([Icon, v], i) => {
                const I = Icon as typeof Flame;
                return (
                  <div key={i} className="rounded-xl bg-m-bg p-3 ring-1 ring-m-border">
                    <I className="mx-auto h-4 w-4 text-m-ink" aria-hidden="true" />
                    <p className="mt-1 text-sm font-bold">{v as string}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl bg-m-surface p-6 ring-1 ring-m-border">
              <p className="font-bold">Active minutes <span className="ml-2 text-xs font-semibold text-m-success">+12%</span></p>
              <div className="mt-5"><BarChart values={[55, 80, 40, 90, 65, 100, 30]} highlight={5} /></div>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-m-container p-5 text-m-on-container">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-m-primary text-m-on-primary"><Dumbbell className="h-6 w-6" aria-hidden="true" /></span>
              <div className="flex-1"><p className="text-xs opacity-80">Today&apos;s plan</p><p className="font-bold">Full body HIIT · 30 min</p></div>
              <Btn className="py-2.5">Start</Btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FitnessWebWorkouts() {
  const workouts = [
    ["Full body HIIT", "30 min · 320 kcal", Flame],
    ["Upper body strength", "40 min · 280 kcal", Dumbbell],
    ["Morning yoga flow", "20 min · 120 kcal", Heart],
    ["5K interval run", "35 min · 410 kcal", Footprints],
    ["Core crusher", "15 min · 150 kcal", Timer],
    ["Leg day", "45 min · 360 kcal", Dumbbell],
  ] as const;

  return (
    <div className="flex h-full flex-col">
      <WebNav brand="FitPulse" links={FIT_LINKS} cta="Join free" search />
      <div className="px-14 pt-7">
        <h2 className="text-4xl font-extrabold tracking-tight">Workout library</h2>
        <div className="mt-4 flex gap-2">
          {["All", "Strength", "Cardio", "Yoga", "HIIT"].map((c, i) => (
            <span key={c} className={cn("rounded-full px-5 py-2 text-sm font-medium", i === 0 ? "bg-m-primary text-m-on-primary" : "bg-m-surface ring-1 ring-m-border")}>{c}</span>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 px-14 pt-5">
        {workouts.map(([name, meta, Icon], i) => (
          <div key={name} className="overflow-hidden rounded-2xl bg-m-surface ring-1 ring-m-border">
            <div className={cn("flex h-28 items-center justify-center", tone(i))}><Icon className="h-10 w-10" aria-hidden="true" /></div>
            <div className="flex items-center justify-between p-4">
              <div><p className="font-bold">{name}</p><p className="text-xs text-m-muted">{meta}</p></div>
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-m-primary text-m-on-primary"><Plus className="h-4 w-4" aria-hidden="true" /></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
