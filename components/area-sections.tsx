// Service area sections: the full trail map with its legend board, the finder, park postcards
// and the edge/waitlist note. Neighborhoods and parks come from content/service-area.ts.
import type { ReactNode } from 'react';
import { parks, statusLabel } from '../content/service-area';
import { ParkVignette } from './art/icons';
import { Paw } from './art/kit';
import { TrailMap } from './art/trail-map';
import { NeighborhoodFinder } from './neighborhood-finder';

type ContentProps = { children: ReactNode };

const LEGEND_SWATCH = {
  core: 'bg-grass',
  edge: 'bg-paper-deep bg-[radial-gradient(var(--grass-deep)_35%,transparent_40%)] bg-[length:7px_7px]',
  waitlist: 'bg-sign border-dashed',
} as const;

function MapSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="map-title" className="wrap">
      <h2 id="map-title" className="sr-only">Service area map</h2>
      <div className="relative rounded-[1.4rem] border-[3px] border-line bg-wood-light p-2.5 shadow-[8px_10px_0_var(--primary-strong)] sm:p-4">
        <TrailMap className="block h-auto w-full rounded-[.9rem] border-[2.5px] border-line" />
        <div className="relative mx-2 -mt-6 max-w-[22rem] -rotate-1 rounded-xl border-[2.5px] border-line bg-surface p-4 shadow-[4px_5px_0_var(--primary-strong)] md:absolute md:bottom-6 md:left-6 md:mx-0 md:mt-0 md:flex md:max-w-[46%] md:flex-wrap md:items-center md:gap-x-4 md:p-3">
          <p className="font-display text-[1.25rem] text-primary-ink">Legend</p>
          <ul className="mt-2 grid gap-1.5 text-[.95rem] md:mt-0 md:flex md:flex-wrap md:gap-x-4 md:gap-y-1 md:text-[.85rem]">
            {(['core', 'edge', 'waitlist'] as const).map(status => (
              <li key={status} className="flex items-center gap-2.5">
                <span aria-hidden="true" className={`h-5 w-8 rounded-md border-[2.5px] border-line dark:border-muted ${LEGEND_SWATCH[status]}`} />{statusLabel[status]}
              </li>
            ))}
            <li className="flex items-center gap-2.5">
              <svg viewBox="0 0 32 20" className="art h-5 w-8" aria-hidden="true" focusable="false"><path d="M2 12q8-8 14-2t14-4" className="trail-route" style={{ strokeWidth: 2.4 }} /></svg>
              Our usual routes
            </li>
          </ul>
          <p className="handwritten mt-3 text-[1.2rem] text-leash md:mt-1 md:w-full">{children}</p>
        </div>
      </div>
    </section>
  );
}

function FinderSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="finder-title" className="wrap mt-20">
      {children}
      <NeighborhoodFinder />
    </section>
  );
}

function ParksSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="parks-title" className="mt-24">
      <div className="wrap">{children}</div>
      <ul className="wrap mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-6 pt-2 md:grid md:grid-cols-3 md:overflow-visible lg:grid-cols-4" tabIndex={0} aria-label="Parks we walk">
        {parks.map((park, i) => (
          <li key={park.id} className={`w-[16.5rem] shrink-0 snap-start md:w-auto ${i % 2 ? 'md:rotate-1' : 'md:-rotate-1'}`}>
            <article className="relative h-full rounded-md border-[2.5px] border-line bg-surface p-3 shadow-[5px_6px_0_var(--primary-strong)]">
              <ParkVignette kind={park.vignette} className="block aspect-[240/150] w-full rounded-sm border-2 border-line" />
              <span aria-hidden="true" className="absolute right-5 top-5 grid h-12 w-10 place-content-center rounded-sm border-2 border-dashed border-line bg-sign">
                <svg viewBox="0 0 20 20" className="art h-6 w-6" focusable="false"><Paw x={10} y={11} className="f-leash" /></svg>
              </span>
              <h3 className="mt-3 text-[1.35rem] text-primary-ink">{park.name}</h3>
              <p className="mt-1 text-[.95rem] text-muted">{park.description}</p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}

function EdgeSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="edge-title" className="wrap mt-20 grid grid-cols-1 items-center gap-8 md:grid-cols-[auto_minmax(0,36rem)] md:justify-center md:gap-14">
      <svg viewBox="0 0 220 240" className="art mx-auto w-44 md:w-52" aria-hidden="true" focusable="false">
        <ellipse cx="110" cy="226" rx="90" ry="12" className="f-grass ln" />
        <path d="M100 228V70h20v158z" className="f-wood ln" />
        <g transform="rotate(-6 110 80)">
          <rect x="22" y="36" width="176" height="84" rx="14" className="f-ball ln" />
          <text x="110" y="72" textAnchor="middle" className="font-display" fill="#24331F" fontSize="22">Edge of</text>
          <text x="110" y="100" textAnchor="middle" className="font-display" fill="#24331F" fontSize="22">the trail</text>
        </g>
        <Paw x={150} y={196} r={20} className="f-leash" />
        <Paw x={128} y={214} r={10} className="f-leash" />
      </svg>
      <div className="grid gap-4 text-[1.08rem] [&_h2]:text-[clamp(2rem,4vw,3rem)] [&_h2]:text-primary-ink [&_p]:text-muted">{children}</div>
    </section>
  );
}

export const Area = {
  Map: MapSection,
  Finder: Object.assign(FinderSection, {
    Heading: ({ children }: ContentProps) => <h2 id="finder-title" className="text-[clamp(2.2rem,4.6vw,3.4rem)] text-primary-ink">{children}</h2>,
    Introduction: ({ children }: ContentProps) => <p className="mt-3 max-w-[38rem] text-[1.08rem] text-muted">{children}</p>,
  }),
  Parks: Object.assign(ParksSection, {
    Heading: ({ children }: ContentProps) => <h2 id="parks-title" className="text-[clamp(2.2rem,4.6vw,3.4rem)] text-primary-ink">{children}</h2>,
  }),
  Edge: Object.assign(EdgeSection, {
    Heading: ({ children }: ContentProps) => <h2 id="edge-title">{children}</h2>,
  }),
};
