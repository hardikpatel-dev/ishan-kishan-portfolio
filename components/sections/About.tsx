"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ComponentType } from "react";
import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Tricolor } from "@/components/brand/Tricolor";
import { AnimatedBg } from "@/components/ui/AnimatedBg";
import { BatIcon, GloveIcon, StumpsIcon } from "@/components/brand/CricketIcons";

type IconComp = ComponentType<{ className?: string; size?: number }>;

const chips: { label: string; value: string; icon: IconComp | null }[] = [
  { label: "Born", value: "18 Jul 1998", icon: null },
  { label: "From", value: "Patna, Bihar", icon: null },
  { label: "Bats", value: "Left", icon: BatIcon },
  { label: "Role", value: "Keeper", icon: GloveIcon },
  { label: "Team", value: "MI", icon: null },
  { label: "Wickets", value: "Behind", icon: StumpsIcon },
];

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1]);

  return (
    <section id="about" className="relative py-32 md:py-48 overflow-hidden">
      <AnimatedBg
        blobs={[
          {
            className: "absolute -top-40 -left-40 w-[40rem] h-[40rem] rounded-full bg-accent/[0.08] blur-3xl",
            duration: 20,
            x: [0, 60, 0],
            y: [0, 40, 0],
          },
          {
            className: "absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-saffron/[0.06] blur-3xl",
            duration: 25,
            x: [0, -40, 0],
            y: [0, -30, 0],
          },
        ]}
      />
      <div className="relative mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16 items-center">
        <div ref={ref} className="relative aspect-[3/4] overflow-hidden rounded-sm border border-border">
          <motion.div style={{ y: imgY, scale: imgScale }} className="absolute -inset-y-[15%] inset-x-0">
            <Image
              src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=1200"
              alt="Cricket atmosphere"
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              unoptimized
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/20 to-transparent" />
          <motion.div
            initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
            whileInView={{ opacity: 1, scale: 1, rotate: -6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="absolute -right-4 -top-4 bg-bg border border-saffron/40 rounded-sm px-4 py-3 shadow-2xl"
          >
            <div className="text-[9px] uppercase tracking-[0.2em] text-muted">Jersey</div>
            <div className="font-display text-4xl text-saffron leading-none mt-1">#23</div>
          </motion.div>
        </div>

        <div>
          <SectionHeading number="02" eyebrow="About me" title="Left hand. Loud heart." />
          <Tricolor className="mb-8" />
          <Reveal>
            <p className="text-muted leading-relaxed text-lg">
              I grew up in Patna dreaming in commentary voices. The net sessions before sunrise, the tennis ball tape-jobs,
              the borrowed pads — all of it led to one jersey I never stop earning. I play the short ball like it owes me
              something and I keep wickets because I love being in every ball of the game.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
              className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {chips.map((c) => {
                const Icon = c.icon;
                return (
                  <motion.div
                    key={c.label}
                    variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
                    whileHover={{ y: -4, borderColor: "rgba(255,153,51,0.4)" }}
                    className="rounded-sm border border-border bg-surface/60 px-4 py-3 transition-colors relative overflow-hidden group"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="text-[10px] uppercase tracking-[0.2em] text-muted">{c.label}</div>
                        <div className="font-display text-lg text-text mt-1">{c.value}</div>
                      </div>
                      {Icon && <Icon size={18} className="text-muted/60 group-hover:text-saffron transition-colors" />}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
