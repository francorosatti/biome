export interface HistoryPoint {
  day: number;
  rabbits: number;
  wolves: number;
  grassAvg: number;
}

const MAX_POINTS = 2000;

/**
 * Fixed-capacity history with decimation-on-overflow: when the point count
 * hits the cap, resolution is halved and the sampling interval doubled, so
 * memory stays flat across arbitrarily long runs while early detail is
 * progressively (never fully) coarsened.
 */
export class PopulationHistory {
  points: HistoryPoint[] = [];
  private sampleEveryNDays = 1;

  reset() {
    this.points = [];
    this.sampleEveryNDays = 1;
  }

  record(day: number, rabbits: number, wolves: number, grassAvg: number) {
    if (day % this.sampleEveryNDays !== 0) return;
    // Reassign (not push-in-place) so consumers holding the old array
    // reference — e.g. a Zustand store comparing by identity — see the change.
    this.points = [...this.points, { day, rabbits, wolves, grassAvg }];
    if (this.points.length > MAX_POINTS) {
      this.points = this.points.filter((_, i) => i % 2 === 0);
      this.sampleEveryNDays *= 2;
    }
  }
}
