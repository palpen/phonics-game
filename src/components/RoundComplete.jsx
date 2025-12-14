import { useEffect } from 'react';
import { useAudio } from '../hooks/useAudio';

export function RoundComplete({ correct, attempts, onNextRound }) {
  const { celebrate } = useAudio();

  useEffect(() => {
    celebrate();
  }, []);

  return (
    <div className="round-complete">
      <div className="confetti">🎉</div>
      <h2 className="celebration-message">Amazing work!</h2>
      <div className="round-stats">
        <p className="stat-line">You got <strong>{correct}</strong> correct!</p>
        <p className="stat-line">You tried <strong>{attempts}</strong> times!</p>
      </div>
      <button className="next-round-button" onClick={onNextRound}>
        Next Round
      </button>
    </div>
  );
}
