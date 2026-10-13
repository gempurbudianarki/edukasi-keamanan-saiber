import React, { useState } from 'react';
import { Mail, ShieldCheck, ShieldAlert, ChevronRight, Code } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';

export function EmailSpoofingView({ drills, onRecordResult, onCompleteMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHeaders, setShowHeaders] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null); // 'fake' | 'real'

  if (!drills || drills.length === 0) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Memuat latihan email...</div>;
  }

  const current = drills[currentIndex];
  const isLast = currentIndex === drills.length - 1;

  const handleAction = (action) => {
    if (selectedAction) return;

    setSelectedAction(action);
    const isCorrect = (action === current.correctAction);

    if (isCorrect) {
      playSound('success');
    } else {
      playSound('error');
    }

    onRecordResult({ id: current.id, action, correct: isCorrect });
  };

  const handleNext = () => {
    playSound('beep');
    setSelectedAction(null);
    setShowHeaders(false);

    if (!isLast) {
      setCurrentIndex(i => i + 1);
    } else {
      onCompleteMode();
    }
  };

  return (
    <div className="glass-panel scenario-card">
      <div className="scenario-topbar">
        <span className="badge badge-purple">
          Forensik Email Spoofing #{currentIndex + 1} dari {drills.length}
        </span>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            playSound('click');
            setShowHeaders(s => !s);
          }}
        >
          <Code size={14} />
          <span>{showHeaders ? 'Sembunyikan Raw Header' : 'Inspeksi Header MIME (SPF/DKIM)'}</span>
        </button>
      </div>

      {/* Email Inbox Preview */}
      <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '18px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Mail size={18} color="var(--accent-cyan)" />
          <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{current.title}</div>
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
          <strong>Pengirim Terlihat:</strong> {current.displaySender}
        </div>
        <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
          <strong>Subjek:</strong> {current.subject}
        </div>
        <p style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
          {current.summary}
        </p>
      </div>

      {/* Raw Headers Drawer */}
      {showHeaders && (
        <div style={{ background: '#020617', border: '1px solid #1e293b', borderRadius: '8px', padding: '14px', marginBottom: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.74rem', color: '#94a3b8', maxHeight: '180px', overflowY: 'auto' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{current.rawHeaders}</pre>
        </div>
      )}

      {/* Status Auth Pills */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <span className={`badge ${current.authStatus.spf === 'PASS' ? 'badge-green' : 'badge-red'}`}>
          SPF: {current.authStatus.spf}
        </span>
        <span className={`badge ${current.authStatus.dkim === 'PASS' ? 'badge-green' : 'badge-red'}`}>
          DKIM: {current.authStatus.dkim}
        </span>
        <span className={`badge ${current.authStatus.dmarc.includes('PASS') ? 'badge-green' : 'badge-red'}`}>
          DMARC: {current.authStatus.dmarc}
        </span>
      </div>

      {/* Actions */}
      {!selectedAction ? (
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn btn-secondary btn-full"
            style={{ borderColor: '#16a34a', color: '#86efac' }}
            onClick={() => handleAction('real')}
          >
            <ShieldCheck size={16} />
            Email Asli & Terverifikasi
          </button>
          <button
            className="btn btn-primary btn-full"
            style={{ background: '#dc2626', borderColor: '#b91c1c' }}
            onClick={() => handleAction('fake')}
          >
            <ShieldAlert size={16} />
            Email Palsu (Spoofed)
          </button>
        </div>
      ) : (
        <div className="feedback-box">
          <div className="feedback-result">
            {selectedAction === current.correctAction ? (
              <div className="feedback-correct">
                <ShieldCheck size={20} />
                <span>TEPAT! Analisis forensik email kamu akurat.</span>
              </div>
            ) : (
              <div className="feedback-wrong">
                <ShieldAlert size={20} />
                <span>KELIRU! Periksa kembali nilai SPF dan tanda tangan DKIM.</span>
              </div>
            )}
          </div>

          <p className="feedback-explanation">{current.forensicBreakdown}</p>

          <button className="btn btn-primary" onClick={handleNext}>
            <span>{isLast ? 'Selesaikan Evaluasi Phishing' : 'Kasus Email Berikutnya'}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
