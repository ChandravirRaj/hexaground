import type { ComponentType } from "react";

import {
  FoodWebCheckout,
  FoodWebHome,
  FoodWebMenu,
  GeneralDashboard,
  GeneralLanding,
  GeneralPricing,
} from "@/components/WebPreview/generalFoodScreens";
import {
  FitnessWebDashboard,
  FitnessWebHome,
  FitnessWebWorkouts,
  SalonWebAdmin,
  SalonWebBooking,
  SalonWebHome,
  ShopWebCart,
  ShopWebHome,
  ShopWebProduct,
} from "@/components/WebPreview/commerceServiceScreens";
import {
  FinanceWebDashboard,
  FinanceWebHome,
  HealthWebHome,
  HealthWebSchedule,
  LearnWebDashboard,
  LearnWebHome,
  TravelWebHome,
  TravelWebTrips,
} from "@/components/WebPreview/moreWebScreens";
import { WebLoginScreen, type WebCopy, type WebScreenProps } from "@/components/WebPreview/parts";
import type { PreviewCategoryId } from "@/utils/previewCategories";

export interface WebScreen {
  id: string;
  label: string;
  path: string;
  Component: ComponentType<WebScreenProps>;
  copy: WebCopy;
}

const COPY: Record<PreviewCategoryId, WebCopy> = {
  general: {
    brand: "Hexa",
    domain: "hexa.app",
    loginTitle: "Welcome back",
    loginText: "Sign in to continue to your workspace.",
    quote: "Hexa cut our launch time in half. The whole team loves it.",
    quoteBy: "Priya Shah, Head of Product",
  },
  food: {
    brand: "Foodie",
    domain: "foodie.com",
    loginTitle: "Hungry? Sign in",
    loginText: "Log in to order your favorites in a few clicks.",
    quote: "Dinner arrived hot in 18 minutes. I order every week now.",
    quoteBy: "Dana Lee, loyal customer",
  },
  ecommerce: {
    brand: "Shoply",
    domain: "shoply.store",
    loginTitle: "Welcome back",
    loginText: "Sign in to view your cart, orders and wishlist.",
    quote: "Checkout takes seconds and delivery is always on time.",
    quoteBy: "Chris Park, verified buyer",
  },
  salon: {
    brand: "Glow Studio",
    domain: "glowstudio.com",
    loginTitle: "Hello, gorgeous",
    loginText: "Sign in to manage your appointments.",
    quote: "Booking online is so easy, and Mia always gets my look right.",
    quoteBy: "Sofia Reyes, client since 2022",
  },
  fitness: {
    brand: "FitPulse",
    domain: "fitpulse.fit",
    loginTitle: "Ready to train?",
    loginText: "Sign in to pick up where you left off.",
    quote: "The streaks keep me honest. I haven't missed a week in a year.",
    quoteBy: "Sam Carter, member",
  },
  travel: {
    brand: "Wanderly",
    domain: "wanderly.travel",
    loginTitle: "Ready to travel?",
    loginText: "Sign in to see your trips and saved places.",
    quote: "Planning our honeymoon took an evening instead of a month.",
    quoteBy: "Nora Kim, happy traveler",
  },
  finance: {
    brand: "Mintly",
    domain: "mintly.money",
    loginTitle: "Welcome back",
    loginText: "Sign in securely to view your accounts.",
    quote: "I finally know where my money goes, and I'm saving more.",
    quoteBy: "Chris Park, customer",
  },
  education: {
    brand: "Skillset",
    domain: "skillset.academy",
    loginTitle: "Ready to learn?",
    loginText: "Sign in to pick up where you left off.",
    quote: "I switched careers in six months thanks to these courses.",
    quoteBy: "Priya Shah, product designer",
  },
  healthcare: {
    brand: "CareLink",
    domain: "carelink.health",
    loginTitle: "Welcome back",
    loginText: "Sign in to manage your health and visits.",
    quote: "I saw a doctor in 10 minutes without leaving home.",
    quoteBy: "Dana Lee, patient",
  },
};

function screen(
  id: PreviewCategoryId,
  key: string,
  label: string,
  path: string,
  Component: ComponentType<WebScreenProps>
): WebScreen {
  return { id: key, label, path: `${COPY[id].domain}${path}`, Component, copy: COPY[id] };
}

export const WEB_SCREENS: Record<PreviewCategoryId, WebScreen[]> = {
  general: [
    screen("general", "landing", "Landing page", "", GeneralLanding),
    screen("general", "dashboard", "Dashboard", "/dashboard", GeneralDashboard),
    screen("general", "pricing", "Pricing", "/pricing", GeneralPricing),
    screen("general", "login", "Sign in", "/login", WebLoginScreen),
  ],
  food: [
    screen("food", "home", "Home", "", FoodWebHome),
    screen("food", "menu", "Menu & cart", "/napoli-slice", FoodWebMenu),
    screen("food", "checkout", "Checkout", "/checkout", FoodWebCheckout),
    screen("food", "login", "Sign in", "/login", WebLoginScreen),
  ],
  ecommerce: [
    screen("ecommerce", "home", "Storefront", "", ShopWebHome),
    screen("ecommerce", "product", "Product page", "/p/everyday-backpack", ShopWebProduct),
    screen("ecommerce", "cart", "Cart", "/cart", ShopWebCart),
    screen("ecommerce", "login", "Sign in", "/login", WebLoginScreen),
  ],
  salon: [
    screen("salon", "home", "Home", "", SalonWebHome),
    screen("salon", "booking", "Booking", "/book", SalonWebBooking),
    screen("salon", "admin", "Admin schedule", "/admin", SalonWebAdmin),
    screen("salon", "login", "Sign in", "/login", WebLoginScreen),
  ],
  fitness: [
    screen("fitness", "home", "Home", "", FitnessWebHome),
    screen("fitness", "dashboard", "Dashboard", "/today", FitnessWebDashboard),
    screen("fitness", "workouts", "Workout library", "/workouts", FitnessWebWorkouts),
    screen("fitness", "login", "Sign in", "/login", WebLoginScreen),
  ],
  travel: [
    screen("travel", "home", "Home", "", TravelWebHome),
    screen("travel", "trips", "My trips", "/trips", TravelWebTrips),
    screen("travel", "login", "Sign in", "/login", WebLoginScreen),
  ],
  finance: [
    screen("finance", "home", "Home", "", FinanceWebHome),
    screen("finance", "dashboard", "Dashboard", "/overview", FinanceWebDashboard),
    screen("finance", "login", "Sign in", "/login", WebLoginScreen),
  ],
  education: [
    screen("education", "home", "Home", "", LearnWebHome),
    screen("education", "dashboard", "My learning", "/learning", LearnWebDashboard),
    screen("education", "login", "Sign in", "/login", WebLoginScreen),
  ],
  healthcare: [
    screen("healthcare", "home", "Home", "", HealthWebHome),
    screen("healthcare", "schedule", "Doctor schedule", "/schedule", HealthWebSchedule),
    screen("healthcare", "login", "Sign in", "/login", WebLoginScreen),
  ],
};
