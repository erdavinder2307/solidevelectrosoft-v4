import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AIProjectAssistant from '../ai/AIProjectAssistant';
import { useAIAssistant } from '../../hooks/useAIAssistant';

// Import logos for proper Vite bundling
import logoDark from '../../assets/img/logo/logo 3-bg-dark.png';
import logoLight from '../../assets/img/logo/logo 3.png';

/**
 * Modern Header Component
 * Clean, minimal navbar with mobile-responsive hamburger menu
 */
const ModernHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  const location = useLocation();

  // Navigation items
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services', hasDropdown: true },
    { path: '/products', label: 'Products' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/videos', label: 'Video Library' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  // Service dropdown items
  const serviceItems = [
    { path: '/services/web-development', label: 'Web App Development' },
    { path: '/services/mobile-app-development', label: 'Mobile App Development' },
    { path: '/services/ai-solutions', label: 'AI-Powered Solutions' },
    { path: '/services/mvp-development', label: 'MVP Development' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <>
      <header 
        className={isScrolled ? 'header-scrolled' : ''}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all var(--transition-default)',
          background: isScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 10, 20, 0.9)',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(6px)',
          borderBottom: isScrolled ? '1px solid var(--border-light)' : '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <nav className="modern-container">
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: isScrolled ? '70px' : '80px',
              transition: 'height var(--transition-default)',
              position: 'relative',
            }}
          >
            {/* Logo */}
            <Link 
              to="/" 
              style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: 'none',
                zIndex: 51,
              }}
            >
              {/* White text logo for dark backgrounds */}
              <img 
                src={logoDark}
                alt="Solidev Electrosoft"
                style={{
                  height: isScrolled ? '150px' : '160px',
                  width: 'auto',
                  transition: 'all var(--transition-default)',
                  display: !isScrolled && !isMobileMenuOpen ? 'block' : 'none',
                }}
              />
              {/* Dark text logo for light backgrounds (when scrolled) */}
              <img 
                src={logoLight}
                alt="Solidev Electrosoft"
                style={{
                  height: '150px',
                  width: 'auto',
                  transition: 'all var(--transition-default)',
                  display: isScrolled || isMobileMenuOpen ? 'block' : 'none',
                }}
              />
            </Link>

            {/* Desktop Navigation */}
            <div 
              style={{
                display: 'none',
                alignItems: 'center',
                gap: 'var(--space-1)',
              }}
              className="modern-lg-flex"
            >
              {navItems.map((item) => (
                <div key={item.path} style={{ position: 'relative' }} className="nav-item-wrapper">
                  <Link
                    to={item.path}
                    style={{
                      padding: 'var(--space-2) var(--space-4)',
                      fontSize: 'var(--text-sm)',
                      fontWeight: '500',
                      color: isActive(item.path) 
                        ? 'var(--color-primary-500)' 
                        : (isScrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.9)'),
                      textDecoration: 'none',
                      borderRadius: 'var(--radius-md)',
                      transition: 'all var(--transition-default)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-1)',
                    }}
                    className="nav-link-hover"
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    )}
                  </Link>
                  
                  {/* Dropdown for Services */}
                  {item.hasDropdown && (
                    <div 
                      className="nav-dropdown"
                      style={{
                        position: 'absolute',
                        top: '100%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        paddingTop: '8px',
                        opacity: 0,
                        visibility: 'hidden',
                        transition: 'all 0.2s ease',
                        zIndex: 1001,
                        pointerEvents: 'none',
                      }}
                    >
                      <div 
                        style={{
                          background: 'var(--bg-primary)',
                          border: '1px solid var(--border-light)',
                          borderRadius: 'var(--radius-lg)',
                          boxShadow: 'var(--shadow-xl)',
                          padding: 'var(--space-2)',
                          minWidth: '220px',
                        }}
                      >
                        {serviceItems.map((service) => (
                          <Link
                            key={service.path}
                            to={service.path}
                            style={{
                              display: 'block',
                              padding: 'var(--space-3) var(--space-4)',
                              fontSize: 'var(--text-sm)',
                              color: 'var(--text-secondary)',
                              textDecoration: 'none',
                              borderRadius: 'var(--radius-md)',
                              transition: 'all var(--transition-fast)',
                            }}
                            className="dropdown-link"
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Desktop CTA & Mobile Menu Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              {/* Desktop CTA */}
              <button
                onClick={openAI}
                className="modern-btn modern-btn-primary modern-lg-block"
                style={{ display: 'none' }}
              >
                ✨ Free AI Consultation
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '48px',
                  height: '48px',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  zIndex: 51,
                }}
                className="modern-lg-hidden"
                aria-label="Toggle menu"
              >
                <div style={{ position: 'relative', width: '24px', height: '16px' }}>
                  <span 
                    style={{
                      position: 'absolute',
                      left: 0,
                      width: '24px',
                      height: '2px',
                      background: isMobileMenuOpen ? 'var(--text-primary)' : (isScrolled ? 'var(--text-primary)' : 'white'),
                      borderRadius: '1px',
                      transition: 'all var(--transition-default)',
                      top: isMobileMenuOpen ? '7px' : '0',
                      transform: isMobileMenuOpen ? 'rotate(45deg)' : 'none',
                    }}
                  />
                  <span 
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: '7px',
                      width: '24px',
                      height: '2px',
                      background: isMobileMenuOpen ? 'var(--text-primary)' : (isScrolled ? 'var(--text-primary)' : 'white'),
                      borderRadius: '1px',
                      transition: 'all var(--transition-default)',
                      opacity: isMobileMenuOpen ? 0 : 1,
                    }}
                  />
                  <span 
                    style={{
                      position: 'absolute',
                      left: 0,
                      width: '24px',
                      height: '2px',
                      background: isMobileMenuOpen ? 'var(--text-primary)' : (isScrolled ? 'var(--text-primary)' : 'white'),
                      borderRadius: '1px',
                      transition: 'all var(--transition-default)',
                      top: isMobileMenuOpen ? '7px' : '14px',
                      transform: isMobileMenuOpen ? 'rotate(-45deg)' : 'none',
                    }}
                  />
                </div>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'var(--bg-primary)',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
              paddingTop: '80px',
            }}
            className="modern-lg-hidden"
          >
            <div 
              style={{
                flex: 1,
                overflowY: 'auto',
                padding: 'var(--space-6)',
              }}
            >
              <nav style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      style={{
                        display: 'block',
                        padding: 'var(--space-4)',
                        fontSize: 'var(--text-xl)',
                        fontWeight: '600',
                        color: isActive(item.path) ? 'var(--color-primary-500)' : 'var(--text-primary)',
                        textDecoration: 'none',
                        borderRadius: 'var(--radius-lg)',
                        transition: 'all var(--transition-default)',
                      }}
                    >
                      {item.label}
                    </Link>
                    
                    {/* Service sub-items in mobile */}
                    {item.hasDropdown && (
                      <div style={{ paddingLeft: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                        {serviceItems.map((service) => (
                          <Link
                            key={service.path}
                            to={service.path}
                            style={{
                              display: 'block',
                              padding: 'var(--space-3) var(--space-4)',
                              fontSize: 'var(--text-base)',
                              color: 'var(--text-secondary)',
                              textDecoration: 'none',
                            }}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                style={{ marginTop: 'var(--space-8)' }}
              >
                <button
                  onClick={openAI}
                  className="modern-btn modern-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  ✨ Chat with AI
                </button>
              </motion.div>

              {/* Mobile Contact Info */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  marginTop: 'var(--space-8)',
                  paddingTop: 'var(--space-6)',
                  borderTop: '1px solid var(--border-light)',
                }}
              >
                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--text-tertiary)', marginBottom: 'var(--space-4)' }}>
                  Get in touch
                </p>
                <a 
                  href="tel:+919115866828" 
                  style={{ 
                    display: 'block', 
                    color: 'var(--text-primary)', 
                    textDecoration: 'none',
                    marginBottom: 'var(--space-2)',
                    fontWeight: '500',
                  }}
                >
                  +91-911 586 6828
                </a>
                <a 
                  href="mailto:admin@solidevelectrosoft.com" 
                  style={{ 
                    display: 'block', 
                    color: 'var(--text-secondary)', 
                    textDecoration: 'none',
                    fontSize: 'var(--text-sm)',
                  }}
                >
                  admin@solidevelectrosoft.com
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Consultation Modal */}
      <AIProjectAssistant isOpen={isAIOpen} onClose={closeAI} mode="consultation" />

      {/* CSS for hover effects */}
      <style>{`
        header {
          overflow: visible !important;
        }
        
        header::-webkit-scrollbar {
          display: none !important;
        }
        
        header nav,
        header nav > div {
          overflow: visible !important;
        }
        
        .nav-link-hover:hover {
          background: rgba(255,255,255,0.1);
        }
        
        .header-scrolled .nav-link-hover:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary) !important;
        }
        
        .nav-item-wrapper:hover .nav-dropdown {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
        }
        
        .dropdown-link:hover {
          background: var(--bg-tertiary);
          color: var(--text-primary) !important;
        }
        
        @media (min-width: 1024px) {
          .modern-lg-hidden {
            display: none !important;
          }
          .modern-lg-flex {
            display: flex !important;
          }
          .modern-lg-block {
            display: inline-flex !important;
          }
        }
      `}</style>
    </>
  );
};

export default ModernHeader;
