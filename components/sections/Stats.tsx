"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { stats, type FormatStats } from "@/lib/data/stats";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { Tricolor } from "@/components/brand/Tricolor";
import { AnimatedBg } from "@/components/ui/AnimatedBg";
import { StatsBarChart } from "./StatsBarChart";
import { TrophyIcon, BatIcon, BallIcon } from "@/components/brand/CricketIcons";

type FormatId = keyof typeof stats;

const FORMATS: { id: FormatId; label: string; caption: string }[] = [
  { id: "ipl", label: "IPL", caption: "Indian Premier League" },
  { id: "odi", label: "ODI", caption: "One Day International" },
  { id: "t20i", label: "T20I", caption: "Twenty20 International" },
  { id: "test", label: "Test", caption: "Test Match Cricket" },
];

export function Stats() {
  const [active, setActive] = useState<FormatId>("ipl");
  const data = stats[active];

  return (
    <section id="stats" className="relative py-32 md:py-48 bg-bg overflow-hidden">
      <AnimatedBg
        blobs={[
          {
            className:
              "absolute top-0 left-1/4 w-[36rem] h-[36rem] rounded-full bg-saffron/[0.07] blur-3xl",
            duration: 24,
            x: [0, -40, 0],
            y: [0, 50, 0],
          },
          {
            className:
              "absolute bottom-0 right-0 w-[34rem] h-[34rem] rounded-full bg-accent/[0.08] blur-3xl",
            duration: 28,
            x: [0, 50, 0],
            y: [0, -40, 0],
          },
          {
            className:
              "absolute top-1/2 -left-40 w-[28rem] h-[28rem] rounded-full bg-mi-blue/[0.1] blur-3xl",
            duration: 30,
            x: [0, 30, 0],
            y: [0, 30, 0],
          },
        ]}
      />

      <div className="relative mx-auto max-w-9xl px-6">
        <SectionHeading
          number="04"
          eyebrow="Career stats"
          title="The numbers, on the record."
          subtitle="Bat in hand. Numbers don't talk back."
        />
        <Tricolor className="mb-16" />

        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          {/* LEFT — vertical format selector with HUGE labels */}
          <FormatSelector active={active} onChange={setActive} />

          {/* RIGHT — animated stat content */}
          <div className="md:col-span-9">
            <AnimatePresence mode="wait">
              <StatContent key={active} data={data} format={active} />
            </AnimatePresence>
          </div>
        </div>

        {/* FULL-WIDTH bar chart */}
        <div className="mt-24 md:mt-32">
          <StatsBarChart />
        </div>

        {/* SIGNATURE HIGHLIGHT BANNER */}
        <SignatureHighlight />
      </div>
    </section>
  );
}

/* =====================  FORMAT SELECTOR  ===================== */

function FormatSelector({
  active,
  onChange,
}: {
  active: FormatId;
  onChange: (id: FormatId) => void;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
      className="md:col-span-3"
    >
      <motion.div
        variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
        className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-6 flex items-center gap-3"
      >
        <span className="w-6 h-px bg-saffron" />
        Format
      </motion.div>
      <ul className="space-y-1">
        {FORMATS.map((f) => {
          const isActive = f.id === active;
          return (
            <motion.li
              key={f.id}
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
            >
              <button
                onClick={() => onChange(f.id)}
                className="group w-full text-left py-3 relative"
              >
                <div className="flex items-baseline gap-3">
                  {isActive && (
                    <motion.span
                      layoutId="format-marker"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-saffron rounded-full"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <span
                    className={`pl-4 font-heavy uppercase tracking-tight transition-colors ${
                      isActive ? "text-saffron" : "text-text/40 group-hover:text-text/80"
                    }`}
                    style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", lineHeight: 0.95 }}
                  >
                    {f.label}
                  </span>
                </div>
                <span
                  className={`block pl-4 mt-1 text-[10px] font-mono uppercase tracking-[0.25em] transition-colors ${
                    isActive ? "text-text/70" : "text-muted/50"
                  }`}
                >
                  {f.caption}
                </span>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </motion.div>
  );
}

/* =====================  STAT CONTENT  ===================== */

function StatContent({ data, format }: { data: FormatStats; format: FormatId }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* MEGA STAT — RUNS */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
        }}
        className="border-t border-b border-border py-10 md:py-14 relative overflow-hidden"
      >
        {/* Huge background label */}
        <div
          aria-hidden
          className="absolute -right-6 top-1/2 -translate-y-1/2 font-heavy uppercase text-text/[0.04] leading-none tracking-[-0.04em] pointer-events-none select-none whitespace-nowrap"
          style={{ fontSize: "clamp(8rem, 14vw, 14rem)" }}
        >
          {format}
        </div>

        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-saffron mb-3"
        >
          <BatIcon size={14} />
          Total Runs
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
          className="font-heavy text-white-soft leading-[0.85] tracking-[-0.04em]"
          style={{ fontSize: "clamp(5rem, 14vw, 12rem)" }}
        >
          <Counter to={data.runs} />
        </motion.div>
        <motion.div
          variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
          className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] font-mono uppercase tracking-[0.25em] text-muted"
        >
          <span className="flex items-center gap-2">
            <span className="w-6 h-px bg-saffron" />
            <span className="text-text/80">{data.matches}</span> matches
          </span>
          <span>
            Debut <span className="text-text/80">{data.debut}</span>
          </span>
          <span>
            Highest <span className="text-saffron font-heavy text-base">{data.hs}</span>
          </span>
        </motion.div>
      </motion.div>

      {/* SECONDARY STAT GRID */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.08, delayChildren: 0.35 } },
        }}
        className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-8"
      >
        {[
          { label: "Average", value: data.avg, decimals: 2, accent: "saffron" },
          { label: "Strike Rate", value: data.sr, decimals: 2, accent: "accent" },
          { label: "Fifties", value: data.fifties, decimals: 0, accent: "white-soft" },
          { label: "Hundreds", value: data.hundreds, decimals: 0, accent: "india-green" },
        ].map((s) => (
          <motion.div
            key={s.label}
            variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group relative overflow-hidden border border-border bg-surface/40 backdrop-blur-sm p-6 hover:border-saffron/50 transition-colors"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(255,153,51,0.6), transparent 70%)",
              }}
            />
            <div className="relative">
              <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted">
                {s.label}
              </div>
              <div
                className="font-heavy text-white-soft leading-none mt-3 tracking-tight"
                style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)" }}
              >
                <Counter to={s.value} decimals={s.decimals} />
              </div>
              {/* tricolor underline */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: "left" }}
                className="mt-5 h-[3px] w-full bg-gradient-to-r from-saffron via-accent to-india-green"
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* =====================  SIGNATURE HIGHLIGHT  ===================== */

function SignatureHighlight() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="mt-20 md:mt-24 relative overflow-hidden border border-saffron/30 bg-gradient-to-br from-saffron/[0.08] via-bg to-mi-blue/[0.08] p-8 md:p-12"
    >
      {/*
        Background "210" ghost number — anchored to the middle-right area
        but clamped to never collide with the strike rate stat column.
        Explicit -z-10 + -right offset keeps it strictly behind the content
        grid, and a lower opacity turns it into a textural ghost instead of
        competing text.
      */}
      <div
        aria-hidden
        className="absolute right-[6%] top-1/2 -translate-y-1/2 md:right-[18%] font-heavy text-saffron/[0.04] leading-none tracking-[-0.04em] pointer-events-none select-none -z-10"
        style={{ fontSize: "clamp(6rem, 13vw, 13rem)" }}
      >
        210
      </div>
      <div className="relative z-10 grid md:grid-cols-[auto,1fr,auto] gap-6 md:gap-12 items-center">
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-16 rounded-full border-2 border-saffron flex items-center justify-center shrink-0"
        >
          <TrophyIcon size={28} className="text-saffron" />
        </motion.div>
        <div>
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-saffron mb-2">
            ★ Signature innings
          </div>
          <h3
            className="font-heavy uppercase text-white-soft leading-[0.95] tracking-tight"
            style={{ fontSize: "clamp(1.8rem, 3vw, 2.6rem)" }}
          >
            Fastest ODI double century
            <br />
            <span className="text-saffron">by an Indian.</span>
          </h3>
          <p className="text-muted mt-3 text-sm md:text-base font-mono">
            210<span className="text-saffron">*</span> off 131 balls · vs Bangladesh ·
            Chattogram, 2022
          </p>
        </div>
        <div className="hidden md:flex flex-col items-end gap-3 shrink-0 relative bg-bg/60 backdrop-blur-sm pl-6 pr-2 py-2 border-l border-saffron/40">
          <BallIcon size={32} className="text-saffron/70" />
          <div className="text-right">
            <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-muted">
              Strike Rate
            </div>
            <div className="font-heavy text-white-soft text-3xl leading-none">
              160.30
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
