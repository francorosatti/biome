import { useSimStore } from '../../state/simStore';
import './EventFeed.css';

export function EventFeed() {
  const events = useSimStore((s) => s.events);
  const recent = events.slice(-8).reverse();

  return (
    <div className="event-feed">
      <div className="event-feed-title">Events</div>
      {recent.length === 0 && <div className="event-empty">No notable events yet.</div>}
      <ul>
        {recent.map((e) => (
          <li key={e.id}>
            <span className="event-day">Day {e.day}</span> {e.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
