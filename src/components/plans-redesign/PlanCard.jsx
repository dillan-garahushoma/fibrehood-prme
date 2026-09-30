import { Fragment } from 'react';
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  ArrowUp,
  Check,
  MessageCircle,
  Scale,
} from 'lucide-react';
import { WHATSAPP_NUMBER } from './data/plans';
import { useCountUp } from './hooks/useMotion';

/** Renders "plain **bold** plain" as text with <strong>. */
function Rich({ text }) {
  return text
    .split('**')
    .map((part, i) => (i % 2 ? <strong key={i}>{part}</strong> : <Fragment key={i}>{part}</Fragment>));
}

export default function PlanCard({
  plan,
  index,
  inView,
  selected,
  compareDisabled,
  onToggleCompare,
  onSelect,
}) {
  const price = useCountUp(plan.price, inView);
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Hi Fibrehood, I'd like to know more about ${plan.name} ($${plan.price}/month).`
  )}`;

  return (
    <article
      className={`fh-plan${plan.popular ? ' is-featured' : ''}`}
      data-tone={plan.tone}
      style={{ '--i': index }}
      aria-labelledby={`${plan.id}-name`}
    >
      {plan.popular && (
        <span className="fh-sticker">
          <span>
            Most
            <br />
            popular
          </span>
        </span>
      )}

      <button
        type="button"
        className="fh-compare"
        aria-pressed={selected}
        aria-label={`${selected ? 'Remove' : 'Add'} ${plan.name} ${selected ? 'from' : 'to'} comparison`}
        title={selected ? 'Remove from comparison' : 'Add to comparison'}
        disabled={!selected && compareDisabled}
        onClick={() => onToggleCompare(plan.id)}
      >
        <Scale size={18} aria-hidden="true" />
      </button>

      <p className="fh-plan__tag">{plan.tagline}</p>
      <h3 id={`${plan.id}-name`} className="fh-plan__name">
        {plan.name}
      </h3>

      <div className="fh-speed">
        <span className="fh-sr">
          {plan.down} Mbps download
          {plan.symmetric ? ', symmetric' : `, ${plan.up} Mbps upload`}
        </span>
        <div aria-hidden="true">
          <div className="fh-speed__main">
            <span className="fh-speed__num">{plan.down}</span>
            <span className="fh-speed__unit">Mbps</span>
            {!plan.symmetric && (
              <span className="fh-arrow">
                <ArrowDown />
              </span>
            )}
          </div>
          <div className="fh-speed__sub">
            {plan.symmetric ? (
              <>
                <span className="fh-arrow">
                  <ArrowLeftRight />
                </span>
                Symmetric
              </>
            ) : (
              <>
                <span className="fh-arrow">
                  <ArrowUp />
                </span>
                <span>
                  <strong>{plan.up} Mbps</strong> upload
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="fh-price">
        <span className="fh-sr">${plan.price} per month</span>
        <span aria-hidden="true" className="fh-price__figure">
          <span className="fh-price__cur">$</span>
          {price}
        </span>
        <span aria-hidden="true" className="fh-price__per">
          / month
        </span>
      </p>

      <div className="fh-plan__rule" />

      <ul className="fh-feats">
        {plan.features.map((f) => (
          <li key={f}>
            <span className="fh-check">
              <Check aria-hidden="true" />
            </span>
            <span>
              <Rich text={f} />
            </span>
          </li>
        ))}
      </ul>

      <div className="fh-plan__actions">
        <button type="button" className="fh-btn fh-btn--navy fh-btn--block" onClick={() => onSelect?.(plan)}>
          Select package <ArrowRight size={18} aria-hidden="true" />
        </button>
        <a className="fh-wa" href={waHref} target="_blank" rel="noopener noreferrer">
          <MessageCircle size={16} aria-hidden="true" /> Talk to us on WhatsApp
        </a>
      </div>
    </article>
  );
}
