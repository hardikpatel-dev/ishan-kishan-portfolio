"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Lag-free custom cursor.
 *
 * - The system arrow cursor stays visible (we don't set `cursor: none`).
 * - This component renders a small saffron dot + outer ring overlay.
 * - Position is updated via raw mousemove → direct DOM `transform: translate3d`.
 *   No React state per move, no framer-motion springs, no RAF queue.
 *   The dot follows the pointer instantly; the ring uses a tiny CSS
 *   `transform` transition (60ms) for a subtle smooth trail.
 * - On interactive hover (a, button, [role=button]/[tab]), the ring scales up.
 * - Auto-disabled on touch devices and when `prefers-reduced-motion` is set.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || touch) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let hovering = false;

    const move = (e: MouseEvent) => {
      // Direct DOM transform — no React, no RAF queue, no spring lag.
      // GPU compositor handles translate3d, so this is essentially free.
      const t = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      dot.style.transform = t;
      ring.style.transform = hovering
        ? `${t} scale(1.8)`
        : t;
    };

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(
        "a, button, [role='tab'], [role='button']",
      );
      if (isInteractive !== hovering) {
        hovering = isInteractive;
        ring.style.borderColor = isInteractive
          ? "rgba(255, 153, 51, 0.9)"
          : "rgba(255, 153, 51, 0.45)";
      }
    };

    const leave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };
    const enter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Inner saffron dot — instant follow */}
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[90] w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-saffron"
        style={{
          transform: "translate3d(-100px,-100px,0)",
          willChange: "transform",
          mixBlendMode: "screen",
        }}
      />
      {/* Outer ring — tiny CSS transition smooths the trail without lag */}
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-[90] w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border"
        style={{
          transform: "translate3d(-100px,-100px,0)",
          willChange: "transform",
          borderColor: "rgba(255, 153, 51, 0.45)",
          transition:
            "transform 60ms linear, border-color 200ms ease-out, opacity 200ms ease-out",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
