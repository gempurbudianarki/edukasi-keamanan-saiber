import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles, 
  X, 
  ArrowLeft, 
  FileCheck2,
  HelpCircle,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { playSound } from '../../../utils/soundEffects';

export function PreTestSubmitModal({
  isOpen,
  onClose,
  onConfirm,
  answers = {},
  totalQuestions = 15,
  onJumpToQuestion
}) {
  const answeredCount = Object.keys(answers).length;
  const isAllAnswered = answeredCount >= totalQuestions;
  const unansweredCount = totalQuestions - answeredCount;
  const progressPct = Math.round((answeredCount / totalQuestions) * 100);

  useEffect(() => {
    if (!isOpen) return;
    playSound('modal_open');

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'Enter') {
        playSound('click');
        onConfirm();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onConfirm]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="posttest-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          playSound('click');
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
    >
      <div className="posttest-modal-card anim-pop-in">
        {/* Top Decorative Hazard / Neon Stripe */}
        <div className={`modal-top-accent-stripe ${isAllAnswered ? 'stripe-success' : 'stripe-warning'}`} />

        {/* Close Button */}
        <button
          id="btn-close-pretest-modal"
          className="modal-close-icon-btn"
          onClick={() => {
            playSound('click');
            onClose();
          }}
          title="Tutup & Kembali ke Soal"
          aria-label="Tutup"
        >
          <X size={18} />
        </button>

        {/* Header Icon & Status Badge */}
        <div className="modal-hero-icon-wrap">
          <div className={`modal-hero-icon-box ${isAllAnswered ? 'box-success' : 'box-warning'}`}>
            {isAllAnswered ? (
              <FileCheck2 size={32} className="anim-float" />
            ) : (
              <AlertTriangle size={32} className="anim-shake" />
            )}
          </div>
          
          <div className={`modal-status-badge ${isAllAnswered ? 'badge-complete' : 'badge-incomplete'}`}>
            {isAllAnswered ? (
              <>
                <Sparkles size={14} />
                <span>100% LENGKAP • 15 BUTIR PRE-TEST TERJAWAB</span>
              </>
            ) : (
              <>
                <AlertTriangle size={14} />
                <span>PERHATIAN: {unansweredCount} BUTIR BELUM DIJAWAB</span>
              </>
            )}
          </div>
        </div>

        {/* Modal Titles */}
        <h2 className="modal-main-title">
          {isAllAnswered ? 'Kumpulkan Jawaban Pre-Test Diagnostik?' : 'Masih Ada Soal Pre-Test yang Kosong!'}
        </h2>
        
        <p className="modal-main-desc">
          {isAllAnswered ? (
            <>
              Seluruh <strong>15 butir soal Pre-Test</strong> evaluasi dasar literasi siber telah kamu jawab. 
              Skor baseline awalmu akan langsung dihitung sebelum kamu memasuki modul simulasi interaktif.
            </>
          ) : (
            <>
              Kamu baru menjawab <strong>{answeredCount}</strong> dari total <strong>{totalQuestions} butir soal Pre-Test</strong>. 
              Butir soal yang dikosongkan akan dihitung <strong>0 poin</strong>.
            </>
          )}
        </p>

        {/* Live Progress Bar Visualizer */}
        <div className="modal-progress-strip-wrap">
          <div className="modal-progress-label-row">
            <span>Kemajuan Lembar Pre-Test:</span>
            <strong>{answeredCount} / {totalQuestions} Soal ({progressPct}%)</strong>
          </div>
          <div className="modal-progress-bar-track">
            <div 
              className={`modal-progress-bar-fill ${isAllAnswered ? 'fill-success' : 'fill-warning'}`}
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Interactive 15-Question Verification Matrix */}
        <div className="modal-matrix-section">
          <div className="modal-matrix-header">
            <span>Audit Status 15 Butir Soal Pre-Test:</span>
            <span className="modal-matrix-hint">
              {isAllAnswered ? 'Semua terisi lengkap' : '*Klik nomor soal yang merah untuk langsung mengisinya'}
            </span>
          </div>

          <div className="modal-matrix-grid">
            {Array.from({ length: totalQuestions }, (_, i) => {
              const qNum = i + 1;
              const hasAnswer = Boolean(answers[qNum]);
              const chosen = answers[qNum];

              return (
                <button
                  key={qNum}
                  type="button"
                  className={`modal-matrix-chip ${hasAnswer ? 'chip-answered' : 'chip-missing'}`}
                  onClick={() => {
                    playSound('click');
                    onJumpToQuestion(i);
                    onClose();
                  }}
                  title={hasAnswer ? `Soal #${qNum}: Terjawab (${chosen})` : `Soal #${qNum}: Belum Dijawab! Klik untuk mengisi.`}
                >
                  <span className="chip-qnum">{qNum}</span>
                  {hasAnswer ? (
                    <span className="chip-badge-ans">{chosen}</span>
                  ) : (
                    <span className="chip-badge-warn">!</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Alert Notice */}
        {!isAllAnswered && (
          <div className="modal-warning-callout">
            <AlertTriangle size={18} color="#dc2626" className="warning-callout-icon" />
            <div className="warning-callout-text">
              <strong>Saran Penguji PKM:</strong> Jangan ragu memilih jawaban berdasarkan pengetahuan awalmu saat ini. Pre-test bertujuan memetakan pemahaman sebelum praktik.
            </div>
          </div>
        )}

        {/* Modal Action Buttons */}
        <div className="modal-button-actions">
          <button
            id="btn-pretest-back-check"
            type="button"
            className="btn btn-secondary modal-action-btn"
            onClick={() => {
              playSound('click');
              onClose();
            }}
          >
            <ArrowLeft size={16} />
            <span>{isAllAnswered ? 'Periksa Kembali' : 'Lengkapi Dulu'}</span>
          </button>

          <button
            id="btn-pretest-confirm-submit"
            type="button"
            className={`btn ${isAllAnswered ? 'btn-success' : 'btn-primary'} modal-action-btn`}
            onClick={() => {
              playSound('click');
              onConfirm();
            }}
          >
            <CheckCircle2 size={18} />
            <span>{isAllAnswered ? 'Kumpulkan Lembar Pre-Test' : 'Tetap Kumpulkan Sekarang'}</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
