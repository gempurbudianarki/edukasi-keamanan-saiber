import React, { useState } from 'react';
import { Camera, AlertTriangle } from 'lucide-react';
import { playSound } from '../../../../../utils/soundEffects';

export function InstagramMockup({ scenario, onBreach }) {
  const [username, setUsername] = useState('pelajar_kekinian');
  const [password, setPassword] = useState('rahasia12345');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanUser = username.trim();
    const cleanPass = password.trim();

    if (!cleanUser) {
      playSound('beep');
      setErrorMessage('Nama pengguna, email, atau nomor telepon wajib diisi!');
      return;
    }

    if (!cleanPass || cleanPass.length < 4) {
      playSound('beep');
      setErrorMessage('Kata sandi wajib diisi (minimal 4 karakter)!');
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
    <div style={{ padding: '24px', maxWidth: '380px', margin: '0 auto', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontFamily: 'sans-serif', fontWeight: 800, fontSize: '1.8rem', letterSpacing: '-0.5px' }}>
          Instagram
        </h2>
        <p style={{ fontSize: '0.82rem', color: '#dc2626', fontWeight: 600, marginTop: '4px' }}>
          Pusat Banding Pelanggaran Hak Cipta Komunitas
        </p>
      </div>

      <div style={{ background: '#fff', border: '1px solid #dbdbdb', borderRadius: '8px', padding: '24px' }}>
        {errorMessage && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', padding: '10px 12px', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '14px', textAlign: 'center' }}>
            <AlertTriangle size={15} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Nomor telepon, nama pengguna, atau email"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: `1px solid ${errorMessage && !username.trim() ? '#ef4444' : '#dbdbdb'}`, fontSize: '0.82rem', background: '#fafafa' }}
            />
          </div>

          <div style={{ marginBottom: '16px' }}>
            <input
              type="password"
              placeholder="Kata Sandi"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '4px', border: `1px solid ${errorMessage && (!password.trim() || password.trim().length < 4) ? '#ef4444' : '#dbdbdb'}`, fontSize: '0.82rem', background: '#fafafa' }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-full"
            style={{ background: '#0095f6', borderColor: '#0095f6', padding: '10px', fontSize: '0.88rem', fontWeight: 600 }}
          >
            {submitting ? 'Memverifikasi...' : 'Masuk & Batalkan Suspensi'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '0.74rem', color: '#8e8e8e' }}>
          Periksa URL di bilah alamat: situs resmi Instagram selalu berakhiran "instagram.com"!
        </div>
      </div>
    </div>
  );
}
