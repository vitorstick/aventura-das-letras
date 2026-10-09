// Motor de Áudio e Voz em Português de Portugal (pt-PT)
declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext;
  }
}

class SoundEngine {
  private ctx: AudioContext | null = null;
  public soundEnabled: boolean = true;
  public speechEnabled: boolean = true;
  private ptVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.initVoices();
  }

  unlockAudio(): void {
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

  initVoices(): void {
    if ('speechSynthesis' in window) {
      const load = () => {
        const voices = window.speechSynthesis.getVoices();

        // Procurar estritamente vozes de Português de Portugal (pt-PT)
        // EXCLUIR rigorosamente qualquer voz do Brasil (pt-BR, brasil, brazil)
        const isStrictlyPtPt = (v: SpeechSynthesisVoice): boolean => {
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

        const ptVoices = voices.filter(isStrictlyPtPt);

        // Priorizar vozes Naturais / Neurais / Online de alta fidelidade
        const getVoiceScore = (v: SpeechSynthesisVoice): number => {
          const name = (v.name || '').toLowerCase();
          let score = 0;
          if (name.includes('natural') || name.includes('neural')) score += 100;
          if (name.includes('raquel') || name.includes('duarte')) score += 50; // Vozes neurais pt-PT do Edge/Windows
          if (name.includes('online')) score += 30;
          if (name.includes('google')) score += 20;
          if (v.localService === false) score += 10;
          return score;
        };

        ptVoices.sort((a, b) => getVoiceScore(b) - getVoiceScore(a));

        if (ptVoices.length > 0) {
          this.ptVoice = ptVoices[0];
          console.log(`[SoundEngine] Voz pt-PT selecionada: "${this.ptVoice.name}" (${this.ptVoice.lang})`);
        } else {
          this.ptVoice = null;
        }
      };

      load();
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = load;
      }
    }
  }

  hasPtPtVoice(): boolean {
    return this.ptVoice !== null;
  }

  toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    this.speechEnabled = this.soundEnabled;
    return this.soundEnabled;
  }

  speak(text: string, onEnd: (() => void) | null = null): void {
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
      utterance.rate = 0.95; // ritmo natural e fluído
      utterance.pitch = 1.0; // pitch 1.0 (evita o processamento DSP que cria o efeito metálico/robótico)

      // Atribuir a melhor voz pt-PT disponível (priorizando Natural/Neural)
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

  playPop(): void {
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

  playStar(): void {
    if (!this.soundEnabled) return;
    this.unlockAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const notes = [659.25, 880, 1318.5]; // E5, A5, E6
    notes.forEach((freq, idx) => {
      if (!this.ctx) return;
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

  playSuccess(): void {
    if (!this.soundEnabled) return;
    this.unlockAudio();
    if (!this.ctx) return;

    const t = this.ctx.currentTime;
    const chord = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    chord.forEach((freq, idx) => {
      if (!this.ctx) return;
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

  playDinoHappy(): void {
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

  playTryAgain(): void {
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

  playWinFanfare(): void {
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
      if (!this.ctx) return;
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
