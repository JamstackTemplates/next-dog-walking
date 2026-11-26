import type { ReactNode } from 'react';
import { business } from '../content/business';
import { ParkGate } from './art/signs';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

/** Closing call to action at the park gate, where the Trail Line ends. */
function GateSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="gate-title" className="wrap mt-20 grid grid-cols-1 items-end gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:gap-10">
      <div className="pb-4 md:pb-16">{children}</div>
      <ParkGate className="w-full max-w-[34rem] justify-self-end" />
    </section>
  );
}

function Heading({ children }: ContentProps) {
  return <h2 id="gate-title" className="text-[clamp(2.6rem,6vw,4.8rem)] text-primary-ink">{children}</h2>;
}

function Body({ children }: ContentProps) {
  return <p className="mt-5 max-w-[34rem] text-lg text-muted">{children}</p>;
}

/** Primary action to Contact, with the email always visible beside it. */
function Action({ children }: ContentProps) {
  return (
    <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3">
      <SiteLink href="/contact/" className="button">{children}</SiteLink>
      <a className="text-link wrap-anywhere" href={`mailto:${business.email}`}>{business.email}</a>
    </div>
  );
}

export const GateCta = Object.assign(GateSection, { Heading, Body, Action });
