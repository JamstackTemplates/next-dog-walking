// The walkers. Each one hangs on the leash rail as an engraved dog tag.
import { walks } from './walks.ts';
import { neighborhoods } from './service-area.ts';

export const TAG_SHAPES = ['bone', 'round', 'heart', 'shield'] as const;
export type TagShape = typeof TAG_SHAPES[number];
export const TAG_COLORS = ['tag', 'ball', 'leash', 'sky'] as const;
/** Palette token for the tag metal: tag (aluminium), ball (yellow), leash (red), sky (blue). */
export type TagColor = typeof TAG_COLORS[number];

export interface Walker {
  /** Stable URL-safe ID, also the anchor on /walkers/. */
  id: string;
  name: string;
  pronouns: string;
  role: string;
  /** Year they started walking with Happy Trails. */
  since: number;
  tagShape: TagShape;
  tagColor: TagColor;
  /** Engraved face details. */
  face: { hair: 'bun' | 'short' | 'long' | 'curly'; glasses?: boolean; beard?: boolean };
  /** A walk ID from content/walks.ts. */
  favoriteWalk: string;
  /** Neighborhood IDs from content/service-area.ts. */
  neighborhoods: string[];
  certifications: string[];
  bio: string;
  funFact: string;
  /** false shows "Not taking new dogs right now" on their tag. */
  available: boolean;
}

export const walkers: Walker[] = [
  {
    id: 'maya-ortiz', name: 'Maya Ortiz', pronouns: 'she/her', role: 'Founder and lead walker', since: 2017,
    tagShape: 'bone', tagColor: 'ball', face: { hair: 'bun' },
    favoriteWalk: 'park-pack', neighborhoods: ['tenney-lapham', 'mansion-hill'],
    certifications: ['Pet First Aid & CPR', 'Fear Free Certified'],
    bio: 'Started walking the neighbors’ dogs between grad-school classes and never stopped.',
    funFact: 'Knows every dog on Sherman Avenue by name.', available: true,
  },
  {
    id: 'theo-brandt', name: 'Theo Brandt', pronouns: 'he/him', role: 'Walker', since: 2019,
    tagShape: 'round', tagColor: 'tag', face: { hair: 'short', beard: true },
    favoriteWalk: 'saturday-trail', neighborhoods: ['marquette', 'williamson', 'schenk-atwood'],
    certifications: ['Pet First Aid & CPR'],
    bio: 'Former trail-crew volunteer who’s happiest with three tired dogs and a muddy marsh boardwalk.',
    funFact: 'Carries spare treats in four separate pockets.', available: true,
  },
  {
    id: 'priya-nair', name: 'Priya Nair', pronouns: 'she/her', role: 'Puppy and senior specialist', since: 2021,
    tagShape: 'heart', tagColor: 'leash', face: { hair: 'long', glasses: true },
    favoriteWalk: 'puppy-senior', neighborhoods: ['emerson-east', 'eken-park'],
    certifications: ['Pet First Aid & CPR', 'CPDT-KA (training)'],
    bio: 'Patient with stubborn puppies and slow, sniffy seniors alike.',
    funFact: 'Has a cat named Waffles who tolerates the smell of dog.', available: true,
  },
  {
    id: 'june-kowalski', name: 'June Kowalski', pronouns: 'they/them', role: 'House sitter', since: 2022,
    tagShape: 'shield', tagColor: 'sky', face: { hair: 'curly' },
    favoriteWalk: 'overnight-sitting', neighborhoods: ['sherman', 'tenney-lapham'],
    certifications: ['Pet First Aid & CPR'],
    bio: 'Night-owl house sitter who leaves the kitchen tidier than they found it.',
    funFact: 'Reads bedtime stories to anxious dogs. It works.', available: true,
  },
];

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateWalkers(list: readonly Walker[]): void {
  const walkIds = new Set(walks.map(walk => walk.id));
  const placeIds = new Set(neighborhoods.map(place => place.id));
  const seen = new Set<string>();
  for (const walker of list) {
    const at = `walkers.ts "${walker.id || walker.name || '(unnamed)'}"`;
    if (!ID.test(walker.id)) throw new Error(`${at}: id must be lowercase letters, numbers and hyphens`);
    if (seen.has(walker.id)) throw new Error(`${at}: id is used twice`);
    seen.add(walker.id);
    for (const key of ['name', 'pronouns', 'role', 'bio', 'funFact'] as const) {
      if (!walker[key].trim()) throw new Error(`${at}: ${key} is required`);
    }
    if (!Number.isInteger(walker.since) || walker.since < 2000 || walker.since > 2100) throw new Error(`${at}: since must be a year`);
    if (!TAG_SHAPES.includes(walker.tagShape)) throw new Error(`${at}: tagShape must be one of ${TAG_SHAPES.join(', ')}`);
    if (!TAG_COLORS.includes(walker.tagColor)) throw new Error(`${at}: tagColor must be one of ${TAG_COLORS.join(', ')}`);
    if (!walkIds.has(walker.favoriteWalk)) throw new Error(`${at}: favoriteWalk "${walker.favoriteWalk}" is not in walks.ts`);
    if (!walker.neighborhoods.length) throw new Error(`${at}: list at least one neighborhood`);
    for (const place of walker.neighborhoods) if (!placeIds.has(place)) throw new Error(`${at}: neighborhood "${place}" is not in service-area.ts`);
    if (!walker.certifications.length) throw new Error(`${at}: list at least one certification`);
  }
}

validateWalkers(walkers);
