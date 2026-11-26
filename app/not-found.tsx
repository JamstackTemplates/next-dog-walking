import type { Metadata } from 'next';
import { BlazeMark } from '../components/art/kit';
import { TrailClosed } from '../components/art/signs';
import { SiteLink } from '../components/site-link';

export const metadata: Metadata = { title: 'Trail closed', robots: { index: false } };

const LINKS = [
  { href: '/', label: 'Back to the trailhead', blaze: 'green-circle' },
  { href: '/walks/', label: 'See walk types', blaze: 'blue-square' },
  { href: '/contact/', label: 'Ask about a walk', blaze: 'orange-triangle' },
] as const;

export default function NotFound() {
  return (
    <section aria-labelledby="lost-title" className="wrap pb-6 pt-10 text-center">
      <TrailClosed className="mx-auto w-full max-w-[42rem]" />
      <h1 id="lost-title" className="mt-4 text-[clamp(2.4rem,6vw,4.4rem)] text-primary-ink">This trail doesn’t go anywhere</h1>
      <p className="mx-auto mt-4 max-w-[34rem] text-lg text-muted">
        The page you followed has moved or never existed. Even the best noses lose the scent sometimes.
      </p>
      <ul className="mt-8 flex flex-wrap justify-center gap-4">
        {LINKS.map(link => (
          <li key={link.href}>
            <SiteLink href={link.href} className="flex items-center gap-3 rounded-full border-[2.5px] border-line bg-surface py-2 pl-2 pr-5 font-bold no-underline shadow-[4px_5px_0_var(--primary-strong)] hover:underline">
              <BlazeMark blaze={link.blaze} size={40} />{link.label}
            </SiteLink>
          </li>
        ))}
      </ul>
    </section>
  );
}
