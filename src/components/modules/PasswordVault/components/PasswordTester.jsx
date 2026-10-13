import React, { useState } from 'react';
import { Eye, EyeOff, Check, X, ShieldCheck, Clock, Key, Cpu, Zap, Activity, Info, Sparkles } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';

export function PasswordTester({ 
  password, 
  onPasswordChange, 
  showPassword, 
  onToggleShow, 
  analysis 
}) {
  const samplePasswords = [
    { label: '123456', desc: 'Sandi terpopuler (Langsung Bobol)' },
    { label: 'sayang123', desc: 'Pola kata + angka umum' },
    { label: 'jakarta2024', desc: 'Nama kota + tahun' },
    { label: 'Kopi#Panas@2026!', desc: 'Kombinasi simbol & angka' },
    { label: 'Garuda-Samudra-Mentari-99$', desc: 'Passphrase Indonesia 4 Kata' }
  ];

  // 5-segment strength score (0 to 5)
  const segmentsCount = 5;
  const activeSegments = Math.min(segmentsCount, Math.ceil((analysis.score / 100) * segmentsCount));

  const getSegmentColor = (index) => {
    if (index >= activeSegments) return '#e2e8f0';
    if (activeSegments === 1) return '#ef4444'; // Red
    if (activeSegments === 2) return '#f97316'; // Orange
    if (activeSegments === 3) return '#eab308'; // Yellow
    if (activeSegments === 4) return '#22c55e'; // Green
    return '#00f0ff'; // Neon Cyan / Strongest
  };

  return (
    <div className="glass-panel scenario-card">
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
            <Key size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0 }}>
              Uji Ketahanan Sandi & Telemetri Bobol
            </h2>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              Analisis matematis Shannon Entropy & simulasi brute-force GPU cluster
            </div>
          </div>
        </div>

        <span className="badge" style={{ background: analysis.color, color: '#ffffff', fontWeight: 700, fontSize: '0.78rem' }}>
          {analysis.label}
        </span>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '14px' }}>
        Ketik atau pilih kata sandi di bawah untuk menguji berapa lama superkomputer hacker mampu meretasnya:
      </p>

      {/* Input box */}
      <div style={{ position: 'relative', marginBottom: '12px' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            playSound('click');
            onPasswordChange(e.target.value);
          }}
          placeholder="Ketik kata sandi Anda di sini..."
          style={{
            width: '100%',
            padding: '14px 48px 14px 16px',
            borderRadius: '12px',
            border: `2px solid ${analysis.color}`,
            background: '#ffffff',
            color: '#0f172a',
            fontSize: '1.15rem',
            fontFamily: 'var(--font-mono)',
            outline: 'none',
            boxShadow: `0 0 14px ${analysis.color}25`,
            transition: 'all 0.25s'
          }}
        />
        <button
          type="button"
          onClick={onToggleShow}
          style={{
            position: 'absolute',
            right: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'transparent',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
        </button>
      </div>

      {/* 5-Segment Strength Bar */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '6px' }}>
          <span>Indikator Kekuatan Sandi</span>
          <span style={{ color: analysis.color }}>Skor Entropi: {analysis.score}/100</span>
        </div>
        <div style={{ display: 'flex', gap: '6px', height: '10px' }}>
          {[0, 1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              style={{
                flex: 1,
                borderRadius: '5px',
                background: getSegmentColor(idx),
                transition: 'background-color 0.3s ease, transform 0.2s',
                boxShadow: idx < activeSegments && activeSegments === 5 ? '0 0 8px rgba(0, 240, 255, 0.6)' : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Supercomputer Telemetry HUD */}
      <div style={{
        background: '#020617',
        border: '1.5px solid #1e293b',
        borderRadius: '14px',
        padding: '18px',
        marginBottom: '18px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
        color: '#f8fafc'
      }}>
        {/* HUD Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b', paddingBottom: '10px', marginBottom: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
            <Cpu size={16} />
            <span>TELEMETRI CRACKING SUPERKOMPUTER</span>
          </div>
          <span style={{ fontSize: '0.72rem', color: '#22c55e', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Activity size={12} /> HASHCAT ONLINE
          </span>
        </div>

        {/* Live Crack Time Highlight */}
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', marginBottom: '4px' }}>
            Estimasi Waktu Tembus Komputer Peretas:
          </div>
          <div style={{
            fontSize: '1.85rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            color: analysis.color,
            textShadow: `0 0 16px ${analysis.color}60`,
            lineHeight: 1.2
          }}>
            {analysis.crackTime}
          </div>
        </div>

        {/* Telemetry Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginTop: '12px', borderTop: '1px solid #1e293b', paddingTop: '12px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          <div style={{ background: '#0b1329', padding: '8px 10px', borderRadius: '8px' }}>
            <div style={{ color: '#64748b' }}>Kecepatan Uji:</div>
            <div style={{ color: '#cbd5e1', fontWeight: 700 }}>100 Miliar / dtk</div>
          </div>
          <div style={{ background: '#0b1329', padding: '8px 10px', borderRadius: '8px' }}>
            <div style={{ color: '#64748b' }}>Karakter:</div>
            <div style={{ color: '#cbd5e1', fontWeight: 700 }}>{password.length} Karakter</div>
          </div>
          <div style={{ background: '#0b1329', padding: '8px 10px', borderRadius: '8px' }}>
            <div style={{ color: '#64748b' }}>Shannon Entropy:</div>
            <div style={{ color: analysis.entropy >= 60 ? '#4ade80' : '#f87171', fontWeight: 700 }}>
              {analysis.entropy} bits
            </div>
          </div>
        </div>
      </div>

      {/* Checklist criteria */}
      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#334155', marginBottom: '8px' }}>
        Parameter Ketahanan Sandi:
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '8px', marginBottom: '18px' }}>
        {[
          { label: 'Panjang min. 12 Karakter', passed: analysis.checks?.length },
          { label: 'Huruf Kecil (a-z)', passed: analysis.checks?.lowercase },
          { label: 'Huruf Besar (A-Z)', passed: analysis.checks?.uppercase },
          { label: 'Angka (0-9)', passed: analysis.checks?.number },
          { label: 'Simbol Unik (!@#$)', passed: analysis.checks?.special },
          { label: 'Bukan Kata Pasaran', passed: analysis.checks?.notCommon }
        ].map((item, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              padding: '6px 10px',
              borderRadius: '8px',
              background: item.passed ? '#f0fdf4' : '#f8fafc',
              border: `1px solid ${item.passed ? '#bbf7d0' : '#e2e8f0'}`,
              color: item.passed ? '#15803d' : '#64748b',
              fontWeight: item.passed ? 600 : 400
            }}
          >
            {item.passed ? <Check size={14} color="#16a34a" /> : <X size={14} color="#dc2626" />}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Preset samples */}
      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
        Uji Cepat Pola Kata Sandi Populer:
      </div>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {samplePasswords.map((item, idx) => (
          <button
            key={idx}
            className="btn btn-secondary btn-sm"
            style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}
            onClick={() => {
              playSound('click');
              onPasswordChange(item.label);
            }}
            title={item.desc}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}
