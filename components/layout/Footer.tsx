"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";
import { bio } from "@/lib/data/bio";
import { BallIcon } from "@/components/brand/CricketIcons";
import { Logo } from "@/components/brand/Logo";
import { Tricolor } from "@/components/brand/Tricolor";

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
  const wordSize = "clamp(4rem, 14vw, 22rem)";

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

      <div className="relative mx-auto max-w-9xl px-5 sm:px-6 md:px-10 pt-24 sm:pt-32 md:pt-40 pb-8">
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
            className="mt-8 group inline-flex max-w-full items-center gap-3 sm:gap-5"
          >
            <span
              className="font-heavy uppercase text-white-soft group-hover:text-saffron transition-colors duration-500 leading-none tracking-tight break-all text-center"
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
          className="mt-16 sm:mt-24 grid grid-cols-1 min-[420px]:grid-cols-2 gap-10 sm:gap-20 max-w-2xl mx-auto text-center"
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
            className="group inline-flex w-full justify-center items-center gap-4 px-7 py-4 sm:w-auto sm:px-10 sm:py-5 rounded-full bg-saffron text-bg font-heavy uppercase tracking-[0.15em] text-xs sm:text-sm hover:bg-white-soft transition-colors duration-400"
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
          <div className="grid grid-cols-2 min-[540px]:flex min-[540px]:flex-wrap items-center justify-center gap-x-5 sm:gap-x-12 gap-y-3 sm:gap-y-4">
            {TEAMS.map((t) => (
              <motion.span
                key={t}
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="font-heavy uppercase text-white-soft/55 hover:text-saffron transition-colors cursor-default text-center text-[11px] sm:text-base tracking-wider whitespace-nowrap"
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
          className="mt-14 sm:mt-20 flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 sm:gap-6 pb-44 sm:pb-52 md:pb-56"
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

          <div className="flex flex-col sm:items-end items-center gap-2 text-center sm:text-right max-w-md">
            <div className="flex flex-wrap items-center justify-center sm:justify-end gap-x-3 gap-y-1 text-[10px] font-mono uppercase tracking-[0.3em] text-muted/70">
              <span>© {new Date().getFullYear()} Ishan Kishan</span>
              <span className="text-muted/40">·</span>
              <span>Portfolio concept</span>
            </div>
            <div className="text-[9px] font-mono uppercase tracking-[0.22em] text-muted/50 max-w-[22rem] sm:max-w-md">
              Design project · not officially affiliated with Ishan Kishan,
              BCCI, or Mumbai Indians.
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        aria-hidden
        style={{ x: wordX, opacity: wordOpacity }}
        className="absolute -left-6 sm:-left-10 -bottom-1 sm:-bottom-4 md:-bottom-8 pointer-events-none select-none text-center leading-[0.78] tracking-[-0.04em]"
      >
        <div className="relative inline-flex max-w-full items-center whitespace-nowrap">
          <motion.div
            animate={{ scale: [0.96, 1.04, 0.96], rotate: [0, 16, 0] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-[11.5%] top-[8%] flex h-[0.72em] w-[0.72em] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white-soft/25 bg-gradient-to-br from-saffron/85 via-accent/80 to-mi-blue/80 text-white-soft/90 shadow-[0_0_28px_rgba(91,140,255,0.28)]"
            style={{ fontSize: wordSize }}
          >
            <BallIcon size={18} className="opacity-80" />
          </motion.div>

          <span
            className="absolute inset-x-[11%] bottom-[20%] h-[0.08em] rounded-full bg-gradient-to-r from-saffron/0 via-white-soft/75 to-india-green/70 blur-[2px]"
            style={{ fontSize: wordSize }}
          />
          <span
            className="absolute -left-[3%] top-[14%] h-[0.22em] w-[0.22em] rounded-full bg-saffron/85 blur-[2px]"
            style={{ fontSize: wordSize }}
          />
          <span
            className="absolute right-[6%] top-[10%] h-[0.18em] w-[0.18em] rounded-full bg-accent/85 blur-[2px]"
            style={{ fontSize: wordSize }}
          />

          <span
            className="inline-block font-heavy uppercase whitespace-nowrap"
            style={{ fontSize: wordSize }}
          >
            <span className="text-white-soft/[0.18]">P</span>
            <span className="text-white-soft/[0.18]">O</span>
            <span className="text-white-soft/[0.18]">W</span>
            <span className="text-white-soft/[0.18]">E</span>
            <span className="text-white-soft/[0.18]">R</span>
            <span className="text-white-soft/[0.18]">P</span>
            <span className="text-white-soft/[0.18]">L</span>
            <span className="text-white-soft/[0.18]">A</span>
            <span className="text-white-soft/[0.18]">Y</span>
          </span>
        </div>
      </motion.div>
    </footer>
  );
}
