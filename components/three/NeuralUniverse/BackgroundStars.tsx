'use client';

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Points, PointMaterial } from '@react-three/drei';

interface BackgroundStarsProps {
  count?: number;
  depth?: number;
  size?: number;
  rpm?: number;
}

export function BackgroundStars({ 
  count = 5000, 
  depth = 50,
  size = 0.02,
  rpm = 6000 
}: BackgroundStarsProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const rotationSpeed = useRef({ x: 0, y: 0, z: 0 });

  // Generate star positions with clustering for nebula effect
  const [positions, colors, sizes] = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create clusters of stars (nebula regions)
      const clusterChance = Math.random();
      let x, y, z;
      
      if (clusterChance < 0.3) {
        // 30% in tight clusters (nebula cores)
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 10 + 5;
        const clusterOffset = (Math.random() - 0.5) * 5;
        
        x = Math.cos(angle) * radius + clusterOffset;
        y = (Math.random() - 0.5) * depth * 0.5;
        z = Math.sin(angle) * radius + clusterOffset;
      } else if (clusterChance < 0.6) {
        // 30% in loose clusters
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const radius = Math.random() * depth * 0.7;
        
        x = radius * Math.sin(phi) * Math.cos(theta);
        y = radius * Math.sin(phi) * Math.sin(theta);
        z = radius * Math.cos(phi);
      } else {
        // 40% scattered throughout space
        x = (Math.random() - 0.5) * depth;
        y = (Math.random() - 0.5) * depth;
        z = (Math.random() - 0.5) * depth;
      }
      
      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;
      
      // Color variation for different star types
      const starType = Math.random();
      if (starType < 0.2) {
        // Blue giants
        colors[i3] = 0.6;
        colors[i3 + 1] = 0.8;
        colors[i3 + 2] = 1.0;
        sizes[i] = size * 1.5;
      } else if (starType < 0.4) {
        // Red giants
        colors[i3] = 1.0;
        colors[i3 + 1] = 0.6;
        colors[i3 + 2] = 0.4;
        sizes[i] = size * 1.3;
      } else if (starType < 0.6) {
        // Yellow stars
        colors[i3] = 1.0;
        colors[i3 + 1] = 1.0;
        colors[i3 + 2] = 0.7;
        sizes[i] = size;
      } else {
        // White dwarfs
        colors[i3] = 0.95;
        colors[i3 + 1] = 0.95;
        colors[i3 + 2] = 1.0;
        sizes[i] = size * 0.8;
      }
      
      // Add brightness variation
      const brightness = 0.5 + Math.random() * 0.5;
      colors[i3] *= brightness;
      colors[i3 + 1] *= brightness;
      colors[i3 + 2] *= brightness;
    }
    
    return [positions, colors, sizes];
  }, [count, depth, size]);

  // Animate stars based on RPM
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Slow rotation based on RPM
    const rpmNormalized = rpm / 6000;
    rotationSpeed.current.x = delta * 0.01 * (1 - rpmNormalized);
    rotationSpeed.current.y = delta * 0.02 * (1 - rpmNormalized);
    rotationSpeed.current.z = delta * 0.005 * (1 - rpmNormalized);
    
    pointsRef.current.rotation.x += rotationSpeed.current.x;
    pointsRef.current.rotation.y += rotationSpeed.current.y;
    pointsRef.current.rotation.z += rotationSpeed.current.z;
    
    // Twinkle effect
    const geometry = pointsRef.current.geometry;
    const attributes = geometry.attributes;
    const sizesArray = attributes.size.array as Float32Array;
    const time = state.clock.elapsedTime;
    
    for (let i = 0; i < count; i++) {
      const twinkleSpeed = 2 + Math.sin(i) * 2;
      const twinkle = Math.sin(time * twinkleSpeed + i) * 0.3 + 0.7;
      sizesArray[i] = sizes[i] * twinkle;
    }
    
    attributes.size.needsUpdate = true;
  });

  // Create nebula clouds as additional geometry
  const nebulaClouds = useMemo(() => {
    const clouds = [];
    const cloudCount = 3;
    
    for (let i = 0; i < cloudCount; i++) {
      const cloudPositions = new Float32Array(1000 * 3);
      const cloudColors = new Float32Array(1000 * 3);
      
      const centerX = (Math.random() - 0.5) * depth * 0.5;
      const centerY = (Math.random() - 0.5) * depth * 0.5;
      const centerZ = (Math.random() - 0.5) * depth * 0.5;
      
      for (let j = 0; j < 1000; j++) {
        const j3 = j * 3;
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 8;
        const height = (Math.random() - 0.5) * 4;
        
        cloudPositions[j3] = centerX + Math.cos(angle) * radius;
        cloudPositions[j3 + 1] = centerY + height;
        cloudPositions[j3 + 2] = centerZ + Math.sin(angle) * radius;
        
        // Nebula colors (purple, blue, pink)
        const colorChoice = Math.random();
        if (colorChoice < 0.33) {
          cloudColors[j3] = 0.5;
          cloudColors[j3 + 1] = 0.0;
          cloudColors[j3 + 2] = 1.0;
        } else if (colorChoice < 0.66) {
          cloudColors[j3] = 0.0;
          cloudColors[j3 + 1] = 0.5;
          cloudColors[j3 + 2] = 1.0;
        } else {
          cloudColors[j3] = 1.0;
          cloudColors[j3 + 1] = 0.0;
          cloudColors[j3 + 2] = 0.5;
        }
        
        // Fade based on distance from center
        const distFromCenter = Math.sqrt(
          Math.pow(cloudPositions[j3] - centerX, 2) +
          Math.pow(cloudPositions[j3 + 1] - centerY, 2) +
          Math.pow(cloudPositions[j3 + 2] - centerZ, 2)
        );
        const fade = Math.max(0, 1 - distFromCenter / 8) * 0.1;
        
        cloudColors[j3] *= fade;
        cloudColors[j3 + 1] *= fade;
        cloudColors[j3 + 2] *= fade;
      }
      
      clouds.push({ positions: cloudPositions, colors: cloudColors });
    }
    
    return clouds;
  }, [depth]);

  return (
    <group>
      {/* Main starfield */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={count}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={count}
            array={colors}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={count}
            array={sizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={size}
          sizeAttenuation
          transparent
          opacity={0.8}
          vertexColors
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
      
      {/* Nebula clouds */}
      {nebulaClouds.map((cloud, index) => (
        <points key={`cloud-${index}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={1000}
              array={cloud.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={1000}
              array={cloud.colors}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.1}
            sizeAttenuation
            transparent
            opacity={0.3}
            vertexColors
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      ))}
    </group>
  );
}