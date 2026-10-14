// Web Audio API Synth Sound Effects (Zero external audio files needed)
let audioCtx = null;

// Audio default ON (unmuted) agar interaksi terasa hidup & nyata
let isAudioMuted = false;

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
      // Crisp mechanical UI click
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'keyboard') {
      // Rapid cyber terminal keystroke tick
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200 + Math.random() * 400, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.025);
      osc.start(now);
      osc.stop(now + 0.025);
    } else if (type === 'phone_ring') {
      // Realistic dual-tone smartphone notification chime (Ding-Dong / E6 - G#6)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc.type = 'sine';
      osc2.type = 'sine';

      // Chime 1 (now)
      osc.frequency.setValueAtTime(1318.51, now); // E6
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      osc.start(now);
      osc.stop(now + 0.28);

      // Chime 2 (after 0.12s)
      osc2.frequency.setValueAtTime(1661.22, now + 0.12); // G#6
      gain2.gain.setValueAtTime(0.001, now);
      gain2.gain.setValueAtTime(0.22, now + 0.12);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc2.start(now);
      osc2.stop(now + 0.45);
    } else if (type === 'shield') {
      // Sci-fi forcefield hum / energy barrier deflection
      osc.type = 'sine';
      osc.frequency.setValueAtTime(280, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.2);
      osc.frequency.exponentialRampToValueAtTime(620, now + 0.4);
      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === 'success') {
      // Triumph triad chord
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.connect(g);
        g.connect(ctx.destination);
        o.type = 'triangle';
        o.frequency.setValueAtTime(freq, now + i * 0.06);
        g.gain.setValueAtTime(0.15, now + i * 0.06);
        g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.3);
        o.start(now + i * 0.06);
        o.stop(now + i * 0.06 + 0.3);
      });
    } else if (type === 'error') {
      // Low dual buzzer
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(90, now + 0.25);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'siren') {
      // Cinematic DEFCON-1 Nuclear & Cyber War Emergency Klaxon
      const duration = 2.8;
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      const oscSub = ctx.createOscillator();
      const gainSub = ctx.createGain();
      const oscAlarm = ctx.createOscillator();
      const gainAlarm = ctx.createGain();

      osc.type = 'sawtooth';
      osc2.type = 'square';
      oscSub.type = 'sine';
      oscAlarm.type = 'sawtooth';

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      oscSub.connect(gainSub);
      gainSub.connect(ctx.destination);

      oscAlarm.connect(gainAlarm);
      gainAlarm.connect(ctx.destination);

      // Layer 1 & 2: Dual sweeping de-tuned air-raid klaxon
      const cycles = 5;
      const cycleLen = duration / cycles;
      for (let i = 0; i < cycles; i++) {
        const start = now + i * cycleLen;
        const mid = start + cycleLen * 0.45;
        const end = start + cycleLen;

        osc.frequency.setValueAtTime(420, start);
        osc.frequency.exponentialRampToValueAtTime(1280, mid);
        osc.frequency.exponentialRampToValueAtTime(420, end);

        osc2.frequency.setValueAtTime(430, start);
        osc2.frequency.exponentialRampToValueAtTime(1310, mid);
        osc2.frequency.exponentialRampToValueAtTime(430, end);
      }

      // Layer 3: Sub-bass visceral chest rumble (38Hz -> 58Hz)
      oscSub.frequency.setValueAtTime(55, now);
      oscSub.frequency.exponentialRampToValueAtTime(38, now + duration);

      // Layer 4: Emergency alert pulsing tone
      oscAlarm.frequency.setValueAtTime(880, now);
      oscAlarm.frequency.setValueAtTime(1760, now + 0.15);
      oscAlarm.frequency.setValueAtTime(880, now + 0.3);

      gain.gain.setValueAtTime(0.32, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      gain2.gain.setValueAtTime(0.18, now);
      gain2.gain.exponentialRampToValueAtTime(0.005, now + duration);

      gainSub.gain.setValueAtTime(0.38, now);
      gainSub.gain.exponentialRampToValueAtTime(0.01, now + duration);

      gainAlarm.gain.setValueAtTime(0.15, now);
      gainAlarm.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

      osc.start(now);
      osc.stop(now + duration);
      osc2.start(now);
      osc2.stop(now + duration);
      oscSub.start(now);
      oscSub.stop(now + duration);
      oscAlarm.start(now);
      oscAlarm.stop(now + 0.6);
    } else if (type === 'glitch') {
      // Realistic electrical hardware malfunction & static burst
      const noiseBuffer = ctx.createBuffer(1, ctx.sampleRate * 0.35, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < noiseBuffer.length; i++) {
        output[i] = Math.random() * 2 - 1;
      }
      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, now);
      filter.frequency.exponentialRampToValueAtTime(3500, now + 0.15);
      filter.frequency.exponentialRampToValueAtTime(400, now + 0.3);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.35, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      whiteNoise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      whiteNoise.start(now);
      whiteNoise.stop(now + 0.35);

      // Low pitch distortion pop
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.setValueAtTime(60, now + 0.08);
      osc.frequency.setValueAtTime(450, now + 0.18);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'scan') {
      // Frequency radar beam sweep
      osc.type = 'sine';
      osc.frequency.setValueAtTime(350, now);
      osc.frequency.exponentialRampToValueAtTime(1550, now + 0.18);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'beep') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(950, now);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.start(now);
      osc.stop(now + 0.07);
    }
  } catch {
    // Ignore audio errors silently
  }
}
