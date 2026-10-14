import React, { useState } from 'react';
import { Globe, ShieldCheck, ShieldAlert, ChevronRight, Info } from 'lucide-react';
import { playSound } from '../../../../utils/soundEffects';
import { FloatingScoreBurst } from '../../../layout/FloatingScoreBurst';

export function DomainComparatorView({ 
  drills, 
  initialIndex = 0, 
  onIndexChange, 
  onRecordResult, 
  onCompleteMode 
}) {
  const [currentIndex, setCurrentIndex] = useState(() => {
    return Math.max(0, initialIndex || 0);
  });
  const [selectedChoice, setSelectedChoice] = useState(null); // 'A' | 'B'
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [burstTrigger, setBurstTrigger] = useState(0);

  React.useEffect(() => {
    if (initialIndex !== undefined && drills?.length) {
      setCurrentIndex(Math.min(initialIndex, drills.length - 1));
    }
  }, [initialIndex, drills?.length]);

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
      setCurrentIndex(i => {
        const next = i + 1;
        onIndexChange?.(next);
        return next;
      });
    } else {
      onIndexChange?.(0);
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
            borderRadius: 'var(--nb-radius-md, 8px)',
            border: selectedChoice
              ? (correctAnswer === 'A' ? '2.5px solid #000' : selectedChoice === 'A' ? '2.5px solid #000' : '2px solid #000')
              : '2.5px solid #000000',
            background: selectedChoice
              ? (correctAnswer === 'A' ? '#dcfce7' : selectedChoice === 'A' ? '#fee2e2' : '#ffffff')
              : '#ffffff',
            cursor: selectedChoice ? 'default' : 'pointer',
            transition: 'transform 0.12s, box-shadow 0.12s',
            boxShadow: selectedChoice
              ? (correctAnswer === 'A' ? '3px 3px 0 #16a34a' : selectedChoice === 'A' ? '3px 3px 0 #dc2626' : '2px 2px 0 #000')
              : '4px 4px 0 #000000'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span className={`badge ${selectedChoice && correctAnswer === 'A' ? 'badge-green' : selectedChoice && selectedChoice === 'A' ? 'badge-red' : 'badge-secondary'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span>Opsi A</span>
              {selectedChoice && (
                correctAnswer === 'A' ? (
                  <>
                    <ShieldCheck size={14} />
                    <span>(Resmi)</span>
                  </>
                ) : selectedChoice === 'A' ? (
                  <>
                    <ShieldAlert size={14} />
                    <span>(Palsu)</span>
                  </>
                ) : null
              )}
            </span>
            <Globe size={18} color="#0f172a" />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', wordBreak: 'break-all', fontWeight: 800, color: '#0f172a' }}>
            {domainA_name}
          </div>
          {showAnalysis && (
            <div style={{ marginTop: '12px', fontSize: '0.82rem', color: domainA_isLegit ? '#15803d' : '#b91c1c', lineHeight: 1.5, fontWeight: 600 }}>
              {domainA_analysis}
            </div>
          )}
        </div>

        {/* Opsi B */}
        <div
          onClick={() => handleSelect('B')}
          style={{
            padding: '20px',
            borderRadius: 'var(--nb-radius-md, 8px)',
            border: selectedChoice
              ? (correctAnswer === 'B' ? '2.5px solid #000' : selectedChoice === 'B' ? '2.5px solid #000' : '2px solid #000')
              : '2.5px solid #000000',
            background: selectedChoice
              ? (correctAnswer === 'B' ? '#dcfce7' : selectedChoice === 'B' ? '#fee2e2' : '#ffffff')
              : '#ffffff',
            cursor: selectedChoice ? 'default' : 'pointer',
            transition: 'transform 0.12s, box-shadow 0.12s',
            boxShadow: selectedChoice
              ? (correctAnswer === 'B' ? '3px 3px 0 #16a34a' : selectedChoice === 'B' ? '3px 3px 0 #dc2626' : '2px 2px 0 #000')
              : '4px 4px 0 #000000'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span className={`badge ${selectedChoice && correctAnswer === 'B' ? 'badge-green' : selectedChoice && selectedChoice === 'B' ? 'badge-red' : 'badge-secondary'}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
              <span>Opsi B</span>
              {selectedChoice && (
                correctAnswer === 'B' ? (
                  <>
                    <ShieldCheck size={14} />
                    <span>(Resmi)</span>
                  </>
                ) : selectedChoice === 'B' ? (
                  <>
                    <ShieldAlert size={14} />
                    <span>(Palsu)</span>
                  </>
                ) : null
              )}
            </span>
            <Globe size={18} color="#0f172a" />
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', wordBreak: 'break-all', fontWeight: 800, color: '#0f172a' }}>
            {domainB_name}
          </div>
          {showAnalysis && (
            <div style={{ marginTop: '12px', fontSize: '0.82rem', color: domainB_isLegit ? '#15803d' : '#b91c1c', lineHeight: 1.5, fontWeight: 600 }}>
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
