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
  FloatingMenu 
} from '../components/ui';

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
    document.title = 'Solidev Electrosoft Pvt. Ltd. - Convert Ideas Into Reality';

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Leading software development company specializing in web development, mobile applications, and custom software solutions. Convert your ideas into reality with our expert team.';
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
  }, []);

  return (
    <div className="App">
      {/* Pre Loader */}
      <PreLoader />

      {/* Back to Top */}
      <BackToTop />

      {/* Mouse Cursor */}
      <MouseCursor />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <Hero />

        {/* About Section */}
        <About />

        {/* CTA Section */}
        <CTA />

        {/* Gallery Section */}
        <Gallery />

        {/* Team Section */}
        <Team />

        {/* Feature Section */}
        <Feature />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Clients Section */}
        <Clients />

        {/* Contact CTA Section */}
        <ContactCTA />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Menu */}
      <FloatingMenu />
    </div>
  );
};

export default Home;