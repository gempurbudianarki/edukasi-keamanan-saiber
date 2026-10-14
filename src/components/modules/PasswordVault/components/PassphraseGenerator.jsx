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
      <div className="passphrase-box">
        
        <div style={{ fontSize: '0.78rem', color: '#0f172a', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '1px', marginBottom: '14px', fontFamily: 'var(--font-heading)' }}>
          Kombinasi Blok Kata Sandi (Klik kata untuk mengacak ulang):
        </div>

        {/* Token Pill Badges */}
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center', marginBottom: '16px' }}>
          <button
            className="passphrase-token-btn"
            onClick={() => handleSwapWord(1)}
            style={{ background: '#eff6ff', color: '#1d4ed8' }}
            title="Klik untuk acak kata ini"
          >
            {phraseData.word1} ↻
          </button>
          <span style={{ color: '#0f172a', fontWeight: 900, fontSize: '1.2rem' }}>-</span>

          <button
            className="passphrase-token-btn"
            onClick={() => handleSwapWord(2)}
            style={{ background: '#fdf2f8', color: '#be185d' }}
            title="Klik untuk acak kata ini"
          >
            {phraseData.word2} ↻
          </button>
          <span style={{ color: '#0f172a', fontWeight: 900, fontSize: '1.2rem' }}>-</span>

          <button
            className="passphrase-token-btn"
            onClick={() => handleSwapWord(3)}
            style={{ background: '#f0fdf4', color: '#15803d' }}
            title="Klik untuk acak kata ini"
          >
            {phraseData.word3} ↻
          </button>
          <span style={{ color: '#0f172a', fontWeight: 900, fontSize: '1.2rem' }}>-</span>

          <span
            className="passphrase-token-btn"
            style={{ background: 'var(--nb-yellow, #facc15)', color: '#0f172a', cursor: 'default' }}
          >
            {phraseData.tail}
          </span>
        </div>

        {/* Full string display */}
        <div className="passphrase-full-display">
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
        <strong style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Sparkles size={16} /> Mengapa Passphrase Lebih Unggul?</strong>
        <br />
        Sandi rumit seperti <code>Tr0Ub&9!</code> sulit dihafal otak dan hanya 8 karakter (mudah di-brute force). Sedangkan <code>Garuda-Samudra-Mentari-99$</code> memiliki panjang 28 karakter dengan variasi kombinasi raksasa ($2^{140}$), mustahil ditembus seumur alam semesta!
      </div>
    </div>
  );
}
