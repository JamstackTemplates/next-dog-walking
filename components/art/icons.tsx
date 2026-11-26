// Small icons, section edges, park postcard vignettes and the front door.
import type { Park } from '../../content/service-area';
import { Ball, Oak, Paw } from './kit';

export type IconName = 'bowl' | 'towel' | 'bags' | 'camera' | 'key' | 'first-aid' | 'moon-house' | 'puppy' | 'senior' | 'door' | 'van' | 'shield' | 'walker';

/** 48×48 line icons in the shared style. Decorative; always pair with a text label. */
export function Icon({ name, size = 48, className = '' }: { name: IconName; size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={`art shrink-0 ${className}`} aria-hidden="true" focusable="false">
      {name === 'bowl' && <>
        <path d="M6 24h36l-5 14H11z" className="f-primary ln" />
        <path d="M9 24q15-6 30 0" className="f-sky ln ln-thin" />
        <path d="M24 8q-6 8 0 10 6-2 0-10z" className="f-sky ln ln-thin" />
      </>}
      {name === 'towel' && <>
        <path d="M8 10h32v6H8z" className="f-wood ln" />
        <path d="M12 16h24v24l-4-2-4 2-4-2-4 2-4-2-4 2z" className="f-leash ln" />
        <path d="M12 24h24M12 29h24" className="nf s-paper" strokeWidth="2" />
      </>}
      {name === 'bags' && <>
        <rect x="14" y="8" width="20" height="30" rx="6" className="f-leash ln" />
        <path d="M18 38v4h12v-4" className="f-ball ln ln-thin" />
        <Paw x={24} y={22} s={0.8} className="f-white" />
      </>}
      {name === 'camera' && <>
        <path d="M6 16h10l3-5h10l3 5h10v22H6z" className="f-tag ln" />
        <circle cx="24" cy="26" r="8" className="f-sky ln" />
        <circle cx="24" cy="26" r="3" className="f-line" />
        <path d="M34 16v-3h5v3" className="nf ln ln-thin" />
      </>}
      {name === 'key' && <>
        <circle cx="16" cy="18" r="9" className="f-ball ln" />
        <circle cx="14" cy="16" r="3" className="f-paper ln ln-thin" />
        <path d="M22 24l16 16M32 34l4-4M36 38l4-4" className="nf ln ln-bold" />
      </>}
      {name === 'first-aid' && <>
        <path d="M6 12q18-6 36 0l-6 26H12z" className="f-leash ln" />
        <path d="M21 18h6v6h6v6h-6v6h-6v-6h-6v-6h6z" className="f-white ln ln-thin" />
      </>}
      {name === 'moon-house' && <>
        <path d="M8 42V24L24 10l16 14v18z" className="f-primary ln" />
        <rect x="19" y="30" width="10" height="12" className="f-ball ln ln-thin" />
        <path d="M38 4a7 7 0 1 0 6 10 5.5 5.5 0 1 1-6-10z" className="f-ball ln ln-thin" />
      </>}
      {name === 'puppy' && <>
        <circle cx="24" cy="26" r="14" fill="#E1BE73" className="ln dim" />
        <path d="M12 18q-6 6-2 14 6 0 6-8zM36 18q6 6 2 14-6 0-6-8z" fill="#C9A35A" className="ln ln-thin" />
        <circle cx="19" cy="24" r="2" className="f-line" /><circle cx="29" cy="24" r="2" className="f-line" />
        <ellipse cx="24" cy="31" rx="4" ry="3" className="f-line" />
      </>}
      {name === 'senior' && <>
        <circle cx="24" cy="26" r="14" fill="#8F877C" className="ln dim" />
        <path d="M14 32q10 10 20 0" className="f-white ln ln-thin" />
        <path d="M16 20q3-3 6 0M26 20q3-3 6 0" className="nf ln ln-thin" />
        <ellipse cx="24" cy="29" rx="4" ry="3" className="f-line" />
        <path d="M12 16q-4 8 0 14M36 16q4 8 0 14" className="nf ln" />
      </>}
      {name === 'door' && <>
        <rect x="12" y="6" width="24" height="36" rx="2" className="f-primary ln" />
        <circle cx="31" cy="25" r="2" className="f-ball" />
        <path d="M6 42h36" className="nf ln" />
        <Paw x={18} y={36} s={0.55} className="f-ball" />
      </>}
      {name === 'van' && <>
        <path d="M4 32V16h24l8 6h8v10z" className="f-sign ln" />
        <path d="M28 16v8h12" className="nf ln ln-thin" />
        <circle cx="13" cy="34" r="4.5" className="f-line" /><circle cx="35" cy="34" r="4.5" className="f-line" />
        <Paw x={15} y={24} s={0.6} className="f-primary" />
      </>}
      {name === 'shield' && <>
        <path d="M8 10q16-6 32 0v12c0 10-8 17-16 20-8-3-16-10-16-20z" className="f-primary ln" />
        <path d="M17 24l5 5 9-10" className="nf" stroke="#F3EFD9" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      </>}
      {name === 'walker' && <>
        <circle cx="18" cy="10" r="5" fill="#C98E62" className="ln ln-thin" />
        <path d="M12 18h12l2 14H10z" className="f-primary ln ln-thin" />
        <path d="M14 32l-2 10M22 32l3 10" className="nf ln" />
        <path d="M24 22q8 6 12 12" className="nf s-leash" strokeWidth="2" />
        <circle cx="38" cy="36" r="5" fill="#D98A3D" className="ln ln-thin" />
      </>}
    </svg>
  );
}

/** Picket fence edge along the top or bottom of a band. */
export function FenceEdge({ className = '' }: { className?: string }) {
  const pickets = Array.from({ length: 40 }, (_, i) => i * 36 + 4);
  return (
    <svg viewBox="0 0 1440 70" preserveAspectRatio="xMidYMax slice" className={`art block h-[52px] w-full ${className}`} aria-hidden="true" focusable="false">
      <path d="M0 30h1440M0 54h1440" className="nf ln" strokeWidth="9" />
      <path d="M0 30h1440M0 54h1440" className="nf s-wood-light" strokeWidth="5" />
      {pickets.map(x => <path key={x} d={`M${x} 70V16l10-12 10 12v54`} className="f-sign ln" />)}
    </svg>
  );
}

/** Grassy hill edge; place at the top of a filled band (fill uses the band's token). */
export function HillEdge({ tone = 'paper-deep', flip = false, className = '' }: { tone?: 'paper-deep' | 'paper' | 'grass' | 'primary-strong'; flip?: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 1440 60" preserveAspectRatio="none" className={`art block h-[34px] w-full md:h-[56px] ${flip ? 'rotate-180' : ''} ${className}`} aria-hidden="true" focusable="false">
      <path d="M0 60V36C200 4 420 2 640 26s440 30 600 4 200-10 200-10v40z" className={`f-${tone}`} />
      <path d="M0 36C200 4 420 2 640 26s440 30 600 4 200-10 200-10" className="nf ln" vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

/** Postcard vignettes of the parks the walkers use. 240×150. */
export function ParkVignette({ kind, className = '' }: { kind: Park['vignette']; className?: string }) {
  return (
    <svg viewBox="0 0 240 150" className={`art ${className}`} aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice">
      <rect width="240" height="150" className="f-air" />
      {kind === 'lagoon' && <>
        <path d="M0 70q60-20 120-6t120-4v90H0z" className="f-grass-deep ln" />
        <path d="M0 92q120-14 240 0v26q-120 12-240 0z" className="f-sky ln" />
        <path d="M70 100v-14q50-26 100 0v14h-14q-36-24-72 0z" className="f-stone ln" />
        <path d="M0 118q120 10 240 0v32H0z" className="f-grass ln" />
        <Oak x={30} y={86} s={0.32} tone="leaf-dark" /><Oak x={210} y={82} s={0.3} tone="leaf-dark" />
      </>}
      {kind === 'river' && <>
        <path d="M0 60q120-16 240 0v90H0z" className="f-grass ln" />
        <path d="M90 60q-20 30 40 50t20 40h50q30-20-10-40t-30-50z" className="f-sky ln" />
        <path d="M20 150q30-40 60-90" className="nf ln" strokeWidth="14" />
        <path d="M20 150q30-40 60-90" className="nf f-stone s-tag" strokeWidth="10" />
        <path d="M150 118h40v-8h-40zM154 118v10M186 118v10" className="f-wood ln ln-thin" />
        <Oak x={30} y={70} s={0.3} tone="leaf" />
      </>}
      {kind === 'oaks' && <>
        <path d="M0 110q120-14 240 0v40H0z" className="f-grass ln" />
        <Oak x={70} y={120} s={0.7} tone="leaf" /><Oak x={180} y={118} s={0.6} tone="leaf-dark" />
        <circle cx="130" cy="126" r="7" className="f-ball ln ln-thin" />
      </>}
      {kind === 'field' && <>
        <path d="M0 80q120-14 240 0v70H0z" className="f-grass ln" />
        <path d="M0 96h240M0 112h240" className="nf ln" strokeWidth="6" />
        <path d="M0 96h240M0 112h240" className="nf s-wood-light" strokeWidth="3" />
        {[10, 50, 90, 130, 170, 210].map(x => <path key={x} d={`M${x} 124V86`} className="nf ln" strokeWidth="5" />)}
        <Ball x={140} y={136} r={7} />
        <Oak x={200} y={80} s={0.28} tone="leaf-dark" />
      </>}
      {kind === 'lakeshore' && <>
        <path d="M0 70h240v50H0z" className="f-sky ln" />
        <path d="M150 64l16-30v30z" className="f-sign ln ln-thin" /><path d="M140 66h36l-4 6h-28z" className="f-leash ln ln-thin" />
        <path d="M30 82h40M110 96h50M180 84h30" className="nf s-paper" strokeWidth="2" strokeLinecap="round" />
        <path d="M0 112q120-16 240 4v34H0z" className="f-stone ln" />
        <Oak x={30} y={74} s={0.3} tone="leaf-dark" />
      </>}
      <circle cx="210" cy="26" r="12" className="f-ball day-only" opacity=".8" />
      <circle cx="210" cy="26" r="9" fill="#F3EFD9" className="night-only" />
    </svg>
  );
}

/** Front door with a step and a potted plant, for the sitting door hangers. */
export function FrontDoor({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 360 520" className={`art ${className}`} aria-hidden="true" focusable="false">
      <rect width="360" height="520" className="f-sign" />
      <path d="M0 0h360v520H0z" className="nf ln" />
      <path d="M0 60h360M0 120h360M0 180h360M0 240h360M0 300h360M0 360h360M0 420h360" className="nf s-rule" strokeWidth="2" />
      <rect x="70" y="60" width="220" height="410" rx="6" className="f-wood ln" />
      <rect x="88" y="78" width="184" height="392" className="f-primary ln" />
      <path d="M100 96q80-28 160 0v40H100z" className="f-ball ln ln-thin" opacity=".9" />
      <rect x="108" y="170" width="64" height="110" rx="4" className="nf s-paper" strokeWidth="3" opacity=".35" />
      <rect x="188" y="170" width="64" height="110" rx="4" className="nf s-paper" strokeWidth="3" opacity=".35" />
      <rect x="108" y="300" width="64" height="130" rx="4" className="nf s-paper" strokeWidth="3" opacity=".35" />
      <rect x="188" y="300" width="64" height="130" rx="4" className="nf s-paper" strokeWidth="3" opacity=".35" />
      <circle cx="248" cy="290" r="9" className="f-ball ln" />
      <rect x="40" y="470" width="280" height="26" className="f-stone ln" />
      <rect x="20" y="496" width="320" height="24" className="f-stone ln" />
      <path d="M300 470l-8-50h44l-8 50z" className="f-leash ln" />
      <path d="M314 420c-20-30-10-60 0-70 10 10 20 40 0 70zM314 420c-30-10-40-30-34-46 16 4 30 20 34 46zM314 420c30-10 40-30 34-46-16 4-30 20-34 46z" className="f-leaf ln" />
      <rect x="140" y="440" width="80" height="12" rx="4" className="f-paper-deep ln ln-thin" />
      <Paw x={180} y={446} s={0.5} className="f-primary" />
    </svg>
  );
}
