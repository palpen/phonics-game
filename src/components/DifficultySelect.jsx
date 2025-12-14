export function DifficultySelect({ onSelectDifficulty }) {
  return (
    <div className="difficulty-select">
      <h1 className="game-title">Sort & Sound</h1>
      <p className="game-subtitle">Choose your sounds!</p>
      <div className="difficulty-buttons">
        <button
          className="difficulty-button digraphs"
          onClick={() => onSelectDifficulty('digraphs')}
        >
          <span className="button-icon">📚</span>
          <span className="button-text">Digraphs</span>
          <span className="button-hint">sh, ch, th</span>
        </button>
        <button
          className="difficulty-button blends"
          onClick={() => onSelectDifficulty('blends')}
        >
          <span className="button-icon">🎨</span>
          <span className="button-text">Blends</span>
          <span className="button-hint">bl, cl, st, sp</span>
        </button>
      </div>
    </div>
  );
}
