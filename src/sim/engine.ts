import { SPEED_TICKS_PER_FRAME, type SpeedKey } from './constants';
import { effectiveStats } from './effectiveStats';
import { World } from './world';
import type { Aggregate, AnimalSnapshot, SimParams } from './types';
import type { HistoryPoint } from './history';
import type { SimEvent } from './events';

export interface EngineSnapshot {
  day: number;
  status: 'running' | 'paused';
  speed: SpeedKey;
  aggregate: Aggregate;
  chartPoints: HistoryPoint[];
  events: SimEvent[];
  selectedAnimal?: AnimalSnapshot;
}

export type SnapshotListener = (snapshot: EngineSnapshot) => void;

export class SimulationEngine {
  world: World;
  private status: 'running' | 'paused' = 'paused';
  private speed: SpeedKey = 'normal';
  private rafId: number | null = null;
  private listener: SnapshotListener | null = null;
  private selectedAnimalId: number | null = null;
  private getParams: () => SimParams;

  constructor(getParams: () => SimParams) {
    this.getParams = getParams;
    this.world = new World(getParams());
  }

  onSnapshot(listener: SnapshotListener) {
    this.listener = listener;
  }

  setSelectedAnimalId(id: number | null) {
    this.selectedAnimalId = id;
  }

  getStatus() {
    return this.status;
  }

  start() {
    if (this.status === 'running') return;
    this.status = 'running';
    this.rafId = requestAnimationFrame(this.loop);
  }

  pause() {
    this.status = 'paused';
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  step() {
    this.world.tick(this.getParams());
    this.pushSnapshot();
  }

  setSpeed(speed: SpeedKey) {
    this.speed = speed;
  }

  restart(params: SimParams) {
    this.world.reset(params);
    this.pushSnapshot();
  }

  private loop = () => {
    if (this.status !== 'running') return;
    const params = this.getParams();
    const ticksThisFrame = SPEED_TICKS_PER_FRAME[this.speed];
    for (let i = 0; i < ticksThisFrame; i++) {
      this.world.tick(params);
    }
    this.pushSnapshot();
    this.rafId = requestAnimationFrame(this.loop);
  };

  private pushSnapshot() {
    if (!this.listener || !this.world.lastAggregate) return;
    let selectedAnimal: AnimalSnapshot | undefined;
    if (this.selectedAnimalId !== null) {
      const found =
        this.world.rabbits.find((a) => a.id === this.selectedAnimalId) ??
        this.world.wolves.find((a) => a.id === this.selectedAnimalId);
      if (found) {
        const params = this.getParams();
        const s = effectiveStats(found, found.species === 'rabbit' ? params.rabbit : params.wolf);
        selectedAnimal = {
          id: found.id,
          species: found.species,
          age: found.age,
          energyPct: found.energy / found.maxEnergy,
          speed: s.speed,
          vision: s.vision,
          generation: found.generation,
          status: found.status,
        };
      }
    }
    this.listener({
      day: this.world.day,
      status: this.status,
      speed: this.speed,
      aggregate: this.world.lastAggregate,
      chartPoints: this.world.history.points,
      events: this.world.eventLog.events,
      selectedAnimal,
    });
  }
}
