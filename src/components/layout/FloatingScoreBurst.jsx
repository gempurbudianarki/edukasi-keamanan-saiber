import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import './FloatingScoreBurst.css';

export function FloatingScoreBurst({ text = '+25 PTS!', trigger }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (!trigger) return;
    const id = Date.now() + Math.random();
    setItems(prev => [...prev, { id, text }]);

    const timeout = setTimeout(() => {
      setItems(prev => prev.filter(item => item.id !== id));
    }, 1500);

    return () => clearTimeout(timeout);
  }, [trigger, text]);

  if (items.length === 0) return null;

  return (
    <div className="floating-score-container" aria-live="polite" aria-atomic="true">
      {items.map(item => (
        <div key={item.id} className="floating-score-badge">
          <Sparkles size={16} />
          <span>{item.text}</span>
        </div>
      ))}
    </div>
  );
}
