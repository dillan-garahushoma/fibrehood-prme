import { Check } from 'lucide-react';
import { ROUTER_SCOPE } from './data/plans';

/**
 * imageSrc: a cut-out PNG/WebP of the router on a transparent background.
 * Uses Fibrehood router asset.
 */
export default function RouterBand({ imageSrc = '/images/fibrehood-router.png' }) {
  return (
    <section className="fh-section" id="router" aria-labelledby="router-title">
      <div className="fh-container">
        <div className="fh-router">
          <div className="fh-router__media">
            <img className="fh-router__img" src={imageSrc} alt="Fibrehood Wi-Fi router" width="520" />
          </div>

          <div className="fh-router__body">
            <h2 id="router-title" className="fh-h2">
              Your Fibrehood router, ready to connect your home.
            </h2>
            <p>
              {ROUTER_SCOPE.charAt(0).toUpperCase() + ROUTER_SCOPE.slice(1)} includes a free-to-use router,
              provided when you sign up for activation. It stays Fibrehood&rsquo;s property and is yours to
              use for as long as you need our service.
            </p>
            <ul className="fh-router__list">
              {[
                'Wi-Fi router included with every home fibre plan',
                'Reliable coverage for everyday streaming, work and play',
                'Simple setup with support from the Fibrehood team',
              ].map((t) => (
                <li key={t}>
                  <span className="fh-check">
                    <Check aria-hidden="true" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
