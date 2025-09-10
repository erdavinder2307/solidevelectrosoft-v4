import React, { useEffect, useState } from 'react';
import { Header, Footer } from '../components/layout';
import {
  PreLoader,
  BackToTop,
  MouseCursor,
  FloatingMenu,
} from '../components/ui';
import Breadcrumb from '../components/sections/Breadcrumb';
import emailService from '../services/emailService';

const Faq = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowResponse(false);

    try {
      // Use Azure Communication Services for email
      const result = await emailService.sendContactFormEmail({
        ...formData,
        phone: 'N/A', // FAQ form doesn't have phone field
        subject: 'FAQ Page Contact Form'
      });
      
      if (result.success) {
        setResponseMessage(result.message);
        setShowResponse(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResponseMessage(result.message);
        setShowResponse(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      
      try {
        const fallbackResult = await emailService.sendEmailFallback({
          ...formData,
          phone: 'N/A',
          subject: 'FAQ Page Contact Form'
        });
        setResponseMessage(fallbackResult.message);
        setShowResponse(true);
        
        if (fallbackResult.success) {
          setFormData({ name: '', email: '', message: '' });
        }
      } catch (fallbackError) {
        setResponseMessage('Unable to send message. Please try again later or contact us directly at admin@solidevelectrosoft.com');
        setShowResponse(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };
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
        backgroundImage="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/qn-v2.webp"
      />

      <main>
        <div className="faq-section pt-140 pb-140">
          <div className="container">
            <div className="row">
              <div className="col-11">
                <div className="accordion tp-accordion" id="accordionExample">
                  
                  {/* FAQ 1 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq1">
                      <button 
                        className="accordion-button" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne" 
                        aria-expanded="true" 
                        aria-controls="collapseOne"
                      >
                        What kind of service do you provide?
                      </button>
                    </h2>
                    <div id="collapseOne" className="accordion-collapse collapse show" aria-labelledby="faq1" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        We are a web and Mobile applications development company that specializes in creating customized web applications, Mobile applications and software solutions. Our services include web development, mobile app development, software automation, UI/UX design, and maintenance/support for existing applications. We work with various technologies such as Microsoft Technologies (Asp.net MVC, Asp.net Core), Python, Angular, React, Flutter and more.
                      </div>
                    </div>
                  </div>

                  {/* FAQ 2 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq2">
                      <button 
                        className="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo" 
                        aria-expanded="false" 
                        aria-controls="collapseTwo"
                      >
                        How long does it take to build a Software application?
                      </button>
                    </h2>
                    <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="faq2" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        It depends on the complexity and scale of the project. But since we have experienced developers in our ranks, we can meet your deadline, regardless of the complexity.
                      </div>
                    </div>
                  </div>

                  {/* FAQ 3 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq3">
                      <button 
                        className="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree" 
                        aria-expanded="false" 
                        aria-controls="collapseThree"
                      >
                        How much does a software application cost?
                      </button>
                    </h2>
                    <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="faq3" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        The cost of a new website can vary significantly depending on several factors. These factors include the complexity of the design, the number of pages and features required, the level of customization needed, the platform or content management system (CMS) used, and the specific requirements of the project.
                      </div>
                    </div>
                  </div>

                  {/* FAQ 4 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq4">
                      <button 
                        className="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour" 
                        aria-expanded="false" 
                        aria-controls="collapseFour"
                      >
                        Will my application be mobile-friendly?
                      </button>
                    </h2>
                    <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="faq4" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        Absolutely! Ensuring mobile-friendliness is a priority for us. We understand the importance of reaching your audience on various devices. Our team will design and develop your application with responsive design principles in mind, making it accessible and optimized for a seamless user experience across different mobile devices, including smartphones and tablets. By leveraging technologies like Flutter, Media Query, React Native, or responsive web design, we'll ensure that your application adapts and functions flawlessly on mobile platforms.
                      </div>
                    </div>
                  </div>

                  {/* FAQ 5 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq5">
                      <button 
                        className="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive" 
                        aria-expanded="false" 
                        aria-controls="collapseFive"
                      >
                        How do I start my project with you?
                      </button>
                    </h2>
                    <div id="collapseFive" className="accordion-collapse collapse" aria-labelledby="faq5" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>You can reach out to us by sending an email to admin@solidevelectrosoft.com. Please provide a brief description of your project, including your requirements, timeline, and any other relevant details. Our team will review your email and respond promptly to discuss the next steps.</p>
                        <p>OR</p>
                        <p>You can visit our website (www.solidevelectrosoft.com) and use the provided contact form or messaging feature to send us a direct message. Fill in the required information, including your name, email address, and a message describing your project. Our team will receive your message and get back to you as soon as possible.</p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ 6 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq6">
                      <button 
                        className="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSix" 
                        aria-expanded="false" 
                        aria-controls="collapseSix"
                      >
                        What are your hiring models?
                      </button>
                    </h2>
                    <div id="collapseSix" className="accordion-collapse collapse" aria-labelledby="faq6" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        You can hire our highly qualified experts on full-time, part-time, hourly, monthly and weekly basis as per your convenience.
                      </div>
                    </div>
                  </div>

                  {/* FAQ 7 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq7">
                      <button 
                        className="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSeven" 
                        aria-expanded="false" 
                        aria-controls="collapseSeven"
                      >
                        Can you handle ongoing maintenance?
                      </button>
                    </h2>
                    <div id="collapseSeven" className="accordion-collapse collapse" aria-labelledby="faq7" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Absolutely! We offer ongoing maintenance services to ensure the continued smooth operation and optimal performance of your application. Our maintenance services are designed to keep your application up to date, secure, and functioning at its best.</p>
                        <p>Our maintenance services can be tailored to meet your specific requirements and can be structured on an ongoing basis, whether it's monthly, quarterly, or as needed. We value long-term partnerships with our clients and are committed to providing continuous support to help your application thrive.</p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ 8 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq8">
                      <button 
                        className="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEight" 
                        aria-expanded="false" 
                        aria-controls="collapseEight"
                      >
                        What happens if my application breaks?
                      </button>
                    </h2>
                    <div id="collapseEight" className="accordion-collapse collapse" aria-labelledby="faq8" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>We understand that application issues can occur, and we have a dedicated support system in place to address such situations promptly. If your application breaks or experiences any technical issues, our team is here to assist you.</p>
                        <p>First, we encourage you to reach out to our support team and provide detailed information about the problem you're encountering. Our experts will investigate the issue and work diligently to identify the cause and implement a solution. Depending on the severity and complexity of the problem, the resolution time may vary.</p>
                        <p>Additionally, we offer maintenance and support services to ensure the ongoing functionality and stability of your application. This can include regular updates, bug fixes, security patches, and performance optimizations to keep your application running smoothly.</p>
                        <p>Our goal is to minimize downtime and provide a swift resolution to any issues that arise. We strive to maintain open communication with our clients and keep you informed throughout the troubleshooting and resolution process.</p>
                        <p>Rest assured that we are committed to providing reliable support and ensuring the smooth operation of your application.</p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ 9 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq9">
                      <button 
                        className="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseNine" 
                        aria-expanded="false" 
                        aria-controls="collapseNine"
                      >
                        How long does a application redesign take?
                      </button>
                    </h2>
                    <div id="collapseNine" className="accordion-collapse collapse" aria-labelledby="faq9" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        The duration of an application redesign can vary depending on several factors, including the complexity of the application, the scope of changes required, and the availability of resources. Typically, a complete application redesign may take several weeks to a few months to ensure thorough planning, design, development, testing, and deployment.
                      </div>
                    </div>
                  </div>

                  {/* FAQ 10 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq10">
                      <button 
                        className="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTen" 
                        aria-expanded="false" 
                        aria-controls="collapseTen"
                      >
                        What are the types of companies have you worked with?
                      </button>
                    </h2>
                    <div id="collapseTen" className="accordion-collapse collapse" aria-labelledby="faq10" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        We have worked with a diverse range of companies across various industries. We have designed and developed Software applications for both large sized and small sized business owners from domains like eCommerce, NGO, legal, medical, finance, and many more.
                      </div>
                    </div>
                  </div>

                  {/* FAQ 11 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq11">
                      <button 
                        className="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseEleven" 
                        aria-expanded="false" 
                        aria-controls="collapseEleven"
                      >
                        I don't want to go elsewhere for web application hosting. Can I get it at Solidev Electrosoft?
                      </button>
                    </h2>
                    <div id="collapseEleven" className="accordion-collapse collapse" aria-labelledby="faq11" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>To provide our clients one stop solutions and help them save their costs, this is what our motto is. At Solidev Electrosoft, we provide comprehensive Software development solutions which include:</p>
                        <p>eCommerce Web Design and Development Services</p>
                        <p>Software Development</p>
                        <p>Web Application Design</p>
                        <p>Web Application Hosting</p>
                        <p>Payment Gateway Integration</p>
                        <p>Web Application Re-Designing</p>
                        <p>Web Application Maintenance</p>
                        <p>Mobile Application Development</p>
                        <p>You can either avail our services for a standalone project or as a part of an entire project.</p>
                      </div>
                    </div>
                  </div>

                  {/* FAQ 12 */}
                  <div className="accordion-item">
                    <h2 className="accordion-header" id="faq12">
                      <button 
                        className="accordion-button collapsed" 
                        type="button" 
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwelve" 
                        aria-expanded="false" 
                        aria-controls="collapseTwelve"
                      >
                        What kind of ready made product we have?
                      </button>
                    </h2>
                    <div id="collapseTwelve" className="accordion-collapse collapse" aria-labelledby="faq12" data-bs-parent="#accordionExample">
                      <div className="accordion-body">
                        <p>Offer several ready-made products that can be customized to meet your specific needs. Here are two examples:</p>
                        <p>Electronic Health Record (EHR): Our electronic health record solution is designed to streamline and digitize the healthcare documentation process. It enables healthcare providers to efficiently manage patient records, track medical history, schedule appointments, generate reports, and more. The EHR system can be tailored to suit different healthcare settings, such as hospitals, clinics, and private practices.</p>
                        <p>Calling CRM: Our Calling CRM (Customer Relationship Management) software is designed to enhance customer interactions and streamline sales and support processes. It provides features for managing customer contacts, tracking communication history, scheduling follow-ups, analysing sales data, and optimizing customer engagement. The Calling CRM can be customized to fit various industries and business sizes.</p>
                        <p>If you are interested in exploring our ready-made products or discussing how we can customize them to suit your business, please contact us at admin@solidevelectrosoft.com or through our website's messaging platform. Our team will be happy to provide further information and guidance.</p>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact CTA section */}
        <div className="tp-sv-contact grey-bg-4 pt-140 pb-140">
          <div className="container">
            <div className="row">
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
                  {showResponse && (
                    <div 
                      className={`ajax-response ${responseMessage.includes('Thank you') ? 'success' : 'error'}`}
                      style={{ 
                        display: 'block', 
                        padding: 15, 
                        marginBottom: 20, 
                        borderRadius: 5, 
                        textAlign: 'center',
                        backgroundColor: responseMessage.includes('Thank you') ? '#d4edda' : '#f8d7da',
                        color: responseMessage.includes('Thank you') ? '#155724' : '#721c24',
                        border: `1px solid ${responseMessage.includes('Thank you') ? '#c3e6cb' : '#f5c6cb'}`,
                        position: 'relative'
                      }}
                    >
                      {responseMessage}
                      <button 
                        onClick={() => setShowResponse(false)}
                        style={{
                          position: 'absolute',
                          top: '5px',
                          right: '10px',
                          background: 'none',
                          border: 'none',
                          fontSize: '16px',
                          cursor: 'pointer',
                          color: 'inherit'
                        }}
                        aria-label="Close message"
                      >
                        ×
                      </button>
                    </div>
                  )}
                  
                  <h4 className="tp-contact-form-title">Direct Contact with us</h4>
                  <form onSubmit={handleSubmit}>
                    <input 
                      type="text" 
                      name="name" 
                      placeholder="Enter your name*" 
                      value={formData.name}
                      onChange={handleInputChange}
                      required 
                      disabled={isSubmitting}
                    />
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="Enter your email*" 
                      value={formData.email}
                      onChange={handleInputChange}
                      required 
                      disabled={isSubmitting}
                    />
                    <textarea 
                      name="message" 
                      placeholder="Enter your message*" 
                      value={formData.message}
                      onChange={handleInputChange}
                      required 
                      disabled={isSubmitting}
                    />
                    <button 
                      type="submit" 
                      className="tp-btn-border"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <span>
                        <svg width="22" height="8" viewBox="0 0 22 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.3536 4.35356C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464468C17.9763 0.269205 17.6597 0.269205 17.4645 0.464468C17.2692 0.65973 17.2692 0.976312 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53554C17.6597 7.7308 17.9763 7.7308 18.1716 7.53554L21.3536 4.35356ZM-4.37114e-08 4.5L21 4.5L21 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z" fill="currentColor"></path>
                        </svg>
                        <svg width="22" height="8" viewBox="0 0 22 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M21.3536 4.35356C21.5488 4.15829 21.5488 3.84171 21.3536 3.64645L18.1716 0.464468C17.9763 0.269205 17.6597 0.269205 17.4645 0.464468C17.2692 0.65973 17.2692 0.976312 17.4645 1.17157L20.2929 4L17.4645 6.82843C17.2692 7.02369 17.2692 7.34027 17.4645 7.53554C17.6597 7.7308 17.9763 7.7308 18.1716 7.53554L21.3536 4.35356ZM-4.37114e-08 4.5L21 4.5L21 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z" fill="currentColor"></path>
                        </svg>
                      </span>
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="tp-ct-info-box black-bg">
                  <div className="tp-ct-info tp-ct-info-border pt-50 pl-50 pb-35">
                    <h3 className="tp-ct-info__title text-white mb-35">
                      <span><i className="fal fa-address-book"></i></span>Address
                    </h3>
                    <p>
                      Next57 Coworking, Cabin No - 11, <br /> 
                      C205 Sm Heights Industrial Area <br /> 
                      Phase 8b Mohali, 140308, India <br />
                      +91-9115866828
                    </p>
                  </div>
                  <div className="tp-ct-info pt-60 pl-50 pb-35">
                    <h3 className="tp-ct-info__title text-white mb-35">
                      <span><i className="fal fa-address-book"></i></span> Opening Hours
                    </h3>
                    <p>
                      Office Hours: 9AM - 6PM <br />
                      Monday - Friday
                    </p>
                  </div>
                  <div className="tp-ct-info pt-60 pl-50 pb-50 black-bg-2">
                    <div className="tp-ct-info-icons">
                      <span><a target="_blank" rel="noreferrer" href="https://www.facebook.com/solidevelectrosoft?mibextid=LQQJ4d"><i className="fab fa-facebook-f"></i></a></span>
                      <span><a target="_blank" rel="noreferrer" href="https://twitter.com/solidevltd?s=21&t=gj1Pg-sx5NyZdM2O0Xx6ig"><i className="fab fa-twitter"></i></a></span>
                      <span><a target="_blank" rel="noreferrer" href="https://instagram.com/solidevelectrosoft?igshid=ZWIzMWE5ZmU3Zg=="><i className="fab fa-instagram"></i></a></span>
                      <span><a target="_blank" rel="noreferrer" href="mailto:admin@solidevelectrosoft.com"><i className="fal fa-envelope"></i></a></span>
                      <span><a target="_blank" rel="noreferrer" href="https://www.linkedin.com/company/solidev-electrosoft-opc-private-limited/"><i className="fab fa-linkedin"></i></a></span>
                    </div>
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
