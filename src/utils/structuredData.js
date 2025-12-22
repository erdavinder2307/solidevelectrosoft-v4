/**
 * Structured Data (JSON-LD) Utilities
 * Schema.org markup for better search engine understanding
 * 
 * IMPORTANT: Only use real data. No fake reviews or metrics.
 */

import { siteConfig } from './seo';

/**
 * Organization Schema
 * Identifies the business entity
 */
export const generateOrganizationSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.organization.name,
    legalName: siteConfig.organization.legalName,
    url: siteConfig.siteUrl,
    logo: {
      '@type': 'ImageObject',
      url: siteConfig.organization.logo,
    },
    foundingDate: siteConfig.organization.foundingDate,
    contactPoint: {
      '@type': 'ContactPoint',
      email: siteConfig.organization.email,
      telephone: siteConfig.organization.phone,
      contactType: 'Customer Service',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Hindi'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.organization.address.street,
      addressLocality: siteConfig.organization.address.city,
      addressRegion: siteConfig.organization.address.region,
      postalCode: siteConfig.organization.address.postalCode,
      addressCountry: siteConfig.organization.address.country,
    },
    sameAs: [
      siteConfig.social.linkedin,
      siteConfig.social.github,
    ],
  };
};

/**
 * LocalBusiness Schema
 * For service area businesses
 */
export const generateLocalBusinessSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteConfig.siteUrl}/#localbusiness`,
    name: siteConfig.organization.name,
    image: siteConfig.organization.logo,
    url: siteConfig.siteUrl,
    telephone: siteConfig.organization.phone,
    email: siteConfig.organization.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.organization.address.street,
      addressLocality: siteConfig.organization.address.city,
      addressRegion: siteConfig.organization.address.region,
      postalCode: siteConfig.organization.address.postalCode,
      addressCountry: siteConfig.organization.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.7046,
      longitude: 76.7179,
    },
    priceRange: '$$',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };
};

/**
 * Website Schema
 * Defines the website and search functionality
 */
export const generateWebsiteSchema = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}/#website`,
    url: siteConfig.siteUrl,
    name: siteConfig.siteName,
    description: siteConfig.defaultDescription,
    publisher: {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${siteConfig.siteUrl}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
};

/**
 * Service Schema
 * Describes individual services offered
 */
export const generateServiceSchema = (service) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: service.name,
    provider: {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Worldwide',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: service.name,
      itemListElement: service.offerings?.map((offering, index) => ({
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: offering.name,
          description: offering.description,
        },
        position: index + 1,
      })) || [],
    },
  };
};

/**
 * Product (Software Application) Schema
 * For mobile apps and software products
 */
export const generateSoftwareApplicationSchema = (product) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.title,
    description: product.description,
    applicationCategory: product.category || 'BusinessApplication',
    operatingSystem: product.platforms?.join(', ') || 'Web, iOS, Android',
    image: product.thumbnailUrl || product.logo,
    author: {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
    offers: product.price ? {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
    } : undefined,
    ...(product.rating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: product.rating,
        ratingCount: product.ratingCount || 1,
      },
    }),
  };
};

/**
 * Breadcrumb List Schema
 * Helps search engines understand site hierarchy
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

/**
 * FAQ Page Schema
 * For FAQ pages with questions and answers
 */
export const generateFAQSchema = (faqs) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Article Schema
 * For blog posts or case studies
 */
export const generateArticleSchema = (article) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image,
    datePublished: article.publishDate,
    dateModified: article.modifiedDate || article.publishDate,
    author: {
      '@type': 'Organization',
      name: siteConfig.organization.name,
    },
    publisher: {
      '@id': `${siteConfig.siteUrl}/#organization`,
    },
  };
};

/**
 * Helper to inject JSON-LD into page
 * Returns script tag ready for insertion
 */
export const generateStructuredDataScript = (schemaObjects) => {
  const schemas = Array.isArray(schemaObjects) ? schemaObjects : [schemaObjects];
  
  return schemas.map((schema, index) => ({
    type: 'application/ld+json',
    innerHTML: JSON.stringify(schema, null, 0), // Minified
    key: `structured-data-${index}`,
  }));
};

/**
 * Common page schemas
 * Combine multiple schemas for a page
 */
export const getCommonSchemas = () => {
  return [
    generateOrganizationSchema(),
    generateWebsiteSchema(),
    generateLocalBusinessSchema(),
  ];
};

export default {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  generateServiceSchema,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateStructuredDataScript,
  getCommonSchemas,
};
