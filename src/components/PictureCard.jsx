import { useDraggable } from '@dnd-kit/core';
import { useAudio } from '../hooks/useAudio';
import { useEffect, useRef } from 'react';

export function PictureCard({ id, word, emoji, isPlaced }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id,
    disabled: isPlaced,
  });
  const { speak } = useAudio();
  const wasDragging = useRef(false);

  useEffect(() => {
    if (isDragging && !wasDragging.current) {
      speak(word);
      wasDragging.current = true;
    } else if (!isDragging) {
      wasDragging.current = false;
    }
  }, [isDragging, word, speak]);

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    opacity: isDragging ? 0.5 : 1,
  } : undefined;

  if (isPlaced) {
    return null;
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`picture-card ${isDragging ? 'dragging' : ''}`}
      {...listeners}
      {...attributes}
    >
      <div className="emoji">{emoji}</div>
      <div className="word">{word}</div>
      <div className="audio-hint">🔊</div>
    </div>
  );
}
