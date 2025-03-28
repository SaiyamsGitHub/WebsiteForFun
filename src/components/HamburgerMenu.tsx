'use client';

import { useState } from 'react';
import './HamburgerMenu.css'; // Import regular CSS instead of CSS module

export default function HamburgerMenu() {
  const [isActive, setIsActive] = useState(false);

  return (
    <>
      {/* Main container for the hamburger menu button */}
      <div id="hamburger-menu-container">
        <section id="hamburger-menu-section">
          {/* Hamburger button with active state toggle */}
          <div 
            id="hamburger-menu-button" 
            className={isActive ? 'active' : ''}
          >
            {/* Clickable icon with three lines */}
            <div 
              id="hamburger-menu-icon" 
              onClick={() => setIsActive(!isActive)}
            >
              {/* Three lines of the hamburger icon */}
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
            <li id="navigation-menu-item-home"><a href="#" id="navigation-link-home">Home</a></li>
            <li id="navigation-menu-item-about"><a href="#" id="navigation-link-about">About Us</a></li>
            <li id="navigation-menu-item-services"><a href="#" id="navigation-link-services">Services</a></li>
            <li id="navigation-menu-item-projects"><a href="#" id="navigation-link-projects">Projects</a></li>
            <li id="navigation-menu-item-contact"><a href="#" id="navigation-link-contact">Contact Us</a></li>
          </ul>
        </nav>
      </div>
    </>
  );
} 