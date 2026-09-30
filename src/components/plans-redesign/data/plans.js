// One source of truth for numbers that appear in more than one place.
// Wrap key phrases in **double asterisks** to bold them in the cards.
import { SITE } from '@/data/site';

export const ACTIVATION = { home: 65, sme: 75, enterprise: 'POA' };

export const ROUTER_SCOPE = 'every home fibre plan';

// Real Fibrehood WhatsApp number from site config
export const WHATSAPP_NUMBER = SITE?.whatsapp || '263784416605';

export const MAX_COMPARE = 3;

export const PLAN_ID_MAP = {
  'starter-home': 'starter-home-connect',
  'smart-home': 'smart-home-connect',
  'pro-home': 'pro-home-connect',
  'ultra-home': 'ultra-home-connect',
  'sme-basic': 'sme-basic',
  'sme-pro': 'sme-pro',
  'sme-max': 'sme-max',
};

export const PLANS = [
  {
    id: 'starter-home',
    audience: 'home',
    name: 'Starter Home Connect',
    tagline: 'Light usage',
    down: 5,
    up: 3,
    price: 40,
    tone: 'cream',
    features: [
      'Great for **1–3 devices**',
      'Smooth **browsing and email**',
      '**SD** video streaming',
    ],
  },
  {
    id: 'smart-home',
    audience: 'home',
    name: 'Smart Home Connect',
    tagline: 'Family usage',
    down: 15,
    up: 8,
    price: 50,
    popular: true,
    features: [
      'Handles **4–6 devices** at once',
      '**HD streaming** on multiple screens',
      'Comfortable for **video calls**',
    ],
  },
  {
    id: 'pro-home',
    audience: 'home',
    name: 'Pro Home Connect',
    tagline: 'Serious home usage',
    down: 30,
    up: 15,
    price: 65,
    tone: 'sky',
    features: [
      'Supports **7–10 devices**',
      '**4K streaming** without buffering',
      'Solid upload for **working from home**',
    ],
  },
  {
    id: 'ultra-home',
    audience: 'home',
    name: 'Ultra Home Connect',
    tagline: 'Heavy, connected home',
    down: 100,
    up: 50,
    price: 85,
    tone: 'cream',
    features: [
      '**10+ devices** with headroom to spare',
      'Heavy streaming and **smart home**',
      'Strong upload for **content creators**',
    ],
  },
  {
    id: 'sme-basic',
    audience: 'business',
    name: 'SME Basic',
    tagline: 'Everyday business',
    down: 30,
    symmetric: true,
    price: 75,
    tone: 'cream',
    features: [
      'Ideal for **small offices and POS**',
      'Reliable **cloud app** performance',
      'Upgrade when your team grows',
    ],
  },
  {
    id: 'sme-pro',
    audience: 'business',
    name: 'SME Pro',
    tagline: 'Growing teams',
    down: 50,
    symmetric: true,
    price: 125,
    popular: true,
    features: [
      '**VoIP and video conferencing** ready',
      'Runs several **cloud apps** at once',
      '**Priority** over SME Basic at busy times',
    ],
  },
  {
    id: 'sme-max',
    audience: 'business',
    name: 'SME Max',
    tagline: 'Demanding operations',
    down: 100,
    symmetric: true,
    price: 190,
    tone: 'sky',
    features: [
      '**High-demand teams** and hosted infrastructure',
      '**Dedicated capacity** options',
      'Priority business support **SLA**',
    ],
  },
];
