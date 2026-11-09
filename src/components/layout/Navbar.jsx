import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Volume2, 
  VolumeX, 
  Monitor, 
  RotateCcw, 
  Home, 
  FileText,
  Layers,
  Sparkles,
  Compass
} from 'lucide-react';
import { toggleAudioMute, getAudioMutedStatus, playSound } from '../../utils/soundEffects';
import { ResetConfirmModal } from './ResetConfirmModal';

export function Navbar({ 
  progress, 
  onReset, 
  isPresenterMode, 
  onTogglePresenter,
  onNavigateHome,
  onNavigateHub,
  onNavigatePreTest,
  onNavigatePostTest,
  currentView
}) {
  const [muted, setMuted] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  useEffect(() => {
    setMuted(getAudioMutedStatus());
  }, []);

  const handleSoundToggle = () => {
    const isNowMuted = toggleAudioMute();
    setMuted(isNowMuted);
    if (!isNowMuted) {
      playSound('click');
    }
  };

  const completedPracticeCount = ['phishing', 'twoFactor'].filter(id => progress?.completedMissions?.[id]).length;
  const isPreTestDone = Boolean(progress?.completedMissions?.preTest);
  const isPostTestDone = Boolean(progress?.completedMissions?.postTest);

  return (
    <header className="navbar-container">
      {/* Cyber Ticker Ribbon */}
      <div className="cyber-ticker-wrapper">
        <div className="cyber-ticker-track">
          <div className="ticker-item"><span className="ticker-dot" /> LIVE CYBER RADAR</div>
          <div className="ticker-item"><span className="ticker-dot" /> TAHAP 1: PRE-TEST DIAGNOSTIK (15 SOAL)</div>
          <div className="ticker-item"><span className="ticker-dot" /> TAHAP 2: MISI 1 (PHISHING RADAR) & MISI 2 (BENTENG 2FA)</div>
          <div className="ticker-item"><span className="ticker-dot" /> TAHAP 3: POST-TEST EVALUASI LITERASI (15 SOAL)</div>
          <div className="ticker-item"><span className="ticker-dot" /> PKM UBBG BANDA ACEH 2026</div>
          <div className="ticker-item"><span className="ticker-dot" /> LIVE CYBER RADAR</div>
          <div className="ticker-item"><span className="ticker-dot" /> TAHAP 1: PRE-TEST DIAGNOSTIK (15 SOAL)</div>
          <div className="ticker-item"><span className="ticker-dot" /> TAHAP 2: MISI 1 (PHISHING RADAR) & MISI 2 (BENTENG 2FA)</div>
          <div className="ticker-item"><span className="ticker-dot" /> TAHAP 3: POST-TEST EVALUASI LITERASI (15 SOAL)</div>
          <div className="ticker-item"><span className="ticker-dot" /> PKM UBBG BANDA ACEH 2026</div>
        </div>
      </div>

      <div className="container">
        {/* Main Header Bar */}
        <div className="navbar-content">
          {/* Brand */}
          <div className="navbar-brand-col">
            <div 
              className="navbar-brand" 
              onClick={() => {
                playSound('click');
                onNavigateHome();
              }}
              title="Klik untuk kembali ke Beranda"
            >
              <div className="brand-icon">
                <img src="/logo.png" alt="CyberGenZ Logo" className="brand-logo-img" />
              </div>
              <div className="brand-text-block">
                <div className="brand-title">
                  CyberGenZ <span className="brand-tag">UBBG</span>
                </div>
              </div>
            </div>
          </div>

          {/* Center Stage Navigation Pills (Desktop) */}
          <nav className="navbar-nav-center hide-mobile">
            {/* Beranda Link */}
            <button
              id="btn-nav-welcome-dt"
              className={`nav-seg-pill ${currentView === 'welcome' ? 'active-pill' : ''}`}
              onClick={() => {
                playSound('click');
                onNavigateHome();
              }}
            >
              <Home size={14} />
              <span>Beranda</span>
            </button>

            {/* Pre-Test Link */}
            <button
              id="btn-nav-pretest-dt"
              className={`nav-seg-pill ${currentView === 'preTest' ? 'active-pill' : ''}`}
              onClick={() => {
                playSound('click');
                if (onNavigatePreTest) onNavigatePreTest();
              }}
              title="Buka Pre-Test Diagnostik (15 Soal)"
            >
              <Compass size={14} />
              <span>Pre-Test</span>
              <span className="nav-seg-badge">15</span>
            </button>

            {/* Misi Praktik Link with integrated live counter */}
            <button
              id="btn-nav-hub-dt"
              className={`nav-seg-pill ${currentView === 'hub' || currentView === 'phishing' || currentView === 'twoFactor' ? 'active-pill' : ''}`}
              onClick={() => {
                playSound('click');
                if (onNavigateHub) onNavigateHub();
              }}
              title="Buka 2 Misi Praktik Interaktif"
            >
              <Layers size={14} />
              <span>Misi Praktik</span>
              <span className={`nav-seg-badge ${completedPracticeCount > 0 ? 'badge-green-accent' : ''}`}>
                {completedPracticeCount}/2
              </span>
            </button>

            {/* Post-Test Link */}
            <button
              id="btn-nav-posttest-dt"
              className={`nav-seg-pill ${currentView === 'postTest' ? 'active-pill' : ''}`}
              onClick={() => {
                playSound('click');
                if (onNavigatePostTest) onNavigatePostTest();
              }}
              title="Buka Post-Test Evaluasi (15 Soal)"
            >
              <FileText size={14} />
              <span>Post-Test</span>
              <span className="nav-seg-badge">15</span>
            </button>
          </nav>

          {/* Right: Agent Profile & Quick Tools (Desktop) */}
          <div className="navbar-right-tools hide-mobile">
            {progress?.studentName && (
              <div 
                className="student-name-pill"
                onClick={() => {
                  playSound('click');
                  onNavigateHome();
                }}
                title={`Agen: ${progress.studentName} (Klik untuk ganti)`}
              >
                <span className="student-dot-pulse" />
                <span className="student-name-text">Agen {progress.studentName}</span>
              </div>
            )}

            <div className="navbar-toolstrip">
              {/* Projector / Presenter Mode */}
              <button
                id="btn-presenter-mode"
                className={`tool-icon-btn ${isPresenterMode ? 'active-tool' : ''}`}
                onClick={() => {
                  playSound('click');
                  onTogglePresenter();
                }}
                title={isPresenterMode ? 'Mode Proyektor Aktif' : 'Mode Layar Proyektor'}
              >
                <Monitor size={15} />
              </button>

              {/* Sound Mute Toggle */}
              <button
                id="btn-toggle-sound"
                className="tool-icon-btn"
                onClick={handleSoundToggle}
                title={muted ? 'Nyalakan Efek Suara' : 'Matikan Suara'}
              >
                {muted ? <VolumeX size={15} color="#000000" /> : <Volume2 size={15} color="#000000" />}
              </button>

              {/* Reset Button */}
              <button
                id="btn-reset-progress"
                className="tool-icon-btn"
                onClick={() => {
                  playSound('click');
                  setIsResetModalOpen(true);
                }}
                title="Reset Semua Latihan"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>

          {/* Actions on Mobile (Top Row: Compact 2-Button Group, Zero Wrap) */}
          <div className="navbar-actions-mobile show-mobile-only">
            {/* Sound Toggle */}
            <button
              id="btn-toggle-sound-mb"
              className="btn-icon-mobile"
              onClick={handleSoundToggle}
              title={muted ? 'Suara Mati' : 'Suara Aktif'}
              aria-label="Toggle Suara"
            >
              {muted ? <VolumeX size={16} color="#000000" /> : <Volume2 size={16} color="#000000" />}
            </button>

            {/* Reset Button */}
            <button
              id="btn-reset-progress-mb"
              className="btn-icon-mobile"
              onClick={() => {
                playSound('click');
                setIsResetModalOpen(true);
              }}
              title="Reset Latihan"
              aria-label="Reset Latihan"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sub-Navigation Bar (Clean Thumb-friendly Tabs with Live Counters) */}
      <div className="mobile-nav-bar show-mobile-only">
        <div className="mobile-nav-track">
          <button
            className={`mobile-nav-tab ${currentView === 'welcome' ? 'active-mobile-tab' : ''}`}
            onClick={() => {
              playSound('click');
              onNavigateHome();
            }}
          >
            <Home size={13} />
            <span>Beranda</span>
          </button>

          <button
            className={`mobile-nav-tab ${currentView === 'preTest' ? 'active-mobile-tab' : ''}`}
            onClick={() => {
              playSound('click');
              if (onNavigatePreTest) onNavigatePreTest();
            }}
          >
            <Compass size={13} />
            <span>Pre-Test ({isPreTestDone ? 'Tuntas' : '15'})</span>
          </button>

          <button
            className={`mobile-nav-tab ${['hub', 'phishing', 'twoFactor'].includes(currentView) ? 'active-mobile-tab' : ''}`}
            onClick={() => {
              playSound('click');
              if (onNavigateHub) onNavigateHub();
            }}
          >
            <Layers size={13} />
            <span>2 Misi ({completedPracticeCount}/2)</span>
          </button>

          <button
            className={`mobile-nav-tab ${currentView === 'postTest' ? 'active-mobile-tab' : ''}`}
            onClick={() => {
              playSound('click');
              if (onNavigatePostTest) onNavigatePostTest();
            }}
          >
            <FileText size={13} />
            <span>Post-Test ({isPostTestDone ? 'Tuntas' : '15'})</span>
          </button>
        </div>
      </div>

      {/* In-App Reset Confirmation Modal */}
      <ResetConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={onReset}
      />
    </header>
  );
}
