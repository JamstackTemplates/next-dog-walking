// Trailhead signpost, park gate, folded map, mailbox and the "Trail closed" 404 scene.
import { Ball, Dog, HerePin, Paw, TrailPath } from './kit';

const BLAZE_PAINT = ['#3E8E3A', '#2F67A8', '#E0812F', '#C7442E'];

/** Tall weathered trailhead post: four routed arrow boards with blazes, a leash hung on the top
 * board, a poop-bag dispenser, and a wildflower mound. */
export function Signpost({ className = '' }: { className?: string }) {
  const boards = [
    { y: 92, dir: 1, w: 196, tilt: -3, label: 'Park' },
    { y: 178, dir: -1, w: 188, tilt: 2.5, label: 'River path' },
    { y: 264, dir: 1, w: 178, tilt: -2, label: 'Lagoon' },
    { y: 350, dir: -1, w: 170, tilt: 3, label: 'Home' },
  ];
  const H = 50; // board height
  const T = 24; // arrow tip depth
  return (
    <svg viewBox="0 0 380 580" className={`art ${className}`} aria-hidden="true" focusable="false">
      {/* grass mound */}
      <path d="M22 548c20-34 92-46 168-46s150 12 168 46c-30 18-306 18-336 0z" className="f-grass ln" />
      <path d="M40 540c40-12 96-16 150-16" className="nf ln ln-thin" opacity=".35" />
      <ellipse cx="190" cy="522" rx="42" ry="8" className="f-grass-deep" opacity=".8" />

      {/* post, slightly tapered with grain, a knot and a shaded side */}
      <path d="M171 526l3-468h34l3 468z" className="f-wood ln" />
      <path d="M198 60h10l3 466h-12z" className="f-bark" opacity=".45" />
      <path d="M180 76c-2 80 2 170-1 250s2 130 0 190M192 64c2 60-2 120 1 190M190 300c-2 70 1 140 0 214" className="nf s-wood-light" strokeWidth="2" strokeLinecap="round" opacity=".85" />
      <ellipse cx="186" cy="456" rx="5" ry="9" className="f-bark ln ln-thin" />
      <path d="M181 446q-4 10 0 20M191 446q4 10 0 20" className="nf s-wood-light" strokeWidth="1.4" />
      {/* cap */}
      <path d="M162 60h56v-8h-56z" className="f-bark ln" />
      <path d="M156 54l34-32 34 32z" className="f-primary-strong ln" />
      <path d="M172 46l18-16" className="nf s-wood-light" strokeWidth="2" strokeLinecap="round" opacity=".6" />
      <circle cx="190" cy="18" r="6" className="f-ball ln" />

      {boards.map((b, i) => {
        const x0 = b.dir > 0 ? 182 : 198 - b.w;
        const face = b.dir > 0
          ? `M${x0} ${b.y}h${b.w - T}l${T} ${H / 2}-${T} ${H / 2}h-${b.w - T}z`
          : `M${x0 + b.w} ${b.y}h-${b.w - T}l-${T} ${H / 2} ${T} ${H / 2}h${b.w - T}z`;
        const inset = b.dir > 0
          ? `M${x0 + 8} ${b.y + 7}h${b.w - T - 12}l${T - 8} ${H / 2 - 7}-${T - 8} ${H / 2 - 7}h-${b.w - T - 12}z`
          : `M${x0 + b.w - 8} ${b.y + 7}h-${b.w - T - 12}l-${T - 8} ${H / 2 - 7} ${T - 8} ${H / 2 - 7}h${b.w - T - 12}z`;
        const blazeX = b.dir > 0 ? x0 + 36 : x0 + b.w - 36;
        const textX = b.dir > 0 ? x0 + 60 : x0 + b.w - 60;
        const cy = b.y + H / 2;
        return (
          <g key={b.label} transform={`rotate(${b.tilt} 190 ${cy})`}>
            {/* board thickness and cast shadow on the post */}
            <path d={face} className="f-line" opacity=".22" transform="translate(4 9)" />
            <path d={face} className="f-primary-strong ln" transform="translate(0 6)" />
            <path d={face} className="f-primary ln" />
            <path d={inset} className="nf s-sign-ink" strokeWidth="1.6" opacity=".35" />
            <path d={`M${x0 + 14} ${b.y + 4}h${b.w - T - 22}`} className="nf" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity=".18" />
            {/* blaze on a cream roundel */}
            <circle cx={blazeX} cy={cy} r="16" fill="#F3EFD9" className="ln ln-thin" />
            {i === 0 && <circle cx={blazeX} cy={cy} r="10" fill={BLAZE_PAINT[0]} />}
            {i === 1 && <rect x={blazeX - 9} y={cy - 9} width="18" height="18" rx="1.5" fill={BLAZE_PAINT[1]} />}
            {i === 2 && <path d={`M${blazeX} ${cy - 11}l11 19h-22z`} fill={BLAZE_PAINT[2]} strokeLinejoin="round" />}
            {i === 3 && <path d={`M${blazeX} ${cy - 12}l12 12-12 12-12-12z`} fill={BLAZE_PAINT[3]} />}
            <text x={textX} y={cy + 7} textAnchor={b.dir > 0 ? 'start' : 'end'} fill="#F3EFD9" className="font-display" fontSize="19" letterSpacing=".5">{b.label}</text>
            {i === 0 && (
              /* leash looped over the top board, clip hanging below */
              <g>
                <path d={`M${x0 + b.w - 52} ${b.y - 4}v${H + 8}`} className="nf ln" strokeWidth="10" />
                <path d={`M${x0 + b.w - 52} ${b.y - 4}v${H + 8}`} className="nf s-leash" strokeWidth="6" strokeLinecap="round" />
                <path d={`M${x0 + b.w - 52} ${b.y + H + 4}c2 26-6 44-20 52`} className="nf ln" strokeWidth="10" />
                <path d={`M${x0 + b.w - 52} ${b.y + H + 4}c2 26-6 44-20 52`} className="nf s-leash" strokeWidth="6" strokeLinecap="round" />
                <rect x={x0 + b.w - 80} y={b.y + H + 52} width="12" height="18" rx="4" transform={`rotate(30 ${x0 + b.w - 74} ${b.y + H + 61})`} className="f-tag ln ln-thin" />
              </g>
            )}
            {/* bolts */}
            <circle cx="190" cy={cy - 12} r="3.2" className="f-tag ln ln-thin" />
            <circle cx="190" cy={cy + 12} r="3.2" className="f-tag ln ln-thin" />
          </g>
        );
      })}

      {/* poop-bag dispenser strapped to the post */}
      <path d="M174 428h34" className="nf ln" strokeWidth="7" />
      <path d="M174 428h34" className="nf s-ink-soft" strokeWidth="3.5" strokeLinecap="round" />
      <rect x="206" y="410" width="38" height="52" rx="8" className="f-leash ln" />
      <path d="M212 418h26" className="nf" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity=".35" />
      <Paw x={225} y={438} s={0.95} className="f-white" />
      <path d="M216 462l-2 14h22l-2-14" className="f-grass ln ln-thin" />

      {/* wildflowers and tufts */}
      {[[68, 528], [300, 530], [128, 540], [258, 542]].map(([x, y], i) => (
        <g key={`t${i}`}>
          <path d={`M${x} ${y}l-6-18M${x} ${y}l1-22M${x} ${y}l8-16`} className="nf ln ln-thin" />
        </g>
      ))}
      {[[86, 512, 1], [272, 508, 0.85], [318, 520, 1.1], [46, 530, 0.8]].map(([x, y, s], i) => (
        <g key={`d${i}`} transform={`translate(${x} ${y}) scale(${s})`}>
          <path d="M0 0v28" className="nf ln ln-thin" />
          {[0, 60, 120, 180, 240, 300].map(a => (
            <ellipse key={a} cx="0" cy="-7" rx="3.6" ry="6.5" transform={`rotate(${a})`} className="f-white ln ln-thin" />
          ))}
          <circle r="4" className="f-ball ln ln-thin" />
        </g>
      ))}
      {[[246, 524], [104, 534], [338, 538]].map(([x, y], i) => (
        <g key={`b${i}`} transform={`translate(${x} ${y})`}>
          <path d="M0 0v16" className="nf ln ln-thin" />
          <path d="M0-2c-6 0-8-8-3-9 0-5 6-5 6 0 5 1 3 9-3 9z" className="f-ball ln ln-thin" />
        </g>
      ))}
      <Ball x={282} y={536} r={12} />

    </svg>
  );
}

/** Iron park gate between stone pillars, with the Trail Line arriving at it. */
export function ParkGate({ className = '', id = 'gate' }: { className?: string; id?: string }) {
  return (
    <svg viewBox="0 0 460 380" className={`art ${className}`} aria-hidden="true" focusable="false" data-trail="">
      <defs>
        <radialGradient id={`${id}-glow`}>
          <stop offset="0" stopColor="#F6F09A" stopOpacity=".85" />
          <stop offset="1" stopColor="#F6E27A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d="M0 340q230-26 460 0v40H0z" className="f-grass ln" />
      <circle cx="120" cy="58" r="60" fill={`url(#${id}-glow)`} className="lamp-glow" />
      {/* pillars */}
      {[90, 330].map(x => (
        <g key={x}>
          <path d={`M${x} 344V110h60v234z`} className="f-stone ln" />
          <path d={`M${x - 8} 110h76l-8-16h-60z`} className="f-stone ln" />
          <path d={`M${x} 150h60M${x} 200h60M${x} 250h60M${x} 300h60M${x + 30} 110v40M${x + 18} 150v50M${x + 42} 200v50M${x + 22} 250v50`} className="nf ln ln-thin" opacity=".6" />
        </g>
      ))}
      {/* lamp on the left pillar */}
      <path d="M112 94V70h16v24z" className="f-primary-strong ln" />
      <path d="M108 70h24l-4-22h-16z" className="f-ball ln" />
      <path d="M104 48h32l-16-12z" className="f-primary-strong ln" />
      {/* gate: one leaf closed, one swung open */}
      <g>
        <path d="M150 330V150q40-26 80-6v186" className="nf ln ln-bold" />
        <path d="M162 330V146M178 330V140M194 330V138M210 330V140" className="nf ln" />
        <path d="M150 196h80M150 300h80" className="nf ln" />
        <circle cx="190" cy="248" r="16" className="nf ln" />
      </g>
      <g>
        <path d="M330 330V150q-24-14-48-4l-12 6v178" className="nf ln ln-bold" />
        <path d="M318 330V146M304 330V144M290 330V146" className="nf ln" />
        <path d="M270 196h60M270 300h60" className="nf ln" />
      </g>
      {/* plaque */}
      <g transform="rotate(-3 120 230)">
        <rect x="58" y="206" width="124" height="54" rx="8" className="f-primary ln" />
        <text x="120" y="229" textAnchor="middle" fill="#F3EFD9" className="font-display" fontSize="15">Dogs on leash</text>
        <text x="120" y="249" textAnchor="middle" fill="#F3EFD9" className="font-display" fontSize="15">please</text>
      </g>
      <TrailPath id={id} d="M-20 372C60 360 120 376 200 362s50-18 80-30" paws={[[88, 366, 82], [168, 364, 96]]} width={4} />
      <Ball x={258} y={334} r={11} />
      <path d="M380 344l4-14 5 14M30 350l4-12 5 12" className="nf ln" />
    </svg>
  );
}

/** Folded park map with a dashed route and the pin (Service area page head). */
export function FoldedMap({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 300" className={`art ${className}`} aria-hidden="true" focusable="false" data-trail="">
      <path d="M20 46l120-30 130 30 130-30v238l-130 30-130-30-120 30z" className="f-sign ln" />
      <path d="M140 16v238M270 46v238" className="nf ln" />
      <path d="M140 16l130 30v238l-130-30z" className="f-paper-deep" opacity=".6" />
      <path d="M20 130q60-30 120-10t130 0 130-40v70q-70 30-130 34t-130-6-120 28z" className="f-sky ln ln-thin" />
      <ellipse cx="90" cy="214" rx="44" ry="26" className="f-grass ln ln-thin" />
      <ellipse cx="330" cy="200" rx="40" ry="24" className="f-grass ln ln-thin" />
      <path d="M210 70q30-12 50 4t-8 30-48-10z" className="f-grass ln ln-thin" />
      <TrailPath id="folded" d="M60 230C110 190 150 230 200 200s60-90 120-70 50 50 40 70" paws={[[150, 214, 40]]} />
      <HerePin x={60} y={232} label={false} />
      <g transform="translate(360 64)">
        <circle r="22" className="f-sign ln ln-thin" />
        <Paw x={0} y={2} s={1.1} className="f-primary" />
        <path d="M0-30v-8" className="nf ln ln-thin" />
      </g>
    </svg>
  );
}

/** "Trail mailbox" for Contact: rural mailbox, flag up, a letter in the slot. */
export function Mailbox({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 380 360" className={`art ${className}`} aria-hidden="true" focusable="false">
      <ellipse cx="190" cy="336" rx="150" ry="18" className="f-grass ln" />
      <path d="M178 340V170h24v170z" className="f-wood ln" />
      <path d="M70 180V110q0-50 70-50h150v120z" className="f-primary ln" />
      <path d="M70 110q0-50 70-50 66 0 66 50v70H70z" className="f-primary ln" />
      <path d="M86 110q0-34 54-36 50 0 50 36v52H86z" className="f-primary-strong ln" opacity=".9" />
      <path d="M290 60v-40h-12v76h12" className="f-leash ln" />
      <path d="M290 20h40l-10 14 10 14h-40z" className="f-leash ln" />
      {/* letter */}
      <g transform="rotate(-12 140 120)">
        <rect x="104" y="96" width="92" height="58" rx="4" className="f-surface ln" />
        <path d="M104 98l46 32 46-32" className="nf ln ln-thin" />
        <Paw x={178} y={140} s={0.9} className="f-leash" />
      </g>
      <g transform="translate(240 124)">
        <circle r="24" className="f-ball ln" />
        <Paw x={0} y={2} s={1.2} className="f-primary" />
      </g>
      <path d="M40 336l5-16 5 16M320 336l5-16 5 16M290 338l4-10 4 10" className="nf ln" />
      <Dog kind="terrier" x={300} y={338} s={0.7} trot={false} />
    </svg>
  );
}

/** 404: a dog sniffing a "Trail closed" sawhorse; the route ends in a paw-print question mark. */
export function TrailClosed({ className = '' }: { className?: string }) {
  const question: [number, number, number][] = [[478, 104, -10], [500, 80, 50], [532, 76, 100], [556, 98, 150], [552, 128, 200], [528, 150, 210], [516, 180, 180], [516, 240, 180]];
  return (
    <svg viewBox="0 0 640 380" className={`art ${className}`} aria-hidden="true" focusable="false" data-trail="">
      <path d="M14 372C80 320 560 320 626 372z" className="f-grass ln" />
      <TrailPath id="lost" d="M40 362C100 340 150 352 220 344s110-12 160-40 70-54 90-78" paws={[[120, 344, 80], [300, 330, 70]]} />
      {question.map(([x, y, r], i) => <Paw key={i} x={x} y={y} r={r} s={1.15} className="f-leash" />)}
      {/* sawhorse */}
      <g>
        <path d="M250 330l26-110M352 330l-26-110M280 330l20-110M326 330l-20-110" className="nf ln ln-bold" />
        <rect x="220" y="196" width="170" height="40" rx="6" className="f-sign ln" />
        <path d="M232 236l30-40M268 236l30-40M304 236l30-40M340 236l30-40M376 236l14-18" className="nf s-leash" strokeWidth="11" />
        <rect x="220" y="196" width="170" height="40" rx="6" className="nf ln" />
        <rect x="226" y="128" width="158" height="54" rx="8" className="f-primary ln" />
        <text x="305" y="164" textAnchor="middle" fill="#F3EFD9" className="font-display" fontSize="22">Trail closed</text>
        <path d="M268 182v14M342 182v14" className="nf ln" />
      </g>
      <Dog kind="terrier" x={150} y={334} s={1.25} trot={false} />
      <path d="M210 270q8-6 14 0M214 258q10-8 18 0" className="nf ln ln-thin" />
      <path d="M540 350l5-16 5 16M90 352l5-14 5 14" className="nf ln" />
    </svg>
  );
}
