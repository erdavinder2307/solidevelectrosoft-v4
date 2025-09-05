import React, { useEffect } from 'react';
import { Header, Footer } from '../components/layout';
import {
  PreLoader,
  BackToTop,
  MouseCursor,
  FloatingMenu,
} from '../components/ui';
import Breadcrumb from '../components/sections/Breadcrumb';

const Contact = () => {
  useEffect(() => {
    const gtag = (...args) => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push(args);
    };

    gtag('js', new Date());
    gtag('config', 'GT-KFNT9K9X');
    gtag('config', 'GT-MBLK2C2Q');

    document.documentElement.className = 'no-js';
    document.title = 'Contact Solidev Electrosoft - Get In Touch for Web & Mobile Development Services';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.content = 'Contact Solidev Electrosoft for professional web development, mobile app development, and software solutions. Located in Mohali, India. Get a free consultation today!';
    }

    const existingCanonical = document.querySelector('link[rel="canonical"]');
    if (existingCanonical) {
      existingCanonical.href = 'https://solidevelectrosoft.com/contact.html';
    } else {
      const c = document.createElement('link');
      c.rel = 'canonical';
      c.href = 'https://solidevelectrosoft.com/contact.html';
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
        title="Contacts"
        backgroundImage="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/contact.webp"
      />

      <main>
        <div className="contact-from-section pt-140">
          <div className="container">
            <div className="row">
              <div className="col-lg-4">
                <a target="_blank" rel="noreferrer" href="https://www.google.com/search?q=solidev+electrosoft">
                  <div className="ct-info__box text-center pt-50 pb-50 mb-30">
                    <span className="mb-25 d-inline-block">{/* icon */}</span>
                    <h3 className="ct-info__box-title">Address line</h3>
                    <p className="p-0">Next57 Coworking, Cabin No - 11, <br /> C205 Sm Heights Industrial Area <br /> Phase 8b Mohali, 140308, India</p>
                  </div>
                </a>
              </div>
              <div className="col-lg-4">
                <div className="ct-info__box text-center pt-50 pb-50 mb-30">
                  <span className="mb-25 d-inline-block">{/* icon */}</span>
                  <h3 className="ct-info__box-title">Phone Number</h3>
                  <p className="p-0"><a href="tel:+919115866828">+91-9115866828</a></p>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="ct-info__box text-center pt-50 pb-50 mb-30">
                  <span className="mb-25 d-inline-block">{/* icon */}</span>
                  <h3 className="ct-info__box-title">Mail Address</h3>
                  <p className="p-0">
                    <a target="_blank" rel="noreferrer" href="mailto:support@solidevelectrosoft.com">support@solidevelectrosoft.com</a>
                    <br />
                    <a target="_blank" rel="noreferrer" href="mailto:admin@solidevelectrosoft.com">admin@solidevelectrosoft.com</a>
                  </p>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className="tp-ct-form pl-110 pr-110 pt-80 pb-190">
                  <div className="ajax-response" style={{ display: 'none', padding: 15, marginBottom: 20, borderRadius: 5, textAlign: 'center' }} />

                  <form name="form" id="contact-form" action="assets/mail.php" method="POST">
                    <input type="text" name="name" placeholder="Enter your name*" required />
                    <input type="email" name="email" placeholder="Enter your email*" required />
                    <input type="text" name="phone" placeholder="Enter your number*" required />
                    <input type="text" name="subject" placeholder="Subject*" required />
                    <textarea name="message" placeholder="Enter your message*" required />
                    <div className="text-center">
                      <button type="submit" className="tp-btn-border">Send Message</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>

            <div className="tp-ct-map mt-40">
              <iframe
                title="solidev-map"
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13731.343759315005!2d76.8203578!3d30.6385809!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391029cfc1a83da5%3A0xd1ab166dd3a9a716!2sSolidev%20Electrosoft%20Private%20Limited!5e0!3m2!1sen!2sin!4v1684382188874!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <FloatingMenu />
    </div>
  );
};

export default Contact;
