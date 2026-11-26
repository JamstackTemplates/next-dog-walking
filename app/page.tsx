import type { Metadata } from 'next';
import { GateCta } from '../components/gate-cta';
import { AreaTeaser, Hero, OwnerNotes, Steps, TagStrip, WalkSigns } from '../components/home';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = { alternates: { canonical: absoluteUrl('/') } };

// Home page copy, in the order visitors see it. Walks, neighborhoods, walkers and owner notes
// come from content/; edit those files to change prices, areas or people.
export default function HomePage() {
  return (
    <>
      <Hero>
        <Hero.Heading>Happy dogs, muddy paws, home on time.</Hero.Heading>
        <Hero.Introduction>
          Small-group and solo walks around Tenney Park and the Yahara path, led by the same four friendly faces every week.
        </Hero.Introduction>
        <Hero.Actions>
          <Hero.Primary>Ask about a walk</Hero.Primary>
          <Hero.Secondary>See walk types</Hero.Secondary>
        </Hero.Actions>
      </Hero>

      <WalkSigns>
        <WalkSigns.Heading>Pick a trail for your dog</WalkSigns.Heading>
        <WalkSigns.Introduction>
          Every walk ends with a towel-off, fresh water and a photo note in your inbox. Prices are per walk, for one dog.
        </WalkSigns.Introduction>
        <WalkSigns.Link>All walks, sitting and add-ons</WalkSigns.Link>
      </WalkSigns>

      <Steps>
        <Steps.Heading>How a walk works</Steps.Heading>
        <Steps.List>
          <Steps.Step number={1} icon="door" title="Meet & greet at your door">
            A free twenty minutes to meet your dog, see the leash hook and learn the routine.
          </Steps.Step>
          <Steps.Step number={2} icon="key" title="Key or code handover">
            We keep keys tagged without your address, and codes stay off our phones’ notes.
          </Steps.Step>
          <Steps.Step number={3} icon="walker" title="The walk">
            The same walker each week, on a route that suits your dog’s nose, legs and mood.
          </Steps.Step>
          <Steps.Step number={4} icon="camera" title="Photo note in your inbox">
            A picture and a few lines: how far, who they met, and anything you should know.
          </Steps.Step>
        </Steps.List>
      </Steps>

      <AreaTeaser>
        <AreaTeaser.Heading>On your side of the river?</AreaTeaser.Heading>
        <AreaTeaser.Introduction>
          We walk Madison’s near east side, between the lakes and around Tenney Park. Edge neighborhoods add $5 a walk.
        </AreaTeaser.Introduction>
        <AreaTeaser.Neighborhoods />
        <AreaTeaser.Link>Check your street on the map</AreaTeaser.Link>
      </AreaTeaser>

      <TagStrip>
        <TagStrip.Heading>Four walkers, one leash hook</TagStrip.Heading>
        <TagStrip.Introduction>
          Your dog gets to know one walker, with a familiar backup for holidays. Everyone is pet first aid certified.
        </TagStrip.Introduction>
        <TagStrip.Link>Meet the walkers</TagStrip.Link>
      </TagStrip>

      <OwnerNotes>
        <OwnerNotes.Heading>Notes from the neighbors</OwnerNotes.Heading>
      </OwnerNotes>

      <GateCta>
        <GateCta.Heading>Tell us about your dog</GateCta.Heading>
        <GateCta.Body>
          Send their name, your neighborhood and the days you need. A walker will reply within one working day to arrange a free meet & greet.
        </GateCta.Body>
        <GateCta.Action>Ask about a walk</GateCta.Action>
      </GateCta>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }} />
    </>
  );
}
