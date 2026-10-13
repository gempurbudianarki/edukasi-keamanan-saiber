export const initialPrivacySettings = {
  isPrivateAccount: false,
  shareLiveLocation: true,
  allowTagsFromAnyone: true,
  allowStrangerDM: true,
  showContactInfo: true,
  storyCloseFriendsOnly: false
};

export const privacySettingDefinitions = [
  {
    key: 'isPrivateAccount',
    title: 'Kunci Akun Menjadi Privat (Private Account)',
    description: 'Hanya pengguna yang Anda setujui yang dapat melihat postingan, reels, dan daftar pengikut Anda.',
    weight: 25,
    safeWhen: true,
    riskWhenUnsafe: 'Orang asing di internet dapat memantau aktivitas harian, foto keluarga, sekolah, dan teman-teman Anda tanpa izin.',
    recommendation: 'Aktifkan akun privat untuk akun pribadi pelajar agar terhindar dari penguntit digital (cyber stalking).'
  },
  {
    key: 'shareLiveLocation',
    title: 'Bagikan Lokasi Presisi / Geotagging Real-time',
    description: 'Menyematkan lokasi kafe, sekolah, atau rumah secara langsung saat memposting cerita/feed.',
    weight: 20,
    safeWhen: false,
    riskWhenUnsafe: 'BAHAYA FISIK & DOXXING! Pelaku kejahatan dapat memetakan rutinitas jam sekolah, tempat nongkrong, dan alamat rumah Anda secara akurat.',
    recommendation: 'Matikan lokasi presisi. Jika ingin menandai lokasi wisata, postinglah setelah Anda meninggalkan lokasi tersebut (delayed posting).'
  },
  {
    key: 'allowTagsFromAnyone',
    title: 'Izinkan Sembarang Orang Menandai (Tag/Mention) Anda',
    description: 'Siapa saja di media sosial bisa menandai akun Anda di postingan atau kolom komentar.',
    weight: 15,
    safeWhen: false,
    riskWhenUnsafe: 'Akun Anda rentan ditandai oleh bot judi online, penipuan hadiah palsu, atau konten pornografi yang mencoreng reputasi.',
    recommendation: 'Ubah ke "Hanya Orang yang Anda Ikuti" atau aktifkan peninjauan tag secara manual.'
  },
  {
    key: 'allowStrangerDM',
    title: 'Buka Pesan Langsung (DM) dari Siapa Saja Tanpa Filter',
    description: 'Menerima pesan instan dan permintaan pesan dari pengguna yang tidak Anda ikuti.',
    weight: 15,
    safeWhen: false,
    riskWhenUnsafe: 'Pintu masuk utama pelecehan seksual online, penipuan berkedok perkenalan (*grooming*), dan link phishing.',
    recommendation: 'Aktifkan filter permintaan pesan agar pesan dari orang tak dikenal disaring secara ketat.'
  },
  {
    key: 'showContactInfo',
    title: 'Tampilkan Nomor HP & Email Pribadi di Bio Profil',
    description: 'Tombol kontak publik di bawah bio media sosial.',
    weight: 15,
    safeWhen: false,
    riskWhenUnsafe: 'Nomor HP Anda dapat diambil sindikat telemarketing, penipuan APK, atau dipakai mengajukan pinjol ilegal tanpa izin.',
    recommendation: 'Hapus nomor telepon pribadi dari bio. Gunakan email khusus jika memang memerlukan akun bisnis/kreator.'
  },
  {
    key: 'storyCloseFriendsOnly',
    title: 'Batasi Cerita Sensitif ke "Teman Dekat" (Close Friends)',
    description: 'Membagikan momen pribadi, keluh kesah, atau foto rumah hanya kepada lingkaran orang terpercaya.',
    weight: 10,
    safeWhen: true,
    riskWhenUnsafe: 'Curhatan pribadi berisiko di-screenshot dan disebarkan ke publik tanpa sepengetahuan Anda.',
    recommendation: 'Gunakan fitur Teman Dekat untuk membatasi privasi lingkaran sosial Anda.'
  }
];

export function calculatePrivacyScore(settings) {
  let score = 0;
  privacySettingDefinitions.forEach(item => {
    if (settings[item.key] === item.safeWhen) {
      score += item.weight;
    }
  });

  let status = 'Sangat Rawan (Bahaya Doxxing)';
  let color = '#ef4444'; // Red
  let statusBadge = 'badge-red';

  if (score >= 90) {
    status = 'Benteng Privasi Maksimal (Aman)';
    color = '#10b981'; // Green
    statusBadge = 'badge-green';
  } else if (score >= 65) {
    status = 'Cukup Terlindungi';
    color = '#00f0ff'; // Cyan
    statusBadge = 'badge-cyan';
  } else if (score >= 40) {
    status = 'Rentan Penetrasi';
    color = '#f59e0b'; // Amber
    statusBadge = 'badge-purple';
  }

  return {
    score,
    status,
    color,
    statusBadge
  };
}
