import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, ShieldCheck, AlertTriangle, Zap, Activity } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';
import { apiClient } from '../../../../api/apiClient';

export function UrlScannerView() {
  const [urlInput, setUrlInput] = useState('https://dana-kaget-klaim2026.xyz/dompet-digital/auth');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const PRESET_SAMPLES = [
    { name: 'Klaim DANA Palsu (.xyz)', url: 'https://dana-kaget-klaim2026.xyz/dompet-digital/auth' },
    { name: 'Kemendikbud Beasiswa Resmi (.go.id)', url: 'https://pip.kemdikbud.go.id/login' },
    { name: 'Subdomain Trick Instagram', url: 'https://instagram.com.meta-helpdesk-security.xyz/login' },
    { name: 'Dropper APK Mod (.online)', url: 'http://capcut-pro-mod.apk-hub.online/download/app' },
    { name: 'Internet Banking BCA Resmi', url: 'https://www.klikbca.com/login' }
  ];

  const handleScan = async (targetUrl) => {
    const scanUrl = targetUrl || urlInput;
    if (!scanUrl.trim()) {
      playSound('beep');
      setErrorMessage('Harap ketik atau pilih tautan URL yang ingin dipindai terlebih dahulu!');
      return;
    }

    setErrorMessage('');
    setLoading(true);
    playSound('scan');
    try {
      const res = await apiClient.analyzeUrl(scanUrl);
      setAnalysis(res);
    } catch {
      // Handled in apiClient fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleScan(urlInput);
  }, []);

  return (
    <div className="glass-panel scenario-card">
      <div className="scenario-topbar">
        <span className="badge badge-purple">AI Heuristic URL Scanner</span>
        <span className="badge badge-cyan">Ekstraksi Fitur RimTouny ML</span>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '16px' }}>
        Ketik tautan apa saja atau pilih sampel uji coba di bawah untuk membedah skor risiko rekayasa phishing secara langsung:
      </p>

      {/* Input bar */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: errorMessage ? '8px' : '14px', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={urlInput}
          onChange={(e) => {
            setUrlInput(e.target.value);
            if (errorMessage) setErrorMessage('');
          }}
          placeholder="https://contoh-domain-mencurigakan.com/path"
          style={{
            flex: 1,
            minWidth: '260px',
            padding: '12px 16px',
            borderRadius: 'var(--nb-radius-md, 8px)',
            border: '2.5px solid var(--nb-border, #000000)',
            background: '#ffffff',
            color: '#0f172a',
            fontSize: '0.92rem',
            fontFamily: 'var(--font-mono)',
            boxShadow: '3px 3px 0 var(--nb-shadow-color, #000000)',
            outline: 'none'
          }}
        />
        <button
          className="btn btn-primary"
          disabled={loading}
          onClick={() => handleScan(urlInput)}
        >
          <Search size={16} />
          <span>{loading ? 'Memindai...' : 'Pindai Tautan'}</span>
        </button>
      </div>

      {errorMessage && (
        <div style={{ background: '#fee2e2', border: '2px solid #000000', color: '#991b1b', padding: '10px 14px', borderRadius: 'var(--nb-radius-md, 8px)', fontSize: '0.84rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '2px 2px 0 #000', fontWeight: 700 }}>
          <AlertTriangle size={16} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Preset pills */}
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
        {PRESET_SAMPLES.map((s, idx) => (
          <button
            key={idx}
            className="btn btn-secondary btn-sm"
            onClick={() => {
              setUrlInput(s.url);
              handleScan(s.url);
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Analysis Result */}
      {analysis && (
        <div style={{ background: '#ffffff', border: '2.5px solid var(--nb-border, #000000)', borderRadius: 'var(--nb-radius-lg, 12px)', padding: '22px', boxShadow: '5px 5px 0 var(--nb-shadow-color, #000000)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.5px' }}>
                Tingkat Risiko Ancaman
              </div>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: analysis.riskLevel?.includes('BAHAYA') ? 'var(--nb-coral, #ff4d4d)' : analysis.riskLevel?.includes('AMAN') ? 'var(--nb-lime, #22c55e)' : 'var(--nb-yellow, #facc15)', fontFamily: 'var(--font-heading)' }}>
                {analysis.riskLevel}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 800 }}>
                Skor Probabilitas Phishing
              </div>
              <div style={{ fontSize: '2.2rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#0f172a' }}>
                {analysis.score}<span style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>/100</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'var(--nb-paper-dot, #fffdf8)', border: '2px solid var(--nb-border, #000000)', padding: '14px 16px', borderRadius: 'var(--nb-radius-md, 8px)', marginBottom: '20px', fontSize: '0.88rem', color: '#1e293b', lineHeight: 1.5, boxShadow: '2px 2px 0 var(--nb-shadow-color, #000000)' }}>
            <strong style={{ color: '#0f172a' }}>Rekomendasi Keamanan:</strong> {analysis.recommendation}
          </div>

          {/* Features list */}
          <div style={{ fontSize: '0.86rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px', fontFamily: 'var(--font-heading)' }}>
            Parameter Ekstraksi Algoritma:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px' }}>
            {analysis.features?.map((f, i) => (
              <div
                key={i}
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--nb-radius-sm, 4px)',
                  background: f.danger ? '#fef2f2' : '#f0fdf4',
                  border: '2px solid var(--nb-border, #000000)',
                  boxShadow: '2px 2px 0 var(--nb-shadow-color, #000000)',
                  fontSize: '0.82rem'
                }}
              >
                <div style={{ fontWeight: 800, color: f.danger ? 'var(--nb-coral, #ff4d4d)' : '#15803d', marginBottom: '4px', fontFamily: 'var(--font-heading)' }}>
                  {f.name}
                </div>
                <div style={{ color: '#334155', lineHeight: 1.45, fontWeight: 500 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
