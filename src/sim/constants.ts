// Hardcoded absolute clamps for mutation drift — independent of the UI's
// initial-sampling ranges, so evolution can't degenerate to zero/infinity
// over long runs.
export const ABS_MIN = {
  speed: 0.5,
  vision: 4,
  metabolism: 0.02,
  reproThreshold: 10,
  reproRate: 0,
  fear: 0,
  huntingSuccess: 0,
};

export const ABS_MAX = {
  speed: 10,
  vision: 60,
  metabolism: 1,
  reproThreshold: 200,
  reproRate: 1,
  fear: 1,
  huntingSuccess: 1,
};

export const MUTATION_STD = 0.05;

export const EAT_RADIUS = 4;
export const CATCH_RADIUS = 4;
export const MIN_EDIBLE_GRASS = 5;
export const FLEE_THRESHOLD = 0.3;
export const PARENT_ENERGY_COST_FRACTION = 0.5;
export const OFFSPRING_ENERGY_SHARE = 0.6;
export const GRASS_EAT_AMOUNT = 20;
export const GRASS_ENERGY_PER_UNIT = 1.2;
export const RABBIT_ENERGY_PER_KILL = 90;

export const TICK_MS = 1000 / 30;
export type SpeedKey = 'slow' | 'normal' | 'fast' | 'veryFast';
export const SPEED_TICKS_PER_FRAME: Record<SpeedKey, number> = {
  slow: 1,
  normal: 3,
  fast: 10,
  veryFast: 40,
};
