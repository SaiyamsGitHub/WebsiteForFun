'use client';

import { useEffect, useState, useRef } from 'react';

// Extend Window interface to include our custom property
declare global {
  interface Window {
    moveTimeout: NodeJS.Timeout | undefined;
  }
}

// Define shape types for different elements
type BubbleShape = 'circle' | 'square' | 'rounded-square' | 'triangle';

const CursorBubble = () => {
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [bubblePosition, setBubblePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isNearInteractive, setIsNearInteractive] = useState(false);
  const [magneticTarget, setMagneticTarget] = useState<{ x: number, y: number } | null>(null);
  const [currentShape, setCurrentShape] = useState<BubbleShape>('circle');
  const animationRef = useRef<number | undefined>(undefined);
  const distanceThreshold = 0.5; // Distance in pixels to consider the bubble has reached the cursor
  const magneticRadius = 30; // Radius in pixels where magnetic effect starts
  const magneticPower = 0.4; // Power of the magnetic effect (0-1)
  
  // Mount effect - ensure we're on the client side
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Skip effects on server-side
    if (!mounted) return;
    
    // Function to handle mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);
      
      // Reset the moving state after a short delay
      clearTimeout(window.moveTimeout);
      window.moveTimeout = setTimeout(() => {
        setIsMoving(false);
      }, 100);
      
      // Check for interactive elements nearby
      checkForInteractiveElements(e);
    };

    // Get bubble shape based on element type
    const getBubbleShape = (element: Element): BubbleShape => {
      const tagName = element.tagName.toLowerCase();
      const isLink = tagName === 'a' || element.hasAttribute('href');
      const isButton = tagName === 'button' || element.getAttribute('role') === 'button';
      const isInput = tagName === 'input' || tagName === 'textarea' || tagName === 'select';
      
      if (isLink) return 'circle';
      if (isButton) return 'square';
      if (isInput) return 'rounded-square';
      return 'circle'; // Default shape
    };

    // Function to check for interactive elements
    const checkForInteractiveElements = (e: MouseEvent) => {
      // Define which elements should have magnetic effect
      const interactiveSelectors = 'a, button, [role="button"], input, select, textarea, [tabindex]:not([tabindex="-1"])';
      
      // Get all elements that match our selectors
      const elements = document.querySelectorAll(interactiveSelectors);
      let closestElement: Element | null = null;
      let closestDistance = magneticRadius;
      
      // Find the closest interactive element
      elements.forEach((el) => {
        // Get element position
        const rect = el.getBoundingClientRect();
        const elementCenterX = rect.left + rect.width / 2;
        const elementCenterY = rect.top + rect.height / 2;
        
        // Calculate distance to cursor
        const dx = e.clientX - elementCenterX;
        const dy = e.clientY - elementCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Update closest element if this one is closer
        if (distance < closestDistance) {
          closestDistance = distance;
          closestElement = el;
        }
      });
      
      // If we found a close element, set the magnetic target
      if (closestElement) {
        const rect = (closestElement as Element).getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        setIsNearInteractive(true);
        setMagneticTarget({ x: centerX, y: centerY });
        setCurrentShape(getBubbleShape(closestElement));
      } else {
        setIsNearInteractive(false);
        setMagneticTarget(null);
        setCurrentShape('circle'); // Reset to default shape
      }
    };

    // Function to handle visibility
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    // Function to handle pointer leaving the window
    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    // Function to handle pointer entering the window
    const handlePointerEnter = () => {
      setIsVisible(true);
    };
    
    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('pointerenter', handlePointerEnter);
    
    // Clean up
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('pointerenter', handlePointerEnter);
      clearTimeout(window.moveTimeout);
    };
  }, [mounted]); // Add mounted as a dependency
  
  useEffect(() => {
    // Skip animation on server-side
    if (!mounted) return;
    
    // Animate the bubble to follow the cursor with dynamic speed
    const animateBubble = () => {
      setBubblePosition(prev => {
        // If near interactive element, apply magnetic attraction
        if (isNearInteractive && magneticTarget) {
          // Calculate weighted position between cursor and magnetic target
          const targetX = position.x * (1 - magneticPower) + magneticTarget.x * magneticPower;
          const targetY = position.y * (1 - magneticPower) + magneticTarget.y * magneticPower;
          
          // Calculate distance to this weighted target
          const dx = targetX - prev.x;
          const dy = targetY - prev.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // If cursor isn't moving and bubble is very close to the target, snap to position
          if (!isMoving && distance < distanceThreshold) {
            return { x: targetX, y: targetY };
          }
          
          // Dynamic speed with magnetic effect
          const baseFactor = isMoving ? 0.2 : 0.1;
          const speedFactor = Math.min(baseFactor * (1 + distance / 100), 0.6);
          
          return {
            x: prev.x + dx * speedFactor,
            y: prev.y + dy * speedFactor
          };
        } else {
          // Standard movement without magnetic effect
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
        }
      });
      
      animationRef.current = requestAnimationFrame(animateBubble);
    };
    
    animationRef.current = requestAnimationFrame(animateBubble);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [position, isMoving, isNearInteractive, magneticTarget, mounted]); // Add mounted as a dependency

  // If not mounted (server-side), don't render anything
  if (!mounted) {
    return null;
  }

  // Get style based on current shape
  const getShapeStyles = () => {
    const baseSize = isNearInteractive ? 35 : 30;
    const smallerSize = 25;
    
    switch (currentShape) {
      case 'square':
        return {
          width: `${baseSize}px`,
          height: `${baseSize}px`,
          borderRadius: '4px',
          ...(isMoving && !isNearInteractive ? {
            width: `${smallerSize}px`,
            height: `${smallerSize}px`
          } : {})
        };
      case 'rounded-square':
        return {
          width: `${baseSize}px`,
          height: `${baseSize}px`,
          borderRadius: '10px',
          ...(isMoving && !isNearInteractive ? {
            width: `${smallerSize}px`,
            height: `${smallerSize}px`
          } : {})
        };
      case 'triangle':
        return {
          width: '0',
          height: '0',
          borderRadius: '0',
          borderLeft: `${baseSize/2}px solid transparent`,
          borderRight: `${baseSize/2}px solid transparent`,
          borderBottom: `${baseSize}px solid transparent`,
          backgroundColor: 'transparent',
          border: 'none',
          outline: `1.5px solid var(--purple)`,
          ...(isMoving && !isNearInteractive ? {
            borderLeft: `${smallerSize/2}px solid transparent`,
            borderRight: `${smallerSize/2}px solid transparent`,
            borderBottom: `${smallerSize}px solid transparent`
          } : {})
        };
      case 'circle':
      default:
        return {
          width: `${baseSize}px`,
          height: `${baseSize}px`,
          borderRadius: '50%',
          ...(isMoving && !isNearInteractive ? {
            width: `${smallerSize}px`,
            height: `${smallerSize}px`
          } : {})
        };
    }
  };
  
  return (
    <div
      id="cursorBubble"
      style={{
        position: 'fixed',
        left: `${bubblePosition.x}px`,
        top: `${bubblePosition.y}px`,
        border: `1.5px solid var(--purple)`,
        backgroundColor: 'transparent',
        pointerEvents: 'none',
        zIndex: 9999,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.3s, height 0.3s, opacity 0.2s, border-radius 0.3s',
        opacity: isVisible ? 1 : 0,
        ...getShapeStyles()
      }}
    />
  );
};

export default CursorBubble; 