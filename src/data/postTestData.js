// ================================================================
// SOAL POST-TEST: PENINGKATAN LITERASI KEAMANAN SIBER GENERASI Z
// Program Kreativitas Mahasiswa (PKM) 2026
// Universitas Bina Bangsa Getsempena (UBBG) — Banda Aceh
// ================================================================

export const POST_TEST_QUESTIONS = [
  {
    id: 'post-1',
    number: 1,
    category: 'Tujuan Literasi Siber',
    question: 'Apa Tujuan Utama Dari Peningkatan Literasi Keamanan Siber Bagi Pelajar Dan Mahasiswa Generasi Z Di Era Media Sosial?',
    options: [
      { key: 'A', text: 'Menghapus Seluruh Akun Media Sosial Milik Peserta Didik' },
      { key: 'B', text: 'Meningkatkan Pemahaman Dan Kemampuan Dalam Mengenali, Mencegah, Serta Mengatasi Ancaman Digital' },
      { key: 'C', text: 'Menjadi Peretas (Hacker) Profesional Yang Handal' },
      { key: 'D', text: 'Membatasi Penggunaan Internet Hanya Pada Jam Sekolah Atau Kuliah' }
    ],
    correctAnswer: 'B',
    explanation: 'Literasi siber bertujuan membekali generasi muda agar cerdas dan tanggap dalam mendeteksi ancaman, melindungi privasi, dan mencegah kejahatan siber tanpa harus membatasi interaksi positif.'
  },
  {
    id: 'post-2',
    number: 2,
    category: 'Privasi & Oversharing',
    question: 'Fenomena Ketika Seseorang Membagikan Informasi Pribadi Secara Berlebihan Di Media Sosial Sehingga Memicu Risiko Keamanan Siber Disebut...?',
    options: [
      { key: 'A', text: 'Cyberbullying' },
      { key: 'B', text: 'Oversharing' },
      { key: 'C', text: 'Phishing' },
      { key: 'D', text: 'Ransomware' }
    ],
    correctAnswer: 'B',
    explanation: 'Oversharing adalah kebiasaan membagikan data atau kegiatan pribadi secara berlebihan (seperti lokasi realtime, tiket, identitas) yang dapat dieksploitasi oleh pelaku kejahatan.'
  },
  {
    id: 'post-3',
    number: 3,
    category: 'Deteksi Phishing',
    question: 'Metode Penipuan Digital Yang Bertujuan Memancing Korban Agar Memberikan Data Sensitif (Seperti Kata Sandi Atau PIN) Melalui Tautan Palsu Di Media Sosial Disebut...',
    options: [
      { key: 'A', text: 'Doxing' },
      { key: 'B', text: 'Phishing' },
      { key: 'C', text: 'Malware' },
      { key: 'D', text: 'Spoofing' }
    ],
    correctAnswer: 'B',
    explanation: 'Phishing adalah teknik penipuan rekayasa sosial yang menggunakan tautan dan situs tiruan palsu untuk mencuri kredensial login, kata sandi, maupun PIN dompet digital.'
  },
  {
    id: 'post-4',
    number: 4,
    category: 'Kejahatan Digital (Doxing)',
    question: 'Tindakan Menyebarkan Data Pribadi Seseorang Ke Publik Tanpa Izin Melalui Platform Digital Dinamakan...',
    options: [
      { key: 'A', text: 'Doxing' },
      { key: 'B', text: 'Phishing' },
      { key: 'C', text: 'Spamming' },
      { key: 'D', text: 'Hacking' }
    ],
    correctAnswer: 'A',
    explanation: 'Doxing (atau doxxing) adalah tindakan mencari dan mempublikasikan informasi pribadi seseorang secara daring tanpa persetujuan dengan tujuan mempermalukan, mengancam, atau merugikan korban.'
  },
  {
    id: 'post-5',
    number: 5,
    category: 'Karakteristik Gen-Z',
    question: 'Mengapa Generasi Z Dinilai Rentan Terhadap Ancaman Digital Di Era Gempuran Media Sosial?',
    options: [
      { key: 'A', text: 'Karena Generasi Z Tidak Tahu Cara Mengoperasikan Smartphone' },
      { key: 'B', text: 'Tingginya Intensitas Aktivitas Digital Tidak Selalu Diimbangi Dengan Kesadaran Privasi Dan Keamanan' },
      { key: 'C', text: 'Karena Media Sosial Hanya Dirancang Khusus Untuk Generasi Tua' },
      { key: 'D', text: 'Perangkat Smartphone Masa Kini Sangat Mudah Rusak' }
    ],
    correctAnswer: 'B',
    explanation: 'Meskipun sangat fasih teknologi (digital native), tingginya frekuensi bermedia sosial sering kali tidak dibarengi dengan pemahaman risiko celah keamanan dan privasi data.'
  },
  {
    id: 'post-6',
    number: 6,
    category: 'Otentikasi Dua Faktor (2FA)',
    question: 'Fitur Keamanan Yang Memberikan Lapisan Perlindungan Ganda Pada Akun Media Sosial Dengan Membutuhkan Verifikasi Tambahan Disebut...',
    options: [
      { key: 'A', text: 'One-Time Password (OTP)' },
      { key: 'B', text: 'Two-Factor Authentication (2FA) / Otentikasi Dua Faktor' },
      { key: 'C', text: 'Single Sign-On (SSO)' },
      { key: 'D', text: 'End-To-End Encryption' }
    ],
    correctAnswer: 'B',
    explanation: 'Two-Factor Authentication (2FA) mewajibkan dua bukti otentikasi (kata sandi + kode OTP/push notification), sehingga akun tetap terlindungi meski kata sandi diketahui hacker.'
  },
  {
    id: 'post-7',
    number: 7,
    category: 'Kekuatan Kata Sandi',
    question: 'Karakteristik Kata Sandi (Password) Yang Kuat Untuk Mengamankan Akun Media Sosial Adalah...',
    options: [
      { key: 'A', text: 'Menggunakan Tanggal Lahir Agar Mudah Diingat' },
      { key: 'B', text: 'Menggunakan Susunan Angka Berurutan Seperti 123456' },
      { key: 'C', text: 'Kombinasi Acak Huruf Besar, Huruf Kecil, Angka, Dan Simbol Unik' },
      { key: 'D', text: 'Menggunakan Nama Akun Media Sosial Itu Sendiri' }
    ],
    correctAnswer: 'C',
    explanation: 'Kata sandi yang tangguh memiliki entropi tinggi yang terdiri dari variasi huruf besar, kecil, angka, dan karakter simbol khusus untuk menangkal serangan brute-force.'
  },
  {
    id: 'post-8',
    number: 8,
    category: 'Kewaspadaan Tautan Asing',
    question: 'Langkah Terbaik Ketika Menerima Tautan Dari Teman Di Media Sosial Yang Mengarahkan Ke Situs Asing Berhadiah Gratis Adalah...',
    options: [
      { key: 'A', text: 'Langsung Mengklik Tautan Dan Mengisi Data Pribadi' },
      { key: 'B', text: 'Membagikan Tautan Tersebut Ke Grup Chat Lain' },
      { key: 'C', text: 'Mengabaikan Dan Memverifikasi Kebenaran Informasi Kepada Pengirim Terlebih Dahulu' },
      { key: 'D', text: 'Menghapus Aplikasi Media Sosial Dari Perangkat' }
    ],
    correctAnswer: 'C',
    explanation: 'Banyak akun teman yang telah diretas menyebarkan pesan otomatis berisi link phishing. Wajib verifikasi dan jangan sembarangan mengklik tautan mencurigakan.'
  },
  {
    id: 'post-9',
    number: 9,
    category: 'Pembaruan Perangkat Lunak',
    question: 'Mengabaikan Pembaruan Perangkat Lunak (Software Update) Pada Perangkat HP Atau Laptop Berdampak Negatif Karena...',
    options: [
      { key: 'A', text: 'Membuat Kuota Internet Cepat Habis' },
      { key: 'B', text: 'Celah Keamanan (Vulnerability) Lama Tidak Tertutup Sehingga Rawan Disusupi Malware' },
      { key: 'C', text: 'Mengubah Pengaturan Kata Sandi Secara Otomatis' },
      { key: 'D', text: 'Menghapus Seluruh File Foto Secara Spontan' }
    ],
    correctAnswer: 'B',
    explanation: 'Pembaruan sistem berkala membawa patch keamanan (security patch) untuk menambal celah rentan yang biasanya dieksploitasi malware atau hacker.'
  },
  {
    id: 'post-10',
    number: 10,
    category: 'Rekayasa Sosial (Social Engineering)',
    question: 'Istilah Rekayasa Sosial Di Mana Pelaku Memanipulasi Psikologis Korban Agar Menyerahkan Informasi Rahasia Di Era Digital Adalah...',
    options: [
      { key: 'A', text: 'Social Engineering' },
      { key: 'B', text: 'Social Media Optimization' },
      { key: 'C', text: 'Digital Marketing' },
      { key: 'D', text: 'Content Creation' }
    ],
    correctAnswer: 'A',
    explanation: 'Social Engineering adalah seni memanipulasi emosi dan psikologi manusia (rasa panik, penasaran, atau tergiur hadiah) agar korban tanpa sadar menyerahkan data kredensial rahasia.'
  },
  {
    id: 'post-11',
    number: 11,
    category: 'Keamanan Wi-Fi Publik',
    question: 'Penggunaan Jaringan Wi-Fi Publik Tanpa Enkripsi Untuk Transaksi Penting Atau Login Akun Pribadi Memiliki Risiko...',
    options: [
      { key: 'A', text: 'Perangkat Menjadi Cepat Panas' },
      { key: 'B', text: 'Baterai HP Terkuras Habis Dalam Seketika' },
      { key: 'C', text: 'Penyadapan Data (Man-In-The-Middle Attack) Oleh Pihak Yang Tidak Bertanggung Jawab' },
      { key: 'D', text: 'Sinyal Seluler Terputus Secara Permanen' }
    ],
    correctAnswer: 'C',
    explanation: 'Wi-Fi publik yang terbuka rawan disusupi penyerang melalui Man-In-The-Middle (MITM) attack untuk mencegat paket data lalu lintas transaksi perbankan dan akun pribadi.'
  },
  {
    id: 'post-12',
    number: 12,
    category: 'Malware & Ransomware',
    question: 'Jenis Perangkat Lunak Berbahaya Yang Mengunci Atau Mengenkripsi Data Korban Lalu Meminta Tebusan Uang Dinamakan...',
    options: [
      { key: 'A', text: 'Spyware' },
      { key: 'B', text: 'Ransomware' },
      { key: 'C', text: 'Adware' },
      { key: 'D', text: 'Spamware' }
    ],
    correctAnswer: 'B',
    explanation: 'Ransomware mengenkripsi file penting korban dengan kunci kriptografi kuat dan menuntut tebusan uang (biasanya cryptocurrency) untuk membuka kuncinya.'
  },
  {
    id: 'post-13',
    number: 13,
    category: 'Etika & Verifikasi Informasi',
    question: 'Sikap Bijak Yang Perlu Diterapkan Mahasiswa Dan Pelajar Saat Menerima Informasi Yang Belum Jelas Kebenarannya Di Media Sosial Adalah...',
    options: [
      { key: 'A', text: 'Saring Sebelum Sharing Dengan Memeriksa Kebenaran Sumber Berita Terlebih Dahulu' },
      { key: 'B', text: 'Langsung Membagikan Berita Ke Semua Grup Media Sosial' },
      { key: 'C', text: 'Mengomentari Postingan Dengan Ujaran Kebencian' },
      { key: 'D', text: 'Menyebarkan Rumor Tanpa Verifikasi' }
    ],
    correctAnswer: 'A',
    explanation: 'Prinsip "Saring Sebelum Sharing" mencegah peredaran hoaks dan penipuan siber dengan memeriksa kredibilitas sumber informasi sebelum diteruskan ke orang lain.'
  },
  {
    id: 'post-14',
    number: 14,
    category: 'Mitigasi Insiden Akun Diretas',
    question: 'Jika Akun Media Sosial Mengalami Peretasan (Hack), Langkah Darurat Pertama Yang Paling Tepat Dilakukan Adalah...',
    options: [
      { key: 'A', text: 'Membiarkan Akun Dan Tidak Mengambil Tindakan Apapun' },
      { key: 'B', text: 'Melakukan Reset Password Jika Masih Memiliki Akses Atau Melapor Ke Pusat Bantuan Resmi Platform' },
      { key: 'C', text: 'Mengunduh Aplikasi Peretas Buatan Pihak Ketiga Yang Tidak Dikenal' },
      { key: 'D', text: 'Membuat Akun Baru Dan Mengabaikan Akun Lama Yang Diretas' }
    ],
    correctAnswer: 'B',
    explanation: 'Langkah mitigasi cepat adalah segera reset kata sandi serta putuskan semua sesi login aktif, atau minta pemulihan akun melalui saluran bantuan resmi platform.'
  },
  {
    id: 'post-15',
    number: 15,
    category: 'Dampak Literasi Keamanan Siber',
    question: 'Manfaat Utama Dari Peningkatan Literasi Keamanan Siber Bagi Generasi Z Adalah...',
    options: [
      { key: 'A', text: 'Mampu Melakukan Peretasan Pada Akun Orang Lain' },
      { key: 'B', text: 'Terciptanya Lingkungan Digital Yang Aman, Etis, Dan Produktif Bagi Pelajar Serta Mahasiswa' },
      { key: 'C', text: 'Menghentikan Perkembangan Teknologi Media Sosial Secara Total' },
      { key: 'D', text: 'Mengurangi Kebutuhan Akan Sistem Keamanan Data' }
    ],
    correctAnswer: 'B',
    explanation: 'Meningkatnya kesadaran keamanan digital melahirkan ekosistem internet yang sehat, aman dari kejahatan, serta mendukung generasi muda berkarya secara produktif dan positif.'
  }
];

export const POST_TEST_ANSWER_KEY = {
  1: 'B',
  2: 'B',
  3: 'B',
  4: 'A',
  5: 'B',
  6: 'B',
  7: 'C',
  8: 'C',
  9: 'B',
  10: 'A',
  11: 'C',
  12: 'B',
  13: 'A',
  14: 'B',
  15: 'B'
};
