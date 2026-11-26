import type { ReactNode } from 'react';
import { business } from '../content/business';
import { hoursRows } from '../lib/hours';
import { site } from '../lib/site';
import { CopyEmail } from './copy-email';
import { JamstacksSupportForm } from './jamstacks-support-form';
import { TimeZoneNote } from './time-zone-note';

type ContentProps = { children: ReactNode };

function ContactLayout({ children }: ContentProps) {
  return <div className="wrap grid grid-cols-1 items-start gap-12 pb-6 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.1fr)]">{children}</div>;
}

/** The "trail mailbox" plate: email large and always visible, copy button, phone and walk hours. */
function Mailbox({ children }: ContentProps) {
  const rows = hoursRows(business.walkHours, 'Walkers’ day off');
  return (
    <aside aria-labelledby="mailbox-title" className="sign-board relative p-6 sm:p-8">
      <span aria-hidden="true" className="absolute -top-3 right-8 h-10 w-5 rotate-6 rounded-sm border-[2.5px] border-line bg-leash" />
      <h2 id="mailbox-title" className="text-[2rem] text-primary-ink">{children}</h2>
      <p className="mt-4 text-sm font-bold text-muted">Email</p>
      <a className="font-display block text-[clamp(1.15rem,2.6vw,1.6rem)] leading-tight text-primary-ink underline decoration-leash decoration-[3px] underline-offset-4 wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a>
      <div className="mt-4 flex flex-wrap items-center gap-3"><CopyEmail email={business.email} /></div>
      {business.phone ? <>
        <p className="mt-6 text-sm font-bold text-muted">Phone</p>
        <a className="font-display text-[1.5rem] no-underline hover:underline" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>{business.phone}</a>
      </> : null}
      <div className="mt-6 rounded-xl border-[2.5px] border-line bg-paper-deep p-4">
        <p className="font-bold">Walk hours</p>
        <dl className="mt-2 grid gap-1">
          {rows.map(row => (
            <div key={row.days} className="flex justify-between gap-4 border-b border-dashed border-rule pb-1 last:border-0">
              <dt className="font-semibold">{row.days}</dt><dd className={row.closed ? 'font-hand text-lg' : ''}>{row.times}</dd>
            </div>
          ))}
        </dl>
        <TimeZoneNote />
      </div>
    </aside>
  );
}

/** Hosted form when a public site ID is configured; otherwise a visible email fallback. */
function Enquiry({ children }: ContentProps) {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);
  return (
    <section aria-labelledby="enquiry-title" className="grid gap-8">
      <div>
        <h2 id="enquiry-title" className="text-[2rem] text-primary-ink">{children}</h2>
        {hosted
          ? <div className="mt-5 rounded-[1.2rem] border-[2.5px] border-line bg-surface p-5 shadow-[6px_7px_0_var(--primary-strong)] sm:p-7">
              <JamstacksSupportForm siteId={site.jamstacksSite} embedUrl={site.jamstacksEmbedUrl} email={business.email} />
            </div>
          : <div className="mt-5 rounded-[1.2rem] border-[2.5px] border-dashed border-line bg-surface p-6">
              <p className="font-bold">Write to us directly</p>
              <p className="mt-2 text-muted">The enquiry form isn’t connected on this copy of the site. Email <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a> and a walker will reply.</p>
            </div>}
      </div>
    </section>
  );
}

/** "Useful to include" checklist, styled as a tag hanging from a leash. */
function Checklist({ children }: ContentProps) {
  return (
    <div className="relative mt-2 md:ml-8">
      <svg viewBox="0 0 60 70" className="art absolute -top-14 left-10 h-16 w-12" aria-hidden="true" focusable="false">
        <path d="M30 0c-20 20 10 40 0 66" className="nf ln" strokeWidth="9" />
        <path d="M30 0c-20 20 10 40 0 66" className="nf s-leash" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <div className="relative rotate-[-1.2deg] rounded-[1.6rem_1.6rem_1.2rem_1.2rem] border-[2.5px] border-line bg-tag p-6 pt-8 text-[#1F2A1C] shadow-[5px_6px_0_var(--primary-strong)]">
        <span aria-hidden="true" className="absolute left-12 top-3 h-4 w-4 rounded-full border-[2.5px] border-line bg-paper" />
        <h2 className="text-[1.6rem]">{children}</h2>
        <ul className="mt-3 grid gap-2">
          {business.enquiries.usefulToInclude.map(tip => (
            <li key={tip} className="grid grid-cols-[1.3rem_1fr] gap-2">
              <svg viewBox="0 0 20 20" className="mt-1 h-4 w-4" aria-hidden="true" focusable="false"><path d="M3 10l5 5 9-11" fill="none" stroke="#2F6B2E" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              <span>{tip}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export const Contact = Object.assign(ContactLayout, { Mailbox, Enquiry, Checklist });
