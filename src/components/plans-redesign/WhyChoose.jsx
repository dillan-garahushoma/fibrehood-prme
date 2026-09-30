import { BadgeCheck, HeartHandshake, Users, Wifi } from 'lucide-react';

const ITEMS = [
  {
    Icon: Wifi,
    title: '100% fibre infrastructure',
    text: 'Built for speed, reliability and the future.',
  },
  {
    Icon: BadgeCheck,
    title: 'Trusted local provider',
    text: 'Licensed, reliable and customer-focused.',
  },
  {
    Icon: HeartHandshake,
    title: 'Support that cares',
    text: 'Real people. Real solutions. Always.',
  },
  {
    Icon: Users,
    title: 'Connecting Zimbabwe',
    text: 'Empowering homes, businesses and communities.',
  },
];

export default function WhyChoose() {
  return (
    <section className="fh-section fh-section--cream" aria-labelledby="why-title">
      <div className="fh-container">
        <h2 id="why-title" className="fh-h2">
          Why choose Fibrehood?
        </h2>
        <ul className="fh-why">
          {ITEMS.map(({ Icon, title, text }) => (
            <li className="fh-why__item" key={title}>
              <span className="fh-why__icon">
                <Icon size={26} aria-hidden="true" />
              </span>
              <h3 className="fh-why__title">{title}</h3>
              <p className="fh-why__text">{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
