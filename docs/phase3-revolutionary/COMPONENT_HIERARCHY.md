# 🏗️ COMPONENT HIERARCHY - UI Architecture
## Structured Component System for Revolutionary TMJ Experience

---

## 🎯 ROOT ARCHITECTURE

```typescript
interface RootStructure {
  App: {
    providers: [
      "ThemeProvider",
      "AnimationProvider", 
      "AudioProvider",
      "RPMProvider",
      "ParticleSystemProvider",
      "AIConversationProvider"
    ],
    layout: "FluidContainer",
    children: [
      "BackgroundLayers",
      "MainContent",
      "OverlayElements",
      "ModalLayer"
    ]
  }
}
```

---

## 🌌 BACKGROUND LAYER COMPONENTS

### Layer 0: Deep Space (-1000z)
```typescript
interface BackgroundComponents {
  StarField: {
    props: {
      count: number,
      depth: number,
      parallaxSpeed: number,
      twinkle: boolean
    },
    children: ["Star"],
    methods: ["generateStars", "animateParallax", "handleScroll"]
  },
  
  NebulaCloud: {
    props: {
      colors: string[],
      opacity: number,
      movement: "drift" | "swirl",
      blendMode: string
    },
    shaders: ["nebula.vert", "nebula.frag"],
    children: ["CloudLayer"]
  },
  
  CosmicDust: {
    props: {
      density: number,
      size: [number, number],
      driftSpeed: Vector3
    },
    instanced: true,
    maxInstances: 10000
  }
}
```

### Layer 1: Neural System (-500z)
```typescript
interface NeuralComponents {
  NervousSystem: {
    children: [
      "SpineModel",
      "BrainModel",
      "NervePathways",
      "TMJHighlight"
    ],
    props: {
      rpmValue: number,
      stressLevel: number,
      interactionMode: "rotate" | "explore" | "focus"
    }
  },
  
  SpineModel: {
    model: "spine.glb",
    segments: 33,
    props: {
      flexibility: number,
      curvature: number,
      highlightVertebrae: number[]
    },
    animations: ["breathe", "stress", "relax"]
  },
  
  BrainModel: {
    model: "brain.glb",
    regions: {
      brainstem: { interactive: true },
      amygdala: { stressReactive: true },
      prefrontalCortex: { calmIndicator: true }
    },
    props: {
      glowIntensity: number,
      electricalActivity: number,
      colorMapping: "stress" | "calm"
    }
  },
  
  NervePathways: {
    type: "procedural",
    paths: [
      { from: "tmj", to: "brainstem", nerve: "trigeminal" },
      { from: "tmj", to: "vagus", nerve: "vagus" },
      { from: "spine", to: "brain", nerve: "spinal_cord" }
    ],
    props: {
      pulseSpeed: number,
      glowColor: string,
      thickness: number
    },
    shaders: ["nerve.vert", "nerve.frag"]
  },
  
  ElectricalImpulses: {
    type: "particle_system",
    props: {
      frequency: number, // based on RPM
      path: "NervePathway",
      style: "lightning" | "pulse" | "flow"
    },
    poolSize: 1000
  }
}
```

### Layer 2: Particle System (-100z)
```typescript
interface ParticleComponents {
  ParticleField: {
    children: ["ParticleGroup", "ConnectionSystem"],
    props: {
      totalParticles: number,
      behavior: "chaos" | "swirl" | "organize" | "calm",
      mouseInfluence: boolean,
      colorScheme: string[]
    }
  },
  
  ParticleGroup: {
    instanced: true,
    props: {
      count: number,
      size: [number, number],
      velocity: Vector3,
      lifespan: [number, number]
    },
    behaviors: [
      "OrbitBehavior",
      "SwarmBehavior",
      "MagneticBehavior",
      "ChaosBehavior"
    ]
  },
  
  ConnectionSystem: {
    props: {
      maxDistance: number,
      maxConnections: number,
      style: "lightning" | "beam" | "dots"
    },
    children: ["Connection"],
    poolSize: 5000
  },
  
  Connection: {
    props: {
      startParticle: ParticleRef,
      endParticle: ParticleRef,
      strength: number,
      pulseRate: number
    },
    geometry: "procedural_lightning"
  }
}
```

---

## 🎨 MAIN CONTENT COMPONENTS

### Navigation System
```typescript
interface NavigationComponents {
  NavBar: {
    position: "fixed",
    z: 1000,
    children: [
      "Logo",
      "NavMenu",
      "AudienceToggle",
      "AIAssistantTrigger"
    ],
    props: {
      transparent: boolean,
      scrollHide: boolean,
      magneticButtons: boolean
    }
  },
  
  Logo: {
    type: "animated",
    props: {
      morphOnScroll: boolean,
      particleEmission: boolean,
      clickAction: "reset_experience"
    }
  },
  
  NavMenu: {
    children: ["NavItem"],
    props: {
      layout: "horizontal" | "vertical",
      mobileCollapse: boolean,
      liquidTransition: boolean
    }
  },
  
  NavItem: {
    extends: "MagneticButton",
    props: {
      label: string,
      href: string,
      particleBurst: boolean,
      underlineAnimation: "wave" | "grow" | "glow"
    }
  },
  
  AudienceToggle: {
    type: "dimensional_switch",
    props: {
      modes: ["patient", "practitioner"],
      animation: "rotate_3d" | "morph" | "flip"
    },
    effects: {
      onSwitch: ["particle_reorganize", "color_shift", "content_transform"]
    }
  }
}
```

### Hero Section
```typescript
interface HeroComponents {
  HeroContainer: {
    fullScreen: true,
    children: [
      "RPMVisualizer",
      "HeroContent",
      "ScrollIndicator"
    ],
    props: {
      parallaxEnabled: boolean,
      scrollControlled: boolean
    }
  },
  
  RPMVisualizer: {
    central: true,
    children: [
      "RPMCore",
      "RPMParticles",
      "RPMCounter",
      "StressIndicators"
    ],
    props: {
      currentRPM: number,
      targetRPM: number,
      animationSpeed: number
    }
  },
  
  RPMCore: {
    type: "3d_object",
    geometry: "dynamic_sphere",
    props: {
      distortion: number, // based on RPM
      glow: {
        enabled: boolean,
        intensity: number,
        color: string
      },
      electricArcs: {
        enabled: boolean,
        frequency: number
      }
    },
    shaders: ["rpm_core.vert", "rpm_core.frag"]
  },
  
  RPMParticles: {
    extends: "ParticleGroup",
    props: {
      formation: "explosion" | "swirl" | "orbit",
      syncWithRPM: boolean,
      colorTransition: {
        from: string, // stress color
        to: string // calm color
      }
    }
  },
  
  RPMCounter: {
    props: {
      value: number,
      format: "digital" | "analog" | "hybrid",
      glowEffect: boolean,
      position: "floating" | "fixed"
    },
    children: ["DigitalDisplay", "AnimatedNumbers"]
  },
  
  HeroContent: {
    children: [
      "AnimatedTitle",
      "SubtitleReveal",
      "CTAButtons"
    ],
    props: {
      fadeWithScroll: boolean,
      particleInteraction: boolean
    }
  },
  
  AnimatedTitle: {
    props: {
      text: string,
      animation: "typewriter" | "word_reveal" | "letter_float",
      gradient: boolean,
      glowOnComplete: boolean
    }
  }
}
```

### Interactive Buttons
```typescript
interface ButtonComponents {
  MagneticButton: {
    base: "button",
    props: {
      magneticRadius: number,
      maxDisplacement: number,
      particleBurst: {
        enabled: boolean,
        count: number,
        pattern: string
      },
      morphing: {
        enabled: boolean,
        distortionType: string
      },
      sound: {
        hover: string,
        click: string
      }
    },
    children: ["ButtonContent", "MagneticField", "ParticleBurstSystem"]
  },
  
  MagneticField: {
    invisible: true,
    props: {
      radius: number,
      strength: number,
      falloff: "linear" | "exponential" | "inverse_square"
    }
  },
  
  ParticleBurstSystem: {
    props: {
      triggerOn: "click" | "hold",
      particles: {
        count: number,
        colors: string[],
        physics: {
          gravity: number,
          friction: number,
          initialVelocity: [number, number]
        }
      },
      shockwave: {
        enabled: boolean,
        radius: number,
        distortion: boolean
      }
    }
  },
  
  CTAButton: {
    extends: "MagneticButton",
    props: {
      primary: boolean,
      size: "small" | "medium" | "large",
      liquidFill: boolean,
      pulseAnimation: boolean
    }
  }
}
```

### Content Sections
```typescript
interface ContentComponents {
  Section: {
    props: {
      id: string,
      scrollTrigger: boolean,
      parallaxLayer: number,
      revealAnimation: string
    },
    children: ["SectionBackground", "SectionContent"]
  },
  
  ScrollSection: {
    extends: "Section",
    props: {
      rpmTrigger: number,
      colorShift: {
        from: string,
        to: string
      },
      particleResponse: string
    }
  },
  
  SymptomChecker: {
    interactive: true,
    children: [
      "SymptomGrid",
      "ResultsVisualization",
      "PersonalizedRecommendation"
    ],
    props: {
      inline: boolean,
      animated: boolean,
      aiPowered: boolean
    }
  },
  
  SymptomGrid: {
    props: {
      symptoms: Symptom[],
      layout: "grid" | "list" | "cards",
      selectionMode: "single" | "multiple"
    },
    children: ["SymptomCard"]
  },
  
  SymptomCard: {
    extends: "MagneticButton",
    props: {
      symptom: Symptom,
      selected: boolean,
      particleHighlight: boolean,
      glowOnSelect: boolean
    }
  },
  
  ResultsVisualization: {
    type: "3d_visualization",
    props: {
      dataPoints: DataPoint[],
      visualType: "constellation" | "heatmap" | "neural_map",
      interactive: boolean,
      animateOnReveal: boolean
    }
  }
}
```

---

## 🤖 AI INTERFACE COMPONENTS

### Conversation System
```typescript
interface AIComponents {
  AIAssistant: {
    position: "floating" | "sidebar" | "fullscreen",
    children: [
      "ConversationInterface",
      "VisualizationPanel",
      "GeneratedContent"
    ],
    props: {
      triggerMethod: "button" | "voice" | "gesture",
      personality: "empathetic" | "professional" | "friendly"
    }
  },
  
  ConversationInterface: {
    children: [
      "InputField",
      "MessageHistory",
      "ThinkingIndicator",
      "VoiceInput"
    ],
    props: {
      expandable: boolean,
      particleGathering: boolean,
      glowEffect: boolean
    }
  },
  
  InputField: {
    props: {
      placeholder: string,
      expandOnFocus: boolean,
      particleAttraction: boolean,
      autoComplete: "ai_powered",
      voiceEnabled: boolean
    },
    effects: {
      onFocus: ["expand", "glow", "gather_particles"],
      onType: ["pulse", "emit_particles"]
    }
  },
  
  MessageBubble: {
    props: {
      sender: "user" | "ai",
      content: string,
      timestamp: Date,
      animation: "slide" | "fade" | "materialize",
      particleDecoration: boolean
    },
    variants: {
      user: { align: "right", style: "glass" },
      ai: { align: "left", style: "neural_gradient" }
    }
  },
  
  ThinkingIndicator: {
    children: [
      "BouncingDots",
      "NeuralScanAnimation",
      "PatternRecognition"
    ],
    props: {
      stage: "processing" | "analyzing" | "generating",
      showProgress: boolean
    }
  },
  
  NeuralScanAnimation: {
    type: "3d_effect",
    props: {
      scanType: "brain_sweep" | "pattern_search",
      duration: number,
      glowTrail: boolean,
      particleTrace: boolean
    }
  },
  
  GeneratedContent: {
    dynamic: true,
    children: [
      "GeneratedPage",
      "PersonalizedVisualization",
      "InteractiveRecommendations"
    ],
    props: {
      buildAnimation: "liquid_form" | "particle_coalesce" | "fade_in",
      personalizationLevel: number
    }
  },
  
  GeneratedPage: {
    template: "dynamic",
    sections: [
      "HeroVisualization",
      "PersonalizedExplanation",
      "TreatmentPath",
      "SimilarCases"
    ],
    props: {
      userSpecific: boolean,
      interactiveElements: boolean,
      animations: "scroll_triggered"
    }
  }
}
```

---

## 💧 TRANSITION COMPONENTS

### Liquid Transitions
```typescript
interface TransitionComponents {
  LiquidTransition: {
    fullScreen: true,
    children: ["LiquidMask", "DistortionField"],
    props: {
      duration: number,
      origin: "cursor" | "center" | "custom",
      viscosity: number,
      surfaceTension: number
    }
  },
  
  LiquidMask: {
    type: "svg_clippath",
    props: {
      morphStages: ClipPath[],
      turbulence: number,
      smoothing: number
    },
    animation: {
      keyframes: string[],
      easing: string
    }
  },
  
  DistortionField: {
    type: "shader_effect",
    shaders: ["liquid.vert", "liquid.frag"],
    props: {
      amplitude: number,
      frequency: number,
      evolution: number
    }
  },
  
  PageTransitionManager: {
    singleton: true,
    children: ["TransitionLayer"],
    methods: [
      "initTransition",
      "animateExit",
      "animateEnter",
      "cleanup"
    ]
  }
}
```

---

## 📱 MOBILE-SPECIFIC COMPONENTS

### Touch Gesture Layer
```typescript
interface MobileComponents {
  GestureLayer: {
    fullScreen: true,
    transparent: true,
    children: ["SwipeHandler", "PinchHandler", "LongPressHandler"],
    props: {
      enabled: boolean,
      hapticFeedback: boolean
    }
  },
  
  SwipeHandler: {
    props: {
      directions: ["up", "down", "left", "right"],
      threshold: number,
      velocity: number,
      actions: Map<Direction, Action>
    },
    methods: ["detectSwipe", "executeAction", "provideHaptic"]
  },
  
  PinchHandler: {
    props: {
      minScale: number,
      maxScale: number,
      sensitivity: number,
      target: "neural_view" | "content" | "particles"
    }
  },
  
  ShakeDetector: {
    props: {
      threshold: number,
      cooldown: number,
      action: "reset_experience",
      requireConfirmation: boolean
    }
  },
  
  MobileMenu: {
    type: "slide_drawer",
    props: {
      position: "left" | "right" | "bottom",
      swipeToOpen: boolean,
      backdrop: "blur" | "darken",
      particleEffect: boolean
    }
  }
}
```

---

## 🎭 OVERLAY COMPONENTS

### Modal System
```typescript
interface OverlayComponents {
  ModalContainer: {
    z: 2000,
    children: ["Backdrop", "ModalContent"],
    props: {
      animation: "liquid_form" | "scale" | "slide",
      closeOnBackdrop: boolean,
      escapeToClose: boolean
    }
  },
  
  Backdrop: {
    props: {
      blur: number,
      darkness: number,
      interactive: boolean
    },
    effects: ["blur_background", "pause_animations"]
  },
  
  NotificationSystem: {
    position: "top-right",
    children: ["NotificationStack"],
    props: {
      maxVisible: number,
      animationType: "slide" | "fade" | "bounce"
    }
  },
  
  Notification: {
    props: {
      type: "success" | "info" | "warning" | "error",
      message: string,
      duration: number,
      particleEffect: boolean
    },
    animations: {
      enter: "slide_in",
      exit: "particle_dissolve"
    }
  },
  
  Tooltip: {
    props: {
      content: string,
      position: "auto" | Position,
      trigger: "hover" | "click" | "focus",
      glowEffect: boolean,
      followCursor: boolean
    }
  }
}
```

---

## 🔊 AUDIO COMPONENTS

### Sound System
```typescript
interface AudioComponents {
  AudioManager: {
    singleton: true,
    children: ["BackgroundAudio", "EffectsPlayer", "RPMEngine"],
    props: {
      masterVolume: number,
      muted: boolean,
      spatialAudio: boolean
    }
  },
  
  BackgroundAudio: {
    layers: [
      { name: "deep_space", volume: 0.3 },
      { name: "neural_activity", volume: 0.5 },
      { name: "heartbeat", volume: 0.7 }
    ],
    props: {
      crossfade: boolean,
      rpmReactive: boolean
    }
  },
  
  RPMEngine: {
    props: {
      basePitch: number,
      pitchRange: [number, number],
      distortionThreshold: number,
      volumeCurve: "linear" | "exponential"
    },
    methods: ["updatePitch", "updateVolume", "addDistortion"]
  },
  
  EffectsPlayer: {
    pool: true,
    poolSize: 20,
    effects: Map<string, AudioBuffer>,
    methods: ["play", "stop", "fadeOut"]
  }
}
```

---

## 🎨 THEME COMPONENTS

### Theme System
```typescript
interface ThemeComponents {
  ThemeProvider: {
    context: true,
    props: {
      mode: "dark" | "light" | "auto",
      audienceMode: "patient" | "practitioner",
      reducedMotion: boolean
    },
    children: ["ColorSystem", "MotionSystem", "TypographySystem"]
  },
  
  ColorSystem: {
    props: {
      primary: string,
      secondary: string,
      accent: string,
      gradients: Map<string, string[]>,
      dynamicColors: {
        stress: string,
        calm: string,
        neural: string
      }
    },
    methods: ["interpolateColor", "generateGradient"]
  },
  
  MotionSystem: {
    props: {
      easings: Map<string, string>,
      durations: Map<string, number>,
      reducedMotion: boolean
    },
    methods: ["getEasing", "getDuration", "reduceMotion"]
  }
}
```

---

## 🔧 UTILITY COMPONENTS

### Performance Monitors
```typescript
interface UtilityComponents {
  PerformanceMonitor: {
    dev_only: true,
    children: ["FPSCounter", "MemoryMonitor", "NetworkMonitor"],
    props: {
      position: "top-left",
      alwaysVisible: boolean
    }
  },
  
  LazyLoader: {
    wrapper: true,
    props: {
      threshold: number,
      rootMargin: string,
      placeholder: "skeleton" | "blur" | "spinner"
    },
    methods: ["observe", "load", "unobserve"]
  },
  
  ErrorBoundary: {
    wrapper: true,
    props: {
      fallback: ReactNode,
      onError: ErrorHandler,
      resetOnPropsChange: boolean
    }
  },
  
  SEOHead: {
    props: {
      title: string,
      description: string,
      image: string,
      structured_data: object
    }
  }
}
```

---

## 🏗️ COMPONENT COMPOSITION

### Atomic Design Structure
```typescript
interface AtomicStructure {
  atoms: [
    "Particle",
    "Connection",
    "GlowEffect",
    "Text",
    "Icon"
  ],
  
  molecules: [
    "MagneticButton",
    "ParticleGroup",
    "MessageBubble",
    "RPMCounter",
    "NavItem"
  ],
  
  organisms: [
    "RPMVisualizer",
    "NavigationBar",
    "SymptomChecker",
    "AIAssistant",
    "HeroSection"
  ],
  
  templates: [
    "HomePage",
    "AssessmentPage",
    "GeneratedPage",
    "PractitionerPortal"
  ],
  
  pages: [
    "Home",
    "Discovery",
    "Assessment",
    "Patients",
    "Practitioners",
    "Contact"
  ]
}
```

---

## 📦 COMPONENT REGISTRY

### Dynamic Import Map
```typescript
const componentRegistry = {
  // Lazy loaded heavy components
  lazy: [
    "NervousSystem",
    "AIAssistant",
    "SymptomChecker",
    "GeneratedPage"
  ],
  
  // Always loaded core components
  core: [
    "NavBar",
    "ParticleField",
    "RPMVisualizer",
    "MagneticButton"
  ],
  
  // Conditionally loaded based on device
  conditional: {
    mobile: ["GestureLayer", "MobileMenu", "ShakeDetector"],
    desktop: ["DetailedVisualization", "ComplexShaders"],
    highPerformance: ["ExtraParticles", "AdvancedEffects"]
  }
};
```

---

## 🔄 STATE MANAGEMENT

### Component State Flow
```typescript
interface StateManagement {
  globalState: {
    rpm: RPMStore,
    particles: ParticleStore,
    audio: AudioStore,
    user: UserStore,
    ai: AIStore
  },
  
  localState: {
    component: "useState",
    animation: "useSpring",
    gesture: "useGesture"
  },
  
  sharedState: {
    method: "context" | "zustand" | "jotai",
    updates: "reactive",
    persistence: "localStorage"
  }
}
```

---

## 🎯 COMPONENT GUIDELINES

### Best Practices
1. **Lazy Load**: Heavy 3D components and AI interfaces
2. **Instance Pooling**: Reuse particles and connections
3. **Memoization**: Cache expensive calculations
4. **Code Splitting**: Separate routes and features
5. **Progressive Enhancement**: Start simple, add effects
6. **Accessibility First**: ARIA labels and keyboard nav
7. **Performance Budget**: Monitor component render time

### Naming Conventions
- **Components**: PascalCase (RPMVisualizer)
- **Props**: camelCase (particleCount)
- **Events**: onAction (onClick, onHover)
- **Hooks**: useFeature (useRPM, useParticles)
- **Utils**: lowercase (calculateRPM, generateParticles)

---

This comprehensive component hierarchy provides a complete blueprint for building the revolutionary TMJ website with proper structure, organization, and scalability.