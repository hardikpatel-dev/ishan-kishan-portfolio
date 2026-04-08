"use client";
import { motion } from "framer-motion";

export function Scribble({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 400 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.path
        d="M 5 30 C 40 5, 70 55, 110 30 S 180 5, 220 30 S 290 55, 330 30 S 395 5, 395 30"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
