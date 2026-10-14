import React from 'react';
import { 
  Radar, 
  KeyRound, 
  Key, 
  EyeOff, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Activity,
  BookOpen
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export function MissionHub({ progress, onSelectMission }) {
  const missions = [
    {
      id: 'phishing',
      num: '01',
      title: 'Misi 1: Phishing Radar & Lab URL',
      subtitle: 'Simulasi Serangan, Bedah Domain & Email Spoofing',
      description: 'Eksplorasi tautan kuota gratis palsu, bedah domain palsu (.xyz, .club) vs domain pemerintah (.go.id), dan deteksi email spoofing dengan inspeksi header SPF/DKIM.',
      icon: Radar,
      color: '#ff4d4d',
      iconBg: '#ff4d4d',
      iconColor: '#ffffff',
      badgeClass: 'badge-red',
      tag: 'Deteksi Ancaman'
    },
    {
      id: 'twoFactor',
      num: '02',
      title: 'Misi 2: Benteng 2FA',
      subtitle: 'Verifikasi Dua Langkah & Tameng Akun',
      description: 'Saksikan simulasi bot brute-force hacker yang langsung menembus akun tanpa 2FA, dan bagaimana perisai kode OTP 6-digit sukses menggagalkan pencurian sesi login.',
      icon: KeyRound,
      color: '#22c55e',
      iconBg: '#22c55e',
      iconColor: '#000000',
      badgeClass: 'badge-green',
      tag: 'Perlindungan Sesi'
    },
    {
      id: 'password',
      num: '03',
      title: 'Misi 3: Password Vault',
      subtitle: 'Kekuatan Kata Sandi & Telemetri Bobol',
      description: 'Uji ketahanan kata sandimu secara realtime! Hitung estimasi waktu komputer super peretas untuk meretasnya, dan rakit Passphrase anti-jebol.',
      icon: Key,
      color: '#00f0ff',
      iconBg: '#00f0ff',
      iconColor: '#000000',
      badgeClass: 'badge-cyan',
      tag: 'Kriptografi Sandi'
    },
    {
      id: 'privacy',
      num: '04',
      title: 'Misi 4: Privacy Shield',
      subtitle: 'Audit Jejak & Privasi Media Sosial',
      description: 'Audit profil media sosial virtual ala Instagram/TikTok. Nonaktifkan pelacakan lokasi presisi, kunci privasi akun, dan tangkal bahaya doxxing serta stalking.',
      icon: EyeOff,
      color: '#facc15',
      iconBg: '#facc15',
      iconColor: '#000000',
      badgeClass: 'badge-amber',
      tag: 'Privasi Digital'
    }
  ];

  const completedCount = Object.values(progress.completedMissions).filter(Boolean).length;
  const isAllCompleted = completedCount === 4;

  return (
    <div className="hub-container container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-hud-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="hud-status-led" />
            <span>PORTAL PRAKTIK KEAMANAN SIBER SISWA</span>
            <span className="hide-mobile">• PKM UBBG 2026</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Activity size={15} />
            <span>MODUL INTERAKTIF TERSEDIA</span>
          </div>
        </div>

        <div className="hero-badge-wrap">
          <span className="badge badge-red">
            Pusat Praktik Edukasi Siber
          </span>
          <span className="badge badge-purple">
            Universitas Bina Bangsa Getsempena
          </span>
        </div>

        <h1 className="hero-title">
          Kuasai Pertahanan Digital di Era <span className="text-red">Gempuran Ancaman Siber</span>
        </h1>

        <p className="hero-description">
          Selamat datang kembali, <strong>{progress.studentName ? `Agen ${progress.studentName}` : 'Siswa Siber'}</strong> di markas simulasi praktik Pengabdian Kepada Masyarakat (PKM) <strong>Universitas Bina Bangsa Getsempena (UBBG)</strong>. 
          Pilih dan selesaikan 4 misi di bawah ini untuk menguji ketangkasanmu menghadapi ancaman nyata di dunia digital!
        </p>

        {/* All Missions Completed Banner */}
        {isAllCompleted && (
          <div className="certificate-banner" style={{ background: 'rgba(16, 185, 129, 0.1)', borderColor: 'rgba(16, 185, 129, 0.3)' }}>
            <div className="cert-banner-left">
              <div style={{ color: '#10b981' }}>
                <ShieldCheck size={38} />
              </div>
              <div>
                <h3 className="cert-banner-title" style={{ color: '#10b981' }}>SELURUH 4 MISI SELESAI TERVALIDASI!</h3>
                <p className="cert-banner-desc">Kamu telah menyelesaikan seluruh modul simulasi pertahanan siber. Pengetahuan dan literasi digitalmu kini berada di level siaga tinggi.</p>
              </div>
            </div>
            <div className="badge badge-green" style={{ fontSize: '0.9rem', padding: '8px 16px' }}>
              Skor Sempurna Terpenuhi
            </div>
          </div>
        )}
      </section>

      {/* Grid 4 Missions */}
      <div className="missions-grid">
        {missions.map((m) => {
          const isDone = progress.completedMissions[m.id];
          const score = progress.scores[m.id] || 0;
          const Icon = m.icon;

          return (
            <div 
              key={m.id} 
              className={`mission-card ${isDone ? 'mission-completed' : ''}`}
            >
              <div className="mission-card-header">
                <div className="mission-icon-box" style={{ background: m.iconBg, color: m.iconColor }}>
                  <Icon size={24} />
                </div>
                <div className="mission-tags">
                  <span className={`badge ${m.badgeClass}`}>{m.num}. {m.tag}</span>
                  {isDone && (
                    <span className="badge badge-green">
                      <CheckCircle2 size={13} /> Selesai ({score} Poin)
                    </span>
                  )}
                </div>
              </div>

              <div className="mission-card-body">
                <h2 className="mission-title">{m.title}</h2>
                <div className="mission-subtitle">{m.subtitle}</div>
                <p className="mission-description">{m.description}</p>
              </div>

              <div className="mission-card-footer">
                <button
                  id={`btn-start-${m.id}`}
                  className={`btn ${isDone ? 'btn-secondary' : 'btn-primary'} btn-full`}
                  onClick={() => {
                    playSound('beep');
                    onSelectMission(m.id);
                  }}
                >
                  <span>{isDone ? 'Ulangi Misi Ini' : 'Mulai Misi Praktik'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
