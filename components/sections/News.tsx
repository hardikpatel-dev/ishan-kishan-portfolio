"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { news } from "@/lib/data/news";
import { AnimatedBg } from "@/components/ui/AnimatedBg";
import { Tricolor } from "@/components/brand/Tricolor";

/**
 * News — bold editorial press cards.
 *
 * - Big mixed-size grid: first card is featured (large), rest are smaller
 * - Big background "PRESS" wordmark
 * - Each card has source, date, headline, animated arrow on hover
 */
export function News() {
  const featured = news[0];
  const rest = news.slice(1);

  return (
    <section
      id="news"
      className="relative py-32 md:py-48 bg-bg overflow-hidden"
    >
      <AnimatedBg
        blobs={[
          {
            className:
              "absolute top-0 right-0 w-[36rem] h-[36rem] rounded-full bg-mi-blue/[0.1] blur-3xl",
            duration: 24,
            x: [0, -40, 0],
            y: [0, 30, 0],
          },
          {
            className:
              "absolute bottom-10 left-10 w-[32rem] h-[32rem] rounded-full bg-india-green/[0.07] blur-3xl",
            duration: 28,
            x: [0, 40, 0],
            y: [0, -30, 0],
          },
          {
            className:
              "absolute top-1/3 left-1/3 w-[28rem] h-[28rem] rounded-full bg-saffron/[0.06] blur-3xl",
            duration: 32,
            x: [0, 30, 0],
            y: [0, 30, 0],
          },
        ]}
      />

      {/* Background "PRESS" wordmark */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none select-none text-center font-heavy uppercase text-white-soft/[0.03] leading-none tracking-[-0.04em] whitespace-nowrap"
      >
        <span style={{ fontSize: "clamp(10rem, 28vw, 28rem)" }}>Press</span>
      </div>

      <div className="relative mx-auto max-w-7xl px-6">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 md:mb-24 grid md:grid-cols-2 gap-8 items-end"
        >
          <div>
            <div className="flex items-center gap-4 text-[10px] font-mono uppercase tracking-[0.3em] text-muted mb-3">
              <span className="text-muted">— 08</span>
              <span className="text-saffron">In the news</span>
            </div>
            <h2
              className="font-heavy uppercase text-white-soft leading-[0.88] tracking-tight"
              style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)" }}
            >
              Stories
              <br />
              from <span className="text-saffron italic">the record.</span>
            </h2>
            <Tricolor className="mt-6" />
          </div>
          <p className="text-muted leading-relaxed max-w-sm font-mono text-sm md:justify-self-end md:text-right">
            A few highlights from press coverage worth holding onto.
          </p>
        </motion.div>

        {/* FEATURED article */}
        <motion.a
          href={featured.url}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="group relative grid md:grid-cols-12 gap-8 mb-16 md:mb-20"
        >
          <div className="md:col-span-7 relative aspect-[16/10] overflow-hidden border border-border group-hover:border-saffron/50 transition-colors">
            <Image
              src={featured.thumbnail}
              alt={featured.headline}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              sizes="(min-width: 768px) 60vw, 100vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
            <div className="absolute top-4 left-4 bg-bg/85 backdrop-blur-sm border border-saffron/40 px-3 py-1.5 rounded-sm">
              <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-saffron">
                ★ Featured
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-[0.3em] mb-4">
              <span className="text-muted">{featured.date}</span>
              <span className="w-6 h-px bg-saffron/40" />
              <span className="text-saffron">{featured.source}</span>
            </div>
            <h3
              className="font-heavy uppercase text-white-soft leading-[0.92] tracking-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3rem)" }}
            >
              {featured.headline}
            </h3>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
              className="mt-6 h-[2px] w-32 bg-gradient-to-r from-saffron via-white-soft to-india-green"
            />
            <div className="mt-6 flex items-center gap-3 text-xs font-mono uppercase tracking-[0.3em] text-muted group-hover:text-saffron transition-colors">
              Read full story
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                →
              </motion.span>
            </div>
          </div>
        </motion.a>

        {/* REST grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {rest.map((n, i) => (
            <motion.a
              key={n.url + n.date}
              href={n.url}
              target="_blank"
              rel="noreferrer"
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="group block"
            >
              <div className="relative aspect-[4/3] overflow-hidden border border-border group-hover:border-saffron/50 transition-colors">
                <Image
                  src={n.thumbnail}
                  alt={n.headline}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  sizes="(min-width: 768px) 30vw, 90vw"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 text-[9px] font-mono uppercase tracking-[0.3em] text-saffron">
                  0{i + 2} / 0{news.length}
                </div>
              </div>
              <div className="mt-4">
                <div className="flex items-center gap-3 text-[9px] font-mono uppercase tracking-[0.3em]">
                  <span className="text-muted">{n.date}</span>
                  <span className="w-4 h-px bg-saffron/40" />
                  <span className="text-saffron">{n.source}</span>
                </div>
                <h4 className="font-heavy uppercase text-white-soft mt-3 text-base leading-snug tracking-tight group-hover:text-saffron transition-colors">
                  {n.headline}
                </h4>
                <div className="mt-4 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.3em] text-muted group-hover:text-saffron transition-colors">
                  Read
                  <motion.span className="inline-block" animate={{ x: 0 }} whileHover={{ x: 4 }}>
                    →
                  </motion.span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
