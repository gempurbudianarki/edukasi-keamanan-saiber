# CyberGenZ Simulator
### Platform Simulasi Edukasi Keamanan Siber & Literasi Digital Interaktif Siswa
**Program Kreativitas Mahasiswa (PKM) 2026**  
**Universitas Bina Bangsa Getsempena (UBBG) — Banda Aceh**  
*Penanggung Jawab Teknis & Praktik: Gempur Budi Anarki*

---

## 📌 Latar Belakang & Tujuan

Meningkatnya kejahatan siber di Indonesia—mulai dari penipuan APK berkedok kurir/surat undangan, pencurian saldo dompet digital (DANA Kaget palsu), pembajakan akun media sosial akibat ketiadaan 2FA, hingga kebocoran data pribadi (*doxxing* dan *cyber stalking*)—sebagian besar menyasar kalangan pelajar dan remaja generasi muda (Gen-Z).

**CyberGenZ Simulator** dibangun sebagai media pembelajaran berbasis web praktis, interaktif, dan visual 1:1. Siswa tidak hanya membaca teori, melainkan merasakan langsung:
1. Menghadapi situs tiruan dan rekayasa sosial secara aman di dalam *sandboxed virtual browser*.
2. Menyaksikan terminal peretas melakukan serangan *credential stuffing* dan bagaimana perisai 2FA menggagalkannya.
3. Menguji ketahanan kata sandi secara matematis terhadap *cluster* superkomputer peretas.
4. Mengaudit celah kebocoran privasi pada profil media sosial virtual ala Instagram/TikTok.

---

## 🚀 4 Modul Misi Utama

```
========================================================================
                      CYBERGENZ SIMULATOR ARCHITECTURE
========================================================================
   [01. Phishing Radar]    --> Web 1:1, DANA Kaget, APK Scam, Email & Domain
   [02. Benteng 2FA]       --> Kali Linux HydraBot vs Push Challenge 1:1
   [03. Password Vault]    --> Shannon Entropy, GPU Cluster HUD, Passphrase
   [04. Privacy Shield]    --> Virtual Instagram Audit, Geotagging & Doxxing
========================================================================
```

### 1. Misi 01: Radar Phishing (Deteksi Rekayasa Sosial)
* **Simulasi Browser Web 1:1 Nyata**:
  - Simulasi klaim **DANA Kaget Rp 250.000** (alur 3 tahap: Input No. HP ➔ PIN 6 Digit ➔ Pengalihan ke Kode OTP SMS).
  - Simulasi unduhan **CapCut Pro Mod APK** (tampilan installer Android 1:1 dengan izin berbahaya SMS/Kontak).
  - Simulasi **Login Akun Belajar.id Google**, **Undangan Pernikahan Digital (.apk)**, **Peringatan Suspensi Instagram**, dan **Hadiah Diamond Mobile Legends Gratis**.
* **Konsekuensi Peretasan DEFCON-1**:
  - Jika siswa tertipu memasukkan kredensial, sistem memicu simulasi darurat militer: lampu bahaya merah menyala, sirine pertahanan udara berbunyi, dan analisis kerugian nyata ditampilkan dalam 3 kolom tanpa mengharuskan pengguna menggulir (*zero-scroll layout*).
* **Drill Pembanding Domain & Email Spoofing**:
  - Latihan mengenali manipulasi nama domain (*typosquatting*, karakter homoglif) dan pemalsuan header pengirim email (*Display Name Spoofing*).

### 2. Misi 02: Benteng 2FA (Verifikasi Dua Langkah & Tameng Akun)
* **Arena Pertarungan Siber Realistis**:
  - **Sisi Kiri (Terminal Kali Linux Attacker)**: Menampilkan eksekusi bot brute-force secara *live* menggunakan kamus `rockyou.txt` disertai suara ketukan keyboard mekanik.
  - **Sisi Kanan (Smartphone iPhone Virtual dengan Dynamic Island)**:
    - **Tanpa 2FA**: Layar ponsel bergetar keras (*vibration shake animation*), layar berubah merah, dan muncul notifikasi force-logout karena token sesi dibajak dari IP asing (Rusia).
    - **Dengan 2FA Aktif**: Notifikasi push keamanan meluncur turun dari *Dynamic Island* lengkap dengan nada dering ganda. Siswa dapat menekan tombol **"TOLAK & BLOKIR"**, seketika memicu tameng energi hijau (*holographic shield*) dan memblokir IP peretas secara permanen.
* **Praktik Aktivasi 2FA Mandiri**:
  - Panduan memilih metode: *Aplikasi Authenticator TOTP (Aman & Kebal SIM Swap)* vs *SMS OTP*.
  - Simulasi pindai QR Code dengan animasi laser merah dan *Secret Key*.
  - Indikator melingkar 30 detik (*RFC 6238 TOTP Standard*) dengan input 6 kotak PIN terpisah yang berpindah otomatis (*auto-focusing*).
  - Penerbitan 4 kode pemulihan darurat (*Emergency Backup Codes*).

### 3. Misi 03: Password Vault (Kriptografi Sandi & Telemetri Bobol)
* **HUD Telemetri Komputasi Superkomputer**:
  - Menyimulasikan kekuatan *GPU Cluster (8x NVIDIA RTX 4090)* dengan kapasitas uji **100 Miliar Hash/Detik (100 GH/s)**.
  - **Live Hash Stream**: Menghitung dan menampilkan kalkulasi hash target *SHA256* secara *real-time* saat huruf diketik.
  - Menghitung **Shannon Bit Entropy** ($E = L \times \log_2(R)$), estimasi waktu retas hacker, dan ukuran *character pool*.
* **5-Segment Strength Meter**:
  - Indikator 5 warna berpendar: Merah (*Sangat Lemah*) ➔ Oranye (*Lemah*) ➔ Kuning (*Sedang*) ➔ Hijau (*Kuat*) ➔ Cyan Glowing Neon (*Brankas Baja*).
* **Generator Passphrase Indonesia 4-Blok Token**:
  - Merakit kata sandi standar NIST menggunakan 4 blok token kata Indonesia bermakna (misal: `[Garuda] - [Samudra] - [Mentari] - [99$]`).
  - Fitur acak ulang per kata secara individu dan salin ke clipboard dalam 1 klik.

### 4. Misi 04: Privacy Shield (Audit Jejak & Privasi Media Sosial)
* **1:1 Mockup Profil Instagram Virtual**:
  - Bodi smartphone lengkap dengan notch, status bar (WiFi, baterai), nama akun `@pelajar_kekinian`, dan lingkaran gradien Instagram (*story ring*).
  - Deretan *Story Highlights* dan feed galeri 6 foto dengan jumlah *likes*.
  - Deteksi bahaya *oversharing*: lencana nama sekolah terbaca, lokasi kafe tersemat, tiket dengan barcode rahasia, dan nomor rumah.
* **Frosted Glass Private Lock Overlay**:
  - Begitu akun disetel privat, galeri foto otomatis dilapisi efek kaca buram (*glassmorphism blur*) dengan gembok pengaman hijau sehingga penguntit (*stalker*) tidak dapat mengintip.
* **Panel Sakelar Audit iOS & Radar Doxxing**:
  - 6 sakelar konfigurasi privasi: Akun Privat, Geotagging Lokasi Presisi, Pembatasan Mention, Filter DM, Penyembunyian Kontak WA, dan Cerita Teman Dekat.
  - Skor kerentanan privasi berubah secara *real-time* dari 0% (*Bahaya Doxxing Ekstrem*) menuju 100% (*Benteng Privasi Kebal*).

---

## 🛠️ Tumpukan Teknologi (Tech Stack)

* **Antarmuka (Frontend)**:
  - React 18 (SPA berbasis Hooks & Functional Components)
  - Vite 6 (Bundler performa tinggi)
  - Vanilla CSS Modern (Variabel warna HSL, Flexbox, CSS Grid, Glassmorphism, Zero-external UI framework)
  - Lucide React (Ikon vektor modern)
  - Canvas Confetti (Efek selebrasi kelulusan misi)
* **Sintesis Audio (Web Audio API)**:
  - Tanpa berkas audio `.mp3`/`.wav` eksternal. Semua suara (sirine DEFCON, nada dering notifikasi HP, bunyi ketikan terminal, dan dengung perisai energi) dihasilkan langsung menggunakan osilator bawaan browser.
* **Penyimpanan Status (Storage & Session)**:
  - Menggunakan modul terpadu `storage.js` berbasis `localStorage` browser.
  - Dilengkapi fitur pencegahan *reset* saat refresh (F5), migrasi data sesi, serta kalkulasi akurasi skor yang idempoten.
* **Backend API (Server)**:
  - Node.js & Express API (Port 5000) untuk layanan telemetri dan integrasi sistem lanjutan.

---

## 📂 Struktur Proyek

```text
simulasi/
├── public/                 # Aset statis & favicon
├── server/                 # Layanan Express API
│   └── index.js            # Entry point backend (Port 5000)
├── src/
│   ├── components/
│   │   ├── layout/         # Komponen global (Navbar, MissionHub, ErrorBoundary)
│   │   └── modules/        # 4 Modul Pembelajaran Interaktif
│   │       ├── PhishingRadar/      # Modul 01: Simulasi Web 1:1, APK & Email
│   │       ├── TwoFactorShield/    # Modul 02: Kali Linux vs iPhone 2FA
│   │       ├── PasswordVault/      # Modul 03: Telemetri GPU & Passphrase
│   │       └── PrivacyShield/      # Modul 04: Audit Instagram & Doxxing
│   ├── data/               # Data materi soal, aturan kata sandi, & privasi
│   ├── utils/              # Helper audio synth, storage, navigation, scoring
│   ├── App.jsx             # Router utama aplikasi
│   └── main.jsx            # Entry point React
├── package.json            # Daftar dependensi & skrip npm
├── LICENSE                 # Lisensi MIT
└── README.md               # Dokumentasi lengkap proyek
```

---

## 💻 Panduan Instalasi & Menjalankan

### Kebutuhan Sistem
* **Node.js** versi 18.0.0 atau lebih baru
* **npm** versi 9.0.0 atau lebih baru
* Browser modern (Google Chrome, Microsoft Edge, Firefox, atau Safari)

### Langkah Pemasangan

1. **Clone atau Buka Direktori Proyek**:
   ```bash
   cd e:/laragon/www/simulasi
   ```

2. **Instal Dependensi**:
   ```bash
   npm install
   ```

3. **Jalankan Server Frontend & Backend**:
   Buka dua jendela terminal terpisah (atau gunakan Laragon / background task):

   *Terminal 1 (Vite Dev Server - Frontend):*
   ```bash
   npm run dev
   ```
   Aplikasi akan aktif di: `http://localhost:3000`

   *Terminal 2 (Express API - Backend):*
   ```bash
   npm run server
   ```
   Layanan API aktif di: `http://localhost:5000`

4. **Menjalankan Pengujian Otomatis (Unit Test)**:
   ```bash
   npm test
   ```

5. **Membangun Bundle Produksi**:
   ```bash
   npm run build
   ```

---

## 🎯 Fitur Khusus Pengajaran di Kelas

* **Presenter Mode**:
  - Tombol khusus di bagian Navbar atas untuk memperbesar kontras dan font antarmuka saat ditayangkan menggunakan proyektor kelas atau smart board.
* **Pengendali Audio Fleksibel**:
  - Ikon speaker di Navbar dapat digunakan untuk menyalakan atau membisukan efek suara audio synthesizer sesuai kondisi kelas.
* **Penyimpanan Sesi Anti-Hilang**:
  - Siswa yang secara tidak sengaja me-refresh halaman (menekan tombol F5) tidak akan kehilangan nomor soal atau riwayat jawaban yang sudah dikerjakan.
* **Perhitungan Skor Idempoten**:
  - Mencegah manipulasi penambahan skor berulang pada satu pertanyaan yang sama.

---

## 📄 Lisensi & Hak Cipta

Proyek ini dilisensikan di bawah naungan **MIT License**.  
Lihat berkas [LICENSE](file:///e:/laragon/www/simulasi/LICENSE) untuk syarat dan ketentuan lengkap.

Hak Cipta © 2026 **Gempur Budi Anarki** & **Tim PKM Universitas Bina Bangsa Getsempena (UBBG)**.  
Banda Aceh, Indonesia.
