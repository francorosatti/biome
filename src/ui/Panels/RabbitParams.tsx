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
        description="How many rabbits exist when the simulation starts or restarts."
        value={rabbit.count}
        min={0}
        max={300}
        step={1}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateRabbit({ count: Math.round(v) })}
      />
      <SingleSlider
        label="Maximum population"
        description="A hard cap on rabbit numbers. Reproduction stops once this many are alive, even if conditions are otherwise favorable."
        value={rabbit.maxPopulation}
        min={50}
        max={1000}
        step={10}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateRabbit({ maxPopulation: Math.round(v) })}
      />
      <RangeSlider
        label="Movement speed"
        description="Distance covered per tick. Faster rabbits outrun wolves more easily, but burn more energy while moving."
        value={rabbit.speed}
        min={0.5}
        max={5}
        step={0.1}
        onChange={(v) => updateRabbit({ speed: v })}
      />
      <RangeSlider
        label="Vision"
        description="How far a rabbit can spot both grass and wolves. Higher vision means it reacts to threats and food sooner."
        value={rabbit.vision}
        min={4}
        max={80}
        step={1}
        onChange={(v) => updateRabbit({ vision: v })}
      />
      <RangeSlider
        label="Metabolism"
        description="Energy drained every tick just to stay alive, on top of movement cost. Higher metabolism means the rabbit needs to eat more often or it starves faster."
        value={rabbit.metabolism}
        min={0.02}
        max={0.6}
        step={0.01}
        onChange={(v) => updateRabbit({ metabolism: v })}
      />
      <RangeSlider
        label="Reproduction threshold"
        description="Minimum energy a rabbit needs before it's eligible to reproduce. Higher means only well-fed rabbits breed."
        value={rabbit.reproThreshold}
        min={10}
        max={100}
        step={1}
        onChange={(v) => updateRabbit({ reproThreshold: v })}
      />
      <RangeSlider
        label="Reproduction rate (per day)"
        description="Once above the reproduction threshold, the chance a rabbit has one offspring on any given day. 0.2 ≈ a new litter roughly every 5 days."
        value={rabbit.reproRate}
        min={0}
        max={1}
        step={0.01}
        onChange={(v) => updateRabbit({ reproRate: v })}
      />
      <RangeSlider
        label="Fear"
        description="How strongly nearby wolves are weighted as danger. High fear makes rabbits flee at the first sign of a wolf, even far away; low fear lets wolves get close before they react."
        value={rabbit.fear}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => updateRabbit({ fear: v })}
      />
    </div>
  );
}
