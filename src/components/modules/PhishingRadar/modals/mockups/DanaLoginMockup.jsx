import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  AlertTriangle, 
  ShieldAlert, 
  Wallet, 
  Coins, 
  ArrowRight, 
  KeyRound, 
  MessageSquare, 
  Smartphone, 
  Clock, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { playSound } from '../../../../../utils/soundEffects';
import './DanaLoginMockup.css';

export function DanaLoginMockup({ scenario, onBreach }) {
  const [currentStep, setCurrentStep] = useState(1); // 1: Phone, 2: PIN, 3: OTP
  const [phone, setPhone] = useState('0812-9876-5432');
  const [pin, setPin] = useState('123456');
  const [otp, setOtp] = useState('8492');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSmsToast, setShowSmsToast] = useState(false);

  // When step 3 (OTP) is reached, simulate incoming SMS notification after 600ms
  useEffect(() => {
    if (currentStep === 3) {
      const timer = setTimeout(() => {
        setShowSmsToast(true);
        playSound('beep');
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Step 1: Submit Phone Number
  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const cleanPhone = phone.trim();
    if (!cleanPhone || cleanPhone.length < 8) {
      playSound('beep');
      setErrorMessage('Nomor ponsel akun DANA wajib diisi dengan benar (minimal 8 angka)!');
      return;
    }
    setErrorMessage('');
    playSound('click');
    setCurrentStep(2);
  };

  // Step 2: Submit 6-Digit PIN
  const handlePinSubmit = (e) => {
    e.preventDefault();
    const cleanPin = pin.trim();
    if (!cleanPin || cleanPin.length !== 6) {
      playSound('beep');
      setErrorMessage('PIN DANA wajib 6 digit angka lengkap!');
      return;
    }
    setErrorMessage('');
    playSound('click');
    setCurrentStep(3);
  };

  // Step 3: Submit OTP Code -> Trigger Breach & Siren
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    const cleanOtp = otp.trim();
    if (!cleanOtp || cleanOtp.length < 4) {
      playSound('beep');
      setErrorMessage('Masukkan 4 digit kode OTP yang diterima melalui SMS!');
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
    <div className="dana-mockup-container">
      {/* Top Educational Safety Banner */}
      <div className="dana-safety-banner">
        <AlertTriangle size={18} color="#d97706" style={{ flexShrink: 0 }} />
        <span>
          <strong>SIMULASI PHISHING DANA KAGET:</strong> Halaman ini adalah rekayasa penipuan social engineering. Dilarang mengetik nomor ponsel atau PIN asli Anda!
        </span>
      </div>

      {/* Simulated Incoming SMS Toast when on OTP step */}
      {currentStep === 3 && showSmsToast && (
        <div className="dana-sms-toast">
          <div className="dana-sms-icon">
            <MessageSquare size={16} />
          </div>
          <div className="dana-sms-content">
            <div className="dana-sms-header">
              <span className="dana-sms-sender">DANA-SECURITY (SMS)</span>
              <span className="dana-sms-time">Baru saja</span>
            </div>
            <div className="dana-sms-text">
              JANGAN BAGIKAN! Kode OTP verifikasi login perangkat baru DANA Anda adalah:{' '}
              <span className="dana-sms-otp-code">8492</span>. Waspada penipuan!
            </div>
          </div>
        </div>
      )}

      {/* DANA Brand Header Card */}
      <div className="dana-header-card">
        <div className="dana-logo-title">
          <Wallet size={26} />
          <span>DANA INDONESIA</span>
        </div>
        <div className="dana-kaget-badge">
          <Coins size={14} color="#fde047" />
          <span>EVENT DANA KAGET HARI INI</span>
        </div>
        <div className="dana-kaget-nominal">Rp 250.000</div>
        <div className="dana-kaget-sub">Klaim saldo gratis masuk langsung ke nomor akun DANA Anda</div>
      </div>

      {/* Step Progress Indicators */}
      <div className="dana-step-bar">
        <div className={`dana-step-item ${currentStep >= 1 ? 'active' : ''}`}>
          <span className="dana-step-num">1</span>
          <span>Nomor HP</span>
        </div>
        <div className="dana-step-divider" />
        <div className={`dana-step-item ${currentStep >= 2 ? 'active' : ''}`}>
          <span className="dana-step-num">2</span>
          <span>PIN Transaksi</span>
        </div>
        <div className="dana-step-divider" />
        <div className={`dana-step-item ${currentStep >= 3 ? 'active' : ''}`}>
          <span className="dana-step-num">3</span>
          <span>Kode OTP</span>
        </div>
      </div>

      {/* Main Form Body */}
      <div className="dana-form-card">
        {errorMessage && (
          <div className="dana-error-alert">
            <AlertTriangle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP 1: NOMOR PONSEL */}
        {currentStep === 1 && (
          <form onSubmit={handlePhoneSubmit}>
            <div style={{ marginBottom: '16px' }}>
              <label className="dana-field-label">
                Nomor Ponsel Akun DANA
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="08xx-xxxx-xxxx"
                className="dana-input-text"
              />
              <span style={{ fontSize: '0.74rem', color: '#64748b', marginTop: '4px', display: 'block' }}>
                Pastikan nomor HP terdaftar pada aplikasi DANA aktif.
              </span>
            </div>

            <button type="submit" className="dana-btn-submit">
              <span>Lanjut ke Verifikasi PIN</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* STEP 2: 6 DIGIT PIN DANA */}
        {currentStep === 2 && (
          <form onSubmit={handlePinSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '14px' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0f172a' }}>
                Masukkan 6 Digit PIN DANA
              </div>
              <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '2px' }}>
                Untuk nomor akun: <strong>{phone}</strong>
              </div>
            </div>

            {/* 6-Dot PIN Circles Visual */}
            <div className="dana-pin-display-row">
              {[0, 1, 2, 3, 4, 5].map((index) => (
                <div
                  key={index}
                  className={`dana-pin-circle ${pin.length > index ? 'filled' : ''}`}
                />
              ))}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <input
                type="password"
                maxLength={6}
                value={pin}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                  setPin(val);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Ketik 6 digit PIN DANA"
                className="dana-input-text"
                style={{ textAlign: 'center', letterSpacing: '6px', fontSize: '1.2rem', fontWeight: 800 }}
              />
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="btn btn-secondary"
                style={{ padding: '11px 16px', fontSize: '0.84rem' }}
              >
                Kembali
              </button>
              <button type="submit" className="dana-btn-submit" style={{ flex: 1 }}>
                <span>Konfirmasi PIN & Klaim Saldo</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: KODE OTP SMS (TRICK SOCIAL ENGINEERING REALISTIS) */}
        {currentStep === 3 && (
          <form onSubmit={handleOtpSubmit}>
            <div style={{ textAlign: 'center', marginBottom: '12px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: '#ebf5fc',
                color: '#118eea',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 8px'
              }}>
                <Smartphone size={22} />
              </div>
              <div style={{ fontSize: '0.92rem', fontWeight: 800, color: '#0f172a' }}>
                Verifikasi Kode OTP SMS
              </div>
              <div style={{ fontSize: '0.76rem', color: '#64748b', marginTop: '3px', lineHeight: 1.45 }}>
                Kode otentikasi darurat telah dikirimkan via SMS ke nomor <strong>{phone}</strong> untuk mencairkan saldo Rp 250.000.
              </div>
            </div>

            {/* 4-Box OTP Display */}
            <div className="dana-otp-boxes-row">
              {[0, 1, 2, 3].map((idx) => (
                <div
                  key={idx}
                  className={`dana-otp-single-box ${otp.length === idx ? 'active' : ''}`}
                >
                  {otp[idx] || '•'}
                </div>
              ))}
            </div>

            <div style={{ marginBottom: '18px' }}>
              <input
                type="text"
                maxLength={4}
                value={otp}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '').slice(0, 4);
                  setOtp(val);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="Ketik 4 digit OTP"
                className="dana-input-text"
                style={{ textAlign: 'center', letterSpacing: '8px', fontSize: '1.2rem', fontWeight: 800 }}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="dana-btn-submit"
            >
              {submitting ? (
                <span>Memvalidasi Kode OTP...</span>
              ) : (
                <>
                  <CheckCircle2 size={18} />
                  <span>Verifikasi OTP & Cairkan Rp 250.000</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Warning Clue */}
        <div className="dana-footer-hint">
          <AlertTriangle size={15} style={{ flexShrink: 0 }} />
          <span>
            {currentStep === 1 && 'Situs ini bukan dana.id resmi — jangan berikan nomor telepon aktif Anda!'}
            {currentStep === 2 && 'BAHAYA: PIN 6 digit digunakan peretas untuk otorisasi transfer saldo rekening!'}
            {currentStep === 3 && 'FATAL: Kode OTP SMS sebenarnya adalah kode izin login perangkat baru peretas!'}
          </span>
        </div>
      </div>
    </div>
  );
}
