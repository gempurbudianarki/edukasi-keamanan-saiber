// Web Audio API Synth Sound Effects (Zero external audio files needed)
let audioCtx = null;

// Audio default OFF (muted) agar tidak mengagetkan di kelas / proyektor
let isAudioMuted = true;

if (typeof window !== 'undefined') {
  const saved = localStorage.getItem('cybergenz_audio_muted');
  if (saved !== null) {
    isAudioMuted = saved === 'true';
  }
}

function getAudioContext() {
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      audioCtx = new AudioContext();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function toggleAudioMute() {
  isAudioMuted = !isAudioMuted;
  if (typeof window !== 'undefined') {
    localStorage.setItem('cybergenz_audio_muted', String(isAudioMuted));
  }
  return isAudioMuted;
}

export function getAudioMutedStatus() {
  return isAudioMuted;
}

export function playSound(type = 'click', force = false) {
  if (isAudioMuted && !force) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'success') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
      osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'error') {
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.2);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'siren') {
      // Tactical Nuclear Air-Raid Klaxon Siren
      const duration = 2.4;
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      const oscSub = ctx.createOscillator();
      const gainSub = ctx.createGain();

      osc.type = 'sawtooth';
      osc2.type = 'square';
      oscSub.type = 'sine';

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      oscSub.connect(gainSub);
      gainSub.connect(ctx.destination);

      // 4 siren wail cycles (pitch ramps up and down)
      const cycles = 4;
      const cycleLen = duration / cycles;
      for (let i = 0; i < cycles; i++) {
        const start = now + i * cycleLen;
        const mid = start + cycleLen * 0.48;
        const end = start + cycleLen;

        osc.frequency.setValueAtTime(500, start);
        osc.frequency.exponentialRampToValueAtTime(1150, mid);
        osc.frequency.exponentialRampToValueAtTime(500, end);

        osc2.frequency.setValueAtTime(505, start);
        osc2.frequency.exponentialRampToValueAtTime(1160, mid);
        osc2.frequency.exponentialRampToValueAtTime(505, end);
      }

      // Low sub-bass earthquake rumble during siren
      oscSub.frequency.setValueAtTime(65, now);
      oscSub.frequency.exponentialRampToValueAtTime(45, now + duration);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.005, now + duration);

      gainSub.gain.setValueAtTime(0.18, now);
      gainSub.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.start(now);
      osc.stop(now + duration);
      osc2.start(now);
      osc2.stop(now + duration);
      oscSub.start(now);
      oscSub.stop(now + duration);
    } else if (type === 'glitch') {
      // Glitch / static buzz
      osc.type = 'square';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.setValueAtTime(80, now + 0.05);
      osc.frequency.setValueAtTime(350, now + 0.1);
      osc.frequency.setValueAtTime(60, now + 0.15);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'complete') {
      // Fanfare
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, now + i * 0.1);
        g.gain.setValueAtTime(0.15, now + i * 0.1);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.25);
        o.start(now + i * 0.1);
        o.stop(now + i * 0.1 + 0.25);
      });
    } else if (type === 'scan') {
      // Cyber radar scan frequency sweep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(1400, now + 0.18);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'beep') {
      // Tactical cyber HUD beep
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(880, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch {
    // Ignore audio errors silently
  }
}
