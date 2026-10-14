# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

- Framework: React 18 SPA (Functional components, hooks)
- Build tool: Vite 6
- Styling: Pure Vanilla CSS (Design tokens, Neo-Brutalism theme, CSS Grid & Flexbox, no Tailwind)
- Icons: Lucide React
- Visual Effects: Canvas Confetti
- Audio: Web Audio API Oscillator Synthesizer (Zero external audio files)
- State & Persistence: LocalStorage with session recovery & migration
- Backend API: Node.js & Express 5.3 (Port 5000) with resilient offline fallback

## Users

- Siswa SMA/SMK, mahasiswa, dan remaja Generasi Z (Gen-Z) di Indonesia.
- Guru dan fasilitator pelatihan literasi digital di sekolah.
- Audiens Program Kreativitas Mahasiswa (PKM) Universitas Bina Bangsa Getsempena (UBBG) Banda Aceh 2026.

## Product Purpose

Media simulasi pembelajaran interaktif 1:1 untuk melatih kepekaan dan refleks pertahanan keamanan siber generasi muda dalam menghadapi ancaman nyata: phishing web & APK, pembajakan akun tanpa 2FA, peretasan kata sandi lemah, dan bahaya doxxing di media sosial.

## Positioning

Bukan sekadar kuis pilihan ganda atau materi PDF statis, melainkan simulasi langsung interaktif yang menghadirkan:
1. Browser virtual 1:1 tiruan nyata (DANA Kaget Rp 250k, APK CapCut Mod, Game Diamond Lucky Spin, Google Classroom).
2. Terminal hacker Kali Linux HydraBot bertarung langsung melawan smartphone dengan Dynamic Island 2FA push notification.
3. Telemetri brute-force 8x NVIDIA RTX 4090 GPU cluster dengan Shannon Bit Entropy dan generator passphrase NIST.
4. Profil virtual Instagram 1:1 dengan frosted glass privacy lock dan audit 6 titik kebocoran privasi.
5. Konsekuensi dramatis DEFCON-1 dengan alarm sirine sintetis jika siswa terjebak serangan.

## Operating Context

- Digunakan di ruang kelas lab komputer sekolah, proyektor kelas (didukung *Presenter Mode*), dan smartphone siswa.
- Koneksi internet sekolah sering lambat atau tidak stabil, sehingga aplikasi dirancang tahan offline (*resilient client fallback*).
- Siswa mengerjakan secara mandiri atau didampingi fasilitator pengajar.

## Capabilities and Constraints

- 4 Misi pembelajaran utama yang wajib diselesaikan: Phishing Radar, Benteng 2FA, Password Vault, Privacy Shield.
- Skor akurasi idempoten (anti-point farming, pembagi tetap).
- Tidak boleh mengirim data siswa ke internet (privasi penuh).
- Tahan terhadap F5 / browser reload (penyimpanan progres lokal otomatis).
- Aksesibilitas: Mendukung `prefers-reduced-motion` dan mode hening audio di ruang kelas.

## Brand Commitments

- Nama: **CyberGenZ Simulator**
- Pengembang/Penanggung Jawab: Gempur Budi Anarki & Tim PKM UBBG Banda Aceh 2026.
- Arah Visual Baru: **Neo-Brutalism Modern Gen-Z** (Border hitam tebal 3px, hard offset box-shadow `4px 4px 0 #000`, warna pop kontras tinggi, stiker badge tebal, tipografi tajam & enerjik).

## Evidence on Hand

- Dataset skenario phishing nyata Indonesia (`src/data/phishingData.js`).
- Algoritma Shannon Bit Entropy & Passphrase NIST (`src/data/passwordRules.js`).
- Mesin heuristik URL & simulasi HaGeZi DNS blocklist (`src/utils/urlAnalyzer.js`, `server/services/`).
- Unit test Node.js 100% lulus (`npm test`).
- Production bundle Vite 100% lulus (`npm run build`).

## Product Principles

1. **Sensasi Nyata Tanpa Bahaya**: Membawa siswa ke situasi serangan siber realistis tanpa risiko kehilangan data asli.
2. **Pedagogi Kritis Anti-Dogma**: Tidak sekadar mengajarkan "centang hijau = aman", melainkan melatih nalar kritis (misal: kasus domain tiruan di mana semua SPF/DKIM lolos).
3. **Desain Berani, Enerjik, & Berkarakter (Neo-Brutalism)**: Menghindari desain korporat yang kaku dan membosankan; antarmuka terasa hidup, taktil, dan mengundang interaksi bagi Gen Z.
