# Tactical Cyber-Ops Overhaul & Bugfixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun perbaikan menyeluruh pada arsitektur simulasi literasi keamanan siber (single data source, enum skenario dengan safe fallback, pure function scoring teruji unit test, migrasi storage terpusat), merombak forensik email dengan studi kasus All-PASS lookalike, membuat mockup klaim game diamond ber-disclaimer aman, dan mengimplementasikan sistem animasi gamifikasi meriah (floating XP +25 PTS, radar sweep 360°, timer OTP berbasis timestamp, serta dukungan prefers-reduced-motion).

**Architecture:** Frontend React modular memanfaatkan single dataset ES Module yang di-share langsung dengan backend Express. Scoring diekstrak menjadi pure function idempoten yang dites dengan Node.js test runner bawaan. SimulatedBrowserModal dilengkapi safe fallback anti-layar-putih. Animasi dioptimalkan murni menggunakan CSS GPU-accelerated transform & opacity dengan guard aksesibilitas reduced-motion.

**Tech Stack:** React 18, Vite 6, Express 5, Node.js 24 (native test runner `node --test`), Lucide-React, Canvas-Confetti, Web Audio API, Vanilla CSS.

**Spec:** `docs/superpowers/specs/2026-10-14-tactical-cyber-ops-and-bugfixes-design.md`

## Global Constraints
- Target platform: Node.js >= 18 (Current: v24.18.0), Browser Modern.
- Single source of truth: `src/data/phishingData.js` diimpor bersama oleh frontend dan backend.
- Anti-drift timer OTP: wajib menggunakan delta `Date.now() - startTime`.
- Anti-blank modal: switch skenario wajib memiliki blok `default:` dengan fallback informatif.
- Aksesibilitas animasi: wajib membungkus animasi berat dalam `@media (prefers-reduced-motion: no-preference)`.
- Audio default: mute/mati di awal sebelum ada interaksi eksplisit pengguna.
- Mockup form: zero external network request, input sensitif tidak disimpan, disclaimer edukasi wajib tampil.

---

### Task 1: Pure Function Scoring & Unit Tests

**Files:**
- Create: `src/utils/scoring.js`
- Create: `src/utils/scoring.test.js`
- Modify: `package.json`

**Interfaces:**
- Produces:
  - `calculateMissionAccuracy(historyArray, totalQuestions): number` (Mengembalikan angka bulat 0 - 100 secara idempoten)
  - `isIdempotentAnswer(historyMap, questionId): boolean`

- [ ] **Step 1: Tambahkan script test ke `package.json`**

Di [package.json](file:///e:/laragon/www/simulasi/package.json), tambahkan script:
```json
"test": "node --test src/**/*.test.js"
```

- [ ] **Step 2: Tulis failing unit test di `src/utils/scoring.test.js`**

```javascript
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { calculateMissionAccuracy } from './scoring.js';

test('calculateMissionAccuracy returns 0 for empty history', () => {
  assert.strictEqual(calculateMissionAccuracy([], 10), 0);
  assert.strictEqual(calculateMissionAccuracy(null, 10), 0);
});

test('calculateMissionAccuracy is idempotent on duplicate question IDs', () => {
  const history = [
    { id: 'q1', correct: true },
    { id: 'q1', correct: false }, // user answered again
    { id: 'q2', correct: true }
  ];
  // q1 is false (latest), q2 is true -> 1 of 4 correct = 25%
  assert.strictEqual(calculateMissionAccuracy(history, 4), 25);
});

test('calculateMissionAccuracy calculates correct percentage with fixed denominator', () => {
  const history = [
    { id: 'q1', correct: true },
    { id: 'q2', correct: true },
    { id: 'q3', correct: true }
  ];
  // 3 out of 4 = 75%
  assert.strictEqual(calculateMissionAccuracy(history, 4), 75);
  // Cap at 100
  assert.strictEqual(calculateMissionAccuracy(history, 3), 100);
});
```

- [ ] **Step 3: Jalankan test untuk memverifikasi kegagalan**

Run: `npm test`
Expected: FAIL ("Cannot find module './scoring.js'")

- [ ] **Step 4: Implementasikan `src/utils/scoring.js`**

```javascript
/**
 * Menghitung persentase akurasi misi secara murni dan idempoten.
 * Setiap ID soal hanya dihitung 1 kali berdasarkan status jawaban terakhir.
 * Pembagi totalQuestions bersifat konstan (tidak dipengaruhi jumlah soal yang sempat dijawab).
 *
 * @param {Array<{id: string, correct: boolean}>} historyArray
 * @param {number} totalQuestions
 * @returns {number} Nilai persentase bulat (0 - 100)
 */
export function calculateMissionAccuracy(historyArray, totalQuestions) {
  if (!Array.isArray(historyArray) || !totalQuestions || totalQuestions <= 0) {
    return 0;
  }

  const uniqueAnswers = new Map();
  for (const item of historyArray) {
    if (item && item.id) {
      uniqueAnswers.set(item.id, Boolean(item.correct));
    }
  }

  let correctCount = 0;
  for (const isCorrect of uniqueAnswers.values()) {
    if (isCorrect) correctCount++;
  }

  const rawPercent = (correctCount / totalQuestions) * 100;
  return Math.min(100, Math.max(0, Math.round(rawPercent)));
}
```

- [ ] **Step 5: Jalankan test untuk memastikan lulus**

Run: `npm test`
Expected: PASS (All tests pass)

- [ ] **Step 6: Commit Task 1**

```bash
git add package.json src/utils/scoring.js src/utils/scoring.test.js
git commit -m "feat(scoring): add pure idempotent accuracy calculation with unit tests"
```

---

### Task 2: Storage Key Centralization & One-Time Migration

**Files:**
- Modify: `src/utils/storage.js`
- Modify: `src/utils/navigation.js`

**Interfaces:**
- Produces:
  - `export const STORAGE_KEY = 'cybergenz_pkm_progress_v1'`
  - `export function migrateLegacyProgress(): void`
  - `export function getStoredProgress(): object`
- Consumes:
  - `navigation.js` mengimpor `STORAGE_KEY` dan `getStoredProgress` dari `storage.js`

- [ ] **Step 1: Perbarui `src/utils/storage.js` dengan migrasi legacy progres dan ekspor konstanta**

Tambahkan fungsi migrasi: jika ada `cybergenz_progress_2026`, migrasikan ke `cybergenz_pkm_progress_v1` lalu hapus key lama.
Ekspor `STORAGE_KEY`.

- [ ] **Step 2: Sinkronkan `src/utils/navigation.js`**

Hapus hardcoded string `'cybergenz_progress_2026'` di baris 65 [navigation.js](file:///e:/laragon/www/simulasi/src/utils/navigation.js#L65).
Gunakan `STORAGE_KEY` yang diimpor dari `storage.js`.

- [ ] **Step 3: Uji fungsi migrasi dan hidrasi**

Verifikasi bahwa membuka aplikasi atau merefresh halaman membaca state siswa dari storage tanpa error.

- [ ] **Step 4: Commit Task 2**

```bash
git add src/utils/storage.js src/utils/navigation.js
git commit -m "fix(storage): centralize storage key and add one-time legacy migration"
```

---

### Task 3: Scenario Enum, Single Data Source & Safe Modal Fallback

**Files:**
- Create: `src/data/scenarioTypes.js`
- Modify: `src/data/phishingData.js`
- Modify: `server/routes/scenarios.routes.js`
- Modify: `src/components/modules/PhishingRadar/SimulatedBrowserModal.jsx`

**Interfaces:**
- Produces:
  - `SCENARIO_TYPES`: `{ DANA_LOGIN, APK_INSTALLER, FORM_KUOTA, IG_LOGIN, GAME_DIAMOND, LEGIT_CLASSROOM }`
  - `phishingScenarios`: dataset tunggal ber-tipe enum yang konsisten.
- Consumes:
  - `server/routes/scenarios.routes.js` mengimpor `phishingScenarios` dari `src/data/phishingData.js`.
  - `SimulatedBrowserModal.jsx` menggunakan `SCENARIO_TYPES` dan memiliki switch `default:` fallback.

- [ ] **Step 1: Buat `src/data/scenarioTypes.js`**

Definisikan enum konstanta:
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

- [ ] **Step 2: Standarisasi `src/data/phishingData.js` menggunakan `SCENARIO_TYPES`**

Pastikan skenario game diamond memiliki:
- `id: 'game-diamond'`
- `simType: SCENARIO_TYPES.GAME_DIAMOND`

- [ ] **Step 3: Hubungkan `server/routes/scenarios.routes.js` ke single dataset**

Ubah `scenarios.routes.js` agar langsung mengimpor `phishingScenarios` dari `../../src/data/phishingData.js` tanpa menduplikasi data array.

- [ ] **Step 4: Tambahkan `default:` safe fallback di `SimulatedBrowserModal.jsx`**

Jika `scenario.simType` tidak cocok dengan komponen mana pun, render kartu peringatan visual:
```jsx
<div style={{ padding: '32px', textAlign: 'center', color: '#64748b' }}>
  <AlertTriangle size={40} color="#f59e0b" style={{ margin: '0 auto 12px' }} />
  <h3>Simulasi Konten Sedang Dimuat</h3>
  <p>Tipe simulasi ({scenario.simType}) siap dipelajari pada pembaruan modul berikutnya.</p>
</div>
```

- [ ] **Step 5: Verifikasi build dan endpoint backend**

Run: `npm run build`
Expected: Berhasil tanpa error module resolution.

- [ ] **Step 6: Commit Task 3**

```bash
git add src/data/scenarioTypes.js src/data/phishingData.js server/routes/scenarios.routes.js src/components/modules/PhishingRadar/SimulatedBrowserModal.jsx
git commit -m "refactor(scenarios): establish scenario enum, single data source, and safe modal fallback"
```

---

### Task 4: Mockup Game Diamond (`GameDiamondMockup.jsx`)

**Files:**
- Create: `src/components/modules/PhishingRadar/modals/mockups/GameDiamondMockup.jsx`
- Modify: `src/components/modules/PhishingRadar/SimulatedBrowserModal.jsx`

**Interfaces:**
- Produces: `<GameDiamondMockup scenario={scenario} onBreach={handleBreach} />`
- Constraints: Banner disclaimer keamanan wajib tampil di bagian atas form, tidak ada network request eksternal.

- [ ] **Step 1: Buat `GameDiamondMockup.jsx`**

Komponen mockup dengan:
- Banner Edukasi: `⚠️ SIMULASI EDUKASI PKM UBBG: Data tidak dikirim ke internet & tidak disimpan. Dilarang memasukkan kata sandi asli!`
- Header: Giveaway 10.000 Diamond Mobile Legends & Free Fire.
- Roda Putar Interaktif (Spin Wheel) dengan CSS transform animasi putaran.
- Input: User ID Game, Server ID, dan Kata Sandi Akun.
- Tombol "Klaim Diamond Sekarang" yang memanggil `onBreach()` setelah delay 800ms.

- [ ] **Step 2: Daftarkan di `SimulatedBrowserModal.jsx`**

Import `GameDiamondMockup` dan kaitkan dengan case `SCENARIO_TYPES.GAME_DIAMOND`.

- [ ] **Step 3: Uji visual mockup**

Jalankan skenario 5 game diamond di browser virtual untuk memastikan form tampil elegan dan memicu simulasi peretasan.

- [ ] **Step 4: Commit Task 4**

```bash
git add src/components/modules/PhishingRadar/modals/mockups/GameDiamondMockup.jsx src/components/modules/PhishingRadar/SimulatedBrowserModal.jsx
git commit -m "feat(mockup): add game diamond phishing mockup with security disclaimer and wheel spin"
```

---

### Task 5: Rombak Forensik Email & Skenario "All-PASS Lookalike"

**Files:**
- Modify: `src/data/phishingData.js`
- Modify: `src/components/modules/PhishingRadar/views/EmailSpoofingView.jsx`

**Interfaces:**
- Produces:
  - Tampilan email realistis (Friendly name, From, To, Date, Subject, Surat berformat kartu institusi).
  - Kasus baru: Email penipuan domain lookalike `support@rnicrosoft-security.com` di mana SPF: PASS, DKIM: PASS, DMARC: PASS (mengajarkan bahwa lolos autentikasi != domain resmi).
  - Tombol toggle `Inspeksi Header Keamanan (SPF/DKIM/DMARC)` (jawaban tidak dibocorkan di awal).

- [ ] **Step 1: Tambahkan skenario lookalike All-PASS di `src/data/phishingData.js`**

Tambahkan drill baru:
```javascript
{
  id: 'email-lookalike-pass',
  title: 'Pembaruan Keamanan Akun Microsoft Darurat',
  category: 'Serangan Lookalike Canggih (All-PASS)',
  displaySender: 'Microsoft Security Team <security@rnicrosoft-security.com>',
  subject: 'Tindakan Segera: Akun Anda Dibatasi Dalam 24 Jam',
  summary: 'Email mengaku dari tim keamanan Microsoft resmi, meminta verifikasi sandi darurat.',
  bodyText: 'Halo Pengguna,\n\nKami mendeteksi aktivitas login yang mencurigakan pada akun Anda. Demi keamanan, Anda wajib memverifikasi ulang kredensial login Anda melalui tautan di bawah dalam waktu 24 jam:\n\nhttps://login.rnicrosoft-security.com/auth\n\nJika tidak diverifikasi, akun akan dinonaktifkan sementara.',
  rawHeaders: `From: Microsoft Security Team <security@rnicrosoft-security.com>
To: siswa.pkm@sekolah.sch.id
Subject: Tindakan Segera: Akun Anda Dibatasi Dalam 24 Jam
Received-SPF: pass (domain of security@rnicrosoft-security.com designates 198.51.100.22 as permitted sender)
DKIM-Signature: v=1; a=rsa-sha256; d=rnicrosoft-security.com; s=mail;
Authentication-Results: mx.google.com;
       spf=pass (sender IP is 198.51.100.22);
       dkim=pass header.i=@rnicrosoft-security.com;
       dmarc=pass (p=reject sp=reject)`,
  authStatus: {
    spf: 'PASS',
    dkim: 'PASS',
    dmarc: 'PASS'
  },
  isSpoofed: true,
  correctAction: 'fake',
  keyLesson: 'LULUS SPF/DKIM BUKAN BERARTI ASLI! Peretas mendaftarkan domain tiruan "rnicrosoft-security.com" (huruf r dan n digabung menyerupai m) dan mengonfigurasi DNS mereka sendiri sehingga semua protokol PASS. Selalu periksa ejaan nama domain pengirim!',
  forensicBreakdown: 'PERANGKAP HOMOGLYPH LOOKALIKE! Meskipun SPF, DKIM, dan DMARC semuanya PASS, domain pengirim adalah "rnicrosoft-security.com" (rn = m), bukan domain resmi microsoft.com!'
}
```

- [ ] **Step 2: Rombak `EmailSpoofingView.jsx`**

1. Render pesan email dalam kotak pratinjau klien email yang rapi.
2. Sembunyikan badge SPF/DKIM/DMARC di awal; tampilkan tombol *"Bongkar Header Teknis (SPF / DKIM / DMARC)"*.
3. Setelah siswa memilih aksi ("Email Asli" vs "Email Palsu"), buka ulasan komparatif yang menyoroti kenapa email tersebut palsu/asli.

- [ ] **Step 3: Uji coba interaktif**

Pastikan seluruh skenario email dapat diselesaikan dengan feedback yang jelas dan informatif.

- [ ] **Step 4: Commit Task 5**

```bash
git add src/data/phishingData.js src/components/modules/PhishingRadar/views/EmailSpoofingView.jsx
git commit -m "feat(email-spoofing): add realistic client view, header inspector toggle, and All-PASS lookalike drill"
```

---

### Task 6: PhishingRadar State & Score Integration

**Files:**
- Modify: `src/components/modules/PhishingRadar/PhishingRadar.jsx`

**Interfaces:**
- Consumes: `calculateMissionAccuracy` dari `src/utils/scoring.js`
- Eliminates: Stale closure bug pada `handleFinishAll`.

- [ ] **Step 1: Integrasikan `calculateMissionAccuracy` di `PhishingRadar.jsx`**

Gantikan perhitungan manual yang rawan stale closure.
Simpan riwayat gabungan secara terpusat:
```javascript
const combinedHistory = [...simHistory, ...domainHistory, ...emailHistory];
const totalDrills = scenarios.length + domainDrills.length + emailDrills.length;
const accuracy = calculateMissionAccuracy(combinedHistory, totalDrills);
```

- [ ] **Step 2: Pastikan soal terakhir langsung terhitung saat `handleFinishAll`**

Di callback `EmailSpoofingView`, kirim item terakhir atau perbarui array lokal sebelum memanggil `handleFinishAll`.

- [ ] **Step 3: Jalankan unit test dan uji simpan skor**

Pastikan nilai akurasi di layar kelulusan Misi 01 tersimpan ke state parent `onComplete(accuracy)`.

- [ ] **Step 4: Commit Task 6**

```bash
git add src/components/modules/PhishingRadar/PhishingRadar.jsx
git commit -m "fix(phishing-radar): eliminate stale closure and use pure calculation for mission accuracy"
```

---

### Task 7: Gamified Floating Score Burst & Audio Controls

**Files:**
- Create: `src/components/layout/FloatingScoreBurst.jsx`
- Create: `src/components/layout/FloatingScoreBurst.css`
- Modify: `src/utils/soundEffects.js`
- Modify: `src/components/layout/Navbar.jsx`
- Modify: `src/components/modules/PhishingRadar/views/WebSimulationView.jsx`
- Modify: `src/components/modules/PhishingRadar/views/DomainComparatorView.jsx`
- Modify: `src/components/modules/PhishingRadar/views/EmailSpoofingView.jsx`

**Interfaces:**
- Produces: `<FloatingScoreBurst text="+25 PTS!" trigger={burstTrigger} />`
- Produces: Default mute status di `soundEffects.js` (tidak autoplay sound di kelas).

- [ ] **Step 1: Buat `FloatingScoreBurst.jsx` dan `FloatingScoreBurst.css`**

Animasi CSS hardware-accelerated:
```css
@keyframes floatUpFade {
  0% { transform: translateY(0) scale(0.8); opacity: 0; }
  20% { transform: translateY(-8px) scale(1.15); opacity: 1; }
  80% { transform: translateY(-24px) scale(1); opacity: 1; }
  100% { transform: translateY(-36px) scale(0.9); opacity: 0; }
}
```

- [ ] **Step 2: Jadikan status audio default OFF / MUTE di `soundEffects.js`**

Ubah default `let isAudioMuted = true;` agar tidak mengejutkan di kelas proyektor, dengan ikon volume yang jelas di navbar.

- [ ] **Step 3: Sambungkan floating score burst ke aksi benar di ketiga view**

Picu burst `+25 PTS!` saat user menjawab benar.

- [ ] **Step 4: Commit Task 7**

```bash
git add src/components/layout/FloatingScoreBurst.jsx src/components/layout/FloatingScoreBurst.css src/utils/soundEffects.js src/components/layout/Navbar.jsx src/components/modules/PhishingRadar/views/*.jsx
git commit -m "feat(gamification): add floating score burst and classroom-friendly default mute audio"
```

---

### Task 8: Timestamp-based OTP 30s Gauge, Radar Sweep & Motion Accessibility

**Files:**
- Modify: `src/components/modules/TwoFactorShield/views/ActivationPracticeView.jsx`
- Modify: `src/components/modules/PhishingRadar/PhishingRadar.css`
- Modify: `src/index.css`

**Interfaces:**
- Produces:
  - Gauge melingkar SVG di layar HP virtual yang menghitung sisa waktu berdasarkan `Date.now() - startTime` (anti-drift).
  - Garis sweep radar 360° di latar kartu Phishing Radar.
  - Media query `@media (prefers-reduced-motion: reduce)` yang menonaktifkan rotasi dan sweep secara otomatis bagi pengguna dengan preferensi reduced motion.

- [ ] **Step 1: Implementasi OTP gauge berbasis timestamp di `ActivationPracticeView.jsx`**

Hitung sisa detik dari selisih waktu nyata (`30 - Math.floor((Date.now() - cycleStart) / 1000)`).
Render lingkaran SVG dengan `strokeDashoffset` dinamis.

- [ ] **Step 2: Tambahkan animasi radar sweep di `PhishingRadar.css`**

Buat elemen radar sweep visual di bagian atas kartu skenario:
```css
@keyframes radarSweep {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
```

- [ ] **Step 3: Tambahkan guard `@media (prefers-reduced-motion: reduce)` di `src/index.css`**

Matikan animasi terus menerus bagi pengguna yang menyalakan reduced motion di OS.

- [ ] **Step 4: Commit Task 8**

```bash
git add src/components/modules/TwoFactorShield/views/ActivationPracticeView.jsx src/components/modules/PhishingRadar/PhishingRadar.css src/index.css
git commit -m "feat(animations): add timestamp-based OTP gauge, radar sweep, and reduced-motion accessibility"
```

---

### Task 9: End-to-End Build & Visual Regression Verification

**Files:**
- Test all components via unit test & production build.

- [ ] **Step 1: Jalankan unit test**

Run: `npm test`
Expected: PASS (All scoring tests pass)

- [ ] **Step 2: Jalankan build produksi Vite**

Run: `npm run build`
Expected: Build sukses tanpa warning modul atau circular dependency.

- [ ] **Step 3: Verifikasi status Git**

Pastikan working directory bersih dan seluruh commit terstruktur rapi.
