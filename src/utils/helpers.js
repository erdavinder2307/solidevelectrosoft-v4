// JavaScript utilities for handling additional interactions
// This file contains functionality that was in the original main.js

// Initialize features when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize any third-party plugins that might need manual setup
  initializeSliders();
  initializeAnimations();
  setupMobileMenu();
});

// Initialize sliders (if using external slider libraries)
function initializeSliders() {
  // Gallery slider initialization
  if (typeof $ !== 'undefined' && $.fn.slick) {
    $('.tp-gallery-slider').slick({
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }

  // Team slider
  if (typeof $ !== 'undefined' && $.fn.slick) {
    $('.tp-gallery-slider-active').slick({
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 4000,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  }

  // Brand slider
  if (typeof $ !== 'undefined' && $.fn.slick) {
    $('.tp-brand-silder-actiive').slick({
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      arrows: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 4
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 2
          }
        }
      ]
    });
  }
}

// Initialize animations
function initializeAnimations() {
  // WOW animations
  if (typeof WOW !== 'undefined') {
    new WOW().init();
  }

  // AOS animations (if available)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true
    });
  }
}

// Setup mobile menu
function setupMobileMenu() {
  // Mean menu initialization
  if (typeof $ !== 'undefined' && $.fn.meanmenu) {
    $('#mobile-menu').meanmenu({
      meanMenuContainer: '.tp-mobile-menu',
      meanScreenWidth: "991"
    });
  }
}

// Smooth scrolling for anchor links
export function smoothScroll(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Form validation utility
export function validateForm(formData) {
  const errors = {};
  
  if (!formData.name || formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  
  if (!formData.phone || !/^\+?[\d\s-()]+$/.test(formData.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  if (!formData.message || formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

// Utility to format phone numbers
export function formatPhoneNumber(phone) {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add country code if not present
  if (cleaned.length === 10) {
    return `+91${cleaned}`;
  }
  
  return cleaned;
}

// Local storage utilities
export const storage = {
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Could not save to localStorage:', error);
    }
  },
  
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn('Could not read from localStorage:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Could not remove from localStorage:', error);
    }
  }
};
