'use client';

import { useEffect, useRef, useState } from 'react';
import './ThreeBackground.css';

const ThreeBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  
  // Mount effect - ensure we're on the client side
  useEffect(() => {
    setMounted(true);
  }, []);
  
  useEffect(() => {
    // Only run this effect on the client side after mounting
    if (!mounted || !containerRef.current) return;
    
    // Dynamically import Three.js only on client side
    const THREE = require('three');
    
    // Create scene, camera and renderer
    const scene = new THREE.Scene();
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    
    // Create renderer with transparency
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Add renderer to DOM
    containerRef.current.appendChild(renderer.domElement);
    
    // Set renderer styles to be fixed and behind content
    const canvas = renderer.domElement;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.zIndex = '-1';
    canvas.style.pointerEvents = 'none'; // Make it non-interactive to clicks
    
    // Create particles
    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const sizes = new Float32Array(particlesCount);
    const colors = new Float32Array(particlesCount * 3);
    
    // Define a color palette inspired by purple theme
    const palette = [
      new THREE.Color(0x9d00ff), // Main purple
      new THREE.Color(0x7000c7), // Darker purple
      new THREE.Color(0xb14aff), // Lighter purple
      new THREE.Color(0xd490ff), // Very light purple
      new THREE.Color(0x5c0099)  // Deep purple
    ];
    
    // Create particles with random positions and colors
    for (let i = 0; i < particlesCount; i++) {
      // Positions - spread across 3D space in a spherical distribution
      const radius = Math.random() * 50 + 20;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta); // x
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta); // y
      positions[i * 3 + 2] = radius * Math.cos(phi); // z
      
      // Random size between 0.1 and 0.6
      sizes[i] = Math.random() * 0.5 + 0.1;
      
      // Random color from palette
      const color = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }
    
    // Create particle geometry
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Create particle material with custom shader
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.5,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.8,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });
    
    // Create particles system
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    
    // Create wave plane
    const waveGeometry = new THREE.PlaneGeometry(120, 120, 50, 50);
    const waveMaterial = new THREE.MeshStandardMaterial({
      color: 0x9d00ff,
      side: THREE.DoubleSide,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    
    const waveMesh = new THREE.Mesh(waveGeometry, waveMaterial);
    waveMesh.rotation.x = Math.PI / 2; // Rotate to horizontal
    waveMesh.position.y = -20; // Position below
    scene.add(waveMesh);
    
    // Create a second wave plane with offset
    const waveMesh2 = waveMesh.clone();
    waveMesh2.position.y = -25;
    waveMesh2.material = new THREE.MeshStandardMaterial({
      color: 0x7000c7,
      side: THREE.DoubleSide,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    scene.add(waveMesh2);
    
    // Add faint ambient light to enhance atmosphere
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Add directional light for some dimension
    const directionalLight = new THREE.DirectionalLight(0x9d00ff, 0.8);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);
    
    // Add point light in center
    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 0, 20);
    scene.add(pointLight);
    
    // Animation variables
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    
    // Track mouse movement
    const onDocumentMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.0005;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.0005;
    };
    
    // Track touch movement for mobile devices
    const onDocumentTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        mouseX = (event.touches[0].clientX - window.innerWidth / 2) * 0.0005;
        mouseY = (event.touches[0].clientY - window.innerHeight / 2) * 0.0005;
      }
    };
    
    // Add event listeners
    document.addEventListener('mousemove', onDocumentMouseMove);
    document.addEventListener('touchmove', onDocumentTouchMove);
    
    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', onWindowResize);
    
    // Function to animate waves
    const animateWaves = (time: number) => {
      // Get vertices from wave geometries
      const wavePositions = waveGeometry.attributes.position;
      
      // Animate each vertex
      for (let i = 0; i < wavePositions.count; i++) {
        const x = wavePositions.getX(i);
        const y = wavePositions.getY(i);
        
        // Create wave effect
        const waveZ1 = Math.sin(x * 0.05 + time * 0.7) * 2 + 
                       Math.sin(y * 0.04 + time * 0.6) * 2;
        
        // Update z position
        wavePositions.setZ(i, waveZ1);
      }
      
      wavePositions.needsUpdate = true;
      
      // Get vertices for second wave with different pattern
      const wave2Positions = waveMesh2.geometry.attributes.position;
      
      for (let i = 0; i < wave2Positions.count; i++) {
        const x = wave2Positions.getX(i);
        const y = wave2Positions.getY(i);
        
        // Create different wave pattern
        const waveZ2 = Math.sin(x * 0.08 + time * 0.4) * 1.5 + 
                       Math.cos(y * 0.06 + time * 0.5) * 1.5;
        
        // Update z position
        wave2Positions.setZ(i, waveZ2);
      }
      
      wave2Positions.needsUpdate = true;
    };
    
    // Animation loop
    let time = 0;
    const animate = () => {
      time += 0.01;
      requestAnimationFrame(animate);
      
      // Animate waves
      animateWaves(time);
      
      // Smoothly transition to target rotation
      targetX = mouseX;
      targetY = mouseY;
      
      // Rotate particle system
      particles.rotation.y += 0.001;
      
      // Apply interactive rotation
      scene.rotation.y += 0.3 * (targetX - scene.rotation.y);
      scene.rotation.x += 0.3 * (targetY - scene.rotation.x);
      
      // Animate particles with subtle pulsing
      const positions = particleGeometry.attributes.position.array;
      for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        const x = positions[i3];
        const y = positions[i3 + 1];
        const z = positions[i3 + 2];
        
        // Calculate distance from center
        const distance = Math.sqrt(x * x + y * y + z * z);
        
        // Add subtle pulsing movement
        const pulseFactor = Math.sin(time + distance * 0.05) * 0.1;
        
        // Scale position slightly
        positions[i3] = x * (1 + pulseFactor);
        positions[i3 + 1] = y * (1 + pulseFactor);
        positions[i3 + 2] = z * (1 + pulseFactor);
      }
      particleGeometry.attributes.position.needsUpdate = true;
      
      // Render the scene
      renderer.render(scene, camera);
    };
    
    // Start animation
    animate();
    
    // Clean up
    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      document.removeEventListener('touchmove', onDocumentTouchMove);
      
      // Dispose of resources
      particleGeometry.dispose();
      particleMaterial.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      
      // Remove renderer from DOM
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, [mounted]); // Add mounted to the dependency array
  
  // If not mounted (server-side), return an empty div
  return <div ref={containerRef} className="three-background"></div>;
};

export default ThreeBackground; 