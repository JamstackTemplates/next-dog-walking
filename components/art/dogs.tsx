// Character dog art: the owner-note polaroid portraits (home page) and Biscuit asleep in her bed
// (walkers page). Flat fills with the shared ink outline; coat colours are fixed, `.dim` softens them in dark mode.
import { Ball, Birch, Oak } from './kit';

type PortraitKind = 'corgi' | 'lab' | 'terrier';

/** Closed tufted outline around an ellipse, for wiry or fluffy fur. */
function tufts(cx: number, cy: number, rx: number, ry: number, n: number, depth: number, from = 0, to = 360) {
  const rad = (a: number) => (a * Math.PI) / 180;
  const pt = (a: number, grow: number) => {
    const r = rad(a);
    return `${(cx + Math.cos(r) * (rx + grow)).toFixed(1)} ${(cy + Math.sin(r) * (ry + grow)).toFixed(1)}`;
  };
  const step = (to - from) / n;
  let d = `M${pt(from, 0)}`;
  for (let i = 0; i < n; i++) {
    const a = from + i * step;
    d += `Q${pt(a + step * 0.35, depth)} ${pt(a + step * 0.62, depth * 0.55)}T${pt(a + step, 0)}`;
  }
  return d;
}

const mirror = (d: string) => <path d={d} transform="matrix(-1 0 0 1 200 0)" />;

/** Background for each polaroid: sky, a far hill, the near grass and a tree or two. */
function PortraitScene({ kind }: { kind: PortraitKind }) {
  return (
    <>
      <rect width="200" height="170" className="f-air" />
      {kind === 'lab' && <path d="M0 104q40-10 80-4t120-6v20H0z" className="f-sky" opacity=".75" />}
      <path d="M0 112q50-26 110-14t90-8v80H0z" className="f-leaf" opacity=".55" />
      {kind === 'corgi' && <Oak x={30} y={118} s={0.42} tone="leaf-dark" />}
      {kind === 'terrier' && <><Birch x={26} y={124} s={0.48} /><Oak x={180} y={118} s={0.34} tone="leaf-dark" /></>}
      {kind === 'lab' && <Oak x={176} y={112} s={0.36} tone="leaf-dark" />}
      <path d="M0 128q60-14 120-6t80 0v48H0z" className="f-grass ln" />
      <path d="M14 146l3-7 3 7M168 140l3-7 3 7M148 160l3-6 3 6" className="nf ln ln-thin" opacity=".6" />
      {kind === 'lab' && <Ball x={170} y={150} r={10} />}
      {kind === 'corgi' && <g><circle cx="172" cy="148" r="4" className="f-ball ln ln-thin" /><circle cx="184" cy="156" r="3.4" className="f-white ln ln-thin" /></g>}
    </>
  );
}

function Eyes({ y = 86, gap = 17, r = 5.6 }: { y?: number; gap?: number; r?: number }) {
  return (
    <>
      {[100 - gap, 100 + gap].map(x => (
        <g key={x}>
          <ellipse cx={x} cy={y} rx={r} ry={r * 1.1} className="f-line" />
          <circle cx={x + r * 0.3} cy={y - r * 0.38} r={r * 0.36} className="f-white" />
          <circle cx={x - r * 0.35} cy={y + r * 0.4} r={r * 0.15} className="f-white" opacity=".8" />
        </g>
      ))}
    </>
  );
}

/** Happy open mouth under the nose, with a tongue. */
function Smile({ y, w = 12, tongue = 14 }: { y: number; w?: number; tongue?: number }) {
  return (
    <>
      <path d={`M${100 - w + 2} ${y + 4}q${w - 2} ${tongue + 2} ${(w - 2) * 2} 0z`} fill="#7A2E2A" className="ln ln-thin" />
      <path d={`M${100 - 6} ${y + 7}q6 ${tongue} 12 0q-6-3-12 0z`} fill="#E77A7A" className="ln ln-thin" />
      <path d={`M100 ${y + 8}v${tongue * 0.5}`} className="nf ln ln-thin" opacity=".6" />
      <path d={`M100 ${y - 6}v6M${100 - w} ${y + 2}q${w * 0.5} 6 ${w} -2q${w * 0.5} 8 ${w} 2`} className="nf ln" />
    </>
  );
}

function Nose({ y, w = 9 }: { y: number; w?: number }) {
  return (
    <>
      <path d={`M${100 - w} ${y - 3}q${w} -6 ${w * 2} 0q-1 8 -${w} 9q-${w - 1} -1 -${w} -9z`} className="f-line" />
      <ellipse cx={100 - w * 0.3} cy={y - 3.5} rx={w * 0.3} ry="1.6" className="f-white" opacity=".55" />
    </>
  );
}

/** Collar ring across the chest with a hanging tag. */
function Collar({ y, tone, tag = 'ball' }: { y: number; tone: 'leash' | 'sky' | 'primary'; tag?: 'ball' | 'tag' }) {
  return (
    <>
      <path d={`M60 ${y - 8}q40 22 80 0`} className="nf ln" strokeWidth="11" />
      <path d={`M60 ${y - 8}q40 22 80 0`} className={`nf s-${tone}`} strokeWidth="6.5" strokeLinecap="round" />
      <circle cx="100" cy={y + 5} r="3" className="nf ln ln-thin" />
      <path d={`M100 ${y + 8}l7 5-2 8h-10l-2-8z`} className={`f-${tag} ln ln-thin`} />
    </>
  );
}

/** Head-on dog portrait for the owner-note polaroids. viewBox 200×170. */
export function DogPortrait({ kind, className = '' }: { kind: PortraitKind; className?: string }) {
  return (
    <svg viewBox="0 0 200 170" className={`art ${className}`} aria-hidden="true" focusable="false">
      <PortraitScene kind={kind} />
      <g className="dim">
        {kind === 'corgi' && <Corgi />}
        {kind === 'lab' && <Lab />}
        {kind === 'terrier' && <Terrier />}
      </g>
    </svg>
  );
}

const CORGI = { coat: '#D98A3D', shade: '#B8692A', cream: '#FBF3E2', pink: '#F0A898' };
function Corgi() {
  const c = CORGI;
  return (
    <>
      {/* shoulders and fluffy bib */}
      <path d="M34 172c2-30 22-50 46-56h40c24 6 44 26 46 56z" fill={c.coat} className="ln" />
      <path d={tufts(100, 160, 30, 34, 9, 5, 180, 360)} fill={c.cream} className="ln" />
      <path d="M70 172v-14h60v14z" fill={c.cream} />
      <Collar y={124} tone="leash" />
      {/* big upright ears */}
      <g fill={c.coat} className="ln">
        <path d="M74 66C62 50 56 26 60 10c16 6 34 22 40 40z" />
        {mirror('M74 66C62 50 56 26 60 10c16 6 34 22 40 40z')}
      </g>
      <g fill={c.pink}>
        <path d="M74 56c-7-11-10-24-9-36 9 6 18 16 24 26z" />
        {mirror('M74 56c-7-11-10-24-9-36 9 6 18 16 24 26z')}
      </g>
      <g className="nf ln ln-thin" opacity=".5">
        <path d="M68 34q4 10 10 16" />
        {mirror('M68 34q4 10 10 16')}
      </g>
      {/* head: foxy, wide cheeks with fluff */}
      <path d="M100 44c28 0 46 18 48 40 1 12-3 22-10 30l6 4-10 2c-8 6-20 10-34 10s-26-4-34-10l-10-2 6-4c-7-8-11-18-10-30 2-22 20-40 48-40z" fill={c.coat} className="ln" />
      {/* white blaze widening into muzzle and cheeks */}
      <path d="M100 56c4 0 6 8 7 18 1 8 4 14 12 18 10 4 16 12 14 20-3 10-16 16-33 16s-30-6-33-16c-2-8 4-16 14-20 8-4 11-10 12-18 1-10 3-18 7-18z" fill={c.cream} />
      <path d="M100 56c4 0 6 8 7 18M100 56c-4 0-6 8-7 18" className="nf ln ln-thin" opacity=".35" />
      {/* eyebrows dots */}
      <ellipse cx="80" cy="74" rx="4" ry="2.4" fill={c.cream} />
      <ellipse cx="120" cy="74" rx="4" ry="2.4" fill={c.cream} />
      <Eyes y={86} gap={20} r={5.4} />
      {/* rosy cheeks */}
      <ellipse cx="72" cy="104" rx="6" ry="3.5" fill={c.pink} opacity=".7" />
      <ellipse cx="128" cy="104" rx="6" ry="3.5" fill={c.pink} opacity=".7" />
      <Nose y={102} w={8} />
      <Smile y={110} w={11} tongue={14} />
    </>
  );
}

const LAB = { coat: '#E7C27A', ear: '#C99B4E', light: '#F4DEA8', shade: '#D1A85E' };
function Lab() {
  const c = LAB;
  return (
    <>
      <path d="M28 172c4-34 30-54 72-56 42 2 68 22 72 56z" fill={c.coat} className="ln" />
      <path d="M74 172c2-20 12-32 26-34 14 2 24 14 26 34z" fill={c.light} />
      <path d="M58 150q-6 10-6 22M142 150q6 10 6 22" className="nf ln ln-thin" opacity=".45" />
      <Collar y={124} tone="sky" tag="tag" />
      {/* broad head with a soft brow */}
      <path d="M100 40c30 0 50 18 52 44 1 18-6 32-18 40-10 6-22 8-34 8s-24-2-34-8c-12-8-19-22-18-40 2-26 22-44 52-44z" fill={c.coat} className="ln" />
      <path d="M86 64q14-6 28 0" className="nf ln ln-thin" opacity=".45" />
      <path d="M92 56q8-3 16 0" className="nf ln ln-thin" opacity=".35" />
      {/* wide muzzle */}
      <path d="M100 86c18 0 32 10 32 24 0 14-14 22-32 22s-32-8-32-22c0-14 14-24 32-24z" fill={c.light} className="ln ln-thin" />
      {/* floppy ears, hanging over the head sides */}
      <g fill={c.ear} className="ln">
        <path d="M66 52c-14 0-26 10-28 30-2 18 4 32 14 34 8 2 12-6 14-16 2-14 4-30 10-44-2-3-6-4-10-4z" />
        {mirror('M66 52c-14 0-26 10-28 30-2 18 4 32 14 34 8 2 12-6 14-16 2-14 4-30 10-44-2-3-6-4-10-4z')}
      </g>
      <g className="nf ln ln-thin" opacity=".4">
        <path d="M50 74q-4 16 2 32" />
        {mirror('M50 74q-4 16 2 32')}
      </g>
      <Eyes y={80} gap={18} r={5.4} />
      <path d="M74 72q8-6 16-2M126 72q-8-6-16-2" className="nf ln" />
      <Nose y={100} w={10} />
      <g className="f-line" opacity=".35">
        <circle cx="84" cy="108" r="1.2" /><circle cx="88" cy="112" r="1.2" /><circle cx="80" cy="113" r="1.2" />
        <circle cx="116" cy="108" r="1.2" /><circle cx="112" cy="112" r="1.2" /><circle cx="120" cy="113" r="1.2" />
      </g>
      <Smile y={110} w={14} tongue={17} />
    </>
  );
}

const TERRIER = { coat: '#8F877C', dark: '#6A625A', light: '#D8CFC0', tan: '#B49A76' };
function Terrier() {
  const c = TERRIER;
  return (
    <>
      <path d={`${tufts(100, 178, 62, 54, 9, 4, 180, 360)}z`} fill={c.coat} className="ln" />
      <path d={`${tufts(100, 172, 24, 34, 6, 4, 180, 360)}z`} fill={c.tan} />
      <Collar y={128} tone="leash" />
      {/* folded, tipped-forward ears */}
      <g fill={c.dark} className="ln">
        <path d="M70 62c-8-8-22-14-30-10-2 8 8 22 22 28z" />
        {mirror('M70 62c-8-8-22-14-30-10-2 8 8 22 22 28z')}
      </g>
      {/* scruffy blocky head */}
      <path d={`${tufts(100, 88, 44, 40, 20, 6)}z`} fill={c.coat} className="ln" />
      <path d="M84 56q4 6 2 12M100 52v12M116 56q-4 6-2 12" className="nf ln ln-thin" opacity=".4" />
      {/* tan face patch */}
      <ellipse cx="100" cy="92" rx="30" ry="22" fill={c.tan} opacity=".55" />
      <Eyes y={88} gap={17} r={5} />
      {/* bushy eyebrows */}
      <g fill={c.light} className="ln ln-thin">
        <path d="M70 80c-2-6 2-10 8-10 2-3 8-4 11-1 4 0 6 3 4 7-8-2-16-1-23 4z" />
        {mirror('M70 80c-2-6 2-10 8-10 2-3 8-4 11-1 4 0 6 3 4 7-8-2-16-1-23 4z')}
      </g>
      {/* whiskery beard and moustache */}
      <path d={`${tufts(100, 112, 26, 22, 12, 6, 0, 180)}L74 104q26-10 52 0z`} fill={c.light} className="ln" />
      <path d="M100 98c10 0 20 4 28 12-4 6-14 6-20 2-4 4-12 4-16 0-6 4-16 4-20-2 8-8 18-12 28-12z" fill={c.light} className="ln" />
      <path d="M86 108l-4 6M92 110l-2 8M108 110l2 8M114 108l4 6" className="nf ln ln-thin" opacity=".45" />
      <path d="M93 118q7 10 14 0z" fill="#E77A7A" className="ln ln-thin" />
      <Nose y={100} w={9} />
    </>
  );
}

/** Biscuit the office beagle mix, asleep in her bed beside a desk. viewBox 460×290. */
export function Biscuit({ className = '' }: { className?: string }) {
  const tan = '#C9853F', saddle = '#3A2B22', ear = '#8A5326', cream = '#FBF3E2';
  const body = 'M74 236c-10-34 16-66 70-70 54-4 92 18 94 48 1 16-12 24-34 24H92c-10 0-16-1-18-2z';
  return (
    <svg viewBox="0 0 460 290" className={`art ${className}`} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="biscuit-body"><path d={body} /></clipPath>
      </defs>
      <path d="M0 262h460v28H0z" className="f-wood-light ln" />
      {/* desk */}
      <path d="M250 120h200v18H250z" className="f-wood ln" />
      <path d="M262 138v124M438 138v124" className="nf ln ln-bold" />
      <path d="M262 138v124M438 138v124" className="nf s-wood" strokeWidth="6" />
      <path d="M300 120l10-50h70l10 50z" className="f-primary-strong ln" />
      <rect x="318" y="80" width="54" height="32" rx="3" className="f-sky" />
      <path d="M400 120v-26h22v26z" className="f-leash ln" />
      <path d="M422 100q12 0 10 10t-10 8" className="nf ln" />
      <path d="M406 88q4-10 0-18M414 88q4-10 0-18" className="nf ln ln-thin" opacity=".6" />
      {/* bed: back rim and cushion */}
      <ellipse cx="140" cy="232" rx="130" ry="38" className="f-leash ln" />
      <ellipse cx="140" cy="232" rx="108" ry="24" className="f-sign ln" />
      <path d="M60 222q20-6 40-2M180 220q20-4 40 2" className="nf ln ln-thin" opacity=".3" />
      <g className="dim">
        {/* body mound with black saddle and a shoulder shade */}
        <path d={body} fill={tan} className="ln" />
        <g clipPath="url(#biscuit-body)">
          <path d="M96 196c20-26 62-36 104-28 22 4 38 18 42 34-30-12-60-16-96-12-20 2-36 4-50 6z" fill={saddle} />
          <path d="M120 186q30-12 60-10" className="nf" stroke="#fff" strokeOpacity=".18" strokeWidth="3" strokeLinecap="round" />
        </g>
        {/* hind leg haunch and paw */}
        <path d="M168 234c-6-24 8-46 32-46s38 18 34 36c-2 10-12 14-26 14h-30c-6 0-9-1-10-4z" fill={tan} className="ln" />
        <path d="M184 206q12-8 26-4" className="nf ln ln-thin" opacity=".45" />
        <path d="M200 238c0-8 10-12 22-10 10 2 12 12 2 14h-20c-3 0-4-2-4-4z" fill={cream} className="ln" />
        <path d="M210 234v5M217 234v5" className="nf ln ln-thin" />
        {/* tail curling round to the front, white tip */}
        <path d="M232 200c18-4 26-20 18-36" className="nf ln" strokeWidth="13" />
        <path d="M232 200c18-4 26-20 18-36" className="nf" stroke={tan} strokeWidth="8" strokeLinecap="round" />
        <path d="M253 176c0-5-1-9-3-12" className="nf" stroke={cream} strokeWidth="8" strokeLinecap="round" />
        {/* white front paws stretched out under the chin */}
        <path d="M20 240c-2-7 6-11 16-10h22v13H30c-5 0-9-1-10-3z" fill={cream} className="ln" />
        <path d="M28 233v9M35 232v10" className="nf ln ln-thin" />
        {/* head resting on the paws */}
        <path d="M50 222c-4-20 12-36 36-36 22 0 40 12 44 30 3 14-6 22-22 22H66c-8 0-14-6-16-16z" fill={tan} className="ln" />
        {/* white blaze and muzzle */}
        <path d="M96 190c-10 2-20 10-24 20-2 6-6 8-12 8 6-14 18-26 36-28z" fill={cream} />
        <path d="M36 226c-2-12 10-20 26-18 12 2 18 10 16 20-2 8-10 12-22 12-12 0-19-6-20-14z" fill={cream} className="ln" />
        <ellipse cx="38" cy="222" rx="6.5" ry="5" className="f-line" />
        <ellipse cx="36" cy="220" rx="2" ry="1.2" className="f-white" opacity=".55" />
        <path d="M44 232q10 4 20-1" className="nf ln ln-thin" />
        <g className="f-line" opacity=".35"><circle cx="50" cy="224" r="1" /><circle cx="55" cy="227" r="1" /><circle cx="50" cy="229" r="1" /></g>
        {/* closed, contented eye */}
        <path d="M70 206q7 6 14 0" className="nf ln" />
        <path d="M72 208l-2 3M77 210v3M82 208l2 3" className="nf ln ln-thin" />
        {/* long velvet ear draped down */}
        <path d="M94 192c16-4 28 6 30 22 2 16-4 28-16 30-8-6-14-20-16-34-1-8 0-14 2-18z" fill={ear} className="ln" />
        <path d="M100 202q4 16 10 30" className="nf ln ln-thin" opacity=".4" />
        {/* collar peeking out */}
        <path d="M126 210q4 14 0 26" className="nf ln" strokeWidth="9" />
        <path d="M126 210q4 14 0 26" className="nf s-primary" strokeWidth="5" strokeLinecap="round" />
        <circle cx="132" cy="226" r="4.5" className="f-ball ln ln-thin" />
      </g>
      {/* bed front lip, so she sinks into the cushion */}
      <path d="M10 232c0 22 58 38 130 38s130-16 130-38c-8 16-62 26-130 26S18 248 10 232z" className="f-leash ln" />
      <path d="M40 254q50 10 100 10" className="nf" stroke="#fff" strokeOpacity=".25" strokeWidth="3" strokeLinecap="round" />
      <text x="140" y="160" className="font-hand f-ink-soft" fontSize="34">z</text>
      <text x="164" y="132" className="font-hand f-ink-soft" fontSize="28">z</text>
      <text x="184" y="108" className="font-hand f-ink-soft" fontSize="22">z</text>
      <Ball x={262} y={252} r={12} />
    </svg>
  );
}
