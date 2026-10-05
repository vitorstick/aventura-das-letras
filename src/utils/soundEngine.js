// Motor de Áudio e Voz em Português de Portugal (pt-PT)
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.speechEnabled = true;
    this.ptVoice = null;
    this.initVoices();
  }

  unlockAudio() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    this.initVoices();
  }

  initVoices() {
    if ('speechSynthesis' in window) {
      const load = () => {
        const voices = window.speechSynthesis.getVoices();
        
        // Procurar estritamente vozes de Português de Portugal (pt-PT)
        // EXCLUIR rigorosamente qualquer voz do Brasil (pt-BR, brasil, brazil)
        const isStrictlyPtPt = (v) => {
          const lang = (v.lang || '').toLowerCase().replace('_', '-');
          const name = (v.name || '').toLowerCase();
          
          const isBrazilian = lang.includes('br') || name.includes('brasil') || name.includes('brazil');
          if (isBrazilian) return false;

          return (
            lang === 'pt-pt' ||
            lang.startsWith('pt-pt') ||
            lang === 'por-prt' ||
            name.includes('portugal') ||
            name.includes('pt-pt') ||
            name.includes('portuguese (portugal)')
          );
        };

        this.ptVoice = voices.find(isStrictlyPtPt) || null;
      };

      load();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = load;
      }
    }
  }

  hasPtPtVoice() {
    return this.ptVoice !== null;
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    this.speechEnabled = this.soundEnabled;
    return this.soundEnabled;
  }

  speak(text, onEnd = null) {
    if (!this.speechEnabled || !('speechSynthesis' in window)) {
      if (onEnd) setTimeout(onEnd, 800);
      return;
    }

    if (!this.ptVoice) {
      this.initVoices();
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'pt-PT';
      utterance.rate = 0.88; // ritmo pausado para crianças
      utterance.pitch = 1.15; // tom amigável

      // Apenas atribuir a voz se for estritamente uma voz de Portugal (pt-PT).
      // Se não houver voz local pt-PT, deixamos utterance.voice livre para que o navegador
      // utilize o serviço online pt-PT do Google/Android em vez de forçar a voz brasileira!
      if (this.ptVoice) {
        utterance.voice = this.ptVoice;
      }
      if (onEnd) {
        utterance.onend = () => onEnd();
        utterance.onerror = () => onEnd();
      }
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn("Fala não suportada ou bloqueada:", e);
      if (onEnd) setTimeout(onEnd, 500);
    }
  }

  playPop() {
    if (!this.soundEnabled) return;
    this.unlockAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, t);
    osc.frequency.exponentialRampToValueAtTime(850, t + 0.05);
    osc.frequency.exponentialRampToValueAtTime(150, t + 0.12);

    gain.gain.setValueAtTime(0.6, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.12);
  }

  playStar() {
    if (!this.soundEnabled) return;
    this.unlockAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [659.25, 880, 1318.5]; // E5, A5, E6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const startTime = t + idx * 0.07;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.3, startTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  }

  playSuccess() {
    if (!this.soundEnabled) return;
    this.unlockAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chord.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const noteTime = t + idx * 0.09;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, noteTime);

      gain.gain.setValueAtTime(0, noteTime);
      gain.gain.linearRampToValueAtTime(0.35, noteTime + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.4);
    });
  }

  playDinoHappy() {
    if (!this.soundEnabled) return;
    this.unlockAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(260, t);
    osc.frequency.exponentialRampToValueAtTime(520, t + 0.09);
    osc.frequency.exponentialRampToValueAtTime(380, t + 0.18);
    osc.frequency.exponentialRampToValueAtTime(600, t + 0.28);

    gain.gain.setValueAtTime(0.35, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.3);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.3);
  }

  playTryAgain() {
    if (!this.soundEnabled) return;
    this.unlockAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(220, t);
    osc.frequency.exponentialRampToValueAtTime(140, t + 0.25);

    gain.gain.setValueAtTime(0.25, t);
    gain.gain.exponentialRampToValueAtTime(0.01, t + 0.28);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.28);
  }

  playWinFanfare() {
    if (!this.soundEnabled) return;
    this.unlockAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const melody = [
      { f: 523.25, d: 0.15, offset: 0 },
      { f: 659.25, d: 0.15, offset: 0.15 },
      { f: 783.99, d: 0.15, offset: 0.30 },
      { f: 1046.50, d: 0.5, offset: 0.45 }
    ];

    melody.forEach(item => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const start = t + item.offset;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(item.f, start);

      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.4, start + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, start + item.d);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(start);
      osc.stop(start + item.d);
    });
  }
}

export const sounds = new SoundEngine();
