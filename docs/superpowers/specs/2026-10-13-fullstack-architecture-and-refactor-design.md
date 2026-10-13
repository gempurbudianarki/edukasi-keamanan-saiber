# Spesifikasi Desain: Arsitektur Fullstack & Refaktorisasi Bersih Platform Simulasi Keamanan Siber

**Tanggal:** 13 Oktober 2026  
**Status:** Disetujui  
**Penanggung Jawab:** Gempur Budi Anarki  
**Institusi:** Universitas Bina Bangsa Getsempena (UBBG)  
**Lingkup:** Backend API Express Terpisah, Dekomposisi File Modular Frontend, Penghapusan Modul Sertifikat, Perbaikan Reset Data, Peningkatan Mutu Skenario & UI/UX  

---

## 1. Latar Belakang & Masalah Sistem

Berdasarkan evaluasi kritis terhadap sistem simulasi keamanan siber saat ini:
1. **File Monolitik Bertumpuk:** Komponen seperti `PhishingRadar.jsx` (> 900 baris) dan `SimulatedBrowserModal.jsx` (> 400 baris) menggabungkan terlalu banyak tanggung jawab dalam satu file, sulit dikelola, dan tidak terstruktur.
2. **Ketiadaan Backend API:** Sebelumnya data dan logika analisis bercampur di client tanpa lapisan API terpisah. Diperlukan arsitektur Fullstack dengan server Express terpisah yang menyediakan endpoint API mandiri.
3. **Fitur Sertifikat Tidak Dibutuhkan:** Fitur sertifikat digital dinilai tidak relevan dan harus dihapus total dari antarmuka serta sistem scoring.
4. **Fitur Reset Bermasalah:** Tombol reset di navbar menggunakan dialog `window.confirm` bawaan yang rentan terblokir dan tidak membersihkan seluruh state komponen secara menyeluruh.
5. **Kualitas Soal & UI/UX:** Skenario dan teks yang terasa generik / klise perlu diganti dengan studi kasus teknis yang tajam, realistis bagi pelajar Indonesia, dan antarmuka yang bersih serta responsif.

---

## 2. Arsitektur Sistem Fullstack

### 2.1 Backend API Server (`server/`)
Server Node.js Express mandiri yang beroperasi pada port `5000`:
* **`server/index.js`**: Inisialisasi Express, CORS, JSON parser, dan routing utama.
* **`server/routes/`**:
  * `health.routes.js`: `GET /api/health`
  * `scenarios.routes.js`: `GET /api/scenarios/phishing`
  * `drills.routes.js`: `GET /api/drills/domains`, `GET /api/drills/emails`
  * `scanner.routes.js`: `POST /api/scanner/analyze`
  * `dns.routes.js`: `GET /api/dns/check?domain=...`
* **`server/services/`**:
  * `urlAnalyzerService.js`: Ekstraksi 9 fitur heuristik keamanan (panjang URL, IP host, tanda '@', double-slash redirect, frekuensi tanda hubung, kedalaman subdomain, risiko TLD vs `.go.id`/`.ac.id`, token https palsu, dan shortener).
  * `dnsBlocklistService.js`: Pengecekan daftar sinkhole domain berisiko berbasis aturan HaGeZi.
* **`server/data/`**:
  * Dataset kasus nyata yang berbobot: file APK Android (izin aksesibilitas & SMS), phishing perbankan/fintech lokal (BCA & DANA), dan spoofing email dengan raw header valid (SPF, DKIM, DMARC).

### 2.2 Integrasi Vite Proxy
* Di [vite.config.js](file:///e:/laragon/www/simulasi/vite.config.js), konfigurasi server proxy ditambahkan:
  ```javascript
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
  ```
* Frontend cukup memanggil `/api/...` tanpa kendala CORS.

### 2.3 Frontend Modular (`src/`)
Frontend dipecah menjadi modul-modul independen dan ringkas (< 200 baris per file):

```text
src/
├── api/
│   └── apiClient.js                 # API client terpusat dengan fallback lokal offline
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx               # Header, indikator progres, audio toggle, tombol reset
│   │   ├── ResetConfirmModal.jsx    # Modal konfirmasi reset yang elegan (menggantikan window.confirm)
│   │   ├── MissionHub.jsx           # Dashboard 4 kartu misi (tanpa sertifikat)
│   │   └── WelcomeScreen.jsx        # Halaman selamat datang & input identitas siswa
│   └── modules/
│       ├── PhishingRadar/
│       │   ├── PhishingRadar.jsx    # Komponen induk (tab switcher & akumulasi skor)
│       │   ├── views/
│       │   │   ├── WebSimulationView.jsx      # Tampilan simulasi skenario web
│       │   │   ├── DomainComparatorView.jsx   # Tampilan komparasi domain asli vs palsu
│       │   │   ├── EmailSpoofingView.jsx      # Tampilan forensik header email
│       │   │   └── UrlScannerView.jsx         # Tampilan scanner URL heuristik
│       │   └── modals/
│       │       ├── SimulatedBrowserModal.jsx  # Wrapper browser window
│       │       └── mockups/
│       │           ├── InstagramMockup.jsx
│       │           ├── ApkDownloadMockup.jsx
│       │           ├── SmsFormMockup.jsx
│       │           └── DanaLoginMockup.jsx
│       ├── TwoFactorShield/
│       │   ├── TwoFactorShield.jsx
│       │   ├── AttackDemoView.jsx             # Terminal hacker vs akun
│       │   └── ActivationPracticeView.jsx     # Praktik OTP smartphone virtual
│       ├── PasswordVault/
│       │   ├── PasswordVault.jsx
│       │   ├── PasswordTester.jsx
│       │   └── PassphraseGenerator.jsx
│       └── PrivacyShield/
│           ├── PrivacyShield.jsx
│           ├── SocialProfilePreview.jsx
│           └── PrivacySettingsToggles.jsx
```

---

## 3. Penghapusan Fitur Sertifikat

1. **Hapus Berkas Fisik:**
   * Hapus `src/components/layout/CertificateModal.jsx`.
   * Hapus `src/components/layout/CertificateModal.css`.
2. **Pembersihan Logika & UI:**
   * Di `Navbar.jsx`: Hapus tombol "Sertifikat" dan state `isCertificateOpen`.
   * Di `MissionHub.jsx`: Hapus tombol atau banner pengingat klaim sertifikat.
   * Di `App.jsx`: Hapus import `CertificateModal`, state modal sertifikat, dan callback pembuka modal.
   * Total skor 4 misi murni sebagai pencapaian evaluasi belajar (0 - 100 poin akumulatif).

---

## 4. Perbaikan Total Fitur Reset

1. **Komponen `ResetConfirmModal.jsx`:**
   * Menggantikan `window.confirm` bawaan browser yang sering terblokir di mode proyektor atau perangkat tertentu.
   * Modal antarmuka bertema gelap/bersih dengan tombol tegas: "Ya, Reset Semua Data" dan "Batal".
2. **Logika Eksekusi Reset:**
   * Menghapus seluruh data dari `localStorage` (`cybergenz_pkm_progress_v1`).
   * Mengembalikan skor semua misi ke 0.
   * Mengembalikan status penyelesaian misi ke false.
   * Mengosongkan form input nama.
   * Mengarahkan navigasi kembali ke `WelcomeScreen` secara mulus.

---

## 5. Peningkatan Mutu Skenario & UI/UX

1. **Skenario Nyata & Berbobot (Anti-AI Slop):**
   * **Kasus APK Android:** Menjelaskan risiko *Accessibility Service abuse* dan izin pembacaan SMS OTP yang menjadi senjata utama pencurian saldo rekening m-Banking.
   * **Kasus Phishing Fintech (DANA/BCA):** Membedah domain tiruan (seperti `dana-kaget-klaim.xyz` vs `dana.id` resmi).
   * **Kasus Spoofing Email:** Menampilkan baris header MIME asli (`Authentication-Results: spf=fail; dkim=none`) dengan penjelasan visual yang mudah dicerna siswa.
2. **Gaya Visual & Interaksi:**
   * Desain modern, bersih, proporsional, tanpa elemen bertumpuk.
   * Tipografi jelas dengan kontras yang nyaman baik di layar ponsel siswa maupun proyektor kelas.

---

## 6. Rencana Pengujian & Verifikasi

1. **Uji Backend API:**
   * Jalankan server di port 5000 dan verifikasi endpoint `/api/health`, `/api/scenarios/phishing`, dan `/api/scanner/analyze` via HTTP request.
2. **Uji Vite Proxy & Frontend:**
   * Jalankan Vite dev server, pastikan request ke `/api/...` diteruskan dengan benar ke Express tanpa error CORS.
3. **Uji Fallback Offline:**
   * Uji pemanggilan API jika backend dimatikan, pastikan aplikasi tetap berjalan lancar dengan data lokal.
4. **Uji Reset Flow:**
   * Jalankan simulasi hingga ada skor, tekan tombol Reset, konfirmasi, dan pastikan seluruh data kembali bersih ke 0.
5. **Uji Build:**
   * Jalankan `npm run build` dan pastikan proses build bersih tanpa warning atau missing dependency.
