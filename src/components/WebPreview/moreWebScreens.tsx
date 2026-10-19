import {
  Activity,
  ArrowDownLeft,
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  Calendar,
  Clock,
  CreditCard,
  GraduationCap,
  Heart,
  HeartPulse,
  Home,
  Hotel,
  Map,
  MapPin,
  PiggyBank,
  Pill,
  Plane,
  Settings,
  Star,
  Stethoscope,
  Ticket,
  TrendingUp,
  Users,
  Video,
  Wallet,
} from "lucide-react";

import { BarChart, Btn, Sidebar, StatCard, TopBar, WebNav } from "@/components/WebPreview/parts";
import { cn } from "@/lib/cn";

const tone = (i: number) =>
  [
    "bg-m-primary text-m-on-primary",
    "bg-m-container text-m-on-container",
    "bg-m-accent text-m-on-accent",
  ][i % 3];

function Hero({
  title,
  text,
  primary,
  secondary,
  Icon,
}: {
  title: string;
  text: string;
  primary: string;
  secondary: string;
  Icon: typeof Plane;
}) {
  return (
    <div className="relative mx-14 mt-8 overflow-hidden rounded-3xl bg-m-primary p-14 text-m-on-primary">
      <span className="absolute -right-16 -top-16 h-96 w-96 rounded-full bg-m-accent opacity-60" />
      <Icon className="absolute bottom-8 right-24 h-40 w-40 opacity-80" aria-hidden="true" />
      <h1 className="relative max-w-xl text-6xl font-extrabold leading-[1.05]">{title}</h1>
      <p className="relative mt-4 max-w-md opacity-85">{text}</p>
      <div className="relative mt-7 flex gap-3">
        <Btn variant="outline" className="px-8 py-4 text-base text-m-text">{primary}</Btn>
        <Btn variant="soft" className="px-8 py-4 text-base">{secondary}</Btn>
      </div>
    </div>
  );
}

function Stats({ items }: { items: [string, string][] }) {
  return (
    <div className="grid grid-cols-4 gap-4 px-14 py-6">
      {items.map(([v, l]) => (
        <div key={l} className="rounded-2xl bg-m-surface p-4 text-center ring-1 ring-m-border">
          <p className="text-2xl font-bold text-m-ink">{v}</p>
          <p className="text-xs text-m-muted">{l}</p>
        </div>
      ))}
    </div>
  );
}

function Cards({ items }: { items: readonly (readonly [string, string, typeof Plane])[] }) {
  return (
    <div className="grid grid-cols-3 gap-5 px-14">
      {items.map(([name, meta, Icon], i) => (
        <div key={name} className="flex items-center gap-4 rounded-2xl bg-m-surface p-5 ring-1 ring-m-border">
          <span className={cn("flex h-14 w-14 items-center justify-center rounded-2xl", tone(i))}>
            <Icon className="h-6 w-6" aria-hidden="true" />
          </span>
          <div>
            <p className="font-bold">{name}</p>
            <p className="text-xs text-m-muted">{meta}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------------------------- Travel --------------------------------- */

export function TravelWebHome() {
  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Wanderly" links={["Flights", "Stays", "Experiences", "Deals"]} cta="Plan a trip" />
      <Hero
        title="Your next adventure starts here."
        text="Compare flights, book stays and discover things to do, all in one place."
        primary="Search flights"
        secondary="Browse stays"
        Icon={Plane}
      />
      <Stats items={[["190+", "Countries"], ["2M", "Stays"], ["4.8★", "Traveler rating"], ["24/7", "Support"]]} />
      <Cards
        items={[
          ["Santorini", "From $420 · 7 nights", MapPin],
          ["Kyoto", "From $690 · 9 nights", MapPin],
          ["Lisbon", "From $310 · 5 nights", MapPin],
        ]}
      />
    </div>
  );
}

export function TravelWebTrips() {
  const trips = [
    ["Lisbon, Portugal", "Oct 24 – 27", "Confirmed"],
    ["Kyoto, Japan", "Dec 02 – 11", "Confirmed"],
    ["Santorini, Greece", "Jun 15 – 22", "Pending"],
  ];

  return (
    <div className="flex h-full">
      <Sidebar
        brand="Wanderly"
        items={[
          { label: "Trips", icon: Map },
          { label: "Tickets", icon: Ticket },
          { label: "Stays", icon: Hotel },
          { label: "Saved", icon: Heart },
          { label: "Settings", icon: Settings },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-8">
        <TopBar title="My trips" sub="3 upcoming" />
        <div className="grid grid-cols-3 gap-4">
          <StatCard icon={Plane} label="Flights booked" value="4" />
          <StatCard icon={Hotel} label="Nights away" value="21" delta="+5" />
          <StatCard icon={Star} label="Reward points" value="3,420" delta="+240" />
        </div>
        <div className="flex-1 rounded-2xl bg-m-surface p-6 ring-1 ring-m-border">
          <ul className="flex flex-col divide-y divide-m-border">
            {trips.map(([place, dates, status]) => (
              <li key={place} className="flex items-center gap-5 py-4 text-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-m-container text-m-on-container">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="flex-1 font-semibold">{place}</span>
                <span className="w-32 text-m-muted">{dates}</span>
                <span className="flex w-28 items-center gap-2 text-xs">
                  <span className={cn("h-2 w-2 rounded-full", status === "Confirmed" ? "bg-m-success" : "bg-m-warning")} />
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------- Finance -------------------------------- */

export function FinanceWebHome() {
  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Mintly" links={["Personal", "Business", "Cards", "Invest"]} cta="Open account" />
      <Hero
        title="Money that works as hard as you."
        text="Spend, save and invest from one secure account with no hidden fees."
        primary="Get started"
        secondary="See how it works"
        Icon={Wallet}
      />
      <Stats items={[["5M+", "Customers"], ["0%", "Monthly fees"], ["4.7★", "App rating"], ["FDIC", "Insured"]]} />
      <Cards
        items={[
          ["Smart savings", "4.2% APY", PiggyBank],
          ["Virtual cards", "Instant, free", CreditCard],
          ["Investing", "From $1", TrendingUp],
        ]}
      />
    </div>
  );
}

export function FinanceWebDashboard() {
  const txns = [
    ["Salary · Acme Inc.", "Oct 12", "+$3,200.00", true],
    ["Spotify", "Oct 11", "-$9.99", false],
    ["Grocery Mart", "Oct 10", "-$54.20", false],
    ["Transfer to Savings", "Oct 09", "-$500.00", false],
  ] as const;

  return (
    <div className="flex h-full">
      <Sidebar
        brand="Mintly"
        items={[
          { label: "Overview", icon: Home },
          { label: "Accounts", icon: Wallet },
          { label: "Cards", icon: CreditCard },
          { label: "Insights", icon: BarChart3 },
          { label: "Settings", icon: Settings },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-8">
        <TopBar title="Overview" sub="Wednesday, Oct 14" />
        <div className="grid grid-cols-3 gap-4">
          <StatCard icon={Wallet} label="Total balance" value="$12,480" delta="+3.1%" />
          <StatCard icon={ArrowDownLeft} label="Income" value="$4,100" />
          <StatCard icon={ArrowUpRight} label="Spending" value="$2,340" delta="-8%" />
        </div>
        <div className="grid flex-1 grid-cols-5 gap-4">
          <div className="col-span-3 rounded-2xl bg-m-surface p-6 ring-1 ring-m-border">
            <p className="mb-4 font-bold">Spending this month</p>
            <BarChart values={[45, 70, 55, 90, 60, 80, 50, 65]} highlight={3} />
          </div>
          <div className="col-span-2 rounded-2xl bg-m-surface p-6 ring-1 ring-m-border">
            <p className="mb-3 font-bold">Recent</p>
            <ul className="flex flex-col divide-y divide-m-border">
              {txns.map(([name, date, amount, income]) => (
                <li key={name} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-semibold">{name}</p>
                    <p className="text-xs text-m-muted">{date}</p>
                  </div>
                  <span className={cn("font-bold", income && "text-m-success")}>{amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Education ------------------------------- */

export function LearnWebHome() {
  return (
    <div className="flex h-full flex-col">
      <WebNav brand="Skillset" links={["Courses", "Paths", "Mentors", "Pricing"]} cta="Start free" />
      <Hero
        title="Learn a new skill in weeks."
        text="Hands-on courses from industry experts, at your own pace."
        primary="Browse courses"
        secondary="Take a free lesson"
        Icon={GraduationCap}
      />
      <Stats items={[["500+", "Courses"], ["3M", "Learners"], ["4.9★", "Avg. rating"], ["120", "Experts"]]} />
      <Cards
        items={[
          ["UI Design Basics", "12 lessons · 4h", BookOpen],
          ["Python for Beginners", "20 lessons · 8h", BookOpen],
          ["Public Speaking", "9 lessons · 3h", BookOpen],
        ]}
      />
    </div>
  );
}

export function LearnWebDashboard() {
  const courses = [
    ["Design Systems 101", 66],
    ["Python for Beginners", 35],
    ["Public Speaking", 90],
  ] as const;

  return (
    <div className="flex h-full">
      <Sidebar
        brand="Skillset"
        items={[
          { label: "Learning", icon: Home },
          { label: "Courses", icon: BookOpen },
          { label: "Certificates", icon: Award },
          { label: "Community", icon: Users },
          { label: "Settings", icon: Settings },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-8">
        <TopBar title="My learning" sub="Keep your 12-day streak going" />
        <div className="grid grid-cols-3 gap-4">
          <StatCard icon={BookOpen} label="Courses in progress" value="3" />
          <StatCard icon={Clock} label="Hours this week" value="6.5" delta="+1.2" />
          <StatCard icon={Award} label="Certificates" value="5" />
        </div>
        <div className="flex-1 rounded-2xl bg-m-surface p-6 ring-1 ring-m-border">
          <p className="mb-4 font-bold">Continue learning</p>
          <ul className="flex flex-col gap-5">
            {courses.map(([name, pct]) => (
              <li key={name}>
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">{name}</span>
                  <span className="text-m-muted">{pct}%</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-m-container">
                  <div className="h-full rounded-full bg-m-primary" style={{ width: `${pct}%` }} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

/* --------------------------------- Healthcare ------------------------------ */

export function HealthWebHome() {
  return (
    <div className="flex h-full flex-col">
      <WebNav brand="CareLink" links={["Find a doctor", "Services", "Pharmacy", "Plans"]} cta="Book a visit" />
      <Hero
        title="See a doctor from anywhere."
        text="Book appointments, video consults and refills with trusted specialists."
        primary="Find a doctor"
        secondary="Start a video visit"
        Icon={Stethoscope}
      />
      <Stats items={[["5,000+", "Doctors"], ["15 min", "Avg. wait"], ["4.9★", "Patient rating"], ["24/7", "Care"]]} />
      <Cards
        items={[
          ["Heart health", "Cardiology", HeartPulse],
          ["Video visits", "From $40", Video],
          ["Pharmacy", "Same-day delivery", Pill],
        ]}
      />
    </div>
  );
}

export function HealthWebSchedule() {
  const visits = [
    ["09:00", "Sofia Reyes", "Checkup", "In person", "Confirmed"],
    ["10:30", "Dana Lee", "Follow-up", "Video", "Confirmed"],
    ["12:00", "Chris Park", "Consultation", "Video", "Pending"],
    ["14:00", "Nora Kim", "Lab review", "In person", "Confirmed"],
  ];

  return (
    <div className="flex h-full">
      <Sidebar
        brand="CareLink"
        items={[
          { label: "Schedule", icon: Calendar },
          { label: "Patients", icon: Users },
          { label: "Messages", icon: Heart },
          { label: "Reports", icon: Activity },
          { label: "Settings", icon: Settings },
        ]}
      />
      <div className="flex flex-1 flex-col gap-6 p-8">
        <TopBar title="Today's visits" sub="Wednesday, Oct 14" />
        <div className="grid grid-cols-3 gap-4">
          <StatCard icon={Calendar} label="Appointments" value="14" delta="+3" />
          <StatCard icon={Users} label="New patients" value="5" />
          <StatCard icon={Video} label="Video visits" value="6" />
        </div>
        <div className="flex-1 rounded-2xl bg-m-surface p-6 ring-1 ring-m-border">
          <ul className="flex flex-col divide-y divide-m-border">
            {visits.map(([time, patient, reason, kind, status]) => (
              <li key={time} className="flex items-center gap-5 py-3.5 text-sm">
                <span className="w-14 font-bold text-m-ink">{time}</span>
                <span className="flex-1 font-semibold">{patient}</span>
                <span className="w-32 text-m-muted">{reason}</span>
                <span className="w-24 text-m-muted">{kind}</span>
                <span className="flex w-28 items-center gap-2 text-xs">
                  <span className={cn("h-2 w-2 rounded-full", status === "Confirmed" ? "bg-m-success" : "bg-m-warning")} />
                  {status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
