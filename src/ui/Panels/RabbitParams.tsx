import { useParamsStore } from '../../state/paramsStore';
import { RangeSlider, SingleSlider } from './RangeSlider';
import './ParameterPanel.css';

export function RabbitParamsPanel() {
  const rabbit = useParamsStore((s) => s.params.rabbit);
  const updateRabbit = useParamsStore((s) => s.updateRabbit);

  return (
    <div className="parameter-panel">
      <div className="parameter-panel-title">Rabbits</div>
      <SingleSlider
        label="Initial population"
        value={rabbit.count}
        min={0}
        max={300}
        step={1}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateRabbit({ count: Math.round(v) })}
      />
      <SingleSlider
        label="Maximum population"
        value={rabbit.maxPopulation}
        min={50}
        max={1000}
        step={10}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateRabbit({ maxPopulation: Math.round(v) })}
      />
      <RangeSlider
        label="Movement speed"
        value={rabbit.speed}
        min={0.5}
        max={5}
        step={0.1}
        onChange={(v) => updateRabbit({ speed: v })}
      />
      <RangeSlider
        label="Vision"
        value={rabbit.vision}
        min={4}
        max={80}
        step={1}
        onChange={(v) => updateRabbit({ vision: v })}
      />
      <RangeSlider
        label="Metabolism"
        value={rabbit.metabolism}
        min={0.02}
        max={0.6}
        step={0.01}
        onChange={(v) => updateRabbit({ metabolism: v })}
      />
      <RangeSlider
        label="Reproduction threshold"
        value={rabbit.reproThreshold}
        min={10}
        max={100}
        step={1}
        onChange={(v) => updateRabbit({ reproThreshold: v })}
      />
      <RangeSlider
        label="Reproduction rate (per day)"
        value={rabbit.reproRate}
        min={0}
        max={1}
        step={0.01}
        onChange={(v) => updateRabbit({ reproRate: v })}
      />
      <RangeSlider
        label="Fear"
        value={rabbit.fear}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => updateRabbit({ fear: v })}
      />
    </div>
  );
}
