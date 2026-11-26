// Walks page sections: plank trail signs, sitting door hangers, the add-ons notice board and the
// "every walk includes" row. Data comes from content/walks.ts and content/add-ons.ts.
import type { ReactNode } from 'react';
import { addOns } from '../content/add-ons';
import { blazeName, durationLabel, priceLabel, walkById, walkTypes, type Walk } from '../content/walks';
import { FrontDoor, Icon, type IconName } from './art/icons';
import { BlazeMark, Paw } from './art/kit';
import { PriceRoundel } from './arrow-board';

type ContentProps = { children: ReactNode };

const LONGEST = Math.max(...walkTypes.map(walk => walk.durationMinutes));

function StatusRibbon({ walk }: { walk: Walk }) {
  const text = !walk.available ? 'Paused for now' : walk.waitlist ? 'Waitlist, ask anyway' : '';
  if (!text) return null;
  return (
    <p className={`absolute -top-4 right-6 z-10 rotate-2 rounded-md border-[2.5px] border-line px-3 py-1 text-sm font-bold shadow-[3px_3px_0_var(--line)] ${walk.available ? 'bg-ball text-on-ball' : 'bg-tag text-[#1F2A1C]'}`}>{text}</p>
  );
}

/** Dashed route whose length is proportional to the walk's duration, ending in a paw print. */
function RouteBar({ minutes }: { minutes: number }) {
  const pct = Math.max(14, Math.round((minutes / LONGEST) * 100));
  return (
    <div className="mt-4">
      <div className="relative h-6 w-full rounded-full border-2 border-dashed border-rule">
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="art absolute inset-y-0 left-0 h-full" style={{ width: `${pct}%` }} aria-hidden="true" focusable="false">
          <path d="M2 10q20-8 40 0t56 0" className="trail-route" vectorEffect="non-scaling-stroke" />
        </svg>
        <svg viewBox="0 0 20 20" className="art absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2" style={{ left: `${pct}%` }} aria-hidden="true" focusable="false">
          <Paw x={10} y={10} r={90} s={0.9} />
        </svg>
      </div>
      <p className="mt-1.5 text-sm font-semibold text-muted">{durationLabel(minutes)} on the trail</p>
    </div>
  );
}

function DogCount({ max }: { max: number }) {
  return (
    <p className="flex items-center gap-1.5 text-sm font-semibold">
      <span aria-hidden="true" className="flex">
        {Array.from({ length: 4 }, (_, i) => (
          <svg key={i} viewBox="0 0 20 20" className="art h-5 w-5" focusable="false"><Paw x={10} y={11} s={0.85} className={i < max ? 'f-primary-ink' : 'f-rule'} /></svg>
        ))}
      </span>
      {max === 1 ? 'Just your dog' : `Up to ${max} dogs`}
    </p>
  );
}

/** Each walk as a wooden-framed trail sign, alternating left and right. */
export function WalkPlanks({ children }: { children?: ReactNode }) {
  return (
    <section aria-labelledby="walk-signs-title" className="wrap">
      {children}
      <ol className="mt-10 grid gap-10">
        {walkTypes.map((walk, i) => (
          <li key={walk.id} id={walk.id} className={`relative scroll-mt-8 md:w-[88%] ${i % 2 ? 'md:ml-auto' : ''}`}>
            <StatusRibbon walk={walk} />
            <article aria-labelledby={`${walk.id}-name`} className={`relative rounded-[1.4rem] border-[3px] border-line bg-wood p-2.5 shadow-[7px_8px_0_var(--primary-strong)] ${i % 2 ? 'md:rotate-[.4deg]' : 'md:-rotate-[.4deg]'}`}>
              <div className="rounded-[1rem] border-[2.5px] border-line bg-sign p-5 text-sign-ink sm:p-7 [background-image:repeating-linear-gradient(90deg,transparent_0_46px,rgb(138_90_51/.06)_46px_48px)]">
                <div className="flex flex-wrap items-start gap-4">
                  <BlazeMark blaze={walk.blaze} size={54} />
                  <div className="min-w-0 flex-1">
                    <h3 id={`${walk.id}-name`} className="text-[clamp(1.6rem,3.4vw,2.3rem)] text-primary-ink">{walk.name}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-muted">{blazeName[walk.blaze]}. {walk.days}.</p>
                  </div>
                  <PriceRoundel price={walk.priceUsd} unit={walk.priceUnit} />
                </div>
                <p className="mt-4 max-w-[44rem] text-[1.08rem]">{walk.summary}</p>
                <div className="grid gap-x-10 md:grid-cols-[1.4fr_1fr]">
                  <RouteBar minutes={walk.durationMinutes} />
                  <div className="mt-4"><DogCount max={walk.maxDogs} /></div>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Included with ${walk.name}`}>
                  {walk.includes.map(item => (
                    <li key={item} className="rounded-full border-2 border-line bg-paper-deep px-3 py-1 text-sm font-semibold">{item}</li>
                  ))}
                </ul>
                <p className="sr-only">{priceLabel(walk)}</p>
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
WalkPlanks.Heading = function Heading({ children }: ContentProps) {
  return <h2 id="walk-signs-title" className="text-[clamp(2.2rem,4.6vw,3.4rem)] text-primary-ink">{children}</h2>;
};
WalkPlanks.Introduction = function Introduction({ children }: ContentProps) {
  return <p className="mt-3 max-w-[38rem] text-[1.08rem] text-muted">{children}</p>;
};

/* ───────────── Home & pet sitting: door hangers ───────────── */

function SittingSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="sitting-title" className="relative mt-24 overflow-hidden">
      <div className="band-meadow border-y-[3px] border-line py-16">
        <div className="wrap grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.6fr)]">{children}</div>
      </div>
    </section>
  );
}
function SittingIntro({ children }: ContentProps) {
  return (
    <div>
      {children}
      <FrontDoor className="mt-8 hidden w-full max-w-[16rem] rounded-xl lg:block" />
    </div>
  );
}
function Hangers({ children }: ContentProps) {
  return <ul className="grid gap-8 sm:grid-cols-2">{children}</ul>;
}
/** One sitting service on a door hanger. `sign` is the phrase printed at the top of the hanger. */
function Hanger({ walkId, sign, tone = 'sign' }: { walkId: string; sign: ReactNode; tone?: 'sign' | 'night' }) {
  const walk = walkById(walkId);
  if (!walk) throw new Error(`Walks page: door hanger "${walkId}" is not in content/walks.ts`);
  const night = tone === 'night';
  return (
    <li id={walk.id} className={`relative scroll-mt-8 ${night ? 'sm:mt-10 sm:rotate-2' : 'sm:-rotate-2'}`}>
      <article aria-labelledby={`${walk.id}-name`} className={`relative rounded-[2.4rem_2.4rem_1.4rem_1.4rem] border-[3px] border-line px-6 pb-7 pt-24 shadow-[7px_8px_0_var(--primary-strong)] ${night ? 'bg-primary-strong text-[#F3EFD9]' : 'bg-surface text-ink'}`}>
        {/* the hanger hole and slit */}
        <span aria-hidden="true" className="absolute left-1/2 top-6 h-14 w-14 -translate-x-1/2 rounded-full border-[3px] border-line bg-paper-deep" />
        <span aria-hidden="true" className="absolute left-1/2 top-[4.6rem] h-5 w-1 -translate-x-1/2 bg-line" />
        <p className={`font-hand text-center text-[1.7rem] leading-tight ${night ? 'text-ball' : 'text-leash'}`}>{sign}</p>
        <div className="mt-4 flex items-center gap-3">
          <Icon name={night ? 'moon-house' : 'door'} size={44} />
          <h3 id={`${walk.id}-name`} className={`text-[1.7rem] ${night ? '' : 'text-primary-ink'}`}>{walk.name}</h3>
        </div>
        <p className="mt-3">{walk.summary}</p>
        <p className="mt-4 flex flex-wrap items-center gap-3">
          <PriceRoundel price={walk.priceUsd} unit={walk.priceUnit} />
          <span className="font-semibold">{durationLabel(walk.durationMinutes)}, {walk.days.toLowerCase()}<br />{walk.maxDogs === 1 ? 'One pet' : `Up to ${walk.maxDogs} dogs`}</span>
        </p>
        <ul className="mt-4 grid gap-1.5">
          {walk.includes.map(item => <li key={item} className="flex items-center gap-2"><svg viewBox="0 0 20 20" className="art h-4 w-4" aria-hidden="true" focusable="false"><Paw x={10} y={11} s={0.75} className={night ? 'f-ball' : 'f-leash'} /></svg>{item}</li>)}
        </ul>
        {!walk.available || walk.waitlist ? <p className="mt-4 font-bold">{!walk.available ? 'Paused for now' : 'Waitlist, ask anyway'}</p> : null}
      </article>
    </li>
  );
}
export const Sitting = Object.assign(SittingSection, {
  Introduction: SittingIntro,
  Heading: ({ children }: ContentProps) => <h2 id="sitting-title" className="text-[clamp(2.2rem,4.6vw,3.4rem)] text-primary-ink">{children}</h2>,
  Text: ({ children }: ContentProps) => <p className="mt-3 text-[1.08rem] text-muted">{children}</p>,
  Hangers,
  Hanger,
});

/* ───────────── Add-ons notice board ───────────── */

function AddOnsSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="addons-title" className="wrap mt-24 grid grid-cols-1 items-start gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
      {children}
    </section>
  );
}
function NoticeBoard({ children }: ContentProps) {
  return (
    <div className="relative">
      <div aria-hidden="true" className="absolute -bottom-10 left-[18%] h-16 w-4 border-x-[2.5px] border-b-[2.5px] border-line bg-wood" />
      <div aria-hidden="true" className="absolute -bottom-10 right-[18%] h-16 w-4 border-x-[2.5px] border-b-[2.5px] border-line bg-wood" />
      <div className="sign-green relative p-4 sm:p-6">
        <h3 className="routed px-2 pb-3 text-[1.9rem]">{children}</h3>
        <ul className="grid gap-3">
          {addOns.map((item, i) => (
            <li key={item.id} className={`relative rounded-md border-2 border-line bg-sign p-3.5 pl-5 text-sign-ink shadow-[2px_3px_0_rgb(0_0_0/.25)] ${i % 2 ? 'rotate-[.5deg]' : '-rotate-[.4deg]'}`}>
              <span aria-hidden="true" className={`absolute -top-1.5 left-1/2 h-3.5 w-3.5 rounded-full border-2 border-line ${i % 2 ? 'bg-ball' : 'bg-leash'}`} />
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-bold">{item.label}</span>
                <span className="font-display text-[1.3rem] text-primary-ink">{item.priceUsd === 0 ? 'Free' : `+$${item.priceUsd}`}</span>
              </div>
              <p className="text-sm text-muted">{item.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export const AddOns = Object.assign(AddOnsSection, {
  Text: ({ children }: ContentProps) => <div className="grid content-start gap-4 text-[1.06rem] [&_h2]:text-[clamp(2.2rem,4.6vw,3.2rem)] [&_h2]:text-primary-ink [&_p]:text-muted">{children}</div>,
  Heading: ({ children }: ContentProps) => <h2 id="addons-title">{children}</h2>,
  Board: NoticeBoard,
});

/* ───────────── What every walk includes ───────────── */

function IncludesSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="includes-title" className="relative mt-28">
      <div className="wrap">{children}</div>
    </section>
  );
}
function IncludesList({ children }: ContentProps) {
  return (
    <div className="relative mt-8">
      <ul className="wrap relative z-10 grid grid-cols-2 gap-6 pb-20 md:grid-cols-4">{children}</ul>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="art absolute inset-x-0 bottom-0 h-16 w-full" aria-hidden="true" focusable="false">
        <path d="M0 80V40c200-30 420-30 720-8s520 18 720-6v54z" className="f-grass" />
        <path d="M0 40c200-30 420-30 720-8s520 18 720-6" className="nf ln" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
function IncludesItem({ icon, children }: ContentProps & { icon: IconName }) {
  return (
    <li className="flex flex-col items-center text-center">
      <span className="grid h-24 w-24 place-content-center rounded-full border-[3px] border-line bg-surface shadow-[4px_5px_0_var(--primary-strong)]"><Icon name={icon} size={56} /></span>
      <span className="mt-3 font-bold">{children}</span>
    </li>
  );
}
export const Includes = Object.assign(IncludesSection, {
  Heading: ({ children }: ContentProps) => <h2 id="includes-title" className="text-[clamp(2rem,4vw,3rem)] text-primary-ink">{children}</h2>,
  List: IncludesList,
  Item: IncludesItem,
});
