import React from 'react';
import { Lock, Unlock, MapPin, EyeOff, ShieldCheck, Mail, Users, CheckCircle, AlertTriangle, Sparkles } from 'lucide-react';
import { privacySettingDefinitions } from '../../../../data/privacyData';
import { playSound } from '../../../../utils/soundEffects';

export function PrivacySettingsToggles({ settings, onToggle }) {
  const renderIcon = (key) => {
    switch (key) {
      case 'isPrivateAccount': return <Lock size={18} />;
      case 'shareLiveLocation': return <MapPin size={18} />;
      case 'allowTagsFromAnyone': return <EyeOff size={18} />;
      case 'allowStrangerDM': return <Mail size={18} />;
      case 'showContactInfo': return <ShieldCheck size={18} />;
      case 'storyCloseFriendsOnly': return <Users size={18} />;
      default: return <Lock size={18} />;
    }
  };

  return (
    <div className="glass-panel scenario-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
          <ShieldCheck size={22} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0 }}>
            Panel Audit Konfigurasi Privasi
          </h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Ubah sakelar pengaturan untuk memblokir celah doxxing & cyber stalking
          </div>
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '16px' }}>
        Atur 6 sakelar privasi media sosial di bawah. Setiap sakelar yang diamankan akan langsung memperbarui preview akun virtual di samping secara realtime:
      </p>

      {/* Toggles list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {privacySettingDefinitions.map((def) => {
          const currentValue = settings[def.key];
          const isSafe = currentValue === def.safeWhen;

          return (
            <div
              key={def.key}
              onClick={() => onToggle(def.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '14px 16px',
                borderRadius: '14px',
                background: isSafe ? '#f0fdf4' : '#fff5f5',
                border: `1.5px solid ${isSafe ? '#86efac' : '#fecaca'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: isSafe ? '0 2px 8px rgba(16, 185, 129, 0.08)' : '0 2px 8px rgba(239, 68, 68, 0.06)'
              }}
            >
              {/* Left Info */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', flex: 1, paddingRight: '12px' }}>
                <div style={{ color: isSafe ? '#16a34a' : '#dc2626', marginTop: '2px' }}>
                  {renderIcon(def.key)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '3px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.92rem', color: '#0f172a' }}>
                      {def.title}
                    </span>
                    <span className={`badge ${isSafe ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.68rem', padding: '2px 8px' }}>
                      {isSafe ? 'Aman (Terlindungi)' : 'Beresiko Tinggi'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.45, marginBottom: '4px' }}>
                    {def.description}
                  </div>

                  {!isSafe && (
                    <div style={{ fontSize: '0.74rem', color: '#b91c1c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <AlertTriangle size={12} />
                      <span>{def.riskWhenUnsafe}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: iOS-Style Switch Toggle */}
              <div
                style={{
                  width: '50px',
                  height: '28px',
                  borderRadius: '14px',
                  background: isSafe ? '#16a34a' : '#cbd5e1',
                  position: 'relative',
                  flexShrink: 0,
                  transition: 'background 0.25s',
                  boxShadow: isSafe ? '0 0 10px rgba(22, 163, 74, 0.3)' : 'none'
                }}
              >
                <div
                  style={{
                    width: '22px',
                    height: '22px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    position: 'absolute',
                    top: '3px',
                    left: isSafe ? '25px' : '3px',
                    transition: 'left 0.25s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.25)'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tip footer */}
      <div style={{ marginTop: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', fontSize: '0.8rem', color: '#475569', lineHeight: 1.5 }}>
        💡 <strong>Prinsip Keamanan Siber Pelajar:</strong> Lindungi jejak digital Anda. Kejahatan pemerasan foto, stalking, dan pencurian identitas biasanya berawal dari oversharing informasi sensitif di bio & feed media sosial.
      </div>
    </div>
  );
}
