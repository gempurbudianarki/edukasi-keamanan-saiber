# Neo-Brutalism Modern Gen-Z UI/UX Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merombak total antarmuka UI/UX CyberGenZ Simulator menjadi gaya Neo-Brutalism Modern Gen-Z (border 3px hitam, hard box-shadow 4px 4px 0 #000, palet pop enerjik, interaksi taktil kenyal, stiker badge tegas) menggunakan panduan dari skill Impeccable dan UI-UX Pro Max.

**Architecture:** Menerapkan sistem token CSS kustom terpadu di `src/index.css`, kemudian memperbarui CSS terisolasi dan komponen layout serta 4 modul pembelajaran (Phishing, 2FA, Password, Privacy) secara bertahap tanpa merusak logika skor idempoten, state routing, maupun sintesis audio Web Audio API.

**Tech Stack:** React 18, Vite 6, Pure Vanilla CSS (CSS Grid, Flexbox, Neo-Brutalism Design Tokens, Space Grotesk & JetBrains Mono Fonts), Lucide React.

**Spec:** [docs/superpowers/specs/2026-10-14-neobrutalism-ui-ux-design.md](file:///e:/laragon/www/simulasi/docs/superpowers/specs/2026-10-14-neobrutalism-ui-ux-design.md)

## Global Constraints

- Wajib menggunakan Pure Vanilla CSS (dilarang menginstal TailwindCSS/Bootstrap).
- Border default kartu dan tombol: `3px solid #000000`.
- Bayangan default: `4px 4px 0px #000000` (tanpa blur).
- Hover tombol: `transform: translate(-2px, -2px); box-shadow: 6px 6px 0px #000000;`.
- Active (klik) tombol: `transform: translate(2px, 2px); box-shadow: 1px 1px 0px #000000;`.
- Canvas latar belakang: `#f8f7f2` (warm retro paper canvas).
- Seluruh 4 modul fungsionalitas, scoring idempoten, dan Web Audio API tetap bekerja 100%.

---

### Task 1: Fondasi Token & CSS Global Neo-Brutalism (`src/index.css`)

**Files:**
- Modify: `src/index.css`
- Test: `npm test`

- [ ] **Step 1: Impor Google Fonts Space Grotesk & JetBrains Mono di `src/index.css`**
- [ ] **Step 2: Deklarasikan variabel token `--nb-*` lengkap (warna, border 3px, hard shadow, radius)**
- [ ] **Step 3: Definisikan style tombol `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-danger` dengan efek tekan taktil**
- [ ] **Step 4: Definisikan style kartu `.glass-panel` / `.nb-card` dengan border hitam 3px dan bayangan balok**
- [ ] **Step 5: Definisikan varian stiker badge `.badge-red`, `.badge-green`, `.badge-cyan`, `.badge-amber`, `.badge-purple`**
- [ ] **Step 6: Jalankan `npm test` untuk memastikan environment pengujian aman**

---

### Task 2: Rombak Komponen Layout & Navigasi

**Files:**
- Modify: `src/components/layout/layout.css`
- Modify: `src/components/layout/Navbar.jsx`
- Modify: `src/components/layout/WelcomeScreen.css`
- Modify: `src/components/layout/WelcomeScreen.jsx`
- Modify: `src/components/layout/MissionHub.jsx`
- Modify: `src/components/layout/ResetConfirmModal.jsx`

- [ ] **Step 1: Rombak `Navbar.jsx` & `layout.css` menjadi bilah putih tegas berborder 3px hitam dengan logo berbingkai stiker**
- [ ] **Step 2: Rombak `WelcomeScreen.css` & `WelcomeScreen.jsx` dengan pita stiker peringatan PKM UBBG dan input nama siswa taktil**
- [ ] **Step 3: Rombak `MissionHub.jsx` dengan 4 kartu misi balok berstiker pop (Red, Green, Cyan, Yellow)**
- [ ] **Step 4: Rombak `ResetConfirmModal.jsx` dengan jendela peringatan neo-brutalist ber-border 3px hitam**
- [ ] **Step 5: Uji navigasi Beranda, Mission Hub, dan dialog reset di browser**

---

### Task 3: Rombak Modul 01 (Phishing Radar & Simulated Browser)

**Files:**
- Modify: `src/components/modules/PhishingRadar/PhishingRadar.css`
- Modify: `src/components/modules/PhishingRadar/SimulatedBrowser.css`
- Modify: `src/components/modules/PhishingRadar/SimulatedBrowserModal.jsx`
- Modify: `src/components/modules/PhishingRadar/modals/mockups/DanaLoginMockup.css`

- [ ] **Step 1: Rombak tab navigasi Phishing Radar (`PhishingRadar.css`) menjadi tombol stiker neo-brutalist**
- [ ] **Step 2: Rombak `SimulatedBrowser.css` menjadi jendela browser tebal berborder hitam dengan address bar kontras**
- [ ] **Step 3: Rombak DEFCON-1 Breach Overlay dengan garis pita bahaya militer kuning-hitam dan 3 kartu ancaman balok putih**
- [ ] **Step 4: Rombak kartu komparasi domain dan forensik email dengan stempel stiker PASS/FAIL**
- [ ] **Step 5: Verifikasi simulasi phishing, inspeksi header email, dan scanner URL**

---

### Task 4: Rombak Modul 02 (Benteng 2FA)

**Files:**
- Modify: `src/components/modules/TwoFactorShield/TwoFactorShield.css`
- Modify: `src/components/modules/TwoFactorShield/views/AttackDemoView.jsx`
- Modify: `src/components/modules/TwoFactorShield/views/ActivationPracticeView.jsx`

- [ ] **Step 1: Rombak split arena: Terminal Kali Linux kiri berborder 3px hitam dan bodi iPhone neo-brutalist di kanan**
- [ ] **Step 2: Rombak notifikasi push Dynamic Island dengan tombol tebal "TOLAK & BLOKIR" taktil**
- [ ] **Step 3: Rombak formulir PIN 6 kotak terpisah dengan border 3px tebal dan gauge TOTP melingkar**
- [ ] **Step 4: Rombak tampilan 4 kartu kode darurat pemulihan (*Emergency Backup Codes*) menjadi stiker balok**
- [ ] **Step 5: Uji alur demo serangan HydraBot dan simulasi aktivasi 2FA mandiri**

---

### Task 5: Rombak Modul 03 (Password Vault) & Modul 04 (Privacy Shield)

**Files:**
- Modify: `src/components/modules/PasswordVault/PasswordVault.css`
- Modify: `src/components/modules/PasswordVault/components/PasswordTester.jsx`
- Modify: `src/components/modules/PasswordVault/components/PassphraseGenerator.jsx`
- Modify: `src/components/modules/PrivacyShield/PrivacyShield.css`
- Modify: `src/components/modules/PrivacyShield/components/SocialProfilePreview.jsx`
- Modify: `src/components/modules/PrivacyShield/components/PrivacySettingsToggles.jsx`

- [ ] **Step 1: Rombak indikator 5-segmen Password Vault menjadi 5 balok bata tebal warna-warni bersekat hitam**
- [ ] **Step 2: Rombak tampilan telemetri GPU Cluster 8x RTX 4090 dan generator passphrase 4-token Indonesia**
- [ ] **Step 3: Rombak mockup smartphone profil Instagram `@pelajar_kekinian` dengan bodi neo-brutalist dan frosted lock**
- [ ] **Step 4: Rombak 6 sakelar privasi iOS menjadi sakelar balok taktil (*tactile brutal toggle*) dengan border 3px**
- [ ] **Step 5: Uji kalkulasi Shannon Bit Entropy dan perisai privasi 0–100%**

---

### Task 6: Audit Kualitas, Build Produksi & Verifikasi Akhir

**Files:**
- Test: `npm test`
- Build: `npm run build`

- [ ] **Step 1: Jalankan seluruh rangkaian unit test (`npm test`)**
- [ ] **Step 2: Jalankan proses build produksi (`npm run build`) dan pastikan zero warning/error**
- [ ] **Step 3: Verifikasi responsivitas pada resolusi desktop dan mobile**
- [ ] **Step 4: Periksa kepatuhan aksesibilitas (`prefers-reduced-motion` dan kontras WCAG AAA)**
