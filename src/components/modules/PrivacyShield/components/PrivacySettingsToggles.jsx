import React from 'react';
import { Lock, Unlock, MapPin, EyeOff, ShieldCheck, Mail, CheckCircle } from 'lucide-react';
import { privacySettingDefinitions } from '../../../../data/privacyData';

export function PrivacySettingsToggles({ settings, onToggle }) {
  const renderIcon = (key) => {
    switch (key) {
      case 'isPrivateAccount': return <Lock size={16} />;
      case 'hidePreciseLocation': return <MapPin size={16} />;
      case 'limitMentions': return <EyeOff size={16} />;
      case 'filterDirectMessages': return <Mail size={16} />;
      case 'hideContactInfo': return <ShieldCheck size={16} />;
      default: return <Lock size={16} />;
    }
  };

  return (
    <div className="glass-panel scenario-card">
      <h2 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>
        Panel Audit Konfigurasi Privasi
      </h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '18px' }}>
        Atur sakelar di bawah untuk memproteksi profil dari *oversharing*, bahaya *cyber stalking*, dan *doxxing*:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {privacySettingDefinitions.map((def) => {
          const isActive = settings[def.key];
          return (
            <div
              key={def.key}
              onClick={() => onToggle(def.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px',
                borderRadius: '12px',
                background: isActive ? '#f0fdf4' : '#f8fafc',
                border: `1.5px solid ${isActive ? '#86efac' : '#e2e8f0'}`,
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.02)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ color: isActive ? '#16a34a' : '#64748b' }}>
                  {renderIcon(def.key)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.92rem', color: isActive ? '#15803d' : '#0f172a', marginBottom: '2px' }}>
                    {def.title}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4 }}>
                    {def.desc}
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '46px',
                  height: '26px',
                  borderRadius: '13px',
                  background: isActive ? '#16a34a' : '#cbd5e1',
                  position: 'relative',
                  flexShrink: 0,
                  transition: 'background 0.2s'
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    background: '#fff',
                    position: 'absolute',
                    top: '3px',
                    left: isActive ? '23px' : '3px',
                    transition: 'left 0.2s',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
