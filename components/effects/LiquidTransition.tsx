'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './LiquidTransition.module.css';

interface LiquidTransitionProps {
  isTransitioning: boolean;
  onComplete?: () => void;
  origin?: { x: number; y: number };
  children?: React.ReactNode;
}

export function LiquidTransition({ 
  isTransitioning, 
  onComplete, 
  origin = { x: 50, y: 50 },
  children 
}: LiquidTransitionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [particles, setParticles] = useState<Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    life: number;
  }>>([]);

  // Liquid morph animation variants
  const liquidVariants = {
    initial: {
      clipPath: `circle(150% at ${origin.x}% ${origin.y}%)`,
      filter: 'blur(0px)',
    },
    exit: {
      clipPath: `circle(0% at ${origin.x}% ${origin.y}%)`,
      filter: 'blur(10px)',
      transition: {
        duration: 0.8,
        ease: [0.75, -0.5, 0.25, 1.5], // Mercury drop easing
      }
    },
    enter: {
      clipPath: `circle(150% at ${origin.x}% ${origin.y}%)`,
      filter: 'blur(0px)',
      transition: {
        duration: 1.0,
        ease: [0.87, 0, 0.13, 1], // Surface tension easing
      }
    }
  };

  // Particle dissolve effect
  useEffect(() => {
    if (!isTransitioning || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Generate particles for dissolution effect
    const newParticles = [];
    const particleCount = 500;
    
    for (let i = 0; i < particleCount; i++) {
      const angle = (Math.PI * 2 * i) / particleCount;
      const velocity = 5 + Math.random() * 10;
      
      newParticles.push({
        x: (origin.x / 100) * canvas.width,
        y: (origin.y / 100) * canvas.height,
        vx: Math.cos(angle) * velocity,
        vy: Math.sin(angle) * velocity,
        size: Math.random() * 4 + 1,
        color: `hsl(${180 + Math.random() * 60}, 100%, 50%)`, // Cyan to purple
        life: 1.0
      });
    }
    
    setParticles(newParticles);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      newParticles.forEach((particle, index) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.2; // Gravity
        particle.vx *= 0.98; // Friction
        particle.life -= 0.02;
        
        if (particle.life > 0) {
          ctx.save();
          ctx.globalAlpha = particle.life;
          ctx.fillStyle = particle.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = particle.color;
          
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      });
      
      // Remove dead particles
      const aliveParticles = newParticles.filter(p => p.life > 0);
      
      if (aliveParticles.length > 0) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        onComplete?.();
      }
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isTransitioning, origin, onComplete]);

  // Liquid distortion mesh
  const generateLiquidPath = () => {
    const points = 8;
    const path = [];
    const time = Date.now() * 0.001;
    
    for (let i = 0; i < points; i++) {
      const angle = (i / points) * Math.PI * 2;
      const radius = 100 + Math.sin(time * 2 + i) * 20;
      const x = 50 + Math.cos(angle) * radius;
      const y = 50 + Math.sin(angle) * radius;
      
      if (i === 0) {
        path.push(`M ${x} ${y}`);
      } else {
        const prevAngle = ((i - 1) / points) * Math.PI * 2;
        const cx1 = 50 + Math.cos(prevAngle + 0.2) * (radius + 10);
        const cy1 = 50 + Math.sin(prevAngle + 0.2) * (radius + 10);
        const cx2 = 50 + Math.cos(angle - 0.2) * (radius + 10);
        const cy2 = 50 + Math.sin(angle - 0.2) * (radius + 10);
        
        path.push(`C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`);
      }
    }
    
    path.push('Z');
    return path.join(' ');
  };

  return (
    <>
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Liquid morph overlay */}
            <motion.div
              className={styles.liquidOverlay}
              initial="initial"
              animate="exit"
              exit="enter"
              variants={liquidVariants}
              style={{
                background: `radial-gradient(circle at ${origin.x}% ${origin.y}%, 
                  rgba(0, 217, 255, 0.3) 0%, 
                  rgba(255, 0, 255, 0.2) 50%, 
                  rgba(0, 255, 136, 0.1) 100%)`
              }}
            />
            
            {/* Particle canvas */}
            <canvas
              ref={canvasRef}
              className={styles.particleCanvas}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9999
              }}
            />
            
            {/* Liquid distortion effect */}
            <svg
              className={styles.liquidSvg}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 9998
              }}
            >
              <defs>
                <filter id="liquid-distortion">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.02"
                    numOctaves="3"
                    result="turbulence"
                  />
                  <feDisplacementMap
                    in="SourceGraphic"
                    in2="turbulence"
                    scale="50"
                    xChannelSelector="R"
                    yChannelSelector="G"
                  />
                  <feGaussianBlur stdDeviation="2" />
                </filter>
              </defs>
            </svg>
          </>
        )}
      </AnimatePresence>
      
      {/* Content wrapper with liquid effect */}
      <motion.div
        className={styles.contentWrapper}
        animate={{
          filter: isTransitioning ? 'url(#liquid-distortion)' : 'none',
        }}
        transition={{ duration: 0.8 }}
      >
        {children}
      </motion.div>
    </>
  );
}