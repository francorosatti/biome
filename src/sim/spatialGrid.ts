export interface Point {
  x: number;
  y: number;
}

/**
 * Uniform grid for neighbor queries. `cellSize` must be >= the largest radius
 * ever passed to `queryRadius`, so a query only needs to scan the 3x3
 * neighborhood around the query point's cell.
 */
export class UniformGrid<T extends Point> {
  private cells = new Map<number, T[]>();
  private cols: number;
  private rows: number;
  cellSize: number;

  constructor(width: number, height: number, cellSize: number) {
    this.cellSize = cellSize;
    this.cols = Math.max(1, Math.ceil(width / cellSize));
    this.rows = Math.max(1, Math.ceil(height / cellSize));
  }

  private colOf(x: number): number {
    return clampIndex(Math.floor(x / this.cellSize), this.cols);
  }

  private rowOf(y: number): number {
    return clampIndex(Math.floor(y / this.cellSize), this.rows);
  }

  private key(col: number, row: number): number {
    return row * this.cols + col;
  }

  clear() {
    this.cells.clear();
  }

  insert(item: T) {
    const k = this.key(this.colOf(item.x), this.rowOf(item.y));
    const bucket = this.cells.get(k);
    if (bucket) bucket.push(item);
    else this.cells.set(k, [item]);
  }

  queryRadius(x: number, y: number, radius: number): T[] {
    const col = this.colOf(x);
    const row = this.rowOf(y);
    const result: T[] = [];
    const r2 = radius * radius;
    for (let dr = -1; dr <= 1; dr++) {
      const rr = row + dr;
      if (rr < 0 || rr >= this.rows) continue;
      for (let dc = -1; dc <= 1; dc++) {
        const cc = col + dc;
        if (cc < 0 || cc >= this.cols) continue;
        const bucket = this.cells.get(this.key(cc, rr));
        if (!bucket) continue;
        for (const item of bucket) {
          const dx = item.x - x;
          const dy = item.y - y;
          if (dx * dx + dy * dy <= r2) result.push(item);
        }
      }
    }
    return result;
  }
}

function clampIndex(i: number, size: number): number {
  if (i < 0) return 0;
  if (i >= size) return size - 1;
  return i;
}
