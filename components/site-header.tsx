import { DarkModeToggle } from 'jamstacks';
import { business } from '../content/business';
import { MobileNav } from './mobile-nav';
import { SiteLink } from './site-link';
import { Wordmark } from './wordmark';

export const NAV = [
  { href: '/walks/', label: 'Walks' },
  { href: '/service-area/', label: 'Service area' },
  { href: '/walkers/', label: 'Walkers' },
] as const;

const navLink = 'rounded-full px-3.5 py-2 font-bold no-underline hover:bg-paper-deep aria-[current]:bg-paper-deep aria-[current]:underline aria-[current]:decoration-leash aria-[current]:decoration-[3px]';

/** Lamp-switch plate around the shared theme toggle. */
function LampSwitch() {
  return (
    <span className="flex items-center gap-1.5 rounded-full border-[2.5px] border-line bg-paper px-1 py-0.5 sm:px-1.5 sm:py-1" title="Switch between day and dusk">
      <svg viewBox="0 0 24 24" width="20" height="20" className="art hidden sm:block" aria-hidden="true" focusable="false">
        <path d="M9 9h6l-1-4h-4z" className="f-primary ln ln-thin" />
        <path d="M9.5 9.5h5l-.6 6h-3.8z" className="f-ball ln ln-thin" />
        <path d="M12 15.5V22" className="nf ln ln-thin" />
      </svg>
      <DarkModeToggle />
    </span>
  );
}

export function SiteHeader() {
  return (
    <header className="relative z-40 border-b-[3px] border-line bg-sign shadow-[0_5px_0_var(--wood-light)]">
      <div className="wrap flex min-h-[4.6rem] items-center justify-between gap-3 py-2">
        <SiteLink href="/" className="rounded-xl no-underline" aria-label={`${business.name}, home`}>
          <Wordmark name={business.name} />
        </SiteLink>
        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {NAV.map(item => <SiteLink key={item.href} href={item.href} markCurrent="page" className={navLink}>{item.label}</SiteLink>)}
        </nav>
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          <SiteLink href="/contact/" className="button button-leash hidden md:inline-flex">Ask about a walk</SiteLink>
          <LampSwitch />
          <MobileNav>
            <nav aria-label="Main (mobile)" className="grid gap-1">
              {NAV.map(item => <SiteLink key={item.href} href={item.href} markCurrent="page" className={`${navLink} block text-lg`}>{item.label}</SiteLink>)}
              <SiteLink href="/contact/" markCurrent="page" className="button mt-2 w-full">Ask about a walk</SiteLink>
            </nav>
          </MobileNav>
        </div>
      </div>
    </header>
  );
}
