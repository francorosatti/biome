import { useSimStore } from '../../state/simStore';
import './SpeciesStats.css';

export function SpeciesStats() {
  const aggregate = useSimStore((s) => s.aggregate);
  if (!aggregate) return null;

  const { rabbit, wolf } = aggregate;

  return (
    <div className="species-stats">
      <div className="species-stats-title">Species Statistics</div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Rabbits</th>
            <th>Wolves</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Population</td>
            <td>{rabbit.population}</td>
            <td>{wolf.population}</td>
          </tr>
          <tr>
            <td>Avg speed</td>
            <td>{rabbit.avgSpeed.toFixed(2)}</td>
            <td>{wolf.avgSpeed.toFixed(2)}</td>
          </tr>
          <tr>
            <td>Avg vision</td>
            <td>{rabbit.avgVision.toFixed(1)}</td>
            <td>{wolf.avgVision.toFixed(1)}</td>
          </tr>
          <tr>
            <td>Avg metabolism</td>
            <td>{rabbit.avgMetabolism.toFixed(3)}</td>
            <td>{wolf.avgMetabolism.toFixed(3)}</td>
          </tr>
          <tr>
            <td>Avg repro rate</td>
            <td>{rabbit.avgReproRate.toFixed(3)}</td>
            <td>{wolf.avgReproRate.toFixed(3)}</td>
          </tr>
          <tr>
            <td>Avg age</td>
            <td>{rabbit.avgAge.toFixed(1)}</td>
            <td>{wolf.avgAge.toFixed(1)}</td>
          </tr>
          <tr>
            <td>Avg fear / hunting</td>
            <td>{rabbit.avgFear?.toFixed(2) ?? '—'}</td>
            <td>{wolf.avgHuntingSuccess?.toFixed(2) ?? '—'}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
