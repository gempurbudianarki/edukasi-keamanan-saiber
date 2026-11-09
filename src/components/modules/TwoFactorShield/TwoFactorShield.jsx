import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  KeyRound, 
  Smartphone, 
  Terminal, 
  ShieldCheck, 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  RotateCcw,
  Zap,
  Layers
} from 'lucide-react';
import { playSound } from '../../../utils/soundEffects';
import { syncRouteToUrl, getRouteParams } from '../../../utils/navigation';
import { getTwoFactorSession, saveTwoFactorSession, resetTwoFactorSession } from '../../../utils/storage';
import { AttackDemoView } from './views/AttackDemoView';
import { ActivationPracticeView } from './views/ActivationPracticeView';
import { CriticalThinkingView } from './views/CriticalThinkingView';
import { MasteryVictoryView } from './views/MasteryVictoryView';
import './TwoFactorShield.css';

export function TwoFactorShield({ onBack, onComplete, onNavigatePostTest, initialScore = 0 }) {
  const [session, setSession] = useState(() => getTwoFactorSession());
  const [activeTab, setActiveTab] = useState(() => {
    const params = getRouteParams();
    const validTabs = ['demo', 'practice', 'drills', 'victory'];
    if (validTabs.includes(params.tab)) return params.tab;
    return session?.activeTab || 'demo';
  });
  const [score, setScore] = useState(() => session?.score || initialScore);
  const [completedTabs, setCompletedTabs] = useState(() => {
    const initial = ['demo'];
    if (session?.completedTabs?.length) return session.completedTabs;
    if (initialScore >= 100) return ['demo', 'practice', 'drills', 'victory'];
    if (initialScore > 0) return ['demo', 'practice'];
    return initial;
  });
  const [drillScores, setDrillScores] = useState(() => session?.drillScores || {});
  const [selectedAnswers, setSelectedAnswers] = useState(() => session?.selectedAnswers || {});

  // Sync to localStorage
  useEffect(() => {
    saveTwoFactorSession({
      activeTab,
      completedTabs,
      drillScores,
      selectedAnswers,
      score
    });
  }, [activeTab, completedTabs, drillScores, selectedAnswers, score]);

  const handleTabChange = (tab) => {
    playSound('beep');
    setActiveTab(tab);
    syncRouteToUrl('twoFactor', tab);
  };

  const handleProceedFromDemo = () => {
    setCompletedTabs(prev => Array.from(new Set([...prev, 'demo', 'practice'])));
    handleTabChange('practice');
  };

  const handleProceedFromPractice = () => {
    setCompletedTabs(prev => Array.from(new Set([...prev, 'practice', 'drills'])));
    handleTabChange('drills');
  };

  const handleCompleteAllDrills = (finalScore = 100, scores = {}, answers = {}) => {
    const calculatedScore = finalScore;
    setScore(calculatedScore);
    setDrillScores(scores);
    setSelectedAnswers(answers);
    setCompletedTabs(['demo', 'practice', 'drills', 'victory']);
    if (onComplete) {
      onComplete(calculatedScore);
    }
    handleTabChange('victory');
  };

  const handleRetakeAll = () => {
    playSound('click');
    resetTwoFactorSession();
    setScore(0);
    setDrillScores({});
    setSelectedAnswers({});
    setCompletedTabs(['demo']);
    handleTabChange('demo');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const stages = [
    { id: 'demo', label: '1. Demo Serangan', icon: Terminal, desc: 'Brute-Force vs Smartphone' },
    { id: 'practice', label: '2. Setup 2FA 1:1', icon: Smartphone, desc: 'Scan QR & Kunci TOTP' },
    { id: 'drills', label: '3. Berpikir Kritis', icon: Zap, desc: '4 Kasus Nyata Serangan 2FA' },
    { id: 'victory', label: '4. Kelulusan Misi', icon: ShieldCheck, desc: 'Sertifikasi & Skor Paripurna' }
  ];

  return (
    <div className="module-page container twofa-module-wrapper">
      {/* Module Header Bar */}
      <div className="module-header no-print">
        <button 
          id="btn-back-hub-twofa"
          className="module-nav-back" 
          onClick={onBack}
        >
          <ArrowLeft size={16} /> Kembali ke Misi Hub
        </button>

        <div className="twofa-header-badges">
          <span className="badge badge-red">
            <KeyRound size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            Misi 02: Benteng 2FA
          </span>
          <span className={`badge ${score >= 70 ? 'badge-green' : 'badge-yellow'}`}>
            Skor: {score}/100 Poin
          </span>
        </div>
      </div>

      {/* 4-Stage Stepper Navigation Bar */}
      <div className="twofa-stepper-nav no-print">
        {stages.map((stage) => {
          const isActive = activeTab === stage.id;
          const isDone = completedTabs.includes(stage.id) && !isActive;
          const StageIcon = stage.icon;

          let btnClass = 'twofa-stepper-btn';
          if (isActive) btnClass += ' active-step';
          if (isDone) btnClass += ' done-step';

          return (
            <button
              key={stage.id}
              id={`btn-tab-twofa-${stage.id}`}
              className={btnClass}
              onClick={() => handleTabChange(stage.id)}
            >
              <span className="stepper-icon-box">
                {isDone ? (
                  <CheckCircle2 size={15} className="text-green" />
                ) : (
                  <StageIcon size={15} />
                )}
              </span>
              <span className="stepper-label">{stage.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tahap 1: Demo Serangan Hacker vs Smartphone */}
      {activeTab === 'demo' && (
        <AttackDemoView onProceedToPractice={handleProceedFromDemo} />
      )}

      {/* Tahap 2: Praktik Setup 2FA 1:1 */}
      {activeTab === 'practice' && (
        <ActivationPracticeView 
          onCompletePractice={() => setScore(prev => Math.max(prev, 60))}
          onProceedToDrills={handleProceedFromPractice}
        />
      )}

      {/* Tahap 3: Uji Berpikir Kritis 2FA */}
      {activeTab === 'drills' && (
        <CriticalThinkingView 
          savedScores={drillScores}
          savedAnswers={selectedAnswers}
          onCompleteAllDrills={handleCompleteAllDrills} 
        />
      )}

      {/* Tahap 4: Kelulusan Misi & Kelanjutan Belajar */}
      {activeTab === 'victory' && (
        <MasteryVictoryView 
          score={score}
          onRetake={handleRetakeAll}
          onBackToHub={onBack}
          onNavigatePostTest={onNavigatePostTest}
        />
      )}
    </div>
  );
}
