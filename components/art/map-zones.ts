// Where each neighborhood zone and park sits on the hand-drawn trail map (1000×640).
// Adding a neighborhood or park in content/service-area.ts needs a matching entry here (tests check it).

/** Map shape and label point for each neighborhood ID. A test checks every neighborhood has one. */
export const ZONES: Record<string, { d: string; label: [number, number] }> = {
  'mansion-hill': { d: 'M110 178C160 166 210 156 252 154l36 92-58 82c-40-6-80-18-112-30z', label: [182, 268] },
  'tenney-lapham': { d: 'M262 152c70-8 140-16 206-20l50 76-40 110-176-18-30-60z', label: [384, 270] },
  'maple-bluff': { d: 'M440 44c70-6 140-10 200-12l22 78-142 20-48-4z', label: [548, 82] },
  'marquette': { d: 'M302 308l178 16 78 56-36 90-140-30z', label: [430, 392] },
  'williamson': { d: 'M232 336l66-28 82 132-48 78c-44-20-86-42-122-66z', label: [300, 424] },
  'emerson-east': { d: 'M546 204l154-30 40 146-138 40-56-62z', label: [640, 262] },
  'eken-park': { d: 'M662 108l136-16 22 108-112-26z', label: [742, 150] },
  'sherman': { d: 'M806 42l156-10 8 188-136-4-24-124z', label: [888, 206] },
  'schenk-atwood': { d: 'M572 392l174-60 136 68-22 140-216 20-80-90z', label: [726, 464] },
};

/** Park blob centre and radius on the map, by park ID. */
export const PARK_POINT: Record<string, [number, number, number]> = {
  'tenney-park': [500, 150, 34],
  'james-madison-park': [196, 196, 26],
  'orton-park': [338, 452, 24],
  'burr-jones-field': [636, 336, 26],
  'warner-park': [884, 108, 32],
  'olbrich-park': [790, 548, 30],
};
