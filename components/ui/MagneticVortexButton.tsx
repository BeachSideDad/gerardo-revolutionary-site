'use client';

import { useRef, useState, useEffect, MouseEvent, TouchEvent } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import styles from './MagneticVortexButton.module.css';

interface MagneticVortexButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  intensity?: number;
  href?: string;
  className?: string;
  soundEnabled?: boolean;
}

export function MagneticVortexButton({
  children,
  onClick,
  variant = 'primary',
  intensity = 0.8,
  href,
  className = '',
  soundEnabled = true
}: MagneticVortexButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [particlesNearby, setParticlesNearby] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; id: number }>>([]);
  
  // Spring animations
  const scale = useSpring(isPressed ? 0.9 : isHovering ? 1.05 : 1, {
    stiffness: 300,
    damping: 20
  });
  
  const glow = useSpring(isHovering ? 1 : 0, {
    stiffness: 200,
    damping: 30
  });
  
  const distortion = useTransform(
    glow,
    [0, 1],
    ['0px', `${intensity * 10}px`]
  );
  
  // Handle mouse movement for vortex effect
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!buttonRef.current || !isHovering) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    
    setMousePosition({ x, y });
    
    // Simulate particle attraction
    const distance = Math.sqrt(x * x + y * y);
    const attracted = Math.floor((1 - Math.min(distance, 1)) * 20);
    setParticlesNearby(attracted);
  };
  
  // Handle hover states
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (soundEnabled) {
      window.dispatchEvent(new CustomEvent('sound:vortex:start'));
    }
    
    // Start particle attraction animation
    window.dispatchEvent(new CustomEvent('particles:attract', {
      detail: { 
        target: buttonRef.current?.getBoundingClientRect(),
        intensity 
      }
    }));
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setParticlesNearby(0);
    if (soundEnabled) {
      window.dispatchEvent(new CustomEvent('sound:vortex:end'));
    }
    
    // Release particles
    window.dispatchEvent(new CustomEvent('particles:release'));
  };
  
  // Handle click with explosion effect
  const handleClick = (e: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => {
    setIsPressed(true);
    
    // Get click position for ripple
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      let x, y;
      if ('touches' in e) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
      } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
      }
      
      // Add ripple
      const rippleId = Date.now();
      setRipples(prev => [...prev, { x, y, id: rippleId }]);
      
      // Remove ripple after animation
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== rippleId));
      }, 800);
    }
    
    // Trigger effects
    if (soundEnabled) {
      window.dispatchEvent(new CustomEvent('sound:impact:heavy'));
    }
    
    // Shockwave
    window.dispatchEvent(new CustomEvent('particles:explode', {
      detail: { 
        origin: buttonRef.current?.getBoundingClientRect(),
        force: intensity 
      }
    }));
    
    // Screen flash
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 100);
    
    // Reset pressed state
    setTimeout(() => setIsPressed(false), 200);
    
    // Call onClick handler
    if (onClick) {
      onClick();
    }
  };
  
  // Component content
  const buttonContent = (
    <>
      {/* Background layers */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        {/* Base gradient */}
        <motion.div 
          className={`absolute inset-0 ${
            variant === 'primary' 
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600'
              : variant === 'secondary'
              ? 'bg-gradient-to-r from-purple-500 to-pink-600'
              : 'bg-transparent'
          }`}
          style={{ scale }}
        />
        
        {/* Glow effect */}
        <motion.div 
          className="absolute inset-0 bg-white rounded-full blur-xl"
          style={{ 
            opacity: glow,
            scale: useTransform(glow, [0, 1], [0.8, 1.2])
          }}
        />
        
        {/* Ripples */}
        {ripples.map(ripple => (
          <span
            key={ripple.id}
            className="absolute inline-block bg-white rounded-full animate-ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
        
        {/* Particle orbit visualization */}
        {isHovering && particlesNearby > 0 && (
          <div className="absolute inset-0 animate-spin-slow">
            {Array.from({ length: particlesNearby }).map((_, i) => (
              <span
                key={i}
                className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                style={{
                  left: `${50 + Math.cos(i * 0.5) * 40}%`,
                  top: `${50 + Math.sin(i * 0.5) * 40}%`,
                  animation: `orbit ${2 + i * 0.1}s linear infinite`
                }}
              />
            ))}
          </div>
        )}
        
        {/* Distortion overlay */}
        <div 
          className="absolute inset-0 backdrop-blur-sm"
          style={{ 
            filter: `blur(${distortion})`,
            transform: `scale(${isHovering ? 1.1 : 1})` 
          }}
        />
      </div>
      
      {/* Button content */}
      <span className={`relative z-10 flex items-center justify-center px-10 py-5 font-semibold ${
        variant === 'ghost' ? 'text-cyan-400' : 'text-white'
      }`}>
        {children}
      </span>
      
      {/* Border for non-primary variants */}
      {variant !== 'primary' && (
        <motion.div 
          className={`absolute inset-0 rounded-full border-2 ${
            variant === 'secondary' ? 'border-purple-400' : 'border-cyan-400'
          }`}
          style={{ 
            scale,
            opacity: useTransform(glow, [0, 1], [1, 0.5])
          }}
        />
      )}
    </>
  );
  
  // Render as link or button
  const Component = href ? 'a' : 'button';
  const props = {
    ref: buttonRef as any,
    href,
    onClick: handleClick as any,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onMouseMove: handleMouseMove,
    className: `group relative inline-flex items-center justify-center overflow-hidden rounded-full transition-none ${className}`,
    style: { touchAction: 'manipulation' }
  };
  
  return (
    <motion.div
      animate={{ scale: scale.get() }}
      className="relative inline-block"
    >
      {Component === 'a' ? (
        <a {...props}>{buttonContent}</a>
      ) : (
        <button {...props}>{buttonContent}</button>
      )}
    </motion.div>
  );
}