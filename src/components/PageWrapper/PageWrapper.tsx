'use client';

import { useState, useEffect } from 'react';
import AnimatedLogo from '../AnimatedLogo';
import './PageWrapper.css';

interface PageWrapperProps {
  children: React.ReactNode;
}

export default function PageWrapper({ children }: PageWrapperProps) {
  const [loading, setLoading] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  
  useEffect(() => {
    // Simulate loading time (you can replace this with actual resource loading)
    const loadingTimer = setTimeout(() => {
      setLoading(false);
    }, 2500);
    
    return () => clearTimeout(loadingTimer);
  }, []);
  
  const handleLoadComplete = () => {
    setContentVisible(true);
  };
  
  return (
    <div className="page-wrapper">
      <AnimatedLogo 
        isLoading={loading} 
        onLoadComplete={handleLoadComplete}
      />
      
      <div className={`page-content ${contentVisible ? 'visible' : 'hidden'}`}>
        {children}
      </div>
    </div>
  );
} 