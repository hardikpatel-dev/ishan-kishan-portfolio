"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { journey, type Milestone } from "@/lib/data/journey";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedBg } from "@/components/ui/AnimatedBg";
import { BallIcon } from "@/components/brand/CricketIcons";

/**
 * Journey — editorial scroll-cinematic timeline.
 *
 * Each milestone is a "chapter" alternating left/right with:
 *   - HUGE background year number (Archivo Black, low opacity, parallax scale)
 *   - Parallax image card with chapter index + tag
 *   - First-person headline + tricolor underline + description
 *   - Step progress indicator
 *
 * Scroll triggers:
 *   - Center vertical line fills as section scrolls into view
 *   - Each chapter fades + slides in on whileInView
 *   - Each image has its own internal y-parallax
 *   - Big year number fades + scales independently
 */
export function Journey() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      id="journey"
      className="relative py-32 md:py-48 bg-bg overflow-hidden"
    >
      <AnimatedBg
        blobs={[
          {
            className: "absolute top-20 -left-40 w-[40rem] h-[40rem] rounded-full bg-saffron/[0.06] blur-3xl",
            duration: 24,
            x: [0, 50, 0],
            y: [0, 40, 0],
          },
          {
            className: "absolute top-1/2 -right-40 w-[36rem] h-[36rem] rounded-full bg-mi-blue/[0.1] blur-3xl",
            duration: 28,
            x: [0, -40, 0],
            y: [0, 60, 0],
          },
          {
            className: "absolute bottom-0 left-1/3 w-[32rem] h-[32rem] rounded-full bg-accent/[0.08] blur-3xl",
            duration: 30,
            x: [0, 30, 0],
            y: [0, -30, 0],
          },
        ]}
      />

      <div className="relative mx-auto max-w-6xl px-6 mb-24 md:mb-32">
        <SectionHeading
          number="03"
          eyebrow="My journey"
          title="From Patna to the India jersey."
          subtitle="Every milestone, every step, every bat grip that got heavier before it got lighter."
        />
      </div>

      {/* Spine — vertical scroll-progress line */}
      <div className="relative mx-auto max-w-9xl px-6">
        <div
          aria-hidden
          className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2 hidden md:block"
        />
        <motion.div
          aria-hidden
          style={{ height: lineHeight }}
          className="absolute left-1/2 top-0 w-px bg-gradient-to-b from-saffron via-accent to-india-green -translate-x-1/2 hidden md:block"
        />

        {/* Chapters */}
        <ul className="relative space-y-32 md:space-y-44">
          {journey.map((m, i) => (
            <Chapter key={m.year} milestone={m} index={i} total={journey.length} />
          ))}
        </ul>
      </div>

      {/* End cap */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-4xl px-6 mt-32 text-center"
      >
        <div className="inline-flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.4em] text-muted">
          <span className="w-12 h-px bg-saffron" />
          To be continued
          <span className="w-12 h-px bg-saffron" />
        </div>
        <p className="mt-6 font-display italic text-2xl md:text-3xl text-text/70 max-w-2xl mx-auto">
          &ldquo;The bat is heavier on the days that matter. So you train for those days.&rdquo;
        </p>
      </motion.div>
    </section>
  );
}

function Chapter({
  milestone,
  index,
  total,
}: {
  milestone: Milestone;
  index: number;
  total: number;
}) {
  const isLeft = index % 2 === 0;
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const yearScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 1, 1.05]);
  const yearOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.07, 0.07, 0]);

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-120px" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      {/* Center marker on the spine */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 hidden md:flex"
      >
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="w-10 h-10 rounded-full bg-bg border-2 border-saffron items-center justify-center flex"
        >
          <BallIcon size={16} className="text-saffron" />
        </motion.div>
      </div>

      {/* HUGE background year number */}
      <motion.div
        aria-hidden
        style={{ scale: yearScale, opacity: yearOpacity }}
        className={`absolute pointer-events-none select-none top-1/2 -translate-y-1/2 font-heavy uppercase text-white-soft leading-none tracking-[-0.04em] ${
          isLeft ? "right-0 md:right-8" : "left-0 md:left-8"
        }`}
      >
        <span style={{ fontSize: "clamp(8rem, 22vw, 22rem)" }}>{milestone.year}</span>
      </motion.div>

      <div
        className={`relative grid md:grid-cols-2 gap-10 md:gap-20 items-center ${
          !isLeft
            ? "md:[&>*:first-child]:col-start-2 md:[&>*:first-child]:row-start-1"
            : ""
        }`}
      >
        {/* IMAGE CARD */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] md:aspect-[3/4] rounded-sm overflow-hidden border border-border group"
        >
          <motion.div style={{ y: imgY }} className="absolute -inset-y-[14%] inset-x-0">
            <Image
              src={milestone.image}
              alt={milestone.title}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(min-width: 768px) 40vw, 90vw"
              unoptimized
            />
          </motion.div>
          {/* Chapter index badge */}
          <div className="absolute top-4 left-4 z-10 bg-bg/85 backdrop-blur-sm border border-saffron/40 px-3 py-1.5 rounded-sm">
            <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-saffron">
              Chapter {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </div>
          </div>
          {/* Bottom gradient */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-bg via-bg/60 to-transparent" />
          {/* Tag at bottom */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white-soft/70 mb-1">
              {milestone.tag}
            </div>
            <div className="font-heavy text-saffron text-3xl tracking-tight uppercase">
              {milestone.year}
            </div>
          </div>
        </motion.div>

        {/* CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className={isLeft ? "md:pl-8" : "md:pr-8"}
        >
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-4">
            <span className="text-saffron">{milestone.year}</span>
            <span className="w-8 h-px bg-saffron/40" />
            <span>{milestone.tag}</span>
          </div>
          <h3 className="font-display text-3xl md:text-5xl text-text leading-[1.05] tracking-tight">
            {milestone.title}
          </h3>
          {/* Tricolor underline */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: "left" }}
            className="mt-6 h-[2px] w-32 bg-gradient-to-r from-saffron via-white-soft to-india-green"
          />
          <p className="text-muted mt-6 leading-relaxed text-base md:text-lg max-w-md">
            {milestone.description}
          </p>
          {/* Step indicator */}
          <div className="mt-8 flex items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
              Step {String(index + 1).padStart(2, "0")}
            </span>
            <div className="flex gap-1">
              {Array.from({ length: total }).map((_, j) => (
                <span
                  key={j}
                  className={`h-[2px] w-4 ${j <= index ? "bg-saffron" : "bg-border"}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.li>
  );
}
