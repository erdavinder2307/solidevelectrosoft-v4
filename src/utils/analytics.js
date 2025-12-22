/**
 * Google Analytics 4 (GA4) Event Tracking Utility
 * 
 * Centralized analytics module for tracking user interactions across the application.
 * Follows GA4 best practices and ensures privacy-compliant event tracking.
 * 
 * IMPORTANT PRINCIPLES:
 * - Track only meaningful user intent events
 * - Never include PII (email, phone, message content)
 * - Avoid redundant or noisy events
 * - Ensure mobile compatibility
 * - Prevent double-firing on re-renders
 */

// GA4 Measurement IDs (loaded via gtag.js in App.jsx)
const GA_MEASUREMENT_IDS = ['GT-KFNT9K9X', 'GT-MBLK2C2Q'];

/**
 * Initialize Google Analytics
 * Called once during app startup
 */
export const initializeAnalytics = () => {
  // gtag is already initialized in App.jsx via script tags
  // This function can be used for additional configuration
  if (typeof window.gtag === 'function') {
    console.log('GA4 Analytics initialized');
    
    // Configure default parameters for all events
    window.gtag('set', {
      'app_name': 'Solidev Electrosoft',
      'app_version': '4.0',
    });
  } else {
    console.warn('GA4 gtag not available - analytics disabled');
  }
};

/**
 * Track a custom event
 * 
 * @param {string} eventName - GA4 event name (use snake_case)
 * @param {object} params - Event parameters (optional)
 * 
 * Example:
 *   trackEvent('cta_clicked', { cta_label: 'Free Consultation', cta_location: 'hero' })
 */
export const trackEvent = (eventName, params = {}) => {
  if (typeof window.gtag !== 'function') {
    console.warn(`Analytics not available - skipping event: ${eventName}`);
    return;
  }

  // Sanitize parameters to ensure no PII
  const sanitizedParams = sanitizeParams(params);

  try {
    window.gtag('event', eventName, sanitizedParams);
    console.log(`GA4 Event: ${eventName}`, sanitizedParams);
  } catch (error) {
    console.error('Error tracking event:', error);
  }
};

/**
 * Track page view (for SPA route changes)
 * 
 * @param {string} path - Current route path
 * @param {string} title - Page title
 */
export const trackPageView = (path, title) => {
  if (typeof window.gtag !== 'function') return;

  try {
    // Send page_view to all configured GA properties
    GA_MEASUREMENT_IDS.forEach(measurementId => {
      window.gtag('config', measurementId, {
        page_path: path,
        page_title: title,
      });
    });
    console.log(`GA4 Page View: ${path} - ${title}`);
  } catch (error) {
    console.error('Error tracking page view:', error);
  }
};

/**
 * Sanitize event parameters to remove PII
 * Removes: email, phone, message, name fields
 */
const sanitizeParams = (params) => {
  const sanitized = { ...params };
  const piiFields = ['email', 'phone', 'message', 'name', 'password', 'address'];
  
  piiFields.forEach(field => {
    if (sanitized[field]) {
      delete sanitized[field];
    }
  });
  
  return sanitized;
};

// ================================
// CTA & LEAD GENERATION EVENTS
// ================================

/**
 * Track CTA button clicks
 * Business value: Measures which CTAs drive conversions
 * 
 * @param {string} ctaLabel - CTA text/identifier
 * @param {string} ctaLocation - Where on page (hero, pricing, footer, navbar)
 * @param {string} page - Current page/route
 */
export const trackCTAClick = (ctaLabel, ctaLocation, page = window.location.pathname) => {
  trackEvent('cta_clicked', {
    cta_label: ctaLabel,
    cta_location: ctaLocation,
    page,
  });
};

// ================================
// PRICING & PLAN EVENTS
// ================================

/**
 * Track when pricing section is viewed
 * Business value: Measures interest in pricing
 */
export const trackPricingSectionViewed = (page = window.location.pathname) => {
  trackEvent('pricing_section_viewed', { page });
};

/**
 * Track plan selection
 * Business value: Measures which plans are most popular
 * 
 * @param {string} planId - Plan identifier (e.g., IDEA_VALIDATION_99)
 * @param {number} price - Plan price
 */
export const trackPlanSelected = (planId, price, page = window.location.pathname) => {
  trackEvent('plan_selected', {
    plan_id: planId,
    price,
    page,
  });
};

/**
 * Track pricing CTA clicks
 * Business value: Measures plan-specific conversion intent
 */
export const trackPricingCTAClick = (planId, ctaLabel) => {
  trackEvent('pricing_cta_clicked', {
    plan_id: planId,
    cta_label: ctaLabel,
  });
};

// ================================
// AI ASSISTANT EVENTS
// ================================

/**
 * Track AI assistant session start
 * Business value: Measures AI assistant adoption
 */
export const trackAISessionStarted = (planId, sourcePage = window.location.pathname) => {
  trackEvent('ai_session_started', {
    plan_id: planId,
    source_page: sourcePage,
  });
};

/**
 * Track AI question answered
 * Business value: Measures engagement depth
 */
export const trackAIQuestionAnswered = (questionIndex, planId) => {
  trackEvent('ai_question_answered', {
    question_index: questionIndex,
    plan_id: planId,
  });
};

/**
 * Track AI session completion
 * Business value: Measures completion rate vs abandonment
 */
export const trackAISessionCompleted = (planId, completionType = 'success') => {
  trackEvent('ai_session_completed', {
    plan_id: planId,
    completion_type: completionType, // 'success' or 'abandoned'
  });
};

/**
 * Track AI upgrade prompt shown
 * Business value: Measures upsell opportunity
 */
export const trackAIUpgradePromptShown = (fromPlan, toPlan) => {
  trackEvent('ai_upgrade_prompt_shown', {
    from_plan: fromPlan,
    to_plan: toPlan,
  });
};

/**
 * Track AI upgrade clicked
 * Business value: Measures upsell conversion
 */
export const trackAIUpgradeClicked = (fromPlan, toPlan) => {
  trackEvent('ai_upgrade_clicked', {
    from_plan: fromPlan,
    to_plan: toPlan,
  });
};

// ================================
// PRODUCTS & PORTFOLIO EVENTS
// ================================

/**
 * Track product detail page view
 * Business value: Measures product interest
 */
export const trackProductViewed = (productId, productName) => {
  trackEvent('product_viewed', {
    product_id: productId,
    product_name: productName,
  });
};

/**
 * Track product screenshots opened
 * Business value: Measures deep engagement with products
 */
export const trackProductScreenshotsOpened = (productId) => {
  trackEvent('product_screenshots_opened', {
    product_id: productId,
  });
};

/**
 * Track portfolio project viewed
 * Business value: Measures portfolio engagement
 */
export const trackPortfolioViewed = (projectId) => {
  trackEvent('portfolio_viewed', {
    project_id: projectId,
  });
};

/**
 * Track external link clicks
 * Business value: Measures interest in live demos/stores
 */
export const trackExternalLinkClicked = (destination, page = window.location.pathname) => {
  trackEvent('external_link_clicked', {
    destination, // 'app_store', 'website', 'github', etc.
    page,
  });
};

// ================================
// CONTACT & CONVERSION EVENTS
// ================================

/**
 * Track contact page view
 * Business value: Measures conversion funnel entry
 */
export const trackContactPageViewed = () => {
  trackEvent('contact_page_viewed');
};

/**
 * Track contact form started (user focuses on form)
 * Business value: Measures conversion intent
 */
export const trackContactFormStarted = (source = 'direct') => {
  trackEvent('contact_form_started', {
    source, // 'ai_assistant', 'pricing', 'footer', 'direct'
  });
};

/**
 * Track contact form submission (successful)
 * Business value: PRIMARY CONVERSION METRIC
 */
export const trackContactFormSubmitted = (source = 'direct') => {
  trackEvent('contact_form_submitted', {
    source,
  });
};

/**
 * Track WhatsApp click
 * Business value: Measures alternative contact preference
 */
export const trackWhatsAppClicked = (page = window.location.pathname) => {
  trackEvent('whatsapp_clicked', {
    page,
  });
};

// ================================
// ADMIN EVENTS (OPTIONAL/INTERNAL)
// ================================

/**
 * Track admin login
 * Business value: Internal monitoring
 */
export const trackAdminLogin = () => {
  trackEvent('admin_login');
};

/**
 * Track admin content creation
 * Business value: Internal content tracking
 */
export const trackAdminContentCreated = (contentType) => {
  trackEvent('admin_content_created', {
    content_type: contentType, // 'product', 'portfolio', 'github'
  });
};

/**
 * Track admin content update
 * Business value: Internal content tracking
 */
export const trackAdminContentUpdated = (contentType) => {
  trackEvent('admin_content_updated', {
    content_type: contentType,
  });
};

// ================================
// UTILITY: Prevent Double-Firing
// ================================

/**
 * Create a debounced tracking function to prevent double-firing
 * Useful for events that might fire multiple times in quick succession
 * 
 * @param {Function} trackingFn - The tracking function to debounce
 * @param {number} delay - Delay in milliseconds (default: 300)
 * @returns {Function} - Debounced tracking function
 */
export const createDebouncedTracker = (trackingFn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => trackingFn(...args), delay);
  };
};

/**
 * Create a tracking function that only fires once per session
 * Useful for events like "pricing_section_viewed" that should only fire once
 * 
 * @param {Function} trackingFn - The tracking function
 * @param {string} key - Unique key for sessionStorage
 * @returns {Function} - Once-per-session tracking function
 */
export const createOncePerSessionTracker = (trackingFn, key) => {
  return (...args) => {
    const sessionKey = `analytics_${key}`;
    if (!sessionStorage.getItem(sessionKey)) {
      trackingFn(...args);
      sessionStorage.setItem(sessionKey, 'true');
    }
  };
};

// Default export for convenience
export default {
  initializeAnalytics,
  trackEvent,
  trackPageView,
  trackCTAClick,
  trackPricingSectionViewed,
  trackPlanSelected,
  trackPricingCTAClick,
  trackAISessionStarted,
  trackAIQuestionAnswered,
  trackAISessionCompleted,
  trackAIUpgradePromptShown,
  trackAIUpgradeClicked,
  trackProductViewed,
  trackProductScreenshotsOpened,
  trackPortfolioViewed,
  trackExternalLinkClicked,
  trackContactPageViewed,
  trackContactFormStarted,
  trackContactFormSubmitted,
  trackWhatsAppClicked,
  trackAdminLogin,
  trackAdminContentCreated,
  trackAdminContentUpdated,
  createDebouncedTracker,
  createOncePerSessionTracker,
};
