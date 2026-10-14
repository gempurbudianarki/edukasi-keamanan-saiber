import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Check, X, ShieldCheck, Clock, Key, Cpu, Zap, Activity, Info, Sparkles, Terminal, Flame } from 'lucide-react';
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

  // Pseudo hash calculator for visual feedback
  const getPseudoHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(8, '0');
    return `SHA256:${hex.repeat(4).slice(0, 32)}`;
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
              Analisis Shannon Entropy & simulasi 8x RTX 4090 GPU Cluster
            </div>
          </div>
        </div>

        <span className="badge" style={{ background: analysis.color, color: '#ffffff', fontWeight: 800, fontSize: '0.8rem', boxShadow: `0 0 12px ${analysis.color}60` }}>
          {analysis.label}
        </span>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '14px' }}>
        Ketik atau pilih kata sandi di bawah untuk menguji berapa lama superkomputer hacker mampu meretasnya:
      </p>

      {/* Input box */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <input
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => {
            playSound('keyboard');
            onPasswordChange(e.target.value);
          }}
          placeholder="Ketik kata sandi Anda di sini..."
          className="password-input"
          style={{
            borderColor: 'var(--nb-border, #000000)'
          }}
        />
        <button
          type="button"
          onClick={() => {
            playSound('click');
            onToggleShow();
          }}
          className="password-eye-btn"
        >
          {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
        </button>
      </div>

      {/* 5-Segment Strength Bar */}
      <div className="strength-meter-wrap">
        <div className="strength-meter-header">
          <span>Indikator Kekuatan Sandi:</span>
          <span style={{ color: '#0f172a', fontWeight: 800 }}>Skor Entropi: {analysis.score}/100</span>
        </div>
        <div className="strength-brick-track">
          {[0, 1, 2, 3, 4].map((idx) => (
            <div
              key={idx}
              className="strength-brick-segment"
              style={{
                background: getSegmentColor(idx)
              }}
            />
          ))}
        </div>
      </div>

      {/* Supercomputer Telemetry HUD */}
      <div className="vault-telemetry-hud">
        {/* HUD Top Bar */}
        <div className="vault-telemetry-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--nb-cyan, #00f0ff)', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', fontWeight: 800 }}>
            <Cpu size={16} />
            <span>GPU CLUSTER TELEMETRY (8x NVIDIA RTX 4090)</span>
          </div>
          <span style={{ fontSize: '0.74rem', color: 'var(--nb-lime, #22c55e)', fontFamily: 'var(--font-mono)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Activity size={12} /> 100 GH/s ACTIVE
          </span>
        </div>

        {/* Live Crack Time Highlight */}
        <div style={{ textAlign: 'center', padding: '10px 0' }}>
          <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: '#94a3b8', letterSpacing: '1px', marginBottom: '6px', fontWeight: 700 }}>
            Estimasi Waktu Tembus Komputer Peretas:
          </div>
          <div style={{
            fontSize: '2rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 800,
            color: analysis.score >= 80 ? 'var(--nb-cyan, #00f0ff)' : analysis.score >= 60 ? 'var(--nb-lime, #22c55e)' : analysis.score >= 40 ? 'var(--nb-yellow, #facc15)' : 'var(--nb-coral, #ff4d4d)',
            textShadow: '0 0 20px rgba(0, 240, 255, 0.35)',
            lineHeight: 1.2
          }}>
            {analysis.crackTime}
          </div>
        </div>

        {/* Live Hash Stream */}
        <div className="vault-hash-stream">
          <span style={{ fontWeight: 700 }}>TARGET HASH:</span>
          <span style={{ color: 'var(--nb-cyan, #00f0ff)', fontWeight: 700 }}>{getPseudoHash(password)}</span>
        </div>

        {/* Telemetry Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', borderTop: '2px solid #1e293b', paddingTop: '12px', fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
          <div style={{ background: '#0b1329', padding: '8px 10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#64748b' }}>Kecepatan Uji:</div>
            <div style={{ color: '#cbd5e1', fontWeight: 800 }}>100 Miliar / dtk</div>
          </div>
          <div style={{ background: '#0b1329', padding: '8px 10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#64748b' }}>Panjang Karakter:</div>
            <div style={{ color: '#cbd5e1', fontWeight: 800 }}>{password.length} Karakter</div>
          </div>
          <div style={{ background: '#0b1329', padding: '8px 10px', borderRadius: '6px', border: '1px solid #1e293b' }}>
            <div style={{ color: '#64748b' }}>Shannon Entropy:</div>
            <div style={{ color: analysis.entropy >= 60 ? 'var(--nb-lime, #22c55e)' : 'var(--nb-coral, #ff4d4d)', fontWeight: 800 }}>
              {analysis.entropy} bits
            </div>
          </div>
        </div>
      </div>

      {/* Checklist criteria */}
      <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', marginBottom: '10px', fontFamily: 'var(--font-heading)' }}>
        Parameter Ketahanan Sandi:
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px', marginBottom: '20px' }}>
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
            className={`criteria-item ${item.passed ? 'passed' : ''}`}
          >
            {item.passed ? <Check size={16} color="#16a34a" strokeWidth={3} /> : <X size={16} color="#ff4d4d" strokeWidth={3} />}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Preset samples */}
      <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '8px', fontWeight: 700 }}>
        Uji Cepat Pola Kata Sandi Populer:
      </div>
      <div className="example-pills">
        {samplePasswords.map((item, idx) => (
          <button
            key={idx}
            className="example-pill-btn"
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
