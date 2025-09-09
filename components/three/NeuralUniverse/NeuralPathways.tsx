'use client';

import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface NeuralPathwaysProps {
  particles: THREE.Vector3[];
  rpm: number;
  maxConnections?: number;
  maxDistance?: number;
}

interface Connection {
  start: THREE.Vector3;
  end: THREE.Vector3;
  strength: number;
  active: boolean;
}

export function NeuralPathways({ 
  particles, 
  rpm, 
  maxConnections = 5,
  maxDistance = 3 
}: NeuralPathwaysProps) {
  const connectionsRef = useRef<Connection[]>([]);
  const linesRef = useRef<THREE.Group>(null);
  const pulsePhase = useRef(0);

  // Calculate connections based on particle proximity
  const connections = useMemo(() => {
    const conns: Connection[] = [];
    const particleCount = particles.length;
    
    for (let i = 0; i < particleCount; i++) {
      let connectionCount = 0;
      
      for (let j = i + 1; j < particleCount && connectionCount < maxConnections; j++) {
        const distance = particles[i].distanceTo(particles[j]);
        
        if (distance < maxDistance && distance > 0.5) {
          const strength = 1 - (distance / maxDistance);
          conns.push({
            start: particles[i].clone(),
            end: particles[j].clone(),
            strength,
            active: Math.random() > 0.3 // 70% chance of being active
          });
          connectionCount++;
        }
      }
    }
    
    return conns;
  }, [particles, maxConnections, maxDistance]);

  // Update connections with lightning effect
  useFrame((state, delta) => {
    pulsePhase.current += delta * (rpm / 1000);
    
    if (linesRef.current) {
      linesRef.current.children.forEach((line, index) => {
        const connection = connections[index];
        if (!connection) return;
        
        // Pulse brightness based on RPM and time
        const pulseFactor = Math.sin(pulsePhase.current + index * 0.1) * 0.5 + 0.5;
        const intensity = connection.strength * pulseFactor * (rpm / 6000);
        
        if (line instanceof THREE.Line) {
          const material = line.material as THREE.LineBasicMaterial;
          material.opacity = intensity * (connection.active ? 1 : 0.3);
          
          // Color changes based on RPM
          const rpmNormalized = rpm / 6000;
          material.color = new THREE.Color(
            0.0 + rpmNormalized,
            0.85 * (1 - rpmNormalized),
            1.0
          );
        }
      });
    }
  });

  // Generate lightning bolt path
  const generateLightningPath = (start: THREE.Vector3, end: THREE.Vector3, segments = 8) => {
    const points: THREE.Vector3[] = [];
    points.push(start.clone());
    
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();
    direction.normalize();
    
    // Create perpendicular vectors for deviation
    const perpendicular1 = new THREE.Vector3(
      -direction.y,
      direction.x,
      0
    ).normalize();
    const perpendicular2 = new THREE.Vector3().crossVectors(direction, perpendicular1);
    
    // Generate intermediate points with random deviation
    for (let i = 1; i < segments; i++) {
      const t = i / segments;
      const point = new THREE.Vector3().lerpVectors(start, end, t);
      
      // Add random deviation (less at endpoints)
      const deviationAmount = Math.sin(t * Math.PI) * 0.3;
      const deviation1 = (Math.random() - 0.5) * deviationAmount;
      const deviation2 = (Math.random() - 0.5) * deviationAmount;
      
      point.add(perpendicular1.clone().multiplyScalar(deviation1));
      point.add(perpendicular2.clone().multiplyScalar(deviation2));
      
      points.push(point);
    }
    
    points.push(end.clone());
    return points;
  };

  return (
    <group ref={linesRef}>
      {connections.map((connection, index) => {
        const points = generateLightningPath(connection.start, connection.end);
        
        return (
          <React.Fragment key={index}>
            {/* Main lightning bolt */}
            <Line
              points={points}
              color="#00D9FF"
              lineWidth={connection.strength * 2}
              transparent
              opacity={connection.strength * 0.8}
            />
            
            {/* Glow effect */}
            <Line
              points={points}
              color="#FFFFFF"
              lineWidth={connection.strength * 0.5}
              transparent
              opacity={connection.strength * 0.5}
            />
            
            {/* Branching effect for strong connections */}
            {connection.strength > 0.7 && Math.random() > 0.5 && (
              <Line
                points={generateLightningPath(
                  points[Math.floor(points.length / 2)],
                  points[Math.floor(points.length / 2)].clone().add(
                    new THREE.Vector3(
                      (Math.random() - 0.5) * 2,
                      (Math.random() - 0.5) * 2,
                      (Math.random() - 0.5) * 2
                    )
                  ),
                  4
                )}
                color="#FF00FF"
                lineWidth={connection.strength * 0.5}
                transparent
                opacity={connection.strength * 0.3}
              />
            )}
          </React.Fragment>
        );
      })}
    </group>
  );
}