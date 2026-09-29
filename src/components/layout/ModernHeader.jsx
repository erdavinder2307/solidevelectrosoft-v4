import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AIProjectAssistant from '../ai/AIProjectAssistant';
import { useAIAssistant } from '../../hooks/useAIAssistant';
import { useSearch } from '../../contexts/SearchContext';

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
  const [openDropdown, setOpenDropdown] = useState(null);
  const { isAIOpen, openAI, closeAI } = useAIAssistant();
  const { openSearch } = useSearch();
  const location = useLocation();

  // Navigation items; an item with `children` renders as a dropdown (desktop) or a group (mobile).
  // Items without a `path` have no page of their own.
  const navItems = [
    { path: '/ai-employee', label: 'AI Team', accent: true },
    {
      path: '/services',
      label: 'Services',
      children: [
        { path: '/services/web-development', label: 'Web App Development' },
        { path: '/services/mobile-app-development', label: 'Mobile App Development' },
        { path: '/services/ai-solutions', label: 'AI Team & Automation' },
        { path: '/services/mvp-development', label: 'MVP Development' },
      ],
    },
    {
      label: 'Our Work',
      children: [
        { path: '/portfolio', label: 'Client projects' },
        { path: '/products', label: 'Our products' },
      ],
    },
    {
      label: 'Resources',
      children: [
        { path: '/blog', label: 'Blog' },
        { path: '/videos', label: 'Videos' },
        { path: '/faq', label: 'FAQ' },
      ],
    },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
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
    setOpenDropdown(null);
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

  const isItemActive = (item) =>
    (item.path && isActive(item.path)) || (item.children || []).some((child) => isActive(child.path));

  const handleDropdownKeyDown = (event) => {
    if (event.key !== 'Escape') return;
    setOpenDropdown(null);
    event.currentTarget.querySelector('.nav-link-hover')?.focus();
  };

  const handleDropdownBlur = (event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setOpenDropdown(null);
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
          // The open mobile menu is light and shows the dark logo and icon, so the bar turns light with it
          background: isScrolled || isMobileMenuOpen ? 'rgba(255, 255, 255, 0.95)' : 'rgba(10, 10, 20, 0.9)',
          backdropFilter: isScrolled || isMobileMenuOpen ? 'blur(20px)' : 'blur(6px)',
          borderBottom: isScrolled || isMobileMenuOpen ? '1px solid var(--border-light)' : '1px solid rgba(255, 255, 255, 0.06)',
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
              {navItems.map((item) => {
                const hasDropdown = Boolean(item.children);
                const isOpen = openDropdown === item.label;
                const topStyle = {
                  padding: 'var(--space-2) var(--space-4)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: item.accent ? '600' : '500',
                  fontFamily: 'inherit',
                  color: isItemActive(item)
                    ? 'var(--color-primary-500)'
                    : (isScrolled ? 'var(--text-secondary)' : 'rgba(255,255,255,0.9)'),
                  textDecoration: 'none',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all var(--transition-default)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                  whiteSpace: 'nowrap',
                };
                const topContent = (
                  <>
                    {item.accent && (
                      <span
                        aria-hidden="true"
                        style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--color-primary-500)',
                        }}
                      />
                    )}
                    {item.label}
                    {hasDropdown && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    )}
                  </>
                );

                return (
                  <div
                    key={item.label}
                    style={{ position: 'relative' }}
                    className="nav-item-wrapper"
                    {...(hasDropdown && {
                      onMouseEnter: () => setOpenDropdown(item.label),
                      onMouseLeave: () => setOpenDropdown(null),
                      onFocus: (event) => {
                        if (!event.currentTarget.contains(event.relatedTarget)) setOpenDropdown(item.label);
                      },
                      onBlur: handleDropdownBlur,
                      onKeyDown: handleDropdownKeyDown,
                    })}
                  >
                    {item.path ? (
                      <Link
                        to={item.path}
                        style={topStyle}
                        className="nav-link-hover"
                        {...(hasDropdown && { 'aria-haspopup': 'true', 'aria-expanded': isOpen })}
                      >
                        {topContent}
                      </Link>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                        style={topStyle}
                        className="nav-link-hover"
                        aria-haspopup="true"
                        aria-expanded={isOpen}
                      >
                        {topContent}
                      </button>
                    )}

                    {hasDropdown && (
                      <div
                        className="nav-dropdown"
                        style={{
                          position: 'absolute',
                          top: '100%',
                          left: '50%',
                          transform: 'translateX(-50%)',
                          paddingTop: '8px',
                          opacity: isOpen ? 1 : 0,
                          visibility: isOpen ? 'visible' : 'hidden',
                          transition: 'all 0.2s ease',
                          zIndex: 1001,
                          pointerEvents: isOpen ? 'auto' : 'none',
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
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
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
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Desktop CTA & Mobile Menu Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              {/* Search trigger */}
              <button
                type="button"
                onClick={openSearch}
                className="nh-search-icon-btn"
                aria-label="Search (⌘K)"
                title="Search (⌘K / Ctrl+K)"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="20" height="20">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              {/* Desktop CTA */}
              <button
                onClick={openAI}
                className="modern-btn modern-btn-primary modern-lg-block"
                style={{ display: 'none' }}
              >
                ✨ Book a free call
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
                {navItems.map((item, index) => {
                  const topStyle = {
                    display: 'block',
                    padding: 'var(--space-4)',
                    fontSize: 'var(--text-xl)',
                    fontWeight: '600',
                    color: isItemActive(item) ? 'var(--color-primary-500)' : 'var(--text-primary)',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-lg)',
                    transition: 'all var(--transition-default)',
                  };
                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      {item.path ? (
                        <Link to={item.path} style={topStyle}>
                          {item.label}
                        </Link>
                      ) : (
                        <div style={topStyle}>{item.label}</div>
                      )}

                      {item.children && (
                        <div style={{ paddingLeft: 'var(--space-4)', marginTop: 'var(--space-2)' }}>
                          {item.children.map((child) => (
                            <Link
                              key={child.path}
                              to={child.path}
                              style={{
                                display: 'block',
                                padding: 'var(--space-3) var(--space-4)',
                                fontSize: 'var(--text-base)',
                                color: isActive(child.path) ? 'var(--color-primary-500)' : 'var(--text-secondary)',
                                textDecoration: 'none',
                              }}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  );
                })}
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
                  ✨ Book a free call
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
        
        .dropdown-link:hover,
        .dropdown-link:focus-visible {
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
