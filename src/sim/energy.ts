import type { Animal } from './types';

const MOVEMENT_ENERGY_FACTOR = 0.3;

/** Applies metabolism + movement cost for one tick, and ages the animal. Returns true if it died. */
export function applyMetabolism(animal: Animal, metabolism: number): boolean {
  const movementCost = Math.sqrt(animal.vx * animal.vx + animal.vy * animal.vy) * MOVEMENT_ENERGY_FACTOR;
  animal.energy = Math.max(0, animal.energy - metabolism - movementCost);
  animal.age += 1;
  if (animal.energy <= 0) {
    animal.alive = false;
    animal.status = 'dead';
    return true;
  }
  return false;
}
