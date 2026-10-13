import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';
import { FloatingScoreBurst } from '../../../layout/FloatingScoreBurst';

export function ActivationPracticeView({ onCompletePractice }) {
  const [practiceStep, setPracticeStep] = useState(1); // 1: pilih metode, 2: input otp, 3: selesai
  const [currentOtp, setCurrentOtp] = useState('482910');
  const [remainingSeconds, setRemainingSeconds] = useState(30);
  const [inputOtp, setInputOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [burstTrigger, setBurstTrigger] = useState(0);

  const cycleStartRef = useRef(Date.now());
  const lastCycleRef = useRef(0);

  // Anti-drift timestamp-based countdown
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

  const handleVerify = (e) => {
    e.preventDefault();
    if (inputOtp.trim() === currentOtp) {
      playSound('complete');
      setErrorMsg('');
      setBurstTrigger(t => t + 1);
      setPracticeStep(3);
      onCompletePractice();
    } else {
      playSound('error');
      setErrorMsg('Kode OTP salah! Masukkan 6 digit yang tertera pada layar ponsel virtual.');
    }
  };

  // Circular gauge calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (remainingSeconds / 30) * circumference;
  const gaugeColor = remainingSeconds <= 5 ? '#f43f5e' : remainingSeconds <= 12 ? '#f59e0b' : '#38bdf8';

  return (
    <div className="glass-panel scenario-card">
      <FloatingScoreBurst text="+50 PTS!" trigger={burstTrigger} />

      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>
          Praktik Interaktif: Aktivasi Verifikasi Dua Langkah (2FA)
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
          Ikuti alur aktivasi pengamanan akun media sosial berikut layaknya di aplikasi Instagram atau WhatsApp nyata:
        </p>
      </div>

      {practiceStep === 1 && (
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ padding: '24px', background: '#f8fafc', border: '1.5px solid #e2e8f0', borderRadius: '14px', marginBottom: '20px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)' }}>
            <Smartphone size={36} color="#dc2626" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.15rem', color: '#0f172a', marginBottom: '8px' }}>Pilih Metode Keamanan 2FA</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5 }}>
              Direkomendasikan menggunakan aplikasi Authenticator (Google Authenticator / Microsoft) atau SMS OTP ke nomor pribadi.
            </p>
          </div>

          <button
            className="btn btn-primary btn-full"
            onClick={() => {
              playSound('click');
              setPracticeStep(2);
            }}
          >
            Aktifkan via Aplikasi Authenticator / SMS OTP
          </button>
        </div>
      )}

      {practiceStep === 2 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', alignItems: 'center' }}>
          {/* Mockup HP virtual dengan Circular Timer Gauge */}
          <div style={{ background: '#020617', border: '3px solid #334155', borderRadius: '24px', padding: '24px 20px', maxWidth: '300px', margin: '0 auto', textAlign: 'center', boxShadow: '0 12px 30px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '40px', height: '4px', background: '#334155', borderRadius: '4px', margin: '0 auto 16px' }} />
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '1px' }}>
              Aplikasi Authenticator
            </div>

            {/* Circular Gauge SVG */}
            <div style={{ position: 'relative', width: '130px', height: '130px', margin: '0 auto 14px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="130" height="130" style={{ transform: 'rotate(-90deg)', position: 'absolute', top: 0, left: 0 }}>
                {/* Background Track */}
                <circle
                  cx="65"
                  cy="65"
                  r={radius}
                  stroke="#1e293b"
                  strokeWidth="6"
                  fill="transparent"
                />
                {/* Dynamic Countdown Circle */}
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

              <div style={{ zIndex: 2, textAlign: 'center' }}>
                <div style={{ fontSize: '1.65rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#ffffff', letterSpacing: '2px' }}>
                  {currentOtp}
                </div>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: gaugeColor }}>
                  {remainingSeconds}s
                </div>
              </div>
            </div>

            <div style={{ fontSize: '0.74rem', color: '#64748b' }}>
              Kode OTP berubah otomatis demi keamanan
            </div>
          </div>

          {/* Form input */}
          <div style={{ background: '#ffffff', border: '1.5px solid #fee2e2', borderRadius: '14px', padding: '24px', boxShadow: '0 4px 14px rgba(220, 38, 38, 0.05)' }}>
            <h3 style={{ fontSize: '1.05rem', color: '#0f172a', marginBottom: '10px' }}>Masukkan 6-Digit Kode Konfirmasi</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginBottom: '16px' }}>
              Ketik kode OTP yang sedang aktif di layar HP virtual di samping:
            </p>

            <form onSubmit={handleVerify}>
              <input
                type="text"
                maxLength={6}
                value={inputOtp}
                onChange={(e) => setInputOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="Contoh: 482910"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '2px solid #cbd5e1', background: '#ffffff', color: '#0f172a', fontSize: '1.3rem', fontFamily: 'var(--font-mono)', textAlign: 'center', letterSpacing: '4px', marginBottom: '14px' }}
                required
              />

              {errorMsg && (
                <div style={{ color: '#dc2626', fontSize: '0.82rem', marginBottom: '12px' }}>
                  {errorMsg}
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-full">
                Verifikasi & Kunci Akun dengan 2FA
              </button>
            </form>
          </div>
        </div>
      )}

      {practiceStep === 3 && (
        <div style={{ maxWidth: '480px', margin: '0 auto', textAlign: 'center', padding: '24px' }}>
          <div style={{ color: '#16a34a', marginBottom: '16px' }}>
            <ShieldCheck size={56} style={{ margin: '0 auto' }} />
          </div>
          <h3 style={{ fontSize: '1.3rem', color: '#0f172a', marginBottom: '8px' }}>
            Aktivasi 2FA Berhasil Sempurna!
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '24px' }}>
            Akun Anda kini terlindungi oleh verifikasi dua langkah. Bahkan jika password Anda bocor, penyerang tidak akan bisa masuk tanpa memegang fisik smartphone Anda!
          </p>

          <button
            className="btn btn-secondary"
            onClick={() => {
              playSound('click');
              setPracticeStep(1);
              setInputOtp('');
            }}
          >
            <RotateCcw size={16} /> Ulangi Praktik
          </button>
        </div>
      )}
    </div>
  );
}
