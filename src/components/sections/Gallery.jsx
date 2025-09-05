import React from 'react';
import Slider from 'react-slick';

const Gallery = () => {
  const quotes = [
    "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/quote1.webp",
    "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/quote2.webp",
    "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/quote3.webp",
    "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/quote4.webp",
    "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/quote5.webp",
    "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/quote6.webp"
  ];

  // Gallery carousel settings matching original Slick configuration
  const gallerySettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <div className="tp-cursor-point-area ddd tp-gallery-area position-relative fix">
      <div className="container">
        <div id="quotes" className="tp-gallery-slider tp-gallery-slider-active tp-gallery-space">
          <Slider {...gallerySettings}>
            {quotes.map((quote, index) => (
              <div key={index}>
                <div className="tp-gallery-item mb-2">
                  <img 
                    loading="lazy"
                    src={quote}
                    alt={`Quote ${index + 1}`}
                  />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
