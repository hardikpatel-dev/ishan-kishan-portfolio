"use client";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { moments } from "@/lib/data/moments";
import { AnimatedBg } from "@/components/ui/AnimatedBg";
import { Tricolor } from "@/components/brand/Tricolor";
import { TrophyIcon } from "@/components/brand/CricketIcons";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

const Scene = dynamic(() => import("@/components/three/Scene").then((m) => m.Scene), { ssr: false });
const TrophyFloat = dynamic(() => import("@/components/three/TrophyFloat").then((m) => m.TrophyFloat), { ssr: false });

/**
 * Moments — bold editorial featured moments.
 *
 * - One large hero moment in the middle (210* vs Bangladesh)
 * - Surrounded by smaller stacked cards offset on a grid
 * - Big background year numbers
 * - 3D trophy floats behind on desktop
 */
export function Moments() {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const headlineY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  // Pick the hero moment (the 210*)
  const hero = moments[0];
  const rest = moments.slice(1);

  return (
    <section
      ref={ref}
      id="moments"
      className="relative py-32 md:py-48 overflow-hidden bg-bg"
    >
      <AnimatedBg
        blobs={[
          {
            className:
              "absolute top-0 -left-32 w-[40rem] h-[40rem] rounded-full bg-saffron/[0.08] blur-3xl",
            duration: 24,
            x: [0, 60, 0],
            y: [0, 40, 0],
          },
          {
            className:
              "absolute bottom-0 right-1/4 w-[34rem] h-[34rem] rounded-full bg-accent/[0.08] blur-3xl",
            duration: 28,
            x: [0, -40, 0],
            y: [0, -50, 0],
          },
          {
            className:
              "absolute top-1/2 right-0 w-[28rem] h-[28rem] rounded-full bg-mi-blue/[0.1] blur-3xl",
            duration: 32,
            x: [0, -30, 0],
            y: [0, 30, 0],
          },
        ]}
      />

      {/* 3D trophy on the right */}
      {!reduced && (
        <Scene className="absolute right-0 top-1/4 w-[35%] h-[60%] opacity-50 pointer-events-none">
          <TrophyFloat position={[0, -0.5, 0]} />
        </Scene>
      )}

      {/* HEADER */}
      <div className="relative mx-auto max-w-9xl px-6 mb-16 md:mb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="grid md:grid-cols-2 gap-8 items-end"
        >
          <div>
            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-3">
              <span className="text-muted">— 05</span>
              <span className="text-saffron">Signature moments</span>
            </div>
            <h2
              className="font-heavy uppercase text-white-soft leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
            >
              The nights
              <br />
              I&apos;ll never <span className="text-saffron italic">forget.</span>
            </h2>
            <Tricolor className="mt-6" />
          </div>
          <div className="flex md:justify-end">
            <p className="text-muted leading-relaxed max-w-sm font-mono text-sm">
              Five innings. Five different stages. Each one earned, each one
              etched.
            </p>
          </div>
        </motion.div>
      </div>

      {/* HERO MOMENT — featured large card */}
      <div className="relative mx-auto max-w-9xl px-6">
        {/*
          Big background year — now anchored to the LEFT edge behind the image
          column only, and pushed BELOW content stack (-z-10). This way the
          content column (with stat row) is never overlapped by the giant
          number. Vertical parallax kept for editorial feel.
        */}
        <motion.div
          aria-hidden
          style={{ y: headlineY }}
          className="absolute left-0 right-0 top-1/2 -translate-y-1/2 -z-10 pointer-events-none select-none font-heavy uppercase leading-none tracking-[-0.04em] text-center"
        >
          <span
            className="inline-block text-white-soft/[0.035]"
            style={{ fontSize: "clamp(7rem, 20vw, 20rem)" }}
          >
            {hero.date.slice(0, 4)}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative grid md:grid-cols-12 gap-6 md:gap-10 items-stretch"
        >
          {/* Image */}
          <div className="relative md:col-span-7 aspect-[4/3] md:aspect-[5/4] overflow-hidden border border-border group">
            <Image
              src={hero.image}
              alt={hero.headline}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(min-width: 768px) 60vw, 100vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-bg/80 via-transparent to-transparent" />
            {/* Top-left feature badge */}
            <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-sm bg-bg/85 backdrop-blur-sm border border-saffron/40">
              <TrophyIcon size={12} className="text-saffron" />
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-saffron">
                Featured · 01 / 05
              </span>
            </div>
            {/* Bottom-left date */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-[3px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white-soft" />
                  <span className="w-1.5 h-1.5 rounded-full bg-india-green" />
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-white-soft/80">
                  {hero.date}
                </span>
              </div>
            </div>
          </div>

          {/* Content — with staggered children for editorial motion feel */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
            }}
            className="md:col-span-5 flex flex-col justify-center relative"
          >
            <motion.h3
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heavy uppercase text-saffron leading-[0.85] tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
            >
              210<span className="text-white-soft">*</span>
            </motion.h3>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 font-display text-2xl md:text-3xl text-text leading-tight"
            >
              {hero.headline}
            </motion.div>

            <motion.div
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="mt-6 h-[2px] w-32 bg-gradient-to-r from-saffron via-white-soft to-india-green"
            />

            <motion.p
              variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="text-muted mt-6 leading-relaxed max-w-md"
            >
              {hero.description}
            </motion.p>

            {/*
              Stat row — wrapped in a solid bg container so any faint bg
              bleed-through from the giant year number is blocked. Stats
              stay crisp and readable.
            */}
            <motion.div
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
              }}
              className="mt-8 grid grid-cols-3 gap-4 max-w-sm relative bg-bg/80 backdrop-blur-sm p-4 border-l-2 border-saffron/60"
            >
              {[
                { label: "Balls", value: "131" },
                { label: "Fours", value: "24" },
                { label: "Sixes", value: "10" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  variants={{ hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="pl-2"
                >
                  <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted">
                    {s.label}
                  </div>
                  <div className="font-heavy text-2xl text-white-soft mt-1">
                    {s.value}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* REST OF MOMENTS — staggered grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
          className="mt-24 md:mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {rest.map((m, i) => (
            <motion.article
              key={m.date}
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className={`group relative ${
                i % 2 === 1 ? "lg:translate-y-12" : ""
              }`}
            >
              <div className="relative aspect-[3/4] overflow-hidden border border-border group-hover:border-saffron/50 transition-colors">
                <Image
                  src={m.image}
                  alt={m.headline}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(min-width: 1024px) 22vw, (min-width: 768px) 45vw, 90vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent" />
                {/* Index */}
                <div className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-[0.3em] text-saffron">
                  {String(i + 2).padStart(2, "0")} / 05
                </div>
                {/* Date */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-saffron mb-2">
                    {m.date}
                  </div>
                  <div className="font-display text-lg text-white-soft leading-tight">
                    {m.headline}
                  </div>
                </div>
              </div>
              <p className="text-muted text-xs mt-3 leading-relaxed">
                {m.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
