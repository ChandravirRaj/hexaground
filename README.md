# Hexelly

**Hexelly** is a premium, client-side color playground for exploring, converting, and saving colors. Built as a single-page application with a clean Apple-inspired UI, it feels like a polished design tool — fast, minimal, and fully responsive.

No backend required. All data persists in the browser via LocalStorage.

---

## Features

### Color Playground
- **Interactive picker** — 2D saturation/lightness area, hue slider, and opacity slider
- **Large live preview** with checkerboard transparency support
- **Real-time conversion** between HEX, RGB, RGBA, and HSL
- **Editable format fields** — change any value and all others sync automatically
- **One-click copy** for every format with a success toast

### Search & Discovery
- **Header search bar** — paste or type any color code (HEX, RGB, RGBA, HSL) and press Enter to load it instantly

### Persistence
- **Recent colors** — last 20 picks, deduplicated, most recent first
- **Favorites** — save, copy, and remove colors; survives page reloads

### Live UI Preview
See how your color looks on real UI elements: button, card, input, and badge — updated in real time.

### Design & UX
- Light, glassmorphism-inspired panels with soft shadows
- Animated page background that transitions with the selected color
- Full-viewport dashboard layout on desktop (no page scroll)
- Mobile-friendly stacked layout with scroll where needed
- Subtle Framer Motion animations throughout

### Accessibility
- Keyboard navigation on all sliders (Arrow keys, Shift + Arrow for larger steps)
- ARIA labels and live regions for screen readers
- High-contrast text with automatic readability on colored surfaces
- Visible focus rings on all interactive elements

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| State | [Zustand](https://zustand.docs.pmnd.rs) with persist middleware |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Color math | [chroma.js](https://gka.github.io/chroma.js/) |
| Icons | [Lucide React](https://lucide.dev) |

---

## Project Structure

```
src/
├── app/                    # Next.js App Router (layout, page, globals)
├── components/
│   ├── ColorPicker/        # Saturation area, hue & opacity sliders
│   ├── ColorPreview/       # Swatch, format inputs, copy buttons
│   ├── ColorSearchBar/     # Header color code search
│   ├── CopyButton/         # Copy action + toast notification
│   ├── FavoriteColors/     # Saved color list
│   ├── RecentColors/       # Recent color chips
│   ├── UIPreview/          # Live component preview
│   └── ui/                 # Shared UI (GlassPanel)
├── hooks/                  # useDebouncedColor, useCopyToClipboard, useSlider
├── store/                  # Zustand stores (color state, toast)
├── utils/                  # Color conversions, storage helpers
├── types/                  # TypeScript interfaces
└── lib/                    # env config, cn utility
```

---

## Getting Started

### Prerequisites

- Node.js 18.18 or later (Node 20+ recommended)
- npm

### Install

```bash
git clone <your-repo-url>
cd hexelly
npm install
```

### Development

Loads [`.env.development`](.env.development) automatically:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

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
| `NEXT_PUBLIC_APP_NAME` | App display name | Hexelly | Hexelly |
| `NEXT_PUBLIC_APP_ENV` | Environment label | development | production |
| `NEXT_PUBLIC_APP_URL` | Public site URL | http://localhost:3000 | https://hexelly.app |
| `NEXT_PUBLIC_STORAGE_PREFIX` | LocalStorage key prefix | hexelly-dev | hexelly |
| `NEXT_PUBLIC_ENABLE_DEBUG` | Reserved for future dev tooling | false | false |

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

**State management** — Color is stored internally as HSL + opacity. Zustand selector hooks and `useShallow` prevent unnecessary re-renders. Only recent colors and favorites are persisted to LocalStorage; the active picker state resets on reload.

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
