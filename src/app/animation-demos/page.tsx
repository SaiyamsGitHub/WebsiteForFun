'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import HamburgerMenu from '../../components/HamburgerMenu/HamburgerMenu';
import './animation-demos.css';

export default function AnimationDemos() {
  const [isClient, setIsClient] = useState(false);
  const [activeDemo, setActiveDemo] = useState('3d-card-flip');
  
  // Refs for interactive elements
  const morphingShapeRef = useRef<HTMLDivElement>(null);
  const mouseAreaRef = useRef<HTMLDivElement>(null);
  const mouseHighlightRef = useRef<HTMLDivElement>(null);
  const mouseCursorRef = useRef<HTMLDivElement>(null);
  const mouseCardRef = useRef<HTMLDivElement>(null);
  const liquidMorphRef = useRef<HTMLDivElement>(null);
  const kineticTextRef = useRef<HTMLDivElement>(null);
  const perspectiveCardRef = useRef<HTMLDivElement>(null);
  const perspectiveCardContainerRef = useRef<HTMLDivElement>(null);
  const foldEffectRef = useRef<HTMLDivElement>(null);
  const staggerRevealRef = useRef<HTMLDivElement>(null);
  const magneticButtonRef = useRef<HTMLDivElement>(null);
  const holographicCardRef = useRef<HTMLDivElement>(null);
  const rippleTextRef = useRef<HTMLDivElement>(null);
  const pixelShaderRef = useRef<HTMLCanvasElement>(null);
  const maskAnimationRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // For morphing shape interaction
  useEffect(() => {
    if (!isClient || activeDemo !== 'morphing') return;
    
    const shape = morphingShapeRef.current;
    if (!shape) return;
    
    const handleCircleClick = () => {
      shape.className = 'morphing-shape circle';
    };
    
    const handleSquareClick = () => {
      shape.className = 'morphing-shape square';
    };
    
    const handleTriangleClick = () => {
      shape.className = 'morphing-shape triangle';
    };
    
    const handleStarClick = () => {
      shape.className = 'morphing-shape star';
    };
    
    // Add event listeners
    const circleBtn = document.querySelector('.morph-circle');
    const squareBtn = document.querySelector('.morph-square');
    const triangleBtn = document.querySelector('.morph-triangle');
    const starBtn = document.querySelector('.morph-star');
    
    circleBtn?.addEventListener('click', handleCircleClick);
    squareBtn?.addEventListener('click', handleSquareClick);
    triangleBtn?.addEventListener('click', handleTriangleClick);
    starBtn?.addEventListener('click', handleStarClick);
    
    // Cleanup
    return () => {
      circleBtn?.removeEventListener('click', handleCircleClick);
      squareBtn?.removeEventListener('click', handleSquareClick);
      triangleBtn?.removeEventListener('click', handleTriangleClick);
      starBtn?.removeEventListener('click', handleStarClick);
    };
  }, [isClient, activeDemo]);
  
  // For mouse follow functionality
  useEffect(() => {
    if (!isClient || activeDemo !== 'mouse-follow') return;
    
    const mouseArea = mouseAreaRef.current;
    const mouseHighlight = mouseHighlightRef.current;
    const mouseCursor = mouseCursorRef.current;
    const mouseCard = mouseCardRef.current;
    
    if (!mouseArea || !mouseHighlight || !mouseCursor || !mouseCard) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = mouseArea.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Move cursor follower
      mouseCursor.style.left = `${x}px`;
      mouseCursor.style.top = `${y}px`;
      
      // Move highlight
      mouseHighlight.style.left = `${x}px`;
      mouseHighlight.style.top = `${y}px`;
      
      // Tilt card based on mouse position
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateY = (x - centerX) / 20;
      const rotateX = (centerY - y) / 20;
      
      mouseCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    };
    
    const handleMouseLeave = () => {
      mouseCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    };
    
    mouseArea.addEventListener('mousemove', handleMouseMove);
    mouseArea.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      mouseArea.removeEventListener('mousemove', handleMouseMove);
      mouseArea.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isClient, activeDemo]);
  
  // For parallax effect
  useEffect(() => {
    if (!isClient || activeDemo !== 'parallax') return;
    
    const parallaxContainer = document.querySelector<HTMLElement>('.demo-parallax');
    const parallaxBg = document.querySelector<HTMLElement>('.parallax-background');
    const parallaxMid = document.querySelector<HTMLElement>('.parallax-midground');
    
    if (!parallaxContainer || !parallaxBg || !parallaxMid) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = parallaxContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const moveX = (x - rect.width / 2) / 30;
      const moveY = (y - rect.height / 2) / 30;
      
      parallaxBg.setAttribute('style', `transform: translateZ(-100px) scale(1.4) translateX(${-moveX}px) translateY(${-moveY}px)`);
      parallaxMid.setAttribute('style', `transform: translateZ(-50px) scale(1.2) translateX(${-moveX * 2}px) translateY(${-moveY * 2}px)`);
    };
    
    parallaxContainer.addEventListener('mousemove', handleMouseMove);
    
    // Cleanup
    return () => {
      parallaxContainer.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isClient, activeDemo]);
  
  // For 3D cube rotation
  useEffect(() => {
    if (!isClient || activeDemo !== '3d-rotation') return;
    
    const rotationContainer = document.querySelector<HTMLElement>('.demo-3d-rotation');
    const cube = document.querySelector<HTMLElement>('.rotating-cube');
    
    if (!rotationContainer || !cube) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = rotationContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const rotateY = ((x - rect.width / 2) / rect.width) * 180;
      const rotateX = ((y - rect.height / 2) / rect.height) * 180;
      
      cube.setAttribute('style', `transform: rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`);
    };
    
    const handleMouseLeave = () => {
      // Reset to auto-rotation
      cube.removeAttribute('style');
    };
    
    rotationContainer.addEventListener('mousemove', handleMouseMove);
    rotationContainer.addEventListener('mouseleave', handleMouseLeave);
    
    // Cleanup
    return () => {
      rotationContainer.removeEventListener('mousemove', handleMouseMove);
      rotationContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isClient, activeDemo]);
  
  // For liquid morphing animation
  useEffect(() => {
    if (!isClient || activeDemo !== 'advanced-morphing') return;
    
    const liquidMorph = liquidMorphRef.current;
    if (!liquidMorph) return;
    
    let animationFrameId: number;
    let phase = 0;
    
    const animate = () => {
      phase += 0.005;
      
      // Create a dynamic border-radius that changes over time
      const topLeft = 50 + 25 * Math.sin(phase);
      const topRight = 50 + 25 * Math.sin(phase + 1);
      const bottomRight = 50 + 25 * Math.sin(phase + 2);
      const bottomLeft = 50 + 25 * Math.sin(phase + 3);
      
      liquidMorph.style.borderRadius = `${topLeft}% ${topRight}% ${bottomRight}% ${bottomLeft}%`;
      
      // Also change the background color hue
      const hue = (180 + 30 * Math.sin(phase * 0.5)) % 360;
      liquidMorph.style.background = `linear-gradient(45deg, hsl(${hue}, 100%, 65%), hsl(${hue + 60}, 100%, 70%))`;
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isClient, activeDemo]);
  
  // For kinetic typography effect
  useEffect(() => {
    if (!isClient || activeDemo !== 'kinetic-typography') return;
    
    const textContainer = kineticTextRef.current;
    if (!textContainer) return;
    
    const letters = textContainer.querySelectorAll('.kinetic-letter');
    
    let animationFrameId: number;
    let time = 0;
    
    const animate = () => {
      time += 0.01;
      
      letters.forEach((letter, index) => {
        const elem = letter as HTMLElement;
        const offset = index * 0.1;
        
        // Create wave motion
        const y = Math.sin(time + offset) * 15;
        
        // Create rotation based on position
        const rotate = Math.sin(time + offset) * 10;
        
        // Create scale effect
        const scale = 1 + 0.2 * Math.sin(time + offset + 1);
        
        elem.style.transform = `translateY(${y}px) rotate(${rotate}deg) scale(${scale})`;
        
        // Change color
        const hue = (index * 10 + time * 20) % 360;
        elem.style.color = `hsl(${hue}, 80%, 70%)`;
      });
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isClient, activeDemo]);
  
  // For 3D perspective card with lighting effect
  useEffect(() => {
    if (!isClient || activeDemo !== '3d-perspective') return;
    
    const container = perspectiveCardContainerRef.current;
    const card = perspectiveCardRef.current;
    
    if (!container || !card) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      
      // Calculate mouse position relative to container (0-1)
      const mouseX = (e.clientX - rect.left) / rect.width;
      const mouseY = (e.clientY - rect.top) / rect.height;
      
      // Calculate rotation (from -15 to 15 degrees)
      const rotateY = (mouseX - 0.5) * 30;
      const rotateX = (0.5 - mouseY) * 30;
      
      // Apply transforms
      card.style.transform = `
        perspective(1000px) 
        rotateX(${rotateX}deg) 
        rotateY(${rotateY}deg)
        scale3d(1.05, 1.05, 1.05)
      `;
      
      // Add dynamic lighting based on mouse position
      // Create highlight position
      const lightX = mouseX * 100;
      const lightY = mouseY * 100;
      
      // Update the light position using CSS variables
      card.style.setProperty('--light-position-x', `${lightX}%`);
      card.style.setProperty('--light-position-y', `${lightY}%`);
      
      // Calculate the light intensity based on distance from mouse
      const distX = mouseX - 0.5;
      const distY = mouseY - 0.5;
      const distance = Math.sqrt(distX * distX + distY * distY);
      const lightIntensity = 1 - Math.min(distance * 2, 0.8);
      
      card.style.setProperty('--light-intensity', `${lightIntensity}`);
    };
    
    const handleMouseLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      card.style.setProperty('--light-position-x', '50%');
      card.style.setProperty('--light-position-y', '50%');
      card.style.setProperty('--light-intensity', '0.5');
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    // Initial light position
    card.style.setProperty('--light-position-x', '50%');
    card.style.setProperty('--light-position-y', '50%');
    card.style.setProperty('--light-intensity', '0.5');
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isClient, activeDemo]);
  
  // For 3D fold effect
  useEffect(() => {
    if (!isClient || activeDemo !== '3d-fold') return;
    
    const foldEffect = foldEffectRef.current;
    if (!foldEffect) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = foldEffect.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      
      // Calculate fold angle based on mouse position
      const maxAngle = 60; // Maximum fold angle
      const foldAngleX = (0.5 - y) * maxAngle;
      const foldAngleY = (x - 0.5) * maxAngle;
      
      // Apply fold transformations
      const panels = foldEffect.querySelectorAll('.fold-panel');
      panels.forEach((panel, index) => {
        const panelElem = panel as HTMLElement;
        
        // Create different intensities based on panel position
        const intensity = (index + 1) / panels.length;
        const panelTransform = `
          translateZ(${intensity * 50}px)
          rotateX(${foldAngleX * intensity}deg)
          rotateY(${foldAngleY * intensity}deg)
        `;
        
        panelElem.style.transform = panelTransform;
        
        // Adjust shadow based on fold angle
        const shadowOpacity = Math.abs(foldAngleX) / 100 + Math.abs(foldAngleY) / 100;
        panelElem.style.boxShadow = `0 ${10 * intensity}px ${30 * intensity}px rgba(0, 0, 0, ${shadowOpacity + 0.1})`;
      });
    };
    
    const handleMouseLeave = () => {
      const panels = foldEffect.querySelectorAll('.fold-panel');
      panels.forEach(panel => {
        const panelElem = panel as HTMLElement;
        panelElem.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
        panelElem.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
      });
    };
    
    foldEffect.addEventListener('mousemove', handleMouseMove);
    foldEffect.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      foldEffect.removeEventListener('mousemove', handleMouseMove);
      foldEffect.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isClient, activeDemo]);
  
  // For staggered text/element reveal
  useEffect(() => {
    if (!isClient || activeDemo !== 'stagger-reveal') return;
    
    const staggerContainer = staggerRevealRef.current;
    if (!staggerContainer) return;
    
    const revealElements = () => {
      const elements = staggerContainer.querySelectorAll('.stagger-item');
      
      elements.forEach((element, index) => {
        const elem = element as HTMLElement;
        
        // Calculate staggered delay
        const delay = index * 100; // 100ms delay between each item
        
        // Set initial state
        elem.style.opacity = '0';
        elem.style.transform = 'translateY(30px)';
        
        // Trigger animation with staggered delay
        setTimeout(() => {
          elem.style.opacity = '1';
          elem.style.transform = 'translateY(0)';
        }, delay);
      });
    };
    
    // Reset the animation when switching to this demo
    const resetElements = () => {
      const elements = staggerContainer.querySelectorAll('.stagger-item');
      elements.forEach(element => {
        const elem = element as HTMLElement;
        elem.style.opacity = '0';
        elem.style.transform = 'translateY(30px)';
      });
    };
    
    const resetButton = staggerContainer.querySelector('.stagger-reset');
    
    resetButton?.addEventListener('click', () => {
      resetElements();
      setTimeout(revealElements, 300);
    });
    
    // Initial reveal
    setTimeout(revealElements, 500);
    
    return () => {
      resetButton?.removeEventListener('click', resetElements);
    };
  }, [isClient, activeDemo]);
  
  // For magnetic button effect
  useEffect(() => {
    if (!isClient || activeDemo !== 'magnetic-btn') return;
    
    const magneticButton = magneticButtonRef.current;
    if (!magneticButton) return;
    
    const btn = magneticButton.querySelector('.magnetic-btn');
    if (!btn) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const btnWidth = rect.width;
      const btnHeight = rect.height;
      
      // Calculate mouse position relative to button center
      const btnX = rect.left + btnWidth / 2;
      const btnY = rect.top + btnHeight / 2;
      
      // Calculate distance from center (0-1)
      const distanceX = (e.clientX - btnX) / (btnWidth / 2);
      const distanceY = (e.clientY - btnY) / (btnHeight / 2);
      
      // Maximum movement in pixels
      const maxMovement = 15;
      
      // Apply magnetic effect (move toward mouse)
      const moveX = distanceX * maxMovement;
      const moveY = distanceY * maxMovement;
      
      // Apply transforms
      btn.setAttribute('style', `
        transform: translate(${moveX}px, ${moveY}px);
        box-shadow: ${-moveX * 0.5}px ${-moveY * 0.5}px 10px rgba(0,0,0,0.2);
      `);
      
      // Optional: Add tilt effect
      const maxTilt = 10;
      const tiltX = -distanceY * maxTilt;
      const tiltY = distanceX * maxTilt;
      
      const btnContent = btn.querySelector('.btn-content') as HTMLElement;
      if (btnContent) {
        btnContent.style.transform = `perspective(500px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
      }
    };
    
    const handleMouseLeave = () => {
      // Reset position and shadow when mouse leaves
      btn.setAttribute('style', `
        transform: translate(0, 0);
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
      `);
      
      const btnContent = btn.querySelector('.btn-content') as HTMLElement;
      if (btnContent) {
        btnContent.style.transform = 'perspective(500px) rotateX(0deg) rotateY(0deg)';
      }
    };
    
    magneticButton.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      magneticButton.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isClient, activeDemo]);
  
  // For holographic card effect
  useEffect(() => {
    if (!isClient || activeDemo !== 'holographic') return;
    
    const holoCard = holographicCardRef.current;
    if (!holoCard) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = holoCard.getBoundingClientRect();
      
      // Calculate mouse position as percentage across card
      const mouseX = (e.clientX - rect.left) / rect.width;
      const mouseY = (e.clientY - rect.top) / rect.height;
      
      // Calculate rotation based on mouse position
      // Mouse in the middle (0.5, 0.5) means no rotation
      const rotateY = (mouseX - 0.5) * 20; // -10 to +10 degrees
      const rotateX = (0.5 - mouseY) * 20; // -10 to +10 degrees
      
      // Update holographic color effect based on angle
      // This creates the rainbow effect as the card tilts
      const hue = (mouseX * 360) % 360;
      const hueRotate = (mouseX * 360 + mouseY * 180) % 360;
      
      // Apply transforms
      holoCard.style.transform = `
        perspective(1000px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        scale3d(1.03, 1.03, 1.03)
      `;
      
      // Apply holographic effect
      holoCard.style.setProperty('--holo-hue', `${hue}`);
      holoCard.style.setProperty('--holo-rotate', `${hueRotate}deg`);
      
      // Change the opacity and position of highlight based on mouse position
      holoCard.style.setProperty('--x-pos', `${mouseX * 100}%`);
      holoCard.style.setProperty('--y-pos', `${mouseY * 100}%`);
    };
    
    const handleMouseLeave = () => {
      // Reset transforms
      holoCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    };
    
    holoCard.addEventListener('mousemove', handleMouseMove);
    holoCard.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      holoCard.removeEventListener('mousemove', handleMouseMove);
      holoCard.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isClient, activeDemo]);
  
  // For ripple wave text effect 
  useEffect(() => {
    if (!isClient || activeDemo !== 'ripple-text') return;
    
    const textContainer = rippleTextRef.current;
    if (!textContainer) return;
    
    const letters = textContainer.querySelectorAll('.ripple-letter');
    let active = false;
    let animationFrameId: number;
    
    const startRipple = (centerIndex: number) => {
      // If already animating, cancel
      if (active) return;
      active = true;
      
      // Calculate distance of each letter from the center letter
      const distances = Array.from(letters).map((_, i) => {
        return Math.abs(i - centerIndex);
      });
      
      // Maximum distance for normalization
      const maxDistance = Math.max(...distances);
      
      // Animation frame counter
      let frame = 0;
      const animate = () => {
        frame++;
        const waveProgress = frame / 30; // 30 frames for a complete wave
        
        // Apply wave effect to each letter
        letters.forEach((letter, i) => {
          const elem = letter as HTMLElement;
          const distanceRatio = distances[i] / maxDistance; // 0 to 1
          const delay = distanceRatio * 0.5; // Delay based on distance
          
          // Calculate wave height based on distance and time
          // Wave formula with dampening based on distance
          const progress = Math.max(0, waveProgress - delay);
          if (progress > 0 && progress < 1) {
            // Sine wave with dampening
            const amplitude = Math.max(0, 1 - distanceRatio * 0.8);
            const wave = Math.sin(progress * Math.PI) * amplitude;
            
            // Apply transformation
            const yOffset = wave * 30; // Maximum 30px up/down movement
            const scale = 1 + wave * 0.3; // Scale between 0.7 and 1.3
            
            elem.style.transform = `translateY(${-yOffset}px) scale(${scale})`;
            
            // Change color based on wave height
            const hue = 240 + wave * 120; // Purple to blue spectrum
            elem.style.color = `hsl(${hue}, 80%, 70%)`;
          } else if (progress >= 1) {
            // Reset after wave passes
            elem.style.transform = 'translateY(0) scale(1)';
            elem.style.color = '';
            
            // If all letters are done, stop animation
            if (i === letters.length - 1 && progress > 1 + maxDistance * 0.5) {
              cancelAnimationFrame(animationFrameId);
              active = false;
              return;
            }
          }
        });
        
        animationFrameId = requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    // Start ripple effect when clicking on letters
    letters.forEach((letter, index) => {
      letter.addEventListener('click', () => {
        if (!active) {
          startRipple(index);
        }
      });
    });
    
    // Initial ripple from center
    const centerIndex = Math.floor(letters.length / 2);
    setTimeout(() => startRipple(centerIndex), 500);
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      letters.forEach(letter => {
        letter.removeEventListener('click', () => {});
      });
    };
  }, [isClient, activeDemo]);
  
  // For pixel shader animation
  useEffect(() => {
    if (!isClient || activeDemo !== 'pixel-shader') return;
    
    const canvas = pixelShaderRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const setCanvasSize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    let animationFrameId: number;
    let time = 0;
    
    // Color palette for the shader
    const colors = [
      '#9d00ff', // Primary purple
      '#a44dff', // Secondary purple
      '#ff7bac', // Pink accent
      '#33007a', // Deep purple
      '#6a11cb', // Medium purple
    ];
    
    const drawPixelShader = () => {
      time += 0.01;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Pixel size
      const pixelSize = 8;
      const cols = Math.ceil(canvas.width / pixelSize);
      const rows = Math.ceil(canvas.height / pixelSize);
      
      // Draw pixelated pattern
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          // Calculate position
          const x = i * pixelSize;
          const y = j * pixelSize;
          
          // Create patterns based on sine waves
          const distanceFromCenter = Math.sqrt(
            Math.pow((i - cols / 2) / (cols / 2), 2) + 
            Math.pow((j - rows / 2) / (rows / 2), 2)
          );
          
          // Create different effects
          const wave1 = Math.sin(distanceFromCenter * 5 - time) * 0.5 + 0.5;
          const wave2 = Math.sin(i / 10 + time) * Math.cos(j / 10 + time) * 0.5 + 0.5;
          const wave3 = Math.sin(distanceFromCenter * 3 + time) * 0.5 + 0.5;
          
          // Combine waves for interesting patterns
          const combinedWave = (wave1 + wave2 + wave3) / 3;
          
          // Choose color based on wave value
          const colorIndex = Math.floor(combinedWave * colors.length);
          ctx.fillStyle = colors[Math.min(colorIndex, colors.length - 1)];
          
          // Add some transparent pixels for effect
          if (Math.random() > 0.95) {
            ctx.globalAlpha = 0.5;
          } else {
            ctx.globalAlpha = 1.0;
          }
          
          // Draw the pixel
          ctx.fillRect(x, y, pixelSize, pixelSize);
        }
      }
      
      animationFrameId = requestAnimationFrame(drawPixelShader);
    };
    
    drawPixelShader();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener('resize', setCanvasSize);
    };
  }, [isClient, activeDemo]);
  
  // For mask animation
  useEffect(() => {
    if (!isClient || activeDemo !== 'mask-animation') return;
    
    const maskContainer = maskAnimationRef.current;
    if (!maskContainer) return;
    
    const maskElements = maskContainer.querySelectorAll('.mask-element');
    const maskText = maskContainer.querySelector('.mask-text') as HTMLElement;
    
    if (!maskText || maskElements.length === 0) return;
    
    // Set up text scramble
    const originalText = maskText.innerText;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    
    const scrambleText = () => {
      let scrambledText = '';
      const progress = (Date.now() % 3000) / 3000; // 3-second cycle
      
      // Gradually reveal original text based on progress
      const revealIndex = Math.floor(progress * originalText.length);
      
      for (let i = 0; i < originalText.length; i++) {
        if (i < revealIndex) {
          // Show original character
          scrambledText += originalText[i];
        } else if (i === revealIndex) {
          // Transitioning character
          const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
          scrambledText += randomChar;
        } else {
          // Random character
          const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
          scrambledText += randomChar;
        }
      }
      
      maskText.innerText = scrambledText;
    };
    
    // Animate mask elements
    let animationFrameId: number;
    let time = 0;
    
    const animateMasks = () => {
      time += 0.01;
      
      // Animate the mask elements
      maskElements.forEach((element, index) => {
        const elem = element as HTMLElement;
        
        // Create different movement patterns for each mask
        const xOffset = Math.sin(time + index) * 20;
        const yOffset = Math.cos(time * 0.7 + index * 0.5) * 15;
        const rotation = Math.sin(time * 0.5 + index * 0.3) * 15;
        const scale = 1 + Math.sin(time * 0.3 + index) * 0.1;
        
        elem.style.transform = `translate(${xOffset}px, ${yOffset}px) rotate(${rotation}deg) scale(${scale})`;
      });
      
      // Update text scramble effect
      scrambleText();
      
      animationFrameId = requestAnimationFrame(animateMasks);
    };
    
    animateMasks();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [isClient, activeDemo]);
  
  if (!isClient) {
    return (
      <div className="animation-demos-screen">
        <div className="animation-demos-loading">
          <div className="loading-spinner"></div>
          <p>Loading animation demos...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="animation-demos-screen">
      <HamburgerMenu />
      
      <div className="animation-demos-container">
        <header className="animation-demos-header">
          <Link href="/games" className="back-button">← Back to Games</Link>
          <h1>Animation Techniques</h1>
          <p>Explore modern animation styles to enhance your games section</p>
        </header>
        
        <div className="animation-demos-nav">
          <button 
            className={activeDemo === '3d-card-flip' ? 'active' : ''}
            onClick={() => setActiveDemo('3d-card-flip')}
          >
            3D Card Flip <span className="difficulty easy">Easy</span>
          </button>
          <button 
            className={activeDemo === 'parallax' ? 'active' : ''}
            onClick={() => setActiveDemo('parallax')}
          >
            Parallax Effect <span className="difficulty easy">Easy</span>
          </button>
          <button 
            className={activeDemo === 'morphing' ? 'active' : ''}
            onClick={() => setActiveDemo('morphing')}
          >
            Morphing Shapes <span className="difficulty easy">Easy</span>
          </button>
          <button 
            className={activeDemo === 'glassmorphism' ? 'active' : ''}
            onClick={() => setActiveDemo('glassmorphism')}
          >
            Glassmorphism <span className="difficulty easy">Easy</span>
          </button>
          <button 
            className={activeDemo === 'neumorphism' ? 'active' : ''}
            onClick={() => setActiveDemo('neumorphism')}
          >
            Neumorphism <span className="difficulty medium">Medium</span>
          </button>
          <button 
            className={activeDemo === 'particles' ? 'active' : ''}
            onClick={() => setActiveDemo('particles')}
          >
            Particle Effects <span className="difficulty medium">Medium</span>
          </button>
          <button 
            className={activeDemo === '3d-rotation' ? 'active' : ''}
            onClick={() => setActiveDemo('3d-rotation')}
          >
            3D Rotation <span className="difficulty medium">Medium</span>
          </button>
          <button 
            className={activeDemo === 'floating' ? 'active' : ''}
            onClick={() => setActiveDemo('floating')}
          >
            Floating Elements <span className="difficulty easy">Easy</span>
          </button>
          <button 
            className={activeDemo === 'dynamic-light' ? 'active' : ''}
            onClick={() => setActiveDemo('dynamic-light')}
          >
            Light Effects <span className="difficulty medium">Medium</span>
          </button>
          <button 
            className={activeDemo === 'mouse-follow' ? 'active' : ''}
            onClick={() => setActiveDemo('mouse-follow')}
          >
            Mouse Following <span className="difficulty medium">Medium</span>
          </button>
          <button 
            className={activeDemo === 'advanced-morphing' ? 'active' : ''}
            onClick={() => setActiveDemo('advanced-morphing')}
          >
            Advanced Liquid Morphing <span className="difficulty expert">Expert</span>
          </button>
          <button 
            className={activeDemo === 'kinetic-typography' ? 'active' : ''}
            onClick={() => setActiveDemo('kinetic-typography')}
          >
            Kinetic Typography <span className="difficulty medium">Medium</span>
          </button>
          <button 
            className={activeDemo === '3d-perspective' ? 'active' : ''}
            onClick={() => setActiveDemo('3d-perspective')}
          >
            3D Lighting Card <span className="difficulty expert">Expert</span>
          </button>
          <button 
            className={activeDemo === '3d-fold' ? 'active' : ''}
            onClick={() => setActiveDemo('3d-fold')}
          >
            3D Fold Effect <span className="difficulty expert">Expert</span>
          </button>
          <button 
            className={activeDemo === 'stagger-reveal' ? 'active' : ''}
            onClick={() => setActiveDemo('stagger-reveal')}
          >
            Staggered Reveal <span className="difficulty medium">Medium</span>
          </button>
          <button 
            className={activeDemo === 'magnetic-btn' ? 'active' : ''}
            onClick={() => setActiveDemo('magnetic-btn')}
          >
            Magnetic Button <span className="difficulty expert">Expert</span>
          </button>
          <button 
            className={activeDemo === 'holographic' ? 'active' : ''}
            onClick={() => setActiveDemo('holographic')}
          >
            Holographic Card <span className="difficulty god">God-Tier</span>
          </button>
          <button 
            className={activeDemo === 'ripple-text' ? 'active' : ''}
            onClick={() => setActiveDemo('ripple-text')}
          >
            Ripple Text Effect <span className="difficulty god">God-Tier</span>
          </button>
          <button 
            className={activeDemo === 'pixel-shader' ? 'active' : ''}
            onClick={() => setActiveDemo('pixel-shader')}
          >
            Pixel Shader <span className="difficulty god">God-Tier</span>
          </button>
          <button 
            className={activeDemo === 'mask-animation' ? 'active' : ''}
            onClick={() => setActiveDemo('mask-animation')}
          >
            Masks Animation <span className="difficulty expert">Expert</span>
          </button>
        </div>
        
        <div className="animation-demo-content">
          {/* 3D Card Flip with Depth */}
          {activeDemo === '3d-card-flip' && (
            <div className="demo-section">
              <h2>3D Card Flip with Depth</h2>
              <p>Cards that flip with perspective and appear to come toward the user.</p>
              
              <div className="demo-container demo-3d-card-flip">
                <div className="demo-3d-cards">
                  <div className="demo-3d-card">
                    <div className="demo-3d-card-inner">
                      <div className="demo-3d-card-front">
                        <h3>Memory Match</h3>
                        <div className="demo-card-icon">?</div>
                      </div>
                      <div className="demo-3d-card-back">
                        <div className="demo-card-content">
                          <div className="demo-card-symbol">{'</>'}</div>
                          <p>HTML</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="demo-3d-card">
                    <div className="demo-3d-card-inner">
                      <div className="demo-3d-card-front">
                        <h3>Code Snake</h3>
                        <div className="demo-card-icon">?</div>
                      </div>
                      <div className="demo-3d-card-back">
                        <div className="demo-card-content">
                          <div className="demo-card-symbol">{'{}'}</div>
                          <p>CSS</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="demo-3d-card">
                    <div className="demo-3d-card-inner">
                      <div className="demo-3d-card-front">
                        <h3>Puzzle Solver</h3>
                        <div className="demo-card-icon">?</div>
                      </div>
                      <div className="demo-3d-card-back">
                        <div className="demo-card-content">
                          <div className="demo-card-symbol">{'()'}</div>
                          <p>JavaScript</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="demo-instruction">Hover over cards to see the effect</p>
              </div>
            </div>
          )}
          
          {/* Parallax Scrolling Effect */}
          {activeDemo === 'parallax' && (
            <div className="demo-section">
              <h2>Parallax Scrolling Effect</h2>
              <p>Background elements move at different speeds than foreground elements.</p>
              
              <div className="demo-container">
                <div className="demo-parallax">
                  <div className="parallax-background"></div>
                  <div className="parallax-midground"></div>
                  <div className="parallax-foreground">
                    <h3>Parallax Game World</h3>
                    <p>Explore the depths of code</p>
                    <button className="demo-button">Play Now</button>
                  </div>
                </div>
                <p className="demo-instruction">Move your mouse over the area to see the effect</p>
              </div>
            </div>
          )}
          
          {/* Morphing Transitions */}
          {activeDemo === 'morphing' && (
            <div className="demo-section">
              <h2>Morphing Transitions</h2>
              <p>Shapes that transform smoothly from one state to another.</p>
              
              <div className="demo-container">
                <div className="demo-morphing">
                  <div className="morphing-shape" ref={morphingShapeRef}></div>
                  <div className="morphing-controls">
                    <button className="demo-button morph-circle">Circle</button>
                    <button className="demo-button morph-square">Square</button>
                    <button className="demo-button morph-triangle">Triangle</button>
                    <button className="demo-button morph-star">Star</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Glassmorphism */}
          {activeDemo === 'glassmorphism' && (
            <div className="demo-section">
              <h2>Glassmorphism Effects</h2>
              <p>UI elements with a frosted glass effect and subtle transparency.</p>
              
              <div className="demo-container">
                <div className="demo-glassmorphism">
                  <div className="glass-background">
                    <div className="glass-shape glass-shape-1"></div>
                    <div className="glass-shape glass-shape-2"></div>
                    <div className="glass-shape glass-shape-3"></div>
                  </div>
                  <div className="glass-card">
                    <h3>Game Statistics</h3>
                    <div className="glass-content">
                      <div className="glass-stat">
                        <span className="glass-label">Score</span>
                        <span className="glass-value">1,250</span>
                      </div>
                      <div className="glass-stat">
                        <span className="glass-label">Time</span>
                        <span className="glass-value">02:45</span>
                      </div>
                      <div className="glass-stat">
                        <span className="glass-label">Level</span>
                        <span className="glass-value">5</span>
                      </div>
                    </div>
                    <button className="glass-button">Continue</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Neumorphism */}
          {activeDemo === 'neumorphism' && (
            <div className="demo-section">
              <h2>Neumorphism Shadows</h2>
              <p>Soft, realistic shadows that make elements appear to extrude from the background.</p>
              
              <div className="demo-container">
                <div className="demo-neumorphism">
                  <div className="neuro-card">
                    <div className="neuro-icon"></div>
                    <h3>Memory Match</h3>
                    <p>Test your memory by matching pairs</p>
                    <div className="neuro-controls">
                      <button className="neuro-button">Play</button>
                      <div className="neuro-toggle">
                        <div className="neuro-toggle-button"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Particle Effects */}
          {activeDemo === 'particles' && (
            <div className="demo-section">
              <h2>Particle Systems</h2>
              <p>Interactive particle effects that respond to user actions.</p>
              
              <div className="demo-container">
                <div className="demo-particles">
                  <div className="particles-canvas" id="particles-canvas"></div>
                  <div className="particles-overlay">
                    <h3>Level Complete!</h3>
                    <p>You've scored 1,250 points</p>
                    <button className="particles-button">Next Level</button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* 3D Object Rotation */}
          {activeDemo === '3d-rotation' && (
            <div className="demo-section">
              <h2>3D Object Rotation</h2>
              <p>Elements that can be rotated in 3D space.</p>
              
              <div className="demo-container">
                <div className="demo-3d-rotation">
                  <div className="rotating-cube">
                    <div className="cube-face cube-face-front">Front</div>
                    <div className="cube-face cube-face-back">Back</div>
                    <div className="cube-face cube-face-left">Left</div>
                    <div className="cube-face cube-face-right">Right</div>
                    <div className="cube-face cube-face-top">Top</div>
                    <div className="cube-face cube-face-bottom">Bottom</div>
                  </div>
                  <p className="demo-instruction">Hover and move mouse to rotate</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Floating UI Elements */}
          {activeDemo === 'floating' && (
            <div className="demo-section">
              <h2>Floating UI Elements</h2>
              <p>Elements that float with subtle movements to create depth.</p>
              
              <div className="demo-container">
                <div className="demo-floating">
                  <div className="floating-badges">
                    <div className="floating-badge floating-badge-1">
                      <span className="badge-icon">★</span>
                      <span className="badge-text">Level 5</span>
                    </div>
                    <div className="floating-badge floating-badge-2">
                      <span className="badge-icon">🏆</span>
                      <span className="badge-text">High Score</span>
                    </div>
                    <div className="floating-badge floating-badge-3">
                      <span className="badge-icon">⚡</span>
                      <span className="badge-text">Power Up</span>
                    </div>
                    <div className="floating-badge floating-badge-4">
                      <span className="badge-icon">🔥</span>
                      <span className="badge-text">Streak</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Dynamic Light Effects */}
          {activeDemo === 'dynamic-light' && (
            <div className="demo-section">
              <h2>Dynamic Light Effects</h2>
              <p>Animated gradients and simulated light sources.</p>
              
              <div className="demo-container">
                <div className="demo-dynamic-light">
                  <div className="light-scene">
                    <div className="light-source"></div>
                    <div className="light-card">
                      <h3>Game Over</h3>
                      <p>Final Score: 1,250</p>
                      <div className="light-controls">
                        <button className="light-button">Play Again</button>
                        <button className="light-button light-button-alt">Main Menu</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Mouse Following Elements */}
          {activeDemo === 'mouse-follow' && (
            <div className="demo-section">
              <h2>Mouse Following Elements</h2>
              <p>UI elements that respond to cursor movement.</p>
              
              <div className="demo-container">
                <div className="demo-mouse-follow">
                  <div className="mouse-area" ref={mouseAreaRef}>
                    <div className="mouse-card" ref={mouseCardRef}>
                      <h3>Interactive Game Card</h3>
                      <p>Move your mouse to see the effect</p>
                      <div className="mouse-highlight" ref={mouseHighlightRef}></div>
                    </div>
                    <div className="mouse-cursor-follower" ref={mouseCursorRef}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Advanced Morphing Blob Effect */}
          {activeDemo === 'advanced-morphing' && (
            <div className="demo-section">
              <h2>Advanced Liquid Morphing</h2>
              <p>Organic shape transformations that mimic liquid movements with color gradients - perfect for special effects and transitions in games.</p>
              
              <div className="demo-container advanced-morphing-container">
                <div ref={liquidMorphRef} className="liquid-morph"></div>
                <p className="demo-instruction">Watch as the shape and colors evolve organically</p>
              </div>
              
              <div className="demo-details">
                <h3>How it works:</h3>
                <ul>
                  <li>Uses <code>requestAnimationFrame</code> for smooth animation</li>
                  <li>Dynamically changes border-radius values with sine waves</li>
                  <li>Applies shifting color gradients</li>
                  <li>Can be used for fluid transitions, loading indicators, or abstract game elements</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* Kinetic Typography */}
          {activeDemo === 'kinetic-typography' && (
            <div className="demo-section">
              <h2>Kinetic Typography</h2>
              <p>Dynamic text animations that bring words to life - ideal for game titles, level intros, and celebratory messages.</p>
              
              <div className="demo-container kinetic-typography-container">
                <div ref={kineticTextRef} className="kinetic-text">
                  {Array.from('ANIMATION MAGIC').map((letter, index) => (
                    <span key={index} className="kinetic-letter" style={{ display: letter === ' ' ? 'inline-block' : 'inline-block' }}>
                      {letter === ' ' ? '\u00A0' : letter}
                    </span>
                  ))}
                </div>
                <p className="demo-instruction">Watch the dynamic text animation</p>
              </div>
              
              <div className="demo-details">
                <h3>How it works:</h3>
                <ul>
                  <li>Splits text into individual characters for precise control</li>
                  <li>Uses sine waves with time-based offsets for fluid motion</li>
                  <li>Combines translation, rotation, and scale transformations</li>
                  <li>Applies dynamic color changes for an energetic effect</li>
                  <li>Perfect for game titles, achievements, or special announcements</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* 3D Perspective Card with Dynamic Lighting */}
          {activeDemo === '3d-perspective' && (
            <div className="demo-section">
              <h2>3D Card with Dynamic Lighting</h2>
              <p>Interactive 3D card with realistic lighting effects that follow your mouse - perfect for premium game elements, cards, or collectibles.</p>
              
              <div className="demo-container">
                <div ref={perspectiveCardContainerRef} className="perspective-card-container">
                  <div ref={perspectiveCardRef} className="perspective-card">
                    <div className="perspective-card-lighting"></div>
                    <div className="perspective-card-front">
                      <div className="card-icon">🏆</div>
                      <h3 className="card-title">Premium Card</h3>
                      <p>Move your mouse around to see the dynamic lighting effect</p>
                    </div>
                    <div className="perspective-card-back">
                      <div className="card-icon">🌟</div>
                      <h3 className="card-title">Special Effects</h3>
                      <p>This card uses advanced CSS variables for realistic lighting</p>
                    </div>
                    <div className="shadow-glow"></div>
                  </div>
                </div>
                <p className="demo-instruction">Move your mouse over the card to see the effect</p>
              </div>
              
              <div className="demo-details">
                <h3>How it works:</h3>
                <ul>
                  <li>Tracks mouse position relative to the card container</li>
                  <li>Uses CSS variables to dynamically position highlights and shadows</li>
                  <li>Simulates 3D lighting with gradients that follow mouse movement</li>
                  <li>Combines rotation and scale transformations for realistic depth</li>
                  <li>Perfect for premium game elements, collectible cards, and achievements</li>
                </ul>
              </div>
            </div>
          )}
          
          {/* 3D Fold Effect */}
          {activeDemo === '3d-fold' && (
            <div className="demo-section">
              <h2>3D Fold Effect <span className="type-label">Animation</span></h2>
              <p>Advanced 3D fold effect that creates the illusion of folding paper or cards - perfect for page transitions or revealing content.</p>
              
              <div className="demo-container">
                <div className="fold-effect-container" ref={foldEffectRef}>
                  <div className="fold-panel fold-panel-1">
                    <h3>Level 1</h3>
                    <p>Move your mouse to fold this panel</p>
                  </div>
                  <div className="fold-panel fold-panel-2">
                    <h3>Level 2</h3>
                    <p>Unlock new abilities</p>
                  </div>
                  <div className="fold-panel fold-panel-3">
                    <h3>Level 3</h3>
                    <p>Master the game</p>
                  </div>
                  <div className="fold-panel fold-panel-4">
                    <h3>Final Boss</h3>
                    <p>Victory awaits!</p>
                  </div>
                </div>
                <p className="demo-instruction">Move your cursor across the panels to see the fold effect</p>
              </div>
              
              <div className="demo-details">
                <h3>How it works:</h3>
                <ul>
                  <li>Uses mouse position to calculate fold angles in 3D space</li>
                  <li>Creates a layered effect with multiple panels</li>
                  <li>Adjusts shadow intensity based on fold angle</li>
                  <li>Varies the fold intensity for each panel to create depth</li>
                  <li>Perfect for page transitions, game level reveals, or interactive storytelling</li>
                </ul>
                <div className="difficulty-info">
                  <span className="difficulty expert">Expert Level</span>
                  <p>Requires understanding of 3D transforms, coordinate calculations, and shadow physics</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Staggered Reveal Animation */}
          {activeDemo === 'stagger-reveal' && (
            <div className="demo-section">
              <h2>Staggered Reveal <span className="type-label">Transition</span></h2>
              <p>Smooth staggered animation that reveals elements sequentially - creates a professional feeling of rhythm and timing.</p>
              
              <div className="demo-container">
                <div className="stagger-reveal-container" ref={staggerRevealRef}>
                  <div className="stagger-item stagger-header">
                    <h3>Mission Complete!</h3>
                  </div>
                  <div className="stagger-item stagger-subheader">
                    <p>You've earned the following rewards:</p>
                  </div>
                  <div className="stagger-grid">
                    <div className="stagger-item stagger-card">
                      <div className="stagger-icon">🏆</div>
                      <h4>Achievement Unlocked</h4>
                      <p>Master Coder</p>
                    </div>
                    <div className="stagger-item stagger-card">
                      <div className="stagger-icon">⭐</div>
                      <h4>5000 Points</h4>
                      <p>New High Score!</p>
                    </div>
                    <div className="stagger-item stagger-card">
                      <div className="stagger-icon">🎮</div>
                      <h4>New Level</h4>
                      <p>Expert Mode Unlocked</p>
                    </div>
                  </div>
                  <div className="stagger-item stagger-footer">
                    <button className="stagger-reset">Reset Animation</button>
                  </div>
                </div>
                <p className="demo-instruction">Click Reset to replay the animation</p>
              </div>
              
              <div className="demo-details">
                <h3>How it works:</h3>
                <ul>
                  <li>Uses setTimeout with incremental delays to create a cascading effect</li>
                  <li>Elements start with opacity 0 and transform translate</li>
                  <li>Each element appears with a calculated delay based on its position</li>
                  <li>Creates a professional sense of hierarchy and focus</li>
                  <li>Perfect for revealing achievements, level completions, or introducing UI elements</li>
                </ul>
                <div className="difficulty-info">
                  <span className="difficulty medium">Medium Level</span>
                  <p>Requires understanding of CSS transitions and JavaScript timing functions</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Magnetic Button */}
          {activeDemo === 'magnetic-btn' && (
            <div className="demo-section">
              <h2>Magnetic Button <span className="type-label">Animation</span></h2>
              <p>Ultra-responsive button that attracts to your cursor like a magnet - creates a premium, interactive feel for important calls to action.</p>
              
              <div className="demo-container">
                <div className="magnetic-btn-container" ref={magneticButtonRef}>
                  <div className="magnetic-btn">
                    <div className="btn-content">
                      <span className="btn-icon">▶</span>
                      <span className="btn-text">Play Game</span>
                    </div>
                  </div>
                </div>
                <p className="demo-instruction">Move your cursor around the button to see the magnetic effect</p>
              </div>
              
              <div className="demo-details">
                <h3>How it works:</h3>
                <ul>
                  <li>Calculates cursor position relative to the button center</li>
                  <li>Applies transforms to move the button toward the cursor</li>
                  <li>Adds subtle tilt for realistic 3D effect</li>
                  <li>Adjusts shadow position to enhance depth perception</li>
                  <li>Creates an engaging, interactive experience for important actions</li>
                </ul>
                <div className="difficulty-info">
                  <span className="difficulty expert">Expert Level</span>
                  <p>Requires understanding of cursor tracking, relative positioning, and physics-based movements</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Holographic Card */}
          {activeDemo === 'holographic' && (
            <div className="demo-section">
              <h2>Holographic Card <span className="type-label">Animation</span></h2>
              <p>Premium holographic effect that simulates a color-shifting, reflective surface - creates an ultra-premium feel for special game items.</p>
              
              <div className="demo-container">
                <div className="holographic-card" ref={holographicCardRef}>
                  <div className="holo-shine"></div>
                  <div className="holo-foil"></div>
                  <div className="holo-content">
                    <div className="holo-icon">⚡</div>
                    <h3>Legendary Item</h3>
                    <p className="holo-rarity">Ultra Rare</p>
                    <div className="holo-stats">
                      <div className="holo-stat">
                        <span className="stat-name">Power</span>
                        <span className="stat-value">95</span>
                      </div>
                      <div className="holo-stat">
                        <span className="stat-name">Speed</span>
                        <span className="stat-value">82</span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="demo-instruction">Move your cursor across the card to see the holographic effect</p>
              </div>
              
              <div className="demo-details">
                <h3>How it works:</h3>
                <ul>
                  <li>Uses mouse position to calculate reflection and refraction angles</li>
                  <li>Creates dynamic color shifts based on viewing angle</li>
                  <li>Simulates light reflection with gradient overlays</li>
                  <li>Applies subtle 3D rotation for realistic effect</li>
                  <li>Perfect for premium items, achievements, or special collectibles</li>
                </ul>
                <div className="difficulty-info">
                  <span className="difficulty god">God-Tier Level</span>
                  <p>Requires advanced understanding of light physics, color theory, and complex CSS gradients</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Ripple Text Effect */}
          {activeDemo === 'ripple-text' && (
            <div className="demo-section">
              <h2>Ripple Text Effect <span className="type-label">Animation</span></h2>
              <p>Text animation that creates a ripple wave through characters - perfect for interactive headings and special announcements.</p>
              
              <div className="demo-container">
                <div className="ripple-text-container">
                  <div className="ripple-text" ref={rippleTextRef}>
                    {Array.from('CLICK ANY LETTER').map((letter, index) => (
                      <span key={index} className="ripple-letter" style={{ display: letter === ' ' ? 'inline-block' : 'inline-block' }}>
                        {letter === ' ' ? '\u00A0' : letter}
                      </span>
                    ))}
                  </div>
                  <p className="ripple-instruction">Click any letter to create a ripple wave effect</p>
                </div>
                <p className="demo-instruction">Click on different letters to see waves emanate from that point</p>
              </div>
              
              <div className="demo-details">
                <h3>How it works:</h3>
                <ul>
                  <li>Calculates the distance of each letter from the clicked point</li>
                  <li>Creates a wave animation that radiates outward</li>
                  <li>Applies different delays based on distance for realistic propagation</li>
                  <li>Changes color and scale as the wave passes through each letter</li>
                  <li>Perfect for interactive titles, celebratory messages, or emphasis effects</li>
                </ul>
                <div className="difficulty-info">
                  <span className="difficulty god">God-Tier Level</span>
                  <p>Requires understanding of wave physics, advanced animation timing, and complex interaction patterns</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Pixel Shader Effect */}
          {activeDemo === 'pixel-shader' && (
            <div className="demo-section">
              <h2>Pixel Shader <span className="type-label">Animation</span></h2>
              <p>Advanced pixel-based shader effects created with Canvas - perfect for retro game effects, transitions, or abstract backgrounds.</p>
              
              <div className="demo-container">
                <div className="pixel-shader-container">
                  <canvas ref={pixelShaderRef} className="pixel-shader-canvas"></canvas>
                  <div className="pixel-shader-overlay">
                    <h3>RETRO WAVE</h3>
                    <p>Procedural shader effect</p>
                  </div>
                </div>
                <p className="demo-instruction">Watch as the pixel patterns evolve over time</p>
              </div>
              
              <div className="demo-details">
                <h3>How it works:</h3>
                <ul>
                  <li>Uses HTML Canvas API for pixel-level rendering</li>
                  <li>Creates procedural patterns using mathematical sine/cosine waves</li>
                  <li>Applies color mapping based on calculated values</li>
                  <li>Renders each frame using requestAnimationFrame for smooth animation</li>
                  <li>Perfect for game transitions, loading screens, or as background effects</li>
                </ul>
                <div className="difficulty-info">
                  <span className="difficulty god">God-Tier Level</span>
                  <p>Requires understanding of Canvas API, procedural generation algorithms, wave mathematics, and optimized rendering techniques</p>
                </div>
              </div>
            </div>
          )}
          
          {/* Mask Animation Effect */}
          {activeDemo === 'mask-animation' && (
            <div className="demo-section">
              <h2>Masks Animation <span className="type-label">Animation</span></h2>
              <p>Combines animated mask shapes with text scrambling effects - great for cyberpunk themes, futuristic interfaces, or glitch transitions.</p>
              
              <div className="demo-container">
                <div className="mask-animation-container" ref={maskAnimationRef}>
                  <div className="mask-element mask-circle"></div>
                  <div className="mask-element mask-triangle"></div>
                  <div className="mask-element mask-square"></div>
                  <div className="mask-element mask-pentagon"></div>
                  <div className="mask-element mask-hexagon"></div>
                  <div className="mask-content">
                    <h3 className="mask-text">SYSTEM ACCESS</h3>
                    <div className="mask-line"></div>
                    <p>Decrypting data protocols</p>
                  </div>
                </div>
                <p className="demo-instruction">Watch the geometric masks animate with text scrambling effects</p>
              </div>
              
              <div className="demo-details">
                <h3>How it works:</h3>
                <ul>
                  <li>Combines geometric CSS masks with JavaScript animations</li>
                  <li>Creates movement patterns for each mask shape using sine/cosine waves</li>
                  <li>Implements text scrambling effect that gradually reveals the original text</li>
                  <li>Uses requestAnimationFrame for smooth, coordinated animations</li>
                  <li>Perfect for sci-fi interfaces, loading screens, or futuristic game elements</li>
                </ul>
                <div className="difficulty-info">
                  <span className="difficulty expert">Expert Level</span>
                  <p>Requires understanding of CSS mask properties, complex animations, and text manipulation techniques</p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="animation-demos-footer">
          <p>Use these animation techniques to enhance your games section UI</p>
          <Link href="/games" className="demo-button">Back to Games</Link>
        </div>
      </div>
    </div>
  );
} 