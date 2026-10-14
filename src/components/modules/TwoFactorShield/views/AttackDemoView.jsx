import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, ShieldAlert, ShieldCheck, User, Smartphone, AlertTriangle, Lock, Unlock, Radio, BellRing, CheckCircle2, XCircle, Wifi, Battery, ShieldX, KeyRound, ArrowRight, Sparkles } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';

export function AttackDemoView({ onProceedToPractice }) {
  const [has2FAEnabled, setHas2FAEnabled] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackProgress, setAttackProgress] = useState(0);
  const [attackLogs, setAttackLogs] = useState([
    '[*] HydraBot v5.4.1 [Kali-Linux 6.8.0-kali3-amd64] initialized.',
    '[*] Target: @pelajar_kekinian (ID: 1049281)',
    '[*] Wordlist: /usr/share/wordlists/rockyou.txt (14.341.564 passwords)',
    '[*] Status Mode: Klik "Luncurkan Simulasi Serangan Hacker" di bawah.'
  ]);
  const [attackResult, setAttackResult] = useState(null); // 'hacked' | 'defended'
  const [showPushNotification, setShowPushNotification] = useState(false);
  const [isPhoneVibrating, setIsPhoneVibrating] = useState(false);
  const [rejectedPush, setRejectedPush] = useState(false);
  const terminalBottomRef = useRef(null);

  // Auto-scroll terminal
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollTop = terminalBottomRef.current.scrollHeight;
    }
  }, [attackLogs]);

  const addLog = (text, type = 'muted') => {
    setAttackLogs(prev => [...prev, { text, type }]);
  };

  const runAttack = (with2FA) => {
    if (isAttacking) return;
    setIsAttacking(true);
    setAttackResult(null);
    setShowPushNotification(false);
    setIsPhoneVibrating(false);
    setRejectedPush(false);
    setAttackProgress(0);

    playSound('click');
    setAttackLogs([
      { text: `[+] Memulai automated credential stuffing ke https://api.instagram.com/v1/auth`, type: 'cyan' },
      { text: `[*] Threads: 16 | Rate: 120 req/sec | Proxy: Tor Network`, type: 'muted' }
    ]);

    // Fast progress ticker with keyboard audio
    let p = 0;
    const progressTimer = setInterval(() => {
      p += 15;
      if (p <= 80) {
        setAttackProgress(p);
        playSound('keyboard');
      } else {
        clearInterval(progressTimer);
      }
    }, 200);

    // Step 1: Testing passwords
    setTimeout(() => {
      playSound('keyboard');
      addLog(`[>>] Testing pass #1: "123456" .......... [401 UNAUTHORIZED]`, 'red');
    }, 400);

    setTimeout(() => {
      playSound('keyboard');
      addLog(`[>>] Testing pass #2: "rahasia2024" .... [401 UNAUTHORIZED]`, 'red');
    }, 800);

    setTimeout(() => {
      playSound('beep');
      addLog(`[>>] Testing pass #3: "sayang123" ...... [200 OK] PASSWORD COCOK!`, 'green');
      setAttackProgress(90);
    }, 1300);

    // Step 2: Evaluation based on 2FA
    setTimeout(() => {
      setAttackProgress(100);
      if (!with2FA) {
        // WITHOUT 2FA: BREACH!
        setIsPhoneVibrating(true);
        addLog(`[!] STATUS 2FA AKUN: KOSONG / NONAKTIF!`, 'red');
        addLog(`[+] BYPASS SUKSES! Mengambil Sesi JWT: eyJhbGciOiJIUzI1NiIsIn...`, 'cyan');
        addLog(`[!] FORCE LOGOUT PERANGKAT ASLI: SUKSES`, 'red');
        addLog(`[+] AKUN 100% DIKUASAI PERETAS! DATA PRIBADI DILUCUTI!`, 'red');

        setTimeout(() => {
          playSound('siren', true);
          setAttackResult('hacked');
          setIsAttacking(false);
        }, 500);

      } else {
        // WITH 2FA: CHALLENGE!
        addLog(`[!] SERVER: Password cocok, TETAPI IP Rusia tidak dikenali!`, 'amber');
        addLog(`[!] PERISAI 2FA AKTIF: Mengirim Push Challenge ke HP Korban...`, 'cyan');
        setShowPushNotification(true);
        playSound('phone_ring');

        // Automatic block simulation
        setTimeout(() => {
          playSound('shield');
          setRejectedPush(true);
          addLog(`[-] PERINGATAN HP: Korban menekan "TOLAK & BLOKIR AKSES"!`, 'amber');
          addLog(`[-] Hacker mencoba brute-force OTP 6-Digit: 123456, 000000 ...`, 'muted');
          addLog(`[-] RATE-LIMIT EXCEEDED: IP 185.220.101.5 di-blacklist permanen!`, 'red');
          addLog(`[+] PERISAI 2FA SUKSES MENANGKAL PERETAS! AKUN TETAP AMAN!`, 'green');
          setAttackResult('defended');
          setIsAttacking(false);
          playSound('success');
        }, 2200);
      }
    }, 1700);
  };

  const handleManualReject = () => {
    playSound('shield');
    setRejectedPush(true);
    addLog(`[!] Tombol "TOLAK & BLOKIR" ditekan langsung oleh Anda! Sesi peretas diputus!`, 'green');
  };

  return (
    <div className="glass-panel scenario-card">
      {/* Top Banner & 2FA State Switch */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '14px', borderBottom: '3px solid var(--nb-border, #000000)', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Radio size={20} color="#ff4d4d" className="pulse-slow" />
            <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0, fontFamily: 'var(--font-heading)' }}>
              Simulasi Serangan Hacker: Mengapa Kata Sandi Saja Tidak Cukup?
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', margin: 0 }}>
            Uji apa yang terjadi ketika kata sandi korban bocor di internet pada akun <strong>Tanpa 2FA</strong> vs <strong>Dengan 2FA</strong>.
          </p>
        </div>

        {/* 2FA Toggle Switch Button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '8px 16px', borderRadius: 'var(--nb-radius-md, 8px)', border: '2.5px solid var(--nb-border, #000000)', boxShadow: '3px 3px 0 var(--nb-shadow-color, #000000)' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 800, color: '#0f172a' }}>Status Benteng Akun:</span>
          <button
            className="btn btn-sm"
            style={{
              padding: '8px 16px',
              fontSize: '0.84rem',
              fontWeight: 800,
              background: has2FAEnabled ? 'var(--nb-lime, #22c55e)' : 'var(--nb-coral, #ff4d4d)',
              color: '#ffffff',
              border: '2px solid #000000',
              borderRadius: '6px',
              boxShadow: '2px 2px 0 #000000',
              cursor: 'pointer',
              transition: 'transform 0.12s, box-shadow 0.12s'
            }}
            onClick={() => {
              if (isAttacking) return;
              playSound('click');
              setHas2FAEnabled(prev => !prev);
              setAttackResult(null);
              setShowPushNotification(false);
              setIsPhoneVibrating(false);
            }}
          >
            {has2FAEnabled ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={15} /> 2FA: AKTIF (TERPERISAI)
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Unlock size={15} /> 2FA: MATI (RENTAN BOBOL)
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Cyber Combat Arena: Hacker Terminal (Left) vs Real Smartphone (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '24px', alignItems: 'center' }}>
        
        {/* Sisi Kiri: Terminal Kali Linux Brute-Force Bot */}
        <div className="terminal-box">
          {/* Top Bar Window */}
          <div className="terminal-topbar">
            <div className="terminal-dots">
              <span className="terminal-dot dot-red" />
              <span className="terminal-dot dot-yellow" />
              <span className="terminal-dot dot-green" />
            </div>
            <span className="terminal-title">
              root@kali-attacker: ~/tools/hydrabot
            </span>
          </div>

          {/* Terminal Screen Body */}
          <div
            ref={terminalBottomRef}
            style={{
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              lineHeight: 1.6,
              height: '260px',
              overflowY: 'auto',
              background: 'radial-gradient(ellipse at top, #091324 0%, #020617 100%)',
              color: '#cbd5e1'
            }}
          >
            {attackLogs.map((log, index) => {
              let color = '#94a3b8';
              if (typeof log === 'string') {
                if (log.startsWith('[+]')) color = '#34d399';
                else if (log.startsWith('[!]')) color = '#f87171';
                else if (log.startsWith('[-]')) color = '#fbbf24';
                else if (log.startsWith('[*]')) color = '#38bdf8';
                return <div key={index} style={{ color, marginBottom: '4px' }}>{log}</div>;
              }

              if (log.type === 'green') color = '#34d399';
              else if (log.type === 'red') color = '#f87171';
              else if (log.type === 'cyan') color = '#38bdf8';
              else if (log.type === 'amber') color = '#fbbf24';

              return (
                <div key={index} style={{ color, marginBottom: '4px' }}>
                  {log.text}
                </div>
              );
            })}
            <span className="terminal-cursor" style={{ color: '#00f0ff', fontWeight: 800 }}>█</span>
          </div>

          {/* Terminal Status Footer */}
          <div style={{ padding: '10px 16px', background: '#0b1329', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>Progres Serangan:</span>
              <div style={{ width: '120px', height: '6px', background: '#1e293b', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${attackProgress}%`, background: attackResult === 'hacked' ? '#ef4444' : '#00f0ff', transition: 'width 0.2s' }} />
              </div>
              <span style={{ fontSize: '0.72rem', color: '#cbd5e1', fontFamily: 'var(--font-mono)' }}>{attackProgress}%</span>
            </div>

            <button
              className="btn btn-primary btn-sm"
              disabled={isAttacking}
              onClick={() => runAttack(has2FAEnabled)}
              style={{ padding: '6px 14px', fontSize: '0.78rem' }}
            >
              <Play size={14} />
              <span>{isAttacking ? 'Menyerang...' : 'Luncurkan Serangan'}</span>
            </button>
          </div>
        </div>

        {/* Sisi Kanan: 1:1 Realistic Physical Smartphone Frame (Victim's Phone) */}
        <div className="phone-device-wrap">
          <div className={`phone-device-card ${isPhoneVibrating ? 'phone-shake-active' : ''} ${attackResult === 'defended' ? 'shield-active-glow' : ''}`}>
            
            {/* Dynamic Island Notch */}
            <div className="dynamic-island">
              <span className="notch-camera" />
              <span className="notch-sensor" />
            </div>

            {/* Screen Inner */}
            <div className="phone-screen-container" style={{
              background: attackResult === 'hacked'
                ? 'radial-gradient(circle at center, #7f1d1d 0%, #450a0a 100%)'
                : attackResult === 'defended'
                ? 'radial-gradient(circle at center, #064e3b 0%, #022c22 100%)'
                : 'radial-gradient(circle at center, #0f172a 0%, #020617 100%)',
              transition: 'background 0.5s ease',
              padding: '16px'
            }}>
              
              {/* Phone Status Bar */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.7rem', color: '#cbd5e1', marginBottom: '14px' }}>
                <span style={{ fontWeight: 700 }}>09:41</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Wifi size={12} />
                  <span>5G</span>
                  <Battery size={14} />
                </div>
              </div>

              {/* Dynamic Notification Dropdown (Ketika 2FA Aktif) */}
              {showPushNotification && (
                <div className="banner-drop-in phone-push-card" style={{
                  marginBottom: '12px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', fontWeight: 800, color: '#0f172a' }}>
                      <BellRing size={14} color="#ff4d4d" />
                      <span>Apple ID Security</span>
                    </div>
                    <span style={{ fontSize: '0.68rem', color: '#64748b', fontWeight: 700 }}>Baru Saja</span>
                  </div>
                  <div style={{ fontSize: '0.74rem', color: '#334155', lineHeight: 1.35, marginBottom: '10px' }}>
                    Upaya masuk terdeteksi dari <strong>St. Petersburg, Rusia</strong> (IP: 185.220.101.5). Apakah ini Anda?
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      className="btn btn-sm"
                      style={{
                        flex: 1,
                        background: 'var(--nb-coral, #ff4d4d)',
                        color: '#ffffff',
                        border: '2px solid #000000',
                        borderRadius: '6px',
                        boxShadow: '2px 2px 0 #000000',
                        padding: '6px 8px',
                        fontSize: '0.72rem',
                        fontWeight: 800,
                        cursor: 'pointer'
                      }}
                      onClick={handleManualReject}
                    >
                      <XCircle size={12} /> TOLAK & BLOKIR
                    </button>
                    <button
                      className="btn btn-sm"
                      style={{
                        background: '#f1f5f9',
                        color: '#94a3b8',
                        border: '2px solid #cbd5e1',
                        borderRadius: '6px',
                        padding: '6px 8px',
                        fontSize: '0.72rem',
                        fontWeight: 700
                      }}
                      disabled
                    >
                      Izinkan
                    </button>
                  </div>
                </div>
              )}

              {/* Center Lockscreen Graphic */}
              <div style={{ textAlign: 'center', margin: 'auto 0' }}>
                {attackResult === 'hacked' ? (
                  <div style={{ animation: 'phone-shake 0.3s' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', boxShadow: '0 0 20px #ef4444' }}>
                      <ShieldX size={32} color="#ffffff" />
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#fecaca', marginBottom: '4px' }}>
                      PERANGKAT DI-LOGOUT PAKSA!
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#fca5a5', lineHeight: 1.4, padding: '0 8px' }}>
                      Hacker berhasil membajak token login akun <strong>@pelajar_kekinian</strong> via password yang bocor!
                    </div>
                  </div>
                ) : attackResult === 'defended' ? (
                  <div>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#16a34a', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', boxShadow: '0 0 24px #22c55e' }}>
                      <ShieldCheck size={34} color="#ffffff" />
                    </div>
                    <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#bbf7d0', marginBottom: '4px' }}>
                      PERISAI 2FA BERHASIL!
                    </div>
                    <div style={{ fontSize: '0.74rem', color: '#86efac', lineHeight: 1.4, padding: '0 8px' }}>
                      Serangan ditangkal total! Peretas tidak memiliki akses fisik ke ponsel Anda untuk melihat kode OTP.
                    </div>
                  </div>
                ) : (
                  <div>
                    <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: '#1e293b', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px' }}>
                      <Smartphone size={28} color="#94a3b8" />
                    </div>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: '#f8fafc', marginBottom: '2px' }}>
                      Smartphone Siswa (Aman)
                    </div>
                    <div style={{ fontSize: '0.72rem', color: '#64748b' }}>
                      Menunggu telemetri autentikasi...
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Phone Footer */}
              <div style={{ textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                <span className={`badge ${has2FAEnabled ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.7rem', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                  {has2FAEnabled ? (
                    <>
                      <ShieldCheck size={13} />
                      <span>Terlindungi Lapis 2FA</span>
                    </>
                  ) : (
                    <>
                      <AlertTriangle size={13} />
                      <span>Hanya Kata Sandi</span>
                    </>
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Educational Footer Banner */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '22px', borderTop: '3px solid var(--nb-border, #000000)', paddingTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: 1.4, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <Sparkles size={16} />
          <span><strong>Pelajaran Penting:</strong> Kata sandi Anda bisa saja bocor dari database luar. Namun dengan <strong>2FA Aktif</strong>, akun Anda tetap 100% kebal karena peretas tidak memegang ponsel Anda!</span>
        </div>

        <button className="btn btn-secondary" onClick={onProceedToPractice} style={{ padding: '8px 18px' }}>
          <span>Lanjut ke Praktikkan Aktivasi 2FA</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
