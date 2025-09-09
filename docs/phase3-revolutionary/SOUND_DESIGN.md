# 🔊 SOUND DESIGN - Audio Integration Map
## Immersive Soundscape for Revolutionary TMJ Experience

---

## 🎵 AUDIO ARCHITECTURE

### Core Audio System
```typescript
interface AudioSystem {
  engine: "Howler.js" | "Tone.js" | "Web Audio API",
  layers: {
    ambient: AudioLayer,
    interactive: AudioLayer,
    effects: AudioLayer,
    voice: AudioLayer,
    haptic: AudioLayer // mobile only
  },
  mixing: {
    masterVolume: 0.8,
    dynamicRange: "adaptive",
    spatialAudio: true,
    binaural: true
  }
}
```

---

## 🌊 AMBIENT SOUNDSCAPE

### Background Layers
```typescript
interface AmbientSounds {
  layer1_space: {
    file: "deep_space_ambience.mp3",
    properties: {
      volume: 0.3,
      loop: true,
      fadeIn: 2000,
      fadeOut: 3000,
      frequency: "constant"
    },
    description: "Deep, cosmic hum - the void of space",
    mood: "mysterious, vast",
    processing: {
      reverb: { room: 0.8, wet: 0.3 },
      lowpass: { frequency: 2000 }
    }
  },
  
  layer2_neural: {
    file: "neural_activity.mp3",
    properties: {
      volume: "rpm_dependent", // 0.1 to 0.6
      loop: true,
      pitch: "rpm_mapped", // varies with stress level
      crossfade: true
    },
    description: "Electrical synapses firing, brain activity",
    variations: [
      { rpm: 6000, file: "neural_chaos.mp3", pitch: 1.5 },
      { rpm: 3000, file: "neural_active.mp3", pitch: 1.0 },
      { rpm: 800, file: "neural_calm.mp3", pitch: 0.8 }
    ],
    processing: {
      delay: { time: 100, feedback: 0.2, wet: 0.1 },
      chorus: { rate: 0.5, depth: 0.2 }
    }
  },
  
  layer3_heartbeat: {
    file: "heartbeat_loop.mp3",
    properties: {
      volume: 0.5,
      loop: true,
      tempo: "rpm_synchronized", // BPM matches RPM/100
      adaptive: true
    },
    description: "User's heartbeat, slowing with RPM decrease",
    tempo_mapping: {
      formula: "rpm / 50", // 6000 RPM = 120 BPM, 800 RPM = 16 BPM
      min_bpm: 40,
      max_bpm: 120,
      smoothing: 0.2 // lerp factor
    },
    processing: {
      compressor: { threshold: -12, ratio: 4 },
      eq: { low: +3, mid: 0, high: -6 }
    }
  },
  
  layer4_breath: {
    file: "breathing_cycle.mp3",
    properties: {
      volume: 0.2,
      loop: true,
      sync: "heartbeat_layer",
      ratio: 0.25 // 1 breath per 4 heartbeats
    },
    description: "Calm breathing sounds, guides user's breath",
    variations: [
      { state: "stressed", file: "breath_shallow.mp3" },
      { state: "transitioning", file: "breath_deep.mp3" },
      { state: "calm", file: "breath_ocean.mp3" }
    ]
  }
}
```

### Environmental Effects
```typescript
interface EnvironmentalAudio {
  particle_ambience: {
    type: "generative",
    source: "particle_density",
    sounds: {
      sparse: "space_whispers.mp3",
      medium: "cosmic_chimes.mp3",
      dense: "particle_storm.mp3"
    },
    properties: {
      volume: "particle_count / 10000",
      panning: "3d_positioned",
      doppler: true
    }
  },
  
  neural_hum: {
    type: "synthesized",
    waveform: "sine + noise",
    frequency: {
      base: 80, // Hz
      modulation: "rpm * 0.01",
      harmonics: [2, 3, 5, 7]
    },
    properties: {
      volume: 0.15,
      continuous: true,
      filter: {
        type: "bandpass",
        frequency: "200-2000",
        resonance: 0.5
      }
    }
  }
}
```

---

## 🎯 INTERACTIVE SOUNDS

### Button Interactions
```typescript
interface ButtonSounds {
  magnetic_hover: {
    trigger: "mouseenter",
    sounds: {
      enter: "magnetic_engage.mp3",
      sustained: "magnetic_hum.mp3",
      leave: "magnetic_release.mp3"
    },
    properties: {
      enter: {
        volume: 0.2,
        pitch: "distance_based", // closer = higher pitch
        duration: 200
      },
      sustained: {
        volume: 0.1,
        loop: true,
        pitch_range: [0.8, 1.2],
        modulation: "sine_wave"
      },
      leave: {
        volume: 0.15,
        pitch: 0.9,
        duration: 300
      }
    }
  },
  
  click: {
    trigger: "click",
    sounds: {
      primary: "energy_pulse.mp3",
      secondary: "soft_click.mp3",
      special: "quantum_click.mp3"
    },
    properties: {
      volume: 0.3,
      pitch_variance: 0.1, // random variation
      reverb: { room: 0.2, wet: 0.1 }
    },
    particle_sync: {
      enabled: true,
      sound_per_particle: "particle_spawn.mp3",
      max_simultaneous: 10,
      volume_per_particle: 0.01
    }
  },
  
  drag: {
    trigger: "drag",
    sound: "friction_loop.mp3",
    properties: {
      volume: "velocity_based", // 0.1 to 0.4
      pitch: "velocity_based", // 0.8 to 1.2
      loop: true,
      filter: {
        type: "lowpass",
        frequency: "velocity * 1000 + 500"
      }
    }
  }
}
```

### RPM Visualizer Audio
```typescript
interface RPMSounds {
  engine_sound: {
    base: "engine_idle.mp3",
    layers: [
      { rpm_range: [5000, 6000], file: "engine_redline.mp3" },
      { rpm_range: [3000, 5000], file: "engine_high.mp3" },
      { rpm_range: [1500, 3000], file: "engine_medium.mp3" },
      { rpm_range: [800, 1500], file: "engine_low.mp3" }
    ],
    properties: {
      volume: "rpm / 10000", // 0.08 to 0.6
      pitch: "rpm / 4000", // 0.2 to 1.5
      distortion: {
        enabled: "rpm > 5000",
        amount: "(rpm - 5000) / 1000"
      },
      lowpass: {
        frequency: "rpm * 2", // Hz
        resonance: "rpm / 6000"
      }
    },
    crossfade: {
      duration: 500,
      curve: "exponential"
    }
  },
  
  rpm_milestones: {
    sounds: [
      { rpm: 6000, sound: "stress_peak.mp3", volume: 0.5 },
      { rpm: 4500, sound: "threshold_high.mp3", volume: 0.3 },
      { rpm: 3000, sound: "midpoint_chime.mp3", volume: 0.3 },
      { rpm: 1500, sound: "approaching_calm.mp3", volume: 0.4 },
      { rpm: 800, sound: "achievement_calm.mp3", volume: 0.6 }
    ],
    properties: {
      ducking: true, // lower other sounds briefly
      priority: "high"
    }
  },
  
  stress_indicators: {
    high_stress: {
      rpm_threshold: 5000,
      sound: "warning_pulse.mp3",
      properties: {
        volume: 0.3,
        interval: 2000, // ms
        pitch: 1.2
      }
    },
    medium_stress: {
      rpm_threshold: 3000,
      sound: "tension_tone.mp3",
      properties: {
        volume: 0.2,
        continuous: true,
        tremolo: { rate: 4, depth: 0.3 }
      }
    }
  }
}
```

### Particle System Audio
```typescript
interface ParticleSounds {
  collision: {
    trigger: "particle_collision",
    sounds: [
      "particle_hit_1.mp3",
      "particle_hit_2.mp3",
      "particle_hit_3.mp3"
    ],
    properties: {
      volume: 0.05, // per collision
      pitch: "random(0.9, 1.1)",
      max_simultaneous: 20,
      pooling: true,
      spatial: true
    }
  },
  
  connection_form: {
    trigger: "neural_connection",
    sound: "synapse_connect.mp3",
    properties: {
      volume: 0.15,
      pitch: "distance_based",
      pan: "3d_position",
      reverb: { room: 0.3, wet: 0.2 }
    }
  },
  
  particle_burst: {
    trigger: "burst_event",
    sound: "particle_explosion.mp3",
    properties: {
      volume: 0.4,
      pitch: 1.0,
      doppler: true,
      falloff: "exponential"
    },
    cascade: {
      enabled: true,
      delay: 50, // ms between cascade sounds
      volume_decay: 0.8
    }
  },
  
  swarm_movement: {
    type: "generative",
    density_based: true,
    properties: {
      low_density: { sound: "whisper_swarm.mp3", volume: 0.1 },
      medium_density: { sound: "buzzing_swarm.mp3", volume: 0.2 },
      high_density: { sound: "roaring_swarm.mp3", volume: 0.3 }
    }
  }
}
```

---

## 🤖 AI INTERFACE AUDIO

### Conversation Sounds
```typescript
interface AISounds {
  activation: {
    trigger: "ai_activate",
    sound: "ai_wake.mp3",
    properties: {
      volume: 0.4,
      pitch: 1.0,
      reverb: { room: 0.5, wet: 0.3 }
    },
    sequence: [
      { time: 0, sound: "power_up.mp3" },
      { time: 300, sound: "systems_online.mp3" },
      { time: 600, sound: "ready_chime.mp3" }
    ]
  },
  
  thinking: {
    trigger: "ai_processing",
    layers: {
      base: "neural_processing.mp3",
      overlay: "data_stream.mp3",
      accent: "synapse_firing.mp3"
    },
    properties: {
      volume: 0.2,
      loop: true,
      pitch_modulation: {
        rate: 0.5,
        depth: 0.1
      },
      filter_sweep: {
        min: 200,
        max: 4000,
        rate: 2 // Hz
      }
    }
  },
  
  typing: {
    trigger: "character_appear",
    sounds: [
      "type_1.mp3",
      "type_2.mp3",
      "type_3.mp3",
      "type_4.mp3"
    ],
    properties: {
      volume: 0.05,
      pitch: "random(0.95, 1.05)",
      rate_limit: 50 // ms minimum between sounds
    }
  },
  
  discovery: {
    trigger: "pattern_found",
    sound: "eureka_moment.mp3",
    properties: {
      volume: 0.5,
      pitch: 1.0,
      shimmer: {
        enabled: true,
        harmonics: [2, 3, 5],
        decay: 2000
      }
    }
  },
  
  page_generation: {
    trigger: "content_build",
    phases: [
      { event: "framework", sound: "structure_form.mp3" },
      { event: "content", sound: "data_materialize.mp3" },
      { event: "complete", sound: "generation_complete.mp3" }
    ],
    properties: {
      volume: 0.3,
      spatial: true,
      doppler: true
    }
  }
}
```

---

## 📱 MOBILE HAPTIC AUDIO

### Haptic Patterns
```typescript
interface HapticPatterns {
  light_tap: {
    audio: "haptic_light.mp3",
    vibration: {
      pattern: [10],
      intensity: 0.3
    }
  },
  
  medium_click: {
    audio: "haptic_medium.mp3",
    vibration: {
      pattern: [20],
      intensity: 0.6
    }
  },
  
  heavy_impact: {
    audio: "haptic_heavy.mp3",
    vibration: {
      pattern: [30],
      intensity: 1.0
    }
  },
  
  success_pattern: {
    audio: "haptic_success.mp3",
    vibration: {
      pattern: [30, 50, 30, 50, 60],
      intensity: [0.5, 0, 0.7, 0, 1.0]
    }
  },
  
  warning_pulse: {
    audio: "haptic_warning.mp3",
    vibration: {
      pattern: [100, 100, 100],
      intensity: 0.8,
      repeat: 2
    }
  },
  
  continuous_drag: {
    audio: "haptic_friction.mp3",
    vibration: {
      continuous: true,
      intensity: "velocity_based",
      frequency: 200 // Hz
    }
  }
}
```

---

## 🎼 DYNAMIC MUSIC SYSTEM

### Adaptive Soundtrack
```typescript
interface DynamicMusic {
  stems: {
    drums: {
      files: {
        chaos: "drums_chaos.mp3",
        tense: "drums_tense.mp3",
        steady: "drums_steady.mp3",
        calm: "drums_calm.mp3"
      },
      volume: "rpm_mapped",
      crossfade: true
    },
    
    bass: {
      files: {
        deep: "bass_deep.mp3",
        pulsing: "bass_pulse.mp3",
        flowing: "bass_flow.mp3"
      },
      volume: 0.4,
      filter: "rpm_dependent"
    },
    
    melody: {
      files: {
        anxious: "melody_anxious.mp3",
        searching: "melody_search.mp3",
        hopeful: "melody_hope.mp3",
        peaceful: "melody_peace.mp3"
      },
      volume: "inverse_rpm", // louder as calm increases
      delay: { time: 500, feedback: 0.3, wet: 0.2 }
    },
    
    atmosphere: {
      files: {
        tense: "atmos_tense.mp3",
        neutral: "atmos_neutral.mp3",
        serene: "atmos_serene.mp3"
      },
      volume: 0.3,
      reverb: { room: 0.7, wet: 0.5 }
    }
  },
  
  transitions: {
    rules: [
      { from: "chaos", to: "tense", trigger: "rpm < 5000", duration: 3000 },
      { from: "tense", to: "steady", trigger: "rpm < 3000", duration: 4000 },
      { from: "steady", to: "calm", trigger: "rpm < 1500", duration: 5000 }
    ],
    method: "crossfade",
    sync: "beat_matched"
  },
  
  intensity_mapping: {
    formula: "rpm / 6000",
    layers_active: {
      high: ["drums", "bass", "atmosphere"],
      medium: ["drums", "bass", "melody", "atmosphere"],
      low: ["bass", "melody", "atmosphere"]
    }
  }
}
```

---

## 🎭 TRANSITION SOUNDS

### Page Transitions
```typescript
interface TransitionSounds {
  liquid_morph: {
    phases: [
      { time: 0, sound: "liquid_start.mp3", volume: 0.3 },
      { time: 400, sound: "liquid_flow.mp3", volume: 0.4 },
      { time: 800, sound: "liquid_settle.mp3", volume: 0.3 }
    ],
    properties: {
      pitch_bend: { from: 1.0, to: 0.8, back: 1.0 },
      filter_sweep: true,
      reverb: { room: 0.6, wet: 0.4 }
    }
  },
  
  particle_scatter: {
    sound: "particles_disperse.mp3",
    properties: {
      volume: 0.4,
      pitch: 1.2,
      pan: "random_3d",
      doppler: true
    }
  },
  
  dimension_shift: {
    sound: "reality_warp.mp3",
    properties: {
      volume: 0.5,
      pitch_shift: { from: 1.0, to: 0.5, duration: 1000 },
      phaser: { rate: 0.5, depth: 0.7, feedback: 0.5 }
    }
  }
}
```

---

## 🔧 AUDIO PROCESSING

### Effects Chain
```typescript
interface AudioProcessing {
  master_chain: [
    {
      type: "compressor",
      settings: {
        threshold: -24,
        knee: 10,
        ratio: 3,
        attack: 0.003,
        release: 0.1
      }
    },
    {
      type: "eq",
      settings: {
        highpass: 20, // Hz
        lowshelf: { freq: 200, gain: 2 },
        mid: { freq: 2000, q: 0.7, gain: 1 },
        highshelf: { freq: 8000, gain: -1 }
      }
    },
    {
      type: "limiter",
      settings: {
        threshold: -0.5,
        release: 0.05
      }
    }
  ],
  
  spatial_processing: {
    enabled: true,
    type: "binaural",
    hrtf: "default",
    room_simulation: {
      size: "large",
      materials: "soft",
      reverb_time: 1.2
    }
  },
  
  adaptive_mixing: {
    enabled: true,
    rules: [
      {
        condition: "user_speaking",
        action: "duck_background",
        amount: -6 // dB
      },
      {
        condition: "important_event",
        action: "focus_effect",
        duck_others: -3
      }
    ]
  }
}
```

---

## 📊 AUDIO IMPLEMENTATION

### File Organization
```typescript
interface AudioAssets {
  structure: {
    "/audio": {
      "/ambient": ["space", "neural", "breathing"],
      "/effects": ["clicks", "hovers", "transitions"],
      "/music": ["stems", "loops", "one-shots"],
      "/voice": ["ai", "narration", "guidance"],
      "/haptic": ["mobile", "feedback"]
    }
  },
  
  formats: {
    primary: "mp3", // for compatibility
    fallback: "ogg",
    quality: {
      ambient: "128kbps",
      effects: "96kbps",
      music: "192kbps",
      voice: "128kbps"
    }
  },
  
  loading_strategy: {
    preload: ["essential_ui", "rpm_engine", "ambient_base"],
    lazy: ["music_stems", "ai_voice", "complex_effects"],
    stream: ["long_ambient", "background_music"]
  }
}
```

### Performance Optimization
```typescript
interface AudioOptimization {
  pooling: {
    enabled: true,
    pool_sizes: {
      ui_effects: 20,
      particles: 50,
      ambient: 5
    }
  },
  
  compression: {
    format: "mp3",
    bitrate: "variable",
    optimize_for: "web"
  },
  
  memory_management: {
    max_cached: 50, // MB
    cleanup_interval: 60000, // ms
    priority_levels: ["essential", "frequent", "occasional", "rare"]
  },
  
  performance_modes: {
    high: {
      all_layers: true,
      effects: "full",
      spatial: true
    },
    medium: {
      reduce_layers: 1,
      effects: "basic",
      spatial: false
    },
    low: {
      minimal_audio: true,
      effects: "essential_only",
      spatial: false
    }
  }
}
```

---

## 🎚️ MIXING GUIDELINES

### Volume Levels
```typescript
const mixingLevels = {
  master: 0.8,
  categories: {
    ambient: 0.3, // background presence
    ui: 0.4, // clear feedback
    effects: 0.5, // noticeable impact
    voice: 0.7, // priority clarity
    music: 0.4 // supportive, not dominant
  },
  
  ducking: {
    voice_speaking: { duck_all: -6 },
    important_event: { duck_ambient: -3 },
    error_sound: { duck_all: -4 }
  },
  
  dynamics: {
    quiet_moments: 0.2, // minimum presence
    normal: 0.5,
    intense: 0.8,
    peak: 1.0 // special moments only
  }
};
```

### Frequency Spectrum
```typescript
const frequencyAllocation = {
  sub_bass: { range: "20-60Hz", elements: ["rpm_engine_low", "impact"] },
  bass: { range: "60-250Hz", elements: ["heartbeat", "bass_music"] },
  low_mid: { range: "250-500Hz", elements: ["ambient_hum", "warmth"] },
  mid: { range: "500-2kHz", elements: ["voice", "melody", "ui_feedback"] },
  high_mid: { range: "2-6kHz", elements: ["clarity", "presence", "particles"] },
  high: { range: "6-20kHz", elements: ["air", "sparkle", "neural_activity"] }
};
```

---

## 🎯 ACCESSIBILITY AUDIO

### Audio Accessibility
```typescript
interface AccessibleAudio {
  options: {
    mute_all: boolean,
    reduce_effects: boolean,
    voice_only: boolean,
    visual_indicators: boolean,
    captions: boolean
  },
  
  screen_reader: {
    compatible: true,
    audio_descriptions: true,
    pause_on_speak: true
  },
  
  alternatives: {
    visual_feedback: "for_all_audio_cues",
    haptic_feedback: "mobile_only",
    text_descriptions: "available"
  }
}
```

---

## 📋 AUDIO CHECKLIST

### Implementation Priorities
1. **Phase 1**: Core UI feedback sounds
2. **Phase 2**: RPM engine and ambient layers
3. **Phase 3**: Particle system audio
4. **Phase 4**: AI interface sounds
5. **Phase 5**: Dynamic music system
6. **Phase 6**: Polish and optimization

### Quality Assurance
- [ ] All sounds normalized to -3dB peak
- [ ] No clipping or distortion
- [ ] Smooth crossfades between states
- [ ] Mobile performance optimized
- [ ] Accessibility options working
- [ ] Memory usage under control
- [ ] Loading times acceptable

---

This comprehensive sound design document provides the complete audio blueprint for creating an immersive, responsive, and award-worthy soundscape for the revolutionary TMJ website.