import assert from 'node:assert/strict';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';
import { addOns, validateAddOns, type AddOn } from '../content/add-ons.ts';
import { business } from '../content/business.ts';
import { neighborhoods, parks, validateServiceArea, type Neighborhood } from '../content/service-area.ts';
import { walkers, validateWalkers, type Walker } from '../content/walkers.ts';
import { durationLabel, priceLabel, validateWalks, walks, type Walk } from '../content/walks.ts';
import { PARK_POINT, ZONES } from '../components/art/map-zones.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';
import { validateHours } from '../lib/hours.ts';

const clone = <T,>(value: T): T => structuredClone(value);

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'walkHoursText'] as const) assert.ok(business[key].trim(), `business.${key}: required`);
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  assert.doesNotThrow(() => validateHours(business.walkHours), 'business.walkHours');
  assert.equal(new Set(business.testimonials.map(note => note.id)).size, business.testimonials.length, 'business.testimonials: ids must be unique');
});

test('walk hours never cross midnight (close is after open every day)', () => {
  for (const entry of business.walkHours) {
    if (entry.opens && entry.closes) assert.ok(entry.closes > entry.opens, `business.walkHours ${entry.day}: closes before it opens`);
  }
});

test('walks, add-ons, service area and walkers pass validation', () => {
  assert.doesNotThrow(() => validateWalks(walks));
  assert.doesNotThrow(() => validateAddOns(addOns));
  assert.doesNotThrow(() => validateServiceArea(parks, neighborhoods));
  assert.doesNotThrow(() => validateWalkers(walkers));
  assert.ok(walks.some(walk => walk.kind === 'walk') && walks.some(walk => walk.kind === 'sitting'));
});

test('walk validation failures name the walk to fix', () => {
  const bad = (change: (walk: Walk) => void) => { const list = clone(walks); change(list[1]); return () => validateWalks(list); };
  assert.throws(bad(walk => { walk.priceUsd = 0; }), /walks\.ts "park-pack": priceUsd/);
  assert.throws(bad(walk => { walk.priceUsd = 32.5; }), /"park-pack": priceUsd/);
  assert.throws(bad(walk => { walk.priceUsd = 251; }), /"park-pack": priceUsd/);
  assert.throws(bad(walk => { walk.durationMinutes = 10; }), /"park-pack": durationMinutes/);
  assert.throws(bad(walk => { walk.maxDogs = 5; }), /"park-pack": maxDogs/);
  assert.throws(bad(walk => { walk.id = 'Park Pack'; }), /"Park Pack": id/);
  assert.throws(bad(walk => { walk.id = 'sniff-stroll'; }), /"sniff-stroll": id is used twice/);
  assert.throws(bad(walk => { walk.blaze = 'purple-star' as Walk['blaze']; }), /"park-pack": blaze/);
  assert.throws(bad(walk => { walk.includes = ['Just one']; }), /"park-pack": includes/);
});

test('add-on validation allows free items and names the item to fix', () => {
  const list: AddOn[] = clone(addOns);
  assert.ok(list.some(item => item.priceUsd === 0), 'meet & greet is free');
  list[0].priceUsd = -5;
  assert.throws(() => validateAddOns(list), /add-ons\.ts "extra-dog": priceUsd/);
});

test('neighborhoods reference real parks and allowed statuses', () => {
  const list: Neighborhood[] = clone(neighborhoods);
  list[0].parks = ['central-park'];
  assert.throws(() => validateServiceArea(parks, list), /neighborhood "tenney-lapham": park "central-park"/);
  const status: Neighborhood[] = clone(neighborhoods);
  status[2].status = 'maybe' as Neighborhood['status'];
  assert.throws(() => validateServiceArea(parks, status), /neighborhood "williamson": status/);
});

test('walkers reference real walks and neighborhoods', () => {
  const list: Walker[] = clone(walkers);
  list[1].favoriteWalk = 'moon-walk';
  assert.throws(() => validateWalkers(list), /walkers\.ts "theo-brandt": favoriteWalk "moon-walk"/);
  const places: Walker[] = clone(walkers);
  places[2].neighborhoods = ['downtown'];
  assert.throws(() => validateWalkers(places), /"priya-nair": neighborhood "downtown"/);
});

test('every neighborhood and park has a place on the trail map', () => {
  for (const place of neighborhoods) assert.ok(ZONES[place.id], `components/art/map-zones.ts: add a ZONES entry for neighborhood "${place.id}"`);
  for (const park of parks) {
    if (park.id === 'yahara-path') continue; // drawn as the river path itself
    assert.ok(PARK_POINT[park.id], `components/art/map-zones.ts: add a PARK_POINT entry for park "${park.id}"`);
  }
});

test('labels for prices and durations read naturally', () => {
  assert.equal(priceLabel({ priceUsd: 32, priceUnit: 'walk' }), '$32 a walk');
  assert.equal(priceLabel({ priceUsd: 65, priceUnit: 'outing' }), '$65 an outing');
  assert.equal(durationLabel(30), '30 min');
  assert.equal(durationLabel(60), '1 hour');
  assert.equal(durationLabel(150), '2½ hrs');
  assert.equal(durationLabel(720), '12 hrs');
});

test('LocalBusiness JSON-LD is derived from content in USD', () => {
  const data = businessStructuredData();
  assert.equal(data['@type'], 'LocalBusiness');
  assert.equal(data.email, business.email);
  assert.equal(data.makesOffer.length, walks.filter(walk => walk.available).length);
  const pack = data.makesOffer.find(offer => offer.name === 'Tenney Park Pack Walk');
  assert.equal(pack?.price, walks.find(walk => walk.id === 'park-pack')!.priceUsd.toFixed(2));
  assert.ok(data.makesOffer.every(offer => offer.priceCurrency === 'USD'));
  assert.deepEqual(data.areaServed.map(place => place.name.split(',')[0]),
    neighborhoods.filter(place => place.status !== 'waitlist').map(place => place.name));
  assert.equal(data.openingHoursSpecification.length, 6);
});

test('inline JSON-LD escapes closing script content without changing values', () => {
  const value = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(value);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), value);
});

/** Copy rule: walks and sitting are enquiries; nothing may read as a secured booking. */
test('site copy never promises a booking', () => {
  const files: string[] = [];
  const walk = (dir: string) => {
    for (const name of readdirSync(dir)) {
      const path = join(dir, name);
      if (statSync(path).isDirectory()) walk(path);
      else if (/\.(tsx?|mjs)$/.test(name)) files.push(path);
    }
  };
  for (const dir of ['app', 'components', 'content']) walk(new URL(`../${dir}`, import.meta.url).pathname);
  const banned = /\b(book now|book a walk|booked|booking confirmed|reserved|reserve your|your walk is confirmed|guaranteed slot)\b/i;
  for (const file of files) {
    const text = readFileSync(file, 'utf8');
    const match = text.match(banned);
    assert.equal(match, null, `${file}: replace "${match?.[0]}" with enquiry wording such as "ask about"`);
  }
});
