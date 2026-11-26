// Home page sections. Each owns layout, art and semantics; page copy arrives as children
// from app/page.tsx. Collections (walks, neighborhoods, walkers, notes) come from content/.
import type { ReactNode } from 'react';
import { business } from '../content/business';
import { neighborhoods, statusLabel } from '../content/service-area';
import { walkTypes, durationLabel } from '../content/walks';
import { walkers } from '../content/walkers';
import { HeroScene } from './art/hero-scene';
import { DogPortrait } from './art/dogs';
import { HillEdge, Icon, type IconName, FenceEdge } from './art/icons';
import { BlazeMark, TrailLine } from './art/kit';
import { Signpost } from './art/signs';
import { DogTag, PlankPiece, plankEnds, RailExtras } from './art/tags';
import { TrailMap } from './art/trail-map';
import { ArrowBoard, PriceRoundel } from './arrow-board';
import { SiteLink } from './site-link';
import { WalkStatus } from './walk-status';

type ContentProps = { children: ReactNode };

/* ───────────── Hero: Tenney lagoon walk ───────────── */

function HeroSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b-[3px] border-line md:aspect-[2/1] md:max-h-[880px] md:min-h-[640px] md:[container-type:size]">
      <div className="wrap relative z-10 pb-4 pt-4 md:pb-5 md:pt-[clamp(1.75rem,4cqh,3.25rem)]">
        <div className="relative w-full max-w-[40rem] md:w-[min(45cqw,39rem)]">
          <div className="mb-3">
            <WalkStatus hours={business.walkHours} fallback={business.walkHoursText} className="text-[.88rem] sm:text-[.95rem]" />
          </div>
          <div className="sign-board px-5 py-5 sm:px-8 sm:py-8">{children}</div>
          <div aria-hidden="true" className="mx-12 hidden h-[clamp(2rem,8cqh,5.5rem)] justify-between md:flex">
            <span className="block w-5 border-x-[2.5px] border-b-[2.5px] border-line bg-wood" />
            <span className="block w-5 border-x-[2.5px] border-b-[2.5px] border-line bg-wood" />
          </div>
        </div>
      </div>
      <HeroScene className="block aspect-[16/10] w-full md:absolute md:inset-0 md:-z-10 md:aspect-auto md:h-full" />
    </section>
  );
}

function HeroHeading({ children }: ContentProps) {
  return <h1 id="hero-title" className="text-[clamp(2.3rem,5.4vw,4.9rem)] leading-[.98] text-primary-ink">{children}</h1>;
}
function HeroIntroduction({ children }: ContentProps) {
  return <p className="mt-3 max-w-[33rem] text-[1rem] sm:mt-4 sm:text-[1.15rem]">{children}</p>;
}
function HeroActions({ children }: ContentProps) {
  return <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 sm:mt-6">{children}</div>;
}
function HeroPrimary({ children }: ContentProps) {
  return <SiteLink href="/contact/" className="button w-full sm:w-auto">{children}</SiteLink>;
}
function HeroSecondary({ children }: ContentProps) {
  return <SiteLink href="/walks/" className="text-link">{children}</SiteLink>;
}

export const Hero = Object.assign(HeroSection, {
  Heading: HeroHeading, Introduction: HeroIntroduction, Actions: HeroActions, Primary: HeroPrimary, Secondary: HeroSecondary,
});

/* ───────────── Trailhead signpost: walk types ───────────── */

function SignpostSection({ children }: ContentProps) {
  const shown = walkTypes.slice(0, 4);
  return (
    <section aria-labelledby="walks-title" className="wrap relative grid grid-cols-1 gap-10 pt-16 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.4fr)] md:pt-24">
      <TrailLine id="signpost" viewBox="0 0 120 400" className="absolute -top-1 right-[6%] hidden h-40 w-16 lg:block" d="M60 -10C20 60 100 120 60 200s-30 120 0 200" paws={[[52, 150, 170]]} />
      <div className="order-2 flex items-end justify-center md:order-1">
        <Signpost className="w-full max-w-[12rem] md:max-w-[22rem]" />
      </div>
      <div className="order-1 md:order-2">
        {children}
        <ul className="mt-8 grid grid-cols-1 gap-4">
          {shown.map((walk, i) => {
            const left = i % 2 === 1;
            return (
              <li key={walk.id} className={left ? 'md:mr-10' : 'md:ml-10'}>
                <SiteLink href={`/walks/#${walk.id}`} className="group block rounded-[1.2rem] no-underline">
                  <ArrowBoard direction={left ? 'left' : 'right'} className="transition-transform duration-200 group-hover:-translate-y-0.5">
                    <div className={`flex items-center gap-4 ${left ? 'flex-row-reverse text-right' : ''}`}>
                      <BlazeMark blaze={walk.blaze} size={46} />
                      <div className="min-w-0 flex-1">
                        <h3 className="routed text-[clamp(1.25rem,2.4vw,1.6rem)] group-hover:underline">{walk.name}</h3>
                        <p className={`mt-1 flex flex-wrap gap-x-4 text-[.95rem] font-semibold text-[#DCE8C8] ${left ? 'justify-end' : ''}`}>
                          <span>{durationLabel(walk.durationMinutes)}</span>
                          <span>{walk.maxDogs === 1 ? 'Just your dog' : `Up to ${walk.maxDogs} dogs`}</span>
                          <span>{walk.days}</span>
                        </p>
                      </div>
                      <PriceRoundel price={walk.priceUsd} unit={walk.priceUnit} />
                    </div>
                  </ArrowBoard>
                </SiteLink>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function SectionHeading({ id, children, className = '' }: ContentProps & { id: string; className?: string }) {
  return <h2 id={id} className={`text-[clamp(2.2rem,4.6vw,3.6rem)] text-primary-ink ${className}`}>{children}</h2>;
}
function Lede({ children }: ContentProps) {
  return <p className="mt-4 max-w-[36rem] text-[1.08rem] text-muted">{children}</p>;
}
function MoreLink({ href, children }: ContentProps & { href: string }) {
  return <p className="mt-6"><SiteLink href={href} className="text-link">{children}</SiteLink></p>;
}

export const WalkSigns = Object.assign(SignpostSection, {
  Heading: ({ children }: ContentProps) => <SectionHeading id="walks-title">{children}</SectionHeading>,
  Introduction: Lede,
  Link: ({ children }: ContentProps) => <MoreLink href="/walks/">{children}</MoreLink>,
});

/* ───────────── How a walk works: horizontal route band ───────────── */

function StepsSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="steps-title" className="relative mt-20">
      <HillEdge tone="paper-deep" />
      <div className="band-meadow -mt-px pb-20 pt-10">
        <div className="wrap relative">{children}</div>
      </div>
      <HillEdge tone="paper-deep" flip />
    </section>
  );
}
function StepsHeading({ children }: ContentProps) {
  return <SectionHeading id="steps-title">{children}</SectionHeading>;
}
function StepsList({ children }: ContentProps) {
  return (
    <div className="relative mt-12">
      <TrailLine id="steps" viewBox="0 0 1200 80" preserveAspectRatio="none" className="absolute left-0 right-0 top-6 hidden h-16 w-full md:block" d="M0 40C150 0 250 80 400 40s250-40 400 0 250 30 400-10" />
      <TrailLine id="steps-mobile" viewBox="0 0 40 400" preserveAspectRatio="none" className="absolute bottom-0 left-[2.1rem] top-0 h-full w-10 md:hidden" d="M20 0C0 100 40 200 20 300s-10 70 0 100" />
      <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">{children}</ol>
    </div>
  );
}
function Step({ number, icon, title, children }: ContentProps & { number: number; icon: IconName; title: ReactNode }) {
  return (
    <li className="relative grid grid-cols-[4.5rem_1fr] gap-x-4 md:block">
      <span aria-hidden="true" className="font-display relative z-10 grid h-[4.5rem] w-[4.5rem] place-content-center rounded-full border-[3px] border-line bg-primary text-[2.4rem] leading-none text-[#fff] shadow-[4px_5px_0_var(--primary-strong)]">{number}</span>
      <div className="md:mt-5">
        <h3 className="flex items-center gap-2 text-[1.45rem] leading-tight"><span className="sr-only">Step {number}: </span>{title}<Icon name={icon} size={38} className="md:hidden" /></h3>
        <Icon name={icon} size={46} className="mt-3 hidden md:block" />
        <p className="mt-2 text-muted">{children}</p>
      </div>
    </li>
  );
}
export const Steps = Object.assign(StepsSection, { Heading: StepsHeading, List: StepsList, Step });

/* ───────────── Service-area teaser: pinned map ───────────── */

const STATUS_DOT = { core: 'bg-grass', edge: 'bg-[radial-gradient(var(--grass-deep)_35%,transparent_40%)] bg-[length:6px_6px] bg-paper-deep', waitlist: 'bg-transparent border-dashed' } as const;

function AreaSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="area-title" className="wrap relative z-10 -mt-6 grid grid-cols-1 items-start gap-10 md:-mt-14 md:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
      <div className="relative -rotate-2 rounded-[1.2rem] border-[3px] border-line bg-wood-light p-3 shadow-[8px_10px_0_var(--primary-strong)]">
        <span aria-hidden="true" className="absolute -top-2.5 left-8 z-10 h-5 w-5 rounded-full border-[2.5px] border-line bg-leash" />
        <span aria-hidden="true" className="absolute -top-2.5 right-8 z-10 h-5 w-5 rounded-full border-[2.5px] border-line bg-ball" />
        <TrailMap compact className="block h-auto w-full rounded-[.7rem] border-[2.5px] border-line" />
      </div>
      <div className="md:pt-24">{children}</div>
    </section>
  );
}
function NeighborhoodList() {
  return (
    <ul className="mt-6 grid grid-cols-1 gap-x-6 gap-y-2 min-[420px]:grid-cols-2">
      {neighborhoods.map(place => (
        <li key={place.id} className="flex items-center gap-2.5">
          <span aria-hidden="true" className={`h-4 w-4 shrink-0 rounded-full border-[2.5px] border-line dark:border-muted ${STATUS_DOT[place.status]}`} />
          <SiteLink href={`/service-area/#${place.id}`} className="font-semibold no-underline hover:underline">{place.name}</SiteLink>
          {place.status !== 'core' ? <span className="text-sm text-muted">{place.status === 'edge' ? 'edge' : 'waitlist'}</span> : null}
        </li>
      ))}
    </ul>
  );
}
function AreaLegend() {
  return (
    <p className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
      {(['core', 'edge', 'waitlist'] as const).map(status => (
        <span key={status} className="inline-flex items-center gap-1.5">
          <span aria-hidden="true" className={`h-3 w-3 rounded-full border-2 border-line dark:border-muted ${STATUS_DOT[status]}`} />{statusLabel[status]}
        </span>
      ))}
    </p>
  );
}
export const AreaTeaser = Object.assign(AreaSection, {
  Heading: ({ children }: ContentProps) => <SectionHeading id="area-title">{children}</SectionHeading>,
  Introduction: Lede,
  Neighborhoods: () => <><NeighborhoodList /><AreaLegend /></>,
  Link: ({ children }: ContentProps) => <MoreLink href="/service-area/">{children}</MoreLink>,
});

/* ───────────── Walker tag strip: hanging rail ───────────── */

function TagStripSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="tags-title" className="wrap mt-24 md:mt-32">
      <div className="max-w-[40rem]">{children}</div>
      <div className="relative mt-10 md:pr-24">
        <ul className="grid grid-cols-2 md:grid-cols-4">
          {walkers.map((walker, i) => (
            <li key={walker.id}>
              <PlankPiece ends={plankEnds(i, walkers.length, 'md', 'md')} />
              <SiteLink href={`/walkers/#${walker.id}`} className="group -mt-3 block rounded-2xl px-2 pb-4 text-center no-underline">
                <DogTag walker={walker} className="mx-auto w-[min(100%,10rem)]" />
                <span className="font-display mt-1 block text-[1.35rem] leading-tight group-hover:underline">{walker.name}</span>
                <span className="block text-[.95rem] text-muted">{walker.role}</span>
              </SiteLink>
            </li>
          ))}
        </ul>
        <RailExtras className="absolute -right-2 top-0 hidden w-24 md:block" />
      </div>
    </section>
  );
}
export const TagStrip = Object.assign(TagStripSection, {
  Heading: ({ children }: ContentProps) => <SectionHeading id="tags-title">{children}</SectionHeading>,
  Introduction: Lede,
  Link: ({ children }: ContentProps) => <MoreLink href="/walkers/">{children}</MoreLink>,
});

/* ───────────── Owner notes: polaroids on a fence ───────────── */

const TILT = ['-rotate-3 md:mt-6', 'rotate-2', '-rotate-1 md:mt-12'];

function NotesSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="notes-title" className="relative mt-24 overflow-hidden pt-2 md:mt-32">
      <div className="wrap">{children}</div>
      <div className="relative mt-10">
        <div aria-hidden="true" className="absolute inset-x-0 top-[38%]"><FenceEdge /></div>
        <ul className="wrap relative grid gap-10 sm:grid-cols-3 sm:gap-6">
          {business.testimonials.map((note, i) => (
            <li key={note.id} className={`mx-auto w-full max-w-[16.5rem] sm:max-w-[20rem] ${TILT[i % 3]}`}>
              <figure className="relative rounded-md border-[2.5px] border-line bg-surface p-3 pb-5 shadow-[5px_6px_0_var(--primary-strong)]">
                <span aria-hidden="true" className="absolute -top-3 left-1/2 h-6 w-12 -translate-x-1/2 rotate-3 bg-ball/80 [clip-path:polygon(4%_0,100%_8%,96%_100%,0_92%)]" />
                <DogPortrait kind={note.portrait} className="block aspect-[200/170] w-full rounded-sm border-2 border-line" />
                <blockquote className="handwritten mt-3 text-[1.32rem] text-ink">“{note.quote}”</blockquote>
                <figcaption className="mt-2 text-sm font-bold text-muted">{note.owner} and {note.dog}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
export const OwnerNotes = Object.assign(NotesSection, {
  Heading: ({ children }: ContentProps) => <SectionHeading id="notes-title">{children}</SectionHeading>,
});
