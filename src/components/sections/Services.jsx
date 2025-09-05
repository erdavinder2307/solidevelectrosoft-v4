import React from 'react';

const Services = () => {
  const services = [
    {
      icon: "pe-7s-arc",
      title: "Web Applications",
      description: "In the fatest growing market, every business required to get cloud space to reachout their customers. We are here to provide all type of web applications that meet your business requirement like Microsoft Technologies (Asp.net MVC, Asp.net core, Asp.net Core), Java web development, Angular 5, Reactjs"
    },
    {
      icon: "pe-7s-cloud-download",
      title: "Mobile Applications",
      description: "Its Era of mobility and everyone want to get services on the go. We provide software applications which meet the requirment of all mobile devices operating systems with various resolutions like IOS for IPhone and IPad, Android for android devices etc."
    },
    {
      icon: "pe-7s-cloud-download",
      title: "Planning Application",
      description: "From the start of software development life cycle, development, testing, delivery to customer, maintenance and fixes, everything is in timeline."
    },
    {
      icon: "pe-7s-hammer",
      title: "Software Support",
      description: "24x7 Support for the maintenance and fixes of customer's software application."
    }
  ];

  return (
    <div className="tp-service-ara grey-bg-4 pt-140 pb-140">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tp-section-wrapper text-center mb-60">
              <h2 className="tp-section-title mb-70">Explore Our Services</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {services.map((service, index) => (
            <div key={index} className="col-xl-3 col-md-6">
              <div className="tp-service text-center white-bg pt-60 pb-45 pl-25 pr-25 mb-30">
                <div className="tp-service__icon">
                  <i className={service.icon}></i>
                </div>
                <h3 className="tp-service__title pt-40 pb-25">
                  <a href="#">{service.title}</a>
                </h3>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-30">
          {/* Future: Add "All Services" button if needed */}
        </div>
      </div>
    </div>
  );
};

export default Services;
