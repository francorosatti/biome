import { decideRabbit } from './behaviors/rabbit';
import { decideWolf } from './behaviors/wolf';
import { EAT_RADIUS, CATCH_RADIUS, GRASS_EAT_AMOUNT, GRASS_ENERGY_PER_UNIT, RABBIT_ENERGY_PER_KILL } from './constants';
import { applyMetabolism } from './energy';
import { effectiveStats } from './effectiveStats';
import { EventLog } from './events';
import { createGrassField, regenerateGrass } from './grass';
import { PopulationHistory } from './history';
import { createAnimal, resetIdCounter, tryReproduce } from './reproduction';
import { UniformGrid } from './spatialGrid';
import type { Aggregate, Animal, GrassCell, SimParams, SpeciesAggregate } from './types';
import { distance } from './behaviors/movement';

const RABBIT_MAX_ENERGY = 100;
const WOLF_MAX_ENERGY = 150;

export class World {
  rabbits: Animal[] = [];
  wolves: Animal[] = [];
  grass: GrassCell[] = [];
  tickCount = 0;
  day = 0;

  history = new PopulationHistory();
  eventLog = new EventLog();
  lastAggregate: Aggregate | null = null;

  private birthsThisPeriod = 0;
  private deathsThisPeriod = 0;
  private lastDaySeen = -1;

  private rabbitGrid: UniformGrid<Animal>;
  private wolfGrid: UniformGrid<Animal>;
  private grassGrid: UniformGrid<GrassCell>;
  private params: SimParams;

  constructor(params: SimParams) {
    this.params = params;
    resetIdCounter();
    this.rabbitGrid = new UniformGrid(params.environment.worldWidth, params.environment.worldHeight, 1);
    this.wolfGrid = new UniformGrid(params.environment.worldWidth, params.environment.worldHeight, 1);
    this.grassGrid = new UniformGrid(params.environment.worldWidth, params.environment.worldHeight, 1);
    this.reset(params);
  }

  reset(params: SimParams) {
    resetIdCounter();
    this.tickCount = 0;
    this.day = 0;
    this.lastDaySeen = -1;
    this.birthsThisPeriod = 0;
    this.deathsThisPeriod = 0;
    this.history.reset();
    this.eventLog.reset();
    this.lastAggregate = null;

    this.grass = createGrassField(params.environment);

    this.rabbits = [];
    for (let i = 0; i < params.rabbit.count; i++) {
      this.rabbits.push(
        createAnimal(
          'rabbit',
          Math.random() * params.environment.worldWidth,
          Math.random() * params.environment.worldHeight,
          params.rabbit,
          RABBIT_MAX_ENERGY,
        ),
      );
    }

    this.wolves = [];
    for (let i = 0; i < params.wolf.count; i++) {
      this.wolves.push(
        createAnimal(
          'wolf',
          Math.random() * params.environment.worldWidth,
          Math.random() * params.environment.worldHeight,
          params.wolf,
          WOLF_MAX_ENERGY,
        ),
      );
    }

    this.rebuildGrids(params);
    this.lastAggregate = this.computeAggregate(0);
  }

  private maxVision(params: SimParams): number {
    return Math.max(
      params.rabbit.vision[1],
      params.wolf.vision[1],
      EAT_RADIUS,
      CATCH_RADIUS,
      1,
    );
  }

  private rebuildGrids(params: SimParams) {
    const cellSize = this.maxVision(params);
    if (this.rabbitGrid.cellSize !== cellSize) {
      this.rabbitGrid = new UniformGrid(params.environment.worldWidth, params.environment.worldHeight, cellSize);
      this.wolfGrid = new UniformGrid(params.environment.worldWidth, params.environment.worldHeight, cellSize);
      this.grassGrid = new UniformGrid(params.environment.worldWidth, params.environment.worldHeight, cellSize);
    } else {
      this.rabbitGrid.clear();
      this.wolfGrid.clear();
      this.grassGrid.clear();
    }
    for (const r of this.rabbits) if (r.alive) this.rabbitGrid.insert(r);
    for (const w of this.wolves) if (w.alive) this.wolfGrid.insert(w);
    for (const g of this.grass) if (g.amount > 0) this.grassGrid.insert(g);
  }

  tick(params: SimParams) {
    this.params = params;
    const env = params.environment;

    regenerateGrass(this.grass, env);
    this.rebuildGrids(params);

    for (const rabbit of this.rabbits) {
      if (!rabbit.alive) continue;
      decideRabbit(rabbit, {
        wolfGrid: this.wolfGrid,
        grassGrid: this.grassGrid,
        params: params.rabbit,
        env,
      });
    }

    for (const wolf of this.wolves) {
      if (!wolf.alive) continue;
      decideWolf(wolf, { rabbitGrid: this.rabbitGrid, params: params.wolf, env });
    }

    this.resolveEating();
    this.resolveHunting(params);
    this.applyEnergyAndAge(params);
    this.compactDead();
    // Reproduction is a once-per-day decision (not per-tick), matching
    // reproRate's intent as "chance a healthy animal reproduces on a given
    // day" — checking every tick at 30 ticks/sec caused runaway growth.
    if (this.tickCount % env.dayLength === 0) {
      this.resolveReproduction(params);
    }

    this.tickCount++;
    this.day = Math.floor(this.tickCount / env.dayLength);
    if (this.day !== this.lastDaySeen) {
      this.lastDaySeen = this.day;
      this.recordDay();
    }
  }

  private resolveEating() {
    for (const rabbit of this.rabbits) {
      if (!rabbit.alive || rabbit.status !== 'eating') continue;
      const nearby = this.grassGrid.queryRadius(rabbit.x, rabbit.y, EAT_RADIUS);
      if (nearby.length === 0) continue;
      const patch = nearby[0];
      const eaten = Math.min(patch.amount, GRASS_EAT_AMOUNT);
      patch.amount -= eaten;
      rabbit.energy = Math.min(rabbit.maxEnergy, rabbit.energy + eaten * GRASS_ENERGY_PER_UNIT);
    }
  }

  private resolveHunting(params: SimParams) {
    for (const wolf of this.wolves) {
      if (!wolf.alive || wolf.status !== 'hunting' || wolf.targetId === undefined) continue;
      const target = this.rabbits.find((r) => r.id === wolf.targetId);
      if (!target || !target.alive || distance(wolf, target) > CATCH_RADIUS) continue;
      const s = effectiveStats(wolf, params.wolf);
      if (Math.random() < s.huntingSuccess) {
        target.alive = false;
        target.status = 'dead';
        wolf.energy = Math.min(wolf.maxEnergy, wolf.energy + RABBIT_ENERGY_PER_KILL);
      }
    }
  }

  private applyEnergyAndAge(params: SimParams) {
    for (const rabbit of this.rabbits) {
      if (!rabbit.alive) continue;
      const s = effectiveStats(rabbit, params.rabbit);
      if (applyMetabolism(rabbit, s.metabolism)) this.deathsThisPeriod++;
    }
    for (const wolf of this.wolves) {
      if (!wolf.alive) continue;
      const s = effectiveStats(wolf, params.wolf);
      if (applyMetabolism(wolf, s.metabolism)) this.deathsThisPeriod++;
    }
  }

  private compactDead() {
    this.rabbits = this.rabbits.filter((r) => r.alive);
    this.wolves = this.wolves.filter((w) => w.alive);
  }

  private resolveReproduction(params: SimParams) {
    const newRabbits: Animal[] = [];
    let rabbitCount = this.rabbits.length;
    for (const rabbit of this.rabbits) {
      if (rabbitCount >= params.rabbit.maxPopulation) break;
      const offspring = tryReproduce(rabbit, params.rabbit);
      if (offspring) {
        newRabbits.push(offspring);
        rabbitCount++;
        this.birthsThisPeriod++;
      }
    }
    const newWolves: Animal[] = [];
    let wolfCount = this.wolves.length;
    for (const wolf of this.wolves) {
      if (wolfCount >= params.wolf.maxPopulation) break;
      const offspring = tryReproduce(wolf, params.wolf);
      if (offspring) {
        newWolves.push(offspring);
        wolfCount++;
        this.birthsThisPeriod++;
      }
    }
    this.rabbits.push(...newRabbits);
    this.wolves.push(...newWolves);
  }

  private speciesAggregate(animals: Animal[], params: SimParams): SpeciesAggregate {
    const n = animals.length;
    if (n === 0) {
      return { population: 0, avgSpeed: 0, avgVision: 0, avgMetabolism: 0, avgReproRate: 0, avgAge: 0 };
    }
    let speed = 0;
    let vision = 0;
    let metabolism = 0;
    let reproRate = 0;
    let age = 0;
    let fear = 0;
    let huntingSuccess = 0;
    for (const a of animals) {
      const p = a.species === 'rabbit' ? params.rabbit : params.wolf;
      const s = effectiveStats(a, p);
      speed += s.speed;
      vision += s.vision;
      metabolism += s.metabolism;
      reproRate += s.reproRate;
      age += a.age;
      fear += s.fear;
      huntingSuccess += s.huntingSuccess;
    }
    const isRabbit = animals[0].species === 'rabbit';
    return {
      population: n,
      avgSpeed: speed / n,
      avgVision: vision / n,
      avgMetabolism: metabolism / n,
      avgReproRate: reproRate / n,
      avgAge: age / n,
      avgFear: isRabbit ? fear / n : undefined,
      avgHuntingSuccess: !isRabbit ? huntingSuccess / n : undefined,
    };
  }

  private computeAggregate(day: number): Aggregate {
    const grassAvg =
      this.grass.length === 0
        ? 0
        : this.grass.reduce((sum, g) => sum + g.amount, 0) /
          (this.grass.length * this.params.environment.grassMaxAmount);
    return {
      day,
      rabbitCount: this.rabbits.length,
      wolfCount: this.wolves.length,
      grassAvg,
      birthsThisPeriod: this.birthsThisPeriod,
      deathsThisPeriod: this.deathsThisPeriod,
      rabbit: this.speciesAggregate(this.rabbits, this.params),
      wolf: this.speciesAggregate(this.wolves, this.params),
    };
  }

  private recordDay() {
    const agg = this.computeAggregate(this.day);
    this.history.record(this.day, agg.rabbitCount, agg.wolfCount, agg.grassAvg);
    this.eventLog.detect(this.lastAggregate, agg);
    this.lastAggregate = agg;
    this.birthsThisPeriod = 0;
    this.deathsThisPeriod = 0;
  }
}
