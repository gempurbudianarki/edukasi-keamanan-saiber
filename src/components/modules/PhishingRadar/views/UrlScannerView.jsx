import React, { useState, useEffect } from 'react';
import { Search, ShieldAlert, ShieldCheck, AlertTriangle, Zap, Activity } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';
import { apiClient } from '../../../../api/apiClient';

export function UrlScannerView() {
  const [urlInput, setUrlInput] = useState('https://dana-kaget-klaim2026.xyz/dompet-digital/auth');
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const PRESET_SAMPLES = [
    { name: 'Klaim DANA Palsu (.xyz)', url: 'https://dana-kaget-klaim2026.xyz/dompet-digital/auth' },
    { name: 'Kemendikbud Beasiswa Resmi (.go.id)', url: 'https://pip.kemdikbud.go.id/login' },
    { name: 'Subdomain Trick Instagram', url: 'https://instagram.com.meta-helpdesk-security.xyz/login' },
    { name: 'Dropper APK Mod (.online)', url: 'http://capcut-pro-mod.apk-hub.online/download/app' },
    { name: 'Internet Banking BCA Resmi', url: 'https://www.klikbca.com/login' }
  ];

  const handleScan = async (targetUrl) => {
    const scanUrl = targetUrl || urlInput;
    if (!scanUrl.trim()) return;

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
      <div style={{ display: 'flex', gap: '10px', marginBottom: '14px', flexWrap: 'wrap' }}>
        <input
          type="text"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="https://contoh-domain-mencurigakan.com/path"
          style={{ flex: 1, minWidth: '260px', padding: '12px 14px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.15)', background: 'rgba(0, 0, 0, 0.4)', color: '#fff', fontSize: '0.9rem', fontFamily: 'var(--font-mono)' }}
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
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: `1.5px solid ${analysis.riskColor}40`, borderRadius: '12px', padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', fontWeight: 700 }}>
                Tingkat Risiko Ancaman
              </div>
              <div style={{ fontSize: '1.2rem', fontWeight: 800, color: analysis.riskColor }}>
                {analysis.riskLevel}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
                Skor Probabilitas Phishing
              </div>
              <div style={{ fontSize: '2rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: analysis.riskColor }}>
                {analysis.score}<span style={{ fontSize: '1rem', color: 'var(--text-secondary)' }}>/100</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.3)', padding: '12px', borderRadius: '8px', marginBottom: '18px', fontSize: '0.86rem', color: '#cbd5e1' }}>
            <strong>Rekomendasi Keamanan:</strong> {analysis.recommendation}
          </div>

          {/* Features list */}
          <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#94a3b8', marginBottom: '8px' }}>
            Parameter Ekstraksi Algoritma:
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
            {analysis.features?.map((f, i) => (
              <div
                key={i}
                style={{
                  padding: '10px 12px',
                  borderRadius: '6px',
                  background: f.danger ? 'rgba(220, 38, 38, 0.1)' : 'rgba(22, 163, 74, 0.08)',
                  border: `1px solid ${f.danger ? 'rgba(220, 38, 38, 0.25)' : 'rgba(22, 163, 74, 0.25)'}`,
                  fontSize: '0.78rem'
                }}
              >
                <div style={{ fontWeight: 700, color: f.danger ? '#fca5a5' : '#86efac', marginBottom: '2px' }}>
                  {f.name}
                </div>
                <div style={{ color: '#94a3b8', lineHeight: 1.4 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
