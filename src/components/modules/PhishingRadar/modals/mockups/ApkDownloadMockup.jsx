import React, { useState } from 'react';
import { Download, AlertTriangle, ShieldAlert, Smartphone } from 'lucide-react';
import { playSound } from '../../../../../utils/soundEffects';

export function ApkDownloadMockup({ scenario, onBreach }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    playSound('click');
    setTimeout(() => {
      setDownloading(false);
      onBreach();
    }, 1200);
  };

  return (
    <div style={{ padding: '24px', maxWidth: '440px', margin: '0 auto', color: '#1e293b' }}>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: '#000', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: '1.4rem', fontWeight: 800 }}>
          ✂️
        </div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>CapCut Pro 2026 MOD APK</h3>
        <p style={{ fontSize: '0.84rem', color: '#64748b' }}>
          Versi 12.4.0 (Full Unlock • No Watermark • 7.8 MB)
        </p>
      </div>

      <div style={{ background: '#fef2f2', border: '1.5px solid #fecaca', borderRadius: '12px', padding: '16px', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px', color: '#dc2626', fontWeight: 700, fontSize: '0.86rem', marginBottom: '6px' }}>
          <ShieldAlert size={18} /> Permintaan Izin Berbahaya Terdeteksi
        </div>
        <ul style={{ fontSize: '0.78rem', color: '#7f1d1d', paddingLeft: '20px', lineHeight: 1.6, margin: 0 }}>
          <li>Akses Layanan Aksesibilitas Android (Membaca seluruh layar)</li>
          <li>Akses Membaca dan Meneruskan SMS Masuk (Pencurian OTP)</li>
          <li>Berjalan otomatis di latar belakang saat HP dinyalakan</li>
        </ul>
      </div>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className="btn btn-primary btn-full"
        style={{ background: '#16a34a', borderColor: '#15803d', padding: '12px', fontWeight: 700 }}
      >
        <Download size={18} />
        {downloading ? 'Mengunduh APK Malware...' : 'Unduh & Pasang APK (7.8 MB)'}
      </button>

      <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '0.75rem', color: '#64748b' }}>
        Peringatan: APK dari luar Google Play Store tidak dipindai oleh Play Protect!
      </div>
    </div>
  );
}
