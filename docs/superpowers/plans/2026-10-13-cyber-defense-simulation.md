# Cyber Defense Simulation Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun aplikasi web simulator interaktif "CyberGenZ" berbasis React + Vite untuk edukasi keamanan siber (mengenali phishing, aktivasi 2FA, cek kekuatan sandi, dan pengaturan privasi media sosial) yang responsif untuk siswa dan siap dideploy ke Vercel.

**Architecture:** Single Page Application (SPA) berbasis komponen modular yang mengelola state kemajuan 4 modul latihan di local storage browser. Menggunakan sistem desain modern berbasis CSS variables dengan cyberpunk dark theme, transisi halus, audio sintetis ramah browser, mode proyektor (Presenter Mode), serta modal sertifikat digital kelulusan.

**Tech Stack:** React 19 / 18, Vite, Lucide-React, Canvas-Confetti, Modern Vanilla CSS.

**Spec:** `docs/superpowers/specs/2026-10-13-cyber-defense-simulation-design.md`

## Global Constraints
- Target platform: Browser modern (Desktop & Mobile) tanpa backend/database eksternal.
- Harus dapat di-build tanpa error (`npm run build`) dan siap dideploy langsung ke Vercel.
- Tema visual: Cyberpunk Dark Mode (`#0a0b10`, `#00f0ff`, `#8a2be2`, `#10b981`, `#f43f5e`), glassmorphism, responsive dari HP 360px hingga layar proyektor lebar.
- Presenter Mode: Zoom skala font dan elemen 120% serta high contrast untuk kenyamanan tayangan proyektor di kelas.
- Bahasa antarmuka: Bahasa Indonesia yang komunikatif dan ramah siswa SMA/Gen Z.

---

### Task 1: Inisialisasi Proyek Vite React & Dependensi

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html` (via Vite scaffold di direktori root)
- Dependencies: `lucide-react`, `canvas-confetti`

**Interfaces:**
- Consumes: Node & npm
- Produces: Proyek React Vite yang dapat dijalankan (`npm run dev`) dan dibuild (`npm run build`)

- [ ] **Step 1: Inisialisasi Vite React scaffold**
Run: `npm create vite@latest . -- --template react` (atau manual package.json + vite config jika direktori berisi file .git/docs)
- [ ] **Step 2: Install dependensi inti**
Run: `npm install && npm install lucide-react canvas-confetti`
- [ ] **Step 3: Uji build awal**
Run: `npm run build`
Expected: Folder `dist` terbentuk tanpa error
- [ ] **Step 4: Commit**
Run: `git add package.json vite.config.js index.html src/ && git commit -m "chore: scaffold vite react project with lucide-react and canvas-confetti"`

---

### Task 2: Sistem Desain & Token CSS Modern (Cyberpunk Theme)

**Files:**
- Create: `src/index.css`
- Modify: `src/main.jsx`

**Interfaces:**
- Consumes: Global CSS styling tokens
- Produces: Variabel CSS (`--bg-primary`, `--accent-cyan`, `--accent-purple`, dll), kelas utilitas glassmorphism, animasi neon glow, dan modifier `.presenter-mode`

- [ ] **Step 1: Buat token CSS dan utility classes di `src/index.css`**
Tulis CSS lengkap dengan root variables, font Google Outfit/Inter, custom scrollbar, card styling, neon badges, animasi pulse/shake, dan responsive media queries.
- [ ] **Step 2: Hubungkan `src/index.css` ke `src/main.jsx`**
Pastikan import `./index.css` terpasang di `src/main.jsx`.
- [ ] **Step 3: Uji styling dasar**
Jalankan tes render di browser atau validasi syntax CSS.
- [ ] **Step 4: Commit**
Run: `git add src/index.css src/main.jsx && git commit -m "feat: setup cyberpunk modern design system and css variables"`

---

### Task 3: Data Skenario Edukasi & Helper Utilitas

**Files:**
- Create: `src/utils/soundEffects.js`
- Create: `src/utils/storage.js`
- Create: `src/data/phishingData.js`
- Create: `src/data/privacyData.js`
- Create: `src/data/passwordRules.js`

**Interfaces:**
- Consumes: Web Audio API & localStorage
- Produces: 
  - `playTone(type)`: sintetis sound untuk 'success', 'error', 'click', 'complete'
  - `getStoredProgress()`, `saveProgress(data)`, `resetProgress()`
  - Data skenario phishing (WA undangan nikah apk, IG copyright scam, SMS Kemdikbud, ML diamond gratis)
  - Data privacy checklist (IG/TikTok profile settings)
  - Algoritma estimasi brute-force password & generator passphrase Indonesia

- [ ] **Step 1: Implementasi `src/utils/soundEffects.js`**
Gunakan Web Audio API murni (OscillatorNode) sehingga tidak membutuhkan aset file MP3 eksternal yang rawan error 404.
- [ ] **Step 2: Implementasi `src/utils/storage.js`**
Kelola penyimpanan skor, status misi (1-4), dan nama peserta di LocalStorage dengan fallback memory.
- [ ] **Step 3: Implementasi dataset `phishingData.js`, `privacyData.js`, dan `passwordRules.js`**
Lengkapi studi kasus lokal yang realistis untuk pelajar Indonesia.
- [ ] **Step 4: Commit**
Run: `git add src/utils/ src/data/ && git commit -m "feat: add educational datasets and utility helpers"`

---

### Task 4: Komponen Layout (Navbar, Mission Hub, & Presenter Mode)

**Files:**
- Create: `src/components/layout/Navbar.jsx`
- Create: `src/components/layout/MissionHub.jsx`

**Interfaces:**
- Consumes: Progress state dari `src/utils/storage.js`
- Produces: Header interaktif dengan skor dinamis, toggle Presenter Mode, tombol audio, dan dashboard navigasi 4 kartu misi dengan badge status

- [ ] **Step 1: Buat komponen `Navbar.jsx`**
Menampilkan branding PKM UBBG, skor akumulasi (0-100), toggle Presenter Mode (menambahkan class `.presenter-mode` pada root `#root`), tombol audio mute/unmute, dan tombol Reset.
- [ ] **Step 2: Buat komponen `MissionHub.jsx`**
Grid 4 kartu misi interaktif (Misi 1: Phishing, Misi 2: 2FA, Misi 3: Password, Misi 4: Privasi) dengan tombol "Mulai Misi", progress bar, dan status icon.
- [ ] **Step 3: Commit**
Run: `git add src/components/layout/ && git commit -m "feat: implement navbar and mission hub layout"`

---

### Task 5: Modul 1 - Phishing Radar (Deteksi Tautan Palsu)

**Files:**
- Create: `src/components/modules/PhishingRadar/PhishingRadar.jsx`
- Create: `src/components/modules/PhishingRadar/PhishingRadar.css`

**Interfaces:**
- Consumes: `src/data/phishingData.js`, `src/utils/soundEffects.js`
- Produces: Komponen latihan inspeksi pesan & URL phishing lengkap dengan simulasi layar malware dan penjelasan forensik edukatif. Memanggil callback `onComplete(score)` jika seluruh soal diselesaikan.

- [ ] **Step 1: Buat antarmuka simulator pesan (WhatsApp / DM IG / SMS)**
Tampilkan bubble pesan yang realistis dengan preview lampiran dan link.
- [ ] **Step 2: Buat fitur "Inspeksi Tautan" (URL Deep Inspector)**
Memberikan rincian visual: Protokol (`https`), Domain mencurigakan (`.xyz`, `.apk`, typo brand), dan peringatan risiko.
- [ ] **Step 3: Implementasi logika aksi & feedback edukasi**
Jika siswa klik "Buka Tautan": muncul simulasi layar peringatan *"PERANGKAT TERINFEKSI / AKUN DICURI!"*. Jika klik "Laporkan & Hapus": skor bertambah dan muncul penjelasan ciri-ciri phishing.
- [ ] **Step 4: Commit**
Run: `git add src/components/modules/PhishingRadar/ && git commit -m "feat: implement phishing radar module with forensic inspector"`

---

### Task 6: Modul 2 - Benteng 2FA (Two-Factor Authentication Simulator)

**Files:**
- Create: `src/components/modules/TwoFactorShield/TwoFactorShield.jsx`
- Create: `src/components/modules/TwoFactorShield/TwoFactorShield.css`

**Interfaces:**
- Consumes: `src/utils/soundEffects.js`
- Produces: Komponen demo perbandingan: Akun Tanpa 2FA (gampang diretas bot) vs Akun Dengan 2FA (hacker gagal menembus). Lengkap dengan simulasi input OTP 6-digit dengan countdown timer.

- [ ] **Step 1: Buat Tab Demo Perbandingan (Tanpa 2FA vs Dengan 2FA)**
Menampilkan simulasi visual terminal hacker yang mencoba login dengan sandi bocor. Pada mode Tanpa 2FA, hacker langsung login.
- [ ] **Step 2: Buat Simulator Aktivasi 2FA Interaktif**
Siswa mempraktikkan proses aktivasi: memilih Authenticator/SMS, simulasi kode OTP muncul di layar HP virtual, memasukkan 6 digit kode, dan menerima konfirmasi aktif.
- [ ] **Step 3: Demo "Hacker Terblokir" setelah aktivasi**
Siswa menguji kembali tombol simulasi serangan: hacker terhenti di layar 2FA dan ditolak sistem!
- [ ] **Step 4: Commit**
Run: `git add src/components/modules/TwoFactorShield/ && git commit -m "feat: implement 2FA defense simulator and OTP verification flow"`

---

### Task 7: Modul 3 - Password Vault (Kekuatan Sandi & Brute-Force Time)

**Files:**
- Create: `src/components/modules/PasswordVault/PasswordVault.jsx`
- Create: `src/components/modules/PasswordVault/PasswordVault.css`

**Interfaces:**
- Consumes: `src/data/passwordRules.js`, `src/utils/soundEffects.js`
- Produces: Komponen kalkulator kekuatan kata sandi, estimasi matematis waktu bobol (*brute-force*), serta generator *Passphrase* Indonesia ramah Gen Z.

- [ ] **Step 1: Buat input password interaktif dengan Strength Meter**
Deteksi real-time: panjang (min 12), huruf besar, huruf kecil, angka, simbol spesial.
- [ ] **Step 2: Implementasi Kalkulator Waktu Retas Komputer Hacker**
Menghitung entropi matematika dan mengonversinya ke satuan waktu manusia (contoh: 0.001 detik, 2 jam, 300 tahun, hingga jutaan tahun) disertai analogi visual perangkat hacker (laptop biasa vs superkomputer GPU cluster).
- [ ] **Step 3: Fitur Passphrase Generator Indonesia**
Tombol "Buat Sandi Super Kuat & Mudah Diingat" yang menghasilkan kombinasi kata acak Indonesia (misal: `Kucing-Lari-Bintang-99!`) dengan tombol salin (copy to clipboard).
- [ ] **Step 4: Commit**
Run: `git add src/components/modules/PasswordVault/ && git commit -m "feat: implement password vault with crack-time estimator and passphrase generator"`

---

### Task 8: Modul 4 - Privacy Shield (Audit Akun Medsos Gen Z)

**Files:**
- Create: `src/components/modules/PrivacyShield/PrivacyShield.jsx`
- Create: `src/components/modules/PrivacyShield/PrivacyShield.css`

**Interfaces:**
- Consumes: `src/data/privacyData.js`, `src/utils/soundEffects.js`
- Produces: Komponen mockup profil medsos dengan interactive privacy toggles, Privacy Health Score, serta edukasi bahaya oversharing dan doxxing.

- [ ] **Step 1: Buat Mockup Profil Media Sosial Virtual (@pelajar_kekinian)**
Desain kartu profil mirip Instagram/TikTok dengan bio, foto profil, dan status privasi terkini.
- [ ] **Step 2: Implementasi Toggle Pengaturan Privasi Interaktif**
Daftar pengaturan: Akun Privat, Geotagging/Lokasi Presisi, Pembatasan Mention/Tag, Filter DM Orang Asing, dan Sembunyikan Kontak.
- [ ] **Step 3: Indikator Skor Privasi Dinamis & Edukasi Doxxing**
Skor bergerak dari 20% (Rawan Bahaya) menuju 100% (Benteng Privasi Kuat). Menampilkan pop-up penjelasan bahaya nyata *oversharing* (penculikan data, penipuan mengatasnamakan keluarga, doxxing).
- [ ] **Step 4: Commit**
Run: `git add src/components/modules/PrivacyShield/ && git commit -m "feat: implement privacy shield social media audit simulator"`

---

### Task 9: Sertifikat Kelulusan Digital & Integrasi Keseluruhan

**Files:**
- Create: `src/components/layout/CertificateModal.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: Total completed missions (4/4), `canvas-confetti`
- Produces: Alur lengkap aplikasi dari Mission Hub ke masing-masing modul, tombol kembali ke Hub, confetti selebrasi, dan sertifikat digital *"Gen Z Cyber Defender"* resmi PKM UBBG yang bisa di-screenshot/diunduh.

- [ ] **Step 1: Buat komponen `CertificateModal.jsx`**
Desain piagam penghargaan modern dengan nama siswa, lencana emas, tanda tangan tim PKM UBBG Gempur Budi Anarki, tanggal, dan tombol Print / Simpan Gambar.
- [ ] **Step 2: Integrasikan seluruh modul di `src/App.jsx`**
Kelola navigasi aktif (`currentView`: 'hub', 'phishing', '2fa', 'password', 'privacy').
- [ ] **Step 3: Hubungkan pemicu confetti saat seluruh 4 modul selesai**
- [ ] **Step 4: Commit**
Run: `git add src/components/layout/CertificateModal.jsx src/App.jsx && git commit -m "feat: integrate all modules and digital certificate achievement"`

---

### Task 10: Pengujian Responsivitas, Presenter Mode, & Build Produksi Vercel

**Files:**
- Verify: `npm run build`
- Verify: Preview di browser via Vite dev server

- [ ] **Step 1: Jalankan build produksi**
Run: `npm run build`
Expected: Berhasil tanpa error / warning.
- [ ] **Step 2: Uji fungsionalitas di browser**
Buka dev server dan periksa:
  - Tampilan di mobile viewport (375px)
  - Tampilan Presenter Mode di desktop (1920px)
  - Efek audio dan transisi
  - Alur setiap modul dari Misi 1 sampai Misi 4
  - Tampilan sertifikat digital
- [ ] **Step 3: Siapkan petunjuk hosting Vercel untuk Gempur**
Dokumentasikan langkah deploy ke Vercel (via GitHub atau Vercel CLI).
- [ ] **Step 4: Final commit**
Run: `git add -A && git commit -m "chore: verify production build and finalize cyber defense simulation platform"`
