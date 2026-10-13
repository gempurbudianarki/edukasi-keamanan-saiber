import React, { useState } from 'react';
import { 
  Shield, 
  ShieldAlert, 
  ShieldCheck, 
  Search, 
  ExternalLink, 
  ChevronRight, 
  AlertTriangle,
  Smartphone,
  MessageSquare,
  Camera,
  CreditCard,
  GraduationCap
} from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';
import { SimulatedBrowserModal } from '../SimulatedBrowserModal';
import { FloatingScoreBurst } from '../../../layout/FloatingScoreBurst';

export function WebSimulationView({ 
  scenarios, 
  initialIndex = 0, 
  onIndexChange, 
  onRecordResult, 
  onCompleteMode 
}) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    return Math.max(0, initialIndex || 0);
  });
  const [browserOpen, setBrowserOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [answeredAction, setAnsweredAction] = useState(null); // 'open' | 'block' | 'safe'
  const [sinkholeAlert, setSinkholeAlert] = useState(null);
  const [burstTrigger, setBurstTrigger] = useState(0);

  // Sync if initialIndex changes externally
  React.useEffect(() => {
    if (initialIndex !== undefined && scenarios?.length) {
      setCurrentIndex(Math.min(initialIndex, scenarios.length - 1));
    }
  }, [initialIndex, scenarios?.length]);

  if (!scenarios || scenarios.length === 0) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Memuat skenario...</div>;
  }

  const current = scenarios[currentIndex];
  const isLast = currentIndex === scenarios.length - 1;

  const renderIcon = (type) => {
    switch (type) {
      case 'credit': return <CreditCard size={20} color="#dc2626" />;
      case 'camera': return <Camera size={20} color="#dc2626" />;
      case 'whatsapp': return <Smartphone size={20} color="#16a34a" />;
      case 'graduation': return <GraduationCap size={20} color="#16a34a" />;
      default: return <MessageSquare size={20} color="#dc2626" />;
    }
  };

  const handleAction = (action) => {
    if (answeredAction) return;

    if (action === 'open') {
      playSound('click');
      setBrowserOpen(true);
      return;
    }

    setAnsweredAction(action);
    const isCorrect = (action === current.correctAction);
    if (isCorrect) {
      playSound('success');
      setBurstTrigger(t => t + 1);
      if (action === 'block') {
        setSinkholeAlert({ domain: current.displayUrl, ip: '0.0.0.0' });
      }
    } else {
      playSound('error');
    }

    onRecordResult({ id: current.id, action, correct: isCorrect });
  };

  const handleReportFromBreach = () => {
    setBrowserOpen(false);
    setAnsweredAction('block');
    const isCorrect = ('block' === current.correctAction);
    if (isCorrect) {
      playSound('success');
      setBurstTrigger(t => t + 1);
      setSinkholeAlert({ domain: current.displayUrl, ip: '0.0.0.0' });
    }
    onRecordResult({ id: current.id, action: 'block', correct: isCorrect });
  };

  const handleNext = () => {
    playSound('beep');
    setBrowserOpen(false);
    setAnsweredAction(null);
    setInspectorOpen(false);
    setSinkholeAlert(null);

    if (!isLast) {
      setCurrentIndex(i => {
        const next = i + 1;
        onIndexChange?.(next);
        return next;
      });
    } else {
      onIndexChange?.(0);
      onCompleteMode();
    }
  };

  return (
    <div>
      <FloatingScoreBurst text="+25 PTS!" trigger={burstTrigger} />
      {/* SINKHOLE NOTIFICATION */}
      {sinkholeAlert && (
        <div className="sinkhole-banner">
          <div className="sinkhole-icon">🛡️</div>
          <div className="sinkhole-content">
            <div className="sinkhole-title">
              HAGEZI MULTI PRO++ DNS SINKHOLE INTERCEPTED
            </div>
            <div className="sinkhole-desc">
              Domain <code>{sinkholeAlert.domain}</code> dialihkan ke sinkhole IP <code>{sinkholeAlert.ip}</code> (NXDOMAIN). Koneksi bot penyerang diblokir total!
            </div>
          </div>
        </div>
      )}

      {/* QUESTION CARD */}
      <div className="glass-panel scenario-card">
        <div className="scenario-topbar">
          <div className="scenario-meta">
            <span className="badge badge-red">
              Kasus #{currentIndex + 1} dari {scenarios.length}
            </span>
            <span className="badge badge-purple">{current.platform}</span>
          </div>

          <button 
            className="btn btn-secondary btn-sm"
            onClick={() => {
              playSound('scan');
              setInspectorOpen(o => !o);
            }}
          >
            <Search size={14} />
            <span>{inspectorOpen ? 'Tutup Inspeksi URL' : 'Inspeksi Struktur URL'}</span>
          </button>
        </div>

        {/* Message bubble */}
        <div className="chat-mockup">
          <div className="sender-header">
            <div className="sender-avatar">{renderIcon(current.iconType)}</div>
            <div>
              <div className="sender-name">{current.sender}</div>
              <div className="sender-subject">{current.subject}</div>
            </div>
          </div>

          <div className="chat-bubble">{current.message}</div>

          {current.attachment && (
            <div className="chat-attachment">
              <span className="att-icon">📎</span>
              <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                <span className="att-name" style={{ fontWeight: 700, color: '#dc2626', wordBreak: 'break-all' }}>
                  {typeof current.attachment === 'object' && current.attachment !== null
                    ? current.attachment.name
                    : String(current.attachment)}
                </span>
                {typeof current.attachment === 'object' && current.attachment?.size && (
                  <span style={{ fontSize: '0.78rem', color: '#64748b' }}>
                    Ukuran: {current.attachment.size} • Format Berbahaya
                  </span>
                )}
              </div>
              <span className="badge badge-red" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                Ekstensi Berbahaya
              </span>
            </div>
          )}

          <div className="chat-link-box">
            <span>{current.displayUrl}</span>
          </div>
        </div>

        {/* URL Deep Inspector Panel */}
        {inspectorOpen && (
          <div className="inspector-panel">
            <div className="inspector-header">
              <div className="inspector-title">
                <Search size={16} /> BEDAH FORENSIK STRUKTUR TAUTAN
              </div>
            </div>
            <div className="inspector-grid">
              <div className="inspector-cell">
                <div className="inspector-label">Protokol:</div>
                <div className="inspector-value">{current.urlBreakdown.protocol}</div>
              </div>
              <div className="inspector-cell">
                <div className="inspector-label">Subdomain:</div>
                <div className="inspector-value">{current.urlBreakdown.subdomain}</div>
              </div>
              <div className="inspector-cell">
                <div className="inspector-label">TLD Domain:</div>
                <div className="inspector-value">{current.urlBreakdown.tld}</div>
              </div>
            </div>
            <div className={current.isPhishing ? 'inspector-danger-box' : 'inspector-safe-box'}>
              <strong>Analisis Forensik:</strong> {current.urlBreakdown.dangerDetail}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!answeredAction ? (
          <div className="scenario-actions" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button 
              className="btn btn-secondary"
              onClick={() => handleAction('open')}
              style={{ flex: '1 1 200px' }}
            >
              <ExternalLink size={16} />
              <span>Buka Tautan di Browser Virtual</span>
            </button>

            <button 
              className="btn btn-primary"
              style={{ background: '#dc2626', borderColor: '#b91c1c', flex: '1 1 180px' }}
              onClick={() => handleAction('block')}
            >
              <ShieldAlert size={16} />
              <span>Tandai Phishing & Blokir</span>
            </button>

            <button 
              className="btn btn-primary"
              style={{ background: '#16a34a', borderColor: '#15803d', flex: '1 1 180px' }}
              onClick={() => handleAction('safe')}
            >
              <ShieldCheck size={16} />
              <span>Tautan Aman & Sah</span>
            </button>
          </div>
        ) : (
          <div className="feedback-box">
            <div className="feedback-result">
              {answeredAction === current.correctAction ? (
                <div className="feedback-correct">
                  <ShieldCheck size={20} />
                  <span>KEPUTUSAN TEPAT! +25 Poin</span>
                </div>
              ) : (
                <div className="feedback-wrong">
                  <ShieldAlert size={20} />
                  <span>KEPUTUSAN KELIRU!</span>
                </div>
              )}
            </div>

            <p className="feedback-explanation">{current.explanation}</p>

            <button className="btn btn-primary" onClick={handleNext}>
              <span>{isLast ? 'Lanjut ke Komparasi Domain' : 'Skenario Berikutnya'}</span>
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* Simulated Browser Modal */}
      {browserOpen && (
        <SimulatedBrowserModal
          scenario={current}
          onClose={() => setBrowserOpen(false)}
          onReportPhishing={handleReportFromBreach}
        />
      )}
    </div>
  );
}
