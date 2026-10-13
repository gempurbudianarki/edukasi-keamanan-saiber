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
  BookOpen
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';
import './WelcomeScreen.css';

export function WelcomeScreen({ studentName, onSaveName, onStartSimulation }) {
  const [nameInput, setNameInput] = useState(studentName || '');

  const handleStart = () => {
    playSound('success');
    if (nameInput.trim()) {
      onSaveName(nameInput.trim());
    }
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

        {/* Name Registration Box */}
        <div className="welcome-name-box">
          <label htmlFor="student-name-input" className="name-box-label">
            <User size={16} className="text-red" />
            Masukkan Nama Lengkap Kamu untuk Memulai:
          </label>
          <div className="name-input-row">
            <input
              id="student-name-input"
              type="text"
              className="name-input-field"
              placeholder="Contoh: Muhammad Rizky / Siti Sarah"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleStart();
              }}
            />
            <button
              id="btn-start-simulation-welcome"
              className="btn btn-red-glow"
              onClick={handleStart}
            >
              <span>Mulai Simulasi</span>
              <ArrowRight size={18} />
            </button>
          </div>
          <p className="name-box-hint">
            *Nama ini akan otomatis tertera secara resmi pada <strong>Sertifikat Digital Kelulusan</strong> setelah seluruh misi berhasil diselesaikan.
          </p>
        </div>

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
            <span>Sertifikat Digital Resmi PKM UBBG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
