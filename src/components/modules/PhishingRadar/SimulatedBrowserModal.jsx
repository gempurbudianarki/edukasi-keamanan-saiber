import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Lock, 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck,
  CreditCard, 
  Camera, 
  Smartphone, 
  MessageSquare, 
  Gamepad2, 
  User, 
  Radiation, 
  Biohazard, 
  Siren, 
  AlertOctagon, 
  Flame,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  X,
  Zap,
  ShieldX
} from 'lucide-react';
import { playSound } from '../../../utils/soundEffects';
import { DanaLoginMockup } from './modals/mockups/DanaLoginMockup';
import { ApkDownloadMockup } from './modals/mockups/ApkDownloadMockup';
import { SmsFormMockup } from './modals/mockups/SmsFormMockup';
import { InstagramMockup } from './modals/mockups/InstagramMockup';
import { LegitClassroomMockup } from './modals/mockups/LegitClassroomMockup';
import { GameDiamondMockup } from './modals/mockups/GameDiamondMockup';
import { SCENARIO_TYPES } from '../../../data/scenarioTypes';
import './SimulatedBrowser.css';

export function SimulatedBrowserModal({ scenario, onClose, onReportPhishing }) {
  const [breached, setBreached] = useState(false);

  const handleBreach = () => {
    setBreached(true);
    playSound('siren', true);
    setTimeout(() => playSound('glitch', true), 600);
  };

  const renderCrimeVector = (type) => {
    switch (type) {
      case 'credit': return <CreditCard size={20} color="#fef08a" strokeWidth={2.5} />;
      case 'lock': return <Lock size={20} color="#fef08a" strokeWidth={2.5} />;
      case 'camera': return <Camera size={20} color="#fef08a" strokeWidth={2.5} />;
      case 'gamepad': return <Gamepad2 size={20} color="#fef08a" strokeWidth={2.5} />;
      case 'message': return <MessageSquare size={20} color="#fef08a" strokeWidth={2.5} />;
      case 'user': return <User size={20} color="#fef08a" strokeWidth={2.5} />;
      default: return <AlertTriangle size={20} color="#fef08a" strokeWidth={2.5} />;
    }
  };

  const tabTitle = scenario.simType === SCENARIO_TYPES.DANA_LOGIN
    ? 'DANA • Dompet Digital Indonesia'
    : scenario.simType === SCENARIO_TYPES.IG_LOGIN
    ? 'Instagram • Login'
    : scenario.simType === SCENARIO_TYPES.APK_INSTALLER
    ? 'Unduh CapCut Mod APK'
    : scenario.simType === SCENARIO_TYPES.GAME_DIAMOND
    ? 'Event 10.000 Diamond Game'
    : scenario.simType === SCENARIO_TYPES.LEGIT_CLASSROOM
    ? 'Google Classroom'
    : 'Kemendikbud – Kuota Belajar';

  return createPortal(
    <div className="sim-overlay">
      <div className={`sim-chrome ${breached ? 'breach-active' : ''}`}>
        {/* Tab bar */}
        <div className="sim-tabbar">
          <div className="sim-tab">
            <span className="tab-favicon">
              <Lock size={13} color="#94a3b8" />
            </span>
            <span>{tabTitle}</span>
            <button className="tab-close" onClick={onClose} aria-label="Tutup Tab">
              <X size={12} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Address bar */}
        <div className="sim-addressbar">
          <div className="sim-nav-btns">
            <button className="sim-nav-btn" title="Back" aria-label="Kembali">
              <ArrowLeft size={16} strokeWidth={2.5} />
            </button>
            <button className="sim-nav-btn" title="Forward" aria-label="Maju">
              <ArrowRight size={16} strokeWidth={2.5} />
            </button>
            <button className="sim-nav-btn" title="Reload" aria-label="Muat Ulang">
              <RotateCw size={15} strokeWidth={2.5} />
            </button>
          </div>

          <div className="sim-url-pill">
            <Lock size={15} className={scenario.isPhishing ? 'lock-danger' : 'lock-safe'} />
            <span className="url-text" title={scenario.displayUrl}>
              {scenario.displayUrl}
            </span>
            {scenario.isPhishing ? (
              <span className="url-badge-danger">
                <ShieldAlert size={13} strokeWidth={2.5} />
                <span>TIDAK AMAN / PALSU</span>
              </span>
            ) : (
              <span className="url-badge-safe">
                <ShieldCheck size={13} strokeWidth={2.5} />
                <span>RESMI TERVERIFIKASI</span>
              </span>
            )}
          </div>

          <button className="sim-close-btn" onClick={onClose} title="Tutup Simulator" aria-label="Tutup Jendela">
            <X size={18} strokeWidth={2.8} />
          </button>
        </div>

        {/* DEFCON-1 Tactical Hazard Caution Strip */}
        {breached && (
          <div className="tactical-hazard-strip">
            <div className="hazard-pill-item hazard-pill-danger">
              <Siren size={16} className="siren-spinning" />
              <span className="hazard-text-danger">DEFCON-1 CYBER WAR DEFENSE PROTOCOL</span>
            </div>
            <div className="hazard-pill-item hazard-pill-warning">
              <Radiation size={16} className="nuclear-spin" />
              <span className="hazard-text-warning">CRITICAL INTRUSION DETECTED</span>
            </div>
            <div className="hazard-pill-item hazard-pill-alert">
              <Zap size={15} className="hazard-flash" />
              <span className="hazard-text-alert">CODE: RED ALERT</span>
              <Siren size={16} className="siren-spinning" />
            </div>
          </div>
        )}

        {/* Browser viewport body */}
        <div className="sim-body">
          {breached ? (
            /* DEFCON-1 TACTICAL BREACH OVERLAY (ZERO CUTOFF, CINEMATIC EMERGENCY) */
            <div className="breach-overlay">
              {/* Scanline CRT overlay effect */}
              <div className="breach-scanlines" />

              <div className="tactical-breach-hud">
                {/* Emergency Flashing Siren Orb & Defcon Badge */}
                <div className="tactical-beacon-wrap">
                  <div className="tactical-siren-orb" title="Keadaan Darurat Siber">
                    <Radiation size={32} className="nuclear-spin" />
                  </div>
                  <div className="tactical-defcon-badge">
                    <span className="defcon-ping" />
                    <AlertOctagon size={16} color="#facc15" />
                    <span>DEFCON 1 // PROTOKOL PERANG SIBER AKTIF</span>
                    <span className="defcon-ping" />
                  </div>
                </div>

                {/* Tactical Alert Headline & Subtitle */}
                <h2 className="tactical-breach-title">
                  {scenario.breachResult?.headline || 'DATA PRIBADI ANDA TELAH BERHASIL DICURI!'}
                </h2>
                <div className="tactical-breach-desc-row">
                  <ShieldX size={20} className="tactical-desc-icon" />
                  <p className="tactical-breach-desc">
                    {scenario.breachResult?.alertMsg || 'Informasi yang Anda ketik baru saja terekam di terminal hacker.'}
                  </p>
                </div>

                {/* Compact 3-Column Threat Grid */}
                {scenario.breachResult?.liveCrimes && (
                  <div className="tactical-crime-grid">
                    {scenario.breachResult.liveCrimes.map((c, i) => (
                      <div key={i} className="tactical-crime-card">
                        <div className="tactical-crime-header">
                          <div className="tactical-crime-icon">
                            {renderCrimeVector(c.iconType)}
                          </div>
                          <span className="tactical-threat-tag">THREAT #{i + 1}</span>
                        </div>
                        <div className="tactical-crime-title">{c.title}</div>
                        <div className="tactical-crime-desc">{c.desc}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tactical Defense Actions */}
                <div className="tactical-breach-actions">
                  <button className="tactical-btn-dismiss" onClick={onClose}>
                    <X size={16} strokeWidth={2.5} />
                    <span>Tutup Simulator</span>
                  </button>
                  <button className="tactical-btn-countermeasure" onClick={onReportPhishing}>
                    <ShieldAlert size={20} strokeWidth={2.5} />
                    <span>LUNCURKAN COUNTER-DEFENSE: BLOKIR & LAPORKAN</span>
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* MOCKUP VIEWS WITH SAFE FALLBACK */
            <div style={{ background: '#fff', minHeight: '380px', padding: '24px 20px', flex: 1, overflowY: 'auto' }}>
              {scenario.simType === SCENARIO_TYPES.DANA_LOGIN && (
                <DanaLoginMockup scenario={scenario} onBreach={handleBreach} />
              )}
              {scenario.simType === SCENARIO_TYPES.APK_INSTALLER && (
                <ApkDownloadMockup scenario={scenario} onBreach={handleBreach} />
              )}
              {scenario.simType === SCENARIO_TYPES.FORM_KUOTA && (
                <SmsFormMockup scenario={scenario} onBreach={handleBreach} />
              )}
              {scenario.simType === SCENARIO_TYPES.IG_LOGIN && (
                <InstagramMockup scenario={scenario} onBreach={handleBreach} />
              )}
              {scenario.simType === SCENARIO_TYPES.GAME_DIAMOND && (
                <GameDiamondMockup scenario={scenario} onBreach={handleBreach} />
              )}
              {scenario.simType === SCENARIO_TYPES.LEGIT_CLASSROOM && (
                <LegitClassroomMockup onClose={onClose} />
              )}
              {/* Safe Fallback: Mencegah layar putih kosong jika tipe mockup belum terdaftar */}
              {![
                SCENARIO_TYPES.DANA_LOGIN,
                SCENARIO_TYPES.APK_INSTALLER,
                SCENARIO_TYPES.FORM_KUOTA,
                SCENARIO_TYPES.IG_LOGIN,
                SCENARIO_TYPES.LEGIT_CLASSROOM,
                SCENARIO_TYPES.GAME_DIAMOND
              ].includes(scenario.simType) && (
                <div style={{ padding: '40px 20px', textAlign: 'center', color: '#64748b' }}>
                  <AlertTriangle size={44} color="#f59e0b" style={{ margin: '0 auto 12px' }} />
                  <h3 style={{ color: '#0f172a', marginBottom: '8px' }}>Simulasi Konten Sedang Dimuat</h3>
                  <p style={{ fontSize: '0.9rem', maxWidth: '420px', margin: '0 auto', lineHeight: 1.5 }}>
                    Modul simulasi untuk tipe <strong>{scenario.simType || 'Tidak Dikenal'}</strong> sedang disiapkan. Silakan gunakan tombol Laporkan & Blokir di atas.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}
