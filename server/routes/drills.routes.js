import { Router } from 'express';

const router = Router();

export const DOMAIN_COMPARISON_DRILLS = [
  {
    id: 'bca-typo',
    title: 'Perbankan: Deteksi Domain Palsu KlikBCA',
    context: 'Kamu menerima SMS pengalihan verifikasi tarif transfer perbankan.',
    domainA: {
      name: 'https://www.klikbca.com/login',
      isLegit: true,
      analysis: 'Domain resmi PT Bank Central Asia Tbk. TLD .com terdaftar sejak 2000 dengan Extended Validation SSL.'
    },
    domainB: {
      name: 'https://www.klikbca-layanan-ebank.xyz/login',
      isLegit: false,
      analysis: 'Palsu! Menggunakan teknik Typosquatting & Subdomain Deception dengan TLD murah .xyz.'
    },
    correctAnswer: 'A',
    keyPoint: 'Domain resmi perbankan di Indonesia tidak pernah menggunakan TLD .xyz atau menambahkan embel-embel hyphen panjang.'
  },
  {
    id: 'kemdikbud-subdomain',
    title: 'Pemerintah: Deteksi Domain Beasiswa PIP',
    context: 'Pesan broadcast grup kelas membagikan link pencairan dana PIP beasiswa.',
    domainA: {
      name: 'http://kemdikbud.go.id.info-beasiswa-pelajar.club',
      isLegit: false,
      analysis: 'Palsu! Nama "kemdikbud.go.id" hanya diletakkan sebagai subdomain penipu. Domain aslinya adalah "info-beasiswa-pelajar.club".'
    },
    domainB: {
      name: 'https://pip.kemdikbud.go.id/login',
      isLegit: true,
      analysis: 'Resmi! Host utamanya adalah "kemdikbud.go.id" dengan hierarki subdomain resmi "pip".'
    },
    correctAnswer: 'B',
    keyPoint: 'Selalu periksa 2 kata terakhir sebelum garis miring pertama! Domain utama Indonesia untuk instansi resmi wajib berakhiran ".go.id".'
  },
  {
    id: 'dana-punycode',
    title: 'Fintech: Jebakan Karakter Homograf (Punycode)',
    context: 'Akun bot Telegram membagikan promosi voucher diskon belanja DANA.',
    domainA: {
      name: 'https://www.dana.id/promo',
      isLegit: true,
      analysis: 'Domain resmi DANA Indonesia berakhiran ccTLD resmi (.id) terdaftar di PANDI.'
    },
    domainB: {
      name: 'https://www.dаna.com/promo',
      isLegit: false,
      analysis: 'Palsu (Punycode)! Huruf "а" adalah huruf Sirilik (Cyrillic Small Letter A / U+0430), bukan huruf Latin "a". Punycode aslinya: "xn--dna-7cd.com".'
    },
    correctAnswer: 'A',
    keyPoint: 'Serangan Homograph memanfaatkan karakter huruf asing yang terlihat identik di layar untuk mengecoh mata korban.'
  }
];

export const EMAIL_SPOOFING_DRILLS = [
  {
    id: 'paypal-security-spoof',
    title: 'Kasus 1: Peringatan Pembekuan Akun Transaksi',
    displaySender: 'Customer Support <support@paypal.com>',
    subject: 'Peringatan Penting: Akses Pembayaran Anda Dibatasi',
    summary: 'Email terlihat meyakinkan dengan logo resmi dan alamat pengirim support@paypal.com.',
    rawHeaders: `From: Customer Support <support@paypal.com>
To: pelajar_kekinian@sekolah.sch.id
Subject: Peringatan Penting: Akses Pembayaran Anda Dibatasi
Date: Tue, 13 Oct 2026 09:14:22 +0700
Received-SPF: fail (google.com: domain of support@paypal.com does not designate 185.220.101.5 as permitted sender)
Authentication-Results: mx.google.com;
       spf=fail (sender IP is 185.220.101.5);
       dkim=none (no signature found);
       dmarc=fail (p=REJECT sp=REJECT)
Message-ID: <random-bot-sender-99@unknown-host-vps>`,
    authStatus: {
      spf: 'FAIL',
      dkim: 'NONE',
      dmarc: 'FAIL (Action: REJECT)'
    },
    isSpoofed: true,
    correctAction: 'fake',
    forensicBreakdown: 'Meskipun nama pengirim diubah menjadi @paypal.com, pengecekan SPF menunjukkan server pengirim (185.220.101.5) tidak memiliki izin mengirim email atas nama domain PayPal. DMARC berstatus FAIL!'
  },
  {
    id: 'google-security-legit',
    title: 'Kasus 2: Notifikasi Login Baru Akun Google',
    displaySender: 'Google <no-reply@accounts.google.com>',
    subject: 'Peringatan Keamanan: Login baru di perangkat Windows',
    summary: 'Notifikasi otomatis Google saat akun Gmail diakses dari browser baru.',
    rawHeaders: `From: Google <no-reply@accounts.google.com>
To: pelajar_kekinian@sekolah.sch.id
Subject: Peringatan Keamanan: Login baru di perangkat Windows
Received-SPF: pass (google.com: domain of 3j2k-auth@gaia.bounces.google.com designates 209.85.220.41 as permitted sender)
Authentication-Results: mx.google.com;
       dkim=pass header.i=@accounts.google.com header.s=20230601;
       spf=pass;
       dmarc=pass (p=REJECT sp=REJECT)
DKIM-Signature: v=1; a=rsa-sha256; c=relaxed/relaxed; d=accounts.google.com;`,
    authStatus: {
      spf: 'PASS',
      dkim: 'PASS',
      dmarc: 'PASS'
    },
    isSpoofed: false,
    correctAction: 'real',
    forensicBreakdown: 'Seluruh tiga protokol autentikasi email (SPF, DKIM, dan DMARC) bertatus PASS. Tanda tangan digital kriptografis DKIM membuktikan isi email berasal dari server resmi Google.'
  }
];

router.get('/drills/domains', (req, res) => {
  res.json({
    count: DOMAIN_COMPARISON_DRILLS.length,
    drills: DOMAIN_COMPARISON_DRILLS
  });
});

router.get('/drills/emails', (req, res) => {
  res.json({
    count: EMAIL_SPOOFING_DRILLS.length,
    drills: EMAIL_SPOOFING_DRILLS
  });
});

export default router;
