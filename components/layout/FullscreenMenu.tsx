"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { FaInstagram, FaXTwitter, FaFacebook } from "react-icons/fa6";
import { bio } from "@/lib/data/bio";

const links = [
  { href: "#top", label: "Home" },
  { href: "#journey", label: "Journey" },
  { href: "#stats", label: "Stats" },
  { href: "#contact", label: "Contact" },
];

export function FullscreenMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            onClick={onClose}
            className="fixed inset-0 z-[95] bg-bg/70 backdrop-blur-md"
          />

          {/* Panel sliding in from right */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 right-0 bottom-0 z-[96] w-full md:w-[44rem] max-w-full bg-bg border-l border-border flex flex-col"
          >
            {/* Header row of the panel */}
            <div className="flex items-center justify-between px-8 md:px-12 py-8">
              <div className="flex items-center gap-3">
                <motion.span
                  className="w-2 h-2 rounded-full bg-saffron"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity }}
                />
                <span className="font-mono text-xs uppercase tracking-[0.3em] text-white-soft">
                  Menu
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-white-soft hover:border-saffron hover:text-saffron transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M 2 2 L 14 14 M 14 2 L 2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 flex flex-col justify-center px-8 md:px-12">
              <motion.ul
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
                }}
                className="space-y-1"
              >
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    variants={{
                      hidden: { opacity: 0, y: 40 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
                    }}
                    className="border-b border-border/50"
                  >
                    <a
                      href={l.href}
                      onClick={onClose}
                      className="group flex items-baseline gap-4 py-4 md:py-6 font-heavy uppercase text-white-soft hover:text-saffron transition-colors"
                    >
                      <span className="font-mono text-[10px] text-muted group-hover:text-saffron transition-colors">
                        0{i + 1}
                      </span>
                      <span className="text-5xl md:text-7xl leading-[0.9] tracking-tight">
                        {l.label}
                      </span>
                      <span className="ml-auto text-saffron opacity-0 group-hover:opacity-100 transition-opacity text-2xl">
                        ↗
                      </span>
                    </a>
                  </motion.li>
                ))}
              </motion.ul>
            </nav>

            {/* Footer of the panel: email + socials */}
            <div className="px-8 md:px-12 py-10 border-t border-border">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted">
                    (Connect)
                  </div>
                  <a
                    href={bio.socials.instagram}
                    className="block mt-3 font-heavy text-saffron text-xl hover:text-white-soft transition-colors"
                  >
                    @ishankishan23
                  </a>
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-muted">
                    (Socials)
                  </div>
                  <div className="mt-3 flex items-center gap-4 text-xl text-white-soft">
                    <a
                      href={bio.socials.instagram}
                      aria-label="Instagram"
                      className="hover:text-saffron transition-colors"
                    >
                      <FaInstagram />
                    </a>
                    <a
                      href={bio.socials.twitter}
                      aria-label="X / Twitter"
                      className="hover:text-saffron transition-colors"
                    >
                      <FaXTwitter />
                    </a>
                    <a
                      href={bio.socials.facebook}
                      aria-label="Facebook"
                      className="hover:text-saffron transition-colors"
                    >
                      <FaFacebook />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
