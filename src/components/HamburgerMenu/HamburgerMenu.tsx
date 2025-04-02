'use client';

import { useState } from 'react';
import './HamburgerMenu.css'; // Import regular CSS instead of CSS module
import Link from 'next/link';

export default function HamburgerMenu() {
  const [isActive, setIsActive] = useState(false);

  // Toggle menu active state
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      {/* Main container for menu button */}
      <div 
        id="hamburger-menu-container" 
        className={isActive ? 'active' : ''}
      >
        {/* Menu button section */}
        <section id="hamburger-menu-section">
          {/* Hamburger button that toggles menu state */}
          <div 
            id="hamburger-menu-button" 
            className={isActive ? 'active' : ''} 
            onClick={toggleMenu}
          >
            {/* Hamburger icon with animated lines */}
            <div id="hamburger-menu-icon">
              <span id="hamburger-menu-line-top"></span>
              <span id="hamburger-menu-line-middle"></span>
              <span id="hamburger-menu-line-bottom"></span>
            </div>
            {/* Text container that shows MENU/CLOSE */}
            <div id="hamburger-menu-text-container">
              <span id="hamburger-menu-text"></span>
            </div>
          </div>
        </section>
      </div>
      
      {/* Navigation overlay that appears when menu is active */}
      <div 
        id="navigation-overlay" 
        className={isActive ? 'active' : ''}
      >
        {/* Navigation panel containing menu links */}
        <nav id="navigation-panel">
          <ul id="navigation-menu-list">
            {/* Navigation menu items */}
            <li id="navigation-menu-item-home">
              <Link href="/" id="navigation-link-home">Home</Link>
            </li>
            <li id="navigation-menu-item-about">
              <Link href="/about" id="navigation-link-about">About Us</Link>
            </li>
            <li id="navigation-menu-item-services">
              <Link href="/services" id="navigation-link-services">Services</Link>
            </li>
            <li id="navigation-menu-item-projects">
              <Link href="/projects" id="navigation-link-projects">Projects</Link>
            </li>
            <li id="navigation-menu-item-contact">
              <Link href="/contact" id="navigation-link-contact">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
} 