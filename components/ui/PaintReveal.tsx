"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

/**
 * Paint-reveal — pure DOM, no canvas, no SVG.
 *
 * Approach
 *   - BOTTOM layer: Next.js <Image> (always visible).
 *   - TOP layer:    Next.js <Image> (initially fully visible, "covers" bottom).
 *   - STAMP layer:  div nodes appended on mousemove. Each stamp is an absolutely
 *                   positioned circle with `background-image: url(bottom)` and
 *                   `background-position` set so the visible content matches the
 *                   bottom photo at that screen coordinate. Visually it looks
 *                   like the top image was painted away there.
 *   - Each stamp is born with a quick "splash" pop (scale 0.4 → 1.15 → 1) and
 *     fades out at end of life — water-droplet feel.
 *
 * No React state per move. RAF-throttled. Fragment-batched DOM appends.
 */
export function PaintReveal({
  topImage,
  bottomImage,
  className = "",
  brushRadius = 80,
  maxStamps = 1500,
}: {
  topImage: string;
  bottomImage: string;
  className?: string;
  brushRadius?: number;
  maxStamps?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stampsLayerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);

  // Load natural dimensions of bottom image so stamps can match the
  // top <Image>'s `object-cover object-center` fit exactly.
  useEffect(() => {
    let cancelled = false;
    const img = new window.Image();
    img.onload = () => {
      if (!cancelled) {
        setNatural({ w: img.naturalWidth, h: img.naturalHeight });
      }
    };
    img.src = bottomImage;
    return () => {
      cancelled = true;
    };
  }, [bottomImage]);

  // Track container dimensions; rebuild stamps when they change
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const update = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w !== size.w || h !== size.h) {
        setSize({ w, h });
        const layer = stampsLayerRef.current;
        if (layer) layer.innerHTML = "";
      }
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(container);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    const layer = stampsLayerRef.current;
    if (!container || !layer || size.w === 0 || size.h === 0 || !natural) return;

    const cw = size.w;
    const ch = size.h;
    const bgUrl = `url("${bottomImage}")`;

    // Compute object-cover fit for the bottom image inside the container.
    // Matches `object-cover object-center` used by the top <Image>, so the
    // painted stamps line up pixel-perfectly with the revealed layer.
    const imgAspect = natural.w / natural.h;
    const containerAspect = cw / ch;
    let bgW: number;
    let bgH: number;
    if (imgAspect > containerAspect) {
      // Image is wider than container — fit to height, crop sides.
      bgH = ch;
      bgW = ch * imgAspect;
    } else {
      // Image is taller — fit to width, crop top/bottom.
      bgW = cw;
      bgH = cw / imgAspect;
    }
    const bgOffsetX = (cw - bgW) / 2;
    const bgOffsetY = (ch - bgH) / 2;

    const lifeMs = 750;
    const fadeInMs = 90;
    const fadeOutMs = 400;

    // Build a single stamp element (cheap cssText assignment).
    // Position is set ONCE via transform; only opacity animates afterwards.
    const buildStamp = (
      frag: DocumentFragment,
      x: number,
      y: number,
      r: number,
      alpha = 1,
    ) => {
      const stamp = document.createElement("div");
      const tx = x - r;
      const ty = y - r;
      const d = r * 2;
      // bg-position: shift the cover-fitted image so its center-crop origin
      // (bgOffsetX, bgOffsetY) lands correctly under this stamp's window.
      const bx = bgOffsetX - tx;
      const by = bgOffsetY - ty;
      stamp.style.cssText =
        `position:absolute;left:0;top:0;width:${d}px;height:${d}px;` +
        `border-radius:50%;background:${bgUrl} ${bx}px ${by}px / ${bgW}px ${bgH}px no-repeat;` +
        `transform:translate3d(${tx}px,${ty}px,0);` +
        `pointer-events:none;will-change:opacity;opacity:0;`;
      frag.appendChild(stamp);
      return { stamp, alpha };
    };

    type StampInfo = ReturnType<typeof buildStamp>;

    // Opacity-only fade animation: smooth fade in, hold, smooth fade out.
    // No transform/scale changes — those caused jitter when many stamps animated
    // independently. Compositor only animates opacity, no layout, no paint.
    const animateStamps = (infos: StampInfo[]) => {
      const fadeInOffset = fadeInMs / lifeMs;
      const fadeOutOffset = (lifeMs - fadeOutMs) / lifeMs;
      for (const { stamp, alpha } of infos) {
        try {
          stamp.animate(
            [
              { opacity: 0, offset: 0 },
              { opacity: alpha, offset: fadeInOffset },
              { opacity: alpha, offset: fadeOutOffset },
              { opacity: 0, offset: 1 },
            ],
            { duration: lifeMs, easing: "linear", fill: "forwards" },
          );
        } catch {
          stamp.style.opacity = String(alpha);
          stamp.style.transition = `opacity ${fadeOutMs}ms ease-out`;
          window.setTimeout(() => {
            stamp.style.opacity = "0";
          }, lifeMs - fadeOutMs);
        }
        window.setTimeout(() => {
          if (stamp.parentNode) stamp.parentNode.removeChild(stamp);
        }, lifeMs + 60);
      }
    };

    const enforceLimit = () => {
      while (layer.children.length > maxStamps) {
        layer.removeChild(layer.firstChild as Node);
      }
    };

    // Fewer but BIGGER stamps. The fluid feel comes from large overlapping
    // circles, not scale animations. Cheaper per frame, no jitter.
    const paintAt = (
      frag: DocumentFragment,
      stamps: StampInfo[],
      x: number,
      y: number,
    ) => {
      // Big central anchor stamp — one large stamp gives solid coverage
      stamps.push(buildStamp(frag, x, y, brushRadius * 0.55));

      // Medium overlapping cluster
      const cluster = 10;
      for (let i = 0; i < cluster; i++) {
        const u = Math.random();
        const dist = brushRadius * 0.65 * Math.pow(u, 0.85);
        const a = Math.random() * Math.PI * 2;
        const sx = x + Math.cos(a) * dist;
        const sy = y + Math.sin(a) * dist;
        const r = 14 + Math.random() * 16;
        stamps.push(buildStamp(frag, sx, sy, r));
      }

      // Soft outer edge — a few smaller stamps fan out for natural falloff
      const edge = 6;
      for (let i = 0; i < edge; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = brushRadius * (0.7 + Math.random() * 0.4);
        const sx = x + Math.cos(a) * d;
        const sy = y + Math.sin(a) * d;
        const r = 5 + Math.random() * 8;
        stamps.push(buildStamp(frag, sx, sy, r, 0.85 + Math.random() * 0.15));
      }
    };

    // RAF throttle: latest position queued, flushed once per frame
    let pendingX = -1;
    let pendingY = -1;
    let lastX = -1;
    let lastY = -1;
    let rafId = 0;

    const flush = () => {
      rafId = 0;
      if (pendingX < 0) return;
      const x = pendingX;
      const y = pendingY;
      pendingX = -1;
      pendingY = -1;

      const frag = document.createDocumentFragment();
      const stamps: StampInfo[] = [];

      if (lastX >= 0) {
        const dx = x - lastX;
        const dy = y - lastY;
        const dist = Math.hypot(dx, dy);
        const steps = Math.min(2, Math.max(1, Math.floor(dist / 35)));
        for (let i = 1; i <= steps; i++) {
          const t = i / steps;
          paintAt(frag, stamps, lastX + dx * t, lastY + dy * t);
        }
      } else {
        paintAt(frag, stamps, x, y);
      }
      layer.appendChild(frag);
      animateStamps(stamps);
      enforceLimit();
      lastX = x;
      lastY = y;
    };

    const handleMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        pendingX = -1;
        pendingY = -1;
        lastX = -1;
        lastY = -1;
        return;
      }
      pendingX = x;
      pendingY = y;
      if (rafId === 0) rafId = requestAnimationFrame(flush);
    };
    const handleLeave = () => {
      pendingX = -1;
      pendingY = -1;
      lastX = -1;
      lastY = -1;
    };

    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseleave", handleLeave);
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseleave", handleLeave);
    };
  }, [size, bottomImage, brushRadius, maxStamps, natural]);

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className}`}
      style={{ contain: "layout style paint" }}
    >
      {/* Bottom layer — Next.js Image, always visible underneath */}
      <Image
        src={bottomImage}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 600px, (min-width: 768px) 44vw, 80vw"
        className="object-cover object-center select-none pointer-events-none"
        draggable={false}
      />
      {/* Top layer — Next.js Image, fully visible until painted */}
      <Image
        src={topImage}
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 600px, (min-width: 768px) 44vw, 80vw"
        className="object-cover object-center select-none pointer-events-none"
        draggable={false}
      />
      {/* Stamp layer — paint-revealed divs accumulate here */}
      <div
        ref={stampsLayerRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden
      />
    </div>
  );
}
