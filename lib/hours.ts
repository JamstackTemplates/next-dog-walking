/** Optional weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];
export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}
const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));
export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}
/** Browser callers supply the clock; build/static views never compute current availability. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  const fallback = 'See opening hours';
  if (!timeZone) return fallback;
  validateHours(hours);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(now);
  } catch { return fallback; }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return fallback;
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const today = hours.find(entry => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) return `Open now · until ${today.closes}`;
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) return `Closed · opens ${offset === 0 ? 'today' : day} at ${entry.opens}`;
  }
  return 'Closed · see opening hours';
}

/** "07:00" → "7 am", "19:30" → "7:30 pm". */
export function clockLabel(value: string): string {
  const hour = Number(value.slice(0, 2));
  const minute = value.slice(3);
  const suffix = hour < 12 ? 'am' : 'pm';
  const twelve = hour % 12 === 0 ? 12 : hour % 12;
  return `${twelve}${minute === '00' ? '' : `:${minute}`} ${suffix}`;
}

export interface WalkStatus {
  /** true while walkers are out on today's walk hours. */
  out: boolean;
  label: string;
}

/**
 * Happy Trails "walkers out now" status. Browser callers supply the clock in the business zone;
 * returns null when the zone is missing or invalid so callers keep their neutral static text.
 */
export function walkStatus(hours: readonly OpeningHours[], timeZone: string, now = new Date()): WalkStatus | null {
  if (!timeZone) return null;
  validateHours(hours);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long', hour: 'numeric', minute: 'numeric', hourCycle: 'h23' }).formatToParts(now);
  } catch { return null; }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return null;
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const today = hours.find(entry => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return { out: true, label: `Walkers out now, back by ${clockLabel(today.closes)}` };
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) {
      const when = offset === 0 ? 'today' : offset === 1 ? 'tomorrow' : day;
      return { out: false, label: `Walkers are home. Next walks from ${clockLabel(entry.opens)} ${when}` };
    }
  }
  return { out: false, label: 'Walkers are home' };
}

const SHORT: Record<Day, string> = { Monday: 'Mon', Tuesday: 'Tue', Wednesday: 'Wed', Thursday: 'Thu', Friday: 'Fri', Saturday: 'Sat', Sunday: 'Sun' };

/** Groups consecutive days with the same hours: [{ days: 'Mon–Fri', times: '7 am–7 pm' }, …]. */
export function hoursRows(hours: readonly OpeningHours[], closedText = 'Closed'): { days: string; times: string; closed: boolean }[] {
  validateHours(hours);
  const rows: { from: Day; to: Day; key: string; closed: boolean }[] = [];
  for (const day of DAYS) {
    const entry = hours.find(value => value.day === day)!;
    const key = entry.opens ? `${entry.opens}-${entry.closes}` : 'closed';
    const last = rows.at(-1);
    if (last && last.key === key) last.to = day;
    else rows.push({ from: day, to: day, key, closed: !entry.opens });
  }
  return rows.map(row => {
    const [opens, closes] = row.key.split('-');
    return {
      days: row.from === row.to ? SHORT[row.from] : `${SHORT[row.from]}–${SHORT[row.to]}`,
      times: row.closed ? closedText : `${clockLabel(opens)}–${clockLabel(closes)}`,
      closed: row.closed,
    };
  });
}
