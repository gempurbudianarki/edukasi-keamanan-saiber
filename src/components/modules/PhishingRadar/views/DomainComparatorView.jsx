import React, { useState } from 'react';
import { Globe, ShieldCheck, ShieldAlert, ChevronRight, Info } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';

export function DomainComparatorView({ drills, onRecordResult, onCompleteMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null); // 'A' | 'B'
  const [showAnalysis, setShowAnalysis] = useState(false);

  if (!drills || drills.length === 0) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Memuat latihan domain...</div>;
  }

  const current = drills[currentIndex];
  const isLast = currentIndex === drills.length - 1;

  const handleSelect = (choice) => {
    if (selectedChoice) return;

    setSelectedChoice(choice);
    setShowAnalysis(true);
    const isCorrect = (choice === current.correctAnswer);

    if (isCorrect) {
      playSound('success');
    } else {
      playSound('error');
    }

    onRecordResult({ id: current.id, choice, correct: isCorrect });
  };

  const handleNext = () => {
    playSound('beep');
    setSelectedChoice(null);
    setShowAnalysis(false);

    if (!isLast) {
      setCurrentIndex(i => i + 1);
    } else {
      onCompleteMode();
    }
  };

  return (
    <div className="glass-panel scenario-card">
      <div className="scenario-topbar">
        <span className="badge badge-purple">
          Lab Komparasi Domain #{currentIndex + 1} dari {drills.length}
        </span>
        <span className="badge badge-cyan">{current.title}</span>
      </div>

      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '18px' }}>
        {current.context} Tentukan mana domain yang <strong>ASLI & SAH</strong> di bawah ini:
      </p>

      {/* Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {/* Opsi A */}
        <div
          onClick={() => handleSelect('A')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: selectedChoice === 'A' 
              ? (current.correctAnswer === 'A' ? '2px solid #16a34a' : '2px solid #dc2626')
              : '1.5px solid rgba(255, 255, 255, 0.1)',
            background: selectedChoice === 'A'
              ? (current.correctAnswer === 'A' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.1)')
              : 'rgba(255, 255, 255, 0.03)',
            cursor: selectedChoice ? 'default' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span className="badge badge-secondary">Opsi A</span>
            <Globe size={18} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', wordBreak: 'break-all', fontWeight: 600 }}>
            {current.domainA.name}
          </div>
          {showAnalysis && (
            <div style={{ marginTop: '12px', fontSize: '0.8rem', color: current.domainA.isLegit ? '#16a34a' : '#dc2626', lineHeight: 1.5 }}>
              {current.domainA.analysis}
            </div>
          )}
        </div>

        {/* Opsi B */}
        <div
          onClick={() => handleSelect('B')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: selectedChoice === 'B' 
              ? (current.correctAnswer === 'B' ? '2px solid #16a34a' : '2px solid #dc2626')
              : '1.5px solid rgba(255, 255, 255, 0.1)',
            background: selectedChoice === 'B'
              ? (current.correctAnswer === 'B' ? 'rgba(22, 163, 74, 0.1)' : 'rgba(220, 38, 38, 0.1)')
              : 'rgba(255, 255, 255, 0.03)',
            cursor: selectedChoice ? 'default' : 'pointer',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span className="badge badge-secondary">Opsi B</span>
            <Globe size={18} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', wordBreak: 'break-all', fontWeight: 600 }}>
            {current.domainB.name}
          </div>
          {showAnalysis && (
            <div style={{ marginTop: '12px', fontSize: '0.8rem', color: current.domainB.isLegit ? '#16a34a' : '#dc2626', lineHeight: 1.5 }}>
              {current.domainB.analysis}
            </div>
          )}
        </div>
      </div>

      {/* Result feedback */}
      {selectedChoice && (
        <div className="feedback-box">
          <div className="feedback-result">
            {selectedChoice === current.correctAnswer ? (
              <div className="feedback-correct">
                <ShieldCheck size={20} />
                <span>BENAR! Kamu jeli membedakan domain resmi.</span>
              </div>
            ) : (
              <div className="feedback-wrong">
                <ShieldAlert size={20} />
                <span>SALAH! Kamu terkecoh manipulasi nama domain.</span>
              </div>
            )}
          </div>

          <div style={{ background: 'rgba(0, 240, 255, 0.05)', border: '1px solid rgba(0, 240, 255, 0.2)', padding: '12px', borderRadius: '8px', fontSize: '0.84rem', color: '#e2e8f0', marginBottom: '16px' }}>
            <strong>Kunci Analisis:</strong> {current.keyPoint}
          </div>

          <button className="btn btn-primary" onClick={handleNext}>
            <span>{isLast ? 'Lanjut ke Forensik Email Spoofing' : 'Latihan Domain Berikutnya'}</span>
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
