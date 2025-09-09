'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PulseConfig {
  origin: THREE.Vector3;
  color: string;
  speed: number;
  intensity: number;
  type: 'auto' | 'user' | 'success' | 'error';
  timestamp: number;
}

interface NeuralPulseProps {
  particles?: THREE.InstancedMesh | null;
  autoInterval?: number;
  enabled?: boolean;
  onPulse?: (config: PulseConfig) => void;
}

export function NeuralPulse({ 
  particles,
  autoInterval = 8000,
  enabled = true,
  onPulse
}: NeuralPulseProps) {
  const [pulses, setPulses] = useState<PulseConfig[]>([]);
  const lastPulseTime = useRef(0);
  const lastInteractionPoint = useRef(new THREE.Vector3(0, 0, 0));
  
  // Trigger pulse function
  const triggerPulse = useCallback((config: Partial<PulseConfig>) => {
    const defaultConfig: PulseConfig = {
      origin: new THREE.Vector3(0, 0, 0),
      color: '#00D4FF',
      speed: 20,
      intensity: 1,
      type: 'auto',
      timestamp: Date.now(),
      ...config
    };
    
    // Color variations based on type
    switch (defaultConfig.type) {
      case 'success':
        defaultConfig.color = '#10B981';
        break;
      case 'error':
        defaultConfig.color = '#EF4444';
        defaultConfig.speed = 30;
        break;
      case 'user':
        defaultConfig.intensity = 1.5;
        break;
    }
    
    setPulses(prev => [...prev, defaultConfig]);
    lastPulseTime.current = Date.now();
    
    // Trigger sound
    window.dispatchEvent(new CustomEvent('sound:pulse', { 
      detail: { type: defaultConfig.type } 
    }));
    
    // Callback
    if (onPulse) {
      onPulse(defaultConfig);
    }
    
    // Clean up old pulses
    setTimeout(() => {
      setPulses(prev => prev.filter(p => p.timestamp !== defaultConfig.timestamp));
    }, 3000);
  }, [onPulse]);
  
  // Auto pulse timer
  useEffect(() => {
    if (!enabled) return;
    
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastPulseTime.current > autoInterval) {
        triggerPulse({
          origin: lastInteractionPoint.current.clone(),
          type: 'auto'
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [enabled, autoInterval, triggerPulse]);
  
  // Listen for user interactions
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      const origin = new THREE.Vector3(x * 10, y * 10, 0);
      
      lastInteractionPoint.current = origin;
      triggerPulse({ origin, type: 'user' });
    };
    
    const handleTouch = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        const touch = event.touches[0];
        const x = (touch.clientX / window.innerWidth) * 2 - 1;
        const y = -(touch.clientY / window.innerHeight) * 2 + 1;
        const origin = new THREE.Vector3(x * 10, y * 10, 0);
        
        lastInteractionPoint.current = origin;
        triggerPulse({ origin, type: 'user' });
      }
    };
    
    window.addEventListener('click', handleClick);
    window.addEventListener('touchstart', handleTouch);
    
    return () => {
      window.removeEventListener('click', handleClick);
      window.removeEventListener('touchstart', handleTouch);
    };
  }, [triggerPulse]);
  
  // Render pulse waves
  useFrame((state, delta) => {
    if (!particles || pulses.length === 0) return;
    
    const time = state.clock.getElapsedTime();
    const tempColor = new THREE.Color();
    const tempObject = new THREE.Object3D();
    
    pulses.forEach(pulse => {
      const age = (Date.now() - pulse.timestamp) / 1000;
      const radius = age * pulse.speed;
      const opacity = Math.max(0, 1 - age / 3);
      
      // Check particle intersections
      for (let i = 0; i < particles.count; i++) {
        particles.getMatrixAt(i, tempObject.matrix);
        tempObject.position.setFromMatrixPosition(tempObject.matrix);
        
        const distance = tempObject.position.distanceTo(pulse.origin);
        const waveThickness = 2;
        
        // Check if particle is within wave
        if (Math.abs(distance - radius) < waveThickness) {
          // Oscillation
          const oscillation = Math.sin(time * 10) * 2 * opacity * pulse.intensity;
          tempObject.position.y += oscillation * delta;
          
          // Color shift
          tempColor.set(pulse.color);
          tempColor.multiplyScalar(1 + opacity);
          particles.setColorAt(i, tempColor);
          
          // Scale pulse
          const scalePulse = 1 + opacity * 0.5 * pulse.intensity;
          tempObject.scale.multiplyScalar(scalePulse);
          
          tempObject.updateMatrix();
          particles.setMatrixAt(i, tempObject.matrix);
        }
      }
    });
    
    if (particles.instanceMatrix) {
      particles.instanceMatrix.needsUpdate = true;
    }
    if (particles.instanceColor) {
      particles.instanceColor.needsUpdate = true;
    }
  });
  
  // Visual representation of pulse waves
  return (
    <>
      {pulses.map((pulse, index) => {
        const age = (Date.now() - pulse.timestamp) / 1000;
        const radius = age * pulse.speed;
        const opacity = Math.max(0, 1 - age / 3);
        
        return (
          <mesh key={pulse.timestamp} position={pulse.origin}>
            <ringGeometry args={[radius - 0.5, radius + 0.5, 64]} />
            <meshBasicMaterial 
              color={pulse.color}
              transparent
              opacity={opacity * 0.3}
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </>
  );
}

// Global pulse trigger
export const triggerGlobalPulse = (config?: Partial<PulseConfig>) => {
  window.dispatchEvent(new CustomEvent('neural:pulse', { detail: config }));
};