import React, { useState, useEffect } from 'react';
import { Shield, Volume2, VolumeX, Monitor, RotateCcw, Home } from 'lucide-react';
import { toggleAudioMute, getAudioMutedStatus, playSound } from '../../utils/soundEffects';
import { ResetConfirmModal } from './ResetConfirmModal';

export function Navbar({ 
  progress, 
  onReset, 
  isPresenterMode, 
  onTogglePresenter,
  onNavigateHome,
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

  const completedCount = Object.values(progress.completedMissions).filter(Boolean).length;

  return (
    <header className="navbar-container">
      <div className="container">
        <div className="navbar-content">
          <div 
            className="navbar-brand" 
            onClick={() => {
              playSound('click');
              onNavigateHome();
            }}
            title="Klik untuk kembali ke Halaman Selamat Datang"
          >
            <div className="brand-icon">
              <img src="/logo.png" alt="CyberGenZ Logo" className="brand-logo-img" />
            </div>
            <div>
              <div className="brand-title">CyberGenZ <span className="brand-tag">Simulator</span></div>
              <div className="brand-sub">PKM Universitas Bina Bangsa Getsempena (UBBG)</div>
            </div>
          </div>

          <div className="navbar-actions">
            {/* Beranda Button */}
            {currentView !== 'welcome' && (
              <button
                id="btn-nav-welcome"
                className="btn btn-secondary"
                onClick={() => {
                  playSound('click');
                  onNavigateHome();
                }}
                title="Halaman Sambutan & Data Siswa"
              >
                <Home size={16} />
                <span className="hide-mobile">Beranda</span>
              </button>
            )}

            {/* Projector / Presenter Mode */}
            <button
              id="btn-presenter-mode"
              className={`btn btn-secondary ${isPresenterMode ? 'glow-red' : ''}`}
              onClick={() => {
                playSound('click');
                onTogglePresenter();
              }}
              title="Mode Layar Proyektor: Perbesar Teks & Kontras"
            >
              <Monitor size={17} />
              <span className="hide-mobile">{isPresenterMode ? 'Proyektor: ON' : 'Mode Proyektor'}</span>
            </button>

            {/* Sound Mute Toggle */}
            <button
              id="btn-toggle-sound"
              className="btn btn-secondary"
              onClick={handleSoundToggle}
              title={muted ? 'Nyalakan Efek Suara' : 'Matikan Suara'}
            >
              {muted ? <VolumeX size={17} color="#dc2626" /> : <Volume2 size={17} color="#dc2626" />}
            </button>

            {/* Student Name Pill */}
            {progress.studentName && (
              <div 
                className="student-name-pill hide-mobile" 
                title={`Identitas Siswa: ${progress.studentName} (Klik untuk ke Halaman Sambutan)`}
                onClick={() => {
                  playSound('click');
                  onNavigateHome();
                }}
              >
                <span className="student-dot-pulse" />
                <span>Agen {progress.studentName}</span>
              </div>
            )}

            {/* Score Pill */}
            <div className="score-pill" title={`Total Kemajuan: ${completedCount}/4 Misi Selesai`}>
              <div className="score-bar-fill" style={{ width: `${(completedCount / 4) * 100}%` }}></div>
              <span className="score-text">
                <span className="score-number">{completedCount}/4</span> Misi
              </span>
            </div>

            {/* Reset Button */}
            <button
              id="btn-reset-progress"
              className="btn btn-secondary btn-icon-only"
              onClick={() => {
                playSound('click');
                setIsResetModalOpen(true);
              }}
              title="Reset Semua Latihan"
            >
              <RotateCcw size={15} />
            </button>
          </div>
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
