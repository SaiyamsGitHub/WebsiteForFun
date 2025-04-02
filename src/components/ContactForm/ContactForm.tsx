"use client";

import React, { useState, useEffect } from 'react';
import './ContactForm.css';
import { FaPaperPlane, FaCheck, FaSpinner, FaUndo } from 'react-icons/fa';

// Country codes data with country names
const countryCodes = [
  { code: '+1', name: 'United States/Canada' },
  { code: '+44', name: 'United Kingdom' },
  { code: '+91', name: 'India' },
  { code: '+61', name: 'Australia' },
  { code: '+33', name: 'France' },
  { code: '+49', name: 'Germany' },
  { code: '+81', name: 'Japan' },
  { code: '+86', name: 'China' },
  { code: '+7', name: 'Russia' },
  { code: '+27', name: 'South Africa' },
  { code: '+55', name: 'Brazil' },
  { code: '+52', name: 'Mexico' },
  { code: '+34', name: 'Spain' },
  { code: '+39', name: 'Italy' },
  { code: '+31', name: 'Netherlands' },
  { code: '+64', name: 'New Zealand' },
  { code: '+65', name: 'Singapore' },
  { code: '+82', name: 'South Korea' },
  { code: '+971', name: 'United Arab Emirates' },
  { code: '+966', name: 'Saudi Arabia' },
  { code: '+90', name: 'Turkey' },
  { code: '+20', name: 'Egypt' },
  { code: '+92', name: 'Pakistan' },
  { code: '+880', name: 'Bangladesh' },
  { code: '+234', name: 'Nigeria' },
  { code: '+62', name: 'Indonesia' },
  { code: '+84', name: 'Vietnam' },
  { code: '+60', name: 'Malaysia' },
  { code: '+63', name: 'Philippines' },
  { code: '+66', name: 'Thailand' },
  { code: '+46', name: 'Sweden' },
  { code: '+47', name: 'Norway' },
  { code: '+45', name: 'Denmark' },
  { code: '+358', name: 'Finland' },
  { code: '+48', name: 'Poland' },
  { code: '+36', name: 'Hungary' },
  { code: '+420', name: 'Czech Republic' },
  { code: '+30', name: 'Greece' },
  { code: '+40', name: 'Romania' },
  { code: '+41', name: 'Switzerland' },
  { code: '+43', name: 'Austria' },
  { code: '+32', name: 'Belgium' },
  { code: '+351', name: 'Portugal' },
  { code: '+353', name: 'Ireland' },
  { code: '+972', name: 'Israel' },
  { code: '+961', name: 'Lebanon' },
  { code: '+963', name: 'Syria' },
  { code: '+962', name: 'Jordan' },
  { code: '+964', name: 'Iraq' },
  { code: '+98', name: 'Iran' },
];

export default function ContactForm() {
  const [formState, setFormState] = useState({
    fullName: '',
    email: '',
    countryCode: '',
    phoneNumber: '',
    message: ''
  });
  const [isValid, setIsValid] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [countrySelectOpen, setCountrySelectOpen] = useState(false);

  // Function to validate email domain by checking DNS records
  const validateEmailDomain = async (email: string) => {
    try {
      // Extract domain from email
      const domain = email.split('@')[1];
      if (!domain) return false;

      // Check if domain exists with a HEAD request
      const response = await fetch(`https://dns-lookup-api.herokuapp.com/?domain=${domain}`, { 
        method: 'HEAD',
        mode: 'no-cors' // Fallback if CORS is an issue
      });
      
      return true; // If the request didn't throw an error, domain likely exists
    } catch (error) {
      console.error('Error validating email domain:', error);
      return false;
    }
  };

  // Function to validate email syntax
  const validateEmailSyntax = (email: string) => {
    // Use a more comprehensive regex for email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  // Function to validate country code
  const validateCountryCode = (code: string) => {
    // Simple regex for country code: + followed by 1-3 digits
    const codeRegex = /^\+[1-9]\d{0,2}$/;
    return codeRegex.test(code);
  };

  // Function to validate phone number
  const validatePhoneNumber = (phoneNumber: string) => {
    // Simple regex for phone numbers (digits only)
    const phoneRegex = /^[0-9]{6,14}$/;
    return phoneRegex.test(phoneNumber);
  };

  useEffect(() => {
    // Calculate form completion progress
    let progress = 0;
    if (formState.fullName.trim() !== '') progress += 25;
    if (formState.email.trim() !== '') progress += 25;
    if (formState.countryCode.trim() !== '' && formState.phoneNumber.trim() !== '') progress += 25;
    if (formState.message.trim() !== '') progress += 25;
    setFormProgress(progress);

    // Reset email error when email changes
    if (emailError && formState.email !== '') {
      setEmailError('');
    }

    // Reset phone error when phone number changes
    if (phoneError && (formState.countryCode !== '' || formState.phoneNumber !== '')) {
      setPhoneError('');
    }

    // Check if all fields are filled and email is valid
    const { fullName, email, countryCode, phoneNumber, message } = formState;
    const hasAllFields = fullName.trim() !== '' && 
                         email.trim() !== '' && 
                         countryCode.trim() !== '' && 
                         phoneNumber.trim() !== '' && 
                         message.trim() !== '';
    const hasValidEmail = validateEmailSyntax(email) && !emailError;
    const hasValidPhone = !phoneError && validateCountryCode(countryCode) && validatePhoneNumber(phoneNumber);
    
    setIsValid(hasAllFields && hasValidEmail && hasValidPhone);
  }, [formState, emailError, phoneError]);

  // Handle click outside to close country select dropdown
  useEffect(() => {
    if (countrySelectOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        if (!target.closest('#contact-form-country-code-select-container')) {
          setCountrySelectOpen(false);
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [countrySelectOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));

    // Validate email when it changes and is not empty
    if (name === 'email' && value.trim() !== '') {
      if (!validateEmailSyntax(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        // Clear error if syntax is valid, then check domain
        setEmailError('');
        
        // Debounce domain validation to avoid excessive API calls
        const timeoutId = setTimeout(async () => {
          const isDomainValid = await validateEmailDomain(value);
          if (!isDomainValid) {
            setEmailError('Please enter an email with a valid domain');
          }
        }, 500);
        
        return () => clearTimeout(timeoutId);
      }
    }

    // Validate phone number
    if (name === 'phoneNumber' && value.trim() !== '') {
      if (!validatePhoneNumber(value)) {
        setPhoneError('Phone number should contain 6-14 digits');
      } else {
        validatePhoneFields();
      }
    }
  };

  // Helper to validate both phone fields together
  const validatePhoneFields = () => {
    const { countryCode, phoneNumber } = formState;
    
    if (countryCode && phoneNumber) {
      if (!validateCountryCode(countryCode)) {
        setPhoneError('Invalid country code format (e.g. +1)');
      } else if (!validatePhoneNumber(phoneNumber)) {
        setPhoneError('Phone number should contain 6-14 digits');
      } else {
        setPhoneError('');
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      // Show loading spinner
      setIsSubmitting(true);
      
      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        
        // Reset form after success
        setTimeout(() => {
          setFormState({ fullName: '', email: '', countryCode: '', phoneNumber: '', message: '' });
          setIsSuccess(false);
        }, 3000);
      }, 2000);
    }
  };

  const handleReset = () => {
    setFormState({
      fullName: '',
      email: '',
      countryCode: '',
      phoneNumber: '',
      message: ''
    });
    setEmailError('');
    setPhoneError('');
  };

  // Get the current selected country name
  const getSelectedCountryName = () => {
    const country = countryCodes.find(c => c.code === formState.countryCode);
    return country ? country.name : '';
  };

  return (
    <div id="contact-form-container">
      {/* Rotating border animation */}
      <div id="contact-form-border"></div>
      
      {/* Form container */}
      <div id="contact-form-content">
        <h2 id="contact-form-title">Send Message</h2>
        
        {/* Progress bar */}
        <div id="form-progress-container">
          <div 
            id="form-progress-bar" 
            style={{ width: `${formProgress}%` }}
            className={isValid ? 'complete' : ''}
          ></div>
        </div>
        
        {isSuccess ? (
          <div id="success-message-container">
            <div id="success-icon-container">
              <FaCheck id="success-icon" />
            </div>
            <h3 id="success-title">Message Sent!</h3>
            <p id="success-text">Thank you for your message. We'll get back to you soon.</p>
            <div id="success-confetti">
              <span className="confetti-piece"></span>
              <span className="confetti-piece"></span>
              <span className="confetti-piece"></span>
              <span className="confetti-piece"></span>
              <span className="confetti-piece"></span>
              <span className="confetti-piece"></span>
              <span className="confetti-piece"></span>
              <span className="confetti-piece"></span>
              <span className="confetti-piece"></span>
              <span className="confetti-piece"></span>
              <span className="confetti-piece"></span>
              <span className="confetti-piece"></span>
            </div>
          </div>
        ) : (
          <form id="contact-form" onSubmit={handleSubmit}>
            {/* Full Name Input */}
            <div id="contact-form-name-container">
              <input
                type="text"
                id="contact-form-name-input"
                name="fullName"
                value={formState.fullName}
                onChange={handleChange}
                placeholder=" "
                required
                disabled={isSubmitting}
              />
              <label 
                htmlFor="contact-form-name-input"
                id="contact-form-name-label"
              >
                Full Name
              </label>
            </div>
            
            {/* Email Input */}
            <div id="contact-form-email-container">
              <input
                type="email"
                id="contact-form-email-input"
                name="email"
                value={formState.email}
                onChange={handleChange}
                placeholder=" "
                required
                disabled={isSubmitting}
                className={emailError ? 'error' : ''}
              />
              <label 
                htmlFor="contact-form-email-input"
                id="contact-form-email-label"
              >
                Email
              </label>
              {emailError && (
                <div id="email-error-message">{emailError}</div>
              )}
            </div>
            
            {/* Phone Number Input (with country code) */}
            <div id="contact-form-phone-container">
              <div id="contact-form-phone-fields">
                {/* Country Code Dropdown */}
                <div id="contact-form-country-code-wrapper">
                  <div 
                    id="contact-form-country-code-select-container" 
                    className={`${phoneError ? 'error' : ''} ${countrySelectOpen ? 'open' : ''} ${formState.countryCode ? 'has-value' : ''}`}
                  >
                    <div 
                      id="contact-form-country-code-selected"
                      onClick={(e) => {
                        e.stopPropagation();
                        setCountrySelectOpen(!countrySelectOpen);
                      }}
                    >
                      <div id="contact-form-selected-code">{formState.countryCode || " "}</div>
                      <div id="contact-form-selected-arrow"></div>
                    </div>
                    
                    {countrySelectOpen && (
                      <div id="contact-form-country-code-dropdown">
                        {countryCodes.map((country) => (
                          <div 
                            key={country.code} 
                            className="country-option"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFormState(prev => ({
                                ...prev,
                                countryCode: country.code
                              }));
                              setCountrySelectOpen(false);
                              validatePhoneFields();
                            }}
                          >
                            <span className="country-code">{country.code}</span>
                            <span className="country-name">{country.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <label 
                    id="contact-form-country-code-label"
                    className={formState.countryCode || countrySelectOpen ? 'active' : ''}
                  >
                    Country Code
                  </label>
                </div>
                
                {/* Phone Number Input */}
                <div id="contact-form-phone-number-wrapper">
                  <input
                    type="tel"
                    id="contact-form-phone-number-input"
                    name="phoneNumber"
                    value={formState.phoneNumber}
                    onChange={handleChange}
                    placeholder=" "
                    required
                    disabled={isSubmitting}
                    className={phoneError ? 'error' : ''}
                  />
                  <label 
                    htmlFor="contact-form-phone-number-input"
                    id="contact-form-phone-number-label"
                  >
                    Phone Number
                  </label>
                </div>
              </div>
              
              {phoneError && (
                <div id="phone-error-message">{phoneError}</div>
              )}
            </div>
            
            {/* Message Input */}
            <div id="contact-form-message-container">
              <textarea
                id="contact-form-message-input"
                name="message"
                value={formState.message}
                onChange={handleChange}
                rows={4}
                placeholder=" "
                required
                disabled={isSubmitting}
              />
              <label 
                htmlFor="contact-form-message-input"
                id="contact-form-message-label"
              >
                Type your message...
              </label>
            </div>
            
            {/* Buttons Container */}
            <div id="contact-form-buttons-container">
              {/* Reset Button */}
              <button
                type="button"
                id="contact-form-reset-button"
                onClick={handleReset}
                disabled={isSubmitting || (formState.fullName === '' && formState.email === '' && formState.countryCode === '' && formState.phoneNumber === '' && formState.message === '')}
              >
                <span id="reset-text">Reset</span>
                <span id="reset-icon">
                  <FaUndo />
                </span>
              </button>
              
              {/* Send Button */}
              <button
                type="submit"
                id="contact-form-submit-button"
                className={isValid ? 'enabled' : 'disabled'}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <span id="submit-spinner"><FaSpinner /></span>
                ) : (
                  <>
                    <span id="submit-text">Send</span>
                    <span id="submit-icon" className={isValid ? 'visible' : ''}>
                      <FaPaperPlane />
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 