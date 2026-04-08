"use client";
import { motion } from "framer-motion";
import { runsPerYear } from "@/lib/data/stats";

export function StatsBarChart() {
  const max = Math.max(...runsPerYear.map((r) => r.runs));
  const total = runsPerYear.reduce((s, r) => s + r.runs, 0);
  const peakYear = runsPerYear.reduce((a, b) => (a.runs > b.runs ? a : b));

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden border border-border bg-surface/40 backdrop-blur-sm p-6 md:p-10"
    >
      {/* Header row */}
      <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
        <div>
          <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-saffron mb-2">
            <span className="w-6 h-px bg-saffron" />
            Runs by year
          </div>
          <h3
            className="font-heavy uppercase text-white-soft tracking-tight leading-[0.9]"
            style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.4rem)" }}
          >
            IPL — Year on year.
          </h3>
        </div>
        <div className="flex items-end gap-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
          <div>
            <div className="mb-1">Total</div>
            <div className="font-heavy text-white-soft text-2xl tracking-tight">
              {total.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="mb-1">Best year</div>
            <div className="font-heavy text-saffron text-2xl tracking-tight">
              {peakYear.year} · {peakYear.runs}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.07, delayChildren: 0.15 } },
        }}
        className="grid items-end gap-2 md:gap-4 h-56 md:h-72"
        style={{ gridTemplateColumns: `repeat(${runsPerYear.length}, minmax(0, 1fr))` }}
      >
        {runsPerYear.map((r) => {
          const isPeak = r.year === peakYear.year;
          return (
            <motion.div
              key={r.year}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              className="relative h-full flex flex-col items-center justify-end group"
            >
              {/* Value label on top */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className={`mb-2 font-mono text-[10px] md:text-xs tracking-tight ${
                  isPeak ? "text-saffron font-bold" : "text-muted"
                }`}
              >
                {r.runs}
              </motion.div>

              {/* Bar */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  height: `${(r.runs / max) * 100}%`,
                  transformOrigin: "bottom",
                }}
                className={`w-full rounded-t-sm relative overflow-hidden ${
                  isPeak
                    ? "bg-gradient-to-t from-saffron/30 via-saffron/70 to-saffron"
                    : "bg-gradient-to-t from-accent/20 via-accent/50 to-accent/90"
                }`}
              >
                {/* Inner highlight */}
                <div
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/20 to-transparent"
                />
                {/* Hover glow */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/10"
                />
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Year axis */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05, delayChildren: 0.4 } },
        }}
        className="grid mt-4 gap-2 md:gap-4 border-t border-border pt-3"
        style={{ gridTemplateColumns: `repeat(${runsPerYear.length}, minmax(0, 1fr))` }}
      >
        {runsPerYear.map((r) => {
          const isPeak = r.year === peakYear.year;
          return (
            <motion.div
              key={r.year}
              variants={{
                hidden: { opacity: 0, y: 8 },
                visible: { opacity: 1, y: 0 },
              }}
              className={`text-center font-mono text-[10px] md:text-xs uppercase tracking-tight ${
                isPeak ? "text-saffron" : "text-muted"
              }`}
            >
              {r.year}
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
