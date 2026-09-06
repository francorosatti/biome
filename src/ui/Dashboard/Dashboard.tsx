import { useSimStore } from '../../state/simStore';
import './Dashboard.css';

export function Dashboard() {
  const aggregate = useSimStore((s) => s.aggregate);
  const day = useSimStore((s) => s.day);

  if (!aggregate) return null;

  return (
    <div className="dashboard">
      <div className="dashboard-title">DAY {day}</div>
      <div className="dashboard-row">
        <span className="label rabbit">Rabbits</span>
        <span className="value">{aggregate.rabbitCount}</span>
      </div>
      <div className="dashboard-row">
        <span className="label wolf">Wolves</span>
        <span className="value">{aggregate.wolfCount}</span>
      </div>
      <div className="dashboard-row">
        <span className="label grass">Grass</span>
        <span className="value">{Math.round(aggregate.grassAvg * 100)}%</span>
      </div>
      <div className="dashboard-divider" />
      <div className="dashboard-row">
        <span className="label">Births</span>
        <span className="value">{aggregate.birthsThisPeriod}</span>
      </div>
      <div className="dashboard-row">
        <span className="label">Deaths</span>
        <span className="value">{aggregate.deathsThisPeriod}</span>
      </div>
    </div>
  );
}
