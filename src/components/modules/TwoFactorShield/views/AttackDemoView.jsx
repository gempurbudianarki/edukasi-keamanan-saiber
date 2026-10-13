import React, { useState } from 'react';
import { Terminal, Play, ShieldAlert, ShieldCheck, User, Smartphone } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';

export function AttackDemoView({ onProceedToPractice }) {
  const [has2FAEnabled, setHas2FAEnabled] = useState(false);
  const [isAttacking, setIsAttacking] = useState(false);
  const [attackLogs, setAttackLogs] = useState([
    '[*] Bot Scanner Siap.',
    '[*] Target: akun_siswa@sekolah.sch.id (Sandi bocor terdeteksi: "sayang123")',
    '[*] Klik "Luncurkan Simulasi Serangan Hacker" di bawah.'
  ]);
  const [attackResult, setAttackResult] = useState(null); // 'hacked' | 'defended'

  const runAttack = (with2FA) => {
    setIsAttacking(true);
    setAttackResult(null);
    playSound('click');

    setAttackLogs([
      `[>] Memulai serangan Brute-Force & Credential Stuffing...`,
      `[>] Mengirim paket autentikasi: username="akun_siswa", password="sayang123"...`,
      `[!] Kredensial password cocok dengan database!`
    ]);

    setTimeout(() => {
      if (!with2FA) {
        setAttackLogs(prev => [
          ...prev,
          `[!] Akun TIDAK memiliki verifikasi 2 langkah (2FA).`,
          `[+] BYPASS SUKSES! Hak akses admin didapatkan.`,
          `[!] AKUN BERHASIL DIBOBOL HACKER! Sesi login telah dialihkan.`
        ]);
        setAttackResult('hacked');
        setIsAttacking(false);
        playSound('error');
      } else {
        setAttackLogs(prev => [
          ...prev,
          `[!] SISTEM KEAMANAN MENDETEKSI PERANGKAT BARU!`,
          `[!] Verifikasi Dua Langkah (2FA) AKTIF! Meminta kode 6-digit OTP dari HP korban...`,
          `[-] Hacker tidak memegang HP fisik korban. Kode OTP gagal diinput!`,
          `[-] KONEKSI DIBLOKIR OTOMATIS! SERANGAN GAGAL TOTAL!`
        ]);
        setAttackResult('defended');
        setIsAttacking(false);
        playSound('success');
      }
    }, 1500);
  };

  return (
    <div className="glass-panel scenario-card">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>
            Simulasi Serangan Hacker: Mengapa Password Saja Tidak Cukup?
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.86rem' }}>
            Uji apa yang terjadi ketika hacker mengetahui password korban pada akun tanpa 2FA vs dengan 2FA.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Status Akun:</span>
          <button
            className={`btn ${has2FAEnabled ? 'btn-primary' : 'btn-secondary'}`}
            style={{ padding: '8px 14px', fontSize: '0.82rem' }}
            onClick={() => {
              playSound('click');
              setHas2FAEnabled(prev => !prev);
              setAttackResult(null);
            }}
          >
            {has2FAEnabled ? '2FA: AKTIF (TERLINDUNGI)' : '2FA: NONAKTIF (RENTAN)'}
          </button>
        </div>
      </div>

      <div className="attack-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {/* Terminal hacker */}
        <div className="terminal-card" style={{ background: '#020617', border: '1px solid #1e293b', borderRadius: '10px', padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', borderBottom: '1px solid #1e293b', paddingBottom: '8px' }}>
            <Terminal size={16} color="#00f0ff" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: '#00f0ff' }}>Terminal Bot Peretas</span>
          </div>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', minHeight: '160px', color: '#94a3b8', lineHeight: 1.5 }}>
            {attackLogs.map((log, i) => (
              <div key={i} style={{ color: log.startsWith('[+]') ? '#10b981' : log.startsWith('[!]') ? '#f43f5e' : '#94a3b8' }}>
                {log}
              </div>
            ))}
          </div>
        </div>

        {/* Akun korban */}
        <div style={{ background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '10px', padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <User size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontWeight: 700 }}>@pelajar_kekinian</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Status: {attackResult === 'hacked' ? 'DIBOBOL!' : attackResult === 'defended' ? 'TERLINDUNGI' : 'Siaga'}
              </div>
            </div>
          </div>

          {attackResult === 'hacked' && (
            <div style={{ padding: '12px', background: 'rgba(220, 38, 38, 0.15)', border: '1px solid rgba(220, 38, 38, 0.3)', borderRadius: '8px', color: '#fca5a5', fontSize: '0.84rem' }}>
              <ShieldAlert size={16} style={{ display: 'inline', marginRight: '6px' }} />
              Hacker berhasil login! Akses akun, foto, dan DM dicuri karena tidak ada lapis verifikasi kedua.
            </div>
          )}

          {attackResult === 'defended' && (
            <div style={{ padding: '12px', background: 'rgba(22, 163, 74, 0.15)', border: '1px solid rgba(22, 163, 74, 0.3)', borderRadius: '8px', color: '#86efac', fontSize: '0.84rem' }}>
              <ShieldCheck size={16} style={{ display: 'inline', marginRight: '6px' }} />
              Hacker terblokir total! Meskipun password bocor, hacker tidak memegang HP fisik korban untuk melihat kode 2FA.
            </div>
          )}

          <div style={{ marginTop: '20px' }}>
            <button
              className="btn btn-primary btn-full"
              disabled={isAttacking}
              onClick={() => runAttack(has2FAEnabled)}
            >
              <Play size={16} />
              <span>{isAttacking ? 'Menyerang...' : 'Luncurkan Simulasi Serangan Hacker'}</span>
            </button>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <button className="btn btn-secondary" onClick={onProceedToPractice}>
          <span>Lanjut ke Praktikkan Aktivasi 2FA</span>
          <Smartphone size={16} />
        </button>
      </div>
    </div>
  );
}
