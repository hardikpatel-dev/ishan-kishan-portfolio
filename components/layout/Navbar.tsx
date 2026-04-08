"use client";
import { useState, useEffect } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Logo } from "@/components/brand/Logo";
import { FullscreenMenu } from "./FullscreenMenu";

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [last, setLast] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState<string>("");

  useMotionValueEvent(scrollY, "change", (y) => {
    if (y > last && y > 200) setHidden(true);
    else setHidden(false);
    setLast(y);
  });

  // IST clock
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
      const h = ist.getHours();
      const m = ist.getMinutes().toString().padStart(2, "0");
      const ampm = h >= 12 ? "PM" : "AM";
      const h12 = h % 12 || 12;
      setTime(`${h12}:${m} ${ampm}`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: hidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-[80] mix-blend-difference"
      >
        {/* Edge-to-edge full width — no max-w container */}
        <div className="w-full px-6 md:px-10 lg:px-14 py-5 md:py-7 flex items-center justify-between gap-4">
          {/* LEFT — animated logo, prominent */}
          <a
            href="#top"
            className="flex items-center gap-4 group shrink-0"
            aria-label="Home"
          >
            {/* Logo with a subtle pulsing glow scoped JUST to the logo (not the link) */}
            <span className="relative inline-flex">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-saffron/15 blur-xl group-hover:bg-saffron/35 transition-colors"
                animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.85, 0.5] }}
                transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <Logo size={48} className="relative text-white-soft group-hover:text-saffron transition-colors" />
            </span>
            {/* Wordmark beside the logo */}
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="font-heavy text-white-soft text-base tracking-tight uppercase">
                Ishan<span className="text-saffron">.K</span>
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white-soft/55">
                Portfolio · 26
              </span>
            </div>
          </a>

          {/* CENTER — running ticker (subtle, hidden on small) */}
          <div className="hidden lg:flex items-center gap-6 text-[10px] font-mono uppercase tracking-[0.3em] text-white-soft/55">
            <span className="h-px w-12 bg-white-soft/30" />
            <motion.span
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              210* vs BAN — fastest Indian ODI double
            </motion.span>
            <span className="h-px w-12 bg-white-soft/30" />
          </div>

          {/* RIGHT — status / time / CTA / hamburger */}
          <div className="flex items-center gap-4 md:gap-7 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-white-soft">
            <div className="hidden md:flex items-center gap-2">
              <motion.span
                className="w-[6px] h-[6px] rounded-full bg-india-green"
                animate={{ opacity: [1, 0.35, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="flex flex-col leading-tight">
                <span>Active / #23</span>
                <span className="text-white-soft/60">In Form 2026</span>
              </span>
            </div>

            <div className="hidden md:flex flex-col leading-tight">
              <span>{time || "— : —"}</span>
              <span className="text-white-soft/60">(IST)</span>
            </div>

            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white-soft/40 hover:border-saffron hover:text-saffron transition-colors"
            >
              Let&apos;s Talk
            </motion.a>

            <motion.button
              onClick={() => setMenuOpen(true)}
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              aria-label="Open menu"
              className="w-12 h-12 rounded-full border border-white-soft/40 flex items-center justify-center hover:border-saffron hover:text-saffron transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path d="M 0 3 L 14 3 M 0 11 L 14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
