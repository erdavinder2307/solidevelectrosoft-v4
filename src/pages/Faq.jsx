import React, { useEffect } from 'react';
import { Header, Footer } from '../components/layout';
import {
  PreLoader,
  BackToTop,
  MouseCursor,
  FloatingMenu,
} from '../components/ui';
import Breadcrumb from '../components/sections/Breadcrumb';

const Faq = () => {
  useEffect(() => {
    const gtag = (...args) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(args);
    };

    gtag('js', new Date());
    gtag('config', 'GT-KFNT9K9X');
    gtag('config', 'GT-MBLK2C2Q');

    document.documentElement.className = 'no-js';
    document.title = 'FAQ - Frequently Asked Questions About Web & Mobile Development Services';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Get answers to frequently asked questions about our web development, mobile app development, and software services.';
    }

    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.href = 'https://solidevelectrosoft.com/faq.html';
    } else {
      const c = document.createElement('link');
      c.rel = 'canonical';
      c.href = 'https://solidevelectrosoft.com/faq.html';
      document.head.appendChild(c);
    }
  }, []);

  return (
    <div className="App">
      <PreLoader />
      <BackToTop />
      <MouseCursor />
      <Header />

      <Breadcrumb
        title="FAQ"
        backgroundImage="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/qn.webp"
      />

      <main>
        <div className="faq-section pt-140 pb-140">
          <div className="container">
            <div className="row">
              <div className="col-11">
                <div className="accordion tp-accordion" id="accordionExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq1">
                      <button className="accordion-button" type="button" data-bs-toggle="collapse">What services do you offer?</button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="faq1" data-bs-parent="#accordionExample">
                      <div className="accordion-body">We provide web development, mobile app development, game development, and custom software solutions.</div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq2">
                      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse">How do you price projects?</button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="faq2" data-bs-parent="#accordionExample">
                      <div className="accordion-body">Pricing depends on scope, timeline and technologies. Contact us for a tailored quote.</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA section (mirrors v3) */}
        <div className="tp-sv-contact grey-bg-4 pt-140 pb-140">
          <div className="container">
            <div className="row ">
              <div className="col-12">
                <div className="tp-section-wrapper text-center pb-60">
                  <span className="tp-section-subtitle mb-25">Direct Contact</span>
                  <h2 className="tp-section-title">Still, you have a problem. Direct <br /> contact for a solution?</h2>
                </div>
              </div>
            </div>
            <div className="row g-0">
              <div className="col-lg-8">
                <div className="tp-contact-form tp-contact-form-2 white-bg pt-50 pl-50 pr-50 pb-55 mr-60">
                  <div className="ajax-response" style={{ display: 'none', padding: 15, marginBottom: 20, borderRadius: 5, textAlign: 'center' }} />
                  <h4 className="tp-contact-form-title">Direct Contact with us</h4>
                  <form name="form" id="faq-contact-form" action="assets/mail.php" method="POST">
                    <input type="text" name="name" placeholder="Enter your name*" required />
                    <input type="email" name="email" placeholder="Enter your email*" required />
                    <textarea name="message" placeholder="Enter your message*" required />
                    <button type="submit" className="tp-btn-border">Send Message</button>
                  </form>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tp-ct-info-box black-bg">
                  <div className="tp-ct-info tp-ct-info-border pt-50 pl-50 pb-35">
                    <h3 className="tp-ct-info__title text-white mb-35">Get in touch</h3>
                    <p>Soho 419P, 4th Floor, Block A, Chandigarh Citi Center, VIP Road, Zirakpur, 140603, India</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

      <Footer />
      <FloatingMenu />
    </div>
  );
};

export default Faq;
