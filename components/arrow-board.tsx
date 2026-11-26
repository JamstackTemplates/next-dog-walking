import type { ReactNode } from 'react';

/** Park-green arrow-shaped trail board. Content sits on top of an SVG plank that stretches to fit. */
export function ArrowBoard({ direction = 'right', children, className = '' }: { direction?: 'left' | 'right'; children: ReactNode; className?: string }) {
  const right = direction === 'right';
  const d = right ? 'M4 4h88l6 46-6 46H4q-2 0-2-4V8q0-4 2-4z' : 'M96 4H8L2 50l6 46h88q2 0 2-4V8q0-4-2-4z';
  return (
    <div className={`relative ${className}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="art absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
        <path d={d} transform="translate(1.2 2.4)" className="f-primary-strong" />
        <path d={d} className="f-primary ln" vectorEffect="non-scaling-stroke" />
        <path d={d} transform="translate(50 50) scale(.95 .88) translate(-50 -50)" fill="none" stroke="#F3EFD9" strokeOpacity=".22" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      </svg>
      <div className={`relative text-[#F3EFD9] ${right ? 'pl-5 pr-[clamp(2.6rem,7%,4rem)] sm:pl-6' : 'pr-5 pl-[clamp(2.6rem,7%,4rem)] sm:pr-6'} py-4`}>{children}</div>
    </div>
  );
}

/** Painted price roundel. */
export function PriceRoundel({ price, unit, className = '' }: { price: number; unit: string; className?: string }) {
  return (
    <span className={`grid h-[4.6rem] w-[4.6rem] shrink-0 place-content-center rounded-full border-[2.5px] border-line bg-ball text-center leading-none text-on-ball shadow-[3px_3px_0_var(--line)] ${className}`}>
      <span className="font-display text-[1.6rem]">${price}</span>
      <span className="mt-0.5 text-[.72rem] font-bold">a {unit}</span>
    </span>
  );
}
