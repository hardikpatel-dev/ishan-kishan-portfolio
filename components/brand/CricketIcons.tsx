type IconProps = { className?: string; size?: number };

export function BatIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="14" y="2" width="5" height="11" rx="1" transform="rotate(20 14 2)" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 9 13 L 4 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 5 19 L 3 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function BallIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 3 12 Q 12 8 21 12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
      <path d="M 3 12 Q 12 16 21 12" stroke="currentColor" strokeWidth="1" strokeDasharray="2 2" />
    </svg>
  );
}

export function StumpsIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <line x1="6" y1="4" x2="6" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="4" x2="12" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="18" y1="4" x2="18" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="4" y1="4" x2="20" y2="4" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function GloveIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M 6 10 L 6 19 Q 6 21 8 21 L 16 21 Q 18 21 18 19 L 18 10 Q 18 8 16 8 L 15 8 L 15 5 Q 15 3 13 3 Q 11 3 11 5 L 11 8 L 10 8 L 10 6 Q 10 4 8 4 Q 6 4 6 6 L 6 10 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

export function TrophyIcon({ className, size = 24 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M 8 4 L 16 4 L 16 10 Q 16 14 12 14 Q 8 14 8 10 L 8 4 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M 8 6 L 5 6 Q 4 6 4 7 Q 4 10 8 11" stroke="currentColor" strokeWidth="1.5" />
      <path d="M 16 6 L 19 6 Q 20 6 20 7 Q 20 10 16 11" stroke="currentColor" strokeWidth="1.5" />
      <line x1="12" y1="14" x2="12" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <line x1="8" y1="20" x2="16" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
