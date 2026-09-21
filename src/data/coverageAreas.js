// Fibrehood coverage & geocoding fixtures (development footprint model).
// Polygons are arrays of [lat, lng] positions (Leaflet convention), conceptually
// GeoJSON-compatible — swap this module for a real GIS/serviceability feed
// without touching the UI or the coverage service contract.
//
// Deployment zones/phases carry a status and an update timestamp but no polygon:
// Fibrehood does not maintain authoritative phase boundaries, so the map stays
// at area level rather than inventing building-level precision.

import { DEPLOYMENT_STATUS } from "@/data/coverageStatus";

export const COVERAGE_AREAS = [
  {
    id: "southview",
    name: "Southview",
    status: DEPLOYMENT_STATUS.LIVE,
    center: [-17.893, 31.08],
    updatedAt: "2026-08-28",
    polygon: [
      [-17.902, 31.068],
      [-17.9, 31.094],
      [-17.885, 31.092],
      [-17.883, 31.069],
      [-17.893, 31.062]
    ],
    zones: [
      { id: "southview-1a", name: "Phase 1A", status: DEPLOYMENT_STATUS.LIVE, updatedAt: "2026-08-28" },
      { id: "southview-1b", name: "Phase 1B", status: DEPLOYMENT_STATUS.LIVE, updatedAt: "2026-08-28" },
      { id: "southview-1c", name: "Phase 1C", status: DEPLOYMENT_STATUS.IN_PROGRESS, updatedAt: "2026-09-02" },
      { id: "southview-2a", name: "Phase 2A", status: DEPLOYMENT_STATUS.PLANNED, updatedAt: "2026-08-15" }
    ],
    metadata: { region: "Harare" }
  },
  {
    id: "tafara-flats",
    name: "Tafara Flats",
    status: DEPLOYMENT_STATUS.LIVE,
    center: [-17.851, 31.163],
    updatedAt: "2026-08-30",
    polygon: [
      [-17.861, 31.15],
      [-17.859, 31.179],
      [-17.842, 31.177],
      [-17.839, 31.151],
      [-17.852, 31.145]
    ],
    zones: [
      { id: "tafara-1", name: "Phase 1", status: DEPLOYMENT_STATUS.LIVE, updatedAt: "2026-08-30" },
      { id: "tafara-2", name: "Phase 2", status: DEPLOYMENT_STATUS.PLANNED, updatedAt: "2026-08-10" }
    ],
    metadata: { region: "Harare" }
  },
  {
    id: "norton",
    name: "Norton",
    status: DEPLOYMENT_STATUS.IN_PROGRESS,
    center: [-17.886, 30.697],
    updatedAt: "2026-09-04",
    polygon: [
      [-17.906, 30.68],
      [-17.903, 30.72],
      [-17.867, 30.718],
      [-17.869, 30.678],
      [-17.888, 30.672]
    ],
    zones: [
      { id: "norton-1", name: "Phase 1", status: DEPLOYMENT_STATUS.IN_PROGRESS, updatedAt: "2026-09-04" },
      { id: "norton-2", name: "Phase 2", status: DEPLOYMENT_STATUS.NOT_STARTED, updatedAt: "2026-07-22" }
    ],
    metadata: { region: "Mashonaland West" }
  },
  {
    id: "waterfalls",
    name: "Waterfalls",
    status: DEPLOYMENT_STATUS.PLANNED,
    center: [-17.87, 31.03],
    updatedAt: "2026-08-18",
    polygon: [
      [-17.882, 31.016],
      [-17.879, 31.046],
      [-17.858, 31.044],
      [-17.857, 31.018],
      [-17.871, 31.01]
    ],
    zones: [
      { id: "waterfalls-1", name: "Phase 1", status: DEPLOYMENT_STATUS.PLANNED, updatedAt: "2026-08-18" }
    ],
    metadata: { region: "Harare" }
  },
  {
    id: "glen-view",
    name: "Glen View",
    status: DEPLOYMENT_STATUS.NOT_STARTED,
    center: [-17.905, 30.985],
    updatedAt: "2026-07-11",
    polygon: [
      [-17.916, 30.972],
      [-17.914, 31.0],
      [-17.895, 30.998],
      [-17.894, 30.974],
      [-17.906, 30.967]
    ],
    zones: [
      { id: "glen-view-1", name: "Phase 1", status: DEPLOYMENT_STATUS.NOT_STARTED, updatedAt: "2026-07-11" }
    ],
    metadata: { region: "Harare" }
  }
];

// Guided location hierarchy: Town → Suburb → MDU.
// MDU records exist only where Fibrehood tracks building-level readiness; every
// other suburb resolves at area level and MDU selection stays optional.
export const TOWNS = [
  {
    id: "harare",
    name: "Harare",
    suburbs: [
      {
        id: "southview",
        name: "Southview",
        areaId: "southview",
        lat: -17.893,
        lng: 31.08,
        mdus: [
          { id: "fidelity-southview-park", name: "Fidelity Southview Park", status: DEPLOYMENT_STATUS.LIVE, lat: -17.893, lng: 31.08, updatedAt: "2026-09-16" },
          { id: "southview-park-a", name: "Southview Park — Block A", status: DEPLOYMENT_STATUS.LIVE, lat: -17.8925, lng: 31.0795, updatedAt: "2026-08-28" },
          { id: "southview-park-b", name: "Southview Park — Block B", status: DEPLOYMENT_STATUS.IN_PROGRESS, lat: -17.8918, lng: 31.0812, updatedAt: "2026-09-02" },
          { id: "southview-apartments", name: "Southview Apartments", status: DEPLOYMENT_STATUS.LIVE, lat: -17.8941, lng: 31.0783, updatedAt: "2026-08-28" }
        ]
      },
      {
        id: "avenues",
        name: "Avenues",
        lat: -17.81,
        lng: 31.04,
        mdus: [
          { id: "avenues-area", name: "Avenues Area", status: DEPLOYMENT_STATUS.LIVE, lat: -17.81, lng: 31.04, updatedAt: "2026-09-16" }
        ]
      },
      {
        id: "tafara-flats",
        name: "Tafara Flats",
        areaId: "tafara-flats",
        lat: -17.851,
        lng: 31.163,
        mdus: [
          { id: "tafara-flats", name: "Tafara Flats", status: DEPLOYMENT_STATUS.LIVE, lat: -17.851, lng: 31.163, updatedAt: "2026-09-16" }
        ]
      },
      {
        id: "glen-lorne",
        name: "Glen Lorne",
        lat: -17.738,
        lng: 31.12,
        mdus: [
          { id: "lifestyle-apartments", name: "Lifestyle Apartments", status: DEPLOYMENT_STATUS.LIVE, lat: -17.738, lng: 31.12, updatedAt: "2026-09-16" }
        ]
      },
      { id: "waterfalls", name: "Waterfalls", areaId: "waterfalls", lat: -17.87, lng: 31.03, mdus: [] },
      { id: "glen-view", name: "Glen View", areaId: "glen-view", lat: -17.905, lng: 30.985, mdus: [] },
      { id: "avondale", name: "Avondale", lat: -17.793, lng: 31.04, mdus: [] },
      { id: "borrowdale", name: "Borrowdale", lat: -17.748, lng: 31.092, mdus: [] },
      { id: "highlands", name: "Highlands", lat: -17.795, lng: 31.105, mdus: [] },
      { id: "mabvuku", name: "Mabvuku", lat: -17.86, lng: 31.18, mdus: [] },
      { id: "hatfield", name: "Hatfield", lat: -17.885, lng: 31.01, mdus: [] },
      { id: "harare-cbd", name: "Harare CBD", lat: -17.8292, lng: 31.0539, mdus: [] }
    ]
  },
  {
    id: "norton",
    name: "Norton",
    suburbs: [
      {
        id: "norton-galloway",
        name: "Galloway Road",
        areaId: "norton",
        lat: -17.886,
        lng: 30.697,
        mdus: [
          { id: "norton-galloway-road", name: "Norton (Galloway Road)", status: DEPLOYMENT_STATUS.LIVE, lat: -17.886, lng: 30.697, updatedAt: "2026-09-16" }
        ]
      },
      { id: "norton-central", name: "Norton Central", areaId: "norton", lat: -17.886, lng: 30.697, mdus: [] },
      { id: "katanga", name: "Katanga", lat: -17.876, lng: 30.705, mdus: [] }
    ]
  },
  {
    id: "chitungwiza",
    name: "Chitungwiza",
    suburbs: [
      { id: "zengeza", name: "Zengeza", lat: -18.0, lng: 31.08, mdus: [] },
      { id: "st-marys", name: "St Mary's", lat: -18.01, lng: 31.07, mdus: [] }
    ]
  },
  {
    id: "bulawayo",
    name: "Bulawayo",
    suburbs: [
      { id: "hillside-byo", name: "Hillside", lat: -20.17, lng: 28.61, mdus: [] },
      {
        id: "byo-cbd",
        name: "Bulawayo CBD",
        lat: -20.14,
        lng: 28.58,
        mdus: [
          { id: "bulawayo-tba", name: "Bulawayo TBA", status: DEPLOYMENT_STATUS.LIVE, lat: -20.14, lng: 28.58, updatedAt: "2026-09-16" }
        ]
      }
    ]
  }
];

// Local address dataset powering autocomplete + reverse geocoding without an
// external API. Each entry resolves to a coordinate used by the coverage engine.
export const ADDRESS_LOCALITIES = [
  { id: "avenues-area", name: "Avenues Area", region: "Harare", lat: -17.81, lng: 31.04, townId: "harare", suburbId: "avenues", mduId: "avenues-area" },
  { id: "lifestyle-apartments", name: "Lifestyle Apartments", region: "Glen Lorne, Harare", lat: -17.738, lng: 31.12, townId: "harare", suburbId: "glen-lorne", mduId: "lifestyle-apartments" },
  { id: "fidelity-southview-park", name: "Fidelity Southview Park", region: "Harare", lat: -17.893, lng: 31.08, townId: "harare", suburbId: "southview", mduId: "fidelity-southview-park" },
  { id: "norton-galloway-road", name: "Norton (Galloway Road)", region: "Norton", lat: -17.886, lng: 30.697, townId: "norton", suburbId: "norton-galloway", mduId: "norton-galloway-road" },
  { id: "bulawayo-tba", name: "Bulawayo TBA", region: "Bulawayo", lat: -20.14, lng: 28.58, townId: "bulawayo", suburbId: "byo-cbd", mduId: "bulawayo-tba" },
  { id: "southview", name: "Southview", region: "Harare", lat: -17.893, lng: 31.08 },
  { id: "tafara-flats", name: "Tafara Flats", region: "Harare", lat: -17.851, lng: 31.163, townId: "harare", suburbId: "tafara-flats", mduId: "tafara-flats" },
  { id: "norton", name: "Norton", region: "Mashonaland West", lat: -17.886, lng: 30.697 },
  { id: "harare-cbd", name: "Harare CBD", region: "Harare", lat: -17.8292, lng: 31.0539 },
  { id: "avondale", name: "Avondale", region: "Harare", lat: -17.793, lng: 31.04 },
  { id: "mount-pleasant", name: "Mount Pleasant", region: "Harare", lat: -17.768, lng: 31.078 },
  { id: "borrowdale", name: "Borrowdale", region: "Harare", lat: -17.748, lng: 31.092 },
  { id: "greendale", name: "Greendale", region: "Harare", lat: -17.79, lng: 31.11 },
  { id: "marlborough", name: "Marlborough", region: "Harare", lat: -17.762, lng: 31.052 },
  { id: "highlands", name: "Highlands", region: "Harare", lat: -17.795, lng: 31.105 },
  { id: "hillside", name: "Hillside", region: "Harare", lat: -17.82, lng: 31.072 },
  { id: "eastlea", name: "Eastlea", region: "Harare", lat: -17.835, lng: 31.09 },
  { id: "alexandra-park", name: "Alexandra Park", region: "Harare", lat: -17.79, lng: 31.06 },
  { id: "mandara", name: "Mandara", region: "Harare", lat: -17.735, lng: 31.13 },
  { id: "glen-lorne", name: "Glen Lorne", region: "Harare", lat: -17.738, lng: 31.12 },
  { id: "mbare", name: "Mbare", region: "Harare", lat: -17.845, lng: 31.04 },
  { id: "sunningdale", name: "Sunningdale", region: "Harare", lat: -17.86, lng: 31.02 },
  { id: "waterfalls", name: "Waterfalls", region: "Harare", lat: -17.87, lng: 31.03 },
  { id: "hatfield", name: "Hatfield", region: "Harare", lat: -17.885, lng: 31.01 },
  { id: "highfield", name: "Highfield", region: "Harare", lat: -17.855, lng: 31.015 },
  { id: "budiriro", name: "Budiriro", region: "Harare", lat: -17.89, lng: 30.99 },
  { id: "glen-view", name: "Glen View", region: "Harare", lat: -17.905, lng: 30.985 },
  { id: "kuwadzana", name: "Kuwadzana", region: "Harare", lat: -17.91, lng: 30.95 },
  { id: "dzivarasekwa", name: "Dzivarasekwa", region: "Harare", lat: -17.895, lng: 30.935 },
  { id: "warren-park", name: "Warren Park", region: "Harare", lat: -17.88, lng: 30.945 },
  { id: "tafara", name: "Tafara", region: "Harare", lat: -17.848, lng: 31.165 },
  { id: "mabvuku", name: "Mabvuku", region: "Harare", lat: -17.86, lng: 31.18 },
  { id: "ruwa", name: "Ruwa", region: "Harare", lat: -17.89, lng: 31.23 },
  { id: "epworth", name: "Epworth", region: "Harare", lat: -17.89, lng: 31.15 },
  { id: "chitungwiza", name: "Chitungwiza", region: "Harare", lat: -18.0, lng: 31.08 },
  { id: "southerton", name: "Southerton", region: "Harare", lat: -17.84, lng: 31.012 },
  { id: "hatcliffe", name: "Hatcliffe", region: "Harare", lat: -17.735, lng: 31.0 },
  { id: "bulawayo", name: "Bulawayo", region: "Bulawayo", lat: -20.14, lng: 28.58 },
  { id: "mutare", name: "Mutare", region: "Manicaland", lat: -18.97, lng: 32.57 },
  { id: "gweru", name: "Gweru", region: "Midlands", lat: -19.45, lng: 29.82 },
  { id: "kwekwe", name: "Kwekwe", region: "Midlands", lat: -18.93, lng: 29.82 },
  { id: "kadoma", name: "Kadoma", region: "Mashonaland West", lat: -18.33, lng: 29.92 },
  { id: "marondera", name: "Marondera", region: "Mashonaland East", lat: -18.19, lng: 31.55 },
  { id: "chegutu", name: "Chegutu", region: "Mashonaland West", lat: -18.14, lng: 30.14 },
  { id: "bindura", name: "Bindura", region: "Mashonaland Central", lat: -17.3, lng: 31.32 },
  { id: "masvingo", name: "Masvingo", region: "Masvingo", lat: -20.07, lng: 30.83 },
  { id: "chinhoyi", name: "Chinhoyi", region: "Mashonaland West", lat: -17.37, lng: 30.2 },
  { id: "victoria-falls", name: "Victoria Falls", region: "Matabeleland North", lat: -18.26, lng: 25.84 }
];

// National rollout dataset powering the 'Where Fibrehood is building' rollout explorer.
// Represents Fibrehood's deployment footprint across Zimbabwe's major urban centers.
export const NATIONAL_ROLLOUT_REGIONS = [
  {
    id: "harare",
    name: "Harare",
    status: DEPLOYMENT_STATUS.LIVE,
    description:
      "Zimbabwe's capital is our most developed coverage area, with several neighbourhoods live and more under active construction.",
    areas: [
      {
        id: "southview-park",
        name: "Southview Park",
        status: DEPLOYMENT_STATUS.IN_PROGRESS,
        imageSrc: "/images/coverage-aerial.png",
        description: "FTTH network deployment across 3,610 homes. Phased rollout underway.",
        homesInScope: 3610,
        homesConnected: 2158,
      },
      {
        id: "harare-avenues",
        name: "Harare Avenues",
        status: DEPLOYMENT_STATUS.IN_PROGRESS,
        imageSrc: "/images/partners-hero.jpg",
        description: "MDU and residential deployments in key Avenues locations.",
        homesInScope: 1280,
        homesConnected: 860,
      },
      {
        id: "avenues-area",
        name: "Avenues Area",
        status: DEPLOYMENT_STATUS.LIVE,
        description: "Verified live MDU coverage in the Avenues Area.",
        coordinates: [-17.81, 31.04],
        coverageRef: { townId: "harare", suburbId: "avenues", mduId: "avenues-area" },
      },
      {
        id: "tafara-mabvuka",
        name: "Tafara / Mabvuka",
        status: DEPLOYMENT_STATUS.IN_PROGRESS,
        imageSrc: "/images/partners-estate.jpg",
        description: "FTTH rollout for residential areas in Tafara and Mabvuka.",
        homesInScope: 4200,
        homesConnected: 1240,
      },
      {
        id: "tafara-flats",
        name: "Tafara Flats",
        status: DEPLOYMENT_STATUS.LIVE,
        description: "Verified live MDU coverage at Tafara Flats.",
        coordinates: [-17.851, 31.163],
        coverageRef: { townId: "harare", suburbId: "tafara-flats", mduId: "tafara-flats" },
      },
      {
        id: "lifestyle-apartments",
        name: "Lifestyle Apartments",
        status: DEPLOYMENT_STATUS.LIVE,
        description: "Verified live MDU coverage in Glen Lorne.",
        coordinates: [-17.738, 31.12],
        coverageRef: { townId: "harare", suburbId: "glen-lorne", mduId: "lifestyle-apartments" },
      },
      {
        id: "fidelity-southview-park",
        name: "Fidelity Southview Park",
        status: DEPLOYMENT_STATUS.LIVE,
        description: "Verified live MDU coverage in Southview Park.",
        coordinates: [-17.893, 31.08],
        coverageRef: { townId: "harare", suburbId: "southview", mduId: "fidelity-southview-park" },
      },
      {
        id: "mufakose",
        name: "Mufakose",
        status: DEPLOYMENT_STATUS.IN_PROGRESS,
        imageSrc: "/images/community-coverage.jpg",
        description: "Network construction and deployments underway.",
        homesInScope: 3050,
      },
    ],
  },
  {
    id: "bulawayo",
    name: "Bulawayo",
    status: DEPLOYMENT_STATUS.IN_PROGRESS,
    description: "Network construction is underway across Bulawayo's key residential nodes.",
    areas: [
      {
        id: "hillside",
        name: "Hillside",
        status: DEPLOYMENT_STATUS.IN_PROGRESS,
        imageSrc: "/images/img-hero-6.jpg",
        description: "Fibre construction underway across Hillside's residential streets.",
        homesInScope: 1840,
      },
      {
        id: "kumalo",
        name: "Kumalo",
        status: DEPLOYMENT_STATUS.PLANNED,
        description: "Design and permitting in progress ahead of construction.",
      },
      {
        id: "bulawayo-tba",
        name: "Bulawayo TBA",
        status: DEPLOYMENT_STATUS.LIVE,
        description: "Verified live MDU coverage at Bulawayo TBA.",
        coordinates: [-20.14, 28.58],
        coverageRef: { townId: "bulawayo", suburbId: "byo-cbd", mduId: "bulawayo-tba" },
      },
    ],
  },
  {
    id: "gweru",
    name: "Gweru",
    status: DEPLOYMENT_STATUS.IN_PROGRESS,
    description: "Early-stage construction has begun in Gweru's central suburbs.",
    areas: [
      {
        id: "mkoba",
        name: "Mkoba",
        status: DEPLOYMENT_STATUS.IN_PROGRESS,
        imageSrc: "/images/community-coverage.jpg",
        description: "Network build underway across Mkoba's residential sections.",
        homesInScope: 2100,
      },
    ],
  },
  {
    id: "mutare",
    name: "Mutare",
    status: DEPLOYMENT_STATUS.PLANNED,
    description: "Network design is underway ahead of construction in Mutare.",
    areas: [],
  },
  {
    id: "kwekwe",
    name: "Kwekwe",
    status: DEPLOYMENT_STATUS.PLANNED,
    description: "Network design is underway ahead of construction in Kwekwe.",
    areas: [],
  },
  {
    id: "masvingo",
    name: "Masvingo",
    status: DEPLOYMENT_STATUS.PLANNED,
    description: "Network design is underway ahead of construction in Masvingo.",
    areas: [],
  },
  {
    id: "chinhoyi",
    name: "Chinhoyi",
    status: DEPLOYMENT_STATUS.NOT_STARTED,
    description: "Chinhoyi is part of our national rollout plan and will begin in a future phase.",
    areas: [],
  },
  {
    id: "kadoma",
    name: "Kadoma",
    status: DEPLOYMENT_STATUS.NOT_STARTED,
    description: "Kadoma is part of our national rollout plan and will begin in a future phase.",
    areas: [],
  },
  {
    id: "chegutu",
    name: "Chegutu",
    status: DEPLOYMENT_STATUS.NOT_STARTED,
    description: "Chegutu is part of our national rollout plan and will begin in a future phase.",
    areas: [],
  },
  {
    id: "norton",
    name: "Norton",
    status: DEPLOYMENT_STATUS.IN_PROGRESS,
    description: "Network construction is underway, with verified live coverage at selected buildings.",
    areas: [
      {
        id: "norton-galloway-road",
        name: "Norton (Galloway Road)",
        status: DEPLOYMENT_STATUS.LIVE,
        description: "Verified live MDU coverage on Galloway Road.",
        coordinates: [-17.886, 30.697],
        coverageRef: { townId: "norton", suburbId: "norton-galloway", mduId: "norton-galloway-road" },
      },
    ],
  },
  {
    id: "victoria-falls",
    name: "Victoria Falls",
    status: DEPLOYMENT_STATUS.NOT_STARTED,
    description: "Victoria Falls is part of our national rollout plan and will begin in a future phase.",
    areas: [],
  },
  {
    id: "marondera",
    name: "Marondera",
    status: DEPLOYMENT_STATUS.NOT_STARTED,
    description: "Marondera is part of our national rollout plan and will begin in a future phase.",
    areas: [],
  },
  {
    id: "zvishavane",
    name: "Zvishavane",
    status: DEPLOYMENT_STATUS.NOT_STARTED,
    description: "Zvishavane is part of our national rollout plan and will begin in a future phase.",
    areas: [],
  },
  {
    id: "hwange",
    name: "Hwange",
    status: DEPLOYMENT_STATUS.NOT_STARTED,
    description: "Hwange is part of our national rollout plan and will begin in a future phase.",
    areas: [],
  },
];
