# Happy Trails Dog Walkers

A friendly, park-green website for a small dog-walking and pet-sitting crew on Madison, Wisconsin's
east side, built on the Jamstacks Next.js starter. **Happy Trails is a fictitious sample business for the
Jamstacks gallery**: every walker, phone number and email is made up; the parks and neighborhoods are
real public places. It is a self-contained static export (no server, database or payments) and does not
depend on the starter or portal checkout.

Design concept, "Trailhead signs and dog tags": walk types are routed park-green trail signs with
coloured trail blazes, the service area is a hand-drawn park map built from content, walkers hang as
engraved dog tags on a leash-hook rail, and a dashed leash-red **Trail Line** with paw prints runs
through every page. Dark mode is a dusk walk under the park lamps.

## Run it

Node 24 or later and npm:

```sh
npm ci
npm run dev        # local development
npm run check      # tests, typecheck and static build
npm start          # serve the built out/ folder like GitHub Pages
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Hero park scene with a live "walkers out now" chip, signpost of walk types, how a walk works, service-area teaser, walker tags, owner notes, park-gate call to action. LocalBusiness JSON-LD |
| `/walks/` | Every walk as a plank trail sign, sitting services as door hangers, add-ons notice board, what every walk includes |
| `/service-area/` | Full trail map, "Is my street covered?" neighborhood finder, park postcards, edge and waitlist notes |
| `/walkers/` | Leash-hook rail of walker tags that open into profiles, Biscuit the office dog, safety and trust |
| `/contact/` | Hosted enquiry form when configured, otherwise an email fallback. Email, phone and walk hours always visible |
| `/404.html` | "Trail closed" page with links back |

## Make it yours: where to edit

| What you want to change | File | Fields or section |
| --- | --- | --- |
| A walk's price, length, days or availability | `content/walks.ts` | `priceUsd` (whole dollars), `durationMinutes`, `days`, `available` (false shows "Paused for now"), `waitlist` (true shows "Waitlist, ask anyway") |
| Add or rename a walk or sitting service | `content/walks.ts` | add an entry with a new URL-safe `id`, `kind: 'walk'` or `'sitting'`, a `blaze` and two to four `includes` |
| Add-on charges | `content/add-ons.ts` | `label`, `priceUsd` (0 shows "Free"), `note` |
| Which neighborhoods you cover | `content/service-area.ts` | each neighborhood's `status`: `core`, `edge` (+$5) or `waitlist`; `parks` and optional `note` |
| Parks and their descriptions | `content/service-area.ts` | `parks` list |
| Map shape for a new neighborhood or park | `components/art/map-zones.ts` | add an entry under the same `id` (the tests tell you when one is missing) |
| Walker profiles | `content/walkers.ts` | `name`, `role`, `bio`, `funFact`, `certifications`, `favoriteWalk` (a walk `id`), `neighborhoods` (neighborhood `id`s), `available` |
| Business name, email, phone, walk hours, owner notes, Contact checklist | `content/business.ts` | `name`, `email`, `phone`, `walkHours`, `walkHoursText`, `testimonials`, `enquiries` |
| Headings, intros and calls to action | the page's `app/**/page.tsx` | written in page order as JSX children, e.g. `<Hero.Heading>` in `app/page.tsx` |
| Public name, description, domain, time zone | `site.config.json` | keep the provisioner's shape; no business content here |
| Colours, fonts, textures | `app/tailwind.input.css` | tokens in the light, automatic-dark and explicit-dark blocks |

One source feeds every page: changing `park-pack`'s `priceUsd` from 32 to 34 updates the Home
signpost, the Walks plank and the JSON-LD offer after a rebuild. Setting `maple-bluff` to `edge` re-fills
its map zone, moves it in the finder and adds it to the JSON-LD `areaServed`. Every collection is validated
when the site builds and by `npm test`; failures name the item to fix, for example
`walks.ts "park-pack": priceUsd must be whole dollars from 1 to 250`.

Wording rule: walks, meet & greets and sitting dates are **enquiries**. Say "ask about", never "book
now" or "reserved"; a test checks the copy for booking language.

## Walk hours and the "walkers out now" chip

`content/business.ts` `walkHours` uses the shared seven-day model (`opens`/`closes` in 24-hour
`HH:MM`, a day with no times is a day off) in the `America/Chicago` zone from `site.config.json`. The
chip computes its status in the browser and refreshes every minute; static and no-JS output shows the
neutral `walkHoursText`. Hours may not cross midnight; overnight sitting is a service, not opening
hours. Tests cover the opening and closing minutes, Sunday, and both 2026 daylight-saving changes.

## Interactions without JavaScript

- Neighborhood finder: without JS every neighborhood's sign is listed in full and the Home links jump to
  them; with JS the list becomes buttons that show one sign, highlight its map zone and keep a
  `#neighborhood` link.
- Walker tags are native `<details>` disclosures; `/walkers/#theo-brandt` opens that tag.
- The Trail Line draws in as it scrolls into view; without JS or with reduced motion it is simply drawn.
- The mobile menu is a native disclosure styled as a folded park map; Escape closes it.

## Appearance

Fonts are self-hosted from npm under the SIL Open Font License: **Titan One** (`@fontsource/titan-one`)
for display and signs, **Kumbh Sans** (`@fontsource-variable/kumbh-sans`) for body text and **Gaegu**
(`@fontsource/gaegu`) for walker handwriting only. All artwork is inline SVG in `components/art/`
(no photos or stock icons), drawn in one 2.5px ink line over flat token fills, so dusk mode re-lights
it through the CSS tokens. `public/og.png` (1200×630) is a static render of the hero art and
wordmark; re-render it if the name or tagline changes. The primary green carries white button text in
both themes (6.4:1 light, 5.2:1 dark).

## Public configuration

```json
{
  "name": "Business name",
  "description": "Public description",
  "domain": "next-business-minimal.jamstacks.net",
  "timeZone": "America/New_York",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

The starter itself leaves domain/timeZone unset. Gallery templates use their folder name plus
`.jamstacks.net`; customers replace the demo domain with their own. Do not invent canonical URLs when
the deployed address is unknown.

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config timeZone |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

Copy .env.example to .env.local for Next.js local work. All listed values are public. Never add tokens,
SMTP credentials or publishing keys. Newer dependencies should stay within reviewed majors; update
package.json and package-lock.json together, then run the full checks.

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear only
on Contact when configured. Without a site ID there is no embed host/request. Email remains visible
in either case. The hosted runtime owns name/email/message fields, validation, submission and results.
Never register the element locally, substitute a form or intercept submission. Contact navigation uses
full document loads via SiteLink because the runtime has no remount API. Copy must describe an enquiry,
not a confirmed booking/order/payment; no attachments or extra input fields.

For local Jamstacks development, configure an explicit local CDN URL and
`JAMSTACKS_ALLOW_LOCAL_CDN=1`; remote builds reject localhost. A locally loaded component does not prove
real message delivery. Test delivery separately against a configured site/backend.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Tests cover config/provisioner compatibility, embed state, content rules, optional opening hours,
and structured-data escaping. Typecheck uses Next's generated route types.
When changing the Contact integration, base paths or canonical URLs, check the exported HTML and
sitemap. Verify both configured and unconfigured Contact with the corresponding build settings.
Test light/dark at desktop and mobile widths, keyboard navigation, unknown routes, repeated Contact
navigation and any added browser interactions. Return to a normal build before capturing final assets.

## GitHub Pages deployment

`.github/workflows/pages.yml` uses npm ci, tests, typecheck and static export. It preserves Jamstacks'
`provisioning_id` dispatch input
and correlated run name. It builds pull requests without deploying, and publishes main/manual runs.
Configure Pages to use GitHub Actions. GitHub ignores a CNAME file for Actions deployments, so do not
add public/CNAME; the custom domain is a repository setting. The workflow sets it before building
when a `PAGES_ADMIN_TOKEN` secret is available (a fine-grained token with Administration and Pages
write access to the repository, e.g. as an organisation secret). The domain is the `SITE_DOMAIN`
variable, else site.config.json's `domain`, else `<repo-name>.jamstacks.net` for JamstackTemplates
repositories. Once the domain is set and its certificate is issued, a later deploy also enforces HTTPS.
Without the secret the step only prints a notice; set the custom domain and HTTPS in Settings → Pages.
DNS is managed separately; for template demos the CNAME targets `jamstacktemplates.github.io`.

## Content Security Policy

A host-level CSP must permit same-origin Next.js scripts/assets, the inline theme bootstrap (using an
appropriate hash/nonce policy), the configured Jamstacks CDN scripts/assets and the published form's
API connection origin. Derive actual directives from the deployed component. Optional maps require
`frame-src https://www.google.com`. Apply CSP at the host; static export cannot set response headers
through a running Next.js server. Do not put private credentials into CSP or relax policies blindly.

## Publishing assets and structure

`app/`, `components/`, `content/`, `lib/` and `types/` are the website. `scripts/` includes static
preview and verification, `tests/` covers customer behavior, and `.github/` supplies deployment.
`jamstacks/` is removable gallery-only source metadata. Ordinary builds, tests and Pages work after
it is deleted. To publish a gallery template, create [its manifest](jamstacks/README.md) and capture
genuine screenshots before running its separate publishing test:

```sh
node /home/mythz/src/mythz/jamstacks.net/tools/template-screenshots/capture.mjs \
  --template /path/to/next-type-style --modes light,dark --executable /usr/bin/chromium
node --test jamstacks/config.test.mjs
```

Before publication: replace neutral content and shell; validate industry data/schema and all links;
choose licensed fonts; verify both themes/base-path/embed states; create a neutral 1200×630 public/og.png
from the finished design and wire metadata; replace the icon; generate gallery captures and validate;
confirm domain/Pages settings and HTTPS; remove `plan/` and `.claude/skills/` after review. The website must not import or
link the planning folder. No stock screenshot or OG image is supplied as if it were final.
