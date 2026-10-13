# Fullstack Architecture and Refactor Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Membangun arsitektur Fullstack terpisah (Express API server di `server/` dan React modular di `src/`), menghapus modul sertifikat secara tuntas, memperbaiki fungsionalitas Reset, memecah berkas-berkas monolitik menjadi sub-komponen terpisah yang bersih, dan meningkatkan kualitas skenario keamanan siber.

**Architecture:** Express backend mandiri di port 5000 menyediakan REST API (`/api/scenarios`, `/api/drills`, `/api/scanner/analyze`, `/api/dns/check`). Vite server di port 3000 mem-proxy request `/api` ke Express. Frontend React dirombak dengan API client terpusat (dilengkapi fallback offline) dan komponen modular bersih (< 200 baris per file).

**Tech Stack:** Node.js, Express, React 18, Vite 6, Lucide-React, Canvas-Confetti, Modern Vanilla CSS.

**Spec:** `docs/superpowers/specs/2026-10-13-fullstack-architecture-and-refactor-design.md`

## Global Constraints
- Target platform: Node.js >= 18, Browser Modern.
- Backend port: 5000. Frontend port: 3000.
- Vite proxy meneruskan `/api` ke `http://localhost:5000`.
- Offline resilience: API Client frontend tidak boleh crash jika backend belum berjalan; otomatis gunakan data fallback lokal.
- Sertifikat dihapus total (tidak ada artefak cert yang tersisa di UI atau state).
- Reset button di Navbar harus menggunakan modal konfirmasi kustom yang andal dan membersihkan seluruh state serta `localStorage`.
- Tidak ada file komponen monolitik yang membengkak (> 250 baris).

---

### Task 1: Inisialisasi Backend Express API (`server/`)

**Files:**
- Create: `server/package.json`
- Create: `server/index.js`
- Create: `server/services/urlAnalyzerService.js`
- Create: `server/services/dnsBlocklistService.js`
- Create: `server/routes/health.routes.js`
- Create: `server/routes/scenarios.routes.js`
- Create: `server/routes/drills.routes.js`
- Create: `server/routes/scanner.routes.js`
- Create: `server/routes/dns.routes.js`

**Interfaces:**
- Produces:
  - `GET /api/health` -> `{ status: "ok", timestamp: string }`
  - `GET /api/scenarios/phishing` -> `Array<Scenario>`
  - `GET /api/drills/domains` -> `Array<DomainDrill>`
  - `GET /api/drills/emails` -> `Array<EmailDrill>`
  - `POST /api/scanner/analyze` -> `{ score: number, riskLevel: string, features: Array }`
  - `GET /api/dns/check?domain=...` -> `{ domain: string, isBlocked: boolean, sinkholeIp: string }`

- [ ] **Step 1: Buat `server/package.json` dan install dependensi express + cors**
- [ ] **Step 2: Implementasi services (`urlAnalyzerService.js` & `dnsBlocklistService.js`)**
- [ ] **Step 3: Implementasi route handlers di `server/routes/`**
- [ ] **Step 4: Implementasi entrypoint `server/index.js`**
- [ ] **Step 5: Uji jalankan server dan curl endpoint `/api/health`**
- [ ] **Step 6: Commit backend scaffolding**

---

### Task 2: Konfigurasi Vite Proxy & Frontend API Client Terpusat

**Files:**
- Modify: `vite.config.js`
- Create: `src/api/apiClient.js`

**Interfaces:**
- Consumes: Backend REST API di `http://localhost:5000`
- Produces: 
  - `apiClient.getPhishingScenarios()`: Promise<Array>
  - `apiClient.getDomainDrills()`: Promise<Array>
  - `apiClient.getEmailDrills()`: Promise<Array>
  - `apiClient.analyzeUrl(url)`: Promise<AnalysisResult>
  - `apiClient.checkDns(domain)`: Promise<DnsResult>

- [ ] **Step 1: Perbarui `vite.config.js` dengan konfigurasi proxy `/api`**
- [ ] **Step 2: Implementasi `src/api/apiClient.js` dengan fallback otomatis ke dataset lokal jika fetch gagal**
- [ ] **Step 3: Uji pemanggilan API client via node / browser**
- [ ] **Step 4: Commit konfigurasi proxy dan api client**

---

### Task 3: Hapus Fitur Sertifikat Secara Total

**Files:**
- Delete: `src/components/layout/CertificateModal.jsx`
- Delete: `src/components/layout/CertificateModal.css`
- Modify: `src/App.jsx`
- Modify: `src/components/layout/Navbar.jsx`
- Modify: `src/components/layout/MissionHub.jsx`

**Interfaces:**
- Menghilangkan seluruh prop `onViewCertificate`, state `isCertificateOpen`, dan elemen tombol/badge sertifikat.

- [ ] **Step 1: Hapus berkas `CertificateModal.jsx` dan `CertificateModal.css`**
- [ ] **Step 2: Bersihkan import dan state sertifikat di `src/App.jsx`**
- [ ] **Step 3: Bersihkan tombol sertifikat di `src/components/layout/Navbar.jsx`**
- [ ] **Step 4: Bersihkan tombol/kartu sertifikat di `src/components/layout/MissionHub.jsx`**
- [ ] **Step 5: Uji build `npm run build` untuk memverifikasi tidak ada sisa dependensi**
- [ ] **Step 6: Commit penghapusan fitur sertifikat**

---

### Task 4: Perbaikan Total Fitur Reset Data & Modal Konfirmasi Kustom

**Files:**
- Create: `src/components/layout/ResetConfirmModal.jsx`
- Modify: `src/components/layout/Navbar.jsx`
- Modify: `src/App.jsx`
- Modify: `src/utils/storage.js`

**Interfaces:**
- Produces: `ResetConfirmModal` dengan tombol "Batalkan" dan "Ya, Reset Semuanya"
- `storage.js` membersihkan memori dan `localStorage` secara menyeluruh

- [ ] **Step 1: Buat komponen `ResetConfirmModal.jsx` dengan UI cyberpunk elegan**
- [ ] **Step 2: Pasang modal reset di `Navbar.jsx` menggantikan `window.confirm`**
- [ ] **Step 3: Perbaiki handler `handleReset` di `App.jsx` agar mereset seluruh state modul dan mengembalikan tampilan ke `welcome`**
- [ ] **Step 4: Uji klik tombol reset dan verifikasi seluruh skor kembali ke 0**
- [ ] **Step 5: Commit perbaikan fitur reset**

---

### Task 5: Refaktorisasi & Dekomposisi Bersih Modul PhishingRadar

**Files:**
- Create: `src/components/modules/PhishingRadar/views/WebSimulationView.jsx`
- Create: `src/components/modules/PhishingRadar/views/DomainComparatorView.jsx`
- Create: `src/components/modules/PhishingRadar/views/EmailSpoofingView.jsx`
- Create: `src/components/modules/PhishingRadar/views/UrlScannerView.jsx`
- Create: `src/components/modules/PhishingRadar/modals/mockups/InstagramMockup.jsx`
- Create: `src/components/modules/PhishingRadar/modals/mockups/ApkDownloadMockup.jsx`
- Create: `src/components/modules/PhishingRadar/modals/mockups/SmsFormMockup.jsx`
- Create: `src/components/modules/PhishingRadar/modals/mockups/DanaLoginMockup.jsx`
- Modify: `src/components/modules/PhishingRadar/SimulatedBrowserModal.jsx`
- Modify: `src/components/modules/PhishingRadar/PhishingRadar.jsx`

**Interfaces:**
- Komponen `PhishingRadar.jsx` menjadi orchestrator bersih (< 150 baris).
- Setiap view memiliki state dan interaksi terisolasi.

- [ ] **Step 1: Buat mockup browser modular di folder `modals/mockups/`**
- [ ] **Step 2: Rampingkan `SimulatedBrowserModal.jsx` hanya sebagai browser chrome container**
- [ ] **Step 3: Buat 4 sub-views modular (`WebSimulationView`, `DomainComparatorView`, `EmailSpoofingView`, `UrlScannerView`)**
- [ ] **Step 4: Rampingkan `PhishingRadar.jsx` induk untuk menghubungkan 4 views dan `apiClient`**
- [ ] **Step 5: Uji navigasi tab dan fungsi simulasi phishing**
- [ ] **Step 6: Commit dekomposisi PhishingRadar**

---

### Task 6: Dekomposisi Modul TwoFactorShield, PasswordVault, dan PrivacyShield

**Files:**
- Create: `src/components/modules/TwoFactorShield/views/AttackDemoView.jsx`
- Create: `src/components/modules/TwoFactorShield/views/ActivationPracticeView.jsx`
- Modify: `src/components/modules/TwoFactorShield/TwoFactorShield.jsx`
- Create: `src/components/modules/PasswordVault/components/PasswordTester.jsx`
- Create: `src/components/modules/PasswordVault/components/PassphraseGenerator.jsx`
- Modify: `src/components/modules/PasswordVault/PasswordVault.jsx`
- Create: `src/components/modules/PrivacyShield/components/SocialProfilePreview.jsx`
- Create: `src/components/modules/PrivacyShield/components/PrivacySettingsToggles.jsx`
- Modify: `src/components/modules/PrivacyShield/PrivacyShield.jsx`

**Interfaces:**
- Memecah setiap modul menjadi sub-komponen terfokus tanpa kode bertumpuk.

- [ ] **Step 1: Pecah `TwoFactorShield` menjadi `AttackDemoView` dan `ActivationPracticeView`**
- [ ] **Step 2: Pecah `PasswordVault` menjadi `PasswordTester` dan `PassphraseGenerator`**
- [ ] **Step 3: Pecah `PrivacyShield` menjadi `SocialProfilePreview` dan `PrivacySettingsToggles`**
- [ ] **Step 4: Uji interaksi pada setiap modul yang telah didekomposisi**
- [ ] **Step 5: Commit dekomposisi 3 modul**

---

### Task 7: Peningkatan Mutu Skenario Edukasi & Pengujian End-to-End

**Files:**
- Modify: `src/data/phishingData.js`
- Modify: `server/routes/scenarios.routes.js`
- Modify: `server/routes/drills.routes.js`

**Interfaces:**
- Memperkaya skenario dengan:
  - Kasus APK Android: simulasi peringatan izin *Accessibility Service & SMS*.
  - Kasus Fintech: DANA Kaget palsu vs portal resmi.
  - Kasus Email Spoofing: raw header realistis dengan status SPF/DKIM/DMARC.

- [ ] **Step 1: Tingkatkan skenario di `src/data/phishingData.js` dan backend routes**
- [ ] **Step 2: Uji seluruh alur dari Welcome Screen -> Mission Hub -> 4 Modul -> Reset**
- [ ] **Step 3: Verifikasi build frontend `npm run build`**
- [ ] **Step 4: Commit peningkatan skenario dan verifikasi**
