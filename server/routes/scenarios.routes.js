import { Router } from 'express';

const router = Router();

export const PHISHING_SCENARIOS = [
  {
    id: 'dana-kaget-phishing',
    simType: 'dana_login',
    platform: 'WhatsApp Broadcast',
    platformType: 'whatsapp',
    sender: '+62 858-1122-3344 (Grup Mabar MLBB)',
    iconType: 'credit',
    subject: 'Klaim Saldo DANA Kaget Rp 250.000 Hari Ini',
    message: 'Spesial buat kamu! Teman membagikan DANA Kaget saldo gratis Rp 250.000 khusus hari ini. Buka tautan di bawah dan masukkan PIN DANA kamu sebelum keduluan orang lain:',
    attachment: null,
    url: 'https://dana-kaget-klaim2026.xyz/dompet-digital/auth',
    displayUrl: 'https://dana-kaget-klaim2026.xyz/dompet-digital/auth',
    urlBreakdown: {
      protocol: 'https:// (SSL Gratisan Cloudflare)',
      subdomain: 'dana-kaget-klaim2026',
      domain: 'dana-kaget-klaim2026',
      tld: '.xyz (Bukan domain resmi PT Espay Debit Indonesia)',
      isLegit: false,
      dangerDetail: 'Domain resmi DANA adalah "dana.id". Domain "dana-kaget-klaim2026.xyz" dibuat sindikat untuk merekam nomor ponsel dan 6 digit PIN akun dompet digital korban!'
    },
    isPhishing: true,
    correctAction: 'block',
    explanation: 'PENCURIAN PIN FINTECH (CREDENTIAL HARVESTING)! DANA resmi tidak pernah membagikan tautan berakhiran domain .xyz. Begitu PIN dimasukkan, peretas langsung menguras isi saldo DANA dan rekening bank yang terhubung.',
    mockWeb: {
      siteTitle: 'DANA ID • Masuk & Klaim Saldo',
      inputs: [
        { key: 'phone', label: 'Nomor Ponsel DANA', placeholder: '08xx-xxxx-xxxx', defaultVal: '0812-9876-5432' },
        { key: 'pin', label: 'PIN DANA (6 Digit)', placeholder: '••••••', type: 'password', defaultVal: '123456' }
      ],
      submitBtnText: 'Lanjutkan Klaim Saldo'
    },
    breachResult: {
      headline: 'SALDO DOMPET DIGITAL DANA ANDA DIKURAS HABIS!',
      alertMsg: 'Nomor HP dan 6-digit PIN yang Anda masukkan langsung dieksekusi bot hacker via automated API transfer!',
      liveCrimes: [
        { iconType: 'credit', title: 'Saldo Rp 450.000 Ditransfer ke Rekening Penampung', desc: 'Peretas menggunakan token sesi login untuk mentransfer uang tanpa perlu verifikasi ulang.' },
        { iconType: 'alert', title: 'PayLater Diaktifkan & Ditarik Tunai Maksimal', desc: 'Fitur pinjaman instan diaktifkan peretas dan Anda ditinggali tagihan utang fiktif.' },
        { iconType: 'lock', title: 'Perangkat Resmi Anda Dikeluarkan (Force Logout)', desc: 'PIN akun diganti peretas sehingga Anda tidak dapat masuk kembali.' }
      ]
    }
  },
  {
    id: 'capcut-apk-mod',
    simType: 'apk_installer',
    platform: 'WhatsApp Chat',
    platformType: 'whatsapp',
    sender: '+62 821-4455-8899 (Teman Mabar)',
    iconType: 'whatsapp',
    subject: 'CapCut Pro 2026 MOD APK (Full Effect & No Watermark)',
    message: 'Bro ini link download CapCut Pro Mod APK 2026 gratis efek pro semua kebuka ga ada watermarknya. Instal langsung dari web ini ya, kalau muncul peringatan Play Protect klik Tetap Install aja:',
    attachment: 'CapCut_Pro_v12.4_Mod.apk (7.8 MB)',
    url: 'http://capcut-pro-mod.apk-hub.online/download/app',
    displayUrl: 'http://capcut-pro-mod.apk-hub.online/download/app',
    urlBreakdown: {
      protocol: 'http:// (Koneksi Terbuka Tanpa Enkripsi)',
      subdomain: 'capcut-pro-mod',
      domain: 'apk-hub',
      tld: '.online (Domain Reputasi Rendah)',
      isLegit: false,
      dangerDetail: 'Ukuran file hanya 7.8 MB (padahal CapCut asli > 120 MB). Berkas ini adalah "Dropper Trojan" yang meminta izin Layanan Aksesibilitas Android untuk menyadap SMS OTP perbankan!'
    },
    isPhishing: true,
    correctAction: 'block',
    explanation: 'MALWARE SPYWARE ANDROID (SMS DROPPER)! Aplikasi meminta hak istimewa Android Accessibility Service dan izin membaca SMS secara diam-diam. Saldo m-Banking dan akun media sosial dapat dibobol tanpa sepengetahuan korban.',
    mockWeb: {
      siteTitle: 'Unduh Berkas APK CapCut Pro Mod',
      inputs: [
        { key: 'devModel', label: 'Tipe Smartphone', placeholder: 'Android 13 / 14', defaultVal: 'Samsung Galaxy / Xiaomi' }
      ],
      submitBtnText: 'Unduh & Pasang Sekarang (.apk)'
    },
    breachResult: {
      headline: 'MALWARE BERHASIL MENGONTROL SMARTPHONE ANDA!',
      alertMsg: 'Aplikasi berbahaya telah mendapatkan izin Accessibility Service dan Akses SMS Rahasia!',
      liveCrimes: [
        { iconType: 'message', title: 'Penyadapan Seluruh SMS Masuk Termasuk Kode OTP', desc: 'SMS OTP dari bank dan WhatsApp otomatis diteruskan (forward) ke server peretas.' },
        { iconType: 'camera', title: 'Perekaman Tombol Layar (Keylogger Otomatis)', desc: 'Setiap ketikan password dan username terekam oleh background service trojan.' },
        { iconType: 'alert', title: 'Smartphone Dijadikan Botnet Spam WhatsApp', desc: 'Nomor WhatsApp Anda otomatis mengirimkan file APK yang sama ke seluruh kontak buku telepon.' }
      ]
    }
  },
  {
    id: 'kuota-kemdikbud-fake',
    simType: 'form_kuota',
    platform: 'SMS Broadcast',
    platformType: 'sms',
    sender: 'KEMDIKBUD-RI',
    iconType: 'message',
    subject: 'Bantuan Subsidi Kuota Belajar 100 GB Siswa 2026',
    message: 'Selamat! Nomor Anda terpilih menerima Bantuan Subsidi Kuota Belajar 100GB Kemendikbud tahap akhir 2026. Segera klaim sebelum batas kuota habis di portal resmi:',
    attachment: null,
    url: 'http://kemdikbud-kuota100gb.club/klaim-sekarang',
    displayUrl: 'http://kemdikbud-kuota100gb.club/klaim-sekarang',
    urlBreakdown: {
      protocol: 'http:// (Tidak Aman)',
      subdomain: 'kemdikbud-kuota100gb',
      domain: 'kemdikbud-kuota100gb',
      tld: '.club (Domain Komersial Murah)',
      isLegit: false,
      dangerDetail: 'Domain instansi kementerian wajib berakhiran ".go.id". Penggunaan domain .club membuktikan bahwa ini adalah formulir jebakan data harvesting.'
    },
    isPhishing: true,
    correctAction: 'block',
    explanation: 'DATA HARVESTING TELEMARKETING! Kementerian Pendidikan resmi tidak pernah membagikan subsidi kuota melalui domain .club. Nomor kontak siswa yang dimasukkan langsung dijual ke database sindikat spam & pinjol ilegal.',
    mockWeb: {
      siteTitle: 'Portal Bantuan Kuota Siswa Kemdikbud 2026',
      inputs: [
        { key: 'name', label: 'Nama Lengkap Siswa', placeholder: 'Nama Lengkap', defaultVal: 'Ahmad Pelajar' },
        { key: 'phone', label: 'Nomor WhatsApp Aktif', placeholder: '08xx-xxxx-xxxx', defaultVal: '0813-2233-4455' },
        { key: 'operator', label: 'Operator Seluler', type: 'select', options: ['Telkomsel', 'Indosat Ooredoo', 'XL Axiata', 'Tri (3)', 'Smartfren'] }
      ],
      submitBtnText: 'Klaim Subsidi Kuota 100 GB'
    },
    breachResult: {
      headline: 'DATA PRIBADI ANDA TERJUAL KE SINDIKAT SPAM!',
      alertMsg: 'Nomor ponsel dan nama lengkap siswa langsung diekspor ke bot telemarketing ilegal!',
      liveCrimes: [
        { iconType: 'alert', title: 'Terdaftar di Puluhan Grup Broadcast Judi Online', desc: 'Nomor telepon Anda dibombardir ratusan pesan ajakan slot setiap minggu.' },
        { iconType: 'credit', title: 'Target Penipuan Mengatasnamakan Kurir Ekspedisi', desc: 'Penipu memiliki nama dan nomor Anda sehingga pesan rekayasa sosial tampak sangat meyakinkan.' }
      ]
    }
  },
  {
    id: 'google-classroom-legit',
    simType: 'legit_classroom',
    platform: 'Notifikasi Email Sekolah',
    platformType: 'email',
    sender: 'Google Classroom (no-reply@classroom.google.com)',
    iconType: 'graduation',
    subject: 'Tugas Baru: Simulasi Keamanan Siber PKM UBBG 2026',
    message: 'Guru Anda telah memposting materi praktik baru pada kelas Literasi Keamanan Siber. Silakan klik tautan resmi di bawah untuk membuka ruang kelas virtual:',
    attachment: null,
    url: 'https://classroom.google.com/c/NjQzOTI4MDI0/a/MjA2',
    displayUrl: 'https://classroom.google.com/c/NjQzOTI4MDI0/a/MjA2',
    urlBreakdown: {
      protocol: 'https:// (Terenkripsi Google Trust Services)',
      subdomain: 'classroom',
      domain: 'google',
      tld: '.com (Domain Resmi Google)',
      isLegit: true,
      dangerDetail: 'Domain induk adalah "google.com" dengan sertifikat SSL valid. Ini adalah domain resmi dan aman dibuka.'
    },
    isPhishing: false,
    correctAction: 'safe',
    explanation: 'TAUTAN RESMI & AMAN! Host utama adalah google.com dengan protokol HTTPS resmi. Siswa dapat dengan tenang mengakses materi pembelajaran.',
    mockWeb: {
      siteTitle: 'Google Classroom • Literasi Siber PKM',
      inputs: [],
      submitBtnText: 'Buka Kelas Virtual'
    },
    breachResult: null
  }
];

router.get('/scenarios/phishing', (req, res) => {
  res.json({
    count: PHISHING_SCENARIOS.length,
    scenarios: PHISHING_SCENARIOS
  });
});

export default router;
