import React from 'react';
import Slider from 'react-slick';

const Testimonials = () => {
  const testimonials = [
    {
      review: "The work has been completed in smooth process and delivered the high quality software. He has multiple coding skills. Highly recommend to others.",
      reviewer: "Naga Vankadari",
      location: "(USA)",
      rating: 5
    },
    {
      review: "The work has been completed in smooth process and delivered the high quality software. He has multiple coding skills. Highly recommend to others.",
      reviewer: "Nagaraju Bittu",
      location: "(USA)",
      rating: 4
    },
    {
      review: "As per customer our work was great and relevant to their product. with regard of appreciation client increased per hour rate after six months of commitment.",
      reviewer: "Prabhakaran S",
      location: "(Edify Technologies, Dacra Tech Core360, USA)",
      rating: 5
    },
    // {
    //   review: "As per customer our work is excellent and provided them value. Code quality is great and meeting deadlines for work.",
    //   reviewer: "Ngwenze, Ayanda",
    //   location: "(Lexis Nexis, South Africa)",
    //   rating: 5
    // }
  ];

  // Testimonials carousel settings - single slide with arrows
  const testimonialSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    arrows: true,
    fade: false,
    prevArrow: <div className="slick-prev slick-arrow"><i className="far fa-chevron-left"></i></div>,
    nextArrow: <div className="slick-next slick-arrow"><i className="far fa-chevron-right"></i></div>
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <i 
          key={i} 
          className={i <= rating ? "fas fa-star" : "far fa-star"}
        ></i>
      );
    }
    return stars;
  };

  return (
    <div className="tp-testimonial-area pt-120 pb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-10 offset-lg-1">
            <div 
              className="tp-testimonial"
              style={{
                backgroundImage: "url(https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/testimonial.jpg)"
              }}
            >
              <div className="tp-testimonial-active pt-25 pb-25">
                <Slider {...testimonialSettings}>
                  {testimonials.map((testimonial, index) => (
                    <div key={index}>
                      <div className="tp-testimonial-item">
                        <div className="tp-section-title-sm-box text-center">
                          <span>What our Clients say</span>
                          <h2 className="tp-testi-reivew pt-50 pb-40">
                            {testimonial.review}
                          </h2>
                          <div className="tp-testi-meta">
                            <h3 className="tp-testi-reviewer">{testimonial.reviewer}</h3>
                            <span>{testimonial.location}</span>
                            <div className="reviews">
                              {renderStars(testimonial.rating)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
