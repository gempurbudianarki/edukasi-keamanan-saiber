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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {privacySettingDefinitions.map((def) => {
          const currentValue = settings[def.key];
          const isSafe = currentValue === def.safeWhen;

          return (
            <div
              key={def.key}
              onClick={() => {
                playSound('click');
                onToggle(def.key);
              }}
              className={`privacy-setting-item ${isSafe ? 'is-safe' : 'is-unsafe'}`}
            >
              {/* Left Info */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1, paddingRight: '12px' }}>
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '8px',
                  border: '2px solid #000',
                  background: isSafe ? 'var(--nb-lime, #22c55e)' : 'var(--nb-coral, #ff4d4d)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '2px 2px 0 #000',
                  marginTop: '2px'
                }}>
                  {renderIcon(def.key)}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
                    <span style={{ fontWeight: 800, fontSize: '0.95rem', color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
                      {def.title}
                    </span>
                    <span className={`badge ${isSafe ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                      {isSafe ? 'Aman (Terlindungi)' : 'Beresiko Tinggi'}
                    </span>
                  </div>

                  <div style={{ fontSize: '0.82rem', color: '#334155', lineHeight: 1.45, marginBottom: '6px' }}>
                    {def.description}
                  </div>

                  {!isSafe && (
                    <div style={{ fontSize: '0.76rem', color: 'var(--nb-coral, #ff4d4d)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <AlertTriangle size={14} />
                      <span>{def.riskWhenUnsafe}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Neo-Brutalist Tactile Switch Toggle */}
              <div className={`nb-switch-track ${isSafe ? 'on' : 'off'}`}>
                <div className="nb-switch-thumb" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Tip footer */}
      <div style={{ marginTop: '20px', background: 'var(--nb-yellow, #facc15)', border: '2.5px solid var(--nb-border, #000000)', borderRadius: 'var(--nb-radius-md, 8px)', padding: '14px 16px', fontSize: '0.82rem', color: '#0f172a', lineHeight: 1.5, boxShadow: '3px 3px 0 var(--nb-shadow-color, #000000)', fontWeight: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <Sparkles size={18} />
          <strong>Prinsip Keamanan Siber Pelajar:</strong>
        </div>
        <div>Lindungi jejak digital Anda. Kejahatan pemerasan foto, stalking, dan pencurian identitas biasanya berawal dari oversharing informasi sensitif di bio & feed media sosial.</div>
      </div>
    </div>
  );
}
