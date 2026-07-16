export interface EarthLayer {
  id: string;
  name: string;
  tagline: string;
  depth: string;
  temperature: string;
  pressure: string;
  composition: string;
  color: string;
  accent: string;
  description: string;
  facts: string[];
}

export interface GeologicalFeature {
  id: string;
  name: string;
  tagline: string;
  color: string;
  emissive: string;
  glowColor?: string;
  glowing?: boolean;
  depth: string;
  composition: string;
  formation: string;
  description: string;
  facts: string[];
}

export interface DeepEarthPhenomenon {
  id: string;
  name: string;
  tagline: string;
  color: string;
  color2: string;
  depth: string;
  description: string;
  facts: string[];
}

export const earthLayers: EarthLayer[] = [
  {
    id: 'crust',
    name: 'Crust & Caves',
    tagline: 'The thin outer shell',
    depth: '0 – 70 km',
    temperature: '15 – 400°C',
    pressure: '1 – 2,000 atm',
    composition: 'Basalt & granite',
    color: '#78350f',
    accent: '#fbbf24',
    description:
      'The brittle outer skin of Earth where we live, where caves hide ancient secrets and underground rivers carve hidden worlds through solid rock.',
    facts: [
      'Thinner relative to Earth than an apple skin is to an apple',
      'Home to the deepest cave on Earth: Krubera, at 2,199 m deep',
      'Continental crust is granite; oceanic crust is denser basalt',
      'Contains all known life and every cave ever explored',
    ],
  },
  {
    id: 'upper-mantle',
    name: 'Upper Mantle',
    tagline: 'The flowing layer',
    depth: '70 – 700 km',
    temperature: '500 – 1,500°C',
    pressure: '2,000 – 500,000 atm',
    composition: 'Olivine & pyroxene',
    color: '#9a3412',
    accent: '#f97316',
    description:
      'A layer of hot, slowly flowing rock where convection currents drive the motion of tectonic plates. Solid, yet creeping like honey over geological time.',
    facts: [
      'Rock here flows at rates of centimeters per year',
      'Drives the movement of all tectonic plates',
      'Makes up 84% of Earth\'s total volume',
      'The transition zone holds vast oceans of water locked in minerals',
    ],
  },
  {
    id: 'lower-mantle',
    name: 'Lower Mantle',
    tagline: 'The crushing deep',
    depth: '700 – 2,890 km',
    temperature: '1,500 – 4,000°C',
    pressure: '500,000 – 1.3M atm',
    composition: 'Bridgmanite',
    color: '#7c2d12',
    accent: '#dc2626',
    description:
      'A vast zone of extreme pressure where rock is compressed into exotic mineral forms. The largest layer of Earth, shrouded in heat and unimaginable force.',
    facts: [
      'Bridgmanite is the most abundant mineral in Earth',
      'Pressures reach 1.3 million atmospheres',
      'Seismic waves reveal mysterious "blobs" of dense rock',
      'Temperatures hot enough to melt steel',
    ],
  },
  {
    id: 'outer-core',
    name: 'Outer Core',
    tagline: 'The liquid metal ocean',
    depth: '2,890 – 5,150 km',
    temperature: '4,000 – 5,400°C',
    pressure: '1.3M – 3.3M atm',
    composition: 'Liquid iron & nickel',
    color: '#dc2626',
    accent: '#f97316',
    description:
      'A vast ocean of swirling liquid iron and nickel. Its churning motion generates the magnetic field that shields all life on Earth from solar radiation.',
    facts: [
      'Generates Earth\'s entire magnetic field',
      'As hot as the surface of the Sun',
      'Liquid metal flows at speeds up to 50 km/year',
      'Without it, solar wind would strip away our atmosphere',
    ],
  },
  {
    id: 'inner-core',
    name: 'Inner Core',
    tagline: 'The heart of the world',
    depth: '5,150 – 6,371 km',
    temperature: '5,400 – 6,000°C',
    pressure: '3.3M – 3.6M atm',
    composition: 'Solid iron-nickel alloy',
    color: '#fbbf24',
    accent: '#fef3c7',
    description:
      'A solid sphere of iron and nickel at the very center of Earth. Hotter than the surface of the Sun, yet held solid by pressure 3.6 million times that of the atmosphere.',
    facts: [
      'Hotter than the surface of the Sun yet completely solid',
      'Spins slightly faster than the rest of Earth',
      'About 70% the size of the Moon',
      'Pressure is 3.6 million times sea-level atmosphere',
    ],
  },
];

export const geologicalFeatures: GeologicalFeature[] = [
  {
    id: 'crystal-cave',
    name: 'Crystal Caves',
    tagline: 'Cathedrals of stone',
    color: '#a5f3fc',
    emissive: '#22d3ee',
    glowColor: '#67e8f9',
    glowing: true,
    depth: '300 m',
    composition: 'Selenite gypsum',
    formation: 'Hydrothermal crystallization over 500,000 years',
    description:
      'Vast underground chambers filled with crystals the size of trees. In Mexico\'s Naica Mine, selenite beams up to 11 meters long gleam in 58°C heat.',
    facts: [
      'Naica crystals are among the largest ever found — up to 11 m',
      'They grew undisturbed for over 500,000 years',
      'Cave temperature is 58°C with 99% humidity',
      'Crystals formed from mineral-rich groundwater',
    ],
  },
  {
    id: 'underground-river',
    name: 'Underground Rivers',
    tagline: 'Hidden waterways',
    color: '#0e7490',
    emissive: '#06b6d4',
    glowColor: '#67e8f9',
    depth: '50 – 1,000 m',
    composition: 'Limestone karst channels',
    formation: 'Water erosion over millions of years',
    description:
      'Rivers that flow through darkness, carving vast cave systems through soluble rock. The longest known underground river runs for over 10 km beneath the earth.',
    facts: [
      'The Sac Actun system is 348 km of underwater caves',
      'Some underground rivers emerge as massive springs',
      'They carve entire cave systems over millions of years',
      'Host unique blind, pigmentless cave species',
    ],
  },
  {
    id: 'magma-chamber',
    name: 'Magma Chambers',
    tagline: 'Molten reservoirs',
    color: '#dc2626',
    emissive: '#7c2d12',
    glowColor: '#f97316',
    glowing: true,
    depth: '5 – 50 km',
    composition: 'Silicate melt with dissolved gases',
    formation: 'Partial melting of mantle and crustal rock',
    description:
      'Vast underground reservoirs of molten rock that feed volcanoes. When pressure builds, they erupt — reshaping the surface in hours what tectonics take millennia to do.',
    facts: [
      'Chambers can be kilometers across',
      'Magma can sit dormant for centuries before erupting',
      'Yellowstone\'s chamber is 80 km long and 50 km wide',
      'They grow as new magma rises from the mantle',
    ],
  },
  {
    id: 'volcano',
    name: 'Volcanoes',
    tagline: 'Earth\'s pressure valves',
    color: '#f97316',
    emissive: '#dc2626',
    glowColor: '#fbbf24',
    glowing: true,
    depth: '0 – 200 km',
    composition: 'Lava, ash, and volcanic gases',
    formation: 'Magma rising through crustal weaknesses',
    description:
      'Where Earth\'s internal heat breaks through the surface. Volcanoes build continents, fertilize soil, and occasionally reshape the planet in cataclysmic eruptions.',
    facts: [
      'There are about 1,500 active volcanoes on land',
      'The Ring of Fire holds 75% of Earth\'s volcanoes',
      'Lava can exceed 1,200°C',
      'They created much of Earth\'s atmosphere',
    ],
  },
  {
    id: 'mantle-plume',
    name: 'Mantle Plumes',
    tagline: 'Pillars of fire',
    color: '#fbbf24',
    emissive: '#9a3412',
    glowColor: '#f97316',
    glowing: true,
    depth: '2,890 km',
    composition: 'Hot rising mantle material',
    formation: 'Thermal instability at the core-mantle boundary',
    description:
      'Rising columns of superheated rock that create volcanic hotspots far from plate boundaries. They built Hawaii, Iceland, and Yellowstone — burning through plates from below.',
    facts: [
      'They stay fixed while plates slide over them',
      'Created the Hawaiian island chain over millions of years',
      'Yellowstone sits atop a massive mantle plume',
      'They rise from the very bottom of the mantle',
    ],
  },
  {
    id: 'geode',
    name: 'Geodes',
    tagline: 'Nature\'s treasure chests',
    color: '#a78bfa',
    emissive: '#7c3aed',
    glowColor: '#c4b5fd',
    glowing: true,
    depth: '10 – 300 m',
    composition: 'Quartz, amethyst, calcite',
    formation: 'Gas bubbles in volcanic rock filled by minerals',
    description:
      'Hollow rocks lined with glittering crystals, formed when mineral-rich water fills volcanic gas bubbles over thousands of years. Plain on the outside, radiant within.',
    facts: [
      'Some geodes are large enough to stand inside',
      'They form in volcanic gas bubbles or sedimentary cavities',
      'Crystal colors depend on trace minerals present',
      'The largest geode is 8 meters long in Spain',
    ],
  },
];

export const deepEarthPhenomena: DeepEarthPhenomenon[] = [
  {
    id: 'convection',
    name: 'Mantle Convection',
    tagline: 'The engine of continents',
    color: '#f97316',
    color2: '#dc2626',
    depth: '70 – 2,890 km',
    description:
      'Slow, churning currents of hot rock that drive the motion of tectonic plates. This invisible engine builds mountains, opens oceans, and reshapes the face of the planet.',
    facts: [
      'Moves tectonic plates at 2–10 cm per year',
      'A single convection cycle takes 200 million years',
      'Drives seafloor spreading and continental drift',
      'Heat from Earth\'s core powers the entire system',
    ],
  },
  {
    id: 'dynamo',
    name: 'Geodynamo',
    tagline: 'The magnetic shield',
    color: '#fbbf24',
    color2: '#f97316',
    depth: '2,890 – 5,150 km',
    description:
      'The swirling motion of liquid iron in the outer core that generates Earth\'s magnetic field. This invisible shield deflects solar wind and protects all life from radiation.',
    facts: [
      'Generates a field that extends 60,000 km into space',
      'The magnetic poles flip every 200,000–300,000 years',
      'Without it, solar wind would strip our atmosphere',
      'Powered by heat escaping the inner core',
    ],
  },
  {
    id: 'gutenberg',
    name: 'Gutenberg Discontinuity',
    tagline: 'The boundary of worlds',
    color: '#dc2626',
    color2: '#fbbf24',
    depth: '2,890 km',
    description:
      'The sharp boundary where solid mantle meets liquid outer core. Seismic waves abruptly change speed here, marking the transition from rock to an ocean of molten metal.',
    facts: [
      'Named after Beno Gutenberg, who identified it in 1914',
      'Seismic S-waves cannot pass through this boundary',
      'Marks the transition from solid rock to liquid metal',
      'The density jump here is larger than at Earth\'s surface',
    ],
  },
];

export const earthJourneySteps = [
  { label: 'Surface', ref: 'earth-surface' },
  { label: 'Crust', ref: 'crust' },
  { label: 'Upper Mantle', ref: 'upper-mantle' },
  { label: 'Lower Mantle', ref: 'lower-mantle' },
  { label: 'Outer Core', ref: 'outer-core' },
  { label: 'Inner Core', ref: 'inner-core' },
  { label: 'Discoveries', ref: 'discoveries' },
  { label: 'Phenomena', ref: 'phenomena' },
  { label: 'Earth\'s Heart', ref: 'earth-heart' },
];
