"use client";
import { useState, type ReactNode } from "react";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";

export type Tab = { id: string; label: string; content: ReactNode };

export function TabGroup({ tabs }: { tabs: Tab[] }) {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active)!;
  return (
    <div>
      <div role="tablist" className="flex gap-2 flex-wrap mb-8 border-b border-border">
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={active === t.id}
            onClick={() => setActive(t.id)}
            className={clsx(
              "relative px-5 py-3 text-sm uppercase tracking-wider transition-colors",
              active === t.id ? "text-text" : "text-muted hover:text-text",
            )}
          >
            {t.label}
            {active === t.id && (
              <motion.span layoutId="tab-underline" className="absolute left-0 right-0 bottom-[-1px] h-[2px] bg-accent" />
            )}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {current.content}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
