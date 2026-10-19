import type { ComponentType } from "react";
import {
  Bell,
  Bike,
  BookOpen,
  GraduationCap,
  Landmark,
  Plane,
  Stethoscope,
  Ticket,
  Wallet,
  PiggyBank,
  Award,
  Pill,
  TrendingUp,
  ArrowDownLeft,
  Calendar,
  CreditCard,
  Dumbbell,
  Flame,
  Gift,
  HeartPulse,
  LayoutGrid,
  Lock,
  MapPin,
  Package,
  Pizza,
  Rocket,
  Scissors,
  Settings,
  ShoppingBag,
  Sparkles,
  Tag,
  Trophy,
  Check,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import {
  AppointmentsScreen,
  BookingScreen,
  CartScreen,
  FitnessHomeScreen,
  FoodDetailScreen,
  FoodHomeScreen,
  FoodOrderScreen,
  ProgressScreen,
  SalonHomeScreen,
  ShopHomeScreen,
  WorkoutScreen,
} from "@/components/MobilePreview/categoryScreens";
import {
  ConsultScreen,
  FinanceHomeScreen,
  FinanceStatsScreen,
  HealthHomeScreen,
  LearnHomeScreen,
  LessonScreen,
  TravelHomeScreen,
  TravelTripScreen,
} from "@/components/MobilePreview/moreScreens";
import {
  ChatScreen,
  DashboardScreen,
  ListScreen,
  LoginScreen,
  NotificationsScreen,
  ProductScreen,
  ProfileScreen,
  WalkthroughScreen,
} from "@/components/MobilePreview/screens";
import type { CategoryCopy, ScreenProps } from "@/components/MobilePreview/types";
import type { PreviewCategoryId } from "@/utils/previewCategories";

export interface PreviewScreen {
  id: string;
  label: string;
  Component: ComponentType<ScreenProps>;
}

const profileRows = (extra: { label: string; icon: LucideIcon }[]) => [
  ...extra,
  { label: "Notifications", icon: Bell },
  { label: "Privacy", icon: Lock },
  { label: "Settings", icon: Settings },
];

const GENERAL_COPY: CategoryCopy = {
  walkthrough: {
    icon: Rocket,
    title: "Launch your ideas",
    text: "Plan, track and share everything in one place, styled in your own colors.",
  },
  login: { title: "Welcome back", text: "Sign in to continue to your account." },
  profile: {
    name: "Alex Morgan",
    email: "alex@example.com",
    initials: "AM",
    stats: [["128", "Posts"], ["4.2k", "Followers"], ["310", "Following"]],
    rows: profileRows([{ label: "Payment methods", icon: CreditCard }]),
  },
  notifications: [
    { icon: Gift, title: "You earned a reward", sub: "20% off your next order", time: "2m", unread: true, tone: "bg-m-accent text-m-on-accent" },
    { icon: Package, title: "Order shipped", sub: "Arriving on Thursday", time: "1h", unread: true, tone: "bg-m-container text-m-on-container" },
    { icon: Check, title: "Payment received", sub: "Invoice #204 is paid", time: "3h", unread: false, tone: "bg-m-success text-white" },
    { icon: Tag, title: "Price drop", sub: "Everyday Backpack is now $79", time: "Yesterday", unread: false, tone: "bg-m-warning text-white" },
    { icon: CreditCard, title: "Card expiring soon", sub: "Update your payment method", time: "Mon", unread: false, tone: "bg-m-danger text-white" },
  ],
};

const FOOD_COPY: CategoryCopy = {
  walkthrough: {
    icon: Pizza,
    title: "Food you love, fast",
    text: "Order from the best local restaurants and track your delivery live.",
  },
  login: { title: "Hungry? Sign in", text: "Log in to order your favorites in a few taps." },
  profile: {
    name: "Alex Morgan",
    email: "alex@example.com",
    initials: "AM",
    stats: [["42", "Orders"], ["18", "Favorites"], ["$36", "Saved"]],
    rows: profileRows([
      { label: "Delivery addresses", icon: MapPin },
      { label: "Payment methods", icon: CreditCard },
    ]),
  },
  notifications: [
    { icon: Bike, title: "Your courier is nearby", sub: "Arriving in 3 minutes", time: "now", unread: true, tone: "bg-m-accent text-m-on-accent" },
    { icon: Tag, title: "30% off pizza tonight", sub: "Use code PIZZA30", time: "1h", unread: true, tone: "bg-m-container text-m-on-container" },
    { icon: Check, title: "Order delivered", sub: "Enjoy your meal!", time: "Yesterday", unread: false, tone: "bg-m-success text-white" },
    { icon: Gift, title: "Free dessert unlocked", sub: "On your next order", time: "Mon", unread: false, tone: "bg-m-warning text-white" },
    { icon: CreditCard, title: "Payment failed", sub: "Please update your card", time: "Sun", unread: false, tone: "bg-m-danger text-white" },
  ],
};

const SHOP_COPY: CategoryCopy = {
  walkthrough: {
    icon: ShoppingBag,
    title: "Shop the latest",
    text: "Discover new arrivals, save favorites and check out in seconds.",
  },
  login: { title: "Welcome back", text: "Sign in to view your cart and orders." },
  profile: {
    name: "Alex Morgan",
    email: "alex@example.com",
    initials: "AM",
    stats: [["14", "Orders"], ["32", "Wishlist"], ["220", "Points"]],
    rows: profileRows([
      { label: "My orders", icon: Package },
      { label: "Payment methods", icon: CreditCard },
    ]),
  },
  notifications: GENERAL_COPY.notifications,
};

const SALON_COPY: CategoryCopy = {
  walkthrough: {
    icon: Scissors,
    title: "Book in seconds",
    text: "Pick a stylist, choose a time and look your best, no phone calls needed.",
  },
  login: { title: "Hello, gorgeous", text: "Sign in to manage your appointments." },
  profile: {
    name: "Sofia Reyes",
    email: "sofia@example.com",
    initials: "SR",
    stats: [["18", "Visits"], ["5", "Stylists"], ["320", "Points"]],
    rows: profileRows([
      { label: "My bookings", icon: Calendar },
      { label: "Payment methods", icon: CreditCard },
    ]),
  },
  notifications: [
    { icon: Calendar, title: "Appointment tomorrow", sub: "Haircut at 14:00 with Mia", time: "1h", unread: true, tone: "bg-m-accent text-m-on-accent" },
    { icon: Sparkles, title: "New: Glow facial", sub: "Book now and save 15%", time: "3h", unread: true, tone: "bg-m-container text-m-on-container" },
    { icon: Check, title: "Booking confirmed", sub: "Gel manicure · Oct 14", time: "Yesterday", unread: false, tone: "bg-m-success text-white" },
    { icon: Gift, title: "Birthday treat", sub: "Free blow-dry this month", time: "Mon", unread: false, tone: "bg-m-warning text-white" },
    { icon: Bell, title: "Rate your last visit", sub: "Tell us about Zoe's service", time: "Sun", unread: false, tone: "bg-m-danger text-white" },
  ],
};

const FITNESS_COPY: CategoryCopy = {
  walkthrough: {
    icon: Dumbbell,
    title: "Train smarter",
    text: "Personal plans, progress tracking and streaks that keep you moving.",
  },
  login: { title: "Ready to train?", text: "Sign in to pick up where you left off." },
  profile: {
    name: "Sam Carter",
    email: "sam@example.com",
    initials: "SC",
    stats: [["86", "Workouts"], ["12", "Day streak"], ["14", "Badges"]],
    rows: profileRows([
      { label: "My goals", icon: Trophy },
      { label: "Health data", icon: HeartPulse },
    ]),
  },
  notifications: [
    { icon: Flame, title: "Don't break your streak", sub: "12 days and counting", time: "now", unread: true, tone: "bg-m-accent text-m-on-accent" },
    { icon: Trophy, title: "New badge earned", sub: "Early Bird · 5 morning workouts", time: "2h", unread: true, tone: "bg-m-container text-m-on-container" },
    { icon: Check, title: "Goal reached", sub: "10,000 steps yesterday", time: "Yesterday", unread: false, tone: "bg-m-success text-white" },
    { icon: Dumbbell, title: "New plan available", sub: "4-week strength builder", time: "Mon", unread: false, tone: "bg-m-warning text-white" },
    { icon: HeartPulse, title: "Resting heart rate up", sub: "Take it easy today", time: "Sun", unread: false, tone: "bg-m-danger text-white" },
  ],
};


const TRAVEL_COPY: CategoryCopy = {
  walkthrough: {
    icon: Plane,
    title: "Explore the world",
    text: "Find flights, stays and experiences, and keep every trip in one place.",
  },
  login: { title: "Ready to travel?", text: "Sign in to see your trips and saved places." },
  profile: {
    name: "Alex Morgan",
    email: "alex@example.com",
    initials: "AM",
    stats: [["12", "Trips"], ["9", "Countries"], ["3.4k", "Points"]],
    rows: profileRows([
      { label: "My tickets", icon: Ticket },
      { label: "Payment methods", icon: CreditCard },
    ]),
  },
  notifications: [
    { icon: Plane, title: "Check-in is open", sub: "Flight JFK to LIS · Oct 24", time: "now", unread: true, tone: "bg-m-accent text-m-on-accent" },
    { icon: Tag, title: "Price drop to Kyoto", sub: "Now from $690", time: "2h", unread: true, tone: "bg-m-container text-m-on-container" },
    { icon: Check, title: "Hotel confirmed", sub: "Alfama Boutique · 3 nights", time: "Yesterday", unread: false, tone: "bg-m-success text-white" },
    { icon: Gift, title: "Bonus points earned", sub: "+240 points added", time: "Mon", unread: false, tone: "bg-m-warning text-white" },
    { icon: Bell, title: "Passport expires soon", sub: "Renew before your next trip", time: "Sun", unread: false, tone: "bg-m-danger text-white" },
  ],
};

const FINANCE_COPY: CategoryCopy = {
  walkthrough: {
    icon: Wallet,
    title: "Take control of money",
    text: "Spend, save and track everything in one secure, simple app.",
  },
  login: { title: "Welcome back", text: "Sign in securely to view your accounts." },
  profile: {
    name: "Alex Morgan",
    email: "alex@example.com",
    initials: "AM",
    stats: [["3", "Accounts"], ["2", "Cards"], ["$840", "Saved"]],
    rows: profileRows([
      { label: "Cards", icon: CreditCard },
      { label: "Security", icon: Lock },
    ]),
  },
  notifications: [
    { icon: ArrowDownLeft, title: "Salary received", sub: "+$3,200 from Acme Inc.", time: "now", unread: true, tone: "bg-m-accent text-m-on-accent" },
    { icon: TrendingUp, title: "Portfolio up 2.4%", sub: "Your investments grew this week", time: "3h", unread: true, tone: "bg-m-container text-m-on-container" },
    { icon: Check, title: "Transfer complete", sub: "$500 to Savings", time: "Yesterday", unread: false, tone: "bg-m-success text-white" },
    { icon: PiggyBank, title: "Savings goal 80%", sub: "Almost there, keep going", time: "Mon", unread: false, tone: "bg-m-warning text-white" },
    { icon: CreditCard, title: "Unusual activity", sub: "Review a recent card payment", time: "Sun", unread: false, tone: "bg-m-danger text-white" },
  ],
};

const EDUCATION_COPY: CategoryCopy = {
  walkthrough: {
    icon: GraduationCap,
    title: "Learn anything",
    text: "Bite-sized lessons from experts that fit around your day.",
  },
  login: { title: "Ready to learn?", text: "Sign in to pick up where you left off." },
  profile: {
    name: "Alex Morgan",
    email: "alex@example.com",
    initials: "AM",
    stats: [["5", "Courses"], ["12", "Day streak"], ["3", "Certificates"]],
    rows: profileRows([
      { label: "My certificates", icon: Award },
      { label: "Learning goals", icon: Trophy },
    ]),
  },
  notifications: [
    { icon: Flame, title: "Keep your streak alive", sub: "12 days and counting", time: "now", unread: true, tone: "bg-m-accent text-m-on-accent" },
    { icon: BookOpen, title: "New lesson added", sub: "Design Systems 101 · Lesson 9", time: "2h", unread: true, tone: "bg-m-container text-m-on-container" },
    { icon: Award, title: "Certificate earned", sub: "Public Speaking", time: "Yesterday", unread: false, tone: "bg-m-success text-white" },
    { icon: Gift, title: "Free week unlocked", sub: "Try any course for 7 days", time: "Mon", unread: false, tone: "bg-m-warning text-white" },
    { icon: Calendar, title: "Live session tomorrow", sub: "Q&A with your mentor", time: "Sun", unread: false, tone: "bg-m-danger text-white" },
  ],
};

const HEALTH_COPY: CategoryCopy = {
  walkthrough: {
    icon: Stethoscope,
    title: "Care, made simple",
    text: "Book doctors, join video visits and manage prescriptions from your phone.",
  },
  login: { title: "Welcome back", text: "Sign in to manage your health and visits." },
  profile: {
    name: "Alex Morgan",
    email: "alex@example.com",
    initials: "AM",
    stats: [["6", "Visits"], ["2", "Prescriptions"], ["4", "Doctors"]],
    rows: profileRows([
      { label: "Medical records", icon: HeartPulse },
      { label: "Insurance", icon: CreditCard },
    ]),
  },
  notifications: [
    { icon: Calendar, title: "Appointment tomorrow", sub: "Dr. Priya Shah at 10:30", time: "1h", unread: true, tone: "bg-m-accent text-m-on-accent" },
    { icon: Pill, title: "Time for your medication", sub: "Vitamin D · 1 tablet", time: "now", unread: true, tone: "bg-m-container text-m-on-container" },
    { icon: Check, title: "Lab results ready", sub: "Blood panel is normal", time: "Yesterday", unread: false, tone: "bg-m-success text-white" },
    { icon: HeartPulse, title: "Weekly health summary", sub: "Resting heart rate steady", time: "Mon", unread: false, tone: "bg-m-warning text-white" },
    { icon: Bell, title: "Refill needed", sub: "Your prescription runs out soon", time: "Sun", unread: false, tone: "bg-m-danger text-white" },
  ],
};

export interface BoundScreen extends PreviewScreen {
  copy: CategoryCopy;
}

/** Binds a screen to a category's copy so the panel can render it uniformly. */
function withCopy(
  copy: CategoryCopy,
  id: string,
  label: string,
  Component: ComponentType<ScreenProps>
): BoundScreen {
  return { id, label, Component, copy };
}

export interface BoundCategory {
  id: PreviewCategoryId;
  label: string;
  icon: LucideIcon;
  screens: BoundScreen[];
}

export const CATEGORIES: BoundCategory[] = [
  {
    id: "general",
    label: "General",
    icon: LayoutGrid,
    screens: [
      withCopy(GENERAL_COPY, "walkthrough", "Walkthrough", WalkthroughScreen),
      withCopy(GENERAL_COPY, "dashboard", "Dashboard", DashboardScreen),
      withCopy(GENERAL_COPY, "list", "List items", ListScreen),
      withCopy(GENERAL_COPY, "profile", "Profile", ProfileScreen),
      withCopy(GENERAL_COPY, "login", "Login", LoginScreen),
      withCopy(GENERAL_COPY, "product", "Product details", ProductScreen),
      withCopy(GENERAL_COPY, "chat", "Chat", ChatScreen),
      withCopy(GENERAL_COPY, "notifications", "Notifications", NotificationsScreen),
    ],
  },
  {
    id: "food",
    label: "Food order",
    icon: Utensils,
    screens: [
      withCopy(FOOD_COPY, "walkthrough", "Walkthrough", WalkthroughScreen),
      withCopy(FOOD_COPY, "login", "Login", LoginScreen),
      withCopy(FOOD_COPY, "home", "Restaurants", FoodHomeScreen),
      withCopy(FOOD_COPY, "dish", "Dish details", FoodDetailScreen),
      withCopy(FOOD_COPY, "tracking", "Order tracking", FoodOrderScreen),
      withCopy(FOOD_COPY, "notifications", "Notifications", NotificationsScreen),
      withCopy(FOOD_COPY, "profile", "Profile", ProfileScreen),
    ],
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: ShoppingBag,
    screens: [
      withCopy(SHOP_COPY, "walkthrough", "Walkthrough", WalkthroughScreen),
      withCopy(SHOP_COPY, "login", "Login", LoginScreen),
      withCopy(SHOP_COPY, "home", "Shop", ShopHomeScreen),
      withCopy(SHOP_COPY, "product", "Product details", ProductScreen),
      withCopy(SHOP_COPY, "cart", "Cart", CartScreen),
      withCopy(SHOP_COPY, "notifications", "Notifications", NotificationsScreen),
      withCopy(SHOP_COPY, "profile", "Profile", ProfileScreen),
    ],
  },
  {
    id: "salon",
    label: "Salon booking",
    icon: Scissors,
    screens: [
      withCopy(SALON_COPY, "walkthrough", "Walkthrough", WalkthroughScreen),
      withCopy(SALON_COPY, "login", "Login", LoginScreen),
      withCopy(SALON_COPY, "home", "Services", SalonHomeScreen),
      withCopy(SALON_COPY, "booking", "Book a slot", BookingScreen),
      withCopy(SALON_COPY, "appointments", "My bookings", AppointmentsScreen),
      withCopy(SALON_COPY, "notifications", "Notifications", NotificationsScreen),
      withCopy(SALON_COPY, "profile", "Profile", ProfileScreen),
    ],
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: Dumbbell,
    screens: [
      withCopy(FITNESS_COPY, "walkthrough", "Walkthrough", WalkthroughScreen),
      withCopy(FITNESS_COPY, "login", "Login", LoginScreen),
      withCopy(FITNESS_COPY, "home", "Today", FitnessHomeScreen),
      withCopy(FITNESS_COPY, "workout", "Workout", WorkoutScreen),
      withCopy(FITNESS_COPY, "progress", "Progress", ProgressScreen),
      withCopy(FITNESS_COPY, "notifications", "Notifications", NotificationsScreen),
      withCopy(FITNESS_COPY, "profile", "Profile", ProfileScreen),
    ],
  },
  {
    id: "travel",
    label: "Travel",
    icon: Plane,
    screens: [
      withCopy(TRAVEL_COPY, "walkthrough", "Walkthrough", WalkthroughScreen),
      withCopy(TRAVEL_COPY, "login", "Login", LoginScreen),
      withCopy(TRAVEL_COPY, "home", "Explore", TravelHomeScreen),
      withCopy(TRAVEL_COPY, "trip", "Trip details", TravelTripScreen),
      withCopy(TRAVEL_COPY, "notifications", "Notifications", NotificationsScreen),
      withCopy(TRAVEL_COPY, "profile", "Profile", ProfileScreen),
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: Landmark,
    screens: [
      withCopy(FINANCE_COPY, "walkthrough", "Walkthrough", WalkthroughScreen),
      withCopy(FINANCE_COPY, "login", "Login", LoginScreen),
      withCopy(FINANCE_COPY, "home", "Wallet", FinanceHomeScreen),
      withCopy(FINANCE_COPY, "stats", "Spending", FinanceStatsScreen),
      withCopy(FINANCE_COPY, "notifications", "Notifications", NotificationsScreen),
      withCopy(FINANCE_COPY, "profile", "Profile", ProfileScreen),
    ],
  },
  {
    id: "education",
    label: "Education",
    icon: GraduationCap,
    screens: [
      withCopy(EDUCATION_COPY, "walkthrough", "Walkthrough", WalkthroughScreen),
      withCopy(EDUCATION_COPY, "login", "Login", LoginScreen),
      withCopy(EDUCATION_COPY, "home", "Courses", LearnHomeScreen),
      withCopy(EDUCATION_COPY, "lesson", "Lesson", LessonScreen),
      withCopy(EDUCATION_COPY, "notifications", "Notifications", NotificationsScreen),
      withCopy(EDUCATION_COPY, "profile", "Profile", ProfileScreen),
    ],
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: Stethoscope,
    screens: [
      withCopy(HEALTH_COPY, "walkthrough", "Walkthrough", WalkthroughScreen),
      withCopy(HEALTH_COPY, "login", "Login", LoginScreen),
      withCopy(HEALTH_COPY, "home", "Home", HealthHomeScreen),
      withCopy(HEALTH_COPY, "consult", "Book consultation", ConsultScreen),
      withCopy(HEALTH_COPY, "notifications", "Notifications", NotificationsScreen),
      withCopy(HEALTH_COPY, "profile", "Profile", ProfileScreen),
    ],
  },
];

export function getCategory(id: PreviewCategoryId): BoundCategory {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}
