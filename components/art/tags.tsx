// Stamped aluminium dog tags with engraved walker faces and the leash-hook rail pieces.
import type { TagColor, TagShape, Walker } from '../../content/walkers';
import { Paw } from './kit';

const OUTLINE: Record<TagShape, string> = {
  bone: 'M38 58c-16-14-38 2-26 22-12 20 10 36 26 22h84c16 14 38-2 26-22 12-20-10-36-26-22z',
  round: 'M80 46a62 62 0 1 1 0 124 62 62 0 1 1 0-124z',
  heart: 'M80 172C34 140 14 112 16 84c2-30 34-44 64-20 30-24 62-10 64 20 2 28-18 56-64 88z',
  shield: 'M24 54q56-16 112 0v54c0 34-24 56-56 68-32-12-56-34-56-68z',
};
const CENTER: Record<TagShape, [number, number]> = { bone: [80, 100], round: [80, 108], heart: [80, 106], shield: [80, 108] };
const RING_Y: Record<TagShape, number> = { bone: 51, round: 50, heart: 66, shield: 52 };

/** Engraved face: line-only portrait for a tag. */
function Face({ face, x, y, s = 1 }: { face: Walker['face']; x: number; y: number; s?: number }) {
  const engrave = { stroke: 'var(--line)', strokeOpacity: 0.78, strokeWidth: 2.2, fill: 'none', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} style={engrave}>
      <circle r="21" />
      {face.hair === 'bun' && <><path d="M-21-2q0-24 21-24t21 22q-10-12-22-12t-20 14z" /><circle cx="0" cy="-30" r="7" /></>}
      {face.hair === 'short' && <path d="M-20-6q2-18 20-18t20 16q-8-8-20-8t-20 10z" />}
      {face.hair === 'long' && <path d="M-21 2q-2-28 21-28t21 28v18M-21 2v18M-14-14q10 6 28-2" />}
      {face.hair === 'curly' && <path d="M-22-4q-4-8 2-12-2-8 6-10 4-6 12-4 6-4 12 0 8-2 10 6 8 2 4 12 4 6-2 10" />}
      <circle cx="-7" cy="-2" r="1.6" fill="var(--line)" />
      <circle cx="7" cy="-2" r="1.6" fill="var(--line)" />
      {face.glasses && <><circle cx="-7" cy="-2" r="5.5" /><circle cx="7" cy="-2" r="5.5" /><path d="M-1.5-2h3" /></>}
      <path d="M-6 8q6 5 12 0" />
      {face.beard && <path d="M-18 6q4 16 18 16t18-16M-7 14q7 3 14 0" />}
    </g>
  );
}

/** One hanging dog tag with ring. viewBox 160×190; the ring top is at y≈30. */
export function DogTag({ walker, className = '' }: { walker: Pick<Walker, 'tagShape' | 'tagColor' | 'face'>; className?: string }) {
  const shape = walker.tagShape;
  const [cx, cy] = CENTER[shape];
  const fill = `f-${walker.tagColor satisfies TagColor}`;
  return (
    <svg viewBox="0 0 160 190" className={`art ${className}`} aria-hidden="true" focusable="false">
      <g className="tag-swing">
        <circle cx="80" cy="30" r="12" className="nf ln" strokeWidth="4.5" />
        <circle cx="80" cy="30" r="12" className="nf s-tag" strokeWidth="2" />
        <path d={`M80 42V${RING_Y[shape] + 2}`} className="nf ln" strokeWidth="3" />
        <g transform={shape === 'bone' ? 'translate(0 -30) scale(1 1.5)' : undefined}>
          <path d={OUTLINE[shape]} className={`${fill} ln`} transform="translate(3 4)" opacity=".35" vectorEffect="non-scaling-stroke" />
          <path d={OUTLINE[shape]} className={`${fill} ln`} vectorEffect="non-scaling-stroke" />
          <path d={OUTLINE[shape]} className="nf" stroke="#fff" strokeOpacity=".35" strokeWidth="2" transform="translate(80 100) scale(.9) translate(-80 -100)" vectorEffect="non-scaling-stroke" />
        </g>
        <circle cx="80" cy={RING_Y[shape] + 6} r="4" className="f-paper ln ln-thin" />
        {/* scratches */}
        <path d={`M${cx - 40} ${cy + 22}l16-6M${cx + 20} ${cy - 30}l14-4M${cx + 26} ${cy + 28}l10-8`} className="nf" stroke="#fff" strokeOpacity=".5" strokeWidth="1.2" strokeLinecap="round" />
        <Face face={walker.face} x={cx} y={cy} s={shape === 'bone' ? 1 : 1.05} />
      </g>
    </svg>
  );
}

/** Wooden peg on a plank piece: tags hang from these; adjoining pieces read as one rail. */
/** `ends` is a class list rounding the left/right ends, so rows can break at any breakpoint. */
export function PlankPiece({ ends = '' }: { ends?: string }) {
  return (
    <div aria-hidden="true" className="relative h-9">
      <div className={`absolute inset-x-0 top-0 h-7 border-y-[2.5px] border-line bg-wood-light shadow-[0_4px_0_var(--wood)] ${ends}`}>
        <div className="absolute inset-x-0 top-2 h-px bg-wood/60" />
        <div className="absolute inset-x-0 top-4 h-px bg-wood/40" />
      </div>
      <span className="absolute left-1/2 top-1.5 h-5 w-5 -translate-x-1/2 rounded-full border-[2.5px] border-line bg-wood" />
    </div>
  );
}

/** Plank end classes for item i of n in a rail that is 1 column on phones, `mid` columns from `bp`, and n columns from `wide`. */
export function plankEnds(i: number, n: number, bp: 'sm' | 'md', wide: 'md' | 'lg' | null) {
  const L = 'rounded-l-lg border-l-[2.5px]', R = 'rounded-r-lg border-r-[2.5px]';
  const pre = (p: string, c: string) => c.split(' ').map(x => `${p}:${x}`).join(' ');
  const out: string[] = [];
  if (i === 0) out.push(L); else if (wide && i % 2 === 0) out.push(pre(`max-${wide}`, L)); else if (i % 2 === 0) out.push(L);
  if (i === n - 1) out.push(R); else if (wide && i % 2 === 1) out.push(pre(`max-${wide}`, R)); else if (i % 2 === 1) out.push(R);
  if (bp === 'sm') { if (i % 2 === 1) out.push(pre('max-sm', L)); if (i % 2 === 0 && i !== n - 1) out.push(pre('max-sm', R)); }
  return out.join(' ');
}

/** Coiled leash and key ring hung at the ends of the rail. */
export function RailExtras({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 160" className={`art ${className}`} aria-hidden="true" focusable="false">
      <circle cx="40" cy="14" r="9" className="f-wood ln" />
      <path d="M40 20c-24 30-30 60-10 90s50 10 40-20-40-30-50 0 10 50 30 60" className="nf ln" strokeWidth="9" />
      <path d="M40 20c-24 30-30 60-10 90s50 10 40-20-40-30-50 0 10 50 30 60" className="nf s-leash" strokeWidth="5" strokeLinecap="round" />
      <rect x="54" y="140" width="14" height="18" rx="3" className="f-tag ln ln-thin" />
      <circle cx="96" cy="14" r="7" className="f-wood ln" />
      <circle cx="96" cy="40" r="14" className="nf ln" strokeWidth="3" />
      <path d="M92 52l-6 30h6l2 6 4-4-2-6 4-26" className="f-ball ln ln-thin" />
      <path d="M104 50l10 26-6 2-4-8-4 2" className="f-tag ln ln-thin" />
    </svg>
  );
}

/** Walkers page head: a short rail with leashes and three small tags. */
export function LeashRail({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 300" className={`art ${className}`} aria-hidden="true" focusable="false">
      <rect x="10" y="40" width="400" height="34" rx="10" className="f-wood-light ln" />
      <path d="M20 54h380M20 62h380" className="nf s-wood" strokeWidth="1.5" opacity=".7" />
      {[70, 170, 270, 360].map(x => <circle key={x} cx={x} cy="57" r="9" className="f-wood ln" />)}
      <path d="M70 66c-30 60-20 140 10 170s40-40 0-60-50 40-20 90" className="nf ln" strokeWidth="9" />
      <path d="M70 66c-30 60-20 140 10 170s40-40 0-60-50 40-20 90" className="nf s-leash" strokeWidth="5" strokeLinecap="round" />
      <path d="M170 66c20 40 30 90 10 140s-50 10-30-20 50-10 40 40" className="nf ln" strokeWidth="9" />
      <path d="M170 66c20 40 30 90 10 140s-50 10-30-20 50-10 40 40" className="nf s-primary" strokeWidth="5" strokeLinecap="round" />
      <g>
        <path d="M270 66v40" className="nf ln" strokeWidth="3" />
        <path d="M270 106a34 34 0 1 1 0 68 34 34 0 1 1 0-68z" className="f-ball ln" />
        <Paw x={270} y={142} s={1.6} className="f-primary" />
      </g>
      <g>
        <path d="M360 66v30" className="nf ln" strokeWidth="3" />
        <path d="M336 104c-10-8-24 2-16 14-8 12 6 22 16 14h48c10 8 24-2 16-14 8-12-6-22-16-14z" className="f-tag ln" />
        <path d="M360 108v-12" className="nf ln" />
      </g>
      <circle cx="270" cy="250" r="16" className="f-ball ln" />
      <path d="M258 240q12 10 0 22M282 240q-12 10 0 22" className="nf s-paper" strokeWidth="2" />
    </svg>
  );
}
