import React from 'react';
import { Eye, EyeOff, Check, X, ShieldCheck, Clock, Key } from 'lucide-react';

export function PasswordTester({ 
  password, 
  onPasswordChange, 
  showPassword, 
  onToggleShow, 
  analysis 
}) {
  const samplePasswords = [
    '123456',
    'sayang123',
    'jakarta2024',
    'Kopi#Panas@2026!',
    'Garuda-Samudra-Mentari-99$'
  ];

  return (
    <div className="glass-panel scenario-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <Key size={22} color="var(--accent-green)" />
        <h2 style={{ fontSize: '1.25rem' }}>Uji Ketahanan Kata Sandi</h2>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '16px' }}>
        Ketik sandi apa saja untuk melihat estimasi waktu yang dibutuhkan superkomputer hacker untuk meretasnya via serangan brute-force:
      </p>

      {/* Input bar */}
      <div style={{ position: 'relative', marginBottom: '14px' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          placeholder="Ketik kata sandi..."
          style={{
            width: '100%',
            padding: '12px 45px 12px 14px',
            borderRadius: '8px',
            border: `2px solid ${analysis.color}`,
            background: '#ffffff',
            color: '#0f172a',
            fontSize: '1.05rem',
            fontFamily: 'var(--font-mono)'
          }}
        />
        <button
          type="button"
          onClick={onToggleShow}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>

      {/* Cracking time banner */}
      <div style={{ background: '#f8fafc', border: `1.5px solid ${analysis.color}50`, borderRadius: '12px', padding: '18px', marginBottom: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-secondary)', fontSize: '0.8rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
          <Clock size={15} /> Estimasi Waktu Retas Hacker:
        </div>
        <div style={{ fontSize: '1.6rem', fontWeight: 800, color: analysis.color, fontFamily: 'var(--font-mono)' }}>
          {analysis.crackTime}
        </div>
        <div style={{ fontSize: '0.84rem', color: '#475569', marginTop: '4px' }}>
          Kategori: <strong style={{ color: '#0f172a' }}>{analysis.label}</strong> (Skor Entropi: {analysis.score}/100)
        </div>
      </div>

      {/* Checklist criteria */}
      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
        Indikator Kriteria Keamanan:
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', marginBottom: '18px' }}>
        {analysis.checks?.map((chk, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: chk.passed ? '#15803d' : '#64748b', fontWeight: chk.passed ? 600 : 400 }}>
            {chk.passed ? <Check size={14} color="#16a34a" /> : <X size={14} color="#dc2626" />}
            <span>{chk.label}</span>
          </div>
        ))}
      </div>

      {/* Preset samples */}
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
        Uji Contoh Pola Sandi Populer:
      </div>
      <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
        {samplePasswords.map((s, idx) => (
          <button
            key={idx}
            className="btn btn-secondary btn-sm"
            onClick={() => onPasswordChange(s)}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
