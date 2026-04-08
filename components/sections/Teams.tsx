"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { teams } from "@/lib/data/teams";
import { AnimatedBg } from "@/components/ui/AnimatedBg";
import { Tricolor } from "@/components/brand/Tricolor";
import { GloveIcon } from "@/components/brand/CricketIcons";

/**
 * Teams — bold editorial showcase.
 * - Vertical stacked list with HUGE team monograms
 * - On hover/active: a big preview panel on the right shows team details +
 *   accent gradient backdrop
 */
export function Teams() {
  const [active, setActive] = useState(0);
  const team = teams[active];

  return (
    <section
      id="teams"
      className="relative py-32 md:py-48 bg-bg overflow-hidden"
    >
      <AnimatedBg
        blobs={[
          {
            className:
              "absolute top-10 left-10 w-[32rem] h-[32rem] rounded-full bg-mi-blue/[0.12] blur-3xl",
            duration: 26,
            x: [0, 40, 0],
            y: [0, 30, 0],
          },
          {
            className:
              "absolute bottom-0 right-1/4 w-[32rem] h-[32rem] rounded-full bg-saffron/[0.08] blur-3xl",
            duration: 22,
            x: [0, -30, 0],
            y: [0, -40, 0],
          },
          {
            className:
              "absolute top-1/2 right-0 w-[28rem] h-[28rem] rounded-full bg-accent/[0.08] blur-3xl",
            duration: 30,
            x: [0, -40, 0],
            y: [0, 20, 0],
          },
        ]}
      />

      <div className="relative mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24 grid md:grid-cols-2 gap-8 items-end"
        >
          <div>
            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-3">
              <span className="text-muted">— 06</span>
              <span className="text-saffron">Teams</span>
            </div>
            <h2
              className="font-heavy uppercase text-white-soft leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
            >
              The jerseys
              <br />
              that <span className="text-saffron italic">made me.</span>
            </h2>
            <Tricolor className="mt-6" />
          </div>
          <p className="text-muted leading-relaxed max-w-sm font-mono text-sm md:justify-self-end md:text-right">
            From age-group cricket to the senior India dressing room — five
            jerseys, one career.
          </p>
        </motion.div>

        {/* Two-column showcase */}
        <div className="grid md:grid-cols-12 gap-8 md:gap-16">
          {/* LEFT — vertical team list */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08 } },
            }}
            className="md:col-span-7"
          >
            <ul>
              {teams.map((t, i) => {
                const isActive = i === active;
                return (
                  <motion.li
                    key={t.short}
                    variants={{
                      hidden: { opacity: 0, x: -30 },
                      visible: { opacity: 1, x: 0 },
                    }}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => setActive(i)}
                    className="group border-b border-border cursor-pointer relative"
                  >
                    {isActive && (
                      <motion.div
                        layoutId="team-active-bg"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: `linear-gradient(90deg, ${t.accent}22, transparent 80%)`,
                        }}
                      />
                    )}
                    <div className="relative grid grid-cols-[auto,1fr,auto] items-center gap-4 md:gap-8 py-6 md:py-8">
                      {/* Index */}
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted w-10">
                        0{i + 1}
                      </div>
                      {/* Big team name */}
                      <div>
                        <div
                          className={`font-heavy uppercase tracking-tight leading-[0.85] transition-colors ${
                            isActive ? "text-white-soft" : "text-text/30 group-hover:text-text/60"
                          }`}
                          style={{ fontSize: "clamp(1.8rem, 4vw, 3.4rem)" }}
                        >
                          {t.name}
                        </div>
                        <div
                          className={`mt-1 text-[10px] font-mono uppercase tracking-[0.25em] transition-colors ${
                            isActive ? "text-saffron" : "text-muted/50"
                          }`}
                        >
                          {t.years} · {t.role}
                        </div>
                      </div>
                      {/* Arrow */}
                      <motion.div
                        animate={{ x: isActive ? 0 : -10, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-saffron text-xl"
                      >
                        →
                      </motion.div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>

          {/* RIGHT — active team preview panel */}
          <div className="md:col-span-5">
            <div className="sticky top-32">
              <AnimatePresence mode="wait">
                <motion.div
                  key={team.short}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative aspect-[4/5] overflow-hidden border border-border bg-surface/40"
                  style={{
                    background: `linear-gradient(135deg, ${team.accent}33, var(--surface) 70%)`,
                  }}
                >
                  {/* Huge monogram */}
                  <div
                    aria-hidden
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    <span
                      className="font-heavy uppercase leading-none tracking-[-0.04em]"
                      style={{
                        fontSize: "clamp(8rem, 24vw, 18rem)",
                        color: team.accent,
                        opacity: 0.45,
                      }}
                    >
                      {team.short}
                    </span>
                  </div>

                  {/* Top label */}
                  <div className="absolute top-6 left-6 right-6 flex items-start justify-between">
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white-soft/70">
                        Currently active
                      </div>
                      <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-saffron mt-1">
                        Team 0{active + 1} / 05
                      </div>
                    </div>
                    <GloveIcon size={22} className="text-white-soft/70" />
                  </div>

                  {/* Bottom info */}
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-white-soft/70 mb-2">
                      {team.years}
                    </div>
                    <h3 className="font-heavy uppercase text-white-soft text-2xl md:text-3xl tracking-tight leading-[0.9]">
                      {team.name}
                    </h3>
                    <div className="mt-2 text-[11px] font-mono uppercase tracking-[0.2em] text-white-soft/70">
                      Role · {team.role}
                    </div>
                    <motion.div
                      key={team.short + "-bar"}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{ transformOrigin: "left" }}
                      className="mt-4 h-[2px] bg-gradient-to-r from-saffron via-white-soft to-india-green"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
