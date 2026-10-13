# Spesifikasi Desain: Tactical Cyber-Ops Overhaul, Gamifikasi Meriah & Perbaikan Arsitektur Sistem Menyeluruh

**Tanggal:** 14 Oktober 2026  
**Status:** Disetujui  
**Penanggung Jawab:** Gempur Budi Anarki  
**Institusi:** Universitas Bina Bangsa Getsempena (UBBG)  
**Lingkup:** Single Data Source, Enum Skenario & Safe Modal Fallback, Pure Function Scoring Idempoten & Vitest, Migrasi Storage Terpusat, Rombak Forensik Email (Termasuk Kasus Semua-PASS Lookalike), Mockup Game Diamond Aman, Timer OTP Berbasis Timestamp, dan Sistem Animasi Aksesibel Ringan.

---

## 1. Latar Belakang & Evaluasi Masalah

Berdasarkan tinjauan kritis mendalam terhadap sistem simulasi:
1. **Risiko Mismatch Penamaan Skenario & Layar Putih (Blank):**
   * Penamaan skenario tidak terstandarisasi (`game-diamond` vs `game-diamond-scam` vs `game_diamond`).
   * Tidak ada blok `default:` pada `SimulatedBrowserModal.jsx`, sehingga tipe skenario yang belum terdaftar langsung memunculkan layar putih kosong tanpa pesan kesalahan.
2. **Duplikasi Dataset Antara Client & Server:**
   * `src/data/phishingData.js` dan route Express di `server/routes/` mendefinisikan dataset secara terpisah yang rentan mengalami perbedaan konten (*data drift*).
3. **Kelemahan Perhitungan Skor & Stale Closure:**
   * Di `PhishingRadar.jsx`, fungsi penutupan membaca state `emailHistory` yang belum ter-update akibat siklus asinkron React.
   * Skor rentan dimanipulasi dengan klik berulang (*point farming*) dan pembagi skor tidak boleh bergantung pada jumlah soal yang sempat dijawab siswa.
4. **Desinkronisasi Storage & Race Condition Router:**
   * `navigation.js` menggunakan key usang `cybergenz_progress_2026` sedangkan `storage.js` memakai `cybergenz_pkm_progress_v1`. Tidak ada migrasi data progres lama dan hidrasi routing belum terpusat.
5. **Celah Konseptual Edukasi Email Spoofing (SPF/DKIM):**
   * Menampilkan status SPF/DKIM di awal membocorkan jawaban ke siswa.
   * Mengajarkan rumus sederhana "SPF PASS = Asli, SPF FAIL = Palsu" berbahaya dalam literasi siber nyata, karena penyerang yang mendaftarkan domain tipuan sendiri (contoh: `rnicrosoft.com` atau `bca-id.com`) dapat memiliki SPF, DKIM, dan DMARC yang semuanya **PASS**.
6. **Isu Keamanan & Form Input Simulasi:**
   * Mockup form yang meminta password akun atau PIN dompet digital harus memiliki banner penegasan bahwa data tidak dikirim ke internet, tidak disimpan, dan dilarang menggunakan kata sandi asli.
7. **Animasi Datar, Risiko Drift Timer, dan Aksesibilitas:**
   * Timer 30 detik OTP menggunakan `setInterval` decremental yang mengalami drift jika tab browser diminimize/di-background.
   * Efek animasi belum mempertimbangkan performa perangkat HP kelas bawah dan belum memiliki dukungan `prefers-reduced-motion`. Audio synthesizer harus memiliki status default yang tidak mengganggu di ruang kelas.

---

## 2. Arsitektur & Perbaikan Inti (Fase 1)

### 2.1 Single Source of Truth Dataset & Enum Skenario
* **Berkas Enum:** `src/data/scenarioTypes.js`
  ```javascript
  export const SCENARIO_TYPES = {
    DANA_LOGIN: 'dana_login',
    APK_INSTALLER: 'apk_installer',
    FORM_KUOTA: 'form_kuota',
    IG_LOGIN: 'ig_login',
    GAME_DIAMOND: 'game_diamond',
    LEGIT_CLASSROOM: 'legit_classroom'
  };
  ```
* **Dataset Tunggal:** Seluruh dataset skenario dan drill berada di `src/data/phishingData.js`. Route Express di `server/routes/` langsung mengimpor dataset ini menggunakan Node.js ES Modules standar tanpa menduplikasi data.
* **Safe Fallback Modal:** Di `SimulatedBrowserModal.jsx`, blok switch memiliki `default:` fallback yang merender kartu peringatan grafis jika ada tipe skenario tidak dikenal.

### 2.2 Pure Function Scoring Idempoten (`src/utils/scoring.js`)
* Logika perhitungan skor diekstrak keluar dari komponen React menjadi *pure function*:
  ```javascript
  export function calculateMissionAccuracy(historyArray, totalQuestions) {
    if (!Array.isArray(historyArray) || totalQuestions <= 0) return 0;
    // Map untuk memastikan setiap ID soal hanya dihitung 1 kali (anti-point farming)
    const uniqueAnswers = new Map();
    for (const item of historyArray) {
      if (item && item.id) uniqueAnswers.set(item.id, Boolean(item.correct));
    }
    let correctCount = 0;
    for (const isCorrect of uniqueAnswers.values()) {
      if (isCorrect) correctCount++;
    }
    return Math.min(100, Math.round((correctCount / totalQuestions) * 100));
  }
  ```
* Didukung unit test otomatis (`src/utils/scoring.test.js`) menggunakan Vitest untuk menguji berbagai edge case: riwayat kosong, jawaban duplikat, dan batas 0–100%.

### 2.3 Storage Key Terpusat & Migrasi 1-Arah
* `STORAGE_KEY = 'cybergenz_pkm_progress_v1'` diekspor dari `src/utils/storage.js`.
* Fungsi `migrateLegacyProgress()` memeriksa keberadaan key lama `cybergenz_progress_2026`. Jika ada, data disalin ke key baru dan key lama dihapus.
* `navigation.js` mengimpor `STORAGE_KEY` langsung dari `storage.js` sehingga eliminasi bug mismatch 100%.

---

## 3. Komponen Skenario & Rombak Forensik Email (Fase 2)

### 3.1 Mockup Baru: `GameDiamondMockup.jsx`
* Berkas: `src/components/modules/PhishingRadar/modals/mockups/GameDiamondMockup.jsx`
* Menampilkan:
  * Banner peringatan tegas di bagian atas form: *"⚠️ SIMULASI EDUKASI: Data tidak disimpan & tidak dikirim ke internet. JANGAN masukkan kata sandi asli Anda!"*
  * Desain interaktif event game MLBB / Free Fire 2026.
  * Roda putar hadiah (*Spin Wheel*) dan form klaim ID game.
  * Form submit memicu simulasi peretasan (*breach overlay*) tanpa melakukan request network apa pun.

### 3.2 Rombak Forensik Email & Kasus SPF "Semua PASS Tapi Domain Tipuan"
* Berkas: `src/components/modules/PhishingRadar/views/EmailSpoofingView.jsx`
* **Penyajian Pesan:**
  * Surat dirender sebagai komponen React aman tanpa `dangerouslySetInnerHTML`.
  * Menampilkan informasi kartu email realistis: Friendly Name, Alamat Email pengirim, Subjek, Tanggal, dan Badan Surat.
* **Mode Deteksi Tanpa Bocoran:**
  * Tombol interaktif *"Inspeksi Header Keamanan (SPF / DKIM / DMARC)"*.
  * Status badge teknis tersembunyi hingga siswa menekan tombol inspeksi atau memberikan tebakan.
* **Studi Kasus Pedagogis Baru (Semua PASS):**
  * Skenario email penipuan dengan domain tiruan yang dikontrol attacker (misal: `@rnicrosoft-security.com` atau `@bca-layanan.id`).
  * Header teknis: SPF = PASS, DKIM = PASS, DMARC = PASS!
  * Penjelasan edukatif: Mengajarkan siswa bahwa SPF/DKIM hanya membuktikan email benar-benar dikirim dari server pemilik domain tersebut, **bukan** berarti pemilik domain itu adalah Microsoft atau Bank BCA resmi!

---

## 4. Animasi Gamifikasi Meriah, Ringan & Aksesibel (Fase 3)

### 4.1 Floating XP / Point Burst (`+25 PTS!`)
* Setiap jawaban benar memicu pop-up angka melayang `+25 PTS!` berwarna hijau neon menyala dengan micro-sound sintetis.
* Menggunakan CSS hardware-accelerated (`transform: translateY()` dan `opacity`).

### 4.2 Timer OTP Berbasis Timestamp (Anti-Drift)
* Di `ActivationPracticeView.jsx`, hitungan mundur 30 detik dihitung menggunakan selisih timestamp nyata (`Date.now() - startTime`), memastikan tidak ada percepatan/perlambatan timer jika tab browser berpindah background.
* Gauge lingkaran interaktif SVG berputar dinamis mengikuti sisa detik.

### 4.3 Radar Sweep & Border Neon Glow
* Garis putar radar 360 derajat di latar belakang kartu skenario Phishing Radar.
* Kartu misi memiliki animasi *subtle pulse glow* saat aktif.

### 4.4 Aksesibilitas & Kontrol Audio Ruang Kelas
* Seluruh animasi dinonaktifkan secara otomatis jika sistem operasi siswa mengaktifkan `@media (prefers-reduced-motion: reduce)`.
* Audio sintetis memiliki status default mute di ruang kelas dan tombol toggle yang mudah diakses di navbar.

---

## 5. Rencana Tahapan Eksekusi

1. **Fase 1: Inti Sistem & Tes Logika**
   - Implementasi `scenarioTypes.js`
   - Implementasi `scoring.js` & tes Vitest `scoring.test.js`
   - Sinkronisasi `storage.js` (migrasi legacy key) dan `navigation.js`
   - Penyatuan single dataset di `src/data/phishingData.js` dan koneksi ke `server/routes/`
2. **Fase 2: Mockup Game Diamond & Rombak Email Spoofing**
   - Pembuatan `GameDiamondMockup.jsx` lengkap dengan disclaimer keamanan
   - Penambahan skenario SPF/DKIM All-PASS lookalike domain
   - Rombak antarmuka `EmailSpoofingView.jsx` (inspeksi header, tampilan surat nyata, ulasan komparasi)
   - Penambahan fallback `default:` di `SimulatedBrowserModal.jsx`
3. **Fase 3: Animasi Gamifikasi & Performa**
   - Komponen `FloatingScoreBurst.jsx`
   - Animasi radar sweep dan pulsing cyber card
   - Gauge melingkar OTP berbasis timestamp di 2FA
   - Dukungan `prefers-reduced-motion` dan audit performa 60 FPS
4. **Fase 4: Verifikasi & Build Bersih**
   - Menjalankan unit test (`npm test` / vitest)
   - Menjalankan `npm run build` dan pengujian langsung browser
