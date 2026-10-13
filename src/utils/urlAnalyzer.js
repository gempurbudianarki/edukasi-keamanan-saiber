// ================================================================
// HEURISTIC PHISHING URL ANALYZER (INSPIRED BY MACHINE LEARNING RESEARCH)
// RimTouny / Phishing-Attack-Detection-using-Machine-Learning feature extraction
// ================================================================

export const SUSPICIOUS_TLDS = [
  '.xyz', '.club', '.top', '.vip', '.buzz', '.work', 
  '.online', '.site', '.cc', '.tk', '.ml', '.ga', '.cf', '.gq'
];

export const SHORTENING_SERVICES = [
  'bit.ly', 'tinyurl.com', 'is.gd', 'buff.ly', 'ow.ly', 't.co', 'rebrand.ly'
];

export function analyzeUrlHeuristics(rawUrl) {
  let url = (rawUrl || '').trim();
  if (!url) {
    return {
      isValid: false,
      score: 0,
      riskLevel: 'UNKNOWN',
      features: []
    };
  }

  // Prepend protocol if missing for URL parsing
  let parsed;
  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      parsed = new URL('http://' + url);
    } else {
      parsed = new URL(url);
    }
  } catch {
    return {
      isValid: false,
      score: 100,
      riskLevel: 'MALFORMED',
      features: [{
        name: 'Format URL Tidak Standar',
        danger: true,
        desc: 'URL tidak dapat diuraikan oleh standar parser browser (sering dipakai peretas untuk exploit parser).'
      }]
    };
  }

  const hostname = parsed.hostname.toLowerCase();
  const pathname = parsed.pathname.toLowerCase();
  const fullUrl = url.toLowerCase();

  const features = [];
  let riskScore = 0;

  // 0. Protocol Security Check
  if (parsed.protocol === 'http:') {
    riskScore += 20;
    features.push({
      id: 'protocol_insecure',
      name: 'Protokol HTTP Tidak Terenkripsi',
      danger: true,
      desc: 'Tautan menggunakan HTTP polos tanpa sertifikat keamanan SSL/TLS. Seluruh data formulir rentan disadap.'
    });
  }

  // 1. IP Address as Hostname (Feature 1 in ML)
  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  const isIpHost = ipPattern.test(hostname);
  if (isIpHost) {
    riskScore += 30;
    features.push({
      id: 'ip_host',
      name: 'Penggunaan Alamat IP Langsung',
      danger: true,
      desc: 'Hostname menggunakan angka IP langsung, bukan nama domain. Modus umum server phishing untuk menghindari verifikasi domain resmi.'
    });
  } else {
    features.push({
      id: 'ip_host',
      name: 'Penggunaan Nama Domain',
      danger: false,
      desc: 'Menggunakan nama domain terbaca, bukan alamat IP mentah.'
    });
  }

  // 2. URL Length (Feature 2 in ML: length > 54 suspicious, > 75 highly dangerous)
  const urlLength = url.length;
  if (urlLength > 75) {
    riskScore += 20;
    features.push({
      id: 'url_length',
      name: `Panjang URL Berlebih (${urlLength} Karakter)`,
      danger: true,
      desc: 'Panjang URL melebihi 75 karakter. Sering digunakan untuk menyembunyikan nama domain asli di layar smartphone.'
    });
  } else if (urlLength > 54) {
    riskScore += 10;
    features.push({
      id: 'url_length',
      name: `Panjang URL Sedang (${urlLength} Karakter)`,
      danger: false,
      desc: 'Panjang URL antara 54–75 karakter.'
    });
  } else {
    features.push({
      id: 'url_length',
      name: `Panjang URL Standar (${urlLength} Karakter)`,
      danger: false,
      desc: 'Panjang URL wajar (< 54 karakter).'
    });
  }

  // 3. Presence of "@" Symbol (Feature 3 in ML)
  const hasAtSymbol = fullUrl.includes('@');
  if (hasAtSymbol) {
    riskScore += 25;
    features.push({
      id: 'at_symbol',
      name: 'Terdapat Simbol "@" (At-Sign Trick)',
      danger: true,
      desc: 'Browser mengabaikan karakter sebelum tanda "@" dan hanya membuka host sesudahnya. Ini adalah teknik penipuan klasik.'
    });
  } else {
    features.push({
      id: 'at_symbol',
      name: 'Tanpa Simbol "@"',
      danger: false,
      desc: 'Tidak ditemukan manipulasi simbol "@" di dalam URL.'
    });
  }

  // 4. Double Slash Redirect in Path (Feature 4 in ML)
  const pathAfterProtocol = url.replace(/^https?:\/\//, '');
  const hasDoubleSlash = pathAfterProtocol.includes('//');
  if (hasDoubleSlash) {
    riskScore += 20;
    features.push({
      id: 'double_slash',
      name: 'Terdapat Garis Miring Ganda ("//") di Path',
      danger: true,
      desc: 'Garis miring ganda di tengah path digunakan untuk mengalihkan korban (open redirect) ke situs luar.'
    });
  }

  // 5. Hyphen "-" in Domain Name (Feature 5 in ML)
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount >= 2) {
    riskScore += 20;
    features.push({
      id: 'hyphen_count',
      name: `Tanda Hubung Berulang (${hyphenCount} Hyphen)`,
      danger: true,
      desc: 'Domain resmi jarang menggunakan banyak tanda hubung. Sering digunakan penipu seperti "kemdikbud-beasiswa-gratis".'
    });
  } else if (hyphenCount === 1) {
    riskScore += 5;
    features.push({
      id: 'hyphen_count',
      name: '1 Tanda Hubung Ditemukan',
      danger: false,
      desc: 'Terdapat 1 tanda hubung pada nama domain.'
    });
  }

  // 6. Subdomain Multi-Tier (Feature 6 in ML: dots count > 2 in hostname)
  const dotCount = (hostname.match(/\./g) || []).length;
  if (dotCount >= 3) {
    riskScore += 25;
    features.push({
      id: 'subdomain_depth',
      name: `Subdomain Bertingkat (${dotCount} Dots)`,
      danger: true,
      desc: 'Trik Subdomain Deception: Meletakkan nama brand sah di subdomain (contoh: "instagram.com.login-verify.xyz").'
    });
  } else {
    features.push({
      id: 'subdomain_depth',
      name: 'Struktur Subdomain Wajar',
      danger: false,
      desc: 'Jumlah hierarki domain normal (1–2 titik).'
    });
  }

  // 7. Suspicious / Cheap High-Risk TLD (Feature 7 in ML)
  const matchedTld = SUSPICIOUS_TLDS.find(tld => hostname.endsWith(tld));
  const isGovDomain = hostname.endsWith('.go.id') || hostname.endsWith('.gov');
  const isEduDomain = hostname.endsWith('.ac.id') || hostname.endsWith('.edu');

  if (matchedTld) {
    riskScore += 25;
    features.push({
      id: 'tld_risk',
      name: `Ekstensi TLD Berisiko Tinggi (${matchedTld})`,
      danger: true,
      desc: `TLD ${matchedTld} adalah domain komersial murah tanpa verifikasi identitas, paling sering digunakan sindikat phishing.`
    });
  } else if (isGovDomain) {
    riskScore -= 30;
    features.push({
      id: 'tld_risk',
      name: 'Domain Lembaga Pemerintah Resmi (.go.id)',
      danger: false,
      desc: 'Domain diautentikasi resmi oleh Kominfo & PANDI untuk instansi pemerintah RI.'
    });
  } else if (isEduDomain) {
    riskScore -= 20;
    features.push({
      id: 'tld_risk',
      name: 'Domain Pendidikan Tinggi Resmi (.ac.id)',
      danger: false,
      desc: 'Domain akademik resmi terdaftar untuk perguruan tinggi di Indonesia.'
    });
  }

  // 8. Fake HTTPS Token embedded in Hostname
  if (hostname.includes('https-') || hostname.includes('ssl-') || hostname.includes('-https')) {
    riskScore += 25;
    features.push({
      id: 'fake_https_token',
      name: 'Token "HTTPS" Palsu di Nama Host',
      danger: true,
      desc: 'Menyematkan kata "https" pada nama domain untuk mengecoh korban agar mengira situs tersebut resmi.'
    });
  }

  // 9. Shortener Service Check
  const isShortener = SHORTENING_SERVICES.some(s => hostname === s || hostname.endsWith('.' + s));
  if (isShortener) {
    riskScore += 15;
    features.push({
      id: 'shortener_service',
      name: 'Layanan Pemendek Tautan (URL Shortener)',
      danger: true,
      desc: 'Tautan disamarkan menggunakan shortener sehingga tujuan asli tidak tampak di layar sebelum diklik.'
    });
  }

  // Final score clamping (0 to 100)
  const finalScore = Math.max(0, Math.min(100, riskScore));

  let riskLevel = 'SAFE';
  let riskColor = '#16a34a';
  let recommendation = 'Tautan memiliki karakteristik normal dan minim indikator penipuan.';

  if (finalScore >= 60) {
    riskLevel = 'DANGEROUS (HIGH PHISHING PROBABILITY)';
    riskColor = '#dc2626';
    recommendation = 'JANGAN BUKA TAUTAN INI! Algoritma mendeteksi multiple indikator rekayasa phishing.';
  } else if (finalScore >= 30) {
    riskLevel = 'SUSPICIOUS (CAUTION ADVISED)';
    riskColor = '#d97706';
    recommendation = 'Tautan mencurigakan. Periksa ulang sebelum memasukkan data atau login.';
  }

  return {
    isValid: true,
    score: finalScore,
    riskLevel,
    riskColor,
    recommendation,
    hostname,
    protocol: parsed.protocol,
    features
  };
}

// Preset samples for students to test
export const PRESET_URL_SAMPLES = [
  {
    name: 'Portal Kemendikbud Resmi',
    url: 'https://pip.kemdikbud.go.id/login',
    category: 'Resmi Pemerintah'
  },
  {
    name: 'Jebakan Kuota 100 GB (.club)',
    url: 'http://kemdikbud-kuota100gb-gratis.club/klaim-sekarang',
    category: 'Phishing Harvesting'
  },
  {
    name: 'Subdomain Trick Instagram',
    url: 'https://instagram.com.meta-helpdesk-security.xyz/login',
    category: 'Phishing Subdomain'
  },
  {
    name: 'Internet Banking BCA Resmi',
    url: 'https://www.klikbca.com/login',
    category: 'Resmi Perbankan'
  },
  {
    name: 'IP Address Phishing Mentah',
    url: 'http://185.220.101.5/bca-layanan-verifikasi/index.php',
    category: 'Phishing Raw IP'
  }
];
