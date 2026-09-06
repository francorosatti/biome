# Rabbit & Wolf

An interactive ecosystem simulation: define the rules governing rabbits, wolves, and grass, run the simulation, and observe the emergent predator-prey dynamics. See `specs/Biome Product Specification.md` for the full product spec.

## Running locally

```sh
npm install
npm run dev
```

Then open the printed local URL in your browser.

## Project structure

- `src/sim/` — the simulation engine (entities, spatial grid, behaviors, energy, reproduction/mutation, events, history, tick loop). Framework-agnostic, no React/Zustand imports.
- `src/state/` — Zustand stores bridging the engine to the UI (live-editable parameters, per-frame simulation snapshots, UI selection state).
- `src/presets/` — starting ecosystem configurations (Balanced, Rabbit Paradise, Wolf World, Food Scarcity, Empty World).
- `src/ui/` — React components (world canvas, controls, dashboard, population chart, event feed, inspector, parameter panels).
