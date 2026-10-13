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
        border: '1.5px solid #fee2e2',
        borderRadius: '14px',
        padding: '16px 20px',
        marginBottom: '20px',
        boxShadow: '0 4px 14px rgba(220, 38, 38, 0.04)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: evaluation.score >= 90 ? '#dcfce7' : '#fee2e2',
            color: evaluation.score >= 90 ? '#16a34a' : '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            {evaluation.score >= 90 ? <ShieldCheck size={26} /> : <ShieldAlert size={26} />}
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
              Status Pertahanan Profil: <span style={{ color: evaluation.color }}>{evaluation.status}</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
              {evaluation.score >= 90
                ? 'Profil Anda terlindungi maksimal dari pelacakan lokasi, penguntit (stalker), dan sindikat doxxing.'
                : 'Peringatan: Terdapat informasi sensitif yang bocor dan dapat disalahgunakan pihak jahat!'}
            </div>
          </div>
        </div>

        {/* Mini progress bar */}
        <div style={{ minWidth: '180px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, marginBottom: '4px', color: '#334155' }}>
            <span>Perisai Privasi:</span>
            <span style={{ color: evaluation.color }}>{evaluation.score}%</span>
          </div>
          <div style={{ height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${evaluation.score}%`, background: evaluation.color, transition: 'width 0.3s ease, background 0.3s ease' }} />
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
