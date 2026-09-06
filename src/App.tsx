import './state/engineInstance';
import { WorldCanvas } from './ui/World/WorldCanvas';
import { ControlBar } from './ui/Controls/ControlBar';
import { Dashboard } from './ui/Dashboard/Dashboard';
import { PopulationChart } from './ui/Dashboard/PopulationChart';
import { EventFeed } from './ui/Dashboard/EventFeed';
import { SpeciesStats } from './ui/Dashboard/SpeciesStats';
import { InspectorPanel } from './ui/Inspector/InspectorPanel';
import { RabbitParamsPanel } from './ui/Panels/RabbitParams';
import { WolfParamsPanel } from './ui/Panels/WolfParams';
import { EnvironmentParamsPanel } from './ui/Panels/EnvironmentParams';
import { PresetPicker } from './ui/PresetPicker';
import './App.css';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Rabbit &amp; Wolf</h1>
        <PresetPicker />
      </header>

      <ControlBar />

      <div className="app-body">
        <div className="app-column app-column-world">
          <WorldCanvas />
        </div>

        <div className="app-column app-column-info">
          <Dashboard />
          <InspectorPanel />
          <PopulationChart />
          <EventFeed />
          <SpeciesStats />
        </div>

        <div className="app-column app-column-config">
          <RabbitParamsPanel />
          <WolfParamsPanel />
          <EnvironmentParamsPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
