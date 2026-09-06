import { EAT_RADIUS, FLEE_THRESHOLD, MIN_EDIBLE_GRASS } from '../constants';
import { effectiveStats } from '../effectiveStats';
import type { Animal, EnvironmentParams, GrassCell, RabbitParams } from '../types';
import type { UniformGrid } from '../spatialGrid';
import { distance, fleeFrom, moveToward, nearest, wander } from './movement';

export interface RabbitContext {
  wolfGrid: UniformGrid<Animal>;
  grassGrid: UniformGrid<GrassCell>;
  params: RabbitParams;
  env: EnvironmentParams;
}

function dangerScore(rabbit: Animal, wolves: Animal[], vision: number): number {
  if (wolves.length === 0) return 0;
  let score = 0;
  for (const w of wolves) {
    const d = distance(rabbit, w);
    score += Math.max(0, 1 - d / vision);
  }
  return Math.min(1, score);
}

export function decideRabbit(rabbit: Animal, ctx: RabbitContext) {
  const { wolfGrid, grassGrid, params, env } = ctx;
  const s = effectiveStats(rabbit, params);

  const nearbyWolves = wolfGrid.queryRadius(rabbit.x, rabbit.y, s.vision);
  const danger = dangerScore(rabbit, nearbyWolves, s.vision) * s.fear;

  if (danger > FLEE_THRESHOLD) {
    rabbit.status = 'fleeing';
    fleeFrom(rabbit, nearbyWolves, s.speed, env.worldWidth, env.worldHeight);
    return;
  }

  const nearbyGrass = grassGrid
    .queryRadius(rabbit.x, rabbit.y, s.vision)
    .filter((g) => g.amount > MIN_EDIBLE_GRASS);

  if (nearbyGrass.length > 0) {
    const target = nearest(nearbyGrass, rabbit);
    if (distance(rabbit, target) < EAT_RADIUS) {
      rabbit.status = 'eating';
      rabbit.targetId = undefined;
      rabbit.vx = 0;
      rabbit.vy = 0;
    } else {
      rabbit.status = 'seeking';
      moveToward(rabbit, target, s.speed, env.worldWidth, env.worldHeight);
    }
    return;
  }

  rabbit.status = 'wandering';
  wander(rabbit, s.speed, env.worldWidth, env.worldHeight);
}
