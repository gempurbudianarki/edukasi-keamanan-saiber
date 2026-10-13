import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Lock, AlertTriangle, ShieldAlert, CreditCard, Camera, Smartphone, MessageSquare, Gamepad2, User } from 'lucide-react';
import { playSound } from '../../../utils/soundEffects';
import { DanaLoginMockup } from './modals/mockups/DanaLoginMockup';
import { ApkDownloadMockup } from './modals/mockups/ApkDownloadMockup';
import { SmsFormMockup } from './modals/mockups/SmsFormMockup';
import { InstagramMockup } from './modals/mockups/InstagramMockup';
import { LegitClassroomMockup } from './modals/mockups/LegitClassroomMockup';
import { SCENARIO_TYPES } from '../../../data/scenarioTypes';
import './SimulatedBrowser.css';

export function SimulatedBrowserModal({ scenario, onClose, onReportPhishing }) {
  const [breached, setBreached] = useState(false);

  const handleBreach = () => {
    setBreached(true);
    playSound('siren');
    setTimeout(() => playSound('glitch'), 500);
  };

  const renderCrimeVector = (type) => {
    switch (type) {
      case 'credit': return <CreditCard size={18} color="#dc2626" />;
      case 'lock': return <Lock size={18} color="#dc2626" />;
      case 'camera': return <Camera size={18} color="#dc2626" />;
      case 'gamepad': return <Gamepad2 size={18} color="#dc2626" />;
      case 'message': return <MessageSquare size={18} color="#dc2626" />;
      case 'user': return <User size={18} color="#dc2626" />;
      default: return <AlertTriangle size={18} color="#dc2626" />;
    }
  };

  const tabTitle = scenario.simType === 'dana_login'
    ? 'DANA • Dompet Digital Indonesia'
    : scenario.simType === 'ig_login'
    ? 'Instagram • Login'
    : scenario.simType === 'apk_installer'
    ? 'Unduh CapCut Mod APK'
    : scenario.simType === 'legit_classroom'
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
            <span className="tab-close" onClick={onClose}>✕</span>
          </div>
        </div>

        {/* Address bar */}
        <div className="sim-addressbar">
          <div className="sim-nav-btns">
            <button className="sim-nav-btn" title="Back">←</button>
            <button className="sim-nav-btn" title="Forward">→</button>
            <button className="sim-nav-btn" title="Reload">↻</button>
          </div>

          <div className="sim-url-pill">
            <Lock size={14} style={{ color: '#94a3b8', flexShrink: 0 }} />
            <span className="url-text" style={{ color: '#e2e8f0' }}>
              {scenario.displayUrl}
            </span>
          </div>

          <button className="sim-close-btn" onClick={onClose} title="Tutup Simulator">✕</button>
        </div>

        {/* Browser viewport body */}
        <div className="sim-body">
          {breached ? (
            /* BREACH OVERLAY */
            <div className="breach-overlay">
              <div className="breach-card">
                <div className="breach-pulse-icon">
                  <ShieldAlert size={48} color="#dc2626" />
                </div>
                <div className="badge badge-red" style={{ marginBottom: 12 }}>
                  SIMULASI PERETASAN AKTIF // PERANGKAT TERINFEKSI
                </div>
                <h2 className="breach-title">
                  {scenario.breachResult?.headline || 'DATA PRIBADI ANDA TELAH BERHASIL DICURI!'}
                </h2>
                <p className="breach-desc">
                  {scenario.breachResult?.alertMsg || 'Informasi yang Anda ketik baru saja terekam di terminal hacker.'}
                </p>

                {scenario.breachResult?.liveCrimes && (
                  <div className="crime-grid">
                    {scenario.breachResult.liveCrimes.map((c, i) => (
                      <div key={i} className="crime-item">
                        <div className="crime-icon">{renderCrimeVector(c.iconType)}</div>
                        <div>
                          <div className="crime-item-title">{c.title}</div>
                          <div className="crime-item-desc">{c.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="breach-actions">
                  <button className="btn btn-secondary" onClick={onClose} style={{ background: '#ffffff', color: '#0f172a', fontWeight: 600, padding: '10px 22px' }}>
                    Tutup Simulator
                  </button>
                  <button className="btn btn-primary" onClick={onReportPhishing} style={{ background: '#dc2626', borderColor: '#b91c1c', fontWeight: 700, padding: '10px 22px' }}>
                    <ShieldAlert size={16} /> Laporkan & Blokir Tautan
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
