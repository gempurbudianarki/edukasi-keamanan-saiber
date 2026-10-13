import React, { useState, useEffect } from 'react';
import { ArrowLeft, KeyRound, Smartphone, Terminal } from 'lucide-react';
import { playSound } from '../../../utils/soundEffects';
import { syncRouteToUrl, getRouteParams } from '../../../utils/navigation';
import { AttackDemoView } from './views/AttackDemoView';
import { ActivationPracticeView } from './views/ActivationPracticeView';
import './TwoFactorShield.css';

export function TwoFactorShield({ onBack, onComplete, initialScore = 0 }) {
  const [activeTab, setActiveTab] = useState(() => {
    const params = getRouteParams();
    return params.tab === 'practice' ? 'practice' : 'demo';
  });
  const [score, setScore] = useState(initialScore);

  const handleTabChange = (tab) => {
    playSound('beep');
    setActiveTab(tab);
    syncRouteToUrl('twoFactor', tab);
  };

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
          <span className="badge badge-red">Misi 02: Benteng 2FA</span>
          <span className="badge badge-green">Skor: {score}/100</span>
        </div>
      </div>

      {/* Mode navigation tabs */}
      <div className="mode-nav-tabs" style={{ marginBottom: '20px' }}>
        <button
          className={`mode-tab-btn ${activeTab === 'demo' ? 'active' : ''}`}
          onClick={() => handleTabChange('demo')}
        >
          <Terminal size={16} />
          <span>Demo Serangan Hacker</span>
        </button>

        <button
          className={`mode-tab-btn ${activeTab === 'practice' ? 'active' : ''}`}
          onClick={() => handleTabChange('practice')}
        >
          <Smartphone size={16} />
          <span>Praktik Aktivasi 2FA</span>
        </button>
      </div>

      {/* Tab views */}
      {activeTab === 'demo' && (
        <AttackDemoView onProceedToPractice={() => handleTabChange('practice')} />
      )}

      {activeTab === 'practice' && (
        <ActivationPracticeView onCompletePractice={handleComplete} />
      )}
    </div>
  );
}
