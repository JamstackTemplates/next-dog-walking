import type { Metadata } from 'next';
import { LeashRail } from '../../components/art/tags';
import { GateCta } from '../../components/gate-cta';
import { PageHead } from '../../components/page-head';
import { OfficeDog, Safety, TagRail } from '../../components/walkers-sections';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Walkers',
  description: 'Meet Maya, Theo, Priya and June: the four pet first aid certified walkers and sitters at Happy Trails, plus Biscuit the office dog.',
  alternates: { canonical: absoluteUrl('/walkers/') },
};

// Walkers page copy. Names, bios, certifications and favourite walks live in content/walkers.ts.
export default function WalkersPage() {
  return (
    <>
      <PageHead title="Who’ll be at your door" art={<LeashRail className="w-full" />} note="Same faces every week">
        <p>
          Four walkers, each with a regular patch of the east side. Your dog gets one familiar walker, and a
          backup they’ve already met.
        </p>
      </PageHead>

      <TagRail>
        <TagRail.Heading>The leash hook</TagRail.Heading>
        <TagRail.Introduction>Open a tag to read about each walker, where they walk and their favourite route.</TagRail.Introduction>
      </TagRail>

      <OfficeDog>
        <OfficeDog.Heading>And Biscuit, the office dog</OfficeDog.Heading>
        <OfficeDog.Text>
          A beagle mix of about nine, Biscuit supervises the key cabinet and tests every new treat before it goes in a walker’s pocket.
        </OfficeDog.Text>
        <OfficeDog.Bubble>Wake me for the Tenney loop.</OfficeDog.Bubble>
      </OfficeDog>

      <Safety>
        <Safety.Heading>Safety and trust</Safety.Heading>
        <Safety.List>
          <Safety.Item icon="first-aid" title="Pet first aid">
            Every walker holds a current pet first aid and CPR certificate and carries a kit on every walk.
          </Safety.Item>
          <Safety.Item icon="shield" title="Insured and checked">
            We carry pet-care liability insurance, and every walker has passed a background check.
          </Safety.Item>
          <Safety.Item icon="walker" title="One familiar walker">
            The same person each week, with one named backup your dog has already met.
          </Safety.Item>
          <Safety.Item icon="key" title="Careful with keys">
            Keys are coded, never labelled with your address, and codes are kept off shared notes.
          </Safety.Item>
        </Safety.List>
      </Safety>

      <GateCta>
        <GateCta.Heading>Ask who walks your street</GateCta.Heading>
        <GateCta.Body>
          Tell us your neighborhood and we’ll introduce the walker who covers it at a free meet & greet.
        </GateCta.Body>
        <GateCta.Action>Ask about a walk</GateCta.Action>
      </GateCta>
    </>
  );
}
