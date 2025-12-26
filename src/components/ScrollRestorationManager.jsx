import { useEffect } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

/**
 * ScrollRestorationManager
 * Restores scroll position on back/forward navigation
 * Scrolls to top only on new PUSH navigation
 *
 * How it works:
 * 1. Stores scroll position in sessionStorage keyed by pathname
 * 2. On POP (browser back/forward), restores previous position
 * 3. On PUSH (new navigation), scrolls to top
 * 4. Listens to window scroll to save current position
 * 5. Works with smooth scroll behavior for better UX
 */
const ScrollRestorationManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType();

  // Initialize scroll storage in sessionStorage
  useEffect(() => {
    const initializeScrollStorage = () => {
      const key = 'spa-scroll-positions';
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, JSON.stringify({}));
      }
    };
    initializeScrollStorage();
  }, []);

  // Save scroll position before navigation
  useEffect(() => {
    const handleBeforeUnload = () => {
      saveScrollPosition(location.pathname);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location.pathname]);

  // Handle scroll restoration on route change
  useEffect(() => {
    // Small delay to allow DOM to render
    const timer = setTimeout(() => {
      if (navigationType === 'POP') {
        // Browser back/forward button - restore previous position
        restoreScrollPosition(location.pathname);
      } else {
        // New navigation (PUSH, REPLACE) - scroll to top
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto', // instant scroll
        });
        // Also clear the stored position for new navigation
        clearScrollPosition(location.pathname);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [location, navigationType]);

  // Passive scroll listener to save position on manual scrolling
  useEffect(() => {
    let scrollTimeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        saveScrollPosition(location.pathname);
      }, 150); // Debounce to avoid excessive writes
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [location.pathname]);

  return null;
};

/**
 * Utility Functions
 */

const getScrollStorage = () => {
  const key = 'spa-scroll-positions';
  const stored = sessionStorage.getItem(key);
  return stored ? JSON.parse(stored) : {};
};

const setScrollStorage = (storage) => {
  const key = 'spa-scroll-positions';
  sessionStorage.setItem(key, JSON.stringify(storage));
};

const saveScrollPosition = (pathname) => {
  const storage = getScrollStorage();
  storage[pathname] = window.scrollY || window.pageYOffset;
  setScrollStorage(storage);
};

const restoreScrollPosition = (pathname) => {
  const storage = getScrollStorage();
  const scrollY = storage[pathname];

  if (scrollY !== undefined && scrollY > 0) {
    // Use requestAnimationFrame to ensure DOM is fully rendered
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollY,
        left: 0,
        behavior: 'auto',
      });
    });
  } else {
    // Fallback: scroll to top if no position stored
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto',
    });
  }
};

const clearScrollPosition = (pathname) => {
  const storage = getScrollStorage();
  delete storage[pathname];
  setScrollStorage(storage);
};

export default ScrollRestorationManager;
