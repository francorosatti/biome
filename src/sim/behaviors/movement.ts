import type { Animal } from '../types';

export function distance(a: { x: number; y: number }, b: { x: number; y: number }): number {
  const dx = a.x - b.x;
  const dy = a.y - b.y;
  return Math.sqrt(dx * dx + dy * dy);
}

export function nearest<T extends { x: number; y: number }>(
  items: T[],
  from: { x: number; y: number },
): T {
  let best = items[0];
  let bestDist = distance(items[0], from);
  for (let i = 1; i < items.length; i++) {
    const d = distance(items[i], from);
    if (d < bestDist) {
      bestDist = d;
      best = items[i];
    }
  }
  return best;
}

export function moveToward(
  animal: Animal,
  target: { x: number; y: number },
  speed: number,
  worldWidth: number,
  worldHeight: number,
) {
  const dx = target.x - animal.x;
  const dy = target.y - animal.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  animal.vx = (dx / dist) * speed;
  animal.vy = (dy / dist) * speed;
  applyVelocity(animal, worldWidth, worldHeight);
}

export function fleeFrom(
  animal: Animal,
  threats: { x: number; y: number }[],
  speed: number,
  worldWidth: number,
  worldHeight: number,
) {
  let dx = 0;
  let dy = 0;
  for (const t of threats) {
    const ddx = animal.x - t.x;
    const ddy = animal.y - t.y;
    const d = Math.sqrt(ddx * ddx + ddy * ddy) || 1;
    dx += ddx / d;
    dy += ddy / d;
  }
  const mag = Math.sqrt(dx * dx + dy * dy) || 1;
  animal.vx = (dx / mag) * speed;
  animal.vy = (dy / mag) * speed;
  applyVelocity(animal, worldWidth, worldHeight);
}

export function wander(animal: Animal, speed: number, worldWidth: number, worldHeight: number) {
  animal.wanderAngle += (Math.random() - 0.5) * 0.6;
  animal.vx = Math.cos(animal.wanderAngle) * speed;
  animal.vy = Math.sin(animal.wanderAngle) * speed;
  applyVelocity(animal, worldWidth, worldHeight);
}

function applyVelocity(animal: Animal, worldWidth: number, worldHeight: number) {
  animal.x += animal.vx;
  animal.y += animal.vy;
  // Bounce off world edges to keep animals visible and inside the grid.
  if (animal.x < 0) {
    animal.x = 0;
    animal.vx *= -1;
    animal.wanderAngle = Math.atan2(animal.vy, animal.vx);
  } else if (animal.x > worldWidth) {
    animal.x = worldWidth;
    animal.vx *= -1;
    animal.wanderAngle = Math.atan2(animal.vy, animal.vx);
  }
  if (animal.y < 0) {
    animal.y = 0;
    animal.vy *= -1;
    animal.wanderAngle = Math.atan2(animal.vy, animal.vx);
  } else if (animal.y > worldHeight) {
    animal.y = worldHeight;
    animal.vy *= -1;
    animal.wanderAngle = Math.atan2(animal.vy, animal.vx);
  }
}
