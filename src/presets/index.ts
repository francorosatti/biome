import type { SimParams } from '../sim/types';

export interface Preset {
  key: string;
  name: string;
  description: string;
  params: SimParams;
}

const baseEnvironment = {
  worldWidth: 800,
  worldHeight: 600,
  grassMaxAmount: 100,
  dayLength: 30,
};

// Shared stat ranges, tuned so wolves can sustain themselves against rabbits
// (wolves need a real speed/hunting edge, and rabbits can't be so fearful
// that wolves never get close enough to catch anything).
const rabbitStats = {
  speed: [1.2, 2.2] as [number, number],
  vision: [30, 50] as [number, number],
  metabolism: [0.15, 0.3] as [number, number],
  reproThreshold: [40, 60] as [number, number],
  reproRate: [0.15, 0.3] as [number, number],
  fear: [0.3, 0.6] as [number, number],
};

const wolfStats = {
  speed: [1.8, 2.8] as [number, number],
  vision: [40, 70] as [number, number],
  metabolism: [0.15, 0.3] as [number, number],
  reproThreshold: [80, 110] as [number, number],
  reproRate: [0.04, 0.1] as [number, number],
  huntingSuccess: [0.3, 0.5] as [number, number],
};

export const PRESETS: Record<string, Preset> = {
  balanced: {
    key: 'balanced',
    name: 'Balanced',
    description: 'A relatively stable ecosystem, tuned for oscillating predator-prey cycles.',
    params: {
      environment: { ...baseEnvironment, initialGrassCoverage: 0.6, grassRegenRate: 0.4 },
      rabbit: { count: 100, maxPopulation: 500, ...rabbitStats },
      wolf: { count: 15, maxPopulation: 120, ...wolfStats },
    },
  },
  rabbitParadise: {
    key: 'rabbitParadise',
    name: 'Rabbit Paradise',
    description: 'Many rabbits, abundant grass, few wolves.',
    params: {
      environment: { ...baseEnvironment, initialGrassCoverage: 0.85, grassRegenRate: 0.6 },
      rabbit: { count: 150, maxPopulation: 600, ...rabbitStats, reproRate: [0.2, 0.35] },
      wolf: { count: 4, maxPopulation: 120, ...wolfStats },
    },
  },
  wolfWorld: {
    key: 'wolfWorld',
    name: 'Wolf World',
    description: 'Many wolves and scarce rabbits.',
    params: {
      environment: { ...baseEnvironment, initialGrassCoverage: 0.6, grassRegenRate: 0.4 },
      rabbit: { count: 60, maxPopulation: 500, ...rabbitStats },
      wolf: {
        count: 40,
        maxPopulation: 150,
        ...wolfStats,
        reproRate: [0.06, 0.14],
        huntingSuccess: [0.4, 0.65],
      },
    },
  },
  foodScarcity: {
    key: 'foodScarcity',
    name: 'Food Scarcity',
    description: 'Limited grass regeneration.',
    params: {
      environment: { ...baseEnvironment, initialGrassCoverage: 0.3, grassRegenRate: 0.1 },
      rabbit: { count: 80, maxPopulation: 500, ...rabbitStats },
      wolf: { count: 12, maxPopulation: 120, ...wolfStats },
    },
  },
  emptyWorld: {
    key: 'emptyWorld',
    name: 'Empty World',
    description: 'Very little initial life, for sandbox experimentation.',
    params: {
      environment: { ...baseEnvironment, initialGrassCoverage: 0.5, grassRegenRate: 0.3 },
      rabbit: { count: 5, maxPopulation: 500, ...rabbitStats },
      wolf: { count: 1, maxPopulation: 120, ...wolfStats },
    },
  },
};

export const DEFAULT_PRESET_KEY = 'balanced';
