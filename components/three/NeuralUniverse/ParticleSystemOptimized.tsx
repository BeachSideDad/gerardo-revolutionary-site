'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { detectGPUTier, getAdaptiveParticleCount } from '@/lib/utils/gpu-detect';

interface ParticleSystemProps {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  speed?: number;
  mouseInfluence?: number;
  enableStats?: boolean;
}

// Performance monitoring hook
function usePerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  
  useFrame(() => {
    frameCount.current++;
    const currentTime = performance.now();
    const delta = currentTime - lastTime.current;
    
    if (delta >= 1000) {
      const currentFps = Math.round((frameCount.current * 1000) / delta);
      setFps(currentFps);
      frameCount.current = 0;
      lastTime.current = currentTime;
    }
  });
  
  return fps;
}

export function ParticleSystemOptimized({ 
  count = 1500,
  spread = 10,
  color = '#00D9FF',
  size = 0.01,
  speed = 0.5,
  mouseInfluence = 0.3,
  enableStats = true
}: ParticleSystemProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mousePosition = useRef(new THREE.Vector2());
  const { viewport } = useThree();
  const [qualityMode, setQualityMode] = useState<'high' | 'medium' | 'low'>('high');
  const fps = usePerformanceMonitor();
  
  // Adaptive particle count based on GPU
  const adaptiveCount = useMemo(() => {
    return getAdaptiveParticleCount(count);
  }, [count]);
  
  // Adjust quality based on FPS
  useEffect(() => {
    if (fps < 30) {
      setQualityMode('low');
    } else if (fps < 45) {
      setQualityMode('medium');
    } else {
      setQualityMode('high');
    }
  }, [fps]);
  
  // Create particle data with LOD support
  const particles = useMemo(() => {
    const temp = [];
    const actualCount = qualityMode === 'high' ? adaptiveCount : 
                       qualityMode === 'medium' ? Math.floor(adaptiveCount * 0.7) :
                       Math.floor(adaptiveCount * 0.4);
    
    for (let i = 0; i < actualCount; i++) {
      const x = (Math.random() - 0.5) * spread;
      const y = (Math.random() - 0.5) * spread;
      const z = (Math.random() - 0.5) * spread;
      const originalX = x;
      const originalY = y;
      const originalZ = z;
      const randomOffset = Math.random() * Math.PI * 2;
      const velocity = {
        x: (Math.random() - 0.5) * 0.01,
        y: (Math.random() - 0.5) * 0.01,
        z: (Math.random() - 0.5) * 0.01
      };
      temp.push({ x, y, z, originalX, originalY, originalZ, randomOffset, velocity });
    }
    return temp;
  }, [adaptiveCount, spread, qualityMode]);
  
  // Handle mouse movement with throttling
  useEffect(() => {
    let rafId: number;
    const handleMouseMove = (event: MouseEvent) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
        mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
        rafId = 0;
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);
  
  // Create color array for instances
  const colorArray = useMemo(() => {
    const colors = new Float32Array(particles.length * 3);
    const baseColor = new THREE.Color(color);
    const altColor = new THREE.Color('#FF00FF');
    
    for (let i = 0; i < particles.length; i++) {
      const mixAmount = Math.random() * 0.3;
      const mixedColor = baseColor.clone().lerp(altColor, mixAmount);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return colors;
  }, [particles.length, color]);
  
  // Optimized animation loop
  useFrame((state) => {
    if (!mesh.current) return;
    
    const time = state.clock.getElapsedTime();
    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3();
    
    // Convert mouse position to 3D space
    const mouse3D = new THREE.Vector3(
      mousePosition.current.x * viewport.width / 2,
      mousePosition.current.y * viewport.height / 2,
      0
    );
    
    // Reduce calculations for lower quality modes
    const skipFrames = qualityMode === 'low' ? 2 : qualityMode === 'medium' ? 1 : 0;
    const shouldUpdate = state.clock.elapsedTime * 60 % (skipFrames + 1) < 1;
    
    if (!shouldUpdate && qualityMode !== 'high') return;
    
    particles.forEach((particle, i) => {
      // Simplified movement for better performance
      if (qualityMode === 'low') {
        // Basic movement only
        position.x = particle.originalX + Math.sin(time + particle.randomOffset) * 0.5;
        position.y = particle.originalY + Math.cos(time + particle.randomOffset) * 0.5;
        position.z = particle.originalZ;
        scale.set(1, 1, 1);
      } else {
        // Full movement calculation
        const orbitRadius = Math.sqrt(
          particle.originalX * particle.originalX + 
          particle.originalY * particle.originalY
        );
        const orbitSpeed = speed * (1 + orbitRadius * 0.1);
        const angle = time * orbitSpeed + particle.randomOffset;
        
        position.x = particle.originalX + Math.sin(angle) * orbitRadius * 0.1;
        position.y = particle.originalY + Math.cos(angle) * orbitRadius * 0.1;
        position.z = particle.originalZ + Math.sin(time * 0.5 + particle.randomOffset) * 0.5;
        
        // Mouse influence only in high/medium quality
        if (qualityMode === 'high') {
          const distanceToMouse = position.distanceTo(mouse3D);
          if (distanceToMouse < 2) {
            const force = (2 - distanceToMouse) / 2;
            const direction = position.clone().sub(mouse3D).normalize();
            position.add(direction.multiplyScalar(force * mouseInfluence));
          }
        }
        
        // Pulse effect
        const pulseScale = 1 + Math.sin(time * 3 + particle.randomOffset) * 0.2;
        scale.set(pulseScale, pulseScale, pulseScale);
      }
      
      // Apply transformation
      matrix.compose(position, rotation, scale);
      mesh.current!.setMatrixAt(i, matrix);
    });
    
    if (mesh.current.instanceMatrix) {
      mesh.current.instanceMatrix.needsUpdate = true;
    }
  });
  
  // Geometry detail based on quality
  const geometryDetail = qualityMode === 'high' ? 8 : qualityMode === 'medium' ? 6 : 4;
  
  return (
    <>
      {enableStats && (
        <div style={{
          position: 'fixed',
          top: 10,
          left: 10,
          color: 'white',
          fontSize: '12px',
          fontFamily: 'monospace',
          zIndex: 1000,
          background: 'rgba(0,0,0,0.5)',
          padding: '5px'
        }}>
          FPS: {fps} | Quality: {qualityMode} | Particles: {particles.length}
        </div>
      )}
      <instancedMesh ref={mesh} args={[undefined, undefined, particles.length]}>
        <sphereGeometry args={[size, geometryDetail, geometryDetail]} />
        <meshBasicMaterial 
          color={color}
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        >
          <instancedBufferAttribute
            attach="attributes.color"
            args={[colorArray, 3]}
          />
        </meshBasicMaterial>
      </instancedMesh>
    </>
  );
}