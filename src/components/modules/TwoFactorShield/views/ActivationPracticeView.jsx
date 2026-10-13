import React, { useState, useEffect } from 'react';
import { Smartphone, CheckCircle2, ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';

export function ActivationPracticeView({ onCompletePractice }) {
  const [practiceStep, setPracticeStep] = useState(1); // 1: pilih metode, 2: input otp, 3: selesai
  const [currentOtp, setCurrentOtp] = useState('482910');
  const [otpTimer, setOtpTimer] = useState(30);
  const [inputOtp, setInputOtp] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Countdown timer for 30s OTP
  useEffect(() => {
    let interval = null;
    if (practiceStep === 2) {
      interval = setInterval(() => {
        setOtpTimer(prev => {
          if (prev <= 1) {
            const nextCode = Math.floor(100000 + Math.random() * 900000).toString();
            setCurrentOtp(nextCode);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [practiceStep]);

  const handleVerify = (e) => {
    e.preventDefault();
    if (inputOtp.trim() === currentOtp) {
      playSound('complete');
      setErrorMsg('');
      setPracticeStep(3);
      onCompletePractice();
    } else {
      playSound('error');
      setErrorMsg('Kode OTP salah! Masukkan 6 digit yang tertera pada layar ponsel virtual.');
    }
  };

  return (
    <div className="glass-panel scenario-card">
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
          <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', marginBottom: '20px' }}>
            <Smartphone size={36} color="var(--accent-cyan)" style={{ margin: '0 auto 12px' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>Pilih Metode Keamanan 2FA</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', lineHeight: 1.5 }}>
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
          {/* Mockup HP virtual */}
          <div style={{ background: '#020617', border: '2px solid #334155', borderRadius: '24px', padding: '24px', maxWidth: '300px', margin: '0 auto', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
            <div style={{ width: '40px', height: '4px', background: '#334155', borderRadius: '4px', margin: '0 auto 16px' }}></div>
            <div style={{ fontSize: '0.74rem', color: '#94a3b8', textTransform: 'uppercase', marginBottom: '8px' }}>
              Authenticator Token
            </div>
            <div style={{ fontSize: '2.4rem', fontFamily: 'var(--font-mono)', fontWeight: 800, color: '#00f0ff', letterSpacing: '4px', marginBottom: '8px' }}>
              {currentOtp}
            </div>
            <div style={{ fontSize: '0.76rem', color: otpTimer <= 5 ? '#f43f5e' : '#10b981' }}>
              Berganti dalam {otpTimer} detik
            </div>
          </div>

          {/* Form input */}
          <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '12px', padding: '20px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>Masukkan 6-Digit Kode Konfirmasi</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '16px' }}>
              Ketik kode OTP yang sedang aktif di layar HP virtual di samping:
            </p>

            <form onSubmit={handleVerify}>
              <input
                type="text"
                maxLength={6}
                value={inputOtp}
                onChange={(e) => setInputOtp(e.target.value.replace(/\D/g, ''))}
                placeholder="Contoh: 482910"
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.2)', background: 'rgba(0, 0, 0, 0.4)', color: '#fff', fontSize: '1.2rem', fontFamily: 'var(--font-mono)', textAlign: 'center', letterSpacing: '4px', marginBottom: '12px' }}
                required
              />

              {errorMsg && (
                <div style={{ color: '#f87171', fontSize: '0.8rem', marginBottom: '12px' }}>
                  {errorMsg}
                </div>
              )}

              <button type="submit" className="btn btn-primary btn-full">
                Verifikasi & Kunci Akun
              </button>
            </form>
          </div>
        </div>
      )}

      {practiceStep === 3 && (
        <div style={{ textAlign: 'center', padding: '30px 20px', maxWidth: '480px', margin: '0 auto' }}>
          <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <CheckCircle2 size={36} />
          </div>
          <h3 style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: '8px' }}>
            2FA Berhasil Diaktifkan!
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '20px' }}>
            Akunmu kini terlindungi dengan lapis pertahanan ganda. Siapa pun yang mencoba masuk tanpa izin fisik terhadap HP-mu akan otomatis terblokir!
          </p>
          <div className="badge badge-green" style={{ padding: '8px 18px', fontSize: '0.86rem' }}>
            Nilai Penuh 100/100 Tercapai
          </div>
        </div>
      )}
    </div>
  );
}
