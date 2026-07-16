export interface PlanetData {
  id: string;
  name: string;
  tagline: string;
  color: string;
  emissive: string;
  size: number;
  ringColor?: string;
  hasRing?: boolean;
  facts: string[];
  distance: string;
  diameter: string;
  moons: string;
  dayLength: string;
  description: string;
}

export interface NebulaData {
  id: string;
  name: string;
  tagline: string;
  color: string;
  color2: string;
  facts: string[];
  description: string;
  distance: string;
}

export const planets: PlanetData[] = [
  {
    id: 'earth',
    name: 'Earth',
    tagline: 'Our pale blue dot',
    color: '#2563eb',
    emissive: '#1e40af',
    size: 1.0,
    distance: '0 km',
    diameter: '12,742 km',
    moons: '1',
    dayLength: '24 hours',
    facts: [
      'The only known planet harboring life',
      '71% of its surface is covered by water',
      'Atmosphere is 78% nitrogen, 21% oxygen',
      'Travels through space at 107,000 km/h',
    ],
    description:
      'The only place in the universe confirmed to host life. A fragile oasis of water, air, and warmth suspended in the void.',
  },
  {
    id: 'mars',
    name: 'Mars',
    tagline: 'The red frontier',
    color: '#dc2626',
    emissive: '#7f1d1d',
    size: 0.7,
    distance: '225M km',
    diameter: '6,779 km',
    moons: '2',
    dayLength: '24h 37min',
    facts: [
      'Home to Olympus Mons, the tallest volcano in the solar system',
      'A day on Mars is called a "sol"',
      'Its red color comes from iron oxide (rust)',
      'Has polar ice caps made of water and dry ice',
    ],
    description:
      'A cold desert world that captures our imagination as the next frontier for human exploration. Rust-colored and windswept.',
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    tagline: 'King of planets',
    color: '#d97706',
    emissive: '#92400e',
    size: 1.8,
    distance: '778M km',
    diameter: '139,820 km',
    moons: '95',
    dayLength: '9h 56min',
    facts: [
      'The Great Red Spot is a storm larger than Earth',
      'Could fit 1,300 Earths inside it',
      'Has the shortest day of all planets',
      'Its moon Ganymede is bigger than Mercury',
    ],
    description:
      'A colossal gas giant whose storms have raged for centuries. Its gravity shepherds the inner planets and shields them from asteroids.',
  },
  {
    id: 'saturn',
    name: 'Saturn',
    tagline: 'The jeweled giant',
    color: '#eab308',
    emissive: '#a16207',
    size: 1.6,
    hasRing: true,
    ringColor: '#fbbf24',
    distance: '1.4B km',
    diameter: '116,460 km',
    moons: '146',
    dayLength: '10h 33min',
    facts: [
      'Its rings span 280,000 km but are only 10m thick',
      'So light it would float in water',
      'Winds at its equator reach 1,800 km/h',
      'Has hexagonal storm at its north pole',
    ],
    description:
      'The crown jewel of our solar system, encircled by dazzling rings of ice and rock. A sight of breathtaking, otherworldly beauty.',
  },
  {
    id: 'neptune',
    name: 'Neptune',
    tagline: 'The wind-swept abyss',
    color: '#1d4ed8',
    emissive: '#1e3a8a',
    size: 1.2,
    distance: '4.5B km',
    diameter: '49,244 km',
    moons: '16',
    dayLength: '16h 6min',
    facts: [
      'Has the strongest winds in the solar system (2,100 km/h)',
      'Discovered through mathematical prediction',
      'One year equals 165 Earth years',
      'Its moon Triton orbits backwards',
    ],
    description:
      'The farthest planet from the Sun — a deep blue ice giant whipped by supersonic winds. Cold, dark, and profoundly remote.',
  },
];

export const nebulae: NebulaData[] = [
  {
    id: 'orion',
    name: 'Orion Nebula',
    tagline: 'A stellar nursery',
    color: '#fb7185',
    color2: '#fbbf24',
    distance: '1,344 light-years',
    facts: [
      'Visible to the naked eye in Orion\'s sword',
      'Over 700 stars are forming within it',
      'Spans 24 light-years across',
      'One of the closest star-forming regions to Earth',
    ],
    description:
      'A glowing cloud of gas and dust where new stars are being born. A cosmic cradle illuminating the night sky.',
  },
  {
    id: 'pillars',
    name: 'Pillars of Creation',
    tagline: 'Where stars are born',
    color: '#22d3ee',
    color2: '#a78bfa',
    distance: '6,500 light-years',
    facts: [
      'Giant columns of cold hydrogen gas and dust',
      'Located in the Eagle Nebula (M16)',
      'Each pillar is several light-years tall',
      'Captured famously by the Hubble Telescope',
    ],
    description:
      'Towering columns of cosmic dust where new stars ignite. A cathedral of creation, sculpted by stellar winds.',
  },
  {
    id: 'crab',
    name: 'Crab Nebula',
    tagline: 'A supernova remnant',
    color: '#2dd4bf',
    color2: '#3b82f6',
    distance: '6,500 light-years',
    facts: [
      'Born from a supernova witnessed in 1054 AD',
      'Contains a rapidly spinning neutron star',
      'Expands at 1,500 km per second',
      'Glows across the entire electromagnetic spectrum',
    ],
    description:
      'The glowing remains of a star that exploded nearly a millennium ago. At its heart spins a pulsar, a beacon of dead starlight.',
  },
];

export const journeySteps = [
  { label: 'Earth', ref: 'earth' },
  { label: 'Mars', ref: 'mars' },
  { label: 'Jupiter', ref: 'jupiter' },
  { label: 'Saturn', ref: 'saturn' },
  { label: 'Neptune', ref: 'neptune' },
  { label: 'Nebulae', ref: 'nebulae' },
  { label: 'Deep Space', ref: 'deep-space' },
];
