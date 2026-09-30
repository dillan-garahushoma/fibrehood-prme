import { Router, Wrench, Zap } from 'lucide-react';
import { ACTIVATION, ROUTER_SCOPE } from './data/plans';

export default function WhatYouGet() {
  return (
    <section className="fh-section" aria-labelledby="get-title">
      <div className="fh-container">
        <h2 id="get-title" className="fh-h2">
          Free installation, one once-off activation fee.
        </h2>
        <p className="fh-lede">Here is what comes with your connection.</p>

        <div className="fh-tiles">
          <article className="fh-tile">
            <span className="fh-tile__icon">
              <Wrench size={22} aria-hidden="true" />
            </span>
            <p className="fh-tile__figure">$0</p>
            <h3 className="fh-tile__label">Installation</h3>
            <p className="fh-tile__text">Free for everyone in your community.</p>
          </article>

          <article className="fh-tile fh-tile--navy">
            <span className="fh-tile__icon">
              <Zap size={22} aria-hidden="true" />
            </span>
            <p className="fh-tile__figure">US${ACTIVATION.home}</p>
            <h3 className="fh-tile__label">Once-off activation</h3>
            <p className="fh-tile__text">
              US${ACTIVATION.home} for homes, US${ACTIVATION.sme} for SMEs. Enterprise on request ({ACTIVATION.enterprise}).
            </p>
          </article>

          <article className="fh-tile fh-tile--sky">
            <span className="fh-tile__icon">
              <Router size={22} aria-hidden="true" />
            </span>
            <p className="fh-tile__figure">$0</p>
            <h3 className="fh-tile__label">Free-to-use router</h3>
            <p className="fh-tile__text">Included with {ROUTER_SCOPE}, at no extra cost.</p>
            <a className="fh-tile__link" href="#router">
              About the router
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
