import React, { useState } from 'react';
import { CreditCard, AlertTriangle, ShieldAlert } from 'lucide-react';
import { playSound } from '../../../../../utils/soundEffects';

export function DanaLoginMockup({ scenario, onBreach }) {
  const [phone, setPhone] = useState('0812-9876-5432');
  const [pin, setPin] = useState('123456');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    playSound('click');
    setTimeout(() => {
      setSubmitting(false);
      onBreach();
    }, 1000);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '420px', margin: '0 auto', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#108ee9', fontWeight: 800, fontSize: '1.4rem' }}>
          <CreditCard size={28} /> DANA INDONESIA
        </div>
        <p style={{ fontSize: '0.86rem', color: '#64748b', marginTop: '4px' }}>
          Klaim Saldo DANA Kaget Rp 250.000 Spesial Hari Ini
        </p>
      </div>

      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
              Nomor Ponsel Akun DANA
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem' }}
              required
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
              Masukkan 6 Digit PIN DANA
            </label>
            <input
              type="password"
              maxLength={6}
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', letterSpacing: '4px' }}
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-full"
            style={{ background: '#108ee9', borderColor: '#0c70b8', color: '#fff', padding: '12px', fontWeight: 700 }}
          >
            {submitting ? 'Memproses Klaim...' : 'Lanjutkan Klaim Saldo'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#dc2626', marginTop: '12px' }}>
          <AlertTriangle size={14} />
          <span>Waspada: Situs ini meminta PIN rahasia transaksi Anda!</span>
        </div>
      </div>
    </div>
  );
}
