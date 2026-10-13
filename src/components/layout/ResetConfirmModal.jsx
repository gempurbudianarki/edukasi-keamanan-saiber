import React from 'react';
import { AlertTriangle, RotateCcw, X } from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export function ResetConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="sim-overlay" style={{ zIndex: 9999 }}>
      <div 
        className="glass-panel" 
        style={{
          maxWidth: '440px',
          width: '90%',
          padding: '28px',
          background: '#ffffff',
          border: '1.5px solid #fee2e2',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 25px rgba(220, 38, 38, 0.08)',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}
          title="Tutup"
        >
          <X size={18} />
        </button>

        <div 
          style={{
            width: '54px',
            height: '54px',
            borderRadius: '50%',
            background: '#fef2f2',
            border: '1.5px solid #fecaca',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}
        >
          <AlertTriangle size={28} />
        </div>

        <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: '#0f172a', fontWeight: 800 }}>
          Reset Seluruh Simulasi?
        </h3>
        <p style={{ color: '#475569', fontSize: '0.88rem', marginBottom: '24px', lineHeight: 1.5 }}>
          Seluruh skor 4 misi, status penyelesaian, dan data nama siswa akan dihapus dari memori browser dan dikembalikan ke awal.
        </p>

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
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
    </div>
  );
}
