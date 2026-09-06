import { engine } from '../../state/engineInstance';
import { useParamsStore } from '../../state/paramsStore';
import { useSimStore } from '../../state/simStore';
import type { SpeedKey } from '../../sim/constants';
import './ControlBar.css';

const SPEED_LABELS: { key: SpeedKey; label: string }[] = [
  { key: 'slow', label: '1x' },
  { key: 'normal', label: '5x' },
  { key: 'fast', label: '20x' },
  { key: 'veryFast', label: '100x' },
];

export function ControlBar() {
  const status = useSimStore((s) => s.status);
  const speed = useSimStore((s) => s.speed);
  const day = useSimStore((s) => s.day);
  const activePresetKey = useParamsStore((s) => s.activePresetKey);
  const params = useParamsStore((s) => s.params);

  const handlePlayPause = () => {
    if (status === 'running') engine.pause();
    else engine.start();
  };

  const handleStep = () => {
    if (status === 'running') engine.pause();
    engine.step();
  };

  const handleRestart = () => {
    engine.pause();
    engine.restart(params);
  };

  return (
    <div className="control-bar">
      <button onClick={handlePlayPause}>{status === 'running' ? '⏸ Pause' : '▶ Play'}</button>
      <button onClick={handleStep}>⏭ Step</button>
      <button onClick={handleRestart}>↻ Restart</button>
      <div className="speed-group">
        {SPEED_LABELS.map(({ key, label }) => (
          <button
            key={key}
            className={key === speed ? 'active' : ''}
            onClick={() => engine.setSpeed(key)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="day-counter">Day {day}</div>
      <div className="preset-name">{activePresetKey}</div>
    </div>
  );
}
