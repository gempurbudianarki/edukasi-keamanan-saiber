import React, { useState } from 'react';
import { Gamepad2, Sparkles, AlertTriangle, ShieldAlert, Gift } from 'lucide-react';
import { playSound } from '../../../../../utils/soundEffects';

export function GameDiamondMockup({ scenario, onBreach }) {
  const [userId, setUserId] = useState('98765432');
  const [zoneId, setZoneId] = useState('2104');
  const [loginMethod, setLoginMethod] = useState('Moonton');
  const [password, setPassword] = useState('mabarmlbb2026');
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDegree, setSpinDegree] = useState(0);
  const [spinWon, setSpinWon] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    playSound('scan');
    const newDegree = spinDegree + 1440 + Math.floor(Math.random() * 360);
    setSpinDegree(newDegree);
    setTimeout(() => {
      setIsSpinning(false);
      setSpinWon(true);
      playSound('success');
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanUser = userId.trim();
    const cleanPass = password.trim();

    if (!cleanUser || cleanUser.length < 4) {
      playSound('beep');
      setErrorMessage('User ID Game wajib diisi (minimal 4 digit)!');
      return;
    }

    if (!cleanPass || cleanPass.length < 4) {
      playSound('beep');
      setErrorMessage('Kata sandi akun wajib diisi untuk verifikasi klaim hadiah!');
      return;
    }

    setErrorMessage('');
    setSubmitting(true);
    playSound('click');
    setTimeout(() => {
      setSubmitting(false);
      onBreach();
    }, 900);
  };

  return (
    <div style={{ padding: '20px 16px', maxWidth: '440px', margin: '0 auto', color: '#1e293b' }}>
      {/* Educational Safety Banner */}
      <div style={{
        background: '#fffbeb',
        border: '1.5px solid #fde68a',
        color: '#92400e',
        padding: '10px 14px',
        borderRadius: '10px',
        fontSize: '0.78rem',
        lineHeight: 1.45,
        marginBottom: '18px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
      }}>
        <AlertTriangle size={20} color="#d97706" style={{ flexShrink: 0 }} />
        <span>
          <strong>SIMULASI EDUKASI PKM UBBG:</strong> Formulir ini adalah tiruan rekayasa phishing. Data <strong>TIDAK DISIMPAN</strong> dan tidak dikirim ke internet. Dilarang mengetik password asli Anda!
        </span>
      </div>

      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '18px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#7c3aed', fontWeight: 800, fontSize: '1.25rem' }}>
          <Gamepad2 size={26} /> EVENT DIAMOND MLBB 2026
        </div>
        <p style={{ fontSize: '0.84rem', color: '#64748b', marginTop: '4px' }}>
          Klaim Spesial Ulang Tahun: 10.000 Diamond & Skin Collector Gratis
        </p>
      </div>

      {/* Mini Lucky Wheel Mockup */}
      <div style={{ background: '#0f172a', borderRadius: '14px', padding: '18px', textAlign: 'center', marginBottom: '18px', color: '#fff', border: '1px solid #334155' }}>
        <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', letterSpacing: '0.05em' }}>
          Putaran Roda Keberuntungan
        </div>

        <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 12px' }}>
          <div
            style={{
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '4px solid #f59e0b',
              background: 'conic-gradient(#ef4444 0% 25%, #3b82f6 25% 50%, #10b981 50% 75%, #f59e0b 75% 100%)',
              transform: `rotate(${spinDegree}deg)`,
              transition: isSpinning ? 'transform 2s cubic-bezier(0.15, 0.9, 0.3, 1)' : 'none',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.3)'
            }}
          />
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#0f172a'
          }}>
            <Gift size={16} color="#7c3aed" />
          </div>
        </div>

        <button
          type="button"
          onClick={handleSpin}
          disabled={isSpinning}
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #d97706)',
            border: 'none',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.8rem',
            padding: '6px 16px',
            borderRadius: '9999px',
            cursor: isSpinning ? 'not-allowed' : 'pointer',
            boxShadow: '0 4px 12px rgba(245, 158, 11, 0.3)'
          }}
        >
          {isSpinning ? 'Memutar Hadiah...' : 'Putar Roda Diamond'}
        </button>

        {spinWon && (
          <div style={{ marginTop: '10px', fontSize: '0.84rem', color: '#4ade80', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={16} />
            <span>Selamat! Anda Mendapatkan 10.000 Diamond!</span>
          </div>
        )}
      </div>

      {/* Phishing Input Form */}
      <div style={{ background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '12px', padding: '18px' }}>
        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px' }}>
          Isi Kredensial untuk Mengirim Hadiah ke Akun:
        </div>

        {errorMessage && (
          <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', color: '#991b1b', padding: '8px 12px', borderRadius: '6px', fontSize: '0.8rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <AlertTriangle size={15} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px', gap: '10px', marginBottom: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                User ID Game
              </label>
              <input
                type="text"
                value={userId}
                onChange={(e) => {
                  setUserId(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="12345678"
                style={{ width: '100%', padding: '9px 11px', borderRadius: '7px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Zone ID
              </label>
              <input
                type="text"
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                placeholder="2104"
                style={{ width: '100%', padding: '9px 11px', borderRadius: '7px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
              Metode Login Terhubung
            </label>
            <select
              value={loginMethod}
              onChange={(e) => setLoginMethod(e.target.value)}
              style={{ width: '100%', padding: '9px 11px', borderRadius: '7px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem', background: '#fff' }}
            >
              <option value="Moonton">Akun Moonton (Email & Sandi)</option>
              <option value="Facebook">Login Facebook</option>
              <option value="GooglePlay">Google Play Games</option>
            </select>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
              Kata Sandi Akun Game / Email
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="••••••••"
              style={{ width: '100%', padding: '9px 11px', borderRadius: '7px', border: '1.5px solid #cbd5e1', fontSize: '0.86rem' }}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="btn btn-primary btn-full"
            style={{ background: '#7c3aed', borderColor: '#6d28d9', padding: '11px', fontWeight: 700 }}
          >
            <Sparkles size={16} />
            <span>{submitting ? 'Mengirim Diamond...' : 'Klaim 10.000 Diamond ke Game'}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
