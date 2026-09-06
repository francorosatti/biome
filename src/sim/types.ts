export type Species = 'rabbit' | 'wolf';

export type AnimalStatus =
  | 'wandering'
  | 'seeking'
  | 'fleeing'
  | 'eating'
  | 'hunting'
  | 'chasing'
  | 'reproducing'
  | 'dead';

/** Per-individual variance, stored as an offset from the species' live base value. */
export interface AnimalStatOffsets {
  speed: number;
  vision: number;
  metabolism: number;
  reproThreshold: number;
  reproRate: number;
  fear?: number; // rabbits only
  huntingSuccess?: number; // wolves only
}

export interface Animal {
  id: number;
  species: Species;
  x: number;
  y: number;
  vx: number;
  vy: number;
  energy: number;
  maxEnergy: number;
  age: number;
  generation: number;
  offsets: AnimalStatOffsets;
  status: AnimalStatus;
  targetId?: number;
  alive: boolean;
  wanderAngle: number;
}

export interface GrassCell {
  x: number;
  y: number;
  amount: number;
}

export interface Range {
  0: number;
  1: number;
}

export interface RabbitParams {
  count: number;
  maxPopulation: number;
  speed: [number, number];
  vision: [number, number];
  metabolism: [number, number];
  reproThreshold: [number, number];
  reproRate: [number, number];
  fear: [number, number];
}

export interface WolfParams {
  count: number;
  maxPopulation: number;
  speed: [number, number];
  vision: [number, number];
  metabolism: [number, number];
  reproThreshold: [number, number];
  reproRate: [number, number];
  huntingSuccess: [number, number];
}

export interface EnvironmentParams {
  worldWidth: number;
  worldHeight: number;
  initialGrassCoverage: number; // 0..1
  grassRegenRate: number; // amount/tick
  grassMaxAmount: number;
  dayLength: number; // ticks per day
}

export interface SimParams {
  environment: EnvironmentParams;
  rabbit: RabbitParams;
  wolf: WolfParams;
}

export interface SpeciesAggregate {
  population: number;
  avgSpeed: number;
  avgVision: number;
  avgMetabolism: number;
  avgReproRate: number;
  avgAge: number;
  avgHuntingSuccess?: number;
  avgFear?: number;
}

export interface Aggregate {
  day: number;
  rabbitCount: number;
  wolfCount: number;
  grassAvg: number;
  birthsThisPeriod: number;
  deathsThisPeriod: number;
  rabbit: SpeciesAggregate;
  wolf: SpeciesAggregate;
}

export interface AnimalSnapshot {
  id: number;
  species: Species;
  age: number;
  energyPct: number;
  speed: number;
  vision: number;
  generation: number;
  status: AnimalStatus;
}
