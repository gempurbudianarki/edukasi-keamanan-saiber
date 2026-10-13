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

  const displaySender = current.displaySender || current.clientView?.senderDisplay || 'Pengirim Terlihat';
  const subject = current.subject || current.clientView?.subject || '';
  const summary = current.summary || current.clientView?.bodyText || '';
  const rawHeaders = typeof current.rawHeaders === 'string'
    ? current.rawHeaders
    : `From: ${current.rawHeaders?.from || ''}\nReply-To: ${current.rawHeaders?.replyTo || ''}\nReceived-SPF: ${current.rawHeaders?.spfRecord || ''}\nDKIM: ${current.rawHeaders?.dkimRecord || ''}\nDMARC: ${current.rawHeaders?.dmarcRecord || ''}`;
  const authStatus = current.authStatus || {
    spf: current.rawHeaders?.spfRecord?.includes('PASS') ? 'PASS' : 'FAIL',
    dkim: current.rawHeaders?.dkimRecord?.includes('PASS') ? 'PASS' : 'FAIL',
    dmarc: current.rawHeaders?.dmarcRecord?.includes('PASS') ? 'PASS' : 'FAIL'
  };
  const correctAction = current.correctAction || (current.isSpoofed || current.isPhishing ? 'fake' : 'real');
  const forensicBreakdown = current.forensicBreakdown || current.explanation || '';

  const handleAction = (action) => {
    if (selectedAction) return;

    setSelectedAction(action);
    const isCorrect = (action === correctAction);

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
      <div style={{ background: '#f8fafc', border: '1px solid #fee2e2', borderRadius: '12px', padding: '18px', marginBottom: '20px', boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Mail size={18} color="#dc2626" />
          <div style={{ fontWeight: 700, fontSize: '0.98rem', color: '#0f172a' }}>{current.title}</div>
        </div>
        <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
          <strong>Pengirim Terlihat:</strong> {displaySender}
        </div>
        <div style={{ fontSize: '0.84rem', color: '#dc2626', fontWeight: 600, marginBottom: '10px' }}>
          <strong>Subjek:</strong> {subject}
        </div>
        <p style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.6, margin: 0 }}>
          {summary}
        </p>
      </div>

      {/* Raw Headers Drawer */}
      {showHeaders && (
        <div style={{ background: '#0f172a', border: '1px solid #334155', borderRadius: '8px', padding: '14px', marginBottom: '20px', fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#e2e8f0', maxHeight: '180px', overflowY: 'auto' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{rawHeaders}</pre>
        </div>
      )}

      {/* Status Auth Pills */}
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '20px' }}>
        <span className={`badge ${authStatus.spf === 'PASS' ? 'badge-green' : 'badge-red'}`}>
          SPF: {authStatus.spf}
        </span>
        <span className={`badge ${authStatus.dkim === 'PASS' ? 'badge-green' : 'badge-red'}`}>
          DKIM: {authStatus.dkim}
        </span>
        <span className={`badge ${authStatus.dmarc?.includes('PASS') ? 'badge-green' : 'badge-red'}`}>
          DMARC: {authStatus.dmarc}
        </span>
      </div>

      {/* Actions */}
      {!selectedAction ? (
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className="btn btn-secondary btn-full"
            style={{ borderColor: '#16a34a', color: '#15803d', background: '#f0fdf4' }}
            onClick={() => handleAction('real')}
          >
            <ShieldCheck size={16} />
            Email Asli & Terverifikasi
          </button>
          <button
            className="btn btn-primary btn-full"
            style={{ background: '#dc2626', borderColor: '#b91c1c', color: '#fff' }}
            onClick={() => handleAction('fake')}
          >
            <ShieldAlert size={16} />
            Email Palsu (Spoofed)
          </button>
        </div>
      ) : (
        <div className="feedback-box">
          <div className="feedback-result">
            {selectedAction === correctAction ? (
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

          <p className="feedback-explanation">{forensicBreakdown}</p>

          <button className="btn btn-primary" onClick={handleNext}>
            <span>{isLast ? 'Selesaikan Evaluasi Phishing' : 'Kasus Email Berikutnya'}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
