// Happy Trails Dog Walkers: a fictitious sample business for the Jamstacks gallery.
// Shared details used by pages, metadata, the footer and structured data. Edit here, not in pages.
import type { OpeningHours } from '../lib/hours.ts';

export interface Testimonial {
  /** Stable URL-safe ID. */
  id: string;
  /** Owner's first name. */
  owner: string;
  /** Dog's name and breed, e.g. "Pickle (corgi)". */
  dog: string;
  /** Which drawn portrait to use on the polaroid. */
  portrait: 'corgi' | 'lab' | 'terrier';
  quote: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline used in metadata and the OG image. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and structured data. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public number; blank hides it. */
  phone: string;
  /** Where the walkers go, in a few words. The neighborhood list lives in content/service-area.ts. */
  areaSummary: string;
  /** City and region for structured data. No street address is published. */
  locality: string;
  region: string;
  /**
   * Walk hours in the site time zone (site.config.json `timeZone`, America/Chicago).
   * Every weekday appears once; a day with no times is closed. Overnight sitting is a service,
   * not opening hours, so no interval may cross midnight.
   */
  walkHours: OpeningHours[];
  /** Plain words for the walk hours, shown wherever JavaScript has not computed a live status. */
  walkHoursText: string;
  testimonials: Testimonial[];
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: string[];
  };
}

export const business: Business = {
  name: 'Happy Trails Dog Walkers',
  tagline: 'Happy dogs, muddy paws, home on time.',
  introduction: 'Friendly dog walks, puppy visits and pet sitting around Tenney Park on Madison’s east side. Small groups, familiar walkers, photo notes after every walk.',
  email: 'hello@next-dog-walking.jamstacks.net',
  phone: '(608) 555-0142',
  areaSummary: 'Madison’s near east side, around Tenney Park and the Yahara River path',
  locality: 'Madison',
  region: 'WI',
  walkHours: [
    { day: 'Monday', opens: '07:00', closes: '19:00' },
    { day: 'Tuesday', opens: '07:00', closes: '19:00' },
    { day: 'Wednesday', opens: '07:00', closes: '19:00' },
    { day: 'Thursday', opens: '07:00', closes: '19:00' },
    { day: 'Friday', opens: '07:00', closes: '19:00' },
    { day: 'Saturday', opens: '08:00', closes: '16:00' },
    { day: 'Sunday' },
  ],
  walkHoursText: 'Walks Mon–Fri 7 am–7 pm, Sat 8 am–4 pm',
  testimonials: [
    { id: 'dana-pickle', owner: 'Dana', dog: 'Pickle (corgi)', portrait: 'corgi',
      quote: 'Pickle sits by the door at 11:55 every day. The photo note is the best part of my lunch break.' },
    { id: 'marcus-juniper', owner: 'Marcus', dog: 'Juniper (lab)', portrait: 'lab',
      quote: 'Juniper comes home tired, toweled off and somehow happier than when I walk her.' },
    { id: 'aisha-ruckus', owner: 'Aisha', dog: 'Ruckus (terrier mix)', portrait: 'terrier',
      quote: 'Priya was so patient with Ruckus around other dogs. He has actual friends now.' },
  ],
  enquiries: {
    title: 'Ask about a walk',
    introduction: 'Tell us about your dog and we’ll reply within one working day. Walks and sitting dates are arranged once a walker has replied and you’ve had a free meet & greet at your door.',
    usefulToInclude: [
      'Your dog’s name, breed, age and size',
      'Your neighborhood or nearest cross-streets',
      'The walk type or sitting dates you’re thinking about',
      'Preferred days and times',
      'How they are with other dogs, and any medical needs',
      'How we’d get in (key, lockbox or code). Share the details in person, never in the message',
    ],
  },
};
