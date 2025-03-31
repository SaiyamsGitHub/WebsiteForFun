'use client';

import { useEffect, useState, useRef } from 'react';
import dynamic from 'next/dynamic';

// Extend Window interface to include our custom property
declare global {
  interface Window {
    moveTimeout: NodeJS.Timeout | undefined;
  }
}

const CursorBubbleImpl = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const distanceThreshold = 0.5; // Distance in pixels to consider the bubble has reached the cursor
  
  useEffect(() => {
    // Function to handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      
      // Reset the moving state after a short delay
      clearTimeout(window.moveTimeout);
      window.moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 100);
    };
    
    // Add event listener
    window.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(window.moveTimeout);
    };
  }, []);
  
  useEffect(() => {
    // Animate the bubble to follow the cursor with dynamic speed
    const animateBubble = () => {
      setBubblePosition(prev => {
        // Calculate distance between cursor and bubble
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // If cursor isn't moving and bubble is very close to the target, snap to position
        if (!isMoving && distance < distanceThreshold) {
          return position;
        }
        
        // Dynamic speed - faster when moving, slower when still
        // Also scales with distance - faster when far away
        const baseFactor = isMoving ? 0.15 : 0.08;
        const speedFactor = Math.min(baseFactor * (1 + distance / 100), 0.5);
        
        return {
          x: prev.x + dx * speedFactor,
          y: prev.y + dy * speedFactor
        };
      });
      
      animationRef.current = requestAnimationFrame(animateBubble);
    };
    
    animationRef.current = requestAnimationFrame(animateBubble);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [position, isMoving]);
  
  return (
    <div
      id="cursorBubble"
      style={{
        position: 'fixed',
        left: `${bubblePosition.x}px`,
        top: `${bubblePosition.y}px`,
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        border: '1.5px solid var(--purple)',
        backgroundColor: 'transparent',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s, height 0.2s',
        ...(isMoving ? {
          width: '25px',
          height: '25px'
        } : {})
      }}
    />
  );
};

// Use dynamic import with SSR disabled for the implementation
const CursorBubble = dynamic(() => Promise.resolve(CursorBubbleImpl), { ssr: false });

export default CursorBubble; 