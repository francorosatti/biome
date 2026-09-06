import { CATCH_RADIUS } from '../constants';
import { effectiveStats } from '../effectiveStats';
import type { Animal, EnvironmentParams, WolfParams } from '../types';
import type { UniformGrid } from '../spatialGrid';
import { distance, moveToward, nearest, wander } from './movement';

export interface WolfContext {
  rabbitGrid: UniformGrid<Animal>;
  params: WolfParams;
  env: EnvironmentParams;
}

export function decideWolf(wolf: Animal, ctx: WolfContext) {
  const { rabbitGrid, params, env } = ctx;
  const s = effectiveStats(wolf, params);

  const nearbyRabbits = rabbitGrid
    .queryRadius(wolf.x, wolf.y, s.vision)
    .filter((r) => r.alive);

  if (nearbyRabbits.length > 0) {
    const target = nearest(nearbyRabbits, wolf);
    if (distance(wolf, target) < CATCH_RADIUS) {
      wolf.status = 'hunting';
      wolf.targetId = target.id;
      wolf.vx = 0;
      wolf.vy = 0;
    } else {
      wolf.status = 'chasing';
      wolf.targetId = target.id;
      moveToward(wolf, target, s.speed, env.worldWidth, env.worldHeight);
    }
    return;
  }

  wolf.status = 'wandering';
  wolf.targetId = undefined;
  wander(wolf, s.speed, env.worldWidth, env.worldHeight);
}
