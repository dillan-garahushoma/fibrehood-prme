// FibreHood coverage & geocoding fixtures (development data layer).
// Polygons are stored as arrays of [lat, lng] positions (Leaflet convention),
// conceptually GeoJSON-compatible — swap this module for a real GIS/serviceability
// feed without touching the UI or the coverage service contract.
//
// Confirmed FibreHood coverage areas: Southview, Tafara Flats, Norton.

export const COVERAGE_STATUSES = {
  AVAILABLE: "AVAILABLE",
  EXPANDING: "EXPANDING",
  UNAVAILABLE: "UNAVAILABLE"
};

export const COVERAGE_AREAS = [
  {
    id: "southview",
    name: "Southview",
    status: "AVAILABLE",
    center: [-17.893, 31.08],
    polygon: [
      [-17.902, 31.068],
      [-17.9, 31.094],
      [-17.885, 31.092],
      [-17.883, 31.069],
      [-17.893, 31.062]
    ],
    metadata: { region: "Harare", note: "FibreHood Fibre Available" }
  },
  {
    id: "tafara-flats",
    name: "Tafara Flats",
    status: "AVAILABLE",
    center: [-17.851, 31.163],
    polygon: [
      [-17.861, 31.15],
      [-17.859, 31.179],
      [-17.842, 31.177],
      [-17.839, 31.151],
      [-17.852, 31.145]
    ],
    metadata: { region: "Harare", note: "FibreHood Fibre Available" }
  },
  {
    id: "norton",
    name: "Norton",
    status: "AVAILABLE",
    center: [-17.886, 30.697],
    polygon: [
      [-17.906, 30.68],
      [-17.903, 30.72],
      [-17.867, 30.718],
      [-17.869, 30.678],
      [-17.888, 30.672]
    ],
    metadata: { region: "Mashonaland West", note: "FibreHood Fibre Available" }
  }
];

// Local address dataset powering autocomplete + geocoding without an external API.
// Each entry resolves to a precise coordinate used by the coverage engine.
export const ADDRESS_LOCALITIES = [
  { id: "southview", name: "Southview", region: "Harare", lat: -17.893, lng: 31.08 },
  { id: "tafara-flats", name: "Tafara Flats", region: "Harare", lat: -17.851, lng: 31.163 },
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