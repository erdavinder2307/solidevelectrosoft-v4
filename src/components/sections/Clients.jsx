import React from 'react';
import Slider from 'react-slick';

const Clients = () => {
  const clientsOriginal = [
    // {
    //   name: "LexisNexis",
    //   logo: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/client/lexisnexis.webp"
    // },
    {
      name: "9am Software Solutions",
      logo: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/client/9am-software-sol.webp"
    },
    {
      name: "Airvolution",
      logo: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/client/airvolution.svg"
    },
    {
      name: "Edify",
      logo: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/client/edify.webp"
    },
    {
      name: "Fairway Independent",
      logo: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/client/fairway-independent.webp"
    }
  ];

  // Shuffle array randomly
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const clients = shuffleArray(clientsOriginal);

  // Brand/Clients carousel settings - 5 slides on desktop, responsive
  const brandSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
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
    <div id="clients" className="tp-brand-area">
      <div className="container">
        <div className="tp-brand-slider tp-brand-silder-actiive tp-brand-border pt-60 pb-60">
          <Slider {...brandSettings}>
            {clients.map((client, index) => (
              <div key={index}>
                <div className="tp-brand-item text-center scale-1">
                  <img 
                    loading="lazy"
                    src={client.logo}
                    alt={client.name}
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

export default Clients;
