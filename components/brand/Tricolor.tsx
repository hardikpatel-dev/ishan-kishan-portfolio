"use client";
import { motion } from "framer-motion";

export function Tricolor({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center ${className}`} aria-hidden>
      <motion.div
        className="h-[2px] bg-saffron"
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="h-[2px] bg-white-soft"
        initial={{ width: 0 }}
        whileInView={{ width: 24 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="h-[2px] bg-india-green"
        initial={{ width: 0 }}
        whileInView={{ width: 48 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
