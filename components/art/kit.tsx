// Shared drawing kit. Style: one rounded 2.5px ink line (.ln) over flat token fills (.f-*),
// so every drawing re-lights for dusk through the CSS tokens. No gradients except lamp glows.
import type { Blaze } from '../../content/walks';

/** One paw print centred on (x, y), pointing up before rotation. */
export function Paw({ x, y, r = 0, s = 1, className = 'f-leash' }: { x: number; y: number; r?: number; s?: number; className?: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`} className={className}>
      <path d="M0 2c4.6 0 8.4 3.6 8.4 7.2 0 3-2.4 4.4-5 4.4-1.4 0-2.4-.6-3.4-.6s-2 .6-3.4.6c-2.6 0-5-1.4-5-4.4C-8.4 5.6-4.6 2 0 2z" />
      <ellipse cx="-7.6" cy="-2.6" rx="2.5" ry="3.3" transform="rotate(-18 -7.6 -2.6)" />
      <ellipse cx="-2.8" cy="-7.4" rx="2.5" ry="3.4" />
      <ellipse cx="2.8" cy="-7.4" rx="2.5" ry="3.4" />
      <ellipse cx="7.6" cy="-2.6" rx="2.5" ry="3.3" transform="rotate(18 7.6 -2.6)" />
    </g>
  );
}

const BLAZE_FILL: Record<Blaze, string> = {
  'green-circle': '#3E8E3A',
  'blue-square': '#2F67A8',
  'orange-triangle': '#E0812F',
  'red-diamond': '#C7442E',
};

/** A painted trail marker on a patch of bark. Decorative; pair it with text. */
export function BlazeMark({ blaze, size = 44, className = '' }: { blaze: Blaze; size?: number; className?: string }) {
  const fill = BLAZE_FILL[blaze];
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={`art shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <path className="f-bark ln" d="M9 4c9-2 21-2 30 0 3 13 3 27 0 40-9 2-21 2-30 0-3-13-3-27 0-40z" />
      <path className="nf s-wood" strokeWidth="1.4" strokeLinecap="round" d="M14 8c-1 10 0 22-1 34M34 7c1 12-1 22 1 35M24 6c1 4-1 8 0 12" opacity=".7" />
      <rect x="11" y="11" width="26" height="26" rx="5" className="f-sign" />
      {blaze === 'green-circle' && <circle cx="24" cy="24" r="9.5" fill={fill} className="ln" />}
      {blaze === 'blue-square' && <rect x="15" y="15" width="18" height="18" rx="1.5" fill={fill} className="ln" />}
      {blaze === 'orange-triangle' && <path d="M24 13.5 34.5 32h-21z" fill={fill} className="ln" />}
      {blaze === 'red-diamond' && <path d="M24 12.5 35.5 24 24 35.5 12.5 24z" fill={fill} className="ln" />}
    </svg>
  );
}

export interface TrailLineProps {
  /** Unique per page; used for the reveal mask. */
  id: string;
  /** Path data for the route. */
  d: string;
  viewBox: string;
  /** Paw prints along the route: [x, y, rotation]. */
  paws?: [number, number, number][];
  className?: string;
  preserveAspectRatio?: string;
  children?: React.ReactNode;
}

/**
 * The signature Trail Line: a dashed leash-red route with paw prints. A white mask stroke reveals
 * it when TrailReveal marks it .is-drawn; without JS or with reduced motion it is simply drawn.
 */
export function TrailLine({ id, d, viewBox, paws = [], className = '', preserveAspectRatio, children }: TrailLineProps) {
  return (
    <svg viewBox={viewBox} className={`art trail-svg ${className}`} aria-hidden="true" focusable="false" data-trail="" preserveAspectRatio={preserveAspectRatio}>
      <defs>
        <mask id={`trail-${id}`} maskUnits="userSpaceOnUse">
          <path d={d} pathLength={1} className="trail-mask" />
        </mask>
      </defs>
      <path d={d} className="trail-route" mask={`url(#trail-${id})`} />
      <g className="trail-paw">{paws.map(([x, y, r], i) => <Paw key={i} x={x} y={y} r={r} s={0.9} />)}</g>
      {children}
    </svg>
  );
}

/** Route drawn inside a larger SVG (no own <svg>), still revealed by the parent's data-trail. */
export function TrailPath({ id, d, paws = [], width }: { id: string; d: string; paws?: [number, number, number][]; width?: number }) {
  return (
    <g>
      <mask id={`trail-${id}`} maskUnits="userSpaceOnUse">
        <path d={d} pathLength={1} className="trail-mask" />
      </mask>
      <path d={d} className="trail-route" mask={`url(#trail-${id})`} style={width ? { strokeWidth: width } : undefined} />
      <g className="trail-paw">{paws.map(([x, y, r], i) => <Paw key={i} x={x} y={y} r={r} s={0.9} />)}</g>
    </g>
  );
}

/** "You are here" map pin. (x, y) is the point. */
export function HerePin({ x, y, label = true, side = 'right' }: { x: number; y: number; label?: boolean; side?: 'left' | 'right' }) {
  const lx = side === 'right' ? 22 : -140;
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx="0" cy="2" rx="12" ry="4" className="f-line" opacity=".25" />
      <path className="f-leash ln" d="M0 0C-6-12-18-20-18-34a18 18 0 0 1 36 0C18-20 6-12 0 0z" />
      <circle cy="-34" r="7" className="f-white ln ln-thin" />
      {label && (
        <g>
          <rect x={lx} y="-58" width="118" height="30" rx="8" className="f-sign ln ln-thin" />
          <text x={lx + 59} y="-37" textAnchor="middle" className="font-hand f-sign-ink" fontSize="21">You are here</text>
        </g>
      )}
    </g>
  );
}

type DogKind = 'corgi' | 'lab' | 'terrier' | 'beagle';
const DOG: Record<DogKind, { body: string; chest: string; ear: 'up' | 'flop'; leg: number; len: number; tail: 'up' | 'stub' | 'wag' }> = {
  corgi: { body: '#D98A3D', chest: '#FBF3E2', ear: 'up', leg: 12, len: 44, tail: 'stub' },
  lab: { body: '#E1BE73', chest: '#EFD69C', ear: 'flop', leg: 30, len: 48, tail: 'wag' },
  terrier: { body: '#8F877C', chest: '#C9C1B3', ear: 'up', leg: 22, len: 38, tail: 'up' },
  beagle: { body: '#C9853F', chest: '#FBF3E2', ear: 'flop', leg: 20, len: 40, tail: 'up' },
};

/**
 * Side-view trotting dog facing right. (x, y) is the ground under its front paws' midpoint.
 * `collar` is reported back so leashes can attach: body local (len*.86, -(leg+38)).
 */
export function Dog({ kind, x, y, s = 1, trot = true, className = '' }: { kind: DogKind; x: number; y: number; s?: number; trot?: boolean; className?: string }) {
  const d = DOG[kind];
  const top = -(d.leg + 22);           // body centre y
  const half = d.len / 2;
  const hx = half + 14, hy = top - 18; // head centre
  const legs = trot ? [[-half + 8, -7], [-half + 18, 9], [half - 14, 9], [half - 4, -8]] : [[-half + 8, 0], [-half + 18, 0], [half - 14, 0], [half - 4, 0]];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={`dim ${className}`}>
      <ellipse cx="0" cy="2" rx={half + 10} ry="4" className="f-line" opacity=".18" />
      {/* tail */}
      {d.tail === 'stub' && <path d={`M${-half - 2} ${top - 6}q-8-4-10-10`} className="nf ln" strokeWidth="6" style={{ stroke: d.body }} />}
      {d.tail === 'up' && <path d={`M${-half} ${top - 4}q-10-14-4-30`} className="nf ln" />}
      {d.tail === 'up' && <path d={`M${-half} ${top - 4}q-10-14-4-30`} className="nf" strokeWidth="5" strokeLinecap="round" style={{ stroke: d.body }} />}
      {d.tail === 'wag' && <path d={`M${-half} ${top - 2}q-18-6-24-22`} className="nf ln" strokeWidth="2.5" />}
      {d.tail === 'wag' && <path d={`M${-half} ${top - 2}q-18-6-24-22`} className="nf" strokeWidth="6" strokeLinecap="round" style={{ stroke: d.body }} />}
      {/* legs */}
      {legs.map(([lx, swing], i) => (
        <g key={i}>
          <path d={`M${lx} ${top + 8}L${lx + swing * 0.6} -2`} className="nf ln" strokeWidth="10" style={{ stroke: 'var(--line)' }} />
          <path d={`M${lx} ${top + 8}L${lx + swing * 0.6} -2`} className="nf" strokeWidth="5.5" strokeLinecap="round" style={{ stroke: i % 3 === 0 ? d.body : d.chest }} />
        </g>
      ))}
      {/* body */}
      <ellipse cx="0" cy={top} rx={half + 6} ry={kind === 'lab' ? 17 : 16} className="ln" style={{ fill: d.body }} />
      <path d={`M${half - 10} ${top + 4}q8 10 18 2`} className="nf" strokeWidth="7" strokeLinecap="round" style={{ stroke: d.chest }} />
      {kind === 'beagle' && <path d={`M${-half + 4} ${top - 12}q${half} -10 ${half + 6} 2q-${half} 8 -${half + 6} -2z`} fill="#3A2B22" />}
      {kind === 'terrier' && <path d={`M${-half} ${top + 10}l4 6 4-5 4 6 4-6 4 6 4-5 4 6 4-6 4 6 4-5`} className="nf ln ln-thin" />}
      {/* neck + head */}
      <path d={`M${half - 2} ${top - 4}L${hx - 4} ${hy + 6}`} className="nf ln" strokeWidth="16" />
      <path d={`M${half - 2} ${top - 4}L${hx - 4} ${hy + 6}`} className="nf" strokeWidth="11" strokeLinecap="round" style={{ stroke: d.body }} />
      <circle cx={hx} cy={hy} r="13" className="ln" style={{ fill: d.body }} />
      <ellipse cx={hx + 13} cy={hy + 4} rx="10" ry={kind === 'lab' ? 7.5 : 6.5} className="ln" style={{ fill: kind === 'corgi' || kind === 'beagle' ? d.chest : d.body }} />
      <circle cx={hx + 22} cy={hy + 2} r="3" className="f-line" />
      {kind === 'terrier' && <path d={`M${hx + 8} ${hy + 10}l2 6 3-5 3 6 2-6`} className="nf ln ln-thin" style={{ fill: d.chest }} />}
      <circle cx={hx + 5} cy={hy - 3} r="2.1" className="f-line" />
      <circle cx={hx + 5.6} cy={hy - 3.6} r=".7" className="f-white" />
      {d.ear === 'up'
        ? <path d={`M${hx - 8} ${hy - 9}l-2-16 11 10z`} className="ln" style={{ fill: d.body }} />
        : <path d={`M${hx - 6} ${hy - 10}q-12 2-9 20q6 2 10-6z`} className="ln" style={{ fill: kind === 'lab' ? '#C9A35A' : '#7A4A22' }} />}
      {/* collar */}
      <path d={`M${half + 4} ${top - 14}l7 9`} className="nf" strokeWidth="5" strokeLinecap="round" style={{ stroke: 'var(--leash)' }} />
    </g>
  );
}

/** Collar point for a Dog placed at (x, y) with scale s, for leash lines. */
export function collarOf(kind: DogKind, x: number, y: number, s = 1): [number, number] {
  const d = DOG[kind];
  const top = -(d.leg + 22);
  return [x + (d.len / 2 + 7) * s, y + (top - 10) * s];
}

/** A tennis ball with its seam. */
export function Ball({ x, y, r = 14, className = '' }: { x: number; y: number; r?: number; className?: string }) {
  return (
    <g className={className}>
      <circle cx={x} cy={y} r={r} className="f-ball ln" />
      <path d={`M${x - r * 0.75} ${y - r * 0.65}q${r * 0.7} ${r * 0.65} 0 ${r * 1.3}M${x + r * 0.75} ${y - r * 0.65}q${-r * 0.7} ${r * 0.65} 0 ${r * 1.3}`} className="nf s-paper" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

/** Round tree with a trunk; (x, y) is the base. */
export function Oak({ x, y, s = 1, tone = 'leaf' }: { x: number; y: number; s?: number; tone?: 'leaf' | 'leaf-dark' | 'grass-deep' }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-7 0c2-22 1-44-2-64h18c-3 20-4 42-2 64z" className="f-bark ln" />
      <path d="M2-50l-18-16M4-58l16-14" className="nf ln" />
      <path d="M-58-92c-14-28 10-58 36-50 6-26 52-30 62-4 26-6 44 22 30 44 16 18 2 46-22 44-12 18-46 18-58 2-24 8-52-8-48-36z" className={`f-${tone} ln`} />
      <path d="M-30-96q8-8 18-6M14-120q10-4 18 4M26-78q8 2 12 10" className="nf ln ln-thin" opacity=".55" />
    </g>
  );
}

/** Birch: pale trunk with dark marks and a loose crown. */
export function Birch({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-30-150c-16-30 6-56 30-50 20-14 50 4 44 28 16 14 6 42-16 40-10 16-40 14-46 0-16 2-24-8-12-18z" className="f-grass-deep ln" />
      <path d="M-5 0c1-60 0-120-2-170h12c-2 50-2 110 0 170z" className="f-sign ln" />
      <path d="M-5-30h6M0-62h5M-6-96h7M-1-128h5M-4-150h4" className="nf ln" />
      <path d="M2-118l20-26M-4-100l-18-20" className="nf ln" />
    </g>
  );
}

/** The walker: green rain jacket, three leashes in the right hand. (x, y) is between the feet. */
export function WalkerFigure({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className="dim">
      <ellipse cx="4" cy="3" rx="44" ry="6" className="f-line" opacity=".18" />
      {/* legs mid-stride */}
      <path d="M-6-98L-30-4" className="nf ln" strokeWidth="22" />
      <path d="M-6-98L-30-4" className="nf" strokeWidth="16.5" strokeLinecap="round" stroke="#3E5B7A" />
      <path d="M8-98L26-6" className="nf ln" strokeWidth="22" />
      <path d="M8-98L26-6" className="nf" strokeWidth="16.5" strokeLinecap="round" stroke="#36506C" />
      <path d="M-44-2h22l4-8h-20q-6 0-6 8z" className="f-bark ln" />
      <path d="M18-4h24q4-8-4-8h-20z" className="f-bark ln" />
      {/* back arm */}
      <path d="M-14-176q-26 30-22 58" className="nf ln" strokeWidth="19" />
      <path d="M-14-176q-26 30-22 58" className="nf" strokeWidth="13.5" strokeLinecap="round" style={{ stroke: 'var(--primary)' }} />
      {/* jacket */}
      <path d="M-30-182q30-16 58 0l8 92q-38 12-76 0z" className="f-primary ln" />
      <path d="M-2-186v92M-20-120h12M8-120h12" className="nf ln ln-thin" />
      <path d="M-26-150l52 4" className="nf s-ball" strokeWidth="4" opacity=".85" />
      {/* poop-bag roll on the belt */}
      <rect x="-40" y="-112" width="14" height="20" rx="4" className="f-leash ln ln-thin" />
      {/* head */}
      <path d="M-6-190v-10h12v10z" fill="#B97C52" className="ln ln-thin" />
      <circle cx="2" cy="-218" r="21" fill="#C98E62" className="ln" />
      <path d="M-20-222q0-24 22-24t22 20q-14-8-26-6t-18 10z" fill="#3A2A20" className="ln" />
      <circle cx="-18" cy="-240" r="9" fill="#3A2A20" className="ln" />
      <circle cx="12" cy="-218" r="2.4" className="f-line" />
      <path d="M8-207q6 4 12-1" className="nf ln ln-thin" />
      <circle cx="16" cy="-209" r="4" fill="#E79A7E" opacity=".6" />
      {/* front arm reaching forward with leashes */}
      <path d="M14-172q26 26 50 30" className="nf ln" strokeWidth="19" />
      <path d="M14-172q26 26 50 30" className="nf" strokeWidth="13.5" strokeLinecap="round" style={{ stroke: 'var(--primary)' }} />
      <circle cx="68" cy="-141" r="8" fill="#C98E62" className="ln" />
    </g>
  );
}

/** Hand position of WalkerFigure in its parent's coordinates. */
export const walkerHand = (x: number, y: number, s = 1): [number, number] => [x + 70 * s, y - 140 * s];
