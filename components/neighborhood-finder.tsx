'use client';

import { useCallback, useEffect, useState } from 'react';
import { neighborhoods, parkById, statusLabel, type Neighborhood } from '../content/service-area';

/** Highlight the chosen zone on the full trail map (#trail-map) drawn elsewhere on the page. */
function highlight(id: string | null) {
  const map = document.getElementById('trail-map');
  if (!map) return;
  if (id) map.setAttribute('data-has-selection', '');
  else map.removeAttribute('data-has-selection');
  map.querySelectorAll<SVGElement>('[data-zone]').forEach(zone => zone.classList.toggle('is-selected', zone.dataset.zone === id));
}

const STATUS_STYLE: Record<Neighborhood['status'], string> = {
  core: 'bg-grass text-ink',
  edge: 'bg-ball text-on-ball',
  waitlist: 'bg-tag text-[#1F2A1C]',
};

function Detail({ place, hidden }: { place: Neighborhood; hidden?: boolean }) {
  return (
    <article id={place.id} hidden={hidden} aria-labelledby={`${place.id}-name`} className="sign-board scroll-mt-8 p-6 sm:p-8">
      <h3 id={`${place.id}-name`} className="text-[clamp(1.8rem,3.6vw,2.6rem)] text-primary-ink">{place.name}</h3>
      <p className={`mt-3 inline-block rounded-full border-2 border-line px-3 py-1 text-sm font-bold ${STATUS_STYLE[place.status]}`}>{statusLabel[place.status]}</p>
      {place.note ? <p className="handwritten mt-4 text-[1.45rem] text-leash">{place.note}</p> : null}
      <p className="mt-4 font-bold">Where we walk from here</p>
      <ul className="mt-2 grid gap-2">
        {place.parks.map(id => {
          const park = parkById(id)!;
          return <li key={id}><span className="font-semibold">{park.name}:</span> <span className="text-muted">{park.description}</span></li>;
        })}
      </ul>
    </article>
  );
}

/**
 * Split-panel finder. Without JS every neighborhood's sign is listed in full; with JS the list
 * becomes buttons that show one sign, highlight its map zone and keep a #neighborhood deep link.
 */
export function NeighborhoodFinder() {
  const [enhanced, setEnhanced] = useState(false);
  const [selected, setSelected] = useState(neighborhoods[0].id);

  const choose = useCallback((id: string, fromUser: boolean) => {
    setSelected(id);
    highlight(id);
    if (fromUser) history.replaceState(null, '', `#${id}`);
  }, []);

  useEffect(() => {
    setEnhanced(true);
    const fromHash = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (neighborhoods.some(place => place.id === id)) choose(id, false);
    };
    fromHash();
    window.addEventListener('hashchange', fromHash);
    return () => { window.removeEventListener('hashchange', fromHash); highlight(null); };
  }, [choose]);

  return (
    <div className="mt-8 grid grid-cols-1 items-start gap-8 md:grid-cols-[minmax(0,.9fr)_minmax(0,1.3fr)]">
      <ul className="grid gap-2" aria-label="Neighborhoods">
        {neighborhoods.map(place => {
          const active = enhanced && place.id === selected;
          const dot = <span aria-hidden="true" className={`h-4 w-4 shrink-0 rounded-full border-[2.5px] border-line dark:border-muted ${STATUS_STYLE[place.status]}`} />;
          const cls = `flex w-full items-center gap-3 rounded-full border-[2.5px] px-4 py-2.5 text-left font-bold no-underline transition-colors ${active ? 'border-line bg-primary text-[#fff] shadow-[3px_4px_0_var(--primary-strong)]' : 'border-transparent hover:border-line hover:bg-surface'}`;
          return (
            <li key={place.id}>
              {enhanced
                ? <button type="button" aria-pressed={active} aria-controls="finder-detail" className={cls} onClick={() => choose(place.id, true)}>
                    {dot}<span className="flex-1">{place.name}</span><span className={`text-sm font-semibold ${active ? '' : 'text-muted'}`}>{place.status === 'core' ? '' : place.status}</span>
                  </button>
                : <a href={`#${place.id}`} className={cls}>{dot}<span className="flex-1">{place.name}</span></a>}
            </li>
          );
        })}
      </ul>
      <div id="finder-detail" aria-live="polite" className="grid gap-6 md:sticky md:top-6">
        {neighborhoods.map(place => <Detail key={place.id} place={place} hidden={enhanced && place.id !== selected} />)}
      </div>
    </div>
  );
}
