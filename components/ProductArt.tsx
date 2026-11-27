import type { Art } from "@/lib/products";

const SAGE = "#1E3526";
const SAGE_SOFT = "#335440";
const TERRACOTTA = "#841C21";
const GOLD = "#B88A32";
const PARCHMENT = "#FBF6EC";
const LINEN_SHADOW = "#DFD0B7";

const strokeMain = {
  stroke: SAGE,
  strokeWidth: 2.2,
  strokeLinejoin: "round" as const,
  strokeLinecap: "round" as const,
};

// Generous, realistic print zones (% of the 200x200 studio canvas)
const PRINT_AREA: Partial<Record<Art, { x: number; y: number; w: number; h: number; ink: string }>> = {
  tshirt: { x: 31, y: 31, w: 38, h: 38, ink: SAGE },
  mug: { x: 26, y: 33, w: 38, h: 40, ink: SAGE },
  cap: { x: 32, y: 33, w: 36, h: 21, ink: "#F6E7C1" },
  keychain: { x: 34, y: 46, w: 32, h: 34, ink: SAGE },
  frame: { x: 29, y: 22, w: 42, h: 56, ink: SAGE },
};

const SHAPES: Record<Art, React.ReactNode> = {
  tshirt: (
    <>
      <ellipse cx={100} cy={176} rx={52} ry={6} fill={LINEN_SHADOW} />
      <path
        d="M71 36 L46 46 L22 76 L45 92 L56 80 L56 168 L144 168 L144 80 L155 92 L178 76 L154 46 L129 36 Q100 54 71 36 Z"
        fill={PARCHMENT}
        {...strokeMain}
      />
      {/* Crew collar ribbing & subtle shoulder seam */}
      <path d="M71 36 Q100 59 129 36" fill="none" stroke={SAGE_SOFT} strokeWidth={1.4} strokeDasharray="2 2" />
      <path d="M56 80 L48 48 M144 80 L152 48" fill="none" stroke={LINEN_SHADOW} strokeWidth={1.5} />
    </>
  ),
  mug: (
    <>
      <ellipse cx={96} cy={173} rx={48} ry={6} fill={LINEN_SHADOW} />
      <path d="M134 78 q33 0 33 28 q0 28 -33 28" fill="none" stroke={SAGE} strokeWidth={13} />
      <path d="M134 78 q33 0 33 28 q0 28 -33 28" fill="none" stroke={PARCHMENT} strokeWidth={8} />
      <rect x={46} y={52} width={90} height={114} rx={11} fill={PARCHMENT} {...strokeMain} />
      <ellipse cx={91} cy={54} rx={43} ry={5.5} fill="#F3EDE2" stroke={SAGE} strokeWidth={1.6} />
    </>
  ),
  cap: (
    <>
      <ellipse cx={104} cy={148} rx={64} ry={7} fill={LINEN_SHADOW} />
      <path d="M46 122 Q46 52 100 52 Q154 52 154 122 Z" fill={SAGE} stroke="#1B3025" strokeWidth={2.2} />
      <path d="M100 54 Q76 82 72 120 M100 54 Q124 82 128 120" fill="none" stroke="rgba(255,255,255,0.16)" strokeWidth={1.3} />
      <path d="M36 122 Q100 107 176 125 Q170 142 118 140 Q60 138 36 122 Z" fill="#1B3025" />
      <circle cx={100} cy={52} r={4.5} fill={GOLD} />
    </>
  ),
  keychain: (
    <>
      <ellipse cx={100} cy={176} rx={34} ry={5} fill={LINEN_SHADOW} />
      <circle cx={100} cy={50} r={17} fill="none" stroke={GOLD} strokeWidth={4.5} />
      <circle cx={100} cy={50} r={13} fill="none" stroke="#DFC07C" strokeWidth={1.2} />
      <path d="M100 67 L100 84" stroke={GOLD} strokeWidth={3.8} />
      <rect x={64} y={82} width={72} height={86} rx={14} fill={PARCHMENT} {...strokeMain} />
      <rect x={69} y={87} width={62} height={76} rx={10} fill="none" stroke={LINEN_SHADOW} strokeWidth={1.2} />
      <circle cx={100} cy={91} r={3} fill={SAGE} />
    </>
  ),
  frame: (
    <>
      <ellipse cx={100} cy={179} rx={56} ry={5.5} fill={LINEN_SHADOW} />
      <rect x={42} y={26} width={116} height={146} rx={3} fill="#8B6240" stroke="#5B3D24" strokeWidth={2.4} />
      <rect x={49} y={33} width={102} height={132} fill="#F4EFE4" stroke="#6E4B2E" strokeWidth={1.4} />
      <rect x={56} y={40} width={88} height={118} fill={PARCHMENT} stroke="#D5CBB8" strokeWidth={1.2} />
    </>
  ),
  gift: (
    <>
      <ellipse cx={100} cy={174} rx={54} ry={6} fill={LINEN_SHADOW} />
      <rect x={48} y={90} width={104} height={76} rx={3} fill={TERRACOTTA} stroke="#7D3324" strokeWidth={2.2} />
      <rect x={42} y={74} width={116} height={20} rx={3} fill="#933E2D" stroke="#7D3324" strokeWidth={2.2} />
      <rect x={93} y={74} width={14} height={92} fill={GOLD} />
      <ellipse cx={86} cy={66} rx={15} ry={9} fill="none" stroke={GOLD} strokeWidth={4.8} />
      <ellipse cx={114} cy={66} rx={15} ry={9} fill="none" stroke={GOLD} strokeWidth={4.8} />
    </>
  ),
  church: (
    <>
      <ellipse cx={100} cy={174} rx={50} ry={5.5} fill={LINEN_SHADOW} />
      <path d="M100 18 L100 42 M91 27 L109 27" stroke={GOLD} strokeWidth={3.6} strokeLinecap="round" />
      <rect x={88} y={42} width={24} height={40} fill={PARCHMENT} {...strokeMain} />
      <rect x={56} y={96} width={88} height={70} fill={PARCHMENT} {...strokeMain} />
      <path d="M48 100 L100 64 L152 100 Z" fill={SAGE} {...strokeMain} />
      <path d="M90 166 L90 136 Q100 124 110 136 L110 166 Z" fill={TERRACOTTA} />
    </>
  ),
  souvenir: (
    <>
      <ellipse cx={100} cy={172} rx={44} ry={5.5} fill={LINEN_SHADOW} />
      <path d="M100 42 q-10 -14 0 -22 q10 8 0 22" fill="none" stroke={GOLD} strokeWidth={2.8} />
      <rect x={88} y={44} width={24} height={15} rx={3} fill={GOLD} />
      <circle cx={100} cy={112} r={50} fill={SAGE} stroke="#1B3025" strokeWidth={2} />
      <circle cx={100} cy={112} r={44} fill="none" stroke="rgba(229,197,128,0.4)" strokeWidth={1.2} />
      <path d="M100 82 L100 142 M82 102 L118 102" stroke={GOLD} strokeWidth={6} strokeLinecap="round" />
    </>
  ),
};

export function ProductArt({
  art,
  photo,
  text,
  label,
  mini = false,
}: {
  art: Art;
  photo?: string;
  text?: string;
  label?: string;
  mini?: boolean;
}) {
  const area = PRINT_AREA[art];
  return (
    <div className={mini ? "art art-mini" : "art"}>
      <svg viewBox="0 0 200 200" role="img" aria-label={art}>
        {SHAPES[art]}
      </svg>
      {area && (photo || text) && (
        <div
          className={mini ? "print-area-mini" : "print-area"}
          style={{ left: `${area.x}%`, top: `${area.y}%`, width: `${area.w}%`, height: `${area.h}%`, color: area.ink }}
        >
          {photo && <img src={photo} alt="" />}
          {text && <span>{text}</span>}
        </div>
      )}
      {label && <span className="tag">{label}</span>}
    </div>
  );
}
