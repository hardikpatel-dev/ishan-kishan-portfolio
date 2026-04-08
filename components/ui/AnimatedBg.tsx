"use client";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/hooks/usePrefersReducedMotion";

type Blob = {
  className: string;
  duration: number;
  x: [number, number, number];
  y: [number, number, number];
};

export function AnimatedBg({ blobs }: { blobs: Blob[] }) {
  const reduced = usePrefersReducedMotion();
  if (reduced) return null;
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
      {blobs.map((b, i) => (
        <motion.div
          key={i}
          className={b.className}
          animate={{ x: b.x, y: b.y }}
          transition={{ duration: b.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
