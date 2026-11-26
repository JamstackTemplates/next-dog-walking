import { business } from '../content/business.ts';
import { neighborhoods } from '../content/service-area.ts';
import { walks } from '../content/walks.ts';
import { absoluteUrl } from './paths.ts';

const DAY_URL = (day: string) => `https://schema.org/${day}`;

/** LocalBusiness JSON-LD derived from content: walk hours, service area and walk offers (USD). */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url, '@id': `${url}#business` } : {}),
    address: { '@type': 'PostalAddress', addressLocality: business.locality, addressRegion: business.region, addressCountry: 'US' },
    areaServed: neighborhoods
      .filter(place => place.status !== 'waitlist')
      .map(place => ({ '@type': 'Place', name: `${place.name}, ${business.locality}, ${business.region}` })),
    openingHoursSpecification: business.walkHours
      .filter(entry => entry.opens && entry.closes)
      .map(entry => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: DAY_URL(entry.day), opens: entry.opens, closes: entry.closes })),
    makesOffer: walks
      .filter(walk => walk.available)
      .map(walk => ({
        '@type': 'Offer',
        name: walk.name,
        description: walk.summary,
        price: walk.priceUsd.toFixed(2),
        priceCurrency: 'USD',
        ...(absoluteUrl('/walks/') ? { url: `${absoluteUrl('/walks/')}#${walk.id}` } : {}),
        itemOffered: { '@type': 'Service', name: walk.name, serviceType: walk.kind === 'walk' ? 'Dog walking' : 'Pet sitting' },
      })),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
