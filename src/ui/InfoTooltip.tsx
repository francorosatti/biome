import './InfoTooltip.css';

interface InfoTooltipProps {
  text: string;
}

export function InfoTooltip({ text }: InfoTooltipProps) {
  return (
    <span className="info-tooltip" tabIndex={0}>
      <span className="info-tooltip-badge" aria-hidden="true">
        i
      </span>
      <span className="info-tooltip-bubble" role="tooltip">
        {text}
      </span>
    </span>
  );
}
