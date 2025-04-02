'use client';

import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import './ContactInfo.css';

export default function ContactInfo() {
  return (
    <div id="contact-info-container">
      {/* Location Block */}
      <div id="contact-info-location-block">
        <div id="contact-info-location-icon-container">
          <FaMapMarkerAlt id="contact-info-location-icon" />
        </div>
        <div id="contact-info-location-content">
          <h3 id="contact-info-location-label">Address</h3>
          <p id="contact-info-location-text">ABC Shantikunj, 400012</p>
        </div>
      </div>

      {/* Phone Block */}
      <div id="contact-info-phone-block">
        <div id="contact-info-phone-icon-container">
          <FaPhone id="contact-info-phone-icon" />
        </div>
        <div id="contact-info-phone-content">
          <h3 id="contact-info-phone-label">Phone</h3>
          <p id="contact-info-phone-text">+919604101541</p>
        </div>
      </div>

      {/* Email Block */}
      <div id="contact-info-email-block">
        <div id="contact-info-email-icon-container">
          <FaEnvelope id="contact-info-email-icon" />
        </div>
        <div id="contact-info-email-content">
          <h3 id="contact-info-email-label">Email</h3>
          <p id="contact-info-email-text">mishoo123@gmail.com</p>
        </div>
      </div>

      {/* Connect with us Block */}
      <div id="contact-info-social-block">
        <div id="contact-info-social-heading">
          <div id="contact-info-social-rect"></div>
          <h3 id="contact-info-social-label">Connect with us</h3>
        </div>
        <div id="contact-info-social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebookF id="contact-info-social-facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter id="contact-info-social-twitter" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram id="contact-info-social-instagram" />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <FaLinkedinIn id="contact-info-social-linkedin" />
          </a>
        </div>
      </div>
    </div>
  );
} 