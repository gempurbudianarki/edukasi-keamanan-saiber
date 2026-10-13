import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, ShieldAlert, ShieldCheck, User, Smartphone, AlertTriangle, Lock, Unlock, Radio, BellRing, CheckCircle2, XCircle } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';

export function AttackDemoView({ onProceedToPractice }) {
  const [has2FAEnabled, setHas2FAEnabled] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackStep, setAttackStep] = useState('idle'); // 'idle' | 'scanning' | 'testing' | 'matched' | 'challenge' | 'done'
  const [attackLogs, setAttackLogs] = useState([
    '[*] HydraBot v5.4.1 initialized. Ready for credential stuffing attack.',
    '[*] Target: @pelajar_kekinian (Email: akun_siswa@sekolah.sch.id)',
    '[*] Database kebocoran data: 14.341.564 akun terkompromi.',
    '[*] Pilih status 2FA di atas lalu klik "Luncurkan Simulasi Serangan Hacker"!'
  ]);
  const [attackResult, setAttackResult] = useState(null); // 'hacked' | 'defended'
  const [showPushPrompt, setShowPushPrompt] = useState(false);
  const [pushStatus, setPushStatus] = useState('waiting'); // 'waiting' | 'rejected' | 'allowed'
  const terminalBottomRef = useRef(null);

  // Auto-scroll terminal logs to bottom
  useEffect(() => {
    if (terminalBottomRef.current) {
      terminalBottomRef.current.scrollTop = terminalBottomRef.current.scrollHeight;
    }
  }, [attackLogs]);

  const addLog = (msg) => {
    setAttackLogs(prev => [...prev, msg]);
  };

  const runAttack = (with2FA) => {
    if (isAttacking) return;
    setIsAttacking(true);
    setAttackResult(null);
    setShowPushPrompt(false);
    setPushStatus('waiting');
    playSound('beep');

    setAttackLogs([
      `[>] Memulai automated brute-force ke endpoint: POST /api/v2/auth/login`,
      `[>] Menggunakan dictionary attack (RockYou wordlist)...`
    ]);

    // Step 1: Testing passwords
    setTimeout(() => {
      playSound('beep');
      addLog(`[..] Menguji kredensial #1: "admin123" ... [401 Unauthorized]`);
    }, 400);

    setTimeout(() => {
      playSound('beep');
      addLog(`[..] Menguji kredensial #2: "rahasia2024" ... [401 Unauthorized]`);
    }, 800);

    setTimeout(() => {
      playSound('click');
      addLog(`[..] Menguji kredensial #3: "sayang123" ... [200 OK] PASSWORD COCOK!`);
    }, 1200);

    // Step 2: Evaluation based on 2FA
    setTimeout(() => {
      if (!with2FA) {
        // NO 2FA -> BREACH!
        playSound('glitch');
        addLog(`[!] MEMERIKSA PERISAI 2FA: KOSONG / NONAKTIF!`);
        addLog(`[+] BYPASS SUKSES! Hak akses akun didapatkan tanpa hambatan.`);
        addLog(`[+] Mengambil Sesi JWT Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`);
        addLog(`[!] FORCE LOGOUT PERANGKAT KORBAN SELESAI. AKUN RESMI DIBOBOL!`);

        setTimeout(() => {
          setAttackResult('hacked');
          setIsAttacking(false);
          playSound('siren', true);
        }, 500);
      } else {
        // WITH 2FA -> CHALLENGE TRIGGERED!
        playSound('beep');
        addLog(`[!] SISTEM KEAMANAN SERVER: PASSWORD BENAR, NAMUN PERANGKAT TIDAK DIKENAL!`);
        addLog(`[!] VERIFIKASI DUA LANGKAH (2FA) AKTIF! Server menerbitkan tantangan OTP 6-Digit...`);
        addLog(`[~] Menunggu konfirmasi OTP atau Mobile Push Challenge dari HP korban...`);
        setShowPushPrompt(true);

        // Simulate mobile challenge
        setTimeout(() => {
          playSound('scan');
          addLog(`[-] Hacker tidak memegang HP fisik korban untuk melihat kode 6-digit!`);
          addLog(`[-] Hacker mencoba brute-force OTP: "000000", "123456", "999999" ...`);
          addLog(`[-] RATE-LIMIT TRIGGERED: 3x gagal input OTP. IP Hacker diblokir permanen (403 Forbidden)!`);
          addLog(`[+] KONEKSI DITOLAK TOTAL! PERISAI 2FA BERHASIL MELINDUNGI AKUN!`);
          setAttackResult('defended');
          setPushStatus('rejected');
          setIsAttacking(false);
          playSound('success');
        }, 2200);
      }
    }, 1600);
  };

  const handleManualRejectPush = () => {
    playSound('click');
    setPushStatus('rejected');
    addLog(`[!] Korban menekan "TOLAK & BLOKIR" pada notifikasi HP! Akses hacker dibatalkan seketika.`);
  };

  return (
    <div className="glass-panel scenario-card">
      {/* Top Header & 2FA State Switch */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid #fee2e2', paddingBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Radio size={18} color="#dc2626" className="pulse-slow" />
            <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0 }}>
              Simulasi Serangan Hacker: Mengapa Kata Sandi Saja Tidak Cukup?
            </h2>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem', margin: 0 }}>
            Saksikan bagaimana bot hacker langsung menembus akun jika hanya mengandalkan kata sandi, dan bagaimana perisai 2FA menggagalkan serangan 100%!
          </p>
        </div>

        {/* Toggle 2FA switch */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '8px 16px', borderRadius: '12px', border: '1.5px solid #e2e8f0' }}>
          <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#334155' }}>Mode Pertahanan:</span>
          <button
            className={`btn btn-sm ${has2FAEnabled ? 'btn-primary' : 'btn-secondary'}`}
            style={{
              padding: '6px 14px',
              fontSize: '0.82rem',
              background: has2FAEnabled ? '#16a34a' : '#ef4444',
              color: '#ffffff',
              border: 'none',
              boxShadow: has2FAEnabled ? '0 0 12px rgba(22, 163, 74, 0.4)' : '0 0 12px rgba(239, 68, 68, 0.4)'
            }}
            onClick={() => {
              if (isAttacking) return;
              playSound('click');
              setHas2FAEnabled(prev => !prev);
              setAttackResult(null);
              setShowPushPrompt(false);
            }}
          >
            {has2FAEnabled ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Lock size={14} /> 2FA AKTIF (TERPERISAI)
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Unlock size={14} /> 2FA MATI (RENTAN BOBOL)
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Main Arena: Terminal vs Victim Account */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', alignItems: 'start' }}>
        
        {/* Terminal Kali Linux / Hydra Brute-Force Bot */}
        <div style={{ background: '#020617', border: '2px solid #1e293b', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)' }}>
          {/* Terminal Window Header */}
          <div style={{ background: '#0f172a', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '6px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ef4444', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#f59e0b', display: 'inline-block' }} />
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
              </div>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: '#38bdf8', fontWeight: 600, marginLeft: '6px' }}>
                hydrabot@kali-linux: ~# attack_engine --target akun_siswa
              </span>
            </div>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: isAttacking ? '#22c55e' : '#64748b' }}>
              {isAttacking ? '● EXECUTING...' : '○ IDLE'}
            </span>
          </div>

          {/* Terminal Logs View */}
          <div
            ref={terminalBottomRef}
            style={{
              padding: '16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.78rem',
              lineHeight: 1.6,
              height: '240px',
              overflowY: 'auto',
              background: 'radial-gradient(ellipse at top, #091324 0%, #020617 100%)',
              color: '#cbd5e1'
            }}
          >
            {attackLogs.map((log, index) => {
              let color = '#94a3b8';
              if (log.startsWith('[+]')) color = '#4ade80'; // Success green
              else if (log.startsWith('[!]')) color = '#f87171'; // Warning red
              else if (log.startsWith('[-]')) color = '#fbbf24'; // Notice amber
              else if (log.startsWith('[>]')) color = '#38bdf8'; // Process cyan
              return (
                <div key={index} style={{ color, marginBottom: '4px', wordBreak: 'break-all' }}>
                  {log}
                </div>
              );
            })}
          </div>

          {/* Terminal Footer action */}
          <div style={{ padding: '12px 16px', background: '#0b1329', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'var(--font-mono)' }}>
              Attack Speed: {isAttacking ? '15,400 wps' : '0 wps'} | Wordlist: RockYou.txt
            </span>
            <span style={{ fontSize: '0.75rem', color: '#94a3b8' }}>
              Port: 443 (HTTPS)
            </span>
          </div>
        </div>

        {/* Akun Siswa Korban & Telemetri Real-time */}
        <div style={{ background: '#ffffff', border: `2px solid ${attackResult === 'hacked' ? '#ef4444' : attackResult === 'defended' ? '#16a34a' : '#fee2e2'}`, borderRadius: '14px', padding: '20px', boxShadow: '0 6px 18px rgba(0, 0, 0, 0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            {/* Header Profil Akun */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', borderBottom: '1px solid #f1f5f9', paddingBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: attackResult === 'hacked' ? '#ef4444' : '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', boxShadow: '0 2px 8px rgba(220, 38, 38, 0.2)' }}>
                  <User size={24} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>@pelajar_kekinian</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748b' }}>Budi Pratama • Siswa SMA</div>
                </div>
              </div>

              <div>
                <span className={`badge ${has2FAEnabled ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.78rem' }}>
                  {has2FAEnabled ? 'Perisai 2FA Aktif' : '2FA Nonaktif'}
                </span>
              </div>
            </div>

            {/* Info Kredensial Bocor */}
            <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px', fontSize: '0.82rem', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#64748b' }}>Email Akun:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: '#0f172a' }}>akun_siswa@sekolah.sch.id</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ color: '#64748b' }}>Kata Sandi Bocor:</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#dc2626' }}>sayang123 (Terkompromi)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#64748b' }}>Status Proteksi Sesi:</span>
                <span style={{ fontWeight: 700, color: has2FAEnabled ? '#16a34a' : '#ef4444' }}>
                  {has2FAEnabled ? 'Wajib OTP 6-Digit' : 'Hanya Password (Mudah Bobol)'}
                </span>
              </div>
            </div>

            {/* Mobile Push Challenge Simulation (Ketika 2FA Aktif) */}
            {showPushPrompt && (
              <div style={{
                background: '#0f172a',
                color: '#ffffff',
                borderRadius: '12px',
                padding: '14px',
                marginBottom: '16px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.25)',
                border: '1.5px solid #38bdf8',
                animation: 'pulse 2s infinite'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#38bdf8', fontWeight: 700, fontSize: '0.84rem', marginBottom: '6px' }}>
                  <BellRing size={16} />
                  <span>NOTIFIKASI TANTANGAN KEAMANAN HP KORBAN</span>
                </div>
                <div style={{ fontSize: '0.8rem', color: '#cbd5e1', lineHeight: 1.4, marginBottom: '10px' }}>
                  ⚠️ Ada upaya login baru terdeteksi dari <strong>St. Petersburg, Rusia (IP: 185.220.101.5)</strong> via Linux/HydraBot. Apakah ini Anda?
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    className="btn btn-sm"
                    style={{ flex: 1, background: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px', fontSize: '0.78rem' }}
                    onClick={handleManualRejectPush}
                  >
                    <XCircle size={14} /> TOLAK & BLOKIR AKSES
                  </button>
                  <button
                    className="btn btn-sm"
                    style={{ background: '#334155', color: '#94a3b8', border: 'none', padding: '6px 10px', fontSize: '0.78rem' }}
                    disabled
                  >
                    Izinkan (Palsu)
                  </button>
                </div>
              </div>
            )}

            {/* Outcome Result: Hacked Alert */}
            {attackResult === 'hacked' && (
              <div style={{ padding: '16px', background: '#fef2f2', border: '2px solid #ef4444', borderRadius: '10px', color: '#991b1b', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.98rem', marginBottom: '6px', color: '#dc2626' }}>
                  <ShieldAlert size={20} />
                  <span>AKUN DIBOBOL HACKER! SESI LOGIN TELAH DICURI!</span>
                </div>
                <p style={{ margin: '0 0 8px 0' }}>
                  Karena <strong>2FA TIDAK AKTIF</strong>, hacker langsung mendapatkan akses penuh ke akun Anda hanya bermodalkan password yang bocor!
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span className="badge badge-red" style={{ fontSize: '0.72rem' }}>⚠️ Foto Pribadi Diunduh</span>
                  <span className="badge badge-red" style={{ fontSize: '0.72rem' }}>⚠️ DM & Kontak Diintip</span>
                  <span className="badge badge-red" style={{ fontSize: '0.72rem' }}>⚠️ Nomor Korban Force Logout</span>
                </div>
              </div>
            )}

            {/* Outcome Result: Defended Alert */}
            {attackResult === 'defended' && (
              <div style={{ padding: '16px', background: '#f0fdf4', border: '2px solid #16a34a', borderRadius: '10px', color: '#166534', fontSize: '0.86rem', lineHeight: 1.5, marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 800, fontSize: '0.98rem', marginBottom: '6px', color: '#15803d' }}>
                  <ShieldCheck size={20} />
                  <span>PERISAI 2FA BERHASIL MENGGAGALKAN PENCURIAN AKUN!</span>
                </div>
                <p style={{ margin: '0 0 8px 0' }}>
                  Meskipun password Anda bocor di internet, hacker <strong>TETAP TIDAK BISA LOGIN</strong> karena tidak memegang HP fisik Anda untuk melihat kode 6-digit OTP!
                </p>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>🛡️ IP Hacker Diblokir Otomatis</span>
                  <span className="badge badge-green" style={{ fontSize: '0.72rem' }}>🛡️ Sesi Asli Aman</span>
                  <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>✨ +50 Skor Literasi</span>
                </div>
              </div>
            )}
          </div>

          {/* Action Trigger Button */}
          <div style={{ marginTop: '14px' }}>
            <button
              className="btn btn-primary btn-full"
              style={{ padding: '12px', fontSize: '0.92rem', fontWeight: 700 }}
              disabled={isAttacking}
              onClick={() => runAttack(has2FAEnabled)}
            >
              <Play size={16} />
              <span>{isAttacking ? 'Bot Hacker Sedang Menyerang...' : 'Luncurkan Simulasi Serangan Hacker'}</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Nav to Practice */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '22px', borderTop: '1px solid #fee2e2', paddingTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '0.84rem', color: '#64748b' }}>
          💡 <em>Fakta Siber: Mengaktifkan 2FA memblokir hingga 99.9% serangan pengambilalihan akun otomatis (Microsoft Digital Defense Report).</em>
        </div>

        <button className="btn btn-secondary" onClick={onProceedToPractice} style={{ padding: '8px 18px' }}>
          <span>Lanjut ke Praktikkan Aktivasi 2FA</span>
          <Smartphone size={16} />
        </button>
      </div>
    </div>
  );
}
