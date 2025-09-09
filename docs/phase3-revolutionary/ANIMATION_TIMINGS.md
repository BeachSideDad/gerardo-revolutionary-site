# ⏱️ ANIMATION TIMINGS - Precision Choreography
## Frame-by-Frame Animation Specifications

---

## 🎬 MASTER TIMELINE

### Page Load Sequence
```typescript
const masterLoadSequence = {
  phase1_initialize: {
    start: 0,
    duration: 300,
    elements: [
      { 
        name: "background_fade",
        delay: 0,
        duration: 300,
        easing: "ease-out"
      }
    ]
  },
  
  phase2_particles: {
    start: 200,
    duration: 800,
    elements: [
      {
        name: "particle_spawn",
        delay: 0,
        duration: 500,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        stagger: {
          each: 2, // ms between particles
          from: "center",
          grid: [30, 30]
        }
      },
      {
        name: "particle_initial_explosion",
        delay: 300,
        duration: 500,
        easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      }
    ]
  },
  
  phase3_neural: {
    start: 600,
    duration: 1200,
    elements: [
      {
        name: "spine_materialize",
        delay: 0,
        duration: 800,
        easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
        keyframes: [
          { progress: 0, opacity: 0, scale: 0.8, blur: 10 },
          { progress: 0.5, opacity: 0.5, scale: 0.95, blur: 5 },
          { progress: 1, opacity: 1, scale: 1, blur: 0 }
        ]
      },
      {
        name: "neural_pathways_grow",
        delay: 400,
        duration: 800,
        easing: "ease-in-out",
        path_growth: "svg_dash_offset"
      }
    ]
  },
  
  phase4_interface: {
    start: 1200,
    duration: 800,
    elements: [
      {
        name: "rpm_counter_appear",
        delay: 0,
        duration: 400,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        animation: "scale_bounce_in"
      },
      {
        name: "navigation_slide",
        delay: 200,
        duration: 600,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
        from: { y: -100, opacity: 0 },
        to: { y: 0, opacity: 1 }
      },
      {
        name: "hero_text_write",
        delay: 400,
        duration: 1000,
        easing: "linear",
        effect: "typewriter",
        speed: 50 // ms per character
      }
    ]
  },
  
  phase5_ready: {
    start: 2000,
    duration: 500,
    elements: [
      {
        name: "cta_pulse",
        delay: 0,
        duration: 500,
        easing: "ease-in-out",
        repeat: 3,
        scale: { from: 1, to: 1.05 }
      },
      {
        name: "particle_settle",
        delay: 0,
        duration: 500,
        easing: "cubic-bezier(0.25, 0.1, 0.25, 1)",
        behavior: "find_orbit_positions"
      }
    ]
  }
};
```

---

## 🌊 LIQUID TRANSITION TIMINGS

### Page-to-Page Morphing
```typescript
const liquidTransitions = {
  standard: {
    total_duration: 1200,
    phases: [
      {
        name: "prepare",
        start: 0,
        duration: 100,
        actions: [
          { element: "current_page", effect: "freeze_interactions" },
          { element: "particles", effect: "pause_movement" }
        ]
      },
      {
        name: "liquify",
        start: 100,
        duration: 400,
        easing: "cubic-bezier(0.75, -0.5, 0.25, 1.5)", // Mercury drop
        clipPath: {
          frames: [
            { time: 0, shape: "circle(100% at 50% 50%)" },
            { time: 100, shape: "ellipse(110% 100% at 50% 50%)" },
            { time: 200, shape: "ellipse(80% 120% at 50% 50%)" },
            { time: 300, shape: "circle(40% at var(--mouse-x) var(--mouse-y))" },
            { time: 400, shape: "circle(0% at var(--mouse-x) var(--mouse-y))" }
          ]
        },
        distortion: {
          vertex_shader: true,
          amplitude: { from: 0, to: 50, curve: "exponential" },
          frequency: 3,
          noise: 0.2
        }
      },
      {
        name: "transport",
        start: 400,
        duration: 300,
        actions: [
          {
            element: "particles",
            effect: "stream_to_next_page",
            path: "bezier_curve",
            control_points: [
              { x: "current_x", y: "current_y" },
              { x: "current_x + 100", y: "current_y - 200" },
              { x: "target_x - 100", y: "target_y - 200" },
              { x: "target_x", y: "target_y" }
            ]
          }
        ]
      },
      {
        name: "reform",
        start: 600,
        duration: 600,
        easing: "cubic-bezier(0.87, 0, 0.13, 1)", // Surface tension
        clipPath: {
          frames: [
            { time: 0, shape: "circle(0% at 50% 50%)" },
            { time: 200, shape: "ellipse(30% 10% at 50% 50%)" },
            { time: 400, shape: "ellipse(90% 80% at 50% 50%)" },
            { time: 500, shape: "ellipse(105% 95% at 50% 50%)" },
            { time: 600, shape: "circle(150% at 50% 50%)" }
          ]
        },
        content: {
          fade_in: { start: 300, duration: 300 },
          scale: { from: 0.9, to: 1, bounce: 1.02 }
        }
      }
    ]
  },
  
  quick: {
    total_duration: 600,
    easing: "cubic-bezier(0.4, 0.0, 0.2, 1)",
    simplified: true
  },
  
  dramatic: {
    total_duration: 2000,
    includes: ["particle_explosion", "slow_reform", "echo_effect"]
  }
};
```

---

## 🧲 MAGNETIC BUTTON TIMINGS

### Interaction Choreography
```typescript
const magneticButtonTimings = {
  mouse_enter_zone: {
    detection: "instant",
    response: {
      delay: 0,
      duration: 150,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      animations: [
        {
          property: "transform",
          from: "translate3d(0, 0, 0)",
          to: "translate3d(var(--mouse-offset-x), var(--mouse-offset-y), 10px)",
          duration: 150
        },
        {
          property: "scale",
          from: 1,
          to: 1.08,
          duration: 200,
          easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
        }
      ]
    }
  },
  
  mouse_move: {
    tracking: "real-time", // 60fps
    smoothing: 0.15, // lerp factor
    max_displacement: 30, // pixels
    rotation_follow: {
      enabled: true,
      max_angle: 5, // degrees
      axis: "both", // x and y
      lag: 50 // ms behind mouse
    }
  },
  
  mouse_leave: {
    return_animation: {
      delay: 0,
      duration: 300,
      easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      overshoot: 1.05,
      settle: {
        duration: 150,
        easing: "ease-out"
      }
    }
  },
  
  click: {
    immediate: {
      duration: 80,
      scale: 0.95,
      easing: "ease-in"
    },
    particle_burst: {
      delay: 0,
      spawn_duration: 50,
      particle_lifetime: 1500,
      stagger: 2, // ms between particles
      physics: {
        initial_velocity: { min: 300, max: 800 }, // pixels/second
        gravity: 200, // pixels/second²
        friction: 0.98,
        rotation_speed: { min: -720, max: 720 } // degrees/second
      }
    },
    recovery: {
      delay: 80,
      duration: 220,
      scale: { to: 1, overshoot: 1.1 },
      easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
    },
    ripple: {
      delay: 0,
      duration: 600,
      scale: { from: 0, to: 2 },
      opacity: { from: 0.6, to: 0 },
      easing: "cubic-bezier(0.4, 0, 0.2, 1)"
    }
  }
};
```

---

## ⚡ NEURAL CONNECTION TIMINGS

### Lightning Formation
```typescript
const neuralConnectionTimings = {
  connection_detection: {
    scan_interval: 16, // ms (60fps)
    formation: {
      delay: 0,
      fade_in: 200,
      easing: "ease-in",
      stages: [
        { time: 0, opacity: 0, segments: 0 },
        { time: 50, opacity: 0.3, segments: 2 },
        { time: 100, opacity: 0.6, segments: 5 },
        { time: 150, opacity: 0.9, segments: 7 },
        { time: 200, opacity: 1, segments: 8 }
      ]
    }
  },
  
  pulse_animation: {
    interval: 2000, // ms between pulses
    travel_time: 500, // ms for pulse to travel full length
    easing: "linear",
    brightness_curve: {
      keyframes: [
        { position: 0, brightness: 0.3 },
        { position: 0.1, brightness: 1 },
        { position: 0.2, brightness: 0.8 },
        { position: 1, brightness: 0.3 }
      ]
    }
  },
  
  branching: {
    probability_check: 100, // ms
    branch_growth: {
      duration: 300,
      easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      angle_animation: {
        from: 0,
        to: "random(-45, 45)",
        wobble: true,
        wobble_frequency: 3
      }
    }
  },
  
  disconnection: {
    trigger_delay: 100, // ms after particles separate
    fade_out: 500,
    easing: "ease-out",
    dissolve_pattern: "from_endpoints"
  }
};
```

---

## 🤖 AI INTERFACE TIMINGS

### Conversation Flow
```typescript
const aiInterfaceTimings = {
  input_activation: {
    focus: {
      expand_duration: 400,
      easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      glow_fade_in: 200
    },
    particles: {
      gather_delay: 100,
      gather_duration: 600,
      formation: "spiral_in",
      stagger: 5
    }
  },
  
  thinking_state: {
    start_delay: 200,
    indicators: [
      {
        element: "dots",
        animation: "bounce",
        duration: 1400,
        pattern: [
          { dot: 1, delay: 0 },
          { dot: 2, delay: 200 },
          { dot: 3, delay: 400 }
        ]
      },
      {
        element: "neural_scan",
        sweep_duration: 2000,
        sweep_easing: "ease-in-out",
        glow_trail: 500 // ms trail length
      }
    ]
  },
  
  response_generation: {
    text_appear: {
      method: "typewriter",
      speed: 30, // ms per character
      variance: 10, // random variance for natural feel
      punctuation_pause: {
        period: 300,
        comma: 150,
        question: 200
      }
    },
    
    visualization_build: {
      start: "with_text",
      stages: [
        { 
          name: "framework",
          duration: 400,
          elements: ["axes", "grid"]
        },
        {
          name: "data_points",
          duration: 800,
          stagger: 10,
          easing: "cubic-bezier(0.4, 0, 0.2, 1)"
        },
        {
          name: "connections",
          duration: 600,
          method: "draw_path"
        },
        {
          name: "highlights",
          duration: 400,
          pulse: true
        }
      ]
    }
  },
  
  page_generation: {
    total_time: 1500,
    sequence: [
      {
        element: "background",
        start: 0,
        duration: 300,
        effect: "fade",
        easing: "ease-out"
      },
      {
        element: "layout_grid",
        start: 200,
        duration: 400,
        effect: "draw_lines",
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      {
        element: "content_blocks",
        start: 500,
        duration: 800,
        effect: "slide_up",
        stagger: 100,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
      },
      {
        element: "interactive_elements",
        start: 1000,
        duration: 500,
        effect: "scale_in",
        stagger: 50
      }
    ]
  }
};
```

---

## 📜 SCROLL-DRIVEN TIMINGS

### RPM Decrease Journey
```typescript
const scrollTimings = {
  rpm_mapping: {
    scroll_range: [0, 1], // 0 = top, 1 = bottom
    rpm_range: [6000, 800],
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
    smoothing: 0.1, // lerp factor for smooth following
    
    milestones: [
      {
        scroll: 0.2,
        rpm: 4800,
        trigger: "first_calm_wave",
        duration: 500
      },
      {
        scroll: 0.4,
        rpm: 3600,
        trigger: "particle_organization",
        duration: 800
      },
      {
        scroll: 0.6,
        rpm: 2400,
        trigger: "color_shift_begin",
        duration: 1000
      },
      {
        scroll: 0.8,
        rpm: 1600,
        trigger: "neural_synchronization",
        duration: 600
      },
      {
        scroll: 1.0,
        rpm: 800,
        trigger: "complete_reset",
        duration: 1200
      }
    ]
  },
  
  parallax_layers: {
    background: {
      speed: 0.3,
      delay: 0,
      easing: "linear"
    },
    particles: {
      speed: 0.7,
      delay: 50, // ms lag
      easing: "ease-out"
    },
    content: {
      speed: 1.0,
      delay: 0,
      easing: "linear"
    },
    foreground: {
      speed: 1.3,
      delay: 0,
      easing: "ease-in"
    }
  },
  
  reveal_animations: {
    trigger: "intersection_observer",
    threshold: 0.3,
    animations: [
      {
        name: "fade_up",
        duration: 800,
        delay: "index * 100", // stagger based on element index
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
        transform: {
          from: "translateY(30px)",
          to: "translateY(0)"
        }
      },
      {
        name: "slide_in",
        duration: 1000,
        delay: 200,
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)"
      }
    ]
  }
};
```

---

## 📱 MOBILE GESTURE TIMINGS

### Touch Response
```typescript
const mobileTouchTimings = {
  tap: {
    detection_window: 300, // ms to distinguish from hold
    feedback: {
      haptic_delay: 0,
      visual_delay: 0,
      visual_duration: 200
    }
  },
  
  swipe: {
    minimum_velocity: 0.3, // pixels/ms
    detection_time: 150, // ms max for swipe
    animation: {
      content_follow: {
        duration: 300,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)"
      },
      spring_back: {
        duration: 400,
        easing: "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
      }
    }
  },
  
  pinch: {
    sensitivity: 0.01,
    response_delay: 0,
    smooth_factor: 0.15,
    zoom_animation: {
      duration: "real-time",
      max_scale_speed: 0.05, // scale units per frame
      spring_settle: {
        duration: 200,
        easing: "ease-out"
      }
    }
  },
  
  long_press: {
    duration: 500,
    feedback_stages: [
      { time: 0, haptic: "light" },
      { time: 250, haptic: "medium", visual: "ring_grow" },
      { time: 500, haptic: "success", visual: "ring_complete" }
    ],
    action_delay: 0
  },
  
  drag: {
    start_threshold: 10, // pixels
    follow_lag: 0, // instant follow
    momentum: {
      friction: 0.95,
      bounce: {
        stiffness: 300,
        damping: 20
      }
    }
  }
};
```

---

## 🎨 PARTICLE SYSTEM TIMINGS

### Particle Behaviors
```typescript
const particleTimings = {
  spawn: {
    initial_burst: {
      duration: 500,
      count: 1500,
      stagger: 0.3, // ms between particles
      pattern: "sphere_explosion",
      easing: "ease-out"
    },
    continuous: {
      rate: 10, // particles per second
      lifetime: { min: 3000, max: 8000 },
      fade_in: 200,
      fade_out: 500
    }
  },
  
  movement: {
    orbit: {
      period: { min: 4000, max: 12000 }, // ms for full orbit
      wobble: {
        amplitude: 0.1,
        frequency: 0.5
      }
    },
    
    brownian: {
      update_rate: 16, // ms (60fps)
      velocity_change: 0.001,
      damping: 0.99
    },
    
    attraction: {
      to_cursor: {
        response_time: 100,
        max_speed: 5, // units per second
        easing: "ease-out"
      },
      between_particles: {
        calculation_rate: 100, // ms
        force_application: "immediate"
      }
    }
  },
  
  transitions: {
    chaos_to_calm: {
      duration: 3000,
      stages: [
        { progress: 0, state: "explosive", speed: 1.0 },
        { progress: 0.3, state: "swirling", speed: 0.7 },
        { progress: 0.6, state: "organizing", speed: 0.4 },
        { progress: 1.0, state: "orbiting", speed: 0.1 }
      ]
    }
  }
};
```

---

## ⏰ LOADING & TRANSITION STATES

### Skeleton Screens
```typescript
const loadingTimings = {
  skeleton: {
    pulse: {
      duration: 1500,
      easing: "ease-in-out",
      infinite: true,
      wave: {
        gradient: "linear-gradient(90deg, transparent, rgba(0,217,255,0.1), transparent)",
        width: "200%",
        travel_time: 1500
      }
    }
  },
  
  content_swap: {
    fade_out: {
      duration: 200,
      easing: "ease-in"
    },
    fade_in: {
      delay: 50,
      duration: 300,
      easing: "ease-out"
    }
  },
  
  lazy_load: {
    image: {
      placeholder_blur: 0,
      load_transition: 400,
      easing: "ease-out"
    },
    component: {
      delay: "viewport_enter + 100",
      duration: 600
    }
  }
};
```

---

## 🎯 MICRO-INTERACTION TIMINGS

### Hover Effects
```typescript
const hoverTimings = {
  enter: {
    delay: 0,
    duration: 200,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  },
  
  leave: {
    delay: 0,
    duration: 300,
    easing: "cubic-bezier(0.4, 0, 0.2, 1)"
  },
  
  continuous: {
    glow_pulse: {
      duration: 2000,
      easing: "ease-in-out",
      infinite: true
    },
    rotation: {
      duration: 20000,
      easing: "linear",
      infinite: true
    }
  }
};
```

---

## 🚀 PERFORMANCE OPTIMIZATION

### Frame Budget
```typescript
const frameBudget = {
  target_fps: 60,
  frame_time: 16.67, // ms
  
  allocations: {
    javascript: 10, // ms
    style: 2, // ms
    layout: 2, // ms
    paint: 1, // ms
    composite: 1.67 // ms
  },
  
  degradation: {
    level1: {
      fps: 45,
      actions: ["reduce_particle_count", "disable_blur"]
    },
    level2: {
      fps: 30,
      actions: ["simplify_animations", "disable_shadows"]
    },
    level3: {
      fps: 20,
      actions: ["static_fallback", "disable_3d"]
    }
  }
};
```

---

## 🎬 COMPLEX SEQUENCES

### Hero Entrance
```typescript
const heroSequence = {
  total_duration: 3000,
  timeline: [
    // Background
    { start: 0, duration: 500, element: "starfield", action: "fade_in" },
    { start: 200, duration: 800, element: "nebula", action: "drift_in" },
    
    // Particles
    { start: 300, duration: 700, element: "particles", action: "explode" },
    { start: 800, duration: 1200, element: "particles", action: "find_positions" },
    
    // Neural System
    { start: 600, duration: 800, element: "spine", action: "materialize" },
    { start: 1000, duration: 600, element: "brain", action: "glow_activation" },
    
    // Text
    { start: 1200, duration: 800, element: "title", action: "typewriter" },
    { start: 1600, duration: 600, element: "subtitle", action: "fade_up" },
    
    // Interactive
    { start: 2000, duration: 500, element: "cta", action: "pulse_in" },
    { start: 2200, duration: 800, element: "rpm_gauge", action: "initialize" }
  ]
};
```

---

## 📊 EASING FUNCTION LIBRARY

### Custom Cubic Beziers
```typescript
const customEasings = {
  // Physical
  "mercury-drop": "cubic-bezier(0.75, -0.5, 0.25, 1.5)",
  "elastic-bounce": "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
  "surface-tension": "cubic-bezier(0.87, 0, 0.13, 1)",
  "gravity-fall": "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
  
  // Organic
  "breathing": "cubic-bezier(0.445, 0.05, 0.55, 0.95)",
  "heartbeat": "cubic-bezier(0.42, 0, 0.58, 1)",
  "neural-pulse": "cubic-bezier(0.4, 0.0, 0.2, 1)",
  
  // Interface
  "smooth-snap": "cubic-bezier(0.34, 1.56, 0.64, 1)",
  "gentle-ease": "cubic-bezier(0.4, 0, 0.2, 1)",
  "sharp-out": "cubic-bezier(0.22, 1, 0.36, 1)",
  
  // Special
  "chaos": "cubic-bezier(0.5, 0, 0.5, 1)",
  "zen": "cubic-bezier(0.42, 0, 0.58, 1)",
  "explosive": "cubic-bezier(0.19, 1, 0.22, 1)"
};
```

---

## ⚙️ TIMING UTILITIES

### Helper Functions
```typescript
// Stagger calculator
function staggerDelay(index: number, total: number, duration: number): number {
  return (index / total) * duration;
}

// Easing function
function ease(t: number, type: string): number {
  switch(type) {
    case 'easeInQuad': return t * t;
    case 'easeOutQuad': return t * (2 - t);
    case 'easeInOutQuad': return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    case 'easeInCubic': return t * t * t;
    case 'easeOutCubic': return (--t) * t * t + 1;
    case 'easeInOutCubic': return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    default: return t;
  }
}

// Spring physics
function spring(tension: number, friction: number): string {
  return `spring(${tension}, ${friction})`;
}
```

---

## 🎯 TIMING RULES

### Golden Rules
1. **User Input Response**: < 100ms
2. **Animation Start**: < 200ms after trigger
3. **Micro-interactions**: 200-400ms
4. **Page Transitions**: 600-1200ms
5. **Complex Sequences**: < 3000ms total
6. **Loading Feedback**: < 300ms
7. **Haptic Response**: < 50ms

### Stagger Patterns
- **Cards**: 50-100ms between items
- **List Items**: 30-50ms
- **Particles**: 0.5-2ms
- **Text Characters**: 20-50ms

### Performance Targets
- **Maintain 60fps** during all animations
- **Reduce complexity** below 45fps
- **Static fallback** below 30fps

---

This comprehensive timing specification ensures every animation feels natural, responsive, and magical while maintaining optimal performance across all devices.