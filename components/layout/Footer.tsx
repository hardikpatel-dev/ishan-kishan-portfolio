"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";
import { bio } from "@/lib/data/bio";
import { Logo } from "@/components/brand/Logo";
import { Tricolor } from "@/components/brand/Tricolor";

/**
 * Footer — Lando-inspired editorial layout, adapted to the cricket theme.
 *
 * Structure (top → bottom)
 *   1. Section label      — "— 09  / GET IN TOUCH"
 *   2. Hero heading       — "Always bringing the fight" equivalent: "LET'S TALK CRICKET."
 *                           (white + italic saffron) centered
 *   3. Tricolor rule
 *   4. Supporting copy + big email CTA
 *   5. Two-column nav grid (PAGES | FOLLOW ON)  — centered under the heading
 *   6. Call-to-action pill button "BUSINESS ENQUIRIES ↗"
 *   7. Sponsors / teams marquee row (colours worn)
 *   8. Baseline wordmark "CONTACT" — clipped at bottom as a ghost flourish,
 *      positioned so it NEVER overlaps the content above it.
 *   9. Legal row (© + disclaimer)
 *
 * The overlapping `CONTACT` wordmark has been removed; instead a wordmark
 * sits OUTSIDE the content grid flow, at the very bottom, clipped by the
 * section boundary.
 */

const NAV = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#journey", label: "Journey" },
  { href: "#stats", label: "Stats" },
  { href: "#moments", label: "Moments" },
  { href: "#teams", label: "Teams" },
  { href: "#gallery", label: "Gallery" },
  { href: "#news", label: "News" },
];

const TEAMS = ["India", "Mumbai Indians", "Jharkhand", "India A", "India U-19"];

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  // Wordmark parallax — gently drifts as the footer enters view
  const wordX = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  const wordOpacity = useTransform(scrollYProgress, [0, 0.3, 1], [0, 1, 1]);

  return (
    <footer
      ref={ref}
      id="contact"
      className="relative border-t border-border bg-bg overflow-hidden"
    >
      {/* Soft saffron glow — anchors the composition warmly */}
      <div
        aria-hidden
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[50rem] h-[50rem] rounded-full bg-saffron/[0.05] blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-9xl px-6 md:px-10 pt-24 sm:pt-32 md:pt-40 pb-8">
        {/* ─── 1. Section label ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-6"
        >
          <span className="w-8 h-px bg-saffron/60" />
          <span className="text-muted">— 09</span>
          <span className="text-saffron">Get in touch</span>
          <span className="w-8 h-px bg-saffron/60" />
        </motion.div>

        {/* ─── 2. Hero heading — centered, oversized ───────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-heavy uppercase text-white-soft leading-[0.85] tracking-tight"
          style={{ fontSize: "clamp(2.8rem, 10vw, 10rem)" }}
        >
          Let&apos;s talk{" "}
          <span className="text-saffron italic">cricket.</span>
        </motion.h2>

        {/* ─── 3. Tricolor rule (centered) ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex justify-center"
        >
          <Tricolor />
        </motion.div>

        {/* ─── 4. Supporting copy + email CTA ──────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
          }}
          className="mt-10 flex flex-col items-center text-center"
        >
          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted max-w-lg leading-relaxed text-sm sm:text-base font-mono"
          >
            Press, partnerships, or just a few kind words — find me on the
            handles below.
          </motion.p>

          <motion.a
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            href="mailto:hello@ishankishan.in"
            whileHover={{ scale: 1.02 }}
            className="mt-8 group inline-flex items-center gap-3 sm:gap-5"
          >
            <span
              className="font-heavy uppercase text-white-soft group-hover:text-saffron transition-colors duration-500 leading-none tracking-tight"
              style={{ fontSize: "clamp(1.2rem, 3vw, 2.4rem)" }}
            >
              hello@ishankishan.in
            </span>
            <motion.span
              className="inline-flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-saffron/60 text-saffron group-hover:bg-saffron group-hover:text-bg transition-colors duration-500"
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
            </motion.span>
          </motion.a>
        </motion.div>

        {/* ─── 5. Two-column nav grid ─ Pages | Follow on ──────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
          }}
          className="mt-16 sm:mt-24 grid grid-cols-2 gap-10 sm:gap-20 max-w-2xl mx-auto text-center"
        >
          {/* Pages */}
          <div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-5"
            >
              Pages
            </motion.div>
            <ul className="space-y-2">
              {NAV.map((l) => (
                <motion.li
                  key={l.href}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={l.href}
                    className="font-heavy uppercase text-white-soft/80 hover:text-saffron transition-colors text-base sm:text-lg tracking-tight"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Follow on */}
          <div>
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 15 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-5"
            >
              Follow on
            </motion.div>
            <ul className="space-y-2">
              {[
                { href: bio.socials.instagram, label: "Instagram", Icon: FaInstagram },
                { href: bio.socials.twitter, label: "X / Twitter", Icon: FaXTwitter },
                { href: bio.socials.facebook, label: "Facebook", Icon: FaFacebook },
              ].map(({ href, label, Icon }) => (
                <motion.li
                  key={label}
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2 font-heavy uppercase text-white-soft/80 hover:text-saffron transition-colors text-base sm:text-lg tracking-tight"
                  >
                    <Icon className="text-saffron" />
                    {label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* ─── 6. Big CTA pill button ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 sm:mt-20 flex justify-center"
        >
          <motion.a
            href="mailto:hello@ishankishan.in"
            whileHover={{ y: -3 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="group inline-flex items-center gap-4 px-7 py-4 sm:px-10 sm:py-5 rounded-full bg-saffron text-bg font-heavy uppercase tracking-[0.15em] text-xs sm:text-sm hover:bg-white-soft transition-colors duration-400"
          >
            Business enquiries
            <motion.span
              className="inline-flex"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </motion.a>
        </motion.div>

        {/* ─── 7. Sponsors / teams marquee row ─────────────────── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
          }}
          className="mt-20 sm:mt-28 border-t border-b border-border/60 py-6 sm:py-8"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 10 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-center text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-4 sm:mb-5"
          >
            Colours worn
          </motion.div>
          <div className="flex flex-wrap items-center justify-center gap-x-6 sm:gap-x-12 gap-y-3">
            {TEAMS.map((t) => (
              <motion.span
                key={t}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-heavy uppercase text-white-soft/55 hover:text-saffron transition-colors cursor-default text-xs sm:text-base tracking-wider whitespace-nowrap"
              >
                {t}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* ─── 8. Brand block + legal row ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 pb-36 sm:pb-48 md:pb-56"
        >
          <div className="flex items-center gap-4">
            <span className="relative inline-flex">
              <span className="absolute inset-0 rounded-full bg-saffron/15 blur-xl" />
              <Logo size={44} className="relative text-white-soft" />
            </span>
            <div>
              <div className="font-heavy uppercase text-white-soft text-base tracking-tight">
                Ishan<span className="text-saffron">.K</span>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                #23 · WK · BAT
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:items-end items-center gap-2 text-center sm:text-right">
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] text-muted/70">
              <span>© {new Date().getFullYear()} Ishan Kishan</span>
              <span className="text-muted/40">·</span>
              <span>Portfolio concept</span>
            </div>
            <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-muted/50 max-w-md">
              Design project · not officially affiliated with Ishan Kishan,
              BCCI, or Mumbai Indians.
            </div>
          </div>
        </motion.div>
      </div>

      {/*
        9. Baseline CONTACT wordmark — sits OUTSIDE the content flow at the
        very bottom of the section, clipped by the section's overflow-hidden.
        This gives the editorial flourish without overlapping content above
        (the pb-48/pb-56 above reserves the vertical space for this to appear).
      */}
      <motion.div
        aria-hidden
        style={{ x: wordX, opacity: wordOpacity }}
        className="absolute inset-x-0 -bottom-6 sm:-bottom-10 md:-bottom-16 pointer-events-none select-none text-center leading-[0.78] tracking-[-0.04em]"
      >
        <span
          className="inline-block font-heavy uppercase text-white-soft/[0.05] whitespace-nowrap"
          style={{ fontSize: "clamp(6rem, 22vw, 22rem)" }}
        >
          Contact
        </span>
      </motion.div>
    </footer>
  );
}
