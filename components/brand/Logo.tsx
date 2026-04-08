"use client";
import { motion } from "framer-motion";

export function Logo({ className = "", size = 32 }: { className?: string; size?: number }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Ishan Kishan"
      initial="hidden"
      animate="visible"
    >
      <motion.circle
        cx="32"
        cy="32"
        r="30"
        stroke="currentColor"
        strokeWidth="1.5"
        variants={{
          hidden: { pathLength: 0, opacity: 0 },
          visible: { pathLength: 1, opacity: 1, transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } },
        }}
      />
      <motion.path
        d="M 22 18 L 22 46"
        stroke="#ff9933"
        strokeWidth="3.5"
        strokeLinecap="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1, transition: { duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] } },
        }}
      />
      <motion.path
        d="M 32 18 L 32 46 M 32 32 L 44 18 M 32 32 L 44 46"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={{
          hidden: { pathLength: 0 },
          visible: { pathLength: 1, transition: { duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] } },
        }}
      />
      <motion.text
        x="48"
        y="56"
        fontSize="9"
        fontFamily="monospace"
        fill="#5b8cff"
        fontWeight="700"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { delay: 1.1, duration: 0.4 } },
        }}
      >
        23
      </motion.text>
    </motion.svg>
  );
}
