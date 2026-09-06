import './RangeSlider.css';

interface RangeSliderProps {
  label: string;
  value: [number, number];
  min: number;
  max: number;
  step: number;
  onChange: (value: [number, number]) => void;
}

export function RangeSlider({ label, value, min, max, step, onChange }: RangeSliderProps) {
  return (
    <div className="range-slider">
      <div className="range-slider-header">
        <span>{label}</span>
        <span className="range-slider-value">
          {value[0].toFixed(2)} – {value[1].toFixed(2)}
        </span>
      </div>
      <div className="range-slider-inputs">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => {
            const v = Math.min(Number(e.target.value), value[1]);
            onChange([v, value[1]]);
          }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => {
            const v = Math.max(Number(e.target.value), value[0]);
            onChange([value[0], v]);
          }}
        />
      </div>
    </div>
  );
}

interface SingleSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format?: (v: number) => string;
}

export function SingleSlider({ label, value, min, max, step, onChange, format }: SingleSliderProps) {
  return (
    <div className="range-slider">
      <div className="range-slider-header">
        <span>{label}</span>
        <span className="range-slider-value">{format ? format(value) : value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </div>
  );
}
