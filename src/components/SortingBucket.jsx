import { useDroppable } from '@dnd-kit/core';

const BUCKET_COLORS = {
  'sh': '#3b82f6',
  'ch': '#10b981',
  'th': '#8b5cf6',
  'bl': '#06b6d4',
  'cl': '#f59e0b',
  'st': '#ef4444',
  'sp': '#ec4899',
  'br': '#f97316',
  'gr': '#84cc16',
};

export function SortingBucket({ id, sound, placedWords }) {
  const { setNodeRef, isOver } = useDroppable({ id });

  const backgroundColor = BUCKET_COLORS[sound] || '#6b7280';

  return (
    <div
      ref={setNodeRef}
      className={`sorting-bucket ${isOver ? 'hover' : ''}`}
      style={{ backgroundColor }}
    >
      <div className="bucket-label">{sound.toUpperCase()}</div>
      <div className="bucket-content">
        {placedWords.map((word) => (
          <div key={word.id} className="placed-card">
            <span className="placed-emoji">{word.emoji}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
