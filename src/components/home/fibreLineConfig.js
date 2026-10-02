// Coordinates are authored in the native 1376 × 768 hero photograph. The
// component uses xMaxYMid slice, matching the background image's object-cover
// + object-right treatment at every viewport.
export const HERO_PHOTO = { width: 1376, height: 768 };

export const FIBRE_TONES = {
  gold: { core: "#FFCE32", bright: "#FFF0BE", glow: "#EAA900", packet: "#FFE398" },
  cyan: { core: "#A4F8F4", bright: "#E9FFFC", glow: "#36DDE5", packet: "#B8FBF6" },
};

// Three principal paths establish the composition. Secondary paths are more
// reserved; accent fragments never compete with the primary gold trajectory.
export const FIBRE_LINES = [
  {
    id: "primary-gold-upper",
    group: "primary-gold",
    tone: "gold",
    depth: "background",
    path: "M 700 430 C 778 381 850 352 918 351 C 981 350 1034 375 1078 410 C 1120 441 1157 481 1194 512",
    range: [700, 1194], coreWidth: 2.1, haloWidth: 7.2, haloOpacity: 0.42,
    delay: 0, packet: { duration: 8.2, phase: 2.5 },
  },
  {
    id: "primary-cyan-upper",
    group: "primary-cyan",
    tone: "cyan",
    depth: "background",
    path: "M 742 396 C 816 359 882 341 941 352 C 999 363 1040 382 1089 416 C 1128 445 1156 480 1181 512",
    range: [742, 1181], coreWidth: 1.3, haloWidth: 4.8, haloOpacity: 0.34,
    delay: 0.92,
  },
  {
    id: "primary-gold-lower",
    group: "primary-gold",
    tone: "gold",
    depth: "midground",
    path: "M 730 473 C 790 492 838 543 906 561 C 976 579 1048 560 1106 530 C 1165 500 1225 510 1278 540 C 1321 562 1353 545 1376 518",
    range: [730, 1376], coreWidth: 1.9, haloWidth: 6.8, haloOpacity: 0.37,
    delay: 1.78, packet: { duration: 7.4, phase: 4.8 },
  },
  {
    id: "secondary-cyan-central",
    group: "secondary-cyan",
    tone: "cyan",
    depth: "midground",
    path: "M 838 389 C 900 360 952 340 1005 352 C 1060 363 1096 400 1150 430 C 1209 461 1254 455 1290 429 C 1325 403 1351 390 1376 398",
    range: [838, 1376], coreWidth: 1.08, haloWidth: 4.1, haloOpacity: 0.26,
    delay: 2.62, packet: { duration: 8.8, phase: 3.7 },
  },
  {
    id: "secondary-gold-couch",
    group: "secondary-gold",
    tone: "gold",
    depth: "background",
    path: "M 760 455 C 824 430 874 416 921 425 C 978 438 1022 455 1080 470 C 1140 486 1186 477 1220 458 C 1271 429 1324 424 1376 442",
    range: [760, 1376], coreWidth: 1.05, haloWidth: 4, haloOpacity: 0.24,
    delay: 3.32,
  },
  {
    id: "secondary-cyan-low",
    group: "secondary-cyan",
    tone: "cyan",
    depth: "foreground",
    path: "M 948 548 C 984 548 1010 553 1038 563 C 1085 580 1131 579 1174 566 C 1215 554 1247 568 1280 585 C 1322 603 1354 580 1376 550",
    range: [948, 1376], coreWidth: 0.9, haloWidth: 3.4, haloOpacity: 0.21,
    delay: 4.1,
  },
  {
    id: "accent-cyan-laptop",
    group: "accent-cyan",
    tone: "cyan",
    depth: "foreground",
    path: "M 1173 487 C 1202 474 1230 468 1256 477 C 1278 485 1291 499 1304 512",
    range: [1173, 1304], coreWidth: 0.64, haloWidth: 2.2, haloOpacity: 0.14,
    delay: 4.72,
  },
];

// These are not rendered photo layers. They are only black regions in the
// fibre mask, hand-traced around the real hair/head/shoulder silhouettes.
export const FIBRE_OCCLUSION_PATHS = [
  "M 804 493 C 809 429 836 379 875 353 C 861 314 868 270 903 248 C 945 221 987 241 1003 276 C 1018 312 1001 344 979 363 C 1010 387 1039 428 1055 488 L 1055 525 C 996 510 933 508 885 520 C 852 518 825 510 804 493 Z",
  "M 978 502 C 984 458 990 416 1001 383 C 998 355 1018 339 1045 339 C 1076 340 1095 363 1097 394 C 1111 432 1117 472 1110 507 Z",
  "M 1088 507 C 1096 441 1100 383 1116 348 C 1105 305 1120 270 1152 252 C 1188 244 1216 269 1222 303 C 1243 339 1262 375 1283 417 L 1305 506 C 1240 516 1160 518 1088 507 Z",
  // Laptop: selected paths enter this zone, disappear with the same subtle
  // mask transition as a subject occluder, and emerge on its right edge.
  "M 1012 452 L 1205 452 C 1212 454 1215 460 1214 467 L 1196 571 L 1002 571 C 996 569 994 563 996 556 Z",
];

export const FIBRE_NODES = [
  { id: "upper-rise", x: 824, y: 362, tone: "gold", radius: 2.2, delay: 0.62 },
  { id: "upper-drop", x: 1078, y: 429, tone: "gold", radius: 2.5, delay: 1.08 },
  { id: "couch-turn", x: 905, y: 560, tone: "gold", radius: 2.2, delay: 2.54 },
  { id: "central-turn", x: 1249, y: 456, tone: "cyan", radius: 2.1, delay: 3.88 },
  { id: "right-low", x: 1322, y: 561, tone: "gold", radius: 1.9, delay: 4.46 },
];
