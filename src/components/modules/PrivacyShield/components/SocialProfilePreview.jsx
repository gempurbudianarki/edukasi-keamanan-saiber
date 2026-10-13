import React from 'react';
import { User, Lock, Unlock, MapPin, PhoneCall, AlertTriangle, ShieldAlert, ShieldCheck, Heart, MessageCircle, Bookmark, CheckCircle2 } from 'lucide-react';

export function SocialProfilePreview({ settings }) {
  // Mock posts with privacy sensitivity attributes
  const posts = [
    {
      id: 1,
      title: 'Seragam Sekolah',
      category: 'Sekolah',
      risk: 'Logo sekolah & badge nama terbaca',
      bg: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
      icon: '🏫'
    },
    {
      id: 2,
      title: 'Nongkrong Kafe',
      category: 'Lokasi Real-time',
      risk: 'Geotagging kafe tempat nongkrong',
      bg: 'linear-gradient(135deg, #f59e0b, #d97706)',
      icon: '☕'
    },
    {
      id: 3,
      title: 'Juara Lomba',
      category: 'Prestasi',
      risk: 'Nama lengkap & NISN pada sertifikat',
      bg: 'linear-gradient(135deg, #10b981, #047857)',
      icon: '🏆'
    },
    {
      id: 4,
      title: 'Tiket Liburan',
      category: 'Dokumen Sensitif',
      risk: 'Barcode & kode booking bisa di-hack!',
      bg: 'linear-gradient(135deg, #8b5cf6, #6d28d9)',
      icon: '✈️'
    },
    {
      id: 5,
      title: 'Depan Rumah',
      category: 'Tempat Tinggal',
      risk: 'Nomor rumah & pelat motor terlihat',
      bg: 'linear-gradient(135deg, #ec4899, #be185d)',
      icon: '🏡'
    },
    {
      id: 6,
      title: 'Hobi Game & PC',
      category: 'Gadget',
      risk: 'Identifikasi spesifikasi barang mewah',
      bg: 'linear-gradient(135deg, #06b6d4, #0891b2)',
      icon: '🎮'
    }
  ];

  return (
    <div className="glass-panel scenario-card" style={{ padding: '20px' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0 }}>
            Audit Jejak Media Sosial (Instagram/TikTok)
          </h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Tampilan profil dari kacamata publik / penguntit siber (cyber stalker)
          </div>
        </div>

        <span className={`badge ${settings.isPrivateAccount ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.78rem' }}>
          {settings.isPrivateAccount ? '🔒 Akun Privat (Terkunci)' : '🔓 Akun Publik (Terbuka Bebas)'}
        </span>
      </div>

      {/* Simulated Smartphone Instagram Profile Frame */}
      <div style={{
        background: '#ffffff',
        border: '2px solid #e2e8f0',
        borderRadius: '24px',
        overflow: 'hidden',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.06)',
        position: 'relative'
      }}>
        {/* Header App Bar */}
        <div style={{ padding: '12px 18px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>
            {settings.isPrivateAccount ? <Lock size={16} color="#16a34a" /> : <Unlock size={16} color="#ef4444" />}
            <span>pelajar_kekinian</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>•••</span>
        </div>

        {/* Profile Info Header */}
        <div style={{ padding: '18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', marginBottom: '14px' }}>
            {/* Avatar with Instagram Gradient Ring */}
            <div style={{
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              padding: '2.5px',
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <User size={34} />
              </div>
            </div>

            {/* Follower Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1, textAlign: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>42</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Postingan</div>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>1.420</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Pengikut</div>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '1.05rem', color: '#0f172a' }}>380</div>
                <div style={{ fontSize: '0.72rem', color: '#64748b' }}>Mengikuti</div>
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div style={{ fontSize: '0.86rem', color: '#0f172a', fontWeight: 600, marginBottom: '2px' }}>
            Budi Pratama (Siswa SMA)
          </div>
          <div style={{ fontSize: '0.82rem', color: '#475569', lineHeight: 1.4, marginBottom: '10px' }}>
            Hobi Fotografi, Game & Musik • Banda Aceh 🎒📸
          </div>

          {/* Dynamic Vulnerability Alert Badges in Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '14px' }}>
            {/* Location Geotag Alert */}
            {settings.shareLiveLocation ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '6px 10px', fontSize: '0.78rem', color: '#b91c1c' }}>
                <MapPin size={14} />
                <span><strong>Lokasi Presisi Terlacak:</strong> Jl. T. Nyak Arief No. 14 (Rumah)</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '6px 10px', fontSize: '0.78rem', color: '#166534' }}>
                <MapPin size={14} />
                <span>Lokasi Presisi Dimatikan (Aman dari Doxxing)</span>
              </div>
            )}

            {/* Contact Info Alert */}
            {settings.showContactInfo ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '6px 10px', fontSize: '0.78rem', color: '#b91c1c' }}>
                <PhoneCall size={14} />
                <span><strong>Kontak Terbuka Bebas:</strong> WA: +62 812-9876-5432</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '6px 10px', fontSize: '0.78rem', color: '#166534' }}>
                <PhoneCall size={14} />
                <span>Kontak Pribadi Dirahasiakan</span>
              </div>
            )}
          </div>

          {/* Feed Post Grid 3x2 */}
          <div style={{ position: 'relative', marginTop: '10px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#334155', marginBottom: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span>Galeri Foto & Feed:</span>
              <span style={{ fontSize: '0.72rem', color: '#64748b' }}>6 Foto Publik</span>
            </div>

            {/* The 6 Photo cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', minHeight: '180px' }}>
              {posts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    aspectRatio: '1/1',
                    borderRadius: '8px',
                    background: post.bg,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    padding: '6px',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>{post.icon}</span>
                  <span style={{ fontSize: '0.68rem', fontWeight: 700, marginTop: '2px', lineHeight: 1.1 }}>
                    {post.title}
                  </span>
                </div>
              ))}
            </div>

            {/* FROSTED GLASS PRIVATE LOCK OVERLAY (When Account is Private) */}
            {settings.isPrivateAccount && (
              <div style={{
                position: 'absolute',
                top: '24px',
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.88)',
                backdropFilter: 'blur(8px)',
                borderRadius: '8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                textAlign: 'center',
                border: '1.5px solid #86efac',
                animation: 'fadeIn 0.3s'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', marginBottom: '10px' }}>
                  <Lock size={26} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a', marginBottom: '4px' }}>
                  Akun Ini Bersifat Privat
                </div>
                <div style={{ fontSize: '0.76rem', color: '#475569', lineHeight: 1.4, maxWidth: '240px' }}>
                  Hanya pengikut yang disetujui yang dapat melihat postingan, lokasi kafe, seragam, dan foto pribadi Budi. Stalker tidak dapat mengintip!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
