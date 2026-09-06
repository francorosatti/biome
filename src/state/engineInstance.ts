import { SimulationEngine } from '../sim/engine';
import { useParamsStore } from './paramsStore';
import { useSimStore } from './simStore';
import { useUiStore } from './uiStore';

export const engine = new SimulationEngine(() => useParamsStore.getState().params);

engine.onSnapshot((snapshot) => {
  useSimStore.getState().applySnapshot(snapshot);
});

useUiStore.subscribe((state) => {
  engine.setSelectedAnimalId(state.selectedAnimalId);
});

if (import.meta.env.DEV) {
  (window as unknown as { __engine: typeof engine }).__engine = engine;
}
