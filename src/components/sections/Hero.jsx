import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const slides = [
    {
      background: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/lightforyourbusiness.webp",
      subtitle: "Steps in the Right Direction...",
      title: "Your Imagination <br> Meets Creativity"
    },
    {
      background: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/hero-bg.webp",
      subtitle: "Steps in the Right Direction...",
      title: "Best Alternative <br> Solutions"
    },
    {
      background: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/growth-of-company.webp",
      subtitle: "Steps in the Right Direction...",
      title: "Web Design Solutions <br>For Any Channel"
    },
    {
      background: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/team-work.webp",
      subtitle: "Steps in the Right Direction...",
      title: "World Class Team <br> Build for You"
    }
  ];

  // Slick settings matching the original configuration
  const settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    dots: false,
    fade: true,
    arrows: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <button type="button" className="slick-prev"><span><i className="fal fa-angle-left"></i></span></button>,
    nextArrow: <button type="button" className="slick-next"><span><i className="fal fa-angle-right"></i></span></button>,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          arrows: false,
        }
      },
    ]
  };

  return (
    <div className="tp-slider-area-3 p-relative">
      <Slider {...settings} className="tp-silder-acive-3">
        {slides.map((slide, index) => (
          <div key={index}>
            <div 
              className="tp-slider-item-3 tp-slider-height-3 silder-overlay"
              style={{
                backgroundImage: `url(${slide.background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                position: 'relative'
              }}
            >
              
              <div 
                className="tp-slider-text white-box" 
                style={{ 
                  position: 'absolute', 
                  bottom: '80px', 
                  left: '50px', 
                  zIndex: 2,
                  maxWidth: '600px',
                  background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.75) 0%, rgba(0, 0, 0, 0.6) 100%)',
                  padding: '40px',
                  borderRadius: '12px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
              >
                <span 
                  className="text-white"
                  style={{
                    fontSize: '16px',
                    fontWeight: '500',
                    display: 'block',
                    marginBottom: '20px'
                  }}
                >
                  {slide.subtitle}
                </span>
                <h3 
                  className="tp-slider-title tp-sl-lg-text mb-55"
                  style={{
                    color: '#ffffff',
                    fontWeight: 'bold',
                    lineHeight: '1.2',
                    marginBottom: '40px'
                  }}
                  dangerouslySetInnerHTML={{ __html: slide.title }}
                ></h3>

                <a 
                  href="contact.html" 
                  className="tp-slider-btn"
                  style={{
                    position: 'relative',
                    zIndex: 3,
                    display: 'inline-flex',
                    alignItems: 'center',
                    color: 'white',
                    textDecoration: 'none'
                  }}
                >
                  <span>
                    <svg width="53" height="8" viewBox="0 0 53 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M52.3536 4.35356C52.5488 4.15829 52.5488 3.84171 52.3536 3.64645L49.1716 0.464469C48.9763 0.269207 48.6597 0.269207 48.4645 0.464469C48.2692 0.659731 48.2692 0.976314 48.4645 1.17158L51.2929 4L48.4645 6.82843C48.2692 7.02369 48.2692 7.34027 48.4645 7.53554C48.6597 7.7308 48.9763 7.7308 49.1716 7.53554L52.3536 4.35356ZM-3.11023e-08 4.5L52 4.5L52 3.5L3.11023e-08 3.5L-3.11023e-08 4.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <svg width="53" height="8" viewBox="0 0 53 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M52.3536 4.35356C52.5488 4.15829 52.5488 3.84171 52.3536 3.64645L49.1716 0.464469C48.9763 0.269207 48.6597 0.269207 48.4645 0.464469C48.2692 0.659731 48.2692 0.976314 48.4645 1.17158L51.2929 4L48.4645 6.82843C48.2692 7.02369 48.2692 7.34027 48.4645 7.53554C48.6597 7.7308 48.9763 7.7308 49.1716 7.53554L52.3536 4.35356ZM-3.11023e-08 4.5L52 4.5L52 3.5L3.11023e-08 3.5L-3.11023e-08 4.5Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                  </span>
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
