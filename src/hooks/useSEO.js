/**
 * useSEO Hook
 * Custom hook for managing SEO metadata in React
 * 
 * Uses vanilla DOM manipulation since react-helmet-async is not installed
 * This is production-ready and works well with React SPAs
 */

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { generateCanonicalURL, generateTitle } from '../utils/seo';

/**
 * Set document title
 */
const setTitle = (title) => {
  document.title = title;
};

/**
 * Set or update a meta tag
 */
const setMetaTag = (name, content, isProperty = false) => {
  if (!content) return;
  
  const attribute = isProperty ? 'property' : 'name';
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  
  meta.setAttribute('content', content);
};

/**
 * Set canonical URL
 */
const setCanonical = (url) => {
  let canonical = document.querySelector('link[rel="canonical"]');
  
  if (!canonical) {
    canonical = document.createElement('link');
    canonical.setAttribute('rel', 'canonical');
    document.head.appendChild(canonical);
  }
  
  canonical.setAttribute('href', url);
};

/**
 * Inject structured data (JSON-LD)
 */
const injectStructuredData = (schemas) => {
  // Remove existing structured data scripts
  const existingScripts = document.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());
  
  // Add new schemas
  schemas.forEach((schema, index) => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema, null, 0);
    script.setAttribute('data-schema-index', index);
    document.head.appendChild(script);
  });
};

/**
 * Main useSEO Hook
 * 
 * @param {Object} config - SEO configuration
 * @param {string} config.title - Page title
 * @param {string} config.description - Meta description
 * @param {string} config.keywords - Meta keywords (optional, mostly deprecated)
 * @param {string} config.canonical - Canonical URL path
 * @param {string} config.ogImage - Open Graph image URL
 * @param {string} config.ogType - Open Graph type (website, article, etc.)
 * @param {Array} config.schemas - Array of JSON-LD schemas
 * @param {string} config.robots - Robots directive (default: 'index, follow')
 */
export const useSEO = (config = {}) => {
  const location = useLocation();
  
  useEffect(() => {
    const {
      title,
      description,
      keywords,
      canonical,
      ogImage,
      ogType = 'website',
      schemas = [],
      robots = 'index, follow',
    } = config;
    
    // Set title
    if (title) {
      setTitle(generateTitle(title));
    }
    
    // Set meta description
    if (description) {
      setMetaTag('description', description);
    }
    
    // Set keywords (optional, mostly deprecated but doesn't hurt)
    if (keywords) {
      setMetaTag('keywords', keywords);
    }
    
    // Set robots
    setMetaTag('robots', robots);
    
    // Set canonical URL
    const canonicalURL = generateCanonicalURL(canonical || location.pathname);
    setCanonical(canonicalURL);
    
    // Open Graph tags
    if (title) {
      setMetaTag('og:title', generateTitle(title), true);
    }
    if (description) {
      setMetaTag('og:description', description, true);
    }
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', canonicalURL, true);
    if (ogImage) {
      setMetaTag('og:image', ogImage, true);
    }
    
    // Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    if (title) {
      setMetaTag('twitter:title', generateTitle(title));
    }
    if (description) {
      setMetaTag('twitter:description', description);
    }
    if (ogImage) {
      setMetaTag('twitter:image', ogImage);
    }
    
    // Inject structured data
    if (schemas && schemas.length > 0) {
      injectStructuredData(schemas);
    }
    
    // Scroll to top on route change (good UX for SPA)
    window.scrollTo(0, 0);
    
  }, [config, location.pathname]);
};

/**
 * Simplified useSEO for quick page setup
 * Just pass title and description
 */
export const usePageSEO = (title, description, canonical) => {
  return useSEO({
    title,
    description,
    canonical,
  });
};

export default useSEO;
