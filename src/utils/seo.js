/**
 * SEO Configuration and Utilities
 * Centralized SEO management for Solidev Electrosoft
 * 
 * IMPORTANT:
 * - No keyword stuffing
 * - Natural language only
 * - Real data only (no fake reviews/metrics)
 * - Commercial-intent keywords for service-based business
 */

// Base site configuration
export const siteConfig = {
  siteName: 'Solidev Electrosoft',
  siteUrl: 'https://www.solidevelectrosoft.com',
  defaultTitle: 'Solidev Electrosoft | Custom Software Development & AI Solutions',
  titleTemplate: '%s | Solidev Electrosoft',
  defaultDescription: 'Expert custom software development, mobile apps, AI solutions, and MVP development. 10+ years experience building scalable applications for startups and enterprises.',
  twitterHandle: '@solidevelectrosoft',
  social: {
    linkedin: 'https://www.linkedin.com/company/solidev-electrosoft',
    github: 'https://github.com/solidevelectrosoft',
  },
  organization: {
    name: 'Solidev Electrosoft',
    legalName: 'Solidev Electrosoft Private Limited',
    logo: 'https://www.solidevelectrosoft.com/assets/img/logo.png',
    foundingDate: '2014',
    email: 'admin@solidevelectrosoft.com',
    phone: '+91-911-586-6828',
    address: {
      street: 'Next57 Coworking, Cabin No - 11, C205 Sm Heights',
      city: 'Mohali',
      region: 'Punjab',
      postalCode: '140308',
      country: 'IN',
    },
  },
};

/**
 * SEO metadata for different pages
 * Organized by route pattern
 */
export const pageSEO = {
  home: {
    title: 'Custom Software Development & AI Solutions',
    description: 'Solidev Electrosoft delivers custom software development, mobile apps, AI/ML solutions, and MVP development. 10+ years experience building scalable applications for startups and enterprises.',
    keywords: 'custom software development, mobile app development, AI solutions, MVP development, react development, node.js development',
    canonical: '/',
    ogType: 'website',
  },
  
  about: {
    title: 'About Us | Experienced Software Development Team',
    description: 'Founded in 2014, Solidev Electrosoft is a senior-level software development team specializing in custom applications, AI solutions, and startup MVPs.',
    keywords: 'software development company, experienced developers, India software company, startup development',
    canonical: '/about',
    ogType: 'website',
  },
  
  services: {
    title: 'Software Development Services | Web, Mobile & AI',
    description: 'Comprehensive software development services: custom web apps, mobile applications, AI/ML solutions, and rapid MVP development for startups.',
    keywords: 'software development services, custom software, web development, mobile development, AI development',
    canonical: '/services',
    ogType: 'website',
  },
  
  servicesWebDev: {
    title: 'Custom Web Application Development Services',
    description: 'Expert web application development using React, Node.js, .NET Core, and Python. Build scalable, high-performance web apps tailored to your business needs.',
    keywords: 'web application development, react development, node.js development, custom web apps, SaaS development',
    canonical: '/services/web-development',
    ogType: 'service',
  },
  
  servicesMobileApp: {
    title: 'Mobile App Development | iOS & Android',
    description: 'Native and cross-platform mobile app development using React Native and Flutter. Build high-quality apps for iOS and Android platforms.',
    keywords: 'mobile app development, react native, flutter development, iOS development, android development',
    canonical: '/services/mobile-app-development',
    ogType: 'service',
  },
  
  servicesAI: {
    title: 'AI & Machine Learning Solutions',
    description: 'Custom AI/ML solutions including chatbots, predictive analytics, computer vision, and NLP. Leverage AI to automate and optimize your business processes.',
    keywords: 'AI development, machine learning solutions, chatbot development, AI consulting, ML implementation',
    canonical: '/services/ai-solutions',
    ogType: 'service',
  },
  
  servicesMVP: {
    title: 'MVP Development for Startups | Rapid Prototyping',
    description: 'Fast, cost-effective MVP development to validate your startup idea. Get to market quickly with our proven MVP development process.',
    keywords: 'MVP development, startup MVP, rapid prototyping, idea validation, startup development',
    canonical: '/services/mvp-development',
    ogType: 'service',
  },
  
  products: {
    title: 'Our Products | Custom Software Applications',
    description: 'Explore our portfolio of custom software products including web applications, mobile apps, and SaaS platforms built for clients worldwide.',
    keywords: 'software products, custom applications, SaaS products, mobile apps portfolio',
    canonical: '/products',
    ogType: 'website',
  },
  
  portfolio: {
    title: 'Portfolio | Client Projects & Case Studies',
    description: 'View our portfolio of successful software development projects. Real results for startups, SMBs, and enterprises across various industries.',
    keywords: 'software development portfolio, client projects, case studies, development work',
    canonical: '/portfolio',
    ogType: 'website',
  },
  
  contact: {
    title: 'Contact Us | Get a Free Consultation',
    description: 'Contact Solidev Electrosoft for a free consultation. Discuss your software development project and get a detailed quote within 24 hours.',
    keywords: 'contact software company, free consultation, software development quote, hire developers',
    canonical: '/contact',
    ogType: 'website',
  },
  
  faq: {
    title: 'FAQ | Common Questions About Our Services',
    description: 'Frequently asked questions about our software development services, pricing, process, and technologies. Get answers before starting your project.',
    keywords: 'software development FAQ, development questions, pricing information',
    canonical: '/faq',
    ogType: 'website',
  },
};

/**
 * Generate full title with template
 */
export const generateTitle = (pageTitle) => {
  if (!pageTitle) return siteConfig.defaultTitle;
  return `${pageTitle} | ${siteConfig.siteName}`;
};

/**
 * Generate canonical URL
 */
export const generateCanonicalURL = (path) => {
  const cleanPath = path.replace(/\.html$/, ''); // Remove .html extensions
  return `${siteConfig.siteUrl}${cleanPath}`;
};

/**
 * Generate Open Graph meta tags
 */
export const generateOGTags = (pageData) => {
  return {
    'og:site_name': siteConfig.siteName,
    'og:type': pageData.ogType || 'website',
    'og:title': pageData.title || siteConfig.defaultTitle,
    'og:description': pageData.description || siteConfig.defaultDescription,
    'og:url': generateCanonicalURL(pageData.canonical || '/'),
    'og:image': pageData.image || `${siteConfig.siteUrl}/assets/img/og-image.png`,
  };
};

/**
 * Generate Twitter Card meta tags
 */
export const generateTwitterTags = (pageData) => {
  return {
    'twitter:card': 'summary_large_image',
    'twitter:site': siteConfig.twitterHandle,
    'twitter:title': pageData.title || siteConfig.defaultTitle,
    'twitter:description': pageData.description || siteConfig.defaultDescription,
    'twitter:image': pageData.image || `${siteConfig.siteUrl}/assets/img/og-image.png`,
  };
};

/**
 * SEO-friendly service slugs and names
 */
export const services = [
  {
    slug: 'web-development',
    name: 'Web Application Development',
    shortName: 'Web Development',
    path: '/services/web-development',
  },
  {
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    shortName: 'Mobile Apps',
    path: '/services/mobile-app-development',
  },
  {
    slug: 'ai-solutions',
    name: 'AI & ML Solutions',
    shortName: 'AI Solutions',
    path: '/services/ai-solutions',
  },
  {
    slug: 'mvp-development',
    name: 'MVP Development for Startups',
    shortName: 'MVP Development',
    path: '/services/mvp-development',
  },
];

/**
 * Breadcrumb data for navigation
 */
export const generateBreadcrumbs = (pathSegments) => {
  const breadcrumbs = [
    {
      name: 'Home',
      url: siteConfig.siteUrl,
    },
  ];
  
  let currentPath = '';
  pathSegments.forEach((segment, index) => {
    if (!segment) return;
    
    currentPath += `/${segment}`;
    
    // Humanize segment name
    const name = segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
    
    breadcrumbs.push({
      name,
      url: `${siteConfig.siteUrl}${currentPath}`,
    });
  });
  
  return breadcrumbs;
};

/**
 * Robots meta directives
 */
export const robotsConfig = {
  index: 'index, follow',
  noindex: 'noindex, follow',
  nofollow: 'index, nofollow',
  none: 'noindex, nofollow',
};

export default {
  siteConfig,
  pageSEO,
  generateTitle,
  generateCanonicalURL,
  generateOGTags,
  generateTwitterTags,
  services,
  generateBreadcrumbs,
  robotsConfig,
};
