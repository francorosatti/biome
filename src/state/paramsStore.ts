import { create } from 'zustand';
import { DEFAULT_PRESET_KEY, PRESETS } from '../presets';
import type { SimParams } from '../sim/types';

interface ParamsState {
  activePresetKey: string;
  params: SimParams;
  setParams: (params: SimParams) => void;
  updateRabbit: (patch: Partial<SimParams['rabbit']>) => void;
  updateWolf: (patch: Partial<SimParams['wolf']>) => void;
  updateEnvironment: (patch: Partial<SimParams['environment']>) => void;
  loadPreset: (key: string) => void;
}

function cloneParams(params: SimParams): SimParams {
  return {
    environment: { ...params.environment },
    rabbit: { ...params.rabbit },
    wolf: { ...params.wolf },
  };
}

export const useParamsStore = create<ParamsState>((set, get) => ({
  activePresetKey: DEFAULT_PRESET_KEY,
  params: cloneParams(PRESETS[DEFAULT_PRESET_KEY].params),
  setParams: (params) => set({ params }),
  updateRabbit: (patch) =>
    set({ params: { ...get().params, rabbit: { ...get().params.rabbit, ...patch } } }),
  updateWolf: (patch) =>
    set({ params: { ...get().params, wolf: { ...get().params.wolf, ...patch } } }),
  updateEnvironment: (patch) =>
    set({ params: { ...get().params, environment: { ...get().params.environment, ...patch } } }),
  loadPreset: (key) => {
    const preset = PRESETS[key];
    if (!preset) return;
    set({ activePresetKey: key, params: cloneParams(preset.params) });
  },
}));
