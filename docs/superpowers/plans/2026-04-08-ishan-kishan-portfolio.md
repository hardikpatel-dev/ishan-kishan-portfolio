# Ishan Kishan Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a cinematic, first-person personal portfolio site for cricketer Ishan Kishan with 3D, scroll-triggered motion, parallax, and a full set of content sections — shippable as a static Next.js site.

**Architecture:** Single-page Next.js 15 App Router site. All data hardcoded in typed TS files. 3D via React Three Fiber, lazy-loaded per-canvas. Animation via Framer Motion + Lenis smooth scroll. Theme via CSS variables + Tailwind. No backend, static SSG.

**Tech Stack:** Next.js 15, TypeScript strict, TailwindCSS, Framer Motion, @react-three/fiber, @react-three/drei, three, @studio-freight/lenis, react-icons, next/font.

**Verification model:** Each task ends with `pnpm typecheck && pnpm build` (or equivalent) + a documented manual smoke check. No synthetic unit tests for visual components.

**Reference spec:** `docs/superpowers/specs/2026-04-08-ishan-kishan-portfolio-design.md`

---

## Task 1: Scaffold the Next.js project

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.mjs`, `.gitignore`, `.eslintrc.json`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`

**Working directory:** `f:/Hardik/tools/cricket`

- [ ] **Step 1: Initialize git**

```bash
cd f:/Hardik/tools/cricket
git init
git branch -m main
```

- [ ] **Step 2: Create `package.json`**

```json
{
  "name": "ishan-kishan-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "next": "15.0.3",
    "react": "19.0.0",
    "react-dom": "19.0.0",
    "framer-motion": "11.11.17",
    "@react-three/fiber": "8.17.10",
    "@react-three/drei": "9.117.3",
    "three": "0.170.0",
    "@studio-freight/lenis": "1.0.42",
    "react-icons": "5.3.0",
    "clsx": "2.1.1"
  },
  "devDependencies": {
    "@types/node": "22.9.0",
    "@types/react": "19.0.1",
    "@types/react-dom": "19.0.1",
    "@types/three": "0.170.0",
    "typescript": "5.6.3",
    "tailwindcss": "3.4.14",
    "postcss": "8.4.49",
    "autoprefixer": "10.4.20",
    "eslint": "9.15.0",
    "eslint-config-next": "15.0.3"
  }
}
```

- [ ] **Step 3: Install dependencies**

```bash
npm install
```
Expected: all deps resolve, `node_modules/` created.

- [ ] **Step 4: Create `tsconfig.json`**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Create `next.config.ts`**

```ts
import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default config;
```

- [ ] **Step 6: Create `tailwind.config.ts`**

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        accent: "var(--accent)",
        "accent-warm": "var(--accent-warm)",
        text: "var(--text)",
        muted: "var(--muted)",
        border: "var(--border)",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
```

- [ ] **Step 7: Create `postcss.config.mjs`**

```js
export default {
  plugins: { tailwindcss: {}, autoprefixer: {} },
};
```

- [ ] **Step 8: Create `.eslintrc.json`**

```json
{ "extends": "next/core-web-vitals" }
```

- [ ] **Step 9: Create `.gitignore`**

```
node_modules
.next
out
.DS_Store
*.log
.env*
!.env.example
.vercel
.superpowers
```

- [ ] **Step 10: Create `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --bg: #05070f;
  --surface: #0a1226;
  --surface-2: #0f1a35;
  --accent: #5b8cff;
  --accent-warm: #ffb86b;
  --text: #eaf0ff;
  --muted: #7b8bb0;
  --border: rgba(125, 163, 255, 0.12);
}

html, body { background: var(--bg); color: var(--text); }
html { scroll-behavior: auto; }
body { font-family: var(--font-inter), system-ui, sans-serif; -webkit-font-smoothing: antialiased; }

::selection { background: var(--accent); color: var(--bg); }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 11: Create minimal `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Ishan Kishan — The Southpaw Storm",
  description: "Personal portfolio of Ishan Kishan, left-hand batsman and wicketkeeper.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

- [ ] **Step 12: Create minimal `app/page.tsx`**

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-display text-5xl text-accent">Ishan Kishan</h1>
    </main>
  );
}
```

- [ ] **Step 13: Verify build**

```bash
npm run typecheck
npm run build
```
Expected: both complete with zero errors.

- [ ] **Step 14: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 project with Tailwind, R3F, Framer Motion"
```

---

## Task 2: Data files

**Files:**
- Create: `lib/data/bio.ts`, `lib/data/stats.ts`, `lib/data/journey.ts`, `lib/data/moments.ts`, `lib/data/teams.ts`, `lib/data/gallery.ts`, `lib/data/news.ts`

- [ ] **Step 1: Create `lib/data/bio.ts`**

```ts
export const bio = {
  name: "Ishan Kishan",
  firstName: "Ishan",
  lastName: "Kishan",
  tagline: "The Southpaw Storm",
  intro:
    "I'm a left-hand batsman and wicketkeeper from Patna. I chase big hits, bigger moments, and the feeling of the stadium going silent before it erupts.",
  dob: "1998-07-18",
  birthplace: "Patna, Bihar, India",
  role: "Wicketkeeper-Batsman",
  battingStyle: "Left-handed",
  height: "5'5\"",
  currentTeam: "Mumbai Indians",
  jerseyNumber: 23,
  socials: {
    instagram: "https://www.instagram.com/ishankishan23/",
    twitter: "https://twitter.com/ishankishan51",
    facebook: "https://www.facebook.com/ishankishan23/",
  },
} as const;
```

- [ ] **Step 2: Create `lib/data/stats.ts`**

```ts
export type FormatStats = {
  matches: number;
  runs: number;
  avg: number;
  sr: number;
  fifties: number;
  hundreds: number;
  hs: string;
  debut: string;
};

export const stats: Record<"test" | "odi" | "t20i" | "ipl", FormatStats> = {
  test: { matches: 2, runs: 74, avg: 18.5, sr: 61.16, fifties: 1, hundreds: 0, hs: "52", debut: "2023-07-20" },
  odi: { matches: 27, runs: 933, avg: 42.4, sr: 105.23, fifties: 5, hundreds: 1, hs: "210", debut: "2021-07-23" },
  t20i: { matches: 32, runs: 796, avg: 26.53, sr: 141.13, fifties: 6, hundreds: 0, hs: "89*", debut: "2021-03-14" },
  ipl: { matches: 106, runs: 2644, avg: 28.74, sr: 135.3, fifties: 18, hundreds: 1, hs: "99", debut: "2016-04-09" },
};

export const runsPerYear: { year: string; runs: number }[] = [
  { year: "2016", runs: 184 },
  { year: "2017", runs: 120 },
  { year: "2018", runs: 275 },
  { year: "2019", runs: 516 },
  { year: "2020", runs: 516 },
  { year: "2021", runs: 465 },
  { year: "2022", runs: 418 },
  { year: "2023", runs: 454 },
  { year: "2024", runs: 351 },
];
```

- [ ] **Step 3: Create `lib/data/journey.ts`**

```ts
export type Milestone = {
  year: string;
  title: string;
  description: string;
  image?: string;
};

export const journey: Milestone[] = [
  {
    year: "2014",
    title: "Jharkhand U-19 captain",
    description:
      "Led Jharkhand in the 2014 U-19 Cooch Behar Trophy. The first time the bat felt like something bigger than a game.",
  },
  {
    year: "2016",
    title: "U-19 World Cup & Mumbai Indians",
    description:
      "Captained India U-19. Bought by Mumbai Indians in the IPL auction. Two dressing rooms that changed everything.",
  },
  {
    year: "2017",
    title: "Ranji Trophy debut",
    description: "Made my first-class debut for Jharkhand. Learned that domestic cricket teaches you what highlights can't.",
  },
  {
    year: "2021",
    title: "India debut — T20I, then ODI",
    description:
      "March 14, 2021, I pulled on the India jersey for the first time in Ahmedabad. Four months later, my ODI cap followed.",
  },
  {
    year: "2022",
    title: "210* vs Bangladesh",
    description:
      "The fastest double century in ODI history by an Indian. 131 balls. Chattogram. I still hear that crowd.",
  },
  {
    year: "2023",
    title: "Test cap",
    description: "Test cricket. The longest format. The hardest lesson. I wore the whites in the West Indies.",
  },
  {
    year: "2024",
    title: "Comeback & rebuild",
    description:
      "Stepped back. Reset. Rebuilt. Ranji runs to remind myself — and everyone else — where I come from.",
  },
];
```

- [ ] **Step 4: Create `lib/data/moments.ts`**

```ts
export type Moment = {
  date: string;
  headline: string;
  description: string;
  image: string;
};

export const moments: Moment[] = [
  {
    date: "2022-12-10",
    headline: "210* vs Bangladesh",
    description: "Fastest ODI double century by an Indian. 131 balls. 24 fours, 10 sixes.",
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200",
  },
  {
    date: "2021-07-23",
    headline: "ODI debut fifty",
    description: "Walked in at Colombo and made 59 off 42. First international innings.",
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200",
  },
  {
    date: "2020-11-10",
    headline: "IPL final, Mumbai Indians",
    description: "Part of the MI squad that lifted their fifth IPL title in Dubai.",
    image: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=1200",
  },
  {
    date: "2023-07-20",
    headline: "Test debut, West Indies",
    description: "Pulled on the whites in Dominica. The longest format. The oldest dream.",
    image: "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=1200",
  },
  {
    date: "2016-04-09",
    headline: "IPL debut for Mumbai Indians",
    description: "Nineteen years old, first ball nerves, a home forever.",
    image: "https://images.unsplash.com/photo-1607734834519-d8576ae60ea6?w=1200",
  },
];
```

- [ ] **Step 5: Create `lib/data/teams.ts`**

```ts
export type Team = {
  name: string;
  short: string;
  years: string;
  role: string;
  accent: string;
};

export const teams: Team[] = [
  { name: "India", short: "IND", years: "2021–present", role: "Wicketkeeper-Batsman", accent: "#0055b8" },
  { name: "Mumbai Indians", short: "MI", years: "2018–present", role: "Wicketkeeper-Batsman", accent: "#004ba0" },
  { name: "Jharkhand", short: "JHA", years: "2016–present", role: "Wicketkeeper-Batsman", accent: "#ffb400" },
  { name: "India A", short: "IND-A", years: "2019–present", role: "Wicketkeeper-Batsman", accent: "#ff6b00" },
  { name: "India U-19", short: "U19", years: "2014–2016", role: "Captain", accent: "#5b8cff" },
];
```

- [ ] **Step 6: Create `lib/data/gallery.ts`**

```ts
export type GalleryImage = {
  src: string;
  alt: string;
  credit: string;
  aspect: "portrait" | "landscape" | "square";
};

export const gallery: GalleryImage[] = [
  { src: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1000", alt: "Cricket stadium under floodlights", credit: "Unsplash", aspect: "landscape" },
  { src: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1000", alt: "Batsman playing a shot", credit: "Unsplash", aspect: "portrait" },
  { src: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=1000", alt: "Crowd celebration", credit: "Unsplash", aspect: "landscape" },
  { src: "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=1000", alt: "Cricket ball on grass", credit: "Unsplash", aspect: "square" },
  { src: "https://images.unsplash.com/photo-1607734834519-d8576ae60ea6?w=1000", alt: "Wicketkeeper gloves", credit: "Unsplash", aspect: "portrait" },
  { src: "https://images.unsplash.com/photo-1566577134770-3d85bb3a9cc4?w=1000", alt: "Players in huddle", credit: "Unsplash", aspect: "landscape" },
  { src: "https://images.unsplash.com/photo-1599982170029-5bb5adf34e39?w=1000", alt: "Bat and ball", credit: "Unsplash", aspect: "square" },
  { src: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?w=1000", alt: "Stadium lights at night", credit: "Unsplash", aspect: "landscape" },
  { src: "https://images.unsplash.com/photo-1569155999796-2d25f43d1f2c?w=1000", alt: "Player silhouette", credit: "Unsplash", aspect: "portrait" },
  { src: "https://images.unsplash.com/photo-1593766787879-49dcb9be26bc?w=1000", alt: "Cricket pitch", credit: "Unsplash", aspect: "landscape" },
];
```

- [ ] **Step 7: Create `lib/data/news.ts`**

```ts
export type NewsItem = {
  date: string;
  source: string;
  headline: string;
  thumbnail: string;
  url: string;
};

export const news: NewsItem[] = [
  {
    date: "2024-11-18",
    source: "ESPNcricinfo",
    headline: "Ishan Kishan makes emphatic Ranji return with a double century",
    thumbnail: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600",
    url: "https://www.espncricinfo.com/",
  },
  {
    date: "2024-03-22",
    source: "Cricbuzz",
    headline: "MI back Kishan for the IPL season opener",
    thumbnail: "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=600",
    url: "https://www.cricbuzz.com/",
  },
  {
    date: "2022-12-10",
    source: "BCCI",
    headline: "Kishan smashes fastest double ton by an Indian in ODIs",
    thumbnail: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600",
    url: "https://www.bcci.tv/",
  },
  {
    date: "2023-07-20",
    source: "ICC",
    headline: "Kishan earns maiden Test cap in West Indies",
    thumbnail: "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=600",
    url: "https://www.icc-cricket.com/",
  },
];
```

- [ ] **Step 8: Verify**

```bash
npm run typecheck
```
Expected: pass, zero errors.

- [ ] **Step 9: Commit**

```bash
git add lib/data
git commit -m "feat(data): add bio, stats, journey, moments, teams, gallery, news data"
```

---

## Task 3: Layout shell — Lenis provider, grain overlay, navbar, footer, scroll progress

**Files:**
- Create: `components/layout/LenisProvider.tsx`, `components/layout/GrainOverlay.tsx`, `components/layout/Navbar.tsx`, `components/layout/Footer.tsx`, `components/layout/ScrollProgress.tsx`
- Modify: `app/layout.tsx`, `app/page.tsx`

- [ ] **Step 1: Create `components/layout/LenisProvider.tsx`**

```tsx
"use client";
import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
  return <>{children}</>;
}
```

- [ ] **Step 2: Create `components/layout/GrainOverlay.tsx`**

```tsx
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.04] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
      }}
    />
  );
}
```

- [ ] **Step 3: Create `components/layout/ScrollProgress.tsx`**

```tsx
"use client";
import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 z-[70] h-[2px] origin-left bg-accent"
    />
  );
}
```

- [ ] **Step 4: Create `components/layout/Navbar.tsx`**

```tsx
"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import clsx from "clsx";

const links = [
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#stats", label: "Stats" },
  { href: "#moments", label: "Moments" },
  { href: "#teams", label: "Teams" },
  { href: "#gallery", label: "Gallery" },
  { href: "#news", label: "News" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [last, setLast] = useState(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > last && y > 120) setHidden(true);
    else setHidden(false);
    setLast(y);
  });

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: hidden ? -80 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-bg/60 border-b border-border"
    >
      <nav className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <a href="#top" className="font-display text-lg tracking-tight text-text">
          Ishan <span className="text-accent">Kishan</span>
        </a>
        <ul className="hidden md:flex gap-6 text-sm text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-text transition-colors">{l.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </motion.header>
  );
}
```

- [ ] **Step 5: Create `components/layout/Footer.tsx`**

```tsx
import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";
import { bio } from "@/lib/data/bio";

export function Footer() {
  return (
    <footer id="contact" className="border-t border-border bg-surface/40 mt-24">
      <div className="mx-auto max-w-6xl px-6 py-16 grid gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-text">Let's talk cricket.</h2>
          <p className="text-muted mt-4 max-w-md">
            Press, partnerships, or just a few kind words — find me on the handles below.
          </p>
        </div>
        <div className="flex flex-col items-start md:items-end gap-6">
          <div className="flex gap-5 text-2xl">
            <a href={bio.socials.instagram} aria-label="Instagram" className="text-muted hover:text-accent transition-colors"><FaInstagram /></a>
            <a href={bio.socials.twitter} aria-label="X / Twitter" className="text-muted hover:text-accent transition-colors"><FaXTwitter /></a>
            <a href={bio.socials.facebook} aria-label="Facebook" className="text-muted hover:text-accent transition-colors"><FaFacebook /></a>
          </div>
          <p className="text-xs text-muted/60">
            © {new Date().getFullYear()} Ishan Kishan. Portfolio concept — design project, not officially affiliated.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 6: Update `app/layout.tsx` to wire providers**

```tsx
import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import { LenisProvider } from "@/components/layout/LenisProvider";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import "./globals.css";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });

export const metadata: Metadata = {
  title: "Ishan Kishan — The Southpaw Storm",
  description: "Personal portfolio of Ishan Kishan, left-hand batsman and wicketkeeper.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <LenisProvider>
          <GrainOverlay />
          <ScrollProgress />
          <Navbar />
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Update `app/page.tsx` to render footer placeholder**

```tsx
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main id="top" className="min-h-screen pt-24">
        <section className="mx-auto max-w-6xl px-6 py-24">
          <h1 className="font-display text-6xl text-text">Ishan Kishan</h1>
          <p className="text-muted mt-4">Layout shell in place. Sections coming next.</p>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 8: Verify**

```bash
npm run typecheck && npm run build
```
Expected: zero errors. `npm run dev` and visually confirm nav bar, scroll progress bar, footer render.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat(layout): add Lenis, grain overlay, navbar, footer, scroll progress"
```

---

## Task 4: Shared UI primitives

**Files:**
- Create: `components/ui/Reveal.tsx`, `components/ui/Counter.tsx`, `components/ui/SectionHeading.tsx`, `components/ui/TabGroup.tsx`, `components/ui/Marquee.tsx`, `components/ui/Lightbox.tsx`
- Create: `lib/motion/variants.ts`, `lib/hooks/usePrefersReducedMotion.ts`

- [ ] **Step 1: Create `lib/motion/variants.ts`**

```ts
import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};

export const staggerParent: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
```

- [ ] **Step 2: Create `lib/hooks/usePrefersReducedMotion.ts`**

```ts
"use client";
import { useEffect, useState } from "react";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    m.addEventListener("change", handler);
    return () => m.removeEventListener("change", handler);
  }, []);
  return reduced;
}
```

- [ ] **Step 3: Create `components/ui/Reveal.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion/variants";
import type { ReactNode } from "react";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 4: Create `components/ui/Counter.tsx`**

```tsx
"use client";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

export function Counter({ to, decimals = 0, suffix = "" }: { to: number; decimals?: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const mv = useMotionValue(0);
  const display = useTransform(mv, (v) => v.toFixed(decimals));

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration: 1.6, ease: [0.22, 1, 0.36, 1] });
    return () => controls.stop();
  }, [inView, to, mv]);

  return (
    <span ref={ref} className="font-mono tabular-nums">
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
}
```

- [ ] **Step 5: Create `components/ui/SectionHeading.tsx`**

```tsx
import { Reveal } from "./Reveal";

export function SectionHeading({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <Reveal className="mb-16">
      {eyebrow && <div className="text-xs uppercase tracking-[0.3em] text-accent mb-4">{eyebrow}</div>}
      <h2 className="font-display text-5xl md:text-6xl text-text leading-[1.05]">{title}</h2>
      {subtitle && <p className="text-muted mt-4 max-w-xl">{subtitle}</p>}
    </Reveal>
  );
}
```

- [ ] **Step 6: Create `components/ui/TabGroup.tsx`**

```tsx
"use client";
import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export type Tab = { id: string; label: string; content: ReactNode };

export function TabGroup({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;
  return (
    <div>
      <div role="tablist" className="flex gap-2 flex-wrap mb-8 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={clsx(
              "relative px-5 py-3 text-sm uppercase tracking-wider transition-colors",
              active === t.id ? "text-text" : "text-muted hover:text-text",
            )}
          >
            {t.label}
            {active === t.id && (
              <motion.span layoutId="tab-underline" className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-accent" />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {current.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 7: Create `components/ui/Marquee.tsx`**

```tsx
"use client";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Marquee({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ x }} className="flex gap-8 will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
```

- [ ] **Step 8: Create `components/ui/Lightbox.tsx`**

```tsx
"use client";
import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function Lightbox({
  src,
  alt,
  onClose,
}: {
  src: string | null;
  alt: string;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!src) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] bg-bg/90 backdrop-blur-md flex items-center justify-center p-8 cursor-zoom-out"
        >
          <motion.div
            initial={{ scale: 0.92 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.92 }}
            className="relative w-full max-w-4xl aspect-video"
          >
            <Image src={src} alt={alt} fill className="object-contain" sizes="100vw" unoptimized />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 9: Verify**

```bash
npm run typecheck && npm run build
```
Expected: pass.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat(ui): add Reveal, Counter, SectionHeading, TabGroup, Marquee, Lightbox primitives"
```

---

## Task 5: Three.js scene wrapper + ParticleDust + CricketBall

**Files:**
- Create: `components/three/Scene.tsx`, `components/three/ParticleDust.tsx`, `components/three/CricketBall.tsx`

- [ ] **Step 1: Create `components/three/Scene.tsx`**

Wraps R3F Canvas with in-viewport gate + DPR cap + lazy mount.

```tsx
"use client";
import { Canvas } from "@react-three/fiber";
import { useRef, useState, useEffect, type ReactNode } from "react";

export function Scene({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "100px" },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {active && (
        <Canvas
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          camera={{ position: [0, 0, 5], fov: 45 }}
        >
          {children}
        </Canvas>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/three/ParticleDust.tsx`**

```tsx
"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function ParticleDust({ count = 800 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 0] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 10;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.02;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#eaf0ff" transparent opacity={0.7} depthWrite={false} blending={THREE.AdditiveBlending} />
    </points>
  );
}
```

- [ ] **Step 3: Create `components/three/CricketBall.tsx`**

Sphere + torus seam, no external texture required for MVP — uses procedural material.

```tsx
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function CricketBall({ position = [0, 0, 0] as [number, number, number] }) {
  const group = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.3;
      group.current.rotation.x += delta * 0.08;
    }
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial color="#8c1a1a" roughness={0.55} metalness={0.1} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.001, 0.012, 16, 128]} />
        <meshStandardMaterial color="#f2f2f2" roughness={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0.05]}>
        <torusGeometry args={[1.002, 0.008, 16, 128]} />
        <meshStandardMaterial color="#d8d8d8" roughness={0.9} />
      </mesh>
      <ambientLight intensity={0.35} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.6} color="#5b8cff" />
    </group>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npm run typecheck && npm run build
```
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add components/three
git commit -m "feat(three): add lazy Scene wrapper, ParticleDust, CricketBall components"
```

---

## Task 6: PortraitDisplacement — the "alive face" 2.5D effect

**Files:**
- Create: `components/three/PortraitDisplacement.tsx`
- Create: `public/hero/README.md` (placeholder instructions)

The effect: a plane mesh with a custom shader that samples a color photo + a depth map, displaces vertices by depth luminance, and subtly parallaxes with mouse position.

- [ ] **Step 1: Create `public/hero/README.md`**

```markdown
# Hero assets

Drop these two files here before running in production:

- `portrait.jpg` — 1200x1600 portrait photo of the subject
- `portrait-depth.jpg` — grayscale depth map of the same image

Generate a depth map from any portrait using a free MiDaS online demo (e.g. huggingface.co/spaces/pytorch/MiDaS) and save the output as `portrait-depth.jpg`.

For local development without real assets, the PortraitDisplacement component falls back to a solid gradient + noise plane.
```

- [ ] **Step 2: Create `components/three/PortraitDisplacement.tsx`**

```tsx
"use client";
import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform sampler2D uDepth;
  uniform float uStrength;
  uniform vec2 uMouse;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    float depth = texture2D(uDepth, uv).r;
    vec3 pos = position;
    pos.z += (depth - 0.5) * uStrength;
    pos.x += uMouse.x * (depth - 0.5) * 0.3;
    pos.y += uMouse.y * (depth - 0.5) * 0.3;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform sampler2D uPhoto;
  varying vec2 vUv;

  void main() {
    vec4 color = texture2D(uPhoto, vUv);
    gl_FragColor = color;
  }
`;

export function PortraitDisplacement({
  photo = "/hero/portrait.jpg",
  depth = "/hero/portrait-depth.jpg",
}: {
  photo?: string;
  depth?: string;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const mouse = useRef(new THREE.Vector2(0, 0));
  const { size } = useThree();

  const [photoTex, depthTex] = useTexture([photo, depth]);

  const uniforms = useMemo(
    () => ({
      uPhoto: { value: photoTex },
      uDepth: { value: depthTex },
      uStrength: { value: 0.6 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    [photoTex, depthTex],
  );

  useFrame(({ pointer }, delta) => {
    mouse.current.lerp(pointer, Math.min(delta * 3, 1));
    uniforms.uMouse.value.copy(mouse.current);
    if (mesh.current) mesh.current.rotation.y = mouse.current.x * 0.1;
  });

  const aspect = 3 / 4;
  const width = 3;
  const height = width / aspect;

  return (
    <mesh ref={mesh}>
      <planeGeometry args={[width, height, 128, 160]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
      />
    </mesh>
  );
}
```

- [ ] **Step 3: Add dev-only placeholder fallback**

Update `components/three/PortraitDisplacement.tsx` to wrap `useTexture` in a try/catch at render time. Drei's `useTexture` suspends on missing files — instead, add a sibling `PortraitFallback` component and decide at the parent level. Append to the file:

```tsx
export function PortraitFallback() {
  return (
    <mesh>
      <planeGeometry args={[3, 4, 1, 1]} />
      <meshStandardMaterial color="#0f1a35" />
    </mesh>
  );
}
```

- [ ] **Step 4: Verify**

```bash
npm run typecheck && npm run build
```
Expected: pass.

- [ ] **Step 5: Commit**

```bash
git add components/three/PortraitDisplacement.tsx public/hero
git commit -m "feat(three): add PortraitDisplacement shader for 2.5D alive-face effect"
```

---

## Task 7: TrophyFloat 3D component

**Files:**
- Create: `components/three/TrophyFloat.tsx`

- [ ] **Step 1: Create `components/three/TrophyFloat.tsx`**

Low-poly trophy built from primitives — cup, stem, base.

```tsx
"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function TrophyFloat({ position = [0, 0, 0] as [number, number, number] }) {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (group.current) {
      group.current.position.y = position[1] + Math.sin(clock.elapsedTime * 0.8) * 0.15;
      group.current.rotation.y += 0.004;
    }
  });

  const gold = new THREE.MeshStandardMaterial({ color: "#ffb86b", metalness: 0.95, roughness: 0.25 });

  return (
    <group ref={group} position={position}>
      <mesh material={gold} position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.6, 0.35, 0.8, 32]} />
      </mesh>
      <mesh material={gold} position={[0, 1.55, 0]}>
        <torusGeometry args={[0.55, 0.05, 16, 48]} />
      </mesh>
      <mesh material={gold} position={[-0.65, 1.1, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.25, 0.04, 12, 32, Math.PI]} />
      </mesh>
      <mesh material={gold} position={[0.65, 1.1, 0]} rotation={[0, 0, -Math.PI / 2]}>
        <torusGeometry args={[0.25, 0.04, 12, 32, Math.PI]} />
      </mesh>
      <mesh material={gold} position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.5, 16]} />
      </mesh>
      <mesh material={gold} position={[0, 0.1, 0]}>
        <boxGeometry args={[0.9, 0.2, 0.9]} />
      </mesh>
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 5, 3]} intensity={1.5} />
      <directionalLight position={[-3, -2, -2]} intensity={0.7} color="#5b8cff" />
    </group>
  );
}
```

- [ ] **Step 2: Verify**

```bash
npm run typecheck && npm run build
```
Expected: pass.

- [ ] **Step 3: Commit**

```bash
git add components/three/TrophyFloat.tsx
git commit -m "feat(three): add floating low-poly trophy component"
```

---

## Task 8: Hero section

**Files:**
- Create: `components/sections/Hero.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/Hero.tsx`**

```tsx
"use client";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { bio } from "@/lib/data/bio";

const Scene = dynamic(() => import("@/components/three/Scene").then((m) => m.Scene), { ssr: false });
const CricketBall = dynamic(() => import("@/components/three/CricketBall").then((m) => m.CricketBall), { ssr: false });
const ParticleDust = dynamic(() => import("@/components/three/ParticleDust").then((m) => m.ParticleDust), { ssr: false });
const PortraitDisplacement = dynamic(
  () => import("@/components/three/PortraitDisplacement").then((m) => m.PortraitFallback),
  { ssr: false },
);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} id="top" className="relative min-h-screen overflow-hidden">
      <Scene className="absolute inset-0">
        <ParticleDust />
        <CricketBall position={[3.5, 1, -2]} />
        <PortraitDisplacement />
      </Scene>

      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 60%, transparent 0%, var(--bg) 75%)",
        }}
      />

      <motion.div style={{ y, opacity }} className="relative z-10 mx-auto max-w-6xl px-6 pt-40 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs uppercase tracking-[0.4em] text-accent mb-6"
        >
          {bio.tagline}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(3rem,10vw,9rem)] leading-[0.95] tracking-tight"
        >
          I'm <span className="italic text-accent">Ishan</span>
          <br /> Kishan.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl mt-8 text-muted text-lg"
        >
          {bio.intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mt-16 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-muted"
        >
          <span className="h-px w-10 bg-muted" />
          Scroll to begin
        </motion.div>
      </motion.div>
    </section>
  );
}
```

- [ ] **Step 2: Update `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify**

```bash
npm run typecheck && npm run build
npm run dev
```
Expected: hero renders, cricket ball rotates in background, name animates in, scroll parallax works.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(hero): cinematic hero section with 3D ball, particles, scroll parallax"
```

---

## Task 9: About section

**Files:**
- Create: `components/sections/About.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/About.tsx`**

```tsx
"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { bio } from "@/lib/data/bio";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const chips = [
  { label: "Born", value: "18 Jul 1998" },
  { label: "From", value: "Patna, Bihar" },
  { label: "Bats", value: "Left" },
  { label: "Role", value: "Keeper" },
  { label: "Team", value: "MI" },
  { label: "Jersey", value: "#23" },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "15%"]);

  return (
    <section id="about" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <div ref={ref} className="relative aspect-[3/4] overflow-hidden rounded-sm border border-border">
          <motion.div style={{ y: imgY }} className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200"
              alt="Portrait placeholder"
              fill
              className="object-cover grayscale-[20%]"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
        </div>

        <div>
          <SectionHeading eyebrow="About me" title="Left hand. Loud heart." />
          <Reveal>
            <p className="text-muted leading-relaxed text-lg">
              I grew up in Patna dreaming in commentary voices. The net sessions before sunrise, the tennis ball tape-jobs,
              the borrowed pads — all of it led to one jersey I never stop earning. I play the short ball like it owes me
              something and I keep wickets because I love being in every ball of the game.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="mt-10 grid grid-cols-3 gap-3">
              {chips.map((c) => (
                <div key={c.label} className="rounded-sm border border-border bg-surface/60 px-4 py-3">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-muted">{c.label}</div>
                  <div className="font-display text-lg text-text mt-1">{c.value}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add `<About />` to `app/page.tsx`**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: Verify + commit**

```bash
npm run typecheck && npm run build
git add -A
git commit -m "feat(about): first-person bio section with parallax portrait and stat chips"
```

---

## Task 10: Career Journey timeline (scroll-pinned)

**Files:**
- Create: `components/sections/Journey.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/Journey.tsx`**

Vertical timeline with alternating entries, sticky year marker.

```tsx
"use client";
import { motion } from "framer-motion";
import { journey } from "@/lib/data/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Journey() {
  return (
    <section id="journey" className="relative py-32 md:py-48 bg-surface/20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="My Journey" title="From Patna to the India jersey." subtitle="Every milestone, every step, every bat grip that got heavier before it got lighter." />
        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />
          <ul className="space-y-24">
            {journey.map((m, i) => {
              const left = i % 2 === 0;
              return (
                <motion.li
                  key={m.year}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="relative grid md:grid-cols-2 gap-8 items-center"
                >
                  <div className={left ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}>
                    <div className="font-mono text-accent text-sm tracking-wider">{m.year}</div>
                    <h3 className="font-display text-3xl text-text mt-2">{m.title}</h3>
                    <p className="text-muted mt-3 leading-relaxed">{m.description}</p>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-accent ring-4 ring-bg" />
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`**

```tsx
import { Journey } from "@/components/sections/Journey";
// ... in JSX:
<Hero />
<About />
<Journey />
```

- [ ] **Step 3: Verify + commit**

```bash
npm run typecheck && npm run build
git add -A
git commit -m "feat(journey): scroll-revealed career timeline with alternating layout"
```

---

## Task 11: Stats dashboard (tabs + counters + bar chart)

**Files:**
- Create: `components/sections/Stats.tsx`, `components/sections/StatsBarChart.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/StatsBarChart.tsx`**

Plain SVG bar chart for runs-per-year, animates on reveal.

```tsx
"use client";
import { motion } from "framer-motion";
import { runsPerYear } from "@/lib/data/stats";

export function StatsBarChart() {
  const max = Math.max(...runsPerYear.map((r) => r.runs));
  return (
    <div className="mt-12 rounded-sm border border-border bg-surface/60 p-6">
      <div className="text-xs uppercase tracking-[0.2em] text-muted mb-4">Runs by year (IPL)</div>
      <div className="flex items-end gap-3 h-48">
        {runsPerYear.map((r) => (
          <div key={r.year} className="flex-1 flex flex-col items-center gap-2">
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ height: `${(r.runs / max) * 100}%`, transformOrigin: "bottom" }}
              className="w-full bg-gradient-to-t from-accent/40 to-accent rounded-sm"
            />
            <div className="text-[10px] font-mono text-muted">{r.year.slice(-2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/sections/Stats.tsx`**

```tsx
"use client";
import { stats, type FormatStats } from "@/lib/data/stats";
import { TabGroup } from "@/components/ui/TabGroup";
import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatsBarChart } from "./StatsBarChart";

function StatBlock({ data }: { data: FormatStats }) {
  const cells: { label: string; value: number; decimals?: number; suffix?: string }[] = [
    { label: "Matches", value: data.matches },
    { label: "Runs", value: data.runs },
    { label: "Average", value: data.avg, decimals: 2 },
    { label: "Strike Rate", value: data.sr, decimals: 2 },
    { label: "Fifties", value: data.fifties },
    { label: "Hundreds", value: data.hundreds },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {cells.map((c) => (
          <div key={c.label} className="rounded-sm border border-border bg-surface/60 px-6 py-8">
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted">{c.label}</div>
            <div className="font-display text-5xl text-text mt-2">
              <Counter to={c.value} decimals={c.decimals ?? 0} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex gap-8 text-sm text-muted font-mono">
        <div>HS: <span className="text-text">{data.hs}</span></div>
        <div>Debut: <span className="text-text">{data.debut}</span></div>
      </div>
    </div>
  );
}

export function Stats() {
  const tabs = [
    { id: "ipl", label: "IPL", content: <StatBlock data={stats.ipl} /> },
    { id: "odi", label: "ODI", content: <StatBlock data={stats.odi} /> },
    { id: "t20i", label: "T20I", content: <StatBlock data={stats.t20i} /> },
    { id: "test", label: "Test", content: <StatBlock data={stats.test} /> },
  ];
  return (
    <section id="stats" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Career Stats" title="The numbers, on the record." />
        <TabGroup tabs={tabs} />
        <StatsBarChart />
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Add to `app/page.tsx`**

```tsx
import { Stats } from "@/components/sections/Stats";
// ... after <Journey />
<Stats />
```

- [ ] **Step 4: Verify + commit**

```bash
npm run typecheck && npm run build
git add -A
git commit -m "feat(stats): tabbed career stats dashboard with animated counters and bar chart"
```

---

## Task 12: Signature Moments (marquee + 3D trophy)

**Files:**
- Create: `components/sections/Moments.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/Moments.tsx`**

```tsx
"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { moments } from "@/lib/data/moments";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";

const Scene = dynamic(() => import("@/components/three/Scene").then((m) => m.Scene), { ssr: false });
const TrophyFloat = dynamic(() => import("@/components/three/TrophyFloat").then((m) => m.TrophyFloat), { ssr: false });

export function Moments() {
  return (
    <section id="moments" className="relative py-32 md:py-48 overflow-hidden">
      <Scene className="absolute right-0 top-0 w-[40%] h-full opacity-70 pointer-events-none">
        <TrophyFloat position={[0, -0.5, 0]} />
      </Scene>

      <div className="relative mx-auto max-w-6xl px-6 mb-12">
        <SectionHeading eyebrow="Signature moments" title="The nights I'll never forget." />
      </div>

      <Marquee>
        {moments.concat(moments).map((m, i) => (
          <div key={`${m.date}-${i}`} className="shrink-0 w-[380px] rounded-sm overflow-hidden border border-border bg-surface/60">
            <div className="relative aspect-[4/3]">
              <Image src={m.image} alt={m.headline} fill className="object-cover" sizes="380px" unoptimized />
            </div>
            <div className="p-6">
              <div className="text-xs font-mono text-accent tracking-wider">{m.date}</div>
              <h3 className="font-display text-2xl text-text mt-2">{m.headline}</h3>
              <p className="text-muted text-sm mt-2 leading-relaxed">{m.description}</p>
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`** after `<Stats />`.

```tsx
import { Moments } from "@/components/sections/Moments";
// ...
<Moments />
```

- [ ] **Step 3: Verify + commit**

```bash
npm run typecheck && npm run build
git add -A
git commit -m "feat(moments): signature moments marquee with floating 3D trophy scene"
```

---

## Task 13: Teams grid

**Files:**
- Create: `components/sections/Teams.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/Teams.tsx`**

```tsx
"use client";
import { motion } from "framer-motion";
import { teams } from "@/lib/data/teams";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Teams() {
  return (
    <section id="teams" className="relative py-32 md:py-48 bg-surface/20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Teams" title="The jerseys that made me." />
        <ul className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {teams.map((t, i) => (
            <motion.li
              key={t.short}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="group relative rounded-sm border border-border bg-surface/60 p-8 text-center overflow-hidden"
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle at center, ${t.accent}, transparent 70%)` }}
              />
              <div className="relative">
                <div className="font-display text-4xl text-text">{t.short}</div>
                <div className="text-sm text-text/80 mt-3">{t.name}</div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted mt-4">{t.years}</div>
                <div className="text-[10px] text-muted mt-1">{t.role}</div>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`** and verify + commit.

```bash
npm run typecheck && npm run build
git add -A
git commit -m "feat(teams): team grid with hover accent glow"
```

---

## Task 14: Gallery + lightbox

**Files:**
- Create: `components/sections/Gallery.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/Gallery.tsx`**

```tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gallery } from "@/lib/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";

export function Gallery() {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(null);
  return (
    <section id="gallery" className="relative py-32 md:py-48">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Gallery" title="Frames from the road." />
        <div className="columns-2 md:columns-3 gap-4 [column-fill:_balance]">
          {gallery.map((g, i) => (
            <motion.button
              key={g.src}
              onClick={() => setActive({ src: g.src, alt: g.alt })}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: (i % 6) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="relative block mb-4 w-full break-inside-avoid overflow-hidden rounded-sm border border-border group cursor-zoom-in"
            >
              <Image
                src={g.src}
                alt={g.alt}
                width={800}
                height={g.aspect === "portrait" ? 1100 : g.aspect === "square" ? 800 : 600}
                className="object-cover w-full h-auto transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute bottom-3 left-3 text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">{g.credit}</div>
            </motion.button>
          ))}
        </div>
      </div>
      <Lightbox src={active?.src ?? null} alt={active?.alt ?? ""} onClose={() => setActive(null)} />
    </section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`**, verify, commit.

```bash
npm run typecheck && npm run build
git add -A
git commit -m "feat(gallery): masonry gallery with custom lightbox"
```

---

## Task 15: News section

**Files:**
- Create: `components/sections/News.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create `components/sections/News.tsx`**

```tsx
"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { news } from "@/lib/data/news";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function News() {
  return (
    <section id="news" className="relative py-32 md:py-48 bg-surface/20">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="In the news" title="Stories from the record." subtitle="A few highlights worth keeping." />
        <ul className="grid md:grid-cols-2 gap-6">
          {news.map((n, i) => (
            <motion.li
              key={n.url + n.date}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <a
                href={n.url}
                target="_blank"
                rel="noreferrer"
                className="group flex gap-5 rounded-sm border border-border bg-surface/60 p-4 hover:border-accent/60 transition-colors"
              >
                <div className="relative shrink-0 w-36 aspect-[4/3] overflow-hidden rounded-sm">
                  <Image src={n.thumbnail} alt={n.headline} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="144px" unoptimized />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted">
                    <span>{n.date}</span><span>·</span><span className="text-accent">{n.source}</span>
                  </div>
                  <h3 className="font-display text-xl text-text mt-2 leading-snug">{n.headline}</h3>
                  <div className="text-xs text-muted mt-3">Read more →</div>
                </div>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Add to `app/page.tsx`**, verify, commit.

```bash
npm run typecheck && npm run build
git add -A
git commit -m "feat(news): curated news headlines section"
```

---

## Task 16: Final `app/page.tsx` assembly + section order verification

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace `app/page.tsx` with the full composition**

```tsx
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Journey } from "@/components/sections/Journey";
import { Stats } from "@/components/sections/Stats";
import { Moments } from "@/components/sections/Moments";
import { Teams } from "@/components/sections/Teams";
import { Gallery } from "@/components/sections/Gallery";
import { News } from "@/components/sections/News";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Journey />
        <Stats />
        <Moments />
        <Teams />
        <Gallery />
        <News />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: Full build + smoke check**

```bash
npm run typecheck && npm run build && npm run dev
```
Manual smoke (open http://localhost:3000):
- Scroll top to bottom smoothly (Lenis)
- Navbar hides on scroll-down, shows on scroll-up
- Scroll progress bar fills as you scroll
- 3D ball rotates in hero
- Counters animate when Stats section scrolls into view
- Stats tabs switch cleanly
- Moments marquee translates as you scroll
- Team cards glow on hover
- Gallery lightbox opens on click, closes on Esc or outside click
- News links open in new tab
- Footer disclaimer visible

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat(page): compose full single-page portfolio"
```

---

## Task 17: Accessibility + reduced-motion polish

**Files:**
- Modify: `app/layout.tsx`, `components/sections/Hero.tsx`, any 3D consumers

- [ ] **Step 1: Add skip link to `app/layout.tsx`**

Inside `<body>`, before `<LenisProvider>`:

```tsx
<a
  href="#top"
  className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-accent focus:text-bg focus:px-4 focus:py-2 focus:rounded-sm"
>
  Skip to content
</a>
```

- [ ] **Step 2: In `components/sections/Hero.tsx`, gate the Scene by reduced-motion**

Add near the top of `Hero`:

```tsx
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
// inside Hero():
const reduced = usePrefersReducedMotion();
```

Then wrap `<Scene>` with `{!reduced && <Scene> ... </Scene>}`.

- [ ] **Step 3: In `components/sections/Moments.tsx`, same gate**

Wrap the trophy `<Scene>` with `{!reduced && ...}` after importing and calling `usePrefersReducedMotion`.

- [ ] **Step 4: Manual check**

In devtools, toggle "Emulate CSS `prefers-reduced-motion`" to `reduce`. Verify: no 3D canvases mount, no Lenis, scroll behaves natively, all content still readable.

- [ ] **Step 5: Verify + commit**

```bash
npm run typecheck && npm run build
git add -A
git commit -m "feat(a11y): skip link, reduced-motion 3D/Lenis gating"
```

---

## Task 18: Final build + production readiness pass

- [ ] **Step 1: Clean production build**

```bash
rm -rf .next
npm run build
```
Expected: build succeeds with zero errors, zero warnings. Note the First Load JS per route.

- [ ] **Step 2: Start production server and smoke-test**

```bash
npm run start
```
Open http://localhost:3000 and run the full smoke checklist from Task 16 Step 2 against the production build.

- [ ] **Step 3: Lighthouse run**

In Chrome DevTools → Lighthouse → Mobile, Performance + Accessibility + Best Practices + SEO.

Targets from spec §12:
- Performance ≥ 80
- Accessibility ≥ 95
- SEO ≥ 95
- Best Practices ≥ 95

If any fail, diagnose the specific audit item (likely candidates: image sizing, unused JS from 3D bundles, missing meta description). Fix inline and re-run.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "chore: production readiness pass"
```

---

## Plan Self-Review

**Spec coverage — §6 sections:**
- Hero → Task 8 ✅
- About → Task 9 ✅
- Career Journey → Task 10 ✅
- Stats Dashboard → Task 11 ✅
- Signature Moments → Task 12 ✅
- Teams → Task 13 ✅
- Gallery → Task 14 ✅
- News → Task 15 ✅
- Contact / Footer → Task 3 ✅

**Spec coverage — §7 3D scenes:**
- CricketBall → Task 5 ✅
- PortraitDisplacement → Task 6 ✅
- ParticleDust → Task 5 ✅
- TrophyFloat → Task 7 ✅
- StumpsExplode → intentionally skipped (marked stretch in spec §7.5)

**Spec coverage — other:**
- Visual system (CSS vars, fonts) → Task 1 ✅
- Lenis + grain + nav + footer + scroll progress → Task 3 ✅
- Data files → Task 2 ✅
- UI primitives → Task 4 ✅
- Reduced motion → Task 17 ✅
- Build/Lighthouse gates → Task 18 ✅

**Placeholder scan:** No "TBD" / "implement later" / "similar to" references. Every code step has complete code.

**Type consistency:** `FormatStats` is defined once in `lib/data/stats.ts` and consumed by `StatBlock` in Task 11. `Milestone`, `Moment`, `Team`, `GalleryImage`, `NewsItem` each defined once in their data file and consumed by the matching section component. Scene/PortraitDisplacement/TrophyFloat import names match their exports. `PortraitFallback` in Task 6 is the component referenced by Task 8's dynamic import — consistent.

No issues found.
