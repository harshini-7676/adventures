export interface OceanZone {
  id: string;
  name: string;
  tagline: string;
  depth: string;
  pressure: string;
  temperature: string;
  lightLevel: string;
  color: string;
  accent: string;
  description: string;
  facts: string[];
}

export interface MarineCreature {
  id: string;
  name: string;
  tagline: string;
  color: string;
  emissive: string;
  glowColor?: string;
  bioluminescent?: boolean;
  depth: string;
  size: string;
  habitat: string;
  diet: string;
  description: string;
  facts: string[];
}

export interface DeepSeaEnvironment {
  id: string;
  name: string;
  tagline: string;
  color: string;
  color2: string;
  depth: string;
  description: string;
  facts: string[];
}

export const oceanZones: OceanZone[] = [
  {
    id: 'sunlight',
    name: 'Sunlight Zone',
    tagline: 'The sunlit shallows',
    depth: '0 – 200 m',
    pressure: '1 – 20 atm',
    temperature: '12 – 25°C',
    lightLevel: 'Abundant',
    color: '#06b6d4',
    accent: '#67e8f9',
    description:
      'Where sunlight dances through turquoise water and most ocean life thrives. Coral reefs, fish, and marine mammals fill this vibrant, sun-drenched world.',
    facts: [
      'Contains 90% of all marine life',
      'Home to coral reefs — the rainforests of the sea',
      'Photosynthesis powers the entire food web here',
      'Light penetrates up to 200 meters deep',
    ],
  },
  {
    id: 'twilight',
    name: 'Twilight Zone',
    tagline: 'The dimming blue',
    depth: '200 – 1,000 m',
    pressure: '20 – 100 atm',
    temperature: '4 – 12°C',
    lightLevel: 'Fading',
    color: '#0e7490',
    accent: '#22d3ee',
    description:
      'A realm of perpetual blue gloom where the last traces of sunlight fade. Strange creatures begin their daily migrations — the largest on Earth.',
    facts: [
      'Hosts the largest animal migration on Earth — every night',
      'Bioluminescence begins to appear here',
      'Home to the mysterious giant squid',
      'Only 0.1% of surface light reaches this depth',
    ],
  },
  {
    id: 'midnight',
    name: 'Midnight Zone',
    tagline: 'The eternal dark',
    depth: '1,000 – 4,000 m',
    pressure: '100 – 400 atm',
    temperature: '2 – 4°C',
    lightLevel: 'None',
    color: '#164e63',
    accent: '#14b8a6',
    description:
      'Pitch-black, freezing, and crushing. The only light here is made by living creatures themselves. A world of shadows and living lanterns.',
    facts: [
      'Over 90% of animals here use bioluminescence',
      'No sunlight penetrates this zone at all',
      'Pressure reaches 400 atmospheres',
      'The sperm whale dives here to hunt giant squid',
    ],
  },
  {
    id: 'abyss',
    name: 'The Abyss',
    tagline: 'The crushing void',
    depth: '4,000 – 6,000 m',
    pressure: '400 – 600 atm',
    temperature: '1 – 2°C',
    lightLevel: 'None',
    color: '#082f49',
    accent: '#34d399',
    description:
      'A vast, near-freezing plain of total darkness. The seafloor stretches endlessly, dotted with alien life adapted to survive where no sunlight has ever reached.',
    facts: [
      'Covers 83% of the ocean floor',
      'Named after the Greek word for "bottomless"',
      'Creatures here survive on marine snow falling from above',
      'More people have been to the Moon than the abyss',
    ],
  },
  {
    id: 'hadal',
    name: 'Hadal Zone',
    tagline: 'The deepest trenches',
    depth: '6,000 – 11,000 m',
    pressure: '600 – 1,100 atm',
    temperature: '1 – 4°C',
    lightLevel: 'None',
    color: '#0c4a6e',
    accent: '#a7f3d0',
    description:
      'The deepest places on Earth — ocean trenches plunging miles below the seafloor. Named for Hades, these are the most extreme environments life has ever conquered.',
    facts: [
      'The Mariana Trench reaches 10,935 m deep',
      'Pressure is 1,100x that of the surface',
      'Named after Hades, Greek god of the underworld',
      'Snailfish survive here at 8,000 m — the deepest fish ever found',
    ],
  },
];

export const marineCreatures: MarineCreature[] = [
  {
    id: 'whale-shark',
    name: 'Whale Shark',
    tagline: 'Gentle giant of the shallows',
    color: '#06b6d4',
    emissive: '#0e7490',
    depth: '0 – 200 m',
    size: 'Up to 18 m',
    habitat: 'Sunlight Zone',
    diet: 'Plankton & small fish',
    description:
      'The largest fish in the ocean — a peaceful filter feeder that glides through warm waters with a mouth wide enough to swallow a small car.',
    facts: [
      'The largest fish on Earth — up to 18 meters long',
      'Each shark has a unique spot pattern, like a fingerprint',
      'Can filter 6,000 liters of water per hour',
      'Lives up to 70 years',
    ],
  },
  {
    id: 'jellyfish',
    name: 'Bioluminescent Jellyfish',
    tagline: 'Living lanterns of the deep',
    color: '#a7f3d0',
    emissive: '#34d399',
    glowColor: '#34d399',
    bioluminescent: true,
    depth: '500 – 2,000 m',
    size: '2 – 40 cm',
    habitat: 'Twilight & Midnight Zones',
    diet: 'Small crustaceans',
    description:
      'Delicate, translucent creatures that pulse through the dark, emitting their own ghostly light. Some can flash to startle predators or lure prey.',
    facts: [
      'Over 50% of jellyfish are bioluminescent',
      'They have no brain, heart, or bones',
      'Some can glow continuously for hours',
      'The comb jelly refracts light into rainbow displays',
    ],
  },
  {
    id: 'anglerfish',
    name: 'Anglerfish',
    tagline: 'The deep-sea hunter',
    color: '#0c4a6e',
    emissive: '#34d399',
    glowColor: '#34d399',
    bioluminescent: true,
    depth: '1,000 – 4,000 m',
    size: '5 – 60 cm',
    habitat: 'Midnight Zone',
    diet: 'Fish & crustaceans',
    description:
      'A nightmare of the deep with a glowing lure dangling from its head. In the eternal dark, its bioluminescent bait draws curious prey into its enormous jaws.',
    facts: [
      'Uses a glowing lure filled with bioluminescent bacteria',
      'Females can be 60x larger than males',
      'Males fuse permanently to females as parasites',
      'Can swallow prey twice its own size',
    ],
  },
  {
    id: 'giant-squid',
    name: 'Giant Squid',
    tagline: 'The kraken revealed',
    color: '#0e7490',
    emissive: '#155e75',
    depth: '300 – 1,000 m',
    size: 'Up to 13 m',
    habitat: 'Twilight Zone',
    diet: 'Deep-sea fish & squid',
    description:
      'A legendary creature of the deep that eluded humanity for centuries. With eyes the size of dinner plates, it hunts in the gloom of the twilight zone.',
    facts: [
      'Has the largest eyes of any animal — 27 cm across',
      'Can reach 13 meters in length',
      'Battles with sperm whales leave sucker scars',
      'Was only first filmed alive in 2012',
    ],
  },
  {
    id: 'vampire-squid',
    name: 'Vampire Squid',
    tagline: 'The phantom of the dark',
    color: '#7c3aed',
    emissive: '#5b21b6',
    glowColor: '#a7f3d0',
    bioluminescent: true,
    depth: '600 – 1,200 m',
    size: '15 – 30 cm',
    habitat: 'Midnight Zone',
    diet: 'Marine snow (detritus)',
    description:
      'Neither vampire nor true squid, this ancient survivor drifts through the oxygen-minimum zone, cloaking itself in a web of arms when threatened.',
    facts: [
      'Not a squid — it belongs to its own ancient order',
      'Eats "marine snow" — falling detritus, not prey',
      'Can eject a cloud of glowing mucus instead of ink',
      'Turns itself inside-out to appear threatening',
    ],
  },
  {
    id: 'snailfish',
    name: 'Mariana Snailfish',
    tagline: 'The deepest survivor',
    color: '#fda4af',
    emissive: '#fb7185',
    glowColor: '#fda4af',
    bioluminescent: false,
    depth: '6,000 – 8,000 m',
    size: '20 – 30 cm',
    habitat: 'Hadal Zone',
    diet: 'Crustaceans & worms',
    description:
      'The deepest-living fish ever discovered, thriving under pressures that would crush bone. Its gelatinous body is perfectly adapted to the crushing depths.',
    facts: [
      'The deepest fish ever filmed — at 8,178 m',
      'Its body is mostly gelatin, not bone',
      'Has no scales — translucent and pinkish',
      'Can withstand 800 atmospheres of pressure',
    ],
  },
];

export const deepSeaEnvironments: DeepSeaEnvironment[] = [
  {
    id: 'hydrothermal',
    name: 'Hydrothermal Vents',
    tagline: 'Chimneys of the deep',
    color: '#fb7185',
    color2: '#fbbf24',
    depth: '2,000 – 6,000 m',
    description:
      'Mineral-rich chimneys spewing superheated water from the ocean floor. Entire ecosystems thrive here on chemical energy — no sunlight required.',
    facts: [
      'Water erupts at 400°C but does not boil under pressure',
      'Tube worms grow 3 meters long with no mouth or gut',
      'Ecosystems run on chemosynthesis, not photosynthesis',
      'May resemble where life on Earth first began',
    ],
  },
  {
    id: 'whale-fall',
    name: 'Whale Fall',
    tagline: 'A feast from the deep',
    color: '#34d399',
    color2: '#06b6d4',
    depth: '1,000 – 4,000 m',
    description:
      'When a whale dies and sinks, it creates a temporary ecosystem that can sustain deep-sea life for decades. A gift of life from the shallows to the abyss.',
    facts: [
      'A single whale fall can feed life for 50 years',
      'Supports over 40,000 creatures at a time',
      'Some species live only on whale falls',
      'Passes through 4 distinct ecological stages',
    ],
  },
  {
    id: 'seamount',
    name: 'Deep-Sea Coral Gardens',
    tagline: 'Oases of the abyss',
    color: '#a78bfa',
    color2: '#22d3ee',
    depth: '200 – 6,000 m',
    description:
      'Ancient coral forests growing in total darkness, some over 4,000 years old. These slow-motion gardens are among the oldest living things on Earth.',
    facts: [
      'Some corals are over 4,000 years old',
      'No sunlight — they capture food from currents',
      'Can form reefs miles across',
      'Grow less than 1 mm per year',
    ],
  },
];

export const oceanJourneySteps = [
  { label: 'Surface', ref: 'ocean-surface' },
  { label: 'Sunlight', ref: 'sunlight' },
  { label: 'Twilight', ref: 'twilight' },
  { label: 'Midnight', ref: 'midnight' },
  { label: 'Abyss', ref: 'abyss' },
  { label: 'Hadal', ref: 'hadal' },
  { label: 'Creatures', ref: 'creatures' },
  { label: 'Ecosystems', ref: 'ecosystems' },
  { label: 'Deepest', ref: 'ocean-deepest' },
];
