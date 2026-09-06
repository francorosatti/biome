import { useEffect, useRef } from 'react';
import { useSimStore } from '../../state/simStore';
import './PopulationChart.css';

const WIDTH = 320;
const HEIGHT = 140;
const PADDING = 24;

export function PopulationChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const points = useSimStore((s) => s.chartPoints);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = '#161616';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    if (points.length < 2) {
      ctx.fillStyle = '#555';
      ctx.font = '12px sans-serif';
      ctx.fillText('Run the simulation to see population history', 10, HEIGHT / 2);
      return;
    }

    const maxPop = Math.max(1, ...points.map((p) => Math.max(p.rabbits, p.wolves)));
    const minDay = points[0].day;
    const maxDay = Math.max(minDay + 1, points[points.length - 1].day);

    const plotW = WIDTH - PADDING * 2;
    const plotH = HEIGHT - PADDING * 2;
    const xOf = (day: number) => PADDING + ((day - minDay) / (maxDay - minDay)) * plotW;
    const yOf = (v: number) => PADDING + plotH - (v / maxPop) * plotH;

    // axes
    ctx.strokeStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(PADDING, PADDING);
    ctx.lineTo(PADDING, HEIGHT - PADDING);
    ctx.lineTo(WIDTH - PADDING, HEIGHT - PADDING);
    ctx.stroke();

    ctx.fillStyle = '#666';
    ctx.font = '10px sans-serif';
    ctx.fillText(String(Math.round(maxPop)), 2, PADDING + 4);
    ctx.fillText('0', 2, HEIGHT - PADDING);
    ctx.fillText(`Day ${maxDay}`, WIDTH - PADDING - 40, HEIGHT - 6);

    const drawLine = (key: 'rabbits' | 'wolves', color: string) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      points.forEach((p, i) => {
        const x = xOf(p.day);
        const y = yOf(p[key]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
    };

    drawLine('rabbits', '#d9c07a');
    drawLine('wolves', '#c76a5c');
  }, [points]);

  return (
    <div className="population-chart">
      <canvas ref={canvasRef} width={WIDTH} height={HEIGHT} />
      <div className="chart-legend">
        <span className="swatch rabbit" /> Rabbits
        <span className="swatch wolf" /> Wolves
      </div>
    </div>
  );
}
