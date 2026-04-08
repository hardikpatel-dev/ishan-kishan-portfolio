"use client";
import { motion } from "framer-motion";
import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";
import { bio } from "@/lib/data/bio";
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

export function Footer() {
  return (
    <footer
      id="contact"
      className="relative border-t border-border bg-bg overflow-hidden"
    >
      {/* Background big "CONTACT" wordmark */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 pointer-events-none select-none text-center font-heavy uppercase text-white-soft/[0.04] leading-[0.78] tracking-[-0.04em] whitespace-nowrap"
      >
        <span style={{ fontSize: "clamp(8rem, 22vw, 22rem)" }}>Contact</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-24 md:pt-32 pb-10">
        {/* Big editorial CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 md:mb-32"
        >
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-4">
            <span className="text-muted">— 09</span>
            <span className="text-saffron">Get in touch</span>
          </div>
          <h2
            className="font-heavy uppercase text-white-soft leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(3rem, 11vw, 12rem)" }}
          >
            Let&apos;s talk
            <br />
            <span className="text-saffron italic">cricket.</span>
          </h2>
          <Tricolor className="mt-8" />
          <p className="text-muted mt-8 max-w-md leading-relaxed text-base md:text-lg">
            Press, partnerships, or just a few kind words — find me on the
            handles below.
          </p>

          {/* Big email CTA */}
          <motion.a
            href="mailto:hello@ishankishan.example"
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="mt-10 inline-flex items-center gap-4 group"
          >
            <span
              className="font-heavy uppercase text-white-soft group-hover:text-saffron transition-colors leading-none tracking-tight"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2.4rem)" }}
            >
              hello@ishankishan.in
            </span>
            <motion.span
              animate={{ x: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="text-saffron text-2xl"
            >
              ↗
            </motion.span>
          </motion.a>
        </motion.div>

        {/* Footer columns */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-16 pb-16 border-b border-border"
        >
          {/* Logo + brand */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
            className="col-span-2"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="relative inline-flex">
                <span className="absolute inset-0 rounded-full bg-saffron/15 blur-xl" />
                <Logo size={52} className="relative text-white-soft" />
              </span>
              <div>
                <div className="font-heavy uppercase text-white-soft text-lg tracking-tight">
                  Ishan<span className="text-saffron">.K</span>
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                  #23 · WK · BAT
                </div>
              </div>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-xs">
              Left hand. Loud heart. Patna to the India jersey — and every step
              in between.
            </p>
          </motion.div>

          {/* Pages */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-5">
              Pages
            </div>
            <ul className="space-y-2">
              {NAV.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="font-heavy uppercase text-text/70 hover:text-saffron transition-colors text-sm tracking-tight"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Socials */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-5">
              Follow on
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href={bio.socials.instagram}
                  className="group flex items-center gap-2 font-heavy uppercase text-text/70 hover:text-saffron transition-colors text-sm tracking-tight"
                >
                  <FaInstagram className="text-saffron" />
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={bio.socials.twitter}
                  className="group flex items-center gap-2 font-heavy uppercase text-text/70 hover:text-saffron transition-colors text-sm tracking-tight"
                >
                  <FaXTwitter className="text-saffron" />
                  X / Twitter
                </a>
              </li>
              <li>
                <a
                  href={bio.socials.facebook}
                  className="group flex items-center gap-2 font-heavy uppercase text-text/70 hover:text-saffron transition-colors text-sm tracking-tight"
                >
                  <FaFacebook className="text-saffron" />
                  Facebook
                </a>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom legal row */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted/70">
            <span>© {new Date().getFullYear()} Ishan Kishan</span>
            <span className="text-muted/40">·</span>
            <span>Portfolio concept</span>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted/50 max-w-md text-right">
            Design project · not officially affiliated with Ishan Kishan, BCCI,
            or Mumbai Indians.
          </div>
        </div>
      </div>
    </footer>
  );
}
