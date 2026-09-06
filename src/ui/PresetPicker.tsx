import { PRESETS } from '../presets';
import { engine } from '../state/engineInstance';
import { useParamsStore } from '../state/paramsStore';
import './PresetPicker.css';

export function PresetPicker() {
  const activePresetKey = useParamsStore((s) => s.activePresetKey);
  const loadPreset = useParamsStore((s) => s.loadPreset);

  const handleSelect = (key: string) => {
    loadPreset(key);
    engine.pause();
    engine.restart(useParamsStore.getState().params);
  };

  return (
    <div className="preset-picker">
      {Object.values(PRESETS).map((preset) => (
        <button
          key={preset.key}
          className={preset.key === activePresetKey ? 'active' : ''}
          title={preset.description}
          onClick={() => handleSelect(preset.key)}
        >
          {preset.name}
        </button>
      ))}
    </div>
  );
}
