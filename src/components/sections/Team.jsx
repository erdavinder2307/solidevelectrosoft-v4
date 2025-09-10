import React from 'react';
import Slider from 'react-slick';

const Team = () => {
  const teamMembersOriginal = [
    {
      image: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/team/director-pic.webp",
      name: "Davinder Pal",
      position: "Director",
      github: "https://github.com/erdavinder2307",
      linkedin: "https://www.linkedin.com/in/davinder-pal-906a53166/"
    },
    {
      image: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/team/nisha-pic.webp",
      name: "Nisha Kumari Yadav",
      position: "Software Executive",
      github: "https://github.com/Solidev-Electrosoft",
      linkedin: "https://in.linkedin.com/in/nisha-kumari-yadav-50a145204"
    },
    {
      image: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/team/sales-finance-excutive-pic.webp",
      name: "Anushka Singh",
      position: "Sales Finance Executive",
      github: "#",
      linkedin: "https://www.linkedin.com/in/anushka-singh-931215240"
    },
    {
      image: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/team/Jagriti-pic.webp",
      name: "Jagriti Khantwal",
      position: "Software Developer",
      github: "https://github.com/jagriti03",
      linkedin: "https://www.linkedin.com/in/jagriti-khantwal-614718102"
    },
    {
      image: "https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/team/software-developer-sy.webp",
      name: "Sheetal Yadav",
      position: "Software Developer",
      github: "https://github.com/sheetal-sy",
      linkedin: "https://www.linkedin.com/in/sheetal-yadav-762443171"
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

  const teamMembers = shuffleArray(teamMembersOriginal);

  // Team carousel settings - 4 slides on desktop, responsive
  const teamSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
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
    <div className="tp-team-area pt-135 pb-110 grey-bg-4">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tp-section-wrapper text-center">
              <h2 className="tp-section-title">
                All the people behind the <br /> latest project
              </h2>
            </div>
          </div>
        </div>
        <div id="team" className="tp-gallery-slider tp-gallery-slider-active tp-gallery-space">
          <Slider {...teamSettings}>
            {teamMembers.map((member, index) => (
              <div key={index}>
                <div className="tp-team pb-30 pt-25">
                  <div className="tp-team__thumb">
                    <img 
                      loading="lazy"
                      src={member.image}
                      alt={member.name}
                      style={{
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        margin: '0 auto',
                        display: 'block'
                      }}
                    />
                  </div>
                  <div className="tp-team__info pt-25 text-center">
                    <h3 className="tp-team-name">
                      <a href="#">{member.name}</a>
                    </h3>
                    <p>{member.position}</p>
                  </div>
                  <div className="tp-team__social text-center">
                    <a target="_blank" href={member.github} rel="noopener noreferrer">
                      <i className="fab fa-github"></i>
                    </a>
                    <a target="_blank" href={member.linkedin} rel="noopener noreferrer">
                      <i className="fab fa-linkedin"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Team;
