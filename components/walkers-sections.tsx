// Walkers page sections: the leash-hook rail of expandable dog tags, Biscuit, and safety notes on
// a fence. Walker data comes from content/walkers.ts, with references into walks and neighborhoods.
import type { ReactNode } from 'react';
import { neighborhoodById } from '../content/service-area';
import { walkById } from '../content/walks';
import { walkers } from '../content/walkers';
import { FenceEdge, Icon, type IconName } from './art/icons';
import { BlazeMark } from './art/kit';
import { Biscuit } from './art/dogs';
import { DogTag, PlankPiece, plankEnds } from './art/tags';
import { OpenFromHash } from './open-from-hash';
import { SiteLink } from './site-link';

type ContentProps = { children: ReactNode };

/** Each tag is a native disclosure: works with the keyboard and without JavaScript. */
function TagRailSection({ children, openFirst = true }: ContentProps & { openFirst?: boolean }) {
  return (
    <section aria-labelledby="rail-title" className="wrap">
      {children}
      <ul className="mt-10 grid grid-cols-1 items-start sm:grid-cols-2 lg:grid-cols-4">
        {walkers.map((walker, i) => {
          const favorite = walkById(walker.favoriteWalk)!;
          return (
            <li key={walker.id} className="pb-8">
              <PlankPiece ends={plankEnds(i, walkers.length, 'sm', 'lg')} />
              <details id={walker.id} name="walker" open={openFirst && i === 0} className="group scroll-mt-6 px-2 sm:px-3">
                <summary className="-mt-3 block rounded-2xl pb-2 text-center">
                  <DogTag walker={walker} className="mx-auto w-[min(100%,11rem)]" />
                  <span className="font-display mt-1 block text-[1.5rem] leading-tight">{walker.name}</span>
                  <span className="block text-[.95rem] text-muted">{walker.role}, since {walker.since}</span>
                  {!walker.available ? <span className="mt-1 block text-sm font-bold text-leash">Not taking new dogs right now</span> : null}
                  <span className="mt-2 inline-flex items-center gap-1.5 rounded-full border-2 border-line bg-surface px-3 py-0.5 text-sm font-bold">
                    <span className="group-open:hidden">Read their tag</span>
                    <span className="hidden group-open:inline">Close</span>
                    <span aria-hidden="true" className="transition-transform group-open:rotate-180">▾</span>
                  </span>
                </summary>
                <div className="mt-3 rounded-[1.1rem] border-[2.5px] border-line bg-surface p-5 shadow-[5px_6px_0_var(--primary-strong)]">
                  <p className="text-sm font-semibold text-muted">{walker.pronouns}</p>
                  <p className="mt-2">{walker.bio}</p>
                  <p className="handwritten mt-3 -rotate-1 text-[1.35rem] text-leash">{walker.funFact}</p>
                  <p className="mt-4 text-sm font-bold">Certified in</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {walker.certifications.map(cert => (
                      <li key={cert} className="rounded-lg bg-primary p-[3px] text-[.85rem] font-bold text-[#F3EFD9] shadow-[2px_2px_0_var(--line)]">
                        <span className="block rounded-md border-2 border-dashed border-[#F3EFD9]/70 px-2 py-0.5">{cert}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm font-bold">Usually walks</p>
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {walker.neighborhoods.map(id => (
                      <li key={id}><SiteLink href={`/service-area/#${id}`} className="block rounded-full border-2 border-line bg-paper-deep px-2.5 py-0.5 text-sm font-semibold no-underline hover:underline">{neighborhoodById(id)!.name}</SiteLink></li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm font-bold">Favourite walk</p>
                  <SiteLink href={`/walks/#${favorite.id}`} className="mt-1 flex items-center gap-2 rounded-xl border-2 border-dashed border-leash p-2 font-bold no-underline hover:underline">
                    <BlazeMark blaze={favorite.blaze} size={34} />
                    <span>{favorite.name}</span>
                  </SiteLink>
                </div>
              </details>
            </li>
          );
        })}
      </ul>
      <OpenFromHash />
    </section>
  );
}
export const TagRail = Object.assign(TagRailSection, {
  Heading: ({ children }: ContentProps) => <h2 id="rail-title" className="text-[clamp(2.2rem,4.6vw,3.4rem)] text-primary-ink">{children}</h2>,
  Introduction: ({ children }: ContentProps) => <p className="mt-3 max-w-[38rem] text-[1.08rem] text-muted">{children}</p>,
});

/* ───────────── Office dog ───────────── */

function OfficeDogSection({ children }: ContentProps) {
  return (
    <section aria-labelledby="biscuit-title" className="mt-16 overflow-hidden">
      <div className="band-meadow -skew-y-2 border-y-[3px] border-line">
        <div className="wrap grid skew-y-2 grid-cols-1 items-center gap-6 py-14 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)]">
          <div className="relative order-2 md:order-1">
            <Biscuit className="w-full" />
          </div>
          <div className="order-1 md:order-2">{children}</div>
        </div>
      </div>
    </section>
  );
}
function Bubble({ children }: ContentProps) {
  return (
    <p className="handwritten relative mt-6 w-fit max-w-[22rem] rotate-1 rounded-[1.4rem] border-[2.5px] border-line bg-surface px-5 py-3 text-[1.5rem] text-ink shadow-[4px_5px_0_var(--primary-strong)]">
      {children}
      <span aria-hidden="true" className="absolute -bottom-[13px] left-10 h-6 w-6 rotate-45 border-b-[2.5px] border-r-[2.5px] border-line bg-surface" />
    </p>
  );
}
export const OfficeDog = Object.assign(OfficeDogSection, {
  Heading: ({ children }: ContentProps) => <h2 id="biscuit-title" className="text-[clamp(2.2rem,4.6vw,3.4rem)] text-primary-ink">{children}</h2>,
  Text: ({ children }: ContentProps) => <p className="mt-3 max-w-[32rem] text-[1.08rem] text-muted">{children}</p>,
  Bubble,
});

/* ───────────── Safety and trust, along the fence ───────────── */

function SafetySection({ children }: ContentProps) {
  return <section aria-labelledby="safety-title" className="mt-24">{children}</section>;
}
function SafetyList({ children }: ContentProps) {
  return (
    <div className="relative mt-10">
      <div aria-hidden="true" className="absolute inset-x-0 top-10"><FenceEdge /></div>
      <ul className="wrap relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">{children}</ul>
    </div>
  );
}
function SafetyItem({ icon, title, children }: ContentProps & { icon: IconName; title: ReactNode }) {
  return (
    <li className="relative rounded-xl border-[2.5px] border-line bg-sign p-5 text-sign-ink shadow-[4px_5px_0_var(--primary-strong)] even:lg:mt-8">
      <span aria-hidden="true" className="absolute left-4 top-3 h-2.5 w-2.5 rounded-full bg-line" />
      <span aria-hidden="true" className="absolute right-4 top-3 h-2.5 w-2.5 rounded-full bg-line" />
      <Icon name={icon} size={52} />
      <h3 className="mt-2 text-[1.4rem] leading-tight">{title}</h3>
      <p className="mt-2 text-[.98rem]">{children}</p>
    </li>
  );
}
export const Safety = Object.assign(SafetySection, {
  Heading: ({ children }: ContentProps) => <div className="wrap"><h2 id="safety-title" className="text-[clamp(2.2rem,4.6vw,3.4rem)] text-primary-ink">{children}</h2></div>,
  List: SafetyList,
  Item: SafetyItem,
});
