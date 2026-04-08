"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { gallery } from "@/lib/data/gallery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";
import { AnimatedBg } from "@/components/ui/AnimatedBg";
import { Tricolor } from "@/components/brand/Tricolor";

/**
 * Gallery — horizontal scroll on sticky section.
 *
 * Inspired by landonorris.com: vertical page scroll inside this section
 * translates a horizontal track of editorial cards. Each card has its own
 * caption + year and opens in a lightbox on click. Different aspect ratios
 * are mixed for an editorial feel.
 */
export function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<{ src: string; alt: string } | null>(null);
  const [pageIdx, setPageIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // The track holds N items at varying widths. Translate the track from 0
  // to a negative percentage so the last item ends up flush with the right edge.
  // -75% empirically suits 10 items at the widths used below.
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-78%"]);

  // Update active page indicator as the user scrolls through
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(gallery.length - 1, Math.max(0, Math.round(v * (gallery.length - 1))));
    if (i !== pageIdx) setPageIdx(i);
  });

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative bg-bg"
      // Tall enough that horizontal scroll feels meaningful — ~one viewport per ~2 cards
      style={{ height: `${gallery.length * 60 + 100}vh` }}
    >
      {/* Sticky stage */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">
        <AnimatedBg
          blobs={[
            {
              className:
                "absolute top-0 left-1/4 w-[36rem] h-[36rem] rounded-full bg-saffron/[0.06] blur-3xl",
              duration: 26,
              x: [0, 40, 0],
              y: [0, 30, 0],
            },
            {
              className:
                "absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-mi-blue/[0.1] blur-3xl",
              duration: 30,
              x: [0, -30, 0],
              y: [0, -40, 0],
            },
          ]}
        />

        {/* Top header row */}
        <div className="relative pt-32 md:pt-36 pb-6 px-6 md:px-12">
          <div className="flex items-end justify-between gap-8 max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-3">
                <span className="font-mono text-xs text-muted">— 07</span>
                <span className="text-saffron">Gallery</span>
              </div>
              <h2
                className="font-heavy uppercase text-white-soft leading-[0.9] tracking-tight"
                style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}
              >
                Frames
                <br />
                from <span className="text-saffron italic">the road.</span>
              </h2>
              <Tricolor className="mt-6" />
            </div>

            {/* Page indicator */}
            <div className="hidden md:flex flex-col items-end shrink-0">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-2">
                Frame
              </div>
              <div className="font-heavy text-white-soft leading-none flex items-baseline gap-2 tracking-tight">
                <motion.span
                  key={pageIdx}
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.35 }}
                  className="text-saffron text-5xl tabular-nums"
                >
                  {String(pageIdx + 1).padStart(2, "0")}
                </motion.span>
                <span className="text-text/40 text-2xl">
                  /{String(gallery.length).padStart(2, "0")}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Horizontal track */}
        <div className="relative flex-1 flex items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex items-center gap-6 md:gap-12 pl-6 md:pl-12 pr-32 will-change-transform"
          >
            {gallery.map((g, i) => (
              <GalleryCard
                key={g.src}
                item={g}
                index={i}
                onOpen={() => setActive({ src: g.src, alt: g.alt })}
              />
            ))}
          </motion.div>
        </div>

        {/* Bottom drag/scroll hint */}
        <div className="relative px-6 md:px-12 pb-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 text-[10px] font-mono uppercase tracking-[0.3em] text-muted">
            <div className="flex items-center gap-3">
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                ←
              </motion.span>
              Scroll to advance
              <motion.span
                animate={{ x: [0, 6, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </div>
            <div>Click any frame to open</div>
          </div>
          {/* Track progress bar */}
          <div className="max-w-7xl mx-auto mt-4 h-[2px] bg-border overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-saffron via-accent to-india-green origin-left"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>

      <Lightbox
        src={active?.src ?? null}
        alt={active?.alt ?? ""}
        onClose={() => setActive(null)}
      />
    </section>
  );
}

function GalleryCard({
  item,
  index,
  onOpen,
}: {
  item: (typeof gallery)[number];
  index: number;
  onOpen: () => void;
}) {
  // Vary widths and heights based on aspect for an editorial mix
  const widthClass =
    item.aspect === "landscape"
      ? "w-[78vw] sm:w-[62vw] md:w-[48vw] lg:w-[40vw]"
      : item.aspect === "portrait"
        ? "w-[60vw] sm:w-[44vw] md:w-[30vw] lg:w-[26vw]"
        : "w-[68vw] sm:w-[50vw] md:w-[36vw] lg:w-[32vw]";
  const aspectStyle =
    item.aspect === "landscape"
      ? { aspectRatio: "16/10" }
      : item.aspect === "portrait"
        ? { aspectRatio: "3/4" }
        : { aspectRatio: "1/1" };

  // Slight vertical offset on alternating cards for "scattered" feel
  const yOffset = index % 3 === 0 ? "translate-y-0" : index % 3 === 1 ? "-translate-y-6" : "translate-y-6";

  return (
    <motion.button
      type="button"
      onClick={onOpen}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className={`relative shrink-0 ${widthClass} ${yOffset} text-left group`}
    >
      {/* Top caption */}
      <div className="flex items-baseline justify-between mb-3 px-1">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted group-hover:text-saffron transition-colors">
          {String(index + 1).padStart(2, "0")} · {item.caption}
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-saffron">
          {item.year}
        </div>
      </div>

      {/* Image card */}
      <div
        className="relative overflow-hidden border border-border group-hover:border-saffron/50 transition-colors"
        style={aspectStyle}
      >
        <Image
          src={item.src}
          alt={item.alt}
          fill
          className="object-cover transition-transform duration-1000 group-hover:scale-105"
          sizes="(min-width: 1024px) 40vw, 60vw"
          unoptimized
        />
        {/* Bottom gradient + caption */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-between gap-3">
          <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-white-soft/80">
            {item.alt}
          </div>
          <div className="text-saffron text-xl">↗</div>
        </div>
      </div>

      {/* Bottom caption */}
      <div className="mt-3 px-1 flex items-center gap-3">
        <span className="w-6 h-px bg-saffron" />
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted">
          {item.aspect}
        </span>
      </div>
    </motion.button>
  );
}
