"use client";
import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { news } from "@/lib/data/news";
import { AnimatedBg } from "@/components/ui/AnimatedBg";
import { Tricolor } from "@/components/brand/Tricolor";

/**
 * News — bold editorial press cards.
 *
 * Layout
 *   - Header: stacked on mobile/tablet, 2-col on lg+. Bg "PRESS" wordmark
 *     sits ONLY in the header band (top area), never over card content.
 *   - Featured: asymmetric 7/5 grid on md+, stacked on mobile. Image gets
 *     scroll-driven parallax. Text column staggers in line-by-line.
 *   - Rest grid: 1 col mobile → 2 col sm → 3 col lg. Spring hover lift.
 *
 * Motion
 *   - Header: parallax translate on the bg wordmark as section scrolls
 *   - Featured image: subtle scale + y parallax
 *   - Text content: stagger children with custom variants
 *   - Divider rules: scaleX draw-in
 *   - Grid cards: stagger entrance + spring hover
 */
export function News() {
  const featured = news[0];
  const rest = news.slice(1);

  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Background PRESS wordmark parallax — drifts as the section scrolls past
  const bgWordX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const bgWordOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );

  // Featured image parallax
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      ref={sectionRef}
      id="news"
      className="relative py-28 sm:py-32 md:py-48 bg-bg overflow-hidden"
    >
      <AnimatedBg
        blobs={[
          {
            className:
              "absolute top-0 right-0 w-[36rem] h-[36rem] rounded-full bg-mi-blue/[0.1] blur-3xl",
            duration: 24,
            x: [0, -40, 0],
            y: [0, 30, 0],
          },
          {
            className:
              "absolute bottom-10 left-10 w-[32rem] h-[32rem] rounded-full bg-india-green/[0.07] blur-3xl",
            duration: 28,
            x: [0, 40, 0],
            y: [0, -30, 0],
          },
          {
            className:
              "absolute top-1/3 left-1/3 w-[28rem] h-[28rem] rounded-full bg-saffron/[0.06] blur-3xl",
            duration: 32,
            x: [0, 30, 0],
            y: [0, 30, 0],
          },
        ]}
      />

      {/*
        Background "PRESS" wordmark — anchored to the header band but pushed
        BEHIND all content (-z-10) and rendered with a very subtle outline
        style (stroke, no fill) at ultra-low opacity. This way the heading
        "Stories from the record" stays fully readable and the wordmark reads
        as a textural ghost rather than competing text.
      */}
      <motion.div
        aria-hidden
        style={{ x: bgWordX, opacity: bgWordOpacity }}
        className="absolute inset-x-0 top-20 sm:top-24 md:top-32 -z-10 pointer-events-none select-none text-center font-heavy uppercase leading-[0.8] tracking-[-0.04em]"
      >
        <span
          className="inline-block text-white-soft/[0.015]"
          style={{ fontSize: "clamp(5rem, 14vw, 18rem)" }}
        >
          Press
        </span>
      </motion.div>

      <div className="relative mx-auto max-w-9xl px-5 sm:px-6 lg:px-8">
        {/* ─── HEADER ────────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="mb-14 sm:mb-20 lg:mb-28 grid lg:grid-cols-[1fr_auto] gap-6 sm:gap-10 items-end"
        >
          <div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-3"
            >
              <span className="text-muted">— 08</span>
              <span className="text-saffron">In the news</span>
            </motion.div>

            <motion.h2
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heavy uppercase text-white-soft leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(2.4rem, 7vw, 6.5rem)" }}
            >
              Stories
              <br />
              from <span className="text-saffron italic">the record.</span>
            </motion.h2>

            <motion.div
              variants={{
                hidden: { opacity: 0, scaleX: 0 },
                visible: { opacity: 1, scaleX: 1 },
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
            >
              <Tricolor className="mt-6" />
            </motion.div>
          </div>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted leading-relaxed max-w-sm font-mono text-xs sm:text-sm lg:text-right lg:justify-self-end"
          >
            A few highlights from press coverage worth holding onto.
          </motion.p>
        </motion.div>

        {/* ─── FEATURED ARTICLE ──────────────────────────────────────── */}
        <motion.a
          href={featured.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`${featured.headline} — opens ${featured.source} in new tab`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
          }}
          className="group relative grid md:grid-cols-12 gap-6 sm:gap-8 lg:gap-10 mb-16 sm:mb-20 lg:mb-24"
        >
          {/* Image — parallax + scale on hover */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="md:col-span-7 relative aspect-[16/10] overflow-hidden border border-border group-hover:border-saffron/60 transition-colors duration-500"
          >
            <motion.div
              style={{ y: imgY }}
              className="absolute inset-0 scale-110"
            >
              <Image
                src={featured.thumbnail}
                alt={featured.headline}
                fill
                className="object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                sizes="(min-width: 768px) 60vw, 100vw"
                unoptimized
              />
            </motion.div>
            {/* Gradient veil — darker bottom-left for label legibility */}
            <div className="absolute inset-0 bg-gradient-to-tr from-bg/90 via-bg/30 to-transparent pointer-events-none" />
            {/* Featured badge */}
            <div className="absolute top-4 left-4 bg-bg/85 backdrop-blur-sm border border-saffron/40 px-3 py-1.5 rounded-sm">
              <div className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.3em] text-saffron">
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                  aria-hidden
                >
                  <path d="M5 0l1.2 3.7H10L6.9 6l1.2 3.7L5 7.4 1.9 9.7 3.1 6 0 3.7h3.8z" />
                </svg>
                Featured
              </div>
            </div>
            {/* Bottom-left external link indicator */}
            <motion.div
              className="absolute bottom-4 right-4 w-10 h-10 rounded-full border border-saffron/50 bg-bg/70 backdrop-blur-sm flex items-center justify-center text-saffron opacity-0 group-hover:opacity-100"
              initial={false}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>

          {/* Text column — stagger children, solid readability */}
          <div className="md:col-span-5 flex flex-col justify-center relative">
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] mb-4"
            >
              <span className="text-muted">{featured.date}</span>
              <span className="w-6 h-px bg-saffron/40" />
              <span className="text-saffron">{featured.source}</span>
            </motion.div>

            <motion.h3
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heavy uppercase text-white-soft leading-[0.95] tracking-tight"
              style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.75rem)" }}
            >
              {featured.headline}
            </motion.h3>

            <motion.div
              variants={{
                hidden: { scaleX: 0 },
                visible: { scaleX: 1 },
              }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "left" }}
              className="mt-6 h-[2px] w-32 bg-gradient-to-r from-saffron via-white-soft to-india-green"
            />

            <motion.div
              variants={{
                hidden: { opacity: 0, x: -10 },
                visible: { opacity: 1, x: 0 },
              }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted group-hover:text-saffron transition-colors"
            >
              Read full story
              <motion.span
                className="inline-block"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </motion.div>
          </div>
        </motion.a>

        {/* ─── REST GRID ─────────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12 } },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {rest.map((n, i) => (
            <motion.a
              key={n.url + n.date}
              href={n.url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${n.headline} — opens ${n.source} in new tab`}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              whileHover="hovered"
              className="group block"
            >
              <motion.div
                variants={{
                  hovered: { y: -8 },
                }}
                transition={{ type: "spring", stiffness: 350, damping: 28 }}
                className="relative aspect-[4/3] overflow-hidden border border-border group-hover:border-saffron/60 transition-colors duration-500"
              >
                <motion.div
                  variants={{
                    hovered: { scale: 1.08 },
                  }}
                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={n.thumbnail}
                    alt={n.headline}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    unoptimized
                  />
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-[0.3em] text-saffron">
                  {String(i + 2).padStart(2, "0")} / {String(news.length).padStart(2, "0")}
                </div>
                {/* Hover arrow corner */}
                <motion.div
                  variants={{
                    hovered: { opacity: 1, x: 0, y: 0 },
                  }}
                  initial={{ opacity: 0, x: 10, y: -10 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full border border-saffron/50 bg-bg/70 backdrop-blur-sm flex items-center justify-center text-saffron"
                >
                  <svg width="11" height="11" viewBox="0 0 14 14" fill="none" aria-hidden>
                    <path
                      d="M3 11L11 3M11 3H5M11 3V9"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>
              </motion.div>

              <div className="mt-4">
                <div className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.3em]">
                  <span className="text-muted">{n.date}</span>
                  <span className="w-4 h-px bg-saffron/40" />
                  <span className="text-saffron">{n.source}</span>
                </div>
                <h4 className="font-heavy uppercase text-white-soft mt-3 text-sm sm:text-base leading-snug tracking-tight group-hover:text-saffron transition-colors duration-300">
                  {n.headline}
                </h4>
                {/* Animated underline on hover */}
                <motion.div
                  variants={{
                    hovered: { scaleX: 1 },
                  }}
                  initial={{ scaleX: 0 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: "left" }}
                  className="mt-3 h-px w-full bg-gradient-to-r from-saffron via-white-soft/60 to-transparent"
                />
                <div className="mt-3 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-muted group-hover:text-saffron transition-colors">
                  Read
                  <motion.span
                    className="inline-block"
                    variants={{ hovered: { x: 4 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    →
                  </motion.span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
