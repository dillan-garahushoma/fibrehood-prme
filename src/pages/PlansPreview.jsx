import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, ExternalLink, Eye, Layers } from 'lucide-react';

import '../components/plans-redesign/styles/tokens.css';
import '../components/plans-redesign/styles/components.css';

import Header from '../components/plans-redesign/Header';
import PlansSection from '../components/plans-redesign/PlansSection';
import WhyChoose from '../components/plans-redesign/WhyChoose';
import WhatYouGet from '../components/plans-redesign/WhatYouGet';
import RouterBand from '../components/plans-redesign/RouterBand';
import { PLAN_ID_MAP } from '../components/plans-redesign/data/plans';

import { PlansHero } from '@/components/plans/PlansHero';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import SignupFlow from '@/components/signup/SignupFlow';

export default function PlansPreview() {
  const navigate = useNavigate();
  const [navMode, setNavMode] = useState('redesigned'); // 'redesigned' | 'site'
  const [signupOpen, setSignupOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState('smart-home-connect');

  const handleSelectPlan = (plan) => {
    const mappedId = PLAN_ID_MAP[plan.id] || plan.id;
    setSelectedPlanId(mappedId);
    setSignupOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* ── Top Preview Bar ─────────────────────────────────────────── */}
      <aside
        className="sticky top-0 z-[100] border-b border-amber-300 bg-amber-50/95 px-4 py-2.5 text-xs text-amber-950 backdrop-blur"
        aria-label="Preview settings"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 font-bold tracking-wide text-amber-950 uppercase text-[10px]">
              <Eye size={12} /> Redesign Preview
            </span>
            <span className="hidden font-medium text-amber-900 md:inline">
              Viewing redesigned plans &amp; comparison tray
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="inline-flex rounded-full border border-amber-200 bg-white p-0.5 shadow-sm">
              <button
                type="button"
                onClick={() => setNavMode('redesigned')}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                  navMode === 'redesigned'
                    ? 'bg-navy-900 text-white'
                    : 'text-amber-900 hover:text-amber-950'
                }`}
              >
                Redesigned Header
              </button>
              <button
                type="button"
                onClick={() => setNavMode('site')}
                className={`rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                  navMode === 'site'
                    ? 'bg-navy-900 text-white'
                    : 'text-amber-900 hover:text-amber-950'
                }`}
              >
                Site Navbar
              </button>
            </div>

            <Link
              to="/plans"
              className="inline-flex items-center gap-1 rounded-full border border-amber-300 bg-white px-3 py-1 font-semibold text-amber-900 transition hover:bg-amber-100"
            >
              Live /plans <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      </aside>

      {/* ── Header based on selected preview mode ───────────────────── */}
      {navMode === 'redesigned' ? (
        <Header logoSrc="/images/logo-black.png" />
      ) : (
        <Navbar />
      )}

      {/* ── Existing Plans Hero (as specified in INTEGRATION.md) ─────── */}
      <PlansHero />

      {/* ── Redesigned Plans Experience ─────────────────────────────── */}
      <main className="fh-scope">
        <PlansSection onSelectPlan={handleSelectPlan} />
        <WhyChoose />
        <WhatYouGet />
        <RouterBand imageSrc="/images/fibrehood-router.png" />
      </main>

      {/* ── Standard Site Footer ────────────────────────────────────── */}
      <Footer />

      {/* ── Interactive Signup Flow ─────────────────────────────────── */}
      <SignupFlow
        open={signupOpen}
        location={null}
        initialPlanId={selectedPlanId}
        onClose={() => setSignupOpen(false)}
      />
    </div>
  );
}
