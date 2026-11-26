'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Draws each Trail Line ([data-trail]) as it scrolls into view. Without JavaScript, or with
 * reduced motion, the routes stay fully drawn because the page is never "armed".
 */
export function TrailReveal() {
  const pathname = usePathname();
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return;
    const root = document.documentElement;
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-drawn');
          observer.unobserve(entry.target);
        }
      }
    }, { rootMargin: '0px 0px -12% 0px' });
    const targets = Array.from(document.querySelectorAll('[data-trail]:not(.is-drawn)'));
    // Anything already on screen draws right away, as one page-load moment.
    root.classList.add('trail-armed');
    targets.forEach(target => observer.observe(target));
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
