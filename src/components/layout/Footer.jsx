import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  useEffect(() => {
    // Set current year
    const currentYearElement = document.getElementById('CurrentYear');
    if (currentYearElement) {
      currentYearElement.textContent = new Date().getFullYear().toString();
    }
  }, []);

  return (
    <footer>
      <div className="tp-footer__area black-bg">
        <div className="tp-footer">
          {/* Footer Top */}
          <div className="tp-footer__top pt-90 pb-60">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-lg-5">
                  <h3 className="tp-footer__top-title">
                    Have a project in mind? Let's work together.
                  </h3>
                </div>
                <div className="col-lg-7">
                  <div className="wrapper">
                    <div className="button">
                      <div className="icon">
                        <a target="_blank"
                          href="https://www.facebook.com/solidevelectrosoft?mibextid=LQQJ4d"
                          rel="noopener noreferrer">
                          <i className="fab fa-facebook-f"></i>
                        </a>
                      </div>
                      <span>Facebook</span>
                    </div>
                    <div className="button">
                      <div className="icon">
                        <a target="_blank"
                          href="https://twitter.com/solidevltd?s=21&t=gj1Pg-sx5NyZdM2O0Xx6ig"
                          rel="noopener noreferrer">
                          <i className="fab fa-twitter"></i>
                        </a>
                      </div>
                      <span>Twitter</span>
                    </div>
                    <div className="button">
                      <div className="icon">
                        <a target="_blank"
                          href="https://instagram.com/solidevelectrosoft?igshid=ZWIzMWE5ZmU3Zg=="
                          rel="noopener noreferrer">
                          <i className="fab fa-instagram"></i>
                        </a>
                      </div>
                      <span>Instagram</span>
                    </div>
                    <div className="button">
                      <div className="icon">
                        <a target="_blank" href="mailto:admin@solidevelectrosoft.com">
                          <i className="fal fa-envelope"></i>
                        </a>
                      </div>
                      <span>Email</span>
                    </div>
                    <div className="button">
                      <div className="icon">
                        <a target="_blank" 
                          href="https://www.linkedin.com/in/solidev-electrosoft-527a28276"
                          rel="noopener noreferrer">
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </div>
                      <span>LinkedIn</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Footer */}
          <div className="tp-footer__main">
            <div className="container">
              <div className="tp-footer-border pt-60 pb-30">
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <div className="tp-footer__widget pb-30">
                      <h3 className="tp-footer__widget-title">Customer Reach</h3>
                      <ul>
                        <li><a href="#">India</a></li>
                        <li><a href="#">USA</a></li>
                        <li><a href="#">Canada</a></li>
                        <li><a href="#">Australia</a></li>
                        <li><a href="#">South Africa</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="tp-footer__widget pb-30">
                      <h3 className="tp-footer__widget-title">Our Services</h3>
                      <ul>
                        <li><a href="#">Application Design</a></li>
                        <li><a href="#">Application Development</a></li>
                        <li><a href="#">Application Deployment</a></li>
                        <li><a href="#">Application Support</a></li>
                        <li><a href="#">Application Hosting</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="tp-footer__widget pb-30">
                      <h3 className="tp-footer__widget-title">Quick Links</h3>
                      <ul>
                        <li><Link to="/about">About Us</Link></li>
                        <li><a href="faq.html">FAQ</a></li>
                        <li><a href="project.html">Portfolio</a></li>
                        <li><a href="contact.html">Contacts</a></li>
                      </ul>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6">
                    <div className="tp-footer__widget pb-30">
                      <h3 className="tp-footer__widget-title">Get in touch</h3>
                      <ul>
                        <li>
                          <a href="#">
                            Next57 Coworking, Cabin No - 11,  C205 Sm Heights Industrial Area Phase 8b Mohali, 140308, India
                          </a>
                        </li>
                        <li><a href="tel:+919115866828">+91-911 586 6828</a></li>
                        <li>
                          <a target="_blank"
                            href="mailto:admin@solidevelectrosoft.com">admin@solidevelectrosoft.com</a>
                        </li>
                        <li><span> Office Hours: 9AM - 6PM </span></li>
                        <li><span> Monday - Friday</span></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Copyright */}
        <div className="top-footer-copyright pt-30 black-bg">
          <div className="container">
            <div className="row">
              <div className="col-md-8 col-12">
                <div className="tp-copyrigh-text mb-30">
                  <span>
                    © <span id="CurrentYear"></span> Solidev Electrosoft (OPC) Pvt. Ltd. - Convert Ideas Into
                    Reality. All Rights Reserved.
                  </span>
                </div>
              </div>
              <div className="col-md-4 col-12">
                <div className="tp-footer-social-icon mb-30 text-md-end">
                  <ul>
                    <li>
                      <a target="_blank" 
                        href="https://www.facebook.com/solidevelectrosoft?mibextid=LQQJ4d"
                        rel="noopener noreferrer">
                        <i className="fab fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" 
                        href="https://twitter.com/solidevltd?s=21&t=gj1Pg-sx5NyZdM2O0Xx6ig"
                        rel="noopener noreferrer">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank"
                        href="https://instagram.com/solidevelectrosoft?igshid=ZWIzMWE5ZmU3Zg=="
                        rel="noopener noreferrer">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank" href="mailto:admin@solidevelectrosoft.com">
                        <i className="fal fa-envelope"></i>
                      </a>
                    </li>
                    <li>
                      <a target="_blank"
                        href="https://www.linkedin.com/company/solidev-electrosoft-opc-private-limited/"
                        rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
