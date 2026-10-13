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
  AlertCircle
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';
import './WelcomeScreen.css';

export function WelcomeScreen({ studentName, onSaveName, onStartSimulation }) {
  const [nameInput, setNameInput] = useState(studentName || '');
  const [isEditing, setIsEditing] = useState(!studentName);
  const [errorMessage, setErrorMessage] = useState('');

  const handleValidateAndSave = () => {
    const trimmed = nameInput.trim();
    if (!trimmed || trimmed.length < 2) {
      playSound('beep');
      setErrorMessage('⚠️ Nama wajib diisi (minimal 2 huruf)! Jangan biarkan kosong.');
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

  return (
    <div className="welcome-container container">
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
            <img src="/logo.png" alt="Logo CyberGenZ UBBG" className="welcome-hero-logo" />
          </div>

          <div className="welcome-badge">
            <span className="welcome-dot-red" />
            LITERASI KEAMANAN SIBER GENERASI Z
          </div>
          <h1 className="welcome-title">
            Selamat Datang di Portal <span className="text-red">Simulasi Keamanan Siber</span>
          </h1>
          <p className="welcome-lead">
            Platform edukasi dan praktik langsung untuk membekali siswa dalam mendeteksi tautan phishing, 
            mengamankan akun dengan verifikasi dua langkah (2FA), menguji ketahanan kata sandi, 
            serta melindungi privasi di media sosial dari ancaman kejahatan digital.
          </p>

          <div className="welcome-team-pill">
            <span className="team-role">Mahasiswa / Bidang Teknis & Praktik:</span>
            <strong className="team-name">Gempur Budi Anarki</strong>
            <span className="team-slash">•</span>
            <span className="team-campus">PKM UBBG 2026</span>
          </div>
        </div>

        {/* Personalized Agent Greeting or Name Registration */}
        {!isEditing && (studentName || nameInput.trim()) ? (
          <div className="agent-greeting-card">
            <div className="agent-card-left">
              <div className="agent-avatar-circle" style={{ background: '#ffffff', border: '2px solid #fee2e2' }}>
                <img src="/logo.png" alt="CyberGenZ Emblem" className="agent-avatar-logo" />
              </div>
              <div className="agent-greeting-info">
                <div className="agent-greeting-tag">
                  <span className="welcome-dot-red" />
                  IDENTITAS AGEN TERVERIFIKASI
                </div>
                <h2 className="agent-greeting-title">
                  Selamat Datang, <span className="agent-highlight-name">Agen {studentName || nameInput.trim()}</span>! 🛡️
                </h2>
                <p className="agent-greeting-desc">
                  Data analisismu telah tersimpan di sistem PKM UBBG 2026. Siap menguji ketangkasanmu membongkar serangan siber?
                </p>
              </div>
            </div>

            <div className="agent-greeting-actions">
              <button
                id="btn-start-simulation-welcome"
                className="btn btn-red-glow"
                onClick={handleStartDirectly}
              >
                <span>Masuk ke Hub 4 Misi</span>
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
              <User size={16} className="text-red" />
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
                    handleValidateAndSave();
                  }
                }}
                autoFocus
              />
              <button
                id="btn-save-name-welcome"
                className="btn btn-red-glow"
                onClick={handleStartDirectly}
              >
                <span>Mulai Simulasi</span>
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
                *Tekan <strong>Enter</strong> atau klik <strong>Mulai Simulasi</strong>. Nama tidak boleh kosong agar evaluasi literasimu tercatat.
              </p>
            )}
          </div>
        )}

        {/* 4 Mission Highlights Grid */}
        <div className="welcome-preview-section">
          <h3 className="preview-heading">
            <BookOpen size={18} className="text-red" />
            4 Modul Praktik Interaktif yang Akan Kamu Pelajari:
          </h3>

          <div className="welcome-grid-4">
            <div className="preview-item">
              <div className="preview-icon-box bg-red-soft text-red">
                <Radar size={22} />
              </div>
              <div className="preview-content">
                <h4>01. Phishing Radar & Lab URL</h4>
                <p>Uji coba membuka tautan kuota gratis palsu, bedah domain palsu vs resmi, dan deteksi email spoofing.</p>
              </div>
            </div>

            <div className="preview-item">
              <div className="preview-icon-box bg-red-soft text-red">
                <KeyRound size={22} />
              </div>
              <div className="preview-content">
                <h4>02. Benteng 2FA (Verifikasi 2 Langkah)</h4>
                <p>Simulasi serangan bot brute-force hacker yang diblokir oleh sistem kode OTP 6-digit.</p>
              </div>
            </div>

            <div className="preview-item">
              <div className="preview-icon-box bg-red-soft text-red">
                <Key size={22} />
              </div>
              <div className="preview-content">
                <h4>03. Password Vault & Kriptografi</h4>
                <p>Ketahui berapa detik password kamu bisa dibobol hacker dan pelajari teknik menyusun Passphrase kuat.</p>
              </div>
            </div>

            <div className="preview-item">
              <div className="preview-icon-box bg-red-soft text-red">
                <EyeOff size={22} />
              </div>
              <div className="preview-content">
                <h4>04. Privacy Shield Medsos</h4>
                <p>Audit privasi profil virtual Instagram/TikTok untuk mencegah kejahatan doxxing dan penguntitan (stalking).</p>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Badges Footer */}
        <div className="welcome-footer-badges">
          <div className="feature-pill">
            <CheckCircle size={15} color="#dc2626" />
            <span>100% Berbasis Simulasi Nyata</span>
          </div>
          <div className="feature-pill">
            <CheckCircle size={15} color="#dc2626" />
            <span>Tanpa Instalasi Tambahan</span>
          </div>
          <div className="feature-pill">
            <CheckCircle size={15} color="#dc2626" />
            <span>Evaluasi Mandiri Terstandar PKM</span>
          </div>
        </div>
      </div>
    </div>
  );
}
