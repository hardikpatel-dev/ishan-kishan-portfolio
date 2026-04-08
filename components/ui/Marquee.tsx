"use client";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function Marquee({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div style={{ x }} className="flex gap-8 will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
