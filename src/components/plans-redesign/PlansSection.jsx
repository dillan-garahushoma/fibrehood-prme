import { useRef, useState } from 'react';
import {
  ArrowLeftRight,
  Ban,
  Building2,
  Gauge,
  Headphones,
  Home,
  Infinity as InfinityIcon,
  Wifi,
  Zap,
} from 'lucide-react';
import { ACTIVATION, MAX_COMPARE, PLANS } from './data/plans';
import { useInView } from './hooks/useMotion';
import PlanCard from './PlanCard';
import CompareTray from './CompareTray';

const AUDIENCES = {
  home: {
    label: 'Home',
    Icon: Home,
    blurb: 'Everyday connectivity for households, from light browsing to a fully connected home.',
    perks: [
      [InfinityIcon, 'Unlimited data'],
      [Wifi, 'Wi-Fi router included'],
      [Zap, `Activation from US$${ACTIVATION.home}`],
      [Ban, 'No lock-in'],
      [Headphones, 'Local support'],
    ],
  },
  business: {
    label: 'Business',
    Icon: Building2,
    blurb: 'Symmetric connectivity for growing businesses, built for teams, cloud tools and uptime.',
    perks: [
      [ArrowLeftRight, 'Symmetric speeds'],
      [Headphones, 'Business-grade support'],
      [Zap, `Activation from US$${ACTIVATION.sme}`],
      [Ban, 'No lock-in'],
      [Gauge, 'Priority at busy times'],
    ],
  },
};

export default function PlansSection({ onSelectPlan }) {
  const [audience, setAudience] = useState('home');
  const [selected, setSelected] = useState([]);
  const [gridRef, inView] = useInView({ threshold: 0.12 });
  const tabRefs = { home: useRef(null), business: useRef(null) };

  const copy = AUDIENCES[audience];
  const plans = PLANS.filter((p) => p.audience === audience);
  const selectedPlans = selected.map((id) => PLANS.find((p) => p.id === id)).filter(Boolean);

  const toggleCompare = (id) =>
    setSelected((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : cur.length < MAX_COMPARE ? [...cur, id] : cur
    );

  const onTabKeyDown = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    const next = audience === 'home' ? 'business' : 'home';
    setAudience(next);
    tabRefs[next].current?.focus();
  };

  return (
    <section className="fh-section" id="plans" aria-labelledby="plans-title">
      <div className="fh-container">
        <div className="fh-plans-head">
          <div>
            <h2 id="plans-title" className="fh-h2">
              Pick your speed. Skip the fuss.
            </h2>
            <p className="fh-lede">{copy.blurb}</p>
          </div>

          <div className="fh-seg" role="tablist" aria-label="Plan type" data-value={audience} onKeyDown={onTabKeyDown}>
            {Object.entries(AUDIENCES).map(([key, { label, Icon }]) => (
              <button
                key={key}
                ref={tabRefs[key]}
                type="button"
                role="tab"
                id={`tab-${key}`}
                aria-selected={audience === key}
                aria-controls="plans-panel"
                tabIndex={audience === key ? 0 : -1}
                onClick={() => setAudience(key)}
              >
                <Icon size={18} aria-hidden="true" /> {label}
              </button>
            ))}
          </div>
        </div>

        <ul className="fh-perks">
          {copy.perks.map(([Icon, text]) => (
            <li key={text}>
              <Icon aria-hidden="true" /> {text}
            </li>
          ))}
        </ul>

        <div role="tabpanel" id="plans-panel" aria-labelledby={`tab-${audience}`}>
          <div ref={gridRef} className={`fh-plan-grid${inView ? ' is-in' : ''}`}>
            {plans.map((plan, i) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                index={i}
                inView={inView}
                selected={selected.includes(plan.id)}
                compareDisabled={selected.length >= MAX_COMPARE}
                onToggleCompare={toggleCompare}
                onSelect={onSelectPlan}
              />
            ))}
          </div>
        </div>
      </div>

      <CompareTray
        plans={selectedPlans}
        onRemove={toggleCompare}
        onClear={() => setSelected([])}
        onSelectPlan={onSelectPlan}
      />
    </section>
  );
}
