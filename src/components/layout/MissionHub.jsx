import React from 'react';
import { 
  Radar, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  Award, 
  Sparkles, 
  ShieldCheck, 
  Activity,
  BookOpen,
  FileText,
  RotateCcw,
  Zap,
  Target,
  Compass,
  TrendingUp,
  Layers,
  ShieldAlert
} from 'lucide-react';
import { playSound } from '../../utils/soundEffects';

export function MissionHub({ progress, onSelectMission }) {
  const missions = [
    {
      id: 'phishing',
      num: '01',
      title: 'Misi 1: Phishing Radar & Lab URL',
      subtitle: 'Simulasi Serangan, Bedah Domain & Email Spoofing',
      description: 'Eksplorasi tautan kuota gratis palsu, bedah domain palsu (.xyz, .club) vs domain pemerintah (.go.id), dan deteksi email spoofing dengan inspeksi header SPF/DKIM.',
      icon: Radar,
      color: '#ff4d4d',
      iconBg: '#ff4d4d',
      iconColor: '#ffffff',
      badgeClass: 'badge-red',
      tag: 'Deteksi Ancaman',
      features: ['Simulasi DANA Kaget', 'APK Scam CapCut Mod', 'Domain Typosquatting', 'Email Header SPF/DKIM']
    },
    {
      id: 'twoFactor',
      num: '02',
      title: 'Misi 2: Benteng 2FA',
      subtitle: 'Verifikasi Dua Langkah & Tameng Akun',
      description: 'Saksikan simulasi bot brute-force hacker yang langsung menembus akun tanpa 2FA, dan bagaimana perisai kode OTP 6-digit sukses menggagalkan pencurian sesi login.',
      icon: KeyRound,
      color: '#22c55e',
      iconBg: '#22c55e',
      iconColor: '#000000',
      badgeClass: 'badge-green',
      tag: 'Perlindungan Sesi',
      features: ['Kali Linux HydraBot', 'Terminal Brute-Force', 'Push Alert Dynamic Island', 'RFC 6238 TOTP Standard']
    }
  ];

  const completedPracticeCount = ['phishing', 'twoFactor'].filter(id => progress.completedMissions?.[id]).length;
  const isPracticeDone = completedPracticeCount === 2;

  const isPreTestDone = Boolean(progress.completedMissions?.preTest);
  const preTestScore = progress.scores?.preTest || 0;

  const isPostTestDone = Boolean(progress.completedMissions?.postTest);
  const postTestScore = progress.scores?.postTest || 0;

  // N-Gain & Delta analysis for PKM research evaluation
  const deltaScore = postTestScore - preTestScore;
  const maxPossibleGain = 100 - preTestScore;
  const nGainPercent = maxPossibleGain > 0 
    ? Math.max(0, Math.round((deltaScore / maxPossibleGain) * 100))
    : 100;

  return (
    <div className="hub-container container anim-fade-in-up">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-hud-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span className="hud-status-led anim-beacon" />
            <span>PORTAL PRAKTIK & EVALUASI SIBER SISWA</span>
            <span className="hide-mobile">• PKM UBBG 2026</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <Activity size={15} color="#22c55e" className="anim-beacon" />
            <span>STATUS SISTEM: AKTIF 24 JAM</span>
          </div>
        </div>

        <div className="hero-badge-wrap">
          <span className="badge badge-cyan">
            Pre-Test & Post-Test Terstandar
          </span>
          <span className="badge badge-red">
            Pusat Praktik Edukasi Siber
          </span>
          <span className="badge badge-purple">
            Universitas Bina Bangsa Getsempena
          </span>
        </div>

        <h1 className="hero-title">
          Kuasai Pertahanan Digital di Era <span className="text-red">Gempuran Ancaman Siber</span>
        </h1>

        <p className="hero-description">
          Selamat datang kembali, <strong>{progress.studentName ? `Agen ${progress.studentName}` : 'Siswa Siber'}</strong> di markas simulasi dan evaluasi Pengabdian Kepada Masyarakat (PKM) <strong>Universitas Bina Bangsa Getsempena (UBBG)</strong>. 
          Ikuti alur terstruktur: <strong>1. Pre-Test (15 Soal)</strong> → <strong>2. Dua Modul Simulasi Praktik</strong> → <strong>3. Post-Test (15 Soal)</strong> untuk mengukur lonjakan literasi keamanan digitalmu!
        </p>

        {/* Live Interactive Stats Strip */}
        <div className="hub-stats-row">
          <div 
            className="hub-stat-item anim-fade-in-up anim-stagger-1"
            onClick={() => {
              playSound('click');
              onSelectMission('preTest');
            }}
            title="Klik untuk membuka Pre-Test"
            role="button"
            tabIndex={0}
          >
            <div className="hub-stat-icon" style={{ background: 'var(--nb-cyan)', color: '#000' }}>
              <Compass size={20} />
            </div>
            <div>
              <div className="hub-stat-number">{isPreTestDone ? `${preTestScore}/100` : '15 Soal'}</div>
              <div className="hub-stat-label">Tahap 1: Pre-Test {isPreTestDone ? '(Tuntas)' : '(Awal)'}</div>
            </div>
          </div>

          <div 
            className="hub-stat-item anim-fade-in-up anim-stagger-2"
            onClick={() => {
              playSound('click');
              onSelectMission('phishing');
            }}
            title="Klik untuk membuka Misi 1"
            role="button"
            tabIndex={0}
          >
            <div className="hub-stat-icon" style={{ background: '#ff4d4d', color: '#fff' }}>
              <Target size={20} />
            </div>
            <div>
              <div className="hub-stat-number">{completedPracticeCount}/2 Selesai</div>
              <div className="hub-stat-label">Tahap 2: Simulasi Praktik</div>
            </div>
          </div>

          <div 
            className="hub-stat-item anim-fade-in-up anim-stagger-3"
            onClick={() => {
              playSound('click');
              onSelectMission('postTest');
            }}
            title="Klik untuk membuka Post-Test"
            role="button"
            tabIndex={0}
          >
            <div className="hub-stat-icon" style={{ background: '#facc15', color: '#000' }}>
              <FileText size={20} />
            </div>
            <div>
              <div className="hub-stat-number">{isPostTestDone ? `${postTestScore}/100` : '15 Soal'}</div>
              <div className="hub-stat-label">Tahap 3: Post-Test {isPostTestDone ? '(Tuntas)' : '(Akhir)'}</div>
            </div>
          </div>

          <div className="hub-stat-item anim-fade-in-up anim-stagger-4">
            <div className="hub-stat-icon" style={{ background: '#22c55e', color: '#000' }}>
              <Zap size={20} />
            </div>
            <div>
              <div className="hub-stat-number">Web Synth</div>
              <div className="hub-stat-label">Sintesis Audio 100% Native</div>
            </div>
          </div>
        </div>

        {/* N-Gain Analysis Card (Shown when both Pre-Test and Post-Test are finished) */}
        {isPreTestDone && isPostTestDone && (
          <div className="n-gain-analysis-card anim-pop-in">
            <div className="n-gain-badge-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span className="badge badge-purple">
                  <TrendingUp size={14} />
                  ANALISIS PENINGKATAN LITERASI SIBER (N-GAIN)
                </span>
                <span className="badge badge-green">
                  EVALUASI TERSTANDAR PKM UBBG 2026
                </span>
              </div>
              <span className="badge badge-yellow">
                Siswa: <strong>{progress.studentName || 'Siswa Siber'}</strong>
              </span>
            </div>

            <div className="n-gain-content">
              <div className="n-gain-stat-group">
                <div className="n-gain-stat">
                  <span className="n-gain-label">Skor Pre-Test (Awal)</span>
                  <span className="n-gain-val pre-val">
                    {preTestScore}<small>/100</small>
                  </span>
                </div>

                <div className="n-gain-arrow">
                  <ArrowRight size={26} />
                </div>

                <div className="n-gain-stat">
                  <span className="n-gain-label">Skor Post-Test (Akhir)</span>
                  <span className="n-gain-val post-val">
                    {postTestScore}<small>/100</small>
                  </span>
                </div>

                <div className="n-gain-divider hide-mobile" />

                <div className="n-gain-stat">
                  <span className="n-gain-label">Kenaikan Poin (Delta)</span>
                  <span className="n-gain-val delta-val">
                    {deltaScore >= 0 ? `+${deltaScore}` : deltaScore} Poin
                  </span>
                </div>

                <div className="n-gain-divider hide-mobile" />

                <div className="n-gain-stat">
                  <span className="n-gain-label">Indeks N-Gain</span>
                  <span className="n-gain-val ngain-val">
                    {nGainPercent}%
                  </span>
                </div>
              </div>

              <div className="n-gain-summary-text">
                <strong>Kesimpulan Evaluasi Literasi Siber: </strong>
                {nGainPercent >= 70 ? (
                  <span>Tingkat efektivitas modul <strong>SANGAT TINGGI (High Gain)</strong>. Pemahaman siswa mengenai phishing, verifikasi 2FA, proteksi malware, dan privasi media sosial melonjak signifikan setelah pelatihan.</span>
                ) : nGainPercent >= 30 ? (
                  <span>Tingkat efektivitas modul <strong>SEDANG / EFEKTIF (Medium Gain)</strong>. Siswa berhasil menyerap dan mempraktikkan kompetensi dasar keamanan siber dengan baik.</span>
                ) : (
                  <span>Tingkat peningkatan literasi siswa tergolong <strong>RENDAH / PERLU PENGUATAN</strong>. Disarankan untuk mengulang kembali modul simulasi Misi 1 dan Misi 2 untuk memperdalam pemahaman praktis.</span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* All Completed Banner */}
        {isPracticeDone && isPostTestDone && isPreTestDone && (
          <div className="certificate-banner anim-pop-in" style={{ background: '#ecfdf5', borderColor: '#10b981', boxShadow: '6px 6px 0 #10b981' }}>
            <div className="cert-banner-left">
              <div style={{ color: '#10b981' }}>
                <ShieldCheck size={42} />
              </div>
              <div>
                <h3 className="cert-banner-title" style={{ color: '#065f46' }}>SELURUH TAHAP EVALUASI & PRAKTIK SELESAI TERVALIDASI!</h3>
                <p className="cert-banner-desc">Kamu telah menuntaskan Pre-Test ({preTestScore}/100), menyelesaikan 2 modul simulasi realistis, dan menuntaskan Post-Test ({postTestScore}/100). Literasi keamanan sibermu kini berada pada status siaga tinggi teruji PKM UBBG 2026.</p>
              </div>
            </div>
            <div className="badge badge-green" style={{ fontSize: '0.92rem', padding: '10px 18px', border: '2px solid #000' }}>
              Kurikulum Lengkap Terpenuhi
            </div>
          </div>
        )}
      </section>

      {/* ─────────────────────────────────────────────────────────────
          TAHAP 1: PRE-TEST (Ujian Awal Diagnostik - 15 Butir Soal)
          ───────────────────────────────────────────────────────────── */}
      <div className="hub-section-divider">
        <div className="hub-divider-badge">
          <span className="badge badge-cyan" style={{ fontSize: '0.84rem' }}>
            TAHAP 1: UJIAN DIAGNOSTIK AWAL (15 BUTIR SOAL)
          </span>
        </div>
      </div>

      <div className="pre-test-hub-card anim-pop-in anim-stagger-2">
        {/* Top Decorative Border Accent */}
        <div className="pre-test-card-accent-bar" />

        <div className="post-test-hub-header">
          <div className="post-test-hub-title-block">
            <div className="pre-test-icon-box">
              <Compass size={28} />
            </div>
            <div>
              <div className="post-test-badges-row">
                <span className="badge badge-cyan">TAHAP 1: DIAGNOSTIK AWAL</span>
                <span className="badge badge-purple">15 Butir Soal Terstandar</span>
                <span className="badge badge-yellow">Wajib Sebelum Pelatihan</span>
              </div>
              <h2 className="post-test-hub-heading">
                Soal Pre-Test: Diagnostik Awal Literasi Keamanan Siber
              </h2>
            </div>
          </div>

          <div className="post-test-status-box">
            {isPreTestDone ? (
              <span className="badge badge-green post-test-status-pill">
                <CheckCircle2 size={16} />
                <span>Pre-Test Selesai: {preTestScore}/100 Poin</span>
              </span>
            ) : (
              <span className="badge badge-amber post-test-status-pill">
                <span>Status: Belum Dikerjakan (Langkah Pertama)</span>
              </span>
            )}
          </div>
        </div>

        <p className="post-test-hub-desc">
          Ukur tingkat pemahaman dan kepekaan digitalmu sebelum memulai simulasi praktik. Soal menguji 15 kompetensi dasar keamanan siber: identifikasi tautan phishing, autentikasi 2FA, kebocoran OTP, malware APK modifikasi, bahaya oversharing tiket & lokasi presisi, hingga verifikasi hoaks saring sebelum sharing.
        </p>

        {/* Visual Question Number Chips Preview */}
        <div className="post-test-chips-row">
          <div className="post-test-chips-label">
            <span>Indikator 15 Butir Soal Pre-Test:</span>
            <span className="chips-legend-text">
              {isPreTestDone ? 'Baseline nilai terverifikasi' : 'Klik nomor soal untuk mulai ujian'}
            </span>
          </div>
          <div className="post-test-chips-grid">
            {Array.from({ length: 15 }, (_, i) => (
              <div 
                key={i} 
                className={`chip-mini-q ${isPreTestDone ? 'done' : 'idle'}`}
                title={`Soal Pre-Test #${i + 1} (${isPreTestDone ? 'Telah Dikerjakan' : 'Klik untuk Buka Ujian'})`}
                onClick={() => {
                  playSound('beep');
                  onSelectMission('preTest');
                }}
                role="button"
                tabIndex={0}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="post-test-hub-footer">
          <div className="post-test-footer-hint">
            {isPreTestDone 
              ? 'Nilai pre-test telah tercatat. Lanjutkan ke 2 Modul Praktik Interaktif di bawah untuk memperdalam pemahaman.'
              : 'Langkah Awal: Kerjakan pre-test terlebih dahulu untuk mengetahui pemahaman dasarmu.'}
          </div>

          <button
            id="btn-start-pretest-hub"
            className={`btn ${isPreTestDone ? 'btn-secondary' : 'btn-cyan'} post-test-cta-btn`}
            onClick={() => {
              playSound('beep');
              onSelectMission('preTest');
            }}
          >
            <Compass size={18} />
            <span>{isPreTestDone ? 'Lihat Lembar Nilai & Pembahasan Pre-Test' : 'Mulai Ujian Pre-Test (15 Soal)'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAHAP 2: SIMULASI PRAKTIK INTERAKTIF (2 MODUL)
          ───────────────────────────────────────────────────────────── */}
      <div className="hub-section-divider">
        <div className="hub-divider-badge">
          <span className="badge badge-purple" style={{ fontSize: '0.84rem' }}>
            TAHAP 2: SIMULASI PRAKTIK INTERAKTIF (2 MODUL)
          </span>
        </div>
      </div>

      {/* Grid 2 Main Missions (Equal Heights & Robust Mobile Responsiveness) */}
      <div className="missions-grid">
        {missions.map((m, idx) => {
          const isDone = progress.completedMissions?.[m.id];
          const score = progress.scores?.[m.id] || 0;
          const Icon = m.icon;

          return (
            <div 
              key={m.id} 
              className={`mission-card ${isDone ? 'mission-completed' : ''} anim-fade-in-up anim-stagger-${idx + 3}`}
              style={{ borderTopColor: m.color }}
            >
              <div className="mission-card-header">
                <div className="mission-icon-box" style={{ background: m.iconBg, color: m.iconColor }}>
                  <Icon size={26} />
                </div>
                <div className="mission-tags">
                  <span className={`badge ${m.badgeClass}`}>{m.num}. {m.tag}</span>
                  {isDone && (
                    <span className="badge badge-green">
                      <CheckCircle2 size={13} /> Selesai ({score} Poin)
                    </span>
                  )}
                </div>
              </div>

              <div className="mission-card-body">
                <h2 className="mission-title">{m.title}</h2>
                <div className="mission-subtitle">{m.subtitle}</div>
                <p className="mission-description">{m.description}</p>

                {/* Feature Tags List (Strict 2x2 Matrix for Equal Alignment) */}
                <div className="mission-feature-chips">
                  {m.features.map((feat, fidx) => (
                    <span key={fidx} className="feature-chip">
                      <CheckCircle2 size={12} color="#16a34a" />
                      <span>{feat}</span>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mission-card-footer">
                <button
                  id={`btn-start-${m.id}`}
                  className={`btn ${isDone ? 'btn-secondary' : 'btn-primary'} btn-full`}
                  onClick={() => {
                    playSound('beep');
                    onSelectMission(m.id);
                  }}
                >
                  <span>{isDone ? 'Ulangi Misi Ini' : 'Mulai Misi Praktik'}</span>
                  <ArrowRight size={17} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TAHAP 3: POST-TEST EVALUATION (15 BUTIR SOAL)
          ───────────────────────────────────────────────────────────── */}
      <div className="hub-section-divider">
        <div className="hub-divider-badge">
          <span className="badge badge-yellow" style={{ fontSize: '0.84rem' }}>
            TAHAP 3: EVALUASI AKHIR PKM (15 BUTIR SOAL)
          </span>
        </div>
      </div>

      {/* Special Post-Test Evaluation Block */}
      <div className="post-test-hub-card anim-pop-in anim-stagger-4">
        {/* Top Decorative Border Accent */}
        <div className="post-test-card-accent-bar" />

        <div className="post-test-hub-header">
          <div className="post-test-hub-title-block">
            <div className="post-test-icon-box">
              <FileText size={28} />
            </div>
            <div>
              <div className="post-test-badges-row">
                <span className="badge badge-purple">EVALUASI AKHIR PKM</span>
                <span className="badge badge-cyan">15 Butir Soal Terstandar</span>
                <span className="badge badge-yellow anim-shimmer">Auto-Scoring & Kunci Resmi</span>
              </div>
              <h2 className="post-test-hub-heading">
                Soal Post-Test: Peningkatan Literasi Keamanan Siber
              </h2>
            </div>
          </div>

          <div className="post-test-status-box">
            {isPostTestDone ? (
              <span className="badge badge-green post-test-status-pill">
                <CheckCircle2 size={16} />
                <span>Post-Test Selesai: {postTestScore}/100 Poin</span>
              </span>
            ) : (
              <span className="badge badge-amber post-test-status-pill">
                <span>Status: Belum Dikerjakan</span>
              </span>
            )}
          </div>
        </div>

        <p className="post-test-hub-desc">
          Uji pemahaman dan peningkatan literasi digitalmu setelah menyelesaikan simulasi. Soal mencakup pengenalan rekayasa sosial (<em>Social Engineering</em>), bahaya <em>oversharing</em> dan <em>doxing</em>, autentikasi 2FA, keamanan kata sandi, mitigasi <em>ransomware</em>, hingga prinsip <em>saring sebelum sharing</em>.
        </p>

        {/* Visual Question Number Chips Preview (Responsive Grid) */}
        <div className="post-test-chips-row">
          <div className="post-test-chips-label">
            <span>Indikator 15 Butir Soal Post-Test:</span>
            <span className="chips-legend-text">
              {isPostTestDone ? 'Semua butir terverifikasi' : 'Klik nomor soal untuk mulai ujian'}
            </span>
          </div>
          <div className="post-test-chips-grid">
            {Array.from({ length: 15 }, (_, i) => (
              <div 
                key={i} 
                className={`chip-mini-q ${isPostTestDone ? 'done' : 'idle'}`}
                title={`Soal Post-Test #${i + 1} (${isPostTestDone ? 'Telah Dikerjakan' : 'Klik untuk Buka Ujian'})`}
                onClick={() => {
                  playSound('beep');
                  onSelectMission('postTest');
                }}
                role="button"
                tabIndex={0}
              >
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        <div className="post-test-hub-footer">
          <div className="post-test-footer-hint">
            {isPostTestDone 
              ? 'Hasil tes tersimpan. Kamu dapat meninjau kembali lembar jawaban & pembahasan resmi atau mengulang tes.'
              : 'Disarankan dikerjakan setelah menyelesaikan simulasi Misi 1 dan Misi 2.'}
          </div>

          <button
            id="btn-start-posttest-hub"
            className={`btn ${isPostTestDone ? 'btn-secondary' : 'btn-yellow'} post-test-cta-btn`}
            onClick={() => {
              playSound('beep');
              onSelectMission('postTest');
            }}
          >
            <span>{isPostTestDone ? 'Lihat Lembar Nilai & Pembahasan Post-Test' : 'Mulai Ujian Post-Test (15 Soal)'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
