import type { Aggregate } from './types';

export interface SimEvent {
  id: number;
  day: number;
  text: string;
}

const POPULATION_THRESHOLDS = [50, 100, 200, 500];
const GRASS_SCARCE_RATIO = 0.15;
const GRASS_RECOVERED_RATIO = 0.3; // hysteresis: must clearly recover before re-arming the event
const MAX_EVENTS = 100;

let nextEventId = 1;

export class EventLog {
  events: SimEvent[] = [];
  private rabbitsExtinctFired = false;
  private wolvesExtinctFired = false;
  private grassScarceFired = false;

  reset() {
    this.events = [];
    this.rabbitsExtinctFired = false;
    this.wolvesExtinctFired = false;
    this.grassScarceFired = false;
  }

  private push(day: number, text: string) {
    this.events.push({ id: nextEventId++, day, text });
    if (this.events.length > MAX_EVENTS) this.events.shift();
  }

  detect(prev: Aggregate | null, curr: Aggregate) {
    if (!prev) return;

    for (const threshold of POPULATION_THRESHOLDS) {
      if (prev.wolfCount < threshold && curr.wolfCount >= threshold) {
        this.push(curr.day, `Wolf population reached ${threshold}`);
      }
      if (prev.rabbitCount < threshold && curr.rabbitCount >= threshold) {
        this.push(curr.day, `Rabbit population reached ${threshold}`);
      }
    }

    if (prev.rabbitCount > 0 && curr.rabbitCount === 0 && !this.rabbitsExtinctFired) {
      this.push(curr.day, 'Rabbits have gone extinct');
      this.rabbitsExtinctFired = true;
    } else if (curr.rabbitCount > 0) {
      this.rabbitsExtinctFired = false;
    }

    if (prev.wolfCount > 0 && curr.wolfCount === 0 && !this.wolvesExtinctFired) {
      this.push(curr.day, 'Wolves have gone extinct');
      this.wolvesExtinctFired = true;
    } else if (curr.wolfCount > 0) {
      this.wolvesExtinctFired = false;
    }

    if (curr.grassAvg < GRASS_SCARCE_RATIO && !this.grassScarceFired) {
      this.push(curr.day, 'Grass is becoming scarce');
      this.grassScarceFired = true;
    } else if (curr.grassAvg > GRASS_RECOVERED_RATIO) {
      this.grassScarceFired = false;
    }

    if (prev.rabbitCount >= 20 && curr.rabbitCount < prev.rabbitCount * 0.5) {
      this.push(curr.day, 'Rabbit population is declining rapidly');
    }
    if (prev.wolfCount >= 10 && curr.wolfCount < prev.wolfCount * 0.5) {
      this.push(curr.day, 'Wolf population is declining rapidly');
    }
  }
}
