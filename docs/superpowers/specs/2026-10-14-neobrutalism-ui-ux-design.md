# Spesifikasi Desain: Neo-Brutalism Modern Gen-Z UI/UX Overhaul

**Tanggal:** 14 Oktober 2026  
**Status:** Disetujui  
**Arah Gaya:** Neo-Brutalism Modern Gen-Z (Impeccable & UI-UX Pro Max)  
**Penanggung Jawab:** Gempur Budi Anarki & Tim PKM UBBG 2026  
**Target Platform:** Web Desktop & Mobile (Lab Komputer Siswa & Layar Proyektor Kelas)

---

## 1. Latar Belakang & Visi Desain

Platform simulasi keamanan siber saat ini memiliki fungsionalitas yang solid dan algoritma yang telah teruji, namun tampilan visualnya masih mengandalkan campuran dark-mode dan glassmorphism konvensional. 

Sesuai arahan dan integrasi dengan skill **Impeccable** (`pbakaus/impeccable`) serta **UI-UX Pro Max** (`nextlevelbuilder/ui-ux-pro-max-skill`), antarmuka **CyberGenZ Simulator** dirombak total menuju estetika **Neo-Brutalism Modern Gen-Z**:
* Menghilangkan gradien lembut yang membosankan dan menggantinya dengan warna-warna pop berani yang berenergi tinggi.
* Mengganti bayangan halus (*soft blur shadows*) dengan bayangan balok hitam pejal (*hard offset drop shadow* `4px 4px 0px #000000`).
* Menegaskan garis kontur semua elemen menggunakan garis tepi hitam tebal (`3px solid #000000`).
* Memberikan interaksi taktil yang memuaskan: tombol bergerak turun (*pressed down*) saat diklik seolah-olah tombol fisik nyata.
* Mengadopsi tipografi yang tegas, berkarakter, dan badge bertema stiker fisik (*sticker pack aesthetic*) yang sangat disukai audiens Gen Z.

---

## 2. Sistem Desain & Token Neo-Brutalism

### 2.1 Palet Warna Kontras Tinggi (High-Contrast Pop Palette)
```css
:root {
  /* Canvas & Base Inks */
  --nb-bg: #f8f7f2;               /* Retro warm paper canvas */
  --nb-surface: #ffffff;          /* Card surface pure white */
  --nb-ink: #000000;              /* Solid black outline & text */
  --nb-ink-muted: #475569;        /* Secondary supporting text */
  
  /* Vibrant Pop Accents */
  --nb-yellow: #facc15;           /* Cyber Yellow (Highlights & Privacy) */
  --nb-coral-red: #ff4d4d;        /* Alert Coral Red (Phishing, Danger, DEFCON-1) */
  --nb-green: #22c55e;            /* Shield Lime Green (2FA, Safe, Success) */
  --nb-cyan: #00f0ff;             /* Electric Cyan (Password Vault, Vault Tech) */
  --nb-purple: #a855f7;           /* Neo Purple (Institution & Special Badges) */
  --nb-orange: #fb923c;           /* Amber Orange (Caution) */

  /* Structural Geometry */
  --nb-border-width: 3px;
  --nb-border-style: solid;
  --nb-border-color: #000000;
  --nb-border: var(--nb-border-width) var(--nb-border-style) var(--nb-border-color);
  
  /* Hard Drop Shadows (Zero Blur!) */
  --nb-shadow: 4px 4px 0px #000000;
  --nb-shadow-lg: 6px 6px 0px #000000;
  --nb-shadow-sm: 2px 2px 0px #000000;
  --nb-shadow-hover: 6px 6px 0px #000000;
  --nb-shadow-active: 1px 1px 0px #000000;

  /* Border Radius */
  --nb-radius-card: 12px;
  --nb-radius-btn: 10px;
  --nb-radius-badge: 6px;
  --nb-radius-pill: 9999px;

  /* Typography */
  --font-sans: 'Space Grotesk', 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
}
```

### 2.2 Micro-Interaksi Taktil (Button & Card Physics)
* **Hover State:**  
  `transform: translate(-2px, -2px); box-shadow: var(--nb-shadow-hover);`
* **Active (Click) State:**  
  `transform: translate(2px, 2px); box-shadow: var(--nb-shadow-active);`
* **Transisi:**  
  `transition: transform 0.12s cubic-bezier(0, 0, 0.2, 1), box-shadow 0.12s cubic-bezier(0, 0, 0.2, 1);`
* **Prefers-reduced-motion:**  
  Transform dinonaktifkan jika pengguna menyetel pengurangan animasi OS.

---

## 3. Rombak Komponen Antarmuka (Component Roster)

### 3.1 Navbar & Top Header (`Navbar.jsx` & `layout.css`)
* Bilah navbar berlatar putih dengan border bawah hitam tebal `3px solid #000` dan hard shadow.
* Logo CyberGenZ berbingkai stiker hitam tebal dengan aksen kuning neon.
* Tombol Proyektor (*Presenter Mode*) dan Pengendali Audio (*Sound Mute*) menggunakan tombol neo-brutalist dengan efek klik pegas.
* Indikator Progres Misi (*Progress Pill*) berbentuk bilah stiker taktil dengan border hitam dan counter tebal.

### 3.2 Halaman Sambutan (`WelcomeScreen.jsx` & `WelcomeScreen.css`)
* Pita pengenal PKM UBBG berformat pita stiker miring (*tilted caution tape aesthetic*).
* Kartu sambutan utama dengan border 3px hitam, bayangan balok hitam `6px 6px 0 #000`, dan latar belakang putih bersih.
* Form input nama Agen Siswa dengan border tebal 3px dan tombol "Mulai Misi Siber" berwarna kuning pop yang memantul saat disentuh.

### 3.3 Pusat Misi (`MissionHub.jsx` & `layout.css`)
* 4 kartu misi masing-masing memiliki tema warna pop tersendiri:
  1. **Misi 01 (Phishing Radar)**: Aksen Merah Koral `#ff4d4d` + stiker merah.
  2. **Misi 02 (Benteng 2FA)**: Aksen Hijau Neon `#22c55e` + stiker hijau.
  3. **Misi 03 (Password Vault)**: Aksen Cyan Elektrik `#00f0ff` + stiker cyan.
  4. **Misi 04 (Privacy Shield)**: Aksen Kuning Siber `#facc15` + stiker kuning.
* Kartu misi mengangkat ke kiri-atas saat di-hover dan bayangan hitam bertambah tebal.

### 3.4 Modul 01: Phishing Radar & Simulated Browser Modal
* Jendela simulasi browser tiruan mengadopsi bingkai jendela grafis tebal dengan bar tab hitam, kolom URL berwarna kuning/merah dengan icon gembok tebal.
* Tampilan bahaya **DEFCON-1**: Garis strip bahaya pita kuning-hitam militer (*hazard stripes*), lampu sirine darurat, dan ringkasan 3 kolom kerugian dengan kartu putih border tebal hitam dan ikon merah pekat.
* Komparasi Domain dan Forensik Email Spoofing menggunakan kotak inspeksi stiker kontras tinggi (*PASS / FAIL* stamp).

### 3.5 Modul 02: Benteng 2FA
* Arena pertarungan siber: Terminal Kali Linux kiri menggunakan border hitam tebal dengan latar terminal retro hitam-hijau pekat.
* Ponsel iPhone virtual di sisi kanan menggunakan bodi ponsel neo-brutalist dengan notifikasi push Dynamic Island bertombol tebal "TOLAK & BLOKIR".
* Praktik aktivasi 2FA: 6 kotak input PIN 6 digit dengan border tebal 3px yang melompat fokus otomatis.

### 3.6 Modul 03: Password Vault
* Meteran kekuatan 5-segmen diubah dari garis tipis menjadi 5 blok balok bata tebal bersekat border hitam.
* Telemetri GPU kluster dan hash SHA-256 disajikan dalam kotak terminal sticker monospaced.
* Generator Passphrase 4-token Indonesia dengan kartu bergaris putus-putus (*dashed border*) dan tombol salin taktil.

### 3.7 Modul 04: Privacy Shield
* Mockup profil Instagram virtual disesuaikan dengan casing ponsel bergaya neo-brutalism.
* 6 sakelar privasi iOS diubah menjadi sakelar balok taktil (*tactile brutal toggle*) dengan status ON (Hijau pekat) dan OFF (Abu/Hitam) yang memiliki border 3px dan bayangan balok.

---

## 4. Rencana Tahapan Eksekusi

1. **Fase 1: Fondasi Token & CSS Global (`src/index.css`)**
   - Mendefinisikan seluruh CSS Custom Properties Neo-Brutalism (`--nb-*`).
   - Menyediakan utility classes: `.nb-card`, `.nb-btn`, `.nb-badge`, `.nb-input`, `.nb-shadow`.
   - Mengintegrasikan tipografi Google Fonts (`Space Grotesk` & `JetBrains Mono`).

2. **Fase 2: Rombak Komponen Layout & Navigasi**
   - Pembaruan `Navbar.jsx`, `layout.css`, dan `ResetConfirmModal.jsx`.
   - Pembaruan `WelcomeScreen.jsx` & `WelcomeScreen.css`.
   - Pembaruan `MissionHub.jsx` (hero banner, grid 4 misi berstiker, banner kelulusan).

3. **Fase 3: Rombak 4 Modul Interaktif**
   - Modul 01: `PhishingRadar.css`, `SimulatedBrowser.css`, dan mockups skenario.
   - Modul 02: `TwoFactorShield.css`, arena Hydra vs iPhone, dan praktik OTP.
   - Modul 03: `PasswordVault.css`, balok 5-segmen, dan passphrase generator.
   - Modul 04: `PrivacyShield.css`, Instagram phone frame, dan sakelar taktil.

4. **Fase 4: Verifikasi & Audit Kualitas (Impeccable & Test Suite)**
   - Menjalankan `npm test` untuk memastikan semua unit test scoring tetap idempoten dan lolos.
   - Menjalankan `npm run build` untuk memverifikasi kompilasi bundel produksi bersih tanpa error.
   - Menguji interaksi di browser lokal untuk memastikan sensasi taktil dan responsivitas 60 FPS.
