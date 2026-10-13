# Spesifikasi Desain: Tactical Cyber-Ops Overhaul, Gamifikasi Meriah & Perbaikan Sistem Menyeluruh

**Tanggal:** 14 Oktober 2026  
**Status:** Disetujui  
**Penanggung Jawab:** Gempur Budi Anarki  
**Institusi:** Universitas Bina Bangsa Getsempena (UBBG)  
**Lingkup:** Perbaikan Forensik Email Spoofing, Penambahan Mockup Diamond Game, Perbaikan Router & Scoring State, Animasi Radar Sweep, Floating XP (+25 PTS), Gauge Lingkaran OTP 2FA, dan Efek Perisai Privasi Meriah.

---

## 1. Latar Belakang & Identifikasi Masalah

Berdasarkan evaluasi pengujian pengguna secara langsung:
1. **Forensik Email Phishing Bermasalah & Spoiler Awal:**
   * Di `EmailSpoofingView.jsx`, status autentikasi SPF/DKIM/DMARC langsung terbuka di awal dengan badge hijau/merah, sehingga membocorkan jawaban sebelum siswa menganalisis.
   * Teks surat yang ditampilkan hanya berupa kalimat ringkasan pengembang (*developer notes*), bukan format pesan email nyata yang meyakinkan.
   * Tidak ada ulasan komparasi visual yang jelas setelah siswa menjawab.
2. **Mockup Game Diamond Blank Putih:**
   * Skenario 5 (`game-diamond`) di `phishingData.js` tidak memiliki komponen mockup di `SimulatedBrowserModal.jsx`, sehingga saat siswa mengklik "Buka Tautan di Browser Virtual", layar hanya tampil putih kosong.
3. **Bug Sinkronisasi Skor Akhir (Stale Closure):**
   * Di `PhishingRadar.jsx`, fungsi `handleFinishAll()` membaca state `emailHistory` yang belum diperbarui oleh siklus render React saat soal email terakhir dijawab, menyebabkan skor persentase akurasi siswa menjadi berkurang tidak adil.
4. **Desinkronisasi Router & Storage:**
   * `navigation.js` masih memeriksa key lama `cybergenz_progress_2026`, sedangkan `storage.js` menggunakan `cybergenz_pkm_progress_v1`. Refresh browser di halaman awal dapat mengakibatkan hilangnya sesi siswa.
5. **Animasi Datar & Kurang Semarak (*Underwhelming Visuals*):**
   * Tidak ada feedback animasi angka melayang (*floating score burst*) saat jawaban benar.
   * Phishing Radar tidak memiliki animasi garis putar radar (*tactical sweep*).
   * Misi 2FA tidak memiliki timer visual melingkar (*circular progress countdown*).
   * Privacy Shield tidak memiliki letupan visual saat mencapai 100%.

---

## 2. Arsitektur Solusi & Komponen

### 2.1 Perbaikan Inti Sinkronisasi Data & Router
* **Penyelarasan Key Storage:** Mengubah `navigation.js` untuk membaca key tunggal `cybergenz_pkm_progress_v1`.
* **Sinkronisasi Dataset Skenario Phishing:** Menyelaraskan seluruh ID dan properti skenario antara `server/routes/scenarios.routes.js`, `server/routes/drills.routes.js`, dan `src/data/phishingData.js`:
  * `dana-kaget-phishing` (DANA fintech)
  * `capcut-apk-mod` (Android malware SMS dropper)
  * `kuota-kemdikbud-fake` (Data harvesting kuota)
  * `ig-copyright-phishing` (Instagram credential clone)
  * `game-diamond-scam` (Event klaim 10.000 diamond gratis)
  * `google-classroom-legit` (Tautan resmi kelas daring)

### 2.2 Komponen Mockup Baru: `GameDiamondMockup.jsx`
* Berkas: `src/components/modules/PhishingRadar/modals/mockups/GameDiamondMockup.jsx`
* Menampilkan:
  * Banner mencolok event "GIVEAWAY 10.000 DIAMOND MLBB & FREE FIRE 2026".
  * Roda keberuntungan berputar (*Spinning Lucky Wheel*) interaktif.
  * Formulir penipuan yang meminta ID Akun Game, Server ID, dan Kata Sandi Akun Moonton / Facebook.
  * Tombol aksi "Klaim Diamond ke Kotak Surat Game" yang memicu simulasi peretasan akun (*Breach Overlay*).
* Integrasi di `SimulatedBrowserModal.jsx` untuk tipe skenario `game_diamond`.

### 2.3 Rombak Total Forensik Email Spoofing (`EmailSpoofingView.jsx`)
* **Tampilan Email Klien Nyata:**
  * Header email lengkap: Pengirim terlihat (*Friendly Name*), Alamat email asli (*From Address*), Kepada, Tanggal kirim, dan Subjek berurgensi tinggi.
  * Isi badan email berformat kartu resmi (dilengkapi peringatan manipulasi rasa panik / diskon palsu).
* **Mode Deteksi Adil (Tanpa Bocoran Awal):**
  * Status badge SPF/DKIM/DMARC disembunyikan dalam tombol interaktif **"Inspeksi Header MIME Teknis (SPF / DKIM)"**.
  * Siswa dilatih membaca parameter teknis: apakah SPF bertuliskan `FAIL`, `PASS`, atau IP server pengirim adalah IP publik asing.
* **Ulasan Komparasi Hasil:**
  * Begitu siswa memilih "Email Asli & Terverifikasi" atau "Email Palsu (Spoofed)", sistem membuka ulasan forensik komparatif: menyoroti kenapa email tersebut palsu/asli dan apa saja ciri-ciri (*red flags*) yang menjadi jebakan.

### 2.4 Perbaikan State & Akumulasi Skor (`PhishingRadar.jsx`)
* Fungsi pencatatan hasil dimodifikasi untuk menerima parameter riwayat terbaru secara langsung tanpa menunggu update asynchronous state React.
* Menghitung skor total akurasi dari jumlah kasus yang benar dibagi total kasus yang diselesaikan (skala 0 - 100%).

---

## 3. Sistem Animasi & Gamifikasi Meriah (Cyber-Ops Engine)

### 3.1 Komponen Floating Score (`FloatingScoreBurst.jsx`)
* Efek angka hijau neon melayang naik secara mulus: `+25 PTS! / TEPAT!` dengan glow bayangan hijau dan suara synth nada keberhasilan.
* Dipicu di:
  * Phishing Radar (saat menandai phishing/aman dengan benar)
  * Domain Comparator (saat memilih domain asli yang benar)
  * Email Spoofing (saat membedakan email spoofed vs legit)
  * 2FA Shield (saat sukses mengonfirmasi kode OTP)
  * Password Vault (saat mencapai status kuat >= 80%)
  * Privacy Shield (saat skor privasi mencapai 100%)

### 3.2 Efek Radar Scanning Sweep (`PhishingRadar.css`)
* Menambahkan animasi lingkaran radar militer dengan garis pemindai hijau/merah berputar 360 derajat di latar belakang kartu skenario Phishing Radar.
* Memberikan sensasi operasi pertahanan siber aktif (*live tactical radar*).

### 3.3 Visual 2FA: Terminal Matrix & Circular Gauge OTP (`TwoFactorShield`)
* **Terminal Hacker:** Efek ketikan baris teks berkedip layaknya terminal Linux hacker sungguhan saat serangan bot brute-force diluncurkan.
* **Circular Gauge OTP:** Lingkaran SVG berputar yang mengecil warnanya dari hijau ke merah saat hitungan mundur 30 detik pada HP virtual.

### 3.4 Visual Password Vault: Odometer Counter (`PasswordVault`)
* Teks estimasi waktu retas hacker beranimasi menghitung dari hitungan milidetik secara dramatis menuju estimasi waktu sesungguhnya.
* Bar kekuatan sandi bertransisi warna dinamis (Merah -> Kuning -> Hijau Neon).

### 3.5 Visual Privacy Shield: Shield Burst Confetti (`PrivacyShield`)
* Ketika ke-5 toggle dinyalakan dan skor privasi mencapai 100%, lencana perisai memancarkan animasi *shield pulse* dan menembakkan partikel micro-confetti.

---

## 4. Rencana Pengujian & Validasi

1. **Uji Mockup Game Diamond:** Buka skenario diamond game di browser virtual, pastikan antarmuka render sempurna dan form pemicu breach bekerja tanpa eror.
2. **Uji Forensik Email:** Verifikasi bahwa badge SPF/DKIM tidak bocor sebelum dibuka, surat tampil realistis, dan jawaban benar/salah terdeteksi presisi.
3. **Uji Perhitungan Skor Phishing Radar:** Selesaikan ketiga tahap (Web, Domain, Email) dan pastikan skor akhir di layar kelulusan sesuai dengan jumlah jawaban benar tanpa bug closure.
4. **Uji Refresh & Navigasi:** Refresh browser saat berada di dalam modul dan pastikan identitas siswa serta posisi route tidak ter-reset.
5. **Uji Efek Animasi & Audio:** Pastikan animasi floating point `+25 PTS!`, radar sweep, circular OTP, dan confetti berjalan mulus 60 FPS pada mobile maupun desktop proyektor.
6. **Verifikasi Build:** Jalankan `npm run build` dan pastikan proses build bersih 0 error.
