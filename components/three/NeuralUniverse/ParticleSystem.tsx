'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface ParticleSystemProps {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  speed?: number;
  mouseInfluence?: number;
}

export function ParticleSystem({ 
  count = 1000,
  spread = 10,
  color = '#00D9FF',
  size = 0.01,
  speed = 0.5,
  mouseInfluence = 0.3
}: ParticleSystemProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const mousePosition = useRef(new THREE.Vector2());
  const { viewport } = useThree();
  
  // Create particle data
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
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
  }, [count, spread]);
  
  // Handle mouse movement
  useMemo(() => {
    const handleMouseMove = (event: MouseEvent) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Create color array for instances
  const colorArray = useMemo(() => {
    const colors = new Float32Array(count * 3);
    const baseColor = new THREE.Color(color);
    const altColor = new THREE.Color('#FF00FF');
    
    for (let i = 0; i < count; i++) {
      const mixAmount = Math.random() * 0.3;
      const mixedColor = baseColor.clone().lerp(altColor, mixAmount);
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }
    return colors;
  }, [count, color]);
  
  // Animation loop
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
    
    particles.forEach((particle, i) => {
      // Base movement - orbital motion around origin
      const orbitRadius = Math.sqrt(
        particle.originalX * particle.originalX + 
        particle.originalY * particle.originalY
      );
      const orbitSpeed = speed * (1 + orbitRadius * 0.1);
      const angle = time * orbitSpeed + particle.randomOffset;
      
      // Calculate position with orbital motion
      position.x = particle.originalX + Math.sin(angle) * orbitRadius * 0.1;
      position.y = particle.originalY + Math.cos(angle) * orbitRadius * 0.1;
      position.z = particle.originalZ + Math.sin(time * 0.5 + particle.randomOffset) * 0.5;
      
      // Mouse influence - particles are attracted/repelled by mouse
      const distanceToMouse = position.distanceTo(mouse3D);
      if (distanceToMouse < 2) {
        const force = (2 - distanceToMouse) / 2;
        const direction = position.clone().sub(mouse3D).normalize();
        position.add(direction.multiplyScalar(force * mouseInfluence));
      }
      
      // Add floating motion
      position.y += Math.sin(time * 2 + particle.randomOffset) * 0.05;
      
      // Velocity-based movement for more organic feel
      particle.velocity.x += (Math.random() - 0.5) * 0.0001;
      particle.velocity.y += (Math.random() - 0.5) * 0.0001;
      particle.velocity.z += (Math.random() - 0.5) * 0.0001;
      
      // Apply damping to velocity
      particle.velocity.x *= 0.99;
      particle.velocity.y *= 0.99;
      particle.velocity.z *= 0.99;
      
      position.x += particle.velocity.x;
      position.y += particle.velocity.y;
      position.z += particle.velocity.z;
      
      // Pulse effect
      const pulseScale = 1 + Math.sin(time * 3 + particle.randomOffset) * 0.2;
      scale.set(pulseScale, pulseScale, pulseScale);
      
      // Apply transformation
      matrix.compose(position, rotation, scale);
      mesh.current.setMatrixAt(i, matrix);
    });
    
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[size, 8, 8]} />
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
  );
}