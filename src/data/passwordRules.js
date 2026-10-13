export const commonWeakPasswords = [
  '123456', '12345678', '123456789', 'password', 'qwerty', 'admin',
  'sayang', 'sayangku', 'bismillah', 'indonesia', 'rahasia', 'anarki',
  '123123', 'semangat', 'cintaku', 'pelajar', 'sekolah'
];

export const indonesianWords = [
  'Garuda', 'Kucing', 'Langit', 'Bintang', 'Kopi', 'Pantai', 'Gunung',
  'Samudra', 'Harimau', 'Bulan', 'Cahaya', 'Pelangi', 'Merdeka', 'Ksatria',
  'Hutan', 'Lentera', 'Mentari', 'Angkasa', 'Pelindung', 'Benteng'
];

export function evaluatePassword(password) {
  if (!password) {
    return {
      score: 0,
      label: 'Belum Diisi',
      color: '#64748b',
      crackTime: '0 detik',
      entropy: 0,
      checks: {
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        special: false,
        notCommon: true
      }
    };
  }

  const checks = {
    length: password.length >= 12,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
    notCommon: !commonWeakPasswords.includes(password.toLowerCase())
  };

  // Character pool size
  let poolSize = 0;
  if (checks.lowercase) poolSize += 26;
  if (checks.uppercase) poolSize += 26;
  if (checks.number) poolSize += 10;
  if (checks.special) poolSize += 32;

  // Calculate entropy: E = L * log2(R)
  const entropy = poolSize > 0 ? Math.round(password.length * (Math.log2(poolSize))) : 0;

  // Checks passed count
  let passedCount = 0;
  if (password.length >= 8) passedCount++;
  if (checks.length) passedCount++;
  if (checks.lowercase && checks.uppercase) passedCount++;
  if (checks.number) passedCount++;
  if (checks.special) passedCount++;
  if (checks.notCommon) passedCount++;

  let score = Math.min(100, Math.round((passedCount / 6) * 100));
  if (!checks.notCommon || password.length < 6) {
    score = Math.min(score, 20);
  }

  let label = 'Sangat Lemah';
  let color = '#ef4444'; // Red

  if (score >= 85 && password.length >= 12) {
    label = 'Sangat Kuat (Brankas Baja)';
    color = '#00f0ff'; // Neon Cyan
  } else if (score >= 65) {
    label = 'Kuat & Aman';
    color = '#10b981'; // Green
  } else if (score >= 40) {
    label = 'Sedang / Cukup';
    color = '#f59e0b'; // Amber
  }

  // Calculate crack time based on 100 Billion guesses/sec (Modern GPU Cluster Hashcat)
  const crackTime = calculateCrackTime(entropy, checks.notCommon, password.length);

  return {
    score,
    label,
    color,
    crackTime,
    entropy,
    checks
  };
}

function calculateCrackTime(entropy, notCommon, length) {
  if (!notCommon || length < 6) {
    return '0.00001 detik (Langsung Bobol!)';
  }

  // Combinations = 2^entropy
  // Guesses per second = 100,000,000,000 (100 GHash/s)
  // Seconds = (2^entropy) / (1e11) / 2 (average half keyspace)
  if (entropy < 28) return 'Kurang dari 0.01 detik';
  if (entropy < 35) return 'Sekitar 2 - 10 detik';
  if (entropy < 42) return 'Sekitar 5 - 30 menit';
  if (entropy < 48) return 'Sekitar 3 hari';
  if (entropy < 55) return 'Sekitar 6 bulan';
  if (entropy < 62) return 'Sekitar 25 tahun';
  if (entropy < 70) return 'Sekitar 5.000 tahun';
  if (entropy < 80) return 'Sekitar 850.000 tahun';
  return 'Lebih dari 10 Miliar Tahun! (Mustahil Ditebak)';
}

export function generatePassphrase() {
  const p1 = indonesianWords[Math.floor(Math.random() * indonesianWords.length)];
  let p2 = indonesianWords[Math.floor(Math.random() * indonesianWords.length)];
  while (p2 === p1) {
    p2 = indonesianWords[Math.floor(Math.random() * indonesianWords.length)];
  }
  let p3 = indonesianWords[Math.floor(Math.random() * indonesianWords.length)];
  while (p3 === p1 || p3 === p2) {
    p3 = indonesianWords[Math.floor(Math.random() * indonesianWords.length)];
  }

  const num = Math.floor(Math.random() * 90) + 10;
  const symbols = ['!', '@', '#', '$', '%', '&'];
  const sym = symbols[Math.floor(Math.random() * symbols.length)];

  return `${p1}-${p2}-${p3}-${num}${sym}`;
}
