import type { Art } from "@/lib/products";

const G = "#1e4d36";
const RED = "#a3262a";
const GOLD = "#b98a3e";
const PAPER = "#fffdf7";
const line = { stroke: G, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const };

// Where a customer's photo and text land on each customizable item, in % of the art box.
const PRINT_AREA: Partial<Record<Art, { x: number; y: number; w: number; h: number; ink: string }>> = {
  tshirt: { x: 36, y: 33, w: 28, h: 30, ink: G },
  mug: { x: 30, y: 35, w: 32, h: 37, ink: G },
  cap: { x: 37, y: 36, w: 26, h: 17, ink: GOLD },
  keychain: { x: 37, y: 47, w: 26, h: 32, ink: G },
  frame: { x: 30, y: 23, w: 40, h: 55, ink: G },
};

const SHAPES: Record<Art, React.ReactNode> = {
  tshirt: (
    <path
      d="M70 40 L50 48 L28 75 L48 90 L58 80 L58 165 L142 165 L142 80 L152 90 L172 75 L150 48 L130 40 Q100 58 70 40 Z"
      fill={PAPER}
      {...line}
    />
  ),
  mug: (
    <>
      <path d="M135 80 q32 0 32 26 q0 26 -32 26" fill="none" stroke={G} strokeWidth={15} />
      <path d="M135 80 q32 0 32 26 q0 26 -32 26" fill="none" stroke={PAPER} strokeWidth={9} />
      <rect x={50} y={55} width={85} height={110} rx={9} fill={PAPER} {...line} />
    </>
  ),
  cap: (
    <>
      <path d="M50 122 Q50 56 100 56 Q150 56 150 122 Z" fill="#1d2b45" stroke="#14203a" strokeWidth={3} />
      <path d="M40 122 Q100 108 176 126 Q170 142 120 140 Q62 138 40 122 Z" fill="#14203a" />
      <circle cx={100} cy={56} r={5} fill="#14203a" />
    </>
  ),
  keychain: (
    <>
      <circle cx={100} cy={55} r={17} fill="none" stroke={GOLD} strokeWidth={5} />
      <path d="M100 72 L100 88" stroke={GOLD} strokeWidth={4} />
      <rect x={68} y={86} width={64} height={80} rx={14} fill={PAPER} {...line} />
      <circle cx={100} cy={93} r={3} fill={G} />
    </>
  ),
  frame: (
    <>
      <rect x={45} y={30} width={110} height={140} rx={3} fill="#8a5a33" stroke="#5e3b20" strokeWidth={3} />
      <rect x={57} y={42} width={86} height={116} fill={PAPER} stroke="#5e3b20" strokeWidth={2} />
    </>
  ),
  gift: (
    <>
      <rect x={50} y={92} width={100} height={74} fill={RED} {...line} stroke="#7a1b1e" />
      <rect x={44} y={76} width={112} height={20} fill="#8f1f23" stroke="#7a1b1e" strokeWidth={3} />
      <rect x={93} y={76} width={14} height={90} fill={GOLD} />
      <ellipse cx={86} cy={68} rx={15} ry={9} fill="none" stroke={GOLD} strokeWidth={6} />
      <ellipse cx={114} cy={68} rx={15} ry={9} fill="none" stroke={GOLD} strokeWidth={6} />
    </>
  ),
  church: (
    <>
      <path d="M100 18 L100 42 M91 27 L109 27" stroke={GOLD} strokeWidth={4} strokeLinecap="round" />
      <rect x={88} y={42} width={24} height={40} fill={PAPER} {...line} />
      <rect x={58} y={96} width={84} height={70} fill={PAPER} {...line} />
      <path d="M50 100 L100 64 L150 100 Z" fill={G} {...line} />
      <path d="M90 166 L90 136 Q100 124 110 136 L110 166 Z" fill={RED} />
    </>
  ),
  souvenir: (
    <>
      <path d="M100 42 q-10 -14 0 -22 q10 8 0 22" fill="none" stroke={GOLD} strokeWidth={3} />
      <rect x={88} y={44} width={24} height={16} rx={3} fill={GOLD} />
      <circle cx={100} cy={112} r={50} fill={G} />
      <path d="M100 82 L100 142 M82 102 L118 102" stroke={GOLD} strokeWidth={7} strokeLinecap="round" />
    </>
  ),
};

export function Holly({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 40" className={className} aria-hidden>
      <path d="M30 22 C20 8 6 10 2 14 C8 16 6 22 12 22 C10 28 18 30 30 22 Z" fill={G} />
      <path d="M30 22 C40 8 54 10 58 14 C52 16 54 22 48 22 C50 28 42 30 30 22 Z" fill="#2f6b4b" />
      <circle cx={26} cy={24} r={4} fill={RED} />
      <circle cx={34} cy={24} r={4} fill={RED} />
      <circle cx={30} cy={18} r={4} fill="#c0353a" />
    </svg>
  );
}

export function ProductArt({ art, photo, text, label }: { art: Art; photo?: string; text?: string; label?: string }) {
  const area = PRINT_AREA[art];
  return (
    <div className="art">
      <svg viewBox="0 0 200 200" role="img" aria-label={art}>
        {SHAPES[art]}
      </svg>
      {area && (photo || text) && (
        <div
          className="print-area"
          style={{ left: `${area.x}%`, top: `${area.y}%`, width: `${area.w}%`, height: `${area.h}%`, color: area.ink }}
        >
          {photo && <img src={photo} alt="" />}
          {text && <span>{text}</span>}
        </div>
      )}
      <Holly className="art-holly" />
      {label && <span className="tag">{label}</span>}
    </div>
  );
}
