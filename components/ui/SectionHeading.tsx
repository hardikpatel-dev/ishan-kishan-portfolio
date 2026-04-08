import { Reveal } from "./Reveal";

export function SectionHeading({
  number,
  eyebrow,
  title,
  subtitle,
}: {
  number?: string;
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <Reveal className="mb-16">
      <div className="flex items-baseline gap-6 mb-4">
        {number && (
          <span className="font-mono text-xs text-muted tracking-widest">— {number}</span>
        )}
        {eyebrow && (
          <span className="text-xs uppercase tracking-[0.3em] text-accent">{eyebrow}</span>
        )}
      </div>
      <h2 className="font-display text-5xl md:text-7xl text-text leading-[0.95] tracking-tight">
        {title}
      </h2>
      {subtitle && <p className="text-muted mt-6 max-w-xl text-lg">{subtitle}</p>}
    </Reveal>
  );
}
