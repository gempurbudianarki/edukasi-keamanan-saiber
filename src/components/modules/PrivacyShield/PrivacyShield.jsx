import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { initialPrivacySettings, calculatePrivacyScore } from '../../../data/privacyData';
import { playSound } from '../../../utils/soundEffects';
import { SocialProfilePreview } from './components/SocialProfilePreview';
import { PrivacySettingsToggles } from './components/PrivacySettingsToggles';
import './PrivacyShield.css';

export function PrivacyShield({ onBack, onComplete, initialScore = 0 }) {
  const [settings, setSettings] = useState(initialPrivacySettings);
  const [score, setScore] = useState(initialScore);

  const evaluation = calculatePrivacyScore(settings);

  const handleToggle = (key) => {
    playSound('click');
    setSettings(prev => {
      const next = { ...prev, [key]: !prev[key] };
      const nextEval = calculatePrivacyScore(next);
      if (nextEval.score >= 80) {
        if (score < 100) {
          playSound('success');
          setScore(100);
          onComplete(100);
        }
      }
      return next;
    });
  };

  return (
    <div className="module-page container">
      <div className="module-header">
        <button className="module-nav-back" onClick={onBack}>
          <ArrowLeft size={16} /> Kembali ke Misi Hub
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-amber">Misi 04: Privacy Shield</span>
          <span className={`badge ${evaluation.statusBadge}`}>
            Skor Privasi: {evaluation.score}%
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <SocialProfilePreview settings={settings} />
        <PrivacySettingsToggles settings={settings} onToggle={handleToggle} />
      </div>
    </div>
  );
}
