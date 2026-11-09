import React, { useEffect } from 'react';
import { 
  ShieldCheck, 
  Award, 
  RotateCcw, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Lock, 
  Smartphone, 
  KeyRound, 
  Layers, 
  FileCheck2,
  TrendingUp,
  Share2,
  ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../../../../utils/soundEffects';

export function MasteryVictoryView({ score = 100, onRetake, onBackToHub, onNavigatePostTest }) {
  useEffect(() => {
    playSound('complete');
    try {
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.5 },
        colors: ['#22c55e', '#00f0ff', '#facc15', '#ff4d4d', '#a855f7']
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 60,
          origin: { x: 0, y: 0.65 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 60,
          origin: { x: 1, y: 0.65 }
        });
      }, 300);
    } catch {
      // fallback
    }
  }, []);

  return (
    <div className="twofa-victory-container anim-pop-in">
      {/* Top Victory Card */}
      <div className="twofa-victory-card">
        <div className="victory-top-accent" />

        <div className="victory-hero-badge">
          <Sparkles size={16} color="#16a34a" />
          <span>MISI 02 SELESAI TUNTAS • SIAGA PERTAHANAN SIBER TINGKAT TINGGI</span>
        </div>

        <div className="victory-main-grid">
          {/* Left: Huge Glowing Shield */}
          <div className="victory-shield-block">
            <div className="victory-shield-circle shield-active-glow">
              <ShieldCheck size={64} color="#16a34a" />
            </div>
            <div className="victory-score-badge">
              {score} / 100 POIN
            </div>
            <div className="victory-score-label">
              BENTENG 2FA AKTIF PARIPURNA
            </div>
          </div>

          {/* Right: Clearance Narrative */}
          <div className="victory-content-block">
            <h2 className="victory-title">
              Selamat! Kamu Berhasil Menguasai Benteng Otentikasi Dua Faktor (2FA)
            </h2>
            <p className="victory-desc">
              Melalui 4 tahapan simulasi intensif — mulai dari pembuktian serangan brute-force, praktik konfigurasi QR TOTP 1:1, manajemen kode cadangan, hingga drill berpikir kritis menangkal MFA Fatigue — kamu kini telah memiliki imunitas digital yang kokoh terhadap pencurian akun di era media sosial.
            </p>

            {/* 3 Competencies Verified */}
            <div className="victory-competencies-grid">
              <div className="comp-card">
                <div className="comp-icon-box comp-green">
                  <Lock size={18} />
                </div>
                <div>
                  <div className="comp-title">Anti-Credential Stuffing</div>
                  <div className="comp-desc">Paham bahwa kata sandi saja tidak cukup dan wajib dilapis 2FA.</div>
                </div>
              </div>

              <div className="comp-card">
                <div className="comp-icon-box comp-cyan">
                  <Smartphone size={18} />
                </div>
                <div>
                  <div className="comp-title">TOTP Authenticator Mastery</div>
                  <div className="comp-desc">Mahir sinkronisasi 30-detik offline yang kebal terhadap pembajakan SIM Swap.</div>
                </div>
              </div>

              <div className="comp-card">
                <div className="comp-icon-box comp-yellow">
                  <KeyRound size={18} />
                </div>
                <div>
                  <div className="comp-title">MFA Fatigue & Disaster Immune</div>
                  <div className="comp-desc">Kritis menolak trik push bombing & paham prosedur backup saat HP hilang.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Practical Checklist for Gen-Z */}
        <div className="victory-checklist-section">
          <div className="checklist-header">
            <Award size={18} color="#16a34a" />
            <span>Checklist Pengamanan Mandiri di Akun Pribadi Kamu Hari Ini:</span>
          </div>
          <div className="checklist-items-grid">
            <div className="checklist-item">
              <CheckCircle2 size={16} color="#16a34a" />
              <span>
                <strong>WhatsApp:</strong> Masuk ke Pengaturan <ChevronRight size={13} color="#16a34a" style={{ display: 'inline', margin: '0 2px', verticalAlign: 'middle' }} /> Akun <ChevronRight size={13} color="#16a34a" style={{ display: 'inline', margin: '0 2px', verticalAlign: 'middle' }} /> Verifikasi Dua Langkah <ChevronRight size={13} color="#16a34a" style={{ display: 'inline', margin: '0 2px', verticalAlign: 'middle' }} /> Aktifkan PIN 6 Digit.
              </span>
            </div>
            <div className="checklist-item">
              <CheckCircle2 size={16} color="#16a34a" />
              <span>
                <strong>Instagram / TikTok:</strong> Buka Pusat Akun <ChevronRight size={13} color="#16a34a" style={{ display: 'inline', margin: '0 2px', verticalAlign: 'middle' }} /> Kata Sandi & Keamanan <ChevronRight size={13} color="#16a34a" style={{ display: 'inline', margin: '0 2px', verticalAlign: 'middle' }} /> Pilih Aplikasi Autentikasi.
              </span>
            </div>
            <div className="checklist-item">
              <CheckCircle2 size={16} color="#16a34a" />
              <span>
                <strong>Akun Google & Email:</strong> Aktifkan Verifikasi 2 Langkah <ChevronRight size={13} color="#16a34a" style={{ display: 'inline', margin: '0 2px', verticalAlign: 'middle' }} /> Simpan 10 Kode Cadangan di tempat aman.
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons: Definite and Guided Endings */}
        <div className="victory-action-toolbar">
          <button
            id="btn-victory-retake-2fa"
            className="btn btn-secondary victory-btn"
            onClick={onRetake}
          >
            <RotateCcw size={16} />
            <span>Ulangi Simulasi 2FA</span>
          </button>

          <button
            id="btn-victory-back-hub"
            className="btn btn-secondary victory-btn"
            onClick={onBackToHub}
          >
            <Layers size={16} />
            <span>Kembali ke Misi Hub</span>
          </button>

          <button
            id="btn-victory-goto-posttest"
            className="btn btn-primary victory-cta-btn anim-beacon"
            onClick={() => {
              playSound('beep');
              if (onNavigatePostTest) {
                onNavigatePostTest();
              } else {
                onBackToHub();
              }
            }}
          >
            <FileCheck2 size={18} />
            <span>Lanjut ke Evaluasi Akhir: Post-Test (15 Soal)</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
