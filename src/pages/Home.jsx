import React, { useEffect } from 'react';

// Layout Components
import { Header, Footer } from '../components/layout';

// Section Components
import { 
  Hero, 
  About, 
  CTA, 
  Gallery, 
  Team, 
  Feature, 
  Testimonials, 
  Clients, 
  ContactCTA 
} from '../components/sections';

// UI Components
import { 
  PreLoader, 
  BackToTop, 
  MouseCursor, 
  FloatingMenu,
  AnimatedSection,
  ScrollProgressIndicator 
} from '../components/ui';

// Modern Home Styles
import '../assets/css/modern-home.css';

const Home = () => {
  useEffect(() => {
    // Add Google Analytics
    const gtag = (...args) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(args);
    };

    // Initialize gtag
    gtag('js', new Date());
    gtag('config', 'GT-KFNT9K9X');
    gtag('config', 'GT-MBLK2C2Q');

    // Conversion event
    gtag('event', 'conversion', {'send_to': 'GT-KFNT9K9X/MgRjCLiyz4EbEIWQz78_'});

    // Set document class
    document.documentElement.className = 'no-js';

    // Set page title
    document.title = 'Solidev Electrosoft - Premium Software Development & Digital Solutions';

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Leading software development company specializing in cutting-edge web development, mobile applications, and custom software solutions. Transform your digital vision into reality with our expert team.';
    }

    // Add canonical URL
    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.href = 'https://solidevelectrosoft.com/';
    } else {
      const canonical = document.createElement('link');
      canonical.rel = 'canonical';
      canonical.href = 'https://solidevelectrosoft.com/';
      document.head.appendChild(canonical);
    }

    // Add structured data for better SEO
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Solidev Electrosoft",
      "url": "https://solidevelectrosoft.com",
      "logo": "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/logo/logo.png",
      "description": "Leading software development company",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Next57 Coworking, Cabin No - 11, C205 Sm Heights Industrial Area",
        "addressLocality": "Mohali",
        "postalCode": "140308",
        "addressCountry": "IN"
      },
      "telephone": "+91-9115866828",
      "email": "admin@solidevelectrosoft.com"
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, []);

  return (
    <div className="App">
      {/* Modern Scroll Progress Indicator */}
      <ScrollProgressIndicator color="#4f46e5" height="3px" />

      {/* Pre Loader */}
      <PreLoader />

      {/* Back to Top */}
      <BackToTop />

      {/* Mouse Cursor */}
      <MouseCursor />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="modern-home-layout">
        {/* Hero Section - Primary focal point */}
        <AnimatedSection className="hero-wrapper" aria-label="Hero section" animation="fade-in">
          <Hero />
        </AnimatedSection>

        {/* Value Proposition - Immediate impact */}
        <AnimatedSection className="value-proposition-wrapper" aria-label="Company overview" animation="fade-in-up" delay={200}>
          <About />
        </AnimatedSection>

        {/* Social Proof - Build trust early */}
        <AnimatedSection className="clients-wrapper" aria-label="Our clients" animation="fade-in-up" delay={400}>
          <Clients />
        </AnimatedSection>

        {/* Services/Features - Core offerings */}
        <AnimatedSection className="features-wrapper" aria-label="Our services" animation="fade-in-up" delay={300}>
          <Feature />
        </AnimatedSection>

        {/* Call to Action - Strategic placement */}
        <AnimatedSection className="cta-wrapper" aria-label="Business success" animation="scale-in" delay={200}>
          <CTA />
        </AnimatedSection>

        {/* Team Showcase - Human connection */}
        <AnimatedSection className="team-wrapper" aria-label="Our team" animation="fade-in-left" delay={300}>
          <Team />
        </AnimatedSection>

        {/* Portfolio/Gallery - Visual proof */}
        <AnimatedSection className="portfolio-wrapper" aria-label="Our work gallery" animation="fade-in-up" delay={200}>
          <Gallery />
        </AnimatedSection>

        {/* Testimonials - Social validation */}
        <AnimatedSection className="testimonials-wrapper" aria-label="Client testimonials" animation="fade-in-right" delay={400}>
          <Testimonials />
        </AnimatedSection>

        {/* Final CTA - Conversion focus */}
        <AnimatedSection className="contact-cta-wrapper" aria-label="Contact us" animation="fade-in-up" delay={300}>
          <ContactCTA />
        </AnimatedSection>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Menu */}
      <FloatingMenu />
    </div>
  );
};

export default Home;