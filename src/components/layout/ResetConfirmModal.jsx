import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export function ResetConfirmModal({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="reset-modal-backdrop" 
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="reset-modal-card" role="dialog" aria-modal="true">
        <button
          className="reset-modal-close-btn"
          onClick={() => {
            playSound('click');
            onClose();
          }}
          title="Tutup Modal"
        >
          <X size={18} />
        </button>

        <div className="reset-modal-icon-badge">
          <AlertTriangle size={30} />
        </div>

        <h3 className="reset-modal-title">
          Reset Seluruh Simulasi?
        </h3>
        <p className="reset-modal-desc">
          Seluruh skor 4 misi, status penyelesaian, dan data nama siswa akan dihapus dari memori browser dan dikembalikan ke awal.
        </p>

        <div className="reset-modal-actions">
          <button
            className="btn btn-secondary"
            onClick={() => {
              playSound('click');
              onClose();
            }}
          >
            Batalkan
          </button>
          <button
            className="btn btn-primary"
            style={{ background: '#dc2626', borderColor: '#b91c1c' }}
            onClick={() => {
              playSound('click');
              onConfirm();
              onClose();
            }}
          >
            <RotateCcw size={16} />
            Ya, Reset Semuanya
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
