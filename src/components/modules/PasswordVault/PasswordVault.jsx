import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { evaluatePassword } from '../../../data/passwordRules';
import { playSound } from '../../../utils/soundEffects';
import { PasswordTester } from './components/PasswordTester';
import { PassphraseGenerator } from './components/PassphraseGenerator';
import './PasswordVault.css';

export function PasswordVault({ onBack, onComplete, initialScore = 0 }) {
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(false);
  const [score, setScore] = useState(initialScore);

  const analysis = evaluatePassword(password);

  const handlePasswordChange = (val) => {
    setPassword(val);
    const newAnalysis = evaluatePassword(val);
    if (newAnalysis.score >= 80) {
      if (score < 100) {
        playSound('success');
        setScore(100);
        onComplete(100);
      }
    }
  };

  return (
    <div className="module-page container">
      <div className="module-header">
        <button className="module-nav-back" onClick={onBack}>
          <ArrowLeft size={16} /> Kembali ke Misi Hub
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-green">Misi 03: Password Vault</span>
          <span className="badge badge-cyan">Skor: {score}/100</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        <PasswordTester
          password={password}
          onPasswordChange={handlePasswordChange}
          showPassword={showPassword}
          onToggleShow={() => setShowPassword(s => !s)}
          analysis={analysis}
        />

        <PassphraseGenerator
          onApplyPassphrase={handlePasswordChange}
        />
      </div>
    </div>
  );
}
