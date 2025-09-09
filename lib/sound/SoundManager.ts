import { Howl, Howler } from 'howler';

interface SoundConfig {
  src: string[];
  volume?: number;
  loop?: boolean;
  rate?: number;
}

class SoundManager {
  private sounds: Map<string, Howl> = new Map();
  private isEnabled: boolean = true;
  private globalVolume: number = 0.5;
  private rpmEngineSound?: Howl;
  private heartbeatSound?: Howl;
  private ambientLayers: Howl[] = [];

  constructor() {
    // Initialize Howler global settings
    Howler.volume(this.globalVolume);
    
    // Check if user has sound preference stored
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('soundEnabled');
      this.isEnabled = stored !== 'false';
    }
  }

  // Initialize all sounds
  async initialize() {
    // Ambient soundscape layers
    this.ambientLayers = [
      new Howl({
        src: ['/sounds/ambient/deep-space-hum.mp3'],
        loop: true,
        volume: 0.3,
        autoplay: false
      }),
      new Howl({
        src: ['/sounds/ambient/neural-activity.mp3'],
        loop: true,
        volume: 0.2,
        autoplay: false
      }),
      new Howl({
        src: ['/sounds/ambient/cosmic-wind.mp3'],
        loop: true,
        volume: 0.1,
        autoplay: false
      })
    ];

    // RPM Engine sound
    this.rpmEngineSound = new Howl({
      src: ['/sounds/effects/engine-hum.mp3'],
      loop: true,
      volume: 0.4,
      rate: 1.0, // Will be adjusted based on RPM
      autoplay: false
    });

    // Heartbeat sound
    this.heartbeatSound = new Howl({
      src: ['/sounds/effects/heartbeat.mp3'],
      loop: true,
      volume: 0.3,
      rate: 1.0, // Will be adjusted based on RPM
      autoplay: false
    });

    // UI interaction sounds
    this.sounds.set('hover', new Howl({
      src: ['/sounds/ui/hover.mp3'],
      volume: 0.1
    }));

    this.sounds.set('click', new Howl({
      src: ['/sounds/ui/click.mp3'],
      volume: 0.2
    }));

    this.sounds.set('magnetic-pull', new Howl({
      src: ['/sounds/ui/magnetic-hum.mp3'],
      volume: 0.05,
      loop: true
    }));

    this.sounds.set('particle-collision', new Howl({
      src: ['/sounds/effects/particle-collision.mp3'],
      volume: 0.05
    }));

    this.sounds.set('energy-discharge', new Howl({
      src: ['/sounds/effects/energy-discharge.mp3'],
      volume: 0.3
    }));

    this.sounds.set('neural-pulse', new Howl({
      src: ['/sounds/effects/neural-pulse.mp3'],
      volume: 0.2
    }));

    this.sounds.set('transition-whoosh', new Howl({
      src: ['/sounds/effects/transition-whoosh.mp3'],
      volume: 0.4
    }));

    this.sounds.set('calm-chime', new Howl({
      src: ['/sounds/effects/calm-chime.mp3'],
      volume: 0.5
    }));

    // Discovery/achievement sounds
    this.sounds.set('discovery', new Howl({
      src: ['/sounds/achievements/discovery.mp3'],
      volume: 0.6
    }));

    this.sounds.set('reset-complete', new Howl({
      src: ['/sounds/achievements/reset-complete.mp3'],
      volume: 0.7
    }));
  }

  // Start ambient soundscape
  startAmbience() {
    if (!this.isEnabled) return;
    
    this.ambientLayers.forEach((layer, index) => {
      // Stagger the start for a natural fade-in
      setTimeout(() => {
        layer.fade(0, layer.volume(), 2000);
        layer.play();
      }, index * 500);
    });
  }

  // Stop ambient soundscape
  stopAmbience() {
    this.ambientLayers.forEach(layer => {
      layer.fade(layer.volume(), 0, 1000);
      setTimeout(() => layer.stop(), 1000);
    });
  }

  // Update RPM-based sounds
  updateRPM(rpm: number) {
    if (!this.isEnabled) return;
    
    const rpmNormalized = rpm / 6000; // 0-1 range
    
    // Engine sound pitch adjustment (higher RPM = higher pitch)
    if (this.rpmEngineSound) {
      // Rate ranges from 0.5 (low pitch) to 2.0 (high pitch)
      const engineRate = 0.5 + (rpmNormalized * 1.5);
      this.rpmEngineSound.rate(engineRate);
      
      // Volume increases with RPM
      const engineVolume = 0.2 + (rpmNormalized * 0.4);
      this.rpmEngineSound.volume(engineVolume);
      
      if (!this.rpmEngineSound.playing()) {
        this.rpmEngineSound.play();
      }
    }
    
    // Heartbeat syncs with RPM (faster at high stress)
    if (this.heartbeatSound) {
      // Normal heart rate: 60-100 bpm = rate 1.0
      // Stressed: up to 180 bpm = rate 3.0
      const heartRate = 1.0 + (rpmNormalized * 2.0);
      this.heartbeatSound.rate(heartRate);
      
      // Heartbeat gets louder at extremes
      const heartVolume = rpm > 5000 || rpm < 1000 ? 0.4 : 0.2;
      this.heartbeatSound.volume(heartVolume);
      
      if (!this.heartbeatSound.playing() && (rpm > 5000 || rpm < 1000)) {
        this.heartbeatSound.play();
      } else if (this.heartbeatSound.playing() && rpm >= 1000 && rpm <= 5000) {
        this.heartbeatSound.fade(heartVolume, 0, 1000);
        setTimeout(() => this.heartbeatSound?.stop(), 1000);
      }
    }
    
    // Adjust ambient layers based on stress level
    this.ambientLayers.forEach((layer, index) => {
      const baseVolume = [0.3, 0.2, 0.1][index];
      // At high RPM, increase chaotic layers
      // At low RPM, increase calm layers
      let adjustedVolume = baseVolume;
      
      if (index === 0) { // Deep space hum (calm)
        adjustedVolume = baseVolume * (1 - rpmNormalized * 0.5);
      } else if (index === 1) { // Neural activity (medium)
        adjustedVolume = baseVolume * (0.5 + rpmNormalized * 0.5);
      } else { // Cosmic wind (chaotic)
        adjustedVolume = baseVolume * rpmNormalized;
      }
      
      layer.volume(adjustedVolume);
    });
  }

  // Play a named sound effect
  play(soundName: string, options?: { volume?: number; rate?: number }) {
    if (!this.isEnabled) return;
    
    const sound = this.sounds.get(soundName);
    if (sound) {
      if (options?.volume !== undefined) {
        sound.volume(options.volume);
      }
      if (options?.rate !== undefined) {
        sound.rate(options.rate);
      }
      sound.play();
    }
  }

  // Stop a specific sound
  stop(soundName: string) {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.stop();
    }
  }

  // Play particle collision sound with pitch based on velocity
  playParticleCollision(velocity: number) {
    if (!this.isEnabled) return;
    
    const normalizedVelocity = Math.min(velocity / 10, 1); // Normalize to 0-1
    this.play('particle-collision', {
      volume: 0.02 + normalizedVelocity * 0.08,
      rate: 0.8 + normalizedVelocity * 0.4
    });
  }

  // Play button magnetic effect
  playMagneticEffect(distance: number, maxDistance: number) {
    if (!this.isEnabled) return;
    
    const normalizedDistance = distance / maxDistance;
    const pitch = 2 - normalizedDistance; // Higher pitch when closer
    
    const magnetSound = this.sounds.get('magnetic-pull');
    if (magnetSound) {
      magnetSound.rate(pitch);
      magnetSound.volume(0.05 * (1 - normalizedDistance));
      
      if (!magnetSound.playing()) {
        magnetSound.play();
      }
    }
  }

  // Stop magnetic effect
  stopMagneticEffect() {
    this.stop('magnetic-pull');
  }

  // Toggle sound on/off
  toggleSound(): boolean {
    this.isEnabled = !this.isEnabled;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('soundEnabled', String(this.isEnabled));
    }
    
    if (!this.isEnabled) {
      this.stopAll();
    } else {
      this.startAmbience();
    }
    
    return this.isEnabled;
  }

  // Set global volume
  setGlobalVolume(volume: number) {
    this.globalVolume = Math.max(0, Math.min(1, volume));
    Howler.volume(this.globalVolume);
  }

  // Stop all sounds
  stopAll() {
    this.sounds.forEach(sound => sound.stop());
    this.ambientLayers.forEach(layer => layer.stop());
    this.rpmEngineSound?.stop();
    this.heartbeatSound?.stop();
  }

  // Cleanup
  destroy() {
    this.stopAll();
    this.sounds.forEach(sound => sound.unload());
    this.ambientLayers.forEach(layer => layer.unload());
    this.rpmEngineSound?.unload();
    this.heartbeatSound?.unload();
    this.sounds.clear();
  }
}

// Export singleton instance
export const soundManager = new SoundManager();

// Export types for TypeScript
export type { SoundConfig };