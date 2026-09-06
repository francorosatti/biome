import { useSimStore } from '../../state/simStore';
import { useUiStore } from '../../state/uiStore';
import './InspectorPanel.css';

export function InspectorPanel() {
  const selectedAnimalId = useUiStore((s) => s.selectedAnimalId);
  const selectedAnimal = useSimStore((s) => s.selectedAnimal);

  if (selectedAnimalId === null) {
    return (
      <div className="inspector-panel empty">Click an animal in the world to inspect it.</div>
    );
  }

  if (!selectedAnimal) {
    return <div className="inspector-panel empty">That animal is no longer alive.</div>;
  }

  const speciesLabel = selectedAnimal.species === 'rabbit' ? 'RABBIT' : 'WOLF';

  return (
    <div className="inspector-panel">
      <div className="inspector-title">
        {speciesLabel} #{selectedAnimal.id}
      </div>
      <div className="inspector-row">
        <span>Age</span>
        <span>{selectedAnimal.age} ticks</span>
      </div>
      <div className="inspector-row">
        <span>Energy</span>
        <span>{Math.round(selectedAnimal.energyPct * 100)}%</span>
      </div>
      <div className="inspector-row">
        <span>Speed</span>
        <span>{selectedAnimal.speed.toFixed(2)}</span>
      </div>
      <div className="inspector-row">
        <span>Vision</span>
        <span>{selectedAnimal.vision.toFixed(1)}</span>
      </div>
      <div className="inspector-row">
        <span>Generation</span>
        <span>{selectedAnimal.generation}</span>
      </div>
      <div className="inspector-divider" />
      <div className="inspector-status">Status: {selectedAnimal.status}</div>
    </div>
  );
}
