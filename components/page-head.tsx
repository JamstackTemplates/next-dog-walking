import type { ReactNode } from 'react';
import { TrailLine } from './art/kit';

/**
 * Inner-page heading: the title routed into a park-green sign mounted on two posts,
 * an illustration beside it and the Trail Line passing underneath.
 */
export function PageHead({ title, children, art, note, id }: {
  title: ReactNode;
  /** Lede paragraph(s). */
  children?: ReactNode;
  /** Illustration beside the sign. */
  art?: ReactNode;
  /** Optional handwritten note pinned near the sign. */
  note?: ReactNode;
  id?: string;
}) {
  return (
    <header className="relative overflow-hidden pb-6 pt-[clamp(2.2rem,5vw,4rem)]">
      <div className="wrap grid grid-cols-1 items-end gap-8 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)]">
        <div>
          <div className="relative w-fit max-w-full">
            {note ? <p className="handwritten absolute -top-7 right-2 rotate-[4deg] text-xl text-leash sm:-right-10">{note}</p> : null}
            <div className="sign-green relative z-10 px-6 py-5 sm:px-9 sm:py-7">
              <h1 id={id} className="routed max-w-[16ch] text-[clamp(2.4rem,6vw,4.4rem)]">{title}</h1>
            </div>
            <div aria-hidden="true" className="mx-10 flex h-10 justify-between sm:mx-16">
              <span className="block w-4 border-x-[2.5px] border-b-[2.5px] border-line bg-wood" />
              <span className="block w-4 border-x-[2.5px] border-b-[2.5px] border-line bg-wood" />
            </div>
          </div>
          {children ? <div className="mt-6 max-w-(--measure) text-[clamp(1.08rem,1.6vw,1.22rem)] text-muted">{children}</div> : null}
        </div>
        {art ? <div className="mx-auto w-full max-w-[22rem] md:max-w-[26rem]">{art}</div> : null}
      </div>
      <TrailLine id="page-head" viewBox="0 0 1440 60" preserveAspectRatio="none" className="mt-6 h-10 w-full"
        d="M-10 30C200 6 380 54 640 30s480-30 810 4" />
    </header>
  );
}
