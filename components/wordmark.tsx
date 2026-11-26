// Happy Trails wordmark on a small arrow-shaped trail sign, with the green-circle paw blaze.

export function PawBlaze({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} className={`art shrink-0 ${className}`} aria-hidden="true" focusable="false">
      <circle cx="32" cy="32" r="28" fill="#2F6B2E" className="ln" />
      <circle cx="32" cy="32" r="22.5" fill="none" stroke="#F3EFD9" strokeOpacity=".35" strokeWidth="1.5" />
      <g fill="#fff" transform="translate(32 34) scale(1.55)">
        <path d="M0 2c4.6 0 8.4 3.6 8.4 7.2 0 3-2.4 4.4-5 4.4-1.4 0-2.4-.6-3.4-.6s-2 .6-3.4.6c-2.6 0-5-1.4-5-4.4C-8.4 5.6-4.6 2 0 2z" />
        <ellipse cx="-7.6" cy="-2.6" rx="2.5" ry="3.3" transform="rotate(-18 -7.6 -2.6)" />
        <ellipse cx="-2.8" cy="-7.4" rx="2.5" ry="3.4" />
        <ellipse cx="2.8" cy="-7.4" rx="2.5" ry="3.4" />
        <ellipse cx="7.6" cy="-2.6" rx="2.5" ry="3.3" transform="rotate(18 7.6 -2.6)" />
      </g>
    </svg>
  );
}

/** Visual wordmark. Pass the business name as the accessible text. */
export function Wordmark({ name, size = 'md' }: { name: string; size?: 'md' | 'lg' }) {
  const big = size === 'lg';
  return (
    <span className="inline-flex items-center gap-2.5">
      <PawBlaze size={big ? 56 : 40} className={big ? 'max-[420px]:hidden' : 'max-[400px]:hidden'} />
      <span className="relative inline-block">
        <svg viewBox="0 0 220 64" preserveAspectRatio="none" className="art absolute inset-0 h-full w-full" aria-hidden="true" focusable="false">
          <path d="M6 6h176l32 26-32 26H6q-4 0-4-4V10q0-4 4-4z" className="f-primary ln" vectorEffect="non-scaling-stroke" />
          <path d="M12 12h167l25 20-25 20H12z" fill="none" stroke="#F3EFD9" strokeOpacity=".3" strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className={`relative block ${big ? 'py-3 pl-5 pr-12 sm:pr-14' : 'py-1.5 pl-3.5 pr-9'} leading-none text-[#F3EFD9]`}>
          <span className={`font-display block whitespace-nowrap ${big ? 'text-[2rem] sm:text-[2.6rem]' : 'text-[1.2rem] sm:text-[1.32rem]'} routed`}>Happy Trails</span>
          <span className={`block whitespace-nowrap font-bold tracking-[.04em] ${big ? 'mt-1.5 text-base' : 'mt-0.5 text-[.72rem]'} opacity-90`}>Dog Walkers</span>
        </span>
        <span className="sr-only">{name}</span>
      </span>
    </span>
  );
}
