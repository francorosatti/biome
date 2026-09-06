import { create } from 'zustand';
import type { SpeedKey } from '../sim/constants';
import type { EngineSnapshot } from '../sim/engine';
import type { Aggregate, AnimalSnapshot } from '../sim/types';
import type { HistoryPoint } from '../sim/history';
import type { SimEvent } from '../sim/events';

interface SimState {
  day: number;
  status: 'running' | 'paused';
  speed: SpeedKey;
  aggregate: Aggregate | null;
  chartPoints: HistoryPoint[];
  events: SimEvent[];
  selectedAnimal?: AnimalSnapshot;
  applySnapshot: (snapshot: EngineSnapshot) => void;
}

export const useSimStore = create<SimState>((set) => ({
  day: 0,
  status: 'paused',
  speed: 'normal',
  aggregate: null,
  chartPoints: [],
  events: [],
  selectedAnimal: undefined,
  applySnapshot: (snapshot) =>
    set({
      day: snapshot.day,
      status: snapshot.status,
      speed: snapshot.speed,
      aggregate: snapshot.aggregate,
      chartPoints: snapshot.chartPoints,
      events: snapshot.events,
      selectedAnimal: snapshot.selectedAnimal,
    }),
}));
