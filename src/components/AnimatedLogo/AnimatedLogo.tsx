'use client';

import { useState, useEffect, useRef } from 'react';
import './AnimatedLogo.css';

interface AnimatedLogoProps {
  onLoadComplete?: () => void;
  isLoading?: boolean;
}

export default function AnimatedLogo({ 
  onLoadComplete, 
  isLoading = false
}: AnimatedLogoProps) {
  const [stage, setStage] = useState<'center' | 'corner'>('center');
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<SVGSVGElement | null>(null);
  
  // Handle loading completion
  useEffect(() => {
    if (!isLoading && stage === 'center') {
      // Add a small delay before transitioning to corner
      const timer = setTimeout(() => {
        setStage('corner');
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, stage]);
  
  // Handle animation end
  useEffect(() => {
    if (stage === 'corner' && !animationComplete) {
      const timer = setTimeout(() => {
        setAnimationComplete(true);
        if (onLoadComplete) onLoadComplete();
      }, 1000); // Wait for animation to complete
      
      return () => clearTimeout(timer);
    }
  }, [stage, animationComplete, onLoadComplete]);
  
  // Generate particles for loading animation
  useEffect(() => {
    if (!containerRef.current || stage !== 'center' || !isLoading) return;
    
    const container = containerRef.current;
    const particleCount = 20;
    
    // Remove existing particles
    const existingParticles = container.querySelectorAll('.logo-particle');
    existingParticles.forEach(particle => particle.remove());
    
    // Create new particles
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'logo-particle';
      
      // Random position and size
      const size = Math.random() * 10 + 5;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Random position around the logo
      const angle = Math.random() * Math.PI * 2;
      const distance = 70 + Math.random() * 100;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance;
      
      particle.style.left = `calc(50% + ${x}px)`;
      particle.style.top = `calc(50% + ${y}px)`;
      
      // Random animation duration
      const duration = 1 + Math.random() * 2;
      particle.style.animation = `float ${duration}s infinite ease-in-out ${Math.random() * 2}s`;
      
      container.appendChild(particle);
    }
    
    return () => {
      existingParticles.forEach(particle => particle.remove());
    };
  }, [isLoading, stage]);
  
  // Create pulse effect for glow
  useEffect(() => {
    if (!glowRef.current || stage !== 'center' || !isLoading) return;
    
    const glow = glowRef.current;
    let scale = 1;
    let growing = false;
    let animationFrameId: number;
    
    const animateGlow = () => {
      if (growing) {
        scale += 0.01;
        if (scale >= 1.2) growing = false;
      } else {
        scale -= 0.01;
        if (scale <= 0.8) growing = true;
      }
      
      glow.style.transform = `scale(${scale})`;
      animationFrameId = requestAnimationFrame(animateGlow);
    };
    
    animateGlow();
    
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isLoading, stage]);
  
  // Animate SVG logo paths when in center position
  useEffect(() => {
    if (!logoRef.current || stage !== 'center') return;
    
    const logo = logoRef.current;
    const paths = logo.querySelectorAll('path');
    
    // Animate paths
    paths.forEach((path, index) => {
      const length = path.getTotalLength();
      
      // Set up the starting position
      path.style.strokeDasharray = length.toString();
      path.style.strokeDashoffset = length.toString();
      
      // Trigger a layout recalculation
      path.getBoundingClientRect();
      
      // Define the animation
      path.style.transition = `stroke-dashoffset 1.5s ease-in-out ${index * 0.2}s`;
      path.style.strokeDashoffset = '0';
    });
  }, [stage]);
  
  return (
    <div 
      className={`animated-logo-container ${stage === 'corner' ? 'corner-position' : 'center-position'}`}
      ref={containerRef}
    >
      <div className="logo-glow" ref={glowRef}></div>
      <div className={`logo-content ${stage === 'corner' ? 'corner' : 'center'}`}>
        <svg 
          ref={logoRef}
          className="logo-svg" 
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Abstract geometric logo */}
          <path className="logo-path logo-path-1" d="M100,20 L40,100 L100,180 L160,100 Z" />
          <path className="logo-path logo-path-2" d="M100,40 L60,100 L100,160 L140,100 Z" />
          <path className="logo-path logo-path-3" d="M100,60 L80,100 L100,140 L120,100 Z" />
          <circle className="logo-circle" cx="100" cy="100" r="10" />
        </svg>
      </div>
      {stage === 'center' && isLoading && (
        <div className="loading-indicator">
          <span className="loading-dot" style={{ animationDelay: '0s' }}></span>
          <span className="loading-dot" style={{ animationDelay: '0.2s' }}></span>
          <span className="loading-dot" style={{ animationDelay: '0.4s' }}></span>
        </div>
      )}
    </div>
  );
} 