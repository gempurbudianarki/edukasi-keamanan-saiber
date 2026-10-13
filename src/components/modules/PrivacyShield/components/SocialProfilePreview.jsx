import React from 'react';
import { User, Lock, Unlock, MapPin, PhoneCall, AlertTriangle, ShieldAlert, ShieldCheck, Heart, MessageCircle, Bookmark, CheckCircle2, Wifi, Battery } from 'lucide-react';

export function SocialProfilePreview({ settings }) {
  const highlights = [
    { title: 'Sekolah', emoji: '🎓' },
    { title: 'Liburan', emoji: '🌴' },
    { title: 'Nongkrong', emoji: '☕' },
    { title: 'Hobi PC', emoji: '🎮' }
  ];

  const posts = [
    {
      id: 1,
      title: 'Seragam Sekolah',
      category: 'Sekolah',
      risk: 'Logo sekolah & badge nama terbaca',
      bg: 'linear-gradient(135deg, #1e3a8a, #3b82f6)',
      icon: '🏫',
      likes: '142'
    },
    {
      id: 2,
      title: 'Nongkrong Kafe',
      category: 'Lokasi Real-time',
      risk: 'Geotagging kafe tempat nongkrong',
      bg: 'linear-gradient(135deg, #78350f, #d97706)',
      icon: '☕',
      likes: '98'
    },
    {
      id: 3,
      title: 'Juara Lomba',
      category: 'Prestasi',
      risk: 'Nama lengkap & NISN pada sertifikat',
      bg: 'linear-gradient(135deg, #064e3b, #10b981)',
      icon: '🏆',
      likes: '235'
    },
    {
      id: 4,
      title: 'Tiket Liburan',
      category: 'Dokumen Sensitif',
      risk: 'Barcode & kode booking bisa di-hack!',
      bg: 'linear-gradient(135deg, #4c1d95, #8b5cf6)',
      icon: '✈️',
      likes: '189'
    },
    {
      id: 5,
      title: 'Depan Rumah',
      category: 'Tempat Tinggal',
      risk: 'Nomor rumah & pelat motor terlihat',
      bg: 'linear-gradient(135deg, #831843, #ec4899)',
      icon: '🏡',
      likes: '76'
    },
    {
      id: 6,
      title: 'Hobi Game & PC',
      category: 'Gadget',
      risk: 'Identifikasi spesifikasi barang mewah',
      bg: 'linear-gradient(135deg, #164e63, #06b6d4)',
      icon: '🎮',
      likes: '312'
    }
  ];

  return (
    <div className="glass-panel scenario-card" style={{ padding: '20px' }}>
      {/* Title */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
        <div>
          <h2 style={{ fontSize: '1.25rem', color: '#0f172a', margin: 0 }}>
            Audit Jejak Media Sosial (Instagram Virtual)
          </h2>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Perspektif profil dari sudut pandang penjahat siber / penguntit (stalker)
          </div>
        </div>

        <span className={`badge ${settings.isPrivateAccount ? 'badge-green' : 'badge-red'}`} style={{ fontSize: '0.78rem' }}>
          {settings.isPrivateAccount ? '🔒 Akun Privat (Terkunci)' : '🔓 Akun Publik (Terbuka Bebas)'}
        </span>
      </div>

      {/* Simulated Smartphone Instagram Profile Frame */}
      <div style={{
        background: '#ffffff',
        border: '3px solid #e2e8f0',
        borderRadius: '32px',
        overflow: 'hidden',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.08)',
        position: 'relative',
        maxWidth: '380px',
        margin: '0 auto'
      }}>
        {/* Phone Top Notch / Status Bar */}
        <div style={{ background: '#f8fafc', padding: '10px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748b', borderBottom: '1px solid #f1f5f9' }}>
          <span style={{ fontWeight: 700, color: '#0f172a' }}>09:41</span>
          <div style={{ width: '60px', height: '14px', background: '#000000', borderRadius: '10px' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Wifi size={12} />
            <Battery size={14} />
          </div>
        </div>

        {/* Instagram Header App Bar */}
        <div style={{ padding: '10px 16px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800, fontSize: '1rem', color: '#0f172a' }}>
            {settings.isPrivateAccount ? <Lock size={15} color="#16a34a" /> : <Unlock size={15} color="#dc2626" />}
            <span>pelajar_kekinian</span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748b' }}>•••</span>
        </div>

        {/* Profile Info Header */}
        <div style={{ padding: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '12px' }}>
            {/* Avatar with Instagram Gradient Ring */}
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              padding: '2.5px',
              background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#dc2626', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffffff' }}>
                <User size={30} />
              </div>
            </div>

            {/* Follower Stats */}
            <div style={{ display: 'flex', justifyContent: 'space-around', flex: 1, textAlign: 'center' }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>42</div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Postingan</div>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>1.420</div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Pengikut</div>
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: '0.98rem', color: '#0f172a' }}>380</div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Mengikuti</div>
              </div>
            </div>
          </div>

          {/* Bio text */}
          <div style={{ fontSize: '0.84rem', color: '#0f172a', fontWeight: 700, marginBottom: '2px' }}>
            Budi Pratama (Siswa SMAN 1)
          </div>
          <div style={{ fontSize: '0.8rem', color: '#475569', lineHeight: 1.4, marginBottom: '10px' }}>
            Hobi Fotografi, Game & Musik • Banda Aceh 🎒📸
          </div>

          {/* Dynamic Vulnerability Alert Badges in Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
            {/* Location Geotag Alert */}
            {settings.shareLiveLocation ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '5px 8px', fontSize: '0.74rem', color: '#b91c1c' }}>
                <MapPin size={13} />
                <span><strong>Lokasi Presisi Terlacak:</strong> Jl. T. Nyak Arief No. 14 (Rumah)</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '5px 8px', fontSize: '0.74rem', color: '#166534' }}>
                <MapPin size={13} />
                <span>Lokasi Presisi Dimatikan (Aman dari Doxxing)</span>
              </div>
            )}

            {/* Contact Info Alert */}
            {settings.showContactInfo ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '6px', padding: '5px 8px', fontSize: '0.74rem', color: '#b91c1c' }}>
                <PhoneCall size={13} />
                <span><strong>Kontak Terbuka Bebas:</strong> WA: +62 812-9876-5432</span>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '6px', padding: '5px 8px', fontSize: '0.74rem', color: '#166534' }}>
                <PhoneCall size={13} />
                <span>Kontak Pribadi Dirahasiakan</span>
              </div>
            )}
          </div>

          {/* Story Highlights Bar */}
          <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '8px' }}>
            {highlights.map((h, i) => (
              <div key={i} style={{ textAlign: 'center', flexShrink: 0 }}>
                <div style={{ width: '46px', height: '46px', borderRadius: '50%', border: '1.5px solid #cbd5e1', padding: '2px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 4px' }}>
                  <div style={{ width: '100%', height: '100%', borderRadius: '50%', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                    {h.emoji}
                  </div>
                </div>
                <div style={{ fontSize: '0.65rem', color: '#64748b' }}>{h.title}</div>
              </div>
            ))}
          </div>

          {/* Feed Post Grid 3x2 */}
          <div style={{ position: 'relative' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '4px', minHeight: '180px' }}>
              {posts.map((post) => (
                <div
                  key={post.id}
                  style={{
                    aspectRatio: '1/1',
                    borderRadius: '6px',
                    background: post.bg,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    padding: '4px',
                    textAlign: 'center',
                    position: 'relative'
                  }}
                >
                  <span style={{ fontSize: '1.3rem' }}>{post.icon}</span>
                  <span style={{ fontSize: '0.64rem', fontWeight: 700, marginTop: '2px', lineHeight: 1.1 }}>
                    {post.title}
                  </span>
                  <div style={{ position: 'absolute', bottom: '3px', right: '4px', fontSize: '0.6rem', display: 'flex', alignItems: 'center', gap: '2px', opacity: 0.85 }}>
                    <Heart size={8} fill="#fff" />
                    <span>{post.likes}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* FROSTED GLASS PRIVATE LOCK OVERLAY (When Account is Private) */}
            {settings.isPrivateAccount && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(255, 255, 255, 0.92)',
                backdropFilter: 'blur(10px)',
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
                textAlign: 'center',
                border: '1.5px solid #86efac',
                animation: 'fadeIn 0.3s'
              }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: '#dcfce7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16a34a', marginBottom: '8px' }}>
                  <Lock size={22} />
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#0f172a', marginBottom: '2px' }}>
                  Akun Ini Bersifat Privat
                </div>
                <div style={{ fontSize: '0.74rem', color: '#475569', lineHeight: 1.35, maxWidth: '220px' }}>
                  Hanya pengikut terverifikasi yang dapat melihat postingan, seragam, kafe, dan foto rumah. Penguntit diblokir total!
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
