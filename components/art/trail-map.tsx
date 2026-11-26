// Hand-drawn east-side trail map. Zones, parks and labels are drawn from content/service-area.ts;
// this file only owns where each shape sits. Not geographically exact (the page says so).
import { neighborhoods, parks, type AreaStatus } from '../../content/service-area';
import { HerePin, Oak, Paw, TrailPath } from './kit';
import { PARK_POINT, ZONES } from './map-zones';

const ZONE_CLASS: Record<AreaStatus, string> = {
  core: 'f-grass ln',
  edge: 'ln',
  waitlist: 'nf ln',
};

const ROUTE = 'M196 198C290 236 380 174 500 152C556 226 590 290 636 336C600 404 424 470 338 452M636 336C700 420 744 512 790 548M500 152C640 120 760 140 884 108';

export function TrailMap({ compact = false, className = '' }: { compact?: boolean; className?: string }) {
  const id = compact ? 'mini' : 'full';
  return (
    <svg viewBox="0 0 1000 640" className={`art trail-map ${className}`} role="img"
      aria-label="Hand-drawn map of the service area around Tenney Park, between Lake Mendota and Lake Monona. The neighborhoods are listed in text on this page."
      data-trail="" id={compact ? undefined : 'trail-map'}>
      <defs>
        <pattern id={`${id}-dots`} width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" className="f-paper-deep" />
          <circle cx="6" cy="6" r="2.4" className="f-grass-deep" />
        </pattern>
        <pattern id={`${id}-paper`} width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" className="f-sign" />
          <path d="M0 20h40M20 0v40" className="nf s-rule" strokeWidth=".8" />
        </pattern>
      </defs>
      <rect width="1000" height="640" fill={`url(#${id}-paper)`} />
      {/* lakes and river */}
      <path d="M0 0h430l40 128c-90 12-210 12-360 42L0 204z" className="f-sky ln" />
      <path d="M0 474c120-30 180-22 212-24l120 70c90 40 190 42 308 40 120 28 220 4 360 40v40H0z" className="f-sky ln" />
      <path d="M500 140c20 80 30 160 60 240s30 140 40 190" className="nf ln" strokeWidth="18" />
      <path d="M500 140c20 80 30 160 60 240s30 140 40 190" className="nf s-sky" strokeWidth="12" />
      {!compact && <>
        <text x="120" y="80" className="zone-label" fontSize="30" opacity=".7">Lake Mendota</text>
        <text x="560" y="618" className="zone-label" fontSize="30" opacity=".7">Lake Monona</text>
        <text x="0" y="0" className="zone-label" fontSize="20" transform="translate(592 520) rotate(78)" opacity=".8">Yahara River path</text>
      </>}

      {/* neighborhoods */}
      {neighborhoods.map(place => {
        const zone = ZONES[place.id];
        if (!zone) return null;
        return (
          <path key={place.id} d={zone.d} data-zone={place.id} data-status={place.status}
            className={`zone ${ZONE_CLASS[place.status]}`}
            fill={place.status === 'edge' ? `url(#${id}-dots)` : undefined}
            fillOpacity={place.status === 'core' ? 0.85 : undefined}
            strokeDasharray={place.status === 'waitlist' ? '9 8' : undefined} />
        );
      })}

      {/* parks */}
      {parks.map(park => {
        const point = PARK_POINT[park.id];
        if (!point) return null;
        const [x, y, r] = point;
        return (
          <g key={park.id}>
            <ellipse cx={x} cy={y} rx={r * 1.3} ry={r} className="f-leaf ln" />
            <Oak x={x - r * 0.4} y={y + 8} s={0.16} tone="leaf-dark" />
            <Oak x={x + r * 0.4} y={y + 4} s={0.13} tone="leaf-dark" />
            {!compact && (
              <g>
                <rect x={x - park.mapLabel.length * 5.6 - 8} y={y + r + 4} width={park.mapLabel.length * 11.2 + 16} height="26" rx="6" className="f-surface ln ln-thin" />
                <text x={x} y={y + r + 23} textAnchor="middle" className="zone-label" fontSize="19">{park.mapLabel}</text>
              </g>
            )}
          </g>
        );
      })}

      <TrailPath id={`map-${id}`} d={ROUTE} paws={[[420, 166, 80], [600, 280, 140], [700, 136, 80]]} width={4.5} />

      {!compact && neighborhoods.map(place => {
        const zone = ZONES[place.id];
        return zone ? <text key={place.id} x={zone.label[0]} y={zone.label[1]} textAnchor="middle" className="zone-label" fontSize="23">{place.name.replace(/ \(.+\)/, '')}</text> : null;
      })}

      <HerePin x={410} y={236} label={!compact} side="left" />

      {/* compass rose drawn as a paw */}
      <g transform="translate(940 560)">
        <circle r="38" className="f-surface ln" />
        <path d="M0-50l8 16H-8z" className="f-leash ln ln-thin" />
        <Paw x={0} y={4} s={2.2} className="f-primary" />
        {!compact && <text y="-58" textAnchor="middle" className="zone-label" fontSize="20">N</text>}
      </g>
    </svg>
  );
}
