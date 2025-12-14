import { useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import { wordSets } from './data/wordSets';
import { DifficultySelect } from './components/DifficultySelect';
import { PictureCard } from './components/PictureCard';
import { SortingBucket } from './components/SortingBucket';
import { ScoreDisplay } from './components/ScoreDisplay';
import { RoundComplete } from './components/RoundComplete';
import './styles/game.css';

function App() {
  const [difficulty, setDifficulty] = useState(null);
  const [currentRoundIndex, setCurrentRoundIndex] = useState(0);
  const [score, setScore] = useState({ correct: 0, attempts: 0 });
  const [placedCards, setPlacedCards] = useState({});
  const [isRoundComplete, setIsRoundComplete] = useState(false);
  const [feedback, setFeedback] = useState(null);

  if (!difficulty) {
    return <DifficultySelect onSelectDifficulty={setDifficulty} />;
  }

  const rounds = wordSets[difficulty];
  const currentRound = rounds[currentRoundIndex];

  if (!currentRound) {
    return (
      <div className="game-complete">
        <h1>🎉 All Done! 🎉</h1>
        <p>Great job practicing your sounds!</p>
        <button onClick={() => {
          setDifficulty(null);
          setCurrentRoundIndex(0);
          setScore({ correct: 0, attempts: 0 });
          setPlacedCards({});
          setIsRoundComplete(false);
        }}>
          Play Again
        </button>
      </div>
    );
  }

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) return;

    const draggedCard = currentRound.words.find(w => w.id === active.id);
    const targetBucket = over.id;

    setScore(prev => ({ ...prev, attempts: prev.attempts + 1 }));

    if (draggedCard.sound === targetBucket) {
      setPlacedCards(prev => ({
        ...prev,
        [draggedCard.id]: targetBucket
      }));
      setScore(prev => ({ ...prev, correct: prev.correct + 1 }));
      setFeedback({ type: 'correct', cardId: draggedCard.id });

      setTimeout(() => setFeedback(null), 500);

      const newPlacedCards = { ...placedCards, [draggedCard.id]: targetBucket };
      const allPlaced = currentRound.words.every(w => newPlacedCards[w.id]);

      if (allPlaced) {
        setTimeout(() => setIsRoundComplete(true), 800);
      }
    } else {
      setFeedback({ type: 'incorrect', cardId: draggedCard.id });
      setTimeout(() => setFeedback(null), 500);
    }
  };

  const handleNextRound = () => {
    setCurrentRoundIndex(prev => prev + 1);
    setPlacedCards({});
    setIsRoundComplete(false);
  };

  const handleSkipRound = () => {
    setCurrentRoundIndex(prev => prev + 1);
    setPlacedCards({});
    setIsRoundComplete(false);
  };

  if (isRoundComplete) {
    return (
      <RoundComplete
        correct={score.correct}
        attempts={score.attempts}
        onNextRound={handleNextRound}
      />
    );
  }

  const bucketWords = {};
  currentRound.buckets.forEach(bucket => {
    bucketWords[bucket] = currentRound.words.filter(
      w => placedCards[w.id] === bucket
    );
  });

  const testAudio = () => {
    const utterance = new SpeechSynthesisUtterance('Testing audio');
    window.speechSynthesis.speak(utterance);
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="app">
        <header className="app-header">
          <h1>Sort & Sound</h1>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '10px' }}>
            <button onClick={testAudio} style={{ padding: '10px 20px', fontSize: '16px' }}>
              🔊 Test Audio
            </button>
            <button onClick={handleSkipRound} style={{ padding: '10px 20px', fontSize: '16px', background: '#f59e0b', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}>
              ⏭️ Skip Round
            </button>
          </div>
          <ScoreDisplay correct={score.correct} attempts={score.attempts} />
        </header>

        <div className="buckets-container">
          {currentRound.buckets.map(bucket => (
            <SortingBucket
              key={bucket}
              id={bucket}
              sound={bucket}
              placedWords={bucketWords[bucket]}
            />
          ))}
        </div>

        <div className="cards-container">
          {currentRound.words.map(word => (
            <PictureCard
              key={word.id}
              id={word.id}
              word={word.word}
              emoji={word.emoji}
              isPlaced={!!placedCards[word.id]}
            />
          ))}
        </div>

        {feedback && (
          <div className={`feedback ${feedback.type}`}>
            {feedback.type === 'correct' ? '✓ Great job!' : '✗ Try again!'}
          </div>
        )}
      </div>
    </DndContext>
  );
}

export default App;
