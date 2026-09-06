import { ABS_MAX, ABS_MIN } from './constants';
import type { Animal, RabbitParams, WolfParams } from './types';
import { clamp } from '../utils/clamp';

function baseOf(range: [number, number]): number {
  return (range[0] + range[1]) / 2;
}

export interface EffectiveStats {
  speed: number;
  vision: number;
  metabolism: number;
  reproThreshold: number;
  reproRate: number;
  fear: number;
  huntingSuccess: number;
}

/**
 * Combines the species' live (player-editable) base parameters with this
 * individual's inherited/mutated offset, so a slider change instantly
 * rescales every existing animal while per-animal variation is preserved.
 */
export function effectiveStats(
  animal: Animal,
  params: RabbitParams | WolfParams,
): EffectiveStats {
  const o = animal.offsets;
  const speed = clamp(baseOf(params.speed) + o.speed, ABS_MIN.speed, ABS_MAX.speed);
  const vision = clamp(baseOf(params.vision) + o.vision, ABS_MIN.vision, ABS_MAX.vision);
  const metabolism = clamp(
    baseOf(params.metabolism) + o.metabolism,
    ABS_MIN.metabolism,
    ABS_MAX.metabolism,
  );
  const reproThreshold = clamp(
    baseOf(params.reproThreshold) + o.reproThreshold,
    ABS_MIN.reproThreshold,
    ABS_MAX.reproThreshold,
  );
  const reproRate = clamp(
    baseOf(params.reproRate) + o.reproRate,
    ABS_MIN.reproRate,
    ABS_MAX.reproRate,
  );
  const fear =
    animal.species === 'rabbit'
      ? clamp(
          baseOf((params as RabbitParams).fear) + (o.fear ?? 0),
          ABS_MIN.fear,
          ABS_MAX.fear,
        )
      : 0;
  const huntingSuccess =
    animal.species === 'wolf'
      ? clamp(
          baseOf((params as WolfParams).huntingSuccess) + (o.huntingSuccess ?? 0),
          ABS_MIN.huntingSuccess,
          ABS_MAX.huntingSuccess,
        )
      : 0;
  return { speed, vision, metabolism, reproThreshold, reproRate, fear, huntingSuccess };
}
