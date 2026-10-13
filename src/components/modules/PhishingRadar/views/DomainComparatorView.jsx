import React, { useState } from 'react';
import { Globe, ShieldCheck, ShieldAlert, ChevronRight, Info } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';
import { FloatingScoreBurst } from '../../../layout/FloatingScoreBurst';

export function DomainComparatorView({ drills, onRecordResult, onCompleteMode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState(null); // 'A' | 'B'
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);

  if (!drills || drills.length === 0) {
    return <div style={{ padding: '24px', textAlign: 'center' }}>Memuat latihan domain...</div>;
  }

  const current = drills[currentIndex];
  const isLast = currentIndex === drills.length - 1;

  const domainA_name = current.domainA?.name || current.domainA?.url || '';
  const domainA_isLegit = current.domainA?.isLegit ?? current.domainA?.isReal ?? false;
  const domainA_analysis = current.domainA?.analysis || (domainA_isLegit ? 'Domain resmi instansi terkait.' : 'Domain penipuan pihak ketiga.');

  const domainB_name = current.domainB?.name || current.domainB?.url || '';
  const domainB_isLegit = current.domainB?.isLegit ?? current.domainB?.isReal ?? false;
  const domainB_analysis = current.domainB?.analysis || (domainB_isLegit ? 'Domain resmi instansi terkait.' : 'Domain penipuan pihak ketiga.');

  const correctAnswer = current.correctAnswer || current.correctReal || 'A';
  const keyPoint = current.keyPoint || current.keyClue || current.takeaway || '';

  const handleSelect = (choice) => {
    if (selectedChoice) return;

    setSelectedChoice(choice);
    setShowAnalysis(true);
    const isCorrect = (choice === correctAnswer);

    if (isCorrect) {
      playSound('success');
      setBurstTrigger(t => t + 1);
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
      <FloatingScoreBurst text="+25 PTS!" trigger={burstTrigger} />

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
            border: selectedChoice
              ? (correctAnswer === 'A' ? '2px solid #16a34a' : selectedChoice === 'A' ? '2px solid #dc2626' : '1.5px solid #e2e8f0')
              : '1.5px solid #e2e8f0',
            background: selectedChoice
              ? (correctAnswer === 'A' ? '#f0fdf4' : selectedChoice === 'A' ? '#fef2f2' : '#f8fafc')
              : '#f8fafc',
            cursor: selectedChoice ? 'default' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span className={`badge ${selectedChoice && correctAnswer === 'A' ? 'badge-green' : 'badge-secondary'}`}>
              Opsi A {selectedChoice && (correctAnswer === 'A' ? '✓ (Resmi)' : selectedChoice === 'A' ? '✗ (Palsu)' : '')}
            </span>
            <Globe size={18} color="#dc2626" />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', wordBreak: 'break-all', fontWeight: 600, color: '#0f172a' }}>
            {domainA_name}
          </div>
          {showAnalysis && (
            <div style={{ marginTop: '12px', fontSize: '0.82rem', color: domainA_isLegit ? '#15803d' : '#b91c1c', lineHeight: 1.5 }}>
              {domainA_analysis}
            </div>
          )}
        </div>

        {/* Opsi B */}
        <div
          onClick={() => handleSelect('B')}
          style={{
            padding: '20px',
            borderRadius: '12px',
            border: selectedChoice
              ? (correctAnswer === 'B' ? '2px solid #16a34a' : selectedChoice === 'B' ? '2px solid #dc2626' : '1.5px solid #e2e8f0')
              : '1.5px solid #e2e8f0',
            background: selectedChoice
              ? (correctAnswer === 'B' ? '#f0fdf4' : selectedChoice === 'B' ? '#fef2f2' : '#f8fafc')
              : '#f8fafc',
            cursor: selectedChoice ? 'default' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.03)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span className={`badge ${selectedChoice && correctAnswer === 'B' ? 'badge-green' : 'badge-secondary'}`}>
              Opsi B {selectedChoice && (correctAnswer === 'B' ? '✓ (Resmi)' : selectedChoice === 'B' ? '✗ (Palsu)' : '')}
            </span>
            <Globe size={18} color="#dc2626" />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.92rem', wordBreak: 'break-all', fontWeight: 600, color: '#0f172a' }}>
            {domainB_name}
          </div>
          {showAnalysis && (
            <div style={{ marginTop: '12px', fontSize: '0.82rem', color: domainB_isLegit ? '#15803d' : '#b91c1c', lineHeight: 1.5 }}>
              {domainB_analysis}
            </div>
          )}
        </div>
      </div>

      {/* Result feedback */}
      {selectedChoice && (
        <div className="feedback-box">
          <div className="feedback-result">
            {selectedChoice === correctAnswer ? (
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

          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', padding: '14px', borderRadius: '8px', fontSize: '0.86rem', color: '#1e3a8a', marginBottom: '16px' }}>
            <strong>Kunci Analisis:</strong> {keyPoint}
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
