import React, { useState } from 'react';
import { 
  BellRing, 
  Smartphone, 
  KeyRound, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  ArrowRight, 
  RotateCcw, 
  ShieldCheck, 
  HelpCircle,
  Sparkles,
  Zap,
  Globe,
  Radio,
  Search,
  Eye,
  AlertCircle,
  FileSearch,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';

const CRITICAL_DRILLS = [
  {
    id: 'mfa-fatigue',
    stageNumber: 1,
    title: 'Serangan "Push Bombing / MFA Fatigue" Pukul 01:30 Dini Hari',
    topic: 'Rekayasa Sosial & Eksploitasi Kelelahan Mental',
    icon: BellRing,
    cognitiveBias: 'Fatigue Bias & Sleep Disorientation (Kelelahan Fisik)',
    context: 'Saat kamu sedang tidur lelap pukul 01:30 dini hari, smartphone-mu tiba-tiba bergetar puluhan kali berturut-turut memunculkan notifikasi persetujuan login: "Upaya masuk terdeteksi dari Novosibirsk, Rusia. Apakah ini Anda?". Peretas sengaja membombardir notifikasi agar kamu merasa terganggu, hilang fokus, dan akhirnya memencet "Setujui" hanya agar HP berhenti berisik.',
    redFlags: [
      'Waktu aneh: Upaya login terjadi pukul 01:30 dini hari saat kamu tidur.',
      'Lokasi mustahil (Impossible Travel): IP terdeteksi dari Rusia padahal smartphone fisikmu berada di Indonesia.',
      'Bombardir notifikasi berulang: Taktik psikologis sengaja mengganggu kenyamanan agar korban menyerah.'
    ],
    question: 'Berdasarkan prinsip literasi siber kritis, apa tindakan yang PALING tepat dan aman?',
    options: [
      {
        key: 'A',
        text: 'Tekan "Setujui" satu kali saja agar HP berhenti bergetar sehingga kamu bisa kembali tidur dengan tenang.',
        isCorrect: false,
        feedback: 'BAHAYA FATAL! Sekali kamu klik "Setujui", peretas langsung berhasil membajak akunmu. Inilah persis tujuan dari serangan MFA Fatigue (seperti insiden peretasan Uber 2022).',
        consequenceSteps: [
          'Peretas mendapatkan token sesi otentikasi',
          'Password dan nomor HP diubah peretas',
          'Akun kamu terkunci permanen'
        ]
      },
      {
        key: 'B',
        text: 'Tekan "TOLAK & BLOKIR AKSES", lalu segera login dari perangkat aman untuk MENGGANTI PASSWORD UTAMA akunmu, karena serangan ini membuktikan bahwa peretas sudah mengetahui password utamamu!',
        isCorrect: true,
        feedback: 'KEPUTUSAN SEMPURNA! Peretas hanya bisa memicu push 2FA jika mereka SUDAH memegang password akunmu. Menolak push saja belum cukup; kamu wajib segera mengganti kata sandi utama.',
        consequenceSteps: [
          'Akses peretas ditolak seketika',
          'IP peretas diblacklist server',
          'Kata sandi baru dibuat',
          'Akun aman 100%'
        ]
      },
      {
        key: 'C',
        text: 'Matikan smartphone dan abaikan notifikasinya sampai pagi tanpa melakukan tindakan perubahan apapun.',
        isCorrect: false,
        feedback: 'KURANG TEPAT! Mematikan HP memang menghentikan getaran, tetapi kata sandi akunmu masih dikuasai hacker. Akunmu tetap berada dalam ancaman peretasan aktif.',
        consequenceSteps: [
          'HP dimatikan namun password tetap di tangan hacker',
          'Hacker mencoba bypass metode lain saat kamu tidur'
        ]
      }
    ],
    expertInsight: 'MFA Fatigue Attack (Push Bombing) adalah taktik peretas yang mengeksploitasi kelelahan psikologis manusia. Kunci utamanya: jika ada notifikasi 2FA yang tidak pernah kamu minta, artinya kata sandimu sudah bocor di internet!'
  },
  {
    id: 'sim-swap-courier',
    stageNumber: 2,
    title: 'Jebakan "Kurir Paket Nyasar" & Permintaan Kode OTP',
    topic: 'Social Engineering & Pencurian Sesi SMS OTP',
    icon: Smartphone,
    cognitiveBias: 'Urgency & Authority Bias (Manipulasi Rasa Penasaran/Panik)',
    context: 'Kamu menerima pesan WhatsApp dari nomor asing berprofil logo ekspedisi terkemuka: "Halo, ada kiriman paket atas nama Anda tertahan karena kendala verifikasi alamat. Kami baru saja mengirimkan 6 angka verifikasi ke nomor Anda via SMS. Mohon sebutkan 6 angka tersebut sekarang agar kurir kami bisa mengantar paket ke rumah Anda sore ini." Pada saat bersamaan, masuk SMS resmi dari WhatsApp/Bank berisi 6 digit angka OTP.',
    redFlags: [
      'Pesan dari nomor seluler asing tidak resmi (bukan akun centang hijau resmi ekspedisi).',
      'SMS OTP berasal dari platform perbankan/WhatsApp, sama sekali tidak ada kaitannya dengan pengiriman paket fisik.',
      'Permintaan mendesak untuk menyebutkan kode rahasia dalam hitungan menit.'
    ],
    question: 'Bagaimana seharusnya respon cerdas kamu terhadap permintaan tersebut?',
    options: [
      {
        key: 'A',
        text: 'Langsung kirimkan 6 digit kode tersebut via chat karena kamu memang sedang menunggu pesanan barang online.',
        isCorrect: false,
        feedback: 'BAHAYA! Kode tersebut adalah OTP pengambilalihan akun WhatsApp atau akun perbankanmu. Dalam hitungan detik akunmu akan terkunci dan uang/kontakmu dieksploitasi.',
        consequenceSteps: [
          'Sesi WhatsApp berpindah ke ponsel pelaku',
          'Pelaku meminjam uang ke semua kontak keluargamu'
        ]
      },
      {
        key: 'B',
        text: 'TOLAK KERAS dan laporkan nomor tersebut! Petugas ekspedisi resmi TIDAK PERNAH meminta kode OTP SMS pelanggan. Kode OTP adalah rahasia pribadi mutlak setara kunci brankas!',
        isCorrect: true,
        feedback: 'TEPAT SEKALI! Kode OTP (One-Time Password) adalah kredensial otentikasi rahasia milikmu sendiri. Petugas resmi manapun di dunia dilarang keras meminta kode OTP pelanggan.',
        consequenceSteps: [
          'Pelaku gagal membajak akunmu',
          'Nomor pelaku dilaporkan ke WhatsApp',
          'Data pribadimu tetap utuh'
        ]
      },
      {
        key: 'C',
        text: 'Kirimkan 3 angka pertama saja untuk menguji apakah kurir tersebut benar-benar petugas asli.',
        isCorrect: false,
        feedback: 'SALAH! Memberikan sebagian kode tetap membahayakan keamanan akun dan memudahkan peretas menebak sisa digit melalui serangan brute-force.',
        consequenceSteps: [
          'Peretas brute-force 3 digit tersisa (1000 kombinasi)',
          'Akun berhasil dibobol dalam hitungan detik'
        ]
      }
    ],
    expertInsight: 'Modus kurir palsu meminta kode OTP SMS adalah salah satu serangan social engineering paling sering menimpa Generasi Z di Indonesia. Selalu tanamkan prinsip: "OTP hanya untuk matamu sendiri".'
  },
  {
    id: 'reverse-proxy-mitm',
    stageNumber: 3,
    title: 'Serangan Reverse-Proxy Phishing (Evilginx) di Wi-Fi Publik',
    topic: 'Bypass Otentikasi Canggih & Session Hijacking',
    icon: Globe,
    cognitiveBias: 'Visual Authenticity Illusion (Hanya Melihat Tampilan Visual)',
    context: 'Saat nongkrong di kafe menggunakan Wi-Fi gratis, kamu login ke media sosial melalui tautan di email. Kamu memasukkan kata sandi dan kode 6-digit OTP dari Authenticator dengan sukses, namun akunmu tetap dibajak 5 menit kemudian! Ternyata peretas menggunakan tools "Reverse Proxy" (seperti Evilginx) yang meneruskan kredensial dan mencuri Session Cookie secara realtime.',
    redFlags: [
      'Mengklik tautan dari email tanpa memeriksa URL domain di bilah alamat peramban (address bar).',
      'Domain tiruan menggunakan teknik typosquatting (misal: instagram.login-verify.me bukan instagram.com).',
      'Menggunakan Wi-Fi publik tanpa VPN saat mengakses akun berkredensial sensitif.'
    ],
    question: 'Bagaimana cara berpikir kritis untuk mencegah insiden pencurian session cookie ini?',
    options: [
      {
        key: 'A',
        text: 'Selalu periksa URL di address bar (bukan tampilannya). Gunakan Passkey / Kunci Keamanan Fisik (FIDO2 WebAuthn) yang terikat kriptografis ke domain resmi sehingga kebal phishing!',
        isCorrect: true,
        feedback: 'ANALISIS TINGKAT TINGGI! FIDO2 / Passkeys adalah standar otentikasi paling aman di dunia karena peramban memverifikasi domain asli secara otomatis melalui kriptografi asimetris.',
        consequenceSteps: [
          'Browser menolak mengirim kredensial ke domain tiruan',
          'Reverse proxy gagal menangkap sesi',
          'Akun aman total'
        ]
      },
      {
        key: 'B',
        text: 'Mengganti kode OTP setiap 10 detik sekali agar peretas tidak sempat mencuri cookie.',
        isCorrect: false,
        feedback: 'TIDAK EFEKTIF! Reverse proxy menangkap kode dalam hitungan milidetik secara terotomasi. Selama kamu memasukkannya di domain phishing, proxy tetap menangkapnya.',
        consequenceSteps: [
          'Script otomatis proxy menangkap kode dalam 50 milidetik',
          'Sesi langsung diteruskan ke server resmi'
        ]
      },
      {
        key: 'C',
        text: 'Menghapus histori peramban setelah login agar cookie otomatis hilang.',
        isCorrect: false,
        feedback: 'SALAH! Menghapus histori lokal tidak membatalkan session cookie yang sudah dikirim dan disalin oleh server peretas.',
        consequenceSteps: [
          'Sesi sudah aktif di komputer peretas',
          'Histori laptop dihapus tidak berpengaruh'
        ]
      }
    ],
    expertInsight: 'Dunia keamanan siber terus berevolusi. 2FA berbasis kode TOTP atau SMS masih bisa dipancing melalui Reverse-Proxy Phishing. Benteng masa depan yang kebal phishing adalah Passkeys (FIDO2) yang didukung oleh Google, Apple, dan Microsoft.'
  },
  {
    id: 'lost-phone-recovery',
    stageNumber: 4,
    title: 'Dilema "Smartphone Jatuh ke Laut" & Prosedur Pemulihan Akun',
    topic: 'Disaster Recovery & Manajemen Kode Cadangan',
    icon: KeyRound,
    cognitiveBias: 'Panic & Loss Aversion (Kepanikan Menghadapi Deadline)',
    context: 'Smartphone milikmu yang menyimpan aplikasi Google Authenticator terjatuh ke laut saat liburan dan rusak permanen. Besok pagi adalah tenggat waktu pengumpulan tugas akhir penting di portal kampus yang mewajibkan otentikasi 2FA. Laptopmu meminta kode 6-digit yang biasa digenerate oleh smartphone yang kini telah rusak.',
    redFlags: [
      'Kepanikan deadline membuat korban rentan mencari jalan pintas ilegal di internet.',
      'Tawaran "Jasa Hacking / Bypass 2FA Kilat" di media sosial adalah 100% penipuan (scam).',
      'Forum online meminta data sensitif pribadi (KTP/KTM) yang berujung pada eksploitasi doxing.'
    ],
    question: 'Bagaimana cara pemulihan akses akun yang benar, sah, dan aman?',
    options: [
      {
        key: 'A',
        text: 'Menggunakan salah satu "Kode Pemulihan Cadangan (Backup Codes)" 8-digit yang telah kamu catat/simpan di tempat aman offline saat pertama kali aktivasi 2FA.',
        isCorrect: true,
        feedback: 'SOLUSI TERBAIK & PROFESIONAL! Inilah fungsi utama Backup Codes (Kode Cadangan). Kode 8-digit sekali pakai ini dirancang khusus sebagai kunci penyelamat saat smartphone hilang atau rusak.',
        consequenceSteps: [
          'Portal kampus langsung terbuka',
          'Tugas akhir terunggah tepat waktu',
          'Setup 2FA baru dikonfigurasi'
        ]
      },
      {
        key: 'B',
        text: 'Membayar jasa "joki bypass 2FA cepat" dari akun tidak dikenal di media sosial seharga Rp 150.000.',
        isCorrect: false,
        feedback: 'SANGAT BERBAHAYA! Jasa bypass 2FA di medsos adalah modus penipuan ganda (scam). Kamu akan kehilangan uang dan data pribadimu berisiko diperjualbelikan.',
        consequenceSteps: [
          'Uang Rp 150.000 hangus',
          'Akun tetap terkunci',
          'Data tugas akhir tidak terkirim'
        ]
      },
      {
        key: 'C',
        text: 'Mengirimkan foto selfie KTP dan kartu mahasiswa ke sembarang forum online meminta bantuan reset akun.',
        isCorrect: false,
        feedback: 'BAHAYA DOXING! Menyebarkan foto identitas pribadi di forum internet memicu risiko doxing dan pencurian identitas untuk pinjaman online ilegal.',
        consequenceSteps: [
          'Foto KTP disalahgunakan untuk pinjol ilegal',
          'Korban terlilit hutang pihak ketiga'
        ]
      }
    ],
    expertInsight: 'Backup Codes adalah sabuk pengaman terakhir dalam keamanan siber 2FA. Selalu simpan kode cadangan di catatan fisik atau password manager terenkripsi, bukan sekadar tangkapan layar di HP yang bisa hilang bersama perangkatnya.'
  }
];

export function CriticalThinkingView({ onCompleteAllDrills, savedScores = {}, savedAnswers = {} }) {
  const [currentDrillIndex, setCurrentDrillIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState(savedAnswers);
  const [drillScores, setDrillScores] = useState(savedScores);
  const [showClues, setShowClues] = useState(false);

  const drill = CRITICAL_DRILLS[currentDrillIndex];
  const userChoice = selectedAnswers[drill.id];
  const isAnswered = Boolean(userChoice);
  const chosenOption = isAnswered ? drill.options.find(o => o.key === userChoice) : null;
  const isCorrect = chosenOption?.isCorrect;

  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = Object.values(drillScores).filter(Boolean).length;
  const isAllDrillsCompleted = answeredCount === CRITICAL_DRILLS.length;

  // Calculate actual weighted critical thinking score (25 pts per scenario)
  const currentTotalScore = Math.round((correctCount / CRITICAL_DRILLS.length) * 100);

  const handleSelectOption = (optKey) => {
    playSound('click');

    const opt = drill.options.find(o => o.key === optKey);
    const updatedAnswers = { ...selectedAnswers, [drill.id]: optKey };
    const updatedScores = { ...drillScores, [drill.id]: opt.isCorrect };

    setSelectedAnswers(updatedAnswers);
    setDrillScores(updatedScores);

    if (opt.isCorrect) {
      playSound('complete');
    } else {
      playSound('error');
    }
  };

  // Robust analytical retry: properly clears both answer and score
  const handleRetryCurrentDrill = () => {
    playSound('click');
    const updatedAnswers = { ...selectedAnswers };
    delete updatedAnswers[drill.id];
    const updatedScores = { ...drillScores };
    delete updatedScores[drill.id];
    setSelectedAnswers(updatedAnswers);
    setDrillScores(updatedScores);
  };

  const handleNextDrill = () => {
    playSound('click');
    setShowClues(false);
    if (currentDrillIndex < CRITICAL_DRILLS.length - 1) {
      setCurrentDrillIndex(prev => prev + 1);
    }
  };

  const handlePrevDrill = () => {
    playSound('click');
    setShowClues(false);
    if (currentDrillIndex > 0) {
      setCurrentDrillIndex(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    playSound('complete');
    if (onCompleteAllDrills) {
      onCompleteAllDrills(currentTotalScore, drillScores, selectedAnswers);
    }
  };

  const DrillIcon = drill.icon;

  return (
    <div className="glass-panel scenario-card anim-pop-in">
      {/* Top Header */}
      <div className="twofa-drill-header">
        <div>
          <div className="drill-stage-badge">
            <Sparkles size={14} color="#facc15" />
            <span>TAHAP 3: DRILL BERPIKIR KRITIS SIBER (4 KASUS REALISTIS)</span>
          </div>
          <h2 className="twofa-section-title">
            Uji Berpikir Kritis: Menghadapi Celah & Serangan 2FA Canggih
          </h2>
          <p className="twofa-section-subtitle">
            Generasi Z yang tanggap tidak sekadar mengaktifkan 2FA, tetapi juga memiliki ketajaman nalar
            dalam menolak rekayasa sosial, manipulasi psikologis kurir OTP, dan serangan MFA Fatigue.
          </p>
        </div>

        {/* Live Drill Stepper Counter & Live Score */}
        <div className="twofa-drill-tracker-card">
          <span className="tracker-label">SKOR NALAR SIBER</span>
          <span className="tracker-value">{currentTotalScore}/100</span>
          <div className="tracker-dots-row">
            {CRITICAL_DRILLS.map((d, idx) => {
              const answered = selectedAnswers[d.id] !== undefined;
              const correct = drillScores[d.id];
              let dotClass = 'tracker-dot';
              if (idx === currentDrillIndex) dotClass += ' dot-active';
              if (answered) dotClass += correct ? ' dot-correct' : ' dot-wrong';

              return (
                <button
                  key={d.id}
                  className={dotClass}
                  onClick={() => {
                    playSound('click');
                    setShowClues(false);
                    setCurrentDrillIndex(idx);
                  }}
                  title={`Kasus ${idx + 1}: ${d.title}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Challenge Card */}
      <div key={drill.id} className="twofa-challenge-box anim-pop-in">
        <div className="challenge-meta-row">
          <div className="challenge-tag-left">
            <span className="challenge-icon-box">
              <DrillIcon size={20} />
            </span>
            <div>
              <span className="challenge-num">KASUS #{drill.stageNumber}</span>
              <span className="challenge-topic">• {drill.topic}</span>
            </div>
          </div>
          <span className="badge badge-purple">
            Kasus Studi Siber PKM UBBG
          </span>
        </div>

        <h3 className="challenge-title">
          {drill.title}
        </h3>

        {/* Cognitive Bias Exploit Banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px', background: '#f1f5f9', border: '1.5px solid #cbd5e1', padding: '6px 12px', borderRadius: '6px', fontSize: '0.78rem', color: '#475569', fontWeight: 700 }}>
          <AlertCircle size={15} color="#64748b" />
          <span>Titik Lemah Manusia yang Dieksploitasi: <strong>{drill.cognitiveBias}</strong></span>
        </div>

        {/* Narrative Context Briefing */}
        <div className="challenge-scenario-card">
          <div className="scenario-label-row">
            <AlertTriangle size={16} color="#d97706" />
            <span>Kondisi & Skenario Lapangan:</span>
          </div>
          <p className="scenario-text-body">
            {drill.context}
          </p>
        </div>

        {/* Interactive Detective Clues (Red Flags Inspector) */}
        <div className="challenge-detective-clues-box">
          <button
            type="button"
            className="detective-toggle-btn"
            onClick={() => {
              playSound('click');
              setShowClues(prev => !prev);
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileSearch size={16} color="#0284c7" />
              <span>Detektif Siber: 3 Indikator Kejanggalan (Red Flags)</span>
            </div>
            {showClues ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showClues && (
            <div className="clues-list anim-pop-in">
              {drill.redFlags.map((flag, i) => (
                <div key={i} className="clue-item">
                  <span className="clue-badge">Kejanggalan #{i + 1}</span>
                  <span>{flag}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Question Prompt */}
        <div className="challenge-question-prompt">
          <HelpCircle size={18} color="#0284c7" />
          <span>{drill.question}</span>
        </div>

        {/* 3 Choices */}
        <div className="twofa-drill-options-grid">
          {drill.options.map((opt) => {
            const isSelected = userChoice === opt.key;
            let optClass = 'twofa-drill-opt-btn';

            if (isAnswered) {
              if (opt.isCorrect) optClass += ' opt-correct-reveal';
              else if (isSelected && !opt.isCorrect) optClass += ' opt-wrong-reveal';
              else optClass += ' opt-muted-reveal';
            }

            return (
              <button
                key={opt.key}
                id={`btn-drill-${drill.id}-${opt.key}`}
                className={optClass}
                disabled={isAnswered}
                onClick={() => handleSelectOption(opt.key)}
              >
                <div className="drill-opt-key-badge">{opt.key}</div>
                <div className="drill-opt-text">{opt.text}</div>
                <div className="drill-opt-status-icon">
                  {isAnswered && opt.isCorrect && (
                    <CheckCircle2 size={20} color="#16a34a" />
                  )}
                  {isAnswered && isSelected && !opt.isCorrect && (
                    <XCircle size={20} color="#dc2626" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Dynamic Post-Answer Coaching Feedback & Consequence Steps */}
        {isAnswered && (
          <div className={`twofa-drill-feedback-box ${isCorrect ? 'fb-success' : 'fb-warning'} anim-pop-in`}>
            <div className="fb-header-row">
              <div className="fb-badge">
                {isCorrect ? (
                  <>
                    <CheckCircle2 size={18} color="#15803d" />
                    <span>ANALISIS TEPAT & CERDAS! (+25 POIN)</span>
                  </>
                ) : (
                  <>
                    <XCircle size={18} color="#b91c1c" />
                    <span>PERLU WASPADA & EVALUASI RISIKO</span>
                  </>
                )}
              </div>

              {!isCorrect && (
                <button
                  id="btn-retry-drill"
                  className="btn btn-secondary btn-sm"
                  onClick={handleRetryCurrentDrill}
                  style={{ fontSize: '0.74rem', padding: '4px 10px' }}
                >
                  <RotateCcw size={12} />
                  <span>Analisis Ulang Skenario</span>
                </button>
              )}
            </div>

            <p className="fb-text">
              {chosenOption?.feedback}
            </p>

            {/* Consequence Step-by-Step Chain */}
            {chosenOption?.consequenceSteps && (
              <div className="consequence-simulation-card">
                <div className="consequence-title">
                  <Zap size={14} color={isCorrect ? '#16a34a' : '#dc2626'} />
                  <span>Simulasi Dampak Nyata Keputusanmu:</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                  {chosenOption.consequenceSteps.map((step, sIdx) => (
                    <React.Fragment key={sIdx}>
                      <span style={{ 
                        background: isCorrect ? '#dcfce7' : '#fee2e2',
                        color: isCorrect ? '#15803d' : '#b91c1c',
                        border: `1.5px solid ${isCorrect ? '#16a34a' : '#dc2626'}`,
                        borderRadius: '4px',
                        padding: '4px 8px',
                        fontSize: '0.76rem',
                        fontWeight: 700
                      }}>
                        {step}
                      </span>
                      {sIdx < chosenOption.consequenceSteps.length - 1 && (
                        <ArrowRight size={13} color={isCorrect ? '#16a34a' : '#dc2626'} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            <div className="fb-expert-dossier" style={{ marginTop: '14px' }}>
              <div className="expert-dossier-title">
                <Lightbulb size={16} />
                <span>Wawasan Pakar Keamanan Siber:</span>
              </div>
              <p className="expert-dossier-body">
                {drill.expertInsight}
              </p>
            </div>
          </div>
        )}

        {/* Navigation & Progression Bar */}
        <div className="twofa-drill-footer">
          <button
            className="btn btn-secondary"
            disabled={currentDrillIndex === 0}
            onClick={handlePrevDrill}
          >
            <span>Kasus Sebelumnya</span>
          </button>

          <div className="drill-footer-status">
            {isAnswered ? (
              <span className="status-answered-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                <span>Status:</span>
                {isCorrect ? (
                  <strong style={{ color: '#16a34a', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={16} /> Jawaban Tepat (+25 Pts)
                  </strong>
                ) : (
                  <strong style={{ color: '#dc2626', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <XCircle size={16} /> Perlu Pemahaman Tambahan
                  </strong>
                )}
              </span>
            ) : (
              <span className="status-pending-pill">
                Pilihlah salah satu respon tindakan di atas
              </span>
            )}
          </div>

          <div>
            {currentDrillIndex < CRITICAL_DRILLS.length - 1 ? (
              <button
                id="btn-next-drill"
                className="btn btn-primary"
                disabled={!isAnswered}
                onClick={handleNextDrill}
              >
                <span>Kasus Selanjutnya</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                id="btn-finish-twofa-drills"
                className="btn btn-green anim-beacon"
                disabled={!isAllDrillsCompleted}
                onClick={handleFinish}
              >
                <ShieldCheck size={18} />
                <span>Klaim Kelulusan Misi Benteng 2FA ({currentTotalScore}/100)</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
