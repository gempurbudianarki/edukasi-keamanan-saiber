import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, RotateCcw, Sparkles, QrCode, Key, Copy, Check, ArrowRight, ShieldAlert, HelpCircle } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';
import { FloatingScoreBurst } from '../../../layout/FloatingScoreBurst';

export function ActivationPracticeView({ onCompletePractice }) {
  const [practiceStep, setPracticeStep] = useState(1); // 1: Pilih Metode, 2: Setup & Input OTP, 3: Backup Codes & Selesai
  const [chosenMethod, setChosenMethod] = useState('authenticator'); // 'authenticator' | 'sms'
  const [currentOtp, setCurrentOtp] = useState('583921');
  const [remainingSeconds, setRemainingSeconds] = useState(30);
  const [pinDigits, setPinDigits] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);

  const pinRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  const cycleStartRef = useRef(Date.now());
  const lastCycleRef = useRef(0);

  // Anti-drift 30s TOTP countdown
  useEffect(() => {
    if (practiceStep !== 2) return;
    cycleStartRef.current = Date.now();

    const interval = setInterval(() => {
      const elapsed = (Date.now() - cycleStartRef.current) / 1000;
      const currentCycle = Math.floor(elapsed / 30);

      if (currentCycle !== lastCycleRef.current) {
        lastCycleRef.current = currentCycle;
        const nextCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCurrentOtp(nextCode);
      }

      const cycleRemaining = Math.max(1, Math.ceil(30 - (elapsed % 30)));
      setRemainingSeconds(cycleRemaining);
    }, 200);

    return () => clearInterval(interval);
  }, [practiceStep]);

  // Handle individual PIN box typing
  const handleDigitChange = (index, value) => {
    const cleaned = value.replace(/\D/g, '');
    const newDigits = [...pinDigits];

    if (cleaned.length > 1) {
      // User pasted full OTP
      const pasted = cleaned.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newDigits[i] = pasted[i] || '';
      }
      setPinDigits(newDigits);
      if (pasted.length >= 6) {
        pinRefs[5].current?.focus();
      }
      return;
    }

    newDigits[index] = cleaned;
    setPinDigits(newDigits);
    setErrorMsg('');

    if (cleaned && index < 5) {
      pinRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      pinRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const entered = pinDigits.join('');
    if (entered === currentOtp) {
      playSound('complete');
      setErrorMsg('');
      setBurstTrigger(t => t + 1);
      setPracticeStep(3);
      onCompletePractice();
    } else {
      playSound('error');
      setErrorMsg(`Kode verifikasi salah! Pastikan memasukkan 6 digit: ${currentOtp}`);
    }
  };

  // Helper copy seed key
  const handleCopyKey = () => {
    playSound('click');
    navigator.clipboard.writeText('CYBER-UBBG-2026-KEY');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  // Circular gauge calculations
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (remainingSeconds / 30) * circumference;
  const gaugeColor = remainingSeconds <= 5 ? '#f43f5e' : remainingSeconds <= 12 ? '#f59e0b' : '#00f0ff';

  const backupCodes = ['8492-1049', '3950-2910', '7104-5829', '1940-5820'];

  return (
    <div className="glass-panel scenario-card">
      <FloatingScoreBurst text="+100 PTS BENTENG 2FA!" trigger={burstTrigger} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '10px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: '0 0 4px 0' }}>
            Praktik Mandiri: Aktivasi Verifikasi Dua Langkah (2FA) 1:1
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', margin: 0 }}>
            Pelajari alur konfigurasi 2FA standar industri seperti pada Instagram, WhatsApp, atau Akun Google.
          </p>
        </div>

        {/* Step indicator pills */}
        <div style={{ display: 'flex', gap: '8px' }}>
          <span className={`badge ${practiceStep >= 1 ? 'badge-red' : 'badge-cyan'}`} style={{ fontSize: '0.75rem' }}>
            1. Pilih Metode
          </span>
          <span className={`badge ${practiceStep >= 2 ? 'badge-red' : 'badge-cyan'}`} style={{ fontSize: '0.75rem' }}>
            2. Pindai & Verifikasi
          </span>
          <span className={`badge ${practiceStep === 3 ? 'badge-green' : 'badge-cyan'}`} style={{ fontSize: '0.75rem' }}>
            3. Amankan Kode Cadangan
          </span>
        </div>
      </div>

      {/* STEP 1: Pilih Metode */}
      {practiceStep === 1 && (
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '6px' }}>
              Tentukan Metode Verifikasi Dua Langkah Anda
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
              Pilihlah metode otentikasi yang ingin dipasang pada akun Anda:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
            {/* Opsi 1: Authenticator App (Recommended) */}
            <div
              onClick={() => {
                playSound('click');
                setChosenMethod('authenticator');
              }}
              style={{
                background: chosenMethod === 'authenticator' ? '#eff6ff' : '#ffffff',
                border: `2px solid ${chosenMethod === 'authenticator' ? '#2563eb' : '#e2e8f0'}`,
                borderRadius: '14px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: chosenMethod === 'authenticator' ? '0 4px 14px rgba(37, 99, 235, 0.15)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1d4ed8' }}>
                  <QrCode size={24} />
                </div>
                <span className="badge badge-green" style={{ fontSize: '0.7rem' }}>Sangat Direkomendasikan</span>
              </div>
              <h4 style={{ fontSize: '1.02rem', color: '#0f172a', margin: '0 0 6px 0' }}>
                Aplikasi Authenticator (TOTP)
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Menggunakan Google Authenticator, Microsoft Authenticator, atau Aegis. Menghasilkan kode acak 6 digit offline setiap 30 detik. <strong>Kebal terhadap SIM Swap!</strong>
              </p>
            </div>

            {/* Opsi 2: SMS OTP */}
            <div
              onClick={() => {
                playSound('click');
                setChosenMethod('sms');
              }}
              style={{
                background: chosenMethod === 'sms' ? '#eff6ff' : '#ffffff',
                border: `2px solid ${chosenMethod === 'sms' ? '#2563eb' : '#e2e8f0'}`,
                borderRadius: '14px',
                padding: '20px',
                cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: chosenMethod === 'sms' ? '0 4px 14px rgba(37, 99, 235, 0.15)' : 'none'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ width: '42px', height: '42px', borderRadius: '10px', background: '#fee2e2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc2626' }}>
                  <Smartphone size={24} />
                </div>
                <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>Cukup Aman</span>
              </div>
              <h4 style={{ fontSize: '1.02rem', color: '#0f172a', margin: '0 0 6px 0' }}>
                SMS / WhatsApp OTP
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                Menerima kode verifikasi melalui SMS ke nomor ponsel. Mudah digunakan, namun rentan jika nomor hangus atau diretas via <em>SIM Swap</em>.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              className="btn btn-primary"
              style={{ padding: '12px 32px', fontSize: '0.95rem' }}
              onClick={() => {
                playSound('click');
                setPracticeStep(2);
              }}
            >
              <span>Lanjut ke Langkah Setup ({chosenMethod === 'authenticator' ? 'Scan QR Authenticator' : 'Kirim Kode SMS'})</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Pindai & Input 6-Digit PIN */}
      {practiceStep === 2 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'center' }}>
          
          {/* Sisi Kiri: Mockup Smartphone dengan Live TOTP App */}
          <div style={{
            background: '#090d16',
            border: '4px solid #334155',
            borderRadius: '28px',
            padding: '18px',
            maxWidth: '320px',
            margin: '0 auto',
            boxShadow: '0 16px 40px rgba(0, 0, 0, 0.35)',
            position: 'relative'
          }}>
            {/* Notch & Camera */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '14px' }}>
              <div style={{ width: '80px', height: '14px', background: '#1e293b', borderRadius: '10px' }} />
            </div>

            {/* Status bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8', marginBottom: '14px', padding: '0 6px' }}>
              <span>09:41</span>
              <span>📶 5G • 🔋 98%</span>
            </div>

            {/* Screen Inner */}
            <div style={{ background: '#020617', borderRadius: '18px', padding: '16px 12px', border: '1px solid #1e293b', textAlign: 'center' }}>
              <div style={{ fontSize: '0.74rem', color: '#38bdf8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                Google Authenticator
              </div>
              <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '16px' }}>
                @pelajar_kekinian • PKM UBBG
              </div>

              {/* Circular Gauge Timer */}
              <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="130" height="130" style={{ transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 }}>
                  <circle
                    cx="65"
                    cy="65"
                    r={radius}
                    stroke="#1e293b"
                    strokeWidth="6"
                    fill="transparent"
                  />
                  <circle
                    cx="65"
                    cy="65"
                    r={radius}
                    stroke={gaugeColor}
                    strokeWidth="6"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    fill="transparent"
                    style={{ transition: 'stroke-dashoffset 0.25s linear, stroke 0.3s ease' }}
                  />
                </svg>

                <div style={{ zIndex: 2 }}>
                  <div style={{ fontSize: '1.75rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#ffffff', letterSpacing: '2px', textShadow: '0 0 10px rgba(0, 240, 255, 0.4)' }}>
                    {currentOtp}
                  </div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 700, color: gaugeColor }}>
                    Kadaluarsa: {remainingSeconds}d
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.4 }}>
                🔄 Kode berganti otomatis tiap 30 detik (RFC 6238 TOTP Standard)
              </div>
            </div>
          </div>

          {/* Sisi Kanan: Form Input 6 Kotak & QR Code Mockup */}
          <div style={{ background: '#ffffff', border: '1.5px solid #fee2e2', borderRadius: '16px', padding: '24px', boxShadow: '0 4px 16px rgba(220, 38, 38, 0.05)' }}>
            
            {/* Setup info with mini QR */}
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: '#f8fafc', padding: '14px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <div style={{ width: '64px', height: '64px', background: '#ffffff', border: '1.5px solid #cbd5e1', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                <QrCode size={48} color="#0f172a" />
                {/* Laser scan beam animation */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: '#ef4444', boxShadow: '0 0 8px #ef4444', animation: 'scan 2s infinite linear' }} />
              </div>
              <div style={{ fontSize: '0.82rem' }}>
                <div style={{ fontWeight: 700, color: '#0f172a', marginBottom: '2px' }}>Kunci Rahasia Setup (Secret Key):</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                  <code style={{ background: '#e2e8f0', padding: '3px 6px', borderRadius: '4px', color: '#0f172a', fontWeight: 600 }}>CYBER-UBBG-2026-KEY</code>
                  <button className="btn btn-secondary btn-sm" style={{ padding: '2px 8px', fontSize: '0.72rem' }} onClick={handleCopyKey}>
                    {copiedKey ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                    <span>{copiedKey ? 'Tersalin' : 'Salin'}</span>
                  </button>
                </div>
              </div>
            </div>

            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '8px' }}>
              Konfirmasi Kode Verifikasi 6-Digit
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '18px' }}>
              Ketik 6 digit angka yang sedang aktif pada layar smartphone di samping:
            </p>

            <form onSubmit={handleVerify}>
              {/* 6 Individual Pin Boxes */}
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '18px' }}>
                {pinDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={pinRefs[index]}
                    type="text"
                    inputMode="numeric"
                    maxLength={index === 0 ? 6 : 1}
                    value={digit}
                    onChange={(e) => handleDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    style={{
                      width: '46px',
                      height: '54px',
                      textAlign: 'center',
                      fontSize: '1.5rem',
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 800,
                      borderRadius: '10px',
                      border: digit ? '2px solid #dc2626' : '2px solid #cbd5e1',
                      background: digit ? '#fef2f2' : '#ffffff',
                      color: '#0f172a',
                      outline: 'none',
                      transition: 'all 0.15s'
                    }}
                  />
                ))}
              </div>

              {errorMsg && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', fontSize: '0.82rem', marginBottom: '14px', justifyContent: 'center' }}>
                  <ShieldAlert size={15} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-full" style={{ padding: '12px' }}>
                <ShieldCheck size={16} />
                <span>Verifikasi & Kunci Akun dengan 2FA</span>
              </button>
            </form>
          </div>
        </div>
      )}

      {/* STEP 3: Cadangan Pemulihan (Backup Codes) & Selesai */}
      {practiceStep === 3 && (
        <div style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center', padding: '16px' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#16a34a' }}>
            <ShieldCheck size={38} />
          </div>

          <h3 style={{ fontSize: '1.35rem', color: '#0f172a', marginBottom: '6px' }}>
            Aktivasi 2FA Berhasil 100%!
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px' }}>
            Akun Anda kini memiliki tameng lapis kedua. Bahkan jika password Anda bocor saat insiden data breach, peretas tidak dapat menembus akun Anda tanpa perangkat fisik smartphone!
          </p>

          {/* Backup Codes Card */}
          <div style={{ background: '#f8fafc', border: '1.5px dashed #cbd5e1', borderRadius: '14px', padding: '20px', textAlign: 'left', marginBottom: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 700, fontSize: '0.9rem', color: '#0f172a' }}>
                <Key size={16} color="#dc2626" />
                <span>Simpan Kode Pemulihan Cadangan (Backup Codes)</span>
              </div>
              <span className="badge badge-amber" style={{ fontSize: '0.7rem' }}>Sangat Penting</span>
            </div>
            <p style={{ fontSize: '0.8rem', color: '#475569', margin: '0 0 12px 0' }}>
              Gunakan kode 8-digit sekali pakai ini jika suatu saat smartphone Anda hilang atau rusak:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.92rem', fontWeight: 700, color: '#334155' }}>
              {backupCodes.map((code, i) => (
                <div key={i} style={{ background: '#ffffff', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                  {code}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '14px', textAlign: 'right' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  playSound('click');
                  navigator.clipboard.writeText(backupCodes.join('\n'));
                  setCopiedBackup(true);
                  setTimeout(() => setCopiedBackup(false), 2000);
                }}
              >
                {copiedBackup ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                <span>{copiedBackup ? 'Kode Tersalin!' : 'Salin Semua Kode Cadangan'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              className="btn btn-secondary"
              onClick={() => {
                playSound('click');
                setPracticeStep(1);
                setPinDigits(['', '', '', '', '', '']);
              }}
            >
              <RotateCcw size={16} /> Ulangi Simulasi Aktivasi
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
