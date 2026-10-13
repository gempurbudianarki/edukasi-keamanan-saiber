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

export function WebSimulationView({ scenarios, onRecordResult, onCompleteMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [browserOpen, setBrowserOpen] = useState(false);
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [answeredAction, setAnsweredAction] = useState(null); // 'open' | 'block' | 'safe'
  const [sinkholeAlert, setSinkholeAlert] = useState(null);

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
      setCurrentIndex(i => i + 1);
    } else {
      onCompleteMode();
    }
  };

  return (
    <div>
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
        <div className="message-mockup">
          <div className="msg-header">
            <div className="msg-avatar-box">{renderIcon(current.iconType)}</div>
            <div>
              <div className="msg-sender">{current.sender}</div>
              <div className="msg-subject">{current.subject}</div>
            </div>
          </div>

          <div className="msg-body">{current.message}</div>

          {current.attachment && (
            <div className="msg-attachment">
              <span className="att-icon">📎</span>
              <span className="att-name">{current.attachment}</span>
              <span className="badge badge-red" style={{ marginLeft: 'auto' }}>Ekstensi Berbahaya</span>
            </div>
          )}

          <div className="msg-link-box">
            <span className="msg-link-url">{current.displayUrl}</span>
          </div>
        </div>

        {/* URL Deep Inspector Box */}
        {inspectorOpen && (
          <div className="inspector-box">
            <div className="inspector-title">
              <Search size={16} /> BEDAH FORENSIK STRUKTUR TAUTAN
            </div>
            <div className="inspector-grid">
              <div className="ins-item">
                <span className="ins-lbl">Protokol:</span>
                <span className="ins-val">{current.urlBreakdown.protocol}</span>
              </div>
              <div className="ins-item">
                <span className="ins-lbl">Subdomain:</span>
                <span className="ins-val">{current.urlBreakdown.subdomain}</span>
              </div>
              <div className="ins-item">
                <span className="ins-lbl">TLD Domain:</span>
                <span className="ins-val">{current.urlBreakdown.tld}</span>
              </div>
            </div>
            <div className="ins-danger-detail">
              <strong>Analisis Forensik:</strong> {current.urlBreakdown.dangerDetail}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        {!answeredAction ? (
          <div className="scenario-actions">
            <button 
              className="btn btn-secondary"
              onClick={() => handleAction('open')}
            >
              <ExternalLink size={16} />
              <span>Buka Tautan di Browser Virtual</span>
            </button>

            {current.isPhishing ? (
              <button 
                className="btn btn-primary"
                onClick={() => handleAction('block')}
              >
                <ShieldAlert size={16} />
                <span>Tandai Phishing & Laporkan</span>
              </button>
            ) : (
              <button 
                className="btn btn-primary"
                style={{ background: '#16a34a', borderColor: '#15803d' }}
                onClick={() => handleAction('safe')}
              >
                <ShieldCheck size={16} />
                <span>Tautan Aman & Resmi</span>
              </button>
            )}
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
