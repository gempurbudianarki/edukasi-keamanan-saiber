import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/layout/Navbar';
import { WelcomeScreen } from './components/layout/WelcomeScreen';
import { MissionHub } from './components/layout/MissionHub';
import { PhishingRadar } from './components/modules/PhishingRadar/PhishingRadar';
import { TwoFactorShield } from './components/modules/TwoFactorShield/TwoFactorShield';
import { PasswordVault } from './components/modules/PasswordVault/PasswordVault';
import { PrivacyShield } from './components/modules/PrivacyShield/PrivacyShield';
import { getStoredProgress, saveStoredProgress, resetStoredProgress } from './utils/storage';
import { playSound } from './utils/soundEffects';

export default function App() {
  // Start on the Welcome screen so user is not directly thrown into everything
  const [currentView, setCurrentView] = useState('welcome');
  const [progress, setProgress] = useState(getStoredProgress());
  const [isPresenterMode, setIsPresenterMode] = useState(false);

  // Presenter Mode handler
  const handleTogglePresenter = () => {
    setIsPresenterMode(prev => {
      const next = !prev;
      const rootElem = document.getElementById('root');
      if (rootElem) {
        if (next) {
          rootElem.classList.add('presenter-mode');
        } else {
          rootElem.classList.remove('presenter-mode');
        }
      }
      return next;
    });
  };

  const handleSelectMission = (missionId) => {
    setCurrentView(missionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHub = () => {
    playSound('click');
    setCurrentView('hub');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    playSound('click');
    setCurrentView('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCompleteMission = (missionId, score) => {
    setProgress(prev => {
      const nextProgress = {
        ...prev,
        scores: {
          ...prev.scores,
          [missionId]: score
        },
        completedMissions: {
          ...prev.completedMissions,
          [missionId]: true
        }
      };
      saveStoredProgress(nextProgress);

      // Check if all 4 missions are completed now
      const completedCount = Object.values(nextProgress.completedMissions).filter(Boolean).length;
      if (completedCount === 4) {
        triggerVictoryConfetti();
      }

      return nextProgress;
    });
  };

  const triggerVictoryConfetti = () => {
    playSound('complete');
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 55,
          origin: { x: 0 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 55,
          origin: { x: 1 }
        });
      }, 350);
    } catch {
      // Ignore if canvas is unsupported
    }
  };

  const handleReset = () => {
    const fresh = resetStoredProgress();
    setProgress(fresh);
    setCurrentView('welcome');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveStudentName = (name) => {
    setProgress(prev => {
      const updated = { ...prev, studentName: name };
      saveStoredProgress(updated);
      return updated;
    });
  };

  return (
    <div className="app-shell">
      {/* Top Navbar */}
      <Navbar
        progress={progress}
        onReset={handleReset}
        isPresenterMode={isPresenterMode}
        onTogglePresenter={handleTogglePresenter}
        onNavigateHome={handleNavigateHome}
        currentView={currentView}
      />

      {/* Main Content Area */}
      <main className="main-content">
        {/* View 0: Welcome Screen */}
        {currentView === 'welcome' && (
          <WelcomeScreen
            studentName={progress.studentName}
            onSaveName={handleSaveStudentName}
            onStartSimulation={() => {
              setCurrentView('hub');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* View 1: Mission Hub */}
        {currentView === 'hub' && (
          <MissionHub
            progress={progress}
            onSelectMission={handleSelectMission}
          />
        )}

        {/* View 2: Phishing Radar */}
        {currentView === 'phishing' && (
          <PhishingRadar
            onBack={handleBackToHub}
            onComplete={(score) => handleCompleteMission('phishing', score)}
            initialScore={progress.scores.phishing}
          />
        )}

        {/* View 3: Two Factor Shield */}
        {currentView === 'twoFactor' && (
          <TwoFactorShield
            onBack={handleBackToHub}
            onComplete={(score) => handleCompleteMission('twoFactor', score)}
            initialScore={progress.scores.twoFactor}
          />
        )}

        {/* View 4: Password Vault */}
        {currentView === 'password' && (
          <PasswordVault
            onBack={handleBackToHub}
            onComplete={(score) => handleCompleteMission('password', score)}
            initialScore={progress.scores.password}
          />
        )}

        {/* View 5: Privacy Shield */}
        {currentView === 'privacy' && (
          <PrivacyShield
            onBack={handleBackToHub}
            onComplete={(score) => handleCompleteMission('privacy', score)}
            initialScore={progress.scores.privacy}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="footer-bar">
        <div className="container footer-content">
          <div>
            <strong>PKM Universitas Bina Bangsa Getsempena (UBBG)</strong> • Banda Aceh 2026
          </div>
          <div style={{ color: '#64748b', fontSize: '0.84rem' }}>
            Bidang Teknis & Praktik: <strong>Gempur Budi Anarki</strong> • Edukasi Literasi Siber Siswa
          </div>
        </div>
      </footer>
    </div>
  );
}
