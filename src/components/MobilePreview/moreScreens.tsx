import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Award,
  Bell,
  BookOpen,
  Calendar,
  Clock,
  CreditCard,
  Heart,
  HeartPulse,
  Home,
  Hotel,
  Map,
  MapPin,
  PiggyBank,
  Pill,
  Plane,
  Play,
  Send,
  Star,
  Stethoscope,
  Ticket,
  TrendingUp,
  User,
  Video,
  Wallet,
} from "lucide-react";

import { Chip, PrimaryButton, SearchField } from "@/components/MobilePreview/categoryScreens";
import { TabBar } from "@/components/MobilePreview/screens";
import { cn } from "@/lib/cn";

const tone = (i: number) =>
  [
    "bg-m-primary text-m-on-primary",
    "bg-m-container text-m-on-container",
    "bg-m-accent text-m-on-accent",
  ][i % 3];

/* ---------------------------------- Travel --------------------------------- */

export function TravelHomeScreen() {
  const places = [
    ["Santorini", "Greece", "$420"],
    ["Kyoto", "Japan", "$690"],
    ["Lisbon", "Portugal", "$310"],
  ] as const;

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <div>
          <p className="text-[10px] text-m-muted">Hi Alex,</p>
          <p className="text-lg font-bold leading-tight">Where to next?</p>
        </div>
        <SearchField placeholder="Search destinations" />
        <div className="flex gap-2 overflow-hidden">
          <Chip active>Popular</Chip>
          <Chip>Beaches</Chip>
          <Chip>Cities</Chip>
          <Chip>Mountains</Chip>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-m-primary p-4 text-m-on-primary">
          <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-m-accent opacity-70" />
          <Plane className="absolute bottom-3 right-4 h-10 w-10 opacity-80" aria-hidden="true" />
          <p className="relative text-[10px] opacity-80">Summer deal</p>
          <p className="relative mt-0.5 text-lg font-bold leading-tight">Fly anywhere<br />from $199</p>
        </div>

        <p className="text-xs font-bold">Trending destinations</p>
        <div className="flex flex-col gap-2">
          {places.map(([name, country, price], i) => (
            <div key={name} className="flex items-center gap-3 rounded-xl bg-m-surface p-2.5 ring-1 ring-m-border">
              <span className={cn("flex h-12 w-12 items-center justify-center rounded-xl", tone(i))}>
                <MapPin className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{name}</p>
                <p className="flex items-center gap-1 text-[10px] text-m-muted">
                  <Star className="h-2.5 w-2.5 fill-m-warning text-m-warning" aria-hidden="true" />
                  4.{8 - i} · {country}
                </p>
              </div>
              <span className="text-xs font-bold text-m-ink">{price}</span>
            </div>
          ))}
        </div>
      </div>
      <TabBar active={0} icons={[Home, Map, Ticket, User]} />
    </>
  );
}

export function TravelTripScreen() {
  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <p className="text-base font-bold">Your trip</p>

        <div className="rounded-2xl bg-m-surface p-4 ring-1 ring-m-border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold">JFK</p>
              <p className="text-[10px] text-m-muted">New York</p>
            </div>
            <div className="flex flex-1 flex-col items-center px-2">
              <Plane className="h-4 w-4 text-m-ink" aria-hidden="true" />
              <span className="mt-1 h-px w-full bg-m-border" />
              <p className="mt-1 text-[9px] text-m-muted">7h 40m</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">LIS</p>
              <p className="text-[10px] text-m-muted">Lisbon</p>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 border-t border-m-border pt-3 text-center">
            {[["Date", "Oct 24"], ["Depart", "21:15"], ["Seat", "14A"]].map(([l, v]) => (
              <div key={l}>
                <p className="text-[9px] text-m-muted">{l}</p>
                <p className="text-xs font-bold">{v}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-xl bg-m-surface p-3 ring-1 ring-m-border">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-m-container text-m-on-container">
            <Hotel className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="flex-1">
            <p className="text-xs font-semibold">Alfama Boutique Hotel</p>
            <p className="text-[10px] text-m-muted">3 nights · Oct 24 – 27</p>
          </div>
          <Star className="h-4 w-4 fill-m-warning text-m-warning" aria-hidden="true" />
        </div>

        <div className="mt-auto flex items-end justify-between">
          <div>
            <p className="text-[10px] text-m-muted">Total</p>
            <p className="text-xl font-bold">$864</p>
          </div>
          <span className="rounded-full bg-m-container px-3 py-1 text-[10px] font-semibold text-m-on-container">
            Free cancellation
          </span>
        </div>
        <PrimaryButton>Book trip</PrimaryButton>
      </div>
      <TabBar active={2} icons={[Home, Map, Ticket, User]} />
    </>
  );
}

/* ---------------------------------- Finance -------------------------------- */

export function FinanceHomeScreen() {
  const actions = [
    ["Send", Send],
    ["Receive", ArrowDownLeft],
    ["Cards", CreditCard],
    ["Save", PiggyBank],
  ] as const;
  const txns = [
    ["Spotify", "Subscription", "-$9.99", false],
    ["Salary", "Acme Inc.", "+$3,200", true],
    ["Grocery Mart", "Food", "-$54.20", false],
  ] as const;

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-m-muted">Good morning,</p>
            <p className="text-sm font-bold">Alex Morgan</p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-m-surface ring-1 ring-m-border">
            <Bell className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-m-primary p-4 text-m-on-primary">
          <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-m-accent opacity-60" />
          <p className="relative text-[10px] opacity-80">Total balance</p>
          <p className="relative mt-0.5 text-2xl font-bold">$12,480.50</p>
          <p className="relative mt-3 font-mono text-[10px] opacity-80">•••• •••• •••• 4821</p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {actions.map(([label, Icon], i) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", i === 0 ? tone(0) : tone(1))}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[10px] text-m-muted">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs font-bold">Recent transactions</p>
        <ul className="flex flex-col gap-2">
          {txns.map(([name, sub, amount, income]) => (
            <li key={name} className="flex items-center gap-3 rounded-xl bg-m-surface p-2.5 ring-1 ring-m-border">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-m-container text-m-on-container">
                {income ? <ArrowDownLeft className="h-4 w-4" aria-hidden="true" /> : <ArrowUpRight className="h-4 w-4" aria-hidden="true" />}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{name}</p>
                <p className="text-[10px] text-m-muted">{sub}</p>
              </div>
              <span className={cn("text-xs font-bold", income ? "text-m-success" : "text-m-text")}>{amount}</span>
            </li>
          ))}
        </ul>
      </div>
      <TabBar active={0} icons={[Home, Wallet, TrendingUp, User]} />
    </>
  );
}

export function FinanceStatsScreen() {
  const bars = [45, 70, 55, 90, 60, 80] as const;
  const cats = [
    ["Housing", "$1,200", 70],
    ["Food", "$420", 40],
    ["Transport", "$180", 22],
  ] as const;

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-2">
        <p className="text-base font-bold">Spending</p>
        <div className="flex gap-2">
          <Chip>Week</Chip>
          <Chip active>Month</Chip>
          <Chip>Year</Chip>
        </div>

        <div className="rounded-2xl bg-m-surface p-4 ring-1 ring-m-border">
          <p className="text-[10px] text-m-muted">Spent this month</p>
          <p className="text-xl font-bold">$2,340 <span className="text-xs font-medium text-m-success">-8%</span></p>
          <div className="mt-3 flex h-24 items-end gap-2">
            {bars.map((h, i) => (
              <span
                key={i}
                className={cn("flex-1 rounded-md", i === 3 ? "bg-m-primary" : "bg-m-container")}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>

        <p className="text-xs font-bold">By category</p>
        <ul className="flex flex-col gap-2.5">
          {cats.map(([name, amount, pct]) => (
            <li key={name}>
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold">{name}</span>
                <span className="text-m-muted">{amount}</span>
              </div>
              <div className="mt-1 h-1.5 rounded-full bg-m-container">
                <div className="h-full rounded-full bg-m-primary" style={{ width: `${pct}%` }} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      <TabBar active={2} icons={[Home, Wallet, TrendingUp, User]} />
    </>
  );
}

/* --------------------------------- Education ------------------------------- */

export function LearnHomeScreen() {
  const courses = [
    ["UI Design Basics", "12 lessons · 4h", "4.9"],
    ["Python for Beginners", "20 lessons · 8h", "4.8"],
    ["Public Speaking", "9 lessons · 3h", "4.7"],
  ] as const;

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <div>
          <p className="text-[10px] text-m-muted">Welcome back,</p>
          <p className="text-lg font-bold leading-tight">Keep learning, Alex</p>
        </div>
        <SearchField placeholder="Search courses" />

        <div className="relative overflow-hidden rounded-2xl bg-m-primary p-4 text-m-on-primary">
          <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-m-accent opacity-60" />
          <p className="relative text-[10px] opacity-80">Continue</p>
          <p className="relative mt-0.5 text-sm font-bold">Design Systems 101</p>
          <div className="relative mt-3 h-1.5 rounded-full bg-m-on-primary/25">
            <div className="h-full w-2/3 rounded-full bg-m-on-primary" />
          </div>
          <p className="relative mt-1.5 text-[10px] opacity-80">8 of 12 lessons · 66%</p>
        </div>

        <p className="text-xs font-bold">Recommended</p>
        <ul className="flex flex-col gap-2">
          {courses.map(([name, meta, rating], i) => (
            <li key={name} className="flex items-center gap-3 rounded-xl bg-m-surface p-2.5 ring-1 ring-m-border">
              <span className={cn("flex h-12 w-12 items-center justify-center rounded-xl", tone(i))}>
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{name}</p>
                <p className="text-[10px] text-m-muted">{meta}</p>
              </div>
              <span className="flex items-center gap-0.5 text-[10px] font-semibold">
                <Star className="h-2.5 w-2.5 fill-m-warning text-m-warning" aria-hidden="true" />
                {rating}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <TabBar active={0} icons={[Home, BookOpen, Award, User]} />
    </>
  );
}

export function LessonScreen() {
  const lessons = [
    ["1. Introduction", "4:20", true],
    ["2. Color and type", "9:05", true],
    ["3. Components", "12:40", false],
    ["4. Tokens", "7:15", false],
  ] as const;

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <div className="relative flex h-32 items-center justify-center rounded-2xl bg-m-primary text-m-on-primary">
          <span className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-m-accent opacity-60" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-m-on-primary text-m-primary">
            <Play className="h-5 w-5 fill-current" aria-hidden="true" />
          </span>
        </div>
        <div>
          <p className="text-sm font-bold">Components</p>
          <p className="flex items-center gap-1 text-[10px] text-m-muted">
            <Clock className="h-3 w-3" aria-hidden="true" /> 12:40 · Lesson 3 of 12
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          {lessons.map(([name, len, done], i) => (
            <li
              key={name}
              className={cn(
                "flex items-center gap-3 rounded-xl p-2.5 ring-1",
                i === 2 ? "bg-m-container text-m-on-container ring-m-primary" : "bg-m-surface ring-m-border"
              )}
            >
              <span className={cn("flex h-7 w-7 items-center justify-center rounded-full", done ? "bg-m-success text-white" : "bg-m-bg text-m-muted")}>
                {done ? "✓" : <Play className="h-3 w-3" aria-hidden="true" />}
              </span>
              <span className="flex-1 truncate text-xs font-semibold">{name}</span>
              <span className="text-[10px] text-m-muted">{len}</span>
            </li>
          ))}
        </ul>
        <div className="mt-auto">
          <PrimaryButton>Next lesson</PrimaryButton>
        </div>
      </div>
      <TabBar active={1} icons={[Home, BookOpen, Award, User]} />
    </>
  );
}

/* --------------------------------- Healthcare ------------------------------ */

export function HealthHomeScreen() {
  const specialties = [
    ["Heart", HeartPulse],
    ["General", Stethoscope],
    ["Pharmacy", Pill],
    ["Checkup", Activity],
  ] as const;

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] text-m-muted">How are you feeling,</p>
            <p className="text-sm font-bold">Alex?</p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-m-surface ring-1 ring-m-border">
            <Bell className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>
        <SearchField placeholder="Search doctors or symptoms" />

        <div className="relative overflow-hidden rounded-2xl bg-m-primary p-4 text-m-on-primary">
          <span className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-m-accent opacity-60" />
          <p className="relative text-[10px] opacity-80">Next appointment</p>
          <p className="relative mt-0.5 text-sm font-bold">Dr. Priya Shah</p>
          <p className="relative text-[10px] opacity-80">Cardiologist</p>
          <p className="relative mt-3 flex items-center gap-1.5 text-[11px] font-semibold">
            <Calendar className="h-3.5 w-3.5" aria-hidden="true" /> Tomorrow · 10:30
          </p>
        </div>

        <div className="grid grid-cols-4 gap-2">
          {specialties.map(([label, Icon], i) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className={cn("flex h-11 w-11 items-center justify-center rounded-2xl", i === 0 ? tone(0) : tone(1))}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <span className="text-[10px] text-m-muted">{label}</span>
            </div>
          ))}
        </div>

        <p className="text-xs font-bold">Top doctors</p>
        <ul className="flex flex-col gap-2">
          {[["Dr. Mia Chen", "Dermatologist", "4.9"], ["Dr. Sam Ortiz", "General", "4.8"]].map(([name, role, rating], i) => (
            <li key={name} className="flex items-center gap-3 rounded-xl bg-m-surface p-2.5 ring-1 ring-m-border">
              <span className={cn("flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold", tone(i + 1))}>
                {name.split(" ").pop()![0]}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold">{name}</p>
                <p className="text-[10px] text-m-muted">{role}</p>
              </div>
              <span className="flex items-center gap-0.5 text-[10px] font-semibold">
                <Star className="h-2.5 w-2.5 fill-m-warning text-m-warning" aria-hidden="true" />
                {rating}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <TabBar active={0} icons={[Home, Calendar, Heart, User]} />
    </>
  );
}

export function ConsultScreen() {
  const slots = ["09:00", "09:30", "10:30", "11:00", "14:00", "15:30"];

  return (
    <>
      <div className="flex flex-1 flex-col gap-3 overflow-hidden px-4 pt-1">
        <p className="text-base font-bold">Book consultation</p>

        <div className="flex items-center gap-3 rounded-2xl bg-m-surface p-3 ring-1 ring-m-border">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-m-primary text-sm font-bold text-m-on-primary">
            PS
          </span>
          <div className="flex-1">
            <p className="text-sm font-semibold">Dr. Priya Shah</p>
            <p className="text-[10px] text-m-muted">Cardiologist · 12 yrs</p>
          </div>
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-m-container text-m-on-container">
            <Video className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <p className="text-xs font-bold">Pick a time · Oct 14</p>
        <div className="grid grid-cols-3 gap-2">
          {slots.map((s, i) => (
            <span
              key={s}
              className={cn(
                "rounded-xl py-2 text-center text-[11px] font-semibold",
                i === 2 ? "bg-m-primary text-m-on-primary" : "bg-m-surface ring-1 ring-m-border"
              )}
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-xl bg-m-container p-3 text-m-on-container">
          <span className="text-[11px]">Consultation fee</span>
          <span className="text-sm font-bold">$40</span>
        </div>

        <div className="mt-auto">
          <PrimaryButton>Confirm booking</PrimaryButton>
        </div>
      </div>
      <TabBar active={1} icons={[Home, Calendar, Heart, User]} />
    </>
  );
}
