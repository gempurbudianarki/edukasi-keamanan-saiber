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
                padding: '14px',
                borderRadius: '10px',
                background: isActive ? 'rgba(16, 185, 129, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                border: `1.5px solid ${isActive ? 'rgba(16, 185, 129, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ color: isActive ? '#10b981' : '#64748b' }}>
                  {renderIcon(def.key)}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: isActive ? '#86efac' : '#e2e8f0' }}>
                    {def.title}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    {def.desc}
                  </div>
                </div>
              </div>

              <div
                style={{
                  width: '42px',
                  height: '24px',
                  borderRadius: '12px',
                  background: isActive ? '#10b981' : '#334155',
                  position: 'relative',
                  flexShrink: 0,
                  transition: 'background 0.2s'
                }}
              >
                <div
                  style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#fff',
                    position: 'absolute',
                    top: '3px',
                    left: isActive ? '21px' : '3px',
                    transition: 'left 0.2s'
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
