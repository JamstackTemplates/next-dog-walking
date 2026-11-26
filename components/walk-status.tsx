'use client';

import { useEffect, useState } from 'react';
import type { OpeningHours } from '../lib/hours';
import { walkStatus, type WalkStatus as Status } from '../lib/hours';
import { site } from '../lib/site';

/**
 * "Walkers out now" chip. Static and no-JS output is the neutral walk-hours text; the browser
 * computes the live status in the business time zone and refreshes it every minute.
 */
export function WalkStatus({ hours, fallback, className = '' }: { hours: readonly OpeningHours[]; fallback: string; className?: string }) {
  const [status, setStatus] = useState<Status | null>(null);
  useEffect(() => {
    const update = () => setStatus(walkStatus(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);
  const out = status?.out ?? false;
  return (
    <p className={`inline-flex items-center gap-2.5 rounded-full border-[2.5px] border-line bg-surface py-1.5 pl-2.5 pr-4 text-[.95rem] font-bold text-ink shadow-[3px_4px_0_var(--primary-strong)] ${className}`}>
      <span aria-hidden="true" className={`relative inline-block h-3.5 w-3.5 rounded-full border-2 border-line ${out ? 'bg-ball' : 'bg-tag'}`}>
        {out ? <span className="absolute -inset-1 animate-ping rounded-full bg-ball opacity-60" /> : null}
      </span>
      <span aria-live="polite">{status?.label ?? fallback}</span>
    </p>
  );
}
