'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

interface HeroBigBangProps {
  onLoadComplete?: () => void;
  reducedMotion?: boolean;
  particleCount?: number;
  soundEnabled?: boolean;
}

export function HeroBigBang({ 
  onLoadComplete, 
  reducedMotion = false, 
  particleCount = 1500,
  soundEnabled = true 
}: HeroBigBangProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const { camera, mouse } = useThree();
  
  // Animation states
  const [phase, setPhase] = useState<'darkness' | 'pulse' | 'fracture' | 'explosion' | 'orbit' | 'text'>('darkness');
  const [explosionProgress, setExplosionProgress] = useState(0);
  const [textProgress, setTextProgress] = useState(0);
  
  // Performance mode detection
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const effectiveParticleCount = isMobile ? Math.min(particleCount, 500) : particleCount;
  
  // Lightning connections
  const lightningRef = useRef<THREE.BufferGeometry>(null);
  const lightningOpacity = useRef(0);
  const lastInteractionPoint = useRef(new THREE.Vector3());
  
  // Particle data
  const particleData = useMemo(() => {
    const positions = new Float32Array(effectiveParticleCount * 3);
    const velocities = new Float32Array(effectiveParticleCount * 3);
    const colors = new Float32Array(effectiveParticleCount * 3);
    const sizes = new Float32Array(effectiveParticleCount);
    const phases = new Float32Array(effectiveParticleCount);
    
    for (let i = 0; i < effectiveParticleCount; i++) {
      // Initial positions (all at center for big bang)
      positions[i * 3] = 0;
      positions[i * 3 + 1] = 0;
      positions[i * 3 + 2] = 0;
      
      // Random velocities for explosion
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const speed = 5 + Math.random() * 15;
      
      velocities[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
      velocities[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
      velocities[i * 3 + 2] = Math.cos(phi) * speed;
      
      // Color gradient from white to cyan
      const t = i / effectiveParticleCount;
      colors[i * 3] = 1 - t * 0.5; // R
      colors[i * 3 + 1] = 1 - t * 0.2; // G
      colors[i * 3 + 2] = 1; // B
      
      // Size variation
      sizes[i] = 0.5 + Math.random() * 1.5;
      
      // Random phase for organic motion
      phases[i] = Math.random() * Math.PI * 2;
    }
    
    return { positions, velocities, colors, sizes, phases };
  }, [effectiveParticleCount]);
  
  // Spring animation for center dot
  const { scale: dotScale } = useSpring({
    scale: phase === 'pulse' ? [0.5, 1.5, 0.5] : 0,
    config: { duration: 500 },
    loop: phase === 'pulse'
  });
  
  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      // Darkness phase
      await new Promise(resolve => setTimeout(resolve, 500));
      setPhase('pulse');
      
      // Pulsing dot
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPhase('fracture');
      
      // Fracture
      await new Promise(resolve => setTimeout(resolve, 500));
      setPhase('explosion');
      
      // Trigger sound
      if (soundEnabled) {
        window.dispatchEvent(new CustomEvent('sound:bigBang'));
      }
      
      // Explosion animation
      const explosionDuration = 2000;
      const startTime = Date.now();
      const animateExplosion = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / explosionDuration, 1);
        setExplosionProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animateExplosion);
        } else {
          setPhase('orbit');
          setTimeout(() => setPhase('text'), 500);
        }
      };
      animateExplosion();
      
      // Notify load complete
      if (onLoadComplete) {
        setTimeout(onLoadComplete, 3000);
      }
    };
    
    if (!reducedMotion) {
      sequence();
    } else {
      setPhase('orbit');
      if (onLoadComplete) onLoadComplete();
    }
  }, [reducedMotion, soundEnabled, onLoadComplete]);
  
  // Text materialization
  useEffect(() => {
    if (phase === 'text') {
      const duration = 1200;
      const startTime = Date.now();
      const animateText = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setTextProgress(progress);
        
        if (progress < 1) {
          requestAnimationFrame(animateText);
        }
      };
      animateText();
    }
  }, [phase]);
  
  // Animation loop
  useFrame((state, delta) => {
    if (!meshRef.current) return;
    
    const time = state.clock.getElapsedTime();
    const tempObject = new THREE.Object3D();
    const tempColor = new THREE.Color();
    
    // Mouse interaction
    const mouseVector = new THREE.Vector3(mouse.x * 5, mouse.y * 5, 0);
    
    for (let i = 0; i < effectiveParticleCount; i++) {
      const i3 = i * 3;
      
      let x = particleData.positions[i3];
      let y = particleData.positions[i3 + 1];
      let z = particleData.positions[i3 + 2];
      
      if (phase === 'explosion') {
        // Explosion physics
        const deceleration = 0.95;
        particleData.velocities[i3] *= deceleration;
        particleData.velocities[i3 + 1] *= deceleration;
        particleData.velocities[i3 + 2] *= deceleration;
        
        x += particleData.velocities[i3] * delta;
        y += particleData.velocities[i3 + 1] * delta;
        z += particleData.velocities[i3 + 2] * delta;
        
        particleData.positions[i3] = x;
        particleData.positions[i3 + 1] = y;
        particleData.positions[i3 + 2] = z;
      } else if (phase === 'orbit' || phase === 'text') {
        // Orbital motion with floating
        const orbitRadius = 8 + Math.sin(particleData.phases[i] + time * 0.5) * 2;
        const orbitSpeed = 0.001;
        const floatAmplitude = 0.5;
        
        x = Math.cos(time * orbitSpeed + particleData.phases[i]) * orbitRadius;
        y = Math.sin(time * 0.5 + particleData.phases[i]) * floatAmplitude;
        z = Math.sin(time * orbitSpeed + particleData.phases[i]) * orbitRadius;
        
        // Mouse attraction
        const dx = mouseVector.x - x;
        const dy = mouseVector.y - y;
        const dz = mouseVector.z - z;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        
        if (dist < 5) {
          const force = 0.1 * (1 - dist / 5);
          x += dx * force;
          y += dy * force;
          z += dz * force;
          
          // Trigger spark sound
          if (Math.random() < 0.01 && soundEnabled) {
            window.dispatchEvent(new CustomEvent('sound:spark'));
          }
        }
        
        particleData.positions[i3] = x;
        particleData.positions[i3 + 1] = y;
        particleData.positions[i3 + 2] = z;
      }
      
      // Update instance matrix
      tempObject.position.set(x, y, z);
      
      // Pulsing scale
      const pulseScale = 1 + Math.sin(time * 2 + particleData.phases[i]) * 0.1;
      tempObject.scale.setScalar(particleData.sizes[i] * pulseScale);
      
      tempObject.updateMatrix();
      meshRef.current.setMatrixAt(i, tempObject.matrix);
      
      // Dynamic color based on interaction
      const dist2 = Math.sqrt((mouseVector.x - x) ** 2 + (mouseVector.y - y) ** 2 + (mouseVector.z - z) ** 2);
      const interactionIntensity = dist2 < 5 ? (5 - dist2) / 5 : 0;
      tempColor.setRGB(
        particleData.colors[i3] + interactionIntensity * 0.5,
        particleData.colors[i3 + 1] + interactionIntensity * 0.3,
        particleData.colors[i3 + 2]
      );
      meshRef.current.setColorAt(i, tempColor);
    }
    
    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
    
    // Update lightning opacity
    lightningOpacity.current = Math.max(0, lightningOpacity.current - delta * 0.5);
  });
  
  return (
    <>
      {/* Black screen overlay */}
      {phase === 'darkness' && (
        <mesh position={[0, 0, 5]}>
          <planeGeometry args={[100, 100]} />
          <meshBasicMaterial color="#0A0A0F" />
        </mesh>
      )}
      
      {/* Pulsing dot */}
      {phase === 'pulse' && (
        <animated.mesh scale={dotScale as any}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshBasicMaterial color="#FFFFFF" />
        </animated.mesh>
      )}
      
      {/* Main particle system */}
      <instancedMesh 
        ref={meshRef} 
        args={[undefined, undefined, effectiveParticleCount]}
        frustumCulled={false}
      >
        <sphereGeometry args={[0.02, 8, 8]} />
        <meshBasicMaterial 
          color="#00D4FF"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </instancedMesh>
      
      {/* Lightning connections (placeholder for now) */}
      <lineSegments>
        <bufferGeometry ref={lightningRef} />
        <lineBasicMaterial 
          color="#00D4FF" 
          transparent 
          opacity={lightningOpacity.current}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </>
  );
}