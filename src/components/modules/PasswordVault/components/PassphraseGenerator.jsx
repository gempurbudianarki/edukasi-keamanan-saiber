import React, { useState } from 'react';
import { RefreshCw, Copy, Check, Sparkles, Lock, ArrowUpRight, ShieldCheck, Shuffle } from 'lucide-react';
import { generatePassphrase, indonesianWords } from '../../../../data/passwordRules';
import { playSound } from '../../../../utils/soundEffects';

export function PassphraseGenerator({ onApplyPassphrase }) {
  // Parse passphrase into 4 separate tokens
  const getRandomPhraseData = () => {
    const raw = generatePassphrase();
    const parts = raw.split('-');
    return {
      word1: parts[0] || 'Garuda',
      word2: parts[1] || 'Samudra',
      word3: parts[2] || 'Mentari',
      tail: parts[3] || '99!',
      full: raw
    };
  };

  const [phraseData, setPhraseData] = useState(() => getRandomPhraseData());
  const [copied, setCopied] = useState(false);

  const handleGenerateAll = () => {
    playSound('click');
    const next = getRandomPhraseData();
    setPhraseData(next);
    setCopied(false);
  };

  const handleSwapWord = (index) => {
    playSound('beep');
    const randomWord = indonesianWords[Math.floor(Math.random() * indonesianWords.length)];
    setPhraseData(prev => {
      const updated = { ...prev };
      if (index === 1) updated.word1 = randomWord;
      if (index === 2) updated.word2 = randomWord;
      if (index === 3) updated.word3 = randomWord;
      updated.full = `${updated.word1}-${updated.word2}-${updated.word3}-${updated.tail}`;
      return updated;
    });
    setCopied(false);
  };

  const handleCopy = () => {
    playSound('click');
    navigator.clipboard.writeText(phraseData.full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel scenario-card">
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
          <Sparkles size={22} />
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0 }}>
            Generator Passphrase Indonesia
          </h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Standar NIST: Panjang 4 kata acak jauh lebih kuat daripada sandi rumit yang pendek
          </div>
        </div>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '16px' }}>
        Metode terbaik membuat sandi super aman namun mudah diingat otak manusia: gabungan 3-4 kata Indonesia bermakna + nomor + simbol unik:
      </p>

      {/* Interactive 4-Token Passphrase Container */}
      <div style={{ background: '#f8fafc', border: '1.5px solid #cbd5e1', borderRadius: '14px', padding: '18px', textAlign: 'center', marginBottom: '18px', boxShadow: '0 4px 14px rgba(0, 0, 0, 0.03)' }}>
        
        <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '1px', marginBottom: '12px' }}>
          Kombinasi Blok Kata Sandi (Klik kata untuk mengacak ulang):
        </div>

        {/* Token Pill Badges */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
          <button
            className="btn btn-sm"
            onClick={() => handleSwapWord(1)}
            style={{ background: '#eff6ff', border: '1.5px solid #bfdbfe', color: '#1d4ed8', fontWeight: 800, fontSize: '0.92rem', padding: '8px 14px', borderRadius: '10px', cursor: 'pointer' }}
            title="Klik untuk acak kata ini"
          >
            {phraseData.word1} ↻
          </button>
          <span style={{ color: '#94a3b8', fontWeight: 800 }}>-</span>

          <button
            className="btn btn-sm"
            onClick={() => handleSwapWord(2)}
            style={{ background: '#fdf2f8', border: '1.5px solid #fbcfe8', color: '#be185d', fontWeight: 800, fontSize: '0.92rem', padding: '8px 14px', borderRadius: '10px', cursor: 'pointer' }}
            title="Klik untuk acak kata ini"
          >
            {phraseData.word2} ↻
          </button>
          <span style={{ color: '#94a3b8', fontWeight: 800 }}>-</span>

          <button
            className="btn btn-sm"
            onClick={() => handleSwapWord(3)}
            style={{ background: '#f0fdf4', border: '1.5px solid #bbf7d0', color: '#15803d', fontWeight: 800, fontSize: '0.92rem', padding: '8px 14px', borderRadius: '10px', cursor: 'pointer' }}
            title="Klik untuk acak kata ini"
          >
            {phraseData.word3} ↻
          </button>
          <span style={{ color: '#94a3b8', fontWeight: 800 }}>-</span>

          <span style={{ background: '#fef3c7', border: '1.5px solid #fde68a', color: '#b45309', fontWeight: 800, fontSize: '0.92rem', padding: '8px 14px', borderRadius: '10px' }}>
            {phraseData.tail}
          </span>
        </div>

        {/* Full string display */}
        <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '10px', fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: 800, color: '#dc2626', letterSpacing: '0.5px', marginBottom: '14px', wordBreak: 'break-all' }}>
          {phraseData.full}
        </div>

        {/* Action Controls */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary btn-sm" onClick={handleGenerateAll}>
            <RefreshCw size={14} /> Acak Ulang Semua
          </button>
          <button className="btn btn-secondary btn-sm" onClick={handleCopy}>
            {copied ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
            <span>{copied ? 'Tersalin ke Clipboard!' : 'Salin Passphrase'}</span>
          </button>
        </div>
      </div>

      {/* Apply to tester */}
      <button
        className="btn btn-primary btn-full"
        style={{ padding: '12px', fontSize: '0.92rem', fontWeight: 700 }}
        onClick={() => {
          playSound('success');
          onApplyPassphrase(phraseData.full);
        }}
      >
        <Lock size={16} />
        <span>Terapkan Passphrase Ini ke Uji Telemetri</span>
      </button>

      {/* Educational fact card */}
      <div style={{ marginTop: '16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '10px', padding: '12px', fontSize: '0.8rem', color: '#166534', lineHeight: 1.5 }}>
        <strong>💡 Mengapa Passphrase Lebih Unggul?</strong>
        <br />
        Sandi rumit seperti <code>Tr0Ub&9!</code> sulit dihafal otak dan hanya 8 karakter (mudah di-brute force). Sedangkan <code>Garuda-Samudra-Mentari-99$</code> memiliki panjang 28 karakter dengan variasi kombinasi raksasa ($2^{140}$), mustahil ditembus seumur alam semesta!
      </div>
    </div>
  );
}
