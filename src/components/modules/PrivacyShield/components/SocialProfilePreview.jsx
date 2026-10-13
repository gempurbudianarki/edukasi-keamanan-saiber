import React from 'react';
import { User, Lock, Unlock, MapPin, Mail, PhoneCall } from 'lucide-react';

export function SocialProfilePreview({ settings }) {
  return (
    <div className="glass-panel scenario-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
        <div style={{ position: 'relative' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <User size={28} color="#fff" />
          </div>
          <div style={{ position: 'absolute', bottom: -2, right: -2, background: settings.isPrivateAccount ? '#10b981' : '#ef4444', borderRadius: '50%', padding: '3px', color: '#fff', display: 'flex' }}>
            {settings.isPrivateAccount ? <Lock size={12} /> : <Unlock size={12} />}
          </div>
        </div>

        <div>
          <div style={{ fontWeight: 800, fontSize: '1.15rem' }}>pelajar_kekinian</div>
          <span className={`badge ${settings.isPrivateAccount ? 'badge-green' : 'badge-red'}`} style={{ marginTop: '4px' }}>
            {settings.isPrivateAccount ? 'Akun Privat (Terkunci)' : 'Akun Publik (Terbuka Bebas)'}
          </span>
        </div>
      </div>

      <div style={{ fontSize: '0.84rem', color: '#cbd5e1', lineHeight: 1.5, marginBottom: '18px' }}>
        Siswa SMA • Hobi Fotografi & Game • Banda Aceh 📍
      </div>

      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)', paddingTop: '14px', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: settings.hidePreciseLocation ? '#86efac' : '#fca5a5' }}>
          <MapPin size={15} />
          <span>Lokasi Presisi: {settings.hidePreciseLocation ? 'Disembunyikan (Aman dari Stalker)' : 'Terbuka Terlacak (Banda Aceh)'}</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: settings.hideContactInfo ? '#86efac' : '#fca5a5' }}>
          <PhoneCall size={15} />
          <span>Nomor WhatsApp: {settings.hideContactInfo ? 'Disembunyikan dari Publik' : '+62 812-3456-7890 (Tampak Bebas)'}</span>
        </div>
      </div>
    </div>
  );
}
