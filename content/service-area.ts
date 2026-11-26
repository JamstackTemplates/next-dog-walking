// Where the walkers go. The owner edits a neighborhood's `status` most often; the map zone,
// the finder, the Home teaser and the JSON-LD areaServed all follow it.
// The map shapes for each neighborhood live in components/art/trail-map.tsx (keyed by id).

export const AREA_STATUSES = ['core', 'edge', 'waitlist'] as const;
export type AreaStatus = typeof AREA_STATUSES[number];

export interface Park {
  /** Stable URL-safe ID referenced by neighborhoods. */
  id: string;
  name: string;
  description: string;
  /** Short label drawn on the map. */
  mapLabel: string;
  /** Which postcard vignette to draw. */
  vignette: 'lagoon' | 'river' | 'oaks' | 'field' | 'lakeshore';
}

export interface Neighborhood {
  /** Stable URL-safe ID, also the finder's deep link (/service-area/#marquette). */
  id: string;
  name: string;
  /** core: regular walks. edge: +$5 surcharge. waitlist: ask to join the list. */
  status: AreaStatus;
  /** Park IDs the walkers use from here. */
  parks: string[];
  /** Optional one-liner shown in the finder. */
  note?: string;
}

export const parks: Park[] = [
  { id: 'tenney-park', name: 'Tenney Park', mapLabel: 'Tenney Park', vignette: 'lagoon',
    description: 'The lagoon loop, the stone bridges and the locks where the Yahara meets Lake Mendota.' },
  { id: 'yahara-path', name: 'Yahara River Path', mapLabel: 'Yahara path', vignette: 'river',
    description: 'The river path between the lakes, flat and shady, with a bench at every bridge.' },
  { id: 'orton-park', name: 'Orton Park', mapLabel: 'Orton Park', vignette: 'oaks',
    description: 'The old oaks, where sniffing takes as long as it needs to.' },
  { id: 'james-madison-park', name: 'James Madison Park', mapLabel: 'James Madison', vignette: 'lakeshore',
    description: 'Lakeshore lawns and a breezy walk along Lake Mendota.' },
  { id: 'burr-jones-field', name: 'Burr Jones Field', mapLabel: 'Burr Jones', vignette: 'field',
    description: 'An open field and a long fence line for steady, leashed laps.' },
  { id: 'warner-park', name: 'Warner Park', mapLabel: 'Warner Park', vignette: 'field',
    description: 'We walk leashed loops past the off-leash area and watch it from outside.' },
  { id: 'olbrich-park', name: 'Olbrich Park', mapLabel: 'Olbrich Park', vignette: 'lakeshore',
    description: 'The lakeshore path on Lake Monona, best on a still morning.' },
];

export const neighborhoods: Neighborhood[] = [
  { id: 'tenney-lapham', name: 'Tenney-Lapham', status: 'core', parks: ['tenney-park', 'yahara-path'],
    note: 'Home turf. Most of our pack walks start here.' },
  { id: 'marquette', name: 'Marquette', status: 'core', parks: ['yahara-path', 'orton-park'] },
  { id: 'williamson', name: 'Williamson (Willy St)', status: 'core', parks: ['orton-park'] },
  { id: 'mansion-hill', name: 'Mansion Hill', status: 'core', parks: ['james-madison-park'] },
  { id: 'emerson-east', name: 'Emerson East', status: 'core', parks: ['burr-jones-field'] },
  { id: 'sherman', name: 'Sherman', status: 'edge', parks: ['warner-park'] },
  { id: 'schenk-atwood', name: 'Schenk-Atwood', status: 'edge', parks: ['olbrich-park'] },
  { id: 'eken-park', name: 'Eken Park', status: 'edge', parks: ['burr-jones-field'] },
  { id: 'maple-bluff', name: 'Maple Bluff', status: 'waitlist', parks: ['tenney-park'],
    note: 'Waitlist while we add a walker.' },
];

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateServiceArea(parkList: readonly Park[], list: readonly Neighborhood[]): void {
  const parkIds = new Set<string>();
  for (const park of parkList) {
    const at = `service-area.ts park "${park.id || park.name || '(unnamed)'}"`;
    if (!ID.test(park.id)) throw new Error(`${at}: id must be lowercase letters, numbers and hyphens`);
    if (parkIds.has(park.id)) throw new Error(`${at}: id is used twice`);
    parkIds.add(park.id);
    if (!park.name.trim() || !park.description.trim() || !park.mapLabel.trim()) throw new Error(`${at}: name, description and mapLabel are required`);
  }
  const seen = new Set<string>();
  for (const place of list) {
    const at = `service-area.ts neighborhood "${place.id || place.name || '(unnamed)'}"`;
    if (!ID.test(place.id)) throw new Error(`${at}: id must be lowercase letters, numbers and hyphens`);
    if (seen.has(place.id)) throw new Error(`${at}: id is used twice`);
    seen.add(place.id);
    if (!place.name.trim()) throw new Error(`${at}: name is required`);
    if (!AREA_STATUSES.includes(place.status)) throw new Error(`${at}: status must be one of ${AREA_STATUSES.join(', ')}`);
    if (!place.parks.length) throw new Error(`${at}: list at least one park`);
    for (const park of place.parks) if (!parkIds.has(park)) throw new Error(`${at}: park "${park}" is not in the parks list`);
  }
}

validateServiceArea(parks, neighborhoods);

export const parkById = (id: string) => parks.find(park => park.id === id);
export const neighborhoodById = (id: string) => neighborhoods.find(place => place.id === id);

export const statusLabel: Record<AreaStatus, string> = {
  core: 'Regular walks',
  edge: 'Edge of the area, +$5',
  waitlist: 'Waitlist, ask anyway',
};
