'use client';

import React, { useRef, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';

interface AccessibleCanvasProps {
  children: React.ReactNode;
  ariaLabel: string;
  className?: string;
  [key: string]: any;
}

export function AccessibleCanvas({ 
  children, 
  ariaLabel, 
  className = '',
  ...props 
}: AccessibleCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [announcement, setAnnouncement] = useState('');
  const [isWebGLSupported, setIsWebGLSupported] = useState(true);
  
  useEffect(() => {
    // Check WebGL support only on client
    if (typeof document !== 'undefined') {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      setIsWebGLSupported(!!gl);
      
      if (!gl) {
        setAnnouncement('3D visualization requires WebGL support. Please use a modern browser.');
      }
    }
  }, []);
  
  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch(e.key) {
      case 'Enter':
      case ' ':
        setAnnouncement('Interactive 3D scene activated. Use arrow keys to navigate.');
        break;
      case 'Escape':
        setAnnouncement('Exited 3D scene interaction.');
        if (containerRef.current) {
          containerRef.current.blur();
        }
        break;
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        setAnnouncement(`Moving ${e.key.replace('Arrow', '').toLowerCase()}`);
        break;
      case '?':
        setAnnouncement('Help: Use arrow keys to navigate, Space to interact, Escape to exit.');
        break;
    }
  };
  
  if (!isWebGLSupported) {
    return (
      <div 
        className={`${className} flex items-center justify-center bg-gray-900 text-white`}
        role="img"
        aria-label={ariaLabel}
      >
        <div className="text-center p-8">
          <h3 className="text-xl font-bold mb-4">3D Visualization Not Available</h3>
          <p className="text-gray-400">
            Your browser doesn&apos;t support WebGL, which is required for 3D graphics.
            Please use a modern browser like Chrome, Firefox, Safari, or Edge.
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div 
      ref={containerRef}
      className={`${className} relative`}
      role="application"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-describedby="canvas-description"
    >
      {/* Screen reader announcements */}
      <div 
        className="sr-only" 
        role="status" 
        aria-live="polite" 
        aria-atomic="true"
      >
        {announcement}
      </div>
      
      {/* Hidden description for screen readers */}
      <div id="canvas-description" className="sr-only">
        This is an interactive 3D visualization. Press Enter or Space to interact with the scene.
        Use arrow keys to navigate. Press ? for help or Escape to exit interaction mode.
      </div>
      
      {/* Skip link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 bg-blue-600 text-white px-4 py-2 rounded z-50"
      >
        Skip 3D visualization
      </a>
      
      <Canvas {...props}>
        {children}
      </Canvas>
      
      {/* Visual keyboard instructions */}
      <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-3 py-2 rounded pointer-events-none">
        Press ? for controls
      </div>
    </div>
  );
}