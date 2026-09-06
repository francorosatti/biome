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
        description="How many wolves exist when the simulation starts or restarts."
        value={wolf.count}
        min={0}
        max={100}
        step={1}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateWolf({ count: Math.round(v) })}
      />
      <SingleSlider
        label="Maximum population"
        description="A hard cap on wolf numbers. Reproduction stops once this many are alive, even if prey is abundant."
        value={wolf.maxPopulation}
        min={10}
        max={300}
        step={5}
        format={(v) => String(Math.round(v))}
        onChange={(v) => updateWolf({ maxPopulation: Math.round(v) })}
      />
      <RangeSlider
        label="Movement speed"
        description="Distance covered per tick. A wolf faster than its prey wins the chase; a slower one lets rabbits escape."
        value={wolf.speed}
        min={0.5}
        max={6}
        step={0.1}
        onChange={(v) => updateWolf({ speed: v })}
      />
      <RangeSlider
        label="Vision"
        description="How far a wolf can spot rabbits. Higher vision means it finds prey to chase sooner."
        value={wolf.vision}
        min={4}
        max={100}
        step={1}
        onChange={(v) => updateWolf({ vision: v })}
      />
      <RangeSlider
        label="Metabolism"
        description="Energy drained every tick just to stay alive, on top of movement cost. Higher metabolism means the wolf needs to catch prey more often or it starves faster."
        value={wolf.metabolism}
        min={0.02}
        max={0.6}
        step={0.01}
        onChange={(v) => updateWolf({ metabolism: v })}
      />
      <RangeSlider
        label="Hunting success"
        description="Once a wolf is close enough to a rabbit, this is the chance it actually catches it. Doesn't affect chasing or detection — only the catch itself."
        value={wolf.huntingSuccess}
        min={0}
        max={1}
        step={0.05}
        onChange={(v) => updateWolf({ huntingSuccess: v })}
      />
      <RangeSlider
        label="Reproduction threshold"
        description="Minimum energy a wolf needs before it's eligible to reproduce. Higher means only well-fed wolves breed."
        value={wolf.reproThreshold}
        min={10}
        max={150}
        step={1}
        onChange={(v) => updateWolf({ reproThreshold: v })}
      />
      <RangeSlider
        label="Reproduction rate (per day)"
        description="Once above the reproduction threshold, the chance a wolf has one offspring on any given day. 0.1 ≈ a new litter roughly every 10 days."
        value={wolf.reproRate}
        min={0}
        max={1}
        step={0.01}
        onChange={(v) => updateWolf({ reproRate: v })}
      />
    </div>
  );
}
