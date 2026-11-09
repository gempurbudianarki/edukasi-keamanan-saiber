import React, { useState, useEffect, useRef } from 'react';
import { 
  Smartphone, 
  CheckCircle2, 
  ShieldCheck, 
  RotateCcw, 
  Sparkles, 
  QrCode, 
  Key, 
  Copy, 
  Check, 
  ArrowRight, 
  ShieldAlert, 
  HelpCircle, 
  Wifi, 
  Battery, 
  RotateCw,
  Zap,
  Lock,
  MessageSquare,
  Cpu,
  ChevronDown,
  ChevronUp,
  Binary,
  Award,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';
import { FloatingScoreBurst } from '../../../layout/FloatingScoreBurst';

export function ActivationPracticeView({ onCompletePractice, onProceedToDrills }) {
  const [practiceStep, setPracticeStep] = useState(1); // 1: Pilih Metode, 2: Setup & Input OTP, 3: Backup Codes
  const [chosenMethod, setChosenMethod] = useState('authenticator'); // 'authenticator' | 'sms'
  const [currentOtp, setCurrentOtp] = useState('583921');
  const [previousOtp, setPreviousOtp] = useState('583921'); // RFC 6238 clock-drift tolerance window
  const [remainingSeconds, setRemainingSeconds] = useState(30);
  const [unixTimeCounter, setUnixTimeCounter] = useState(() => Math.floor(Date.now() / 30000));
  const [pinDigits, setPinDigits] = useState(['', '', '', '', '', '']);
  const [errorMsg, setErrorMsg] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);
  const [otpRefreshed, setOtpRefreshed] = useState(false);
  const [showAlgoDetails, setShowAlgoDetails] = useState(false);

  // Stable single ref array
  const pinRefs = useRef([]);
  const cycleStartRef = useRef(Date.now());
  const lastCycleRef = useRef(0);

  // Anti-drift 30s TOTP countdown with RFC 6238 grace window
  useEffect(() => {
    if (practiceStep !== 2) return;
    cycleStartRef.current = Date.now();

    const interval = setInterval(() => {
      const now = Date.now();
      const elapsed = (now - cycleStartRef.current) / 1000;
      const currentCycle = Math.floor(elapsed / 30);

      setUnixTimeCounter(Math.floor(now / 30000));

      if (currentCycle !== lastCycleRef.current) {
        lastCycleRef.current = currentCycle;
        const nextCode = Math.floor(100000 + Math.random() * 900000).toString();
        setCurrentOtp(old => {
          setPreviousOtp(old);
          return nextCode;
        });
        setOtpRefreshed(true);
        setTimeout(() => setOtpRefreshed(false), 800);
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

    newDigits[index] = cleaned ? cleaned[cleaned.length - 1] : '';
    setPinDigits(newDigits);
    setErrorMsg('');

    if (cleaned && index < 5) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  // Global onPaste handling on any input box
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;

    const newDigits = [...pinDigits];
    for (let i = 0; i < 6; i++) {
      newDigits[i] = pasted[i] || '';
    }
    setPinDigits(newDigits);
    setErrorMsg('');
    playSound('keyboard');

    if (pasted.length >= 6) {
      pinRefs.current[5]?.focus();
    } else {
      pinRefs.current[pasted.length]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!pinDigits[index] && index > 0) {
        e.preventDefault();
        const newDigits = [...pinDigits];
        newDigits[index - 1] = '';
        setPinDigits(newDigits);
        pinRefs.current[index - 1]?.focus();
      } else if (pinDigits[index]) {
        const newDigits = [...pinDigits];
        newDigits[index] = '';
        setPinDigits(newDigits);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      pinRefs.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      e.preventDefault();
      pinRefs.current[index + 1]?.focus();
    }
  };

  // Quick autofill convenience button for responsive testing
  const handleQuickAutofill = () => {
    playSound('keyboard');
    const digits = currentOtp.split('');
    setPinDigits(digits);
    setErrorMsg('');
    pinRefs.current[5]?.focus();
  };

  const handleVerify = (e) => {
    e.preventDefault();
    const entered = pinDigits.join('');
    
    // RFC 6238 Tolerance: accept current OTP OR previous cycle OTP within 30s drift window
    if (entered === currentOtp || entered === previousOtp) {
      playSound('complete');
      setErrorMsg('');
      setBurstTrigger(t => t + 1);
      setPracticeStep(3);
      if (onCompletePractice) {
        onCompletePractice();
      }
    } else {
      playSound('error');
      setErrorMsg(`Kode verifikasi tidak sesuai! Masukkan 6 digit yang aktif pada layar smartphone (${currentOtp})`);
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
    <div className="glass-panel scenario-card anim-pop-in">
      <FloatingScoreBurst text="+60 PTS SETUP 2FA!" trigger={burstTrigger} />

      {/* Header */}
      <div className="twofa-drill-header">
        <div>
          <div className="drill-stage-badge">
            <Sparkles size={14} color="#00f0ff" />
            <span>TAHAP 2: SIMULASI SETUP VERIFIKASI DUA LANGKAH 1:1</span>
          </div>
          <h2 className="twofa-section-title">
            Praktik Mandiri: Aktivasi Verifikasi Dua Langkah (2FA) Standar Industri
          </h2>
          <p className="twofa-section-subtitle">
            Pelajari alur konfigurasi 2FA standar global seperti pada Google, WhatsApp, dan Instagram untuk membentengi akun pribadimu.
          </p>
        </div>

        {/* Step indicator pills */}
        <div className="practice-step-pills-row">
          <span className={`badge ${practiceStep >= 1 ? 'badge-yellow' : 'badge-slate'}`}>
            1. Pilih Metode
          </span>
          <span className={`badge ${practiceStep >= 2 ? 'badge-cyan' : 'badge-slate'}`}>
            2. Pindai & Verifikasi
          </span>
          <span className={`badge ${practiceStep === 3 ? 'badge-green' : 'badge-slate'}`}>
            3. Amankan Kode Cadangan
          </span>
        </div>
      </div>

      {/* STEP 1: Pilih Metode */}
      {practiceStep === 1 && (
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '24px' }}>
            <h3 style={{ fontSize: '1.2rem', color: '#0f172a', marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>
              Langkah 1: Tentukan Metode Verifikasi Dua Langkah Anda
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Pilihlah metode otentikasi yang ingin dipasang pada akun Anda:
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '18px', marginBottom: '26px' }}>
            {/* Opsi 1: Authenticator App (Recommended) */}
            <div
              className={`twofa-method-card ${chosenMethod === 'authenticator' ? 'active' : ''}`}
              onClick={() => {
                playSound('click');
                setChosenMethod('authenticator');
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '8px', background: 'var(--nb-cyan, #00f0ff)', border: '2.5px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', boxShadow: '2px 2px 0 #000' }}>
                  <QrCode size={26} />
                </div>
                <span className="badge badge-green" style={{ fontSize: '0.74rem', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Award size={13} />
                  <span>Standar Keamanan Tertinggi</span>
                </span>
              </div>
              <h4 style={{ fontSize: '1.1rem', color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'var(--font-heading)' }}>
                Aplikasi Authenticator (TOTP)
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                Menggunakan Google Authenticator, Microsoft Authenticator, atau Aegis. Menghasilkan kode acak 6 digit offline setiap 30 detik.
              </p>
              <div style={{ fontSize: '0.76rem', background: '#dcfce7', border: '1.5px solid #16a34a', padding: '6px 10px', borderRadius: '4px', color: '#15803d', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={15} color="#16a34a" />
                <span>Kebal terhadap pembajakan SIM Swap & SMS Sniffing!</span>
              </div>
            </div>

            {/* Opsi 2: SMS OTP */}
            <div
              className={`twofa-method-card ${chosenMethod === 'sms' ? 'active' : ''}`}
              onClick={() => {
                playSound('click');
                setChosenMethod('sms');
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '8px', background: 'var(--nb-yellow, #facc15)', border: '2.5px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#000', boxShadow: '2px 2px 0 #000' }}>
                  <MessageSquare size={26} />
                </div>
                <span className="badge badge-amber" style={{ fontSize: '0.74rem' }}>Tingkat Dasar</span>
              </div>
              <h4 style={{ fontSize: '1.1rem', color: '#0f172a', margin: '0 0 8px 0', fontFamily: 'var(--font-heading)' }}>
                SMS / WhatsApp OTP
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: '0 0 10px 0' }}>
                Menerima kode verifikasi melalui SMS ke nomor ponsel. Mudah digunakan, namun memiliki celah jika nomor diretas melalui modus SIM Swap.
              </p>
              <div style={{ fontSize: '0.76rem', background: '#fef3c7', border: '1.5px solid #d97706', padding: '6px 10px', borderRadius: '4px', color: '#92400e', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <AlertTriangle size={15} color="#d97706" />
                <span>Rentan jika ada kurir penipu meminta kode SMS!</span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <button
              id="btn-proceed-to-step2"
              className="btn btn-primary"
              style={{ padding: '12px 32px', fontSize: '0.96rem' }}
              onClick={() => {
                playSound('click');
                setPracticeStep(2);
              }}
            >
              <span>Lanjut ke Langkah 2: Pindai QR Code & Sinkronisasi</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Pindai & Input 6-Digit PIN */}
      {practiceStep === 2 && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '26px', alignItems: 'center' }}>
            
            {/* Sisi Kiri: Mockup Smartphone dengan Live TOTP App */}
            <div className="phone-device-card" style={{ maxWidth: '330px', margin: '0 auto' }}>
              {/* Dynamic Island Notch */}
              <div className="dynamic-island">
                <span className="notch-camera" />
                <span className="notch-sensor" />
              </div>

              {/* Status bar */}
              <div className="phone-status-bar">
                <span style={{ fontWeight: 700 }}>09:41</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Wifi size={12} />
                  <span>5G</span>
                  <Battery size={14} />
                </div>
              </div>

              {/* Screen Inner */}
              <div style={{ background: '#020617', borderRadius: '18px', padding: '18px 14px', border: '2px solid #1e293b', textAlign: 'center' }}>
                <div style={{ fontSize: '0.76rem', color: 'var(--nb-cyan, #00f0ff)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>
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
                    <div className={`otp-display-number ${otpRefreshed ? 'anim-pop-in' : ''}`} style={{ fontSize: '1.85rem', fontFamily: 'var(--font-mono)', fontWeight: 900, color: '#ffffff', letterSpacing: '2px', textShadow: '0 0 12px rgba(0, 240, 255, 0.4)' }}>
                      {currentOtp}
                    </div>
                    <div style={{ fontSize: '0.74rem', fontWeight: 800, color: gaugeColor }}>
                      Kadaluarsa: {remainingSeconds} detik
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: '0.72rem', color: '#64748b', lineHeight: 1.4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                  <RotateCw size={13} />
                  <span>Kode berganti otomatis tiap 30 detik (RFC 6238 TOTP Standard)</span>
                </div>
              </div>
            </div>

            {/* Sisi Kanan: Form Input 6 Kotak & QR Code Mockup */}
            <div style={{ background: '#ffffff', border: '3px solid #000000', borderRadius: 'var(--radius-md, 12px)', padding: '24px', boxShadow: '6px 6px 0 #000000' }}>
              
              {/* Setup info with mini QR */}
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '2px solid #000000', marginBottom: '20px', boxShadow: '3px 3px 0 #000000' }}>
                <div style={{ width: '68px', height: '68px', background: '#ffffff', border: '2px solid #000000', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden', boxShadow: '2px 2px 0 #000' }}>
                  <QrCode size={52} color="#0f172a" />
                  {/* Laser scan beam animation */}
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: '#ef4444', boxShadow: '0 0 10px #ef4444', animation: 'scan 2s infinite linear' }} />
                </div>
                <div style={{ fontSize: '0.84rem' }}>
                  <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '2px' }}>Kunci Rahasia Setup (Secret Seed):</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px', flexWrap: 'wrap' }}>
                    <code style={{ background: '#e2e8f0', padding: '4px 8px', borderRadius: '4px', border: '1.5px solid #000', color: '#0f172a', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>CYBER-UBBG-2026-KEY</code>
                    <button className="btn btn-secondary btn-sm" style={{ padding: '3px 10px', fontSize: '0.74rem' }} onClick={handleCopyKey}>
                      {copiedKey ? <Check size={12} color="#16a34a" /> : <Copy size={12} />}
                      <span>{copiedKey ? 'Tersalin' : 'Salin Kunci'}</span>
                    </button>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1.15rem', color: '#0f172a', margin: 0, fontFamily: 'var(--font-heading)' }}>
                  Konfirmasi Kode 6-Digit dari HP
                </h3>
                <button 
                  type="button" 
                  className="btn btn-secondary btn-sm" 
                  onClick={handleQuickAutofill}
                  title="Isi otomatis digit yang sedang aktif di HP"
                  style={{ fontSize: '0.74rem', padding: '4px 8px' }}
                >
                  <Zap size={13} color="#f59e0b" />
                  <span>Isi Otomatis</span>
                </button>
              </div>
              
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', marginBottom: '18px' }}>
                Ketik 6 digit angka yang sedang aktif pada layar smartphone di samping:
              </p>

              <form onSubmit={handleVerify}>
                {/* 6 Individual Pin Boxes with smooth keyboard and paste handling */}
                <div 
                  style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '18px', flexWrap: 'wrap' }}
                  onPaste={handlePaste}
                >
                  {pinDigits.map((digit, index) => (
                    <input
                      key={index}
                      ref={el => (pinRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className={`twofa-pin-input ${digit ? 'has-value' : ''}`}
                      aria-label={`Digit ke ${index + 1}`}
                    />
                  ))}
                </div>

                {errorMsg && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#dc2626', fontSize: '0.84rem', marginBottom: '14px', justifyContent: 'center', fontWeight: 700 }}>
                    <ShieldAlert size={16} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button 
                  id="btn-verify-twofa-pin"
                  type="submit" 
                  className="btn btn-primary btn-full" 
                  style={{ padding: '12px' }}
                >
                  <ShieldCheck size={18} />
                  <span>Verifikasi & Kunci Akun dengan 2FA</span>
                </button>
              </form>
            </div>
          </div>

          {/* Educational Cryptographic TOTP Algorithm Visualizer */}
          <div style={{ marginTop: '20px' }}>
            <button
              className="btn btn-secondary btn-sm"
              onClick={() => {
                playSound('click');
                setShowAlgoDetails(prev => !prev);
              }}
              style={{ fontSize: '0.78rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <Cpu size={15} color="#00f0ff" />
              <span>{showAlgoDetails ? 'Tutup Penjelasan Algoritma Kriptografi' : 'Bedah Kriptografi: Cara Kerja Algoritma TOTP (RFC 6238)'}</span>
              {showAlgoDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {showAlgoDetails && (
              <div className="totp-algorithm-box anim-pop-in">
                <div className="totp-algo-header">
                  <div className="totp-algo-title">
                    <Binary size={18} />
                    <span>ALGORITMA TIME-BASED ONE-TIME PASSWORD (HMAC-SHA1 RFC 6238)</span>
                  </div>
                  <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                    Beroperasi 100% Offline Tanpa Internet
                  </span>
                </div>

                <div className="algorithm-pipeline-row">
                  <div className="pipeline-node">
                    <div className="pipeline-node-label">1. Kunci Rahasia (Seed K)</div>
                    <div className="pipeline-node-code">CYBER-UBBG-KEY</div>
                  </div>

                  <span className="pipeline-arrow">+</span>

                  <div className="pipeline-node">
                    <div className="pipeline-node-label">2. Counter Waktu Unix (T)</div>
                    <div className="pipeline-node-code">{unixTimeCounter}</div>
                  </div>

                  <span className="pipeline-arrow"><ArrowRight size={18} color="#00f0ff" /></span>

                  <div className="pipeline-node">
                    <div className="pipeline-node-label">3. Fungsi Kriptografis</div>
                    <div className="pipeline-node-code" style={{ color: '#38bdf8' }}>HMAC-SHA1(K, T)</div>
                  </div>

                  <span className="pipeline-arrow"><ArrowRight size={18} color="#00f0ff" /></span>

                  <div className="pipeline-node" style={{ borderColor: '#22c55e' }}>
                    <div className="pipeline-node-label">4. Dynamic Truncation</div>
                    <div className="pipeline-node-code" style={{ color: '#4ade80', fontSize: '1.1rem' }}>{currentOtp}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: 1.5, marginTop: '14px', borderTop: '1px solid #1e293b', paddingTop: '10px' }}>
                  <Lightbulb size={16} color="#facc15" style={{ marginRight: 6, verticalAlign: 'middle', display: 'inline-block' }} />
                  <strong>Jawaban Pertanyaan Kritis:</strong> Mengapa smartphone bisa menghasilkan kode yang sama persis dengan server meski HP dalam <em>mode pesawat (tanpa internet)</em>? Karena smartphone dan server sama-sama menyimpan seed <code>K</code> yang sama saat pertama kali scan QR, dan keduanya memiliki jam sinkron (waktu Unix dunia) sehingga hasil perhitungan matematikanya selalu identik!
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* STEP 3: Cadangan Pemulihan (Backup Codes) & Selesai */}
      {practiceStep === 3 && (
        <div style={{ maxWidth: '620px', margin: '0 auto', textAlign: 'center', padding: '16px' }}>
          <div style={{ width: '68px', height: '68px', borderRadius: '16px', background: 'var(--nb-lime, #22c55e)', border: '3px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ffffff', boxShadow: '4px 4px 0 #000' }}>
            <ShieldCheck size={42} />
          </div>

          <h3 style={{ fontSize: '1.45rem', color: '#0f172a', marginBottom: '6px', fontFamily: 'var(--font-heading)' }}>
            Setup 2FA Berhasil 100%!
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.55, marginBottom: '22px' }}>
            Akun Anda kini telah memiliki tameng otentikasi lapis kedua. Bahkan jika password Anda bocor saat insiden data breach, peretas tetap tidak dapat menembus akun Anda tanpa smartphone fisik!
          </p>

          {/* Backup Codes Card */}
          <div className="twofa-backup-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 900, fontSize: '0.98rem', color: '#0f172a', fontFamily: 'var(--font-heading)' }}>
                <Key size={18} color="#ff4d4d" />
                <span>Simpan Kode Pemulihan Cadangan (Backup Codes)</span>
              </div>
              <span className="badge badge-amber" style={{ fontSize: '0.74rem' }}>Sangat Penting</span>
            </div>
            <p style={{ fontSize: '0.84rem', color: '#475569', margin: '0 0 14px 0', lineHeight: 1.5 }}>
              Gunakan kode 8-digit sekali pakai ini jika suatu saat smartphone Anda hilang, rusak, atau tercebur ke air:
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '1rem', color: '#0f172a' }}>
              {backupCodes.map((code, i) => (
                <div key={i} className="twofa-backup-code-pill">
                  {code}
                </div>
              ))}
            </div>

            <div style={{ marginTop: '16px', textAlign: 'right' }}>
              <button
                id="btn-copy-backup-codes"
                className="btn btn-secondary btn-sm"
                onClick={() => {
                  playSound('click');
                  navigator.clipboard.writeText(backupCodes.join('\n'));
                  setCopiedBackup(true);
                  setTimeout(() => setCopiedBackup(false), 2000);
                }}
              >
                {copiedBackup ? <Check size={14} color="#16a34a" /> : <Copy size={14} />}
                <span>{copiedBackup ? 'Semua Kode Tersalin!' : 'Salin Semua Kode Cadangan'}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px' }}>
            <button
              id="btn-restart-setup-2fa"
              className="btn btn-secondary"
              onClick={() => {
                playSound('click');
                setPracticeStep(1);
                setPinDigits(['', '', '', '', '', '']);
              }}
            >
              <RotateCcw size={16} /> Ulangi Setup
            </button>

            <button
              id="btn-proceed-to-drills"
              className="btn btn-primary anim-beacon"
              onClick={() => {
                playSound('beep');
                if (onProceedToDrills) {
                  onProceedToDrills();
                }
              }}
            >
              <span>Lanjut ke Tahap 3: Uji Berpikir Kritis 2FA</span>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
