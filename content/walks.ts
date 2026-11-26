// Walks and pet-sitting services. The owner edits prices and the available/waitlist flags most often.
// Every page, the Home signpost and the JSON-LD offers read from this list, so one edit updates them all.

export const BLAZES = ['green-circle', 'blue-square', 'orange-triangle', 'red-diamond'] as const;
export type Blaze = typeof BLAZES[number];
export const PRICE_UNITS = ['walk', 'visit', 'outing', 'night'] as const;
export type PriceUnit = typeof PRICE_UNITS[number];

export interface Walk {
  /** Stable URL-safe ID, also the anchor on /walks/ (e.g. /walks/#park-pack). */
  id: string;
  /** Public name. */
  name: string;
  /** 'walk' appears in the trail signs; 'sitting' on the door hangers. */
  kind: 'walk' | 'sitting';
  /** Trail-marker shape and colour shown beside the name. */
  blaze: Blaze;
  /** Length of one walk, visit or night, in minutes (15–720). Drives the dashed route bar. */
  durationMinutes: number;
  /** Most dogs on this walk at once (1–4). */
  maxDogs: number;
  /** Price in whole US dollars (1–250) per priceUnit. */
  priceUsd: number;
  priceUnit: PriceUnit;
  /** Short text such as "Mon–Fri". */
  days: string;
  /** One sentence. */
  summary: string;
  /** Two to four specifics. */
  includes: string[];
  /** false shows "Paused for now". */
  available: boolean;
  /** true shows "Waitlist, ask anyway". */
  waitlist: boolean;
}

export const walks: Walk[] = [
  {
    id: 'sniff-stroll', name: 'Neighborhood Sniff Stroll', kind: 'walk', blaze: 'green-circle',
    durationMinutes: 30, maxDogs: 2, priceUsd: 24, priceUnit: 'walk', days: 'Mon–Sat',
    summary: 'An unhurried loop of your block with plenty of time for every interesting fence post.',
    includes: ['Fresh water topped up', 'Towel-off and paw wipe', 'Photo note'],
    available: true, waitlist: false,
  },
  {
    id: 'park-pack', name: 'Tenney Park Pack Walk', kind: 'walk', blaze: 'blue-square',
    durationMinutes: 60, maxDogs: 4, priceUsd: 32, priceUnit: 'walk', days: 'Mon–Fri',
    summary: 'A small group of matched, friendly dogs with a full hour of park, lagoon and river path.',
    includes: ['Door-to-door pickup', 'Matched play group', 'Towel-off and paw wipe', 'Photo note'],
    available: true, waitlist: false,
  },
  {
    id: 'solo-adventure', name: 'Solo Adventure Hour', kind: 'walk', blaze: 'orange-triangle',
    durationMinutes: 60, maxDogs: 1, priceUsd: 38, priceUnit: 'walk', days: 'Mon–Sat',
    summary: 'One dog, one walker, a longer route for dogs who prefer their own company or need training reinforcement.',
    includes: ['Your training cues practised', 'Fresh water topped up', 'Photo note'],
    available: true, waitlist: false,
  },
  {
    id: 'puppy-senior', name: 'Puppy & Senior Drop-in', kind: 'walk', blaze: 'green-circle',
    durationMinutes: 20, maxDogs: 1, priceUsd: 20, priceUnit: 'visit', days: 'Mon–Sat',
    summary: 'A short potty break, gentle play and fresh water for puppies under six months and older dogs.',
    includes: ['Potty break', 'Gentle play', 'Meds given if left out'],
    available: true, waitlist: false,
  },
  {
    id: 'saturday-trail', name: 'Saturday Trail Outing', kind: 'walk', blaze: 'red-diamond',
    durationMinutes: 150, maxDogs: 3, priceUsd: 65, priceUnit: 'outing', days: 'Sat',
    summary: 'A morning out at Cherokee Marsh trails for fit, recall-reliable dogs. Pickup and drop-off included.',
    includes: ['Pickup and drop-off', 'Marsh boardwalk loop', 'Full rinse-off', 'Photo note'],
    available: true, waitlist: true,
  },
  {
    id: 'home-drop-in', name: 'Home Drop-in Visit', kind: 'sitting', blaze: 'green-circle',
    durationMinutes: 30, maxDogs: 4, priceUsd: 26, priceUnit: 'visit', days: 'Daily',
    summary: 'Feeding, a quick yard break, litter scooped for resident cats, plants watered, lights rotated.',
    includes: ['Feeding', 'Litter scooped', 'Plants watered', 'Photo note'],
    available: true, waitlist: false,
  },
  {
    id: 'overnight-sitting', name: 'Overnight House Sitting', kind: 'sitting', blaze: 'blue-square',
    durationMinutes: 720, maxDogs: 3, priceUsd: 95, priceUnit: 'night', days: 'Daily',
    summary: 'A walker stays the night in your home, 7 pm to 7 am, with an evening and a morning walk included.',
    includes: ['Evening walk', 'Morning walk', 'Dinner and breakfast served', 'Photo note'],
    available: true, waitlist: false,
  },
];

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** Throws an error naming the walk to fix. Run by the tests and at build time. */
export function validateWalks(list: readonly Walk[]): void {
  const seen = new Set<string>();
  for (const walk of list) {
    const at = `walks.ts "${walk.id || walk.name || '(unnamed)'}"`;
    if (!ID.test(walk.id)) throw new Error(`${at}: id must be lowercase letters, numbers and hyphens`);
    if (seen.has(walk.id)) throw new Error(`${at}: id is used twice`);
    seen.add(walk.id);
    if (!walk.name.trim() || !walk.summary.trim() || !walk.days.trim()) throw new Error(`${at}: name, summary and days are required`);
    if (!['walk', 'sitting'].includes(walk.kind)) throw new Error(`${at}: kind must be walk or sitting`);
    if (!BLAZES.includes(walk.blaze)) throw new Error(`${at}: blaze must be one of ${BLAZES.join(', ')}`);
    if (!PRICE_UNITS.includes(walk.priceUnit)) throw new Error(`${at}: priceUnit must be one of ${PRICE_UNITS.join(', ')}`);
    if (!Number.isInteger(walk.priceUsd) || walk.priceUsd < 1 || walk.priceUsd > 250) throw new Error(`${at}: priceUsd must be whole dollars from 1 to 250`);
    if (!Number.isInteger(walk.durationMinutes) || walk.durationMinutes < 15 || walk.durationMinutes > 720) throw new Error(`${at}: durationMinutes must be 15–720`);
    if (!Number.isInteger(walk.maxDogs) || walk.maxDogs < 1 || walk.maxDogs > 4) throw new Error(`${at}: maxDogs must be 1–4`);
    if (walk.includes.length < 2 || walk.includes.length > 4 || walk.includes.some(item => !item.trim())) throw new Error(`${at}: includes needs two to four non-empty items`);
    if (typeof walk.available !== 'boolean' || typeof walk.waitlist !== 'boolean') throw new Error(`${at}: available and waitlist must be true or false`);
  }
}

validateWalks(walks);

export const walkById = (id: string) => walks.find(walk => walk.id === id);
export const walkTypes = walks.filter(walk => walk.kind === 'walk');
export const sittingTypes = walks.filter(walk => walk.kind === 'sitting');

/** "$32 a walk", "$95 a night" */
export function priceLabel(walk: Pick<Walk, 'priceUsd' | 'priceUnit'>): string {
  return `$${walk.priceUsd} ${walk.priceUnit === 'outing' ? 'an' : 'a'} ${walk.priceUnit}`;
}

/** "30 min", "2½ hrs", "12 hrs" */
export function durationLabel(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = minutes / 60;
  if (hours === 1) return '1 hour';
  const whole = Math.floor(hours);
  return `${whole}${hours - whole === 0.5 ? '½' : ''} hrs`;
}

export const blazeName: Record<Blaze, string> = {
  'green-circle': 'Green circle: easy pace',
  'blue-square': 'Blue square: steady hour',
  'orange-triangle': 'Orange triangle: one-on-one',
  'red-diamond': 'Red diamond: big outing',
};
