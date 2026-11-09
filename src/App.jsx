import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/layout/Navbar';
import { WelcomeScreen } from './components/layout/WelcomeScreen';
import { MissionHub } from './components/layout/MissionHub';
import { PhishingRadar } from './components/modules/PhishingRadar/PhishingRadar';
import { TwoFactorShield } from './components/modules/TwoFactorShield/TwoFactorShield';
import { PreTest } from './components/modules/PreTest/PreTest';
import { PostTest } from './components/modules/PostTest/PostTest';
import { getStoredProgress, saveStoredProgress, resetStoredProgress } from './utils/storage';
import { playSound } from './utils/soundEffects';
import { resolveCurrentRoute, syncRouteToUrl } from './utils/navigation';

export default function App() {
  // Initialize view from URL route (supports F5 refresh, bookmarks, and direct URLs)
  const [currentView, setCurrentView] = useState(() => resolveCurrentRoute());
  const [progress, setProgress] = useState(getStoredProgress());
  const [isPresenterMode, setIsPresenterMode] = useState(false);

  // Sync with browser URL changes (Back / Forward buttons & direct link edits)
  useEffect(() => {
    const handleUrlChange = () => {
      const activeRoute = resolveCurrentRoute();
      setCurrentView(activeRoute);
    };

    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);

    // Initial sync so the browser URL always reflects the loaded view
    syncRouteToUrl(currentView, null, true);

    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  // Centralized route navigator
  const navigateTo = (view, replace = false) => {
    setCurrentView(view);
    syncRouteToUrl(view, null, replace);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    navigateTo(missionId);
  };

  const handleBackToHub = () => {
    playSound('click');
    navigateTo('hub');
  };

  const handleNavigateHome = () => {
    playSound('click');
    navigateTo('welcome');
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

      // Check if both 2 practice missions or postTest are completed
      const practiceDone = nextProgress.completedMissions?.phishing && nextProgress.completedMissions?.twoFactor;
      if (practiceDone || nextProgress.completedMissions?.postTest) {
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
    navigateTo('welcome', true);
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
        onNavigateHub={handleBackToHub}
        onNavigatePreTest={() => navigateTo('preTest')}
        onNavigatePostTest={() => navigateTo('postTest')}
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
              navigateTo('hub');
            }}
            onStartPreTest={() => {
              navigateTo('preTest');
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

        {/* View: Pre-Test Evaluasi Diagnostik Awal (15 Soal) */}
        {currentView === 'preTest' && (
          <PreTest
            onBack={handleBackToHub}
            onComplete={(score) => handleCompleteMission('preTest', score)}
            onNavigateToHub={handleBackToHub}
            initialScore={progress.scores?.preTest || 0}
            studentName={progress.studentName}
          />
        )}

        {/* View 2: Misi 1 - Phishing Radar & Lab URL */}
        {currentView === 'phishing' && (
          <PhishingRadar
            onBack={handleBackToHub}
            onComplete={(score) => handleCompleteMission('phishing', score)}
            initialScore={progress.scores?.phishing || 0}
          />
        )}

        {/* View 3: Misi 2 - Benteng 2FA */}
        {currentView === 'twoFactor' && (
          <TwoFactorShield
            onBack={handleBackToHub}
            onComplete={(score) => handleCompleteMission('twoFactor', score)}
            onNavigatePostTest={() => navigateTo('postTest')}
            initialScore={progress.scores?.twoFactor || 0}
          />
        )}

        {/* View 4: Post-Test Evaluasi Literasi Siber (15 Soal) */}
        {currentView === 'postTest' && (
          <PostTest
            onBack={handleBackToHub}
            onComplete={(score) => handleCompleteMission('postTest', score)}
            initialScore={progress.scores?.postTest || 0}
            studentName={progress.studentName}
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
            Edukasi Literasi Siber Siswa
          </div>
        </div>
      </footer>
    </div>
  );
}
