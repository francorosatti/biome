import { useParamsStore } from '../../state/paramsStore';
import { SingleSlider } from './RangeSlider';
import './ParameterPanel.css';

export function EnvironmentParamsPanel() {
  const env = useParamsStore((s) => s.params.environment);
  const updateEnvironment = useParamsStore((s) => s.updateEnvironment);

  return (
    <div className="parameter-panel">
      <div className="parameter-panel-title">Environment</div>
      <SingleSlider
        label="World width"
        value={env.worldWidth}
        min={400}
        max={1600}
        step={50}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateEnvironment({ worldWidth: Math.round(v) })}
      />
      <SingleSlider
        label="World height"
        value={env.worldHeight}
        min={300}
        max={1200}
        step={50}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateEnvironment({ worldHeight: Math.round(v) })}
      />
      <SingleSlider
        label="Initial grass coverage"
        value={env.initialGrassCoverage}
        min={0}
        max={1}
        step={0.05}
        format={(v) => `${Math.round(v * 100)}%`}
        onChange={(v) => updateEnvironment({ initialGrassCoverage: v })}
      />
      <SingleSlider
        label="Grass regeneration"
        value={env.grassRegenRate}
        min={0}
        max={1.5}
        step={0.02}
        onChange={(v) => updateEnvironment({ grassRegenRate: v })}
      />
      <SingleSlider
        label="Day length (ticks)"
        value={env.dayLength}
        min={5}
        max={120}
        step={1}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateEnvironment({ dayLength: Math.round(v) })}
      />
    </div>
  );
}
