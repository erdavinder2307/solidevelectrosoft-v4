import React from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: "pe-7s-arc",
      title: "Web Applications",
      description: "Cloud-based web solutions built with modern technologies including ASP.NET Core, Java, Angular, and React to meet your business requirements and scale with your growth."
    },
    {
      icon: "pe-7s-cloud-download",
      title: "Mobile Applications",
      description: "Native and cross-platform mobile solutions for iOS and Android devices, delivering seamless experiences across all resolutions and operating systems."
    },
    {
      icon: "pe-7s-note2",
      title: "Planning & Strategy",
      description: "Comprehensive SDLC management from planning and development through testing, delivery, and maintenance with timeline-driven execution."
    },
    {
      icon: "pe-7s-tools",
      title: "24/7 Support",
      description: "Round-the-clock maintenance and technical support ensuring your applications run smoothly with minimal downtime."
    }
  ];

  return (
    <div className="services-section pt-140 pb-140">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="section-header text-center mb-80">
              <span className="section-subtitle">What We Offer</span>
              <h2 className="section-title">Our Core Services</h2>
              <p className="section-description">Comprehensive software development solutions tailored to your business needs</p>
            </div>
          </div>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <div key={index} className="col-lg-3 col-md-6 mb-40">
              <div className="service-card">
                <div className="service-icon-wrapper">
                  <div className="service-icon-bg"></div>
                  <i className={`${service.icon} service-icon`}></i>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-arrow">
                  <i className="pe-7s-angle-right-circle"></i>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
