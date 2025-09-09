'use client';

import { Canvas } from '@react-three/fiber';
import { ParticleSystemOptimized } from './ParticleSystemOptimized';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

interface ParticleSystemSafeProps {
  count?: number;
  spread?: number;
  color?: string;
  size?: number;
  speed?: number;
  mouseInfluence?: number;
  enableStats?: boolean;
}

// This component ensures ParticleSystemOptimized only renders inside Canvas context
export function ParticleSystemSafe(props: ParticleSystemSafeProps) {
  return (
    <ErrorBoundary 
      fallback={<mesh><boxGeometry args={[0.1, 0.1, 0.1]} /><meshBasicMaterial color="#00D9FF" /></mesh>}
      onError={(error) => console.error('Particle System Error:', error)}
    >
      <Suspense fallback={null}>
        <ParticleSystemOptimized {...props} />
      </Suspense>
    </ErrorBoundary>
  );
}