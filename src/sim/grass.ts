import type { EnvironmentParams, GrassCell } from './types';

export const GRASS_CELL_SIZE = 20;

export function createGrassField(env: EnvironmentParams): GrassCell[] {
  const cols = Math.ceil(env.worldWidth / GRASS_CELL_SIZE);
  const rows = Math.ceil(env.worldHeight / GRASS_CELL_SIZE);
  const cells: GrassCell[] = [];
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const amount =
        Math.random() < env.initialGrassCoverage
          ? env.grassMaxAmount * (0.5 + Math.random() * 0.5)
          : 0;
      cells.push({
        x: col * GRASS_CELL_SIZE + GRASS_CELL_SIZE / 2,
        y: row * GRASS_CELL_SIZE + GRASS_CELL_SIZE / 2,
        amount,
      });
    }
  }
  return cells;
}

export function regenerateGrass(cells: GrassCell[], env: EnvironmentParams) {
  for (const cell of cells) {
    if (cell.amount < env.grassMaxAmount) {
      cell.amount = Math.min(env.grassMaxAmount, cell.amount + env.grassRegenRate);
    }
  }
}
