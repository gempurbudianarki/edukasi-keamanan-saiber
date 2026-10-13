// ================================================================
// HEURISTIC PHISHING URL ANALYZER SERVICE (EXPRESS BACKEND)
// Inspired by RimTouny / Phishing-Attack-Detection-using-Machine-Learning
// ================================================================

export const SUSPICIOUS_TLDS = [
  '.xyz', '.club', '.top', '.vip', '.buzz', '.work', 
  '.online', '.site', '.cc', '.tk', '.ml', '.ga', '.cf', '.gq'
];

export const SHORTENING_SERVICES = [
  'bit.ly', 'tinyurl.com', 'is.gd', 'buff.ly', 'ow.ly', 't.co', 'rebrand.ly'
];

export function analyzeUrlHeuristics(rawUrl) {
  const url = (rawUrl || '').trim();
  if (!url) {
    return {
      isValid: false,
      score: 0,
      riskLevel: 'UNKNOWN',
      features: []
    };
  }

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
  const fullUrl = url.toLowerCase();
  const features = [];
  let riskScore = 0;

  // 1. IP Address Hostname
  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipPattern.test(hostname)) {
    riskScore += 30;
    features.push({
      id: 'ip_host',
      name: 'Penggunaan Alamat IP Langsung',
      danger: true,
      desc: 'Hostname menggunakan angka IP langsung, bukan nama domain resmi. Modus server phishing ilegal.'
    });
  } else {
    features.push({
      id: 'ip_host',
      name: 'Penggunaan Nama Domain',
      danger: false,
      desc: 'Menggunakan nama domain terbaca, bukan IP mentah.'
    });
  }

  // 2. URL Length
  const urlLength = url.length;
  if (urlLength > 75) {
    riskScore += 20;
    features.push({
      id: 'url_length',
      name: `Panjang URL Berlebih (${urlLength} Karakter)`,
      danger: true,
      desc: 'Panjang URL melebihi 75 karakter untuk menyamarkan domain asli pada layar HP.'
    });
  } else {
    features.push({
      id: 'url_length',
      name: `Panjang URL Wajar (${urlLength} Karakter)`,
      danger: false,
      desc: 'Panjang URL standar di bawah 75 karakter.'
    });
  }

  // 3. At-Sign Trick "@"
  if (fullUrl.includes('@')) {
    riskScore += 25;
    features.push({
      id: 'at_symbol',
      name: 'Terdapat Simbol "@" (At-Sign Redirection)',
      danger: true,
      desc: 'Browser mengabaikan karakter sebelum tanda "@" dan hanya membuka host sesudahnya.'
    });
  }

  // 4. Double Slash Redirect
  const pathAfterProtocol = url.replace(/^https?:\/\//, '');
  if (pathAfterProtocol.includes('//')) {
    riskScore += 20;
    features.push({
      id: 'double_slash',
      name: 'Garis Miring Ganda ("//") di Path',
      danger: true,
      desc: 'Teknik open-redirect untuk mengarahkan pengguna ke situs pihak ketiga.'
    });
  }

  // 5. Hyphen Count
  const hyphenCount = (hostname.match(/-/g) || []).length;
  if (hyphenCount >= 2) {
    riskScore += 20;
    features.push({
      id: 'hyphen_count',
      name: `Banyak Tanda Hubung (${hyphenCount} Hyphen)`,
      danger: true,
      desc: 'Domain resmi jarang menggunakan banyak tanda hubung seperti "kemdikbud-kuota-gratis".'
    });
  }

  // 6. Subdomain Multi-Tier
  const dotCount = (hostname.match(/\./g) || []).length;
  if (dotCount >= 3) {
    riskScore += 25;
    features.push({
      id: 'subdomain_depth',
      name: `Subdomain Bertingkat (${dotCount} Dots)`,
      danger: true,
      desc: 'Trik Subdomain Deception: Meletakkan nama brand resmi di subdomain (misal: "bca.com.login-verify.xyz").'
    });
  }

  // 7. TLD Analysis
  const matchedTld = SUSPICIOUS_TLDS.find(tld => hostname.endsWith(tld));
  const isGovDomain = hostname.endsWith('.go.id') || hostname.endsWith('.gov');
  const isEduDomain = hostname.endsWith('.ac.id') || hostname.endsWith('.edu');

  if (matchedTld) {
    riskScore += 25;
    features.push({
      id: 'tld_risk',
      name: `Ekstensi TLD Berisiko (${matchedTld})`,
      danger: true,
      desc: `TLD ${matchedTld} adalah domain komersial murah tanpa verifikasi identitas pemohon.`
    });
  } else if (isGovDomain) {
    riskScore -= 30;
    features.push({
      id: 'tld_risk',
      name: 'Domain Lembaga Pemerintah Resmi (.go.id)',
      danger: false,
      desc: 'Terverifikasi resmi oleh PANDI & Kominfo untuk instansi negara RI.'
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

  // 8. Fake HTTPS Token
  if (hostname.includes('https-') || hostname.includes('ssl-') || hostname.includes('-https')) {
    riskScore += 25;
    features.push({
      id: 'fake_https_token',
      name: 'Manipulasi Token "HTTPS" pada Nama Host',
      danger: true,
      desc: 'Menyematkan kata "https" pada teks nama host untuk mengecoh korban.'
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
      desc: 'Tautan disamarkan menggunakan shortener sehingga destinasi asli tersembunyi.'
    });
  }

  const finalScore = Math.max(0, Math.min(100, riskScore));
  let riskLevel = 'SAFE';
  let riskColor = '#16a34a';
  let recommendation = 'Tautan memiliki parameter normal dan minim indikasi manipulasi.';

  if (finalScore >= 60) {
    riskLevel = 'DANGEROUS (HIGH PHISHING PROBABILITY)';
    riskColor = '#dc2626';
    recommendation = 'JANGAN BUKA TAUTAN INI! Algoritma mendeteksi multiple rekayasa phishing.';
  } else if (finalScore >= 30) {
    riskLevel = 'SUSPICIOUS (CAUTION ADVISED)';
    riskColor = '#d97706';
    recommendation = 'Tautan mencurigakan. Periksa keaslian domain sebelum berinteraksi.';
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
