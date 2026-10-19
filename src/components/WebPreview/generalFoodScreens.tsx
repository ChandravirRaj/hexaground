import {
  BarChart3,
  Bike,
  Clock,
  CreditCard,
  FileText,
  Home,
  Layers,
  MapPin,
  Minus,
  Pizza,
  Plus,
  Salad,
  Settings,
  Star,
  TrendingUp,
  Users,
  Utensils,
  Wallet,
  Coffee,
  Zap,
  ShieldCheck,
} from "lucide-react";

import {
  BarChart,
  Btn,
  CheckItem,
  Sidebar,
  StatCard,
  TopBar,
  WebNav,
} from "@/components/WebPreview/parts";
import { cn } from "@/lib/cn";

/* --------------------------------- General -------------------------------- */

export function GeneralLanding() {
  const features = [
    { icon: Zap, title: "Lightning fast", text: "Ship in minutes with ready-made building blocks." },
    { icon: ShieldCheck, title: "Secure by default", text: "Enterprise-grade protection for every project." },
    { icon: Layers, title: "Fully themeable", text: "Your brand color flows through every component." },
  ];

  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Hexa" links={["Product", "Solutions", "Pricing", "Docs"]} cta="Get started" />
      <div className="grid flex-1 grid-cols-2 items-center gap-12 px-14">
        <div>
          <span className="rounded-full bg-m-container px-4 py-1.5 text-xs font-semibold text-m-on-container">
            New · Version 2.0 is here
          </span>
          <h1 className="mt-6 text-6xl font-extrabold leading-[1.05] tracking-tight">
            Build faster with <span className="text-m-ink">your brand</span>
          </h1>
          <p className="mt-5 max-w-lg text-lg text-m-muted">
            One platform to design, launch and grow your product, styled in your own colors.
          </p>
          <div className="mt-8 flex gap-3">
            <Btn className="px-8 py-4 text-base">Start free trial</Btn>
            <Btn variant="outline" className="px-8 py-4 text-base">Watch demo</Btn>
          </div>
          <div className="mt-10 flex gap-10">
            {[["12k+", "Teams"], ["99.9%", "Uptime"], ["4.9★", "Rating"]].map(([v, l]) => (
              <div key={l}>
                <p className="text-2xl font-bold">{v}</p>
                <p className="text-xs text-m-muted">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative h-[380px]">
          <div className="absolute right-0 top-0 h-72 w-[420px] rounded-3xl bg-m-container" />
          <div className="absolute left-4 top-10 w-72 rounded-2xl bg-m-surface p-5 shadow-xl ring-1 ring-m-border">
            <p className="text-xs text-m-muted">Revenue</p>
            <p className="text-3xl font-bold">$48,290</p>
            <div className="mt-4"><BarChart values={[40, 65, 50, 85, 60, 95]} highlight={5} /></div>
          </div>
          <div className="absolute bottom-6 right-6 flex w-64 items-center gap-3 rounded-2xl bg-m-primary p-4 text-m-on-primary shadow-xl">
            <TrendingUp className="h-8 w-8" aria-hidden="true" />
            <div>
              <p className="text-xs opacity-80">Growth</p>
              <p className="text-xl font-bold">+24.5%</p>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 px-14 pb-10">
        {features.map(({ icon: Icon, title, text }) => (
          <div key={title} className="flex gap-4 rounded-2xl bg-m-surface p-5 ring-1 ring-m-border">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-m-primary text-m-on-primary">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <p className="font-bold">{title}</p>
              <p className="mt-1 text-xs text-m-muted">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function GeneralDashboard() {
  const rows = [
    ["Website redesign", "Design", "Active", "bg-m-success"],
    ["Mobile app v2", "Engineering", "In review", "bg-m-warning"],
    ["Brand guidelines", "Marketing", "Active", "bg-m-success"],
    ["Q4 planning", "Operations", "Blocked", "bg-m-danger"],
  ];

  return (
    <div className="flex h-full">
      <Sidebar
        brand="Hexa"
        items={[
          { label: "Overview", icon: Home },
          { label: "Analytics", icon: BarChart3 },
          { label: "Projects", icon: FileText },
          { label: "Team", icon: Users },
          { label: "Settings", icon: Settings },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-8">
        <TopBar title="Overview" sub="Welcome back, Alex" />
        <div className="grid grid-cols-4 gap-4">
          <StatCard icon={Wallet} label="Revenue" value="$48.2k" delta="+12%" />
          <StatCard icon={Users} label="Customers" value="2,840" delta="+8%" />
          <StatCard icon={TrendingUp} label="Growth" value="24.5%" delta="+3%" />
          <StatCard icon={FileText} label="Projects" value="38" />
        </div>
        <div className="grid flex-1 grid-cols-[1.4fr_1fr] gap-4">
          <div className="rounded-2xl bg-m-surface p-6 ring-1 ring-m-border">
            <p className="font-bold">Weekly activity</p>
            <div className="mt-6"><BarChart values={[45, 70, 55, 90, 65, 100, 50]} highlight={5} /></div>
          </div>
          <div className="rounded-2xl bg-m-surface p-6 ring-1 ring-m-border">
            <p className="mb-3 font-bold">Projects</p>
            <ul className="flex flex-col gap-3">
              {rows.map(([name, team, status, tone]) => (
                <li key={name} className="flex items-center gap-3">
                  <span className={cn("h-2.5 w-2.5 rounded-full", tone)} />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{name}</p>
                    <p className="text-xs text-m-muted">{team}</p>
                  </div>
                  <span className="text-xs text-m-muted">{status}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export function GeneralPricing() {
  const plans = [
    { name: "Starter", price: "$0", items: ["1 project", "Basic analytics", "Community support"] },
    { name: "Pro", price: "$29", items: ["Unlimited projects", "Advanced analytics", "Priority support", "Custom domains"], featured: true },
    { name: "Team", price: "$79", items: ["Everything in Pro", "Roles & permissions", "SSO", "Audit log"] },
  ];

  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Hexa" links={["Product", "Solutions", "Pricing", "Docs"]} cta="Get started" active={2} />
      <div className="flex flex-1 flex-col items-center px-14 pt-10">
        <h1 className="text-5xl font-extrabold tracking-tight">Simple, honest pricing</h1>
        <p className="mt-3 text-m-muted">Start free. Upgrade when you&apos;re ready.</p>
        <div className="mt-6 flex rounded-full bg-m-surface p-1 ring-1 ring-m-border">
          <span className="rounded-full bg-m-primary px-5 py-1.5 text-xs font-semibold text-m-on-primary">Monthly</span>
          <span className="px-5 py-1.5 text-xs font-semibold text-m-muted">Yearly −20%</span>
        </div>
        <div className="mt-8 grid w-full grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-3xl p-7",
                plan.featured ? "bg-m-primary text-m-on-primary shadow-xl" : "bg-m-surface ring-1 ring-m-border"
              )}
            >
              <p className="text-sm font-semibold opacity-80">{plan.name}</p>
              <p className="mt-2 text-5xl font-extrabold">
                {plan.price}<span className="text-base font-medium opacity-70">/mo</span>
              </p>
              <ul className={cn("mt-6 flex flex-col gap-3", plan.featured && "[&_span]:bg-m-on-primary [&_span]:text-m-primary")}>
                {plan.items.map((i) => <CheckItem key={i}>{i}</CheckItem>)}
              </ul>
              <Btn variant={plan.featured ? "outline" : "primary"} className={cn("mt-7 w-full", plan.featured && "text-m-text")}>
                Choose {plan.name}
              </Btn>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Food ---------------------------------- */

const FOOD_LINKS = ["Restaurants", "Offers", "Orders", "Help"];

export function FoodWebHome() {
  const cats = [[Pizza, "Pizza"], [Salad, "Healthy"], [Coffee, "Coffee"], [Utensils, "Mains"], [Bike, "Fast"]] as const;
  const places = [
    ["Napoli Slice", "Italian · 20 min", "4.8"],
    ["Green Bowl", "Healthy · 15 min", "4.6"],
    ["Brew & Co", "Cafe · 10 min", "4.7"],
    ["Spice Route", "Indian · 30 min", "4.5"],
  ];

  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Foodie" links={FOOD_LINKS} cta="Order now" />
      <div className="relative mx-14 mt-8 grid grid-cols-[1.2fr_1fr] items-center overflow-hidden rounded-3xl bg-m-primary p-12 text-m-on-primary">
        <span className="absolute -right-10 -top-10 h-72 w-72 rounded-full bg-m-accent opacity-60" />
        <div className="relative">
          <h1 className="text-5xl font-extrabold leading-tight">Hungry? Get it<br />delivered in 20 min</h1>
          <div className="mt-6 flex max-w-md items-center gap-2 rounded-2xl bg-m-surface p-2 text-m-text">
            <MapPin className="ml-3 h-5 w-5 text-m-ink" aria-hidden="true" />
            <span className="flex-1 text-sm text-m-muted">Enter your delivery address</span>
            <Btn className="py-3">Find food</Btn>
          </div>
        </div>
        <div className="relative flex justify-end">
          <span className="flex h-44 w-44 items-center justify-center rounded-full bg-m-container text-m-on-container">
            <Pizza className="h-24 w-24" aria-hidden="true" />
          </span>
        </div>
      </div>
      <div className="flex gap-4 px-14 py-6">
        {cats.map(([Icon, label], i) => (
          <span key={label} className={cn("flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium", i === 0 ? "bg-m-primary text-m-on-primary" : "bg-m-surface ring-1 ring-m-border")}>
            <Icon className="h-4 w-4" aria-hidden="true" /> {label}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-4 gap-5 px-14">
        {places.map(([name, meta, rating], i) => (
          <div key={name} className="overflow-hidden rounded-2xl bg-m-surface ring-1 ring-m-border">
            <div className={cn("flex h-32 items-center justify-center", i % 2 ? "bg-m-accent text-m-on-accent" : "bg-m-container text-m-on-container")}>
              <Utensils className="h-10 w-10" aria-hidden="true" />
            </div>
            <div className="p-4">
              <p className="font-bold">{name}</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-m-muted">
                <Star className="h-3 w-3 fill-m-warning text-m-warning" aria-hidden="true" /> {rating} · {meta}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function FoodWebMenu() {
  const dishes = [
    ["Margherita Pizza", "$14", Pizza],
    ["Caesar Salad", "$11", Salad],
    ["Iced Latte", "$5", Coffee],
    ["Pasta Alfredo", "$16", Utensils],
    ["Garlic Bread", "$6", Pizza],
    ["Greek Bowl", "$12", Salad],
  ] as const;

  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Foodie" links={FOOD_LINKS} cta="Order now" search />
      <div className="grid flex-1 grid-cols-[1fr_340px] gap-8 px-14 py-6">
        <div>
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-m-container text-m-on-container">
              <Pizza className="h-8 w-8" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-3xl font-bold">Napoli Slice</h2>
              <p className="flex items-center gap-3 text-sm text-m-muted">
                <span className="flex items-center gap-1"><Star className="h-4 w-4 fill-m-warning text-m-warning" aria-hidden="true" /> 4.8</span>
                <span className="flex items-center gap-1"><Clock className="h-4 w-4" aria-hidden="true" /> 20 min</span>
              </p>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            {["Popular", "Pizza", "Salads", "Drinks"].map((c, i) => (
              <span key={c} className={cn("rounded-full px-4 py-1.5 text-xs font-medium", i === 0 ? "bg-m-primary text-m-on-primary" : "bg-m-surface ring-1 ring-m-border")}>{c}</span>
            ))}
          </div>
          <div className="mt-5 grid grid-cols-3 gap-4">
            {dishes.map(([name, price, Icon], i) => (
              <div key={name} className="rounded-2xl bg-m-surface p-4 ring-1 ring-m-border">
                <div className={cn("flex h-24 items-center justify-center rounded-xl", i % 2 ? "bg-m-accent text-m-on-accent" : "bg-m-container text-m-on-container")}>
                  <Icon className="h-9 w-9" aria-hidden="true" />
                </div>
                <p className="mt-3 text-sm font-bold">{name}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-m-ink">{price}</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-m-primary text-m-on-primary">
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className="flex flex-col rounded-3xl bg-m-surface p-6 ring-1 ring-m-border">
          <p className="text-lg font-bold">Your order</p>
          <ul className="mt-4 flex flex-col gap-4">
            {[["Margherita Pizza", "$28", 2], ["Iced Latte", "$5", 1]].map(([n, p, q]) => (
              <li key={String(n)} className="flex items-center gap-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold">{n}</p>
                  <p className="text-xs text-m-muted">{p}</p>
                </div>
                <span className="flex items-center gap-2 rounded-lg bg-m-bg px-2 py-1 ring-1 ring-m-border">
                  <Minus className="h-3.5 w-3.5 text-m-muted" aria-hidden="true" />
                  <span className="w-3 text-center text-xs font-semibold">{q}</span>
                  <Plus className="h-3.5 w-3.5 text-m-ink" aria-hidden="true" />
                </span>
              </li>
            ))}
          </ul>
          <dl className="mt-auto flex flex-col gap-2 border-t border-m-border pt-4 text-sm">
            <div className="flex justify-between"><dt className="text-m-muted">Subtotal</dt><dd>$33</dd></div>
            <div className="flex justify-between"><dt className="text-m-muted">Delivery</dt><dd>$2</dd></div>
            <div className="flex justify-between text-base font-bold"><dt>Total</dt><dd className="text-m-ink">$35</dd></div>
          </dl>
          <Btn className="mt-4 w-full py-3.5">Checkout</Btn>
        </aside>
      </div>
    </div>
  );
}

export function FoodWebCheckout() {
  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Foodie" links={FOOD_LINKS} cta="Order now" />
      <div className="grid flex-1 grid-cols-[1.3fr_1fr] gap-8 px-14 py-8">
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold">Checkout</h2>
          <div className="rounded-2xl bg-m-surface p-6 ring-1 ring-m-border">
            <p className="flex items-center gap-2 font-bold"><MapPin className="h-5 w-5 text-m-ink" aria-hidden="true" /> Delivery address</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {["Street address", "Apartment", "City", "Postal code"].map((f, i) => (
                <div key={f} className={cn("rounded-xl bg-m-bg px-4 py-3 text-sm ring-1", i === 0 ? "ring-2 ring-m-primary" : "text-m-muted ring-m-border")}>{f}</div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-m-surface p-6 ring-1 ring-m-border">
            <p className="flex items-center gap-2 font-bold"><CreditCard className="h-5 w-5 text-m-ink" aria-hidden="true" /> Payment</p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {["Card", "Apple Pay", "Cash"].map((m, i) => (
                <span key={m} className={cn("rounded-xl py-3 text-center text-sm font-medium", i === 0 ? "bg-m-container text-m-on-container ring-2 ring-m-primary" : "bg-m-bg ring-1 ring-m-border")}>{m}</span>
              ))}
            </div>
          </div>
        </div>
        <aside className="flex flex-col gap-4 rounded-3xl bg-m-container p-7 text-m-on-container">
          <p className="text-lg font-bold">Order summary</p>
          {[["2 × Margherita Pizza", "$28"], ["1 × Iced Latte", "$5"], ["Delivery", "$2"], ["Tip", "$3"]].map(([k, v]) => (
            <div key={k} className="flex justify-between text-sm"><span>{k}</span><span className="font-semibold">{v}</span></div>
          ))}
          <div className="mt-2 flex justify-between border-t border-m-primary pt-4 text-xl font-bold"><span>Total</span><span>$38</span></div>
          <Btn className="mt-auto w-full py-4 text-base">Place order</Btn>
        </aside>
      </div>
    </div>
  );
}
