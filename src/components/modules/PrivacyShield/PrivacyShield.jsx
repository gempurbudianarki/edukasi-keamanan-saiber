import React, { useState } from 'react';
import { ArrowLeft, Shield, ShieldAlert, ShieldCheck } from 'lucide-react';
import { initialPrivacySettings, calculatePrivacyScore } from '../../../data/privacyData';
import { playSound } from '../../../utils/soundEffects';
import { FloatingScoreBurst } from '../../layout/FloatingScoreBurst';
import { SocialProfilePreview } from './components/SocialProfilePreview';
import { PrivacySettingsToggles } from './components/PrivacySettingsToggles';
import './PrivacyShield.css';

export function PrivacyShield({ onBack, onComplete, initialScore = 0 }) {
  const [settings, setSettings] = useState(initialPrivacySettings);
  const [score, setScore] = useState(initialScore);
  const [burstTrigger, setBurstTrigger] = useState(0);

  const evaluation = calculatePrivacyScore(settings);

  const handleToggle = (key) => {
    playSound('click');
    setSettings(prev => {
      const next = { ...prev, [key]: !prev[key] };
      const nextEval = calculatePrivacyScore(next);
      if (nextEval.score >= 80) {
        if (score < 100) {
          playSound('complete');
          setScore(100);
          setBurstTrigger(t => t + 1);
          onComplete(100);
        }
      }
      return next;
    });
  };

  return (
    <div className="module-page container">
      <FloatingScoreBurst text="+100 PTS PRIVASI DIGIDAYA!" trigger={burstTrigger} />

      {/* Header bar */}
      <div className="module-header">
        <button className="module-nav-back" onClick={onBack}>
          <ArrowLeft size={16} /> Kembali ke Misi Hub
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-amber">Misi 04: Privasi Digital</span>
          <span className={`badge ${evaluation.statusBadge}`}>
            Skor Keamanan Privasi: {evaluation.score}%
          </span>
        </div>
      </div>

      {/* Doxxing Risk Telemetry Banner */}
      <div style={{
        background: '#ffffff',
        border: '2.5px solid var(--nb-border, #000000)',
        borderRadius: 'var(--nb-radius-md, 8px)',
        padding: '16px 20px',
        marginBottom: '20px',
        boxShadow: '4px 4px 0 var(--nb-shadow-color, #000000)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '8px',
            border: '2px solid #000',
            background: evaluation.score >= 90 ? 'var(--nb-lime, #22c55e)' : 'var(--nb-coral, #ff4d4d)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '2px 2px 0 #000'
          }}>
            {evaluation.score >= 90 ? <ShieldCheck size={26} strokeWidth={2.5} /> : <ShieldAlert size={26} strokeWidth={2.5} />}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
              Status Pertahanan Profil: <span style={{ color: evaluation.score >= 90 ? '#16a34a' : '#dc2626' }}>{evaluation.status}</span>
            </div>
            <div style={{ fontSize: '0.84rem', color: '#475569', fontWeight: 500 }}>
              {evaluation.score >= 90
                ? 'Profil Anda terlindungi maksimal dari pelacakan lokasi, penguntit (stalker), dan sindikat doxxing.'
                : 'Peringatan: Terdapat informasi sensitif yang bocor dan dapat disalahgunakan pihak jahat!'}
            </div>
          </div>
        </div>

        {/* Mini progress bar */}
        <div style={{ minWidth: '190px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 800, marginBottom: '6px', color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
            <span>Perisai Privasi:</span>
            <span>{evaluation.score}%</span>
          </div>
          <div style={{ height: '12px', background: '#e2e8f0', borderRadius: '4px', border: '2px solid #000', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${evaluation.score}%`, background: evaluation.score >= 90 ? 'var(--nb-lime, #22c55e)' : 'var(--nb-coral, #ff4d4d)', transition: 'width 0.3s ease, background 0.3s ease' }} />
          </div>
        </div>
      </div>

      {/* Main Grid: Preview vs Toggles */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <SocialProfilePreview settings={settings} />
        <PrivacySettingsToggles settings={settings} onToggle={handleToggle} />
      </div>
    </div>
  );
}
