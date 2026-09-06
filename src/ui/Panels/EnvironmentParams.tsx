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
        description="Width of the simulated world. Takes effect on the next Restart, not immediately."
        value={env.worldWidth}
        min={400}
        max={1600}
        step={50}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateEnvironment({ worldWidth: Math.round(v) })}
      />
      <SingleSlider
        label="World height"
        description="Height of the simulated world. Takes effect on the next Restart, not immediately."
        value={env.worldHeight}
        min={300}
        max={1200}
        step={50}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateEnvironment({ worldHeight: Math.round(v) })}
      />
      <SingleSlider
        label="Initial grass coverage"
        description="Fraction of the world covered in grass at the start. Takes effect on the next Restart, not immediately."
        value={env.initialGrassCoverage}
        min={0}
        max={1}
        step={0.05}
        format={(v) => `${Math.round(v * 100)}%`}
        onChange={(v) => updateEnvironment({ initialGrassCoverage: v })}
      />
      <SingleSlider
        label="Grass regeneration"
        description="How fast eaten grass grows back, applied continuously while running. Higher supports more rabbits; lower can cause food scarcity even if wolves aren't the problem."
        value={env.grassRegenRate}
        min={0}
        max={1.5}
        step={0.02}
        onChange={(v) => updateEnvironment({ grassRegenRate: v })}
      />
      <SingleSlider
        label="Day length (ticks)"
        description="How many simulation ticks make up one day. Reproduction, the population chart, and events are all evaluated once per day, so this controls how often those checks happen."
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
