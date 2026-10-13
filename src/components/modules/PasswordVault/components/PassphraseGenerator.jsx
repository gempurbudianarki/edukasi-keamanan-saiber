import React, { useState } from 'react';
import { RefreshCw, Copy, Check, Sparkles, Lock } from 'lucide-react';
import { generatePassphrase } from '../../../../data/passwordRules';
import { playSound } from '../../../../utils/soundEffects';

export function PassphraseGenerator({ onApplyPassphrase }) {
  const [passphrase, setPassphrase] = useState(generatePassphrase());
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    playSound('click');
    setPassphrase(generatePassphrase());
    setCopied(false);
  };

  const handleCopy = () => {
    playSound('click');
    navigator.clipboard.writeText(passphrase);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel scenario-card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <Sparkles size={22} color="#dc2626" />
        <h2 style={{ fontSize: '1.25rem', color: '#0f172a' }}>Generator Passphrase Indonesia</h2>
      </div>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '16px' }}>
        Metode terbaik membuat sandi tangguh namun mudah diingat: gabungan 3-4 kata Indonesia bermakna + angka + simbol:
      </p>

      <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '12px', padding: '18px', textAlign: 'center', marginBottom: '18px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.03)' }}>
        <div style={{ fontSize: '1.2rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#dc2626', wordBreak: 'break-all', marginBottom: '14px', letterSpacing: '1px' }}>
          {passphrase}
        </div>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleGenerate}>
            <RefreshCw size={14} /> Acak Ulang
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
            {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
            <span>{copied ? 'Tersalin!' : 'Salin Sandi'}</span>
          </button>
        </div>
      </div>

      <button
        className="btn btn-primary btn-full"
        onClick={() => {
          playSound('success');
          onApplyPassphrase(passphrase);
        }}
      >
        <Lock size={16} />
        <span>Gunakan Passphrase Ini & Uji Ketahanannya</span>
      </button>
    </div>
  );
}
