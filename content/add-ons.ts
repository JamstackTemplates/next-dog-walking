// Extra charges and freebies shown on the Walks notice board.

export interface AddOn {
  /** Stable URL-safe ID. */
  id: string;
  label: string;
  /** Whole US dollars added to a walk or visit; 0 means free. */
  priceUsd: number;
  note: string;
}

export const addOns: AddOn[] = [
  { id: 'extra-dog', label: 'Extra dog', priceUsd: 10, note: 'Same household, same walk.' },
  { id: 'weekend', label: 'Weekend', priceUsd: 5, note: 'Added to Saturday walks.' },
  { id: 'edge-area', label: 'Edge of the area', priceUsd: 5, note: 'For neighborhoods marked edge on the map.' },
  { id: 'holiday', label: 'Public holiday', priceUsd: 15, note: 'New Year’s Day, Memorial Day, July 4th, Labor Day, Thanksgiving and Christmas Day.' },
  { id: 'meet-greet', label: 'Meet & greet', priceUsd: 0, note: 'The first meeting at your door is always free.' },
];

const ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function validateAddOns(list: readonly AddOn[]): void {
  const seen = new Set<string>();
  for (const item of list) {
    const at = `add-ons.ts "${item.id || item.label || '(unnamed)'}"`;
    if (!ID.test(item.id)) throw new Error(`${at}: id must be lowercase letters, numbers and hyphens`);
    if (seen.has(item.id)) throw new Error(`${at}: id is used twice`);
    seen.add(item.id);
    if (!item.label.trim() || !item.note.trim()) throw new Error(`${at}: label and note are required`);
    if (!Number.isInteger(item.priceUsd) || item.priceUsd < 0 || item.priceUsd > 250) throw new Error(`${at}: priceUsd must be whole dollars from 0 to 250`);
  }
}

validateAddOns(addOns);
