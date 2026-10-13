import React, { useState } from 'react';
import { Mail, ShieldCheck, ShieldAlert, ChevronRight, Code, AlertTriangle, CheckCircle2, User, ExternalLink } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';
import { FloatingScoreBurst } from '../../../layout/FloatingScoreBurst';

export function EmailSpoofingView({ drills, onRecordResult, onCompleteMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showHeaders, setShowHeaders] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null); // 'fake' | 'real'
  const [burstTrigger, setBurstTrigger] = useState(0);

  if (!drills || drills.length === 0) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Memuat latihan email...</div>;
  }

  const current = drills[currentIndex];
  const isLast = currentIndex === drills.length - 1;

  const displaySender = current.clientView?.senderDisplay || current.displaySender || 'Pengirim Terlihat';
  const fromEmail = current.clientView?.fromEmail || current.rawHeaders?.from || 'sender@domain.com';
  const toEmail = current.clientView?.toEmail || 'siswa.pkm@sekolah.sch.id';
  const dateStr = current.clientView?.date || '14 Oktober 2026, 09:15 WIB';
  const subject = current.clientView?.subject || current.subject || current.title;
  const bodyText = current.clientView?.bodyText || current.summary || '';
  const ctaText = current.clientView?.ctaText || null;
  const redFlags = current.redFlags || [];

  const rawHeaders = typeof current.rawHeaders === 'string'
    ? current.rawHeaders
    : `From: ${current.rawHeaders?.from || displaySender}\nReply-To: ${current.rawHeaders?.replyTo || fromEmail}\nReturn-Path: ${current.rawHeaders?.returnPath || 'unknown'}\nSender-IP: ${current.rawHeaders?.senderIp || 'unknown'}\nReceived-SPF: ${current.rawHeaders?.spfRecord || 'FAIL'}\nDKIM-Signature: ${current.rawHeaders?.dkimRecord || 'NONE'}\nAuthentication-Results: ${current.rawHeaders?.dmarcRecord || 'FAIL'}`;

  const authStatus = current.authStatus || {
    spf: current.rawHeaders?.spfRecord?.includes('PASS') ? 'PASS' : 'FAIL',
    dkim: current.rawHeaders?.dkimRecord?.includes('PASS') ? 'PASS' : 'FAIL',
    dmarc: current.rawHeaders?.dmarcRecord?.includes('PASS') ? 'PASS' : 'FAIL'
  };

  const correctAction = current.correctAction || (current.isSpoofed || current.isPhishing ? 'fake' : 'real');
  const forensicBreakdown = current.explanation || current.forensicBreakdown || '';

  const handleAction = (action) => {
    if (selectedAction) return;

    setSelectedAction(action);
    const isCorrect = (action === correctAction);

    if (isCorrect) {
      playSound('success');
      setBurstTrigger(t => t + 1);
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
      <FloatingScoreBurst text="+25 PTS!" trigger={burstTrigger} />

      <div className="scenario-topbar">
        <span className="badge badge-purple">
          Forensik Email Spoofing #{currentIndex + 1} dari {drills.length}
        </span>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => {
            playSound('click');
            setShowHeaders(s => !s);
          }}
        >
          <Code size={14} />
          <span>{showHeaders ? 'Tutup Inspeksi Header' : 'Inspeksi Header MIME (SPF/DKIM)'}</span>
        </button>
      </div>

      {/* Realistic Email Client Card */}
      <div style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '14px',
        padding: '20px',
        marginBottom: '20px',
        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.04)'
      }}>
        {/* Email Metadata Header */}
        <div style={{ borderBottom: '1px solid #f1f5f9', paddingBottom: '14px', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#f1f5f9',
                border: '1px solid #cbd5e1',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#475569'
              }}>
                <User size={22} />
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
                  {displaySender}
                </div>
                <div style={{ fontSize: '0.8rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
                  &lt;{fromEmail}&gt;
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.76rem', color: '#94a3b8', textAlign: 'right' }}>
              {dateStr}
            </div>
          </div>

          <div style={{ marginTop: '12px', fontSize: '0.82rem', color: '#475569' }}>
            <strong>Kepada:</strong> <span style={{ fontFamily: 'var(--font-mono)' }}>{toEmail}</span>
          </div>
          <div style={{ marginTop: '6px', fontSize: '0.98rem', fontWeight: 800, color: '#dc2626' }}>
            {subject}
          </div>
        </div>

        {/* Email Body Content (Rendered as safe React paragraphs) */}
        <div style={{ fontSize: '0.9rem', color: '#334155', lineHeight: 1.65, whiteSpace: 'pre-line', marginBottom: '18px' }}>
          {bodyText}
        </div>

        {/* Fake CTA button preview if available */}
        {ctaText && (
          <div style={{ textAlign: 'left', marginBottom: '8px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '9px 18px',
              background: '#0284c7',
              color: '#ffffff',
              borderRadius: '7px',
              fontWeight: 700,
              fontSize: '0.84rem'
            }}>
              <span>{ctaText}</span>
              <ExternalLink size={14} />
            </span>
          </div>
        )}
      </div>

      {/* Raw Headers & Technical Inspection Drawer */}
      {showHeaders && (
        <div style={{
          background: '#0f172a',
          border: '1.5px solid #334155',
          borderRadius: '10px',
          padding: '16px',
          marginBottom: '20px',
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#38bdf8', fontSize: '0.82rem', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
              <Code size={15} />
              <span>RAW MIME HEADERS FORENSIC DATA</span>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span className={`badge ${authStatus.spf?.includes('PASS') ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.72rem' }}>
                SPF: {authStatus.spf}
              </span>
              <span className={`badge ${authStatus.dkim?.includes('PASS') ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.72rem' }}>
                DKIM: {authStatus.dkim}
              </span>
              <span className={`badge ${authStatus.dmarc?.includes('PASS') ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.72rem' }}>
                DMARC: {authStatus.dmarc}
              </span>
            </div>
          </div>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: '0.76rem', color: '#e2e8f0', lineHeight: 1.5, maxHeight: '160px', overflowY: 'auto' }}>
            {rawHeaders}
          </pre>
        </div>
      )}

      {/* Decisions Action Buttons */}
      {!selectedAction ? (
        <div>
          <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', marginBottom: '10px' }}>
            Berdasarkan nama pengirim, subjek, isi email, dan hasil inspeksi header di atas, tentukan keputusanmu:
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ flex: '1 1 200px', borderColor: '#16a34a', color: '#15803d', background: '#f0fdf4', padding: '13px' }}
              onClick={() => handleAction('real')}
            >
              <ShieldCheck size={18} />
              <span>Email Asli & Terverifikasi</span>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              style={{ flex: '1 1 200px', background: '#dc2626', borderColor: '#b91c1c', color: '#fff', padding: '13px' }}
              onClick={() => handleAction('fake')}
            >
              <ShieldAlert size={18} />
              <span>Email Palsu / Phishing</span>
            </button>
          </div>
        </div>
      ) : (
        /* Evaluation Feedback Drawer */
        <div className="feedback-box" style={{ marginTop: '4px' }}>
          <div className="feedback-result">
            {selectedAction === correctAction ? (
              <div className="feedback-correct">
                <CheckCircle2 size={22} color="#16a34a" />
                <span>KEPUTUSAN TEPAT! Analisis forensik email Anda akurat (+25 PTS).</span>
              </div>
            ) : (
              <div className="feedback-wrong">
                <ShieldAlert size={22} color="#dc2626" />
                <span>KEPUTUSAN KELIRU! Waspada trik manipulasi email.</span>
              </div>
            )}
          </div>

          <p className="feedback-explanation" style={{ marginBottom: '14px' }}>
            {forensicBreakdown}
          </p>

          {/* Red flags list */}
          {redFlags.length > 0 && (
            <div style={{ background: '#ffffff', border: '1px solid #fee2e2', borderRadius: '10px', padding: '14px', marginBottom: '16px' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#dc2626', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={15} />
                <span>Titik Kritis Indikator Ancaman (Red Flags):</span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '0.84rem', color: '#475569', lineHeight: 1.5 }}>
                {redFlags.map((flag, idx) => (
                  <li key={idx} style={{ marginBottom: '4px' }}>{flag}</li>
                ))}
              </ul>
            </div>
          )}

          <button type="button" className="btn btn-primary" onClick={handleNext}>
            <span>{isLast ? 'Selesaikan Evaluasi Phishing' : 'Kasus Email Berikutnya'}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
