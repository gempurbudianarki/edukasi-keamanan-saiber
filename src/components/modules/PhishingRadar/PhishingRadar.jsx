import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, ShieldCheck, Sparkles, Globe, Mail, Radio, Search } from 'lucide-react';
import { apiClient } from '../../../api/apiClient';
import { playSound } from '../../../utils/soundEffects';
import { WebSimulationView } from './views/WebSimulationView';
import { DomainComparatorView } from './views/DomainComparatorView';
import { EmailSpoofingView } from './views/EmailSpoofingView';
import { UrlScannerView } from './views/UrlScannerView';
import './PhishingRadar.css';

export function PhishingRadar({ onBack, onComplete, initialScore = 0 }) {
  const [activeMode, setActiveMode] = useState('simulation');
  const [scenarios, setScenarios] = useState([]);
  const [domainDrills, setDomainDrills] = useState([]);
  const [emailDrills, setEmailDrills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Result histories
  const [simHistory, setSimHistory] = useState([]);
  const [domainHistory, setDomainHistory] = useState([]);
  const [emailHistory, setEmailHistory] = useState([]);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [scRes, domRes, emRes] = await Promise.all([
          apiClient.getPhishingScenarios(),
          apiClient.getDomainDrills(),
          apiClient.getEmailDrills()
        ]);
        if (isMounted) {
          setScenarios(scRes);
          setDomainDrills(domRes);
          setEmailDrills(emRes);
          setLoading(false);
        }
      } catch {
        if (isMounted) setLoading(false);
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, []);

  const handleFinishAll = () => {
    playSound('complete');
    setFinished(true);
    const totalCorrect = [
      ...simHistory.filter(h => h.correct),
      ...domainHistory.filter(h => h.correct),
      ...emailHistory.filter(h => h.correct)
    ].length;
    const totalQuestions = (scenarios.length || 4) + (domainDrills.length || 3) + (emailDrills.length || 2);
    const finalPct = Math.min(100, Math.round((totalCorrect / Math.max(1, totalQuestions)) * 100));
    onComplete(finalPct);
  };

  const handleRestart = () => {
    playSound('click');
    setSimHistory([]);
    setDomainHistory([]);
    setEmailHistory([]);
    setFinished(false);
    setActiveMode('simulation');
  };

  // Completion screen
  if (finished) {
    const totalCorrect = [
      ...simHistory.filter(h => h.correct),
      ...domainHistory.filter(h => h.correct),
      ...emailHistory.filter(h => h.correct)
    ].length;
    const totalQuestions = scenarios.length + domainDrills.length + emailDrills.length;
    const finalPct = Math.min(100, Math.round((totalCorrect / Math.max(1, totalQuestions)) * 100));

    return (
      <div className="module-page container">
        <div className="module-header">
          <button className="module-nav-back" onClick={onBack}>
            <ArrowLeft size={16} /> Kembali ke Misi Hub
          </button>
        </div>

        <div className="glass-panel scenario-card" style={{ textAlign: 'center', padding: '48px 24px' }}>
          <ShieldCheck size={52} color="#dc2626" style={{ marginBottom: 16 }} />
          <div className="badge badge-red" style={{ marginBottom: 12 }}>
            MISI 01 SELESAI // EVALUASI PHISHING TUNTAS
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: 10, color: '#fff' }}>
            Operasi Pertahanan Phishing Sukses
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 24, maxWidth: 580, margin: '0 auto 24px' }}>
            Kamu telah menuntaskan simulasi serangan web berbahaya, komparasi domain asli vs palsu, dan forensik header email.
          </p>

          <div style={{ background: 'rgba(255, 255, 255, 0.04)', border: '1.5px solid rgba(220, 38, 38, 0.3)', borderRadius: '12px', padding: 24, maxWidth: 320, margin: '0 auto 28px' }}>
            <div style={{ fontSize: '0.8rem', color: '#dc2626', fontWeight: 700, textTransform: 'uppercase', marginBottom: 4 }}>
              Akurasi Deteksi Siswa
            </div>
            <div style={{ fontSize: '3.2rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: finalPct >= 70 ? '#16a34a' : '#dc2626' }}>
              {finalPct}<span style={{ fontSize: '1.2rem', color: 'var(--text-secondary)' }}>%</span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4 }}>
              {totalCorrect} dari {totalQuestions} kasus terpecahkan dengan tepat
            </div>
          </div>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button className="btn btn-secondary" onClick={handleRestart}>
              <RotateCcw size={16} /> Ulangi Latihan
            </button>
            <button className="btn btn-primary" onClick={() => { onComplete(finalPct); onBack(); }}>
              <Sparkles size={16} /> Simpan Hasil & Lanjut
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module-page container">
      {/* Header bar */}
      <div className="module-header">
        <button className="module-nav-back" onClick={onBack}>
          <ArrowLeft size={16} /> Kembali ke Misi Hub
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span className="badge badge-red">Misi 01: Phishing Radar</span>
          <span className="badge badge-cyan">
            Progress: {simHistory.length + domainHistory.length + emailHistory.length} Kasus Selesai
          </span>
        </div>
      </div>

      {/* Mode navigation tabs */}
      <div className="mode-nav-tabs">
        <button
          className={`mode-tab-btn ${activeMode === 'simulation' ? 'active' : ''}`}
          onClick={() => { playSound('beep'); setActiveMode('simulation'); }}
        >
          <Radio size={16} />
          <span>Simulasi Web ({scenarios.length})</span>
        </button>

        <button
          className={`mode-tab-btn ${activeMode === 'domain_comparator' ? 'active' : ''}`}
          onClick={() => { playSound('beep'); setActiveMode('domain_comparator'); }}
        >
          <Globe size={16} />
          <span>Komparasi Domain ({domainDrills.length})</span>
        </button>

        <button
          className={`mode-tab-btn ${activeMode === 'email_spoofing' ? 'active' : ''}`}
          onClick={() => { playSound('beep'); setActiveMode('email_spoofing'); }}
        >
          <Mail size={16} />
          <span>Forensik Email ({emailDrills.length})</span>
        </button>

        <button
          className={`mode-tab-btn ${activeMode === 'url_scanner' ? 'active' : ''}`}
          onClick={() => { playSound('scan'); setActiveMode('url_scanner'); }}
        >
          <Search size={16} />
          <span>Scanner URL AI</span>
        </button>
      </div>

      {/* Active view component */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
          Memuat data latihan pertahanan siber...
        </div>
      ) : (
        <>
          {activeMode === 'simulation' && (
            <WebSimulationView
              scenarios={scenarios}
              onRecordResult={(r) => setSimHistory(prev => [...prev, r])}
              onCompleteMode={() => setActiveMode('domain_comparator')}
            />
          )}

          {activeMode === 'domain_comparator' && (
            <DomainComparatorView
              drills={domainDrills}
              onRecordResult={(r) => setDomainHistory(prev => [...prev, r])}
              onCompleteMode={() => setActiveMode('email_spoofing')}
            />
          )}

          {activeMode === 'email_spoofing' && (
            <EmailSpoofingView
              drills={emailDrills}
              onRecordResult={(r) => setEmailHistory(prev => [...prev, r])}
              onCompleteMode={handleFinishAll}
            />
          )}

          {activeMode === 'url_scanner' && (
            <UrlScannerView />
          )}
        </>
      )}
    </div>
  );
}
