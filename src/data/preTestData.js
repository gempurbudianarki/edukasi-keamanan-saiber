// ================================================================
// SOAL PRE-TEST: DIAGNOSTIK AWAL LITERASI KEAMANAN SIBER GENERASI Z
// Program Kreativitas Mahasiswa (PKM) 2026
// Universitas Bina Bangsa Getsempena (UBBG) — Banda Aceh
// ================================================================

export const PRE_TEST_QUESTIONS = [
  {
    id: 'pre-1',
    number: 1,
    category: 'Konsep Keamanan Informasi',
    question: 'Apa yang dimaksud dengan prinsip Kerahasiaan (Confidentiality) dalam pilar utama keamanan informasi digital?',
    options: [
      { key: 'A', text: 'Memastikan data dan informasi hanya dapat diakses oleh pihak yang memiliki hak otorisasi sah' },
      { key: 'B', text: 'Menyebarkan seluruh informasi akun kepada rekan terdekat demi keterbukaan' },
      { key: 'C', text: 'Menghapus data penting secara permanen agar tidak dapat ditemukan kembali' },
      { key: 'D', text: 'Mengubah kata sandi akun secara otomatis setiap kali selesai login' }
    ],
    correctAnswer: 'A',
    explanation: 'Confidentiality (Kerahasiaan) adalah prinsip perlindungan data dari akses pihak yang tidak berhak, memastikan hanya pengguna berwenang yang dapat melihat informasi sensitif.'
  },
  {
    id: 'pre-2',
    number: 2,
    category: 'Rekayasa Sosial (Social Engineering)',
    question: 'Serangan rekayasa sosial (Social Engineering) sering kali berhasil mengelabui korban karena penyerang memanfaatkan faktor...?',
    options: [
      { key: 'A', text: 'Kelemahan sinyal internet dan perangkat keras smartphone' },
      { key: 'B', text: 'Kelemahan psikologis manusia seperti rasa panik, penasaran, dan ketidaktahuan' },
      { key: 'C', text: 'Kerusakan fisik pada kabel fiber optik jaringan telekomunikasi' },
      { key: 'D', text: 'Tingginya harga paket data internet yang digunakan korban' }
    ],
    correctAnswer: 'B',
    explanation: 'Rekayasa sosial mengeksploitasi kerentanan emosional dan psikologis manusia (seperti panik akun diblokir atau tergiur undian berhadiah) daripada meretas sistem komputer secara teknis.'
  },
  {
    id: 'pre-3',
    number: 3,
    category: 'Tanda & Ciri Tautan Phishing',
    question: 'Manakah dari ciri-ciri alamat tautan (URL) berikut yang patut dicurigai sebagai situs penipuan (Phishing)?',
    options: [
      { key: 'A', text: 'Menggunakan domain resmi lembaga berakhiran .go.id atau .ac.id' },
      { key: 'B', text: 'Memiliki sertifikat SSL valid dari situs universitas atau perbankan resmi' },
      { key: 'C', text: 'Menggunakan nama merek terkenal dengan ejaan keliru (typosquatting) seperti bca-klik-auth.xyz' },
      { key: 'D', text: 'Protokol alamat diawali https:// resmi dari portal instansi terdaftar' }
    ],
    correctAnswer: 'C',
    explanation: 'Pelaku phishing sering menggunakan teknik typosquatting dan ekstensi domain murah/tidak lazim (.xyz, .top, .club) untuk menyerupai alamat website asli instansi terpercaya.'
  },
  {
    id: 'pre-4',
    number: 4,
    category: 'Fungsi Otentikasi Ganda (2FA)',
    question: 'Apa keunggulan utama mengaktifkan Otentikasi Dua Langkah (Two-Factor Authentication / 2FA) pada akun media sosial?',
    options: [
      { key: 'A', text: 'Akun tetap terlindungi dari login ilegal meskipun kata sandi utama telah bocor atau diketahui orang lain' },
      { key: 'B', text: 'Membuat koneksi internet di ponsel menjadi dua kali lebih cepat' },
      { key: 'C', text: 'Menggandakan jumlah pengikut (followers) secara otomatis tanpa posting' },
      { key: 'D', text: 'Menghilangkan seluruh iklan yang muncul di aplikasi media sosial' }
    ],
    correctAnswer: 'A',
    explanation: '2FA mewajibkan faktor kedua (kode OTP atau verifikasi perangkat) saat login, sehingga penyerang yang mengetahui kata sandi korban tetap tidak bisa menembus akun.'
  },
  {
    id: 'pre-5',
    number: 5,
    category: 'Keamanan Kode OTP',
    question: 'Jika seseorang mengaku sebagai petugas layanan pelanggan (Customer Service) meminta kode OTP yang masuk ke SMS kamu, tindakan yang paling benar adalah...',
    options: [
      { key: 'A', text: 'Segera memberikan kode OTP tersebut demi kelancaran proses verifikasi akun' },
      { key: 'B', text: 'Membagikan kode OTP melalui tangkapan layar (screenshot) ke media sosial' },
      { key: 'C', text: 'Menolak tegas dan merahasiakan kode OTP karena pihak resmi tidak pernah meminta kode OTP pengguna' },
      { key: 'D', text: 'Meminta teman untuk memverifikasi dan menggunakan kode OTP tersebut' }
    ],
    correctAnswer: 'C',
    explanation: 'Kode OTP adalah kunci rahasia sekali pakai yang setara dengan tanda tangan elektronik. Pihak bank atau platform resmi TIDAK PERNAH meminta kode OTP dari pengguna.'
  },
  {
    id: 'pre-6',
    number: 6,
    category: 'Manajemen Kata Sandi',
    question: 'Praktik pengelolaan kata sandi yang PALING BERISIKO dan membahayakan keamanan akun digital adalah...',
    options: [
      { key: 'A', text: 'Menggunakan passphrase panjang lebih dari 14 karakter dengan kombinasi kata' },
      { key: 'B', text: 'Menggunakan satu kata sandi yang sama persis untuk semua akun email, media sosial, dan perbankan' },
      { key: 'C', text: 'Mengaktifkan aplikasi pengelola kata sandi (Password Manager) terpercaya' },
      { key: 'D', text: 'Mengganti kata sandi saat terindikasi ada aktivitas login yang mencurigakan' }
    ],
    correctAnswer: 'B',
    explanation: 'Menggunakan sandi yang sama di semua akun membuat efek domino (credential stuffing); jika salah satu situs bocor, seluruh akun lainnya ikut terjebol.'
  },
  {
    id: 'pre-7',
    number: 7,
    category: 'Privasi Data & Lokasi Realtime',
    question: 'Apa potensi bahaya dari kebiasaan menandai lokasi presisi secara langsung (live location tagging) pada unggahan media sosial publik?',
    options: [
      { key: 'A', text: 'Baterai smartphone menjadi lebih cepat panas dan rusak' },
      { key: 'B', text: 'Memudahkan pelaku kejahatan (stalker atau pencuri) memantau keberadaan fisik dan pola aktivitas harian korban' },
      { key: 'C', text: 'Kualitas foto atau video yang diunggah akan otomatis menurun drastis' },
      { key: 'D', text: 'Menghambat algoritma pencarian pertemanan di media sosial' }
    ],
    correctAnswer: 'B',
    explanation: 'Membagikan lokasi presisi secara realtime mempermudah pelaku stalking, perampokan rumah kosong, atau tindak kriminal fisik memetakan keberadaan korban.'
  },
  {
    id: 'pre-8',
    number: 8,
    category: 'Bahaya Doxing & Rekam Jejak',
    question: 'Mengapa mengunggah foto tiket pesawat, boarding pass, atau kartu identitas resmi di media sosial sangat berbahaya?',
    options: [
      { key: 'A', text: 'Barcode/QR code pada dokumen tersebut memuat data pribadi sensitif (NIK, kode booking, identitas lengkap) yang bisa disalahgunakan' },
      { key: 'B', text: 'Foto dokumen resmi dapat memperlambat kecepatan kuota internet pengunggah' },
      { key: 'C', text: 'Algoritma media sosial akan otomatis memblokir postingan yang memuat kertas' },
      { key: 'D', text: 'Dapat merusak resolusi optik kamera smartphone pengunggah' }
    ],
    correctAnswer: 'A',
    explanation: 'Tiket dan identitas resmi memuat barcode/QR code yang menyimpan NIK, nomor paspor, dan kredensial pribadi yang dapat diekstrak oleh penipu untuk pemalsuan identitas atau pembajakan tiket.'
  },
  {
    id: 'pre-9',
    number: 9,
    category: 'Ancaman File APK Modifikasi',
    question: 'Banyak pelajar mengunduh aplikasi modifikasi gratisan (APK Mod) di luar toko aplikasi resmi. Bahaya utama dari tindakan ini adalah...',
    options: [
      { key: 'A', text: 'File APK modifikasi sering disisipi malware/trojan yang dapat menyadap SMS, kontak, dan mencuri data rekening' },
      { key: 'B', text: 'Tampilan grafis aplikasi modifikasi menjadi terlalu tajam untuk mata pelajar' },
      { key: 'C', text: 'Ukuran file aplikasi modifikasi selalu jauh lebih kecil dari aslinya' },
      { key: 'D', text: 'Aplikasi modifikasi tidak dapat dibuka sama sekali di jaringan Wi-Fi' }
    ],
    correctAnswer: 'A',
    explanation: 'APK modifikasi dari situs pihak ketiga tidak melewati verifikasi keamanan dan kerap dimodifikasi menjadi dropper trojan perbankan atau spyware penyadap pesan.'
  },
  {
    id: 'pre-10',
    number: 10,
    category: 'Gejala & Mitigasi Ransomware',
    question: 'Perangkat komputer atau smartphone yang terinfeksi ransomware umumnya menunjukkan gejala utama berupa...',
    options: [
      { key: 'A', text: 'Seluruh file dokumen dan foto berubah ekstensi menjadi terkunci/terenkripsi dan muncul pesan pemerasan tebusan uang' },
      { key: 'B', text: 'Layar monitor memancarkan cahaya yang berkedip sangat cepat secara permanen' },
      { key: 'C', text: 'Speaker perangkat memutar file musik secara otomatis tanpa henti' },
      { key: 'D', text: 'Keyboard perangkat mengetik angka secara berurutan secara acak' }
    ],
    correctAnswer: 'A',
    explanation: 'Ransomware mengenkripsi file penting dengan algoritma kuat dan menampilkan berkas catatan tebusan (ransom note) yang menuntut pembayaran uang untuk dekripsi file.'
  },
  {
    id: 'pre-11',
    number: 11,
    category: 'Risiko Jaringan Wi-Fi Publik',
    question: 'Ketika terpaksa menggunakan jaringan Wi-Fi umum di kafe atau taman kota, langkah pencegahan keamanan yang paling tepat adalah...',
    options: [
      { key: 'A', text: 'Melakukan transaksi belanja online dengan nomor kartu kredit' },
      { key: 'B', text: 'Menggunakan jaringan privat virtual (VPN) dan menghindari login ke layanan perbankan atau data sensitif' },
      { key: 'C', text: 'Membuka semua folder sharing agar pengguna lain bisa melihat file pribadi' },
      { key: 'D', text: 'Mematikan fitur proteksi antivirus bawaan perangkat sistem' }
    ],
    correctAnswer: 'B',
    explanation: 'Jaringan Wi-Fi publik terbuka tanpa enkripsi rentan terhadap sniffing dan intersepsi data (Man-In-The-Middle). VPN mengenkripsi seluruh terowongan data lalu lintas internet.'
  },
  {
    id: 'pre-12',
    number: 12,
    category: 'Verifikasi Pengirim Email (Spoofing)',
    question: 'Sebuah email mengaku dari Instagram meminta verifikasi hak cipta dalam waktu 24 jam dengan alamat pengirim security-team@instagram-verify-support.xyz. Indikasi email tersebut adalah...',
    options: [
      { key: 'A', text: 'Email resmi karena menyertakan logo resmi Instagram di dalamnya' },
      { key: 'B', text: 'Email penipuan (Email Spoofing / Phishing) karena domain pengirim bukan domain resmi @mail.instagram.com' },
      { key: 'C', text: 'Email darurat yang wajib segera diklik agar akun tidak terhapus' },
      { key: 'D', text: 'Email rutin dari pihak penyedia koneksi internet rumah' }
    ],
    correctAnswer: 'B',
    explanation: 'Domain pengirim palsu dengan nama domain aneh (.xyz) dan ancaman urgensi waktu adalah ciri khas klasik serangan phishing email. Logo resmi dapat dicuri dan disisipkan dengan mudah oleh penipu.'
  },
  {
    id: 'pre-13',
    number: 13,
    category: 'Pemulihan Akun / Tanggap Insiden',
    question: 'Jika kamu tiba-tiba menerima notifikasi login tak dikenal dari lokasi yang jauh pada akun media sosialmu, tindakan darurat PERTAMA adalah...',
    options: [
      { key: 'A', text: 'Membiarkan saja karena mungkin hanya kesalahan server platform' },
      { key: 'B', text: 'Segera klik opsi "Bukan Saya", ganti kata sandi, dan gunakan fitur "Keluarkan dari Semua Perangkat Lain"' },
      { key: 'C', text: 'Mematikan sambungan listrik rumah secara mendadak' },
      { key: 'D', text: 'Mengirim pesan chat peringatan kepada akun yang dicurigai' }
    ],
    correctAnswer: 'B',
    explanation: 'Fitur terminate all active sessions (keluarkan dari semua perangkat) dan segera ganti kata sandi akan memutus akses penyerang yang sedang memegang token login akunmu.'
  },
  {
    id: 'pre-14',
    number: 14,
    category: 'Etika & Pencegahan Hoaks',
    question: 'Manakah dari tindakan berikut yang mencerminkan literasi keamanan siber yang baik dalam menyikapi tautan undian hadiah di grup WhatsApp?',
    options: [
      { key: 'A', text: 'Langsung meneruskan pesan tersebut ke sepuluh kontak teman terdekat' },
      { key: 'B', text: 'Melakukan cek fakta pada situs resmi atau kanal verifikasi anti-hoaks sebelum mempercayai atau membagikannya' },
      { key: 'C', text: 'Membuka tautan dan mengisi formulir nomor kartu keluarga lengkap' },
      { key: 'D', text: 'Mengajak rekan lain untuk segera mendaftar undian tersebut bersama-sama' }
    ],
    correctAnswer: 'B',
    explanation: 'Literasi siber menuntut sikap kritis memverifikasi informasi dan tautan hadiah gratis melalui kanal resmi (seperti TurnBackHoax atau portal resmi instansi) guna memutus rantai penipuan siber.'
  },
  {
    id: 'pre-15',
    number: 15,
    category: 'Tujuan Pre-Test & Post-Test',
    question: 'Mengapa pengukuran tingkat pemahaman awal (Pre-Test) sangat penting dalam program edukasi literasi keamanan siber?',
    options: [
      { key: 'A', text: 'Untuk memberikan hukuman bagi peserta didik yang memiliki pengetahuan rendah' },
      { key: 'B', text: 'Untuk memetakan tingkat literasi dasar peserta sebelum intervensi pembelajaran sehingga efektivitas peningkatan (N-Gain) dapat terukur akurat' },
      { key: 'C', text: 'Agar peserta merasa cemas sebelum memulai simulasi praktik di laboratorium' },
      { key: 'D', text: 'Menghabiskan waktu alokasi kegiatan pembelajaran PKM' }
    ],
    correctAnswer: 'B',
    explanation: 'Pre-Test berfungsi sebagai baseline diagnostik untuk mengukur pemahaman awal peserta, sehingga setelah simulasi dan Post-Test selesai, peningkatan pemahaman (efektivitas edukasi PKM) dapat dievaluasi secara ilmiah.'
  }
];

export const PRE_TEST_ANSWER_KEY = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'A',
  5: 'C',
  6: 'B',
  7: 'B',
  8: 'A',
  9: 'A',
  10: 'A',
  11: 'B',
  12: 'B',
  13: 'B',
  14: 'B',
  15: 'B'
};
