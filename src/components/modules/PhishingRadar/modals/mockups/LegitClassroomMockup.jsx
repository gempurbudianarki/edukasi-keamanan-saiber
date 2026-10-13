import React from 'react';
import { GraduationCap, ShieldCheck, ExternalLink } from 'lucide-react';

export function LegitClassroomMockup({ onClose }) {
  return (
    <div style={{ padding: '28px', maxWidth: '440px', margin: '0 auto', color: '#1e293b', textAlign: 'center' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#10b981', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
        <GraduationCap size={32} />
      </div>
      <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '6px' }}>
        Google Classroom Resmi
      </h3>
      <p style={{ fontSize: '0.86rem', color: '#64748b', marginBottom: '20px' }}>
        Kelas Literasi Keamanan Siber • UBBG PKM 2026
      </p>

      <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '16px', marginBottom: '20px', textAlign: 'left' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#16a34a', fontWeight: 700, fontSize: '0.88rem', marginBottom: '4px' }}>
          <ShieldCheck size={18} /> Domain Sah & Aman
        </div>
        <p style={{ fontSize: '0.8rem', color: '#166534', margin: 0, lineHeight: 1.5 }}>
          Tautan mengarah ke host <strong>classroom.google.com</strong> yang dilindungi sertifikat SSL resmi Google Trust Services.
        </p>
      </div>

      <button
        onClick={onClose}
        className="btn btn-primary btn-full"
        style={{ background: '#10b981', borderColor: '#059669', padding: '12px', fontWeight: 600 }}
      >
        Tutup & Kembali ke Latihan
      </button>
    </div>
  );
}
