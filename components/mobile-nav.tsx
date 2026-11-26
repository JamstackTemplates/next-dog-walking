'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, type ReactNode } from 'react';

/** Folded-park-map disclosure for small screens. Works without JS (native details); closes on navigation. */
export function MobileNav({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => { if (ref.current) ref.current.open = false; }, [pathname]);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && ref.current?.open) {
        ref.current.open = false;
        ref.current.querySelector('summary')?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  return (
    <details ref={ref} className="group relative md:hidden">
      <summary className="flex min-h-11 items-center gap-1.5 rounded-full border-[2.5px] border-line bg-surface px-2.5 font-bold">
        <svg viewBox="0 0 32 32" width="26" height="26" className="art" aria-hidden="true" focusable="false">
          <path d="M3 7l8-3 10 3 8-3v21l-8 3-10-3-8 3z" className="f-paper-deep ln ln-thin" />
          <path d="M11 4v21M21 7v21" className="nf ln ln-thin" />
          <path d="M6 18q4-6 8-2t9-5" className="nf s-leash" strokeWidth="1.8" strokeDasharray="2 2.5" strokeLinecap="round" />
        </svg>
        <span>Map</span>
        <span className="sr-only">: site navigation</span>
      </summary>
      <div className="absolute right-0 top-[calc(100%+.6rem)] z-50 w-[min(19rem,calc(100vw-2.5rem))] rotate-[.6deg] rounded-[1.1rem] border-[2.5px] border-line bg-surface p-3 shadow-[6px_7px_0_var(--primary-strong)]">
        {children}
      </div>
    </details>
  );
}
