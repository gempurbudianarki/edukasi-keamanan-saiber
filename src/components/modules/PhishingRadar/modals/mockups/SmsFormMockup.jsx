import React, { useState } from 'react';
import { GraduationCap, AlertTriangle } from 'lucide-react';
import { playSound } from '../../../../../utils/soundEffects';

export function SmsFormMockup({ scenario, onBreach }) {
  const [name, setName] = useState('Ahmad Pelajar');
  const [phone, setPhone] = useState('0813-2233-4455');
  const [operator, setOperator] = useState('Telkomsel');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    const cleanPhone = phone.trim();

    if (!cleanName || cleanName.length < 2) {
      playSound('beep');
      setErrorMessage('Nama lengkap siswa wajib diisi (minimal 2 huruf)!');
      return;
    }

    if (!cleanPhone || cleanPhone.length < 8) {
      playSound('beep');
      setErrorMessage('Nomor WhatsApp / HP wajib diisi dengan benar (minimal 8 angka)!');
      return;
    }

    setErrorMessage('');
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
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0284c7', fontWeight: 800, fontSize: '1.25rem' }}>
          <GraduationCap size={28} /> KEMENDIKBUD RI (PALSU)
        </div>
        <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '4px' }}>
          Formulir Klaim Subsidi Kuota Belajar 100 GB Siswa 2026
        </p>
      </div>

      <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px' }}>
        {errorMessage && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', padding: '10px 12px', borderRadius: '8px', fontSize: '0.82rem', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={16} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
              Nama Lengkap Siswa / Pelajar
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1.5px solid ${errorMessage && (!name.trim() || name.trim().length < 2) ? '#ef4444' : '#cbd5e1'}`, fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ marginBottom: '14px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
              Nomor WhatsApp / HP Aktif
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: `1.5px solid ${errorMessage && (!phone.trim() || phone.trim().length < 8) ? '#ef4444' : '#cbd5e1'}`, fontSize: '0.9rem' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
              Operator Seluler
            </label>
            <select
              value={operator}
              onChange={(e) => setOperator(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.9rem', background: '#fff' }}
            >
              <option value="Telkomsel">Telkomsel</option>
              <option value="Indosat">Indosat Ooredoo</option>
              <option value="XL">XL Axiata</option>
              <option value="Tri">Tri (3)</option>
              <option value="Smartfren">Smartfren</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-full"
            style={{ background: '#0284c7', borderColor: '#0369a1', padding: '12px', fontWeight: 700 }}
          >
            {submitting ? 'Mengirim Data...' : 'Klaim Kuota 100 GB Sekarang'}
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: '#dc2626', marginTop: '12px' }}>
          <AlertTriangle size={14} />
          <span>Waspada: Domain resmi pemerintah wajib berakhiran ".go.id"!</span>
        </div>
      </div>
    </div>
  );
}
