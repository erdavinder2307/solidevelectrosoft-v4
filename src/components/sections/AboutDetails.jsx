import React, { useState } from 'react';

const AboutDetails = () => {
  const [activeTab, setActiveTab] = useState('Mission');

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  return (
    <div className="about-details-page pt-140 pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="about-details-info pr-65">
              <div className="tp-section-wrapper">
                <span className="tp-section-subtitle mb-25">About our Company</span>
                <h2 className="tp-pt-size mb-40">Our business boasts top of the line services</h2>
              </div>
              <div className="about-tb-content">
                <nav>
                  <div className="nav mb-30" id="nav-tab" role="tablist">
                    <button 
                      className={`nav-links ${activeTab === 'Mission' ? 'active' : ''}`}
                      id="Mission" 
                      onClick={() => handleTabClick('Mission')}
                      type="button" 
                      role="tab"
                      aria-controls="nav-Mission" 
                      aria-selected={activeTab === 'Mission'}
                    >
                      Our Mission
                    </button>

                    <button 
                      className={`nav-links ${activeTab === 'Vision' ? 'active' : ''}`}
                      id="nav-Vision-tab" 
                      onClick={() => handleTabClick('Vision')}
                      type="button" 
                      role="tab"
                      aria-controls="nav-vision" 
                      aria-selected={activeTab === 'Vision'}
                    >
                      Our Vision
                    </button>
                    
                    <button 
                      className={`nav-links ${activeTab === 'Value' ? 'active' : ''}`}
                      id="nav-Value-tab" 
                      onClick={() => handleTabClick('Value')}
                      type="button" 
                      role="tab"
                      aria-controls="nav-Value" 
                      aria-selected={activeTab === 'Value'}
                    >
                      Our Value
                    </button>
                  </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                  <div 
                    className={`tab-pane fade ${activeTab === 'Mission' ? 'show active' : ''}`} 
                    id="nav-Mission" 
                    role="tabpanel"
                    aria-labelledby="nav-Mission"
                  >
                    <p style={{ textAlign: 'justify' }}>
                      Our mission is to build trustworthy relationships with our clients by providing cost-efficient and quality web development solutions. We strive to automate business processes through innovative software solutions, enabling our clients to achieve growth and success. We are committed to providing a positive and productive work environment for our employees, delivering quality work that meets their professional goals. We aim to achieve financial growth while expanding our network and contributing to the overall success of our clients and partners.
                    </p>
                  </div>
                  
                  <div 
                    className={`tab-pane fade ${activeTab === 'Vision' ? 'show active' : ''}`} 
                    id="nav-Vision" 
                    role="tabpanel"
                    aria-labelledby="nav-Vision-tab"
                  >
                    <p style={{ textAlign: 'justify' }}>
                      Our vision is to be a leading provider of innovative and empowering mobile technology solutions, driving positive change in the world. We are committed to leveraging our expertise in web development to help people access and utilize mobile devices to improve their lives. Our passion for technology fuels our mission to convert ideas into reality, empowering people and businesses to achieve their full potential.
                    </p>
                  </div>
                  
                  <div 
                    className={`tab-pane fade ${activeTab === 'Value' ? 'show active' : ''}`} 
                    id="nav-Value" 
                    role="tabpanel"
                    aria-labelledby="nav-Value-tab"
                  >
                    <p style={{ textAlign: 'justify' }}>
                      We prioritize honesty and transparency in all our interactions, building trust with our clients and colleagues. We strive to be a reliable partner for our clients, providing quality services and driving exponential growth for their businesses. We believe that software is not just an application, but a service to help businesses grow and achieve their goal. We recognize that automation is not a luxury, but a means to free up time and mental energy for our clients, allowing them to focus on what matters most. We believe in the transformative power of technology when used in the right manner, and are committed to using our expertise to help our clients achieve their full potential.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6 text-end">
            <div className="tp-about-img-box p-relative d-inline-block mb-30">
              <div className="about-page-img">
                <img 
                  loading="lazy"
                  src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/about/about-page.webp"
                  alt="About Solidev Electrosoft"
                />
              </div>
              <div className="dots-img">
                <img 
                  loading="lazy"
                  src="https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/about/dot.webp"
                  alt="Decorative dots"
                />
              </div>
              <div className="about-info-box d-flex flex-column justify-content-center text-center">
                <h3 className="box-title">2018</h3>
                <h4 className="box-subtitle">Established</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutDetails;
