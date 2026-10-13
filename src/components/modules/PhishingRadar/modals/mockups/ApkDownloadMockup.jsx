import React, { useState } from 'react';
import { Download, AlertTriangle, ShieldAlert, Smartphone, CheckCircle2, ShieldOff, Sparkles } from 'lucide-react';
import { playSound } from '../../../../../utils/soundEffects';

export function ApkDownloadMockup({ scenario, onBreach }) {
  const [downloading, setDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);

  const handleDownload = () => {
    if (downloading) return;
    setDownloading(true);
    setDownloadProgress(10);
    playSound('scan');

    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          setTimeout(() => {
            setDownloading(false);
            playSound('error');
            onBreach();
          }, 350);
          return 100;
        }
        return prev + 25;
      });
    }, 250);
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
          <strong>SIMULASI EDUKASI PKM UBBG:</strong> Ini adalah tiruan antarmuka unduhan APK berbahaya. Berkas <strong>TIDAK BENAR-BENAR</strong> diunduh ke smartphone Anda.
        </span>
      </div>

      {/* Realistic Android Installer Header */}
      <div style={{
        background: '#ffffff',
        border: '1.5px solid #e2e8f0',
        borderRadius: '14px',
        padding: '20px',
        boxShadow: '0 4px 14px rgba(0,0,0,0.04)',
        marginBottom: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '14px' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, #0f172a, #1e293b)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.6rem',
            fontWeight: 800,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            flexShrink: 0
          }}>
            ✂️
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#0f172a', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              CapCut Pro VIP (MOD)
            </h3>
            <div style={{ fontSize: '0.75rem', color: '#64748b', fontFamily: 'monospace' }}>
              com.modteam.capcut.vip • 18.4 MB
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.72rem', color: '#dc2626', fontWeight: 700, marginTop: '4px' }}>
              <ShieldOff size={13} /> Sumber Tidak Dikenal (Bukan Play Store)
            </div>
          </div>
        </div>

        {/* Permissions warning box */}
        <div style={{
          background: '#fef2f2',
          border: '1.5px solid #fecaca',
          borderRadius: '10px',
          padding: '14px',
          marginBottom: '18px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#dc2626', fontWeight: 800, fontSize: '0.82rem', marginBottom: '8px' }}>
            <ShieldAlert size={16} /> Permintaan Izin Berbahaya (Trojan Spyware):
          </div>
          <ul style={{ fontSize: '0.77rem', color: '#7f1d1d', paddingLeft: '18px', lineHeight: 1.6, margin: 0 }}>
            <li><strong>Akses SMS:</strong> Membaca dan meneruskan pesan OTP perbankan/medsos secara sembunyi-sembunyi.</li>
            <li><strong>Aksesibilitas Sistem:</strong> Merekam setiap ketukan layar dan password pengguna.</li>
            <li><strong>Kamera & Mikrofon:</strong> Mengaktifkan rekaman sensor di latar belakang tanpa notifikasi.</li>
          </ul>
        </div>

        {/* Progress or Button */}
        {downloading ? (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 700, color: '#16a34a', marginBottom: '6px' }}>
              <span>Mengunduh Berkas Trojan...</span>
              <span>{downloadProgress}%</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden', marginBottom: '8px' }}>
              <div style={{
                width: `${downloadProgress}%`,
                height: '100%',
                background: '#16a34a',
                transition: 'width 0.2s ease',
                borderRadius: '4px'
              }} />
            </div>
            <div style={{ fontSize: '0.72rem', color: '#64748b', textAlign: 'center' }}>
              Menyalin payload malware ke direktori sistem Android...
            </div>
          </div>
        ) : (
          <button
            onClick={handleDownload}
            className="btn btn-primary btn-full"
            style={{
              background: '#16a34a',
              borderColor: '#15803d',
              padding: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Download size={18} />
            <span>Unduh & Pasang Berkas APK (18.4 MB)</span>
          </button>
        )}
      </div>

      <div style={{ textAlign: 'center', fontSize: '0.74rem', color: '#64748b', lineHeight: 1.4 }}>
        Aplikasi resmi hanya boleh diinstal melalui <strong>Google Play Store</strong> atau <strong>Apple App Store</strong> resmi yang diproteksi Play Protect.
      </div>
    </div>
  );
}
