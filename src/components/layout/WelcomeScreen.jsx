import React, { useState } from 'react';
import { 
  ShieldAlert, 
  ArrowRight, 
  KeyRound, 
  Key, 
  EyeOff, 
  Radar, 
  Sparkles, 
  User, 
  CheckCircle,
  Award,
  BookOpen,
  Shield,
  Edit3,
  AlertCircle,
  FileText,
  Compass
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';
import './WelcomeScreen.css';

export function WelcomeScreen({ studentName, onSaveName, onStartSimulation, onStartPreTest }) {
  const [nameInput, setNameInput] = useState(studentName || '');
  const [isEditing, setIsEditing] = useState(!studentName);
  const [errorMessage, setErrorMessage] = useState('');

  const handleValidateAndSave = () => {
    const trimmed = nameInput.trim();
    if (!trimmed || trimmed.length < 2) {
      playSound('beep');
      setErrorMessage('Nama wajib diisi (minimal 2 huruf)! Jangan biarkan kosong.');
      return false;
    }
    setErrorMessage('');
    onSaveName(trimmed);
    playSound('success');
    setIsEditing(false);
    return true;
  };

  const handleStartDirectly = () => {
    if (isEditing) {
      const isValid = handleValidateAndSave();
      if (!isValid) return;
    }
    playSound('success');
    onStartSimulation();
  };

  const handleStartPreTestDirectly = () => {
    if (isEditing) {
      const isValid = handleValidateAndSave();
      if (!isValid) return;
    }
    playSound('success');
    if (onStartPreTest) {
      onStartPreTest();
    } else {
      onStartSimulation();
    }
  };

  return (
    <div className="welcome-container container anim-fade-in-up">
      {/* Top Banner Ribbon */}
      <div className="welcome-ribbon">
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
          PROGRAM PENGABDIAN KEPADA MASYARAKAT (PKM)
        </span>
        <span>UNIVERSITAS BINA BANGSA GETSEMPENA (UBBG) BANDA ACEH</span>
      </div>

      {/* Main Welcome Card */}
      <div className="welcome-card">
        <div className="welcome-header">
          <div className="welcome-logo-hero-wrap">
            <img src="/logo.png" alt="Logo CyberGenZ UBBG" className="welcome-hero-logo anim-float" />
          </div>

          <div className="welcome-badge">
            <span className="welcome-dot-red" />
            LITERASI KEAMANAN SIBER GENERASI Z
          </div>
          <h1 className="welcome-title">
            Selamat Datang di Portal <span className="text-red">Simulasi Keamanan Siber</span>
          </h1>
          <p className="welcome-lead">
            Platform edukasi dan evaluasi terpadu untuk membekali siswa dalam mendeteksi tautan phishing, 
            mengamankan akun dengan verifikasi dua langkah (2FA), menangkal malware & peretasan, 
            serta melindungi privasi digital siswa di era modern.
          </p>
        </div>

        {/* Personalized Agent Greeting or Name Registration */}
        {!isEditing && (studentName || nameInput.trim()) ? (
          <div className="agent-greeting-card">
            <div className="agent-card-left">
              <div className="agent-avatar-circle">
                <img src="/logo.png" alt="CyberGenZ Emblem" className="agent-avatar-logo" />
              </div>
              <div className="agent-greeting-info">
                <div className="agent-greeting-tag">
                  <span className="welcome-dot-red" />
                  IDENTITAS AGEN TERVERIFIKASI
                </div>
                <h2 className="agent-greeting-title">
                  Selamat Datang, <span className="agent-highlight-name">Agen {studentName || nameInput.trim()}</span>! <Shield size={22} className="agent-title-shield" />
                </h2>
                <p className="agent-greeting-desc">
                  Data analisismu telah tersimpan di sistem PKM UBBG 2026. Alur dimulai dari <strong>Tahap 1: Pre-Test (15 Soal)</strong>, dilanjutkan <strong>2 Modul Praktik</strong>, dan diakhiri <strong>Post-Test</strong>.
                </p>
              </div>
            </div>

            <div className="agent-greeting-actions">
              <button
                id="btn-start-pretest-welcome"
                className="btn btn-cyan"
                onClick={handleStartPreTestDirectly}
                title="Mulai Ujian Diagnostik Awal Pre-Test"
              >
                <Compass size={18} />
                <span>Mulai Pre-Test (15 Soal)</span>
              </button>

              <button
                id="btn-start-simulation-welcome"
                className="btn btn-primary"
                onClick={handleStartDirectly}
                title="Buka Hub Seluruh Misi"
              >
                <span>Masuk ke Hub Misi</span>
                <ArrowRight size={18} />
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => {
                  playSound('click');
                  setIsEditing(true);
                }}
                title="Ganti Nama Siswa"
              >
                <Edit3 size={15} />
                <span>Ubah Nama</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="welcome-name-box">
            <label htmlFor="student-name-input" className="name-box-label">
              <User size={18} />
              Masukkan Nama Lengkap Kamu untuk Memulai:
            </label>
            <div className="name-input-row">
              <input
                id="student-name-input"
                type="text"
                className={`name-input-field ${errorMessage ? 'input-error' : ''}`}
                placeholder="Contoh: Muhammad Rizky / Siti Sarah"
                value={nameInput}
                onChange={(e) => {
                  setNameInput(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleStartPreTestDirectly();
                  }
                }}
                autoFocus
              />
              <button
                id="btn-save-name-pretest-welcome"
                className="btn btn-cyan"
                onClick={handleStartPreTestDirectly}
                title="Simpan nama dan langsung mulai Pre-Test"
              >
                <Compass size={18} />
                <span>Mulai Pre-Test</span>
              </button>
              <button
                id="btn-save-name-welcome"
                className="btn btn-yellow"
                onClick={handleStartDirectly}
                title="Simpan nama dan buka Hub Misi"
              >
                <span>Buka Hub Misi</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {errorMessage ? (
              <div className="name-error-message">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            ) : (
              <p className="name-box-hint">
                *Tekan <strong>Enter</strong> atau klik <strong>Mulai Pre-Test</strong>. Nama tidak boleh kosong agar evaluasi literasimu tercatat secara resmi.
              </p>
            )}
          </div>
        )}

        {/* 4 Steps Learning Pathway Preview */}
        <div className="welcome-preview-section anim-fade-in-up anim-stagger-1">
          <h3 className="preview-heading">
            <BookOpen size={18} />
            Alur Terstruktur PKM UBBG 2026 (4 Tahapan Terpadu):
          </h3>

          <div className="welcome-grid-4">
            <div 
              className="preview-item anim-fade-in-up anim-stagger-1"
              onClick={handleStartPreTestDirectly}
              title="Klik untuk langsung memulai Pre-Test"
              role="button"
              tabIndex={0}
            >
              <div className="preview-icon-box" style={{ background: 'var(--nb-cyan)', color: '#000000' }}>
                <Compass size={22} />
              </div>
              <div className="preview-content">
                <h4>Tahap 1: Pre-Test</h4>
                <p>15 Butir Soal Diagnostik untuk mengukur pemahaman awal sebelum simulasi interaktif.</p>
              </div>
            </div>

            <div 
              className="preview-item anim-fade-in-up anim-stagger-2"
              onClick={handleStartDirectly}
              title="Klik untuk membuka Hub Misi Praktik"
              role="button"
              tabIndex={0}
            >
              <div className="preview-icon-box" style={{ background: 'var(--nb-coral-red)', color: '#ffffff' }}>
                <Radar size={22} />
              </div>
              <div className="preview-content">
                <h4>Tahap 2: Phishing Radar</h4>
                <p>Simulasi tautan palsu, bedah domain palsu vs resmi (.go.id), dan inspeksi SPF/DKIM.</p>
              </div>
            </div>

            <div 
              className="preview-item anim-fade-in-up anim-stagger-3"
              onClick={handleStartDirectly}
              title="Klik untuk membuka Hub Misi Praktik"
              role="button"
              tabIndex={0}
            >
              <div className="preview-icon-box" style={{ background: 'var(--nb-green)', color: '#000000' }}>
                <KeyRound size={22} />
              </div>
              <div className="preview-content">
                <h4>Tahap 3: Benteng 2FA</h4>
                <p>Simulasi bot brute-force hacker yang dibendung oleh verifikasi dua langkah OTP 6-digit.</p>
              </div>
            </div>

            <div 
              className="preview-item anim-fade-in-up anim-stagger-4"
              onClick={handleStartDirectly}
              title="Klik untuk membuka Post-Test di Hub Misi"
              role="button"
              tabIndex={0}
            >
              <div className="preview-icon-box" style={{ background: 'var(--nb-yellow)', color: '#000000' }}>
                <FileText size={22} />
              </div>
              <div className="preview-content">
                <h4>Tahap 4: Post-Test</h4>
                <p>15 Butir Soal Evaluasi Akhir untuk mengukur peningkatan literasi keamanan siber (N-Gain).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Badges Footer */}
        <div className="welcome-footer-badges">
          <div className="feature-pill">
            <CheckCircle size={15} color="#dc2626" />
            <span>Pre-Test & Post-Test Terstandar (30 Soal)</span>
          </div>
          <div className="feature-pill">
            <CheckCircle size={15} color="#dc2626" />
            <span>2 Modul Simulasi Realistis 1:1</span>
          </div>
          <div className="feature-pill">
            <CheckCircle size={15} color="#dc2626" />
            <span>Perhitungan Otomatis Kenaikan Literasi (N-Gain)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
