import React, { useState } from 'react';
import { ArrowLeft, KeyRound, Smartphone, Terminal } from 'lucide-react';
import { playSound } from '../../../utils/soundEffects';
import { AttackDemoView } from './views/AttackDemoView';
import { ActivationPracticeView } from './views/ActivationPracticeView';
import './TwoFactorShield.css';

export function TwoFactorShield({ onBack, onComplete, initialScore = 0 }) {
  const [activeTab, setActiveTab] = useState('demo'); // 'demo' | 'practice'
  const [score, setScore] = useState(initialScore);

  const handleComplete = () => {
    setScore(100);
    onComplete(100);
  };

  return (
    <div className="module-page container">
      {/* Header bar */}
      <div className="module-header">
        <button className="module-nav-back" onClick={onBack}>
          <ArrowLeft size={16} /> Kembali ke Misi Hub
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-purple">Misi 02: Benteng 2FA</span>
          <span className="badge badge-cyan">Skor: {score}/100</span>
        </div>
      </div>

      {/* Mode navigation tabs */}
      <div className="mode-nav-tabs" style={{ marginBottom: '20px' }}>
        <button
          className={`mode-tab-btn ${activeTab === 'demo' ? 'active' : ''}`}
          onClick={() => { playSound('beep'); setActiveTab('demo'); }}
        >
          <Terminal size={16} />
          <span>Demo Serangan Hacker</span>
        </button>

        <button
          className={`mode-tab-btn ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => { playSound('beep'); setActiveTab('practice'); }}
        >
          <Smartphone size={16} />
          <span>Praktik Aktivasi 2FA</span>
        </button>
      </div>

      {/* Tab views */}
      {activeTab === 'demo' && (
        <AttackDemoView onProceedToPractice={() => setActiveTab('practice')} />
      )}

      {activeTab === 'practice' && (
        <ActivationPracticeView onCompletePractice={handleComplete} />
      )}
    </div>
  );
}
