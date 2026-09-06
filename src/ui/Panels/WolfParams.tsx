import { useParamsStore } from '../../state/paramsStore';
import { RangeSlider, SingleSlider } from './RangeSlider';
import './ParameterPanel.css';

export function WolfParamsPanel() {
  const wolf = useParamsStore((s) => s.params.wolf);
  const updateWolf = useParamsStore((s) => s.updateWolf);

  return (
    <div className="parameter-panel">
      <div className="parameter-panel-title">Wolves</div>
      <SingleSlider
        label="Initial population"
        value={wolf.count}
        min={0}
        max={100}
        step={1}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateWolf({ count: Math.round(v) })}
      />
      <SingleSlider
        label="Maximum population"
        value={wolf.maxPopulation}
        min={10}
        max={300}
        step={5}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateWolf({ maxPopulation: Math.round(v) })}
      />
      <RangeSlider
        label="Movement speed"
        value={wolf.speed}
        min={0.5}
        max={6}
        step={0.1}
        onChange={(v) => updateWolf({ speed: v })}
      />
      <RangeSlider
        label="Vision"
        value={wolf.vision}
        min={4}
        max={100}
        step={1}
        onChange={(v) => updateWolf({ vision: v })}
      />
      <RangeSlider
        label="Metabolism"
        value={wolf.metabolism}
        min={0.02}
        max={0.6}
        step={0.01}
        onChange={(v) => updateWolf({ metabolism: v })}
      />
      <RangeSlider
        label="Hunting success"
        value={wolf.huntingSuccess}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => updateWolf({ huntingSuccess: v })}
      />
      <RangeSlider
        label="Reproduction threshold"
        value={wolf.reproThreshold}
        min={10}
        max={150}
        step={1}
        onChange={(v) => updateWolf({ reproThreshold: v })}
      />
      <RangeSlider
        label="Reproduction rate (per day)"
        value={wolf.reproRate}
        min={0}
        max={1}
        step={0.01}
        onChange={(v) => updateWolf({ reproRate: v })}
      />
    </div>
  );
}
