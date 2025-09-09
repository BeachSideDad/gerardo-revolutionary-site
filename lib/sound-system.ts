'use client';

interface SoundConfig {
  url?: string;
  frequency?: number;
  duration?: number;
  volume?: number;
  type?: OscillatorType;
}

class SoundSystem {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();
  private enabled: boolean = true;
  private ambientNodes: Map<string, OscillatorNode> = new Map();
  
  constructor() {
    if (typeof window !== 'undefined') {
      this.init();
    }
  }
  
  private init() {
    // Initialize audio context on first user interaction
    const initContext = () => {
      if (!this.audioContext) {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.masterGain = this.audioContext.createGain();
        this.masterGain.connect(this.audioContext.destination);
        this.masterGain.gain.value = 0.3; // Master volume
        
        // Start ambient sounds
        this.startAmbientLayer();
        
        // Remove listener after init
        window.removeEventListener('click', initContext);
        window.removeEventListener('touchstart', initContext);
      }
    };
    
    window.addEventListener('click', initContext);
    window.addEventListener('touchstart', initContext);
    
    // Register sound event listeners
    this.registerEventListeners();
  }
  
  private registerEventListeners() {
    // Big Bang
    window.addEventListener('sound:bigBang', () => {
      this.playBigBang();
    });
    
    // Neural Pulse
    window.addEventListener('sound:pulse', ((e: CustomEvent) => {
      this.playPulse(e.detail?.type || 'auto');
    }) as EventListener);
    
    // Particle sparks
    window.addEventListener('sound:spark', () => {
      this.playSpark();
    });
    
    // Vortex sounds
    window.addEventListener('sound:vortex:start', () => {
      this.playVortexStart();
    });
    
    window.addEventListener('sound:vortex:end', () => {
      this.playVortexEnd();
    });
    
    // Impact sounds
    window.addEventListener('sound:impact:heavy', () => {
      this.playImpact('heavy');
    });
    
    // Hover sounds
    window.addEventListener('sound:hover', () => {
      this.playHover();
    });
  }
  
  private startAmbientLayer() {
    if (!this.audioContext || !this.masterGain) return;
    
    // Neural hum (40-60Hz)
    const createHum = () => {
      const oscillator = this.audioContext!.createOscillator();
      const gainNode = this.audioContext!.createGain();
      
      oscillator.type = 'sine';
      oscillator.frequency.value = 50;
      gainNode.gain.value = 0.02; // Very subtle
      
      // Add slight frequency modulation
      const lfo = this.audioContext!.createOscillator();
      const lfoGain = this.audioContext!.createGain();
      lfo.frequency.value = 0.2; // Slow modulation
      lfoGain.gain.value = 5; // ±5Hz variation
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain!);
      
      oscillator.start();
      lfo.start();
      
      this.ambientNodes.set('hum', oscillator);
      this.ambientNodes.set('humLfo', lfo);
    };
    
    createHum();
  }
  
  private playBigBang() {
    if (!this.audioContext || !this.masterGain) return;
    
    const now = this.audioContext.currentTime;
    
    // Deep explosion (80Hz + harmonics)
    const explosion = this.audioContext.createOscillator();
    const explosionGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    explosion.type = 'sawtooth';
    explosion.frequency.value = 80;
    
    filter.type = 'lowpass';
    filter.frequency.value = 2000;
    filter.Q.value = 2;
    
    explosionGain.gain.setValueAtTime(0.5, now);
    explosionGain.gain.exponentialRampToValueAtTime(0.01, now + 2);
    
    explosion.connect(filter);
    filter.connect(explosionGain);
    explosionGain.connect(this.masterGain);
    
    explosion.start(now);
    explosion.stop(now + 2);
    
    // High frequency scatter
    const scatter = this.audioContext.createOscillator();
    const scatterGain = this.audioContext.createGain();
    
    scatter.type = 'square';
    scatter.frequency.setValueAtTime(4000, now);
    scatter.frequency.exponentialRampToValueAtTime(200, now + 1.5);
    
    scatterGain.gain.setValueAtTime(0.1, now);
    scatterGain.gain.exponentialRampToValueAtTime(0.01, now + 1.5);
    
    scatter.connect(scatterGain);
    scatterGain.connect(this.masterGain);
    
    scatter.start(now);
    scatter.stop(now + 1.5);
  }
  
  private playPulse(type: string) {
    if (!this.audioContext || !this.masterGain) return;
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    // Different pulse types
    switch (type) {
      case 'success':
        oscillator.frequency.value = 523.25; // C5
        break;
      case 'error':
        oscillator.frequency.value = 233.08; // Bb3
        break;
      default:
        oscillator.frequency.value = 440; // A4
    }
    
    oscillator.type = 'sine';
    
    // Pulse envelope
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.2, now + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.start(now);
    oscillator.stop(now + 0.2);
  }
  
  private playSpark() {
    if (!this.audioContext || !this.masterGain) return;
    
    const now = this.audioContext.currentTime;
    
    // Create noise for sparkle
    const bufferSize = this.audioContext.sampleRate * 0.05; // 50ms
    const buffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const noise = this.audioContext.createBufferSource();
    const filter = this.audioContext.createBiquadFilter();
    const gainNode = this.audioContext.createGain();
    
    noise.buffer = buffer;
    
    filter.type = 'highpass';
    filter.frequency.value = 8000; // High frequency sparkle
    
    gainNode.gain.setValueAtTime(0.05, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    
    noise.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    noise.start(now);
  }
  
  private playVortexStart() {
    if (!this.audioContext || !this.masterGain) return;
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(100, now);
    oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.3);
    
    filter.type = 'lowpass';
    filter.frequency.value = 500;
    filter.Q.value = 5;
    
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(0.1, now + 0.1);
    
    oscillator.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.start(now);
    
    // Store for later stop
    this.ambientNodes.set('vortex', oscillator);
  }
  
  private playVortexEnd() {
    const vortex = this.ambientNodes.get('vortex');
    if (vortex && this.audioContext) {
      const now = this.audioContext.currentTime;
      vortex.stop(now + 0.2);
      this.ambientNodes.delete('vortex');
    }
  }
  
  private playImpact(style: 'light' | 'medium' | 'heavy') {
    if (!this.audioContext || !this.masterGain) return;
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    
    switch (style) {
      case 'light':
        oscillator.frequency.value = 200;
        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        oscillator.stop(now + 0.1);
        break;
      case 'medium':
        oscillator.frequency.value = 150;
        gainNode.gain.setValueAtTime(0.3, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        oscillator.stop(now + 0.15);
        break;
      case 'heavy':
        oscillator.frequency.value = 80;
        gainNode.gain.setValueAtTime(0.4, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        
        // Add sub-bass
        const sub = this.audioContext.createOscillator();
        sub.type = 'sine';
        sub.frequency.value = 40;
        sub.connect(gainNode);
        sub.start(now);
        sub.stop(now + 0.3);
        
        oscillator.stop(now + 0.3);
        break;
    }
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    oscillator.start(now);
  }
  
  private playHover() {
    if (!this.audioContext || !this.masterGain) return;
    
    const now = this.audioContext.currentTime;
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(2000, now);
    oscillator.frequency.exponentialRampToValueAtTime(4000, now + 0.1);
    
    gainNode.gain.setValueAtTime(0.02, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    
    oscillator.connect(gainNode);
    gainNode.connect(this.masterGain);
    
    oscillator.start(now);
    oscillator.stop(now + 0.1);
  }
  
  public setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (this.masterGain) {
      this.masterGain.gain.value = enabled ? 0.3 : 0;
    }
  }
  
  public setVolume(volume: number) {
    if (this.masterGain) {
      this.masterGain.gain.value = Math.max(0, Math.min(1, volume));
    }
  }
}

// Export singleton instance
export const soundSystem = typeof window !== 'undefined' ? new SoundSystem() : null;