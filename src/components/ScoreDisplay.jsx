export function ScoreDisplay({ correct, attempts }) {
  return (
    <div className="score-display">
      <span className="score-item correct">
        <span className="icon">✓</span> {correct} correct
      </span>
      <span className="separator">•</span>
      <span className="score-item attempts">{attempts} tries</span>
    </div>
  );
}
