import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ModernHeader, ModernFooter } from '../components/layout';
import {
  PreLoader,
  BackToTop,
  MouseCursor,
  FloatingMenu,
} from '../components/ui';
import Breadcrumb from '../components/sections/Breadcrumb';
import faqBackground from '../assets/img/bg/newbgimage/qn.webp';
import emailService from '../services/emailService';
import { useSEO } from '../hooks/useSEO';
import { pageSEO } from '../utils/seo';
import { getCommonSchemas, generateBreadcrumbSchema, generateFAQSchema } from '../utils/structuredData';
import { trackContactFormSubmitted } from '../utils/analytics';
import { TRADEMARK_LINE } from '../utils/trademarks';

// One list feeds both the accordion and the FAQPage JSON-LD, so the two cannot drift apart.
// `answer` holds the paragraphs; an optional `link` is appended as a router link on the page.
const FAQS = [
  { id: 'faq1', collapseId: 'collapseOne', question: 'What kind of service do you provide?', answer: ['We build AI software teams and automation — AI employees, scheduled tasks and workflow automation — and the custom web and mobile applications they build and run on. We also offer UI/UX design and ongoing maintenance and support. We work with various technologies such as Microsoft Technologies (Asp.net MVC, Asp.net Core), Python, Angular, React, Flutter and more.'] },
  { id: 'faqAi1', collapseId: 'collapseAi1', question: 'What is an AI employee?', answer: ['A software team built from AI agents — a project manager (Asha), a developer (Arjun), a tester (Meera), a reviewer (Kabir) and a growth lead (Naina) — that plan work, build it, check it and look for ways to grow it every hour of the working day, and report to you in the tools you already use, such as Microsoft Teams, Jira and GitHub. Our own runs on Claude; for yours we choose among Claude, Cursor, GitHub Copilot and ChatGPT. A person approves every important step.'] },
  { id: 'faqAi2', collapseId: 'collapseAi2', question: 'Can an AI team replace hiring developers?', answer: ['For many projects it removes the need to hire a full team. You still have people in charge: our senior engineers set the team up and check its work, and you approve what it builds and what gets released.'] },
  { id: 'faqAi3', collapseId: 'collapseAi3', question: 'Will AI automation make decisions without us?', answer: ['No. It starts on "ask first": it proposes, and nothing happens until you approve. Releases, payments and filings always stay with a person. You can let small, safe jobs run by themselves later, one type at a time.'] },
  { id: 'faqAi4', collapseId: 'collapseAi4', question: 'What can you automate?', answer: ['Recurring reports and reminders, inbox and document triage, task planning, software testing, deadline tracking and follow-ups. If a job is repetitive and has clear rules, it is usually a good first candidate.'] },
  { id: 'faqAi5', collapseId: 'collapseAi5', question: 'Is our data safe with AI agents?', answer: ['The agents work inside accounts you control and only see what you give them access to. They never put passwords or keys into reports or chats, never delete data, and never pay, file or sign anything.'] },
  { id: 'faqAi6', collapseId: 'collapseAi6', question: 'How do we start with AI automation?', answer: ['Book a free 30-minute call. We pick one workflow, run a pilot with every step on "ask first", and expand only where it proves itself.'], link: { before: 'See ', label: 'our AI employee page', to: '/ai-employee', after: ' for how our own works.' } },
  { id: 'faq2', collapseId: 'collapseTwo', question: 'How long does it take to build a Software application?', answer: ['It depends on the complexity and scale of the project. But since we have experienced developers in our ranks, we can meet your deadline, regardless of the complexity.'] },
  { id: 'faq3', collapseId: 'collapseThree', question: 'How much does a software application cost?', answer: ['The cost of a new website can vary significantly depending on several factors. These factors include the complexity of the design, the number of pages and features required, the level of customization needed, the platform or content management system (CMS) used, and the specific requirements of the project.'] },
  { id: 'faq4', collapseId: 'collapseFour', question: 'Will my application be mobile-friendly?', answer: ["Absolutely! Ensuring mobile-friendliness is a priority for us. We understand the importance of reaching your audience on various devices. Our team will design and develop your application with responsive design principles in mind, making it accessible and optimized for a seamless user experience across different mobile devices, including smartphones and tablets. By leveraging technologies like Flutter, Media Query, React Native, or responsive web design, we'll ensure that your application adapts and functions flawlessly on mobile platforms."] },
  { id: 'faq5', collapseId: 'collapseFive', question: 'How do I start my project with you?', answer: ['You can reach out to us by sending an email to admin@solidevelectrosoft.com. Please provide a brief description of your project, including your requirements, timeline, and any other relevant details. Our team will review your email and respond promptly to discuss the next steps.', 'OR', 'You can visit our website (www.solidevelectrosoft.com) and use the provided contact form or messaging feature to send us a direct message. Fill in the required information, including your name, email address, and a message describing your project. Our team will receive your message and get back to you as soon as possible.'] },
  { id: 'faq6', collapseId: 'collapseSix', question: 'What are your hiring models?', answer: ['You can hire our highly qualified experts on full-time, part-time, hourly, monthly and weekly basis as per your convenience.'] },
  { id: 'faq7', collapseId: 'collapseSeven', question: 'Can you handle ongoing maintenance?', answer: ['Absolutely! We offer ongoing maintenance services to ensure the continued smooth operation and optimal performance of your application. Our maintenance services are designed to keep your application up to date, secure, and functioning at its best.', "Our maintenance services can be tailored to meet your specific requirements and can be structured on an ongoing basis, whether it's monthly, quarterly, or as needed. We value long-term partnerships with our clients and are committed to providing continuous support to help your application thrive."] },
  { id: 'faq8', collapseId: 'collapseEight', question: 'What happens if my application breaks?', answer: ['We understand that application issues can occur, and we have a dedicated support system in place to address such situations promptly. If your application breaks or experiences any technical issues, our team is here to assist you.', "First, we encourage you to reach out to our support team and provide detailed information about the problem you're encountering. Our experts will investigate the issue and work diligently to identify the cause and implement a solution. Depending on the severity and complexity of the problem, the resolution time may vary.", 'Additionally, we offer maintenance and support services to ensure the ongoing functionality and stability of your application. This can include regular updates, bug fixes, security patches, and performance optimizations to keep your application running smoothly.', 'Our goal is to minimize downtime and provide a swift resolution to any issues that arise. We strive to maintain open communication with our clients and keep you informed throughout the troubleshooting and resolution process.', 'Rest assured that we are committed to providing reliable support and ensuring the smooth operation of your application.'] },
  { id: 'faq9', collapseId: 'collapseNine', question: 'How long does a application redesign take?', answer: ['The duration of an application redesign can vary depending on several factors, including the complexity of the application, the scope of changes required, and the availability of resources. Typically, a complete application redesign may take several weeks to a few months to ensure thorough planning, design, development, testing, and deployment.'] },
  { id: 'faq10', collapseId: 'collapseTen', question: 'What are the types of companies have you worked with?', answer: ['We have worked with a diverse range of companies across various industries. We have designed and developed Software applications for both large sized and small sized business owners from domains like eCommerce, NGO, legal, medical, finance, and many more.'] },
  { id: 'faq11', collapseId: 'collapseEleven', question: "I don't want to go elsewhere for web application hosting. Can I get it at Solidev Electrosoft?", answer: ['To provide our clients one stop solutions and help them save their costs, this is what our motto is. At Solidev Electrosoft, we provide comprehensive Software development solutions which include:', 'eCommerce Web Design and Development Services', 'Software Development', 'Web Application Design', 'Web Application Hosting', 'Payment Gateway Integration', 'Web Application Re-Designing', 'Web Application Maintenance', 'Mobile Application Development', 'You can either avail our services for a standalone project or as a part of an entire project.'] },
  { id: 'faq12', collapseId: 'collapseTwelve', question: 'What kind of ready made product we have?', answer: ['Offer several ready-made products that can be customized to meet your specific needs. Here are two examples:', 'Electronic Health Record (EHR): Our electronic health record solution is designed to streamline and digitize the healthcare documentation process. It enables healthcare providers to efficiently manage patient records, track medical history, schedule appointments, generate reports, and more. The EHR system can be tailored to suit different healthcare settings, such as hospitals, clinics, and private practices.', 'Calling CRM: Our Calling CRM (Customer Relationship Management) software is designed to enhance customer interactions and streamline sales and support processes. It provides features for managing customer contacts, tracking communication history, scheduling follow-ups, analysing sales data, and optimizing customer engagement. The Calling CRM can be customized to fit various industries and business sizes.', "If you are interested in exploring our ready-made products or discussing how we can customize them to suit your business, please contact us at admin@solidevelectrosoft.com or through our website's messaging platform. Our team will be happy to provide further information and guidance."] },
];

const faqSchemaText = (faq) => {
  const text = faq.answer.join('\n');
  if (!faq.link) return text;
  const { before, label, to, after } = faq.link;
  return `${text} ${before}${label} (https://www.solidevelectrosoft.com${to})${after}`;
};

const Faq = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  // SEO Configuration
  useSEO({
    title: pageSEO.faq.title,
    description: pageSEO.faq.description,
    keywords: pageSEO.faq.keywords,
    canonical: pageSEO.faq.canonical,
    ogType: pageSEO.faq.ogType,
    schemas: [
      ...getCommonSchemas(),
      generateFAQSchema(FAQS.map((faq) => ({ question: faq.question, answer: faqSchemaText(faq) }))),
      generateBreadcrumbSchema([
        { name: 'Home', url: 'https://www.solidevelectrosoft.com/' },
        { name: 'FAQ', url: 'https://www.solidevelectrosoft.com/faq' },
      ]),
    ],
  });

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

    const sendFailedMessage =
      "Sorry, we couldn't send your message. Please WhatsApp or call us on +91 91158 66828.";

    try {
      const result = await emailService.sendContactFormEmail({
        ...formData,
        subject: 'FAQ Page Contact Form'
      });

      if (result.success) {
        trackContactFormSubmitted('faq');
        setResponseMessage(result.message);
        setShowResponse(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        setResponseMessage(sendFailedMessage);
        setShowResponse(true);
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setResponseMessage(sendFailedMessage);
      setShowResponse(true);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  useEffect(() => {
    document.documentElement.className = 'no-js';
  }, []);

  return (
    <div className="App">
      <PreLoader />
      <BackToTop />
      <MouseCursor />
      <ModernHeader />

      <Breadcrumb
        title="FAQ"
        backgroundImage={faqBackground}
      />

      <main>
        <div className="faq-section pt-140 pb-140">
          <div className="container">
            <div className="row">
              <div className="col-11">
                <div className="accordion tp-accordion" id="accordionExample">
                  {FAQS.map((faq, index) => {
                    const isOpen = index === 0;
                    return (
                      <div className="accordion-item" key={faq.id}>
                        <h2 className="accordion-header" id={faq.id}>
                          <button
                            className={isOpen ? 'accordion-button' : 'accordion-button collapsed'}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target={`#${faq.collapseId}`}
                            aria-expanded={isOpen ? 'true' : 'false'}
                            aria-controls={faq.collapseId}
                          >
                            {faq.question}
                          </button>
                        </h2>
                        <div id={faq.collapseId} className={isOpen ? 'accordion-collapse collapse show' : 'accordion-collapse collapse'} aria-labelledby={faq.id} data-bs-parent="#accordionExample">
                          <div className="accordion-body">
                            {faq.answer.length > 1
                              ? faq.answer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)
                              : faq.answer[0]}
                            {faq.link && (
                              <>
                                {' '}{faq.link.before}<Link to={faq.link.to}>{faq.link.label}</Link>{faq.link.after}
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                </div>
                <p className="mt-30" style={{ fontSize: '0.8rem', color: 'var(--text-muted, #6b7280)' }}>{TRADEMARK_LINE}</p>
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

      <ModernFooter />
      <FloatingMenu />
    </div>
  );
};

export default Faq;
