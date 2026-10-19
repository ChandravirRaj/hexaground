import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        brand: "var(--brand)",
        "on-brand": "var(--on-brand)",
        white: "rgb(var(--white) / <alpha-value>)",
        neutral: {
          50: "rgb(var(--n-50) / <alpha-value>)",
          100: "rgb(var(--n-100) / <alpha-value>)",
          200: "rgb(var(--n-200) / <alpha-value>)",
          300: "rgb(var(--n-300) / <alpha-value>)",
          400: "rgb(var(--n-400) / <alpha-value>)",
          500: "rgb(var(--n-500) / <alpha-value>)",
          600: "rgb(var(--n-600) / <alpha-value>)",
          700: "rgb(var(--n-700) / <alpha-value>)",
          800: "rgb(var(--n-800) / <alpha-value>)",
          900: "rgb(var(--n-900) / <alpha-value>)",
          950: "rgb(var(--n-950) / <alpha-value>)",
        },
        m: {
          primary: "var(--m-primary)",
          "on-primary": "var(--m-on-primary)",
          ink: "var(--m-ink)",
          container: "var(--m-container)",
          "on-container": "var(--m-on-container)",
          accent: "var(--m-accent)",
          "on-accent": "var(--m-on-accent)",
          bg: "var(--m-bg)",
          surface: "var(--m-surface)",
          border: "var(--m-border)",
          text: "var(--m-text)",
          muted: "var(--m-muted)",
          success: "var(--m-success)",
          warning: "var(--m-warning)",
          danger: "var(--m-danger)",
        },
      },
      borderRadius: {
        "2xl": "0.75rem",
        "3xl": "1rem",
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0, 0, 0, 0.06)",
      },
      height: {
        dvh: "100dvh",
      },
      minHeight: {
        dvh: "100dvh",
      },
    },
  },
  plugins: [],
};

export default config;
