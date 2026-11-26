import assert from 'node:assert/strict';
import { test } from 'node:test';
import { DAYS, openingLabel, validateHours, type OpeningHours } from '../lib/hours.ts';

const hours: OpeningHours[] = DAYS.map(day => day === 'Monday' ? { day } : { day, opens: '09:00', closes: '17:00' });
const at = (date: string, zone = 'America/New_York') => openingLabel(hours, zone, new Date(date));
test('opening inclusive, closing exclusive; business zone wins over visitor zone', () => {
  assert.equal(at('2026-11-17T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-17T22:00:00Z'), 'Closed · opens Wednesday at 09:00');
  assert.equal(at('2026-11-17T14:00:00Z', 'Asia/Tokyo'), 'Closed · opens Wednesday at 09:00');
});
test('closed weekdays and week wrap find the next service', () => {
  assert.equal(at('2026-11-16T18:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(at('2026-11-15T23:00:00Z'), 'Closed · opens Tuesday at 09:00');
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see opening hours');
});
test('missing/invalid zones stay neutral and DST changes preserve local service times', () => {
  assert.equal(at('2026-11-17T14:00:00Z', ''), 'See opening hours');
  assert.equal(at('2026-11-17T14:00:00Z', 'Mars/Base'), 'See opening hours');
  assert.equal(at('2026-03-08T12:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-03-08T13:00:00Z'), 'Open now · until 17:00');
  assert.equal(at('2026-11-01T13:59:00Z'), 'Closed · opens today at 09:00');
  assert.equal(at('2026-11-01T14:00:00Z'), 'Open now · until 17:00');
});
test('invalid/incomplete/overnight intervals name the weekday to fix', () => {
  assert.doesNotThrow(() => validateHours(hours));
  for (const opens of ['24:00', '9:00', '18:00']) assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, opens } : x)), /Tuesday/);
  assert.throws(() => validateHours(hours.slice(1)), /Monday/);
  assert.throws(() => validateHours(hours.map(x => x.day === 'Tuesday' ? { ...x, closes: undefined } : x)), /Tuesday/);
});

// Happy Trails walk hours in America/Chicago: Mon–Fri 07:00–19:00, Sat 08:00–16:00, Sunday off.
import { business } from '../content/business.ts';
import { clockLabel, hoursRows, walkStatus } from '../lib/hours.ts';

const zone = 'America/Chicago';
// 2026-11-16 is a Monday; Chicago is UTC−6 in November (CST), UTC−5 in summer (CDT).
const status = (iso: string) => walkStatus(business.walkHours, zone, new Date(iso))?.label;

test('walk status: weekday and Saturday boundaries in Chicago', () => {
  assert.equal(status('2026-11-16T12:59:00Z'), 'Walkers are home. Next walks from 7 am today'); // Mon 06:59
  assert.equal(status('2026-11-16T13:00:00Z'), 'Walkers out now, back by 7 pm');               // Mon 07:00
  assert.equal(status('2026-11-21T00:59:00Z'), 'Walkers out now, back by 7 pm');               // Fri 18:59
  assert.equal(status('2026-11-21T01:00:00Z'), 'Walkers are home. Next walks from 8 am tomorrow'); // Fri 19:00
  assert.equal(status('2026-11-21T21:59:00Z'), 'Walkers out now, back by 4 pm');               // Sat 15:59
  assert.equal(status('2026-11-21T22:00:00Z'), 'Walkers are home. Next walks from 7 am Monday'); // Sat 16:00
});

test('walk status: Sunday is a day off all day', () => {
  assert.equal(status('2026-11-22T06:00:00Z'), 'Walkers are home. Next walks from 7 am tomorrow'); // Sun 00:00
  assert.equal(status('2026-11-22T18:00:00Z'), 'Walkers are home. Next walks from 7 am tomorrow'); // Sun 12:00
  assert.equal(status('2026-11-23T05:59:00Z'), 'Walkers are home. Next walks from 7 am tomorrow'); // Sun 23:59
});

test('walk status: DST changes keep local walk hours (8 Mar and 1 Nov 2026)', () => {
  // Monday 9 March 2026, first weekday after the spring change: CDT, UTC−5.
  assert.equal(status('2026-03-09T11:59:00Z'), 'Walkers are home. Next walks from 7 am today');
  assert.equal(status('2026-03-09T12:00:00Z'), 'Walkers out now, back by 7 pm');
  // Saturday 7 March 2026 (still CST, UTC−6) closes at 16:00 local = 22:00Z.
  assert.equal(status('2026-03-07T21:59:00Z'), 'Walkers out now, back by 4 pm');
  assert.equal(status('2026-03-07T22:00:00Z'), 'Walkers are home. Next walks from 7 am Monday');
  // Monday 2 November 2026, first weekday after the autumn change: CST, UTC−6.
  assert.equal(status('2026-11-02T12:59:00Z'), 'Walkers are home. Next walks from 7 am today');
  assert.equal(status('2026-11-02T13:00:00Z'), 'Walkers out now, back by 7 pm');
  // Saturday 31 October 2026 (CDT, UTC−5) opens 08:00 local = 13:00Z.
  assert.equal(status('2026-10-31T12:59:00Z'), 'Walkers are home. Next walks from 8 am today');
  assert.equal(status('2026-10-31T13:00:00Z'), 'Walkers out now, back by 4 pm');
});

test('walk status stays neutral without a valid zone', () => {
  assert.equal(walkStatus(business.walkHours, ''), null);
  assert.equal(walkStatus(business.walkHours, 'Mars/Base'), null);
});

test('grouped hours and clock labels for the footer and Contact', () => {
  assert.equal(clockLabel('07:00'), '7 am');
  assert.equal(clockLabel('19:30'), '7:30 pm');
  assert.equal(clockLabel('12:00'), '12 pm');
  assert.equal(clockLabel('00:15'), '12:15 am');
  assert.deepEqual(hoursRows(business.walkHours, 'Day off'), [
    { days: 'Mon–Fri', times: '7 am–7 pm', closed: false },
    { days: 'Sat', times: '8 am–4 pm', closed: false },
    { days: 'Sun', times: 'Day off', closed: true },
  ]);
});
