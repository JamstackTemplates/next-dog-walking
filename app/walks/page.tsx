import type { Metadata } from 'next';
import { Signpost } from '../../components/art/signs';
import { GateCta } from '../../components/gate-cta';
import { PageHead } from '../../components/page-head';
import { AddOns, Includes, Sitting, WalkPlanks } from '../../components/walks-sections';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Walks and pet sitting',
  description: 'Neighborhood strolls, Tenney Park pack walks, solo hours, puppy drop-ins, Saturday trail outings and overnight sitting, with prices in US dollars.',
  alternates: { canonical: absoluteUrl('/walks/') },
};

// Walks page copy. Names, prices, durations and the waitlist/paused flags live in content/walks.ts;
// add-on charges live in content/add-ons.ts.
export default function WalksPage() {
  return (
    <>
      <PageHead title="Walks and sitting" art={<Signpost className="mx-auto w-full max-w-[15rem]" />} note="Prices per dog">
        <p>
          Five kinds of walk and two kinds of sitting. Each trail marker tells you the pace, from a gentle
          green-circle sniff to the red-diamond Saturday outing.
        </p>
      </PageHead>

      <WalkPlanks>
        <WalkPlanks.Heading>Walks</WalkPlanks.Heading>
        <WalkPlanks.Introduction>
          Prices are for one dog. Walks start from your door, and every one ends with a photo note.
        </WalkPlanks.Introduction>
      </WalkPlanks>

      <Sitting>
        <Sitting.Introduction>
          <Sitting.Heading>Home and pet sitting</Sitting.Heading>
          <Sitting.Text>
            Away for the day or the week? A walker you already know comes in to feed, walk and keep the house ticking over.
          </Sitting.Text>
        </Sitting.Introduction>
        <Sitting.Hangers>
          <Sitting.Hanger walkId="home-drop-in" sign="Walker inside, back soon" />
          <Sitting.Hanger walkId="overnight-sitting" sign="Sitter on duty tonight" tone="night" />
        </Sitting.Hangers>
      </Sitting>

      <AddOns>
        <AddOns.Text>
          <AddOns.Heading>Add-ons and small print</AddOns.Heading>
          <p>Walks go ahead in rain and snow. In extreme heat or cold we shorten the route and send a note.</p>
          <p>Need to cancel? Tell us by 8 pm the evening before and there’s no charge for that walk.</p>
          <p>Prices are what you pay. We’ll confirm your regular days and the total in writing after the meet & greet.</p>
        </AddOns.Text>
        <AddOns.Board>Park rules and add-ons</AddOns.Board>
      </AddOns>

      <Includes>
        <Includes.Heading>What every walk includes</Includes.Heading>
        <Includes.List>
          <Includes.Item icon="bowl">Fresh water</Includes.Item>
          <Includes.Item icon="towel">Towel-off and paw wipe</Includes.Item>
          <Includes.Item icon="bags">Poop bags, carried out</Includes.Item>
          <Includes.Item icon="camera">Photo note in your inbox</Includes.Item>
        </Includes.List>
      </Includes>

      <GateCta>
        <GateCta.Heading>Found the right trail?</GateCta.Heading>
        <GateCta.Body>
          Tell us which walk you’re thinking about and the days you need. We’ll reply to arrange a free meet & greet before any walks start.
        </GateCta.Body>
        <GateCta.Action>Ask about a walk</GateCta.Action>
      </GateCta>
    </>
  );
}
