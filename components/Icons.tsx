import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

/** Jerusalem / medieval flared cross emblem */
export function CrossEmblem({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M12 3v18M6.5 9.2h11" />
      <path d="M10.2 3.4h3.6M10.2 20.6h3.6M6.8 7.5v3.4M17.2 7.5v3.4" strokeWidth={1.2} />
      <circle cx="8.6" cy="5.8" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="15.4" cy="5.8" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="8.6" cy="13.2" r="0.85" fill="currentColor" stroke="none" />
      <circle cx="15.4" cy="13.2" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** Illuminated Bethlehem star & olive-branch manuscript rule */
export function OliveOrnament({ size = 56, ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 120 24"
      width={size * 2.1}
      height={Math.round(size * 0.42)}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.1}
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 12h36M80 12h36" strokeOpacity={0.5} />
      {/* Delicate olive leaves flanking center */}
      <path d="M36 12c4-3.5 8-3.5 11 0-3 3.5-7 3.5-11 0Z" fill="currentColor" fillOpacity={0.22} />
      <path d="M84 12c-4-3.5-8-3.5-11 0 3 3.5 7 3.5 11 0Z" fill="currentColor" fillOpacity={0.22} />
      <circle cx="24" cy="12" r="1.4" fill="currentColor" stroke="none" fillOpacity={0.6} />
      <circle cx="96" cy="12" r="1.4" fill="currentColor" stroke="none" fillOpacity={0.6} />
      {/* 8-point Star of Bethlehem */}
      <path
        d="M60 2.5L62.1 9.6L69.2 12L62.1 14.4L60 21.5L57.9 14.4L50.8 12L57.9 9.6L60 2.5Z"
        fill="currentColor"
        stroke="none"
      />
      <path d="M54.8 6.8l10.4 10.4M65.2 6.8L54.8 17.2" strokeOpacity={0.75} strokeWidth={1} />
    </svg>
  );
}

/** Subtle illuminated manuscript corner bracket */
export function CornerFlourish({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.2} className={className} aria-hidden="true">
      <path d="M2 24V4a2 2 0 0 1 2-2h20" />
      <path d="M6 18V7a1 1 0 0 1 1-1h11" strokeOpacity={0.55} />
      <circle cx="9.5" cy="9.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ToteIcon({ size = 17, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 7h14l-1 13H6L5 7z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}

export function WhatsAppIcon({ size = 17, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M20.5 11.5a8.5 8.5 0 0 1-12.6 7.4L3.5 20l1.2-4.2A8.5 8.5 0 1 1 20.5 11.5z" />
      <path d="M9.5 9.2c.2-.4.5-.5.8-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.2 0 .5-.1.7l-.4.5c.5.9 1.2 1.6 2.1 2.1l.5-.4c.2-.1.5-.2.7-.1l1.4.6c.3.1.4.3.4.5v.5c0 .3-.1.6-.5.8-.5.3-1.3.4-2.3.1-1.9-.6-3.9-2.5-4.5-4.5-.3-1-.2-1.8.3-2.1z" />
    </svg>
  );
}

export function ShieldLockIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export function CheckSealIcon({ size = 16, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  );
}

export function FrameUploadIcon({ size = 19, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <circle cx="8.5" cy="9.5" r="1.5" />
      <path d="M21 15l-4.5-4.5L7 20" />
    </svg>
  );
}

export function CloseIcon({ size = 18, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  );
}

export function MenuIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" aria-hidden="true" {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
