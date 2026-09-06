import { useEffect, useRef } from 'react';
import { engine } from '../../state/engineInstance';
import { useParamsStore } from '../../state/paramsStore';
import { useUiStore } from '../../state/uiStore';
import type { Animal, GrassCell } from '../../sim/types';
import './WorldCanvas.css';

const STATUS_COLOR: Record<string, string> = {
  wandering: '#8a8f98',
  seeking: '#e0b84a',
  eating: '#4caf50',
  fleeing: '#e05a4a',
  hunting: '#7a1f1f',
  chasing: '#b23a2f',
  reproducing: '#d060d0',
  dead: '#333',
};

function drawGrass(ctx: CanvasRenderingContext2D, grass: GrassCell[], maxAmount: number, cellSize: number) {
  for (const g of grass) {
    const pct = g.amount / maxAmount;
    const green = Math.round(60 + pct * 100);
    ctx.fillStyle = `rgb(30, ${green}, 40)`;
    ctx.fillRect(g.x - cellSize / 2, g.y - cellSize / 2, cellSize, cellSize);
  }
}

function drawAnimal(ctx: CanvasRenderingContext2D, a: Animal, selected: boolean) {
  const color = STATUS_COLOR[a.status] ?? '#fff';
  ctx.save();
  ctx.translate(a.x, a.y);
  const heading = Math.atan2(a.vy, a.vx);
  if (a.species === 'wolf') {
    ctx.rotate(heading);
    ctx.beginPath();
    ctx.moveTo(6, 0);
    ctx.lineTo(-5, 4);
    ctx.lineTo(-5, -4);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
  } else {
    ctx.beginPath();
    ctx.arc(0, 0, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }
  if (selected) {
    ctx.beginPath();
    ctx.arc(0, 0, 9, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
  ctx.restore();
}

export function WorldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const width = useParamsStore((s) => s.params.environment.worldWidth);
  const height = useParamsStore((s) => s.params.environment.worldHeight);
  const grassMaxAmount = useParamsStore((s) => s.params.environment.grassMaxAmount);
  const selectedAnimalId = useUiStore((s) => s.selectedAnimalId);
  const setSelectedAnimalId = useUiStore((s) => s.setSelectedAnimalId);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let rafId: number;

    const draw = () => {
      const world = engine.world;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawGrass(ctx, world.grass, grassMaxAmount, 20);
      for (const r of world.rabbits) drawAnimal(ctx, r, r.id === selectedAnimalId);
      for (const w of world.wolves) drawAnimal(ctx, w, w.id === selectedAnimalId);
      rafId = requestAnimationFrame(draw);
    };
    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, [grassMaxAmount, selectedAnimalId]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * canvas.width;
    const y = ((e.clientY - rect.top) / rect.height) * canvas.height;
    const world = engine.world;
    const all: Animal[] = [...world.rabbits, ...world.wolves];
    let closest: Animal | null = null;
    let bestDist = 12; // click tolerance in world units
    for (const a of all) {
      const d = Math.hypot(a.x - x, a.y - y);
      if (d < bestDist) {
        bestDist = d;
        closest = a;
      }
    }
    setSelectedAnimalId(closest ? closest.id : null);
  };

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="world-canvas"
      onClick={handleClick}
    />
  );
}
