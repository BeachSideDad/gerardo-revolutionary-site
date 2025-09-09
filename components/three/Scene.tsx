'use client';

import { Canvas } from '@react-three/fiber';
import { Preload, Stats, PerformanceMonitor, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import { Suspense, useState } from 'react';

export default function Scene({ children }: { children: React.ReactNode }) {
  const [dpr, setDpr] = useState(1.5);
  
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      gl={{ 
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        preserveDrawingBuffer: false,
        stencil: false
      }}
      dpr={dpr}
      className="absolute inset-0"
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <PerformanceMonitor
          factor={0.75}
          bounds={(refreshrate) => [50, refreshrate]}
          onDecline={(fps) => {
            setDpr(Math.max(0.5, dpr - 0.25));
            console.log('Performance decline detected, reducing DPR to:', Math.max(0.5, dpr - 0.25));
          }}
          onIncline={(fps) => {
            setDpr(Math.min(2, dpr + 0.1));
            console.log('Performance improvement detected, increasing DPR to:', Math.min(2, dpr + 0.1));
          }}
        >
          {/* Lighting Setup */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color="#00D9FF" />
          
          {/* Content */}
          {children}
        </PerformanceMonitor>
      </Suspense>
      <Preload all />
      {process.env.NODE_ENV === 'development' && <Stats />}
    </Canvas>
  );
}