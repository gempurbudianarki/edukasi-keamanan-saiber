import React, { useState, useEffect } from 'react';
import { ArrowLeft, RotateCcw, ShieldCheck, Sparkles, Globe, Mail, Radio, Search } from 'lucide-react';
import { apiClient } from '../../../api/apiClient';
import { playSound } from '../../../utils/soundEffects';
import { syncRouteToUrl, getRouteParams } from '../../../utils/navigation';
import { WebSimulationView } from './views/WebSimulationView';
import { DomainComparatorView } from './views/DomainComparatorView';
import { EmailSpoofingView } from './views/EmailSpoofingView';
import { UrlScannerView } from './views/UrlScannerView';
import { calculateMissionAccuracy } from '../../../utils/scoring';
import { getRadarSession, saveRadarSession, resetRadarSession } from '../../../utils/storage';
import './PhishingRadar.css';

export function PhishingRadar({ onBack, onComplete, initialScore = 0 }) {
  // Sync tab with URL parameter (tab=simulation | domain_comparator | email_spoofing | url_scanner)
  const [activeMode, setActiveMode] = useState(() => {
    const params = getRouteParams();
    if (params.tab && ['simulation', 'domain_comparator', 'email_spoofing', 'url_scanner'].includes(params.tab)) {
      return params.tab;
    }
    return 'simulation';
  });

  const [scenarios, setScenarios] = useState([]);
  const [domainDrills, setDomainDrills] = useState([]);
  const [emailDrills, setEmailDrills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Result histories & question indices initialized from persistent radar session
  const [radarSession] = useState(() => getRadarSession());
  const [simHistory, setSimHistory] = useState(() => radarSession?.simHistory || []);
  const [domainHistory, setDomainHistory] = useState(() => radarSession?.domainHistory || []);
  const [emailHistory, setEmailHistory] = useState(() => radarSession?.emailHistory || []);

  const [simIndex, setSimIndex] = useState(() => radarSession?.simIndex || 0);
  const [domainIndex, setDomainIndex] = useState(() => radarSession?.domainIndex || 0);
  const [emailIndex, setEmailIndex] = useState(() => radarSession?.emailIndex || 0);

  const [finished, setFinished] = useState(false);

  // Persist progress so F5 / page reload preserves active question and answers
  useEffect(() => {
    saveRadarSession({
      simHistory,
      domainHistory,
      emailHistory,
      simIndex,
      domainIndex,
      emailIndex
    });
  }, [simHistory, domainHistory, emailHistory, simIndex, domainIndex, emailIndex]);

  const handleTabChange = (mode) => {
    setActiveMode(mode);
    syncRouteToUrl('phishing', mode, false);
  };

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
    const combinedHistory = [...simHistory, ...domainHistory, ...emailHistory];
    const totalQuestions = (scenarios.length || 6) + (domainDrills.length || 3) + (emailDrills.length || 5);
    const finalPct = calculateMissionAccuracy(combinedHistory, totalQuestions);
    resetRadarSession();
    onComplete(finalPct);
  };

  const handleRestart = () => {
    playSound('click');
    setSimHistory([]);
    setDomainHistory([]);
    setEmailHistory([]);
    setSimIndex(0);
    setDomainIndex(0);
    setEmailIndex(0);
    setFinished(false);
    resetRadarSession();
    handleTabChange('simulation');
  };

  // Completion screen
  if (finished) {
    const combinedHistory = [...simHistory, ...domainHistory, ...emailHistory];
    const totalQuestions = scenarios.length + domainDrills.length + emailDrills.length;
    const finalPct = calculateMissionAccuracy(combinedHistory, totalQuestions);
    const totalCorrect = new Set(
      combinedHistory.filter(h => h.correct).map(h => h.id)
    ).size;

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
          <h2 style={{ fontSize: '1.8rem', marginBottom: 10, color: '#0f172a' }}>
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
            <button className="btn btn-primary" onClick={() => { resetRadarSession(); onComplete(finalPct); onBack(); }}>
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
          <div className="radar-status-indicator" title="Sistem Radar Siber Aktif">
            <span className="radar-ping-dot" />
            <span className="radar-sweep-scanner" />
          </div>
          <span className="badge badge-red">Misi 01: Phishing Radar</span>
          <span className="badge badge-cyan">
            Progress: {simHistory.length + domainHistory.length + emailHistory.length} Kasus Selesai
          </span>
        </div>
      </div>

      {/* Mode navigation tabs */}
      <div className="tactical-mode-selector">
        <button
          className={`tactical-tab-btn ${activeMode === 'simulation' ? 'active' : ''}`}
          onClick={() => { playSound('beep'); handleTabChange('simulation'); }}
        >
          <Radio size={16} />
          <span>Simulasi Web ({scenarios.length})</span>
        </button>

        <button
          className={`tactical-tab-btn ${activeMode === 'domain_comparator' ? 'active' : ''}`}
          onClick={() => { playSound('beep'); handleTabChange('domain_comparator'); }}
        >
          <Globe size={16} />
          <span>Komparasi Domain ({domainDrills.length})</span>
        </button>

        <button
          className={`tactical-tab-btn ${activeMode === 'email_spoofing' ? 'active' : ''}`}
          onClick={() => { playSound('beep'); handleTabChange('email_spoofing'); }}
        >
          <Mail size={16} />
          <span>Forensik Email ({emailDrills.length})</span>
        </button>

        <button
          className={`tactical-tab-btn ${activeMode === 'url_scanner' ? 'active' : ''}`}
          onClick={() => { playSound('scan'); handleTabChange('url_scanner'); }}
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
              initialIndex={simIndex}
              onIndexChange={setSimIndex}
              onRecordResult={(r) => setSimHistory(prev => [...prev, r])}
              onCompleteMode={() => handleTabChange('domain_comparator')}
            />
          )}

          {activeMode === 'domain_comparator' && (
            <DomainComparatorView
              drills={domainDrills}
              initialIndex={domainIndex}
              onIndexChange={setDomainIndex}
              onRecordResult={(r) => setDomainHistory(prev => [...prev, r])}
              onCompleteMode={() => handleTabChange('email_spoofing')}
            />
          )}

          {activeMode === 'email_spoofing' && (
            <EmailSpoofingView
              drills={emailDrills}
              initialIndex={emailIndex}
              onIndexChange={setEmailIndex}
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
