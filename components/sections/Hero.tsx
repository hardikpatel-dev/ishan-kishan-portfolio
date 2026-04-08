"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";
import { PaintReveal } from "@/components/ui/PaintReveal";

// Local same-origin photos in /public/hero/
const HELMET_IMG = "/hero/helmet.png";
const PORTRAIT_IMG = "/hero/portrait.png";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax — different speeds give the layered 3D feel even before scroll
  const ishanY = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const ishanOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const kishanY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const kishanOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  // Photo is bottom-anchored — parallax pushes it down (positive y) on scroll-out
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const tagY = useTransform(scrollYProgress, [0, 1], ["0%", "-35%"]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative min-h-screen overflow-hidden bg-bg"
    >
      {/* Animated background blobs */}
      {!reduced && (
        <>
          <motion.div
            aria-hidden
            className="absolute -top-40 -left-40 w-[42rem] h-[42rem] rounded-full bg-saffron/[0.08] blur-3xl pointer-events-none"
            animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute top-1/4 right-0 w-[36rem] h-[36rem] rounded-full bg-accent/[0.08] blur-3xl pointer-events-none"
            animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
            transition={{ duration: 24, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute bottom-0 left-1/3 w-[30rem] h-[30rem] rounded-full bg-mi-blue/[0.14] blur-3xl pointer-events-none"
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }}
            transition={{ duration: 28, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />
        </>
      )}

      {/* ISHAN — TOP wordmark, BEHIND photo (z-10) */}
      <motion.div
        style={reduced ? undefined : { y: ishanY, opacity: ishanOpacity }}
        className="absolute left-0 right-0 top-36 sm:top-32 md:top-32 z-10 pointer-events-none select-none text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-heavy uppercase text-white-soft leading-[0.78] tracking-[-0.04em]"
          style={{ fontSize: "clamp(5rem, 24vw, 22rem)" }}
        >
          Ishan
          <sup className="ml-2 text-[0.12em] align-top text-saffron font-mono tracking-normal">®</sup>
        </motion.h1>
      </motion.div>

      {/* MOBILE-ONLY — athlete profile stat strip. Sits BELOW the ISHAN
          wordmark as supporting metadata (trading-card style), not a competing
          hero element. Muted white tones + single saffron accent preserve the
          brand color for the KISHAN wordmark. Three small cells with divider
          rules give editorial rhythm instead of one dominant number. */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="sm:hidden absolute inset-x-0 top-[14rem] bottom-[22rem] z-10 pointer-events-none flex flex-col items-center justify-center px-6"
      >
        {/* Section label — tiny, muted, anchors the strip */}
        <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-muted mb-5">
          <span className="w-4 h-px bg-saffron/60" />
          Profile
          <span className="w-4 h-px bg-saffron/60" />
        </div>

        {/* Horizontal stat strip — three compact cells, editorial divider lines */}
        <div className="flex items-stretch justify-center divide-x divide-white-soft/10 border-y border-white-soft/10 py-4">
          {/* Stat 1: signature knock */}
          <div className="px-5 flex flex-col items-center justify-center min-w-[5.5rem]">
            <div className="text-[8px] font-mono uppercase tracking-[0.22em] text-muted mb-1.5">
              High
            </div>
            <div className="font-heavy text-white-soft text-[1.9rem] leading-none tracking-tight">
              210<span className="text-saffron">*</span>
            </div>
            <div className="text-[8px] font-mono uppercase tracking-[0.2em] text-white-soft/45 mt-1.5">
              vs BAN
            </div>
          </div>

          {/* Stat 2: jersey / squad number */}
          <div className="px-5 flex flex-col items-center justify-center min-w-[5.5rem]">
            <div className="text-[8px] font-mono uppercase tracking-[0.22em] text-muted mb-1.5">
              Jersey
            </div>
            <div className="font-heavy text-white-soft text-[1.9rem] leading-none tracking-tight">
              #23
            </div>
            <div className="text-[8px] font-mono uppercase tracking-[0.2em] text-white-soft/45 mt-1.5">
              Active
            </div>
          </div>

          {/* Stat 3: handedness / role */}
          <div className="px-5 flex flex-col items-center justify-center min-w-[5.5rem]">
            <div className="text-[8px] font-mono uppercase tracking-[0.22em] text-muted mb-1.5">
              Style
            </div>
            <div className="font-heavy text-white-soft text-[1.9rem] leading-none tracking-tight">
              LHB
            </div>
            <div className="text-[8px] font-mono uppercase tracking-[0.2em] text-white-soft/45 mt-1.5">
              WK · BAT
            </div>
          </div>
        </div>

        {/* Subtle footer note — anchors the card and adds the highlight context */}
        <div className="mt-4 text-[9px] font-mono uppercase tracking-[0.25em] text-white-soft/50">
          Fastest Indian ODI double · 2022
        </div>
      </motion.div>

      {/* PHOTO — bottom-anchored, sized so ISHAN wordmark stays visible above it.
          Outer div: ONLY Tailwind positioning. No framer transforms here so
          Tailwind's translate-x-1/2 stays intact. */}
      <div
        className="absolute left-1/2 bottom-16 sm:bottom-0 -translate-x-1/2 z-20 w-[92vw] sm:w-[70vw] md:w-[56vw] lg:w-[46vw] xl:w-[42vw] max-w-[740px]"
        style={{ aspectRatio: "1114 / 960" }}
      >
        {/* Inner motion div: parallax y + scale */}
        <motion.div
          className="absolute inset-0"
          style={reduced ? undefined : { y: imgY, scale: imgScale }}
        >
          {/* Photo + paint reveal — slight brightness lift + saturation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
            style={{
              filter: "brightness(1.06) contrast(1.04) saturate(1.08)",
            }}
          >
            {!reduced ? (
              <PaintReveal
                topImage={HELMET_IMG}
                bottomImage={PORTRAIT_IMG}
                brushRadius={70}
                className="absolute inset-0"
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={HELMET_IMG}
                alt="Ishan Kishan"
                className="absolute inset-0 w-full h-full object-cover object-bottom"
              />
            )}
          </motion.div>

          {/* FACE BRIGHTNESS HIGHLIGHT — soft warm radial overlay positioned
              over the face area. mix-blend soft-light brightens the face
              without washing out the photo. */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 38% 22% at 50% 30%, rgba(255,225,190,0.32), transparent 65%)",
              mixBlendMode: "soft-light",
            }}
          />
          {/* Subtle saffron rim glow */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 30% at 50% 32%, rgba(255,153,51,0.12), transparent 70%)",
              mixBlendMode: "screen",
            }}
          />
        </motion.div>
      </div>

      {/* KISHAN — BOTTOM wordmark, IN FRONT of photo (z-30) */}
      <motion.div
        style={reduced ? undefined : { y: kishanY, opacity: kishanOpacity }}
        className="absolute left-0 right-0 bottom-44 sm:bottom-28 md:bottom-32 z-30 pointer-events-none select-none text-center"
      >
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heavy uppercase text-saffron leading-[0.78] tracking-[-0.04em]"
          style={{ fontSize: "clamp(4rem, 16vw, 14rem)" }}
        >
          Kishan
        </motion.h1>
      </motion.div>

      {/* TOP-LEFT — tagline / status */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-20 sm:top-28 left-4 md:left-10 z-40 max-w-[9rem] sm:max-w-[14rem] pointer-events-none"
      >
        <div className="flex items-center gap-2 sm:gap-3 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.25em] sm:tracking-[0.3em] text-muted">
          <span className="w-4 sm:w-6 h-px bg-saffron" />
          The Southpaw Storm
        </div>
        <div className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-white-soft/60">
          Patna · India
        </div>
      </motion.div>

      {/* TOP-RIGHT — metadata column */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-20 sm:top-28 right-4 md:right-10 z-40 max-w-[9rem] sm:max-w-[16rem] text-right pointer-events-none"
      >
        <div className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white-soft/60">
          Wicketkeeper · Batsman
        </div>
        <div className="mt-1 sm:mt-2 text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-saffron">
          Left hand · #23
        </div>
      </motion.div>

      {/* BOTTOM-LEFT — declarative statement */}
      <motion.div
        style={reduced ? undefined : { y: tagY }}
        className="absolute bottom-20 sm:bottom-24 left-4 md:left-10 z-40 max-w-[8rem] sm:max-w-xs pointer-events-none"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 1.4 } },
          }}
          className="font-heavy text-white-soft uppercase leading-[1.05] tracking-tight text-base sm:text-2xl md:text-3xl"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            No introductions.
          </motion.div>
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            <span className="text-muted">Just </span>
            <span className="text-saffron">innings.</span>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* BOTTOM-RIGHT — bold headline */}
      <motion.div
        style={reduced ? undefined : { y: tagY }}
        className="absolute bottom-20 sm:bottom-24 right-4 md:right-10 z-40 max-w-[8rem] sm:max-w-[14rem] md:max-w-[18rem] text-right pointer-events-none"
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 1.6 } },
          }}
          className="font-heavy text-white-soft leading-[0.95] tracking-[-0.02em] uppercase text-sm sm:text-xl md:text-2xl"
        >
          <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
            Beyond the bat.
          </motion.div>
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="text-saffron"
          >
            Beyond the boundary.
          </motion.div>
        </motion.div>
      </motion.div>

      {/* BOTTOM STRIP — teams worn */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="absolute bottom-0 left-0 right-0 z-50 border-t border-border/40 bg-bg/80 backdrop-blur-md"
      >
        <div className="mx-auto max-w-9xl px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 sm:gap-6">
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted shrink-0 hidden md:block">
            Colours worn
          </div>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 1.9 } },
            }}
            className="flex items-center gap-2 sm:gap-6 md:gap-12 flex-1 justify-around font-heavy uppercase"
          >
            {["India", "Mumbai", "Jharkhand", "India A", "U-19"].map((t) => (
              <motion.div
                key={t}
                variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                className="text-[11px] sm:text-sm md:text-lg text-white-soft/55 hover:text-saffron transition-colors cursor-default tracking-wider whitespace-nowrap"
              >
                {t}
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted shrink-0 hidden md:flex items-center gap-2"
            animate={{ y: [0, 4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            Scroll ↓
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
