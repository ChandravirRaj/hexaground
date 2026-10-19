# Hexaground

**Hexaground** is a premium, client-side color playground for exploring, converting, and saving colors. Built as a single-page application with a clean Apple-inspired UI, it feels like a polished design tool — fast, minimal, and fully responsive.

Works without a backend: data persists in the browser via LocalStorage. Optionally sign in with Google to sync across devices via Firebase.

---

## Features

### Color Playground
- **Interactive picker** — 2D saturation/lightness area, hue slider, and opacity slider
- **Large live preview** with checkerboard transparency support
- **Real-time conversion** between HEX, RGB, RGBA, and HSL (editable — all formats sync)
- **One-click copy** for every format with a success toast
- **Header search** — paste any color code and press Enter to load it
- **Recent colors** (last 20) and **favorites**

### Live App & Web Preview
- **Mobile app preview** in a phone frame and **web preview** in a browser frame
- Switch between 9 categories: general, food, e-commerce, salon, fitness, travel, finance, education, healthcare
- Your selected color becomes the brand theme across every screen

### Color Tools
- **Shades** — tints and shades of the current color
- **Harmonies** — complementary, analogous, triadic and more
- **Contrast** checker for text/background readability
- **Eyedropper** and **color name** lookup
- **Extra formats** — HSV, CMYK, LAB, LCH, OKLCH, Flutter, Android

### Palettes & Library
- Save named **palettes** and **designs** to your library
- **Export** palettes as CSS variables, Tailwind config, SCSS, or JSON

### Accounts & Cloud Sync
- Optional **Google sign-in** (Firebase Auth)
- Favorites, recents, palettes, designs and settings sync through Firestore
- Tools, eyedropper, color names and extra formats are sign-in only; toggle in [`src/lib/features.ts`](src/lib/features.ts)
- Signed-out use works fully offline via LocalStorage

### Design & UX
- Light/dark/system **theme** setting
- Landing hero for signed-out visitors
- Glassmorphism panels, animated color-reactive background, Framer Motion transitions
- Responsive: full-viewport dashboard on desktop, stacked layout with bottom nav on mobile

### Accessibility
- Keyboard navigation on sliders (Arrow keys, Shift + Arrow for larger steps)
- ARIA labels and live regions, visible focus rings
- Automatic readable text on colored surfaces; reduced-motion respected

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| State | [Zustand](https://zustand.docs.pmnd.rs) with persist middleware |
| Backend (optional) | [Firebase](https://firebase.google.com) Auth + Firestore |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Color math | [chroma.js](https://gka.github.io/chroma.js/) |
| Icons | [Lucide React](https://lucide.dev) |

---

## Project Structure

```
src/
├── app/                    # App Router (layout, page, globals, icon)
├── components/
│   ├── HexagroundApp.tsx   # Top-level app composition
│   ├── Brand/              # Logo
│   ├── Header/             # Header, account menu, favorite button
│   ├── Landing/            # Hero and feature cards
│   ├── Layout/             # Footer, mobile nav and color bar
│   ├── ColorPicker/        # Saturation area, hue & opacity sliders
│   ├── ColorPreview/       # Swatch, format inputs, copy buttons
│   ├── ColorSearchBar/     # Header color code search
│   ├── CopyButton/         # Copy action + toast
│   ├── MobilePreview/      # Phone-frame app preview and screens
│   ├── WebPreview/         # Browser-frame web preview and screens
│   ├── UIPreview/          # Basic component preview
│   ├── Tools/              # Shades, harmonies, contrast
│   ├── Palettes/           # Palettes modal
│   ├── Library/            # Saved palettes and designs
│   ├── RecentColors/       # Recent color chips
│   ├── FavoriteColors/     # Saved color list
│   ├── Settings/           # Settings modal
│   ├── ThemeToggle/        # Light/dark toggle
│   └── ui/                 # Shared UI (GlassPanel, EmptyState, Reveal)
├── hooks/                  # useApplyTheme, useCloudSync, useDebouncedColor, useSlider, ...
├── store/                  # Zustand stores (color, auth, palettes, designs, settings, ...)
├── utils/                  # Color math, formats, harmonies, shades, export, storage
├── types/                  # TypeScript interfaces
└── lib/                    # env, firebase, cloudSync, features, storage migration, cn
firestore.rules             # Per-user Firestore security rules
public/                     # Logo and app icon SVGs
```

---

## Getting Started

### Prerequisites

- Node.js 18.18 or later (Node 20+ recommended)
- npm

### Install

```bash
git clone <your-repo-url>
cd hexaground
npm install
```

### Development

Loads [`.env.development`](.env.development) automatically:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) (Next.js picks the next free port if 3000 is taken).

If you hit stale cache or webpack errors, start fresh:

```bash
npm run dev:clean
```

### Production

Loads [`.env.production`](.env.production) during build:

```bash
npm run build
npm run start
```

---

## Environment Variables

Copy [`.env.example`](.env.example) to `.env.local` for personal overrides that won't be committed.

For local development and production builds, Next.js also reads `.env.development` and `.env.production` from your machine — these files are **not committed** to git. Create them from `.env.example` if needed:

```bash
cp .env.example .env.development
cp .env.example .env.production
# Then edit values for each environment
```

| Variable | Description | Dev default | Prod default |
|----------|-------------|-------------|--------------|
| `NEXT_PUBLIC_APP_NAME` | App display name | Hexaground | Hexaground |
| `NEXT_PUBLIC_APP_ENV` | Environment label | development | production |
| `NEXT_PUBLIC_APP_URL` | Public site URL | http://localhost:3000 | https://hexaground.app |
| `NEXT_PUBLIC_STORAGE_PREFIX` | LocalStorage key prefix | hexaground-dev | hexaground |
| `NEXT_PUBLIC_ENABLE_DEBUG` | Reserved for future dev tooling | false | false |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase web API key | — | — |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | — | — |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | — | — |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | — | — |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase sender ID | — | — |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | — | — |

Firebase values come from the Firebase console (Project settings → Your apps). Enable Google sign-in under Authentication and deploy [`firestore.rules`](firestore.rules), which restrict each user to their own `users/{uid}` data.

**How Next.js loads env files:**

| Command | Env files loaded |
|---------|------------------|
| `npm run dev` | `.env.development` + `.env.local` |
| `npm run build` / `npm run start` | `.env.production` + `.env.local` |

LocalStorage keys are prefixed per environment so dev and prod data never clash on the same origin.

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the development server |
| `npm run dev:clean` | Clear `.next` cache and start dev server |
| `npm run build` | Create an optimized production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |
| `npm run clean` | Remove the `.next` build cache |

---

## Architecture Notes

**State management** — Color is stored internally as HSL + opacity. Zustand selector hooks and `useShallow` prevent unnecessary re-renders. Colors, palettes, designs and settings persist to LocalStorage; when signed in, `useCloudSync` mirrors them to Firestore. The active picker state resets on reload.

**Color conversions** — All format parsing and output goes through `chroma.js` utilities in `src/utils/color.ts`. The header search uses `parseAnyColorInput` to auto-detect HEX, RGB/RGBA, and HSL strings.

**Layout** — On desktop (`lg+`), the app uses a two-column full-viewport grid: Color Playground on the left, UI Preview + Recent + Favorites on the right. The page body does not scroll; only internal panels (e.g. favorites list, recent chips) scroll when content overflows.

### Responsive breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| **Mobile** | < 640px | Single column, page scrolls, compact header |
| **Small** | 640px – 767px | Horizontal header, single column, page scrolls |
| **Tablet (`md`)** | 768px – 1023px | Two-column dashboard, viewport locked, internal panel scroll |
| **Desktop (`lg+`)** | ≥ 1024px | Wider two-column ratio, full viewport, no page scroll |

**Performance** — Recent color writes are debounced (~150 ms) during picker drag. Slider interactions use `requestAnimationFrame` throttling. Static sub-components are memoized where appropriate.

---

## Browser Support

Works in all modern browsers that support:
- CSS `backdrop-filter`
- `navigator.clipboard`
- LocalStorage
- ES2020+

---

## License

Private project. All rights reserved.
