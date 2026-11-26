import { business } from '../content/business';
import { hoursRows } from '../lib/hours';
import { Dog, Paw } from './art/kit';
import { NAV } from './site-header';
import { SiteLink } from './site-link';
import { Wordmark } from './wordmark';

export function SiteFooter() {
  const rows = hoursRows(business.walkHours, 'Walkers’ day off');
  return (
    <footer className="relative mt-24 bg-primary-strong text-[#F3EFD9]">
      {/* grassy hill edge */}
      <svg viewBox="0 0 1440 70" preserveAspectRatio="none" className="art absolute bottom-full left-0 h-[46px] w-full md:h-[70px]" aria-hidden="true" focusable="false">
        <path d="M0 70V40C160 6 330 4 520 30s380 30 560 0 290-28 360-14v14z" className="f-primary-strong" />
        <path d="M0 40C160 6 330 4 520 30s380 30 560 0 290-28 360-14" className="nf ln" />
        <path d="M120 26l4-12 4 12M300 14l4-12 4 12M700 38l4-12 4 12M1010 32l4-12 4 12M1300 16l4-12 4 12" className="nf ln" />
      </svg>
      <div className="wrap grid gap-10 pb-10 pt-12 md:grid-cols-[1.3fr_1fr_.8fr]">
        <div>
          <Wordmark name={business.name} size="lg" />
          <p className="mt-5 max-w-sm text-[#DCE3C8]">Friendly dog walks and pet sitting around Tenney Park, on Madison’s near east side.</p>
          <p className="mt-4 grid gap-1 font-bold">
            <a className="w-fit text-[#F3EFD9] underline decoration-[#E8774F] decoration-2" href={`mailto:${business.email}`}>{business.email}</a>
            {business.phone ? <a className="w-fit text-[#F3EFD9] underline decoration-[#E8774F] decoration-2" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>{business.phone}</a> : null}
          </p>
        </div>
        <section aria-labelledby="footer-hours" className="h-fit -rotate-1 rounded-2xl border-[2.5px] border-black/70 bg-[#F3EFD9] p-5 text-[#1F3A2B] shadow-[5px_6px_0_rgb(0_0_0/.35)]">
          <h2 id="footer-hours" className="text-2xl">Trail open</h2>
          <dl className="mt-3 grid gap-1.5">
            {rows.map(row => (
              <div key={row.days} className="flex justify-between gap-4 border-b border-dashed border-[#1F3A2B]/35 pb-1.5 last:border-0">
                <dt className="font-bold">{row.days}</dt>
                <dd className={row.closed ? 'font-hand text-lg' : ''}>{row.times}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm">Overnight sitting runs every night by arrangement. Times are Central Time.</p>
        </section>
        <nav aria-label="Footer" className="grid h-fit gap-2 font-bold">
          {[{ href: '/', label: 'Home' }, ...NAV, { href: '/contact/', label: 'Ask about a walk' }].map(item => (
            <SiteLink key={item.href} href={item.href} className="w-fit text-[#F3EFD9] no-underline hover:underline">{item.label}</SiteLink>
          ))}
        </nav>
      </div>
      <div className="relative overflow-hidden border-t border-[#F3EFD9]/15">
        <div className="wrap flex flex-wrap items-center justify-between gap-4 py-5 text-sm text-[#DCE3C8]">
          <p>© {business.name}. A sample site; every walker and number is made up.</p>
          <p>Made with <a className="text-[#F3EFD9] underline" href="https://jamstacks.net">jamstacks.net</a></p>
        </div>
        <svg viewBox="0 0 260 70" className="art pointer-events-none absolute -right-6 bottom-1 hidden h-16 w-auto opacity-90 lg:block" aria-hidden="true" focusable="false">
          <path d="M0 62q60-14 120-4t140-8" className="nf" stroke="#E8774F" strokeWidth="3" strokeDasharray="7 9" strokeLinecap="round" />
          <Paw x={40} y={58} r={80} s={.7} className="f-ball" />
          <Paw x={90} y={56} r={95} s={.7} className="f-ball" />
          <Dog kind="beagle" x={196} y={62} s={0.62} />
        </svg>
      </div>
    </footer>
  );
}
