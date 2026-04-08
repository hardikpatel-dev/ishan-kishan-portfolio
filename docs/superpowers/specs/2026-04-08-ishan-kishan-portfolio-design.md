# Ishan Kishan Personal Portfolio — Design Spec

**Date:** 2026-04-08
**Type:** Greenfield Next.js web project
**Status:** Draft — awaiting user approval

---

## 1. Overview

A premium, cinematic personal portfolio website for cricketer Ishan Kishan. It reads and feels like his own first-person personal site (voice: "I'm Ishan," "my journey"), inspired by top athlete personal sites (cristiano.com, neymarjr.com). Heavy use of 3D, scroll-triggered motion, and parallax to feel alive and impressive.

**Positioning:** Presented in the UI as a personal portfolio in first-person voice. A single small, muted footer line ("Portfolio concept — design project, not officially affiliated") keeps it honest without undermining the feel.

## 2. Goals

- Look and feel like a premium, personal athlete portfolio — not a fan page, not a Wikipedia summary.
- Use 3D, parallax, and scroll-triggered animation to make the experience feel alive.
- Showcase Ishan Kishan's career, stats, milestones, team history, and key moments.
- Fully static, deployable to Vercel with zero backend.
- Accessible and performant enough that the motion never makes it feel broken.

## 3. Non-Goals (YAGNI)

- No CMS, admin panel, or auth.
- No live cricket API integration; stats are hardcoded in TS files.
- No i18n.
- No blog, comments, or user accounts.
- No photorealistic 3D head model of Ishan (not feasible in code; see §7 for the 2.5D depth-portrait approach used instead).
- No server routes beyond what Next.js static export requires.

## 4. Tech Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 15 (App Router, TypeScript strict) |
| Styling | TailwindCSS + CSS variables for theme tokens |
| Animation | Framer Motion (`motion/react`) |
| 3D | React Three Fiber (`@react-three/fiber`, `@react-three/drei`) |
| Smooth scroll | Lenis (`@studio-freight/lenis`) |
| Icons | react-icons |
| Fonts | `next/font/google` — Fraunces (display), Inter (body), JetBrains Mono (numerals) |
| Images | `next/image` with `remotePatterns` for Wikimedia + Unsplash |
| Deploy target | Vercel (fully static SSG) |

## 5. Visual System

**Aesthetic:** Cinematic Midnight Blue.

**Palette (CSS vars on `:root`):**
- `--bg: #05070f` — near-black navy
- `--surface: #0a1226` — raised panels
- `--surface-2: #0f1a35`
- `--accent: #5b8cff` — electric blue (CTAs, highlights)
- `--accent-warm: #ffb86b` — sunset highlight (sparingly)
- `--text: #eaf0ff`
- `--muted: #7b8bb0`
- `--border: rgba(125, 163, 255, 0.12)`

**Typography:**
- Display/headings → **Fraunces** (editorial serif, high optical size)
- Body → **Inter**
- Numerals/stats → **JetBrains Mono**

**Texture / atmosphere:**
- Fixed film-grain SVG overlay at ~4% opacity across the page
- Radial vignette on hero
- Subtle noise on surfaces

**Motion language:**
- Slow, generous reveals (0.8–1.2s, eased with `cubic-bezier(0.22, 1, 0.36, 1)`)
- Sections enter with `y: 40 → 0`, `opacity: 0 → 1`, staggered children
- Lenis-backed inertial smooth scroll
- Parallax on every hero-level image
- Counters count up on scroll-in
- Respects `prefers-reduced-motion` — disables parallax and auto-rotating 3D

## 6. Information Architecture

Single-page portfolio. All sections compose into `app/page.tsx`. Top nav anchors jump to sections.

1. **Hero** — cinematic full-viewport intro
2. **About** — first-person bio snapshot + floating stat chips
3. **Career Journey** — scroll-pinned vertical timeline (6–8 milestones)
4. **Stats Dashboard** — tabbed (Tests / ODI / T20I / IPL) with animated counters + bar chart
5. **Signature Moments** — horizontal marquee with floating 3D trophy scene
6. **Teams** — logo grid (India, MI, Jharkhand, India A, U-19) with hover reveals
7. **Gallery** — masonry grid with custom lightbox
8. **News** — 4–6 static curated headline cards, labeled as curated highlights
9. **Contact / Footer** — social icons, small muted disclaimer line

Voice throughout is **first person**. No third-person "Ishan Kishan is…" copy anywhere in visible UI.

## 7. 3D Scenes (React Three Fiber)

All R3F canvases are:
- Lazy-loaded via `next/dynamic` with `ssr: false`
- Mounted only when in viewport (`IntersectionObserver` gate)
- Running `frameloop="demand"` where animation allows
- DPR capped at 1.5
- Low-poly geometry throughout

### 7.1 CricketBall (`components/three/CricketBall.tsx`)
Red leather sphere with a white seam ring (thin torus). Procedural or sourced normal map for stitching. Slow Y-axis rotation. Placed in the hero background with soft blue rim light.

### 7.2 PortraitDisplacement (`components/three/PortraitDisplacement.tsx`) — the "alive face" effect
The **hero centerpiece**. A plane mesh rendered with a custom shader that displaces vertices based on a depth map of the portrait photo.

- Input: one real photo + one depth map (generated once up front via a free online depth-estimation tool, committed to `public/hero/`)
- Shader: vertex displacement proportional to depth map luminance; fragment samples the color photo
- Interaction: subtle parallax tied to mouse position + scroll progress
- Result: the photo looks like it's breathing / gently rotating in 3D space — reads as a living 3D portrait without being a real 3D head

**Fallback:** if reduced-motion is set, render as a static `next/image` with no canvas.

### 7.3 ParticleDust (`components/three/ParticleDust.tsx`)
`Points` with 500–1500 random positions, tiny white specks, additive blending, slow drift. Placed in hero + optionally behind Signature Moments.

### 7.4 TrophyFloat (`components/three/TrophyFloat.tsx`)
Low-poly trophy (composed from primitives: cylinder base + cup + handles, or a CC0 `.glb` from Poly Pizza if easily sourced). Gold metalness, subtle sine float, slow rotation. Placed behind the Signature Moments section.

### 7.5 StumpsExplode (`components/three/StumpsExplode.tsx`) — *stretch goal*
Three stumps + bails that separate/tilt on scroll into view. If time-constrained during implementation, cut this.

## 8. Scroll & Motion Mechanics

- **Lenis** provider wraps the app in `layout.tsx` for inertial smooth scroll
- **Framer Motion `useScroll` + `useTransform`** drives per-section parallax offsets
- **`whileInView`** handles section reveals
- **Scroll progress bar** pinned top of viewport
- **Navbar** hides on scroll-down, reveals on scroll-up
- **Timeline section** is scroll-pinned (sticky container) so milestones advance as the user scrolls

## 9. Data Model (hardcoded TypeScript)

All data in `lib/data/*.ts`, typed, no runtime fetch.

```ts
// lib/data/bio.ts
export const bio = {
  name: "Ishan Kishan",
  tagline: "The Southpaw Storm",
  dob: "1998-07-18",
  birthplace: "Patna, Bihar, India",
  role: "Wicketkeeper-Batsman",
  battingStyle: "Left-handed",
  height: "5'5\"",
  currentTeam: "Mumbai Indians",
  jerseyNumber: 23,
};

// lib/data/stats.ts
export type FormatStats = {
  matches: number; runs: number; avg: number; sr: number;
  fifties: number; hundreds: number; hs: string; debut: string;
};
export const stats: Record<"test" | "odi" | "t20i" | "ipl", FormatStats> = { ... };

// lib/data/journey.ts — Milestone[]
export type Milestone = { year: string; title: string; description: string; image?: string };

// lib/data/moments.ts — Moment[]
export type Moment = { date: string; headline: string; description: string; image: string };

// lib/data/teams.ts — Team[]
export type Team = { name: string; logo: string; years: string; role: string };

// lib/data/gallery.ts — GalleryImage[]
export type GalleryImage = { src: string; alt: string; credit: string; aspect: "portrait" | "landscape" | "square" };

// lib/data/news.ts — NewsItem[]
export type NewsItem = { date: string; source: string; headline: string; thumbnail: string; url: string };
```

Stats values sourced from public knowledge up to the author's knowledge cutoff (May 2025). Numbers are editable in place when the user wants to refresh them.

## 10. Folder Structure

```
app/
  layout.tsx              # fonts, metadata, Lenis provider, grain overlay
  page.tsx                # composes all sections
  globals.css             # tailwind + CSS theme vars + base resets
components/
  sections/
    Hero.tsx
    About.tsx
    Journey.tsx
    Stats.tsx
    Moments.tsx
    Teams.tsx
    Gallery.tsx
    News.tsx
    Contact.tsx
  three/
    CricketBall.tsx
    PortraitDisplacement.tsx
    ParticleDust.tsx
    TrophyFloat.tsx
    StumpsExplode.tsx       # stretch
    Scene.tsx               # shared canvas wrapper w/ lazy + in-view gate
  ui/
    Reveal.tsx              # framer in-view wrapper
    Counter.tsx             # count-up on in-view
    SectionHeading.tsx
    Card.tsx
    Marquee.tsx
    Lightbox.tsx
    TabGroup.tsx
  layout/
    Navbar.tsx
    Footer.tsx
    ScrollProgress.tsx
    LenisProvider.tsx
    GrainOverlay.tsx
lib/
  data/                     # bio, stats, journey, moments, teams, gallery, news
  motion/
    variants.ts             # shared framer variants
  hooks/
    useInView.ts
    useParallax.ts
    usePrefersReducedMotion.ts
public/
  hero/
    portrait.jpg
    portrait-depth.jpg
  textures/
    ball-normal.jpg
  logos/                    # team logos
```

## 11. Images & Assets

- `next/image` with `remotePatterns` whitelisting:
  - `upload.wikimedia.org` (Wikimedia Commons — CC-licensed)
  - `images.unsplash.com` (Unsplash — free use)
- Local assets under `public/` for the hero portrait, depth map, team logos, and ball texture
- Hero portrait sourced from Wikimedia Commons if a suitable CC image exists; otherwise a stylized silhouette + name treatment
- Every gallery image includes a `credit` field
- Blur placeholders on all `next/image` instances

## 12. Performance Guardrails

- Lighthouse targets: Performance ≥ 80, A11y ≥ 95, SEO ≥ 95, Best Practices ≥ 95
- R3F canvases lazy-loaded, only mounted in viewport
- DPR cap at 1.5, low-poly geometry
- Image lazy-loading, appropriate `sizes` attribute
- Font `display: swap`
- No chart library — bar charts done in plain SVG
- Route-level code splitting by default via Next.js

## 13. Accessibility

- Semantic landmarks (`<header>`, `<main>`, `<section>`, `<footer>`)
- Skip-to-content link
- Keyboard-navigable nav, lightbox, tabs
- Focus-visible rings using `--accent`
- All images have meaningful `alt` text
- `prefers-reduced-motion` disables Lenis smooth scroll, parallax transforms, 3D auto-rotation, and the portrait displacement canvas (falls back to static image)
- Color contrast ratios ≥ 4.5:1 for text on `--bg`

## 14. Build & Quality Gates

- TypeScript strict mode, zero `any` in app code
- ESLint (Next.js defaults) clean
- `next build` completes with zero errors and zero warnings
- Manual smoke test: load the page, scroll top to bottom, click through each tab / lightbox / nav link

## 15. Open Questions / Risks

- **Depth map for the hero portrait** — needs to be generated once up front using a free tool (e.g., an online MiDaS demo). If no suitable source photo exists, the portrait displacement effect falls back gracefully to a static image.
- **Team logos** — may need to use generic placeholders if no free-to-use official marks are available. Not a blocker.
- **Stats freshness** — hardcoded; user is responsible for editing `lib/data/stats.ts` when refreshing.

## 16. Done Criteria

- All 9 sections render in the configured order with real content
- Hero portrait displacement effect works on desktop and degrades to static on reduced-motion / mobile
- All 3D scenes (ball, portrait, particles, trophy) lazy-load and run without blocking scroll
- Stats tabs switch cleanly, counters animate on scroll-in
- Gallery lightbox opens and closes via click + Escape
- Mobile layout usable at 375px width
- `next build` passes clean
- Footer disclaimer line present
