'use client';

import React, { useRef, useState, useEffect, MouseEvent } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import styles from './MagneticButton.module.css';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  magneticStrength?: number;
  particleBurst?: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  life: number;
}

export function MagneticButton({
  children,
  className = '',
  onClick,
  magneticStrength = 30,
  particleBurst = true
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Spring animations for smooth movement
  const springConfig = { damping: 15, stiffness: 150 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);
  const scale = useSpring(1, springConfig);
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);
  
  // Transform values for 3D effect
  const transform = useTransform(
    [x, y, scale, rotateX, rotateY],
    ([latestX, latestY, latestScale, latestRotateX, latestRotateY]) =>
      `translate3d(${latestX}px, ${latestY}px, 10px) scale(${latestScale}) rotateX(${latestRotateX}deg) rotateY(${latestRotateY}deg)`
  );

  // Handle mouse movement for magnetic effect
  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !isHovered) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;
    
    // Calculate distance from center
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    const maxDistance = 120; // Activation radius
    
    if (distance < maxDistance) {
      // Apply magnetic pull
      const pullStrength = 1 - (distance / maxDistance);
      const moveX = (distanceX / distance) * magneticStrength * pullStrength;
      const moveY = (distanceY / distance) * magneticStrength * pullStrength;
      
      x.set(moveX);
      y.set(moveY);
      
      // 3D rotation based on mouse position
      rotateY.set((distanceX / rect.width) * 5);
      rotateX.set(-(distanceY / rect.height) * 5);
      
      setMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    scale.set(1.08);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
    scale.set(1);
    rotateX.set(0);
    rotateY.set(0);
  };

  // Create particle burst on click
  const createParticleBurst = (e: MouseEvent<HTMLButtonElement>) => {
    if (!particleBurst || !buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const newParticles: Particle[] = [];
    const particleCount = 35;
    const colors = ['#00D9FF', '#FF00FF', '#00FF88'];
    const shapes = ['circle', 'triangle', 'star'];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
      const velocity = 5 + Math.random() * 10;
      
      newParticles.push({
        id: Date.now() + i,
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: 2 + Math.random() * 6,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: -360 + Math.random() * 720,
        life: 1.0
      });
    }
    
    setParticles(prev => [...prev, ...newParticles]);
  };

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    // Immediate scale feedback
    scale.set(0.95);
    setTimeout(() => scale.set(1.1), 80);
    setTimeout(() => scale.set(1), 300);
    
    createParticleBurst(e);
    onClick?.();
  };

  // Animate particles
  useEffect(() => {
    if (particles.length === 0) return;
    
    const interval = setInterval(() => {
      setParticles(prev => {
        return prev
          .map(particle => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.2, // Gravity
            vx: particle.vx * 0.98, // Friction
            rotation: particle.rotation + particle.rotationSpeed * 0.016,
            life: particle.life - 0.02
          }))
          .filter(particle => particle.life > 0);
      });
    }, 16);
    
    return () => clearInterval(interval);
  }, [particles.length]);

  return (
    <>
      <motion.button
        ref={buttonRef}
        className={`${styles.magneticButton} ${className}`}
        style={{ transform }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <div 
          className={styles.glowEffect}
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, 
              rgba(0, 217, 255, 0.5) 0%, 
              transparent 50%)`
          }}
        />
        
        {/* Button content */}
        <span className={styles.buttonContent}>
          {children}
        </span>
        
        {/* Ripple effect */}
        <span className={styles.ripple} />
      </motion.button>
      
      {/* Particle container */}
      <div className={styles.particleContainer}>
        {particles.map(particle => (
          <div
            key={particle.id}
            className={styles.particle}
            style={{
              left: particle.x,
              top: particle.y,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              transform: `rotate(${particle.rotation}deg)`,
              opacity: particle.life,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`
            }}
          />
        ))}
      </div>
    </>
  );
}