# Spesifikasi Desain: Portal Simulasi Literasi Keamanan Siber Gen Z (PKM UBBG)

**Tanggal:** 13 Oktober 2026  
**Penanggung Jawab Teknis & Praktik:** Gempur Budi Anarki  
**Institusi:** Universitas Bina Bangsa Getsempena (UBBG)  
**Target Pengguna:** Siswa / Pelajar (Generasi Z)  
**Platform Target:** Web App (React + Vite, Responsive Mobile & Desktop, Siap Deploy ke Vercel)

---

## 1. Latar Belakang & Tujuan
Kegiatan Pengabdian kepada Masyarakat (PKM) bertema *"Peningkatan Literasi Keamanan Syber pada Generasi Z dalam Menghadapi Ancaman Digital di Era Gempuran Media Sosial bagi Para Pelajar"* membutuhkan media praktik dan demonstrasi interaktif langsung.

Aplikasi ini dirancang sebagai platform web interaktif mandiri yang mencakup 4 pilar tugas praktik:
1. Mengenali tautan phishing.
2. Mengaktifkan verifikasi dua langkah (2FA).
3. Mengecek kekuatan kata sandi dan simulasi waktu retas (*brute-force*).
4. Mengatur privasi akun media sosial untuk mencegah *oversharing* dan *doxxing*.

---

## 2. Arsitektur Sistem & Teknologi
* **Frontend Framework:** React 18 / 19 + Vite.
* **Styling & Design System:** Modern Vanilla CSS dengan CSS Variables, Cyberpunk Dark Theme (`#0a0b10`, `#00f0ff`, `#8a2be2`, `#10b981`, `#f43f5e`), Glassmorphism cards, micro-interactions, dan fully responsive (mobile-first untuk HP siswa dan Presenter Mode untuk proyektor 1080p/4K).
* **Ikonografi:** `lucide-react`.
* **Efek & Gamifikasi:** `canvas-confetti` saat menuntaskan seluruh modul, Web Audio API sintetis untuk sound effect klik & keberhasilan.
* **Hosting & Deployment:** Vercel (static site build `dist`, zero-backend dependency).

---

## 3. Komponen Antarmuka & Alur Pengguna

### 3.1. Layout & Navigasi
* **Header / Navbar:**
  * Logo & Branding: *CyberGenZ Simulator - UBBG PKM*.
  * Total Skor & Lencana Kemajuan (Progress 0/4 Misi).
  * Tombol **Presenter Mode** (menaikkan skala font 120% dan kontras untuk proyektor).
  * Tombol **Audio Mute/Unmute**.
  * Tombol **Reset Data**.
* **Mission Hub (Dashboard):**
  * Kartu 4 Misi Interaktif dengan indikator status (*Belum Dimulai*, *Sedang Berjalan*, *Selesai*).
  * Progress Bar keseluruhan.

### 3.2. Rincian 4 Modul Interaktif

#### Modul 1: Phishing Radar (Mengenali Tautan Phishing)
* **Skenario Kasus:**
  * Skenario 1: Undangan Pernikahan digital berkas `.apk` di WhatsApp.
  * Skenario 2: DM Instagram ancaman suspensi akun dari domain tiruan `instagram-security-check.xyz`.
  * Skenario 3: SMS broadcast bantuan kuota internet Kemendikbud link `kemdikbud-kuota-gratis.club`.
  * Skenario 4: Tautan diamond gratis game online.
* **Fitur Utama:**
  * Tampilan mockup pesan WhatsApp / Instagram DM / SMS asli.
  * Fitur **Inspeksi Tautan (URL Inspector)**: membedah protokol, subdomain tipuan, domain utama, dan ekstensi file.
  * Tombol aksi: "Buka Tautan" (simulasi layar terkunci malware) vs "Laporkan & Blokir" (pilihan tepat).
  * Ulasan forensik edukatif setelah setiap jawaban.

#### Modul 2: Benteng 2FA (Aktivasi & Verifikasi Dua Langkah)
* **Fitur Utama:**
  * **Simulasi Perbandingan Langsung:**
    * *Skenario Tanpa 2FA:* Hacker memasukkan password bocor dan langsung berhasil masuk mencuri akun.
    * *Skenario Dengan 2FA Aktif:* Hacker mencoba masuk dengan password yang sama, namun terblokir karena tertahan layar verifikasi kode OTP/Authenticator.
  * **Simulator Aktivasi Interaktif:**
    * Langkah 1: Pilih metode 2FA (Aplikasi Authenticator Google/Microsoft atau SMS OTP).
    * Langkah 2: Simulasi scan QR / terima kode 6-digit pada layar HP virtual dengan hitung mundur 30 detik.
    * Langkah 3: Konfirmasi kode dan aktivasi sukses.

#### Modul 3: Password Vault (Kekuatan Sandi & Brute-Force)
* **Fitur Utama:**
  * Input password interaktif dengan garansi privasi lokal (*client-side only*).
  * Indikator kekuatan real-time (Kombinasi panjang >= 12, simbol, angka, huruf kapital/kecil).
  * **Kalkulator Waktu Retas Komputer Hacker:** Menampilkan estimasi matematis waktu yang dibutuhkan komputer modern untuk meretas sandi tersebut.
  * **Passphrase Generator:** Generator kata sandi aman berbasis 3-4 kata Indonesia yang mudah diingat (contoh: `Kucing-Lompat-Bintang-99!`).

#### Modul 4: Privacy Shield (Audit Privasi Akun Media Sosial)
* **Fitur Utama:**
  * Mockup profil akun media sosial (Instagram/TikTok style).
  * **Interactive Settings Toggle:**
    * Akun Privat vs Publik.
    * Sembunyikan Lokasi Presisi (Geotagging).
    * Batasi Mention & Tag Hanya untuk Teman Dekat.
    * Filter Pesan Langsung (DM) dari Pengguna Asing.
    * Sembunyikan Kontak Pribadi (Nomor HP / Email).
  * **Privacy Health Meter (0 - 100%):** Skor privasi bergerak dinamis berdasarkan konfigurasi tombol, disertai edukasi bahaya *doxxing* dan *cyber stalking*.

### 3.3. Sertifikat & Lencana Kelulusan Digital
* Setelah 4 misi diselesaikan, modal penghargaan muncul.
* Siswa dapat memasukkan nama lengkap mereka.
* Menampilkan kartu sertifikat digital *"Gen Z Cyber Defender"* resmi berlogo UBBG dan judul kegiatan PKM.
* Tombol cetak / simpan screenshot kartu sertifikat untuk dokumentasi siswa.

---

## 4. Rencana Pengujian
* Responsivitas pada layar smartphone (360px - 430px) dan laptop proyektor (1366px - 1920px).
* Validasi kalkulator password tanpa dependensi eksternal yang lambat.
* Navigasi intuitif untuk siswa tanpa panduan manual yang berbelit-belit.
* Build verifikasi (`npm run build`) bersih tanpa warning/error untuk kemudahan deploy ke Vercel.
