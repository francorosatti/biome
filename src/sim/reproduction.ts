import { ABS_MAX, ABS_MIN, MUTATION_STD, OFFSPRING_ENERGY_SHARE, PARENT_ENERGY_COST_FRACTION } from './constants';
import { effectiveStats } from './effectiveStats';
import type { Animal, RabbitParams, WolfParams } from './types';
import { clamp } from '../utils/clamp';
import { gaussianJitter, randRange } from '../utils/random';

function baseOf(range: [number, number]): number {
  return (range[0] + range[1]) / 2;
}

/** Samples an initial offset uniformly within the param range, relative to its midpoint. */
function sampleInitialOffset(range: [number, number]): number {
  return randRange(range[0], range[1]) - baseOf(range);
}

/**
 * Mutates an individual's stat offset. Works in "effective value" space
 * (base + offset) so the gaussian jitter and clamp are meaningful in real
 * units, then converts back to an offset relative to the live species base.
 */
function mutateOffset(effectiveValue: number, key: keyof typeof ABS_MIN, base: number): number {
  const mutated = gaussianJitter(effectiveValue, MUTATION_STD);
  const clampedEffective = clamp(mutated, ABS_MIN[key], ABS_MAX[key]);
  return clampedEffective - base;
}

let nextId = 1;
export function resetIdCounter() {
  nextId = 1;
}

export function createAnimal(
  species: Animal['species'],
  x: number,
  y: number,
  params: RabbitParams | WolfParams,
  maxEnergy: number,
): Animal {
  const animal: Animal = {
    id: nextId++,
    species,
    x,
    y,
    vx: 0,
    vy: 0,
    energy: maxEnergy * 0.7,
    maxEnergy,
    age: 0,
    generation: 0,
    offsets: {
      speed: sampleInitialOffset(params.speed),
      vision: sampleInitialOffset(params.vision),
      metabolism: sampleInitialOffset(params.metabolism),
      reproThreshold: sampleInitialOffset(params.reproThreshold),
      reproRate: sampleInitialOffset(params.reproRate),
      fear: species === 'rabbit' ? sampleInitialOffset((params as RabbitParams).fear) : undefined,
      huntingSuccess:
        species === 'wolf' ? sampleInitialOffset((params as WolfParams).huntingSuccess) : undefined,
    },
    status: 'wandering',
    alive: true,
    wanderAngle: Math.random() * Math.PI * 2,
  };
  return animal;
}

export function createOffspring(
  parent: Animal,
  params: RabbitParams | WolfParams,
): Animal {
  const s = effectiveStats(parent, params);
  const o = parent.offsets;
  const baseSpeed = s.speed - o.speed;
  const baseVision = s.vision - o.vision;
  const baseMetabolism = s.metabolism - o.metabolism;
  const baseReproThreshold = s.reproThreshold - o.reproThreshold;
  const baseReproRate = s.reproRate - o.reproRate;
  const baseFear = s.fear - (o.fear ?? 0);
  const baseHuntingSuccess = s.huntingSuccess - (o.huntingSuccess ?? 0);
  const offspring: Animal = {
    id: nextId++,
    species: parent.species,
    x: parent.x,
    y: parent.y,
    vx: 0,
    vy: 0,
    energy: parent.maxEnergy * OFFSPRING_ENERGY_SHARE,
    maxEnergy: parent.maxEnergy,
    age: 0,
    generation: parent.generation + 1,
    offsets: {
      speed: mutateOffset(s.speed, 'speed', baseSpeed),
      vision: mutateOffset(s.vision, 'vision', baseVision),
      metabolism: mutateOffset(s.metabolism, 'metabolism', baseMetabolism),
      reproThreshold: mutateOffset(s.reproThreshold, 'reproThreshold', baseReproThreshold),
      reproRate: mutateOffset(s.reproRate, 'reproRate', baseReproRate),
      fear: parent.species === 'rabbit' ? mutateOffset(s.fear, 'fear', baseFear) : undefined,
      huntingSuccess:
        parent.species === 'wolf'
          ? mutateOffset(s.huntingSuccess, 'huntingSuccess', baseHuntingSuccess)
          : undefined,
    },
    status: 'wandering',
    alive: true,
    wanderAngle: Math.random() * Math.PI * 2,
  };
  return offspring;
}

export function tryReproduce(
  animal: Animal,
  params: RabbitParams | WolfParams,
): Animal | null {
  const s = effectiveStats(animal, params);
  if (animal.energy < s.reproThreshold) return null;
  if (Math.random() >= s.reproRate) return null;
  animal.status = 'reproducing';
  animal.energy -= s.reproThreshold * PARENT_ENERGY_COST_FRACTION;
  return createOffspring(animal, params);
}
