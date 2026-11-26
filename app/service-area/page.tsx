import type { Metadata } from 'next';
import { Area } from '../../components/area-sections';
import { FoldedMap } from '../../components/art/signs';
import { GateCta } from '../../components/gate-cta';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Service area',
  description: 'The Madison east-side neighborhoods Happy Trails walks, from Tenney-Lapham and Marquette to Sherman and Schenk-Atwood, and the parks we use.',
  alternates: { canonical: absoluteUrl('/service-area/') },
};

// Service area copy. Neighborhood statuses, notes and parks live in content/service-area.ts.
export default function ServiceAreaPage() {
  return (
    <>
      <PageHead title="Where we walk" art={<FoldedMap className="w-full" />} note="Between the lakes">
        <p>
          Madison’s near east side, centred on Tenney Park and the Yahara River path. Find your neighborhood
          on the map or in the list below.
        </p>
      </PageHead>

      <Area.Map>Not to scale. Ask if you’re unsure.</Area.Map>

      <Area.Finder>
        <Area.Finder.Heading>Is my street covered?</Area.Finder.Heading>
        <Area.Finder.Introduction>
          Choose your neighborhood to see whether it’s a regular stop, on the edge or on the waitlist, and which parks we walk from there.
        </Area.Finder.Introduction>
      </Area.Finder>

      <Area.Parks>
        <Area.Parks.Heading>Parks we walk</Area.Parks.Heading>
      </Area.Parks>

      <Area.Edge>
        <Area.Edge.Heading>Edges and waitlists</Area.Edge.Heading>
        <p>
          Edge neighborhoods are a longer drive between walks, so we add $5 a walk and keep a few spots there
          for dogs who fit an existing route.
        </p>
        <p>
          A waitlist neighborhood means we’re full for now. Ask anyway: we keep a list, and we’ll write when a
          walker can take your street.
        </p>
      </Area.Edge>

      <GateCta>
        <GateCta.Heading>Not on the map? Ask anyway</GateCta.Heading>
        <GateCta.Body>
          Send your cross-streets and the days you need. If we can’t reach you, we’ll say so and suggest someone nearby.
        </GateCta.Body>
        <GateCta.Action>Ask about a walk</GateCta.Action>
      </GateCta>
    </>
  );
}
