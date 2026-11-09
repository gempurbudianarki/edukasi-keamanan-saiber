import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Award, 
  RotateCcw, 
  Sparkles, 
  FileText, 
  AlertTriangle,
  Printer,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Compass,
  Radar,
  Lock,
  EyeOff,
  Radio,
  Mail,
  FileWarning,
  Users,
  Check,
  CheckCheck,
  Target,
  Layers,
  Lightbulb,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRE_TEST_QUESTIONS, PRE_TEST_ANSWER_KEY } from '../../../data/preTestData';
import { playSound } from '../../../utils/soundEffects';
import { getPreTestSession, savePreTestSession, resetPreTestSession } from '../../../utils/storage';
import { PreTestSubmitModal } from './PreTestSubmitModal';
import '../PostTest/PostTest.css';

// Dynamic category icon matcher for cyber security modules
function getCategoryIcon(category = '') {
  const c = category.toLowerCase();
  if (c.includes('phishing') || c.includes('tautan')) return <Radar size={14} />;
  if (c.includes('2fa') || c.includes('otentikasi') || c.includes('otp')) return <ShieldCheck size={14} />;
  if (c.includes('sandi') || c.includes('password')) return <Lock size={14} />;
  if (c.includes('privasi') || c.includes('oversharing')) return <EyeOff size={14} />;
  if (c.includes('malware') || c.includes('ransomware') || c.includes('apk')) return <AlertTriangle size={14} />;
  if (c.includes('wi-fi') || c.includes('wifi')) return <Radio size={14} />;
  if (c.includes('email') || c.includes('spoofing')) return <Mail size={14} />;
  if (c.includes('doxing') || c.includes('kejahatan')) return <FileWarning size={14} />;
  if (c.includes('sosial') || c.includes('gen-z') || c.includes('rekayasa')) return <Users size={14} />;
  return <Sparkles size={14} />;
}

export function PreTest({ onBack, onComplete, onNavigateToHub, initialScore = 0, studentName = '' }) {
  const [session, setSession] = useState(() => getPreTestSession());
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(() => session?.answers || {});
  const [isSubmitted, setIsSubmitted] = useState(() => session?.isSubmitted || false);
  const [score, setScore] = useState(() => session?.score || initialScore);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [reviewFilter, setReviewFilter] = useState('all'); // 'all' | 'wrong' | 'correct'

  // Sync session changes to localStorage
  useEffect(() => {
    savePreTestSession({
      answers,
      isSubmitted,
      score
    });
  }, [answers, isSubmitted, score]);

  const currentQ = PRE_TEST_QUESTIONS[currentIndex];
  const totalQuestions = PRE_TEST_QUESTIONS.length;
  const answeredCount = Object.keys(answers).length;

  // Calculate correct and wrong counts
  let correctCount = 0;
  PRE_TEST_QUESTIONS.forEach(q => {
    if (answers[q.number] === PRE_TEST_ANSWER_KEY[q.number]) {
      correctCount += 1;
    }
  });
  const wrongCount = totalQuestions - correctCount;

  const handleSelectOption = (key) => {
    if (isSubmitted) return; // Locked after submission
    playSound('click');
    const updated = {
      ...answers,
      [currentQ.number]: key
    };
    setAnswers(updated);
  };

  const handleNext = () => {
    playSound('click');
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    playSound('click');
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const handleJumpToQuestion = (index) => {
    playSound('click');
    setCurrentIndex(index);
  };

  // Keyboard navigation shortcuts: A, B, C, D, ArrowLeft, ArrowRight
  useEffect(() => {
    if (isSubmitted || showConfirmModal) return;

    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const upper = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(upper)) {
        e.preventDefault();
        handleSelectOption(upper);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentIndex < totalQuestions - 1) {
          setCurrentIndex(prev => prev + 1);
          playSound('click');
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentIndex > 0) {
          setCurrentIndex(prev => prev - 1);
          playSound('click');
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, isSubmitted, showConfirmModal, answers]);

  const handleSubmit = () => {
    setShowConfirmModal(false);
    playSound('complete');

    // Calculate score
    let verifiedCorrect = 0;
    PRE_TEST_QUESTIONS.forEach(q => {
      if (answers[q.number] === PRE_TEST_ANSWER_KEY[q.number]) {
        verifiedCorrect += 1;
      }
    });

    const finalPct = Math.round((verifiedCorrect / totalQuestions) * 100);
    setScore(finalPct);
    setIsSubmitted(true);

    try {
      confetti({
        particleCount: 140,
        spread: 90,
        origin: { y: 0.55 },
        colors: ['#00f0ff', '#facc15', '#22c55e', '#ff4d4d', '#a855f7']
      });
      setTimeout(() => {
        confetti({
          particleCount: 80,
          angle: 60,
          spread: 65,
          origin: { x: 0, y: 0.65 }
        });
        confetti({
          particleCount: 80,
          angle: 120,
          spread: 65,
          origin: { x: 1, y: 0.65 }
        });
      }, 250);
    } catch {
      // canvas fallback
    }

    if (onComplete) {
      onComplete(finalPct);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    playSound('click');
    resetPreTestSession();
    setAnswers({});
    setIsSubmitted(false);
    setScore(0);
    setCurrentIndex(0);
    setReviewFilter('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    playSound('click');
    window.print();
  };

  // Grade classification for baseline
  const getGradeInfo = (pct) => {
    if (pct >= 90) return { grade: 'A+', label: 'Sangat Paham • Literasi Siber Sangat Matang', color: '#16a34a' };
    if (pct >= 80) return { grade: 'A', label: 'Paham Baik • Pondasi Keamanan Kokoh', color: '#16a34a' };
    if (pct >= 70) return { grade: 'B+', label: 'Cukup Paham • Siap Praktik Simulasi', color: '#ca8a04' };
    if (pct >= 60) return { grade: 'B', label: 'Perlu Penguatan • Simak Detail Misi Praktik', color: '#ea580c' };
    return { grade: 'C', label: 'Pondasi Awal • Rekomendasi Selesaikan Modul Phishing & 2FA', color: '#dc2626' };
  };

  const gradeInfo = getGradeInfo(score);

  // Filtered review questions
  const filteredQuestions = PRE_TEST_QUESTIONS.filter(q => {
    const isCorrect = answers[q.number] === PRE_TEST_ANSWER_KEY[q.number];
    if (reviewFilter === 'wrong') return !isCorrect;
    if (reviewFilter === 'correct') return isCorrect;
    return true;
  });

  return (
    <div className="module-page container post-test-wrapper">
      {/* Top Navigation Bar */}
      <div className="module-header no-print">
        <button 
          id="btn-back-hub-pretest"
          className="module-nav-back" 
          onClick={onBack}
        >
          <ArrowLeft size={16} /> Kembali ke Misi Hub
        </button>

        <div className="posttest-header-badges">
          <span className="badge badge-purple">
            <Compass size={14} style={{ marginRight: 4, verticalAlign: 'middle' }} />
            Tahap 1: Pre-Test PKM UBBG 2026
          </span>
          <span className={`badge ${isSubmitted ? (score >= 70 ? 'badge-green' : 'badge-amber') : 'badge-cyan'}`}>
            {isSubmitted ? `Skor Baseline: ${score}/100` : `Terjawab: ${answeredCount}/${totalQuestions}`}
          </span>
        </div>
      </div>

      {/* Hero Title */}
      <div className="posttest-hero no-print">
        <div className="posttest-hero-badge">
          <span className="welcome-dot-red" />
          TAHAP 1: EVALUASI BASELINE AWAL SISWA
        </div>
        <h1 className="posttest-title">
          Soal Pre-Test: <span className="text-red">Diagnostik Awal Literasi Keamanan Siber</span>
        </h1>
        <p className="posttest-desc">
          Uji pemahaman dasar sebelum memulai modul simulasi praktik. Hasil tes ini menjadi tolok ukur baseline 
          untuk menghitung efektivitas peningkatan pemahaman literasi siber (N-Gain Score) setelah pelatihan selesai.
        </p>
      </div>

      {/* ========================================================= */}
      {/* VIEW A: RESULTS & REVIEW MODE (AFTER SUBMISSION)          */}
      {/* ========================================================= */}
      {isSubmitted ? (
        <div className="posttest-result-container">
          {/* Result Card */}
          <div className="result-score-card anim-pop-in">
            <div className="result-badge-top">
              <div className="result-badge-left">
                <ShieldCheck size={26} color="#16a34a" />
                <span>EVALUASI PRE-TEST SELESAI TERCATAT • PKM UBBG 2026</span>
              </div>
              <div className="result-timestamp-badge hide-mobile">
                Tolok Ukur Baseline Awal
              </div>
            </div>

            <div className="result-main-grid">
              {/* Circular Score Gauge */}
              <div className="result-score-gauge-block">
                <div className="score-ring-wrap">
                  <svg className="score-ring-svg" viewBox="0 0 120 120">
                    <circle 
                      className="score-ring-bg" 
                      cx="60" 
                      cy="60" 
                      r="48" 
                    />
                    <circle 
                      className="score-ring-progress" 
                      cx="60" 
                      cy="60" 
                      r="48" 
                      style={{
                        strokeDasharray: 301.6,
                        strokeDashoffset: 301.6 - (301.6 * (score / 100)),
                        stroke: gradeInfo.color
                      }}
                    />
                  </svg>
                  <div className="score-ring-content">
                    <div className="score-big-number" style={{ color: gradeInfo.color }}>
                      {score}
                    </div>
                    <div className="score-pts-tag">SKOR BASELINE / 100</div>
                  </div>
                </div>
                <div className="score-grade-ribbon" style={{ background: gradeInfo.color }}>
                  PREDIKAT: {gradeInfo.grade}
                </div>
              </div>

              {/* Details & Performance Verdict */}
              <div className="result-details-block">
                <div className="result-candidate-info">
                  <span className="candidate-icon"><Award size={18} color="#facc15" /></span>
                  <div>
                    <div className="candidate-label">Peserta Ujian:</div>
                    <div className="candidate-name">{studentName ? `Agen ${studentName}` : 'Siswa / Mahasiswa Generasi Z'}</div>
                  </div>
                </div>

                <div className="result-grade-banner" style={{ borderColor: gradeInfo.color }}>
                  <Award size={20} color={gradeInfo.color} />
                  <div>
                    <strong>{gradeInfo.label}</strong>
                  </div>
                </div>

                <p className="result-summary-text">
                  Kamu berhasil menjawab dengan benar <strong>{correctCount} dari {totalQuestions} soal</strong> ({Math.round((correctCount / totalQuestions) * 100)}% Akurasi). 
                  Sekarang lanjutkan ke <strong>2 Modul Praktik Interaktif</strong> (Phishing Radar & Benteng 2FA) untuk meningkatkan literasi sibermu!
                </p>

                {/* 3 Metric Pills */}
                <div className="result-stats-3col">
                  <div className="res-stat-card stat-correct">
                    <CheckCircle2 size={20} color="#15803d" />
                    <div>
                      <div className="stat-num">{correctCount} Soal</div>
                      <div className="stat-label">Jawaban Benar</div>
                    </div>
                  </div>

                  <div className="res-stat-card stat-wrong">
                    <XCircle size={20} color="#b91c1c" />
                    <div>
                      <div className="stat-num">{wrongCount} Soal</div>
                      <div className="stat-label">Jawaban Salah</div>
                    </div>
                  </div>

                  <div className="res-stat-card stat-accuracy">
                    <Target size={20} color="#0369a1" />
                    <div>
                      <div className="stat-num">{Math.round((correctCount / totalQuestions) * 100)}%</div>
                      <div className="stat-label">Tingkat Akurasi</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="result-card-actions no-print">
              <button 
                id="btn-retake-pretest"
                className="btn btn-secondary result-btn" 
                onClick={handleRetake}
                title="Kerjakan Ulang Soal Pre-Test"
              >
                <RotateCcw size={16} />
                <span>Ulangi Pre-Test</span>
              </button>

              <button 
                id="btn-print-pretest"
                className="btn btn-secondary result-btn" 
                onClick={handlePrint}
                title="Cetak Lembar Nilai & Jawaban"
              >
                <Printer size={16} />
                <span>Cetak Lembar Nilai</span>
              </button>

              <button 
                id="btn-goto-practice-missions"
                className="btn btn-primary result-btn" 
                onClick={() => {
                  playSound('beep');
                  if (onNavigateToHub) {
                    onNavigateToHub();
                  } else {
                    onBack();
                  }
                }}
                title="Lanjut ke Modul Praktik Simulasi"
              >
                <Layers size={17} />
                <span>Lanjut ke 2 Misi Praktik</span>
                <ArrowRight size={17} />
              </button>
            </div>
          </div>

          {/* Official Key Review List */}
          <div className="review-section">
            <div className="review-section-header">
              <div className="review-title-box">
                <h2 className="review-title">
                  <FileText size={22} />
                  <span>Bedah Lembar Jawaban & Pembahasan Resmi Pre-Test (15 Soal)</span>
                </h2>
                <span className="badge badge-purple no-print">
                  Kunci Terstandar PKM UBBG 2026
                </span>
              </div>

              {/* Filter Tabs: Semua / Salah / Benar */}
              <div className="review-filter-tabs no-print">
                <button
                  id="btn-filter-pretest-all"
                  className={`review-tab-btn ${reviewFilter === 'all' ? 'active' : ''}`}
                  onClick={() => { playSound('click'); setReviewFilter('all'); }}
                >
                  <Layers size={14} />
                  <span>Semua ({totalQuestions})</span>
                </button>

                <button
                  id="btn-filter-pretest-wrong"
                  className={`review-tab-btn tab-wrong ${reviewFilter === 'wrong' ? 'active' : ''}`}
                  onClick={() => { playSound('click'); setReviewFilter('wrong'); }}
                >
                  <XCircle size={14} />
                  <span>Salah ({wrongCount})</span>
                </button>

                <button
                  id="btn-filter-pretest-correct"
                  className={`review-tab-btn tab-correct ${reviewFilter === 'correct' ? 'active' : ''}`}
                  onClick={() => { playSound('click'); setReviewFilter('correct'); }}
                >
                  <CheckCircle2 size={14} />
                  <span>Benar ({correctCount})</span>
                </button>
              </div>
            </div>

            <div className="review-cards-list">
              {filteredQuestions.map((q) => {
                const userAns = answers[q.number];
                const isCorrect = userAns === PRE_TEST_ANSWER_KEY[q.number];

                return (
                  <div 
                    key={q.id} 
                    className={`review-card ${isCorrect ? 'review-card-correct' : 'review-card-wrong'} anim-pop-in`}
                  >
                    <div className="review-card-header">
                      <div className="review-card-left">
                        <span className={`review-status-icon ${isCorrect ? 'icon-correct' : 'icon-wrong'}`}>
                          {isCorrect ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                        </span>
                        <div>
                          <span className="review-q-num">SOAL #{q.number}</span>
                          <span className="review-q-cat">• {q.category}</span>
                        </div>
                      </div>

                      <div className="review-card-badge">
                        {isCorrect ? (
                          <span className="badge badge-green">Tepat (+{Math.round(100 / totalQuestions)} Poin)</span>
                        ) : (
                          <span className="badge badge-red">Kurang Tepat (0 Poin)</span>
                        )}
                      </div>
                    </div>

                    <h3 className="review-question-text">{q.question}</h3>

                    {/* Options list showing user choice vs correct answer */}
                    <div className="review-options-grid">
                      {q.options.map((opt) => {
                        const isThisKeyCorrect = opt.key === PRE_TEST_ANSWER_KEY[q.number];
                        const isThisUserSelected = opt.key === userAns;

                        let optClass = 'review-option-item';
                        if (isThisKeyCorrect) optClass += ' option-key-correct';
                        if (isThisUserSelected && !isThisKeyCorrect) optClass += ' option-user-wrong';

                        return (
                          <div key={opt.key} className={optClass}>
                            <span className="review-opt-key">{opt.key}</span>
                            <span className="review-opt-text">{opt.text}</span>
                            {isThisKeyCorrect && (
                              <span className="key-tag-correct"><CheckCircle2 size={13} style={{ marginRight: 4 }} /> KUNCI RESMI</span>
                            )}
                            {isThisUserSelected && !isThisKeyCorrect && (
                              <span className="key-tag-wrong"><XCircle size={13} style={{ marginRight: 4 }} /> PILIHANMU</span>
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Pedagogical Explanation Box */}
                    <div className="review-explanation-box">
                      <div className="explanation-title">
                        <Lightbulb size={16} />
                        <span>Pembahasan Ilmiah & Rekomendasi Modul:</span>
                      </div>
                      <p className="explanation-text">{q.explanation}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* ========================================================= */
        /* VIEW B: INTERACTIVE QUESTION SOLVING MODE                */
        /* ========================================================= */
        <div className="posttest-interactive-layout">
          {/* Question Navigator Matrix HUD (1 to 15) */}
          <div className="posttest-question-matrix">
            <div className="matrix-title">
              <div className="matrix-title-left">
                <Compass size={18} className="matrix-compass-icon" />
                <span>Navigasi Butir Soal Pre-Test (15 Butir)</span>
              </div>
              <div className="matrix-title-right">
                <span className="matrix-count">
                  <span className="pill-dot-live anim-beacon" />
                  {answeredCount} / {totalQuestions} Terjawab
                </span>
                {answeredCount === 15 ? (
                  <span className="matrix-ready-badge anim-pop-in">
                    <CheckCheck size={13} /> Siap Kumpul
                  </span>
                ) : (
                  <span className="matrix-remaining-badge">
                    {totalQuestions - answeredCount} Belum
                  </span>
                )}
              </div>
            </div>

            <div className="matrix-pills-row">
              {PRE_TEST_QUESTIONS.map((q, idx) => {
                const isAnswered = Boolean(answers[q.number]);
                const isActive = idx === currentIndex;
                const chosen = answers[q.number];

                let pillClass = 'matrix-pill';
                if (isActive) pillClass += ' active-pill';
                if (isAnswered) pillClass += ' answered-pill';

                return (
                  <button
                    key={q.id}
                    id={`btn-jump-pretest-${q.number}`}
                    className={pillClass}
                    onClick={() => handleJumpToQuestion(idx)}
                    title={`Lompat ke Soal #${q.number}${isAnswered ? ` (Pilihan: ${chosen})` : ' (Belum Dijawab)'}`}
                    aria-label={`Soal pre-test nomor ${q.number}${isAnswered ? `, telah dijawab ${chosen}` : ', belum dijawab'}`}
                  >
                    <span className="matrix-pill-num">{q.number}</span>
                    {isAnswered && (
                      <span className="matrix-pill-sub-ans">{chosen}</span>
                    )}
                    {isAnswered && <span className="pill-dot-green" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Question Solving Card */}
          <div key={currentQ.id} className="active-question-card anim-pop-in">
            {/* Candy-Stripe Animated Progress Bar */}
            <div className="question-progress-bar-wrap">
              <div className="question-progress-track">
                <div 
                  className="question-progress-fill" 
                  style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
                />
              </div>
              <div className="question-progress-meta-pill">
                <span className="progress-step-text">
                  Butir <strong>{currentIndex + 1}</strong>/<strong>{totalQuestions}</strong>
                </span>
                <span className="progress-pct-badge">
                  {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
                </span>
              </div>
            </div>

            <div className="question-card-meta">
              <div className="question-number-pill">
                <span className="q-pill-accent">SOAL #{currentQ.number}</span>
                <span className="q-pill-divider">•</span>
                <span className="q-pill-step">{currentIndex + 1} DARI {totalQuestions}</span>
              </div>

              <div className="question-category-tag">
                <span className="cat-icon-badge">{getCategoryIcon(currentQ.category)}</span>
                <span className="cat-text">{currentQ.category}</span>
              </div>

              <div className="question-shortcuts-pill hide-mobile">
                <kbd>A</kbd><kbd>B</kbd><kbd>C</kbd><kbd>D</kbd> Pilih
                <span className="kbd-sep">|</span>
                <kbd>←</kbd><kbd>→</kbd> Navigasi
              </div>
            </div>

            <h2 className="active-question-title">
              {currentQ.question}
            </h2>

            {/* Options list (A, B, C, D) */}
            <div className="options-selection-group">
              {currentQ.options.map((opt) => {
                const isSelected = answers[currentQ.number] === opt.key;

                return (
                  <button
                    key={opt.key}
                    id={`btn-pretest-opt-${currentQ.number}-${opt.key}`}
                    type="button"
                    className={`option-select-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => handleSelectOption(opt.key)}
                    aria-pressed={isSelected}
                  >
                    <div className="option-key-badge">{opt.key}</div>
                    <div className="option-text-body">{opt.text}</div>
                    <span className="option-keyboard-hint hide-mobile">
                      [{opt.key}]
                    </span>
                    <div className="option-radio-circle">
                      {isSelected ? (
                        <Check size={14} className="option-check-icon anim-pop-in" />
                      ) : (
                        <div className="option-radio-empty" />
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls */}
            <div className="question-card-footer">
              <button
                id="btn-prev-pretest"
                className="btn btn-secondary q-nav-btn prev-btn"
                disabled={currentIndex === 0}
                onClick={handlePrev}
              >
                <ChevronLeft size={18} className="q-nav-arrow-left" />
                <span>Sebelumnya</span>
              </button>

              <div className="footer-status-pill">
                {answers[currentQ.number] ? (
                  <span className="pill-status-answered">
                    <CheckCircle2 size={15} color="#16a34a" />
                    <span>Terpilih: <strong>Opsi [{answers[currentQ.number]}]</strong></span>
                  </span>
                ) : (
                  <span className="pill-status-unanswered">
                    <AlertTriangle size={15} color="#d97706" />
                    <span>Belum Memilih Opsi</span>
                  </span>
                )}
              </div>

              <div className="footer-right-actions">
                {currentIndex < totalQuestions - 1 ? (
                  <button
                    id="btn-next-pretest"
                    className="btn btn-primary q-nav-btn next-btn"
                    onClick={handleNext}
                  >
                    <span>Selanjutnya</span>
                    <ChevronRight size={18} className="q-nav-arrow-right" />
                  </button>
                ) : (
                  <button
                    id="btn-submit-pretest-direct"
                    className="btn btn-green q-submit-direct-btn anim-beacon"
                    onClick={() => setShowConfirmModal(true)}
                  >
                    <CheckCircle2 size={18} />
                    <span>Kumpulkan Lembar Pre-Test</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Quick Submit Floating / Bottom Bar */}
          <div className="posttest-summary-bottom-bar">
            <div className="summary-bar-info">
              <div className="summary-meter-box">
                <span className="meter-label">TOTAL PRE-TEST TERJAWAB</span>
                <span className="meter-val">{answeredCount} / {totalQuestions}</span>
              </div>
              <div className="summary-desc-text">
                {answeredCount === totalQuestions ? (
                  <span className="text-all-done">
                    <Sparkles size={14} /> Seluruh 15 butir Pre-Test lengkap! Siap dihitung baseline.
                  </span>
                ) : (
                  <span className="text-partial">
                    Tersisa <strong>{totalQuestions - answeredCount}</strong> butir belum dijawab.
                  </span>
                )}
              </div>
            </div>

            <button
              id="btn-open-submit-pretest-modal"
              className={`btn ${answeredCount === totalQuestions ? 'btn-green' : 'btn-primary'} summary-submit-btn`}
              onClick={() => setShowConfirmModal(true)}
            >
              <CheckCircle2 size={18} />
              <span>Selesai & Kumpulkan ({answeredCount}/{totalQuestions})</span>
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <PreTestSubmitModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleSubmit}
        answers={answers}
        totalQuestions={totalQuestions}
        onJumpToQuestion={handleJumpToQuestion}
      />
    </div>
  );
}
