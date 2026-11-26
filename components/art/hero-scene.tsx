// "Tenney lagoon walk": dual-theme hero illustration (light afternoon & dark dusk walk).
// Swaps purely in CSS (.hero-img-light / .hero-img-dark) for zero JS flash across modes.
import { asset } from '../../lib/paths';

const HERO_ALT =
  'A dog walker in a green jacket strolling with four happy dogs along Tenney Park’s gravel lakeside trail beside an arched stone footbridge and vintage park lamp.';

export function HeroScene({ className = '' }: { className?: string }) {
  return (
    <div className={`hero-scene overflow-hidden bg-air ${className}`}>
      <img
        src={asset('/hero-light.jpg')}
        alt={HERO_ALT}
        width={1344}
        height={768}
        fetchPriority="high"
        decoding="async"
        className="hero-img-light h-full w-full object-cover object-[76%_68%]"
      />
      <img
        src={asset('/hero-dark.jpg')}
        alt={HERO_ALT}
        width={1344}
        height={768}
        fetchPriority="high"
        decoding="async"
        className="hero-img-dark h-full w-full object-cover object-[76%_68%]"
      />
    </div>
  );
}
