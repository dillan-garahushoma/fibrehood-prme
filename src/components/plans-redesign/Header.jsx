import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, User, X } from 'lucide-react';

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/plans', label: 'Fibre plans' },
  { to: '/coverage', label: 'Coverage' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'Support' },
  { to: '/contact', label: 'Contact' },
];

const linkClass = ({ isActive }) => `fh-nav__link${isActive ? ' is-active' : ''}`;

/**
 * logoSrc: pass your imported logo or path.
 * If it is missing, a text wordmark shows so the left side is never empty.
 */
export default function Header({
  logoSrc = '/images/logo-black.png',
  portalHref = '/login',
  coverageHref = '/coverage',
}) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="fh-header">
      <div className="fh-header__bar">
        <Link to="/" className="fh-logo" aria-label="Fibrehood home" onClick={close}>
          {logoSrc ? (
            <img src={logoSrc} alt="Fibrehood" />
          ) : (
            <span className="fh-logo__word">fibrehood</span>
          )}
        </Link>

        <nav className="fh-nav" aria-label="Main">
          <ul>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} className={linkClass}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="fh-header__actions">
          <Link to={portalHref} className="fh-btn fh-btn--ghost fh-btn--sm">
            <User size={18} aria-hidden="true" /> Client portal
          </Link>
          <Link to={coverageHref} className="fh-btn fh-btn--gold fh-btn--sm">
            Check coverage
          </Link>
        </div>

        <button
          type="button"
          className="fh-burger"
          aria-expanded={open}
          aria-controls="fh-mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>

        {open && (
          <div id="fh-mobile-nav" className="fh-mobile">
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={linkClass} onClick={close}>
                {l.label}
              </NavLink>
            ))}
            <div className="fh-mobile__actions">
              <Link to={coverageHref} className="fh-btn fh-btn--gold" onClick={close}>
                Check coverage
              </Link>
              <Link to={portalHref} className="fh-btn fh-btn--ghost" onClick={close}>
                <User size={18} aria-hidden="true" /> Client portal
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
