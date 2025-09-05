import { useEffect, useState } from 'react';

// Custom hook to initialize original website JavaScript functionality
export const useOriginalJS = () => {
  useEffect(() => {
    // Load original JavaScript files
    const scripts = [
      '/src/assets/js/vendor/jquery.js',
      '/src/assets/js/vendor/waypoints.js', 
      '/src/assets/js/bootstrap-bundle.js',
      '/src/assets/js/meanmenu.js',
      '/src/assets/js/swiper-bundle.js',
      '/src/assets/js/slick.js',
      '/src/assets/js/magnific-popup.js',
      '/src/assets/js/parallax.js',
      '/src/assets/js/backtotop.js',
      '/src/assets/js/nice-select.js',
      '/src/assets/js/counterup.js',
      '/src/assets/js/wow.js',
      '/src/assets/js/isotope-pkgd.js',
      '/src/assets/js/imagesloaded-pkgd.js',
      '/src/assets/js/ajax-form.js',
      '/src/assets/js/main.js'
    ];

    const loadedScripts = [];

    // Function to load scripts sequentially
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.onload = resolve;
        script.onerror = reject;
        document.head.appendChild(script);
        loadedScripts.push(script);
      });
    };

    // Load scripts in sequence
    const loadAllScripts = async () => {
      try {
        for (const scriptSrc of scripts) {
          await loadScript(scriptSrc);
        }
        
        // Initialize custom functionality after all scripts are loaded
        initializeCustomFeatures();
      } catch (error) {
        console.warn('Some scripts failed to load:', error);
        // Continue with React functionality even if some scripts fail
        initializeCustomFeatures();
      }
    };

    // Initialize custom features
    const initializeCustomFeatures = () => {
      // Set current year in footer
      const currentYearElement = document.getElementById('CurrentYear');
      if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear().toString();
      }

      // Initialize header sticky behavior
      const handleScroll = () => {
        const header = document.getElementById('header-sticky');
        if (header) {
          if (window.scrollY > 100) {
            header.classList.add('header-sticky-active');
          } else {
            header.classList.remove('header-sticky-active');
          }
        }
      };

      window.addEventListener('scroll', handleScroll);

      // Initialize smooth scroll for internal links
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          const target = document.querySelector(this.getAttribute('href'));
          if (target) {
            target.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      });

      // Initialize lazy loading for images
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src || img.src;
              img.classList.remove('lazy');
              imageObserver.unobserve(img);
            }
          });
        });

        document.querySelectorAll('img[loading="lazy"]').forEach(img => {
          imageObserver.observe(img);
        });
      }
    };

    // Start loading scripts
    loadAllScripts();

    // Cleanup function
    return () => {
      // Remove event listeners
      window.removeEventListener('scroll', () => {});
      
      // Remove dynamically loaded scripts
      loadedScripts.forEach(script => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);
};

// Custom hook for managing component state with localStorage persistence
export const usePersistedState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  const setValue = (value) => {
    try {
      setState(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [state, setValue];
};

// Custom hook for managing scroll position
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener('scroll', updatePosition);
    updatePosition();

    return () => window.removeEventListener('scroll', updatePosition);
  }, []);

  return scrollPosition;
};

// Custom hook for handling window resize
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
