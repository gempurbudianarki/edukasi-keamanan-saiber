// ================================================================
// PHISHING & CYBER THREAT DATASET (CYBER DEFENSE PKM UBBG)
// Clean professional dataset with ZERO raw emojis (Vector-driven)
// ================================================================

import { SCENARIO_TYPES } from './scenarioTypes.js';

// ── 1. REALISTIC ATTACK SCENARIOS (WITH 1:1 WEBSITES) ───────────
export const phishingScenarios = [
  {
    id: 'dana-kaget-phishing',
    simType: SCENARIO_TYPES.DANA_LOGIN,
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
    id: 'kuota-kemdikbud',
    simType: SCENARIO_TYPES.FORM_KUOTA,
    platform: 'SMS Broadcast Provider',
    platformType: 'sms',
    sender: 'BANTUAN-PEMERINTAH',
    iconType: 'message',
    subject: 'Subsidi Kuota Pelajar 100 GB Kemendikbud',
    message: 'Selamat! Nomor Anda terpilih menerima Bantuan Subsidi Kuota Belajar 100GB Kemendikbud tahap akhir 2026. Segera klaim sebelum batas kuota habis di portal resmi kami:',
    attachment: null,
    url: 'http://kemdikbud-kuota100gb.club/klaim-sekarang',
    displayUrl: 'http://kemdikbud-kuota100gb.club/klaim-sekarang',
    urlBreakdown: {
      protocol: 'http:// (Koneksi tidak terenkripsi)',
      subdomain: 'kemdikbud-kuota100gb',
      domain: 'kemdikbud-kuota100gb',
      tld: '.club (Domain komersial murah)',
      isLegit: false,
      dangerDetail: 'Domain menggunakan .club, bukan .go.id resmi pemerintah. Modus ini sengaja memancing siswa menginput nomor WhatsApp dan nama lengkap untuk dijual ke sindikat judi online & pinjaman ilegal!'
    },
    isPhishing: true,
    correctAction: 'block',
    explanation: 'PENCURIAN DATA PRIBADI (DATA HARVESTING)! Kementerian resmi TIDAK PERNAH membagikan kuota via domain .club atau meminta nomor HP di formulir terbuka. Data yang Anda masukkan langsung dijual ke mafia telemarketing spam!',
    mockWeb: {
      siteTitle: 'Portal Subsidi Kuota Kemendikbud RI 2026',
      heroTitle: 'Program Bantuan Kuota Internet 100 GB Pelajar & Mahasiswa',
      subtitle: 'Klaim kuota internet gratis khusus pelajar Indonesia dalam rangka digitalisasi pendidikan.',
      inputs: [
        { key: 'name', label: 'Nama Lengkap Siswa / Mahasiswa', placeholder: 'Contoh: Rizky Pratama', defaultVal: 'Rizky Siswa' },
        { key: 'phone', label: 'Nomor WhatsApp / HP Aktif', placeholder: 'Contoh: 0812-3456-7890', defaultVal: '0821-9988-7766' },
        { key: 'operator', label: 'Pilih Operator Seluler', type: 'select', options: ['Telkomsel', 'Indosat Ooredoo', 'XL Axiata', 'Tri (3)', 'Axis', 'Smartfren'] }
      ],
      submitBtnText: 'Klaim Subsidi Kuota 100 GB Sekarang'
    },
    breachResult: {
      headline: 'NOMOR HP ANDA TELAH DIJUAL KE SINDIKAT SPAM & JUDI ONLINE!',
      alertMsg: 'Data nomor telepon yang baru saja Anda masukkan langsung diekspor ke database bot otomatis peretas!',
      liveCrimes: [
        { iconType: 'alert', title: 'Terdaftar di 12 Situs Judi Online Tanpa Izin', desc: 'Nomor Anda otomatis dibuatkan akun oleh bot spam. Anda akan menerima puluhan pesan broadcast ajakan judi setiap hari.' },
        { iconType: 'credit', title: 'Sasaran Target Telemarketing Pinjol Ilegal', desc: 'Kontak aktif Anda dijual ke sindikat pinjaman online ilegal berbunga tinggi.' },
        { iconType: 'user', title: 'Target Penipuan Rekayasa Sosial WhatsApp', desc: 'Pelaku akan mengirim chat manipulatif berpura-pura menjadi pihak kurir paket atau kepolisian.' }
      ]
    }
  },
  {
    id: 'ig-copyright',
    simType: SCENARIO_TYPES.IG_LOGIN,
    platform: 'Instagram Direct Message',
    platformType: 'instagram',
    sender: 'Instagram Official Support (@help_meta_security_id)',
    iconType: 'camera',
    subject: 'Peringatan Hak Cipta: Akun Dihapus 24 Jam',
    message: 'Halo @pelajar_kekinian, akun Anda terdeteksi melanggar hak cipta komunitas Meta. Akun Anda akan dinonaktifkan permanen dalam 24 JAM. Ajukan banding verifikasi sekarang di portal bantuan resmi kami:',
    attachment: null,
    url: 'https://instagram-copyright-appeal.xyz/login/verify',
    displayUrl: 'https://instagram-copyright-appeal.xyz/login/verify',
    urlBreakdown: {
      protocol: 'https:// (Sertifikat SSL gratisan)',
      subdomain: 'instagram-copyright-appeal',
      domain: 'instagram-copyright-appeal',
      tld: '.xyz (Domain palsu pihak ketiga)',
      isLegit: false,
      dangerDetail: 'Domain utamanya adalah "instagram-copyright-appeal.xyz", BUKAN "instagram.com". Tampilan sengaja dibuat meniru antarmuka login Instagram asli untuk merekam username & kata sandi Anda!'
    },
    isPhishing: true,
    correctAction: 'block',
    explanation: 'CLONE PHISHING LOGIN INSTAGRAM! Pelaku menduplikasi halaman login Instagram. Ketika Anda mengetik sandi dan login, kredensial tersebut langsung tertangkap di server penyerang untuk pengambilalihan akun.',
    mockWeb: {
      siteTitle: 'Instagram • Login Banding Hak Cipta',
      inputs: [
        { key: 'username', label: 'Nomor telepon, nama pengguna, atau email', placeholder: 'Phone number, username, or email', defaultVal: 'pelajar_kekinian' },
        { key: 'password', label: 'Kata Sandi', placeholder: 'Password', type: 'password', defaultVal: 'rahasia12345' }
      ],
      submitBtnText: 'Log In'
    },
    breachResult: {
      headline: 'AKUN INSTAGRAM ANDA TELAH DIAMBIL ALIH OLEH PERETAS!',
      alertMsg: 'Kredensial username dan kata sandi yang Anda ketik telah terekam di terminal server peretas!',
      liveCrimes: [
        { iconType: 'lock', title: 'Kata Sandi & Sesi Login Dibajak', desc: 'Sesi akun resmi Anda diputus paksa. Hacker mengganti email pemulihan sehingga Anda kehilangan akses penuh.' },
        { iconType: 'alert', title: 'Bio Akun Diubah Menjadi Promosi Judi Online', desc: 'Profil publik Anda digunakan menyebarkan tautan situs terlarang untuk memancing teman-teman pengikut Anda.' },
        { iconType: 'message', title: 'Pengiriman Pesan Penipuan Pinjam Uang Massal', desc: 'Peretas mengirimkan pesan palsu ke kontak Anda meminta transfer uang darurat atas nama Anda.' }
      ]
    }
  },
  {
    id: 'capcut-apk',
    simType: SCENARIO_TYPES.APK_INSTALLER,
    platform: 'WhatsApp Chat',
    platformType: 'whatsapp',
    sender: '+62 821-4455-8899 (Teman Mabar)',
    iconType: 'whatsapp',
    subject: 'CapCut Pro 2026 MOD APK Gratis (No Watermark)',
    message: 'Halo, ini aplikasi CapCut Pro versi MOD yang fitur VIP terbuka semua tanpa watermark. Pasang berkas APK ini langsung di smartphone kamu:',
    attachment: {
      name: 'CapCut_Pro_v12_VIP_NoWatermark.apk',
      size: '18.4 MB',
      type: 'apk'
    },
    url: 'Unduhan Berkas: CapCut_Pro_v12_VIP_NoWatermark.apk',
    displayUrl: 'storage/download/CapCut_Pro_v12_VIP_NoWatermark.apk',
    urlBreakdown: {
      protocol: 'Android Application Package',
      subdomain: '-',
      domain: 'CapCut_Pro_v12_VIP_NoWatermark',
      tld: '.apk (Format berkas eksekusi pihak ketiga)',
      isLegit: false,
      dangerDetail: 'Berkas format .APK dari luar toko aplikasi resmi Google Play Store. Disusupi malware Trojan Spyware yang meminta izin berbahaya untuk mengakses SMS dan kamera!'
    },
    isPhishing: true,
    correctAction: 'block',
    explanation: 'MALWARE TROJAN BERKEDOK APLIKASI GRATIS! Berkas modifikasi tidak resmi sering disisipi script trojan berbahaya. Sekali dipasang di perangkat, malware diam-diam memata-matai SMS OTP transaksi dan percakapan pribadi.',
    mockWeb: {
      appName: 'CapCut Pro Editor VIP',
      developer: 'Mod Team Pihak Ketiga',
      fileSize: '18.4 MB',
      permissions: [
        { name: 'Membaca & Meneruskan Pesan SMS (Sangat Bahaya)', risk: 'high' },
        { name: 'Akses Kamera & Mikrofon di Latar Belakang', risk: 'high' },
        { name: 'Membaca Kontak & Galeri Foto', risk: 'high' }
      ],
      submitBtnText: 'Pasang & Install Aplikasi di Smartphone'
    },
    breachResult: {
      headline: 'SMARTPHONE ANDA TELAH TERINFEKSI SPYWARE LATAR BELAKANG!',
      alertMsg: 'Malware berkas APK telah terpasang ke sistem Android dan berjalan tanpa sepengetahuan Anda!',
      liveCrimes: [
        { iconType: 'lock', title: 'Penyadapan Pesan SMS OTP Perbankan & Medsos', desc: 'Setiap kode verifikasi OTP yang masuk langsung diteruskan ke penyerang sebelum Anda sempat melihatnya.' },
        { iconType: 'camera', title: 'Pengambilan Foto & Mikrofon Tersembunyi', desc: 'Peretas dapat mengaktifkan sensor kamera dan mikrofon perangkat secara diam-diam.' },
        { iconType: 'credit', title: 'Pembobolan Saldo Akun Dompet Digital', desc: 'Saldo e-wallet (DANA/GoPay/ShopeePay) rentan dikuras karena peretas menguasai kode otentikasi transfer.' }
      ]
    }
  },
  {
    id: 'game-diamond',
    simType: SCENARIO_TYPES.GAME_DIAMOND,
    platform: 'Media Sosial Promo',
    platformType: 'game',
    sender: 'Moonton_Event_ID',
    iconType: 'gamepad',
    subject: 'Spesial Ulang Tahun: Klaim 10.000 Diamond Gratis',
    message: 'Event Terbatas! Dapatkan 10.000 Diamond & Skin Legend Mobile Legends / Free Fire tanpa biaya. Masukkan ID Akun untuk klaim langsung ke kotak masuk game:',
    attachment: null,
    url: 'https://moonton-diamond-event-free.top-claim.club/spin',
    displayUrl: 'https://moonton-diamond-event-free.top-claim.club/spin',
    urlBreakdown: {
      protocol: 'https://',
      subdomain: 'moonton-diamond-event-free',
      domain: 'top-claim',
      tld: '.club (Domain penipuan publik)',
      isLegit: false,
      dangerDetail: 'Domain utama adalah "top-claim.club", bukan moonton.com resmi. Modus klasik penipuan diamond game untuk mencuri akun game dan email yang terhubung!'
    },
    isPhishing: true,
    correctAction: 'block',
    explanation: 'PHISHING PENCURIAN AKUN GAME! Tidak ada event resmi pengembang game yang membagikan diamond bernilai jutaan rupiah melalui situs pihak ketiga. Jika Anda login, akun game akan langsung dialihkan dan dijual peretas.',
    mockWeb: {
      siteTitle: 'Event Lucky Spin Diamond MLBB 2026',
      heroTitle: 'PILIH HADIAH DIAMOND ANDA',
      inputs: [
        { key: 'gameId', label: 'User ID Game & Zone ID', placeholder: 'Contoh: 12345678 (2024)', defaultVal: '98765432 (2104)' },
        { key: 'loginMethod', label: 'Pilih Metode Login Akun', type: 'select', options: ['Akun Moonton (Email & Sandi)', 'Login Facebook', 'Login Google Play'] },
        { key: 'accPassword', label: 'Kata Sandi Akun Game / Email', placeholder: 'Masukkan kata sandi akun', type: 'password', defaultVal: 'mabarmlbb2026' }
      ],
      submitBtnText: 'Klaim 10.000 Diamond ke Akun Game'
    },
    breachResult: {
      headline: 'AKUN GAME & EMAIL ANDA TELAH DICURI OLEH BOT PERETAS!',
      alertMsg: 'Data akun game dan kata sandi yang Anda masukkan langsung disalin oleh server penyerang!',
      liveCrimes: [
        { iconType: 'gamepad', title: 'Akun Game Dijual di Forum Pasar Gelap', desc: 'Kata sandi dan email verifikasi akun diganti seketika sehingga Anda kehilangan hak akses.' },
        { iconType: 'alert', title: 'Koleksi Item & Skin Akun Lenyap', desc: 'Item berharga dalam akun ditransfer atau dipindahtangankan oleh pelaku peretasan.' },
        { iconType: 'lock', title: 'Ancaman Terhadap Email Pribadi Utama', desc: 'Jika Anda menggunakan kata sandi yang sama untuk email, akun email Anda juga rentan ditembus.' }
      ]
    }
  },
  {
    id: 'google-classroom',
    simType: SCENARIO_TYPES.LEGIT_CLASSROOM,
    platform: 'Email Siswa Resmi',
    platformType: 'email',
    sender: 'Google Classroom (no-reply@classroom.google.com)',
    iconType: 'graduation',
    subject: 'Materi Baru: Modul Keamanan Siber UBBG',
    message: 'Dosen / Fasilitator Anda memposting materi tugas baru pada kelas Literasi Keamanan Siber PKM UBBG. Silakan akses ruang kelas Anda:',
    attachment: null,
    url: 'https://classroom.google.com/u/0/c/MjkyODQ1NTY1MTcx',
    displayUrl: 'https://classroom.google.com/u/0/c/MjkyODQ1NTY1MTcx',
    urlBreakdown: {
      protocol: 'https:// (Koneksi terenkripsi sah)',
      subdomain: 'classroom',
      domain: 'google',
      tld: '.com (Domain resmi Google LLC)',
      isLegit: true,
      dangerDetail: 'Domain induk adalah google.com yang sah dengan enkripsi HTTPS resmi. Ini adalah tautan resmi dan aman.'
    },
    isPhishing: false,
    correctAction: 'safe',
    explanation: 'TAUTAN RESMI & AMAN! Domain utamanya adalah google.com. Perhatikan bahwa domain resmi Google selalu berada tepat di depan .com tanpa embel-embel domain asing seperti .club atau .xyz.',
    mockWeb: {
      siteTitle: 'Google Classroom',
      heroTitle: 'Kelas Literasi Digital Siswa SMA - PKM UBBG 2026',
      subtitle: 'Tugas: Simulasi Praktik Keamanan Siber & Privasi Media Sosial',
      isLegit: true
    },
    breachResult: null
  }
];

// ── 2. DOMAIN & URL COMPARATOR DRILLS (ASLI VS PALSU) ───────────
export const domainComparisonDrills = [
  {
    id: 'drill-kemdikbud',
    title: 'Portal Bantuan Pendidikan Pemerintah',
    category: 'Situs Lembaga Pemerintah (.go.id)',
    context: 'Kamu menerima SMS pengumuman beasiswa PIP/KIP Kuliah dengan dua tautan berbeda:',
    domainA: {
      url: 'https://pip.kemdikbud.go.id/login',
      protocol: 'https://',
      subdomain: 'pip',
      mainDomain: 'kemdikbud',
      tld: '.go.id',
      isReal: true,
      label: 'Domain A',
      hostType: 'Pemerintah Resmi Republik Indonesia'
    },
    domainB: {
      url: 'https://kemdikbud-beasiswa2026.club/daftar',
      protocol: 'https://',
      subdomain: 'kemdikbud-beasiswa2026',
      mainDomain: 'kemdikbud-beasiswa2026',
      tld: '.club',
      isReal: false,
      label: 'Domain B',
      hostType: 'Domain Publik Komersial Bebas Beli'
    },
    correctReal: 'A',
    keyClue: 'Instansi pemerintah Indonesia SELALU menggunakan domain berakhiran .go.id. Domain .club adalah domain publik murah yang bisa dibeli siapa saja tanpa verifikasi identitas instansi.',
    takeaway: 'Jangan pernah percaya situs pemerintah yang berakhiran selain .go.id (.com, .club, .xyz, .top adalah PALSU).'
  },
  {
    id: 'drill-bca',
    title: 'Internet Banking / Layanan Finansial',
    category: 'Perbankan & Dompet Digital',
    context: 'Kamu hendak login ke portal perbankan internet banking untuk memeriksa mutasi rekening:',
    domainA: {
      url: 'https://klikbca-verifikasi-nasabah.biz/auth',
      protocol: 'https://',
      subdomain: 'klikbca-verifikasi-nasabah',
      mainDomain: 'klikbca-verifikasi-nasabah',
      tld: '.biz',
      isReal: false,
      label: 'Domain A',
      hostType: 'Domain Typosquatting / Clone Phishing'
    },
    domainB: {
      url: 'https://www.klikbca.com/login',
      protocol: 'https://',
      subdomain: 'www',
      mainDomain: 'klikbca',
      tld: '.com',
      isReal: true,
      label: 'Domain B',
      hostType: 'Domain Resmi PT Bank Central Asia Tbk'
    },
    correctReal: 'B',
    keyClue: 'Domain resmi BCA adalah "klikbca.com". Domain penipu menambahkan kata seperti "-verifikasi-nasabah.biz" untuk memancing korban memasukkan KeyBCA dan PIN.',
    takeaway: 'Bank resmi tidak menggunakan TLD .biz atau domain dengan tanda hubung panjang seperti -verifikasi.'
  },
  {
    id: 'drill-instagram',
    title: 'Verifikasi Akun Media Sosial (Subdomain Trick)',
    category: 'Media Sosial & Meta',
    context: 'Kamu menerima peringatan pelanggaran hak cipta akun Instagram dengan tautan berikut:',
    domainA: {
      url: 'https://instagram.com/accounts/login/',
      protocol: 'https://',
      subdomain: 'none',
      mainDomain: 'instagram',
      tld: '.com',
      isReal: true,
      label: 'Domain A',
      hostType: 'Platform Resmi Meta / Instagram'
    },
    domainB: {
      url: 'https://instagram.com.meta-helpdesk-security.xyz/login',
      protocol: 'https://',
      subdomain: 'instagram.com',
      mainDomain: 'meta-helpdesk-security',
      tld: '.xyz',
      isReal: false,
      label: 'Domain B',
      hostType: 'Trik Subdomain Palsu (Subdomain Deception)'
    },
    correctReal: 'A',
    keyClue: 'Perhatikan Domain B! Kata "instagram.com" diletakkan SEBAGAI SUBDOMAIN di depan domain utama sebenarnya yaitu "meta-helpdesk-security.xyz". Domain yang sah selalu berada persis sebelum TLD akhir (.com)!',
    takeaway: 'Trik Subdomain adalah taktik hacker paling umum: membaca URL dari kanan ke kiri sebelum garis miring (/) pertama!'
  },
  {
    id: 'drill-google-homoglyph',
    title: 'Pencarian Google & Layanan Cloud (Homoglyph Attack)',
    category: 'Manipulasi Karakter Visual',
    context: 'Perhatikan dua alamat URL berikut dengan sangat teliti pada huruf penyusunnya:',
    domainA: {
      url: 'https://accounts.googIe.com/signin',
      protocol: 'https://',
      subdomain: 'accounts',
      mainDomain: 'googIe (Huruf "I" besar pengganti "l")',
      tld: '.com',
      isReal: false,
      label: 'Domain A',
      hostType: 'Homoglyph / Typosquatting Font'
    },
    domainB: {
      url: 'https://accounts.google.com/signin',
      protocol: 'https://',
      subdomain: 'accounts',
      mainDomain: 'google (Huruf "l" kecil murni)',
      tld: '.com',
      isReal: true,
      label: 'Domain B',
      hostType: 'Portal Resmi Akun Google LLC'
    },
    correctReal: 'B',
    keyClue: 'Pada Domain A, huruf "l" kecil (el) digantikan dengan huruf "I" kapital (i besar: googIe). Dalam font tertentu huruf keduanya terlihat identik, namun membawa korban ke server peretas!',
    takeaway: 'Waspada serangan Homoglyph. Gunakan bookmark atau ketik manual alamat penting daripada mengklik tautan.'
  },
  {
    id: 'drill-steam',
    title: 'Komunitas Game Online (Steam / Valve)',
    category: 'Game & Digital Entertainment',
    context: 'Temanmu di Discord membagikan link tawaran trading skin game langka:',
    domainA: {
      url: 'https://steamcommunity.com/tradeoffer/new/',
      protocol: 'https://',
      subdomain: 'none',
      mainDomain: 'steamcommunity',
      tld: '.com',
      isReal: true,
      label: 'Domain A',
      hostType: 'Portal Komunitas Resmi Valve Corporation'
    },
    domainB: {
      url: 'https://steamcommunlty.com/tradeoffer/new/',
      protocol: 'https://',
      subdomain: 'none',
      mainDomain: 'steamcommunlty (Huruf "l" menggantikan "i")',
      tld: '.com',
      isReal: false,
      label: 'Domain B',
      hostType: 'Pencurian Inventori Akun Game'
    },
    correctReal: 'A',
    keyClue: 'Domain B menggunakan "steamcommunLty" (huruf L menggantikan huruf i). Trik typosquatting ini dirancang agar mata manusia membaca sepintas seperti ejaan asli.',
    takeaway: 'Periksa ejaan huruf demi huruf pada domain komunitas trading atau giveaway game.'
  }
];

// ── 3. EMAIL SPOOFING FORENSIC DRILLS (HEADER INSPECTION) ────────
export const emailSpoofingDrills = [
  {
    id: 'email-google-spoofed',
    title: 'Notifikasi Darurat Akun Google Dihack',
    category: 'Email Spoofing & Phishing',
    iconType: 'alert',
    clientView: {
      senderDisplay: 'Google Security Support',
      fromEmail: 'no-reply@security-google-verify.com',
      toEmail: 'siswa.pkm@gmail.com',
      date: '13 Oktober 2026, 09:14 WIB',
      subject: 'PERINGATAN KEAMANAN: Upaya Login Tidak Dikenal Dari Moskow, Rusia',
      bodyText: 'Sistem kami mendeteksi seseorang mencoba mengakses foto dan email Gmail Anda dari perangkat Linux di Moskow, Rusia. Jika ini bukan Anda, klik tombol di bawah dalam waktu 60 MENIT sebelum akun Anda dikunci permanen.',
      ctaText: 'Amankan Akun Saya Sekarang (Reset Sandi)',
      ctaUrl: 'https://google-security-verify.com/login-reset'
    },
    rawHeaders: {
      from: 'Google Security Support <no-reply@security-google-verify.com>',
      replyTo: 'hacker-collector@darknet-server.ru',
      returnPath: 'bounce-collector@darknet-server.ru',
      senderIp: '185.220.101.5 (Tor Exit Node, Rusia)',
      spfRecord: 'FAIL (IP 185.220.101.5 tidak diizinkan oleh google.com)',
      dkimRecord: 'FAIL (Tanda tangan digital tidak terdaftar atau rusak)',
      dmarcRecord: 'REJECT / QUARANTINE'
    },
    isPhishing: true,
    correctAction: 'fake',
    redFlags: [
      'Alamat From menggunakan "@security-google-verify.com", BUKAN "@accounts.google.com".',
      'Header SPF & DKIM bertuliskan FAIL — server pengirim bukan server resmi Google.',
      'Return-Path dan Reply-To mengarah ke server gelap luar negeri (.ru).',
      'Tekanan batas waktu darurat ("60 MENIT") agar korban panik dan tidak berpikir jernih.'
    ],
    explanation: 'EMAIL SPOOFING BERBAHAYA! Peretas memanipulasi Display Name menjadi "Google Security Support" untuk menyamarkan alamat email palsu di baliknya. Inspeksi header SPF dan DKIM membuktikan server pengirim tidak sah.'
  },
  {
    id: 'email-google-legit',
    title: 'Notifikasi Keamanan Akun Google Resmi',
    category: 'Email Sah & Terverifikasi',
    iconType: 'check',
    clientView: {
      senderDisplay: 'Google',
      fromEmail: 'no-reply@accounts.google.com',
      toEmail: 'siswa.pkm@gmail.com',
      date: '13 Oktober 2026, 11:30 WIB',
      subject: 'Pemberitahuan Keamanan: Login Baru di Komputer Windows',
      bodyText: 'Akun Google Anda (siswa.pkm@gmail.com) baru saja digunakan untuk login pada perangkat baru (Windows, Chrome, Banda Aceh). Jika ini memang Anda, tidak ada tindakan lebih lanjut yang diperlukan.',
      ctaText: 'Periksa Aktivitas Perangkat',
      ctaUrl: 'https://myaccount.google.com/notifications'
    },
    rawHeaders: {
      from: 'Google <no-reply@accounts.google.com>',
      replyTo: 'no-reply@accounts.google.com',
      returnPath: '3x-981249@gaia.bounces.google.com',
      senderIp: '209.85.220.41 (Google Mail Server Resmi)',
      spfRecord: 'PASS (Domain google.com mengesahkan IP pengirim)',
      dkimRecord: 'PASS (Signature "google.com" terverifikasi sah)',
      dmarcRecord: 'PASS'
    },
    isPhishing: false,
    correctAction: 'real',
    redFlags: [],
    explanation: 'EMAIL RESMI & SAH! Domain pengirim adalah @accounts.google.com. Header SPF dan DKIM berstatus PASS. Email ini tidak mengancam dengan batas waktu dan tautan mengarah ke myaccount.google.com.'
  },
  {
    id: 'email-bca-spoofed',
    title: 'Laporan Potongan Rekening Bank Rp 5.000.000',
    category: 'Rekayasa Sosial Perbankan',
    iconType: 'credit',
    clientView: {
      senderDisplay: 'HaloBCA Notification Center',
      fromEmail: 'layanan-nasabah@bca-layanan-pusat.net',
      toEmail: 'nasabah@domain.com',
      date: '13 Oktober 2026, 08:05 WIB',
      subject: 'Konfirmasi Autodebet Berhasil: Pembelian Valas Sebesar Rp 5.000.000,-',
      bodyText: 'Transaksi pemotongan dana sebesar Rp 5.000.000,- untuk nomor rekening Anda telah sukses diproses ke PT Valuta Digital. JIKA ANDA TIDAK MERASA MELAKUKAN TRANSAKSI INI, segera batalkan transaksi sebelum dana masuk ke penerima dalam 15 menit.',
      ctaText: 'Batalkan Transaksi & Refund Dana Segera',
      ctaUrl: 'https://bca-pembatalan-transaksi.vip/form-batal'
    },
    rawHeaders: {
      from: 'HaloBCA Notification Center <layanan-nasabah@bca-layanan-pusat.net>',
      replyTo: 'phisher-drop@smtp-relay.cc',
      returnPath: 'bounce@free-smtp-relay.cc',
      senderIp: '94.102.61.12 (Server Anonim Luar Negeri)',
      spfRecord: 'FAIL (Domain tidak memiliki sertifikasi perbankan)',
      dkimRecord: 'NONE (Tidak ada tanda tangan kriptografi)',
      dmarcRecord: 'FAIL'
    },
    isPhishing: true,
    correctAction: 'fake',
    redFlags: [
      'Bank BCA resmi menggunakan domain @bca.co.id, BUKAN @bca-layanan-pusat.net.',
      'Header SPF: FAIL dan DKIM: NONE — membuktikan email ini bukan dari infrastruktur server bank.',
      'Menimbulkan rasa panik mendadak agar korban terburu-buru mengklik link pembatalan.',
      'Tautan pembatalan mengarah ke domain palsu berakhiran .vip.'
    ],
    explanation: 'PHISHING PANIK PERBANKAN! Pelaku memanfaatkan manipulasi emosi (fear & panic) seolah-olah tabungan korban terkuras. Ketika korban mengklik link pembatalan, korban akan diminta memasukkan user ID, PIN, dan kode OTP m-Banking!'
  },
  {
    id: 'email-ubbg-legit',
    title: 'Pengumuman Resmi PKM UBBG 2026',
    category: 'Institusi Kampus (.ac.id)',
    iconType: 'building',
    clientView: {
      senderDisplay: 'LPPM Universitas Bina Bangsa Getsempena',
      fromEmail: 'lppm@bbg.ac.id',
      toEmail: 'peserta.literasi@gmail.com',
      date: '13 Oktober 2026, 14:00 WIB',
      subject: 'Jadwal Simulasi Praktik Literasi Keamanan Siber Siswa',
      bodyText: 'Yth. Siswa & Siswi Peserta Literasi Digital,\n\nBerikut terlampir jadwal pelaksanaan demo simulasi keamanan siber kolaborasi UBBG Banda Aceh. Silakan mengakses modul pembelajaran melalui portal resmi universitas.',
      ctaText: 'Akses Portal Akademik UBBG',
      ctaUrl: 'https://bbg.ac.id/pkm-literasi'
    },
    rawHeaders: {
      from: 'LPPM Universitas Bina Bangsa Getsempena <lppm@bbg.ac.id>',
      replyTo: 'lppm@bbg.ac.id',
      returnPath: 'lppm@bbg.ac.id',
      senderIp: '103.111.80.25 (Server Kampus UBBG)',
      spfRecord: 'PASS (bbg.ac.id server terverifikasi)',
      dkimRecord: 'PASS',
      dmarcRecord: 'PASS'
    },
    isPhishing: false,
    correctAction: 'real',
    redFlags: [],
    explanation: 'EMAIL RESMI INSTITUSI PENDIDIKAN! Domain berakhiran .ac.id (Academy Indonesia) yang telah diautentikasi oleh Pengelola Nama Domain Internet Indonesia (PANDI). SPF dan DKIM lolos verifikasi.'
  },
  {
    id: 'email-lookalike-allpass',
    title: 'Peringatan Darurat Pembatasan Akun Microsoft 365',
    category: 'Serangan Lookalike Canggih (All-PASS)',
    iconType: 'alert',
    clientView: {
      senderDisplay: 'Microsoft Account Security',
      fromEmail: 'security@rnicrosoft-security.com',
      toEmail: 'siswa.pkm@sekolah.sch.id',
      date: '13 Oktober 2026, 16:45 WIB',
      subject: 'Tindakan Mendesak: Akun Anda Akan Dibekukan Dalam 24 Jam',
      bodyText: 'Yth. Pengguna Microsoft,\n\nKami mendeteksi aktivitas login yang mencurigakan pada akun Anda dari lokasi tidak dikenal. Demi melindungi data Anda, kami mewajibkan verifikasi kredensial segera.\n\nJika Anda tidak melakukan verifikasi ulang melalui tautan di bawah dalam waktu 24 jam, akun Anda akan dibekukan secara permanen.',
      ctaText: 'Verifikasi & Amankan Akun Sekarang',
      ctaUrl: 'https://rnicrosoft-security.com/verify-login'
    },
    rawHeaders: {
      from: 'Microsoft Account Security <security@rnicrosoft-security.com>',
      replyTo: 'security@rnicrosoft-security.com',
      returnPath: 'bounce@rnicrosoft-security.com',
      senderIp: '198.51.100.22 (Server Milik Penyerang)',
      spfRecord: 'PASS (Domain rnicrosoft-security.com mengesahkan IP pengirim)',
      dkimRecord: 'PASS (Signature "rnicrosoft-security.com" terverifikasi sah)',
      dmarcRecord: 'PASS (p=reject sp=reject)'
    },
    isPhishing: true,
    correctAction: 'fake',
    redFlags: [
      'Domain pengirim menggunakan "rnicrosoft-security.com" (huruf "r" dan "n" digabung mengecoh mata seolah-olah "m"), BUKAN "microsoft.com".',
      'Seluruh protokol keamanan (SPF, DKIM, DMARC) bertatus PASS karena peretas memiliki domain tiruan tersebut secara legal!',
      'Menyematkan ancaman pembekuan akun 24 jam untuk memaksa korban login di web tiruan.'
    ],
    explanation: 'SERANGAN HOMOGLYPH LOOKALIKE BERBAHAYA! Perhatikan nama domain: "rnicrosoft-security.com" (r+n terlihat mirip m di layar). Karena peretas menguasai domain tiruan ini, mereka membuat SPF, DKIM, dan DMARC lolos (PASS) 100%! Siswa cerdas tidak boleh hanya melihat centang hijau teknis, melainkan wajib memeriksa keaslian ejaan nama domain induknya!'
  }
];
