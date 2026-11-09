import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Play, 
  ShieldAlert, 
  ShieldCheck, 
  Smartphone, 
  AlertTriangle, 
  Lock, 
  Unlock, 
  Radio, 
  BellRing, 
  CheckCircle2, 
  XCircle, 
  Wifi, 
  Battery, 
  ShieldX, 
  KeyRound, 
  ArrowRight, 
  Sparkles,
  RotateCcw,
  Info,
  Server,
  Zap,
  Layers,
  ChevronDown,
  ChevronUp,
  Cpu
} from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';

const ATTACK_VECTORS = [
  {
    id: 'credential_stuffing',
    title: '1. Credential Stuffing (Kamus Sandi)',
    tag: 'RockYou.txt',
    desc: 'Peretas menguji ribuan kata sandi bocor secara otomatis hingga menemukan sandi yang cocok.',
    hackerTool: 'HydraBot v5.4.1 [Kali-Linux 6.8.0]'
  },
  {
    id: 'mfa_fatigue',
    title: '2. Push Bombing (MFA Fatigue)',
    tag: 'Eksploitasi Mental',
    desc: 'Peretas membombardir notifikasi login tengah malam agar korban terganggu dan memencet Izinkan.',
    hackerTool: 'PushBomber v2.1 [Uber Exploit Vector]'
  },
  {
    id: 'reverse_proxy',
    title: '3. Reverse-Proxy Phishing (Evilginx)',
    tag: 'MitM Hijack',
    desc: 'Peretas menjebak korban melalui URL tiruan untuk mencuri session cookie secara langsung.',
    hackerTool: 'Evilginx 3.3.0 [Session Capture]'
  }
];

export function AttackDemoView({ onProceedToPractice }) {
  const [has2FAEnabled, setHas2FAEnabled] = useState(false);
  const [selectedVector, setSelectedVector] = useState('credential_stuffing');
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackProgress, setAttackProgress] = useState(0);
  const [attackResult, setAttackResult] = useState(null); // 'hacked' | 'defended' | 'fatigue_breached' | 'proxy_analyzed'
  const [showPushNotification, setShowPushNotification] = useState(false);
  const [isPhoneVibrating, setIsPhoneVibrating] = useState(false);
  const [decisionPending, setDecisionPending] = useState(false);
  const [showForensicDetails, setShowForensicDetails] = useState(false);

  const [attackLogs, setAttackLogs] = useState([
    { text: '[*] Kali-Linux 6.8.0-kali3-amd64 [Terminal Root] initialized.', type: 'muted' },
    { text: '[*] Target: @pelajar_kekinian (ID: 1049281)', type: 'muted' },
    { text: '[*] Status Sistem: Siaga. Pilih Vektor Serangan & Status 2FA, lalu klik "Luncurkan Simulasi Serangan".', type: 'cyan' }
  ]);

  const terminalBottomRef = useRef(null);
  const activeTimersRef = useRef([]);
  const decisionPendingRef = useRef(false);

  // Sync ref with state
  useEffect(() => {
    decisionPendingRef.current = decisionPending;
  }, [decisionPending]);

  // Clear timers safely on unmount
  useEffect(() => {
    return () => {
      activeTimersRef.current.forEach(timer => clearTimeout(timer));
      activeTimersRef.current = [];
    };
  }, []);

  // Auto-scroll terminal on new log
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollTop = terminalBottomRef.current.scrollHeight;
    }
  }, [attackLogs]);

  const addLog = (text, type = 'muted') => {
    setAttackLogs(prev => [...prev, { text, type }]);
  };

  const registerTimer = (fn, delay) => {
    const id = setTimeout(fn, delay);
    activeTimersRef.current.push(id);
    return id;
  };

  // Run cyber attack simulation based on vector and 2FA state
  const runAttack = () => {
    if (isAttacking) return;
    setIsAttacking(true);
    setAttackResult(null);
    setShowPushNotification(false);
    setIsPhoneVibrating(false);
    setDecisionPending(false);
    setAttackProgress(0);

    playSound('click');

    const vectorObj = ATTACK_VECTORS.find(v => v.id === selectedVector);

    // Initial logs
    setAttackLogs([
      { text: `[+] Menginisiasi modul: ${vectorObj.hackerTool}`, type: 'cyan' },
      { text: `[*] Vektor: ${vectorObj.title} -> https://api.instagram.com/v1/auth`, type: 'muted' },
      { text: `[*] Routing via Tor Exit Node [IP: 185.220.101.5 | St. Petersburg, RU]`, type: 'muted' }
    ]);

    // Progress bar ticker
    let p = 0;
    const progressInterval = setInterval(() => {
      p += 15;
      if (p <= 80) {
        setAttackProgress(p);
        playSound('keyboard');
      } else {
        clearInterval(progressInterval);
      }
    }, 220);

    if (selectedVector === 'credential_stuffing') {
      // SCENARIO 1: CREDENTIAL STUFFING
      registerTimer(() => {
        playSound('keyboard');
        addLog(`[>>] Testing hash #1: "admin2024" ........ [401 UNAUTHORIZED]`, 'red');
      }, 400);

      registerTimer(() => {
        playSound('keyboard');
        addLog(`[>>] Testing hash #2: "rahasia123" ........ [401 UNAUTHORIZED]`, 'red');
      }, 800);

      registerTimer(() => {
        playSound('beep');
        addLog(`[>>] Testing hash #3: "sayang123" ........ [200 OK] PASSWORD UTAMA COCOK!`, 'green');
        setAttackProgress(90);
      }, 1200);

      registerTimer(() => {
        setAttackProgress(100);

        if (!has2FAEnabled) {
          // Without 2FA: Direct breach!
          setIsPhoneVibrating(true);
          addLog(`[!] EVALUASI SERVER: Status 2FA akun = TIDAK AKTIF (Hanya 1 Lapis)!`, 'red');
          addLog(`[+] BYPASS OTENTIKASI SUKSES! Token Sesi JWT Diterbitkan!`, 'cyan');
          addLog(`[!] FORCE DISCONNECT SESI SMARTPHONE ASLI...`, 'red');
          addLog(`[!] AKUN BERHASIL DIBAJAK 100%! DATA PRIBADI KORBAN BOCOR!`, 'red');

          registerTimer(() => {
            playSound('siren', true);
            setAttackResult('hacked');
            setIsAttacking(false);
          }, 500);
        } else {
          // With 2FA: Push verification alert triggered!
          addLog(`[!] EVALUASI SERVER: Password cocok, namun terdeteksi Anomali Geografis!`, 'amber');
          addLog(`[!] PERISAI 2FA AKTIF: Mengirimkan Push Challenge ke HP Korban...`, 'cyan');
          addLog(`[?] MENUNGGU KONFIRMASI FISIK DARI SMARTPHONE KORBAN...`, 'amber');
          setShowPushNotification(true);
          setIsPhoneVibrating(true);
          setDecisionPending(true);
          playSound('phone_ring');

          // Auto-timeout if student takes no action
          registerTimer(() => {
            if (decisionPendingRef.current) {
              setDecisionPending(false);
              setIsPhoneVibrating(false);
              addLog(`[-] WAKTU RESPON HABIS: Permintaan ditolak otomatis demi keamanan.`, 'muted');
              addLog(`[+] PERISAI 2FA BERHASIL MELINDUNGI AKUN DARI PENYUSUP!`, 'green');
              setAttackResult('defended');
              setIsAttacking(false);
            }
          }, 20000);
        }
      }, 1700);

    } else if (selectedVector === 'mfa_fatigue') {
      // SCENARIO 2: MFA FATIGUE / PUSH BOMBING
      registerTimer(() => {
        addLog(`[*] Peretas telah memegang password korban dari data breach sebelumnya.`, 'amber');
        addLog(`[!] Menjalankan script Push-Flood: Mengirim 10 notifikasi login berturut-turut...`, 'red');
      }, 500);

      registerTimer(() => {
        playSound('phone_ring');
        setIsPhoneVibrating(true);
        setShowPushNotification(true);
        setDecisionPending(true);
        setAttackProgress(100);
        addLog(`[!] PUSH BURST SENT: Smartphone korban bergetar hebat pukul 01:30 WIB!`, 'red');
        addLog(`[?] UJI NALAR: Apakah korban tergesa-gesa menekan "Izinkan" atau menolaknya?`, 'amber');
      }, 1200);

    } else {
      // SCENARIO 3: REVERSE PROXY PHISHING (Evilginx)
      registerTimer(() => {
        addLog(`[*] Mengaktifkan Evilginx Proxy Listener di port 443...`, 'cyan');
        addLog(`[*] Memancing korban masuk ke link tiruan: https://instagram.login-verify.me`, 'amber');
      }, 500);

      registerTimer(() => {
        setAttackProgress(90);
        addLog(`[>>] Korban memasukkan Password dan kode 6-digit OTP!`, 'amber');
        addLog(`[!] Proxy meneruskan kredensial ke server asli dan MENCURI SESSION COOKIE!`, 'red');
        addLog(`[!] Catatan Kritis: 2FA kode OTP biasa masih bisa dipancing Evilginx!`, 'red');
        addLog(`[+] SOLUSI PERTAHANAN MASA DEPAN: Gunakan Passkeys (FIDO2 WebAuthn)!`, 'green');
        setAttackProgress(100);
        setAttackResult('proxy_analyzed');
        setIsAttacking(false);
        playSound('complete');
      }, 1600);
    }
  };

  // Student takes active defense action
  const handleUserReject = () => {
    if (!decisionPendingRef.current) return;
    setDecisionPending(false);
    setIsPhoneVibrating(false);
    playSound('shield');

    addLog(`[!] TINDAKAN USER: Tombol "TOLAK & BLOKIR AKSES" ditekan di HP!`, 'green');
    addLog(`[-] Hacker mencoba brute-force kode 6-Digit: 994821, 102948 ...`, 'muted');
    addLog(`[-] RATE-LIMIT EXCEEDED: Akses dari IP 185.220.101.5 diblokir permanen!`, 'red');
    addLog(`[+] PERISAI 2FA SUKSES MENANGKAL PENYUSUP! AKUN TETAP 100% AMAN!`, 'green');

    registerTimer(() => {
      playSound('success');
      setAttackResult('defended');
      setIsAttacking(false);
    }, 400);
  };

  // Student tests mistake to observe consequences
  const handleUserAcceptError = () => {
    if (!decisionPendingRef.current) return;
    setDecisionPending(false);
    setIsPhoneVibrating(false);
    playSound('error');

    addLog(`[!] FATAL: KORBAN MENEKAN "IZINKAN" KARENA LELAH DITEROR NOTIFIKASI!`, 'red');
    addLog(`[!] INILAH KEBERHASILAN DARI SERANGAN MFA FATIGUE (INSIDEN UBER 2022)!`, 'red');
    addLog(`[+] PERETAS MENDAPATKAN TOKEN OTORISASI DARI KORBAN! AKUN DIBAJAK!`, 'red');

    registerTimer(() => {
      playSound('siren', true);
      setAttackResult('fatigue_breached');
      setIsAttacking(false);
    }, 400);
  };

  return (
    <div className="glass-panel scenario-card anim-pop-in">
      {/* Top Banner & 2FA State Switch */}
      <div className="twofa-top-control-bar">
        <div>
          <div className="twofa-hero-tag">
            <Radio size={16} color="#ff4d4d" className="pulse-slow" />
            <span>TAHAP 1: PEMBUKTIAN SERANGAN KATA SANDI VS PERISAI 2FA</span>
          </div>
          <h2 className="twofa-title-text">
            Simulasi Serangan Hacker: Mengapa Kata Sandi Saja Tidak Cukup?
          </h2>
          <p className="twofa-desc-text">
            Eksplorasi secara teknis apa yang terjadi saat kata sandi korban bocor di internet pada akun <strong>Tanpa 2FA</strong> vs <strong>Dengan 2FA Aktif</strong>.
          </p>
        </div>

        {/* 2FA Toggle Switch Button */}
        <div className="twofa-state-switch-card">
          <span className="state-switch-label">Status Benteng 2FA Akun:</span>
          <button
            id="btn-toggle-2fa-status"
            className={`btn btn-sm ${has2FAEnabled ? 'btn-green' : 'btn-primary'}`}
            disabled={isAttacking}
            onClick={() => {
              playSound('click');
              setHas2FAEnabled(prev => !prev);
              setAttackResult(null);
              setShowPushNotification(false);
              setIsPhoneVibrating(false);
              setDecisionPending(false);
            }}
          >
            {has2FAEnabled ? (
              <span className="btn-inner-row">
                <Lock size={15} /> 2FA: AKTIF (TERPERISAI)
              </span>
            ) : (
              <span className="btn-inner-row">
                <Unlock size={15} /> 2FA: NONAKTIF (RENTAN BOBOL)
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Attack Vector Selector Tabs */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#475569', textTransform: 'uppercase', marginBottom: '8px' }}>
          Pilih Vektor Serangan Siber untuk Diuji:
        </div>
        <div className="attack-vector-selector">
          {ATTACK_VECTORS.map(vec => (
            <button
              key={vec.id}
              className={`vector-btn ${selectedVector === vec.id ? 'active' : ''}`}
              disabled={isAttacking}
              onClick={() => {
                playSound('click');
                setSelectedVector(vec.id);
                setAttackResult(null);
                setShowPushNotification(false);
                setIsPhoneVibrating(false);
                setDecisionPending(false);
              }}
            >
              <Cpu size={14} />
              <span>{vec.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cyber Combat Arena: Hacker Terminal (Left) vs Real Smartphone (Right) */}
      <div className="attack-arena">
        
        {/* Sisi Kiri: Terminal Kali Linux Brute-Force Bot */}
        <div className="terminal-box">
          <div className="terminal-topbar">
            <div className="terminal-dots">
              <span className="terminal-dot dot-red" />
              <span className="terminal-dot dot-yellow" />
              <span className="terminal-dot dot-green" />
            </div>
            <span className="terminal-title">
              root@kali-attacker: ~/tools/{selectedVector}
            </span>
          </div>

          <div
            ref={terminalBottomRef}
            className="terminal-body"
          >
            {attackLogs.map((log, index) => {
              let color = '#94a3b8';
              if (log.type === 'green') color = '#34d399';
              else if (log.type === 'red') color = '#f87171';
              else if (log.type === 'cyan') color = '#38bdf8';
              else if (log.type === 'amber') color = '#fbbf24';

              return (
                <div key={index} className="log-line" style={{ color }}>
                  {log.text}
                </div>
              );
            })}
            <span className="terminal-cursor">█</span>
          </div>

          {/* Terminal Status Footer */}
          <div className="terminal-footer-controls">
            <div className="terminal-progress-wrap">
              <span className="terminal-prog-label">Progress:</span>
              <div className="terminal-prog-track">
                <div 
                  className="terminal-prog-fill" 
                  style={{ 
                    width: `${attackProgress}%`, 
                    background: attackResult === 'hacked' || attackResult === 'fatigue_breached' ? '#ef4444' : '#00f0ff' 
                  }} 
                />
              </div>
              <span className="terminal-prog-num">{attackProgress}%</span>
            </div>

            <button
              id="btn-launch-attack-sim"
              className="btn btn-primary btn-sm launch-attack-btn"
              disabled={isAttacking}
              onClick={runAttack}
            >
              <Play size={14} />
              <span>{isAttacking ? 'Menjalankan Serangan...' : 'Luncurkan Simulasi Serangan'}</span>
            </button>
          </div>
        </div>

        {/* Sisi Kanan: Physical Smartphone Frame (Victim's Phone) */}
        <div className="phone-device-wrap">
          <div className={`phone-device-card ${isPhoneVibrating ? 'phone-shake-active' : ''} ${attackResult === 'defended' ? 'shield-active-glow' : ''}`}>
            
            {/* Dynamic Island Notch */}
            <div className="dynamic-island">
              <span className="notch-camera" />
              <span className="notch-sensor" />
            </div>

            {/* Screen Inner */}
            <div className="phone-screen-container" style={{
              background: attackResult === 'hacked' || attackResult === 'fatigue_breached'
                ? 'radial-gradient(circle at center, #7f1d1d 0%, #450a0a 100%)'
                : attackResult === 'defended'
                ? 'radial-gradient(circle at center, #064e3b 0%, #022c22 100%)'
                : 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
              transition: 'background 0.5s ease',
              padding: '16px'
            }}>
              
              {/* Phone Status Bar */}
              <div className="phone-status-bar">
                <span style={{ fontWeight: 700 }}>09:41</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Wifi size={12} />
                  <span>5G</span>
                  <Battery size={14} />
                </div>
              </div>

              {/* Dynamic Notification Dropdown (Ketika 2FA Aktif) */}
              {showPushNotification && (
                <div className="banner-drop-in phone-push-card">
                  <div className="push-card-top">
                    <div className="push-brand">
                      <BellRing size={15} color="#dc2626" />
                      <span>Security Push Alert</span>
                    </div>
                    <span className="push-time">Baru Saja</span>
                  </div>
                  <div className="push-body-text">
                    Upaya masuk terdeteksi dari <strong>St. Petersburg, Rusia</strong> (IP: 185.220.101.5) dengan kata sandi Anda. Apakah ini Anda?
                  </div>

                  {decisionPending && (
                    <div className="push-callout-instruction">
                      <ShieldAlert size={14} color="#b45309" style={{ verticalAlign: 'middle', marginRight: 6 }} />
                      <strong>Ambil Tindakan Keamanan:</strong>
                    </div>
                  )}

                  <div className="push-action-row">
                    <button
                      id="btn-phone-reject-access"
                      className="btn btn-sm btn-coral-red push-btn-reject"
                      disabled={!decisionPending}
                      onClick={handleUserReject}
                      title="Tolak dan putus koneksi peretas seketika"
                    >
                      <XCircle size={14} />
                      <span>TOLAK & BLOKIR</span>
                    </button>

                    <button
                      id="btn-phone-accept-mistake"
                      className="btn btn-sm btn-ghost push-btn-mistake"
                      disabled={!decisionPending}
                      onClick={handleUserAcceptError}
                      title="Uji apa yang terjadi jika tertipu menekan tombol ini"
                    >
                      <span>Uji: "Izinkan"</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Center Lockscreen Graphic */}
              <div className="phone-center-state">
                {attackResult === 'hacked' ? (
                  <div className="anim-pop-in">
                    <div className="state-icon-circle bg-red-alert">
                      <ShieldX size={34} color="#ffffff" />
                    </div>
                    <div className="state-alert-title title-red">
                      PERANGKAT DI-LOGOUT PAKSA!
                    </div>
                    <div className="state-alert-desc desc-red">
                      Karena akun <strong>Tanpa 2FA</strong>, hacker langsung merebut kendali penuh hanya dengan kata sandi yang bocor!
                    </div>
                  </div>
                ) : attackResult === 'fatigue_breached' ? (
                  <div className="anim-pop-in">
                    <div className="state-icon-circle bg-amber-alert">
                      <AlertTriangle size={34} color="#ffffff" />
                    </div>
                    <div className="state-alert-title title-amber">
                      JEBOL KARENA MFA FATIGUE!
                    </div>
                    <div className="state-alert-desc desc-amber">
                      Kamu menekan "Izinkan" saat peretas membombardir notifikasi. Inilah jebakan psikologis kelelahan mental!
                    </div>
                  </div>
                ) : attackResult === 'defended' ? (
                  <div className="anim-pop-in">
                    <div className="state-icon-circle bg-green-safe">
                      <ShieldCheck size={36} color="#ffffff" />
                    </div>
                    <div className="state-alert-title title-green">
                      PERISAI 2FA BERHASIL!
                    </div>
                    <div className="state-alert-desc desc-green">
                      Serangan ditangkal total! Peretas tidak memiliki akses fisik ke smartphone Anda untuk melewati verifikasi lapis kedua.
                    </div>
                  </div>
                ) : attackResult === 'proxy_analyzed' ? (
                  <div className="anim-pop-in">
                    <div className="state-icon-circle bg-amber-alert">
                      <Layers size={34} color="#ffffff" />
                    </div>
                    <div className="state-alert-title title-amber">
                      REVERSE-PROXY ANALYSIS
                    </div>
                    <div className="state-alert-desc desc-amber">
                      Kode OTP dapat dicuri reverse proxy. Solusi masa depan: <strong>Passkeys (FIDO2)</strong> yang kebal phishing!
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="state-icon-circle bg-slate-idle">
                      <Smartphone size={30} color="#94a3b8" />
                    </div>
                    <div className="idle-phone-title">
                      Smartphone Siswa (Siaga)
                    </div>
                    <div className="idle-phone-desc">
                      {isAttacking ? 'Menunggu respon jaringan otentikasi...' : 'Klik "Luncurkan Simulasi Serangan" untuk menguji.'}
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Phone Footer */}
              <div className="phone-bottom-badge-row">
                <span className={`badge ${has2FAEnabled ? 'badge-green' : 'badge-red'}`}>
                  {has2FAEnabled ? (
                    <>
                      <ShieldCheck size={13} />
                      <span>Terlindungi Lapis 2FA</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={13} />
                      <span>Hanya Kata Sandi (Rentan)</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Forensic Dossier Inspector (Educational Depth) */}
      <div style={{ marginTop: '14px' }}>
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => {
            playSound('click');
            setShowForensicDetails(prev => !prev);
          }}
          style={{ fontSize: '0.76rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Server size={14} color="#00f0ff" />
          <span>{showForensicDetails ? 'Tutup Inspektur Forensik' : 'Buka Inspektur Forensik Jaringan & Log Siber'}</span>
          {showForensicDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showForensicDetails && (
          <div className="forensic-inspector-card anim-pop-in">
            <div style={{ fontWeight: 800, color: '#00f0ff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Terminal size={14} />
              <span>DATA FORENSIK JARINGAN & ANOMALI SIBER:</span>
            </div>
            <div className="forensic-grid">
              <div className="forensic-pill">
                <span className="forensic-pill-label">Alamat IP Penyerang:</span>
                <span className="forensic-pill-val">185.220.101.5 (Tor Relay)</span>
              </div>
              <div className="forensic-pill">
                <span className="forensic-pill-label">Lokasi Geografis:</span>
                <span className="forensic-pill-val">St. Petersburg, Rusia</span>
              </div>
              <div className="forensic-pill">
                <span className="forensic-pill-label">Anomali Terdeteksi:</span>
                <span className="forensic-pill-val" style={{ color: '#f87171' }}>Impossible Travel (11.000 km / 4 min)</span>
              </div>
              <div className="forensic-pill">
                <span className="forensic-pill-label">Protokol Pertahanan:</span>
                <span className="forensic-pill-val" style={{ color: '#4ade80' }}>Adaptive Push MFA Triggered</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Educational Footer Banner */}
      <div className="twofa-demo-footer-bar">
        <div className="twofa-demo-insight-text">
          <Sparkles size={18} color="#facc15" />
          <span><strong>Kesimpulan Penting:</strong> Kata sandi Anda bisa saja bocor dari insiden data breach di luar sana. Namun dengan <strong>2FA Aktif</strong>, peretas tetap tidak bisa masuk karena terhalang oleh verifikasi di smartphone fisik Anda!</span>
        </div>

        <button 
          id="btn-proceed-to-practice"
          className={`btn ${attackResult === 'defended' ? 'btn-green anim-beacon' : 'btn-primary'}`} 
          onClick={onProceedToPractice}
        >
          <span>Lanjut ke Tahap 2: Praktik Setup 2FA 1:1</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
